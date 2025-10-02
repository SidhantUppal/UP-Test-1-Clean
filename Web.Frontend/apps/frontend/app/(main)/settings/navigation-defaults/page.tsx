"use client";

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Define all available navigation items (same as user navigation settings)
const ALL_NAV_ITEMS = [
  {
    id: 'home',
    name: 'Home',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    href: '/',
    permission: 'dashboard.view'
  },
  {
    id: 'checklists',
    name: 'Checklists',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    href: '/checklists',
    permission: 'checklists.view',
    hasDropdown: true
  },
  {
    id: 'contractors',
    name: 'Contractors',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm8 6v-6M19 15l-3 3 3 3',
    href: '/contractors',
    permission: 'contractors.view',
    hasDropdown: true
  },
  {
    id: 'documents',
    name: 'Documents',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z',
    href: '/documents',
    permission: 'documents.view',
    hasDropdown: true
  },
  {
    id: 'permits',
    name: 'Permits',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    href: '/permits',
    permission: 'permits.view',
    hasDropdown: true
  },
  {
    id: 'incidents',
    name: 'Incidents',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    href: '/incidents',
    permission: 'incidents.view',
    hasDropdown: true
  },
  {
    id: 'risk-assessments',
    name: 'Risk Assessments',
    icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
    href: '/risk-assessments',
    permission: 'risk-assessments.view',
    hasDropdown: true
  },
  {
    id: 'legal-register',
    name: 'Legal Register',
    icon: 'M97.48,26.61L97.48,26.61c3.09,3.09,3.15,8.08,0.14,11.1l-1.63,1.63l13.1,12.88L75.96,84.14L63.2,70.92 l-49.74,49.74c-3.01,3.01-8.01,2.95-11.1-0.14l0,0c-3.09-3.09-3.15-8.08-0.14-11.1l49.92-49.92l-9.99-10.39l31.32-31.93l11.21,11 l1.72-1.72C89.4,23.46,94.39,23.52,97.48,26.61L97.48,26.61z M72.11,1.88L72.11,1.88c2.46,2.46,2.51,6.43,0.11,8.83L35.69,47.24 c-2.4,2.4-6.37,2.35-8.83-0.11l0,0c-2.46-2.46-2.51-6.43-0.11-8.83L63.28,1.77C65.68-0.63,69.65-0.58,72.11,1.88L72.11,1.88z M124.04,53.81L124.04,53.81c2.46,2.46,2.51,6.43,0.11,8.83L87.62,99.18c-2.4,2.4-6.37,2.35-8.83-0.11l0,0 c-2.46-2.46-2.51-6.43-0.11-8.83l36.53-36.53C117.61,51.3,121.58,51.35,124.04,53.81L124.04,53.81z',
    href: '/legal-register',
    permission: 'legal-register.view'
  },
  {
    id: 'assets',
    name: 'Assets',
    icon: 'M1.149,0h120.583c0.631,0,1.146,0.518,1.146,1.149v28.383 c0,0.634-0.516,1.149-1.146,1.149H1.149C0.518,30.681,0,30.166,0,29.532V1.149C0,0.518,0.518,0,1.149,0L1.149,0z M7.224,36.787 h108.433c0.526,0,0.962,0.43,0.962,0.961v71.331c0,0.529-0.436,0.962-0.962,0.962H7.224c-0.528,0-0.961-0.433-0.961-0.962V37.749 C6.263,37.217,6.695,36.787,7.224,36.787L7.224,36.787z M45.005,48.526h32.87c3.529,0,6.419,2.888,6.419,6.417l0,0 c0,3.529-2.89,6.416-6.419,6.416h-32.87c-3.532,0-6.419-2.887-6.419-6.416l0,0C38.586,51.414,41.474,48.526,45.005,48.526 L45.005,48.526z',
    href: '/assets',
    permission: 'assets.view'
  },
  {
    id: 'training',
    name: 'Training',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    href: '/training-records',
    permission: 'training.view'
  },
  {
    id: 'elearning',
    name: 'E-Learning',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    href: '/e-learning',
    permission: 'elearning.view'
  },
  {
    id: 'tasks',
    name: 'Tasks',
    icon: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3',
    href: '/tasks',
    permission: 'tasks.view'
  },
  {
    id: 'processes',
    name: 'Processes',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
    href: '/processes',
    permission: 'processes.view'
  },
  {
    id: 'employees',
    name: 'Employees',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    href: '/employees',
    permission: 'employees.view'
  }
];

interface NavItem {
  id: string;
  name: string;
  icon: string;
  href: string;
  permission: string;
  hasDropdown?: boolean;
}

