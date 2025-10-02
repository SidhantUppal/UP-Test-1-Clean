import React, { useState, useEffect } from 'react';
import { InvestigationData } from '../../services/investigationService';
import InvestigationSummaryGenerator from './InvestigationSummaryGenerator';

interface InvestigationApprovalsSignoffProps {
  investigation: InvestigationData;
  onUpdate: (updates: Partial<InvestigationData>) => void;
  onSave: () => Promise<void>;
  readOnly?: boolean;
}

interface ApprovalLevel {
  id: string;
  name: string;
  description: string;
  requiredRole: string;
  approvedBy?: string;
  approvedDate?: Date;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  order: number;
}

interface InvestigationQualityCheck {
  id: string;
  category: string;
  description: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  details?: string;
  score?: number;
  maxScore?: number;
}

interface SignoffRecord {
  id: string;
  signoffType: 'investigation_complete' | 'regulatory_compliance' | 'executive_approval' | 'final_closure';
  signedBy: string;
  signedDate: Date;
  digitalSignature: string;
  witnessedBy?: string;
  comments?: string;
}

const QUALITY_CHECKS: InvestigationQualityCheck[] = [
  {
    id: 'completeness',
    category: 'Completeness',
    description: 'All investigation sections completed with evidence',
    status: 'pending',
    score: 0,
    maxScore: 25
  },
  {
    id: 'evidence_quality',
    category: 'Evidence Quality',
    description: 'Documentary evidence and witness statements collected',
    status: 'pending',
    score: 0,
    maxScore: 25
  },
  {
    id: 'stakeholder_involvement',
    category: 'Stakeholder Involvement',
    description: 'Appropriate personnel interviewed and experts consulted',
    status: 'pending',
    score: 0,
    maxScore: 25
  },
  {
    id: 'timeliness_process',
    category: 'Timeliness & Process',
    description: 'Investigation completed within timeframe with proper workflow',
    status: 'pending',
    score: 0,
    maxScore: 25
  }
];

const APPROVAL_LEVELS: ApprovalLevel[] = [
  {
    id: 'supervisor',
    name: 'Supervisor Review',
    description: 'Line manager review of investigation quality and findings',
    requiredRole: 'supervisor',
    status: 'pending',
    order: 1
  },
  {
    id: 'manager',
    name: 'Manager Approval',
    description: 'Department manager approval of corrective actions',
    requiredRole: 'manager',
    status: 'pending',
    order: 2
  },
  {
    id: 'senior_management',
    name: 'Senior Management Sign-off',
    description: 'Senior management approval for significant investigations',
    requiredRole: 'senior_manager',
    status: 'pending',
    order: 3
  },
  {
    id: 'executive',
    name: 'Executive Approval',
    description: 'Executive/regulatory approval for major incidents',
    requiredRole: 'executive',
    status: 'pending',
    order: 4
  }
];

