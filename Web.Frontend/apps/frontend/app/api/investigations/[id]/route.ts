import { NextRequest, NextResponse } from 'next/server';

const INVESTIGATIONS_SERVICE_URL = process.env.INVESTIGATIONS_SERVICE_URL || 'http://localhost:3014';

// GET /api/investigations/[id] - Get single investigation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}`,
      {
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'System User',
          'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investigation' },
      { status: 500 }
    );
  }
}

// PUT /api/investigations/[id] - Update investigation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(
      `${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'System User',
          'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
        },
        body: JSON.stringify({
          ...body,
          modifiedBy: parseInt(request.headers.get('x-user-id') || '1'),
          modifiedDate: new Date().toISOString()
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to update investigation' },
      { status: 500 }
    );
  }
}

// DELETE /api/investigations/[id] - Delete investigation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}`,
      {
        method: 'DELETE',
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'System User',
          'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
        },
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to delete investigation' },
      { status: 500 }
    );
  }
}