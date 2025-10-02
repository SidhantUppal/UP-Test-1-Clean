import React from 'react';
import { walksTheme } from '../config/theme';

interface StatisticsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  icon?: React.ReactNode;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  color = walksTheme.colors.primary,
  icon
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;

    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };

  return (
    <div className={walksTheme.cards.statistics}>
      <div className="flex items-start justify-between mb-2">
        <h3 className={walksTheme.typography.cardTitle}>{title}</h3>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className={walksTheme.typography.statValue} style={{ color }}>
            {value}
          </p>
          {subtitle && (
            <p className={walksTheme.typography.statLabel}>
              {subtitle}
            </p>
          )}
        </div>
        {trend && <div className="mb-1">{getTrendIcon()}</div>}
      </div>
    </div>
  );
};