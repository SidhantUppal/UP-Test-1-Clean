import pino from 'pino';
import type { LoggerOptions, Logger } from './types';

function redactHeaders(headers: any) {
  const redacted = { ...headers };
  delete redacted.authorization;
  delete redacted.cookie;
  delete redacted['x-api-key'];
  return redacted;
}

export function createLogger(options: LoggerOptions): Logger {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const logger = pino({
    name: options.service,
    level: options.level || process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
    ...(isDevelopment && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname'
        }
      }
    }),
    serializers: {
      err: pino.stdSerializers.err,
      req: (req: any) => ({
        method: req.method,
        url: req.url,
        headers: redactHeaders(req.headers),
        correlationId: req.correlationId
      }),
      res: (res: any) => ({
        statusCode: res.statusCode,
        duration: res.duration
      })
    },
    redact: {
      paths: ['password', 'token', 'authorization', '*.password', '*.token'],
      remove: true
    }
  });

  return logger as Logger;
}

export * from './types';
export { createLoggingMiddleware } from './middleware';