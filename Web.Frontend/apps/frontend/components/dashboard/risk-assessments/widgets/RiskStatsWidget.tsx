"use client";

import React from 'react';

// Demo risk stats data
const riskStats = [
  { 
    label: 'Total Assessments', 
    value: 156, 
    change: '+12 this month',
    color: '#3d3a72' // Purple theme
  },
  { 
    label: 'High Risk', 
    value: 8, 
    change: '-2 from last month',
    color: '#EF4444' // Red
  },
  { 
    label: 'Overdue', 
    value: 12, 
    change: '+3 this week',
    color: '#F59E0B' // Yellow/Orange
  },
  { 
    label: 'Completed', 
    value: 124, 
    change: '+18 this month',
    color: '#10B981' // Green
  }
];

interface RiskStatsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function RiskStatsWidget({ id, isEditMode }: RiskStatsWidgetProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Risk Assessment Stats</h3>
        <span className="text-xs text-gray-500">This month</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {riskStats.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h4>
            <p className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>
      
      {/* Summary info */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Completion Rate</span>
          <span className="font-semibold text-green-600">79.5%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: '79.5%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}