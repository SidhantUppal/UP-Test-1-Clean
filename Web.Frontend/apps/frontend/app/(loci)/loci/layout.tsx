import Link from 'next/link';
import { ReactNode } from 'react';
import './globals.css';

export default function LOCILayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <>
      <div className="min-h-screen bg-loci-dark">
        <header className="fixed top-0 w-full z-50 bg-loci-darker/80 backdrop-blur-xl border-b border-loci-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-8">
              <Link href="/" className="group">
                <h1 className="text-2xl font-bold">
                  <span className="text-loci-cyan group-hover:text-loci-cyan/80 transition-colors">[[[</span>
                  <span className="text-white mx-2 group-hover:text-gray-200 transition-colors">LOCI SYSTEM</span>
                  <span className="text-loci-magenta group-hover:text-loci-magenta/80 transition-colors">v2.0</span>
                  <span className="text-loci-cyan group-hover:text-loci-cyan/80 transition-colors">]]]</span>
                </h1>
              </Link>
              
              <nav className="flex items-center space-x-6">
                <Link 
                  href="/loci/dashboard" 
                  className="text-loci-text-secondary hover:text-loci-cyan transition-colors duration-200 font-mono text-sm"
                >
                  DASHBOARD
                </Link>
                <Link 
                  href="/loci/pages" 
                  className="text-loci-text-secondary hover:text-loci-cyan transition-colors duration-200 font-mono text-sm"
                >
                  PAGES
                </Link>
                <Link 
                  href="/loci/scanner" 
                  className="text-loci-text-secondary hover:text-loci-cyan transition-colors duration-200 font-mono text-sm"
                >
                  SCANNER
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-loci-success rounded-full animate-pulse"></div>
                <span className="text-loci-success font-mono text-sm">LIVE</span>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-20 px-6 pb-6">
          <div className="max-w-[1800px] mx-auto">
            {children}
          </div>
        </main>

        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-loci-cyan/5 via-transparent to-loci-magenta/5"></div>
        </div>
      </div>
    </>
  );
}