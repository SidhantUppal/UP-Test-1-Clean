"use client";

import React from 'react';

interface RiskQuickActionsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function RiskQuickActionsWidget({ id, isEditMode }: RiskQuickActionsWidgetProps) {
  const quickActions = [
    {
      id: 1,
      title: 'New Assessment',
      description: 'Create a new risk assessment',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200',
      action: () => alert('Navigate to: Create New Risk Assessment')
    },
    {
      id: 2,
      title: 'Quick Review',
      description: 'Review pending assessments',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200',
      action: () => alert('Navigate to: Pending Reviews')
    },
    {
      id: 3,
      title: 'Export Report',
      description: 'Download assessment reports',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200',
      action: () => alert('Generate and download report')
    },
    {
      id: 4,
      title: 'Bulk Actions',
      description: 'Manage multiple assessments',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200',
      action: () => alert('Navigate to: Bulk Management')
    },
    {
      id: 5,
      title: 'Templates',
      description: 'Manage assessment templates',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200',
      action: () => alert('Navigate to: Templates')
    },
    {
      id: 6,
      title: 'Analytics',
      description: 'View detailed analytics',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200',
      action: () => alert('Navigate to: Analytics Dashboard')
    }
  ];

  return (
    <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-800">Quick Actions</h3>
        <span className="text-xs text-gray-500">Shortcuts</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            disabled={isEditMode}
            className={`${action.color} ${
              isEditMode 
                ? 'cursor-not-allowed opacity-50' 
                : 'cursor-pointer hover:shadow-sm'
            } p-2 md:p-3 rounded-lg border transition-all duration-200 text-left min-h-[60px] md:min-h-[70px] lg:min-h-[80px] flex flex-col justify-between`}
            title={action.description}
          >
            <div className="flex items-center mb-1">
              <span className="font-medium text-xs md:text-sm">{action.title}</span>
            </div>
            <p className="text-xs opacity-75 leading-tight">{action.description}</p>
          </button>
        ))}
      </div>
      
      {/* Recent activity indicator */}
      <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-gray-600">
          <span>Recent Activity:</span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
            <span className="truncate">Assessment created 2 min ago</span>
          </span>
        </div>
      </div>
      
      {/* Usage stats */}
      <div className="mt-2 md:mt-3">
        <div className="grid grid-cols-3 gap-1 md:gap-3 text-center">
          <div className="text-xs">
            <div className="font-semibold text-purple-600 text-sm md:text-base">12</div>
            <div className="text-gray-500 text-xs">Today</div>
          </div>
          <div className="text-xs">
            <div className="font-semibold text-blue-600 text-sm md:text-base">85</div>
            <div className="text-gray-500 text-xs">This Week</div>
          </div>
          <div className="text-xs">
            <div className="font-semibold text-green-600 text-sm md:text-base">324</div>
            <div className="text-gray-500 text-xs">This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}