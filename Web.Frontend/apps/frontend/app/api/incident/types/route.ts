import { NextRequest, NextResponse } from 'next/server';

// Use Static Data API for incident types
const STATIC_DATA_SERVICE_URL = process.env.STATIC_DATA_API_URL || 'http://localhost:3030';
const INCIDENTS_SERVICE_URL = process.env.INCIDENT_MANAGER_API_URL || process.env.INCIDENTS_SERVICE_URL || 'http://localhost:3014';

// GET /api/incident/types - Get incident types
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1'; // Dev fallback
    const userAreaId = request.headers.get('x-user-area-id') || '1'; // Dev fallback
    const csrfToken = request.headers.get('X-CSRF-TOKEN') || '';

    // Check if auth cookies are present
    if (!cookies.includes('auth-token=')) {
      console.error('Missing auth-token cookie - user not authenticated');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const headers = {
      'Content-Type': 'application/json',
      'Cookie': cookies, // Forward cookies to backend
      'x-user-id': userId,
      'x-user-area-id': userAreaId,
      ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken })
    };

    try {
      // Try static data API for incident types
      const response = await fetch(
        `${STATIC_DATA_SERVICE_URL}/api/StaticData/incident-types${queryString ? `?${queryString}` : ''}`,
        {
          method: 'GET',
          headers,
        }
      );

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // Handle empty response body (like 404 with no content)
          errorData = { error: `Static Data API returned ${response.status}: ${response.statusText}` };
        }
        console.error('Backend error details:', JSON.stringify(errorData, null, 2));
        return NextResponse.json(errorData, { status: response.status });
      }

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (serviceError) {
      console.error('Incidents service not available:', serviceError);
      return NextResponse.json(
        { success: false, error: 'Service unavailable', data: [] },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error fetching incident types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incident types' },
      { status: 500 }
    );
  }
}

// POST /api/incident/types - Create incident type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1'; // Dev fallback
    const userAreaId = request.headers.get('x-user-area-id') || '1'; // Dev fallback
    const csrfToken = request.headers.get('X-CSRF-TOKEN') || '';

    // Check if auth cookies are present
    if (!cookies.includes('auth-token=')) {
      console.error('Missing auth-token cookie - user not authenticated');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/incident/types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies, // Forward cookies to backend
        'x-user-id': userId,
        'x-user-area-id': userAreaId,
        ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken })
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to create incident type' },
      { status: 500 }
    );
  }
}