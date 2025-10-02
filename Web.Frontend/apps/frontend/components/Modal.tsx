import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  icon?: string;
}

export default function Modal({ isOpen, onClose, children, title, icon }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000]" 
        onClick={onClose}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[10001] p-4 pointer-events-none">
        <div 
          className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl pointer-events-auto"
          style={{ backgroundColor: 'white' }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 z-10">
            <div className="flex justify-between items-center">
              {title && (
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {icon && <span className="text-2xl">{icon}</span>}
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}