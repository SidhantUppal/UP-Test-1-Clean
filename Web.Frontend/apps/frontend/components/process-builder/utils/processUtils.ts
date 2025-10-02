import { Node, Edge } from 'reactflow';
import { CustomNodeData, CustomEdgeData, ValidationResult, GeneratedItems, GeneratedTask } from '../types/process.types';

// Validate the process flow
export function validateProcess(
  nodes: Node<CustomNodeData>[],
  edges: Edge<CustomEdgeData>[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check for start and end nodes
  const startNodes = nodes.filter(n => n.data.functionType === 'start');
  const endNodes = nodes.filter(n => n.data.functionType === 'end');

  if (startNodes.length === 0) {
    errors.push('Process must have at least one Start node');
  }
  if (startNodes.length > 1) {
    warnings.push('Process has multiple Start nodes - consider consolidating');
  }
  if (endNodes.length === 0) {
    errors.push('Process must have at least one End node');
  }

  // Check for orphaned nodes
  const orphanedNodes = nodes.filter(node => {
    if (node.data.functionType === 'start' || node.data.functionType === 'end') return false;
    const hasIncoming = edges.some(e => e.target === node.id);
    const hasOutgoing = edges.some(e => e.source === node.id);
    return !hasIncoming || !hasOutgoing;
  });

  orphanedNodes.forEach(node => {
    warnings.push(`Node "${node.data.label}" is not fully connected`);
  });

  // Check for unconfigured nodes
  const unconfiguredNodes = nodes.filter(n =>
    !n.data.configured && n.data.functionType !== 'start' && n.data.functionType !== 'end'
  );

  unconfiguredNodes.forEach(node => {
    warnings.push(`Node "${node.data.label}" is not configured`);
  });

  // Check for check nodes with incomplete connections
  const checkNodes = nodes.filter(n => n.data.functionType === 'check');
  checkNodes.forEach(node => {
    const nodeEdges = edges.filter(e => e.source === node.id);
    const outputOptions = node.data.outputOptions || [];

    outputOptions.forEach(option => {
      const hasEdgeForOption = nodeEdges.some(e => e.data?.label === option);
      if (!hasEdgeForOption) {
        warnings.push(`Check node "${node.data.label}" missing connection for output "${option}"`);
      }
    });
  });

  // Add suggestions
  if (nodes.length < 3) {
    suggestions.push('Consider adding more process steps for better clarity');
  }
  if (!nodes.some(n => n.data.functionType === 'risk-assessment')) {
    suggestions.push('Consider adding a Risk Assessment step');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions
  };
}

// Generate tasks from the process
export function generateTasks(
  nodes: Node<CustomNodeData>[],
  edges: Edge<CustomEdgeData>[]
): GeneratedItems {
  const tasks: GeneratedTask[] = [];
  let taskId = 1;

  // Generate tasks for configured action nodes
  nodes
    .filter(n => n.data.configured && n.data.functionType === 'action')
    .forEach(node => {
      tasks.push({
        id: `task-${taskId++}`,
        nodeId: node.id,
        title: `Complete ${node.data.label}`,
        type: 'process',
        priority: 'medium',
        estimatedTime: '2 hours',
        assignedRole: 'Operator',
        description: node.data.secondaryTitle || `Execute ${node.data.label} action`
      });
    });

  // Generate tasks for check nodes
  nodes
    .filter(n => n.data.functionType === 'check' && n.data.configured)
    .forEach(node => {
      tasks.push({
        id: `task-${taskId++}`,
        nodeId: node.id,
        title: `Perform ${node.data.label}`,
        type: 'process',
        priority: 'high',
        estimatedTime: '1 hour',
        assignedRole: 'Supervisor',
        description: `Make decision for ${node.data.label}`
      });
    });

  // Generate monitoring tasks for edges with breach times
  edges
    .filter(e => e.data?.breachTime)
    .forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);

      tasks.push({
        id: `task-${taskId++}`,
        edgeId: edge.id,
        title: `Monitor: ${sourceNode?.data.label} → ${targetNode?.data.label}`,
        type: 'monitoring',
        priority: edge.data?.breachAction === 'escalate' ? 'critical' : 'medium',
        estimatedTime: `${edge.data?.breachTime} ${edge.data?.breachTimeUnit}`,
        assignedRole: 'System',
        description: `Monitor transition and ${edge.data?.breachAction} if breach occurs`
      });
    });

  // Calculate summary
  const highPriorityCount = tasks.filter(t => t.priority === 'high' || t.priority === 'critical').length;
  const totalHours = tasks.reduce((sum, task) => {
    const match = task.estimatedTime.match(/(\d+)\s*hour/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  return {
    tasks,
    total: tasks.length,
    estimatedTime: `${totalHours} hours`,
    highPriority: highPriorityCount
  };
}

// Save process to localStorage
export function saveProcessToStorage(
  nodes: Node<CustomNodeData>[],
  edges: Edge<CustomEdgeData>[],
  workflowTitle: string
): void {
  const processData = {
    nodes,
    edges,
    workflowTitle,
    lastModified: new Date().toISOString()
  };
  localStorage.setItem('processBuilder_draft', JSON.stringify(processData));
}

// Load process from localStorage
export function loadProcessFromStorage(): {
  nodes: Node<CustomNodeData>[];
  edges: Edge<CustomEdgeData>[];
  workflowTitle: string;
  lastModified?: string;
} | null {
  const saved = localStorage.getItem('processBuilder_draft');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Failed to parse saved process:', error);
      return null;
    }
  }
  return null;
}