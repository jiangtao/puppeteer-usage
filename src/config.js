const path = require('path');
const log4js = require('log4js');

const root = process.cwd();

module.exports = {
  downloadDir: path.resolve(root, 'download'),
  screenDir  : path.resolve(root, 'screenshot'),
  logger     : {
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
