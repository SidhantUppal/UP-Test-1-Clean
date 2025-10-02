import { NextRequest, NextResponse } from 'next/server';

const ASSETS_SERVICE_URL = process.env.NEXT_PUBLIC_ASSETS_SERVICE_URL || 'http://localhost:3012';

export async function GET(request: NextRequest) {
  try {
    // Forward headers for multi-tenancy
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${ASSETS_SERVICE_URL}/api/assets/locations`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to fetch locations' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}