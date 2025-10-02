"use client";

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import QuickStatsWidget from './widgets/QuickStatsWidget';
import ActivityFeedWidget from './widgets/ActivityFeedWidget';
import ProgressRingWidget from './widgets/ProgressRingWidget';
import QuickActionsWidget from './widgets/QuickActionsWidget';
import RecentIncidentsWidget from './widgets/RecentIncidentsWidget';
import RiskAssessmentsWidget from './widgets/RiskAssessmentsWidget';
import ComplianceOverviewWidget from './widgets/ComplianceOverviewWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

interface SimpleDashboardBuilderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function SimpleDashboardBuilder({ isEditMode, onToggleEditMode }: SimpleDashboardBuilderProps) {
  const [mounted, setMounted] = useState(false);

  // Default layout
  const defaultLayout = [
    { i: 'quick-stats', x: 0, y: 0, w: 2, h: 2, component: 'QuickStatsWidget' },
    { i: 'recent-incidents', x: 2, y: 0, w: 1, h: 3, component: 'RecentIncidentsWidget' },
    { i: 'activity-feed', x: 0, y: 2, w: 1, h: 3, component: 'ActivityFeedWidget' },
    { i: 'progress-rings', x: 1, y: 2, w: 1, h: 2, component: 'ProgressRingWidget' }
  ];

  const [layout, setLayout] = useState(defaultLayout);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onLayoutChange = (newLayout: any) => {
    console.log('Layout changed:', newLayout);
    setLayout(newLayout.map((item: any) => {
      const existingItem = layout.find(l => l.i === item.i);
      return {
        ...item,
        component: existingItem?.component || 'QuickStatsWidget'
      };
    }));
  };

  const renderWidget = (item: any) => {
    const Component = WIDGET_COMPONENTS[item.component];
    if (!Component) return <div>Unknown widget</div>;
    
    return (
      <div key={item.i} style={{ background: 'white', borderRadius: '8px', padding: '16px' }}>
        <Component 
          id={item.i}
          isEditMode={isEditMode}
        />
      </div>
    );
  };

  if (!mounted) {
    return <div>Loading...</div>;
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

      {/* Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }}
        rowHeight={120}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {layout.map(renderWidget)}
      </ResponsiveGridLayout>

      {/* Instructions */}
      {isEditMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Drag and resize widgets to customize your dashboard</h4>
          <p className="text-sm text-blue-700">Drag widgets to move them around, or drag the corners to resize them.</p>
        </div>
      )}
    </div>
  );
}