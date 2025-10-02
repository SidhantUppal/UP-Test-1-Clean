import { NextRequest, NextResponse } from 'next/server';
import { webhookService } from '@/services/webhookService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate webhook URL
    if (!webhookService.validateWebhookUrl(body.url)) {
      return NextResponse.json(
        { 
          error: 'Invalid webhook URL', 
          details: 'URL must be HTTPS in production and cannot be localhost' 
        },
        { status: 400 }
      );
    }
    
    // Create test configuration
    const testConfig = {
      url: body.url,
      method: body.method || 'POST',
      events: {
        onStart: true
      },
      options: {
        includeAnswers: true,
        includeScore: true,
        includeMetadata: true,
        retryOnFailure: false
      },
      secret: body.secret
    };
    
    // Send test webhook
    const result = await webhookService.testWebhook(testConfig);
    
    return NextResponse.json({
      success: result.success,
      data: {
        statusCode: result.statusCode,
        response: result.response,
        error: result.error,
        attempts: result.attempts
      },
      message: result.success 
        ? 'Webhook test successful' 
        : `Webhook test failed: ${result.error}`
    });
  } catch (error) {
    console.error('Error testing webhook:', error);
    return NextResponse.json(
      { 
        error: 'Failed to test webhook',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}