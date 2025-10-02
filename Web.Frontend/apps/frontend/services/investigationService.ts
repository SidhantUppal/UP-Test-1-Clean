// Investigation Service - handles all investigation-related API calls

interface InvestigationData {
  investigationId?: number;
  incidentCaseId?: string;
  investigationTeam: string[];
  problemStatement: string;
  timeline: { start: Date; target: Date; actual?: Date };
  targetCompletionDate: Date;
  stakeholders: string[];
  // Investigation methodology (supports both approaches)
  investigationType: 'barrier-analysis' | '5-whys';
  barrierCategories: BarrierCategory[];
  whyLevels: WhyLevel[]; // Kept for backward compatibility
  qualityScore: number;
  status: 'draft' | 'active' | 'review' | 'approved' | 'closed';
  // Task integration fields
  investigationTasks?: InvestigationTask[];
  taskCreationEnabled?: boolean;
  emailNotificationsEnabled?: boolean;
  // Enhanced investigation fields for summary generation
  incidentDetails?: {
    reference?: string;
    date?: string;
    location?: string;
    peopleInvolved?: string[];
    reportedBy?: string;
  };
  fiveWhysAnalysis?: {
    whyLevels: WhyLevel[];
    primaryRootCause?: string;
  };
  barrierAnalysis?: {
    failedBarriers?: Array<{ name: string; failureReason: string }>;
    effectiveBarriers?: Array<{ name: string; reason?: string }>;
    missingBarriers?: Array<{ name: string; wouldHavePrevented: string }>;
  };
  correctiveActions?: Array<{
    description: string;
    assignedTo: string;
    dueDate?: Date;
    status: string;
    category?: string;
    notes?: string;
  }>;
  learningPoints?: string[];
  preventiveMeasures?: {
    immediate?: string[];
    longTerm?: string[];
  };
  safetyReminders?: string[];
  attachments?: any[];
  witnessStatements?: any[];
  relatedRecords?: any;
  // Summary document integration
  investigationSummary?: {
    id?: string;
    title: string;
    content: string;
    template: string;
    status: 'draft' | 'review' | 'approved' | 'distributed';
    distributionTargets: Array<{
      id: string;
      name: string;
      email: string;
      type: 'employee' | 'group' | 'department';
    }>;
    acknowledgments: Array<{
      targetId: string;
      status: 'pending' | 'acknowledged' | 'overdue';
      acknowledgedBy?: string;
      acknowledgedDate?: Date;
    }>;
  };
  // Approval status
  approvalStatus?: {
    levels: Array<{
      id: string;
      name: string;
      status: 'pending' | 'approved' | 'rejected';
      approvedBy?: string;
      approvedDate?: Date;
    }>;
    currentLevel?: string;
    overallStatus: 'pending' | 'approved' | 'rejected';
  };
  closedDate?: Date;
  closedBy?: string;
  // Pre-populated data from incident form
  prePopulatedData?: {
    incidentDate?: string;
    incidentTime?: string;
    location?: string;
    description?: string;
    peopleInvolved?: string[];
    severity?: string;
    incidentType?: string;
    initialEvidence?: any[];
    originalReporter?: string;
    reportedDate?: string;
    caseNumber?: string;
  };
  dataSource?: 'incident' | 'manual';
}

// Barrier Analysis Interfaces
interface BarrierCategory {
  id: number;
  name: 'Physical' | 'Administrative' | 'Human' | 'Management Systems';
  description: string;
  barriers: Barrier[];
}

interface Barrier {
  id: number;
  categoryId: number;
  description: string;
  expectedFunction: string;
  status: 'Present' | 'Absent' | 'Failed' | 'Inadequate';
  failureMode: string;
  failureReason: string;
  evidence: Evidence[];
  effectivenessRating: 1 | 2 | 3 | 4 | 5;
  recommendations: string[];
  verifiedBy?: string;
  verificationDate?: Date;
  witnesses: string[];
  attachments: File[];
}

// Legacy 5 Whys interface (kept for backward compatibility)
interface WhyLevel {
  id: number;
  question: string;
  answer: string;
  evidence: Evidence[];
  confidenceLevel: 1 | 2 | 3 | 4 | 5;
  verifiedBy?: string;
  verificationDate?: Date;
  witnesses: string[];
  attachments: File[];
}

