"use client";

import React from 'react';
import Link from 'next/link';

interface BehaviouralSafetyInterventionsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyInterventionsWidget({ id, isEditMode }: BehaviouralSafetyInterventionsWidgetProps) {
  const interventions = [
    {
      id: 1,
      type: 'PPE Compliance',
      count: 8,
      trend: '+2',
      urgency: 'high',
      description: 'Hard hat not worn in construction zone'
    },
    {
      id: 2,
      type: 'Lifting Technique',
      count: 5,
      trend: '+1',
      urgency: 'medium',
      description: 'Improper lifting posture observed'
    },
    {
      id: 3,
      type: 'Machine Guarding',
      count: 3,
      trend: '-1',
      urgency: 'high',
      description: 'Safety guards bypassed'
    },
    {
      id: 4,
      type: 'Housekeeping',
      count: 12,
      trend: '+3',
      urgency: 'low',
      description: 'Tools left in walkways'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-red-600' : trend.startsWith('-') ? 'text-green-600' : 'text-gray-600';
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        {isEditMode ? (
          <h3 className="text-lg font-semibold text-gray-900">Safety Interventions</h3>
        ) : (
          <Link href="/incidents/behaviour" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
            Safety Interventions
          </Link>
        )}
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {interventions.map((intervention) => (
          <div key={intervention.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{intervention.type}</h4>
                <p className="text-xs text-gray-500 mt-1">{intervention.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(intervention.urgency)}`}>
                  {intervention.urgency}
                </span>
                <div className="text-lg font-bold text-gray-900">{intervention.count}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                This week
              </span>
              <span className={`text-xs font-medium ${getTrendColor(intervention.trend)}`}>
                {intervention.trend} from last week
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">28</div>
            <div className="text-xs text-gray-500">Total This Week</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-red-600">6</div>
            <div className="text-xs text-gray-500">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
}