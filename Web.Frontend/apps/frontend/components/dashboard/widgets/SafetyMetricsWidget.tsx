'use client';

import React from 'react';
import Link from 'next/link';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SafetyMetricsWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function SafetyMetricsWidget({ id, isEditMode }: SafetyMetricsWidgetProps) {
  const data = {
    labels: ['Completed', 'In Progress', 'Overdue', 'Pending'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          '#10B981', // Green - Completed
          '#3B82F6', // Blue - In Progress
          '#EF4444', // Red - Overdue
          '#F59E0B', // Yellow - Pending
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3,
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
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    },
    cutout: '60%',
  };

  const totalTasks = 156;
  const completionRate = 65;

  return (
    <Link href="/tasks/my" className="block h-full">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Safety Tasks</h3>
          <span className="text-xs text-gray-500">This month</span>
        </div>
        
        <div className="relative h-48 mb-4">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{completionRate}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="text-lg font-bold text-green-600">101</div>
            <div className="text-xs text-green-700">Completed</div>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-600">31</div>
            <div className="text-xs text-blue-700">In Progress</div>
          </div>
        </div>
      </div>
    </Link>
  );
}