interface Evidence {
  id: string;
  type: 'document' | 'photo' | 'witness' | 'data';
  title: string;
  description: string;
  attachedFile?: File;
  dateCollected: Date;
  collectedBy: string;
}

interface InvestigationAction {
  actionId?: number;
  investigationId: number;
  title: string;
  description: string;
  actionType: 'corrective' | 'preventive' | 'immediate' | 'long-term';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignedTo?: string;
  whyLevelOrigin?: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

interface ApprovalWorkflow {
  approvalId?: number;
  investigationId: number;
  approvalLevel: number;
  approverUserId?: number;
  status: 'pending' | 'approved' | 'rejected' | 'changes-requested';
  comments?: string;
  actionDate?: Date;
}

interface InvestigationTask {
  taskId?: number;
  investigationId: number;
  assignedUserId: number;
  assignedUserName: string;
  assignedUserEmail: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  taskReference: string;
  createdDate?: Date;
  completedDate?: Date;
  emailSent?: boolean;
  emailSentDate?: Date;
}

interface TaskCreationRequest {
  investigationId: number;
  investigationReference: string;
  incidentReference?: string;
  targetCompletionDate: Date;
  teamMembers: Array<{
    userId: number;
    userName: string;
    userEmail: string;
    role?: string;
  }>;
  investigationSummary: string;
  priority: 'high' | 'medium' | 'low';
}

interface EmailNotificationData {
  taskId: number;
  investigationId: number;
  assignedUserEmail: string;
  assignedUserName: string;
  investigationReference: string;
  incidentReference?: string;
  targetCompletionDate: Date;
  taskDescription: string;
  investigationUrl: string;
  taskUrl: string;
}

class InvestigationService {
  private baseUrl = '/api/investigations';

  // Fetch incident data to pre-populate investigation
  async getIncidentForInvestigation(incidentCaseId: string): Promise<{
    incidentData: any;
    formData?: any;
  }> {
    const response = await fetch(`/api/incidents/${incidentCaseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch incident data: ${response.statusText}`);
    }

    return response.json();
  }

  // Create investigation with auto-populated data from incident
  async createInvestigationFromIncident(incidentCaseId: string): Promise<InvestigationData> {
    try {
      // Fetch incident data first
      const incidentResponse = await this.getIncidentForInvestigation(incidentCaseId);
      const incidentData = incidentResponse.data;
      const formData = incidentData.formData || {};

      // Create investigation with pre-populated data
      const targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
      const investigationData: InvestigationData = {
        incidentCaseId: incidentCaseId,
        investigationTeam: [],
        problemStatement: this.generateProblemStatement(incidentData, formData),
        timeline: {
          start: new Date(),
          target: targetDate
        },
        targetCompletionDate: targetDate,
        stakeholders: this.extractStakeholders(incidentData, formData),
        investigationType: 'barrier-analysis' as const,
        barrierCategories: this.initializeBarrierCategories(),
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
        status: 'draft' as const,
        investigationTasks: [],
        taskCreationEnabled: true,
        emailNotificationsEnabled: true,
        prePopulatedData: {
          incidentDate: incidentData.incidentDate,
          incidentTime: incidentData.incidentTime,
          location: incidentData.locationName || incidentData.customLocation,
          description: incidentData.description || formData.description,
          peopleInvolved: this.extractPeopleInvolved(formData),
          severity: incidentData.severity,
          incidentType: incidentData.typeName,
          initialEvidence: incidentData.attachments || [],
          originalReporter: incidentData.reporterName,
          reportedDate: incidentData.reportedDate,
          caseNumber: incidentData.caseNumber
        },
        dataSource: 'incident'
      };

      return investigationData;
    } catch (error) {
      console.error('Failed to create investigation from incident:', error);
      throw error;
    }
  }

