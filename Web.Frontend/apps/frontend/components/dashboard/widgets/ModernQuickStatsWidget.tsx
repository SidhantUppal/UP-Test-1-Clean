"use client";

import React, { useEffect, useState, useRef } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change: number;
  icon: string;
  color: string;
  bgGradient: string;
}

const statsData: Stat[] = [
  {
    label: 'Tasks Today',
    value: 8,
    suffix: '',
    prefix: '',
    change: 12,
    icon: '',
    color: '',
    bgGradient: ''
  },
  {
    label: 'Training Progress',
    value: 67,
    suffix: '%',
    prefix: '',
    change: 5,
    icon: '',
    color: '',
    bgGradient: ''
  },
  {
    label: 'Safety Score',
    value: 98,
    suffix: '%',
    prefix: '',
    change: 0,
    icon: '',
    color: '',
    bgGradient: ''
  },
  {
    label: 'Compliance',
    value: 94,
    suffix: '%',
    prefix: '',
    change: 2,
    icon: '',
    color: '',
    bgGradient: ''
  },
  {
    label: 'Active Incidents',
    value: 3,
    suffix: '',
    prefix: '',
    change: -25,
    icon: '',
    color: '',
    bgGradient: ''
  },
  {
    label: 'Team Members',
    value: 124,
    suffix: '',
    prefix: '',
    change: 8,
    icon: '',
    color: '',
    bgGradient: ''
  }
];

function AnimatedStatCard({ stat, index }: { stat: Stat; index: number }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // Animation duration in ms
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCurrentValue(stat.value);
          clearInterval(timer);
        } else {
          setCurrentValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, stat.value]);

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-2xl p-6 
        transform transition-all duration-700 hover:scale-105 hover:shadow-2xl
        bg-white border border-gray-100 shadow-lg
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
        background: `linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)`
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col mb-4">
          <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-gray-900">
              {stat.prefix}{currentValue}{stat.suffix}
            </span>
          </div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center gap-2">
          <div className={`
            flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold
            ${stat.change > 0 
              ? 'bg-green-100 text-green-700' 
              : stat.change < 0 
              ? 'bg-red-100 text-red-700' 
              : 'bg-gray-100 text-gray-700'}
          `}>
            {stat.change > 0 && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {stat.change < 0 && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span>{Math.abs(stat.change)}%</span>
          </div>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>

        {/* Progress Bar */}
        {stat.suffix === '%' && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-2000 ease-out rounded-full"
                style={{ 
                  width: isVisible ? `${currentValue}%` : '0%',
                  transition: 'width 2s ease-out'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

interface ModernQuickStatsWidgetProps {
  id: string;
  isEditMode?: boolean;
  fullWidth?: boolean;
}

export default function ModernQuickStatsWidget({ 
  id, 
  isEditMode,
  fullWidth = true 
}: ModernQuickStatsWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`w-full ${!fullWidth ? 'max-w-7xl mx-auto' : ''}`}>
      <div className="mb-8">
        <div className={`
          grid gap-4
          ${fullWidth 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}
        `}>
          {statsData.map((stat, index) => (
            <AnimatedStatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}