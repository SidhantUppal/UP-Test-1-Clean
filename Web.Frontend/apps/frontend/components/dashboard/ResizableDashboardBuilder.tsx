"use client";

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import QuickStatsWidget from './widgets/QuickStatsWidget';
import ActivityFeedWidget from './widgets/ActivityFeedWidget';
import ProgressRingWidget from './widgets/ProgressRingWidget';
import QuickActionsWidget from './widgets/QuickActionsWidget';
import RecentIncidentsWidget from './widgets/RecentIncidentsWidget';
import RiskAssessmentsWidget from './widgets/RiskAssessmentsWidget';
import ComplianceOverviewWidget from './widgets/ComplianceOverviewWidget';

// CSS is imported globally in app/globals.css

const ResponsiveGridLayout = WidthProvider(Responsive);

// Widget type definitions with default layout properties
export interface DashboardWidgetConfig {
  i: string; // unique identifier for grid layout
  id: string;
  type: string;
  title: string;
  component: string;
  category: string;
  description: string;
  x: number;
  y: number;
  w: number; // width in grid units
  h: number; // height in grid units
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

// Available widgets library with layout defaults
const AVAILABLE_WIDGETS: DashboardWidgetConfig[] = [
  { 
    i: 'quick-stats', id: 'quick-stats', type: 'stats', title: 'Quick Stats', 
    component: 'QuickStatsWidget', category: 'Performance', description: 'Key metrics at a glance',
    x: 0, y: 0, w: 2, h: 2, minW: 1, minH: 2, maxW: 3
  },
  { 
    i: 'activity-feed', id: 'activity-feed', type: 'activity', title: 'Activity Feed', 
    component: 'ActivityFeedWidget', category: 'Activity', description: 'Recent user activities',
    x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 2, maxW: 2
  },
  { 
    i: 'progress-rings', id: 'progress-rings', type: 'progress', title: 'Progress Rings', 
    component: 'ProgressRingWidget', category: 'Performance', description: 'Visual progress indicators',
    x: 0, y: 0, w: 2, h: 2, minW: 1, minH: 2, maxW: 3
  },
  { 
    i: 'quick-actions', id: 'quick-actions', type: 'actions', title: 'Quick Actions', 
    component: 'QuickActionsWidget', category: 'Actions', description: 'Common task shortcuts',
    x: 0, y: 0, w: 1, h: 2, minW: 1, minH: 2, maxW: 2
  },
  { 
    i: 'recent-incidents', id: 'recent-incidents', type: 'incidents', title: 'Recent Incidents', 
    component: 'RecentIncidentsWidget', category: 'Safety', description: 'Latest incident reports',
    x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 2, maxW: 2
  },
  { 
    i: 'risk-assessments', id: 'risk-assessments', type: 'risk', title: 'Risk Assessments', 
    component: 'RiskAssessmentsWidget', category: 'Safety', description: 'Risk assessment status',
    x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 2, maxW: 2
  },
  { 
    i: 'compliance-overview', id: 'compliance-overview', type: 'compliance', title: 'Compliance Overview', 
    component: 'ComplianceOverviewWidget', category: 'Compliance', description: 'Compliance scores and updates',
    x: 0, y: 0, w: 3, h: 3, minW: 2, minH: 3, maxW: 3
  }
];

// Widget component mapping
const WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  QuickStatsWidget,
  ActivityFeedWidget,
  ProgressRingWidget,
  QuickActionsWidget,
  RecentIncidentsWidget,
  RiskAssessmentsWidget,
  ComplianceOverviewWidget
};

