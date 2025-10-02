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

// Import existing widgets
import QuickStatsWidget from './widgets/QuickStatsWidget';
import ModernQuickStatsWidget from './widgets/ModernQuickStatsWidget';
import ActivityFeedWidget from './widgets/ActivityFeedWidget';
import ProgressRingWidget from './widgets/ProgressRingWidget';
import QuickActionsWidget from './widgets/QuickActionsWidget';
import RecentIncidentsWidget from './widgets/RecentIncidentsWidget';
import RiskAssessmentsWidget from './widgets/RiskAssessmentsWidget';
import ComplianceOverviewWidget from './widgets/ComplianceOverviewWidget';
import IncidentTrendWidget from './widgets/IncidentTrendWidget';
import SafetyMetricsWidget from './widgets/SafetyMetricsWidget';

// Import module-specific widgets
import ChecklistSummaryWidget from './modules/ChecklistSummaryWidget';
import IncidentAnalyticsWidget from './modules/IncidentAnalyticsWidget';
import TaskProgressWidget from './modules/TaskProgressWidget';
import TaskKPIBenchmarkWidget from './widgets/TaskKPIBenchmarkWidget';
import ChecklistKPIBenchmarkWidget from './widgets/ChecklistKPIBenchmarkWidget';
import PermitStatusWidget from './modules/PermitStatusWidget';
import TrainingComplianceWidget from './modules/TrainingComplianceWidget';
import DocumentManagementWidget from './modules/DocumentManagementWidget';
import RiskHeatmapWidget from './modules/RiskHeatmapWidget';
import AuditTrailWidget from './modules/AuditTrailWidget';
import IncidentsByTypeWidget from './widgets/IncidentsByTypeWidget';
import DynamicCustomWidget from './DynamicCustomWidget';
import DrillDownWidgetBuilder from './DrillDownWidgetBuilder';

// Widget configuration
interface WidgetConfig {
  id: string;
  component: string;
  module: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  category: 'analytics' | 'operations' | 'compliance' | 'overview';
  title: string;
  description: string;
  premium?: boolean;
}

// Enhanced widget registry with module categorization
const WIDGET_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  // Core widgets
  QuickStatsWidget,
  ModernQuickStatsWidget,
  ActivityFeedWidget,
  ProgressRingWidget,
  QuickActionsWidget,
  RecentIncidentsWidget,
  RiskAssessmentsWidget,
  ComplianceOverviewWidget,
  IncidentTrendWidget,
  SafetyMetricsWidget,
  
  // Module-specific widgets
  ChecklistSummaryWidget,
  IncidentAnalyticsWidget,
  TaskProgressWidget,
  TaskKPIBenchmarkWidget,
  ChecklistKPIBenchmarkWidget,
  PermitStatusWidget,
  TrainingComplianceWidget,
  DocumentManagementWidget,
  RiskHeatmapWidget,
  AuditTrailWidget,
  IncidentsByTypeWidget,
  
  // Dynamic custom widget
  DynamicCustomWidget
};

