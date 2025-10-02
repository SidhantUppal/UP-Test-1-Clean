"use client";

import React from 'react';

interface TaskCompletionTrendsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function TaskCompletionTrendsWidget({ id, isEditMode }: TaskCompletionTrendsWidgetProps) {
  // Mock completion trends data - replace with real API call
  const trendsData = [
    { period: 'Mon', completed: 12, created: 15 },
    { period: 'Tue', completed: 15, created: 18 },
    { period: 'Wed', completed: 8, created: 12 },
    { period: 'Thu', completed: 22, created: 20 },
    { period: 'Fri', completed: 18, created: 16 },
    { period: 'Sat', completed: 5, created: 8 },
    { period: 'Sun', completed: 3, created: 4 }
  ];

  const maxValue = Math.max(...trendsData.map(d => Math.max(d.completed, d.created)));

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Task Completion Trends</h3>
          <p className="text-sm text-gray-500">Weekly overview</p>
        </div>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
            <span>Created</span>
          </div>
        </div>
      </div>
      
      {/* Simple Bar Chart */}
      <div className="flex items-end justify-between h-32 border-b border-gray-200">
        {trendsData.map((data, index) => (
          <div key={index} className="flex flex-col items-center space-y-1" style={{ width: '12%' }}>
            <div className="flex space-x-1 items-end">
              {/* Completed bar */}
              <div 
                className="bg-green-500 rounded-t w-2 transition-all"
                style={{ height: `${(data.completed / maxValue) * 80}px` }}
                title={`Completed: ${data.completed}`}
              ></div>
              {/* Created bar */}
              <div 
                className="bg-blue-500 rounded-t w-2 transition-all"
                style={{ height: `${(data.created / maxValue) * 80}px` }}
                title={`Created: ${data.created}`}
              ></div>
            </div>
            <span className="text-xs text-gray-600">{data.period}</span>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {trendsData.reduce((sum, d) => sum + d.completed, 0)}
          </div>
          <div className="text-xs text-gray-500">Week Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {trendsData.reduce((sum, d) => sum + d.created, 0)}
          </div>
          <div className="text-xs text-gray-500">New Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">
            {Math.round((trendsData.reduce((sum, d) => sum + d.completed, 0) / trendsData.reduce((sum, d) => sum + d.created, 0)) * 100)}%
          </div>
          <div className="text-xs text-gray-500">Completion Rate</div>
        </div>
      </div>
    </div>
  );
}