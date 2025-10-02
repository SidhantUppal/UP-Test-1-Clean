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
import dynamic from 'next/dynamic';
import DynamicCustomWidget from './DynamicCustomWidget';

// Dynamically import widgets
const EnvironmentalStatsWidget = dynamic(() => import('./widgets/EnvironmentalStatsWidget'), { ssr: false });
const EnvironmentalIncidentMapWidget = dynamic(() => import('./widgets/EnvironmentalIncidentMapWidget'), { ssr: false });
const EnvironmentalComplianceWidget = dynamic(() => import('./widgets/EnvironmentalComplianceWidget'), { ssr: false });
const EnvironmentalTrendsWidget = dynamic(() => import('./widgets/EnvironmentalTrendsWidget'), { ssr: false });
const EnvironmentalCategoriesWidget = dynamic(() => import('./widgets/EnvironmentalCategoriesWidget'), { ssr: false });
const EnvironmentalParticipationWidget = dynamic(() => import('./widgets/EnvironmentalParticipationWidget'), { ssr: false });
const EnvironmentalRecentReportsWidget = dynamic(() => import('./widgets/EnvironmentalRecentReportsWidget'), { ssr: false });
const EnvironmentalCorrectiveActionsWidget = dynamic(() => import('./widgets/EnvironmentalCorrectiveActionsWidget'), { ssr: false });

const DrillDownWidgetBuilder = dynamic(() => import('./DrillDownWidgetBuilder'), { ssr: false });

// Environmental theme colors - earth/nature tones
const ENVIRONMENTAL_THEME = {
  primary: '#2D5016', // Forest green
  secondary: '#8B7355', // Earth brown
  accent: '#4A7C59', // Sage green
  light: '#E8F5E9' // Light green
};

interface EnvironmentalWidgetConfig {
  id: string;
  component: string;
  module: string;
  size: 'small' | 'medium' | 'large' | 'full';
  category: 'overview' | 'analytics' | 'operations' | 'compliance' | 'engagement';
  title: string;
  description: string;
}

const ENVIRONMENTAL_WIDGET_CATALOG: EnvironmentalWidgetConfig[] = [
  { id: 'environmental-stats', component: 'EnvironmentalStatsWidget', module: 'environmental', size: 'medium', category: 'overview', title: 'Environmental Stats', description: 'Key environmental metrics at a glance' },
  { id: 'incident-map', component: 'EnvironmentalIncidentMapWidget', module: 'environmental', size: 'large', category: 'analytics', title: 'Incident Map', description: 'Geographic distribution of environmental incidents' },
  { id: 'compliance-score', component: 'EnvironmentalComplianceWidget', module: 'environmental', size: 'small', category: 'compliance', title: 'Compliance Score', description: 'Environmental compliance metrics' },
  { id: 'environmental-trends', component: 'EnvironmentalTrendsWidget', module: 'environmental', size: 'medium', category: 'analytics', title: 'Environmental Trends', description: 'Trend analysis of environmental data' },
  { id: 'categories-breakdown', component: 'EnvironmentalCategoriesWidget', module: 'environmental', size: 'medium', category: 'analytics', title: 'Categories Breakdown', description: 'Distribution by environmental categories' },
  { id: 'participation-rate', component: 'EnvironmentalParticipationWidget', module: 'environmental', size: 'medium', category: 'engagement', title: 'Participation Rate', description: 'User engagement in environmental reporting' },
  { id: 'recent-reports', component: 'EnvironmentalRecentReportsWidget', module: 'environmental', size: 'large', category: 'operations', title: 'Recent Reports', description: 'Latest environmental incident reports' },
  { id: 'corrective-actions', component: 'EnvironmentalCorrectiveActionsWidget', module: 'environmental', size: 'medium', category: 'operations', title: 'Corrective Actions', description: 'Environmental corrective action tracking' }
];

interface EnvironmentalDashboardCustomizerProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

