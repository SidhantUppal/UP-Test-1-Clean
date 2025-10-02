'use client';

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

interface IncidentTrendWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function IncidentTrendWidget({ id, isEditMode }: IncidentTrendWidgetProps) {
  const data = {
    labels: ['Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025'],
    datasets: [
      {
        label: 'Near Miss',
        data: [7, 9, 6, 8, 11, 9],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Accidents',
        data: [2, 3, 1, 2, 3, 2],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Incident Trends</h3>
        <span className="text-xs text-gray-500">Last 6 months</span>
      </div>
      
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600">Sep 2025</div>
          <div className="text-xl font-bold text-blue-700">9</div>
          <div className="text-xs text-blue-600">Near Miss</div>
        </div>
        <div className="p-2 bg-red-50 rounded-lg border border-red-200">
          <div className="text-sm text-red-600">Sep 2025</div>
          <div className="text-xl font-bold text-red-700">2</div>
          <div className="text-xs text-red-600">Accidents</div>
        </div>
      </div>
    </div>
  );
}