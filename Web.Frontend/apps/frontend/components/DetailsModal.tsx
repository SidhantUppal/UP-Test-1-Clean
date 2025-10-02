import React, { useState, useEffect } from 'react';
import OrgGroupDropdown from './OrgGroupDropdown';
import LocationDropdown from './LocationDropdown';

interface LegalRegisterItem {
  id: number;
  name: string;
  orgGroupId?: number | null;
  locationId?: number | null;
  ResponsiblePersonId?: number | null;
  orgGroupName?: string;
  locationName?: string;
  ResponsiblePersonName?: string;
}

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  legislation: LegalRegisterItem;
  onSave: (legislationId: number, orgGroupId: number | null, locationId: number | null) => Promise<void>;
}

export default function DetailsModal({
  isOpen,
  onClose,
  legislation,
  onSave
}: DetailsModalProps) {
  const [selectedOrgGroupId, setSelectedOrgGroupId] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Reset form when modal opens or legislation changes
  useEffect(() => {
    if (isOpen && legislation) {
      setSelectedOrgGroupId(legislation.orgGroupId || null);
      setSelectedLocationId(legislation.locationId || null);
    }
  }, [isOpen, legislation]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(legislation.id, selectedOrgGroupId, selectedLocationId);
      onClose();
    } catch (error) {
      console.error('Failed to save details:', error);
      alert('Failed to save details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setSelectedOrgGroupId(legislation.orgGroupId || null);
    setSelectedLocationId(legislation.locationId || null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-[600px] shadow-lg rounded-lg bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Edit Details</h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={handleCancel}
              disabled={saving}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Legislation:</h4>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border">{legislation.name}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Group
              </label>
              <OrgGroupDropdown
                value={selectedOrgGroupId}
                onChange={setSelectedOrgGroupId}
                placeholder="Select organization group..."
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Choose the organization group responsible for this legislation
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <LocationDropdown
                value={selectedLocationId}
                onChange={setSelectedLocationId}
                placeholder="Select location..."
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Choose the primary location where this legislation applies
              </p>
            </div>

          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button 
              type="button"
              onClick={handleCancel}
              disabled={saving}
              style={{ 
                backgroundColor: '#e77726', 
                color: '#ffffff', 
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: saving ? 0.6 : 1
              }}
              className="hover:opacity-80"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSave}
              disabled={saving}
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: saving ? 0.6 : 1
              }}
              className="hover:opacity-80 flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Details'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}