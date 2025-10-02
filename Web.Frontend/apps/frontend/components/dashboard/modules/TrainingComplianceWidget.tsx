'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TrainingComplianceWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function TrainingComplianceWidget({ id, isEditMode }: TrainingComplianceWidgetProps) {
  const complianceData = {
    labels: ['Up to Date', 'Due Soon', 'Overdue'],
    datasets: [
      {
        data: [78, 12, 10],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
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
          padding: 10,
          font: { size: 11 },
        },
      },
    },
    cutout: '60%',
  };

  const trainingModules = [
    { name: 'Safety Induction', completion: 95, total: 120, color: 'bg-green-500' },
    { name: 'Fire Safety', completion: 88, total: 110, color: 'bg-blue-500' },
    { name: 'Chemical Handling', completion: 76, total: 95, color: 'bg-yellow-500' },
    { name: 'Emergency Response', completion: 82, total: 98, color: 'bg-purple-500' },
  ];

  const overallCompliance = Math.round(
    trainingModules.reduce((acc, module) => acc + (module.completion / module.total) * 100, 0) / trainingModules.length
  );

  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Training Compliance</h3>
          <p className="text-sm text-gray-600">Team training progress</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{overallCompliance}%</div>
          <div className="text-sm text-gray-500">compliant</div>
        </div>
      </div>

      {/* Compliance Chart */}
      <div className="mb-6">
        <div className="h-32 relative">
          <Doughnut data={complianceData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{overallCompliance}%</div>
              <div className="text-xs text-gray-500">Overall</div>
            </div>
          </div>
        </div>
      </div>

      {/* Training Modules Progress */}
      <div className="space-y-4 mb-6">
        {trainingModules.map((module, index) => {
          const percentage = Math.round((module.completion / module.total) * 100);
          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{module.name}</span>
                <span className="text-sm text-gray-600">{module.completion}/{module.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${module.color}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Renewals */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Upcoming Renewals</h4>
        <div className="space-y-2">
          {[
            { name: 'John Smith', module: 'Fire Safety', dueDate: '5 days' },
            { name: 'Sarah Johnson', module: 'Chemical Handling', dueDate: '12 days' },
            { name: 'Mike Wilson', module: 'Emergency Response', dueDate: '18 days' },
          ].map((renewal, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900">{renewal.name}</div>
                <div className="text-xs text-gray-600">{renewal.module}</div>
              </div>
              <div className="text-xs text-orange-600 font-medium">
                {renewal.dueDate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          Assign Training
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
          View Reports
        </button>
      </div>
    </div>
  );
}