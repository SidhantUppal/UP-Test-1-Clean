"use client";

import { useState, useEffect } from 'react';
import { loadLOCIElement } from '@/app/recycling_bin/LOCI_folders/LOCI/loader';
import type { LOCIElement } from '../../../../LOCI/types/loci.types';

interface LOCIButtonProps {
  elementId: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function LOCIButton({ elementId, children, className = '', onClick, type = 'button', disabled = false }: LOCIButtonProps) {
  const [lociData, setLociData] = useState<LOCIElement | null>(null);
  const [showLOCI, setShowLOCI] = useState(false);

  // Helper to get short element name (last 2 parts of ID)
  const getShortElementId = (fullId: string) => {
    const parts = fullId.split('_');
    return parts.slice(-2).join('_');
  };

  // Load LOCI data for this element
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadLOCIElement(elementId);
        setLociData(data);
      } catch (error) {
        console.warn(`LOCI: Could not load element ${elementId}:`, error);
      }
    };

    if (process.env.NODE_ENV === 'development') {
      loadData();
    }
  }, [elementId]);

  // Listen for global LOCI toggle state (simple approach for now)
  useEffect(() => {
    const checkLOCIState = () => {
      // Check for LOCI debug toggle specifically
      const lociToggle = document.getElementById('loci-debug-toggle') as HTMLInputElement;
      if (lociToggle) {
        setShowLOCI(lociToggle.checked);
      }
    };

    // Check initially and set up polling (simple approach)
    checkLOCIState();
    const interval = setInterval(checkLOCIState, 500);

    return () => clearInterval(interval);
  }, []);

  const handleElementClick = () => {
    if (showLOCI && lociData) {
      console.log('🔍 LOCI Element clicked:', elementId, lociData);
      alert(`LOCI Element: ${elementId}\nStatus: ${lociData.status}\nAction: ${lociData.info.action}`);
    }
  };

  return (
    <div className="relative">
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      
      {/* LOCI Overlay */}
      {showLOCI && process.env.NODE_ENV === 'development' && (
        <div 
          className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md shadow-lg border-2 z-40 cursor-pointer hover:bg-orange-600"
          onClick={handleElementClick}
        >
          <span className="font-mono">{getShortElementId(elementId)}</span>
        </div>
      )}
    </div>
  );
}