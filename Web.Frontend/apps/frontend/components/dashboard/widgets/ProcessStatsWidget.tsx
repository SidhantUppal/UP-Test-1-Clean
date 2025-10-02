'use client';

import React from 'react';
import Link from 'next/link';

interface ProcessStatsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function ProcessStatsWidget({ id, isEditMode }: ProcessStatsWidgetProps) {
  const stats = {
    activeProcesses: 24,
    completedToday: 156,
    efficiency: 94,
    avgTime: '3.2h',
    automation: 78
  };

  return (
    <Link href="/process-home" className="block h-full">
      <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Process Overview</h3>
          <p className="text-sm text-gray-600">Key process metrics and indicators</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
          <span>Live</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.activeProcesses}</div>
          <div className="text-xs text-blue-700 mt-1">Active</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
          <div className="text-xs text-green-700 mt-1">Completed</div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Efficiency Rate</span>
            <span className="text-sm font-medium text-gray-900">{stats.efficiency}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.efficiency}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Automation</span>
            <span className="text-sm font-medium text-gray-900">{stats.automation}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.automation}%` }}
            ></div>
          </div>
        </div>
      </div>

      </div>
    </Link>
  );
}