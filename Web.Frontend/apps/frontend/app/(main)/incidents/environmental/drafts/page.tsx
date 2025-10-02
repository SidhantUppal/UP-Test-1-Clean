"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DraftIncident {
  id: string;
  title: string;
  location: string;
  incidentType: string;
  severity: string;
  description: string;
  lastModified: string;
  createdBy: string;
  assignedInvestigator?: string;
}

export default function EnvironmentalDraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<DraftIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);

  // Load drafts from localStorage (in a real app, this would be from API)
  useEffect(() => {
    const loadDrafts = () => {
      try {
        const savedDrafts = localStorage.getItem('environmentalIncidentDrafts');
        if (savedDrafts) {
          setDrafts(JSON.parse(savedDrafts));
        }
      } catch (error) {
        console.error('Error loading drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDrafts();
  }, []);

  const handleViewDraft = (draftId: string) => {
    router.push(`/incidents/environmental/incident-form?draftId=${draftId}`);
  };

  const handleDeleteDraft = (draftId: string) => {
    setDraftToDelete(draftId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (draftToDelete) {
      const updatedDrafts = drafts.filter(draft => draft.id !== draftToDelete);
      setDrafts(updatedDrafts);

      // Update localStorage
      localStorage.setItem('environmentalIncidentDrafts', JSON.stringify(updatedDrafts));

      setShowDeleteModal(false);
      setDraftToDelete(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Draft Environmental Incidents</h1>
            <p className="text-gray-600 mt-1">Loading your saved drafts...</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Draft Environmental Incidents</h1>
              <p className="text-gray-600 mt-1">Manage your saved draft incident reports</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/incidents/environmental/incident-form')}
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
                Create New Report
              </button>
              <button
                onClick={() => router.push('/incidents/environmental')}
                style={{
                  backgroundColor: '#6b7280',
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
                Back to Environmental
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 lg:px-12 xl:px-16">
        {drafts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Draft Reports</h3>
            <p className="text-gray-600 mb-6">
              You don't have any saved draft environmental incident reports. Start creating a new report to save drafts.
            </p>
            <button
              onClick={() => router.push('/incidents/environmental/incident-form')}
              style={{
                backgroundColor: '#3d3a72',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'opacity 0.2s'
              }}
              className="hover:opacity-80"
            >
              Create New Environmental Incident Report
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Saved Drafts ({drafts.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Click on a draft to continue editing
                </div>
              </div>
            </div>

            {/* Drafts List */}
            <div className="divide-y divide-gray-200">
              {drafts.map((draft) => (
                <div key={draft.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 cursor-pointer" onClick={() => handleViewDraft(draft.id)}>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 hover:text-purple-600">
                          {draft.title || 'Untitled Draft'}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(draft.severity)}`}>
                          {draft.severity}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                          DRAFT
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Location:</span>
                          <p className="text-sm text-gray-900">{draft.location || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Incident Type:</span>
                          <p className="text-sm text-gray-900">{draft.incidentType || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Investigator:</span>
                          <p className="text-sm text-gray-900">{draft.assignedInvestigator || 'Not assigned'}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-500">Description:</span>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {draft.description || 'No description provided'}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Created by: {draft.createdBy}</span>
                        <span>Last modified: {formatDate(draft.lastModified)}</span>
                        <span>Draft ID: {draft.id}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleViewDraft(draft.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteModal(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Delete Draft</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Are you sure you want to delete this draft? This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}