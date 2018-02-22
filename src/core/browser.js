const puppeteer = require('puppeteer');

module.exports = function browser(config) {
  return puppeteer.launch(Object.assign({}, config, {
    headless      : false,
    executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
  }));
};
