import { NextRequest, NextResponse } from 'next/server';

const ASSETS_SERVICE_URL = process.env.NEXT_PUBLIC_ASSETS_SERVICE_URL || 'http://localhost:3012';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Forward headers for multi-tenancy
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${ASSETS_SERVICE_URL}/api/assets${queryString ? `?${queryString}` : ''}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to fetch assets' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward headers for multi-tenancy
    const headers = {
      'x-user-id': request.headers.get('x-user-id') || '1',
      'x-userarea-id': request.headers.get('x-userarea-id') || '1',
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${ASSETS_SERVICE_URL}/api/assets`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to create asset' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating asset:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}