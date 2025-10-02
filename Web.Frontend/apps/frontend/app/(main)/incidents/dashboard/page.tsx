"use client";

import { useState } from 'react';
import IncidentsDashboardCustomizer from '@/components/dashboard/IncidentsDashboardCustomizer';

export default function IncidentReports() {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive incident analysis and safety reporting</p>
            </div>
            <div className="flex gap-3">
              {/* Header buttons handled by dashboard customizer */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16">
        <IncidentsDashboardCustomizer 
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
        />
      </div>
    </div>
  );
}