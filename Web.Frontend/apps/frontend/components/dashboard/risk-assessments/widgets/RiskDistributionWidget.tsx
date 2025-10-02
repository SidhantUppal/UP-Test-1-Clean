"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RiskDistributionWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function RiskDistributionWidget({ id, isEditMode }: RiskDistributionWidgetProps) {
  const data = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    datasets: [
      {
        data: [65, 25, 8, 2],
        backgroundColor: [
          '#10B981', // Green - Low Risk
          '#F59E0B', // Yellow - Medium Risk
          '#EF4444', // Red - High Risk
          '#991B1B', // Dark Red - Critical
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff',
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
          padding: 12,
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
        callbacks: {
          label: function(context: any) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    },
    cutout: '60%',
  };

  const totalAssessments = 156;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Risk Distribution</h3>
        <span className="text-xs text-gray-500">Total: {totalAssessments}</span>
      </div>
      
      <div className="relative h-48 mb-4">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{totalAssessments}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>
      
      {/* Risk breakdown */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-700">High + Critical</span>
          </div>
          <span className="font-semibold text-red-600">10 items</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-gray-700">Medium Risk</span>
          </div>
          <span className="font-semibold text-yellow-600">39 items</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700">Low Risk</span>
          </div>
          <span className="font-semibold text-green-600">107 items</span>
        </div>
      </div>
      
      {/* Priority indicator */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-500 mr-2">Overall Risk Level:</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            LOW
          </span>
        </div>
      </div>
    </div>
  );
}