"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock task data for demo
const mockTaskData = {
  id: 'TSK-108',
  title: 'Review Q3 Contractor Insurance Documentation',
  description: `Please review and approve the insurance documentation submitted by ABC Construction Ltd for Q3 2025. 

Key requirements to verify:
- Public liability insurance minimum £5M coverage
- Employers liability insurance is current
- Professional indemnity where applicable
- All certificates are within valid dates
- Named insured matches our contractor records

This is a priority review as the contractor is scheduled to begin work on the Phase 2 expansion project next week.`,
  type: 'Document Review',
  priority: 'High',
  status: 'In Progress',
  progress: 65,
  
  // Assignment details
  assignedTo: 'You',
  assignedBy: 'Sarah Johnson',
  assignedDate: '2025-07-12',
  
  // Dates
  createdDate: '2025-07-12',
  dueDate: '2025-07-18',
  dueTime: '17:00',
  startedDate: '2025-07-14',
  lastUpdated: '2025-07-15 14:30',
  
  // Related items
  relatedModule: 'Contractors',
  relatedId: 'CONT-2345',
  relatedName: 'ABC Construction Ltd',
  
  // Time tracking
  estimatedHours: 4,
  actualHours: 2.5,
  timeRemaining: 1.5,
  
  // Tags
  tags: ['insurance', 'contractor', 'q3-review', 'priority'],
  
  // Checklist
  checklistItems: [
    { id: 1, text: 'Verify public liability insurance coverage', completed: true },
    { id: 2, text: 'Check employers liability insurance validity', completed: true },
    { id: 3, text: 'Review professional indemnity requirements', completed: true },
    { id: 4, text: 'Confirm all certificates are within valid dates', completed: false },
    { id: 5, text: 'Match named insured with contractor records', completed: false },
    { id: 6, text: 'Document any discrepancies found', completed: false },
    { id: 7, text: 'Approve or request additional documentation', completed: false }
  ],
  
  // Activity log
  activityLog: [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'created task',
      timestamp: '2025-07-12 09:00',
      details: null
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'assigned to',
      timestamp: '2025-07-12 09:01',
      details: 'You'
    },
    {
      id: 3,
      user: 'You',
      action: 'started task',
      timestamp: '2025-07-14 10:30',
      details: null
    },
    {
      id: 4,
      user: 'You',
      action: 'completed checklist item',
      timestamp: '2025-07-14 11:15',
      details: 'Verify public liability insurance coverage'
    },
    {
      id: 5,
      user: 'You',
      action: 'completed checklist item',
      timestamp: '2025-07-14 14:20',
      details: 'Check employers liability insurance validity'
    },
    {
      id: 6,
      user: 'You',
      action: 'added comment',
      timestamp: '2025-07-15 09:45',
      details: 'Waiting for updated certificate from contractor'
    },
    {
      id: 7,
      user: 'Mike Davis',
      action: 'added comment',
      timestamp: '2025-07-15 11:00',
      details: 'Certificate has been requested, should receive by EOD'
    },
    {
      id: 8,
      user: 'You',
      action: 'completed checklist item',
      timestamp: '2025-07-15 14:30',
      details: 'Review professional indemnity requirements'
    }
  ],
  
  // Comments
  comments: [
    {
      id: 1,
      user: 'You',
      timestamp: '2025-07-15 09:45',
      text: 'The employers liability certificate expires next month. We should request an updated certificate from the contractor.',
      attachments: []
    },
    {
      id: 2,
      user: 'Mike Davis',
      timestamp: '2025-07-15 11:00',
      text: 'Certificate has been requested from ABC Construction. They confirmed we should receive the updated documentation by end of day.',
      attachments: []
    },
    {
      id: 3,
      user: 'Sarah Johnson',
      timestamp: '2025-07-15 13:15',
      text: 'Thanks for the update. Please ensure all documentation is complete before approving their Phase 2 participation.',
      attachments: []
    }
  ],
  
  // Attachments
  attachments: [
    {
      id: 1,
      name: 'ABC_Public_Liability_Certificate.pdf',
      size: '245 KB',
      uploadedBy: 'ABC Construction',
      uploadedDate: '2025-07-12',
      type: 'pdf'
    },
    {
      id: 2,
      name: 'ABC_Employers_Liability.pdf',
      size: '198 KB',
      uploadedBy: 'ABC Construction',
      uploadedDate: '2025-07-12',
      type: 'pdf'
    },
    {
      id: 3,
      name: 'Insurance_Summary_Q3_2025.xlsx',
      size: '67 KB',
      uploadedBy: 'Sarah Johnson',
      uploadedDate: '2025-07-12',
      type: 'excel'
    }
  ],
  
  // Settings
  requiresApproval: true,
  approver: 'Sarah Johnson',
  notifyOnComplete: true,
  escalationEnabled: true,
  escalationLevel: 1,
  nextEscalation: '2025-07-17 09:00'
};

