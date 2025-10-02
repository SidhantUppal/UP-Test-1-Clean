'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PermissionLink } from '../permissions';

// Mobile navigation items
const mobileNavItems = [
  {
    id: 'tasks',
    name: 'Tasks',
    href: '/tasks',
    permission: 'tasks.view',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Tasks Home', href: '/tasks', permission: 'tasks.view' },
      { label: 'Create Task', href: '/tasks/create', permission: 'tasks.create' },
      { label: 'My Tasks', href: '/tasks/my', permission: 'tasks.view' },
      { label: 'Manage Tasks', href: '/tasks/manage', permission: 'tasks.manage' },
    ]
  },
  {
    id: 'incidents',
    name: 'Incidents',
    href: '/incidents/dashboard',
    permission: 'incidents.view',
    icon: 'M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2',
    hasDropdown: true,
    dropdownItems: [
      { section: 'Incidents' },
      { label: 'Incidents Home', href: '/incidents/dashboard', permission: 'incidents.view' },
      { label: 'Report Incident', href: '/incidents/form', permission: 'incidents.create' },
      { label: 'Manage Incidents', href: '/incidents/manage', permission: 'incidents.view' },
      { separator: true },
      { section: 'Hazards' },
      { label: 'View Hazards', href: '/incidents/hazards', permission: 'hazards.view' },
      { label: 'Report Hazard', href: '/incidents/hazards/new', permission: 'hazards.create' },
      { separator: true },
      { section: 'Behaviour' },
      { label: 'Safety Walks', href: '/incidents/behaviour/walks', permission: 'behaviour.view' },
    ]
  },
  {
    id: 'employees',
    name: 'Employees',
    href: '/employees',
    permission: 'employees.view',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Employees Home', href: '/employees', permission: 'employees.view' },
      { label: 'Add Employee', href: '/employees/new', permission: 'employees.create' },
      { label: 'Manage Employees', href: '/employees/manage', permission: 'employees.manage' },
    ]
  },
];

export default function MobileNavigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="lg:hidden">
      {mobileNavItems.map((item) => (
        <div key={item.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleDropdown(item.id)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-3 text-gray-600">
                <path d={item.icon} />
              </svg>
              <span className="font-medium">{item.name}</span>
            </div>
            <svg
              className={`w-5 h-5 transition-transform ${
                openDropdown === item.id ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openDropdown === item.id && item.dropdownItems && (
            <div className="bg-gray-50 px-4 py-2">
              {item.dropdownItems.map((dropdownItem: any, index: number) => {
                if ('section' in dropdownItem) {
                  return (
                    <div key={index} className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {dropdownItem.section}
                    </div>
                  );
                }
                if ('separator' in dropdownItem) {
                  return <hr key={index} className="my-2 border-gray-300" />;
                }
                return (
                  <PermissionLink
                    key={index}
                    permission={dropdownItem.permission}
                    href={dropdownItem.href}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-white rounded"
                  >
                    {dropdownItem.label}
                  </PermissionLink>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}