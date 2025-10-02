"use client";

import React from 'react';
import DashboardWidget from '@/components/dashboard/DashboardWidget';

// Demo data
const recentActivity = [
  { 
    id: 1, 
    type: 'training', 
    title: 'Completed Fire Safety Course', 
    time: '2 hours ago', 
    icon: '🎓',
    color: 'text-green-600'
  },
  { 
    id: 2, 
    type: 'task', 
    title: 'Submitted Weekly Report', 
    time: '4 hours ago', 
    icon: '📋',
    color: 'text-blue-600'
  },
  { 
    id: 3, 
    type: 'document', 
    title: 'Viewed Safety Procedures', 
    time: '1 day ago', 
    icon: '📄',
    color: 'text-purple-600'
  },
  { 
    id: 4, 
    type: 'meeting', 
    title: 'Attended Team Meeting', 
    time: '2 days ago', 
    icon: '👥',
    color: 'text-orange-600'
  },
  { 
    id: 5, 
    type: 'achievement', 
    title: 'Perfect Safety Record - 30 days', 
    time: '3 days ago', 
    icon: '🏆',
    color: 'text-yellow-600'
  }
];

interface ActivityFeedWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function ActivityFeedWidget({ id, isEditMode, onRemove }: ActivityFeedWidgetProps) {
  return (
    <DashboardWidget 
      id={id}
      title="Recent Activity" 
      type="Activity"
      isEditMode={isEditMode}
      onRemove={onRemove}
    >
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-xl">{activity.icon}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`}></div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  );
}