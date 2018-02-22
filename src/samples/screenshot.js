// 模拟用户输入

const devices = require('puppeteer/DeviceDescriptors');
const { time } = require('../utils');
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
    await page.emulate(devices['iPhone 6']);
    await page.goto('https://mp.weixin.qq.com/s?__biz=MzIwNjQwMzUwMQ==&mid=2247485520&idx=1&sn=708eaee7c6f534f1f773876f54d13b58&chksm=97236a92a054e38434da7354749c4d9aca397cccd4019c393fc5898adb479e461eafd70289f8&mpshare=1&scene=23&srcid=1022c7ea0gAmGzHVPSlZ1bHn#rd');
    await page.screenshot({ path: `${fullDir}/full.jpg`, fullPage: true, quality: 60 });
    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

