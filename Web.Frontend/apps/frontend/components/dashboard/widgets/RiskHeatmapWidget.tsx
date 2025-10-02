"use client";

import React from 'react';

interface RiskHeatmapWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function RiskHeatmapWidget({ id, isEditMode }: RiskHeatmapWidgetProps) {
  // Mock risk heatmap data - probability vs impact matrix
  const riskMatrix = [
    [
      { risks: 2, level: 'low' },
      { risks: 5, level: 'low' },
      { risks: 8, level: 'medium' },
      { risks: 4, level: 'medium' },
      { risks: 1, level: 'high' }
    ],
    [
      { risks: 3, level: 'low' },
      { risks: 7, level: 'medium' },
      { risks: 6, level: 'medium' },
      { risks: 3, level: 'high' },
      { risks: 2, level: 'high' }
    ],
    [
      { risks: 1, level: 'medium' },
      { risks: 4, level: 'medium' },
      { risks: 5, level: 'high' },
      { risks: 4, level: 'high' },
      { risks: 3, level: 'critical' }
    ],
    [
      { risks: 0, level: 'medium' },
      { risks: 2, level: 'high' },
      { risks: 3, level: 'high' },
      { risks: 5, level: 'critical' },
      { risks: 4, level: 'critical' }
    ],
    [
      { risks: 0, level: 'high' },
      { risks: 1, level: 'high' },
      { risks: 2, level: 'critical' },
      { risks: 3, level: 'critical' },
      { risks: 6, level: 'critical' }
    ]
  ];

  const probabilityLabels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
  const impactLabels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];

  const getCellColor = (level: string, riskCount: number) => {
    if (riskCount === 0) return 'bg-gray-100 border-gray-200';
    
    switch (level) {
      case 'low':
        return 'bg-green-200 border-green-300 hover:bg-green-300';
      case 'medium':
        return 'bg-yellow-200 border-yellow-300 hover:bg-yellow-300';
      case 'high':
        return 'bg-orange-200 border-orange-300 hover:bg-orange-300';
      case 'critical':
        return 'bg-red-200 border-red-300 hover:bg-red-300';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getTextColor = (level: string, riskCount: number) => {
    if (riskCount === 0) return 'text-gray-400';
    
    switch (level) {
      case 'low':
        return 'text-green-800';
      case 'medium':
        return 'text-yellow-800';
      case 'high':
        return 'text-orange-800';
      case 'critical':
        return 'text-red-800';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Risk Heatmap</h3>
          <p className="text-sm text-gray-500">Probability vs Impact Matrix</p>
        </div>
        <div className="flex space-x-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-200 rounded mr-1"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-200 rounded mr-1"></div>
            <span>Med</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-200 rounded mr-1"></div>
            <span>High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-200 rounded mr-1"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-96">
          {/* Impact Label */}
          <div className="text-center mb-2">
            <span className="text-xs font-medium text-gray-700">Impact →</span>
          </div>
          
          <div className="flex">
            {/* Probability Label */}
            <div className="flex flex-col justify-center mr-2">
              <div className="text-xs font-medium text-gray-700 transform -rotate-90 whitespace-nowrap">
                ← Probability
              </div>
            </div>
            
            {/* Heatmap Grid */}
            <div className="flex-1">
              {/* Impact Headers */}
              <div className="flex mb-1">
                <div className="w-12"></div>
                {impactLabels.map((label, index) => (
                  <div key={index} className="flex-1 text-center">
                    <span className="text-xs text-gray-600">{label.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
              
              {/* Matrix Rows */}
              {riskMatrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex mb-1">
                  {/* Probability Label */}
                  <div className="w-12 flex items-center justify-end pr-2">
                    <span className="text-xs text-gray-600">
                      {probabilityLabels[rowIndex].split(' ')[0]}
                    </span>
                  </div>
                  
                  {/* Risk Cells */}
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`flex-1 aspect-square border-2 rounded flex items-center justify-center cursor-pointer transition-all m-0.5 ${getCellColor(cell.level, cell.risks)}`}
                      title={`${cell.risks} risks - ${probabilityLabels[rowIndex]} probability, ${impactLabels[colIndex]} impact`}
                    >
                      <span className={`text-sm font-bold ${getTextColor(cell.level, cell.risks)}`}>
                        {cell.risks > 0 ? cell.risks : ''}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-600">
              {riskMatrix.flat().filter(cell => cell.level === 'critical').reduce((sum, cell) => sum + cell.risks, 0)}
            </div>
            <div className="text-xs text-gray-500">Critical Risks</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">
              {riskMatrix.flat().filter(cell => cell.level === 'high').reduce((sum, cell) => sum + cell.risks, 0)}
            </div>
            <div className="text-xs text-gray-500">High Risks</div>
          </div>
        </div>
      </div>
    </div>
  );
}