  // Generate problem statement from incident data
  private generateProblemStatement(incidentData: any, formData: any): string {
    const parts = [];

    if (incidentData.typeName) {
      parts.push(`${incidentData.typeName} incident`);
    }

    if (incidentData.incidentDate) {
      parts.push(`occurred on ${new Date(incidentData.incidentDate).toLocaleDateString()}`);
    }

    if (incidentData.locationName || incidentData.customLocation) {
      parts.push(`at ${incidentData.locationName || incidentData.customLocation}`);
    }

    if (incidentData.description || formData.description) {
      const description = incidentData.description || formData.description;
      parts.push(`involving ${description}`);
    }

    if (incidentData.severity) {
      parts.push(`(Severity: ${incidentData.severity})`);
    }

    return parts.length > 0
      ? parts.join(' ').charAt(0).toUpperCase() + parts.join(' ').slice(1) + '.'
      : 'Investigation required to determine root cause of reported incident.';
  }

  // Extract stakeholders from incident data
  private extractStakeholders(incidentData: any, formData: any): string[] {
    const stakeholders = [];

    if (incidentData.reporterName) {
      stakeholders.push(incidentData.reporterName + ' (Reporter)');
    }

    if (incidentData.assignedToName) {
      stakeholders.push(incidentData.assignedToName + ' (Assigned To)');
    }

    // Extract people from form data
    const peopleInvolved = this.extractPeopleInvolved(formData);
    stakeholders.push(...peopleInvolved.map(person => person + ' (Involved)'));

    // Add line manager if available
    if (formData.lineManager) {
      stakeholders.push(formData.lineManager + ' (Line Manager)');
    }

    // Add witnesses if available
    if (formData.witnesses && Array.isArray(formData.witnesses)) {
      formData.witnesses.forEach((witness: any) => {
        if (witness.name) {
          stakeholders.push(witness.name + ' (Witness)');
        }
      });
    }

    // Remove duplicates and filter out empty values
    return [...new Set(stakeholders)].filter(stakeholder => stakeholder && stakeholder.trim());
  }

  // Initialize barrier categories for barrier analysis
  private initializeBarrierCategories(): BarrierCategory[] {
    return [
      {
        id: 1,
        name: 'Physical',
        description: 'Equipment, PPE, engineering controls, and physical barriers',
        barriers: [
          {
            id: 1,
            categoryId: 1,
            description: 'Personal Protective Equipment (PPE)',
            expectedFunction: 'Protect individual from hazards',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          },
          {
            id: 2,
            categoryId: 1,
            description: 'Engineering Controls',
            expectedFunction: 'Eliminate or reduce hazards at source',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          }
        ]
      },
      {
        id: 2,
        name: 'Administrative',
        description: 'Procedures, policies, training, and administrative controls',
        barriers: [
          {
            id: 3,
            categoryId: 2,
            description: 'Standard Operating Procedures',
            expectedFunction: 'Provide clear work instructions and safety requirements',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          },
          {
            id: 4,
            categoryId: 2,
            description: 'Training and Competency',
            expectedFunction: 'Ensure personnel have required knowledge and skills',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          }
        ]
      },
      {
        id: 3,
        name: 'Human',
        description: 'Behavior, competency, decision-making, and human factors',
        barriers: [
          {
            id: 5,
            categoryId: 3,
            description: 'Risk Awareness and Perception',
            expectedFunction: 'Personnel recognize and respond appropriately to risks',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          },
          {
            id: 6,
            categoryId: 3,
            description: 'Decision Making Under Pressure',
            expectedFunction: 'Personnel make safe decisions when under pressure',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          }
        ]
      },
      {
        id: 4,
        name: 'Management Systems',
        description: 'Oversight, communication, culture, and management controls',
        barriers: [
          {
            id: 7,
            categoryId: 4,
            description: 'Supervision and Oversight',
            expectedFunction: 'Ensure work is performed safely and according to procedures',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          },
          {
            id: 8,
            categoryId: 4,
            description: 'Safety Culture and Communication',
            expectedFunction: 'Foster open communication about safety concerns',
            status: 'Present',
            failureMode: '',
            failureReason: '',
            evidence: [],
            effectivenessRating: 3,
            recommendations: [],
            witnesses: [],
            attachments: []
          }
        ]
      }
    ];
  }

