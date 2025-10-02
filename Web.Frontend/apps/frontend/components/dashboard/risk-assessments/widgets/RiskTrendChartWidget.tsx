"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RiskTrendChartWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function RiskTrendChartWidget({ id, isEditMode }: RiskTrendChartWidgetProps) {
  // Demo data for risk assessment trends
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'High Risk',
        data: [12, 15, 8, 11, 9, 8],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Medium Risk',
        data: [28, 32, 25, 29, 31, 27],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Low Risk',
        data: [45, 38, 52, 48, 44, 51],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Total Assessments',
        data: [85, 85, 85, 88, 84, 86],
        borderColor: 'rgb(61, 58, 114)',
        backgroundColor: 'rgba(61, 58, 114, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(61, 58, 114)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6B7280',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Risk Assessment Trends</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          <span>6 months</span>
        </div>
      </div>
      
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
      
      {/* Summary stats below chart */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-semibold text-red-600">8</div>
            <div className="text-xs text-gray-500">High Risk</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-yellow-600">27</div>
            <div className="text-xs text-gray-500">Medium Risk</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-green-600">51</div>
            <div className="text-xs text-gray-500">Low Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
}