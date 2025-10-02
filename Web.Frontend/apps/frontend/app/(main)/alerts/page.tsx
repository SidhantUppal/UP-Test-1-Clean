"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

// Alert type definitions
export type AlertType = 'Incident' | 'Kill Question' | 'Critical Checklist' | 'LOTO' | 'Permit Expiry' | 'Safety Violation' | 'System' | 'Compliance';
export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved' | 'Escalated';

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  sourceId?: string;
  triggeredBy: string;
  triggeredAt: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  relatedModule?: string;
  relatedId?: string;
  requiredAction: string;
  escalationLevel?: number;
  attachments?: number;
  comments?: number;
}

// Generate comprehensive mock alerts
const generateMockAlerts = (): Alert[] => {
  return [
    // Incidents
    {
      id: 'ALT-001',
      title: 'Near Miss Incident - Scaffold Fall Prevention',
      description: 'Worker almost fell from scaffolding due to missing guardrail. Immediate investigation required.',
      type: 'Incident',
      severity: 'Critical',
      status: 'Active',
      source: 'Safety Reporting System',
      sourceId: 'INC-2025-089',
      triggeredBy: 'Site Supervisor',
      triggeredAt: '15 minutes ago',
      relatedModule: 'Safety',
      requiredAction: 'Conduct immediate site inspection and file incident report',
      escalationLevel: 2,
      attachments: 3,
      comments: 7
    },
    {
      id: 'ALT-002',
      title: 'Chemical Spill in Storage Area B',
      description: 'Minor chemical spill detected in storage area. Cleanup crew dispatched.',
      type: 'Incident',
      severity: 'High',
      status: 'Acknowledged',
      source: 'Environmental Monitoring',
      sourceId: 'INC-2025-090',
      triggeredBy: 'Automated Sensor',
      triggeredAt: '1 hour ago',
      acknowledgedBy: 'HSE Manager',
      acknowledgedAt: '45 minutes ago',
      relatedModule: 'Safety',
      requiredAction: 'Complete spill cleanup and file environmental report',
      attachments: 2,
      comments: 4
    },
    
    // Kill Questions
    {
      id: 'ALT-003',
      title: 'Kill Question Triggered - Electrical Safety Checklist',
      description: 'Critical safety requirement failed: "Are all electrical panels properly locked out?" Response: NO',
      type: 'Kill Question',
      severity: 'Critical',
      status: 'Active',
      source: 'Checklist System',
      sourceId: 'CHK-2025-156',
      triggeredBy: 'Mike Wilson',
      triggeredAt: '30 minutes ago',
      relatedModule: 'Checklists',
      relatedId: 'CHK-ELEC-001',
      requiredAction: 'Stop all work immediately. Secure electrical panels before proceeding.',
      escalationLevel: 3,
      comments: 5
    },
    {
      id: 'ALT-004',
      title: 'Kill Question Failed - Confined Space Entry',
      description: 'Pre-entry checklist failed: "Has atmospheric testing been completed?" Work permit suspended.',
      type: 'Kill Question',
      severity: 'Critical',
      status: 'Active',
      source: 'Permit System',
      sourceId: 'PTW-2025-087',
      triggeredBy: 'Safety Officer',
      triggeredAt: '2 hours ago',
      relatedModule: 'Permits',
      relatedId: 'CS-2025-034',
      requiredAction: 'Complete atmospheric testing before any entry. Permit on hold.',
      escalationLevel: 2,
      attachments: 1,
      comments: 8
    },
    
    // Critical Checklists
    {
      id: 'ALT-005',
      title: 'Critical Checklist Overdue - Daily Safety Walk',
      description: 'Manufacturing floor daily safety walkthrough not completed. Due 4 hours ago.',
      type: 'Critical Checklist',
      severity: 'High',
      status: 'Active',
      source: 'Checklist Scheduler',
      triggeredBy: 'System',
      triggeredAt: '2 hours ago',
      relatedModule: 'Checklists',
      relatedId: 'CHK-SAFETY-DAILY',
      requiredAction: 'Complete safety walkthrough immediately and submit findings',
      escalationLevel: 1,
      comments: 3
    },
    {
      id: 'ALT-006',
      title: 'Pre-Start Checklist Not Completed - Crane Operation',
      description: 'Critical equipment pre-start checklist pending. Operations cannot commence.',
      type: 'Critical Checklist',
      severity: 'Critical',
      status: 'Acknowledged',
      source: 'Equipment Management',
      triggeredBy: 'System',
      triggeredAt: '1 hour ago',
      acknowledgedBy: 'Operations Manager',
      acknowledgedAt: '30 minutes ago',
      relatedModule: 'Checklists',
      relatedId: 'CHK-CRANE-PRE',
      requiredAction: 'Complete full crane inspection checklist before operation',
      attachments: 2,
      comments: 6
    },
    
    // LOTO Alerts
    {
      id: 'ALT-007',
      title: 'LOTO Not Removed - Electrical Panel E-12',
      description: 'Lock out tag out still active after maintenance completion. Affecting production line restart.',
      type: 'LOTO',
      severity: 'High',
      status: 'Active',
      source: 'LOTO Management System',
      sourceId: 'LOTO-2025-045',
      triggeredBy: 'Production Supervisor',
      triggeredAt: '45 minutes ago',
      relatedModule: 'Permits',
      relatedId: 'PTW-2025-088',
      requiredAction: 'Verify work completion and remove LOTO following proper procedures',
      escalationLevel: 1,
      comments: 4
    },
    {
      id: 'ALT-008',
      title: 'Orphaned LOTO Detected - Pump Station 3',
      description: 'LOTO device found without associated work permit. Owner unknown.',
      type: 'LOTO',
      severity: 'Critical',
      status: 'Escalated',
      source: 'Weekly LOTO Audit',
      triggeredBy: 'Safety Auditor',
      triggeredAt: '3 hours ago',
      relatedModule: 'Safety',
      requiredAction: 'Identify LOTO owner immediately. Do not remove until verified safe.',
      escalationLevel: 3,
      attachments: 5,
      comments: 12
    },
    
    // Additional Alert Types
    {
      id: 'ALT-009',
      title: 'Permit Expiring - Hot Work in Building A',
      description: 'Hot work permit expires in 2 hours. Extension or closure required.',
      type: 'Permit Expiry',
      severity: 'Medium',
      status: 'Active',
      source: 'Permit Management',
      sourceId: 'PTW-2025-089',
      triggeredBy: 'System',
      triggeredAt: '30 minutes ago',
      relatedModule: 'Permits',
      relatedId: 'HW-2025-089',
      requiredAction: 'Review work status and extend permit or ensure safe closure',
      comments: 2
    },
    {
      id: 'ALT-010',
      title: 'PPE Violation Detected - Hard Hat Area',
      description: 'Multiple workers observed without required hard hats in designated area.',
      type: 'Safety Violation',
      severity: 'High',
      status: 'Acknowledged',
      source: 'Safety Observation',
      triggeredBy: 'Site Inspector',
      triggeredAt: '2 hours ago',
      acknowledgedBy: 'Safety Manager',
      acknowledgedAt: '1 hour ago',
      relatedModule: 'Safety',
      requiredAction: 'Conduct immediate safety briefing and ensure PPE compliance',
      attachments: 4,
      comments: 9
    },
    {
      id: 'ALT-011',
      title: 'System Alert - Database Backup Failed',
      description: 'Nightly database backup failed. Manual intervention required.',
      type: 'System',
      severity: 'Medium',
      status: 'Resolved',
      source: 'IT Monitoring',
      triggeredBy: 'Automated System',
      triggeredAt: '6 hours ago',
      acknowledgedBy: 'IT Admin',
      acknowledgedAt: '5 hours ago',
      resolvedBy: 'Database Admin',
      resolvedAt: '3 hours ago',
      relatedModule: 'System',
      requiredAction: 'Verify backup completion and investigate failure cause',
      comments: 5
    },
    {
      id: 'ALT-012',
      title: 'Compliance Alert - Contractor Insurance Expired',
      description: 'ABC Construction insurance certificate expired. Work authorization suspended.',
      type: 'Compliance',
      severity: 'High',
      status: 'Active',
      source: 'Contractor Management',
      sourceId: 'CONT-123',
      triggeredBy: 'System',
      triggeredAt: '4 hours ago',
      relatedModule: 'Contractors',
      relatedId: 'CONT-123',
      requiredAction: 'Obtain updated insurance certificate before work can resume',
      escalationLevel: 2,
      attachments: 3,
      comments: 7
    }
  ];
};

