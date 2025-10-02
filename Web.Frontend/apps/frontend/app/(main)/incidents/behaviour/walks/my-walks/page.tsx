"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { WalkProvider, useWalkContext } from '../components/WalkContext';
import { walksTheme, walkStatusColors } from '../config/theme';

// My Walks content component
function MyWalksContent() {
  const { activeWalks, scheduledWalks, completedWalks, templates, isLoading, error } = useWalkContext();
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'scheduled' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter walks based on status
  const getFilteredWalks = () => {
    let walks: any[] = [];

    switch (filterStatus) {
      case 'active':
        walks = activeWalks.map(w => ({ ...w, type: 'active' }));
        break;
      case 'scheduled':
        walks = scheduledWalks.map(w => ({ ...w, type: 'scheduled' }));
        break;
      case 'completed':
        walks = completedWalks.map(w => ({ ...w, type: 'completed' }));
        break;
      default:
        walks = [
          ...activeWalks.map(w => ({ ...w, type: 'active' })),
          ...scheduledWalks.map(w => ({ ...w, type: 'scheduled' })),
          ...completedWalks.slice(0, 5).map(w => ({ ...w, type: 'completed' }))
        ];
    }

    // Apply search filter
    if (searchTerm) {
      walks = walks.filter(walk =>
        walk.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        walk.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        walk.executorName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return walks;
  };

  const filteredWalks = getFilteredWalks();

  // Format date/time helpers
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

  const getStatusBadge = (walk: any) => {
    if (walk.type === 'active') {
      return (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          walk.status === 'in-progress'
            ? walkStatusColors['in-progress']
            : walkStatusColors['paused']
        }`}>
          {walk.status === 'in-progress' ? 'In Progress' : 'Paused'}
        </span>
      );
    }
    if (walk.type === 'scheduled') {
      const now = new Date();
      const walkTime = new Date();
      const [hours, minutes] = walk.time.split(':');
      walkTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      const isOverdue = walkTime < now;

      return (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          isOverdue ? walkStatusColors['overdue'] : walkStatusColors['not-started']
        }`}>
          {isOverdue ? 'Overdue' : 'Scheduled'}
        </span>
      );
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${walkStatusColors['completed']}`}>
        Completed
      </span>
    );
  };

  const getWalkAction = (walk: any) => {
    if (walk.type === 'active') {
      return (
        <Link
          href={`/incidents/behaviour/walks/execute/${walk.sessionId}`}
          style={walksTheme.buttons.primary}
          className="hover:opacity-80 text-center inline-block text-sm"
        >
          {walk.status === 'paused' ? 'Resume' : 'Continue'}
        </Link>
      );
    }
    if (walk.type === 'scheduled') {
      const template = templates.find(t => t.id === parseInt(walk.walkId));
      return (
        <Link
          href={`/incidents/behaviour/walks/execute/new?template=${walk.walkId}`}
          style={walksTheme.buttons.outline}
          className="hover:bg-purple-50 text-center inline-block text-sm"
        >
          Start Walk
        </Link>
      );
    }
    return (
      <Link
        href={`/incidents/behaviour/walks/reports/${walk.sessionId}`}
        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
      >
        View Report
      </Link>
    );
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
                <span>My Walks</span>
              </div>
              <h1 className={walksTheme.typography.pageTitle} style={{ margin: 0 }}>
                My Walks
              </h1>
              <p className={walksTheme.typography.pageSubtitle}>
                View and manage your assigned walks and active sessions
              </p>
            </div>
            <Link
              href="/incidents/behaviour/walks/execute/new?template=4"
              style={walksTheme.buttons.primary}
              className="hover:opacity-80 text-center inline-block"
            >
              Start New Walk
            </Link>
          </div>
        </div>
      </div>

      <div className={walksTheme.spacing.page}>
        {/* Filters and Search */}
        <div className={`${walksTheme.cards.base} p-4`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search walks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({filteredWalks.length})
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active ({activeWalks.length})
              </button>
              <button
                onClick={() => setFilterStatus('scheduled')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'scheduled'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Scheduled ({scheduledWalks.length})
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'completed'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed ({completedWalks.length})
              </button>
            </div>
          </div>
        </div>

        {/* Walks List */}
        <div className={walksTheme.cards.base}>
          <div className="divide-y divide-gray-200">
            {filteredWalks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No walks found matching your criteria</p>
              </div>
            ) : (
              filteredWalks.map((walk, index) => (
                <div key={`${walk.type}-${walk.sessionId || walk.id || index}`} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {walk.title || `Walk ${walk.walkId}`}
                        </h3>
                        {getStatusBadge(walk)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{walk.executorName || walk.assignedTo || 'Unassigned'}</span>
                        </div>

                        {walk.location && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{walk.location}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            {walk.type === 'scheduled'
                              ? `Today at ${walk.time}`
                              : walk.type === 'active'
                              ? `Started ${formatTime(walk.startedAt)}`
                              : `Completed ${formatDate(walk.completedAt)}`
                            }
                          </span>
                        </div>
                      </div>

                      {walk.type === 'active' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{walk.checkpointsCompleted} / {walk.checkpointsCompleted + 5} checkpoints</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all"
                              style={{ width: `${Math.round((walk.checkpointsCompleted / (walk.checkpointsCompleted + 5)) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {walk.type === 'completed' && (
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="text-gray-600">
                            ✓ {walk.checkpointsCompleted} checkpoints
                          </span>
                          {walk.issuesFound > 0 && (
                            <span className="text-orange-600">
                              ⚠ {walk.issuesFound} issues
                            </span>
                          )}
                          <span className="text-green-600">
                            +{walk.totalPoints} pts
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {getWalkAction(walk)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with provider
export default function MyWalksPage() {
  return (
    <WalkProvider>
      <MyWalksContent />
    </WalkProvider>
  );
}