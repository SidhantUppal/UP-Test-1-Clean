'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

export function OrganisationSwitcher() {
  const { currentOrganisation, currentTheme, switchOrganisation, availableOrganisations } = useTheme();

  return (
    <div className="flex items-center space-x-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="relative w-32 h-8">
          <Image 
            src={currentTheme.branding.logo} 
            alt={currentTheme.branding.logoAlt || currentTheme.branding.companyName}
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="font-semibold text-theme-primary hidden sm:inline">
          {currentTheme.branding.companyName}
        </span>
      </div>

      {/* Organisation Selector */}
      <select
        value={currentOrganisation}
        onChange={(e) => switchOrganisation(e.target.value)}
        className="select select-sm select-bordered bg-theme-surface border-theme-primary/20 text-theme-text-primary"
      >
        {availableOrganisations.map(org => (
          <option key={org.id} value={org.id}>
            {org.name} • {org.description}
          </option>
        ))}
      </select>

      {/* Theme Preview */}
      <div className="flex space-x-1" title="Theme colors: Primary, Secondary">
        <div 
          className="w-4 h-4 rounded border border-gray-300" 
          style={{backgroundColor: currentTheme.colors.primary}}
          title="Primary"
        />
        <div 
          className="w-4 h-4 rounded border border-gray-300" 
          style={{backgroundColor: currentTheme.colors.secondary}}
          title="Secondary"
        />
      </div>
    </div>
  );
}