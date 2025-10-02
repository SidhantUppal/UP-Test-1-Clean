'use client';

import React, { useState } from 'react';
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
  ChartOptions,
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

interface DrillDownWidgetBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (widgetConfig: any) => void;
  restrictToModule?: string;
}

// Module definitions with available metrics
const MODULE_DEFINITIONS = {
  incidents: {
    name: 'Incidents',
    icon: '🚨',
    metrics: [
      { id: 'total_count', name: 'Total Incidents', type: 'number' },
      { id: 'by_severity', name: 'By Severity Level', type: 'category' },
      { id: 'by_type', name: 'By Incident Type', type: 'category' },
      { id: 'by_location', name: 'By Location', type: 'category' },
      { id: 'trend_monthly', name: 'Monthly Trend', type: 'time_series' },
      { id: 'resolution_time', name: 'Average Resolution Time', type: 'duration' },
      { id: 'status_distribution', name: 'Status Distribution', type: 'category' },
      { id: 'cost_impact', name: 'Cost Impact', type: 'currency' }
    ],
    filters: ['date_range', 'severity', 'type', 'location', 'status', 'assigned_to']
  },
  checklists: {
    name: 'Checklists',
    icon: '✅',
    metrics: [
      { id: 'completion_rate', name: 'Completion Rate', type: 'percentage' },
      { id: 'by_category', name: 'By Category', type: 'category' },
      { id: 'overdue_items', name: 'Overdue Items', type: 'number' },
      { id: 'completion_trend', name: 'Completion Trend', type: 'time_series' },
      { id: 'avg_completion_time', name: 'Avg Completion Time', type: 'duration' },
      { id: 'by_assignee', name: 'By Assignee', type: 'category' },
      { id: 'quality_score', name: 'Quality Score', type: 'rating' }
    ],
    filters: ['date_range', 'category', 'assignee', 'status', 'priority']
  },
  'behavioural-safety': {
    name: 'Behavioral Safety',
    icon: '🛡️',
    metrics: [
      { id: 'total_reports', name: 'Total Reports', type: 'number' },
      { id: 'by_category', name: 'By Category', type: 'category' },
      { id: 'interventions', name: 'Safety Interventions', type: 'number' },
      { id: 'saves_count', name: 'Active Saves', type: 'number' },
      { id: 'participation_rate', name: 'Participation Rate', type: 'percentage' },
      { id: 'points_earned', name: 'Team Points', type: 'number' },
      { id: 'trend_daily', name: 'Daily Trend', type: 'time_series' },
      { id: 'by_observer', name: 'By Observer', type: 'category' },
      { id: 'coaching_opportunities', name: 'Coaching Opportunities', type: 'number' }
    ],
    filters: ['date_range', 'category', 'observer', 'location', 'shift', 'department']
  },
  'risk-assessments': {
    name: 'Risk Assessments',
    icon: '⚠️',
    metrics: [
      { id: 'risk_distribution', name: 'Risk Level Distribution', type: 'category' },
      { id: 'by_area', name: 'By Area/Department', type: 'category' },
      { id: 'trending_risks', name: 'Trending Risk Levels', type: 'time_series' },
      { id: 'mitigation_status', name: 'Mitigation Status', type: 'category' },
      { id: 'overdue_assessments', name: 'Overdue Assessments', type: 'number' },
      { id: 'risk_score_avg', name: 'Average Risk Score', type: 'number' },
      { id: 'by_risk_type', name: 'By Risk Type', type: 'category' }
    ],
    filters: ['date_range', 'risk_level', 'area', 'assessor', 'status', 'risk_type']
  },
  environmental: {
    name: 'Environmental',
    icon: '🌱',
    metrics: [
      { id: 'total_reports', name: 'Total Reports', type: 'number' },
      { id: 'by_category', name: 'By Category', type: 'category' },
      { id: 'compliance_score', name: 'Compliance Score', type: 'percentage' },
      { id: 'active_incidents', name: 'Active Incidents', type: 'number' },
      { id: 'participation_rate', name: 'Participation Rate', type: 'percentage' },
      { id: 'trend_monthly', name: 'Monthly Trend', type: 'time_series' },
      { id: 'corrective_actions', name: 'Corrective Actions', type: 'number' },
      { id: 'by_location', name: 'By Location', type: 'category' },
      { id: 'good_practices', name: 'Good Practices', type: 'number' }
    ],
    filters: ['date_range', 'category', 'location', 'severity', 'status', 'reporter']
  },
  tasks: {
    name: 'Tasks',
    icon: '📋',
    metrics: [
      { id: 'completion_rate', name: 'Task Completion Rate', type: 'percentage' },
      { id: 'by_priority', name: 'By Priority Level', type: 'category' },
      { id: 'by_status', name: 'By Status', type: 'category' },
      { id: 'overdue_tasks', name: 'Overdue Tasks', type: 'number' },
      { id: 'completion_trend', name: 'Completion Trend', type: 'time_series' },
      { id: 'by_assignee', name: 'By Assignee', type: 'category' },
      { id: 'avg_completion_time', name: 'Avg Completion Time', type: 'duration' }
    ],
    filters: ['date_range', 'priority', 'status', 'assignee', 'category', 'due_date']
  },
  training: {
    name: 'Training',
    icon: '🎓',
    metrics: [
      { id: 'compliance_rate', name: 'Training Compliance Rate', type: 'percentage' },
      { id: 'by_course', name: 'By Course/Module', type: 'category' },
      { id: 'completion_trend', name: 'Completion Trend', type: 'time_series' },
      { id: 'expiring_certifications', name: 'Expiring Certifications', type: 'number' },
      { id: 'by_department', name: 'By Department', type: 'category' },
      { id: 'training_hours', name: 'Total Training Hours', type: 'duration' },
      { id: 'pass_rate', name: 'Pass/Fail Rate', type: 'percentage' }
    ],
    filters: ['date_range', 'course', 'department', 'status', 'instructor']
  },
  permits: {
    name: 'Permits',
    icon: '📄',
    metrics: [
      { id: 'active_permits', name: 'Active Permits', type: 'number' },
      { id: 'by_type', name: 'By Permit Type', type: 'category' },
      { id: 'expiring_soon', name: 'Expiring Soon', type: 'number' },
      { id: 'by_location', name: 'By Location', type: 'category' },
      { id: 'approval_time', name: 'Average Approval Time', type: 'duration' },
      { id: 'renewal_trend', name: 'Renewal Trend', type: 'time_series' },
      { id: 'by_status', name: 'By Status', type: 'category' }
    ],
    filters: ['date_range', 'permit_type', 'location', 'status', 'approver']
  }
};

