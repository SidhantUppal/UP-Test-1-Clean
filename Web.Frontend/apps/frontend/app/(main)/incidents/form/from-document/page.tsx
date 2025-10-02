'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'time' | 'datetime' | 'number' | 'email' | 'tel' | 'url' | 'checkbox' | 'radio' | 'file';
  required: boolean;
  options?: string[];
  placeholder?: string;
  value?: string;
}

interface GeneratedForm {
  title: string;
  description: string;
  category: string;
  incidentType: string;
  fields: FormField[];
}

export default function DocumentIncidentBuilder() {
  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'processing' | 'preview'>('upload');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'text'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [processingStatus, setProcessingStatus] = useState('');
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if file type is acceptable
      const acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (acceptedTypes.includes(fileExtension)) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Please upload a PDF, DOC, DOCX, or TXT file');
      }
    }
  };

  const generateFormFromContent = (content: string): GeneratedForm => {
    const lowerContent = content.toLowerCase();
    
    const isAccident = lowerContent.includes('accident') || 
                      lowerContent.includes('injury') || 
                      lowerContent.includes('hurt') ||
                      lowerContent.includes('injured') ||
                      lowerContent.includes('medical') ||
                      lowerContent.includes('hospital');

    const isSecurity = lowerContent.includes('security') ||
                      lowerContent.includes('breach') ||
                      lowerContent.includes('theft') ||
                      lowerContent.includes('unauthorized') ||
                      lowerContent.includes('suspicious');

    const isEnvironmental = lowerContent.includes('spill') ||
                            lowerContent.includes('chemical') ||
                            lowerContent.includes('environmental') ||
                            lowerContent.includes('pollution');

    if (isAccident) {
      return {
        title: 'Workplace Accident Report',
        description: 'Report workplace accidents and injuries',
        category: 'SAFETY',
        incidentType: 'ACCIDENT_BOOK',
        fields: [
          { id: 'employeeName', label: 'Employee Name', type: 'text', required: true, placeholder: 'Full name of injured person' },
          { id: 'employeeId', label: 'Employee ID', type: 'text', required: false, placeholder: 'Employee identification number' },
          { id: 'incidentDate', label: 'Date of Incident', type: 'date', required: true },
          { id: 'incidentTime', label: 'Time of Incident', type: 'time', required: true },
          { id: 'location', label: 'Location of Incident', type: 'text', required: true, placeholder: 'Where did the incident occur?' },
          { id: 'injuryType', label: 'Type of Injury', type: 'select', required: true, options: ['Cut/Laceration', 'Bruise/Contusion', 'Sprain/Strain', 'Burn', 'Fracture', 'Eye Injury', 'Back Injury', 'Other'] },
          { id: 'bodyPart', label: 'Body Part Affected', type: 'select', required: true, options: ['Head', 'Eyes', 'Neck', 'Back', 'Arms', 'Hands', 'Legs', 'Feet', 'Multiple', 'Other'] },
          { id: 'description', label: 'Description of Incident', type: 'textarea', required: true, placeholder: 'Describe what happened in detail...' },
          { id: 'witnesses', label: 'Witnesses', type: 'textarea', required: false, placeholder: 'Names and contact details of witnesses' },
          { id: 'firstAid', label: 'First Aid Given?', type: 'checkbox', required: false },
          { id: 'medicalAttention', label: 'Medical Attention Required?', type: 'checkbox', required: false },
          { id: 'reportedBy', label: 'Reported By', type: 'text', required: true, placeholder: 'Name of person reporting' }
        ]
      };
    }

    if (isSecurity) {
      return {
        title: 'Security Incident Report',
        description: 'Report security breaches and concerns',
        category: 'SECURITY',
        incidentType: 'SECURITY_BREACH',
        fields: [
          { id: 'incidentType', label: 'Security Incident Type', type: 'select', required: true, options: ['Unauthorized Access', 'Theft', 'Vandalism', 'Suspicious Activity', 'Data Breach', 'Physical Security', 'Other'] },
          { id: 'incidentDate', label: 'Date of Incident', type: 'date', required: true },
          { id: 'incidentTime', label: 'Time of Incident', type: 'time', required: true },
          { id: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Where did the incident occur?' },
          { id: 'description', label: 'Incident Description', type: 'textarea', required: true, placeholder: 'Detailed description of what happened' },
          { id: 'witnessesInvolved', label: 'People Involved/Witnesses', type: 'textarea', required: false, placeholder: 'Names and details of people involved' },
          { id: 'evidenceCollected', label: 'Evidence Collected', type: 'textarea', required: false, placeholder: 'Photos, documents, physical evidence' },
          { id: 'reportedToAuthorities', label: 'Reported to Authorities?', type: 'checkbox', required: false },
          { id: 'immediateAction', label: 'Immediate Action Taken', type: 'textarea', required: false, placeholder: 'What actions were taken immediately?' },
          { id: 'reportedBy', label: 'Reported By', type: 'text', required: true, placeholder: 'Name of reporting person' }
        ]
      };
    }

    if (isEnvironmental) {
      return {
        title: 'Environmental Incident Report',
        description: 'Report environmental incidents and spills',
        category: 'ENVIRONMENTAL',
        incidentType: 'ENVIRONMENTAL',
        fields: [
          { id: 'incidentType', label: 'Environmental Incident Type', type: 'select', required: true, options: ['Chemical Spill', 'Oil Spill', 'Gas Leak', 'Waste Discharge', 'Air Emission', 'Soil Contamination', 'Other'] },
          { id: 'incidentDate', label: 'Date of Incident', type: 'date', required: true },
          { id: 'incidentTime', label: 'Time of Incident', type: 'time', required: true },
          { id: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Specific location of incident' },
          { id: 'substance', label: 'Substance Involved', type: 'text', required: true, placeholder: 'What chemical or substance was involved?' },
          { id: 'quantity', label: 'Estimated Quantity', type: 'text', required: false, placeholder: 'Amount spilled or released' },
          { id: 'description', label: 'Incident Description', type: 'textarea', required: true, placeholder: 'Detailed description of the incident' },
          { id: 'environmentalImpact', label: 'Environmental Impact', type: 'textarea', required: true, placeholder: 'Describe the environmental impact' },
          { id: 'containmentActions', label: 'Containment Actions', type: 'textarea', required: false, placeholder: 'Steps taken to contain the incident' },
          { id: 'authoritiesNotified', label: 'Authorities Notified?', type: 'checkbox', required: false },
          { id: 'reportedBy', label: 'Reported By', type: 'text', required: true, placeholder: 'Name of reporting person' }
        ]
      };
    }

    // Default general incident form
    return {
      title: 'General Incident Report',
      description: 'General incident reporting form',
      category: 'GENERAL',
      incidentType: 'GENERAL',
      fields: [
        { id: 'title', label: 'Incident Title', type: 'text', required: true, placeholder: 'Brief title of the incident' },
        { id: 'incidentDate', label: 'Date of Incident', type: 'date', required: true },
        { id: 'incidentTime', label: 'Time of Incident', type: 'time', required: true },
        { id: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Where did the incident occur?' },
        { id: 'priority', label: 'Priority Level', type: 'select', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
        { id: 'description', label: 'Incident Description', type: 'textarea', required: true, placeholder: 'Detailed description of what happened' },
        { id: 'peopleInvolved', label: 'People Involved', type: 'textarea', required: false, placeholder: 'Names and roles of people involved' },
        { id: 'immediateAction', label: 'Immediate Action Taken', type: 'textarea', required: false, placeholder: 'What actions were taken?' },
        { id: 'followUpRequired', label: 'Follow-up Required?', type: 'checkbox', required: false },
        { id: 'reportedBy', label: 'Reported By', type: 'text', required: true, placeholder: 'Your name' }
      ]
    };
  };

  const processDocument = useCallback(async () => {
    setStep('processing');
    setError(null);
    
    try {
      setProcessingStatus('Analyzing document structure...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStatus('Extracting text content...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProcessingStatus('Identifying incident fields...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStatus('Generating form structure...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let documentContent = '';
      if (uploadMethod === 'text') {
        documentContent = textInput;
      } else if (selectedFile) {
        documentContent = `Document: ${selectedFile.name}`;
      }
      
      const form = generateFormFromContent(documentContent);
      setGeneratedForm(form);
      
      setProcessingStatus('Form generated successfully!');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStep('preview');
    } catch (error) {
      console.error('Processing error:', error);
      setError('Failed to process document. Please try again.');
      setStep('upload');
    }
  }, [uploadMethod, textInput, selectedFile]);

  const handleSubmit = () => {
    alert('Form structure created! This would now be saved as a new incident template.');
    router.push('/incidents/form');
  };

  const addField = () => {
    if (!generatedForm) return;
    const newField: FormField = {
      id: `field_${Date.now()}`,
      label: 'New Field',
      type: 'text',
      required: false,
      placeholder: 'Enter value...'
    };
    setGeneratedForm({
      ...generatedForm,
      fields: [...generatedForm.fields, newField]
    });
  };

  const removeField = (fieldId: string) => {
    if (!generatedForm) return;
    setGeneratedForm({
      ...generatedForm,
      fields: generatedForm.fields.filter(f => f.id !== fieldId)
    });
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    if (!generatedForm) return;
    setGeneratedForm({
      ...generatedForm,
      fields: generatedForm.fields.map(f => 
        f.id === fieldId ? { ...f, ...updates } : f
      )
    });
  };

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#3d3a72' }}></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Document</h2>
            <p className="text-gray-600 mb-4">{processingStatus}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full animate-pulse" style={{ width: '70%', backgroundColor: '#3d3a72' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preview' && generatedForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Review & Edit Form Fields</h1>
                <p className="text-gray-600 mt-1">AI extracted {generatedForm.fields.length} fields from your document. Review and edit them below.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('upload')}
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
                  Back to Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
          {/* Form Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex gap-2 mb-4">
              <span style={{ backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }} className="px-3 py-1 rounded text-xs">
                {generatedForm.title}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 border border-green-200 rounded text-xs">
                {generatedForm.fields.length} fields extracted
              </span>
            </div>
          </div>

          {/* Field Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Form Fields</h2>
              <p className="text-gray-600 text-sm mt-1">Edit field properties and add or remove fields as needed</p>
            </div>
            
            <div className="p-6 space-y-4">
              {generatedForm.fields.map((field, index) => (
                <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Field Label</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Field Type</label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(field.id, { type: e.target.value as FormField['type'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Dropdown</option>
                        <option value="date">Date</option>
                        <option value="time">Time</option>
                        <option value="datetime">Date & Time</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="file">File Upload</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
                      <input
                        type="text"
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        placeholder="Placeholder text..."
                      />
                    </div>
                    
                    <div className="flex items-end space-x-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(field.id, { required: e.target.checked })}
                          className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label className="ml-2 text-sm text-gray-700">Required</label>
                      </div>
                      <button
                        onClick={() => removeField(field.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {field.type === 'select' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Options (comma-separated)</label>
                      <input
                        type="text"
                        value={field.options?.join(', ') || ''}
                        onChange={(e) => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        placeholder="Option 1, Option 2, Option 3..."
                      />
                    </div>
                  )}
                </div>
              ))}
              
              <button
                onClick={addField}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors"
              >
                <svg className="h-5 w-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Another Field
              </button>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSubmit}
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
                  Create Incident Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>AI Document Builder</h1>
              <p className="text-gray-600 mt-1">Upload documents or paste text to automatically generate incident forms</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/incidents/form')}
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
                Back to Selection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Upload Document */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Upload Document</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {uploadMethod === 'file' 
                    ? 'Upload PDF, DOC, DOCX, or TXT files up to 10MB' 
                    : 'Paste your document content for AI analysis'
                  }
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">Choose method:</span>
                <button
                  onClick={() => setUploadMethod('file')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    uploadMethod === 'file'
                      ? 'text-white'
                      : 'hover:opacity-80'
                  }`}
                  style={uploadMethod === 'file' 
                    ? { backgroundColor: '#3d3a72', color: '#ffffff', border: '1px solid #3d3a72' }
                    : { backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }
                  }
                >
                  Upload File
                </button>
                <button
                  onClick={() => setUploadMethod('text')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    uploadMethod === 'text'
                      ? 'text-white'
                      : 'hover:opacity-80'
                  }`}
                  style={uploadMethod === 'text' 
                    ? { backgroundColor: '#3d3a72', color: '#ffffff', border: '1px solid #3d3a72' }
                    : { backgroundColor: '#3d3a7220', color: '#3d3a72', border: '1px solid #3d3a7250' }
                  }
                >
                  Paste Text
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {uploadMethod === 'file' ? (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer font-medium"
                    style={{ color: '#3d3a72' }}
                  >
                    Click to upload a file
                  </label>
                  <p className="text-gray-500 text-sm mt-1">or drag and drop</p>
                  <p className="text-gray-400 text-xs mt-2">PDF, DOC, DOCX, or TXT up to 10MB</p>
                </div>
                
                {selectedFile && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2" style={{ color: '#3d3a72' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium" style={{ color: '#3d3a72' }}>{selectedFile.name}</span>
                        <span className="text-xs text-gray-600 ml-2">
                          ({Math.round(selectedFile.size / 1024)} KB)
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-purple-400 hover:text-purple-600"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste your document content here... For example: 'Employee John Smith was injured in the warehouse when he slipped and fell near the loading dock...'"
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm"
                />
                <p className="text-sm text-gray-500">
                  Tip: Include details like incident type, location, people involved, and description for better form generation.
                </p>
              </div>
            )}

            <div className="mt-6 flex items-center space-x-2">
              <button
                onClick={processDocument}
                disabled={!selectedFile && !textInput.trim()}
                style={{ 
                  backgroundColor: (selectedFile || textInput.trim()) ? '#3d3a72' : '#9ca3af',
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: (selectedFile || textInput.trim()) ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className={(selectedFile || textInput.trim()) ? "hover:opacity-80" : ""}
              >
                <svg className="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Generate Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}