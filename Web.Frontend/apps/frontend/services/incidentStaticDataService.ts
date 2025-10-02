import { IncidentSeverityType, IncidentStatusType, IncidentPriorityType } from '@/types/incident';
import { authHeaderService } from './authHeaderService';

const STATIC_DATA_API_URL = process.env.NEXT_PUBLIC_STATIC_DATA_API_URL || 'http://localhost:3030';

export interface StaticDataCache {
  severityTypes: IncidentSeverityType[];
  statusTypes: IncidentStatusType[];
  priorityTypes: IncidentPriorityType[];
  incidentTypes: any[];
  categories: any[];
  lastUpdated: number;
  sources: Record<string, 'api' | 'mock'>; // Track data sources
}

export interface StaticDataResult<T> {
  data: T;
  source: 'api' | 'mock';
}

export interface LoadAllResult {
  cache: StaticDataCache;
  sources: Record<string, 'api' | 'mock'>;
  hasAnyApiData: boolean;
  hasAnyMockData: boolean;
}

class IncidentStaticDataService {
  private cache: StaticDataCache | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Centralized fetch with automatic fallback to mock data
   */
  private async fetchWithFallback<T>(
    endpoint: string,
    mockDataGetter: () => T,
    cacheKey: keyof Omit<StaticDataCache, 'lastUpdated' | 'sources'>
  ): Promise<StaticDataResult<T>> {

    // Check cache first
    if (this.isCacheValid() && this.cache![cacheKey].length > 0) {
      return {
        data: this.cache![cacheKey] as T,
        source: this.cache!.sources[endpoint] || 'api'
      };
    }

    try {
      // Map endpoint to Static Data API endpoint
      const apiEndpointMap: Record<string, string> = {
        'severities': 'incident-severity-types',
        'statuses': 'incident-status-types',
        'priorities': 'incident-priority-types',
        'categories': 'incident-categories',
        'types': 'incident-types'
      };

      const staticDataEndpoint = apiEndpointMap[endpoint];
      if (!staticDataEndpoint) {
        throw new Error(`Unknown endpoint: ${endpoint}`);
      }

      const response = await fetch(`${STATIC_DATA_API_URL}/api/StaticData/${staticDataEndpoint}`, {
        method: 'GET',
        headers: authHeaderService.getStaticDataHeaders(),
        credentials: 'include'
      });

      if (!response.ok) {
        console.warn(`[incident-static] ${endpoint} API unavailable (${response.status}), using mock data`);
        const mockData = mockDataGetter();
        this.updateCache(cacheKey, mockData, endpoint, 'mock');
        return { data: mockData, source: 'mock' };
      }

      const result = await response.json();
      const apiData = result.data || result;
      this.updateCache(cacheKey, apiData, endpoint, 'api');
      return { data: apiData, source: 'api' };

    } catch (error) {
      console.error(`[incident-static] ${endpoint} fetch failed, falling back to mock:`, error);
      const mockData = mockDataGetter();
      this.updateCache(cacheKey, mockData, endpoint, 'mock');
      return { data: mockData, source: 'mock' };
    }
  }

  private isCacheValid(): boolean {
    return this.cache !== null && 
           (Date.now() - this.cache.lastUpdated) < this.CACHE_DURATION;
  }

  /**
   * Get incident severity types with automatic fallback
   */
  async getIncidentSeverityTypes(): Promise<StaticDataResult<IncidentSeverityType[]>> {
    return this.fetchWithFallback('severities', this.getMockSeverities, 'severityTypes');
  }

  /**
   * Get incident status types with automatic fallback
   */
  async getIncidentStatusTypes(): Promise<StaticDataResult<IncidentStatusType[]>> {
    return this.fetchWithFallback('statuses', this.getMockStatuses, 'statusTypes');
  }

  /**
   * Get incident priority types with automatic fallback
   */
  async getIncidentPriorityTypes(): Promise<StaticDataResult<IncidentPriorityType[]>> {
    return this.fetchWithFallback('priorities', this.getMockPriorities, 'priorityTypes');
  }

