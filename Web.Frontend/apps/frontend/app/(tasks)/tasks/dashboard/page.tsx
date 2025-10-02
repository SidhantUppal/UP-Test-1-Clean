"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TasksDashboardCustomizer from '@/components/dashboard/TasksDashboardCustomizer';

export default function TasksDashboardPage() {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Tasks Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview and analytics for task management</p>
            </div>
            <div className="flex gap-3">
              {/* Header buttons can be added here if needed */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16">
        <TasksDashboardCustomizer 
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
        />
      </div>
    </div>
  );
}