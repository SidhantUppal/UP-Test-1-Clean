import { NextRequest, NextResponse } from 'next/server';

const STATIC_DATA_API_URL = process.env.STATIC_DATA_API_URL || 'http://localhost:3030';

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

    const response = await fetch(`${STATIC_DATA_API_URL}/api/StaticData/hazard-severity-types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies, // Forward cookies to backend
        'x-user-id': userId,
        'x-user-area-id': userAreaId,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Static Data Hazard Severities API Error Status:', response.status);
      console.error('Static Data Hazard Severities API Error Text:', errorText);
      throw new Error(`Static Data API responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('=== HAZARD SEVERITIES API ROUTE ERROR ===');
    console.error('Error proxying request to Static Data API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hazard severities' },
      { status: 500 }
    );
  }
}