  // Extract people involved from form data
  private extractPeopleInvolved(formData: any): string[] {
    const people = [];

    // Check various form field patterns for people
    if (formData.personAffected) {
      people.push(formData.personAffected);
    }

    if (formData.injuredPerson) {
      people.push(formData.injuredPerson);
    }

    if (formData.personInvolved) {
      people.push(formData.personInvolved);
    }

    if (formData.peopleInvolved && Array.isArray(formData.peopleInvolved)) {
      people.push(...formData.peopleInvolved);
    }

    if (formData.employees && Array.isArray(formData.employees)) {
      people.push(...formData.employees);
    }

    // Filter out empty values and remove duplicates
    return [...new Set(people)].filter(person => person && person.trim());
  }

  // Investigation CRUD operations
  async getInvestigations(filters: { incidentId?: string; status?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.incidentId) params.append('incidentId', filters.incidentId);
    if (filters.status) params.append('status', filters.status);

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch investigations: ${response.statusText}`);
    }

    return response.json();
  }

  async getInvestigation(investigationId: string) {
    const response = await fetch(`${this.baseUrl}/${investigationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch investigation: ${response.statusText}`);
    }

    return response.json();
  }

  async createInvestigation(investigationData: InvestigationData) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(investigationData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create investigation: ${response.statusText}`);
    }

