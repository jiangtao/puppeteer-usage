const path = require('path');
const log4js = require('log4js');
const root = process.cwd();

module.exports = {
  dir: {
    download: path.resolve(root, 'download'),
    screen: path.resolve(root, 'screenshot'),
    trace: path.resolve(root, 'trace')
  },
  redis: require('./redis'),
  logger: {
    info() {
      const logger = log4js.getLogger();
      logger.level = 'INFO';
      logger.info(...arguments);
    },

    error() {
      const logger = log4js.getLogger();
      logger.level = 'ERROR';
      logger.error(...arguments);
    }
  }
};
