import { useRouter } from 'next/navigation';
import { useFormValidation, ValidationRule } from './useFormValidation';
import { hazardService } from '@/services/hazardService';
import { authHeaderService } from '@/services/authHeaderService';

interface UseHazardFormConfig {
  hazardId?: number | null;
  formStorageKey: string;
  initialFormData: Record<string, any>;
  validationRules: ValidationRule[];
  onSuccess?: () => void;
}

export const useHazardFormValidation = ({
  hazardId,
  formStorageKey,
  initialFormData,
  validationRules,
  onSuccess
}: UseHazardFormConfig) => {
  const router = useRouter();

  // Define the submit handler for hazards
  const handleHazardSubmit = async (formData: Record<string, any>) => {
    if (hazardId) {
      // Update existing hazard - database-first PascalCase structure
      const updateData = {
        HazardDescription: formData.hazardDescription,
        HazardCategoryTypeID: parseInt(formData.hazardCategoryId),
        HazardSeverityTypeID: parseInt(formData.hazardSeverityTypeId),
        LocationID: formData.locationId ? parseInt(formData.locationId) : null,
        AssignedToUserID: formData.assignedToUserId ? parseInt(formData.assignedToUserId) : null,
        AssignedToRoleID: formData.assignedToRoleId ? parseInt(formData.assignedToRoleId) : null,
        FixedWhenFound: formData.fixedWhenFound || false,
        ResolutionNotes: formData.resolutionNotes || null,
        ModifiedByUserID: 1, // Will be set by auth context
        ModifiedDate: new Date().toISOString()
      };
      await hazardService.updateHazard(hazardId, updateData);
    } else {
      // Get user context from auth service
      const currentUserId = authHeaderService.getCurrentUserId();
      const currentUserAreaId = authHeaderService.getCurrentUserAreaId();

      // Create new hazard - database-first PascalCase structure
      const hazardData = {
        UserAreaID: parseInt(String(currentUserAreaId)) || 1,
        Title: `Hazard - ${formData.hazardDescription?.substring(0, 50) || 'Untitled'}`,
        Description: formData.hazardDescription || '',
        HazardCategoryTypeID: parseInt(formData.hazardCategoryId),
        HazardSeverityTypeID: parseInt(formData.hazardSeverityTypeId),
        // Only include optional fields if they have values
        ...(formData.locationId && { LocationID: parseInt(formData.locationId) }),
        ...(formData.assignedToUserId && { AssignedToUserID: parseInt(formData.assignedToUserId) }),
        ...(formData.assignedToRoleId && { AssignedToRoleID: parseInt(formData.assignedToRoleId) }),
        Status: 'Open',
        IsActive: true,
        CreatedByUserID: parseInt(String(currentUserId)) || 1,
        CreatedDate: new Date().toISOString(),
        // Enhanced fields - only include if they have meaningful values
        FixedWhenFound: formData.fixedWhenFound || false,
        ...(formData.resolutionNotes && { ResolutionNotes: formData.resolutionNotes }),
        CreateFollowUpTask: formData.createFollowUpTask || false,
        ...(formData.followUpTaskType && { FollowUpTaskType: formData.followUpTaskType }),
        ...(formData.followUpTaskAssignTo && { FollowUpTaskAssignTo: formData.followUpTaskAssignTo }),
        ...(formData.followUpTaskDueDate && { FollowUpTaskDueDate: formData.followUpTaskDueDate }),
        ...(formData.followUpTaskDescription && { FollowUpTaskDescription: formData.followUpTaskDescription })
      };

      await hazardService.createHazard(hazardData);
    }

    // Call success callback or navigate to hazards list
    if (onSuccess) {
      onSuccess();
    } else {
      router.push('/incidents/hazards');
    }
  };

  // Use the generic form validation hook
  const formValidation = useFormValidation({
    formStorageKey,
    initialFormData,
    validationRules,
    onSubmit: handleHazardSubmit,
    autoSave: true
  });

  return {
    // All form validation functionality
    ...formValidation
  };
};

// Define common hazard validation rules
export const HAZARD_VALIDATION_RULES: ValidationRule[] = [
  {
    field: 'hazardCategoryId',
    message: 'Hazard type is required',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'hazardSeverityTypeId',
    message: 'Severity is required',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'hazardDescription',
    message: 'Description is required and must be at least 10 characters',
    validator: (value: string) => Boolean(value?.trim()) && value.trim().length >= 10
  },
  {
    field: 'resolutionNotes',
    message: 'Resolution notes are required when marking as fixed',
    validator: (value: string, formData: any) => {
      // Only required if fixedWhenFound is true
      return !formData.fixedWhenFound || Boolean(value?.trim());
    }
  },
  {
    field: 'followUpTaskType',
    message: 'Task type is required',
    validator: (value: string, formData: any) => {
      // Only required if createFollowUpTask is true
      return !formData.createFollowUpTask || Boolean(value);
    }
  },
  {
    field: 'followUpTaskDueDate',
    message: 'Due date is required for follow-up task',
    validator: (value: string, formData: any) => {
      // Only required if createFollowUpTask is true
      return !formData.createFollowUpTask || Boolean(value);
    }
  }
];

export default useHazardFormValidation;