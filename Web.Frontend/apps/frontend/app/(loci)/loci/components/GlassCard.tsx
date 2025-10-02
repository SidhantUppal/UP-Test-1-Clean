import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'magenta' | 'success' | 'error' | 'warning';
}

export function GlassCard({ children, className = '', hover = true, glow }: GlassCardProps) {
  const glowStyles = {
    cyan: 'hover:shadow-loci-glow-cyan',
    magenta: 'hover:shadow-loci-glow-magenta',
    success: 'hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]',
    error: 'hover:shadow-[0_0_20px_rgba(255,0,85,0.5)]',
    warning: 'hover:shadow-[0_0_20px_rgba(255,184,0,0.5)]',
  };

  return (
    <div 
      className={`
        loci-glass-card 
        ${hover ? 'hover:transform hover:translate-y-[-2px]' : ''} 
        ${glow ? glowStyles[glow] : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}