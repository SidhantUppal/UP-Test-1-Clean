"use client";

import React from 'react';
import Link from 'next/link';

interface IncidentCategoryBreakdownWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function IncidentCategoryBreakdownWidget({ id, isEditMode }: IncidentCategoryBreakdownWidgetProps) {
  // Mock incident category data
  const categories = [
    {
      id: 1,
      name: 'Workplace Injuries',
      total: 45,
      critical: 3,
      high: 12,
      medium: 18,
      low: 12,
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Equipment Failures',
      total: 32,
      critical: 1,
      high: 8,
      medium: 15,
      low: 8,
      color: 'bg-orange-500'
    },
    {
      id: 3,
      name: 'Chemical Incidents',
      total: 28,
      critical: 2,
      high: 6,
      medium: 12,
      low: 8,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Fire Safety',
      total: 18,
      critical: 1,
      high: 3,
      medium: 8,
      low: 6,
      color: 'bg-yellow-500'
    },
    {
      id: 5,
      name: 'Environmental',
      total: 15,
      critical: 0,
      high: 2,
      medium: 7,
      low: 6,
      color: 'bg-green-500'
    }
  ];

  const getCriticalPercentage = (critical: number, total: number) => {
    return Math.round((critical / total) * 100);
  };

  return (
    <Link href="/incidents" className="block h-full">
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Incident Categories</h3>
          <select className="text-sm border border-gray-300 rounded px-2 py-1 pointer-events-none">
            <option>This Quarter</option>
            <option>This Month</option>
            <option>This Week</option>
          </select>
        </div>
        
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                </div>
                <div className="text-xs text-gray-500">
                  {category.total} total
                </div>
              </div>
              
              {/* Severity Level Progress Bars */}
              <div className="space-y-2">
                {/* Critical */}
                {category.critical > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-red-600 w-16">Critical:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(category.critical / category.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-8">{category.critical}</span>
                  </div>
                )}
                
                {/* High */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-orange-600 w-16">High:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(category.high / category.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">{category.high}</span>
                </div>
                
                {/* Medium */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-yellow-600 w-16">Medium:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(category.medium / category.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">{category.medium}</span>
                </div>
              </div>
              
              {/* Critical Alert */}
              {category.critical > 0 && (
                <div className="mt-2 text-xs">
                  <span className="text-red-600 font-medium">
                    🚨 {getCriticalPercentage(category.critical, category.total)}% critical severity
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-sm text-purple-600 pointer-events-none">
              View Detailed Category Analysis →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}