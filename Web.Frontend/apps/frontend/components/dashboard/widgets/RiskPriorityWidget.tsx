"use client";

import React from 'react';
import Link from 'next/link';

interface RiskPriorityWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskPriorityWidget({ id, isEditMode }: RiskPriorityWidgetProps) {
  // Mock high priority risk data
  const highPriorityRisks = [
    {
      id: 1,
      title: 'Chemical Storage Leak Risk',
      location: 'Warehouse B',
      riskLevel: 'Critical',
      lastAssessed: 'Yesterday',
      assignee: 'Safety Team',
      color: 'bg-red-100 border-red-300 text-red-800'
    },
    {
      id: 2,
      title: 'Electrical Hazard - Exposed Wiring',
      location: 'Production Floor',
      riskLevel: 'High',
      lastAssessed: '2 days ago',
      assignee: 'Mike Davis',
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    },
    {
      id: 3,
      title: 'Fall Risk - Damaged Stairs',
      location: 'Building A - Level 2',
      riskLevel: 'High',
      lastAssessed: '3 days ago',
      assignee: 'Emma Wilson',
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    }
  ];

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Critical':
        return '🚨';
      case 'High':
        return '⚠️';
      case 'Medium':
        return '📋';
      case 'Low':
        return '📝';
      default:
        return '📋';
    }
  };

  return (
    <Link href="/risk-assessments/manage" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">High Priority Risks</h3>
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            {highPriorityRisks.length} critical
          </span>
        </div>
        
        <div className="space-y-3">
          {highPriorityRisks.map((risk) => (
            <div key={risk.id} className={`p-3 rounded-lg border ${risk.color} hover:shadow-sm transition-all`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getRiskIcon(risk.riskLevel)}</span>
                  <div>
                    <h4 className="text-sm font-medium truncate">{risk.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs opacity-75">📍 {risk.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs opacity-75">Assessed: {risk.lastAssessed}</span>
                      <span className="text-xs opacity-75">•</span>
                      <span className="text-xs opacity-75">{risk.assignee}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-white/50">
                  {risk.riskLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {highPriorityRisks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm">No high priority risks</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <div className="text-sm text-red-600 pointer-events-none">
            View All High Risk Items →
          </div>
        </div>
      </div>
    </Link>
  );
}