  /**
   * Get incident types with automatic fallback
   */
  async getIncidentTypes(): Promise<StaticDataResult<any[]>> {
    return this.fetchWithFallback('types', this.getMockIncidentTypes, 'incidentTypes');
  }

  /**
   * Get incident categories with automatic fallback
   */
  async getIncidentCategories(): Promise<StaticDataResult<any[]>> {
    return this.fetchWithFallback('categories', this.getMockCategories, 'categories');
  }

  /**
   * Load all static data with source tracking and resilience reporting
   */
  async loadAllStaticData(): Promise<LoadAllResult> {
    try {
      const [severities, statuses, priorities, incidentTypes, categories] = await Promise.all([
        this.getIncidentSeverityTypes(),
        this.getIncidentStatusTypes(),
        this.getIncidentPriorityTypes(),
        this.getIncidentTypes(),
        this.getIncidentCategories()
      ]);

      const sources = {
        severities: severities.source,
        statuses: statuses.source,
        priorities: priorities.source,
        incidentTypes: incidentTypes.source,
        categories: categories.source
      };

      const hasAnyApiData = Object.values(sources).some(source => source === 'api');
      const hasAnyMockData = Object.values(sources).some(source => source === 'mock');

      // Log overall status
      if (hasAnyMockData) {
        console.warn('[incident-static] Some data loaded from mock sources:',
          Object.entries(sources).filter(([, source]) => source === 'mock').map(([key]) => key)
        );
      }


      return {
        cache: this.cache!,
        sources,
        hasAnyApiData,
        hasAnyMockData
      };
    } catch (error) {
      console.error('[incident-static] Failed to load static data:', error);
      throw error;
    }
  }

  // Helper methods for lookups
  getSeverityById(id: number): IncidentSeverityType | undefined {
    if (!this.cache?.severityTypes || !Array.isArray(this.cache.severityTypes)) {
      return undefined;
    }
    return this.cache.severityTypes.find(s => s.IncidentSeverityTypeID === id);
  }

  getStatusById(id: number): IncidentStatusType | undefined {
    if (!this.cache?.statusTypes || !Array.isArray(this.cache.statusTypes)) {
      return undefined;
    }
    return this.cache.statusTypes.find(s => s.IncidentStatusTypeID === id);
  }

  getPriorityById(id: number): IncidentPriorityType | undefined {
    if (!this.cache?.priorityTypes || !Array.isArray(this.cache.priorityTypes)) {
      return undefined;
    }
    return this.cache.priorityTypes.find(p => p.IncidentPriorityTypeID === id);
  }

  getIncidentTypeById(id: number): any | undefined {
    if (!this.cache?.incidentTypes || !Array.isArray(this.cache.incidentTypes)) {
      return undefined;
    }
    return this.cache.incidentTypes.find(t => t.IncidentTypeID === id);
  }

  getCategoryById(id: number): any | undefined {
    if (!this.cache?.categories || !Array.isArray(this.cache.categories)) {
      return undefined;
    }
    return this.cache.categories.find(c => c.IncidentCategoryTypeID === id);
  }

  /**
   * Backward compatibility methods (deprecated - use new methods with source tracking)
   */
  async getIncidentSeverities(): Promise<any[]> {
    console.warn('[DEPRECATED] Use incidentStaticDataService.getIncidentSeverityTypes() instead');
    try {
      const result = await this.getIncidentSeverityTypes();
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      console.error('Error loading severities, returning empty array:', error);
      return [];
    }
  }

  async getIncidentStatuses(): Promise<any[]> {
    console.warn('[DEPRECATED] Use incidentStaticDataService.getIncidentStatusTypes() instead');
    try {
      const result = await this.getIncidentStatusTypes();
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      console.error('Error loading statuses, returning empty array:', error);
      return [];
    }
  }

  async getIncidentPriorities(): Promise<any[]> {
    console.warn('[DEPRECATED] Use incidentStaticDataService.getIncidentPriorityTypes() instead');
    try {
      const result = await this.getIncidentPriorityTypes();
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      console.error('Error loading priorities, returning empty array:', error);
      return [];
    }
  }

