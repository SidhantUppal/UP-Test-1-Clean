"use client";

import React from 'react';
import Link from 'next/link';

interface RiskOverdueAlertsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskOverdueAlertsWidget({ id, isEditMode }: RiskOverdueAlertsWidgetProps) {
  // Mock overdue risk assessments data
  const overdueAssessments = [
    {
      id: 1,
      title: 'Annual Fire Safety Assessment',
      location: 'Building A',
      daysOverdue: 7,
      riskLevel: 'High'
    },
    {
      id: 2,
      title: 'Equipment Safety Review',
      location: 'Production Floor',
      daysOverdue: 3,
      riskLevel: 'Medium'
    },
    {
      id: 3,
      title: 'Chemical Handling Assessment',
      location: 'Laboratory',
      daysOverdue: 12,
      riskLevel: 'Critical'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'text-red-600 bg-red-100';
      case 'High':
        return 'text-orange-600 bg-orange-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Link href="/risk-assessments/manage" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-red-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-gray-900">Overdue Assessments</h3>
          </div>
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full font-medium">
            {overdueAssessments.length} overdue
          </span>
        </div>
        
        <div className="space-y-3">
          {overdueAssessments.map((assessment) => (
            <div key={assessment.id} className="p-3 bg-red-50 border border-red-200 rounded-lg hover:shadow-sm transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-gray-900 truncate flex-1">{assessment.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${getRiskColor(assessment.riskLevel)}`}>
                  {assessment.riskLevel}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>📍 {assessment.location}</span>
                <span className="text-red-600 font-medium">
                  {assessment.daysOverdue} day{assessment.daysOverdue > 1 ? 's' : ''} overdue
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {overdueAssessments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm">No overdue assessments</p>
            <p className="text-xs text-gray-400 mt-1">All assessments are up to date!</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="w-full text-sm text-red-600 font-medium pointer-events-none">
            View All Overdue Assessments →
          </div>
        </div>
      </div>
    </Link>
  );
}