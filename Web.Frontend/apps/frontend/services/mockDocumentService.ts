// Mock Document Service for Reference Document Picker
// This service provides mock data for documents that can be attached to checklist questions

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'txt' | 'image' | 'video';
  category: string;
  privacy: 'public' | 'internal' | 'confidential' | 'restricted';
  size: string;
  modified: string;
  modifiedBy: string;
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  url?: string;
  description?: string;
  version?: string;
  department?: string;
}

// Mock documents organized by category - focusing on checklist-relevant content
const mockDocuments: Document[] = [
  // Safety Documentation
  {
    id: 'doc-001',
    name: 'PPE Requirements Guide',
    type: 'pdf',
    category: 'Safety Documentation',
    privacy: 'public',
    size: '2.4 MB',
    modified: '2025-01-15',
    modifiedBy: 'Safety Team',
    tags: ['safety', 'ppe', 'equipment', 'guide'],
    status: 'active',
    url: '/documents/ppe-requirements.pdf',
    description: 'Complete guide for Personal Protective Equipment requirements across all departments',
    version: '2.1',
    department: 'Safety'
  },
  {
    id: 'doc-002',
    name: 'Lockout/Tagout Procedures',
    type: 'pdf',
    category: 'Safety Documentation',
    privacy: 'internal',
    size: '1.8 MB',
    modified: '2025-01-10',
    modifiedBy: 'Safety Officer',
    tags: ['safety', 'loto', 'lockout', 'tagout', 'procedure'],
    status: 'active',
    url: '/documents/loto-procedures.pdf',
    description: 'Standard operating procedures for lockout/tagout of hazardous energy',
    version: '3.0',
    department: 'Safety'
  },
  {
    id: 'doc-003',
    name: 'Emergency Response Plan',
    type: 'pdf',
    category: 'Safety Documentation',
    privacy: 'public',
    size: '3.2 MB',
    modified: '2025-01-05',
    modifiedBy: 'Emergency Response Team',
    tags: ['safety', 'emergency', 'response', 'evacuation'],
    status: 'active',
    url: '/documents/emergency-response.pdf',
    description: 'Comprehensive emergency response and evacuation procedures',
    version: '1.5',
    department: 'Safety'
  },
  {
    id: 'doc-004',
    name: 'Hazard Communication Standard',
    type: 'pdf',
    category: 'Safety Documentation',
    privacy: 'public',
    size: '890 KB',
    modified: '2024-12-20',
    modifiedBy: 'Safety Team',
    tags: ['safety', 'hazcom', 'chemical', 'sds'],
    status: 'active',
    url: '/documents/hazcom-standard.pdf',
    description: 'OSHA Hazard Communication Standard compliance guide',
    version: '2.0'
  },

  // Policies & Procedures
  {
    id: 'doc-005',
    name: 'Quality Control Checklist SOP',
    type: 'docx',
    category: 'Policies & Procedures',
    privacy: 'internal',
    size: '456 KB',
    modified: '2025-01-20',
    modifiedBy: 'Quality Team',
    tags: ['quality', 'sop', 'checklist', 'procedure'],
    status: 'active',
    url: '/documents/qc-checklist-sop.docx',
    description: 'Standard operating procedure for quality control checklists',
    version: '4.2',
    department: 'Quality'
  },
  {
    id: 'doc-006',
    name: 'Equipment Maintenance Procedures',
    type: 'pdf',
    category: 'Policies & Procedures',
    privacy: 'internal',
    size: '1.2 MB',
    modified: '2025-01-18',
    modifiedBy: 'Maintenance Lead',
    tags: ['maintenance', 'equipment', 'procedure', 'preventive'],
    status: 'active',
    url: '/documents/equipment-maintenance.pdf',
    description: 'Preventive maintenance procedures for all facility equipment',
    version: '3.5',
    department: 'Maintenance'
  },
  {
    id: 'doc-007',
    name: 'Incident Reporting Procedure',
    type: 'pdf',
    category: 'Policies & Procedures',
    privacy: 'public',
    size: '670 KB',
    modified: '2025-01-12',
    modifiedBy: 'HSE Manager',
    tags: ['incident', 'reporting', 'safety', 'procedure'],
    status: 'active',
    url: '/documents/incident-reporting.pdf',
    description: 'Step-by-step guide for incident reporting and investigation',
    version: '2.8'
  },
  {
    id: 'doc-008',
    name: 'Data Privacy Policy',
    type: 'pdf',
    category: 'Policies & Procedures',
    privacy: 'public',
    size: '1.5 MB',
    modified: '2024-12-15',
    modifiedBy: 'Compliance Team',
    tags: ['privacy', 'data', 'compliance', 'gdpr'],
    status: 'active',
    url: '/documents/privacy-policy.pdf',
    description: 'Company data privacy and protection policy',
    version: '2.1'
  },

  // Training Materials
  {
    id: 'doc-009',
    name: 'Forklift Operation Training Guide',
    type: 'pdf',
    category: 'Training Materials',
    privacy: 'internal',
    size: '4.5 MB',
    modified: '2025-01-08',
    modifiedBy: 'Training Department',
    tags: ['training', 'forklift', 'safety', 'operation'],
    status: 'active',
    url: '/documents/forklift-training.pdf',
    description: 'Complete training guide for forklift operation and safety',
    version: '1.3',
    department: 'Training'
  },
  {
    id: 'doc-010',
    name: 'New Employee Safety Orientation',
    type: 'pptx',
    category: 'Training Materials',
    privacy: 'internal',
    size: '8.2 MB',
    modified: '2025-01-22',
    modifiedBy: 'HR Team',
    tags: ['training', 'orientation', 'safety', 'onboarding'],
    status: 'active',
    url: '/documents/safety-orientation.pptx',
    description: 'Safety orientation presentation for new employees',
    version: '5.0',
    department: 'HR'
  },
  {
    id: 'doc-011',
    name: 'Chemical Handling Training',
    type: 'pdf',
    category: 'Training Materials',
    privacy: 'internal',
    size: '2.8 MB',
    modified: '2025-01-14',
    modifiedBy: 'Safety Training Team',
    tags: ['training', 'chemical', 'safety', 'hazmat'],
    status: 'active',
    url: '/documents/chemical-training.pdf',
    description: 'Training material for safe chemical handling and storage',
    version: '2.2'
  },

  // Templates & Forms
  {
    id: 'doc-012',
    name: 'Daily Safety Inspection Form',
    type: 'pdf',
    category: 'Templates & Forms',
    privacy: 'public',
    size: '234 KB',
    modified: '2025-01-25',
    modifiedBy: 'Safety Team',
    tags: ['form', 'safety', 'inspection', 'daily'],
    status: 'active',
    url: '/documents/daily-safety-form.pdf',
    description: 'Template for daily safety inspections',
    version: '1.8'
  },
  {
    id: 'doc-013',
    name: 'Equipment Checklist Template',
    type: 'xlsx',
    category: 'Templates & Forms',
    privacy: 'public',
    size: '145 KB',
    modified: '2025-01-19',
    modifiedBy: 'Operations Team',
    tags: ['template', 'equipment', 'checklist'],
    status: 'active',
    url: '/documents/equipment-checklist.xlsx',
    description: 'Excel template for equipment inspection checklists',
    version: '2.0'
  },
  {
    id: 'doc-014',
    name: 'Risk Assessment Form',
    type: 'docx',
    category: 'Templates & Forms',
    privacy: 'internal',
    size: '389 KB',
    modified: '2025-01-16',
    modifiedBy: 'Risk Management',
    tags: ['form', 'risk', 'assessment', 'template'],
    status: 'active',
    url: '/documents/risk-assessment.docx',
    description: 'Standard risk assessment form template',
    version: '3.1'
  },

  // Compliance Documents
  {
    id: 'doc-015',
    name: 'OSHA Compliance Guide',
    type: 'pdf',
    category: 'Compliance Documents',
    privacy: 'public',
    size: '5.6 MB',
    modified: '2024-12-28',
    modifiedBy: 'Compliance Officer',
    tags: ['compliance', 'osha', 'regulations', 'guide'],
    status: 'active',
    url: '/documents/osha-compliance.pdf',
    description: 'Comprehensive OSHA compliance requirements and guidelines',
    version: '2024.2'
  },
  {
    id: 'doc-016',
    name: 'ISO 9001 Quality Manual',
    type: 'pdf',
    category: 'Compliance Documents',
    privacy: 'confidential',
    size: '3.4 MB',
    modified: '2025-01-03',
    modifiedBy: 'Quality Manager',
    tags: ['iso', 'quality', 'compliance', 'manual'],
    status: 'active',
    url: '/documents/iso-9001-manual.pdf',
    description: 'ISO 9001 quality management system manual',
    version: '2.5'
  },
  {
    id: 'doc-017',
    name: 'Environmental Compliance Checklist',
    type: 'pdf',
    category: 'Compliance Documents',
    privacy: 'internal',
    size: '1.1 MB',
    modified: '2025-01-11',
    modifiedBy: 'Environmental Team',
    tags: ['compliance', 'environmental', 'checklist', 'epa'],
    status: 'active',
    url: '/documents/environmental-compliance.pdf',
    description: 'EPA environmental compliance checklist and requirements',
    version: '1.9'
  },

  // HR Documents
  {
    id: 'doc-018',
    name: 'Employee Handbook',
    type: 'pdf',
    category: 'HR Documents',
    privacy: 'internal',
    size: '2.9 MB',
    modified: '2025-01-01',
    modifiedBy: 'HR Department',
    tags: ['hr', 'handbook', 'employee', 'policies'],
    status: 'active',
    url: '/documents/employee-handbook.pdf',
    description: 'Complete employee handbook with company policies',
    version: '2025.1'
  },
  {
    id: 'doc-019',
    name: 'Code of Conduct',
    type: 'pdf',
    category: 'HR Documents',
    privacy: 'public',
    size: '890 KB',
    modified: '2024-11-15',
    modifiedBy: 'HR Team',
    tags: ['hr', 'conduct', 'ethics', 'policy'],
    status: 'active',
    url: '/documents/code-of-conduct.pdf',
    description: 'Company code of conduct and ethical guidelines',
    version: '1.5'
  },

  // Certificates & Licenses
  {
    id: 'doc-020',
    name: 'ISO 14001 Environmental Certificate',
    type: 'pdf',
    category: 'Certificates & Licenses',
    privacy: 'public',
    size: '456 KB',
    modified: '2024-10-20',
    modifiedBy: 'Compliance Team',
    tags: ['certificate', 'iso', 'environmental'],
    status: 'active',
    url: '/documents/iso-14001-cert.pdf',
    description: 'ISO 14001 Environmental Management System certification',
    version: '1.0'
  }
];

