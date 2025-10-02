import React, { useState, useEffect } from 'react';
import { InvestigationData } from '../../services/investigationService';
import { documentService, DocumentSystemDoc } from '../../services/documentService';

interface InvestigationSummaryGeneratorProps {
  investigation: InvestigationData;
  onUpdate: (updates: Partial<InvestigationData>) => void;
  readOnly?: boolean;
}

interface SummaryTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
}

interface DistributionTarget {
  id: string;
  name: string;
  email: string;
  type: 'employee' | 'group' | 'department';
  acknowledgmentRequired: boolean;
}

interface SummaryDocument {
  id?: string;
  title: string;
  content: string;
  template: string;
  status: 'draft' | 'review' | 'approved' | 'distributed';
  createdBy: string;
  createdDate: Date;
  approvedBy?: string;
  approvedDate?: Date;
  distributionTargets: DistributionTarget[];
  acknowledgments: {
    targetId: string;
    acknowledgedBy?: string;
    acknowledgedDate?: Date;
    status: 'pending' | 'acknowledged' | 'overdue';
  }[];
}

const SUMMARY_TEMPLATES: SummaryTemplate[] = [
  {
    id: 'standard',
    name: 'Standard Investigation Summary',
    description: 'Comprehensive summary for all investigation types',
    sections: [
      'incident_overview',
      'barrier_analysis',
      'root_causes',
      'corrective_actions',
      'learning_points',
      'prevention_measures',
      'contact_info'
    ]
  },
  {
    id: 'safety',
    name: 'Safety Incident Summary',
    description: 'Focused on safety incidents with barrier analysis',
    sections: [
      'incident_overview',
      'barrier_analysis',
      'immediate_causes',
      'root_causes',
      'safety_actions',
      'prevention_measures',
      'safety_reminders',
      'contact_info'
    ]
  },
  {
    id: 'quality',
    name: 'Quality Issue Summary',
    description: 'Quality-focused investigation summary',
    sections: [
      'incident_overview',
      'quality_impact',
      'root_causes',
      'corrective_actions',
      'process_improvements',
      'contact_info'
    ]
  },
  {
    id: 'brief',
    name: 'Brief Summary',
    description: 'Concise summary for minor incidents',
    sections: [
      'incident_overview',
      'key_findings',
      'actions_taken',
      'contact_info'
    ]
  }
];

