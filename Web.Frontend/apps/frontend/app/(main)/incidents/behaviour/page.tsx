"use client";

import { useState } from 'react';
import BehaviourFeed from '@/components/incidents/behaviour/BehaviourFeed';
import QuickReportButton from '@/components/incidents/behaviour/QuickReportButton';
import QuickReportModal from '@/components/incidents/behaviour/QuickReportModal';
import CategoryReportModal from '@/components/incidents/behaviour/CategoryReportModal';

export default function BehaviourPage() {
  const [showQuickReport, setShowQuickReport] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setShowQuickReport(false);
  };

  const handleReportSubmit = (data: any) => {
    console.log('Report submitted:', data);
    setSelectedCategory(null);
    // In real app, would refresh feed here
  };

  const categories = ['All', 'Intervention', 'Quick Training', 'Save', 'Hazard', 'Near Miss', 'Good Behavior'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Behavioural Safety</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Real-time safety observations and positive reinforcement</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
                Export Feed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Today's Reports</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>47</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">+12 from yesterday</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Active Saves</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>8</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Incidents prevented</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Team Points</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>1,840</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">This week</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Participation</h3>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#3d3a72' }}>76%</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Active users today</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border-b border-gray-200 rounded-lg shadow-sm">
          <div className="w-full px-4 sm:px-6">
            <nav className="-mb-px flex overflow-x-auto" aria-label="Tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category.toLowerCase().replace(' ', '-'))}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap mr-4 sm:mr-8 last:mr-0 ${
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

        {/* Feed */}
        <BehaviourFeed filterCategory={filterCategory} />
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