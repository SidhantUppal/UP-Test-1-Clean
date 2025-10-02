import { NextRequest, NextResponse } from 'next/server';

// Point to the new .NET Core 8 API
const INCIDENT_MANAGER_API_URL = process.env.INCIDENT_MANAGER_API_URL || 'http://localhost:3014';

// GET /api/incident/stats - Get incident statistics
export async function GET(request: NextRequest) {
  try {
    // Get authentication from cookies (cookie-based auth)
    const cookies = request.headers.get('Cookie') || '';
    const userId = request.headers.get('x-user-id') || '1';
    const userAreaId = request.headers.get('x-user-area-id') || '1';
    const csrfToken = request.headers.get('X-CSRF-TOKEN') || '';

    const response = await fetch(
      `${INCIDENT_MANAGER_API_URL}/api/incident/stats`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookies, // Forward cookies to backend
          'x-user-id': userId,
          'x-user-area-id': userAreaId,
          ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken })
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incident statistics' },
      { status: 500 }
    );
  }
}