import { HazardSeverityType } from '@/types/hazard.types';
import { authHeaderService } from './authHeaderService';

const STATIC_DATA_API_URL = process.env.NEXT_PUBLIC_STATIC_DATA_API_URL || 'http://localhost:3030';

export interface HazardCategoryType
{
    HazardCategoryTypeID: number;
    ParentCategoryID?: number;
    UserAreaID?: number;
    Title: string;
    Description?: string;
    IsActive?: boolean;
    CreatedByUserID: number;
    CreatedDate: string;
    ModifiedByUserID?: number;
    ModifiedDate?: string;
    ArchivedByUserID?: number;
    ArchivedDate?: string;
}

export interface HazardStaticDataCache {
  severityTypes: HazardSeverityType[];
  categoryTypes: HazardCategoryType[];
  lastUpdated: number;
  sources: Record<string, 'api' | 'mock'>;
}

export interface StaticDataResult<T> {
  data: T;
  source: 'api' | 'mock';
}

export interface LoadAllResult {
  cache: HazardStaticDataCache;
  sources: Record<string, 'api' | 'mock'>;
  hasAnyApiData: boolean;
  hasAnyMockData: boolean;
}

class HazardStaticDataService {
  private cache: HazardStaticDataCache | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Centralized fetch with automatic fallback to mock data
   */
  private async fetchWithFallback<T>(
    endpoint: string,
    mockDataGetter: () => T,
    cacheKey: keyof Omit<HazardStaticDataCache, 'lastUpdated' | 'sources'>
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
        'severities': 'hazard-severity-types',
        'categories': 'hazard-category-types'
      };

      const staticDataEndpoint = apiEndpointMap[endpoint];
      if (!staticDataEndpoint) {
        console.warn(`[hazard-static] Unknown endpoint: ${endpoint}, using mock data`);
        const mockData = mockDataGetter();
        this.updateCache(cacheKey, mockData, endpoint, 'mock');
        return { data: mockData, source: 'mock' };
      }

