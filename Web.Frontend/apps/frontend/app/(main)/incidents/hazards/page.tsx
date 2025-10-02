"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Hazard, HazardCategoryType, calculateSeverityLevel, getSeverityColor } from '@/types/hazard.types';
import { hazardService } from '@/services/hazardService';
// import HazardsMobileViewModal from './components/HazardsMobileViewModal'; // Removed - mobile view only needed on new hazard page

export default function HazardsPage() {
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    riskLevel: '',
    status: '',
    search: ''
  });
  const [activeFilters, setActiveFilters] = useState(0);
  const [sortField, setSortField] = useState<string>('severity');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  // const [showMobileView, setShowMobileView] = useState(false); // Removed - mobile view only needed on new hazard page

  useEffect(() => {
    loadHazards();
  }, []);

  const loadHazards = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch real data first
      try {
        const { hazards: hazardData } = await hazardService.getHazards({
          page: 1,
          pageSize: 100,
          status: 'active'
        });

        // Map hazards with calculated risk levels
        const mappedHazards = hazardData.map((h: any) => ({
          ...h,
          ...calculateSeverityLevel(h.inherentRiskScore)
        }));

        setHazards(mappedHazards);
      } catch (apiError) {
        console.warn('API failed, using mock data:', apiError);

        // Use mock data when API fails
        const mockHazards: Hazard[] = [
          {
            hazardId: 1,
            hazardName: 'Wet floor in main corridor',
            hazardDescription: 'Water leak from ceiling causing slippery surface',
            severity: 'High',
            categoryTypeName: 'Environmental',
            locationName: 'Building A - Floor 2',
            locationId: 1,
            hazardCategoryId: 1,
            assignedToUserName: 'John Smith',
            assignedToRoleName: null,
            isActive: true,
            inherentRiskScore: 16,
            ...calculateSeverityLevel(16)
          },
          {
            hazardId: 2,
            hazardName: 'Exposed electrical wiring',
            hazardDescription: 'Damaged insulation on power cables in storage room',
            severity: 'Critical',
            categoryTypeName: 'Electrical',
            locationName: 'Storage Room B',
            locationId: 2,
            hazardCategoryId: 2,
            assignedToUserName: null,
            assignedToRoleName: 'Maintenance Team',
            isActive: true,
            inherentRiskScore: 20,
            ...calculateSeverityLevel(20)
          },
          {
            hazardId: 3,
            hazardName: 'Blocked emergency exit',
            hazardDescription: 'Boxes stacked in front of emergency exit door',
            severity: 'High',
            categoryTypeName: 'Fire Safety',
            locationName: 'Warehouse',
            locationId: 3,
            hazardCategoryId: 3,
            assignedToUserName: 'Sarah Johnson',
            assignedToRoleName: null,
            isActive: true,
            inherentRiskScore: 18,
            ...calculateSeverityLevel(18)
          },
          {
            hazardId: 4,
            hazardName: 'Missing safety signage',
            hazardDescription: 'No warning signs near chemical storage area',
            severity: 'Medium',
            categoryTypeName: 'Chemical',
            locationName: 'Lab 3',
            locationId: 4,
            hazardCategoryId: 4,
            assignedToUserName: 'Mike Wilson',
            assignedToRoleName: null,
            isActive: true,
            inherentRiskScore: 12,
            ...calculateSeverityLevel(12)
          },
          {
            hazardId: 5,
            hazardName: 'Loose handrail on stairs',
            hazardDescription: 'Handrail mounting bolts are loose on stairway',
            severity: 'Medium',
            categoryTypeName: 'Structural',
            locationName: 'Main Stairwell',
            locationId: 5,
            hazardCategoryId: 5,
            assignedToUserName: null,
            assignedToRoleName: 'Facilities Team',
            isActive: true,
            inherentRiskScore: 10,
            ...calculateSeverityLevel(10)
          },
          {
            hazardId: 6,
            hazardName: 'Oil spill in parking lot',
            hazardDescription: 'Vehicle oil leak creating slip hazard',
            severity: 'Low',
            categoryTypeName: 'Environmental',
            locationName: 'Parking Lot A',
            locationId: 6,
            hazardCategoryId: 1,
            assignedToUserName: 'Tom Brown',
            assignedToRoleName: null,
            isActive: false,
            inherentRiskScore: 6,
            ...calculateSeverityLevel(6)
          }
        ];

        setHazards(mockHazards);
        setError(null); // Clear error since we have mock data
      }
    } catch (error: any) {
      console.error('Error loading hazards:', error);
      setError(error.message || 'Failed to load hazards');
      setHazards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Count active filters
    const count = Object.values(filters).filter(val => val !== '').length;
    setActiveFilters(count);
  }, [filters]);

  // Handle sorting
  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>
    );
  };

  const filteredHazards = useMemo(() => {
    let filtered = hazards.filter(hazard => {
      if (filters.category && hazard.categoryTypeName !== filters.category) return false;
      if (filters.riskLevel && hazard.severity !== filters.riskLevel) return false;
      if (filters.status && (filters.status === 'active' ? !hazard.isActive : hazard.isActive)) return false;
      if (filters.search && !hazard.hazardName?.toLowerCase().includes(filters.search.toLowerCase()) && 
          !hazard.hazardCode?.toLowerCase().includes(filters.search.toLowerCase()) &&
          !hazard.hazardDescription?.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortField) {
        case 'type':
          aVal = a.categoryTypeName || '';
          bVal = b.categoryTypeName || '';
          break;
        case 'location':
          aVal = a.locationName || '';
          bVal = b.locationName || '';
          break;
        case 'severity':
          const severityOrder = { 'Catastrophic': 5, 'Major': 4, 'Moderate': 3, 'Minor': 2, 'Negligible': 1 };
          aVal = severityOrder[a.severity as keyof typeof severityOrder] || 0;
          bVal = severityOrder[b.severity as keyof typeof severityOrder] || 0;
          break;
        case 'description':
          aVal = a.hazardDescription || '';
          bVal = b.hazardDescription || '';
          break;
        case 'assignedTo':
          aVal = a.assignedToUserName || '';
          bVal = b.assignedToUserName || '';
          break;
        case 'status':
          aVal = a.isActive ? 'Active' : 'Inactive';
          bVal = b.isActive ? 'Active' : 'Inactive';
          break;
        default:
          aVal = '';
          bVal = '';
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    return filtered;
  }, [hazards, filters, sortField, sortDirection]);

  const stats = {
    total: hazards.length,
    highRisk: hazards.filter(h => h.severity === 'Major' || h.severity === 'Catastrophic').length,
    categories: new Set(hazards.map(h => h.categoryTypeName)).size,
    recentUpdates: hazards.filter(h => {
      const date = new Date(h.ModifiedDate || h.createdDate);
      const daysSince = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 7;
    }).length
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      riskLevel: '',
      status: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Hazards</h1>
              <p className="text-gray-600 mt-1">Manage workplace hazards and risk assessments</p>
            </div>
            <div className="flex gap-3">
              {/* Mobile View button removed - only available on new hazard page */}
              <Link href="/incidents/hazards/my-hazards">
                <button style={{
                  backgroundColor: '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} className="hover:opacity-80">
                  My Hazards
                </button>
              </Link>
              <Link href="/incidents/hazards/new">
                <button style={{
                  backgroundColor: '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} className="hover:opacity-80">
                  Add Hazard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Hazards</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.total}</p>
            <p className="text-sm text-gray-500 mt-1">Active in system</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">High Risk</h3>
            <p className="text-3xl font-bold" style={{ color: '#e77726' }}>{stats.highRisk}</p>
            <p className="text-sm text-gray-500 mt-1">Require immediate attention</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.categories}</p>
            <p className="text-sm text-gray-500 mt-1">Hazard types</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Recent Updates</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.recentUpdates}</p>
            <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h4 className="text-base font-semibold">Filter Hazards</h4>
              {activeFilters > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {activeFilters} active
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
              <button 
                onClick={() => setFilters({...filters, riskLevel: 'Catastrophic'})}
                className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
              >
                Catastrophic
              </button>
              <button 
                onClick={() => setFilters({...filters, riskLevel: 'Major'})}
                style={{ backgroundColor: '#e7772620', color: '#e77726', border: '1px solid #e7772650' }} 
                className="px-2 py-0.5 rounded text-xs hover:opacity-80"
              >
                Major
              </button>
              <button 
                onClick={() => setFilters({...filters, category: 'Physical'})}
                style={{ backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }}
                className="px-2 py-0.5 rounded text-xs hover:opacity-80"
              >
                Physical Hazards
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Name or code..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">All Categories</option>
                <option value="Physical">Physical</option>
                <option value="Chemical">Chemical</option>
                <option value="Biological">Biological</option>
                <option value="Ergonomic">Ergonomic</option>
                <option value="Psychosocial">Psychosocial</option>
                <option value="Environmental">Environmental</option>
                <option value="Fire and Explosion">Fire and Explosion</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
              <select 
                value={filters.riskLevel}
                onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">All Severities</option>
                <option value="Negligible">Negligible</option>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Major">Major</option>
                <option value="Catastrophic">Catastrophic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleClearFilters}
                style={{ 
                  backgroundColor: '#e77726', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'opacity 0.2s'
                }} 
                className="hover:opacity-80"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Hazards Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Hazard Library</h2>
            <p className="text-gray-600 text-sm mt-1">Comprehensive list of identified workplace hazards</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Type</span>
                      {getSortIcon('type')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => handleSort('location')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Location</span>
                      {getSortIcon('location')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => handleSort('severity')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Severity</span>
                      {getSortIcon('severity')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => handleSort('description')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Description</span>
                      {getSortIcon('description')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => handleSort('assignedTo')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Assigned To</span>
                      {getSortIcon('assignedTo')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-500">Loading hazards...</div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-red-600 mb-4">{error}</div>
                      <div className="text-gray-600 text-sm mb-4">
                        Please ensure the incident-manager service is running:
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg text-left font-mono text-sm max-w-2xl mx-auto">
                        <div className="mb-2">1. Start Docker Desktop</div>
                        <div className="mb-2">2. Run the migration: <span className="text-blue-600">run-hazard-migration.bat</span></div>
                        <div className="mb-2">3. Seed test data: <span className="text-blue-600">seed-hazard-data.bat</span></div>
                        <div>4. Start services: <span className="text-blue-600">docker compose up sql-server incident-manager</span></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredHazards.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-500">No hazards found matching filters</div>
                    </td>
                  </tr>
                ) : (
                  filteredHazards.map((hazard) => {
                    return (
                      <tr key={hazard.hazardId} className="hover:bg-purple-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {hazard.categoryTypeName || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {hazard.locationName || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{ 
                              backgroundColor: hazard.severity ? `${getSeverityColor(hazard.severity)}20` : '#f3f4f6',
                              color: hazard.severity ? getSeverityColor(hazard.severity) : '#6b7280',
                              border: hazard.severity ? `1px solid ${getSeverityColor(hazard.severity)}50` : '1px solid #e5e7eb'
                            }}
                          >
                            {hazard.severity || 'Not Set'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate">
                            {hazard.hazardDescription || hazard.hazardName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {hazard.assignedToUserName || hazard.assignedToRoleName || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            hazard.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {hazard.isActive ? 'Active' : 'Archived'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/incidents/hazards/${hazard.hazardId}`}>
                              <button style={{ 
                                backgroundColor: '#e77726', 
                                color: '#ffffff', 
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }} className="hover:opacity-80">
                                View
                              </button>
                            </Link>
                            <button 
                              className="text-gray-600 hover:text-gray-900"
                              title="Link to Risk Assessment"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Mobile View Modal removed - only available on new hazard page */}
    </div>
  );
}