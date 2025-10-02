import { useState, useEffect, useCallback } from 'react';
import { incidentStaticDataService, StaticDataCache, LoadAllResult } from '@/services/incidentStaticDataService';
import { IncidentSeverityType, IncidentStatusType, IncidentPriorityType } from '@/types/incident';

interface UseIncidentLookupsReturn {
  lookupData: StaticDataCache | null;
  loadResult: LoadAllResult | null;
  loading: boolean;
  error: string | null;
  refreshLookupData: () => Promise<void>;
  getSeverityDisplay: (severityTypeId: number | undefined | null) => IncidentSeverityType | undefined;
  getStatusDisplay: (statusTypeId: number | undefined | null) => IncidentStatusType | undefined;
  getPriorityDisplay: (priorityTypeId: number | undefined | null) => IncidentPriorityType | undefined;
  getTypeDisplay: (typeId: number | undefined | null) => any | undefined;
}

export const useIncidentLookups = (): UseIncidentLookupsReturn => {
  const [lookupData, setLookupData] = useState<StaticDataCache | null>(null);
  const [loadResult, setLoadResult] = useState<LoadAllResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLookupData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await incidentStaticDataService.loadAllStaticData();
      setLoadResult(result);
      setLookupData(result.cache);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load incident lookup data';
      setError(errorMessage);
      console.error('Error loading incident lookup data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLookupData = useCallback(async () => {
    incidentStaticDataService.clearCache();
    await loadLookupData();
  }, [loadLookupData]);

  // Helper functions for easy lookups with safety checks
  const getSeverityDisplay = useCallback((severityTypeId: number | undefined | null) => {
    if (!severityTypeId || !lookupData?.severityTypes || !Array.isArray(lookupData.severityTypes)) return undefined;
    return lookupData.severityTypes.find(s => s.IncidentSeverityTypeID === severityTypeId);
  }, [lookupData]);

  const getStatusDisplay = useCallback((statusTypeId: number | undefined | null) => {
    if (!statusTypeId || !lookupData?.statusTypes || !Array.isArray(lookupData.statusTypes)) return undefined;
    return lookupData.statusTypes.find(s => s.IncidentStatusTypeID === statusTypeId);
  }, [lookupData]);

  const getPriorityDisplay = useCallback((priorityTypeId: number | undefined | null) => {
    if (!priorityTypeId || !lookupData?.priorityTypes || !Array.isArray(lookupData.priorityTypes)) return undefined;
    return lookupData.priorityTypes.find(p => p.IncidentPriorityTypeID === priorityTypeId);
  }, [lookupData]);

  const getTypeDisplay = useCallback((typeId: number | undefined | null) => {
    if (!typeId || !lookupData?.incidentTypes || !Array.isArray(lookupData.incidentTypes)) return undefined;
    return lookupData.incidentTypes.find(t => t.IncidentTypeID === typeId);
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
    getStatusDisplay,
    getPriorityDisplay,
    getTypeDisplay
  };
};

// Individual hooks for specific incident data types (more focused, better performance)
export const useIncidentSeverities = () => {
  const [severities, setSeverities] = useState<IncidentSeverityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSeverities = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await incidentStaticDataService.getIncidentSeverityTypes();
        setSeverities(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load incident severities';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadSeverities();
  }, []);

  return { severities, loading, error };
};

export const useIncidentStatuses = () => {
  const [statuses, setStatuses] = useState<IncidentStatusType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatuses = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await incidentStaticDataService.getIncidentStatusTypes();
        setStatuses(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load incident statuses';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadStatuses();
  }, []);

  return { statuses, loading, error };
};

export const useIncidentPriorities = () => {
  const [priorities, setPriorities] = useState<IncidentPriorityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPriorities = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await incidentStaticDataService.getIncidentPriorityTypes();
        setPriorities(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load incident priorities';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadPriorities();
  }, []);

  return { priorities, loading, error };
};

