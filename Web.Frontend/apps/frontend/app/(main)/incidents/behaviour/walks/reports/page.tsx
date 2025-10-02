"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { WalkProvider, useWalkContext } from '../components/WalkContext';
import { walksTheme } from '../config/theme';

// Reports content component
function WalkReportsContent() {
  const { completedWalks, statistics, isLoading, error } = useWalkContext();
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'points' | 'issues'>('date');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  // Filter walks by date range
  const filterByDateRange = (walks: any[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    switch (dateRange) {
      case 'today':
        return walks.filter(w => new Date(w.completedAt) >= today);
      case 'week':
        return walks.filter(w => new Date(w.completedAt) >= weekAgo);
      case 'month':
        return walks.filter(w => new Date(w.completedAt) >= monthAgo);
      default:
        return walks;
    }
  };

  // Search filter
  const filterBySearch = (walks: any[]) => {
    if (!searchTerm) return walks;
    return walks.filter(walk =>
      walk.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      walk.executorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      walk.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Sort walks
  const sortWalks = (walks: any[]) => {
    return [...walks].sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return (b.totalPoints || 0) - (a.totalPoints || 0);
        case 'issues':
          return (b.issuesFound || 0) - (a.issuesFound || 0);
        case 'date':
        default:
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      }
    });
  };

  // Apply all filters and sorting
  let filteredWalks = filterByDateRange(completedWalks);
  filteredWalks = filterBySearch(filteredWalks);
  filteredWalks = sortWalks(filteredWalks);

  // Calculate summary statistics for filtered walks
  const calculateSummaryStats = () => {
    const totalWalks = filteredWalks.length;
    const totalPoints = filteredWalks.reduce((sum, w) => sum + (w.totalPoints || 0), 0);
    const totalIssues = filteredWalks.reduce((sum, w) => sum + (w.issuesFound || 0), 0);
    const avgDuration = totalWalks > 0
      ? Math.round(filteredWalks.reduce((sum, w) => sum + (w.duration || 0), 0) / totalWalks)
      : 0;

    return { totalWalks, totalPoints, totalIssues, avgDuration };
  };

  const summaryStats = calculateSummaryStats();

  // Format helpers
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className={walksTheme.spacing.header}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Link href="/incidents/behaviour/walks" className="hover:text-purple-600">
                  Walks
                </Link>
                <span>/</span>
                <span>Reports</span>
              </div>
              <h1 className={walksTheme.typography.pageTitle} style={{ margin: 0 }}>
                Walk Reports
              </h1>
              <p className={walksTheme.typography.pageSubtitle}>
                View completed walk reports and performance analytics
              </p>
            </div>
            <div className="flex gap-2">
              <button
                style={walksTheme.buttons.outline}
                className="hover:bg-purple-50 text-center inline-block"
              >
                Export Data
              </button>
              <button
                style={walksTheme.buttons.primary}
                className="hover:opacity-80 text-center inline-block"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={walksTheme.spacing.page}>
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={walksTheme.cards.statistics}>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Walks</h3>
            <p className="text-3xl font-bold text-gray-900">{summaryStats.totalWalks}</p>
            <p className="text-xs text-gray-500 mt-1">In selected period</p>
          </div>
          <div className={walksTheme.cards.statistics}>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Points Earned</h3>
            <p className="text-3xl font-bold text-green-600">{summaryStats.totalPoints}</p>
            <p className="text-xs text-gray-500 mt-1">Total points</p>
          </div>
          <div className={walksTheme.cards.statistics}>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Issues Found</h3>
            <p className="text-3xl font-bold text-orange-600">{summaryStats.totalIssues}</p>
            <p className="text-xs text-gray-500 mt-1">Requiring action</p>
          </div>
          <div className={walksTheme.cards.statistics}>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Duration</h3>
            <p className="text-3xl font-bold text-blue-600">{summaryStats.avgDuration}</p>
            <p className="text-xs text-gray-500 mt-1">Minutes per walk</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`${walksTheme.cards.base} p-4 mb-6`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="date">Sort by Date</option>
                <option value="points">Sort by Points</option>
                <option value="issues">Sort by Issues</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className={`${walksTheme.cards.base} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Walk Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Executor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Checkpoints
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWalks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      No reports found for the selected criteria
                    </td>
                  </tr>
                ) : (
                  filteredWalks.map((walk) => (
                    <tr key={walk.sessionId} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{walk.title}</div>
                          {walk.location && (
                            <div className="text-sm text-gray-500">{walk.location}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{walk.executorName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{formatDate(walk.completedAt)}</div>
                        <div className="text-sm text-gray-500">{formatTime(walk.completedAt)}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {walk.checkpointsCompleted}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {walk.issuesFound > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {walk.issuesFound}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-green-600">
                          +{walk.totalPoints}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-900">
                          {formatDuration(walk.duration || 0)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/incidents/behaviour/walks/reports/${walk.sessionId}`}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          View Report
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with provider
export default function WalkReportsPage() {
  return (
    <WalkProvider>
      <WalkReportsContent />
    </WalkProvider>
  );
}