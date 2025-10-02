"use client";

import { useUser } from "@/contexts/UserContext";
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import ManagerHomeDashboard from "./ManagerHomeDashboard";
import OperatorHomeDashboard from "./OperatorHomeDashboard";
import EmployeeHomeDashboard from "./EmployeeHomeDashboard";
import ModernTenantDashboard from "./ModernTenantDashboard";

// Tenant-specific dashboard configuration
interface TenantDashboardConfig {
  tenantId: number;
  customRole: string;
  dashboardType: 'manager' | 'operator' | 'employee' | 'custom';
  customizations?: {
    hideModules?: string[];
    customKPIs?: any[];
    customActions?: any[];
  };
}

// Mock tenant customizations
const tenantCustomizations: Record<string, TenantDashboardConfig> = {
  'Quality Inspector': {
    tenantId: 1,
    customRole: 'Quality Inspector',
    dashboardType: 'custom',
    customizations: {
      hideModules: ['contractors', 'permits'],
      customKPIs: [
        { title: 'Quality Score', value: '98%', subtitle: 'Above target' },
        { title: 'Inspections Today', value: '12', subtitle: '3 pending' }
      ],
      customActions: ['Quality Audit', 'Inspection Report', 'Non-Conformance']
    }
  },
  'Site Supervisor': {
    tenantId: 1,
    customRole: 'Site Supervisor',
    dashboardType: 'manager'
  },
  'Safety Officer': {
    tenantId: 1,
    customRole: 'Safety Officer',
    dashboardType: 'operator'
  }
};

export default function TenantCustomDashboard() {
  const { user } = useUser();
  const { user: authUser } = useAuth();

  // Check if user prefers modern dashboard (can be based on user settings, role, or feature flag)
  const useModernDashboard = () => {
    // For now, enable modern dashboard for all users
    // You can add logic here to check user preferences, feature flags, or specific roles
    return true;
  };

  // If modern dashboard is enabled, use the new customizable version
  if (useModernDashboard()) {
    return <ModernTenantDashboard />;
  }

  // Legacy dashboard routing below
  if (!user || !user.customRole) {
    return <ManagerHomeDashboard />;
  }

  const customConfig = tenantCustomizations[user.customRole];
  
  if (!customConfig) {
    return <ManagerHomeDashboard />;
  }

  switch (customConfig.dashboardType) {
    case 'manager':
      return <ManagerHomeDashboard />;
    case 'operator':
      return <OperatorHomeDashboard />;
    case 'employee':
      return <EmployeeHomeDashboard />;
    case 'custom':
      return <CustomRoleDashboard config={customConfig} />;
    default:
      return <ManagerHomeDashboard />;
  }
}

// Custom dashboard component for tenant-specific roles
function CustomRoleDashboard({ config }: { config: TenantDashboardConfig }) {
  const { user } = useUser();

  return (
    <div className="w-full">
      {/* Custom Role Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-base-content">{config.customRole} Home</h1>
            <p className="text-base-content/70 mt-2">
              Welcome, {user?.firstName}! {user?.tenantName} - Custom Role Access
            </p>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-primary">Custom Role</div>
            <div className="badge badge-outline">{config.customRole}</div>
          </div>
        </div>
      </div>

      {/* Custom KPIs */}
      {config.customizations?.customKPIs && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {config.customizations.customKPIs.map((kpi, index) => (
            <div key={index} className="stat bg-gradient-to-r from-primary to-primary/80 text-primary-content rounded-lg shadow-lg">
              <div className="stat-title text-primary-content/80">{kpi.title}</div>
              <div className="stat-value text-2xl">{kpi.value}</div>
              <div className="stat-desc text-primary-content/70">{kpi.subtitle}</div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Role Content */}
      <div className="bg-base-100 rounded-lg shadow-lg p-6 border border-base-300 mb-8">
        <h2 className="text-xl font-bold text-base-content mb-4">
          🎯 {config.customRole} Workspace
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-base-200 rounded-lg">
            <h3 className="font-semibold mb-2">Role Overview</h3>
            <p className="text-sm text-base-content/70">
              This dashboard has been customized for the {config.customRole} role 
              in {user?.tenantName}. Access and functionality are tailored to your 
              specific responsibilities.
            </p>
          </div>
          
          <div className="p-4 bg-base-200 rounded-lg">
            <h3 className="font-semibold mb-2">Custom Features</h3>
            <ul className="text-sm text-base-content/70 space-y-1">
              <li>• Role-specific KPI tracking</li>
              <li>• Customized action menu</li>
              <li>• Filtered module access</li>
              <li>• Tenant-specific workflows</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Custom Actions */}
      {config.customizations?.customActions && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-base-content mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {config.customizations.customActions.map((action, index) => (
              <button key={index} className="btn btn-outline h-auto p-4 flex-col">
                <span className="text-2xl mb-2">⚡</span>
                <span className="font-semibold text-sm">{action}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Configuration Info */}
      <div className="bg-info/10 border border-info/20 rounded-lg p-4">
        <div className="text-sm text-info-content">
          <strong>Note:</strong> This dashboard configuration is managed by your organization administrator. 
          Contact support if you need access to additional features or modules.
        </div>
      </div>
    </div>
  );
}