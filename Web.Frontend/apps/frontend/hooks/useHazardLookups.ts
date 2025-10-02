import { useState, useEffect, useCallback } from 'react';
import { hazardStaticDataService, HazardStaticDataCache, HazardCategoryType, LoadAllResult } from '@/services/hazardStaticDataService';
import { HazardSeverityType } from '@/types/hazard.types';

interface UseHazardLookupsReturn {
  lookupData: HazardStaticDataCache | null;
  loadResult: LoadAllResult | null;
  loading: boolean;
  error: string | null;
  refreshLookupData: () => Promise<void>;
  getSeverityDisplay: (severityTypeId: number | undefined | null) => HazardSeverityType | undefined;
  getCategoryDisplay: (categoryId: number | undefined | null) => HazardCategoryType | undefined;
}

export const useHazardLookups = (): UseHazardLookupsReturn => {
  const [lookupData, setLookupData] = useState<HazardStaticDataCache | null>(null);
  const [loadResult, setLoadResult] = useState<LoadAllResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLookupData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await hazardStaticDataService.loadAllHazardStaticData();
      setLoadResult(result);
      setLookupData(result.cache);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load hazard lookup data';
      setError(errorMessage);
      console.error('Error loading hazard lookup data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLookupData = useCallback(async () => {
    hazardStaticDataService.clearCache();
    await loadLookupData();
  }, [loadLookupData]);

  // Helper functions for easy lookups
  const getSeverityDisplay = useCallback((severityTypeId: number | undefined | null) => {
    if (!severityTypeId || !lookupData) return undefined;
    return lookupData.severityTypes.find(s => s.hazardSeverityTypeId === severityTypeId);
  }, [lookupData]);

  const getCategoryDisplay = useCallback((categoryId: number | undefined | null) => {
    if (!categoryId || !lookupData) return undefined;
    return lookupData.categoryTypes.find(c => c.hazardCategoryID === categoryId);
  }, [lookupData]);

  // Load lookup data on mount
  useEffect(() => {
    loadLookupData();
  }, [loadLookupData]);

  return {
    lookupData,
    loadResult,
    loading,
    error,
    refreshLookupData,
    getSeverityDisplay,
    getCategoryDisplay
  };
};

// Individual hooks for specific hazard data types (more focused, better performance)
export const useHazardSeverities = () => {
  const [severities, setSeverities] = useState<HazardSeverityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounted

    const loadSeverities = async () => {
      try {
        if (!isMounted) return;
        setLoading(true);
        setError(null);
        const result = await hazardStaticDataService.getHazardSeverityTypes();
        if (isMounted) {
          setSeverities(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load hazard severities';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSeverities();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return { severities, loading, error };
};

export const useHazardCategories = () => {
  const [categories, setCategories] = useState<HazardCategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounted

    const loadCategories = async () => {
      try {
        if (!isMounted) return;
        setLoading(true);
        setError(null);
        const result = await hazardStaticDataService.getHazardCategoryTypes();
        if (isMounted) {
          setCategories(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load hazard categories';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  return { categories, loading, error };
};