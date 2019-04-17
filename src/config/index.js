const path = require('path');
const root = process.cwd();

module.exports = {
  dir: {
    download: path.resolve(root, 'download'),
    screen  : path.resolve(root, 'screenshot'),
    trace   : path.resolve(root, 'trace')
  },
  redis: require('./redis')
};
