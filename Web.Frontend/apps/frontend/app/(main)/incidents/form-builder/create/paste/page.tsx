'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

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

interface ParsedForm {
  title: string;
  fields: FormField[];
  sections: Array<{
    title: string;
    fields: FormField[];
  }>;
}

const sampleFormats = {
  numbered: `1. What is the date and time of the incident?
2. Where did the incident occur?
3. What type of incident was it?
   - Accident
   - Near Miss
   - Property Damage
   - Other
4. Describe what happened:
5. Were there any injuries? (Yes/No)
6. Names of witnesses:`,
  
  checkboxes: `Safety Inspection Checklist:
□ Emergency exits are clear and accessible
□ Fire extinguishers are properly maintained
□ First aid kit is stocked and accessible
□ Safety signage is visible and in good condition
□ Personal protective equipment is available
□ Electrical hazards have been addressed
□ Slip, trip, and fall hazards removed`,
  
  structured: `INCIDENT REPORT FORM

Section 1: Basic Information
- Date of Incident: ___________
- Time of Incident: ___________
- Location: ___________
- Reported By: ___________

Section 2: Incident Details
- Type of Incident: [Dropdown: Injury/Illness/Property Damage/Near Miss]
- Description of Incident: [Text Area]
- Immediate Actions Taken: [Text Area]

Section 3: Follow-up
- Investigation Required? [Yes/No]
- Corrective Actions: [Text Area]
- Date Completed: ___________`,

  word: `Employee Name: _______________________  Date: __________
Department: _______________________     Supervisor: __________

1. Type of Hazard Observed:
   ☐ Chemical    ☐ Physical    ☐ Biological    ☐ Ergonomic    ☐ Other: _______

2. Location of Hazard: _______________________

3. Description of Hazard:
_________________________________________________________________
_________________________________________________________________

4. Potential Consequences:
_________________________________________________________________

5. Recommended Corrective Action:
_________________________________________________________________

Signature: _______________________  Date: __________`
};

