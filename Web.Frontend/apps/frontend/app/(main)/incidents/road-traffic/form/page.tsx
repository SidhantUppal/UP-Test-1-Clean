"use client";

import { useSearchParams } from "next/navigation";
import { useIncidentForm } from '@/hooks/useIncidentForm';
import { BaseIncidentForm } from '@/components/incidents/BaseIncidentForm';
import { FormField, FormInput, FormTextarea, FormSelect, FormRadioGroup } from '@/components/forms/FormField';

// Define validation rules for road traffic incidents
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
    field: 'incidentPlace',
    message: 'Location of incident is required',
    validator: (value: string) => Boolean(value?.trim())
  },
  {
    field: 'vehicleMakeModel',
    message: 'Vehicle make and model is required',
    validator: (value: string) => Boolean(value?.trim())
  },
  {
    field: 'vehicleRegistrationNumber',
    message: 'Vehicle registration number is required',
    validator: (value: string) => Boolean(value?.trim())
  },
  {
    field: 'policeInformed',
    message: 'Please confirm if police were informed',
    validator: (value: string) => Boolean(value)
  }
];

// Initial form structure for Road Traffic
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
  reporterLocationReporter: '',
  reporterSelectLocation: '',
  reporterCompany: '',
  reporterAddress: '',

  // About the driver
  driverRelationship: '',
  driverEmployee: '',
  driverOtherRelationship: '',
  driverTitle: '',
  driverFirstName: '',
  driverLastName: '',
  driverAddressLine1: '',
  driverAddressLine2: '',
  driverAddressLine3: '',
  driverTownCity: '',
  driverCounty: '',
  driverPostcode: '',
  driverAge: '',
  driverOccupation: '',
  driverLicenceType: '',
  driverLicencePeriod: '',
  driverPolicyHolderDifferent: '',
  driverPolicyHolderName: '',
  driverAccidentDetails: '',
  driverProsecutionDetails: '',

  // About the vehicle
  vehicleInsuranceCompany: '',
  vehicleInsurancePolicyNumber: '',
  vehicleMakeModel: '',
  vehicleEngineSize: '',
  vehicleRegistrationNumber: '',
  vehicleOwned: '',
  vehicleOwnerName: '',
  vehicleOwnerAddress: '',
  vehicleHired: '',
  vehicleLeased: '',
  vehiclePurpose: '',
  vehicleDamageDetails: '',
  vehicleInspectionLocation: '',
  vehicleInspectionContact: '',

  // Further details
  incidentPlace: '',
  weatherConditions: '',
  roadConditions: '',
  insuredVehicleSpeed: '',
  roadSpeedLimit: '',
  lightsBeingUsed: '',
  warningLightsUsed: '',
  incidentDescription: '',
  driverInjured: '',
  driverInjuries: '',

  // Passengers
  passengersCount: '',
  passenger1Name: '',
  passenger1Address: '',
  passenger1Age: '',
  passenger2Name: '',
  passenger2Address: '',
  passenger2Age: '',
  passenger3Name: '',
  passenger3Address: '',
  passenger3Age: '',
  passenger4Name: '',
  passenger4Address: '',
  passenger4Age: '',

  // Witnesses
  witnessesCount: '',
  witness1Name: '',
  witness1Address: '',
  witness1Passenger: '',
  witness2Name: '',
  witness2Address: '',
  witness2Passenger: '',
  witness3Name: '',
  witness3Address: '',
  witness3Passenger: '',

  // Other injured persons
  otherInjuredCount: '',
  otherInjured1Name: '',
  otherInjured1Address: '',
  otherInjured1Passenger: '',
  otherInjured1Seatbelt: '',
  otherInjured1Injuries: '',
  otherInjured2Name: '',
  otherInjured2Address: '',
  otherInjured2Passenger: '',
  otherInjured2Seatbelt: '',
  otherInjured2Injuries: '',
  otherInjured3Name: '',
  otherInjured3Address: '',
  otherInjured3Passenger: '',
  otherInjured3Seatbelt: '',
  otherInjured3Injuries: '',

  // Other vehicles/property & Police
  otherVehicleType: '',
  otherVehicleRegistration: '',
  otherVehicleDriverName: '',
  otherVehicleDriverAddress: '',
  otherInsuranceDetails: '',
  otherPropertyDamage: '',
  policeInformed: '',
  policeInformedBy: '',
  policeAttended: '',
  policeIncidentNumber: '',
  policeOfficerDetails: ''
};

