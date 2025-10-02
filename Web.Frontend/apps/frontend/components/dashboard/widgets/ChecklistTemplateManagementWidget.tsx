"use client";

import React from 'react';

interface ChecklistTemplateManagementWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistTemplateManagementWidget({ id, isEditMode }: ChecklistTemplateManagementWidgetProps) {
  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Management</h3>
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">🗂️</div>
        <p className="text-sm">Template management widget coming soon</p>
      </div>
    </div>
  );
}