function SortableWidget({ 
  widget, 
  isEditMode, 
  onRemove,
  onSizeChange,
}: { 
  widget: EnvironmentalWidgetConfig; 
  isEditMode: boolean;
  onRemove: (id: string) => void;
  onSizeChange: (id: string, size: 'small' | 'medium' | 'large' | 'full') => void;
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
    opacity: isDragging ? 0.5 : 1,
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-1 row-span-1';
      case 'medium': return 'col-span-2 row-span-1';
      case 'large': return 'col-span-3 row-span-2';
      case 'full': return 'col-span-4 row-span-2';
      default: return 'col-span-2 row-span-1';
    }
  };

  // Get the component
  let Component: React.ComponentType<any> | null = null;
  const isCustomWidget = widget.component === 'DynamicCustomWidget';
  
  if (!isCustomWidget) {
    const ENVIRONMENTAL_WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
      EnvironmentalStatsWidget,
      EnvironmentalIncidentMapWidget,
      EnvironmentalComplianceWidget,
      EnvironmentalTrendsWidget,
      EnvironmentalCategoriesWidget,
      EnvironmentalParticipationWidget,
      EnvironmentalRecentReportsWidget,
      EnvironmentalCorrectiveActionsWidget
    };
    Component = ENVIRONMENTAL_WIDGET_COMPONENTS[widget.component];
    if (!Component) return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isEditMode ? { ...attributes, ...listeners } : {})}
      className={`${getSizeClass(widget.size)} ${isEditMode ? 'cursor-move' : ''} relative group`}
    >
      {/* Edit Mode Controls */}
      {isEditMode && (
        <>
          {/* Size Controls */}
          <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Clicked size button S for widget:', widget.id);
                onSizeChange(widget.id, 'small');
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`text-xs px-1 py-0.5 rounded ${widget.size === 'small' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} border shadow-sm`}
            >
              S
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSizeChange(widget.id, 'medium');
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`text-xs px-1 py-0.5 rounded ${widget.size === 'medium' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} border shadow-sm`}
            >
              M
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSizeChange(widget.id, 'large');
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`text-xs px-1 py-0.5 rounded ${widget.size === 'large' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} border shadow-sm`}
            >
              L
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSizeChange(widget.id, 'full');
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`text-xs px-1 py-0.5 rounded ${widget.size === 'full' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} border shadow-sm`}
            >
              XL
            </button>
          </div>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(widget.id);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            style={{ width: '24px', height: '24px' }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </>
      )}
      
      <div className="h-full">
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
  );
}

