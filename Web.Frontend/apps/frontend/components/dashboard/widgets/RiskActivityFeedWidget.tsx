"use client";

import React from 'react';
import Link from 'next/link';

interface RiskActivityFeedWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskActivityFeedWidget({ id, isEditMode }: RiskActivityFeedWidgetProps) {
  // Mock risk assessment activity data - replace with real API call
  const activities = [
    {
      id: 1,
      type: 'assessment_completed',
      title: 'Workplace Hazard Assessment - Floor 3',
      user: 'Sarah Johnson',
      time: '5 min ago',
      riskLevel: 'Medium',
      color: 'yellow'
    },
    {
      id: 2,
      type: 'high_risk_identified',
      title: 'Chemical Storage Risk Assessment',
      user: 'Mike Davis',
      time: '1 hour ago',
      riskLevel: 'High',
      color: 'red'
    },
    {
      id: 3,
      type: 'mitigation_implemented',
      title: 'Fire Safety Risk - Emergency Exits',
      user: 'Emma Wilson',
      time: '2 hours ago',
      riskLevel: 'Low',
      color: 'green'
    },
    {
      id: 4,
      type: 'assessment_overdue',
      title: 'Equipment Safety Assessment',
      user: 'John Smith',
      time: '4 hours ago',
      riskLevel: 'High',
      color: 'red'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment_completed':
        return '✅';
      case 'high_risk_identified':
        return '🚨';
      case 'mitigation_implemented':
        return '🛡️';
      case 'assessment_overdue':
        return '⚠️';
      default:
        return '📋';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'assessment_completed':
        return 'Assessment Completed';
      case 'high_risk_identified':
        return 'High Risk Identified';
      case 'mitigation_implemented':
        return 'Mitigation Implemented';
      case 'assessment_overdue':
        return 'Assessment Overdue';
      default:
        return 'Risk Update';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  return (
    <Link href="/risk-assessments" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Risk Activity</h3>
          <div className="text-sm text-red-600 pointer-events-none">View All</div>
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
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">by {activity.user}</p>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(activity.riskLevel)}`}>
                  {activity.riskLevel} Risk
                </span>
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