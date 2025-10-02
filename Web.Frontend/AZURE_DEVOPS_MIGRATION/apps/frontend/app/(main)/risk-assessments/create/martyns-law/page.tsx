'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ImmediateAction {
  id: string;
  action: string;
  threatAddressed: string;
  responsiblePerson: string;
  resourceRequirement: string;
  completed: boolean;
}

interface EntryPoint {
  location: string;
  type: string;
  controls: string;
  vulnerabilityRating: 'low' | 'medium' | 'high';
}

interface CrowdingPoint {
  location: string;
  description: string;
  maxDensity: string;
  mitigations: string;
}

export default function MartynsLawRiskAssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [immediateActions, setImmediateActions] = useState<ImmediateAction[]>([]);
  const [entryPoints, setEntryPoints] = useState<EntryPoint[]>([]);
  const [crowdingPoints, setCrowdingPoints] = useState<CrowdingPoint[]>([]);

  // Section 1: Premises and Assessment Information
  const [premisesInfo, setPremisesInfo] = useState({
    // Venue Details
    venueName: '',
    tradingName: '',
    fullAddress: '',
    gridReference: '',
    venueCategory: 'standard',
    
    // Venue Characteristics
    primaryUse: '',
    maxCapacity: '',
    avgDailyFootfall: '',
    publicAccessType: 'unrestricted',
    operatingHours: '',
    operation247: false,
    
    // Assessment Information
    assessmentDate: new Date().toISOString().split('T')[0],
    assessmentType: 'initial',
    leadAssessor: '',
    securityQualifications: '',
    assessmentTeam: [] as string[],
    nextReviewDate: '',
    
    // Responsible Persons
    designatedSupervisor: '',
    securityLead: '',
    operationsManager: '',
    emergencyPlanningLead: ''
  });

  // Section 2: Threat Assessment
  const [threatAssessment, setThreatAssessment] = useState({
    // Threat Context
    nationalThreatLevel: 'substantial',
    regionalFactors: '',
    localTensions: '',
    sensitiveDates: '',
    
    // Venue Attractiveness
    symbolicValue: {
      national: 1,
      religious: 1,
      political: 1,
      cultural: 1,
      economic: 1
    },
    crowdDensity: {
      peakOccupancy: 1,
      evacuationComplexity: 1,
      vulnerableGroups: 1
    },
    mediaImpact: 1,
    highProfileEvents: false,
    celebrityAttendance: 'never',
    mediaCoverageFreq: 1,
    
    // Threat Vectors
    threatVectors: {
      vehicleAttack: 'low',
      bladedWeapon: 'low',
      firearms: 'low',
      ied: 'low',
      chemical: 'low',
      drone: 'low',
      cyberPhysical: 'low',
      arson: 'low',
      insider: 'low'
    },
    vulnerabilityFactors: '',
    
    // Threat Actors
    threatActors: {
      internationalTerrorism: 'low',
      domesticExtremism: 'low',
      singleIssue: 'low',
      fixatedIndividuals: 'low',
      criminalGroups: 'low'
    },
    
    // Intelligence Sharing
    policeLiaison: false,
    ctsaEngagement: false,
    infoSharingProtocols: false
  });

  // Section 3: Vulnerability Assessment
  const [vulnerabilityAssessment, setVulnerabilityAssessment] = useState({
    // Physical Security - Perimeter
    clearPerimeter: 'no',
    perimeterTypes: {
      walls: false,
      naturalBarriers: false,
      openAccess: false,
      mixedBarriers: false
    },
    hvmMeasures: 'no',
    hvmType: 'none',
    pedestrianControlled: false,
    
    // Access Control
    controlMeasures: {
      bagSearches: false,
      metalDetection: false,
      securityPersonnel: false,
      cctvCoverage: false,
      accessControlSystems: false,
      visitorManagement: false,
      idVerification: false
    },
    queueManagement: {
      externalQueues: 'exposed',
      queueBarriers: false,
      crowdDensityMgmt: false
    },
    
    // Detection Capabilities
    cctv: {
      totalCameras: '',
      externalCoverage: '',
      internalCoverage: '',
      monitoring: 'recording-only',
      analytics: false,
      policeIntegration: false
    },
    detectionSystems: {
      intruderAlarms: false,
      weaponDetection: false,
      behavioralOfficers: false,
      canineUnits: false,
      droneDetection: false,
      cbrnDetection: false
    },
    
    // Critical Infrastructure
    infrastructure: {
      powerProtected: false,
      hvacSecured: false,
      waterProtected: false,
      dataCommsProtected: false
    },
    
    // Cyber-Physical
    cyberPhysical: {
      publicWifi: 'open',
      buildingMgmtSystems: 'integrated',
      accessControlCyber: 'not-assessed',
      digitalSignage: 'vulnerable'
    }
  });

  // Section 4: Protective Security Measures
  const [protectiveMeasures, setProtectiveMeasures] = useState({
    // Security Personnel
    personnel: {
      inHouseSecurity: '',
      contractSecurity: '',
      siaLicensed: '',
      actTrained: '',
      firstAidTrained: ''
    },
    capabilities: {
      behavioralDetection: false,
      conflictManagement: false,
      physicalIntervention: false,
      firstAidTrauma: false,
      fireMarshal: false,
      counterTerrorism: false
    },
    
    // Procedures
    procedures: {
      threatAssessment: false,
      lockdown: false,
      evacuation: false,
      invacuation: false,
      search: false,
      suspiciousItem: false,
      commsCascade: false
    },
    testing: {
      desktopFrequency: '',
      liveFrequency: '',
      multiAgencyDate: ''
    },
    
    // Communications
    communications: {
      radioSystem: false,
      panicAlarms: false,
      massNotification: false,
      socialMedia: false,
      policeDirect: false,
      regionalAlert: false
    },
    resilience: {
      primaryBackup: false,
      offsiteComms: false
    }
  });

  // Section 5: Emergency Response
  const [emergencyResponse, setEmergencyResponse] = useState({
    // Immediate Response
    runHideTell: {
      staffAwareness: '',
      publicInfoDisplayed: false,
      safeAreasIdentified: false,
      lockdownCapability: 'none'
    },
    medical: {
      firstAiders: '',
      traumaTrained: '',
      bleedKits: '',
      defibrillators: '',
      medicalRoom: false
    },
    
    // Emergency Services
    services: {
      policeResponse: '',
      ambulanceResponse: '',
      fireResponse: '',
      jointResponsePlan: false,
      liaisonMeetings: false,
      familiarizationDate: ''
    },
    
    // Crisis Management
    crisis: {
      commandStructure: false,
      crisisTeam: false,
      decisionLogs: false,
      altCommandLocation: false
    },
    continuity: {
      bcPlan: false,
      cyberIncidentPlan: false,
      supplyChainAssessed: false
    }
  });

  // Section 6: Risk Evaluation
  const [riskEvaluation, setRiskEvaluation] = useState({
    attackLikelihood: 'low',
    likelihoodJustification: '',
    impactAssessment: 'minor',
    impactJustification: ''
  });

  // Section 7: Improvement Plan
  const [improvementPlan, setImprovementPlan] = useState({
    shortTermImprovements: '',
    longTermEnhancements: '',
    capex: '',
    opex: '',
    trainingInvestment: '',
    techInvestment: '',
    businessCaseSummary: ''
  });

  // Section 8: Compliance
  const [compliance, setCompliance] = useState({
    martynsLaw: {
      riskAssessmentComplete: false,
      mitigationProportionate: false,
      staffTrainingCurrent: false,
      proceduresDocumented: false,
      regularTesting: false
    },
    related: {
      healthSafety: false,
      fireSafety: false,
      licensing: false,
      planning: false,
      insurance: false
    },
    qa: {
      internalReviewDate: '',
      externalValidation: '',
      boardBriefed: false,
      lessonsLearned: false
    },
    documentControl: {
      classification: 'OFFICIAL',
      reviewCycle: 'annual'
    }
  });

  const sections = [
    { id: 1, title: 'Premises Information', badge: '1' },
    { id: 2, title: 'Threat Assessment', badge: '2' },
    { id: 3, title: 'Vulnerability Assessment', badge: '3' },
    { id: 4, title: 'Protective Measures', badge: '4' },
    { id: 5, title: 'Emergency Response', badge: '5' },
    { id: 6, title: 'Risk Evaluation', badge: '6' },
    { id: 7, title: 'Improvement Plan', badge: '7' },
    { id: 8, title: 'Compliance', badge: '8' },
    { id: 9, title: 'Declaration', badge: '9' }
  ];

  const getThreatLevelColor = (level: string) => {
    switch(level) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'severe': return 'text-red-600 bg-red-50';
      case 'substantial': return 'text-orange-600 bg-orange-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch(level) {
      case 'very-high': return 'text-red-700 bg-red-100';
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      case 'very-low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateOverallRisk = () => {
    const likelihoodScore = 
      riskEvaluation.attackLikelihood === 'very-high' ? 5 :
      riskEvaluation.attackLikelihood === 'high' ? 4 :
      riskEvaluation.attackLikelihood === 'medium' ? 3 :
      riskEvaluation.attackLikelihood === 'low' ? 2 : 1;
    
    const impactScore = 
      riskEvaluation.impactAssessment === 'catastrophic' ? 4 :
      riskEvaluation.impactAssessment === 'major' ? 3 :
      riskEvaluation.impactAssessment === 'moderate' ? 2 : 1;
    
    const total = likelihoodScore * impactScore;
    
    if (total >= 12) return { level: 'Critical', color: 'text-red-700', score: total };
    if (total >= 8) return { level: 'High', color: 'text-orange-600', score: total };
    if (total >= 4) return { level: 'Medium', color: 'text-yellow-600', score: total };
    return { level: 'Low', color: 'text-green-600', score: total };
  };

  const addImmediateAction = () => {
    const newAction: ImmediateAction = {
      id: Date.now().toString(),
      action: '',
      threatAddressed: '',
      responsiblePerson: '',
      resourceRequirement: '',
      completed: false
    };
    setImmediateActions([...immediateActions, newAction]);
  };

  const updateImmediateAction = (id: string, updates: Partial<ImmediateAction>) => {
    setImmediateActions(immediateActions.map(action => 
      action.id === id ? { ...action, ...updates } : action
    ));
  };

  const deleteImmediateAction = (id: string) => {
    setImmediateActions(immediateActions.filter(action => action.id !== id));
  };

  const addEntryPoint = () => {
    const newEntry: EntryPoint = {
      location: '',
      type: '',
      controls: '',
      vulnerabilityRating: 'medium'
    };
    setEntryPoints([...entryPoints, newEntry]);
  };

  const updateEntryPoint = (index: number, updates: Partial<EntryPoint>) => {
    setEntryPoints(entryPoints.map((point, i) => 
      i === index ? { ...point, ...updates } : point
    ));
  };

  const deleteEntryPoint = (index: number) => {
    setEntryPoints(entryPoints.filter((_, i) => i !== index));
  };

  const addCrowdingPoint = () => {
    const newPoint: CrowdingPoint = {
      location: '',
      description: '',
      maxDensity: '',
      mitigations: ''
    };
    setCrowdingPoints([...crowdingPoints, newPoint]);
  };

  const updateCrowdingPoint = (index: number, updates: Partial<CrowdingPoint>) => {
    setCrowdingPoints(crowdingPoints.map((point, i) => 
      i === index ? { ...point, ...updates } : point
    ));
  };

  const deleteCrowdingPoint = (index: number) => {
    setCrowdingPoints(crowdingPoints.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        type: 'martyns-law',
        premisesInfo,
        threatAssessment,
        vulnerabilityAssessment,
        protectiveMeasures,
        emergencyResponse,
        riskEvaluation: {
          ...riskEvaluation,
          overallRisk: calculateOverallRisk()
        },
        improvementPlan: {
          ...improvementPlan,
          immediateActions
        },
        compliance,
        entryPoints,
        crowdingPoints
      };

      const response = await fetch('/api/risk-assessments/martyns-law', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': '1',
          'x-user-id': '1'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create Martyn\'s Law risk assessment');
      
      const result = await response.json();
      router.push(`/risk-assessments/${result.data?.id || ''}`);
    } catch (error) {
      console.error('Error creating Martyn\'s Law risk assessment:', error);
      alert('Failed to create Martyn\'s Law risk assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Martyn's Law (Protect Duty) Risk Assessment</h1>
              <p className="text-gray-600 mt-1">Counter-terrorism security assessment for publicly accessible locations</p>
            </div>
            <div className="flex gap-3">
              <Link href="/risk-assessments">
                <button style={{ 
                  backgroundColor: '#e77726', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} className="hover:opacity-80">
                  Back to Assessments
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-3 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className={`flex items-center ${index < sections.length - 1 ? 'flex-1' : ''}`}
              >
                <div 
                  className={`flex items-center cursor-pointer ${currentSection === section.id ? 'text-primary' : currentSection > section.id ? 'text-green-600' : 'text-gray-400'}`}
                  onClick={() => {
                    setCurrentSection(section.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
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

      <form onSubmit={handleSubmit} className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Section 1: Premises and Assessment Information */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 1: Premises and Assessment Information</h1>
              <p className="text-primary/80 text-sm mt-1">Basic venue details and assessment information</p>
            </div>
            {/* 1.1 Venue Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">1.1 Venue Details</h2>
              <p className="text-sm text-gray-600 mb-4">Basic information about the premises</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Venue Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.venueName}
                    onChange={(e) => setPremisesInfo({...premisesInfo, venueName: e.target.value})}
                    placeholder="Enter venue name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Trading Name (if different)</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.tradingName}
                    onChange={(e) => setPremisesInfo({...premisesInfo, tradingName: e.target.value})}
                    placeholder="Trading name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Full Address</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    value={premisesInfo.fullAddress}
                    onChange={(e) => setPremisesInfo({...premisesInfo, fullAddress: e.target.value})}
                    placeholder="Enter full venue address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Grid Reference</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.gridReference}
                    onChange={(e) => setPremisesInfo({...premisesInfo, gridReference: e.target.value})}
                    placeholder="e.g., SJ 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Venue Category</label>
                  <select
                    className="select select-bordered w-full"
                    value={premisesInfo.venueCategory}
                    onChange={(e) => setPremisesInfo({...premisesInfo, venueCategory: e.target.value})}
                  >
                    <option value="standard">Standard Duty (100-799 capacity)</option>
                    <option value="enhanced">Enhanced Duty (800+ capacity)</option>
                    <option value="qualifying">Qualifying Public Event</option>
                    <option value="voluntary">Voluntary Adoption (&lt;100 capacity)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 1.2 Venue Characteristics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">1.2 Venue Characteristics</h2>
              <p className="text-sm text-gray-600 mb-4">Operational details and capacity</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Use</label>
                  <select
                    className="select select-bordered w-full"
                    value={premisesInfo.primaryUse}
                    onChange={(e) => setPremisesInfo({...premisesInfo, primaryUse: e.target.value})}
                  >
                    <option value="">Select primary use</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sports">Sports</option>
                    <option value="retail">Retail</option>
                    <option value="worship">Place of Worship</option>
                    <option value="education">Education</option>
                    <option value="transport">Transport Hub</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Maximum Capacity</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={premisesInfo.maxCapacity}
                    onChange={(e) => setPremisesInfo({...premisesInfo, maxCapacity: e.target.value})}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Average Daily Footfall</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={premisesInfo.avgDailyFootfall}
                    onChange={(e) => setPremisesInfo({...premisesInfo, avgDailyFootfall: e.target.value})}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Public Access Type</label>
                  <select
                    className="select select-bordered w-full"
                    value={premisesInfo.publicAccessType}
                    onChange={(e) => setPremisesInfo({...premisesInfo, publicAccessType: e.target.value})}
                  >
                    <option value="unrestricted">Unrestricted public access</option>
                    <option value="ticketed">Ticketed events only</option>
                    <option value="membership">Membership required</option>
                    <option value="mixed">Mixed access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Operating Hours</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.operatingHours}
                    onChange={(e) => setPremisesInfo({...premisesInfo, operatingHours: e.target.value})}
                    placeholder="e.g., Mon-Fri 9am-5pm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">24/7 Operation</label>
                  <div className="flex gap-3 mt-2">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="operation247"
                        value="yes"
                        checked={premisesInfo.operation247 === true}
                        onChange={() => setPremisesInfo({...premisesInfo, operation247: true})}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="operation247"
                        value="no"
                        checked={premisesInfo.operation247 === false}
                        onChange={() => setPremisesInfo({...premisesInfo, operation247: false})}
                        className="radio radio-primary"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.3 Assessment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">1.3 Assessment Information</h2>
              <p className="text-sm text-gray-600 mb-4">Details about this assessment</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Assessment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={premisesInfo.assessmentDate}
                    onChange={(e) => setPremisesInfo({...premisesInfo, assessmentDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Type</label>
                  <select
                    className="select select-bordered w-full"
                    value={premisesInfo.assessmentType}
                    onChange={(e) => setPremisesInfo({...premisesInfo, assessmentType: e.target.value})}
                  >
                    <option value="initial">Initial assessment</option>
                    <option value="periodic">Periodic review</option>
                    <option value="post-incident">Post-incident review</option>
                    <option value="change-driven">Change-driven assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lead Assessor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.leadAssessor}
                    onChange={(e) => setPremisesInfo({...premisesInfo, leadAssessor: e.target.value})}
                    placeholder="Name of lead assessor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Security Qualifications</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.securityQualifications}
                    onChange={(e) => setPremisesInfo({...premisesInfo, securityQualifications: e.target.value})}
                    placeholder="e.g., SIA, ACT, CTSAs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Next Review Date</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={premisesInfo.nextReviewDate}
                    onChange={(e) => setPremisesInfo({...premisesInfo, nextReviewDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* 1.4 Responsible Persons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">1.4 Responsible Persons</h2>
              <p className="text-sm text-gray-600 mb-4">Key security and management contacts</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Designated Premises Supervisor</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.designatedSupervisor}
                    onChange={(e) => setPremisesInfo({...premisesInfo, designatedSupervisor: e.target.value})}
                    placeholder="Name and contact"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Security Lead</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.securityLead}
                    onChange={(e) => setPremisesInfo({...premisesInfo, securityLead: e.target.value})}
                    placeholder="Name and contact"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Operations Manager</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.operationsManager}
                    onChange={(e) => setPremisesInfo({...premisesInfo, operationsManager: e.target.value})}
                    placeholder="Name and contact"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Planning Lead</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={premisesInfo.emergencyPlanningLead}
                    onChange={(e) => setPremisesInfo({...premisesInfo, emergencyPlanningLead: e.target.value})}
                    placeholder="Name and contact"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Threat Assessment */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 2: Threat Assessment</h1>
              <p className="text-primary/80 text-sm mt-1">National and regional threat context, venue attractiveness, and threat vectors</p>
            </div>
            {/* 2.1 Threat Context */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.1 Threat Context</h2>
              <p className="text-sm text-gray-600 mb-4">National and regional threat indicators</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">National Threat Level</label>
                  <div className="flex gap-2">
                    {['low', 'moderate', 'substantial', 'severe', 'critical'].map(level => (
                      <label key={level} className="cursor-pointer">
                        <input
                          type="radio"
                          name="threatLevel"
                          value={level}
                          checked={threatAssessment.nationalThreatLevel === level}
                          onChange={(e) => setThreatAssessment({...threatAssessment, nationalThreatLevel: e.target.value})}
                          className="sr-only"
                        />
                        <span className={`px-3 py-2 rounded-lg text-sm font-medium border-2 block ${
                          threatAssessment.nationalThreatLevel === level
                            ? getThreatLevelColor(level) + ' border-current'
                            : 'bg-white border-gray-300 text-gray-600'
                        }`}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">As per MI5/JTAC assessment</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Local Tension Indicators</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={threatAssessment.localTensions}
                    onChange={(e) => setThreatAssessment({...threatAssessment, localTensions: e.target.value})}
                    placeholder="Describe any local tensions or concerns"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Upcoming Sensitive Dates</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    value={threatAssessment.sensitiveDates}
                    onChange={(e) => setThreatAssessment({...threatAssessment, sensitiveDates: e.target.value})}
                    placeholder="Note any upcoming events, anniversaries, or sensitive dates"
                  />
                </div>
              </div>
            </div>

            {/* 2.2 Venue Attractiveness Assessment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.2 Venue Attractiveness Assessment</h2>
              <p className="text-sm text-gray-600 mb-4">Factors that may make the venue a target (1-5 scale)</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Symbolic Value</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'national', label: 'National significance' },
                      { key: 'religious', label: 'Religious significance' },
                      { key: 'political', label: 'Political significance' },
                      { key: 'cultural', label: 'Cultural significance' },
                      { key: 'economic', label: 'Economic significance' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-sm">{item.label}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(score => (
                            <label key={score} className="cursor-pointer">
                              <input
                                type="radio"
                                name={`symbolic-${item.key}`}
                                value={score}
                                checked={threatAssessment.symbolicValue[item.key as keyof typeof threatAssessment.symbolicValue] === score}
                                onChange={() => setThreatAssessment({
                                  ...threatAssessment,
                                  symbolicValue: {...threatAssessment.symbolicValue, [item.key]: score}
                                })}
                                className="sr-only"
                              />
                              <span className={`w-8 h-8 flex items-center justify-center rounded border-2 text-sm font-medium ${
                                threatAssessment.symbolicValue[item.key as keyof typeof threatAssessment.symbolicValue] === score
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

                <div>
                  <h3 className="font-medium mb-3">Crowd Density Factors</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'peakOccupancy', label: 'Peak occupancy levels' },
                      { key: 'evacuationComplexity', label: 'Evacuation complexity' },
                      { key: 'vulnerableGroups', label: 'Vulnerable groups present' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-sm">{item.label}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(score => (
                            <label key={score} className="cursor-pointer">
                              <input
                                type="radio"
                                name={`crowd-${item.key}`}
                                value={score}
                                checked={threatAssessment.crowdDensity[item.key as keyof typeof threatAssessment.crowdDensity] === score}
                                onChange={() => setThreatAssessment({
                                  ...threatAssessment,
                                  crowdDensity: {...threatAssessment.crowdDensity, [item.key]: score}
                                })}
                                className="sr-only"
                              />
                              <span className={`w-8 h-8 flex items-center justify-center rounded border-2 text-sm font-medium ${
                                threatAssessment.crowdDensity[item.key as keyof typeof threatAssessment.crowdDensity] === score
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">High-profile Events</label>
                    <div className="flex gap-3 mt-2">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="highProfile"
                          value="yes"
                          checked={threatAssessment.highProfileEvents === true}
                          onChange={() => setThreatAssessment({...threatAssessment, highProfileEvents: true})}
                          className="radio radio-primary"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="highProfile"
                          value="no"
                          checked={threatAssessment.highProfileEvents === false}
                          onChange={() => setThreatAssessment({...threatAssessment, highProfileEvents: false})}
                          className="radio radio-primary"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Celebrity Attendance</label>
                    <select
                      className="select select-bordered w-full"
                      value={threatAssessment.celebrityAttendance}
                      onChange={(e) => setThreatAssessment({...threatAssessment, celebrityAttendance: e.target.value})}
                    >
                      <option value="regular">Regular</option>
                      <option value="occasional">Occasional</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.3 Threat Vectors */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">2.3 Threat Vectors</h2>
              <p className="text-sm text-gray-600 mb-4">Risk rating for potential attack methodologies</p>
              
              <div className="space-y-2">
                {[
                  { key: 'vehicleAttack', label: 'Vehicle as a weapon (VAW)' },
                  { key: 'bladedWeapon', label: 'Bladed weapon attack' },
                  { key: 'firearms', label: 'Firearms attack' },
                  { key: 'ied', label: 'Improvised explosive device (IED)' },
                  { key: 'chemical', label: 'Chemical/Biological attack' },
                  { key: 'drone', label: 'Drone attack' },
                  { key: 'cyberPhysical', label: 'Cyber-physical attack' },
                  { key: 'arson', label: 'Arson' },
                  { key: 'insider', label: 'Insider threat' }
                ].map(vector => (
                  <div key={vector.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-sm">{vector.label}</span>
                    <div className="flex gap-2">
                      {['very-low', 'low', 'medium', 'high', 'very-high'].map(level => (
                        <label key={level} className="cursor-pointer">
                          <input
                            type="radio"
                            name={`vector-${vector.key}`}
                            value={level}
                            checked={threatAssessment.threatVectors[vector.key as keyof typeof threatAssessment.threatVectors] === level}
                            onChange={(e) => setThreatAssessment({
                              ...threatAssessment,
                              threatVectors: {...threatAssessment.threatVectors, [vector.key]: e.target.value}
                            })}
                            className="sr-only"
                          />
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${
                            threatAssessment.threatVectors[vector.key as keyof typeof threatAssessment.threatVectors] === level
                              ? getRiskLevelColor(level) + ' border-current'
                              : 'bg-white border-gray-300 text-gray-500'
                          }`}>
                            {level === 'very-low' ? 'VL' : level === 'very-high' ? 'VH' : level.charAt(0).toUpperCase()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Vulnerability Factors</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={threatAssessment.vulnerabilityFactors}
                  onChange={(e) => setThreatAssessment({...threatAssessment, vulnerabilityFactors: e.target.value})}
                  placeholder="Describe specific vulnerabilities for each threat vector"
                />
              </div>
            </div>

            {/* Intelligence Sharing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">Intelligence Sharing</h2>
              <p className="text-sm text-gray-600 mb-4">External engagement and information sharing</p>
              
              <div className="space-y-3">
                {[
                  { key: 'policeLiaison', label: 'Police liaison established' },
                  { key: 'ctsaEngagement', label: 'CTSA engagement' },
                  { key: 'infoSharingProtocols', label: 'Information sharing protocols' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{item.label}</span>
                    <div className="flex gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`intel-${item.key}`}
                          value="yes"
                          checked={threatAssessment[item.key as keyof typeof threatAssessment] === true}
                          onChange={() => setThreatAssessment({...threatAssessment, [item.key]: true})}
                          className="radio radio-success"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`intel-${item.key}`}
                          value="no"
                          checked={threatAssessment[item.key as keyof typeof threatAssessment] === false}
                          onChange={() => setThreatAssessment({...threatAssessment, [item.key]: false})}
                          className="radio radio-error"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Vulnerability Assessment */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 3: Vulnerability Assessment</h1>
              <p className="text-primary/80 text-sm mt-1">Physical security, access control, detection capabilities, and vulnerabilities</p>
            </div>
            {/* 3.1 Physical Security - Perimeter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">3.1 Physical Security - Perimeter</h2>
              <p className="text-sm text-gray-600 mb-4">Boundary and hostile vehicle mitigation</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Clear Perimeter Exists</label>
                  <select
                    className="select select-bordered w-full"
                    value={vulnerabilityAssessment.clearPerimeter}
                    onChange={(e) => setVulnerabilityAssessment({...vulnerabilityAssessment, clearPerimeter: e.target.value})}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="partial">Partial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Perimeter Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'walls', label: 'Walls/Fencing' },
                      { key: 'naturalBarriers', label: 'Natural barriers' },
                      { key: 'openAccess', label: 'Open access' },
                      { key: 'mixedBarriers', label: 'Mixed barriers' }
                    ].map(type => (
                      <label key={type.key} className="flex items-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary mr-2"
                          checked={vulnerabilityAssessment.perimeterTypes[type.key as keyof typeof vulnerabilityAssessment.perimeterTypes]}
                          onChange={(e) => setVulnerabilityAssessment({
                            ...vulnerabilityAssessment,
                            perimeterTypes: {...vulnerabilityAssessment.perimeterTypes, [type.key]: e.target.checked}
                          })}
                        />
                        <span>{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">HVM Measures Installed</label>
                    <select
                      className="select select-bordered w-full"
                      value={vulnerabilityAssessment.hvmMeasures}
                      onChange={(e) => setVulnerabilityAssessment({...vulnerabilityAssessment, hvmMeasures: e.target.value})}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">HVM Type</label>
                    <select
                      className="select select-bordered w-full"
                      value={vulnerabilityAssessment.hvmType}
                      onChange={(e) => setVulnerabilityAssessment({...vulnerabilityAssessment, hvmType: e.target.value})}
                    >
                      <option value="none">None</option>
                      <option value="pas68">PAS 68 Rated</option>
                      <option value="iwa14">IWA 14 Rated</option>
                      <option value="temporary">Temporary Barriers</option>
                      <option value="mixed">Mixed Types</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 Access Control */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">3.2 Access Control</h2>
              <p className="text-sm text-gray-600 mb-4">Entry points and control measures</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Entry Points</label>
                  <button
                    type="button"
                    onClick={addEntryPoint}
                    className="btn btn-outline btn-xs"
                  >
                    + Add Entry Point
                  </button>
                </div>
                {entryPoints.length > 0 && (
                  <div className="space-y-2">
                    {entryPoints.map((point, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2">
                        <input
                          type="text"
                          className="input input-bordered input-sm"
                          placeholder="Location"
                          value={point.location}
                          onChange={(e) => updateEntryPoint(index, { location: e.target.value })}
                        />
                        <input
                          type="text"
                          className="input input-bordered input-sm"
                          placeholder="Type"
                          value={point.type}
                          onChange={(e) => updateEntryPoint(index, { type: e.target.value })}
                        />
                        <input
                          type="text"
                          className="input input-bordered input-sm"
                          placeholder="Controls"
                          value={point.controls}
                          onChange={(e) => updateEntryPoint(index, { controls: e.target.value })}
                        />
                        <div className="flex items-center gap-2">
                          <select
                            className="select select-bordered select-sm flex-1"
                            value={point.vulnerabilityRating}
                            onChange={(e) => updateEntryPoint(index, { vulnerabilityRating: e.target.value as 'low' | 'medium' | 'high' })}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => deleteEntryPoint(index)}
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

              <div>
                <label className="block text-sm font-medium mb-2">Control Measures</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: 'bagSearches', label: 'Bag searches implemented' },
                    { key: 'metalDetection', label: 'Metal detection (arch/wand)' },
                    { key: 'securityPersonnel', label: 'Security personnel present' },
                    { key: 'cctvCoverage', label: 'CCTV coverage' },
                    { key: 'accessControlSystems', label: 'Access control systems' },
                    { key: 'visitorManagement', label: 'Visitor management system' },
                    { key: 'idVerification', label: 'ID verification procedures' }
                  ].map(measure => (
                    <label key={measure.key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        checked={vulnerabilityAssessment.controlMeasures[measure.key as keyof typeof vulnerabilityAssessment.controlMeasures]}
                        onChange={(e) => setVulnerabilityAssessment({
                          ...vulnerabilityAssessment,
                          controlMeasures: {...vulnerabilityAssessment.controlMeasures, [measure.key]: e.target.checked}
                        })}
                      />
                      <span>{measure.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 3.3 Detection Capabilities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">3.3 Detection Capabilities</h2>
              <p className="text-sm text-gray-600 mb-4">Surveillance and detection systems</p>
              
              <div className="space-y-4">
                <h3 className="font-medium">CCTV System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Cameras</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={vulnerabilityAssessment.cctv.totalCameras}
                      onChange={(e) => setVulnerabilityAssessment({
                        ...vulnerabilityAssessment,
                        cctv: {...vulnerabilityAssessment.cctv, totalCameras: e.target.value}
                      })}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Control Room Monitoring</label>
                    <select
                      className="select select-bordered w-full"
                      value={vulnerabilityAssessment.cctv.monitoring}
                      onChange={(e) => setVulnerabilityAssessment({
                        ...vulnerabilityAssessment,
                        cctv: {...vulnerabilityAssessment.cctv, monitoring: e.target.value}
                      })}
                    >
                      <option value="24-7">24/7</option>
                      <option value="operational">Operational hours</option>
                      <option value="recording-only">Recording only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">External Coverage (%)</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={vulnerabilityAssessment.cctv.externalCoverage}
                      onChange={(e) => setVulnerabilityAssessment({
                        ...vulnerabilityAssessment,
                        cctv: {...vulnerabilityAssessment.cctv, externalCoverage: e.target.value}
                      })}
                      placeholder="0-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Internal Coverage (%)</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={vulnerabilityAssessment.cctv.internalCoverage}
                      onChange={(e) => setVulnerabilityAssessment({
                        ...vulnerabilityAssessment,
                        cctv: {...vulnerabilityAssessment.cctv, internalCoverage: e.target.value}
                      })}
                      placeholder="0-100"
                    />
                  </div>
                </div>
              </div>

              {/* Internal Vulnerabilities - Crowding Points */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Crowding Points</label>
                  <button
                    type="button"
                    onClick={addCrowdingPoint}
                    className="btn btn-outline btn-xs"
                  >
                    + Add Crowding Point
                  </button>
                </div>
                {crowdingPoints.length > 0 && (
                  <div className="space-y-2">
                    {crowdingPoints.map((point, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <input
                            type="text"
                            className="input input-bordered input-sm"
                            placeholder="Location"
                            value={point.location}
                            onChange={(e) => updateCrowdingPoint(index, { location: e.target.value })}
                          />
                          <input
                            type="text"
                            className="input input-bordered input-sm"
                            placeholder="Max density (people/m²)"
                            value={point.maxDensity}
                            onChange={(e) => updateCrowdingPoint(index, { maxDensity: e.target.value })}
                          />
                        </div>
                        <textarea
                          className="textarea textarea-bordered w-full textarea-sm"
                          placeholder="Description and mitigations"
                          value={point.description}
                          onChange={(e) => updateCrowdingPoint(index, { description: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => deleteCrowdingPoint(index)}
                          className="btn btn-ghost btn-xs text-red-500 mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Protective Security Measures */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 4: Protective Security Measures</h1>
              <p className="text-primary/80 text-sm mt-1">Security personnel, procedures, protocols, and communications</p>
            </div>
            {/* 4.1 Security Personnel */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">4.1 Security Personnel</h2>
              <p className="text-sm text-gray-600 mb-4">Staffing levels and capabilities</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">In-house Security</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={protectiveMeasures.personnel.inHouseSecurity}
                    onChange={(e) => setProtectiveMeasures({
                      ...protectiveMeasures,
                      personnel: {...protectiveMeasures.personnel, inHouseSecurity: e.target.value}
                    })}
                    placeholder="Number of staff"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Contract Security</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={protectiveMeasures.personnel.contractSecurity}
                    onChange={(e) => setProtectiveMeasures({
                      ...protectiveMeasures,
                      personnel: {...protectiveMeasures.personnel, contractSecurity: e.target.value}
                    })}
                    placeholder="Number of staff"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">SIA Licensed (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={protectiveMeasures.personnel.siaLicensed}
                    onChange={(e) => setProtectiveMeasures({
                      ...protectiveMeasures,
                      personnel: {...protectiveMeasures.personnel, siaLicensed: e.target.value}
                    })}
                    placeholder="0-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ACT Trained (%)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={protectiveMeasures.personnel.actTrained}
                    onChange={(e) => setProtectiveMeasures({
                      ...protectiveMeasures,
                      personnel: {...protectiveMeasures.personnel, actTrained: e.target.value}
                    })}
                    placeholder="0-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Capabilities</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: 'behavioralDetection', label: 'Behavioral detection training' },
                    { key: 'conflictManagement', label: 'Conflict management' },
                    { key: 'physicalIntervention', label: 'Physical intervention' },
                    { key: 'firstAidTrauma', label: 'First aid/trauma' },
                    { key: 'fireMarshal', label: 'Fire marshal training' },
                    { key: 'counterTerrorism', label: 'Counter-terrorism awareness' }
                  ].map(capability => (
                    <label key={capability.key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        checked={protectiveMeasures.capabilities[capability.key as keyof typeof protectiveMeasures.capabilities]}
                        onChange={(e) => setProtectiveMeasures({
                          ...protectiveMeasures,
                          capabilities: {...protectiveMeasures.capabilities, [capability.key]: e.target.checked}
                        })}
                      />
                      <span>{capability.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 4.2 Procedures and Protocols */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">4.2 Procedures and Protocols</h2>
              <p className="text-sm text-gray-600 mb-4">Security procedures and testing regime</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Security Procedures</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: 'threatAssessment', label: 'Threat assessment protocol' },
                    { key: 'lockdown', label: 'Lockdown procedures' },
                    { key: 'evacuation', label: 'Evacuation procedures' },
                    { key: 'invacuation', label: 'Invacuation procedures' },
                    { key: 'search', label: 'Search procedures' },
                    { key: 'suspiciousItem', label: 'Suspicious item protocol' },
                    { key: 'commsCascade', label: 'Communications cascade' }
                  ].map(procedure => (
                    <label key={procedure.key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        checked={protectiveMeasures.procedures[procedure.key as keyof typeof protectiveMeasures.procedures]}
                        onChange={(e) => setProtectiveMeasures({
                          ...protectiveMeasures,
                          procedures: {...protectiveMeasures.procedures, [procedure.key]: e.target.checked}
                        })}
                      />
                      <span>{procedure.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Desktop Exercises</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={protectiveMeasures.testing.desktopFrequency}
                    onChange={(e) => setProtectiveMeasures({
                      ...protectiveMeasures,
                      testing: {...protectiveMeasures.testing, desktopFrequency: e.target.value}
                    })}
                    placeholder="Frequency"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Live Exercises</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={protectiveMeasures.testing.liveFrequency}
                    onChange={(e) => setProtectiveMeasures({
                      ...protectiveMeasures,
                      testing: {...protectiveMeasures.testing, liveFrequency: e.target.value}
                    })}
                    placeholder="Frequency"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Multi-agency Exercise</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={protectiveMeasures.testing.multiAgencyDate}
                    onChange={(e) => setProtectiveMeasures({
                      ...protectiveMeasures,
                      testing: {...protectiveMeasures.testing, multiAgencyDate: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Emergency Response Capabilities */}
        {currentSection === 5 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 5: Emergency Response Capabilities</h1>
              <p className="text-primary/80 text-sm mt-1">Run-Hide-Tell implementation, medical capabilities, and emergency services integration</p>
            </div>
            {/* 5.1 Immediate Response */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">5.1 Immediate Response</h2>
              <p className="text-sm text-gray-600 mb-4">Run-Hide-Tell implementation and medical capabilities</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Staff Awareness (%)</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={emergencyResponse.runHideTell.staffAwareness}
                      onChange={(e) => setEmergencyResponse({
                        ...emergencyResponse,
                        runHideTell: {...emergencyResponse.runHideTell, staffAwareness: e.target.value}
                      })}
                      placeholder="0-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Lockdown Capability</label>
                    <select
                      className="select select-bordered w-full"
                      value={emergencyResponse.runHideTell.lockdownCapability}
                      onChange={(e) => setEmergencyResponse({
                        ...emergencyResponse,
                        runHideTell: {...emergencyResponse.runHideTell, lockdownCapability: e.target.value}
                      })}
                    >
                      <option value="full">Full</option>
                      <option value="partial">Partial</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Public information displayed</span>
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="publicInfo"
                        value="yes"
                        checked={emergencyResponse.runHideTell.publicInfoDisplayed === true}
                        onChange={() => setEmergencyResponse({
                          ...emergencyResponse,
                          runHideTell: {...emergencyResponse.runHideTell, publicInfoDisplayed: true}
                        })}
                        className="radio radio-success"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="publicInfo"
                        value="no"
                        checked={emergencyResponse.runHideTell.publicInfoDisplayed === false}
                        onChange={() => setEmergencyResponse({
                          ...emergencyResponse,
                          runHideTell: {...emergencyResponse.runHideTell, publicInfoDisplayed: false}
                        })}
                        className="radio radio-error"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Medical Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Aiders on Site</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={emergencyResponse.medical.firstAiders}
                      onChange={(e) => setEmergencyResponse({
                        ...emergencyResponse,
                        medical: {...emergencyResponse.medical, firstAiders: e.target.value}
                      })}
                      placeholder="Number per shift"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Trauma Trained Staff</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={emergencyResponse.medical.traumaTrained}
                      onChange={(e) => setEmergencyResponse({
                        ...emergencyResponse,
                        medical: {...emergencyResponse.medical, traumaTrained: e.target.value}
                      })}
                      placeholder="Number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Bleed Kits</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={emergencyResponse.medical.bleedKits}
                      onChange={(e) => setEmergencyResponse({
                        ...emergencyResponse,
                        medical: {...emergencyResponse.medical, bleedKits: e.target.value}
                      })}
                      placeholder="Number and locations"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Defibrillators</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={emergencyResponse.medical.defibrillators}
                      onChange={(e) => setEmergencyResponse({
                        ...emergencyResponse,
                        medical: {...emergencyResponse.medical, defibrillators: e.target.value}
                      })}
                      placeholder="Number and locations"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5.2 Emergency Services Integration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">5.2 Emergency Services Integration</h2>
              <p className="text-sm text-gray-600 mb-4">Response times and coordination</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Police Response Time</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={emergencyResponse.services.policeResponse}
                    onChange={(e) => setEmergencyResponse({
                      ...emergencyResponse,
                      services: {...emergencyResponse.services, policeResponse: e.target.value}
                    })}
                    placeholder="Minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ambulance Response Time</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={emergencyResponse.services.ambulanceResponse}
                    onChange={(e) => setEmergencyResponse({
                      ...emergencyResponse,
                      services: {...emergencyResponse.services, ambulanceResponse: e.target.value}
                    })}
                    placeholder="Minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fire Service Response Time</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={emergencyResponse.services.fireResponse}
                    onChange={(e) => setEmergencyResponse({
                      ...emergencyResponse,
                      services: {...emergencyResponse.services, fireResponse: e.target.value}
                    })}
                    placeholder="Minutes"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'jointResponsePlan', label: 'Joint response plan' },
                  { key: 'liaisonMeetings', label: 'Regular liaison meetings' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{item.label}</span>
                    <div className="flex gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`service-${item.key}`}
                          value="yes"
                          checked={emergencyResponse.services[item.key as keyof typeof emergencyResponse.services] === true}
                          onChange={() => setEmergencyResponse({
                            ...emergencyResponse,
                            services: {...emergencyResponse.services, [item.key]: true}
                          })}
                          className="radio radio-success"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`service-${item.key}`}
                          value="no"
                          checked={emergencyResponse.services[item.key as keyof typeof emergencyResponse.services] === false}
                          onChange={() => setEmergencyResponse({
                            ...emergencyResponse,
                            services: {...emergencyResponse.services, [item.key]: false}
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
          </div>
        )}

        {/* Section 6: Risk Evaluation */}
        {currentSection === 6 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 6: Risk Evaluation</h1>
              <p className="text-primary/80 text-sm mt-1">Attack likelihood, impact assessment, and overall risk rating</p>
            </div>
            {/* 6.1 Attack Likelihood */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">6.1 Attack Likelihood</h2>
              <p className="text-sm text-gray-600 mb-4">Based on threat and vulnerability assessment</p>
              
              <div className="space-y-2">
                {[
                  { value: 'very-low', label: 'Very Low', desc: 'Minimal threat indicators' },
                  { value: 'low', label: 'Low', desc: 'Some threat indicators, good controls' },
                  { value: 'medium', label: 'Medium', desc: 'Credible threat, adequate controls' },
                  { value: 'high', label: 'High', desc: 'Specific threats, vulnerabilities present' },
                  { value: 'very-high', label: 'Very High', desc: 'Imminent threat indicators' }
                ].map(option => (
                  <label key={option.value} className="cursor-pointer">
                    <div className={`p-4 rounded-lg border-2 transition-all ${
                      riskEvaluation.attackLikelihood === option.value
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="likelihood"
                          value={option.value}
                          checked={riskEvaluation.attackLikelihood === option.value}
                          onChange={(e) => setRiskEvaluation({...riskEvaluation, attackLikelihood: e.target.value})}
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
                  value={riskEvaluation.likelihoodJustification}
                  onChange={(e) => setRiskEvaluation({...riskEvaluation, likelihoodJustification: e.target.value})}
                  placeholder="Provide justification for the likelihood rating"
                />
              </div>
            </div>

            {/* 6.2 Impact Assessment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">6.2 Impact Assessment</h2>
              <p className="text-sm text-gray-600 mb-4">Considering maximum reasonable loss</p>
              
              <div className="space-y-2">
                {[
                  { value: 'minor', label: 'Minor', desc: 'Limited injuries, minimal disruption' },
                  { value: 'moderate', label: 'Moderate', desc: 'Multiple casualties, local impact' },
                  { value: 'major', label: 'Major', desc: 'Mass casualties, regional impact' },
                  { value: 'catastrophic', label: 'Catastrophic', desc: 'Extreme casualties, national impact' }
                ].map(option => (
                  <label key={option.value} className="cursor-pointer">
                    <div className={`p-4 rounded-lg border-2 transition-all ${
                      riskEvaluation.impactAssessment === option.value
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="impact"
                          value={option.value}
                          checked={riskEvaluation.impactAssessment === option.value}
                          onChange={(e) => setRiskEvaluation({...riskEvaluation, impactAssessment: e.target.value})}
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
                  value={riskEvaluation.impactJustification}
                  onChange={(e) => setRiskEvaluation({...riskEvaluation, impactJustification: e.target.value})}
                  placeholder="Provide justification for the impact rating"
                />
              </div>
            </div>

            {/* 6.3 Overall Risk Rating */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">6.3 Overall Risk Rating</h2>
              <p className="text-sm text-gray-600 mb-4">Auto-calculated based on likelihood and impact</p>
              
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <div className={`text-4xl font-bold ${calculateOverallRisk().color}`}>
                  {calculateOverallRisk().level}
                </div>
                <div className="text-lg text-gray-600 mt-2">
                  Risk Score: {calculateOverallRisk().score}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  ({riskEvaluation.attackLikelihood} likelihood × {riskEvaluation.impactAssessment} impact)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 7: Improvement Plan */}
        {currentSection === 7 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 7: Improvement Plan</h1>
              <p className="text-primary/80 text-sm mt-1">Immediate actions, short/long-term improvements, and investment requirements</p>
            </div>
            {/* 7.1 Immediate Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">7.1 Immediate Actions (Within 48 hours)</h2>
                  <p className="text-sm text-gray-600">Critical actions requiring immediate implementation</p>
                </div>
                <button
                  type="button"
                  onClick={addImmediateAction}
                  className="btn btn-primary btn-sm"
                >
                  + Add Action
                </button>
              </div>

              {immediateActions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No immediate actions identified. Click "Add Action" if critical actions are required.
                </p>
              ) : (
                <div className="space-y-4">
                  {immediateActions.map((action, index) => (
                    <div key={action.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">Action #{index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => deleteImmediateAction(action.id)}
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
                            onChange={(e) => updateImmediateAction(action.id, { action: e.target.value })}
                            placeholder="Describe the immediate action required"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Threat/Vulnerability Addressed</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={action.threatAddressed}
                            onChange={(e) => updateImmediateAction(action.id, { threatAddressed: e.target.value })}
                            placeholder="What does this address?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Responsible Person</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={action.responsiblePerson}
                            onChange={(e) => updateImmediateAction(action.id, { responsiblePerson: e.target.value })}
                            placeholder="Name of responsible person"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Resource Requirement</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={action.resourceRequirement}
                            onChange={(e) => updateImmediateAction(action.id, { resourceRequirement: e.target.value })}
                            placeholder="Resources needed"
                          />
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-success mr-2"
                              checked={action.completed}
                              onChange={(e) => updateImmediateAction(action.id, { completed: e.target.checked })}
                            />
                            <span>Completed</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 7.2 Short-term Improvements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">7.2 Short-term Improvements (Within 4 weeks)</h2>
              <p className="text-sm text-gray-600 mb-4">Actions to enhance security in the short term</p>
              
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                value={improvementPlan.shortTermImprovements}
                onChange={(e) => setImprovementPlan({...improvementPlan, shortTermImprovements: e.target.value})}
                placeholder="List short-term improvements categorized by Physical/Procedural/Personnel/Technical"
              />
            </div>

            {/* 7.3 Long-term Enhancements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">7.3 Long-term Enhancements (3-12 months)</h2>
              <p className="text-sm text-gray-600 mb-4">Strategic improvements requiring planning and investment</p>
              
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                value={improvementPlan.longTermEnhancements}
                onChange={(e) => setImprovementPlan({...improvementPlan, longTermEnhancements: e.target.value})}
                placeholder="Describe long-term enhancement plans"
              />
            </div>

            {/* 7.4 Investment Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">7.4 Investment Requirements</h2>
              <p className="text-sm text-gray-600 mb-4">Estimated costs for improvements</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Capital Expenditure</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={improvementPlan.capex}
                    onChange={(e) => setImprovementPlan({...improvementPlan, capex: e.target.value})}
                    placeholder="£0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Operational Expenditure</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={improvementPlan.opex}
                    onChange={(e) => setImprovementPlan({...improvementPlan, opex: e.target.value})}
                    placeholder="£0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Training Investment</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={improvementPlan.trainingInvestment}
                    onChange={(e) => setImprovementPlan({...improvementPlan, trainingInvestment: e.target.value})}
                    placeholder="£0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Technology Investment</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={improvementPlan.techInvestment}
                    onChange={(e) => setImprovementPlan({...improvementPlan, techInvestment: e.target.value})}
                    placeholder="£0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Business Case Summary</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  value={improvementPlan.businessCaseSummary}
                  onChange={(e) => setImprovementPlan({...improvementPlan, businessCaseSummary: e.target.value})}
                  placeholder="Summarize the business case for investment"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 8: Compliance and Assurance */}
        {currentSection === 8 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 8: Compliance and Assurance</h1>
              <p className="text-primary/80 text-sm mt-1">Regulatory compliance, quality assurance, and document control</p>
            </div>
            {/* 8.1 Regulatory Compliance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">8.1 Regulatory Compliance</h2>
              <p className="text-sm text-gray-600 mb-4">Martyn's Law and related compliance status</p>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Martyn's Law Requirements</h3>
                <div className="space-y-2">
                  {[
                    { key: 'riskAssessmentComplete', label: 'Risk assessment completed' },
                    { key: 'mitigationProportionate', label: 'Mitigation measures proportionate' },
                    { key: 'staffTrainingCurrent', label: 'Staff training current' },
                    { key: 'proceduresDocumented', label: 'Procedures documented' },
                    { key: 'regularTesting', label: 'Regular testing conducted' }
                  ].map(req => (
                    <label key={req.key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        checked={compliance.martynsLaw[req.key as keyof typeof compliance.martynsLaw]}
                        onChange={(e) => setCompliance({
                          ...compliance,
                          martynsLaw: {...compliance.martynsLaw, [req.key]: e.target.checked}
                        })}
                      />
                      <span>{req.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Related Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { key: 'healthSafety', label: 'Health & Safety' },
                    { key: 'fireSafety', label: 'Fire Safety' },
                    { key: 'licensing', label: 'Licensing conditions' },
                    { key: 'planning', label: 'Planning conditions' },
                    { key: 'insurance', label: 'Insurance requirements' }
                  ].map(item => (
                    <label key={item.key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        checked={compliance.related[item.key as keyof typeof compliance.related]}
                        onChange={(e) => setCompliance({
                          ...compliance,
                          related: {...compliance.related, [item.key]: e.target.checked}
                        })}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 8.2 Quality Assurance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">8.2 Quality Assurance</h2>
              <p className="text-sm text-gray-600 mb-4">Review and validation status</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Internal Review Date</label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={compliance.qa.internalReviewDate}
                    onChange={(e) => setCompliance({
                      ...compliance,
                      qa: {...compliance.qa, internalReviewDate: e.target.value}
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">External Validation</label>
                  <select
                    className="select select-bordered w-full"
                    value={compliance.qa.externalValidation}
                    onChange={(e) => setCompliance({
                      ...compliance,
                      qa: {...compliance.qa, externalValidation: e.target.value}
                    })}
                  >
                    <option value="">None</option>
                    <option value="ctsa">CTSA</option>
                    <option value="police">Police</option>
                    <option value="consultant">Consultant</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mr-2"
                      checked={compliance.qa.boardBriefed}
                      onChange={(e) => setCompliance({
                        ...compliance,
                        qa: {...compliance.qa, boardBriefed: e.target.checked}
                      })}
                    />
                    <span>Board/Senior management briefed</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mr-2"
                      checked={compliance.qa.lessonsLearned}
                      onChange={(e) => setCompliance({
                        ...compliance,
                        qa: {...compliance.qa, lessonsLearned: e.target.checked}
                      })}
                    />
                    <span>Lessons learned captured</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 8.3 Document Control */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">8.3 Document Control</h2>
              <p className="text-sm text-gray-600 mb-4">Classification and review cycle</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Classification</label>
                  <select
                    className="select select-bordered w-full"
                    value={compliance.documentControl.classification}
                    onChange={(e) => setCompliance({
                      ...compliance,
                      documentControl: {...compliance.documentControl, classification: e.target.value}
                    })}
                  >
                    <option value="OFFICIAL">OFFICIAL</option>
                    <option value="OFFICIAL-SENSITIVE">OFFICIAL-SENSITIVE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Review Cycle</label>
                  <select
                    className="select select-bordered w-full"
                    value={compliance.documentControl.reviewCycle}
                    onChange={(e) => setCompliance({
                      ...compliance,
                      documentControl: {...compliance.documentControl, reviewCycle: e.target.value}
                    })}
                  >
                    <option value="quarterly">Quarterly</option>
                    <option value="bi-annual">Bi-annual</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 9: Declaration */}
        {currentSection === 9 && (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-primary">Section 9: Declaration</h1>
              <p className="text-primary/80 text-sm mt-1">Assessment declaration and next steps</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Assessment Declaration</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm">
                  I confirm that this Martyn's Law (Protect Duty) Risk Assessment has been completed 
                  in accordance with government guidance and represents a comprehensive assessment of 
                  the terrorism-related risks at this venue.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Lead Assessor: {premisesInfo.leadAssessor || '[Not provided]'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date: {premisesInfo.assessmentDate}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium mb-2">Important Notice</h3>
                <p className="text-sm">
                  This assessment contains security-sensitive information and should be handled in accordance 
                  with the {compliance.documentControl.classification} classification. Distribution should be 
                  limited to those with a legitimate need to know.
                </p>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-medium mb-2">Next Steps</h3>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Implement immediate actions within 48 hours</li>
                  <li>Brief all relevant staff on findings and procedures</li>
                  <li>Schedule review for {premisesInfo.nextReviewDate || 'date to be determined'}</li>
                  <li>Share with police Counter Terrorism Security Advisor if appropriate</li>
                  <li>Monitor threat level changes and update as necessary</li>
                </ul>
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
            style={{ 
              backgroundColor: 'transparent', 
              color: currentSection === 1 ? '#9ca3af' : '#3d3a72', 
              border: `1px solid ${currentSection === 1 ? '#d1d5db' : '#3d3a72'}`,
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: currentSection === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              transition: 'opacity 0.2s'
            }}
            className="hover:opacity-80"
          >
            Previous
          </button>

          <div className="flex gap-3">
            <Link href="/risk-assessments">
              <button style={{ 
                backgroundColor: '#e77726', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }} className="hover:opacity-80">
                Cancel
              </button>
            </Link>
            
            {currentSection < 9 ? (
              <button
                type="button"
                onClick={() => {
                  setCurrentSection(Math.min(9, currentSection + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                Next
              </button>
            ) : (
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
                  transition: 'opacity 0.2s',
                  opacity: loading ? '0.6' : '1'
                }}
                className="hover:opacity-80"
              >
                {loading ? 'Submitting...' : 'Submit Assessment'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}