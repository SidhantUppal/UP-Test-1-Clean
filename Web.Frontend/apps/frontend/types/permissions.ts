/**
 * Permission System Types
 *
 * Types for the permission and UI element configuration system
 */

export interface UIElement {
  elementId: string;
  name: string;
  type: 'Button' | 'Link' | 'Table' | 'Form' | 'Dropdown' | 'Modal' | 'Tab' | 'Card' | 'Chart' | 'Menu';
  r0?: boolean;
  displayMode?: 'visible' | 'hidden' | 'disabled';
  permissions: Record<string, boolean>;
  apiActions?: {
    create?: string;
    read?: string;
    update?: string;
    delete?: string;
    custom?: Array<{
      method: string;
      endpoint: string;
      description: string;
    }>;
  };
  notes?: string;
  dropdownConfig?: {
    dataEndpoint: string;
    cacheStrategy: string;
    filterable: boolean;
  };
}

export interface Permission {
  id: string;
  role: string;
  moduleId: string;
  pageId?: string;
  elementId?: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
  pages: Page[];
}

export interface Page {
  id: string;
  name: string;
  route: string;
  moduleId: string;
  elements: UIElement[];
}