export default function AlertsPage() {
  const { currentTheme } = useTheme();
  const [alerts] = useState<Alert[]>(generateMockAlerts());
  const [selectedType, setSelectedType] = useState<AlertType | 'All'>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<AlertStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'time' | 'severity' | 'type'>('time');
  const [showOnlyActive, setShowOnlyActive] = useState(true);

  // Calculate statistics
  const stats = useMemo(() => {
    const activeAlerts = alerts.filter(a => a.status === 'Active' || a.status === 'Escalated');
    return {
      total: alerts.length,
      active: activeAlerts.length,
      critical: activeAlerts.filter(a => a.severity === 'Critical').length,
      acknowledged: alerts.filter(a => a.status === 'Acknowledged').length,
      resolved: alerts.filter(a => a.status === 'Resolved').length,
      escalated: alerts.filter(a => a.status === 'Escalated').length,
      incidents: alerts.filter(a => a.type === 'Incident').length,
      killQuestions: alerts.filter(a => a.type === 'Kill Question').length,
      checklists: alerts.filter(a => a.type === 'Critical Checklist').length,
      loto: alerts.filter(a => a.type === 'LOTO').length
    };
  }, [alerts]);

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts];

    // Type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(alert => alert.type === selectedType);
    }

    // Severity filter
    if (selectedSeverity !== 'All') {
      filtered = filtered.filter(alert => alert.severity === selectedSeverity);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(alert => alert.status === selectedStatus);
    }

    // Active only filter
    if (showOnlyActive) {
      filtered = filtered.filter(alert => alert.status === 'Active' || alert.status === 'Escalated');
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(alert => 
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'severity':
          const severityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        case 'type':
          return a.type.localeCompare(b.type);
        case 'time':
        default:
          // For this mock, we'll just use the order they appear
          return 0;
      }
    });

    return filtered;
  }, [alerts, selectedType, selectedSeverity, selectedStatus, showOnlyActive, searchTerm, sortBy]);

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  const getStatusColor = (status: AlertStatus) => {
    switch (status) {
      case 'Active': return 'text-red-600 bg-red-100';
      case 'Acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'Resolved': return 'text-green-600 bg-green-100';
      case 'Escalated': return 'text-purple-600 bg-purple-100';
    }
  };

  const getTypeIcon = (type: AlertType) => {
    switch (type) {
      case 'Incident':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'Kill Question':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        );
      case 'Critical Checklist':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'LOTO':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'Permit Expiry':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Safety Violation':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
          </svg>
        );
      case 'System':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'Compliance':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const clearFilters = () => {
    setSelectedType('All');
    setSelectedSeverity('All');
    setSelectedStatus('All');
    setSearchTerm('');
    setShowOnlyActive(true);
    setSortBy('time');
  };

  const activeFilterCount = [
    selectedType !== 'All',
    selectedSeverity !== 'All',
    selectedStatus !== 'All',
    searchTerm !== '',
    !showOnlyActive,
    sortBy !== 'time'
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Alert Management Center</h1>
          <p className="text-gray-600 mt-1">Monitor and respond to critical system alerts</p>
        </div>
        <div className="space-x-2">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded border border-gray-300">
            Export Report
          </button>
          <button className="bg-theme-primary hover:bg-theme-primary/90 text-white px-4 py-2 rounded">
            Acknowledge All
          </button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Total</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-red-50 rounded-lg shadow p-4 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-red-700">Active</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-red-700">{stats.active}</p>
        </div>

        <div className="bg-orange-50 rounded-lg shadow p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-orange-700">Critical</span>
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-orange-700">{stats.critical}</p>
        </div>

        <div className="bg-purple-50 rounded-lg shadow p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-700">Escalated</span>
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-purple-700">{stats.escalated}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Incidents</span>
            {getTypeIcon('Incident')}
          </div>
          <p className="text-2xl font-bold">{stats.incidents}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Kill Q's</span>
            {getTypeIcon('Kill Question')}
          </div>
          <p className="text-2xl font-bold">{stats.killQuestions}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Checklists</span>
            {getTypeIcon('Critical Checklist')}
          </div>
          <p className="text-2xl font-bold">{stats.checklists}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">LOTO</span>
            {getTypeIcon('LOTO')}
          </div>
          <p className="text-2xl font-bold">{stats.loto}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Alert Filters</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search alerts..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-theme-primary focus:border-theme-primary"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as AlertType | 'All')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-theme-primary focus:border-theme-primary"
            >
              <option value="All">All Types</option>
              <option value="Incident">Incident</option>
              <option value="Kill Question">Kill Question</option>
              <option value="Critical Checklist">Critical Checklist</option>
              <option value="LOTO">LOTO</option>
              <option value="Permit Expiry">Permit Expiry</option>
              <option value="Safety Violation">Safety Violation</option>
              <option value="System">System</option>
              <option value="Compliance">Compliance</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as AlertSeverity | 'All')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-theme-primary focus:border-theme-primary"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as AlertStatus | 'All')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-theme-primary focus:border-theme-primary"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-theme-primary focus:border-theme-primary"
            >
              <option value="time">Time</option>
              <option value="severity">Severity</option>
              <option value="type">Type</option>
            </select>
          </div>

          {/* Active Only Toggle */}
          <div className="flex items-end">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyActive}
                onChange={(e) => setShowOnlyActive(e.target.checked)}
                className="mr-2 rounded text-theme-primary focus:ring-theme-primary"
              />
              <span className="text-sm font-medium text-gray-700">Active alerts only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Alerts ({filteredAlerts.length} {filteredAlerts.length === 1 ? 'alert' : 'alerts'})
            </h3>
            <div className="flex gap-2">
              <button className="text-sm text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Export
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                </svg>
                Print
              </button>
            </div>
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">No alerts found matching your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                  alert.severity === 'Critical' ? 'border-red-300 bg-red-50/50' : 
                  alert.status === 'Escalated' ? 'border-purple-300 bg-purple-50/50' : 
                  'border-gray-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          alert.severity === 'Critical' ? 'bg-red-100' : 
                          alert.severity === 'High' ? 'bg-orange-100' : 
                          'bg-gray-100'
                        }`}>
                          {getTypeIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                            <span className="text-sm text-gray-500">#{alert.id}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                              {alert.type}
                            </span>
                            {alert.escalationLevel && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                                Level {alert.escalationLevel} Escalation
                              </span>
                            )}
                          </div>

                          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-3">
                            <p className="text-sm font-medium text-yellow-800 mb-1">Required Action:</p>
                            <p className="text-sm text-yellow-700">{alert.requiredAction}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="text-gray-500">Source:</span> {alert.source}
                              {alert.sourceId && <span className="text-gray-400"> ({alert.sourceId})</span>}
                            </div>
                            <div>
                              <span className="text-gray-500">Triggered:</span> {alert.triggeredAt} by {alert.triggeredBy}
                            </div>
                            {alert.relatedModule && (
                              <div>
                                <span className="text-gray-500">Related:</span> 
                                <Link href="#" className="text-blue-600 hover:text-blue-800 ml-1">
                                  {alert.relatedModule} {alert.relatedId && `(${alert.relatedId})`}
                                </Link>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              {alert.comments !== undefined && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                  </svg>
                                  {alert.comments}
                                </span>
                              )}
                              {alert.attachments !== undefined && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                  </svg>
                                  {alert.attachments}
                                </span>
                              )}
                            </div>
                          </div>

                          {alert.acknowledgedBy && (
                            <div className="mt-2 text-sm text-gray-500">
                              Acknowledged by {alert.acknowledgedBy} at {alert.acknowledgedAt}
                            </div>
                          )}
                          {alert.resolvedBy && (
                            <div className="text-sm text-green-600">
                              Resolved by {alert.resolvedBy} at {alert.resolvedAt}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {(alert.status === 'Active' || alert.status === 'Escalated') && (
                        <>
                          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm">
                            Acknowledge
                          </button>
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                            Resolve
                          </button>
                        </>
                      )}
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm">
                        View Details
                      </button>
                      {alert.status === 'Active' && alert.severity === 'Critical' && (
                        <button className="btn btn-primary text-sm">
                          Escalate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}