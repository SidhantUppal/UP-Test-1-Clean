"use client";

import React from 'react';

interface TaskPriorityWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function TaskPriorityWidget({ id, isEditMode }: TaskPriorityWidgetProps) {
  // Mock priority task data
  const priorityTasks = [
    {
      id: 1,
      title: 'Emergency Safety Audit',
      priority: 'Critical',
      dueDate: 'Today',
      assignee: 'Safety Team',
      color: 'bg-red-100 border-red-300 text-red-800'
    },
    {
      id: 2,
      title: 'Contractor Compliance Check',
      priority: 'High',
      dueDate: 'Tomorrow',
      assignee: 'John Smith',
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    },
    {
      id: 3,
      title: 'Equipment Inspection Report',
      priority: 'High',
      dueDate: 'This Week',
      assignee: 'Mike Davis',
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    }
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return '🚨';
      case 'High':
        return '⚠️';
      case 'Medium':
        return '📋';
      case 'Low':
        return '📝';
      default:
        return '📋';
    }
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Priority Tasks</h3>
        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
          {priorityTasks.length} urgent
        </span>
      </div>
      
      <div className="space-y-3">
        {priorityTasks.map((task) => (
          <div key={task.id} className={`p-3 rounded-lg border ${task.color} hover:shadow-sm transition-all cursor-pointer`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                <div>
                  <h4 className="text-sm font-medium truncate">{task.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs opacity-75">Due: {task.dueDate}</span>
                    <span className="text-xs opacity-75">•</span>
                    <span className="text-xs opacity-75">{task.assignee}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded bg-white/50">
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {priorityTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-2xl mb-2">✅</div>
          <p className="text-sm">No priority tasks</p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View All Priority Tasks →
        </button>
      </div>
    </div>
  );
}