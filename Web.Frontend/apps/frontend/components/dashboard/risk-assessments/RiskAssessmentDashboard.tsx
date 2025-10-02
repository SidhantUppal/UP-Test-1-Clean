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

// Import all risk assessment widgets
import RiskStatsWidget from './widgets/RiskStatsWidget';
import RiskTrendChartWidget from './widgets/RiskTrendChartWidget';
import RiskDistributionWidget from './widgets/RiskDistributionWidget';
import AssessmentStatusWidget from './widgets/AssessmentStatusWidget';
import OverdueRiskAssessmentsWidget from './widgets/OverdueRiskAssessmentsWidget';
import HighRiskItemsWidget from './widgets/HighRiskItemsWidget';
import RecentRiskAssessmentsWidget from './widgets/RecentRiskAssessmentsWidget';
import RiskQuickActionsWidget from './widgets/RiskQuickActionsWidget';

// Widget configuration
interface WidgetConfig {
  id: string;
  component: string;
  size: 'small' | 'medium' | 'large';
}

const WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  RiskStatsWidget,
  RiskTrendChartWidget,
  RiskDistributionWidget,
  AssessmentStatusWidget,
  OverdueRiskAssessmentsWidget,
  HighRiskItemsWidget,
  RecentRiskAssessmentsWidget,
  RiskQuickActionsWidget
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
      case 'small': return 'col-span-1';
      case 'medium': return 'col-span-1 md:col-span-2';
      case 'large': return 'col-span-1 md:col-span-2 lg:col-span-3';
      default: return 'col-span-1';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${getSizeClass()} ${isDragging ? 'z-50' : ''} transition-all duration-300`}
    >
      <div className={`relative group ${isEditMode ? 'ring-2 ring-transparent hover:ring-purple-300' : ''}`}>
        {isEditMode && (
          <>
            {/* Resize Controls */}
            <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10 flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-2">
              {/* Drag Handle */}
              <div 
                {...attributes} 
                {...listeners}
                className="bg-gray-800 text-white rounded px-1.5 md:px-2 py-1 cursor-grab hover:cursor-grabbing hover:bg-gray-900 shadow-lg transition-all text-xs md:text-sm"
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
                  className={`px-1.5 md:px-2 py-1 text-xs font-bold transition-all ${
                    widget.size === 'small' 
                      ? 'bg-purple-500 text-white' 
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
                  className={`px-1.5 md:px-2 py-1 text-xs font-bold transition-all border-l border-r border-gray-200 ${
                    widget.size === 'medium' 
                      ? 'bg-purple-500 text-white' 
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
                  className={`px-1.5 md:px-2 py-1 text-xs font-bold transition-all ${
                    widget.size === 'large' 
                      ? 'bg-purple-500 text-white' 
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
              className="absolute bottom-2 md:bottom-3 right-2 md:right-3 z-10 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100"
              title="Remove widget"
            >
              <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

interface RiskAssessmentDashboardProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function RiskAssessmentDashboard({ isEditMode, onToggleEditMode }: RiskAssessmentDashboardProps) {
  // Default widget configuration for risk assessments
  const defaultWidgets: WidgetConfig[] = [
    { id: 'risk-stats', component: 'RiskStatsWidget', size: 'medium' },
    { id: 'risk-trend-chart', component: 'RiskTrendChartWidget', size: 'medium' },
    { id: 'risk-distribution', component: 'RiskDistributionWidget', size: 'small' },
    { id: 'assessment-status', component: 'AssessmentStatusWidget', size: 'small' },
    { id: 'overdue-assessments', component: 'OverdueRiskAssessmentsWidget', size: 'small' },
    { id: 'high-risk-items', component: 'HighRiskItemsWidget', size: 'small' },
    { id: 'recent-assessments', component: 'RecentRiskAssessmentsWidget', size: 'small' },
    { id: 'risk-quick-actions', component: 'RiskQuickActionsWidget', size: 'small' }
  ];

  // Load saved layout from localStorage
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('risk-assessment-dashboard-layout');
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
      localStorage.setItem('risk-assessment-dashboard-layout', JSON.stringify(widgets));
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

  const resetLayout = () => {
    setWidgets(defaultWidgets);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('risk-assessment-dashboard-layout');
    }
  };

  const addWidget = (componentName: string) => {
    const newWidget: WidgetConfig = {
      id: `${componentName.toLowerCase()}-${Date.now()}`,
      component: componentName,
      size: 'small'
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const availableWidgets = [
    { name: 'RiskStatsWidget', label: 'Risk Stats' },
    { name: 'RiskTrendChartWidget', label: 'Risk Trends 📈' },
    { name: 'RiskDistributionWidget', label: 'Risk Distribution 🥧' },
    { name: 'AssessmentStatusWidget', label: 'Assessment Status 📊' },
    { name: 'OverdueRiskAssessmentsWidget', label: 'Overdue Items' },
    { name: 'HighRiskItemsWidget', label: 'High Risk Items 🚨' },
    { name: 'RecentRiskAssessmentsWidget', label: 'Recent Assessments' },
    { name: 'RiskQuickActionsWidget', label: 'Quick Actions' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Risk Assessment Dashboard</h2>
        <div className="flex flex-col sm:flex-row gap-2">
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
                transition: 'opacity 0.2s',
                textAlign: 'center',
                whiteSpace: 'nowrap'
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
              transition: 'opacity 0.2s',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}
            className="hover:opacity-80"
          >
            {isEditMode ? '✓ Save Layout' : '⚙️ Customize'}
          </button>
        </div>
      </div>

      {isEditMode && (
        <>
          <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm text-purple-700">
                <strong>Edit Mode Active:</strong> Customize your risk assessment dashboard layout
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-purple-600">
                <span>📱 Drag to move</span>
                <span>📏 Click S/M/L to resize</span>
                <span>💾 Auto-saves</span>
              </div>
            </div>
          </div>

          {/* Widget Selection Panel */}
          <div className="mb-6 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3 text-sm md:text-base">➕ Add Risk Assessment Widgets</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {availableWidgets.map((widget) => (
                <button
                  key={widget.name}
                  onClick={() => addWidget(widget.name)}
                  className="px-2 md:px-3 py-2 text-xs md:text-sm bg-white border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all text-gray-700 hover:text-purple-700 text-left"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">
            {widgets.map((widget) => (
              <SortableWidget 
                key={widget.id}
                widget={widget} 
                isEditMode={isEditMode}
                onResize={() => {}}
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
            <li>• <strong>Resize:</strong> Click S/M/L buttons to change widget size</li>
            <li>• <strong>Remove:</strong> Hover over widgets and click the ✕ button</li>
            <li>• <strong>Save:</strong> Click "Save Layout" when done to preserve your changes</li>
          </ul>
        </div>
      )}
    </div>
  );
}