"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

// Mock operational metrics for manager dashboard
const mockOperationalMetrics = {
  safety: {
    score: 96,
    incidents: 2,
    daysWithoutIncident: 45,
    nearMisses: 8,
    inspectionsCompleted: 234,
    overdueInspections: 3
  },
  compliance: {
    overallScore: 98,
    openActions: 12,
    upcomingAudits: 3,
    documentsExpiring: 7,
    certificationsActive: 156
  },
  team: {
    totalEmployees: 245,
    activeEmployees: 238,
    trainingCompliance: 87,
    taskCompletionRate: 92,
    averageTaskTime: 4.2
  },
  operations: {
    activeTasks: 89,
    overdueItems: 5,
    contractorsOnSite: 47,
    activeProjects: 24,
    permitsPending: 8
  }
};

const recentManagerUpdates = [
  { id: 1, type: 'safety', title: 'Near Miss Report - Warehouse B', description: 'Slip hazard reported and addressed', assignee: 'John Smith', time: '15 min ago', priority: 'high' },
  { id: 2, type: 'compliance', title: 'ISO 9001 Expiring Soon', description: 'Certification expires in 30 days', assignee: 'Sarah Chen', time: '1 hour ago', priority: 'medium' },
  { id: 3, type: 'task', title: 'Fire Safety Inspection Complete', description: 'Monthly inspection passed all checks', assignee: 'Mike Johnson', time: '2 hours ago', priority: 'low' },
  { id: 4, type: 'training', title: 'Forklift Training Scheduled', description: '15 employees scheduled for certification', assignee: 'Lisa Wong', time: '3 hours ago', priority: 'medium' },
  { id: 5, type: 'contractor', title: 'ABC Electrical Onboarded', description: 'New contractor approved and active', assignee: 'Tom Davis', time: '4 hours ago', priority: 'low' }
];

const urgentActions = [
  { id: 1, title: 'Review High-Priority Incident', type: 'incident', dueDate: 'Today 5:00 PM', assignee: 'You', priority: 'high' },
  { id: 2, title: 'Approve Contractor Permits', type: 'permit', dueDate: 'Tomorrow', assignee: 'Safety Team', priority: 'medium' },
  { id: 3, title: 'Complete Risk Assessment Review', type: 'compliance', dueDate: 'Friday', assignee: 'Quality Team', priority: 'high' },
  { id: 4, title: 'Sign Off Training Records', type: 'training', dueDate: 'Next Week', assignee: 'HR Department', priority: 'medium' }
];

const teamPerformance = [
  { department: 'Safety', completion: 95, onTime: 88, issues: 2 },
  { department: 'Quality', completion: 92, onTime: 85, issues: 1 },
  { department: 'Operations', completion: 89, onTime: 91, issues: 3 },
  { department: 'Maintenance', completion: 87, onTime: 82, issues: 4 }
];

