"use client";

import React from 'react';

interface ChecklistProgressWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistProgressWidget({ id, isEditMode }: ChecklistProgressWidgetProps) {
  const progressData = [
    { category: 'Safety', completed: 85, total: 120, percentage: 71 },
    { category: 'Maintenance', completed: 42, total: 65, percentage: 65 },
    { category: 'Quality', completed: 38, total: 45, percentage: 84 },
    { category: 'Compliance', completed: 28, total: 35, percentage: 80 }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Safety': return 'bg-red-500';
      case 'Maintenance': return 'bg-blue-500';
      case 'Quality': return 'bg-green-500';
      case 'Compliance': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Progress Tracking</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>This Month</option>
          <option>This Week</option>
          <option>Today</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {progressData.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`}></div>
                <span className="text-sm font-medium text-gray-900">{item.category}</span>
              </div>
              <div className="text-xs text-gray-500">
                {item.completed}/{item.total} completed
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full ${getCategoryColor(item.category)} transition-all duration-300`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
              <span className="text-xs text-gray-500">
                {item.total - item.completed} remaining
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">73%</div>
          <div className="text-sm text-gray-600">Overall Completion Rate</div>
          <div className="text-xs text-green-600 mt-1">+5% from last month</div>
        </div>
      </div>
    </div>
  );
}