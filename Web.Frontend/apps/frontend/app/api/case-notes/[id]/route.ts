import { NextRequest, NextResponse } from 'next/server';

const INCIDENTS_SERVICE_URL = process.env.INCIDENT_SERVICE_URL || 'http://localhost:3014';

// GET /api/case-notes/[id] - Get single case note
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/case-notes/${id}`,
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
    console.error('Error forwarding to incidents service for case note:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case note' },
      { status: 500 }
    );
  }
}

// PUT /api/case-notes/[id] - Update case note
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/case-notes/${id}`,
      {
        method: 'PUT',
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
    console.error('Error forwarding to incidents service for case note update:', error);
    return NextResponse.json(
      { error: 'Failed to update case note' },
      { status: 500 }
    );
  }
}

// DELETE /api/case-notes/[id] - Delete case note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/case-notes/${id}`,
      {
        method: 'DELETE',
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'Adele Longdon',
          'x-user-email': request.headers.get('x-user-email') || 'adele.longdon@example.com',
        },
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to incidents service for case note deletion:', error);
    return NextResponse.json(
      { error: 'Failed to delete case note' },
      { status: 500 }
    );
  }
}