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
      `${RISK_ASSESSMENTS_SERVICE_URL}/api/risk-assessments/monitoring/changelog${queryString ? `?${queryString}` : ''}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to fetch change logs' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching change logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}