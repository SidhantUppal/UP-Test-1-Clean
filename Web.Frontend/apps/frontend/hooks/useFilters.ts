import { useState, useCallback } from 'react';

export interface FilterState {
  [key: string]: string | number | null | undefined;
}

export interface UseFiltersConfig<T> {
  initialFilters: T;
  allData?: any[]; // Optional for frontend filtering
  setFilteredData?: (data: any[]) => void; // Optional for frontend filtering
  filterFunction?: (data: any[], filters: T) => any[]; // Optional for frontend filtering
  onFiltersChange?: (filters: T) => Promise<void> | void; // For backend filtering
}

export function useFilters<T extends FilterState>({
  initialFilters,
  allData,
  setFilteredData,
  filterFunction,
  onFiltersChange
}: UseFiltersConfig<T>) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [isApplying, setIsApplying] = useState(false);

  // Update a single filter field
  const updateFilter = useCallback((key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Apply all filters
  const applyFilters = useCallback(async () => {
    if (onFiltersChange) {
      // Backend filtering
      setIsApplying(true);
      try {
        await onFiltersChange(filters);
      } finally {
        setIsApplying(false);
      }
    } else if (filterFunction && allData && setFilteredData) {
      // Frontend filtering (legacy)
      const filtered = filterFunction(allData, filters);
      setFilteredData(filtered);
    }
  }, [filters, onFiltersChange, filterFunction, allData, setFilteredData]);

  // Clear all filters
  const clearFilters = useCallback(async () => {
    const clearedFilters = initialFilters;
    setFilters(clearedFilters);

    if (onFiltersChange) {
      // Backend filtering
      setIsApplying(true);
      try {
        await onFiltersChange(clearedFilters);
      } finally {
        setIsApplying(false);
      }
    } else if (allData && setFilteredData) {
      // Frontend filtering (legacy)
      setFilteredData(allData);
    }
  }, [initialFilters, onFiltersChange, allData, setFilteredData]);

  // Check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some(value =>
      value !== '' && value !== null && value !== undefined
    );
  }, [filters]);

  return {
    filters,
    setFilters,
    updateFilter,
    applyFilters,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
    isApplying
  };
}

export default useFilters;