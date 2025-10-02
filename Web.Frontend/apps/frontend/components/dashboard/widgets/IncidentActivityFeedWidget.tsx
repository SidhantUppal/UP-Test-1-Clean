"use client";

import React from 'react';
import Link from 'next/link';

interface IncidentActivityFeedWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function IncidentActivityFeedWidget({ id, isEditMode }: IncidentActivityFeedWidgetProps) {
  // Mock incident activity data - replace with real API call
  const activities = [
    {
      id: 1,
      type: 'incident_reported',
      title: 'Slip and Fall - Main Entrance',
      user: 'Security Team',
      time: '10 min ago',
      severity: 'Medium',
      status: 'Investigating'
    },
    {
      id: 2,
      type: 'incident_resolved',
      title: 'Chemical Spill - Lab 3',
      user: 'Sarah Johnson',
      time: '2 hours ago',
      severity: 'High',
      status: 'Resolved'
    },
    {
      id: 3,
      type: 'near_miss',
      title: 'Equipment Malfunction - Press #2',
      user: 'Mike Davis',
      time: '4 hours ago',
      severity: 'Low',
      status: 'Under Review'
    },
    {
      id: 4,
      type: 'follow_up_required',
      title: 'Workplace Injury - Loading Bay',
      user: 'Emma Wilson',
      time: '1 day ago',
      severity: 'High',
      status: 'Follow-up Required'
    }
  ];


  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'incident_reported':
        return 'Incident Reported';
      case 'incident_resolved':
        return 'Incident Resolved';
      case 'near_miss':
        return 'Near Miss Logged';
      case 'follow_up_required':
        return 'Follow-up Required';
      default:
        return 'Incident Update';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'investigating':
        return 'text-blue-600 bg-blue-100';
      case 'under review':
        return 'text-purple-600 bg-purple-100';
      case 'follow-up required':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Link href="/incidents" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="text-sm text-purple-600 pointer-events-none">View All</div>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 text-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getActivityLabel(activity.type)}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-700 truncate">{activity.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSeverityColor(activity.severity)}`}>
                      {activity.severity}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
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