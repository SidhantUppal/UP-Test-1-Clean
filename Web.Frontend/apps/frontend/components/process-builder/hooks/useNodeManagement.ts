import { useCallback, useState } from 'react';
import { Node, Edge } from 'reactflow';
import { CustomNodeData, CustomEdgeData } from '../types/process.types';
import { getNextNodeId, updateNodeConnectionStatus } from '../utils/nodeUtils';
import { saasfunctions } from '../constants/nodeDefinitions';

export function useNodeManagement(
  nodes: Node<CustomNodeData>[],
  setNodes: React.Dispatch<React.SetStateAction<Node<CustomNodeData>[]>>,
  edges: Edge<CustomEdgeData>[],
  setEdges: React.Dispatch<React.SetStateAction<Edge<CustomEdgeData>[]>>
) {
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge<CustomEdgeData> | null>(null);

  // Handle node selection
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node<CustomNodeData>) => {
    console.log('Node clicked:', node);
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  // Handle edge selection
  const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge<CustomEdgeData>) => {
    console.log('Edge clicked:', edge);
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Clear selection when clicking on pane
  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Delete selected node
  const deleteNode = useCallback(() => {
    if (!selectedNode) return;

    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  // Delete selected edge
  const deleteEdge = useCallback(() => {
    if (!selectedEdge) return;

    setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
    setSelectedEdge(null);
  }, [selectedEdge, setEdges]);

  // Add a new node
  const addNode = useCallback((type: string, position: { x: number; y: number }) => {
    const functionDef = saasfunctions.find(f => f.id === type);
    if (!functionDef) return;

    const newNodeId = String(getNextNodeId(nodes));
    const newNode: Node<CustomNodeData> = {
      id: newNodeId,
      type: 'custom',
      position,
      data: {
        label: functionDef.label,
        functionType: type,
        icon: functionDef.icon,
        secondaryTitle: '',
        configured: false,
        isSelected: false,
        configInProgress: false,
        isConnected: false
      }
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  // Update node configuration
  const updateNodeConfiguration = useCallback((nodeId: string, config: Partial<CustomNodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...config
              }
            }
          : node
      )
    );
  }, [setNodes]);

  // Update connection status for all nodes
  const updateConnectionStatus = useCallback(() => {
    const updatedNodes = updateNodeConnectionStatus(nodes, edges);
    setNodes(updatedNodes);
  }, [nodes, edges, setNodes]);

  return {
    selectedNode,
    selectedEdge,
    handleNodeClick,
    handleEdgeClick,
    handlePaneClick,
    deleteNode,
    deleteEdge,
    addNode,
    updateNodeConfiguration,
    updateConnectionStatus
  };
}