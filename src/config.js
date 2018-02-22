const path = require('path');
const log4js = require('log4js');

const root = process.cwd();

module.exports = {
  dir: path.resolve(process.cwd(), '.download'),
  logger: {
    info(){
      const logger = log4js.getLogger()
      logger.level = 'INFO'
      logger.info.apply(logger, arguments)
    },

    error(){
      const logger = log4js.getLogger()
      logger.level = 'ERROR'
      logger.error.apply(logger, arguments)
    }
  }
};
