"use client";

import React from 'react';
import Link from 'next/link';
import DashboardWidget from '@/components/dashboard/DashboardWidget';

// Demo risk assessments data
const riskAssessments = [
  { 
    id: 1, 
    title: 'Fire Safety Assessment - Building A', 
    type: 'Fire Safety',
    riskLevel: 'Medium',
    lastReview: '15 days ago',
    nextReview: 'In 45 days',
    status: 'Current',
    progress: 85,
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  },
  { 
    id: 2, 
    title: 'Manual Handling - Warehouse', 
    type: 'Ergonomic',
    riskLevel: 'Low',
    lastReview: '5 days ago',
    nextReview: 'In 90 days',
    status: 'Current',
    progress: 100,
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  },
  { 
    id: 3, 
    title: 'Chemical Storage Assessment', 
    type: 'Chemical',
    riskLevel: 'High',
    lastReview: '30 days ago',
    nextReview: 'Overdue by 5 days',
    status: 'Overdue',
    progress: 60,
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  },
  { 
    id: 4, 
    title: 'Working at Height - Maintenance', 
    type: 'Height Work',
    riskLevel: 'Medium',
    lastReview: '20 days ago',
    nextReview: 'In 10 days',
    status: 'Due Soon',
    progress: 90,
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  }
];

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'High': return 'bg-red-100 text-red-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Current': return 'bg-green-100 text-green-800';
    case 'Due Soon': return 'bg-yellow-100 text-yellow-800';
    case 'Overdue': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface RiskAssessmentsWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function RiskAssessmentsWidget({ id, isEditMode, onRemove }: RiskAssessmentsWidgetProps) {
  return (
    <DashboardWidget 
      id={id}
      title="Risk Assessments" 
      type="Risk"
      isEditMode={isEditMode}
      onRemove={onRemove}
    >
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {riskAssessments.map((assessment) => (
          <div key={assessment.id} className={`p-3 rounded-lg ${assessment.bgColor} hover:shadow-md transition-all duration-200`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm text-gray-800 flex-1 mr-2">{assessment.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${getRiskBadge(assessment.riskLevel)} whitespace-nowrap`}>
                {assessment.riskLevel}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
              <span>{assessment.type}</span>
              <span className={`px-2 py-1 rounded-full ${getStatusBadge(assessment.status)}`}>
                {assessment.status}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 mb-2">
              <div>Last: {assessment.lastReview}</div>
              <div>Next: {assessment.nextReview}</div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  assessment.progress === 100 ? 'bg-green-500' : 
                  assessment.progress >= 80 ? 'bg-blue-500' : 
                  assessment.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${assessment.progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right">{assessment.progress}% complete</div>
          </div>
        ))}
      </div>
      <Link href="/risk-assessments" className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
        View All Risk Assessments →
      </Link>
    </DashboardWidget>
  );
}