"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, BarChart } from './ChartComponents';
import { chartColors } from './ChartComponents';

export interface TrendData {
  month: string;
  totalIncidents: number;
  nearMisses: number;
  accidents: number;
  injuryTypeBreakdown: {
    cuts: number;
    burns: number;
    sprains: number;
    fractures: number;
    other: number;
  };
  incidentTypeBreakdown: {
    slips: number;
    falls: number;
    equipment: number;
    manual_handling: number;
    chemical: number;
    other: number;
  };
}

interface TrendAnalysisChartsProps {
  trendData: TrendData[];
  className?: string;
}

export const TrendAnalysisCharts: React.FC<TrendAnalysisChartsProps> = ({
  trendData,
  className = ""
}) => {
  const [selectedTrendType, setSelectedTrendType] = useState<'incidents' | 'injuries'>('incidents');
  const [selectedPeriod, setSelectedPeriod] = useState<'6months' | '12months' | '24months'>('12months');

  // Filter data based on selected period
  const getFilteredData = () => {
    const monthsToShow = selectedPeriod === '6months' ? 6 : selectedPeriod === '12months' ? 12 : 24;
    return trendData.slice(-monthsToShow);
  };

  // Generate incident trends data
  const generateIncidentTrendsData = () => {
    const filteredData = getFilteredData();
    return {
      labels: filteredData.map(item => {
        const date = new Date(item.month + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      }),
      datasets: [
        {
          label: 'Total Incidents',
          data: filteredData.map(item => item.totalIncidents),
          borderColor: chartColors.primary,
          backgroundColor: chartColors.primary + '20',
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Near Misses',
          data: filteredData.map(item => item.nearMisses),
          borderColor: chartColors.secondary,
          backgroundColor: chartColors.secondary + '20',
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Accidents',
          data: filteredData.map(item => item.accidents),
          borderColor: chartColors.purple4,
          backgroundColor: chartColors.purple4 + '20',
          fill: false,
          tension: 0.2,
        }
      ],
    };
  };

  // Generate injury type trends data
  const generateInjuryTrendsData = () => {
    const filteredData = getFilteredData();
    return {
      labels: filteredData.map(item => {
        const date = new Date(item.month + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      }),
      datasets: [
        {
          label: 'Cuts & Lacerations',
          data: filteredData.map(item => item.injuryTypeBreakdown.cuts),
          borderColor: chartColors.purple1,
          backgroundColor: chartColors.purple1 + '20',
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Burns',
          data: filteredData.map(item => item.injuryTypeBreakdown.burns),
          borderColor: chartColors.orange2,
          backgroundColor: chartColors.orange2 + '20',
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Sprains & Strains',
          data: filteredData.map(item => item.injuryTypeBreakdown.sprains),
          borderColor: chartColors.purple5,
          backgroundColor: chartColors.purple5 + '20',
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Fractures',
          data: filteredData.map(item => item.injuryTypeBreakdown.fractures),
          borderColor: chartColors.orange4,
          backgroundColor: chartColors.orange4 + '20',
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Other Injuries',
          data: filteredData.map(item => item.injuryTypeBreakdown.other),
          borderColor: chartColors.purple6,
          backgroundColor: chartColors.purple6 + '20',
          fill: false,
          tension: 0.2,
        }
      ],
    };
  };

  // Generate incident type breakdown for current month
  const generateIncidentTypeBreakdownData = () => {
    const latestMonth = trendData[trendData.length - 1];
    if (!latestMonth) return { labels: [], datasets: [] };

    return {
      labels: ['Slips & Trips', 'Falls from Height', 'Equipment Failure', 'Manual Handling', 'Chemical Exposure', 'Other'],
      datasets: [
        {
          label: 'Incidents by Type',
          data: [
            latestMonth.incidentTypeBreakdown.slips,
            latestMonth.incidentTypeBreakdown.falls,
            latestMonth.incidentTypeBreakdown.equipment,
            latestMonth.incidentTypeBreakdown.manual_handling,
            latestMonth.incidentTypeBreakdown.chemical,
            latestMonth.incidentTypeBreakdown.other,
          ],
          backgroundColor: [
            chartColors.purple1,
            chartColors.orange2,
            chartColors.purple3,
            chartColors.orange3,
            chartColors.purple5,
            chartColors.orange5,
          ],
        },
      ],
    };
  };

  // Generate injury type breakdown for current month
  const generateInjuryTypeBreakdownData = () => {
    const latestMonth = trendData[trendData.length - 1];
    if (!latestMonth) return { labels: [], datasets: [] };

    return {
      labels: ['Cuts & Lacerations', 'Burns', 'Sprains & Strains', 'Fractures', 'Other'],
      datasets: [
        {
          label: 'Injuries by Type',
          data: [
            latestMonth.injuryTypeBreakdown.cuts,
            latestMonth.injuryTypeBreakdown.burns,
            latestMonth.injuryTypeBreakdown.sprains,
            latestMonth.injuryTypeBreakdown.fractures,
            latestMonth.injuryTypeBreakdown.other,
          ],
          backgroundColor: [
            chartColors.purple1,
            chartColors.orange2,
            chartColors.purple4,
            chartColors.orange4,
            chartColors.purple6,
          ],
        },
      ],
    };
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Trend Analysis</h3>
            <p className="text-sm text-gray-600">Analyze trends across different time periods and categories</p>
          </div>
          
          <div className="flex gap-4">
            {/* Trend Type Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedTrendType('incidents')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedTrendType === 'incidents'
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Incident Trends
              </button>
              <button
                onClick={() => setSelectedTrendType('injuries')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedTrendType === 'injuries'
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Injury Trends
              </button>
            </div>

            {/* Period Selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
            >
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="24months">Last 24 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <LineChart
          title={selectedTrendType === 'incidents' ? 'Incident Trends Over Time' : 'Injury Type Trends Over Time'}
          data={selectedTrendType === 'incidents' ? generateIncidentTrendsData() : generateInjuryTrendsData()}
          height={400}
        />
      </div>

      {/* Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <BarChart
            title="Current Month - Incident Types"
            data={generateIncidentTypeBreakdownData()}
            height={300}
            horizontal={false}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <BarChart
            title="Current Month - Injury Types"
            data={generateInjuryTypeBreakdownData()}
            height={300}
            horizontal={false}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Trend Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(() => {
            const filteredData = getFilteredData();
            const currentMonth = filteredData[filteredData.length - 1];
            const previousMonth = filteredData[filteredData.length - 2];
            
            if (!currentMonth || !previousMonth) return null;

            const totalChange = currentMonth.totalIncidents - previousMonth.totalIncidents;
            const nearMissChange = currentMonth.nearMisses - previousMonth.nearMisses;
            const accidentChange = currentMonth.accidents - previousMonth.accidents;
            const averageMonthly = Math.round(filteredData.reduce((sum, item) => sum + item.totalIncidents, 0) / filteredData.length);

            return (
              <>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${totalChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {totalChange >= 0 ? '+' : ''}{totalChange}
                  </div>
                  <div className="text-sm text-gray-600">Month-on-Month Change</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${nearMissChange >= 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {nearMissChange >= 0 ? '+' : ''}{nearMissChange}
                  </div>
                  <div className="text-sm text-gray-600">Near Miss Change</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${accidentChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {accidentChange >= 0 ? '+' : ''}{accidentChange}
                  </div>
                  <div className="text-sm text-gray-600">Accident Change</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {averageMonthly}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Average</div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};