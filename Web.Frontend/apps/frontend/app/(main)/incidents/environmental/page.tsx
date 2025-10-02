"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EnvironmentalFeed from '@/components/incidents/environmental/EnvironmentalFeed';
import QuickReportButton from '@/components/incidents/environmental/QuickReportButton';
import QuickReportModal from '@/components/incidents/environmental/QuickReportModal';
import CategoryReportModal from '@/components/incidents/environmental/CategoryReportModal';
import CorrectiveActionsChart from '@/components/charts/CorrectiveActionsChart';

export default function EnvironmentalPage() {
  const router = useRouter();
  const [showQuickReport, setShowQuickReport] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isCustomized, setIsCustomized] = useState(false);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setShowQuickReport(false);
  };

  const handleReportSubmit = (data: any) => {
    console.log('Report submitted:', data);
    setSelectedCategory(null);
    // In real app, would refresh feed here
  };

  const categories = ['All', 'Spill', 'Emission', 'Waste', 'Water Quality', 'Noise', 'Good Practice'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Environmental Management</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Real-time environmental observations and incident tracking</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/incidents/environmental/drafts')}
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
                className="hover:opacity-80"
              >
                View Drafts
              </button>
              <button
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
                className="hover:opacity-80"
                onClick={() => setShowQuickReport(true)}
              >
                Quick Report
              </button>
              <button
                onClick={() => setIsCustomized(!isCustomized)}
                style={{
                  backgroundColor: isCustomized ? '#10B981' : '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                className="hover:opacity-80"
              >
                {isCustomized ? 'Done Customizing' : 'Customize'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <nav className="-mb-px flex overflow-x-auto space-x-8" aria-label="Tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category.toLowerCase().replace(' ', '-'))}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                  filterCategory === category.toLowerCase().replace(' ', '-') || (filterCategory === 'all' && category === 'All')
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Today's Reports</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>23</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">+3 from yesterday</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Active Incidents</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>5</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Under investigation</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Compliance Score</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>92%</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Participation</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>84%</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Active users today</p>
          </div>
        </div>

        {/* Corrective Actions Chart */}
        <CorrectiveActionsChart className="mb-6" />

        {/* Feed */}
        <EnvironmentalFeed filterCategory={filterCategory} />
      </div>

      {/* Floating Action Button */}
      <QuickReportButton onClick={() => setShowQuickReport(true)} />

      {/* Modals */}
      {showQuickReport && (
        <QuickReportModal
          onClose={() => setShowQuickReport(false)}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {selectedCategory && (
        <CategoryReportModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onSubmit={handleReportSubmit}
        />
      )}
    </div>
  );
}