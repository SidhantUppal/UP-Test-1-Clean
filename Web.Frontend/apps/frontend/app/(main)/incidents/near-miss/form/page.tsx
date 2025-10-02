"use client";

import { useSearchParams } from "next/navigation";
import { useIncidentForm } from '@/hooks/useIncidentForm';
import { BaseIncidentForm } from '@/components/incidents/BaseIncidentForm';
import { FormField, FormInput, FormTextarea, FormSelect, FormRadioGroup } from '@/components/forms/FormField';

// Define validation rules for near miss incidents
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
    field: 'whatHappened',
    message: 'Description of what happened is required',
    validator: (value: string) => Boolean(value?.trim())
  },
  {
    field: 'witnessExists',
    message: 'Please confirm whether there was a witness to this incident',
    validator: (value: string) => Boolean(value)
  }
];

// Initial form structure for Near Miss
const INITIAL_FORM_DATA = {
  // Basic incident info
  incidentDate: '',
  incidentTime: '',

  // Person reporting the near miss
  reporterRelationship: '',
  reporterEmployee: '',
  reporterOtherRelationship: '',
  reporterTitle: '',
  reporterFirstName: '',
  reporterLastName: '',
  reporterJobTitle: '',
  reporterPhone: '',
  reporterEmail: '',
  reporterCompany: '',
  reporterAddress: '',
  reporterActivity: '',

  // Witness information
  witnessExists: '',
  witnessRelationship: '',
  witnessEmployee: '',
  witnessOtherRelationship: '',
  witnessTitle: '',
  witnessFirstName: '',
  witnessLastName: '',
  witnessJobTitle: '',
  witnessPhone: '',
  witnessEmail: '',
  witnessAddress: '',
  witnessActivity: '',
  additionalWitnesses: '',
  otherWitnessDetails: '',

  // About the incident
  incidentLocation: '',
  whatHappened: '',
  outcome: '',
  actionsTaken: '',
  otherRelevantInfo: '',

  // Potential accident type
  potentialAccidentType: ''
};

