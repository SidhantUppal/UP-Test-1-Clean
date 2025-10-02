import { NextRequest, NextResponse } from 'next/server';
import { llmService } from '@/lib/llm-service';
import { DocumentProcessor } from '@/lib/document-processor';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const extractionPrompt = formData.get('extractionPrompt') as string;
    const questionStyle = formData.get('questionStyle') as string;
    const includeContext = formData.get('includeContext') === 'true';
    const maxQuestions = parseInt(formData.get('maxQuestions') as string) || 25;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const fileValidation = DocumentProcessor.validateFile(file);
    if (!fileValidation.valid) {
      return NextResponse.json(
        { error: fileValidation.error },
        { status: 400 }
      );
    }

    // Process the document
    console.log('Processing file:', file.name, 'Type:', file.type, 'Size:', file.size);
    const processedDocument = await DocumentProcessor.processFile(file);
    
    if (!processedDocument.success) {
      console.error('Document processing failed:', processedDocument.error);
      return NextResponse.json(
        { error: processedDocument.error },
        { status: 400 }
      );
    }
    
    console.log('Document processed successfully. Content length:', processedDocument.content.length);

    // Extract checklist using LLM
    const extractedChecklist = await llmService.extractChecklistFromDocument(
      processedDocument.content,
      {
        extractionPrompt,
        questionStyle: questionStyle as 'clear-and-specific' | 'detailed' | 'concise',
        includeContext,
        maxQuestions
      }
    );

    return NextResponse.json({
      success: true,
      checklist: extractedChecklist,
      metadata: processedDocument.metadata
    });

  } catch (error) {
    console.error('Error in checklist extraction API:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to extract checklist',
        success: false 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Optional: Add a GET endpoint for testing
export async function GET() {
  try {
    // Test the service
    const testResult = await llmService.testExtraction();
    
    return NextResponse.json({
      success: true,
      message: 'Checklist extraction service is working',
      testResult
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Service unavailable',
        success: false 
      },
      { status: 500 }
    );
  }
}