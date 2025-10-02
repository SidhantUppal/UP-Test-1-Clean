'use client';

import React from 'react';

export interface CardProps {
  variant?: 'default' | 'compact';
  children: React.ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Main Card component from styleGuide3
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = ''
}) => {
  const baseClasses = variant === 'compact' 
    ? 'bg-white rounded-lg shadow-sm border border-gray-200'
    : 'bg-white rounded-lg shadow-md';
  
  const combinedClassName = [
    baseClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

// Card Header from styleGuide3
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = ''
}) => {
  const combinedClassName = [
    'px-6 py-4 border-b border-gray-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

// Card Body from styleGuide3
export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = ''
}) => {
  const combinedClassName = [
    'p-6',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

// Card Footer from styleGuide3
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = ''
}) => {
  const combinedClassName = [
    'px-6 py-3 border-t border-gray-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Card;