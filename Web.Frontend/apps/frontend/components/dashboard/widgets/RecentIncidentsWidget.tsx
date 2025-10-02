"use client";

import React from 'react';
import Link from 'next/link';
import DashboardWidget from '@/components/dashboard/DashboardWidget';

// Demo incidents data
const recentIncidents = [
  { 
    id: 1, 
    title: 'Slip in Warehouse Area B', 
    type: 'Near Miss', 
    severity: 'Low',
    status: 'Under Review',
    reportedBy: 'John Smith',
    date: '2 hours ago',
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  },
  { 
    id: 2, 
    title: 'Equipment Malfunction - Forklift #3', 
    type: 'Accident', 
    severity: 'Medium',
    status: 'Investigating',
    reportedBy: 'Sarah Johnson',
    date: '1 day ago',
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  },
  { 
    id: 3, 
    title: 'Chemical Spill - Lab Area', 
    type: 'Dangerous Occurrence', 
    severity: 'High',
    status: 'Closed',
    reportedBy: 'Mike Wilson',
    date: '3 days ago',
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  },
  { 
    id: 4, 
    title: 'Ergonomic Issue - Workstation 12', 
    type: 'Near Miss', 
    severity: 'Low',
    status: 'Resolved',
    reportedBy: 'Emma Davis',
    date: '1 week ago',
    color: 'text-gray-700',
    bgColor: 'bg-white border border-gray-200'
  }
];

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'High': return 'bg-red-100 text-red-800';
    case 'Medium': return 'bg-orange-100 text-orange-800';
    case 'Low': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Resolved': return 'bg-green-100 text-green-800';
    case 'Closed': return 'bg-blue-100 text-blue-800';
    case 'Under Review': return 'bg-yellow-100 text-yellow-800';
    case 'Investigating': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface RecentIncidentsWidgetProps {
  id: string;
  isEditMode?: boolean;
  onRemove?: (id: string) => void;
}

export default function RecentIncidentsWidget({ id, isEditMode, onRemove }: RecentIncidentsWidgetProps) {
  return (
    <DashboardWidget 
      id={id}
      title="Recent Incidents" 
      type="Incidents"
      isEditMode={isEditMode}
      onRemove={onRemove}
    >
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {recentIncidents.map((incident) => (
          <div key={incident.id} className={`p-3 rounded-lg ${incident.bgColor} hover:shadow-md transition-all duration-200`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm text-gray-800">{incident.title}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${getSeverityBadge(incident.severity)}`}>
                {incident.severity}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
              <span>{incident.type}</span>
              <span>{incident.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">by {incident.reportedBy}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(incident.status)}`}>
                {incident.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Link href="/incidents/manage" className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
        View All Incidents →
      </Link>
    </DashboardWidget>
  );
}