import { NextRequest, NextResponse } from 'next/server';

// GET /api/environmental/incidents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // TODO: Implement database query logic with category filtering
    // For now, return empty array as fallback data will be used from the service
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching environmental incidents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch environmental incidents' },
      { status: 500 }
    );
  }
}

// POST /api/environmental/incidents
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Implement database creation logic
    // For now, return a mock response
    const newIncident = {
      id: `incident-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: 'Open'
    };

    return NextResponse.json(newIncident, { status: 201 });
  } catch (error) {
    console.error('Error creating environmental incident:', error);
    return NextResponse.json(
      { error: 'Failed to create environmental incident' },
      { status: 500 }
    );
  }
}