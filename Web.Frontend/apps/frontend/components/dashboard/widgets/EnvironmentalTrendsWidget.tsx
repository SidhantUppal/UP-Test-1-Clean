"use client";

import React from 'react';

interface EnvironmentalTrendsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function EnvironmentalTrendsWidget({ id, isEditMode }: EnvironmentalTrendsWidgetProps) {
  const trendsData = {
    period: 'Last 30 Days',
    categories: [
      { name: 'Spill', current: 8, previous: 12, trend: -33 },
      { name: 'Emission', current: 15, previous: 18, trend: -17 },
      { name: 'Waste', current: 23, previous: 20, trend: 15 },
      { name: 'Water Quality', current: 6, previous: 9, trend: -33 },
      { name: 'Noise', current: 11, previous: 8, trend: 38 },
      { name: 'Good Practice', current: 45, previous: 38, trend: 18 }
    ]
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-red-600';
    if (trend < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return '↗';
    if (trend < 0) return '↘';
    return '→';
  };

  const getBarWidth = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const maxValue = Math.max(...trendsData.categories.map(c => c.current));

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Environmental Trends</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>
      
      {/* Trends Chart */}
      <div className="space-y-3">
        {trendsData.categories.map((category, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
                <span className="text-xs text-gray-600">({category.current} incidents)</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${getTrendColor(category.trend)}`}>
                  {getTrendIcon(category.trend)} {Math.abs(category.trend)}%
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  category.name === 'Good Practice' ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${getBarWidth(category.current, maxValue)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>Previous: {category.previous}</span>
              <span>Current: {category.current}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="text-green-600 font-medium">↘ Improving:</span> Spill, Emission, Water Quality
        </div>
        <div className="text-sm text-gray-600 mt-1">
          <span className="text-red-600 font-medium">↗ Attention needed:</span> Waste, Noise
        </div>
        <div className="text-sm text-gray-600 mt-1">
          <span className="text-green-600 font-medium">↗ Positive:</span> Good Practice reports up 18%
        </div>
      </div>
    </div>
  );
}