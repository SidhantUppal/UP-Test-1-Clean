import { Node, Edge } from 'reactflow';
import { CustomNodeData, CustomEdgeData } from '../types/process.types';

// Update any existing edges to use our custom type and arrows - with safety checks
export function updateEdgeTypes(edges: Edge[]): Edge[] {
  // Safety check: ensure edges is an array
  if (!Array.isArray(edges)) {
    console.warn('updateEdgeTypes: edges is not an array, returning empty array');
    return [];
  }

  return edges.map(edge => {
    // Safety check: ensure edge exists and has basic properties
    if (!edge || !edge.id) {
      console.warn('updateEdgeTypes: invalid edge found, skipping');
      return edge;
    }

    return {
      ...edge,
      type: 'labeled',
      animated: true,
      style: { stroke: '#9ca3af', strokeWidth: 2 },
      markerEnd: 'arrowclosed',
      data: {
        ...edge.data,
        timeLimit: edge.data?.timeLimit || null,
        breachAction: edge.data?.breachAction || null
      }
    };
  });
}

// Check if a node has all required connections
export function checkNodeConnections(
  nodeId: string,
  edges: Edge<CustomEdgeData>[],
  requiredConnections: Record<string, string | null> | undefined
): boolean {
  if (!requiredConnections) return true;

  const nodeEdges = edges.filter(e => e.source === nodeId);

  for (const [label, _] of Object.entries(requiredConnections)) {
    const hasConnection = nodeEdges.some(e => e.data?.label === label);
    if (!hasConnection) return false;
  }

  return true;
}

// Update node connection status
export function updateNodeConnectionStatus(
  nodes: Node<CustomNodeData>[],
  edges: Edge<CustomEdgeData>[]
): Node<CustomNodeData>[] {
  return nodes.map(node => {
    const hasIncoming = edges.some(e => e.target === node.id);
    const hasOutgoing = edges.some(e => e.source === node.id);
    const isConnected = hasIncoming || hasOutgoing;

    // Check if it's a check node and update completion status
    if (node.data.functionType === 'check') {
      const isComplete = checkNodeConnections(
        node.id,
        edges,
        node.data.requiredConnections
      );

      return {
        ...node,
        data: {
          ...node.data,
          isConnected,
          isComplete
        }
      };
    }

    return {
      ...node,
      data: {
        ...node.data,
        isConnected
      }
    };
  });
}

// Get next node ID
export function getNextNodeId(nodes: Node<CustomNodeData>[]): number {
  const maxId = nodes.reduce((max, node) => {
    const id = parseInt(node.id);
    return isNaN(id) ? max : Math.max(max, id);
  }, 0);
  return maxId + 1;
}

// Calculate node position based on drop coordinates
export function calculateNodePosition(
  clientX: number,
  clientY: number,
  reactFlowBounds: DOMRect,
  reactFlowInstance: any
): { x: number; y: number } {
  const position = reactFlowInstance.project({
    x: clientX - reactFlowBounds.left,
    y: clientY - reactFlowBounds.top,
  });

  return position;
}