export default function ManagerHomeDashboard() {
  const { user } = useUser();
  const [selectedView, setSelectedView] = useState('overview');

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-base-content';
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

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="w-full">
      {/* Manager Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Operations Management</h1>
            <p className="text-base-content/70 mt-2">
              Welcome back, {user?.firstName}! {user?.tenantName} - {user?.departmentName} Department
            </p>
          </div>
          <div className="flex gap-2">
            <select className="select select-bordered select-sm" value={selectedView} onChange={(e) => setSelectedView(e.target.value)}>
              <option value="overview">Overview</option>
              <option value="safety">Safety Focus</option>
              <option value="compliance">Compliance Focus</option>
              <option value="team">Team Performance</option>
            </select>
            <Link href="/incidents/dashboard" className="btn btn-primary btn-sm">
              Full Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Manager KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Safety Score</div>
          <div className="stat-value text-3xl">{mockOperationalMetrics.safety.score}%</div>
          <div className="stat-desc">
            {mockOperationalMetrics.safety.daysWithoutIncident} days incident-free
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-info">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="stat-title">Team Performance</div>
          <div className="stat-value text-3xl">{mockOperationalMetrics.team.taskCompletionRate}%</div>
          <div className="stat-desc">
            {mockOperationalMetrics.operations.activeTasks} active tasks
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-warning">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-title">Compliance Rate</div>
          <div className="stat-value text-3xl">{mockOperationalMetrics.compliance.overallScore}%</div>
          <div className="stat-desc">
            {mockOperationalMetrics.compliance.openActions} open actions
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-primary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="stat-title">Active Projects</div>
          <div className="stat-value text-3xl">{mockOperationalMetrics.operations.activeProjects}</div>
          <div className="stat-desc">
            {mockOperationalMetrics.operations.contractorsOnSite} contractors on site
          </div>
        </div>
      </div>
      
      {/* Main Manager Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Team Performance Overview */}
        <div className="lg:col-span-2 bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Team Performance
            </h2>
            <Link href="/admin/analytics" className="btn btn-ghost btn-sm">View Details</Link>
          </div>
          
          <div className="space-y-4">
            {teamPerformance.map((dept, index) => (
              <div key={index} className="p-4 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{dept.department}</h3>
                  <div className="flex gap-2">
                    <span className={`text-sm ${getCompletionColor(dept.completion)}`}>
                      {dept.completion}% complete
                    </span>
                    {dept.issues > 0 && (
                      <span className="badge badge-error badge-sm">{dept.issues} issues</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-base-content/70">On Time: </span>
                    <span className={getCompletionColor(dept.onTime)}>{dept.onTime}%</span>
                  </div>
                  <div>
                    <span className="text-base-content/70">Task Completion: </span>
                    <span className={getCompletionColor(dept.completion)}>{dept.completion}%</span>
                  </div>
                </div>
                <div className="w-full bg-base-200 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${dept.completion >= 90 ? 'bg-success' : dept.completion >= 75 ? 'bg-warning' : 'bg-error'}`}
                    style={{ width: `${dept.completion}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Actions */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Urgent Actions
          </h3>
          
          <div className="space-y-3">
            {urgentActions.map((action) => (
              <div key={action.id} className="p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{action.title}</h4>
                  <span className={`badge badge-sm ${getPriorityBadge(action.priority)}`}>
                    {action.priority}
                  </span>
                </div>
                <div className="text-xs text-base-content/60">
                  <div>Due: {action.dueDate}</div>
                  <div>Assigned: {action.assignee}</div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/tasks" className="btn btn-outline btn-sm w-full mt-4">
            View All Tasks
          </Link>
        </div>
      </div>

      {/* Recent Updates Feed */}
      <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Recent Updates
          </h2>
          <Link href="/notifications" className="btn btn-ghost btn-sm">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentManagerUpdates.map((update) => (
            <div key={update.id} className="flex items-start gap-3 p-4 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{update.title}</h3>
                  <span className={`badge badge-sm ${getPriorityBadge(update.priority)}`}>
                    {update.priority}
                  </span>
                </div>
                <p className="text-sm text-base-content/70 mt-1">{update.description}</p>
                <div className="flex justify-between text-xs text-base-content/50 mt-2">
                  <span>Assigned: {update.assignee}</span>
                  <span>{update.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manager Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/incidents/form" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Report Incident</span>
        </Link>
        
        <Link href="/contractors" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Contractors</span>
        </Link>
        
        <Link href="/permits" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Approve Permits</span>
        </Link>
        
        <Link href="/checklists" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Checklists</span>
        </Link>
        
        <Link href="/policies" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Policies</span>
        </Link>
        
        <Link href="/risk-assessments" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Risk Assessments</span>
        </Link>
        
        <Link href="/admin/users" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Manage Team</span>
        </Link>
        
        <Link href="/admin/reports" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Reports</span>
        </Link>
      </div>
    </div>
  );
}