"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

// Mock system metrics for admin dashboard
const mockSystemMetrics = {
  platform: {
    totalTenants: 247,
    activeTenants: 203,
    trialTenants: 44,
    totalUsers: 3248,
    systemUptime: 99.97,
    apiCalls24h: 12450000,
    errorRate: 0.03,
    avgResponseTime: 185
  },
  financial: {
    monthlyRevenue: 89750,
    annualRevenue: 980500,
    trialConversions: 73,
    churnRate: 2.1
  },
  support: {
    openTickets: 23,
    avgResponseTime: 4.2,
    satisfactionScore: 4.7
  },
  infrastructure: {
    storageUsed: 1847,
    totalStorage: 5000,
    bandwidthUsed: 2.3,
    dbConnections: 142
  }
};

const recentSystemActivity = [
  { id: 1, type: 'tenant', title: 'New Enterprise Signup', description: 'BuildCorp Ltd started 14-day trial', time: '8 min ago', priority: 'high' },
  { id: 2, type: 'system', title: 'High API Usage Alert', description: 'MegaBuilds Inc exceeded 95% quota', time: '12 min ago', priority: 'warning' },
  { id: 3, type: 'support', title: 'Priority Support Ticket', description: 'Authentication issue reported', time: '18 min ago', priority: 'high' },
  { id: 4, type: 'billing', title: 'Payment Processed', description: 'Smart Buildings Co - $1,250/month', time: '32 min ago', priority: 'low' },
  { id: 5, type: 'system', title: 'Service Deployment', description: 'Documents service v2.1.3 deployed', time: '1 hour ago', priority: 'low' }
];

const serviceHealthStatus = [
  { service: 'API Gateway', status: 'healthy', uptime: 99.99, responseTime: 45 },
  { service: 'Auth Service', status: 'healthy', uptime: 99.95, responseTime: 78 },
  { service: 'Documents Service', status: 'warning', uptime: 99.85, responseTime: 245 },
  { service: 'Process Service', status: 'healthy', uptime: 99.98, responseTime: 92 },
  { service: 'Database Cluster', status: 'healthy', uptime: 99.99, responseTime: 12 }
];