  /**
   * Cache management and utilities
   */
  private updateCache(
    cacheKey: keyof Omit<StaticDataCache, 'lastUpdated' | 'sources'>,
    data: any,
    endpoint: string,
    source: 'api' | 'mock'
  ): void {
    if (!this.cache) {
      this.cache = {
        severityTypes: [],
        statusTypes: [],
        priorityTypes: [],
        incidentTypes: [],
        categories: [],
        lastUpdated: Date.now(),
        sources: {}
      };
    }

    this.cache[cacheKey] = data;
    this.cache.sources[endpoint] = source;
    this.cache.lastUpdated = Date.now();
  }

  /**
   * Clear cache (useful for forcing refresh)
   */
  clearCache(): void {
    this.cache = null;
  }

  /**
   * Get cache status information
   */
  getCacheStatus(): {
    isCached: boolean;
    lastUpdated: Date | null;
    sources: Record<string, 'api' | 'mock'>;
    cacheAge: number;
  } {
    return {
      isCached: this.cache !== null,
      lastUpdated: this.cache ? new Date(this.cache.lastUpdated) : null,
      sources: this.cache?.sources || {},
      cacheAge: this.cache ? Date.now() - this.cache.lastUpdated : 0
    };
  }

  /**
   * Mock data methods for fallback resilience
   */
  private getMockSeverities = (): IncidentSeverityType[] => [
    {
      IncidentSeverityTypeID: 1,
      Reference: 'LOW',
      Title: 'Low',
      SeverityLevel: 1,
      ColorCode: '#22c55e',
      Description: 'Low severity incident with minimal impact'
    },
    {
      IncidentSeverityTypeID: 2,
      Reference: 'MEDIUM',
      Title: 'Medium',
      SeverityLevel: 2,
      ColorCode: '#eab308',
      Description: 'Medium severity incident with moderate impact'
    },
    {
      IncidentSeverityTypeID: 3,
      Reference: 'HIGH',
      Title: 'High',
      SeverityLevel: 3,
      ColorCode: '#f97316',
      Description: 'High severity incident with significant impact'
    },
    {
      IncidentSeverityTypeID: 4,
      Reference: 'CRITICAL',
      Title: 'Critical',
      SeverityLevel: 4,
      ColorCode: '#ef4444',
      Description: 'Critical severity incident with severe impact'
    }
  ];

  private getMockStatuses = (): IncidentStatusType[] => [
    {
      IncidentStatusTypeID: 1,
      Reference: 'OPEN',
      Title: 'Open',
      StatusOrder: 1,
      ColorCode: '#3b82f6',
      Description: 'Incident is open and requires attention'
    },
    {
      IncidentStatusTypeID: 2,
      Reference: 'IN_PROGRESS',
      Title: 'In Progress',
      StatusOrder: 2,
      ColorCode: '#eab308',
      Description: 'Incident is being actively worked on'
    },
    {
      IncidentStatusTypeID: 3,
      Reference: 'UNDER_REVIEW',
      Title: 'Under Review',
      StatusOrder: 3,
      ColorCode: '#8b5cf6',
      Description: 'Incident is under review for completion'
    },
    {
      IncidentStatusTypeID: 4,
      Reference: 'CLOSED',
      Title: 'Closed',
      StatusOrder: 4,
      ColorCode: '#22c55e',
      Description: 'Incident has been resolved and closed'
    },
    {
      IncidentStatusTypeID: 5,
      Reference: 'ARCHIVED',
      Title: 'Archived',
      StatusOrder: 5,
      ColorCode: '#6b7280',
      Description: 'Incident has been archived'
    }
  ];

  private getMockPriorities = (): IncidentPriorityType[] => [
    {
      IncidentPriorityTypeID: 1,
      Reference: 'LOW',
      Title: 'Low',
      PriorityLevel: 1,
      ColorCode: '#22c55e',
      Description: 'Low priority incident - can be handled in routine timeframe'
    },
    {
      IncidentPriorityTypeID: 2,
      Reference: 'MEDIUM',
      Title: 'Medium',
      PriorityLevel: 2,
      ColorCode: '#eab308',
      Description: 'Medium priority incident - should be addressed promptly'
    },
    {
      IncidentPriorityTypeID: 3,
      Reference: 'HIGH',
      Title: 'High',
      PriorityLevel: 3,
      ColorCode: '#f97316',
      Description: 'High priority incident - requires urgent attention'
    },
    {
      IncidentPriorityTypeID: 4,
      Reference: 'CRITICAL',
      Title: 'Critical',
      PriorityLevel: 4,
      ColorCode: '#ef4444',
      Description: 'Critical priority incident - requires immediate action'
    }
  ];

