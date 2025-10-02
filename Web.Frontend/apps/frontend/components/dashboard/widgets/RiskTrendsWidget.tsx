"use client";

import React from 'react';

interface RiskTrendsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskTrendsWidget({ id, isEditMode }: RiskTrendsWidgetProps) {
  // Mock risk trends data - replace with real API call
  const trendsData = [
    { period: 'Mon', high: 3, medium: 8, low: 12 },
    { period: 'Tue', high: 2, medium: 10, low: 15 },
    { period: 'Wed', high: 5, medium: 6, low: 8 },
    { period: 'Thu', high: 1, medium: 12, low: 18 },
    { period: 'Fri', high: 4, medium: 9, low: 14 },
    { period: 'Sat', high: 2, medium: 5, low: 6 },
    { period: 'Sun', high: 1, medium: 3, low: 4 }
  ];

  const maxValue = Math.max(...trendsData.map(d => d.high + d.medium + d.low));

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Risk Assessment Trends</h3>
          <p className="text-sm text-gray-500">Weekly risk identification</p>
        </div>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span>High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span>Low</span>
          </div>
        </div>
      </div>
      
      {/* Simple Stacked Bar Chart */}
      <div className="flex items-end justify-between h-32 border-b border-gray-200">
        {trendsData.map((data, index) => (
          <div key={index} className="flex flex-col items-center space-y-1" style={{ width: '12%' }}>
            <div className="flex flex-col items-center">
              {/* Stacked bars */}
              <div className="flex flex-col">
                <div 
                  className="bg-red-500 w-4 transition-all"
                  style={{ height: `${(data.high / maxValue) * 80}px` }}
                  title={`High Risk: ${data.high}`}
                ></div>
                <div 
                  className="bg-yellow-500 w-4 transition-all"
                  style={{ height: `${(data.medium / maxValue) * 80}px` }}
                  title={`Medium Risk: ${data.medium}`}
                ></div>
                <div 
                  className="bg-green-500 w-4 transition-all"
                  style={{ height: `${(data.low / maxValue) * 80}px` }}
                  title={`Low Risk: ${data.low}`}
                ></div>
              </div>
            </div>
            <span className="text-xs text-gray-600">{data.period}</span>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">
            {trendsData.reduce((sum, d) => sum + d.high, 0)}
          </div>
          <div className="text-xs text-gray-500">High Risk</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-600">
            {trendsData.reduce((sum, d) => sum + d.medium, 0)}
          </div>
          <div className="text-xs text-gray-500">Medium Risk</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {trendsData.reduce((sum, d) => sum + d.low, 0)}
          </div>
          <div className="text-xs text-gray-500">Low Risk</div>
        </div>
      </div>
    </div>
  );
}