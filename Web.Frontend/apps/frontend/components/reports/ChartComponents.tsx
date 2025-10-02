"use client";

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Primary purple and secondary orange color palette with shades
const chartColors = {
  // Purple shades (primary)
  primary: '#3d3a72',       // Main purple
  purple1: '#2a2850',       // Darkest purple
  purple2: '#33305f',       // Darker purple
  purple3: '#3d3a72',       // Main purple
  purple4: '#524f8a',       // Medium purple
  purple5: '#6b68a3',       // Light purple
  purple6: '#8785bb',       // Lighter purple
  purple7: '#a3a1d4',       // Very light purple
  
  // Orange shades (secondary)
  secondary: '#f97316',     // Main orange
  orange1: '#c2410c',       // Darkest orange
  orange2: '#ea580c',       // Darker orange
  orange3: '#f97316',       // Main orange
  orange4: '#fb923c',       // Medium orange
  orange5: '#fdba74',       // Light orange
  orange6: '#fed7aa',       // Lighter orange
  orange7: '#ffedd5',       // Very light orange
  
  // Aliases for backward compatibility
  tertiary: '#524f8a',      // Medium purple
  quaternary: '#fb923c',    // Medium orange
  accent1: '#6b68a3',       // Light purple
  accent2: '#fdba74',       // Light orange
  success: '#6b68a3',       // Using light purple
  warning: '#fb923c',       // Using medium orange
  danger: '#c2410c',        // Using dark orange
  info: '#524f8a',          // Using medium purple
  light: '#ffedd5',         // Very light orange
  dark: '#2a2850'           // Darkest purple
};

// Severity colors using traditional traffic light system
const severityColors = {
  Critical: '#7f1d1d',      // Dark red (most severe)
  High: '#dc2626',          // Red
  Medium: '#f97316',        // Orange
  Low: '#16a34a'            // Green (least severe)
};

// Status colors using purple and orange shades
const statusColors = {
  Open: '#f97316',          // Main orange (needs attention)
  'In Progress': '#3d3a72', // Main purple (working on it)
  'Under Investigation': '#fb923c', // Medium orange
  Closed: '#524f8a',        // Medium purple (complete)
  Resolved: '#6b68a3'       // Light purple
};

interface LineChartProps {
  title: string;
  data: any;
  height?: number;
}

export const LineChart = ({ title, data, height = 300 }: LineChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <Line data={data} options={options} />
    </div>
  );
};

interface BarChartProps {
  title: string;
  data: any;
  height?: number;
  horizontal?: boolean;
}

