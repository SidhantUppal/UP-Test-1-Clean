"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { incidentService } from "@/services/incidentService";
import LinkedCasesTab from "@/components/LinkedCasesTab";
import AttachmentsTab from "@/components/AttachmentsTab";
import NearMissInitialModal from "@/components/incidents/NearMissInitialModal";
import RoadTrafficInitialModal from "@/components/incidents/RoadTrafficInitialModal";
import DangerousOccurrenceInitialModal from "@/components/incidents/DangerousOccurrenceInitialModal";
import AccidentBookInitialModal from "@/components/incidents/AccidentBookInitialModal";
import HighPotentialInitialModal from "@/components/incidents/HighPotentialInitialModal";

export default function IncidentDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('basicDetails');
  const [activeBottomTab, setActiveBottomTab] = useState('forms');
  const [newCaseNote, setNewCaseNote] = useState('');
  const [caseNotes, setCaseNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [savingTask, setSavingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    taskPriorityId: null,
    assigneeId: null,
    dueByDate: '',
    isDateRange: false,
    description: '',
    isEvidenceRequired: false
  });
  const [taskPriorities, setTaskPriorities] = useState([]);
  const [showLinkedRecordsModal, setShowLinkedRecordsModal] = useState(false);
  const [selectedRecordType, setSelectedRecordType] = useState('Accident Case');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Additional reference field state
  const [additionalReference, setAdditionalReference] = useState('');
  const [savingChanges, setSavingChanges] = useState(false);
  
  // Modal states for incident forms
  const [showNearMissModal, setShowNearMissModal] = useState(false);
  const [showRoadTrafficModal, setShowRoadTrafficModal] = useState(false);
  const [showDangerousOccurrenceModal, setShowDangerousOccurrenceModal] = useState(false);
  const [showAccidentBookModal, setShowAccidentBookModal] = useState(false);
  const [showHighPotentialModal, setShowHighPotentialModal] = useState(false);

  // Record types for the dropdown
  const recordTypes = [
    'Accident Case',
    'Asset',
    'Checklist',
    'Checklist Response',
    'Information Library Article',
    'Risk Assessment',
    'Safety Policy',
    'Safe Systems of Work > Method Statement',
    'Safe Systems of Work > Safe Working Procedure',
    'Safe Systems of Work > Permit to Work',
    'Staff Handbook',
    'Training Course',
    'Training Record',
    'Chemical Assessment'
  ];

  const loadIncident = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const incidentData = await incidentService.getIncidentForEdit(parseInt(id));
      setIncident(incidentData);
      setAdditionalReference(incidentData.additionalReference || '');
    } catch (err) {
      console.error('Error loading incident:', err);
      setError(err.message || 'Failed to load incident');
    } finally {
      setLoading(false);
    }
  };

  const loadCaseNotes = async () => {
    try {
      setLoadingNotes(true);
      const response = await fetch(`http://localhost:3014/api/incident/${id}/case-notes`, {
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to load case notes');
      }
      
      const data = await response.json();
      setCaseNotes(data.data || []);
    } catch (err) {
      console.error('Error loading case notes:', err);
      // Don't show error for case notes as it's not critical
    } finally {
      setLoadingNotes(false);
    }
  };

  const loadTasks = async () => {
    try {
      setLoadingTasks(true);
      const response = await fetch(`http://localhost:3014/api/incident/${id}/tasks`, {
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to load tasks');
      }
      
      const data = await response.json();
      setTasks(data.data || []);
    } catch (err) {
      console.error('Error loading tasks:', err);
      // Don't show error for tasks as it's not critical
    } finally {
      setLoadingTasks(false);
    }
  };

  const loadTaskPriorities = async () => {
    try {
      const response = await fetch('http://localhost:3014/api/tasks/priorities', {
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to load task priorities');
      }
      
      const data = await response.json();
      setTaskPriorities(data.data || []);
    } catch (err) {
      console.error('Error loading task priorities:', err);
    }
  };

  useEffect(() => {
    loadIncident();
    loadCaseNotes();
    loadTasks();
    loadTaskPriorities();
  }, [id]);

  const handleEdit = () => {
    if (!incident) return;

    const incidentTypeId = incident.incidentTypeId || incident.IncidentTypeID;

    console.log('Edit incident from view page:', incident);
    console.log('IncidentTypeID:', incidentTypeId);

    if (!incidentTypeId) {
      console.error('No IncidentTypeID found for incident:', incident);
      alert('Cannot edit incident: Type ID not found');
      return;
    }

    // Route to database-driven edit URLs: /incidents/edit/{typeId}/{incidentId}
    // The edit page will dynamically load the incident type from database
    router.push(`/incidents/edit/${incidentTypeId}/${incident.incidentCaseId}`);
  };

  const handleSaveNote = async () => {
    if (!newCaseNote.trim() || savingNote) return;
    
    try {
      setSavingNote(true);
      const response = await fetch(`http://localhost:3014/api/incident/${id}/case-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
        body: JSON.stringify({
          noteText: newCaseNote.trim()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save case note');
      }
      
      const result = await response.json();
      if (result.success) {
        setNewCaseNote('');
        await loadCaseNotes(); // Refresh the notes list
      }
    } catch (error) {
      console.error('Error saving case note:', error);
      alert('Failed to save case note. Please try again.');
    } finally {
      setSavingNote(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || savingTask) return;
    
    try {
      setSavingTask(true);
      const response = await fetch(`http://localhost:3014/api/incident/${id}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
        body: JSON.stringify({
          title: newTask.title.trim(),
          description: newTask.description || '',
          dueByDate: newTask.dueByDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 7 days from now
          taskPriorityId: newTask.taskPriorityId,
          isEvidenceRequired: newTask.isEvidenceRequired || false
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      const result = await response.json();
      if (result.success) {
        setNewTask({
          title: '',
          taskPriorityId: null,
          assigneeId: null,
          dueByDate: '',
          isDateRange: false,
          description: '',
          isEvidenceRequired: false
        });
        await loadTasks(); // Refresh the tasks list
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setSavingTask(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3014/api/tasks/${taskId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to complete task');
      }
      
      const result = await response.json();
      if (result.success) {
        await loadTasks(); // Refresh the tasks list
      }
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to complete task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3014/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      const result = await response.json();
      if (result.success) {
        await loadTasks(); // Refresh the tasks list
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleSaveBasicDetails = async () => {
    if (savingChanges || !incident) return;
    
    try {
      setSavingChanges(true);
      const response = await fetch(`http://localhost:3014/api/incident/${incident.incidentCaseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': '1',
          'x-user-area-id': '1',
          'x-user-name': 'Adele Longdon',
          'x-user-email': 'adele.longdon@example.com',
        },
        body: JSON.stringify({
          additionalReference: additionalReference.trim() || null
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      
      const result = await response.json();
      if (result.success) {
        // Update the incident state with the new data
        setIncident(result.data);
        alert('Changes saved successfully');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSavingChanges(false);
    }
  };

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

  // Helper functions for displaying incident data
  const getSeverityColor = (severity: any) => {
    if (!severity) return 'bg-gray-100 text-gray-800';

    const severityName = typeof severity === 'string' ? severity : severity?.Title;

    switch (severityName?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityDisplayName = (incident: any) => {
    if (!incident) return '-';

    // Handle different severity data structures
    if (incident.SeverityType?.Title) {
      return incident.SeverityType.Title;
    }
    if (incident.severity) {
      return incident.severity;
    }
    return '-';
  };

  const handleTypeSelect = (typeCode: string) => {
    // Show modals for specific types
    if (typeCode === 'NEAR_MISS') {
      setShowNearMissModal(true);
    } else if (typeCode === 'ROAD_TRAFFIC') {
      setShowRoadTrafficModal(true);
    } else if (typeCode === 'DANGEROUS_OCCURRENCE') {
      setShowDangerousOccurrenceModal(true);
    } else if (typeCode === 'ACCIDENT_BOOK') {
      setShowAccidentBookModal(true);
    } else if (typeCode === 'WOBBLE') {
      setShowHighPotentialModal(true);
    } else {
      // Navigate to dynamic form route for other types - open in new tab
      window.open(`/incidents/form/${typeCode}`, '_blank');
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-8 py-8 lg:px-12 xl:px-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => router.push('/incidents')}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Back to Incidents
              </button>
            </div>
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
              onClick={() => router.push('/incidents')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Incidents
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
          {/* Breadcrumb  */}
          <div className="flex items-center text-sm mb-4">
            <Link href="/incidents/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
              Incident Management
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {incident.caseNumber}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>
                Incident Details
              </h1>
              <p className="text-gray-600 mt-1">Case Number: {incident.caseNumber}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
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
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

        {/* Main Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'basicDetails', label: 'Basic details' },
                { id: 'caseNotes', label: 'Case Notes' },
                { id: 'furtherActions', label: 'Further Actions' },
                { id: 'associatedRecords', label: 'Associated Records' },
                { id: 'linkedCases', label: 'Linked Cases' }
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference:</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{incident?.caseNumber || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Reference:</label>
                    <input 
                      type="text" 
                      className="text-sm text-gray-900 bg-white p-2 rounded border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Enter additional reference..."
                      value={additionalReference}
                      onChange={(e) => setAdditionalReference(e.target.value)}
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Date:</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{formatDate(incident?.incidentDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity:</label>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident?.SeverityType || incident?.severity)}`}>
                        {getSeverityDisplayName(incident)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Is RIDDOR Reportable?</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input type="radio" name="riddor" className="mr-2" disabled />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="riddor" className="mr-2" defaultChecked disabled />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Root Cause Type:</label>
                    <select className="text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-200 w-full" disabled>
                      <option>Please select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type:</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{incident?.typeName || 'None'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Injury Type:</label>
                    <select className="text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-200 w-full" disabled>
                      <option>Please select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Any lost time incurred?</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input type="radio" name="lostTime" className="mr-2" disabled />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="lostTime" className="mr-2" defaultChecked disabled />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Org Group:</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{incident?.formData?.orgGroupId ? `Group ${incident.formData.orgGroupId}` : 'No Defined'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{incident?.formData?.reporterSelectLocation || incident?.formData?.incidentPlace || 'Select Location'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Manager:</label>
                    <select className="text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-200 w-full" disabled>
                      <option>Case Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Suppress (disable) all alert notifications for this case?</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input type="radio" name="suppress" className="mr-2" disabled />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="suppress" className="mr-2" defaultChecked disabled />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logged By:</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">Adele Longdon</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Added Date:</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{formatDate(incident?.createdDate)}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button 
                    style={{ 
                      backgroundColor: '#3d3a72', 
                      color: '#ffffff', 
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: savingChanges ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      transition: 'opacity 0.2s',
                      opacity: savingChanges ? 0.6 : 1
                    }}
                    className="hover:opacity-80"
                    onClick={handleSaveBasicDetails}
                    disabled={savingChanges}
                  >
                    {savingChanges ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                {/* Users authorized section */}
                <div className="mt-8">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">
                    Users authorised to view this case
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If this case is confidential and should be viewable to restricted users only, please select these users below
                  </p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select users</label>
                    <select className="text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-200 w-full max-w-sm" disabled>
                      <option>Assign</option>
                    </select>
                  </div>
                  <button 
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
                    disabled
                  >
                    Save Changes
                  </button>
                </div>

                {/* Employees/Persons involved section */}
                <div className="mt-8">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Employees/Persons involved</h4>
                  <p className="text-sm text-gray-600">There are no persons associated with this case</p>
                </div>
              </div>
            )}

            {activeTab === 'caseNotes' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Case Notes</h3>
                
                {/* Add New Case Note */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <textarea
                      value={newCaseNote}
                      onChange={(e) => setNewCaseNote(e.target.value)}
                      placeholder="Write a note..."
                      className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      rows={3}
                    />
                    <div className="mt-3">
                      <button
                        onClick={handleSaveNote}
                        disabled={!newCaseNote.trim() || savingNote}
                        style={{ 
                          backgroundColor: '#3d3a72', 
                          color: '#ffffff', 
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontWeight: '500',
                          cursor: (!newCaseNote.trim() || savingNote) ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          transition: 'opacity 0.2s',
                          opacity: (!newCaseNote.trim() || savingNote) ? 0.6 : 1
                        }}
                        className="hover:opacity-80"
                      >
                        {savingNote ? 'Saving...' : 'Save Note'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Existing Case Notes */}
                <div className="space-y-4">
                  {loadingNotes ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    </div>
                  ) : caseNotes.length > 0 ? (
                    caseNotes.map((note) => (
                      <div key={note.CaseNoteID} className="flex items-start gap-4 pb-4 border-b border-gray-200">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">
                              {note.CreatedByName?.charAt(0) || 'U'}
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {note.CreatedByName || 'Unknown User'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(note.CreatedDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {note.NoteText}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-sm text-gray-600">No case notes have been added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'furtherActions' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Further Actions</h3>
                
                {/* Add New Task Form */}
                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4 bg-gray-200 -mx-6 -mt-6 px-6 py-3 rounded-t-lg">Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                      <select
                        value={newTask.taskPriorityId || ''}
                        onChange={(e) => setNewTask({...newTask, taskPriorityId: e.target.value ? parseInt(e.target.value) : null})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Priority</option>
                        {taskPriorities.map((priority) => (
                          <option key={priority.TaskPriorityID} value={priority.TaskPriorityID}>
                            {priority.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                      <select
                        value={newTask.assigneeId || ''}
                        onChange={(e) => setNewTask({...newTask, assigneeId: e.target.value ? parseInt(e.target.value) : null})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Please select...</option>
                        <option value="1">Adele Longdon</option>
                        <option value="2">John Smith</option>
                        <option value="3">Sarah Jones</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="dateRange"
                        checked={newTask.isDateRange}
                        onChange={(e) => setNewTask({...newTask, isDateRange: e.target.checked})}
                        className="mr-2"
                      />
                      <label htmlFor="dateRange" className="text-sm text-gray-700">
                        Tick this box if the task is due within a date range rather than on a single specific date
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                        <input
                          type="date"
                          value={newTask.dueByDate}
                          onChange={(e) => setNewTask({...newTask, dueByDate: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="dd/mm/yyyy"
                        />
                      </div>
                      
                      <div></div>
                      
                      <div className="flex justify-end items-end">
                        <button
                          onClick={handleAddTask}
                          disabled={!newTask.title.trim() || savingTask}
                          style={{ 
                            backgroundColor: '#3d3a72', 
                            color: '#ffffff', 
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: (newTask.title.trim() && !savingTask) ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            transition: 'opacity 0.2s',
                            opacity: (newTask.title.trim() && !savingTask) ? 1 : 0.6
                          }}
                          className="hover:opacity-80"
                        >
                          {savingTask ? 'Adding...' : 'Add Task'}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Existing Tasks */}
                <div>
                  {loadingTasks ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    </div>
                  ) : tasks.length > 0 ? (
                    <div className="space-y-4">
                      {tasks.map((task) => (
                        <div key={task.TaskID} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-medium text-gray-900">{task.Title}</h4>
                            <div className="flex gap-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${task.statusColor}`}>
                                {task.status}
                              </span>
                              {task.PriorityTitle && (
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${task.priorityColor}`}>
                                  {task.PriorityTitle}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {task.Description && (
                            <p className="text-sm text-gray-600 mb-3">{task.Description}</p>
                          )}
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              {task.DueByDate && (
                                <span className={`${task.isOverdue ? 'text-red-600 font-medium' : ''}`}>
                                  Due: {new Date(task.DueByDate).toLocaleDateString('en-GB')}
                                  {task.isOverdue && ' (Overdue)'}
                                </span>
                              )}
                              {task.EmployeeID && (
                                <span>Assigned to: User {task.EmployeeID}</span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {!task.CompletedDate && (
                                <>
                                  <button
                                    onClick={() => handleCompleteTask(task.TaskID)}
                                    className="text-green-600 hover:text-green-700 text-xs font-medium"
                                  >
                                    Complete
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTask(task.TaskID)}
                                    className="text-red-600 hover:text-red-700 text-xs font-medium"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-sm text-gray-600">No further actions have been added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'associatedRecords' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Associated Records</h3>
                <button 
                  onClick={() => setShowLinkedRecordsModal(true)}
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
                  Select Linked Records
                </button>
              </div>
            )}

            {activeTab === 'linkedCases' && (
              <LinkedCasesTab incidentId={incident.incidentCaseId} />
            )}
          </div>
        </div>

        {/* Bottom Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'forms', label: 'Forms', count: null },
                { id: 'newForm', label: 'New Form', count: null },
                { id: 'attachments', label: 'Attachments', count: null },
                { id: 'costCalculator', label: 'Cost Calculator', count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveBottomTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeBottomTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeBottomTab === 'forms' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Active Forms</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Accident Book Record</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(incident?.createdDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Work In Progress
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            style={{ 
                              backgroundColor: '#3d3a72', 
                              color: '#ffffff', 
                              border: 'none',
                              padding: '4px 12px',
                              borderRadius: '4px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              fontSize: '12px',
                              transition: 'opacity 0.2s'
                            }}
                            className="hover:opacity-80"
                          >
                            Proceed To Complete
                          </button>
                          <button className="text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-xs">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">View Previous Versions</h4>
                  <p className="text-sm text-gray-600">There are no previous form versions for this case</p>
                </div>
              </div>
            )}

            {activeBottomTab === 'newForm' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">New Form</h3>
                <p className="text-gray-600 mb-6">Select the type of incident form you want to create for this case</p>
                
                {/* Category Filter */}
                <div className="mb-6 flex justify-center">
                  <div className="flex items-center gap-4 max-w-lg">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Filter by Category
                    </label>
                    <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                      <option>All Categories</option>
                      <option>Safety</option>
                      <option>Operations</option>
                      <option>Quality</option>
                    </select>
                  </div>
                </div>
                
                {/* Incident Types Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      name: 'High Potential', 
                      description: 'General safety incident or concern',
                      typeCode: 'WOBBLE',
                      category: 'Safety',
                      colorClass: 'bg-red-100 text-red-600'
                    },
                    { 
                      name: 'Accident Book', 
                      description: 'Record workplace accidents',
                      typeCode: 'ACCIDENT_BOOK',
                      category: 'Safety',
                      colorClass: 'bg-red-100 text-red-600'
                    },
                    { 
                      name: 'Accident Report', 
                      description: 'Detailed accident investigation report',
                      typeCode: 'ACCIDENT_REPORT',
                      category: 'Safety',
                      colorClass: 'bg-red-100 text-red-600'
                    },
                    { 
                      name: 'Dangerous Occurrence', 
                      description: 'Report dangerous situations or occurrences',
                      typeCode: 'DANGEROUS_OCCURRENCE',
                      category: 'Safety',
                      colorClass: 'bg-red-100 text-red-600'
                    },
                    { 
                      name: 'Near Miss', 
                      description: 'Report incidents that could have caused harm',
                      typeCode: 'NEAR_MISS',
                      category: 'Safety',
                      colorClass: 'bg-red-100 text-red-600'
                    },
                    { 
                      name: 'Road Traffic Incident', 
                      description: 'Vehicle or road-related incidents',
                      typeCode: 'ROAD_TRAFFIC',
                      category: 'Safety',
                      colorClass: 'bg-red-100 text-red-600'
                    }
                  ].map((type) => {
                    const getTypeIcon = (typeCode: string) => {
                      const iconMap: Record<string, JSX.Element> = {
                        'WOBBLE': (
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ),
                        'ACCIDENT_BOOK': (
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        ),
                        'ACCIDENT_REPORT': (
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        ),
                        'DANGEROUS_OCCURRENCE': (
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        ),
                        'NEAR_MISS': (
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ),
                        'ROAD_TRAFFIC': (
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        )
                      };
                      
                      return iconMap[typeCode] || (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      );
                    };
                    
                    return (
                      <div
                        key={type.name}
                        onClick={() => handleTypeSelect(type.typeCode)}
                        className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
                      >
                        <div className={`w-20 h-20 rounded-lg ${type.colorClass} flex items-center justify-center mb-4 mx-auto`}>
                          {getTypeIcon(type.typeCode)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                          {type.name}
                        </h3>
                        <p className="text-sm text-gray-600 text-center mb-3">
                          {type.description}
                        </p>
                        <div className="text-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${type.colorClass}`}>
                            {type.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeBottomTab === 'attachments' && (
              <AttachmentsTab incidentId={incident.incidentCaseId} />
            )}

            {activeBottomTab === 'costCalculator' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Calculator</h3>
                <button
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
                  New Cost Sheet
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Audit Trail */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Audit Trail</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{formatDate(incident.createdDate)}</p>
              <p className="text-xs text-gray-500 mt-1">User ID: {incident.createdByUserId}</p>
            </div>
            {incident.modifiedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{formatDate(incident.modifiedDate)}</p>
                {incident.modifiedByUserId && (
                  <p className="text-xs text-gray-500 mt-1">User ID: {incident.modifiedByUserId}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push('/incidents')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Incidents
          </button>
          
          <button
            onClick={handleEdit}
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
        </div>
      </div>

      {/* Select Linked Records Modal */}
      {showLinkedRecordsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Select Linked Records</h2>
                <button
                  onClick={() => setShowLinkedRecordsModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Find records to associate with the current document by using the filters below then clicking 
                'Search'. In the results panel tick the box next to each record you wish to select and click 
                'Confirm' to finalise your selection.
              </p>

              {/* Filters */}
              <div className="space-y-4 mb-6">
                {/* Record Type Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
                  <select
                    value={selectedRecordType}
                    onChange={(e) => setSelectedRecordType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  >
                    {recordTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Group</label>
                    <input
                      type="text"
                      placeholder="Select Org Group"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Filter by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                      <button
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
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Area */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto mb-6">
                <p className="text-gray-500 text-sm text-center">No search results to display. Please use the filters above to search for records.</p>
              </div>

              {/* Sort Options */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-6">
                <span className="font-medium">Sort by:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="sort" defaultChecked className="text-purple-600 focus:ring-purple-500" />
                  <span>A - Z</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="sort" className="text-purple-600 focus:ring-purple-500" />
                  <span>Z - A</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="sort" className="text-purple-600 focus:ring-purple-500" />
                  <span>Date Created (Earliest to Latest)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="sort" className="text-purple-600 focus:ring-purple-500" />
                  <span>Date Created (Latest to Earliest)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowLinkedRecordsModal(false)}
                  style={{ 
                    backgroundColor: '#e77726', 
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
                  Cancel
                </button>
                <button
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
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Files Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="bg-orange-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upload files</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select files</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add files via upload queue and click the start button.
                </p>
                <p className="text-sm text-gray-500">Drag files here.</p>
              </div>

              {/* Upload Progress Area */}
              <div className="bg-orange-500 text-white px-4 py-2 rounded flex justify-between items-center">
                <span className="text-sm font-medium">Add Files Start Upload</span>
                <div className="flex gap-4 text-sm">
                  <span>0%</span>
                  <span>0 kb</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Incident Form Modals */}
      <NearMissInitialModal
        isOpen={showNearMissModal}
        onClose={() => setShowNearMissModal(false)}
        onSaveAndContinue={(data) => {
          setShowNearMissModal(false);
          window.open(`/incidents/near-miss/form?id=${data.incidentCaseId}`, '_blank');
        }}
      />

      <RoadTrafficInitialModal
        isOpen={showRoadTrafficModal}
        onClose={() => setShowRoadTrafficModal(false)}
        onSaveAndContinue={(data) => {
          setShowRoadTrafficModal(false);
          window.open(`/incidents/road-traffic/form?id=${data.incidentCaseId}`, '_blank');
        }}
      />

      <DangerousOccurrenceInitialModal
        isOpen={showDangerousOccurrenceModal}
        onClose={() => setShowDangerousOccurrenceModal(false)}
        onSaveAndContinue={(data) => {
          setShowDangerousOccurrenceModal(false);
          window.open(`/incidents/dangerous-occurrence/form?id=${data.incidentCaseId}`, '_blank');
        }}
      />

      <AccidentBookInitialModal
        isOpen={showAccidentBookModal}
        onClose={() => setShowAccidentBookModal(false)}
        onSaveAndContinue={(data) => {
          setShowAccidentBookModal(false);
          window.open(`/incidents/accident-book/form?id=${data.incidentCaseId}`, '_blank');
        }}
      />

      <HighPotentialInitialModal
        isOpen={showHighPotentialModal}
        onClose={() => setShowHighPotentialModal(false)}
        onSaveAndContinue={(data) => {
          setShowHighPotentialModal(false);
          window.open(`/incidents/high-potential/form?id=${data.incidentCaseId}`, '_blank');
        }}
      />
    </div>
  );
}