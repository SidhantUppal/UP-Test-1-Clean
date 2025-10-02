"use client";

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { Task, TaskType, TaskPriority, TaskStatus } from '@/app/(main)/tasks/page';

// Generate more comprehensive mock tasks for "My Tasks" view
const generateMyTasks = (): Task[] => {
  return [
    // High priority tasks
    {
      id: 'TSK-101',
      title: 'Review Critical Safety Incident Report - Building A',
      description: 'Immediate review required for safety incident that occurred during maintenance work',
      type: 'Safety Inspection',
      priority: 'Critical',
      status: 'New',
      assignedTo: 'You',
      assignedBy: 'Safety Manager',
      dueDate: '2025-07-17',
      createdDate: '2025-07-17',
      relatedModule: 'Safety',
      tags: ['incident', 'critical', 'immediate-action'],
      estimatedHours: 2,
      comments: 15,
      attachments: 8
    },
    {
      id: 'TSK-102',
      title: 'Approve Emergency Work Permit - Power Outage',
      description: 'Emergency electrical work permit requires immediate approval',
      type: 'Permit Approval',
      priority: 'Critical',
      status: 'In Progress',
      assignedTo: 'You',
      assignedBy: 'Operations',
      dueDate: '2025-07-17',
      createdDate: '2025-07-17',
      relatedModule: 'Permits',
      relatedId: 'EWP-2025-001',
      tags: ['emergency', 'electrical', 'urgent'],
      estimatedHours: 0.5,
      actualHours: 0.25,
      comments: 6,
      attachments: 3
    },
    {
      id: 'TSK-103',
      title: 'Complete Quarterly Compliance Review',
      description: 'Q3 compliance review for all active contractors - 15 contractors pending',
      type: 'Compliance Check',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'You',
      assignedBy: 'Compliance Director',
      dueDate: '2025-07-20',
      createdDate: '2025-07-10',
      relatedModule: 'Compliance',
      tags: ['quarterly', 'compliance', 'contractors'],
      estimatedHours: 12,
      actualHours: 6,
      comments: 23,
      attachments: 45
    },
    {
      id: 'TSK-104',
      title: 'Verify New Contractor Documentation - Global Tech Services',
      description: 'Review and verify all onboarding documentation for new contractor',
      type: 'Contractor Verification',
      priority: 'High',
      status: 'New',
      assignedTo: 'You',
      assignedBy: 'Procurement',
      dueDate: '2025-07-18',
      createdDate: '2025-07-16',
      relatedModule: 'Contractors',
      relatedId: 'CONT-789',
      tags: ['new-contractor', 'onboarding', 'verification'],
      estimatedHours: 3,
      comments: 2,
      attachments: 12
    },
    {
      id: 'TSK-105',
      title: 'Update Process Workflow - Chemical Handling',
      description: 'Revise chemical handling process based on new regulations',
      type: 'Process Review',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'You',
      assignedBy: 'EHS Manager',
      dueDate: '2025-07-19',
      createdDate: '2025-07-14',
      relatedModule: 'Processes',
      relatedId: 'PROC-234',
      tags: ['process', 'chemical', 'regulatory'],
      estimatedHours: 4,
      actualHours: 2,
      comments: 8,
      attachments: 5
    },
    {
      id: 'TSK-106',
      title: 'Complete OSHA 30 Training',
      description: 'Mandatory OSHA 30-hour training certification due for renewal',
      type: 'Training Assignment',
      priority: 'High',
      status: 'Overdue',
      assignedTo: 'You',
      assignedBy: 'HR Department',
      dueDate: '2025-07-15',
      createdDate: '2025-07-01',
      relatedModule: 'Training',
      tags: ['osha', 'mandatory', 'certification', 'overdue'],
      estimatedHours: 30,
      actualHours: 15,
      comments: 3
    },
    {
      id: 'TSK-107',
      title: 'Audit Contractor PPE Compliance',
      description: 'Monthly PPE compliance audit for all active construction contractors',
      type: 'Audit',
      priority: 'Medium',
      status: 'New',
      assignedTo: 'You',
      assignedBy: 'Safety Supervisor',
      dueDate: '2025-07-25',
      createdDate: '2025-07-16',
      relatedModule: 'Safety',
      tags: ['ppe', 'audit', 'contractors'],
      estimatedHours: 6,
      comments: 0,
      attachments: 2
    },
    {
      id: 'TSK-108',
      title: 'Generate Monthly KPI Report',
      description: 'Compile and analyze KPIs for contractor performance metrics',
      type: 'Report Generation',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'You',
      assignedBy: 'Operations Director',
      dueDate: '2025-07-31',
      createdDate: '2025-07-15',
      relatedModule: 'Reports',
      tags: ['kpi', 'monthly', 'metrics'],
      estimatedHours: 5,
      actualHours: 1,
      comments: 4,
      attachments: 6
    },
    {
      id: 'TSK-109',
      title: 'Review Incident Investigation - Near Miss Event',
      description: 'Review and sign off on near miss investigation report',
      type: 'Document Review',
      priority: 'Medium',
      status: 'New',
      assignedTo: 'You',
      assignedBy: 'Safety Team',
      dueDate: '2025-07-22',
      createdDate: '2025-07-16',
      relatedModule: 'Safety',
      tags: ['incident', 'investigation', 'near-miss'],
      estimatedHours: 2,
      comments: 5,
      attachments: 3
    },
    {
      id: 'TSK-110',
      title: 'Configure New User Access - Contract Managers',
      description: 'Set up system access for 3 new contract managers',
      type: 'System Configuration',
      priority: 'Medium',
      status: 'New',
      assignedTo: 'You',
      assignedBy: 'IT Admin',
      dueDate: '2025-07-21',
      createdDate: '2025-07-16',
      relatedModule: 'Admin',
      tags: ['access', 'users', 'configuration'],
      estimatedHours: 1.5,
      comments: 2,
      attachments: 1
    },
    {
      id: 'TSK-111',
      title: 'Weekly Safety Walk - Manufacturing Floor',
      description: 'Conduct weekly safety walkthrough and document findings',
      type: 'Safety Inspection',
      priority: 'Medium',
      status: 'Completed',
      assignedTo: 'You',
      assignedBy: 'Safety Manager',
      dueDate: '2025-07-16',
      createdDate: '2025-07-14',
      completedDate: '2025-07-16',
      relatedModule: 'Safety',
      tags: ['walkthrough', 'weekly', 'manufacturing'],
      estimatedHours: 2,
      actualHours: 2.5,
      comments: 8,
      attachments: 12
    },
    {
      id: 'TSK-112',
      title: 'Data Entry - Contractor Insurance Updates',
      description: 'Update insurance expiry dates for Q3 renewals',
      type: 'Data Entry',
      priority: 'Low',
      status: 'In Progress',
      assignedTo: 'You',
      assignedBy: 'Admin Team',
      dueDate: '2025-07-30',
      createdDate: '2025-07-15',
      relatedModule: 'Contractors',
      tags: ['data-entry', 'insurance', 'updates'],
      estimatedHours: 3,
      actualHours: 1,
      comments: 1
    },
    {
      id: 'TSK-113',
      title: 'Attend Process Improvement Workshop',
      description: 'Mandatory workshop on lean process improvement methodologies',
      type: 'Meeting',
      priority: 'Low',
      status: 'New',
      assignedTo: 'You',
      assignedBy: 'Operations',
      dueDate: '2025-07-28',
      createdDate: '2025-07-16',
      relatedModule: 'Training',
      tags: ['workshop', 'process-improvement', 'lean'],
      estimatedHours: 4,
      comments: 0
    },
    {
      id: 'TSK-114',
      title: 'Update Emergency Contact List',
      description: 'Quarterly update of emergency contact information',
      type: 'Data Entry',
      priority: 'Low',
      status: 'Completed',
      assignedTo: 'You',
      assignedBy: 'HR',
      dueDate: '2025-07-15',
      createdDate: '2025-07-10',
      completedDate: '2025-07-14',
      relatedModule: 'Admin',
      tags: ['emergency', 'contacts', 'quarterly'],
      estimatedHours: 1,
      actualHours: 0.75,
      comments: 2
    }
  ];
};

