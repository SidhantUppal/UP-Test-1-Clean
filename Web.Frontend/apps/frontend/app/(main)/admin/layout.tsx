"use client";

import "../../../styles/globals.css";
import Link from "next/link";
import AdminSidebar from "./components/AdminSidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [systemStatus, setSystemStatus] = useState<'online' | 'warning' | 'critical'>('online');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Set initial client state
    setIsClient(true);
    setCurrentTime(new Date());
    
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate system status changes
    const statusInterval = setInterval(() => {
      const random = Math.random();
      if (random > 0.95) {
        setSystemStatus('critical');
      } else if (random > 0.85) {
        setSystemStatus('warning');
      } else {
        setSystemStatus('online');
      }
    }, 5000);

    return () => clearInterval(statusInterval);
  }, []);

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'online': return 'text-cyan-400 animate-pulse';
      case 'warning': return 'text-yellow-400 animate-pulse';
      case 'critical': return 'text-red-400 animate-pulse';
    }
  };

  const getPageTitle = () => {
    const path = pathname?.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      <style jsx global>{`
        /* Glowing text animation */
        @keyframes glow {
          0%, 100% { 
            text-shadow: 
              0 0 5px rgba(0, 255, 255, 0.8),
              0 0 10px rgba(0, 255, 255, 0.6),
              0 0 15px rgba(0, 255, 255, 0.4),
              0 0 20px rgba(0, 255, 255, 0.2);
          }
          50% { 
            text-shadow: 
              0 0 10px rgba(0, 255, 255, 1),
              0 0 20px rgba(0, 255, 255, 0.8),
              0 0 30px rgba(0, 255, 255, 0.6),
              0 0 40px rgba(0, 255, 255, 0.4);
          }
        }

        /* Holographic text effect */
        @keyframes holographic {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        /* Matrix-style text animation */
        @keyframes matrix {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 1; }
        }

        /* Apply amazing text effects to admin pages */
        .admin-text {
          color: #00ffff;
          font-weight: 500;
          text-shadow: 
            0 0 5px rgba(0, 255, 255, 0.8),
            0 0 10px rgba(0, 255, 255, 0.4);
        }

        .admin-text-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .admin-text-holographic {
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ff00, #ffff00, #00ffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: holographic 3s linear infinite;
        }

        /* Enhanced readability for all text */
        .admin-content p, .admin-content span, .admin-content div {
          color: #ffffff !important;
          text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);
        }

        /* Dark text for better visibility on light backgrounds */
        .admin-content .card-body {
          color: #1a1a1a !important;
        }

        .admin-content .card-body p,
        .admin-content .card-body span,
        .admin-content .card-body div,
        .admin-content .card-body td,
        .admin-content .card-body th {
          color: #1a1a1a !important;
          text-shadow: none !important;
        }

        .admin-content .text-base-content {
          color: #1a1a1a !important;
        }

        /* Form elements and inputs */
        .admin-content .form-control label,
        .admin-content .label-text {
          color: #1a1a1a !important;
        }

        /* Stats and metrics */
        .admin-content .stat-title {
          color: #4a5568 !important;
        }

        .admin-content .stat-desc {
          color: #4a5568 !important;
        }

        /* Ensure button text is readable */
        .admin-content .btn {
          color: #1a1a1a !important;
        }

        /* Table headers in admin content */
        .admin-content .card-body th {
          color: #1a1a1a !important;
          font-weight: 600;
        }

        /* Override any opacity classes that make text too light */
        .admin-content .opacity-70 {
          opacity: 0.8 !important;
          color: #2d3748 !important;
        }

        /* Improve spacing and layout */
        .admin-content .card-body {
          padding: 2rem !important;
        }

        .admin-content .space-y-6 > * + * {
          margin-top: 2rem !important;
        }

        .admin-content .space-y-4 > * + * {
          margin-top: 1.5rem !important;
        }

        .admin-content .space-y-3 > * + * {
          margin-top: 1rem !important;
        }

        .admin-content .grid {
          gap: 1.5rem !important;
        }

        .admin-content .stat {
          padding: 1.5rem !important;
        }

        .admin-content table {
          border-spacing: 0 0.5rem !important;
        }

        .admin-content td, .admin-content th {
          padding: 1rem !important;
        }

        .admin-content .form-control {
          margin-bottom: 1.5rem !important;
        }

        .admin-content .btn {
          padding: 0.75rem 1.5rem !important;
          margin: 0.25rem !important;
        }

        /* Table text enhancement */
        .admin-content table {
          color: #ffffff !important;
        }

        .admin-content th {
          color: #00ffff !important;
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
        }

        .admin-content td {
          color: #e0e0e0 !important;
        }

        /* Badge and button text enhancement */
        .badge {
          text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          font-weight: 600;
        }

        .btn {
          text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
          font-weight: 600;
        }

        /* Card text enhancement */
        .card-body {
          color: #e0e0e0;
        }

        .card-title {
          color: #00ffff !important;
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
        }

        /* Input field text */
        input, select, textarea {
          color: #ffffff !important;
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(0, 255, 255, 0.3) !important;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }

        /* Stat values with neon glow */
        .stat-value {
          color: #00ffff !important;
          text-shadow: 
            0 0 10px rgba(0, 255, 255, 0.8),
            0 0 20px rgba(0, 255, 255, 0.4);
        }

        /* Label enhancement */
        .label-text {
          color: #a0a0a0 !important;
        }

        /* Amazing neon pulse effect */
        @keyframes neonPulse {
          0% {
            color: #00ffff;
            text-shadow: 
              0 0 5px #00ffff,
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 40px #0088ff,
              0 0 80px #0088ff;
          }
          50% {
            color: #ff00ff;
            text-shadow: 
              0 0 5px #ff00ff,
              0 0 10px #ff00ff,
              0 0 20px #ff00ff,
              0 0 40px #ff0088,
              0 0 80px #ff0088;
          }
          100% {
            color: #00ffff;
            text-shadow: 
              0 0 5px #00ffff,
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 40px #0088ff,
              0 0 80px #0088ff;
          }
        }

        /* Electric text effect */
        @keyframes electric {
          0%, 100% {
            text-shadow: 
              0 0 2px #fff,
              0 0 4px #fff,
              0 0 6px #00ffff,
              0 0 8px #00ffff,
              0 0 10px #00ffff,
              0 0 12px #00ffff,
              0 0 14px #00ffff;
          }
          50% {
            text-shadow: 
              0 0 4px #fff,
              0 0 8px #fff,
              0 0 12px #ff00ff,
              0 0 16px #ff00ff,
              0 0 20px #ff00ff,
              0 0 24px #ff00ff,
              0 0 28px #ff00ff;
          }
        }

        /* Apply to headings */
        h1, h2, h3, h4, h5, h6 {
          color: #ffffff !important;
          animation: electric 2s ease-in-out infinite;
        }

        /* Special class for super amazing text */
        .neon-text {
          animation: neonPulse 3s ease-in-out infinite;
          font-weight: bold;
          letter-spacing: 0.1em;
        }

        /* Ensure all text is visible */
        * {
          color: #e0e0e0;
        }

        /* Override for dark elements */
        .text-base-content {
          color: #e0e0e0 !important;
        }

        .text-gray-900, .text-gray-800, .text-gray-700, .text-gray-600 {
          color: #e0e0e0 !important;
        }

        /* Make opacity text more visible */
        .opacity-70 {
          opacity: 0.85 !important;
        }

        .opacity-50 {
          opacity: 0.7 !important;
        }
      `}</style>
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0a0a0f 1px, transparent 1px),
              linear-gradient(to bottom, #0a0a0f 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </div>

      {/* Sci-Fi Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"></div>
        
        <div className="relative h-full flex items-center px-6">
          {/* Logo/Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl"></div>
              <div className="relative bg-gray-900 border border-cyan-400/50 p-3 rounded-lg">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <Link href="/" className="group">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-wider group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
                T100 SYS ADMIN
              </h1>
              <p className="text-xs text-gray-500 font-mono tracking-widest group-hover:text-gray-400 transition-colors">COMMAND CENTER v2.0</p>
            </Link>
          </div>

          {/* Center Section - Page Title & Status */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-gray-900/50 border border-cyan-500/20 rounded-full px-8 py-3">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                  <span className="text-xs font-mono text-gray-400">SYSTEM</span>
                  <span className="text-sm font-bold text-cyan-400">{systemStatus.toUpperCase()}</span>
                </div>
                <div className="w-px h-4 bg-cyan-500/30"></div>
                <div className="text-sm font-mono text-gray-400">
                  MODULE: <span className="text-cyan-400 font-bold">{getPageTitle()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Time, Search, Profile */}
          <div className="flex items-center space-x-6">
            {/* Live Time Display */}
            <div className="hidden lg:block">
              <div className="text-xs font-mono text-gray-500">SYSTEM TIME</div>
              <div className="text-sm font-mono text-cyan-400">
                {isClient && currentTime ? currentTime.toLocaleTimeString('en-US', { hour12: false }) : '--:--:--'}
              </div>
            </div>

            {/* Neural Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Neural Search..." 
                className="bg-gray-800/50 border border-cyan-500/30 text-gray-300 text-sm rounded-lg px-4 py-2 w-48 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 font-mono placeholder-gray-600" 
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            {/* Admin Profile */}
            <div className="relative group">
              <button className="relative flex items-center space-x-3 bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-2 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-400/50 blur-md"></div>
                  <div className="relative w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-xs">
                    SA
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono text-gray-400">OPERATOR</div>
                  <div className="text-sm font-bold text-purple-400">SYS_ADMIN_01</div>
                </div>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="p-4 border-b border-purple-500/20">
                  <div className="text-sm font-mono text-gray-400">CLEARANCE LEVEL</div>
                  <div className="text-lg font-bold text-purple-400">OMEGA</div>
                </div>
                <div className="p-2">
                  <Link href="/admin/profile" className="block px-3 py-2 text-sm text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors duration-200">
                    <span className="font-mono">→</span> Operator Profile
                  </Link>
                  <Link href="/admin/settings" className="block px-3 py-2 text-sm text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors duration-200">
                    <span className="font-mono">→</span> System Settings
                  </Link>
                  <Link href="/admin/security" className="block px-3 py-2 text-sm text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors duration-200">
                    <span className="font-mono">→</span> Security Protocols
                  </Link>
                  <hr className="my-2 border-purple-500/20" />
                  <Link href="/logout" className="block px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded transition-colors duration-200">
                    <span className="font-mono">→</span> System Logout
                  </Link>
                </div>
              </div>
            </div>

            {/* Command Center Button */}
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-bold px-6 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95">
              COMMAND
            </button>
          </div>
        </div>

        {/* Bottom Border Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </nav>

      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="relative ml-16 pt-20 min-h-screen transition-all duration-300">
        <div className="relative z-10 p-8">
          {/* Page Header with Holographic Effect */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl"></div>
              <h2 className="relative text-3xl font-bold admin-text-holographic tracking-wider font-mono">
                {getPageTitle().toUpperCase()} INTERFACE
              </h2>
            </div>
            <div className="mt-2 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent max-w-md"></div>
          </div>

          {/* Content Container with Sci-Fi Border */}
          <div className="relative admin-content">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg shadow-[0_0_50px_rgba(0,255,255,0.1)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              
              {children}
            </div>
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="pointer-events-none fixed inset-0 z-50">
          <div className="scanline"></div>
        </div>
      </main>

      <style jsx>{`
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.2), transparent);
          animation: scan 8s linear infinite;
        }

        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}