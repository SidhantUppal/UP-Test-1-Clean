"use client";

import React from 'react';
import DashboardWidget from '@/components/dashboard/DashboardWidget';

// Demo compliance data
const complianceData = {
  overall: 92,
  categories: [
    { name: 'Health & Safety', score: 95, trend: '+2%', color: 'bg-green-500' },
    { name: 'Fire Safety', score: 88, trend: '-1%', color: 'bg-yellow-500' },
    { name: 'Environmental', score: 94, trend: '+5%', color: 'bg-blue-500' },
    { name: 'Data Protection', score: 90, trend: '0%', color: 'bg-purple-500' }
  ],
  recentUpdates: [
    { title: 'GDPR Policy Updated', date: '2 days ago', type: 'policy' },
    { title: 'Fire Drill Completed', date: '1 week ago', type: 'drill' },
    { title: 'Safety Audit Passed', date: '2 weeks ago', type: 'audit' }
  ]
};

interface ComplianceOverviewWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function ComplianceOverviewWidget({ id, isEditMode, onRemove }: ComplianceOverviewWidgetProps) {
  return (
    <DashboardWidget 
      id={id}
      title="Compliance Overview" 
      type="Compliance"
      isEditMode={isEditMode}
      onRemove={onRemove}
      className="col-span-2"
    >
      <div className="space-y-4">
        {/* Overall Score */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <div className="text-3xl font-bold text-gray-800 mb-1">{complianceData.overall}%</div>
          <div className="text-sm text-gray-600">Overall Compliance Score</div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          {complianceData.categories.map((category, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  category.trend.startsWith('+') ? 'bg-green-100 text-green-700' :
                  category.trend.startsWith('-') ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {category.trend}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">{category.score}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Updates */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Updates</h4>
          <div className="space-y-2">
            {complianceData.recentUpdates.map((update, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-white rounded border border-gray-100">
                <div className={`w-2 h-2 rounded-full ${
                  update.type === 'policy' ? 'bg-blue-500' :
                  update.type === 'drill' ? 'bg-orange-500' :
                  'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{update.title}</div>
                  <div className="text-xs text-gray-500">{update.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardWidget>
  );
}