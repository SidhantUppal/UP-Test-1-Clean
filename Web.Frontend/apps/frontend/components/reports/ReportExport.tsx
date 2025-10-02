"use client";

import React, { useState } from 'react';

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeRawData: boolean;
  includeHSECalculations: boolean;
  dateRange: {
    from: string;
    to: string;
  };
  title: string;
}

interface ReportExportProps {
  onExport: (options: ExportOptions) => Promise<void>;
  isExporting?: boolean;
  className?: string;
}

export const ReportExport: React.FC<ReportExportProps> = ({
  onExport,
  isExporting = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
    includeHSECalculations: true,
    dateRange: {
      from: '',
      to: ''
    },
    title: 'Incident Reports & Analytics'
  });

  const handleExport = async () => {
    try {
      await onExport(exportOptions);
      setIsOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const updateExportOption = (key: keyof ExportOptions, value: any) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateDateRange = (key: 'from' | 'to', value: string) => {
    setExportOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [key]: value
      }
    }));
  };

  const getQuickDateRange = (range: string) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (range) {
      case '30days': {
        const from = new Date(today);
        from.setDate(today.sysdatetimeoffset() - 30);
        return { from: from.toISOString().split('T')[0], to: todayStr };
      }
      case '90days': {
        const from = new Date(today);
        from.setDate(today.sysdatetimeoffset() - 90);
        return { from: from.toISOString().split('T')[0], to: todayStr };
      }
      case '12months': {
        const from = new Date(today);
        from.setFullYear(today.getFullYear() - 1);
        return { from: from.toISOString().split('T')[0], to: todayStr };
      }
      case 'ytd': {
        const from = new Date(today.getFullYear(), 0, 1);
        return { from: from.toISOString().split('T')[0], to: todayStr };
      }
      default:
        return { from: '', to: todayStr };
    }
  };

  if (!isOpen) {
    return (
      <div className={className}>
        <button
          onClick={() => setIsOpen(true)}
          disabled={isExporting}
          style={{ 
            backgroundColor: '#3d3a72', 
            color: '#ffffff', 
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'opacity 0.2s'
          }}
          className={`hover:opacity-80 ${
            isExporting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isExporting ? 'Exporting...' : 'Export Report'}
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${className}`}>
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Export Report Options</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Report Title */}
            <div>
              <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Report Title
              </label>
              <input
                type="text"
                id="reportTitle"
                value={exportOptions.title}
                onChange={(e) => updateExportOption('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter report title"
              />
            </div>

            {/* Export Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'pdf', label: 'PDF', description: 'Complete report with charts' },
                  { value: 'excel', label: 'Excel', description: 'Data and summary tables' },
                  { value: 'csv', label: 'CSV', description: 'Raw data only' }
                ].map(format => (
                  <label key={format.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value={format.value}
                      checked={exportOptions.format === format.value}
                      onChange={(e) => updateExportOption('format', e.target.value as any)}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-3 text-center transition-colors ${
                      exportOptions.format === format.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="font-medium">{format.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{format.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              
              {/* Quick Date Range Buttons */}
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { value: '30days', label: 'Last 30 Days' },
                  { value: '90days', label: 'Last 90 Days' },
                  { value: '12months', label: 'Last 12 Months' },
                  { value: 'ytd', label: 'Year to Date' }
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const range = getQuickDateRange(option.value);
                      updateDateRange('from', range.from);
                      updateDateRange('to', range.to);
                    }}
                    className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="dateFrom" className="block text-xs text-gray-600 mb-1">From</label>
                  <input
                    type="date"
                    id="dateFrom"
                    value={exportOptions.dateRange.from}
                    onChange={(e) => updateDateRange('from', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="dateTo" className="block text-xs text-gray-600 mb-1">To</label>
                  <input
                    type="date"
                    id="dateTo"
                    value={exportOptions.dateRange.to}
                    onChange={(e) => updateDateRange('to', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Content Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Include in Export</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeCharts}
                    onChange={(e) => updateExportOption('includeCharts', e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    disabled={exportOptions.format === 'csv'}
                  />
                  <span className="ml-2 text-sm text-gray-700">Charts and Visualizations</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeHSECalculations}
                    onChange={(e) => updateExportOption('includeHSECalculations', e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">HSE Statistics Calculations</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeRawData}
                    onChange={(e) => updateExportOption('includeRawData', e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Raw Data Tables</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  isExporting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isExporting ? 'Exporting...' : `Export ${exportOptions.format.toUpperCase()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};