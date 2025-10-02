'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  required,
  className = '',
  disabled,
  ...props
}) => {
  const { currentTheme } = useTheme();
  
  // Get secondary color for focus states (from styleGuide3)
  const secondaryColor = currentTheme?.colors?.secondary || '#e77726';

  // Input styles based on styleGuide3
  const getInputStyles = () => {
    const baseStyles = {
      width: '100%',
      padding: '8px 12px',
      border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'all 0.2s',
      outline: 'none'
    };

    if (disabled) {
      return {
        ...baseStyles,
        backgroundColor: '#f3f4f6',
        cursor: 'not-allowed',
        color: '#6b7280'
      };
    }

    return baseStyles;
  };

  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-base font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        style={getInputStyles()}
        disabled={disabled}
        onFocus={(e) => {
          if (!disabled && !error) {
            e.target.style.borderColor = secondaryColor;
            e.target.style.boxShadow = `0 0 0 2px ${secondaryColor}40`;
          }
        }}
        onBlur={(e) => {
          if (!disabled) {
            e.target.style.borderColor = error ? '#ef4444' : '#d1d5db';
            e.target.style.boxShadow = 'none';
          }
        }}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-600">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Input;