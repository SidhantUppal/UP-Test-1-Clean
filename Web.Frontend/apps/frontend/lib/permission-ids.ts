/**
 * Permission ID Registry
 * 
 * Format: [Type][Number]
 * - B = Button (B001, B002, etc.)
 * - L = Link (L001, L002, etc.)
 * - C = Card/Container (C001, C002, etc.)
 * - T = Table (T001, T002, etc.)
 * - F = Form (F001, F002, etc.)
 * - I = Input (I001, I002, etc.)
 * - D = Dropdown (D001, D002, etc.)
 * - M = Modal (M001, M002, etc.)
 */

export const PermissionIDs = {
  // Navigation Links
  NAV_CONTRACTORS: 'L001',
  NAV_CONTRACTORS_MANAGE: 'L002',
  NAV_ADMIN_USERS: 'L003',
  NAV_DOCUMENTS: 'L004',
  NAV_CHECKLISTS: 'L005',
  NAV_TASKS: 'L006',
  NAV_PROCESSES: 'L007',
  NAV_ADMIN_DASHBOARD: 'L008',

  // Contractor Buttons
  CTR_CREATE: 'B001',
  CTR_EDIT: 'B002',
  CTR_DELETE: 'B003',
  CTR_APPROVE: 'B004',
  CTR_REJECT: 'B005',
  CTR_SUSPEND: 'B006',
  CTR_EXPORT: 'B007',
  CTR_IMPORT: 'B008',
  CTR_REFRESH: 'B009',

  // Contractor Cards
  CTR_COMPLIANCE_CARD: 'C001',
  CTR_FINANCIAL_CARD: 'C002',
  CTR_ACTIVE_COUNT_CARD: 'C003',
  CTR_PENDING_CARD: 'C004',

  // Contractor Table
  CTR_MAIN_TABLE: 'T001',
  CTR_COMPLIANCE_TABLE: 'T002',

  // Contractor Dropdowns
  CTR_STATUS_FILTER: 'D001',
  CTR_TYPE_FILTER: 'D002',
  CTR_DATE_FILTER: 'D003',

  // Contractor Forms
  CTR_CREATE_FORM: 'F001',
  CTR_EDIT_FORM: 'F002',

  // Document Management
  DOC_UPLOAD: 'B010',
  DOC_SEARCH: 'I001',
  DOC_FILTER_TYPE: 'D004',
  DOC_LIBRARY_CARD: 'C005',

  // Checklists
  CHK_CREATE: 'B020',
  CHK_ASSIGN: 'B021',
  CHK_COMPLETE: 'B022',
  CHK_TEMPLATE_CARD: 'C010',

  // Tasks
  TSK_CREATE: 'B030',
  TSK_ASSIGN: 'B031',
  TSK_COMPLETE: 'B032',
  TSK_KANBAN_VIEW: 'C020',

  // Admin
  ADM_USER_CREATE: 'B040',
  ADM_TENANT_MANAGE: 'B041',
  ADM_BILLING_VIEW: 'B042',
  ADM_MONITORING_CARD: 'C030',

  // Modals
  CTR_CREATE_MODAL: 'M001',
  CTR_EDIT_MODAL: 'M002',
  DOC_UPLOAD_MODAL: 'M003',
  CHK_ASSIGN_MODAL: 'M004',

  // Process Home Page
  PROC_BUILDER_BTN: 'B060',
  PROC_ANALYTICS_BTN: 'B061',
  PROC_VIEW_ALL_ACTIVITY: 'B062',
  PROC_VIEW_PROCESS_1: 'L040',
  PROC_VIEW_PROCESS_2: 'L041',
  PROC_VIEW_PROCESS_3: 'L042',
  PROC_VIEW_DETAILS_1: 'L043',
  PROC_VIEW_DETAILS_2: 'L044',
  PROC_VIEW_DETAILS_3: 'L045',
  PROC_VIEW_DETAILS_4: 'L046',
  PROC_PREVIEW_1: 'L047',
  PROC_PREVIEW_2: 'L048',
  PROC_PREVIEW_3: 'L049',
  PROC_PREVIEW_4: 'L050',
  PROC_ACTIVE_CARD: 'C040',
  PROC_WORKFLOW_CARD: 'C041',
  PROC_EFFICIENCY_CARD: 'C042',
  PROC_AUTOMATION_CARD: 'C043',
  PROC_COMPLIANCE_CARD: 'C044',
  PROC_ACTIVITY_CARD: 'C045',
} as const;

// Helper to get next available ID for a type
export function getNextId(type: 'B' | 'L' | 'C' | 'T' | 'F' | 'I' | 'D' | 'M'): string {
  const existing = Object.values(PermissionIDs)
    .filter(id => id.startsWith(type))
    .map(id => parseInt(id.slice(1)))
    .sort((a, b) => b - a);
  
  const nextNum = existing[0] ? existing[0] + 1 : 1;
  return `${type}${nextNum.toString().padStart(3, '0')}`;
}

// Type for the IDs
export type PermissionID = typeof PermissionIDs[keyof typeof PermissionIDs];