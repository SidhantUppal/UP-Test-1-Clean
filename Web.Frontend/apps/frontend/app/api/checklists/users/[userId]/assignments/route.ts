import { NextRequest, NextResponse } from 'next/server';

const CHECKLISTS_SERVICE_URL = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

// Mock assignments for when service is unavailable
const MOCK_ASSIGNMENTS = {
  success: true,
  data: [
    {
      id: 'a1',
      checklistId: '1',
      checklistTitle: 'Daily Safety Inspection',
      checklistCategory: 'Safety',
      userId: 1,
      assignedBy: 2,
      assignedByName: 'John Manager',
      status: 'Pending',
      priority: 'High',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      assignedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: null,
      score: null,
      notes: 'Please complete by end of shift'
    },
    {
      id: 'a2',
      checklistId: '2',
      checklistTitle: 'Equipment Maintenance Check',
      checklistCategory: 'Maintenance',
      userId: 1,
      assignedBy: 3,
      assignedByName: 'Sarah Supervisor',
      status: 'Pending',
      priority: 'Medium',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      assignedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: null,
      score: null,
      notes: 'Weekly check due'
    },
    {
      id: 'a3',
      checklistId: '4',
      checklistTitle: 'Fire Safety Audit',
      checklistCategory: 'Safety',
      userId: 1,
      assignedBy: 2,
      assignedByName: 'John Manager',
      status: 'Pending',
      priority: 'Critical',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      assignedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: null,
      score: null,
      notes: 'Urgent - complete ASAP'
    }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Try to fetch from the actual service
    try {
      const response = await fetch(
        `${CHECKLISTS_SERVICE_URL}/api/checklists/users/${userId}/assignments${queryString ? `?${queryString}` : ''}`,
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
      console.warn('Checklists service not available, returning mock assignments:', serviceError);
      
      // Filter by status if provided
      const status = searchParams.get('status');
      const filteredAssignments = status 
        ? MOCK_ASSIGNMENTS.data.filter(a => a.status === status)
        : MOCK_ASSIGNMENTS.data;
      
      return NextResponse.json({
        ...MOCK_ASSIGNMENTS,
        data: filteredAssignments
      });
    }
  } catch (error) {
    console.error('Error fetching user assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user assignments' },
      { status: 500 }
    );
  }
}