"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PermissionGuard } from "../../../../components/permissions";

interface RiskAssessment {
  RiskAssessmentID: number;
  AssessmentNumber: string;
  AssessmentTitle: string;
  Activity: string;
  Location: string;
  StatusName: string;
  StatusColor: string;
  AssessmentTypeName: string;
  AssessedByName: string;
  AssessmentDate: string;
  NextReviewDate: string;
  RiskRating: string;
  OverallRiskScore: number;
}

export default function ManageRiskAssessmentsPage() {
  const [assessments, setAssessments] = useState<RiskAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAssessments();
  }, [page, searchTerm]);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        search: searchTerm
      });

      const response = await fetch(`/api/risk-assessments?${params}`, {
        headers: {
          'x-userarea-id': '1',
          'x-user-id': '1'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch assessments');
      
      const data = await response.json();
      setAssessments(data.data);
      setTotalPages(data.metadata.totalPages);
    } catch (err) {
      console.error('Error fetching assessments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this risk assessment?')) return;

    try {
      const response = await fetch(`/api/risk-assessments/${id}`, {
        method: 'DELETE',
        headers: {
          'x-userarea-id': '1',
          'x-user-id': '1'
        }
      });

      if (!response.ok) throw new Error('Failed to delete assessment');
      
      // Refresh the list
      fetchAssessments();
    } catch (err) {
      console.error('Error deleting assessment:', err);
      alert('Failed to delete assessment');
    }
  };

  if (loading && assessments.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Manage Risk Assessments</h1>
            <p className="text-gray-600 mt-1">
              View and manage all risk assessments
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by title or assessment number..."
            className="input input-bordered flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => fetchAssessments()} 
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Assessments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Assessment Number</th>
                <th>Title</th>
                <th>Type</th>
                <th>Activity/Location</th>
                <th>Status</th>
                <th>Risk Score</th>
                <th>Assessed By</th>
                <th>Review Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-500">
                    No risk assessments found
                  </td>
                </tr>
              ) : (
                assessments.map((assessment) => (
                  <tr key={assessment.RiskAssessmentID} className="hover">
                    <td className="font-mono text-sm">{assessment.AssessmentNumber}</td>
                    <td>
                      <div className="font-medium">{assessment.AssessmentTitle}</div>
                    </td>
                    <td>{assessment.AssessmentTypeName || 'General'}</td>
                    <td>
                      <div className="text-sm">
                        {assessment.Activity && <div>Activity: {assessment.Activity}</div>}
                        {assessment.Location && <div>Location: {assessment.Location}</div>}
                      </div>
                    </td>
                    <td>
                      <span 
                        className="badge"
                        style={{ backgroundColor: assessment.StatusColor, color: 'white' }}
                      >
                        {assessment.StatusName}
                      </span>
                    </td>
                    <td>
                      {assessment.OverallRiskScore ? (
                        <span className={`badge ${
                          assessment.OverallRiskScore > 15 ? 'badge-error' :
                          assessment.OverallRiskScore > 8 ? 'badge-warning' :
                          'badge-success'
                        }`}>
                          {assessment.OverallRiskScore}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td>{assessment.AssessedByName}</td>
                    <td>
                      {assessment.NextReviewDate ? (
                        <div className="text-sm">
                          {new Date(assessment.NextReviewDate).toLocaleDateString()}
                          {new Date(assessment.NextReviewDate) < new Date() && (
                            <span className="badge badge-error badge-sm ml-2">Overdue</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link 
                          href={`/risk-assessments/${assessment.RiskAssessmentID}`}
                          className="btn btn-sm btn-ghost"
                        >
                          View
                        </Link>
                        <PermissionGuard permission="risk-assessments.edit">
                          {assessment.StatusName === 'Draft' && (
                            <Link 
                              href={`/risk-assessments/${assessment.RiskAssessmentID}/edit`}
                              className="btn btn-sm btn-ghost"
                            >
                              Edit
                            </Link>
                          )}
                        </PermissionGuard>
                        <PermissionGuard permission="risk-assessments.delete">
                          <button
                            onClick={() => handleDelete(assessment.RiskAssessmentID)}
                            className="btn btn-sm btn-ghost text-error"
                          >
                            Delete
                          </button>
                        </PermissionGuard>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-4 border-t">
            <div className="join">
              <button 
                className="join-item btn btn-sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                «
              </button>
              <button className="join-item btn btn-sm">
                Page {page} of {totalPages}
              </button>
              <button 
                className="join-item btn btn-sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}