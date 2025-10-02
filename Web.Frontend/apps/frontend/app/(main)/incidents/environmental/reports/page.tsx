"use client";

import React, { useState, useRef } from "react";
import { Line, Bar, Pie, Doughnut, Area } from 'react-chartjs-2';
import CorrectiveActionsChart from '@/components/charts/CorrectiveActionsChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EnvironmentalReportsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3months');
  const [selectedLayout, setSelectedLayout] = useState('grid');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedOrgGroup, setSelectedOrgGroup] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const chartRefs = useRef({});

  // Mock data for locations and organization groups
  const mockLocations = [
    { id: 'all', name: 'All Locations' },
    { id: 'hq', name: 'Headquarters - London' },
    { id: 'factory-1', name: 'Manufacturing Plant - Birmingham' },
    { id: 'factory-2', name: 'Manufacturing Plant - Manchester' },
    { id: 'warehouse-1', name: 'Distribution Center - Leeds' },
    { id: 'office-1', name: 'Regional Office - Edinburgh' }
  ];

  const mockOrgGroups = [
    { id: 'all', name: 'All Departments' },
    { id: 'operations', name: 'Operations' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'logistics', name: 'Logistics & Distribution' },
    { id: 'facilities', name: 'Facilities Management' },
    { id: 'admin', name: 'Administration' }
  ];

  // Mock data based on our environmental system
  const mockObjectives = [
    { id: 1, title: 'Reduce Energy Consumption', target: 1000, current: 850, unit: 'kWh', deadline: '2024-12-31' },
    { id: 2, title: 'Water Conservation', target: 500, current: 420, unit: 'litres', deadline: '2024-11-30' },
    { id: 3, title: 'Waste Reduction', target: 200, current: 180, unit: 'kg', deadline: '2024-10-31' },
    { id: 4, title: 'CO2 Emissions', target: 50, current: 45, unit: 'tonnes', deadline: '2024-12-31' }
  ];

  const mockIncidentData = [
    { month: 'Jan', spills: 3, emissions: 2, waste: 1, water: 2, total: 8 },
    { month: 'Feb', spills: 2, emissions: 3, waste: 2, water: 1, total: 8 },
    { month: 'Mar', spills: 1, emissions: 1, waste: 3, water: 2, total: 7 },
    { month: 'Apr', spills: 4, emissions: 2, waste: 1, water: 1, total: 8 },
    { month: 'May', spills: 2, emissions: 1, waste: 2, water: 3, total: 8 },
    { month: 'Jun', spills: 1, emissions: 2, waste: 1, water: 2, total: 6 }
  ];

  const mockAspectImpactData = {
    Normal: { count: 45, avgScore: 12, highRisk: 8 },
    Abnormal: { count: 23, avgScore: 18, highRisk: 12 },
    Emergency: { count: 8, avgScore: 25, highRisk: 6 }
  };

  const mockObjectiveProgress = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: [1000, 950, 920, 880, 860, 850],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Target Line',
        data: [1000, 958, 917, 875, 833, 792],
        borderColor: 'rgb(239, 68, 68)',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false
      }
    ]
  };

  const riskTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'High Risk Aspects',
        data: [12, 15, 8, 18, 10, 14],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Medium Risk Aspects',
        data: [25, 22, 28, 20, 26, 24],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Low Risk Aspects',
        data: [35, 40, 42, 38, 45, 43],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const incidentTypeDistribution = {
    labels: ['Oil/Fuel Spill', 'Chemical Spill', 'Waste Storage', 'Air Emission', 'Water Quality', 'Other'],
    datasets: [{
      data: [25, 15, 20, 18, 12, 10],
      backgroundColor: [
        '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const complianceScoreData = {
    labels: ['Legislation', 'Severity', 'Amount', 'Interested Parties', 'Cost Benefit', 'Overall'],
    datasets: [{
      label: 'Compliance Score (%)',
      data: [95, 88, 92, 85, 90, 90],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 2
    }]
  };

  const exportChart = (chartId, filename) => {
    const chart = chartRefs.current[chartId];
    if (chart) {
      const url = chart.toBase64Image();
      const link = document.createElement('a');
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleChartClick = (event, elements, chartType, data) => {
    if (elements.length > 0) {
      const clickedElement = elements[0];
      const label = data.labels[clickedElement.index];
      const value = data.datasets[clickedElement.datasetIndex]?.data[clickedElement.index];

      // Navigate to detailed view or show modal with more information
      console.log(`Clicked on ${chartType}: ${label} - Value: ${value}`);
      // Here you would implement navigation or modal showing detailed data
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    onClick: (event, elements) => handleChartClick(event, elements, 'chart', {}),
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      }
    },
    onClick: (event, elements) => handleChartClick(event, elements, 'incident-distribution', incidentTypeDistribution)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Environmental Reports Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Analytics, KPIs, and insights from environmental data</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                  showAdvancedFilters
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Advanced Filters
              </button>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
                <option value="custom">Custom Date Range</option>
              </select>
              <select
                value={selectedLayout}
                onChange={(e) => setSelectedLayout(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="grid">Grid Layout</option>
                <option value="list">List Layout</option>
                <option value="full">Full Width</option>
              </select>
              <button 
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-opacity hover:opacity-80 flex-1 sm:flex-none"
                style={{ backgroundColor: '#3d3a72' }}
              >
                Export All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {mockLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization Group Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={selectedOrgGroup}
                  onChange={(e) => setSelectedOrgGroup(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {mockOrgGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Start Date */}
              {selectedTimeRange === 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  {/* Custom End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </>
              )}

              {/* Apply Filters Button */}
              <div className={`flex ${selectedTimeRange === 'custom' ? 'col-span-1 md:col-span-2 lg:col-span-4' : 'col-span-1 md:col-span-2'} items-end`}>
                <button
                  onClick={() => {
                    // Apply filters logic would go here
                    console.log('Applying filters:', {
                      location: selectedLocation,
                      orgGroup: selectedOrgGroup,
                      timeRange: selectedTimeRange,
                      customStartDate,
                      customEndDate
                    });
                  }}
                  style={{ 
                    backgroundColor: '#3d3a72', 
                    color: '#ffffff', 
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: '6px',
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
                  onClick={() => {
                    setSelectedLocation('all');
                    setSelectedOrgGroup('all');
                    setSelectedTimeRange('3months');
                    setCustomStartDate('');
                    setCustomEndDate('');
                  }}
                  style={{ 
                    backgroundColor: '#e77726', 
                    color: '#ffffff', 
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'opacity 0.2s',
                    marginLeft: '12px'
                  }}
                  className="hover:opacity-80"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedLocation !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {mockLocations.find(l => l.id === selectedLocation)?.name}
                  <button
                    onClick={() => setSelectedLocation('all')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedOrgGroup !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {mockOrgGroups.find(g => g.id === selectedOrgGroup)?.name}
                  <button
                    onClick={() => setSelectedOrgGroup('all')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedTimeRange === 'custom' && customStartDate && customEndDate && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {customStartDate} to {customEndDate}
                  <button
                    onClick={() => {
                      setCustomStartDate('');
                      setCustomEndDate('');
                      setSelectedTimeRange('3months');
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Report Type Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 lg:px-12 xl:px-16">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
            {[
              { id: 'all', label: 'All Reports' },
              { id: 'objectives', label: 'Objectives & KPIs' },
              { id: 'incidents', label: 'Incidents & Trends' },
              { id: 'aspects', label: 'Environmental Assessments Trends' },
              { id: 'actions', label: 'Corrective & Preventive Actions' },
              { id: 'compliance', label: 'Compliance' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedReportType(tab.id)}
                className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedReportType === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 lg:px-12 xl:px-16 space-y-4 sm:space-y-6">

        {/* Key Insights & Action Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Key Insights & Action Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">High Priority</h4>
              <p className="text-sm text-red-700">
                Energy consumption objective behind target by 15%. Consider implementing additional energy-saving measures.
              </p>
              <button className="text-xs text-red-600 hover:text-red-800 mt-2 underline">
                View Detailed Analysis →
              </button>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">Trending</h4>
              <p className="text-sm text-yellow-700">
                Spill incidents increased by 25% this month. Review containment procedures and training.
              </p>
              <button className="text-xs text-yellow-600 hover:text-yellow-800 mt-2 underline">
                View Incident Details →
              </button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Success</h4>
              <p className="text-sm text-green-700">
                Waste reduction objective ahead of schedule. Consider setting more ambitious targets.
              </p>
              <button className="text-xs text-green-600 hover:text-green-800 mt-2 underline">
                Update Objectives →
              </button>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockObjectives.map((objective) => {
            const progress = Math.round((objective.current / objective.target) * 100);
            const isOnTrack = progress >= 80;
            return (
              <div key={objective.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm sm:text-base font-medium text-gray-700">{objective.title}</h3>
                  <button
                    onClick={() => exportChart(`kpi-${objective.id}`, objective.title.replace(/\s+/g, '-').toLowerCase())}
                    className="text-gray-400 hover:text-gray-600"
                    title="Export"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    Export
                  </button>
                </div>
                <div className="mb-2">
                  <div className="flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>{objective.current}</span>
                    <span className="text-sm text-gray-500 ml-1">/ {objective.target} {objective.unit}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className={isOnTrack ? 'text-green-600' : 'text-red-600'}>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: '#3d3a72'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Due: {new Date(objective.deadline).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className={`grid gap-6 ${
          selectedLayout === 'grid' ? 'grid-cols-1 lg:grid-cols-2' :
          selectedLayout === 'list' ? 'grid-cols-1' :
          'grid-cols-1'
        }`}>

          {/* Objective Progress Chart */}
          {(selectedReportType === 'all' || selectedReportType === 'objectives') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Objective Progress Tracking</h3>
                <button
                  onClick={() => exportChart('objective-progress', 'objective-progress')}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#3d3a72' }}
                >
                  Export PNG
                </button>
              </div>
              <div className="h-80">
                <Line
                  ref={(ref) => chartRefs.current['objective-progress'] = ref}
                  data={mockObjectiveProgress}
                  options={{
                    ...chartOptions,
                    onClick: (event, elements) => handleChartClick(event, elements, 'objective-progress', mockObjectiveProgress)
                  }}
                />
              </div>
            </div>
          )}

          {/* Risk Trend Analysis */}
          {(selectedReportType === 'all' || selectedReportType === 'aspects') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Environmental Assessments Trends</h3>
                <button
                  onClick={() => exportChart('risk-trends', 'risk-trends')}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#3d3a72' }}
                >
                  Export PNG
                </button>
              </div>
              <div className="h-80">
                <Line
                  ref={(ref) => chartRefs.current['risk-trends'] = ref}
                  data={riskTrendData}
                  options={{
                    ...chartOptions,
                    onClick: (event, elements) => handleChartClick(event, elements, 'risk-trends', riskTrendData)
                  }}
                />
              </div>
            </div>
          )}

          {/* Incident Type Distribution */}
          {(selectedReportType === 'all' || selectedReportType === 'incidents') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Incident Type Distribution</h3>
                <button
                  onClick={() => exportChart('incident-distribution', 'incident-distribution')}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#3d3a72' }}
                >
                  Export PNG
                </button>
              </div>
              <div className="h-80">
                <Pie
                  ref={(ref) => chartRefs.current['incident-distribution'] = ref}
                  data={incidentTypeDistribution}
                  options={pieOptions}
                />
              </div>
            </div>
          )}

          {/* Compliance Scores */}
          {(selectedReportType === 'all' || selectedReportType === 'compliance') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Compliance Scores by Category</h3>
                <button
                  onClick={() => exportChart('compliance-scores', 'compliance-scores')}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#3d3a72' }}
                >
                  Export PNG
                </button>
              </div>
              <div className="h-80">
                <Bar
                  ref={(ref) => chartRefs.current['compliance-scores'] = ref}
                  data={complianceScoreData}
                  options={{
                    ...chartOptions,
                    onClick: (event, elements) => handleChartClick(event, elements, 'compliance-scores', complianceScoreData)
                  }}
                />
              </div>
            </div>
          )}

          {/* Monthly Incident Trends */}
          {(selectedReportType === 'all' || selectedReportType === 'incidents') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Monthly Incident Trends</h3>
                <button
                  onClick={() => exportChart('monthly-incidents', 'monthly-incidents')}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#3d3a72' }}
                >
                  Export PNG
                </button>
              </div>
              <div className="h-80">
                <Bar
                  ref={(ref) => chartRefs.current['monthly-incidents'] = ref}
                  data={{
                    labels: mockIncidentData.map(d => d.month),
                    datasets: [
                      {
                        label: 'Spills',
                        data: mockIncidentData.map(d => d.spills),
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                      },
                      {
                        label: 'Emissions',
                        data: mockIncidentData.map(d => d.emissions),
                        backgroundColor: 'rgba(245, 158, 11, 0.8)',
                      },
                      {
                        label: 'Waste',
                        data: mockIncidentData.map(d => d.waste),
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                      },
                      {
                        label: 'Water',
                        data: mockIncidentData.map(d => d.water),
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                      }
                    ]
                  }}
                  options={{
                    ...chartOptions,
                    onClick: (event, elements) => {
                      if (elements.length > 0) {
                        const monthIndex = elements[0].index;
                        const month = mockIncidentData[monthIndex].month;
                        console.log(`Clicked on month: ${month}`, mockIncidentData[monthIndex]);
                        // Navigate to detailed monthly view
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Aspect Impact Summary */}
          {(selectedReportType === 'all' || selectedReportType === 'aspects') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Aspect & Impact Analysis Summary</h3>
                <button
                  onClick={() => exportChart('aspect-summary', 'aspect-summary')}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#3d3a72' }}
                >
                  Export PNG
                </button>
              </div>
              <div className="h-80">
                <Doughnut
                  ref={(ref) => chartRefs.current['aspect-summary'] = ref}
                  data={{
                    labels: ['Normal Operations', 'Abnormal Operations', 'Emergency Operations'],
                    datasets: [{
                      data: [
                        mockAspectImpactData.Normal.count,
                        mockAspectImpactData.Abnormal.count,
                        mockAspectImpactData.Emergency.count
                      ],
                      backgroundColor: ['#22c55e', '#f97316', '#ef4444'],
                      borderWidth: 2,
                      borderColor: '#ffffff'
                    }]
                  }}
                  options={{
                    ...pieOptions,
                    onClick: (event, elements) => {
                      if (elements.length > 0) {
                        const conditionIndex = elements[0].index;
                        const conditions = ['Normal', 'Abnormal', 'Emergency'];
                        const condition = conditions[conditionIndex];
                        console.log(`Clicked on ${condition} operations`, mockAspectImpactData[condition]);
                        // Navigate to aspect & impact analysis filtered by condition
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Corrective & Preventive Actions Chart */}
          {(selectedReportType === 'all' || selectedReportType === 'actions') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Corrective & Preventive Actions</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Real-time action tracking and status monitoring</span>
                    <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded transition-opacity hover:opacity-80" style={{ backgroundColor: '#3d3a72' }}>
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <CorrectiveActionsChart className="border-0 shadow-none rounded-none" />
              </div>
            </div>
          )}

        </div>


      </div>
    </div>
  );
}