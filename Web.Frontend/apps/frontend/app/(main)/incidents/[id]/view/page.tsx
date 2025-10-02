"use client";

import React, { use, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Mock data mapping for incidents from the table
const mockIncidentData = {
  'INC-2024-001': {
    id: 'INC-2024-001',
    reference: 'INC-2024-001',
    caseNumber: 'INC-2024-001',
    status: 'Open',
    rating: 'High',
    personReporting: 'John Smith',
    personAffected: 'Jane Doe',
    summary: 'Slip and fall incident in warehouse area B',
    location: 'Warehouse B',
    dateTime: '2024-01-15T14:30:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2024-01-15T14:30:00',
    createdDate: '2024-01-15T14:30:00',
    severity: 'High',
    SeverityType: { Name: 'High' },
    additionalReference: '',
    createdByUserId: '1',
    formData: {
      orgGroupId: '1',
      reporterSelectLocation: 'Warehouse B',
      incidentPlace: 'Warehouse B'
    }
  },
  'INC-2024-002': {
    id: 'INC-2024-002',
    reference: 'INC-2024-002',
    caseNumber: 'INC-2024-002',
    status: 'Under Investigation',
    rating: 'Critical',
    personReporting: 'Sarah Johnson',
    personAffected: 'Mike Wilson',
    summary: 'Chemical spill in laboratory requiring evacuation',
    location: 'Laboratory 3',
    dateTime: '2024-01-14T09:15:00',
    incidentType: 'Dangerous Occurrence',
    typeName: 'Dangerous Occurrence',
    incidentDate: '2024-01-14T09:15:00',
    createdDate: '2024-01-14T09:15:00',
    severity: 'Critical',
    SeverityType: { Name: 'Critical' },
    additionalReference: 'LAB-SPILL-001',
    createdByUserId: '2',
    formData: {
      orgGroupId: '4',
      reporterSelectLocation: 'Laboratory 3',
      incidentPlace: 'Laboratory 3'
    }
  },
  'INC-2024-003': {
    id: 'INC-2024-003',
    reference: 'INC-2024-003',
    caseNumber: 'INC-2024-003',
    status: 'In Progress',
    rating: 'Medium',
    personReporting: 'Tom Davis',
    personAffected: 'N/A',
    summary: 'Near miss - forklift almost collided with pedestrian',
    location: 'Loading Bay',
    dateTime: '2024-01-13T16:45:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2024-01-13T16:45:00',
    createdDate: '2024-01-13T16:45:00',
    severity: 'Medium',
    SeverityType: { Name: 'Medium' },
    additionalReference: 'NEAR-MISS-003',
    createdByUserId: '3',
    formData: {
      orgGroupId: '5',
      reporterSelectLocation: 'Loading Bay',
      incidentPlace: 'Loading Bay'
    }
  },
  'INC-2024-004': {
    id: 'INC-2024-004',
    reference: 'INC-2024-004',
    caseNumber: 'INC-2024-004',
    status: 'Closed',
    rating: 'Low',
    personReporting: 'Emily Brown',
    personAffected: 'Emily Brown',
    summary: 'Minor cut from sharp edge on equipment',
    location: 'Production Floor',
    dateTime: '2024-01-12T11:20:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2024-01-12T11:20:00',
    createdDate: '2024-01-12T11:20:00',
    severity: 'Low',
    SeverityType: { Name: 'Low' },
    additionalReference: '',
    createdByUserId: '4',
    formData: {
      orgGroupId: '8',
      reporterSelectLocation: 'Production Floor',
      incidentPlace: 'Production Floor'
    }
  },
  'INC-2024-005': {
    id: 'INC-2024-005',
    reference: 'INC-2024-005',
    caseNumber: 'INC-2024-005',
    status: 'Open',
    rating: 'High',
    personReporting: 'David Lee',
    personAffected: 'Multiple',
    summary: 'Electrical fault causing power outage in building C',
    location: 'Building C',
    dateTime: '2024-01-11T08:00:00',
    incidentType: 'Dangerous Occurrence',
    typeName: 'Dangerous Occurrence',
    incidentDate: '2024-01-11T08:00:00',
    createdDate: '2024-01-11T08:00:00',
    severity: 'High',
    SeverityType: { Name: 'High' },
    additionalReference: 'ELEC-FAULT-005',
    createdByUserId: '5',
    formData: {
      orgGroupId: '6',
      reporterSelectLocation: 'Building C',
      incidentPlace: 'Building C'
    }
  },
  'INC-2024-006': {
    id: 'INC-2024-006',
    reference: 'INC-2024-006',
    caseNumber: 'INC-2024-006',
    status: 'Under Investigation',
    rating: 'Medium',
    personReporting: 'Lisa Wang',
    personAffected: 'James Taylor',
    summary: 'Employee reported feeling dizzy due to fumes',
    location: 'Paint Shop',
    dateTime: '2024-01-10T13:30:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2024-01-10T13:30:00',
    createdDate: '2024-01-10T13:30:00',
    severity: 'Medium',
    SeverityType: { Name: 'Medium' },
    additionalReference: 'FUME-EXPOSURE-006',
    createdByUserId: '6',
    formData: {
      orgGroupId: '8',
      reporterSelectLocation: 'Paint Shop',
      incidentPlace: 'Paint Shop'
    }
  },
  'INC-2024-007': {
    id: 'INC-2024-007',
    reference: 'INC-2024-007',
    caseNumber: 'INC-2024-007',
    status: 'In Progress',
    rating: 'Low',
    personReporting: 'Robert Garcia',
    personAffected: 'N/A',
    summary: 'Safety guard found loose on machinery',
    location: 'Machine Shop',
    dateTime: '2024-01-09T10:15:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2024-01-09T10:15:00',
    createdDate: '2024-01-09T10:15:00',
    severity: 'Low',
    SeverityType: { Name: 'Low' },
    additionalReference: 'SAFETY-GUARD-007',
    createdByUserId: '7',
    formData: {
      orgGroupId: '5',
      reporterSelectLocation: 'Machine Shop',
      incidentPlace: 'Machine Shop'
    }
  },
  'INC-2024-008': {
    id: 'INC-2024-008',
    reference: 'INC-2024-008',
    caseNumber: 'INC-2024-008',
    status: 'Closed',
    rating: 'Medium',
    personReporting: 'Amanda Chen',
    personAffected: 'Peter Jones',
    summary: 'Back strain from manual handling',
    location: 'Dispatch Area',
    dateTime: '2024-01-08T15:00:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2024-01-08T15:00:00',
    createdDate: '2024-01-08T15:00:00',
    severity: 'Medium',
    SeverityType: { Name: 'Medium' },
    additionalReference: 'BACK-STRAIN-008',
    createdByUserId: '8',
    formData: {
      orgGroupId: '10',
      reporterSelectLocation: 'Dispatch Area',
      incidentPlace: 'Dispatch Area'
    }
  },
  'INC-2025-089': {
    id: 'INC-2025-089',
    reference: 'INC-2025-089',
    caseNumber: 'INC-2025-089',
    status: 'Open',
    rating: 'Medium',
    personReporting: 'Sarah Mitchell',
    personAffected: 'N/A',
    summary: 'Near miss - crane load swing detected early by safety systems',
    location: 'Construction Yard',
    dateTime: '2025-09-25T14:45:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-25T14:45:00',
    createdDate: '2025-09-25T14:45:00',
    severity: 'Medium',
    SeverityType: { Name: 'Medium' },
    additionalReference: 'CRANE-SWING-089',
    createdByUserId: '12',
    formData: {
      orgGroupId: '5',
      reporterSelectLocation: 'Construction Yard',
      incidentPlace: 'Construction Yard'
    }
  },
  'INC-2025-088': {
    id: 'INC-2025-088',
    reference: 'INC-2025-088',
    caseNumber: 'INC-2025-088',
    status: 'In Progress',
    rating: 'Low',
    personReporting: 'Michael Thompson',
    personAffected: 'Michael Thompson',
    summary: 'Minor first aid - small cut while handling packaging materials',
    location: 'Packaging Department',
    dateTime: '2025-09-24T11:20:00',
    incidentType: 'Accident Book',
    typeName: 'Accident Book',
    incidentDate: '2025-09-24T11:20:00',
    createdDate: '2025-09-24T11:20:00',
    severity: 'Low',
    SeverityType: { Name: 'Low' },
    additionalReference: '',
    createdByUserId: '13',
    formData: {
      orgGroupId: '8',
      reporterSelectLocation: 'Packaging Department',
      incidentPlace: 'Packaging Department'
    }
  },
  'INC-2025-087': {
    id: 'INC-2025-087',
    reference: 'INC-2025-087',
    caseNumber: 'INC-2025-087',
    status: 'Under Investigation',
    rating: 'High',
    personReporting: 'Emma Watson',
    personAffected: 'David Chang',
    summary: 'Chemical exposure - employee felt nauseous after ventilation system failure',
    location: 'Laboratory 2',
    dateTime: '2025-09-23T16:15:00',
    incidentType: 'Dangerous Occurrence',
    typeName: 'Dangerous Occurrence',
    incidentDate: '2025-09-23T16:15:00',
    createdDate: '2025-09-23T16:15:00',
    severity: 'High',
    SeverityType: { Name: 'High' },
    additionalReference: 'CHEM-EXPO-087',
    createdByUserId: '14',
    formData: {
      orgGroupId: '4',
      reporterSelectLocation: 'Laboratory 2',
      incidentPlace: 'Laboratory 2'
    }
  },
  'INC-2025-086': {
    id: 'INC-2025-086',
    reference: 'INC-2025-086',
    caseNumber: 'INC-2025-086',
    status: 'Closed',
    rating: 'Medium',
    personReporting: 'James Rodriguez',
    personAffected: 'Lisa Parker',
    summary: 'Slip on wet floor in canteen - no injury, safety mats installed',
    location: 'Staff Canteen',
    dateTime: '2025-09-22T12:30:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2025-09-22T12:30:00',
    createdDate: '2025-09-22T12:30:00',
    severity: 'Medium',
    SeverityType: { Name: 'Medium' },
    additionalReference: 'SLIP-CANTEEN-086',
    createdByUserId: '15',
    formData: {
      orgGroupId: '2',
      reporterSelectLocation: 'Staff Canteen',
      incidentPlace: 'Staff Canteen'
    }
  },
  'INC-2025-085': {
    id: 'INC-2025-085',
    reference: 'INC-2025-085',
    caseNumber: 'INC-2025-085',
    status: 'In Progress',
    rating: 'Low',
    personReporting: 'Alex Johnson',
    personAffected: 'N/A',
    summary: 'Near miss - pedestrian walkway blocked by delivery truck',
    location: 'Loading Dock A',
    dateTime: '2025-09-21T08:45:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-21T08:45:00',
    createdDate: '2025-09-21T08:45:00',
    severity: 'Low',
    SeverityType: { Name: 'Low' },
    additionalReference: 'WALKWAY-BLOCK-085',
    createdByUserId: '16',
    formData: {
      orgGroupId: '10',
      reporterSelectLocation: 'Loading Dock A',
      incidentPlace: 'Loading Dock A'
    }
  }
};

export default function IncidentViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReadOnly = searchParams.get('readonly') === 'true';

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basicDetails');

  useEffect(() => {
    // Simulate loading delay and populate with mock data
    const timer = setTimeout(() => {
      const mockIncident = mockIncidentData[id];
      if (mockIncident) {
        setIncident(mockIncident);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity) => {
    const severityName = typeof severity === 'string' ? severity : severity?.Name || '';
    switch (severityName.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityDisplayName = (incident) => {
    if (!incident) return 'Unknown';
    return incident.SeverityType?.Name || incident.severity || incident.rating || 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'under investigation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrgGroupName = (orgGroupId) => {
    const orgGroups = {
      '1': 'Operations',
      '2': 'Administration',
      '3': 'Human Resources',
      '4': 'Safety & Compliance',
      '5': 'Maintenance',
      '6': 'IT Support',
      '7': 'Finance',
      '8': 'Production',
      '9': 'Quality Control',
      '10': 'Warehouse',
      '11': 'Customer Service',
      '12': 'Security'
    };
    return orgGroups[orgGroupId] || 'Unknown Department';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8 lg:px-12 xl:px-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8 lg:px-12 xl:px-16">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-800">Incident not found</h2>
            <p className="text-gray-600 mt-2">The requested incident could not be found.</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-4">
            <Link href="/incidents/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
              Incident Management
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 transition-colors">
              Incident Reports
            </button>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {incident.caseNumber} {isReadOnly && '(Read-Only)'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>
                {isReadOnly ? 'Incident Details (Read-Only)' : 'Incident Details'}
              </h1>
              <p className="text-gray-600 mt-1">Case Number: {incident.caseNumber}</p>
              {isReadOnly && (
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Read-Only Mode
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back to List
              </button>

              {/* Continue to Investigation Button */}
              <button
                onClick={() => {
                  const params = new URLSearchParams({
                    incidentId: incident.caseNumber,
                    incidentType: incident.incidentType || '',
                    location: incident.location || '',
                    severity: incident.severity || '',
                    description: incident.description || incident.summary || '',
                    reportedBy: incident.personReporting || '',
                    affectedPerson: incident.personAffected || '',
                    incidentDate: incident.incidentDate || incident.dateTime || '',
                    prePopulated: 'true'
                  });
                  router.push(`/incidents/tools/investigation?${params.toString()}`);
                }}
                className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors"
                style={{
                  backgroundColor: '#059669',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#047857'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#059669'}
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Continue to Investigation
              </button>

              {!isReadOnly && (
                <button
                  onClick={() => router.push(`/incidents/${id}`)}
                  style={{
                    backgroundColor: '#3d3a72',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'opacity 0.2s'
                  }}
                  className="hover:opacity-80"
                >
                  Edit Incident
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'basicDetails', label: 'Basic Details' },
                { id: 'incidentDetails', label: 'Incident Details' },
                { id: 'peopleInvolved', label: 'People Involved' },
                { id: 'actions', label: 'Actions & Notes' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'basicDetails' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Incident Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">{incident.caseNumber}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Reference:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                      {incident.additionalReference || 'None provided'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Date & Time:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">{formatDate(incident.incidentDate)}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity/Priority:</label>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {getSeverityDisplayName(incident)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">{incident.incidentType}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">{incident.location}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Group:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                      {getOrgGroupName(incident.formData?.orgGroupId)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created Date:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">{formatDate(incident.createdDate)}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'incidentDetails' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Detailed Incident Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Incident Summary:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-4 rounded-md border min-h-[120px]">
                      {incident.summary}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specific Location Details:</label>
                      <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                        {incident.formData?.incidentPlace || incident.location}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Environmental Conditions:</label>
                      <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                        Information not available in current data
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Root Cause Analysis:</label>
                      <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                        Pending investigation
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">RIDDOR Reportable:</label>
                      <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                        Assessment required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'peopleInvolved' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">People Involved</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Person Reporting:</label>
                      <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border font-medium">
                        {incident.personReporting}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Person Affected:</label>
                      <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border font-medium">
                        {incident.personAffected}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Witnesses:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                      No witnesses recorded
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Services Contacted:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                      Information not available
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Actions Taken & Notes</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Immediate Actions Taken:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-4 rounded-md border min-h-[100px]">
                      {incident.incidentType === 'Near Miss'
                        ? 'Area secured, safety review conducted, no immediate medical attention required.'
                        : incident.incidentType === 'Dangerous Occurrence'
                        ? 'Emergency procedures activated, area evacuated, relevant authorities contacted.'
                        : 'First aid administered, incident area secured, supervisor notified immediately.'
                      }
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Actions Required:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-4 rounded-md border min-h-[100px]">
                      {incident.status === 'Closed'
                        ? 'All follow-up actions completed. Case closed.'
                        : 'Investigation ongoing. Risk assessment to be updated. Training review scheduled.'
                      }
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Case Notes:</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-4 rounded-md border min-h-[100px]">
                      Initial report filed by {incident.personReporting}.
                      {incident.status === 'Closed'
                        ? ' Investigation completed and case closed.'
                        : ' Case under review by safety team.'
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Summary Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Status Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-gray-900">{incident.status}</div>
              <div className="text-sm text-gray-600">Current Status</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-gray-900">{getSeverityDisplayName(incident)}</div>
              <div className="text-sm text-gray-600">Severity Level</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-gray-900">{incident.incidentType}</div>
              <div className="text-sm text-gray-600">Incident Type</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            ← Back to Incident List
          </button>

          {!isReadOnly && (
            <button
              onClick={() => router.push(`/incidents/${id}`)}
              style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }}
              className="hover:opacity-80"
            >
              Edit This Incident
            </button>
          )}
        </div>
      </div>
    </div>
  );
}