export default function ViewTaskPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'details' | 'activity' | 'comments'>('details');
  const [newComment, setNewComment] = useState('');
  const [checklistItems, setChecklistItems] = useState(mockTaskData.checklistItems);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completionNotes, setCompletionNotes] = useState('');
  const [actualHours, setActualHours] = useState(mockTaskData.actualHours.toString());

  const handleChecklistToggle = (itemId: number) => {
    setChecklistItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedChecklistCount = checklistItems.filter(item => item.completed).length;
  const checklistProgress = (completedChecklistCount / checklistItems.length) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'text-purple-600 bg-purple-100';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100';
      case 'On Hold': return 'text-gray-600 bg-gray-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Cancelled': return 'text-gray-600 bg-gray-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'excel': return '📊';
      case 'word': return '📝';
      case 'image': return '🖼️';
      default: return '📎';
    }
  };

  const handleCompleteTask = () => {
    console.log('Completing task with notes:', completionNotes, 'Hours:', actualHours);
    setShowCompleteModal(false);
    router.push('/tasks/my');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex-1">
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Link href="/tasks" className="hover:opacity-80" style={{ color: '#3d3a72' }}>Tasks</Link>
                <span>/</span>
                <Link href="/tasks/my" className="hover:opacity-80" style={{ color: '#3d3a72' }}>My Tasks</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{mockTaskData.id}</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 m-0">{mockTaskData.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(mockTaskData.priority)}`}>
                  {mockTaskData.priority} Priority
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(mockTaskData.status)}`}>
                  {mockTaskData.status}
                </span>
                <span className="text-sm text-gray-500">
                  Due {mockTaskData.dueDate} at {mockTaskData.dueTime}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              {/* Edit button */}
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
                Edit Task
              </button>
              
              {/* Complete button */}
              <button
                onClick={() => setShowCompleteModal(true)}
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
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Task Details
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'activity' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Activity Log
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm relative ${
                activeTab === 'comments' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Comments
              {mockTaskData.comments.length > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {mockTaskData.comments.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'details' && (
              <>
                {/* Description Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold mb-4">Description</h2>
                  <div className="prose max-w-none text-gray-700">
                    {mockTaskData.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Checklist Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Checklist</h2>
                    <span className="text-sm text-gray-500">
                      {completedChecklistCount} of {checklistItems.length} completed
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${checklistProgress}%` }}
                    />
                  </div>
                  
                  {/* Checklist Items */}
                  <div className="space-y-3">
                    {checklistItems.map((item) => (
                      <label key={item.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleChecklistToggle(item.id)}
                          className="mr-3 rounded text-purple-600 focus:ring-purple-500"
                        />
                        <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Attachments Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold mb-4">Attachments</h2>
                  <div className="space-y-3">
                    {mockTaskData.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{getFileIcon(attachment.type)}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                            <p className="text-xs text-gray-500">
                              {attachment.size} • Uploaded by {attachment.uploadedBy} on {attachment.uploadedDate}
                            </p>
                          </div>
                        </div>
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
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Activity Log</h2>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6">
                    {mockTaskData.activityLog.map((activity, index) => (
                      <div key={activity.id} className="relative flex items-start">
                        <div className="absolute left-0 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        </div>
                        <div className="ml-12 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{activity.user}</span>
                              {' '}
                              {activity.action}
                              {activity.details && (
                                <>
                                  {' '}
                                  <span className="font-medium">{activity.details}</span>
                                </>
                              )}
                            </p>
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                
                {/* Comments List */}
                <div className="space-y-4 mb-6">
                  {mockTaskData.comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-purple-600">
                              {comment.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{comment.user}</p>
                            <p className="text-xs text-gray-500">{comment.timestamp}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 ml-11">{comment.text}</p>
                    </div>
                  ))}
                </div>
                
                {/* Add Comment */}
                <div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <div className="mt-3 flex justify-end">
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
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Task Information</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Task ID</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.id}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Type</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.type}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Assigned By</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.assignedBy}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Assigned To</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.assignedTo}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Created Date</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.createdDate}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Started Date</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.startedDate || 'Not started'}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Last Updated</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.lastUpdated}</dd>
                </div>
              </dl>
            </div>

            {/* Time Tracking Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Time Tracking</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Estimated Hours</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.estimatedHours} hours</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Actual Hours</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.actualHours} hours</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider">Time Remaining</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.timeRemaining} hours</dd>
                </div>
              </dl>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{mockTaskData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${mockTaskData.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Related Items Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Related Items</h2>
              <div className="space-y-3">
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">Module</dt>
                  <dd className="text-sm font-medium text-gray-900">{mockTaskData.relatedModule}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">Related To</dt>
                  <dd>
                    <Link 
                      href="#"
                      className="text-sm font-medium hover:opacity-80"
                      style={{ color: '#3d3a72' }}
                    >
                      {mockTaskData.relatedId} - {mockTaskData.relatedName}
                    </Link>
                  </dd>
                </div>
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {mockTaskData.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                >
                  📧 Send Reminder
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                >
                  👥 Reassign Task
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                >
                  📅 Reschedule
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm text-red-600"
                >
                  ❌ Cancel Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Task Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowCompleteModal(false)} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Complete Task</h2>
                <button 
                  onClick={() => setShowCompleteModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600 mb-1">Task:</p>
                  <p className="font-medium">{mockTaskData.title}</p>
                  <p className="text-sm text-gray-500 mt-1">ID: {mockTaskData.id}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actual Hours Worked
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={actualHours}
                    onChange={(e) => setActualHours(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder={`Estimated: ${mockTaskData.estimatedHours} hours`}
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
              </div>
              
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={handleCompleteTask}
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
                  Mark as Complete
                </button>
                
                <button
                  onClick={() => setShowCompleteModal(false)}
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