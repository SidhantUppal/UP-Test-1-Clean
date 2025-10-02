"use client";

import { useSearchParams } from "next/navigation";
import { useIncidentForm } from '@/hooks/useIncidentForm';
import { BaseIncidentForm } from '@/components/incidents/BaseIncidentForm';
import { FormField, FormInput, FormTextarea, FormSelect, FormRadioGroup } from '@/components/forms/FormField';

// Define validation rules for dangerous occurrence incidents
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
    message: 'Incident location is required',
    validator: (value: string) => Boolean(value?.trim())
  },
  {
    field: 'dangerousOccurrenceType',
    message: 'Type of dangerous occurrence is required',
    validator: (value: string) => Boolean(value)
  },
  {
    field: 'whatHappened',
    message: 'Description of what happened is required',
    validator: (value: string) => Boolean(value?.trim())
  }
];

// Initial form structure for Dangerous Occurrence (matching original structure)
const INITIAL_FORM_DATA = {
  // Basic incident info
  incidentDate: '',
  incidentTime: '',

  // Person reporting the incident
  reporterRelationship: '',
  reporterEmployee: '',
  reporterOtherRelationship: '',
  reporterTitle: '',
  reporterFirstName: '',
  reporterLastName: '',
  reporterJobTitle: '',
  reporterPhone: '',
  reporterEmail: '',
  reporterLocation: '',
  reporterSelectLocation: '',
  reporterCompany: '',
  reporterAddress: '',
  reporterWorkType: '',

  // About the incident
  incidentLocation: '',
  incidentLocationAddress: '',
  localAuthorityName: '',
  incidentDescription: '',
  dangerousOccurrenceType: '',
  whatHappened: ''
};

