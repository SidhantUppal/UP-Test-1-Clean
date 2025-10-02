"use client";

import React, { ReactNode } from 'react';
import { usePermissions } from '@/contexts/PermissionContext';

export interface PermissionGuardProps {
  /** Required permission(s) to view the content */
  permission?: string;
  /** Array of permissions - user needs ANY of these */
  anyPermission?: string[];
  /** Array of permissions - user needs ALL of these */
  allPermissions?: string[];
  /** Content to render when user has permission */
  children: ReactNode;
  /** Content to render when user lacks permission (optional) */
  fallback?: ReactNode;
  /** Whether to show loading state while permissions are loading */
  showLoading?: boolean;
  /** Custom loading component */
  loadingComponent?: ReactNode;
  /** Whether to render nothing when no permission (vs showing fallback) */
  hideWhenDenied?: boolean;
}

/**
 * PermissionGuard - Wraps content that should only be visible to users with specific permissions
 * 
 * Usage:
 * <PermissionGuard permission="processes.create">
 *   <CreateProcessButton />
 * </PermissionGuard>
 * 
 * <PermissionGuard anyPermission={["admin", "manager"]}>
 *   <AdminPanel />
 * </PermissionGuard>
 */
export function PermissionGuard({
  permission,
  anyPermission,
  allPermissions,
  children,
  fallback,
  showLoading = false,
  loadingComponent,
  hideWhenDenied = true
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, loading } = usePermissions();

  // Show loading state if requested
  if (loading && showLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    return (
      <div className="flex items-center justify-center p-2">
        <span className="loading loading-spinner loading-sm"></span>
        <span className="ml-2 text-sm text-base-content/60">Loading...</span>
      </div>
    );
  }

  // Determine if user has required permissions
  let hasAccess = true;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (anyPermission && anyPermission.length > 0) {
    hasAccess = hasAnyPermission(anyPermission);
  } else if (allPermissions && allPermissions.length > 0) {
    hasAccess = hasAllPermissions(allPermissions);
  }

  // If user has access, render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // If user lacks access
  if (hideWhenDenied) {
    return null; // Render nothing
  }

  // Show fallback content if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default fallback for access denied
  return (
    <div className="text-center p-4 text-base-content/50">
      <div className="text-2xl mb-2">🔒</div>
      <p className="text-sm">Access Restricted</p>
    </div>
  );
}

/**
 * PermissionBoundary - Similar to ErrorBoundary but for permissions
 * Provides a standardized way to handle permission failures
 */
export interface PermissionBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  showError?: boolean;
}

export function PermissionBoundary({ 
  children, 
  fallback,
  showError = false 
}: PermissionBoundaryProps) {
  const { error, loading } = usePermissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error && showError) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Permission system error: {error}</span>
      </div>
    );
  }

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Convenience components for common permission patterns
 */

// Admin-only content
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGuard 
      anyPermission={['admin', 'system.admin']} 
      fallback={fallback}
    >
      {children}
    </PermissionGuard>
  );
}

// Manager and above
export function ManagerAndAbove({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <PermissionGuard 
      anyPermission={['admin', 'manager', 'system.admin']} 
      fallback={fallback}
    >
      {children}
    </PermissionGuard>
  );
}

// Authenticated users only (has any permission)
export function AuthenticatedOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { permissions } = usePermissions();
  
  if (permissions.length === 0) {
    return fallback ? <>{fallback}</> : null;
  }
  
  return <>{children}</>;
}