interface ResizableDashboardBuilderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function ResizableDashboardBuilder({ isEditMode, onToggleEditMode }: ResizableDashboardBuilderProps) {
  const [activeWidgets, setActiveWidgets] = useState<DashboardWidgetConfig[]>([]);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});
  const [isClient, setIsClient] = useState(false);

  // Grid configuration
  const gridProps = {
    className: "layout",
    cols: { lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 },
    rowHeight: 120,
    margin: [16, 16] as [number, number],
    containerPadding: [0, 0] as [number, number],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    isDraggable: isEditMode,
    isResizable: isEditMode,
    compactType: 'vertical' as const,
    preventCollision: false
  };

  // Load saved configuration on mount
  useEffect(() => {
    setIsClient(true);
    const savedWidgets = localStorage.getItem('dashboard-widgets-v2');
    const savedLayouts = localStorage.getItem('dashboard-layouts-v2');
    
    if (savedWidgets && savedLayouts) {
      try {
        const widgets = JSON.parse(savedWidgets);
        const layoutData = JSON.parse(savedLayouts);
        setActiveWidgets(widgets);
        setLayouts(layoutData);
      } catch (e) {
        loadDefaultWidgets();
      }
    } else {
      loadDefaultWidgets();
    }
  }, []);

  const loadDefaultWidgets = () => {
    const defaultWidgets = [
      { ...AVAILABLE_WIDGETS.find(w => w.id === 'quick-stats')!, i: `quick-stats-${Date.now()}`, x: 0, y: 0 },
      { ...AVAILABLE_WIDGETS.find(w => w.id === 'recent-incidents')!, i: `recent-incidents-${Date.now()}`, x: 2, y: 0 },
      { ...AVAILABLE_WIDGETS.find(w => w.id === 'activity-feed')!, i: `activity-feed-${Date.now()}`, x: 0, y: 2 }
    ];
    
    setActiveWidgets(defaultWidgets);
    
    const defaultLayouts = {
      lg: defaultWidgets.map(w => ({ i: w.i, x: w.x, y: w.y, w: w.w, h: w.h, minW: w.minW, minH: w.minH, maxW: w.maxW }))
    };
    setLayouts(defaultLayouts);
  };

  // Save configuration when widgets or layouts change
  useEffect(() => {
    if (isClient && activeWidgets.length > 0) {
      localStorage.setItem('dashboard-widgets-v2', JSON.stringify(activeWidgets));
      localStorage.setItem('dashboard-layouts-v2', JSON.stringify(layouts));
    }
  }, [activeWidgets, layouts, isClient]);

  const handleLayoutChange = (layout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    setLayouts(allLayouts);
    
    // Update widget positions
    const updatedWidgets = activeWidgets.map(widget => {
      const layoutItem = layout.find(l => l.i === widget.i);
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h
        };
      }
      return widget;
    });
    setActiveWidgets(updatedWidgets);
  };


  const removeWidget = (widgetI: string) => {
    setActiveWidgets(prev => prev.filter(w => w.i !== widgetI));
    setLayouts(prevLayouts => ({
      ...prevLayouts,
      lg: (prevLayouts.lg || []).filter(l => l.i !== widgetI)
    }));
  };

  const addWidget = (widgetId: string) => {
    const widget = AVAILABLE_WIDGETS.find(w => w.id === widgetId);
    if (widget && !activeWidgets.find(w => w.id === widget.id)) {
      const newWidget = {
        ...widget,
        i: `${widget.id}-${Date.now()}`,
        x: 0,
        y: Infinity
      };
      
      setActiveWidgets(prev => [...prev, newWidget]);
      
      const newLayoutItem = {
        i: newWidget.i,
        x: newWidget.x,
        y: newWidget.y,
        w: newWidget.w,
        h: newWidget.h,
        minW: newWidget.minW,
        minH: newWidget.minH,
        maxW: newWidget.maxW
      };
      
      setLayouts(prevLayouts => ({
        ...prevLayouts,
        lg: [...(prevLayouts.lg || []), newLayoutItem]
      }));
    }
  };

  const renderWidget = (widget: DashboardWidgetConfig) => {
    const Component = WIDGET_COMPONENTS[widget.component];
    if (!Component) return null;
    
    return (
      <div key={widget.i} className="widget-container">
        <Component 
          id={widget.i}
          isEditMode={isEditMode}
          onRemove={() => removeWidget(widget.i)}
        />
      </div>
    );
  };

  // Don't render until client-side
  if (!isClient) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">My Dashboard</h2>
        <button
          onClick={onToggleEditMode}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isEditMode 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {isEditMode ? '✓ Save Layout' : '⚙️ Customize'}
        </button>
      </div>

      <div className={`grid gap-6 ${isEditMode ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
        
        {/* Widget Library (only shown in edit mode) */}
        {isEditMode && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Widget Library</h3>
              <div className="space-y-2">
                {AVAILABLE_WIDGETS.map((widget) => (
                  <div
                    key={widget.id}
                    onClick={() => addWidget(widget.id)}
                    className="p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium text-sm text-gray-800">{widget.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{widget.description}</div>
                    <div className="text-xs text-blue-600 mt-1">{widget.category}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Size: {widget.w}×{widget.h} {widget.maxW && widget.maxW > widget.w ? `(resizable to ${widget.maxW}×${widget.h})` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Dashboard with Resizable Grid */}
        <div className={isEditMode ? 'lg:col-span-3' : 'col-span-1'}>
          {activeWidgets.length > 0 ? (
            <ResponsiveGridLayout
              {...gridProps}
              layouts={layouts}
              onLayoutChange={handleLayoutChange}
            >
              {activeWidgets.map(renderWidget)}
            </ResponsiveGridLayout>
          ) : (
            <div className="text-center py-12 text-gray-500 min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-medium">No widgets added yet</h3>
              <p className="text-sm mt-2">Click widgets from the library to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions for edit mode */}
      {isEditMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">How to customize your dashboard:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Click widgets from the library to add them to your dashboard</li>
            <li>• Drag widgets to reorder them in the grid</li>
            <li>• Drag the corner (⋱) to resize widgets - they'll span 1, 2, or 3 columns</li>
            <li>• Other widgets will automatically reflow when you resize</li>
            <li>• Click the ✕ button on widgets to remove them</li>
            <li>• Click "Save Layout" to keep your changes</li>
          </ul>
        </div>
      )}

    </div>
  );
}