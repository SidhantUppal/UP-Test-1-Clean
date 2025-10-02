// Checklist API Service
const CHECKLISTS_SERVICE_URL = process.env.NEXT_PUBLIC_CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

export interface ChecklistTemplate {
  ChecklistTemplateID?: number;
  UserAreaID: number;
  Name: string;
  Description?: string;
  CategoryTypeID?: number;
  FrequencyTypeID?: number;
  IsActive: boolean;
  CreatedByUserID: number;
  CreatedDate?: string;
  AssignmentCount?: number;
  EnrollmentCount?: number;
  FrequencyName?: string;
  CategoryName?: string;
  CreatedByName?: string;
}

export interface ChecklistAssignment {
  ChecklistTemplateAssignmentID?: number;
  ChecklistTemplateID: number;
  AssignedToUserID: number;
  AssignedByUserID: number;
  AssignedDate?: string;
  DueDate?: string;
  CompletedDate?: string;
  Status: string;
  ChecklistName?: string;
  ChecklistDescription?: string;
  CategoryName?: string;
  AssignedByName?: string;
  AssignedToName?: string;
}

export interface ChecklistQuestion {
  id: string;
  text: string;
  type: string;
  options?: string[];
  comments: {
    enabled: boolean;
    required: boolean;
    placeholder: string;
  };
  scoring: {
    enabled: boolean;
    weight: number;
    isKillQuestion: boolean;
  };
  media: {
    questionImage?: string;
    requireAnswerImage: boolean;
  };
  children?: ChecklistQuestion[];
}

export interface ChecklistSection {
  title: string;
  description?: string;
  questions: ChecklistQuestion[];
}

export interface CreateChecklistRequest {
  name: string;
  description?: string;
  categoryTypeId?: number;
  frequencyTypeId?: number;
  categories?: number[];
  sections?: ChecklistSection[];
}

class ChecklistService {
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-user-id': '1', // TODO: Get from auth context
      'x-user-area-id': '1' // TODO: Get from auth context
    };
  }

  // Create checklist with questions
  async createChecklist(data: CreateChecklistRequest): Promise<ChecklistTemplate> {
    const response = await fetch(`/api/checklists`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checklist');
    }

    const result = await response.json();
    return result.data;
  }

  // Get all checklists
  async getChecklists(params?: {
    search?: string;
    categoryTypeId?: number;
    frequencyTypeId?: number;
    isActive?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<{ checklists: ChecklistTemplate[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`/api/checklists?${queryParams}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch checklists');
    }

    const result = await response.json();
    
    // Handle different response structures (mock vs real service)
    if (result.data && result.data.checklists) {
      // Mock data structure
      return {
        checklists: result.data.checklists || [],
        pagination: {
          page: result.data.page,
          pageSize: result.data.pageSize,
          total: result.data.totalCount,
          totalPages: result.data.totalPages
        }
      };
    } else {
      // Real service structure
      return {
        checklists: result.data || [],
        pagination: result.pagination
      };
    }
  }

  // Get single checklist
  async getChecklist(id: number, includeForm = false): Promise<ChecklistTemplate> {
    const response = await fetch(`/api/checklists/${id}?includeForm=${includeForm}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch checklist');
    }

    const result = await response.json();
    return result.data;
  }

  // Update checklist
  async updateChecklist(id: number, data: Partial<ChecklistTemplate>): Promise<ChecklistTemplate> {
    const response = await fetch(`/api/checklists/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update checklist');
    }

    const result = await response.json();
    return result.data;
  }

  // Delete checklist
  async deleteChecklist(id: number): Promise<void> {
    const response = await fetch(`/api/checklists/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to delete checklist');
    }
  }

  // Assign checklist
  async assignChecklist(checklistId: number, data: {
    userId?: number;
    userIds?: number[];
    dueDate: string;
  }): Promise<ChecklistAssignment | ChecklistAssignment[]> {
    const endpoint = data.userIds ? 'bulk-assign' : 'assign';
    const response = await fetch(`/api/checklists/${checklistId}/${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to assign checklist');
    }

    const result = await response.json();
    return result.data;
  }

  // Get user assignments
  async getUserAssignments(userId: number, filters?: {
    status?: string;
    overdue?: boolean;
    dueToday?: boolean;
  }): Promise<ChecklistAssignment[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`/api/checklists/users/${userId}/assignments?${queryParams}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assignments');
    }

    const result = await response.json();
    return result.data || [];
  }

  // Get checklist assignments
  async getChecklistAssignments(checklistId: number): Promise<ChecklistAssignment[]> {
    const response = await fetch(`/api/checklists/${checklistId}/assignments`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assignments');
    }

    const result = await response.json();
    return result.data || [];
  }

  // Update assignment status
  async updateAssignmentStatus(assignmentId: number, status: string): Promise<ChecklistAssignment> {
    const response = await fetch(`/api/checklists/assignments/${assignmentId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('Failed to update assignment status');
    }

    const result = await response.json();
    return result.data;
  }

  // Get category types
  async getCategoryTypes(): Promise<Array<{ CategoryTypeID: number; DisplayName: string }>> {
    const response = await fetch(`/api/checklists/utility/category-types`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch category types');
    }

    const result = await response.json();
    return result.data || [];
  }

  // Get frequency types
  async getFrequencyTypes(): Promise<Array<{ FrequencyTypeID: number; DisplayName: string; DaysInterval: number }>> {
    const response = await fetch(`/api/checklists/utility/frequency-types`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch frequency types');
    }

    const result = await response.json();
    return result.data || [];
  }

  // Get checklist stats
  async getChecklistStats(): Promise<{
    totalChecklists: number;
    activeChecklists: number;
    totalAssignments: number;
    totalEnrollments: number;
  }> {
    const response = await fetch(`/api/checklists/stats`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    const result = await response.json();
    return result.data;
  }
}

export const checklistService = new ChecklistService();