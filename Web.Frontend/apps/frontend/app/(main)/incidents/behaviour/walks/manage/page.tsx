"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { WalkProvider, useWalkContext } from '../components/WalkContext';
import { walksTheme, walkTypeColors } from '../config/theme';

// Manage Walks content component
function ManageWalksContent() {
  const { templates, scheduledWalks, isLoading, error } = useWalkContext();
  const [activeTab, setActiveTab] = useState<'templates' | 'assignments' | 'schedule'>('templates');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [assignmentData, setAssignmentData] = useState({
    assignedTo: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  });

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

  // Mock users for assignment
  const mockUsers = [
    { id: 1, name: 'John Smith', role: 'Safety Officer' },
    { id: 2, name: 'Sarah Johnson', role: 'Supervisor' },
    { id: 3, name: 'Mike Wilson', role: 'Team Lead' },
    { id: 4, name: 'Emma Brown', role: 'Inspector' },
    { id: 5, name: 'David Lee', role: 'Manager' }
  ];

  const handleAssignWalk = (template: any) => {
    setSelectedTemplate(template);
    setShowAssignModal(true);
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setAssignmentData(prev => ({ ...prev, date: today }));
  };

  const handleSubmitAssignment = () => {
    // Here you would normally submit to API
    console.log('Assigning walk:', {
      templateId: selectedTemplate.id,
      ...assignmentData
    });
    setShowAssignModal(false);
    setSelectedTemplate(null);
    setAssignmentData({
      assignedTo: '',
      date: '',
      time: '',
      location: '',
      notes: ''
    });
  };

  const getTemplateTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
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
                <span>Manage</span>
              </div>
              <h1 className={walksTheme.typography.pageTitle} style={{ margin: 0 }}>
                Manage Walks
              </h1>
              <p className={walksTheme.typography.pageSubtitle}>
                Configure templates, assign walks, and manage schedules
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/incidents/behaviour/walks/builder"
                style={walksTheme.buttons.outline}
                className="hover:bg-purple-50 text-center inline-block"
              >
                Template Builder
              </Link>
              <button
                onClick={() => setActiveTab('assignments')}
                style={walksTheme.buttons.primary}
                className="hover:opacity-80"
              >
                New Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={walksTheme.spacing.page}>
        {/* Tabs */}
        <div className={`${walksTheme.cards.base} p-1 mb-6`}>
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Walk Templates ({templates.length})
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'assignments'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Schedule ({scheduledWalks.length})
            </button>
          </div>
        </div>

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className={`${walksTheme.cards.base} p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    walkTypeColors[template.type] || walkTypeColors.general
                  }`}>
                    {getTemplateTypeLabel(template.type)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    {template.status === 'active' && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Checkpoints</span>
                    <span className="font-medium">{template.totalCheckpoints}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Est. Duration</span>
                    <span className="font-medium">{template.estimatedDuration} mins</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Max Points</span>
                    <span className="font-medium text-green-600">{template.maxPoints} pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Used</span>
                    <span className="font-medium">{template.timesUsed || 0} times</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAssignWalk(template)}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
                  >
                    Assign Walk
                  </button>
                  <Link
                    href={`/incidents/behaviour/walks/execute/new?template=${template.id}`}
                    className="flex-1 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 text-center"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className={walksTheme.cards.base}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Active Assignments</h2>
              <p className="text-sm text-gray-600 mt-1">Manage walk assignments and responsibilities</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockUsers.map((user) => {
                const userAssignments = scheduledWalks.filter(w => w.assignedTo === user.name);
                return (
                  <div key={user.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {userAssignments.length} walks assigned
                          </p>
                          <p className="text-xs text-gray-500">This week</p>
                        </div>
                        <button
                          onClick={() => {
                            setAssignmentData(prev => ({ ...prev, assignedTo: user.name }));
                            setShowAssignModal(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800"
                        >
                          Assign Walk
                        </button>
                      </div>
                    </div>
                    {userAssignments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {userAssignments.map((assignment, idx) => (
                          <div key={idx} className="flex items-center justify-between pl-14 text-sm">
                            <span className="text-gray-600">{assignment.title}</span>
                            <span className="text-gray-500">Today at {assignment.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className={walksTheme.cards.base}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Scheduled Walks</h2>
              <p className="text-sm text-gray-600 mt-1">Today's walk schedule and upcoming assignments</p>
            </div>
            <div className="divide-y divide-gray-200">
              {scheduledWalks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No walks scheduled for today</p>
                </div>
              ) : (
                scheduledWalks.map((walk, idx) => {
                  const now = new Date();
                  const walkTime = new Date();
                  const [hours, minutes] = walk.time.split(':');
                  walkTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                  const isOverdue = walkTime < now;

                  return (
                    <div key={idx} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-base font-semibold text-gray-900">{walk.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              isOverdue ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {isOverdue ? 'Overdue' : 'Scheduled'}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>{walk.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Today at {walk.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{walk.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-400 hover:text-red-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTemplate ? `Assign ${selectedTemplate.title}` : 'Assign Walk'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To
                </label>
                <select
                  value={assignmentData.assignedTo}
                  onChange={(e) => setAssignmentData(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a person</option>
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.name}>{user.name} - {user.role}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={assignmentData.date}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={assignmentData.time}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={assignmentData.location}
                  onChange={(e) => setAssignmentData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Building A, Floor 2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={assignmentData.notes}
                  onChange={(e) => setAssignmentData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  placeholder="Any special instructions..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAssignment}
                disabled={!assignmentData.assignedTo || !assignmentData.date || !assignmentData.time}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign Walk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main component with provider
export default function ManageWalksPage() {
  return (
    <WalkProvider>
      <ManageWalksContent />
    </WalkProvider>
  );
}