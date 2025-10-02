"use client";

import React from 'react';
import Link from 'next/link';

interface BehaviouralSafetyStatsWidgetProps {
  id: string;
  isEditMode: boolean;
}

export default function BehaviouralSafetyStatsWidget({ id, isEditMode }: BehaviouralSafetyStatsWidgetProps) {
  const safetyStats = {
    todayReports: 47,
    activeSaves: 8,
    teamPoints: 1840,
    participationRate: 76,
    interventions: 23,
    coachingOpportunities: 12,
    totalObservations: 324,
    weeklyTrend: '+18%'
  };

  return (
    <div className="h-full p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        {isEditMode ? (
          <h3 className="text-lg font-semibold text-gray-900">Safety Overview</h3>
        ) : (
          <Link href="/incidents/behaviour" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
            Safety Overview
          </Link>
        )}
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{safetyStats.todayReports}</div>
          <div className="text-sm text-gray-600">Today's Reports</div>
          <div className="text-xs text-gray-500 mt-1">+12 from yesterday</div>
        </div>
        
        <div className="bg-teal-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-teal-600">{safetyStats.activeSaves}</div>
          <div className="text-sm text-gray-600">Active Saves</div>
          <div className="text-xs text-gray-500 mt-1">Incidents prevented</div>
        </div>
        
        <div className="bg-emerald-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-emerald-600">{safetyStats.teamPoints}</div>
          <div className="text-sm text-gray-600">Team Points</div>
          <div className="text-xs text-green-500 mt-1">This week</div>
        </div>
        
        <div className="bg-cyan-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-cyan-600">{safetyStats.participationRate}%</div>
          <div className="text-sm text-gray-600">Participation</div>
          <div className="text-xs text-gray-500 mt-1">Active users today</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Interventions</span>
            <div className="text-lg font-semibold text-gray-900">{safetyStats.interventions}</div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">Weekly Trend</span>
            <div className="text-lg font-semibold text-green-600">{safetyStats.weeklyTrend}</div>
          </div>
        </div>
      </div>
    </div>
  );
}