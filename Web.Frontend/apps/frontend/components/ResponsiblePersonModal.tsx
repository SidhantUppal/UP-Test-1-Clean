import React, { useState, useEffect } from 'react';
import EmployeeDropdown from './EmployeeDropdown';

interface ResponsiblePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  legislation: {
    id: number;
    name: string;
    ResponsiblePersonId?: number | null;
    ResponsiblePersonName?: string | null;
  };
  onSave: (legislationId: number, employeeId: number | null) => Promise<void>;
}

export default function ResponsiblePersonModal({ 
  isOpen, 
  onClose, 
  legislation, 
  onSave 
}: ResponsiblePersonModalProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && legislation) {
      setSelectedEmployeeId(legislation.ResponsiblePersonId || null);
    }
  }, [isOpen, legislation]);

  const handleSave = async () => {
    if (!legislation) return;
    
    setSaving(true);
    try {
      await onSave(legislation.id, selectedEmployeeId);
      onClose();
    } catch (error) {
      console.error('Error saving responsible person:', error);
      alert('Failed to save responsible person assignment');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSelectedEmployeeId(legislation?.ResponsiblePersonId || null);
    onClose();
  };

  if (!isOpen || !legislation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Assign Responsible Person
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {legislation.name}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Employee
            </label>
            <EmployeeDropdown
              value={selectedEmployeeId}
              onChange={setSelectedEmployeeId}
              placeholder="Select responsible person..."
              className="w-full"
            />
          </div>

          {selectedEmployeeId && (
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-800">
                This employee will be responsible for managing compliance with this legislation.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-[#3d3a72] border border-transparent rounded-md hover:bg-[#2d2a52] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d3a72] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
}