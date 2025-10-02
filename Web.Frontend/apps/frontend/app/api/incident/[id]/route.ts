import { NextRequest, NextResponse } from 'next/server';

const INCIDENT_MANAGER_API_URL = process.env.INCIDENT_MANAGER_API_URL || 'http://localhost:3014';

// GET /api/incident/[id] - Get single incident
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    // Add userAreaId from headers if not provided in query
    if (!searchParams.has('userAreaId')) {
      const userAreaId = request.headers.get('x-user-area-id') || '1';
      searchParams.set('userAreaId', userAreaId);
    }

    const queryString = searchParams.toString();
    const url = queryString ?
      `${INCIDENT_MANAGER_API_URL}/api/incident/${id}?${queryString}` :
      `${INCIDENT_MANAGER_API_URL}/api/incident/${id}?userAreaId=${request.headers.get('x-user-area-id') || '1'}`;

    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1';
    const userAreaId = request.headers.get('x-user-area-id') || '1';
    const csrfToken = request.headers.get('X-CSRF-TOKEN') || '';

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies, // Forward cookies to backend
        'x-user-id': userId,
        'x-user-area-id': userAreaId,
        ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken })
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('.NET Incident API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch incident' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the incident data directly with PascalCase properties (database-first approach)
    // The .NET API returns PascalCase due to our Program.cs configuration
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incident' },
      { status: 500 }
    );
  }
}

// PUT /api/incident/[id] - Update incident
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(
      `${INCIDENT_MANAGER_API_URL}/api/incident/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': request.headers.get('Authorization') || '',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('.NET Incident API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to update incident' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to update incident' },
      { status: 500 }
    );
  }
}

// DELETE /api/incident/[id] - Delete incident
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({})); // DELETE might not have a body

    const response = await fetch(
      `${INCIDENT_MANAGER_API_URL}/api/incident/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': request.headers.get('Authorization') || '',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
        body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('.NET Incident API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to delete incident' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to delete incident' },
      { status: 500 }
    );
  }
}