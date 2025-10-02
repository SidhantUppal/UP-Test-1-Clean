"use client";

import React from 'react';

interface RiskComplianceWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskComplianceWidget({ id, isEditMode }: RiskComplianceWidgetProps) {
  // Mock compliance data
  const complianceData = {
    overallScore: 87,
    categories: [
      {
        name: 'Fire Safety',
        score: 92,
        status: 'compliant',
        assessments: 15,
        overdue: 1
      },
      {
        name: 'Chemical Safety',
        score: 78,
        status: 'needs_attention',
        assessments: 12,
        overdue: 3
      },
      {
        name: 'Equipment Safety',
        score: 95,
        status: 'compliant',
        assessments: 18,
        overdue: 0
      },
      {
        name: 'Environmental',
        score: 82,
        status: 'acceptable',
        assessments: 8,
        overdue: 1
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-100';
      case 'acceptable':
        return 'text-blue-600 bg-blue-100';
      case 'needs_attention':
        return 'text-yellow-600 bg-yellow-100';
      case 'non_compliant':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'acceptable':
        return 'Acceptable';
      case 'needs_attention':
        return 'Needs Attention';
      case 'non_compliant':
        return 'Non-Compliant';
      default:
        return 'Unknown';
    }
  };

  const getOverallColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Risk Compliance</h3>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getOverallColor(complianceData.overallScore)}`}>
            {complianceData.overallScore}%
          </div>
          <div className="text-xs text-gray-500">Overall Score</div>
        </div>
      </div>

      {/* Overall Progress Ring */}
      <div className="flex justify-center mb-6">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={complianceData.overallScore >= 90 ? '#10b981' : complianceData.overallScore >= 80 ? '#3b82f6' : complianceData.overallScore >= 70 ? '#f59e0b' : '#ef4444'}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${complianceData.overallScore * 2.51} 251`}
              className="transition-all duration-300"
            />
          </svg>
        </div>
      </div>
      
      <div className="space-y-3">
        {complianceData.categories.map((category, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(category.status)}`}>
                {getStatusLabel(category.status)}
              </span>
            </div>
            
            {/* Score Progress Bar */}
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    category.score >= 90 ? 'bg-green-500' :
                    category.score >= 80 ? 'bg-blue-500' :
                    category.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${category.score}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-700 w-8">{category.score}%</span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>{category.assessments} assessments</span>
              {category.overdue > 0 && (
                <span className="text-red-600 font-medium">
                  {category.overdue} overdue
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-red-600 hover:text-red-800">
            View Full Compliance Report →
          </button>
        </div>
      </div>
    </div>
  );
}