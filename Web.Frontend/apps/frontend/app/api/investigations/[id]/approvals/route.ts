import { NextRequest, NextResponse } from 'next/server';

const INVESTIGATIONS_SERVICE_URL = process.env.INVESTIGATIONS_SERVICE_URL || 'http://localhost:3014';

// GET /api/investigations/[id]/approvals - Get investigation approval workflow
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/approvals`,
      {
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'System User',
          'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investigation approval workflow' },
      { status: 500 }
    );
  }
}

// POST /api/investigations/[id]/approvals - Submit investigation for approval or approve/reject
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/approvals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        'x-user-name': request.headers.get('x-user-name') || 'System User',
        'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
      },
      body: JSON.stringify({
        action: body.action, // 'submit', 'approve', 'reject', 'request_changes'
        approvalLevel: body.approvalLevel, // 1, 2, 3, 4 for different levels
        comments: body.comments || '',
        qualityScore: body.qualityScore,
        actionedBy: parseInt(request.headers.get('x-user-id') || '1'),
        actionDate: new Date().toISOString()
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to process investigation approval' },
      { status: 500 }
    );
  }
}

// PUT /api/investigations/[id]/approvals - Update approval workflow configuration
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/approvals`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        'x-user-name': request.headers.get('x-user-name') || 'System User',
        'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
      },
      body: JSON.stringify({
        approvalWorkflow: body.approvalWorkflow, // Array of approval levels with assigned users
        modifiedBy: parseInt(request.headers.get('x-user-id') || '1'),
        modifiedDate: new Date().toISOString()
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to update investigation approval workflow' },
      { status: 500 }
    );
  }
}