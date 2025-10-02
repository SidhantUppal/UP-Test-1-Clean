"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewRIDDORReport() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    // Notifier Details
    notifierTitle: '',
    notifierFirstName: '',
    notifierLastName: '',
    notifierJobTitle: '',
    notifierTelephone: '',
    notifierEmail: '',
    notifierAddressLine1: '',
    notifierAddressLine2: '',
    notifierAddressLine3: '',
    notifierTownCity: '',
    notifierCounty: '',
    notifierPostCode: '',
    
    // Injured Party Details
    employmentStatus: '',
    otherEmploymentStatus: '',
    injuredTitle: '',
    injuredFirstName: '',
    injuredLastName: '',
    injuredJobTitle: '',
    injuredTelephone: '',
    injuredGender: '',
    injuredAge: '',
    injuredAddressLine1: '',
    injuredAddressLine2: '',
    injuredAddressLine3: '',
    injuredTownCity: '',
    injuredCounty: '',
    injuredPostCode: '',
    
    // Incident Location
    locationType: '',
    locationName: '',
    locationAddressLine1: '',
    locationAddressLine2: '',
    locationAddressLine3: '',
    locationTownCity: '',
    locationCounty: '',
    locationPostCode: '',
    exactLocation: '',
    
    // Additional Details
    localAuthority: '',
    authorityCannotBeAtLocation: false,
    alternativeAuthority: '',
    workBeingUndertaken: '',
    mainContributoryFactor: '',
    incidentKind: '',
    injuryTypeSustained: '',
    anyPeriodAffected: '',
    whatHappened: '',
    severityOfIncident: '',
    
    // Status and Notes
    status: 'Draft',
    notes: ''
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      { field: 'notifierTitle', label: 'Notifier Title' },
      { field: 'notifierFirstName', label: 'Notifier First Name' },
      { field: 'notifierLastName', label: 'Notifier Last Name' },
      { field: 'notifierJobTitle', label: 'Notifier Job Title' },
      { field: 'notifierTelephone', label: 'Notifier Telephone' },
      { field: 'notifierEmail', label: 'Notifier Email' },
      { field: 'notifierAddressLine1', label: 'Notifier Address Line 1' },
      { field: 'notifierTownCity', label: 'Notifier Town/City' },
      { field: 'notifierPostCode', label: 'Notifier Post Code' },
      { field: 'employmentStatus', label: 'Employment Status' },
      { field: 'injuredFirstName', label: 'Injured Party First Name' },
      { field: 'injuredLastName', label: 'Injured Party Last Name' },
      { field: 'injuredJobTitle', label: 'Injured Party Job Title' },
      { field: 'injuredGender', label: 'Gender' },
      { field: 'injuredAge', label: 'Age' },
      { field: 'injuredAddressLine1', label: 'Injured Party Address Line 1' },
      { field: 'injuredTownCity', label: 'Injured Party Town/City' },
      { field: 'injuredPostCode', label: 'Injured Party Post Code' },
      { field: 'locationType', label: 'Location Type' },
      { field: 'locationName', label: 'Location Name' },
      { field: 'locationAddressLine1', label: 'Location Address Line 1' },
      { field: 'locationTownCity', label: 'Location Town/City' },
      { field: 'locationPostCode', label: 'Location Post Code' },
      { field: 'exactLocation', label: 'Exact Location of Incident' },
      { field: 'localAuthority', label: 'Local Authority' },
      { field: 'workBeingUndertaken', label: 'Work Being Undertaken' },
      { field: 'mainContributoryFactor', label: 'Main Contributory Factor' },
      { field: 'incidentKind', label: 'Incident Kind' },
      { field: 'injuryTypeSustained', label: 'Injury Type Sustained' },
      { field: 'anyPeriodAffected', label: 'Any Period Affected' },
      { field: 'whatHappened', label: 'What Happened' },
      { field: 'severityOfIncident', label: 'Severity of Incident' }
    ];

    const validationErrors: string[] = [];

    requiredFields.forEach(({ field, label }) => {
      if (!formData[field as keyof typeof formData]) {
        validationErrors.push(`${label} is required`);
      }
    });

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Mock submission - frontend only
    setTimeout(() => {
      setIsLoading(false);
      alert('RIDDOR Report saved successfully! (Frontend demo - no actual data stored)');
      router.push('/incidents/riddor');
    }, 2000);
  };

  // Mock dropdown options
  const titleOptions = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'];
  const employmentStatusOptions = ['Employee', 'Contractor', 'Visitor', 'Self Employed', 'Other'];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const locationTypeOptions = ['Workplace', 'Public Place', 'Road/Highway', 'Home', 'Other'];
  const localAuthorityOptions = ['City Council', 'County Council', 'District Council', 'Borough Council'];
  const workTypeOptions = ['Manual Handling', 'Machinery Operation', 'Maintenance', 'Construction', 'Other'];
  const contributoryFactorOptions = ['Human Error', 'Equipment Failure', 'Environmental', 'Procedural', 'Other'];
  const incidentKindOptions = ['Accident', 'Near Miss', 'Dangerous Occurrence', 'Occupational Disease'];
  const injuryTypeOptions = ['Fracture', 'Cut/Laceration', 'Bruise/Contusion', 'Burn', 'Strain/Sprain', 'Other'];
  const periodAffectedOptions = ['Immediate', '1-7 days', '1-4 weeks', '1-3 months', 'Over 3 months'];
  const severityOptions = ['Fatal', 'Major', 'Over 7 day', '3 day', 'Minor'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>New RIDDOR Report</h1>
            <p className="text-gray-600 mt-1">Submit a new RIDDOR report to the Health and Safety Executive</p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Error Display */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Please correct the following errors:</h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Section 1: Notifier Details */}
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Notifier Details (for the person reporting the incident)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierTitle}
                    onChange={(e) => handleFieldChange('notifierTitle', e.target.value)}
                  >
                    <option value="">Select title...</option>
                    {titleOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierFirstName}
                    onChange={(e) => handleFieldChange('notifierFirstName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierLastName}
                    onChange={(e) => handleFieldChange('notifierLastName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierJobTitle}
                    onChange={(e) => handleFieldChange('notifierJobTitle', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telephone Number <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierTelephone}
                    onChange={(e) => handleFieldChange('notifierTelephone', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierEmail}
                    onChange={(e) => handleFieldChange('notifierEmail', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation Address Line 1 <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierAddressLine1}
                    onChange={(e) => handleFieldChange('notifierAddressLine1', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation Address Line 2
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierAddressLine2}
                    onChange={(e) => handleFieldChange('notifierAddressLine2', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation Address Line 3
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierAddressLine3}
                    onChange={(e) => handleFieldChange('notifierAddressLine3', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation Town/City <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierTownCity}
                    onChange={(e) => handleFieldChange('notifierTownCity', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation County
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierCounty}
                    onChange={(e) => handleFieldChange('notifierCounty', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation Post Code <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.notifierPostCode}
                    onChange={(e) => handleFieldChange('notifierPostCode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Injured Party Details */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Injured Party Details (for the person involved in the incident)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.employmentStatus}
                    onChange={(e) => handleFieldChange('employmentStatus', e.target.value)}
                  >
                    <option value="">Select status...</option>
                    {employmentStatusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {formData.employmentStatus === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Employment Status
                    </label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      value={formData.otherEmploymentStatus}
                      onChange={(e) => handleFieldChange('otherEmploymentStatus', e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredTitle}
                    onChange={(e) => handleFieldChange('injuredTitle', e.target.value)}
                  >
                    <option value="">Select title...</option>
                    {titleOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredFirstName}
                    onChange={(e) => handleFieldChange('injuredFirstName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredLastName}
                    onChange={(e) => handleFieldChange('injuredLastName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredJobTitle}
                    onChange={(e) => handleFieldChange('injuredJobTitle', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telephone Number
                  </label>
                  <input 
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredTelephone}
                    onChange={(e) => handleFieldChange('injuredTelephone', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredGender}
                    onChange={(e) => handleFieldChange('injuredGender', e.target.value)}
                  >
                    <option value="">Select gender...</option>
                    {genderOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredAge}
                    onChange={(e) => handleFieldChange('injuredAge', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1 <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredAddressLine1}
                    onChange={(e) => handleFieldChange('injuredAddressLine1', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredAddressLine2}
                    onChange={(e) => handleFieldChange('injuredAddressLine2', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 3
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredAddressLine3}
                    onChange={(e) => handleFieldChange('injuredAddressLine3', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Town/City <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredTownCity}
                    onChange={(e) => handleFieldChange('injuredTownCity', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    County
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredCounty}
                    onChange={(e) => handleFieldChange('injuredCounty', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Code <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuredPostCode}
                    onChange={(e) => handleFieldChange('injuredPostCode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Incident Location */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Incident Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Type <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationType}
                    onChange={(e) => handleFieldChange('locationType', e.target.value)}
                  >
                    <option value="">Select type...</option>
                    {locationTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Name <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationName}
                    onChange={(e) => handleFieldChange('locationName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1 <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationAddressLine1}
                    onChange={(e) => handleFieldChange('locationAddressLine1', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationAddressLine2}
                    onChange={(e) => handleFieldChange('locationAddressLine2', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 3
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationAddressLine3}
                    onChange={(e) => handleFieldChange('locationAddressLine3', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Town/City <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationTownCity}
                    onChange={(e) => handleFieldChange('locationTownCity', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    County
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationCounty}
                    onChange={(e) => handleFieldChange('locationCounty', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Code <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.locationPostCode}
                    onChange={(e) => handleFieldChange('locationPostCode', e.target.value)}
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exact Location of Incident <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.exactLocation}
                    onChange={(e) => handleFieldChange('exactLocation', e.target.value)}
                    placeholder="Describe the exact location where the incident occurred"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Additional Details */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Additional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local Authority <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.localAuthority}
                    onChange={(e) => handleFieldChange('localAuthority', e.target.value)}
                  >
                    <option value="">Select authority...</option>
                    {localAuthorityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      className="mr-2"
                      checked={formData.authorityCannotBeAtLocation}
                      onChange={(e) => handleFieldChange('authorityCannotBeAtLocation', e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-700">Authority cannot be at the incident location</span>
                  </label>
                </div>

                {formData.authorityCannotBeAtLocation && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternative Authority
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      value={formData.alternativeAuthority}
                      onChange={(e) => handleFieldChange('alternativeAuthority', e.target.value)}
                    >
                      <option value="">Select alternative authority...</option>
                      {localAuthorityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work being undertaken at the time of the incident <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.workBeingUndertaken}
                    onChange={(e) => handleFieldChange('workBeingUndertaken', e.target.value)}
                  >
                    <option value="">Select work type...</option>
                    {workTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main contributory factor involved in the incident <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.mainContributoryFactor}
                    onChange={(e) => handleFieldChange('mainContributoryFactor', e.target.value)}
                  >
                    <option value="">Select factor...</option>
                    {contributoryFactorOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident kind <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.incidentKind}
                    onChange={(e) => handleFieldChange('incidentKind', e.target.value)}
                  >
                    <option value="">Select kind...</option>
                    {incidentKindOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Injury type sustained <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.injuryTypeSustained}
                    onChange={(e) => handleFieldChange('injuryTypeSustained', e.target.value)}
                  >
                    <option value="">Select injury type...</option>
                    {injuryTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any period affected <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.anyPeriodAffected}
                    onChange={(e) => handleFieldChange('anyPeriodAffected', e.target.value)}
                  >
                    <option value="">Select period...</option>
                    {periodAffectedOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity of incident <span className="text-red-600">*</span>
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    value={formData.severityOfIncident}
                    onChange={(e) => handleFieldChange('severityOfIncident', e.target.value)}
                  >
                    <option value="">Select severity...</option>
                    {severityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What happened <span className="text-red-600">*</span>
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    rows={4}
                    value={formData.whatHappened}
                    onChange={(e) => handleFieldChange('whatHappened', e.target.value)}
                    placeholder="Provide a detailed description of what happened during the incident"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Status and Notes */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Status and Notes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
                    value={formData.status}
                    readOnly
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    placeholder="Add any additional notes or comments"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 mt-8">
              <button 
                type="submit"
                disabled={isLoading}
                style={{ 
                  backgroundColor: isLoading ? '#9CA3AF' : '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save RIDDOR Submission'
                )}
              </button>
              <button 
                type="button"
                onClick={() => router.push("/incidents/riddor")}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}