'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, THEMES, ORGANISATION_THEMES, getAvailableOrganisations } from '@/themes/config';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  currentOrganisation: string;
  switchOrganisation: (orgId: string) => void;
  switchTheme: (themeId: string) => void;
  availableThemes: ThemeConfig[];
  availableOrganisations: ReturnType<typeof getAvailableOrganisations>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentOrganisation, setCurrentOrganisation] = useState<string>('default');
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEMES.default);
  const [isMounted, setIsMounted] = useState(false);

  // Load organisation from localStorage or URL
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const savedOrg = localStorage.getItem('t100-organization');
      const urlOrg = new URLSearchParams(window.location.search).get('org');
      const orgId = urlOrg || savedOrg || 'default';
      
      setCurrentOrganisation(orgId);
      applyTheme(orgId);
    }
  }, []);

  const applyTheme = (orgId: string) => {
    const themeId = ORGANISATION_THEMES[orgId] || 'default';
    const theme = THEMES[themeId] || THEMES.default;
    
    setCurrentTheme(theme);
    
    // Only apply DOM changes on client side
    if (typeof window !== 'undefined') {
      // Apply CSS variables
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    
    // Apply typography
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    if (theme.typography.headingFont) {
      root.style.setProperty('--font-heading', theme.typography.headingFont);
    }
      
      // Update favicon
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        favicon.href = theme.branding.favicon;
      }
      
      // Update page title
      document.title = `${theme.branding.companyName} - T100`;
      
      // Apply custom CSS if provided
      if (theme.customCSS) {
        let customStyleElement = document.getElementById('theme-custom-css');
        if (!customStyleElement) {
          customStyleElement = document.createElement('style');
          customStyleElement.id = 'theme-custom-css';
          document.head.appendChild(customStyleElement);
        }
        customStyleElement.textContent = theme.customCSS;
      }
    }
  };

  const switchOrganisation = (orgId: string) => {
    setCurrentOrganisation(orgId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('t100-organization', orgId);
    }
    applyTheme(orgId);
  };

  const switchTheme = (themeId: string) => {
    const theme = THEMES[themeId];
    if (theme) {
      setCurrentTheme(theme);
      applyTheme(currentOrganisation);
    }
  };

  const availableThemes = Object.values(THEMES);
  const availableOrganisations = getAvailableOrganisations();

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      currentOrganisation,
      switchOrganisation,
      switchTheme,
      availableThemes,
      availableOrganisations
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}