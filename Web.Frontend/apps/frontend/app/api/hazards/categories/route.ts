import { NextRequest, NextResponse } from 'next/server';
const INCIDENTS_SERVICE_URL = process.env.INCIDENTS_SERVICE_URL || 'http://localhost:3014';

// GET /api/hazards/categories - Get hazard categories
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    try {
      const response = await fetch(
        `${INCIDENTS_SERVICE_URL}/api/hazard/categories${queryString ? `?${queryString}` : ''}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': request.headers.get('Authorization') || '',
            'x-user-id': request.headers.get('x-user-id') || '1',
            'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Service responded with status: ${response.status}`);
      }

      const responseText = await response.text();
      if (!responseText) {
        return NextResponse.json({ success: true, data: [] }, { status: 200 });
      }

      const data = JSON.parse(responseText);
      return NextResponse.json(data, { status: response.status });
    } catch (serviceError) {
      console.error('Incidents service not available:', serviceError);
      return NextResponse.json(
        { success: false, error: 'Service unavailable', data: [] },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error fetching hazard categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hazard categories' },
      { status: 500 }
    );
  }
}

// POST /api/hazards/categories - Create hazard category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${INCIDENTS_SERVICE_URL}/api/hazard/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
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
      { error: 'Failed to create hazard category' },
      { status: 500 }
    );
  }
}