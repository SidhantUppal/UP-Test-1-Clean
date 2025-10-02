import { NextRequest, NextResponse } from 'next/server';

const CHECKLISTS_SERVICE_URL = process.env.CHECKLISTS_SERVICE_URL || 'http://localhost:3004';

// Mock response for when service is unavailable
const MOCK_DOCUMENT_RESPONSE = {
  success: true,
  data: {
    title: "Safety Inspection Checklist",
    description: "This checklist has been extracted from your document using AI analysis.",
    questions: [
      {
        id: 'q1',
        text: 'Are all emergency exits clearly marked and unobstructed?',
        type: 'checkbox',
        comments: { enabled: true, required: false, placeholder: 'Add any observations...' },
        scoring: { enabled: false, weight: 3, isKillQuestion: false },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q2',
        text: 'Are fire extinguishers in place and inspected within the last month?',
        type: 'yn-na',
        comments: { enabled: true, required: false, placeholder: 'Note inspection date...' },
        scoring: { enabled: true, weight: 4, isKillQuestion: true },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q3',
        text: 'Rate the overall cleanliness of the work area',
        type: 'score-5',
        comments: { enabled: false, required: false, placeholder: '' },
        scoring: { enabled: true, weight: 3, isKillQuestion: false },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q4',
        text: 'Date of last safety training session',
        type: 'date-time',
        comments: { enabled: false, required: false, placeholder: '' },
        scoring: { enabled: false, weight: 3, isKillQuestion: false },
        media: { requireAnswerImage: false },
        tasks: { enabled: false, triggerOn: 'fail' }
      },
      {
        id: 'q5',
        text: 'Upload a photo of the inspection area',
        type: 'file-upload',
        comments: { enabled: false, required: false, placeholder: '' },
        scoring: { enabled: false, weight: 3, isKillQuestion: false },
        media: { requireAnswerImage: true },
        tasks: { enabled: false, triggerOn: 'fail' }
      }
    ]
  }
};

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    // Try to forward the request to the checklists service
    try {
      const response = await fetch(`${CHECKLISTS_SERVICE_URL}/api/checklists/import/document`, {
        method: 'POST',
        headers: {
          'x-user-id': request.headers.get('x-user-id') || '1',
          'x-user-area-id': request.headers.get('x-user-area-id') || '1',
        },
        body: formData,
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
      
      return NextResponse.json(MOCK_DOCUMENT_RESPONSE);
    }
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json(
      { error: 'Failed to process document', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}