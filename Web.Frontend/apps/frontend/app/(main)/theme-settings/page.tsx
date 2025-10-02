'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { THEMES, ORGANISATION_THEMES, ThemeConfig } from '@/themes/config';

export default function ThemeSettingsPage() {
  const { currentTheme, switchOrganisation, availableOrganisations } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.id);
  const [hasChanges, setHasChanges] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTheme, setNewTheme] = useState<Partial<ThemeConfig>>({
    id: '',
    name: '',
    displayName: '',
    colors: {
      primary: '#3d3a72',
      secondary: '#e77726',
      accent: '#06b6d4',
      neutral: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      background: '#ffffff',
      surface: '#f9fafb'
    },
    branding: {
      logo: '',
      logoAlt: '',
      favicon: '',
      companyName: ''
    },
    typography: {
      fontFamily: 'system-ui, sans-serif'
    }
  });
  
  // Convert THEMES object to array
  const themes = Object.values(THEMES);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setHasChanges(themeId !== currentTheme.id);
  };

  const handleUpdateTheme = () => {
    // Find organization that uses this theme
    const org = availableOrganisations.find(o => {
      const orgThemeId = ORGANISATION_THEMES[o.id] || 'default';
      return orgThemeId === selectedTheme;
    });
    
    if (org) {
      switchOrganisation(org.id);
      setHasChanges(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Following NewPage.md structure */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Theme Settings</h1>
            <p className="mt-1 text-sm text-gray-600">
              Customize the appearance of your workspace
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-theme-primary text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Theme
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-1">Available Themes</h2>
            <p className="text-sm text-gray-600">
              Select a theme to instantly change the look and feel of your application
            </p>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`relative bg-white rounded-lg border-2 transition-all cursor-pointer hover:shadow-lg ${
                  selectedTheme === theme.id
                    ? 'border-theme-primary shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Selected Indicator */}
                {selectedTheme === theme.id && (
                  <div className="absolute -top-3 -right-3 bg-theme-primary text-white rounded-full p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Theme Preview */}
                <div className="p-6">
                  {/* Theme Name and Organization */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{theme.displayName}</h3>
                    <p className="text-sm text-gray-600">{theme.branding.companyName}</p>
                  </div>

                  {/* Color Swatches */}
                  <div className="space-y-3">
                    {/* Company Colours */}
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Company Colours</p>
                      <div className="flex gap-2">
                        <div
                          className="w-12 h-12 rounded-md shadow-sm"
                          style={{ backgroundColor: theme.colors.primary }}
                          title="Primary"
                        />
                        <div
                          className="w-12 h-12 rounded-md shadow-sm"
                          style={{ backgroundColor: theme.colors.secondary }}
                          title="Secondary"
                        />
                      </div>
                    </div>

                    {/* Status Colors */}
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Status Colors</p>
                      <div className="flex gap-2">
                        <div
                          className="w-8 h-8 rounded-md shadow-sm"
                          style={{ backgroundColor: theme.colors.success }}
                          title="Success"
                        />
                        <div
                          className="w-8 h-8 rounded-md shadow-sm"
                          style={{ backgroundColor: theme.colors.warning }}
                          title="Warning"
                        />
                        <div
                          className="w-8 h-8 rounded-md shadow-sm"
                          style={{ backgroundColor: theme.colors.error }}
                          title="Error"
                        />
                      </div>
                    </div>

                    {/* Typography Preview */}
                    <div className="pt-2">
                      <p className="text-xs font-medium text-gray-700 mb-2">Typography</p>
                      <p
                        className="text-sm"
                        style={{ fontFamily: theme.typography.fontFamily }}
                      >
                        {theme.typography.fontFamily}
                      </p>
                    </div>
                  </div>

                  {/* Theme Description */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      {theme.id === 'default' && 'Modern and professional with purple and orange accents'}
                      {theme.id === 'acme-corp' && 'Corporate blue theme with clean, business-focused design'}
                      {theme.id === 'techco-ltd' && 'Bold red theme for a dynamic, tech-forward appearance'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Update Button */}
          {hasChanges && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpdateTheme}
                className="px-6 py-2 bg-theme-primary text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 font-medium"
              >
                Update Theme
              </button>
            </div>
          )}

          {/* Additional Settings Section */}
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Theme Information</h3>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                Themes automatically adjust all interface elements including buttons, forms, 
                navigation, and status indicators to match your selected color scheme.
              </p>
              <p>
                Your theme preference is saved locally and will persist across sessions. 
                The selected theme applies to all pages and components throughout the application.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-medium text-gray-700 mb-2">Current Theme Details:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Name: <span className="font-medium">{currentTheme.displayName}</span></li>
                  <li>• Organization: <span className="font-medium">{currentTheme.branding.companyName}</span></li>
                  <li>• Font: <span className="font-medium">{currentTheme.typography.fontFamily}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Theme Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Create New Theme</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="theme-id" className="block text-sm font-medium text-gray-700 mb-1">
                      Theme ID
                    </label>
                    <input
                      id="theme-id"
                      type="text"
                      placeholder="e.g., my-company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
                      value={newTheme.id}
                      onChange={(e) => setNewTheme({ ...newTheme, id: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <input
                      id="display-name"
                      type="text"
                      placeholder="e.g., My Company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
                      value={newTheme.displayName}
                      onChange={(e) => setNewTheme({ ...newTheme, displayName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      placeholder="e.g., My Company Ltd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
                      value={newTheme.branding?.companyName}
                      onChange={(e) => setNewTheme({ 
                        ...newTheme, 
                        branding: { ...newTheme.branding!, companyName: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Company Colours */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Company Colours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="primary-color" className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="primary-color"
                        type="color"
                        className="h-10 w-20"
                        value={newTheme.colors?.primary}
                        onChange={(e) => setNewTheme({
                          ...newTheme,
                          colors: { ...newTheme.colors!, primary: e.target.value }
                        })}
                      />
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
                        value={newTheme.colors?.primary}
                        onChange={(e) => setNewTheme({
                          ...newTheme,
                          colors: { ...newTheme.colors!, primary: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="secondary-color" className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="secondary-color"
                        type="color"
                        className="h-10 w-20"
                        value={newTheme.colors?.secondary}
                        onChange={(e) => setNewTheme({
                          ...newTheme,
                          colors: { ...newTheme.colors!, secondary: e.target.value }
                        })}
                      />
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
                        value={newTheme.colors?.secondary}
                        onChange={(e) => setNewTheme({
                          ...newTheme,
                          colors: { ...newTheme.colors!, secondary: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Typography</h3>
                <div>
                  <label htmlFor="font-family" className="block text-sm font-medium text-gray-700 mb-1">
                    Font Family
                  </label>
                  <select
                    id="font-family"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary"
                    value={newTheme.typography?.fontFamily}
                    onChange={(e) => setNewTheme({
                      ...newTheme,
                      typography: { ...newTheme.typography!, fontFamily: e.target.value }
                    })}
                  >
                    <option value="system-ui, sans-serif">System UI</option>
                    <option value="Inter, system-ui, sans-serif">Inter</option>
                    <option value="Roboto, system-ui, sans-serif">Roboto</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Georgia, serif">Georgia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Create a complete theme object
                  const completeTheme: ThemeConfig = {
                    id: newTheme.id || '',
                    name: newTheme.id || '', // Use id as name
                    displayName: newTheme.displayName || '',
                    colors: newTheme.colors!,
                    branding: {
                      ...newTheme.branding!,
                      logo: newTheme.branding?.logo || `/themes/assets/logos/${newTheme.id}.svg`,
                      favicon: newTheme.branding?.favicon || `/themes/assets/favicons/${newTheme.id}.svg`
                    },
                    typography: newTheme.typography!
                  };
                  
                  // For now, just log it. In a real app, you'd save this to the backend
                  console.log('New theme created:', completeTheme);
                  alert('Theme created! Note: In a real implementation, this would be saved to the backend.');
                  
                  setShowCreateModal(false);
                }}
                disabled={!newTheme.id || !newTheme.displayName || !newTheme.branding?.companyName}
                className="px-4 py-2 bg-theme-primary text-white rounded-md hover:bg-opacity-90 transition-colors duration-200 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}