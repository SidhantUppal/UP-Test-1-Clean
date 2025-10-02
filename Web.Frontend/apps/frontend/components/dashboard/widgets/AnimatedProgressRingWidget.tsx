"use client";

import React, { useEffect, useState, useRef } from 'react';
import DashboardWidget from '@/components/dashboard/DashboardWidget';

interface ProgressRingProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
  label: string;
  isVisible: boolean;
  delay: number;
}

const AnimatedProgressRing = ({ percentage, size, strokeWidth, color, label, isVisible, delay }: ProgressRingProps) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (currentPercentage / 100) * circumference;

  useEffect(() => {
    if (isVisible) {
      // Start animation after delay
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = percentage / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= percentage) {
            setCurrentPercentage(percentage);
            setShowNumber(true);
            clearInterval(interval);
          } else {
            setCurrentPercentage(current);
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, delay]);

  return (
    <div className={`flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
         style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-[2000ms] ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold text-gray-700 transition-all duration-500 ${showNumber ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            {Math.floor(currentPercentage)}%
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center">{label}</p>
    </div>
  );
};

interface AnimatedProgressRingWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function AnimatedProgressRingWidget({ id, isEditMode, onRemove }: AnimatedProgressRingWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const progressData = [
    { percentage: 67, color: '#3b82f6', label: 'Training Complete' },
    { percentage: 94, color: '#10b981', label: 'Safety Compliance' },
    { percentage: 82, color: '#8b5cf6', label: 'Document Review' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => {
      if (widgetRef.current) {
        observer.unobserve(widgetRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div ref={widgetRef}>
      <DashboardWidget 
        id={id}
        title="Progress Overview" 
        type="progress"
        isEditMode={isEditMode}
        onRemove={onRemove}
      >
        <div className="grid grid-cols-3 gap-4">
          {progressData.map((progress, index) => (
            <AnimatedProgressRing
              key={index}
              percentage={progress.percentage}
              size={80}
              strokeWidth={6}
              color={progress.color}
              label={progress.label}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </DashboardWidget>
    </div>
  );
}