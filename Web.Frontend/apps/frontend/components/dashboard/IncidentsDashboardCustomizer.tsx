"use client";

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Incident specific widget imports
import IncidentStatsWidget from './widgets/IncidentStatsWidget';
import IncidentActivityFeedWidget from './widgets/IncidentActivityFeedWidget';
import IncidentPriorityWidget from './widgets/IncidentPriorityWidget';
import IncidentTrendsWidget from './widgets/IncidentTrendsWidget';
import IncidentCategoryBreakdownWidget from './widgets/IncidentCategoryBreakdownWidget';
import IncidentQuickActionsWidget from './widgets/IncidentQuickActionsWidget';
import IncidentSeverityAlertsWidget from './widgets/IncidentSeverityAlertsWidget';
import IncidentLocationAnalysisWidget from './widgets/IncidentLocationAnalysisWidget';
import IncidentResolutionTimesWidget from './widgets/IncidentResolutionTimesWidget';
import IncidentComplianceWidget from './widgets/IncidentComplianceWidget';
import DynamicCustomWidget from './DynamicCustomWidget';
import DrillDownWidgetBuilder from './DrillDownWidgetBuilder';

// Incident specific widget configuration
interface IncidentWidgetConfig {
  id: string;
  component: string;
  module: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  category: 'overview' | 'analytics' | 'operations' | 'compliance';
  title: string;
  description: string;
}

// Incident focused widget registry
const INCIDENT_WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  IncidentStatsWidget,
  IncidentActivityFeedWidget,
  IncidentPriorityWidget,
  IncidentTrendsWidget,
  IncidentCategoryBreakdownWidget,
  IncidentQuickActionsWidget,
  IncidentSeverityAlertsWidget,
  IncidentLocationAnalysisWidget,
  IncidentResolutionTimesWidget,
  IncidentComplianceWidget,
  DynamicCustomWidget
};

// Incident specific widget catalog
const INCIDENT_WIDGET_CATALOG: IncidentWidgetConfig[] = [
  // Overview widgets
  { id: 'incident-stats', component: 'IncidentStatsWidget', module: 'incidents', size: 'medium', category: 'overview', title: 'Incident Stats', description: 'Key incident metrics at a glance' },
  { id: 'incident-activity-feed', component: 'IncidentActivityFeedWidget', module: 'incidents', size: 'medium', category: 'overview', title: 'Recent Activity', description: 'Latest incident updates and changes' },
  { id: 'incident-quick-actions', component: 'IncidentQuickActionsWidget', module: 'incidents', size: 'small', category: 'operations', title: 'Quick Actions', description: 'Common incident operations' },
  
  // Analytics widgets  
  { id: 'incident-trends', component: 'IncidentTrendsWidget', module: 'incidents', size: 'wide', category: 'analytics', title: 'Incident Trends', description: 'Incident analytics over time' },
  { id: 'incident-category-breakdown', component: 'IncidentCategoryBreakdownWidget', module: 'incidents', size: 'medium', category: 'analytics', title: 'Category Breakdown', description: 'Incidents by type and severity' },
  { id: 'incident-location-analysis', component: 'IncidentLocationAnalysisWidget', module: 'incidents', size: 'large', category: 'analytics', title: 'Location Analysis', description: 'Incident hotspots and patterns' },
  { id: 'incident-resolution-times', component: 'IncidentResolutionTimesWidget', module: 'incidents', size: 'medium', category: 'analytics', title: 'Resolution Times', description: 'Time to resolution analysis' },
  
  // Operations widgets
  { id: 'incident-priority', component: 'IncidentPriorityWidget', module: 'incidents', size: 'small', category: 'operations', title: 'High Priority', description: 'Critical incidents requiring attention' },
  { id: 'incident-severity-alerts', component: 'IncidentSeverityAlertsWidget', module: 'incidents', size: 'small', category: 'operations', title: 'Severity Alerts', description: 'High severity incident notifications' },
  
  // Compliance widgets
  { id: 'incident-compliance', component: 'IncidentComplianceWidget', module: 'incidents', size: 'medium', category: 'compliance', title: 'Compliance Status', description: 'RIDDOR and regulatory compliance' }
];

