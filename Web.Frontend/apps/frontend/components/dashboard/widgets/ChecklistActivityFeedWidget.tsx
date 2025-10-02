"use client";

import React from 'react';

interface ChecklistActivityFeedWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistActivityFeedWidget({ id, isEditMode }: ChecklistActivityFeedWidgetProps) {
  const activities = [
    {
      id: 1,
      type: 'checklist_completed',
      user: 'John Smith',
      action: 'completed',
      target: 'Safety Inspection Checklist',
      time: '2 mins ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'checklist_assigned',
      user: 'Sarah Johnson',
      action: 'assigned',
      target: 'Equipment Maintenance',
      time: '15 mins ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'template_created',
      user: 'Mike Davis',
      action: 'created template',
      target: 'Quality Control Process',
      time: '1 hour ago',
      priority: 'low'
    },
    {
      id: 4,
      type: 'checklist_overdue',
      user: 'System',
      action: 'flagged overdue',
      target: 'Weekly Fire Safety Check',
      time: '2 hours ago',
      priority: 'critical'
    },
    {
      id: 5,
      type: 'checklist_started',
      user: 'Lisa Brown',
      action: 'started',
      target: 'Daily Cleaning Protocol',
      time: '3 hours ago',
      priority: 'medium'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'checklist_completed': return '✅';
      case 'checklist_assigned': return '👤';
      case 'template_created': return '📋';
      case 'checklist_overdue': return '⚠️';
      case 'checklist_started': return '▶️';
      default: return '📄';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`border-l-4 pl-4 py-3 rounded-r-lg ${getPriorityColor(activity.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-gray-600">{activity.action}</span>{' '}
                    <span className="font-medium text-blue-600">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Load More Activities →
          </button>
        </div>
      </div>
    </div>
  );
}