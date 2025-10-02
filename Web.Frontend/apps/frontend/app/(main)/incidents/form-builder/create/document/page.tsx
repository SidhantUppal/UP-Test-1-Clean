'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// @ts-ignore
import mammoth from 'mammoth';

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: any;
  order: number;
}

interface ExtractedForm {
  title: string;
  description: string;
  category: string;
  sections: Array<{
    title: string;
    description?: string;
    fields: FormField[];
  }>;
}

// Smart field extraction functions
const detectFormTitle = (text: string): string => {
  const titlePatterns = [
    /(?:^|\n)(.{10,80}(?:FORM|REPORT|INVESTIGATION|ACCIDENT|INCIDENT).{0,20})(?:\n|$)/i,
    /(?:^|\n)(.{0,20}(?:FORM|REPORT|INVESTIGATION|ACCIDENT|INCIDENT).{10,80})(?:\n|$)/i,
    /(?:^|\n)([A-Z][A-Z\s]{10,80})(?:\n|$)/
  ];
  
  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  return 'Extracted Form';
};

const extractFormFieldsFromText = (text: string): Array<{title: string; fields: FormField[]}> => {
  const sections: Array<{title: string; fields: FormField[]}> = [];
  let currentSection = { title: 'Form Fields', fields: [] as FormField[] };
  let fieldOrder = 1;

  // Clean up text
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect section headers (ALL CAPS, numbered sections, etc.)
    if (line.match(/^[A-Z\s]{5,}:?$/) || line.match(/^\d+\.\s*[A-Z]/) || line.match(/^SECTION\s+\d+/i)) {
      if (currentSection.fields.length > 0) {
        sections.push({ ...currentSection });
        currentSection = { title: line.replace(/^\d+\.\s*/, '').replace(/:$/, ''), fields: [] };
      } else {
        currentSection.title = line.replace(/^\d+\.\s*/, '').replace(/:$/, '');
      }
      continue;
    }
    
    // Extract form fields
    const fieldPatterns = [
      // Date/Time fields
      { pattern: /\b(?:date|time)\b/i, type: 'datetime', keywords: ['date', 'time', 'when', 'occurred'] },
      // Location fields  
      { pattern: /\b(?:location|where|place|site|address)\b/i, type: 'location', keywords: ['location', 'where', 'place', 'site', 'address'] },
      // Person fields
      { pattern: /\b(?:name|person|employee|witness|reported by|supervisor)\b/i, type: 'person', keywords: ['name', 'person', 'employee', 'witness', 'reported', 'supervisor'] },
      // Description/narrative fields
      { pattern: /\b(?:description|explain|describe|details|what happened|narrative)\b/i, type: 'textarea', keywords: ['description', 'explain', 'describe', 'details', 'happened', 'narrative'] },
      // Yes/No fields
      { pattern: /\b(?:yes.*no|y.*n)\b/i, type: 'radio', keywords: ['yes', 'no'], options: [{value: 'yes', label: 'Yes'}, {value: 'no', label: 'No'}] },
      // Checkbox fields
      { pattern: /☐|☑|\\[\\s*\\]|\\[x\\]/i, type: 'checkbox', keywords: ['check', 'select'] },
      // Signature fields
      { pattern: /\b(?:signature|sign|signed)\b/i, type: 'signature', keywords: ['signature', 'sign', 'signed'] },
      // File upload fields
      { pattern: /\b(?:attach|upload|photo|image|document)\b/i, type: 'file', keywords: ['attach', 'upload', 'photo', 'image', 'document'] }
    ];
    
    for (const pattern of fieldPatterns) {
      if (line.match(pattern.pattern)) {
        // Create field label from the line
        let label = line.replace(/[☐☑\\[\\]]/g, '').trim();
        label = label.replace(/^[\d.-]+\s*/, ''); // Remove numbering
        label = label.replace(/[_]{3,}.*/, ''); // Remove underscores (form blanks)
        label = label.charAt(0).toUpperCase() + label.slice(1);
        
        if (label.length > 5 && label.length < 100) {
          const field: FormField = {
            id: `field_${fieldOrder}`,
            type: pattern.type,
            label: label,
            required: line.toLowerCase().includes('required') || line.includes('*'),
            order: fieldOrder
          };
          
          // Add options for select/radio fields
          if (pattern.options) {
            field.options = pattern.options;
          }
          
          // Add help text for complex fields
          if (pattern.type === 'textarea') {
            field.helpText = 'Provide detailed information';
          }
          
          currentSection.fields.push(field);
          fieldOrder++;
        }
        break;
      }
    }
    
    // Look for numbered or bulleted items that might be form fields
    if (line.match(/^[\d.-]+\s+/) || line.match(/^[•*-]\s+/)) {
      let label = line.replace(/^[\d.-]+\s+/, '').replace(/^[•*-]\s+/, '').trim();
      label = label.replace(/[_]{3,}.*/, '');
      
      if (label.length > 5 && label.length < 100 && !label.match(/^[A-Z\s]+:?$/)) {
        const field: FormField = {
          id: `field_${fieldOrder}`,
          type: 'text',
          label: label.charAt(0).toUpperCase() + label.slice(1),
          required: false,
          order: fieldOrder
        };
        
        currentSection.fields.push(field);
        fieldOrder++;
      }
    }
  }
  
  // Add the last section
  if (currentSection.fields.length > 0) {
    sections.push(currentSection);
  }
  
  // If no sections were created, create a default one
  if (sections.length === 0) {
    sections.push({
      title: 'Extracted Fields',
      fields: [{
        id: 'field_1',
        type: 'textarea',
        label: 'Document Content',
        required: false,
        order: 1,
        helpText: 'No specific form fields detected. Document content can be reviewed here.'
      }]
    });
  }
  
  return sections;
};

