"use client";

import { useSearchParams } from "next/navigation";
import { useIncidentForm } from '@/hooks/useIncidentForm';
import { BaseIncidentForm } from '@/components/incidents/BaseIncidentForm';
import { FormField, FormInput, FormTextarea, FormSelect, FormRadioGroup } from '@/components/forms/FormField';

// Define validation rules for high potential incidents
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
    field: 'witnessExists',
    message: 'Please confirm whether there was a witness to this incident',
    validator: (value: string) => Boolean(value)
  }
];

// Initial form structure
const INITIAL_FORM_DATA = {
  // Basic incident info
  incidentDate: '',
  incidentTime: '',

  // Incident Description
  eventDescription: '',
  whoWasInvolved: '',
  whatHappeningBefore: '',

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

  // Potential Severity Assessment
  potentialOutcome: '',
  likelihoodRating: '',
  highPotentialRating: '',
  highPotentialJustification: '',

  // Actual Consequences
  immediateActualOutcome: '',

  // Root Cause and Contributing Factors
  unsafeActContributed: '',
  procedureFollowed: '',
  procedureExplanation: '',
  trainingFactors: [] as string[],
  trainingOtherText: '',
  equipmentFactors: [] as string[],
  equipmentOtherText: '',

  // Barriers and Controls
  barriersFailedMissing: [] as string[],
  barriersPreventIncident: '',
  existingControlsAdequate: '',
  controlsExplanation: '',

  // Corrective/Preventive Actions
  immediateCorrectiveActions: '',
  longerTermActions: '',

  // Learning and Communication
  keyLessons: '',
  preventionRecommendations: '',
  safetyAlertNeeded: false
};

