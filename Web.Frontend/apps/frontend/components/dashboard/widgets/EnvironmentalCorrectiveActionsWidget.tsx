"use client";

import React from 'react';

interface EnvironmentalCorrectiveActionsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function EnvironmentalCorrectiveActionsWidget({ id, isEditMode }: EnvironmentalCorrectiveActionsWidgetProps) {
  const correctiveActionsData = {
    total: 15,
    completed: 8,
    inProgress: 5,
    overdue: 2,
    actions: [
      {
        id: 1,
        title: 'Install new containment system',
        category: 'Spill',
        priority: 'High',
        dueDate: '2024-01-15',
        status: 'In Progress',
        assignee: 'John Smith',
        progress: 65
      },
      {
        id: 2,
        title: 'Update waste disposal procedures',
        category: 'Waste',
        priority: 'Medium',
        dueDate: '2024-01-10',
        status: 'Overdue',
        assignee: 'Sarah Johnson',
        progress: 30
      },
      {
        id: 3,
        title: 'Calibrate air quality monitors',
        category: 'Emission',
        priority: 'Low',
        dueDate: '2024-01-20',
        status: 'Completed',
        assignee: 'Mike Wilson',
        progress: 100
      },
      {
        id: 4,
        title: 'Noise reduction barriers installation',
        category: 'Noise',
        priority: 'High',
        dueDate: '2024-01-12',
        status: 'In Progress',
        assignee: 'Lisa Brown',
        progress: 85
      },
      {
        id: 5,
        title: 'Water quality testing protocol review',
        category: 'Water Quality',
        priority: 'Medium',
        dueDate: '2024-01-18',
        status: 'Pending',
        assignee: 'David Lee',
        progress: 0
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-l-red-500';
      case 'Medium': return 'border-l-yellow-500';
      case 'Low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'Completed') return 'bg-green-500';
    if (status === 'Overdue') return 'bg-red-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const completionRate = Math.round((correctiveActionsData.completed / correctiveActionsData.total) * 100);

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Corrective Actions</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>All Actions</option>
          <option>Active Only</option>
          <option>Overdue Only</option>
        </select>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{correctiveActionsData.total}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-600">{correctiveActionsData.completed}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600">{correctiveActionsData.inProgress}</div>
          <div className="text-xs text-gray-600">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-red-600">{correctiveActionsData.overdue}</div>
          <div className="text-xs text-gray-600">Overdue</div>
        </div>
      </div>
      
      {/* Completion Rate */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-900">Completion Rate</span>
          <span className="text-sm font-bold text-green-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
      
      {/* Actions List */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Actions</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {correctiveActionsData.actions.slice(0, 4).map((action) => (
            <div key={action.id} className={`border-l-4 ${getPriorityColor(action.priority)} bg-gray-50 rounded-lg p-3`}>
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-sm font-medium text-gray-900 line-clamp-1">
                  {action.title}
                </h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                  {action.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                <span>{action.category}</span>
                <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Assigned: {action.assignee}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${getProgressColor(action.progress, action.status)}`}
                      style={{ width: `${action.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{action.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}