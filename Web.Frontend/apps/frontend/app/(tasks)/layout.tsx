"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import "../globals.css";
import Link from "next/link";
import Sidebar from "../(main)/components/Sidebar";
import Breadcrumb from "../../components/Breadcrumb";
import DynamicNavigation from "../../components/navigation/DynamicNavigation";
import MobileNavigation from "../../components/navigation/MobileNavigation";
import { PermissionLink } from "../../components/permissions";
import { UserProvider } from "../../contexts/UserContext";
import { PermissionProvider } from "../../contexts/PermissionContext";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import { useAuth } from "../../lib/auth/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Custom Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: (error: Error) => ReactNode },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Tasks module error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error!);
    }
    return this.props.children;
  }
}

// Error Fallback Component
function TasksErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-error text-error-content max-w-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Tasks Module Error</h2>
          <p>The tasks module has encountered an error.</p>
          <div className="collapse collapse-arrow bg-base-100 text-base-content mt-4">
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              View error details
            </div>
            <div className="collapse-content">
              <pre className="text-xs whitespace-pre-wrap">{error.message}</pre>
              <pre className="text-xs whitespace-pre-wrap mt-2">{error.stack}</pre>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Reload Page
            </button>
            <a href="/" className="btn btn-ghost">
              Return to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Module Disabled Component
function ModuleDisabled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-warning text-warning-content max-w-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Tasks Module Disabled</h2>
          <p>This module is temporarily disabled for maintenance.</p>
          <p className="text-sm mt-2">
            To re-enable, set NEXT_PUBLIC_ENABLE_TASKS=true in your .env.local file
          </p>
          <div className="card-actions justify-end mt-4">
            <a href="/" className="btn btn-primary">
              Return to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Layout Component
function TasksLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
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

  return (
    <>
      {/* Top navigation bar - same as main layout */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-gray-300 text-sm" style={{height: '32px'}}>
        <div className="flex items-center h-full px-6">
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
              <li><Link href="/admin/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Home</Link></li>
              <li><Link href="/admin/permissions" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Tenant Management</Link></li>
              <li><Link href="/admin/users" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Admin Users</Link></li>
            </ul>
          </details>

          {/* Modules Dropdown */}
          <details className="dropdown relative">
            <summary className="text-gray-300 hover:text-white cursor-pointer text-xs px-2 py-1 list-none">
              Modules
            </summary>
            <ul className="absolute top-full left-0 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><Link href="/checklists" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Checklists</Link></li>
              <li><Link href="/incidents" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Incidents</Link></li>
              <li><Link href="/assets" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Assets</Link></li>
              <li><Link href="/risk-assessments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Risk Assessments</Link></li>
              <li><Link href="/tasks" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Tasks</Link></li>
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
                <span className="text-xs text-gray-200">{getUserInitials()}</span>
              </div>
            </summary>
            <ul className="absolute top-full right-0 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li className="px-3 py-2 text-sm text-gray-600 border-b">{user?.email}</li>
              <li>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                  Sign Out
                </button>
              </li>
            </ul>
          </details>
        </div>
      </div>
      </div>

      {/* Main horizontal navigation bar with modules */}
      <nav className="fixed left-0 right-0 z-40 h-20 shadow-lg flex items-center justify-between" style={{ backgroundColor: '#f3f4f6', top: '32px' }}>
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
        <div className="lg:hidden flex items-center px-6">
          <MobileNavigation />
        </div>
        
        {/* Right side space for balance - Hidden on mobile */}
        <div className="hidden lg:block px-6" style={{ width: '180px' }}></div>
      </nav>


      {/* Main layout with sidebar */}
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-28 w-16 h-screen">
          <Sidebar />
        </div>

        {/* Main Content - with left margin for sidebar and top padding for fixed headers */}
        <main className="ml-16 w-full" style={{ paddingTop: '7rem' }}>
          {/* Breadcrumb - Part of content flow */}
          <div className="bg-white border-b border-gray-200 px-6 py-2">
            <div className="w-full max-w-[80%] lg:max-w-[85%] xl:max-w-[90%] mx-auto">
              <Breadcrumb />
            </div>
          </div>
          <div className="p-6 w-full max-w-[80%] lg:max-w-[85%] xl:max-w-[90%] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  // Check if module is disabled via environment variable
  if (process.env.NEXT_PUBLIC_ENABLE_TASKS === 'false') {
    return <ModuleDisabled />;
  }

  return (
    <ErrorBoundary fallback={(error) => <TasksErrorFallback error={error} />}>
      <ProtectedRoute>
        <UserProvider>
          <PermissionProvider>
            <TasksLayoutContent>
              {children}
            </TasksLayoutContent>
          </PermissionProvider>
        </UserProvider>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}