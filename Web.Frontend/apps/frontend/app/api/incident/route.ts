import { NextRequest, NextResponse } from 'next/server';

// Point to the .NET Core Api.Incidents service
const INCIDENT_MANAGER_API_URL = process.env.INCIDENT_MANAGER_API_URL || 'http://localhost:3014';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1';
    const userAreaId = request.headers.get('x-user-area-id') || '1';
    const csrfToken = request.headers.get('X-CSRF-TOKEN') || '';

    // Check if auth cookies are present
    if (!cookies.includes('auth-token=')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`${INCIDENT_MANAGER_API_URL}/api/incident?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies, // Forward cookies to backend
        ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken }),
        'x-user-id': userId,
        'x-user-area-id': userAreaId,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('.NET Incident API Error:', errorText);
      throw new Error(`.NET Incident API responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request to .NET Incident API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incident' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1';
    const userAreaId = request.headers.get('x-user-area-id') || '1';
    const csrfToken = request.headers.get('X-CSRF-TOKEN') || '';

    // Check if auth cookies are present
    if (!cookies.includes('auth-token=')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // The frontend service methods now send complete PascalCase payloads
    // We just need to add any missing fields and forward to the .NET API
    const incidentPayload = {
      IncidentCaseID: 0, // New incident
      ReportedDate: new Date().toISOString(),
      ReportedByUserID: parseInt(userId, 10),
      CreatedDate: new Date().toISOString(),
      CreatedByUserID: parseInt(userId, 10),
      ModifiedDate: new Date().toISOString(),
      ModifiedByUserID: parseInt(userId, 10),
      IsDeleted: false,
      ...body // Merge in the complete payload from the service method
    };

    const response = await fetch(`${INCIDENT_MANAGER_API_URL}/api/incident`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies, // Forward cookies to backend
        ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken }),
        'x-user-id': userId,
        'x-user-area-id': userAreaId,
      },
      body: JSON.stringify(incidentPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('.NET Incident API Error:', errorText);
      throw new Error(`.NET Incident API responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    // Return the incident data directly with PascalCase properties (database-first approach)
    // The .NET API returns PascalCase due to our Program.cs configuration
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating incident:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create incident',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Incident ID is required' },
        { status: 400 }
      );
    }

    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1';
    const userAreaId = request.headers.get('x-user-area-id') || '1';
    const csrfToken = request.headers.get('X-CSRF-TOKEN') || '';

    // Check if auth cookies are present
    if (!cookies.includes('auth-token=')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`${INCIDENT_MANAGER_API_URL}/api/incident/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies, // Forward cookies to backend
        ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken }),
        'x-user-id': userId,
        'x-user-area-id': userAreaId,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('.NET Incident API Error:', errorText);
      throw new Error(`.NET Incident API responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating incident:', error);
    return NextResponse.json(
      { error: 'Failed to update incident' },
      { status: 500 }
    );
  }
}