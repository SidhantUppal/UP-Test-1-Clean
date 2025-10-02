"use client";

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Define all available navigation items - EXACTLY matching DynamicNavigation
const ALL_NAV_ITEMS = [
  {
    id: 'checklists',
    name: 'Checklists',
    href: '/checklists',
    permission: 'checklists.view',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    hasDropdown: true
  },
  {
    id: 'contractors',
    name: 'Contractors',
    href: '/contractors',
    permission: 'contractors.view',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm8 6v-6M19 15l-3 3 3 3',
    hasDropdown: true
  },
  {
    id: 'documents',
    name: 'Documents',
    href: '/documents',
    permission: 'documents.view',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z',
    hasDropdown: true
  },
  {
    id: 'permits',
    name: 'Permits',
    href: '/permits/home',
    permission: 'permits.view',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    hasDropdown: true
  },
  {
    id: 'risk-assessments',
    name: 'Risk Assessments',
    href: '/risk-assessments',
    permission: 'risk-assessments.view',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    hasDropdown: true
  },
  {
    id: 'tasks',
    name: 'Tasks',
    href: '/tasks',
    permission: 'tasks.view',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    hasDropdown: true
  },
  {
    id: 'employees',
    name: 'Employees',
    href: '/employees',
    permission: 'employees.view',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    hasDropdown: true
  },
  {
    id: 'assets',
    name: 'Assets',
    href: '/assets',
    permission: 'assets.view',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
    hasDropdown: true
  },
  {
    id: 'processes',
    name: 'Processes',
    href: '/process-home',
    permission: 'processes.view',
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 5v6l3-3 3 3V5',
    hasDropdown: true
  },
  {
    id: 'risk-webs',
    name: 'Risk Webs',
    href: '/risk-webs',
    permission: 'risk-webs.view',
    icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z',
    hasDropdown: true,
    multiPath: true
  },
  {
    id: 'incidents',
    name: 'Incidents',
    href: '/incidents',
    permission: 'incidents.view',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    hasDropdown: true
  },
  {
    id: 'hazards',
    name: 'Hazards',
    href: '/incidents/hazards',
    permission: 'incidents.hazards.view',
    icon: 'M12 2L1 21h22L12 2zm0 3.83L19.53 19H4.47L12 5.83zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z',
    hasDropdown: true
  },
  {
    id: 'behavioural',
    name: 'Behavioural Safety',
    href: '/incidents/behaviour',
    permission: 'incidents.behaviour.view',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    hasDropdown: true
  },
  {
    id: 'environmental',
    name: 'Environmental',
    href: '/incidents/environmental',
    permission: 'incidents.environmental.view',
    icon: 'M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 2c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm-1 2h2v2h-2V7zm0 3h2v6h-2v-6z',
    hasDropdown: true
  },
  {
    id: 'training',
    name: 'Training Records',
    href: '/training-records',
    permission: 'training.view',
    icon: 'M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zM19 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-7 2h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z',
    hasDropdown: true
  },
  {
    id: 'competency',
    name: 'Competency',
    href: '/competency',
    permission: 'competency.view',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    hasDropdown: true
  },
  {
    id: 'elearning',
    name: 'E-Learning',
    href: '/e-learning',
    permission: 'elearning.view',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    hasDropdown: true
  },
  {
    id: 'legal-register',
    name: 'Legal Register',
    href: '/legal-register',
    permission: 'legal-register.view',
    icon: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H7V9h10v2zm0 4H7v-2h10v2zm-3-8H7V5h7v2z',
    hasDropdown: true
  },
  {
    id: 'nvq',
    name: 'NVQ',
    href: '/nvq',
    permission: 'nvq.view',
    icon: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
    hasDropdown: true
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

export default function NavigationSettingsPage() {
  const [primaryNavItems, setPrimaryNavItems] = useState<NavItem[]>([]);
  const [availableItems, setAvailableItems] = useState<NavItem[]>([]);
  const [maxPrimaryItems, setMaxPrimaryItems] = useState(10);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load current navigation preferences
  useEffect(() => {
    loadNavigationPreferences();
  }, []);

  const loadNavigationPreferences = async () => {
    try {
      const response = await fetch('/api/user/navigation-preferences');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const savedPrimary = result.data.primaryItems || [];
          const savedMax = result.data.maxPrimaryItems || 10;
          
          setPrimaryNavItems(savedPrimary);
          setMaxPrimaryItems(savedMax);
          
          // Set available items (items not in primary)
          const primaryIds = savedPrimary.map((item: NavItem) => item.id);
          setAvailableItems(ALL_NAV_ITEMS.filter(item => !primaryIds.includes(item.id)));
        } else {
          // Default setup if no preferences saved
          setDefaultNavigation();
        }
      } else {
        setDefaultNavigation();
      }
    } catch (error) {
      console.error('Error loading navigation preferences:', error);
      setDefaultNavigation();
    } finally {
      setLoading(false);
    }
  };

  const setDefaultNavigation = () => {
    // Default primary navigation items - match current DynamicNavigation setup
    const defaultPrimary = ALL_NAV_ITEMS.slice(0, 10);
    const remaining = ALL_NAV_ITEMS.slice(10);
    
    setPrimaryNavItems(defaultPrimary);
    setAvailableItems(remaining);
  };

  const saveNavigationPreferences = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/navigation-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primaryItems: primaryNavItems,
          maxPrimaryItems: maxPrimaryItems
        })
      });

      if (response.ok) {
        alert('Navigation preferences saved successfully!');
      } else {
        alert('Failed to save navigation preferences.');
      }
    } catch (error) {
      console.error('Error saving navigation preferences:', error);
      alert('Error saving preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const onDragEnd = (result: any) => {
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
    if (confirm('Reset navigation to default settings? This will override your current configuration.')) {
      setDefaultNavigation();
      setMaxPrimaryItems(10);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading navigation settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-[80%] lg:max-w-[85%] xl:max-w-[90%] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Navigation Settings</h1>
          </div>
          <p className="text-gray-600">
            Customize your navigation bar by dragging and dropping items. Primary navigation items appear in the main nav bar, 
            while others will be available in the "More Items" dropdown.
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Primary Navigation Items
              </label>
              <select
                value={maxPrimaryItems}
                onChange={(e) => setMaxPrimaryItems(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-6">
            {/* Primary Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Primary Navigation ({primaryNavItems.length}/{maxPrimaryItems})
                  </h2>
                  <p className="text-sm text-gray-600">
                    These items appear in the main navigation bar
                  </p>
                </div>
              </div>

              <Droppable droppableId="primary" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[140px] p-6 border-2 border-dashed rounded-xl transition-all duration-300 ${
                      snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50 shadow-inner' : 'border-gray-300 bg-gray-50/30'
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                      {primaryNavItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm cursor-move flex flex-col items-center text-center transition-all duration-200 hover:shadow-md hover:border-blue-300 ${
                                snapshot.isDragging ? 'shadow-xl border-blue-400 bg-blue-50 transform rotate-3' : ''
                              }`}
                            >
                              <svg className="w-8 h-8 text-blue-600 mb-2" viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
                                {item.id === 'risk-webs' ? (
                                  <>
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z"/>
                                    <circle cx="12" cy="12" r="2"/>
                                    <circle cx="12" cy="6" r="1.5"/>
                                    <circle cx="18" cy="12" r="1.5"/>
                                    <circle cx="12" cy="18" r="1.5"/>
                                    <circle cx="6" cy="12" r="1.5"/>
                                    <path d="M12 8v4m0 0v4m0-4h4m-4 0H8"/>
                                  </>
                                ) : item.id === 'processes' ? (
                                  <>
                                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                                    <path d="M8 5v6l3-3 3 3V5"/>
                                  </>
                                ) : (
                                  <path d={item.icon} />
                                )}
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
                      <div className="text-center text-gray-500 py-12">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <p className="text-lg font-medium">No primary navigation items</p>
                        <p className="text-sm">Drag items from "Available Items" below</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Available Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Available Items ({availableItems.length})
                  </h2>
                  <p className="text-sm text-gray-600">
                    These items will appear in the "More Items" dropdown
                  </p>
                </div>
              </div>

              <Droppable droppableId="available" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[140px] p-6 border-2 border-dashed rounded-xl transition-all duration-300 ${
                      snapshot.isDraggingOver ? 'border-green-400 bg-green-50 shadow-inner' : 'border-gray-300 bg-gray-50/30'
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                      {availableItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm cursor-move flex flex-col items-center text-center transition-all duration-200 hover:shadow-md hover:border-blue-300 ${
                                snapshot.isDragging ? 'shadow-xl border-blue-400 bg-blue-50 transform rotate-3' : ''
                              }`}
                            >
                              <svg className="w-8 h-8 text-blue-600 mb-2" viewBox="0 0 24 24" fill="currentColor" strokeWidth={0}>
                                {item.id === 'risk-webs' ? (
                                  <>
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z"/>
                                    <circle cx="12" cy="12" r="2"/>
                                    <circle cx="12" cy="6" r="1.5"/>
                                    <circle cx="18" cy="12" r="1.5"/>
                                    <circle cx="12" cy="18" r="1.5"/>
                                    <circle cx="6" cy="12" r="1.5"/>
                                    <path d="M12 8v4m0 0v4m0-4h4m-4 0H8"/>
                                  </>
                                ) : item.id === 'processes' ? (
                                  <>
                                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                                    <path d="M8 5v6l3-3 3 3V5"/>
                                  </>
                                ) : (
                                  <path d={item.icon} />
                                )}
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
                      <div className="text-center text-gray-500 py-12">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        <p className="text-lg font-medium">All items are in primary navigation</p>
                        <p className="text-sm">Perfect! All your navigation items are configured</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>

        {/* Action Buttons - Updated styling */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={resetToDefault}
            className="px-6 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 flex items-center gap-2 hover:shadow-md"
            style={{ 
              backgroundColor: 'rgb(61, 58, 114)',
              focusRingColor: 'rgba(61, 58, 114, 0.5)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(51, 48, 94)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(61, 58, 114)'}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 12a8 8 0 018-8V2.5L16 6l-4 3.5V8a6 6 0 106 6h2a8 8 0 11-8-8z"/>
            </svg>
            Reset to Default
          </button>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
              style={{ 
                backgroundColor: '#e77726',
                color: '#ffffff',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7v4H5.83l5.59-5.59L10 4l-8 8 8 8 1.41-1.41L5.83 13H19V7z"/>
              </svg>
              Cancel
            </button>
            <button
              onClick={saveNavigationPreferences}
              disabled={saving}
              className="px-6 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
              style={{ 
                backgroundColor: saving ? 'rgb(91, 88, 144)' : 'rgb(61, 58, 114)',
                focusRingColor: 'rgba(61, 58, 114, 0.5)'
              }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = 'rgb(51, 48, 94)')}
              onMouseLeave={(e) => !saving && (e.currentTarget.style.backgroundColor = 'rgb(61, 58, 114)')}
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 12a8 8 0 018-8V2.5L16 6l-4 3.5V8a6 6 0 106 6h2a8 8 0 11-8-8z"/>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
