'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HAZARD_SEVERITY_LEVELS, getSeverityColor, getSeverityBadgeColor } from '@/types/hazard.types';

interface Hazard {
  hazardId: number;
  hazardName: string;
  hazardDescription: string;
  locationName?: string;
  severity?: string;
  status: string;
  reportedByName?: string;
  assignedToUserName?: string;
  assignedToRoleName?: string;
  createdAt: string;
  updatedAt: string;
  categoryName?: string;
}

export default function MyHazardsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'assigned' | 'reported'>('assigned');
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [filteredHazards, setFilteredHazards] = useState<Hazard[]>([]);
  const [latestHazard, setLatestHazard] = useState<Hazard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    severity: '',
    status: '',
    category: '',
    location: '',
    dateRange: '30days'
  });

  // Stats for the page
  const [stats, setStats] = useState({
    totalAssigned: 0,
    criticalCount: 0,
    pendingReview: 0,
    totalReported: 0
  });

  useEffect(() => {
    fetchHazards();
  }, [activeTab]);

  const fetchHazards = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === 'assigned'
        ? '/api/hazards?assignedToMe=true'
        : '/api/hazards?reportedByMe=true';

      try {
        const response = await fetch(endpoint, {
          headers: {
            'x-user-id': '1',
            'x-user-area-id': '1'
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setHazards(result.data);
            setFilteredHazards(result.data);

            // Set latest hazard for "My Hazards" tab
            if (activeTab === 'assigned' && result.data.length > 0) {
              // Sort by createdAt to get the most recent
              const sorted = [...result.data].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
              setLatestHazard(sorted[0]);
            } else {
              setLatestHazard(null);
          }
          
            // Calculate stats
            calculateStats(result.data);
          }
        }
      } catch (apiError) {
        console.warn('API failed, using mock data:', apiError);

        // Use mock data when API fails
        const mockData: Hazard[] = activeTab === 'assigned' ? [
          {
            hazardId: 101,
            hazardName: 'Broken ladder in storage',
            hazardDescription: 'Third rung is cracked and unsafe for use',
            locationName: 'Storage Room A',
            severity: 'High',
            status: 'In Progress',
            reportedByName: 'Emma Wilson',
            assignedToUserName: 'You',
            assignedToRoleName: null,
            categoryName: 'Equipment',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            hazardId: 102,
            hazardName: 'Chemical spill area',
            hazardDescription: 'Floor still slippery after cleanup attempt',
            locationName: 'Lab 2',
            severity: 'Critical',
            status: 'Open',
            reportedByName: 'David Chen',
            assignedToUserName: 'You',
            assignedToRoleName: null,
            categoryName: 'Chemical',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
          },
          {
            hazardId: 103,
            hazardName: 'Fire extinguisher expired',
            hazardDescription: 'Last inspection date was 2 years ago',
            locationName: 'Office Floor 3',
            severity: 'Medium',
            status: 'Pending Review',
            reportedByName: 'Lisa Park',
            assignedToUserName: 'You',
            assignedToRoleName: null,
            categoryName: 'Fire Safety',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          }
        ] : [
          {
            hazardId: 201,
            hazardName: 'Damaged floor tiles',
            hazardDescription: 'Multiple tiles are cracked creating trip hazard',
            locationName: 'Reception Area',
            severity: 'Medium',
            status: 'Open',
            reportedByName: 'You',
            assignedToUserName: 'Mike Thompson',
            assignedToRoleName: null,
            categoryName: 'Structural',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            hazardId: 202,
            hazardName: 'Poor lighting in stairwell',
            hazardDescription: 'Two light bulbs are not working',
            locationName: 'East Stairwell',
            severity: 'Low',
            status: 'Resolved',
            reportedByName: 'You',
            assignedToUserName: 'Facilities Team',
            assignedToRoleName: 'Maintenance',
            categoryName: 'Electrical',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        setHazards(mockData);
        setFilteredHazards(mockData);

        if (activeTab === 'assigned' && mockData.length > 0) {
          setLatestHazard(mockData[0]);
        } else {
          setLatestHazard(null);
        }

        calculateStats(mockData);
      }
    } catch (error) {
      console.error('Failed to fetch hazards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (hazardData: Hazard[]) => {
    const stats = {
      totalAssigned: hazardData.filter(h => h.assignedToUserName).length,
      criticalCount: hazardData.filter(h => h.severity === 'Critical' || h.severity === 'High').length,
      pendingReview: hazardData.filter(h => h.status === 'Open' || h.status === 'In Progress').length,
      totalReported: hazardData.length
    };
    setStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...hazards];
    
    if (filters.severity) {
      filtered = filtered.filter(h => h.severity === filters.severity);
    }
    
    if (filters.status) {
      filtered = filtered.filter(h => h.status === filters.status);
    }
    
    if (filters.category) {
      filtered = filtered.filter(h => h.categoryName === filters.category);
    }
    
    if (filters.location) {
      filtered = filtered.filter(h => h.locationName?.includes(filters.location));
    }
    
    setFilteredHazards(filtered);
  };

  const clearFilters = () => {
    setFilters({
      severity: '',
      status: '',
      category: '',
      location: '',
      dateRange: '30days'
    });
    setFilteredHazards(hazards);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const HazardCard = ({ hazard, isLatest = false }: { hazard: Hazard; isLatest?: boolean }) => (
    <div 
      className={`bg-white rounded-lg shadow-sm border ${isLatest ? 'border-purple-300 bg-purple-50' : 'border-gray-200'} p-6 hover:shadow-md transition-shadow cursor-pointer`}
      onClick={() => router.push(`/incidents/hazards/${hazard.hazardId}`)}
    >
      {isLatest && (
        <div className="mb-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#3d3a72', color: '#ffffff' }}>
            Latest Hazard
          </span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{hazard.hazardName}</h3>
          <p className="text-sm text-gray-600 mt-1">{hazard.hazardDescription}</p>
        </div>
        <div className="flex gap-2">
          {hazard.severity && (
            <span 
              className={`px-2 py-1 text-xs font-medium rounded ${getSeverityBadgeColor(hazard.severity)}`}
            >
              {hazard.severity}
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeClass(hazard.status)}`}>
            {hazard.status}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-medium">{hazard.locationName || 'Not specified'}</p>
        </div>
        <div>
          <p className="text-gray-500">Category</p>
          <p className="font-medium">{hazard.categoryName || 'General'}</p>
        </div>
        <div>
          <p className="text-gray-500">{activeTab === 'assigned' ? 'Reported By' : 'Assigned To'}</p>
          <p className="font-medium">
            {activeTab === 'assigned' 
              ? hazard.reportedByName || 'Unknown'
              : hazard.assignedToUserName || hazard.assignedToRoleName || 'Unassigned'
            }
          </p>
        </div>
        <div>
          <p className="text-gray-500">Date</p>
          <p className="font-medium">{formatDate(hazard.createdAt)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>My Hazards</h1>
              <p className="text-gray-600 mt-1">View hazards assigned to you and hazards you've reported</p>
            </div>
            <div className="flex gap-3">
              <Link href="/incidents/hazards">
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
                  All Hazards
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
                  Report Hazard
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
            <h3 className="text-lg font-semibold mb-2">Assigned to Me</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.totalAssigned}</p>
            <p className="text-sm text-gray-500 mt-1">Active hazards</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Critical/High</h3>
            <p className="text-3xl font-bold" style={{ color: '#e77726' }}>{stats.criticalCount}</p>
            <p className="text-sm text-gray-500 mt-1">Require immediate attention</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Pending Review</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.pendingReview}</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting action</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Reported by Me</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.totalReported}</p>
            <p className="text-sm text-gray-500 mt-1">Total reported</p>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('assigned')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'assigned'
                    ? ''
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ 
                  borderBottomColor: activeTab === 'assigned' ? '#3d3a72' : 'transparent',
                  color: activeTab === 'assigned' ? '#3d3a72' : ''
                }}
              >
                My Hazards
                {stats.totalAssigned > 0 && (
                  <span className="ml-2 text-white text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#3d3a72' }}>
                    {stats.totalAssigned}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('reported')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'reported'
                    ? ''
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ 
                  borderBottomColor: activeTab === 'reported' ? '#3d3a72' : 'transparent',
                  color: activeTab === 'reported' ? '#3d3a72' : ''
                }}
              >
                My Reports
                {activeTab === 'reported' && stats.totalReported > 0 && (
                  <span className="ml-2 text-white text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#3d3a72' }}>
                    {stats.totalReported}
                  </span>
                )}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'assigned' ? (
              <div className="space-y-6">
                {/* Latest Hazard - Above Filters for My Hazards Tab */}
                {latestHazard && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Latest Hazard Assigned</h2>
                    <HazardCard hazard={latestHazard} isLatest={true} />
                  </div>
                )}

                {/* Filters Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <h4 className="text-base font-semibold">Filter Hazards</h4>
                      {Object.values(filters).filter(f => f).length > 0 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          {Object.values(filters).filter(f => f).length} active
                        </span>
                      )}
                    </div>
                    
                    {/* Quick Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
                      <button 
                        onClick={() => setFilters({ ...filters, severity: 'Critical' })}
                        className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
                      >
                        Critical
                      </button>
                      <button 
                        onClick={() => setFilters({ ...filters, severity: 'High' })}
                        className="px-2 py-0.5 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded text-xs hover:bg-yellow-200"
                      >
                        High Priority
                      </button>
                      <button 
                        onClick={() => setFilters({ ...filters, status: 'Open' })}
                        style={{ backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }}
                        className="px-2 py-0.5 rounded text-xs hover:opacity-80"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                      <select 
                        value={filters.severity}
                        onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="">All Severities</option>
                        {HAZARD_SEVERITY_LEVELS.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select 
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select 
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="">All Categories</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Fire Safety">Fire Safety</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Structural">Structural</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Environmental">Environmental</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                      <select 
                        value={filters.dateRange}
                        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
                        <option value="all">All time</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="pt-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={applyFilters}
                        style={{ 
                          backgroundColor: '#3d3a72', 
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
                        Apply Filters
                      </button>
                      
                      <button 
                        onClick={clearFilters}
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
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hazards List */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">All Assigned Hazards</h2>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <p className="text-gray-500 mt-2">Loading hazards...</p>
                    </div>
                  ) : filteredHazards.length > 0 ? (
                    <div className="space-y-4">
                      {filteredHazards.map((hazard, index) => (
                        <HazardCard key={hazard.hazardId || hazard.HazardID || index} hazard={hazard} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No hazards found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* My Reports Tab */
              <div className="space-y-6">
                {/* Filters Section for My Reports */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <h4 className="text-base font-semibold">Filter Reports</h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
                      <button 
                        onClick={() => setFilters({ ...filters, status: 'Open' })}
                        className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
                      >
                        Open
                      </button>
                      <button 
                        onClick={() => setFilters({ ...filters, status: 'Resolved' })}
                        className="px-2 py-0.5 bg-green-100 text-green-800 border border-green-200 rounded text-xs hover:bg-green-200"
                      >
                        Resolved
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select 
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                      <select 
                        value={filters.severity}
                        onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="">All Severities</option>
                        {HAZARD_SEVERITY_LEVELS.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assignment</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="">All</option>
                        <option value="assigned">Assigned</option>
                        <option value="unassigned">Unassigned</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                      <select 
                        value={filters.dateRange}
                        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
                        <option value="all">All time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={applyFilters}
                        style={{ 
                          backgroundColor: '#3d3a72', 
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
                        Apply Filters
                      </button>
                      
                      <button 
                        onClick={clearFilters}
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
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reports List */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Hazards Reported by Me</h2>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <p className="text-gray-500 mt-2">Loading reports...</p>
                    </div>
                  ) : filteredHazards.length > 0 ? (
                    <div className="space-y-4">
                      {filteredHazards.map((hazard, index) => (
                        <HazardCard key={hazard.hazardId || hazard.HazardID || index} hazard={hazard} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">You haven't reported any hazards yet</p>
                      <Link href="/incidents/hazards/new">
                        <button 
                          style={{ 
                            backgroundColor: '#3d3a72', 
                            color: '#ffffff', 
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'opacity 0.2s'
                          }} 
                          className="hover:opacity-80 mt-4"
                        >
                          Report Your First Hazard
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}