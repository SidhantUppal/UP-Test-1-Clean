"use client";

import React from 'react';
import Link from 'next/link';

interface RiskStatsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskStatsWidget({ id, isEditMode }: RiskStatsWidgetProps) {
  // Mock risk assessment stats data - replace with real API call
  const riskStats = {
    totalAssessments: 184,
    highRisk: 23,
    mediumRisk: 67,
    lowRisk: 94,
    overdue: 12,
    complianceRate: 87
  };

  return (
    <Link href="/risk-assessments" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Risk Overview</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Compliance Rate</span>
            <span className="text-sm font-bold text-green-600">{riskStats.complianceRate}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{riskStats.totalAssessments}</div>
            <div className="text-xs text-gray-500">Total Assessments</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{riskStats.highRisk}</div>
            <div className="text-xs text-gray-500">High Risk</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{riskStats.mediumRisk}</div>
            <div className="text-xs text-gray-500">Medium Risk</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{riskStats.lowRisk}</div>
            <div className="text-xs text-gray-500">Low Risk</div>
          </div>
        </div>

        {/* Risk Distribution Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Risk Distribution</span>
            <span>{riskStats.overdue} overdue</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
            <div 
              className="bg-red-500 h-3 transition-all duration-300"
              style={{ width: `${(riskStats.highRisk / riskStats.totalAssessments) * 100}%` }}
              title={`High Risk: ${riskStats.highRisk}`}
            ></div>
            <div 
              className="bg-yellow-500 h-3 transition-all duration-300"
              style={{ width: `${(riskStats.mediumRisk / riskStats.totalAssessments) * 100}%` }}
              title={`Medium Risk: ${riskStats.mediumRisk}`}
            ></div>
            <div 
              className="bg-green-500 h-3 transition-all duration-300"
              style={{ width: `${(riskStats.lowRisk / riskStats.totalAssessments) * 100}%` }}
              title={`Low Risk: ${riskStats.lowRisk}`}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}