'use client';

import React from 'react';

interface DocumentManagementWidgetProps {
  id?: string;
  isEditMode?: boolean;
}

export default function DocumentManagementWidget({ id, isEditMode }: DocumentManagementWidgetProps) {
  const recentDocuments = [
    { 
      name: 'Safety Policy Update', 
      type: 'policy', 
      date: '2 hours ago', 
      author: 'Admin', 
      status: 'published',
      icon: '📋'
    },
    { 
      name: 'Equipment Manual v2.1', 
      type: 'manual', 
      date: '1 day ago', 
      author: 'John D.', 
      status: 'draft',
      icon: '📖'
    },
    { 
      name: 'Incident Report Form', 
      type: 'form', 
      date: '2 days ago', 
      author: 'Sarah K.', 
      status: 'published',
      icon: '📄'
    },
    { 
      name: 'Training Certificate Template', 
      type: 'template', 
      date: '3 days ago', 
      author: 'Mike R.', 
      status: 'review',
      icon: '🎓'
    },
  ];

  const documentStats = {
    total: 1247,
    thisWeek: 12,
    pending: 8,
    expired: 3,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'policy': return 'text-purple-600';
      case 'manual': return 'text-blue-600';
      case 'form': return 'text-green-600';
      case 'template': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
          <p className="text-sm text-gray-600">Recent document activity</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{documentStats.thisWeek}</div>
          <div className="text-sm text-gray-500">this week</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{documentStats.total}</div>
          <div className="text-xs text-blue-700">Total Docs</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-xl font-bold text-yellow-600">{documentStats.pending}</div>
          <div className="text-xs text-yellow-700">Pending</div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {recentDocuments.map((doc, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="text-lg">{doc.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-medium text-sm text-gray-900 truncate">{doc.name}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ml-2 flex-shrink-0 ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className={`font-medium ${getTypeColor(doc.type)}`}>{doc.type}</span>
                  <span>{doc.date}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">by {doc.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Types Quick Access */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Access</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Policies', count: 45, color: 'bg-purple-100 text-purple-700' },
            { name: 'Procedures', count: 78, color: 'bg-blue-100 text-blue-700' },
            { name: 'Forms', count: 123, color: 'bg-green-100 text-green-700' },
            { name: 'Templates', count: 34, color: 'bg-orange-100 text-orange-700' },
          ].map((type, index) => (
            <button key={index} className={`p-3 rounded-lg text-center hover:shadow-md transition-all ${type.color}`}>
              <div className="font-bold text-lg">{type.count}</div>
              <div className="text-xs font-medium">{type.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          Upload Document
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
            Browse All
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
            My Docs
          </button>
        </div>
      </div>
    </div>
  );
}