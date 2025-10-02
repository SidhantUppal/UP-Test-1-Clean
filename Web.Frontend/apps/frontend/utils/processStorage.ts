// Local storage utility for process management
// This is a temporary solution until DB APIs are available

export interface ProcessNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    status?: string;
    description?: string;
    estimatedTime?: string;
    assignedTo?: string;
    [key: string]: any;
  };
}

export interface ProcessEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  data?: {
    timeLimit?: number;
    timeLimitUnit?: string;
    reminder?: number;
    reminderUnit?: string;
    escalation?: number;
    escalationUnit?: string;
    deadlineType?: string;
    deadlineDate?: string;
  };
}

export interface ProcessFlow {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'active' | 'completed' | 'on_hold' | 'archived';
  priority: 'critical' | 'high' | 'medium' | 'low';
  version: string;
  owner: string;
  assignees: string[];
  createdDate: string;
  lastModified: string;
  dueDate?: string;
  nodes: ProcessNode[];
  edges: ProcessEdge[];
  tags: string[];
  department: string;
  estimatedHours: number;
  actualHours?: number;
  metadata?: {
    deployedDate?: string;
    deployedTo?: string;
    procedure?: string;
    authorizationLevel?: string;
    [key: string]: any;
  };
}

const STORAGE_KEY = 't100_processes';
const DEMO_STORAGE_KEY = 't100_demo_processes';

// Get all processes from local storage
export const getProcesses = (): ProcessFlow[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading processes from localStorage:', error);
    return [];
  }
};

// Get demo processes (read-only)
export const getDemoProcesses = (): ProcessFlow[] => {
  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultDemoProcesses();
  } catch (error) {
    console.error('Error reading demo processes from localStorage:', error);
    return getDefaultDemoProcesses();
  }
};

// Save a process
export const saveProcess = (process: ProcessFlow): void => {
  try {
    const processes = getProcesses();
    const existingIndex = processes.findIndex(p => p.id === process.id);
    
    if (existingIndex >= 0) {
      // Update existing process
      processes[existingIndex] = {
        ...process,
        lastModified: new Date().toISOString()
      };
    } else {
      // Add new process
      processes.push({
        ...process,
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString()
      });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(processes));
  } catch (error) {
    console.error('Error saving process to localStorage:', error);
    throw error;
  }
};

// Delete a process
export const deleteProcess = (processId: string): void => {
  try {
    const processes = getProcesses();
    const filtered = processes.filter(p => p.id !== processId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting process from localStorage:', error);
    throw error;
  }
};

// Get a single process by ID
export const getProcessById = (processId: string): ProcessFlow | null => {
  try {
    const processes = [...getProcesses(), ...getDemoProcesses()];
    return processes.find(p => p.id === processId) || null;
  } catch (error) {
    console.error('Error getting process by ID:', error);
    return null;
  }
};

// Archive a process
export const archiveProcess = (processId: string): void => {
  try {
    const processes = getProcesses();
    const process = processes.find(p => p.id === processId);
    if (process) {
      process.status = 'archived';
      process.lastModified = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(processes));
    }
  } catch (error) {
    console.error('Error archiving process:', error);
    throw error;
  }
};

// Initialize demo processes (run once)
export const initializeDemoProcesses = (): void => {
  try {
    const existing = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(getDefaultDemoProcesses()));
    }
  } catch (error) {
    console.error('Error initializing demo processes:', error);
  }
};

