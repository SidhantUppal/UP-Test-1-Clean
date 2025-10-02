"use client";

import "../globals.css";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PermissionProvider } from "../../contexts/PermissionContext";
import { UserProvider } from "../../contexts/UserContext";
import { PermissionLink } from "../../components/permissions";
import { DROPDOWN_CLOSE_DELAY } from "../../config/ui-settings";

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    // Store timeout IDs for each dropdown
    const dropdownTimeouts = new Map<Element, NodeJS.Timeout>();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Close all dropdowns when clicking outside
      if (!target.closest('.dropdown')) {
        document.querySelectorAll('details[open]').forEach(details => {
          details.removeAttribute('open');
        });
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const details = event.currentTarget as HTMLDetailsElement;
      if (details && details.open) {
        // IMPORTANT: This delay is user-configured in config/ui-settings.ts
        // DO NOT change this value directly - modify UI_TIMINGS instead
        const timeoutId = setTimeout(() => {
          details.open = false;
          dropdownTimeouts.delete(details);
        }, DROPDOWN_CLOSE_DELAY); // User-configured delay - DO NOT MODIFY
        
        dropdownTimeouts.set(details, timeoutId);
      }
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const details = event.currentTarget as HTMLDetailsElement;
      // Cancel any pending close timeout
      const timeoutId = dropdownTimeouts.get(details);
      if (timeoutId) {
        clearTimeout(timeoutId);
        dropdownTimeouts.delete(details);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    // Add mouse leave/enter handlers to all dropdowns (with a delay to find new ones)
    const addMouseHandlers = () => {
      document.querySelectorAll('details.dropdown').forEach(details => {
        details.removeEventListener('mouseleave', handleMouseLeave);
        details.removeEventListener('mouseenter', handleMouseEnter);
        details.addEventListener('mouseleave', handleMouseLeave);
        details.addEventListener('mouseenter', handleMouseEnter);
      });
    };
    
    addMouseHandlers();
    // Re-check for new dropdowns after a short delay (for dynamically added ones)
    setTimeout(addMouseHandlers, 100);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.querySelectorAll('details.dropdown').forEach(details => {
        details.removeEventListener('mouseleave', handleMouseLeave);
        details.removeEventListener('mouseenter', handleMouseEnter);
      });
      // Clear any pending timeouts
      dropdownTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Don't show main navigation in admin section
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <UserProvider>
      <PermissionProvider>
        {/* Top bar with modules dropdown, search, and user profile - Hidden in admin */}
        {!isAdminRoute && (
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
                    <span className="text-xs font-medium">JD</span>
                  </div>
                </summary>
                <ul className="absolute top-full right-0 bg-white rounded-lg shadow-xl z-[100] w-40 p-2 mt-1 border border-gray-200">
              <li className="px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100 mb-1">John Doe</li>
              <li><Link href="/profile" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Profile</Link></li>
              <li><Link href="/settings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Settings</Link></li>
              <li><Link href="/permissions" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Permissions</Link></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li><Link href="/logout" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Logout</Link></li>
                </ul>
              </details>
            </div>
          </div>
        )}

      {/* Simple main nav - Fixed - Hidden in admin */}
      {!isAdminRoute && (
        <nav className="fixed top-8 left-0 right-0 z-40 h-20 shadow-lg flex items-center" style={{ backgroundColor: '#f3f4f6' }}>
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
        {/* Navigation Items - Centered */}
        <div className="flex-1 flex items-center justify-center space-x-8">
          {/* Home */}
          <PermissionLink permission="dashboard.view" href="/" className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-700">Home</span>
          </PermissionLink>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Checklists */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Checklists</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="checklists.view" href="/checklists" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Checklists Home</PermissionLink></li>
              <li className="border-t border-gray-200 my-1"></li>
              <li><PermissionLink permission="checklists.create" href="/checklists/create" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Create Checklist</PermissionLink></li>
              <li><PermissionLink permission="checklists.view" href="/checklists/my" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">My Checklists</PermissionLink></li>
              <li><PermissionLink permission="checklists.manage" href="/checklists/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Checklists</PermissionLink></li>
              <li><PermissionLink permission="checklists.assign" href="/checklists/assign" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Assign Checklists</PermissionLink></li>
              <li><PermissionLink permission="checklists.reports" href="/checklists/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Reports</PermissionLink></li>
              <li><PermissionLink permission="checklists.view" href="/checklists/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Home</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Contractors */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7H17c-.8 0-1.5.7-1.5 1.5v6c0 1.1.9 2 2 2h2V22h-1zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.67 11 11s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Contractors</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="contractors.view" href="/contractors" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Contractors Home</PermissionLink></li>
              <li><PermissionLink permission="contractors.manage" href="/contractors/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Contractors</PermissionLink></li>
              <li><PermissionLink permission="contractors.create" href="/contractors/new" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Add Contractor</PermissionLink></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li><PermissionLink permission="contractors.compliance" href="/contractors/compliance" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Contractor Compliance</PermissionLink></li>
              <li><PermissionLink permission="contractors.compliance" href="/contractors/compliance?tab=builder" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Create Compliance Check</PermissionLink></li>
              <li><PermissionLink permission="contractors.compliance" href="/contractors/compliance?tab=active" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Current Compliance Checks</PermissionLink></li>
              <li><PermissionLink permission="contractors.compliance" href="/contractors/compliance?tab=templates" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Compliance Templates</PermissionLink></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li><PermissionLink permission="permits.view" href="/contractors/permits-to-work" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Permits to Work</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Documents */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Documents</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-52 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="documents.view" href="/documents" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Document Home</PermissionLink></li>
              <li><PermissionLink permission="documents.view" href="/documents/home" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">All Documents</PermissionLink></li>
              <li><PermissionLink permission="documents.assign" href="/documents/assign" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Assign Documents</PermissionLink></li>
              <li><PermissionLink permission="documents.view" href="/documents/renewable" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Renewable Docs</PermissionLink></li>
              <li><PermissionLink permission="documents.redact" href="/documents/redactor" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Redactor</PermissionLink></li>
              <li><PermissionLink permission="documents.view" href="/documents/templates" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Templates</PermissionLink></li>
              <li><PermissionLink permission="documents.create" href="/documents/create-template" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Create Template</PermissionLink></li>
              <li><PermissionLink permission="documents.analytics" href="/documents/analytics" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Analytics</PermissionLink></li>
              <li><PermissionLink permission="documents.search" href="/documents/search" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Advanced Search</PermissionLink></li>
              <li><PermissionLink permission="documents.workflows" href="/documents/workflows" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Workflows</PermissionLink></li>
              <li><PermissionLink permission="documents.bulk" href="/documents/bulk" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Bulk Operations</PermissionLink></li>
              <li><PermissionLink permission="documents.scoring" href="/documents/scoring" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Doc Scoring</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Permits */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Permits</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="permits.view" href="/permits/home" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Permits Home</PermissionLink></li>
              <li><PermissionLink permission="permits.view" href="/permits" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Permits</PermissionLink></li>
              <li className="border-t border-gray-200 my-1"></li>
              <li><PermissionLink permission="permits.create" href="/permits/manage-templates" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Templates</PermissionLink></li>
              <li><PermissionLink permission="permits.issue" href="/permits/issue" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Issue Permit</PermissionLink></li>
              <li><PermissionLink permission="permits.approve" href="/permits/pending-approvals" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Pending Approvals</PermissionLink></li>
              <li><PermissionLink permission="permits.loto" href="/permits/lotos" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">LOTO's</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Risk Assessments */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">Risk Assessments</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="risk-assessments.view" href="/risk-assessments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Home</PermissionLink></li>
              <li className="border-t border-gray-200 my-1"></li>
              <li><PermissionLink permission="risk-assessments.create" href="/risk-assessments/new" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">New Assessment</PermissionLink></li>
              <li><PermissionLink permission="risk-assessments.manage" href="/risk-assessments/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Assessments</PermissionLink></li>
              <li><PermissionLink permission="risk-assessments.approve" href="/risk-assessments/approvals" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Approvals</PermissionLink></li>
              <li><PermissionLink permission="risk-assessments.view" href="/risk-assessments/monitoring" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Monitoring History</PermissionLink></li>
              <li><PermissionLink permission="risk-assessments.view" href="/risk-assessments/changelog" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Change Log</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Tasks */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Tasks</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="tasks.view" href="/tasks" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Task Home</PermissionLink></li>
              <li><PermissionLink permission="tasks.view" href="/tasks/my" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">My Tasks</PermissionLink></li>
              <li><PermissionLink permission="tasks.create" href="/tasks/create" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Create Task</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Employees */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Employees</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="employees.view" href="/employees" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Employee Directory</PermissionLink></li>
              <li><PermissionLink permission="employees.view" href="/employees/my-profile" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">My Profile</PermissionLink></li>
              <li><PermissionLink permission="employees.view" href="/employees/org-chart" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Org Chart</PermissionLink></li>
              <li><PermissionLink permission="employees.reports" href="/employees/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Employee Reports</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Assets */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Assets</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="assets.view" href="/assets" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Assets Home</PermissionLink></li>
              <li className="border-t border-gray-200 my-1"></li>
              <li><PermissionLink permission="assets.view" href="/assets/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Assets</PermissionLink></li>
              <li><PermissionLink permission="assets.create" href="/assets/new" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Add New Asset</PermissionLink></li>
              <li><PermissionLink permission="assets.inspect" href="/assets/inspection" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Log Inspection</PermissionLink></li>
              <li><PermissionLink permission="assets.view" href="/assets/history" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Inspection History</PermissionLink></li>
              <li><PermissionLink permission="assets.view" href="/assets/reminders" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Inspection Reminders</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Processes */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                  <path d="M8 5v6l3-3 3 3V5"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Processes</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="processes.view" href="/process-home" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Process Home</PermissionLink></li>
              <li><PermissionLink permission="processes.builder.access" href="/build-process" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Build Process</PermissionLink></li>
              <li><PermissionLink permission="processes.view" href="/processes/list" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Process List</PermissionLink></li>
              <li><PermissionLink permission="processes.view" href="/processes/my" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">My Processes</PermissionLink></li>
              <li><PermissionLink permission="processes.view" href="/processes/templates" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Templates</PermissionLink></li>
              <li><PermissionLink permission="processes.view" href="/processes/checklists" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Checklists</PermissionLink></li>
              <li><PermissionLink permission="analytics.view" href="/processes/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Reports</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Risk Webs */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z"/>
                  <circle cx="12" cy="12" r="2"/>
                  <circle cx="12" cy="6" r="1.5"/>
                  <circle cx="18" cy="12" r="1.5"/>
                  <circle cx="12" cy="18" r="1.5"/>
                  <circle cx="6" cy="12" r="1.5"/>
                  <path d="M12 8v4m0 0v4m0-4h4m-4 0H8"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">Risk Webs</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="risk-webs.view" href="/risk-webs" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Risk Web Home</PermissionLink></li>
              <li className="border-t border-gray-200 my-1"></li>
              <li><PermissionLink permission="risk-webs.view" href="/sample" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Sample 1 - Risk Intelligence</PermissionLink></li>
              <li><PermissionLink permission="risk-webs.view" href="/sample2" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Sample 2 - Risk Landscape</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Incidents */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Incidents</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="incidents.view" href="/incidents" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Home</PermissionLink></li>
              <li><PermissionLink permission="incidents.create" href="/incidents/new" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">New Incident</PermissionLink></li>
              <li><PermissionLink permission="incidents.view" href="/incidents/incomplete" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Incomplete Forms</PermissionLink></li>
              <li><PermissionLink permission="incidents.manage" href="/incidents/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Incidents</PermissionLink></li>
              <li><PermissionLink permission="incidents.riddor" href="/incidents/riddor" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">RIDDOR</PermissionLink></li>
              <li><PermissionLink permission="incidents.builder" href="/incidents/form-builder" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Form Builder</PermissionLink></li>
              <li><PermissionLink permission="incidents.reports" href="/incidents/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Reports</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Hazards */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M12 2L1 21h22L12 2zm0 3.83L19.53 19H4.47L12 5.83zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Hazards</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-48 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="incidents.hazards.view" href="/incidents/hazards" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Home</PermissionLink></li>
              <li><PermissionLink permission="incidents.hazards.create" href="/incidents/hazards/new" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Add Hazard</PermissionLink></li>
              <li><PermissionLink permission="incidents.hazards.view" href="/incidents/hazards/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Hazard Reports</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Training Records */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zM19 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-7 2h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">Training Records</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="training.view" href="/training-records" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Training Home</PermissionLink></li>
              <li><PermissionLink permission="training.view" href="/training-records/matrix" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Training Matrix</PermissionLink></li>
              <li><PermissionLink permission="training.view" href="/training-records/compliance" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Compliance Dashboard</PermissionLink></li>
              <li><PermissionLink permission="training.assign" href="/training-records/assignments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Training Assignments</PermissionLink></li>
              <li><PermissionLink permission="training.reports" href="/training-records/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Training Reports</PermissionLink></li>
              <li><PermissionLink permission="training.analytics" href="/training-records/analytics" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Training Analytics</PermissionLink></li>
              <li><PermissionLink permission="training.view" href="/training-records/certificates" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Certificate Management</PermissionLink></li>
              <li><PermissionLink permission="training.view" href="/training-records/history" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Training History</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Competency */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">Competency</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="competency.view" href="/competency" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Competency Home</PermissionLink></li>
              <li><PermissionLink permission="competency.view" href="/competency/matrix" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Competency Matrix</PermissionLink></li>
              <li><PermissionLink permission="competency.view" href="/competency/coverage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Task Coverage</PermissionLink></li>
              <li><PermissionLink permission="competency.assess" href="/competency/assessments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">In-House Assessments</PermissionLink></li>
              <li><PermissionLink permission="competency.view" href="/competency/verification" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Verification Records</PermissionLink></li>
              <li><PermissionLink permission="competency.assess" href="/competency/schedule" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Testing Schedule</PermissionLink></li>
              <li><PermissionLink permission="competency.define" href="/competency/create" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Create Competency</PermissionLink></li>
              <li><PermissionLink permission="competency.admin" href="/competency/mapping" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Competency Mapping</PermissionLink></li>
              <li><PermissionLink permission="competency.exempt" href="/competency/exemptions" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Exemption Management</PermissionLink></li>
              <li><PermissionLink permission="competency.reports" href="/competency/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Gap Analysis</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* E-Learning */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">E-Learning</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li className="px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100 mb-1">Learning Portal</li>
              <li><PermissionLink permission="elearning.view" href="/e-learning" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Learning Home</PermissionLink></li>
              <li><PermissionLink permission="elearning.view" href="/e-learning/courses" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Browse Courses</PermissionLink></li>
              <li><PermissionLink permission="elearning.view" href="/e-learning/my-courses" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">My Courses</PermissionLink></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li className="px-3 py-1 text-xs text-gray-500 font-medium">Course Creation</li>
              <li><PermissionLink permission="elearning.create" href="/e-learning/courses/create" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Create Course</PermissionLink></li>
              <li><PermissionLink permission="elearning.manage" href="/e-learning/courses/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Courses</PermissionLink></li>
              <li><PermissionLink permission="elearning.analytics" href="/e-learning/analytics" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Learning Analytics</PermissionLink></li>
              <li><hr className="my-1 border-gray-200" /></li>
              <li className="px-3 py-1 text-xs text-gray-500 font-medium">Administration</li>
              <li><PermissionLink permission="elearning.admin" href="/e-learning/students" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Student Management</PermissionLink></li>
              <li><PermissionLink permission="elearning.admin" href="/e-learning/certificates" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Certificates</PermissionLink></li>
              <li><PermissionLink permission="elearning.admin" href="/e-learning/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Reports</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* Legal Register */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H7V9h10v2zm0 4H7v-2h10v2zm-3-8H7V5h7v2z"/>
                  <path d="M21 9.5L17.5 6l1.41-1.41L21 6.67 23.09 4.59 24.5 6 21 9.5z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">Legal Register</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="legal-register.view" href="/legal-register" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Legal Register Home</PermissionLink></li>
            </ul>
          </details>

          {/* Separator */}
          <div className="h-10 w-px bg-gray-300"></div>

          {/* NVQ */}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">NVQ</span>
            </summary>
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
              <li><PermissionLink permission="nvq.view" href="/nvq" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">NVQ Home</PermissionLink></li>
              <li className="border-t border-gray-200 my-1"></li>
              <li><PermissionLink permission="nvq.assess" href="/nvq/assessor" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Assessor Dashboard</PermissionLink></li>
              <li className="border-t border-gray-200 my-1"></li>
              <li><PermissionLink permission="nvq.view" href="/nvq/qualifications" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Qualifications</PermissionLink></li>
              <li><PermissionLink permission="nvq.assess" href="/nvq/assessments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Assessments</PermissionLink></li>
              <li><PermissionLink permission="nvq.view" href="/nvq/learners" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Learner Progress</PermissionLink></li>
              <li><PermissionLink permission="nvq.manage" href="/nvq/portfolios" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Evidence Portfolios</PermissionLink></li>
              <li><PermissionLink permission="nvq.verify" href="/nvq/verification" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Internal Verification</PermissionLink></li>
              <li><PermissionLink permission="nvq.reports" href="/nvq/reports" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Reports</PermissionLink></li>
            </ul>
          </details>
        </div>
        
        {/* Right side space for balance */}
        <div className="px-6" style={{ width: '180px' }}></div>
        </nav>
      )}
      
      {/* Sidebar - Hidden in admin */}
      {!isAdminRoute && (
        <div className="fixed top-28 left-0 z-30">
          <Sidebar />
        </div>
      )}
      
      {/* Main Content - with top padding to account for fixed headers */}
      <main className={isAdminRoute ? "" : "ml-16 transition-all duration-300"}>
        {/* Breadcrumb Navigation - Fixed position below nav */}
        {!isAdminRoute && (
          <div className="fixed top-28 left-16 right-0 z-20 bg-gray-50 border-b border-gray-200 px-6 py-2">
            <div className="w-full max-w-[80%] lg:max-w-[85%] xl:max-w-[90%] mx-auto">
              <Breadcrumb />
            </div>
          </div>
        )}
        <div 
          className={isAdminRoute ? "" : "p-6 pt-40 w-full max-w-[80%] lg:max-w-[85%] xl:max-w-[90%] mx-auto"}
        >
          {children}
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
  return <MainLayoutContent>{children}</MainLayoutContent>;
}