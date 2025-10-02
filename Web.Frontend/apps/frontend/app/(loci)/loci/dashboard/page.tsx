"use client";

import { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/app/(loci)/loci/components/GlassCard';
import { NeonButton } from '@/app/(loci)/loci/components/NeonButton';
import { ActivityMatrix } from '@/app/(loci)/loci/components/ActivityMatrix';
// LOCI Dashboard with custom styling

interface PageStats {
  pageId: string;
  route: string;
  elementCount: number;
  completionRate: number;
  status: 'healthy' | 'review' | 'optimal';
}

export default function LOCIDashboard() {
  const [stats] = useState({
    elements: 247,
    pages: 18,
    permissions: 156,
    validationRules: 89
  });

  const [pageStats] = useState<PageStats[]>([
    {
      pageId: 'loci1',
      route: '/loci1',
      elementCount: 15,
      completionRate: 85,
      status: 'healthy'
    },
    {
      pageId: 'dashboard',
      route: '/',
      elementCount: 8,
      completionRate: 62,
      status: 'review'
    },
    {
      pageId: 'admin',
      route: '/admin',
      elementCount: 12,
      completionRate: 94,
      status: 'optimal'
    }
  ]);

  const [recentActivity] = useState([
    { id: 1, action: 'Updated CHK_LOC1_B_D_ITM_001', time: '2 mins ago', type: 'update' },
    { id: 2, action: 'Added validation to USR_PROF_I_V_EML_002', time: '15 mins ago', type: 'add' },
    { id: 3, action: 'New page created: /settings', time: '1 hour ago', type: 'create' },
    { id: 4, action: 'Permission changed for ADM_LOC1_PG_V_ALL_000', time: '3 hours ago', type: 'permission' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-loci-success';
      case 'review': return 'text-loci-warning';
      case 'optimal': return 'text-loci-cyan';
      default: return 'text-loci-text-secondary';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'update': return '◉';
      case 'add': return '⊕';
      case 'create': return '✦';
      case 'permission': return '🔐';
      default: return '•';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard hover glow="cyan">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{stats.elements}</div>
            <div className="text-loci-text-secondary text-sm font-mono uppercase">Elements</div>
            <div className="text-loci-cyan text-xs mt-2 font-mono">▲ +12.5%</div>
          </div>
        </GlassCard>

        <GlassCard hover glow="magenta">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{stats.pages}</div>
            <div className="text-loci-text-secondary text-sm font-mono uppercase">Pages</div>
            <div className="text-loci-success text-xs mt-2 font-mono">● STABLE</div>
          </div>
        </GlassCard>

        <GlassCard hover glow="success">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{stats.permissions}</div>
            <div className="text-loci-text-secondary text-sm font-mono uppercase">Permissions</div>
            <div className="text-loci-magenta text-xs mt-2 font-mono">◆ ACTIVE</div>
          </div>
        </GlassCard>

        <GlassCard hover glow="warning">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{stats.validationRules}</div>
            <div className="text-loci-text-secondary text-sm font-mono uppercase">Rules</div>
            <div className="text-loci-warning text-xs mt-2 font-mono">⚡ PROCESSING</div>
          </div>
        </GlassCard>
      </div>

      {/* Activity Matrix and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="p-6">
            <h3 className="text-white font-mono text-sm uppercase mb-4">ELEMENT ACTIVITY MATRIX</h3>
            <ActivityMatrix />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-loci-text-secondary text-xs font-mono">REAL-TIME MONITORING</span>
              <span className="text-loci-cyan text-xs font-mono">◉ ACTIVE ELEMENTS</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <h3 className="text-white font-mono text-sm uppercase mb-4">RECENT ACTIVITY</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-loci-border">
                  <div className="flex items-center space-x-3">
                    <span className="text-loci-cyan text-lg">{getActionIcon(activity.type)}</span>
                    <span className="text-white text-sm font-mono">{activity.action}</span>
                  </div>
                  <span className="text-loci-text-secondary text-xs font-mono">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Page Overview */}
      <GlassCard>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-mono text-sm uppercase">PAGE OVERVIEW</h3>
            <div className="flex space-x-2">
              <NeonButton size="sm" variant="cyan">SCAN ALL</NeonButton>
              <NeonButton size="sm" variant="magenta">EXPORT</NeonButton>
            </div>
          </div>
          
          <div className="space-y-4">
            {pageStats.map((page) => (
              <div key={page.pageId} className="bg-loci-darker/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-loci-cyan text-lg">●</span>
                    <div>
                      <Link 
                        href={`/loci/pages/${page.pageId}`}
                        className="text-white font-mono hover:text-loci-cyan transition-colors"
                      >
                        {page.route}
                      </Link>
                      <div className="text-loci-text-secondary text-xs font-mono mt-1">
                        {page.elementCount} elements
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-loci-darker rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-loci-cyan transition-all duration-500"
                        style={{ width: `${page.completionRate}%` }}
                      />
                    </div>
                    <span className={`text-sm font-mono uppercase ${getStatusColor(page.status)}`}>
                      {page.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4">
        <Link href="/loci/scanner">
          <NeonButton variant="cyan">SCAN NEW PAGE</NeonButton>
        </Link>
        <Link href="/loci/pages">
          <NeonButton variant="magenta">MANAGE PAGES</NeonButton>
        </Link>
        <NeonButton variant="success">GENERATE REPORT</NeonButton>
        <NeonButton variant="warning">SYSTEM HEALTH</NeonButton>
      </div>
    </div>
  );
}