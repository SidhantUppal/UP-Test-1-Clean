"use client";

import React from 'react';

interface RiskCategoryBreakdownWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskCategoryBreakdownWidget({ id, isEditMode }: RiskCategoryBreakdownWidgetProps) {
  // Mock risk category data
  const categories = [
    {
      id: 1,
      name: 'Fire Safety',
      total: 34,
      high: 5,
      medium: 12,
      low: 17,
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Chemical Hazards',
      total: 28,
      high: 8,
      medium: 15,
      low: 5,
      color: 'bg-orange-500'
    },
    {
      id: 3,
      name: 'Equipment Safety',
      total: 42,
      high: 3,
      medium: 18,
      low: 21,
      color: 'bg-blue-500'
    },
    {
      id: 4,
      name: 'Environmental',
      total: 25,
      high: 2,
      medium: 10,
      low: 13,
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Workplace Ergonomics',
      total: 19,
      high: 1,
      medium: 8,
      low: 10,
      color: 'bg-purple-500'
    }
  ];

  const getHighRiskPercentage = (high: number, total: number) => {
    return Math.round((high / total) * 100);
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Risk Categories</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>All Time</option>
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
            
            {/* Risk Level Progress Bars */}
            <div className="space-y-2">
              {/* High Risk */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-red-600 w-12">High:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(category.high / category.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 w-8">{category.high}</span>
              </div>
              
              {/* Medium Risk */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-yellow-600 w-12">Med:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(category.medium / category.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 w-8">{category.medium}</span>
              </div>
              
              {/* Low Risk */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 w-12">Low:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(category.low / category.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 w-8">{category.low}</span>
              </div>
            </div>
            
            {/* High Risk Alert */}
            {category.high > 0 && (
              <div className="mt-2 text-xs">
                <span className="text-red-600 font-medium">
                  ⚠️ {getHighRiskPercentage(category.high, category.total)}% high risk
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <button className="text-sm text-red-600 hover:text-red-800">
            View Detailed Category Analysis →
          </button>
        </div>
      </div>
    </div>
  );
}