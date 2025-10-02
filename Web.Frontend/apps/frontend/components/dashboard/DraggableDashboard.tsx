"use client";

import React, { useState } from 'react';
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
import {
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Import all widgets
import QuickStatsWidget from './widgets/QuickStatsWidget';
import ActivityFeedWidget from './widgets/ActivityFeedWidget';
import ProgressRingWidget from './widgets/ProgressRingWidget';
import QuickActionsWidget from './widgets/QuickActionsWidget';
import RecentIncidentsWidget from './widgets/RecentIncidentsWidget';
import RiskAssessmentsWidget from './widgets/RiskAssessmentsWidget';
import ComplianceOverviewWidget from './widgets/ComplianceOverviewWidget';
import IncidentTrendWidget from './widgets/IncidentTrendWidget';
import SafetyMetricsWidget from './widgets/SafetyMetricsWidget';

// Widget configuration
interface WidgetConfig {
  id: string;
  component: string;
  size: 'small' | 'medium' | 'large';
}

const WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  QuickStatsWidget,
  ActivityFeedWidget,
  ProgressRingWidget,
  QuickActionsWidget,
  RecentIncidentsWidget,
  RiskAssessmentsWidget,
  ComplianceOverviewWidget,
  IncidentTrendWidget,
  SafetyMetricsWidget
};

// Sortable Widget Component
function SortableWidget({ 
  widget, 
  isEditMode, 
  onResize,
  onRemove,
  onSizeChange
}: { 
  widget: WidgetConfig; 
  isEditMode: boolean;
  onResize: (id: string) => void;
  onRemove: (id: string) => void;
  onSizeChange: (id: string, size: 'small' | 'medium' | 'large') => void;
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

  const Component = WIDGET_COMPONENTS[widget.component];
  if (!Component) return null;

  const getSizeClass = () => {
    switch (widget.size) {
      case 'small': return 'lg:col-span-1';
      case 'medium': return 'lg:col-span-2';
      case 'large': return 'lg:col-span-3';
      default: return 'lg:col-span-1';
    }
  };

  const getSizeLabel = () => {
    switch (widget.size) {
      case 'small': return 'S';
      case 'medium': return 'M';
      case 'large': return 'L';
      default: return 'S';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${getSizeClass()} ${isDragging ? 'z-50' : ''} transition-all duration-300`}
    >
      <div className={`relative group ${isEditMode ? 'ring-2 ring-transparent hover:ring-blue-300' : ''}`}>
        {isEditMode && (
          <>
            {/* Resize Controls - More intuitive */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              {/* Drag Handle */}
              <div 
                {...attributes} 
                {...listeners}
                className="bg-gray-800 text-white rounded px-2 py-1 cursor-grab hover:cursor-grabbing hover:bg-gray-900 shadow-lg transition-all"
                title="Drag to move widget"
                style={{ touchAction: 'none' }}
              >
                ⋮⋮
              </div>
              {/* Size selector buttons */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex overflow-hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSizeChange(widget.id, 'small');
                  }}
                  className={`px-2 py-1 text-xs font-bold transition-all ${
                    widget.size === 'small' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Small size (1 column)"
                >
                  S
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSizeChange(widget.id, 'medium');
                  }}
                  className={`px-2 py-1 text-xs font-bold transition-all border-l border-r border-gray-200 ${
                    widget.size === 'medium' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Medium size (2 columns)"
                >
                  M
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSizeChange(widget.id, 'large');
                  }}
                  className={`px-2 py-1 text-xs font-bold transition-all ${
                    widget.size === 'large' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Large size (3 columns)"
                >
                  L
                </button>
              </div>
            </div>
            
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Remove this widget from dashboard?')) {
                  onRemove(widget.id);
                }
              }}
              className="absolute bottom-3 right-3 z-10 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100"
              title="Remove widget"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        )}
        
        <div className={isEditMode ? 'pointer-events-none' : ''}>
          <Component id={widget.id} isEditMode={isEditMode} />
        </div>
      </div>
    </div>
  );
}

interface DraggableDashboardProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function DraggableDashboard({ isEditMode, onToggleEditMode }: DraggableDashboardProps) {
  // Default widget configuration
  const defaultWidgets: WidgetConfig[] = [
    { id: 'quick-stats', component: 'QuickStatsWidget', size: 'medium' },
    { id: 'incident-trends', component: 'IncidentTrendWidget', size: 'medium' },
    { id: 'safety-metrics', component: 'SafetyMetricsWidget', size: 'small' },
    { id: 'recent-incidents', component: 'RecentIncidentsWidget', size: 'small' },
    { id: 'activity-feed', component: 'ActivityFeedWidget', size: 'small' },
    { id: 'risk-assessments', component: 'RiskAssessmentsWidget', size: 'small' },
    { id: 'compliance-overview', component: 'ComplianceOverviewWidget', size: 'small' }
  ];

