import { Request, Response, NextFunction } from 'express';
import { Logger } from './types';
import { randomUUID } from 'crypto';

export function createLoggingMiddleware(logger: Logger) {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
    
    // Attach to request for use in handlers
    req.correlationId = correlationId;
    req.logger = logger.child({ correlationId });
    
    // Log request
    req.logger.info({ req }, 'Incoming request');
    
    // Log response
    const originalSend = res.send;
    res.send = function(data) {
      (res as any).duration = Date.now() - start;
      req.logger?.info({ res }, 'Request completed');
      return originalSend.call(this, data);
    };
    
    next();
  };
}