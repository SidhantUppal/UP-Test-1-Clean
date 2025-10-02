"use client";

import { useState } from 'react';
import { ReportSection } from './ReportCards';
import { LineChart, BarChart, generateMonthlyTrendData } from './ChartComponents';
import { monthlyStats, mockIncidents } from '@/data/mockReportsData';

interface TrendPeriod {
  label: string;
  value: string;
  months: number;
}

const trendPeriods: TrendPeriod[] = [
  { label: 'Last 3 Months', value: '3m', months: 3 },
  { label: 'Last 6 Months', value: '6m', months: 6 },
  { label: 'Last 12 Months', value: '12m', months: 12 }
];

export const TrendAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [viewType, setViewType] = useState<'combined' | 'separate'>('combined');

  // Filter data based on selected period
  const filteredMonthlyStats = monthlyStats.slice(-trendPeriods.find(p => p.value === selectedPeriod)?.months || 6);
  
  const monthlyTrendData = generateMonthlyTrendData(filteredMonthlyStats);

  // Generate separate chart data for incidents, near misses, and accidents
  const incidentTrendData = {
    labels: filteredMonthlyStats.map(stat => {
      const date = new Date(stat.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        label: 'Total Incidents',
        data: filteredMonthlyStats.map(stat => stat.totalIncidents),
        borderColor: '#3d3a72',
        backgroundColor: '#3d3a72' + '20',
        fill: false,
      }
    ],
  };

  const nearMissTrendData = {
    labels: filteredMonthlyStats.map(stat => {
      const date = new Date(stat.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        label: 'Near Misses',
        data: filteredMonthlyStats.map(stat => stat.nearMisses),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6' + '20',
        fill: false,
      }
    ],
  };

  const accidentTrendData = {
    labels: filteredMonthlyStats.map(stat => {
      const date = new Date(stat.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }),
    datasets: [
      {
        label: 'Accidents',
        data: filteredMonthlyStats.map(stat => stat.accidents),
        borderColor: '#ef4444',
        backgroundColor: '#ef4444' + '20',
        fill: false,
      }
    ],
  };

  // Generate monthly comparison data (current vs previous period)
  const getMonthlyComparison = () => {
    if (filteredMonthlyStats.length < 2) return null;
    
    const currentMonth = filteredMonthlyStats[filteredMonthlyStats.length - 1];
    const previousMonth = filteredMonthlyStats[filteredMonthlyStats.length - 2];
    
    const totalChange = ((currentMonth.totalIncidents - previousMonth.totalIncidents) / previousMonth.totalIncidents) * 100;
    const nearMissChange = ((currentMonth.nearMisses - previousMonth.nearMisses) / previousMonth.nearMisses) * 100;
    const accidentChange = ((currentMonth.accidents - previousMonth.accidents) / previousMonth.accidents) * 100;
    
    return {
      totalChange: totalChange.toFixed(1),
      nearMissChange: nearMissChange.toFixed(1),
      accidentChange: accidentChange.toFixed(1)
    };
  };

  const comparison = getMonthlyComparison();

  // Calculate trend insights
  const getTrendInsights = () => {
    if (filteredMonthlyStats.length < 3) return [];
    
    const insights = [];
    const recentAvg = filteredMonthlyStats.slice(-3).reduce((sum, stat) => sum + stat.totalIncidents, 0) / 3;
    const earlierAvg = filteredMonthlyStats.slice(0, 3).reduce((sum, stat) => sum + stat.totalIncidents, 0) / 3;
    
    if (recentAvg > earlierAvg * 1.1) {
      insights.push({
        type: 'warning',
        title: 'Increasing Trend',
        message: 'Incident rates have increased by more than 10% in recent months.'
      });
    } else if (recentAvg < earlierAvg * 0.9) {
      insights.push({
        type: 'success',
        title: 'Improving Trend',
        message: 'Incident rates have decreased by more than 10% in recent months.'
      });
    }

    const nearMissRatio = filteredMonthlyStats[filteredMonthlyStats.length - 1].nearMisses / 
                         filteredMonthlyStats[filteredMonthlyStats.length - 1].accidents;
    
    if (nearMissRatio > 2) {
      insights.push({
        type: 'success',
        title: 'Healthy Near Miss Reporting',
        message: `Strong near miss reporting culture with ${nearMissRatio.toFixed(1)}:1 near miss to accident ratio.`
      });
    } else {
      insights.push({
        type: 'warning',
        title: 'Low Near Miss Reporting',
        message: 'Consider improving near miss reporting to identify more potential hazards.'
      });
    }

    return insights;
  };

  const insights = getTrendInsights();

  return (
    <div className="space-y-6">
      {/* Controls */}
      <ReportSection title="Incident Trend Analysis" description="Historical incident patterns and analysis">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Time Period:</span>
            {trendPeriods.map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewType('combined')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                viewType === 'combined'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Combined View
            </button>
            <button
              onClick={() => setViewType('separate')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                viewType === 'separate'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Separate Charts
            </button>
          </div>
        </div>

        {/* Monthly Comparison Cards */}
        {comparison && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Total Incidents</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  {filteredMonthlyStats[filteredMonthlyStats.length - 1].totalIncidents}
                </span>
                <span className={`text-sm ${
                  parseFloat(comparison.totalChange) > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {parseFloat(comparison.totalChange) > 0 ? '+' : ''}{comparison.totalChange}%
                </span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Near Misses</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-blue-900">
                  {filteredMonthlyStats[filteredMonthlyStats.length - 1].nearMisses}
                </span>
                <span className={`text-sm ${
                  parseFloat(comparison.nearMissChange) > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(comparison.nearMissChange) > 0 ? '+' : ''}{comparison.nearMissChange}%
                </span>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Accidents</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-red-900">
                  {filteredMonthlyStats[filteredMonthlyStats.length - 1].accidents}
                </span>
                <span className={`text-sm ${
                  parseFloat(comparison.accidentChange) > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {parseFloat(comparison.accidentChange) > 0 ? '+' : ''}{comparison.accidentChange}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {viewType === 'combined' ? (
          <LineChart 
            title="Combined Incident Trends" 
            data={monthlyTrendData} 
            height={400}
          />
        ) : (
          <div className="space-y-6">
            <LineChart 
              title="Total Incidents" 
              data={incidentTrendData} 
              height={250}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart 
                title="Near Misses" 
                data={nearMissTrendData} 
                height={200}
              />
              <LineChart 
                title="Accidents" 
                data={accidentTrendData} 
                height={200}
              />
            </div>
          </div>
        )}
      </ReportSection>

      {/* Trend Insights */}
      {insights.length > 0 && (
        <ReportSection title="Trend Insights" description="Key observations from the data">
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  insight.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                }`}
              >
                <h4 className="font-semibold">{insight.title}</h4>
                <p className="text-sm mt-1">{insight.message}</p>
              </div>
            ))}
          </div>
        </ReportSection>
      )}

      {/* Leading vs Lagging Indicators */}
      <ReportSection 
        title="Leading vs Lagging Indicators" 
        description="Comparison of predictive and outcome metrics"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Leading Indicators</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Near Misses</span>
                <span className="text-lg font-bold text-blue-600">
                  {filteredMonthlyStats[filteredMonthlyStats.length - 1].nearMisses}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Safety Observations</span>
                <span className="text-lg font-bold text-green-600">--</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">Training Completions</span>
                <span className="text-lg font-bold text-purple-600">--</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Lagging Indicators</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">Accidents</span>
                <span className="text-lg font-bold text-red-600">
                  {filteredMonthlyStats[filteredMonthlyStats.length - 1].accidents}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium">RIDDOR Reports</span>
                <span className="text-lg font-bold text-orange-600">
                  {filteredMonthlyStats[filteredMonthlyStats.length - 1].riddorReports}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Lost Time Incidents</span>
                <span className="text-lg font-bold text-gray-600">--</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-900">Recommendation</h5>
          <p className="text-sm text-blue-800 mt-1">
            Focus on increasing leading indicator reporting (near misses, safety observations) to better predict and prevent accidents. 
            The current near miss to accident ratio of {(
              filteredMonthlyStats[filteredMonthlyStats.length - 1].nearMisses / 
              filteredMonthlyStats[filteredMonthlyStats.length - 1].accidents
            ).toFixed(1)}:1 indicates room for improvement in proactive reporting.
          </p>
        </div>
      </ReportSection>
    </div>
  );
};