  private getMockIncidentTypes = (): any[] => [
    {
      IncidentTypeID: 1,
      Title: 'Wobble',
      Reference: 'WOBBLE',
      Description: 'General safety incident or concern',
      IncidentCategoryTypeID: 1,
      IsActive: true,
      DisplayOrder: 1,
      IsSystemType: true
    },
    {
      IncidentTypeID: 2,
      Title: 'Accident Book',
      Reference: 'ACCIDENT_BOOK',
      Description: 'Record workplace accidents',
      IncidentCategoryTypeID: 1,
      IsActive: true,
      DisplayOrder: 2,
      IsSystemType: true
    },
    {
      IncidentTypeID: 3,
      Title: 'Near Miss',
      Reference: 'NEAR_MISS',
      Description: 'Report incidents that could have caused harm',
      IncidentCategoryTypeID: 1,
      IsActive: true,
      DisplayOrder: 3,
      IsSystemType: true
    },
    {
      IncidentTypeID: 4,
      Title: 'Dangerous Occurrence',
      Reference: 'DANGEROUS_OCCURRENCE',
      Description: 'Report dangerous situations or occurrences',
      IncidentCategoryTypeID: 1,
      IsActive: true,
      DisplayOrder: 4,
      IsSystemType: true
    },
    {
      IncidentTypeID: 5,
      Title: 'Road Traffic Incident',
      Reference: 'ROAD_TRAFFIC',
      Description: 'Vehicle or road-related incidents',
      IncidentCategoryTypeID: 1,
      IsActive: true,
      DisplayOrder: 5,
      IsSystemType: true
    },
    {
      IncidentTypeID: 6,
      Title: 'High Potential',
      Reference: 'HIGH_POTENTIAL',
      Description: 'High potential safety incidents',
      IncidentCategoryTypeID: 1,
      IsActive: true,
      DisplayOrder: 6,
      IsSystemType: true
    },
    {
      IncidentTypeID: 7,
      Title: 'Accident Report',
      Reference: 'ACCIDENT_REPORT',
      Description: 'Detailed accident investigation report',
      IncidentCategoryTypeID: 1,
      IsActive: true,
      DisplayOrder: 7,
      IsSystemType: true
    }
  ];

  private getMockCategories = (): any[] => [
    {
      IncidentCategoryTypeID: 1,
      Reference: 'SAFETY',
      Description: 'Safety-related incidents and near misses',
      IsSystemCategory: true,
      DisplayOrder: 1,
      IsActive: true,
      ColorCode: 'bg-red-100 text-red-600',
      Icon: 'shield'
    },
    {
      IncidentCategoryTypeID: 2,
      Reference: 'HR',
      Description: 'Human resources and personnel incidents',
      IsSystemCategory: true,
      DisplayOrder: 2,
      IsActive: true,
      ColorCode: 'bg-blue-100 text-blue-600',
      Icon: 'users'
    },
    {
      IncidentCategoryTypeID: 3,
      Reference: 'CYBER',
      Description: 'Cybersecurity and data protection incidents',
      IsSystemCategory: true,
      DisplayOrder: 3,
      IsActive: true,
      ColorCode: 'bg-purple-100 text-purple-600',
      Icon: 'shield-lock'
    },
    {
      IncidentCategoryTypeID: 4,
      Reference: 'WHISTLEBLOWING',
      Description: 'Whistleblowing and ethics concerns',
      IsSystemCategory: true,
      DisplayOrder: 4,
      IsActive: true,
      ColorCode: 'bg-orange-100 text-orange-600',
      Icon: 'megaphone'
    }
  ];
}

// Export singleton instance
export const incidentStaticDataService = new IncidentStaticDataService();