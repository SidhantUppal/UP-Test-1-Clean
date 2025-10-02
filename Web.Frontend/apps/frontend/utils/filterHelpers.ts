import { FilterField, QuickFilter, FilterConfig } from '@/components/common/FilterSection';

// Helper to create select field from lookup data
export function createSelectField(
  key: string,
  label: string,
  lookupData: any[] | undefined,
  config: {
    valueField: string;
    labelField: string;
    idField?: string;
    allLabel?: string;
  }
): FilterField {
  return {
    key,
    label,
    type: 'select',
    allLabel: config.allLabel || `All ${label}s`,
    options: lookupData?.map(item => ({
      value: item[config.valueField],
      label: item[config.labelField],
      id: config.idField ? item[config.idField] : item[config.valueField]
    })) || []
  };
}

// Helper to create date field
export function createDateField(key: string, label: string): FilterField {
  return {
    key,
    label,
    type: 'date'
  };
}

// Helper to create text field
export function createTextField(
  key: string,
  label: string,
  placeholder?: string
): FilterField {
  return {
    key,
    label,
    type: 'text',
    placeholder
  };
}

// Helper to create number field
export function createNumberField(
  key: string,
  label: string,
  placeholder?: string
): FilterField {
  return {
    key,
    label,
    type: 'number',
    placeholder
  };
}

// Helper to create quick filter for status-based filtering
export function createStatusQuickFilter(
  label: string,
  statusCode: string,
  lookupData: any[] | undefined,
  onFilter: (statusId: number) => void,
  colorClass: string = 'bg-blue-100 text-blue-800 border border-blue-200'
): QuickFilter {
  return {
    label,
    colorClass,
    onClick: () => {
      const status = lookupData?.find(s => s.Reference === statusCode);
      if (status) {
        onFilter(status.IncidentStatusTypeID || status.id || status.ID || status.StatusTypeID);
      }
    }
  };
}

// Helper to create quick filter for severity-based filtering
export function createSeverityQuickFilter(
  label: string,
  minLevel: number,
  lookupData: any[] | undefined,
  onFilter: (severityIds: number[]) => void,
  colorClass: string = 'bg-red-100 text-red-800 border border-red-200'
): QuickFilter {
  return {
    label,
    colorClass,
    onClick: () => {
      const severities = lookupData?.filter(s => s.SeverityLevel >= minLevel) || [];
      const severityIds = severities.map(s => s.IncidentSeverityTypeID || s.id || s.ID || s.SeverityTypeID);
      if (severityIds.length > 0) {
        onFilter(severityIds);
      }
    }
  };
}

// Helper to create quick filter for date-based filtering
export function createDateRangeQuickFilter(
  label: string,
  days: number,
  onFilter: (items: any[]) => void,
  dateField: string = 'date',
  colorClass: string = 'bg-yellow-100 text-yellow-800 border border-yellow-200'
): QuickFilter {
  return {
    label,
    colorClass,
    onClick: () => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      // This will be handled by the parent component's filter logic
      onFilter([]);
    }
  };
}

// Complete filter configuration builder
export function buildFilterConfig<T>(
  entityName: string,
  fields: FilterField[],
  filters: T,
  filteredCount: number,
  onFilterChange: (key: string, value: string) => void,
  onApplyFilters: () => void,
  onClearFilters: () => void,
  quickFilters?: QuickFilter[]
): FilterConfig<T> {
  return {
    entityName,
    fields,
    quickFilters,
    filters,
    filteredCount,
    onFilterChange,
    onApplyFilters,
    onClearFilters
  };
}

// Common filter functions for different data types
export const filterFunctions = {
  // Generic filter that compares field values
  byField: (data: any[], fieldName: string, filterValue: string | number) => {
    if (!filterValue) return data;
    return data.filter(item => item[fieldName] === filterValue || item[fieldName] === parseInt(filterValue.toString()));
  },

  // Date range filter
  byDateRange: (data: any[], dateField: string, fromDate?: string, toDate?: string) => {
    let filtered = data;

    if (fromDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item[dateField]);
        const from = new Date(fromDate);
        return itemDate >= from;
      });
    }

    if (toDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item[dateField]);
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999); // Include the entire day
        return itemDate <= to;
      });
    }

    return filtered;
  },

  // Text search filter
  byTextSearch: (data: any[], searchField: string, searchValue: string) => {
    if (!searchValue) return data;
    const lowerSearch = searchValue.toLowerCase();
    return data.filter(item =>
      item[searchField]?.toString().toLowerCase().includes(lowerSearch)
    );
  }
};

// Backend filter conversion utilities
export const backendFilterUtils = {
  // Convert incident filters to backend parameters using database-first naming
  convertIncidentFilters: (filters: {
    type?: string;
    status?: string;
    severity?: string;
    priority?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }) => {
    const params: any = {};

    if (filters.type && filters.type !== '') {
      params.IncidentTypeID = parseInt(filters.type);
    }

    if (filters.status && filters.status !== '') {
      params.IncidentStatusTypeID = parseInt(filters.status);
    }

    if (filters.severity && filters.severity !== '') {
      params.IncidentSeverityTypeID = parseInt(filters.severity);
    }

    if (filters.priority && filters.priority !== '') {
      params.IncidentPriorityTypeID = parseInt(filters.priority);
    }

    if (filters.dateFrom && filters.dateFrom !== '') {
      params.FromDate = filters.dateFrom;
    }

    if (filters.dateTo && filters.dateTo !== '') {
      params.ToDate = filters.dateTo;
    }

    if (filters.search && filters.search !== '') {
      params.Search = filters.search;
    }

    return params;
  }
};

export default {
  createSelectField,
  createDateField,
  createTextField,
  createNumberField,
  createStatusQuickFilter,
  createSeverityQuickFilter,
  createDateRangeQuickFilter,
  buildFilterConfig,
  filterFunctions,
  backendFilterUtils
};