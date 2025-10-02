"use client";

import React, { useState, useEffect } from 'react';

interface OrgGroup {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  children: OrgGroup[];
  description?: string;
  employeeCount?: number;
}

export default function OrgChartPage() {
  const [orgGroups, setOrgGroups] = useState<OrgGroup[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    loadOrgGroups();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId && !(event.target as HTMLElement).closest('.dropdown-menu')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdownId]);

  const loadOrgGroups = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockData: OrgGroup[] = [
        {
          id: 'HO1',
          name: 'Head Office',
          code: 'HO1',
          parentId: null,
          description: 'BSS Manchester and 1 more',
          employeeCount: 15,
          children: [
            {
              id: 'HQ-London',
              name: 'HQ London',
              code: 'Admin LDN',
              parentId: 'HO1',
              children: [
                {
                  id: 'admin',
                  name: 'Administration',
                  code: 'Admin LDN',
                  parentId: 'HQ-London',
                  children: []
                },
                {
                  id: 'consultants',
                  name: 'Consultants',
                  code: 'Con LDN',
                  parentId: 'HQ-London',
                  children: []
                },
                {
                  id: 'e-learning',
                  name: 'E-Learning Demo Users',
                  code: '(Demo) LDN',
                  parentId: 'HQ-London',
                  description: 'BSS Bolton and 9 more',
                  children: []
                },
                {
                  id: 'hs-admin',
                  name: 'H & S Admin',
                  code: 'H&S LDN',
                  parentId: 'HQ-London',
                  children: []
                },
                {
                  id: 'hr-group1',
                  name: 'HR Group 1',
                  code: 'HR1 LDN',
                  parentId: 'HQ-London',
                  children: []
                },
                {
                  id: 'sales-team',
                  name: 'Sales Team',
                  code: 'Sales LDN',
                  parentId: 'HQ-London',
                  children: []
                }
              ]
            },
            {
              id: 'HQ-Stafford',
              name: 'HQ Stafford',
              code: 'HQ',
              parentId: 'HO1',
              description: 'BSS Stafford HQ',
              children: [
                {
                  id: 'admin-stafford',
                  name: 'Administration',
                  code: 'Admin STAFF',
                  parentId: 'HQ-Stafford',
                  children: []
                },
                {
                  id: 'e-learning-stafford',
                  name: 'E-Learning Demo Users',
                  code: '(demo) STAFF',
                  parentId: 'HQ-Stafford',
                  children: []
                },
                {
                  id: 'health-safety',
                  name: 'Health and Safety',
                  code: 'HR 1 STAFF',
                  parentId: 'HQ-Stafford',
                  children: []
                },
                {
                  id: 'hr-group1-stafford',
                  name: 'HR Group 1',
                  code: 'HR 1 STAFF',
                  parentId: 'HQ-Stafford',
                  children: []
                },
                {
                  id: 'sales-team-stafford',
                  name: 'Sales Team',
                  code: 'Sales STAFF',
                  parentId: 'HQ-Stafford',
                  children: []
                }
              ]
            },
            {
              id: 'other',
              name: 'Other',
              code: 'Other',
              parentId: 'HO1',
              children: []
            }
          ]
        }
      ];

      setOrgGroups(mockData);
      // Initially expand the root level
      setExpandedGroups(new Set(['HO1']));
    } finally {
      setLoading(false);
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const toggleAllGroups = () => {
    if (showAllGroups) {
      // Collapse all
      setExpandedGroups(new Set());
      setShowAllGroups(false);
    } else {
      // Expand all
      const allGroupIds = new Set<string>();
      const addGroupIds = (groups: OrgGroup[]) => {
        groups.forEach(group => {
          allGroupIds.add(group.id);
          if (group.children.length > 0) {
            addGroupIds(group.children);
          }
        });
      };
      addGroupIds(orgGroups);
      setExpandedGroups(allGroupIds);
      setShowAllGroups(true);
    }
  };

  const filterGroups = (groups: OrgGroup[], searchText: string): OrgGroup[] => {
    if (!searchText) return groups;

    const filtered: OrgGroup[] = [];
    groups.forEach(group => {
      const matchesFilter =
        group.name.toLowerCase().includes(searchText.toLowerCase()) ||
        group.code.toLowerCase().includes(searchText.toLowerCase()) ||
        (group.description && group.description.toLowerCase().includes(searchText.toLowerCase()));

      const filteredChildren = filterGroups(group.children, searchText);

      if (matchesFilter || filteredChildren.length > 0) {
        filtered.push({
          ...group,
          children: filteredChildren
        });
      }
    });

    return filtered;
  };

  const renderOrgGroup = (group: OrgGroup, level: number = 0) => {
    const isExpanded = expandedGroups.has(group.id);
    const hasChildren = group.children.length > 0;
    const indentClass = `pl-${Math.min(level * 6, 24)}`;
    const isDropdownOpen = openDropdownId === group.id;

    return (
      <div key={group.id} style={{position: 'relative'}}>
        <div className={`flex items-center py-2 px-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200 ${indentClass}`}>
          <div
            className="flex items-center flex-1"
            onClick={() => hasChildren && toggleGroup(group.id)}
          >
            {hasChildren && (
              <div className="mr-2">
                {isExpanded ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
            )}
            {!hasChildren && <div className="mr-2 w-4" />}

            <div className="flex-1">
              <div className="flex items-center gap-12">
                <span className="font-medium text-gray-700">{group.name}</span>
                <span className="text-sm text-gray-500">{group.code}</span>
                {group.description && (
                  <span className="text-sm text-gray-500 ml-16">{group.description}</span>
                )}
              </div>
            </div>
          </div>

          <div className="relative dropdown-menu">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdownId(isDropdownOpen ? null : group.id);
              }}
              style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              className="hover:opacity-80"
            >
              Actions
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-xl border border-gray-200" style={{zIndex: 999999, position: 'absolute', top: '100%'}}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Add child to', group.name);
                    setOpenDropdownId(null);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Add Child Group
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit', group.name);
                    setOpenDropdownId(null);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Edit Group
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Remove', group.name);
                    setOpenDropdownId(null);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                >
                  Remove Group
                </button>
              </div>
            )}
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div>
            {group.children.map(child => renderOrgGroup(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const filteredOrgGroups = filterGroups(orgGroups, filterText);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Organisation Group List</h1>
              <p className="text-gray-600 mt-1">Settings / Organisation Group List</p>
            </div>
            <div className="flex gap-3">
              <button style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }} className="hover:opacity-80">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h4 className="text-base font-semibold">Filter Options</h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
              <button
                onClick={toggleAllGroups}
                style={{
                  backgroundColor: '#3d3a7220',
                  color: '#3d3a72',
                  border: '1px solid #3d3a7250',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                {showAllGroups ? 'Hide all org groups' : 'Show all org groups'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Groups</label>
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter visible items..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Please note: the root level org group cannot be deleted or moved to another level
            </p>
            <div className="flex items-center space-x-2">
              <button style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'opacity 0.2s'
              }} className="hover:opacity-80">
                Apply Filter
              </button>

              <button
                onClick={() => setFilterText('')}
                style={{
                  backgroundColor: '#e77726',
                  color: '#ffffff',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Organisation Groups Table/Tree */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Organisation Groups</h2>
            <p className="text-gray-600 text-sm mt-1">Manage your organisation hierarchy</p>
          </div>

          <div>
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-2 text-gray-600">Loading organisation groups...</p>
              </div>
            ) : filteredOrgGroups.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {filterText ? `No groups found matching "${filterText}"` : 'No organisation groups available'}
              </div>
            ) : (
              <div>
                {filteredOrgGroups.map(group => renderOrgGroup(group))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}