"use client";

import { useState } from 'react';

export interface ReportFilters {
  dateRange: {
    start: string;
    end: string;
    preset: string;
  };
  departments: string[];
  severities: string[];
  statuses: string[];
  incidentTypes: string[];
  includeClosed: boolean;
  includeRIDDOR: boolean;
}

interface ReportFiltersProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  onExport: (format: 'pdf' | 'excel' | 'csv') => void;
  onReset: () => void;
}

const datePresets = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last 12 months', value: '12m' },
  { label: 'Year to date', value: 'ytd' },
  { label: 'Custom range', value: 'custom' }
];

const departments = [
  'Manufacturing',
  'Warehouse',
  'Chemical Processing',
  'Agriculture',
  'Logistics',
  'Administration',
  'IT',
  'Finance'
];

const severities = ['Critical', 'High', 'Medium', 'Low'];
const statuses = ['Open', 'In Progress', 'Under Investigation', 'Closed', 'Resolved'];
const incidentTypes = [
  'Accident Report',
  'Near Miss',
  'Dangerous Occurrence',
  'Road Traffic Incident',
  'Farming Incident',
  'HR Complaint',
  'Data Breach',
  'Accident Book',
  'Ethics Concern'
];

export const ReportFilters = ({ filters, onFiltersChange, onExport, onReset }: ReportFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exportLoading, setExportLoading] = useState<string | null>(null);

  const updateFilters = (updates: Partial<ReportFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const handleDatePresetChange = (preset: string) => {
    const end = new Date();
    let start = new Date();

    switch (preset) {
      case '7d':
        start.setDate(end.sysdatetimeoffset() - 7);
        break;
      case '30d':
        start.setDate(end.sysdatetimeoffset() - 30);
        break;
      case '3m':
        start.setMonth(end.getMonth() - 3);
        break;
      case '6m':
        start.setMonth(end.getMonth() - 6);
        break;
      case '12m':
        start.setFullYear(end.getFullYear() - 1);
        break;
      case 'ytd':
        start = new Date(end.getFullYear(), 0, 1);
        break;
      default:
        return;
    }

    updateFilters({
      dateRange: {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        preset
      }
    });
  };

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    setExportLoading(format);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onExport(format);
      
      // Show success message (in real app, this would trigger a download)
      alert(`Report exported successfully as ${format.toUpperCase()}!`);
    } catch (error) {
      alert('Export failed. Please try again.');
    } finally {
      setExportLoading(null);
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.departments.length > 0) count++;
    if (filters.severities.length > 0) count++;
    if (filters.statuses.length > 0) count++;
    if (filters.incidentTypes.length > 0) count++;
    if (filters.dateRange.preset !== '30d') count++; // Default is 30d
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Filter Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-900">Report Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                {activeFiltersCount} active
              </span>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }}
              className="hover:opacity-80"
            >
              {isExpanded ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Export Buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => handleExport('pdf')}
                disabled={exportLoading === 'pdf'}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff',
                  padding: '4px 12px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportLoading === 'pdf' ? (
                  <>
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </>
                ) : (
                  'PDF'
                )}
              </button>
              
              <button
                onClick={() => handleExport('excel')}
                disabled={exportLoading === 'excel'}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff',
                  padding: '4px 12px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportLoading === 'excel' ? (
                  <>
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </>
                ) : (
                  'Excel'
                )}
              </button>
              
              <button
                onClick={() => handleExport('csv')}
                disabled={exportLoading === 'csv'}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff',
                  padding: '4px 12px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportLoading === 'csv' ? (
                  <>
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </>
                ) : (
                  'CSV'
                )}
              </button>
            </div>
            
            <button
              onClick={onReset}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Quick Date Range (always visible) */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Date Range:</span>
          {datePresets.slice(0, -1).map(preset => (
            <button
              key={preset.value}
              onClick={() => handleDatePresetChange(preset.value)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                filters.dateRange.preset === preset.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
          
          {/* Custom Date Range Inputs */}
          {filters.dateRange.preset === 'custom' && (
            <div className="flex gap-2 ml-2">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => updateFilters({
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })}
                className="text-xs border border-gray-300 rounded px-2 py-1"
              />
              <span className="text-xs text-gray-500">to</span>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => updateFilters({
                  dateRange: { ...filters.dateRange, end: e.target.value }
                })}
                className="text-xs border border-gray-300 rounded px-2 py-1"
              />
            </div>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="px-4 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Departments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departments</label>
              <div className="space-y-1 max-h-32 overflow-y-auto border border-gray-200 rounded p-2">
                {departments.map(dept => (
                  <label key={dept} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.departments.includes(dept)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters({ departments: [...filters.departments, dept] });
                        } else {
                          updateFilters({ departments: filters.departments.filter(d => d !== dept) });
                        }
                      }}
                      className="mr-2"
                    />
                    {dept}
                  </label>
                ))}
              </div>
            </div>

            {/* Severities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
              <div className="space-y-1 border border-gray-200 rounded p-2">
                {severities.map(severity => (
                  <label key={severity} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.severities.includes(severity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters({ severities: [...filters.severities, severity] });
                        } else {
                          updateFilters({ severities: filters.severities.filter(s => s !== severity) });
                        }
                      }}
                      className="mr-2"
                    />
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {severity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="space-y-1 border border-gray-200 rounded p-2 max-h-32 overflow-y-auto">
                {statuses.map(status => (
                  <label key={status} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.statuses.includes(status)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters({ statuses: [...filters.statuses, status] });
                        } else {
                          updateFilters({ statuses: filters.statuses.filter(s => s !== status) });
                        }
                      }}
                      className="mr-2"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            {/* Incident Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Incident Types</label>
              <div className="space-y-1 border border-gray-200 rounded p-2 max-h-32 overflow-y-auto">
                {incidentTypes.map(type => (
                  <label key={type} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.incidentTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters({ incidentTypes: [...filters.incidentTypes, type] });
                        } else {
                          updateFilters({ incidentTypes: filters.incidentTypes.filter(t => t !== type) });
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-xs">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={filters.includeClosed}
                  onChange={(e) => updateFilters({ includeClosed: e.target.checked })}
                  className="mr-2"
                />
                Include closed incidents
              </label>
              
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={filters.includeRIDDOR}
                  onChange={(e) => updateFilters({ includeRIDDOR: e.target.checked })}
                  className="mr-2"
                />
                RIDDOR reportable only
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Default filters
export const defaultFilters: ReportFilters = {
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    end: new Date().toISOString().split('T')[0], // Today
    preset: '30d'
  },
  departments: [],
  severities: [],
  statuses: [],
  incidentTypes: [],
  includeClosed: true,
  includeRIDDOR: false
};