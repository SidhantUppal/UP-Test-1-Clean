"use client";

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

interface QuickReportModalProps {
  onClose: () => void;
  onCategorySelect: (category: Category) => void;
}

const categories: Category[] = [
  {
    id: 'spill',
    name: 'Spill',
    description: 'Chemical, oil, or other substance spills',
    color: 'bg-red-50 border-red-200 hover:bg-red-100',
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: 'emission',
    name: 'Emission',
    description: 'Air quality, dust, or gas emissions',
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    )
  },
  {
    id: 'waste',
    name: 'Waste',
    description: 'Waste management and disposal issues',
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    icon: (
      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    )
  },
  {
    id: 'water-quality',
    name: 'Water Quality',
    description: 'Water contamination or quality issues',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    )
  },
  {
    id: 'noise',
    name: 'Noise',
    description: 'Noise pollution or sound level concerns',
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 7h4l5-5v20l-5-5H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
      </svg>
    )
  },
  {
    id: 'good-practice',
    name: 'Good Practice',
    description: 'Positive environmental observations',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function QuickReportModal({ onClose, onCategorySelect }: QuickReportModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Environmental Report</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Select the category that best describes your environmental observation or incident:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category)}
                className={`${category.color} border rounded-lg p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {category.icon}
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}