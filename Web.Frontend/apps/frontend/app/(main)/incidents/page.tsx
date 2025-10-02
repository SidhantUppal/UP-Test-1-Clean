"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

interface IncidentStatistics {
  total: number;
  open: number;
  underInvestigation: number;
  resolved: number;
  overdue: number;
  highRisk: number;
}

interface ManageIncident {
  incidentRef: string;
  additionalRef: string;
  formCompleted: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  location: string;
  personAffected: string;
  status: 'Open' | 'In Progress' | 'Under Investigation' | 'Closed';
}

export default function IncidentsHomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Show loading spinner initially
  const [statistics, setStatistics] = useState<IncidentStatistics>({
    total: 847,        // Total incidents recorded since system implementation
    open: 23,          // New incidents requiring immediate attention
    underInvestigation: 14,  // Active investigations in progress
    resolved: 789,     // Successfully resolved and closed incidents
    overdue: 8,        // Incidents past their target completion date
    highRisk: 17       // Critical and high severity incidents requiring priority attention
  });
  // Note: recentIncidents is now replaced with static data from manage page
  const [filters, setFilters] = useState({
    type: '',
    severity: '',
    status: '',
    location: '',
    dateRange: '30days'
  });

  useEffect(() => {
    loadIncidentsData();
  }, []);

  const loadIncidentsData = async () => {
    try {
      setLoading(true);

      // Simulate API call delay for realistic loading experience
      await new Promise(resolve => setTimeout(resolve, 800));

      // Realistic September 2025 incident statistics
      // This would normally come from API but using realistic dummy data
      const currentStats: IncidentStatistics = {
        total: 847,           // Accumulated since January 2024 - realistic for medium-large organization
        open: 23,             // New incidents reported in last 1-2 weeks needing assignment/action
        underInvestigation: 14, // Active investigations - mix of recent and complex cases
        resolved: 789,        // 93% resolution rate - good safety performance indicator
        overdue: 8,           // ~35% of open cases past due - indicates some resource constraints
        highRisk: 17          // ~7% high/critical severity - typical for good safety culture
      };

      setStatistics(currentStats);

      // Note: Recent incidents table now uses static data from manage page
      // In production, this would fetch latest 10 incidents via API

    } catch (error) {
      console.error('Error loading incidents data:', error);
      // Keep default dummy data on error
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      severity: '',
      status: '',
      location: '',
      dateRange: '30days'
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== '30days').length;

  // Handler functions - copied from incidents/manage page
  const handleViewIncident = (incidentRef: string) => {
    // Navigate to incident view page where user can view, edit, and investigate
    window.location.href = `/incidents/${incidentRef}/view`;
  };

  const handleCloseIncident = (incidentRef: string) => {
    if (confirm(`Are you sure you want to close incident ${incidentRef}?`)) {
      // In a real app, this would make an API call to update the incident status
      alert(`Incident ${incidentRef} has been closed.`);
      // Could refresh data or update state here
    }
  };

  // Chart data and options - updated to include September 2025
  const formsCompletedData = {
    labels: ['Oct 2023', 'Dec 2023', 'Feb 2024', 'Apr 2024', 'Jun 2024', 'Aug 2024', 'Oct 2024', 'Dec 2024', 'Feb 2025', 'Apr 2025', 'Jun 2025', 'Aug 2025', 'Sep 2025'],
    datasets: [
      {
        label: 'Accident Reports',
        data: [12, 8, 15, 18, 11, 9, 14, 16, 19, 13, 17, 21, 18], // Added Sep 2025: 18 reports
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Near Miss Reports',
        data: [25, 18, 32, 28, 22, 31, 27, 35, 29, 26, 33, 38, 34], // Added Sep 2025: 34 reports
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Dangerous Occurrences',
        data: [3, 2, 5, 4, 2, 3, 6, 4, 5, 3, 4, 7, 5], // Added Sep 2025: 5 occurrences
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3,
      }
    ],
  };

  const statusData = {
    labels: ['Open', 'Under Investigation', 'In Progress', 'Closed', 'Pending Review'],
    datasets: [
      {
        data: [23, 14, 0, 789, 21], // Updated to match current statistics (Sep 2025)
        backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const severityData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Number of Incidents',
        data: [12, 28, 156, 164], // Updated totals reflecting September 2025 data
        backgroundColor: ['#DC2626', '#F59E0B', '#3B82F6', '#10B981'],
        borderWidth: 1,
        borderColor: '#ffffff',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 11 },
        },
      },
      title: {
        display: true,
        text: 'Forms Completed (Oct 2023 - Sep 2025)',
        font: { size: 14, weight: 'bold' },
        color: '#374151'
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { font: { size: 10 } }
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 11 },
        },
      },
      title: {
        display: true,
        text: 'Current Status Distribution',
        font: { size: 14, weight: 'bold' },
        color: '#374151'
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Incident Severity Breakdown',
        font: { size: 14, weight: 'bold' },
        color: '#374151'
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { font: { size: 10 } }
      },
    },
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Investigation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Incident Management</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Report, investigate, and manage safety incidents</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link 
                href="/incidents/new" 
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  textDecoration: 'none',
                  display: 'inline-block',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }} 
                className="hover:opacity-80"
              >
                Report New Incident
              </Link>
              <Link 
                href="/incidents/dashboard" 
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  textDecoration: 'none',
                  display: 'inline-block',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }} 
                className="hover:opacity-80"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-6">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 text-center">
            <h3 className="text-base md:text-lg font-semibold mb-2">Total Incidents</h3>
            <p className="text-2xl md:text-3xl font-bold" style={{ color: '#3d3a72' }}>
              {loading ? '...' : statistics.total}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 text-center">
            <h3 className="text-base md:text-lg font-semibold mb-2">Open</h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">
              {loading ? '...' : statistics.open}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Requires action</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 text-center">
            <h3 className="text-base md:text-lg font-semibold mb-2">Investigating</h3>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">
              {loading ? '...' : statistics.underInvestigation}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">In progress</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 text-center">
            <h3 className="text-base md:text-lg font-semibold mb-2">Resolved</h3>
            <p className="text-2xl md:text-3xl font-bold text-green-600">
              {loading ? '...' : statistics.resolved}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Completed</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 text-center">
            <h3 className="text-base md:text-lg font-semibold mb-2">Overdue</h3>
            <p className="text-2xl md:text-3xl font-bold text-red-600">
              {loading ? '...' : statistics.overdue}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Need attention</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 text-center">
            <h3 className="text-base md:text-lg font-semibold mb-2">High Risk</h3>
            <p className="text-2xl md:text-3xl font-bold text-orange-600">
              {loading ? '...' : statistics.highRisk}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Critical/High</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/incidents/accident-report/new" className="block h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow h-full min-h-[120px] md:min-h-[140px] flex flex-col">
              <h3 className="text-base md:text-lg font-semibold mb-2">Accident Report</h3>
              <p className="text-sm md:text-base text-gray-600 flex-grow">Report workplace accidents and injuries</p>
            </div>
          </Link>

          <Link href="/incidents/tools/investigation" className="block h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow h-full min-h-[120px] md:min-h-[140px] flex flex-col">
              <h3 className="text-base md:text-lg font-semibold mb-2">Investigations</h3>
              <p className="text-sm md:text-base text-gray-600 flex-grow">Conduct and manage incident investigations</p>
            </div>
          </Link>

          <Link href="/incidents/near-miss/new" className="block h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow h-full min-h-[120px] md:min-h-[140px] flex flex-col">
              <h3 className="text-base md:text-lg font-semibold mb-2">Near Miss</h3>
              <p className="text-sm md:text-base text-gray-600 flex-grow">Report near miss incidents and hazards</p>
            </div>
          </Link>

          <Link href="/incidents/reports" className="block h-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow h-full min-h-[120px] md:min-h-[140px] flex flex-col">
              <h3 className="text-base md:text-lg font-semibold mb-2">Reports</h3>
              <p className="text-sm md:text-base text-gray-600 flex-grow">Generate incident reports and analytics</p>
            </div>
          </Link>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h4 className="text-base font-semibold">Filter Incidents</h4>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                  {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
              <button 
                onClick={() => handleFilterChange('severity', 'Critical')}
                className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
              >
                Critical
              </button>
              <button 
                onClick={() => handleFilterChange('severity', 'High')}
                className="px-3 py-1 bg-orange-100 text-orange-800 border border-orange-200 rounded text-xs hover:bg-orange-200"
              >
                High Severity
              </button>
              <button 
                onClick={() => handleFilterChange('status', 'Open')}
                className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded text-xs hover:bg-blue-200"
              >
                Open
              </button>
              <button 
                onClick={() => handleFilterChange('status', 'Under Investigation')}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded text-xs hover:bg-yellow-200"
              >
                Investigating
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search by incident reference, title, or person..." 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {/* Incident Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Accident">Accident</option>
                <option value="Near Miss">Near Miss</option>
                <option value="Dangerous Occurrence">Dangerous Occurrence</option>
                <option value="Environmental">Environmental</option>
                <option value="Security">Security</option>
                <option value="Property Damage">Property Damage</option>
              </select>
            </div>
            
            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
              >
                <option value="">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Main Office">Main Office</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Production Floor">Production Floor</option>
                <option value="Site A">Site A</option>
                <option value="Site B">Site B</option>
              </select>
            </div>
            
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="year">This year</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="filter-actions mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 sm:space-x-0">
              <button className="btn btn-sm text-white hover:opacity-80 w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-1 text-sm sm:text-xs" 
                style={{backgroundColor: '#3d3a72', borderRadius: '4px', transition: 'opacity 0.2s'}}>
                Apply Filters
              </button>
              <button className="btn btn-sm text-white hover:opacity-80 w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-1 text-sm sm:text-xs" 
                style={{backgroundColor: '#e77726', borderRadius: '4px', transition: 'opacity 0.2s'}} 
                onClick={clearFilters}>
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Last 10 Reported Incidents Table - Duplicated from /incidents/manage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Last 10 Reported Incidents</h3>
            <p className="text-sm text-gray-600 mt-1">Most recently reported incident cases requiring attention</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Additional Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form Completed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Person Affected
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    incidentRef: 'INC-2025-089',
                    additionalRef: 'HSE-2025-0089',
                    formCompleted: '25/09/2025 14:45',
                    severity: 'Medium',
                    location: 'Construction Yard',
                    personAffected: 'N/A',
                    status: 'Open'
                  },
                  {
                    incidentRef: 'INC-2025-088',
                    additionalRef: 'ACC-2025-0088',
                    formCompleted: '24/09/2025 11:20',
                    severity: 'Low',
                    location: 'Packaging Department',
                    personAffected: 'Michael Thompson',
                    status: 'In Progress'
                  },
                  {
                    incidentRef: 'INC-2025-087',
                    additionalRef: 'DOC-2025-0087',
                    formCompleted: '23/09/2025 16:15',
                    severity: 'High',
                    location: 'Laboratory 2',
                    personAffected: 'David Chang',
                    status: 'Under Investigation'
                  },
                  {
                    incidentRef: 'INC-2025-086',
                    additionalRef: 'ACC-2025-0086',
                    formCompleted: '22/09/2025 12:30',
                    severity: 'Medium',
                    location: 'Staff Canteen',
                    personAffected: 'Lisa Parker',
                    status: 'Closed'
                  },
                  {
                    incidentRef: 'INC-2025-085',
                    additionalRef: 'NMR-2025-0085',
                    formCompleted: '21/09/2025 08:45',
                    severity: 'Low',
                    location: 'Loading Dock A',
                    personAffected: 'N/A',
                    status: 'In Progress'
                  },
                  {
                    incidentRef: 'INC-2025-084',
                    additionalRef: 'ACC-2025-0084',
                    formCompleted: '20/09/2025 15:10',
                    severity: 'Medium',
                    location: 'Grinding Workshop',
                    personAffected: 'Mark Stevens',
                    status: 'Open'
                  },
                  {
                    incidentRef: 'INC-2025-083',
                    additionalRef: 'NMR-2025-0083',
                    formCompleted: '19/09/2025 10:30',
                    severity: 'Low',
                    location: 'Maintenance Area',
                    personAffected: 'N/A',
                    status: 'Closed'
                  },
                  {
                    incidentRef: 'INC-2025-082',
                    additionalRef: 'DOC-2025-0082',
                    formCompleted: '18/09/2025 14:00',
                    severity: 'Critical',
                    location: 'Building A',
                    personAffected: 'Multiple',
                    status: 'Under Investigation'
                  },
                  {
                    incidentRef: 'INC-2025-081',
                    additionalRef: 'ACC-2025-0081',
                    formCompleted: '17/09/2025 09:25',
                    severity: 'Low',
                    location: 'Office Floor 2',
                    personAffected: 'Kevin Brown',
                    status: 'Closed'
                  },
                  {
                    incidentRef: 'INC-2025-080',
                    additionalRef: 'NMR-2025-0080',
                    formCompleted: '16/09/2025 13:40',
                    severity: 'Medium',
                    location: 'Warehouse C',
                    personAffected: 'N/A',
                    status: 'In Progress'
                  }
                ].map((incident) => (
                  <tr key={incident.incidentRef} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {incident.incidentRef}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.additionalRef}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {incident.formCompleted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        incident.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {incident.personAffected}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewIncident(incident.incidentRef)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          title="View, edit and investigate incident"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        {incident.status !== 'Closed' && (
                          <button
                            onClick={() => handleCloseIncident(incident.incidentRef)}
                            className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            title="Close incident case"
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Charts - Duplicated from incidents/manage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Forms Completed Over Time */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-80">
              <Line data={formsCompletedData} options={lineOptions} />
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-80">
              <Doughnut data={statusData} options={doughnutOptions} />
            </div>
          </div>

          {/* Severity Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-80">
              <Bar data={severityData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}