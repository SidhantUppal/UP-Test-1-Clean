"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

// Mock daily operational data for operator dashboard
const mockDailyOperations = {
  today: {
    tasksAssigned: 12,
    tasksCompleted: 8,
    inspectionsDue: 5,
    inspectionsCompleted: 3,
    permitsActive: 7,
    permitsExpiring: 2,
    incidentsReported: 1,
    checklistsCompleted: 6
  },
  schedule: {
    morningInspections: 3,
    afternoonTasks: 4,
    urgentItems: 2,
    routineMaintenance: 3
  }
};

const todaysTasks = [
  { id: 1, type: 'inspection', title: 'Fire Extinguisher Check - Building A', location: 'Floor 1-3', dueTime: '10:00 AM', priority: 'high', status: 'pending' },
  { id: 2, type: 'maintenance', title: 'HVAC Filter Replacement', location: 'Roof Access', dueTime: '11:30 AM', priority: 'medium', status: 'in-progress' },
  { id: 3, type: 'inspection', title: 'Emergency Exit Lighting Test', location: 'All Floors', dueTime: '2:00 PM', priority: 'high', status: 'pending' },
  { id: 4, type: 'checklist', title: 'Daily Safety Walkthrough', location: 'Production Area', dueTime: '3:30 PM', priority: 'medium', status: 'pending' },
  { id: 5, type: 'permit', title: 'Hot Work Permit Inspection', location: 'Workshop', dueTime: '4:00 PM', priority: 'high', status: 'pending' }
];

const activePermits = [
  { id: 1, type: 'Hot Work', location: 'Workshop A', contractor: 'ABC Welding', expires: 'Today 6:00 PM', status: 'active' },
  { id: 2, type: 'Confined Space', location: 'Storage Tank 3', contractor: 'SafeClean Ltd', expires: 'Tomorrow', status: 'active' },
  { id: 3, type: 'Working at Height', location: 'Warehouse Roof', contractor: 'Heights Pro', expires: 'Today 5:00 PM', status: 'expiring' }
];

const recentIncidents = [
  { id: 1, type: 'Near Miss', title: 'Slip Hazard - Wet Floor', location: 'Cafeteria', reportedBy: 'You', time: '2 hours ago', severity: 'low' },
  { id: 2, type: 'Equipment Issue', title: 'Forklift Warning Light', location: 'Warehouse B', reportedBy: 'Mike Johnson', time: '1 day ago', severity: 'medium' }
];

const quickChecks = [
  { id: 1, item: 'First Aid Kits', location: 'All Locations', lastCheck: '3 days ago', status: 'due' },
  { id: 2, item: 'Emergency Lighting', location: 'Building A', lastCheck: '1 week ago', status: 'ok' },
  { id: 3, item: 'Fire Alarms', location: 'Production Floor', lastCheck: '2 days ago', status: 'ok' },
  { id: 4, item: 'Eye Wash Stations', location: 'Chemical Storage', lastCheck: '5 days ago', status: 'due' }
];

