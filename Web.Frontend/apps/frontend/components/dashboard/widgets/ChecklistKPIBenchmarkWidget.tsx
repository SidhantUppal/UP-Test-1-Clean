"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ChecklistKPIBenchmarkWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistKPIBenchmarkWidget({ id, isEditMode }: ChecklistKPIBenchmarkWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({});
  const widgetRef = useRef<HTMLDivElement>(null);

  // Demo KPI data with industry benchmarks for checklists
  const kpiData = {
    checklistCompletionRate: {
      current: 94,
      benchmark: 88,
      industryStandard: 85,
      label: 'Checklist Completion Rate',
      unit: '%',
      trend: '+6%'
    },
    avgCompletionTime: {
      current: 12,
      benchmark: 15,
      industryStandard: 18,
      label: 'Avg. Completion Time',
      unit: ' mins',
      trend: '-3'
    },
    qualityScore: {
      current: 91,
      benchmark: 85,
      industryStandard: 82,
      label: 'Quality Score',
      unit: '%',
      trend: '+6%'
    },
    complianceRate: {
      current: 97,
      benchmark: 92,
      industryStandard: 89,
      label: 'Compliance Rate',
      unit: '%',
      trend: '+5%'
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => {
      if (widgetRef.current) {
        observer.unobserve(widgetRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 1500;
      const steps = 30;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const newValues: {[key: string]: number} = {};
        Object.entries(kpiData).forEach(([key, kpi]) => {
          newValues[key] = kpi.current * easeProgress;
        });
        setAnimatedValues(newValues);

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const getPerformanceColor = (current: number, benchmark: number) => {
    const diff = ((current - benchmark) / benchmark) * 100;
    if (diff >= 5) return 'text-green-600';
    if (diff >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (current: number, benchmark: number) => {
    const diff = ((current - benchmark) / benchmark) * 100;
    if (diff >= 5) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (diff >= 0) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  const getBenchmarkPosition = (benchmark: number, max: number) => {
    return (benchmark / max) * 100;
  };

  return (
    <Link href="/checklists" className="block h-full">
      <div 
        ref={widgetRef}
        className={`h-full p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-700 cursor-pointer
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Checklist KPIs & Benchmarks</h3>
          <div className="flex items-center">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Industry Standards</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(kpiData).map(([key, kpi], index) => {
            const maxValue = key === 'avgCompletionTime' ? 25 : 100;
            const isInverted = key === 'avgCompletionTime'; // Lower is better for completion time
            const currentAnimatedValue = animatedValues[key] || 0;
            
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{kpi.label}</span>
                    <span className={`text-xs font-semibold ${getPerformanceColor(
                      isInverted ? -kpi.current : kpi.current, 
                      isInverted ? -kpi.benchmark : kpi.benchmark
                    )}`}>
                      {kpi.trend}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      Current: <span className="font-semibold text-gray-900">
                        {Math.floor(currentAnimatedValue)}{kpi.unit}
                      </span>
                    </span>
                    <span className="text-blue-600">
                      Benchmark: <span className="font-semibold">{kpi.benchmark}{kpi.unit}</span>
                    </span>
                  </div>
                </div>
                
                {/* Progress bar with benchmark marker */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-[1500ms] ease-out ${getProgressBarColor(
                        isInverted ? -kpi.current : kpi.current,
                        isInverted ? -kpi.benchmark : kpi.benchmark
                      )}`}
                      style={{ 
                        width: isVisible ? `${Math.min((currentAnimatedValue / maxValue) * 100, 100)}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                  
                  {/* Benchmark marker */}
                  <div 
                    className={`absolute top-0 w-1 h-3 bg-blue-600 rounded-full transform -translate-x-0.5 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      left: `${Math.min(getBenchmarkPosition(kpi.benchmark, maxValue), 95)}%`,
                      transitionDelay: `${1000 + index * 100}ms`
                    }}
                    title={`Industry Benchmark: ${kpi.benchmark}${kpi.unit}`}
                  ></div>
                  
                  {/* Industry standard marker */}
                  <div 
                    className={`absolute top-0 w-1 h-3 bg-gray-500 rounded-full transform -translate-x-0.5 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      left: `${Math.min(getBenchmarkPosition(kpi.industryStandard, maxValue), 95)}%`,
                      transitionDelay: `${1200 + index * 100}ms`
                    }}
                    title={`Industry Standard: ${kpi.industryStandard}${kpi.unit}`}
                  ></div>
                </div>
                
                {/* Legend */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0{kpi.unit}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Industry Avg
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Benchmark
                    </span>
                  </div>
                  <span>{maxValue}{kpi.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Overall Performance</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-green-600">Exceeds Benchmark</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}