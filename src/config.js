const path = require('path');
const log4js = require('log4js');

const root = process.cwd();

module.exports = {
  downloadDir: path.resolve(process.cwd(), '.download'),
  screenDir: path.resolve(process.cwd(), '.screenshot'),
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
