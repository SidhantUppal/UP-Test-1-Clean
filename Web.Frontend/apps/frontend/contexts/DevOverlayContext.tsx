'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevOverlayContextType {
  isOverlayEnabled: boolean;
  toggleOverlay: () => void;
  highlightedElement: string | null;
  setHighlightedElement: (id: string | null) => void;
}

const DevOverlayContext = createContext<DevOverlayContextType | undefined>(undefined);

export function DevOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOverlayEnabled, setIsOverlayEnabled] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);

  // Toggle overlay with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsOverlayEnabled(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Only enable in development
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  const toggleOverlay = () => {
    setIsOverlayEnabled(prev => !prev);
  };

  return (
    <DevOverlayContext.Provider
      value={{
        isOverlayEnabled,
        toggleOverlay,
        highlightedElement,
        setHighlightedElement,
      }}
    >
      {children}
    </DevOverlayContext.Provider>
  );
}

export function useDevOverlay() {
  const context = useContext(DevOverlayContext);
  if (context === undefined) {
    // Return a default context if not in provider (for production)
    return {
      isOverlayEnabled: false,
      toggleOverlay: () => {},
      highlightedElement: null,
      setHighlightedElement: () => {},
    };
  }
  return context;
}