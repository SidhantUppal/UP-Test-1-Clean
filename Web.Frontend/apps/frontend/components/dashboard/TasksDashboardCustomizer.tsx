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

// Task-specific widget imports
import TaskStatsWidget from './widgets/TaskStatsWidget';
import TaskKPIBenchmarkWidget from './widgets/TaskKPIBenchmarkWidget';
import TaskProgressWidget from './modules/TaskProgressWidget';
import TaskActivityFeedWidget from './widgets/TaskActivityFeedWidget';
import TaskPriorityWidget from './widgets/TaskPriorityWidget';
import TaskCompletionTrendsWidget from './widgets/TaskCompletionTrendsWidget';
import TaskTeamPerformanceWidget from './widgets/TaskTeamPerformanceWidget';
import TaskQuickActionsWidget from './widgets/TaskQuickActionsWidget';
import TaskOverdueAlertsWidget from './widgets/TaskOverdueAlertsWidget';
import TaskCategoryBreakdownWidget from './widgets/TaskCategoryBreakdownWidget';
import DynamicCustomWidget from './DynamicCustomWidget';
import DrillDownWidgetBuilder from './DrillDownWidgetBuilder';

// Task-specific widget configuration
interface TaskWidgetConfig {
  id: string;
  component: string;
  module: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  category: 'overview' | 'analytics' | 'operations' | 'performance';
  title: string;
  description: string;
}

// Task-focused widget registry
const TASK_WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  TaskStatsWidget,
  TaskKPIBenchmarkWidget,
  TaskProgressWidget,
  TaskActivityFeedWidget,
  TaskPriorityWidget,
  TaskCompletionTrendsWidget,
  TaskTeamPerformanceWidget,
  TaskQuickActionsWidget,
  TaskOverdueAlertsWidget,
  TaskCategoryBreakdownWidget,
  DynamicCustomWidget
};

// Task-specific widget catalog
const TASK_WIDGET_CATALOG: TaskWidgetConfig[] = [
  // Overview widgets
  { id: 'task-stats', component: 'TaskStatsWidget', module: 'tasks', size: 'medium', category: 'overview', title: 'Task Stats', description: 'Key task metrics at a glance' },
  { id: 'task-kpi-benchmark', component: 'TaskKPIBenchmarkWidget', module: 'tasks', size: 'medium', category: 'performance', title: 'KPIs & Benchmarks', description: 'Task performance vs industry standards' },
  { id: 'task-activity-feed', component: 'TaskActivityFeedWidget', module: 'tasks', size: 'medium', category: 'overview', title: 'Task Activity', description: 'Recent task updates and changes' },
  { id: 'task-quick-actions', component: 'TaskQuickActionsWidget', module: 'tasks', size: 'small', category: 'operations', title: 'Quick Actions', description: 'Common task operations' },
  
  // Analytics widgets  
  { id: 'task-completion-trends', component: 'TaskCompletionTrendsWidget', module: 'tasks', size: 'wide', category: 'analytics', title: 'Completion Trends', description: 'Task completion analytics over time' },
  { id: 'task-category-breakdown', component: 'TaskCategoryBreakdownWidget', module: 'tasks', size: 'medium', category: 'analytics', title: 'Category Breakdown', description: 'Tasks by category and status' },
  
  // Operations widgets
  { id: 'task-progress', component: 'TaskProgressWidget', module: 'tasks', size: 'medium', category: 'operations', title: 'Task Progress', description: 'Current task status overview' },
  { id: 'task-priority', component: 'TaskPriorityWidget', module: 'tasks', size: 'small', category: 'operations', title: 'Priority Tasks', description: 'High priority task alerts' },
  { id: 'task-overdue-alerts', component: 'TaskOverdueAlertsWidget', module: 'tasks', size: 'small', category: 'operations', title: 'Overdue Alerts', description: 'Tasks requiring attention' },
  
  // Performance widgets
  { id: 'task-team-performance', component: 'TaskTeamPerformanceWidget', module: 'tasks', size: 'large', category: 'performance', title: 'Team Performance', description: 'Task completion by team members' }
];

