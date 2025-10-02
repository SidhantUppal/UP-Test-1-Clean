import { NextRequest, NextResponse } from 'next/server';

const CHECKLISTS_SERVICE_URL = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

// GET /api/checklists/:id - Get single checklist
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    const response = await fetch(
      `${CHECKLISTS_SERVICE_URL}/api/checklists/${id}${queryString ? `?${queryString}` : ''}`,
      {
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to checklists service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch checklist' },
      { status: 500 }
    );
  }
}

// PUT /api/checklists/:id - Update checklist
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const response = await fetch(
      `${CHECKLISTS_SERVICE_URL}/api/checklists/${id}`,
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
    console.error('Error forwarding to checklists service:', error);
    return NextResponse.json(
      { error: 'Failed to update checklist' },
      { status: 500 }
    );
  }
}

// DELETE /api/checklists/:id - Delete checklist
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${CHECKLISTS_SERVICE_URL}/api/checklists/${id}`,
      {
        method: 'DELETE',
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to checklists service:', error);
    return NextResponse.json(
      { error: 'Failed to delete checklist' },
      { status: 500 }
    );
  }
}