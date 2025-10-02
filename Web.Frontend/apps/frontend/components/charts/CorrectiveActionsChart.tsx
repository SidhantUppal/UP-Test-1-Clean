"use client";

import { useState } from 'react';

interface CorrectiveAction {
  id: string;
  title: string;
  type: 'Corrective' | 'Preventive' | 'Barrier Strengthening';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  dueDate: string;
  incidentRef: string;
  category: 'Physical' | 'Procedural' | 'Human/Behavioral' | 'Environmental Management';
  progress: number;
}

interface CorrectiveActionsChartProps {
  actions?: CorrectiveAction[];
  className?: string;
}

export default function CorrectiveActionsChart({ actions = [], className = '' }: CorrectiveActionsChartProps) {
  const [viewMode, setViewMode] = useState<'status' | 'type' | 'priority'>('status');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Sample data if none provided
  const sampleActions: CorrectiveAction[] = actions.length > 0 ? actions : [
    {
      id: '1',
      title: 'Install secondary containment bund',
      type: 'Barrier Strengthening',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'John Smith',
      dueDate: '2024-10-15',
      incidentRef: 'ENV-0001',
      category: 'Physical',
      progress: 65
    },
    {
      id: '2',
      title: 'Update spill response procedure',
      type: 'Corrective',
      status: 'Completed',
      priority: 'Medium',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-09-30',
      incidentRef: 'ENV-0001',
      category: 'Procedural',
      progress: 100
    },
    {
      id: '3',
      title: 'Conduct environmental awareness training',
      type: 'Preventive',
      status: 'Not Started',
      priority: 'Medium',
      assignedTo: 'Michael Williams',
      dueDate: '2024-11-01',
      incidentRef: 'ENV-0002',
      category: 'Human/Behavioral',
      progress: 0
    },
    {
      id: '4',
      title: 'Install automatic shut-off valve',
      type: 'Barrier Strengthening',
      status: 'Overdue',
      priority: 'High',
      assignedTo: 'Emma Brown',
      dueDate: '2024-09-20',
      incidentRef: 'ENV-0001',
      category: 'Physical',
      progress: 30
    },
    {
      id: '5',
      title: 'Review and update environmental policy',
      type: 'Preventive',
      status: 'In Progress',
      priority: 'Low',
      assignedTo: 'David Jones',
      dueDate: '2024-12-01',
      incidentRef: 'ENV-0003',
      category: 'Environmental Management',
      progress: 45
    },
    {
      id: '6',
      title: 'Implement daily inspection checklist',
      type: 'Corrective',
      status: 'Completed',
      priority: 'Medium',
      assignedTo: 'Lisa Davis',
      dueDate: '2024-09-25',
      incidentRef: 'ENV-0002',
      category: 'Procedural',
      progress: 100
    }
  ];

  const getStatusStats = () => {
    const stats = sampleActions.reduce((acc, action) => {
      acc[action.status] = (acc[action.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      'Not Started': stats['Not Started'] || 0,
      'In Progress': stats['In Progress'] || 0,
      'Completed': stats['Completed'] || 0,
      'Overdue': stats['Overdue'] || 0
    };
  };

  const getTypeStats = () => {
    const stats = sampleActions.reduce((acc, action) => {
      acc[action.type] = (acc[action.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      'Corrective': stats['Corrective'] || 0,
      'Preventive': stats['Preventive'] || 0,
      'Barrier Strengthening': stats['Barrier Strengthening'] || 0
    };
  };

  const getPriorityStats = () => {
    const stats = sampleActions.reduce((acc, action) => {
      acc[action.priority] = (acc[action.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      'High': stats['High'] || 0,
      'Medium': stats['Medium'] || 0,
      'Low': stats['Low'] || 0
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started': return '#6b7280';
      case 'In Progress': return '#3b82f6';
      case 'Completed': return '#10b981';
      case 'Overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Corrective': return '#f59e0b';
      case 'Preventive': return '#8b5cf6';
      case 'Barrier Strengthening': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCurrentStats = () => {
    switch (viewMode) {
      case 'status': return getStatusStats();
      case 'type': return getTypeStats();
      case 'priority': return getPriorityStats();
      default: return getStatusStats();
    }
  };

  const getCurrentColor = (key: string) => {
    switch (viewMode) {
      case 'status': return getStatusColor(key);
      case 'type': return getTypeColor(key);
      case 'priority': return getPriorityColor(key);
      default: return getStatusColor(key);
    }
  };

  const stats = getCurrentStats();
  const total = Object.values(stats).reduce((sum, count) => sum + count, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const filteredActions = selectedStatus
    ? sampleActions.filter(action => {
        switch (viewMode) {
          case 'status': return action.status === selectedStatus;
          case 'type': return action.type === selectedStatus;
          case 'priority': return action.priority === selectedStatus;
          default: return true;
        }
      })
    : sampleActions;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Corrective & Preventive Actions</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View by:</span>
            <select
              value={viewMode}
              onChange={(e) => {
                setViewMode(e.target.value as 'status' | 'type' | 'priority');
                setSelectedStatus(null);
              }}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="status">Status</option>
              <option value="type">Action Type</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Area */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4 capitalize">
              Actions by {viewMode}
            </h4>

            {/* Simple Bar Chart */}
            <div className="space-y-3">
              {Object.entries(stats).map(([key, count]) => {
                const percentage = total > 0 ? (count / total) * 100 : 0;

                return (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-24 text-sm font-medium text-gray-700 truncate">
                      {key}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80"
                            style={{
                              backgroundColor: getCurrentColor(key),
                              width: `${percentage}%`
                            }}
                            onClick={() => setSelectedStatus(selectedStatus === key ? null : key)}
                          />
                        </div>
                        <div className="w-12 text-sm font-medium text-gray-900">
                          {count}
                        </div>
                        <div className="w-12 text-xs text-gray-500">
                          {percentage.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Total Actions: <span className="font-medium">{total}</span>
            </div>
          </div>

          {/* Summary Stats */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {getStatusStats()['In Progress']}
                </div>
                <div className="text-sm text-blue-700">Active Actions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {getStatusStats()['Completed']}
                </div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">
                  {getStatusStats()['Overdue']}
                </div>
                <div className="text-sm text-red-700">Overdue</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {getTypeStats()['Barrier Strengthening']}
                </div>
                <div className="text-sm text-purple-700">Barrier Actions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Details Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">
              {selectedStatus ? `${selectedStatus} Actions` : 'All Actions'}
            </h4>
            {selectedStatus && (
              <button
                onClick={() => setSelectedStatus(null)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Show All
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActions.map((action) => (
                  <tr key={action.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{action.title}</div>
                        <div className="text-xs text-gray-500">Ref: {action.incidentRef}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${getTypeColor(action.type)}20`,
                          color: getTypeColor(action.type)
                        }}
                      >
                        {action.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${getStatusColor(action.status)}20`,
                          color: getStatusColor(action.status)
                        }}
                      >
                        {action.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${getPriorityColor(action.priority)}20`,
                          color: getPriorityColor(action.priority)
                        }}
                      >
                        {action.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {action.assignedTo}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={isOverdue(action.dueDate) && action.status !== 'Completed' ? 'text-red-600 font-medium' : ''}>
                        {formatDate(action.dueDate)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: getStatusColor(action.status),
                              width: `${action.progress}%`
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-8">
                          {action.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}