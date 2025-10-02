"use client";

import { useState } from 'react';
import { 
  KPICard, 
  StatCard, 
  MetricGrid, 
  ReportSection, 
  AlertCard,
  ChartBarIcon,
  ExclamationIcon,
  ClockIcon,
  CheckIcon
} from './ReportCards';
import { RecentIncidentsTable } from './RecentIncidentsTable';
import { IncidentFilters, defaultIncidentFilters, IncidentFiltersType } from './IncidentFilters';
import { 
  LineChart, 
  DoughnutChart, 
  BarChart,
  MixedChart,
  generateMonthlyTrendData, 
  generateSeverityData,
  generateNearMissRatioData,
  generateYearOverYearData,
  generateUnclosedIncidentsData,
  generateIncidentsPerLocationData,
  generateMonthlyAccidentsByLocationData,
  generateMonthlyNearMissesByLocationData
} from './ChartComponents';
import { HeinrichTriangle } from './HeinrichTriangle';
import { 
  kpiData, 
  monthlyStats, 
  severityStats, 
  riddorData,
  nearMissRatioData,
  yearOverYearData,
  heinrichTriangleData,
  unclosedIncidentsData,
  incidentsPerLocationData,
  monthlyAccidentsByLocationData,
  monthlyNearMissesByLocationData
} from '@/data/mockReportsData';

