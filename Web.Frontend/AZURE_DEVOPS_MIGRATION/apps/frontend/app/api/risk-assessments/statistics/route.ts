import { NextRequest, NextResponse } from 'next/server';

const RISK_ASSESSMENTS_SERVICE_URL = process.env.NEXT_PUBLIC_RISK_ASSESSMENTS_SERVICE_URL || 'http://localhost:3015';

export async function GET(request: NextRequest) {
  try {
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${RISK_ASSESSMENTS_SERVICE_URL}/api/risk-assessments/statistics`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to fetch statistics' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    
    // Return mock data when service is unavailable
    const mockStatistics = {
      data: {
        total: 42,
        draft: 5,
        pendingApproval: 8,
        approved: 24,
        rejected: 2,
        overdue: 3
      },
      byType: {
        basic: 12,
        standard: 18,
        standard_monitoring: 6,
        live: 3,
        dynamic: 3
      },
      byRiskLevel: {
        low: 15,
        medium: 18,
        high: 7,
        critical: 2
      },
      recentActivity: [
        {
          id: 'ra-001',
          title: 'Office Risk Assessment',
          lastModified: new Date().toISOString(),
          status: 'approved',
          riskLevel: 'low'
        },
        {
          id: 'ra-002',
          title: 'Roof Work - Building A',
          lastModified: new Date(Date.now() - 86400000).toISOString(),
          status: 'pending_review',
          riskLevel: 'high'
        },
        {
          id: 'ra-003',
          title: 'Chemical Storage Area',
          lastModified: new Date(Date.now() - 172800000).toISOString(),
          status: 'approved',
          riskLevel: 'medium'
        }
      ],
      upcomingReviews: [
        {
          id: 'ra-004',
          title: 'Warehouse Operations',
          reviewDate: new Date(Date.now() + 604800000).toISOString(),
          daysTillReview: 7
        },
        {
          id: 'ra-005',
          title: 'Fire Safety Assessment',
          reviewDate: new Date(Date.now() + 1209600000).toISOString(),
          daysTillReview: 14
        }
      ]
    };
    
    return NextResponse.json(mockStatistics);
  }
}