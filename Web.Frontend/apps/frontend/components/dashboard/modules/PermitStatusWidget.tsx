'use client';

import React from 'react';

interface PermitStatusWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function PermitStatusWidget({ id, isEditMode }: PermitStatusWidgetProps) {
  const permits = [
    { id: 'HOT-2024-012', type: 'Hot Work', status: 'active', expiresIn: '2 hours', location: 'Building A' },
    { id: 'CNF-2024-008', type: 'Confined Space', status: 'pending', expiresIn: '1 day', location: 'Tank B-4' },
    { id: 'EXC-2024-015', type: 'Excavation', status: 'expired', expiresIn: 'Expired', location: 'Site C' },
  ];

  const statusCounts = {
    active: permits.filter(p => p.status === 'active').length,
    pending: permits.filter(p => p.status === 'pending').length,
    expired: permits.filter(p => p.status === 'expired').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✅';
      case 'pending': return '⏳';
      case 'expired': return '❌';
      default: return '📋';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Permit Status</h3>
          <p className="text-sm text-gray-600">Active work permits</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{statusCounts.active}</div>
          <div className="text-sm text-gray-500">active</div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">{statusCounts.active}</div>
          <div className="text-xs text-green-700">Active</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-xl font-bold text-yellow-600">{statusCounts.pending}</div>
          <div className="text-xs text-yellow-700">Pending</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-xl font-bold text-red-600">{statusCounts.expired}</div>
          <div className="text-xs text-red-700">Expired</div>
        </div>
      </div>

      {/* Permit List */}
      <div className="space-y-3 mb-4">
        {permits.map((permit) => (
          <div key={permit.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{getStatusIcon(permit.status)}</span>
                <div>
                  <div className="font-medium text-sm text-gray-900">{permit.id}</div>
                  <div className="text-xs text-gray-600">{permit.type}</div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full border font-medium ${getStatusColor(permit.status)}`}>
                {permit.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>📍 {permit.location}</span>
              <span className={permit.status === 'expired' ? 'text-red-600 font-medium' : ''}>
                {permit.expiresIn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          New Permit Request
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
            View All
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
            Renewals
          </button>
        </div>
      </div>
    </div>
  );
}