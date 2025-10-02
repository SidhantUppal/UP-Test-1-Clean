"use client";

import "../globals.css";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "@/components/Breadcrumb";
import DynamicNavigation from "@/components/navigation/DynamicNavigation";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PermissionProvider } from "@/contexts/PermissionContext";
import { UserProvider } from "@/contexts/UserContext";
import { PermissionLink } from "@/components/permissions";
import ProtectedRoute from "@/lib/auth/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/auth/contexts/AuthContext";

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, logoutEntra } = useAuth();
  
  const handleLogout = async () => {
    try {
      // Check how the user authenticated
      const authMethod = localStorage.getItem('auth-method') || 'password';
      
      if (authMethod === 'entra') {
        await logoutEntra('/login');
      } else {
        await logout();
        window.location.href = '/login';
      }
    } catch (_error) {
      try {
        await logout();
        window.location.href = '/login';
      } catch (_fallbackError) {
        window.location.href = '/login';
      }
    }
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Close all dropdowns when clicking outside
      if (!target.closest('.dropdown')) {
        document.querySelectorAll('details[open]').forEach(details => {
          details.removeAttribute('open');
        });
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Don't show main navigation in admin section or login page
  const isAdminRoute = pathname?.startsWith('/admin');
  const isLoginPage = pathname === '/login' || pathname?.startsWith('/login') || pathname?.includes('login');
  const isBuilderPage = pathname === '/build-process/builder';

  return (
    <UserProvider>
      <PermissionProvider>
        {/* Top bar with modules dropdown, search, and user profile - Hidden in admin and login */}
        {!isAdminRoute && !isLoginPage && (
          <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-gray-800 text-gray-300 text-sm flex items-center px-6">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-6">
              
              {/* System Admin Settings */}
              <details className="dropdown relative">
                <summary className="text-gray-300 hover:text-white cursor-pointer text-xs px-2 py-1 list-none flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </summary>
                <ul className="absolute top-full left-0 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li className="px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100 mb-1">System Administration</li>
              <li><PermissionLink permission="admin.dashboard.view" href="/admin/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Home</PermissionLink></li>
              <li><PermissionLink permission="admin.tenants.manage" href="/admin/permissions" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Tenant Management</PermissionLink></li>
              <li><PermissionLink permission="admin.users.manage" href="/admin/users" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Admin Users</PermissionLink></li>
              <li><PermissionLink permission="admin.trials.manage" href="/admin/trials" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Trial Management</PermissionLink></li>
              <li><PermissionLink permission="admin.partners.manage" href="/admin/partners" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Partner Portal</PermissionLink></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li><PermissionLink permission="admin.monitoring.view" href="/admin/monitoring" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">System Monitoring</PermissionLink></li>
              <li><PermissionLink permission="admin.billing.view" href="/admin/billing" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Billing & Revenue</PermissionLink></li>
              <li><PermissionLink permission="admin.support.access" href="/admin/support" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Support System</PermissionLink></li>
              <li><PermissionLink permission="admin.analytics.view" href="/admin/analytics" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">LORIS Analytics</PermissionLink></li>
              <li><PermissionLink permission="admin.config.manage" href="/admin/config" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Configuration</PermissionLink></li>
              <li><PermissionLink permission="admin.audit.access" href="/admin/audit" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Audit & Security</PermissionLink></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li className="px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100 mb-1">Developer Tools</li>
              <li><Link href="/dev" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Dev Engine - Permissions</Link></li>
            </ul>
              </details>

              {/* Modules Dropdown */}
              <details className="dropdown relative">
            <summary className="text-gray-300 hover:text-white cursor-pointer text-xs px-2 py-1 list-none">
              Modules
            </summary>
            <ul className="absolute top-full left-0 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="checklists.view" href="/checklists" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Checklists</PermissionLink></li>
              <li><PermissionLink permission="contractors.view" href="/contractors" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Contractors</PermissionLink></li>
              <li><PermissionLink permission="contractors.view" href="/contractors/view" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Contractor View</PermissionLink></li>
              <li><PermissionLink permission="employees.view" href="/employees" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Employees</PermissionLink></li>
              <li><PermissionLink permission="permits.view" href="/permits" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Permits</PermissionLink></li>
              <li><PermissionLink permission="risk-assessments.view" href="/risk-assessments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Risk Assessments</PermissionLink></li>
              <li><PermissionLink permission="tasks.view" href="/tasks" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Tasks</PermissionLink></li>
              <li><PermissionLink permission="processes.view" href="/processes" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Processes</PermissionLink></li>
              <li><PermissionLink permission="documents.view" href="/documents" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Documents</PermissionLink></li>
              <li><PermissionLink permission="assets.view" href="/assets" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Assets</PermissionLink></li>
              <li><PermissionLink permission="incidents.view" href="/incidents" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Incidents</PermissionLink></li>
              <li><PermissionLink permission="incidents.environmental.view" href="/incidents/environmental" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Environmental Management</PermissionLink></li>
              <li><PermissionLink permission="training.view" href="/training-records" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Training Records</PermissionLink></li>
              <li><PermissionLink permission="elearning.view" href="/e-learning" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">E-Learning</PermissionLink></li>
                </ul>
              </details>

              {/* Search Box */}
              <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-700 text-gray-300 text-xs rounded px-3 py-1 w-32 focus:outline-none focus:bg-gray-600 focus:w-40 transition-all duration-200" 
            />
            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
              </div>

              {/* User Profile */}
              <details className="dropdown relative">
                <summary className="text-gray-300 hover:text-white cursor-pointer flex items-center list-none">
                  <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-xs font-medium">{getUserInitials()}</span>
                  </div>
                </summary>
                <ul className="absolute top-full right-0 bg-white rounded-lg shadow-xl z-[100] w-40 p-2 mt-1 border border-gray-200">
              <li className="px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100 mb-1">{user?.fullName || user?.username || 'User'}</li>
              <li><Link href="/profile" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Profile</Link></li>
              <li><Link href="/settings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Settings</Link></li>
              <li><Link href="/settings/navigation" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Navigation</Link></li>
              <li><Link href="/permissions" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Permissions</Link></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li><button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Logout</button></li>
                </ul>
              </details>
            </div>
          </div>
        )}

      {/* Simple main nav - Fixed - Hidden in admin and login */}
      {!isAdminRoute && !isLoginPage && (
        <nav className="fixed top-8 left-0 right-0 z-40 h-20 shadow-lg flex items-center justify-between" style={{ backgroundColor: '#f3f4f6' }}>
        {/* Logo - Left Aligned */}
        <div className="flex items-center px-6">
          <div className="s-logo" style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
            <img
              src="https://t100riskmanager1.com/v6_3/Images/MaterialLayout/Logos/BSS_logo.svg"
              alt="BSS Logo"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(242, 242, 242, .7))',
                height: '95%',
                flex: 'auto'
              }}
            />
          </div>
        </div>

        {/* Desktop Navigation Items - Centered - Hidden on mobile */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <DynamicNavigation />
        </div>

        {/* Mobile Navigation - Only visible on small screens, Right Aligned */}
        <div className="lg:hidden px-6">
          <MobileNavigation />
        </div>

        {/* Desktop: Right side space for balance */}
        <div className="hidden lg:block px-6" style={{ width: 'auto', minWidth: '180px' }}></div>
        </nav>
      )}
      
      {/* Breadcrumb Navigation - Non-fixed, part of content flow */}
      
      {/* Sidebar - Hidden in admin, login, and mobile screens */}
      {!isAdminRoute && !isLoginPage && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}
      
      {/* Main Content - with top padding to account for fixed headers */}
      <main className={isAdminRoute || isLoginPage ? "min-h-screen bg-white" : "lg:ml-16 transition-all duration-300 min-h-screen bg-white"} style={!isAdminRoute && !isLoginPage ? { paddingTop: '7rem' } : {}}>
        {/* Breadcrumb - Part of content flow - Hidden on builder page */}
        {!isAdminRoute && !isLoginPage && !isBuilderPage && (
          <div className="bg-white border-b border-gray-200 px-6 py-2">
            <div className="w-full max-w-[80%] lg:max-w-[85%] xl:max-w-[90%] mx-auto">
              <Breadcrumb />
            </div>
          </div>
        )}
        <div className={isAdminRoute || isLoginPage ? "pt-8 px-6" : "px-6 w-full max-w-[80%] lg:max-w-[85%] xl:max-w-[90%] mx-auto bg-white"}>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </div>
      </main>
      </PermissionProvider>
    </UserProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainLayoutContent>
        {children}
      </MainLayoutContent>
    </div>
  );
}
