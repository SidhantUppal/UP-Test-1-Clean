// Dev Engine Service Client
// Manages communication with the Dev Engine backend service

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_DEV_ENGINE_API_URL || 'http://localhost:3025/api/dev-engine';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-userarea-id': '1', // TODO: Get from auth context
    'x-user-id': '1' // TODO: Get from auth context
  }
});

// Types
export interface Module {
  id: number;
  moduleCode: string;
  name: string;
  description?: string;
  displayOrder: number;
  icon?: string;
  baseRoute?: string;
  isActive: boolean;
  pageCount?: number;
  elementCount?: number;
}

export interface Page {
  id: number;
  moduleId: number;
  pageCode: string;
  name: string;
  description?: string;
  route?: string;
  displayOrder: number;
  requiredPermission?: string;
  isActive: boolean;
  moduleCode?: string;
  moduleName?: string;
  elementCount?: number;
}

export interface ElementType {
  id: number;
  name: string;
  code: string;
  description?: string;
  icon?: string;
}

export interface Element {
  id: number;
  pageId: number;
  elementTypeId: number;
  elementCode: string;
  name: string;
  description?: string;
  requiredPermission?: string;
  isR0: boolean;
  displayMode: string;
  isImplemented: boolean;
  authorityType?: string;
  authorityDisplayName?: string;
  authorityRiskLevel?: string;
  authorityMaxDuration?: number;
  elementType?: string;
}

export interface RolePermission {
  roleId: number;
  roleName: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface ApiMapping {
  id: number;
  elementId: number;
  actionType: string;
  method: string;
  endpoint: string;
  requiresAuth: boolean;
}

export interface PermissionSummary {
  modules: number;
  pages: number;
  elements: number;
  implemented: number;
  authority_mapped: number;
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  elements?: any[];
  permissions?: string[];
}

// Module Service
export const moduleService = {
  async getAll(): Promise<Module[]> {
    const response = await apiClient.get('/modules');
    return response.data.data;
  },

  async getById(id: number): Promise<Module> {
    const response = await apiClient.get(`/modules/${id}`);
    return response.data.data;
  },

  async create(module: Partial<Module>): Promise<Module> {
    const response = await apiClient.post('/modules', module);
    return response.data.data;
  },

  async update(id: number, module: Partial<Module>): Promise<void> {
    await apiClient.put(`/modules/${id}`, module);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/modules/${id}`);
  }
};

// Page Service
export const pageService = {
  async getAll(moduleId?: number): Promise<Page[]> {
    const params = moduleId ? { moduleId } : {};
    const response = await apiClient.get('/pages', { params });
    return response.data.data;
  },

  async getById(id: number): Promise<Page> {
    const response = await apiClient.get(`/pages/${id}`);
    return response.data.data;
  },

  async create(page: Partial<Page>): Promise<Page> {
    const response = await apiClient.post('/pages', page);
    return response.data.data;
  },

  async update(id: number, page: Partial<Page>): Promise<void> {
    await apiClient.put(`/pages/${id}`, page);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/pages/${id}`);
  },

  async getElements(pageId: number): Promise<Element[]> {
    const response = await apiClient.get(`/pages/${pageId}/elements`);
    return response.data.data;
  }
};

// Element Service
export const elementService = {
  async getAll(pageId?: number): Promise<Element[]> {
    const params = pageId ? { pageId } : {};
    const response = await apiClient.get('/elements', { params });
    return response.data.data;
  },

  async getById(id: number): Promise<Element> {
    const response = await apiClient.get(`/elements/${id}`);
    return response.data.data;
  },

  async create(element: Partial<Element>): Promise<Element> {
    const response = await apiClient.post('/elements', element);
    return response.data.data;
  },

  async update(id: number, element: Partial<Element>): Promise<void> {
    await apiClient.put(`/elements/${id}`, element);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/elements/${id}`);
  },

  async getRoles(elementId: number): Promise<RolePermission[]> {
    const response = await apiClient.get(`/elements/${elementId}/roles`);
    return response.data.data;
  },

  async updateRole(elementId: number, roleId: number, permissions: Partial<RolePermission>): Promise<void> {
    await apiClient.put(`/elements/${elementId}/roles/${roleId}`, permissions);
  },

  async getApis(elementId: number): Promise<ApiMapping[]> {
    const response = await apiClient.get(`/elements/${elementId}/apis`);
    return response.data.data;
  }
};

// Permission Service
export const permissionService = {
  async getSummary(): Promise<PermissionSummary> {
    const response = await apiClient.get('/permissions/summary');
    return response.data.data;
  },

  async getMatrix(): Promise<{ roles: any[], matrix: any[] }> {
    const response = await apiClient.get('/permissions/matrix');
    return response.data.data;
  },

  async getAuthorityMappings(): Promise<any[]> {
    const response = await apiClient.get('/permissions/authority');
    return response.data.data;
  },

  async validate(): Promise<{ valid: boolean, issues: ValidationIssue[] }> {
    const response = await apiClient.post('/permissions/validate');
    return response.data;
  },

  async exportToCsv(): Promise<Blob> {
    const response = await apiClient.post('/permissions/export', { format: 'csv' }, {
      responseType: 'blob'
    });
    return response.data;
  }
};

// Sync Service
export const syncService = {
  async syncPermissions(): Promise<any> {
    const response = await apiClient.post('/sync/permissions');
    return response.data;
  },

  async syncAuthority(): Promise<any> {
    const response = await apiClient.post('/sync/authority');
    return response.data;
  },

  async discoverElements(): Promise<any> {
    const response = await apiClient.post('/sync/discover');
    return response.data;
  },

  async getSyncHistory(): Promise<any[]> {
    const response = await apiClient.get('/sync/history');
    return response.data.data;
  },

  async generateCode(target: 'typescript' | 'javascript' = 'typescript'): Promise<{ code: string, modules: number, endpoints: number }> {
    const response = await apiClient.post('/sync/generate-code', { target });
    return response.data;
  }
};

// Element Type Service (using static data for now)
export const elementTypeService = {
  async getAll(): Promise<ElementType[]> {
    // TODO: Move to backend when element types API is ready
    return [
      { id: 1, name: 'Button', code: 'BTN', icon: 'FiMousePointer' },
      { id: 2, name: 'Link', code: 'LNK', icon: 'FiLink' },
      { id: 3, name: 'Tab', code: 'TAB', icon: 'FiColumns' },
      { id: 4, name: 'Form', code: 'FRM', icon: 'FiEdit' },
      { id: 5, name: 'Section', code: 'SEC', icon: 'FiSquare' },
      { id: 6, name: 'Modal', code: 'MDL', icon: 'FiMaximize2' },
      { id: 7, name: 'Table', code: 'TBL', icon: 'FiGrid' },
      { id: 8, name: 'Card', code: 'CRD', icon: 'FiCreditCard' },
      { id: 9, name: 'Menu', code: 'MNU', icon: 'FiMenu' },
      { id: 10, name: 'Widget', code: 'WGT', icon: 'FiBox' }
    ];
  }
};

export default {
  modules: moduleService,
  pages: pageService,
  elements: elementService,
  permissions: permissionService,
  sync: syncService,
  elementTypes: elementTypeService
};