// Service functions
export const mockDocumentService = {
  // Get all documents
  getAllDocuments: (): Document[] => {
    return mockDocuments;
  },

  // Search documents by query
  searchDocuments: (query: string): Document[] => {
    const lowercaseQuery = query.toLowerCase();
    return mockDocuments.filter(doc => 
      doc.name.toLowerCase().includes(lowercaseQuery) ||
      doc.description?.toLowerCase().includes(lowercaseQuery) ||
      doc.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      doc.category.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Get documents by category
  getDocumentsByCategory: (category: string): Document[] => {
    return mockDocuments.filter(doc => doc.category === category);
  },

  // Get documents by privacy level
  getDocumentsByPrivacy: (privacy: string): Document[] => {
    return mockDocuments.filter(doc => doc.privacy === privacy);
  },

  // Get document by ID
  getDocumentById: (id: string): Document | undefined => {
    return mockDocuments.find(doc => doc.id === id);
  },

  // Get documents by IDs
  getDocumentsByIds: (ids: string[]): Document[] => {
    return mockDocuments.filter(doc => ids.includes(doc.id));
  },

  // Get document categories
  getCategories: (): string[] => {
    return [...new Set(mockDocuments.map(doc => doc.category))];
  },

  // Get frequently used documents (mock implementation)
  getFrequentlyUsed: (): Document[] => {
    // Return first 5 safety and procedure documents
    return mockDocuments
      .filter(doc => 
        doc.category === 'Safety Documentation' || 
        doc.category === 'Policies & Procedures'
      )
      .slice(0, 5);
  },

  // Get recently accessed documents (mock implementation)
  getRecentlyAccessed: (): Document[] => {
    // Return 5 random documents for mock
    return [...mockDocuments]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
  },

  // Filter documents with multiple criteria
  filterDocuments: (filters: {
    categories?: string[];
    privacy?: string[];
    status?: string;
    tags?: string[];
  }): Document[] => {
    return mockDocuments.filter(doc => {
      if (filters.categories && !filters.categories.includes(doc.category)) return false;
      if (filters.privacy && !filters.privacy.includes(doc.privacy)) return false;
      if (filters.status && doc.status !== filters.status) return false;
      if (filters.tags && !filters.tags.some(tag => doc.tags.includes(tag))) return false;
      return true;
    });
  }
};

export default mockDocumentService;