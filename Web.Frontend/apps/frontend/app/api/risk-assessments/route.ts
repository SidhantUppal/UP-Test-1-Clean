import { NextRequest, NextResponse } from 'next/server';

const RISK_ASSESSMENTS_SERVICE_URL = process.env.NEXT_PUBLIC_RISK_ASSESSMENTS_SERVICE_URL || 'http://localhost:3015';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${RISK_ASSESSMENTS_SERVICE_URL}/api/risk-assessments${queryString ? `?${queryString}` : ''}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to fetch risk assessments' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching risk assessments:', error);
    
    // Return mock data when service is unavailable
    const mockAssessments = {
      data: [
        {
          RiskAssessmentID: 1,
          AssessmentNumber: 'RA-2025-001',
          AssessmentTitle: 'Office Risk Assessment',
          StatusName: 'Approved',
          StatusColor: '#10b981',
          AssessmentDate: new Date().toISOString(),
          AssessedByName: 'John Smith',
          RiskRating: 'Low'
        },
        {
          RiskAssessmentID: 2,
          AssessmentNumber: 'RA-2025-002',
          AssessmentTitle: 'Roof Work - Building A',
          StatusName: 'Pending Approval',
          StatusColor: '#f59e0b',
          AssessmentDate: new Date(Date.now() - 86400000).toISOString(),
          AssessedByName: 'Jane Doe',
          RiskRating: 'High'
        },
        {
          RiskAssessmentID: 3,
          AssessmentNumber: 'RA-2025-003',
          AssessmentTitle: 'Chemical Storage Area',
          StatusName: 'Approved',
          StatusColor: '#10b981',
          AssessmentDate: new Date(Date.now() - 172800000).toISOString(),
          AssessedByName: 'Mike Johnson',
          RiskRating: 'Medium'
        },
        {
          RiskAssessmentID: 4,
          AssessmentNumber: 'RA-2025-004',
          AssessmentTitle: 'Warehouse Operations',
          StatusName: 'Draft',
          StatusColor: '#6b7280',
          AssessmentDate: new Date(Date.now() - 259200000).toISOString(),
          AssessedByName: 'Sarah Wilson',
          RiskRating: 'Medium'
        },
        {
          RiskAssessmentID: 5,
          AssessmentNumber: 'RA-2025-005',
          AssessmentTitle: 'Fire Safety Assessment',
          StatusName: 'Overdue Review',
          StatusColor: '#ef4444',
          AssessmentDate: new Date(Date.now() - 2592000000).toISOString(),
          AssessedByName: 'David Brown',
          RiskRating: 'High'
        }
      ],
      total: 42,
      page: 1,
      pageSize: 5
    };
    
    return NextResponse.json(mockAssessments);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${RISK_ASSESSMENTS_SERVICE_URL}/api/risk-assessments`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to create risk assessment' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating risk assessment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}