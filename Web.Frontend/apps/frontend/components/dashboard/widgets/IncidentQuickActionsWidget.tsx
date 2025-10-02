"use client";

import React from 'react';
import Link from 'next/link';

interface IncidentQuickActionsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function IncidentQuickActionsWidget({ id, isEditMode }: IncidentQuickActionsWidgetProps) {
  const quickActions = [
    {
      id: 1,
      title: 'Report Incident',
      description: 'Log new incident',
      href: '/incidents/report',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 2,
      title: 'My Incidents',
      description: 'View assigned cases',
      href: '/incidents/my',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 3,
      title: 'Reports',
      description: 'Incident analytics',
      href: '/incidents/reports',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-xs text-gray-500">Common incident operations</p>
      </div>
      
      <div className="space-y-3">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`flex items-center p-3 rounded-lg ${action.color} text-white transition-all hover:shadow-md ${isEditMode ? 'pointer-events-none' : ''}`}
          >
            <div className="flex-1">
              <div className="text-sm font-medium">{action.title}</div>
              <div className="text-xs opacity-90">{action.description}</div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-gray-500 hover:text-gray-700">
            More Actions →
          </button>
        </div>
      </div>
    </div>
  );
}