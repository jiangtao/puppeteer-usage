const log4js = require('log4js');
const path = require('path');

const root = path.resolve(process.cwd(), 'logs');

class Logger {
  constructor(name) {
    if (!(this instanceof Logger)) {
      return new Logger(name);
    }
    const LOG_ACCESS = `${name}`;
    const LOG_ERROR = `${name}.error`;
    // log the cheese logger messages to a file, and the console ones as well.
    log4js.configure({
      appenders: {
        access: {
          type      : 'file',
          filename  : `${root}/${LOG_ACCESS}.log`,
          pattern   : 'yyyy-MM-dd-hh',
          compress  : true,
          encoding  : 'utf-8',
          mode      : 0o0640,
          flags     : 'w+',
          numBackups: 5,
          maxLogSize: 10 * 1024 * 1024
        },

        error: {
          type      : 'file',
          filename  : `${root}/${LOG_ERROR}.log`,
          pattern   : 'yyyy-MM-dd-hh',
          compress  : true,
          encoding  : 'utf-8',
          mode      : 0o0640,
          flags     : 'w+',
          numBackups: 5,
          maxLogSize: 10 * 1024 * 1024
        },
        console: { type: 'console', pattern: 'yyyy-MM-dd-hh' }
      },
      categories: {
        [LOG_ACCESS]: { appenders: ['console', 'access'], level: 'info' },
        [LOG_ERROR] : { appenders: ['console', 'error'], level: 'error' },
        default     : { appenders: ['console', 'access'], level: 'trace' }
      }
    });

    this._logger = log4js.getLogger(LOG_ACCESS);
    this._loggerError = log4js.getLogger(LOG_ERROR);
  }
  info(...args) {
    return this._logger.info(...args);
  }
  log(...args) {
    return this._logger.info(...args);
  }
  warn(...args) {
    return this._logger.warn(...args);
  }
  trace(...args) {
    return this._logger.trace(...args);
  }
  error(...args) {
    return this._loggerError.error(...args);
  }
  static getLogger(name) {
    return new Logger(name);
  }
}

module.exports = Logger;
