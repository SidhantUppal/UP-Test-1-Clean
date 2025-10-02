"use client";

import { useState } from 'react';
import InvestigationLinkButton from '../InvestigationLinkButton';

interface EnvironmentalFeedProps {
  filterCategory: string;
}

const mockFeedData = [
  {
    id: 1,
    type: 'Spill',
    title: 'Minor Oil Spill in Warehouse B',
    description: 'Small hydraulic oil leak detected during routine inspection. Contained and cleaned immediately.',
    user: 'Sarah Johnson',
    time: '2 hours ago',
    severity: 'Medium',
    status: 'Resolved'
  },
  {
    id: 2,
    type: 'Good Practice',
    title: 'Excellent Waste Segregation',
    description: 'Manufacturing team demonstrated outstanding waste segregation practices this week.',
    user: 'Mike Wilson',
    time: '4 hours ago',
    severity: 'Low',
    status: 'Acknowledged'
  },
  {
    id: 3,
    type: 'Emission',
    title: 'Elevated Dust Levels - Line 3',
    description: 'Dust monitoring system detected elevated levels during production run. Investigation ongoing.',
    user: 'Alex Chen',
    time: '6 hours ago',
    severity: 'High',
    status: 'Under Investigation'
  },
  {
    id: 4,
    type: 'Water Quality',
    title: 'Water Quality Test Results',
    description: 'Weekly water quality tests show all parameters within acceptable limits.',
    user: 'System',
    time: '8 hours ago',
    severity: 'Low',
    status: 'Completed'
  },
  {
    id: 5,
    type: 'Waste',
    title: 'Recycling Target Exceeded',
    description: 'This month\'s recycling rate reached 87%, exceeding our 80% target.',
    user: 'Environmental Team',
    time: '1 day ago',
    severity: 'Low',
    status: 'Completed'
  }
];

export default function EnvironmentalFeed({ filterCategory }: EnvironmentalFeedProps) {
  const [feedData] = useState(mockFeedData);

  const filteredData = filterCategory === 'all'
    ? feedData
    : feedData.filter(item => item.type.toLowerCase().replace(' ', '-') === filterCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canStartInvestigation = (status: string) => {
    return status === 'Completed' || status === 'Resolved';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Investigation': return 'bg-orange-100 text-orange-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Acknowledged': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Spill':
        return (
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'Emission':
        return (
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        );
      case 'Good Practice':
        return (
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4">Environmental Activity Feed</h2>
        <div className="space-y-4">
          {filteredData.map((item) => (
            <div key={item.id} className={`border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all ${
              canStartInvestigation(item.status)
                ? 'border-purple-200 bg-purple-50 hover:border-purple-300'
                : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${
                  canStartInvestigation(item.status) ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <div className="w-4 h-4 sm:w-5 sm:h-5">
                    {getTypeIcon(item.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{item.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(item.severity)} self-start sm:self-center`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span>By {item.user}</span>
                      <span>{item.time}</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 self-start sm:self-center">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      {canStartInvestigation(item.status) && (
                        <InvestigationLinkButton
                          incidentId={item.id.toString()}
                          incidentCaseNumber={`ENV-${item.id.toString().padStart(4, '0')}`}
                          className="text-xs px-2 py-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
            No environmental activities found for the selected category.
          </div>
        )}
      </div>
    </div>
  );
}