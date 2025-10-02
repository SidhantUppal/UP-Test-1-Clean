"use client";

import { useState } from 'react';
import { ReportSection, MetricGrid, KPICard } from './ReportCards';
import { BarChart, PieChart, DoughnutChart, generateDepartmentData, generateSeverityData, generateRootCauseData } from './ChartComponents';
import { departmentStats, severityStats, rootCauseData, timeToReportData, mockIncidents } from '@/data/mockReportsData';

export const DepartmentAnalysis = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [analysisView, setAnalysisView] = useState<'overview' | 'department' | 'severity' | 'causes'>('overview');

  // Generate chart data
  const departmentChartData = generateDepartmentData(departmentStats);
  const severityChartData = generateSeverityData(severityStats);
  const rootCauseChartData = generateRootCauseData(rootCauseData);

  // Calculate department risk scores and rankings
  const departmentRankings = [...departmentStats]
    .sort((a, b) => b.riskScore - a.riskScore)
    .map((dept, index) => ({ ...dept, rank: index + 1 }));

  const highRiskDepartments = departmentRankings.filter(dept => dept.riskScore >= 7.0);

  // Time to report data for pie chart
  const timeToReportChartData = {
    labels: timeToReportData.map(item => item.range),
    datasets: [{
      data: timeToReportData.map(item => item.count),
      backgroundColor: [
        '#10b981', // Same Day - Green
        '#3b82f6', // 1-2 Days - Blue  
        '#f59e0b', // 3-7 Days - Yellow
        '#ef4444'  // Over 1 Week - Red
      ],
    }],
  };

  // Filter incidents by department if one is selected
  const getFilteredIncidents = () => {
    if (selectedDepartment === 'all') return mockIncidents;
    return mockIncidents.filter(incident => incident.department === selectedDepartment);
  };

  const filteredIncidents = getFilteredIncidents();

  // Calculate department-specific metrics
  const getDepartmentMetrics = (deptName: string) => {
    const deptIncidents = mockIncidents.filter(incident => incident.department === deptName);
    const totalIncidents = deptIncidents.length;
    const openIncidents = deptIncidents.filter(incident => incident.status === 'Open').length;
    const highSeverity = deptIncidents.filter(incident => ['High', 'Critical'].includes(incident.severity)).length;
    
    // Calculate average resolution time for closed incidents
    const resolvedIncidents = deptIncidents.filter(incident => incident.resolutionTime);
    const avgResolutionTime = resolvedIncidents.length > 0 
      ? resolvedIncidents.reduce((sum, incident) => sum + (incident.resolutionTime || 0), 0) / resolvedIncidents.length
      : 0;

    return {
      totalIncidents,
      openIncidents,
      highSeverity,
      avgResolutionTime: avgResolutionTime.toFixed(1)
    };
  };

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* High Risk Departments Alert */}
      {highRiskDepartments.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">High Risk Departments</h4>
          <p className="text-sm text-yellow-700 mb-3">
            {highRiskDepartments.length} department{highRiskDepartments.length !== 1 ? 's have' : ' has'} a risk score above 7.0:
          </p>
          <div className="flex flex-wrap gap-2">
            {highRiskDepartments.map(dept => (
              <span key={dept.department} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                {dept.department} ({dept.riskScore})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Department Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart 
          title="Incidents by Department" 
          data={departmentChartData} 
          height={350}
        />
        <PieChart 
          title="Incidents by Severity" 
          data={severityChartData} 
          height={350}
        />
      </div>

      {/* Top 3 Departments by Risk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departmentRankings.slice(0, 3).map(dept => (
          <div key={dept.department} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">#{dept.rank} {dept.department}</h4>
              <span className={`px-2 py-1 rounded text-sm font-medium ${
                dept.riskScore >= 8 ? 'bg-red-100 text-red-800' :
                dept.riskScore >= 6 ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                Risk: {dept.riskScore}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Incidents:</span>
                <span className="font-medium">{dept.totalIncidents}</span>
              </div>
              <div className="flex justify-between">
                <span>Open Cases:</span>
                <span className="font-medium">{dept.openIncidents}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Resolution:</span>
                <span className="font-medium">{dept.averageResolutionTime} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDepartmentDetails = () => {
    const selectedDept = departmentStats.find(d => d.department === selectedDepartment);
    if (!selectedDept) return null;

    const metrics = getDepartmentMetrics(selectedDepartment);

    return (
      <div className="space-y-6">
        <MetricGrid cols={4}>
          <KPICard
            title="Total Incidents"
            value={metrics.totalIncidents}
            color="primary"
          />
          <KPICard
            title="Open Cases"
            value={metrics.openIncidents}
            color="warning"
          />
          <KPICard
            title="High Severity"
            value={metrics.highSeverity}
            color="danger"
          />
          <KPICard
            title="Avg Resolution"
            value={`${metrics.avgResolutionTime} days`}
            color="info"
          />
        </MetricGrid>

        {/* Department-specific incidents table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h4 className="font-semibold text-gray-900">Recent Incidents - {selectedDepartment}</h4>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredIncidents.slice(0, 10).map(incident => (
              <div key={incident.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{incident.caseNumber}</p>
                    <p className="text-sm text-gray-600">{incident.type}</p>
                    <p className="text-xs text-gray-500">{incident.date} - {incident.location}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      incident.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.severity}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{incident.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Analysis Controls */}
      <ReportSection title="Department & Risk Analysis" description="Detailed analysis by department and risk factors">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* View Type Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setAnalysisView('overview')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                analysisView === 'overview'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setAnalysisView('department')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                analysisView === 'department'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Department Detail
            </button>
            <button
              onClick={() => setAnalysisView('severity')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                analysisView === 'severity'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Severity Analysis
            </button>
            <button
              onClick={() => setAnalysisView('causes')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                analysisView === 'causes'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Root Causes
            </button>
          </div>

          {/* Department Selector (only show when in department detail view) */}
          {analysisView === 'department' && (
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departmentStats.map(dept => (
                <option key={dept.department} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Render content based on selected view */}
        {analysisView === 'overview' && renderOverviewSection()}
        {analysisView === 'department' && selectedDepartment !== 'all' && renderDepartmentDetails()}
        {analysisView === 'department' && selectedDepartment === 'all' && renderOverviewSection()}
        
        {analysisView === 'severity' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DoughnutChart 
                title="Incident Distribution by Severity" 
                data={severityChartData} 
                height={350}
              />
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Severity Breakdown</h4>
                {severityStats.map(severity => (
                  <div key={severity.severity} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${
                        severity.severity === 'Critical' ? 'bg-red-500' :
                        severity.severity === 'High' ? 'bg-orange-500' :
                        severity.severity === 'Medium' ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}></div>
                      <span className="font-medium">{severity.severity}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{severity.count} incidents</p>
                      <p className="text-sm text-gray-600">{severity.percentage}% of total</p>
                      <p className={`text-xs ${
                        severity.trend > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {severity.trend > 0 ? '+' : ''}{severity.trend}% vs last period
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {analysisView === 'causes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PieChart 
                title="Root Cause Analysis" 
                data={rootCauseChartData} 
                height={350}
              />
              <PieChart 
                title="Time to Report Incidents" 
                data={timeToReportChartData} 
                height={350}
              />
            </div>
            
            {/* Root Cause Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Focus on human error reduction through enhanced training and procedure review</li>
                <li>• Implement predictive maintenance to reduce equipment failure incidents</li>
                <li>• Review and improve process documentation to minimize process-related issues</li>
                <li>• Encourage same-day reporting - {timeToReportData[0].percentage}% currently report same day</li>
              </ul>
            </div>
          </div>
        )}
      </ReportSection>
    </div>
  );
};