// Default demo processes
const getDefaultDemoProcesses = (): ProcessFlow[] => [
  {
    id: 'DEMO-001',
    title: 'Safety Incident Response Process',
    description: 'Standardized workflow for responding to safety incidents including investigation, reporting, and corrective actions.',
    category: 'Safety & Compliance',
    status: 'active',
    priority: 'critical',
    version: '1.0',
    owner: 'Safety Team',
    assignees: ['Sarah Chen', 'Mike Johnson'],
    createdDate: '2024-12-01T10:00:00Z',
    lastModified: '2025-01-15T14:30:00Z',
    tags: ['safety', 'incident', 'emergency'],
    department: 'Safety',
    estimatedHours: 8,
    nodes: [
      {
        id: '1',
        type: 'open',
        position: { x: 100, y: 100 },
        data: { label: 'Incident Reported', status: 'start' }
      },
      {
        id: '2',
        type: 'task',
        position: { x: 300, y: 100 },
        data: { 
          label: 'Initial Response',
          description: 'Secure area and ensure safety',
          assignedTo: 'First Responder',
          estimatedTime: '15 minutes'
        }
      },
      {
        id: '3',
        type: 'decision',
        position: { x: 500, y: 100 },
        data: { label: 'Severity Assessment' }
      },
      {
        id: '4',
        type: 'alert',
        position: { x: 700, y: 50 },
        data: { 
          label: 'Major Incident Alert',
          description: 'Notify senior management'
        }
      },
      {
        id: '5',
        type: 'task',
        position: { x: 700, y: 150 },
        data: { 
          label: 'Standard Investigation',
          assignedTo: 'Safety Officer'
        }
      },
      {
        id: '6',
        type: 'checklist',
        position: { x: 900, y: 100 },
        data: { 
          label: 'Investigation Checklist',
          description: 'Complete all required steps'
        }
      },
      {
        id: '7',
        type: 'authorise',
        position: { x: 1100, y: 100 },
        data: { 
          label: 'Report Approval',
          authorizationLevel: 'Manager'
        }
      },
      {
        id: '8',
        type: 'close',
        position: { x: 1300, y: 100 },
        data: { label: 'Incident Closed' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', label: 'Major' },
      { id: 'e3-5', source: '3', target: '5', label: 'Minor' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7' },
      { id: 'e7-8', source: '7', target: '8' }
    ],
    metadata: {
      deployedDate: '2024-12-01T10:00:00Z',
      deployedTo: 'Production',
      authorizationLevel: 'Manager'
    }
  },
  {
    id: 'DEMO-002',
    title: 'New Employee Onboarding Workflow',
    description: 'Comprehensive onboarding process for new employees including documentation, training, and system access.',
    category: 'Human Resources',
    status: 'active',
    priority: 'high',
    version: '2.1',
    owner: 'HR Department',
    assignees: ['John Smith', 'Emma Wilson'],
    createdDate: '2024-11-15T09:00:00Z',
    lastModified: '2025-01-10T11:20:00Z',
    tags: ['hr', 'onboarding', 'training'],
    department: 'Human Resources',
    estimatedHours: 40,
    actualHours: 35,
    nodes: [
      {
        id: '1',
        type: 'open',
        position: { x: 100, y: 100 },
        data: { label: 'New Hire Start' }
      },
      {
        id: '2',
        type: 'checklist',
        position: { x: 300, y: 100 },
        data: { 
          label: 'Documentation Checklist',
          description: 'Collect all required documents'
        }
      },
      {
        id: '3',
        type: 'task',
        position: { x: 500, y: 100 },
        data: { 
          label: 'IT Setup',
          assignedTo: 'IT Department',
          estimatedTime: '2 hours'
        }
      },
      {
        id: '4',
        type: 'task',
        position: { x: 700, y: 100 },
        data: { 
          label: 'Department Orientation',
          assignedTo: 'Department Manager',
          estimatedTime: '4 hours'
        }
      },
      {
        id: '5',
        type: 'procedure',
        position: { x: 900, y: 100 },
        data: { 
          label: 'Training Program',
          procedure: 'PROC-TRAINING-001'
        }
      },
      {
        id: '6',
        type: 'authorise',
        position: { x: 1100, y: 100 },
        data: { 
          label: 'Probation Review',
          authorizationLevel: 'Director'
        }
      },
      {
        id: '7',
        type: 'close',
        position: { x: 1300, y: 100 },
        data: { label: 'Onboarding Complete' }
      }
    ],
    edges: [
      { 
        id: 'e1-2', 
        source: '1', 
        target: '2',
        data: {
          timeLimit: 1,
          timeLimitUnit: 'days',
          reminder: 12,
          reminderUnit: 'hours'
        }
      },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { 
        id: 'e4-5', 
        source: '4', 
        target: '5',
        data: {
          timeLimit: 1,
          timeLimitUnit: 'weeks'
        }
      },
      { 
        id: 'e5-6', 
        source: '5', 
        target: '6',
        data: {
          timeLimit: 90,
          timeLimitUnit: 'days',
          escalation: 7,
          escalationUnit: 'days'
        }
      },
      { id: 'e6-7', source: '6', target: '7' }
    ],
    metadata: {
      deployedDate: '2024-11-15T09:00:00Z',
      deployedTo: 'Production',
      authorizationLevel: 'Director'
    }
  },
  {
    id: 'DEMO-003',
    title: 'Equipment Maintenance Workflow',
    description: 'Regular maintenance process for critical equipment including inspection, servicing, and certification.',
    category: 'Operations',
    status: 'active',
    priority: 'medium',
    version: '1.5',
    owner: 'Operations Team',
    assignees: ['Tom Davis', 'Lisa Wong'],
    createdDate: '2024-10-20T08:00:00Z',
    lastModified: '2025-01-12T16:45:00Z',
    tags: ['maintenance', 'equipment', 'operations'],
    department: 'Operations',
    estimatedHours: 16,
    nodes: [
      {
        id: '1',
        type: 'open',
        position: { x: 100, y: 150 },
        data: { label: 'Maintenance Due' }
      },
      {
        id: '2',
        type: 'task',
        position: { x: 300, y: 150 },
        data: { 
          label: 'Schedule Downtime',
          assignedTo: 'Operations Manager'
        }
      },
      {
        id: '3',
        type: 'checklist',
        position: { x: 500, y: 150 },
        data: { 
          label: 'Pre-Maintenance Checks',
          description: 'Safety and preparation checklist'
        }
      },
      {
        id: '4',
        type: 'procedure',
        position: { x: 700, y: 150 },
        data: { 
          label: 'Maintenance Procedure',
          procedure: 'MAINT-PROC-001'
        }
      },
      {
        id: '5',
        type: 'decision',
        position: { x: 900, y: 150 },
        data: { label: 'Pass Inspection?' }
      },
      {
        id: '6',
        type: 'fail',
        position: { x: 1100, y: 50 },
        data: { 
          label: 'Failed - Repair Required',
          procedure: 'REPAIR-PROC-001'
        }
      },
      {
        id: '7',
        type: 'authorise',
        position: { x: 1100, y: 250 },
        data: { 
          label: 'Certify Equipment',
          authorizationLevel: 'Supervisor'
        }
      },
      {
        id: '8',
        type: 'close',
        position: { x: 1300, y: 150 },
        data: { label: 'Maintenance Complete' }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6', label: 'No' },
      { id: 'e5-7', source: '5', target: '7', label: 'Yes' },
      { id: 'e6-4', source: '6', target: '4', label: 'After Repair' },
      { id: 'e7-8', source: '7', target: '8' }
    ],
    metadata: {
      deployedDate: '2024-10-20T08:00:00Z',
      deployedTo: 'Production',
      authorizationLevel: 'Supervisor'
    }
  }
];

// Export all processes (user + demo) for display
export const getAllProcesses = (): ProcessFlow[] => {
  return [...getProcesses(), ...getDemoProcesses()];
};

// Check if a process is a demo process
export const isDemoProcess = (processId: string): boolean => {
  return processId.startsWith('DEMO-');
};

// Initialize Permit to Work process
export const initializePermitToWorkProcess = (): void => {
  try {
    const processes = getProcesses();
    // Remove any existing permit to work process to ensure fresh data
    const filteredProcesses = processes.filter(p => p.id !== 'PROC-PTW-001');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProcesses));
    
    // Always add the new process with updated layout
      const newPermitProcess: ProcessFlow = {
        id: 'PROC-PTW-001',
        title: 'Permit to Work',
        description: 'Complete permit-to-work process including contractor verification, permit approval, LOTO procedures, and work sign-off',
        category: 'Safety & Compliance',
        status: 'active',
        priority: 'critical',
        version: '1.0',
        owner: 'Safety Manager',
        assignees: ['John Smith', 'Sarah Chen', 'Mike Johnson'],
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        tags: ['permit', 'safety', 'contractor', 'loto', 'compliance'],
        department: 'Operations',
        estimatedHours: 24,
        actualHours: 0,
        nodes: [
          {
            id: '1',
            type: 'open',
            position: { x: 400, y: 50 },
            data: { 
              label: 'Work Commissioned',
              description: 'Work request initiated and approved',
              status: 'start'
            }
          },
          {
            id: '2',
            type: 'task',
            position: { x: 400, y: 200 },
            data: { 
              label: 'Contractor Engaged',
              description: 'Select and engage appropriate contractor',
              assignedTo: 'Operations Manager',
              estimatedTime: '2 hours'
            }
          },
          {
            id: '3',
            type: 'checklist',
            position: { x: 400, y: 350 },
            data: { 
              label: 'Contractor Checked',
              description: 'Verify contractor compliance and certifications',
              assignedTo: 'Safety Officer',
              estimatedTime: '1 hour'
            }
          },
          {
            id: 'decision1',
            type: 'decision',
            position: { x: 400, y: 500 },
            data: { 
              label: 'Contractor Approved?',
              description: 'Is contractor compliant with all requirements?'
            }
          },
          {
            id: '4',
            type: 'task',
            position: { x: 400, y: 650 },
            data: { 
              label: 'Permits Sent',
              description: 'Send permit application to contractor',
              assignedTo: 'Permit Coordinator',
              estimatedTime: '30 minutes'
            }
          },
          {
            id: '5',
            type: 'authorise',
            position: { x: 400, y: 800 },
            data: { 
              label: 'Permits Approved',
              description: 'Review and approve permit application',
              authorizationLevel: 'Manager',
              estimatedTime: '2 hours'
            }
          },
          {
            id: 'decision2',
            type: 'decision',
            position: { x: 400, y: 950 },
            data: { 
              label: 'LOTO Required?',
              description: 'Does work require Lock Out Tag Out procedures?'
            }
          },
          {
            id: '6',
            type: 'task',
            position: { x: 400, y: 1100 },
            data: { 
              label: 'Work Started',
              description: 'Contractor begins work on site',
              assignedTo: 'Site Supervisor',
              estimatedTime: '30 minutes'
            }
          },
          {
            id: '7',
            type: 'procedure',
            position: { x: 600, y: 1100 },
            data: { 
              label: 'LOTO Started',
              description: 'Lock Out Tag Out procedure initiated',
              procedure: 'LOTO-PROC-001',
              assignedTo: 'Authorized Person',
              estimatedTime: '1 hour'
            }
          },
          {
            id: '8',
            type: 'task',
            position: { x: 600, y: 1250 },
            data: { 
              label: 'LOTO Closed',
              description: 'Lock Out Tag Out procedure completed and verified',
              assignedTo: 'Authorized Person',
              estimatedTime: '30 minutes'
            }
          },
          {
            id: '9',
            type: 'task',
            position: { x: 400, y: 1400 },
            data: { 
              label: 'Permit Closed',
              description: 'Close permit after work completion',
              assignedTo: 'Permit Coordinator',
              estimatedTime: '30 minutes'
            }
          },
          {
            id: 'decision3',
            type: 'decision',
            position: { x: 400, y: 1550 },
            data: { 
              label: 'Work Satisfactory?',
              description: 'Does completed work meet all requirements?'
            }
          },
          {
            id: '10',
            type: 'authorise',
            position: { x: 400, y: 1700 },
            data: { 
              label: 'Work Signed Off',
              description: 'Final inspection and sign-off of completed work',
              authorizationLevel: 'Director',
              estimatedTime: '1 hour'
            }
          },
          {
            id: '11',
            type: 'close',
            position: { x: 400, y: 1850 },
            data: { 
              label: 'Process Complete',
              status: 'end'
            }
          },
          {
            id: 'reject1',
            type: 'fail',
            position: { x: 200, y: 500 },
            data: { 
              label: 'Contractor Rejected',
              description: 'Return to contractor selection',
              procedure: 'CONTRACTOR-REJECT-001'
            }
          },
          {
            id: 'rework',
            type: 'task',
            position: { x: 200, y: 1550 },
            data: { 
              label: 'Rework Required',
              description: 'Address issues and repeat work',
              assignedTo: 'Site Supervisor',
              estimatedTime: '4 hours'
            }
          }
        ],
        edges: [
          { 
            id: 'e1-2', 
            source: '1', 
            target: '2',
            data: {
              timeLimit: 2,
              timeLimitUnit: 'hours',
              reminder: 1,
              reminderUnit: 'hours'
            }
          },
          { 
            id: 'e2-3', 
            source: '2', 
            target: '3',
            data: {
              timeLimit: 4,
              timeLimitUnit: 'hours'
            }
          },
          { 
            id: 'e3-decision1', 
            source: '3', 
            target: 'decision1'
          },
          { 
            id: 'edecision1-4', 
            source: 'decision1', 
            target: '4',
            label: 'Yes',
            sourceHandle: 'bottom'
          },
          { 
            id: 'edecision1-reject', 
            source: 'decision1', 
            target: 'reject1',
            label: 'No',
            sourceHandle: 'left'
          },
          { 
            id: 'ereject-2', 
            source: 'reject1', 
            target: '2',
            label: 'Try Again'
          },
          { 
            id: 'e4-5', 
            source: '4', 
            target: '5',
            data: {
              timeLimit: 24,
              timeLimitUnit: 'hours',
              escalation: 4,
              escalationUnit: 'hours'
            }
          },
          { 
            id: 'e5-decision2', 
            source: '5', 
            target: 'decision2'
          },
          { 
            id: 'edecision2-6', 
            source: 'decision2', 
            target: '6',
            label: 'No LOTO',
            sourceHandle: 'bottom'
          },
          { 
            id: 'edecision2-7', 
            source: 'decision2', 
            target: '7',
            label: 'LOTO Required',
            sourceHandle: 'right'
          },
          { 
            id: 'e7-8', 
            source: '7', 
            target: '8',
            data: {
              timeLimit: 8,
              timeLimitUnit: 'hours'
            }
          },
          { 
            id: 'e6-9', 
            source: '6', 
            target: '9'
          },
          { 
            id: 'e8-9', 
            source: '8', 
            target: '9'
          },
          { 
            id: 'e9-decision3', 
            source: '9', 
            target: 'decision3'
          },
          { 
            id: 'edecision3-10', 
            source: 'decision3', 
            target: '10',
            label: 'Approved',
            sourceHandle: 'bottom'
          },
          { 
            id: 'edecision3-rework', 
            source: 'decision3', 
            target: 'rework',
            label: 'Issues Found',
            sourceHandle: 'left'
          },
          { 
            id: 'erework-6', 
            source: 'rework', 
            target: '6',
            label: 'Retry'
          },
          { 
            id: 'e10-11', 
            source: '10', 
            target: '11' 
          }
        ],
        metadata: {
          deployedDate: new Date().toISOString(),
          deployedTo: 'Production',
          authorizationLevel: 'Director',
          procedure: 'LOTO-PROC-001'
        }
      };
      
      saveProcess(newPermitProcess);
  } catch (error) {
    console.error('Error initializing Permit to Work process:', error);
  }
};