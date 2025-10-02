import React from 'react';
import { Handle, Position } from 'reactflow';
import { CustomNodeData } from '../types/process.types';
import { saasfunctions } from '../constants/nodeDefinitions';

interface CustomNodeProps {
  data: CustomNodeData;
  selected?: boolean;
  id?: string;
}

function CustomNode({ data, selected, id }: CustomNodeProps) {
  // Special styling for start and end nodes
  const isStart = data.functionType === 'start';
  const isEnd = data.functionType === 'end';
  const isCheck = data.functionType === 'check';

  // Determine completion status for check nodes
  const checkNodeStatus = isCheck ? (
    !data.outputOptions || data.outputOptions.length === 0 ? 'unconfigured' :
    data.isComplete ? 'complete' :
    Object.values(data.requiredConnections || {}).some(v => v) ? 'partial' : 'incomplete'
  ) : null;

  let nodeColor = saasfunctions.find(f => f.id === data.functionType)?.color || 'var(--color-primary)';
  let borderColor = saasfunctions.find(f => f.id === data.functionType)?.borderColor || '#d1d5db';

  // Override colors for start and end nodes
  if (isStart) {
    nodeColor = '#22c55e'; // Green background
    borderColor = '#16a34a'; // Darker green border
  } else if (isEnd) {
    nodeColor = '#ef4444'; // Red background
    borderColor = '#dc2626'; // Darker red border
  } else if (isCheck) {
    // Color based on completion status for check nodes
    if (checkNodeStatus === 'complete') {
      borderColor = '#16a34a'; // green when complete
    } else if (checkNodeStatus === 'partial') {
      borderColor = '#eab308'; // yellow when partial
    } else if (checkNodeStatus === 'unconfigured') {
      borderColor = '#f59e0b'; // amber when unconfigured
    } else {
      borderColor = '#ef4444'; // red when incomplete
    }
  }

  // Determine visual state
  const isBeingManaged = selected || data.isSelected === true;
  const isConfigured = data.configured === true;
  const configInProgress = data.configInProgress === true;
  const isDecision = false; // Removed diamond shape - all nodes are rectangular now

  // Check if node is connected (has incoming or outgoing edges)
  const isConnected = data.isConnected === true;
  const isStartOrEnd = data.functionType === 'start' || data.functionType === 'end';
  const isUnconnected = !isConnected && !isStartOrEnd;

  // Dynamic styling based on state
  const getBorderStyle = () => {
    if (isBeingManaged) {
      return {
        borderWidth: '6px',
        borderColor: '#9ca3af',
        boxShadow: '0 0 20px rgba(156, 163, 175, 0.4), 0 0 40px rgba(156, 163, 175, 0.2)',
        animation: 'pulse 2s ease-in-out infinite'
      };
    } else if (isUnconnected) {
      return {
        borderWidth: '3px',
        borderColor: '#f97316', // Orange color
        boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)',
      };
    } else if (isConfigured) {
      return {
        borderWidth: '4px',
        borderColor: '#9ca3af',
        boxShadow: '0 2px 8px rgba(156, 163, 175, 0.2)'
      };
    } else {
      return {
        borderWidth: '2px',
        borderColor: borderColor
      };
    }
  };

  // Diamond shape for decision nodes (kept for legacy compatibility but not used)
  if (isDecision) {
    return (
      <>
        {/* Add pulse animation styles */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 20px rgba(156, 163, 175, 0.4), 0 0 40px rgba(156, 163, 175, 0.2);
            }
            50% {
              box-shadow: 0 0 30px rgba(156, 163, 175, 0.6), 0 0 60px rgba(156, 163, 175, 0.3);
            }
          }
        `}</style>

        <div
          className="shadow-md hover:shadow-lg transition-all relative"
          style={{
            backgroundColor: nodeColor,
            color: '#000000',
            width: '120px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: 'solid',
            transform: 'rotate(45deg)',
            borderRadius: '8px',
            ...getBorderStyle()
          }}
        >
          {/* Bidirectional handles on all sides */}
          <Handle
            type="target"
            position={Position.Top}
            id="target-top"
            style={{ background: '#9ca3af', width: '16px', height: '16px', top: '-8px', border: '2px solid white' }}
          />
          <Handle
            type="source"
            position={Position.Top}
            id="source-top"
            style={{ background: 'transparent', width: '16px', height: '16px', top: '-8px' }}
          />
          <Handle
            type="target"
            position={Position.Bottom}
            id="target-bottom"
            style={{ background: '#9ca3af', width: '16px', height: '16px', bottom: '-8px', border: '2px solid white' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="source-bottom"
            style={{ background: 'transparent', width: '16px', height: '16px', bottom: '-8px' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="target-left"
            style={{ background: '#9ca3af', width: '16px', height: '16px', left: '-8px', border: '2px solid white' }}
          />
          <Handle
            type="source"
            position={Position.Left}
            id="source-left"
            style={{ background: 'transparent', width: '16px', height: '16px', left: '-8px' }}
          />
          <Handle
            type="target"
            position={Position.Right}
            id="target-right"
            style={{ background: '#9ca3af', width: '16px', height: '16px', right: '-8px', border: '2px solid white' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="source-right"
            style={{ background: 'transparent', width: '16px', height: '16px', right: '-8px' }}
          />

          {/* Configuration Status Badge */}
          {isConfigured && !configInProgress && (
            <div
              style={{
                position: 'absolute',
                top: isBeingManaged ? '2px' : '2px',
                right: isBeingManaged ? '18px' : '2px',
                backgroundColor: '#e5e7eb',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 11,
                transform: 'rotate(-45deg)'
              }}
            >
              ✅
            </div>
          )}

          {/* Configuration In Progress Badge */}
          {configInProgress && !isBeingManaged && (
            <div
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 10,
                animation: 'pulse 2s ease-in-out infinite',
                transform: 'rotate(-45deg)'
              }}
            >
              ⚙️
            </div>
          )}

          {/* Being Managed Indicator */}
          {isBeingManaged && (
            <div
              style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                backgroundColor: '#9ca3af',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'black',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                zIndex: 10,
                animation: 'pulse 1.5s ease-in-out infinite',
                transform: 'rotate(-45deg)'
              }}
            >
              ⚙️
            </div>
          )}

          <div style={{
            transform: 'rotate(-45deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            position: 'relative'
          }}>
            {/* Text at the top */}
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', lineHeight: '1.2' }}>
                {data.label}
              </div>

              {data.secondaryTitle && (
                <div style={{
                  fontSize: '10px',
                  opacity: 0.9,
                  marginTop: '2px',
                  fontStyle: 'italic',
                  lineHeight: '1.1'
                }}>
                  {data.secondaryTitle}
                </div>
              )}
            </div>

            {/* Icon removed - no longer displaying icons inside nodes */}
          </div>
        </div>
      </>
    );
  }

  // Regular rectangular nodes for all other types
  return (
    <>
      {/* Add pulse animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(156, 163, 175, 0.4), 0 0 40px rgba(156, 163, 175, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(156, 163, 175, 0.6), 0 0 60px rgba(156, 163, 175, 0.3);
          }
        }
      `}</style>

      <div
        className="rounded-lg shadow-md hover:shadow-lg transition-all relative"
        style={{
          backgroundColor: nodeColor,
          color: (isStart || isEnd) ? '#FFFFFF' : '#000000',  // White text for start/end nodes
          padding: (isStart || isEnd) ? '12px' : '8px',  // Larger padding for start/end
          minWidth: (isStart || isEnd) ? '210px' : '140px',  // 50% wider for start/end
          minHeight: (isStart || isEnd) ? '90px' : '60px',  // 50% taller for start/end
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          border: 'solid',
          ...getBorderStyle()
        }}
      >
        {/* Bidirectional handles on all sides */}
        <Handle
          type="target"
          position={Position.Top}
          id="target-top"
          style={{ background: '#9ca3af', width: '16px', height: '16px', top: '-8px', border: '2px solid white' }}
        />
        <Handle
          type="source"
          position={Position.Top}
          id="source-top"
          style={{ background: 'transparent', width: '16px', height: '16px', top: '-8px' }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="target-left"
          style={{ background: '#9ca3af', width: '16px', height: '16px', left: '-8px', border: '2px solid white' }}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="source-left"
          style={{ background: 'transparent', width: '16px', height: '16px', left: '-8px' }}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="target-right"
          style={{ background: '#9ca3af', width: '16px', height: '16px', right: '-8px', border: '2px solid white' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="source-right"
          style={{ background: 'transparent', width: '16px', height: '16px', right: '-8px' }}
        />

        {/* Configuration Status Badge */}
        {isConfigured && !configInProgress && (
          <div
            style={{
              position: 'absolute',
              top: isBeingManaged ? '-2px' : '-2px',
              right: isBeingManaged ? '18px' : '-2px', // Move left when being managed to avoid overlap
              backgroundColor: '#e5e7eb',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 11 // Higher than blue gear
            }}
          >
            ✅
          </div>
        )}

        {/* Configuration In Progress Badge */}
        {configInProgress && !isBeingManaged && (
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 10,
              animation: 'pulse 2s ease-in-out infinite'
            }}
          >
            ⚙️
          </div>
        )}

        {/* Being Managed Indicator */}
        {isBeingManaged && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#9ca3af',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'black',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              zIndex: 10,
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            ⚙️
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative'
        }}>
          {/* Text at the top */}
          <div style={{ textAlign: 'center', marginTop: '6px' }}>
            <div style={{
              fontSize: (isStart || isEnd) ? '18px' : '13px',  // Larger text for start/end
              fontWeight: (isStart || isEnd) ? '800' : '700',  // Bolder for start/end
              lineHeight: '1.2'
            }}>
              {data.label}
            </div>

            {data.secondaryTitle && (
              <div style={{
                fontSize: (isStart || isEnd) ? '14px' : '11px',  // Larger secondary text for start/end
                opacity: 0.9,
                marginTop: '2px',
                fontStyle: 'italic',
                lineHeight: '1.1'
              }}>
                {data.secondaryTitle}
              </div>
            )}
          </div>

          {/* Icon removed - no longer displaying icons inside nodes */}
        </div>

        {/* Output options removed from node visual - now shown as edge labels */}

        <Handle
          type="target"
          position={Position.Bottom}
          id="target-bottom"
          style={{ background: '#9ca3af', width: '16px', height: '16px', bottom: '-8px', border: '2px solid white' }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="source-bottom"
          style={{ background: 'transparent', width: '16px', height: '16px', bottom: '-8px' }}
        />
      </div>
    </>
  );
}

export default CustomNode;