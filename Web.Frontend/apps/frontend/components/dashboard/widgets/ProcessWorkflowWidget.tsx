'use client';

import React from 'react';
import Link from 'next/link';

interface ProcessWorkflowWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function ProcessWorkflowWidget({ id, isEditMode }: ProcessWorkflowWidgetProps) {
  const workflows = [
    { 
      id: 1, 
      name: 'Safety Inspection', 
      status: 'running', 
      progress: 75, 
      steps: '7/9',
      nextStep: 'Supervisor Review',
      priority: 'high',
      estimatedTime: '45min'
    },
    { 
      id: 2, 
      name: 'Employee Onboarding', 
      status: 'running', 
      progress: 60, 
      steps: '4/7',
      nextStep: 'Document Collection',
      priority: 'medium',
      estimatedTime: '2h 15min'
    },
    { 
      id: 3, 
      name: 'Equipment Maintenance', 
      status: 'pending', 
      progress: 0, 
      steps: '0/12',
      nextStep: 'Scheduled Start',
      priority: 'low',
      estimatedTime: '4h 30min'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'paused': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <Link href="/process-home" className="block h-full">
      <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Active Workflows</h3>
          <p className="text-sm text-gray-600">Currently running process workflows</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{workflows.filter(w => w.status === 'running').length}</div>
          <div className="text-sm text-gray-500">active</div>
        </div>
      </div>

      {/* Workflow List */}
      <div className="space-y-4 mb-6">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm mb-2">{workflow.name}</h4>
                <div className="flex gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(workflow.status)}`}>
                    {workflow.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(workflow.priority)}`}>
                    {workflow.priority}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                {workflow.estimatedTime}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Progress ({workflow.steps})</span>
                <span className="text-xs font-medium text-gray-700">{workflow.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(workflow.progress)}`}
                  style={{ width: `${workflow.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Next: {workflow.nextStep}
              </div>
            </div>
          </div>
        ))}
      </div>

      </div>
    </Link>
  );
}