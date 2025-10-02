"use client";

import React from 'react';
import Link from 'next/link';

interface ChecklistPriorityWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function ChecklistPriorityWidget({ id, isEditMode }: ChecklistPriorityWidgetProps) {
  const priorityTasks = [
    {
      id: 1,
      title: 'Fire Safety Inspection',
      assignee: 'John Smith',
      dueDate: '2024-01-16',
      priority: 'Critical',
      status: 'Overdue',
      progress: 0,
      category: 'Safety'
    },
    {
      id: 2,
      title: 'Equipment Calibration',
      assignee: 'Sarah Davis',
      dueDate: '2024-01-17',
      priority: 'High',
      status: 'In Progress',
      progress: 65,
      category: 'Maintenance'
    },
    {
      id: 3,
      title: 'Quality Audit Prep',
      assignee: 'Mike Johnson',
      dueDate: '2024-01-18',
      priority: 'High',
      status: 'Pending',
      progress: 0,
      category: 'Quality'
    },
    {
      id: 4,
      title: 'Compliance Review',
      assignee: 'Lisa Brown',
      dueDate: '2024-01-19',
      priority: 'Medium',
      status: 'In Progress',
      progress: 30,
      category: 'Compliance'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Priority Tasks</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>All Priorities</option>
          <option>Critical Only</option>
          <option>High Priority</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {priorityTasks.map((task) => (
          <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                <p className="text-xs text-gray-500">Assigned to {task.assignee}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>
            
            {task.progress > 0 && (
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full`}>
                {task.category}
              </span>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                {task.status === 'Pending' ? 'Start' : 'Continue'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <Link href="/checklists/manage" className="text-sm text-blue-600 hover:text-blue-800">
            View All Priority Tasks →
          </Link>
        </div>
      </div>
    </div>
  );
}