// Widget catalog with module organization
const WIDGET_CATALOG: WidgetConfig[] = [
  // Core Overview Widgets
  { id: 'quick-stats', component: 'QuickStatsWidget', module: 'core', size: 'medium', category: 'overview', title: 'Quick Stats', description: 'Key metrics at a glance' },
  { id: 'activity-feed', component: 'ActivityFeedWidget', module: 'core', size: 'medium', category: 'overview', title: 'Activity Feed', description: 'Recent system activity' },
  
  // Incident Module
  { id: 'recent-incidents', component: 'RecentIncidentsWidget', module: 'incidents', size: 'medium', category: 'operations', title: 'Recent Incidents', description: 'Latest incident reports' },
  { id: 'incident-trends', component: 'IncidentTrendWidget', module: 'incidents', size: 'wide', category: 'analytics', title: 'Incident Trends', description: 'Monthly incident analytics' },
  { id: 'incident-analytics', component: 'IncidentAnalyticsWidget', module: 'incidents', size: 'large', category: 'analytics', title: 'Advanced Analytics', description: 'Deep incident insights', premium: true },
  { id: 'incidents-by-type', component: 'IncidentsByTypeWidget', module: 'incidents', size: 'small', category: 'analytics', title: 'Incidents by Type', description: 'Incident type breakdown with bar chart' },
  
  // Checklist Module
  { id: 'checklist-summary', component: 'ChecklistSummaryWidget', module: 'checklists', size: 'medium', category: 'operations', title: 'Checklist Summary', description: 'Completion status overview' },
  { id: 'checklist-kpi-benchmark', component: 'ChecklistKPIBenchmarkWidget', module: 'checklists', size: 'medium', category: 'analytics', title: 'Checklist KPIs & Benchmarks', description: 'Checklist performance vs industry standards' },
  
  // Tasks Module
  { id: 'task-progress', component: 'TaskProgressWidget', module: 'tasks', size: 'medium', category: 'operations', title: 'Task Progress', description: 'Active task tracking' },
  { id: 'task-kpi-benchmark', component: 'TaskKPIBenchmarkWidget', module: 'tasks', size: 'medium', category: 'analytics', title: 'Task KPIs & Benchmarks', description: 'Task performance vs industry standards' },
  
  // Risk Assessment Module
  { id: 'risk-assessments', component: 'RiskAssessmentsWidget', module: 'risk-assessments', size: 'medium', category: 'compliance', title: 'Risk Assessments', description: 'Risk assessment status' },
  { id: 'risk-heatmap', component: 'RiskHeatmapWidget', module: 'risk-assessments', size: 'large', category: 'analytics', title: 'Risk Heatmap', description: 'Visual risk distribution', premium: true },
  
  // Permits Module
  { id: 'permit-status', component: 'PermitStatusWidget', module: 'permits', size: 'small', category: 'compliance', title: 'Permit Status', description: 'Active permit tracking' },
  
  // Training Module
  { id: 'training-compliance', component: 'TrainingComplianceWidget', module: 'training', size: 'medium', category: 'compliance', title: 'Training Compliance', description: 'Training completion rates' },
  
  // Documents Module
  { id: 'document-management', component: 'DocumentManagementWidget', module: 'documents', size: 'small', category: 'operations', title: 'Recent Documents', description: 'Document activity feed' },
  
  // Compliance & Audit
  { id: 'compliance-overview', component: 'ComplianceOverviewWidget', module: 'compliance', size: 'wide', category: 'compliance', title: 'Compliance Overview', description: 'Overall compliance status' },
  { id: 'audit-trail', component: 'AuditTrailWidget', module: 'audit', size: 'tall', category: 'compliance', title: 'Audit Trail', description: 'Recent audit activities', premium: true },
  
  // Utilities
  { id: 'safety-metrics', component: 'SafetyMetricsWidget', module: 'core', size: 'small', category: 'analytics', title: 'Safety Metrics', description: 'Safety performance indicators' },
  { id: 'quick-actions', component: 'QuickActionsWidget', module: 'core', size: 'small', category: 'operations', title: 'Quick Actions', description: 'Frequently used actions' }
];

