'use client';

import React from 'react';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChecklistSummaryWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function ChecklistSummaryWidget({ id, isEditMode }: ChecklistSummaryWidgetProps) {
  const data = {
    labels: ['Safety Checks', 'Equipment', 'Quality', 'Maintenance', 'Environmental'],
    datasets: [
      {
        label: 'Completed',
        data: [12, 8, 15, 6, 9],
        backgroundColor: '#10B981',
        borderRadius: 6,
      },
      {
        label: 'Pending',
        data: [3, 4, 2, 8, 1],
        backgroundColor: '#F59E0B',
        borderRadius: 6,
      },
      {
        label: 'Overdue',
        data: [1, 2, 0, 3, 0],
        backgroundColor: '#EF4444',
        borderRadius: 6,
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
          padding: 15,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const totalCompleted = 50;
  const totalPending = 18;
  const totalOverdue = 6;
  const completionRate = Math.round((totalCompleted / (totalCompleted + totalPending + totalOverdue)) * 100);

  return (
    <Link href="/checklists/manage" className="block h-full">
      <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Checklist Summary</h3>
            <p className="text-sm text-gray-600">This week's checklist performance</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
            <div className="text-sm text-gray-500">completion</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">{totalCompleted}</div>
            <div className="text-xs text-green-700">Completed</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-xl font-bold text-yellow-600">{totalPending}</div>
            <div className="text-xs text-yellow-700">Pending</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-xl font-bold text-red-600">{totalOverdue}</div>
            <div className="text-xs text-red-700">Overdue</div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48 pointer-events-none">
          <Bar data={data} options={options} />
        </div>
      </div>
    </Link>
  );
}