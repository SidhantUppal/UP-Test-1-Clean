import React from 'react';
import Link from 'next/link';
import { walksTheme } from '../config/theme';

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  badge?: {
    text: string;
    variant: 'info' | 'warning' | 'error' | 'success';
  };
  disabled?: boolean;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  href,
  icon,
  badge,
  disabled = false
}) => {
  const getBadgeStyles = (variant: string) => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const content = (
    <div className={`${walksTheme.cards.quickAction} h-full min-h-[120px] md:min-h-[140px] flex flex-col ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600 mr-3">
            {icon}
          </div>
        )}
        {badge && (
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getBadgeStyles(badge.variant)}`}>
            {badge.text}
          </span>
        )}
      </div>

      <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-600 flex-grow">{description}</p>

      <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
        <span>View Details</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );

  if (disabled) {
    return <div className="block">{content}</div>;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
};