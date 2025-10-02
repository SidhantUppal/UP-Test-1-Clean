"use client";

interface QuickReportButtonProps {
  onClick: () => void;
}

export default function QuickReportButton({ onClick }: QuickReportButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ 
        backgroundColor: '#3d3a72', 
        color: '#ffffff', 
        border: 'none',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        fontWeight: '500',
        cursor: 'pointer',
        fontSize: '24px',
        transition: 'opacity 0.2s',
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: '50',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="hover:opacity-80"
      title="Quick Environmental Report"
    >
      +
    </button>
  );
}