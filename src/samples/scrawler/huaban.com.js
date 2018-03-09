
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const { writeFile } = require('fs');
const { autoScroll, browser } = require('../../core');
const { isDownloadImageByResponse } = require('../../core/is');
const { downloadDir, logger } = require('../../config');
const {
  time, request, sleep, faker
} = require('../../utils');

const word = process.argv.slice(2).pop() || '金融';
(async () => {
  try {
    let count = 0;
    const USER = {
      password: process.env.huaban_pass,
      mobile  : process.env.huaban_mobile
    };
    const fullDir = `${downloadDir}/${time.date}/${word}`;

    await mkdirp(fullDir);

    const newBrowser = await browser({
      headless: false
    });
    const page = await newBrowser.newPage();
    // 伪造ip

    // 进入花瓣，保证页面过长的时候，居中
    await await page.setViewport({
      width : 1024,
      height: 600 // limit height and make the login selector is in visible area
    });
    await page.goto('http://huaban.com/');
    // 模拟登录
    await page.click('.login-nav a.login');
    await page.type('input[name=email]', USER.mobile);
    await page.type('input[name=password]', USER.password);
    await page.click('.mail-login .btn.btn18.rbtn');
    await sleep(2);
    await page.type('input#query', word);
    await page.click('#search_form .go');
    await await page.setViewport({
      width : 1024,
      height: 1500 // 拉长整个页面，保证滚动条滚动的时间长一些
    });
    await sleep(1); // 保证页面渲染完成
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

    await autoScroll(page, 2000);
    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

