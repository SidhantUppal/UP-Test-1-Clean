'use client';

import React, { useState } from 'react';

interface IncidentField {
  id: string;
  type: 'text' | 'textarea' | 'date' | 'datetime' | 'time' | 'select' | 'radio' | 'checkbox' | 'number' | 'email' | 'phone' | 'location' | 'person' | 'file' | 'signature' | 'severity' | 'incident-type';
  label: string;
  placeholder?: string;
  required: boolean;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  order: number;
  section: string;
}

interface IncidentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formTitle: string;
  formDescription: string;
  category: string;
  fields: IncidentField[];
}

export default function IncidentPreviewModal({
  isOpen,
  onClose,
  formTitle,
  formDescription,
  category,
  fields
}: IncidentPreviewModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  if (!isOpen) return null;

  // Group fields by section
  const fieldsBySection = fields.reduce((acc, field) => {
    const section = field.section || 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {} as Record<string, IncidentField[]>);

  // Sort sections by the order of first field in each section
  const sortedSections = Object.entries(fieldsBySection).sort(([, fieldsA], [, fieldsB]) => {
    const minOrderA = Math.min(...fieldsA.map(f => f.order));
    const minOrderB = Math.min(...fieldsB.map(f => f.order));
    return minOrderA - minOrderB;
  });

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const renderField = (field: IncidentField) => {
    const fieldValue = formData[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <input
            type={field.type}
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input) {
                  input.showPicker?.();
                }
              }}
            />
          </div>
        );

      case 'datetime':
        return (
          <div className="relative">
            <input
              type="datetime-local"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input) {
                  input.showPicker?.();
                }
              }}
            />
          </div>
        );

      case 'time':
        return (
          <div className="relative">
            <input
              type="time"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input) {
                  input.showPicker?.();
                }
              }}
            />
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'select':
      case 'severity':
      case 'incident-type':
        return (
          <div className="relative">
            <select
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select an option...</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={fieldValue === option.value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const checkboxValues = Array.isArray(fieldValue) ? fieldValue : [];
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={checkboxValues.includes(option.value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...checkboxValues, option.value]
                      : checkboxValues.filter((v) => v !== option.value);
                    handleFieldChange(field.id, newValues);
                  }}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'location':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder="Enter location (building, room, area, etc.)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-xs text-gray-500">
              💡 In a real implementation, this would include location picker/map integration
            </div>
          </div>
        );

      case 'person':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder="Search for person or enter name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-xs text-gray-500">
              💡 In a real implementation, this would include person selector with organization directory
            </div>
          </div>
        );

      case 'file':
        return (
          <div className="space-y-2">
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFieldChange(field.id, files.map(f => f.name));
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {fieldValue && Array.isArray(fieldValue) && fieldValue.length > 0 && (
              <div className="text-xs text-gray-600">
                Selected: {fieldValue.join(', ')}
              </div>
            )}
          </div>
        );

      case 'signature':
        return (
          <div className="space-y-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <p className="text-sm text-gray-500 mt-2">Click to sign</p>
            </div>
            <div className="text-xs text-gray-500">
              💡 In a real implementation, this would include digital signature capture
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      
      {/* Modal panel */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
          {/* Modal header */}
          <div className="bg-white px-6 pt-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-gray-900" id="modal-title">
                Form Preview: {formTitle}
              </h3>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Form metadata */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Form Information</h4>
                  <p className="text-sm text-blue-800">{formDescription}</p>
                  {category && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Category: {category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Separator line */}
            <div className="border-b border-gray-200"></div>
          </div>
          
          {/* Modal body - Scrollable form content */}
          <div className="px-6 pb-6 max-h-96 overflow-y-auto">
            <form className="space-y-8">
              {sortedSections.map(([sectionName, sectionFields]) => (
                <div key={sectionName} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                      {Object.keys(fieldsBySection).indexOf(sectionName) + 1}
                    </div>
                    {sectionName}
                  </h3>
                  
                  <div className="space-y-6">
                    {sectionFields
                      .sort((a, b) => a.order - b.order)
                      .map((field) => (
                        <div key={field.id} className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {field.helpText && (
                              <p className="text-xs text-gray-500 mb-2">{field.helpText}</p>
                            )}
                          </div>
                          
                          {renderField(field)}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </form>
          </div>
          
          {/* Modal footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Preview mode - This form shows how the extracted fields would appear to users
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close Preview
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  alert('In a real implementation, this would submit the preview data for testing');
                }}
              >
                Test Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}