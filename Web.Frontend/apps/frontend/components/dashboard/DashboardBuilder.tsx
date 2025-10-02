"use client";

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import QuickStatsWidget from './widgets/QuickStatsWidget';
import ActivityFeedWidget from './widgets/ActivityFeedWidget';
import ProgressRingWidget from './widgets/ProgressRingWidget';
import QuickActionsWidget from './widgets/QuickActionsWidget';
import RecentIncidentsWidget from './widgets/RecentIncidentsWidget';
import RiskAssessmentsWidget from './widgets/RiskAssessmentsWidget';
import ComplianceOverviewWidget from './widgets/ComplianceOverviewWidget';

// Widget type definitions
export interface DashboardWidgetConfig {
  id: string;
  type: string;
  title: string;
  component: string;
  category: string;
  description: string;
}

// Available widgets library
const AVAILABLE_WIDGETS: DashboardWidgetConfig[] = [
  { id: 'quick-stats', type: 'stats', title: 'Quick Stats', component: 'QuickStatsWidget', category: 'Performance', description: 'Key metrics at a glance' },
  { id: 'activity-feed', type: 'activity', title: 'Activity Feed', component: 'ActivityFeedWidget', category: 'Activity', description: 'Recent user activities' },
  { id: 'progress-rings', type: 'progress', title: 'Progress Rings', component: 'ProgressRingWidget', category: 'Performance', description: 'Visual progress indicators' },
  { id: 'quick-actions', type: 'actions', title: 'Quick Actions', component: 'QuickActionsWidget', category: 'Actions', description: 'Common task shortcuts' },
  { id: 'recent-incidents', type: 'incidents', title: 'Recent Incidents', component: 'RecentIncidentsWidget', category: 'Safety', description: 'Latest incident reports' },
  { id: 'risk-assessments', type: 'risk', title: 'Risk Assessments', component: 'RiskAssessmentsWidget', category: 'Safety', description: 'Risk assessment status' },
  { id: 'compliance-overview', type: 'compliance', title: 'Compliance Overview', component: 'ComplianceOverviewWidget', category: 'Compliance', description: 'Compliance scores and updates' }
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

interface DashboardBuilderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function DashboardBuilder({ isEditMode, onToggleEditMode }: DashboardBuilderProps) {
  const [activeWidgets, setActiveWidgets] = useState<DashboardWidgetConfig[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load saved configuration on mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('dashboard-widgets');
    if (saved) {
      try {
        setActiveWidgets(JSON.parse(saved));
      } catch (e) {
        // If parsing fails, use default widgets
        setActiveWidgets([
          AVAILABLE_WIDGETS.find(w => w.id === 'quick-stats')!,
          AVAILABLE_WIDGETS.find(w => w.id === 'recent-incidents')!,
          AVAILABLE_WIDGETS.find(w => w.id === 'activity-feed')!
        ]);
      }
    } else {
      // Default widgets
      setActiveWidgets([
        AVAILABLE_WIDGETS.find(w => w.id === 'quick-stats')!,
        AVAILABLE_WIDGETS.find(w => w.id === 'recent-incidents')!,
        AVAILABLE_WIDGETS.find(w => w.id === 'activity-feed')!
      ]);
    }
  }, []);

  // Save configuration when widgets change
  useEffect(() => {
    if (isClient && activeWidgets.length > 0) {
      localStorage.setItem('dashboard-widgets', JSON.stringify(activeWidgets));
    }
  }, [activeWidgets, isClient]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Moving within the same list
    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId === 'active-widgets') {
        const items = Array.from(activeWidgets);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setActiveWidgets(items);
      }
      return;
    }

    // Adding from widget library to active widgets
    if (source.droppableId === 'widget-library' && destination.droppableId === 'active-widgets') {
      const widget = AVAILABLE_WIDGETS.find(w => w.id === draggableId);
      if (widget && !activeWidgets.find(w => w.id === widget.id)) {
        const newWidgets = Array.from(activeWidgets);
        newWidgets.splice(destination.index, 0, { ...widget, id: `${widget.id}-${Date.now()}` });
        setActiveWidgets(newWidgets);
      }
    }
  };

  const removeWidget = (widgetId: string) => {
    setActiveWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const renderWidget = (widget: DashboardWidgetConfig) => {
    const Component = WIDGET_COMPONENTS[widget.component];
    if (!Component) return null;
    
    return (
      <Component 
        key={widget.id}
        id={widget.id}
        isEditMode={isEditMode}
        onRemove={removeWidget}
      />
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={`grid gap-6 ${isEditMode ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
          
          {/* Widget Library (only shown in edit mode) */}
          {isEditMode && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Widget Library</h3>
                <Droppable droppableId="widget-library">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-2 min-h-[200px] p-2 rounded-lg border-2 border-dashed ${
                        snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                      }`}
                    >
                      {AVAILABLE_WIDGETS.map((widget, index) => (
                        <Draggable key={widget.id} draggableId={widget.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 bg-gray-50 rounded-lg border cursor-move hover:bg-gray-100 transition-colors ${
                                snapshot.isDragging ? 'shadow-lg bg-white' : ''
                              }`}
                            >
                              <div className="font-medium text-sm text-gray-800">{widget.title}</div>
                              <div className="text-xs text-gray-500 mt-1">{widget.description}</div>
                              <div className="text-xs text-blue-600 mt-1">{widget.category}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          )}

          {/* Active Dashboard */}
          <div className={isEditMode ? 'lg:col-span-3' : 'col-span-1'}>
            <Droppable droppableId="active-widgets">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px] ${
                    isEditMode ? 'p-4 rounded-lg border-2 border-dashed border-gray-300' : ''
                  } ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : ''}`}
                >
                  {activeWidgets.map((widget, index) => (
                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${snapshot.isDragging ? 'rotate-2 scale-105' : ''} transition-transform`}
                        >
                          {renderWidget(widget)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  
                  {/* Empty state */}
                  {activeWidgets.length === 0 && isEditMode && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="text-lg font-medium">No widgets added yet</h3>
                      <p className="text-sm mt-2">Drag widgets from the library to get started</p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* Instructions for edit mode */}
      {isEditMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">How to customize your dashboard:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Drag widgets from the library to add them to your dashboard</li>
            <li>• Drag widgets within your dashboard to reorder them</li>
            <li>• Click the ✕ button on widgets to remove them</li>
            <li>• Click "Save Layout" to keep your changes</li>
          </ul>
        </div>
      )}
    </div>
  );
}