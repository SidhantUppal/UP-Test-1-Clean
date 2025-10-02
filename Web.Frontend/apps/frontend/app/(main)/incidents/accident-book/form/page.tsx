"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useIncidentForm } from '@/hooks/useIncidentForm';
import { BaseIncidentForm } from '@/components/incidents/BaseIncidentForm';
import { FormField, FormInput, FormTextarea, FormSelect, FormRadioGroup } from '@/components/forms/FormField';
import AccidentBookBodyPartPicker from '@/components/incidents/AccidentBookBodyPartPicker';

// Define validation rules for accident book incidents
const VALIDATION_RULES = [
  {
    field: 'incidentDate',
    message: 'Incident date is required',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'incidentTime',
    message: 'Incident time is required',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'incidentLocation',
    message: 'Please specify where the incident happened',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'personRelationship',
    message: 'Person relationship to company is required',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'personFirstName',
    message: 'Person first name is required',
    validator: (value: string) => Boolean(value?.trim())
  },
  {
    field: 'personLastName',
    message: 'Person last name is required',
    validator: (value: string) => Boolean(value?.trim())
  },
  {
    field: 'accidentType',
    message: 'Accident type is required',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'witnessExists',
    message: 'Please confirm if there was a witness to the incident',
    validator: (value: string) => Boolean(value)
  }
];

// Initial form structure for Accident Book
const INITIAL_FORM_DATA = {
  // Basic incident info
  incidentDate: '',
  incidentTime: '',
  additionalReference: '',

  // Basic Details (pre-select registered location to demonstrate the feature)
  incidentLocation: 'At a registered location in my organisation',
  location: 'head-office', // Default to head office
  companyName: '',
  addressLine1: 'Business Safety House, 42 Victoria Street', // Pre-filled from head office
  addressLine2: 'Suite 150',
  addressLine3: '',
  townCity: 'London',
  county: 'Greater London',
  postCode: 'SW1H 0TL',

  // Person who had the accident (with dummy data for demonstration)
  personRelationship: 'Employee',
  personEmployee: 'EMP-2024-001', // Employee ID for John Smith
  personOtherRelationship: '',
  personTitle: 'mr',
  personFirstName: 'John',
  personLastName: 'Smith',
  personJobTitle: 'Safety Officer',
  personCompany: 'Business Safety Solutions Ltd',
  personAddressLine1: '123 Residential Avenue',
  personAddressLine2: 'Flat 4B',
  personAddressLine3: '',
  personTownCity: 'London',
  personCounty: 'Greater London',
  personPostCode: 'SW2 4RT',
  personPhone: '020 7123 4567',
  personEmail: 'john.smith@businesssafety.co.uk',

  // About the accident
  exactLocation: '',
  accidentType: '',
  accidentDescription: '',
  injuryType: '',
  injuredBodyPart: [] as string[],
  firstAidApplied: '',
  firstAiderName: '',
  firstAidEquipment: '',

  // Witness information
  witnessExists: '',
  witnessRelationship: '',
  witnessEmployee: '',
  witnessOtherRelationship: '',
  witnessTitle: '',
  witnessFirstName: '',
  witnessLastName: '',
  witnessJobTitle: '',
  witnessCompany: '',
  witnessPhone: '',
  witnessEmail: '',
  witnessAddressLine1: '',
  witnessAddressLine2: '',
  witnessAddressLine3: '',
  witnessTownCity: '',
  witnessCounty: '',
  witnessPostCode: '',
  witnessActivity: '',
  additionalWitnesses: '',
  otherWitnessDetails: ''
};

// Dummy location data with full addresses
const LOCATION_OPTIONS = [
  {
    id: 'head-office',
    name: 'Head Office',
    addressLine1: 'Business Safety House, 42 Victoria Street',
    addressLine2: 'Suite 150',
    addressLine3: '',
    townCity: 'London',
    county: 'Greater London',
    postCode: 'SW1H 0TL'
  },
  {
    id: 'manchester-branch',
    name: 'Manchester Branch Office',
    addressLine1: '85 Deansgate',
    addressLine2: 'Floor 12',
    addressLine3: 'One Deansgate Square',
    townCity: 'Manchester',
    county: 'Greater Manchester',
    postCode: 'M1 5EA'
  },
  {
    id: 'birmingham-warehouse',
    name: 'Birmingham Distribution Warehouse',
    addressLine1: 'Unit 47, Heartlands Business Park',
    addressLine2: 'Bordesley Green Road',
    addressLine3: '',
    townCity: 'Birmingham',
    county: 'West Midlands',
    postCode: 'B9 5SS'
  },
  {
    id: 'glasgow-depot',
    name: 'Glasgow Regional Depot',
    addressLine1: '156 St Vincent Street',
    addressLine2: 'Third Floor',
    addressLine3: '',
    townCity: 'Glasgow',
    county: 'Lanarkshire',
    postCode: 'G2 5LQ'
  },
  {
    id: 'bristol-facility',
    name: 'Bristol Manufacturing Facility',
    addressLine1: '23 Avon Industrial Estate',
    addressLine2: 'Severnside Trading Park',
    addressLine3: '',
    townCity: 'Bristol',
    county: 'South Gloucestershire',
    postCode: 'BS35 4JN'
  },
  {
    id: 'leeds-office',
    name: 'Leeds Regional Office',
    addressLine1: 'Wellington House, Wellington Street',
    addressLine2: 'Level 8',
    addressLine3: '',
    townCity: 'Leeds',
    county: 'West Yorkshire',
    postCode: 'LS1 2DE'
  }
];

