"use client";

import React from 'react';
import Link from 'next/link';
import DashboardWidget from '@/components/dashboard/DashboardWidget';

const quickActions = [
  { 
    id: 1, 
    title: 'Report Incident', 
    href: '/incidents/form', 
    icon: '🚨', 
    color: 'bg-red-50 hover:bg-red-100 text-red-700',
    description: 'Quick incident reporting'
  },
  { 
    id: 2, 
    title: 'Submit Timesheet', 
    href: '/timesheets/new', 
    icon: '⏰', 
    color: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
    description: 'Log your hours'
  },
  { 
    id: 3, 
    title: 'Book Training', 
    href: '/e-learning/courses', 
    icon: '📚', 
    color: 'bg-green-50 hover:bg-green-100 text-green-700',
    description: 'Schedule courses'
  },
  { 
    id: 4, 
    title: 'Request Leave', 
    href: '/leave/request', 
    icon: '🏖️', 
    color: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
    description: 'Holiday requests'
  },
  { 
    id: 5, 
    title: 'View Documents', 
    href: '/documents', 
    icon: '📁', 
    color: 'bg-orange-50 hover:bg-orange-100 text-orange-700',
    description: 'Access files'
  },
  { 
    id: 6, 
    title: 'Help Center', 
    href: '/help', 
    icon: '❓', 
    color: 'bg-gray-50 hover:bg-gray-100 text-gray-700',
    description: 'Get support'
  }
];

interface QuickActionsWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function QuickActionsWidget({ id, isEditMode, onRemove }: QuickActionsWidgetProps) {
  return (
    <DashboardWidget 
      id={id}
      title="Quick Actions" 
      type="actions"
      isEditMode={isEditMode}
      onRemove={onRemove}
    >
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link 
            key={action.id} 
            href={action.href}
            className={`p-3 rounded-lg transition-all duration-200 block ${action.color} hover:scale-105`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{action.icon}</span>
              <span className="font-medium text-sm">{action.title}</span>
            </div>
            <p className="text-xs opacity-70">{action.description}</p>
          </Link>
        ))}
      </div>
    </DashboardWidget>
  );
}