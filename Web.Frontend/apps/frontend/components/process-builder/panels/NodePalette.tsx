import React from 'react';
import { saasfunctions } from '../constants/nodeDefinitions';

export default function NodePalette() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="card bg-base-200 p-4 h-full max-h-[600px] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 sticky top-0 bg-base-200 pb-2 z-10">
        Node Palette
      </h3>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-base-content/70 uppercase tracking-wide">
          Core Functions
        </div>

        {saasfunctions.map((func) => (
          <div
            key={func.id}
            className="node-palette-item bg-base-100 p-3 rounded-lg border-2 border-base-300 cursor-move hover:border-primary hover:bg-primary/5 transition-all select-none"
            onDragStart={(event) => onDragStart(event, func.id)}
            draggable
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={func.label}>
                {func.icon}
              </span>
              <div className="flex-1">
                <div className="font-medium text-sm">{func.label}</div>
                <div className="text-xs text-base-content/70 mt-0.5">
                  {func.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-base-300">
        <p className="text-xs text-base-content/50 italic">
          Drag nodes onto the canvas to add them to your process flow
        </p>
      </div>
    </div>
  );
}