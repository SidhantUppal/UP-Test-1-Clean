import { useState, useEffect } from 'react';

export interface ValidationRule {
  field: string;
  message: string;
  validator: (value: any, formData: any) => boolean;
}

export interface UseFormValidationConfig {
  formStorageKey: string;
  initialFormData: Record<string, any>;
  validationRules: ValidationRule[];
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  autoSave?: boolean;
}

export const useFormValidation = ({
  formStorageKey,
  initialFormData,
  validationRules,
  onSubmit,
  autoSave = true
}: UseFormValidationConfig) => {
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'loading' | 'validation' | 'submit' | null>(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Form data with optional localStorage persistence
  const [formData, setFormData] = useState(() => {
    // Try to load from localStorage first if autoSave is enabled
    if (autoSave && typeof window !== 'undefined') {
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

  // Save form data to localStorage whenever it changes (if autoSave enabled)
  useEffect(() => {
    if (autoSave && typeof window !== 'undefined') {
      try {
        localStorage.setItem(formStorageKey, JSON.stringify(formData));
      } catch (error) {
        console.warn('Failed to save form data:', error);
      }
    }
  }, [formData, formStorageKey, autoSave]);

  const handleFieldChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors.includes(field)) {
      setValidationErrors(prev => prev.filter(error => error !== field));

      // If this was the last error, clear the main error message
      if (validationErrors.length === 1) {
        setError(null);
        setShowValidationErrors(false);
        setErrorType(null);
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
    return errors;
  };

  const validateField = (fieldName: string) => {
    const rule = validationRules.find(r => r.field === fieldName);
    if (!rule) return true;

    const isValid = rule.validator(formData[fieldName], formData);

    if (!isValid && !validationErrors.includes(fieldName)) {
      setValidationErrors(prev => [...prev, fieldName]);
    } else if (isValid && validationErrors.includes(fieldName)) {
      setValidationErrors(prev => prev.filter(error => error !== fieldName));
    }

    return isValid;
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setLoading(true);
    setError(null);
    setErrorType(null);
    setShowValidationErrors(true);

    // Validate form data
    const validationErrorsList = validateFormData();
    if (validationErrorsList.length > 0) {
      setError(validationErrorsList.join(', '));
      setErrorType('validation');
      setLoading(false);
      // Scroll to top to show validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      await onSubmit(formData);

      // Clear saved form data and validation errors after successful submission
      if (autoSave && typeof window !== 'undefined') {
        localStorage.removeItem(formStorageKey);
      }
      setValidationErrors([]);
      setShowValidationErrors(false);
      setError(null);
      setErrorType(null);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
      setError(errorMessage);
      setErrorType('submit');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setValidationErrors([]);
    setShowValidationErrors(false);
    setError(null);
    setErrorType(null);

    if (autoSave && typeof window !== 'undefined') {
      localStorage.removeItem(formStorageKey);
    }
  };

  const clearSavedData = () => {
    if (autoSave && typeof window !== 'undefined') {
      localStorage.removeItem(formStorageKey);
    }
  };

  return {
    // Form state
    formData,
    loading,
    error,
    errorType,
    showValidationErrors,
    validationErrors,

    // Form actions
    handleFieldChange,
    handleArrayFieldChange,
    handleSubmit,
    resetForm,
    clearSavedData,

    // Validation utilities
    validateField,
    validateFormData,
    getFieldStyling,
    hasFieldError: (fieldName: string) => showValidationErrors && validationErrors.includes(fieldName),

    // Form utilities
    setFormData,
    setError,
    setLoading
  };
};

export default useFormValidation;