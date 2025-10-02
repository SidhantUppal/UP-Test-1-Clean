import { NextRequest, NextResponse } from 'next/server';

const INCIDENTS_SERVICE_URL = process.env.INCIDENT_SERVICE_URL || 'http://localhost:3014';

// GET /api/incident/[id]/case-notes - Get case notes for incident
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/incident/${id}/case-notes`,
      {
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'Adele Longdon',
          'x-user-email': request.headers.get('x-user-email') || 'adele.longdon@example.com',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incidents service for case notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case notes' },
      { status: 500 }
    );
  }
}

// POST /api/incident/[id]/case-notes - Create new case note
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/incident/${id}/case-notes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'Adele Longdon',
          'x-user-email': request.headers.get('x-user-email') || 'adele.longdon@example.com',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incidents service for case note creation:', error);
    return NextResponse.json(
      { error: 'Failed to create case note' },
      { status: 500 }
    );
  }
}