"use client";

import React from 'react';

interface BehaviouralSafetyQuickActionsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyQuickActionsWidget({ id, isEditMode }: BehaviouralSafetyQuickActionsWidgetProps) {
  const quickActions = [
    {
      id: 1,
      title: 'Quick Report',
      description: 'Submit safety observation',
      color: 'bg-green-50 border-green-200 text-green-600',
      action: 'report'
    },
    {
      id: 2,
      title: 'Safety Walk',
      description: 'Start safety walk',
      color: 'bg-blue-50 border-blue-200 text-blue-600',
      action: 'walk'
    },
    {
      id: 3,
      title: 'View Insights',
      description: 'Analytics & trends',
      color: 'bg-purple-50 border-purple-200 text-purple-600',
      action: 'insights'
    },
    {
      id: 4,
      title: 'My Impact',
      description: 'Personal contributions',
      color: 'bg-teal-50 border-teal-200 text-teal-600',
      action: 'impact'
    }
  ];

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'report':
        // Trigger quick report modal
        break;
      case 'walk':
        window.location.href = '/incidents/behaviour/walks';
        break;
      case 'insights':
        window.location.href = '/incidents/behaviour/insights';
        break;
      case 'impact':
        window.location.href = '/incidents/behaviour/my-impact';
        break;
    }
  };

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
            onClick={() => handleActionClick(action.action)}
          >
            <div className="font-medium text-sm mb-1">{action.title}</div>
            <div className="text-xs opacity-80">{action.description}</div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">47</div>
            <div className="text-xs text-gray-500">Reports Today</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">1,840</div>
            <div className="text-xs text-gray-500">Team Points</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">76%</div>
            <div className="text-xs text-gray-500">Participation</div>
          </div>
        </div>
      </div>
    </div>
  );
}