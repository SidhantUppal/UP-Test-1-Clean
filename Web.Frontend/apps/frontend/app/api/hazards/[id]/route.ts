import { NextRequest, NextResponse } from 'next/server';

const INCIDENTS_SERVICE_URL = process.env.INCIDENTS_SERVICE_URL || 'http://localhost:3014';

// GET /api/hazards/[id] - Get single hazard
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/hazard/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
      }
    );

    if (!response.ok && response.status === 404) {
      return NextResponse.json(
        { error: 'Hazard not found' },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Incidents service not available:', error);
    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 503 }
    );
  }
}

// PUT /api/hazards/[id] - Update hazard
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/hazard/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to update hazard' },
      { status: 500 }
    );
  }
}

// DELETE /api/hazards/[id] - Delete (archive) hazard
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/hazard/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Hazard archived successfully' });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to delete hazard' },
      { status: 500 }
    );
  }
}