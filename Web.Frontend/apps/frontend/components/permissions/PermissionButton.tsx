"use client";

import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { usePermissions } from '@/contexts/PermissionContext';

export interface PermissionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required permission to enable the button */
  permission?: string;
  /** Array of permissions - user needs ANY of these */
  anyPermission?: string[];
  /** Array of permissions - user needs ALL of these */
  allPermissions?: string[];
  /** Button content */
  children: ReactNode;
  /** Whether to hide button when no permission (vs showing disabled) */
  hideWhenDenied?: boolean;
  /** Show loading state while permissions load */
  showLoading?: boolean;
  /** Custom disabled message tooltip */
  disabledMessage?: string;
  /** Unique element ID for permission tracking (development only) */
  permissionId?: string;
}

/**
 * PermissionButton - Button component that checks permissions before allowing interaction
 * 
 * Usage:
 * <PermissionButton permission="processes.create" className="btn btn-primary">
 *   Create Process
 * </PermissionButton>
 */
export function PermissionButton({
  permission,
  anyPermission,
  allPermissions,
  children,
  hideWhenDenied = false,
  showLoading = false,
  disabledMessage = "You don't have permission for this action",
  className = '',
  disabled = false,
  title,
  permissionId,
  ...buttonProps
}: PermissionButtonProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, loading } = usePermissions();

  // Show loading state if requested
  if (loading && showLoading) {
    return (
      <button 
        className={`btn ${className}`}
        disabled={true}
        {...buttonProps}
      >
        <span className="loading loading-spinner loading-sm"></span>
        Loading...
      </button>
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

  // If user lacks permission and we should hide the button
  if (!hasAccess && hideWhenDenied) {
    return null;
  }

  // Determine final disabled state
  const finalDisabled = disabled || !hasAccess;

  // Determine tooltip/title
  const finalTitle = !hasAccess ? disabledMessage : title;

  return (
    <button
      className={`btn ${className} ${!hasAccess ? 'btn-disabled' : ''}`}
      disabled={finalDisabled}
      title={finalTitle}
      data-permission-id={permissionId}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

/**
 * Convenience components for common button patterns
 */

// Primary action button with permission
export function PermissionPrimaryButton(props: PermissionButtonProps) {
  return (
    <PermissionButton 
      {...props} 
      className={`btn-primary ${props.className || ''}`}
    />
  );
}

// Secondary action button with permission
export function PermissionSecondaryButton(props: PermissionButtonProps) {
  return (
    <PermissionButton 
      {...props} 
      className={`btn-secondary ${props.className || ''}`}
    />
  );
}

// Danger/Delete button with permission
export function PermissionDangerButton(props: PermissionButtonProps) {
  return (
    <PermissionButton 
      {...props} 
      className={`btn-error ${props.className || ''}`}
    />
  );
}

// Success/Confirm button with permission
export function PermissionSuccessButton(props: PermissionButtonProps) {
  return (
    <PermissionButton 
      {...props} 
      className={`btn-success ${props.className || ''}`}
    />
  );
}

// Outline button with permission
export function PermissionOutlineButton(props: PermissionButtonProps) {
  return (
    <PermissionButton 
      {...props} 
      className={`btn-outline ${props.className || ''}`}
    />
  );
}

// Ghost button with permission
export function PermissionGhostButton(props: PermissionButtonProps) {
  return (
    <PermissionButton 
      {...props} 
      className={`btn-ghost ${props.className || ''}`}
    />
  );
}