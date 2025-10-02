"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { TaskType, TaskPriority } from '../page';

interface NewTask {
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  assignedTo: string;
  dueDate: string;
  dueTime: string;
  relatedModule?: string;
  relatedId?: string;
  tags: string;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
  reminderBefore: string;
  timeAllocated: string; // Time allocated in hours
  attachments: File[];
  notifyAssignee: boolean;
  notifyOnComplete: boolean;
  requiresApproval: boolean;
  approver?: string;
  linkedTasks: string[];
  checklistItems: string[];
  // Escalation settings
  enableEscalation: boolean;
  escalationLevels: {
    level: number;
    escalateToUser: string;
    escalateAfterHours: string;
    escalateToRole?: string;
  }[];
}

// Mock data for dropdowns
const mockUsers = [
  'John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Anderson', 
  'Tom Wilson', 'Emma Wilson', 'James Martinez', 'Michelle Chen',
  'David Lee', 'Robert Brown', 'Mark Thompson'
];

const mockModules = [
  { value: 'Contractors', label: 'Contractors' },
  { value: 'Permits', label: 'Permits' },
  { value: 'Processes', label: 'Processes' },
  { value: 'Documents', label: 'Documents' },
  { value: 'Safety', label: 'Safety' },
  { value: 'Compliance', label: 'Compliance' },
  { value: 'Training', label: 'Training' },
  { value: 'Reports', label: 'Reports' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Security', label: 'Security' }
];

interface QuickTask {
  assignedTo: string;
  type: TaskType;
  priority: TaskPriority;
  description: string;
}

export default function CreateTaskPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Quick task state
  const [quickTask, setQuickTask] = useState<QuickTask>({
    assignedTo: '',
    type: 'Document Review',
    priority: 'Medium',
    description: ''
  });
  
  // Form state
  const [task, setTask] = useState<NewTask>({
    title: '',
    description: '',
    type: 'Other',
    priority: 'Medium',
    assignedTo: '',
    dueDate: '',
    dueTime: '',
    relatedModule: '',
    relatedId: '',
    tags: '',
    recurrence: 'none',
    reminderBefore: '1',
    timeAllocated: '',
    attachments: [],
    notifyAssignee: true,
    notifyOnComplete: false,
    requiresApproval: false,
    approver: '',
    linkedTasks: [],
    checklistItems: [],
    enableEscalation: false,
    escalationLevels: []
  });

  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success message
    setShowSuccess(true);
    
    // Redirect after delay
    setTimeout(() => {
      router.push('/tasks/my');
    }, 2000);
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setTask({
        ...task,
        checklistItems: [...task.checklistItems, newChecklistItem.trim()]
      });
      setNewChecklistItem('');
    }
  };

  const handleRemoveChecklistItem = (index: number) => {
    setTask({
      ...task,
      checklistItems: task.checklistItems.filter((_, i) => i !== index)
    });
  };

  const handleAddEscalationLevel = () => {
    const newLevel = {
      level: task.escalationLevels.length + 1,
      escalateToUser: '',
      escalateAfterHours: '24',
      escalateToRole: ''
    };
    setTask({
      ...task,
      escalationLevels: [...task.escalationLevels, newLevel]
    });
  };

  const handleRemoveEscalationLevel = (index: number) => {
    const updatedLevels = task.escalationLevels
      .filter((_, i) => i !== index)
      .map((level, i) => ({ ...level, level: i + 1 }));
    setTask({
      ...task,
      escalationLevels: updatedLevels
    });
  };

  const handleUpdateEscalationLevel = (index: number, field: string, value: string) => {
    const updatedLevels = [...task.escalationLevels];
    updatedLevels[index] = {
      ...updatedLevels[index],
      [field]: value
    };
    setTask({
      ...task,
      escalationLevels: updatedLevels
    });
  };

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'Document Review': return '📄';
      case 'Permit Approval': return '📋';
      case 'Contractor Verification': return '👷';
      case 'Process Review': return '🔄';
      case 'Compliance Check': return '✓';
      case 'Safety Inspection': return '🦺';
      case 'Training Assignment': return '📚';
      case 'System Configuration': return '⚙️';
      case 'Data Entry': return '⌨️';
      case 'Report Generation': return '📊';
      case 'Audit': return '🔍';
      case 'Meeting': return '👥';
      default: return '📌';
    }
  };

  // Get suggested tasks based on type
  const getSuggestedTasks = (type: TaskType) => {
    switch (type) {
      case 'Document Review':
        return ['Review contract terms', 'Check insurance expiry', 'Verify certifications'];
      case 'Permit Approval':
        return ['Review safety requirements', 'Check compliance', 'Verify documentation'];
      case 'Safety Inspection':
        return ['Conduct walkthrough', 'Document findings', 'Submit report'];
      default:
        return [];
    }
  };

  const suggestedTasks = getSuggestedTasks(task.type);

  const handleQuickAddSubmit = () => {
    // Show success modal
    setShowSuccessModal(true);
    setShowQuickAdd(false);
    
    // Reset quick task form
    setQuickTask({
      assignedTo: '',
      type: 'Document Review',
      priority: 'Medium',
      description: ''
    });
    
    // Hide success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
      router.push('/tasks/my');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Create New Task</h1>
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <Link href="/tasks" className="hover:opacity-80" style={{ color: '#3d3a72' }}>Tasks</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Create Task</span>
              </nav>
            </div>
            <button
              onClick={() => setShowQuickAdd(true)}
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              className="hover:opacity-80 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Add
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16">
        <div className="space-y-6">

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-2">✅</span>
            <div>
              <p className="font-semibold">Task created successfully!</p>
              <p className="text-sm">Redirecting to your tasks...</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              type="button"
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'basic'
                  ? ''
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ 
                borderBottomColor: activeTab === 'basic' ? '#3d3a72' : 'transparent',
                color: activeTab === 'basic' ? '#3d3a72' : ''
              }}
            >
              Basic Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('advanced')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'advanced'
                  ? ''
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ 
                borderBottomColor: activeTab === 'advanced' ? '#3d3a72' : 'transparent',
                color: activeTab === 'advanced' ? '#3d3a72' : ''
              }}
            >
              Advanced Settings
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={task.type}
                    onChange={(e) => setTask({ ...task, type: e.target.value as TaskType })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="Document Review">Document Review</option>
                    <option value="Permit Approval">Permit Approval</option>
                    <option value="Contractor Verification">Contractor Verification</option>
                    <option value="Process Review">Process Review</option>
                    <option value="Compliance Check">Compliance Check</option>
                    <option value="Safety Inspection">Safety Inspection</option>
                    <option value="Training Assignment">Training Assignment</option>
                    <option value="System Configuration">System Configuration</option>
                    <option value="Data Entry">Data Entry</option>
                    <option value="Report Generation">Report Generation</option>
                    <option value="Audit">Audit</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value as TaskPriority })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  placeholder="Enter a clear, concise title for the task"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                {suggestedTasks.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Suggested titles:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTasks.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setTask({ ...task, title: suggestion })}
                          className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  placeholder="Provide detailed information about the task, including any special instructions or requirements"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assigned To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={task.assignedTo}
                    onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select assignee...</option>
                    <optgroup label="Suggested">
                      <option value="You">Myself</option>
                    </optgroup>
                    <optgroup label="Team Members">
                      {mockUsers.map(user => (
                        <option key={user} value={user}>{user}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Due Date and Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date & Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="time"
                      value={task.dueTime}
                      onChange={(e) => setTask({ ...task, dueTime: e.target.value })}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Related Module */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Related Module
                  </label>
                  <select
                    value={task.relatedModule}
                    onChange={(e) => setTask({ ...task, relatedModule: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">None</option>
                    {mockModules.map(module => (
                      <option key={module.value} value={module.value}>{module.label}</option>
                    ))}
                  </select>
                </div>

                {/* Related ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Related ID
                  </label>
                  <input
                    type="text"
                    value={task.relatedId}
                    onChange={(e) => setTask({ ...task, relatedId: e.target.value })}
                    placeholder="e.g., CONT-123, PERM-456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  value={task.tags}
                  onChange={(e) => setTask({ ...task, tags: e.target.value })}
                  placeholder="Enter tags separated by commas (e.g., urgent, safety, contractor)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

            </div>
          )}

          {/* Advanced Settings Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              {/* Time Allocated */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Allocated (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={task.timeAllocated}
                  onChange={(e) => setTask({ ...task, timeAllocated: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter estimated hours for this task"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Estimated time needed to complete this task
                </p>
              </div>

              {/* Recurrence */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recurrence
                </label>
                <select
                  value={task.recurrence}
                  onChange={(e) => setTask({ ...task, recurrence: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="none">No recurrence</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {/* Reminder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reminder Before Due Date
                </label>
                <select
                  value={task.reminderBefore}
                  onChange={(e) => setTask({ ...task, reminderBefore: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="0">No reminder</option>
                  <option value="0.25">15 minutes</option>
                  <option value="0.5">30 minutes</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="24">1 day</option>
                  <option value="48">2 days</option>
                  <option value="168">1 week</option>
                </select>
              </div>

              {/* Approval Settings */}
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.requiresApproval}
                    onChange={(e) => setTask({ ...task, requiresApproval: e.target.checked })}
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Requires approval upon completion
                  </span>
                </label>

                {task.requiresApproval && (
                  <div className="ml-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Approver
                    </label>
                    <select
                      value={task.approver}
                      onChange={(e) => setTask({ ...task, approver: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select approver...</option>
                      {mockUsers.map(user => (
                        <option key={user} value={user}>{user}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Notification Settings */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Notification Settings</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.notifyAssignee}
                    onChange={(e) => setTask({ ...task, notifyAssignee: e.target.checked })}
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Notify assignee when task is created
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.notifyOnComplete}
                    onChange={(e) => setTask({ ...task, notifyOnComplete: e.target.checked })}
                    className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Notify me when task is completed
                  </span>
                </label>
              </div>

              {/* Escalation Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Escalation Settings</h3>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.enableEscalation}
                      onChange={(e) => setTask({ ...task, enableEscalation: e.target.checked })}
                      className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Enable automatic escalation</span>
                  </label>
                </div>

                {task.enableEscalation && (
                  <div className="ml-6 space-y-4">
                    <p className="text-sm text-gray-600">
                      Configure escalation levels that will trigger if the task is not completed on time
                    </p>

                    {task.escalationLevels.map((level, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Level {level.level} Escalation</h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveEscalationLevel(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Escalate after (hours)
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={level.escalateAfterHours}
                              onChange={(e) => handleUpdateEscalationLevel(index, 'escalateAfterHours', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Escalate to person
                            </label>
                            <select
                              value={level.escalateToUser}
                              onChange={(e) => handleUpdateEscalationLevel(index, 'escalateToUser', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select person...</option>
                              {mockUsers.map(user => (
                                <option key={user} value={user}>{user}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Also notify role (optional)
                            </label>
                            <select
                              value={level.escalateToRole || ''}
                              onChange={(e) => handleUpdateEscalationLevel(index, 'escalateToRole', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="">None</option>
                              <option value="Supervisor">Supervisor</option>
                              <option value="Manager">Manager</option>
                              <option value="Director">Director</option>
                              <option value="Safety Officer">Safety Officer</option>
                              <option value="Compliance Officer">Compliance Officer</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddEscalationLevel}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                    >
                      + Add Escalation Level
                    </button>

                    {task.escalationLevels.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        Click "Add Escalation Level" to configure automatic escalation
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setTask({ ...task, attachments: Array.from(e.target.files) });
                      }
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer hover:opacity-80"
                    style={{ color: '#3d3a72' }}
                  >
                    <span className="text-3xl block mb-2">📎</span>
                    <span className="text-sm">Click to upload files or drag and drop</span>
                  </label>
                  {task.attachments.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600">
                      {task.attachments.length} file(s) selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
          <Link
            href="/tasks"
            style={{ 
              backgroundColor: '#e77726', 
              color: '#ffffff', 
              border: 'none',
              padding: '8px 24px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Cancel
          </Link>
          <div className="space-x-2">
            <button
              type="button"
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 24px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 24px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Create Task
            </button>
          </div>
        </div>
      </form>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-6">Quick Add Task</h2>
            
            <div className="space-y-4">
              {/* Assign To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To <span className="text-red-500">*</span>
                </label>
                <select
                  value={quickTask.assignedTo}
                  onChange={(e) => setQuickTask({ ...quickTask, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select person...</option>
                  {mockUsers.map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>

              {/* Task Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={quickTask.type}
                  onChange={(e) => setQuickTask({ ...quickTask, type: e.target.value as TaskType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="Other">General</option>
                  <option value="Permit Approval">Authorise</option>
                  <option value="Document Review">Review</option>
                </select>
              </div>

              {/* Priority/Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={quickTask.priority === 'Critical'}
                    onChange={(e) => setQuickTask({ 
                      ...quickTask, 
                      priority: e.target.checked ? 'Critical' : 'Medium' 
                    })}
                    className="mr-2 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-red-600">Mark as Urgent</span>
                </label>
              </div>

              {/* Quick Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quick Description
                </label>
                <textarea
                  value={quickTask.description}
                  onChange={(e) => setQuickTask({ ...quickTask, description: e.target.value })}
                  placeholder="Brief description of the task..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowQuickAdd(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleQuickAddSubmit}
                disabled={!quickTask.assignedTo}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Task Sent!</h3>
            <p className="text-gray-600">The task has been successfully assigned and the user has been notified.</p>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}