// Chart type definitions
const CHART_TYPES = [
  { 
    id: 'bar', 
    name: 'Bar Chart', 
    icon: '📊', 
    component: Bar,
    bestFor: ['category', 'number'],
    description: 'Compare values across categories'
  },
  { 
    id: 'line', 
    name: 'Line Chart', 
    icon: '📈', 
    component: Line,
    bestFor: ['time_series', 'duration'],
    description: 'Show trends over time'
  },
  { 
    id: 'pie', 
    name: 'Pie Chart', 
    icon: '🥧', 
    component: Pie,
    bestFor: ['category', 'percentage'],
    description: 'Show proportions of a whole'
  },
  { 
    id: 'doughnut', 
    name: 'Doughnut Chart', 
    icon: '🍩', 
    component: Doughnut,
    bestFor: ['category', 'percentage'],
    description: 'Modern proportional view'
  },
  { 
    id: 'radar', 
    name: 'Radar Chart', 
    icon: '📡', 
    component: Radar,
    bestFor: ['rating', 'number'],
    description: 'Multi-dimensional comparison'
  },
  { 
    id: 'polar', 
    name: 'Polar Area', 
    icon: '🎯', 
    component: PolarArea,
    bestFor: ['category', 'rating'],
    description: 'Circular category display'
  }
];

// Color schemes
const COLOR_SCHEMES = {
  default: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
  professional: ['#1E40AF', '#DC2626', '#059669', '#D97706', '#7C3AED', '#DB2777'],
  soft: ['#93C5FD', '#FCA5A5', '#86EFAC', '#FDE68A', '#C4B5FD', '#F9A8D4'],
  dark: ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB'],
  vibrant: ['#06B6D4', '#F43F5E', '#22C55E', '#FACC15', '#A855F7', '#EC4899']
};