export default function AdminHomeDashboard() {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-base-content';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge-error';
      case 'warning': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="w-full">
      {/* Admin Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">System Administration</h1>
            <p className="text-sm sm:text-base text-base-content/70 mt-2">
              Welcome back, {user?.firstName}! <span className="hidden sm:inline">Platform overview updated {currentTime.toLocaleTimeString()}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="badge badge-success text-xs sm:text-sm">System Healthy</div>
            <div className="badge badge-outline text-xs sm:text-sm">
              {formatNumber(mockSystemMetrics.platform.totalTenants)} Tenants
            </div>
            <Link href="/admin/dashboard" className="btn btn-primary btn-sm text-xs sm:text-sm">
              Full Admin Home
            </Link>
          </div>
        </div>
      </div>

      {/* System Metrics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Active Tenants</div>
          <div className="stat-value text-3xl">{formatNumber(mockSystemMetrics.platform.activeTenants)}</div>
          <div className="stat-desc">
            +{mockSystemMetrics.platform.trialTenants} trials
          </div>
        </div>

        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Monthly Revenue</div>
          <div className="stat-value text-3xl">{formatCurrency(mockSystemMetrics.financial.monthlyRevenue)}</div>
          <div className="stat-desc">
            {mockSystemMetrics.financial.trialConversions}% conversion rate
          </div>
        </div>

        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">System Uptime</div>
          <div className="stat-value text-3xl">{mockSystemMetrics.platform.systemUptime}%</div>
          <div className="stat-desc">
            {mockSystemMetrics.platform.avgResponseTime}ms avg response
          </div>
        </div>

        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">API Calls (24h)</div>
          <div className="stat-value text-3xl">{(mockSystemMetrics.platform.apiCalls24h / 1000000).toFixed(1)}M</div>
          <div className="stat-desc">
            {mockSystemMetrics.platform.errorRate}% error rate
          </div>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Service Health Monitor */}
        <div className="lg:col-span-2 bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-base-content">
              Service Health
            </h2>
            <div className="badge badge-success">All Systems Operational</div>
          </div>
          
          <div className="space-y-3">
            {serviceHealthStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'healthy' ? 'bg-success' : 
                    service.status === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <div>
                    <div className="font-medium">{service.service}</div>
                    <div className="text-sm opacity-70">Last check: 30s ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono">{service.uptime}% uptime</div>
                  <div className="text-sm opacity-70">{service.responseTime}ms</div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/admin/monitoring" className="btn btn-outline btn-sm w-full mt-4">
            View Detailed Monitoring
          </Link>
        </div>

        {/* Recent System Activity */}
        <div className="bg-base-100 rounded-lg border-2 border-base-300 p-6 hover:shadow-lg transition-all duration-200">
          <h3 className="text-lg font-bold text-base-content mb-4">
            System Activity
          </h3>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentSystemActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-base-100 border border-base-300 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{activity.title}</h4>
                    <span className={`badge badge-sm ${getPriorityBadge(activity.priority)}`}>
                      {activity.priority}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70 mt-1">{activity.description}</p>
                  <p className="text-xs text-base-content/50 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/admin/audit" className="btn btn-outline btn-sm w-full mt-4">
            View Full Audit Log
          </Link>
        </div>
      </div>

      {/* Admin Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/users" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <span className="font-semibold text-sm">Manage Users</span>
          <span className="text-xs text-base-content/60 mt-1">{formatNumber(mockSystemMetrics.platform.totalUsers)} total</span>
        </Link>
        
        <Link href="/admin/billing" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <span className="font-semibold text-sm">Billing</span>
          <span className="text-xs text-base-content/60 mt-1">{formatCurrency(mockSystemMetrics.financial.monthlyRevenue)}/mo</span>
        </Link>
        
        <Link href="/admin/support" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <span className="font-semibold text-sm">Support Queue</span>
          <span className="text-xs text-base-content/60 mt-1">{mockSystemMetrics.support.openTickets} open</span>
        </Link>
        
        <Link href="/admin/analytics" className="group relative p-6 rounded-lg border-2 border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-base-100">
          <span className="font-semibold text-sm">Analytics</span>
          <span className="text-xs text-base-content/60 mt-1">Platform insights</span>
        </Link>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Storage Usage</div>
          <div className="stat-value text-warning">{formatNumber(mockSystemMetrics.infrastructure.storageUsed)} GB</div>
          <div className="stat-desc">of {formatNumber(mockSystemMetrics.infrastructure.totalStorage)} GB total</div>
          <div className="w-full bg-base-200 rounded-full h-2 mt-3">
            <div 
              className="h-2 rounded-full bg-warning transition-all duration-300"
              style={{ width: `${(mockSystemMetrics.infrastructure.storageUsed / mockSystemMetrics.infrastructure.totalStorage) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Support Satisfaction</div>
          <div className="stat-value text-success">{mockSystemMetrics.support.satisfactionScore}/5</div>
          <div className="stat-desc">{mockSystemMetrics.support.avgResponseTime}h avg response</div>
          <div className="flex gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className={`w-5 h-5 ${star <= Math.floor(mockSystemMetrics.support.satisfactionScore) ? 'text-warning fill-warning' : 'text-base-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-lg border-2 border-base-300 hover:shadow-lg transition-all duration-200">
          <div className="stat-title">Database Health</div>
          <div className="stat-value text-info">{mockSystemMetrics.infrastructure.dbConnections}</div>
          <div className="stat-desc">active connections</div>
          <div className="badge badge-success mt-3">Optimal</div>
        </div>
      </div>
    </div>
  );
}