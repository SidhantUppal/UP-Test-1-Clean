"use client";

import React from 'react';

interface TaskCategoryBreakdownWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function TaskCategoryBreakdownWidget({ id, isEditMode }: TaskCategoryBreakdownWidgetProps) {
  // Mock task category data
  const categories = [
    {
      id: 1,
      name: 'Document Review',
      total: 45,
      completed: 32,
      inProgress: 8,
      overdue: 5,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Safety Inspection',
      total: 32,
      completed: 28,
      inProgress: 3,
      overdue: 1,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Training Assignment',
      total: 28,
      completed: 20,
      inProgress: 5,
      overdue: 3,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Compliance Check',
      total: 24,
      completed: 18,
      inProgress: 4,
      overdue: 2,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      name: 'Process Review',
      total: 18,
      completed: 12,
      inProgress: 4,
      overdue: 2,
      color: 'bg-indigo-500'
    }
  ];

  const getCompletionPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Task Categories</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>All Time</option>
          <option>This Month</option>
          <option>This Week</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
              </div>
              <div className="text-xs text-gray-500">
                {category.total} total
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${category.color}`}
                  style={{ width: `${getCompletionPercentage(category.completed, category.total)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Status Breakdown */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex space-x-4">
                <span className="text-green-600">
                  ✓ {category.completed} completed
                </span>
                <span className="text-yellow-600">
                  ⏳ {category.inProgress} in progress
                </span>
                {category.overdue > 0 && (
                  <span className="text-red-600">
                    ⚠️ {category.overdue} overdue
                  </span>
                )}
              </div>
              <span className="font-medium text-gray-700">
                {getCompletionPercentage(category.completed, category.total)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View Detailed Breakdown →
          </button>
        </div>
      </div>
    </div>
  );
}