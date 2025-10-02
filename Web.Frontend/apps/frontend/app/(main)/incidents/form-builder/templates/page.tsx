'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  fieldCount: number;
  lastUpdated: string;
  usage: number;
  tags: string[];
  preview?: string;
}

const templates: FormTemplate[] = [
  // Safety & Health Templates (Based on actual incident types from your system)
  {
    id: 'wobble',
    title: 'High Potential Incident (Wobble)',
    description: 'Quick incident reporting for minor incidents and high potential near misses',
    category: 'SAFETY',
    categoryLabel: 'Safety & Health',
    fieldCount: 15,
    lastUpdated: '2025-01-15',
    usage: 1247,
    tags: ['wobble', 'high potential', 'near miss', 'quick reporting']
  },
  {
    id: 'accident-book',
    title: 'Accident Book Record',
    description: 'Detailed accident recording with injury details, body part picker, and first aid information',
    category: 'SAFETY',
    categoryLabel: 'Safety & Health',
    fieldCount: 28,
    lastUpdated: '2025-01-10',
    usage: 892,
    tags: ['accident book', 'injury', 'first aid', 'body parts']
  },
  {
    id: 'accident-report',
    title: 'Accident Report Form',
    description: 'Comprehensive accident investigation report with detailed analysis and witness statements',
    category: 'SAFETY',
    categoryLabel: 'Safety & Health',
    fieldCount: 35,
    lastUpdated: '2025-01-20',
    usage: 2103,
    tags: ['accident', 'investigation', 'comprehensive', 'analysis']
  },
  {
    id: 'dangerous-occurrence',
    title: 'Dangerous Occurrence',
    description: 'Report dangerous occurrences and incidents that could have caused serious harm',
    category: 'SAFETY',
    categoryLabel: 'Safety & Health',
    fieldCount: 22,
    lastUpdated: '2025-01-18',
    usage: 423,
    tags: ['dangerous occurrence', 'RIDDOR', 'serious incident', 'reporting']
  },
  {
    id: 'near-miss',
    title: 'Near Miss Report',
    description: 'Report incidents that could have caused harm with detailed witness and reporter information',
    category: 'SAFETY',
    categoryLabel: 'Safety & Health',
    fieldCount: 25,
    lastUpdated: '2025-01-12',
    usage: 756,
    tags: ['near miss', 'prevention', 'witness', 'potential harm']
  },
  {
    id: 'road-traffic',
    title: 'Road Traffic Incident',
    description: 'Vehicle and road traffic incident reports with driver and vehicle information',
    category: 'SAFETY',
    categoryLabel: 'Safety & Health',
    fieldCount: 20,
    lastUpdated: '2025-01-14',
    usage: 389,
    tags: ['road traffic', 'vehicle', 'driver', 'transport']
  },
  
  // Operations Templates
  {
    id: 'farming',
    title: 'Farming Incidents',
    description: 'Agriculture-specific incident reporting for farm operations and rural environments',
    category: 'OPERATIONS',
    categoryLabel: 'Operations',
    fieldCount: 18,
    lastUpdated: '2025-01-16',
    usage: 267,
    tags: ['farming', 'agriculture', 'rural', 'operations']
  },
  {
    id: 'equipment-failure',
    title: 'Equipment Failure',
    description: 'Machinery or equipment breakdown reporting with maintenance details',
    category: 'OPERATIONS',
    categoryLabel: 'Operations',
    fieldCount: 16,
    lastUpdated: '2025-01-08',
    usage: 445,
    tags: ['equipment', 'machinery', 'breakdown', 'maintenance']
  },
  
  // Security Templates
  {
    id: 'data-breach',
    title: 'Data Breach',
    description: 'Unauthorized access to confidential data with GDPR compliance tracking',
    category: 'SECURITY',
    categoryLabel: 'Security',
    fieldCount: 28,
    lastUpdated: '2025-01-12',
    usage: 156,
    tags: ['data breach', 'GDPR', 'privacy', 'cybersecurity']
  },
  {
    id: 'physical-breach',
    title: 'Physical Security Breach',
    description: 'Unauthorized physical access to facilities and security incidents',
    category: 'SECURITY',
    categoryLabel: 'Security',
    fieldCount: 22,
    lastUpdated: '2025-01-11',
    usage: 89,
    tags: ['physical security', 'unauthorized access', 'facilities']
  },
  
  // HR & Compliance Templates
  {
    id: 'harassment',
    title: 'Harassment Complaint',
    description: 'Workplace harassment incidents with confidential reporting options',
    category: 'HR_COMPLIANCE',
    categoryLabel: 'HR & Compliance',
    fieldCount: 20,
    lastUpdated: '2025-01-14',
    usage: 67,
    tags: ['harassment', 'workplace', 'confidential', 'HR']
  },
  {
    id: 'policy-violation',
    title: 'Policy Violation',
    description: 'Document violations of company policies and procedures with disciplinary tracking',
    category: 'HR_COMPLIANCE',
    categoryLabel: 'HR & Compliance',
    fieldCount: 19,
    lastUpdated: '2025-01-16',
    usage: 234,
    tags: ['policy', 'violation', 'discipline', 'procedures']
  },
  
  // Environmental Templates
  {
    id: 'chemical-spill',
    title: 'Chemical Spill',
    description: 'Accidental release of hazardous chemicals with containment and cleanup tracking',
    category: 'ENVIRONMENTAL',
    categoryLabel: 'Environmental',
    fieldCount: 26,
    lastUpdated: '2025-01-11',
    usage: 178,
    tags: ['chemical spill', 'hazmat', 'containment', 'EPA']
  },
  {
    id: 'environmental-incident',
    title: 'Environmental Incident',
    description: 'General environmental incident reporting for regulatory compliance',
    category: 'ENVIRONMENTAL',
    categoryLabel: 'Environmental',
    fieldCount: 21,
    lastUpdated: '2025-01-19',
    usage: 145,
    tags: ['environment', 'compliance', 'pollution', 'regulatory']
  },
  
  // Quality Templates
  {
    id: 'product-defect',
    title: 'Product Defect',
    description: 'Quality issues with products or services including root cause analysis',
    category: 'QUALITY',
    categoryLabel: 'Quality',
    fieldCount: 23,
    lastUpdated: '2025-01-13',
    usage: 567,
    tags: ['product defect', 'quality', 'root cause', 'manufacturing']
  },
  {
    id: 'customer-complaint',
    title: 'Customer Complaint',
    description: 'Formal customer quality complaints with resolution workflow tracking',
    category: 'QUALITY',
    categoryLabel: 'Quality',
    fieldCount: 17,
    lastUpdated: '2025-01-17',
    usage: 392,
    tags: ['customer', 'complaint', 'quality', 'resolution']
  }
];

