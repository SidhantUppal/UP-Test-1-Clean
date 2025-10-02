import { NextRequest, NextResponse } from 'next/server';

const INCIDENTS_SERVICE_URL = process.env.INCIDENTS_SERVICE_URL || 'http://localhost:3014';

// GET /api/incident/form-templates - List form templates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    const response = await fetch(
      `${INCIDENTS_SERVICE_URL}/api/form-templates${queryString ? `?${queryString}` : ''}`,
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
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form templates' },
      { status: 500 }
    );
  }
}

// POST /api/incident/form-templates - Create form template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/form-templates`, {
      method: 'POST',
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
    console.error('Error forwarding to incidents service:', error);
    return NextResponse.json(
      { error: 'Failed to create form template' },
      { status: 500 }
    );
  }
}