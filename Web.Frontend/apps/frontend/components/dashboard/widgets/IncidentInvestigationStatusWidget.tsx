"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface IncidentInvestigationStatusWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

interface Investigation {
  id: string;
  incidentTitle: string;
  investigator: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed' | 'overdue';
  priority: 'critical' | 'high' | 'medium' | 'low';
  daysOpen: number;
  location: string;
  incidentDate: string;
  targetCompletion: string;
  completionPercentage: number;
  nextAction: string;
  riskLevel: 'very-high' | 'high' | 'medium' | 'low';
}

export default function IncidentInvestigationStatusWidget({ 
  id, 
  isEditMode, 
  onRemove 
}: IncidentInvestigationStatusWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'overdue' | 'critical' | 'in-progress'>('all');
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => {
      if (widgetRef.current) {
        observer.unobserve(widgetRef.current);
      }
    };
  }, [isVisible]);

  // Investigation data (dummy data)
  const investigations: Investigation[] = [
    {
      id: 'INV-001',
      incidentTitle: 'Chemical Spill in Workshop A',
      investigator: 'Sarah Johnson',
      status: 'overdue',
      priority: 'critical',
      daysOpen: 8,
      location: 'Workshop A - Line 3',
      incidentDate: '2024-01-15',
      targetCompletion: '2024-01-20',
      completionPercentage: 65,
      nextAction: 'Complete root cause analysis',
      riskLevel: 'very-high'
    },
    {
      id: 'INV-002',
      incidentTitle: 'Equipment Malfunction - Press 4',
      investigator: 'Mike Chen',
      status: 'in-progress',
      priority: 'high',
      daysOpen: 3,
      location: 'Production Floor B',
      incidentDate: '2024-01-20',
      targetCompletion: '2024-01-27',
      completionPercentage: 40,
      nextAction: 'Interview witnesses',
      riskLevel: 'high'
    },
    {
      id: 'INV-003',
      incidentTitle: 'Slip and Fall - Cafeteria',
      investigator: 'Lisa Rodriguez',
      status: 'review',
      priority: 'medium',
      daysOpen: 12,
      location: 'Employee Cafeteria',
      incidentDate: '2024-01-11',
      targetCompletion: '2024-01-25',
      completionPercentage: 90,
      nextAction: 'Manager review and approval',
      riskLevel: 'medium'
    },
    {
      id: 'INV-004',
      incidentTitle: 'Near Miss - Forklift Operation',
      investigator: 'David Kim',
      status: 'pending',
      priority: 'high',
      daysOpen: 1,
      location: 'Warehouse C',
      incidentDate: '2024-01-22',
      targetCompletion: '2024-01-29',
      completionPercentage: 0,
      nextAction: 'Assign investigation team',
      riskLevel: 'high'
    },
    {
      id: 'INV-005',
      incidentTitle: 'Environmental Incident - Oil Leak',
      investigator: 'Emma Thompson',
      status: 'in-progress',
      priority: 'critical',
      daysOpen: 5,
      location: 'Loading Bay 2',
      incidentDate: '2024-01-18',
      targetCompletion: '2024-01-25',
      completionPercentage: 75,
      nextAction: 'Finalize corrective actions',
      riskLevel: 'very-high'
    },
    {
      id: 'INV-006',
      incidentTitle: 'Cut Injury - Assembly Line',
      investigator: 'James Wilson',
      status: 'completed',
      priority: 'medium',
      daysOpen: 0,
      location: 'Assembly Line 1',
      incidentDate: '2024-01-10',
      targetCompletion: '2024-01-17',
      completionPercentage: 100,
      nextAction: 'Case closed',
      riskLevel: 'low'
    }
  ];

  const filteredInvestigations = investigations.filter(inv => {
    switch (filter) {
      case 'overdue': return inv.status === 'overdue';
      case 'critical': return inv.priority === 'critical';
      case 'in-progress': return inv.status === 'in-progress';
      default: return true;
    }
  });

  const statusCounts = {
    overdue: investigations.filter(i => i.status === 'overdue').length,
    critical: investigations.filter(i => i.priority === 'critical').length,
    inProgress: investigations.filter(i => i.status === 'in-progress').length,
    pending: investigations.filter(i => i.status === 'pending').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'very-high': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      ref={widgetRef}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Investigation Status</h3>
            <p className="text-sm text-gray-600 mt-1">Track incident investigation progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/incidents/tools/investigation"
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              New Investigation
            </Link>
            {isEditMode && (
              <button
                onClick={() => onRemove?.(id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.overdue}</div>
            <div className="text-xs text-gray-600">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{statusCounts.critical}</div>
            <div className="text-xs text-gray-600">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.inProgress}</div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.pending}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mt-4">
          {[
            { key: 'all', label: 'All' },
            { key: 'overdue', label: 'Overdue' },
            { key: 'critical', label: 'Critical' },
            { key: 'in-progress', label: 'In Progress' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                filter === filterOption.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Investigation List */}
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredInvestigations.map((investigation, index) => (
            <div 
              key={investigation.id} 
              className={`p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Header Row */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500">{investigation.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(investigation.status)}`}>
                      {investigation.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(investigation.priority)}`}>
                      {investigation.priority.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900">{investigation.incidentTitle}</h4>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{investigation.location}</span> • <span>Investigator: {investigation.investigator}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-medium text-gray-900">{investigation.daysOpen} days</div>
                  <div className="text-xs text-gray-500">open</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs font-medium text-gray-900">{investigation.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${investigation.completionPercentage}%`,
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              </div>

              {/* Details Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getRiskColor(investigation.riskLevel)}`}></div>
                    <span className="text-xs text-gray-600">Risk: {investigation.riskLevel.replace('-', ' ')}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Due: {new Date(investigation.targetCompletion).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{investigation.nextAction}</span>
                  <Link 
                    href={`/incidents/tools/investigation?id=${investigation.id}`}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInvestigations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            <div className="text-sm">No investigations match the current filter</div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h5 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Link 
              href="/incidents/tools/investigation"
              className="p-2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs text-center hover:bg-blue-100 transition-colors"
            >
              🔍 Start Investigation
            </Link>
            <button className="p-2 bg-gray-50 text-gray-700 border border-gray-200 rounded text-xs hover:bg-gray-100 transition-colors">
              📊 Generate Report
            </button>
            <button className="p-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded text-xs hover:bg-yellow-100 transition-colors">
              ⚠️ Flag Overdue
            </button>
            <button className="p-2 bg-green-50 text-green-700 border border-green-200 rounded text-xs hover:bg-green-100 transition-colors">
              ✅ Bulk Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}