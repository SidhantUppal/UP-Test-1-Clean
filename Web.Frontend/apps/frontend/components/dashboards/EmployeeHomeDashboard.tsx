"use client";

import { useState } from 'react';
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
// Dashboard component
import DraggableDashboard from '@/components/dashboard/DraggableDashboard';

// Mock personal data for employee dashboard
const mockPersonalData = {
  training: {
    completedCourses: 8,
    totalRequired: 12,
    completionRate: 67,
    expiringSoon: 2,
    nextDueDate: '2024-08-15',
    certificationsHeld: 5
  },
  tasks: {
    assigned: 6,
    completed: 4,
    overdue: 1,
    thisWeek: 3
  },
  documents: {
    personal: 23,
    shared: 45,
    pending: 2,
    expiring: 1
  },
  performance: {
    tasksOnTime: 92,
    trainingCompliance: 67,
    safetyScore: 98,
    lastReview: '2024-06-01'
  }
};

const myTrainingCourses = [
  { id: 1, title: 'Fire Safety Awareness', progress: 100, dueDate: 'Completed', status: 'completed', expiry: '2025-01-15' },
  { id: 2, title: 'Manual Handling', progress: 75, dueDate: 'Aug 10', status: 'in-progress', expiry: '2024-12-20' },
  { id: 3, title: 'First Aid Certification', progress: 0, dueDate: 'Aug 20', status: 'not-started', expiry: 'N/A' },
  { id: 4, title: 'Working at Height', progress: 100, dueDate: 'Completed', status: 'expiring', expiry: '2024-08-30' }
];

const myTasks = [
  { id: 1, title: 'Complete Safety Induction Quiz', type: 'training', dueDate: 'Today', priority: 'high', status: 'pending' },
  { id: 2, title: 'Submit Timesheet for Week 28', type: 'admin', dueDate: 'Tomorrow', priority: 'medium', status: 'pending' },
  { id: 3, title: 'Review Updated Safety Procedures', type: 'document', dueDate: 'Aug 12', priority: 'medium', status: 'pending' },
  { id: 4, title: 'Attend Team Safety Meeting', type: 'meeting', dueDate: 'Aug 15', priority: 'high', status: 'scheduled' }
];

const myDocuments = [
  { id: 1, title: 'Employee Handbook 2024', type: 'policy', lastAccessed: '2 days ago', status: 'read' },
  { id: 2, title: 'PPE Requirements Update', type: 'safety', lastAccessed: 'Never', status: 'unread' },
  { id: 3, title: 'Holiday Request Form', type: 'form', lastAccessed: '1 week ago', status: 'downloaded' },
  { id: 4, title: 'Emergency Procedures', type: 'safety', lastAccessed: '3 days ago', status: 'read' }
];

const upcomingEvents = [
  { id: 1, title: 'Monthly Safety Meeting', date: 'Aug 15', time: '2:00 PM', location: 'Conference Room A' },
  { id: 2, title: 'Fire Drill Exercise', date: 'Aug 20', time: '10:00 AM', location: 'All Areas' },
  { id: 3, title: 'Team Building Event', date: 'Aug 25', time: '12:00 PM', location: 'Main Hall' }
];

