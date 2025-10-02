import { Node, Edge, Connection } from 'reactflow';

// Process function types
export type FunctionType =
  | 'checklist'
  | 'action'
  | 'escalation'
  | 'risk-assessment'
  | 'confirm'
  | 'authorise'
  | 'alert'
  | 'failure-procedure'
  | 'check';

// SaaS Function definition
export interface SaaSFunction {
  id: FunctionType;
  label: string;
  icon: string;
  color: string;
  borderColor?: string;
  description: string;
}

// Custom node data structure
export interface CustomNodeData {
  label: string;
  functionType: string;
  icon: string;
  secondaryTitle?: string;
  configured?: boolean;
  isSelected?: boolean;
  configInProgress?: boolean;
  isConnected?: boolean;
  outputOptions?: string[];
  requiredConnections?: Record<string, string | null>;
  isComplete?: boolean;
}

// Edge data structure
export interface CustomEdgeData {
  label?: string;
  condition?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  type?: 'default' | 'conditional' | 'error' | 'alternate';
  breachTime?: number;
  breachTimeUnit?: 'seconds' | 'minutes' | 'hours' | 'days';
  breachAction?: 'alert' | 'escalate' | 'terminate' | 'redirect';
  escalateTo?: string;
  isFromCheckNode?: boolean;
}

// Process metadata
export interface ProcessMetadata {
  processId: number;
  processName: string;
  workflowTitle: string;
  chainVersion: number;
  isDraft: boolean;
  isPublished: boolean;
  lastSaved: Date | null;
  lastModified?: string;
}

// Mock data structure
export interface MockMetrics {
  processCount: number;
  avgCompletionTime: string;
  successRate: number;
  activeNodes: number;
  connections: number;
  estimatedTime?: string;
  totalHours?: number;
  highPriorityTasks?: number;
}

// Output preset configuration
export interface OutputPreset {
  label: string;
  options: string[];
}

export type OutputPresetKey = 'yes-no' | 'complete' | 'in-place' | 'pass-fail' | 'approved' | 'custom';

// Task generation
export interface GeneratedTask {
  id: string;
  nodeId?: string;
  edgeId?: string;
  title: string;
  type: 'process' | 'monitoring';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: string;
  assignedRole: string;
  description?: string;
}

export interface GeneratedItems {
  tasks: GeneratedTask[];
  total: number;
  estimatedTime: string;
  highPriority: number;
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

// Process state
export interface ProcessState {
  nodes: Node<CustomNodeData>[];
  edges: Edge<CustomEdgeData>[];
  selectedNode: Node<CustomNodeData> | null;
  selectedEdge: Edge<CustomEdgeData> | null;
  nextNodeId: number;
  workflowTitle: string;
  isPublished: boolean;
  isDraft: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  validationResult: ValidationResult | null;
}