import React, { useState, useMemo, useCallback } from 'react';
import {
  EdgeProps,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  Node,
  useReactFlow
} from 'reactflow';
import { OUTPUT_PRESETS } from '../constants/outputPresets';

// Base component that handles the edge rendering
export function LabeledEdgeBase({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  selected,
  source,
  nodes,
  onLabelChange,
}: EdgeProps & { source?: string; nodes: Node[]; onLabelChange: (edgeId: string, label: string) => void }) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [showLabelSelector, setShowLabelSelector] = useState(false);

  // Check if this edge is from a Check node
  const sourceNode = useMemo(() => {
    return nodes.find(n => n.id === source);
  }, [source, nodes]);

  const isFromCheckNode = sourceNode?.data?.functionType === 'check';
  const availableOptions = sourceNode?.data?.outputOptions || ['Yes', 'No'];

  // Determine styles based on selection
  const edgeStyle = {
    ...style,
    stroke: selected ? '#3b82f6' : (style?.stroke || '#9ca3af'),
    strokeWidth: selected ? 3 : (style?.strokeWidth || 2),
  };

  const selectedMarker = selected ? 'arrowselected' : 'arrowclosed';

  const handleLabelClick = (e: React.MouseEvent) => {
    if (isFromCheckNode) {
      e.stopPropagation();
      setShowLabelSelector(!showLabelSelector);
    }
  };

  const handleOptionSelect = (option: string) => {
    onLabelChange(id, option);
    setShowLabelSelector(false);
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={selectedMarker}
        style={edgeStyle}
      />
      {(data?.label || isFromCheckNode) && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <div
              onClick={handleLabelClick}
              style={{
                background: 'white',
                padding: '2px 6px',
                border: selected ? '1px solid #3b82f6' : '1px solid #9ca3af',
                borderRadius: '4px',
                color: selected ? '#3b82f6' : '#000',
                fontWeight: selected ? 'bold' : 'normal',
                cursor: isFromCheckNode ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {data?.label || 'Select...'}
              {isFromCheckNode && (
                <span style={{ fontSize: '10px', opacity: 0.6 }}>▼</span>
              )}
            </div>
            {showLabelSelector && isFromCheckNode && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '4px',
                  background: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  minWidth: '120px',
                  zIndex: 1000,
                }}
              >
                {availableOptions.map((option: string) => (
                  <div
                    key={option}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect(option);
                    }}
                    style={{
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLDivElement).style.background = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLDivElement).style.background = 'white';
                    }}
                  >
                    {option}
                    {data?.label === option && (
                      <span style={{ float: 'right', color: '#3b82f6' }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

// Wrapper component that will have access to React Flow context
export default function LabeledEdge(props: EdgeProps) {
  const { getNodes, setEdges } = useReactFlow();

  const handleLabelChange = useCallback((edgeId: string, label: string) => {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === edgeId
          ? {
              ...edge,
              data: {
                ...edge.data,
                label: label,
              },
            }
          : edge
      )
    );
  }, [setEdges]);

  return <LabeledEdgeBase {...props} nodes={getNodes()} onLabelChange={handleLabelChange} />;
}