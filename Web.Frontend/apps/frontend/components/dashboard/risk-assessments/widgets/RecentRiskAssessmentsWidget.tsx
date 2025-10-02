"use client";

import React from 'react';

// Demo recent risk assessments data
const recentAssessments = [
  {
    id: 1,
    title: 'Fire Safety Assessment - Office Floor 3',
    type: 'Fire Safety',
    riskLevel: 'Low',
    completedDate: '2024-08-30',
    completedBy: 'Sarah Johnson',
    status: 'Approved',
    score: 92
  },
  {
    id: 2,
    title: 'Manual Handling - Loading Bay',
    type: 'Ergonomic',
    riskLevel: 'Medium',
    completedDate: '2024-08-28',
    completedBy: 'Mike Chen',
    status: 'Under Review',
    score: 78
  },
  {
    id: 3,
    title: 'Electrical Safety - Workshop Area',
    type: 'Electrical',
    riskLevel: 'Medium',
    completedDate: '2024-08-27',
    completedBy: 'Emma Wilson',
    status: 'Approved',
    score: 85
  },
  {
    id: 4,
    title: 'Chemical Storage - Laboratory B',
    type: 'Chemical',
    riskLevel: 'High',
    completedDate: '2024-08-25',
    completedBy: 'David Brown',
    status: 'Action Required',
    score: 65
  },
  {
    id: 5,
    title: 'Working at Height - Maintenance Area',
    type: 'Height Work',
    riskLevel: 'Medium',
    completedDate: '2024-08-24',
    completedBy: 'Lisa Davis',
    status: 'Approved',
    score: 88
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

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Under Review': return 'bg-yellow-100 text-yellow-800';
    case 'Action Required': return 'bg-red-100 text-red-800';
    case 'Draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600 font-bold';
  if (score >= 80) return 'text-green-500 font-semibold';
  if (score >= 70) return 'text-yellow-600 font-semibold';
  if (score >= 60) return 'text-orange-600 font-semibold';
  return 'text-red-600 font-bold';
};

interface RecentRiskAssessmentsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function RecentRiskAssessmentsWidget({ id, isEditMode }: RecentRiskAssessmentsWidgetProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Assessments</h3>
        <span className="text-xs text-gray-500">Last 7 days</span>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentAssessments.map((assessment) => (
          <div key={assessment.id} className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-200 transition-all duration-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm text-gray-800 flex-1 mr-2">{assessment.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full border ${getRiskBadge(assessment.riskLevel)} whitespace-nowrap`}>
                {assessment.riskLevel}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
              <span className="font-medium">{assessment.type}</span>
              <span className={`px-2 py-1 rounded-full ${getStatusBadge(assessment.status)}`}>
                {assessment.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
              <span>By: {assessment.completedBy}</span>
              <span>{new Date(assessment.completedDate).toLocaleDateString()}</span>
            </div>
            
            {/* Score and progress bar */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Assessment Score</span>
              <span className={getScoreColor(assessment.score)}>
                {assessment.score}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  assessment.score >= 90 ? 'bg-green-500' :
                  assessment.score >= 80 ? 'bg-green-400' :
                  assessment.score >= 70 ? 'bg-yellow-500' :
                  assessment.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${assessment.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary stats */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="font-semibold text-purple-600">5</div>
            <div className="text-gray-500">Completed</div>
          </div>
          <div>
            <div className="font-semibold text-green-600">81.6%</div>
            <div className="text-gray-500">Avg Score</div>
          </div>
          <div>
            <div className="font-semibold text-blue-600">2.3</div>
            <div className="text-gray-500">Days Avg</div>
          </div>
        </div>
      </div>
      
      {/* Action footer */}
      <div className="mt-4">
        <button 
          className="w-full text-center text-sm text-purple-600 hover:text-purple-800 font-medium hover:bg-purple-50 py-2 rounded transition-colors"
          onClick={() => alert('Navigate to all assessments')}
        >
          View All Assessments →
        </button>
      </div>
    </div>
  );
}