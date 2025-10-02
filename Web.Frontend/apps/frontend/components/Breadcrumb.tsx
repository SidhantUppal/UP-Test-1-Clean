"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buildBreadcrumbTrail, getIconSvg } from '@/lib/breadcrumbConfig';

interface BreadcrumbProps {
  className?: string;
  maxItems?: number;
  showHome?: boolean;
  showIcons?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className = '',
  maxItems = 5,
  showHome = true,
  showIcons = true
}) => {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on root home page or admin routes
  if (pathname === '/' || pathname?.startsWith('/admin')) {
    return null;
  }
  
  try {
    const trail = buildBreadcrumbTrail(pathname);
  
  // Filter out home if showHome is false
  const filteredTrail = showHome ? trail : trail.filter(item => item.href !== '/');
  
  // Truncate if too many items
  let displayTrail = filteredTrail;
  if (filteredTrail.length > maxItems) {
    displayTrail = [
      ...filteredTrail.slice(0, 2),
      { label: '...', href: undefined },
      ...filteredTrail.slice(-(maxItems - 3))
    ];
  }
  
  // Show breadcrumbs if we have at least 1 item
  if (displayTrail.length < 1) {
    return null;
  }
  
  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-700 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {displayTrail.map((item, index) => {
          const isLast = index === displayTrail.length - 1;
          const isEllipsis = item.label === '...';
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg 
                  className="w-4 h-4 mx-2 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              )}
              
              {isEllipsis ? (
                <span className="text-gray-400">...</span>
              ) : isLast ? (
                <span className="flex items-center font-medium text-gray-900">
                  {showIcons && item.icon && (
                    <span className="mr-2" dangerouslySetInnerHTML={{ __html: getIconSvg(item.icon) }} />
                  )}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="flex items-center hover:text-gray-900 transition-colors"
                >
                  {showIcons && item.icon && (
                    <span className="mr-2" dangerouslySetInnerHTML={{ __html: getIconSvg(item.icon) }} />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
  } catch (error) {
    console.error('Breadcrumb error:', error);
    return null;
  }
};

export default Breadcrumb;