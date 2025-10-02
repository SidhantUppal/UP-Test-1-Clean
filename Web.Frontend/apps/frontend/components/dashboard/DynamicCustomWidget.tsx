'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface DynamicCustomWidgetProps {
  config: {
    id: string;
    type: 'custom_drilldown';
    module: string;
    metric: string;
    chartType: string;
    title: string;
    filters: string[];
    colorScheme: string;
    timeRange: string;
    refreshRate: string;
    size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  };
  id?: string;
  isEditMode?: boolean;
}

// Chart components mapping
const CHART_COMPONENTS = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
  radar: Radar,
  polar: PolarArea
};

// Color schemes
const COLOR_SCHEMES = {
  default: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
  professional: ['#1E40AF', '#DC2626', '#059669', '#D97706', '#7C3AED', '#DB2777'],
  soft: ['#93C5FD', '#FCA5A5', '#86EFAC', '#FDE68A', '#C4B5FD', '#F9A8D4'],
  dark: ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB'],
  vibrant: ['#06B6D4', '#F43F5E', '#22C55E', '#FACC15', '#A855F7', '#EC4899']
};

// Mock data generators for different modules and metrics
const generateMockData = (module: string, metric: string, chartType: string, colorScheme: string) => {
  const colors = COLOR_SCHEMES[colorScheme as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES.default;

  // Helper functions for generating realistic data
  const generateTrendData = (months: number = 6, baseValue: number = 10, variance: number = 5) => {
    return Array.from({ length: months }, () => 
      Math.max(0, baseValue + (Math.random() - 0.5) * variance * 2)
    );
  };

  const generateCategoryData = (categories: string[], total: number = 100) => {
    const data = [];
    let remaining = total;
    for (let i = 0; i < categories.length - 1; i++) {
      const value = Math.floor(Math.random() * (remaining / 2));
      data.push(value);
      remaining -= value;
    }
    data.push(remaining);
    return data;
  };

  // Data generators based on module and metric
  const dataGenerators: { [key: string]: { [key: string]: any } } = {
    incidents: {
      total_count: () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Total Incidents',
          data: generateTrendData(6, 15, 6),
          backgroundColor: colors[0] + '30',
          borderColor: colors[0],
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      }),
      by_severity: () => {
        const data = generateCategoryData(['Low', 'Medium', 'High', 'Critical'], 100);
        return {
          labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
          datasets: [{
            data: data,
            backgroundColor: [colors[2], colors[3], colors[1], colors[0]],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        };
      },
      by_type: () => {
        const categories = ['Slip/Fall', 'Equipment Failure', 'Chemical Exposure', 'Fire/Explosion', 'Vehicle', 'Other'];
        return {
          labels: categories,
          datasets: [{
            data: generateCategoryData(categories, 78),
            backgroundColor: colors.slice(0, categories.length),
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        };
      },
      by_location: () => ({
        labels: ['Factory Floor', 'Warehouse', 'Office', 'Loading Bay', 'Lab', 'Parking'],
        datasets: [{
          data: generateCategoryData(['Factory Floor', 'Warehouse', 'Office', 'Loading Bay', 'Lab', 'Parking'], 65),
          backgroundColor: colors.slice(0, 6),
          borderWidth: 2
        }]
      }),
      trend_monthly: () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Near Miss',
          data: generateTrendData(6, 12, 4),
          borderColor: colors[2],
          backgroundColor: colors[2] + '20',
          tension: 0.3,
          fill: false
        }, {
          label: 'Minor Accidents',
          data: generateTrendData(6, 5, 3),
          borderColor: colors[3],
          backgroundColor: colors[3] + '20',
          tension: 0.3,
          fill: false
        }, {
          label: 'Major Incidents',
          data: generateTrendData(6, 2, 2),
          borderColor: colors[1],
          backgroundColor: colors[1] + '20',
          tension: 0.3,
          fill: false
        }]
      }),
      resolution_time: () => ({
        labels: ['< 1 Day', '1-3 Days', '4-7 Days', '1-2 Weeks', '> 2 Weeks'],
        datasets: [{
          data: [25, 35, 20, 15, 5],
          backgroundColor: [colors[2], colors[4], colors[3], colors[1], colors[0]],
          borderWidth: 2
        }]
      }),
      status_distribution: () => ({
        labels: ['Open', 'Investigating', 'Resolved', 'Closed'],
        datasets: [{
          data: [8, 15, 45, 32],
          backgroundColor: [colors[1], colors[3], colors[2], colors[4]],
          borderWidth: 2
        }]
      }),
      cost_impact: () => ({
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Cost Impact ($)',
          data: [15000, 12000, 18000, 9000],
          backgroundColor: colors[1] + '30',
          borderColor: colors[1],
          borderWidth: 2,
          tension: 0.4
        }]
      })
    },
    checklists: {
      completion_rate: () => ({
        labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
        datasets: [{
          data: [68, 18, 12, 2],
          backgroundColor: [colors[2], colors[4], colors[3], colors[1]],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      }),
      by_category: () => ({
        labels: ['Safety Inspections', 'Equipment Checks', 'Quality Control', 'Environmental', 'Maintenance', 'Admin'],
        datasets: [{
          label: 'Completed This Week',
          data: generateCategoryData(['Safety Inspections', 'Equipment Checks', 'Quality Control', 'Environmental', 'Maintenance', 'Admin'], 85),
          backgroundColor: colors[2],
          borderRadius: 8
        }, {
          label: 'Pending',
          data: generateCategoryData(['Safety Inspections', 'Equipment Checks', 'Quality Control', 'Environmental', 'Maintenance', 'Admin'], 25),
          backgroundColor: colors[3],
          borderRadius: 8
        }]
      }),
      overdue_items: () => ({
        labels: ['1-2 Days', '3-7 Days', '1-2 Weeks', '> 2 Weeks'],
        datasets: [{
          data: [8, 5, 3, 1],
          backgroundColor: [colors[3], colors[1], colors[0], '#8B0000'],
          borderWidth: 2
        }]
      }),
      completion_trend: () => ({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
          label: 'Completion Rate %',
          data: [85, 92, 78, 88, 95, 91],
          borderColor: colors[2],
          backgroundColor: colors[2] + '20',
          tension: 0.4,
          fill: true
        }]
      }),
      avg_completion_time: () => ({
        labels: ['Safety', 'Equipment', 'Quality', 'Environment', 'Admin'],
        datasets: [{
          label: 'Avg Time (minutes)',
          data: [45, 30, 25, 35, 15],
          backgroundColor: colors.slice(0, 5),
          borderWidth: 2,
          borderRadius: 8
        }]
      }),
      by_assignee: () => ({
        labels: ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Davis', 'Tom Brown'],
        datasets: [{
          data: generateCategoryData(['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Davis', 'Tom Brown'], 120),
          backgroundColor: colors.slice(0, 5),
          borderWidth: 2
        }]
      }),
      quality_score: () => ({
        labels: ['Excellent (90-100%)', 'Good (80-89%)', 'Fair (70-79%)', 'Poor (<70%)'],
        datasets: [{
          data: [42, 35, 18, 5],
          backgroundColor: [colors[2], colors[4], colors[3], colors[1]],
          borderWidth: 2
        }]
      })
    },
    'risk-assessments': {
      risk_distribution: () => ({
        labels: ['Low Risk (1-3)', 'Medium Risk (4-6)', 'High Risk (7-9)', 'Critical Risk (10+)'],
        datasets: [{
          data: generateCategoryData(['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'], 145),
          backgroundColor: [colors[2], colors[3], colors[1], colors[0]],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      }),
      by_area: () => ({
        labels: ['Manufacturing', 'Chemical Storage', 'Warehouse', 'Office Areas', 'Maintenance', 'Loading Dock'],
        datasets: [{
          data: generateCategoryData(['Manufacturing', 'Chemical Storage', 'Warehouse', 'Office Areas', 'Maintenance', 'Loading Dock'], 95),
          backgroundColor: colors.slice(0, 6),
          borderWidth: 2
        }]
      }),
      trending_risks: () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Critical Risks',
          data: generateTrendData(6, 3, 2),
          borderColor: colors[0],
          backgroundColor: colors[0] + '20',
          tension: 0.4,
          fill: false
        }, {
          label: 'High Risks',
          data: generateTrendData(6, 8, 3),
          borderColor: colors[1],
          backgroundColor: colors[1] + '20',
          tension: 0.4,
          fill: false
        }, {
          label: 'Medium Risks',
          data: generateTrendData(6, 15, 5),
          borderColor: colors[3],
          backgroundColor: colors[3] + '20',
          tension: 0.4,
          fill: false
        }]
      }),
      mitigation_status: () => ({
        labels: ['Implemented', 'In Progress', 'Planned', 'Under Review'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: [colors[2], colors[4], colors[3], colors[0]],
          borderWidth: 2
        }]
      }),
      overdue_assessments: () => ({
        labels: ['< 1 Month', '1-3 Months', '3-6 Months', '> 6 Months'],
        datasets: [{
          data: [3, 8, 12, 5],
          backgroundColor: [colors[3], colors[1], colors[0], '#8B0000'],
          borderWidth: 2
        }]
      }),
      risk_score_avg: () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Average Risk Score',
          data: [4.2, 3.8, 4.5, 3.9, 3.6, 4.1],
          backgroundColor: colors[1] + '30',
          borderColor: colors[1],
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      }),
      by_risk_type: () => ({
        labels: ['Physical', 'Chemical', 'Biological', 'Ergonomic', 'Psychosocial', 'Environmental'],
        datasets: [{
          data: generateCategoryData(['Physical', 'Chemical', 'Biological', 'Ergonomic', 'Psychosocial', 'Environmental'], 88),
          backgroundColor: colors.slice(0, 6),
          borderWidth: 2
        }]
      })
    },
    tasks: {
      completion_rate: () => ({
        labels: ['Completed', 'In Progress', 'Not Started', 'Blocked', 'On Hold'],
        datasets: [{
          data: generateCategoryData(['Completed', 'In Progress', 'Not Started', 'Blocked', 'On Hold'], 100),
          backgroundColor: [colors[2], colors[4], colors[3], colors[1], colors[5]],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      }),
      by_priority: () => ({
        labels: ['Low Priority', 'Medium Priority', 'High Priority', 'Urgent', 'Critical'],
        datasets: [{
          data: generateCategoryData(['Low', 'Medium', 'High', 'Urgent', 'Critical'], 127),
          backgroundColor: [colors[2], colors[4], colors[3], colors[1], colors[0]],
          borderWidth: 2
        }]
      }),
      by_status: () => ({
        labels: ['To Do', 'In Progress', 'Review', 'Done', 'Cancelled'],
        datasets: [{
          data: [28, 35, 12, 78, 3],
          backgroundColor: [colors[3], colors[4], colors[0], colors[2], colors[1]],
          borderWidth: 2
        }]
      }),
      overdue_tasks: () => ({
        labels: ['1-3 Days', '4-7 Days', '1-2 Weeks', '> 2 Weeks'],
        datasets: [{
          data: [12, 8, 5, 2],
          backgroundColor: [colors[3], colors[1], colors[0], '#8B0000'],
          borderWidth: 2
        }]
      }),
      completion_trend: () => ({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Tasks Completed',
          data: generateTrendData(7, 12, 6),
          backgroundColor: colors[2] + '30',
          borderColor: colors[2],
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }, {
          label: 'Tasks Created',
          data: generateTrendData(7, 8, 4),
          backgroundColor: colors[0] + '30',
          borderColor: colors[0],
          borderWidth: 2,
          tension: 0.4,
          fill: false
        }]
      }),
      by_assignee: () => ({
        labels: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eve Brown'],
        datasets: [{
          data: generateCategoryData(['Alice', 'Bob', 'Carol', 'David', 'Eve'], 85),
          backgroundColor: colors.slice(0, 5),
          borderWidth: 2
        }]
      }),
      avg_completion_time: () => ({
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Avg Days to Complete',
          data: [3.2, 2.8, 3.5, 2.9],
          backgroundColor: colors[4] + '30',
          borderColor: colors[4],
          borderWidth: 2,
          tension: 0.4
        }]
      })
    },
    training: {
      compliance_rate: () => ({
        labels: ['Fully Compliant', 'Due Soon (30 days)', 'Overdue', 'Not Started'],
        datasets: [{
          data: generateCategoryData(['Compliant', 'Due Soon', 'Overdue', 'Not Started'], 100),
          backgroundColor: [colors[2], colors[3], colors[1], colors[4]],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      }),
      by_course: () => ({
        labels: ['Safety Fundamentals', 'Fire Safety', 'Chemical Handling', 'Emergency Response', 'Equipment Training', 'Leadership'],
        datasets: [{
          label: 'Completed',
          data: generateCategoryData(['Safety', 'Fire', 'Chemical', 'Emergency', 'Equipment', 'Leadership'], 180),
          backgroundColor: colors[2],
          borderRadius: 8
        }, {
          label: 'In Progress',
          data: generateCategoryData(['Safety', 'Fire', 'Chemical', 'Emergency', 'Equipment', 'Leadership'], 45),
          backgroundColor: colors[4],
          borderRadius: 8
        }, {
          label: 'Not Started',
          data: generateCategoryData(['Safety', 'Fire', 'Chemical', 'Emergency', 'Equipment', 'Leadership'], 25),
          backgroundColor: colors[3],
          borderRadius: 8
        }]
      }),
      completion_trend: () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Completion Rate %',
          data: [78, 82, 75, 88, 85, 91],
          borderColor: colors[2],
          backgroundColor: colors[2] + '20',
          tension: 0.4,
          fill: true
        }]
      }),
      expiring_certifications: () => ({
        labels: ['Next 30 days', '31-60 days', '61-90 days', '91+ days'],
        datasets: [{
          data: [15, 23, 18, 8],
          backgroundColor: [colors[1], colors[3], colors[4], colors[2]],
          borderWidth: 2
        }]
      }),
      by_department: () => ({
        labels: ['Production', 'Maintenance', 'Quality', 'Admin', 'Safety', 'Engineering'],
        datasets: [{
          data: generateCategoryData(['Production', 'Maintenance', 'Quality', 'Admin', 'Safety', 'Engineering'], 95),
          backgroundColor: colors.slice(0, 6),
          borderWidth: 2
        }]
      }),
      training_hours: () => ({
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Total Training Hours',
          data: [1250, 1485, 1120, 1680],
          backgroundColor: colors[4] + '30',
          borderColor: colors[4],
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      }),
      pass_rate: () => ({
        labels: ['First Attempt Pass', 'Second Attempt Pass', 'Third+ Attempts', 'Failed'],
        datasets: [{
          data: [78, 15, 5, 2],
          backgroundColor: [colors[2], colors[4], colors[3], colors[1]],
          borderWidth: 2
        }]
      })
    },
    permits: {
      active_permits: () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Active Permits',
          data: generateTrendData(6, 28, 8),
          backgroundColor: colors[0] + '30',
          borderColor: colors[0],
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      }),
      by_type: () => ({
        labels: ['Hot Work', 'Confined Space', 'Excavation', 'Chemical Work', 'Electrical', 'Height Work'],
        datasets: [{
          data: generateCategoryData(['Hot Work', 'Confined Space', 'Excavation', 'Chemical Work', 'Electrical', 'Height Work'], 85),
          backgroundColor: colors.slice(0, 6),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      }),
      expiring_soon: () => ({
        labels: ['Today', 'Tomorrow', 'This Week', 'Next Week'],
        datasets: [{
          data: [3, 5, 12, 8],
          backgroundColor: [colors[0], colors[1], colors[3], colors[4]],
          borderWidth: 2
        }]
      }),
      by_location: () => ({
        labels: ['Building A', 'Building B', 'Warehouse', 'Yard', 'Chemical Plant', 'Office'],
        datasets: [{
          data: generateCategoryData(['Building A', 'Building B', 'Warehouse', 'Yard', 'Chemical Plant', 'Office'], 65),
          backgroundColor: colors.slice(0, 6),
          borderWidth: 2
        }]
      }),
      approval_time: () => ({
        labels: ['< 1 Hour', '1-4 Hours', '4-24 Hours', '1-3 Days', '> 3 Days'],
        datasets: [{
          data: [25, 45, 20, 8, 2],
          backgroundColor: [colors[2], colors[4], colors[3], colors[1], colors[0]],
          borderWidth: 2
        }]
      }),
      renewal_trend: () => ({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Renewals',
          data: generateTrendData(4, 15, 5),
          backgroundColor: colors[3] + '30',
          borderColor: colors[3],
          borderWidth: 2,
          tension: 0.4
        }]
      }),
      by_status: () => ({
        labels: ['Active', 'Pending Approval', 'Expired', 'Cancelled', 'Suspended'],
        datasets: [{
          data: generateCategoryData(['Active', 'Pending', 'Expired', 'Cancelled', 'Suspended'], 100),
          backgroundColor: [colors[2], colors[3], colors[1], colors[4], colors[0]],
          borderWidth: 2
        }]
      })
    }
  };

  const moduleData = dataGenerators[module];
  if (!moduleData || !moduleData[metric]) {
    // Fallback generic data
    return {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [{
        data: [25, 35, 20, 20],
        backgroundColor: colors.slice(0, 4),
        borderWidth: 2
      }]
    };
  }

  return moduleData[metric]();
};

