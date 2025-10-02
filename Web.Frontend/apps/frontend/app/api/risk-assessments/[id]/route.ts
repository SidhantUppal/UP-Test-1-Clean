import { NextRequest, NextResponse } from 'next/server';

const RISK_ASSESSMENTS_SERVICE_URL = process.env.NEXT_PUBLIC_RISK_ASSESSMENTS_SERVICE_URL || 'http://localhost:3015';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${RISK_ASSESSMENTS_SERVICE_URL}/api/risk-assessments/${id}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to fetch risk assessment' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${RISK_ASSESSMENTS_SERVICE_URL}/api/risk-assessments/${id}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to update risk assessment' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating risk assessment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${RISK_ASSESSMENTS_SERVICE_URL}/api/risk-assessments/${id}`,
      {
        method: 'DELETE',
        headers,
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: data.error || 'Failed to delete risk assessment' },
        { status: response.status }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting risk assessment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}