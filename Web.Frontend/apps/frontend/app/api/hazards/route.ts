import { NextRequest, NextResponse } from 'next/server';

// Point to the .NET Core Api.Incidents service
const INCIDENT_MANAGER_API_URL = process.env.INCIDENT_MANAGER_API_URL || 'http://localhost:3014';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    // Validate required auth headers
    const authorization = request.headers.get('Authorization');
    const userId = request.headers.get('x-user-id');
    const userAreaId = request.headers.get('x-user-area-id');

    if (!authorization || !userId || !userAreaId) {
      return NextResponse.json(
        { error: 'Missing required authentication headers' },
        { status: 401 }
      );
    }

    const targetUrl = `${INCIDENT_MANAGER_API_URL}/api/Hazard?${queryString}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization,
        'x-user-id': userId,
        'x-user-area-id': userAreaId,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('.NET Hazard API Error Status:', response.status);
      console.error('.NET Hazard API Error Text:', errorText);
      throw new Error(`.NET Hazard API responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('=== HAZARD GET API ROUTE ERROR ===');
    console.error('Error proxying request to .NET Hazard API:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
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

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': request.headers.get('Authorization') || '',
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-user-area-id': request.headers.get('x-user-area-id') || '1',
    };

    const response = await fetch(`${INCIDENT_MANAGER_API_URL}/api/Hazard`, {
      method: 'POST',
      headers: headers,
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

          // Try to extract more specific error details
          let specificErrors = [];
          if (errorData.details) {
            specificErrors.push(errorData.details);
          }
          if (errorData.validationErrors) {
            specificErrors.push(...Object.entries(errorData.validationErrors).map(([field, error]) => `${field}: ${error}`));
          }
          if (errorData.innerException) {
            specificErrors.push(`Inner Exception: ${errorData.innerException}`);
          }
          if (errorData.constraintViolations) {
            specificErrors.push(...errorData.constraintViolations);
          }

          errorMessage = specificErrors.length > 0
            ? specificErrors.join('; ')
            : errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // If JSON parsing fails, use status text
          errorMessage = `Failed to create hazard: ${response.statusText}`;
        }
      } else {
        // Response is not JSON (probably HTML error page)
        const errorText = await response.text();
        errorMessage = `Failed to create hazard: ${response.statusText} (Status: ${response.status})`;
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          backendStatus: response.status,
          backendStatusText: response.statusText
        },
        { status: response.status }
      );
    }

    // Response is OK, parse the JSON
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}