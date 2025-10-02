"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MockWalkAssignmentService from '@/services/mockWalkAssignmentService';
import { WalkAssignment, WalkStatus } from '@/types/behaviour/walks';
import { walksTheme } from './config/theme';

export default function WalksDashboardPage() {
  const [assignments, setAssignments] = useState<WalkAssignment[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'active' | 'recent'>('upcoming');

  useEffect(() => {
    // Load data
    const loadData = () => {
      setIsLoading(true);
      try {
        const allAssignments = MockWalkAssignmentService.getAllAssignments();
        setAssignments(allAssignments);
        setStatistics(MockWalkAssignmentService.getStatistics());
      } catch (error) {
        console.error('Error loading walk data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter assignments based on selected tab
  const getFilteredAssignments = () => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    switch (selectedTab) {
      case 'upcoming':
        return assignments.filter(a =>
          a.status === 'upcoming' || a.status === 'missed'
        ).sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());
      case 'active':
        return assignments.filter(a => a.status === 'currently-live')
          .sort((a, b) => (a.startedAt ? new Date(a.startedAt).getTime() : 0) -
                         (b.startedAt ? new Date(b.startedAt).getTime() : 0));
      case 'recent':
        return assignments.filter(a =>
          (a.status === 'completed' || a.status === 'not-completed') &&
          (a.completedAt ? new Date(a.completedAt) > twentyFourHoursAgo :
           a.startedAt ? new Date(a.startedAt) > twentyFourHoursAgo : false)
        ).sort((a, b) => {
          const dateA = a.completedAt || a.startedAt || a.scheduledFor;
          const dateB = b.completedAt || b.startedAt || b.scheduledFor;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
      default:
        return [];
    }
  };

  // Format date/time
  const formatDateTime = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();

    if (isToday) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: WalkStatus) => {
    const styles = {
      'upcoming': 'bg-blue-100 text-blue-700',
      'currently-live': 'bg-green-100 text-green-700',
      'missed': 'bg-red-100 text-red-700',
      'not-completed': 'bg-orange-100 text-orange-700',
      'completed': 'bg-gray-100 text-gray-700'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status]}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  // Get schedule type badge
  const getScheduleBadge = (type: string) => {
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
        type === 'scheduled' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {type}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const filteredAssignments = getFilteredAssignments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className={walksTheme.spacing.header}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className={walksTheme.typography.pageTitle} style={{ margin: 0 }}>
                Safety Walks Dashboard
              </h1>
              <p className={walksTheme.typography.pageSubtitle}>
                Manage and monitor safety walk assignments
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link
                href="/incidents/behaviour/walks/execute/new?template=4"
                style={walksTheme.buttons.primary}
                className="hover:opacity-80 text-center inline-block"
              >
                Start Ad-hoc Walk
              </Link>
              <Link
                href="/incidents/behaviour/walks/manage"
                style={walksTheme.buttons.outline}
                className="hover:bg-purple-50 text-center inline-block"
              >
                Manage Assignments
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={walksTheme.spacing.page}>
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{statistics?.activeWalks || 0}</div>
            <div className="text-sm text-gray-600">Currently Live</div>
            <div className="text-xs text-green-600 mt-1">Active Now</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{statistics?.scheduledToday || 0}</div>
            <div className="text-sm text-gray-600">Scheduled Today</div>
            <div className="text-xs text-blue-600 mt-1">Upcoming</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{statistics?.overdueWalks || 0}</div>
            <div className="text-sm text-gray-600">Overdue</div>
            <div className="text-xs text-red-600 mt-1">Action Required</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{statistics?.totalCompleted || 0}</div>
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-xs text-gray-600 mt-1">This Month</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">{statistics?.outstandingIssues || 0}</div>
            <div className="text-sm text-gray-600">Outstanding Issues</div>
            <div className="text-xs text-orange-600 mt-1">Needs Review</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{statistics?.pointsEarned || 0}</div>
            <div className="text-sm text-gray-600">Points Earned</div>
            <div className="text-xs text-green-600 mt-1">Total Score</div>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('upcoming')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'upcoming'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Upcoming & Overdue
                {assignments.filter(a => a.status === 'upcoming' || a.status === 'missed').length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                    {assignments.filter(a => a.status === 'upcoming' || a.status === 'missed').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setSelectedTab('active')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'active'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Currently Live
                {assignments.filter(a => a.status === 'currently-live').length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                    {assignments.filter(a => a.status === 'currently-live').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setSelectedTab('recent')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'recent'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Recently Completed
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Walk Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssignments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No walks found for this view
                    </td>
                  </tr>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <tr
                      key={assignment.assignmentId}
                      className={`hover:bg-gray-50 ${
                        assignment.outstandingIssues && assignment.outstandingIssues > 0
                          ? 'bg-orange-50'
                          : assignment.status === 'missed'
                          ? 'bg-red-50'
                          : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Walk #{assignment.walkId}
                        </div>
                        {assignment.notes && (
                          <div className="text-xs text-gray-500 mt-1">{assignment.notes}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getScheduleBadge(assignment.scheduleType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(assignment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assignment.assignedToName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateTime(assignment.scheduledFor)}
                        </div>
                        {assignment.status === 'missed' && (
                          <div className="text-xs text-red-600">
                            Due: {formatDateTime(assignment.dueBy)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assignment.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {assignment.outstandingIssues && assignment.outstandingIssues > 0 ? (
                          <div className="flex items-center">
                            <span className="text-orange-600 font-medium">
                              {assignment.outstandingIssues}
                            </span>
                            <svg className="w-4 h-4 text-orange-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                        ) : assignment.issuesFound ? (
                          <span className="text-gray-600">{assignment.issuesFound}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {assignment.status === 'upcoming' && (
                          <Link
                            href={`/incidents/behaviour/walks/execute/new?template=${assignment.walkId}`}
                            className="text-purple-600 hover:text-purple-800 font-medium"
                          >
                            Start Walk
                          </Link>
                        )}
                        {assignment.status === 'currently-live' && (
                          <Link
                            href={`/incidents/behaviour/walks/execute/${assignment.assignmentId}`}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            View Live
                          </Link>
                        )}
                        {(assignment.status === 'completed' || assignment.status === 'not-completed') && (
                          <Link
                            href={`/incidents/behaviour/walks/reports/${assignment.assignmentId}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Report
                          </Link>
                        )}
                        {assignment.status === 'missed' && (
                          <button className="text-red-600 hover:text-red-800 font-medium">
                            Reschedule
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredAssignments.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
              Showing {filteredAssignments.length} walks
              {assignments.filter(a => a.outstandingIssues && a.outstandingIssues > 0).length > 0 && (
                <span className="ml-4 text-orange-600">
                  • {assignments.filter(a => a.outstandingIssues && a.outstandingIssues > 0).length} walks with outstanding issues
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Link
            href="/incidents/behaviour/walks/my-walks"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-900 mb-2">My Assigned Walks</h3>
            <p className="text-sm text-gray-600">View and manage your personal walk assignments</p>
          </Link>
          <Link
            href="/incidents/behaviour/walks/reports"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-900 mb-2">Walk Reports</h3>
            <p className="text-sm text-gray-600">Review completed walk reports and analytics</p>
          </Link>
          <Link
            href="/incidents/behaviour/walks/builder"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-900 mb-2">Walk Template Builder</h3>
            <p className="text-sm text-gray-600">Create and modify walk templates</p>
          </Link>
        </div>
      </div>
    </div>
  );
}