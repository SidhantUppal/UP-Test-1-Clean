"use client";

import { useState } from 'react';

// Mock data
const mockUserStats = {
  totalPoints: 1247,
  currentStreak: 5,
  longestStreak: 12,
  totalReports: 89,
  rank: 7,
  teamSize: 45,
  badgesEarned: 8,
  totalBadges: 15
};

const mockBadges = [
  { id: 1, name: 'Safety Spotter', description: '10 hazard reports', earned: true, icon: '🔍' },
  { id: 2, name: 'Guardian Angel', description: '5 saves', earned: true, icon: '👼' },
  { id: 3, name: 'Coach', description: '10 training sessions', earned: true, icon: '🎯' },
  { id: 4, name: 'Eagle Eye', description: '25 observations', earned: true, icon: '👁️' },
  { id: 5, name: 'Trend Setter', description: '30-day streak', earned: false, icon: '📈' },
  { id: 6, name: 'Safety Leader', description: '100 reports', earned: false, icon: '🏆' },
  { id: 7, name: 'Team Player', description: 'Top 5 in team', earned: true, icon: '🤝' },
  { id: 8, name: 'Quick Responder', description: 'Report within 1 hour', earned: true, icon: '⚡' }
];

const mockRecentReports = [
  { id: 1, category: 'Save', points: 50, date: '2024-01-15', status: 'Approved' },
  { id: 2, category: 'Intervention', points: 20, date: '2024-01-14', status: 'Approved' },
  { id: 3, category: 'Quick Training', points: 30, date: '2024-01-13', status: 'Approved' },
  { id: 4, category: 'Hazard', points: 10, date: '2024-01-12', status: 'Pending' },
  { id: 5, category: 'Good Behavior', points: 15, date: '2024-01-11', status: 'Approved' }
];

const mockMonthlyData = [
  { month: 'Aug', points: 380 },
  { month: 'Sep', points: 420 },
  { month: 'Oct', points: 510 },
  { month: 'Nov', points: 445 },
  { month: 'Dec', points: 490 },
  { month: 'Jan', points: 247 }
];

export default function MyImpactPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>My Impact</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Track your safety contributions and achievements</p>
            </div>
            <div className="flex gap-3">
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
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12 xl:px-16 space-y-6">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Total Points</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>{mockUserStats.totalPoints.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Lifetime earned</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Current Streak</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>{mockUserStats.currentStreak}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Days active</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Team Rank</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>#{mockUserStats.rank}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Out of {mockUserStats.teamSize}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Badges Earned</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>{mockUserStats.badgesEarned}/{mockUserStats.totalBadges}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Achievements</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Points Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-0">
              <h2 className="text-lg sm:text-xl font-semibold">Points Trend</h2>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            {/* Simple bar chart visualization */}
            <div className="flex items-end justify-between h-32 sm:h-48 mt-6 sm:mt-8">
              {mockMonthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-purple-500 rounded-t"
                    style={{ 
                      height: `${(data.points / 600) * 100}%`,
                      minHeight: '20px'
                    }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  <span className="text-xs font-semibold">{data.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Reports</h2>
            <div className="space-y-3">
              {mockRecentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{report.category}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                      +{report.points} pts
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report.status === 'Approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="w-full mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View All Reports →
            </button>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Achievements & Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
            {mockBadges.map((badge) => (
              <div 
                key={badge.id}
                className={`text-center p-3 sm:p-4 rounded-lg border-2 ${
                  badge.earned 
                    ? 'border-purple-200 bg-purple-50' 
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{badge.icon}</div>
                <h3 className="text-xs font-semibold text-gray-900">{badge.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                {badge.earned && (
                  <div className="mt-2">
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Report Categories Breakdown</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">23</p>
              <p className="text-xs sm:text-sm text-gray-600">Interventions</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-green-600">18</p>
              <p className="text-xs sm:text-sm text-gray-600">Quick Training</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-purple-600">8</p>
              <p className="text-xs sm:text-sm text-gray-600">Saves</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">15</p>
              <p className="text-xs sm:text-sm text-gray-600">Hazards</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-orange-600">12</p>
              <p className="text-xs sm:text-sm text-gray-600">Near Misses</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-teal-600">13</p>
              <p className="text-xs sm:text-sm text-gray-600">Good Behaviors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}