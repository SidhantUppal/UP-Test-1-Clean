'use client';

import React from 'react';

interface ProcessEfficiencyWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function ProcessEfficiencyWidget({ id, isEditMode }: ProcessEfficiencyWidgetProps) {
  const efficiencyData = {
    overall: 94,
    automated: 78,
    manual: 65,
    timeReduction: 35,
    errorReduction: 82
  };

  const trends = [
    { metric: 'Process Speed', value: '+23%', trend: 'up', description: 'Average completion time improved' },
    { metric: 'Automation Rate', value: '+15%', trend: 'up', description: 'More processes automated' },
    { metric: 'Error Rate', value: '-18%', trend: 'down', description: 'Fewer process errors' },
    { metric: 'Resource Usage', value: '-12%', trend: 'down', description: 'More efficient resource allocation' }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : '↘️';
  };

  const getTrendColor = (trend: string, isNegative: boolean = false) => {
    const isGood = isNegative ? trend === 'down' : trend === 'up';
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Process Efficiency</h3>
          <p className="text-sm text-gray-600">Performance metrics and optimization insights</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{efficiencyData.overall}%</div>
          <div className="text-sm text-gray-500">overall</div>
        </div>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{efficiencyData.automated}%</div>
          <div className="text-xs text-blue-700 mt-1">Automated</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-xl font-bold text-purple-600">{efficiencyData.manual}%</div>
          <div className="text-xs text-purple-700 mt-1">Manual</div>
        </div>
      </div>

      {/* Key Improvements */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <div>
            <span className="text-sm font-medium text-green-800">Time Reduction</span>
            <p className="text-xs text-green-600">Processes run faster</p>
          </div>
          <span className="text-lg font-bold text-green-700">{efficiencyData.timeReduction}%</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div>
            <span className="text-sm font-medium text-blue-800">Error Reduction</span>
            <p className="text-xs text-blue-600">Fewer process failures</p>
          </div>
          <span className="text-lg font-bold text-blue-700">{efficiencyData.errorReduction}%</span>
        </div>
      </div>

      {/* Trend Indicators */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-medium text-gray-700">Recent Trends</h4>
        {trends.slice(0, 2).map((trend, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{trend.metric}</span>
            <div className="flex items-center gap-1">
              <span className={getTrendColor(trend.trend, trend.metric.includes('Error') || trend.metric.includes('Usage'))}>
                {trend.value}
              </span>
              <span>{getTrendIcon(trend.trend)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button 
          className="flex-1 px-3 py-2 text-white text-sm rounded-lg transition-colors"
          style={{ backgroundColor: '#3d3a72' }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2d2a5a'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3d3a72'}
        >
          Optimize
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
          Report
        </button>
      </div>
    </div>
  );
}