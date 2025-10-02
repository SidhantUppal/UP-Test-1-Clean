import { NextRequest, NextResponse } from 'next/server';

const INCIDENTS_SERVICE_URL = process.env.INCIDENTS_SERVICE_URL || 'http://localhost:3014';

// GET /api/hazards - Get all hazards
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    try {
      const response = await fetch(
        `${INCIDENTS_SERVICE_URL}/api/hazards${queryString ? `?${queryString}` : ''}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': request.headers.get('x-user-id') || '1',
            'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          },
        }
      );

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (serviceError) {
      console.error('Incidents service not available:', serviceError);
      return NextResponse.json(
        { success: false, error: 'Service unavailable', data: [], metadata: { total: 0, page: 1, totalPages: 0 } },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error fetching hazards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hazards' },
      { status: 500 }
    );
  }
}

// POST /api/hazards - Create hazard
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/hazards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
      },
      body: JSON.stringify(body),
    });

    // Check if response is OK before trying to parse JSON
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = 'Failed to create hazard';
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // If JSON parsing fails, use status text
          errorMessage = `Failed to create hazard: ${response.statusText}`;
        }
      } else {
        // Response is not JSON (probably HTML error page)
        errorMessage = `Failed to create hazard: ${response.statusText} (Status: ${response.status})`;
      }
      
      return NextResponse.json(
        { 
          success: false,
          error: errorMessage 
        },
        { status: response.status }
      );
    }

    // Response is OK, parse the JSON
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create hazard' 
      },
      { status: 500 }
    );
  }
}