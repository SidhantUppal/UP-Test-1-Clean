"use client";

import React from 'react';

interface IncidentTrendsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function IncidentTrendsWidget({ id, isEditMode }: IncidentTrendsWidgetProps) {
  // Mock incident trends data - replace with real API call
  const trendsData = [
    { period: 'Jan', incidents: 8, nearMisses: 12, resolved: 7 },
    { period: 'Feb', incidents: 12, nearMisses: 15, resolved: 10 },
    { period: 'Mar', incidents: 6, nearMisses: 18, resolved: 8 },
    { period: 'Apr', incidents: 15, nearMisses: 22, resolved: 14 },
    { period: 'May', incidents: 9, nearMisses: 16, resolved: 12 },
    { period: 'Jun', incidents: 11, nearMisses: 14, resolved: 9 },
    { period: 'Jul', incidents: 7, nearMisses: 11, resolved: 8 }
  ];

  const maxValue = Math.max(...trendsData.map(d => Math.max(d.incidents, d.nearMisses)));

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Incident Trends</h3>
          <p className="text-sm text-gray-500">Monthly incident and near-miss reporting</p>
        </div>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span>Incidents</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
            <span>Near Misses</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span>Resolved</span>
          </div>
        </div>
      </div>
      
      {/* Simple Line Chart */}
      <div className="flex items-end justify-between h-32 border-b border-gray-200">
        {trendsData.map((data, index) => (
          <div key={index} className="flex flex-col items-center space-y-1" style={{ width: '12%' }}>
            <div className="flex space-x-1 items-end">
              {/* Incidents bar */}
              <div 
                className="bg-red-500 rounded-t w-2 transition-all"
                style={{ height: `${(data.incidents / maxValue) * 80}px` }}
                title={`Incidents: ${data.incidents}`}
              ></div>
              {/* Near Misses bar */}
              <div 
                className="bg-yellow-500 rounded-t w-2 transition-all"
                style={{ height: `${(data.nearMisses / maxValue) * 80}px` }}
                title={`Near Misses: ${data.nearMisses}`}
              ></div>
              {/* Resolved bar */}
              <div 
                className="bg-green-500 rounded-t w-2 transition-all"
                style={{ height: `${(data.resolved / maxValue) * 80}px` }}
                title={`Resolved: ${data.resolved}`}
              ></div>
            </div>
            <span className="text-xs text-gray-600">{data.period}</span>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">
            {trendsData.reduce((sum, d) => sum + d.incidents, 0)}
          </div>
          <div className="text-xs text-gray-500">Total Incidents</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-600">
            {trendsData.reduce((sum, d) => sum + d.nearMisses, 0)}
          </div>
          <div className="text-xs text-gray-500">Near Misses</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {Math.round((trendsData.reduce((sum, d) => sum + d.resolved, 0) / trendsData.reduce((sum, d) => sum + d.incidents, 0)) * 100)}%
          </div>
          <div className="text-xs text-gray-500">Resolution Rate</div>
        </div>
      </div>
    </div>
  );
}