export default function MyTasksPage() {
  const { currentTheme } = useTheme();
  
  // Use secondary theme color
  const secondaryColor = currentTheme?.colors?.secondary || '#e77726';
  const [tasks, setTasks] = useState<Task[]>(generateMyTasks());
  
  // Completion modal state
  const [completionModal, setCompletionModal] = useState<{isOpen: boolean, task: Task | null}>({
    isOpen: false,
    task: null
  });
  const [completionNotes, setCompletionNotes] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<TaskType | 'All'>('All');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'All'>('All');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status' | 'created'>('dueDate');
  const [showOnlyOverdue, setShowOnlyOverdue] = useState(false);

  // View mode - outline is first/default
  const [viewMode, setViewMode] = useState<'outline' | 'list' | 'kanban' | 'calendar'>('outline');
  const [sortField, setSortField] = useState<string>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Calendar view state
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('month');
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: tasks.length,
      overdue: tasks.filter(t => t.status !== 'Completed' && t.dueDate < today).length,
      dueToday: tasks.filter(t => t.dueDate === today && t.status !== 'Completed').length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length
    };
  }, [tasks]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    console.log('Filtering tasks with:', { 
      showOnlyOverdue, 
      selectedStatus, 
      dateRange, 
      searchTerm,
      selectedType,
      selectedPriority
    });
    let filtered = [...tasks];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        task.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(task => task.type === selectedType);
    }

    // Priority filter
    if (selectedPriority !== 'All') {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(task => task.status === selectedStatus);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const endDate = new Date();
      if (dateRange === 'today') {
        filtered = filtered.filter(task => task.dueDate === today.toISOString().split('T')[0]);
      } else if (dateRange === 'week') {
        endDate.setDate(endDate.sysdatetimeoffset() + 7);
        filtered = filtered.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= today && taskDate <= endDate;
        });
      } else if (dateRange === 'month') {
        endDate.setMonth(endDate.getMonth() + 1);
        filtered = filtered.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= today && taskDate <= endDate;
        });
      }
    }

    // Overdue filter
    if (showOnlyOverdue) {
      const todayStr = today.toISOString().split('T')[0];
      filtered = filtered.filter(task => 
        task.status !== 'Completed' && task.dueDate < todayStr
      );
    }

    // Sort based on current view mode
    if (viewMode === 'outline') {
      // Use sortField and sortDirection for outline view
      filtered.sort((a, b) => {
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
          case 'assignedBy':
            aVal = a.assignedBy;
            bVal = b.assignedBy;
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
    } else {
      // Use existing sortBy for other views
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'dueDate':
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          case 'priority':
            const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          case 'status':
            const statusOrder = { 'Overdue': 0, 'New': 1, 'In Progress': 2, 'On Hold': 3, 'Completed': 4, 'Cancelled': 5 };
            return statusOrder[a.status] - statusOrder[b.status];
          case 'created':
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          default:
            return 0;
        }
      });
    }

    console.log('Filtered tasks count:', filtered.length, 'from', tasks.length);
    return filtered;
  }, [tasks, searchTerm, selectedType, selectedPriority, selectedStatus, dateRange, showOnlyOverdue, sortBy, viewMode, sortField, sortDirection]);

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'New': return 'text-purple-600 bg-purple-100';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100';
      case 'On Hold': return 'text-gray-600 bg-gray-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Cancelled': return 'text-gray-600 bg-gray-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
    }
  };

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'Document Review': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Permit Approval': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'Contractor Verification': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        );
      case 'Process Review': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'Compliance Check': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Safety Inspection': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
          </svg>
        );
      case 'Training Assignment': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'System Configuration': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'Data Entry': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'Report Generation': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'Audit': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'Meeting': 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default: 
        return (
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
    setDateRange('all');
    setShowOnlyOverdue(false);
    setSortBy('dueDate');
  };
  
  // Open completion modal
  const openCompletionModal = (task: Task) => {
    setCompletionModal({ isOpen: true, task });
    setCompletionNotes('');
    setHoursWorked(task.estimatedHours?.toString() || '');
  };
  
  // Handle sorting for outline view
  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };
  
  // Get sort icon for outline view
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
  
  // Handle task completion
  const handleCompleteTask = () => {
    if (completionModal.task) {
      // Update the task status to completed
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === completionModal.task?.id 
            ? { 
                ...t, 
                status: 'Completed' as TaskStatus, 
                completedDate: new Date().toISOString().split('T')[0],
                actualHours: parseFloat(hoursWorked) || t.actualHours
              }
            : t
        )
      );
      
      // Close modal
      setCompletionModal({ isOpen: false, task: null });
      setCompletionNotes('');
      setHoursWorked('');
    }
  };

  const activeFilterCount = [
    searchTerm !== '',
    selectedType !== 'All',
    selectedPriority !== 'All',
    selectedStatus !== 'All',
    dateRange !== 'all',
    showOnlyOverdue
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>My Tasks</h1>
              <p className="text-gray-600 mt-1">Manage and track your assigned tasks</p>
            </div>
            <Link 
              href="/tasks/create" 
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              className="hover:opacity-80"
            >
              Create New Task
            </Link>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

        {/* Stats Cards - Clickable Filters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div 
            className={`bg-white rounded-lg shadow-sm border-2 p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              !showOnlyOverdue && selectedStatus === 'All' && dateRange === 'all' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-400'
            }`}
            onClick={() => {
              console.log('Total card clicked - clearing filters');
              clearFilters();
            }}
            title="Click to show all tasks"
          >
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold" style={{ color: '#3d3a72' }}>{stats.total}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow-sm border-2 p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              showOnlyOverdue 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 hover:border-red-300'
            }`}
            onClick={() => {
              console.log('Overdue card clicked - filtering overdue');
              setSearchTerm('');
              setSelectedType('All');
              setSelectedPriority('All');
              setSelectedStatus('All');
              setDateRange('all');
              setSortBy('dueDate');
              setShowOnlyOverdue(true);
            }}
            title="Click to filter overdue tasks"
          >
            <p className="text-sm text-gray-600">Overdue</p>
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow-sm border-2 p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              dateRange === 'today' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-300'
            }`}
            onClick={() => {
              console.log('Due Today card clicked - filtering today');
              setSearchTerm('');
              setSelectedType('All');
              setSelectedPriority('All');
              setSelectedStatus('All');
              setShowOnlyOverdue(false);
              setSortBy('dueDate');
              setDateRange('today');
            }}
            title="Click to filter tasks due today"
          >
            <p className="text-sm text-gray-600">Due Today</p>
            <p className="text-2xl font-bold text-orange-600">{stats.dueToday}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow-sm border-2 p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              selectedStatus === 'In Progress' 
                ? 'border-yellow-500 bg-yellow-50' 
                : 'border-gray-200 hover:border-yellow-300'
            }`}
            onClick={() => {
              console.log('In Progress card clicked - filtering in progress');
              setSearchTerm('');
              setSelectedType('All');
              setSelectedPriority('All');
              setDateRange('all');
              setShowOnlyOverdue(false);
              setSortBy('dueDate');
              setSelectedStatus('In Progress');
            }}
            title="Click to filter in-progress tasks"
          >
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
          </div>
          <div 
            className={`bg-white rounded-lg shadow-sm border-2 p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              selectedStatus === 'Completed' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => {
              console.log('Completed card clicked - filtering completed');
              setSearchTerm('');
              setSelectedType('All');
              setSelectedPriority('All');
              setDateRange('all');
              setShowOnlyOverdue(false);
              setSortBy('dueDate');
              setSelectedStatus('Completed');
            }}
            title="Click to filter completed tasks"
          >
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Active Filter Indicator */}
        {(showOnlyOverdue || selectedStatus !== 'All' || dateRange !== 'all') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-medium text-blue-900">
                Active Filter: {
                  showOnlyOverdue ? 'Overdue Tasks' :
                  dateRange === 'today' ? 'Due Today' :
                  selectedStatus !== 'All' ? `${selectedStatus} Tasks` :
                  'Custom'
                }
              </span>
            </div>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Filters Section - Following NewPage.md standards */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h4 className="text-base font-semibold">Filter Options</h4>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
              <button 
                onClick={() => { setShowOnlyOverdue(true); setDateRange('all'); }}
                className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
              >
                Overdue Only
              </button>
              <button 
                onClick={() => setDateRange('today')}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded text-xs hover:bg-yellow-200"
              >
                Due Today
              </button>
              <button 
                onClick={() => setSelectedPriority('Critical' as TaskPriority | 'All')}
                className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded text-xs hover:bg-red-200"
              >
                Critical Tasks
              </button>
              <button 
                onClick={() => setSelectedStatus('In Progress' as TaskStatus | 'All')}
                style={{ backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }}
                className="px-3 py-1 rounded text-xs hover:opacity-80"
              >
                In Progress
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search by task title, description, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
          </div>

          {/* Filter Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as TaskType | 'All')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="All">All Types</option>
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
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as TaskPriority | 'All')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as TaskStatus | 'All')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="all">All Dates</option>
                <option value="today">Due Today</option>
                <option value="week">Next 7 Days</option>
                <option value="month">Next 30 Days</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="created">Created Date</option>
              </select>
            </div>

            {/* Overdue Toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyOverdue}
                  onChange={(e) => setShowOnlyOverdue(e.target.checked)}
                  className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Show only overdue</span>
              </label>
            </div>
          </div>
          
          {/* Action Buttons - Small size for filter context */}
          <div className="pt-4">
            <div className="flex items-center space-x-2">
              {/* Apply Filters button - primary color, small size */}
              <button style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '4px 12px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'opacity 0.2s'
              }} className="hover:opacity-80"
              onClick={() => {
                // Filters are already applied automatically on change
                // This button can be used for manual refresh or additional logic
                console.log('Filters applied');
              }}>
                Apply Filters
              </button>
              
              {/* Clear All button - secondary color, small size */}
              <button style={{ 
                backgroundColor: '#e77726', 
                color: '#ffffff', 
                border: 'none',
                padding: '4px 12px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'opacity 0.2s'
              }} className="hover:opacity-80"
              onClick={clearFilters}>
                Clear All
              </button>
            </div>
          </div>
        </div>

      {/* View Mode Tabs - Following NewPage.md tab navigation standards */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 lg:px-12 xl:px-16">
          <nav className="-mb-px flex space-x-8" aria-label="View Tabs">
            <a 
              href="#outline"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'outline' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={(e) => { e.preventDefault(); setViewMode('outline'); }}
            >
              Outline View
            </a>
            <a 
              href="#list"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'list' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={(e) => { e.preventDefault(); setViewMode('list'); }}
            >
              List View
            </a>
            <a 
              href="#kanban"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'kanban' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={(e) => { e.preventDefault(); setViewMode('kanban'); }}
            >
              Kanban View
            </a>
            <a 
              href="#calendar"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                viewMode === 'calendar' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={(e) => { e.preventDefault(); setViewMode('calendar'); }}
            >
              Calendar View
            </a>
          </nav>
        </div>
      </div>

      {/* Outline View - Table Format like main tasks page */}
      {viewMode === 'outline' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-theme-primary/10">
            <h2 className="text-xl font-semibold">My Tasks</h2>
            <p className="text-gray-600 text-sm mt-1">All tasks assigned to you</p>
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
                    onClick={() => handleSort('assignedBy')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Assigned By</span>
                      {getSortIcon('assignedBy')}
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
                {filteredTasks.map((task) => {
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
                        {task.assignedBy}
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* Following NewPage.md: 2 or fewer actions - use buttons */}
                        {task.status !== 'Completed' ? (
                          <>
                            {/* Primary button for non-destructive action */}
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
                                transition: 'opacity 0.2s',
                                marginRight: '8px'
                              }}
                              className="hover:opacity-80"
                              onClick={() => console.log('View task:', task.id)}
                            >
                              View
                            </button>
                            
                            {/* Primary button for complete action */}
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
                              onClick={() => openCompletionModal(task)}
                            >
                              Complete
                            </button>
                          </>
                        ) : (
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
                            onClick={() => console.log('View completed task:', task.id)}
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                
                {/* Empty state */}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center">
                      <span className="text-sm text-gray-500">No tasks found matching your filters</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Task List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Tasks ({filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'})
              </h3>
              <div className="flex gap-3">
                {/* Primary buttons for header actions - Following NewPage.md */}
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
                >
                  Export
                </button>
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
                >
                  Print
                </button>
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No tasks found matching your filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0">{getTypeIcon(task.type)}</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.id}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">Priority:</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">Status:</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">Due:</span>
                            <span className="font-medium">{task.dueDate}</span>
                          </div>
                          {task.estimatedHours && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Est:</span>
                              <span className="font-medium">{task.estimatedHours}h</span>
                              {task.actualHours && (
                                <span className="text-gray-500">({task.actualHours}h actual)</span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {task.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          {task.comments !== undefined && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              {task.comments} comments
                            </span>
                          )}
                          {task.attachments !== undefined && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {task.attachments} attachments
                            </span>
                          )}
                          {task.relatedModule && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              {task.relatedModule}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {/* Following NewPage.md: Primary buttons for main actions */}
                        {task.status !== 'Completed' ? (
                          <>
                            <button 
                              onClick={() => openCompletionModal(task)}
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
                            >
                              Complete Task
                            </button>
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
                            >
                              Quick Update
                            </button>
                          </>
                        ) : (
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
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['New', 'In Progress', 'On Hold', 'Completed'] as TaskStatus[]).map((status) => {
              const statusTasks = filteredTasks.filter(t => t.status === status);
              return (
                <div key={status} className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold flex items-center justify-between">
                      <span>{status}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                        {statusTasks.length}
                      </span>
                    </h3>
                  </div>
                  <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                    {statusTasks.map((task) => (
                      <div key={task.id} className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="flex-shrink-0">{getTypeIcon(task.type)}</div>
                          <h4 className="font-medium text-sm flex-1">{task.title}</h4>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          {task.comments !== undefined && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              {task.comments}
                            </span>
                          )}
                          {task.attachments !== undefined && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {task.attachments}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {(() => {
              const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                  'July', 'August', 'September', 'October', 'November', 'December'];
              const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              
              // Group tasks by date
              const tasksByDate = new Map();
              filteredTasks.forEach(task => {
                const dateKey = task.dueDate;
                if (!tasksByDate.has(dateKey)) {
                  tasksByDate.set(dateKey, []);
                }
                tasksByDate.get(dateKey).push(task);
              });
              
              // Navigation functions
              const goToToday = () => setCalendarDate(new Date());
              
              const navigatePrev = () => {
                const newDate = new Date(calendarDate);
                if (calendarView === 'day') {
                  newDate.setDate(newDate.sysdatetimeoffset() - 1);
                } else if (calendarView === 'week') {
                  newDate.setDate(newDate.sysdatetimeoffset() - 7);
                } else {
                  newDate.setMonth(newDate.getMonth() - 1);
                }
                setCalendarDate(newDate);
              };
              
              const navigateNext = () => {
                const newDate = new Date(calendarDate);
                if (calendarView === 'day') {
                  newDate.setDate(newDate.sysdatetimeoffset() + 1);
                } else if (calendarView === 'week') {
                  newDate.setDate(newDate.sysdatetimeoffset() + 7);
                } else {
                  newDate.setMonth(newDate.getMonth() + 1);
                }
                setCalendarDate(newDate);
              };
              
              // Get date range title
              const getDateRangeTitle = () => {
                if (calendarView === 'day') {
                  return `${dayNames[calendarDate.getDay()]}, ${monthNames[calendarDate.getMonth()]} ${calendarDate.sysdatetimeoffset()}, ${calendarDate.getFullYear()}`;
                } else if (calendarView === 'week') {
                  const weekStart = new Date(calendarDate);
                  weekStart.setDate(calendarDate.sysdatetimeoffset() - calendarDate.getDay());
                  const weekEnd = new Date(weekStart);
                  weekEnd.setDate(weekStart.sysdatetimeoffset() + 6);
                  
                  if (weekStart.getMonth() === weekEnd.getMonth()) {
                    return `${monthNames[weekStart.getMonth()]} ${weekStart.sysdatetimeoffset()}-${weekEnd.sysdatetimeoffset()}, ${weekStart.getFullYear()}`;
                  } else if (weekStart.getFullYear() === weekEnd.getFullYear()) {
                    return `${monthNames[weekStart.getMonth()]} ${weekStart.sysdatetimeoffset()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.sysdatetimeoffset()}, ${weekStart.getFullYear()}`;
                  } else {
                    return `${monthNames[weekStart.getMonth()]} ${weekStart.sysdatetimeoffset()}, ${weekStart.getFullYear()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.sysdatetimeoffset()}, ${weekEnd.getFullYear()}`;
                  }
                } else {
                  return `${monthNames[calendarDate.getMonth()]} ${calendarDate.getFullYear()}`;
                }
              };
              
              return (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">{getDateRangeTitle()}</h3>
                    <div className="flex items-center gap-2">
                      {/* View toggle buttons */}
                      <div className="bg-gray-100 p-1 rounded-md inline-flex">
                        <button
                          onClick={() => setCalendarView('day')}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            calendarView === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Day
                        </button>
                        <button
                          onClick={() => setCalendarView('week')}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            calendarView === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Week
                        </button>
                        <button
                          onClick={() => setCalendarView('month')}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            calendarView === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Month
                        </button>
                      </div>
                      
                      <div className="border-l border-gray-300 h-6 mx-2"></div>
                      
                      {/* Navigation buttons */}
                      <button onClick={navigatePrev} className="p-2 hover:bg-gray-100 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button onClick={goToToday} className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        Today
                      </button>
                      <button onClick={navigateNext} className="p-2 hover:bg-gray-100 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Day View */}
                  {calendarView === 'day' && (
                    <div className="border border-gray-200 rounded-lg">
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <div className="text-lg font-medium">
                          {calendarDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                      <div className="p-4 min-h-[400px]">
                        {(() => {
                          const dateStr = calendarDate.toISOString().split('T')[0];
                          const dayTasks = tasksByDate.get(dateStr) || [];
                          
                          if (dayTasks.length === 0) {
                            return (
                              <div className="text-center text-gray-500 py-8">
                                No tasks scheduled for this day
                              </div>
                            );
                          }
                          
                          return (
                            <div className="space-y-3">
                              {dayTasks.map(task => (
                                <div 
                                  key={task.id}
                                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                  onClick={() => task.status !== 'Completed' && openCompletionModal(task)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                      <div className="flex items-center gap-3 mt-2">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                                          {task.priority}
                                        </span>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                          {task.status}
                                        </span>
                                        <span className="text-sm text-gray-500">Assigned by: {task.assignedBy}</span>
                                      </div>
                                    </div>
                                    {task.status === 'Completed' ? (
                                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openCompletionModal(task);
                                        }}
                                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                      >
                                        Complete
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                  
                  {/* Week View */}
                  {calendarView === 'week' && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-7 gap-px bg-gray-200">
                        {(() => {
                          const weekStart = new Date(calendarDate);
                          weekStart.setDate(calendarDate.sysdatetimeoffset() - calendarDate.getDay());
                          const weekDays = [];
                          
                          for (let i = 0; i < 7; i++) {
                            const date = new Date(weekStart);
                            date.setDate(weekStart.sysdatetimeoffset() + i);
                            weekDays.push(date);
                          }
                          
                          return weekDays.map((date, index) => {
                            const dateStr = date.toISOString().split('T')[0];
                            const dayTasks = tasksByDate.get(dateStr) || [];
                            const isToday = dateStr === new Date().toISOString().split('T')[0];
                            
                            return (
                              <div key={index} className="bg-white">
                                <div className={`p-2 text-center border-b ${isToday ? 'bg-purple-50' : 'bg-gray-50'}`}>
                                  <div className="text-xs text-gray-500">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
                                  <div className={`text-lg font-medium ${isToday ? 'text-purple-600' : 'text-gray-900'}`}>
                                    {date.sysdatetimeoffset()}
                                  </div>
                                </div>
                                <div className="p-2 min-h-[150px] max-h-[300px] overflow-y-auto">
                                  {dayTasks.length === 0 ? (
                                    <div className="text-xs text-gray-400 text-center mt-2">No tasks</div>
                                  ) : (
                                    <div className="space-y-1">
                                      {dayTasks.map(task => {
                                        const priorityColors = {
                                          'Critical': 'bg-red-100 text-red-800 border-red-200',
                                          'High': 'bg-orange-100 text-orange-800 border-orange-200',
                                          'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                                          'Low': 'bg-green-100 text-green-800 border-green-200'
                                        };
                                        
                                        return (
                                          <div
                                            key={task.id}
                                            className={`text-xs p-1 rounded border ${priorityColors[task.priority]} cursor-pointer hover:opacity-80`}
                                            onClick={() => task.status !== 'Completed' && openCompletionModal(task)}
                                            title={task.title}
                                          >
                                            <div className="truncate font-medium">{task.title}</div>
                                            <div className="flex items-center justify-between mt-0.5">
                                              <span className="text-[10px]">{task.priority}</span>
                                              {task.status === 'Completed' && (
                                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                  
                  {/* Month View */}
                  {calendarView === 'month' && (
                    <div className="grid grid-cols-7 gap-px bg-gray-200">
                      {/* Day headers */}
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar days */}
                      {(() => {
                        const currentMonth = calendarDate.getMonth();
                        const currentYear = calendarDate.getFullYear();
                        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
                        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).sysdatetimeoffset();
                        
                        const calendarDays = [];
                        
                        // Add empty cells for days before month starts
                        for (let i = 0; i < firstDay; i++) {
                          calendarDays.push(null);
                        }
                        
                        // Add days of the month
                        for (let day = 1; day <= daysInMonth; day++) {
                          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                          calendarDays.push({
                            day,
                            date: dateStr,
                            tasks: tasksByDate.get(dateStr) || [],
                            isToday: dateStr === new Date().toISOString().split('T')[0]
                          });
                        }
                        
                        return calendarDays.map((dayInfo, index) => (
                          <div 
                            key={index} 
                            className={`bg-white min-h-[100px] p-2 ${dayInfo?.isToday ? 'ring-2 ring-purple-500' : ''}`}
                          >
                            {dayInfo && (
                              <>
                                <div className={`text-sm font-medium mb-1 ${dayInfo.isToday ? 'text-purple-600' : 'text-gray-900'}`}>
                                  {dayInfo.day}
                                </div>
                                <div className="space-y-1">
                                  {dayInfo.tasks.slice(0, 3).map((task) => {
                                    const priorityColors = {
                                      'Critical': 'bg-red-100 text-red-800 border-red-200',
                                      'High': 'bg-orange-100 text-orange-800 border-orange-200',
                                      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                                      'Low': 'bg-green-100 text-green-800 border-green-200'
                                    };
                                    
                                    return (
                                      <div 
                                        key={task.id}
                                        className={`text-xs p-1 rounded border ${priorityColors[task.priority]} cursor-pointer hover:opacity-80`}
                                        onClick={() => task.status !== 'Completed' && openCompletionModal(task)}
                                        title={task.title}
                                      >
                                        <div className="truncate font-medium">{task.title}</div>
                                        <div className="flex items-center justify-between mt-0.5">
                                          <span className="text-[10px]">{task.priority}</span>
                                          {task.status === 'Completed' && (
                                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                  {dayInfo.tasks.length > 3 && (
                                    <div className="text-[10px] text-gray-500 pl-1">
                                      +{dayInfo.tasks.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                  
                  {/* Legend */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                        <span className="text-gray-600">Critical</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded"></div>
                        <span className="text-gray-600">High</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
                        <span className="text-gray-600">Medium</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                        <span className="text-gray-600">Low</span>
                      </div>
                    </div>
                    <div className="text-gray-500">
                      Click on incomplete tasks to mark as complete
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
      
      {/* Completion Modal */}
      {completionModal.isOpen && completionModal.task && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Complete Task</h2>
            
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-1">Task:</p>
              <p className="font-medium">{completionModal.task.title}</p>
              <p className="text-sm text-gray-500 mt-1">ID: {completionModal.task.id}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actual Hours Worked
              </label>
              <input
                type="number"
                step="0.5"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder={`Estimated: ${completionModal.task.estimatedHours || 'N/A'} hours`}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Completion Notes
              </label>
              <textarea
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Add any notes about the task completion..."
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCompletionModal({ isOpen: false, task: null })}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteTask}
                style={{ 
                  backgroundColor: '#28a745', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                className="hover:opacity-80"
              >
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}