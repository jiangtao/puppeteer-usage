
// const devices = require('puppeteer/DeviceDescriptors');
const { promisify } = require('util');
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
        url : 'https://borrower.houbank.com/academy',
        name: 'houbank_academy'
      },
      {
        url : 'https://borrower.houbank.com/home',
        name: 'houbank_home'
      },
      {
        url : 'https://www.houbank.com/homeinfo/infoDisclosure/organizationInfo',
        name: 'houbank_info'
      },
      {
        url : 'https://www.houbank.com/homeinfo/companyInfo',
        name: 'houbank_company'
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

  // 以新的文档运行，window.navigator.puppeteer_tested window.platform.puppeteer_tested 防止被污染
  await page.evaluateOnNewDocument(() => detect('puppeteer_tested'));
  // 以iphone 6运行
  // await page.emulate(devices['iPhone 6']);
  const fullDir = `${screenDir}/${name}`;
  await mkdirp(fullDir);
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${fullDir}/${time.date}.jpg`, fullPage: true, quality: 60 });
}

