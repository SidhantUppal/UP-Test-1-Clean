"use client";

import React from 'react';

interface EnvironmentalRecentReportsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function EnvironmentalRecentReportsWidget({ id, isEditMode }: EnvironmentalRecentReportsWidgetProps) {
  const recentReports = [
    {
      id: 1,
      title: 'Chemical spill in Production Area A',
      category: 'Spill',
      severity: 'High',
      reporter: 'John Smith',
      time: '2 hours ago',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Positive environmental practice observed',
      category: 'Good Practice',
      severity: 'Low',
      reporter: 'Sarah Johnson',
      time: '4 hours ago',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Excessive noise from machinery',
      category: 'Noise',
      severity: 'Medium',
      reporter: 'Mike Wilson',
      time: '6 hours ago',
      status: 'Under Review'
    },
    {
      id: 4,
      title: 'Improper waste disposal observed',
      category: 'Waste',
      severity: 'Medium',
      reporter: 'Lisa Brown',
      time: '8 hours ago',
      status: 'Active'
    },
    {
      id: 5,
      title: 'Water quality concern at treatment plant',
      category: 'Water Quality',
      severity: 'High',
      reporter: 'David Lee',
      time: '10 hours ago',
      status: 'Resolved'
    },
    {
      id: 6,
      title: 'Air emission monitoring results',
      category: 'Emission',
      severity: 'Low',
      reporter: 'Emma Davis',
      time: '12 hours ago',
      status: 'Completed'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Spill': return 'bg-red-100 text-red-800';
      case 'Emission': return 'bg-purple-100 text-purple-800';
      case 'Waste': return 'bg-orange-100 text-orange-800';
      case 'Water Quality': return 'bg-blue-100 text-blue-800';
      case 'Noise': return 'bg-yellow-100 text-yellow-800';
      case 'Good Practice': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-600';
      case 'Under Review': return 'text-yellow-600';
      case 'Resolved': return 'text-green-600';
      case 'Completed': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentReports.map((report) => (
          <div key={report.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${getSeverityColor(report.severity)}`}></span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                  {report.category}
                </span>
              </div>
              <span className={`text-xs font-medium ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            
            <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
              {report.title}
            </h4>
            
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>By {report.reporter}</span>
              <span>{report.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-600">3</div>
            <div className="text-xs text-gray-600">Active</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">1</div>
            <div className="text-xs text-gray-600">Under Review</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">2</div>
            <div className="text-xs text-gray-600">Resolved Today</div>
          </div>
        </div>
      </div>
    </div>
  );
}