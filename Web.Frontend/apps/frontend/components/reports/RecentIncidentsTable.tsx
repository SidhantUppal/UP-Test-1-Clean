"use client";

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IncidentFiltersType } from './IncidentFilters';

interface RecentIncident {
  id: string;
  reference: string;
  status: 'Open' | 'Closed' | 'In Progress' | 'Under Investigation';
  rating: 'High' | 'Medium' | 'Low' | 'Critical';
  personReporting: string;
  personAffected: string;
  summary: string;
  location: string;
  dateTime: string;
  incidentType: string;
}

interface RecentIncidentsTableProps {
  incidents?: RecentIncident[];
  filters?: IncidentFiltersType;
}

interface TableFilters {
  status: string[];
  rating: string[];
  location: string[];
  incidentType: string[];
  personReporting: string;
  dateFrom: string;
  dateTo: string;
}

interface GroupingOption {
  value: keyof RecentIncident | 'none';
  label: string;
}

export const RecentIncidentsTable: React.FC<RecentIncidentsTableProps> = ({
  incidents = mockRecentIncidents,
  filters
}) => {
  const router = useRouter();
  const [localIncidents, setLocalIncidents] = useState(incidents);

  // Advanced table filtering state
  const [tableFilters, setTableFilters] = useState<TableFilters>({
    status: [],
    rating: [],
    location: [],
    incidentType: [],
    personReporting: '',
    dateFrom: '',
    dateTo: ''
  });

  // Grouping state
  const [groupBy, setGroupBy] = useState<keyof RecentIncident | 'none'>('none');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter dropdowns
  const uniqueValues = useMemo(() => ({
    status: [...new Set(localIncidents.map(i => i.status))].sort(),
    rating: [...new Set(localIncidents.map(i => i.rating))].sort(),
    location: [...new Set(localIncidents.map(i => i.location))].sort(),
    incidentType: [...new Set(localIncidents.map(i => i.incidentType))].sort(),
    personReporting: [...new Set(localIncidents.map(i => i.personReporting))].sort()
  }), [localIncidents]);

  const groupingOptions: GroupingOption[] = [
    { value: 'none', label: 'No Grouping' },
    { value: 'status', label: 'Group by Status' },
    { value: 'rating', label: 'Group by Rating' },
    { value: 'location', label: 'Group by Location' },
    { value: 'incidentType', label: 'Group by Incident Type' }
  ];

  const filteredIncidents = useMemo(() => {
    let currentIncidents = localIncidents;

    // Apply legacy filters first
    if (filters) {
      currentIncidents = currentIncidents.filter(incident => {
        // Status filter
        if (filters.status !== 'all' && incident.status !== filters.status) {
          return false;
        }
        // Rating filter
        if (filters.rating !== 'all' && incident.rating !== filters.rating) {
          return false;
        }
        // Person reporting filter
        if (filters.personReporting &&
            !incident.personReporting.toLowerCase().includes(filters.personReporting.toLowerCase())) {
          return false;
        }
        // Person affected filter
        if (filters.personAffected &&
            !incident.personAffected.toLowerCase().includes(filters.personAffected.toLowerCase())) {
          return false;
        }
        // Location filter
        if (filters.location !== 'all' && incident.location !== filters.location) {
          return false;
        }
        // Incident type filter
        if (filters.incidentType !== 'all' && incident.incidentType !== filters.incidentType) {
          return false;
        }
        // Date range filter
        const incidentDate = new Date(incident.dateTime);
        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom);
          if (incidentDate < fromDate) return false;
        }
        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo);
          toDate.setHours(23, 59, 59, 999); // Include entire day
          if (incidentDate > toDate) return false;
        }
        return true;
      });
    }

    // Apply advanced table filters
    return currentIncidents.filter(incident => {
      // Multi-select status filter
      if (tableFilters.status.length > 0 && !tableFilters.status.includes(incident.status)) {
        return false;
      }
      // Multi-select rating filter
      if (tableFilters.rating.length > 0 && !tableFilters.rating.includes(incident.rating)) {
        return false;
      }
      // Multi-select location filter
      if (tableFilters.location.length > 0 && !tableFilters.location.includes(incident.location)) {
        return false;
      }
      // Multi-select incident type filter
      if (tableFilters.incidentType.length > 0 && !tableFilters.incidentType.includes(incident.incidentType)) {
        return false;
      }
      // Person reporting text filter
      if (tableFilters.personReporting &&
          !incident.personReporting.toLowerCase().includes(tableFilters.personReporting.toLowerCase())) {
        return false;
      }
      // Date range filters
      const incidentDate = new Date(incident.dateTime);
      if (tableFilters.dateFrom) {
        const fromDate = new Date(tableFilters.dateFrom);
        if (incidentDate < fromDate) return false;
      }
      if (tableFilters.dateTo) {
        const toDate = new Date(tableFilters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (incidentDate > toDate) return false;
      }
      return true;
    });
  }, [localIncidents, filters, tableFilters]);

  // Group incidents if grouping is enabled
  const groupedIncidents = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Incidents': filteredIncidents };
    }

    const groups: Record<string, RecentIncident[]> = {};
    filteredIncidents.forEach(incident => {
      const groupKey = incident[groupBy] || 'Unknown';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(incident);
    });

    // Sort groups by key
    const sortedGroups: Record<string, RecentIncident[]> = {};
    Object.keys(groups).sort().forEach(key => {
      sortedGroups[key] = groups[key];
    });

    return sortedGroups;
  }, [filteredIncidents, groupBy]);

  // Filter helper functions
  const toggleMultiSelectFilter = (filterKey: keyof Pick<TableFilters, 'status' | 'rating' | 'location' | 'incidentType'>, value: string) => {
    setTableFilters(prev => ({
      ...prev,
      [filterKey]: prev[filterKey].includes(value)
        ? prev[filterKey].filter(v => v !== value)
        : [...prev[filterKey], value]
    }));
  };

  const clearAllFilters = () => {
    setTableFilters({
      status: [],
      rating: [],
      location: [],
      incidentType: [],
      personReporting: '',
      dateFrom: '',
      dateTo: ''
    });
    setGroupBy('none');
  };

  const hasActiveFilters = () => {
    return tableFilters.status.length > 0 ||
           tableFilters.rating.length > 0 ||
           tableFilters.location.length > 0 ||
           tableFilters.incidentType.length > 0 ||
           tableFilters.personReporting !== '' ||
           tableFilters.dateFrom !== '' ||
           tableFilters.dateTo !== '';
  };

  const getStatusBadge = (status: RecentIncident['status']) => {
    const statusStyles = {
      'Open': 'bg-yellow-100 text-yellow-800',
      'Closed': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Under Investigation': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const getRatingBadge = (rating: RecentIncident['rating']) => {
    const ratingStyles = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ratingStyles[rating]}`}>
        {rating}
      </span>
    );
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewIncident = (incidentId: string) => {
    router.push(`/incidents/${incidentId}/view?readonly=true`);
  };

  const handleCloseIncident = (incidentId: string) => {
    if (confirm('Are you sure you want to close this incident?')) {
      setLocalIncidents(prev =>
        prev.map(incident =>
          incident.id === incidentId
            ? { ...incident, status: 'Closed' as const }
            : incident
        )
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Incident Filters & Grouping</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters() && (
              <span className="text-sm text-gray-600">
                {filteredIncidents.length} of {localIncidents.length} incidents
              </span>
            )}

            {hasActiveFilters() && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Grouping Control */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Group By:</label>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as keyof RecentIncident | 'none')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {groupingOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Controls */}
        {showFilters && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status:</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {uniqueValues.status.map(status => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tableFilters.status.includes(status)}
                        onChange={() => toggleMultiSelectFilter('status', status)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {uniqueValues.rating.map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tableFilters.rating.includes(rating)}
                        onChange={() => toggleMultiSelectFilter('rating', rating)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location:</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {uniqueValues.location.map(location => (
                    <label key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tableFilters.location.includes(location)}
                        onChange={() => toggleMultiSelectFilter('location', location)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Incident Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type:</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {uniqueValues.incidentType.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tableFilters.incidentType.includes(type)}
                        onChange={() => toggleMultiSelectFilter('incidentType', type)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Text and Date Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Reporting:</label>
                <input
                  type="text"
                  value={tableFilters.personReporting}
                  onChange={(e) => setTableFilters(prev => ({ ...prev, personReporting: e.target.value }))}
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date From:</label>
                <input
                  type="date"
                  value={tableFilters.dateFrom}
                  onChange={(e) => setTableFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date To:</label>
                <input
                  type="date"
                  value={tableFilters.dateTo}
                  onChange={(e) => setTableFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Person Reporting
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Person Affected
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Summary
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Incident Type
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Object.entries(groupedIncidents).map(([groupName, groupIncidents]) => (
              <React.Fragment key={groupName}>
                {/* Group Header (only show if grouping is enabled) */}
                {groupBy !== 'none' && (
                  <tr className="bg-gray-100">
                    <td colSpan={10} className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                      {groupName} ({groupIncidents.length} incident{groupIncidents.length !== 1 ? 's' : ''})
                    </td>
                  </tr>
                )}

                {/* Group Incidents */}
                {groupIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <a href={`/incidents/${incident.id}`} className="text-blue-600 hover:text-blue-900">
                        {incident.reference}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getStatusBadge(incident.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRatingBadge(incident.rating)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.personReporting}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.personAffected}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={incident.summary}>
                      {incident.summary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateTime(incident.dateTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.incidentType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewIncident(incident.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          title="View incident (read-only)"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        {incident.status !== 'Closed' && (
                          <button
                            onClick={() => handleCloseIncident(incident.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            title="Close incident"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* Empty State */}
            {filteredIncidents.length === 0 && (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-2">No incidents found</p>
                    <p className="text-gray-600">
                      {hasActiveFilters()
                        ? 'Try adjusting your filters to see more results.'
                        : 'No incidents to display at this time.'
                      }
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

// Mock data for recent incidents (updated through September 25, 2025)
const mockRecentIncidents: RecentIncident[] = [
  {
    id: 'INC-2025-089',
    reference: 'INC-2025-089',
    status: 'Open',
    rating: 'Medium',
    personReporting: 'Sarah Mitchell',
    personAffected: 'N/A',
    summary: 'Near miss - crane load swing detected early by safety systems',
    location: 'Construction Yard',
    dateTime: '2025-09-25T14:45:00',
    incidentType: 'Near Miss'
  },
  {
    id: 'INC-2025-088',
    reference: 'INC-2025-088',
    status: 'In Progress',
    rating: 'Low',
    personReporting: 'Michael Thompson',
    personAffected: 'Michael Thompson',
    summary: 'Minor first aid - small cut while handling packaging materials',
    location: 'Packaging Department',
    dateTime: '2025-09-24T11:20:00',
    incidentType: 'Accident Book'
  },
  {
    id: 'INC-2025-087',
    reference: 'INC-2025-087',
    status: 'Under Investigation',
    rating: 'High',
    personReporting: 'Emma Watson',
    personAffected: 'David Chang',
    summary: 'Chemical exposure - employee felt nauseous after ventilation system failure',
    location: 'Laboratory 2',
    dateTime: '2025-09-23T16:15:00',
    incidentType: 'Dangerous Occurrence'
  },
  {
    id: 'INC-2025-086',
    reference: 'INC-2025-086',
    status: 'Closed',
    rating: 'Medium',
    personReporting: 'James Rodriguez',
    personAffected: 'Lisa Parker',
    summary: 'Slip on wet floor in canteen - no injury, safety mats installed',
    location: 'Staff Canteen',
    dateTime: '2025-09-22T12:30:00',
    incidentType: 'Accident Report'
  },
  {
    id: 'INC-2025-085',
    reference: 'INC-2025-085',
    status: 'In Progress',
    rating: 'Low',
    personReporting: 'Alex Johnson',
    personAffected: 'N/A',
    summary: 'Near miss - pedestrian walkway blocked by delivery truck',
    location: 'Loading Dock A',
    dateTime: '2025-09-21T08:45:00',
    incidentType: 'Near Miss'
  },
  {
    id: 'INC-2025-084',
    reference: 'INC-2025-084',
    status: 'Open',
    rating: 'Medium',
    personReporting: 'Rachel Green',
    personAffected: 'Mark Stevens',
    summary: 'Eye irritation from dust - improved ventilation recommended',
    location: 'Grinding Workshop',
    dateTime: '2025-09-20T15:10:00',
    incidentType: 'Accident Report'
  },
  {
    id: 'INC-2025-083',
    reference: 'INC-2025-083',
    status: 'Closed',
    rating: 'Low',
    personReporting: 'Peter Wilson',
    personAffected: 'N/A',
    summary: 'Near miss - unsecured scaffolding noticed during inspection',
    location: 'Maintenance Area',
    dateTime: '2025-09-19T10:30:00',
    incidentType: 'Near Miss'
  },
  {
    id: 'INC-2025-082',
    reference: 'INC-2025-082',
    status: 'Under Investigation',
    rating: 'Critical',
    personReporting: 'Sophie Davis',
    personAffected: 'Multiple',
    summary: 'Fire alarm malfunction during evacuation drill - system fault identified',
    location: 'Building A',
    dateTime: '2025-09-18T14:00:00',
    incidentType: 'Dangerous Occurrence'
  },
  {
    id: 'INC-2025-081',
    reference: 'INC-2025-081',
    status: 'Closed',
    rating: 'Low',
    personReporting: 'Kevin Brown',
    personAffected: 'Kevin Brown',
    summary: 'Bruised knee from trip over extension cord - cord management improved',
    location: 'Office Floor 2',
    dateTime: '2025-09-17T09:25:00',
    incidentType: 'Accident Report'
  },
  {
    id: 'INC-2025-080',
    reference: 'INC-2025-080',
    status: 'In Progress',
    rating: 'Medium',
    personReporting: 'Anna Taylor',
    personAffected: 'N/A',
    summary: 'Near miss - forklift safety sensor prevented collision with worker',
    location: 'Warehouse C',
    dateTime: '2025-09-16T13:40:00',
    incidentType: 'Near Miss'
  },
  {
    id: 'INC-2025-079',
    reference: 'INC-2025-079',
    status: 'Open',
    rating: 'High',
    personReporting: 'Chris Martinez',
    personAffected: 'Jennifer Lee',
    summary: 'Equipment malfunction - press machine emergency stop activated',
    location: 'Production Line 3',
    dateTime: '2025-09-15T07:15:00',
    incidentType: 'Dangerous Occurrence'
  },
  {
    id: 'INC-2025-078',
    reference: 'INC-2025-078',
    status: 'Closed',
    rating: 'Low',
    personReporting: 'Maria Garcia',
    personAffected: 'N/A',
    summary: 'Near miss - loose handrail discovered during routine inspection',
    location: 'Stairwell B',
    dateTime: '2025-09-14T11:50:00',
    incidentType: 'Near Miss'
  },
  {
    id: 'INC-2025-077',
    reference: 'INC-2025-077',
    status: 'Under Investigation',
    rating: 'Medium',
    personReporting: 'Robert Kim',
    personAffected: 'Susan White',
    summary: 'Allergic reaction to new cleaning chemical - product being reviewed',
    location: 'Cleaning Storage',
    dateTime: '2025-09-13T16:20:00',
    incidentType: 'Accident Report'
  },
  {
    id: 'INC-2025-076',
    reference: 'INC-2025-076',
    status: 'Closed',
    rating: 'Low',
    personReporting: 'Daniel Moore',
    personAffected: 'Daniel Moore',
    summary: 'Paper cut while handling documents - first aid applied',
    location: 'Administration Office',
    dateTime: '2025-09-12T14:35:00',
    incidentType: 'Accident Book'
  },
  {
    id: 'INC-2025-075',
    reference: 'INC-2025-075',
    status: 'In Progress',
    rating: 'Medium',
    personReporting: 'Laura Johnson',
    personAffected: 'N/A',
    summary: 'Near miss - vehicle reversed into loading area without spotter',
    location: 'Loading Bay 2',
    dateTime: '2025-09-11T08:10:00',
    incidentType: 'Near Miss'
  }
];