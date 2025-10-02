"use client";

import React from 'react';

interface EnvironmentalCategoriesWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function EnvironmentalCategoriesWidget({ id, isEditMode }: EnvironmentalCategoriesWidgetProps) {
  const categoriesData = {
    total: 108,
    categories: [
      { name: 'Good Practice', count: 45, percentage: 42, color: 'bg-green-500' },
      { name: 'Waste', count: 23, percentage: 21, color: 'bg-orange-500' },
      { name: 'Emission', count: 15, percentage: 14, color: 'bg-purple-500' },
      { name: 'Noise', count: 11, percentage: 10, color: 'bg-yellow-500' },
      { name: 'Spill', count: 8, percentage: 7, color: 'bg-red-500' },
      { name: 'Water Quality', count: 6, percentage: 6, color: 'bg-blue-500' }
    ]
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
        </select>
      </div>
      
      {/* Total Count */}
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-gray-900">{categoriesData.total}</div>
        <div className="text-sm text-gray-600">Total Reports</div>
      </div>
      
      {/* Donut Chart Visual */}
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="12"
            />
            {/* Create segments for each category */}
            {categoriesData.categories.reduce((acc, category, index) => {
              const prevPercentage = categoriesData.categories
                .slice(0, index)
                .reduce((sum, cat) => sum + cat.percentage, 0);
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = `${(category.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((prevPercentage / 100) * circumference);
              
              acc.push(
                <circle
                  key={category.name}
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke={category.color.replace('bg-', '').replace('-500', '')}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
              return acc;
            }, [] as JSX.Element[])}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">{categoriesData.total}</div>
              <div className="text-xs text-gray-600">Reports</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories List */}
      <div className="space-y-2">
        {categoriesData.categories.map((category, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
              <span className="text-sm text-gray-900">{category.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-600">{category.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Key Insights */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          <div className="flex justify-between mb-1">
            <span>Most common:</span>
            <span className="font-medium text-green-600">Good Practice (42%)</span>
          </div>
          <div className="flex justify-between">
            <span>Needs attention:</span>
            <span className="font-medium text-orange-600">Waste (21%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}