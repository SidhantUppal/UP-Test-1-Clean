"use client";

import React from 'react';

interface HeinrichTriangleProps {
  data: {
    majorInjury: number;
    minorInjury: number;
    propertyDamage: number;
    nearMiss: number;
    unsafeActs: number;
  };
}

export const HeinrichTriangle = ({ data }: HeinrichTriangleProps) => {
  const levels = [
    { 
      label: 'Major Injury', 
      value: data.majorInjury, 
      color: '#7f1d1d', // Dark red
      textColor: '#ffffff',
      description: 'Fatality or serious injury'
    },
    { 
      label: 'Minor Injury', 
      value: data.minorInjury, 
      color: '#dc2626', // Red
      textColor: '#ffffff',
      description: 'First aid or medical treatment'
    },
    { 
      label: 'Property Damage', 
      value: data.propertyDamage, 
      color: '#f97316', // Orange
      textColor: '#ffffff',
      description: 'Equipment or material damage'
    },
    { 
      label: 'Near Miss', 
      value: data.nearMiss, 
      color: '#fbbf24', // Yellow
      textColor: '#000000',
      description: 'No injury but potential existed'
    },
    { 
      label: 'Unsafe Acts/Conditions', 
      value: data.unsafeActs, 
      color: '#10b981', // Green
      textColor: '#ffffff',
      description: 'Behaviors or conditions'
    }
  ];

  return (
    <div className="w-full">
      {/* Triangle Container */}
      <div className="flex justify-center mb-6">
        <svg
          viewBox="0 0 800 400"
          className="w-full max-w-4xl"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Create the full triangle outline */}
          <defs>
            <path id="triangleOutline" d="M 400 50 L 100 350 L 700 350 Z" />
          </defs>
          
          {/* Draw each horizontal slice */}
          {levels.map((level, index) => {
            const totalLevels = levels.length;
            const topY = 50 + (index / totalLevels) * 300;
            const bottomY = 50 + ((index + 1) / totalLevels) * 300;
            
            // Calculate width at each Y position based on triangle proportions
            const triangleHeight = 300;
            const triangleBase = 600;
            
            const topProgress = (topY - 50) / triangleHeight;
            const bottomProgress = (bottomY - 50) / triangleHeight;
            
            const topWidth = topProgress * triangleBase / 2;
            const bottomWidth = bottomProgress * triangleBase / 2;
            
            // Create horizontal slice
            const pathData = `
              M ${400 - topWidth} ${topY}
              L ${400 + topWidth} ${topY}
              L ${400 + bottomWidth} ${bottomY}
              L ${400 - bottomWidth} ${bottomY}
              Z
            `;
            
            return (
              <g key={level.label}>
                <path
                  d={pathData}
                  fill={level.color}
                  stroke="white"
                  strokeWidth="2"
                />
                
                {/* Text */}
                <text
                  x="400"
                  y={(topY + bottomY) / 2 - 3}
                  textAnchor="middle"
                  fill={level.textColor}
                  fontSize="16"
                  fontWeight="bold"
                >
                  {level.value}
                </text>
                <text
                  x="400"
                  y={(topY + bottomY) / 2 + 10}
                  textAnchor="middle"
                  fill={level.textColor}
                  fontSize="10"
                  fontWeight="500"
                >
                  {level.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {levels.map((level) => (
          <div key={level.label} className="flex items-start gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: level.color }}
            />
            <div>
              <p className="text-xs font-semibold text-gray-700">{level.label}</p>
              <p className="text-xs text-gray-500">{level.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};