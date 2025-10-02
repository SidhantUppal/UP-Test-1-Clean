"use client";

import React from 'react';

export interface IncidentFiltersType {
  status: string;
  rating: string;
  personReporting: string;
  personAffected: string;
  location: string;
  incidentType: string;
  dateFrom: string;
  dateTo: string;
}

interface IncidentFiltersProps {
  filters: IncidentFiltersType;
  onFiltersChange: (filters: IncidentFiltersType) => void;
  onReset: () => void;
}

export const defaultIncidentFilters: IncidentFiltersType = {
  status: 'all',
  rating: 'all',
  personReporting: '',
  personAffected: '',
  location: 'all',
  incidentType: 'all',
  dateFrom: '',
  dateTo: ''
};

export const IncidentFilters: React.FC<IncidentFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset
}) => {
  const handleFilterChange = (field: keyof IncidentFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Incidents</h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Reset Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <select
            id="rating"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">All Ratings</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
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
          </select>
        </div>

        {/* Date From Filter */}
        <div>
          <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
            Date From
          </label>
          <input
            type="date"
            id="dateFrom"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Date To Filter */}
        <div>
          <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
            Date To
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
      {(filters.status !== 'all' || filters.rating !== 'all' || filters.personReporting || 
        filters.personAffected || filters.location !== 'all' || filters.incidentType !== 'all' ||
        filters.dateFrom || filters.dateTo) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Status: {filters.status}
              </span>
            )}
            {filters.rating !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Rating: {filters.rating}
              </span>
            )}
            {filters.personReporting && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Reporter: {filters.personReporting}
              </span>
            )}
            {filters.personAffected && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Affected: {filters.personAffected}
              </span>
            )}
            {filters.location !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Location: {filters.location}
              </span>
            )}
            {filters.incidentType !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Type: {filters.incidentType}
              </span>
            )}
            {filters.dateFrom && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                From: {filters.dateFrom}
              </span>
            )}
            {filters.dateTo && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                To: {filters.dateTo}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};