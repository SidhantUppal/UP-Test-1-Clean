"use client";

import React from 'react';

// Demo overdue risk assessments data
const overdueAssessments = [
  {
    id: 1,
    title: 'Chemical Storage Assessment - Lab A',
    area: 'Laboratory',
    daysOverdue: 15,
    riskLevel: 'High',
    lastReview: '2024-07-20',
    assignee: 'J. Smith'
  },
  {
    id: 2,
    title: 'Fire Safety - Building C',
    area: 'Office Building',
    daysOverdue: 8,
    riskLevel: 'Medium',
    lastReview: '2024-08-05',
    assignee: 'M. Johnson'
  },
  {
    id: 3,
    title: 'Manual Handling - Warehouse',
    area: 'Storage',
    daysOverdue: 22,
    riskLevel: 'Medium',
    lastReview: '2024-07-10',
    assignee: 'R. Williams'
  },
  {
    id: 4,
    title: 'Working at Height - Maintenance',
    area: 'Operations',
    daysOverdue: 5,
    riskLevel: 'High',
    lastReview: '2024-08-20',
    assignee: 'D. Brown'
  },
  {
    id: 5,
    title: 'Electrical Safety - Workshop',
    area: 'Workshop',
    daysOverdue: 12,
    riskLevel: 'High',
    lastReview: '2024-07-28',
    assignee: 'K. Davis'
  }
];

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'High': return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getUrgencyColor = (days: number) => {
  if (days >= 20) return 'text-red-600 font-bold';
  if (days >= 10) return 'text-red-500 font-semibold';
  if (days >= 5) return 'text-orange-500 font-medium';
  return 'text-red-400';
};

interface OverdueRiskAssessmentsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function OverdueRiskAssessmentsWidget({ id, isEditMode }: OverdueRiskAssessmentsWidgetProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Overdue Assessments</h3>
        <div className="flex items-center">
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
            {overdueAssessments.length}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {overdueAssessments.map((assessment) => (
          <div key={assessment.id} className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm text-gray-800 flex-1 mr-2">{assessment.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full border ${getRiskBadge(assessment.riskLevel)} whitespace-nowrap`}>
                {assessment.riskLevel}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
              <span className="flex items-center">
                📍 {assessment.area}
              </span>
              <span className="flex items-center">
                👤 {assessment.assignee}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">
                Last: {new Date(assessment.lastReview).toLocaleDateString()}
              </span>
              <span className={`font-semibold ${getUrgencyColor(assessment.daysOverdue)}`}>
                {assessment.daysOverdue} days overdue
              </span>
            </div>
            
            {/* Progress bar showing urgency */}
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${
                  assessment.daysOverdue >= 20 ? 'bg-red-600' : 
                  assessment.daysOverdue >= 10 ? 'bg-red-500' : 'bg-orange-500'
                }`}
                style={{ width: `${Math.min(100, (assessment.daysOverdue / 30) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button 
          className="w-full text-center text-sm text-red-600 hover:text-red-800 font-medium hover:bg-red-50 py-2 rounded transition-colors"
          onClick={() => alert('Navigate to overdue assessments page')}
        >
          View All Overdue Items →
        </button>
      </div>
    </div>
  );
}