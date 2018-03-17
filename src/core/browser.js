const puppeteer = require('puppeteer');

module.exports = function browser(config = {}) {
  return puppeteer.launch(Object.assign({
    headless      : false,
    executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary',
    timeout       : 30000
  }, config));
};
