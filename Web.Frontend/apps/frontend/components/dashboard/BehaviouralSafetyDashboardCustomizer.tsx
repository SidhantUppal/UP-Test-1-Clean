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

// Behavioral Safety specific widget imports
import BehaviouralSafetyStatsWidget from './widgets/BehaviouralSafetyStatsWidget';
import BehaviouralSafetyActivityFeedWidget from './widgets/BehaviouralSafetyActivityFeedWidget';
import BehaviouralSafetyInterventionsWidget from './widgets/BehaviouralSafetyInterventionsWidget';
import BehaviouralSafetyPointsWidget from './widgets/BehaviouralSafetyPointsWidget';
import BehaviouralSafetyCategoryBreakdownWidget from './widgets/BehaviouralSafetyCategoryBreakdownWidget';
import BehaviouralSafetyQuickActionsWidget from './widgets/BehaviouralSafetyQuickActionsWidget';
import BehaviouralSafetyTrendsWidget from './widgets/BehaviouralSafetyTrendsWidget';
import BehaviouralSafetyParticipationWidget from './widgets/BehaviouralSafetyParticipationWidget';
import DynamicCustomWidget from './DynamicCustomWidget';
import DrillDownWidgetBuilder from './DrillDownWidgetBuilder';

// Behavioral Safety specific widget configuration
interface BehaviouralSafetyWidgetConfig {
  id: string;
  component: string;
  module: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  category: 'overview' | 'analytics' | 'engagement' | 'performance';
  title: string;
  description: string;
}

// Behavioral Safety focused widget registry
const BEHAVIOURAL_SAFETY_WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  BehaviouralSafetyStatsWidget,
  BehaviouralSafetyActivityFeedWidget,
  BehaviouralSafetyInterventionsWidget,
  BehaviouralSafetyPointsWidget,
  BehaviouralSafetyCategoryBreakdownWidget,
  BehaviouralSafetyQuickActionsWidget,
  BehaviouralSafetyTrendsWidget,
  BehaviouralSafetyParticipationWidget,
  DynamicCustomWidget
};

// Comprehensive behavioral safety widget catalog
const BEHAVIOURAL_SAFETY_WIDGET_CATALOG: BehaviouralSafetyWidgetConfig[] = [
  // Overview Widgets
  { id: 'behavioural-stats', component: 'BehaviouralSafetyStatsWidget', module: 'behavioural-safety', size: 'medium', category: 'overview', title: 'Safety Stats', description: 'Key behavioral safety metrics and daily reports' },
  { id: 'behavioural-activity', component: 'BehaviouralSafetyActivityFeedWidget', module: 'behavioural-safety', size: 'tall', category: 'overview', title: 'Activity Feed', description: 'Recent behavioral safety observations and actions' },
  { id: 'behavioural-interventions', component: 'BehaviouralSafetyInterventionsWidget', module: 'behavioural-safety', size: 'medium', category: 'overview', title: 'Interventions', description: 'Safety interventions and coaching opportunities' },
  { id: 'behavioural-quick-actions', component: 'BehaviouralSafetyQuickActionsWidget', module: 'behavioural-safety', size: 'wide', category: 'overview', title: 'Quick Actions', description: 'Common behavioral safety reporting actions' },

  // Analytics Widgets  
  { id: 'behavioural-trends', component: 'BehaviouralSafetyTrendsWidget', module: 'behavioural-safety', size: 'large', category: 'analytics', title: 'Safety Trends', description: 'Behavioral safety trends and patterns over time' },
  { id: 'behavioural-categories', component: 'BehaviouralSafetyCategoryBreakdownWidget', module: 'behavioural-safety', size: 'large', category: 'analytics', title: 'Category Analysis', description: 'Breakdown by observation categories and types' },

  // Engagement Widgets
  { id: 'behavioural-points', component: 'BehaviouralSafetyPointsWidget', module: 'behavioural-safety', size: 'medium', category: 'engagement', title: 'Team Points', description: 'Gamification points and team achievements' },
  { id: 'behavioural-participation', component: 'BehaviouralSafetyParticipationWidget', module: 'behavioural-safety', size: 'medium', category: 'engagement', title: 'Participation', description: 'User engagement and participation rates' }
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

// Category colors with green/teal theme
const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'overview': return 'bg-green-50 border-green-200';
    case 'analytics': return 'bg-teal-50 border-teal-200';  
    case 'engagement': return 'bg-emerald-50 border-emerald-200';
    case 'performance': return 'bg-cyan-50 border-cyan-200';
    default: return 'bg-gray-50 border-gray-200';
  }
};

