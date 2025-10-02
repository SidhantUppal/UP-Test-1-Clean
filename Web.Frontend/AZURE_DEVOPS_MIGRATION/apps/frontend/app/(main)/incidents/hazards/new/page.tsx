"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HAZARD_SEVERITY_LEVELS, getSeverityColor } from '@/types/hazard.types';
import { hazardService } from '@/services/hazardService';

export default function NewHazardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [locations, setLocations] = useState<Array<{ LocationID: number; LocationName: string }>>([]);
  const [categories, setCategories] = useState<Array<{ HazardCategoryID: number; CategoryName: string; CategoryTypeName: string }>>([]);
  
  const [formData, setFormData] = useState({
    hazardCategoryId: '',
    categoryTypeName: '',
    locationId: '',
    locationName: '',
    severity: '',
    hazardDescription: '',
    assignedToUserId: '',
    assignedToRoleId: '',
    assignedToUserName: '',
    assignedToRoleName: ''
  });

  // Fetch locations and categories on component mount
  useEffect(() => {
    fetchLocations();
    fetchCategories();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/hazards/locations', {
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setLocations(result.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/hazards/categories', {
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setCategories(result.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Update category type name when category is selected
    if (name === 'hazardCategoryId' && value) {
      const category = categories.find(cat => cat.HazardCategoryID === parseInt(value));
      setFormData(prev => ({
        ...prev,
        categoryTypeName: category?.CategoryTypeName || ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (location: { locationId: string; locationName: string }) => {
    setFormData(prev => ({
      ...prev,
      locationId: location.locationId,
      locationName: location.locationName
    }));
    setShowLocationModal(false);
  };

  const handleAssignSelect = (assignment: { userId?: string; userName?: string; roleId?: string; roleName?: string }) => {
    setFormData(prev => ({
      ...prev,
      assignedToUserId: assignment.userId || '',
      assignedToUserName: assignment.userName || '',
      assignedToRoleId: assignment.roleId || '',
      assignedToRoleName: assignment.roleName || ''
    }));
    setShowAssignModal(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.hazardCategoryId) {
      newErrors.hazardCategoryId = 'Hazard type is required';
    }
    
    // Location is now optional - just use locationName without requiring a valid LocationID
    // if (!formData.locationId) {
    //   newErrors.locationId = 'Location is required';
    // }
    
    if (!formData.severity) {
      newErrors.severity = 'Severity is required';
    }
    
    if (!formData.hazardDescription.trim()) {
      newErrors.hazardDescription = 'Description is required';
    } else if (formData.hazardDescription.trim().length < 10) {
      newErrors.hazardDescription = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare hazard data
      const hazardData: any = {
        hazardName: formData.hazardDescription.substring(0, 50), // Use first 50 chars as name
        hazardDescription: formData.hazardDescription,
        hazardCategoryId: parseInt(formData.hazardCategoryId),
        severity: formData.severity || undefined
      };
      
      // Include locationId if one was selected from the database
      if (formData.locationId && !isNaN(parseInt(formData.locationId))) {
        hazardData.locationId = parseInt(formData.locationId);
      }
      
      // Include location name as well
      if (formData.locationName) {
        hazardData.locationName = formData.locationName;
      }
      
      // Only add assignment if valid IDs
      if (formData.assignedToUserId && !isNaN(parseInt(formData.assignedToUserId))) {
        hazardData.assignedToUserId = parseInt(formData.assignedToUserId);
      }
      if (formData.assignedToRoleId && !isNaN(parseInt(formData.assignedToRoleId))) {
        hazardData.assignedToRoleId = parseInt(formData.assignedToRoleId);
      }
      
      // Create the hazard
      const createdHazard = await hazardService.createHazard(hazardData);
      
      // Upload attachments if any
      if (attachments.length > 0 && createdHazard.hazardId) {
        // Note: Attachment upload would be implemented when backend supports it
        // for (const file of attachments) {
        //   await hazardService.uploadAttachment(createdHazard.hazardId, file);
        // }
      }
      
      router.push('/incidents/hazards');
    } catch (error: any) {
      console.error('Error creating hazard:', error);
      setErrors({ submit: error.message || 'An error occurred while creating the hazard' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/incidents/hazards');
  };

  // Check if user has permission to assign
  const hasAssignPermission = true; // TODO: Check actual permission

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Add New Hazard</h1>
              <p className="text-gray-600 mt-1">Report a new hazard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 space-y-6">
              {/* Hazard Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hazard Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="hazardCategoryId"
                  value={formData.hazardCategoryId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.hazardCategoryId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a hazard type</option>
                  {categories.map((category) => (
                    <option key={category.HazardCategoryID} value={category.HazardCategoryID}>
                      {category.CategoryName} ({category.CategoryTypeName})
                    </option>
                  ))}
                </select>
                {errors.hazardCategoryId && (
                  <p className="text-red-500 text-sm mt-1">{errors.hazardCategoryId}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.locationName}
                    readOnly
                    className={`flex-1 px-3 py-2 border rounded-lg bg-gray-50 ${
                      errors.locationId ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Click to select location"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLocationModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Select Location
                  </button>
                </div>
                {errors.locationId && (
                  <p className="text-red-500 text-sm mt-1">{errors.locationId}</p>
                )}
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity <span className="text-red-500">*</span>
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.severity ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select severity level</option>
                  {HAZARD_SEVERITY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </option>
                  ))}
                </select>
                {formData.severity && (
                  <div className="mt-2 px-3 py-2 rounded-lg" style={{ backgroundColor: getSeverityColor(formData.severity) + '20' }}>
                    <span className="font-medium" style={{ color: getSeverityColor(formData.severity) }}>
                      {formData.severity}
                    </span>
                  </div>
                )}
                {errors.severity && (
                  <p className="text-red-500 text-sm mt-1">{errors.severity}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="hazardDescription"
                  value={formData.hazardDescription}
                  onChange={handleInputChange}
                  rows={4}
                  minLength={10}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.hazardDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the hazard in detail (minimum 10 characters)..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.hazardDescription ? (
                    <p className="text-red-500 text-sm">{errors.hazardDescription}</p>
                  ) : (
                    <p className="text-gray-500 text-xs">Minimum 10 characters required</p>
                  )}
                  <p className="text-gray-500 text-xs">{formData.hazardDescription.length} characters</p>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Add Photo/File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Assignment (if permission) */}
              {hasAssignPermission && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.assignedToUserName || formData.assignedToRoleName || ''}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Not assigned"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAssignModal(true)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              )}

              {/* Error message */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{errors.submit}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Hazard'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationPickerModal
          locations={locations}
          onSelect={handleLocationSelect}
          onClose={() => setShowLocationModal(false)}
        />
      )}

      {/* Assignment Modal */}
      {showAssignModal && (
        <AssignmentModal
          onSelect={handleAssignSelect}
          onClose={() => setShowAssignModal(false)}
        />
      )}
    </div>
  );
}

// Location Picker Modal Component
function LocationPickerModal({ locations, onSelect, onClose }: { 
  locations: Array<{ LocationID: number; LocationName: string }>;
  onSelect: (location: { locationId: string; locationName: string }) => void;
  onClose: () => void;
}) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">Select Location</h3>
        </div>
        <div className="p-4 overflow-y-auto max-h-96">
          <div className="space-y-2">
            {locations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No locations available</p>
            ) : (
              locations.map((location) => (
                <button
                  key={location.LocationID}
                  onClick={() => onSelect({ 
                    locationId: location.LocationID.toString(), 
                    locationName: location.LocationName 
                  })}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {location.LocationName}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Assignment Modal Component
function AssignmentModal({ onSelect, onClose }: {
  onSelect: (assignment: { userId?: string; userName?: string; roleId?: string; roleName?: string }) => void;
  onClose: () => void;
}) {
  const [assignType, setAssignType] = useState<'user' | 'role'>('user');
  
  // Mock data - would be fetched from API
  const users = [
    { userId: '1', userName: 'John Doe' },
    { userId: '2', userName: 'Jane Smith' },
    { userId: '3', userName: 'Bob Johnson' },
  ];
  
  const roles = [
    { roleId: '1', roleName: 'Safety Manager' },
    { roleId: '2', roleName: 'Site Supervisor' },
    { roleId: '3', roleName: 'Health & Safety Team' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">Assign Hazard</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setAssignType('user')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                assignType === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Assign to User
            </button>
            <button
              onClick={() => setAssignType('role')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                assignType === 'role' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Assign to Role
            </button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {assignType === 'user' ? (
              users.map((user) => (
                <button
                  key={user.userId}
                  onClick={() => onSelect({ userId: user.userId, userName: user.userName })}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {user.userName}
                </button>
              ))
            ) : (
              roles.map((role) => (
                <button
                  key={role.roleId}
                  onClick={() => onSelect({ roleId: role.roleId, roleName: role.roleName })}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {role.roleName}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}