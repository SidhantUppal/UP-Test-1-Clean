// Theme configuration for T100 Platform
// This file defines all available themes and organization mappings

export interface ThemeConfig {
  id: string;
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
  };
  branding: {
    logo: string;
    logoAlt?: string;
    favicon: string;
    companyName: string;
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
  };
  customCSS?: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  'acme-corp': {
    id: 'acme-corp',
    name: 'acme-corporate',
    displayName: 'Acme Corporation',
    colors: {
      primary: '#1e40af',      // Corporate blue
      secondary: '#7c3aed',    // Purple accent
      accent: '#059669',       // Success green
      neutral: '#6b7280',      // Gray
      success: '#10b981',      // Green
      warning: '#f59e0b',      // Amber
      error: '#ef4444',        // Red
      background: '#ffffff',   // White
      surface: '#f9fafb'       // Light gray
    },
    branding: {
      logo: '/themes/assets/logos/acme-corp.svg',
      logoAlt: 'Acme Corporation',
      favicon: '/themes/assets/favicons/acme-corp.svg',
      companyName: 'Acme Corporation'
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  },
  'techco-ltd': {
    id: 'techco-ltd',
    name: 'techco-modern',
    displayName: 'TechCo Ltd',
    colors: {
      primary: '#dc2626',      // Tech red
      secondary: '#ea580c',    // Orange accent
      accent: '#0891b2',       // Cyan
      neutral: '#64748b',      // Slate
      success: '#16a34a',      // Green
      warning: '#ca8a04',      // Yellow
      error: '#dc2626',        // Red
      background: '#ffffff',   // White
      surface: '#f8fafc'       // Slate 50
    },
    branding: {
      logo: '/themes/assets/logos/techco-ltd.svg',
      logoAlt: 'TechCo Ltd',
      favicon: '/themes/assets/favicons/techco-ltd.svg',
      companyName: 'TechCo Ltd'
    },
    typography: {
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  },
  'default': {
    id: 'default',
    name: 'default',
    displayName: 'T100 Default',
    colors: {
      primary: '#3d3a72',      // Purple
      secondary: '#e77726',    // Orange
      accent: '#06b6d4',       // Cyan 500
      neutral: '#6b7280',      // Gray 500
      success: '#10b981',      // Emerald 500
      warning: '#f59e0b',      // Amber 500
      error: '#ef4444',        // Red 500
      background: '#ffffff',   // White
      surface: '#f9fafb'       // Gray 50
    },
    branding: {
      logo: '/themes/assets/logos/default.svg',
      logoAlt: 'T100 Platform',
      favicon: '/favicon.ico',
      companyName: 'T100'
    },
    typography: {
      fontFamily: 'system-ui, sans-serif'
    }
  }
};

// Organisation to theme mapping
export const ORGANISATION_THEMES: Record<string, string> = {
  'acme-corp': 'acme-corp',
  'techco-ltd': 'techco-ltd',
  'demo-org-1': 'acme-corp',
  'demo-org-2': 'techco-ltd',
  'default': 'default'
};

// Helper function to get theme for organisation
export function getThemeForOrganisation(orgId: string): ThemeConfig {
  const themeId = ORGANISATION_THEMES[orgId] || 'default';
  return THEMES[themeId] || THEMES.default;
}

// Helper function to get all available organisations
export function getAvailableOrganisations() {
  return [
    { id: 'default', name: 'T100 Platform', description: 'Default T100 theme' },
    { id: 'acme-corp', name: 'Acme Corporation', description: 'Corporate blue theme' },
    { id: 'techco-ltd', name: 'TechCo Ltd', description: 'Modern red theme' },
    { id: 'demo-org-1', name: 'Demo Organisation 1', description: 'Demo using Acme theme' },
    { id: 'demo-org-2', name: 'Demo Organisation 2', description: 'Demo using TechCo theme' }
  ];
}