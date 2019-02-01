
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const { writeFile } = require('fs');
const { autoScroll, browser } = require('../../core');
const { isDownloadImageByResponse } = require('../../core/is');
const { dir, logger } = require('../../config');
const { time } = require('../../utils');

const word = process.argv.slice(2).pop() || '卡通';
(async () => {
  try {
    let count = 0;
    const fullDir = `${dir.download}/${time.date}/${word}`;
    await mkdirp(fullDir);

    const newBrowser = await browser();
    const page = await newBrowser.newPage();

    page.on('response', async (response) => {
      try {
        if (isDownloadImageByResponse(response)) {
          count++;
          const headers = response.headers();
          const extname = headers['content-type'].split('/').pop();
          const fullPath = `${fullDir}/${count}.${extname}`;
          const buffer = await response.buffer();
          const url = response.url();
          writeFile(fullPath, buffer, () => {
            logger.info(`${count} : ${url}`);
          });
        }
      } catch (e) {
        logger.error(e);
      }
    });
    await page.goto(`https://pic.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=${word}&oq=javascript&rsp=-1`);
    await autoScroll(page);
    count = 0;
    logger.info('Done.');
    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

