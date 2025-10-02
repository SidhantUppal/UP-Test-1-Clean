"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { incidentService, IncompleteIncident } from '@/services/incidentService';


export default function IncompleteIncidentForms() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedForms, setSelectedForms] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [incompleteForms, setIncompleteForms] = useState<IncompleteIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0, totalPages: 0 });

  // Fetch incomplete incidents from API
  const fetchIncompleteIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        page: pagination.page,
        pageSize: pagination.pageSize
      };
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (selectedType !== "all") {
        // Map display names to type codes
        const typeCodeMap: { [key: string]: string } = {
          "High Potential Incident": "WOBBLE",
          "Accident Report": "ACCIDENT_REPORT",
          "Near Miss": "NEAR_MISS",
          "Dangerous Occurrence": "DANGEROUS_OCCURRENCE",
          "Road Traffic Incident": "ROAD_TRAFFIC",
          "Accident Book": "ACCIDENT_BOOK",
          "Farming Incidents": "FARMING"
        };
        params.typeCode = typeCodeMap[selectedType];
      }
      
      const result = await incidentService.getIncompleteIncidents(params);
      setIncompleteForms(result.incidents);
      setPagination(result.pagination);
    } catch (err) {
      console.error('Failed to fetch incomplete incidents:', err);
      setError('Failed to load incomplete incidents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncompleteIncidents();
  }, [pagination.page, selectedType]);

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pagination.page === 1) {
        fetchIncompleteIncidents();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredForms = incompleteForms;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedForms(filteredForms.map(form => form.incidentCaseId));
    } else {
      setSelectedForms([]);
    }
  };

  const handleSelectForm = (formId: number) => {
    setSelectedForms(prev => 
      prev.includes(formId) 
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedForms.length > 0) {
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = async () => {
    try {
      // Delete selected forms
      for (const formId of selectedForms) {
        await incidentService.deleteIncident(formId);
      }
      
      // Refresh the list
      await fetchIncompleteIncidents();
      setSelectedForms([]);
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Failed to delete incidents:', err);
      setError('Failed to delete some incidents. Please try again.');
      setShowDeleteModal(false);
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return "progress-success";
    if (percentage >= 50) return "progress-warning";
    return "progress-error";
  };

  const formTypes = ["all", "High Potential Incident", "Accident Report", "Near Miss", "Dangerous Occurrence", "Road Traffic Incident", "Accident Book", "Farming Incidents"];

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Incomplete Incident Forms</h1>
              <p className="text-gray-600 mt-1">Review and complete draft incident reports ({pagination.total} total)</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/incidents/form" 
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s',
                  textDecoration: 'none',
                  display: 'inline-block'
                }} 
                className="hover:opacity-80"
              >
                New Incident
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Forms
            </label>
            <input
              type="text"
              placeholder="Search by form ID, reporter, or location..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="lg:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Type
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {formTypes.map(type => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Forms Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Started</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <tr key={form.incidentCaseId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{form.formId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {form.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.startedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(form.dateStarted)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(form.lastModified)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            form.completionPercentage >= 75 ? 'bg-green-600' : 
                            form.completionPercentage >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${form.completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{form.completionPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          // Route to the appropriate form editor based on typeCode
                          const typeRouteMap: { [key: string]: string } = {
                            'WOBBLE': '/incidents/high-potential/form',
                            'ACCIDENT_BOOK': '/incidents/accident-book/form',
                            'NEAR_MISS': '/incidents/near-miss/form',
                            'DANGEROUS_OCCURRENCE': '/incidents/dangerous-occurrence/form',
                            'ROAD_TRAFFIC': '/incidents/road-traffic/form',
                            'ACCIDENT_REPORT': '/incidents/accident-report/new',
                            'FARMING': '/incidents/farming/new'
                          };
                          const route = typeRouteMap[form.typeCode] || `/incidents/form/${form.typeCode}`;
                          router.push(`${route}?id=${form.incidentCaseId}`);
                        }}
                        style={{ 
                          backgroundColor: '#3d3a72', 
                          color: '#ffffff', 
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => router.push(`/incidents/${form.incidentCaseId}`)}
                        style={{ 
                          backgroundColor: '#3d3a72', 
                          color: '#ffffff', 
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80"
                      >
                        View
                      </button>
                      <button 
                        onClick={async () => {
                          if (confirm(`Are you sure you want to delete ${form.formId}?`)) {
                            try {
                              await incidentService.deleteIncident(form.incidentCaseId);
                              await fetchIncompleteIncidents();
                            } catch (err) {
                              setError('Failed to delete incident. Please try again.');
                            }
                          }
                        }}
                        style={{ 
                          backgroundColor: '#e77726', 
                          color: '#ffffff', 
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-80"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((pagination.page - 1) * pagination.pageSize) + 1} to {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedForms.length} selected form{selectedForms.length > 1 ? 's' : ''}? 
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Forms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}