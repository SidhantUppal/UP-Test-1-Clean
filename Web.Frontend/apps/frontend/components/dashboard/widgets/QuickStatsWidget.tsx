"use client";

import React from 'react';
import DashboardWidget from '@/components/dashboard/DashboardWidget';

// Demo data
const quickStats = [
  { label: 'Tasks Today', value: '8', change: '+12%', color: 'text-purple-600', bgColor: 'bg-white border border-gray-200' },
  { label: 'Training Progress', value: '67%', change: '+5%', color: 'text-purple-600', bgColor: 'bg-white border border-gray-200' },
  { label: 'Safety Score', value: '98%', change: '0%', color: 'text-purple-600', bgColor: 'bg-white border border-gray-200' },
  { label: 'Compliance', value: '94%', change: '+2%', color: 'text-purple-600', bgColor: 'bg-white border border-gray-200' }
];

interface QuickStatsWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function QuickStatsWidget({ id, isEditMode, onRemove }: QuickStatsWidgetProps) {
  return (
    <DashboardWidget 
      id={id}
      title="Quick Stats" 
      type="stats"
      isEditMode={isEditMode}
      onRemove={onRemove}
      className="col-span-2"
    >
      <div className="grid grid-cols-2 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg ${stat.bgColor}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  );
}