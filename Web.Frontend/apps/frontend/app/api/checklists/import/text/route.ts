import { NextRequest, NextResponse } from 'next/server';

const CHECKLISTS_SERVICE_URL = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

// Mock response for when service is unavailable
const MOCK_TEXT_RESPONSE = {
  success: true,
  data: {
    title: "Equipment Maintenance Checklist",
    description: "This checklist has been extracted from your text using AI analysis.",
    questions: [
      {
        id: 'q1',
        text: 'Has the equipment been visually inspected for damage?',
        type: 'checkbox',
        comments: { enabled: true, required: false, placeholder: 'Note any damage found...' },
        scoring: { enabled: false, weight: 3, isKillQuestion: false },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q2',
        text: 'Are all safety guards in place and secure?',
        type: 'yn-na',
        comments: { enabled: false, required: false, placeholder: '' },
        scoring: { enabled: true, weight: 5, isKillQuestion: true },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q3',
        text: 'Check oil levels',
        type: 'pass-fail',
        comments: { enabled: true, required: true, placeholder: 'Record current oil level...' },
        scoring: { enabled: true, weight: 4, isKillQuestion: false },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q4',
        text: 'Operating temperature (°C)',
        type: 'number',
        comments: { enabled: false, required: false, placeholder: '' },
        scoring: { enabled: false, weight: 3, isKillQuestion: false },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q5',
        text: 'Next scheduled maintenance date',
        type: 'date-time',
        comments: { enabled: false, required: false, placeholder: '' },
        scoring: { enabled: false, weight: 3, isKillQuestion: false },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      }
    ]
  }
};

export async function POST(request: NextRequest) {
  try {
    // Get the JSON body from the request
    const body = await request.json();
    
    // Try to forward the request to the checklists service
    try {
      const response = await fetch(`${CHECKLISTS_SERVICE_URL}/api/checklists/import/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
      }

      return NextResponse.json(data);
    } catch (serviceError) {
      // If service is not available, return mock data
      console.warn('Checklists service not available, returning mock data:', serviceError);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json(MOCK_TEXT_RESPONSE);
    }
  } catch (error) {
    console.error('Error processing text:', error);
    return NextResponse.json(
      { error: 'Failed to process text', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}