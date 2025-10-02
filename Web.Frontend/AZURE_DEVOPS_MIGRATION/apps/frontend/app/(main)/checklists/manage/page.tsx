'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checklistService, ChecklistTemplate } from '@/services/checklistService';

export default function ManageChecklistsPage() {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    status: '',
    search: ''
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [checklists, setChecklists] = useState<ChecklistTemplate[]>([]);
  const [filteredChecklists, setFilteredChecklists] = useState<ChecklistTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Load checklists from API
  useEffect(() => {
    loadChecklists();
  }, [currentPage]);

  const loadChecklists = async () => {
    try {
      setLoading(true);
      const { checklists: data, pagination } = await checklistService.getChecklists({
        page: currentPage,
        pageSize: pageSize,
        search: selectedFilters.search,
        categoryTypeId: selectedFilters.category ? parseInt(selectedFilters.category) : undefined,
        isActive: selectedFilters.status === 'published' ? true : selectedFilters.status === 'draft' ? false : undefined
      });
      setChecklists(data);
      setFilteredChecklists(data);
      if (pagination) {
        setTotalCount(pagination.total || 0);
      }
    } catch (error) {
      console.error('Error loading checklists:', error);
      // Fallback to empty array if API fails
      setChecklists([]);
      setFilteredChecklists([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters - reload from API when filters change
  useEffect(() => {
    if (!loading) {
      loadChecklists();
    }
  }, [selectedFilters]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this checklist?')) {
      try {
        await checklistService.deleteChecklist(id);
        await loadChecklists();
      } catch (error) {
        console.error('Error deleting checklist:', error);
        alert('Failed to delete checklist');
      }
    }
  };

  const handleDuplicate = async (checklist: ChecklistTemplate) => {
    try {
      const duplicate = {
        name: `${checklist.Name || 'Checklist'} (Copy)`,
        description: checklist.Description,
        categoryTypeId: checklist.CategoryTypeID,
        frequencyTypeId: checklist.FrequencyTypeID
      };
      
      await checklistService.createChecklist(duplicate);
      await loadChecklists();
    } catch (error) {
      console.error('Error duplicating checklist:', error);
      alert('Failed to duplicate checklist');
    }
  };

  // Mock data for checklists awaiting completion
  const pendingChecklists = [
    {
      id: 1,
      title: "Daily Safety Inspection",
      category: "Safety",
      assignedTo: "John Smith",
      assignedBy: "Safety Manager",
      dueDate: "2025-07-16",
      status: "Pending",
      priority: "High",
      progress: 0,
      startedAt: null,
      estimatedTime: "15 min",
      recurring: true
    },
    {
      id: 2,
      title: "Equipment Maintenance Check",
      category: "Maintenance",
      assignedTo: "Mike Johnson",
      assignedBy: "Maintenance Supervisor",
      dueDate: "2025-07-15",
      status: "Overdue",
      priority: "Critical",
      progress: 0,
      startedAt: null,
      estimatedTime: "30 min",
      recurring: false
    },
    {
      id: 3,
      title: "Quality Control Review",
      category: "Quality",
      assignedTo: "Sarah Davis",
      assignedBy: "Quality Manager",
      dueDate: "2025-07-18",
      status: "In Progress",
      priority: "Medium",
      progress: 45,
      startedAt: "2025-07-16 09:30",
      estimatedTime: "25 min",
      recurring: true
    },
    {
      id: 4,
      title: "Compliance Audit Prep",
      category: "Compliance",
      assignedTo: "Robert Wilson",
      assignedBy: "Compliance Officer",
      dueDate: "2025-07-20",
      status: "Pending",
      priority: "Low",
      progress: 0,
      startedAt: null,
      estimatedTime: "45 min",
      recurring: false
    },
    {
      id: 5,
      title: "Site Security Check",
      category: "Safety",
      assignedTo: "Emma Brown",
      assignedBy: "Security Manager",
      dueDate: "2025-07-16",
      status: "In Progress",
      priority: "High",
      progress: 75,
      startedAt: "2025-07-16 08:00",
      estimatedTime: "20 min",
      recurring: true
    }
  ];

  const dashboardStats = [
    { label: "Total Pending", value: 42, change: "+3 today", changePositive: false },
    { label: "In Progress", value: 8, change: "+2 today", changePositive: true },
    { label: "Overdue", value: 5, change: "-1 today", changePositive: true },
    { label: "Due Today", value: 12, change: "+4 today", changePositive: false },
    { label: "Completed Today", value: 23, change: "+5 today", changePositive: true },
    { label: "Average Time", value: "22m", change: "-2m today", changePositive: true }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Manage Checklists</h1>
              <p className="text-gray-600 mt-1">Monitor and manage checklist templates and assignments</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => router.push('/checklists/create')}
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
                Create New
              </button>
              <button
                onClick={() => router.push('/checklists/create/document')}
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
                Import from Document
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.changePositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={selectedFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search checklists..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="">All Categories</option>
                <option value="safety">Safety</option>
                <option value="maintenance">Maintenance</option>
                <option value="quality">Quality</option>
                <option value="compliance">Compliance</option>
                <option value="operations">Operations</option>
                <option value="hr">HR</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={selectedFilters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Assignee Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
              <select
                value={selectedFilters.assignee}
                onChange={(e) => handleFilterChange('assignee', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="">All Assignees</option>
                <option value="John Smith">John Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
                <option value="Sarah Davis">Sarah Davis</option>
                <option value="Robert Wilson">Robert Wilson</option>
                <option value="Emma Brown">Emma Brown</option>
              </select>
            </div>

            {/* Due Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <select
                value={selectedFilters.dueDate}
                onChange={(e) => handleFilterChange('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="">All Dates</option>
                <option value="overdue">Overdue</option>
                <option value="today">Due Today</option>
                <option value="tomorrow">Due Tomorrow</option>
                <option value="this-week">Due This Week</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setSelectedFilters({ category: '', status: '', search: '' })}
              className="btn btn-sm text-white hover:opacity-80" 
              style={{
                backgroundColor: '#e77726', 
                padding: '4px 12px', 
                borderRadius: '4px', 
                fontSize: '12px', 
                transition: 'opacity 0.2s'
              }}
            >
              Clear All Filters
            </button>
            <div className="flex space-x-2">
              <button 
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'opacity 0.2s'
                }} 
                className="hover:opacity-80"
              >
                Send Reminders
              </button>
              <button 
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'opacity 0.2s'
                }} 
                className="hover:opacity-80"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Checklist Templates Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Checklist Templates</h2>
            <div className="text-sm text-gray-600">
              {filteredChecklists.length} templates available
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Loading checklists...
                    </td>
                  </tr>
                ) : filteredChecklists.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No checklists found. Create your first checklist or import one from a document.
                    </td>
                  </tr>
                ) : (
                  filteredChecklists.map((checklist) => (
                    <tr key={checklist.ChecklistTemplateID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{checklist.Name || 'Untitled'}</div>
                          <div className="text-sm text-gray-500">{checklist.Description || 'No description'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          {checklist.CategoryName || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          checklist.IsActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {checklist.IsActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {checklist.AssignmentCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {checklist.CreatedDate ? new Date(checklist.CreatedDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`/checklists/preview/${checklist.ChecklistTemplateID}`, '_blank')}
                            className="btn btn-sm text-white hover:opacity-80"
                            style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => router.push(`/checklists/assign?checklistId=${checklist.ChecklistTemplateID}`)}
                            className="btn btn-sm text-white hover:opacity-80"
                            style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}
                          >
                            Assign
                          </button>
                          <button
                            onClick={() => handleDuplicate(checklist)}
                            className="btn btn-sm text-white hover:opacity-80"
                            style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDelete(checklist.ChecklistTemplateID!)}
                            className="btn btn-sm text-white hover:opacity-80"
                            style={{backgroundColor: '#e77726', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Checklists Table */}
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
          isFullscreen ? 'fixed inset-0 z-50 m-0' : ''
        }`}>
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Checklists Awaiting Completion</h2>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            </button>
          </div>
          
          <div className={`overflow-x-auto ${isFullscreen ? 'h-[calc(100vh-120px)] overflow-y-auto' : ''}`}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Checklist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Est.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingChecklists.map((checklist) => (
                  <tr key={checklist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{checklist.title}</div>
                        <div className="text-sm text-gray-500">
                          {checklist.category} {checklist.recurring && '• Recurring'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{checklist.assignedTo}</div>
                      <div className="text-sm text-gray-500">by {checklist.assignedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(checklist.status)}`}>
                        {checklist.status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(checklist.priority)}`}>
                        {checklist.priority.charAt(0).toUpperCase() + checklist.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {checklist.dueDate}
                      {checklist.status === 'Overdue' && (
                        <span className="text-xs text-red-600 block">Overdue by 1 day</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {checklist.progress > 0 ? (
                        <div className="flex items-center">
                          <div className="flex-grow bg-gray-200 rounded-full h-2 mr-2 w-20">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ backgroundColor: '#3d3a72', width: `${checklist.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{checklist.progress}%</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not started</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {checklist.estimatedTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="relative">
                        <select
                          onChange={(e) => {
                            const action = e.target.value;
                            if (action === 'view-progress') {
                              window.open(`/checklists/complete/${checklist.id === 1 ? 'demo-safety-inspection' : checklist.id}`, '_blank');
                            } else if (action === 'view-details') {
                              window.open(`/checklists/preview/${checklist.id === 1 ? 'demo-safety-inspection' : checklist.id}`, '_blank');
                            } else {
                              console.log(`Action ${action} for checklist ${checklist.id}`);
                            }
                            e.target.value = '';
                          }}
                          className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Actions</option>
                          <option value="view-progress">View Progress</option>
                          <option value="send-reminder">Send Reminder</option>
                          <option value="reassign">Reassign</option>
                          <option value="extend-due-date">Extend Due Date</option>
                          <option value="mark-complete">Mark Complete</option>
                          <option value="cancel">Cancel Assignment</option>
                          <option value="view-details">Preview</option>
                        </select>
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