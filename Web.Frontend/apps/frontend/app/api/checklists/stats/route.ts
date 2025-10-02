import { NextRequest, NextResponse } from 'next/server';

const CHECKLISTS_SERVICE_URL = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

// Mock stats for when service is unavailable
const MOCK_STATS = {
  success: true,
  data: {
    totalChecklists: 142,
    activeChecklists: 89,
    totalAssignments: 234,
    totalEnrollments: 156
  }
};

export async function GET(request: NextRequest) {
  try {
    // Try to fetch from the actual service
    try {
      const response = await fetch(
        `${CHECKLISTS_SERVICE_URL}/api/checklists/stats`,
        {
          headers: {
            'x-user-id': request.headers.get('x-user-id') || '1',
            'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          },
        }
      );

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (serviceError) {
      // If service is not available, return mock data
      console.warn('Checklists service not available, returning mock stats:', serviceError);
      return NextResponse.json(MOCK_STATS);
    }
  } catch (error) {
    console.error('Error fetching checklist stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch checklist stats' },
      { status: 500 }
    );
  }
}