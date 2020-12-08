import os from 'os';
import winston, { Logger as Winston } from 'winston';
import { Configuration } from '@env';
import { Injectable } from '@decorator/class';

interface Log {
  app: string;
  hostName: string;
  event: string;
  timestamp: string;
  class: string;
  method: string;
  err?: LogError;
}

interface LogError {
  msg: any;
  stack: any;
  name?: string;
}

enum LogLevels {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

const WinstonLogger = winston.createLogger({
  level: Configuration.appConfig.logging.defaultLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: Configuration.appConfig.logging.logsPath,
    }),
    new winston.transports.File({
      level: LogLevels.ERROR,
      filename: Configuration.appConfig.logging.errorLogsPath,
    }),
  ],
});

if (Configuration.appConfig.environment === 'dev') {
  WinstonLogger.add(
    new winston.transports.Console({
      format: winston.format.prettyPrint(),
    })
  );
}

@Injectable()
export class Logger {
  private readonly winstonLogger: Winston = WinstonLogger;

  private logConfig: Log = {
    app: Configuration.appConfig.appName,
    timestamp: new Date().toISOString(),
    hostName: os.hostname(),
    class: this.Class,
    method: '',
    event: '',
  };

  constructor(private Class: string) {
    this.Class = Class;
  }

  private formatMessage(event: string, method: string): Log {
    return {
      ...this.logConfig,
      method,
      event,
    };
  }

  private formatErrorMessage(err: Error | string, method: string): Log {
    const log = {
      ...this.logConfig,
      method,
      err: {} as LogError,
    };

    if (err instanceof Error) {
      log.err = {
        name: err.name,
        msg: err.message,
        stack: err.stack || '',
      };
    } else {
      log.err = {
        name: 'Unknown Error',
        msg: err,
        stack: new Error().stack || '',
      };
    }

    return log;
  }

  private logEvent(level: LogLevels, event: any) {
    this.winstonLogger.log(level, event);
  }

  info(msg: string, method: string) {
    this.logEvent(LogLevels.INFO, this.formatMessage(msg, method));
  }

  debug(msg: string, method: string) {
    this.logEvent(LogLevels.DEBUG, this.formatMessage(msg, method));
  }

  warning(msg: string, method: string) {
    this.logEvent(LogLevels.WARN, this.formatMessage(msg, method));
  }

  error(err: Error | string, method: string) {
    this.logEvent(LogLevels.ERROR, this.formatErrorMessage(err, method));
  }
}
