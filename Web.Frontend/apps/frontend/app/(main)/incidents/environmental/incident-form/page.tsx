"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Employee {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  FullName: string;
  Email: string;
  JobTitle: string;
  Department: string;
  IsActive: boolean;
}

export default function EnvironmentalIncidentFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draftId');
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterContact: '',
    dateTime: new Date().toISOString().slice(0, 16), // Current date/time in YYYY-MM-DDTHH:mm format
    location: '',
    customLocation: '',
    incidentType: '',
    customIncidentType: '',
    severity: '',
    briefDescription: '',
    otherDetails: '',
    immediateActions: {
      contained: false,
      isolated: false,
      emergencyServices: false,
      regulatorNotified: false
    },
    assignedInvestigator: '',
    photos: []
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [selectedInvestigator, setSelectedInvestigator] = useState<Employee | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedIncidentId, setSubmittedIncidentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(!!draftId);
  const [currentDraftId, setCurrentDraftId] = useState(draftId);
  const [isSaving, setIsSaving] = useState(false);

  // Common locations - can be expanded
  const locations = [
    'Main Production Area',
    'Warehouse',
    'Loading Bay',
    'Car Park',
    'Reception',
    'Office Block',
    'Storage Yard',
    'Waste Area',
    'Chemical Store',
    'Fuel Station',
    'Site Boundary',
    'Other'
  ];

  // Incident types as specified
  const incidentTypes = [
    'Oil / fuel spill',
    'Chemical spill',
    'Sewage / effluent leak to drain or watercourse',
    'Runoff / contaminated stormwater to surface water',
    'Air emission / odour / smoke (nuisance)',
    'Waste storage / disposal breach',
    'Wildlife / habitat impact',
    'Fire / Explosion with potential pollution',
    'Contractor / transport spill (road incident)',
    'Other'
  ];

  // Auto-populate current user (placeholder - would normally come from auth context)
  useEffect(() => {
    // This would normally be populated from user context/auth
    setFormData(prev => ({
      ...prev,
      reporterName: 'Current User', // Placeholder
      reporterContact: 'user@company.com' // Placeholder
    }));
  }, []);

  // Fetch employees for investigator dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      try {
        const response = await fetch('/api/employees');
        if (response.ok) {
          const result = await response.json();
          setEmployees(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  // Load draft data if editing existing draft
  useEffect(() => {
    if (draftId) {
      const loadDraftData = () => {
        try {
          const savedDrafts = localStorage.getItem('environmentalIncidentDrafts');
          if (savedDrafts) {
            const drafts = JSON.parse(savedDrafts);
            const draft = drafts.find((d: any) => d.id === draftId);
            if (draft) {
              // Populate form with draft data
              setFormData({
                reporterName: draft.reporterName || '',
                reporterContact: draft.reporterContact || '',
                dateTime: draft.dateTime || new Date().toISOString().slice(0, 16),
                location: draft.location || '',
                customLocation: draft.customLocation || '',
                incidentType: draft.incidentType || '',
                customIncidentType: draft.customIncidentType || '',
                severity: draft.severity || '',
                briefDescription: draft.briefDescription || '',
                otherDetails: draft.otherDetails || '',
                immediateActions: draft.immediateActions || {
                  contained: false,
                  isolated: false,
                  emergencyServices: false,
                  regulatorNotified: false
                },
                assignedInvestigator: draft.assignedInvestigator || '',
                photos: draft.photos || []
              });

              // Set selected investigator if one was saved
              if (draft.assignedInvestigator && employees.length > 0) {
                const investigator = employees.find(emp => emp.FullName === draft.assignedInvestigator);
                setSelectedInvestigator(investigator || null);
              }
            }
          }
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      };

      loadDraftData();
    }
  }, [draftId, employees]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImmediateActionChange = (action, checked) => {
    setFormData(prev => ({
      ...prev,
      immediateActions: {
        ...prev.immediateActions,
        [action]: checked
      }
    }));
  };

  const handleInvestigatorChange = (employeeId) => {
    const employee = employees.find(emp => emp.EmployeeID.toString() === employeeId);
    setSelectedInvestigator(employee || null);
    setFormData(prev => ({
      ...prev,
      assignedInvestigator: employee ? employee.FullName : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (in real app, this would call an API)
      console.log('Form submitted:', formData);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate a mock incident ID (in real app, this would come from API response)
      const incidentId = `ENV-${Date.now().toString().slice(-4)}`;
      setSubmittedIncidentId(incidentId);

      // Remove from drafts if this was a draft being submitted
      if (currentDraftId) {
        const existingDrafts = JSON.parse(localStorage.getItem('environmentalIncidentDrafts') || '[]');
        const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== currentDraftId);
        localStorage.setItem('environmentalIncidentDrafts', JSON.stringify(updatedDrafts));
      }

      // Show confirmation modal
      setShowConfirmation(true);

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (could show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    // Navigate to Environmental Management page
    router.push('/incidents/environmental');
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);

    try {
      // Generate draft ID if this is a new draft
      const draftIdToUse = currentDraftId || `draft-${Date.now()}`;

      // Prepare draft data
      const draftData = {
        id: draftIdToUse,
        ...formData,
        title: formData.briefDescription,
        description: formData.otherDetails,
        createdBy: formData.reporterName || 'Current User',
        lastModified: new Date().toISOString()
      };

      // Get existing drafts
      const existingDrafts = JSON.parse(localStorage.getItem('environmentalIncidentDrafts') || '[]');

      // Update existing draft or add new one
      const draftIndex = existingDrafts.findIndex((draft: any) => draft.id === draftIdToUse);
      if (draftIndex >= 0) {
        existingDrafts[draftIndex] = draftData;
      } else {
        existingDrafts.push(draftData);
      }

      // Save to localStorage
      localStorage.setItem('environmentalIncidentDrafts', JSON.stringify(existingDrafts));

      // Update state
      setCurrentDraftId(draftIdToUse);
      setIsDraft(true);

      // Show success message (you could add a toast notification here)
      console.log('Draft saved successfully:', draftData);

      // Update URL to reflect draft status
      if (!currentDraftId) {
        window.history.replaceState(null, '', `/incidents/environmental/incident-form?draftId=${draftIdToUse}`);
      }

    } catch (error) {
      console.error('Error saving draft:', error);
      // Handle error (could show error message)
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ margin: 0 }}>
                {isDraft ? 'Edit Environmental Incident Draft' : 'Environmental Incident Form'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {isDraft
                  ? 'Continue editing your saved environmental incident report'
                  : 'Report and document environmental incidents and near misses'
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  opacity: isSubmitting ? 0.6 : 1
                }}
                className="hover:opacity-80"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Report'
                )}
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                style={{
                  backgroundColor: '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  opacity: isSaving ? 0.6 : 1
                }}
                className="hover:opacity-80"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Draft'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12 xl:px-16 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Reporter Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Reporter Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reporter Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.reporterContact}
                  onChange={(e) => handleInputChange('reporterContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  placeholder="Email or phone number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Incident Details</h2>
            <div className="space-y-4">
              
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) => handleInputChange('dateTime', e.target.value)}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
                    required
                  />
                </div>

                {/* Immediate Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Immediate Severity <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.severity}
                    onChange={(e) => handleInputChange('severity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    required
                  >
                    <option value="">Select severity</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm mb-2"
                  required
                >
                  <option value="">Select location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                {formData.location === 'Other' && (
                  <input
                    type="text"
                    value={formData.customLocation}
                    onChange={(e) => handleInputChange('customLocation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    placeholder="Please specify location"
                    required
                  />
                )}
              </div>

              {/* Incident Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.incidentType}
                  onChange={(e) => handleInputChange('incidentType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm mb-2"
                  required
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formData.incidentType === 'Other' && (
                  <input
                    type="text"
                    value={formData.customIncidentType}
                    onChange={(e) => handleInputChange('customIncidentType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    placeholder="Please specify incident type"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Description</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brief Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.briefDescription}
                  onChange={(e) => handleInputChange('briefDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  placeholder="One short sentence describing the incident"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Details</label>
                <textarea
                  value={formData.otherDetails}
                  onChange={(e) => handleInputChange('otherDetails', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  rows={4}
                  placeholder="Additional details about the incident..."
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Photos (Optional, but Encouraged)</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="photo-upload"
                onChange={(e) => {
                  // Handle file upload logic here
                  console.log('Files selected:', e.target.files);
                }}
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Click to upload photos or drag and drop</span>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB each</p>
              </label>
            </div>
          </div>

          {/* Immediate Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Immediate Action Taken</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries({
                contained: 'Contained',
                isolated: 'Isolated',
                emergencyServices: 'Emergency services called',
                regulatorNotified: 'Regulator notified'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.immediateActions[key]}
                    onChange={(e) => handleImmediateActionChange(key, e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Assigned Investigator */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Investigation</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Investigator</label>
                  <select
                    value={selectedInvestigator?.EmployeeID || ''}
                    onChange={(e) => handleInvestigatorChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    disabled={loadingEmployees}
                  >
                    <option value="">Select an investigator...</option>
                    {employees.map(employee => (
                      <option key={employee.EmployeeID} value={employee.EmployeeID}>
                        {employee.FullName} - {employee.JobTitle} ({employee.Department})
                      </option>
                    ))}
                  </select>
                  {loadingEmployees && (
                    <p className="text-sm text-gray-500 mt-1">Loading employees...</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowTaskModal(true)}
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
                  className="hover:opacity-80 w-full sm:w-auto"
                >
                  Assign Task
                </button>
              </div>

              {/* Email Notification Message */}
              {selectedInvestigator && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900">Email Notification</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        <strong>{selectedInvestigator.FullName}</strong> ({selectedInvestigator.Email}) will be automatically notified via email with a task to investigate this environmental incident once the report is submitted.
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        The investigation task will include all incident details and link directly to the investigation form.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSaving}
                style={{
                  backgroundColor: '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  opacity: isSaving ? 0.6 : 1
                }}
                className="hover:opacity-80"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Draft'
                )}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#3d3a72',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  opacity: isSubmitting ? 0.6 : 1
                }}
                className="hover:opacity-80"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </div>

        </form>
      </div>

      {/* Task Assignment Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowTaskModal(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Assign Investigation Task</h2>
                <button 
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">Task assignment functionality will be integrated here.</p>
              </div>
              
              <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                <button 
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
                  onClick={() => setShowTaskModal(false)}
                >
                  Assign Task
                </button>
                <button 
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
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
              <div className="p-6 sm:p-8 text-center">
                {/* Success Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Environmental Incident Report Submitted
                </h2>

                {/* Incident ID */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Incident Reference Number:</p>
                  <p className="text-base sm:text-lg font-bold text-purple-600">{submittedIncidentId}</p>
                </div>

                {/* Message */}
                <div className="space-y-4 mb-6 sm:mb-8">
                  <p className="text-sm sm:text-base text-gray-700">
                    Your environmental incident report has been successfully submitted and logged in the system.
                  </p>

                  {selectedInvestigator && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-900">Investigation Assignment</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        <strong>{selectedInvestigator.FullName}</strong> has been notified via email and assigned to investigate this incident.
                      </p>
                    </div>
                  )}

                  <div className="text-left bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">What happens next:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Your incident is now in the system and tracking has begun</li>
                      <li>• Relevant personnel have been automatically notified</li>
                      {selectedInvestigator && <li>• Investigation tasks have been assigned</li>}
                      <li>• You can track progress in the Environmental Management dashboard</li>
                    </ul>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleCloseConfirmation}
                  style={{
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'all 0.2s'
                  }}
                  className="hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100"
                >
                  Continue to Environmental Management
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}