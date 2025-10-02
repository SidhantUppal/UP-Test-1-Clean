'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const { currentTheme } = useTheme();
  
  // Get theme colors
  const primaryColor = currentTheme?.colors?.primary || '#3d3a72';
  const secondaryColor = currentTheme?.colors?.secondary || '#e77726';

  // Base button classes
  const baseClasses = 'btn';
  
  // Inline styles for dynamic theming based on styleGuide3
  const getInlineStyles = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: primaryColor,
        color: '#ffffff',
        border: 'none',
        fontWeight: '500',
        cursor: 'pointer'
      } as React.CSSProperties;
    } else if (variant === 'secondary') {
      return {
        backgroundColor: secondaryColor,
        color: '#ffffff',
        border: 'none',
        fontWeight: '500',
        cursor: 'pointer'
      } as React.CSSProperties;
    } else if (variant === 'ghost') {
      return {
        backgroundColor: 'transparent',
        color: '#374151',
        border: '1px solid #d1d5db',
        fontWeight: '500',
        cursor: 'pointer'
      } as React.CSSProperties;
    }
    return {};
  };

  // Size styles based on styleGuide3
  const getSizeStyles = () => {
    const sizeMap = {
      xs: { padding: '4px 12px', fontSize: '12px', borderRadius: '4px' },
      sm: { padding: '8px 16px', fontSize: '12px', borderRadius: '6px' },
      md: { padding: '10px 20px', fontSize: '16px', borderRadius: '6px' },
      lg: { padding: '12px 24px', fontSize: '18px', borderRadius: '6px' }
    };
    return sizeMap[size];
  };

  const combinedClassName = [
    'inline-flex items-center justify-center transition-all duration-200',
    loading ? 'opacity-50 cursor-not-allowed' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');

  const combinedStyles = {
    ...getInlineStyles(),
    ...getSizeStyles(),
    ...(loading || disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {})
  };

  return (
    <button
      className={combinedClassName}
      style={combinedStyles}
      disabled={disabled || loading}
      onMouseOver={(e) => {
        if (!disabled && !loading) {
          (e.target as HTMLElement).style.opacity = '0.9';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled && !loading) {
          (e.target as HTMLElement).style.opacity = '1';
        }
      }}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;