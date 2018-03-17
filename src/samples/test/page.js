
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
    /*
     线上页面一个检测，保证页面正常显示：
     1. 开发的图和预期是一样的
     2. 线上运行过程中，没有问题
    这是要抓取的界面
    */
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
      await execute(p,newBrowser);
    }

    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

async function execute({ url,name },newBrowser) {
  const page = await newBrowser.newPage();
  const device = devices['iPhone 6'] // 指定当前设备下的尺寸
  const downloadFile = `${name.split('/').join('.')}.${time.date}.jpg`

  // 以新的文档运行，window.navigator.puppeteer_tested window.platform.puppeteer_tested 防止被污染
  await page.evaluateOnNewDocument(() => detect('puppeteer_tested'));
  await page.setViewport(device.viewport);
  const fullDir = `${screenDir}`;
  if (!existsSync(fullDir)) {
    await mkdirp(fullDir)
  }

  // SPA界面下，可以拿到正常渲染的界面； 骨架屏的自动生成方案
  await page.goto(url,{ waitUntil: 'networkidle2' });


  // 处理滚动条不是body的情况
  const result = await page.evaluate(() => {
    const scrollElement = document.querySelector('#main');
    return {
      height: scrollElement.scrollHeight
    };
  });
  // 在滚动元素不是body的情况下，截屏不全
  await page.setViewport(Object.assign({},device.viewport,result));
  await page.screenshot({ path: `${fullDir}/${downloadFile}`,quality: 60 });
}

