"use client";

import { useState } from 'react';
import { GlassCard } from '@/app/(loci)/loci/components/GlassCard';
import { NeonButton } from '@/app/(loci)/loci/components/NeonButton';
// LOCI Pages Table with custom styling

interface RuleCount {
  complete: number;  // Green
  partial: number;   // Orange
  error: number;     // Red
}

interface PageRuleData {
  pageId: string;
  title: string;
  route: string;
  status: 'active' | 'inactive' | 'development';
  permissions: RuleCount;
  validations: RuleCount;
  database: RuleCount;
  modals: RuleCount;
  pending: number;
  lastModified: string;
}

interface ModalData {
  id: string;
  pageId: string;
  element: string;
  type: string[];
  status: 'complete' | 'partial' | 'pending';
  info: {
    action: string;
    effects: string[];
  };
  connections: string[];
  validation: string[] | null;
  dbRules: string[] | null;
  history: Array<{
    date: string;
    change: string;
    by: string;
  }>;
  lastUpdated: string;
}

export default function LOCIPagesTable() {
  const [pages] = useState<PageRuleData[]>([
    {
      pageId: 'loci1',
      title: 'LOCI Test Page 1',
      route: '/loci1',
      status: 'active',
      permissions: { complete: 5, partial: 2, error: 1 },
      validations: { complete: 3, partial: 1, error: 0 },
      database: { complete: 2, partial: 0, error: 1 },
      modals: { complete: 1, partial: 1, error: 0 },
      pending: 3,
      lastModified: '2024-06-20T11:35:14Z'
    },
    {
      pageId: 'dashboard',
      title: 'Main Home',
      route: '/',
      status: 'active',
      permissions: { complete: 2, partial: 1, error: 0 },
      validations: { complete: 1, partial: 0, error: 1 },
      database: { complete: 1, partial: 1, error: 0 },
      modals: { complete: 0, partial: 0, error: 0 },
      pending: 5,
      lastModified: '2024-06-19T09:20:00Z'
    },
    {
      pageId: 'admin',
      title: 'Admin Panel',
      route: '/admin',
      status: 'active',
      permissions: { complete: 8, partial: 2, error: 2 },
      validations: { complete: 4, partial: 2, error: 1 },
      database: { complete: 3, partial: 1, error: 1 },
      modals: { complete: 2, partial: 0, error: 0 },
      pending: 1,
      lastModified: '2024-06-18T14:45:00Z'
    },
    {
      pageId: 'settings',
      title: 'User Settings',
      route: '/settings',
      status: 'development',
      permissions: { complete: 0, partial: 0, error: 0 },
      validations: { complete: 0, partial: 0, error: 0 },
      database: { complete: 0, partial: 0, error: 0 },
      modals: { complete: 0, partial: 0, error: 0 },
      pending: 12,
      lastModified: '2024-06-17T10:00:00Z'
    }
  ]);

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [activeTab, setActiveTab] = useState('configuration');

  const handleRuleClick = (pageId: string, ruleType: string, status: string) => {
    // Create mock modal data
    const mockData: ModalData = {
      id: `${pageId}_${ruleType}_${status}`,
      pageId: pageId,
      element: `${ruleType} Rules`,
      type: [ruleType.charAt(0).toUpperCase()],
      status: status as 'complete' | 'partial' | 'pending',
      info: {
        action: `Manage ${ruleType} rules for ${pageId}`,
        effects: [`Controls ${ruleType} behavior`, 'Validates user actions']
      },
      connections: [],
      validation: ruleType === 'validations' ? ['REQUIRED', 'FORMAT_CHECK'] : null,
      dbRules: ruleType === 'database' ? ['CASCADE_DELETE', 'AUDIT_LOG'] : null,
      history: [
        {
          date: '2024-06-20',
          change: `Updated ${ruleType} configuration`,
          by: 'dev1'
        }
      ],
      lastUpdated: new Date().toISOString()
    };

    setSelectedElement(mockData.id);
    setModalData(mockData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-loci-success';
      case 'inactive': return 'text-loci-error';
      case 'development': return 'text-loci-warning';
      default: return 'text-loci-text-secondary';
    }
  };

  const RuleCountCell = ({ 
    counts, 
    pageId, 
    ruleType 
  }: { 
    counts: RuleCount; 
    pageId: string; 
    ruleType: string; 
  }) => (
    <div className="flex items-center justify-center space-x-2">
      {counts.complete > 0 && (
        <button
          onClick={() => handleRuleClick(pageId, ruleType, 'complete')}
          className="text-loci-success hover:text-white transition-colors font-mono text-sm cursor-pointer"
        >
          {counts.complete}
        </button>
      )}
      {counts.partial > 0 && (
        <button
          onClick={() => handleRuleClick(pageId, ruleType, 'partial')}
          className="text-loci-warning hover:text-white transition-colors font-mono text-sm cursor-pointer"
        >
          {counts.partial}
        </button>
      )}
      {counts.error > 0 && (
        <button
          onClick={() => handleRuleClick(pageId, ruleType, 'error')}
          className="text-loci-error hover:text-white transition-colors font-mono text-sm cursor-pointer"
        >
          {counts.error}
        </button>
      )}
      {counts.complete === 0 && counts.partial === 0 && counts.error === 0 && (
        <span className="text-loci-text-secondary font-mono text-sm">-</span>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white loci-font-display">
            PAGE RULES MATRIX
          </h1>
          <p className="text-loci-text-secondary mt-2">
            Manage LOCI rules across all application pages
          </p>
        </div>
        <div className="flex space-x-3">
          <NeonButton variant="cyan" size="sm">
            SCAN ALL PAGES
          </NeonButton>
          <NeonButton variant="magenta" size="sm">
            BULK OPERATIONS
          </NeonButton>
        </div>
      </div>

      {/* Legend */}
      <GlassCard>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-loci-text-secondary text-sm font-mono">RULE STATES:</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-loci-success rounded"></div>
              <span className="text-loci-success text-xs font-mono">COMPLETE</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-loci-warning rounded"></div>
              <span className="text-loci-warning text-xs font-mono">PARTIAL</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-loci-error rounded"></div>
              <span className="text-loci-error text-xs font-mono">ERROR</span>
            </div>
          </div>
          <div className="text-xs text-loci-text-secondary font-mono">
            Click any number to open rule details
          </div>
        </div>
      </GlassCard>

      {/* Pages Table */}
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-loci-border">
                <th className="text-left p-4 text-loci-text-secondary text-xs font-mono uppercase">PAGE</th>
                <th className="text-center p-4 text-loci-text-secondary text-xs font-mono uppercase">STATUS</th>
                <th className="text-center p-4 text-loci-warning text-xs font-mono uppercase">
                  PERMISSIONS (P)
                </th>
                <th className="text-center p-4 text-loci-success text-xs font-mono uppercase">
                  VALIDATIONS (V)
                </th>
                <th className="text-center p-4 text-loci-error text-xs font-mono uppercase">
                  DATABASE (DB)
                </th>
                <th className="text-center p-4 text-loci-magenta text-xs font-mono uppercase">
                  MODALS (M)
                </th>
                <th className="text-center p-4 text-loci-cyan text-xs font-mono uppercase">
                  PENDING
                </th>
                <th className="text-center p-4 text-loci-text-secondary text-xs font-mono uppercase">
                  LAST MODIFIED
                </th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.pageId} className="border-b border-loci-border hover:bg-loci-darker/30">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-mono text-sm">{page.title}</div>
                      <div className="text-loci-text-secondary text-xs">{page.route}</div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-sm font-mono uppercase ${getStatusColor(page.status)}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <RuleCountCell 
                      counts={page.permissions} 
                      pageId={page.pageId} 
                      ruleType="permissions" 
                    />
                  </td>
                  <td className="p-4">
                    <RuleCountCell 
                      counts={page.validations} 
                      pageId={page.pageId} 
                      ruleType="validations" 
                    />
                  </td>
                  <td className="p-4">
                    <RuleCountCell 
                      counts={page.database} 
                      pageId={page.pageId} 
                      ruleType="database" 
                    />
                  </td>
                  <td className="p-4">
                    <RuleCountCell 
                      counts={page.modals} 
                      pageId={page.pageId} 
                      ruleType="modals" 
                    />
                  </td>
                  <td className="p-4 text-center">
                    {page.pending > 0 ? (
                      <button
                        onClick={() => handleRuleClick(page.pageId, 'pending', 'pending')}
                        className="text-loci-cyan hover:text-white transition-colors font-mono text-sm cursor-pointer"
                      >
                        {page.pending}
                      </button>
                    ) : (
                      <span className="text-loci-text-secondary font-mono text-sm">-</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-loci-text-secondary text-xs font-mono">
                      {new Date(page.lastModified).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal System */}
      {selectedElement && modalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-loci-darker border border-loci-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-loci-border">
              <div>
                <h3 className="text-xl font-bold text-white">{modalData.element}</h3>
                <p className="text-loci-text-secondary text-sm">{modalData.id}</p>
              </div>
              <button
                onClick={() => setSelectedElement(null)}
                className="text-loci-text-secondary hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-loci-border">
              {['configuration', 'code', 'history', 'testing'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-mono uppercase transition-colors ${
                    activeTab === tab
                      ? 'text-loci-cyan border-b-2 border-loci-cyan bg-loci-darker'
                      : 'text-loci-text-secondary hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto loci-scrollbar">
              {activeTab === 'configuration' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-loci-cyan text-sm font-mono mb-3">🎯 RULE INFORMATION</h4>
                    <div className="bg-loci-darker/50 p-4 rounded">
                      <p className="text-white mb-2">Action: {modalData.info.action}</p>
                      <div className="text-loci-text-secondary text-sm">
                        Effects:
                        <ul className="mt-2 space-y-1">
                          {modalData.info.effects.map((effect, i) => (
                            <li key={i} className="ml-4">• {effect}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {modalData.validation && (
                    <div>
                      <h4 className="text-loci-success text-sm font-mono mb-3">✅ VALIDATION RULES</h4>
                      <div className="bg-loci-darker/50 p-4 rounded">
                        <div className="flex flex-wrap gap-2">
                          {modalData.validation.map((rule, i) => (
                            <span key={i} className="bg-loci-success/20 text-loci-success px-2 py-1 rounded text-xs">
                              {rule}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {modalData.dbRules && (
                    <div>
                      <h4 className="text-loci-error text-sm font-mono mb-3">🗃️ DATABASE RULES</h4>
                      <div className="bg-loci-darker/50 p-4 rounded">
                        <div className="flex flex-wrap gap-2">
                          {modalData.dbRules.map((rule, i) => (
                            <span key={i} className="bg-loci-error/20 text-loci-error px-2 py-1 rounded text-xs">
                              {rule}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-loci-cyan text-sm font-mono mb-3">IMPLEMENTATION CODE</h4>
                    <div className="bg-loci-darker/80 p-4 rounded font-mono text-sm">
                      <pre className="text-loci-success">
{`// ${modalData.element} Implementation
function handle${modalData.element.replace(/\s+/g, '')}() {
  // Rule implementation here
  console.log('Processing ${modalData.element}');
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h4 className="text-loci-cyan text-sm font-mono mb-3">CHANGE HISTORY</h4>
                  <div className="space-y-3">
                    {modalData.history.map((entry, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-loci-darker/50 rounded">
                        <div>
                          <p className="text-white text-sm">{entry.change}</p>
                          <p className="text-loci-text-secondary text-xs">by {entry.by}</p>
                        </div>
                        <span className="text-loci-text-secondary text-xs">{entry.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testing' && (
                <div className="space-y-4">
                  <h4 className="text-loci-cyan text-sm font-mono mb-3">RULE TESTING</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <NeonButton variant="success" size="sm">TEST PASS CASE</NeonButton>
                    <NeonButton variant="error" size="sm">TEST FAIL CASE</NeonButton>
                    <NeonButton variant="warning" size="sm">LOAD TEST</NeonButton>
                    <NeonButton variant="cyan" size="sm">VALIDATE RULES</NeonButton>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-loci-border">
              <div className="text-xs text-loci-text-secondary">
                Last updated: {new Date(modalData.lastUpdated).toLocaleString()}
              </div>
              <div className="flex space-x-3">
                <NeonButton variant="cyan" size="sm">SAVE CHANGES</NeonButton>
                <NeonButton variant="magenta" size="sm">EXPORT CONFIG</NeonButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}