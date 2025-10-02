"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useHazardFormValidation, HAZARD_VALIDATION_RULES } from '@/hooks/useHazardFormValidation';
import { useHazardSeverities, useHazardCategories } from '@/hooks/useHazardLookups';
import { FormField, FormInput, FormTextarea, FormSelect } from '@/components/forms/FormField';
import { ValidationErrorDisplay } from '@/components/forms/ValidationErrorDisplay';
import { authHeaderService } from '@/services/authHeaderService';
import NewHazardMobileView from './NewHazardMobileView';

// Initial form data structure
const INITIAL_HAZARD_DATA = {
    hazardCategoryId: '',
    categoryTypeName: '',
    locationId: '',
    locationName: '',
    hazardSeverityTypeId: '',
    hazardDescription: '',
    assignedToUserId: '',
    assignedToRoleId: '',
    assignedToUserName: '',
    assignedToRoleName: '',
    // Enhanced features
    assignToMe: false,
    fixedWhenFound: false,
    resolutionNotes: '',
    createFollowUpTask: false,
    followUpTaskType: '',
    followUpTaskAssignTo: 'self',
    followUpTaskDueDate: '',
    followUpTaskDescription: ''
};

export default function NewHazardPage()
{
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showMobileView, setShowMobileView] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<{ file: File, url: string }[]>([]);
    const [locations, setLocations] = useState<Array<{ LocationID: number; Title: string }>>([]);

    // Load hazard data from the API
    const { severities: hazardSeverities, loading: severitiesLoading, error: severitiesError } = useHazardSeverities();
    const { categories: hazardCategories, loading: categoriesLoading, error: categoriesError } = useHazardCategories();

    // Use the new validation system
    const {
        formData,
        loading,
        error,
        handleFieldChange,
        handleSubmit,
        hasFieldError,
        showValidationErrors
    } = useHazardFormValidation({
        formStorageKey: 'hazard-form-new',
        initialFormData: INITIAL_HAZARD_DATA,
        validationRules: HAZARD_VALIDATION_RULES
    });

    // Fetch locations on component mount
    useEffect(() =>
    {
        fetchLocations();
    }, []);

    const fetchLocations = async () =>
    {
        try
        {
            const response = await fetch('/api/hazards/locations', {
                method: 'GET',
                headers: authHeaderService.getAuthHeaders(),
                credentials: 'include',
            });

            if (response.ok)
            {
                const result = await response.json();
                if (result.success && result.data)
                {
                    setLocations(result.data);
                } else if (result.data)
                {
                    // Handle case where success flag might not be present
                    setLocations(result.data);
                }
            } else
            {
                console.error('Failed to fetch locations:', response.status, response.statusText);
            }
        } catch (error)
        {
            console.error('Failed to fetch locations:', error);
        }
    };

    // Handle category selection to update category type name
    const handleCategoryChange = (value: string) =>
    {
        handleFieldChange('hazardCategoryId', value);
        if (value)
        {
            const category = hazardCategories.find((cat: any) => cat.HazardCategoryTypeID === parseInt(value));
            handleFieldChange('categoryTypeName', category?.Title || '');
        }
    };

    // Handle checkbox changes with special logic
    const handleCheckboxChange = (name: string, checked: boolean) =>
    {
        handleFieldChange(name, checked);

        // Open task modal when "Create follow-up task" is checked
        if (name === 'createFollowUpTask' && checked)
        {
            setShowTaskModal(true);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const files = e.target.files;
        if (files)
        {
            const newFiles = Array.from(files);
            setAttachments(prev => [...prev, ...newFiles]);

            // Create preview URLs for image files
            newFiles.forEach(file =>
            {
                if (file.type.startsWith('image/'))
                {
                    const reader = new FileReader();
                    reader.onload = (event) =>
                    {
                        if (event.target?.result)
                        {
                            setImagePreviews(prev => [...prev, { file, url: event.target!.result as string }]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const removeAttachment = (index: number) =>
    {
        const fileToRemove = attachments[index];
        setAttachments(prev => prev.filter((_, i) => i !== index));
        // Also remove from image previews if it's an image
        setImagePreviews(prev => prev.filter(preview => preview.file !== fileToRemove));
    };

    const handleLocationSelect = (location: { locationId: string; locationName: string }) =>
    {
        handleFieldChange('locationId', location.locationId);
        handleFieldChange('locationName', location.locationName);
        setShowLocationModal(false);
    };

    const handleAssignSelect = (assignment: { userId?: string; userName?: string; roleId?: string; roleName?: string }) =>
    {
        handleFieldChange('assignedToUserId', assignment.userId || '');
        handleFieldChange('assignedToUserName', assignment.userName || '');
        handleFieldChange('assignedToRoleId', assignment.roleId || '');
        handleFieldChange('assignedToRoleName', assignment.roleName || '');
        setShowAssignModal(false);
    };

    // Check if user has permission to assign
    const hasAssignPermission = true; // TODO: Check actual permission

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Report New Hazard</h1>
                            <p className="text-gray-600 mt-1">Report a safety hazard that requires attention</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setShowMobileView(true)}
                                style={{
                                    backgroundColor: '#e77726',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    transition: 'opacity 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                                className="hover:opacity-80"
                                title="View Mobile Interface"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Mobile View
                            </button>
                            <Link href="/incidents/hazards">
                                <button style={{
                                    backgroundColor: '#3d3a72',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    transition: 'opacity 0.2s'
                                }} className="hover:opacity-80">
                                    Back to Hazards
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold">Hazard Details</h2>
                        <p className="text-gray-600 text-sm mt-1">Provide information about the hazard you're reporting</p>
                    </div>
                    <form className="p-6" onSubmit={handleSubmit}>
                        {/* Top Validation Error Display */}
                        <ValidationErrorDisplay
                            error={error}
                            showValidationErrors={showValidationErrors}
                            className="mb-6"
                        />
                        <div className="space-y-6">
                            {/* Hazard Type */}
                            <FormField
                                label="Hazard Type"
                                error={hasFieldError('hazardCategoryId') ? 'Hazard type is required' : undefined}
                            >
                                <FormSelect
                                    value={formData.hazardCategoryId}
                                    onChange={(value: string) => handleCategoryChange(value)}
                                    options={(hazardCategories || []).filter((category: any) => category && category.HazardCategoryTypeID).map((category: any) => ({
                                        value: category.HazardCategoryTypeID.toString(),
                                        label: `${category.Title || 'Unknown'}${category.Description ? ` - ${category.Description}` : ''}`
                                    }))}
                                    hasError={hasFieldError('hazardCategoryId')}
                                    placeholder="Select hazard type"
                                    disabled={categoriesLoading}
                                />
                                {categoriesError && (
                                    <p className="text-red-500 text-sm mt-1">Error loading categories: {categoriesError}</p>
                                )}
                            </FormField>

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
                                        className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 ${hasFieldError('locationId') ? 'border-red-500' : ''
                                            }`}
                                        placeholder="Click to select location"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowLocationModal(true)}
                                        className="px-4 py-2 text-white rounded hover:opacity-80"
                                        style={{ backgroundColor: '#3d3a72' }}
                                    >
                                        Select Location
                                    </button>
                                </div>
                                {hasFieldError('locationId') && (
                                    <p className="text-red-500 text-sm mt-1">Location is required</p>
                                )}
                            </div>

                            {/* Severity */}
                            <FormField
                                label="Severity"
                                error={hasFieldError('hazardSeverityTypeId') ? 'Severity is required' : undefined}
                            >
                                <FormSelect
                                    value={formData.hazardSeverityTypeId}
                                    onChange={(value: string) => handleFieldChange('hazardSeverityTypeId', value)}
                                    options={(hazardSeverities || []).filter((severity: any) => severity && (severity.HazardSeverityTypeID || severity.HazardSeverityTypeID)).map((severity: any) => ({
                                        value: (severity?.HazardSeverityTypeID || severity?.HazardSeverityTypeID || 0).toString(),
                                        label: `${severity?.Title || severity?.Title || 'Unknown'} - ${severity?.Description || severity?.Description || 'No description'}`
                                    }))}
                                    hasError={hasFieldError('hazardSeverityTypeId')}
                                    placeholder="Select severity level"
                                    disabled={severitiesLoading}
                                />
                                {formData.hazardSeverityTypeId && (
                                    <div className="mt-2 px-3 py-2 rounded-lg" style={{
                                        backgroundColor: (hazardSeverities.find((s: any) => s.HazardSeverityTypeID === parseInt(formData.hazardSeverityTypeId))?.ColorCode || '#6B7280') + '20'
                                    }}>
                                        <span className="font-medium" style={{
                                            color: hazardSeverities.find((s: any) => s.HazardSeverityTypeID === parseInt(formData.hazardSeverityTypeId))?.ColorCode || '#6B7280'
                                        }}>
                                            {hazardSeverities.find((s: any) => s.HazardSeverityTypeID === parseInt(formData.hazardSeverityTypeId))?.Title}
                                        </span>
                                    </div>
                                )}
                                {severitiesError && (
                                    <p className="text-red-500 text-sm mt-1">Error loading severities: {severitiesError}</p>
                                )}
                            </FormField>

                            {/* Description */}
                            <FormField
                                label="Description"
                                error={hasFieldError('hazardDescription') ? 'Description is required and must be at least 10 characters' : undefined}
                            >
                                <FormTextarea
                                    value={formData.hazardDescription}
                                    onChange={(value: string) => handleFieldChange('hazardDescription', value)}
                                    hasError={hasFieldError('hazardDescription')}
                                    rows={4}
                                    placeholder="Describe the hazard in detail (minimum 10 characters)..."
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {!hasFieldError('hazardDescription') && (
                                        <p className="text-gray-500 text-xs">Minimum 10 characters required</p>
                                    )}
                                    <p className="text-gray-500 text-xs">{formData.hazardDescription.length} characters</p>
                                </div>
                            </FormField>

                            {/* Attachments */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Photos <span className="text-gray-400 text-xs">(Multiple allowed)</span>
                                </label>
                                <div className="space-y-4">
                                    {/* Upload Area */}
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                                    >
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-sm text-gray-600">
                                            Click to upload photos or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Supports: Images, PDF, DOC, DOCX
                                        </p>
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {/* Image Previews Grid */}
                                    {imagePreviews.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Photos ({imagePreviews.length})</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {imagePreviews.map((preview, index) =>
                                                {
                                                    const fileIndex = attachments.findIndex(f => f === preview.file);
                                                    return (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={preview.url}
                                                                alt={preview.file.name}
                                                                className="w-full h-24 object-cover rounded-md border border-gray-200"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeAttachment(fileIndex)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md truncate">
                                                                {preview.file.name}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Non-Image Files List */}
                                    {attachments.filter(file => !file.type.startsWith('image/')).length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Documents</h4>
                                            <div className="space-y-1">
                                                {attachments.map((file, index) =>
                                                {
                                                    if (!file.type.startsWith('image/'))
                                                    {
                                                        return (
                                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                                                <div className="flex items-center gap-2">
                                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                    </svg>
                                                                    <span className="text-sm text-gray-700">{file.name}</span>
                                                                </div>
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
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Assignment (if permission) */}
                            {hasAssignPermission && (
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Assign To (Optional)
                                    </label>

                                    {/* Assign to me checkbox */}
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="assignToMe"
                                            name="assignToMe"
                                            checked={formData.assignToMe}
                                            onChange={(e) => handleCheckboxChange('assignToMe', e.target.checked)}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="assignToMe" className="text-sm font-medium text-gray-700">
                                            Assign all tasks to me
                                        </label>
                                    </div>

                                    {/* Manual assignment - disabled if assign to me is checked */}
                                    {!formData.assignToMe && (
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
                                                style={{
                                                    backgroundColor: '#3d3a72',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: '6px',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    transition: 'opacity 0.2s'
                                                }}
                                                className="hover:opacity-80"
                                            >
                                                Assign
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Fixed When Found Section */}
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="fixedWhenFound"
                                        name="fixedWhenFound"
                                        checked={formData.fixedWhenFound}
                                        onChange={(e) => handleCheckboxChange('fixedWhenFound', e.target.checked)}
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="fixedWhenFound" className="text-sm font-medium text-green-800">
                                        Hazard fixed when found
                                    </label>
                                </div>

                                {formData.fixedWhenFound && (
                                    <div className="mt-4 space-y-4 pl-6">
                                        {/* Resolution Notes - Required */}
                                        <FormField
                                            label="Resolution Notes"
                                            error={hasFieldError('resolutionNotes') ? 'Resolution notes are required when marking as fixed' : undefined}
                                        >
                                            <FormTextarea
                                                value={formData.resolutionNotes}
                                                onChange={(value: string) => handleFieldChange('resolutionNotes', value)}
                                                hasError={hasFieldError('resolutionNotes')}
                                                rows={3}
                                                placeholder="Describe what action was taken to fix the hazard..."
                                            />
                                        </FormField>

                                        {/* Follow-up Task Option */}
                                        <div className="border-t border-green-200 pt-4">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="createFollowUpTask"
                                                    name="createFollowUpTask"
                                                    checked={formData.createFollowUpTask}
                                                    onChange={(e) => handleCheckboxChange('createFollowUpTask', e.target.checked)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="createFollowUpTask" className="text-sm font-medium text-gray-700">
                                                    Create follow-up task
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Validation Error Display */}
                            <ValidationErrorDisplay
                                error={error}
                                showValidationErrors={showValidationErrors}
                                className="mb-6"
                            />

                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t">
                            <div></div>
                            <div className="flex space-x-4">
                                <Link href="/incidents/hazards">
                                    <button
                                        type="button"
                                        disabled={loading}
                                        style={{
                                            backgroundColor: '#e77726',
                                            color: '#ffffff',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            transition: 'opacity 0.2s'
                                        }}
                                        className="hover:opacity-80"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: '#3d3a72',
                                        color: '#ffffff',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        transition: 'opacity 0.2s'
                                    }}
                                    className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Reporting...' : 'Report Hazard'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
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

            {/* Create Task Modal */}
            {showTaskModal && (
                <CreateTaskModal
                    onSave={(taskData) =>
                    {
                        // Handle task creation here - for now just close modal
                        console.log('Task data:', taskData);
                        setShowTaskModal(false);
                        // You can add API call here to save the task
                    }}
                    onClose={() => setShowTaskModal(false)}
                />
            )}

            {/* Mobile View Modal */}
            {showMobileView && (
                <NewHazardMobileView
                    formData={formData}
                    categories={hazardCategories}
                    locations={locations}
                    onClose={() => setShowMobileView(false)}
                    onSubmit={handleSubmit}
                    onChange={handleFieldChange}
                />
            )}
        </div>
    );
}

// Location Picker Modal Component
function LocationPickerModal({ locations, onSelect, onClose }: {
    locations: Array<{ LocationID: number; Title: string }>;
    onSelect: (location: { locationId: string; locationName: string }) => void;
    onClose: () => void;
})
{
    const [selectedLocation, setSelectedLocation] = useState<{ locationId: string; locationName: string } | null>(null);
    const [filterText, setFilterText] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['main', 'warehouse', 'other']));

    // Hierarchical location data structure for tree view
    const locationGroups = {
        main: {
            title: 'Main Facilities',
            reference: 'MAIN',
            items: [
                { LocationID: 1, Title: 'Main Office HQ', Reference: 'MAIN.HQ' },
                { LocationID: 2, Title: 'Reception Area', Reference: 'MAIN.REC' },
                { LocationID: 3, Title: 'Conference Rooms', Reference: 'MAIN.CONF' },
            ]
        },
        warehouse: {
            title: 'Warehouse & Production',
            reference: 'WARE',
            items: [
                { LocationID: 4, Title: 'Warehouse North', Reference: 'WARE.N' },
                { LocationID: 5, Title: 'Production Floor', Reference: 'WARE.PROD' },
                { LocationID: 6, Title: 'Loading Dock', Reference: 'WARE.DOCK' },
                { LocationID: 7, Title: 'Storage Area', Reference: 'WARE.STOR' },
            ]
        },
        other: {
            title: 'Other Locations',
            reference: 'OTHER',
            items: [
                { LocationID: 8, Title: 'Parking Lot', Reference: 'OTHER.PARK' },
                { LocationID: 9, Title: 'Kitchen/Break Room', Reference: 'OTHER.BREAK' },
                { LocationID: 10, Title: 'Emergency Exits', Reference: 'OTHER.EXIT' },
                { LocationID: 11, Title: 'Rooftop Access', Reference: 'OTHER.ROOF' },
            ]
        }
    };

    const toggleGroup = (groupKey: string) =>
    {
        const newExpanded = new Set(expandedGroups);
        if (newExpanded.has(groupKey))
        {
            newExpanded.delete(groupKey);
        } else
        {
            newExpanded.add(groupKey);
        }
        setExpandedGroups(newExpanded);
    };

    const handleSelectLocation = (location: any) =>
    {
        setSelectedLocation({
            locationId: location.LocationID.toString(),
            locationName: location.Title
        });
    };

    const handleOK = () =>
    {
        if (selectedLocation)
        {
            onSelect(selectedLocation);
        }
    };

    const applyFilter = () =>
    {
        // Filter logic would go here
    };

    const showAllItems = () =>
    {
        setFilterText('');
        setExpandedGroups(new Set(['main', 'warehouse', 'other']));
    };

    // Filter locations based on search text
    const filterLocations = (items: any[]) =>
    {
        if (!filterText) return items;
        return items.filter(item =>
            item.Title.toLowerCase().includes(filterText.toLowerCase()) ||
            item.Reference.toLowerCase().includes(filterText.toLowerCase())
        );
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl" style={{ width: '600px' }}>
                    {/* Modal Header - Following style guide */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Select Location</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Filter Section */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-600 whitespace-nowrap">Filter visible items</label>
                            <input
                                type="text"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder=""
                            />
                            <button
                                onClick={applyFilter}
                                style={{
                                    backgroundColor: '#3d3a72',
                                    color: '#ffffff',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                                className="hover:opacity-80"
                            >
                                Apply filter
                            </button>
                            <span className="text-gray-400">or</span>
                            <button
                                onClick={showAllItems}
                                style={{
                                    backgroundColor: '#3d3a72',
                                    color: '#ffffff',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                                className="hover:opacity-80"
                            >
                                Show all items
                            </button>
                        </div>
                    </div>

                    {/* Tree View List */}
                    <div className="p-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left pb-2 text-sm font-medium text-gray-700">Title</th>
                                    <th className="text-left pb-2 text-sm font-medium text-gray-700">Reference</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(locationGroups).map(([groupKey, group]) =>
                                {
                                    const filteredItems = filterLocations(group.items);
                                    if (filterText && filteredItems.length === 0) return null;

                                    return (
                                        <React.Fragment key={groupKey}>
                                            {/* Group Header */}
                                            <tr
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => toggleGroup(groupKey)}
                                            >
                                                <td className="py-2 text-sm">
                                                    <div className="flex items-center">
                                                        <span className="mr-2 text-gray-500">
                                                            {expandedGroups.has(groupKey) ? '−' : '+'}
                                                        </span>
                                                        <span className="font-medium">{group.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 text-sm text-gray-600">{group.reference}</td>
                                            </tr>

                                            {/* Group Items */}
                                            {expandedGroups.has(groupKey) && filteredItems.map((location) => (
                                                <tr
                                                    key={location.LocationID}
                                                    className={`hover:bg-gray-50 cursor-pointer ${selectedLocation?.locationId === location.LocationID.toString() ? 'bg-blue-50' : ''
                                                        }`}
                                                    onClick={() => handleSelectLocation(location)}
                                                >
                                                    <td className="py-2 text-sm">
                                                        <div className="flex items-center pl-8">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedLocation?.locationId === location.LocationID.toString()}
                                                                onChange={() => handleSelectLocation(location)}
                                                                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <span>{location.Title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 text-sm text-gray-600">{location.Reference}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-start p-4 border-t border-gray-200">
                        <button
                            style={{
                                backgroundColor: '#3d3a72',
                                color: '#ffffff',
                                border: 'none',
                                padding: '8px 24px',
                                borderRadius: '4px',
                                fontWeight: '500',
                                cursor: selectedLocation ? 'pointer' : 'not-allowed',
                                fontSize: '14px',
                                opacity: selectedLocation ? 1 : 0.5
                            }}
                            className="hover:opacity-80"
                            onClick={handleOK}
                            disabled={!selectedLocation}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Assignment Modal Component
function AssignmentModal({ onSelect, onClose }: {
    onSelect: (assignment: { userId?: string; userName?: string; roleId?: string; roleName?: string }) => void;
    onClose: () => void;
})
{
    const [assignType, setAssignType] = useState<'user' | 'role'>('user');
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    // Mock data - would be fetched from API
    const users = [
        { userId: '1', userName: 'John Doe' },
        { userId: '2', userName: 'Jane Smith' },
        { userId: '3', userName: 'Bob Johnson' },
        { userId: '4', userName: 'Rebecca Richards' },
        { userId: '5', userName: 'Richard Pidduck-Smith' },
        { userId: '6', userName: 'Steve Gosling' },
        { userId: '7', userName: 'Steven McMullin' },
        { userId: '8', userName: 'Stuart Buck' },
    ];

    const roles = [
        { roleId: '1', roleName: 'Safety Manager' },
        { roleId: '2', roleName: 'Site Supervisor' },
        { roleId: '3', roleName: 'Health & Safety Team' },
        { roleId: '4', roleName: 'Department Head' },
        { roleId: '5', roleName: 'HR Department' },
    ];

    const handleItemSelect = (id: string, isChecked: boolean) =>
    {
        const newSelection = new Set(selectedItems);
        if (isChecked)
        {
            newSelection.add(id);
        } else
        {
            newSelection.delete(id);
        }
        setSelectedItems(newSelection);
    };

    const handleAssign = () =>
    {
        if (selectedItems.size === 0) return;

        const selectedId = Array.from(selectedItems)[0]; // For now, just take the first selected item
        if (assignType === 'user')
        {
            const user = users.find(u => u.userId === selectedId);
            if (user)
            {
                onSelect({ userId: user.userId, userName: user.userName });
            }
        } else
        {
            const role = roles.find(r => r.roleId === selectedId);
            if (role)
            {
                onSelect({ roleId: role.roleId, roleName: role.roleName });
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
                    {/* Modal Header - Following NewPage.md style guide */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Assign Hazard</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <p className="text-gray-600 mb-4">Select who should be assigned this hazard.</p>

                        {/* Navigation Tabs - Following dashboard style */}
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex space-x-8" role="tablist">
                                <button
                                    onClick={() => setAssignType('user')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${assignType === 'user'
                                            ? 'border-purple-500 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    role="tab"
                                    aria-selected={assignType === 'user'}
                                >
                                    <div>
                                        <div className="font-semibold">Assign to User</div>
                                        <div className="text-xs text-gray-400 mt-1">Select a specific person</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setAssignType('role')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${assignType === 'role'
                                            ? 'border-purple-500 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    role="tab"
                                    aria-selected={assignType === 'role'}
                                >
                                    <div>
                                        <div className="font-semibold">Assign to Role</div>
                                        <div className="text-xs text-gray-400 mt-1">Select a team or department</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Assignment Options - Checkbox List Style */}
                        <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto bg-white">
                            <table className="w-full">
                                <tbody>
                                    {assignType === 'user' ? (
                                        users.map((user, index) => (
                                            <tr
                                                key={user.userId}
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                                            >
                                                <td className="px-3 py-2 w-8">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.has(user.userId)}
                                                        onChange={(e) => handleItemSelect(user.userId, e.target.checked)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="font-medium text-gray-900">{user.userName}</div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        roles.map((role, index) => (
                                            <tr
                                                key={role.roleId}
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                                            >
                                                <td className="px-3 py-2 w-8">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.has(role.roleId)}
                                                        onChange={(e) => handleItemSelect(role.roleId, e.target.checked)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="font-medium text-gray-900">{role.roleName}</div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Modal Footer - Following NewPage.md button order convention */}
                    <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                        {/* PRIMARY button (Assign) - ALWAYS FIRST */}
                        <button
                            style={{
                                backgroundColor: selectedItems.size > 0 ? '#3d3a72' : '#9ca3af',
                                color: '#ffffff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontWeight: '500',
                                cursor: selectedItems.size > 0 ? 'pointer' : 'not-allowed',
                                fontSize: '14px',
                                transition: 'opacity 0.2s'
                            }}
                            className="hover:opacity-80"
                            onClick={handleAssign}
                            disabled={selectedItems.size === 0}
                        >
                            Assign Selected ({selectedItems.size})
                        </button>

                        {/* SECONDARY button (Cancel) - ALWAYS SECOND */}
                        <button
                            style={{
                                backgroundColor: '#e77726',
                                color: '#ffffff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'opacity 0.2s'
                            }}
                            className="hover:opacity-80"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Create Task Modal Component
function CreateTaskModal({ onSave, onClose }: {
    onSave: (taskData: {
        taskType: string;
        assignTo: string;
        dueDate: string;
        additionalDetails: string;
        escalationEnabled: boolean;
        escalateToWho: string;
        escalationTimeframe: string;
    }) => void;
    onClose: () => void;
})
{
    const [taskFormData, setTaskFormData] = useState({
        taskType: '',
        assignTo: 'self',
        dueDate: '',
        additionalDetails: '',
        escalationEnabled: false,
        escalateToWho: '',
        escalationTimeframe: ''
    });
    const [taskErrors, setTaskErrors] = useState<Record<string, string>>({});

    const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    {
        const { name, value } = e.target;
        setTaskFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is edited
        if (taskErrors[name])
        {
            setTaskErrors(prev =>
            {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateTaskForm = () =>
    {
        const newErrors: Record<string, string> = {};

        if (!taskFormData.taskType)
        {
            newErrors.taskType = 'Task type is required';
        }

        if (!taskFormData.dueDate)
        {
            newErrors.dueDate = 'Due date is required';
        }

        setTaskErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () =>
    {
        if (validateTaskForm())
        {
            onSave(taskFormData);
        }
    };

    const handleCancel = () =>
    {
        // Reset form data and close modal
        setTaskFormData({
            taskType: '',
            assignTo: 'self',
            dueDate: '',
            additionalDetails: '',
            escalationEnabled: false,
            escalateToWho: '',
            escalationTimeframe: ''
        });
        setTaskErrors({});
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCancel} />

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
                    {/* Modal Header - Following NewPage.md style guide */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Create Follow-Up Task</h2>
                        <button
                            onClick={handleCancel}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <p className="text-gray-600 mb-4">Please complete the case details below.</p>

                        <div className="space-y-4">
                            {/* Task Type - Required */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Task Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="taskType"
                                    value={taskFormData.taskType}
                                    onChange={handleTaskInputChange}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${taskErrors.taskType ? 'border-red-500' : ''
                                        }`}
                                >
                                    <option value="">Select task type</option>
                                    <option value="verification">Verification - Check fix is adequate</option>
                                    <option value="documentation">Documentation - Update procedures</option>
                                    <option value="training">Training - Brief team on prevention</option>
                                    <option value="permanent">Permanent Fix - Temporary measure in place</option>
                                    <option value="other">Other - Custom task</option>
                                </select>
                                {taskErrors.taskType && (
                                    <p className="text-red-500 text-sm mt-1">{taskErrors.taskType}</p>
                                )}
                            </div>

                            {/* Assign To */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assign To
                                </label>
                                <select
                                    name="assignTo"
                                    value={taskFormData.assignTo}
                                    onChange={handleTaskInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="self">Assign to me</option>
                                    <option value="manager">Assign to manager</option>
                                    <option value="safety_officer">Assign to safety officer</option>
                                </select>
                            </div>

                            {/* Due Date - Required */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={taskFormData.dueDate}
                                    onChange={handleTaskInputChange}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${taskErrors.dueDate ? 'border-red-500' : ''
                                        }`}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {taskErrors.dueDate && (
                                    <p className="text-red-500 text-sm mt-1">{taskErrors.dueDate}</p>
                                )}
                            </div>

                            {/* Additional Details - Optional */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional Details (Optional)
                                </label>
                                <textarea
                                    name="additionalDetails"
                                    value={taskFormData.additionalDetails}
                                    onChange={handleTaskInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Additional details for follow-up task..."
                                />
                            </div>

                            {/* Escalation Settings */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <input
                                        type="checkbox"
                                        id="escalationEnabled"
                                        name="escalationEnabled"
                                        checked={taskFormData.escalationEnabled}
                                        onChange={(e) => setTaskFormData(prev => ({ ...prev, escalationEnabled: e.target.checked }))}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="escalationEnabled" className="text-sm font-medium text-gray-700">
                                        Set up escalation if task is not completed
                                    </label>
                                </div>

                                {taskFormData.escalationEnabled && (
                                    <div className="space-y-4 pl-6">
                                        {/* Escalate To Who */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Escalate To
                                            </label>
                                            <select
                                                name="escalateToWho"
                                                value={taskFormData.escalateToWho}
                                                onChange={handleTaskInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select escalation recipient</option>
                                                <option value="manager">Line Manager</option>
                                                <option value="safety_officer">Safety Officer</option>
                                                <option value="department_head">Department Head</option>
                                                <option value="hr">HR Department</option>
                                                <option value="senior_management">Senior Management</option>
                                            </select>
                                        </div>


                                        {/* Escalation Timeline */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Escalate If Overdue By
                                            </label>
                                            <select
                                                name="escalationTimeframe"
                                                value={taskFormData.escalationTimeframe}
                                                onChange={handleTaskInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select timeframe</option>
                                                <option value="1_hour">1 hour past due date</option>
                                                <option value="4_hours">4 hours past due date</option>
                                                <option value="1_day">1 day past due date</option>
                                                <option value="2_days">2 days past due date</option>
                                                <option value="1_week">1 week past due date</option>
                                                <option value="immediately">Immediately on due date</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer - Following NewPage.md button order convention */}
                    <div className="flex items-center justify-start gap-3 px-6 py-4 border-t border-gray-200">
                        {/* PRIMARY button (Save) - ALWAYS FIRST */}
                        <button
                            style={{
                                backgroundColor: '#3d3a72',
                                color: '#ffffff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'opacity 0.2s'
                            }}
                            className="hover:opacity-80"
                            onClick={handleSave}
                        >
                            Save and Continue
                        </button>

                        {/* SECONDARY button (Cancel) - ALWAYS SECOND */}
                        <button
                            style={{
                                backgroundColor: '#e77726',
                                color: '#ffffff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'opacity 0.2s'
                            }}
                            className="hover:opacity-80"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}