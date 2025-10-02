"use client";

import { useState, useEffect, useCallback } from 'react';
import { incidentService } from '@/services/incidentService';
import { useRouter } from 'next/navigation';
import { useIncidentLookups } from '@/hooks/useIncidentLookups';
import DeleteConfirmationModal from '@/components/incidents/DeleteConfirmationModal';
import FilterSection, { FilterConfig } from '@/components/common/FilterSection';
import Pagination, { PaginationInfo } from '@/components/common/Pagination';
import useFilters from '@/hooks/useFilters';
import usePagination from '@/hooks/usePagination';
import {
  createSelectField,
  createDateField,
  createStatusQuickFilter,
  createSeverityQuickFilter,
  createDateRangeQuickFilter,
  buildFilterConfig,
  backendFilterUtils
} from '@/utils/filterHelpers';

export default function ManageIncidents() {
  const router = useRouter();
  const [incidents, setIncidents] = useState<any[]>([]);
  const [allIncidents, setAllIncidents] = useState<any[]>([]); // Store all incidents for stats
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    pageSize: 25,
    totalCount: 0,
    totalPages: 0,
    hasFilters: false
  });
  
  // Load incident lookup data
  const {
    lookupData,
    loading: lookupsLoading,
    error: lookupsError,
    getSeverityDisplay,
    getStatusDisplay,
    getPriorityDisplay,
    getTypeDisplay
  } = useIncidentLookups();
  
  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    incident: any | null;
  }>({
    isOpen: false,
    incident: null
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  
  // Filter states using the reusable hook
  const initialFilters = {
    type: '',
    status: '',
    severity: '',
    dateFrom: '',
    dateTo: ''
  };

  // Pagination hook
  const {
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = usePagination({
    initialPage: 1,
    initialPageSize: 25,
    onPaginationChange: (newPage: number, newPageSize: number | 'All') => {
      // Trigger filter refresh with new pagination
      setPaginationInfo((prev: PaginationInfo) => ({
        ...prev,
        page: newPage,
        pageSize: newPageSize
      }));
    }
  });

  // Backend filter handler with pagination
  const handleFiltersChange = useCallback(async (filters: typeof initialFilters, paginationOverride?: { page?: number; pageSize?: number | 'All' }) => {
    try {
      setLoading(true);
      setError(null);

      // Convert frontend filters to backend parameters
      const backendParams = backendFilterUtils.convertIncidentFilters(filters);

      // Add pagination parameters
      const currentPage = paginationOverride?.page ?? page;
      const currentPageSize = paginationOverride?.pageSize ?? pageSize;

      // Handle "All" option - use a very large page size
      const actualPageSize = currentPageSize === 'All' ? 10000 : currentPageSize;
      const actualPage = currentPageSize === 'All' ? 1 : currentPage;

      // Call backend with filters and pagination
      const result = await incidentService.getIncidents({
        page: actualPage,
        pageSize: actualPageSize,
        ...backendParams
      });

      // Update incidents and pagination info
      setIncidents(result.incidents || []);
      setPaginationInfo({
        page: currentPageSize === 'All' ? 1 : currentPage,
        pageSize: currentPageSize,
        totalCount: result.pagination?.totalCount || 0,
        totalPages: currentPageSize === 'All' ? 1 : (result.pagination?.totalPages || 0),
        hasFilters: Object.values(filters).some(value => value !== '' && value !== null && value !== undefined)
      });
    } catch (err: any) {
      console.error('Failed to apply filters:', err);
      setError(`Failed to apply filters: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  const {
    filters,
    updateFilter,
    applyFilters,
    clearFilters,
    isApplying
  } = useFilters({
    initialFilters,
    onFiltersChange: handleFiltersChange
  });

  // Fetch all incidents for stats (unpaginated)
  const fetchAllIncidentsForStats = async () => {
    try {
      // Get all incidents without pagination for stats
      const result = await incidentService.getIncidents({ pageSize: 1000 }); // Large page size for stats
      setAllIncidents(result.incidents || []);
    } catch (err: any) {
      console.error('Failed to fetch incidents for stats:', err);
    }
  };

  // Handle pagination changes
  const handlePaginationChange = useCallback((newPage: number) => {
    handlePageChange(newPage);
    // Trigger filter refresh with new page
    handleFiltersChange(filters, { page: newPage, pageSize });
  }, [filters, pageSize, handlePageChange, handleFiltersChange]);

  const handlePaginationPageSizeChange = useCallback((newPageSize: number | 'All') => {
    handlePageSizeChange(newPageSize);
    // Trigger filter refresh with new page size (resets to page 1)
    handleFiltersChange(filters, { page: 1, pageSize: newPageSize });
  }, [filters, handlePageSizeChange, handleFiltersChange]);

  // Initial load
  const fetchIncidents = async () => {
    // Load stats data
    await fetchAllIncidentsForStats();
    // Load first page with initial filters
    await handleFiltersChange(initialFilters, { page: 1, pageSize: 25 });
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'under review': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Create filter configuration
  const filterConfig: FilterConfig = buildFilterConfig(
    'Incidents',
    [
      createSelectField('type', 'Incident Type', lookupData?.incidentTypes, {
        valueField: 'IncidentTypeID',
        labelField: 'Title',
        idField: 'IncidentTypeID',
        allLabel: 'All Types'
      }),
      createSelectField('status', 'Status', lookupData?.statusTypes, {
        valueField: 'IncidentStatusTypeID',
        labelField: 'Title',
        idField: 'IncidentStatusTypeID',
        allLabel: 'All Statuses'
      }),
      createSelectField('severity', 'Severity', lookupData?.severityTypes, {
        valueField: 'IncidentSeverityTypeID',
        labelField: 'Title',
        idField: 'IncidentSeverityTypeID',
        allLabel: 'All Severities'
      }),
      createDateField('dateFrom', 'Date From'),
      createDateField('dateTo', 'Date To')
    ],
    filters,
    incidents.length,
    updateFilter,
    applyFilters,
    clearFilters,
    [
      createStatusQuickFilter(
        'Open Only',
        'OPEN',
        lookupData?.statusTypes,
        (statusId: any) => {
          // Update filter state
          updateFilter('status', statusId.toString());
          // Apply filters with updated state immediately
          const updatedFilters = { ...filters, status: statusId.toString() };
          handleFiltersChange(updatedFilters, { page: 1, pageSize });
        },
        'bg-blue-100 text-blue-800 border border-blue-200'
      ),
      createSeverityQuickFilter(
        'Critical Severity',
        3,
        lookupData?.severityTypes,
        async (severityIds: any[]) => {
          // For backend filtering, we'll apply a severity filter
          if (severityIds.length > 0) {
            // Update filter state
            updateFilter('severity', severityIds[0].toString());
            // Apply filters with updated state immediately
            const updatedFilters = { ...filters, severity: severityIds[0].toString() };
            handleFiltersChange(updatedFilters, { page: 1, pageSize });
          }
        },
        'bg-red-100 text-red-800 border border-red-200'
      ),
      {
        label: 'Last 7 Days',
        colorClass: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        onClick: () => {
          // For backend filtering, set date range
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const fromDate = sevenDaysAgo.toISOString().split('T')[0];


          // Update filter state
          updateFilter('dateFrom', fromDate);
          updateFilter('dateTo', '');
          // Apply filters with updated state immediately
          const updatedFilters = { ...filters, dateFrom: fromDate, dateTo: '' };
          handleFiltersChange(updatedFilters, { page: 1, pageSize });
        }
      }
    ]
  );

  // Delete incident handlers
  const handleDeleteClick = (incident: any) => {
    setDeleteModal({
      isOpen: true,
      incident: incident
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.incident) return;
    
    try {
      await incidentService.deleteIncident(deleteModal.incident.IncidentCaseID);
      
      // Show success notification
      setNotification({
        type: 'success',
        message: `Incident ${deleteModal.incident.CaseNumber} has been archived successfully.`
      });

      // Refresh the incidents list
      await fetchIncidents();
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    } catch (error: any) {
      console.error('Failed to delete incident:', error);
      setNotification({
        type: 'error',
        message: `Failed to archive incident: ${error.message || 'Unknown error'}`
      });
      
      // Auto-hide notification after 8 seconds for errors
      setTimeout(() => setNotification(null), 8000);
    }
  };

  const handleDeleteModalClose = () => {
    setDeleteModal({
      isOpen: false,
      incident: null
    });
  };

  // View and Edit handlers
  const handleViewClick = (incident: any) => {
    router.push(`/incidents/${incident.IncidentCaseID}`);
  };

  const handleEditClick = (incident: any) => {
    const incidentTypeId = incident.IncidentTypeID;

    console.log('Edit incident:', incident);
    console.log('IncidentTypeID:', incidentTypeId);

    if (!incidentTypeId) {
      console.error('No IncidentTypeID found for incident:', incident);
      setNotification({
        type: 'error',
        message: 'Cannot edit incident: Type ID not found'
      });
      return;
    }

    // Route to database-driven edit URLs: /incidents/edit/{typeId}/{incidentId}
    // The edit page will dynamically load the incident type from database
    router.push(`/incidents/edit/${incidentTypeId}/${incident.IncidentCaseID}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Manage Incidents</h1>
              <p className="text-gray-600 mt-1">View, edit, and manage all incident reports ({incidents.length} total)</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => router.push('/incidents/form')}
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
                Create New
              </button>
              <button 
                onClick={fetchIncidents}
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
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Notification */}
        {notification && (
          <div className={`${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
            } border rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg 
                  className={`w-5 h-5 mr-2 ${
                    notification.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  {notification.type === 'success' ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  )}
                </svg>
                <span>{notification.message}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {(error || lookupsError) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error || lookupsError}</span>
            </div>
          </div>
        )}

        {/* Lookup Data Loading State */}
        {lookupsLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-blue-800">Loading incident lookup data...</span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Incidents</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{allIncidents.length}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Open Incidents</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>
              {allIncidents.filter(i => {
                const status = getStatusDisplay(i.IncidentStatusTypeID);
                return status?.Reference === 'OPEN';
              }).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Requires attention</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">High Severity</h3>
            <p className="text-3xl font-bold" style={{ color: '#e77726' }}>
              {allIncidents.filter(i => {
                const severity = getSeverityDisplay(i.IncidentSeverityTypeID);
                return severity?.SeverityLevel && severity.SeverityLevel >= 3; // High=3, Critical=4
              }).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Critical & High</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Recent Incidents</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>
              {allIncidents.filter(i => {
                const incidentDate = new Date(i.IncidentDate);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return incidentDate >= thirtyDaysAgo;
              }).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
        </div>

        {/* Filters Section - Using Reusable Component */}
        <FilterSection config={filterConfig} loading={lookupsLoading} isApplying={isApplying} />

        {/* Incidents Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading incidents...</p>
            </div>
          ) : incidents.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No incidents found</h3>
              <p className="text-gray-600">There are no incidents to display at the moment.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">
                      Case Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">
                      Incident Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-purple-100 transition-colors">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {incidents.map((incident) => (
                    <tr key={incident.IncidentCaseID} className="hover:bg-purple-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {incident.CaseNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(() => {
                          const type = getTypeDisplay(incident.IncidentTypeID);
                          return type?.Title || incident.Title || '-';
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(incident.IncidentDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          const severity = getSeverityDisplay(incident.IncidentSeverityTypeID);
                          return (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              severity?.ColorCode || 'bg-gray-100 text-gray-800'
                            }`}>
                              {severity?.Title || '-'}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          const status = getStatusDisplay(incident.IncidentStatusTypeID);
                          return (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              status?.ColorCode || 'bg-gray-100 text-gray-800'
                            }`}>
                              {status?.Title || '-'}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handleViewClick(incident)}
                          style={{ 
                            backgroundColor: '#3d3a72', 
                            color: '#ffffff', 
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleEditClick(incident)}
                          style={{ 
                            backgroundColor: '#3d3a72', 
                            color: '#ffffff', 
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(incident)}
                          style={{ 
                            backgroundColor: '#e77726', 
                            color: '#ffffff', 
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'opacity 0.2s'
                          }}
                          className="hover:opacity-80"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && incidents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
            <Pagination
              pagination={paginationInfo}
              onPageChange={handlePaginationChange}
              onPageSizeChange={handlePaginationPageSizeChange}
              pageSizeOptions={[10, 25, 50, 100, 'All']}
              showPageSizeSelector={true}
              showInfo={true}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        incident={deleteModal.incident}
      />
    </div>
  );
}