export default function PasteFormBuilder() {
  const router = useRouter();
  const [pastedText, setPastedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState('');
  const [parsedForm, setParsedForm] = useState<ParsedForm | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  
  // Form settings
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [category, setCategory] = useState('');
  const [incidentType, setIncidentType] = useState('');
  
  // Parse settings
  const [parseSettings, setParseSettings] = useState({
    autoDetectFormat: true,
    treatNumbersAsFields: true,
    detectSections: true,
    inferFieldTypes: true,
    cleanFormatting: true
  });

  const processText = async () => {
    if (!pastedText.trim()) {
      setProcessingError('Please paste some form content to process');
      return;
    }

    setIsProcessing(true);
    setProcessingError('');

    try {
      // Simulate text processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock parsed form data based on the pasted text
      const mockParsedForm: ParsedForm = {
        title: formTitle || 'Incident Report Form',
        fields: [],
        sections: []
      };

      // Simple parsing logic for demonstration
      const lines = pastedText.split('\n').filter(line => line.trim());
      let currentSection = { title: 'General Information', fields: [] as FormField[] };
      let fieldOrder = 1;

      lines.forEach((line, index) => {
        // Detect sections
        if (line.includes('Section') || line.endsWith(':') && !line.includes('?')) {
          if (currentSection.fields.length > 0) {
            mockParsedForm.sections.push(currentSection);
          }
          currentSection = { title: line.replace(':', '').trim(), fields: [] };
          return;
        }

        // Detect fields
        let field: FormField | null = null;

        // Numbered questions
        if (/^\d+\./.test(line)) {
          field = {
            id: `field_${fieldOrder++}`,
            type: line.includes('?') && (line.includes('Yes/No') || line.includes('(Y/N)')) ? 'radio' : 'text',
            label: line.replace(/^\d+\.\s*/, '').replace(/[_:?]*$/, '').trim(),
            required: true,
            order: fieldOrder
          };
        }
        // Checkbox items
        else if (/^[□☐]\s/.test(line)) {
          field = {
            id: `field_${fieldOrder++}`,
            type: 'checkbox',
            label: line.replace(/^[□☐]\s*/, '').trim(),
            required: false,
            order: fieldOrder
          };
        }
        // Fields with underscores or colons
        else if (line.includes('___') || (line.includes(':') && line.indexOf(':') < 50)) {
          const label = line.split(/[_:]/)[0].trim();
          if (label) {
            field = {
              id: `field_${fieldOrder++}`,
              type: 'text',
              label: label,
              required: true,
              order: fieldOrder
            };

            // Infer field types
            if (label.toLowerCase().includes('date')) field.type = 'date';
            else if (label.toLowerCase().includes('time')) field.type = 'time';
            else if (label.toLowerCase().includes('email')) field.type = 'email';
            else if (label.toLowerCase().includes('phone') || label.toLowerCase().includes('tel')) field.type = 'tel';
            else if (label.toLowerCase().includes('number') || label.toLowerCase().includes('amount')) field.type = 'number';
            else if (label.toLowerCase().includes('description') || label.toLowerCase().includes('details')) field.type = 'textarea';
            else if (label.toLowerCase().includes('signature')) field.type = 'signature';
          }
        }

        if (field) {
          // Check for options in the next few lines
          if (index < lines.length - 1) {
            const nextLines = lines.slice(index + 1, index + 6);
            const options: Array<{ value: string; label: string }> = [];
            
            for (const nextLine of nextLines) {
              if (/^[\s-•☐□]\s*/.test(nextLine) && !nextLine.includes(':')) {
                const optionText = nextLine.replace(/^[\s-•☐□]\s*/, '').trim();
                if (optionText) {
                  options.push({
                    value: optionText.toLowerCase().replace(/\s+/g, '_'),
                    label: optionText
                  });
                }
              } else {
                break;
              }
            }

            if (options.length > 0) {
              field.type = options.length > 4 ? 'select' : 'radio';
              field.options = options;
            }
          }

          currentSection.fields.push(field);
        }
      });

      // Add the last section
      if (currentSection.fields.length > 0) {
        mockParsedForm.sections.push(currentSection);
      }

      // If no sections were created, put all fields in one section
      if (mockParsedForm.sections.length === 0 && mockParsedForm.fields.length === 0) {
        mockParsedForm.sections = [{
          title: 'Form Fields',
          fields: currentSection.fields
        }];
      }

      setParsedForm(mockParsedForm);
      setShowEditor(true);
      
    } catch (error: any) {
      console.error('Processing error:', error);
      setProcessingError('Failed to parse the form. Please check the format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const updateField = useCallback((sectionIndex: number, fieldIndex: number, updates: Partial<FormField>) => {
    if (!parsedForm) return;
    
    const newForm = { ...parsedForm };
    newForm.sections[sectionIndex].fields[fieldIndex] = {
      ...newForm.sections[sectionIndex].fields[fieldIndex],
      ...updates
    };
    setParsedForm(newForm);
  }, [parsedForm]);

  const deleteField = useCallback((sectionIndex: number, fieldIndex: number) => {
    if (!parsedForm) return;
    
    const newForm = { ...parsedForm };
    newForm.sections[sectionIndex].fields.splice(fieldIndex, 1);
    setParsedForm(newForm);
  }, [parsedForm]);

  const saveForm = async (publish: boolean = false) => {
    if (!parsedForm) return;

    const formData = {
      title: formTitle || parsedForm.title,
      description: formDescription,
      category,
      incidentType,
      sections: parsedForm.sections,
      status: publish ? 'published' : 'draft',
      createdAt: new Date().toISOString(),
      sourceType: 'paste'
    };

    console.log('Saving form:', formData);
    // TODO: API call to save form
    
    router.push('/incidents/form-builder');
  };

  const loadSample = (format: keyof typeof sampleFormats) => {
    setPastedText(sampleFormats[format]);
    setProcessingError('');
    setParsedForm(null);
    setShowEditor(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Copy & Paste Form Builder</h1>
            <p className="text-gray-600 mt-1">Paste an existing form and convert it into a digital incident report</p>
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
              placeholder="e.g., Hazard Report Form"
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

        {/* Paste Section */}
        {!showEditor && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Paste Your Form</h2>
              <p className="text-sm text-gray-600 mt-1">Copy and paste your form from Word, Excel, PDF, or any text source</p>
            </div>
            
            {/* Sample Format Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => loadSample('numbered')}
                className="text-sm px-3 py-1 rounded hover:opacity-80"
                style={{ color: '#3d3a72', backgroundColor: 'rgba(61, 58, 114, 0.1)' }}
              >
                Load Numbered Sample
              </button>
              <button
                onClick={() => loadSample('checkboxes')}
                className="text-sm px-3 py-1 rounded hover:opacity-80"
                style={{ color: '#3d3a72', backgroundColor: 'rgba(61, 58, 114, 0.1)' }}
              >
                Load Checklist Sample
              </button>
              <button
                onClick={() => loadSample('structured')}
                className="text-sm px-3 py-1 rounded hover:opacity-80"
                style={{ color: '#3d3a72', backgroundColor: 'rgba(61, 58, 114, 0.1)' }}
              >
                Load Structured Sample
              </button>
            </div>
          </div>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder={`Paste your form here. We support various formats:

• Numbered lists (1. Question one)
• Checkboxes (□ Item to check)
• Fields with underscores (Name: __________)
• Sections and categories
• Multiple choice questions
• And more...

The AI will intelligently parse your form and convert it into a digital format.`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
            rows={16}
          />

          {/* Parse Settings */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Parse Settings</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={parseSettings.autoDetectFormat}
                  onChange={(e) => setParseSettings(prev => ({ ...prev, autoDetectFormat: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Auto-detect format</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={parseSettings.treatNumbersAsFields}
                  onChange={(e) => setParseSettings(prev => ({ ...prev, treatNumbersAsFields: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Numbers as fields</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={parseSettings.detectSections}
                  onChange={(e) => setParseSettings(prev => ({ ...prev, detectSections: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Detect sections</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={parseSettings.inferFieldTypes}
                  onChange={(e) => setParseSettings(prev => ({ ...prev, inferFieldTypes: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Smart field types</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={parseSettings.cleanFormatting}
                  onChange={(e) => setParseSettings(prev => ({ ...prev, cleanFormatting: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Clean formatting</span>
              </label>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Supported Formats:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-800">
              <div>• Word forms</div>
              <div>• Excel sheets</div>
              <div>• PDF text</div>
              <div>• ChatGPT/Claude</div>
              <div>• Numbered lists</div>
              <div>• Checklists</div>
              <div>• Surveys</div>
              <div>• Plain text</div>
            </div>
          </div>

          {/* Process Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={processText}
              disabled={isProcessing || !pastedText.trim()}
              style={{ 
                backgroundColor: isProcessing || !pastedText.trim() ? '#9ca3af' : '#3d3a72',
                color: '#ffffff', 
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: isProcessing || !pastedText.trim() ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              className={!isProcessing && pastedText.trim() ? "hover:opacity-80" : ""}
            >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Parse Form</span>
            )}
            </button>
          </div>

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
      )}

        {/* Parsed Form Editor */}
        {showEditor && parsedForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Parsed Form Fields</h2>
              <p className="text-sm text-gray-600 mt-1">Review and edit the parsed form structure</p>
            </div>
            <button
              onClick={() => {
                setShowEditor(false);
                setParsedForm(null);
                setPastedText('');
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

          {/* Parse Summary */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-green-800">
                Successfully parsed {parsedForm.sections.reduce((acc, s) => acc + s.fields.length, 0)} fields 
                in {parsedForm.sections.length} sections
              </span>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            {parsedForm.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>

                <div className="space-y-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div
                      key={field.id}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
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
                              <option value="time">Time</option>
                              <option value="datetime">Date & Time</option>
                              <option value="email">Email</option>
                              <option value="tel">Phone</option>
                              <option value="select">Dropdown</option>
                              <option value="radio">Radio Buttons</option>
                              <option value="checkbox">Checkbox</option>
                              <option value="file">File Upload</option>
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
                </div>
              </div>
            ))}
          </div>

            {/* Save Actions */}
            <div className="mt-6 flex justify-end space-x-2">
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