// Dummy employee data with complete details
const EMPLOYEE_OPTIONS = [
  {
    id: 'EMP-2024-001',
    name: 'John Smith',
    fullDisplay: 'EMP-2024-001 - John Smith',
    title: 'mr',
    firstName: 'John',
    lastName: 'Smith',
    jobTitle: 'Safety Officer',
    department: 'Health & Safety',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '123 Residential Avenue',
    addressLine2: 'Flat 4B',
    addressLine3: '',
    townCity: 'London',
    county: 'Greater London',
    postCode: 'SW2 4RT',
    phone: '020 7123 4567',
    email: 'john.smith@businesssafety.co.uk'
  },
  {
    id: 'EMP-2024-002',
    name: 'Sarah Johnson',
    fullDisplay: 'EMP-2024-002 - Sarah Johnson',
    title: 'ms',
    firstName: 'Sarah',
    lastName: 'Johnson',
    jobTitle: 'Production Manager',
    department: 'Manufacturing',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '456 Oak Gardens',
    addressLine2: '',
    addressLine3: '',
    townCity: 'Manchester',
    county: 'Greater Manchester',
    postCode: 'M14 6HY',
    phone: '0161 234 5678',
    email: 'sarah.johnson@businesssafety.co.uk'
  },
  {
    id: 'EMP-2024-003',
    name: 'Michael Brown',
    fullDisplay: 'EMP-2024-003 - Michael Brown',
    title: 'mr',
    firstName: 'Michael',
    lastName: 'Brown',
    jobTitle: 'Warehouse Supervisor',
    department: 'Logistics',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '789 Pine Close',
    addressLine2: 'Unit 12',
    addressLine3: '',
    townCity: 'Birmingham',
    county: 'West Midlands',
    postCode: 'B15 3TG',
    phone: '0121 345 6789',
    email: 'michael.brown@businesssafety.co.uk'
  },
  {
    id: 'EMP-2024-004',
    name: 'Emma Wilson',
    fullDisplay: 'EMP-2024-004 - Emma Wilson',
    title: 'ms',
    firstName: 'Emma',
    lastName: 'Wilson',
    jobTitle: 'Quality Assurance Specialist',
    department: 'Quality Control',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '321 Maple Drive',
    addressLine2: '',
    addressLine3: '',
    townCity: 'Bristol',
    county: 'South Gloucestershire',
    postCode: 'BS8 2LN',
    phone: '0117 456 7890',
    email: 'emma.wilson@businesssafety.co.uk'
  },
  {
    id: 'EMP-2024-005',
    name: 'David Taylor',
    fullDisplay: 'EMP-2024-005 - David Taylor',
    title: 'mr',
    firstName: 'David',
    lastName: 'Taylor',
    jobTitle: 'Maintenance Engineer',
    department: 'Engineering',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '654 Birch Lane',
    addressLine2: 'Apartment 7',
    addressLine3: '',
    townCity: 'Glasgow',
    county: 'Lanarkshire',
    postCode: 'G12 8QW',
    phone: '0141 567 8901',
    email: 'david.taylor@businesssafety.co.uk'
  },
  {
    id: 'EMP-2024-006',
    name: 'Lisa Anderson',
    fullDisplay: 'EMP-2024-006 - Lisa Anderson',
    title: 'ms',
    firstName: 'Lisa',
    lastName: 'Anderson',
    jobTitle: 'HR Coordinator',
    department: 'Human Resources',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '987 Cedar Street',
    addressLine2: '',
    addressLine3: '',
    townCity: 'Leeds',
    county: 'West Yorkshire',
    postCode: 'LS6 3AS',
    phone: '0113 678 9012',
    email: 'lisa.anderson@businesssafety.co.uk'
  },
  {
    id: 'EMP-2024-007',
    name: 'James Thompson',
    fullDisplay: 'EMP-2024-007 - James Thompson',
    title: 'mr',
    firstName: 'James',
    lastName: 'Thompson',
    jobTitle: 'Operations Assistant',
    department: 'Operations',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '147 Willow Road',
    addressLine2: 'Ground Floor',
    addressLine3: '',
    townCity: 'London',
    county: 'Greater London',
    postCode: 'E17 9JK',
    phone: '020 8234 5678',
    email: 'james.thompson@businesssafety.co.uk'
  },
  {
    id: 'EMP-2024-008',
    name: 'Rachel Green',
    fullDisplay: 'EMP-2024-008 - Rachel Green',
    title: 'ms',
    firstName: 'Rachel',
    lastName: 'Green',
    jobTitle: 'Training Coordinator',
    department: 'Learning & Development',
    company: 'Business Safety Solutions Ltd',
    addressLine1: '258 Elm Avenue',
    addressLine2: 'Floor 2',
    addressLine3: '',
    townCity: 'Manchester',
    county: 'Greater Manchester',
    postCode: 'M20 4DS',
    phone: '0161 789 0123',
    email: 'rachel.green@businesssafety.co.uk'
  }
];