  // Load saved layout from localStorage
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboard-layout');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return defaultWidgets;
        }
      }
    }
    return defaultWidgets;
  });
  
  const [activeId, setActiveId] = useState<string | null>(null);

  // Save layout to localStorage when it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !isEditMode) {
      localStorage.setItem('dashboard-layout', JSON.stringify(widgets));
    }
  }, [widgets, isEditMode]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: isEditMode ? 8 : 1000, // Only allow drag in edit mode
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

  const toggleWidgetSize = (widgetId: string) => {
    if (!isEditMode) return;
    
    setWidgets(prev => prev.map(w => {
      if (w.id === widgetId) {
        const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
        const currentIndex = sizes.indexOf(w.size);
        const nextIndex = (currentIndex + 1) % sizes.length;
        return { ...w, size: sizes[nextIndex] };
      }
      return w;
    }));
  };

  const resetLayout = () => {
    setWidgets(defaultWidgets);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dashboard-layout');
    }
  };

  // Force reset to new default layout on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboard-layout');
      if (saved) {
        try {
          const savedWidgets = JSON.parse(saved);
          // Check if saved layout has the old widgets we want to remove OR if we need to update sizes
          const hasOldWidgets = savedWidgets.some((w: WidgetConfig) => 
            w.component === 'QuickActionsWidget' || w.component === 'ProgressRingWidget'
          );
          const needsSizeUpdate = savedWidgets.length !== defaultWidgets.length;
          if (hasOldWidgets || needsSizeUpdate) {
            // Remove old layout and use new default
            localStorage.removeItem('dashboard-layout');
            setWidgets(defaultWidgets);
          }
        } catch (e) {
          // Invalid saved data, use default
          localStorage.removeItem('dashboard-layout');
          setWidgets(defaultWidgets);
        }
      }
    }
  }, []);

  const addWidget = (componentName: string) => {
    const newWidget: WidgetConfig = {
      id: `${componentName.toLowerCase()}-${Date.now()}`,
      component: componentName,
      size: 'small'
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const availableWidgets = [
    { name: 'QuickStatsWidget', label: 'Quick Stats' },
    { name: 'ActivityFeedWidget', label: 'Recent Activity' },
    { name: 'ProgressRingWidget', label: 'Progress Rings' },
    { name: 'QuickActionsWidget', label: 'Quick Actions' },
    { name: 'RecentIncidentsWidget', label: 'Recent Incidents' },
    { name: 'RiskAssessmentsWidget', label: 'Risk Assessments' },
    { name: 'ComplianceOverviewWidget', label: 'Compliance Overview' },
    { name: 'IncidentTrendWidget', label: 'Incident Trends 📈' },
    { name: 'SafetyMetricsWidget', label: 'Safety Metrics 🎯' }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Dashboard</h2>
        <div className="flex gap-2">
          {isEditMode && (
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
              ↺ Reset Layout
            </button>
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
            {isEditMode ? '✓ Save Layout' : '⚙️ Customize'}
          </button>
        </div>
      </div>

      {isEditMode && (
        <>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-700">
                <strong>Edit Mode Active:</strong> Customize your dashboard layout
              </p>
              <div className="flex gap-4 text-xs text-blue-600">
                <span>📱 Drag to move</span>
                <span>📏 Click S/M/L to resize</span>
                <span>💾 Auto-saves</span>
              </div>
            </div>
          </div>

          {/* Widget Selection Panel */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">➕ Add Widgets</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {availableWidgets.map((widget) => (
                <button
                  key={widget.name}
                  onClick={() => addWidget(widget.name)}
                  className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-gray-700 hover:text-blue-700"
                  title={`Add ${widget.label} widget`}
                >
                  + {widget.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
            {widgets.map((widget) => (
              <SortableWidget 
                key={widget.id}
                widget={widget} 
                isEditMode={isEditMode}
                onResize={toggleWidgetSize}
                onRemove={(id: string) => {
                  setWidgets(prev => prev.filter(w => w.id !== id));
                }}
                onSizeChange={(id: string, size: 'small' | 'medium' | 'large') => {
                  setWidgets(prev => prev.map(w => 
                    w.id === id ? { ...w, size } : w
                  ));
                }}
              />
            ))}
          </div>
        </SortableContext>
        
        <DragOverlay>
          {activeId ? (
            <div className="opacity-80 shadow-2xl">
              {(() => {
                const widget = widgets.find(w => w.id === activeId);
                if (!widget) return null;
                const Component = WIDGET_COMPONENTS[widget.component];
                return Component ? <Component id={activeId} /> : null;
              })()}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {isEditMode && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">🎯 How to Customize:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Drag:</strong> Use the ⋮⋮ handle to drag and reorder widgets</li>
            <li>• <strong>Resize:</strong> Click on any widget to cycle through sizes (Small → Medium → Large)</li>
            <li>• <strong>Save:</strong> Click "Save Layout" when done to preserve your changes</li>
          </ul>
        </div>
      )}
    </div>
  );
}