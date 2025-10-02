"use client";

import React from 'react';
import Link from 'next/link';

interface RiskQuickActionsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskQuickActionsWidget({ id, isEditMode }: RiskQuickActionsWidgetProps) {
  const quickActions = [
    {
      id: 1,
      title: 'New Assessment',
      description: 'Create risk assessment',
      icon: '➕',
      href: '/risk-assessments/create',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 2,
      title: 'My Assessments',
      description: 'View assigned risks',
      icon: '📋',
      href: '/risk-assessments/my',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 3,
      title: 'Risk Reports',
      description: 'Risk analytics',
      icon: '📊',
      href: '/risk-assessments/reports',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-xs text-gray-500">Frequently used risk operations</p>
      </div>
      
      <div className="space-y-3">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`flex items-center p-3 rounded-lg ${action.color} text-white transition-all hover:shadow-md ${isEditMode ? 'pointer-events-none' : ''}`}
          >
            <div className="flex-shrink-0 text-lg mr-3">
              {action.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{action.title}</div>
              <div className="text-xs opacity-90">{action.description}</div>
            </div>
            <div className="ml-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
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