// Sortable Widget Component with enhanced styling
function SortableWidget({ 
  widget, 
  isEditMode, 
  onResize,
  onRemove,
  onSizeChange,
  isPreview = false
}: { 
  widget: WidgetConfig; 
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
    isDragging
  } = useSortable({ id: widget.id, disabled: !isEditMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Get the component - handle custom widgets differently
  let Component: React.ComponentType<any> | null = null;
  const isCustomWidget = widget.component === 'DynamicCustomWidget';
  
  if (!isCustomWidget) {
    Component = WIDGET_COMPONENTS[widget.component];
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
      case 'compliance': return 'border-purple-200 bg-purple-50/30';
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
            {/* Enhanced Controls */}
            <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
              {/* Module Badge */}
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-600 rounded-full border">
                {widget.module}
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

// Main Dashboard Customizer Component
interface ModernDashboardCustomizerProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  userRole?: string;
  availableModules?: string[];
}

export default function ModernDashboardCustomizer({ 
  isEditMode, 
  onToggleEditMode,
  userRole = 'employee',
  availableModules = ['core', 'incidents', 'checklists', 'tasks', 'risk-assessments', 'permits', 'training', 'documents', 'compliance', 'audit']
}: ModernDashboardCustomizerProps) {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [showWidgetPalette, setShowWidgetPalette] = useState(false);
  const [showDrillDownBuilder, setShowDrillDownBuilder] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved configuration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`dashboard-layout-${userRole}`);
      if (saved) {
        try {
          setWidgets(JSON.parse(saved));
        } catch (e) {
          // Use default layout for role
          setWidgets(getDefaultLayoutForRole(userRole));
        }
      } else {
        setWidgets(getDefaultLayoutForRole(userRole));
      }
      // Trigger load animation
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, [userRole]);

  // Save configuration
  useEffect(() => {
    if (typeof window !== 'undefined' && widgets.length > 0) {
      localStorage.setItem(`dashboard-layout-${userRole}`, JSON.stringify(widgets));
    }
  }, [widgets, userRole]);

  // Get default layout based on user role
  const getDefaultLayoutForRole = (role: string): WidgetConfig[] => {
    const baseWidgets = [
      WIDGET_CATALOG.find(w => w.id === 'quick-stats')!,
      WIDGET_CATALOG.find(w => w.id === 'activity-feed')!,
    ];

    switch (role) {
      case 'admin':
        return [
          ...baseWidgets,
          WIDGET_CATALOG.find(w => w.id === 'incident-analytics')!,
          WIDGET_CATALOG.find(w => w.id === 'checklist-summary')!,
          WIDGET_CATALOG.find(w => w.id === 'compliance-overview')!,
          WIDGET_CATALOG.find(w => w.id === 'audit-trail')!,
        ];
      case 'manager':
        return [
          ...baseWidgets,
          WIDGET_CATALOG.find(w => w.id === 'incident-trends')!,
          WIDGET_CATALOG.find(w => w.id === 'checklist-summary')!,
          WIDGET_CATALOG.find(w => w.id === 'task-progress')!,
          WIDGET_CATALOG.find(w => w.id === 'task-kpi-benchmark')!,
          WIDGET_CATALOG.find(w => w.id === 'training-compliance')!,
        ];
      default:
        return [
          ...baseWidgets,
          WIDGET_CATALOG.find(w => w.id === 'recent-incidents')!,
          WIDGET_CATALOG.find(w => w.id === 'checklist-summary')!,
          WIDGET_CATALOG.find(w => w.id === 'task-kpi-benchmark')!,
          WIDGET_CATALOG.find(w => w.id === 'safety-metrics')!,
          WIDGET_CATALOG.find(w => w.id === 'incidents-by-type')!,
        ];
    }
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

  const addWidget = (widgetConfig: WidgetConfig) => {
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
      module: customConfig.module,
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
    const defaultLayout = getDefaultLayoutForRole(userRole);
    setWidgets(defaultLayout);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`dashboard-layout-${userRole}`);
    }
  };

  // Filter widgets for palette
  const filteredWidgets = WIDGET_CATALOG.filter(widget => {
    const categoryMatch = selectedCategory === 'all' || widget.category === selectedCategory;
    const moduleMatch = selectedModule === 'all' || widget.module === selectedModule;
    const moduleAvailable = availableModules.includes(widget.module);
    const notAlreadyAdded = !widgets.some(w => w.component === widget.component);
    
    return categoryMatch && moduleMatch && moduleAvailable && notAlreadyAdded;
  });

  return (
    <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* T100 Standard Card Header */}
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
                  Pre-built Widgets
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
              <h3 className="text-lg font-semibold text-gray-900">Widget Library</h3>
              <button
                onClick={() => setShowWidgetPalette(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {/* Filters */}
            <div className="flex gap-4 mb-4">
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Modules</option>
                {availableModules.map(module => (
                  <option key={module} value={module}>
                    {module.charAt(0).toUpperCase() + module.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => addWidget(widget)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{widget.title}</h4>
                    {widget.premium && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">PRO</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{widget.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 capitalize">{widget.module}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      widget.category === 'analytics' ? 'bg-blue-100 text-blue-800' :
                      widget.category === 'operations' ? 'bg-green-100 text-green-800' :
                      widget.category === 'compliance' ? 'bg-purple-100 text-purple-800' :
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
              <span className="font-medium">Customization Mode Active</span>
            </div>
            <div className="text-sm text-blue-700 space-x-4">
              <span>🎯 Drag to reorder</span>
              <span>📐 Click letters to resize</span>
              <span>💾 Auto-saves</span>
            </div>
          </div>
        </div>
      )}

      {/* Modern Full-Width Stats - Always Show at Top */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <ModernQuickStatsWidget id="modern-stats" isEditMode={false} fullWidth={true} />
      </div>

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
                <SortableWidget 
                  key={widget.id}
                  widget={widget} 
                  isEditMode={isEditMode}
                  onResize={() => {}}
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
                  
                  const Component = WIDGET_COMPONENTS[widget.component];
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Empty Dashboard</h3>
          <p className="text-gray-600 text-center max-w-sm">
            Get started by adding some widgets to customize your dashboard experience.
          </p>
          {isEditMode && (
            <button
              onClick={() => setShowWidgetPalette(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Your First Widget
            </button>
          )}
        </div>
      )}

      {/* Drill-Down Widget Builder */}
      <DrillDownWidgetBuilder
        isOpen={showDrillDownBuilder}
        onClose={() => setShowDrillDownBuilder(false)}
        onSave={addCustomWidget}
      />
      </div>
    </div>
  );
}