const puppeteer = require('puppeteer');

module.exports = function browser(config = {}) {
  return puppeteer.launch(Object.assign({
    headless: false,
    executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
    timeout: 30000
  }, config));
};