export default function EnvironmentalDashboardCustomizer({ isEditMode, onToggleEditMode }: EnvironmentalDashboardCustomizerProps) {
  const [widgets, setWidgets] = useState<EnvironmentalWidgetConfig[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showWidgetPalette, setShowWidgetPalette] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDrillDownBuilder, setShowDrillDownBuilder] = useState(false);

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

  // Load saved configuration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('environmental-dashboard-layout');
      if (saved) {
        try {
          setWidgets(JSON.parse(saved));
        } catch (e) {
          setWidgets(getDefaultEnvironmentalLayout());
        }
      } else {
        setWidgets(getDefaultEnvironmentalLayout());
      }
    }
  }, []);

  // Save configuration
  useEffect(() => {
    if (typeof window !== 'undefined' && widgets.length > 0) {
      localStorage.setItem('environmental-dashboard-layout', JSON.stringify(widgets));
    }
  }, [widgets]);

  // Get default environmental dashboard layout
  const getDefaultEnvironmentalLayout = (): EnvironmentalWidgetConfig[] => {
    return [
      ENVIRONMENTAL_WIDGET_CATALOG.find(w => w.id === 'environmental-stats')!,
      ENVIRONMENTAL_WIDGET_CATALOG.find(w => w.id === 'compliance-score')!,
      ENVIRONMENTAL_WIDGET_CATALOG.find(w => w.id === 'participation-rate')!,
      ENVIRONMENTAL_WIDGET_CATALOG.find(w => w.id === 'recent-reports')!,
    ];
  };

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

  const addWidget = (widgetConfig: EnvironmentalWidgetConfig) => {
    console.log('Adding widget:', widgetConfig);
    const newWidget = {
      ...widgetConfig,
      id: `${widgetConfig.component.toLowerCase()}-${Date.now()}`
    };
    console.log('New widget:', newWidget);
    setWidgets(prev => {
      console.log('Previous widgets:', prev);
      const updated = [...prev, newWidget];
      console.log('Updated widgets:', updated);
      return updated;
    });
    setShowWidgetPalette(false);
  };

  const addCustomWidget = (customConfig: any) => {
    const newWidget = {
      id: customConfig.id,
      component: 'DynamicCustomWidget',
      module: 'environmental',
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

  const changeSizeWidget = (id: string, size: 'small' | 'medium' | 'large' | 'full') => {
    console.log('Changing widget size:', id, 'to', size);
    setWidgets(prev => {
      const updated = prev.map(w => w.id === id ? { ...w, size } : w);
      console.log('Updated widgets with new size:', updated);
      return updated;
    });
  };

  const resetLayout = () => {
    const defaultLayout = getDefaultEnvironmentalLayout();
    setWidgets(defaultLayout);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('environmental-dashboard-layout');
    }
  };

  // Filter widgets for palette
  const filteredWidgets = ENVIRONMENTAL_WIDGET_CATALOG.filter(widget => {
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
            <h2 className="text-xl font-semibold text-gray-900">Environmental Dashboard</h2>
            <p className="text-gray-600 text-sm mt-1">Customise your environmental management workspace</p>
          </div>
        <div className="flex space-x-3">
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
                Environmental Widgets
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
              fontSize: '14px'
            }}
            className="hover:opacity-90"
          >
            {isEditMode ? 'Save Changes' : 'Customise'}
          </button>
        </div>
      </div>

        {/* Widget Palette */}
        {isEditMode && showWidgetPalette && (
          <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Environmental Widget Library</h3>
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="overview">Overview</option>
                <option value="analytics">Analytics</option>
                <option value="operations">Operations</option>
                <option value="compliance">Compliance</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
            
            {/* Widget Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => {
                    console.log('Clicked widget in palette:', widget);
                    addWidget(widget);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-green-600">{widget.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{widget.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 capitalize">{widget.module}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      widget.category === 'analytics' ? 'bg-green-100 text-green-800' :
                      widget.category === 'operations' ? 'bg-blue-100 text-blue-800' :
                      widget.category === 'compliance' ? 'bg-purple-100 text-purple-800' :
                      widget.category === 'engagement' ? 'bg-yellow-100 text-yellow-800' :
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
        <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Environmental Dashboard Customization Mode</span>
            </div>
            <div className="text-sm text-green-700">
              Drag widgets to reorder • Use resize handles to change size • Click × to remove
            </div>
          </div>
        </div>
      )}

      {/* Edit Mode Actions */}
      {isEditMode && widgets.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Drag widgets to reorder. Click remove to delete widgets from your dashboard.
          </p>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
              {widgets.map(widget => (
                <SortableWidget 
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
              <div className="opacity-50">
                <SortableWidget 
                  widget={widgets.find(w => w.id === activeId)!} 
                  isEditMode={false}
                  onRemove={() => {}}
                  onSizeChange={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Empty State */}
        {widgets.length === 0 && (
          <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No widgets added to your dashboard yet</p>
            <button
              onClick={() => setShowWidgetPalette(true)}
              style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              className="hover:opacity-90"
            >
              Add Your First Widget
            </button>
          </div>
        )}
      </div>

      {/* DrillDown Widget Builder */}
      <DrillDownWidgetBuilder
        isOpen={showDrillDownBuilder}
        onClose={() => setShowDrillDownBuilder(false)}
        onSave={addCustomWidget}
        restrictToModule="environmental"
      />
    </div>
  );
}