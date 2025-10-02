"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { incidentService } from "@/services/incidentService";
import type { IncidentType, IncidentCategory } from "@/services/incidentService";
import NearMissInitialModal from "@/components/incidents/NearMissInitialModal";
import RoadTrafficInitialModal from "@/components/incidents/RoadTrafficInitialModal";
import DangerousOccurrenceInitialModal from "@/components/incidents/DangerousOccurrenceInitialModal";
import AccidentBookInitialModal from "@/components/incidents/AccidentBookInitialModal";
import HighPotentialInitialModal from "@/components/incidents/HighPotentialInitialModal";

export default function NewIncidentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>([]);
  const [categories, setCategories] = useState<IncidentCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showNearMissModal, setShowNearMissModal] = useState(false);
  const [showRoadTrafficModal, setShowRoadTrafficModal] = useState(false);
  const [showDangerousOccurrenceModal, setShowDangerousOccurrenceModal] = useState(false);
  const [showAccidentBookModal, setShowAccidentBookModal] = useState(false);
  const [showHighPotentialModal, setShowHighPotentialModal] = useState(false);

  // Load incident types and categories from API
  useEffect(() => {
    // Only load data on client side
    if (typeof window !== 'undefined') {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [typesData, categoriesData] = await Promise.all([
        incidentService.getIncidentTypes(),
        incidentService.getIncidentCategories()
      ]);

      setIncidentTypes(typesData);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading incident data:', err);
      setError('Failed to load incident types. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (typeCode: string) => {
    setSelectedType(typeCode);
    
    // Show modals for specific types
    if (typeCode === 'NEAR_MISS') {
      setShowNearMissModal(true);
    } else if (typeCode === 'ROAD_TRAFFIC') {
      setShowRoadTrafficModal(true);
    } else if (typeCode === 'DANGEROUS_OCCURRENCE') {
      setShowDangerousOccurrenceModal(true);
    } else if (typeCode === 'ACCIDENT_BOOK') {
      setShowAccidentBookModal(true);
    } else if (typeCode === 'WOBBLE') {
      setShowHighPotentialModal(true);
    } else {
      // Navigate to dynamic form route for other types
      router.push(`/incidents/new/${typeCode}`);
    }
  };

  // Filter types by category and hide specific types
  const filteredTypes = (selectedCategory === 'all'
    ? incidentTypes
    : incidentTypes.filter(type => {
        const category = categories.find(c => c.IncidentCategoryTypeID === type.IncidentCategoryTypeID);
        return category?.CategoryCode === selectedCategory;
      }))
    .filter(type =>
      type.TypeCode !== 'ACCIDENT_REPORT' &&
      type.TypeCode !== 'FARMING'
    );

  // Get icon for incident type (using existing icons or default)
  const getTypeIcon = (typeCode: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'WOBBLE': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'HIGH_POTENTIAL': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'ACCIDENT_BOOK': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      'ACCIDENT_REPORT': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      'DANGEROUS_OCCURRENCE': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      'NEAR_MISS': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'ROAD_TRAFFIC': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      'FARMING': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    };

    return iconMap[typeCode] || (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  // Get display name for incident type (rename WOBBLE to High Potential)
  const getDisplayName = (type: IncidentType) => {
    if (type.TypeCode === 'WOBBLE') {
      return 'High Potential';
    }
    return type.TypeName;
  };

  // Get color for category
  const getCategoryColor = (category: IncidentCategory | undefined) => {
    if (!category?.ColorCode) {
      return 'bg-gray-100 text-gray-600';
    }
    return category.ColorCode;
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={loadData} className="btn btn-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Report New Incident</h1>
            <p className="text-gray-600 mt-1">Select the type of incident you want to report</p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6 max-w-6xl mx-auto">

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-4 max-w-lg">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Filter by Category
            </label>
            <select 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option
                  key={category.IncidentCategoryTypeID || category.CategoryCode || index}
                  value={category.CategoryCode}
                >
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Incident Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Regular incident types */}
        {filteredTypes.map((type, index) => {
          const category = categories.find(c => c.IncidentCategoryTypeID === type.IncidentCategoryTypeID);
          const colorClass = getCategoryColor(category);
          
          return (
            <div
              key={type.IncidentTypeID || type.TypeCode || `type-${index}`}
              className={`bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all`}
            >
              <div className={`w-20 h-20 rounded-lg ${colorClass} flex items-center justify-center mb-4 mx-auto`}>
                {getTypeIcon(type.TypeCode)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                {getDisplayName(type)}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {type.Description || 'Report this type of incident'}
              </p>
              <div className="mt-3 text-center">
                <button
                  onClick={() => handleTypeSelect(type.TypeCode)}
                  className="px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors"
                  style={{ backgroundColor: '#3d3a72', borderColor: '#3d3a72' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d2a5a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3d3a72'}
                >
                  Create
                </button>
              </div>
              {!type.IsSystemType && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-500">Custom Type</span>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Build from Document Card - At the bottom */}
        <div
          key="build-from-document"
          onClick={() => router.push('/incidents/form-builder')}
          className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="w-20 h-20 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 mx-auto">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Incident Form Builder
          </h3>
          <p className="text-sm text-gray-600 text-center">
            Upload safety manuals, compliance docs, or existing forms and let AI extract incident reporting fields automatically
          </p>
          <div className="mt-3 text-center">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              AI-Powered
            </span>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Quick Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Select the incident type that best matches what happened</li>
          <li>• For immediate safety concerns, contact your supervisor directly</li>
          <li>• All incidents should be reported as soon as possible</li>
          <li>• Take photos if safe to do so - you can attach them to your report</li>
        </ul>
      </div>
      </div>

      {/* Near Miss Initial Modal */}
      <NearMissInitialModal
        isOpen={showNearMissModal}
        onClose={() => setShowNearMissModal(false)}
        onSaveAndContinue={(data) => {
          console.log('Near Miss data:', data);
          setShowNearMissModal(false);
          // Navigate to form with the incident case ID for prepopulation
          router.push(`/incidents/near-miss/new?id=${data.incidentCaseId}`);
        }}
      />

      {/* Road Traffic Initial Modal */}
      <RoadTrafficInitialModal
        isOpen={showRoadTrafficModal}
        onClose={() => setShowRoadTrafficModal(false)}
        onSaveAndContinue={(data) => {
          console.log('Road Traffic data:', data);
          setShowRoadTrafficModal(false);
          // Navigate to form with the incident case ID for prepopulation
          router.push(`/incidents/road-traffic/new?id=${data.incidentCaseId}`);
        }}
      />

      {/* Dangerous Occurrence Initial Modal */}
      <DangerousOccurrenceInitialModal
        isOpen={showDangerousOccurrenceModal}
        onClose={() => setShowDangerousOccurrenceModal(false)}
        onSaveAndContinue={(data) => {
          console.log('Dangerous Occurrence data:', data);
          setShowDangerousOccurrenceModal(false);
          // Navigate to form with the incident case ID for prepopulation
          router.push(`/incidents/dangerous-occurrence/new?id=${data.incidentCaseId}`);
        }}
      />

      {/* Accident Book Initial Modal */}
      <AccidentBookInitialModal
        isOpen={showAccidentBookModal}
        onClose={() => setShowAccidentBookModal(false)}
        onSaveAndContinue={(data) => {
          console.log('Accident Book data:', data);
          setShowAccidentBookModal(false);
          // Navigate to form with the incident case ID for prepopulation
          router.push(`/incidents/accident-book/new?id=${data.incidentCaseId}`);
        }}
      />

      {/* High Potential Initial Modal */}
      <HighPotentialInitialModal
        isOpen={showHighPotentialModal}
        onClose={() => setShowHighPotentialModal(false)}
        onSaveAndContinue={(data) => {
          console.log('High Potential data:', data);
          setShowHighPotentialModal(false);
          // Navigate to form with the incident case ID for prepopulation
          router.push(`/incidents/high-potential/new?id=${data.incidentCaseId}`);
        }}
      />
    </div>
  );
}