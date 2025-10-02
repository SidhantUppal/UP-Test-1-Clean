"use client";

import React from 'react';

export interface EnhancedReportFiltersType {
  status: string;
  severity: string;
  timeRating: string;
  investigationStatus: string;
  personReporting: string;
  personAffected: string;
  location: string;
  incidentType: string;
  injuryType: string;
  selectedForms: string[];
  dateFrom: string;
  dateTo: string;
  quickDateRange: string;
}

interface EnhancedReportFiltersProps {
  filters: EnhancedReportFiltersType;
  onFiltersChange: (filters: EnhancedReportFiltersType) => void;
  onReset: () => void;
  availableForms?: Array<{id: string, name: string}>;
}

export const defaultEnhancedReportFilters: EnhancedReportFiltersType = {
  status: 'all',
  severity: 'all',
  timeRating: 'all',
  investigationStatus: 'all',
  personReporting: '',
  personAffected: '',
  location: 'all',
  incidentType: 'all',
  injuryType: 'all',
  selectedForms: [],
  dateFrom: '',
  dateTo: '',
  quickDateRange: 'all'
};

export const EnhancedReportFilters: React.FC<EnhancedReportFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
  availableForms = [
    { id: 'accident-report', name: 'Accident Report Form' },
    { id: 'near-miss', name: 'Near Miss Report Form' },
    { id: 'dangerous-occurrence', name: 'Dangerous Occurrence Form' },
    { id: 'first-aid', name: 'First Aid Form' },
    { id: 'environmental', name: 'Environmental Incident Form' },
    { id: 'security', name: 'Security Incident Form' }
  ]
}) => {
  const handleFilterChange = (field: keyof EnhancedReportFiltersType, value: string | string[]) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const handleFormToggle = (formId: string) => {
    const currentForms = filters.selectedForms || [];
    const newForms = currentForms.includes(formId)
      ? currentForms.filter(id => id !== formId)
      : [...currentForms, formId];
    
    handleFilterChange('selectedForms', newForms);
  };

  const handleQuickDateRange = (range: string) => {
    const today = new Date();
    let dateFrom = '';
    let dateTo = today.toISOString().split('T')[0];

    switch (range) {
      case '30days':
        dateFrom = new Date(today.setDate(today.sysdatetimeoffset() - 30)).toISOString().split('T')[0];
        break;
      case '90days':
        dateFrom = new Date(today.setDate(today.sysdatetimeoffset() - 60)).toISOString().split('T')[0]; // -60 because we already subtracted 30
        break;
      case '12months':
        dateFrom = new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split('T')[0];
        break;
      case 'ytd':
        dateFrom = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
        break;
      default:
        dateFrom = '';
        dateTo = '';
    }

    onFiltersChange({
      ...filters,
      quickDateRange: range,
      dateFrom,
      dateTo
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.severity !== 'all') count++;
    if (filters.timeRating !== 'all') count++;
    if (filters.investigationStatus !== 'all') count++;
    if (filters.personReporting) count++;
    if (filters.personAffected) count++;
    if (filters.location !== 'all') count++;
    if (filters.incidentType !== 'all') count++;
    if (filters.injuryType !== 'all') count++;
    if (filters.selectedForms.length > 0) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    return count;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Advanced Report Filters</h3>
          <p className="text-sm text-gray-600 mt-1">
            {getActiveFiltersCount() > 0 
              ? `${getActiveFiltersCount()} active filter${getActiveFiltersCount() === 1 ? '' : 's'}`
              : 'All incidents included'
            }
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
          Reset All Filters
        </button>
      </div>

      <div className="space-y-6">
        {/* Quick Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quick Date Range</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Time' },
              { value: '30days', label: 'Last 30 Days' },
              { value: '90days', label: 'Last 90 Days' },
              { value: '12months', label: 'Last 12 Months' },
              { value: 'ytd', label: 'Year to Date' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => handleQuickDateRange(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filters.quickDateRange === option.value
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selectable Forms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Selectable Forms</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableForms.map(form => (
              <label key={form.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.selectedForms.includes(form.id)}
                  onChange={() => handleFormToggle(form.id)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{form.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Main Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Severity Rating Filter */}
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
              Severity Rating
            </label>
            <select
              id="severity"
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Time Rating Filter */}
          <div>
            <label htmlFor="timeRating" className="block text-sm font-medium text-gray-700 mb-1">
              Time Rating
            </label>
            <select
              id="timeRating"
              value={filters.timeRating}
              onChange={(e) => handleFilterChange('timeRating', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Time Ratings</option>
              <option value="Immediate">Immediate (&lt; 1 day)</option>
              <option value="Urgent">Urgent (1-3 days)</option>
              <option value="Normal">Normal (4-7 days)</option>
              <option value="Low">Low (&gt; 7 days)</option>
            </select>
          </div>

          {/* Investigation Status Filter */}
          <div>
            <label htmlFor="investigationStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Investigation Status
            </label>
            <select
              id="investigationStatus"
              value={filters.investigationStatus}
              onChange={(e) => handleFilterChange('investigationStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Investigations</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Closed">Closed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          {/* Incident Type Filter */}
          <div>
            <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 mb-1">
              Incident Type
            </label>
            <select
              id="incidentType"
              value={filters.incidentType}
              onChange={(e) => handleFilterChange('incidentType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Types</option>
              <option value="Accident Report">Accident Report</option>
              <option value="Near Miss">Near Miss</option>
              <option value="Dangerous Occurrence">Dangerous Occurrence</option>
              <option value="First Aid">First Aid</option>
              <option value="Environmental">Environmental</option>
              <option value="Security">Security</option>
            </select>
          </div>

          {/* Injury Type Filter */}
          <div>
            <label htmlFor="injuryType" className="block text-sm font-medium text-gray-700 mb-1">
              Injury Type
            </label>
            <select
              id="injuryType"
              value={filters.injuryType}
              onChange={(e) => handleFilterChange('injuryType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Injury Types</option>
              <option value="Cuts">Cuts & Lacerations</option>
              <option value="Burns">Burns</option>
              <option value="Sprains">Sprains & Strains</option>
              <option value="Fractures">Fractures</option>
              <option value="Bruises">Bruises & Contusions</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              id="location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Locations</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Laboratory 3">Laboratory 3</option>
              <option value="Loading Bay">Loading Bay</option>
              <option value="Production Floor">Production Floor</option>
              <option value="Building C">Building C</option>
              <option value="Paint Shop">Paint Shop</option>
              <option value="Machine Shop">Machine Shop</option>
              <option value="Dispatch Area">Dispatch Area</option>
            </select>
          </div>

          {/* Person Reporting Filter */}
          <div>
            <label htmlFor="personReporting" className="block text-sm font-medium text-gray-700 mb-1">
              Person Reporting
            </label>
            <input
              type="text"
              id="personReporting"
              value={filters.personReporting}
              onChange={(e) => handleFilterChange('personReporting', e.target.value)}
              placeholder="Enter name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Person Affected Filter */}
          <div>
            <label htmlFor="personAffected" className="block text-sm font-medium text-gray-700 mb-1">
              Person Affected
            </label>
            <input
              type="text"
              id="personAffected"
              value={filters.personAffected}
              onChange={(e) => handleFilterChange('personAffected', e.target.value)}
              placeholder="Enter name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Custom Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Date From
            </label>
            <input
              type="date"
              id="dateFrom"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Date To
            </label>
            <input
              type="date"
              id="dateTo"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Active filters:</span>
              {filters.status !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Status: {filters.status}
                </span>
              )}
              {filters.severity !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Severity: {filters.severity}
                </span>
              )}
              {filters.investigationStatus !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Investigation: {filters.investigationStatus}
                </span>
              )}
              {filters.selectedForms.length > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Forms: {filters.selectedForms.length} selected
                </span>
              )}
              {(filters.dateFrom || filters.dateTo) && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Date Range
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};