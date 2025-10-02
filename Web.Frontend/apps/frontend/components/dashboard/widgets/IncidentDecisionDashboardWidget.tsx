"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface IncidentDecisionDashboardWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function IncidentDecisionDashboardWidget({ 
  id, 
  isEditMode, 
  onRemove 
}: IncidentDecisionDashboardWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'costs' | 'actions'>('overview');
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

  // Key Decision Metrics (dummy data)
  const decisionMetrics = {
    totalIncidents: 47,
    openIncidents: 12,
    criticalIncidents: 3,
    averageResolutionDays: 4.2,
    complianceRate: 94,
    investigationBacklog: 8,
    estimatedCosts: 125000,
    riskScore: 73
  };

  // Severity Distribution
  const severityData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [8, 15, 18, 6],
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
      borderWidth: 0
    }]
  };

  // Monthly Incident Trends
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Incidents',
        data: [32, 28, 35, 42, 38, 47],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Critical Incidents',
        data: [5, 3, 8, 6, 4, 8],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Resolution Time by Category
  const resolutionData = {
    labels: ['Equipment', 'Slip/Trip', 'Chemical', 'Fire', 'Environmental'],
    datasets: [{
      label: 'Avg Days to Resolve',
      data: [5.2, 2.8, 7.1, 3.5, 9.2],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      borderRadius: 4
    }]
  };

  const getMetricColor = (value: number, type: 'incident' | 'compliance' | 'time' | 'risk') => {
    switch (type) {
      case 'incident':
        return value > 5 ? 'text-red-600' : value > 2 ? 'text-yellow-600' : 'text-green-600';
      case 'compliance':
        return value >= 95 ? 'text-green-600' : value >= 90 ? 'text-yellow-600' : 'text-red-600';
      case 'time':
        return value > 7 ? 'text-red-600' : value > 4 ? 'text-yellow-600' : 'text-green-600';
      case 'risk':
        return value > 80 ? 'text-red-600' : value > 60 ? 'text-yellow-600' : 'text-green-600';
      default:
        return 'text-gray-700';
    }
  };

  const priorityActions = [
    { id: 1, title: 'Chemical Spill Investigation', priority: 'Critical', daysOpen: 2, location: 'Workshop A' },
    { id: 2, title: 'Equipment Failure Analysis', priority: 'High', daysOpen: 5, location: 'Production Line 3' },
    { id: 3, title: 'Near Miss Follow-up', priority: 'Medium', daysOpen: 1, location: 'Warehouse B' },
    { id: 4, title: 'RIDDOR Submission', priority: 'Critical', daysOpen: 0, location: 'Office Complex' }
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
            <h3 className="text-xl font-bold text-gray-900">Incident Decision Dashboard</h3>
            <p className="text-sm text-gray-600 mt-1">Critical metrics for decision making</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live Data</span>
            </div>
            {isEditMode && (
              <button
                onClick={() => onRemove?.(id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'trends', label: 'Trends' },
            { key: 'costs', label: 'Impact' },
            { key: 'actions', label: 'Actions' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-700 font-medium">Critical Incidents</p>
                    <p className={`text-2xl font-bold ${getMetricColor(decisionMetrics.criticalIncidents, 'incident')}`}>
                      {decisionMetrics.criticalIncidents}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                    <span className="text-red-700 text-lg">⚠️</span>
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-2">Require immediate attention</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Open Cases</p>
                    <p className="text-2xl font-bold text-blue-900">{decisionMetrics.openIncidents}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 text-lg">📋</span>
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2">Total active incidents</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-700 font-medium">Avg Resolution</p>
                    <p className={`text-2xl font-bold ${getMetricColor(decisionMetrics.averageResolutionDays, 'time')}`}>
                      {decisionMetrics.averageResolutionDays}d
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                    <span className="text-yellow-700 text-lg">⏱️</span>
                  </div>
                </div>
                <p className="text-xs text-yellow-600 mt-2">Days to close incidents</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Compliance</p>
                    <p className={`text-2xl font-bold ${getMetricColor(decisionMetrics.complianceRate, 'compliance')}`}>
                      {decisionMetrics.complianceRate}%
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                    <span className="text-green-700 text-lg">✅</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">RIDDOR compliance rate</p>
              </div>
            </div>

            {/* Severity Distribution */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Severity Distribution</h4>
              <div className="h-40">
                <Doughnut 
                  data={severityData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { fontSize: 10 }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="h-64">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Incident Trends (6 Months)</h4>
              <Line 
                data={trendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true }
                  }
                }}
              />
            </div>
            <div className="h-48">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Resolution Time by Category</h4>
              <Bar 
                data={resolutionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Days' } }
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Costs Tab */}
        {activeTab === 'costs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Financial Impact</h4>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">Estimated Costs (YTD)</span>
                  <span className="text-xl font-bold text-red-900">£{decisionMetrics.estimatedCosts.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-xs text-red-600">
                  Direct costs: £75,000 | Indirect costs: £50,000
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Equipment Damage</span>
                  <span className="font-medium">£45,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Production Downtime</span>
                  <span className="font-medium">£38,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Medical Costs</span>
                  <span className="font-medium">£22,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Investigation Costs</span>
                  <span className="font-medium">£20,000</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Risk Assessment</h4>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700">Current Risk Score</span>
                  <span className={`text-xl font-bold ${getMetricColor(decisionMetrics.riskScore, 'risk')}`}>
                    {decisionMetrics.riskScore}/100
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${decisionMetrics.riskScore}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="text-sm font-medium text-blue-900 mb-2">Recommendations</h5>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Increase safety training frequency</li>
                  <li>• Review equipment maintenance schedules</li>
                  <li>• Implement additional safety measures in Workshop A</li>
                  <li>• Conduct root cause analysis on repeat incidents</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">Priority Actions Required</h4>
              <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
            
            <div className="space-y-3">
              {priorityActions.map((action) => (
                <div key={action.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          action.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                          action.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {action.priority}
                        </span>
                        <span className="text-xs text-gray-500">{action.location}</span>
                      </div>
                      <h5 className="font-medium text-gray-900">{action.title}</h5>
                      <p className="text-sm text-gray-600">Open for {action.daysOpen} {action.daysOpen === 1 ? 'day' : 'days'}</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                      Take Action
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button className="p-2 bg-white border border-gray-200 rounded text-xs hover:bg-gray-50 transition-colors">
                  📝 New Incident
                </button>
                <button className="p-2 bg-white border border-gray-200 rounded text-xs hover:bg-gray-50 transition-colors">
                  🔍 Investigate
                </button>
                <button className="p-2 bg-white border border-gray-200 rounded text-xs hover:bg-gray-50 transition-colors">
                  📊 Generate Report
                </button>
                <button className="p-2 bg-white border border-gray-200 rounded text-xs hover:bg-gray-50 transition-colors">
                  ⚠️ Risk Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}