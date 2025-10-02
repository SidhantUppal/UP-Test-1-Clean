"use client";

import React from 'react';
import Link from 'next/link';

interface IncidentStatsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function IncidentStatsWidget({ id, isEditMode }: IncidentStatsWidgetProps) {
  // Mock incident stats data - replace with real API call
  const incidentStats = {
    totalIncidents: 127,
    openIncidents: 18,
    closedIncidents: 109,
    nearMisses: 45,
    highSeverity: 8,
    mediumSeverity: 34,
    lowSeverity: 85,
    avgResolutionDays: 3.2
  };

  return (
    <Link href="/incidents" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Incident Overview</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Avg Resolution</span>
            <span className="text-sm font-bold text-blue-600">{incidentStats.avgResolutionDays}d</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{incidentStats.totalIncidents}</div>
            <div className="text-xs text-gray-500">Total Incidents</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{incidentStats.openIncidents}</div>
            <div className="text-xs text-gray-500">Open</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{incidentStats.closedIncidents}</div>
            <div className="text-xs text-gray-500">Closed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{incidentStats.nearMisses}</div>
            <div className="text-xs text-gray-500">Near Misses</div>
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="mt-4 pointer-events-none">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Severity Distribution</span>
            <span>{incidentStats.highSeverity} high severity</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
            <div 
              className="bg-red-500 h-3 transition-all duration-300"
              style={{ width: `${(incidentStats.highSeverity / incidentStats.totalIncidents) * 100}%` }}
              title={`High Severity: ${incidentStats.highSeverity}`}
            ></div>
            <div 
              className="bg-yellow-500 h-3 transition-all duration-300"
              style={{ width: `${(incidentStats.mediumSeverity / incidentStats.totalIncidents) * 100}%` }}
              title={`Medium Severity: ${incidentStats.mediumSeverity}`}
            ></div>
            <div 
              className="bg-green-500 h-3 transition-all duration-300"
              style={{ width: `${(incidentStats.lowSeverity / incidentStats.totalIncidents) * 100}%` }}
              title={`Low Severity: ${incidentStats.lowSeverity}`}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-600">
            <span>🔴 {incidentStats.highSeverity}</span>
            <span>🟡 {incidentStats.mediumSeverity}</span>
            <span>🟢 {incidentStats.lowSeverity}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}