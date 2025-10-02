"use client";

import React from 'react';
import Link from 'next/link';

interface TaskStatsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function TaskStatsWidget({ id, isEditMode }: TaskStatsWidgetProps) {
  // Mock task stats data - replace with real API call
  const taskStats = {
    total: 247,
    inProgress: 42,
    completed: 189,
    overdue: 16,
    completionRate: 78
  };

  return (
    <Link href="/tasks" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Task Overview</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Completion Rate</span>
            <span className="text-sm font-bold text-green-600">{taskStats.completionRate}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
            <div className="text-xs text-gray-500">Total Tasks</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{taskStats.inProgress}</div>
            <div className="text-xs text-gray-500">In Progress</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
            <div className="text-xs text-gray-500">Overdue</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{taskStats.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${taskStats.completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}