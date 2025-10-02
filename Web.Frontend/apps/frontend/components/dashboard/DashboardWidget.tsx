"use client";

import React from 'react';

interface DashboardWidgetProps {
  id: string;
  title: string;
  type: string;
  children: React.ReactNode;
  onRemove?: (id: string) => void;
  isEditMode?: boolean;
  className?: string;
}

export default function DashboardWidget({ 
  id, 
  title, 
  type, 
  children, 
  onRemove, 
  isEditMode = false,
  className = ""
}: DashboardWidgetProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group ${className}`}>
      {/* Widget Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{type}</span>
        </div>
        
        {isEditMode && (
          <div className="flex gap-2">
            <button 
              onClick={() => onRemove?.(id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 text-sm"
              title="Remove widget"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      
      {/* Widget Content */}
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
}