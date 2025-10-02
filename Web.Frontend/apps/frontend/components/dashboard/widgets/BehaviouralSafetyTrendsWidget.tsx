"use client";

import React from 'react';
import Link from 'next/link';

interface BehaviouralSafetyTrendsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyTrendsWidget({ id, isEditMode }: BehaviouralSafetyTrendsWidgetProps) {
  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      {isEditMode ? (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Trends</h3>
      ) : (
        <Link href="/incidents/behaviour/insights" className="text-lg font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer block">
          Safety Trends
        </Link>
      )}
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">📈</div>
        <p className="text-sm">Behavioral safety trends widget coming soon</p>
      </div>
    </div>
  );
}