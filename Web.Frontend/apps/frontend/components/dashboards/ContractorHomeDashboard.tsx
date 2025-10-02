"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

// Mock contractor-specific data
const mockContractorData = {
  status: {
    contractStatus: 'Active',
    complianceScore: 94,
    activeProjects: 3,
    completedProjects: 12,
    expiringDocuments: 2,
    totalDocuments: 18
  },
  currentProjects: [
    { id: 1, name: 'Building A Renovation', location: 'Main Site', startDate: '2024-07-15', endDate: '2024-09-30', progress: 65, manager: 'John Smith' },
    { id: 2, name: 'Electrical Upgrade - Warehouse', location: 'Warehouse B', startDate: '2024-08-01', endDate: '2024-08-15', progress: 25, manager: 'Sarah Chen' },
    { id: 3, name: 'HVAC Maintenance', location: 'Office Block', startDate: '2024-08-10', endDate: '2024-08-12', progress: 10, manager: 'Mike Johnson' }
  ],
  compliance: {
    insurance: { status: 'valid', expiry: '2024-12-31' },
    liability: { status: 'valid', expiry: '2024-11-15' },
    workmanComp: { status: 'expiring', expiry: '2024-08-30' },
    safetyTraining: { status: 'valid', expiry: '2025-01-20' }
  }
};

const requiredDocuments = [
  { id: 1, name: 'Public Liability Insurance', status: 'valid', expiry: '2024-11-15', type: 'insurance' },
  { id: 2, name: 'Safety Training Certificate', status: 'valid', expiry: '2025-01-20', type: 'training' },
  { id: 3, name: 'Workman\'s Compensation', status: 'expiring', expiry: '2024-08-30', type: 'insurance' },
  { id: 4, name: 'Risk Assessment Method Statement', status: 'valid', expiry: '2024-10-15', type: 'safety' },
  { id: 5, name: 'Equipment Certification', status: 'pending', expiry: 'N/A', type: 'equipment' }
];

const recentActivity = [
  { id: 1, type: 'project', title: 'Started HVAC Maintenance Project', description: 'Initial site survey completed', time: '2 hours ago' },
  { id: 2, type: 'document', title: 'Insurance Document Uploaded', description: 'Public liability certificate updated', time: '1 day ago' },
  { id: 3, type: 'compliance', title: 'Safety Induction Completed', description: 'All team members certified', time: '2 days ago' },
  { id: 4, type: 'permit', title: 'Hot Work Permit Approved', description: 'Valid for Building A welding work', time: '3 days ago' }
];

const safetyReminders = [
  { id: 1, title: 'PPE Requirements', description: 'Hard hats and safety boots mandatory in all work areas', priority: 'high' },
  { id: 2, title: 'Site Access', description: 'Check in at security office before starting work', priority: 'medium' },
  { id: 3, title: 'Emergency Procedures', description: 'Assembly point is located at main car park', priority: 'high' },
  { id: 4, title: 'Permit Requirements', description: 'Hot work and confined space permits required', priority: 'medium' }
];

export default function ContractorHomeDashboard() {
  const { user } = useUser();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'valid': return 'text-success';
      case 'expiring': return 'text-warning';
      case 'expired': return 'text-error';
      case 'pending': return 'text-info';
      default: return 'text-base-content';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'valid': return 'badge-success';
      case 'expiring': return 'badge-warning';
      case 'expired': return 'badge-error';
      case 'pending': return 'badge-info';
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
      {/* Contractor Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Contractor Portal</h1>
            <p className="text-base-content/70 mt-2">
              Welcome, {user?.firstName}! {user?.tenantName} Contractor Access
            </p>
          </div>
          <div className="flex gap-2">
            <div className={`badge ${mockContractorData.status.contractStatus === 'Active' ? 'badge-success' : 'badge-warning'}`}>
              {mockContractorData.status.contractStatus}
            </div>
            <div className="badge badge-outline">
              Compliance: {mockContractorData.status.complianceScore}%
            </div>
          </div>
        </div>
      </div>
      
      {/* Contractor Status KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-primary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="stat-title">Active Projects</div>
          <div className="stat-value text-2xl">{mockContractorData.status.activeProjects}</div>
          <div className="stat-desc">
            {mockContractorData.status.completedProjects} completed
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-success">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-title">Compliance Score</div>
          <div className="stat-value text-2xl">{mockContractorData.status.complianceScore}%</div>
          <div className="stat-desc">Excellent standing</div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-warning">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-title">Documents</div>
          <div className="stat-value text-2xl">{mockContractorData.status.totalDocuments}</div>
          <div className="stat-desc">
            {mockContractorData.status.expiringDocuments} expiring soon
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-figure text-info">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="stat-title">Contract Status</div>
          <div className="stat-value text-lg">{mockContractorData.status.contractStatus}</div>
          <div className="stat-desc">In good standing</div>
        </div>
      </div>
      
      {/* Main Contractor Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Projects */}
        <div className="lg:col-span-2 bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Current Projects
            </h2>
            <Link href="/contractors/projects" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          
          <div className="space-y-4">
            {mockContractorData.currentProjects.map((project) => (
              <div key={project.id} className="p-4 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <div className="text-sm text-base-content/70 flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {project.location}
                      </span>
                      <span>• Manager: {project.manager}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{project.progress}%</div>
                    <div className="text-xs text-base-content/60">Complete</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-base-content/70">
                    {project.startDate} → {project.endDate}
                  </div>
                </div>
                <div className="w-full bg-base-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      project.progress >= 75 ? 'bg-success' : 
                      project.progress >= 50 ? 'bg-info' : 
                      project.progress >= 25 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Reminders */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Safety Reminders
          </h3>
          
          <div className="space-y-3">
            {safetyReminders.map((reminder) => (
              <div key={reminder.id} className="p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{reminder.title}</h4>
                  <span className={`badge badge-xs ${getPriorityBadge(reminder.priority)}`}>
                    {reminder.priority}
                  </span>
                </div>
                <p className="text-xs text-base-content/70">{reminder.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-base-200 rounded-lg">
            <div className="text-sm text-base-content/70 flex items-start gap-2">
              <svg className="w-4 h-4 text-error flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span><strong>Important:</strong> All safety procedures must be followed at all times.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Required Documents & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Required Documents */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Required Documents
            </h3>
            <Link href="/documents/assigned" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          
          <div className="space-y-3">
            {requiredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center">
                    <svg className="w-5 h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{doc.name}</h4>
                    <div className="text-xs text-base-content/60">
                      {doc.expiry !== 'N/A' ? `Expires: ${doc.expiry}` : 'Pending upload'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge badge-xs ${getStatusBadge(doc.status)}`}>
                    {doc.status}
                  </span>
                  {doc.status === 'pending' && (
                    <button className="btn btn-primary btn-xs">Upload</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Recent Activity
            </h3>
            <Link href="/activity" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <p className="text-xs text-base-content/70 mt-1">{activity.description}</p>
                  <p className="text-xs text-base-content/50 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contractor Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/projects/current" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="font-semibold text-sm">My Projects</span>
        </Link>
        
        <Link href="/documents/upload" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Upload Docs</span>
        </Link>
        
        <Link href="/permits/request" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Request Permit</span>
        </Link>
        
        <Link href="/compliance/status" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Compliance</span>
        </Link>
        
        <Link href="/incidents/form" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Report Issue</span>
        </Link>
        
        <Link href="/support" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Get Support</span>
        </Link>
      </div>
    </div>
  );
}