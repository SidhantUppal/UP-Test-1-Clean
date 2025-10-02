/**
 * Service to provide data for the Dev Engine pages
 * This will eventually be replaced by database queries
 */

import { RouteDiscoveryService } from './route-discovery';
import path from 'path';

export interface ModulePage {
  id: string;
  name: string;
  route: string;
  elements: number;
  implemented: number;
  apiEndpoints: number;
  validationRules: number;
  lastModified: string;
  status: 'complete' | 'in-progress' | 'not-started';
}

export interface ModuleData {
  id: string;
  name: string;
  description: string;
  pages: ModulePage[];
  roles: string[];
  totalElements: number;
  implementedElements: number;
}

export class DevDataService {
  private static instance: DevDataService;
  private cachedData: Map<string, ModuleData> = new Map();
  private lastFetch: Date | null = null;
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  static getInstance(): DevDataService {
    if (!DevDataService.instance) {
      DevDataService.instance = new DevDataService();
    }
    return DevDataService.instance;
  }

  /**
   * Get all modules with their pages
   */
  async getAllModules(): Promise<ModuleData[]> {
    // Check cache
    if (this.lastFetch && Date.now() - this.lastFetch.getTime() < this.cacheTimeout) {
      return Array.from(this.cachedData.values());
    }

    // Discover routes
    const routeDiscovery = new RouteDiscoveryService();
    const discoveredModules = await routeDiscovery.discoverAllRoutes();

    // Transform discovered data to module data format
    const modules: ModuleData[] = [];

    for (const discoveredModule of discoveredModules) {
      const moduleData: ModuleData = {
        id: discoveredModule.id,
        name: discoveredModule.name,
        description: this.getModuleDescription(discoveredModule.id),
        pages: [],
        roles: this.getDefaultRoles(),
        totalElements: 0,
        implementedElements: 0
      };

      // Transform routes to pages
      for (const route of discoveredModule.routes) {
        const page: ModulePage = {
          id: this.generatePageId(route.page),
          name: this.formatPageName(route.page),
          route: route.route,
          elements: 0, // Will be populated by element discovery
          implemented: 0, // Will be populated from database
          apiEndpoints: 0, // Will be populated from API config
          validationRules: 0, // Will be populated from validation config
          lastModified: new Date().toISOString().split('T')[0],
          status: 'not-started' // Will be determined by implementation percentage
        };

        // Add mock data for now (replace with real data later)
        page.elements = Math.floor(Math.random() * 30) + 5;
        page.implemented = Math.floor(page.elements * Math.random());
        page.apiEndpoints = Math.floor(Math.random() * 10);
        page.validationRules = Math.floor(Math.random() * 5);
        
        // Determine status based on implementation
        const percentage = (page.implemented / page.elements) * 100;
        if (percentage === 100) page.status = 'complete';
        else if (percentage > 0) page.status = 'in-progress';
        else page.status = 'not-started';

        moduleData.pages.push(page);
        moduleData.totalElements += page.elements;
        moduleData.implementedElements += page.implemented;
      }

      modules.push(moduleData);
      this.cachedData.set(moduleData.id, moduleData);
    }

    this.lastFetch = new Date();
    return modules;
  }

  /**
   * Get a specific module's data
   */
  async getModule(moduleId: string): Promise<ModuleData | null> {
    const modules = await this.getAllModules();
    return modules.find(m => m.id === moduleId) || null;
  }

  /**
   * Generate a page ID from the page path
   */
  private generatePageId(pagePath: string): string {
    if (!pagePath || pagePath === 'index') return 'home';
    
    // Handle dynamic routes
    return pagePath
      .replace(/\[([^\]]+)\]/g, '$1') // Remove brackets from dynamic segments
      .replace(/\//g, '-') // Replace slashes with dashes
      .toLowerCase();
  }

  /**
   * Format page name from path
   */
  private formatPageName(pagePath: string): string {
    if (!pagePath || pagePath === 'index') return 'Home';
    
    // Handle dynamic routes
    const formatted = pagePath
      .replace(/\[([^\]]+)\]/g, (match, param) => {
        // Format dynamic params
        return param.charAt(0).toUpperCase() + param.slice(1) + ' Detail';
      })
      .split('/')
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' - ');
    
    return formatted;
  }

  /**
   * Get module description
   */
  private getModuleDescription(moduleId: string): string {
    const descriptions: Record<string, string> = {
      contractors: 'Contractor management, compliance tracking, and work assignments',
      documents: 'Document library, versioning, templates, and workflows',
      checklists: 'Inspection checklists, quality control, and compliance verification',
      tasks: 'Task management, assignments, scheduling, and tracking',
      forms: 'Dynamic forms, submissions, approvals, and data collection',
      safety: 'Safety management, incidents, hazards, and risk assessments',
      admin: 'System administration, user management, and platform configuration',
      dashboard: 'Analytics, metrics, KPIs, and executive dashboards',
      reports: 'Report generation, templates, scheduling, and distribution',
      processes: 'Business processes, workflows, and automation',
      homepage: 'Landing pages, navigation, and user portals',
      incidents: 'Incident reporting, investigation, and corrective actions',
      hazards: 'Hazard identification, assessment, and control measures',
      policies: 'Policy management, distribution, and acknowledgments',
      risks: 'Risk assessments, matrices, and mitigation strategies'
    };
    
    return descriptions[moduleId] || `${moduleId} module functionality and features`;
  }

  /**
   * Get default roles
   */
  private getDefaultRoles(): string[] {
    return [
      'SuperAdmin',
      'TenantAdmin', 
      'ProjectManager',
      'SiteManager',
      'QualityInspector',
      'Contractor',
      'DocumentManager',
      'Viewer'
    ];
  }
}