export default function OperatorHomeDashboard() {
  const { user } = useUser();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-base-content';
      case 'overdue': return 'text-error';
      default: return 'text-base-content';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return 'badge-success';
      case 'in-progress': return 'badge-warning';
      case 'pending': return 'badge-neutral';
      case 'overdue': return 'badge-error';
      case 'active': return 'badge-success';
      case 'expiring': return 'badge-warning';
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

  return (
    <div className="w-full">
      {/* Operator Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Daily Operations</h1>
            <p className="text-base-content/70 mt-2">
              Good morning, {user?.firstName}! {user?.departmentName} - {user?.tenantName}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-primary">
              {mockDailyOperations.today.tasksCompleted}/{mockDailyOperations.today.tasksAssigned} Tasks Complete
            </div>
            <Link href="/tasks" className="btn btn-primary btn-sm">
              View All Tasks
            </Link>
          </div>
        </div>
      </div>
      
      {/* Daily Progress KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-primary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="stat-title">Today's Tasks</div>
          <div className="stat-value text-2xl">
            {mockDailyOperations.today.tasksCompleted}/{mockDailyOperations.today.tasksAssigned}
          </div>
          <div className="stat-desc">
            {Math.round((mockDailyOperations.today.tasksCompleted / mockDailyOperations.today.tasksAssigned) * 100)}% complete
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-info">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="stat-title">Inspections</div>
          <div className="stat-value text-2xl">
            {mockDailyOperations.today.inspectionsCompleted}/{mockDailyOperations.today.inspectionsDue}
          </div>
          <div className="stat-desc">Due today</div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-warning">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="stat-title">Active Permits</div>
          <div className="stat-value text-2xl">{mockDailyOperations.today.permitsActive}</div>
          <div className="stat-desc">
            {mockDailyOperations.today.permitsExpiring} expiring today
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-success">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-title">Checklists</div>
          <div className="stat-value text-2xl">{mockDailyOperations.today.checklistsCompleted}</div>
          <div className="stat-desc">Completed today</div>
        </div>
      </div>
      
      {/* Main Operator Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Today's Schedule
            </h2>
            <div className="text-sm text-base-content/70">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center">
                    <svg className="w-5 h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex gap-4 text-sm text-base-content/70">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {task.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {task.dueTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge badge-sm ${getPriorityBadge(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`badge badge-sm ${getStatusBadge(task.status)}`}>
                    {task.status}
                  </span>
                  {task.status === 'pending' && (
                    <button className="btn btn-primary btn-sm">Start</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Safety Checks */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Quick Safety Checks
          </h3>
          
          <div className="space-y-3">
            {quickChecks.map((check) => (
              <div key={check.id} className="p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-sm">{check.item}</h4>
                  <span className={`badge badge-sm ${check.status === 'due' ? 'badge-warning' : 'badge-success'}`}>
                    {check.status === 'due' ? 'Check Due' : 'OK'}
                  </span>
                </div>
                <div className="text-xs text-base-content/60">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {check.location}
                  </div>
                  <div>Last: {check.lastCheck}</div>
                </div>
                {check.status === 'due' && (
                  <button className="btn btn-warning btn-xs mt-2 w-full">
                    Perform Check
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Permits & Recent Incidents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Active Permits */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Active Permits
            </h3>
            <Link href="/permits" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          
          <div className="space-y-3">
            {activePermits.map((permit) => (
              <div key={permit.id} className="p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{permit.type}</h4>
                  <span className={`badge badge-sm ${getStatusBadge(permit.status)}`}>
                    {permit.status}
                  </span>
                </div>
                <div className="text-sm text-base-content/70">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {permit.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {permit.contractor}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Expires: {permit.expires}
                  </div>
                </div>
                {permit.status === 'expiring' && (
                  <button className="btn btn-warning btn-xs mt-2 w-full">
                    Extend Permit
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Recent Reports
            </h3>
            <Link href="/incidents/form" className="btn btn-primary btn-sm">Report Issue</Link>
          </div>
          
          <div className="space-y-3">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{incident.title}</h4>
                  <span className={`badge badge-sm ${incident.severity === 'high' ? 'badge-error' : incident.severity === 'medium' ? 'badge-warning' : 'badge-success'}`}>
                    {incident.severity}
                  </span>
                </div>
                <div className="text-xs text-base-content/60">
                  <div>Type: {incident.type}</div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {incident.location}
                  </div>
                  <div>By: {incident.reportedBy} • {incident.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-base-200 rounded-lg">
            <div className="text-sm text-base-content/70 flex items-start gap-2">
              <svg className="w-4 h-4 text-info flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Always report unsafe conditions immediately, even if they seem minor.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operator Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/incidents/form" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-error/10 group-hover:bg-error/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Report Issue</span>
        </Link>
        
        <Link href="/checklists" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Start Checklist</span>
        </Link>
        
        <Link href="/permits/new" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Request Permit</span>
        </Link>
        
        <Link href="/assets/inspection" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Log Inspection</span>
        </Link>
        
        <Link href="/tasks" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">My Tasks</span>
        </Link>
        
        <Link href="/documents/assigned" className="group relative p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">View Docs</span>
        </Link>
      </div>
    </div>
  );
}