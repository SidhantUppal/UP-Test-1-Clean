import { NextRequest, NextResponse } from 'next/server';

const INCIDENT_SERVICE_URL = process.env.INCIDENT_SERVICE_URL || 'http://localhost:3014';

// POST /api/setup/incident-types - Setup missing incident types in database
export async function POST(request: NextRequest) {
  try {
    const response = await fetch(`${INCIDENT_SERVICE_URL}/api/setup/incident-types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incident service setup:', error);
    return NextResponse.json(
      { error: 'Failed to setup incident types' },
      { status: 500 }
    );
  }
}