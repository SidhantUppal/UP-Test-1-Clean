"use client";

import React from 'react';

interface ChecklistCategoryBreakdownWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistCategoryBreakdownWidget({ id, isEditMode }: ChecklistCategoryBreakdownWidgetProps) {
  const categories = [
    {
      id: 1,
      name: 'Safety Inspections',
      total: 45,
      completed: 38,
      inProgress: 5,
      pending: 2,
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Equipment Maintenance',
      total: 32,
      completed: 25,
      inProgress: 4,
      pending: 3,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Quality Control',
      total: 28,
      completed: 22,
      inProgress: 3,
      pending: 3,
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Compliance Audits',
      total: 18,
      completed: 14,
      inProgress: 2,
      pending: 2,
      color: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'Training Records',
      total: 15,
      completed: 12,
      inProgress: 2,
      pending: 1,
      color: 'bg-orange-500'
    }
  ];

  const getCompletionPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>This Quarter</option>
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
            
            {/* Progress Bars */}
            <div className="space-y-2 mb-3">
              {/* Completed */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 w-16">Completed:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(category.completed / category.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 w-8">{category.completed}</span>
              </div>
              
              {/* In Progress */}
              {category.inProgress > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-600 w-16">In Progress:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(category.inProgress / category.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">{category.inProgress}</span>
                </div>
              )}
              
              {/* Pending */}
              {category.pending > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 w-16">Pending:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(category.pending / category.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">{category.pending}</span>
                </div>
              )}
            </div>
            
            {/* Completion Rate */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">
                {getCompletionPercentage(category.completed, category.total)}% complete
              </span>
              {category.pending > 0 && (
                <span className="text-xs text-orange-600 font-medium">
                  {category.pending} pending attention
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View Detailed Category Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}