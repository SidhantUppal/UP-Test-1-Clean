// Mock data for node configuration forms
export const mockData = {
  checklist: {
    title: "Safety Inspection Checklist",
    checklistId: null,
    checklistName: "",
    assignedTo: "Safety Officer",
    assignedRole: "Safety Officer",
    dueDate: "2025-01-15",
    priority: "High",
    generateTask: true
  },
  action: {
    title: "Perform Safety Check",
    description: "Complete safety inspection of work area",
    assignedTo: "Site Manager",
    assignedRole: "Site Manager",
    dueDate: "2025-01-14",
    priority: "High",
    estimatedHours: 2,
    generateTask: true
  },
  escalation: {
    title: "Escalate Safety Issue",
    reason: "Safety compliance not met",
    escalateFrom: "Site Manager",
    escalateTo: "Regional Manager",
    escalationLevel: 2,
    urgency: "High",
    generateTask: true
  },
  "risk-assessment": {
    title: "Crane Operation Risk Assessment",
    riskAssessmentId: null,
    riskAssessmentName: "",
    assignedTo: "Safety Officer",
    assignedRole: "Safety Officer",
    dueDate: "2025-01-15",
    generateTask: true
  },
  confirm: {
    title: "Confirm Safety Requirements",
    confirmationMessage: "Please confirm all safety requirements are met",
    assignedTo: "Site Supervisor",
    assignedRole: "Site Supervisor",
    continueOnConfirm: true,
    generateTask: true
  },
  authorise: {
    title: "Authorise Work Commencement",
    authorizationMessage: "Approve work to commence",
    requiredRole: "Project Manager",
    requiredPermission: "approve_work_start",
    assignedTo: "Project Manager",
    continueOnApproval: true,
    generateTask: true
  },
  alert: {
    title: "Safety Alert",
    message: "Safety inspection required",
    recipients: ["All Site Workers", "Safety Team"],
    recipientRoles: ["Site Worker", "Safety Officer"],
    urgency: "Medium",
    channels: ["Email", "SMS", "In-App"],
    blockingNotification: false
  },
  "failure-procedure": {
    title: "Process Failure Handler",
    failureReason: "Safety requirements not met",
    cleanupTasks: [
      { task: "Stop all work", assignedRole: "Site Manager" },
      { task: "Notify safety team", assignedRole: "Safety Officer" },
      { task: "Document incident", assignedRole: "Site Supervisor" }
    ],
    notifications: [
      { role: "Project Manager", channel: "Email" },
      { role: "Safety Officer", channel: "SMS" }
    ],
    terminateProcess: true
  },
  check: {
    title: "Safety Compliance Check",
    checkCriteria: "Are all safety requirements met?",
    description: "Review safety documentation and site conditions",
    assignedTo: "Site Supervisor",
    assignedRole: "Site Supervisor",
    paths: [
      { condition: "Yes", nextNode: "continue" },
      { condition: "No", nextNode: "escalation" },
      { condition: "Partial", nextNode: "review" }
    ],
    generateTask: true
  }
};