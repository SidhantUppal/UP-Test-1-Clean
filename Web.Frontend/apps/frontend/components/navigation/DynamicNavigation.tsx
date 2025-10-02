'use client';

import React from 'react';
import { PermissionLink } from '../permissions';

// Navigation items configuration
const navigationItems = [
  {
    id: 'tasks',
    name: 'Tasks',
    href: '/tasks',
    permission: 'tasks.view',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    hasDropdown: true
  },
  {
    id: 'incidents',
    name: 'Incidents',
    href: '/incidents/dashboard',
    permission: 'incidents.view',
    icon: 'M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2',
    hasDropdown: true
  },
  {
    id: 'employees',
    name: 'Employees',
    href: '/employees',
    permission: 'employees.view',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    hasDropdown: true
  },
];

export default function DynamicNavigation() {
  const renderDropdownContent = (itemId: string) => {
    switch (itemId) {
      case 'tasks':
        return (
          <>
            <li><PermissionLink permission="tasks.view" href="/tasks" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Tasks Home</PermissionLink></li>
            <li><PermissionLink permission="tasks.create" href="/tasks/create" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Create Task</PermissionLink></li>
            <li><PermissionLink permission="tasks.view" href="/tasks/my" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">My Tasks</PermissionLink></li>
            <li><PermissionLink permission="tasks.manage" href="/tasks/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Tasks</PermissionLink></li>
          </>
        );

      case 'incidents':
        return (
          <>
            <li className="px-3 py-1 text-xs text-gray-500 font-medium border-b border-gray-100 mb-1">Incidents</li>
            <li><PermissionLink permission="incidents.view" href="/incidents/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Incidents Home</PermissionLink></li>
            <li><PermissionLink permission="incidents.create" href="/incidents/form" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Report Incident</PermissionLink></li>
            <li><PermissionLink permission="incidents.view" href="/incidents/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Incidents</PermissionLink></li>
            <li><hr className="my-1 border-gray-200" /></li>
            <li className="px-3 py-1 text-xs text-gray-500 font-medium">Hazards</li>
            <li><PermissionLink permission="hazards.view" href="/incidents/hazards" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">View Hazards</PermissionLink></li>
            <li><PermissionLink permission="hazards.create" href="/incidents/hazards/new" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Report Hazard</PermissionLink></li>
            <li><hr className="my-1 border-gray-200" /></li>
            <li className="px-3 py-1 text-xs text-gray-500 font-medium">Behaviour</li>
            <li><PermissionLink permission="behaviour.view" href="/incidents/behaviour/walks" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Safety Walks</PermissionLink></li>
          </>
        );

      case 'employees':
        return (
          <>
            <li><PermissionLink permission="employees.view" href="/employees" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium">Employees Home</PermissionLink></li>
            <li><PermissionLink permission="employees.create" href="/employees/new" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Add Employee</PermissionLink></li>
            <li><PermissionLink permission="employees.manage" href="/employees/manage" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">Manage Employees</PermissionLink></li>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {navigationItems.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 && <div className="h-10 w-px bg-gray-300"></div>}
          <details className="dropdown relative">
            <summary className="flex flex-col items-center cursor-pointer hover:text-gray-500 transition-colors list-none">
              <div className="w-6 h-6 mb-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-700">
                  <path d={item.icon} />
                </svg>
              </div>
              <span className="text-xs text-gray-700 text-center">{item.name}</span>
            </summary>
            {item.hasDropdown && (
              <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl z-[100] w-56 p-2 mt-1 border border-gray-200">
                {renderDropdownContent(item.id)}
              </ul>
            )}
          </details>
        </React.Fragment>
      ))}
    </>
  );
}