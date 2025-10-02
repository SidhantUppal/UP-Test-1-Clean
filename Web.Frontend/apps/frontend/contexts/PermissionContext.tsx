"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Permission types
export interface UserPermissions {
  userId: number;
  tenantId: number;
  permissions: string[];
}

export interface PermissionContextType {
  permissions: string[];
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  loading: boolean;
  error: string | null;
  refreshPermissions: () => Promise<void>;
}

// Create context
const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

// Hook to use permissions
export function usePermissions(): PermissionContextType {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
}

// Hook for single permission check
export function useHasPermission(permission: string): boolean {
  const { hasPermission } = usePermissions();
  return hasPermission(permission);
}

// Mock permission data for development (will be replaced by API)
const mockPermissionsByRole = {
  admin: [
    // Page permissions
    'dashboard.view',
    'processes.view',
    'processes.create', 
    'processes.builder.access',
    'workflows.view',
    'workflows.edit',
    'workflows.import',
    'compliance.view',
    'analytics.view',
    'analytics.admin',
    'contractors.view',
    'contractors.create',
    'permits.view',
    'permits.create',
    'users.view',
    'users.create',
    // Admin permissions
    'admin.dashboard.view',
    'admin.tenants.manage',
    'admin.users.manage',
    'admin.trials.manage',
    'admin.analytics.view',
    'admin.support.manage',
    'admin.monitoring.view',
    'admin.partners.manage',
    'admin.billing.manage',
    'admin.config.manage',
    'admin.audit.view',
    'admin.reports.view',
    // Service permissions
    'processes.service.access',
    'contractors.service.access', 
    'documents.service.access',
    'permits.service.access',
    'users.service.access',
    'sys-admin.service.access'
  ],
  manager: [
    'dashboard.view',
    'processes.view',
    'processes.create',
    'workflows.view',
    'workflows.edit',
    'compliance.view',
    'analytics.view',
    'contractors.view',
    'contractors.create',
    'permits.view',
    'permits.create',
    'processes.service.access',
    'contractors.service.access',
    'permits.service.access'
  ],
  operator: [
    'dashboard.view',
    'processes.view',
    'workflows.view',
    'compliance.view',
    'contractors.view',
    'permits.view',
    'processes.service.access',
    'contractors.service.access'
  ],
  viewer: [
    'dashboard.view',
    'processes.view',
    'workflows.view',
    'compliance.view'
  ]
};

// Mock current user role (in real app, this would come from auth)
const MOCK_USER_ROLE = 'admin'; // Change this to test different roles

// Permission provider component
export function PermissionProvider({ children }: { children: ReactNode }) {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock API call to fetch permissions
  const fetchPermissions = async (): Promise<UserPermissions> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, this would be:
    // const response = await fetch('/api/auth/permissions');
    // return response.json();
    
    return {
      userId: 1,
      tenantId: 1,
      permissions: mockPermissionsByRole[MOCK_USER_ROLE] || []
    };
  };

  // Load permissions
  const loadPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const userPermissions = await fetchPermissions();
      setPermissions(userPermissions.permissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load permissions');
      console.error('Error loading permissions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load permissions on mount
  useEffect(() => {
    loadPermissions();
  }, []);

  // Permission checking functions
  const hasPermission = (permission: string): boolean => {
    // TEMPORARILY DISABLED - Always return true for development
    return true;
    // return permissions.includes(permission);
  };

  const hasAnyPermission = (permissionList: string[]): boolean => {
    // TEMPORARILY DISABLED - Always return true for development
    return true;
    // return permissionList.some(permission => permissions.includes(permission));
  };

  const hasAllPermissions = (permissionList: string[]): boolean => {
    // TEMPORARILY DISABLED - Always return true for development
    return true;
    // return permissionList.every(permission => permissions.includes(permission));
  };

  const refreshPermissions = async (): Promise<void> => {
    await loadPermissions();
  };

  const value: PermissionContextType = {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    loading,
    error,
    refreshPermissions
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

// Debug component to show current permissions (development only)
export function PermissionDebugger() {
  const { permissions, loading, error } = usePermissions();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (loading) return <div className="text-sm text-gray-500">Loading permissions...</div>;
  if (error) return <div className="text-sm text-red-500">Permission error: {error}</div>;

  return (
    <details className="text-xs bg-gray-100 p-2 rounded mt-4">
      <summary className="cursor-pointer font-medium">
        Permission Debug ({permissions.length} permissions)
      </summary>
      <ul className="mt-2 space-y-1">
        {permissions.map((permission, index) => (
          <li key={index} className="font-mono text-xs">
            ✓ {permission}
          </li>
        ))}
      </ul>
    </details>
  );
}