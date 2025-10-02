import { NextRequest, NextResponse } from 'next/server';

const DOCUMENTS_SERVICE_URL = process.env.DOCUMENTS_SERVICE_URL || 'http://localhost:3006';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Forward headers for multi-tenancy
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-user-area-id': request.headers.get('x-user-area-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${DOCUMENTS_SERVICE_URL}/api/documents${queryString ? `?${queryString}` : ''}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to fetch documents' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if this is a multipart form data request (file upload)
    const contentType = request.headers.get('content-type');
    const isMultipart = contentType?.includes('multipart/form-data');
    
    // Forward headers for multi-tenancy
    const headers: Record<string, string> = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-user-area-id': request.headers.get('x-user-area-id') || '1',
    };

    let body;
    if (isMultipart) {
      // For file uploads, forward the form data directly
      const formData = await request.formData();
      body = formData;
      // Don't set Content-Type for FormData - let fetch set the boundary
    } else {
      // For JSON requests
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(await request.json());
    }

    const response = await fetch(
      `${DOCUMENTS_SERVICE_URL}/api/documents`,
      {
        method: 'POST',
        headers,
        body,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to create document' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract document ID from the URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const documentId = pathParts[pathParts.length - 1];
    
    // Forward headers for multi-tenancy
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-user-area-id': request.headers.get('x-user-area-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${DOCUMENTS_SERVICE_URL}/api/documents/${documentId}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to update document' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Extract document ID from the URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const documentId = pathParts[pathParts.length - 1];
    
    // Forward headers for multi-tenancy
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-user-area-id': request.headers.get('x-user-area-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${DOCUMENTS_SERVICE_URL}/api/documents/${documentId}`,
      {
        method: 'DELETE',
        headers,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to delete document' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}