export default function HighPotentialFormRefactored() {
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
    formStorageKey: `high-potential-form-${incidentCaseId || 'new'}`,
    initialFormData: INITIAL_FORM_DATA,
    validationRules: VALIDATION_RULES
  });

  // Define options for dropdowns and radio groups
  const whoInvolvedOptions = [
    { value: 'employee', label: 'Employee (employee picker)' },
    { value: 'contractor', label: 'Contractor' },
    { value: 'visitor', label: 'Visitor to site' },
    { value: 'other', label: 'Employed by someone else' }
  ];

  const relationshipOptions = [
    { value: 'employee', label: 'Employee' },
    { value: 'contractor', label: 'Contractor' },
    { value: 'visitor', label: 'Visitor' },
    { value: 'client', label: 'Client/Customer' },
    { value: 'other', label: 'Other' }
  ];

  const potentialOutcomeOptions = [
    { value: 'fatality', label: 'Fatality' },
    { value: 'major-injury', label: 'Major injury' },
    { value: 'minor-injury', label: 'Minor injury' },
    { value: 'property-damage', label: 'Property damage' },
    { value: 'environmental-impact', label: 'Environmental impact' },
    { value: 'business-disruption', label: 'Business disruption' }
  ];

  const witnessOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  return (
    <BaseIncidentForm
      title="High Potential Incident Form"
      subtitle="Report high potential incidents and near misses"
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
          <FormField label="Incident Date" required>
            <FormInput
              type="date"
              value={formData.incidentDate}
              onChange={(value) => handleFieldChange('incidentDate', value)}
              hasError={hasFieldError('incidentDate')}
              required
            />
          </FormField>

          <FormField label="Incident Time" required>
            <FormInput
              type="time"
              value={formData.incidentTime}
              onChange={(value) => handleFieldChange('incidentTime', value)}
              hasError={hasFieldError('incidentTime')}
              required
            />
          </FormField>
        </div>
      </div>

      {/* Section 2: Incident Description */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Incident Description</h2>

        <div className="space-y-6">
          <FormField label="Brief description of the event undertaken">
            <FormTextarea
              value={formData.eventDescription}
              onChange={(value) => handleFieldChange('eventDescription', value)}
              rows={4}
            />
          </FormField>

          <FormField label="Who was involved">
            <FormSelect
              value={formData.whoWasInvolved}
              onChange={(value) => handleFieldChange('whoWasInvolved', value)}
              options={whoInvolvedOptions}
              placeholder="Select who was involved..."
            />
          </FormField>

          <FormField label="What was happening immediately before the incident?">
            <FormTextarea
              value={formData.whatHappeningBefore}
              onChange={(value) => handleFieldChange('whatHappeningBefore', value)}
              rows={4}
            />
          </FormField>
        </div>
      </div>

      {/* Section 3: Witness Information */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Witness Information</h2>

        <FormField
          label="Was there a witness to this incident?"
          required
          error={hasFieldError('witnessExists') ? 'Please confirm whether there was a witness to this incident' : undefined}
        >
          <FormRadioGroup
            name="witnessExists"
            value={formData.witnessExists}
            onChange={(value) => handleFieldChange('witnessExists', value)}
            options={witnessOptions}
            hasError={hasFieldError('witnessExists')}
            errorMessage="Please confirm whether there was a witness to this incident"
          />
        </FormField>

        {formData.witnessExists === "yes" && (
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
                <FormField label="What activity were they engaged in at the time of the incident?">
                  <FormInput
                    value={formData.witnessActivity}
                    onChange={(value) => handleFieldChange('witnessActivity', value)}
                  />
                </FormField>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Potential Severity Assessment */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Potential Severity Assessment</h2>

        <div className="space-y-6">
          <FormField label="What could realistically have happened if circumstances were slightly different? - Potential outcome">
            <FormSelect
              value={formData.potentialOutcome}
              onChange={(value) => handleFieldChange('potentialOutcome', value)}
              options={potentialOutcomeOptions}
              placeholder="Select potential outcome..."
            />
          </FormField>

          <FormField label="Likelihood rating">
            <FormInput
              value={formData.likelihoodRating}
              onChange={(value) => handleFieldChange('likelihoodRating', value)}
            />
          </FormField>

          <FormField label="High potential rating">
            <FormRadioGroup
              name="highPotentialRating"
              value={formData.highPotentialRating}
              onChange={(value) => handleFieldChange('highPotentialRating', value)}
              options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            />
          </FormField>

          {formData.highPotentialRating && (
            <FormField label="Please provide text justification">
              <FormTextarea
                value={formData.highPotentialJustification}
                onChange={(value) => handleFieldChange('highPotentialJustification', value)}
                rows={3}
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Section 5: Actual Consequences */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Actual Consequences</h2>

        <FormField label="Was there any damage, injury or release? - Immediate actual outcome">
          <FormSelect
            value={formData.immediateActualOutcome}
            onChange={(value) => handleFieldChange('immediateActualOutcome', value)}
            options={[
              { value: 'none', label: 'None' },
              { value: 'minor', label: 'Minor' },
              { value: 'first-aid-only', label: 'First aid only' },
              { value: 'property-damage', label: 'Property damage' }
            ]}
            placeholder="Select outcome..."
          />
        </FormField>
      </div>

      {/* Section 6: Root Cause and Contributing Factors */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Root Cause and Contributing Factors</h2>

        <div className="space-y-6">
          <FormField label="What unsafe act or unsafe condition contributed?">
            <FormTextarea
              value={formData.unsafeActContributed}
              onChange={(value) => handleFieldChange('unsafeActContributed', value)}
              rows={4}
            />
          </FormField>

          <FormField label="Was procedure followed?">
            <FormRadioGroup
              name="procedureFollowed"
              value={formData.procedureFollowed}
              onChange={(value) => handleFieldChange('procedureFollowed', value)}
              options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            />
          </FormField>

          {formData.procedureFollowed === "no" && (
            <FormField label="If no selected - please describe why not">
              <FormTextarea
                value={formData.procedureExplanation}
                onChange={(value) => handleFieldChange('procedureExplanation', value)}
                rows={3}
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Section 7: Barriers and Controls */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Barriers and Controls</h2>

        <div className="space-y-6">
          <FormField label="What prevented this incident from resulting in serious harm?">
            <FormTextarea
              value={formData.barriersPreventIncident}
              onChange={(value) => handleFieldChange('barriersPreventIncident', value)}
              rows={4}
            />
          </FormField>

          <FormField label="Were existing controls adequate?">
            <FormRadioGroup
              name="existingControlsAdequate"
              value={formData.existingControlsAdequate}
              onChange={(value) => handleFieldChange('existingControlsAdequate', value)}
              options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
            />
          </FormField>

          <FormField label="Option to explain further">
            <FormTextarea
              value={formData.controlsExplanation}
              onChange={(value) => handleFieldChange('controlsExplanation', value)}
              rows={3}
            />
          </FormField>
        </div>
      </div>

      {/* Section 8: Corrective/Preventive Actions */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Corrective / Preventive Actions</h2>

        <div className="space-y-6">
          <FormField label="Immediate corrective actions taken">
            <FormTextarea
              value={formData.immediateCorrectiveActions}
              onChange={(value) => handleFieldChange('immediateCorrectiveActions', value)}
              rows={4}
            />
          </FormField>

          <FormField label="Longer term corrective actions">
            <FormTextarea
              value={formData.longerTermActions}
              onChange={(value) => handleFieldChange('longerTermActions', value)}
              rows={4}
            />
          </FormField>
        </div>
      </div>

      {/* Section 9: Learning and Communication */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Learning and Communication</h2>

        <div className="space-y-6">
          <FormField label="Key lessons to share across the organisation">
            <FormTextarea
              value={formData.keyLessons}
              onChange={(value) => handleFieldChange('keyLessons', value)}
              rows={4}
            />
          </FormField>

          <FormField label="Recommendations for preventing recurrence">
            <FormTextarea
              value={formData.preventionRecommendations}
              onChange={(value) => handleFieldChange('preventionRecommendations', value)}
              rows={4}
            />
          </FormField>

          <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={formData.safetyAlertNeeded}
              onChange={(e) => handleFieldChange('safetyAlertNeeded', e.target.checked)}
            />
            <div>
              <span className="label-text">Does this need to be shared in a safety alert?</span>
              <p className="text-sm text-gray-500">
                * Needs dev - take key points of the info to create a safety alert communication that auto populates into document manager. *
              </p>
            </div>
          </div>
        </div>
      </div>

    </BaseIncidentForm>
  );
}