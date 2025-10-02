'use client';

import React from 'react';

interface TaskProgressWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function TaskProgressWidget({ id, isEditMode }: TaskProgressWidgetProps) {
  const tasks = [
    { id: 1, title: 'Safety Inspection Report', priority: 'high', progress: 85, dueDate: 'Today', assignee: 'John D.' },
    { id: 2, title: 'Equipment Maintenance', priority: 'medium', progress: 60, dueDate: 'Tomorrow', assignee: 'Sarah K.' },
    { id: 3, title: 'Training Module Update', priority: 'low', progress: 30, dueDate: 'Friday', assignee: 'Mike R.' },
    { id: 4, title: 'Risk Assessment Review', priority: 'high', progress: 95, dueDate: 'Next Week', assignee: 'Lisa M.' },
  ];

  const overallProgress = Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Task Progress</h3>
          <p className="text-sm text-gray-600">Active tasks and deadlines</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
          <div className="text-sm text-gray-500">overall</div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="text-sm font-medium text-gray-900">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(overallProgress)}`}
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4 mb-4">
        {tasks.map((task) => (
          <div key={task.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium text-gray-700">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Due: {task.dueDate}</span>
              <span>Assigned to: {task.assignee}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{tasks.length}</div>
          <div className="text-xs text-blue-700">Active</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-lg font-bold text-yellow-600">{tasks.filter(t => t.dueDate === 'Today' || t.dueDate === 'Tomorrow').length}</div>
          <div className="text-xs text-yellow-700">Due Soon</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">{tasks.filter(t => t.progress >= 90).length}</div>
          <div className="text-xs text-green-700">Near Done</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          className="flex-1 px-3 py-2 text-white text-sm rounded-lg transition-colors"
          style={{ backgroundColor: '#3d3a72' }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2d2a5a'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3d3a72'}
        >
          View All Tasks
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
          New Task
        </button>
      </div>
    </div>
  );
}