export default function DynamicCustomWidget({ config, id, isEditMode }: DynamicCustomWidgetProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  // Fetch or generate data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would call an API endpoint
        // For now, we'll generate mock data based on the configuration
        const mockData = generateMockData(
          config.module, 
          config.metric, 
          config.chartType, 
          config.colorScheme
        );
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setData(mockData);
        setLastRefresh(new Date());
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up auto-refresh if configured
    if (config.refreshRate !== 'manual') {
      const intervals: { [key: string]: number } = {
        '1min': 60000,
        '5min': 300000,
        '15min': 900000,
        '1h': 3600000
      };

      const interval = intervals[config.refreshRate];
      if (interval) {
        const timer = setInterval(fetchData, interval);
        return () => clearInterval(timer);
      }
    }
  }, [config]);

  // Get chart component
  const ChartComponent = CHART_COMPONENTS[config.chartType as keyof typeof CHART_COMPONENTS];
  
  if (!ChartComponent) {
    return (
      <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
        <div className="text-red-500">Unsupported chart type: {config.chartType}</div>
      </div>
    );
  }

  // Chart options with special handling for pie charts
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: config.title,
        font: { size: 16, weight: 'bold' as const }
      },
      legend: {
        position: (config.chartType === 'pie' || config.chartType === 'doughnut') ? 'right' as const : 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: config.chartType === 'pie' || config.chartType === 'doughnut' ? 8 : 15,
          font: { size: config.chartType === 'pie' || config.chartType === 'doughnut' ? 10 : 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: config.chartType === 'bar' || config.chartType === 'line' ? {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' },
        ticks: { font: { size: 11 } }
      }
    } : undefined,
    // Special layout for pie charts to reduce spacing
    layout: config.chartType === 'pie' || config.chartType === 'doughnut' ? {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      }
    } : undefined,
    // Additional options for pie charts
    ...(config.chartType === 'pie' || config.chartType === 'doughnut' ? {
      aspectRatio: 1.2,
      cutout: config.chartType === 'doughnut' ? '50%' : 0
    } : {})
  };

  const getNavigationUrl = () => {
    if (config.module === 'checklists') {
      return '/checklists/manage';
    }
    if (config.module === 'behavioural-safety' || config.module === 'behavioural safety') {
      // Check if this is a reports/analytics widget that should go to insights
      if (config.title.toLowerCase().includes('total reports') || 
          config.title.toLowerCase().includes('category') ||
          config.title.toLowerCase().includes('analysis')) {
        return '/incidents/behaviour/insights';
      }
      return '/incidents/behaviour';
    }
    return `/${config.module}`;
  };

  return (
    <Link href={getNavigationUrl()} className="block h-full">
      <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200 relative hover:shadow-md transition-shadow cursor-pointer">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">{config.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 capitalize">{config.module.replace('-', ' ')}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 capitalize">{config.chartType}</span>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center gap-2">
            {config.refreshRate !== 'manual' && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Auto</span>
              </div>
            )}
            
            {/* Custom Badge */}
            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full font-medium">
              Custom
            </span>
          </div>
        </div>

        {/* Active Filters */}
        {config.filters.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-600 mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-1">
              {config.filters.map((filter, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                >
                  {filter.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chart Area */}
        <div className="flex-1 pointer-events-none" style={{ 
          minHeight: config.chartType === 'pie' || config.chartType === 'doughnut' ? '150px' : '200px', 
          height: config.chartType === 'pie' || config.chartType === 'doughnut' ? '200px' : 'calc(100% - 120px)',
          maxHeight: config.chartType === 'pie' || config.chartType === 'doughnut' ? '250px' : undefined
        }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-500">Loading data...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-red-500 mb-2">⚠️</div>
                <div className="text-sm text-red-600">{error}</div>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 pointer-events-auto"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : data ? (
            <ChartComponent data={data} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Updated: {lastRefresh.toLocaleTimeString()}</span>
            <span className="capitalize">{config.timeRange.replace('d', ' days').replace('y', ' year')}</span>
          </div>
        </div>

        {/* Edit Mode Overlay */}
        {isEditMode && (
          <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-xl flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Custom Widget</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}