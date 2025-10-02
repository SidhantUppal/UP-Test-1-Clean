'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDevOverlay } from '@/contexts/DevOverlayContext';

interface ElementInfo {
  id: string;
  rect: DOMRect;
  element: Element;
  isAuto?: boolean;
  text?: string;
}

export function DevOverlay() {
  const { isOverlayEnabled, highlightedElement, setHighlightedElement } = useDevOverlay();
  const [elements, setElements] = useState<ElementInfo[]>([]);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Auto-assign IDs to unmarked elements
  const autoAssignIds = useCallback(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const counters = { B: 1000, L: 1000, I: 1000, D: 1000, T: 1000, F: 1000 };
    
    // Skip common navigation/layout selectors
    const skipSelectors = [
      'nav', 'header', 'footer', '[role="navigation"]', 
      '.navbar', '.nav', '.navigation', '.menu',
      '[class*="navigation"]', '[class*="navbar"]', '[class*="sidebar"]'
    ];
    
    const shouldSkipElement = (element: Element) => {
      // Skip if in navigation areas
      if (element.closest(skipSelectors.join(', '))) return true;
      
      // Skip pagination buttons
      if (element.className.includes('pagination') || 
          element.className.includes('page-link')) return true;
      
      // Skip close/dismiss buttons
      const text = element.textContent?.trim().toLowerCase() || '';
      if (text === 'x' || text === '×' || text === 'close') return true;
      
      // Skip if parent is already marked
      if (element.parentElement?.hasAttribute('data-permission-id')) return true;
      
      return false;
    };
    
    // Buttons - only action buttons, not navigation
    document.querySelectorAll('button:not([data-permission-id])').forEach((btn) => {
      if (shouldSkipElement(btn)) return;
      
      const text = btn.textContent?.trim() || 'Button';
      const id = `B${counters.B++}`;
      btn.setAttribute('data-permission-id', id);
      btn.setAttribute('data-auto-assigned', 'true');
      btn.setAttribute('data-element-text', text);
    });

    // Links - only action links, not navigation
    document.querySelectorAll('a:not([data-permission-id])').forEach((link) => {
      if (shouldSkipElement(link)) return;
      
      // Skip external links
      const href = link.getAttribute('href') || '';
      if (href.startsWith('http://') || href.startsWith('https://')) return;
      
      // Only mark links that look like actions (View, Edit, etc.)
      const text = link.textContent?.trim() || '';
      const actionWords = ['view', 'edit', 'delete', 'download', 'export', 'import', 'details', 'manage', 'create', 'add', 'new'];
      const isAction = actionWords.some(word => text.toLowerCase().includes(word));
      
      if (isAction || link.closest('table, .card, .modal')) {
        const id = `L${counters.L++}`;
        link.setAttribute('data-permission-id', id);
        link.setAttribute('data-auto-assigned', 'true');
        link.setAttribute('data-element-text', text);
      }
    });

    // Inputs - only in forms/modals
    document.querySelectorAll('input:not([type="hidden"]):not([data-permission-id])').forEach((input) => {
      if (shouldSkipElement(input)) return;
      
      // Only mark inputs in forms or modals
      if (input.closest('form, .modal, .card')) {
        const placeholder = input.getAttribute('placeholder') || input.getAttribute('name') || 'Input';
        const id = `I${counters.I++}`;
        input.setAttribute('data-permission-id', id);
        input.setAttribute('data-auto-assigned', 'true');
        input.setAttribute('data-element-text', placeholder);
      }
    });

    // Selects/Dropdowns - only in forms/modals
    document.querySelectorAll('select:not([data-permission-id])').forEach((select) => {
      if (shouldSkipElement(select)) return;
      
      if (select.closest('form, .modal, .card')) {
        const name = select.getAttribute('name') || 'Dropdown';
        const id = `D${counters.D++}`;
        select.setAttribute('data-permission-id', id);
        select.setAttribute('data-auto-assigned', 'true');
        select.setAttribute('data-element-text', name);
      }
    });

    // Textareas - only in forms/modals
    document.querySelectorAll('textarea:not([data-permission-id])').forEach((textarea) => {
      if (shouldSkipElement(textarea)) return;
      
      if (textarea.closest('form, .modal, .card')) {
        const placeholder = textarea.getAttribute('placeholder') || 'Textarea';
        const id = `T${counters.T++}`;
        textarea.setAttribute('data-permission-id', id);
        textarea.setAttribute('data-auto-assigned', 'true');
        textarea.setAttribute('data-element-text', placeholder);
      }
    });
  }, []);

  const scanForElements = useCallback(() => {
    try {
      // First auto-assign IDs
      autoAssignIds();

      const elementsWithPermissionId = document.querySelectorAll('[data-permission-id]');
      const elementInfos: ElementInfo[] = [];

      elementsWithPermissionId.forEach((element) => {
        try {
          // Skip SVG elements and their children
          if (element instanceof SVGElement || element.closest('svg')) {
            return;
          }

          const id = element.getAttribute('data-permission-id');
          const isAuto = element.getAttribute('data-auto-assigned') === 'true';
          const text = element.getAttribute('data-element-text') || '';
          
          if (id) {
            const rect = element.getBoundingClientRect();
            // Only include visible elements with valid dimensions
            if (rect.width > 0 && rect.height > 0 && rect.width < window.innerWidth && rect.height < window.innerHeight) {
              elementInfos.push({ id, rect, element, isAuto, text });
            }
          }
        } catch (err) {
          // Skip problematic elements
          console.warn('DevOverlay: Skipped element due to error', err);
        }
      });

      setElements(elementInfos);
    } catch (err) {
      console.error('DevOverlay: Error scanning elements', err);
      setElements([]);
    }
  }, [autoAssignIds]);

  useEffect(() => {
    if (!isOverlayEnabled) {
      setElements([]);
      return;
    }

    // Initial scan with a small delay to ensure DOM is ready
    const initialTimer = setTimeout(scanForElements, 100);

    // Debounced update handler
    let updateTimer: NodeJS.Timeout;
    const handleUpdate = () => {
      clearTimeout(updateTimer);
      updateTimer = setTimeout(scanForElements, 150);
    };

    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    // Only rescan when content changes (via MutationObserver)
    const observer = new MutationObserver(() => {
      handleUpdate();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-permission-id']
    });

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(updateTimer);
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
      observer.disconnect();
    };
  }, [isOverlayEnabled, scanForElements]);

  if (!isOverlayEnabled) return null;

  return (
    <>
      {/* Overlay elements */}
      {elements.map(({ id, rect, isAuto, text }, index) => {
        try {
          // Validate rect values
          if (!rect || isNaN(rect.top) || isNaN(rect.left) || isNaN(rect.width) || isNaN(rect.height)) {
            return null;
          }

          // Skip if element is outside viewport
          if (rect.top > window.innerHeight || rect.bottom < 0 || rect.left > window.innerWidth || rect.right < 0) {
            return null;
          }

          const isHovered = hoveredElement === id || highlightedElement === id;

          return (
            <div
              key={`${id}-${index}`}
              className="fixed pointer-events-auto z-[9998]"
              style={{
                top: `${Math.max(0, rect.top)}px`,
                left: `${Math.max(0, rect.left)}px`,
                width: `${Math.min(rect.width, window.innerWidth - rect.left)}px`,
                height: `${Math.min(rect.height, window.innerHeight - rect.top)}px`,
              }}
              onMouseEnter={() => {
                setHoveredElement(id);
                setHighlightedElement(id);
              }}
              onMouseLeave={() => {
                setHoveredElement(null);
                setHighlightedElement(null);
              }}
            >
              {/* Highlight border */}
              <div
                className={`absolute inset-0 border-2 transition-all pointer-events-none ${
                  isHovered
                    ? 'border-blue-500 bg-blue-500/10'
                    : isAuto
                    ? 'border-orange-400/50 bg-orange-400/5'
                    : 'border-purple-400/50 bg-purple-400/5'
                }`}
              />
              
              {/* ID Label */}
              <div
                className={`absolute -top-7 left-0 px-2 py-1 font-bold rounded transition-all shadow-lg pointer-events-none flex items-center gap-1 ${
                  isHovered
                    ? 'bg-blue-500 text-white scale-110'
                    : isAuto
                    ? 'bg-orange-500 text-white'
                    : 'bg-purple-600 text-white'
                }`}
                style={{
                  fontSize: '12px',
                  lineHeight: '1.2',
                  minWidth: '45px',
                }}
              >
                {id}
                {isAuto && (
                  <span className="text-xs font-normal opacity-90">AUTO</span>
                )}
              </div>

              {/* Element text tooltip on hover */}
              {isHovered && text && (
                <div
                  className="absolute left-0 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg pointer-events-none whitespace-nowrap"
                  style={{
                    top: '-28px',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  "{text}"
                </div>
              )}
            </div>
          );
        } catch (err) {
          console.warn('DevOverlay: Error rendering element', id, err);
          return null;
        }
      })}

      {/* Control Panel */}
      <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-[9999] max-w-sm">
        <div className="text-sm font-semibold mb-2">Permission Dev Overlay</div>
        <div className="text-xs space-y-1">
          <div>Total elements: {elements.length}</div>
          <div className="flex gap-3">
            <span className="text-purple-400">
              Manual: {elements.filter(e => !e.isAuto).length}
            </span>
            <span className="text-orange-400">
              Auto: {elements.filter(e => e.isAuto).length}
            </span>
          </div>
          <div className="mb-2">
            Hovered: {hoveredElement ? (
              <span className="font-bold text-blue-400">{hoveredElement}</span>
            ) : (
              <span className="text-gray-400">none</span>
            )}
          </div>
          
          {/* ID Format Legend */}
          <div className="pt-2 border-t border-gray-700">
            <div className="text-xs font-semibold mb-1">ID Format:</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div><span className="text-blue-400">B###</span> = Button</div>
              <div><span className="text-blue-400">L###</span> = Link</div>
              <div><span className="text-blue-400">C###</span> = Card</div>
              <div><span className="text-blue-400">T###</span> = Table</div>
              <div><span className="text-blue-400">F###</span> = Form</div>
              <div><span className="text-blue-400">I###</span> = Input</div>
              <div><span className="text-blue-400">D###</span> = Dropdown</div>
              <div><span className="text-blue-400">M###</span> = Modal</div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-700 mt-2">
            <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl</kbd> + 
            <kbd className="px-2 py-1 bg-gray-800 rounded text-xs ml-1">Shift</kbd> + 
            <kbd className="px-2 py-1 bg-gray-800 rounded text-xs ml-1">D</kbd> to toggle
          </div>
        </div>
      </div>
    </>
  );
}

// Wrapper component to ensure proper rendering
export function DevOverlayWrapper() {
  const { isOverlayEnabled } = useDevOverlay();

  if (!isOverlayEnabled || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]" style={{ isolation: 'isolate' }}>
      <DevOverlay />
    </div>
  );
}