export default function DangerousOccurrenceForm() {
  const searchParams = useSearchParams();
  const incidentCaseId = searchParams.get('id') ? parseInt(searchParams.get('id')!, 10) : null;

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
    formStorageKey: `dangerous-occurrence-form-${incidentCaseId || 'new'}`,
    initialFormData: INITIAL_FORM_DATA,
    validationRules: VALIDATION_RULES
  });

  // Define options for dropdowns
  const relationshipOptions = [
    { value: 'employee', label: 'Employee' },
    { value: 'contractor', label: 'Contractor' },
    { value: 'visitor', label: 'Visitor' },
    { value: 'client', label: 'Client/Customer' },
    { value: 'other', label: 'Other' }
  ];

  const titleOptions = [
    { value: 'mr', label: 'Mr' },
    { value: 'mrs', label: 'Mrs' },
    { value: 'miss', label: 'Miss' },
    { value: 'ms', label: 'Ms' },
    { value: 'dr', label: 'Dr' }
  ];

  const occurrenceTypeOptions = [
    { value: 'structural-collapse', label: 'Collapse, overturning or failure of load-bearing parts of lifts and lifting equipment' },
    { value: 'explosion-fire', label: 'Explosion, collapse or bursting of any closed vessel or associated pipework' },
    { value: 'plant-failure', label: 'Failure of any freight container in any of its load-bearing parts' },
    { value: 'dangerous-substance', label: 'Accidental release of any substance which may damage health' },
    { value: 'pressure-system', label: 'Failure of any pressure system' },
    { value: 'electrical-incident', label: 'Electrical short circuit or overload causing fire or explosion' },
    { value: 'gas-incident', label: 'Unintentional explosion, misfire, failure of demolition to cause intended collapse' },
    { value: 'biological-agent', label: 'Accidental release of a biological agent' },
    { value: 'radiation', label: 'Failure of industrial radiography or irradiation equipment' },
    { value: 'crane-collapse', label: 'Collapse or overturning of a crane' },
    { value: 'scaffolding-collapse', label: 'Collapse of scaffolding over 5 metres high' },
    { value: 'building-collapse', label: 'Unintended collapse or partial collapse of a building or structure' },
    { value: 'other', label: 'Other dangerous occurrence' }
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const emergencyServicesOptions = [
    'Fire Service', 'Police', 'Ambulance', 'Coastguard', 'Mountain Rescue', 'HAZMAT Team', 'Bomb Disposal', 'Other'
  ];

  const contributingFactorsOptions = [
    'Human error', 'Equipment failure', 'Maintenance issues', 'Design fault',
    'Inadequate procedures', 'Poor communication', 'Training deficiency',
    'Environmental conditions', 'Time pressure', 'Inadequate supervision'
  ];

  const humanFactorsOptions = [
    'Lack of training', 'Fatigue', 'Distraction', 'Rushed work', 'Complacency',
    'Poor communication', 'Inadequate supervision', 'Risk-taking behavior'
  ];

  const equipmentFailureOptions = [
    'Mechanical failure', 'Electrical fault', 'Software malfunction', 'Design defect',
    'Material failure', 'Wear and tear', 'Corrosion', 'Overload'
  ];

  const environmentalFactorsOptions = [
    'Weather conditions', 'Poor lighting', 'Noise', 'Temperature extremes',
    'Vibration', 'Poor housekeeping', 'Limited space', 'Ground conditions'
  ];

  const dangerousOccurrenceOptions = [
    { value: 'structural-collapse', label: 'Collapse, overturning or failure of load-bearing parts of lifts and lifting equipment' },
    { value: 'explosion-fire', label: 'Explosion, collapse or bursting of any closed vessel or associated pipework' },
    { value: 'plant-failure', label: 'Failure of any freight container in any of its load-bearing parts' },
    { value: 'dangerous-substance', label: 'Accidental release of any substance which may damage health' },
    { value: 'pressure-system', label: 'Failure of any pressure system' },
    { value: 'electrical-incident', label: 'Electrical short circuit or overload causing fire or explosion' },
    { value: 'gas-incident', label: 'Unintentional explosion, misfire, failure of demolition to cause intended collapse' },
    { value: 'biological-agent', label: 'Accidental release of a biological agent' },
    { value: 'radiation', label: 'Failure of industrial radiography or irradiation equipment' },
    { value: 'crane-collapse', label: 'Collapse or overturning of a crane' },
    { value: 'scaffolding-collapse', label: 'Collapse of scaffolding over 5 metres high' },
    { value: 'building-collapse', label: 'Unintended collapse or partial collapse of a building or structure' },
    { value: 'other', label: 'Other dangerous occurrence' }
  ];

  return (
    <BaseIncidentForm
      title="Dangerous Occurrence Report Form"
      subtitle="Report dangerous occurrences as defined by RIDDOR regulations"
      incidentData={incidentData}
      loading={loading}
      error={error}
      errorType={errorType}
      showValidationErrors={showValidationErrors}
      onRetry={() => incidentCaseId && loadIncidentData(incidentCaseId)}
      onSubmit={handleSubmit}
    >
      {/* Section 1: Basic Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Date of Occurrence" required>
            <FormInput
              type="date"
              value={formData.incidentDate}
              onChange={(value) => handleFieldChange('incidentDate', value)}
              hasError={hasFieldError('incidentDate')}
            />
          </FormField>

          <FormField label="Time of Occurrence" required>
            <FormInput
              type="time"
              value={formData.incidentTime}
              onChange={(value) => handleFieldChange('incidentTime', value)}
              hasError={hasFieldError('incidentTime')}
            />
          </FormField>
        </div>
      </div>

      {/* Section 2: Person Reporting the Incident */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Person Reporting the Incident</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Relationship to company/organisation">
            <FormSelect
              value={formData.reporterRelationship}
              onChange={(value) => handleFieldChange('reporterRelationship', value)}
              options={relationshipOptions}
              placeholder="Select relationship..."
            />
          </FormField>

          <FormField label="Select employee">
            <FormInput
              value={formData.reporterEmployee}
              onChange={(value) => handleFieldChange('reporterEmployee', value)}
              placeholder="Type employee name or ID"
            />
          </FormField>

          {formData.reporterRelationship === 'other' && (
            <FormField label="Other relationship">
              <FormInput
                value={formData.reporterOtherRelationship}
                onChange={(value) => handleFieldChange('reporterOtherRelationship', value)}
                placeholder="Specify other relationship"
              />
            </FormField>
          )}

          <FormField label="Title">
            <FormSelect
              value={formData.reporterTitle}
              onChange={(value) => handleFieldChange('reporterTitle', value)}
              options={titleOptions}
              placeholder="Select title..."
            />
          </FormField>

          <FormField label="First name">
            <FormInput
              value={formData.reporterFirstName}
              onChange={(value) => handleFieldChange('reporterFirstName', value)}
            />
          </FormField>

          <FormField label="Last name">
            <FormInput
              value={formData.reporterLastName}
              onChange={(value) => handleFieldChange('reporterLastName', value)}
            />
          </FormField>

          <FormField label="Job title">
            <FormInput
              value={formData.reporterJobTitle}
              onChange={(value) => handleFieldChange('reporterJobTitle', value)}
            />
          </FormField>

          <FormField label="Phone number">
            <FormInput
              type="tel"
              value={formData.reporterPhone}
              onChange={(value) => handleFieldChange('reporterPhone', value)}
            />
          </FormField>

          <FormField label="Email">
            <FormInput
              type="email"
              value={formData.reporterEmail}
              onChange={(value) => handleFieldChange('reporterEmail', value)}
            />
          </FormField>

          <FormField label="Location (reporter)">
            <FormInput
              value={formData.reporterLocation}
              onChange={(value) => handleFieldChange('reporterLocation', value)}
            />
          </FormField>

          <FormField label="Select location">
            <FormInput
              value={formData.reporterSelectLocation}
              onChange={(value) => handleFieldChange('reporterSelectLocation', value)}
            />
          </FormField>

          <FormField label="Company">
            <FormInput
              value={formData.reporterCompany}
              onChange={(value) => handleFieldChange('reporterCompany', value)}
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Address">
              <FormTextarea
                value={formData.reporterAddress}
                onChange={(value) => handleFieldChange('reporterAddress', value)}
                rows={3}
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField label="Type of work being undertaken">
              <FormInput
                value={formData.reporterWorkType}
                onChange={(value) => handleFieldChange('reporterWorkType', value)}
                placeholder="Describe the type of work being done at the time"
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section 3: About the Incident */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">About the Incident</h2>

        <div className="space-y-6">
          <FormField label="Location of incident" required>
            <FormInput
              value={formData.incidentLocation}
              onChange={(value) => handleFieldChange('incidentLocation', value)}
              hasError={hasFieldError('incidentLocation')}
              placeholder="Exact location of the dangerous occurrence"
            />
          </FormField>

          <FormField label="Address of incident location">
            <FormTextarea
              value={formData.incidentLocationAddress}
              onChange={(value) => handleFieldChange('incidentLocationAddress', value)}
              rows={3}
              placeholder="Full address where the incident occurred"
            />
          </FormField>

          <FormField label="Local authority name">
            <FormInput
              value={formData.localAuthorityName}
              onChange={(value) => handleFieldChange('localAuthorityName', value)}
              placeholder="Name of local authority"
            />
          </FormField>

          <FormField label="Incident Description">
            <FormTextarea
              value={formData.incidentDescription}
              onChange={(value) => handleFieldChange('incidentDescription', value)}
              rows={4}
              placeholder="Describe the incident in detail"
            />
          </FormField>

          <FormField label="Type of Dangerous Occurrence" required>
            <FormSelect
              value={formData.dangerousOccurrenceType}
              onChange={(value) => handleFieldChange('dangerousOccurrenceType', value)}
              hasError={hasFieldError('dangerousOccurrenceType')}
              options={dangerousOccurrenceOptions}
              placeholder="Select type of dangerous occurrence..."
            />
          </FormField>

          <FormField label="What happened?" required>
            <FormTextarea
              value={formData.whatHappened}
              onChange={(value) => handleFieldChange('whatHappened', value)}
              hasError={hasFieldError('whatHappened')}
              rows={5}
              placeholder="Provide a detailed description of what happened, including sequence of events, conditions present, and any other relevant details"
            />
          </FormField>
        </div>
      </div>

    </BaseIncidentForm>
  );
}