// Hazard API Service
import { Hazard, HazardCategoryType, HazardSeverityType } from '@/types/hazard.types';
import { authHeaderService } from './authHeaderService';

export interface GetHazardsParams
{
    page?: number;
    pageSize?: number;
    stringSearch?: string;
    hazardCategoryTypeID?: number;
    hazardSeverityTypeID?: number;
    status?: 'active' | 'archived' | 'all';
}

export interface HazardStats
{
    totalHazards: number;
    activeHazards: number;
    highRiskCount: number;
    categoriesCount: number;
    recentUpdatesCount: number;
}

export interface CreateHazardRequest
{
    UserAreaID: number;
    Title: string;
    Reference: string;
    Description: string;
    HazardCategoryTypeID: number;
    HazardSeverityTypeID: number;
    LocationID?: number | null;
    AssignedToUserID?: number | null;
    AssignedToRoleID?: number | null;
    Status?: string;
    IsActive?: boolean;
    CreatedByUserID: number;
    CreatedDate?: string;
    // Additional fields for enhanced functionality
    FixedWhenFound?: boolean;
    ResolutionNotes?: string | null;
    CreateFollowUpTask?: boolean;
    FollowUpTaskType?: string | null;
    FollowUpTaskAssignTo?: string;
    FollowUpTaskDueDate?: string | null;
    FollowUpTaskDescription?: string | null;
}

export interface UpdateHazardRequest extends Partial<CreateHazardRequest>
{
    isActive?: boolean;
}

class HazardService
{
    private getHeaders()
    {
        return authHeaderService.getAuthHeaders();
    }

    // Get all hazards with pagination and filtering
    async getHazards(params: GetHazardsParams = {}): Promise<{ hazards: Hazard[]; total: number; page: number; totalPages: number }>
    {
        const queryParams = new URLSearchParams();

        // Map frontend parameters to .NET API parameters (PascalCase)
        if (params.page) queryParams.append('Page', params.page.toString());
        if (params.pageSize) queryParams.append('PageSize', params.pageSize.toString());
        if (params.stringSearch) queryParams.append('StringSearch', params.stringSearch);
        if (params.hazardCategoryTypeID) queryParams.append('HazardCategoryTypeID', params.hazardCategoryTypeID.toString());
        if (params.hazardSeverityTypeID) queryParams.append('HazardSeverityTypeID', params.hazardSeverityTypeID.toString());
        if (params.status === 'active') queryParams.append('IsActive', 'true');
        if (params.status === 'archived') queryParams.append('IsActive', 'false');

        console.log("Params: " + JSON.stringify(params, null, 2));

        const response = await fetch(`/api/hazards?${queryParams}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            let errorMessage = 'Failed to fetch hazards';
            try
            {
                const error = await response.json();
                errorMessage = error.error || errorMessage;
            } catch (e)
            {
                // If response is not JSON, use status text
                errorMessage = `${errorMessage}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        return {
            hazards: result.Data || result.data || [],
            total: result.Pagination?.TotalCount || result.metadata?.total || 0,
            page: result.Pagination?.Page || result.metadata?.page || 1,
            totalPages: result.Pagination?.TotalPages || result.metadata?.totalPages || 1
        };
    }

    // Get single hazard by ID
    async getHazardById(id: number): Promise<Hazard>
    {
        const response = await fetch(`/api/hazards/${id}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch hazard');
        }

        const result = await response.json();
        return result.data;
    }

    // Create new hazard
    async createHazard(data: CreateHazardRequest): Promise<Hazard>
    {
        const response = await fetch('/api/hazards', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });

        if (!response.ok)
        {
            let errorMessage = 'Failed to create hazard';
            try
            {
                const error = await response.json();
                errorMessage = error.error || error.message || errorMessage;
            } catch (e)
            {
                // If response is not JSON, use status text
                errorMessage = `Failed to create hazard: ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        return result.data;
    }

    // Update existing hazard
    async updateHazard(id: number, data: UpdateHazardRequest): Promise<Hazard>
    {
        const response = await fetch(`/api/hazards/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update hazard');
        }

        const result = await response.json();
        return result.data;
    }

    // Delete (archive) hazard
    async deleteHazard(id: number): Promise<void>
    {
        const response = await fetch(`/api/hazards/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete hazard');
        }
    }

    // Get hazard categories
    async getHazardCategories(includeInactive = false): Promise<HazardCategoryType[]>
    {
        const queryParams = new URLSearchParams();
        if (includeInactive) queryParams.append('includeInactive', 'true');

        const response = await fetch(`/api/hazards/categories?${queryParams}`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch hazard categories');
        }

        const result = await response.json();
        return result.data || [];
    }

    // Get hazard category types (system-wide)
    async getHazardCategoryTypes(): Promise<HazardCategoryType[]>
    {
        const response = await fetch('/api/hazards/category-types', {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch hazard category types');
        }

        const result = await response.json();
        return result.data || [];
    }

    // Get hazard severities (lookup table)
    async getHazardSeverities(): Promise<HazardSeverityType[]>
    {
        const response = await fetch('/api/hazards/severities', {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch hazard severities');
        }

        const result = await response.json();
        return result.data || [];
    }

    // Get hazard statistics
    async getHazardStats(): Promise<HazardStats>
    {
        const response = await fetch('/api/hazards/stats', {
            method: 'GET',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch hazard statistics');
        }

        const result = await response.json();
        return result.data;
    }

    // Upload attachment for hazard
    async uploadAttachment(hazardId: number, file: File): Promise<any>
    {
        const formData = new FormData();
        formData.append('file', file);

        const headers = authHeaderService.getAuthHeaders();
        // Remove Content-Type for FormData (let browser set it with boundary)
        delete headers['Content-Type'];

        const response = await fetch(`/api/hazards/${hazardId}/attachments`, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to upload attachment');
        }

        const result = await response.json();
        return result.data;
    }

    // Delete attachment
    async deleteAttachment(hazardId: number, attachmentId: number): Promise<void>
    {
        const response = await fetch(`/api/hazards/${hazardId}/attachments/${attachmentId}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });

        if (!response.ok)
        {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete attachment');
        }
    }
}

// Export singleton instance
export const hazardService = new HazardService();