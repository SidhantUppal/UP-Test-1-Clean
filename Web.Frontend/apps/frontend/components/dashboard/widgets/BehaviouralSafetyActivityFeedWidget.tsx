"use client";

import React from 'react';

interface BehaviouralSafetyActivityFeedWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyActivityFeedWidget({ id, isEditMode }: BehaviouralSafetyActivityFeedWidgetProps) {
  const activities = [
    {
      id: 1,
      type: 'intervention',
      user: 'Sarah Johnson',
      action: 'reported safety intervention',
      target: 'PPE compliance coaching',
      time: '3 mins ago',
      points: 15,
      category: 'Intervention'
    },
    {
      id: 2,
      type: 'save',
      user: 'Mike Davis',
      action: 'prevented near miss',
      target: 'Forklift safety hazard',
      time: '12 mins ago',
      points: 25,
      category: 'Save'
    },
    {
      id: 3,
      type: 'good_behavior',
      user: 'John Smith',
      action: 'observed positive behavior',
      target: 'Proper lifting technique',
      time: '45 mins ago',
      points: 10,
      category: 'Good Behavior'
    },
    {
      id: 4,
      type: 'training',
      user: 'Lisa Brown',
      action: 'completed quick training',
      target: 'Ladder safety reminder',
      time: '1 hour ago',
      points: 5,
      category: 'Quick Training'
    },
    {
      id: 5,
      type: 'hazard',
      user: 'David Wilson',
      action: 'reported hazard',
      target: 'Wet floor condition',
      time: '2 hours ago',
      points: 12,
      category: 'Hazard'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'intervention': return '👥';
      case 'save': return '🛡️';
      case 'good_behavior': return '⭐';
      case 'training': return '📚';
      case 'hazard': return '⚠️';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Intervention': return 'border-l-blue-500 bg-blue-50';
      case 'Save': return 'border-l-green-500 bg-green-50';
      case 'Good Behavior': return 'border-l-purple-500 bg-purple-50';
      case 'Quick Training': return 'border-l-orange-500 bg-orange-50';
      case 'Hazard': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
        <button className="text-sm text-green-600 hover:text-green-800">
          View All
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`border-l-4 pl-4 py-3 rounded-r-lg ${getCategoryColor(activity.category)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-gray-600">{activity.action}</span>
                  </p>
                  <p className="text-sm font-medium text-green-600 mt-1">{activity.target}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      +{activity.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-green-600 hover:text-green-800">
            Load More Activities →
          </button>
        </div>
      </div>
    </div>
  );
}