export const InvestigationSummaryGenerator: React.FC<InvestigationSummaryGeneratorProps> = ({
  investigation,
  onUpdate,
  readOnly = false
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [summary, setSummary] = useState<SummaryDocument>({
    title: `Investigation Summary - ${investigation.incidentDetails?.reference || 'New Investigation'}`,
    content: '',
    template: 'standard',
    status: 'draft',
    createdBy: 'Current User', // TODO: Get from user context
    createdDate: new Date(),
    distributionTargets: [],
    acknowledgments: []
  });
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [autoGenerating, setAutoGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showEmployeeSelector, setShowEmployeeSelector] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);

  // Auto-generate content when template changes
  useEffect(() => {
    if (selectedTemplate !== summary.template) {
      generateSummaryContent(selectedTemplate);
    }
  }, [selectedTemplate]);

  const generateSummaryContent = async (templateId: string) => {
    setAutoGenerating(true);

    try {
      const template = SUMMARY_TEMPLATES.find(t => t.id === templateId);
      if (!template) return;

      let content = '';

      // Generate content based on template sections
      for (const section of template.sections) {
        content += generateSectionContent(section);
      }

      setSummary(prev => ({
        ...prev,
        template: templateId,
        content,
        title: `Investigation Summary - ${investigation.incidentDetails?.reference || 'New Investigation'}`
      }));
    } catch (error) {
      console.error('Error generating summary content:', error);
    } finally {
      setAutoGenerating(false);
    }
  };

  const generateSectionContent = (sectionId: string): string => {
    const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);

    switch (sectionId) {
      case 'incident_overview':
        return `
## Incident Overview

**Date & Time:** ${investigation.incidentDetails?.date ? formatDate(new Date(investigation.incidentDetails.date)) : 'Not specified'}
**Location:** ${investigation.incidentDetails?.location || 'Not specified'}
**Reference:** ${investigation.incidentDetails?.reference || 'Not assigned'}
**Reported By:** ${investigation.incidentDetails?.reportedBy || 'Not specified'}

**What Happened:**
${investigation.problemStatement || 'Description to be added'}

**People Involved:**
${investigation.incidentDetails?.peopleInvolved?.join(', ') || 'Not specified'}

`;

      case 'barrier_analysis':
        return `
## Barrier Analysis Results

**Barriers That Failed:**
${investigation.barrierAnalysis?.failedBarriers?.map(b => `- ${b.name}: ${b.failureReason}`).join('\n') || 'Analysis pending'}

**Barriers That Worked:**
${investigation.barrierAnalysis?.effectiveBarriers?.map(b => `- ${b.name}: Prevented further escalation`).join('\n') || 'Analysis pending'}

**Missing Barriers:**
${investigation.barrierAnalysis?.missingBarriers?.map(b => `- ${b.name}: Would have prevented ${b.wouldHavePrevented}`).join('\n') || 'Analysis pending'}

`;

      case 'root_causes':
        return `
## Root Causes Identified

${investigation.fiveWhysAnalysis?.whyLevels?.map((why, index) =>
  `**Why ${index + 1}:** ${why.question}\n**Answer:** ${why.answer}\n**Evidence:** ${why.evidence?.map(e => e.description).join(', ') || 'None provided'}\n`
).join('\n') || 'Root cause analysis pending'}

**Primary Root Cause:**
${investigation.fiveWhysAnalysis?.primaryRootCause || 'To be determined'}

`;

      case 'corrective_actions':
        return `
## Corrective Actions Taken

${investigation.correctiveActions?.map(action =>
  `**${action.description}**\n- Assigned to: ${action.assignedTo}\n- Due Date: ${action.dueDate ? formatDate(new Date(action.dueDate)) : 'Not set'}\n- Status: ${action.status}\n`
).join('\n') || 'Actions to be defined'}

`;

      case 'learning_points':
        return `
## Key Learning Points

${investigation.learningPoints?.map(point => `- ${point}`).join('\n') || 'Learning points to be identified'}

`;

      case 'prevention_measures':
        return `
## Prevention Measures

**Immediate Actions:**
${investigation.preventiveMeasures?.immediate?.map(measure => `- ${measure}`).join('\n') || 'To be defined'}

**Long-term Improvements:**
${investigation.preventiveMeasures?.longTerm?.map(measure => `- ${measure}`).join('\n') || 'To be defined'}

`;

      case 'contact_info':
        return `
## Contact Information

For questions about this investigation, please contact:

**Investigation Team:**
${investigation.investigationTeam?.map(member => `- ${member}`).join('\n') || 'Team to be assigned'}

**Investigation Manager:** [Name]
**Email:** [email@company.com]
**Phone:** [phone number]

`;

      case 'safety_actions':
        return `
## Safety Actions Implemented

**Immediate Safety Measures:**
${investigation.correctiveActions?.filter(a => a.category === 'safety').map(action =>
  `- ${action.description} (Assigned to: ${action.assignedTo})`
).join('\n') || 'Safety actions to be defined'}

`;

      case 'safety_reminders':
        return `
## Safety Reminders

${investigation.safetyReminders?.map(reminder => `- ${reminder}`).join('\n') || 'Safety reminders to be added'}

`;

      default:
        return '';
    }
  };

  const handleContentChange = (newContent: string) => {
    setSummary(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleAddDistributionTarget = (targets: DistributionTarget[]) => {
    setSummary(prev => ({
      ...prev,
      distributionTargets: [...prev.distributionTargets, ...targets],
      acknowledgments: [
        ...prev.acknowledgments,
        ...targets.map(target => ({
          targetId: target.id,
          status: 'pending' as const
        }))
      ]
    }));
    setShowEmployeeSelector(false);
  };

  const handleRemoveDistributionTarget = (targetId: string) => {
    setSummary(prev => ({
      ...prev,
      distributionTargets: prev.distributionTargets.filter(t => t.id !== targetId),
      acknowledgments: prev.acknowledgments.filter(a => a.targetId !== targetId)
    }));
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      // TODO: Save to backend when ready
      console.log('Saving summary draft:', summary);

      // Update investigation with summary data
      onUpdate({
        investigationSummary: summary
      });

      // TODO: Create document in documents module
      console.log('Creating document in documents module...');

    } catch (error) {
      console.error('Error saving summary:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitForApproval = () => {
    setShowApprovalDialog(true);
  };

  const handleApprove = async () => {
    setSaving(true);
    try {
      const approvedSummary = {
        ...summary,
        status: 'approved' as const,
        approvedBy: 'Current User', // TODO: Get from user context
        approvedDate: new Date()
      };

      setSummary(approvedSummary);

      // TODO: Create formal document and distribute
      console.log('Creating formal document and distributing...');

    } catch (error) {
      console.error('Error approving summary:', error);
    } finally {
      setSaving(false);
      setShowApprovalDialog(false);
    }
  };

  const handleDistribute = async () => {
    setSaving(true);
    try {
      const distributedSummary = {
        ...summary,
        status: 'distributed' as const
      };

      setSummary(distributedSummary);

      // TODO: Send to document assignments and email notifications
      console.log('Distributing to selected employees...');

    } catch (error) {
      console.error('Error distributing summary:', error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'distributed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'content', name: 'Content', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-5m-1.414-1.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'distribution', name: 'Distribution', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'tracking', name: 'Tracking', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Investigation Summary Document</h2>
            <p className="text-sm text-gray-600 mt-1">
              Generate a professional summary and save to documents module for distribution management
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(summary.status)}`}>
              {summary.status.charAt(0).toUpperCase() + summary.status.slice(1)}
            </span>
            {!readOnly && (
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            )}
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

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Summary Template</h3>
              <button
                onClick={() => generateSummaryContent(selectedTemplate)}
                disabled={autoGenerating}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {autoGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Regenerate
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUMMARY_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {template.sections.slice(0, 3).map((section) => (
                      <span key={section} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {section.replace('_', ' ')}
                      </span>
                    ))}
                    {template.sections.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{template.sections.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Title and Content */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Document Title
                </label>
                <input
                  type="text"
                  value={summary.title}
                  onChange={(e) => setSummary(prev => ({ ...prev, title: e.target.value }))}
                  readOnly={readOnly || previewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                  placeholder="Enter document title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Summary Content
                </label>
                {previewMode ? (
                  <div className="border border-gray-300 rounded-md p-4 bg-gray-50 min-h-[400px]">
                    <div className="prose max-w-none">
                      {summary.content.split('\n').map((line, index) => {
                        if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{line.replace('## ', '')}</h2>;
                        } else if (line.startsWith('**') && line.endsWith('**')) {
                          return <p key={index} className="font-semibold text-gray-900 mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                        } else if (line.startsWith('- ')) {
                          return <li key={index} className="text-gray-700 ml-4">{line.replace('- ', '')}</li>;
                        } else if (line.trim()) {
                          return <p key={index} className="text-gray-700 mb-2">{line}</p>;
                        } else {
                          return <div key={index} className="h-2"></div>;
                        }
                      })}
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={summary.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    readOnly={readOnly}
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 font-mono text-sm"
                    placeholder="Summary content will be auto-generated based on investigation data..."
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!readOnly && (
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSaveDraft}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>

              {summary.status === 'draft' && (
                <button
                  onClick={handleSubmitForApproval}
                  disabled={!summary.content.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Submit for Approval
                </button>
              )}

              {summary.status === 'approved' && summary.distributionTargets.length > 0 && (
                <button
                  onClick={handleDistribute}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Distribute to Employees
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Distribution Tab */}
      {activeTab === 'distribution' && (
        <div className="space-y-6">
          {/* Employee Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Distribution List</h3>
              {!readOnly && (
                <button
                  onClick={() => setShowEmployeeSelector(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Recipients
                </button>
              )}
            </div>

            {summary.distributionTargets.length > 0 ? (
              <div className="space-y-2">
                {summary.distributionTargets.map((target) => (
                  <div key={target.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          target.type === 'employee' ? 'bg-blue-500' :
                          target.type === 'group' ? 'bg-green-500' : 'bg-purple-500'
                        }`}>
                          <span className="text-white text-sm font-medium">
                            {target.type === 'employee' ? 'U' :
                             target.type === 'group' ? 'G' : 'D'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{target.name}</p>
                        <p className="text-sm text-gray-500">
                          {target.email} • {target.type}
                          {target.acknowledgmentRequired && ' • Acknowledgment Required'}
                        </p>
                      </div>
                    </div>
                    {!readOnly && (
                      <button
                        onClick={() => handleRemoveDistributionTarget(target.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-md">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No recipients selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add employees, groups, or departments to distribute this summary.
                </p>
              </div>
            )}
          </div>

          {/* Distribution Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                  <p className="text-sm text-gray-500">Send email alerts when document is distributed</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Acknowledgment Required</label>
                  <p className="text-sm text-gray-500">Recipients must acknowledge reading the document</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Reminder Notifications</label>
                  <p className="text-sm text-gray-500">Send reminders for unacknowledged documents</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Tab */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          {/* Acknowledgment Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Acknowledgment Status</h3>

            {summary.acknowledgments.length > 0 ? (
              <div className="space-y-3">
                {summary.acknowledgments.map((ack) => {
                  const target = summary.distributionTargets.find(t => t.id === ack.targetId);
                  if (!target) return null;

                  return (
                    <div key={ack.targetId} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-2 h-2 rounded-full ${
                            ack.status === 'acknowledged' ? 'bg-green-500' :
                            ack.status === 'overdue' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{target.name}</p>
                          <p className="text-sm text-gray-500">
                            {ack.status === 'acknowledged'
                              ? `Acknowledged ${ack.acknowledgedDate ? new Date(ack.acknowledgedDate).toLocaleDateString() : ''} by ${ack.acknowledgedBy || 'Unknown'}`
                              : ack.status === 'overdue'
                              ? 'Overdue for acknowledgment'
                              : 'Pending acknowledgment'
                            }
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ack.status === 'acknowledged' ? 'text-green-800 bg-green-100' :
                        ack.status === 'overdue' ? 'text-red-800 bg-red-100' : 'text-yellow-800 bg-yellow-100'
                      }`}>
                        {ack.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-lg font-medium">No tracking data</p>
                <p className="text-sm mt-2">Document has not been distributed yet</p>
              </div>
            )}
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{summary.distributionTargets.length}</div>
                  <div className="text-sm text-gray-500">Total Recipients</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.acknowledgments.filter(a => a.status === 'acknowledged').length}
                  </div>
                  <div className="text-sm text-gray-500">Acknowledged</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.acknowledgments.filter(a => a.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-500">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Selector Modal */}
      {showEmployeeSelector && (
        <EmployeeSelectorModal
          onClose={() => setShowEmployeeSelector(false)}
          onSelect={handleAddDistributionTarget}
          excludeIds={summary.distributionTargets.map(t => t.id)}
        />
      )}

      {/* Approval Dialog */}
      {showApprovalDialog && (
        <ApprovalDialog
          summary={summary}
          onClose={() => setShowApprovalDialog(false)}
          onApprove={handleApprove}
        />
      )}
    </div>
  );
};

// Employee Selector Modal Component
const EmployeeSelectorModal: React.FC<{
  onClose: () => void;
  onSelect: (targets: DistributionTarget[]) => void;
  excludeIds: string[];
}> = ({ onClose, onSelect, excludeIds }) => {
  const [selectedTargets, setSelectedTargets] = useState<DistributionTarget[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'employees' | 'groups' | 'departments'>('employees');

  // Mock data - replace with real API calls
  const mockEmployees: DistributionTarget[] = [
    { id: 'emp-1', name: 'John Smith', email: 'john.smith@company.com', type: 'employee', acknowledgmentRequired: true },
    { id: 'emp-2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', type: 'employee', acknowledgmentRequired: true },
    { id: 'emp-3', name: 'Mike Wilson', email: 'mike.wilson@company.com', type: 'employee', acknowledgmentRequired: true },
  ];

  const mockGroups: DistributionTarget[] = [
    { id: 'grp-1', name: 'Safety Team', email: 'safety-team@company.com', type: 'group', acknowledgmentRequired: true },
    { id: 'grp-2', name: 'Production Supervisors', email: 'prod-supervisors@company.com', type: 'group', acknowledgmentRequired: true },
  ];

  const mockDepartments: DistributionTarget[] = [
    { id: 'dept-1', name: 'Manufacturing', email: 'manufacturing@company.com', type: 'department', acknowledgmentRequired: true },
    { id: 'dept-2', name: 'Quality Assurance', email: 'quality@company.com', type: 'department', acknowledgmentRequired: true },
  ];

  const getCurrentTargets = () => {
    switch (activeTab) {
      case 'employees': return mockEmployees;
      case 'groups': return mockGroups;
      case 'departments': return mockDepartments;
      default: return [];
    }
  };

  const filteredTargets = getCurrentTargets()
    .filter(target => !excludeIds.includes(target.id))
    .filter(target =>
      target.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      target.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleTargetToggle = (target: DistributionTarget) => {
    setSelectedTargets(prev => {
      const isSelected = prev.some(t => t.id === target.id);
      if (isSelected) {
        return prev.filter(t => t.id !== target.id);
      } else {
        return [...prev, target];
      }
    });
  };

  const handleConfirm = () => {
    onSelect(selectedTargets);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Select Recipients</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'employees', name: 'Employees' },
                { id: 'groups', name: 'Groups' },
                { id: 'departments', name: 'Departments' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search recipients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Recipients List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredTargets.map((target) => (
              <div
                key={target.id}
                onClick={() => handleTargetToggle(target)}
                className={`p-3 border rounded-md cursor-pointer transition-all ${
                  selectedTargets.some(t => t.id === target.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      target.type === 'employee' ? 'bg-blue-500' :
                      target.type === 'group' ? 'bg-green-500' : 'bg-purple-500'
                    }`}>
                      <span className="text-white text-sm font-medium">
                        {target.type === 'employee' ? 'U' :
                         target.type === 'group' ? 'G' : 'D'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{target.name}</p>
                      <p className="text-sm text-gray-500">{target.email}</p>
                    </div>
                  </div>
                  {selectedTargets.some(t => t.id === target.id) && (
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              {selectedTargets.length} recipient{selectedTargets.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={selectedTargets.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
              >
                Add Recipients
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Approval Dialog Component
const ApprovalDialog: React.FC<{
  summary: SummaryDocument;
  onClose: () => void;
  onApprove: () => void;
}> = ({ summary, onClose, onApprove }) => {
  const [approvalNotes, setApprovalNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Approve Summary Document</h3>
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
              <h4 className="text-sm font-medium text-gray-900 mb-2">Document Summary</h4>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700"><strong>Title:</strong> {summary.title}</p>
                <p className="text-sm text-gray-700"><strong>Template:</strong> {summary.template}</p>
                <p className="text-sm text-gray-700"><strong>Created:</strong> {summary.createdDate.toLocaleDateString()}</p>
                <p className="text-sm text-gray-700"><strong>Content Length:</strong> {summary.content.length} characters</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Approval Notes (Optional)
              </label>
              <textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any approval notes or comments..."
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Approval Confirmation
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>By approving this document, you confirm that:</p>
                    <ul className="mt-1 list-disc list-inside">
                      <li>The content is accurate and complete</li>
                      <li>The investigation findings are properly represented</li>
                      <li>The document is ready to be saved to the documents module</li>
                      <li>All corrective actions have been reviewed</li>
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
              onClick={onApprove}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Approve Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationSummaryGenerator;