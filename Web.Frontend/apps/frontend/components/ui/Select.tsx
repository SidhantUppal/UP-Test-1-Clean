'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helpText,
  options,
  placeholder,
  required,
  className = '',
  disabled,
  ...props
}) => {
  const { currentTheme } = useTheme();
  
  // Get secondary color for focus states (from styleGuide3)
  const secondaryColor = currentTheme?.colors?.secondary || '#e77726';

  // Select styles based on styleGuide3
  const getSelectStyles = () => {
    const baseStyles = {
      width: '100%',
      padding: '8px 12px',
      border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'all 0.2s',
      outline: 'none',
      appearance: 'none' as const,
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
      backgroundPosition: 'right 8px center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '16px 16px',
      paddingRight: '40px'
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

  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-base font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        style={getSelectStyles()}
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
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
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

export default Select;