export default function AccidentBookForm() {
  const searchParams = useSearchParams();
  const incidentCaseId = searchParams.get('id') ? parseInt(searchParams.get('id')!, 10) : null;

  const [showBodyPartPicker, setShowBodyPartPicker] = useState(false);
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  // Use the reusable incident form hook
  const {
    loading,
    error,
    errorType,
    showValidationErrors,
    incidentData,
    formData,
    handleFieldChange,
    handleArrayFieldChange,
    handleSubmit,
    loadIncidentData,
    hasFieldError
  } = useIncidentForm({
    incidentCaseId,
    formStorageKey: `accident-book-form-${incidentCaseId || 'new'}`,
    initialFormData: INITIAL_FORM_DATA,
    validationRules: VALIDATION_RULES
  });

  // Define options for dropdowns
  const relationshipOptions = [
    { value: 'Employee', label: 'Employee' },
    { value: 'Contractor', label: 'Contractor' },
    { value: 'Visitor', label: 'Visitor' },
    { value: 'Client/Customer', label: 'Client/Customer' },
    { value: 'Other', label: 'Other' }
  ];

  const titleOptions = [
    { value: 'mr', label: 'Mr' },
    { value: 'mrs', label: 'Mrs' },
    { value: 'miss', label: 'Miss' },
    { value: 'ms', label: 'Ms' },
    { value: 'dr', label: 'Dr' }
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const incidentLocationOptions = [
    { value: 'At a registered location in my organisation', label: 'At a registered location in my organisation' },
    { value: 'Elsewhere in my organisation', label: 'Elsewhere in my organisation' },
    { value: 'At someone else\'s premises', label: 'At someone else\'s premises' },
    { value: 'In a public place', label: 'In a public place' }
  ];

  const accidentTypeOptions = [
    { value: 'Another kind of accident', label: 'Another kind of accident' },
    { value: 'Another kind of incident', label: 'Another kind of incident' },
    { value: 'Contact with electricity or electrical discharge', label: 'Contact with electricity or electrical discharge' },
    { value: 'Contact with machinery or material', label: 'Contact with machinery or material' },
    { value: 'Drowned or asphyxiated', label: 'Drowned or asphyxiated' },
    { value: 'Environmental - Emissions to air/water/land', label: 'Environmental - Emissions to air/water/land' },
    { value: 'Exposed or in contact to harmful substance', label: 'Exposed or in contact to harmful substance' },
    { value: 'Exposed to explosion', label: 'Exposed to explosion' },
    { value: 'Exposed to fire', label: 'Exposed to fire' },
    { value: 'Fell from height', label: 'Fell from height' },
    { value: 'Injured by an animal', label: 'Injured by an animal' },
    { value: 'Injured while handling, lifting or carrying', label: 'Injured while handling, lifting or carrying' },
    { value: 'Physically assaulted by a person', label: 'Physically assaulted by a person' },
    { value: 'Slip, trip or fell on the same level', label: 'Slip, trip or fell on the same level' },
    { value: 'Struck by a moving vehicle', label: 'Struck by a moving vehicle' },
    { value: 'Struck by a moving, flying or falling object', label: 'Struck by a moving, flying or falling object' },
    { value: 'Struck by something fixed or stationary', label: 'Struck by something fixed or stationary' },
    { value: 'Trapped by something collapsing', label: 'Trapped by something collapsing' }
  ];

  const injuryTypeOptions = [
    { value: '', label: 'Please select...' },
    { label: 'RIDDOR Reportable', options: [
      { value: 'Amputation (arm, hand, finger, thumb, leg, foot, toe)', label: 'Amputation (arm, hand, finger, thumb, leg, foot, toe)' },
      { value: 'Blinding', label: 'Blinding' },
      { value: 'Bone fracture (excluding finger, thumb or toe)', label: 'Bone fracture (excluding finger, thumb or toe)' },
      { value: 'Crush', label: 'Crush' },
      { value: 'Injuries associated with working in an enclosed space', label: 'Injuries associated with working in an enclosed space' },
      { value: 'Loss of consciousness', label: 'Loss of consciousness' },
      { value: 'Scalping', label: 'Scalping' },
      { value: 'Serious burns', label: 'Serious burns' }
    ]},
    { label: 'Other', options: [
      { value: 'Amputation', label: 'Amputation' },
      { value: 'Asphyxia or poisonings', label: 'Asphyxia or poisonings' },
      { value: 'Burns', label: 'Burns' },
      { value: 'Concussion and/or internal injuries', label: 'Concussion and/or internal injuries' },
      { value: 'Contusions and bruising', label: 'Contusions and bruising' },
      { value: 'Dislocation without fracture', label: 'Dislocation without fracture' },
      { value: 'Electric shock', label: 'Electric shock' },
      { value: 'Foreign body', label: 'Foreign body' },
      { value: 'Fracture', label: 'Fracture' },
      { value: 'Lacerations and open wounds', label: 'Lacerations and open wounds' },
      { value: 'Loss of sight', label: 'Loss of sight' },
      { value: 'Multiple injuries', label: 'Multiple injuries' },
      { value: 'Natural causes', label: 'Natural causes' },
      { value: 'Other known injuries', label: 'Other known injuries' },
      { value: 'Other not known', label: 'Other not known' },
      { value: 'Strains and sprains', label: 'Strains and sprains' },
      { value: 'Superficial injuries', label: 'Superficial injuries' }
    ]}
  ];

  const handleMultiSelectChange = (field: string, selectedValues: string[]) => {
    handleArrayFieldChange(field, selectedValues, true);
  };

  // Handle location selection and auto-populate address
  const handleLocationSelect = (locationId: string) => {
    handleFieldChange('location', locationId);

    // Auto-populate address fields based on selected location
    const selectedLocation = LOCATION_OPTIONS.find(loc => loc.id === locationId);
    if (selectedLocation) {
      handleFieldChange('addressLine1', selectedLocation.addressLine1);
      handleFieldChange('addressLine2', selectedLocation.addressLine2);
      handleFieldChange('addressLine3', selectedLocation.addressLine3);
      handleFieldChange('townCity', selectedLocation.townCity);
      handleFieldChange('county', selectedLocation.county);
      handleFieldChange('postCode', selectedLocation.postCode);
    }
  };

  // Handle employee selection and auto-populate person details
  const handleEmployeeSelect = (employeeId: string) => {
    handleFieldChange('personEmployee', employeeId);

    // Auto-populate person fields based on selected employee
    const selectedEmployee = EMPLOYEE_OPTIONS.find(emp => emp.id === employeeId);
    if (selectedEmployee) {
      handleFieldChange('personTitle', selectedEmployee.title);
      handleFieldChange('personFirstName', selectedEmployee.firstName);
      handleFieldChange('personLastName', selectedEmployee.lastName);
      handleFieldChange('personJobTitle', selectedEmployee.jobTitle);
      handleFieldChange('personCompany', selectedEmployee.company);
      handleFieldChange('personAddressLine1', selectedEmployee.addressLine1);
      handleFieldChange('personAddressLine2', selectedEmployee.addressLine2);
      handleFieldChange('personAddressLine3', selectedEmployee.addressLine3);
      handleFieldChange('personTownCity', selectedEmployee.townCity);
      handleFieldChange('personCounty', selectedEmployee.county);
      handleFieldChange('personPostCode', selectedEmployee.postCode);
      handleFieldChange('personPhone', selectedEmployee.phone);
      handleFieldChange('personEmail', selectedEmployee.email);
    }
  };

  // Handle witness employee selection and auto-populate witness details
  const handleWitnessEmployeeSelect = (employeeId: string) => {
    handleFieldChange('witnessEmployee', employeeId);

    // Auto-populate witness fields based on selected employee
    const selectedEmployee = EMPLOYEE_OPTIONS.find(emp => emp.id === employeeId);
    if (selectedEmployee) {
      handleFieldChange('witnessTitle', selectedEmployee.title);
      handleFieldChange('witnessFirstName', selectedEmployee.firstName);
      handleFieldChange('witnessLastName', selectedEmployee.lastName);
      handleFieldChange('witnessJobTitle', selectedEmployee.jobTitle);
      handleFieldChange('witnessCompany', selectedEmployee.company);
      handleFieldChange('witnessAddressLine1', selectedEmployee.addressLine1);
      handleFieldChange('witnessAddressLine2', selectedEmployee.addressLine2);
      handleFieldChange('witnessAddressLine3', selectedEmployee.addressLine3);
      handleFieldChange('witnessTownCity', selectedEmployee.townCity);
      handleFieldChange('witnessCounty', selectedEmployee.county);
      handleFieldChange('witnessPostCode', selectedEmployee.postCode);
      handleFieldChange('witnessPhone', selectedEmployee.phone);
      handleFieldChange('witnessEmail', selectedEmployee.email);
    }
  };

  // Handle save as work in progress
  const handleSaveProgress = async () => {
    setIsSavingProgress(true);

    try {
      // Simulate saving to database as work in progress
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save form data to localStorage for persistence
      if (typeof window !== 'undefined') {
        const progressData = {
          ...formData,
          status: 'work-in-progress',
          savedAt: new Date().toISOString(),
          progressId: `accident-book-wip-${Date.now()}`
        };

        localStorage.setItem(
          `accident-book-progress-${incidentCaseId || 'new'}`,
          JSON.stringify(progressData)
        );

        // Show success message
        alert('Progress saved successfully! You can return to complete this form later.');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Failed to save progress. Please try again.');
    } finally {
      setIsSavingProgress(false);
    }
  };

  return (
    <>
    <BaseIncidentForm
      title="Accident Book Record"
      subtitle="Complete detailed accident record for workplace injuries"
      incidentData={incidentData}
      loading={loading}
      error={error}
      errorType={errorType}
      showValidationErrors={showValidationErrors}
      onRetry={() => incidentCaseId && loadIncidentData(incidentCaseId)}
      onSubmit={handleSubmit}
      onSaveProgress={handleSaveProgress}
      isSavingProgress={isSavingProgress}
    >

      {/* Section 1: Basic Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Incident Date" required hasError={hasFieldError('incidentDate')}>
            <FormInput
              name="incidentDate"
              type="date"
              value={formData.incidentDate}
              onChange={(value) => handleFieldChange('incidentDate', value)}
              hasError={hasFieldError('incidentDate')}
            />
          </FormField>

          <FormField label="Incident Time" required hasError={hasFieldError('incidentTime')}>
            <FormInput
              name="incidentTime"
              type="time"
              value={formData.incidentTime}
              onChange={(value) => handleFieldChange('incidentTime', value)}
              hasError={hasFieldError('incidentTime')}
            />
          </FormField>
        </div>

        <FormField label="Additional Reference">
          <FormInput
            value={formData.additionalReference}
            onChange={(value) => handleFieldChange('additionalReference', value)}
            placeholder="Additional reference information from initial report"
          />
        </FormField>
      </div>

      {/* Section 2: Basic Details */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Basic Details</h2>

        <div className="space-y-6">
          <FormField label="Where did the incident happen?" required hasError={hasFieldError('incidentLocation')}>
            <FormSelect
              name="incidentLocation"
              value={formData.incidentLocation}
              onChange={(value) => handleFieldChange('incidentLocation', value)}
              options={incidentLocationOptions}
              placeholder="Please select..."
              hasError={hasFieldError('incidentLocation')}
            />
          </FormField>

          {formData.incidentLocation === "At a registered location in my organisation" && (
            <FormField label="Location">
              <FormSelect
                value={formData.location}
                onChange={handleLocationSelect}
                options={[
                  { value: '', label: 'Please select a location...' },
                  ...LOCATION_OPTIONS.map(loc => ({
                    value: loc.id,
                    label: loc.name
                  }))
                ]}
                placeholder="Select from registered locations"
              />
              {formData.location && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Selected:</strong> {LOCATION_OPTIONS.find(loc => loc.id === formData.location)?.name}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Address details will be automatically populated below.</p>
                </div>
              )}
            </FormField>
          )}

          {formData.incidentLocation === "At someone else's premises" && (
            <FormField label="Company name (if appropriate)">
              <FormInput
                value={formData.companyName}
                onChange={(value) => handleFieldChange('companyName', value)}
              />
            </FormField>
          )}

          {/* Address Information Header */}
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Address Information</h4>
            {formData.location && formData.incidentLocation === "At a registered location in my organisation" && (
              <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  ✓ Address auto-populated from selected location. You can modify any field if needed.
                </p>
              </div>
            )}
          </div>

          <FormField label="Address line 1">
            <FormInput
              value={formData.addressLine1}
              onChange={(value) => handleFieldChange('addressLine1', value)}
            />
          </FormField>

          <FormField label="Address line 2">
            <FormInput
              value={formData.addressLine2}
              onChange={(value) => handleFieldChange('addressLine2', value)}
            />
          </FormField>

          <FormField label="Address line 3">
            <FormInput
              value={formData.addressLine3}
              onChange={(value) => handleFieldChange('addressLine3', value)}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="Town/City">
              <FormInput
                value={formData.townCity}
                onChange={(value) => handleFieldChange('townCity', value)}
              />
            </FormField>

            <FormField label="County">
              <FormInput
                value={formData.county}
                onChange={(value) => handleFieldChange('county', value)}
              />
            </FormField>

            <FormField label="Post code">
              <FormInput
                value={formData.postCode}
                onChange={(value) => handleFieldChange('postCode', value)}
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section 3: About the person who had the accident */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">About the person who had the accident</h2>

        <div className="space-y-6">
          <FormField label="Relationship to company/organisation" required hasError={hasFieldError('personRelationship')}>
            <FormSelect
              name="personRelationship"
              value={formData.personRelationship}
              onChange={(value) => handleFieldChange('personRelationship', value)}
              options={relationshipOptions}
              placeholder="Select relationship..."
              hasError={hasFieldError('personRelationship')}
            />
          </FormField>

          {formData.personRelationship === "Employee" && (
            <FormField label="Select employee">
              <FormSelect
                value={formData.personEmployee}
                onChange={handleEmployeeSelect}
                options={[
                  { value: '', label: 'Please select an employee...' },
                  ...EMPLOYEE_OPTIONS.map(emp => ({
                    value: emp.id,
                    label: emp.fullDisplay
                  }))
                ]}
                placeholder="Choose from employee directory"
              />
              {formData.personEmployee && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Selected:</strong> {EMPLOYEE_OPTIONS.find(emp => emp.id === formData.personEmployee)?.name}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Employee details will be automatically populated below.</p>
                </div>
              )}
            </FormField>
          )}

          {formData.personRelationship === "Other" && (
            <FormField label="Other relationship">
              <FormInput
                value={formData.personOtherRelationship}
                onChange={(value) => handleFieldChange('personOtherRelationship', value)}
              />
            </FormField>
          )}

          {/* Person Details Header */}
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Personal Details</h4>
            {formData.personEmployee && formData.personRelationship === "Employee" && (
              <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  ✓ Employee details auto-populated from HR directory. You can modify any field if needed.
                </p>
              </div>
            )}
          </div>

          <FormField label="Title">
            <FormSelect
              value={formData.personTitle}
              onChange={(value) => handleFieldChange('personTitle', value)}
              options={titleOptions}
              placeholder="Select title..."
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="First name" required hasError={hasFieldError('personFirstName')}>
              <FormInput
                name="personFirstName"
                value={formData.personFirstName}
                onChange={(value) => handleFieldChange('personFirstName', value)}
                hasError={hasFieldError('personFirstName')}
              />
            </FormField>

            <FormField label="Last name" required hasError={hasFieldError('personLastName')}>
              <FormInput
                name="personLastName"
                value={formData.personLastName}
                onChange={(value) => handleFieldChange('personLastName', value)}
                hasError={hasFieldError('personLastName')}
              />
            </FormField>

            <FormField label="Job title (if appropriate)">
              <FormInput
                value={formData.personJobTitle}
                onChange={(value) => handleFieldChange('personJobTitle', value)}
              />
            </FormField>

            <FormField label="Company name (if appropriate)">
              <FormInput
                value={formData.personCompany}
                onChange={(value) => handleFieldChange('personCompany', value)}
              />
            </FormField>

            <FormField label="Telephone number">
              <FormInput
                type="tel"
                value={formData.personPhone}
                onChange={(value) => handleFieldChange('personPhone', value)}
              />
            </FormField>

            <FormField label="E-mail address">
              <FormInput
                type="email"
                value={formData.personEmail}
                onChange={(value) => handleFieldChange('personEmail', value)}
              />
            </FormField>
          </div>

          <FormField label="Address line 1">
            <FormInput
              value={formData.personAddressLine1}
              onChange={(value) => handleFieldChange('personAddressLine1', value)}
            />
          </FormField>

          <FormField label="Address line 2">
            <FormInput
              value={formData.personAddressLine2}
              onChange={(value) => handleFieldChange('personAddressLine2', value)}
            />
          </FormField>

          <FormField label="Address line 3">
            <FormInput
              value={formData.personAddressLine3}
              onChange={(value) => handleFieldChange('personAddressLine3', value)}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="Town/City">
              <FormInput
                value={formData.personTownCity}
                onChange={(value) => handleFieldChange('personTownCity', value)}
              />
            </FormField>

            <FormField label="County">
              <FormInput
                value={formData.personCounty}
                onChange={(value) => handleFieldChange('personCounty', value)}
              />
            </FormField>

            <FormField label="Post code">
              <FormInput
                value={formData.personPostCode}
                onChange={(value) => handleFieldChange('personPostCode', value)}
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section 4: About the accident */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">About the accident</h2>

        <div className="space-y-6">
          <FormField label="Exact location of accident">
            <FormInput
              value={formData.exactLocation}
              onChange={(value) => handleFieldChange('exactLocation', value)}
            />
          </FormField>

          <FormField label="What type of accident was it?" required hasError={hasFieldError('accidentType')}>
            <FormSelect
              name="accidentType"
              value={formData.accidentType}
              onChange={(value) => handleFieldChange('accidentType', value)}
              options={accidentTypeOptions}
              placeholder="Please select..."
              hasError={hasFieldError('accidentType')}
            />
          </FormField>

          <FormField label="How did the accident happen?">
            <FormTextarea
              value={formData.accidentDescription}
              onChange={(value) => handleFieldChange('accidentDescription', value)}
              rows={8}
            />
          </FormField>

          <FormField label="If the person suffered an injury, what type of injury was it?">
            <FormSelect
              value={formData.injuryType}
              onChange={(value) => handleFieldChange('injuryType', value)}
              options={injuryTypeOptions.flatMap(group =>
                group.options ? group.options : [group]
              ).filter(option => option.value !== undefined)}
              placeholder="Please select..."
            />
          </FormField>

          <FormField label="If the person suffered an injury, which part of the body was injured?">
            {/* Selected Body Parts Display */}
            {Array.isArray(formData.injuredBodyPart) && formData.injuredBodyPart.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded border">
                <div className="text-sm text-gray-700 mb-2">Selected body parts:</div>
                <div className="flex flex-wrap gap-2">
                  {formData.injuredBodyPart.map((partValue: string) => {
                    const bodyPartNames: Record<string, string> = {
                      '1': 'Eye', '2': 'Ear', '3': 'Other parts of face', '4': 'Head',
                      '5': 'Several head locations', '6': 'Neck', '7': 'Back', '8': 'Trunk',
                      '9': 'Several torso locations', '10': 'Finger or fingers', '11': 'Hand',
                      '12': 'Wrist', '13': 'Upper limb', '14': 'Several upper limb locations',
                      '15': 'Toe', '16': 'Foot', '17': 'Ankle', '18': 'Lower limb',
                      '19': 'Several lower limb locations', '20': 'Several locations',
                      '21': 'General locations', '22': 'Unknown locations'
                    };
                    return (
                      <span key={partValue} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {bodyPartNames[partValue] || `Part ${partValue}`}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedParts = (formData.injuredBodyPart as string[]).filter(p => p !== partValue);
                            handleMultiSelectChange('injuredBodyPart', updatedParts);
                          }}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Launch Body Part Picker Button */}
            <button
              type="button"
              onClick={() => setShowBodyPartPicker(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Launch body part picker...
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </FormField>

          <FormField label="Was first aid applied?">
            <FormRadioGroup
              name="firstAidApplied"
              value={formData.firstAidApplied}
              onChange={(value) => handleFieldChange('firstAidApplied', value)}
              options={yesNoOptions}
            />
          </FormField>

          {formData.firstAidApplied === "yes" && (
            <>
              <FormField label="Name of first aider">
                <FormInput
                  value={formData.firstAiderName}
                  onChange={(value) => handleFieldChange('firstAiderName', value)}
                />
              </FormField>

              <FormField label="State any pieces of first aid equipment used">
                <FormInput
                  value={formData.firstAidEquipment}
                  onChange={(value) => handleFieldChange('firstAidEquipment', value)}
                />
              </FormField>
            </>
          )}
        </div>
      </div>

      {/* Section 5: Witness Information */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Witness Information</h2>

        <FormField label="Was there a witness to this incident?" required hasError={hasFieldError('witnessExists')}>
          <FormRadioGroup
            name="witnessExists"
            value={formData.witnessExists}
            onChange={(value) => handleFieldChange('witnessExists', value)}
            options={yesNoOptions}
            hasError={hasFieldError('witnessExists')}
            errorMessage="Please confirm if there was a witness to the incident"
          />
        </FormField>

        {formData.witnessExists === "yes" && (
          <div className="mt-6">
            <div className="divider">Witness Details</div>

            <div className="space-y-6">
              <FormField label="Relationship to company/organisation">
                <FormSelect
                  value={formData.witnessRelationship}
                  onChange={(value) => handleFieldChange('witnessRelationship', value)}
                  options={relationshipOptions}
                  placeholder="Select relationship..."
                />
              </FormField>

              {formData.witnessRelationship === "Employee" && (
                <FormField label="Select employee">
                  <FormSelect
                    value={formData.witnessEmployee}
                    onChange={handleWitnessEmployeeSelect}
                    options={[
                      { value: '', label: 'Please select an employee...' },
                      ...EMPLOYEE_OPTIONS.map(emp => ({
                        value: emp.id,
                        label: emp.fullDisplay
                      }))
                    ]}
                    placeholder="Choose from employee directory"
                  />
                  {formData.witnessEmployee && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-blue-700">
                        <strong>Selected:</strong> {EMPLOYEE_OPTIONS.find(emp => emp.id === formData.witnessEmployee)?.name}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Employee details will be automatically populated below.</p>
                    </div>
                  )}
                </FormField>
              )}

              {formData.witnessRelationship === "Other" && (
                <FormField label="Other relationship">
                  <FormInput
                    value={formData.witnessOtherRelationship}
                    onChange={(value) => handleFieldChange('witnessOtherRelationship', value)}
                  />
                </FormField>
              )}

              {/* Witness Personal Details Header */}
              <div className="border-t border-gray-300 pt-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Witness Personal Details</h4>
                {formData.witnessEmployee && formData.witnessRelationship === "Employee" && (
                  <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-700">
                      ✓ Witness details auto-populated from HR directory. You can modify any field if needed.
                    </p>
                  </div>
                )}
              </div>

              <FormField label="Title">
                <FormSelect
                  value={formData.witnessTitle}
                  onChange={(value) => handleFieldChange('witnessTitle', value)}
                  options={titleOptions}
                  placeholder="Select title..."
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="First name">
                  <FormInput
                    value={formData.witnessFirstName}
                    onChange={(value) => handleFieldChange('witnessFirstName', value)}
                  />
                </FormField>

                <FormField label="Last name">
                  <FormInput
                    value={formData.witnessLastName}
                    onChange={(value) => handleFieldChange('witnessLastName', value)}
                  />
                </FormField>

                <FormField label="Job title (if appropriate)">
                  <FormInput
                    value={formData.witnessJobTitle}
                    onChange={(value) => handleFieldChange('witnessJobTitle', value)}
                  />
                </FormField>

                <FormField label="Company name (if appropriate)">
                  <FormInput
                    value={formData.witnessCompany}
                    onChange={(value) => handleFieldChange('witnessCompany', value)}
                  />
                </FormField>

                <FormField label="Telephone number">
                  <FormInput
                    type="tel"
                    value={formData.witnessPhone}
                    onChange={(value) => handleFieldChange('witnessPhone', value)}
                  />
                </FormField>

                <FormField label="E-mail address">
                  <FormInput
                    type="email"
                    value={formData.witnessEmail}
                    onChange={(value) => handleFieldChange('witnessEmail', value)}
                  />
                </FormField>
              </div>

              <FormField label="Address line 1">
                <FormInput
                  value={formData.witnessAddressLine1}
                  onChange={(value) => handleFieldChange('witnessAddressLine1', value)}
                />
              </FormField>

              <FormField label="Address line 2">
                <FormInput
                  value={formData.witnessAddressLine2}
                  onChange={(value) => handleFieldChange('witnessAddressLine2', value)}
                />
              </FormField>

              <FormField label="Address line 3">
                <FormInput
                  value={formData.witnessAddressLine3}
                  onChange={(value) => handleFieldChange('witnessAddressLine3', value)}
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="Town/City">
                  <FormInput
                    value={formData.witnessTownCity}
                    onChange={(value) => handleFieldChange('witnessTownCity', value)}
                  />
                </FormField>

                <FormField label="County">
                  <FormInput
                    value={formData.witnessCounty}
                    onChange={(value) => handleFieldChange('witnessCounty', value)}
                  />
                </FormField>

                <FormField label="Post code">
                  <FormInput
                    value={formData.witnessPostCode}
                    onChange={(value) => handleFieldChange('witnessPostCode', value)}
                  />
                </FormField>
              </div>

              <FormField label="What activity were they engaged in at the time of the incident?">
                <FormInput
                  value={formData.witnessActivity}
                  onChange={(value) => handleFieldChange('witnessActivity', value)}
                />
              </FormField>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <FormField label="Were there any additional witnesses?">
            <FormRadioGroup
              name="additionalWitnesses"
              value={formData.additionalWitnesses}
              onChange={(value) => handleFieldChange('additionalWitnesses', value)}
              options={yesNoOptions}
            />
          </FormField>

          {formData.additionalWitnesses === "yes" && (
            <FormField label="Details of other witnesses">
              <FormTextarea
                value={formData.otherWitnessDetails}
                onChange={(value) => handleFieldChange('otherWitnessDetails', value)}
                rows={4}
                placeholder="Provide details of any additional witnesses..."
              />
            </FormField>
          )}
        </div>
      </div>

    </BaseIncidentForm>

    {/* Body Part Picker Modal */}
    <AccidentBookBodyPartPicker
      isOpen={showBodyPartPicker}
      onClose={() => setShowBodyPartPicker(false)}
      selectedParts={Array.isArray(formData.injuredBodyPart) ? formData.injuredBodyPart : []}
      onSave={(selectedParts) => {
        handleMultiSelectChange('injuredBodyPart', selectedParts);
      }}
    />
    </>
  );
}