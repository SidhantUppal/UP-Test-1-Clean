"use client";

interface QuickReportButtonProps {
  onClick: () => void;
}

export default function QuickReportButton({ onClick }: QuickReportButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        backgroundColor: '#3d3a72',
        color: '#ffffff',
        border: 'none',
        padding: '16px 24px',
        borderRadius: '50px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s',
        zIndex: 40
      }}
      className="hover:opacity-90 hover:scale-105"
      aria-label="Quick Report"
    >
      Report
    </button>
  );
}