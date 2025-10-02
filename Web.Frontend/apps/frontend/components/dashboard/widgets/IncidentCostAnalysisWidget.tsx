"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IncidentCostAnalysisWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function IncidentCostAnalysisWidget({ 
  id, 
  isEditMode, 
  onRemove 
}: IncidentCostAnalysisWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeView, setActiveView] = useState<'monthly' | 'category' | 'roi'>('monthly');
  const widgetRef = useRef<HTMLDivElement>(null);

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

  // Cost data (dummy data)
  const monthlyCosts = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Direct Costs',
        data: [45000, 32000, 58000, 41000, 37000, 52000],
        backgroundColor: '#ef4444',
        borderRadius: 4,
      },
      {
        label: 'Indirect Costs',
        data: [28000, 19000, 35000, 26000, 22000, 31000],
        backgroundColor: '#f97316',
        borderRadius: 4,
      }
    ]
  };

  const costByCategory = {
    labels: ['Equipment', 'Medical', 'Downtime', 'Investigation', 'Legal', 'Environmental'],
    datasets: [{
      label: 'Cost (£)',
      data: [125000, 45000, 89000, 23000, 67000, 34000],
      backgroundColor: [
        '#3b82f6',
        '#ef4444', 
        '#f59e0b',
        '#10b981',
        '#8b5cf6',
        '#06b6d4'
      ],
      borderRadius: 6,
    }]
  };

  const roiData = {
    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    datasets: [
      {
        label: 'Incident Costs',
        data: [135000, 98000, 112000, 78000],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Prevention Investment',
        data: [25000, 35000, 45000, 55000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const keyMetrics = {
    totalCostYTD: 383000,
    averageCostPerIncident: 8128,
    preventionBudget: 160000,
    budgetVariance: -12,
    projectedYearEnd: 520000,
    roiOnPrevention: 285
  };

  const costBreakdown = [
    { category: 'Equipment Damage', amount: 125000, percentage: 33 },
    { category: 'Production Downtime', amount: 89000, percentage: 23 },
    { category: 'Legal & Compliance', amount: 67000, percentage: 17 },
    { category: 'Medical Treatment', amount: 45000, percentage: 12 },
    { category: 'Environmental Cleanup', amount: 34000, percentage: 9 },
    { category: 'Investigation Costs', amount: 23000, percentage: 6 }
  ];

  const riskFactors = [
    { factor: 'Equipment Age', impact: 'High', cost: '£65k/year', trend: 'increasing' },
    { factor: 'Training Gaps', impact: 'Medium', cost: '£23k/year', trend: 'stable' },
    { factor: 'Process Complexity', impact: 'Medium', cost: '£18k/year', trend: 'decreasing' },
    { factor: 'Contractor Safety', impact: 'High', cost: '£34k/year', trend: 'increasing' }
  ];

  return (
    <div 
      ref={widgetRef}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Cost Impact Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">Financial impact and ROI analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">£{keyMetrics.totalCostYTD.toLocaleString()}</div>
              <div className="text-xs text-gray-500">YTD Total Cost</div>
            </div>
            {isEditMode && (
              <button
                onClick={() => onRemove?.(id)}
                className="ml-4 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* View Selector */}
        <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'monthly', label: 'Monthly Costs' },
            { key: 'category', label: 'By Category' },
            { key: 'roi', label: 'ROI Analysis' }
          ].map((view) => (
            <button
              key={view.key}
              onClick={() => setActiveView(view.key as any)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeView === view.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeView === 'monthly' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Monthly Cost Breakdown</h4>
              <div className="h-64">
                <Bar 
                  data={monthlyCosts}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: { stacked: true },
                      y: { 
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return '£' + (value as number / 1000) + 'k';
                          }
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return context.dataset.label + ': £' + context.parsed.y.toLocaleString();
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="text-sm text-red-700 font-medium">Avg Cost/Incident</div>
                <div className="text-xl font-bold text-red-900">£{keyMetrics.averageCostPerIncident.toLocaleString()}</div>
                <div className="text-xs text-red-600 mt-1">18% increase vs last year</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-700 font-medium">Budget Variance</div>
                <div className="text-xl font-bold text-blue-900">{keyMetrics.budgetVariance}%</div>
                <div className="text-xs text-blue-600 mt-1">Under budget this year</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="text-sm text-yellow-700 font-medium">Projected Year-End</div>
                <div className="text-xl font-bold text-yellow-900">£{keyMetrics.projectedYearEnd.toLocaleString()}</div>
                <div className="text-xs text-yellow-600 mt-1">Based on current trends</div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'category' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Cost by Category</h4>
              <div className="h-64">
                <Bar 
                  data={costByCategory}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y' as const,
                    scales: {
                      x: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return '£' + (value as number / 1000) + 'k';
                          }
                        }
                      }
                    },
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return '£' + context.parsed.x.toLocaleString();
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Breakdown Table */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Cost Breakdown</h4>
              <div className="space-y-2">
                {costBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.category}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-bold text-gray-900">£{item.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'roi' && (
          <div className="space-y-6">
            {/* ROI Chart */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Prevention Investment vs Incident Costs</h4>
              <div className="h-48">
                <Line 
                  data={roiData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return '£' + (value as number / 1000) + 'k';
                          }
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return context.dataset.label + ': £' + context.parsed.y.toLocaleString();
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* ROI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-900">{keyMetrics.roiOnPrevention}%</div>
                <div className="text-sm text-green-700">ROI on Prevention</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <div className="text-2xl font-bold text-blue-900">£{keyMetrics.preventionBudget.toLocaleString()}</div>
                <div className="text-sm text-blue-700">Prevention Budget</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                <div className="text-2xl font-bold text-yellow-900">42%</div>
                <div className="text-sm text-yellow-700">Cost Reduction</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
                <div className="text-2xl font-bold text-purple-900">£2.85</div>
                <div className="text-sm text-purple-700">Saved per £1 invested</div>
              </div>
            </div>

            {/* Risk Factors */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Cost Risk Factors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{risk.factor}</div>
                        <div className="text-sm text-gray-600">{risk.cost}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          risk.impact === 'High' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {risk.impact} Impact
                        </div>
                        <div className={`text-xs ${
                          risk.trend === 'increasing' ? 'text-red-500' : 
                          risk.trend === 'decreasing' ? 'text-green-500' : 'text-gray-500'
                        }`}>
                          {risk.trend === 'increasing' ? '↗' : 
                           risk.trend === 'decreasing' ? '↘' : '→'} {risk.trend}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}