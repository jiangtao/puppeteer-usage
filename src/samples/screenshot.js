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
    // const device = devices['iPhone 6'];
    // await page.emulate(device);
    await page.goto('https://borrower.houbank.com/academy', { waitUntil: 'networkidle2' });

    await page.screenshot({
      path    : `${fullDir}/full.jpg`,
      // clip: {
      //   x     : 0,
      //   y     : 0,
      //   width : device.viewport.width * 2,
      //   height: device.viewport.height * 4
      // },
      fullPage: true,
      quality : 60
    });
    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