export default function RoadTrafficForm() {
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
    formStorageKey: `road-traffic-form-${incidentCaseId || 'new'}`,
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

  const licenceTypeOptions = [
    { value: 'full', label: 'Full Licence' },
    { value: 'provisional', label: 'Provisional Licence' },
    { value: 'international', label: 'International Licence' },
    { value: 'none', label: 'No Licence' }
  ];

  const weatherOptions = [
    { value: 'fine', label: 'Fine' },
    { value: 'raining', label: 'Raining' },
    { value: 'snowing', label: 'Snowing' },
    { value: 'foggy', label: 'Foggy/Misty' },
    { value: 'windy', label: 'Windy' },
    { value: 'other', label: 'Other' }
  ];

  const roadConditionOptions = [
    { value: 'dry', label: 'Dry' },
    { value: 'wet', label: 'Wet' },
    { value: 'icy', label: 'Icy' },
    { value: 'snow', label: 'Snow' },
    { value: 'mud', label: 'Mud' },
    { value: 'oil', label: 'Oil' },
    { value: 'other', label: 'Other' }
  ];

  const lightsOptions = [
    { value: 'none', label: 'None' },
    { value: 'sidelights', label: 'Sidelights' },
    { value: 'headlights-dipped', label: 'Headlights - Dipped' },
    { value: 'headlights-main', label: 'Headlights - Main beam' },
    { value: 'fog-lights', label: 'Fog lights' }
  ];

  const warningLightsOptions = [
    { value: 'none', label: 'None' },
    { value: 'hazard-warning', label: 'Hazard warning lights' },
    { value: 'amber-beacon', label: 'Amber beacon' },
    { value: 'blue-lights', label: 'Blue lights' }
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const vehicleTypeOptions = [
    { value: 'car', label: 'Car' },
    { value: 'van', label: 'Van' },
    { value: 'lorry', label: 'Lorry' },
    { value: 'bus', label: 'Bus' },
    { value: 'coach', label: 'Coach' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'bicycle', label: 'Bicycle' },
    { value: 'other', label: 'Other' }
  ];

  const purposeOptions = [
    { value: 'business', label: 'Business use' },
    { value: 'commuting', label: 'Commuting to/from work' },
    { value: 'social', label: 'Social, domestic and pleasure' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <BaseIncidentForm
      title="Road Traffic Incident Form"
      subtitle="Report road traffic accidents and vehicle incidents"
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
          <FormField label="Date of Incident" required>
            <FormInput
              type="date"
              value={formData.incidentDate}
              onChange={(value) => handleFieldChange('incidentDate', value)}
              hasError={hasFieldError('incidentDate')}
            />
          </FormField>

          <FormField label="Time of Incident" required>
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
              value={formData.reporterLocationReporter}
              onChange={(value) => handleFieldChange('reporterLocationReporter', value)}
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
        </div>
      </div>

      {/* Section 3: About the Driver */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">About the Driver</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Relationship to company/organisation">
            <FormSelect
              value={formData.driverRelationship}
              onChange={(value) => handleFieldChange('driverRelationship', value)}
              options={relationshipOptions}
              placeholder="Select relationship..."
            />
          </FormField>

          <FormField label="Select employee">
            <FormInput
              value={formData.driverEmployee}
              onChange={(value) => handleFieldChange('driverEmployee', value)}
              placeholder="Type employee name or ID"
            />
          </FormField>

          {formData.driverRelationship === 'other' && (
            <FormField label="Other relationship">
              <FormInput
                value={formData.driverOtherRelationship}
                onChange={(value) => handleFieldChange('driverOtherRelationship', value)}
                placeholder="Specify other relationship"
              />
            </FormField>
          )}

          <FormField label="Title">
            <FormSelect
              value={formData.driverTitle}
              onChange={(value) => handleFieldChange('driverTitle', value)}
              options={titleOptions}
              placeholder="Select title..."
            />
          </FormField>

          <FormField label="First name">
            <FormInput
              value={formData.driverFirstName}
              onChange={(value) => handleFieldChange('driverFirstName', value)}
            />
          </FormField>

          <FormField label="Last name">
            <FormInput
              value={formData.driverLastName}
              onChange={(value) => handleFieldChange('driverLastName', value)}
            />
          </FormField>

          <FormField label="Address line 1">
            <FormInput
              value={formData.driverAddressLine1}
              onChange={(value) => handleFieldChange('driverAddressLine1', value)}
            />
          </FormField>

          <FormField label="Address line 2">
            <FormInput
              value={formData.driverAddressLine2}
              onChange={(value) => handleFieldChange('driverAddressLine2', value)}
            />
          </FormField>

          <FormField label="Address line 3">
            <FormInput
              value={formData.driverAddressLine3}
              onChange={(value) => handleFieldChange('driverAddressLine3', value)}
            />
          </FormField>

          <FormField label="Town/City">
            <FormInput
              value={formData.driverTownCity}
              onChange={(value) => handleFieldChange('driverTownCity', value)}
            />
          </FormField>

          <FormField label="County">
            <FormInput
              value={formData.driverCounty}
              onChange={(value) => handleFieldChange('driverCounty', value)}
            />
          </FormField>

          <FormField label="Postcode">
            <FormInput
              value={formData.driverPostcode}
              onChange={(value) => handleFieldChange('driverPostcode', value)}
            />
          </FormField>

          <FormField label="Age">
            <FormInput
              type="number"
              value={formData.driverAge}
              onChange={(value) => handleFieldChange('driverAge', value)}
            />
          </FormField>

          <FormField label="Occupation">
            <FormInput
              value={formData.driverOccupation}
              onChange={(value) => handleFieldChange('driverOccupation', value)}
            />
          </FormField>

          <FormField label="Licence type">
            <FormSelect
              value={formData.driverLicenceType}
              onChange={(value) => handleFieldChange('driverLicenceType', value)}
              options={licenceTypeOptions}
              placeholder="Select licence type..."
            />
          </FormField>

          <FormField label="Period of licence">
            <FormInput
              value={formData.driverLicencePeriod}
              onChange={(value) => handleFieldChange('driverLicencePeriod', value)}
              placeholder="e.g. 5 years"
            />
          </FormField>

          <FormField label="Is policy holder different to driver?">
            <FormRadioGroup
              name="driverPolicyHolderDifferent"
              value={formData.driverPolicyHolderDifferent}
              onChange={(value) => handleFieldChange('driverPolicyHolderDifferent', value)}
              options={yesNoOptions}
            />
          </FormField>

          {formData.driverPolicyHolderDifferent === 'yes' && (
            <FormField label="Policy holder name">
              <FormInput
                value={formData.driverPolicyHolderName}
                onChange={(value) => handleFieldChange('driverPolicyHolderName', value)}
              />
            </FormField>
          )}

          <div className="md:col-span-2">
            <FormField label="Previous accident details (in last 3 years)">
              <FormTextarea
                value={formData.driverAccidentDetails}
                onChange={(value) => handleFieldChange('driverAccidentDetails', value)}
                rows={3}
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField label="Previous prosecution details (in last 3 years)">
              <FormTextarea
                value={formData.driverProsecutionDetails}
                onChange={(value) => handleFieldChange('driverProsecutionDetails', value)}
                rows={3}
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section 4: About the Vehicle */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">About the Vehicle</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Insurance company">
            <FormInput
              value={formData.vehicleInsuranceCompany}
              onChange={(value) => handleFieldChange('vehicleInsuranceCompany', value)}
              placeholder="Vehicle insurance company"
            />
          </FormField>

          <FormField label="Insurance policy number">
            <FormInput
              value={formData.vehicleInsurancePolicyNumber}
              onChange={(value) => handleFieldChange('vehicleInsurancePolicyNumber', value)}
              placeholder="Insurance policy number"
            />
          </FormField>

          <FormField label="Make and model" required>
            <FormInput
              value={formData.vehicleMakeModel}
              onChange={(value) => handleFieldChange('vehicleMakeModel', value)}
              hasError={hasFieldError('vehicleMakeModel')}
              placeholder="e.g. Ford Focus"
            />
          </FormField>

          <FormField label="Engine size">
            <FormInput
              value={formData.vehicleEngineSize}
              onChange={(value) => handleFieldChange('vehicleEngineSize', value)}
              placeholder="e.g. 1.6L"
            />
          </FormField>

          <FormField label="Registration number" required>
            <FormInput
              value={formData.vehicleRegistrationNumber}
              onChange={(value) => handleFieldChange('vehicleRegistrationNumber', value)}
              hasError={hasFieldError('vehicleRegistrationNumber')}
              placeholder="Vehicle registration number"
            />
          </FormField>

          <FormField label="Is vehicle owned by you?">
            <FormRadioGroup
              name="vehicleOwned"
              value={formData.vehicleOwned}
              onChange={(value) => handleFieldChange('vehicleOwned', value)}
              options={yesNoOptions}
            />
          </FormField>

          {formData.vehicleOwned === 'no' && (
            <>
              <FormField label="Owner name">
                <FormInput
                  value={formData.vehicleOwnerName}
                  onChange={(value) => handleFieldChange('vehicleOwnerName', value)}
                />
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Owner address">
                  <FormTextarea
                    value={formData.vehicleOwnerAddress}
                    onChange={(value) => handleFieldChange('vehicleOwnerAddress', value)}
                    rows={3}
                  />
                </FormField>
              </div>
            </>
          )}

          <FormField label="Is vehicle hired?">
            <FormRadioGroup
              name="vehicleHired"
              value={formData.vehicleHired}
              onChange={(value) => handleFieldChange('vehicleHired', value)}
              options={yesNoOptions}
            />
          </FormField>

          <FormField label="Is vehicle leased?">
            <FormRadioGroup
              name="vehicleLeased"
              value={formData.vehicleLeased}
              onChange={(value) => handleFieldChange('vehicleLeased', value)}
              options={yesNoOptions}
            />
          </FormField>

          <FormField label="Purpose of vehicle use">
            <FormSelect
              value={formData.vehiclePurpose}
              onChange={(value) => handleFieldChange('vehiclePurpose', value)}
              options={purposeOptions}
              placeholder="Select purpose..."
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Damage details">
              <FormTextarea
                value={formData.vehicleDamageDetails}
                onChange={(value) => handleFieldChange('vehicleDamageDetails', value)}
                rows={4}
                placeholder="Describe the damage to the vehicle"
              />
            </FormField>
          </div>

          <FormField label="Vehicle inspection location">
            <FormInput
              value={formData.vehicleInspectionLocation}
              onChange={(value) => handleFieldChange('vehicleInspectionLocation', value)}
              placeholder="Where can the vehicle be inspected?"
            />
          </FormField>

          <FormField label="Vehicle inspection contact">
            <FormInput
              value={formData.vehicleInspectionContact}
              onChange={(value) => handleFieldChange('vehicleInspectionContact', value)}
              placeholder="Contact details for inspection"
            />
          </FormField>
        </div>
      </div>

      {/* Section 5: Further Details */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Further Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormField label="Place of incident" required>
              <FormInput
                value={formData.incidentPlace}
                onChange={(value) => handleFieldChange('incidentPlace', value)}
                hasError={hasFieldError('incidentPlace')}
                placeholder="Exact location where incident occurred"
              />
            </FormField>
          </div>

          <FormField label="Weather conditions">
            <FormSelect
              value={formData.weatherConditions}
              onChange={(value) => handleFieldChange('weatherConditions', value)}
              options={weatherOptions}
              placeholder="Select weather conditions..."
            />
          </FormField>

          <FormField label="Road conditions">
            <FormSelect
              value={formData.roadConditions}
              onChange={(value) => handleFieldChange('roadConditions', value)}
              options={roadConditionOptions}
              placeholder="Select road conditions..."
            />
          </FormField>

          <FormField label="Speed of insured vehicle">
            <FormInput
              type="number"
              value={formData.insuredVehicleSpeed}
              onChange={(value) => handleFieldChange('insuredVehicleSpeed', value)}
              placeholder="Speed in mph"
            />
          </FormField>

          <FormField label="Speed limit of road">
            <FormInput
              type="number"
              value={formData.roadSpeedLimit}
              onChange={(value) => handleFieldChange('roadSpeedLimit', value)}
              placeholder="Speed limit in mph"
            />
          </FormField>

          <FormField label="Lights being used">
            <FormSelect
              value={formData.lightsBeingUsed}
              onChange={(value) => handleFieldChange('lightsBeingUsed', value)}
              options={lightsOptions}
              placeholder="Select lights being used..."
            />
          </FormField>

          <FormField label="Warning lights used">
            <FormSelect
              value={formData.warningLightsUsed}
              onChange={(value) => handleFieldChange('warningLightsUsed', value)}
              options={warningLightsOptions}
              placeholder="Select warning lights..."
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Incident description">
              <FormTextarea
                value={formData.incidentDescription}
                onChange={(value) => handleFieldChange('incidentDescription', value)}
                rows={5}
                placeholder="Describe how the incident occurred, what happened, sequence of events, etc."
              />
            </FormField>
          </div>

          <FormField label="Was the driver injured?">
            <FormRadioGroup
              name="driverInjured"
              value={formData.driverInjured}
              onChange={(value) => handleFieldChange('driverInjured', value)}
              options={yesNoOptions}
            />
          </FormField>

          {formData.driverInjured === 'yes' && (
            <div className="md:col-span-2">
              <FormField label="Driver injuries">
                <FormTextarea
                  value={formData.driverInjuries}
                  onChange={(value) => handleFieldChange('driverInjuries', value)}
                  rows={3}
                  placeholder="Describe driver injuries"
                />
              </FormField>
            </div>
          )}
        </div>
      </div>

      {/* Section 6: Passengers */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Passengers</h2>

        <div className="space-y-6">
          <FormField label="Number of passengers">
            <FormInput
              type="number"
              value={formData.passengersCount}
              onChange={(value) => handleFieldChange('passengersCount', value)}
              placeholder="0"
            />
          </FormField>

          {parseInt(formData.passengersCount) > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="Passenger 1 - Name">
                  <FormInput
                    value={formData.passenger1Name}
                    onChange={(value) => handleFieldChange('passenger1Name', value)}
                  />
                </FormField>

                <FormField label="Passenger 1 - Address">
                  <FormInput
                    value={formData.passenger1Address}
                    onChange={(value) => handleFieldChange('passenger1Address', value)}
                  />
                </FormField>

                <FormField label="Passenger 1 - Age">
                  <FormInput
                    type="number"
                    value={formData.passenger1Age}
                    onChange={(value) => handleFieldChange('passenger1Age', value)}
                  />
                </FormField>
              </div>

              {parseInt(formData.passengersCount) > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Passenger 2 - Name">
                    <FormInput
                      value={formData.passenger2Name}
                      onChange={(value) => handleFieldChange('passenger2Name', value)}
                    />
                  </FormField>

                  <FormField label="Passenger 2 - Address">
                    <FormInput
                      value={formData.passenger2Address}
                      onChange={(value) => handleFieldChange('passenger2Address', value)}
                    />
                  </FormField>

                  <FormField label="Passenger 2 - Age">
                    <FormInput
                      type="number"
                      value={formData.passenger2Age}
                      onChange={(value) => handleFieldChange('passenger2Age', value)}
                    />
                  </FormField>
                </div>
              )}

              {parseInt(formData.passengersCount) > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Passenger 3 - Name">
                    <FormInput
                      value={formData.passenger3Name}
                      onChange={(value) => handleFieldChange('passenger3Name', value)}
                    />
                  </FormField>

                  <FormField label="Passenger 3 - Address">
                    <FormInput
                      value={formData.passenger3Address}
                      onChange={(value) => handleFieldChange('passenger3Address', value)}
                    />
                  </FormField>

                  <FormField label="Passenger 3 - Age">
                    <FormInput
                      type="number"
                      value={formData.passenger3Age}
                      onChange={(value) => handleFieldChange('passenger3Age', value)}
                    />
                  </FormField>
                </div>
              )}

              {parseInt(formData.passengersCount) > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Passenger 4 - Name">
                    <FormInput
                      value={formData.passenger4Name}
                      onChange={(value) => handleFieldChange('passenger4Name', value)}
                    />
                  </FormField>

                  <FormField label="Passenger 4 - Address">
                    <FormInput
                      value={formData.passenger4Address}
                      onChange={(value) => handleFieldChange('passenger4Address', value)}
                    />
                  </FormField>

                  <FormField label="Passenger 4 - Age">
                    <FormInput
                      type="number"
                      value={formData.passenger4Age}
                      onChange={(value) => handleFieldChange('passenger4Age', value)}
                    />
                  </FormField>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Section 7: Witnesses */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Witnesses</h2>

        <div className="space-y-6">
          <FormField label="Number of witnesses">
            <FormInput
              type="number"
              value={formData.witnessesCount}
              onChange={(value) => handleFieldChange('witnessesCount', value)}
              placeholder="0"
            />
          </FormField>

          {parseInt(formData.witnessesCount) > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="Witness 1 - Name">
                  <FormInput
                    value={formData.witness1Name}
                    onChange={(value) => handleFieldChange('witness1Name', value)}
                  />
                </FormField>

                <FormField label="Witness 1 - Address">
                  <FormInput
                    value={formData.witness1Address}
                    onChange={(value) => handleFieldChange('witness1Address', value)}
                  />
                </FormField>

                <FormField label="Witness 1 - Passenger?">
                  <FormRadioGroup
                    name="witness1Passenger"
                    value={formData.witness1Passenger}
                    onChange={(value) => handleFieldChange('witness1Passenger', value)}
                    options={yesNoOptions}
                  />
                </FormField>
              </div>

              {parseInt(formData.witnessesCount) > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Witness 2 - Name">
                    <FormInput
                      value={formData.witness2Name}
                      onChange={(value) => handleFieldChange('witness2Name', value)}
                    />
                  </FormField>

                  <FormField label="Witness 2 - Address">
                    <FormInput
                      value={formData.witness2Address}
                      onChange={(value) => handleFieldChange('witness2Address', value)}
                    />
                  </FormField>

                  <FormField label="Witness 2 - Passenger?">
                    <FormRadioGroup
                      name="witness2Passenger"
                      value={formData.witness2Passenger}
                      onChange={(value) => handleFieldChange('witness2Passenger', value)}
                      options={yesNoOptions}
                    />
                  </FormField>
                </div>
              )}

              {parseInt(formData.witnessesCount) > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Witness 3 - Name">
                    <FormInput
                      value={formData.witness3Name}
                      onChange={(value) => handleFieldChange('witness3Name', value)}
                    />
                  </FormField>

                  <FormField label="Witness 3 - Address">
                    <FormInput
                      value={formData.witness3Address}
                      onChange={(value) => handleFieldChange('witness3Address', value)}
                    />
                  </FormField>

                  <FormField label="Witness 3 - Passenger?">
                    <FormRadioGroup
                      name="witness3Passenger"
                      value={formData.witness3Passenger}
                      onChange={(value) => handleFieldChange('witness3Passenger', value)}
                      options={yesNoOptions}
                    />
                  </FormField>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Section 8: Other Injured Persons */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Other Injured Persons</h2>

        <div className="space-y-6">
          <FormField label="Number of other injured persons">
            <FormInput
              type="number"
              value={formData.otherInjuredCount}
              onChange={(value) => handleFieldChange('otherInjuredCount', value)}
              placeholder="0"
            />
          </FormField>

          {parseInt(formData.otherInjuredCount) > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Injured Person 1 - Name">
                  <FormInput
                    value={formData.otherInjured1Name}
                    onChange={(value) => handleFieldChange('otherInjured1Name', value)}
                  />
                </FormField>

                <FormField label="Injured Person 1 - Address">
                  <FormInput
                    value={formData.otherInjured1Address}
                    onChange={(value) => handleFieldChange('otherInjured1Address', value)}
                  />
                </FormField>

                <FormField label="Injured Person 1 - Passenger?">
                  <FormRadioGroup
                    name="otherInjured1Passenger"
                    value={formData.otherInjured1Passenger}
                    onChange={(value) => handleFieldChange('otherInjured1Passenger', value)}
                    options={yesNoOptions}
                  />
                </FormField>

                <FormField label="Injured Person 1 - Seatbelt worn?">
                  <FormRadioGroup
                    name="otherInjured1Seatbelt"
                    value={formData.otherInjured1Seatbelt}
                    onChange={(value) => handleFieldChange('otherInjured1Seatbelt', value)}
                    options={yesNoOptions}
                  />
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="Injured Person 1 - Injuries">
                    <FormTextarea
                      value={formData.otherInjured1Injuries}
                      onChange={(value) => handleFieldChange('otherInjured1Injuries', value)}
                      rows={2}
                      placeholder="Describe injuries"
                    />
                  </FormField>
                </div>
              </div>

              {parseInt(formData.otherInjuredCount) > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Injured Person 2 - Name">
                    <FormInput
                      value={formData.otherInjured2Name}
                      onChange={(value) => handleFieldChange('otherInjured2Name', value)}
                    />
                  </FormField>

                  <FormField label="Injured Person 2 - Address">
                    <FormInput
                      value={formData.otherInjured2Address}
                      onChange={(value) => handleFieldChange('otherInjured2Address', value)}
                    />
                  </FormField>

                  <FormField label="Injured Person 2 - Passenger?">
                    <FormRadioGroup
                      name="otherInjured2Passenger"
                      value={formData.otherInjured2Passenger}
                      onChange={(value) => handleFieldChange('otherInjured2Passenger', value)}
                      options={yesNoOptions}
                    />
                  </FormField>

                  <FormField label="Injured Person 2 - Seatbelt worn?">
                    <FormRadioGroup
                      name="otherInjured2Seatbelt"
                      value={formData.otherInjured2Seatbelt}
                      onChange={(value) => handleFieldChange('otherInjured2Seatbelt', value)}
                      options={yesNoOptions}
                    />
                  </FormField>

                  <div className="md:col-span-2">
                    <FormField label="Injured Person 2 - Injuries">
                      <FormTextarea
                        value={formData.otherInjured2Injuries}
                        onChange={(value) => handleFieldChange('otherInjured2Injuries', value)}
                        rows={2}
                        placeholder="Describe injuries"
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {parseInt(formData.otherInjuredCount) > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Injured Person 3 - Name">
                    <FormInput
                      value={formData.otherInjured3Name}
                      onChange={(value) => handleFieldChange('otherInjured3Name', value)}
                    />
                  </FormField>

                  <FormField label="Injured Person 3 - Address">
                    <FormInput
                      value={formData.otherInjured3Address}
                      onChange={(value) => handleFieldChange('otherInjured3Address', value)}
                    />
                  </FormField>

                  <FormField label="Injured Person 3 - Passenger?">
                    <FormRadioGroup
                      name="otherInjured3Passenger"
                      value={formData.otherInjured3Passenger}
                      onChange={(value) => handleFieldChange('otherInjured3Passenger', value)}
                      options={yesNoOptions}
                    />
                  </FormField>

                  <FormField label="Injured Person 3 - Seatbelt worn?">
                    <FormRadioGroup
                      name="otherInjured3Seatbelt"
                      value={formData.otherInjured3Seatbelt}
                      onChange={(value) => handleFieldChange('otherInjured3Seatbelt', value)}
                      options={yesNoOptions}
                    />
                  </FormField>

                  <div className="md:col-span-2">
                    <FormField label="Injured Person 3 - Injuries">
                      <FormTextarea
                        value={formData.otherInjured3Injuries}
                        onChange={(value) => handleFieldChange('otherInjured3Injuries', value)}
                        rows={2}
                        placeholder="Describe injuries"
                      />
                    </FormField>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Section 9: Other Vehicles/Property & Police */}
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-4">Other Vehicles/Property & Police</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Other vehicle type">
            <FormSelect
              value={formData.otherVehicleType}
              onChange={(value) => handleFieldChange('otherVehicleType', value)}
              options={vehicleTypeOptions}
              placeholder="Select vehicle type..."
            />
          </FormField>

          <FormField label="Other vehicle registration">
            <FormInput
              value={formData.otherVehicleRegistration}
              onChange={(value) => handleFieldChange('otherVehicleRegistration', value)}
              placeholder="Registration number"
            />
          </FormField>

          <FormField label="Other vehicle driver name">
            <FormInput
              value={formData.otherVehicleDriverName}
              onChange={(value) => handleFieldChange('otherVehicleDriverName', value)}
              placeholder="Driver name"
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Other vehicle driver address">
              <FormTextarea
                value={formData.otherVehicleDriverAddress}
                onChange={(value) => handleFieldChange('otherVehicleDriverAddress', value)}
                rows={3}
                placeholder="Full address"
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField label="Other insurance details">
              <FormTextarea
                value={formData.otherInsuranceDetails}
                onChange={(value) => handleFieldChange('otherInsuranceDetails', value)}
                rows={3}
                placeholder="Insurance company and policy details"
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField label="Other property damage">
              <FormTextarea
                value={formData.otherPropertyDamage}
                onChange={(value) => handleFieldChange('otherPropertyDamage', value)}
                rows={3}
                placeholder="Describe any other property damage"
              />
            </FormField>
          </div>

          <FormField label="Was police informed?" required>
            <FormRadioGroup
              name="policeInformed"
              value={formData.policeInformed}
              onChange={(value) => handleFieldChange('policeInformed', value)}
              options={yesNoOptions}
              hasError={hasFieldError('policeInformed')}
              errorMessage="Please confirm if police were informed"
            />
          </FormField>

          <FormField label="Police informed by">
            <FormInput
              value={formData.policeInformedBy}
              onChange={(value) => handleFieldChange('policeInformedBy', value)}
              placeholder="Who informed the police?"
            />
          </FormField>

          <FormField label="Did police attend?">
            <FormRadioGroup
              name="policeAttended"
              value={formData.policeAttended}
              onChange={(value) => handleFieldChange('policeAttended', value)}
              options={yesNoOptions}
            />
          </FormField>

          <FormField label="Police incident number">
            <FormInput
              value={formData.policeIncidentNumber}
              onChange={(value) => handleFieldChange('policeIncidentNumber', value)}
              placeholder="Police incident reference"
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Police officer details">
              <FormTextarea
                value={formData.policeOfficerDetails}
                onChange={(value) => handleFieldChange('policeOfficerDetails', value)}
                rows={2}
                placeholder="Name and contact details of attending officer"
              />
            </FormField>
          </div>
        </div>
      </div>

    </BaseIncidentForm>
  );
}