export default function DrillDownWidgetBuilder({ isOpen, onClose, onSave, restrictToModule }: DrillDownWidgetBuilderProps) {
  const [step, setStep] = useState(restrictToModule ? 2 : 1);
  const [selectedModule, setSelectedModule] = useState<string>(restrictToModule || '');
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedChartType, setSelectedChartType] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [chartTitle, setChartTitle] = useState('');
  const [colorScheme, setColorScheme] = useState('default');
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshRate, setRefreshRate] = useState('5min');

  // Generate sample data based on selections
  const generateSampleData = () => {
    if (!selectedModule || !selectedMetric || !selectedChartType) return null;

    const module = MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS];
    const metric = module?.metrics.find(m => m.id === selectedMetric);
    const colors = COLOR_SCHEMES[colorScheme as keyof typeof COLOR_SCHEMES];

    if (!metric) return null;

    // Generate different data based on metric type
    switch (metric.type) {
      case 'category':
        return {
          labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
          datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: colors,
            borderColor: colors.map(c => c + '80'),
            borderWidth: 2
          }]
        };
      
      case 'time_series':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: metric.name,
            data: [12, 19, 15, 25, 22, 18],
            borderColor: colors[0],
            backgroundColor: colors[0] + '20',
            tension: 0.4,
            fill: true
          }]
        };
      
      case 'percentage':
        return {
          labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
          datasets: [{
            data: [65, 20, 10, 5],
            backgroundColor: colors.slice(0, 4),
            borderWidth: 2
          }]
        };
      
      default:
        return {
          labels: ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
          datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: colors.slice(0, 4)
          }]
        };
    }
  };

  const getRecommendedCharts = () => {
    if (!selectedModule || !selectedMetric) return [];
    
    const module = MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS];
    const metric = module?.metrics.find(m => m.id === selectedMetric);
    
    if (!metric) return [];
    
    return CHART_TYPES.filter(chart => 
      chart.bestFor.includes(metric.type)
    ).sort((a, b) => 
      a.bestFor.indexOf(metric.type) - b.bestFor.indexOf(metric.type)
    );
  };

  const renderPreview = () => {
    const data = generateSampleData();
    if (!data || !selectedChartType) return null;

    const chartType = CHART_TYPES.find(c => c.id === selectedChartType);
    if (!chartType) return null;

    const ChartComponent = chartType.component;
    
    const options: ChartOptions<any> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: !!chartTitle,
          text: chartTitle || 'Chart Preview'
        },
        legend: {
          position: 'bottom' as const
        }
      }
    };

    return (
      <div className="h-64 bg-white rounded-lg border border-gray-200 p-4">
        <ChartComponent data={data} options={options} />
      </div>
    );
  };

  const handleSave = () => {
    if (!selectedModule || !selectedMetric || !selectedChartType) return;

    const widgetConfig = {
      id: `custom-${Date.now()}`,
      type: 'custom_drilldown',
      module: selectedModule,
      metric: selectedMetric,
      chartType: selectedChartType,
      title: chartTitle || `${MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS].name} ${selectedMetric.replace('_', ' ')}`,
      filters: selectedFilters,
      colorScheme,
      timeRange,
      refreshRate,
      size: 'medium' as const
    };

    onSave(widgetConfig);
    onClose();
    
    // Reset form
    setStep(restrictToModule ? 2 : 1);
    setSelectedModule(restrictToModule || '');
    setSelectedMetric('');
    setSelectedChartType('');
    setSelectedFilters([]);
    setChartTitle('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#3d3a72', color: 'white', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Custom Widget Builder</h2>
              <p className="mt-1" style={{ color: '#ffffff99' }}>Create your perfect dashboard widget</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">×</button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            {(restrictToModule ? [2, 3, 4] : [1, 2, 3, 4]).map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNum ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'
                }`}>
                  {restrictToModule ? stepNum - 1 : stepNum}
                </div>
                {stepNum < (restrictToModule ? 4 : 4) && <div className={`w-8 h-0.5 ${step > stepNum ? 'bg-white' : 'bg-blue-400'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Module Selection */}
          {step === 1 && !restrictToModule && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Step 1: Choose a Module</h3>
              <p className="text-gray-600 mb-6">Select which module you want to create a widget for</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(MODULE_DEFINITIONS).map(([key, module]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedModule(key);
                      setStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      selectedModule === key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{module.icon}</div>
                    <div className="font-medium text-gray-900">{module.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{module.metrics.length} metrics available</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Metric Selection */}
          {step === 2 && selectedModule && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {restrictToModule ? 'Step 1: What do you want to report on?' : 'Step 2: What do you want to report on?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {restrictToModule 
                  ? 'Choose the specific task metric you want to visualize' 
                  : 'Choose the specific metric you want to visualize'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS].metrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => {
                      setSelectedMetric(metric.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                      selectedMetric === metric.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{metric.name}</div>
                    <div className="text-sm text-gray-500 mt-1 capitalize">
                      {metric.type.replace('_', ' ')} data
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 flex gap-2">
                {!restrictToModule && (
                  <button onClick={() => setStep(1)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Back
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Chart Type Selection */}
          {step === 3 && selectedMetric && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {restrictToModule ? 'Step 2: Choose Chart Type' : 'Step 3: Choose Chart Type'}
              </h3>
              <p className="text-gray-600 mb-6">Select how you want to visualize this data</p>
              
              {/* Recommended Charts */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Recommended for this metric:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {getRecommendedCharts().map((chart) => (
                    <button
                      key={chart.id}
                      onClick={() => {
                        setSelectedChartType(chart.id);
                        setStep(4);
                      }}
                      className="p-4 rounded-lg border-2 border-green-200 bg-green-50 hover:bg-green-100 transition-all"
                    >
                      <div className="text-2xl mb-2">{chart.icon}</div>
                      <div className="font-medium text-gray-900">{chart.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{chart.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* All Chart Types */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">All Chart Types:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {CHART_TYPES.map((chart) => (
                    <button
                      key={chart.id}
                      onClick={() => {
                        setSelectedChartType(chart.id);
                        setStep(4);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        selectedChartType === chart.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{chart.icon}</div>
                      <div className="font-medium text-gray-900">{chart.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{chart.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button onClick={() => setStep(2)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Configuration & Preview */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {restrictToModule ? 'Step 3: Configure & Preview' : 'Step 4: Configure & Preview'}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Panel */}
                <div className="space-y-6">
                  {/* Widget Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Widget Title</label>
                    <input
                      type="text"
                      value={chartTitle}
                      onChange={(e) => setChartTitle(e.target.value)}
                      placeholder={`${MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS].name} ${selectedMetric.replace('_', ' ')}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Color Scheme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(COLOR_SCHEMES).map(([scheme, colors]) => (
                        <button
                          key={scheme}
                          onClick={() => setColorScheme(scheme)}
                          className={`p-2 rounded-lg border-2 ${
                            colorScheme === scheme ? 'border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex gap-1">
                            {colors.slice(0, 3).map((color, i) => (
                              <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                            ))}
                          </div>
                          <div className="text-xs mt-1 capitalize">{scheme}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                    <select 
                      value={timeRange} 
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 3 months</option>
                      <option value="1y">Last year</option>
                      <option value="custom">Custom range</option>
                    </select>
                  </div>

                  {/* Filters */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Filters</label>
                    <div className="space-y-2">
                      {MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS].filters.map((filter) => (
                        <label key={filter} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(filter)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters([...selectedFilters, filter]);
                              } else {
                                setSelectedFilters(selectedFilters.filter(f => f !== filter));
                              }
                            }}
                            className="mr-2 rounded"
                          />
                          <span className="text-sm capitalize">{filter.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Refresh Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Auto Refresh</label>
                    <select 
                      value={refreshRate} 
                      onChange={(e) => setRefreshRate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="manual">Manual only</option>
                      <option value="1min">Every minute</option>
                      <option value="5min">Every 5 minutes</option>
                      <option value="15min">Every 15 minutes</option>
                      <option value="1h">Every hour</option>
                    </select>
                  </div>
                </div>

                {/* Live Preview */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Live Preview</h4>
                  {renderPreview()}
                  
                  {/* Preview Info */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-700">
                      <div><strong>Module:</strong> {MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS].name}</div>
                      <div><strong>Metric:</strong> {MODULE_DEFINITIONS[selectedModule as keyof typeof MODULE_DEFINITIONS].metrics.find(m => m.id === selectedMetric)?.name}</div>
                      <div><strong>Chart:</strong> {CHART_TYPES.find(c => c.id === selectedChartType)?.name}</div>
                      <div><strong>Filters:</strong> {selectedFilters.length} selected</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(3)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Back
                </button>
                <div className="flex gap-3">
                  <button onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#3d3a72' }}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2d2a5a'}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3d3a72'}
                  >
                    Add Widget to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}