      try {
        const response = await fetch(`${STATIC_DATA_API_URL}/api/StaticData/${staticDataEndpoint}`, {
          method: 'GET',
          headers: authHeaderService.getStaticDataHeaders(),
          credentials: 'include'
        });

        if (!response.ok) {
          console.warn(`[hazard-static] ${endpoint} API unavailable (${response.status}), using mock data`);
          const mockData = mockDataGetter();
          this.updateCache(cacheKey, mockData, endpoint, 'mock');
          return { data: mockData, source: 'mock' };
        }

        const result = await response.json();
        const apiData = result.data || result;
        this.updateCache(cacheKey, apiData, endpoint, 'api');
        console.log(`[hazard-static] ${endpoint} loaded from API`);
        return { data: apiData, source: 'api' };

      } catch (fetchError) {
        // Network error or fetch failure - fall back to mock data
        console.warn(`[hazard-static] ${endpoint} network error, using mock data:`, fetchError);
        const mockData = mockDataGetter();
        this.updateCache(cacheKey, mockData, endpoint, 'mock');
        return { data: mockData, source: 'mock' };
      }

    } catch (error) {
      console.error(`[hazard-static] ${endpoint} unexpected error, falling back to mock:`, error);
      const mockData = mockDataGetter();
      this.updateCache(cacheKey, mockData, endpoint, 'mock');
      return { data: mockData, source: 'mock' };
    }
  }

  private isCacheValid(): boolean {
    return this.cache !== null &&
           (Date.now() - this.cache.lastUpdated) < this.CACHE_DURATION;
  }

  async getHazardSeverityTypes(): Promise<StaticDataResult<HazardSeverityType[]>> {
    return this.fetchWithFallback('severities', this.getMockSeverities, 'severityTypes');
  }

  async getHazardCategoryTypes(): Promise<StaticDataResult<HazardCategoryType[]>> {
    return this.fetchWithFallback('categories', this.getMockCategories, 'categoryTypes');
  }

  async loadAllHazardStaticData(): Promise<LoadAllResult> {
    if (this.isCacheValid()) {
      const sources = this.cache!.sources;
      const hasAnyApiData = Object.values(sources).some(source => source === 'api');
      const hasAnyMockData = Object.values(sources).some(source => source === 'mock');
      return {
        cache: this.cache!,
        sources,
        hasAnyApiData,
        hasAnyMockData
      };
    }

    try {
      // Load all static data in parallel
      const [severityTypes, categoryTypes] = await Promise.all([
        this.getHazardSeverityTypes(),
        this.getHazardCategoryTypes()
      ]);

      const sources = {
        severities: severityTypes.source,
        categories: categoryTypes.source
      };

      const hasAnyApiData = Object.values(sources).some(source => source === 'api');
      const hasAnyMockData = Object.values(sources).some(source => source === 'mock');

      // Log overall status
      if (hasAnyMockData) {
        console.warn('[hazard-static] Some data loaded from mock sources:',
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
      console.error('[hazard-static] Failed to load static data:', error);
      throw error;
    }
  }

  // Clear cache (useful for forced refresh)
  clearCache(): void {
    this.cache = null;
  }

  // Get cached data without API call (returns null if not cached)
  getCachedData(): HazardStaticDataCache | null {
    return this.isCacheValid() ? this.cache : null;
  }

  // Check if specific data is cached
  isSeverityTypesCached(): boolean {
    return this.isCacheValid() && this.cache!.severityTypes.length > 0;
  }

  isCategoryTypesCached(): boolean {
    return this.isCacheValid() && this.cache!.categoryTypes.length > 0;
  }

  /**
   * Cache management and utilities
   */
  private updateCache(
    cacheKey: keyof Omit<HazardStaticDataCache, 'lastUpdated' | 'sources'>,
    data: any,
    endpoint: string,
    source: 'api' | 'mock'
  ): void {
    if (!this.cache) {
      this.cache = {
        severityTypes: [],
        categoryTypes: [],
        lastUpdated: Date.now(),
        sources: {}
      };
    }

    this.cache[cacheKey] = data;
    this.cache.sources[endpoint] = source;
    this.cache.lastUpdated = Date.now();
  }

  /**
   * Mock data methods for fallback resilience
   */
  private getMockSeverities = (): HazardSeverityType[] => [
    {
      HazardSeverityTypeID: 1,
      Reference: 'NEGLIGIBLE',
      severityName: 'Negligible',
      severityLevel: 1,
      colorCode: '#22c55e',
      description: 'Negligible severity hazard with minimal risk',
      IsActive: true,
      createdByUserId: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardSeverityTypeID: 2,
      severityCode: 'MINOR',
      severityName: 'Minor',
      severityLevel: 2,
      colorCode: '#eab308',
      description: 'Minor severity hazard with low risk',
      IsActive: true,
      createdByUserId: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardSeverityTypeID: 3,
      severityCode: 'MODERATE',
      severityName: 'Moderate',
      severityLevel: 3,
      colorCode: '#f97316',
      description: 'Moderate severity hazard with medium risk',
      IsActive: true,
      createdByUserId: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardSeverityTypeID: 4,
      Reference: 'MAJOR',
      severityName: 'Major',
      severityLevel: 4,
      colorCode: '#ef4444',
      description: 'Major severity hazard with high risk',
      IsActive: true,
      createdByUserId: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardSeverityTypeID: 5,
      Reference: 'CATASTROPHIC',
      severityName: 'Catastrophic',
      severityLevel: 5,
      colorCode: '#dc2626',
      description: 'Catastrophic severity hazard with extreme risk',
      IsActive: true,
      createdByUserId: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    }
  ];

  private getMockCategories = (): HazardCategoryType[] => [
    {
      HazardCategoryTypeID: 1,
      Title: 'Physical',
      Description: 'Physical workplace hazards including machinery, tools, and equipment',
      IsActive: true,
      CreatedByUserID: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardCategoryTypeID: 2,
      Title: 'Chemical',
      Description: 'Chemical hazards including toxic substances and fumes',
      IsActive: true,
      CreatedByUserID: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardCategoryTypeID: 3,
      Title: 'Biological',
      Description: 'Biological hazards including bacteria, viruses, and other organisms',
      IsActive: true,
      CreatedByUserID: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardCategoryTypeID: 4,
      Title: 'Ergonomic',
      Description: 'Ergonomic hazards related to workplace design and repetitive tasks',
      IsActive: true,
      CreatedByUserID: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    },
    {
      HazardCategoryTypeID: 5,
      Title: 'Psychosocial',
      Description: 'Psychosocial hazards including stress, workplace violence, and harassment',
      IsActive: true,
      CreatedByUserID: 1,
      CreatedDate: '2025-01-01T00:00:00Z'
    }
  ];
}

// Export singleton instance
export const hazardStaticDataService = new HazardStaticDataService();