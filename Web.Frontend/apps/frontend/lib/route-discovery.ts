import fs from 'fs';
import path from 'path';

export interface DiscoveredRoute {
  module: string;
  page: string;
  route: string;
  filePath: string;
  hasParams: boolean;
  params?: string[];
}

export interface ModuleInfo {
  id: string;
  name: string;
  routes: DiscoveredRoute[];
  pageCount: number;
}

/**
 * Discovers all routes in the Next.js app directory structure
 */
export class RouteDiscoveryService {
  private appDir: string;
  private ignoredDirs = ['components', 'api', '_components', '_utils'];
  
  constructor(appDir: string = 'apps/frontend/app') {
    this.appDir = appDir;
  }

  /**
   * Discover all routes in the application
   */
  async discoverAllRoutes(): Promise<ModuleInfo[]> {
    const mainDir = path.join(this.appDir, '(main)');
    const modules = new Map<string, ModuleInfo>();
    
    // Scan the (main) directory
    await this.scanDirectory(mainDir, '', modules);
    
    return Array.from(modules.values());
  }

  /**
   * Recursively scan directory for page.tsx files
   */
  private async scanDirectory(
    dir: string, 
    routePath: string, 
    modules: Map<string, ModuleInfo>
  ): Promise<void> {
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && !this.ignoredDirs.includes(entry.name)) {
          // Handle dynamic routes
          const isDynamic = entry.name.startsWith('[') && entry.name.endsWith(']');
          const segmentName = isDynamic ? entry.name : entry.name;
          const newRoutePath = routePath ? `${routePath}/${segmentName}` : segmentName;
          
          // Check if this directory has a page.tsx
          const pageFile = path.join(dir, entry.name, 'page.tsx');
          if (fs.existsSync(pageFile)) {
            const route = this.createRoute(newRoutePath, pageFile);
            this.addRouteToModule(route, modules);
          }
          
          // Recursively scan subdirectories
          await this.scanDirectory(
            path.join(dir, entry.name), 
            newRoutePath, 
            modules
          );
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }

  /**
   * Create a route object from path and file
   */
  private createRoute(routePath: string, filePath: string): DiscoveredRoute {
    const segments = routePath.split('/').filter(Boolean);
    const moduleId = segments[0] || 'root';
    const page = segments.slice(1).join('/') || 'index';
    
    // Extract dynamic params
    const paramRegex = /\[([^\]]+)\]/g;
    const params: string[] = [];
    let match;
    while ((match = paramRegex.exec(routePath)) !== null) {
      params.push(match[1]);
    }
    
    return {
      module: moduleId,
      page,
      route: `/${routePath}`,
      filePath,
      hasParams: params.length > 0,
      params: params.length > 0 ? params : undefined
    };
  }

  /**
   * Add route to appropriate module
   */
  private addRouteToModule(route: DiscoveredRoute, modules: Map<string, ModuleInfo>): void {
    const moduleId = route.module;
    
    if (!modules.has(moduleId)) {
      modules.set(moduleId, {
        id: moduleId,
        name: this.formatModuleName(moduleId),
        routes: [],
        pageCount: 0
      });
    }
    
    const moduleItem = modules.get(moduleId)!;
    moduleItem.routes.push(route);
    moduleItem.pageCount = moduleItem.routes.length;
  }

  /**
   * Format module ID to display name
   */
  private formatModuleName(moduleId: string): string {
    const nameMap: Record<string, string> = {
      'contractors': 'Contractors',
      'documents': 'Documents',
      'checklists': 'Checklists',
      'tasks': 'Tasks',
      'forms': 'Forms',
      'safety': 'Safety',
      'admin': 'Admin',
      'dashboard': 'Dashboard',
      'reports': 'Reports',
      'processes': 'Processes',
      'homepage': 'Homepage',
      'incidents': 'Incidents',
      'hazards': 'Hazards',
      'policies': 'Policies',
      'risks': 'Risk Assessments'
    };
    
    return nameMap[moduleId] || moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
  }

  /**
   * Get route statistics
   */
  getRouteStats(modules: ModuleInfo[]): {
    totalModules: number;
    totalRoutes: number;
    dynamicRoutes: number;
    moduleBreakdown: Record<string, number>;
  } {
    const stats = {
      totalModules: modules.length,
      totalRoutes: 0,
      dynamicRoutes: 0,
      moduleBreakdown: {} as Record<string, number>
    };
    
    modules.forEach(moduleItem => {
      stats.totalRoutes += moduleItem.routes.length;
      stats.dynamicRoutes += moduleItem.routes.filter(r => r.hasParams).length;
      stats.moduleBreakdown[moduleItem.name] = moduleItem.routes.length;
    });
    
    return stats;
  }
}

/**
 * Element discovery for a specific route
 */
export class ElementDiscoveryService {
  /**
   * Discover elements in a page component file
   */
  async discoverElements(filePath: string): Promise<{
    buttons: number;
    links: number;
    forms: number;
    tables: number;
    total: number;
  }> {
    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      
      // Simple pattern matching for now
      // In production, use AST parsing for accuracy
      const stats = {
        buttons: (content.match(/<Button|<PermissionButton/g) || []).length,
        links: (content.match(/<Link|<PermissionLink|href=/g) || []).length,
        forms: (content.match(/<Form|<form/g) || []).length,
        tables: (content.match(/<Table|<table/g) || []).length,
        total: 0
      };
      
      stats.total = stats.buttons + stats.links + stats.forms + stats.tables;
      
      return stats;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return { buttons: 0, links: 0, forms: 0, tables: 0, total: 0 };
    }
  }
}