// 模拟用户输入

const devices = require('puppeteer/DeviceDescriptors');
const { time, sleep } = require('../utils');
const { browser } = require('../core');
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const { logger, screenDir } = require('../config');

(async () => {
  try {
    const fullDir = `${screenDir}/${time.date}`;
    await mkdirp(fullDir);
    const newBrowser = await browser();
    const page = await newBrowser.newPage();
    const device = devices['iPhone 6'];
    await page.setViewport(device.viewport);
    await page.goto('http://i.houmifin.com/loan/index', { waitUntil: 'networkidle2' });

    const result = await page.evaluate(() => {
      const scrollElement = document.querySelector('#main');
      return {
        height: scrollElement.scrollHeight
      };
    });

    await page.setViewport(Object.assign({}, device.viewport, result));
    await page.screenshot({
      path: `${fullDir}/full.jpg`
    });
    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

