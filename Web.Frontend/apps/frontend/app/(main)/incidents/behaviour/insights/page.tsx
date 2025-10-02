"use client";

import { useState } from 'react';

// Mock data for charts
const mockCategoryData = [
  { name: 'Intervention', value: 156, percentage: 22 },
  { name: 'Quick Training', value: 134, percentage: 19 },
  { name: 'Save', value: 78, percentage: 11 },
  { name: 'Hazard', value: 145, percentage: 21 },
  { name: 'Near Miss', value: 98, percentage: 14 },
  { name: 'Good Behavior', value: 89, percentage: 13 }
];

const mockTrendData = [
  { week: 'W1', reports: 145, points: 2150 },
  { week: 'W2', reports: 168, points: 2480 },
  { week: 'W3', reports: 152, points: 2290 },
  { week: 'W4', reports: 189, points: 2870 },
  { week: 'W5', reports: 176, points: 2650 },
  { week: 'W6', reports: 198, points: 3120 }
];

const mockDepartmentData = [
  { department: 'Warehouse', reports: 245, participation: 82, topCategory: 'Hazard' },
  { department: 'Production', reports: 189, participation: 76, topCategory: 'Intervention' },
  { department: 'Office', reports: 67, participation: 54, topCategory: 'Good Behavior' },
  { department: 'Maintenance', reports: 134, participation: 91, topCategory: 'Near Miss' },
  { department: 'Shipping', reports: 98, participation: 68, topCategory: 'Save' }
];

const mockTopReporters = [
  { name: 'John Smith', points: 580, reports: 34, badge: '🏆' },
  { name: 'Sarah Johnson', points: 520, reports: 28, badge: '🥈' },
  { name: 'Mike Chen', points: 475, reports: 31, badge: '🥉' },
  { name: 'Emily Davis', points: 420, reports: 25, badge: '' },
  { name: 'Robert Taylor', points: 390, reports: 22, badge: '' }
];

const mockLocationHeatmap = [
  { location: 'Loading Bay', incidents: 45, risk: 'high' },
  { location: 'Production Line 1', incidents: 32, risk: 'medium' },
  { location: 'Warehouse A', incidents: 28, risk: 'medium' },
  { location: 'Chemical Storage', incidents: 18, risk: 'high' },
  { location: 'Office Floor 2', incidents: 12, risk: 'low' },
  { location: 'Parking Lot', incidents: 15, risk: 'low' }
];

export default function InsightsPage() {
  const [dateRange, setDateRange] = useState('30days');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Behavioural Insights</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Analytics and trends from safety observations</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
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
                className="hover:opacity-80"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12 xl:px-16 space-y-6">
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Total Reports</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>1,247</p>
            <p className="text-xs sm:text-sm text-green-600 mt-1">↑ 12% from last period</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Active Users</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>234</p>
            <p className="text-xs sm:text-sm text-green-600 mt-1">↑ 8% from last period</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Saves</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>78</p>
            <p className="text-xs sm:text-sm text-green-600 mt-1">Incidents prevented</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Response Time</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>45m</p>
            <p className="text-xs sm:text-sm text-yellow-600 mt-1">Average to action</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Participation</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>76%</p>
            <p className="text-xs sm:text-sm text-green-600 mt-1">↑ 5% from last period</p>
          </div>
        </div>

        {/* Two Column Layout for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Category Distribution</h2>
            <div className="space-y-3">
              {mockCategoryData.map((category) => (
                <div key={category.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                    <span className="text-xs sm:text-sm font-medium w-20 sm:w-28">{category.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-5 sm:h-6 relative">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full bg-purple-500"
                        style={{ width: `${category.percentage}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {category.value}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 ml-0 sm:ml-3 text-right">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Weekly Trend</h2>
            <div className="flex items-end justify-between h-32 sm:h-48 mt-6 sm:mt-8">
              {mockTrendData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full">
                    <div 
                      className="w-full bg-purple-500 rounded-t mx-auto"
                      style={{ 
                        height: `${(data.reports / 200) * 150}px`,
                        minHeight: '20px'
                      }}
                    />
                    <div 
                      className="w-full bg-purple-300 rounded-t mx-auto mt-1"
                      style={{ 
                        height: `${(data.points / 3500) * 150}px`,
                        minHeight: '10px'
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{data.week}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2" />
                <span className="text-xs text-gray-600">Reports</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-300 rounded mr-2" />
                <span className="text-xs text-gray-600">Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold">Department Analysis</h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">Performance by department</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Reports</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participation Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockDepartmentData.map((dept) => (
                  <tr key={dept.department} className="hover:bg-purple-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.reports}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{dept.participation}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${dept.participation}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.topCategory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-green-600">↑ Improving</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column - Leaderboard and Location Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Top Reporters Leaderboard */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Top Reporters This Month</h2>
            <div className="space-y-3">
              {mockTopReporters.map((reporter, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-lg sm:text-2xl">{reporter.badge || `${index + 1}`}</span>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{reporter.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{reporter.reports} reports</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-semibold text-purple-600">{reporter.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Risk Heatmap */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Location Risk Analysis</h2>
            <div className="space-y-3">
              {mockLocationHeatmap.map((location) => (
                <div key={location.location} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                    <span className={`w-3 h-3 rounded-full ${
                      location.risk === 'high' ? 'bg-red-500' :
                      location.risk === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <span className="text-xs sm:text-sm font-medium flex-1">{location.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-5 sm:ml-0">
                    <span className="text-xs sm:text-sm text-gray-500">{location.incidents} reports</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      location.risk === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                      location.risk === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      'bg-green-100 text-green-800 border border-green-200'
                    }`}>
                      {location.risk.charAt(0).toUpperCase() + location.risk.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Correlation Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Risk Correlation Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
              <p className="text-xl sm:text-2xl font-bold text-green-600">-47%</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">Incident reduction after intervention reports</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
              <p className="text-xl sm:text-2xl font-bold text-purple-600">3.2x</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">More likely to prevent incidents with saves</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">85%</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">Hazards resolved within 48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}