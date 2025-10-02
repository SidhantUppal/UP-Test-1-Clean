"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

// Task type definitions
export type TaskType = 'Document Review' | 'Permit Approval' | 'Contractor Verification' | 
  'Process Review' | 'Compliance Check' | 'Safety Inspection' | 'Training Assignment' |
  'System Configuration' | 'Data Entry' | 'Report Generation' | 'Audit' | 'Meeting' | 'Other';

export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TaskStatus = 'New' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled' | 'Overdue';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
  relatedModule?: string;
  relatedId?: string;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
  comments?: number;
  attachments?: number;
  isProcessTask?: boolean;
}

export default function TasksPage() {
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    taskType: '',
    priority: '',
    status: '',
    assignedTo: '',
    relatedModule: '',
    dateRange: '30days'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Modal states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [reassignTo, setReassignTo] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteComment, setDeleteComment] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [completionType, setCompletionType] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');
  const [actualHours, setActualHours] = useState('');
  const [createFollowUp, setCreateFollowUp] = useState(false);
  const [followUpTask, setFollowUpTask] = useState({
    title: '',
    description: '',
    type: 'Other' as TaskType,
    priority: 'Medium' as TaskPriority,
    assignedTo: '',
    dueDate: '',
    isProcessTask: false
  });

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/tasks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const result = await response.json();
      
      // Transform backend task format to frontend format
      const transformedTasks: Task[] = (result.data || result || []).map((backendTask: any) => ({
        id: backendTask.TaskID?.toString() || backendTask.id,
        title: backendTask.Title || backendTask.title || 'Untitled Task',
        description: backendTask.Description || backendTask.description || '',
        type: mapTaskTypeFromId(backendTask.TaskTypeID) || 'Other',
        priority: mapPriorityFromId(backendTask.TaskPriorityID) || 'Medium',
        status: mapStatusFromId(backendTask.StatusID) || 'New',
        assignedTo: backendTask.AssignedToFullName || 'Unassigned',
        assignedBy: backendTask.CreatedByFullName || 'System',
        dueDate: backendTask.DueByDate ? new Date(backendTask.DueByDate).toISOString().split('T')[0] : '',
        createdDate: backendTask.CreatedDate ? new Date(backendTask.CreatedDate).toISOString().split('T')[0] : '',
        relatedModule: 'Tasks',
        relatedId: backendTask.Reference || `TSK-${backendTask.TaskID}`,
        tags: ['task'],
        estimatedHours: 0,
        actualHours: 0,
        comments: 0,
        attachments: 0,
        isProcessTask: backendTask.isProcessTask || false
      }));
      
      return transformedTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };

  // Helper functions to map backend IDs to frontend types
  const mapTaskTypeFromId = (id: number): TaskType => {
    const typeMap: Record<number, TaskType> = {
      1: 'Document Review',
      2: 'Permit Approval', 
      3: 'Contractor Verification',
      4: 'Process Review',
      5: 'Compliance Check'
    };
    return typeMap[id] || 'Other';
  };

  const mapPriorityFromId = (id: number): TaskPriority => {
    const priorityMap: Record<number, TaskPriority> = {
      1: 'Low',
      2: 'Medium',
      3: 'High',
      4: 'Critical'
    };
    return priorityMap[id] || 'Medium';
  };

  const mapStatusFromId = (id: number): TaskStatus => {
    const statusMap: Record<number, TaskStatus> = {
      1: 'New',
      2: 'In Progress',
      3: 'On Hold',
      4: 'Completed',
      5: 'Cancelled'
    };
    return statusMap[id] || 'New';
  };

  // Sort tasks based on current sort settings
  const sortTasks = useCallback((tasksToSort: Task[]) => {
    return [...tasksToSort].sort((a, b) => {
      let aVal, bVal;
      
      switch (sortField) {
        case 'title':
          aVal = a.title;
          bVal = b.title;
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          aVal = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          bVal = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        case 'assignedTo':
          aVal = a.assignedTo;
          bVal = b.assignedTo;
          break;
        case 'dueDate':
          aVal = new Date(a.dueDate).getTime();
          bVal = new Date(b.dueDate).getTime();
          break;
        default:
          aVal = a[sortField as keyof Task];
          bVal = b[sortField as keyof Task];
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [sortField, sortDirection]);

  // Load tasks from API
  const loadTasks = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(sortTasks(fetchedTasks));
      setHasMore(false); // For now, load all tasks at once
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]); // Show empty state on error
    }
    setIsLoading(false);
  }, [isLoading, sortTasks]);

  // Load initial tasks
  useEffect(() => {
    if (tasks.length === 0 && !isLoading) {
      loadTasks();
    }
  }, [tasks.length, isLoading, loadTasks]);
  
  // Remove lazy loading since we're loading all tasks at once for now
  // This can be re-implemented later if needed for performance
  
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setTasks([]);
    // Reload tasks after filter change
    setTimeout(() => loadTasks(), 100);
  };
  
  const clearFilters = () => {
    setFilters({
      taskType: '',
      priority: '',
      status: '',
      assignedTo: '',
      relatedModule: '',
      dateRange: '30days'
    });
    setTasks([]);
    // Reload tasks after clearing filters
    setTimeout(() => loadTasks(), 100);
  };

  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    
    if (tasks.length > 0) {
      setTasks(prevTasks => {
        // Create a new array to avoid mutation and ensure no duplicates
        const uniqueTasks = Array.from(new Map(prevTasks.map(t => [t.id, t])).values());
        return uniqueTasks.sort((a, b) => {
          let aVal, bVal;
          
          switch (field) {
            case 'title':
              aVal = a.title;
              bVal = b.title;
              break;
            case 'type':
              aVal = a.type;
              bVal = b.type;
              break;
            case 'priority':
              const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
              aVal = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
              bVal = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
              break;
            case 'status':
              aVal = a.status;
              bVal = b.status;
              break;
            case 'assignedTo':
              aVal = a.assignedTo;
              bVal = b.assignedTo;
              break;
            case 'dueDate':
              aVal = new Date(a.dueDate).getTime();
              bVal = new Date(b.dueDate).getTime();
              break;
            default:
              aVal = a[field as keyof Task];
              bVal = b[field as keyof Task];
          }
          
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return newDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
          }
          
          return newDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
        });
      });
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>
    );
  };
  
  const activeFilterCount = Object.values(filters).filter(v => v && v !== '30days').length;

  // Modal handlers
  const openModal = (modalType: string, task: Task) => {
    setSelectedTask(task);
    setActiveModal(modalType);
    if (modalType === 'edit') {
      setEditedTask({ ...task });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTask(null);
    setComment('');
    setEditedTask(null);
    setReassignTo('');
    setDeleteReason('');
    setDeleteComment('');
    setOpenDropdownId(null);
    setCompletionType('');
    setCompletionNotes('');
    setActualHours('');
    setCreateFollowUp(false);
    setFollowUpTask({
      title: '',
      description: '',
      type: 'Other' as TaskType,
      priority: 'Medium' as TaskPriority,
      assignedTo: '',
      dueDate: '',
      isProcessTask: false
    });
  };

  const handleSaveEdit = () => {
    if (editedTask) {
      setTasks(tasks.map(t => t.id === editedTask.id ? editedTask : t));
      closeModal();
    }
  };

  const handleReassign = () => {
    if (selectedTask && reassignTo) {
      setTasks(tasks.map(t =>
        t.id === selectedTask.id
          ? { ...t, assignedTo: reassignTo }
          : t
      ));
      closeModal();
    }
  };

  const handleAddComment = () => {
    if (selectedTask && comment) {
      setTasks(tasks.map(t =>
        t.id === selectedTask.id
          ? { ...t, comments: (t.comments || 0) + 1 }
          : t
      ));
      closeModal();
    }
  };

  const handleMarkComplete = () => {
    if (selectedTask && completionType) {
      // Update the task status based on completion type
      const newStatus = completionType === 'cancelled' || completionType === 'no-longer-required'
        ? 'Cancelled'
        : 'Completed';

      setTasks(tasks.map(t =>
        t.id === selectedTask.id
          ? { ...t, status: newStatus, completedDate: new Date().toISOString().split('T')[0], actualHours: Number(actualHours) || 0 }
          : t
      ));

      // Create follow-up task if requested
      if (createFollowUp && followUpTask.title) {
        const newTask: Task = {
          id: `TSK-${Date.now()}`,
          title: followUpTask.title,
          description: followUpTask.description,
          type: followUpTask.type,
          priority: followUpTask.priority,
          status: 'New',
          assignedTo: followUpTask.assignedTo || selectedTask.assignedTo,
          assignedBy: selectedTask.assignedTo,
          dueDate: followUpTask.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdDate: new Date().toISOString().split('T')[0],
          relatedModule: selectedTask.relatedModule,
          relatedId: selectedTask.id,
          tags: ['follow-up'],
          estimatedHours: 0,
          actualHours: 0,
          comments: 0,
          attachments: 0,
          isProcessTask: followUpTask.isProcessTask
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
      }

      closeModal();
    }
  };

  const handleDelete = () => {
    if (selectedTask && deleteReason) {
      setTasks(tasks.filter(t => t.id !== selectedTask.id));
      closeModal();
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'Critical': return 'bg-theme-error/10 text-theme-error border border-theme-error/20';
      case 'High': return 'bg-theme-warning/10 text-theme-warning border border-theme-warning/20';
      case 'Medium': return 'bg-theme-primary/10 text-theme-primary border border-theme-primary/20';
      case 'Low': return 'bg-theme-success/10 text-theme-success border border-theme-success/20';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'New': return 'bg-theme-primary/10 text-theme-primary border border-theme-primary/20';
      case 'In Progress': return 'bg-theme-warning/10 text-theme-warning border border-theme-warning/20';
      case 'On Hold': return 'bg-theme-neutral/10 text-theme-neutral border border-theme-neutral/20';
      case 'Completed': return 'bg-theme-success/10 text-theme-success border border-theme-success/20';
      case 'Cancelled': return 'bg-theme-neutral/10 text-theme-neutral border border-theme-neutral/20';
      case 'Overdue': return 'bg-theme-error/10 text-theme-error border border-theme-error/20';
    }
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    new: tasks.filter(t => t.status === 'New').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    overdue: tasks.filter(t => t.status === 'Overdue').length,
    completed: tasks.filter(t => t.status === 'Completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Task Management Home</h1>
              <p className="text-gray-600 mt-1">Manage and track all your tasks in one place</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/tasks/my" className="btn text-white hover:opacity-80" style={{backgroundColor: '#3d3a72', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'opacity 0.2s'}}>
                My Tasks
              </Link>
              <Link href="/tasks/create" className="btn text-white hover:opacity-80" style={{backgroundColor: '#3d3a72', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'opacity 0.2s'}}>
                Create New Task
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
      
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h4 className="text-base font-semibold">Filter Tasks</h4>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
            <button 
              onClick={() => handleFilterChange('priority', 'Critical')}
              className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
            >
              Critical
            </button>
            <button 
              onClick={() => handleFilterChange('priority', 'High')}
              className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
            >
              High Priority
            </button>
            <button 
              onClick={() => handleFilterChange('status', 'Overdue')}
              className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
            >
              Overdue
            </button>
            <button 
              onClick={() => handleFilterChange('status', 'In Progress')}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded text-xs hover:bg-yellow-200"
            >
              In Progress
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search by task title, assignee, or module..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Task Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Type
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              value={filters.taskType}
              onChange={(e) => handleFilterChange('taskType', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Document Review">Document Review</option>
              <option value="Permit Approval">Permit Approval</option>
              <option value="Contractor Verification">Contractor Verification</option>
              <option value="Process Review">Process Review</option>
              <option value="Compliance Check">Compliance Check</option>
              <option value="Safety Inspection">Safety Inspection</option>
              <option value="Training Assignment">Training Assignment</option>
              <option value="Audit">Audit</option>
              <option value="Report Generation">Report Generation</option>
            </select>
          </div>
          
          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          
          {/* Assigned To Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned To
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              value={filters.assignedTo}
              onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
            >
              <option value="">All Assignees</option>
              <option value="me">Me</option>
              <option value="unassigned">Unassigned</option>
              <option value="John Smith">John Smith</option>
              <option value="Mike Davis">Mike Davis</option>
              <option value="Lisa Anderson">Lisa Anderson</option>
              <option value="Emma Wilson">Emma Wilson</option>
              <option value="James Martinez">James Martinez</option>
            </select>
          </div>
          
          {/* Related Module Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              value={filters.relatedModule}
              onChange={(e) => handleFilterChange('relatedModule', e.target.value)}
            >
              <option value="">All Modules</option>
              <option value="Contractors">Contractors</option>
              <option value="Permits">Permits</option>
              <option value="Processes">Processes</option>
              <option value="Compliance">Compliance</option>
              <option value="Training">Training</option>
              <option value="Safety">Safety</option>
              <option value="Reports">Reports</option>
            </select>
          </div>
          
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="today">Today</option>
              <option value="7days">Next 7 days</option>
              <option value="30days">Next 30 days</option>
              <option value="overdue">Overdue</option>
              <option value="all">All dates</option>
            </select>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="filter-actions mt-6">
          <div className="flex items-center space-x-2">
            <button className="btn btn-sm text-white hover:opacity-80" style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}>
              Save Filter
            </button>
            <button className="btn btn-sm text-white hover:opacity-80" style={{backgroundColor: '#e77726', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}} onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.total || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Across all modules</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">New Tasks</h3>
          <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{stats.new || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Awaiting action</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Currently active</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Overdue</h3>
          <p className="text-3xl font-bold text-red-600">{stats.overdue || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Requires attention</p>
        </div>
      </div>
      
      {/* Task List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-theme-primary/10">
          <h2 className="text-xl font-semibold">Tasks Overview</h2>
          <p className="text-gray-600 text-sm mt-1">All tasks across the system</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-theme-primary/5">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-theme-primary/10 transition-colors"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Task</span>
                    {getSortIcon('title')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-theme-primary/10 transition-colors"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Type</span>
                    {getSortIcon('type')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-theme-primary/10 transition-colors"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Priority</span>
                    {getSortIcon('priority')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-theme-primary/10 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-theme-primary/10 transition-colors"
                  onClick={() => handleSort('assignedTo')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Assigned To</span>
                    {getSortIcon('assignedTo')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-theme-primary/10 transition-colors"
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Due Date</span>
                    {getSortIcon('dueDate')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Related
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => {
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                const isOverdue = task.status !== 'Completed' && dueDate < today;
                const diffTime = dueDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                let dueDateText = '';
                let dueDateClass = 'text-xs';
                
                if (isOverdue) {
                  dueDateText = `${Math.abs(diffDays)} days overdue`;
                  dueDateClass += ' text-theme-error';
                } else if (diffDays === 0) {
                  dueDateText = 'Due today';
                  dueDateClass += ' text-theme-warning';
                } else if (diffDays === 1) {
                  dueDateText = 'Due tomorrow';
                  dueDateClass += ' text-theme-warning';
                } else if (diffDays > 0) {
                  dueDateText = `Due in ${diffDays} days`;
                  dueDateClass += ' text-gray-500';
                }

                return (
                  <tr key={task.id} className="hover:bg-theme-primary/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{task.title}</span>
                        {task.isProcessTask && (
                          <span
                            className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-theme-primary text-white rounded-full"
                            title="Process Manager Task"
                          >
                            P
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{task.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{task.dueDate}</div>
                      <div className={dueDateClass}>{dueDateText}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.relatedModule && (
                        <div>
                          <div className="text-sm text-gray-900">{task.relatedModule}</div>
                          <div className="text-sm text-gray-500">{task.relatedId}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2 items-center">
                        <button
                          style={{
                            backgroundColor: '#3d3a72',
                            color: '#ffffff',
                            border: 'none',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                          onClick={() => openModal('view', task)}
                        >
                          View
                        </button>
                        <button
                          style={{
                            backgroundColor: '#3d3a72',
                            color: '#ffffff',
                            border: 'none',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                          onClick={() => openModal('edit', task)}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            backgroundColor: '#e77726',
                            color: '#ffffff',
                            border: 'none',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                          onClick={() => openModal('complete', task)}
                        >
                          Complete
                        </button>

                        {/* More Actions Dropdown */}
                        <div className="relative">
                          <button
                            style={{
                              backgroundColor: '#6b7280',
                              color: '#ffffff',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              fontSize: '12px',
                              transition: 'opacity 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            className="hover:opacity-80"
                            onClick={() => setOpenDropdownId(openDropdownId === task.id ? null : task.id)}
                          >
                            More
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {openDropdownId === task.id && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    openModal('reassign', task);
                                  }}
                                >
                                  Reassign Task
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    openModal('comment', task);
                                  }}
                                >
                                  Add Comment
                                </button>
                                <hr className="my-1 border-gray-200" />
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    openModal('delete', task);
                                  }}
                                >
                                  Delete Task
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {/* Loading row */}
              {isLoading && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-theme-primary"></div>
                      <span className="text-sm text-gray-500">Loading more tasks...</span>
                    </div>
                  </td>
                </tr>
              )}
              
              {/* No more results */}
              {!hasMore && !isLoading && tasks.length > 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-500">All tasks loaded ({tasks.length} total)</span>
                  </td>
                </tr>
              )}
              
              {/* Empty state */}
              {tasks.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center">
                    <span className="text-sm text-gray-500">No tasks found matching your filters</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-theme-primary/5 border-t border-theme-primary/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                Showing {tasks.length} {hasMore ? 'of 200+' : 'total'} tasks
                {activeFilterCount > 0 && (
                  <span className="text-theme-primary"> (filtered)</span>
                )}
                {sortField && (
                  <span className="text-gray-500"> • Sorted by {sortField} ({sortDirection})</span>
                )}
              </p>
              
              {isLoading && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-theme-primary"></div>
                  <span>Loading more tasks...</span>
                </div>
              )}
              
              {!hasMore && !isLoading && tasks.length > 0 && (
                <span className="text-sm text-gray-500">All {tasks.length} tasks loaded</span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <select className="px-3 py-1 border border-theme-primary/20 rounded text-sm">
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
              
              <button 
                onClick={loadTasks}
                disabled={isLoading}
                className="text-theme-primary hover:text-theme-primary/80 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          
          {page > 2 && (
            <div className="mt-4 text-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-theme-secondary hover:text-theme-secondary/80 text-sm font-medium"
              >
                ↑ Back to top
              </button>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {activeModal === 'view' && selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {selectedTask.title}
                      {selectedTask.isProcessTask && (
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-theme-primary text-white rounded-full">
                          P
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Reference: {selectedTask.id}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedTask.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(selectedTask.status)}`}>
                        {selectedTask.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedTask.dueDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedTask.assignedTo}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created By</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedTask.assignedBy}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTask.description}</p>
                  </div>

                  {selectedTask.isProcessTask && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-purple-900 mb-2">Process Integration</h4>
                      <p className="text-sm text-purple-700">This task is managed by the Process Builder system and follows automated workflow rules.</p>
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-4 text-sm text-gray-500">
                    <span>Comments: {selectedTask.comments || 0}</span>
                    <span>Attachments: {selectedTask.attachments || 0}</span>
                    <span>Est. Hours: {selectedTask.estimatedHours || 0}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  style={{
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={() => {
                    closeModal();
                    openModal('edit', selectedTask);
                  }}
                >
                  Edit Task
                </button>
                <button
                  style={{
                    backgroundColor: '#e77726',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {activeModal === 'edit' && editedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Edit Task</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        value={editedTask.type}
                        onChange={(e) => setEditedTask({ ...editedTask, type: e.target.value as TaskType })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="Document Review">Document Review</option>
                        <option value="Permit Approval">Permit Approval</option>
                        <option value="Contractor Verification">Contractor Verification</option>
                        <option value="Process Review">Process Review</option>
                        <option value="Compliance Check">Compliance Check</option>
                        <option value="Safety Inspection">Safety Inspection</option>
                        <option value="Training Assignment">Training Assignment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as TaskPriority })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={editedTask.status}
                        onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as TaskStatus })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                      <input
                        type="date"
                        value={editedTask.dueDate}
                        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                    <select
                      value={editedTask.assignedTo}
                      onChange={(e) => setEditedTask({ ...editedTask, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="John Smith">John Smith</option>
                      <option value="Mike Davis">Mike Davis</option>
                      <option value="Lisa Anderson">Lisa Anderson</option>
                      <option value="Emma Wilson">Emma Wilson</option>
                      <option value="James Martinez">James Martinez</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Robert Chen">Robert Chen</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  style={{
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
                <button
                  style={{
                    backgroundColor: '#e77726',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Task Modal */}
      {activeModal === 'reassign' && selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Reassign Task</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Task to Reassign</h4>
                    <p className="text-sm text-blue-700">{selectedTask.title}</p>
                    <p className="text-xs text-blue-600 mt-1">Currently assigned to: {selectedTask.assignedTo}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reassign To <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={reassignTo}
                      onChange={(e) => setReassignTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select a person...</option>
                      <option value="John Smith">John Smith</option>
                      <option value="Mike Davis">Mike Davis</option>
                      <option value="Lisa Anderson">Lisa Anderson</option>
                      <option value="Emma Wilson">Emma Wilson</option>
                      <option value="James Martinez">James Martinez</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Robert Chen">Robert Chen</option>
                      <option value="Team Lead">Team Lead</option>
                      <option value="Department Manager">Department Manager</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reassignment Notes (Optional)</label>
                    <textarea
                      placeholder="Add any notes about this reassignment..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="notify"
                      className="mt-1"
                      defaultChecked
                    />
                    <label htmlFor="notify" className="text-sm text-gray-700">
                      Notify the new assignee via email
                    </label>
                  </div>

                  {selectedTask.isProcessTask && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-purple-900 mb-2">Process Task Notice</h4>
                      <p className="text-sm text-purple-700">This is a Process Manager task. Reassigning may affect workflow automation.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  style={{
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={handleReassign}
                  disabled={!reassignTo}
                >
                  Reassign Task
                </button>
                <button
                  style={{
                    backgroundColor: '#e77726',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Task Modal */}
      {activeModal === 'delete' && selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Delete Task</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-red-900 mb-2">Warning: Permanent Deletion</h4>
                    <p className="text-sm text-red-700">You are about to permanently delete this task:</p>
                    <p className="text-sm font-medium text-red-900 mt-2">{selectedTask.title}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Deletion <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select a reason...</option>
                      <option value="duplicate">Duplicate Task</option>
                      <option value="no-longer-needed">No Longer Needed</option>
                      <option value="created-in-error">Created in Error</option>
                      <option value="scope-changed">Scope Changed</option>
                      <option value="merged">Merged with Another Task</option>
                      <option value="cancelled-project">Project Cancelled</option>
                      <option value="compliance">Compliance Requirement Changed</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={deleteComment}
                      onChange={(e) => setDeleteComment(e.target.value)}
                      placeholder="Please provide additional details about why this task is being deleted..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {selectedTask.isProcessTask && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-yellow-900 mb-2">Process Task Warning</h4>
                      <p className="text-sm text-yellow-700">This is a Process Manager task. Deleting it may disrupt automated workflows and dependent tasks.</p>
                    </div>
                  )}

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600">This action cannot be undone. The task will be permanently removed from the system and archived for audit purposes only.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={handleDelete}
                  disabled={!deleteReason || !deleteComment}
                >
                  Delete Task
                </button>
                <button
                  style={{
                    backgroundColor: '#6b7280',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Comment Modal */}
      {activeModal === 'comment' && selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Add Comment</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700">Task:</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedTask.title}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Comment <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter your comment..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="notifyComment"
                      defaultChecked
                    />
                    <label htmlFor="notifyComment" className="text-sm text-gray-700">
                      Notify task assignee about this comment
                    </label>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Current comments on this task: {selectedTask.comments || 0}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  style={{
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={handleAddComment}
                  disabled={!comment}
                >
                  Add Comment
                </button>
                <button
                  style={{
                    backgroundColor: '#e77726',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark Complete Modal */}
      {activeModal === 'complete' && selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold text-gray-900">Complete Task</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Task Details</h4>
                    <p className="text-sm font-medium text-gray-900">{selectedTask.title}</p>
                    <p className="text-xs text-gray-600 mt-1">Assigned to: {selectedTask.assignedTo}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Completion Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={completionType}
                      onChange={(e) => setCompletionType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select completion type...</option>
                      <option value="completed-successfully">Completed Successfully</option>
                      <option value="completed-with-issues">Completed with Issues</option>
                      <option value="partially-completed">Partially Completed</option>
                      <option value="no-longer-required">No Longer Required</option>
                      <option value="superseded">Superseded by Another Task</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="deferred">Deferred to Later Date</option>
                      <option value="resolved-differently">Resolved Differently</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Completion Notes <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={completionNotes}
                      onChange={(e) => setCompletionNotes(e.target.value)}
                      placeholder="Describe what was done, any issues encountered, or why the task status changed..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Actual Hours Spent</label>
                      <input
                        type="number"
                        value={actualHours}
                        onChange={(e) => setActualHours(e.target.value)}
                        placeholder="0"
                        min="0"
                        step="0.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                      <input
                        type="text"
                        value={selectedTask.estimatedHours || 'Not set'}
                        disabled
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>

                  {selectedTask.isProcessTask && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-purple-900 mb-2">Process Task Completion</h4>
                      <p className="text-sm text-purple-700">Completing this task will trigger the next step in the process workflow.</p>
                    </div>
                  )}

                  {/* Follow-up Task Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium text-gray-700">Create Follow-up Task?</label>
                      <button
                        type="button"
                        onClick={() => setCreateFollowUp(!createFollowUp)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          createFollowUp ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            createFollowUp ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {createFollowUp && (
                      <div className="space-y-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900">Follow-up Task Details</h4>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Task Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={followUpTask.title}
                            onChange={(e) => setFollowUpTask({ ...followUpTask, title: e.target.value })}
                            placeholder="Enter follow-up task title..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={followUpTask.description}
                            onChange={(e) => setFollowUpTask({ ...followUpTask, description: e.target.value })}
                            placeholder="Describe the follow-up task..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                              value={followUpTask.type}
                              onChange={(e) => setFollowUpTask({ ...followUpTask, type: e.target.value as TaskType })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                              <option value="Document Review">Document Review</option>
                              <option value="Permit Approval">Permit Approval</option>
                              <option value="Contractor Verification">Contractor Verification</option>
                              <option value="Process Review">Process Review</option>
                              <option value="Compliance Check">Compliance Check</option>
                              <option value="Safety Inspection">Safety Inspection</option>
                              <option value="Training Assignment">Training Assignment</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                              value={followUpTask.priority}
                              onChange={(e) => setFollowUpTask({ ...followUpTask, priority: e.target.value as TaskPriority })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                              <option value="Critical">Critical</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                            <select
                              value={followUpTask.assignedTo}
                              onChange={(e) => setFollowUpTask({ ...followUpTask, assignedTo: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                              <option value="">Same as current ({selectedTask.assignedTo})</option>
                              <option value="John Smith">John Smith</option>
                              <option value="Mike Davis">Mike Davis</option>
                              <option value="Lisa Anderson">Lisa Anderson</option>
                              <option value="Emma Wilson">Emma Wilson</option>
                              <option value="James Martinez">James Martinez</option>
                              <option value="Sarah Johnson">Sarah Johnson</option>
                              <option value="Robert Chen">Robert Chen</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                            <input
                              type="date"
                              value={followUpTask.dueDate}
                              onChange={(e) => setFollowUpTask({ ...followUpTask, dueDate: e.target.value })}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="processFollowUp"
                            checked={followUpTask.isProcessTask}
                            onChange={(e) => setFollowUpTask({ ...followUpTask, isProcessTask: e.target.checked })}
                          />
                          <label htmlFor="processFollowUp" className="text-sm text-gray-700">
                            This is a Process Manager task
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  style={{
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={handleMarkComplete}
                  disabled={!completionType || !completionNotes || (createFollowUp && !followUpTask.title)}
                >
                  Complete Task
                </button>
                <button
                  style={{
                    backgroundColor: '#e77726',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}