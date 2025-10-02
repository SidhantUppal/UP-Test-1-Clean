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

  // Generate mock tasks based on page and filters
  const generateMockTasks = (pageNum: number) => {
    const taskTypes: TaskType[] = ['Document Review', 'Permit Approval', 'Contractor Verification', 
      'Process Review', 'Compliance Check', 'Safety Inspection', 'Training Assignment',
      'System Configuration', 'Data Entry', 'Report Generation', 'Audit', 'Meeting'];
    const priorities: TaskPriority[] = ['Critical', 'High', 'Medium', 'Low'];
    const statuses: TaskStatus[] = ['New', 'In Progress', 'On Hold', 'Completed', 'Cancelled', 'Overdue'];
    const assignees = ['John Smith', 'Mike Davis', 'Lisa Anderson', 'Emma Wilson', 'James Martinez', 
      'David Lee', 'Michelle Chen', 'Sarah Johnson', 'Tom Wilson', 'Robert Brown'];
    const modules = ['Contractors', 'Permits', 'Processes', 'Compliance', 'Training', 'Reports', 'Security', 'Safety'];
    
    const tasksPerPage = 20;
    const newTasks: Task[] = [];
    
    for (let i = 0; i < tasksPerPage; i++) {
      const taskIndex = (pageNum - 1) * tasksPerPage + i;
      const daysOffset = Math.floor(Math.random() * 60) - 10; // -10 to +50 days
      const dueDate = new Date();
      dueDate.setDate(dueDate.sysdatetimeoffset() + daysOffset);
      
      const createdDate = new Date();
      createdDate.setDate(createdDate.sysdatetimeoffset() - Math.floor(Math.random() * 30));
      
      // Use a combination of page number and index to ensure unique IDs
      const uniqueId = `TSK-${pageNum.toString().padStart(3, '0')}-${String(i + 1).padStart(3, '0')}`;
      
      newTasks.push({
        id: uniqueId,
        title: `${taskTypes[taskIndex % taskTypes.length]} for ${modules[taskIndex % modules.length]} Module`,
        description: `Task description for ${taskTypes[taskIndex % taskTypes.length]}`,
        type: taskTypes[taskIndex % taskTypes.length],
        priority: priorities[taskIndex % priorities.length],
        status: statuses[taskIndex % statuses.length],
        assignedTo: assignees[taskIndex % assignees.length],
        assignedBy: assignees[(taskIndex + 1) % assignees.length],
        dueDate: dueDate.toISOString().split('T')[0],
        createdDate: createdDate.toISOString().split('T')[0],
        relatedModule: modules[taskIndex % modules.length],
        relatedId: `${modules[taskIndex % modules.length].substring(0, 4).toUpperCase()}-${taskIndex + 100}`,
        tags: ['task', taskTypes[taskIndex % taskTypes.length].toLowerCase().replace(/ /g, '-')],
        estimatedHours: Math.floor(Math.random() * 8) + 1,
        actualHours: Math.floor(Math.random() * 6),
        comments: Math.floor(Math.random() * 10),
        attachments: Math.floor(Math.random() * 5)
      });
    }
    
    return newTasks;
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

  // Simulate loading more tasks
  const loadMoreTasks = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const newTasks = generateMockTasks(page);
      setTasks(prev => {
        // Create a Map to ensure unique IDs
        const taskMap = new Map();
        
        // Add existing tasks
        prev.forEach(task => taskMap.set(task.id, task));
        
        // Add new tasks (will overwrite if duplicate ID exists)
        newTasks.forEach(task => taskMap.set(task.id, task));
        
        // Convert back to array and sort
        const allTasks = Array.from(taskMap.values());
        return sortTasks(allTasks);
      });
      setPage(prev => prev + 1);
      setIsLoading(false);
      if (page >= 10) setHasMore(false);
    }, 800);
  }, [isLoading, hasMore, page, sortTasks]);

  // Load initial tasks
  useEffect(() => {
    if (tasks.length === 0 && !isLoading && hasMore) {
      loadMoreTasks();
    }
  }, [tasks.length, isLoading, hasMore, loadMoreTasks]);
  
  // Lazy loading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore) return;
      
      const threshold = 1000;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        loadMoreTasks();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreTasks, isLoading, hasMore]);
  
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPage(1);
    setHasMore(true);
    setTasks([]);
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
    setPage(1);
    setHasMore(true);
    setTasks([]);
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
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.id}</div>
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
                      <details className="dropdown relative">
                        <summary className="btn btn-sm btn-ghost list-none cursor-pointer">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </summary>
                        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 z-[100] border border-gray-200">
                          <li>
                            <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                              View Details
                            </button>
                          </li>
                          <li>
                            <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                              Edit Task
                            </button>
                          </li>
                          <li>
                            <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                              Reassign
                            </button>
                          </li>
                          <li>
                            <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                              Add Comment
                            </button>
                          </li>
                          <li>
                            <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                              Mark Complete
                            </button>
                          </li>
                        </ul>
                      </details>
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
                onClick={loadMoreTasks}
                disabled={isLoading || !hasMore}
                className="text-theme-primary hover:text-theme-primary/80 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : hasMore ? 'Load More →' : 'All Loaded'}
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
    </div>
  );
}