'use client';

import React, { useState, useEffect } from 'react';
import OrgGroupDropdown from '@/components/OrgGroupDropdown';
import { useTheme } from '@/contexts/ThemeContext';
import { incidentService } from '@/services/incidentService';
import { useIncidentSeverities } from '@/hooks/useIncidentLookups';

export interface AccidentBookInitialData {
  reference: string;
  additionalReference?: string;
  incidentDate: string;
  incidentTime: string;
  orgGroupId?: number | null;
  severity?: string;
}

interface AccidentBookInitialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAndContinue: (data: AccidentBookInitialData & { incidentCaseId: number }) => void;
}

export const AccidentBookInitialModal: React.FC<AccidentBookInitialModalProps> = ({
  isOpen,
  onClose,
  onSaveAndContinue
}) => {
  const { currentTheme } = useTheme();
  const primaryColor = currentTheme?.colors?.primary || '#3d3a72';
  const accentColor = currentTheme?.colors?.secondary || '#e77726';
  
  const [formData, setFormData] = useState<AccidentBookInitialData>(() => {
    // Get current time in HH:MM format for initial state
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    return {
      reference: '',
      additionalReference: '',
      incidentDate: '',
      incidentTime: currentTime,
      orgGroupId: null,
      severity: ''
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use centralized static data loading
  const { severities } = useIncidentSeverities();

  // Clear form data when modal opens and set current time
  useEffect(() => {
    if (isOpen) {
      // Get current time in HH:MM format
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // Gets HH:MM format

      setFormData({
        reference: '',
        additionalReference: '',
        incidentDate: '',
        incidentTime: currentTime,
        orgGroupId: null,
        severity: ''
      });
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleFieldChange = (field: keyof AccidentBookInitialData, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError(null);
    
    // Basic validation
    if (!formData.incidentDate || !formData.incidentTime) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.severity) {
      setError('Please select the overall severity of the incident');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('[AccidentBookInitialModal] Saving initial incident data:', formData);
      
      // Call the backend service to create initial incident
      const result = await incidentService.createInitialAccidentBookIncident({
        incidentDate: formData.incidentDate,
        incidentTime: formData.incidentTime,
        additionalReference: formData.additionalReference,
        orgGroupId: formData.orgGroupId,
        severity: formData.severity
      });
      
      console.log('[AccidentBookInitialModal] Incident created successfully:', result);
      
      // Pass both the form data and the incident case ID to the parent
      onSaveAndContinue({
        ...formData,
        reference: result.CaseNumber, // Use the generated reference number (PascalCase)
        incidentCaseId: result.IncidentCaseID // Use PascalCase property from API
      });
      
    } catch (error) {
      console.error('[AccidentBookInitialModal] Error saving incident:', error);
      setError(error instanceof Error ? error.message : 'Failed to save incident. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      
      {/* Modal panel */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {/* Modal header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
                New Accident Book Record
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
            
            {/* Separator line */}
            <div className="border-b border-gray-200"></div>
            
            {/* Modal body */}
            <div className="mt-2 px-2 py-4">
              <p className="text-base text-gray-500 mb-4">Please complete the case details below.</p>
              
              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Reference - Read only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference
                  </label>
                  <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-500">
                    This will be generated automatically on submission.
                  </div>
                </div>

                {/* Additional Reference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Reference
                  </label>
                  <input
                    type="text"
                    value={formData.additionalReference || ''}
                    onChange={(e) => handleFieldChange('additionalReference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide an initial summary of the incident"
                  />
                </div>

                {/* Incident Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Incident Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => handleFieldChange('incidentDate', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="dd/mm/yyyy"
                      required
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
                </div>

                {/* Incident Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Incident Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={formData.incidentTime}
                      onChange={(e) => handleFieldChange('incidentTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      required
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
                </div>

                {/* Org Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Org Group <span className="text-red-500">*</span>
                  </label>
                  <OrgGroupDropdown
                    value={formData.orgGroupId}
                    onChange={(value) => handleFieldChange('orgGroupId', value)}
                    placeholder="Select Org Group"
                    className="w-full"
                  />
                </div>

                {/* Overall Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overall severity of incident <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.severity || ''}
                      onChange={(e) => handleFieldChange('severity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      required
                    >
                      <option value="">Please select...</option>
                      {severities.map((severity) => (
                        <option key={severity.IncidentSeverityTypeID} value={severity.Title}>
                          {severity.Title} - {severity.Description}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Modal footer */}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{ 
                backgroundColor: loading ? '#9CA3AF' : primaryColor, 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              className="inline-flex w-full justify-center rounded-md px-3 py-2 text-base font-semibold text-white shadow-sm hover:opacity-90 sm:w-auto"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save and Continue'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ 
                backgroundColor: accentColor, 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              className="inline-flex w-full justify-center rounded-md px-3 py-2 text-base font-semibold text-white shadow-sm hover:opacity-90 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentBookInitialModal;