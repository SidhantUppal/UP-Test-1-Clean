import checklistRepository from '@/../../services/checklists-service/src/repositories/checklistRepository.js';

interface ChecklistParams {
  userAreaId?: number;
  status?: string;
  categoryId?: number;
  assigneeId?: number;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

interface ChecklistData {
  checklistTitle: string;
  category: string;
  checklistDescription?: string;
  userAreaId: number;
  assigneeId?: number;
  dueDate?: string;
  [key: string]: string | number | boolean | undefined;
}

// This client can either use the remote service OR the local repository directly
export class ChecklistServiceClient {
  private useLocalRepository: boolean;
  private serviceUrl: string;

  constructor() {
    // Check if we should use the local repository directly
    this.useLocalRepository = process.env.USE_LOCAL_REPOSITORY === 'true' || false;
    this.serviceUrl = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';
  }

  async getChecklists(params: ChecklistParams) {
    if (this.useLocalRepository) {
      // Direct repository access (requires database connection)
      try {
        return await checklistRepository.listChecklists(params);
      } catch (error) {
        console.error('Local repository error:', error);
        throw error;
      }
    } else {
      // Try remote service first
      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(
          `${this.serviceUrl}/api/checklists${queryString ? `?${queryString}` : ''}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Service responded with ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Remote service error:', error);
        throw error;
      }
    }
  }

  async getChecklistById(id: string, userAreaId: number) {
    if (this.useLocalRepository) {
      try {
        return await checklistRepository.getChecklistById(parseInt(id), userAreaId);
      } catch (error) {
        console.error('Local repository error:', error);
        throw error;
      }
    } else {
      try {
        const response = await fetch(
          `${this.serviceUrl}/api/checklists/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-user-area-id': userAreaId.toString(),
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Service responded with ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Remote service error:', error);
        throw error;
      }
    }
  }

  async createChecklist(data: ChecklistData) {
    if (this.useLocalRepository) {
      try {
        return await checklistRepository.createChecklistTemplate(data);
      } catch (error) {
        console.error('Local repository error:', error);
        throw error;
      }
    } else {
      try {
        const response = await fetch(
          `${this.serviceUrl}/api/checklists`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        
        if (!response.ok) {
          throw new Error(`Service responded with ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Remote service error:', error);
        throw error;
      }
    }
  }

  async getStats(userAreaId: number) {
    if (this.useLocalRepository) {
      // Implement stats logic locally
      return {
        totalChecklists: 0,
        activeChecklists: 0,
        completedToday: 0,
        pendingAssignments: 0,
        overdueAssignments: 0,
        completionRate: 0,
      };
    } else {
      try {
        const response = await fetch(
          `${this.serviceUrl}/api/checklists/stats`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-user-area-id': userAreaId.toString(),
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Service responded with ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Remote service error:', error);
        throw error;
      }
    }
  }

  async getUserAssignments(userId: string, params: ChecklistParams) {
    if (this.useLocalRepository) {
      try {
        return await checklistRepository.getAssignmentsByUser(parseInt(userId), params);
      } catch (error) {
        console.error('Local repository error:', error);
        throw error;
      }
    } else {
      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(
          `${this.serviceUrl}/api/checklists/users/${userId}/assignments${queryString ? `?${queryString}` : ''}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`Service responded with ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Remote service error:', error);
        throw error;
      }
    }
  }
}

// Export a singleton instance
export const checklistServiceClient = new ChecklistServiceClient();