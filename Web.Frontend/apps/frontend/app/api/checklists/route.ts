import { NextRequest, NextResponse } from 'next/server';

const CHECKLISTS_SERVICE_URL = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

// Mock checklists for when service is unavailable
const MOCK_CHECKLISTS = {
  success: true,
  data: {
    checklists: [
      {
        ChecklistTemplateID: 1,
        Title: 'Daily Safety Inspection',
        Description: 'Comprehensive daily safety checks for all work areas',
        CategoryName: 'Safety',
        IsActive: true,
        CreatedDate: new Date().toISOString(),
        ModifiedDate: new Date().toISOString(),
        QuestionCount: 15,
        AssignmentCount: 23,
        CompletionRate: 0.87
      },
      {
        ChecklistTemplateID: 2,
        Title: 'Equipment Maintenance Check',
        Description: 'Weekly equipment maintenance and inspection checklist',
        CategoryName: 'Maintenance',
        IsActive: true,
        CreatedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ModifiedDate: new Date().toISOString(),
        QuestionCount: 12,
        AssignmentCount: 18,
        CompletionRate: 0.94
      },
      {
        ChecklistTemplateID: 3,
        Title: 'Quality Control Standards',
        Description: 'Product quality verification checklist',
        CategoryName: 'Quality',
        IsActive: true,
        CreatedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        ModifiedDate: new Date().toISOString(),
        QuestionCount: 20,
        AssignmentCount: 31,
        CompletionRate: 0.91
      },
      {
        ChecklistTemplateID: 4,
        Title: 'Fire Safety Audit',
        Description: 'Monthly fire safety and emergency equipment check',
        CategoryName: 'Safety',
        IsActive: true,
        CreatedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        ModifiedDate: new Date().toISOString(),
        QuestionCount: 18,
        AssignmentCount: 12,
        CompletionRate: 0.83
      },
      {
        ChecklistTemplateID: 5,
        Title: 'Compliance Review',
        Description: 'Regulatory compliance verification checklist',
        CategoryName: 'Compliance',
        IsActive: true,
        CreatedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        ModifiedDate: new Date().toISOString(),
        QuestionCount: 25,
        AssignmentCount: 8,
        CompletionRate: 0.96
      }
    ],
    totalCount: 142,
    page: 1,
    pageSize: 5,
    totalPages: 29
  }
};

// GET /api/checklists - List checklists
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Try to fetch from the actual service
    try {
      const response = await fetch(
        `${CHECKLISTS_SERVICE_URL}/api/checklists${queryString ? `?${queryString}` : ''}`,
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
      console.warn('Checklists service not available, returning mock checklists:', serviceError);
      return NextResponse.json(MOCK_CHECKLISTS);
    }
  } catch (error) {
    console.error('Error fetching checklists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch checklists' },
      { status: 500 }
    );
  }
}

// POST /api/checklists - Create checklist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${CHECKLISTS_SERVICE_URL}/api/checklists`, {
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
    console.error('Error forwarding to checklists service:', error);
    return NextResponse.json(
      { error: 'Failed to create checklist' },
      { status: 500 }
    );
  }
}