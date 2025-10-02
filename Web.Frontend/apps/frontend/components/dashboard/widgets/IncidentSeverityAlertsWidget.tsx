"use client";

import React from 'react';

interface IncidentSeverityAlertsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function IncidentSeverityAlertsWidget({ id, isEditMode }: IncidentSeverityAlertsWidgetProps) {
  // Mock high severity incident alerts
  const severityAlerts = [
    {
      id: 1,
      title: 'RIDDOR Reportable Injury',
      description: 'Serious workplace injury requiring HSE notification',
      time: '2 hours ago',
      severity: 'Critical',
      requiresAction: true
    },
    {
      id: 2,
      title: 'Environmental Incident',
      description: 'Chemical discharge exceeded safety limits',
      time: '6 hours ago',
      severity: 'High',
      requiresAction: true
    },
    {
      id: 3,
      title: 'Equipment Failure',
      description: 'Safety system malfunction detected',
      time: '1 day ago',
      severity: 'High',
      requiresAction: false
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-600 bg-red-100 border-red-300';
      case 'High':
        return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };


  return (
    <div className="h-full p-6 bg-white rounded-lg border border-red-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-gray-900">Severity Alerts</h3>
        </div>
        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full font-medium">
          {severityAlerts.filter(a => a.requiresAction).length} require action
        </span>
      </div>
      
      <div className="space-y-3">
        {severityAlerts.map((alert) => (
          <div key={alert.id} className={`p-3 rounded-lg border hover:shadow-sm transition-all ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                <p className="text-xs opacity-75 mt-1">{alert.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold px-2 py-1 rounded bg-white/50">
                  {alert.severity}
                </span>
                {alert.requiresAction && (
                  <span className="text-xs text-red-600 font-medium mt-1">
                    Action Required
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs opacity-75">
              <span>{alert.time}</span>
              {alert.requiresAction && (
                <button className="text-red-600 hover:text-red-800 font-medium">
                  View Details →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {severityAlerts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No high severity alerts</p>
          <p className="text-xs text-gray-400 mt-1">All incidents are under control</p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-purple-600 hover:text-purple-800 font-medium">
          View All Severity Alerts →
        </button>
      </div>
    </div>
  );
}