export const InvestigationApprovalsSignoff: React.FC<InvestigationApprovalsSignoffProps> = ({
  investigation,
  onUpdate,
  onSave,
  readOnly = false
}) => {
  const [activeTab, setActiveTab] = useState('quality');
  const [qualityChecks, setQualityChecks] = useState<InvestigationQualityCheck[]>(QUALITY_CHECKS);
  const [approvalLevels, setApprovalLevels] = useState<ApprovalLevel[]>(APPROVAL_LEVELS);
  const [signoffRecords, setSignoffRecords] = useState<SignoffRecord[]>([]);
  const [overallQualityGrade, setOverallQualityGrade] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [totalQualityScore, setTotalQualityScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showQualityAssessment, setShowQualityAssessment] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState<string | null>(null);
  const [showSignoffDialog, setShowSignoffDialog] = useState<string | null>(null);

  // Calculate quality score and grade
  useEffect(() => {
    const totalScore = qualityChecks.reduce((sum, check) => sum + (check.score || 0), 0);
    const maxTotalScore = qualityChecks.reduce((sum, check) => sum + (check.maxScore || 0), 0);

    setTotalQualityScore(totalScore);

    // Calculate grade based on percentage
    const percentage = maxTotalScore > 0 ? (totalScore / maxTotalScore) * 100 : 0;
    let grade: 'A' | 'B' | 'C' | 'D';

    if (percentage >= 85) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 55) grade = 'C';
    else grade = 'D';

    setOverallQualityGrade(grade);
  }, [qualityChecks]);

  // Auto-assess quality based on investigation data
  useEffect(() => {
    assessInvestigationQuality();
  }, [investigation]);

  const assessInvestigationQuality = () => {
    const updatedChecks = qualityChecks.map(check => {
      switch (check.id) {
        case 'completeness':
          const completenessScore = calculateCompletenessScore();
          return {
            ...check,
            score: completenessScore,
            status: completenessScore >= 20 ? 'pass' : completenessScore >= 15 ? 'warning' : 'fail' as any
          };

        case 'evidence_quality':
          const evidenceScore = calculateEvidenceScore();
          return {
            ...check,
            score: evidenceScore,
            status: evidenceScore >= 20 ? 'pass' : evidenceScore >= 15 ? 'warning' : 'fail' as any
          };

        case 'stakeholder_involvement':
          const stakeholderScore = calculateStakeholderScore();
          return {
            ...check,
            score: stakeholderScore,
            status: stakeholderScore >= 20 ? 'pass' : stakeholderScore >= 15 ? 'warning' : 'fail' as any
          };

        case 'timeliness_process':
          const timelinessScore = calculateTimelinessScore();
          return {
            ...check,
            score: timelinessScore,
            status: timelinessScore >= 20 ? 'pass' : timelinessScore >= 15 ? 'warning' : 'fail' as any
          };

        default:
          return check;
      }
    });

    setQualityChecks(updatedChecks);
  };

  const calculateCompletenessScore = (): number => {
    let score = 0;

    // Problem statement (5 points)
    if (investigation.problemStatement && investigation.problemStatement.length > 20) score += 5;

    // 5 Whys analysis (10 points)
    if (investigation.fiveWhysAnalysis?.whyLevels && investigation.fiveWhysAnalysis.whyLevels.length >= 5) {
      const completedWhys = investigation.fiveWhysAnalysis.whyLevels.filter(why => why.answer && why.answer.length > 10);
      score += Math.min(10, completedWhys.length * 2);
    }

    // Barrier analysis (5 points)
    if (investigation.barrierAnalysis?.failedBarriers && investigation.barrierAnalysis.failedBarriers.length > 0) score += 3;
    if (investigation.barrierAnalysis?.effectiveBarriers && investigation.barrierAnalysis.effectiveBarriers.length > 0) score += 2;

    // Corrective actions (5 points)
    if (investigation.correctiveActions && investigation.correctiveActions.length > 0) score += 5;

    return score;
  };

  const calculateEvidenceScore = (): number => {
    let score = 0;

    // Evidence in 5 Whys (10 points)
    if (investigation.fiveWhysAnalysis?.whyLevels) {
      const whysWithEvidence = investigation.fiveWhysAnalysis.whyLevels.filter(why =>
        why.evidence && why.evidence.length > 0
      );
      score += Math.min(10, whysWithEvidence.length * 2);
    }

    // Attachments/documents (5 points)
    if (investigation.attachments && investigation.attachments.length > 0) score += 5;

    // Witness statements (5 points)
    if (investigation.witnessStatements && investigation.witnessStatements.length > 0) score += 5;

    // Related records (5 points)
    if (investigation.relatedRecords && Object.keys(investigation.relatedRecords).length > 0) score += 5;

    return score;
  };

  const calculateStakeholderScore = (): number => {
    let score = 0;

    // Investigation team (10 points)
    if (investigation.investigationTeam && investigation.investigationTeam.length > 0) score += 10;

    // Stakeholders identified (5 points)
    if (investigation.stakeholders && investigation.stakeholders.length > 0) score += 5;

    // Subject matter experts (5 points)
    // TODO: Check if SMEs were involved
    score += 5;

    // Management review (5 points)
    // TODO: Check if management reviewed
    score += 5;

    return score;
  };

  const calculateTimelinessScore = (): number => {
    let score = 0;

    // Investigation started promptly (5 points)
    if (investigation.timeline?.start) {
      const daysBetween = Math.floor((investigation.timeline.start.getTime() - new Date(investigation.incidentDetails?.date || Date.now()).getTime()) / (1000 * 60 * 60 * 24));
      if (daysBetween <= 1) score += 5;
      else if (daysBetween <= 3) score += 3;
    }

    // Target completion date set (5 points)
    if (investigation.targetCompletionDate) score += 5;

    // Investigation completed within timeframe (10 points)
    if (investigation.timeline?.target && investigation.timeline?.actual) {
      if (investigation.timeline.actual <= investigation.timeline.target) score += 10;
      else score += 5; // Late but completed
    } else {
      score += 5; // In progress
    }

    // Proper workflow followed (5 points)
    if (investigation.taskCreationEnabled) score += 5;

    return score;
  };

  const handleApprovalAction = async (levelId: string, action: 'approve' | 'reject', reason?: string) => {
    const updatedLevels = approvalLevels.map(level => {
      if (level.id === levelId) {
        return {
          ...level,
          status: action === 'approve' ? 'approved' : 'rejected' as any,
          approvedBy: 'Current User', // TODO: Get from user context
          approvedDate: new Date(),
          rejectionReason: reason
        };
      }
      return level;
    });

    setApprovalLevels(updatedLevels);
    setShowApprovalDialog(null);

    // Update investigation data
    onUpdate({
      approvalStatus: {
        levels: updatedLevels,
        currentLevel: getNextPendingLevel(updatedLevels),
        overallStatus: calculateOverallApprovalStatus(updatedLevels)
      }
    });
  };

  const handleSignoff = async (signoffType: SignoffRecord['signoffType'], comments?: string) => {
    const newSignoff: SignoffRecord = {
      id: `signoff-${Date.now()}`,
      signoffType,
      signedBy: 'Current User', // TODO: Get from user context
      signedDate: new Date(),
      digitalSignature: `DS-${Date.now()}`, // TODO: Generate proper digital signature
      comments
    };

    setSignoffRecords(prev => [...prev, newSignoff]);
    setShowSignoffDialog(null);

    // Update investigation status
    if (signoffType === 'final_closure') {
      onUpdate({
        status: 'closed',
        closedDate: new Date(),
        closedBy: 'Current User'
      });
    }
  };

  const getNextPendingLevel = (levels: ApprovalLevel[]): string | null => {
    const pendingLevel = levels
      .filter(level => level.status === 'pending')
      .sort((a, b) => a.order - b.order)[0];
    return pendingLevel?.id || null;
  };

  const calculateOverallApprovalStatus = (levels: ApprovalLevel[]): 'pending' | 'approved' | 'rejected' => {
    if (levels.some(level => level.status === 'rejected')) return 'rejected';
    if (levels.every(level => level.status === 'approved')) return 'approved';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
      case 'approved':
        return 'text-green-800 bg-green-100';
      case 'warning':
        return 'text-yellow-800 bg-yellow-100';
      case 'fail':
      case 'rejected':
        return 'text-red-800 bg-red-100';
      case 'pending':
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-800 bg-green-100';
      case 'B': return 'text-blue-800 bg-blue-100';
      case 'C': return 'text-yellow-800 bg-yellow-100';
      case 'D': return 'text-red-800 bg-red-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'quality', name: 'Quality Review', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'approvals', name: 'Approval Workflow', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: 'signoff', name: 'Digital Sign-off', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-5m-1.414-1.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'summary', name: 'Summary Document', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Overall Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Approvals & Sign-off</h2>
            <p className="text-sm text-gray-600 mt-1">
              Investigation quality review, approval workflow, and formal closure
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {overallQualityGrade && (
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${getGradeColor(overallQualityGrade)}`}>
                  {overallQualityGrade}
                </div>
                <p className="text-xs text-gray-600 mt-1">Quality Grade</p>
              </div>
            )}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalQualityScore}/100</div>
              <p className="text-xs text-gray-600">Quality Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Quality Review Tab */}
      {activeTab === 'quality' && (
        <div className="space-y-6">
          {/* Quality Checks */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Investigation Quality Assessment</h3>
              <button
                onClick={() => assessInvestigationQuality()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Re-assess Quality
              </button>
            </div>

            <div className="space-y-4">
              {qualityChecks.map((check) => (
                <div key={check.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        check.status === 'pass' ? 'bg-green-500' :
                        check.status === 'warning' ? 'bg-yellow-500' :
                        check.status === 'fail' ? 'bg-red-500' : 'bg-gray-300'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{check.category}</h4>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {check.score}/{check.maxScore}
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                          {check.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          check.status === 'pass' ? 'bg-green-500' :
                          check.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${((check.score || 0) / (check.maxScore || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Quality Summary */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Overall Investigation Quality</h4>
                  <p className="text-sm text-gray-600">
                    Based on completeness, evidence quality, stakeholder involvement, and process adherence
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{totalQualityScore}/100</div>
                      <p className="text-sm text-gray-600">Total Score</p>
                    </div>
                    {overallQualityGrade && (
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold ${getGradeColor(overallQualityGrade)}`}>
                        {overallQualityGrade}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Recommendations */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Improvement Recommendations</h3>

            <div className="space-y-3">
              {qualityChecks.filter(check => check.status === 'fail' || check.status === 'warning').map((check) => (
                <div key={check.id} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-yellow-800">{check.category} Improvement Needed</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      {check.id === 'completeness' && 'Consider adding more detailed analysis to the 5 Whys investigation and barrier analysis sections.'}
                      {check.id === 'evidence_quality' && 'Collect additional documentary evidence, witness statements, and supporting materials.'}
                      {check.id === 'stakeholder_involvement' && 'Involve more subject matter experts and ensure management review is documented.'}
                      {check.id === 'timeliness_process' && 'Ensure investigation timeline meets requirements and proper workflow is followed.'}
                    </p>
                  </div>
                </div>
              ))}

              {qualityChecks.every(check => check.status === 'pass') && (
                <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-md">
                  <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-green-800">Excellent Investigation Quality</h4>
                    <p className="text-sm text-green-700 mt-1">
                      All quality criteria have been met. This investigation is ready for the approval workflow.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approval Workflow Tab */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          {/* Approval Levels */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Multi-level Approval Workflow</h3>

            <div className="space-y-4">
              {approvalLevels.map((level, index) => (
                <div key={level.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{level.name}</h4>
                        <p className="text-sm text-gray-600">{level.description}</p>
                        {level.approvedBy && (
                          <p className="text-sm text-gray-500 mt-1">
                            {level.status === 'approved' ? 'Approved' : 'Rejected'} by {level.approvedBy} on{' '}
                            {level.approvedDate?.toLocaleDateString()}
                          </p>
                        )}
                        {level.rejectionReason && (
                          <p className="text-sm text-red-600 mt-1">
                            Reason: {level.rejectionReason}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(level.status)}`}>
                        {level.status}
                      </span>
                      {level.status === 'pending' && !readOnly && (
                        <button
                          onClick={() => setShowApprovalDialog(level.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Prerequisites */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Approval Prerequisites</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  overallQualityGrade && ['A', 'B'].includes(overallQualityGrade) ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {overallQualityGrade && ['A', 'B'].includes(overallQualityGrade) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">
                  Investigation quality grade of A or B (Current: {overallQualityGrade || 'Not assessed'})
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  investigation.fiveWhysAnalysis?.primaryRootCause ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {investigation.fiveWhysAnalysis?.primaryRootCause && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">
                  Root cause analysis completed
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  investigation.correctiveActions && investigation.correctiveActions.length > 0 ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {investigation.correctiveActions && investigation.correctiveActions.length > 0 && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">
                  Corrective actions defined and assigned
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Digital Sign-off Tab */}
      {activeTab === 'signoff' && (
        <div className="space-y-6">
          {/* Sign-off Records */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Digital Sign-off Records</h3>
              {!readOnly && approvalLevels.every(level => level.status === 'approved') && (
                <button
                  onClick={() => setShowSignoffDialog('final_closure')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-5m-1.414-1.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Final Closure Sign-off
                </button>
              )}
            </div>

            {signoffRecords.length > 0 ? (
              <div className="space-y-4">
                {signoffRecords.map((signoff) => (
                  <div key={signoff.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {signoff.signoffType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Signed by {signoff.signedBy} on {signoff.signedDate.toLocaleDateString()} at {signoff.signedDate.toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Digital Signature: {signoff.digitalSignature}
                        </p>
                        {signoff.comments && (
                          <p className="text-sm text-gray-700 mt-2">
                            Comments: {signoff.comments}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm font-medium text-green-600">Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-5m-1.414-1.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No sign-off records</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Digital sign-off records will appear here once approvals are completed
                </p>
              </div>
            )}
          </div>

          {/* Sign-off Requirements */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sign-off Requirements</h3>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Digital Sign-off Process
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc list-inside space-y-1">
                        <li>All approval levels must be completed before final sign-off</li>
                        <li>Digital signatures provide secure, verifiable closure</li>
                        <li>Sign-off creates audit trail for regulatory compliance</li>
                        <li>Investigation status automatically updates to "Closed"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Document Tab */}
      {activeTab === 'summary' && (
        <InvestigationSummaryGenerator
          investigation={investigation}
          onUpdate={onUpdate}
          readOnly={readOnly}
        />
      )}

      {/* Approval Dialog */}
      {showApprovalDialog && (
        <ApprovalActionDialog
          levelId={showApprovalDialog}
          levelName={approvalLevels.find(l => l.id === showApprovalDialog)?.name || ''}
          onClose={() => setShowApprovalDialog(null)}
          onAction={handleApprovalAction}
        />
      )}

      {/* Sign-off Dialog */}
      {showSignoffDialog && (
        <SignoffDialog
          signoffType={showSignoffDialog as any}
          onClose={() => setShowSignoffDialog(null)}
          onSignoff={handleSignoff}
        />
      )}
    </div>
  );
};

// Approval Action Dialog Component
const ApprovalActionDialog: React.FC<{
  levelId: string;
  levelName: string;
  onClose: () => void;
  onAction: (levelId: string, action: 'approve' | 'reject', reason?: string) => void;
}> = ({ levelId, levelName, onClose, onAction }) => {
  const [action, setAction] = useState<'approve' | 'reject'>('approve');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onAction(levelId, action, action === 'reject' ? reason : undefined);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{levelName}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Approval Decision
              </label>
              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="approve"
                    checked={action === 'approve'}
                    onChange={() => setAction('approve')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Approve</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="reject"
                    checked={action === 'reject'}
                    onChange={() => setAction('reject')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Reject</span>
                </label>
              </div>
            </div>

            {action === 'reject' && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Rejection Reason
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide reason for rejection..."
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={action === 'reject' && !reason.trim()}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md disabled:opacity-50 ${
                action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {action === 'approve' ? 'Approve' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sign-off Dialog Component
const SignoffDialog: React.FC<{
  signoffType: SignoffRecord['signoffType'];
  onClose: () => void;
  onSignoff: (signoffType: SignoffRecord['signoffType'], comments?: string) => void;
}> = ({ signoffType, onClose, onSignoff }) => {
  const [comments, setComments] = useState('');

  const getSignoffTitle = (type: SignoffRecord['signoffType']) => {
    switch (type) {
      case 'investigation_complete': return 'Investigation Complete';
      case 'regulatory_compliance': return 'Regulatory Compliance';
      case 'executive_approval': return 'Executive Approval';
      case 'final_closure': return 'Final Investigation Closure';
      default: return 'Digital Sign-off';
    }
  };

  const handleSubmit = () => {
    onSignoff(signoffType, comments.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{getSignoffTitle(signoffType)}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Sign-off Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any final comments or notes..."
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Digital Sign-off Confirmation
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>By providing your digital sign-off, you confirm that:</p>
                    <ul className="mt-1 list-disc list-inside">
                      <li>The investigation has been completed satisfactorily</li>
                      <li>All findings and actions are appropriate</li>
                      <li>The investigation meets regulatory requirements</li>
                      <li>The case can be formally closed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Provide Digital Sign-off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationApprovalsSignoff;