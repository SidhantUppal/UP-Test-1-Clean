import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
  hasError?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children,
  htmlFor,
  hasError = false
}) => {
  return (
    <div>
      <label className="label" htmlFor={htmlFor}>
        <span className={`label-text ${hasError ? 'text-red-600 font-semibold' : ''}`}>
          {label}
          {required && <span className="text-error"> *</span>}
        </span>
      </label>
      {children}
      {(error || hasError) && (
        <p className="text-red-600 text-sm mt-1">{error || 'This field is required'}</p>
      )}
    </div>
  );
};

interface FormInputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  name?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  value,
  onChange,
  hasError = false,
  required = false,
  placeholder,
  className = '',
  name
}) => {
  const getFieldStyling = () => {
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

  return (
    <input
      type={type}
      name={name}
      className={`input input-bordered w-full ${className}`}
      style={getFieldStyling()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
    />
  );
};

interface FormTextareaProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  value,
  onChange,
  hasError = false,
  required = false,
  placeholder,
  rows = 4,
  className = ''
}) => {
  const getFieldStyling = () => {
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

  return (
    <textarea
      className={`textarea textarea-bordered w-full ${className}`}
      style={getFieldStyling()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  hasError?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  name?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  value,
  onChange,
  options,
  hasError = false,
  required = false,
  placeholder = "Select an option...",
  className = '',
  name
}) => {
  const getFieldStyling = () => {
    if (hasError) {
      return {
        border: '2px solid #dc2626', // red-600
        backgroundColor: '#fef2f2', // red-50
        borderRadius: '6px',
        padding: '10px'
      };
    }

    return {
      border: '1px solid #d1d5db', // gray-300
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      padding: '10px'
    };
  };

  return (
    <select
      name={name}
      className={`select select-bordered w-full ${className}`}
      style={getFieldStyling()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface FormRadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  hasError?: boolean;
  errorMessage?: string;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  hasError = false,
  errorMessage
}) => {
  return (
    <div>
      <div
        className={`flex gap-6 p-3 rounded-lg ${
          hasError
            ? 'bg-red-50 border-2 border-red-600'
            : 'bg-gray-50 border border-gray-200'
        }`}
      >
        {options.map((option) => (
          <label key={option.value} className="label cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              className="radio radio-primary"
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className="label-text ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {hasError && errorMessage && (
        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};