import { NextRequest, NextResponse } from 'next/server';

const INVESTIGATIONS_SERVICE_URL = process.env.INVESTIGATIONS_SERVICE_URL || 'http://localhost:3014';

// GET /api/investigations/[id]/evidence - Get investigation evidence
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const whyLevel = searchParams.get('whyLevel');

    let url = `${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/evidence`;
    if (whyLevel) {
      url += `?whyLevel=${whyLevel}`;
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
      { error: 'Failed to fetch investigation evidence' },
      { status: 500 }
    );
  }
}

// POST /api/investigations/[id]/evidence - Add evidence to investigation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    // Handle file upload or structured evidence data
    const isFileUpload = formData.get('file') instanceof File;

    if (isFileUpload) {
      // Forward multipart form data for file upload
      const response = await fetch(`${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/evidence`, {
        method: 'POST',
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'System User',
          'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
        },
        body: formData,
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      // Handle structured evidence data
      const evidenceData = {
        whyLevel: parseInt(formData.get('whyLevel') as string),
        type: formData.get('type') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        dateCollected: formData.get('dateCollected') as string || new Date().toISOString(),
        collectedBy: formData.get('collectedBy') as string || request.headers.get('x-user-name') || 'System User'
      };

      const response = await fetch(`${INVESTIGATIONS_SERVICE_URL}/api/investigations/${id}/evidence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
          'x-user-name': request.headers.get('x-user-name') || 'System User',
          'x-user-email': request.headers.get('x-user-email') || 'system@example.com',
        },
        body: JSON.stringify(evidenceData),
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Error forwarding to investigations service:', error);
    return NextResponse.json(
      { error: 'Failed to add evidence to investigation' },
      { status: 500 }
    );
  }
}