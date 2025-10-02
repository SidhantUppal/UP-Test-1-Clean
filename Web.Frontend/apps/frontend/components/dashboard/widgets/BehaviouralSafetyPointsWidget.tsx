"use client";

import React from 'react';

interface BehaviouralSafetyPointsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyPointsWidget({ id, isEditMode }: BehaviouralSafetyPointsWidgetProps) {
  const pointsData = {
    totalPoints: 1840,
    weeklyGoal: 2000,
    dailyAverage: 263,
    weeklyIncrease: 18,
    topContributors: [
      { name: 'Sarah J.', points: 145, badge: '🏆' },
      { name: 'Mike D.', points: 132, badge: '🥈' },
      { name: 'John S.', points: 118, badge: '🥉' },
      { name: 'Lisa B.', points: 95, badge: '' }
    ]
  };

  const progressPercentage = Math.min((pointsData.totalPoints / pointsData.weeklyGoal) * 100, 100);

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Team Points</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
        </select>
      </div>
      
      {/* Points Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold text-green-600">{pointsData.totalPoints}</span>
          <span className="text-sm text-gray-500">Goal: {pointsData.weeklyGoal}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>Weekly Progress: {Math.round(progressPercentage)}%</span>
          <span>+{pointsData.weeklyIncrease}% from last week</span>
        </div>
      </div>
      
      {/* Top Contributors */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Top Contributors</h4>
        <div className="space-y-2">
          {pointsData.topContributors.map((contributor, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{contributor.badge || '👤'}</span>
                <span className="text-sm font-medium text-gray-900">{contributor.name}</span>
              </div>
              <span className="text-sm font-semibold text-green-600">{contributor.points} pts</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{pointsData.dailyAverage}</div>
          <div className="text-sm text-gray-600">Daily Average</div>
        </div>
      </div>
    </div>
  );
}