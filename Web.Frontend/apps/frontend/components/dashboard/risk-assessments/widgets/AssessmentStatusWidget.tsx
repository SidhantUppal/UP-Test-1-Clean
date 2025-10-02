"use client";

import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AssessmentStatusWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function AssessmentStatusWidget({ id, isEditMode }: AssessmentStatusWidgetProps) {
  const data = {
    labels: ['Current', 'Due Soon', 'Overdue', 'Draft', 'Under Review'],
    datasets: [
      {
        label: 'Assessments',
        data: [124, 15, 12, 8, 6],
        backgroundColor: [
          '#10B981', // Green - Current
          '#F59E0B', // Yellow - Due Soon
          '#EF4444', // Red - Overdue
          '#6B7280', // Gray - Draft
          '#3d3a72', // Purple - Under Review
        ],
        borderColor: [
          '#059669',
          '#D97706',
          '#DC2626',
          '#4B5563',
          '#312e81',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner look
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y} assessments`;
          }
        }
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
            size: 10,
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
            size: 10,
          },
          color: '#6B7280',
          maxRotation: 45,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Assessment Status</h3>
        <span className="text-xs text-gray-500">All time</span>
      </div>
      
      <div className="h-48 mb-4">
        <Bar data={data} options={options} />
      </div>
      
      {/* Status summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span className="text-gray-700">Needs attention</span>
          </div>
          <span className="font-semibold text-red-600">27 items</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-700">Up to date</span>
          </div>
          <span className="font-semibold text-green-600">124 items</span>
        </div>
      </div>
      
      {/* Action indicator */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-500 mr-2">Priority Action:</span>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
            12 OVERDUE
          </span>
        </div>
      </div>
    </div>
  );
}