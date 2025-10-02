'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IncidentsByTypeWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function IncidentsByTypeWidget({ id, isEditMode }: IncidentsByTypeWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedData, setAnimatedData] = useState({
    thisMonth: [0, 0, 0, 0, 0],
    lastMonth: [0, 0, 0, 0, 0]
  });
  const widgetRef = useRef<HTMLDivElement>(null);

  const targetData = {
    thisMonth: [12, 8, 5, 9, 3],
    lastMonth: [15, 6, 7, 11, 4]
  };

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

  useEffect(() => {
    if (isVisible) {
      const duration = 1500;
      const steps = 30;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        setAnimatedData({
          thisMonth: targetData.thisMonth.map(val => Math.floor(val * easeProgress)),
          lastMonth: targetData.lastMonth.map(val => Math.floor(val * easeProgress))
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const data = {
    labels: ['Slip/Trip', 'Equipment', 'Chemical', 'Manual Handling', 'Environmental'],
    datasets: [
      {
        label: 'This Month',
        data: animatedData.thisMonth,
        backgroundColor: '#3B82F6',
        borderRadius: 4,
      },
      {
        label: 'Last Month',
        data: animatedData.lastMonth,
        backgroundColor: '#94A3B8',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 20,
        grid: {
          color: '#f3f4f6',
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const totalThisMonth = targetData.thisMonth.reduce((a, b) => a + b, 0);
  const totalLastMonth = targetData.lastMonth.reduce((a, b) => a + b, 0);
  const changePercent = Math.round(((totalThisMonth - totalLastMonth) / totalLastMonth) * 100);
  const animatedTotal = animatedData.thisMonth.reduce((a, b) => a + b, 0);

  return (
    <Link href="/incidents" className="block h-full">
      <div 
        ref={widgetRef}
        className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-full hover:shadow-md transition-all duration-700 cursor-pointer
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Incidents by Type</h3>
          <div className="text-right">
            <div className="text-xs text-gray-500">This Month</div>
            <div className="text-2xl font-bold text-gray-800">{animatedTotal}</div>
            <div className={`text-xs ${changePercent < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changePercent > 0 ? '+' : ''}{changePercent}%
            </div>
          </div>
        </div>
        
        <div className="h-48 mb-4 pointer-events-none">
          <Bar data={data} options={options} />
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-600">{animatedData.thisMonth[0]}</div>
            <div className="text-xs text-blue-700">Highest: Slip/Trip</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-lg font-bold text-gray-600">{animatedData.thisMonth[4]}</div>
            <div className="text-xs text-gray-700">Lowest: Environmental</div>
          </div>
        </div>
      </div>
    </Link>
  );
}