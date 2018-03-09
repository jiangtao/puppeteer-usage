
const devices = require('puppeteer/DeviceDescriptors');
const { promisify } = require('util');
const { existsSync } = require('fs');
const mkdirp = promisify(require('mkdirp'));
const { browser, detect } = require('../../core');
const { screenDir, logger } = require('../../config');
const {
  time
} = require('../../utils');

(async () => {
  try {
    const pages = [
      {
        url : 'http://i.houmifin.com/loan/index',
        name: 'houmifin/index'
      },
      {
        url : 'http://i.houmifin.com/loan/detail?product=27',
        name: 'houmifin/product'
      },
      {
        url : 'http://i.houmifin.com/loan/search',
        name: 'houmifin/search'
      },
      {
        url : 'http://i.houmifin.com/loan/search?amount=89',
        name: 'houmifin/search_query'
      }
    ];
    const newBrowser = await browser();

    /* eslint-disable */
    for (const p of pages) {
      await execute(p, newBrowser);
    }

    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

async function execute({ url, name }, newBrowser) {
  const page = await newBrowser.newPage();
  const device = devices['iPhone 6']
  const downloadFile = `${name.split('/').join('.')}.${time.date}.jpg`

  // 以新的文档运行，window.navigator.puppeteer_tested window.platform.puppeteer_tested 防止被污染
  await page.evaluateOnNewDocument(() => detect('puppeteer_tested'));
  await page.setViewport(device.viewport);
  const fullDir = `${screenDir}`;
  if(!existsSync(fullDir)) {
    await mkdirp(fullDir)
  }
  await page.goto(url, { waitUntil: 'networkidle2' });

  // 处理滚动条不是body的情况
  const result = await page.evaluate(() => {
    const scrollElement = document.querySelector('#main');
    return {
      height: scrollElement.scrollHeight
    };
  });

  await page.setViewport(Object.assign({}, device.viewport, result));
  await page.screenshot({ path: `${fullDir}/${downloadFile}`, quality: 60 });
}

