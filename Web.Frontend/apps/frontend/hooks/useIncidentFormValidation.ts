import { useRouter } from 'next/navigation';
import { useFormValidation, ValidationRule } from './useFormValidation';
import { incidentService } from '@/services/incidentService';
import { useState, useEffect } from 'react';

interface UseIncidentFormConfig {
  incidentCaseId: number | null;
  formStorageKey: string;
  initialFormData: Record<string, any>;
  validationRules: ValidationRule[];
  onSuccess?: () => void;
}

export const useIncidentFormValidation = ({
  incidentCaseId,
  formStorageKey,
  initialFormData,
  validationRules,
  onSuccess
}: UseIncidentFormConfig) => {
  const router = useRouter();
  const [incidentData, setIncidentData] = useState<any>(null);

  // Define the submit handler for incidents
  const handleIncidentSubmit = async (formData: Record<string, any>) => {
    if (incidentCaseId && incidentData) {
      // Update existing incident
      const updatePayload = {
        ...incidentData, // Include all existing incident fields
        IncidentDate: formData.incidentDate + 'T' + (formData.incidentTime || '00:00') + ':00.000Z',
        Description: formData.eventDescription || incidentData.Description,
        FormData: formData,
        ModifiedDate: new Date().toISOString(),
        ModifiedByUserID: 1 // Will be handled by OAuth in the future
      };

      await incidentService.updateIncidentCase(incidentCaseId, updatePayload);

      // Call success callback or navigate to dashboard
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/incidents/dashboard');
      }
    } else {
      // No incident ID - this shouldn't happen with the new workflow
      throw new Error('No incident ID provided. Please start from the incident creation modal.');
    }
  };

  // Use the generic form validation hook
  const formValidation = useFormValidation({
    formStorageKey,
    initialFormData,
    validationRules,
    onSubmit: handleIncidentSubmit,
    autoSave: true
  });

  // Load incident data if ID is provided
  useEffect(() => {
    if (incidentCaseId) {
      loadIncidentData(incidentCaseId);
    }
  }, [incidentCaseId]);

  const loadIncidentData = async (id: number) => {
    formValidation.setLoading(true);
    formValidation.setError(null);

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

      formValidation.setFormData(prev => {
        // Priority order: saved localStorage > incident FormData > incident basic fields > existing form
        const mergedData = {
          ...prev, // Current form state (includes localStorage data)
          // Basic incident info from the incident data
          incidentDate: incidentDateStr,
          incidentTime: incidentTimeStr,
          // Merge any existing form data from database
          ...(incident.FormData || {})
        };

        return mergedData;
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load incident data';
      formValidation.setError(errorMessage);
    } finally {
      formValidation.setLoading(false);
    }
  };

  return {
    // All form validation functionality
    ...formValidation,

    // Incident-specific additions
    incidentData,
    loadIncidentData
  };
};

export default useIncidentFormValidation;