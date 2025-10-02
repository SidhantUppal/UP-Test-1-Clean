"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import { authHeaderService } from '@/services/authHeaderService';

// User role types
export type UserRole = 'admin' | 'manager' | 'read-only' | 'operator' | 'employee' | 'contractor' | 'tenant-custom';

// User profile interface
export interface UserProfile {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: number;
  tenantName: string;
  departmentId?: number;
  departmentName?: string;
  locationId?: number;
  locationName?: string;
  customRole?: string; // For tenant-specific roles
  avatar?: string;
  permissions: string[];
  lastLogin?: Date;
  isActive: boolean;
}

// User context type
export interface UserContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

// Create context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use user context
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Hook for role-specific logic
export function useUserRole(): UserRole | null {
  const { role } = useUser();
  return role;
}

// Hook to check if user has specific role
export function useHasRole(requiredRole: UserRole): boolean {
  const { role } = useUser();
  return role === requiredRole;
}

// Hook to check if user has any of the specified roles
export function useHasAnyRole(roles: UserRole[]): boolean {
  const { role } = useUser();
  return role ? roles.includes(role) : false;
}

// Mock user data by role for development
const mockUsersByRole: Record<UserRole, UserProfile> = {
  admin: {
    userId: 1,
    email: 'admin@t100safety.com',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'admin',
    tenantId: 0,
    tenantName: 'T100 Platform',
    permissions: [
      'admin.*',
      'dashboard.view',
      'tenants.manage',
      'users.manage',
      'system.configure',
      'analytics.admin',
      'billing.manage',
      'audit.view'
    ],
    isActive: true
  },
  manager: {
    userId: 2,
    email: 'manager@company.com',
    firstName: 'Site',
    lastName: 'Manager',
    role: 'manager',
    tenantId: 1,
    tenantName: 'Acme Construction',
    departmentId: 1,
    departmentName: 'Operations',
    permissions: [
      'dashboard.view',
      'teams.manage',
      'incidents.manage',
      'compliance.view',
      'contractors.manage',
      'permits.approve',
      'reports.generate'
    ],
    isActive: true
  },
  'read-only': {
    userId: 3,
    email: 'viewer@company.com',
    firstName: 'Report',
    lastName: 'Viewer',
    role: 'read-only',
    tenantId: 1,
    tenantName: 'Acme Construction',
    permissions: [
      'dashboard.view',
      'reports.view',
      'analytics.view',
      'documents.view',
      'incidents.view'
    ],
    isActive: true
  },
  operator: {
    userId: 4,
    email: 'operator@company.com',
    firstName: 'Safety',
    lastName: 'Operator',
    role: 'operator',
    tenantId: 1,
    tenantName: 'Acme Construction',
    departmentId: 2,
    departmentName: 'Safety',
    permissions: [
      'dashboard.view',
      'tasks.view',
      'inspections.perform',
      'permits.request',
      'incidents.report',
      'checklists.complete'
    ],
    isActive: true
  },
  employee: {
    userId: 5,
    email: 'employee@company.com',
    firstName: 'John',
    lastName: 'Worker',
    role: 'employee',
    tenantId: 1,
    tenantName: 'Acme Construction',
    departmentId: 3,
    departmentName: 'Construction',
    permissions: [
      'dashboard.view',
      'training.view',
      'documents.view',
      'tasks.my',
      'incidents.report'
    ],
    isActive: true
  },
  contractor: {
    userId: 6,
    email: 'contractor@external.com',
    firstName: 'External',
    lastName: 'Contractor',
    role: 'contractor',
    tenantId: 1,
    tenantName: 'Acme Construction',
    permissions: [
      'dashboard.view',
      'projects.assigned',
      'documents.required',
      'compliance.view',
      'permits.view'
    ],
    isActive: true
  },
  'tenant-custom': {
    userId: 7,
    email: 'custom@company.com',
    firstName: 'Custom',
    lastName: 'Role',
    role: 'tenant-custom',
    customRole: 'Quality Inspector',
    tenantId: 1,
    tenantName: 'Acme Construction',
    permissions: [
      'dashboard.view',
      'quality.inspect',
      'audits.perform',
      'reports.quality'
    ],
    isActive: true
  }
};

