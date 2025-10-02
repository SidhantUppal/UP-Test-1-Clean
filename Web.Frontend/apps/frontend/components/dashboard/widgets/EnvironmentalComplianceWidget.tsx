"use client";

import React from 'react';

interface EnvironmentalComplianceWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function EnvironmentalComplianceWidget({ id, isEditMode }: EnvironmentalComplianceWidgetProps) {
  const complianceData = {
    overall: 92,
    categories: [
      { name: 'Air Quality', score: 95, status: 'Excellent' },
      { name: 'Water', score: 88, status: 'Good' },
      { name: 'Waste', score: 90, status: 'Good' },
      { name: 'Noise', score: 94, status: 'Excellent' },
      { name: 'Chemical', score: 89, status: 'Good' }
    ],
    trend: '+2%'
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Score</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
        </select>
      </div>
      
      {/* Overall Score */}
      <div className="text-center mb-4">
        <div className={`text-4xl font-bold ${getScoreColor(complianceData.overall)}`}>
          {complianceData.overall}%
        </div>
        <div className="text-sm text-gray-600">Overall Compliance</div>
        <div className="text-xs text-green-600 mt-1">{complianceData.trend} from last month</div>
      </div>
      
      {/* Progress Ring Visual */}
      <div className="flex justify-center mb-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeDasharray={`${complianceData.overall * 1.76} 176`}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">{complianceData.overall}%</span>
          </div>
        </div>
      </div>
      
      {/* Category Breakdown */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">By Category</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {complianceData.categories.map((category, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{category.name}</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(category.status)}`}>
                  {category.status}
                </span>
                <span className={`font-medium ${getScoreColor(category.score)}`}>
                  {category.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}