export default function DocumentFormBuilder() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [processingError, setProcessingError] = useState('');
  const [extractedForm, setExtractedForm] = useState<ExtractedForm | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  
  // Form settings
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [category, setCategory] = useState('');
  const [incidentType, setIncidentType] = useState('');
  
  // AI Settings
  const [aiSettings, setAiSettings] = useState({
    extractionPrompt: 'Extract all form fields, questions, and data collection points from this document. Identify field types, validation rules, and group related fields into sections.',
    fieldDetection: 'smart', // smart, aggressive, conservative
    includeInstructions: true,
    inferFieldTypes: true,
    detectValidation: true,
    groupIntoSections: true
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setProcessingError('');
      setExtractedForm(null);
      setShowEditor(false);
    }
  };

  const processDocument = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingError('');
    setProcessingStatus('Reading document...');

    try {
      let documentText = '';
      
      // Extract text based on file type
      if (uploadedFile.name.toLowerCase().endsWith('.docx')) {
        setProcessingStatus('Extracting text from Word document...');
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        documentText = result.value;
      } else if (uploadedFile.name.toLowerCase().endsWith('.txt')) {
        setProcessingStatus('Reading text file...');
        documentText = await uploadedFile.text();
      } else {
        throw new Error('Unsupported file type. Please upload a .docx or .txt file.');
      }
      
      setProcessingStatus('Analyzing document structure...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProcessingStatus('Extracting form fields...');
      
      // Smart field extraction from document text
      const extractedFields = extractFormFieldsFromText(documentText);

      // Create form structure from extracted fields
      const extractedForm: ExtractedForm = {
        title: formTitle || detectFormTitle(documentText) || 'Extracted Incident Form',
        description: formDescription || 'Form extracted from uploaded document',
        category: category || 'SAFETY',
        sections: extractedFields
      };

      setExtractedForm(extractedForm);
      setFormTitle(extractedForm.title);
      setFormDescription(extractedForm.description);
      setCategory(extractedForm.category);
      setShowEditor(true);
      setProcessingStatus('');
      
    } catch (error: any) {
      console.error('Processing error:', error);
      setProcessingError(error.message || 'Failed to process document. Please try again.');
      setProcessingStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  const updateField = useCallback((sectionIndex: number, fieldIndex: number, updates: Partial<FormField>) => {
    if (!extractedForm) return;
    
    const newForm = { ...extractedForm };
    newForm.sections[sectionIndex].fields[fieldIndex] = {
      ...newForm.sections[sectionIndex].fields[fieldIndex],
      ...updates
    };
    setExtractedForm(newForm);
  }, [extractedForm]);

  const deleteField = useCallback((sectionIndex: number, fieldIndex: number) => {
    if (!extractedForm) return;
    
    const newForm = { ...extractedForm };
    newForm.sections[sectionIndex].fields.splice(fieldIndex, 1);
    setExtractedForm(newForm);
  }, [extractedForm]);

  const addField = useCallback((sectionIndex: number) => {
    if (!extractedForm) return;
    
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false,
      order: extractedForm.sections[sectionIndex].fields.length + 1
    };
    
    const newForm = { ...extractedForm };
    newForm.sections[sectionIndex].fields.push(newField);
    setExtractedForm(newForm);
  }, [extractedForm]);

  const saveForm = async (publish: boolean = false) => {
    if (!extractedForm) return;

    const formData = {
      title: formTitle,
      description: formDescription,
      category,
      incidentType,
      sections: extractedForm.sections,
      status: publish ? 'published' : 'draft',
      createdAt: new Date().toISOString(),
      sourceDocument: uploadedFile?.name
    };

    console.log('Saving form:', formData);
    // TODO: API call to save form
    
    router.push('/incidents/form-builder');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Build Form from Document</h1>
            <p className="text-gray-600 mt-1">Upload a document and let AI extract form fields automatically</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Form Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Form Title *</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g., Security Incident Report"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select category</option>
              <option value="SAFETY">Safety & Health</option>
              <option value="SECURITY">Security</option>
              <option value="ENVIRONMENTAL">Environmental</option>
              <option value="HR_COMPLIANCE">HR & Compliance</option>
              <option value="QUALITY">Quality</option>
              <option value="OPERATIONS">Operations</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Brief description of when this form should be used..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

        {/* Document Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Document</h2>
        
        {!uploadedFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="space-y-2">
              <div className="text-lg font-medium text-gray-900">Upload your document</div>
              <p className="text-sm text-gray-500">Word documents (.docx) or text files (.txt) up to 10MB</p>
              <p className="text-xs text-gray-400">Examples: Existing forms, compliance documents, safety manuals</p>
            </div>
            <input
              type="file"
              accept=".docx,.txt"
              onChange={handleFileUpload}
              className="mt-4 block w-full text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              style={{
                background: 'transparent'
              }}
            />
            <style jsx>{`
              input[type="file"]::-webkit-file-upload-button {
                background-color: #3d3a72;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                margin-right: 16px;
              }
              
              input[type="file"]::-webkit-file-upload-button:hover {
                background-color: #2d2659;
              }
              
              input[type="file"]::file-selector-button {
                background-color: #3d3a72;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                margin-right: 16px;
              }
              
              input[type="file"]::file-selector-button:hover {
                background-color: #2d2659;
              }
            `}</style>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900">{uploadedFile.name}</div>
                <div className="text-xs text-green-700">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setExtractedForm(null);
                  setShowEditor(false);
                }}
                className="text-green-600 hover:text-green-800"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* AI Processing Settings */}
            {!showEditor && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">AI Processing Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field Detection Mode</label>
                    <select
                      value={aiSettings.fieldDetection}
                      onChange={(e) => setAiSettings(prev => ({ ...prev, fieldDetection: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="conservative">Conservative - Only obvious form fields</option>
                      <option value="smart">Smart - Balanced detection (Recommended)</option>
                      <option value="aggressive">Aggressive - Extract all possible fields</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiSettings.inferFieldTypes}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, inferFieldTypes: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Auto-detect field types</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiSettings.detectValidation}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, detectValidation: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Extract validation rules</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiSettings.groupIntoSections}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, groupIntoSections: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Group into sections</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiSettings.includeInstructions}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, includeInstructions: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Include help text</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Process Button */}
            {!showEditor && (
              <button
                onClick={processDocument}
                disabled={isProcessing}
                style={{ 
                  backgroundColor: isProcessing ? '#9ca3af' : '#3d3a72',
                  color: '#ffffff', 
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                className={!isProcessing ? "hover:opacity-80" : ""}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{processingStatus || 'Processing...'}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Extract Form Fields with AI</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Processing Error */}
        {processingError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm text-red-700">{processingError}</span>
            </div>
          </div>
        )}
      </div>

        {/* Extracted Form Editor */}
        {showEditor && extractedForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Extracted Form Fields</h2>
              <p className="text-sm text-gray-600 mt-1">Review and edit the AI-extracted form structure</p>
            </div>
            <button
              onClick={() => {
                setShowEditor(false);
                setUploadedFile(null);
                setExtractedForm(null);
              }}
              style={{ 
                backgroundColor: 'transparent',
                color: '#4b5563',
                border: '1px solid #d1d5db',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.2s'
              }}
              className="hover:bg-gray-50"
            >
              Start Over
            </button>
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            {extractedForm.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  {section.description && (
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div
                      key={field.id}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {field.order}
                      </div>
                      
                      <div className="flex-1">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Field Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateField(sectionIndex, fieldIndex, { label: e.target.value })}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Field Type</label>
                            <select
                              value={field.type}
                              onChange={(e) => updateField(sectionIndex, fieldIndex, { type: e.target.value })}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="text">Text</option>
                              <option value="textarea">Text Area</option>
                              <option value="number">Number</option>
                              <option value="date">Date</option>
                              <option value="datetime">Date & Time</option>
                              <option value="select">Dropdown</option>
                              <option value="radio">Radio Buttons</option>
                              <option value="checkbox">Checkboxes</option>
                              <option value="file">File Upload</option>
                              <option value="location">Location</option>
                              <option value="person">Person Selector</option>
                              <option value="signature">Signature</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => updateField(sectionIndex, fieldIndex, { required: e.target.checked })}
                                className="mr-2"
                              />
                              <span className="text-sm">Required</span>
                            </label>
                            
                            <button
                              onClick={() => deleteField(sectionIndex, fieldIndex)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {field.helpText && (
                          <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>
                        )}
                        
                        {field.options && (
                          <div className="mt-2">
                            <span className="text-xs font-medium text-gray-600">Options:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {field.options.map((option, i) => (
                                <span key={i} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
                                  {option.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => addField(sectionIndex)}
                    className="w-full px-4 py-2 border border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-700"
                  >
                    + Add Field to {section.title}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">AI Extraction Summary</h4>
                <p className="text-sm text-blue-800">
                  Extracted {extractedForm.sections.reduce((acc, s) => acc + s.fields.length, 0)} fields 
                  across {extractedForm.sections.length} sections. The AI identified field types based on 
                  context and common patterns. Review each field to ensure accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* Save Actions */}
          <div className="mt-6 flex justify-end space-x-4">
            <button 
              onClick={() => saveForm(false)}
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
              Save as Draft
            </button>
            <button 
              onClick={() => saveForm(true)}
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
              Publish Form
            </button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}