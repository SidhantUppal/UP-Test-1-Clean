'use client';

import React, { useState, useEffect } from 'react';
import { incidentService, type LinkedCase, type IncidentSearchResult } from '@/services/incidentService';

interface LinkedCasesTabProps {
  incidentId: number;
}

interface LinkFormData {
  selectedIncidentId: number | null;
  comments: string;
  linkType: string;
}

const LinkedCasesTab: React.FC<LinkedCasesTabProps> = ({ incidentId }) => {
  const [linkedCases, setLinkedCases] = useState<{
    outgoingLinks: LinkedCase[];
    incomingLinks: LinkedCase[];
    totalCount: number;
  }>({ outgoingLinks: [], incomingLinks: [], totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<LinkFormData>({
    selectedIncidentId: null,
    comments: '',
    linkType: 'Related'
  });
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [allIncidents, setAllIncidents] = useState<IncidentSearchResult[]>([]);

  // Load linked cases on component mount
  useEffect(() => {
    loadLinkedCases();
  }, [incidentId]);

  // Load all incidents when form opens
  useEffect(() => {
    if (showAddForm && allIncidents.length === 0) {
      loadAllIncidents();
    }
  }, [showAddForm]);

  const loadLinkedCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const cases = await incidentService.getLinkedCases(incidentId);
      setLinkedCases(cases);
    } catch (err) {
      console.error('Error loading linked cases:', err);
      setError(err instanceof Error ? err.message : 'Failed to load linked cases');
    } finally {
      setLoading(false);
    }
  };

  const loadAllIncidents = async () => {
    try {
      setSearching(true);
      // Load all incidents excluding the current one
      const results = await incidentService.searchIncidentsForLinking(incidentId, {
        search: '',
        limit: 100  // Get more incidents for the dropdown
      });
      setAllIncidents(results);
    } catch (err) {
      console.error('Error loading incidents:', err);
      setAllIncidents([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSaveLink = async () => {
    if (!formData.selectedIncidentId || !formData.comments.trim()) {
      alert('Please select an incident and provide comments.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const selectedIncident = allIncidents.find(r => r.incidentCaseId === formData.selectedIncidentId);
      
      await incidentService.createLinkedCase(incidentId, {
        linkedRecordType: 'IncidentCase',
        linkedRecordId: formData.selectedIncidentId,
        linkedRecordTitle: selectedIncident?.displayText,
        linkComments: formData.comments,
        linkType: formData.linkType
      });

      // Reset form and reload data
      setFormData({ selectedIncidentId: null, comments: '', linkType: 'Related' });
      setShowAddForm(false);
      await loadLinkedCases();
      
    } catch (err) {
      console.error('Error saving linked case:', err);
      setError(err instanceof Error ? err.message : 'Failed to save linked case');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLink = async (linkId: number) => {
    if (!confirm('Are you sure you want to remove this linked case?')) {
      return;
    }

    try {
      setError(null);
      await incidentService.deleteLinkedCase(incidentId, linkId);
      await loadLinkedCases();
    } catch (err) {
      console.error('Error deleting linked case:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete linked case');
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

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Linked Cases ({linkedCases.totalCount})
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
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
          {showAddForm ? 'Cancel' : 'Add Linked Case'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="text-red-600 text-sm">{error}</div>
        </div>
      )}

      {showAddForm && (
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-4">Add Linked Case</h4>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Select incident dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Incident <span className="text-red-500">*</span>
              </label>
              {searching ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="ml-2 text-sm text-gray-500">Loading incidents...</span>
                </div>
              ) : (
                <>
                  <select
                    value={formData.selectedIncidentId || ''}
                    onChange={(e) => {
                      const selectedId = e.target.value ? parseInt(e.target.value) : null;
                      setFormData({ ...formData, selectedIncidentId: selectedId });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  >
                    <option value="">-- Select an incident --</option>
                    {allIncidents.map((incident) => (
                      <option key={incident.incidentCaseId} value={incident.incidentCaseId}>
                        {incident.caseNumber} - {incident.typeName} ({formatDate(incident.incidentDate).split(',')[0]})
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>

            {/* Selected incident details */}
            {formData.selectedIncidentId && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                {(() => {
                  const selected = allIncidents.find(i => i.incidentCaseId === formData.selectedIncidentId);
                  if (!selected) return null;
                  return (
                    <div>
                      <h5 className="font-medium text-sm text-gray-900 mb-1">
                        Selected: {selected.caseNumber} - {selected.typeName}
                      </h5>
                      {selected.description && (
                        <p className="text-xs text-gray-600">
                          {selected.description.substring(0, 150)}
                          {selected.description.length > 150 && '...'}
                        </p>
                      )}
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(selected.severity)}`}>
                          {selected.severity}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(selected.status)}`}>
                          {selected.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(selected.incidentDate)}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Link Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Type
              </label>
              <select
                value={formData.linkType}
                onChange={(e) => setFormData({ ...formData, linkType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="Related">Related</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Parent">Parent</option>
                <option value="Child">Child</option>
                <option value="Follows">Follows</option>
                <option value="Precedes">Precedes</option>
              </select>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                placeholder="Describe the relationship between these incidents..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveLink}
                disabled={saving || !formData.selectedIncidentId || !formData.comments.trim()}
                style={{ 
                  backgroundColor: formData.selectedIncidentId && formData.comments.trim() ? '#3d3a72' : '#9ca3af', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: formData.selectedIncidentId && formData.comments.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }}
                className="hover:opacity-80"
              >
                {saving ? 'Saving...' : 'Save Linked Case'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Linked Cases List */}
      <div className="space-y-6">
        {/* Outgoing Links */}
        {linkedCases.outgoingLinks.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">
              Cases Linked from This Incident ({linkedCases.outgoingLinks.length})
            </h4>
            <div className="space-y-3">
              {linkedCases.outgoingLinks.map((link) => (
                <div key={link.linkId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium">
                          <a 
                            href={`/incidents/${link.linkedRecordId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            {link.incidentDetails?.caseNumber} - {link.incidentDetails?.typeName}
                          </a>
                        </h5>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {link.linkType}
                        </span>
                        {link.incidentDetails && (
                          <>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(link.incidentDetails.severity)}`}>
                              {link.incidentDetails.severity}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(link.incidentDetails.status)}`}>
                              {link.incidentDetails.status}
                            </span>
                          </>
                        )}
                      </div>
                      {link.linkComments && (
                        <p className="text-sm text-gray-600 mb-2">{link.linkComments}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Added on {formatDate(link.createdDate)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteLink(link.linkId)}
                      className="px-3 py-1 text-xs font-medium text-white bg-orange-500 border border-orange-500 rounded hover:bg-orange-600 hover:border-orange-600 transition-colors ml-4"
                      style={{ backgroundColor: '#e77726', borderColor: '#e77726' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incoming Links */}
        {linkedCases.incomingLinks.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">
              Cases That Link to This Incident ({linkedCases.incomingLinks.length})
            </h4>
            <div className="space-y-3">
              {linkedCases.incomingLinks.map((link) => (
                <div key={link.linkId} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium">
                          <a 
                            href={`/incidents/${link.sourceIncidentCaseId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            {link.incidentDetails?.caseNumber} - {link.incidentDetails?.typeName}
                          </a>
                        </h5>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {link.linkType}
                        </span>
                        {link.incidentDetails && (
                          <>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(link.incidentDetails.severity)}`}>
                              {link.incidentDetails.severity}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(link.incidentDetails.status)}`}>
                              {link.incidentDetails.status}
                            </span>
                          </>
                        )}
                      </div>
                      {link.linkComments && (
                        <p className="text-sm text-gray-600 mb-2">{link.linkComments}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Added on {formatDate(link.createdDate)} (incoming link)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {linkedCases.totalCount === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No linked cases</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by adding a linked case to this incident.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
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
                Add Your First Linked Case
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedCasesTab;