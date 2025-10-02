'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface FieldOption {
  value: string;
  label: string;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'time' | 'datetime' | 'number' | 'email' | 'tel' | 'file';
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: FieldOption[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface FormTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  fields: FormField[];
}

// Template data based on real incident forms from your system
const getTemplateById = (id: string): FormTemplate | null => {
  const templates: { [key: string]: FormTemplate } = {
    // Near Miss template based on your actual form
    'near-miss': {
      id: 'near-miss',
      title: 'Near Miss Report',
      description: 'Report incidents that could have caused harm with detailed witness and reporter information',
      category: 'SAFETY',
      categoryLabel: 'Safety & Health',
      fields: [
        {
          id: 'incident_date',
          label: 'Incident Date',
          type: 'date',
          required: true,
          description: 'When did the near miss occur?'
        },
        {
          id: 'incident_time',
          label: 'Incident Time',
          type: 'time',
          required: true,
          description: 'What time did the near miss occur?'
        },
        {
          id: 'reporter_relationship',
          label: 'Reporter Relationship to Company',
          type: 'select',
          required: true,
          options: [
            { value: 'Employee', label: 'Employee' },
            { value: 'Contractor', label: 'Contractor' },
            { value: 'Visitor', label: 'Visitor' },
            { value: 'Client/Customer', label: 'Client/Customer' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          id: 'reporter_first_name',
          label: 'Reporter First Name',
          type: 'text',
          required: true,
          placeholder: 'First name'
        },
        {
          id: 'reporter_last_name',
          label: 'Reporter Last Name',
          type: 'text',
          required: true,
          placeholder: 'Last name'
        },
        {
          id: 'reporter_job_title',
          label: 'Reporter Job Title',
          type: 'text',
          required: false,
          placeholder: 'Job title (if appropriate)'
        },
        {
          id: 'reporter_phone',
          label: 'Reporter Phone Number',
          type: 'tel',
          required: false,
          placeholder: 'Phone number'
        },
        {
          id: 'reporter_email',
          label: 'Reporter Email',
          type: 'email',
          required: false,
          placeholder: 'Email address'
        },
        {
          id: 'witness_exists',
          label: 'Was there a witness to this incident?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          id: 'incident_location',
          label: 'Location of Near Miss',
          type: 'text',
          required: true,
          placeholder: 'Specify the exact location where the near miss occurred'
        },
        {
          id: 'what_happened',
          label: 'What Happened?',
          type: 'textarea',
          required: true,
          placeholder: 'Describe in detail what happened during the near miss incident...'
        },
        {
          id: 'outcome',
          label: 'What was the outcome?',
          type: 'textarea',
          required: false,
          placeholder: 'Describe the actual outcome of the incident...'
        },
        {
          id: 'actions_taken',
          label: 'Details of actions taken',
          type: 'textarea',
          required: false,
          placeholder: 'Describe any immediate actions that were taken following the incident...'
        },
        {
          id: 'potential_accident_type',
          label: 'What type of accident might have happened?',
          type: 'select',
          required: false,
          options: [
            { value: 'Another kind of accident', label: 'Another kind of accident' },
            { value: 'Contact with electricity or electrical discharge', label: 'Contact with electricity or electrical discharge' },
            { value: 'Contact with machinery or material', label: 'Contact with machinery or material' },
            { value: 'Fell from height', label: 'Fell from height' },
            { value: 'Slip, trip or fell on the same level', label: 'Slip, trip or fell on the same level' },
            { value: 'Struck by a moving, flying or falling object', label: 'Struck by a moving, flying or falling object' },
            { value: 'Exposed to fire', label: 'Exposed to fire' },
            { value: 'Exposed to explosion', label: 'Exposed to explosion' }
          ]
        }
      ]
    },
    
    // Accident Book template based on your actual form
    'accident-book': {
      id: 'accident-book',
      title: 'Accident Book Record',
      description: 'Detailed accident recording with injury details, body part picker, and first aid information',
      category: 'SAFETY',
      categoryLabel: 'Safety & Health',
      fields: [
        {
          id: 'incident_date',
          label: 'Date of Incident',
          type: 'date',
          required: true
        },
        {
          id: 'incident_time',
          label: 'Time of Incident',
          type: 'time',
          required: true
        },
        {
          id: 'incident_location',
          label: 'Location of Incident',
          type: 'text',
          required: true,
          placeholder: 'Specify the exact location'
        },
        {
          id: 'company_name',
          label: 'Company Name',
          type: 'text',
          required: true,
          placeholder: 'Name of company'
        },
        {
          id: 'person_relationship',
          label: 'Person\'s Relationship to Company',
          type: 'select',
          required: true,
          options: [
            { value: 'Employee', label: 'Employee' },
            { value: 'Contractor', label: 'Contractor' },
            { value: 'Visitor', label: 'Visitor' },
            { value: 'Client/Customer', label: 'Client/Customer' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          id: 'person_first_name',
          label: 'First Name of Injured Person',
          type: 'text',
          required: true,
          placeholder: 'First name'
        },
        {
          id: 'person_last_name',
          label: 'Last Name of Injured Person',
          type: 'text',
          required: true,
          placeholder: 'Last name'
        },
        {
          id: 'person_job_title',
          label: 'Job Title',
          type: 'text',
          required: false,
          placeholder: 'Job title (if appropriate)'
        },
        {
          id: 'accident_description',
          label: 'Description of Accident',
          type: 'textarea',
          required: true,
          placeholder: 'Describe what happened in detail...'
        },
        {
          id: 'injury_type',
          label: 'Type of Injury',
          type: 'select',
          required: false,
          options: [
            { value: 'Cut', label: 'Cut' },
            { value: 'Bruise', label: 'Bruise' },
            { value: 'Sprain', label: 'Sprain' },
            { value: 'Burn', label: 'Burn' },
            { value: 'Fracture', label: 'Fracture' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          id: 'injured_body_part',
          label: 'Injured Body Part(s)',
          type: 'checkbox',
          required: false,
          options: [
            { value: 'head', label: 'Head' },
            { value: 'neck', label: 'Neck' },
            { value: 'back', label: 'Back' },
            { value: 'chest', label: 'Chest' },
            { value: 'arm_left', label: 'Left Arm' },
            { value: 'arm_right', label: 'Right Arm' },
            { value: 'leg_left', label: 'Left Leg' },
            { value: 'leg_right', label: 'Right Leg' }
          ]
        },
        {
          id: 'first_aid_applied',
          label: 'Was first aid applied?',
          type: 'radio',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          id: 'first_aider_name',
          label: 'Name of First Aider',
          type: 'text',
          required: false,
          placeholder: 'Name of person who provided first aid'
        },
        {
          id: 'witness_exists',
          label: 'Were there witnesses?',
          type: 'radio',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    },
    
    // High Potential (Wobble) template - simplified quick form
    'wobble': {
      id: 'wobble',
      title: 'High Potential Incident (Wobble)',
      description: 'Quick incident reporting for minor incidents and high potential near misses',
      category: 'SAFETY',
      categoryLabel: 'Safety & Health',
      fields: [
        {
          id: 'incident_date',
          label: 'Date of Incident',
          type: 'date',
          required: true
        },
        {
          id: 'incident_time',
          label: 'Time of Incident',
          type: 'time',
          required: true
        },
        {
          id: 'location',
          label: 'Location',
          type: 'text',
          required: true,
          placeholder: 'Where did this occur?'
        },
        {
          id: 'description',
          label: 'What Happened?',
          type: 'textarea',
          required: true,
          placeholder: 'Brief description of the incident...'
        },
        {
          id: 'potential_severity',
          label: 'Potential Severity',
          type: 'select',
          required: true,
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'very_high', label: 'Very High' }
          ]
        },
        {
          id: 'immediate_action',
          label: 'Immediate Action Taken',
          type: 'textarea',
          required: false,
          placeholder: 'What immediate actions were taken?'
        }
      ]
    },
    
    // Road Traffic template
    'road-traffic': {
      id: 'road-traffic',
      title: 'Road Traffic Incident',
      description: 'Vehicle and road traffic incident reports with driver and vehicle information',
      category: 'SAFETY',
      categoryLabel: 'Safety & Health',
      fields: [
        {
          id: 'incident_date',
          label: 'Date of Incident',
          type: 'date',
          required: true
        },
        {
          id: 'incident_time',
          label: 'Time of Incident',
          type: 'time',
          required: true
        },
        {
          id: 'location',
          label: 'Location of Incident',
          type: 'text',
          required: true,
          placeholder: 'Road, street, or specific location'
        },
        {
          id: 'vehicle_registration',
          label: 'Vehicle Registration',
          type: 'text',
          required: false,
          placeholder: 'Registration number'
        },
        {
          id: 'driver_name',
          label: 'Driver Name',
          type: 'text',
          required: false,
          placeholder: 'Name of driver involved'
        },
        {
          id: 'other_vehicles',
          label: 'Other Vehicles Involved',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          id: 'injuries',
          label: 'Were there injuries?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          id: 'police_called',
          label: 'Were police called?',
          type: 'radio',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          id: 'incident_description',
          label: 'Description of Incident',
          type: 'textarea',
          required: true,
          placeholder: 'Describe what happened...'
        }
      ]
    }
  };
  
  return templates[id] || null;
};

const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select', label: 'Dropdown' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'datetime', label: 'Date & Time' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'file', label: 'File Upload' }
];

export default function TemplateEditorPage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params.templateId as string;
  
  const [template, setTemplate] = useState<FormTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showAddField, setShowAddField] = useState(false);
  const [draggedFieldId, setDraggedFieldId] = useState<string | null>(null);
  const [dropZoneIndex, setDropZoneIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate loading template data
    setTimeout(() => {
      const templateData = getTemplateById(templateId);
      setTemplate(templateData);
      setLoading(false);
    }, 500);
  }, [templateId]);

  const handleFieldUpdate = (fieldId: string, updatedField: Partial<FormField>) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      fields: template.fields.map(field => 
        field.id === fieldId ? { ...field, ...updatedField } : field
      )
    });
  };

  const handleFieldDelete = (fieldId: string) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      fields: template.fields.filter(field => field.id !== fieldId)
    });
  };

  const handleAddField = (newField: FormField) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      fields: [...template.fields, newField]
    });
    setShowAddField(false);
  };

  const handleSaveTemplate = () => {
    // In a real app, this would save to the backend
    console.log('Saving template:', template);
    alert('Template saved successfully!');
    router.push('/incidents/form-builder/templates');
  };

  const handleDragStart = (e: React.DragEvent, fieldId: string) => {
    setDraggedFieldId(fieldId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedFieldId(null);
    setDropZoneIndex(null);
  };

  const handleDropZoneDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropZoneIndex(index);
  };

  const handleDropZoneDragLeave = (e: React.DragEvent) => {
    // Only clear if we're leaving the drop zone completely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDropZoneIndex(null);
    }
  };

  const handleDropZoneDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedFieldId || !template) {
      setDraggedFieldId(null);
      setDropZoneIndex(null);
      return;
    }

    const fields = [...template.fields];
    const draggedIndex = fields.findIndex(field => field.id === draggedFieldId);
    
    if (draggedIndex === -1) {
      setDraggedFieldId(null);
      setDropZoneIndex(null);
      return;
    }

    // Remove dragged field
    const [draggedField] = fields.splice(draggedIndex, 1);
    
    // Adjust target index if dragged from before target
    const adjustedTargetIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
    
    // Insert at target position
    fields.splice(adjustedTargetIndex, 0, draggedField);

    setTemplate({
      ...template,
      fields
    });
    
    setDraggedFieldId(null);
    setDropZoneIndex(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Template Not Found</h2>
          <p className="text-gray-600 mb-4">The requested template could not be found.</p>
          <button 
            onClick={() => router.push('/incidents/form-builder/templates')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Edit Template</h1>
              <p className="text-gray-600 mt-1">
                Customize "{template.title}" to fit your organization's needs
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/incidents/form-builder/templates')}
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
              <button
                onClick={handleSaveTemplate}
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
                Save Template
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Fields */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Form Fields</h2>
                  <button
                    onClick={() => setShowAddField(true)}
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
                    + Add Field
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {template.fields.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No fields yet. Add your first field to get started.
                  </div>
                ) : (
                  <>
                    {/* Drop zone before first field */}
                    <div
                      className={`h-2 transition-all duration-200 ${
                        dropZoneIndex === 0 ? 'bg-purple-200 rounded mb-2' : 'mb-1'
                      }`}
                      onDragOver={(e) => handleDropZoneDragOver(e, 0)}
                      onDragLeave={handleDropZoneDragLeave}
                      onDrop={(e) => handleDropZoneDrop(e, 0)}
                    >
                      {dropZoneIndex === 0 && (
                        <div className="h-full bg-purple-500 rounded flex items-center justify-center">
                          <div className="text-xs text-white font-medium">Insert here</div>
                        </div>
                      )}
                    </div>

                    {template.fields.map((field, index) => (
                      <div key={field.id}>
                        <FieldEditor
                          field={field}
                          index={index}
                          isEditing={editingField === field.id}
                          isDragging={draggedFieldId === field.id}
                          onEdit={() => setEditingField(field.id)}
                          onSave={(updatedField) => {
                            handleFieldUpdate(field.id, updatedField);
                            setEditingField(null);
                          }}
                          onCancel={() => setEditingField(null)}
                          onDelete={() => handleFieldDelete(field.id)}
                          onDragStart={(e) => handleDragStart(e, field.id)}
                          onDragEnd={handleDragEnd}
                        />

                        {/* Drop zone after each field */}
                        <div
                          className={`h-2 transition-all duration-200 ${
                            dropZoneIndex === index + 1 ? 'bg-purple-200 rounded my-2' : 'my-1'
                          }`}
                          onDragOver={(e) => handleDropZoneDragOver(e, index + 1)}
                          onDragLeave={handleDropZoneDragLeave}
                          onDrop={(e) => handleDropZoneDrop(e, index + 1)}
                        >
                          {dropZoneIndex === index + 1 && (
                            <div className="h-full bg-purple-500 rounded flex items-center justify-center">
                              <div className="text-xs text-white font-medium">Insert here</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Template Info</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                  <input
                    type="text"
                    value={template.title}
                    onChange={(e) => setTemplate({...template, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={template.description}
                    onChange={(e) => setTemplate({...template, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    template.category === 'SAFETY' ? 'bg-red-100 text-red-800' :
                    template.category === 'OPERATIONS' ? 'bg-orange-100 text-orange-800' :
                    template.category === 'SECURITY' ? 'bg-purple-100 text-purple-800' :
                    template.category === 'HR_COMPLIANCE' ? 'bg-blue-100 text-blue-800' :
                    template.category === 'ENVIRONMENTAL' ? 'bg-green-100 text-green-800' :
                    template.category === 'QUALITY' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {template.categoryLabel}
                  </span>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <h4 className="text-lg font-semibold mb-2">Fields Count</h4>
                  <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{template.fields.length}</p>
                  <p className="text-sm text-gray-500 mt-1">total fields</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Field Modal */}
      {showAddField && (
        <AddFieldModal
          onAdd={handleAddField}
          onCancel={() => setShowAddField(false)}
        />
      )}
    </div>
  );
}

// Field Editor Component
function FieldEditor({ 
  field, 
  index, 
  isEditing,
  isDragging,
  onEdit, 
  onSave, 
  onCancel, 
  onDelete,
  onDragStart,
  onDragEnd
}: {
  field: FormField;
  index: number;
  isEditing: boolean;
  isDragging: boolean;
  onEdit: () => void;
  onSave: (field: Partial<FormField>) => void;
  onCancel: () => void;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}) {
  const [editedField, setEditedField] = useState(field);

  const handleSave = () => {
    onSave(editedField);
  };

  if (isEditing) {
    return (
      <div className="border border-purple-300 rounded-lg p-4 bg-purple-50">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
              <input
                type="text"
                value={editedField.label}
                onChange={(e) => setEditedField({...editedField, label: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
              <select
                value={editedField.type}
                onChange={(e) => setEditedField({...editedField, type: e.target.value as FormField['type']})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {FIELD_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <input
              type="text"
              value={editedField.description || ''}
              onChange={(e) => setEditedField({...editedField, description: e.target.value})}
              placeholder="Help text for users"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`required-${field.id}`}
              checked={editedField.required}
              onChange={(e) => setEditedField({...editedField, required: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor={`required-${field.id}`} className="text-sm text-gray-700">
              Required field
            </label>
          </div>
          
          {(editedField.type === 'select' || editedField.type === 'radio' || editedField.type === 'checkbox') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              <OptionsEditor
                options={editedField.options || []}
                onChange={(options) => setEditedField({...editedField, options})}
              />
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
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
            <button
              onClick={handleSave}
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
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
      draggable={!isEditing}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div 
              className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
              style={{ cursor: isEditing ? 'not-allowed' : 'grab' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2" />
              </svg>
            </div>
            <div className="text-sm text-gray-500 font-mono w-8">#{index + 1}</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-900">{field.label}</h4>
              {field.required && (
                <span className="text-red-500 text-sm">*</span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {FIELD_TYPES.find(t => t.value === field.type)?.label}
              {field.description && ` • ${field.description}`}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            style={{ 
              borderRadius: '6px'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            style={{ 
              borderRadius: '6px'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Options Editor Component
function OptionsEditor({ 
  options, 
  onChange 
}: { 
  options: FieldOption[]; 
  onChange: (options: FieldOption[]) => void; 
}) {
  const addOption = () => {
    onChange([...options, { value: '', label: '' }]);
  };

  const updateOption = (index: number, field: keyof FieldOption, value: string) => {
    const updated = options.map((opt, i) => 
      i === index ? { ...opt, [field]: value } : opt
    );
    onChange(updated);
  };

  const removeOption = (index: number) => {
    onChange(options.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={option.value}
            onChange={(e) => updateOption(index, 'value', e.target.value)}
            placeholder="Value"
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <input
            type="text"
            value={option.label}
            onChange={(e) => updateOption(index, 'label', e.target.value)}
            placeholder="Display Text"
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={() => removeOption(index)}
            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={addOption}
        className="text-sm text-blue-600 hover:text-blue-700"
      >
        + Add Option
      </button>
    </div>
  );
}

// Add Field Modal Component
function AddFieldModal({ 
  onAdd, 
  onCancel 
}: { 
  onAdd: (field: FormField) => void; 
  onCancel: () => void; 
}) {
  const [newField, setNewField] = useState<FormField>({
    id: `field_${Date.now()}`,
    label: '',
    type: 'text',
    required: false,
    options: []
  });

  const handleAdd = () => {
    if (!newField.label.trim()) return;
    onAdd(newField);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Field</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
            <input
              type="text"
              value={newField.label}
              onChange={(e) => setNewField({...newField, label: e.target.value})}
              placeholder="Enter field label"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
            <select
              value={newField.type}
              onChange={(e) => setNewField({...newField, type: e.target.value as FormField['type']})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {FIELD_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="new-required"
              checked={newField.required}
              onChange={(e) => setNewField({...newField, required: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="new-required" className="text-sm text-gray-700">
              Required field
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
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
          <button
            onClick={handleAdd}
            disabled={!newField.label.trim()}
            style={{ 
              backgroundColor: !newField.label.trim() ? '#9CA3AF' : '#3d3a72', 
              color: '#ffffff', 
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: !newField.label.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              transition: 'opacity 0.2s'
            }}
            className={!newField.label.trim() ? '' : 'hover:opacity-80'}
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}