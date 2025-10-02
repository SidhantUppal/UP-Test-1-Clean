"use client";

import React from 'react';
import Link from 'next/link';

interface TaskActivityFeedWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function TaskActivityFeedWidget({ id, isEditMode }: TaskActivityFeedWidgetProps) {
  // Mock task activity data - replace with real API call
  const activities = [
    {
      id: 1,
      type: 'completed',
      title: 'Safety Inspection - Building A',
      user: 'John Smith',
      time: '2 min ago',
      color: 'green'
    },
    {
      id: 2,
      type: 'assigned',
      title: 'Document Review - Contractor Insurance',
      user: 'You',
      time: '15 min ago',
      color: 'blue'
    },
    {
      id: 3,
      type: 'due_soon',
      title: 'Process Review - Emergency Procedures',
      user: 'Sarah Johnson',
      time: '1 hour ago',
      color: 'yellow'
    },
    {
      id: 4,
      type: 'overdue',
      title: 'Training Assignment - Fire Safety',
      user: 'Mike Davis',
      time: '3 hours ago',
      color: 'red'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return '✅';
      case 'assigned':
        return '📋';
      case 'due_soon':
        return '⏰';
      case 'overdue':
        return '⚠️';
      default:
        return '📋';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'completed':
        return 'Task Completed';
      case 'assigned':
        return 'Task Assigned';
      case 'due_soon':
        return 'Due Soon';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Task Update';
    }
  };

  return (
    <Link href="/tasks" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="text-sm text-blue-600 pointer-events-none">View All</div>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 text-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getActivityLabel(activity.type)}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-700 truncate">{activity.title}</p>
                <p className="text-xs text-gray-500">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
        
        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </Link>
  );
}