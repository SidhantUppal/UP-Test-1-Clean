"use client";

import { useState, useEffect } from 'react';
import { loadLOCIElement } from '@/app/recycling_bin/LOCI_folders/LOCI/loader';
import type { LOCIElement } from '../../../../LOCI/types/loci.types';

interface LOCIInputProps {
  elementId: string;
  className?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LOCIInput({ elementId, className = '', placeholder, type = 'text', value, onChange }: LOCIInputProps) {
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

  // Listen for global LOCI toggle state
  useEffect(() => {
    const checkLOCIState = () => {
      const lociToggle = document.getElementById('loci-debug-toggle') as HTMLInputElement;
      if (lociToggle) {
        setShowLOCI(lociToggle.checked);
      }
    };

    checkLOCIState();
    const interval = setInterval(checkLOCIState, 500);

    return () => clearInterval(interval);
  }, []);

  const handleElementClick = () => {
    if (showLOCI && lociData) {
      console.log('🔍 LOCI Element clicked:', elementId, lociData);
      alert(`LOCI Element: ${elementId}\nStatus: ${lociData.status}\nValidation: ${lociData.validation ? 'Yes' : 'No'}`);
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      
      {/* LOCI Overlay */}
      {showLOCI && process.env.NODE_ENV === 'development' && (
        <div 
          className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow-lg border-2 z-40 cursor-pointer hover:bg-green-600"
          onClick={handleElementClick}
        >
          <span className="font-mono">{getShortElementId(elementId)}</span>
        </div>
      )}
    </div>
  );
}