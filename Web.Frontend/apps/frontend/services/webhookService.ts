// Webhook Service for Checklist System
import crypto from 'crypto';

export interface WebhookEvent {
  type: 'start' | 'complete' | 'fail' | 'kill_question' | 'partial_save';
  timestamp: string;
  checklist: {
    templateId: number;
    templateName: string;
    executionId: number;
    assignmentId: number;
  };
  execution: {
    startedAt: string;
    completedAt?: string;
    executedBy: string;
    location?: string;
    orgGroup?: string;
    score?: number;
    maxScore?: number;
    passed?: boolean;
    killQuestionTriggered?: boolean;
  };
  answers?: any[];
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    accessMethod?: string; // 'direct', 'qr', 'anonymous'
    deviceType?: string;
  };
}

export interface WebhookConfig {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  events: {
    onStart?: boolean;
    onComplete?: boolean;
    onFail?: boolean;
    onKillQuestion?: boolean;
    onPartialSave?: boolean;
  };
  options: {
    includeAnswers?: boolean;
    includeScore?: boolean;
    includeMetadata?: boolean;
    retryOnFailure?: boolean;
  };
  secret?: string; // For HMAC signature
}

export interface WebhookResult {
  success: boolean;
  statusCode?: number;
  response?: any;
  error?: string;
  attempts: number;
}

class WebhookService {
  private maxRetries = 3;
  private retryDelay = 1000; // Start with 1 second, exponential backoff

  /**
   * Generate HMAC signature for webhook payload
   */
  private generateSignature(payload: string, secret: string): string {
    return crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
  }

  /**
   * Build webhook payload based on event and configuration
   */
  private buildPayload(
    event: WebhookEvent,
    config: WebhookConfig
  ): any {
    const payload: any = {
      event: `checklist.${event.type}`,
      timestamp: event.timestamp,
      checklist: event.checklist,
      execution: {
        startedAt: event.execution.startedAt,
        completedAt: event.execution.completedAt,
        executedBy: event.execution.executedBy,
        location: event.execution.location,
        orgGroup: event.execution.orgGroup
      }
    };

    // Include score if configured
    if (config.options.includeScore && event.execution.score !== undefined) {
      payload.execution.score = event.execution.score;
      payload.execution.maxScore = event.execution.maxScore;
      payload.execution.passed = event.execution.passed;
      payload.execution.killQuestionTriggered = event.execution.killQuestionTriggered;
    }

    // Include answers if configured
    if (config.options.includeAnswers && event.answers) {
      payload.answers = event.answers;
    }

    // Include metadata if configured
    if (config.options.includeMetadata && event.metadata) {
      payload.metadata = event.metadata;
    }

    return payload;
  }

  /**
   * Execute a single webhook with retry logic
   */
  private async executeWebhook(
    url: string,
    method: string,
    payload: any,
    secret?: string,
    retryOnFailure?: boolean
  ): Promise<WebhookResult> {
    let attempts = 0;
    let lastError: string | undefined;

    const maxAttempts = retryOnFailure ? this.maxRetries : 1;

    while (attempts < maxAttempts) {
      attempts++;

      try {
        const payloadString = JSON.stringify(payload);
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'X-Webhook-Event': payload.event,
          'X-Webhook-Timestamp': payload.timestamp
        };

        // Add HMAC signature if secret is provided
        if (secret) {
          headers['X-Webhook-Signature'] = `sha256=${this.generateSignature(payloadString, secret)}`;
        }

        const response = await fetch(url, {
          method,
          headers,
          body: payloadString,
          signal: AbortSignal.timeout(30000) // 30 second timeout
        });

        // Consider 2xx status codes as success
        if (response.status >= 200 && response.status < 300) {
          const responseBody = await response.text();
          let responseData;
          
          try {
            responseData = JSON.parse(responseBody);
          } catch {
            responseData = responseBody;
          }

          return {
            success: true,
            statusCode: response.status,
            response: responseData,
            attempts
          };
        }

        // Non-success status code
        lastError = `HTTP ${response.status}: ${response.statusText}`;
        
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          break;
        }

      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error';
      }

      // Wait before retry with exponential backoff
      if (attempts < maxAttempts) {
        await new Promise(resolve => 
          setTimeout(resolve, this.retryDelay * Math.pow(2, attempts - 1))
        );
      }
    }

    return {
      success: false,
      error: lastError,
      attempts
    };
  }

  /**
   * Send webhook for a checklist event
   */
  async sendWebhook(
    event: WebhookEvent,
    config: WebhookConfig
  ): Promise<WebhookResult> {
    // Check if this event type should trigger webhook
    const shouldTrigger = 
      (event.type === 'start' && config.events.onStart) ||
      (event.type === 'complete' && config.events.onComplete) ||
      (event.type === 'fail' && config.events.onFail) ||
      (event.type === 'kill_question' && config.events.onKillQuestion) ||
      (event.type === 'partial_save' && config.events.onPartialSave);

    if (!shouldTrigger) {
      return {
        success: true,
        attempts: 0
      };
    }

    // Build payload
    const payload = this.buildPayload(event, config);

    // Execute webhook
    return await this.executeWebhook(
      config.url,
      config.method,
      payload,
      config.secret,
      config.options.retryOnFailure
    );
  }

  /**
   * Send webhooks to multiple endpoints
   */
  async sendWebhooks(
    event: WebhookEvent,
    configs: WebhookConfig[]
  ): Promise<WebhookResult[]> {
    const results = await Promise.allSettled(
      configs.map(config => this.sendWebhook(event, config))
    );

    return results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          success: false,
          error: result.reason?.message || 'Failed to send webhook',
          attempts: 1
        };
      }
    });
  }

  /**
   * Log webhook execution to database
   */
  async logWebhookExecution(
    executionId: number,
    url: string,
    method: string,
    event: string,
    payload: any,
    result: WebhookResult
  ): Promise<void> {
    try {
      const response = await fetch('/api/checklists/webhooks/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          executionId,
          url,
          method,
          eventType: event,
          requestPayload: payload,
          responseStatus: result.statusCode,
          responseBody: result.response,
          attemptNumber: result.attempts,
          success: result.success,
          errorMessage: result.error
        })
      });

      if (!response.ok) {
        console.error('Failed to log webhook execution:', await response.text());
      }
    } catch (error) {
      console.error('Error logging webhook execution:', error);
    }
  }

  /**
   * Validate webhook URL
   */
  validateWebhookUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      // Only allow HTTPS in production
      if (process.env.NODE_ENV === 'production' && parsed.protocol !== 'https:') {
        return false;
      }
      // Don't allow localhost in production
      if (process.env.NODE_ENV === 'production' && 
          (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Test webhook configuration
   */
  async testWebhook(config: WebhookConfig): Promise<WebhookResult> {
    const testEvent: WebhookEvent = {
      type: 'start',
      timestamp: new Date().toISOString(),
      checklist: {
        templateId: 0,
        templateName: 'Test Template',
        executionId: 0,
        assignmentId: 0
      },
      execution: {
        startedAt: new Date().toISOString(),
        executedBy: 'test@example.com',
        location: 'Test Location'
      },
      metadata: {
        accessMethod: 'test'
      }
    };

    // Force include all data for test
    const testConfig = {
      ...config,
      events: { onStart: true },
      options: {
        ...config.options,
        includeAnswers: true,
        includeScore: true,
        includeMetadata: true,
        retryOnFailure: false // Don't retry test webhooks
      }
    };

    return await this.sendWebhook(testEvent, testConfig);
  }
}

export const webhookService = new WebhookService();