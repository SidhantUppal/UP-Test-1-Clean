"use client";

import React from 'react';

interface BehaviouralSafetyParticipationWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyParticipationWidget({ id, isEditMode }: BehaviouralSafetyParticipationWidgetProps) {
  const participationData = {
    totalUsers: 125,
    activeToday: 95,
    participationRate: 76,
    departments: [
      { name: 'Production', rate: 85, users: '34/40' },
      { name: 'Warehouse', rate: 78, users: '23/30' },
      { name: 'Maintenance', rate: 65, users: '13/20' },
      { name: 'Quality', rate: 90, users: '18/20' },
      { name: 'Admin', rate: 60, users: '9/15' }
    ],
    weeklyTrend: '+8%'
  };

  const getDepartmentColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Participation</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      {/* Overall Participation */}
      <div className="mb-6">
        <div className="text-center mb-3">
          <div className="text-3xl font-bold text-green-600">{participationData.participationRate}%</div>
          <div className="text-sm text-gray-600">Overall Participation</div>
          <div className="text-xs text-green-600 mt-1">{participationData.weeklyTrend} from last week</div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${participationData.participationRate}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>{participationData.activeToday} active today</span>
          <span>{participationData.totalUsers} total users</span>
        </div>
      </div>
      
      {/* Department Breakdown */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">By Department</h4>
        <div className="space-y-3">
          {participationData.departments.map((dept, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">{dept.users}</span>
                  <span className="text-sm font-medium text-gray-900">{dept.rate}%</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getDepartmentColor(dept.rate)} transition-all duration-300`}
                  style={{ width: `${dept.rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}