export const BarChart = ({ title, data, height = 300, horizontal = false }: BarChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

interface PieChartProps {
  title: string;
  data: any;
  height?: number;
  showLegend?: boolean;
}

export const PieChart = ({ title, data, height = 300, showLegend = true }: PieChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

interface DoughnutChartProps {
  title: string;
  data: any;
  height?: number;
  showLegend?: boolean;
}

export const DoughnutChart = ({ title, data, height = 300, showLegend = true }: DoughnutChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

interface MixedChartProps {
  title: string;
  data: any;
  height?: number;
}

export const MixedChart = ({ title, data, height = 300 }: MixedChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Count'
        },
        beginAtZero: true,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Ratio'
        },
        grid: {
          drawOnChartArea: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

// Helper functions to generate chart data
export const generateMonthlyTrendData = (monthlyStats: any[]) => {
  return {
    labels: monthlyStats.map(stat => {
      const date = new Date(stat.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        label: 'Total Incidents',
        data: monthlyStats.map(stat => stat.totalIncidents),
        borderColor: chartColors.primary,
        backgroundColor: chartColors.primary + '20',
        fill: false,
        tension: 0.2,
      },
      {
        label: 'Near Misses',
        data: monthlyStats.map(stat => stat.nearMisses),
        borderColor: chartColors.secondary,
        backgroundColor: chartColors.secondary + '20',
        fill: false,
        tension: 0.2,
      },
      {
        label: 'Accidents',
        data: monthlyStats.map(stat => stat.accidents),
        borderColor: chartColors.purple4,
        backgroundColor: chartColors.purple4 + '20',
        fill: false,
        tension: 0.2,
      }
    ],
  };
};

export const generateSeverityData = (severityStats: any[]) => {
  return {
    labels: severityStats.map(stat => stat.severity),
    datasets: [
      {
        label: 'Incidents by Severity',
        data: severityStats.map(stat => stat.count),
        backgroundColor: severityStats.map(stat => severityColors[stat.severity as keyof typeof severityColors]),
        borderWidth: 1,
      },
    ],
  };
};

export const generateDepartmentData = (departmentStats: any[]) => {
  return {
    labels: departmentStats.map(stat => stat.department),
    datasets: [
      {
        label: 'Total Incidents',
        data: departmentStats.map(stat => stat.totalIncidents),
        backgroundColor: chartColors.primary,
      },
      {
        label: 'Open Incidents',
        data: departmentStats.map(stat => stat.openIncidents),
        backgroundColor: chartColors.secondary,
      },
    ],
  };
};

export const generateRootCauseData = (rootCauseData: any[]) => {
  return {
    labels: rootCauseData.map(cause => cause.cause),
    datasets: [
      {
        label: 'Root Causes',
        data: rootCauseData.map(cause => cause.count),
        backgroundColor: [
          chartColors.purple1,    // Darkest purple
          chartColors.orange2,    // Dark orange
          chartColors.purple3,    // Main purple
          chartColors.orange3,    // Main orange
          chartColors.purple5,    // Light purple
          chartColors.orange4,    // Medium orange
        ],
      },
    ],
  };
};

export const generateStatusData = (incidents: any[]) => {
  const statusCounts = incidents.reduce((acc, incident) => {
    acc[incident.status] = (acc[incident.status] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Incidents by Status',
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(
          status => statusColors[status as keyof typeof statusColors] || chartColors.light
        ),
      },
    ],
  };
};

// Near Miss vs Accident Ratio Trend
export const generateNearMissRatioData = (ratioData: any[]) => {
  return {
    labels: ratioData.map(stat => {
      const date = new Date(stat.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        type: 'bar',
        label: 'Near Misses',
        data: ratioData.map(stat => stat.nearMisses),
        backgroundColor: chartColors.secondary,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Accidents',
        data: ratioData.map(stat => stat.accidents),
        backgroundColor: chartColors.primary,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Ratio (Near Miss:Accident)',
        data: ratioData.map(stat => stat.ratio),
        borderColor: chartColors.purple5,
        backgroundColor: chartColors.purple5 + '20',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: chartColors.purple5,
        yAxisID: 'y1',
        tension: 0.2,
      }
    ],
  };
};

// Year-over-Year Comparison
export const generateYearOverYearData = (data: any) => {
  const metrics = [
    'Total Incidents',
    'Near Misses', 
    'Accidents',
    'RIDDOR Reports',
    'Avg Resolution (days)',
    'Compliance Rate (%)',
    'Open Incidents'
  ];

  return {
    labels: metrics,
    datasets: [
      {
        label: `${data.previousYear.year}`,
        data: [
          data.previousYear.totalIncidents,
          data.previousYear.nearMisses,
          data.previousYear.accidents,
          data.previousYear.riddorReports,
          data.previousYear.averageResolutionTime,
          data.previousYear.complianceRate,
          data.previousYear.openIncidents
        ],
        backgroundColor: chartColors.purple6,
      },
      {
        label: `${data.currentYear.year}`,
        data: [
          data.currentYear.totalIncidents,
          data.currentYear.nearMisses,
          data.currentYear.accidents,
          data.currentYear.riddorReports,
          data.currentYear.averageResolutionTime,
          data.currentYear.complianceRate,
          data.currentYear.openIncidents
        ],
        backgroundColor: chartColors.primary,
      }
    ],
  };
};

// Incidents not closed in 14 days chart
export const generateUnclosedIncidentsData = (data: any[]) => {
  return {
    labels: data.map(item => item.orgGroup),
    datasets: [
      {
        label: 'Incidents Not Closed in 14 Days',
        data: data.map(item => item.incidents),
        backgroundColor: chartColors.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Incidents per location
export const generateIncidentsPerLocationData = (data: any[]) => {
  return {
    labels: data.map(item => item.location),
    datasets: [
      {
        label: 'Total Incidents',
        data: data.map(item => item.incidents),
        backgroundColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.purple4,
          chartColors.orange4,
          chartColors.purple5,
          chartColors.orange5,
          chartColors.purple6,
        ],
        borderWidth: 1,
      }
    ],
  };
};

// Monthly accidents by location
export const generateMonthlyAccidentsByLocationData = (data: any[]) => {
  return {
    labels: data.map(stat => {
      const date = new Date(stat.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        label: 'Factory',
        data: data.map(stat => stat.factory),
        backgroundColor: chartColors.primary,
        stack: 'Stack 0',
      },
      {
        label: 'Warehouse',
        data: data.map(stat => stat.warehouse),
        backgroundColor: chartColors.secondary,
        stack: 'Stack 0',
      },
      {
        label: 'Office',
        data: data.map(stat => stat.office),
        backgroundColor: chartColors.purple5,
        stack: 'Stack 0',
      },
      {
        label: 'Laboratory',
        data: data.map(stat => stat.laboratory),
        backgroundColor: chartColors.orange4,
        stack: 'Stack 0',
      },
      {
        label: 'Other',
        data: data.map(stat => stat.other),
        backgroundColor: chartColors.purple6,
        stack: 'Stack 0',
      }
    ],
  };
};

// Monthly near misses by location
export const generateMonthlyNearMissesByLocationData = (data: any[]) => {
  return {
    labels: data.map(stat => {
      const date = new Date(stat.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        label: 'Factory',
        data: data.map(stat => stat.factory),
        backgroundColor: chartColors.primary,
        stack: 'Stack 0',
      },
      {
        label: 'Warehouse',
        data: data.map(stat => stat.warehouse),
        backgroundColor: chartColors.secondary,
        stack: 'Stack 0',
      },
      {
        label: 'Office',
        data: data.map(stat => stat.office),
        backgroundColor: chartColors.purple5,
        stack: 'Stack 0',
      },
      {
        label: 'Laboratory',
        data: data.map(stat => stat.laboratory),
        backgroundColor: chartColors.orange4,
        stack: 'Stack 0',
      },
      {
        label: 'Other',
        data: data.map(stat => stat.other),
        backgroundColor: chartColors.purple6,
        stack: 'Stack 0',
      }
    ],
  };
};

export { chartColors, severityColors, statusColors };