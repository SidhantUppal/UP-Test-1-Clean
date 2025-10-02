export interface LoggerOptions {
  service: string;
  level?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
}

export interface Logger {
  trace: (obj: any, msg?: string) => void;
  debug: (obj: any, msg?: string) => void;
  info: (obj: any, msg?: string) => void;
  warn: (obj: any, msg?: string) => void;
  error: (obj: any, msg?: string) => void;
  fatal: (obj: any, msg?: string) => void;
  child: (bindings: any) => Logger;
}

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
      logger?: Logger;
    }
  }
}