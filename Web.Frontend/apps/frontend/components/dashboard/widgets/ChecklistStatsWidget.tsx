"use client";

import React from 'react';
import Link from 'next/link';

interface ChecklistStatsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistStatsWidget({ id, isEditMode }: ChecklistStatsWidgetProps) {
  const checklistStats = {
    totalChecklists: 156,
    activeChecklists: 23,
    completedToday: 18,
    pendingTasks: 12,
    overdueTasks: 3,
    complianceRate: 94,
    avgCompletionTime: 8.5,
    templatesCount: 42
  };

  return (
    <Link href="/checklists" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Checklist Overview</h3>
          <select className="text-sm border border-gray-300 rounded px-2 py-1 pointer-events-none">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{checklistStats.totalChecklists}</div>
            <div className="text-sm text-gray-600">Total Checklists</div>
            <div className="text-xs text-gray-500 mt-1">+12 this month</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{checklistStats.activeChecklists}</div>
            <div className="text-sm text-gray-600">Active Tasks</div>
            <div className="text-xs text-gray-500 mt-1">In progress</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{checklistStats.completedToday}</div>
            <div className="text-sm text-gray-600">Completed Today</div>
            <div className="text-xs text-gray-500 mt-1">+5 vs yesterday</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{checklistStats.pendingTasks}</div>
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-xs text-red-500 mt-1">{checklistStats.overdueTasks} overdue</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Compliance Rate</span>
              <div className="text-lg font-semibold text-gray-900">{checklistStats.complianceRate}%</div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600">Avg. Time</span>
              <div className="text-lg font-semibold text-gray-900">{checklistStats.avgCompletionTime}m</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}