export default function FormTemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Templates', count: templates.length },
    { value: 'SAFETY', label: 'Safety & Health', count: templates.filter(t => t.category === 'SAFETY').length },
    { value: 'OPERATIONS', label: 'Operations', count: templates.filter(t => t.category === 'OPERATIONS').length },
    { value: 'SECURITY', label: 'Security', count: templates.filter(t => t.category === 'SECURITY').length },
    { value: 'HR_COMPLIANCE', label: 'HR & Compliance', count: templates.filter(t => t.category === 'HR_COMPLIANCE').length },
    { value: 'ENVIRONMENTAL', label: 'Environmental', count: templates.filter(t => t.category === 'ENVIRONMENTAL').length },
    { value: 'QUALITY', label: 'Quality', count: templates.filter(t => t.category === 'QUALITY').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (templateId: string) => {
    // Navigate to scratch builder with template pre-loaded
    router.push(`/incidents/form-builder/create/scratch?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Form Templates</h1>
              <p className="text-gray-600 mt-1">
                Start with a pre-built template and customize it to your needs
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/incidents/form-builder')}
                style={{ 
                  backgroundColor: '#e77726', 
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
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Search templates</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates by name, description, or tags..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                style={selectedCategory === cat.value 
                  ? { 
                      backgroundColor: '#3d3a72', 
                      color: '#ffffff', 
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s'
                    }
                  : { 
                      backgroundColor: '#f3f4f6', 
                      color: '#374151', 
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'background-color 0.2s'
                    }
                }
                className={selectedCategory === cat.value ? 'hover:opacity-80' : 'hover:bg-gray-200'}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className={`bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {/* Category Badge */}
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${
              template.category === 'SAFETY' ? 'bg-red-100 text-red-800' :
              template.category === 'OPERATIONS' ? 'bg-orange-100 text-orange-800' :
              template.category === 'SECURITY' ? 'bg-purple-100 text-purple-800' :
              template.category === 'HR_COMPLIANCE' ? 'bg-blue-100 text-blue-800' :
              template.category === 'ENVIRONMENTAL' ? 'bg-green-100 text-green-800' :
              template.category === 'QUALITY' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {template.categoryLabel}
            </div>

            {/* Template Info */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {template.fieldCount} fields
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {template.usage} uses
                </span>
              </div>
              <span>Updated {new Date(template.lastUpdated).toLocaleDateString()}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Show preview modal
                  console.log('Preview template:', template.id);
                }}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'opacity 0.2s',
                  flex: 1
                }}
                className="hover:opacity-80"
              >
                Preview
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/incidents/form-builder/edit/${template.id}`);
                }}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'opacity 0.2s',
                  flex: 1
                }}
                className="hover:opacity-80"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">About Templates</h4>
            <p className="text-sm text-blue-800">
              These templates are designed to meet common industry standards and compliance requirements. 
              You can customize any template after selection to match your specific organizational needs. 
              Templates are regularly updated to reflect the latest regulations and best practices.
            </p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}