export default function NearMissForm() {
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
    formStorageKey: `near-miss-form-${incidentCaseId || 'new'}`,
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

  const witnessOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const potentialAccidentOptions = [
    { value: 'slip-trip-fall', label: 'Slip, trip or fall' },
    { value: 'manual-handling', label: 'Manual handling injury' },
    { value: 'struck-by-object', label: 'Struck by moving/falling object' },
    { value: 'collision', label: 'Vehicle/equipment collision' },
    { value: 'electrical', label: 'Electrical incident' },
    { value: 'chemical-exposure', label: 'Chemical exposure' },
    { value: 'fire-explosion', label: 'Fire/explosion' },
    { value: 'machinery', label: 'Machinery/equipment incident' },
    { value: 'environmental', label: 'Environmental release' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <BaseIncidentForm
      title="Near Miss Report Form"
      subtitle="Report incidents that could have resulted in injury, illness or damage"
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
          <FormField label="Date of Near Miss" required>
            <FormInput
              type="date"
              value={formData.incidentDate}
              onChange={(value) => handleFieldChange('incidentDate', value)}
              hasError={hasFieldError('incidentDate')}
            />
          </FormField>

          <FormField label="Time of Near Miss" required>
            <FormInput
              type="time"
              value={formData.incidentTime}
              onChange={(value) => handleFieldChange('incidentTime', value)}
              hasError={hasFieldError('incidentTime')}
            />
          </FormField>
        </div>
      </div>

      {/* Section 2: Person Reporting the Near Miss */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Person Reporting the Near Miss</h2>

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
            <FormField label="What activity were you engaged in at the time?">
              <FormInput
                value={formData.reporterActivity}
                onChange={(value) => handleFieldChange('reporterActivity', value)}
                placeholder="Describe your activity during the near miss"
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section 3: Witness Information */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Witness Information</h2>

        <FormField label="Were there any witnesses?" required>
          <FormRadioGroup
            name="witnessExists"
            value={formData.witnessExists}
            onChange={(value) => handleFieldChange('witnessExists', value)}
            options={witnessOptions}
            hasError={hasFieldError('witnessExists')}
            errorMessage="Please confirm whether there were witnesses"
          />
        </FormField>

        {formData.witnessExists === 'yes' && (
          <div className="mt-6">
            <div className="divider">Witness Details</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Relationship to company/organisation">
                <FormSelect
                  value={formData.witnessRelationship}
                  onChange={(value) => handleFieldChange('witnessRelationship', value)}
                  options={relationshipOptions}
                  placeholder="Select relationship..."
                />
              </FormField>

              <FormField label="Select employee">
                <FormInput
                  value={formData.witnessEmployee}
                  onChange={(value) => handleFieldChange('witnessEmployee', value)}
                  placeholder="Type employee name or ID"
                />
              </FormField>

              {formData.witnessRelationship === 'other' && (
                <FormField label="Other relationship">
                  <FormInput
                    value={formData.witnessOtherRelationship}
                    onChange={(value) => handleFieldChange('witnessOtherRelationship', value)}
                    placeholder="Specify other relationship"
                  />
                </FormField>
              )}

              <FormField label="Title">
                <FormSelect
                  value={formData.witnessTitle}
                  onChange={(value) => handleFieldChange('witnessTitle', value)}
                  options={titleOptions}
                  placeholder="Select title..."
                />
              </FormField>

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

              <FormField label="Job title">
                <FormInput
                  value={formData.witnessJobTitle}
                  onChange={(value) => handleFieldChange('witnessJobTitle', value)}
                />
              </FormField>

              <FormField label="Phone number">
                <FormInput
                  type="tel"
                  value={formData.witnessPhone}
                  onChange={(value) => handleFieldChange('witnessPhone', value)}
                />
              </FormField>

              <FormField label="Email">
                <FormInput
                  type="email"
                  value={formData.witnessEmail}
                  onChange={(value) => handleFieldChange('witnessEmail', value)}
                />
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Address">
                  <FormTextarea
                    value={formData.witnessAddress}
                    onChange={(value) => handleFieldChange('witnessAddress', value)}
                    rows={3}
                  />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="What activity were they engaged in at the time?">
                  <FormInput
                    value={formData.witnessActivity}
                    onChange={(value) => handleFieldChange('witnessActivity', value)}
                    placeholder="Describe witness activity during the near miss"
                  />
                </FormField>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <FormField label="Are there any additional witnesses?">
                <FormRadioGroup
                  name="additionalWitnesses"
                  value={formData.additionalWitnesses}
                  onChange={(value) => handleFieldChange('additionalWitnesses', value)}
                  options={witnessOptions}
                />
              </FormField>

              {formData.additionalWitnesses === 'yes' && (
                <FormField label="Other witness details">
                  <FormTextarea
                    value={formData.otherWitnessDetails}
                    onChange={(value) => handleFieldChange('otherWitnessDetails', value)}
                    rows={3}
                    placeholder="Details of additional witnesses"
                  />
                </FormField>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Section 4: About the Incident */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">About the Incident</h2>

        <div className="space-y-6">
          <FormField label="Location of incident" required>
            <FormInput
              value={formData.incidentLocation}
              onChange={(value) => handleFieldChange('incidentLocation', value)}
              hasError={hasFieldError('incidentLocation')}
              placeholder="Specific location where the near miss occurred"
            />
          </FormField>

          <FormField label="What happened?" required>
            <FormTextarea
              value={formData.whatHappened}
              onChange={(value) => handleFieldChange('whatHappened', value)}
              hasError={hasFieldError('whatHappened')}
              rows={4}
              placeholder="Describe exactly what happened during the near miss event..."
            />
          </FormField>

          <FormField label="Outcome">
            <FormTextarea
              value={formData.outcome}
              onChange={(value) => handleFieldChange('outcome', value)}
              rows={3}
              placeholder="What was the actual outcome of this incident?"
            />
          </FormField>

          <FormField label="Actions taken">
            <FormTextarea
              value={formData.actionsTaken}
              onChange={(value) => handleFieldChange('actionsTaken', value)}
              rows={3}
              placeholder="What immediate actions were taken?"
            />
          </FormField>

          <FormField label="Other relevant information">
            <FormTextarea
              value={formData.otherRelevantInfo}
              onChange={(value) => handleFieldChange('otherRelevantInfo', value)}
              rows={3}
              placeholder="Any other information relevant to this near miss..."
            />
          </FormField>
        </div>
      </div>

      {/* Section 5: Potential Accident Type */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Potential Accident Type</h2>

        <FormField label="What type of accident could this have resulted in?">
          <FormSelect
            value={formData.potentialAccidentType}
            onChange={(value) => handleFieldChange('potentialAccidentType', value)}
            options={potentialAccidentOptions}
            placeholder="Select potential accident type..."
          />
        </FormField>
      </div>

    </BaseIncidentForm>
  );
}