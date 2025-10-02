import { NextRequest, NextResponse } from 'next/server';

const STATIC_DATA_API_URL = process.env.STATIC_DATA_API_URL || 'http://localhost:3030';

// GET /api/hazards/locations - Get all locations
export async function GET(request: NextRequest) {
  try {
    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1'; // Dev fallback
    const userAreaId = request.headers.get('x-user-area-id') || '1'; // Dev fallback

    // Check if auth cookies are present
    if (!cookies.includes('auth-token=')) {
      console.error('Missing auth-token cookie - user not authenticated');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${STATIC_DATA_API_URL}/api/StaticData/locations`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookies, // Forward cookies to backend
          'x-user-id': userId,
          'x-user-area-id': userAreaId,
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