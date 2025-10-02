'use client';

import React from 'react';

export interface BadgeProps {
  variant?: 'status' | 'priority' | 'privacy';
  type: string;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'status',
  type,
  children,
  className = ''
}) => {
  // Get styles based on variant and type from styleGuide3
  const getStyles = () => {
    if (variant === 'status') {
      const statusStyles = {
        'Active': 'bg-green-100 text-green-800',
        'Pending': 'bg-yellow-100 text-yellow-800', 
        'Expired': 'bg-red-100 text-red-800',
        'Draft': 'bg-gray-100 text-gray-800',
        'Approved': 'bg-blue-100 text-blue-800'
      };
      return statusStyles[type as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
    }
    
    if (variant === 'priority') {
      const priorityStyles = {
        'Critical': 'bg-red-600 text-white',
        'High': 'bg-orange-500 text-white',
        'Medium': 'bg-yellow-500 text-white',
        'Low': 'bg-green-500 text-white'
      };
      return priorityStyles[type as keyof typeof priorityStyles] || 'bg-gray-500 text-white';
    }
    
    if (variant === 'privacy') {
      const privacyStyles = {
        'Public': 'bg-green-100 text-green-800',
        'Private': 'bg-blue-100 text-blue-800',
        'Confidential': 'bg-orange-100 text-orange-800', 
        'Secret': 'bg-red-100 text-red-800'
      };
      return privacyStyles[type as keyof typeof privacyStyles] || 'bg-gray-100 text-gray-800';
    }
    
    return 'bg-gray-100 text-gray-800';
  };

  // Base badge classes from styleGuide3
  const baseClasses = 'inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full';
  
  const combinedClassName = [
    baseClasses,
    getStyles(),
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
};

export default Badge;