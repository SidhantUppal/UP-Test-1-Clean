"use client";

import { ReactNode } from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon?: ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const colorStyles = {
  primary: {
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  success: {
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  warning: {
    text: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  danger: {
    text: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200'
  },
  info: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  }
};

const sizeStyles = {
  sm: {
    card: 'p-4',
    value: 'text-2xl',
    title: 'text-sm',
    subtitle: 'text-xs'
  },
  md: {
    card: 'p-6',
    value: 'text-3xl',
    title: 'text-base',
    subtitle: 'text-sm'
  },
  lg: {
    card: 'p-8',
    value: 'text-4xl',
    title: 'text-lg',
    subtitle: 'text-base'
  }
};

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  color = 'primary', 
  size = 'md' 
}: KPICardProps) => {
  const colorStyle = colorStyles[color];
  const sizeStyle = sizeStyles[size];

  const getTrendColor = (trendValue: number) => {
    if (trendValue > 0) return 'text-green-600';
    if (trendValue < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trendValue: number) => {
    if (trendValue > 0) return '↗️';
    if (trendValue < 0) return '↘️';
    return '→';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${sizeStyle.card}`}>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h3 className={`${sizeStyle.title} font-semibold text-gray-700 mb-2`}>{title}</h3>
          <p className={`${sizeStyle.value} font-bold`} style={{ color: '#3d3a72' }}>{value}</p>
          {subtitle && (
            <p className={`${sizeStyle.subtitle} text-gray-500 mt-1`}>{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center justify-center gap-1 mt-2 ${sizeStyle.subtitle}`}>
              <span className={getTrendColor(trend.value)}>
                {getTrendIcon(trend.value)} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    isPositive?: boolean;
  };
  accent?: string;
}

export const StatCard = ({ label, value, change, accent = '#3d3a72' }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold mt-2" style={{ color: accent }}>
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2 text-sm">
              <span className={`${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-gray-500 ml-1">{change.period}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface MetricGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}

export const MetricGrid = ({ children, cols = 4 }: MetricGridProps) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-6`}>
      {children}
    </div>
  );
};

interface ReportSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const ReportSection = ({ title, description, children, actions }: ReportSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

interface AlertCardProps {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const AlertCard = ({ type, title, message, action }: AlertCardProps) => {
  const alertStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '🚨'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️'
    }
  };

  const style = alertStyles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{style.icon}</span>
        <div className="flex-1">
          <h4 className={`font-semibold ${style.text}`}>{title}</h4>
          <p className={`text-sm ${style.text} mt-1`}>{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`mt-2 text-sm font-medium ${style.text} hover:underline`}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Default icons for common metrics
export const ChartBarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const ExclamationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

export const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);