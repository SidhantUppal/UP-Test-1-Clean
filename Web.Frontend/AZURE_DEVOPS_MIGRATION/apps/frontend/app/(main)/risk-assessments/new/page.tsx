'use client';

import { useState } from 'react';

export default function NewRiskAssessmentPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const assessmentTypes = [
    {
      id: 'basic',
      title: 'Basic',
      subtitle: 'Simple & Quick',
      description: 'For routine operations with minimal complexity.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: ['Simple hazards', 'Basic matrix', 'Quick completion'],
      status: 'available'
    },
    {
      id: 'standard',
      title: 'Standard',
      subtitle: 'Comprehensive',
      description: 'Full assessment with detailed analysis.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: ['Detailed analysis', 'Risk scoring', 'Control hierarchy'],
      status: 'available'
    },
    {
      id: 'dynamic',
      title: 'Dynamic',
      subtitle: 'Flexible',
      description: 'Adapts to changing circumstances.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      features: ['Situational', 'Variable conditions', 'Field updates'],
      status: 'available'
    },
    {
      id: 'live',
      title: 'Live',
      subtitle: 'Real-time',
      description: 'Continuously monitored with auto-scoring.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ['Real-time scoring', 'Live tracking', 'Auto updates'],
      status: 'available'
    },
    {
      id: 'chemical',
      title: 'COSHH',
      subtitle: 'Chemical Safety',
      description: 'Hazardous substances assessment.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      features: ['COSHH compliance', 'SDS integration', 'PPE requirements'],
      status: 'coming-soon'
    },
    {
      id: 'fire',
      title: 'Fire',
      subtitle: 'Fire Safety',
      description: 'Comprehensive fire safety assessment.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      features: ['Fire hazards', 'Escape routes', 'Detection systems'],
      status: 'available'
    },
    {
      id: 'martyns-law',
      title: "Martyn's Law",
      subtitle: 'Counter-terrorism',
      description: 'Protect Duty compliance assessment.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      features: ['Threat analysis', 'Security measures', 'Emergency plans'],
      status: 'available'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Create New Risk Assessment</h1>
            <p className="text-gray-600 mt-1">
              Choose the type of risk assessment that best fits your needs. Each type is designed for different levels of complexity and monitoring requirements.
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assessmentTypes.map((type) => (
          <div
            key={type.id}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 bg-base-100 border-base-300 hover:shadow-lg ${
              type.status === 'coming-soon' 
                ? 'opacity-75 cursor-not-allowed' 
                : selectedType === type.id 
                  ? 'ring-2 ring-primary ring-opacity-50 border-primary' 
                  : 'hover:border-primary/50'
            }`}
            onClick={() => type.status !== 'coming-soon' && setSelectedType(type.id)}
            onDoubleClick={() => {
              // Navigate directly on double-click
              if (type.status === 'coming-soon') return;
              if (type.id === 'basic') {
                window.location.href = '/risk-assessments/create/basic';
              } else if (type.id === 'standard') {
                window.location.href = '/risk-assessments/create/standard';
              } else if (type.id === 'standard-monitoring') {
                window.location.href = '/risk-assessments/create/standard-monitoring';
              } else if (type.id === 'live') {
                window.location.href = '/risk-assessments/create/live';
              } else if (type.id === 'dynamic') {
                window.location.href = '/risk-assessments/create/dynamic';
              }
            }}
          >
            {/* Coming Soon Badge */}
            {type.status === 'coming-soon' && (
              <div className="absolute -top-2 -right-2 z-10">
                <span className="bg-warning text-warning-content text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  Coming Soon
                </span>
              </div>
            )}
            
            {/* Selection indicator */}
            {selectedType === type.id && type.status !== 'coming-soon' && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Icon */}
            <div className="text-primary mb-2">
              {type.icon}
            </div>
            
            {/* Title & Subtitle */}
            <div className="mb-2">
              <h3 className="text-base font-bold text-base-content">{type.title}</h3>
              <p className="text-xs font-medium text-primary">{type.subtitle}</p>
            </div>
            
            {/* Description */}
            <p className="text-base-content/70 text-xs mb-3 line-clamp-2">
              {type.description}
            </p>
            
            {/* Features - Compact list */}
            <div className="space-y-1">
              {type.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start text-xs text-base-content/60">
                  <div className="w-1 h-1 rounded-full mr-1.5 bg-primary mt-1 flex-shrink-0"></div>
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Coming Soon Overlay */}
            {type.status === 'coming-soon' && (
              <div className="absolute inset-0 bg-base-100/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-1 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-semibold text-base-content">In Development</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Continue Button */}
      {selectedType && (
        <div className="flex justify-center mt-10">
          <button 
            className="btn btn-primary btn-lg group"
            onClick={() => {
              // Navigate to specific builder based on type
              if (selectedType === 'basic') {
                window.location.href = '/risk-assessments/create/basic';
              } else if (selectedType === 'standard') {
                window.location.href = '/risk-assessments/create/standard';
              } else if (selectedType === 'standard-monitoring') {
                window.location.href = '/risk-assessments/create/standard-monitoring';
              } else if (selectedType === 'live') {
                window.location.href = '/risk-assessments/create/live';
              } else if (selectedType === 'dynamic') {
                window.location.href = '/risk-assessments/create/dynamic';
              }
            }}
          >
            <span className="flex items-center gap-2">
              {selectedType === 'basic' && 'Create Basic Risk Assessment'}
              {selectedType === 'standard' && 'Create Standard Risk Assessment'}
              {selectedType === 'standard-monitoring' && 'Create Standard with Monitoring'}
              {selectedType === 'live' && 'Create Live Assessment'}
              {selectedType === 'dynamic' && 'Create Dynamic Risk Assessment'}
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      )}
      
      {/* Helper text */}
      <div className="text-center mt-6 text-base-content/60 text-sm">
        <p>💡 Tip: Double-click any option to proceed directly</p>
      </div>
      </div>
    </div>
  );
}