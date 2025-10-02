import { NextRequest, NextResponse } from 'next/server';

const CHECKLISTS_SERVICE_URL = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${CHECKLISTS_SERVICE_URL}/api/checklists/utility/category-types`,
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
    console.error('Error fetching category types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category types' },
      { status: 500 }
    );
  }
}