"use client";

import React, { ReactNode, HTMLAttributes } from 'react';
import { usePermissions } from '@/contexts/PermissionContext';

export interface PermissionCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Required permission to view the card */
  permission?: string;
  /** Array of permissions - user needs ANY of these */
  anyPermission?: string[];
  /** Array of permissions - user needs ALL of these */
  allPermissions?: string[];
  /** Card content */
  children: ReactNode;
  /** Whether to hide card when no permission (vs showing restricted message) */
  hideWhenDenied?: boolean;
  /** Show loading state while permissions load */
  showLoading?: boolean;
  /** Custom restricted access message */
  restrictedMessage?: string;
  /** Show restricted message with styling */
  showRestrictedMessage?: boolean;
  /** Unique element ID for permission tracking (development only) */
  permissionId?: string;
}

/**
 * PermissionCard - Card/Container component that checks permissions before showing content
 * 
 * Usage:
 * <PermissionCard permission="processes.view" className="bg-base-100 p-4">
 *   <ProcessKPIData />
 * </PermissionCard>
 */
export function PermissionCard({
  permission,
  anyPermission,
  allPermissions,
  children,
  hideWhenDenied = false,
  showLoading = false,
  restrictedMessage = "Access to this information is restricted",
  showRestrictedMessage = true,
  className = '',
  permissionId,
  ...divProps
}: PermissionCardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, loading } = usePermissions();

  // Show loading state if requested
  if (loading && showLoading) {
    return (
      <div 
        className={`card bg-base-100 shadow-lg ${className}`}
        {...divProps}
      >
        <div className="card-body items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-sm text-base-content/60 mt-2">Loading permissions...</p>
        </div>
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

  // If user has access, render children normally
  if (hasAccess) {
    return (
      <div className={className} data-permission-id={permissionId} {...divProps}>
        {children}
      </div>
    );
  }

  // If user lacks permission and we should hide the card
  if (!hasAccess && hideWhenDenied) {
    return null;
  }

  // Show restricted access message
  if (showRestrictedMessage) {
    return (
      <div 
        className={`card bg-base-100 shadow-lg border-2 border-dashed border-base-300 ${className}`}
        data-permission-id={permissionId}
        {...divProps}
      >
        <div className="card-body items-center justify-center text-center">
          <div className="text-4xl text-base-content/30 mb-2">🔒</div>
          <h3 className="text-lg font-medium text-base-content/60">Access Restricted</h3>
          <p className="text-sm text-base-content/50">{restrictedMessage}</p>
        </div>
      </div>
    );
  }

  // Return empty placeholder
  return (
    <div className={`opacity-50 ${className}`} data-permission-id={permissionId} {...divProps}>
      <div className="bg-base-200 rounded-lg p-8 text-center">
        <div className="text-2xl text-base-content/30">🔒</div>
      </div>
    </div>
  );
}

/**
 * Convenience components for common card patterns
 */

// KPI Card with permissions
export interface PermissionKPICardProps extends Omit<PermissionCardProps, 'children'> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  children?: ReactNode; // Make children optional for KPI cards
}

export function PermissionKPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = '',
  ...permissionProps
}: PermissionKPICardProps) {
  return (
    <PermissionCard 
      {...permissionProps}
      className={`bg-base-100 rounded-lg shadow-lg p-6 border border-base-300 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <p className="text-base-content/60 text-sm">{title}</p>
          <p className="text-2xl font-bold text-base-content">{value}</p>
        </div>
        {icon && (
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl" style={{ fontSize: '1.25rem', lineHeight: '1' }}>{icon}</span>
          </div>
        )}
      </div>
      {(subtitle || trend) && (
        <div className="mt-2 text-center">
          {subtitle && (
            <p className="text-base-content/60 text-sm">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-sm mt-1 ${trend.positive ? 'text-success' : 'text-error'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
      )}
    </PermissionCard>
  );
}

// Status Card with permissions
export interface PermissionStatusCardProps extends Omit<PermissionCardProps, 'children'> {
  title: string;
  items: Array<{
    label: string;
    value: string | number;
    badge?: 'success' | 'warning' | 'error' | 'info' | 'primary';
  }>;
  children?: ReactNode; // Make children optional for status cards
}

export function PermissionStatusCard({
  title,
  items,
  className = '',
  ...permissionProps
}: PermissionStatusCardProps) {
  return (
    <PermissionCard 
      {...permissionProps}
      className={`bg-base-100 rounded-lg shadow-lg p-6 border border-base-300 ${className}`}
    >
      <h2 className="text-xl font-bold text-base-content mb-4">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-base-content/70">{item.label}</span>
            {item.badge ? (
              <span className={`badge badge-${item.badge}`}>{item.value}</span>
            ) : (
              <span className="font-medium">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </PermissionCard>
  );
}