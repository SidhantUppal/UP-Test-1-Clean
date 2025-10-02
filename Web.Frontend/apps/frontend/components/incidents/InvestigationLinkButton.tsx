"use client";

import { useState } from 'react';
import Link from 'next/link';

interface InvestigationLinkButtonProps {
  incidentId: string;
  incidentCaseNumber?: string;
  existingInvestigationId?: string;
  className?: string;
}

export default function InvestigationLinkButton({
  incidentId,
  incidentCaseNumber,
  existingInvestigationId,
  className = ''
}: InvestigationLinkButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleStartInvestigation = () => {
    setLoading(true);
    // The loading state will be handled by navigation
  };

  if (existingInvestigationId) {
    // Continue existing investigation
    return (
      <Link
        href={`/incidents/tools/investigation?incidentId=${incidentId}&investigationId=${existingInvestigationId}`}
        style={{ 
          backgroundColor: '#3d3a72', 
          color: '#ffffff', 
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: '500',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'opacity 0.2s',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}
        className={`hover:opacity-80 ${className}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Continue Investigation
      </Link>
    );
  }

  // Start new investigation
  return (
    <Link
      href={`/incidents/tools/investigation?incidentId=${incidentId}`}
      onClick={handleStartInvestigation}
      style={{ 
        backgroundColor: '#3d3a72', 
        color: '#ffffff', 
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        fontWeight: '500',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        transition: 'opacity 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        opacity: loading ? '0.75' : '1'
      }}
      className={`hover:opacity-80 ${className}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )}
      {loading ? 'Starting...' : (
        <div className="flex flex-col items-start">
          <span>Start Barrier Analysis</span>
          <div className="text-xs opacity-90">
            {incidentCaseNumber ? `Case: ${incidentCaseNumber}` : 'Auto-populate from incident'}
          </div>
        </div>
      )}
    </Link>
  );
}