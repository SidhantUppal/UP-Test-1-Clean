import { NextRequest, NextResponse } from 'next/server';

const INVESTIGATIONS_SERVICE_URL = process.env.INVESTIGATIONS_SERVICE_URL || 'http://localhost:3014';

// GET /api/investigations/[id]/actions - Get investigation actions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let url = `${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/actions`;
    const urlParams = new URLSearchParams();

    if (status) urlParams.append('status', status);
    if (priority) urlParams.append('priority', priority);

    if (urlParams.toString()) {
      url += `?${urlParams.toString()}`;
    }

    const response = await fetch(url, {
      headers: {
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        'x-user-name': request.headers.get('x-user-name') || 'System User',
        'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investigation actions' },
      { status: 500 }
    );
  }
}

// POST /api/investigations/[id]/actions - Create new action for investigation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        'x-user-name': request.headers.get('x-user-name') || 'System User',
        'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
      },
      body: JSON.stringify({
        investigationId: parseInt(id),
        title: body.title,
        description: body.description || '',
        actionType: body.actionType || 'corrective',
        priority: body.priority || 'medium',
        dueDate: body.dueDate,
        assignedTo: body.assignedTo,
        whyLevelOrigin: body.whyLevelOrigin, // Which why level this action addresses
        status: body.status || 'pending',
        createdBy: parseInt(request.headers.get('x-user-id') || '1'),
        createdDate: new Date().toISOString()
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to create investigation action' },
      { status: 500 }
    );
  }
}