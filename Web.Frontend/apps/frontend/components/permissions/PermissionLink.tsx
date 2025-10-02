"use client";

import React, { ReactNode, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { usePermissions } from '@/contexts/PermissionContext';

export interface PermissionLinkProps {
  /** Required permission to show the link */
  permission?: string;
  /** Array of permissions - user needs ANY of these */
  anyPermission?: string[];
  /** Array of permissions - user needs ALL of these */
  allPermissions?: string[];
  /** Link destination */
  href: string;
  /** Link content */
  children: ReactNode;
  /** Whether to hide link when no permission (vs showing disabled) */
  hideWhenDenied?: boolean;
  /** Show loading state while permissions load */
  showLoading?: boolean;
  /** CSS classes */
  className?: string;
  /** Additional props passed to Next.js Link */
  linkProps?: Parameters<typeof Link>[0];
  /** Show disabled styling when no permission */
  showDisabled?: boolean;
  /** Unique element ID for permission tracking (development only) */
  permissionId?: string;
}

/**
 * PermissionLink - Link component that checks permissions before allowing navigation
 * 
 * Usage:
 * <PermissionLink permission="processes.view" href="/processes">
 *   View Processes
 * </PermissionLink>
 */
export function PermissionLink({
  permission,
  anyPermission,
  allPermissions,
  href,
  children,
  hideWhenDenied = false,
  showLoading = false,
  className = '',
  linkProps,
  showDisabled = true,
  permissionId,
  ...anchorProps
}: PermissionLinkProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, loading } = usePermissions();

  // Show loading state if requested
  if (loading && showLoading) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className="loading loading-spinner loading-xs mr-1"></span>
        <span className="text-base-content/50">Loading...</span>
      </span>
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

  // If user lacks permission and we should hide the link
  if (!hasAccess && hideWhenDenied) {
    return null;
  }

  // If user has access, render normal link
  if (hasAccess) {
    return (
      <Link href={href} className={className} data-permission-id={permissionId} {...linkProps}>
        {children}
      </Link>
    );
  }

  // Show disabled link
  if (showDisabled) {
    return (
      <span 
        className={`cursor-not-allowed opacity-50 ${className}`}
        title="You don't have permission to access this page"
        data-permission-id={permissionId}
      >
        {children}
      </span>
    );
  }

  // Return empty placeholder
  return null;
}

/**
 * Convenience components for common navigation patterns
 */

// Navigation menu item with permission
export interface PermissionNavItemProps extends PermissionLinkProps {
  isActive?: boolean;
  icon?: string;
}

export function PermissionNavItem({
  isActive = false,
  icon,
  children,
  className = '',
  ...props
}: PermissionNavItemProps) {
  const baseClasses = "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors";
  const activeClasses = isActive 
    ? "bg-primary text-primary-content" 
    : "text-base-content hover:bg-base-200";
  
  return (
    <PermissionLink 
      {...props}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </PermissionLink>
  );
}

// Breadcrumb item with permission
export function PermissionBreadcrumb({
  children,
  className = '',
  ...props
}: PermissionLinkProps) {
  return (
    <PermissionLink 
      {...props}
      className={`text-sm text-base-content/70 hover:text-base-content ${className}`}
    >
      {children}
    </PermissionLink>
  );
}

// Button-styled link with permission
export function PermissionButtonLink({
  children,
  className = '',
  ...props
}: PermissionLinkProps) {
  return (
    <PermissionLink 
      {...props}
      className={`btn ${className}`}
    >
      {children}
    </PermissionLink>
  );
}

// Tab link with permission
export interface PermissionTabProps extends PermissionLinkProps {
  isActive?: boolean;
}

export function PermissionTab({
  isActive = false,
  children,
  className = '',
  ...props
}: PermissionTabProps) {
  const tabClasses = isActive ? "tab tab-active" : "tab";
  
  return (
    <PermissionLink 
      {...props}
      className={`${tabClasses} ${className}`}
    >
      {children}
    </PermissionLink>
  );
}