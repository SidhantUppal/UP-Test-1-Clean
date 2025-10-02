/**
 * Frontend Validation Utilities for T100 Platform
 * 
 * Provides reusable validation functions for form fields.
 * Designed to work with existing React forms without requiring
 * external dependencies or major architectural changes.
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown, formData?: Record<string, unknown>) => string | null;
}

export interface ValidationSchema {
  [fieldName: string]: ValidationRule;
}

/**
 * Email validation using RFC 5322 compliant regex
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
};

/**
 * UK phone number validation
 * Supports formats: +44, 07, 01, 02, 03
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  // Remove spaces, hyphens, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // UK phone formats
  const ukPhoneRegex = /^(?:(?:\+44\s?|0)(?:1\d{8,9}|2\d{9}|3\d{9}|7\d{9}|8\d{9}|9\d{8}))$/;
  return ukPhoneRegex.test(cleaned);
};

/**
 * UK postcode validation
 */
export const validatePostcode = (postcode: string): boolean => {
  if (!postcode) return false;
  const cleaned = postcode.replace(/\s/g, '').toUpperCase();
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/;
  return postcodeRegex.test(cleaned);
};

/**
 * Strong password validation
 * Requires: 8+ chars, uppercase, lowercase, number, special char
 */
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain lowercase letter';
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain uppercase letter';
  if (!/(?=.*\d)/.test(password)) return 'Password must contain number';
  if (!/(?=.*[@$!%*?&])/.test(password)) return 'Password must contain special character (@$!%*?&)';
  return null;
};

/**
 * Username validation
 * 3-30 chars, alphanumeric + underscore/hyphen
 */
export const validateUsername = (username: string): boolean => {
  if (!username) return false;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
  return usernameRegex.test(username);
};

/**
 * Generic field validation based on rules
 */
export const validateField = (value: unknown, rules: ValidationRule, fieldName: string): string | null => {
  // Required check
  if (rules.required && (!value || value.toString().trim() === '')) {
    return `${fieldName} is required`;
  }
  
  // If field is empty and not required, skip other validations
  if (!value || value.toString().trim() === '') {
    return null;
  }
  
  const stringValue = value.toString().trim();
  
  // Length validations
  if (rules.minLength && stringValue.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }
  
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return `${fieldName} must be no more than ${rules.maxLength} characters`;
  }
  
  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return `${fieldName} format is invalid`;
  }
  
  // Custom validation
  if (rules.custom) {
    return rules.custom(stringValue);
  }
  
  return null;
};

/**
 * Validate entire form against schema
 */
export const validateForm = (data: Record<string, unknown>, schema: ValidationSchema): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.entries(schema).forEach(([fieldName, rules]) => {
    const error = validateField(data[fieldName], rules, fieldName);
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * Validation schemas for common forms
 */

// Contractor form validation schema
export const contractorValidationSchema: ValidationSchema = {
  companyName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  contactPerson: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    custom: (value) => validateEmail(value) ? null : 'Please enter a valid email address'
  },
  phone: {
    required: true,
    custom: (value) => validatePhone(value) ? null : 'Please enter a valid UK phone number'
  },
  streetAddress: {
    required: true,
    minLength: 5,
    maxLength: 200
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  stateProvince: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  postalCode: {
    required: true,
    custom: (value) => validatePostcode(value) ? null : 'Please enter a valid UK postcode'
  },
  country: {
    required: true
  }
};

// Admin user validation schema
export const adminUserValidationSchema: ValidationSchema = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 30,
    custom: (value) => validateUsername(value) ? null : 'Username must be 3-30 characters, letters, numbers, underscore or hyphen only'
  },
  email: {
    required: true,
    custom: (value) => validateEmail(value) ? null : 'Please enter a valid email address'
  },
  firstName: {
    required: true,
    minLength: 1,
    maxLength: 50
  },
  lastName: {
    required: true,
    minLength: 1,
    maxLength: 50
  },
  password: {
    required: true,
    custom: validatePassword
  },
  confirmPassword: {
    required: true,
    custom: (value: unknown, formData?: Record<string, unknown>) => {
      if (formData && value !== formData.password) {
        return 'Passwords do not match';
      }
      return null;
    }
  }
};

// Checklist validation schema
export const checklistValidationSchema: ValidationSchema = {
  checklistTitle: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  category: {
    required: true
  },
  checklistDescription: {
    maxLength: 500
  }
};

/**
 * Utility function to get CSS classes for field validation state
 */
export const getValidationClasses = (error?: string, baseClasses?: string): string => {
  const base = baseClasses || 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2';
  
  if (error) {
    return `${base} border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500`;
  }
  
  return `${base} border-theme-primary/20 focus:ring-theme-primary focus:border-theme-primary`;
};

/**
 * Debounce utility for real-time validation
 */
export const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: unknown[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * React hook for field validation with debouncing
 */
import { useCallback, useEffect, useState } from 'react';

export const useFieldValidation = (
  value: string, 
  rules: ValidationRule, 
  fieldName: string, 
  delay = 500
) => {
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateDebounced = useCallback(
    debounce((val: string) => {
      setIsValidating(true);
      const validationError = validateField(val, rules, fieldName);
      setError(validationError);
      setIsValidating(false);
    }, delay),
    [rules, fieldName, delay]
  );

  useEffect(() => {
    if (value || rules.required) {
      validateDebounced(value);
    } else {
      setError(null);
    }
  }, [value, validateDebounced, rules.required]);

  return { error, isValidating };
};

/**
 * Format display names for better error messages
 */
export const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Add space before capitals
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .trim();
};

/**
 * Validation error icons
 */
export const ValidationErrorIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path 
      fillRule="evenodd" 
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
      clipRule="evenodd" 
    />
  </svg>
);

export const ValidationSuccessIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path 
      fillRule="evenodd" 
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
      clipRule="evenodd" 
    />
  </svg>
);