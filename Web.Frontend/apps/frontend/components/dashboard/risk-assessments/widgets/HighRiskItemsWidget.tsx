"use client";

import React from 'react';

// Demo high risk items data
const highRiskItems = [
  {
    id: 1,
    title: 'Chemical Spill Risk - Acid Storage',
    category: 'Chemical Safety',
    riskLevel: 'Critical',
    likelihood: 'Medium',
    severity: 'Very High',
    lastAssessed: '2024-08-15',
    controlMeasures: 3,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Fall from Height - Roof Maintenance',
    category: 'Working at Height',
    riskLevel: 'High',
    likelihood: 'Low',
    severity: 'Very High',
    lastAssessed: '2024-08-20',
    controlMeasures: 5,
    status: 'Under Review'
  },
  {
    id: 3,
    title: 'Electrical Shock - Wet Area Equipment',
    category: 'Electrical Safety',
    riskLevel: 'High',
    likelihood: 'Medium',
    severity: 'High',
    lastAssessed: '2024-08-10',
    controlMeasures: 4,
    status: 'Action Required'
  },
  {
    id: 4,
    title: 'Fire Risk - Flammable Storage Area',
    category: 'Fire Safety',
    riskLevel: 'High',
    likelihood: 'Low',
    severity: 'Very High',
    lastAssessed: '2024-08-25',
    controlMeasures: 6,
    status: 'Monitoring'
  }
];

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'Critical': return 'bg-red-600 text-white border-red-600';
    case 'High': return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800';
    case 'Under Review': return 'bg-yellow-100 text-yellow-800';
    case 'Action Required': return 'bg-red-100 text-red-800';
    case 'Monitoring': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface HighRiskItemsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function HighRiskItemsWidget({ id, isEditMode }: HighRiskItemsWidgetProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">High Risk Items</h3>
        <div className="flex items-center">
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
            {highRiskItems.length}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {highRiskItems.map((item) => (
          <div key={item.id} className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm text-gray-800 flex-1 mr-2">{item.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full border ${getRiskBadge(item.riskLevel)} whitespace-nowrap`}>
                {item.riskLevel}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
              <span className="font-medium">{item.category}</span>
              <span className={`px-2 py-1 rounded-full ${getStatusBadge(item.status)}`}>
                {item.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
              <div>
                <span className="text-gray-500">Likelihood:</span>
                <span className="ml-1 font-medium">{item.likelihood}</span>
              </div>
              <div>
                <span className="text-gray-500">Severity:</span>
                <span className="ml-1 font-medium">{item.severity}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">
                {item.controlMeasures} control measures
              </span>
              <span className="text-gray-500">
                Assessed: {new Date(item.lastAssessed).toLocaleDateString()}
              </span>
            </div>
            
            {/* Risk level indicator bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  item.riskLevel === 'Critical' ? 'bg-red-600' : 'bg-red-500'
                }`}
                style={{ 
                  width: item.riskLevel === 'Critical' ? '100%' : '80%'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button 
          className="w-full text-center text-sm text-red-600 hover:text-red-800 font-medium hover:bg-red-50 py-2 rounded transition-colors"
          onClick={() => alert('Navigate to high risk items management')}
        >
          Manage High Risk Items →
        </button>
      </div>
    </div>
  );
}