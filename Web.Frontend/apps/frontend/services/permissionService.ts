// Permission Service - Handles API calls and permission logic

export interface UserPermissions {
  userId: number;
  tenantId: number;
  permissions: string[];
}

export interface PermissionPattern {
  pattern: string;
  description: string;
  layer: 'service' | 'page' | 'element';
  module: string;
}

class PermissionService {
  private permissionCache: Map<string, boolean> = new Map();
  private userPermissions: string[] = [];

  /**
   * Fetch user permissions from backend API
   */
  async fetchUserPermissions(): Promise<UserPermissions> {
    try {
      // In production, this would make an actual API call:
      // const response = await fetch('/api/auth/permissions', {
      //   headers: {
      //     'Authorization': `Bearer ${getAuthToken()}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // 
      // if (!response.ok) {
      //   throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      // }
      // 
      // return response.json();

      // Mock API response for development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            userId: 1,
            tenantId: 1,
            permissions: [
              'dashboard.view',
              'processes.view',
              'processes.create',
              'workflows.view',
              'compliance.view',
              'analytics.view'
            ]
          });
        }, 300);
      });
    } catch (error) {
      console.error('Failed to fetch user permissions:', error);
      throw error;
    }
  }

  /**
   * Check if user has a specific permission
   */
  hasPermission(permission: string): boolean {
    // Check cache first
    if (this.permissionCache.has(permission)) {
      return this.permissionCache.get(permission)!;
    }

    const hasAccess = this.userPermissions.includes(permission);
    
    // Cache the result
    this.permissionCache.set(permission, hasAccess);
    
    return hasAccess;
  }

  /**
   * Check if user has any of the provided permissions
   */
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  /**
   * Check if user has all of the provided permissions
   */
  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }

  /**
   * Set user permissions (called after fetching from API)
   */
  setUserPermissions(permissions: string[]): void {
    this.userPermissions = permissions;
    this.clearCache();
  }

  /**
   * Clear permission cache (useful when permissions change)
   */
  clearCache(): void {
    this.permissionCache.clear();
  }

  /**
   * Get all user permissions
   */
  getUserPermissions(): string[] {
    return [...this.userPermissions];
  }

  /**
   * Check permission with pattern matching (future enhancement)
   * For LOCI integration where we might have patterns like "processes.*"
   */
  hasPermissionPattern(pattern: string): boolean {
    // Simple wildcard matching
    if (pattern.includes('*')) {
      const regexPattern = pattern.replace(/\*/g, '.*');
      const regex = new RegExp(`^${regexPattern}$`);
      return this.userPermissions.some(permission => regex.test(permission));
    }
    
    return this.hasPermission(pattern);
  }

  /**
   * Get available permissions for a specific module
   */
  getModulePermissions(module: string): string[] {
    return this.userPermissions.filter(permission => 
      permission.startsWith(`${module}.`)
    );
  }

  /**
   * Get permissions by layer (service, page, element)
   */
  getPermissionsByLayer(layer: 'service' | 'page' | 'element'): string[] {
    // This would be enhanced when we have more structured permission data
    switch (layer) {
      case 'service':
        return this.userPermissions.filter(p => p.includes('.service.'));
      case 'page':
        return this.userPermissions.filter(p => 
          !p.includes('.service.') && !p.includes('.element.')
        );
      case 'element':
        return this.userPermissions.filter(p => p.includes('.element.'));
      default:
        return [];
    }
  }

  /**
   * Debug helper to log permission check
   */
  debugPermissionCheck(permission: string, result: boolean): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔐 Permission Check: ${permission} = ${result ? '✅ GRANTED' : '❌ DENIED'}`);
    }
  }
}

// Export singleton instance
export const permissionService = new PermissionService();

// Helper functions for common permission patterns
export const PermissionPatterns = {
  // Dashboard permissions
  DASHBOARD_VIEW: 'dashboard.view',
  
  // Process permissions
  PROCESSES_VIEW: 'processes.view',
  PROCESSES_CREATE: 'processes.create',
  PROCESSES_BUILDER: 'processes.builder.access',
  
  // Workflow permissions
  WORKFLOWS_VIEW: 'workflows.view',
  WORKFLOWS_EDIT: 'workflows.edit',
  WORKFLOWS_IMPORT: 'workflows.import',
  
  // Analytics permissions
  ANALYTICS_VIEW: 'analytics.view',
  ANALYTICS_ADMIN: 'analytics.admin',
  
  // Compliance permissions
  COMPLIANCE_VIEW: 'compliance.view',
  
  // Service-level permissions
  PROCESSES_SERVICE: 'processes.service.access',
  CONTRACTORS_SERVICE: 'contractors.service.access',
  DOCUMENTS_SERVICE: 'documents.service.access',
  PERMITS_SERVICE: 'permits.service.access',
  USERS_SERVICE: 'users.service.access'
};

// Type for permission constants
export type PermissionConstant = typeof PermissionPatterns[keyof typeof PermissionPatterns];