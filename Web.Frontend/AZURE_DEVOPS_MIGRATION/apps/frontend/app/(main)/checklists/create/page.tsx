'use client';

import { useState } from 'react';

export default function CreateChecklistPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const checklistTypes = [
    {
      id: 'basic',
      title: 'Basic Checklist',
      subtitle: 'Simple & Straightforward',
      description: 'A simple list of items without sections or complex structure. Perfect for quick verification tasks.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      features: ['Single item list', 'Quick to create', 'Easy to complete', 'No sections needed']
    },
    {
      id: 'sectioned',
      title: 'Sectioned Checklist',
      subtitle: 'Organized & Structured',
      description: 'A comprehensive checklist organized into logical sections for complex workflows and detailed inspections.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      features: ['Multiple sections', 'Grouped items', 'Progress tracking per section', 'Detailed organization']
    },
    {
      id: 'ai-generated',
      title: 'Build from Document',
      subtitle: 'Intelligent & Automated',
      description: 'Upload a document and we will build a comprehensive checklist based on the content, automatically extracting key requirements.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: ['Document upload', 'Intelligent content analysis', 'Automatic item extraction', 'Smart categorization']
    },
    {
      id: 'live',
      title: 'Live Checklist',
      subtitle: 'Dynamic & Collaborative',
      description: 'A living, breathing checklist that stays current with real-time updates. Never submitted, always evolving with your project.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ['Real-time updates', 'Collaborative editing', 'Never finalized', 'Continuous evolution']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">Create New Checklist</h1>
        <p className="text-base-content/70 mt-2">
          Choose the type of checklist that best fits your needs. Each type is designed for different workflows and complexity levels.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checklistTypes.map((type) => (
          <div
            key={type.id}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 bg-base-100 border-base-300 hover:shadow-lg ${
              selectedType === type.id 
                ? 'ring-4 ring-primary ring-opacity-50 border-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedType(type.id)}
            onDoubleClick={() => {
              // Navigate directly on double-click
              if (type.id === 'basic') {
                window.location.href = '/checklists/create/basic';
              } else if (type.id === 'ai-generated') {
                window.location.href = '/checklists/create/document';
              } else {
                console.log(`Creating ${type.id} checklist`);
              }
            }}
          >
            {/* Selection indicator */}
            {selectedType === type.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Icon */}
            <div className="text-primary mb-4">
              {type.icon}
            </div>
            
            {/* Title & Subtitle */}
            <div className="mb-3">
              <h3 className="text-xl font-bold text-base-content mb-1">{type.title}</h3>
              <p className="text-sm font-medium text-primary">{type.subtitle}</p>
            </div>
            
            {/* Description */}
            <p className="text-base-content/70 text-sm mb-4 leading-relaxed">
              {type.description}
            </p>
            
            {/* Features */}
            <div className="space-y-2">
              {type.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-base-content/60">
                  <div className="w-1.5 h-1.5 rounded-full mr-2 bg-primary"></div>
                  {feature}
                </div>
              ))}
            </div>
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
                window.location.href = '/checklists/create/basic';
              } else if (selectedType === 'ai-generated') {
                window.location.href = '/checklists/create/document';
              } else {
                console.log(`Creating ${selectedType} checklist`);
              }
            }}
          >
            <span className="flex items-center gap-2">
              {selectedType === 'basic' && 'Create Basic Checklist'}
              {selectedType === 'sectioned' && 'Create Sectioned Checklist'}
              {selectedType === 'ai-generated' && 'Upload Document to Build'}
              {selectedType === 'live' && 'Create Live Checklist'}
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
  );
}