// Sortable Task Widget Component
function SortableTaskWidget({ 
  widget, 
  isEditMode, 
  onRemove,
  onSizeChange,
}: { 
  widget: TaskWidgetConfig; 
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
    Component = TASK_WIDGET_COMPONENTS[widget.component];
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
      case 'analytics': return 'border-blue-200 bg-blue-50/30';
      case 'operations': return 'border-green-200 bg-green-50/30';
      case 'performance': return 'border-purple-200 bg-purple-50/30';
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
      <div className={`relative group h-full rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${getCategoryColor()} ${isEditMode ? 'ring-2 ring-transparent hover:ring-blue-300' : ''}`}>
        {isEditMode && (
          <>
            {/* Controls */}
            <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
              {/* Module Badge */}
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-600 rounded-full border">
                tasks
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
                      ? 'bg-blue-500 text-white' 
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

// Main Tasks Dashboard Customizer Component
interface TasksDashboardCustomizerProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function TasksDashboardCustomizer({ 
  isEditMode, 
  onToggleEditMode
}: TasksDashboardCustomizerProps) {
  const [widgets, setWidgets] = useState<TaskWidgetConfig[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showWidgetPalette, setShowWidgetPalette] = useState(false);
  const [showDrillDownBuilder, setShowDrillDownBuilder] = useState(false);

  // Load saved configuration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tasks-dashboard-layout');
      if (saved) {
        try {
          setWidgets(JSON.parse(saved));
        } catch (e) {
          setWidgets(getDefaultTaskLayout());
        }
      } else {
        setWidgets(getDefaultTaskLayout());
      }
    }
  }, []);

  // Save configuration
  useEffect(() => {
    if (typeof window !== 'undefined' && widgets.length > 0) {
      localStorage.setItem('tasks-dashboard-layout', JSON.stringify(widgets));
    }
  }, [widgets]);

  // Get default task dashboard layout
  const getDefaultTaskLayout = (): TaskWidgetConfig[] => {
    return [
      TASK_WIDGET_CATALOG.find(w => w.id === 'task-stats')!,
      TASK_WIDGET_CATALOG.find(w => w.id === 'task-kpi-benchmark')!,
      TASK_WIDGET_CATALOG.find(w => w.id === 'task-activity-feed')!,
      TASK_WIDGET_CATALOG.find(w => w.id === 'task-progress')!,
      TASK_WIDGET_CATALOG.find(w => w.id === 'task-quick-actions')!,
    ];
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

  const addWidget = (widgetConfig: TaskWidgetConfig) => {
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
      module: 'tasks',
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
    const defaultLayout = getDefaultTaskLayout();
    setWidgets(defaultLayout);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tasks-dashboard-layout');
    }
  };

  // Filter widgets for palette
  const filteredWidgets = TASK_WIDGET_CATALOG.filter(widget => {
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
            <h2 className="text-xl font-semibold text-gray-900">Tasks Dashboard</h2>
            <p className="text-gray-600 text-sm mt-1">Customise your task management workspace</p>
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
                  Task Widgets
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
                backgroundColor: isEditMode ? '#10B981' : '#3d3a72', 
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
              <h3 className="text-lg font-semibold text-gray-900">Task Widget Library</h3>
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="overview">Overview</option>
                <option value="analytics">Analytics</option>
                <option value="operations">Operations</option>
                <option value="performance">Performance</option>
              </select>
            </div>
            
            {/* Widget Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => addWidget(widget)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{widget.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{widget.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 capitalize">{widget.module}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      widget.category === 'analytics' ? 'bg-blue-100 text-blue-800' :
                      widget.category === 'operations' ? 'bg-green-100 text-green-800' :
                      widget.category === 'performance' ? 'bg-purple-100 text-purple-800' :
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
        <div className="mx-6 mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Task Dashboard Customization Mode</span>
            </div>
            <div className="text-sm text-blue-700 space-x-4">
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
                <SortableTaskWidget 
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
                  
                  const Component = TASK_WIDGET_COMPONENTS[widget.component];
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Empty Tasks Dashboard</h3>
          <p className="text-gray-600 text-center max-w-sm">
            Get started by adding task-focused widgets to customize your task management experience.
          </p>
          {isEditMode && (
            <button
              onClick={() => setShowWidgetPalette(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Your First Task Widget
            </button>
          )}
        </div>
      )}

      {/* Drill-Down Widget Builder */}
      <DrillDownWidgetBuilder
        isOpen={showDrillDownBuilder}
        onClose={() => setShowDrillDownBuilder(false)}
        onSave={addCustomWidget}
        restrictToModule="tasks"
      />
    </div>
  );
}