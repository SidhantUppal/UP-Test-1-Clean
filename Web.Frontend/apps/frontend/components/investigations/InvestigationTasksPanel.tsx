import React, { useState, useEffect } from 'react';
import { investigationService, InvestigationTask } from '../../services/investigationService';

interface InvestigationTasksPanelProps {
  investigationId: number;
  investigationReference: string;
  targetCompletionDate: Date;
  teamMembers: string[];
  onTasksCreated?: (tasks: InvestigationTask[]) => void;
  onTargetDateUpdated?: (newDate: Date) => void;
}

interface TaskStatistics {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number;
}

export const InvestigationTasksPanel: React.FC<InvestigationTasksPanelProps> = ({
  investigationId,
  investigationReference,
  targetCompletionDate,
  teamMembers,
  onTasksCreated,
  onTargetDateUpdated
}) => {
  const [tasks, setTasks] = useState<InvestigationTask[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStatistics>({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateTasks, setShowCreateTasks] = useState(false);
  const [showUpdateDate, setShowUpdateDate] = useState(false);
  const [newTargetDate, setNewTargetDate] = useState(targetCompletionDate.toISOString().split('T')[0]);

  useEffect(() => {
    loadInvestigationTasks();
    loadTaskStatistics();
  }, [investigationId]);

  const loadInvestigationTasks = async () => {
    try {
      setLoading(true);
      const investigationTasks = await investigationService.getInvestigationTasks(investigationId.toString());
      setTasks(investigationTasks);
    } catch (err) {
      setError('Failed to load investigation tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTaskStatistics = async () => {
    try {
      // This would call the task statistics endpoint
      // For now, calculate from loaded tasks
      const stats = calculateTaskStatistics(tasks);
      setTaskStats(stats);
    } catch (err) {
      console.error('Error loading task statistics:', err);
    }
  };

  const calculateTaskStatistics = (taskList: InvestigationTask[]): TaskStatistics => {
    const total = taskList.length;
    const pending = taskList.filter(t => t.status === 'pending').length;
    const inProgress = taskList.filter(t => t.status === 'in-progress').length;
    const completed = taskList.filter(t => t.status === 'completed').length;
    const overdue = taskList.filter(t =>
      !t.completedDate && new Date(t.dueDate) < new Date()
    ).length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      totalTasks: total,
      pendingTasks: pending,
      inProgressTasks: inProgress,
      completedTasks: completed,
      overdueTasks: overdue,
      completionRate: Math.round(completionRate)
    };
  };

  const handleCreateTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const taskRequest = investigationService.generateTaskCreationRequest({
        investigationId,
        investigationReference,
        targetCompletionDate,
        investigationTeam: teamMembers,
        problemStatement: 'Investigation task auto-created',
        timeline: { start: new Date(), target: targetCompletionDate },
        stakeholders: [],
        whyLevels: [],
        qualityScore: 0,
        status: 'active'
      } as any);

      const createdTasks = await investigationService.createInvestigationTasks(taskRequest);
      setTasks(createdTasks);
      setTaskStats(calculateTaskStatistics(createdTasks));
      setShowCreateTasks(false);

      if (onTasksCreated) {
        onTasksCreated(createdTasks);
      }

      // Send notifications
      const taskIds = createdTasks.map(t => t.taskId!);
      await investigationService.sendTaskNotifications(investigationId.toString(), taskIds);

    } catch (err) {
      setError('Failed to create investigation tasks');
      console.error('Error creating tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTargetDate = async () => {
    try {
      setLoading(true);
      setError(null);

      const newDate = new Date(newTargetDate);
      const result = await investigationService.updateTargetCompletionDate(
        investigationId.toString(),
        newDate
      );

      setShowUpdateDate(false);

      if (onTargetDateUpdated) {
        onTargetDateUpdated(newDate);
      }

      // Reload tasks to get updated due dates
      await loadInvestigationTasks();

    } catch (err) {
      setError('Failed to update target completion date');
      console.error('Error updating target date:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      setLoading(true);
      const updatedTask = await investigationService.updateTaskStatus(
        investigationId.toString(),
        taskId,
        newStatus
      );

      // Update local tasks list
      setTasks(prevTasks =>
        prevTasks.map(t => t.taskId === taskId ? updatedTask : t)
      );

      // Recalculate statistics
      const updatedTasks = tasks.map(t => t.taskId === taskId ? updatedTask : t);
      setTaskStats(calculateTaskStatistics(updatedTasks));

    } catch (err) {
      setError('Failed to update task status');
      console.error('Error updating task status:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const isTaskOverdue = (task: InvestigationTask): boolean => {
    return !task.completedDate && new Date(task.dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading investigation tasks...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Investigation Tasks</h3>
          <p className="text-sm text-gray-500">
            Target Completion: {new Date(targetCompletionDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowUpdateDate(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Update Target Date
          </button>
          {tasks.length === 0 && (
            <button
              onClick={() => setShowCreateTasks(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Tasks
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Task Statistics */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                <p className="text-lg font-semibold text-gray-900">{taskStats.totalTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-lg font-semibold text-gray-900">{taskStats.pendingTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-lg font-semibold text-gray-900">{taskStats.inProgressTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-lg font-semibold text-gray-900">{taskStats.completedTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Progress</p>
                <p className="text-lg font-semibold text-gray-900">{taskStats.completionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      {tasks.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li key={task.taskId} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        {isTaskOverdue(task) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Overdue
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                        <span>Assigned to: {task.assignedUserName}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority} priority
                        </span>
                      </div>
                      {task.description && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateTaskStatus(task.taskId!, e.target.value)}
                      className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <a
                      href={`/tasks/${task.taskId}`}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Task
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks created</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create tasks for investigation team members to track progress.
          </p>
        </div>
      )}

      {/* Create Tasks Modal */}
      {showCreateTasks && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create Investigation Tasks</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  This will create individual tasks for each team member:
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {teamMembers.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  Email notifications will be sent to all team members with their task assignments.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateTasks(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTasks}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Tasks'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Target Date Modal */}
      {showUpdateDate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Update Target Completion Date</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Target Date: {new Date(targetCompletionDate).toLocaleDateString()}
                </label>
                <input
                  type="date"
                  value={newTargetDate}
                  onChange={(e) => setNewTargetDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4 p-3 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800">
                  Updating the target date will also update all related task due dates and send notifications to team members.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUpdateDate(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTargetDate}
                  disabled={loading || newTargetDate === targetCompletionDate.toISOString().split('T')[0]}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Date'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestigationTasksPanel;