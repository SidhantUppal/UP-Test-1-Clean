"use client";

import React from 'react';

interface EnvironmentalStatsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function EnvironmentalStatsWidget({ id, isEditMode }: EnvironmentalStatsWidgetProps) {
  const statsData = {
    todayReports: 23,
    activeIncidents: 5,
    complianceScore: 92,
    participation: 84,
    trends: {
      reports: '+3',
      incidents: '-2',
      compliance: '+1',
      participation: '+8'
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Environmental Stats</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{statsData.todayReports}</div>
          <div className="text-sm text-gray-600">Today's Reports</div>
          <div className="text-xs text-green-600 mt-1">{statsData.trends.reports} from yesterday</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{statsData.activeIncidents}</div>
          <div className="text-sm text-gray-600">Active Incidents</div>
          <div className="text-xs text-green-600 mt-1">{statsData.trends.incidents} from yesterday</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{statsData.complianceScore}%</div>
          <div className="text-sm text-gray-600">Compliance</div>
          <div className="text-xs text-green-600 mt-1">{statsData.trends.compliance}% this month</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{statsData.participation}%</div>
          <div className="text-sm text-gray-600">Participation</div>
          <div className="text-xs text-green-600 mt-1">{statsData.trends.participation}% active today</div>
        </div>
      </div>
    </div>
  );
}