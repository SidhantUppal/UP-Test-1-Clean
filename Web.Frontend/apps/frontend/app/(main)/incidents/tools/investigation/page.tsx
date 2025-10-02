"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { investigationService, type InvestigationData, type BarrierCategory, type Barrier, type WhyLevel, type Evidence, type InvestigationAction } from '@/services/investigationService';

// Investigation Tab Types
type InvestigationTab = 'setup' | 'barriers' | 'evidence' | 'related' | 'approvals' | 'quality';


export default function IncidentInvestigation() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<InvestigationTab>('setup');
  const [incidentId, setIncidentId] = useState<string | null>(null);
  const [investigation, setInvestigation] = useState<InvestigationData>({
    investigationTeam: [],
    problemStatement: '',
    timeline: { start: new Date(), target: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    stakeholders: [],
    investigationType: 'barrier-analysis',
    barrierCategories: [
      {
        id: 1,
        name: 'Physical',
        description: 'Equipment, PPE, engineering controls, and physical barriers',
        barriers: []
      },
      {
        id: 2,
        name: 'Administrative',
        description: 'Procedures, policies, training, and administrative controls',
        barriers: []
      },
      {
        id: 3,
        name: 'Human',
        description: 'Behavior, competency, decision-making, and human factors',
        barriers: []
      },
      {
        id: 4,
        name: 'Management Systems',
        description: 'Oversight, communication, culture, and management controls',
        barriers: []
      }
    ],
    whyLevels: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      question: `Why did this happen? (Level ${i + 1})`,
      answer: '',
      evidence: [],
      confidenceLevel: 1,
      witnesses: [],
      attachments: []
    })),
    qualityScore: 0,
    status: 'draft'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [investigationId, setInvestigationId] = useState<string | null>(null);
  const [isNewInvestigation, setIsNewInvestigation] = useState(true);
  const [loadingIncidentData, setLoadingIncidentData] = useState(false);
  const [incidentDataError, setIncidentDataError] = useState<string | null>(null);
  const [actions, setActions] = useState<InvestigationAction[]>([]);
  const [newAction, setNewAction] = useState({
    title: '',
    description: '',
    actionType: 'corrective' as const,
    priority: 'medium' as const,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedTo: '',
    linkedBarrierId: null as number | null
  });

  // Summary Document Generator States
  const [summaryDocument, setSummaryDocument] = useState({
    title: '',
    content: '',
    template: 'standard' as 'standard' | 'safety' | 'quality' | 'brief',
    isGenerating: false,
    isEditing: false,
    selectedEmployees: [] as string[],
    distributionGroups: [] as string[],
    acknowledgmentRequired: true,
    documentId: null as string | null,
    lastGenerated: null as Date | null
  });
  const [showSummaryPreview, setShowSummaryPreview] = useState(false);
  const [distributionTracking, setDistributionTracking] = useState({
    totalSent: 0,
    acknowledged: 0,
    pending: 0,
    overdue: 0
  });

  // Helper functions for URL parameter pre-population
  const generateProblemStatementFromParams = (): string => {
    const parts = [];
    const incidentType = searchParams?.get('incidentType');
    const incidentDate = searchParams?.get('incidentDate');
    const location = searchParams?.get('location');
    const description = searchParams?.get('description');
    const severity = searchParams?.get('severity');

    if (incidentType) {
      parts.push(`${incidentType} incident`);
    }

    if (incidentDate) {
      parts.push(`occurred on ${new Date(incidentDate).toLocaleDateString()}`);
    }

    if (location) {
      parts.push(`at ${location}`);
    }

    if (description) {
      parts.push(`involving ${description.toLowerCase()}`);
    }

    if (severity) {
      parts.push(`(Severity: ${severity})`);
    }

    return parts.length > 0
      ? parts.join(' ').charAt(0).toUpperCase() + parts.join(' ').slice(1) + '.'
      : 'Investigation required to determine root cause of reported incident.';
  };

  const extractStakeholdersFromParams = (): string[] => {
    const stakeholders = [];
    const reportedBy = searchParams?.get('reportedBy');
    const affectedPerson = searchParams?.get('affectedPerson');

    if (reportedBy) {
      stakeholders.push(reportedBy + ' (Reporter)');
    }

    if (affectedPerson && affectedPerson !== 'N/A') {
      stakeholders.push(affectedPerson + ' (Affected)');
    }

    return stakeholders.filter(Boolean);
  };

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (saving || isNewInvestigation) return;

    try {
      setSaving(true);
      if (investigationId) {
        await investigationService.updateInvestigation(investigationId, investigation);
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setSaving(false);
    }
  }, [investigation, investigationId, saving, isNewInvestigation]);

  // Manual save functionality
  const saveInvestigation = async () => {
    try {
      setSaving(true);
      if (isNewInvestigation) {
        const result = await investigationService.createInvestigation({
          ...investigation,
          incidentCaseId: incidentId || undefined
        });
        setInvestigationId(result.data.investigationId.toString());
        setIsNewInvestigation(false);
      } else if (investigationId) {
        await investigationService.updateInvestigation(investigationId, investigation);
      }
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save investigation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Load existing investigation or setup new one
  useEffect(() => {
    const loadInvestigation = async () => {
      try {
        const id = searchParams?.get('incidentId');
        const existingInvestigationId = searchParams?.get('investigationId');

        setIncidentId(id);
        setIncidentDataError(null);

        if (existingInvestigationId) {
          // Load existing investigation
          const result = await investigationService.getInvestigation(existingInvestigationId);
          setInvestigation(result.data);
          setInvestigationId(existingInvestigationId);
          setIsNewInvestigation(false);

          // Load existing actions
          try {
            const actionsResult = await investigationService.getInvestigationActions(existingInvestigationId);
            setActions(actionsResult.data || []);
          } catch (error) {
            console.error('Failed to load investigation actions:', error);
          }
        } else if (id || searchParams?.get('prePopulated')) {
          // New investigation linked to an incident - auto-populate from incident data
          try {
            setLoadingIncidentData(true);

            // Check if we have direct URL parameters for pre-population
            if (searchParams?.get('prePopulated') === 'true') {
              const investigationData: InvestigationData = {
                incidentCaseId: id || searchParams?.get('incidentId'),
                investigationTeam: [],
                problemStatement: generateProblemStatementFromParams(),
                timeline: { start: new Date(), target: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
                targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                stakeholders: extractStakeholdersFromParams(),
                investigationType: 'barrier-analysis',
                barrierCategories: investigation.barrierCategories,
                whyLevels: investigation.whyLevels,
                qualityScore: 0,
                status: 'draft',
                prePopulatedData: {
                  incidentDate: searchParams?.get('incidentDate') || '',
                  incidentTime: searchParams?.get('incidentDate') ? new Date(searchParams.get('incidentDate')!).toLocaleTimeString('en-GB', { hour12: false }) : '',
                  location: searchParams?.get('location') || '',
                  description: searchParams?.get('description') || '',
                  peopleInvolved: [
                    searchParams?.get('reportedBy') || '',
                    searchParams?.get('affectedPerson') || ''
                  ].filter(p => p !== '' && p !== 'N/A'),
                  severity: searchParams?.get('severity') || '',
                  incidentType: searchParams?.get('incidentType') || '',
                  originalReporter: searchParams?.get('reportedBy') || '',
                  reportedDate: searchParams?.get('incidentDate') || '',
                  caseNumber: searchParams?.get('incidentId') || ''
                },
                dataSource: 'incident'
              };
              setInvestigation(investigationData);
            } else {
              // Use the service method for full incident data loading
              const investigationData = await investigationService.createInvestigationFromIncident(id);
              setInvestigation(investigationData);
            }
            setIsNewInvestigation(true);
          } catch (error) {
            console.error('Failed to load incident data for investigation:', error);
            setIncidentDataError('Failed to load incident data. You can still create the investigation manually.');
            // Fall back to blank investigation
            setIsNewInvestigation(true);
          } finally {
            setLoadingIncidentData(false);
          }
        } else {
          // New standalone investigation
          setIsNewInvestigation(true);
        }
      } catch (error) {
        console.error('Error loading investigation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInvestigation();
  }, [searchParams]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!isNewInvestigation && investigationId) {
      const interval = setInterval(autoSave, 30000);
      return () => clearInterval(interval);
    }
  }, [autoSave, isNewInvestigation, investigationId]);

  // Auto-save when investigation data changes (debounced)
  useEffect(() => {
    if (!isNewInvestigation && investigationId) {
      const timeoutId = setTimeout(autoSave, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [investigation, autoSave, isNewInvestigation, investigationId]);

  const tabs = [
    { id: 'setup', label: 'Setup & Scope', description: 'Investigation planning and team setup', icon: '🎯' },
    { id: 'barriers', label: 'Barrier Analysis', description: 'Systematic barrier identification, failure analysis, and corrective actions', icon: '🛡️' },
    { id: 'evidence', label: 'Evidence Management', description: 'Collect and organize supporting evidence', icon: '📁' },
    { id: 'related', label: 'Related Records', description: 'Connect with risks, training, and procedures', icon: '🔗' },
    { id: 'approvals', label: 'Approvals & Summary', description: 'Investigation approval and summary document generation', icon: '✍️' },
    { id: 'quality', label: 'Quality Review', description: 'Investigation scoring and improvement', icon: '⭐' }
  ];

  // Calculate quality score including actions assessment
  const calculateQualityScore = (): number => {
    let score = 0;
    const maxScore = 100;

    // Problem statement completeness (10 points)
    if (investigation.problemStatement.length > 50) score += 10;
    else if (investigation.problemStatement.length > 20) score += 5;

    // Barrier analysis scoring (40 points) - reduced from 50 to make room for actions
    const totalBarriers = investigation.barrierCategories.reduce((sum, category) => sum + category.barriers.length, 0);
    const completedBarriers = investigation.barrierCategories.reduce((sum, category) =>
      sum + category.barriers.filter(barrier =>
        barrier.status !== 'Present' ||
        barrier.failureMode.length > 0 ||
        barrier.failureReason.length > 0
      ).length, 0);

    if (totalBarriers > 0) {
      score += Math.round((completedBarriers / totalBarriers) * 20); // 20 points for barrier identification
    }

    // Failure analysis quality (20 points)
    const barriersWithAnalysis = investigation.barrierCategories.reduce((sum, category) =>
      sum + category.barriers.filter(barrier =>
        barrier.failureMode.length > 20 && barrier.failureReason.length > 20
      ).length, 0);

    if (totalBarriers > 0) {
      score += Math.round((barriersWithAnalysis / totalBarriers) * 20);
    }

    // Actions quality (10 points) - NEW
    const failedBarriers = investigation.barrierCategories.reduce((sum, category) =>
      sum + category.barriers.filter(barrier => barrier.status !== 'Present').length, 0);

    if (failedBarriers > 0) {
      // Award points based on actions created for failed barriers
      const actionCoverage = Math.min(actions.length / failedBarriers, 1);
      score += Math.round(actionCoverage * 10);
    } else if (actions.length > 0) {
      // Award some points for proactive actions even without failed barriers
      score += 5;
    }

    // Team assignment (15 points)
    if (investigation.investigationTeam.length > 0) score += 10;
    if (investigation.investigationTeam.length > 2) score += 5;

    // Evidence quality (15 points)
    const totalEvidence = investigation.barrierCategories.reduce((sum, category) =>
      sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.evidence.length, 0), 0) +
      (investigation.prePopulatedData?.initialEvidence?.length || 0);

    if (totalEvidence > 10) score += 15;
    else if (totalEvidence > 5) score += 10;
    else if (totalEvidence > 0) score += 5;

    // Stakeholder involvement (10 points)
    if (investigation.stakeholders.length > 0) score += 5;
    if (investigation.stakeholders.length > 2) score += 5;

    // Bonus points for having pre-populated data from incident (improves completeness)
    if (investigation.dataSource === 'incident' && investigation.prePopulatedData) {
      score += 5; // 5% bonus for having incident data foundation
    }

    return Math.min(score, maxScore);
  };

  const getQualityGrade = (score: number): { grade: string; color: string; description: string } => {
    return investigationService.getQualityGrade(score);
  };

  // Update quality score when investigation data changes
  useEffect(() => {
    const newScore = calculateQualityScore();
    setInvestigation(prev => ({ ...prev, qualityScore: newScore }));
  }, [investigation.problemStatement, investigation.barrierCategories, investigation.investigationTeam, investigation.stakeholders, actions]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup':
        return renderSetupTab();
      case 'barriers':
        return renderBarrierAnalysisTab();
      case 'evidence':
        return renderEvidenceManagementTab();
      case 'related':
        return renderRelatedRecordsTab();
      case 'approvals':
        return renderApprovalsTab();
      case 'quality':
        return renderQualityReviewTab();
      default:
        return null;
    }
  };

  const renderSetupTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Investigation Setup & Scope</h2>
        <p className="text-gray-600 mt-1">Define the investigation scope, team, and timeline</p>
      </div>

      {/* Loading Incident Data */}
      {loadingIncidentData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-2"></div>
            <span className="text-yellow-800 font-medium">Loading incident data to populate investigation...</span>
          </div>
        </div>
      )}

      {/* Incident Data Error */}
      {incidentDataError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800">{incidentDataError}</span>
          </div>
        </div>
      )}

      {/* Data Source Indicator */}
      {investigation.dataSource === 'incident' && investigation.prePopulatedData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="text-green-800 font-medium">Investigation pre-populated from Incident Case: {investigation.prePopulatedData.caseNumber || incidentId}</span>
                <div className="text-sm text-green-600 mt-1">
                  {investigation.prePopulatedData.incidentType} • {investigation.prePopulatedData.severity} • {new Date(investigation.prePopulatedData.incidentDate || '').toLocaleDateString()}
                </div>
              </div>
            </div>
            <Link
              href={`/incidents/${incidentId}`}
              className="text-green-600 hover:text-green-700 underline text-sm font-medium"
            >
              View Original Incident →
            </Link>
          </div>
        </div>
      )}

      {/* Manual Investigation Indicator */}
      {investigation.dataSource === 'manual' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-800 font-medium">Standalone Investigation - Manual data entry required</span>
          </div>
        </div>
      )}

      {/* Pre-populated Data Summary */}
      {investigation.prePopulatedData && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Pre-populated Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {investigation.prePopulatedData.incidentDate && (
              <div>
                <span className="font-medium text-gray-600">Date:</span>
                <span className="ml-2">{new Date(investigation.prePopulatedData.incidentDate).toLocaleDateString()}</span>
              </div>
            )}
            {investigation.prePopulatedData.location && (
              <div>
                <span className="font-medium text-gray-600">Location:</span>
                <span className="ml-2">{investigation.prePopulatedData.location}</span>
              </div>
            )}
            {investigation.prePopulatedData.severity && (
              <div>
                <span className="font-medium text-gray-600">Severity:</span>
                <span className="ml-2">{investigation.prePopulatedData.severity}</span>
              </div>
            )}
            {investigation.prePopulatedData.originalReporter && (
              <div>
                <span className="font-medium text-gray-600">Reporter:</span>
                <span className="ml-2">{investigation.prePopulatedData.originalReporter}</span>
              </div>
            )}
            {investigation.prePopulatedData.peopleInvolved && investigation.prePopulatedData.peopleInvolved.length > 0 && (
              <div>
                <span className="font-medium text-gray-600">People Involved:</span>
                <span className="ml-2">{investigation.prePopulatedData.peopleInvolved.length} person(s)</span>
              </div>
            )}
            {investigation.prePopulatedData.initialEvidence && investigation.prePopulatedData.initialEvidence.length > 0 && (
              <div>
                <span className="font-medium text-gray-600">Initial Evidence:</span>
                <span className="ml-2">{investigation.prePopulatedData.initialEvidence.length} item(s)</span>
              </div>
            )}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            This information was automatically imported from the incident form. You can edit and enhance it below.
          </div>
        </div>
      )}

      {/* Problem Statement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Initial Problem Statement
          <span className="text-red-500 ml-1">*</span>
          {investigation.dataSource === 'incident' && (
            <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Auto-generated from incident</span>
          )}
        </label>
        <textarea
          value={investigation.problemStatement}
          onChange={(e) => setInvestigation(prev => ({ ...prev, problemStatement: e.target.value }))}
          placeholder={investigation.dataSource === 'incident'
            ? "Problem statement auto-generated from incident data. Edit to enhance if needed..."
            : "Clearly describe what happened that requires investigation..."
          }
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">
          {investigation.problemStatement.length}/500 characters
          {investigation.dataSource === 'incident' && (
            <span className="ml-2 text-green-600">• Enhanced with incident details</span>
          )}
        </p>
      </div>

      {/* Investigation Team */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investigation Team
          </label>
          <div className="space-y-2">
            {investigation.investigationTeam.map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => {
                    const newTeam = [...investigation.investigationTeam];
                    newTeam[index] = e.target.value;
                    setInvestigation(prev => ({ ...prev, investigationTeam: newTeam }));
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Team member name"
                />
                <button
                  onClick={() => {
                    const newTeam = investigation.investigationTeam.filter((_, i) => i !== index);
                    setInvestigation(prev => ({ ...prev, investigationTeam: newTeam }));
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setInvestigation(prev => ({
                  ...prev,
                  investigationTeam: [...prev.investigationTeam, '']
                }));
              }}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add Team Member
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Stakeholders
            {investigation.dataSource === 'incident' && investigation.stakeholders.length > 0 && (
              <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                {investigation.stakeholders.length} imported from incident
              </span>
            )}
          </label>
          <div className="space-y-2">
            {investigation.stakeholders.map((stakeholder, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={stakeholder}
                  onChange={(e) => {
                    const newStakeholders = [...investigation.stakeholders];
                    newStakeholders[index] = e.target.value;
                    setInvestigation(prev => ({ ...prev, stakeholders: newStakeholders }));
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Stakeholder name or role"
                />
                <button
                  onClick={() => {
                    const newStakeholders = investigation.stakeholders.filter((_, i) => i !== index);
                    setInvestigation(prev => ({ ...prev, stakeholders: newStakeholders }));
                  }}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setInvestigation(prev => ({
                  ...prev,
                  stakeholders: [...prev.stakeholders, '']
                }));
              }}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add Stakeholder
            </button>
          </div>
          {investigation.dataSource === 'incident' && (
            <p className="text-xs text-green-600 mt-2">
              Stakeholders were automatically identified from the incident report. Add additional stakeholders as needed.
            </p>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investigation Start Date
          </label>
          <input
            type="date"
            value={investigation.timeline.start.toISOString().split('T')[0]}
            onChange={(e) => {
              setInvestigation(prev => ({
                ...prev,
                timeline: { ...prev.timeline, start: new Date(e.target.value) }
              }));
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Completion Date
          </label>
          <input
            type="date"
            value={investigation.timeline.target.toISOString().split('T')[0]}
            onChange={(e) => {
              setInvestigation(prev => ({
                ...prev,
                timeline: { ...prev.timeline, target: new Date(e.target.value) }
              }));
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Quality Preview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Setup Completeness</span>
          <span className={`text-sm font-semibold ${getQualityGrade(investigation.qualityScore).color}`}>
            {investigation.qualityScore}% ({getQualityGrade(investigation.qualityScore).grade})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${investigation.qualityScore}%` }}
          />
        </div>
      </div>
    </div>
  );

  const renderBarrierAnalysisTab = () => {
    // Helper function to create action for a specific barrier
    const createActionForBarrier = async (barrier: Barrier, categoryName: string) => {
      setNewAction({
        title: `Address ${barrier.description || 'barrier failure'}`,
        description: `${barrier.status === 'Failed' ? 'Fix' : barrier.status === 'Absent' ? 'Implement' : 'Improve'} ${barrier.description} in ${categoryName} controls`,
        actionType: 'corrective',
        priority: barrier.effectivenessRating <= 2 ? 'high' : barrier.effectivenessRating <= 3 ? 'medium' : 'low',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        assignedTo: '',
        linkedBarrierId: barrier.id
      });

      // Auto-scroll to actions section
      setTimeout(() => {
        const actionsSection = document.getElementById('actions-section');
        if (actionsSection) {
          actionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    };

    // Create action handler
    const handleCreateAction = async () => {
      if (!investigationId || !newAction.title.trim() || !newAction.description.trim()) {
        alert('Please fill in all required fields and ensure the investigation is saved first');
        return;
      }

      try {
        const actionData = {
          title: newAction.title,
          description: newAction.description,
          actionType: newAction.actionType,
          priority: newAction.priority,
          dueDate: newAction.dueDate,
          assignedTo: newAction.assignedTo || undefined,
          status: 'pending' as const
        };

        const result = await investigationService.createAction(investigationId, actionData);

        // Add to local state
        setActions(prev => [...prev, result.data]);

        // Reset form
        setNewAction({
          title: '',
          description: '',
          actionType: 'corrective',
          priority: 'medium',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          assignedTo: '',
          linkedBarrierId: null
        });

        // Update last saved
        setLastSaved(new Date());

      } catch (error) {
        console.error('Failed to create action:', error);
        alert('Failed to create action. Please try again.');
      }
    };

    return (
      <div className="space-y-6">
        {/* Progress Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Barrier Analysis Investigation</h2>
              <p className="text-gray-600 mt-1">Systematic identification, analysis, and corrective actions for barriers</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="text-2xl font-bold text-purple-600">
                {investigation.barrierCategories.reduce((sum, category) =>
                  sum + category.barriers.filter(barrier =>
                    barrier.status !== 'Present' || barrier.failureMode.length > 0
                  ).length, 0)}/{investigation.barrierCategories.reduce((sum, category) => sum + category.barriers.length, 0)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${investigation.barrierCategories.reduce((sum, category) => sum + category.barriers.length, 0) > 0
                  ? (investigation.barrierCategories.reduce((sum, category) =>
                      sum + category.barriers.filter(barrier =>
                        barrier.status !== 'Present' || barrier.failureMode.length > 0
                      ).length, 0) / investigation.barrierCategories.reduce((sum, category) => sum + category.barriers.length, 0)) * 100
                  : 0}%`
              }}
            />
          </div>
        </div>

        {/* Problem Statement Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Problem Statement:</h3>
          <p className="text-blue-800">{investigation.problemStatement || 'Please complete the Setup & Scope tab first'}</p>
        </div>

        {/* Barrier Categories */}
        <div className="space-y-6">
          {investigation.barrierCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  category.name === 'Physical' ? 'bg-blue-600' :
                  category.name === 'Administrative' ? 'bg-green-600' :
                  category.name === 'Human' ? 'bg-orange-600' : 'bg-purple-600'
                }`}>
                  {category.name === 'Physical' ? '🛡️' :
                   category.name === 'Administrative' ? '📋' :
                   category.name === 'Human' ? '👤' : '🏢'}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name} Barriers</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <button
                  onClick={() => {
                    const newBarrier: Barrier = {
                      id: Date.now(),
                      categoryId: category.id,
                      description: '',
                      expectedFunction: '',
                      status: 'Present',
                      failureMode: '',
                      failureReason: '',
                      evidence: [],
                      effectivenessRating: 3,
                      recommendations: [],
                      witnesses: [],
                      attachments: []
                    };

                    const newCategories = [...investigation.barrierCategories];
                    const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                    newCategories[categoryIndex].barriers.push(newBarrier);
                    setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                  }}
                  className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors text-sm"
                >
                  + Add Barrier
                </button>
              </div>

              {/* Barriers in Category */}
              <div className="space-y-4">
                {category.barriers.map((barrier, barrierIndex) => (
                  <div key={barrier.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Barrier Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Barrier Description</label>
                        <input
                          type="text"
                          value={barrier.description}
                          onChange={(e) => {
                            const newCategories = [...investigation.barrierCategories];
                            const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                            newCategories[categoryIndex].barriers[barrierIndex].description = e.target.value;
                            setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                          }}
                          placeholder="What barrier should have been in place?"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Function</label>
                        <input
                          type="text"
                          value={barrier.expectedFunction}
                          onChange={(e) => {
                            const newCategories = [...investigation.barrierCategories];
                            const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                            newCategories[categoryIndex].barriers[barrierIndex].expectedFunction = e.target.value;
                            setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                          }}
                          placeholder="What was this barrier supposed to do?"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Barrier Status and Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Barrier Status</label>
                        <select
                          value={barrier.status}
                          onChange={(e) => {
                            const newCategories = [...investigation.barrierCategories];
                            const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                            newCategories[categoryIndex].barriers[barrierIndex].status = e.target.value as any;
                            setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="Present">Present & Effective</option>
                          <option value="Failed">Present but Failed</option>
                          <option value="Inadequate">Present but Inadequate</option>
                          <option value="Absent">Absent / Missing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Effectiveness Rating</label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => {
                                const newCategories = [...investigation.barrierCategories];
                                const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                                newCategories[categoryIndex].barriers[barrierIndex].effectivenessRating = rating as any;
                                setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                              }}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                                barrier.effectivenessRating >= rating
                                  ? 'bg-yellow-400 text-yellow-900'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                            >
                              ⭐
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Evidence: {barrier.evidence.length}</span>
                        <button
                          onClick={() => setActiveTab('evidence')}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                        >
                          Manage →
                        </button>
                      </div>
                    </div>

                    {/* Failure Analysis */}
                    {barrier.status !== 'Present' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">How did it fail?</label>
                          <textarea
                            value={barrier.failureMode}
                            onChange={(e) => {
                              const newCategories = [...investigation.barrierCategories];
                              const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                              newCategories[categoryIndex].barriers[barrierIndex].failureMode = e.target.value;
                              setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                            }}
                            placeholder="Describe the failure mode..."
                            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Why did it fail?</label>
                          <textarea
                            value={barrier.failureReason}
                            onChange={(e) => {
                              const newCategories = [...investigation.barrierCategories];
                              const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                              newCategories[categoryIndex].barriers[barrierIndex].failureReason = e.target.value;
                              setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                            }}
                            placeholder="Explain the root cause of failure..."
                            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    )}

                    {/* Quick Action Creation */}
                    {barrier.status !== 'Present' && barrier.description && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-amber-800">
                              <strong>Barrier requires action:</strong> This {barrier.status.toLowerCase()} barrier needs corrective action.
                            </p>
                          </div>
                          <button
                            onClick={() => createActionForBarrier(barrier, category.name)}
                            className="bg-amber-600 text-white px-3 py-1 rounded-md hover:bg-amber-700 transition-colors text-sm"
                          >
                            ⚡ Create Action
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Remove Barrier Button */}
                    <div className="mt-4 text-right">
                      <button
                        onClick={() => {
                          const newCategories = [...investigation.barrierCategories];
                          const categoryIndex = newCategories.findIndex(c => c.id === category.id);
                          newCategories[categoryIndex].barriers = newCategories[categoryIndex].barriers.filter(b => b.id !== barrier.id);
                          setInvestigation(prev => ({ ...prev, barrierCategories: newCategories }));
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove Barrier
                      </button>
                    </div>
                  </div>
                ))}

                {category.barriers.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No barriers added yet. Click "Add Barrier" to start identifying barriers for this category.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Summary */}
        {investigation.barrierCategories.some(category =>
          category.barriers.some(barrier => barrier.status !== 'Present')
        ) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">Barrier Analysis Summary</h3>
            <div className="text-sm text-green-800 space-y-2">
              {investigation.barrierCategories.map(category => {
                const failedBarriers = category.barriers.filter(barrier => barrier.status !== 'Present');
                return failedBarriers.length > 0 && (
                  <p key={category.id}>
                    <strong>{category.name}:</strong> {failedBarriers.length} barrier(s) failed or missing
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {/* ACTIONS AND CORRECTIONS SECTION - Integrated */}
        <div id="actions-section" className="border-t-4 border-purple-600 bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              ✅
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Actions & Corrections</h2>
              <p className="text-gray-600 mt-1">Define corrective and preventive actions based on barrier failure analysis</p>
            </div>
          </div>

          {/* Action Creation Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Action</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action Title</label>
                <input
                  type="text"
                  value={newAction.title}
                  onChange={(e) => setNewAction(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter action title..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                <select
                  value={newAction.actionType}
                  onChange={(e) => setNewAction(prev => ({ ...prev, actionType: e.target.value as any }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="corrective">Corrective Action</option>
                  <option value="preventive">Preventive Action</option>
                  <option value="immediate">Immediate Action</option>
                  <option value="long-term">Long-term Action</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newAction.priority}
                  onChange={(e) => setNewAction(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <input
                  type="text"
                  value={newAction.assignedTo}
                  onChange={(e) => setNewAction(prev => ({ ...prev, assignedTo: e.target.value }))}
                  placeholder="Person or team responsible (optional)"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newAction.description}
                onChange={(e) => setNewAction(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the action required..."
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={3}
              />
            </div>

            {newAction.linkedBarrierId && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  🔗 This action is linked to a specific barrier failure and will help address the identified weakness.
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleCreateAction}
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                ✅ Create Action
              </button>
              {newAction.linkedBarrierId && (
                <button
                  onClick={() => setNewAction({
                    title: '',
                    description: '',
                    actionType: 'corrective',
                    priority: 'medium',
                    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    assignedTo: '',
                    linkedBarrierId: null
                  })}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Clear Form
                </button>
              )}
            </div>
          </div>

          {/* Actions List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Investigation Actions</h3>
            <div className="border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Created Actions</span>
                  <span className="text-sm text-gray-500">{actions.length} action(s)</span>
                </div>
              </div>
              <div className="p-4">
                {actions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No actions created yet. Use the form above to create actions based on your barrier failure analysis.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {actions.map((action, index) => (
                      <div key={action.actionId || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900">{action.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                action.actionType === 'immediate' ? 'bg-red-100 text-red-800' :
                                action.actionType === 'corrective' ? 'bg-orange-100 text-orange-800' :
                                action.actionType === 'preventive' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {action.actionType}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                action.priority === 'high' ? 'bg-red-100 text-red-800' :
                                action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {action.priority} priority
                              </span>
                              <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                              {action.assignedTo && <span>Assigned: {action.assignedTo}</span>}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            action.status === 'completed' ? 'bg-green-100 text-green-800' :
                            action.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            action.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {action.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Summary */}
          {actions.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Action Summary</h4>
              <div className="text-sm text-green-800 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <span className="font-medium">Total Actions:</span> {actions.length}
                </div>
                <div>
                  <span className="font-medium">High Priority:</span> {actions.filter(a => a.priority === 'high').length}
                </div>
                <div>
                  <span className="font-medium">Corrective:</span> {actions.filter(a => a.actionType === 'corrective').length}
                </div>
                <div>
                  <span className="font-medium">Pending:</span> {actions.filter(a => a.status === 'pending').length}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEvidenceManagementTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Evidence Management</h2>
        <p className="text-gray-600 mt-1">Collect and organise supporting evidence for each Why level</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evidence Collection */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Evidence Upload</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-4">
              <label className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">Upload files</span>
                <input type="file" className="sr-only" multiple />
              </label>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
            </div>
          </div>

          <div className="mt-4">
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              📷 Take Photo Evidence
            </button>
          </div>
        </div>

        {/* Evidence Summary */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Evidence by Barrier Category</h3>
          <div className="space-y-3">
            {investigation.barrierCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{category.name} Barriers</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {category.barriers.reduce((sum, barrier) => sum + barrier.evidence.length, 0)} evidence items
                    </span>
                    <span className="text-sm text-gray-500">
                      {category.barriers.reduce((sum, barrier) => sum + barrier.attachments.length, 0)} attachments
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {category.barriers.length} barrier{category.barriers.length !== 1 ? 's' : ''} identified
                </div>

                {/* Category-specific attachment upload */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Upload attachments for {category.name.toLowerCase()} barriers (optional):
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer flex-1">
                      <div className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors text-center">
                        <svg className="w-4 h-4 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <span className="text-xs text-gray-600">Browse files</span>
                      </div>
                      <input
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => {
                          // Handle file upload for specific category
                          const files = Array.from(e.target.files || []);
                          if (files.length > 0) {
                            // In a real app, this would upload the files and update the investigation state
                            console.log(`Uploading ${files.length} files for ${category.name} barriers`);
                          }
                        }}
                      />
                    </label>
                    <button
                      className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-xs"
                      title="Take photo for this barrier category"
                    >
                      📱 Photo
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports: Photos, documents, procedures, certificates
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Repository */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Evidence Repository</h3>
        <div className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">All Evidence & Attachments</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {investigation.barrierCategories.reduce((sum, category) =>
                    sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.evidence.length, 0), 0)} evidence items
                </span>
                <span className="text-sm text-gray-500">
                  {investigation.barrierCategories.reduce((sum, category) =>
                    sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.attachments.length, 0), 0)} attachments
                </span>
              </div>
            </div>
          </div>
          <div className="p-4">
            {investigation.barrierCategories.reduce((sum, category) =>
              sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.evidence.length + barrier.attachments.length, 0), 0) === 0 ? (
              <p className="text-gray-500 text-center py-8">No evidence or attachments collected yet. Use the upload areas above to add supporting documentation.</p>
            ) : (
              <div className="space-y-2">
                {investigation.barrierCategories.map((category) =>
                  category.barriers.map((barrier) =>
                    barrier.attachments.map((attachment, index) => (
                      <div key={`${barrier.id}-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            category.name === 'Physical' ? 'bg-blue-600' :
                            category.name === 'Administrative' ? 'bg-green-600' :
                            category.name === 'Human' ? 'bg-orange-600' : 'bg-purple-600'
                          }`}></span>
                          <span className="text-sm font-medium">{attachment.name || `Attachment ${index + 1}`}</span>
                          <span className="text-xs text-gray-500">({category.name})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="text-xs text-blue-600 hover:text-blue-700">View</button>
                          <button className="text-xs text-red-600 hover:text-red-700">Remove</button>
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRelatedRecordsTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Related Records Integration</h2>
        <p className="text-gray-600 mt-1">Connect investigation with existing risk assessments, training, and procedures</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Links to Related Modules */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Related Module Access</h3>
          <div className="space-y-3">
            {
              [
                { name: 'Risk Assessments', icon: '⚠️', description: 'View current risk assessments', href: '/risk-assessments' },
                { name: 'Training Records', icon: '🎓', description: 'Check personnel competency', href: '/training' },
                { name: 'Safe Systems of Work', icon: '📋', description: 'Review procedures and method statements', href: '/safe-systems' },
                { name: 'Behaviour Observations', icon: '👁️', description: 'Check safety walks and observations', href: '/incidents/behaviour' },
                { name: 'Documentation', icon: '📚', description: 'Access policies and procedures', href: '/documents' }
              ].map((module) => (
                <Link
                  key={module.name}
                  href={module.href}
                  className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{module.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{module.name}</div>
                      <div className="text-sm text-gray-600">{module.description}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>

        {/* Linked Records Summary */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Linked Records</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-gray-500 text-center py-8">No records linked yet. Use the module links to find and connect relevant records.</p>
          </div>

          <div className="mt-4">
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              🔗 Link Existing Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  // Summary Document Generator Functions
  const generateSummaryContent = (template: 'standard' | 'safety' | 'quality' | 'brief') => {
    const failedBarriers = investigation.barrierCategories.reduce((sum, category) =>
      sum + category.barriers.filter(barrier => barrier.status !== 'Present').length, 0);
    const totalBarriers = investigation.barrierCategories.reduce((sum, category) => sum + category.barriers.length, 0);
    const correctiveActions = actions.filter(action => action.actionType === 'corrective').length;
    const preventiveActions = actions.filter(action => action.actionType === 'preventive').length;

    const baseTitle = investigation.prePopulatedData?.incidentType
      ? `${investigation.prePopulatedData.incidentType} Investigation Summary`
      : 'Investigation Summary Report';

    const incidentDetails = investigation.prePopulatedData ? `
**Incident Details:**
- Date: ${new Date(investigation.prePopulatedData.incidentDate || '').toLocaleDateString()}
- Location: ${investigation.prePopulatedData.location || 'Not specified'}
- Severity: ${investigation.prePopulatedData.severity || 'Not specified'}
- Reporter: ${investigation.prePopulatedData.originalReporter || 'Not specified'}
${investigation.prePopulatedData.peopleInvolved?.length ? `- People Involved: ${investigation.prePopulatedData.peopleInvolved.length} person(s)` : ''}
` : '';

    const barrierAnalysis = investigation.barrierCategories.map(category => {
      const categoryFailures = category.barriers.filter(barrier => barrier.status !== 'Present');
      if (categoryFailures.length === 0) return '';

      return `
**${category.name} Barriers:**
${categoryFailures.map(barrier => `
- **${barrier.description}**: ${barrier.status}
  - Expected Function: ${barrier.expectedFunction}
  - Failure Mode: ${barrier.failureMode}
  - Root Cause: ${barrier.failureReason}
  - Effectiveness Rating: ${barrier.effectivenessRating}/5
`).join('')}`;
    }).filter(content => content.length > 0).join('\n');

    const actionsList = actions.length > 0 ? `
**Corrective and Preventive Actions:**
${actions.map((action, index) => `
${index + 1}. **${action.title}** (${action.actionType})
   - Description: ${action.description}
   - Priority: ${action.priority}
   - Due Date: ${new Date(action.dueDate).toLocaleDateString()}
   ${action.assignedTo ? `- Assigned To: ${action.assignedTo}` : ''}
   - Status: ${action.status}
`).join('')}` : '';

    const learningPoints = failedBarriers > 0 ? `
**Key Learning Points:**
- ${failedBarriers} out of ${totalBarriers} identified barriers failed or were inadequate
- Primary failure modes centered around ${investigation.barrierCategories
  .filter(cat => cat.barriers.some(b => b.status !== 'Present'))
  .map(cat => cat.name.toLowerCase()).join(', ')} controls
- Investigation quality score: ${investigation.qualityScore}% (Grade ${getQualityGrade(investigation.qualityScore).grade})
- ${correctiveActions} corrective action(s) and ${preventiveActions} preventive action(s) identified
` : '';

    const preventionMeasures = `
**Prevention Measures:**
- Implementation of identified corrective actions
- Enhanced barrier effectiveness monitoring
- Regular review of ${investigation.barrierCategories.map(cat => cat.name.toLowerCase()).join(', ')} controls
- Stakeholder awareness and training updates
`;

    switch (template) {
      case 'standard':
        return {
          title: baseTitle,
          content: `# ${baseTitle}

**Investigation Overview:**
${investigation.problemStatement}

**Investigation Team:** ${investigation.investigationTeam.join(', ') || 'Not assigned'}
**Investigation Period:** ${investigation.timeline.start.toLocaleDateString()} - ${investigation.timeline.target.toLocaleDateString()}
**Quality Score:** ${investigation.qualityScore}% (Grade ${getQualityGrade(investigation.qualityScore).grade})

${incidentDetails}

## Barrier Analysis Summary

${barrierAnalysis}

${actionsList}

${learningPoints}

${preventionMeasures}

**Document Generated:** ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
**Generated by:** V7 Portal Investigation System`
        };

      case 'safety':
        return {
          title: `Safety Alert: ${baseTitle}`,
          content: `# SAFETY ALERT: ${baseTitle}

**IMMEDIATE ATTENTION REQUIRED**

## What Happened
${investigation.problemStatement}

${incidentDetails}

## Safety Barriers That Failed
${barrierAnalysis}

## Immediate Actions Required
${actions.filter(action => action.actionType === 'immediate' || action.priority === 'high').map((action, index) => `
${index + 1}. **${action.title}**
   - ${action.description}
   - Due: ${new Date(action.dueDate).toLocaleDateString()}
   ${action.assignedTo ? `- Responsible: ${action.assignedTo}` : ''}
`).join('')}

## Lessons Learned
${learningPoints}

**This safety alert must be acknowledged by all personnel in affected areas.**

**Investigation Quality:** ${investigation.qualityScore}% | **Generated:** ${new Date().toLocaleDateString()}`
        };

      case 'quality':
        return {
          title: `Quality Investigation Report: ${baseTitle}`,
          content: `# Quality Investigation Report
## ${baseTitle}

### Executive Summary
${investigation.problemStatement}

### Investigation Methodology
- **Approach:** Systematic Barrier Analysis
- **Team:** ${investigation.investigationTeam.join(', ') || 'Not assigned'}
- **Quality Score:** ${investigation.qualityScore}% (Grade ${getQualityGrade(investigation.qualityScore).grade})
- **Evidence Items:** ${investigation.barrierCategories.reduce((sum, category) =>
  sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.evidence.length, 0), 0) + (investigation.prePopulatedData?.initialEvidence?.length || 0)}

${incidentDetails}

### Detailed Barrier Analysis
${barrierAnalysis}

### Systematic Actions
${actionsList}

### Quality Metrics
- **Barriers Identified:** ${totalBarriers}
- **Barrier Failures:** ${failedBarriers}
- **Action Coverage:** ${actions.length} actions created
- **Investigation Completeness:** ${investigation.qualityScore}%

### Recommendations
${preventionMeasures}

---
**Document Control**
- Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
- System: V7 Portal Investigation Module
- Quality Grade: ${getQualityGrade(investigation.qualityScore).grade}`
        };

      case 'brief':
        return {
          title: `Brief: ${baseTitle}`,
          content: `# ${baseTitle} - Brief

**What:** ${investigation.problemStatement}

**When:** ${investigation.prePopulatedData?.incidentDate ? new Date(investigation.prePopulatedData.incidentDate).toLocaleDateString() : 'Investigation period: ' + investigation.timeline.start.toLocaleDateString() + ' - ' + investigation.timeline.target.toLocaleDateString()}

**Where:** ${investigation.prePopulatedData?.location || 'Location to be specified'}

**Key Failures:** ${failedBarriers} barriers failed - primarily ${investigation.barrierCategories
  .filter(cat => cat.barriers.some(b => b.status !== 'Present'))
  .map(cat => cat.name.toLowerCase()).join(', ')} controls

**Actions:** ${actions.length} actions created (${correctiveActions} corrective, ${preventiveActions} preventive)

**Quality:** ${investigation.qualityScore}% (Grade ${getQualityGrade(investigation.qualityScore).grade})

**High Priority Actions:**
${actions.filter(action => action.priority === 'high').map((action, index) => `
${index + 1}. ${action.title} - Due: ${new Date(action.dueDate).toLocaleDateString()}
`).join('')}

Generated: ${new Date().toLocaleDateString()}`
        };

      default:
        return { title: baseTitle, content: '' };
    }
  };

  const handleGenerateSummary = async () => {
    if (!investigationId) {
      alert('Please save the investigation first before generating summary');
      return;
    }

    setSummaryDocument(prev => ({ ...prev, isGenerating: true }));

    try {
      // Simulate generation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { title, content } = generateSummaryContent(summaryDocument.template);

      setSummaryDocument(prev => ({
        ...prev,
        title,
        content,
        isGenerating: false,
        lastGenerated: new Date(),
        isEditing: false
      }));

    } catch (error) {
      console.error('Summary generation failed:', error);
      alert('Failed to generate summary. Please try again.');
      setSummaryDocument(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const handleDistributeDocument = async () => {
    if (!summaryDocument.content || summaryDocument.selectedEmployees.length === 0) {
      alert('Please generate document content and select employees for distribution');
      return;
    }

    try {
      // Simulate document distribution
      const totalEmployees = summaryDocument.selectedEmployees.length +
        summaryDocument.distributionGroups.reduce((sum, group) => sum + 5, 0); // Assume 5 people per group

      setSummaryDocument(prev => ({
        ...prev,
        documentId: `DOC-${Date.now()}`
      }));

      setDistributionTracking({
        totalSent: totalEmployees,
        acknowledged: 0,
        pending: totalEmployees,
        overdue: 0
      });

      alert(`Document distributed to ${totalEmployees} recipients. Tracking dashboard updated.`);

    } catch (error) {
      console.error('Distribution failed:', error);
      alert('Failed to distribute document. Please try again.');
    }
  };

  const renderApprovalsTab = () => (
    <div className="space-y-8">
      {/* Investigation Status and Approval Workflow - Existing Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">Investigation Approvals & Sign-off</h2>
          <p className="text-gray-600 mt-1">Investigation review and formal approval process</p>
        </div>

        {/* Investigation Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Current Status</h3>
              <p className="text-blue-800 capitalize">{investigation.status}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-600">Quality Score</div>
              <div className={`text-2xl font-bold ${getQualityGrade(investigation.qualityScore).color}`}>
                {investigation.qualityScore}% ({getQualityGrade(investigation.qualityScore).grade})
              </div>
            </div>
          </div>
        </div>

        {/* Approval Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Approval Workflow</h3>
            <div className="space-y-4">
              {
                [
                  { level: 'Supervisor Review', status: 'pending', user: 'Pending Assignment' },
                  { level: 'Manager Approval', status: 'pending', user: 'Pending Assignment' },
                  { level: 'Senior Management', status: 'pending', user: 'Pending Assignment' },
                  { level: 'Final Sign-off', status: 'pending', user: 'Pending Assignment' }
                ].map((approval, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      approval.status === 'completed' ? 'bg-green-600' :
                      approval.status === 'pending' ? 'bg-gray-400' : 'bg-yellow-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900">{approval.level}</div>
                      <div className="text-sm text-gray-600">{approval.user}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      approval.status === 'completed' ? 'bg-green-100 text-green-800' :
                      approval.status === 'pending' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {approval.status}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Sign-off Actions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Investigation Actions</h3>
            <div className="space-y-3">
              <button
                onClick={async () => {
                  if (investigationId && investigation.qualityScore >= 60) {
                    try {
                      await investigationService.submitForReview(investigationId, investigation.qualityScore);
                      setInvestigation(prev => ({ ...prev, status: 'review' }));
                      alert('Investigation submitted for review successfully!');
                    } catch (error) {
                      console.error('Submit for review failed:', error);
                      alert('Failed to submit investigation for review. Please try again.');
                    }
                  } else if (!investigationId) {
                    alert('Please save the investigation first before submitting for review');
                  }
                }}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={investigation.qualityScore < 60 || !investigationId}
              >
                📝 Submit for Review
              </button>
              <button
                onClick={async () => {
                  await saveInvestigation();
                  setInvestigation(prev => ({ ...prev, status: 'draft' }));
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                💾 Save as Draft
              </button>
              <button
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
              >
                🔄 Request Review
              </button>
            </div>

            {investigation.qualityScore < 60 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  Investigation quality score must be at least 60% (Grade C) before submission for review.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Document Generator - New Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              📄
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Summary Document Generator</h2>
              <p className="text-gray-600 mt-1">Generate professional investigation summaries for distribution and learning</p>
            </div>
          </div>
        </div>

        {/* Document Generation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection and Generation */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Generation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Template</label>
                <select
                  value={summaryDocument.template}
                  onChange={(e) => setSummaryDocument(prev => ({
                    ...prev,
                    template: e.target.value as 'standard' | 'safety' | 'quality' | 'brief'
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="standard">Standard Investigation Report</option>
                  <option value="safety">Safety Alert Document</option>
                  <option value="quality">Quality Investigation Report</option>
                  <option value="brief">Executive Brief</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {summaryDocument.template === 'standard' && 'Comprehensive report with full barrier analysis and actions'}
                  {summaryDocument.template === 'safety' && 'Safety-focused alert for immediate distribution'}
                  {summaryDocument.template === 'quality' && 'Detailed quality analysis with metrics'}
                  {summaryDocument.template === 'brief' && 'Concise executive summary format'}
                </p>
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={summaryDocument.isGenerating || !investigationId}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {summaryDocument.isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    ⚡ Generate Summary Document
                  </>
                )}
              </button>

              {summaryDocument.lastGenerated && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ Document generated: {summaryDocument.lastGenerated.toLocaleTimeString()}
                  </p>
                </div>
              )}

              {!investigationId && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Please save the investigation first before generating summary documents.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Employee Distribution */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Employees</label>
                <div className="border border-gray-300 rounded-md p-3 max-h-32 overflow-y-auto">
                  {['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emma Davis', 'Tom Brown'].map((employee) => (
                    <label key={employee} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={summaryDocument.selectedEmployees.includes(employee)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSummaryDocument(prev => ({
                              ...prev,
                              selectedEmployees: [...prev.selectedEmployees, employee]
                            }));
                          } else {
                            setSummaryDocument(prev => ({
                              ...prev,
                              selectedEmployees: prev.selectedEmployees.filter(emp => emp !== employee)
                            }));
                          }
                        }}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{employee}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Groups</label>
                <div className="space-y-2">
                  {['Safety Team', 'Management', 'Operations', 'All Staff'].map((group) => (
                    <label key={group} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={summaryDocument.distributionGroups.includes(group)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSummaryDocument(prev => ({
                              ...prev,
                              distributionGroups: [...prev.distributionGroups, group]
                            }));
                          } else {
                            setSummaryDocument(prev => ({
                              ...prev,
                              distributionGroups: prev.distributionGroups.filter(grp => grp !== group)
                            }));
                          }
                        }}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{group}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="acknowledgmentRequired"
                  checked={summaryDocument.acknowledgmentRequired}
                  onChange={(e) => setSummaryDocument(prev => ({
                    ...prev,
                    acknowledgmentRequired: e.target.checked
                  }))}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="acknowledgmentRequired" className="text-sm text-gray-700">
                  Require acknowledgment from recipients
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Document Preview and Editing */}
        {summaryDocument.content && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Document Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSummaryDocument(prev => ({ ...prev, isEditing: !prev.isEditing }))}
                  className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors text-sm"
                >
                  {summaryDocument.isEditing ? '👁️ Preview' : '✏️ Edit'}
                </button>
                <button
                  onClick={() => setShowSummaryPreview(!showSummaryPreview)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  {showSummaryPreview ? 'Hide' : 'Show'} Full Preview
                </button>
              </div>
            </div>

            {showSummaryPreview && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                {summaryDocument.isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={summaryDocument.title}
                      onChange={(e) => setSummaryDocument(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Document title..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
                    />
                    <textarea
                      value={summaryDocument.content}
                      onChange={(e) => setSummaryDocument(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Document content (supports Markdown formatting)..."
                      className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                      rows={15}
                    />
                    <p className="text-xs text-gray-500">
                      Edit content directly. Supports Markdown formatting for professional output.
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div
                      className="whitespace-pre-wrap text-sm text-gray-800"
                      dangerouslySetInnerHTML={{
                        __html: summaryDocument.content
                          .replace(/\n/g, '<br>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/# (.*?)(<br>|$)/g, '<h1 class="text-xl font-bold text-gray-900 mb-3">$1</h1>')
                          .replace(/## (.*?)(<br>|$)/g, '<h2 class="text-lg font-semibold text-gray-800 mb-2">$2</h2>')
                          .replace(/### (.*?)(<br>|$)/g, '<h3 class="text-md font-medium text-gray-700 mb-2">$1</h3>')
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Distribution and Tracking */}
        {summaryDocument.content && (
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribution Actions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Document Distribution</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleDistributeDocument}
                    disabled={summaryDocument.selectedEmployees.length === 0 && summaryDocument.distributionGroups.length === 0}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    📤 Distribute Document
                  </button>
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    💾 Save to Documents Module
                  </button>
                  <button
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    📄 Export as PDF
                  </button>
                </div>

                {(summaryDocument.selectedEmployees.length === 0 && summaryDocument.distributionGroups.length === 0) && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Please select employees or groups for distribution.
                    </p>
                  </div>
                )}
              </div>

              {/* Tracking Dashboard */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution Tracking</h3>
                {distributionTracking.totalSent > 0 ? (
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Total Sent:</span>
                          <span className="ml-2 text-gray-900">{distributionTracking.totalSent}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Acknowledged:</span>
                          <span className="ml-2 text-green-600">{distributionTracking.acknowledged}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Pending:</span>
                          <span className="ml-2 text-yellow-600">{distributionTracking.pending}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Overdue:</span>
                          <span className="ml-2 text-red-600">{distributionTracking.overdue}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${distributionTracking.totalSent > 0 ?
                            (distributionTracking.acknowledged / distributionTracking.totalSent) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      {Math.round(distributionTracking.totalSent > 0 ?
                        (distributionTracking.acknowledged / distributionTracking.totalSent) * 100 : 0)}% acknowledged
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📊</div>
                    <p>Distribution tracking will appear here after document is sent</p>
                  </div>
                )}

                {summaryDocument.documentId && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Document ID:</strong> {summaryDocument.documentId}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Document saved to Documents module and distributed successfully.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Summary Generation Tips */}
        {!summaryDocument.content && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Professional Summary Documents</h4>
            <div className="text-sm text-purple-800 space-y-1">
              <p>• <strong>Auto-Generated Content:</strong> Pulls barrier analysis findings, corrective actions, and investigation details</p>
              <p>• <strong>Multiple Templates:</strong> Choose from standard reports, safety alerts, quality analyses, or executive briefs</p>
              <p>• <strong>Professional Formatting:</strong> Company-branded documents with proper structure and formatting</p>
              <p>• <strong>Distribution Integration:</strong> Send directly to employees and groups through the documents system</p>
              <p>• <strong>Acknowledgment Tracking:</strong> Monitor who has read and acknowledged the investigation summary</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderQualityReviewTab = () => {
    const qualityGrade = getQualityGrade(investigation.qualityScore);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">Quality Review & Scoring</h2>
          <p className="text-gray-600 mt-1">Investigation quality assessment and improvement recommendations</p>
        </div>

        {/* Quality Score Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Overall Quality Score</h3>
                  <p className="text-purple-200">Investigation completeness and quality</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{investigation.qualityScore}%</div>
                  <div className={`text-2xl font-semibold ${qualityGrade.color.replace('text-', 'text-white opacity-')}90`}>
                    Grade {qualityGrade.grade}
                  </div>
                </div>
              </div>
              <div className="w-full bg-purple-400 rounded-full h-3 mt-4">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${investigation.qualityScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Quality Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Completeness</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between">
                  <span>Evidence Quality</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeliness</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="flex justify-between">
                  <span>Process</span>
                  <span className="font-medium">70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Breakdown</h3>
            <div className="space-y-4">
              {
                [
                  {
                    category: 'Problem Definition',
                    score: investigation.problemStatement.length > 50 ? 10 : investigation.problemStatement.length > 20 ? 5 : 0,
                    maxScore: 10,
                    description: 'Clear problem statement'
                  },
                  {
                    category: 'Barrier Analysis Completeness',
                    score: Math.round((investigation.barrierCategories.reduce((sum, category) =>
                      sum + category.barriers.filter(barrier =>
                        barrier.status !== 'Present' || barrier.failureMode.length > 0
                      ).length, 0) / Math.max(investigation.barrierCategories.reduce((sum, category) =>
                        sum + category.barriers.length, 0), 1)) * 20) +
                      Math.round((investigation.barrierCategories.reduce((sum, category) =>
                        sum + category.barriers.filter(barrier =>
                          barrier.failureMode.length > 20 && barrier.failureReason.length > 20
                        ).length, 0) / Math.max(investigation.barrierCategories.reduce((sum, category) =>
                          sum + category.barriers.length, 0), 1)) * 20),
                    maxScore: 40,
                    description: 'Comprehensive barrier identification and failure analysis'
                  },
                  {
                    category: 'Corrective Actions',
                    score: (() => {
                      const failedBarriers = investigation.barrierCategories.reduce((sum, category) =>
                        sum + category.barriers.filter(barrier => barrier.status !== 'Present').length, 0);
                      if (failedBarriers > 0) {
                        const actionCoverage = Math.min(actions.length / failedBarriers, 1);
                        return Math.round(actionCoverage * 10);
                      } else if (actions.length > 0) {
                        return 5;
                      }
                      return 0;
                    })(),
                    maxScore: 10,
                    description: 'Actions created to address failed barriers and prevent recurrence'
                  },
                  {
                    category: 'Team Assignment',
                    score: investigation.investigationTeam.length > 2 ? 15 : investigation.investigationTeam.length > 0 ? 10 : 0,
                    maxScore: 15,
                    description: 'Appropriate team involvement'
                  },
                  {
                    category: 'Evidence Collection',
                    score: Math.min((investigation.barrierCategories.reduce((sum, category) =>
                      sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.evidence.length, 0), 0) +
                      (investigation.prePopulatedData?.initialEvidence?.length || 0)) * 2, 15),
                    maxScore: 15,
                    description: 'Supporting evidence gathered for barriers (including incident attachments)'
                  },
                  {
                    category: 'Stakeholder Involvement',
                    score: investigation.stakeholders.length > 2 ? 10 : investigation.stakeholders.length > 0 ? 5 : 0,
                    maxScore: 10,
                    description: 'Key stakeholders identified and involved'
                  }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm font-semibold">{item.score}/{item.maxScore}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          item.score / item.maxScore >= 0.8 ? 'bg-green-500' :
                          item.score / item.maxScore >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Improvement Recommendations */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Improvement Recommendations</h3>
            <div className="space-y-3">
              {/* Show incident data bonus */}
              {investigation.dataSource === 'incident' && investigation.prePopulatedData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-900">Investigation Foundation</h4>
                  <p className="text-sm text-green-800 mt-1">Your investigation benefits from comprehensive incident data (+5% quality bonus), providing a strong foundation for analysis.</p>
                </div>
              )}

              {investigation.problemStatement.length < 50 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-900">Expand Problem Statement</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    {investigation.dataSource === 'incident'
                      ? 'Enhance the auto-generated problem statement with additional details for better investigation focus.'
                      : 'Provide a more detailed description of what happened to improve investigation focus.'}
                  </p>
                </div>
              )}

              {investigation.barrierCategories.reduce((sum, category) => sum + category.barriers.length, 0) < 8 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900">Identify More Barriers</h4>
                  <p className="text-sm text-blue-800 mt-1">Consider identifying additional barriers across all four categories for comprehensive analysis.</p>
                </div>
              )}

              {investigation.barrierCategories.some(category =>
                category.barriers.some(barrier =>
                  barrier.status !== 'Present' && (barrier.failureMode.length < 20 || barrier.failureReason.length < 20)
                )
              ) && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <h4 className="font-medium text-orange-900">Complete Failure Analysis</h4>
                  <p className="text-sm text-orange-800 mt-1">Provide detailed failure mode and reason analysis for all failed barriers.</p>
                </div>
              )}

              {investigation.investigationTeam.length === 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="font-medium text-red-900">Assign Investigation Team</h4>
                  <p className="text-sm text-red-800 mt-1">Add team members to ensure comprehensive investigation coverage.</p>
                </div>
              )}

              {(investigation.barrierCategories.reduce((sum, category) =>
                sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.evidence.length, 0), 0) +
                (investigation.prePopulatedData?.initialEvidence?.length || 0)) === 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <h4 className="font-medium text-purple-900">Collect Evidence</h4>
                  <p className="text-sm text-purple-800 mt-1">
                    {investigation.dataSource === 'incident'
                      ? 'Build upon the initial evidence from the incident report by gathering additional barrier-specific evidence.'
                      : 'Gather supporting evidence for each barrier to validate your failure analysis.'}
                  </p>
                </div>
              )}

              {(() => {
                const failedBarriers = investigation.barrierCategories.reduce((sum, category) =>
                  sum + category.barriers.filter(barrier => barrier.status !== 'Present').length, 0);
                return failedBarriers > 0 && actions.length === 0;
              })() && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="font-medium text-red-900">Create Corrective Actions</h4>
                  <p className="text-sm text-red-800 mt-1">
                    You have identified failed barriers but haven't created any corrective actions. Use the quick-action buttons or the actions form to address these failures.
                  </p>
                </div>
              )}

              {(() => {
                const failedBarriers = investigation.barrierCategories.reduce((sum, category) =>
                  sum + category.barriers.filter(barrier => barrier.status !== 'Present').length, 0);
                return failedBarriers > 0 && actions.length > 0 && actions.length < failedBarriers;
              })() && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-900">More Actions Recommended</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    Consider creating additional actions to address all failed barriers. You have {actions.length} action(s) for {(() => {
                      const failedBarriers = investigation.barrierCategories.reduce((sum, category) =>
                        sum + category.barriers.filter(barrier => barrier.status !== 'Present').length, 0);
                      return failedBarriers;
                    })()} failed barrier(s).
                  </p>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-900">Investigation Standards</h4>
                <p className="text-sm text-green-800 mt-1">
                  Your barrier analysis investigation meets international standards when you achieve Grade B (75%) or higher.
                  {investigation.dataSource === 'incident' && ' The incident data foundation gives you a head start towards this goal.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8 lg:px-12 xl:px-16">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {loadingIncidentData ? 'Loading incident data for investigation...' : 'Loading investigation...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-4">
            <Link href="/incidents/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
              Incident Management
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              Barrier Analysis Investigation
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Barrier Analysis Investigation</h1>
              <p className="text-gray-600 mt-1">Systematic barrier identification and failure analysis with evidence collection</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Save Status */}
              <div className="flex items-center gap-2 text-sm">
                {saving ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>Saving...</span>
                  </div>
                ) : lastSaved ? (
                  <span className="text-green-600">
                    Saved {lastSaved.toLocaleTimeString()}
                  </span>
                ) : (
                  <span className="text-gray-500">Unsaved changes</span>
                )}
              </div>

              {/* Manual Save Button */}
              <button
                onClick={saveInvestigation}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                💾 {saving ? 'Saving...' : 'Save'}
              </button>

              {/* Quality Score Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Quality:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getQualityGrade(investigation.qualityScore).color.replace('text-', 'bg-').replace('-600', '-100')} ${getQualityGrade(investigation.qualityScore).color}`}>
                  {investigation.qualityScore}% ({getQualityGrade(investigation.qualityScore).grade})
                </span>
              </div>

              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                investigation.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                investigation.status === 'active' ? 'bg-blue-100 text-blue-800' :
                investigation.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                investigation.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {investigation.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 lg:px-12 xl:px-16">
          <div className="flex space-x-8 overflow-x-auto" role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as InvestigationTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  <div>
                    <div className="font-semibold">{tab.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{tab.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16">
        {renderTabContent()}
      </div>
    </div>
  );
}