export const ExecutiveDashboard = () => {
  const [incidentFilters, setIncidentFilters] = useState<IncidentFiltersType>(defaultIncidentFilters);
  
  const monthlyTrendData = generateMonthlyTrendData(monthlyStats);
  const severityChartData = generateSeverityData(severityStats);
  const nearMissRatioChartData = generateNearMissRatioData(nearMissRatioData);
  const yearOverYearChartData = generateYearOverYearData(yearOverYearData);
  const unclosedIncidentsChartData = generateUnclosedIncidentsData(unclosedIncidentsData);
  const incidentsPerLocationChartData = generateIncidentsPerLocationData(incidentsPerLocationData);
  const monthlyAccidentsByLocationChartData = generateMonthlyAccidentsByLocationData(monthlyAccidentsByLocationData);
  const monthlyNearMissesByLocationChartData = generateMonthlyNearMissesByLocationData(monthlyNearMissesByLocationData);
  
  const handleIncidentFiltersReset = () => {
    setIncidentFilters(defaultIncidentFilters);
  };

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <ReportSection 
        title="Key Performance Indicators" 
        description="High-level overview of incident management performance"
      >
        <MetricGrid cols={4}>
          <KPICard
            title="Total Incidents"
            value={kpiData.totalIncidents}
            subtitle="This month"
            trend={{
              value: kpiData.monthlyChange.totalIncidents,
              label: "from last month"
            }}
            icon={<ChartBarIcon />}
            color="primary"
          />
          <KPICard
            title="Open Incidents"
            value={kpiData.openIncidents}
            subtitle={`${kpiData.overdueIncidents} overdue`}
            icon={<ExclamationIcon />}
            color="warning"
          />
          <KPICard
            title="Avg Resolution Time"
            value={`${kpiData.averageResolutionTime} days`}
            trend={{
              value: kpiData.monthlyChange.averageResolutionTime,
              label: "from last month"
            }}
            icon={<ClockIcon />}
            color="info"
          />
          <KPICard
            title="Compliance Rate"
            value={`${kpiData.complianceRate}%`}
            subtitle="Above target (90%)"
            trend={{
              value: kpiData.monthlyChange.complianceRate,
              label: "from last month"
            }}
            icon={<CheckIcon />}
            color="success"
          />
        </MetricGrid>
      </ReportSection>

      {/* Incident Filters */}
      <IncidentFilters 
        filters={incidentFilters}
        onFiltersChange={setIncidentFilters}
        onReset={handleIncidentFiltersReset}
      />

      {/* Recent Incidents Table */}
      <ReportSection 
        title="Recent Incidents" 
        description="Latest incidents reported across the organization"
      >
        <RecentIncidentsTable filters={incidentFilters} />
      </ReportSection>

      {/* Heinrich Triangle */}
      <ReportSection 
        title="Heinrich Triangle (accident severity chart)" 
        description="Heinrich's accident triangle showing the relationship between incident types"
      >
        <HeinrichTriangle data={heinrichTriangleData} />
      </ReportSection>

      {/* Trend Analysis and Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportSection 
          title="Incident Trends" 
          description="Monthly incident trends over the past 6 months"
          actions={
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View Detailed Analysis →
            </button>
          }
        >
          <LineChart 
            title="" 
            data={monthlyTrendData} 
            height={300}
          />
        </ReportSection>

        <ReportSection 
          title="Incidents by Severity" 
          description="Distribution of incidents by severity level"
          actions={
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View Breakdown →
            </button>
          }
        >
          <DoughnutChart 
            title="" 
            data={severityChartData} 
            height={300}
          />
        </ReportSection>
      </div>

      {/* Near Miss vs Accident Ratio Trend */}
      <ReportSection 
        title="Near Miss vs Accident Ratio Trend" 
        description="Leading indicator of safety culture - higher ratios indicate proactive hazard reporting"
      >
        <MixedChart 
          title="" 
          data={nearMissRatioChartData} 
          height={350}
        />
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Target Ratio:</strong> Maintain a near miss to accident ratio above 3:1. 
            Current trend shows a ratio of {nearMissRatioData[nearMissRatioData.length - 1].ratio.toFixed(2)}:1
          </p>
        </div>
      </ReportSection>

      {/* Year-over-Year Comparison */}
      <ReportSection 
        title="Year-over-Year Performance Comparison" 
        description="Compare key safety metrics between current and previous year"
      >
        <BarChart 
          title="" 
          data={yearOverYearChartData} 
          height={350}
          horizontal={true}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">Total Incidents</p>
            <p className={`text-lg font-bold ${yearOverYearData.percentageChanges.totalIncidents < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yearOverYearData.percentageChanges.totalIncidents > 0 ? '+' : ''}{yearOverYearData.percentageChanges.totalIncidents}%
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">Resolution Time</p>
            <p className={`text-lg font-bold ${yearOverYearData.percentageChanges.averageResolutionTime < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yearOverYearData.percentageChanges.averageResolutionTime > 0 ? '+' : ''}{yearOverYearData.percentageChanges.averageResolutionTime}%
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">Compliance Rate</p>
            <p className={`text-lg font-bold ${yearOverYearData.percentageChanges.complianceRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yearOverYearData.percentageChanges.complianceRate > 0 ? '+' : ''}{yearOverYearData.percentageChanges.complianceRate}%
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">Open Incidents</p>
            <p className={`text-lg font-bold ${yearOverYearData.percentageChanges.openIncidents < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yearOverYearData.percentageChanges.openIncidents > 0 ? '+' : ''}{yearOverYearData.percentageChanges.openIncidents}%
            </p>
          </div>
        </div>
      </ReportSection>

      {/* RIDDOR Compliance Summary */}
      <ReportSection 
        title="RIDDOR Compliance Summary" 
        description="Regulatory reporting compliance and deadlines"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            label="Total RIDDOR Cases"
            value={riddorData.totalRiddorIncidents}
            accent="#3d3a72"
          />
          <StatCard
            label="Submission Rate"
            value={`${riddorData.submissionRate}%`}
            change={{
              value: 5.2,
              period: "this month",
              isPositive: true
            }}
            accent="#10b981"
          />
          <StatCard
            label="Avg Submission Time"
            value={`${riddorData.averageSubmissionTime} days`}
            change={{
              value: -12.5,
              period: "vs target",
              isPositive: true
            }}
            accent="#3b82f6"
          />
        </div>

        {riddorData.upcomingDeadlines.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Deadlines</h4>
            <div className="space-y-2">
              {riddorData.upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {deadline.caseNumber} - {deadline.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(deadline.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    deadline.daysLeft <= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {deadline.daysLeft} day{deadline.daysLeft !== 1 ? 's' : ''} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </ReportSection>

      {/* Incidents Not Closed in 14 Days */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportSection 
          title="Incidents Not Closed in 14 Days" 
          description="Organization groups with overdue incidents"
        >
          <BarChart 
            title="" 
            data={unclosedIncidentsChartData} 
            height={300}
          />
        </ReportSection>

        <ReportSection 
          title="Incidents by Location" 
          description="Distribution of incidents across different locations"
        >
          <BarChart 
            title="" 
            data={incidentsPerLocationChartData} 
            height={300}
          />
        </ReportSection>
      </div>

      {/* Location-based Monthly Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportSection 
          title="Monthly Accidents by Location" 
          description="Accident trends broken down by location"
        >
          <BarChart 
            title="" 
            data={monthlyAccidentsByLocationChartData} 
            height={300}
          />
        </ReportSection>

        <ReportSection 
          title="Monthly Near Misses by Location" 
          description="Near miss trends broken down by location"
        >
          <BarChart 
            title="" 
            data={monthlyNearMissesByLocationChartData} 
            height={300}
          />
        </ReportSection>
      </div>

      {/* Quick Actions */}
      <ReportSection title="Quick Actions" description="Common reporting and management tasks">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Generate Monthly Report</h4>
            <p className="text-sm text-gray-600">Create comprehensive monthly safety report</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Export Data</h4>
            <p className="text-sm text-gray-600">Download incident data for external analysis</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Schedule Report</h4>
            <p className="text-sm text-gray-600">Set up automated report delivery</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">View Trends</h4>
            <p className="text-sm text-gray-600">Access detailed trend analysis</p>
          </button>
        </div>
      </ReportSection>
    </div>
  );
};