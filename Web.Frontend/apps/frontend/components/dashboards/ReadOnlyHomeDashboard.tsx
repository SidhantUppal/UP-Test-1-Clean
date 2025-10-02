"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

// Mock read-only dashboard data
const mockReadOnlyData = {
  overview: {
    totalIncidents: 45,
    openCases: 8,
    completedAudits: 23,
    complianceRate: 96,
    safetyScore: 94,
    lastUpdated: new Date().toLocaleString()
  },
  trends: {
    incidentsTrend: -12, // percentage change
    complianceTrend: 3,
    safetyTrend: 2,
    period: 'vs last month'
  }
};

const recentReports = [
  { id: 1, title: 'Monthly Safety Report', type: 'safety', date: '2024-07-28', status: 'published', author: 'Safety Manager' },
  { id: 2, title: 'Compliance Audit Results', type: 'compliance', date: '2024-07-25', status: 'published', author: 'Quality Team' },
  { id: 3, title: 'Incident Analysis Q2', type: 'incident', date: '2024-07-20', status: 'published', author: 'Operations Manager' },
  { id: 4, title: 'Training Completion Report', type: 'training', date: '2024-07-18', status: 'published', author: 'HR Department' }
];

const keyMetrics = [
  { label: 'Days Without Incident', value: '45', change: '+3', positive: true },
  { label: 'Open Safety Actions', value: '12', change: '-5', positive: true },
  { label: 'Training Compliance', value: '87%', change: '+2%', positive: true },
  { label: 'Audit Score', value: '96%', change: '+1%', positive: true },
  { label: 'Near Miss Reports', value: '8', change: '+2', positive: false },
  { label: 'Contractor Compliance', value: '94%', change: '0%', positive: true }
];

const departmentSummary = [
  { department: 'Production', incidents: 2, compliance: 98, training: 85, score: 94 },
  { department: 'Maintenance', incidents: 1, compliance: 96, training: 92, score: 96 },
  { department: 'Quality', incidents: 0, compliance: 100, training: 95, score: 98 },
  { department: 'Administration', incidents: 0, compliance: 100, training: 88, score: 96 }
];

const chartData = [
  { month: 'Jan', incidents: 3, compliance: 94, safety: 92 },
  { month: 'Feb', incidents: 2, compliance: 95, safety: 94 },
  { month: 'Mar', incidents: 4, compliance: 93, safety: 91 },
  { month: 'Apr', incidents: 1, compliance: 97, safety: 95 },
  { month: 'May', incidents: 2, compliance: 96, safety: 94 },
  { month: 'Jun', incidents: 1, compliance: 98, safety: 96 },
  { month: 'Jul', incidents: 2, compliance: 96, safety: 94 }
];

export default function ReadOnlyHomeDashboard() {
  const { user } = useUser();

  const getReportIcon = (type: string) => {
    switch(type) {
      case 'safety': return '';
      case 'compliance': return '';
      case 'incident': return '';
      case 'training': return '';
      default: return '';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-success';
    if (score >= 85) return 'text-warning';
    return 'text-error';
  };

  const getTrendColor = (change: string, positive: boolean) => {
    if (change === '0%' || change === '0') return 'text-base-content';
    return positive ? 'text-success' : 'text-error';
  };

  return (
    <div className="w-full">
      {/* Read-Only Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Reports & Analytics</h1>
            <p className="text-base-content/70 mt-2">
              Welcome, {user?.firstName}! View-only access to {user?.tenantName} data
            </p>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-info">Read Only Access</div>
            <div className="badge badge-outline">
              Updated: {mockReadOnlyData.overview.lastUpdated}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overview KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Safety Score</div>
          <div className="stat-value text-2xl">{mockReadOnlyData.overview.safetyScore}%</div>
          <div className="stat-desc">
            {mockReadOnlyData.trends.safetyTrend > 0 ? '+' : ''}{mockReadOnlyData.trends.safetyTrend}% {mockReadOnlyData.trends.period}
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Compliance Rate</div>
          <div className="stat-value text-2xl">{mockReadOnlyData.overview.complianceRate}%</div>
          <div className="stat-desc">
            {mockReadOnlyData.trends.complianceTrend > 0 ? '+' : ''}{mockReadOnlyData.trends.complianceTrend}% {mockReadOnlyData.trends.period}
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Total Incidents</div>
          <div className="stat-value text-2xl">{mockReadOnlyData.overview.totalIncidents}</div>
          <div className="stat-desc">
            {mockReadOnlyData.overview.openCases} open cases
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Audits Complete</div>
          <div className="stat-value text-2xl">{mockReadOnlyData.overview.completedAudits}</div>
          <div className="stat-desc">This quarter</div>
        </div>
      </div>
      
      {/* Main Read-Only Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Key Metrics */}
        <div className="lg:col-span-2 bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Key Performance Indicators
            </h2>
            <Link href="/admin/analytics" className="btn btn-ghost btn-sm">Detailed View</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-base-content">{metric.value}</div>
                  <div className="text-sm text-base-content/70 mb-2">{metric.label}</div>
                  <div className={`text-xs font-semibold ${getTrendColor(metric.change, metric.positive)}`}>
                    {metric.change} vs last period
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Summary */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Department Overview
          </h3>
          
          <div className="space-y-3">
            {departmentSummary.map((dept, index) => (
              <div key={index} className="p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{dept.department}</h4>
                  <span className={`text-sm font-semibold ${getComplianceColor(dept.score)}`}>
                    {dept.score}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-semibold">{dept.incidents}</div>
                    <div className="text-base-content/60">Incidents</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{dept.compliance}%</div>
                    <div className="text-base-content/60">Compliance</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{dept.training}%</div>
                    <div className="text-base-content/60">Training</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Trend Analysis (Last 7 Months)
          </h2>
          <div className="flex gap-2">
            <div className="badge badge-success">Safety</div>
            <div className="badge badge-info">Compliance</div>
            <div className="badge badge-warning">Incidents</div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 items-end h-40">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex flex-col gap-1 items-center mb-2">
                <div 
                  className="w-4 bg-success rounded-t"
                  style={{ height: `${data.safety}px` }}
                  title={`Safety: ${data.safety}%`}
                ></div>
                <div 
                  className="w-4 bg-info rounded"
                  style={{ height: `${data.compliance}px` }}
                  title={`Compliance: ${data.compliance}%`}
                ></div>
                <div 
                  className="w-4 bg-warning rounded-b"
                  style={{ height: `${data.incidents * 20}px` }}
                  title={`Incidents: ${data.incidents}`}
                ></div>
              </div>
              <div className="text-xs font-medium">{data.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Recent Reports
          </h2>
          <Link href="/admin/reports" className="btn btn-ghost btn-sm">View All Reports</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center gap-4 p-4 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{report.title}</h3>
                <div className="text-sm text-base-content/70">
                  By {report.author} • {report.date}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-success badge-sm">{report.status}</span>
                <Link href={`/reports/${report.id}`} className="btn btn-outline btn-xs">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read-Only Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/admin/reports" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">All Reports</span>
        </Link>
        
        <Link href="/admin/analytics" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Analytics</span>
        </Link>
        
        <Link href="/incidents" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Incidents</span>
        </Link>
        
        <Link href="/admin/audit" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Audit Logs</span>
        </Link>
        
        <Link href="/documents" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Documents</span>
        </Link>
        
        <Link href="/export" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <div className="w-12 h-12 rounded-lg bg-base-200 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-all duration-200">
            <svg className="w-6 h-6 text-base-content/70 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">Export Data</span>
        </Link>
      </div>
    </div>
  );
}