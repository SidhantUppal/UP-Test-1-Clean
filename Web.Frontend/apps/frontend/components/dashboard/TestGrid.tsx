"use client";

import React from 'react';
import GridLayout from 'react-grid-layout';

// Import CSS directly
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const layout = [
  {i: 'a', x: 0, y: 0, w: 1, h: 2},
  {i: 'b', x: 1, y: 0, w: 1, h: 2},
  {i: 'c', x: 2, y: 0, w: 1, h: 2}
];

export default function TestGrid() {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Test Grid - Try dragging the boxes below</h2>
      <div style={{ height: '400px' }}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={3}
          rowHeight={120}
          width={800}
          isDraggable={true}
          isResizable={true}
          onLayoutChange={(newLayout) => console.log('Layout changed:', newLayout)}
          margin={[10, 10]}
          containerPadding={[0, 0]}
        >
          <div key="a" className="bg-red-200 p-4 rounded" style={{ border: '1px solid #ccc' }}>
            <h3 className="font-bold">Widget A</h3>
            <p>Drag me!</p>
          </div>
          <div key="b" className="bg-blue-200 p-4 rounded" style={{ border: '1px solid #ccc' }}>
            <h3 className="font-bold">Widget B</h3>
            <p>Resize me!</p>
          </div>
          <div key="c" className="bg-green-200 p-4 rounded" style={{ border: '1px solid #ccc' }}>
            <h3 className="font-bold">Widget C</h3>
            <p>Move me around!</p>
          </div>
        </GridLayout>
      </div>
      
      <style jsx global>{`
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top;
        }
        .react-grid-item.cssTransforms {
          transition-property: transform;
        }
        .react-grid-item.resizing {
          transition: none;
          z-index: 1;
          will-change: width, height;
        }
        .react-grid-item.react-draggable-dragging {
          transition: none;
          z-index: 3;
          will-change: transform;
        }
        .react-grid-item > .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><path d="m6 6h-6v-1h5v-5h1z" fill="%23999"/></svg>') no-repeat bottom right;
          cursor: nw-resize;
        }
      `}</style>
    </div>
  );
}