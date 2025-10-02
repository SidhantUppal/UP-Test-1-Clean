import { ButtonHTMLAttributes, ReactNode } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'cyan' | 'magenta' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export function NeonButton({ 
  children, 
  variant = 'cyan', 
  size = 'md',
  className = '',
  ...props 
}: NeonButtonProps) {
  const variants = {
    cyan: 'border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF] hover:text-loci-dark',
    magenta: 'border-[#FF00F5] text-[#FF00F5] hover:bg-[#FF00F5] hover:text-loci-dark',
    success: 'border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-loci-dark',
    error: 'border-[#FF0055] text-[#FF0055] hover:bg-[#FF0055] hover:text-loci-dark',
    warning: 'border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-loci-dark',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={`
        loci-neon-button
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}