    return response.json();
  }

  async updateInvestigation(investigationId: string, investigationData: Partial<InvestigationData>) {
    const response = await fetch(`${this.baseUrl}/${investigationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(investigationData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update investigation: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteInvestigation(investigationId: string) {
    const response = await fetch(`${this.baseUrl}/${investigationId}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete investigation: ${response.statusText}`);
    }

    return response.json();
  }

  // Evidence management
  async getInvestigationEvidence(investigationId: string, whyLevel?: number) {
    const params = whyLevel ? `?whyLevel=${whyLevel}` : '';
    const response = await fetch(`${this.baseUrl}/${investigationId}/evidence${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch investigation evidence: ${response.statusText}`);
    }

    return response.json();
  }

  async addEvidence(investigationId: string, evidence: {
    whyLevel: number;
    type: string;
    title: string;
    description: string;
    file?: File
  }) {
    const formData = new FormData();
    formData.append('whyLevel', evidence.whyLevel.toString());
    formData.append('type', evidence.type);
    formData.append('title', evidence.title);
    formData.append('description', evidence.description);

    if (evidence.file) {
      formData.append('file', evidence.file);
    }

    const response = await fetch(`${this.baseUrl}/${investigationId}/evidence`, {
      method: 'POST',
      headers: {
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to add evidence: ${response.statusText}`);
    }

    return response.json();
  }

  // Action management
  async getInvestigationActions(investigationId: string, filters: { status?: string; priority?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);

    const url = params.toString() ? `${this.baseUrl}/${investigationId}/actions?${params.toString()}` : `${this.baseUrl}/${investigationId}/actions`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch investigation actions: ${response.statusText}`);
    }

    return response.json();
  }

  async createAction(investigationId: string, actionData: Omit<InvestigationAction, 'actionId' | 'investigationId'>) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(actionData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create action: ${response.statusText}`);
    }

    return response.json();
  }

  // Approval workflow management
  async getApprovalWorkflow(investigationId: string) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/approvals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch approval workflow: ${response.statusText}`);
    }

    return response.json();
  }

  async submitForReview(investigationId: string, qualityScore: number) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/approvals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify({
        action: 'submit',
        qualityScore: qualityScore
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit investigation for review: ${response.statusText}`);
    }

    return response.json();
  }

  async approveInvestigation(investigationId: string, approvalLevel: number, comments?: string) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/approvals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify({
        action: 'approve',
        approvalLevel: approvalLevel,
        comments: comments
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to approve investigation: ${response.statusText}`);
    }

    return response.json();
  }

  async rejectInvestigation(investigationId: string, approvalLevel: number, comments: string) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/approvals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify({
        action: 'reject',
        approvalLevel: approvalLevel,
        comments: comments
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to reject investigation: ${response.statusText}`);
    }

    return response.json();
  }

  async requestChanges(investigationId: string, approvalLevel: number, comments: string) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/approvals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify({
        action: 'request_changes',
        approvalLevel: approvalLevel,
        comments: comments
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to request investigation changes: ${response.statusText}`);
    }

    return response.json();
  }

  // Task Management Methods

  // Create tasks for investigation team members
  async createInvestigationTasks(taskCreationRequest: TaskCreationRequest): Promise<InvestigationTask[]> {
    const response = await fetch(`${this.baseUrl}/${taskCreationRequest.investigationId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(taskCreationRequest),
    });

    if (!response.ok) {
      throw new Error(`Failed to create investigation tasks: ${response.statusText}`);
    }

    return response.json();
  }

  // Get tasks for an investigation
  async getInvestigationTasks(investigationId: string): Promise<InvestigationTask[]> {
    const response = await fetch(`${this.baseUrl}/${investigationId}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get investigation tasks: ${response.statusText}`);
    }

    return response.json();
  }

  // Update task status
  async updateTaskStatus(investigationId: string, taskId: number, status: string): Promise<InvestigationTask> {
    const response = await fetch(`${this.baseUrl}/${investigationId}/tasks/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task status: ${response.statusText}`);
    }

    return response.json();
  }

  // Send email notifications for task assignments
  async sendTaskNotifications(investigationId: string, taskIds: number[]): Promise<{ success: boolean; emailsSent: number }> {
    const response = await fetch(`${this.baseUrl}/${investigationId}/tasks/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify({ taskIds }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send task notifications: ${response.statusText}`);
    }

    return response.json();
  }

  // Update investigation target completion date and related tasks
  async updateTargetCompletionDate(investigationId: string, targetDate: Date): Promise<{ investigation: InvestigationData; tasksUpdated: number }> {
    const response = await fetch(`${this.baseUrl}/${investigationId}/target-date`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify({ targetCompletionDate: targetDate }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update target completion date: ${response.statusText}`);
    }

    return response.json();
  }

  // Generate task creation request from investigation data
  generateTaskCreationRequest(investigation: InvestigationData): TaskCreationRequest {
    const investigationReference = `INV-${investigation.investigationId || 'NEW'}`;
    const incidentReference = investigation.prePopulatedData?.caseNumber;

    const priority = this.determinePriority(investigation);

    return {
      investigationId: investigation.investigationId!,
      investigationReference,
      incidentReference,
      targetCompletionDate: investigation.targetCompletionDate,
      teamMembers: investigation.investigationTeam.map(memberName => ({
        userId: 0, // This would need to be resolved from the user name
        userName: memberName,
        userEmail: `${memberName.toLowerCase().replace(' ', '.')}@company.com`, // Placeholder
        role: 'Investigator'
      })),
      investigationSummary: investigation.problemStatement,
      priority
    };
  }

  // Determine investigation priority based on incident data
  private determinePriority(investigation: InvestigationData): 'high' | 'medium' | 'low' {
    const severity = investigation.prePopulatedData?.severity?.toLowerCase();
    const incidentType = investigation.prePopulatedData?.incidentType?.toLowerCase();

    // High priority for serious incidents
    if (severity === 'high' || severity === 'critical' ||
        incidentType?.includes('injury') || incidentType?.includes('accident')) {
      return 'high';
    }

    // Medium priority for moderate incidents
    if (severity === 'medium' || incidentType?.includes('near miss')) {
      return 'medium';
    }

    return 'low';
  }

  // ==================== SUMMARY DOCUMENT METHODS ====================

  // Create investigation summary document
  async createInvestigationSummary(investigationId: string, summaryData: {
    title: string;
    content: string;
    template: string;
  }) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(summaryData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create investigation summary: ${response.statusText}`);
    }

    return response.json();
  }

  // Update investigation summary
  async updateInvestigationSummary(investigationId: string, summaryData: {
    title?: string;
    content?: string;
    distributionTargets?: any[];
    status?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/summary`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(summaryData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update investigation summary: ${response.statusText}`);
    }

    return response.json();
  }

  // Distribute investigation summary
  async distributeInvestigationSummary(investigationId: string, distributionOptions: {
    sendEmailNotifications: boolean;
    requireAcknowledgment: boolean;
    emailSubject?: string;
    emailMessage?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/summary/distribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(distributionOptions),
    });

    if (!response.ok) {
      throw new Error(`Failed to distribute investigation summary: ${response.statusText}`);
    }

    return response.json();
  }

  // Get summary distribution status
  async getSummaryDistributionStatus(investigationId: string) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/summary/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get summary distribution status: ${response.statusText}`);
    }

    return response.json();
  }

  // Generate PDF version of summary
  async generateSummaryPDF(investigationId: string, options: {
    includeCompanyBranding: boolean;
    includeBarrierDiagrams: boolean;
    includeTimeline: boolean;
    confidentialityLevel?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/${investigationId}/summary/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': '1',
        'x-user-area-id': '1',
        'x-user-name': 'Investigation User',
        'x-user-email': 'investigator@example.com',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate summary PDF: ${response.statusText}`);
    }

    // Return blob for file download
    return response.blob();
  }

  // Quality assessment utilities
  calculateQualityScore(investigation: InvestigationData): number {
    let score = 0;
    const maxScore = 100;

    // Problem statement completeness (10 points)
    if (investigation.problemStatement.length > 50) score += 10;
    else if (investigation.problemStatement.length > 20) score += 5;

    if (investigation.investigationType === 'barrier-analysis') {
      // Barrier analysis scoring (50 points)
      score += this.calculateBarrierAnalysisScore(investigation);
    } else {
      // Why levels completeness (50 points - 10 per level) - Legacy 5 Whys
      investigation.whyLevels.forEach(why => {
        if (why.answer.length > 20) score += 8;
        if (why.evidence.length > 0) score += 2;
      });
    }

    // Team assignment (15 points)
    if (investigation.investigationTeam.length > 0) score += 10;
    if (investigation.investigationTeam.length > 2) score += 5;

    // Evidence quality (15 points)
    const totalEvidence = this.getTotalEvidenceCount(investigation);
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
  }

  // Calculate barrier analysis specific score
  private calculateBarrierAnalysisScore(investigation: InvestigationData): number {
    let score = 0;
    const maxScore = 50;

    // Barrier identification completeness (25 points)
    const totalBarriers = investigation.barrierCategories.reduce((sum, category) => sum + category.barriers.length, 0);
    const completedBarriers = investigation.barrierCategories.reduce((sum, category) =>
      sum + category.barriers.filter(barrier =>
        barrier.status !== 'Present' ||
        barrier.failureMode.length > 0 ||
        barrier.failureReason.length > 0
      ).length, 0);

    if (totalBarriers > 0) {
      score += Math.round((completedBarriers / totalBarriers) * 25);
    }

    // Failure analysis quality (25 points)
    const barriersWithAnalysis = investigation.barrierCategories.reduce((sum, category) =>
      sum + category.barriers.filter(barrier =>
        barrier.failureMode.length > 20 && barrier.failureReason.length > 20
      ).length, 0);

    if (totalBarriers > 0) {
      score += Math.round((barriersWithAnalysis / totalBarriers) * 25);
    }

    return Math.min(score, maxScore);
  }

  // Get total evidence count across all methodologies
  private getTotalEvidenceCount(investigation: InvestigationData): number {
    let count = 0;

    // Add evidence from barrier analysis
    if (investigation.investigationType === 'barrier-analysis') {
      count += investigation.barrierCategories.reduce((sum, category) =>
        sum + category.barriers.reduce((barrierSum, barrier) => barrierSum + barrier.evidence.length, 0), 0);
    }

    // Add evidence from 5 whys (for backward compatibility)
    count += investigation.whyLevels.reduce((sum, why) => sum + why.evidence.length, 0);

    // Add initial evidence from incident form
    count += investigation.prePopulatedData?.initialEvidence?.length || 0;

    return count;
  }

  getQualityGrade(score: number): { grade: string; color: string; description: string } {
    if (score >= 90) return { grade: 'A', color: 'text-green-600', description: 'Excellent investigation quality' };
    if (score >= 75) return { grade: 'B', color: 'text-blue-600', description: 'Good investigation quality' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600', description: 'Acceptable investigation quality' };
    return { grade: 'D', color: 'text-red-600', description: 'Investigation requires improvement' };
  }
}

// Export singleton instance
export const investigationService = new InvestigationService();

// Export types for use in components
export type {
  InvestigationData,
  BarrierCategory,
  Barrier,
  WhyLevel,
  Evidence,
  InvestigationAction,
  ApprovalWorkflow,
  InvestigationTask,
  TaskCreationRequest,
  EmailNotificationData
};