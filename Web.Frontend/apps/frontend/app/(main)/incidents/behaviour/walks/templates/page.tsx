"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WalkTemplate } from '@/types/behaviour/walks';
import MockWalkService from '@/services/mockWalkService';

const WALK_TYPE_INFO = {
  housekeeping: {
    icon: '🧹',
    color: 'bg-green-100 text-green-700 border-green-200',
    description: 'Focus on 5S principles, cleanliness, and organization'
  },
  security: {
    icon: '🔒',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Access control, perimeter checks, and surveillance'
  },
  fire: {
    icon: '🔥',
    color: 'bg-red-100 text-red-700 border-red-200',
    description: 'Emergency equipment, exits, and fire safety compliance'
  },
  hygiene: {
    icon: '🧼',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Sanitation, PPE compliance, and contamination control'
  },
  equipment: {
    icon: '⚙️',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    description: 'Machinery safety, maintenance, and lockout/tagout'
  },
  general: {
    icon: '📋',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    description: 'General purpose safety and compliance checks'
  }
};

export default function WalkTemplatesPage() {
  const router = useRouter();
  const [templates] = useState<WalkTemplate[]>(MockWalkService.getTemplates());
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<WalkTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesType = selectedType === 'all' || template.type === selectedType;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Group templates by type
  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.type]) {
      acc[template.type] = [];
    }
    acc[template.type].push(template);
    return acc;
  }, {} as Record<string, WalkTemplate[]>);

  // Use template
  const useTemplate = (template: WalkTemplate) => {
    router.push(`/incidents/behaviour/walks/execute/new?template=${template.id}`);
  };

  // Customize template
  const customizeTemplate = (template: WalkTemplate) => {
    // In a real app, this would load the template into the builder
    router.push(`/incidents/behaviour/walks/builder?template=${template.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/incidents/behaviour/walks')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Walk Templates</h1>
                <p className="text-gray-600">Pre-built templates for common safety walks</p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/incidents/behaviour/walks/builder')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Custom
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              {Object.keys(WALK_TYPE_INFO).filter(t => t !== 'general').map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedType === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{WALK_TYPE_INFO[type as keyof typeof WALK_TYPE_INFO].icon}</span>
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {Object.entries(groupedTemplates).map(([type, typeTemplates]) => (
          <div key={type} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{WALK_TYPE_INFO[type as keyof typeof WALK_TYPE_INFO].icon}</span>
              <h2 className="text-xl font-semibold capitalize">{type} Walks</h2>
              <span className="text-sm text-gray-500">({typeTemplates.length} templates)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typeTemplates.map(template => (
                <div key={template.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{WALK_TYPE_INFO[template.type as keyof typeof WALK_TYPE_INFO].icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{template.title}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Template Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{template.checkpoints.length}</p>
                        <p className="text-xs text-gray-600">Checkpoints</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{template.duration}</p>
                        <p className="text-xs text-gray-600">Minutes</p>
                      </div>
                    </div>

                    {/* Template Features */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{template.mode} mode</span>
                      </div>
                      {template.isGPSTracked && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>GPS tracking enabled</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Behaviour integration</span>
                      </div>
                    </div>

                    {/* Popularity */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Popularity</span>
                        <span className="font-medium">{template.popularity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${template.popularity}%` }}
                        />
                      </div>
                      {template.lastUsed && (
                        <p className="text-xs text-gray-500 mt-1">Last used: {template.lastUsed}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => useTemplate(template)}
                        className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm"
                      >
                        Use Template
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowPreview(true);
                        }}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => customizeTemplate(template)}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 mb-4">No templates found</p>
            <button
              onClick={() => router.push('/incidents/behaviour/walks/builder')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
            >
              Create Custom Template
            </button>
          </div>
        )}
      </div>

      {/* Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{WALK_TYPE_INFO[selectedTemplate.type as keyof typeof WALK_TYPE_INFO].icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedTemplate.title}</h3>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowPreview(false);
                    setSelectedTemplate(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Template Info */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{selectedTemplate.checkpoints.length}</p>
                  <p className="text-sm text-gray-600">Checkpoints</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{selectedTemplate.duration}</p>
                  <p className="text-sm text-gray-600">Minutes</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {selectedTemplate.checkpoints.reduce((sum, cp) => sum + cp.pointValue, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
              </div>

              {/* Checkpoints List */}
              <h4 className="font-semibold mb-3">Checkpoints</h4>
              <div className="space-y-3 mb-6">
                {selectedTemplate.checkpoints.map((checkpoint, index) => (
                  <div key={checkpoint.checkpointId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                        <div className="flex-1">
                          <h5 className="font-medium">{checkpoint.name}</h5>
                          <p className="text-sm text-gray-600">{checkpoint.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>📍 {checkpoint.location.name}</span>
                            <span>✓ {checkpoint.checks.length} checks</span>
                            <span>🎯 {checkpoint.pointValue} points</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Checks */}
                    <div className="mt-3 pl-8">
                      {checkpoint.checks.map((check, checkIndex) => (
                        <div key={check.id} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <span className="text-gray-400">{checkIndex + 1}.</span>
                          <span>{check.question}</span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{check.type}</span>
                          {check.required && <span className="text-xs text-red-500">*</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    useTemplate(selectedTemplate);
                  }}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                >
                  Start Walk Now
                </button>
                <button
                  onClick={() => {
                    customizeTemplate(selectedTemplate);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Customize Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}