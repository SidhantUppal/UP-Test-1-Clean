/**
 * Base class for all static data services
 * Provides common functionality for calling Static Data API with proper authentication
 */

import { authHeaderService } from './authHeaderService';

const STATIC_DATA_API_URL = process.env.NEXT_PUBLIC_STATIC_DATA_API_URL || 'http://localhost:3030';

export interface StaticDataResult<T> {
  data: T;
  source: 'api' | 'mock';
}

export abstract class BaseStaticDataService {
  protected readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Fetch data from Static Data API with automatic fallback to mock data
   */
  protected async fetchFromStaticDataAPI<T>(
    endpoint: string,
    mockDataGetter: () => T
  ): Promise<StaticDataResult<T>> {
    try {
      const response = await fetch(`${STATIC_DATA_API_URL}/api/StaticData/${endpoint}`, {
        method: 'GET',
        headers: authHeaderService.getStaticDataHeaders(),
        credentials: 'include'
      });

      if (!response.ok) {
        console.warn(`[static-data] ${endpoint} API unavailable (${response.status}), using mock data`);
        const mockData = mockDataGetter();
        return { data: mockData, source: 'mock' };
      }

      const result = await response.json();
      const apiData = result.data || result;
      console.log(`[static-data] ${endpoint} loaded from API`);
      return { data: apiData, source: 'api' };

    } catch (error) {
      console.error(`[static-data] ${endpoint} fetch failed, falling back to mock:`, error);
      const mockData = mockDataGetter();
      return { data: mockData, source: 'mock' };
    }
  }

  /**
   * Get current user ID from auth service
   */
  protected getCurrentUserId(): string | number | null {
    return authHeaderService.getCurrentUserId();
  }

  /**
   * Get current user area ID from auth service
   */
  protected getCurrentUserAreaId(): string | number | null {
    return authHeaderService.getCurrentUserAreaId();
  }

  /**
   * Check if user is authenticated
   */
  protected isAuthenticated(): boolean {
    return authHeaderService.isAuthenticated();
  }
}

// Example usage for other modules:
/*
class TaskStaticDataService extends BaseStaticDataService {
  async getTaskStatuses(): Promise<StaticDataResult<TaskStatusType[]>> {
    return this.fetchFromStaticDataAPI('task-status-types', this.getMockTaskStatuses);
  }

  private getMockTaskStatuses = (): TaskStatusType[] => [
    // Mock data here
  ];
}

class HazardStaticDataService extends BaseStaticDataService {
  async getHazardSeverities(): Promise<StaticDataResult<HazardSeverityType[]>> {
    return this.fetchFromStaticDataAPI('hazard-severity-types', this.getMockHazardSeverities);
  }

  private getMockHazardSeverities = (): HazardSeverityType[] => [
    // Mock data here
  ];
}
*/