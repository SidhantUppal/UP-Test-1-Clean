'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Section3OccupancyProfile, Section5MeansOfEscape, Section10ActionPlan } from './sections-remaining';

interface RemediAction {
  id: string;
  action: string;
  priority: 1 | 2 | 3 | 4 | 5;
  hazardAddressed: string;
  recommendationType: 'mandatory' | 'best-practice';
  responsiblePerson: string;
  targetDate: string;
  costEstimate: string;
  status: 'not-started' | 'in-progress' | 'complete';
}

interface TravelDistance {
  location: string;
  actual: string;
  acceptable: string;
  compliant: boolean;
}

export default function PAS79FireRiskAssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [remediActions, setRemediActions] = useState<RemediAction[]>([]);
  const [travelDistances, setTravelDistances] = useState<TravelDistance[]>([]);

  // Section 1: General Information
  const [generalInfo, setGeneralInfo] = useState({
    // Premises Details
    premisesName: '',
    fullAddress: '',
    useOfPremises: '',
    briefDescription: '',
    ownerEmployer: '',
    personsConsulted: [] as string[],
    
    // Assessment Details
    assessmentDate: new Date().toISOString().split('T')[0],
    timeOnSite: '',
    previousAssessmentDate: '',
    suggestedReviewDate: '',
    assessorName: '',
    assessorQualifications: '',
    assessorOrganisation: '',
    
    // Scope and Objectives
    reasonForAssessment: 'first',
    reasonOther: '',
    scopeLimitations: '',
    documentationReviewed: {
      previousFRA: false,
      fireCertificates: false,
      buildingPlans: false,
      fireStrategy: false,
      omManuals: false,
      asbestosRegister: false,
      other: ''
    }
  });

  // Section 2: Fire Hazards and Fire Risk
  const [fireHazards, setFireHazards] = useState({
    // Sources of Ignition
    ignitionSources: {
      electrical: false,
      appliances: false,
      gas: false,
      oil: false,
      solidFuel: false,
      cooking: false,
      heating: false,
      hotWork: false,
      smoking: false,
      arson: false,
      lightning: false,
      other: '',
      observations: '',
      hazardRating: 'normal'
    },
    
    // Sources of Fuel
    fuelSources: {
      flammableLiquids: false,
      flammableGases: false,
      loxGox: false,
      plastics: false,
      paper: false,
      wood: false,
      textiles: false,
      packaging: false,
      waste: false,
      furniture: false,
      fireLoading: 'normal',
      housekeeping: 'adequate',
      observations: ''
    },
    
    // Work Processes
    workProcesses: {
      hotWork: false,
      permitSystem: false,
      contractorsManaged: false,
      specialHazards: ''
    }
  });

  // Section 2.2: Fire Protection Measures
  const [protectionMeasures, setProtectionMeasures] = useState({
    // Means of Escape
    meansOfEscape: {
      numberOfStaircases: '',
      protectedStaircases: 'no',
      numberOfExits: '',
      exitWidthsAdequate: true,
      deadEndsPresent: false,
      innerRooms: 'no',
      conditions: {
        fireDoorsCondition: 'satisfactory',
        selfClosingDevices: 'satisfactory',
        doorHoldOpen: 'satisfactory',
        escapeRouteCondition: 'satisfactory',
        escapeRouteLighting: 'satisfactory',
        obstructions: 'satisfactory',
        securityFastenings: 'satisfactory',
        finalExitDoors: 'satisfactory'
      }
    },
    
    // Fire Warning System
    warningSystem: {
      systemType: 'L2',
      detectionZones: '',
      callPointsProvided: true,
      coverageAdequate: true,
      audibilityChecked: true,
      weeklyTestRegime: true,
      annualService: true,
      observations: ''
    },
    
    // Emergency Lighting
    emergencyLighting: {
      systemType: 'maintained',
      coverageAdequate: true,
      monthlyTestRegime: true,
      annualTestRegime: true,
      recordsMaintained: true
    },
    
    // Fire-Fighting Equipment
    fightingEquipment: {
      provisionAdequate: true,
      annualServiceCurrent: true,
      staffTrained: 'some'
    },
    
    // Fixed Systems
    fixedSystems: {
      sprinklers: false,
      sprinklersType: '',
      wetDryRisers: false,
      smokeControl: false,
      suppressionSystems: false,
      suppressionType: '',
      maintenanceCurrent: true
    }
  });

  // Section 2.3: People at Risk
  const [peopleAtRisk, setPeopleAtRisk] = useState({
    occupancy: {
      maximum: '',
      typical: '',
      outOfHours: '',
      sleepingRisk: false
    },
    characteristics: {
      employeesFamiliar: '',
      employeesUnfamiliar: '',
      contractors: '',
      public: '',
      disabled: '',
      children: '',
      elderly: '',
      loneWorkers: '',
      others: '',
      peepGeepArrangements: ''
    }
  });

  // Section 3: Fire Safety Management
  const [safetyManagement, setSafetyManagement] = useState({
    emergencyPlan: {
      documented: true,
      coversAllScenarios: true,
      assemblyPointsDesignated: true,
      rolesClear: true
    },
    training: {
      fireAwareness: { coverage: 'all', lastDate: '', frequencyMet: true },
      wardenTraining: { coverage: 'some', lastDate: '', frequencyMet: true },
      extinguisherUse: { coverage: 'some', lastDate: '', frequencyMet: true },
      evacuationProcedures: { coverage: 'all', lastDate: '', frequencyMet: true },
      specialResponsibilities: { coverage: 'some', lastDate: '', frequencyMet: true }
    },
    drills: {
      frequency: 'quarterly',
      lastDrillDate: '',
      evacuationTime: '',
      issuesIdentified: '',
      differentScenarios: false
    },
    records: {
      logBookMaintained: true,
      trainingRecordsComplete: true,
      maintenanceCertificatesFiled: true,
      drillRecordsKept: true,
      nearMissRecords: true
    },
    culture: {
      managementCommitment: 3,
      employeeEngagement: 3,
      contractorControl: 3,
      communicationEffectiveness: 3,
      continuousImprovement: 3
    }
  });

  // Section 4: Fire Risk Assessment
  const [riskAssessment, setRiskAssessment] = useState({
    likelihood: 'medium',
    likelihoodJustification: '',
    consequences: 'moderate',
    consequencesJustification: '',
    benchmarkComparison: {
      similarPremises: '',
      sectorAverage: '',
      trend: 'same'
    }
  });

  // Section 5: Action Plan
  const [actionPlan, setActionPlan] = useState({
    significantFindings: '',
    riskReductionMeasures: ''
  });

  // Section 7: Declaration
  const [declaration, setDeclaration] = useState({
    limitationsNoted: '',
    peerReviewName: '',
    peerReviewDate: '',
    peerReviewComments: '',
    responsiblePerson: '',
    responsiblePosition: '',
    acknowledgmentDate: ''
  });

  // Section 8: Occupancy Profile (for PAS79 completeness)
  const [occupancyProfile, setOccupancyProfile] = useState({
    maxOccupancy: '',
    typicalDayOccupancy: '',
    typicalNightOccupancy: '',
    staffNumbers: '',
    visitorNumbers: '',
    contractorNumbers: '',
    childrenPresent: false,
    elderlyPresent: false,
    disabledPresent: false,
    pregnantPersons: false,
    disabledCount: '',
    sleepingAccommodation: false,
    sleepingOccupancy: '',
    nightStaff: ''
  });

  // Section 9: Means of Escape
  const [meansOfEscape, setMeansOfEscape] = useState({
    evacuationStrategy: 'simultaneous',
    evacuationTime: '',
    numberOfExits: '',
    exitCapacity: 'adequate',
    exitSignage: 'compliant',
    disabledProvision: {
      refugeAreas: false,
      evacChairs: false,
      visualAlarms: false,
      tactileSignage: false,
      assistanceAvailable: false
    }
  });

  const sections = [
    { id: 1, title: 'General Information', badge: '1' },
    { id: 2, title: 'Fire Hazards & Risk', badge: '2' },
    { id: 3, title: 'People at Risk', badge: '3' },
    { id: 4, title: 'Safety Management', badge: '4' },
    { id: 5, title: 'Risk Assessment', badge: '5' },
    { id: 6, title: 'Initial Action Plan', badge: '6' },
    { id: 7, title: 'Photos & Evidence', badge: '7' },
    { id: 8, title: 'Occupancy Profile', badge: '8' },
    { id: 9, title: 'Means of Escape', badge: '9' },
    { id: 10, title: 'Full Action Plan', badge: '10' },
    { id: 11, title: 'Additional Evidence', badge: '11' },
    { id: 12, title: 'Declaration', badge: '12' }
  ];

  const calculateRiskRating = () => {
    const likelihoodScore = riskAssessment.likelihood === 'high' ? 3 : riskAssessment.likelihood === 'medium' ? 2 : 1;
    const consequenceScore = riskAssessment.consequences === 'extreme' ? 3 : riskAssessment.consequences === 'moderate' ? 2 : 1;
    const score = likelihoodScore * consequenceScore;
    
    if (score >= 9) return { score, level: 'Intolerable', color: 'text-red-600' };
    if (score >= 6) return { score, level: 'Substantial', color: 'text-orange-600' };
    if (score >= 4) return { score, level: 'Moderate', color: 'text-yellow-600' };
    if (score >= 2) return { score, level: 'Tolerable', color: 'text-blue-600' };
    return { score, level: 'Trivial', color: 'text-green-600' };
  };

  const getPriorityColor = (priority: number) => {
    switch(priority) {
      case 1: return 'bg-red-100 text-red-700 border-red-300';
      case 2: return 'bg-orange-100 text-orange-700 border-orange-300';
      case 3: return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 4: return 'bg-blue-100 text-blue-700 border-blue-300';
      case 5: return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch(priority) {
      case 1: return 'Major/Immediate risk';
      case 2: return 'Action within days';
      case 3: return 'Action within weeks';
      case 4: return 'Action within months';
      case 5: return 'Improvement opportunity';
      default: return '';
    }
  };

  const addRemediAction = () => {
    const newAction: RemediAction = {
      id: Date.now().toString(),
      action: '',
      priority: 3,
      hazardAddressed: '',
      recommendationType: 'best-practice',
      responsiblePerson: '',
      targetDate: '',
      costEstimate: '',
      status: 'not-started'
    };
    setRemediActions([...remediActions, newAction]);
  };

  const updateRemediAction = (id: string, updates: Partial<RemediAction>) => {
    setRemediActions(remediActions.map(action => 
      action.id === id ? { ...action, ...updates } : action
    ));
  };

  const deleteRemediAction = (id: string) => {
    setRemediActions(remediActions.filter(action => action.id !== id));
  };

  const addTravelDistance = () => {
    const newDistance: TravelDistance = {
      location: '',
      actual: '',
      acceptable: '',
      compliant: true
    };
    setTravelDistances([...travelDistances, newDistance]);
  };

  const updateTravelDistance = (index: number, updates: Partial<TravelDistance>) => {
    setTravelDistances(travelDistances.map((distance, i) => 
      i === index ? { ...distance, ...updates } : distance
    ));
  };

  const deleteTravelDistance = (index: number) => {
    setTravelDistances(travelDistances.filter((_, i) => i !== index));
  };

  const addPersonConsulted = () => {
    const name = prompt('Enter name of person consulted:');
    if (name) {
      setGeneralInfo({
        ...generalInfo,
        personsConsulted: [...generalInfo.personsConsulted, name]
      });
    }
  };

  const removePersonConsulted = (index: number) => {
    setGeneralInfo({
      ...generalInfo,
      personsConsulted: generalInfo.personsConsulted.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        type: 'fire-pas79',
        generalInfo,
        fireHazards,
        protectionMeasures,
        peopleAtRisk,
        safetyManagement,
        riskAssessment: {
          ...riskAssessment,
          riskRating: calculateRiskRating()
        },
        actionPlan: {
          ...actionPlan,
          remediActions
        },
        travelDistances,
        declaration
      };

      const response = await fetch('/api/risk-assessments/fire/pas79', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': '1',
          'x-user-id': '1'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create PAS79 fire risk assessment');
      
      const result = await response.json();
      router.push(`/risk-assessments/${result.data?.id || ''}`);
    } catch (error) {
      console.error('Error creating PAS79 fire risk assessment:', error);
      alert('Failed to create PAS79 fire risk assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PAS79 Fire Risk Assessment</h1>
              <p className="text-gray-600 mt-1">Professional standard methodology aligned with PAS79</p>
            </div>
            <Link href="/risk-assessments/create/fire" className="btn btn-ghost">
              ← Back
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-3">
          <div className="flex items-center justify-between">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className={`flex items-center cursor-pointer ${index < sections.length - 1 ? 'flex-1' : ''}`}
                onClick={() => {
                  setCurrentSection(section.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className={`flex items-center ${currentSection === section.id ? 'text-primary' : currentSection > section.id ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    currentSection === section.id ? 'bg-primary text-white border-primary' : 
                    currentSection > section.id ? 'bg-green-600 text-white border-green-600' : 
                    'bg-white border-gray-300'
                  }`}>
                    {section.badge}
                  </span>
                  <span className="hidden lg:inline ml-2 text-sm font-medium">{section.title}</span>
                </div>
                {index < sections.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${currentSection > section.id ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-8 py-6">
        {/* Section 1: General Information */}
        {currentSection === 1 && (
          <div className="space-y-6">
            {/* 1.1 Premises Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">1.1 Premises Details</h2>
              <p className="text-sm text-gray-600 mb-4">Basic information about the premises being assessed</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Premises Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={generalInfo.premisesName}
                    onChange={(e) => setGeneralInfo({...generalInfo, premisesName: e.target.value})}
                    placeholder="Enter premises name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Use of Premises</label>
                  <select
                    className="select select-bordered w-full"
                    value={generalInfo.useOfPremises}
                    onChange={(e) => setGeneralInfo({...generalInfo, useOfPremises: e.target.value})}
                  >
                    <option value="">Select use category</option>
                    <option value="office">Office</option>
                    <option value="retail">Shop/Retail</option>
                    <option value="industrial">Factory/Industrial</option>
                    <option value="warehouse">Warehouse/Storage</option>
                    <option value="residential">Residential Care</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Educational</option>
                    <option value="assembly">Place of Assembly</option>
                    <option value="hotel">Hotel/Boarding House</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Full Address</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    value={generalInfo.fullAddress}
                    onChange={(e) => setGeneralInfo({...generalInfo, fullAddress: e.target.value})}
                    placeholder="Enter full premises address"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Brief Description</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={generalInfo.briefDescription}
                    onChange={(e) => setGeneralInfo({...generalInfo, briefDescription: e.target.value})}
                    placeholder="Provide a brief description of the premises, its layout, and primary activities"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Owner/Employer</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={generalInfo.ownerEmployer}
                    onChange={(e) => setGeneralInfo({...generalInfo, ownerEmployer: e.target.value})}
                    placeholder="Name of owner or employer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Person(s) Consulted</label>
                  <div className="space-y-2">
                    {generalInfo.personsConsulted.map((person, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered input-sm flex-1"
                          value={person}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() => removePersonConsulted(index)}
                          className="btn btn-ghost btn-sm text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPersonConsulted}
                      className="btn btn-outline btn-sm"
                    >
                      + Add Person
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.2 Assessment Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">1.2 Assessment Details</h2>
              <p className="text-sm text-gray-600 mb-4">Information about this assessment and the assessor</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Assessment <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={generalInfo.assessmentDate}
                    onChange={(e) => setGeneralInfo({...generalInfo, assessmentDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time on Site</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={generalInfo.timeOnSite}
                    onChange={(e) => setGeneralInfo({...generalInfo, timeOnSite: e.target.value})}
                    placeholder="e.g., 3 hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date of Previous Assessment</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={generalInfo.previousAssessmentDate}
                    onChange={(e) => setGeneralInfo({...generalInfo, previousAssessmentDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Suggested Date for Review</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={generalInfo.suggestedReviewDate}
                    onChange={(e) => setGeneralInfo({...generalInfo, suggestedReviewDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Assessor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={generalInfo.assessorName}
                    onChange={(e) => setGeneralInfo({...generalInfo, assessorName: e.target.value})}
                    placeholder="Full name of assessor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Assessor Qualifications</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={generalInfo.assessorQualifications}
                    onChange={(e) => setGeneralInfo({...generalInfo, assessorQualifications: e.target.value})}
                    placeholder="e.g., IFE, NEBOSH Fire Certificate"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Assessor Organisation</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={generalInfo.assessorOrganisation}
                    onChange={(e) => setGeneralInfo({...generalInfo, assessorOrganisation: e.target.value})}
                    placeholder="Company or organisation name"
                  />
                </div>
              </div>
            </div>

            {/* 1.3 Scope and Objectives */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">1.3 Scope and Objectives</h2>
              <p className="text-sm text-gray-600 mb-4">Purpose and limitations of this assessment</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Reason for Assessment</label>
                  <div className="space-y-2">
                    {[
                      { value: 'first', label: 'First assessment of these premises' },
                      { value: 'routine', label: 'Routine review' },
                      { value: 'alterations', label: 'Assessment following alterations' },
                      { value: 'fire', label: 'Assessment following a fire' },
                      { value: 'enforcement', label: 'Assessment following enforcement action' },
                      { value: 'other', label: 'Other' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="reason"
                          value={option.value}
                          checked={generalInfo.reasonForAssessment === option.value}
                          onChange={(e) => setGeneralInfo({...generalInfo, reasonForAssessment: e.target.value})}
                          className="radio radio-primary mr-2"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {generalInfo.reasonForAssessment === 'other' && (
                    <input
                      type="text"
                      className="input input-bordered w-full mt-2"
                      value={generalInfo.reasonOther}
                      onChange={(e) => setGeneralInfo({...generalInfo, reasonOther: e.target.value})}
                      placeholder="Please specify other reason"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Scope Limitations</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={generalInfo.scopeLimitations}
                    onChange={(e) => setGeneralInfo({...generalInfo, scopeLimitations: e.target.value})}
                    placeholder="Note any areas not accessed, systems not tested, or other limitations"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Documentation Reviewed</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { key: 'previousFRA', label: 'Previous FRA' },
                      { key: 'fireCertificates', label: 'Fire Certificates' },
                      { key: 'buildingPlans', label: 'Building Plans' },
                      { key: 'fireStrategy', label: 'Fire Strategy' },
                      { key: 'omManuals', label: 'O&M Manuals' },
                      { key: 'asbestosRegister', label: 'Asbestos Register' }
                    ].map(doc => (
                      <label key={doc.key} className="flex items-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary mr-2"
                          checked={generalInfo.documentationReviewed[doc.key as keyof typeof generalInfo.documentationReviewed] as boolean}
                          onChange={(e) => setGeneralInfo({
                            ...generalInfo,
                            documentationReviewed: {
                              ...generalInfo.documentationReviewed,
                              [doc.key]: e.target.checked
                            }
                          })}
                        />
                        <span>{doc.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={generalInfo.documentationReviewed.other}
                      onChange={(e) => setGeneralInfo({
                        ...generalInfo,
                        documentationReviewed: {
                          ...generalInfo.documentationReviewed,
                          other: e.target.value
                        }
                      })}
                      placeholder="Other documents reviewed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Fire Hazards and Fire Risk */}
        {currentSection === 2 && (
          <div className="space-y-6">
            {/* 2.1.1 Sources of Ignition */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.1.1 Sources of Ignition</h2>
              <p className="text-sm text-gray-600 mb-4">Identify all potential sources of ignition within the premises</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  { key: 'electrical', label: 'Electrical installations' },
                  { key: 'appliances', label: 'Electrical appliances' },
                  { key: 'gas', label: 'Gas installations' },
                  { key: 'oil', label: 'Oil-fired installations' },
                  { key: 'solidFuel', label: 'Solid fuel installations' },
                  { key: 'cooking', label: 'Cooking equipment' },
                  { key: 'heating', label: 'Space heating appliances' },
                  { key: 'hotWork', label: 'Hot work processes' },
                  { key: 'smoking', label: 'Smoking materials' },
                  { key: 'arson', label: 'Arson' },
                  { key: 'lightning', label: 'Lightning' }
                ].map(source => (
                  <label key={source.key} className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mr-2"
                      checked={fireHazards.ignitionSources[source.key as keyof typeof fireHazards.ignitionSources] as boolean}
                      onChange={(e) => setFireHazards({
                        ...fireHazards,
                        ignitionSources: {
                          ...fireHazards.ignitionSources,
                          [source.key]: e.target.checked
                        }
                      })}
                    />
                    <span>{source.label}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Other Sources</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={fireHazards.ignitionSources.other}
                    onChange={(e) => setFireHazards({
                      ...fireHazards,
                      ignitionSources: {...fireHazards.ignitionSources, other: e.target.value}
                    })}
                    placeholder="Specify any other ignition sources"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Observations</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={fireHazards.ignitionSources.observations}
                    onChange={(e) => setFireHazards({
                      ...fireHazards,
                      ignitionSources: {...fireHazards.ignitionSources, observations: e.target.value}
                    })}
                    placeholder="Detailed observations about ignition sources"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hazard Rating</label>
                  <div className="flex gap-4">
                    {['low', 'normal', 'high'].map(level => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="ignitionHazard"
                          value={level}
                          checked={fireHazards.ignitionSources.hazardRating === level}
                          onChange={(e) => setFireHazards({
                            ...fireHazards,
                            ignitionSources: {...fireHazards.ignitionSources, hazardRating: e.target.value}
                          })}
                          className="radio radio-primary mr-2"
                        />
                        <span className="capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2.1.2 Sources of Fuel */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.1.2 Sources of Fuel</h2>
              <p className="text-sm text-gray-600 mb-4">Identify combustible materials and their management</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  { key: 'flammableLiquids', label: 'Flammable liquids/solvents' },
                  { key: 'flammableGases', label: 'Flammable gases' },
                  { key: 'loxGox', label: 'LOX/GOX' },
                  { key: 'plastics', label: 'Plastics/rubber/foam' },
                  { key: 'paper', label: 'Paper/card/books' },
                  { key: 'wood', label: 'Wood/wood products' },
                  { key: 'textiles', label: 'Textiles' },
                  { key: 'packaging', label: 'Loose packaging' },
                  { key: 'waste', label: 'Waste materials' },
                  { key: 'furniture', label: 'Furniture/furnishings' }
                ].map(source => (
                  <label key={source.key} className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mr-2"
                      checked={fireHazards.fuelSources[source.key as keyof typeof fireHazards.fuelSources] as boolean}
                      onChange={(e) => setFireHazards({
                        ...fireHazards,
                        fuelSources: {
                          ...fireHazards.fuelSources,
                          [source.key]: e.target.checked
                        }
                      })}
                    />
                    <span>{source.label}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fire Loading Assessment</label>
                  <select
                    className="select select-bordered w-full"
                    value={fireHazards.fuelSources.fireLoading}
                    onChange={(e) => setFireHazards({
                      ...fireHazards,
                      fuelSources: {...fireHazards.fuelSources, fireLoading: e.target.value}
                    })}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Housekeeping Standard</label>
                  <select
                    className="select select-bordered w-full"
                    value={fireHazards.fuelSources.housekeeping}
                    onChange={(e) => setFireHazards({
                      ...fireHazards,
                      fuelSources: {...fireHazards.fuelSources, housekeeping: e.target.value}
                    })}
                  >
                    <option value="good">Good</option>
                    <option value="adequate">Adequate</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Observations</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={fireHazards.fuelSources.observations}
                  onChange={(e) => setFireHazards({
                    ...fireHazards,
                    fuelSources: {...fireHazards.fuelSources, observations: e.target.value}
                  })}
                  placeholder="Detailed observations about fuel sources and storage"
                />
              </div>
            </div>

            {/* 2.1.3 Work Processes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.1.3 Work Processes</h2>
              <p className="text-sm text-gray-600 mb-4">Assessment of work activities that may increase fire risk</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Hot work undertaken</span>
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="hotWork"
                        value="yes"
                        checked={fireHazards.workProcesses.hotWork === true}
                        onChange={() => setFireHazards({
                          ...fireHazards,
                          workProcesses: {...fireHazards.workProcesses, hotWork: true}
                        })}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="hotWork"
                        value="no"
                        checked={fireHazards.workProcesses.hotWork === false}
                        onChange={() => setFireHazards({
                          ...fireHazards,
                          workProcesses: {...fireHazards.workProcesses, hotWork: false}
                        })}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Permit system in place</span>
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="permit"
                        value="yes"
                        checked={fireHazards.workProcesses.permitSystem === true}
                        onChange={() => setFireHazards({
                          ...fireHazards,
                          workProcesses: {...fireHazards.workProcesses, permitSystem: true}
                        })}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="permit"
                        value="no"
                        checked={fireHazards.workProcesses.permitSystem === false}
                        onChange={() => setFireHazards({
                          ...fireHazards,
                          workProcesses: {...fireHazards.workProcesses, permitSystem: false}
                        })}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="permit"
                        value="na"
                        className="radio radio-primary"
                      />
                      <span className="ml-2">N/A</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Contractors managed</span>
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="contractors"
                        value="yes"
                        checked={fireHazards.workProcesses.contractorsManaged === true}
                        onChange={() => setFireHazards({
                          ...fireHazards,
                          workProcesses: {...fireHazards.workProcesses, contractorsManaged: true}
                        })}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="contractors"
                        value="no"
                        checked={fireHazards.workProcesses.contractorsManaged === false}
                        onChange={() => setFireHazards({
                          ...fireHazards,
                          workProcesses: {...fireHazards.workProcesses, contractorsManaged: false}
                        })}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="contractors"
                        value="na"
                        className="radio radio-primary"
                      />
                      <span className="ml-2">N/A</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Special Hazards</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={fireHazards.workProcesses.specialHazards}
                    onChange={(e) => setFireHazards({
                      ...fireHazards,
                      workProcesses: {...fireHazards.workProcesses, specialHazards: e.target.value}
                    })}
                    placeholder="Describe any special hazards or processes"
                  />
                </div>
              </div>
            </div>

            {/* 2.2.1 Means of Escape */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.2.1 Means of Escape</h2>
              <p className="text-sm text-gray-600 mb-4">Assessment of escape routes and exits</p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Design Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Staircases</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={protectionMeasures.meansOfEscape.numberOfStaircases}
                      onChange={(e) => setProtectionMeasures({
                        ...protectionMeasures,
                        meansOfEscape: {...protectionMeasures.meansOfEscape, numberOfStaircases: e.target.value}
                      })}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Protected Staircases</label>
                    <select
                      className="select select-bordered w-full"
                      value={protectionMeasures.meansOfEscape.protectedStaircases}
                      onChange={(e) => setProtectionMeasures({
                        ...protectionMeasures,
                        meansOfEscape: {...protectionMeasures.meansOfEscape, protectedStaircases: e.target.value}
                      })}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Exits from Building</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={protectionMeasures.meansOfEscape.numberOfExits}
                      onChange={(e) => setProtectionMeasures({
                        ...protectionMeasures,
                        meansOfEscape: {...protectionMeasures.meansOfEscape, numberOfExits: e.target.value}
                      })}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Exit Widths Adequate</label>
                    <div className="flex gap-3 mt-2">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="exitWidths"
                          value="yes"
                          checked={protectionMeasures.meansOfEscape.exitWidthsAdequate === true}
                          onChange={() => setProtectionMeasures({
                            ...protectionMeasures,
                            meansOfEscape: {...protectionMeasures.meansOfEscape, exitWidthsAdequate: true}
                          })}
                          className="radio radio-success"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="exitWidths"
                          value="no"
                          checked={protectionMeasures.meansOfEscape.exitWidthsAdequate === false}
                          onChange={() => setProtectionMeasures({
                            ...protectionMeasures,
                            meansOfEscape: {...protectionMeasures.meansOfEscape, exitWidthsAdequate: false}
                          })}
                          className="radio radio-error"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Travel Distances (actual vs acceptable)</label>
                    <button
                      type="button"
                      onClick={addTravelDistance}
                      className="btn btn-outline btn-xs"
                    >
                      + Add Location
                    </button>
                  </div>
                  {travelDistances.length > 0 && (
                    <div className="space-y-2">
                      {travelDistances.map((distance, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2">
                          <input
                            type="text"
                            className="input input-bordered input-sm"
                            placeholder="Location"
                            value={distance.location}
                            onChange={(e) => updateTravelDistance(index, { location: e.target.value })}
                          />
                          <input
                            type="text"
                            className="input input-bordered input-sm"
                            placeholder="Actual (m)"
                            value={distance.actual}
                            onChange={(e) => updateTravelDistance(index, { actual: e.target.value })}
                          />
                          <input
                            type="text"
                            className="input input-bordered input-sm"
                            placeholder="Acceptable (m)"
                            value={distance.acceptable}
                            onChange={(e) => updateTravelDistance(index, { acceptable: e.target.value })}
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm checkbox-success"
                              checked={distance.compliant}
                              onChange={(e) => updateTravelDistance(index, { compliant: e.target.checked })}
                            />
                            <button
                              type="button"
                              onClick={() => deleteTravelDistance(index)}
                              className="btn btn-ghost btn-xs text-red-500"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Condition Assessment</h3>
                <div className="space-y-2">
                  {[
                    { key: 'fireDoorsCondition', label: 'Fire doors condition' },
                    { key: 'selfClosingDevices', label: 'Self-closing devices' },
                    { key: 'doorHoldOpen', label: 'Door hold-open devices' },
                    { key: 'escapeRouteCondition', label: 'Escape route condition' },
                    { key: 'escapeRouteLighting', label: 'Escape route lighting' },
                    { key: 'obstructions', label: 'Obstructions' },
                    { key: 'securityFastenings', label: 'Security fastenings' },
                    { key: 'finalExitDoors', label: 'Final exit doors' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{item.label}</span>
                      <div className="flex gap-2">
                        {['satisfactory', 'improvement-needed', 'urgent-action'].map(level => (
                          <label key={level} className="cursor-pointer">
                            <input
                              type="radio"
                              name={`condition-${item.key}`}
                              value={level}
                              checked={protectionMeasures.meansOfEscape.conditions[item.key as keyof typeof protectionMeasures.meansOfEscape.conditions] === level}
                              onChange={(e) => setProtectionMeasures({
                                ...protectionMeasures,
                                meansOfEscape: {
                                  ...protectionMeasures.meansOfEscape,
                                  conditions: {
                                    ...protectionMeasures.meansOfEscape.conditions,
                                    [item.key]: e.target.value
                                  }
                                }
                              })}
                              className="sr-only"
                            />
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${
                              protectionMeasures.meansOfEscape.conditions[item.key as keyof typeof protectionMeasures.meansOfEscape.conditions] === level
                                ? level === 'urgent-action' ? 'bg-red-100 border-red-500 text-red-700'
                                  : level === 'improvement-needed' ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                                  : 'bg-green-100 border-green-500 text-green-700'
                                : 'bg-white border-gray-300 text-gray-500'
                            }`}>
                              {level === 'satisfactory' ? 'S' : level === 'improvement-needed' ? 'I' : 'U'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: People at Risk */}
        {currentSection === 3 && (
          <div className="space-y-6">
            {/* 2.3.1 Occupancy */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.3.1 Occupancy</h2>
              <p className="text-sm text-gray-600 mb-4">Numbers and types of people who may be affected</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Maximum Occupancy</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={peopleAtRisk.occupancy.maximum}
                    onChange={(e) => setPeopleAtRisk({
                      ...peopleAtRisk,
                      occupancy: {...peopleAtRisk.occupancy, maximum: e.target.value}
                    })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Typical Occupancy</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={peopleAtRisk.occupancy.typical}
                    onChange={(e) => setPeopleAtRisk({
                      ...peopleAtRisk,
                      occupancy: {...peopleAtRisk.occupancy, typical: e.target.value}
                    })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Out of Hours Occupancy</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={peopleAtRisk.occupancy.outOfHours}
                    onChange={(e) => setPeopleAtRisk({
                      ...peopleAtRisk,
                      occupancy: {...peopleAtRisk.occupancy, outOfHours: e.target.value}
                    })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sleeping Risk</label>
                  <div className="flex gap-3 mt-2">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="sleepingRisk"
                        value="yes"
                        checked={peopleAtRisk.occupancy.sleepingRisk === true}
                        onChange={() => setPeopleAtRisk({
                          ...peopleAtRisk,
                          occupancy: {...peopleAtRisk.occupancy, sleepingRisk: true}
                        })}
                        className="radio radio-warning"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="sleepingRisk"
                        value="no"
                        checked={peopleAtRisk.occupancy.sleepingRisk === false}
                        onChange={() => setPeopleAtRisk({
                          ...peopleAtRisk,
                          occupancy: {...peopleAtRisk.occupancy, sleepingRisk: false}
                        })}
                        className="radio radio-success"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.3.2 Occupant Characteristics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.3.2 Occupant Characteristics</h2>
              <p className="text-sm text-gray-600 mb-4">Identify groups who may be especially at risk</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'employeesFamiliar', label: 'Employees familiar with building' },
                  { key: 'employeesUnfamiliar', label: 'Employees unfamiliar' },
                  { key: 'contractors', label: 'Contractors' },
                  { key: 'public', label: 'Members of public' },
                  { key: 'disabled', label: 'Disabled persons' },
                  { key: 'children', label: 'Children' },
                  { key: 'elderly', label: 'Elderly' },
                  { key: 'loneWorkers', label: 'Lone workers (location)' }
                ].map(group => (
                  <div key={group.key}>
                    <label className="block text-sm font-medium mb-1">{group.label}</label>
                    <input
                      type={group.key === 'loneWorkers' ? 'text' : 'number'}
                      className="input input-bordered w-full"
                      value={peopleAtRisk.characteristics[group.key as keyof typeof peopleAtRisk.characteristics]}
                      onChange={(e) => setPeopleAtRisk({
                        ...peopleAtRisk,
                        characteristics: {...peopleAtRisk.characteristics, [group.key]: e.target.value}
                      })}
                      placeholder={group.key === 'loneWorkers' ? 'Location' : '0'}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium mb-1">Others</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={peopleAtRisk.characteristics.others}
                    onChange={(e) => setPeopleAtRisk({
                      ...peopleAtRisk,
                      characteristics: {...peopleAtRisk.characteristics, others: e.target.value}
                    })}
                    placeholder="Specify other groups"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">PEEP/GEEP Arrangements</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={peopleAtRisk.characteristics.peepGeepArrangements}
                  onChange={(e) => setPeopleAtRisk({
                    ...peopleAtRisk,
                    characteristics: {...peopleAtRisk.characteristics, peepGeepArrangements: e.target.value}
                  })}
                  placeholder="Describe Personal/Generic Emergency Evacuation Plan arrangements"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Fire Safety Management */}
        {currentSection === 4 && (
          <div className="space-y-6">
            {/* 3.1 Emergency Plan */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">3.1 Emergency Plan</h2>
              <p className="text-sm text-gray-600 mb-4">Assessment of emergency planning and procedures</p>
              
              <div className="space-y-3">
                {[
                  { key: 'documented', label: 'Documented emergency plan' },
                  { key: 'coversAllScenarios', label: 'Plan covers all scenarios' },
                  { key: 'assemblyPointsDesignated', label: 'Assembly points designated' },
                  { key: 'rolesClear', label: 'Roles and responsibilities clear' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{item.label}</span>
                    <div className="flex gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`emergency-${item.key}`}
                          value="yes"
                          checked={safetyManagement.emergencyPlan[item.key as keyof typeof safetyManagement.emergencyPlan] === true}
                          onChange={() => setSafetyManagement({
                            ...safetyManagement,
                            emergencyPlan: {...safetyManagement.emergencyPlan, [item.key]: true}
                          })}
                          className="radio radio-success"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`emergency-${item.key}`}
                          value="no"
                          checked={safetyManagement.emergencyPlan[item.key as keyof typeof safetyManagement.emergencyPlan] === false}
                          onChange={() => setSafetyManagement({
                            ...safetyManagement,
                            emergencyPlan: {...safetyManagement.emergencyPlan, [item.key]: false}
                          })}
                          className="radio radio-error"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3.3 Fire Drills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">3.3 Fire Drills</h2>
              <p className="text-sm text-gray-600 mb-4">Fire drill frequency and effectiveness</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Frequency</label>
                  <select
                    className="select select-bordered w-full"
                    value={safetyManagement.drills.frequency}
                    onChange={(e) => setSafetyManagement({
                      ...safetyManagement,
                      drills: {...safetyManagement.drills, frequency: e.target.value}
                    })}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="bi-annual">Bi-annual</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Last Drill Date</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={safetyManagement.drills.lastDrillDate}
                    onChange={(e) => setSafetyManagement({
                      ...safetyManagement,
                      drills: {...safetyManagement.drills, lastDrillDate: e.target.value}
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Evacuation Time</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={safetyManagement.drills.evacuationTime}
                    onChange={(e) => setSafetyManagement({
                      ...safetyManagement,
                      drills: {...safetyManagement.drills, evacuationTime: e.target.value}
                    })}
                    placeholder="e.g., 3 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Different Scenarios Practiced</label>
                  <div className="flex gap-3 mt-2">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="scenarios"
                        value="yes"
                        checked={safetyManagement.drills.differentScenarios === true}
                        onChange={() => setSafetyManagement({
                          ...safetyManagement,
                          drills: {...safetyManagement.drills, differentScenarios: true}
                        })}
                        className="radio radio-success"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="scenarios"
                        value="no"
                        checked={safetyManagement.drills.differentScenarios === false}
                        onChange={() => setSafetyManagement({
                          ...safetyManagement,
                          drills: {...safetyManagement.drills, differentScenarios: false}
                        })}
                        className="radio radio-error"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Issues Identified</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    value={safetyManagement.drills.issuesIdentified}
                    onChange={(e) => setSafetyManagement({
                      ...safetyManagement,
                      drills: {...safetyManagement.drills, issuesIdentified: e.target.value}
                    })}
                    placeholder="List any issues identified during drills"
                  />
                </div>
              </div>
            </div>

            {/* 3.5 Records */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">3.5 Records</h2>
              <p className="text-sm text-gray-600 mb-4">Fire safety documentation and record keeping</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: 'logBookMaintained', label: 'Fire log book maintained' },
                  { key: 'trainingRecordsComplete', label: 'Training records complete' },
                  { key: 'maintenanceCertificatesFiled', label: 'Maintenance certificates filed' },
                  { key: 'drillRecordsKept', label: 'Fire drill records kept' },
                  { key: 'nearMissRecords', label: 'Near miss/incident records' }
                ].map(record => (
                  <label key={record.key} className="cursor-pointer">
                    <div className={`p-3 rounded-lg border-2 transition-all ${
                      safetyManagement.records[record.key as keyof typeof safetyManagement.records] 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary mr-3"
                          checked={safetyManagement.records[record.key as keyof typeof safetyManagement.records]}
                          onChange={(e) => setSafetyManagement({
                            ...safetyManagement,
                            records: {...safetyManagement.records, [record.key]: e.target.checked}
                          })}
                        />
                        <span className="text-sm font-medium">{record.label}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 3.6 Fire Safety Culture */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">3.6 Fire Safety Culture</h2>
              <p className="text-sm text-gray-600 mb-4">Assessment of organizational fire safety culture (1-5 scale)</p>
              
              <div className="space-y-4">
                {[
                  { key: 'managementCommitment', label: 'Management commitment' },
                  { key: 'employeeEngagement', label: 'Employee engagement' },
                  { key: 'contractorControl', label: 'Contractor control' },
                  { key: 'communicationEffectiveness', label: 'Communication effectiveness' },
                  { key: 'continuousImprovement', label: 'Continuous improvement' }
                ].map(aspect => (
                  <div key={aspect.key} className="flex items-center justify-between">
                    <span className="font-medium">{aspect.label}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(score => (
                        <label key={score} className="cursor-pointer">
                          <input
                            type="radio"
                            name={`culture-${aspect.key}`}
                            value={score}
                            checked={safetyManagement.culture[aspect.key as keyof typeof safetyManagement.culture] === score}
                            onChange={() => setSafetyManagement({
                              ...safetyManagement,
                              culture: {...safetyManagement.culture, [aspect.key]: score}
                            })}
                            className="sr-only"
                          />
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-medium ${
                            safetyManagement.culture[aspect.key as keyof typeof safetyManagement.culture] === score
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}>
                            {score}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Fire Risk Assessment */}
        {currentSection === 5 && (
          <div className="space-y-6">
            {/* 4.1 Likelihood of Fire */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">4.1 Likelihood of Fire</h2>
              <p className="text-sm text-gray-600 mb-4">Considering all factors assessed</p>
              
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Low', desc: 'Minimal sources, excellent controls' },
                  { value: 'medium', label: 'Medium', desc: 'Normal sources, adequate controls' },
                  { value: 'high', label: 'High', desc: 'Multiple sources, poor controls' }
                ].map(option => (
                  <label key={option.value} className="cursor-pointer">
                    <div className={`p-4 rounded-lg border-2 transition-all ${
                      riskAssessment.likelihood === option.value
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="likelihood"
                          value={option.value}
                          checked={riskAssessment.likelihood === option.value}
                          onChange={(e) => setRiskAssessment({...riskAssessment, likelihood: e.target.value})}
                          className="radio radio-primary mt-1 mr-3"
                        />
                        <div>
                          <span className="font-medium">{option.label}</span>
                          <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Justification</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={riskAssessment.likelihoodJustification}
                  onChange={(e) => setRiskAssessment({...riskAssessment, likelihoodJustification: e.target.value})}
                  placeholder="Provide justification for the likelihood rating"
                />
              </div>
            </div>

            {/* 4.2 Consequences of Fire */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">4.2 Consequences of Fire</h2>
              <p className="text-sm text-gray-600 mb-4">Considering life safety and property</p>
              
              <div className="space-y-2">
                {[
                  { value: 'slight', label: 'Slight Harm' },
                  { value: 'moderate', label: 'Moderate Harm' },
                  { value: 'extreme', label: 'Extreme Harm' }
                ].map(option => (
                  <label key={option.value} className="cursor-pointer">
                    <div className={`p-4 rounded-lg border-2 transition-all ${
                      riskAssessment.consequences === option.value
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="consequences"
                          value={option.value}
                          checked={riskAssessment.consequences === option.value}
                          onChange={(e) => setRiskAssessment({...riskAssessment, consequences: e.target.value})}
                          className="radio radio-primary mr-3"
                        />
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Justification</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={riskAssessment.consequencesJustification}
                  onChange={(e) => setRiskAssessment({...riskAssessment, consequencesJustification: e.target.value})}
                  placeholder="Provide justification for the consequence rating"
                />
              </div>
            </div>

            {/* 4.3 Risk Rating */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">4.3 Risk Rating</h2>
              <p className="text-sm text-gray-600 mb-4">Auto-calculated based on likelihood and consequence</p>
              
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <div className={`text-4xl font-bold ${calculateRiskRating().color}`}>
                  {calculateRiskRating().level}
                </div>
                <div className="text-lg text-gray-600 mt-2">
                  Numerical Score: {calculateRiskRating().score}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  ({riskAssessment.likelihood} likelihood × {riskAssessment.consequences} consequence)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 6: Action Plan */}
        {currentSection === 6 && (
          <div className="space-y-6">
            {/* 5.1 Significant Findings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">5.1 Significant Findings</h2>
              <p className="text-sm text-gray-600 mb-4">Summary of key issues requiring attention</p>
              
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                value={actionPlan.significantFindings}
                onChange={(e) => setActionPlan({...actionPlan, significantFindings: e.target.value})}
                placeholder="Summarize the significant findings from this assessment"
              />
            </div>

            {/* 5.2 Remedial Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">5.2 Remedial Actions</h2>
                  <p className="text-sm text-gray-600">Actions required with PAS79 priority ratings</p>
                </div>
                <button
                  type="button"
                  onClick={addRemediAction}
                  className="btn btn-primary btn-sm"
                >
                  + Add Action
                </button>
              </div>

              {/* Priority Definitions */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Priority Definitions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
                  {[1, 2, 3, 4, 5].map(priority => (
                    <div key={priority} className={`p-2 rounded border ${getPriorityColor(priority)}`}>
                      <span className="font-bold">Priority {priority}:</span> {getPriorityLabel(priority)}
                    </div>
                  ))}
                </div>
              </div>

              {remediActions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No actions added yet. Click "Add Action" to define required actions.
                </p>
              ) : (
                <div className="space-y-4">
                  {remediActions.map((action, index) => (
                    <div key={action.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">Action #{index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => deleteRemediAction(action.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Action Required</label>
                          <textarea
                            className="textarea textarea-bordered w-full"
                            rows={2}
                            value={action.action}
                            onChange={(e) => updateRemediAction(action.id, { action: e.target.value })}
                            placeholder="Describe the action required"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Priority (PAS79)</label>
                          <select
                            className={`select select-bordered w-full ${getPriorityColor(action.priority)}`}
                            value={action.priority}
                            onChange={(e) => updateRemediAction(action.id, { priority: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                          >
                            {[1, 2, 3, 4, 5].map(p => (
                              <option key={p} value={p}>
                                Priority {p} - {getPriorityLabel(p)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Recommendation Type</label>
                          <select
                            className="select select-bordered w-full"
                            value={action.recommendationType}
                            onChange={(e) => updateRemediAction(action.id, { recommendationType: e.target.value as 'mandatory' | 'best-practice' })}
                          >
                            <option value="mandatory">Mandatory</option>
                            <option value="best-practice">Best Practice</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Hazard/Deficiency Addressed</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={action.hazardAddressed}
                            onChange={(e) => updateRemediAction(action.id, { hazardAddressed: e.target.value })}
                            placeholder="Which hazard does this address"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Responsible Person</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={action.responsiblePerson}
                            onChange={(e) => updateRemediAction(action.id, { responsiblePerson: e.target.value })}
                            placeholder="Name of responsible person"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Target Date</label>
                          <input
                            type="date"
                            className="input input-bordered w-full"
                            value={action.targetDate}
                            onChange={(e) => updateRemediAction(action.id, { targetDate: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Cost Estimate</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={action.costEstimate}
                            onChange={(e) => updateRemediAction(action.id, { costEstimate: e.target.value })}
                            placeholder="£0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Status</label>
                          <select
                            className="select select-bordered w-full"
                            value={action.status}
                            onChange={(e) => updateRemediAction(action.id, { status: e.target.value as 'not-started' | 'in-progress' | 'complete' })}
                          >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="complete">Complete</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5.3 Risk Reduction Measures */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">5.3 Risk Reduction Measures</h2>
              <p className="text-sm text-gray-600 mb-4">Beyond compliance opportunities</p>
              
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                value={actionPlan.riskReductionMeasures}
                onChange={(e) => setActionPlan({...actionPlan, riskReductionMeasures: e.target.value})}
                placeholder="Describe opportunities for risk reduction beyond minimum compliance"
              />
            </div>
          </div>
        )}

        {/* Section 7: Photos and Evidence */}
        {currentSection === 7 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">Section 6: Photographs and Supporting Evidence</h2>
              <p className="text-sm text-gray-600 mb-4">Upload photos to document findings</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload photos or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                <button type="button" className="btn btn-outline btn-sm mt-4">
                  Select Files
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Categories for photos:</p>
                <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                  <li>Hazards identified</li>
                  <li>Good practices noted</li>
                  <li>Areas of concern</li>
                  <li>Escape routes</li>
                  <li>Equipment locations</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Section 8: Occupancy Profile */}
        {currentSection === 8 && (
          <Section3OccupancyProfile 
            occupancyProfile={occupancyProfile} 
            setOccupancyProfile={setOccupancyProfile}
          />
        )}

        {/* Section 9: Means of Escape */}
        {currentSection === 9 && (
          <Section5MeansOfEscape
            meansOfEscape={meansOfEscape}
            setMeansOfEscape={setMeansOfEscape}
            travelDistances={travelDistances}
            setTravelDistances={setTravelDistances}
          />
        )}

        {/* Section 10: Full Action Plan */}
        {currentSection === 10 && (
          <Section10ActionPlan
            remediActions={remediActions}
            setRemediActions={setRemediActions}
          />
        )}

        {/* Section 11: Additional Evidence */}
        {currentSection === 11 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Section 11: Additional Evidence</h2>
              <p className="text-sm text-gray-600 mb-4">Upload any additional supporting documentation</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Additional evidence and documentation upload area</p>
                <p className="text-sm text-gray-400 mt-2">Floor plans, certificates, reports, etc.</p>
              </div>
            </div>
          </div>
        )}

        {/* Section 12: Declaration */}
        {currentSection === 12 && (
          <div className="space-y-6">
            {/* 7.1 Assessor Declaration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">7.1 Assessor Declaration</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm">
                  I confirm this assessment has been completed in accordance with PAS79 methodology 
                  and represents a suitable and sufficient assessment under Article 9 of the 
                  Regulatory Reform (Fire Safety) Order 2005.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Limitations Noted</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={declaration.limitationsNoted}
                  onChange={(e) => setDeclaration({...declaration, limitationsNoted: e.target.value})}
                  placeholder="Note any limitations or caveats to this assessment"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Assessor: {generalInfo.assessorName || '[Not provided]'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date: {generalInfo.assessmentDate}</p>
                </div>
              </div>
            </div>

            {/* 7.2 Peer Review */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">7.2 Peer Review (if applicable)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Reviewer Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={declaration.peerReviewName}
                    onChange={(e) => setDeclaration({...declaration, peerReviewName: e.target.value})}
                    placeholder="Name of peer reviewer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Review Date</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={declaration.peerReviewDate}
                    onChange={(e) => setDeclaration({...declaration, peerReviewDate: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Comments</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={declaration.peerReviewComments}
                    onChange={(e) => setDeclaration({...declaration, peerReviewComments: e.target.value})}
                    placeholder="Peer review comments"
                  />
                </div>
              </div>
            </div>

            {/* 7.3 Client Acknowledgment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">7.3 Client Acknowledgment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Responsible Person</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={declaration.responsiblePerson}
                    onChange={(e) => setDeclaration({...declaration, responsiblePerson: e.target.value})}
                    placeholder="Name of responsible person"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={declaration.responsiblePosition}
                    onChange={(e) => setDeclaration({...declaration, responsiblePosition: e.target.value})}
                    placeholder="Position/Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={declaration.acknowledgmentDate}
                    onChange={(e) => setDeclaration({...declaration, acknowledgmentDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => {
              setCurrentSection(Math.max(1, currentSection - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentSection === 1}
            className="btn btn-outline"
          >
            ← Previous
          </button>

          <div className="flex gap-3">
            <Link href="/risk-assessments/create/fire" className="btn btn-ghost">
              Cancel
            </Link>
            
            {currentSection < 12 ? (
              <button
                type="button"
                onClick={() => {
                  setCurrentSection(Math.min(12, currentSection + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Assessment'
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}