export default function EmployeeHomeDashboard() {
  const { user } = useUser();
  const [isDashboardEditMode, setIsDashboardEditMode] = useState(false);

  const toggleDashboardEditMode = () => {
    setIsDashboardEditMode(!isDashboardEditMode);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'not-started': return 'text-base-content';
      case 'expiring': return 'text-error';
      case 'pending': return 'text-warning';
      case 'scheduled': return 'text-info';
      default: return 'text-base-content';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return 'badge-success';
      case 'in-progress': return 'badge-warning';
      case 'not-started': return 'badge-neutral';
      case 'expiring': return 'badge-error';
      case 'pending': return 'badge-warning';
      case 'scheduled': return 'badge-info';
      case 'read': return 'badge-success';
      case 'unread': return 'badge-error';
      case 'downloaded': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-neutral';
    }
  };

  const getTaskIcon = (type: string) => {
    switch(type) {
      case 'training': return '';
      case 'admin': return '';
      case 'document': return '';
      case 'meeting': return '';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 md:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>My Workspace</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Welcome, {user?.firstName}! <span className="hidden sm:inline">{user?.departmentName} - {user?.tenantName}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full text-center" style={{backgroundColor: '#e8e6f3', color: '#3d3a72'}}>
                {mockPersonalData.training.completionRate}% Training Complete
              </div>
              <button style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }} className="hover:opacity-80 text-xs sm:text-sm">
                My Learning
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:px-12 xl:px-16 space-y-4 sm:space-y-6">
        {/* Personal Progress KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 text-center">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">Training Progress</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#3d3a72' }}>
              {mockPersonalData.training.completedCourses}/{mockPersonalData.training.totalRequired}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {mockPersonalData.training.completionRate}% complete
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 text-center">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">My Tasks</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#3d3a72' }}>
              {mockPersonalData.tasks.completed}/{mockPersonalData.tasks.assigned}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {mockPersonalData.tasks.overdue > 0 && <span className="text-red-600">{mockPersonalData.tasks.overdue} overdue</span>}
              {mockPersonalData.tasks.overdue === 0 && <span className="text-green-600">All on track</span>}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 text-center">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">Documents</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#3d3a72' }}>{mockPersonalData.documents.personal}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {mockPersonalData.documents.pending} pending review
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 text-center">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">Safety Score</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#3d3a72' }}>{mockPersonalData.performance.safetyScore}%</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Excellent record</p>
          </div>
        </div>

        {/* Customizable Dashboard Section */}
        <div>
          <DraggableDashboard 
            isEditMode={isDashboardEditMode} 
            onToggleEditMode={toggleDashboardEditMode}
          />
        </div>
      </div>
      
      {/* TEMPORARILY HIDDEN - Main Employee Content */}
      {false && (
      <div>
      {/* Main Employee Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* My Training Courses */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              My Learning Path
            </h2>
            <Link href="/e-learning/my-courses" className="btn btn-sm text-white hover:opacity-80" style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}>View All</Link>
          </div>
          
          <div className="space-y-3">
            {myTrainingCourses.map((course) => (
              <div key={course.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-base-content">{course.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.status === 'completed' ? 'bg-green-100 text-green-800' :
                    course.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    course.status === 'expiring' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {course.status === 'expiring' ? 'Expiring Soon' : course.status === 'completed' ? 'Completed' : course.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-base-content/70">
                    Due: {course.dueDate}
                    {course.expiry !== 'N/A' && ` • Expires: ${course.expiry}`}
                  </div>
                  <div className="text-sm font-semibold">{course.progress}%</div>
                </div>
                <div className="w-full bg-base-200 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      course.progress === 100 ? 'bg-success' : 
                      course.progress > 0 ? 'bg-warning' : 'bg-base-300'
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                {course.status !== 'completed' && (
                  <button className="btn btn-sm text-white hover:opacity-80" style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}>
                    {course.status === 'not-started' ? 'Start Course' : 'Continue'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming Events
          </h3>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                <h4 className="font-medium text-sm text-base-content">{event.title}</h4>
                <div className="text-xs text-base-content/60 mt-2 space-y-1">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-base-200 rounded-lg">
            <div className="text-sm text-base-content/70 flex items-start gap-2">
              <svg className="w-4 h-4 text-info flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Check your calendar regularly for updates.</span>
            </div>
          </div>
        </div>
      </div>

      {/* My Tasks & Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* My Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4" />
              </svg>
              My Tasks
            </h3>
            <Link href="/tasks" className="btn btn-sm text-white hover:opacity-80" style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}>View All</Link>
          </div>
          
          <div className="space-y-3">
            {myTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div>
                  <h4 className="font-medium text-sm text-base-content">{task.title}</h4>
                  <div className="text-xs text-base-content/60">Due: {task.dueDate}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    task.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Documents */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              My Documents
            </h3>
            <Link href="/documents/my" className="btn btn-sm text-white hover:opacity-80" style={{backgroundColor: '#3d3a72', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', transition: 'opacity 0.2s'}}>View All</Link>
          </div>
          
          <div className="space-y-3">
            {myDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div>
                  <h4 className="font-medium text-sm text-base-content">{doc.title}</h4>
                  <div className="text-xs text-base-content/60">
                    Type: {doc.type} • Last: {doc.lastAccessed}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  doc.status === 'read' ? 'bg-green-100 text-green-800' :
                  doc.status === 'unread' ? 'bg-red-100 text-red-800' :
                  doc.status === 'downloaded' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/e-learning/my-courses" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-base-content">My Training</span>
        </Link>
        
        <Link href="/documents/my" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-base-content">My Documents</span>
        </Link>
        
        <Link href="/tasks" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-base-content">My Tasks</span>
        </Link>
        
        <Link href="/incidents/form" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7h-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 7h6V6H9v1z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6M9 13h6" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-base-content">Report Issue</span>
        </Link>
        
        <Link href="/profile" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-base-content">My Profile</span>
        </Link>
        
        <Link href="/help" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-base-content">Get Help</span>
        </Link>
      </div>
      </div>
      )}
    </div>
  );
}