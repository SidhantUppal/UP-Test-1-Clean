'use client';

import React from 'react';

// Generic filter field configuration
export interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'date' | 'text' | 'number';
  options?: Array<{
    value: string | number;
    label: string;
    id?: string | number;
  }>;
  placeholder?: string;
  allLabel?: string; // e.g., "All Types", "All Statuses"
}

// Quick filter button configuration
export interface QuickFilter {
  label: string;
  onClick: () => void;
  colorClass?: string; // e.g., "bg-blue-100 text-blue-800 border-blue-200"
}

// Main filter configuration
export interface FilterConfig<T = Record<string, any>> {
  entityName: string; // e.g., "Incidents", "Tasks", "Users"
  fields: FilterField[];
  quickFilters?: QuickFilter[];
  filters: T;
  filteredCount: number;
  onFilterChange: (key: string, value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

interface FilterSectionProps<T = Record<string, any>> {
  config: FilterConfig<T>;
  loading?: boolean;
  className?: string;
  isApplying?: boolean; // For backend filtering loading state
}

export function FilterSection<T = Record<string, any>>({
  config,
  loading = false,
  className = "",
  isApplying = false
}: FilterSectionProps<T>) {
  const {
    entityName,
    fields,
    quickFilters,
    filters,
    filteredCount,
    onFilterChange,
    onApplyFilters,
    onClearFilters
  } = config;

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value =>
    value !== '' && value !== null && value !== undefined
  );

  const renderField = (field: FilterField) => {
    const value = (filters as any)[field.key] || '';

    switch (field.type) {
      case 'select':
        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <select
              value={value}
              onChange={(e) => onFilterChange(field.key, e.target.value)}
              disabled={loading || isApplying}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm disabled:bg-gray-100"
            >
              <option value="">{field.allLabel || `All ${field.label}s`}</option>
              {field.options?.map((option) => (
                <option key={option.id || option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'date':
        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => onFilterChange(field.key, e.target.value)}
              disabled={loading || isApplying}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm disabled:bg-gray-100"
            />
          </div>
        );

      case 'text':
        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => onFilterChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              disabled={loading || isApplying}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm disabled:bg-gray-100"
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => onFilterChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              disabled={loading || isApplying}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm disabled:bg-gray-100"
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Determine grid columns based on number of fields
  const getGridClass = () => {
    const fieldCount = fields.length;
    if (fieldCount <= 2) return "grid-cols-1 md:grid-cols-2";
    if (fieldCount <= 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (fieldCount <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <h4 className="text-base font-semibold">Filter {entityName}</h4>
          {hasActiveFilters && (
            <span className="text-sm text-purple-600 font-medium">
              ({filteredCount} results)
            </span>
          )}
          {loading && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
              Loading...
            </div>
          )}
        </div>

        {/* Quick Filter Buttons */}
        {quickFilters && quickFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
            {quickFilters.map((quickFilter, index) => (
              <button
                key={index}
                onClick={quickFilter.onClick}
                disabled={loading || isApplying}
                className={`px-3 py-1 rounded text-xs hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${
                  quickFilter.colorClass || 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                {quickFilter.label}
              </button>
            ))}
            <button
              onClick={onClearFilters}
              disabled={loading || isApplying}
              style={{ backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }}
              className="px-3 py-1 rounded text-xs hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Form Grid */}
      <div className={`grid ${getGridClass()} gap-4 mb-4`}>
        {fields.map(renderField)}
      </div>

      {/* Action Buttons */}
      <div className="pt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onApplyFilters}
            disabled={loading || isApplying}
            style={{
              backgroundColor: (loading || isApplying) ? '#9CA3AF' : '#3d3a72',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: (loading || isApplying) ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              transition: 'opacity 0.2s'
            }}
            className="hover:opacity-80 disabled:opacity-50"
          >
            {(loading || isApplying) ? 'Applying...' : 'Apply Filters'}
          </button>

          <button
            onClick={onClearFilters}
            disabled={loading || isApplying}
            style={{
              backgroundColor: '#e77726',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: (loading || isApplying) ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              transition: 'opacity 0.2s'
            }}
            className="hover:opacity-80 disabled:opacity-50"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;