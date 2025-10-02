// Browser-compatible logger for frontend
// Uses the same interface as our backend logger for consistency

interface LogMeta {
  [key: string]: string | number | boolean | Error | undefined;
  correlationId?: string;
  userId?: string;
  sessionId?: string;
  component?: string;
  operation?: string;
  duration?: number;
  error?: Error;
}

interface Logger {
  trace(message: string, meta?: LogMeta): void;
  debug(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  error(message: string, meta?: LogMeta): void;
  fatal(message: string, meta?: LogMeta): void;
  child(bindings: LogMeta): Logger;
}

class BrowserLogger implements Logger {
  private context: LogMeta;
  private isDev: boolean;

  constructor(context: LogMeta = {}) {
    this.context = context;
    this.isDev = process.env.NODE_ENV === 'development';
  }

  private log(level: string, message: string, meta: LogMeta = {}) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level: level.toUpperCase(),
      message,
      service: 'frontend',
      ...this.context,
      ...meta,
    };

    // In development: pretty console output
    if (this.isDev) {
      const style = this.getConsoleStyle(level);
      const metaStr = Object.keys({...this.context, ...meta}).length > 0 
        ? JSON.stringify({...this.context, ...meta}, null, 2)
        : '';
      
      console.log(
        `%c[${level.toUpperCase()}] %c${message}`,
        style,
        'color: inherit;',
        metaStr ? '\n' + metaStr : ''
      );
    } else {
      // In production: structured JSON (could send to logging service)
      console.log(JSON.stringify(logData));
    }

    // Could also send to external logging service here
    // this.sendToLoggingService(logData);
  }

  private getConsoleStyle(level: string): string {
    const styles = {
      trace: 'color: #888; font-weight: normal;',
      debug: 'color: #0066cc; font-weight: normal;',
      info: 'color: #008000; font-weight: bold;',
      warn: 'color: #ff8800; font-weight: bold;',
      error: 'color: #cc0000; font-weight: bold;',
      fatal: 'color: #ffffff; background-color: #cc0000; font-weight: bold; padding: 2px 4px;',
    };
    return styles[level as keyof typeof styles] || styles.info;
  }

  trace(message: string, meta: LogMeta = {}): void {
    this.log('trace', message, meta);
  }

  debug(message: string, meta: LogMeta = {}): void {
    this.log('debug', message, meta);
  }

  info(message: string, meta: LogMeta = {}): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta: LogMeta = {}): void {
    this.log('warn', message, meta);
  }

  error(message: string, meta: LogMeta = {}): void {
    // Handle Error objects specially
    if (meta.error instanceof Error) {
      const { error, ...restMeta } = meta;
      this.log('error', message, {
        ...restMeta,
        errorMessage: error.message,
        errorStack: error.stack,
      });
    } else {
      this.log('error', message, meta);
    }
  }

  fatal(message: string, meta: LogMeta = {}): void {
    this.log('fatal', message, meta);
  }

  child(bindings: LogMeta): Logger {
    return new BrowserLogger({ ...this.context, ...bindings });
  }
}

// Create default logger instance
export const logger = new BrowserLogger({
  service: 'frontend',
  version: '1.0.0',
});

// Utility functions
export function generateCorrelationId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createComponentLogger(component: string) {
  return logger.child({ component });
}

export function createUserLogger(userId: string) {
  return logger.child({ userId });
}

// Performance measurement
export function measureTime<T>(
  fn: () => T,
  logger: Logger,
  operation: string,
  meta: LogMeta = {}
): T {
  const start = Date.now();
  
  try {
    const result = fn();
    const duration = Date.now() - start;
    
    logger.info(`Operation completed: ${operation}`, {
      ...meta,
      operation,
      duration,
      status: 'success',
    });
    
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    
    logger.error(`Operation failed: ${operation}`, {
      ...meta,
      operation,
      duration,
      status: 'error',
      error,
    });
    
    throw error;
  }
}

// Navigation logging
export function logNavigation(from: string, to: string, userId?: string) {
  logger.info('Navigation', {
    operation: 'navigate',
    from,
    to,
    userId,
    timestamp: Date.now(),
  });
}

// User action logging
export function logUserAction(action: string, meta: LogMeta = {}) {
  logger.info(`User action: ${action}`, {
    operation: 'user_action',
    action,
    ...meta,
  });
}