// Mock current user (will be replaced with actual auth)
const MOCK_CURRENT_USER_ROLE: UserRole = 'employee'; // Change this to test different roles

// Helper function to decode JWT token
const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// User provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user profile from AuthContext
  const authContext = useAuth();

  const fetchUserProfile = async (): Promise<UserProfile> => {
    try {
      // First try authHeaderService (which uses localStorage JWT token)
      const token = localStorage.getItem('auth-token');

      if (token) {
        const jwtPayload = decodeJWT(token);
        if (jwtPayload) {
          // Set authHeaderService context with the JWT data
          authHeaderService.setAuthContext({
            userId: jwtPayload.nameid || jwtPayload.sub,
            userAreaId: jwtPayload.UserAreaId,
            token: token
          });

          // Extract user info from JWT token
          return {
            userId: parseInt(jwtPayload.nameid || jwtPayload.sub || '0'),
            email: jwtPayload.email || 'user@localhost',
            firstName: jwtPayload.FullName?.split(' ')[0] || jwtPayload.unique_name || 'User',
            lastName: jwtPayload.FullName?.split(' ').slice(1).join(' ') || '',
            role: (jwtPayload.role || 'employee') as UserRole,
            tenantId: parseInt(jwtPayload.UserAreaId || '1'),
            tenantName: 'Default Tenant',
            permissions: [], // Will be populated by PermissionProvider
            isActive: true
          };
        }
      }

      // Fallback to AuthContext if JWT token method fails
      if (authContext?.isAuthenticated && authContext?.user) {
        const authUser = authContext.user;
        return {
          userId: authUser.userId || 0,
          email: authUser.email || '',
          firstName: authUser.firstName || authUser.fullName?.split(' ')[0] || 'User',
          lastName: authUser.lastName || authUser.fullName?.split(' ').slice(1).join(' ') || '',
          role: (authUser.roles && authUser.roles.length > 0 ? authUser.roles[0] : 'employee') as UserRole,
          tenantId: authUser.userAreaId || 1,
          tenantName: 'Default Tenant',
          permissions: [], // Will be populated by PermissionProvider
          isActive: true
        };
      }

      throw new Error('No authentication method available');
    } catch (error) {
      // Fallback to mock for development if auth fails
      console.warn('Auth failed, using mock data:', error);
      return mockUsersByRole[MOCK_CURRENT_USER_ROLE];
    }
  };

  // Load user profile
  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userProfile = await fetchUserProfile();
      setUser(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user profile');
      console.error('Error loading user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load user when AuthContext changes
  useEffect(() => {
    loadUser();
  }, [authContext?.isAuthenticated, authContext?.user]);

  // Login function (mock)
  const login = async (credentials: { email: string; password: string }): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      
      await loadUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setError(null);
    // In production: clear tokens, redirect, etc.
  };

  // Refresh user profile
  const refreshUser = async (): Promise<void> => {
    await loadUser();
  };

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In production:
      // const response = await fetch('/api/auth/profile', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      
      setUser({ ...user, ...updates });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: UserContextType = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    refreshUser,
    updateProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Debug component for development
export function UserDebugger() {
  const { user, loading, error, isAuthenticated } = useUser();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (loading) return <div className="text-sm text-gray-500">Loading user...</div>;
  if (error) return <div className="text-sm text-red-500">User error: {error}</div>;

  return (
    <details className="text-xs bg-blue-50 p-2 rounded mt-4 border">
      <summary className="cursor-pointer font-medium text-blue-800">
        User Debug ({isAuthenticated ? 'Authenticated' : 'Not Authenticated'})
      </summary>
      {user && (
        <div className="mt-2 space-y-1 text-blue-700">
          <div><strong>Name:</strong> {user.firstName} {user.lastName}</div>
          <div><strong>Role:</strong> {user.role} {user.customRole && `(${user.customRole})`}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Tenant:</strong> {user.tenantName}</div>
          {user.departmentName && <div><strong>Department:</strong> {user.departmentName}</div>}
          <div><strong>Permissions:</strong> {user.permissions.length} granted</div>
        </div>
      )}
    </details>
  );
}