import React, { useState, useEffect, useRef } from 'react';

interface Location {
  LocationID: number;
  Name: string;
  Code: string;
  Address: string;
  City: string;
  State: string;
  PostalCode: string;
  Country: string;
  Description: string;
}

interface LocationDropdownProps {
  value?: number | null;
  onChange: (locationId: number | null) => void;
  placeholder?: string;
  className?: string;
}

export default function LocationDropdown({ 
  value, 
  onChange, 
  placeholder = "Select Location...",
  className = ""
}: LocationDropdownProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch locations on mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Update selected location when value changes
  useEffect(() => {
    if (value && locations.length > 0) {
      const location = locations.find(loc => loc.LocationID === value);
      setSelectedLocation(location || null);
    } else {
      setSelectedLocation(null);
    }
  }, [value, locations]);

  // Filter locations based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = locations.filter(loc => {
        const search = searchTerm.toLowerCase();
        return loc.Name.toLowerCase().includes(search) ||
               loc.Code.toLowerCase().includes(search) ||
               loc.City.toLowerCase().includes(search) ||
               loc.State.toLowerCase().includes(search) ||
               loc.Country.toLowerCase().includes(search) ||
               loc.Description.toLowerCase().includes(search);
      });
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [searchTerm, locations]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/locations');
      const data = await response.json();
      if (data.success) {
        setLocations(data.data);
        setFilteredLocations(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (location: Location | null) => {
    setSelectedLocation(location);
    onChange(location?.LocationID || null);
    setIsOpen(false);
    setSearchTerm('');
  };

  const formatLocationDisplay = (location: Location) => {
    return location.City && location.State 
      ? `${location.Name} (${location.City}, ${location.State})`
      : location.Name;
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded cursor-pointer bg-white hover:border-gray-400 focus-within:ring-1 focus-within:ring-[#3d3a72] focus-within:border-[#3d3a72]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLocation ? (
          <div className="flex items-center justify-between">
            <div className="truncate">
              <span className="font-medium text-sm">{formatLocationDisplay(selectedLocation)}</span>
              <div className="text-xs text-gray-500 truncate">
                Code: {selectedLocation.Code}
              </div>
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(null);
              }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <span className="text-gray-500 text-sm">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-hidden min-w-[350px] w-max">
          {locations.length > 0 && (
            <div className="p-3 border-b">
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d3a72] focus:border-[#3d3a72]"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="overflow-y-auto max-h-60">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading locations...</div>
            ) : locations.length === 0 ? (
              <div className="p-4 text-center">
                <div className="text-gray-500 mb-2">No locations available</div>
                <div className="text-sm text-gray-400">Location data will be available after database setup</div>
              </div>
            ) : filteredLocations.length === 0 && searchTerm ? (
              <div className="p-4 text-center text-gray-500">No locations match &quot;{searchTerm}&quot;</div>
            ) : (
              <>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => handleSelect(null)}
                >
                  <span className="text-gray-500 italic">No location assigned</span>
                </div>
                {filteredLocations.map((location) => (
                  <div
                    key={location.LocationID}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(location)}
                  >
                    <div className="font-medium">{formatLocationDisplay(location)}</div>
                    <div className="text-sm text-gray-600">
                      Code: {location.Code}
                    </div>
                    {location.Address && (
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {location.Address}
                      </div>
                    )}
                    {location.Description && (
                      <div className="text-xs text-gray-500 truncate">
                        {location.Description}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}