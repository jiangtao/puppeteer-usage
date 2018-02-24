
const devices = require('puppeteer/DeviceDescriptors');
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));

const { browser, detect } = require('../../core');
const { isDownloadImageByResponse } = require('../../core/is');
const { screenDir, logger } = require('../../config');
const {
  time, sleep
} = require('../../utils');

(async () => {
  try {
    const pages = [
      {
        url : 'http://i.houmifin.com/loan/index',
        name: 'houmifin_index'
      },
      {
        url : 'http://i.houmifin.com/loan/detail?product=27',
        name: 'houmifin_product'
      },
      {
        url : 'http://i.houmifin.com/loan/search',
        name: 'houmifin_search'
      }
    ];
    const newBrowser = await browser();

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

  // 以新的文档运行，window.navigator.puppeteer_tested window.platform.puppeteer_tested 防止被污染
  await page.evaluateOnNewDocument(() => detect('puppeteer_tested'));
  // 以iphone 6运行
  const fullDir = `${screenDir}/${name}`;
  await mkdirp(fullDir);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.emulate(devices['iPhone 6']);
  await sleep(2);
  await page.screenshot({ path: `${fullDir}/${time.date}.jpg`, fullPage: true, quality: 60 });
}

