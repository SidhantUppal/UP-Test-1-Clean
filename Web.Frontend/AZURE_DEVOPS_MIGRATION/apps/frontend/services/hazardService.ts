// Hazard API Service
import { Hazard, HazardCategory, HazardCategoryType } from '@/types/hazard.types';

export interface GetHazardsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: number;
  severity?: string;
  status?: 'active' | 'archived' | 'all';
}

export interface HazardStats {
  totalHazards: number;
  activeHazards: number;
  highRiskCount: number;
  categoriesCount: number;
  recentUpdatesCount: number;
}

export interface CreateHazardRequest {
  hazardName: string;
  hazardDescription: string;
  hazardCategoryId: number;
  hazardCode?: string;
  locationId?: number;
  locationName?: string;
  severity?: string;
  assignedToUserId?: number;
  assignedToRoleId?: number;
  legalRequirements?: string;
  // Legacy fields for backward compatibility
  inherentLikelihood?: number;
  inherentConsequence?: number;
}

export interface UpdateHazardRequest extends Partial<CreateHazardRequest> {
  isActive?: boolean;
}

class HazardService {
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-user-id': '1', // TODO: Get from auth context
      'x-user-area-id': '1' // TODO: Get from auth context
    };
  }

  // Get all hazards with pagination and filtering
  async getHazards(params: GetHazardsParams = {}): Promise<{ hazards: Hazard[]; total: number; page: number; totalPages: number }> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.pageSize) queryParams.append('limit', params.pageSize.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params.severity) queryParams.append('severity', params.severity);
    if (params.status) queryParams.append('status', params.status);

    const response = await fetch(`/api/hazards?${queryParams}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      let errorMessage = 'Failed to fetch hazards';
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = `${errorMessage}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return {
      hazards: result.data || [],
      total: result.metadata?.total || 0,
      page: result.metadata?.page || 1,
      totalPages: result.metadata?.totalPages || 1
    };
  }

  // Get single hazard by ID
  async getHazardById(id: number): Promise<Hazard> {
    const response = await fetch(`/api/hazards/${id}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch hazard');
    }

    const result = await response.json();
    return result.data;
  }

  // Create new hazard
  async createHazard(data: CreateHazardRequest): Promise<Hazard> {
    const response = await fetch('/api/hazards', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create hazard';
      try {
        const error = await response.json();
        errorMessage = error.error || error.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = `Failed to create hazard: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.data;
  }

  // Update existing hazard
  async updateHazard(id: number, data: UpdateHazardRequest): Promise<Hazard> {
    const response = await fetch(`/api/hazards/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update hazard');
    }

    const result = await response.json();
    return result.data;
  }

  // Delete (archive) hazard
  async deleteHazard(id: number): Promise<void> {
    const response = await fetch(`/api/hazards/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete hazard');
    }
  }

  // Get hazard categories
  async getHazardCategories(includeInactive = false): Promise<HazardCategory[]> {
    const queryParams = new URLSearchParams();
    if (includeInactive) queryParams.append('includeInactive', 'true');

    const response = await fetch(`/api/hazards/categories?${queryParams}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch hazard categories');
    }

    const result = await response.json();
    return result.data || [];
  }

  // Get hazard category types (system-wide)
  async getHazardCategoryTypes(): Promise<HazardCategoryType[]> {
    const response = await fetch('/api/hazards/category-types', {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch hazard category types');
    }

    const result = await response.json();
    return result.data || [];
  }

  // Get hazard statistics
  async getHazardStats(): Promise<HazardStats> {
    const response = await fetch('/api/hazards/stats', {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch hazard statistics');
    }

    const result = await response.json();
    return result.data;
  }

  // Upload attachment for hazard
  async uploadAttachment(hazardId: number, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/hazards/${hazardId}/attachments`, {
      method: 'POST',
      headers: {
        'x-user-id': '1', // TODO: Get from auth context
        'x-user-area-id': '1' // TODO: Get from auth context
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload attachment');
    }

    const result = await response.json();
    return result.data;
  }

  // Delete attachment
  async deleteAttachment(hazardId: number, attachmentId: number): Promise<void> {
    const response = await fetch(`/api/hazards/${hazardId}/attachments/${attachmentId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete attachment');
    }
  }
}

// Export singleton instance
export const hazardService = new HazardService();