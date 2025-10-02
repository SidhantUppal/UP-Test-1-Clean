import { NextRequest, NextResponse } from 'next/server';

const DOCUMENTS_SERVICE_URL = process.env.DOCUMENTS_SERVICE_URL || 'http://localhost:3006';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ tagId: string }> }) {
  try {
    const { tagId } = await params;
    const body = await request.json();
    
    const response = await fetch(`${DOCUMENTS_SERVICE_URL}/api/documents/tags/${tagId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying tags PUT request:', error);
    return NextResponse.json(
      { error: 'Failed to update template tag' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ tagId: string }> }) {
  try {
    const { tagId } = await params;
    const response = await fetch(`${DOCUMENTS_SERVICE_URL}/api/documents/tags/${tagId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
      },
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying tags DELETE request:', error);
    return NextResponse.json(
      { error: 'Failed to delete template tag' },
      { status: 500 }
    );
  }
}