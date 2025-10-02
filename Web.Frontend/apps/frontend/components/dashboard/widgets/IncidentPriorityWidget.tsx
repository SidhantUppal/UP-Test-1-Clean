"use client";

import React from 'react';

interface IncidentPriorityWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function IncidentPriorityWidget({ id, isEditMode }: IncidentPriorityWidgetProps) {
  // Mock high priority incident data
  const highPriorityIncidents = [
    {
      id: 1,
      title: 'Chemical Exposure - Lab 2',
      location: 'Research Building',
      severity: 'Critical',
      reportedTime: '1 hour ago',
      assignee: 'Safety Team',
      status: 'Investigating',
      color: 'bg-red-100 border-red-300 text-red-800'
    },
    {
      id: 2,
      title: 'Equipment Fire - Production Line',
      location: 'Manufacturing Floor',
      severity: 'High',
      reportedTime: '3 hours ago',
      assignee: 'Fire Safety Officer',
      status: 'Contained',
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    },
    {
      id: 3,
      title: 'Workplace Injury - Forklift Accident',
      location: 'Warehouse C',
      severity: 'High',
      reportedTime: '5 hours ago',
      assignee: 'Mike Davis',
      status: 'Medical Attention',
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    }
  ];


  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">High Priority</h3>
        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
          {highPriorityIncidents.length} critical
        </span>
      </div>
      
      <div className="space-y-3">
        {highPriorityIncidents.map((incident) => (
          <div key={incident.id} className={`p-3 rounded-lg border ${incident.color} hover:shadow-sm transition-all cursor-pointer`}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium truncate">{incident.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs opacity-75">{incident.location}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs opacity-75">{incident.reportedTime}</span>
                  <span className="text-xs opacity-75">•</span>
                  <span className="text-xs opacity-75">{incident.assignee}</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <span className="text-xs opacity-75">{incident.status}</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded bg-white/50">
                {incident.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {highPriorityIncidents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No high priority incidents</p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <button className="text-sm text-purple-600 hover:text-purple-800">
          View All Priority Incidents →
        </button>
      </div>
    </div>
  );
}