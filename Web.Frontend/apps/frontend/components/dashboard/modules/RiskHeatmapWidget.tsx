'use client';

import React from 'react';

interface RiskHeatmapWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function RiskHeatmapWidget({ id, isEditMode }: RiskHeatmapWidgetProps) {
  // Risk matrix data (Likelihood vs Severity)
  const riskMatrix = [
    [
      { risks: 2, level: 'low' },
      { risks: 1, level: 'low' },
      { risks: 0, level: 'medium' },
      { risks: 1, level: 'medium' },
      { risks: 0, level: 'high' }
    ],
    [
      { risks: 3, level: 'low' },
      { risks: 2, level: 'low' },
      { risks: 1, level: 'medium' },
      { risks: 2, level: 'high' },
      { risks: 1, level: 'high' }
    ],
    [
      { risks: 1, level: 'low' },
      { risks: 4, level: 'medium' },
      { risks: 3, level: 'medium' },
      { risks: 2, level: 'high' },
      { risks: 1, level: 'critical' }
    ],
    [
      { risks: 0, level: 'medium' },
      { risks: 2, level: 'medium' },
      { risks: 5, level: 'high' },
      { risks: 3, level: 'critical' },
      { risks: 2, level: 'critical' }
    ],
    [
      { risks: 0, level: 'medium' },
      { risks: 1, level: 'high' },
      { risks: 2, level: 'high' },
      { risks: 4, level: 'critical' },
      { risks: 3, level: 'critical' }
    ]
  ];

  const severityLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe'];
  const likelihoodLabels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];

  const getRiskColor = (level: string, count: number) => {
    const opacity = count === 0 ? '20' : Math.min(20 + count * 15, 100);
    switch (level) {
      case 'low': return { bg: `bg-green-${Math.min(200 + count * 50, 500)}`, text: 'text-green-900' };
      case 'medium': return { bg: `bg-yellow-${Math.min(200 + count * 50, 500)}`, text: 'text-yellow-900' };
      case 'high': return { bg: `bg-orange-${Math.min(200 + count * 50, 600)}`, text: 'text-orange-900' };
      case 'critical': return { bg: `bg-red-${Math.min(200 + count * 50, 700)}`, text: 'text-red-900' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  const totalRisks = riskMatrix.flat().reduce((acc, cell) => acc + cell.risks, 0);
  const criticalRisks = riskMatrix.flat().filter(cell => cell.level === 'critical').reduce((acc, cell) => acc + cell.risks, 0);
  const highRisks = riskMatrix.flat().filter(cell => cell.level === 'high').reduce((acc, cell) => acc + cell.risks, 0);

  const topRisks = [
    { area: 'Chemical Storage', risk: 'Spill/Leak', level: 'critical', probability: 'Likely', impact: 'Major' },
    { area: 'Machinery Area', risk: 'Equipment Failure', level: 'high', probability: 'Possible', impact: 'Severe' },
    { area: 'Loading Bay', risk: 'Moving Vehicle', level: 'high', probability: 'Likely', impact: 'Moderate' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Risk Heatmap</h3>
          <p className="text-sm text-gray-600">Visual risk distribution analysis</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
          <span>PRO</span>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-gray-900">{totalRisks}</div>
          <div className="text-xs text-gray-700">Total Risks</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-xl font-bold text-red-600">{criticalRisks}</div>
          <div className="text-xs text-red-700">Critical</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-xl font-bold text-orange-600">{highRisks}</div>
          <div className="text-xs text-orange-700">High</div>
        </div>
      </div>

      {/* Risk Matrix Heatmap */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Risk Matrix</h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          {/* Y-axis label */}
          <div className="flex">
            <div className="w-16 flex items-center justify-center">
              <div className="transform -rotate-90 text-xs font-medium text-gray-700 whitespace-nowrap">
                Likelihood
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1 mb-2">
                {severityLabels.map((label, index) => (
                  <div key={index} className="text-xs text-center text-gray-600 font-medium">
                    {label}
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {riskMatrix.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-1">
                    {row.map((cell, colIndex) => {
                      const colors = getRiskColor(cell.level, cell.risks);
                      return (
                        <div
                          key={colIndex}
                          className={`flex-1 aspect-square flex items-center justify-center rounded text-xs font-bold ${
                            cell.risks === 0 ? 'bg-gray-100 text-gray-400' : 
                            cell.level === 'low' ? 'bg-green-200 text-green-800' :
                            cell.level === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                            cell.level === 'high' ? 'bg-orange-300 text-orange-900' :
                            'bg-red-400 text-red-900'
                          }`}
                          title={`${likelihoodLabels[4 - rowIndex]} × ${severityLabels[colIndex]}: ${cell.risks} risks`}
                        >
                          {cell.risks}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex mt-2">
                {likelihoodLabels.slice().reverse().map((label, index) => (
                  <div key={index} className="w-12 text-xs text-center text-gray-600 font-medium">
                    {label.split(' ')[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <div className="text-xs font-medium text-gray-700">Severity</div>
          </div>
        </div>
      </div>

      {/* Top Risks */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Top Priority Risks</h4>
        <div className="space-y-2">
          {topRisks.map((risk, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm text-gray-900">{risk.area}</div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  risk.level === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {risk.level}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-1">{risk.risk}</div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>P: {risk.probability}</span>
                <span>I: {risk.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4">
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-200 rounded"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-300 rounded"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          Detailed View
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
          Export
        </button>
      </div>
    </div>
  );
}