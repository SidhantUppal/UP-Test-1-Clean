import { NextRequest, NextResponse } from 'next/server';

// GET /api/environmental/categories
export async function GET() {
  try {
    // For now, return empty array as fallback data will be used from the service
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching environmental categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch environmental categories' },
      { status: 500 }
    );
  }
}

// POST /api/environmental/categories
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Implement database creation logic
    // For now, return a mock response
    const newCategory = {
      id: `cat-${Date.now()}`,
      ...body,
      isCore: false
    };

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating environmental category:', error);
    return NextResponse.json(
      { error: 'Failed to create environmental category' },
      { status: 500 }
    );
  }
}