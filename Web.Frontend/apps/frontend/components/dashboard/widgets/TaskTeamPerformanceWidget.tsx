"use client";

import React from 'react';

interface TaskTeamPerformanceWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function TaskTeamPerformanceWidget({ id, isEditMode }: TaskTeamPerformanceWidgetProps) {
  // Mock team performance data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      completedTasks: 15,
      totalTasks: 18,
      completionRate: 83,
      onTime: 14,
      overdue: 1
    },
    {
      id: 2,
      name: 'Mike Davis',
      avatar: 'MD',
      completedTasks: 12,
      totalTasks: 16,
      completionRate: 75,
      onTime: 10,
      overdue: 2
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      completedTasks: 11,
      totalTasks: 14,
      completionRate: 79,
      onTime: 9,
      overdue: 2
    },
    {
      id: 4,
      name: 'John Smith',
      avatar: 'JS',
      completedTasks: 8,
      totalTasks: 12,
      completionRate: 67,
      onTime: 6,
      overdue: 2
    }
  ];

  const getPerformanceColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-100 text-green-800';
    if (rate >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div key={member.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {member.avatar}
              </div>
            </div>
            
            {/* Member Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">{member.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPerformanceColor(member.completionRate)}`}>
                  {member.completionRate}%
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{member.completedTasks}/{member.totalTasks} tasks</span>
                <span>•</span>
                <span className="text-green-600">{member.onTime} on time</span>
                {member.overdue > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-red-600">{member.overdue} overdue</span>
                  </>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      member.completionRate >= 80 ? 'bg-green-500' :
                      member.completionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${member.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Rank Badge */}
            <div className="flex-shrink-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === 0 ? 'bg-yellow-400 text-yellow-900' :
                index === 1 ? 'bg-gray-300 text-gray-700' :
                index === 2 ? 'bg-orange-400 text-orange-900' :
                'bg-gray-200 text-gray-600'
              }`}>
                #{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View Full Team Report →
          </button>
        </div>
      </div>
    </div>
  );
}