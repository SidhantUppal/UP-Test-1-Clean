import { NextRequest, NextResponse } from 'next/server';

const INVESTIGATIONS_SERVICE_URL = process.env.INVESTIGATIONS_SERVICE_URL || 'http://localhost:3014';

// GET /api/investigations - Get all investigations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const incidentId = searchParams.get('incidentId');
    const status = searchParams.get('status');

    let url = `${INVESTIGATIONS_SERVICE_URL}/api/investigations`;
    const params = new URLSearchParams();

    if (incidentId) params.append('incidentId', incidentId);
    if (status) params.append('status', status);

    if (params.toString()) {
      url += `?${params.toString()}`;
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
      { error: 'Failed to fetch investigations' },
      { status: 500 }
    );
  }
}

// POST /api/investigations - Create new investigation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${INVESTIGATIONS_SERVICE_URL}/api/investigations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': request.headers.get('x-user-id') || '1',
        'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        'x-user-name': request.headers.get('x-user-name') || 'System User',
        'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
      },
      body: JSON.stringify({
        incidentCaseId: body.incidentCaseId,
        investigationTeam: body.investigationTeam || [],
        problemStatement: body.problemStatement || '',
        timeline: {
          start: body.timeline?.start || new Date().toISOString(),
          target: body.timeline?.target || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        targetCompletionDate: body.targetCompletionDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        stakeholders: body.stakeholders || [],
        investigationType: body.investigationType || 'barrier-analysis',
        barrierCategories: body.barrierCategories || [],
        whyLevels: body.whyLevels || Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          question: `Why did this happen? (Level ${i + 1})`,
          answer: '',
          evidence: [],
          confidenceLevel: 1,
          witnesses: [],
          attachments: []
        })),
        qualityScore: body.qualityScore || 0,
        status: body.status || 'draft',
        investigationTasks: body.investigationTasks || [],
        taskCreationEnabled: body.taskCreationEnabled !== false,
        emailNotificationsEnabled: body.emailNotificationsEnabled !== false,
        prePopulatedData: body.prePopulatedData,
        dataSource: body.dataSource,
        createdBy: parseInt(request.headers.get('x-user-id') || '1'),
        createdDate: new Date().toISOString()
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to create investigation' },
      { status: 500 }
    );
  }
}