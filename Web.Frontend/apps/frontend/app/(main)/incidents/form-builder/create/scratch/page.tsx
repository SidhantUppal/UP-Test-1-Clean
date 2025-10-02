'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'datetime' | 'time' | 'select' | 'radio' | 'checkbox' | 'file' | 'location' | 'person' | 'signature' | 'richtext' | 'section';
  label: string;
  placeholder?: string;
  required: boolean;
  helpText?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  options?: Array<{ value: string; label: string }>;
  conditional?: {
    showIf: string; // Field ID
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
  };
  width?: 'full' | 'half' | 'third';
  sectionTitle?: string; // For section type
  sectionDescription?: string;
}

interface FieldType {
  value: string;
  label: string;
  icon: React.ReactNode;
  category: 'basic' | 'advanced' | 'special';
}

const fieldTypes: FieldType[] = [
  // Basic Fields
  {
    value: 'text',
    label: 'Text Input',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    category: 'basic'
  },
  {
    value: 'textarea',
    label: 'Text Area',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>,
    category: 'basic'
  },
  {
    value: 'number',
    label: 'Number',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>,
    category: 'basic'
  },
  {
    value: 'select',
    label: 'Dropdown',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
    category: 'basic'
  },
  {
    value: 'radio',
    label: 'Radio Buttons',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} /><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={2} /></svg>,
    category: 'basic'
  },
  {
    value: 'checkbox',
    label: 'Checkboxes',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    category: 'basic'
  },
  // Date & Time
  {
    value: 'date',
    label: 'Date',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    category: 'advanced'
  },
  {
    value: 'datetime',
    label: 'Date & Time',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    category: 'advanced'
  },
  {
    value: 'time',
    label: 'Time',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    category: 'advanced'
  },
  // Special Fields
  {
    value: 'file',
    label: 'File Upload',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
    category: 'special'
  },
  {
    value: 'location',
    label: 'Location',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    category: 'special'
  },
  {
    value: 'person',
    label: 'Person Selector',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    category: 'special'
  },
  {
    value: 'signature',
    label: 'Signature',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    category: 'special'
  },
  {
    value: 'richtext',
    label: 'Rich Text Editor',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    category: 'special'
  },
  {
    value: 'section',
    label: 'Section Break',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>,
    category: 'special'
  }
];

export default function ScratchFormBuilder() {
  const router = useRouter();
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [category, setCategory] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [draggedField, setDraggedField] = useState<FieldType | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Add a new field
  const addField = useCallback((fieldType: FieldType) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: fieldType.value as FormField['type'],
      label: fieldType.label,
      required: false,
      width: 'full'
    };

    // Add default options for select/radio/checkbox
    if (['select', 'radio', 'checkbox'].includes(fieldType.value)) {
      newField.options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];
    }

    setFields([...fields, newField]);
    setSelectedField(newField.id);
  }, [fields]);

  // Update field properties
  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  }, [fields]);

  // Delete field
  const deleteField = useCallback((fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  }, [fields, selectedField]);

  // Handle drag start from palette
  const handleDragStartFromPalette = (e: React.DragEvent, fieldType: FieldType) => {
    setDraggedField(fieldType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Handle drag start from form
  const handleDragStartFromForm = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedField ? 'copy' : 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();

    if (draggedField) {
      // Adding new field from palette
      const newField: FormField = {
        id: `field_${Date.now()}`,
        type: draggedField.value as FormField['type'],
        label: draggedField.label,
        required: false,
        width: 'full'
      };

      if (['select', 'radio', 'checkbox'].includes(draggedField.value)) {
        newField.options = [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ];
      }

      const newFields = [...fields];
      if (targetIndex !== undefined) {
        newFields.splice(targetIndex, 0, newField);
      } else {
        newFields.push(newField);
      }
      setFields(newFields);
      setSelectedField(newField.id);
    } else if (draggedIndex !== null && targetIndex !== undefined && draggedIndex !== targetIndex) {
      // Reordering existing fields
      const newFields = [...fields];
      const [movedField] = newFields.splice(draggedIndex, 1);
      newFields.splice(targetIndex, 0, movedField);
      setFields(newFields);
    }

    setDraggedField(null);
    setDraggedIndex(null);
  };

  // Save form
  const saveForm = async (publish: boolean = false) => {
    if (!formTitle || fields.length === 0) {
      alert('Please provide a form title and add at least one field');
      return;
    }

    const formData = {
      title: formTitle,
      description: formDescription,
      incidentType,
      category,
      fields,
      status: publish ? 'published' : 'draft',
      createdAt: new Date().toISOString()
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
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Build Form from Scratch</h1>
            <p className="text-gray-600 mt-1">Design your custom incident form with drag-and-drop fields</p>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Field Palette */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Form Fields</h2>
            <p className="text-sm text-gray-600 mt-1">Drag fields to add them to your form</p>
          </div>

        <div className="p-4">
          {/* Basic Fields */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Fields</h3>
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.filter(ft => ft.category === 'basic').map(fieldType => (
                <div
                  key={fieldType.value}
                  draggable
                  onDragStart={(e) => handleDragStartFromPalette(e, fieldType)}
                  className="p-3 border border-gray-200 rounded-lg cursor-move hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-600 mb-1">{fieldType.icon}</div>
                    <span className="text-xs text-gray-700">{fieldType.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Time Fields */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Date & Time</h3>
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.filter(ft => ft.category === 'advanced').map(fieldType => (
                <div
                  key={fieldType.value}
                  draggable
                  onDragStart={(e) => handleDragStartFromPalette(e, fieldType)}
                  className="p-3 border border-gray-200 rounded-lg cursor-move hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-600 mb-1">{fieldType.icon}</div>
                    <span className="text-xs text-gray-700">{fieldType.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Fields */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Special Fields</h3>
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.filter(ft => ft.category === 'special').map(fieldType => (
                <div
                  key={fieldType.value}
                  draggable
                  onDragStart={(e) => handleDragStartFromPalette(e, fieldType)}
                  className="p-3 border border-gray-200 rounded-lg cursor-move hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-600 mb-1">{fieldType.icon}</div>
                    <span className="text-xs text-gray-700">{fieldType.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Panel - Form Builder */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Form Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Incident Category</label>
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
                placeholder="Describe when this form should be used..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Form Fields Area */}
          <div
            className={`min-h-[400px] bg-white rounded-lg shadow-sm border-2 ${
              fields.length === 0 ? 'border-dashed border-gray-300' : 'border-solid border-gray-200'
            } p-6`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, fields.length)}
          >
            {fields.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-lg font-medium">Drag fields here to build your form</p>
                <p className="text-sm mt-1">Start by dragging fields from the left panel</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={(e) => handleDragStartFromForm(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onClick={() => setSelectedField(field.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedField === field.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {field.type === 'section' ? (
                      <div className="border-b-2 border-gray-300 pb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{field.sectionTitle || 'Section Title'}</h3>
                        {field.sectionDescription && (
                          <p className="text-sm text-gray-600 mt-1">{field.sectionDescription}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.helpText && (
                          <p className="text-xs text-gray-500 mb-2">{field.helpText}</p>
                        )}
                        {/* Field Preview */}
                        <div className="pointer-events-none">
                          {field.type === 'text' && (
                            <input type="text" placeholder={field.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                          )}
                          {field.type === 'textarea' && (
                            <textarea placeholder={field.placeholder} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                          )}
                          {field.type === 'select' && (
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                              <option>Select an option</option>
                              {field.options?.map((opt, i) => (
                                <option key={i} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          )}
                          {field.type === 'radio' && (
                            <div className="space-y-2">
                              {field.options?.map((opt, i) => (
                                <label key={i} className="flex items-center">
                                  <input type="radio" name={field.id} className="mr-2" />
                                  <span className="text-sm">{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          {field.type === 'checkbox' && (
                            <div className="space-y-2">
                              {field.options?.map((opt, i) => (
                                <label key={i} className="flex items-center">
                                  <input type="checkbox" className="mr-2" />
                                  <span className="text-sm">{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
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
              Cancel
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => saveForm(false)}
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
        </div>
      </div>

      {/* Right Panel - Field Properties */}
      {selectedField && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Field Properties</h2>
              <button
                onClick={() => setSelectedField(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {(() => {
            const field = fields.find(f => f.id === selectedField);
            if (!field) return null;

            return (
              <div className="p-6 space-y-4">
                {/* Field Label */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Section-specific fields */}
                {field.type === 'section' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={field.sectionTitle || ''}
                        onChange={(e) => updateField(field.id, { sectionTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
                      <textarea
                        value={field.sectionDescription || ''}
                        onChange={(e) => updateField(field.id, { sectionDescription: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

                {/* Regular field properties */}
                {field.type !== 'section' && (
                  <>
                    {/* Placeholder */}
                    {['text', 'textarea', 'number'].includes(field.type) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
                        <input
                          type="text"
                          value={field.placeholder || ''}
                          onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    )}

                    {/* Help Text */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Help Text</label>
                      <input
                        type="text"
                        value={field.helpText || ''}
                        onChange={(e) => updateField(field.id, { helpText: e.target.value })}
                        placeholder="Additional instructions..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    {/* Required */}
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(field.id, { required: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Required field</span>
                      </label>
                    </div>

                    {/* Width */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Field Width</label>
                      <select
                        value={field.width || 'full'}
                        onChange={(e) => updateField(field.id, { width: e.target.value as FormField['width'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="full">Full Width</option>
                        <option value="half">Half Width</option>
                        <option value="third">One Third</option>
                      </select>
                    </div>

                    {/* Options for select/radio/checkbox */}
                    {['select', 'radio', 'checkbox'].includes(field.type) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                        <div className="space-y-2">
                          {field.options?.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => {
                                  const newOptions = [...(field.options || [])];
                                  newOptions[index].label = e.target.value;
                                  updateField(field.id, { options: newOptions });
                                }}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() => {
                                  const newOptions = field.options?.filter((_, i) => i !== index);
                                  updateField(field.id, { options: newOptions });
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newOptions = [
                                ...(field.options || []),
                                { value: `option${(field.options?.length || 0) + 1}`, label: `Option ${(field.options?.length || 0) + 1}` }
                              ];
                              updateField(field.id, { options: newOptions });
                            }}
                            className="text-sm hover:opacity-80"
                            style={{ color: '#3d3a72' }}
                          >
                            + Add Option
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Delete Field */}
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => deleteField(field.id)}
                        style={{ 
                          backgroundColor: '#e77726', 
                          color: '#ffffff', 
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'opacity 0.2s',
                          width: '100%'
                        }}
                        className="hover:opacity-80"
                      >
                        Delete Field
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })()}
        </div>
      )}
      </div>
    </div>
  );
}