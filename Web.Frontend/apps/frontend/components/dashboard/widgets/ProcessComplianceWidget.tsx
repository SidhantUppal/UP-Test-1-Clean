'use client';

import React from 'react';

interface ProcessComplianceWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function ProcessComplianceWidget({ id, isEditMode }: ProcessComplianceWidgetProps) {
  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Monitoring</h3>
      <p className="text-sm text-gray-600">Process compliance and audit readiness</p>
      <div className="mt-4 text-center text-gray-400">Widget content coming soon...</div>
    </div>
  );
}