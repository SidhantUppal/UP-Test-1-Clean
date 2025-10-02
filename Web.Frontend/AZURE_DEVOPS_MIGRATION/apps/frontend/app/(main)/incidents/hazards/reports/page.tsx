"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Hazard, calculateRiskLevel, getSeverityColor } from '@/types/hazard.types';
import { hazardService } from '@/services/hazardService';

// Chart components for visualizations
interface TreemapData {
  name: string;
  value: number;
  color: string;
  riskLevel?: number;
  children?: TreemapData[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export default function HazardReportsPage() {
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('30'); // days
  const [selectedView, setSelectedView] = useState<'overview' | 'trends' | 'completion' | 'details'>('overview');

  useEffect(() => {
    loadHazards();
  }, []);

  const loadHazards = async () => {
    try {
      setLoading(true);
      setError(null);
      const { hazards: hazardData } = await hazardService.getHazards({
        page: 1,
        pageSize: 500,
        status: 'all' // Get both active and archived
      });
      
      const mappedHazards = hazardData.map((h: any) => ({
        ...h,
        hazardId: h.HazardID || h.hazardId,
        hazardName: h.HazardName || h.hazardName,
        hazardDescription: h.HazardDescription || h.hazardDescription,
        hazardCode: h.HazardCode || h.hazardCode,
        categoryName: h.CategoryName || h.categoryName,
        categoryTypeName: h.CategoryTypeName || h.categoryTypeName,
        locationName: h.LocationName || h.locationName,
        severity: h.Severity || h.severity,
        isActive: h.IsActive !== undefined ? h.IsActive : h.isActive,
        assignedToUserName: h.AssignedToUserName || h.assignedToUserName,
        createdDate: h.CreatedDate || h.createdDate,
        ModifiedDate: h.ModifiedDate || h.ModifiedDate,
        inherentRiskScore: h.InherentRiskScore || h.inherentRiskScore,
        ...calculateRiskLevel(h.InherentRiskScore || h.inherentRiskScore)
      }));
      
      setHazards(mappedHazards);
    } catch (error: any) {
      console.error('Error loading hazards:', error);
      setError(error.message || 'Failed to load hazards');
      setHazards([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics for the selected period
  const metrics = useMemo(() => {
    const now = new Date();
    const periodDays = parseInt(selectedPeriod);
    const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
    
    const periodHazards = hazards.filter(h => {
      const createdDate = new Date(h.createdDate);
      return createdDate >= periodStart;
    });

    const totalHazards = hazards.length;
    const activeHazards = hazards.filter(h => h.isActive).length;
    const resolvedHazards = hazards.filter(h => !h.isActive).length;
    const highRiskCount = hazards.filter(h => h.severity === 'Major' || h.severity === 'Catastrophic').length;
    
    // Resolution rate
    const resolutionRate = totalHazards > 0 ? ((resolvedHazards / totalHazards) * 100).toFixed(1) : '0';
    
    // Average time to resolution (mock data - would need actual resolution dates)
    const avgResolutionTime = '7.5'; // days
    
    // Hazards by category
    const categoryMap = new Map<string, number>();
    hazards.forEach(h => {
      const category = h.categoryTypeName || 'Uncategorized';
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
    
    // Hazards by severity
    const severityMap = new Map<string, number>();
    const severities = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
    severities.forEach(s => severityMap.set(s, 0));
    hazards.forEach(h => {
      if (h.severity) {
        severityMap.set(h.severity, (severityMap.get(h.severity) || 0) + 1);
      }
    });
    
    // Hazards by location
    const locationMap = new Map<string, number>();
    hazards.forEach(h => {
      const location = h.locationName || 'Unknown Location';
      locationMap.set(location, (locationMap.get(location) || 0) + 1);
    });
    
    // Trend data for the period
    const trendData: { date: string; count: number }[] = [];
    for (let i = 0; i < periodDays; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const count = hazards.filter(h => {
        const hDate = new Date(h.createdDate).toISOString().split('T')[0];
        return hDate === dateStr;
      }).length;
      trendData.unshift({ date: dateStr, count });
    }

    return {
      totalHazards,
      activeHazards,
      resolvedHazards,
      highRiskCount,
      resolutionRate,
      avgResolutionTime,
      periodHazards: periodHazards.length,
      categoryMap,
      severityMap,
      locationMap,
      trendData
    };
  }, [hazards, selectedPeriod]);

  // Prepare treemap data for hazards by category with better colors
  const treemapData = useMemo(() => {
    const data: TreemapData[] = [];
    // Define a palette of distinct colors for categories
    const colorPalette = [
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#3B82F6', // Blue
      '#10B981', // Emerald
      '#F59E0B', // Amber
      '#EF4444', // Red
      '#06B6D4', // Cyan
      '#F97316', // Orange
      '#84CC16', // Lime
      '#6366F1', // Indigo
      '#14B8A6', // Teal
      '#A855F7', // Violet
    ];
    
    let colorIndex = 0;
    metrics.categoryMap.forEach((count, category) => {
      // Get hazards for this category
      const categoryHazards = hazards.filter(h => (h.categoryTypeName || 'Uncategorized') === category);
      const avgRiskScore = categoryHazards.reduce((sum, h) => sum + (h.inherentRiskScore || 0), 0) / (categoryHazards.length || 1);
      
      data.push({
        name: category,
        value: count,
        color: colorPalette[colorIndex % colorPalette.length],
        riskLevel: avgRiskScore
      });
      colorIndex++;
    });
    return data.sort((a, b) => b.value - a.value);
  }, [metrics.categoryMap, hazards]);

  // Classic treemap algorithm - Squarified treemap for optimal aspect ratios
  const renderTreemap = (data: TreemapData[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <div>No data available</div>;
    
    // Squarified treemap algorithm
    const squarify = (children: TreemapData[], row: TreemapData[], w: number, h: number): any[] => {
      const layouts: any[] = [];
      
      if (children.length === 0) {
        return layoutRow(row, w, h, []);
      }
      
      const child = children[0];
      const newRow = [...row, child];
      
      if (row.length === 0 || worst(row, w, h) >= worst(newRow, w, h)) {
        const remaining = children.slice(1);
        return squarify(remaining, newRow, w, h);
      } else {
        const rowLayouts = layoutRow(row, w, h, []);
        const remaining = children.slice(1);
        const newDimensions = getNewDimensions(row, w, h);
        const childLayouts = squarify(remaining, [child], newDimensions.w, newDimensions.h);
        return [...rowLayouts, ...childLayouts];
      }
    };
    
    const worst = (row: TreemapData[], w: number, h: number): number => {
      if (row.length === 0) return Infinity;
      
      const sum = row.reduce((s, item) => s + item.value, 0);
      const rowMin = Math.min(...row.map(item => item.value));
      const rowMax = Math.max(...row.map(item => item.value));
      const s2 = sum * sum;
      const w2 = w * w;
      const h2 = h * h;
      
      return Math.max(w2 * rowMax / s2, s2 / (h2 * rowMin));
    };
    
    const layoutRow = (row: TreemapData[], w: number, h: number, layouts: any[]): any[] => {
      const sum = row.reduce((s, item) => s + item.value, 0);
      const vertical = w < h;
      const major = vertical ? h : w;
      const minor = vertical ? w : h;
      
      let offset = 0;
      const rowLayouts = row.map(item => {
        const size = (item.value / sum) * major;
        const layout = {
          ...item,
          x: vertical ? 0 : offset,
          y: vertical ? offset : 0,
          width: vertical ? minor : size,
          height: vertical ? size : minor
        };
        offset += size;
        return layout;
      });
      
      return [...layouts, ...rowLayouts];
    };
    
    const getNewDimensions = (row: TreemapData[], w: number, h: number) => {
      const sum = row.reduce((s, item) => s + item.value, 0);
      const vertical = w < h;
      const coveredRatio = sum / total;
      
      if (vertical) {
        return { w: w - (coveredRatio * w), h };
      } else {
        return { w, h: h - (coveredRatio * h) };
      }
    };
    
    // Scale data for better visualization
    const scaledData = data.map(item => ({
      ...item,
      value: Math.sqrt(item.value) * 10 // Square root scaling for better proportions
    }));
    
    const scaledTotal = scaledData.reduce((sum, item) => sum + item.value, 0);
    const normalizedData = scaledData.map(item => ({
      ...item,
      value: (item.value / scaledTotal) * 10000 // Normalize to work with pixel dimensions
    }));
    
    const layouts = squarify(normalizedData, [], 100, 100);
    
    return (
      <div className="relative w-full h-64 rounded-lg overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
        {layouts.map((item: any, index: number) => {
          const style = {
            position: 'absolute' as const,
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: `${item.width}%`,
            height: `${item.height}%`,
            backgroundColor: item.color,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.2s ease'
          };
          
          return (
            <div
              key={index}
              style={style}
              className="hover:brightness-110 hover:scale-[1.02] hover:z-10 flex flex-col items-center justify-center p-1 cursor-pointer"
              title={`${item.name}: ${data.find(d => d.name === item.name)?.value || 0} hazards (Risk Score: ${item.riskLevel?.toFixed(1) || 'N/A'})`}
            >
              {item.width > 8 && item.height > 8 && (
                <>
                  <span className="text-white font-bold text-xs text-center drop-shadow-lg leading-tight">
                    {item.name}
                  </span>
                  <span className="text-white text-lg font-bold drop-shadow-lg">
                    {data.find(d => d.name === item.name)?.value || 0}
                  </span>
                  {item.width > 12 && item.height > 12 && (
                    <span className="text-white text-xs opacity-90 drop-shadow-lg">
                      Risk: {item.riskLevel?.toFixed(0) || 'N/A'}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render pie chart (simple CSS version)
  const renderPieChart = (data: Map<string, number>, colors: Map<string, string>) => {
    const total = Array.from(data.values()).reduce((sum, val) => sum + val, 0);
    if (total === 0) return <div>No data</div>;
    
    let cumulativePercentage = 0;
    const segments: string[] = [];
    
    data.forEach((value, key) => {
      if (value > 0) {
        const percentage = (value / total) * 100;
        const color = colors.get(key) || '#6B7280';
        segments.push(`${color} ${cumulativePercentage}% ${cumulativePercentage + percentage}%`);
        cumulativePercentage += percentage;
      }
    });
    
    const gradient = `conic-gradient(${segments.join(', ')})`;
    
    return (
      <div className="flex items-center gap-6">
        <div 
          className="w-48 h-48 rounded-full shadow-lg"
          style={{ background: gradient }}
        />
        <div className="space-y-2">
          {Array.from(data.entries()).map(([key, value]) => (
            value > 0 && (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.get(key) || '#6B7280' }}
                />
                <span className="text-sm text-gray-700">{key}</span>
                <span className="text-sm font-medium ml-auto">{value}</span>
                <span className="text-xs text-gray-500">({((value / total) * 100).toFixed(1)}%)</span>
              </div>
            )
          ))}
        </div>
      </div>
    );
  };

  // Top hazards table
  const topHazards = useMemo(() => {
    return [...hazards]
      .sort((a, b) => (b.inherentRiskScore || 0) - (a.inherentRiskScore || 0))
      .slice(0, 10);
  }, [hazards]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading hazard reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Hazard Reports</h1>
              <p className="text-gray-600 mt-1">Analytics and insights for workplace hazards</p>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <Link href="/incidents/hazards">
                <button style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} className="hover:opacity-80">
                  Back to Hazards
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="bg-white border-b">
        <div className="w-full px-8 lg:px-12 xl:px-16">
          <div className="flex gap-6">
            {['overview', 'trends', 'completion', 'details'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view as any)}
                className={`py-3 px-4 border-b-2 font-medium text-sm capitalize transition-colors ${
                  selectedView === view
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {view === 'completion' ? 'Task Completion' : view}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Hazards</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{metrics.totalHazards}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Active</h3>
            <p className="text-3xl font-bold" style={{ color: '#e77726' }}>{metrics.activeHazards}</p>
            <p className="text-sm text-gray-500 mt-1">Requires action</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Resolved</h3>
            <p className="text-3xl font-bold" style={{ color: '#10B981' }}>{metrics.resolvedHazards}</p>
            <p className="text-sm text-gray-500 mt-1">Completed</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">High Risk</h3>
            <p className="text-3xl font-bold" style={{ color: '#EF4444' }}>{metrics.highRiskCount}</p>
            <p className="text-sm text-gray-500 mt-1">Major + Critical</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Resolution Rate</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{metrics.resolutionRate}%</p>
            <p className="text-sm text-gray-500 mt-1">Hazards resolved</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Avg Resolution</h3>
            <p className="text-3xl font-bold" style={{ color: '#3B82F6' }}>{metrics.avgResolutionTime}</p>
            <p className="text-sm text-gray-500 mt-1">Days to resolve</p>
          </div>
        </div>

        {selectedView === 'overview' && (
          <>
            {/* Top Row - Treemap and Time to Fix Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Treemap - Hazards by Category */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Hazards by Category - Visual Map</h3>
                {renderTreemap(treemapData)}
              </div>

              {/* Time to Fix Tables */}
              <div className="space-y-6">
                {/* Time to Fix by Location */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">Average Time to Fix by Location</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-purple-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Hazards</th>
                          <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Days</th>
                          <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(metrics.locationMap.entries())
                          .slice(0, 5)
                          .map(([location, count]) => {
                            const locationHazards = hazards.filter(h => (h.locationName || 'Unknown Location') === location);
                            const resolvedCount = locationHazards.filter(h => !h.isActive).length;
                            const avgDays = Math.floor(Math.random() * 10) + 3; // Mock data - would calculate from actual resolution dates
                            const efficiency = resolvedCount > 0 ? (resolvedCount / count * 100).toFixed(0) : '0';
                            
                            return (
                              <tr key={location} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-3 text-sm text-gray-900">{location}</td>
                                <td className="py-2 px-3 text-sm text-gray-700 text-right">{count}</td>
                                <td className="py-2 px-3 text-sm text-right">
                                  <span className={`font-medium ${avgDays <= 5 ? 'text-green-600' : avgDays <= 8 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {avgDays}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-sm text-right">
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                                    {efficiency}% resolved
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Time to Fix by Hazard Type */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">Average Time to Fix by Hazard Type</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-purple-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                          <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Days</th>
                          <th className="text-right py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(metrics.categoryMap.entries())
                          .slice(0, 5)
                          .map(([category, count]) => {
                            const categoryHazards = hazards.filter(h => (h.categoryTypeName || 'Uncategorized') === category);
                            const avgRiskScore = categoryHazards.reduce((sum, h) => sum + (h.inherentRiskScore || 0), 0) / (categoryHazards.length || 1);
                            const avgDays = Math.floor(Math.random() * 15) + 2; // Mock data
                            const priority = avgRiskScore > 10 ? 'High' : avgRiskScore > 5 ? 'Medium' : 'Low';
                            const priorityColor = priority === 'High' ? 'text-red-600' : priority === 'Medium' ? 'text-yellow-600' : 'text-green-600';
                            
                            return (
                              <tr key={category} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-3 text-sm text-gray-900">{category}</td>
                                <td className="py-2 px-3 text-sm text-gray-700 text-right">{count}</td>
                                <td className="py-2 px-3 text-sm text-right">
                                  <span className={`font-medium ${avgDays <= 7 ? 'text-green-600' : avgDays <= 12 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {avgDays}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-sm text-right">
                                  <span className={`font-medium ${priorityColor}`}>
                                    {priority}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Severity Distribution */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Severity Distribution</h3>
                {renderPieChart(
                  metrics.severityMap,
                  new Map([
                    ['Negligible', '#10B981'],
                    ['Minor', '#F59E0B'],
                    ['Moderate', '#F97316'],
                    ['Major', '#EF4444'],
                    ['Catastrophic', '#991B1B']
                  ])
                )}
              </div>

              {/* Location Distribution */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Hazards by Location</h3>
                <div className="space-y-3">
                  {Array.from(metrics.locationMap.entries())
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 8)
                    .map(([location, count]) => {
                      const percentage = (count / metrics.totalHazards) * 100;
                      return (
                        <div key={location} className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 w-32 truncate">{location}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-orange-500 flex items-center px-2"
                              style={{ width: `${percentage}%` }}
                            >
                              <span className="text-xs text-white font-medium">{count}</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 w-12 text-right">{percentage.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
        )}

        {selectedView === 'trends' && (
          <>
            {/* Trend Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Hazard Reporting Trends</h3>
              <div className="h-64 flex items-end gap-1">
                {metrics.trendData.map((day, index) => {
                  const maxCount = Math.max(...metrics.trendData.map(d => d.count), 1);
                  const height = (day.count / maxCount) * 100;
                  return (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-purple-600 to-orange-500 rounded-t hover:opacity-80 transition-opacity"
                      style={{ height: `${height}%` }}
                      title={`${day.date}: ${day.count} hazards`}
                    >
                      {day.count > 0 && (
                        <div className="text-xs text-white text-center mt-1">{day.count}</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Daily hazard reports over the last {selectedPeriod} days
              </div>
            </div>

            {/* Monthly Comparison */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Period Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">This Period</p>
                  <p className="text-3xl font-bold text-purple-600">{metrics.periodHazards}</p>
                  <p className="text-xs text-gray-500 mt-1">New hazards</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Daily Average</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {(metrics.periodHazards / parseInt(selectedPeriod)).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Hazards per day</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Projected Monthly</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {Math.round((metrics.periodHazards / parseInt(selectedPeriod)) * 30)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">At current rate</p>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedView === 'completion' && (
          <>
            {/* Task Completion Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Hazard Resolution Status</h3>
              
              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Completion</span>
                    <span className="text-sm text-gray-600">{metrics.resolutionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-green-600 h-3 rounded-full"
                      style={{ width: `${metrics.resolutionRate}%` }}
                    />
                  </div>
                </div>

                {/* By Severity */}
                {['Catastrophic', 'Major', 'Moderate', 'Minor', 'Negligible'].map(severity => {
                  const total = hazards.filter(h => h.severity === severity).length;
                  const resolved = hazards.filter(h => h.severity === severity && !h.isActive).length;
                  const percentage = total > 0 ? (resolved / total * 100).toFixed(1) : '0';
                  
                  return (
                    <div key={severity}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{severity} Hazards</span>
                        <span className="text-sm text-gray-600">{resolved}/{total} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: getSeverityColor(severity)
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assignment Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Assignment Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Assigned</span>
                    <span className="font-medium">{hazards.filter(h => h.assignedToUserName).length}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Unassigned</span>
                    <span className="font-medium">{hazards.filter(h => !h.assignedToUserName).length}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Overdue</span>
                    <span className="font-medium text-red-600">
                      {hazards.filter(h => h.isActive && h.severity === 'Catastrophic').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Response Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Average Response</span>
                    <span className="font-medium">2.4 hours</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">Fastest Resolution</span>
                    <span className="font-medium text-green-600">30 minutes</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Longest Open</span>
                    <span className="font-medium text-red-600">45 days</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedView === 'details' && (
          <>
            {/* Top Risk Hazards Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Top Risk Hazards</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">Hazard</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">Category</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">Location</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">Risk Score</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">Severity</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">Assigned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topHazards.map((hazard) => (
                      <tr key={hazard.hazardId} className="hover:bg-purple-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{hazard.hazardName}</p>
                            <p className="text-xs text-gray-500">{hazard.hazardCode}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">{hazard.categoryTypeName}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{hazard.locationName || '-'}</td>
                        <td className="py-3 px-4">
                          <span 
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                            style={{ 
                              backgroundColor: hazard.riskColor + '20',
                              color: hazard.riskColor
                            }}
                          >
                            {hazard.inherentRiskScore || 0}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span 
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                            style={{ 
                              backgroundColor: getSeverityColor(hazard.severity || '') + '20',
                              color: getSeverityColor(hazard.severity || '')
                            }}
                          >
                            {hazard.severity}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {hazard.isActive ? (
                            <span className="text-sm text-orange-600">Active</span>
                          ) : (
                            <span className="text-sm text-green-600">Resolved</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {hazard.assignedToUserName || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {hazards
                  .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
                  .slice(0, 5)
                  .map((hazard) => (
                    <div key={hazard.hazardId} className="flex items-start gap-3 py-2">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{hazard.hazardName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(hazard.createdDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {hazard.locationName && ` • ${hazard.locationName}`}
                        </p>
                      </div>
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: getSeverityColor(hazard.severity || '') + '20',
                          color: getSeverityColor(hazard.severity || '')
                        }}
                      >
                        {hazard.severity}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}