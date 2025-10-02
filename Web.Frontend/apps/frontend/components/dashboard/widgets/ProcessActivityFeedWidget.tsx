'use client';

import React from 'react';
import Link from 'next/link';

interface ProcessActivityFeedWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function ProcessActivityFeedWidget({ id, isEditMode }: ProcessActivityFeedWidgetProps) {
  const activities = [
    { id: 1, type: 'completed', message: 'Safety Inspection Process completed successfully', time: '2 min ago', process: 'SI-2024-156' },
    { id: 2, type: 'started', message: 'Contractor Onboarding workflow initiated', time: '8 min ago', process: 'CO-2024-089' },
    { id: 3, type: 'failed', message: 'Document validation failed - missing signatures', time: '15 min ago', process: 'DV-2024-234' },
    { id: 4, type: 'approval', message: 'Manager approval required for budget override', time: '32 min ago', process: 'BO-2024-045' },
    { id: 5, type: 'automated', message: 'Weekly compliance report generated automatically', time: '1 hour ago', process: 'CR-2024-078' },
    { id: 6, type: 'escalated', message: 'Equipment maintenance escalated to supervisor', time: '2 hours ago', process: 'EM-2024-123' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return '✅';
      case 'started': return '🚀';
      case 'failed': return '❌';
      case 'approval': return '⏳';
      case 'automated': return '🤖';
      case 'escalated': return '🚨';
      default: return '📋';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'started': return 'text-blue-600 bg-blue-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'approval': return 'text-yellow-600 bg-yellow-50';
      case 'automated': return 'text-purple-600 bg-purple-50';
      case 'escalated': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Link href="/process-home" className="block h-full">
      <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Process Activity</h3>
          <p className="text-sm text-gray-600">Recent process updates and events</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
          <span>Live Feed</span>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-4 mb-4 flex-1 overflow-y-auto max-h-64">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 rounded-full text-sm ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 leading-relaxed">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-mono text-gray-600">{activity.process}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      </div>
    </Link>
  );
}