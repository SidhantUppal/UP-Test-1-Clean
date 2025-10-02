"use client";

import React, { useState } from 'react';
import { useUser } from "@/contexts/UserContext";
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import ModernDashboardCustomizer from '@/components/dashboard/ModernDashboardCustomizer';
import ChecklistsDashboardCustomizer from '@/components/dashboard/ChecklistsDashboardCustomizer';
import IncidentsDashboardCustomizer from '@/components/dashboard/IncidentsDashboardCustomizer';
import TasksDashboardCustomizer from '@/components/dashboard/TasksDashboardCustomizer';

export default function ModernTenantDashboard() {
  const { user } = useUser();
  const { user: authUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('my-dashboard');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  React.useEffect(() => {
    // Trigger page load animation
    setTimeout(() => setIsPageLoaded(true), 100);
  }, []);

  // Get user role for dashboard customization
  const getUserRole = () => {
    if (!authUser?.roles || authUser.roles.length === 0) return 'employee';
    
    const roles = authUser.roles.map(r => r.toLowerCase());
    
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('manager')) return 'manager';
    if (roles.includes('contractor')) return 'contractor';
    if (roles.includes('operator')) return 'operator';
    if (roles.includes('readonly') || roles.includes('read-only')) return 'read-only';
    
    return 'employee';
  };

  // Determine available modules based on user permissions
  const getAvailableModules = () => {
    const baseModules = ['core'];
    const userRole = getUserRole();
    
    // Add modules based on role
    switch (userRole) {
      case 'admin':
        return [...baseModules, 'incidents', 'checklists', 'tasks', 'risk-assessments', 'permits', 'training', 'documents', 'compliance', 'audit'];
      case 'manager':
        return [...baseModules, 'incidents', 'checklists', 'tasks', 'risk-assessments', 'permits', 'training', 'documents', 'compliance'];
      case 'operator':
        return [...baseModules, 'incidents', 'checklists', 'tasks', 'risk-assessments', 'permits'];
      case 'contractor':
        return [...baseModules, 'incidents', 'checklists', 'permits', 'training'];
      default:
        return [...baseModules, 'incidents', 'checklists', 'tasks'];
    }
  };

  const role = getUserRole();
  const availableModules = getAvailableModules();

  // Dashboard options
  const dashboardOptions = [
    { value: 'my-dashboard', label: 'My Dashboard' },
    { value: 'checklists', label: 'Checklists Dashboard' },
    { value: 'incidents', label: 'Incidents Dashboard' },
    { value: 'tasks', label: 'Tasks Dashboard' },
  ];


  // Render the selected dashboard component
  const renderSelectedDashboard = () => {
    switch (selectedDashboard) {
      case 'checklists':
        return (
          <ChecklistsDashboardCustomizer 
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
          />
        );
      case 'incidents':
        return (
          <IncidentsDashboardCustomizer 
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
          />
        );
      case 'tasks':
        return (
          <TasksDashboardCustomizer 
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
          />
        );
      case 'my-dashboard':
      default:
        return (
          <ModernDashboardCustomizer 
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            userRole={role}
            availableModules={availableModules}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* T100 Standard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>
                Welcome back, {authUser?.fullName || user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.tenantName && `${user.tenantName}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
            </div>
          </div>
        </div>
      </div>

      {/* T100 Standard Content Container */}
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Dashboard Selection Dropdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label htmlFor="dashboard-select" className="text-sm font-medium text-gray-700">
                Select Dashboard:
              </label>
              <select
                id="dashboard-select"
                value={selectedDashboard}
                onChange={(e) => setSelectedDashboard(e.target.value)}
                className="block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {dashboardOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-gray-500">
              Quick access to different dashboards
            </div>
          </div>
        </div>

        {renderSelectedDashboard()}
      </div>

      {/* Footer Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Debug Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <strong>User:</strong> {authUser?.fullName} ({authUser?.email})
              </div>
              <div>
                <strong>Role:</strong> {role} ({authUser?.roles?.join(', ')})
              </div>
              <div>
                <strong>Available Modules:</strong> {availableModules.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}