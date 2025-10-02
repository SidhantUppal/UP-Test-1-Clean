"use client";

import { Hazard, getSeverityColor } from '@/types/hazard.types';

interface MobileHazardCardProps {
  hazard: Hazard;
}

export default function MobileHazardCard({ hazard }: MobileHazardCardProps) {
  const severityColor = hazard.severity ? getSeverityColor(hazard.severity) : '#6b7280';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
      {/* Header with Hazard Name and Severity Badge */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm text-gray-900 flex-1 pr-2">
          {hazard.hazardName || 'Unnamed Hazard'}
        </h3>
        <span
          className="px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap"
          style={{
            backgroundColor: `${severityColor}20`,
            color: severityColor,
            border: `1px solid ${severityColor}50`
          }}
        >
          {hazard.severity || 'Not Set'}
        </span>
      </div>

      {/* Description */}
      {hazard.hazardDescription && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {hazard.hazardDescription}
        </p>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{hazard.locationName || 'Not specified'}</span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-1 text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="truncate">{hazard.categoryTypeName || 'Uncategorized'}</span>
        </div>

        {/* Assigned To */}
        <div className="flex items-center gap-1 text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="truncate">
            {hazard.assignedToUserName || hazard.assignedToRoleName || 'Unassigned'}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${hazard.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className={`text-xs ${hazard.isActive ? 'text-green-700' : 'text-gray-500'}`}>
            {hazard.isActive ? 'Active' : 'Archived'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <button className="flex-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors">
          View Details
        </button>
        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors">
          Quick Action
        </button>
      </div>
    </div>
  );
}