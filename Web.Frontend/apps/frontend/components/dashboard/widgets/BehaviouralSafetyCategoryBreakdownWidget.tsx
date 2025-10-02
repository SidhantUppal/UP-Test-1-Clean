"use client";

import React from 'react';
import Link from 'next/link';

interface BehaviouralSafetyCategoryBreakdownWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyCategoryBreakdownWidget({ id, isEditMode }: BehaviouralSafetyCategoryBreakdownWidgetProps) {
  const categories = [
    {
      id: 1,
      name: 'Interventions',
      total: 28,
      thisWeek: 6,
      points: 420,
      trend: '+3',
      color: 'bg-blue-500',
      description: 'Safety coaching and corrections'
    },
    {
      id: 2,
      name: 'Good Behaviors',
      total: 45,
      thisWeek: 12,
      points: 450,
      trend: '+8',
      color: 'bg-green-500',
      description: 'Positive safety observations'
    },
    {
      id: 3,
      name: 'Saves',
      total: 8,
      thisWeek: 2,
      points: 200,
      trend: '+1',
      color: 'bg-purple-500',
      description: 'Near miss preventions'
    },
    {
      id: 4,
      name: 'Hazard Reports',
      total: 15,
      thisWeek: 4,
      points: 180,
      trend: '+2',
      color: 'bg-red-500',
      description: 'Environmental hazards identified'
    },
    {
      id: 5,
      name: 'Quick Training',
      total: 32,
      thisWeek: 8,
      points: 160,
      trend: '+5',
      color: 'bg-orange-500',
      description: 'On-the-spot training moments'
    }
  ];

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-600' : trend.startsWith('-') ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        {isEditMode ? (
          <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
        ) : (
          <Link href="/incidents/behaviour/insights" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
            Category Breakdown
          </Link>
        )}
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
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
            
            <p className="text-xs text-gray-600 mb-3">{category.description}</p>
            
            {/* This Week Progress */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs text-gray-600 w-16">This week:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${category.color} transition-all duration-300`}
                  style={{ width: `${(category.thisWeek / category.total) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 w-8">{category.thisWeek}</span>
            </div>
            
            {/* Points and Trend */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">
                {category.points} points earned
              </span>
              <span className={`text-xs font-medium ${getTrendColor(category.trend)}`}>
                {category.trend} this week
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          {isEditMode ? (
            <span className="text-sm text-green-600">View Detailed Category Analysis →</span>
          ) : (
            <Link href="/incidents/behaviour/insights" className="text-sm text-green-600 hover:text-green-800 transition-colors">
              View Detailed Category Analysis →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}