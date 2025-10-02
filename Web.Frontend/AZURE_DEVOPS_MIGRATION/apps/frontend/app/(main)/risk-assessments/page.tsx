"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PermissionGuard } from "../../../components/permissions";

interface Statistics {
  total: number;
  draft: number;
  pendingApproval: number;
  approved: number;
  rejected: number;
  overdue: number;
}

interface RecentAssessment {
  RiskAssessmentID: number;
  AssessmentNumber: string;
  AssessmentTitle: string;
  StatusName: string;
  StatusColor: string;
  AssessmentDate: string;
  AssessedByName: string;
  RiskRating: string;
}

export default function RiskAssessmentsHomePage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [recentAssessments, setRecentAssessments] = useState<RecentAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch statistics
      const statsResponse = await fetch('/api/risk-assessments/statistics', {
        headers: {
          'x-userarea-id': '1',
          'x-user-id': '1'
        }
      });
      
      if (!statsResponse.ok) throw new Error('Failed to fetch statistics');
      const statsData = await statsResponse.json();
      setStatistics(statsData.data);

      // Fetch recent assessments
      const recentResponse = await fetch('/api/risk-assessments?limit=5&sortBy=CreatedDate&sortOrder=DESC', {
        headers: {
          'x-userarea-id': '1',
          'x-user-id': '1'
        }
      });
      
      if (!recentResponse.ok) throw new Error('Failed to fetch recent assessments');
      const recentData = await recentResponse.json();
      setRecentAssessments(recentData.data);
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Risk Assessments</h1>
              <p className="text-gray-600 mt-1">Manage hazards, controls, and safety assessments</p>
            </div>
            <div className="flex gap-3">
              <PermissionGuard permission="risk-assessments.create">
                <Link 
                  href="/risk-assessments/new" 
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
                  New Risk Assessment
                </Link>
              </PermissionGuard>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Assessments</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{statistics?.total || 0}</p>
            <p className="text-sm text-gray-500 mt-1">All assessments</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Draft</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{statistics?.draft || 0}</p>
            <p className="text-sm text-gray-500 mt-1">In progress</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Pending Approval</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{statistics?.pendingApproval || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting review</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Approved</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{statistics?.approved || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Active</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Rejected</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{statistics?.rejected || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Need revision</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Overdue Review</h3>
            <p className="text-3xl font-bold" style={{ color: '#3d3a72' }}>{statistics?.overdue || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Action required</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PermissionGuard permission="risk-assessments.view">
            <Link href="/risk-assessments/manage" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Manage Assessments</h3>
                <p className="text-gray-600">View and edit existing risk assessments</p>
              </div>
            </Link>
          </PermissionGuard>

          <PermissionGuard permission="risk-assessments.approve">
            <Link href="/risk-assessments/approvals" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Manage Approvals</h3>
                <p className="text-gray-600">Review and approve pending assessments</p>
                {statistics?.pendingApproval ? (
                  <div className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                    {statistics.pendingApproval} pending
                  </div>
                ) : null}
              </div>
            </Link>
          </PermissionGuard>

          <PermissionGuard permission="risk-assessments.view">
            <Link href="/risk-assessments/monitoring" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Monitoring History</h3>
                <p className="text-gray-600">Track assessments due for review</p>
                {statistics?.overdue ? (
                  <div className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    {statistics.overdue} overdue
                  </div>
                ) : null}
              </div>
            </Link>
          </PermissionGuard>

          <PermissionGuard permission="risk-assessments.audit">
            <Link href="/risk-assessments/changelog" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Change Log</h3>
                <p className="text-gray-600">View audit trail and history</p>
              </div>
            </Link>
          </PermissionGuard>
        </div>

        {/* Recent Assessments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Recent Risk Assessments</h2>
            <p className="text-gray-600 text-sm mt-1">Latest assessments and their current status</p>
          </div>
          <div className="p-6">
            {recentAssessments.length === 0 ? (
              <p className="text-gray-500">No risk assessments found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessed By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAssessments.map((assessment) => (
                      <tr key={assessment.RiskAssessmentID} className="hover:bg-purple-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{assessment.AssessmentNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assessment.AssessmentTitle}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                            style={{ backgroundColor: assessment.StatusColor + '20', color: assessment.StatusColor }}
                          >
                            {assessment.StatusName}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            assessment.RiskRating === 'High' ? 'bg-red-100 text-red-800' :
                            assessment.RiskRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {assessment.RiskRating || 'Not Rated'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assessment.AssessedByName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(assessment.AssessmentDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link 
                            href={`/risk-assessments/${assessment.RiskAssessmentID}`}
                            style={{ 
                              backgroundColor: '#3d3a72', 
                              color: '#ffffff', 
                              border: 'none',
                              padding: '4px 12px',
                              borderRadius: '4px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              fontSize: '12px',
                              transition: 'opacity 0.2s',
                              textDecoration: 'none',
                              display: 'inline-block'
                            }} 
                            className="hover:opacity-80"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}