"use client";

import React, { useState, useEffect } from 'react';
import { HSEStatisticsCalculator } from '@/components/reports/HSEStatisticsCalculator';
import { TrendAnalysisCharts, TrendData } from '@/components/reports/TrendAnalysisCharts';
import { EnhancedReportFilters, EnhancedReportFiltersType, defaultEnhancedReportFilters } from '@/components/reports/EnhancedReportFilters';
import { ReportExport, ExportOptions } from '@/components/reports/ReportExport';

export default function IncidentReports() {
  const [filters, setFilters] = useState<EnhancedReportFiltersType>(defaultEnhancedReportFilters);
  const [isExporting, setIsExporting] = useState(false);

  // Mock trend data - replace with API call
  const mockTrendData: TrendData[] = [
    {
      month: '2024-01',
      totalIncidents: 45,
      nearMisses: 32,
      accidents: 13,
      injuryTypeBreakdown: { cuts: 5, burns: 3, sprains: 8, fractures: 2, other: 27 },
      incidentTypeBreakdown: { slips: 8, falls: 5, equipment: 12, manual_handling: 15, chemical: 3, other: 2 }
    },
    {
      month: '2024-02',
      totalIncidents: 38,
      nearMisses: 28,
      accidents: 10,
      injuryTypeBreakdown: { cuts: 4, burns: 2, sprains: 6, fractures: 1, other: 25 },
      incidentTypeBreakdown: { slips: 6, falls: 4, equipment: 10, manual_handling: 12, chemical: 4, other: 2 }
    },
    {
      month: '2024-03',
      totalIncidents: 52,
      nearMisses: 35,
      accidents: 17,
      injuryTypeBreakdown: { cuts: 7, burns: 4, sprains: 10, fractures: 3, other: 28 },
      incidentTypeBreakdown: { slips: 10, falls: 7, equipment: 15, manual_handling: 18, chemical: 2, other: 0 }
    },
    {
      month: '2024-04',
      totalIncidents: 41,
      nearMisses: 29,
      accidents: 12,
      injuryTypeBreakdown: { cuts: 6, burns: 2, sprains: 7, fractures: 2, other: 24 },
      incidentTypeBreakdown: { slips: 7, falls: 5, equipment: 11, manual_handling: 14, chemical: 3, other: 1 }
    },
    {
      month: '2024-05',
      totalIncidents: 47,
      nearMisses: 33,
      accidents: 14,
      injuryTypeBreakdown: { cuts: 6, burns: 3, sprains: 9, fractures: 2, other: 27 },
      incidentTypeBreakdown: { slips: 9, falls: 6, equipment: 13, manual_handling: 16, chemical: 2, other: 1 }
    },
    {
      month: '2024-06',
      totalIncidents: 44,
      nearMisses: 31,
      accidents: 13,
      injuryTypeBreakdown: { cuts: 5, burns: 3, sprains: 8, fractures: 3, other: 25 },
      incidentTypeBreakdown: { slips: 8, falls: 5, equipment: 12, manual_handling: 15, chemical: 3, other: 1 }
    }
  ];

  // Mock statistics - replace with API call
  const mockStatistics = {
    totalIncidents: 267,
    lostTimeInjuries: 23,
    openIncidents: 42,
    closedIncidents: 225,
    averageResolutionDays: 8.5,
    nearMissRatio: 2.1
  };

  const handleFiltersChange = (newFilters: EnhancedReportFiltersType) => {
    setFilters(newFilters);
    // TODO: Apply filters to data and reload charts
  };

  const handleFiltersReset = () => {
    setFilters(defaultEnhancedReportFilters);
  };

  const handleExport = async (options: ExportOptions) => {
    setIsExporting(true);
    try {
      // Mock export delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implement actual export logic
      console.log('Exporting with options:', options);
      
      // Mock file download
      const filename = `incident-report-${new Date().toISOString().split('T')[0]}.${options.format}`;
      console.log(`Downloaded: ${filename}`);
      
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Incident Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Analyze incident trends and generate safety reports</p>
            </div>
            <ReportExport 
              onExport={handleExport} 
              isExporting={isExporting}
            />
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-8">
        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-3xl font-bold text-gray-900">{mockStatistics.totalIncidents}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              YTD {new Date().getFullYear()}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Incidents</p>
                <p className="text-3xl font-bold text-orange-600">{mockStatistics.openIncidents}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Requiring attention
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lost Time Injuries</p>
                <p className="text-3xl font-bold text-red-600">{mockStatistics.lostTimeInjuries}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Serious incidents
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                <p className="text-3xl font-bold text-green-600">{mockStatistics.averageResolutionDays}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Days to close
            </p>
          </div>
        </div>

        {/* Enhanced Filters */}
        <EnhancedReportFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleFiltersReset}
        />

        {/* Trend Analysis Charts */}
        <TrendAnalysisCharts 
          trendData={mockTrendData}
        />

        {/* HSE Statistics Calculator */}
        <HSEStatisticsCalculator
          totalIncidents={mockStatistics.totalIncidents}
          lostTimeInjuries={mockStatistics.lostTimeInjuries}
        />

        {/* Additional Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investigation Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-green-600">185 (69%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '69%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-medium text-purple-600">52 (19%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '19%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Not Started</span>
                <span className="text-sm font-medium text-orange-600">30 (12%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Within 24 hours</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Within 48 hours</span>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Over 48 hours</span>
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}