// Sortable Incident Widget Component
function SortableIncidentWidget({ 
  widget, 
  isEditMode, 
  onRemove,
  onSizeChange,
}: { 
  widget: IncidentWidgetConfig; 
  isEditMode: boolean;
  onRemove: (id: string) => void;
  onSizeChange: (id: string, size: 'small' | 'medium' | 'large' | 'wide' | 'tall') => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: widget.id, disabled: !isEditMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Get the component
  let Component: React.ComponentType<any> | null = null;
  const isCustomWidget = widget.component === 'DynamicCustomWidget';
  
  if (!isCustomWidget) {
    Component = INCIDENT_WIDGET_COMPONENTS[widget.component];
    if (!Component) return null;
  }

  const getSizeClass = () => {
    switch (widget.size) {
      case 'small': return 'col-span-1 row-span-1';
      case 'medium': return 'col-span-2 row-span-1';
      case 'large': return 'col-span-2 row-span-2';
      case 'wide': return 'col-span-3 row-span-1';
      case 'tall': return 'col-span-1 row-span-2';
      default: return 'col-span-1 row-span-1';
    }
  };

  const getCategoryColor = () => {
    switch (widget.category) {
      case 'analytics': return 'border-purple-200 bg-purple-50/30';
      case 'operations': return 'border-indigo-200 bg-indigo-50/30';
      case 'compliance': return 'border-green-200 bg-green-50/30';
      case 'overview': return 'border-gray-200 bg-gray-50/30';
      default: return 'border-gray-200 bg-white';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${getSizeClass()} transition-all duration-300 ${isDragging ? 'z-50' : ''}`}
    >
      <div className={`relative group h-full rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${getCategoryColor()} ${isEditMode ? 'ring-2 ring-transparent hover:ring-purple-300' : ''}`}>
        {isEditMode && (
          <>
            {/* Controls */}
            <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
              {/* Module Badge */}
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-600 rounded-full border">
                incidents
              </span>
              
              {/* Drag Handle */}
              <div 
                {...attributes} 
                {...listeners}
                className="bg-gray-900 text-white rounded-lg p-2 cursor-grab hover:cursor-grabbing hover:bg-black shadow-lg transition-all"
                title="Drag to reorder"
                style={{ touchAction: 'none' }}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12h18m-9-9v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            {/* Size Controls */}
            <div className="absolute bottom-2 right-2 z-20 bg-white rounded-lg shadow-lg border border-gray-200 flex overflow-hidden opacity-0 group-hover:opacity-100 transition-all">
              {(['small', 'medium', 'large', 'wide', 'tall'] as const).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSizeChange(widget.id, size);
                  }}
                  className={`px-2 py-1 text-xs font-bold transition-all ${
                    widget.size === size 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  } ${size !== 'small' ? 'border-l border-gray-200' : ''}`}
                  title={`${size} size`}
                >
                  {size[0].toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Remove ${widget.title} from dashboard?`)) {
                  onRemove(widget.id);
                }
              }}
              className="absolute top-2 left-2 z-20 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100"
              title="Remove widget"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        )}
        
        <div className={`h-full ${isEditMode ? 'pointer-events-none' : ''}`}>
          {isCustomWidget && (widget as any).config ? (
            <DynamicCustomWidget config={(widget as any).config} id={widget.id} isEditMode={isEditMode} />
          ) : Component ? (
            <Component id={widget.id} isEditMode={isEditMode} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Widget not found: {widget.component}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Incidents Dashboard Customizer Component
interface IncidentsDashboardCustomizerProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function IncidentsDashboardCustomizer({ 
  isEditMode, 
  onToggleEditMode
}: IncidentsDashboardCustomizerProps) {
  const [widgets, setWidgets] = useState<IncidentWidgetConfig[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showWidgetPalette, setShowWidgetPalette] = useState(false);
  const [showDrillDownBuilder, setShowDrillDownBuilder] = useState(false);

  // Load saved configuration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('incidents-dashboard-layout');
      if (saved) {
        try {
          setWidgets(JSON.parse(saved));
        } catch (e) {
          setWidgets(getDefaultIncidentLayout());
        }
      } else {
        setWidgets(getDefaultIncidentLayout());
      }
    }
  }, []);

  // Save configuration
  useEffect(() => {
    if (typeof window !== 'undefined' && widgets.length > 0) {
      localStorage.setItem('incidents-dashboard-layout', JSON.stringify(widgets));
    }
  }, [widgets]);

  // Get default incidents dashboard layout
  const getDefaultIncidentLayout = (): IncidentWidgetConfig[] => {
    return [
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-decision-dashboard')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-investigation-status')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-cost-analysis')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-stats')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-activity-feed')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-trends')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-category-breakdown')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-priority')!,
      INCIDENT_WIDGET_CATALOG.find(w => w.id === 'incident-quick-actions')!,
    ].filter(Boolean);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: isEditMode ? 8 : 1000,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const addWidget = (widgetConfig: IncidentWidgetConfig) => {
    const newWidget = {
      ...widgetConfig,
      id: `${widgetConfig.component.toLowerCase()}-${Date.now()}`
    };
    setWidgets(prev => [...prev, newWidget]);
    setShowWidgetPalette(false);
  };

  const addCustomWidget = (customConfig: any) => {
    const newWidget = {
      id: customConfig.id,
      component: 'DynamicCustomWidget',
      module: 'incidents',
      size: customConfig.size,
      category: 'analytics' as const,
      title: customConfig.title,
      description: `Custom ${customConfig.chartType} chart`,
      config: customConfig
    };
    setWidgets(prev => [...prev, newWidget as any]);
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  const changeSizeWidget = (id: string, size: 'small' | 'medium' | 'large' | 'wide' | 'tall') => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, size } : w));
  };

  const resetLayout = () => {
    const defaultLayout = getDefaultIncidentLayout();
    setWidgets(defaultLayout);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('incidents-dashboard-layout');
    }
  };

  // Filter widgets for palette
  const filteredWidgets = INCIDENT_WIDGET_CATALOG.filter(widget => {
    const categoryMatch = selectedCategory === 'all' || widget.category === selectedCategory;
    const notAlreadyAdded = !widgets.some(w => w.component === widget.component);
    
    return categoryMatch && notAlreadyAdded;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Incidents Dashboard</h2>
            <p className="text-gray-600 text-sm mt-1">Customise your incident management workspace</p>
          </div>
          <div className="flex gap-3">
            {isEditMode && (
              <>
                <button
                  onClick={() => setShowWidgetPalette(!showWidgetPalette)}
                  style={{ 
                    backgroundColor: '#3d3a72', 
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
                  Incident Widgets
                </button>
                <button
                  onClick={() => setShowDrillDownBuilder(true)}
                  style={{ 
                    backgroundColor: '#3d3a72', 
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
                  Create Custom Chart
                </button>
                <button
                  onClick={resetLayout}
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
                  Reset Layout
                </button>
              </>
            )}
            <button
              onClick={onToggleEditMode}
              style={{ 
                backgroundColor: '#3d3a72', 
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
              {isEditMode ? 'Save Changes' : 'Customise'}
            </button>
          </div>
        </div>

        {/* Widget Palette */}
        {isEditMode && showWidgetPalette && (
          <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Incident Widget Library</h3>
              <button
                onClick={() => setShowWidgetPalette(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-4 mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="overview">Overview</option>
                <option value="analytics">Analytics</option>
                <option value="operations">Operations</option>
                <option value="compliance">Compliance</option>
              </select>
            </div>
            
            {/* Widget Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => addWidget(widget)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-purple-600">{widget.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{widget.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 capitalize">{widget.module}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      widget.category === 'analytics' ? 'bg-purple-100 text-purple-800' :
                      widget.category === 'operations' ? 'bg-indigo-100 text-indigo-800' :
                      widget.category === 'compliance' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {widget.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Mode Instructions */}
      {isEditMode && (
        <div className="mx-6 mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Incident Dashboard Customization Mode</span>
            </div>
            <div className="text-sm text-purple-700 space-x-4">
              <span>🎯 Drag to reorder</span>
              <span>📐 Click letters to resize</span>
              <span>💾 Auto-saves</span>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgets.map(w => w.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
              {widgets.map((widget) => (
                <SortableIncidentWidget 
                  key={widget.id}
                  widget={widget} 
                  isEditMode={isEditMode}
                  onRemove={removeWidget}
                  onSizeChange={changeSizeWidget}
                />
              ))}
            </div>
          </SortableContext>
          
          <DragOverlay>
            {activeId ? (
              <div className="opacity-80 shadow-2xl rounded-xl">
                {(() => {
                  const widget = widgets.find(w => w.id === activeId);
                  if (!widget) return null;
                  
                  if (widget.component === 'DynamicCustomWidget' && (widget as any).config) {
                    return <DynamicCustomWidget config={(widget as any).config} id={activeId} isEditMode={false} />;
                  }
                  
                  const Component = INCIDENT_WIDGET_COMPONENTS[widget.component];
                  return Component ? <Component id={activeId} isEditMode={false} /> : null;
                })()}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Empty State */}
      {widgets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Empty Incidents Dashboard</h3>
          <p className="text-gray-600 text-center max-w-sm">
            Get started by adding incident management widgets to customize your safety monitoring experience.
          </p>
          {isEditMode && (
            <button
              onClick={() => setShowWidgetPalette(true)}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              Add Your First Incident Widget
            </button>
          )}
        </div>
      )}

      {/* Drill-Down Widget Builder */}
      <DrillDownWidgetBuilder
        isOpen={showDrillDownBuilder}
        onClose={() => setShowDrillDownBuilder(false)}
        onSave={addCustomWidget}
        restrictToModule="incidents"
      />
    </div>
  );
}