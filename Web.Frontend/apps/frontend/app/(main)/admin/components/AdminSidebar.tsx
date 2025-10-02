"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  // Admin navigation items organized by section
  const navigationSections = [
    {
      title: "SYSTEM CORE",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      items: [
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ), 
          label: "Command Dashboard", 
          href: "/admin/dashboard",
          description: "System overview"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ), 
          label: "Entity Management", 
          href: "/admin/permissions",
          description: "Tenant control"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ), 
          label: "Operator Access", 
          href: "/admin/users",
          description: "User management"
        }
      ]
    },
    {
      title: "PLATFORM MATRIX",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      items: [
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ), 
          label: "Trial Protocols", 
          href: "/admin/trials",
          description: "Trial management"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ), 
          label: "Partner Network", 
          href: "/admin/partners",
          description: "Partner portal"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ), 
          label: "System Monitor", 
          href: "/admin/monitoring",
          description: "Live monitoring"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ), 
          label: "Revenue Stream", 
          href: "/admin/billing",
          description: "Billing control"
        }
      ]
    },
    {
      title: "INTELLIGENCE HUB",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      items: [
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ), 
          label: "LORIS Neural Net", 
          href: "/admin/analytics",
          description: "AI analytics"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ), 
          label: "Data Analytics", 
          href: "/admin/reports",
          description: "Reports & insights"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ), 
          label: "Security Matrix", 
          href: "/admin/audit",
          description: "Audit & security"
        }
      ]
    },
    {
      title: "TESTING LAB",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      items: [
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ), 
          label: "Email Testing", 
          href: "/admin/testing/email",
          description: "Test email providers"
        }
      ]
    },
    {
      title: "CONFIGURATION NODE",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: [
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          ), 
          label: "System Config", 
          href: "/admin/config",
          description: "Configuration"
        },
        { 
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ), 
          label: "Support Interface", 
          href: "/admin/support",
          description: "Support system"
        }
      ]
    }
  ];

  const isActiveSection = (section: any) => {
    return section.items.some((item: any) => pathname === item.href);
  };

  return (
    <div
      className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-gray-900/80 backdrop-blur-lg 
        border-r border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.1)] 
        transition-all duration-500 ease-in-out z-40 ${
        isExpanded ? "w-72" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5"></div>
      
      <div className="relative pt-6 pb-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {/* Section Header */}
            <div className={`flex items-center px-4 mb-3 transition-all duration-500 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}>
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">{section.icon}</span>
                <h3 className="text-xs font-mono font-bold text-cyan-400/60 tracking-wider">
                  {section.title}
                </h3>
              </div>
            </div>

            {/* Section Items */}
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                className={`group relative flex items-center px-4 py-3 
                  transition-all duration-300 ${
                  pathname === item.href 
                    ? 'bg-cyan-500/10 border-r-2 border-cyan-400' 
                    : 'hover:bg-cyan-500/5 hover:border-r-2 hover:border-cyan-400/50'
                }`}
              >
                {/* Active Indicator */}
                {pathname === item.href && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 
                    shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div>
                )}

                {/* Icon Container */}
                <div className={`relative ${pathname === item.href ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'} 
                  transition-colors duration-300`}>
                  {/* Icon Glow on Active/Hover */}
                  <div className={`absolute inset-0 blur-md transition-opacity duration-300 ${
                    pathname === item.href ? 'opacity-50' : 'opacity-0 group-hover:opacity-30'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="relative">{item.icon}</div>
                </div>

                {/* Label and Description */}
                <div className={`ml-4 transition-all duration-500 ${
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}>
                  <span className={`block font-medium text-sm whitespace-nowrap ${
                    pathname === item.href ? 'text-cyan-300' : 'text-gray-300 group-hover:text-cyan-300'
                  } transition-colors duration-300`}>
                    {item.label}
                  </span>
                  <span className="block text-xs text-gray-500 font-mono mt-0.5">
                    {item.description}
                  </span>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/50 to-transparent 
                  transform origin-left transition-transform duration-300 ${
                  pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
            ))}

            {/* Section Divider */}
            {sectionIndex < navigationSections.length - 1 && (
              <div className="mt-6 mx-4 border-t border-cyan-500/10"></div>
            )}
          </div>
        ))}

        {/* System Status Panel (at bottom) */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gray-900/50 border-t border-cyan-500/20 
          transition-all duration-500 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
          <div className="text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">SYSTEM</span>
              <span className="text-cyan-400">OPTIMAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">SECURITY</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">VERSION</span>
              <span className="text-purple-400">2.0.1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edge Glow Effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
    </div>
  );
};

export default AdminSidebar;