"use client";

import React from 'react';

interface ChecklistQuickActionsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistQuickActionsWidget({ id, isEditMode }: ChecklistQuickActionsWidgetProps) {
  const quickActions = [
    {
      id: 1,
      title: 'Create Checklist',
      description: 'Build new checklists',
      href: '/checklists/create',
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      id: 2,
      title: 'Assign Tasks',
      description: 'Delegate to team members',
      href: '/checklists/assign',
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      id: 3,
      title: 'View Reports',
      description: 'Analytics & insights',
      href: '/checklists/reports',
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    },
    {
      id: 4,
      title: 'Manage Templates',
      description: 'Edit & organize',
      href: '/checklists/manage',
      color: 'bg-orange-50 border-orange-200 text-orange-600'
    }
  ];

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className={`p-4 rounded-lg border-2 hover:shadow-md transition-all text-left ${action.color}`}
            onClick={() => window.location.href = action.href}
          >
            <div className="font-medium text-sm mb-1">{action.title}</div>
            <div className="text-xs opacity-80">{action.description}</div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">23</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">156</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">42</div>
            <div className="text-xs text-gray-500">Templates</div>
          </div>
        </div>
      </div>
    </div>
  );
}