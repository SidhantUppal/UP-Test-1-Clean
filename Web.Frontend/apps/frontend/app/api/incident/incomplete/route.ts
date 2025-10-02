import { NextRequest, NextResponse } from 'next/server';

const INCIDENTS_SERVICE_URL = process.env.INCIDENTS_SERVICE_URL || 'http://localhost:3014';

export async function GET(request: NextRequest) {
  try {
    // Get search parameters from the request
    const searchParams = request.nextUrl.searchParams;
    
    // Forward the request to the incidents service
    const serviceUrl = new URL('/api/incident/incomplete', INCIDENTS_SERVICE_URL);
    
    // Copy all search parameters to the service request
    searchParams.forEach((value, key) => {
      serviceUrl.searchParams.append(key, value);
    });
    
    const response = await fetch(serviceUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        'x-user-name': request.headers.get('x-user-name') || 'Adele Longdon',
        'x-user-email': request.headers.get('x-user-email') || 'adele.longdon@example.com',
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return NextResponse.json(
        { 
          success: false, 
          error: errorData.error || 'Failed to fetch incomplete incidents' 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching incomplete incidents:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}