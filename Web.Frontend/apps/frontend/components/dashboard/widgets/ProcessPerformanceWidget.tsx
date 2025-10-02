'use client';

import React from 'react';

interface ProcessPerformanceWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function ProcessPerformanceWidget({ id, isEditMode }: ProcessPerformanceWidgetProps) {
  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Analysis</h3>
      <p className="text-sm text-gray-600">Detailed performance metrics and trends</p>
      <div className="mt-4 text-center text-gray-400">Widget content coming soon...</div>
    </div>
  );
}