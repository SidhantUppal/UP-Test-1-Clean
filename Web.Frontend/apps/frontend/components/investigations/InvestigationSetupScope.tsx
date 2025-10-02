import React, { useState, useEffect } from 'react';
import { InvestigationData } from '../../services/investigationService';
import InvestigationTasksPanel from './InvestigationTasksPanel';

interface InvestigationSetupScopeProps {
  investigation: InvestigationData;
  onUpdate: (updates: Partial<InvestigationData>) => void;
  onSave: () => Promise<void>;
  readOnly?: boolean;
}

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

export const InvestigationSetupScope: React.FC<InvestigationSetupScopeProps> = ({
  investigation,
  onUpdate,
  onSave,
  readOnly = false
}) => {
  const [activeTab, setActiveTab] = useState('setup');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState<TeamMember>({ name: '', email: '', role: 'Investigator' });
  const [showAddMember, setShowAddMember] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Initialize team members from investigation data
    const members = investigation.investigationTeam.map(name => ({
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@company.com`, // Placeholder
      role: 'Investigator'
    }));
    setTeamMembers(members);
  }, [investigation.investigationTeam]);

  const handleAddTeamMember = () => {
    if (newMember.name && newMember.email) {
      const updatedMembers = [...teamMembers, newMember];
      setTeamMembers(updatedMembers);

      // Update investigation data
      const teamNames = updatedMembers.map(m => m.name);
      onUpdate({ investigationTeam: teamNames });

      setNewMember({ name: '', email: '', role: 'Investigator' });
      setShowAddMember(false);
    }
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);

    // Update investigation data
    const teamNames = updatedMembers.map(m => m.name);
    onUpdate({ investigationTeam: teamNames });
  };

  const handleTargetDateChange = (date: string) => {
    const targetDate = new Date(date);
    onUpdate({
      targetCompletionDate: targetDate,
      timeline: {
        ...investigation.timeline,
        target: targetDate
      }
    });
  };

  const handleProblemStatementChange = (statement: string) => {
    onUpdate({ problemStatement: statement });
  };

  const handleStakeholderChange = (stakeholders: string) => {
    const stakeholderList = stakeholders
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    onUpdate({ stakeholders: stakeholderList });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave();
    } catch (error) {
      console.error('Error saving investigation:', error);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'setup', name: 'Setup & Scope', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'tasks', name: 'Task Management', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' }
  ];

  return (
    <div className="space-y-6">
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

      {/* Setup & Scope Tab */}
      {activeTab === 'setup' && (
        <div className="space-y-6">
          {/* Problem Statement */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Problem Statement
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={investigation.problemStatement}
              onChange={(e) => handleProblemStatementChange(e.target.value)}
              readOnly={readOnly}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Provide a clear, concise description of what happened and needs to be investigated..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Describe the incident or issue that requires investigation. This will guide the entire investigation process.
            </p>
          </div>

          {/* Target Completion Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Investigation Start Date
              </label>
              <input
                type="date"
                value={investigation.timeline.start.toISOString().split('T')[0]}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Automatically set to today's date when investigation was created.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Target Completion Date
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={investigation.targetCompletionDate.toISOString().split('T')[0]}
                onChange={(e) => handleTargetDateChange(e.target.value)}
                readOnly={readOnly}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                This date will be used for all created tasks. Changing this will update existing task due dates.
              </p>
            </div>
          </div>

          {/* Investigation Team */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-900">
                Investigation Team
                <span className="text-red-500">*</span>
              </label>
              {!readOnly && (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Member
                </button>
              )}
            </div>

            {teamMembers.length > 0 ? (
              <div className="space-y-2">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email} • {member.role}</p>
                      </div>
                    </div>
                    {!readOnly && (
                      <button
                        onClick={() => handleRemoveTeamMember(index)}
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
                <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add team members who will be responsible for conducting this investigation.
                </p>
              </div>
            )}

            <p className="mt-2 text-sm text-gray-500">
              Tasks will be automatically created for each team member when saved. Email notifications will be sent with task assignments.
            </p>
          </div>

          {/* Stakeholders */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Key Stakeholders
            </label>
            <textarea
              value={investigation.stakeholders.join('\n')}
              onChange={(e) => handleStakeholderChange(e.target.value)}
              readOnly={readOnly}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter each stakeholder on a new line..."
            />
            <p className="mt-1 text-sm text-gray-500">
              List people who should be kept informed or may need to be involved in the investigation. One per line.
            </p>
          </div>

          {/* Task Creation Options */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Task Creation & Email Notifications
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>When you save this investigation setup:</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>Individual tasks will be created for each team member</li>
                    <li>Tasks will be linked to this investigation and incident (if applicable)</li>
                    <li>Task due dates will match the target completion date</li>
                    <li>Email notifications will be sent to all team members with task details</li>
                    <li>Team members can track their progress in the Tasks module</li>
                  </ul>
                </div>

                <div className="mt-3 flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={investigation.taskCreationEnabled}
                      onChange={(e) => onUpdate({ taskCreationEnabled: e.target.checked })}
                      disabled={readOnly}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-blue-700">Create tasks automatically</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={investigation.emailNotificationsEnabled}
                      onChange={(e) => onUpdate({ emailNotificationsEnabled: e.target.checked })}
                      disabled={readOnly}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-blue-700">Send email notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {!readOnly && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || !investigation.problemStatement || teamMembers.length === 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Save & Create Tasks
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Task Management Tab */}
      {activeTab === 'tasks' && investigation.investigationId && (
        <InvestigationTasksPanel
          investigationId={investigation.investigationId}
          investigationReference={`INV-${investigation.investigationId}`}
          targetCompletionDate={investigation.targetCompletionDate}
          teamMembers={investigation.investigationTeam}
          onTargetDateUpdated={(newDate) => {
            onUpdate({
              targetCompletionDate: newDate,
              timeline: {
                ...investigation.timeline,
                target: newDate
              }
            });
          }}
        />
      )}

      {/* Add Team Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Team Member</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter team member name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Lead Investigator">Lead Investigator</option>
                    <option value="Investigator">Investigator</option>
                    <option value="Subject Matter Expert">Subject Matter Expert</option>
                    <option value="Witness Interviewer">Witness Interviewer</option>
                    <option value="Evidence Collector">Evidence Collector</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddMember(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTeamMember}
                  disabled={!newMember.name || !newMember.email}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestigationSetupScope;