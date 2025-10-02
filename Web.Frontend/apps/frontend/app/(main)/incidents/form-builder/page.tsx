'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IncidentFormBuilder() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const builderTypes = [
    {
      id: 'scratch',
      title: 'Build from Scratch',
      subtitle: 'Design Your Own Form',
      description: 'Create a custom incident form with drag-and-drop fields. Perfect for unique incident types or specific organizational needs.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      features: ['Drag-and-drop interface', 'Custom field types', 'Conditional logic', 'Validation rules'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'template',
      title: 'Edit Existing Template',
      subtitle: 'Customize Pre-built Forms',
      description: 'Start with a professional template and customise it to your needs. Add, remove, or modify questions and answer types.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      features: ['Pre-built templates', 'Add/remove questions', 'Modify answer types', 'Compliance-ready'],
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'document',
      title: 'Upload Document',
      subtitle: 'AI-Powered Extraction',
      description: 'Upload an existing form, safety manual, or compliance document. AI will intelligently extract fields and create a structured form.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      features: ['PDF & Word support', 'Intelligent field detection', 'Auto-categorization', 'Field type suggestions'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'paste',
      title: 'Copy & Paste',
      subtitle: 'Quick Form Import',
      description: 'Paste an existing form from Word, Excel, or another system. Great for migrating forms or using templates from other sources.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      features: ['Multiple formats', 'Smart parsing', 'Field recognition', 'Quick setup'],
      color: 'bg-green-100 text-green-600'
    }
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (!selectedType) return;
    
    if (selectedType === 'template') {
      // Navigate to template gallery
      router.push('/incidents/form-builder/templates');
    } else {
      // Navigate to specific builder
      router.push(`/incidents/form-builder/create/${selectedType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Incident Form Builder</h1>
            <p className="text-gray-600 mt-1">
              Create custom incident report forms tailored to your organization's needs. Choose how you'd like to start building your form.
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {builderTypes.map((type) => (
          <div
            key={type.id}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 bg-white hover:shadow-lg ${
              selectedType === type.id 
                ? 'ring-2 border-2' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={selectedType === type.id 
              ? { borderColor: '#3d3a72', boxShadow: '0 0 0 3px rgba(61, 58, 114, 0.1)' }
              : {}}
            onClick={() => handleTypeSelect(type.id)}
          >
            {/* Selection indicator */}
            {selectedType === type.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3d3a72' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Title & Subtitle */}
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{type.title}</h3>
              <p className="text-sm font-medium" style={{ color: '#3d3a72' }}>{type.subtitle}</p>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {type.description}
            </p>
            
            {/* Features */}
            <div className="space-y-2">
              {type.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full mr-2 bg-gray-400"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <button 
          onClick={() => router.push('/incidents/manage')}
          style={{ 
            backgroundColor: '#e77726', 
            color: '#ffffff', 
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'opacity 0.2s'
          }}
          className="hover:opacity-80"
        >
          Back
        </button>
        
        {selectedType && (
          <button 
            style={{ 
              backgroundColor: '#3d3a72', 
              color: '#ffffff', 
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'opacity 0.2s'
            }}
            className="hover:opacity-80"
            onClick={handleContinue}
          >
            Continue with {builderTypes.find(t => t.id === selectedType)?.title}
          </button>
        )}
      </div>

      </div>
    </div>
  );
}