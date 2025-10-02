'use client';

import React from 'react';

interface AuditTrailWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function AuditTrailWidget({ id, isEditMode }: AuditTrailWidgetProps) {
  const auditEvents = [
    {
      id: 1,
      action: 'Document Updated',
      resource: 'Safety Policy v3.1',
      user: 'John Admin',
      timestamp: '10 mins ago',
      type: 'update',
      severity: 'medium',
      details: 'Updated section 4.2 - Emergency procedures'
    },
    {
      id: 2,
      action: 'User Access Granted',
      resource: 'Risk Assessment Module',
      user: 'System',
      timestamp: '25 mins ago',
      type: 'access',
      severity: 'low',
      details: 'Access granted to Sarah Johnson'
    },
    {
      id: 3,
      action: 'Risk Assessment Created',
      resource: 'RA-2024-089',
      user: 'Mike Wilson',
      timestamp: '1 hour ago',
      type: 'create',
      severity: 'medium',
      details: 'High-risk chemical handling assessment'
    },
    {
      id: 4,
      action: 'System Configuration',
      resource: 'Notification Settings',
      user: 'Admin System',
      timestamp: '2 hours ago',
      type: 'config',
      severity: 'high',
      details: 'Alert thresholds modified for incidents'
    },
    {
      id: 5,
      action: 'Data Export',
      resource: 'Incident Reports Q1',
      user: 'Lisa Manager',
      timestamp: '3 hours ago',
      type: 'export',
      severity: 'medium',
      details: 'Exported 247 incident records'
    },
    {
      id: 6,
      action: 'Failed Login Attempt',
      resource: 'User Authentication',
      user: 'Unknown',
      timestamp: '4 hours ago',
      type: 'security',
      severity: 'high',
      details: 'Multiple failed attempts from IP 192.168.1.105'
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'update': return '📝';
      case 'access': return '🔐';
      case 'create': return '➕';
      case 'config': return '⚙️';
      case 'export': return '📤';
      case 'security': return '🚨';
      default: return '📋';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'text-red-600';
      case 'config': return 'text-purple-600';
      case 'create': return 'text-green-600';
      case 'update': return 'text-blue-600';
      case 'access': return 'text-orange-600';
      case 'export': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const stats = {
    total: auditEvents.length,
    security: auditEvents.filter(e => e.type === 'security').length,
    high: auditEvents.filter(e => e.severity === 'high').length,
    lastHour: auditEvents.filter(e => e.timestamp.includes('mins') || e.timestamp === '1 hour ago').length,
  };

  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
          <p className="text-sm text-gray-600">System activity monitoring</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
          <span>PRO</span>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-blue-700">Events Today</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-xl font-bold text-red-600">{stats.security}</div>
          <div className="text-xs text-red-700">Security Events</div>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-medium text-gray-700">Recent Activity</h4>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {auditEvents.map((event, index) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="text-lg flex-shrink-0 mt-0.5">
                  {getActionIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className={`font-medium text-sm truncate ${getTypeColor(event.type)}`}>
                      {event.action}
                    </h5>
                    <span className={`px-2 py-1 text-xs rounded-full border font-medium ml-2 flex-shrink-0 ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                  </div>
                  <div className="text-sm text-gray-900 mb-1 truncate">
                    {event.resource}
                  </div>
                  <div className="text-xs text-gray-600 mb-2 line-clamp-1">
                    {event.details}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-medium">{event.user}</span>
                    <span>{event.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter/Search Bar */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search audit logs..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>Security</option>
            <option>Updates</option>
            <option>Access</option>
            <option>Config</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{stats.high}</div>
            <div className="text-xs text-gray-600">High Priority</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">{stats.lastHour}</div>
            <div className="text-xs text-gray-600">Last Hour</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          Full Log
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
          Export
        </button>
      </div>
    </div>
  );
}