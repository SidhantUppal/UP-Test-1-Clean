"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GlassCard } from '@/app/(loci)/loci/components/GlassCard';
import { NeonButton } from '@/app/(loci)/loci/components/NeonButton';
import '../../globals.css';

interface ElementData {
  id: string;
  shortId: string;
  type: string[];
  status: 'complete' | 'partial' | 'pending';
  permission?: string;
  connections: string[];
  validation?: string[];
  dbRules?: string[];
}

interface InteractionData {
  source: string;
  target: string;
  type: 'data' | 'navigation' | 'permission' | 'validation';
  description: string;
}

export default function LOCIPageDetail() {
  const params = useParams();
  const pageId = params.pageId as string;

  const [pageInfo] = useState({
    pageId: pageId,
    title: 'LOCI Test Page 1',
    route: '/loci1',
    description: 'Primary LOCI testing and demonstration page',
    lastScanned: '2024-06-20T11:35:14Z'
  });

  const [elements] = useState<ElementData[]>([
    {
      id: 'ADM_LOC1_PG_V_ALL_000',
      shortId: 'ALL_000',
      type: ['P'],
      status: 'complete',
      permission: 'admin_access',
      connections: [],
      validation: undefined,
      dbRules: undefined
    },
    {
      id: 'CHK_LOC1_B_D_ITM_001',
      shortId: 'ITM_001',
      type: ['P'],
      status: 'complete',
      permission: 'delete_checklist',
      connections: ['CHK_LOC1_B_E_ITM_002', 'CHK_LOC1_T_V_LST_008'],
      validation: undefined,
      dbRules: ['CASCADE_DELETE_ASSIGNMENTS', 'AUDIT_LOG_ENTRY']
    },
    {
      id: 'CHK_LOC1_B_E_ITM_002',
      shortId: 'ITM_002',
      type: ['P', 'M'],
      status: 'complete',
      permission: 'edit_checklist',
      connections: ['CHK_LOC1_B_D_ITM_001'],
      validation: ['CHECKLIST_NOT_LOCKED', 'USER_HAS_ACCESS'],
      dbRules: undefined
    },
    {
      id: 'USR_LOC1_I_V_EML_004',
      shortId: 'EML_004',
      type: ['V'],
      status: 'partial',
      permission: undefined,
      connections: ['CHK_LOC1_F_S_ALL_007'],
      validation: ['EMAIL_FORMAT', 'EMAIL_NOT_DUPLICATE'],
      dbRules: undefined
    }
  ]);

  const [interactions] = useState<InteractionData[]>([
    {
      source: 'CHK_LOC1_B_D_ITM_001',
      target: 'CHK_LOC1_B_E_ITM_002',
      type: 'data',
      description: 'Shares checklist ID for edit operations'
    },
    {
      source: 'CHK_LOC1_B_D_ITM_001',
      target: 'CHK_LOC1_T_V_LST_008',
      type: 'data',
      description: 'Updates table after deletion'
    },
    {
      source: 'USR_LOC1_I_V_EML_004',
      target: 'CHK_LOC1_F_S_ALL_007',
      type: 'validation',
      description: 'Validates email before form submission'
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'flow' | 'table'>('grid');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const getTypeColor = (types: string[]) => {
    if (types.includes('P')) return 'border-loci-warning';
    if (types.includes('V')) return 'border-loci-success';
    if (types.includes('DB')) return 'border-loci-error';
    if (types.includes('M')) return 'border-loci-magenta';
    return 'border-loci-text-secondary';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return '✓';
      case 'partial': return '◐';
      case 'pending': return '○';
      default: return '•';
    }
  };

  // Calculate aggregated stats
  const stats = {
    totalElements: elements.length,
    permissions: elements.filter(e => e.type.includes('P')).length,
    validations: elements.filter(e => e.type.includes('V')).length,
    dbOperations: elements.filter(e => e.type.includes('DB')).length,
    totalConnections: interactions.length,
    completeElements: elements.filter(e => e.status === 'complete').length,
    partialElements: elements.filter(e => e.status === 'partial').length,
    pendingElements: elements.filter(e => e.status === 'pending').length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/loci/pages" className="text-loci-text-secondary hover:text-loci-cyan text-sm font-mono mb-2 inline-block">
            ← BACK TO PAGES
          </Link>
          <h1 className="text-3xl font-bold text-white loci-font-display">
            {pageInfo.title}
          </h1>
          <p className="text-loci-text-secondary mt-2">
            {pageInfo.route} • Last scanned: {new Date(pageInfo.lastScanned).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <NeonButton variant="cyan" size="sm">
            RESCAN PAGE
          </NeonButton>
          <NeonButton variant="magenta" size="sm">
            EXPORT DATA
          </NeonButton>
        </div>
      </div>

      {/* Aggregated Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold text-white">{stats.totalElements}</div>
            <div className="text-xs text-loci-text-secondary font-mono">TOTAL ELEMENTS</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold text-loci-warning">{stats.permissions}</div>
            <div className="text-xs text-loci-text-secondary font-mono">PERMISSIONS</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold text-loci-success">{stats.validations}</div>
            <div className="text-xs text-loci-text-secondary font-mono">VALIDATIONS</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold text-loci-magenta">{stats.totalConnections}</div>
            <div className="text-xs text-loci-text-secondary font-mono">CONNECTIONS</div>
          </div>
        </GlassCard>
      </div>

      {/* View Mode Selector */}
      <GlassCard>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-loci-text-secondary text-sm font-mono">VIEW MODE:</span>
            <div className="flex space-x-2">
              {[
                { value: 'grid', label: 'GRID VIEW' },
                { value: 'flow', label: 'FLOW DIAGRAM' },
                { value: 'table', label: 'TABLE VIEW' }
              ].map(mode => (
                <button
                  key={mode.value}
                  onClick={() => setViewMode(mode.value as 'grid' | 'flow' | 'table')}
                  className={`px-4 py-2 text-xs font-mono uppercase transition-all duration-200 
                    ${viewMode === mode.value 
                      ? 'bg-loci-cyan text-loci-dark' 
                      : 'text-loci-text-secondary hover:text-white border border-loci-border'
                    }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-sm font-mono">
            <span className="text-loci-success">{stats.completeElements} COMPLETE</span>
            <span className="text-loci-text-secondary mx-2">•</span>
            <span className="text-loci-warning">{stats.partialElements} PARTIAL</span>
            <span className="text-loci-text-secondary mx-2">•</span>
            <span className="text-loci-error">{stats.pendingElements} PENDING</span>
          </div>
        </div>
      </GlassCard>

      {/* Elements View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {elements.map(element => (
            <GlassCard 
              key={element.id} 
              hover
              glow={selectedElement === element.id ? 'cyan' : undefined}
            >
              <div 
                className={`p-4 border-2 ${getTypeColor(element.type)} cursor-pointer`}
                onClick={() => setSelectedElement(element.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-mono text-sm">{element.shortId}</h4>
                    <p className="text-loci-text-secondary text-xs">{element.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {element.type.map(t => (
                      <span key={t} className="text-xs font-mono text-loci-cyan">{t}</span>
                    ))}
                    <span className={`text-lg ${
                      element.status === 'complete' ? 'text-loci-success' : 
                      element.status === 'partial' ? 'text-loci-warning' : 
                      'text-loci-text-secondary'
                    }`}>
                      {getStatusIcon(element.status)}
                    </span>
                  </div>
                </div>
                
                {element.permission && (
                  <div className="mb-2">
                    <span className="text-xs text-loci-text-secondary">PERMISSION:</span>
                    <span className="text-xs text-loci-warning ml-2">{element.permission}</span>
                  </div>
                )}
                
                {element.connections.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs text-loci-text-secondary">CONNECTIONS:</span>
                    <span className="text-xs text-loci-magenta ml-2">{element.connections.length}</span>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-3">
                  <Link href={`/loci/editor/${element.id}`}>
                    <NeonButton size="sm" variant="cyan">EDIT</NeonButton>
                  </Link>
                  <NeonButton size="sm" variant="magenta">TEST</NeonButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {viewMode === 'flow' && (
        <GlassCard>
          <div className="p-8 min-h-[400px] relative">
            <svg className="w-full h-full" viewBox="0 0 800 400">
              {/* Connection lines */}
              {interactions.map((interaction, i) => {
                const sourceIndex = elements.findIndex(e => e.id === interaction.source);
                const targetIndex = elements.findIndex(e => e.id === interaction.target);
                const x1 = 100 + (sourceIndex % 4) * 180;
                const y1 = 100 + Math.floor(sourceIndex / 4) * 100;
                const x2 = 100 + (targetIndex % 4) * 180;
                const y2 = 100 + Math.floor(targetIndex / 4) * 100;
                
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className="loci-circuit-line"
                    strokeDasharray={interaction.type === 'validation' ? '5,5' : undefined}
                  />
                );
              })}
              
              {/* Element nodes */}
              {elements.map((element, i) => {
                const x = 100 + (i % 4) * 180;
                const y = 100 + Math.floor(i / 4) * 100;
                
                return (
                  <g key={element.id}>
                    <rect
                      x={x - 60}
                      y={y - 20}
                      width={120}
                      height={40}
                      fill="rgba(18, 18, 26, 0.9)"
                      stroke={element.type.includes('P') ? '#FFB800' : '#00F5FF'}
                      strokeWidth="2"
                      className="cursor-pointer hover:fill-loci-darker"
                    />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      className="fill-white text-xs font-mono"
                    >
                      {element.shortId}
                    </text>
                  </g>
                );
              })}
            </svg>
            
            <div className="absolute bottom-4 right-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0 border-t-2 border-loci-cyan"></div>
                <span className="text-xs text-loci-text-secondary">DATA FLOW</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0 border-t-2 border-dashed border-loci-cyan"></div>
                <span className="text-xs text-loci-text-secondary">VALIDATION</span>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {viewMode === 'table' && (
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-loci-border">
                  <th className="text-left p-4 text-loci-text-secondary text-xs font-mono">ELEMENT ID</th>
                  <th className="text-left p-4 text-loci-text-secondary text-xs font-mono">TYPE</th>
                  <th className="text-left p-4 text-loci-text-secondary text-xs font-mono">STATUS</th>
                  <th className="text-left p-4 text-loci-text-secondary text-xs font-mono">PERMISSION</th>
                  <th className="text-left p-4 text-loci-text-secondary text-xs font-mono">CONNECTIONS</th>
                  <th className="text-left p-4 text-loci-text-secondary text-xs font-mono">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {elements.map(element => (
                  <tr key={element.id} className="border-b border-loci-border hover:bg-loci-darker/50">
                    <td className="p-4">
                      <div className="text-white font-mono text-sm">{element.shortId}</div>
                      <div className="text-loci-text-secondary text-xs">{element.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {element.type.map(t => (
                          <span key={t} className="text-xs font-mono text-loci-cyan">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${
                        element.status === 'complete' ? 'text-loci-success' : 
                        element.status === 'partial' ? 'text-loci-warning' : 
                        'text-loci-text-secondary'
                      }`}>
                        {getStatusIcon(element.status)} {element.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-loci-warning">
                        {element.permission || '-'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-loci-magenta">
                        {element.connections.length}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Link href={`/loci/editor/${element.id}`}>
                          <button className="text-loci-cyan hover:text-white text-xs font-mono">
                            EDIT
                          </button>
                        </Link>
                        <button className="text-loci-magenta hover:text-white text-xs font-mono">
                          TEST
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Interactions Summary */}
      <GlassCard>
        <div className="p-6">
          <h3 className="text-white font-mono text-sm uppercase mb-4">ELEMENT INTERACTIONS</h3>
          <div className="space-y-3">
            {interactions.map((interaction, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-loci-border">
                <div className="flex items-center space-x-4">
                  <span className="text-loci-cyan font-mono text-sm">
                    {elements.find(e => e.id === interaction.source)?.shortId}
                  </span>
                  <span className="text-loci-text-secondary">→</span>
                  <span className="text-loci-magenta font-mono text-sm">
                    {elements.find(e => e.id === interaction.target)?.shortId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-loci-warning font-mono uppercase mr-2">
                    {interaction.type}
                  </span>
                  <span className="text-xs text-loci-text-secondary">
                    {interaction.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}