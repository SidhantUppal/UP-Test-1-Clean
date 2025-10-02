import React, { useState, useEffect, useRef } from 'react';

interface OrgGroup {
  OrgGroupID: number;
  Name: string;
  Code: string;
  Description: string;
  ParentGroupID?: number;
  Department?: string;
  Active: boolean;
}

interface OrgGroupDropdownProps {
  value?: number | null;
  onChange: (orgGroupId: number | null) => void;
  placeholder?: string;
  className?: string;
}

export default function OrgGroupDropdown({
  value,
  onChange,
  placeholder = "Select Organization Group...",
  className = ""
}: OrgGroupDropdownProps) {
  const [orgGroups, setOrgGroups] = useState<OrgGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<OrgGroup[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<OrgGroup | null>(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch org groups on mount
  useEffect(() => {
    fetchOrgGroups();
  }, []);

  // Update selected group when value changes
  useEffect(() => {
    if (value && orgGroups.length > 0) {
      const group = orgGroups.find(grp => grp.OrgGroupID === value);
      setSelectedGroup(group || null);
    } else {
      setSelectedGroup(null);
    }
  }, [value, orgGroups]);

  // Filter groups based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = orgGroups.filter(grp => {
        const search = searchTerm.toLowerCase();
        return grp.Name.toLowerCase().includes(search) ||
               grp.Code.toLowerCase().includes(search) ||
               (grp.Department && grp.Department.toLowerCase().includes(search)) ||
               grp.Description.toLowerCase().includes(search);
      });
      setFilteredGroups(filtered);
    } else {
      setFilteredGroups(orgGroups);
    }
  }, [searchTerm, orgGroups]);

  // Close dropdown when clicking outside
  useEffect(() => {
    // Only add event listeners on client side
    if (typeof window !== 'undefined') {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const fetchOrgGroups = async () => {
    setLoading(true);

    try {
      // Work completely offline - skip API calls
      console.info('🚀 Offline Mode: Using mock organization groups');

      // Simulate slight delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 100));

      // Use mock data directly
      const mockGroups: OrgGroup[] = [
        { OrgGroupID: 1, Name: 'Operations', Code: 'OPS', Description: 'Operations Department', Department: 'Operations', Active: true },
        { OrgGroupID: 2, Name: 'Administration', Code: 'ADMIN', Description: 'Administrative Services', Department: 'Administration', Active: true },
        { OrgGroupID: 3, Name: 'Human Resources', Code: 'HR', Description: 'Human Resources Department', Department: 'HR', Active: true },
        { OrgGroupID: 4, Name: 'Safety & Compliance', Code: 'SAFETY', Description: 'Health, Safety & Compliance', Department: 'Safety', Active: true },
        { OrgGroupID: 5, Name: 'Maintenance', Code: 'MAINT', Description: 'Maintenance & Engineering', Department: 'Maintenance', Active: true },
        { OrgGroupID: 6, Name: 'IT Support', Code: 'IT', Description: 'Information Technology', Department: 'IT', Active: true },
        { OrgGroupID: 7, Name: 'Finance', Code: 'FIN', Description: 'Finance & Accounting', Department: 'Finance', Active: true },
        { OrgGroupID: 8, Name: 'Production', Code: 'PROD', Description: 'Production & Manufacturing', Department: 'Production', Active: true },
        { OrgGroupID: 9, Name: 'Quality Control', Code: 'QC', Description: 'Quality Assurance & Control', Department: 'Quality', Active: true },
        { OrgGroupID: 10, Name: 'Warehouse', Code: 'WH', Description: 'Warehouse & Logistics', Department: 'Warehouse', Active: true },
        { OrgGroupID: 11, Name: 'Customer Service', Code: 'CS', Description: 'Customer Support Services', Department: 'Customer Service', Active: true },
        { OrgGroupID: 12, Name: 'Security', Code: 'SEC', Description: 'Security Services', Department: 'Security', Active: true },
        { OrgGroupID: 13, Name: 'Marketing', Code: 'MKT', Description: 'Marketing & Communications', Department: 'Marketing', Active: true },
        { OrgGroupID: 14, Name: 'Research & Development', Code: 'R&D', Description: 'Research and Development', Department: 'R&D', Active: true },
        { OrgGroupID: 15, Name: 'Legal', Code: 'LEGAL', Description: 'Legal & Compliance', Department: 'Legal', Active: true }
      ];
      setOrgGroups(mockGroups);
      setFilteredGroups(mockGroups);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (group: OrgGroup | null) => {
    setSelectedGroup(group);
    onChange(group?.OrgGroupID || null);
    setIsOpen(false);
    setSearchTerm('');
  };

  const formatGroupDisplay = (group: OrgGroup) => {
    return `${group.Name} (${group.Code})`;
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer bg-white hover:border-gray-400 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedGroup ? (
          <div className="flex items-center justify-between">
            <div className="truncate">
              <span className="font-medium text-sm">{formatGroupDisplay(selectedGroup)}</span>
              {selectedGroup.Department && (
                <div className="text-xs text-gray-500 truncate">
                  Department: {selectedGroup.Department}
                </div>
              )}
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
        <div className="absolute z-20 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-hidden min-w-[350px] w-max">
          <div className="p-3 border-b">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="overflow-y-auto max-h-60">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading organization groups...</div>
            ) : filteredGroups.length === 0 && searchTerm ? (
              <div className="p-4 text-center text-gray-500">No groups match &quot;{searchTerm}&quot;</div>
            ) : (
              <>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => handleSelect(null)}
                >
                  <span className="text-gray-500 italic">No group assigned</span>
                </div>
                {filteredGroups.map((group) => (
                  <div
                    key={group.OrgGroupID}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${!group.Active ? 'opacity-50' : ''}`}
                    onClick={() => group.Active && handleSelect(group)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{formatGroupDisplay(group)}</div>
                        {group.Department && (
                          <div className="text-sm text-gray-600">
                            Department: {group.Department}
                          </div>
                        )}
                        {group.Description && (
                          <div className="text-xs text-gray-500 truncate">
                            {group.Description}
                          </div>
                        )}
                      </div>
                      {!group.Active && (
                        <span className="text-xs text-red-600 ml-2">Inactive</span>
                      )}
                    </div>
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