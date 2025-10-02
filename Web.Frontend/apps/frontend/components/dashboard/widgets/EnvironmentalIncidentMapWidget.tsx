"use client";

import React from 'react';

interface EnvironmentalIncidentMapWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function EnvironmentalIncidentMapWidget({ id, isEditMode }: EnvironmentalIncidentMapWidgetProps) {
  const incidentLocations = [
    { id: 1, type: 'Spill', location: 'Production Area A', severity: 'Medium', status: 'Active' },
    { id: 2, type: 'Emission', location: 'Warehouse B', severity: 'Low', status: 'Resolved' },
    { id: 3, type: 'Waste', location: 'Loading Dock', severity: 'High', status: 'Active' },
    { id: 4, type: 'Water Quality', location: 'Treatment Plant', severity: 'Medium', status: 'Under Review' },
    { id: 5, type: 'Noise', location: 'Machine Shop', severity: 'Low', status: 'Resolved' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-600';
      case 'Resolved': return 'text-green-600';
      case 'Under Review': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Incident Locations</h3>
        <div className="flex space-x-2">
          <span className="flex items-center text-xs">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
            High
          </span>
          <span className="flex items-center text-xs">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
            Medium
          </span>
          <span className="flex items-center text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Low
          </span>
        </div>
      </div>
      
      {/* Mock facility layout */}
      <div className="bg-gray-50 rounded-lg p-4 h-48 relative mb-4 border">
        <div className="text-xs text-gray-500 mb-2">Facility Layout View</div>
        
        {/* Mock facility areas with incidents */}
        <div className="absolute top-6 left-4 w-8 h-8 bg-yellow-200 rounded border flex items-center justify-center">
          <span className={`w-3 h-3 rounded-full ${getSeverityColor('Medium')}`}></span>
        </div>
        <div className="absolute top-6 right-4 w-8 h-8 bg-blue-200 rounded border flex items-center justify-center">
          <span className={`w-3 h-3 rounded-full ${getSeverityColor('Low')}`}></span>
        </div>
        <div className="absolute bottom-6 left-4 w-8 h-8 bg-orange-200 rounded border flex items-center justify-center">
          <span className={`w-3 h-3 rounded-full ${getSeverityColor('High')}`}></span>
        </div>
        <div className="absolute bottom-6 right-4 w-8 h-8 bg-cyan-200 rounded border flex items-center justify-center">
          <span className={`w-3 h-3 rounded-full ${getSeverityColor('Medium')}`}></span>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-200 rounded border flex items-center justify-center">
          <span className={`w-3 h-3 rounded-full ${getSeverityColor('Low')}`}></span>
        </div>
        
        <div className="text-xs text-gray-400 absolute bottom-1 right-1">Interactive Map</div>
      </div>
      
      {/* Recent incidents list */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Incidents</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {incidentLocations.slice(0, 3).map(incident => (
            <div key={incident.id} className="flex justify-between items-center text-xs bg-gray-50 rounded p-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${getSeverityColor(incident.severity)}`}></span>
                <span className="font-medium">{incident.type}</span>
              </div>
              <div className="text-right">
                <div className="text-gray-600">{incident.location}</div>
                <div className={`font-medium ${getStatusColor(incident.status)}`}>{incident.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}