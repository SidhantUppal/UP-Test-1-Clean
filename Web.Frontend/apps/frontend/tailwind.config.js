/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'loci-dark': '#0A0A0F',
        'loci-darker': '#12121A',
        'loci-cyan': '#00F5FF',
        'loci-magenta': '#FF00F5',
        'loci-success': '#00FF88',
        'loci-warning': '#FFB800',
        'loci-error': '#FF0055',
        'loci-text-secondary': '#8B8B9F',
        'loci-border': 'rgba(255, 255, 255, 0.1)',
        
        // T100 Design System Colors (from styleGuide3)
        'theme-primary': 'var(--color-primary)',
        'theme-secondary': 'var(--color-secondary)',
        'theme-accent': 'var(--color-accent)',
        'theme-neutral': 'var(--color-neutral)',
        'theme-success': 'var(--color-success)',
        'theme-warning': 'var(--color-warning)',
        'theme-error': 'var(--color-error)',
        'theme-background': 'var(--color-background)',
        'theme-surface': 'var(--color-surface)',
        'theme-text-primary': 'var(--color-text-primary)',
        'theme-text-secondary': 'var(--color-text-secondary)',
        'theme-border': 'var(--color-border)',
        'theme-hover': 'var(--color-hover)',
        
        // Status Colors (from styleGuide3)
        'status-active': 'var(--color-status-active)',
        'status-pending': 'var(--color-status-pending)',
        'status-expired': 'var(--color-status-expired)',
        'status-draft': 'var(--color-status-draft)',
        'status-approved': 'var(--color-status-approved)',
        
        // Priority Colors (from styleGuide3)
        'priority-critical': 'var(--color-priority-critical)',
        'priority-high': 'var(--color-priority-high)',
        'priority-medium': 'var(--color-priority-medium)',
        'priority-low': 'var(--color-priority-low)',
        
        // Privacy Colors (from styleGuide3)
        'privacy-public': 'var(--color-privacy-public)',
        'privacy-private': 'var(--color-privacy-private)',
        'privacy-confidential': 'var(--color-privacy-confidential)',
        'privacy-secret': 'var(--color-privacy-secret)',
      },
      backgroundColor: {
        'loci-glass': 'rgba(18, 18, 26, 0.7)',
      },
      boxShadow: {
        'loci-glow-cyan': '0 0 20px rgba(0, 245, 255, 0.5), inset 0 0 20px rgba(0, 245, 255, 0.1)',
        'loci-glow-magenta': '0 0 20px rgba(255, 0, 245, 0.5), inset 0 0 20px rgba(255, 0, 245, 0.1)',
        'loci-card': '0 8px 32px rgba(0, 245, 255, 0.1)',
        
        // T100 Design System Shadows (from styleGuide3)
        'design-sm': 'var(--shadow-sm)',
        'design-md': 'var(--shadow-md)',
        'design-lg': 'var(--shadow-lg)',
        'design-xl': 'var(--shadow-xl)',
      },
      spacing: {
        // T100 Design System Spacing (from styleGuide3)
        'design-xs': 'var(--spacing-xs)',
        'design-sm': 'var(--spacing-sm)',
        'design-md': 'var(--spacing-md)',
        'design-lg': 'var(--spacing-lg)',
        'design-xl': 'var(--spacing-xl)',
      },
      borderRadius: {
        // T100 Design System Border Radius (from styleGuide3)
        'design-sm': 'var(--radius-sm)',
        'design-md': 'var(--radius-md)',
        'design-lg': 'var(--radius-lg)',
        'design-xl': 'var(--radius-xl)',
        'design-full': 'var(--radius-full)',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'theme': ['var(--font-family)', 'system-ui', 'sans-serif'],
        'theme-heading': ['var(--font-heading)', 'system-ui', 'sans-serif']
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'default': {
          'primary': '#3d3a72',
          'secondary': '#e77726',
          'accent': '#06b6d4',
          'neutral': '#6b7280',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          'success': '#10b981',
          'warning': '#f59e0b',
          'error': '#ef4444',
        },
        'acme-corporate': {
          'primary': '#1e40af',
          'secondary': '#7c3aed',
          'accent': '#059669',
          'neutral': '#6b7280',
          'base-100': '#ffffff',
          'base-200': '#f3f4f6',
          'base-300': '#e5e7eb',
          'success': '#10b981',
          'warning': '#f59e0b',
          'error': '#ef4444',
        },
        'techco-modern': {
          'primary': '#dc2626',
          'secondary': '#ea580c',
          'accent': '#0891b2',
          'neutral': '#64748b',
          'base-100': '#ffffff',
          'base-200': '#fef3c7',
          'base-300': '#fde68a',
          'success': '#16a34a',
          'warning': '#ca8a04',
          'error': '#dc2626',
        }
      }
    ],
  },
};