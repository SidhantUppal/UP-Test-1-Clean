import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { incidentService } from '@/services/incidentService';

interface ValidationRule {
  field: string;
  message: string;
  validator: (value: any, formData: any) => boolean;
}

interface UseIncidentFormConfig {
  incidentCaseId: number | null;
  formStorageKey: string;
  initialFormData: Record<string, any>;
  validationRules: ValidationRule[];
  onSuccess?: () => void;
}

export const useIncidentForm = ({
  incidentCaseId,
  formStorageKey,
  initialFormData,
  validationRules,
  onSuccess
}: UseIncidentFormConfig) => {
  const router = useRouter();

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'loading' | 'validation' | null>(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [incidentData, setIncidentData] = useState<any>(null);

  // Form data with localStorage persistence
  const [formData, setFormData] = useState(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(formStorageKey);
        if (saved) {
          return { ...initialFormData, ...JSON.parse(saved) };
        }
      } catch (error) {
        console.warn('Failed to load saved form data:', error);
      }
    }
    return initialFormData;
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(formStorageKey, JSON.stringify(formData));
      } catch (error) {
        console.warn('Failed to save form data:', error);
      }
    }
  }, [formData, formStorageKey]);

  // Load incident data if ID is provided
  useEffect(() => {
    if (incidentCaseId) {
      loadIncidentData(incidentCaseId);
    }
  }, [incidentCaseId]);

  const loadIncidentData = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const incident = await incidentService.getIncidentForEdit(id);

      if (!incident) {
        throw new Error('No incident data returned from API');
      }

      setIncidentData(incident);

      // Always extract date and time from the incident data (PascalCase from API)
      const incidentDateTime = incident.IncidentDate ? new Date(incident.IncidentDate) : null;
      const incidentDateStr = incidentDateTime ? incidentDateTime.toISOString().split('T')[0] : '';
      const incidentTimeStr = incidentDateTime ? incidentDateTime.toTimeString().slice(0, 5) : '';

      setFormData(prev => {
        // Priority order: saved localStorage > incident FormData > incident basic fields > existing form
        const mergedData = {
          ...prev, // Current form state (includes localStorage data)
          // Basic incident info from the incident data
          incidentDate: incidentDateStr,
          incidentTime: incidentTimeStr,
          // Merge any existing form data from database
          ...(incident.FormData || {})
        };

        // If localStorage has more recent data, prefer user's unsaved changes
        // (This allows continuing work after page refresh)
        return mergedData;
      });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load incident data');
      setErrorType('loading');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string | boolean) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };

    setFormData(updatedFormData);

    // If validation errors are currently shown, re-validate this specific field
    if (showValidationErrors && validationErrors.includes(field)) {
      // Find the validation rule for this field
      const rule = validationRules.find(r => r.field === field);
      if (rule) {
        // Check if the field is now valid
        const isFieldValid = rule.validator(value, updatedFormData);

        if (isFieldValid) {
          // Remove this field from validation errors
          setValidationErrors(prev => prev.filter(error => error !== field));

          // If this was the last error, clear the main error message
          if (validationErrors.length === 1) {
            setError(null);
            setShowValidationErrors(false);
          }
        }
        // If field is still invalid, keep the error highlighting
      }
    }
  };

  const handleArrayFieldChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const validateFormData = () => {
    const errors: string[] = [];
    const fieldErrors: string[] = [];

    validationRules.forEach(rule => {
      if (!rule.validator(formData[rule.field], formData)) {
        errors.push(rule.message);
        fieldErrors.push(rule.field);
      }
    });

    setValidationErrors(fieldErrors);
    return { errors, fieldErrors };
  };

  const scrollToFirstError = (fieldErrors: string[]) => {
    if (fieldErrors.length === 0) return;

    // Wait for the DOM to update with error states
    setTimeout(() => {
      const firstErrorField = fieldErrors[0];

      // Try different selectors to find the field
      const selectors = [
        `[name="${firstErrorField}"]`,
        `#${firstErrorField}`,
        `[data-field="${firstErrorField}"]`,
        `input[value*="${formData[firstErrorField]}"]`,
        `select[value*="${formData[firstErrorField]}"]`,
        `textarea[value*="${formData[firstErrorField]}"]`
      ];

      let element: HTMLElement | null = null;

      for (const selector of selectors) {
        element = document.querySelector(selector);
        if (element) break;
      }

      if (element) {
        // Find the parent form field container for better UX
        const fieldContainer = element.closest('.mb-8, .space-y-6, .grid') as HTMLElement;
        const targetElement = fieldContainer || element;

        // Scroll to the element with some offset for the header
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 120; // 120px offset for header/spacing

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });

        // Focus the input field for better UX
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
          setTimeout(() => element.focus(), 300);
        }
      } else {
        // Fallback to top of page if element not found
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Helper function to get field styling based on validation state
  const getFieldStyling = (fieldName: string) => {
    const hasError = showValidationErrors && validationErrors.includes(fieldName);

    if (hasError) {
      return {
        border: '2px solid #dc2626', // red-600
        backgroundColor: '#fef2f2', // red-50
        borderRadius: '6px',
        padding: '12px'
      };
    }

    return {
      border: '1px solid #d1d5db', // gray-300
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      padding: '12px'
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowValidationErrors(true);

    // Validate form data
    const { errors: validationErrorsList, fieldErrors } = validateFormData();
    if (validationErrorsList.length > 0) {
      setError(validationErrorsList.join(', '));
      setErrorType('validation');
      setLoading(false);

      // Scroll to the first error field instead of top of page
      scrollToFirstError(fieldErrors);
      return;
    }

    if (incidentCaseId && incidentData) {
      // Update existing incident
      try {
        // Ensure we have all required fields from the original incident data
        if (!incidentData.CaseNumber || !incidentData.UserAreaID || !incidentData.IncidentTypeID) {
          console.error('Missing required fields in incident data:', {
            CaseNumber: incidentData.CaseNumber,
            UserAreaID: incidentData.UserAreaID,
            IncidentTypeID: incidentData.IncidentTypeID
          });
          throw new Error('Incomplete incident data. Please refresh and try again.');
        }

        // Construct proper IncidentDate from form fields
        const incidentDateTime = formData.incidentDate + 'T' + (formData.incidentTime || '00:00') + ':00.000Z';

        // Merge form updates with existing incident data to ensure all required fields are sent
        const updatePayload = {
          // Required fields from IncidentCaseViewModel
          IncidentCaseID: incidentCaseId,
          CaseNumber: incidentData.CaseNumber,
          IncidentTypeID: incidentData.IncidentTypeID,
          UserAreaID: incidentData.UserAreaID || 1,
          CreatedByUserID: incidentData.CreatedByUserID || 1,
          ReportedByUserID: incidentData.ReportedByUserID || 1,

          // Date fields
          IncidentDate: incidentDateTime,
          ReportedDate: incidentData.ReportedDate || new Date().toISOString(),
          CreatedDate: incidentData.CreatedDate,
          ModifiedDate: new Date().toISOString(),

          // Optional fields that might exist
          Description: formData.eventDescription || formData.accidentDescription || incidentData.Description || 'Accident Book Record',
          AdditionalReference: formData.additionalReference || incidentData.AdditionalReference,
          LocationID: incidentData.LocationID,
          IncidentSeverityTypeID: incidentData.IncidentSeverityTypeID || 1,
          IncidentStatusTypeID: incidentData.IncidentStatusTypeID || 1,
          IncidentPriorityTypeID: incidentData.IncidentPriorityTypeID || 1,

          // User fields
          ModifiedByUserID: 1, // Will be handled by OAuth in the future
          AssignedToUserID: incidentData.AssignedToUserID,
          InvolvedEmployeeID: incidentData.InvolvedEmployeeID,

          // Store form data separately for later retrieval
          FormData: formData
        };

        console.log('Sending update payload:', updatePayload);

        await incidentService.updateIncidentCase(incidentCaseId, updatePayload);

        // Clear saved form data and validation errors after successful submission
        if (typeof window !== 'undefined') {
          localStorage.removeItem(formStorageKey);
        }
        setValidationErrors([]);
        setShowValidationErrors(false);

        // Call success callback or navigate to dashboard
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/incidents/dashboard');
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update incident. Please try again.';
        setError(errorMessage);
        setErrorType('validation');
      }
    } else {
      // No incident ID - this shouldn't happen with the new workflow
      setError('No incident ID provided. Please start from the incident creation modal.');
      setErrorType('validation');
    }

    setLoading(false);
  };

  return {
    // State
    loading,
    error,
    errorType,
    showValidationErrors,
    validationErrors,
    incidentData,
    formData,

    // Actions
    handleFieldChange,
    handleArrayFieldChange,
    handleSubmit,
    loadIncidentData,

    // Utilities
    getFieldStyling,
    hasFieldError: (fieldName: string) => showValidationErrors && validationErrors.includes(fieldName)
  };
};