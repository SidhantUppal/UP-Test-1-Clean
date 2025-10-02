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

// Process specific widget imports
import ProcessStatsWidget from './widgets/ProcessStatsWidget';
import ProcessActivityFeedWidget from './widgets/ProcessActivityFeedWidget';
import ProcessEfficiencyWidget from './widgets/ProcessEfficiencyWidget';
import ProcessWorkflowWidget from './widgets/ProcessWorkflowWidget';
import ProcessAutomationWidget from './widgets/ProcessAutomationWidget';
import ProcessQuickActionsWidget from './widgets/ProcessQuickActionsWidget';
import ProcessComplianceWidget from './widgets/ProcessComplianceWidget';
import ProcessPerformanceWidget from './widgets/ProcessPerformanceWidget';
import DynamicCustomWidget from './DynamicCustomWidget';
import DrillDownWidgetBuilder from './DrillDownWidgetBuilder';

// Process specific widget configuration
interface ProcessWidgetConfig {
  id: string;
  component: string;
  module: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  category: 'overview' | 'analytics' | 'automation' | 'compliance';
  title: string;
  description: string;
}

// Process focused widget registry
const PROCESS_WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  ProcessStatsWidget,
  ProcessActivityFeedWidget,
  ProcessEfficiencyWidget,
  ProcessWorkflowWidget,
  ProcessAutomationWidget,
  ProcessQuickActionsWidget,
  ProcessComplianceWidget,
  ProcessPerformanceWidget,
  DynamicCustomWidget
};

// Comprehensive process widget catalog
const PROCESS_WIDGET_CATALOG: ProcessWidgetConfig[] = [
  // Overview Widgets
  { id: 'process-stats', component: 'ProcessStatsWidget', module: 'processes', size: 'medium', category: 'overview', title: 'Process Stats', description: 'Key process metrics and performance indicators' },
  { id: 'process-activity', component: 'ProcessActivityFeedWidget', module: 'processes', size: 'tall', category: 'overview', title: 'Activity Feed', description: 'Recent process activities and status updates' },
  { id: 'process-workflows', component: 'ProcessWorkflowWidget', module: 'processes', size: 'medium', category: 'overview', title: 'Active Workflows', description: 'Currently running workflows and progress' },
  { id: 'process-quick-actions', component: 'ProcessQuickActionsWidget', module: 'processes', size: 'wide', category: 'overview', title: 'Quick Actions', description: 'Common process management actions' },

  // Analytics Widgets  
  { id: 'process-efficiency', component: 'ProcessEfficiencyWidget', module: 'processes', size: 'medium', category: 'analytics', title: 'Efficiency Metrics', description: 'Process efficiency and optimization insights' },
  { id: 'process-performance', component: 'ProcessPerformanceWidget', module: 'processes', size: 'large', category: 'analytics', title: 'Performance Analysis', description: 'Detailed performance metrics and trends' },

  // Automation Widgets
  { id: 'process-automation', component: 'ProcessAutomationWidget', module: 'processes', size: 'large', category: 'automation', title: 'Automation Status', description: 'Automation coverage and opportunities' },

  // Compliance Widgets
  { id: 'process-compliance', component: 'ProcessComplianceWidget', module: 'processes', size: 'medium', category: 'compliance', title: 'Compliance Monitoring', description: 'Process compliance and audit readiness' }
];

// Widget size configurations
const getSizeClass = (size: string) => {
  switch (size) {
    case 'small': return 'col-span-1 row-span-1';
    case 'medium': return 'col-span-2 row-span-1';
    case 'large': return 'col-span-2 row-span-2';
    case 'wide': return 'col-span-3 row-span-1';
    case 'tall': return 'col-span-1 row-span-2';
    default: return 'col-span-1 row-span-1';
  }
};

// Category colors
const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'overview': return 'bg-blue-50 border-blue-200';
    case 'analytics': return 'bg-green-50 border-green-200';  
    case 'automation': return 'bg-purple-50 border-purple-200';
    case 'compliance': return 'bg-orange-50 border-orange-200';
    default: return 'bg-gray-50 border-gray-200';
  }
};

// Sortable widget wrapper with resize functionality
function SortableWidget({ 
  widget, 
  children, 
  isEditMode,
  onResize,
  onRemove,
  onSizeChange,
  isPreview = false
}: { 
  widget: any; 
  children: React.ReactNode; 
  isEditMode: boolean;
  onResize: (id: string) => void;
  onRemove: (id: string) => void;
  onSizeChange: (id: string, size: 'small' | 'medium' | 'large' | 'wide' | 'tall') => void;
  isPreview?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
    position: 'relative' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${getSizeClass(widget.size)}`}
    >
      <div className="relative h-full">
        {/* Drag Handle - Only this area should be draggable */}
        {isEditMode && !isPreview && (
          <div 
            className="absolute top-2 left-2 z-10 cursor-move bg-white rounded border border-gray-300 shadow-sm p-1"
            {...attributes}
            {...listeners}
            title="Drag to reorder"
          >
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </div>
        )}
        
        {isEditMode && !isPreview && (
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            {/* Size controls */}
            <div className="flex bg-white rounded border border-gray-300 shadow-sm overflow-hidden">
              {(['small', 'medium', 'large', 'wide', 'tall'] as const).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`Button clicked: ${size} for widget ${widget.id}`);
                    onSizeChange(widget.id, size);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`px-2 py-1 text-xs font-mono border-r border-gray-200 last:border-r-0 transition-colors ${
                    widget.size === size
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={`Resize to ${size}`}
                >
                  {size.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Remove button clicked for widget ${widget.id}`);
                onRemove(widget.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="bg-red-500 text-white rounded w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-sm"
              title="Remove widget"
            >
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

interface ProcessDashboardCustomizerProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function ProcessDashboardCustomizer({ isEditMode, onToggleEditMode }: ProcessDashboardCustomizerProps) {
  const [widgets, setWidgets] = useState<ProcessWidgetConfig[]>([]);
  const [draggedWidget, setDraggedWidget] = useState<any>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load saved configuration or set defaults
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('process-dashboard-layout');
      if (saved) {
        try {
          setWidgets(JSON.parse(saved));
        } catch (e) {
          setWidgets(getDefaultLayout());
        }
      } else {
        setWidgets(getDefaultLayout());
      }
    }
  }, []);

  // Save configuration whenever widgets change
  useEffect(() => {
    if (typeof window !== 'undefined' && widgets.length > 0) {
      localStorage.setItem('process-dashboard-layout', JSON.stringify(widgets));
    }
  }, [widgets]);

  // Get default layout
  const getDefaultLayout = (): ProcessWidgetConfig[] => {
    return [
      PROCESS_WIDGET_CATALOG.find(w => w.id === 'process-stats')!,
      PROCESS_WIDGET_CATALOG.find(w => w.id === 'process-activity')!,
      PROCESS_WIDGET_CATALOG.find(w => w.id === 'process-workflows')!,
      PROCESS_WIDGET_CATALOG.find(w => w.id === 'process-efficiency')!,
    ];
  };

  const handleDragStart = (event: DragStartEvent) => {
    const draggedItem = widgets.find(w => w.id === event.active.id);
    setDraggedWidget(draggedItem);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedWidget(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addWidget = (widgetConfig: ProcessWidgetConfig) => {
    const newWidget = {
      ...widgetConfig,
      id: `${widgetConfig.component.toLowerCase()}-${Date.now()}`
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const handleResize = (widgetId: string) => {
    // This could trigger a more detailed resize modal, for now just cycle through sizes
    const widget = widgets.find(w => w.id === widgetId);
    if (widget) {
      const sizes = ['small', 'medium', 'large', 'wide', 'tall'];
      const currentIndex = sizes.indexOf(widget.size);
      const nextSize = sizes[(currentIndex + 1) % sizes.length];
      handleSizeChange(widgetId, nextSize as any);
    }
  };

  const handleSizeChange = (widgetId: string, newSize: 'small' | 'medium' | 'large' | 'wide' | 'tall') => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, size: newSize } : w
    ));
  };

  const handleCustomWidgetSave = (widgetConfig: any) => {
    const customWidget = {
      id: `custom-${Date.now()}`,
      component: 'DynamicCustomWidget',
      module: 'processes',
      size: 'medium' as const,
      category: 'analytics' as const,
      title: widgetConfig.title,
      description: 'Custom chart widget',
      config: widgetConfig
    };
    setWidgets(prev => [...prev, customWidget as any]);
    setIsBuilderOpen(false);
  };

  const resetLayout = () => {
    const defaultLayout = getDefaultLayout();
    setWidgets(defaultLayout);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('process-dashboard-layout');
    }
  };

  const renderWidget = (widget: any) => {
    if (widget.component === 'DynamicCustomWidget' && widget.config) {
      return <DynamicCustomWidget key={widget.id} config={widget.config} id={widget.id} isEditMode={isEditMode} />;
    }

    const WidgetComponent = PROCESS_WIDGET_COMPONENTS[widget.component];
    if (!WidgetComponent) {
      return (
        <div key={widget.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500">Widget not found: {widget.component}</p>
        </div>
      );
    }

    return <WidgetComponent key={widget.id} id={widget.id} isEditMode={isEditMode} />;
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
              <p className="text-gray-600 text-sm mt-1">Customise your workspace for maximum productivity</p>
            </div>
            <div className="flex gap-3">
              {isEditMode && (
                <>
                  <button 
                    onClick={() => setIsBuilderOpen(true)}
                    style={{ 
                      backgroundColor: '#3d3a72', 
                      color: '#ffffff', 
                      border: 'none',
                      padding: '10px 16px',
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
                      padding: '10px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s'
                    }}
                    className="hover:opacity-80"
                  >
                    Reset Dashboard
                  </button>
                </>
              )}
              
              <button 
                onClick={onToggleEditMode}
                style={{ 
                  backgroundColor: isEditMode ? '#10b981' : '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '10px 16px',
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
        </div>

        {/* Edit Mode Instructions */}
        {isEditMode && (
          <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
            <div className="flex items-center justify-center gap-6 text-sm text-blue-700">
              <span>🖱️ Drag to reorder</span>
              <span>📐 Click letters to resize</span>
              <span>💾 Auto-saves</span>
            </div>
          </div>
        )}

        {/* Widget Palette */}
        {isEditMode && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available Widgets</h3>
            
            {/* Category Tabs */}
            <div className="space-y-4">
              {['overview', 'analytics', 'automation', 'compliance'].map(category => {
                const categoryWidgets = PROCESS_WIDGET_CATALOG.filter(w => w.category === category);
                
                return (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                      {category} ({categoryWidgets.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {categoryWidgets.map((widget) => (
                        <div
                          key={widget.id}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                            widgets.find(w => w.component === widget.component) 
                              ? 'border-green-300 bg-green-50' 
                              : `border-dashed ${getCategoryColor(widget.category)}`
                          }`}
                          onClick={() => {
                            if (widgets.find(w => w.component === widget.component)) {
                              // Find the actual widget instance to remove
                              const existingWidget = widgets.find(w => w.component === widget.component);
                              if (existingWidget) {
                                removeWidget(existingWidget.id);
                              }
                            } else {
                              addWidget(widget);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{widget.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{widget.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                  {widget.size}
                                </span>
                              </div>
                            </div>
                            <div className="text-lg">
                              {widgets.find(w => w.component === widget.component) ? '✅' : '➕'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
          {widgets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
              {widgets.map((widget) => (
                <SortableWidget 
                  key={widget.id} 
                  widget={widget} 
                  isEditMode={isEditMode}
                  onResize={handleResize}
                  onRemove={removeWidget}
                  onSizeChange={handleSizeChange}
                >
                  {renderWidget(widget)}
                </SortableWidget>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets configured</h3>
              <p className="text-gray-500 mb-6">
                Get started by adding some widgets to customise your dashboard experience.
              </p>
              <button 
                onClick={onToggleEditMode}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                Add Widgets
              </button>
            </div>
          )}
        </SortableContext>

        <DragOverlay>
          {draggedWidget ? (
            <div className="opacity-90 transform rotate-3 shadow-2xl">
              {renderWidget(draggedWidget)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Custom Widget Builder */}
      <DrillDownWidgetBuilder 
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onSave={handleCustomWidgetSave}
        restrictToModule="processes" // Restrict to process-related metrics
      />
    </div>
  );
}