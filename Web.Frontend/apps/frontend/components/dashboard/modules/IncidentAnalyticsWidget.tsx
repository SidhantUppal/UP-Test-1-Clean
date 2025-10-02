'use client';

import React from 'react';
import Link from 'next/link';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

interface IncidentAnalyticsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function IncidentAnalyticsWidget({ id, isEditMode }: IncidentAnalyticsWidgetProps) {
  const trendData = {
    labels: ['Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025'],
    datasets: [
      {
        label: 'High Risk',
        data: [1, 2, 1, 1, 2, 1],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Medium Risk',
        data: [3, 4, 2, 3, 5, 4],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Low Risk',
        data: [6, 7, 5, 7, 8, 7],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const categoryData = {
    labels: ['Slip/Trip', 'Equipment', 'Chemical', 'Environmental', 'Other'],
    datasets: [
      {
        data: [35, 25, 15, 20, 5],
        backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 12 },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
      },
    },
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 10,
          font: { size: 11 },
        },
      },
    },
  };

  const kpiData = [
    { label: 'Total Incidents', value: 104, change: -27, trend: 'down' },
    { label: 'Days Since Last', value: 3, change: -18, trend: 'down' },
    { label: 'Avg Resolution', value: '3.1d', change: -24, trend: 'down' },
    { label: 'Open Actions', value: 30, change: -14, trend: 'down' },
  ];

  return (
    <Link href="/incidents" className="block h-full">
      <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Incident Analytics</h3>
            <p className="text-sm text-gray-600">Advanced incident insights & trends</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
            <span>PRO</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-1">{kpi.label}</div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-gray-900">{kpi.value}</div>
                <div className={`flex items-center text-xs font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                  <span className="ml-1">
                    {kpi.trend === 'up' ? '↗' : '↘'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 pointer-events-none">
          {/* Trend Chart */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">6-Month Trend</h4>
            <div className="h-32">
              <Line data={trendData} options={trendOptions} />
            </div>
          </div>

          {/* Category Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">By Category</h4>
            <div className="h-32">
              <Doughnut data={categoryData} options={categoryOptions} />
            </div>
          </div>
        </div>

        {/* Recent High-Risk Items */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent High-Risk Incidents</h4>
          <div className="space-y-2">
            {[
              { id: 'INC-2025-078', type: 'Chemical Spill', date: '2 days ago', status: 'investigating' },
              { id: 'INC-2025-077', type: 'Equipment Failure', date: '5 days ago', status: 'resolved' },
              { id: 'INC-2025-076', type: 'Slip/Fall', date: '1 week ago', status: 'closed' },
            ].map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{incident.id}</div>
                  <div className="text-xs text-gray-600">{incident.type} • {incident.date}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Remove or make them non-functional */}
        <div className="mt-4 flex gap-2 pointer-events-none">
          <div 
            className="flex-1 px-3 py-2 text-white text-sm rounded-lg text-center"
            style={{ backgroundColor: '#3d3a72' }}
          >
            Full Report
          </div>
          <div className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg text-center">
            Export Data
          </div>
        </div>
      </div>
    </Link>
  );
}