interface Role {
  RoleID: string;
  RoleName: string;
  UpdatedDate?: string;
}

export default function NavigationDefaultsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedRoleName, setSelectedRoleName] = useState<string>('');
  const [primaryNavItems, setPrimaryNavItems] = useState<NavItem[]>([]);
  const [availableItems, setAvailableItems] = useState<NavItem[]>([]);
  const [maxPrimaryItems, setMaxPrimaryItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);

  // Load available roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  // Load role preferences when role is selected
  useEffect(() => {
    if (selectedRole) {
      loadRolePreferences(selectedRole);
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setRoles(result.data);
          // Auto-select first role if available
          if (result.data.length > 0 && !selectedRole) {
            setSelectedRole(result.data[0].RoleID);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRolePreferences = async (roleId: string) => {
    if (!roleId) return;
    
    setLoadingRole(true);
    try {
      const response = await fetch(`/api/admin/role-navigation-preferences?roleId=${roleId}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const { primaryItems = [], maxPrimaryItems: maxItems = 8, roleName } = result.data;
          
          setPrimaryNavItems(primaryItems);
          setMaxPrimaryItems(maxItems);
          setSelectedRoleName(roleName);
          
          // Set available items (items not in primary)
          const primaryIds = primaryItems.map((item: NavItem) => item.id);
          setAvailableItems(ALL_NAV_ITEMS.filter(item => !primaryIds.includes(item.id)));
        } else {
          // Default setup if no preferences found for this role
          setDefaultNavigation();
        }
      } else {
        setDefaultNavigation();
      }
    } catch (error) {
      console.error('Error loading role preferences:', error);
      setDefaultNavigation();
    } finally {
      setLoadingRole(false);
    }
  };

  const setDefaultNavigation = () => {
    // Default primary navigation items
    const defaultPrimary = ALL_NAV_ITEMS.slice(0, 6);
    const remaining = ALL_NAV_ITEMS.slice(6);
    
    setPrimaryNavItems(defaultPrimary);
    setAvailableItems(remaining);
    setMaxPrimaryItems(8);
  };

  const saveRolePreferences = async () => {
    if (!selectedRole) {
      alert('Please select a role first.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/role-navigation-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roleId: selectedRole,
          roleName: selectedRoleName,
          primaryItems: primaryNavItems,
          maxPrimaryItems: maxPrimaryItems
        })
      });

      if (response.ok) {
        alert(`Navigation defaults for ${selectedRoleName} saved successfully!`);
      } else {
        alert('Failed to save navigation defaults.');
      }
    } catch (error) {
      console.error('Error saving role preferences:', error);
      alert('Error saving preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };


  const onDragEnd = (result: {
    destination?: { droppableId: string; index: number } | null;
    source: { droppableId: string; index: number };
    draggableId: string;
  }) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Moving within the same list
    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId === 'primary') {
        const newItems = Array.from(primaryNavItems);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);
        setPrimaryNavItems(newItems);
      } else {
        const newItems = Array.from(availableItems);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);
        setAvailableItems(newItems);
      }
      return;
    }

    // Moving between lists
    if (source.droppableId === 'available' && destination.droppableId === 'primary') {
      // Check if we've reached the maximum
      if (primaryNavItems.length >= maxPrimaryItems) {
        alert(`Maximum ${maxPrimaryItems} primary navigation items allowed.`);
        return;
      }

      const item = availableItems.find(item => item.id === draggableId);
      if (item) {
        const newAvailable = availableItems.filter(item => item.id !== draggableId);
        const newPrimary = Array.from(primaryNavItems);
        newPrimary.splice(destination.index, 0, item);

        setAvailableItems(newAvailable);
        setPrimaryNavItems(newPrimary);
      }
    } else if (source.droppableId === 'primary' && destination.droppableId === 'available') {
      const item = primaryNavItems.find(item => item.id === draggableId);
      if (item) {
        const newPrimary = primaryNavItems.filter(item => item.id !== draggableId);
        const newAvailable = Array.from(availableItems);
        newAvailable.splice(destination.index, 0, item);

        setPrimaryNavItems(newPrimary);
        setAvailableItems(newAvailable);
      }
    }
  };

  const resetToDefault = () => {
    if (confirm('Reset navigation to default settings? This will override the current configuration for this role.')) {
      setDefaultNavigation();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading navigation defaults...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Navigation Defaults by Role</h1>
              <p className="text-gray-600 mt-1">Set default navigation configurations for different user roles</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.history.back()}
                style={{ 
                  backgroundColor: '#e77726', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                Back to Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Role Selection & Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Role Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role to Configure
              </label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  const role = roles.find(r => r.RoleID === e.target.value);
                  setSelectedRoleName(role?.RoleName || '');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">Select a role...</option>
                {roles.map((role) => (
                  <option key={role.RoleID} value={role.RoleID}>
                    {role.RoleName}
                  </option>
                ))}
              </select>
            </div>
            
          </div>
        </div>

        {/* Settings */}
        {selectedRole && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Primary Navigation Items for {selectedRoleName}
                </label>
                <select
                  value={maxPrimaryItems}
                  onChange={(e) => setMaxPrimaryItems(Number(e.target.value))}
                  disabled={loadingRole}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                >
                  <option value={6}>6 items</option>
                  <option value={8}>8 items</option>
                  <option value={10}>10 items</option>
                  <option value={12}>12 items</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Items beyond this limit will appear in the "More Items" dropdown
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Role Configuration Interface */}
        {selectedRole && (
          <>
            {loadingRole ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading role configuration...</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="space-y-6">
                  {/* Primary Navigation */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Primary Navigation ({primaryNavItems.length}/{maxPrimaryItems})
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      These items appear in the main navigation bar for users with the {selectedRoleName} role
                    </p>

                    <Droppable droppableId="primary" direction="horizontal">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[120px] p-4 border-2 border-dashed rounded-lg ${
                            snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                          }`}
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                            {primaryNavItems.map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move flex flex-col items-center text-center ${
                                      snapshot.isDragging ? 'shadow-lg' : ''
                                    }`}
                                  >
                                    <svg className={item.id === 'legal-register' ? "w-8 h-8 text-gray-600 mb-2" : "w-8 h-8 text-gray-600 mb-2"} viewBox={item.id === 'legal-register' ? "0 0 125.92 122.88" : item.id === 'assets' ? "0 0 122.878 110.041" : "0 0 24 24"} fill={item.id === 'legal-register' || item.id === 'assets' ? "currentColor" : "none"} stroke={item.id === 'legal-register' || item.id === 'assets' ? "none" : "currentColor"} strokeWidth={item.id === 'legal-register' || item.id === 'assets' ? 0 : 2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d={item.icon} />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900 mb-1">{item.name}</span>
                                    {item.hasDropdown && (
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                        Dropdown
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </div>
                          {provided.placeholder}
                          {primaryNavItems.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                              Drag items here to add them to the primary navigation
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </div>

                  {/* Available Items */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Available Items ({availableItems.length})
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      These items will appear in the "More Items" dropdown for users with the {selectedRoleName} role
                    </p>

                    <Droppable droppableId="available" direction="horizontal">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[120px] p-4 border-2 border-dashed rounded-lg ${
                            snapshot.isDraggingOver ? 'border-green-400 bg-green-50' : 'border-gray-300'
                          }`}
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                            {availableItems.map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move flex flex-col items-center text-center ${
                                      snapshot.isDragging ? 'shadow-lg' : ''
                                    }`}
                                  >
                                    <svg className={item.id === 'legal-register' ? "w-8 h-8 text-gray-600 mb-2" : "w-8 h-8 text-gray-600 mb-2"} viewBox={item.id === 'legal-register' ? "0 0 125.92 122.88" : item.id === 'assets' ? "0 0 122.878 110.041" : "0 0 24 24"} fill={item.id === 'legal-register' || item.id === 'assets' ? "currentColor" : "none"} stroke={item.id === 'legal-register' || item.id === 'assets' ? "none" : "currentColor"} strokeWidth={item.id === 'legal-register' || item.id === 'assets' ? 0 : 2} strokeLinecap="round" strokeLinejoin="round">
                                      <path d={item.icon} />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900 mb-1">{item.name}</span>
                                    {item.hasDropdown && (
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                        Dropdown
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </div>
                          {provided.placeholder}
                          {availableItems.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                              All items are in primary navigation
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </DragDropContext>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={resetToDefault}
                  disabled={loadingRole}
                  style={{ 
                    backgroundColor: '#e77726', 
                    color: '#ffffff', 
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80 disabled:opacity-50"
                >
                  Reset to Default
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={saveRolePreferences}
                    disabled={saving || loadingRole || !selectedRole}
                    style={{ 
                      backgroundColor: saving ? '#7c7a9e' : '#3d3a72', 
                      color: '#ffffff', 
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s'
                    }}
                    className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {!selectedRole && !loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p className="text-xl text-gray-600">Please select a role to configure its navigation defaults</p>
          </div>
        )}
      </div>
    </div>
  );
}