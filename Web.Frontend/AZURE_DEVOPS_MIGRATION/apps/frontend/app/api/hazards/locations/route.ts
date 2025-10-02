import { NextRequest, NextResponse } from 'next/server';

const INCIDENTS_SERVICE_URL = process.env.INCIDENTS_SERVICE_URL || 'http://localhost:3014';

// GET /api/hazards/locations - Get all locations
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/hazards/locations`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch locations:', response.statusText);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch locations', data: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch locations', data: [] },
      { status: 500 }
    );
  }
}