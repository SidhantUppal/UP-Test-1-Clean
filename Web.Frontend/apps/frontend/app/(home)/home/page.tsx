"use client";

import { useAuth } from '../../../lib/auth/contexts/AuthContext';
import { PermissionDebugger } from "@/components/permissions";
import { useState } from "react";

// Role-specific dashboard components
import AdminHomeDashboard from "@/components/dashboards/AdminHomeDashboard";
import ManagerHomeDashboard from "@/components/dashboards/ManagerHomeDashboard";
import ReadOnlyHomeDashboard from "@/components/dashboards/ReadOnlyHomeDashboard";
import OperatorHomeDashboard from "@/components/dashboards/OperatorHomeDashboard";
import EmployeeHomeDashboard from "@/components/dashboards/EmployeeHomeDashboard";
import ContractorHomeDashboard from "@/components/dashboards/ContractorHomeDashboard";
import TenantCustomDashboard from "@/components/dashboards/TenantCustomDashboard";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const [selectedDashboard, setSelectedDashboard] = useState('my-dashboard');
  
  // Map AuthContext user roles to dashboard types (roles come as strings from JWT)
  const getUserRole = () => {
    if (!user?.roles || user.roles.length === 0) return 'employee';
    
    // Check for specific roles (case-insensitive)
    const roles = user.roles.map(r => r.toLowerCase());
    
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('manager')) return 'manager';
    if (roles.includes('contractor')) return 'contractor';
    if (roles.includes('operator')) return 'operator';
    if (roles.includes('readonly') || roles.includes('read-only')) return 'read-only';
    if (roles.includes('tenant_custom') || roles.includes('tenant-custom')) return 'tenant-custom';
    
    return 'employee'; // Default
  };
  
  const role = getUserRole();

  // Dashboard options
  const dashboardOptions = [
    { value: 'my-dashboard', label: 'My Dashboard', href: '/reporting-centre/dashboard' },
    { value: 'checklists', label: 'Checklists Dashboard', href: '/checklists/dashboard' },
    { value: 'incidents', label: 'Incidents Dashboard', href: '/incidents/dashboard' },
    { value: 'tasks', label: 'Tasks Dashboard', href: '/tasks/dashboard' },
  ];

  const handleDashboardSelect = () => {
    const selectedOption = dashboardOptions.find(option => option.value === selectedDashboard);
    if (selectedOption) {
      window.location.href = selectedOption.href;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-lg">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  // No user state
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <span>Unable to load user information. Please try refreshing the page.</span>
        </div>
      </div>
    );
  }

  // Role-based dashboard rendering - now defaults to modern dashboard
  const renderDashboard = () => {
    // For now, always use the modern customizable dashboard
    // You can add logic here to switch back to role-specific dashboards if needed
    return <TenantCustomDashboard />;
    
    // Legacy role-based routing (commented out for now)
    /*
    switch (role) {
      case 'admin':
        return <AdminHomeDashboard />;
      case 'manager':
        return <ManagerHomeDashboard />;
      case 'read-only':
        return <ReadOnlyHomeDashboard />;
      case 'operator':
        return <OperatorHomeDashboard />;
      case 'employee':
        return <EmployeeHomeDashboard />;
      case 'contractor':
        return <ContractorHomeDashboard />;
      case 'tenant-custom':
        return <TenantCustomDashboard />;
      default:
        return <TenantCustomDashboard />;
    }
    */
  };

  return (
    <div>
      {renderDashboard()}
      
      {/* Development Debug Components */}
      {process.env.NODE_ENV === 'development' && (
        <div className="max-w-7xl mx-auto mt-8 space-y-4 px-8">
          {/* User debugger temporarily disabled - using new AuthContext */}
          {/* <UserDebugger /> */}
          <PermissionDebugger />
          
          {/* Simple auth debug info */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold">Auth Debug</h3>
            <p>User: {user.fullName} ({user.email})</p>
            <p>Roles: {user.roles.join(', ')}</p>
            <p>Computed Role: {role}</p>
          </div>
        </div>
      )}
    </div>
  );
}