// Permission Components - Export all permission-aware components

// Core permission components
export { 
  PermissionGuard, 
  PermissionBoundary, 
  AdminOnly, 
  ManagerAndAbove, 
  AuthenticatedOnly 
} from './PermissionGuard';

export { 
  PermissionButton,
  PermissionPrimaryButton,
  PermissionSecondaryButton,
  PermissionDangerButton,
  PermissionSuccessButton,
  PermissionOutlineButton,
  PermissionGhostButton
} from './PermissionButton';

export { 
  PermissionCard,
  PermissionKPICard,
  PermissionStatusCard
} from './PermissionCard';

export { 
  PermissionLink,
  PermissionNavItem,
  PermissionBreadcrumb,
  PermissionButtonLink,
  PermissionTab
} from './PermissionLink';

// Re-export types
export type { PermissionGuardProps } from './PermissionGuard';
export type { PermissionButtonProps } from './PermissionButton';
export type { PermissionCardProps, PermissionKPICardProps, PermissionStatusCardProps } from './PermissionCard';
export type { PermissionLinkProps, PermissionNavItemProps, PermissionTabProps } from './PermissionLink';

// Permission context and service
export { 
  PermissionProvider, 
  usePermissions, 
  useHasPermission, 
  PermissionDebugger 
} from '@/contexts/PermissionContext';

export { 
  permissionService, 
  PermissionPatterns 
} from '@/services/permissionService';

export type { 
  UserPermissions, 
  PermissionContextType 
} from '@/contexts/PermissionContext';

export type { 
  PermissionConstant 
} from '@/services/permissionService';