// Sortable Widget Component
function SortableWidget({ 
  widget, 
  isEditMode, 
  onRemove, 
  onSizeChange 
}: { 
  widget: BehaviouralSafetyWidgetConfig, 
  isEditMode: boolean,
  onRemove: (id: string) => void,
  onSizeChange: (id: string, size: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component = BEHAVIOURAL_SAFETY_WIDGET_COMPONENTS[widget.component];
  const isCustomWidget = widget.component === 'DynamicCustomWidget';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${getSizeClass(widget.size)} transition-all duration-300 ${isDragging ? 'z-50' : ''}`}
    >
      <div className={`relative group h-full rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${getCategoryColor(widget.category)} ${isEditMode ? 'ring-2 ring-transparent hover:ring-green-300' : ''}`}>
        {isEditMode && (
          <>
            {/* Controls */}
            <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
              {/* Module Badge */}
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-600 rounded-full border">
                behavioural
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
            <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {(['small', 'medium', 'large', 'wide', 'tall'] as const).map((size, index) => (
                  <button
                    key={size}
                    onClick={() => onSizeChange(widget.id, size)}
                    className={`px-2 py-1 text-xs font-bold transition-all ${
                      widget.size === size 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    } ${size !== 'small' ? 'border-l border-gray-200' : ''}`}
                    title={`${size} size`}
                  >
                    {size[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(widget.id)}
              style={{
                background: '#ef4444',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white'
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

// Main Behavioral Safety Dashboard Customizer Component
interface BehaviouralSafetyDashboardCustomizerProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function BehaviouralSafetyDashboardCustomizer({ 
  isEditMode, 
  onToggleEditMode
}: BehaviouralSafetyDashboardCustomizerProps) {
  const [widgets, setWidgets] = useState<BehaviouralSafetyWidgetConfig[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showWidgetPalette, setShowWidgetPalette] = useState(false);
  const [showDrillDownBuilder, setShowDrillDownBuilder] = useState(false);

  // Load saved configuration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('behavioural-safety-dashboard-layout');
      if (saved) {
        try {
          setWidgets(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load saved layout:', error);
          loadDefaultLayout();
        }
      } else {
        loadDefaultLayout();
      }
    }
  }, []);

  // Auto-save configuration
  useEffect(() => {
    if (typeof window !== 'undefined' && widgets.length > 0) {
      localStorage.setItem('behavioural-safety-dashboard-layout', JSON.stringify(widgets));
    }
  }, [widgets]);

  const loadDefaultLayout = () => {
    const defaultWidgets = [
      BEHAVIOURAL_SAFETY_WIDGET_CATALOG.find(w => w.id === 'behavioural-stats'),
      BEHAVIOURAL_SAFETY_WIDGET_CATALOG.find(w => w.id === 'behavioural-activity'),
      BEHAVIOURAL_SAFETY_WIDGET_CATALOG.find(w => w.id === 'behavioural-interventions'),
      BEHAVIOURAL_SAFETY_WIDGET_CATALOG.find(w => w.id === 'behavioural-quick-actions')
    ].filter(Boolean) as BehaviouralSafetyWidgetConfig[];
    
    setWidgets(defaultWidgets);
  };

  const resetLayout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('behavioural-safety-dashboard-layout');
      loadDefaultLayout();
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
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
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  };

  const addWidget = (widgetConfig: BehaviouralSafetyWidgetConfig) => {
    const newWidget = {
      ...widgetConfig,
      id: `${widgetConfig.id}-${Date.now()}`
    };
    setWidgets(prev => [...prev, newWidget]);
    setShowWidgetPalette(false);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const updateWidgetSize = (widgetId: string, newSize: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, size: newSize as any } : w
    ));
  };

  const addCustomWidget = (config: any) => {
    const customWidget = {
      id: `custom-${Date.now()}`,
      component: 'DynamicCustomWidget',
      module: 'behavioural-safety',
      size: 'medium' as const,
      category: 'analytics' as const,
      title: config.title,
      description: 'Custom chart widget',
      config: config
    };
    setWidgets(prev => [...prev, customWidget]);
    setShowDrillDownBuilder(false);
  };

  const filteredWidgets = selectedCategory === 'all' 
    ? BEHAVIOURAL_SAFETY_WIDGET_CATALOG
    : BEHAVIOURAL_SAFETY_WIDGET_CATALOG.filter(w => w.category === selectedCategory);

  const activeWidget = widgets.find(w => w.id === activeId);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Behavioral Safety Dashboard</h2>
            <p className="text-gray-600 text-sm mt-1">Customise your behavioral safety management workspace</p>
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
                  Safety Widgets
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
              <h3 className="text-lg font-semibold text-gray-900">Behavioral Safety Widget Library</h3>
              <button
                onClick={() => setShowWidgetPalette(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <div className="flex gap-2 flex-wrap">
                {['all', 'overview', 'analytics', 'engagement', 'performance'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWidgets.map(widget => (
                <div key={widget.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <h4 className="font-medium text-gray-900 text-sm">{widget.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 mb-3">{widget.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(widget.category)} text-gray-700`}>
                      {widget.category}
                    </span>
                    <button
                      onClick={() => addWidget(widget)}
                      style={{ 
                        backgroundColor: '#3d3a72', 
                        color: '#ffffff', 
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontSize: '12px',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover:opacity-80"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Empty Behavioral Safety Dashboard</h3>
            <p className="text-gray-600 text-center max-w-sm">
              Get started by adding behavioral safety widgets to customize your safety monitoring workspace.
            </p>
            {isEditMode && (
              <button
                onClick={() => setShowWidgetPalette(true)}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                Add Your First Safety Widget
              </button>
            )}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
              <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
                {widgets.map(widget => (
                  <SortableWidget
                    key={widget.id}
                    widget={widget}
                    isEditMode={isEditMode}
                    onRemove={removeWidget}
                    onSizeChange={updateWidgetSize}
                  />
                ))}
              </SortableContext>
            </div>

            <DragOverlay>
              {activeId && activeWidget ? (
                <div className={`${getSizeClass(activeWidget.size)} ${getCategoryColor(activeWidget.category)} rounded-xl shadow-xl opacity-90`}>
                  <div className="p-4 h-full flex items-center justify-center">
                    <span className="font-medium text-gray-900">{activeWidget.title}</span>
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {/* Drill Down Builder Modal */}
      {showDrillDownBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <DrillDownWidgetBuilder
              isOpen={showDrillDownBuilder}
              onClose={() => setShowDrillDownBuilder(false)}
              onSave={addCustomWidget}
              restrictToModule="behavioural-safety"
            />
          </div>
        </div>
      )}
    </div>
  );
}