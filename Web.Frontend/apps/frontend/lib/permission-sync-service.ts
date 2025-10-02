import { RouteDiscoveryService, ElementDiscoveryService, ModuleInfo } from './route-discovery';

export interface SyncStatus {
  lastSync: Date | null;
  inProgress: boolean;
  totalModules: number;
  totalPages: number;
  totalElements: number;
  errors: string[];
}

/**
 * Service to sync discovered routes and elements with the permission system
 */
export class PermissionSyncService {
  private routeDiscovery: RouteDiscoveryService;
  private elementDiscovery: ElementDiscoveryService;
  private syncInterval: NodeJS.Timer | null = null;
  private status: SyncStatus = {
    lastSync: null,
    inProgress: false,
    totalModules: 0,
    totalPages: 0,
    totalElements: 0,
    errors: []
  };

  constructor() {
    this.routeDiscovery = new RouteDiscoveryService();
    this.elementDiscovery = new ElementDiscoveryService();
  }

  /**
   * Start automatic syncing
   */
  startAutoSync(intervalMs: number = 5 * 60 * 1000) { // Default: 5 minutes
    if (this.syncInterval) {
      this.stopAutoSync();
    }

    // Run initial sync
    this.syncAll();

    // Set up interval
    this.syncInterval = setInterval(() => {
      this.syncAll();
    }, intervalMs);

    console.log(`Permission sync service started (interval: ${intervalMs}ms)`);
  }

  /**
   * Stop automatic syncing
   */
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('Permission sync service stopped');
    }
  }

  /**
   * Perform a full sync
   */
  async syncAll(): Promise<SyncStatus> {
    if (this.status.inProgress) {
      console.log('Sync already in progress, skipping...');
      return this.status;
    }

    console.log('Starting permission sync...');
    this.status.inProgress = true;
    this.status.errors = [];

    try {
      // Discover all routes
      const modules = await this.routeDiscovery.discoverAllRoutes();
      
      // Process each module
      let totalElements = 0;
      for (const moduleItem of modules) {
        for (const route of moduleItem.routes) {
          const elements = await this.elementDiscovery.discoverElements(route.filePath);
          totalElements += elements.total;
        }
      }

      // Update status
      this.status.totalModules = modules.length;
      this.status.totalPages = modules.reduce((sum, m) => sum + m.routes.length, 0);
      this.status.totalElements = totalElements;
      this.status.lastSync = new Date();

      // Save to database/storage
      await this.saveToStorage(modules);

      console.log(`Sync completed: ${this.status.totalModules} modules, ${this.status.totalPages} pages, ${this.status.totalElements} elements`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      this.status.errors.push(errorMsg);
      console.error('Sync error:', error);
    } finally {
      this.status.inProgress = false;
    }

    return this.status;
  }

  /**
   * Save discovered data to storage
   */
  private async saveToStorage(modules: ModuleInfo[]): Promise<void> {
    // In a real implementation, this would:
    // 1. Connect to your database
    // 2. Update the modules, pages, and elements tables
    // 3. Preserve existing permission configurations
    // 4. Mark removed pages as deprecated
    
    // For now, save to a JSON file
    const fs = await import('fs/promises');
    const dataPath = 'apps/frontend/data/discovered-routes.json';
    
    await fs.writeFile(
      dataPath,
      JSON.stringify({
        modules,
        lastSync: this.status.lastSync,
        version: '1.0'
      }, null, 2)
    );
  }

  /**
   * Get current sync status
   */
  getStatus(): SyncStatus {
    return { ...this.status };
  }

  /**
   * Check if a specific route exists
   */
  async routeExists(route: string): Promise<boolean> {
    const modules = await this.routeDiscovery.discoverAllRoutes();
    
    for (const moduleItem of modules) {
      if (moduleItem.routes.some(r => r.route === route)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get all routes for a specific module
   */
  async getModuleRoutes(moduleId: string): Promise<string[]> {
    const modules = await this.routeDiscovery.discoverAllRoutes();
    const moduleItem = modules.find(m => m.id === moduleId);

    return moduleItem ? moduleItem.routes.map(r => r.route) : [];
  }
}

// Singleton instance
let syncService: PermissionSyncService | null = null;

export function getPermissionSyncService(): PermissionSyncService {
  if (!syncService) {
    syncService = new PermissionSyncService();
  }
  return syncService;
}