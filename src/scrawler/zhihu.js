const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const stream = require('stream');
const { createReadStream, createWriteStream, existsSync } = require('fs');
const { autoScroll, browser } = require('../core/index');
const { dir } = require('../config/index');
const logger = require('../utils/Logger')
.getLogger('zhihu');
const { basename } = require('path');
const Pics = require('../model/pics');

let caches,
  newBrowser;
// TODO: change redis to mongo
const read = async function (qid, browser, callback) {
  console.log(`starting read ${qid} images`);
  const fulldir = `${dir.download}/zhihu/${qid}`;
  let relativePath = `zhihu/${qid}`
  const month = 12 * 24 * 60 * 60;
  if (!existsSync(fulldir)) {
    await mkdirp(fulldir);
  }
  const page = await browser.newPage();
  const origin = `https://www.zhihu.com/question/${qid}`
  await page.goto(origin);
  page.on('response', async function (response) {
    const url = response.url();
    const request = response.request();
    let meta = {}
    if (request.resourceType() === 'image') {
      if (!url.includes('_hd')) return;
      const name = basename(url);
      let buffer = await response.buffer();
      var bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);
      bufferStream.pipe(createWriteStream(`${fulldir}/${name}`));
      meta.download_path = `${relativePath}/${name}`;
      logger.log(url, `${fulldir}/${name}`);
      await Pics.create({pic_url: url, url: origin, meta})
      if (typeof callback == 'function') {
        callback(url, meta, buffer, bufferStream);
      }
      
    }
  });
  await autoScroll(page);
  await closeBrowser(newBrowser);
};

const closeBrowser = async function (browser) {
  if (browser) {
    await browser.close();
  }
};

const register = async function (callback) {
  if (!newBrowser) {
    newBrowser = await browser({
      headless: true,
      timeout : 1200000
    });
  }
  // 读取知乎id
  const lr = require('readline')
  .createInterface({
    input: createReadStream(`${__dirname}/todo/zhihu.txt`)
  });
  lr.on('line', async function (l) {
    try {
      await read(l, newBrowser, callback);
    } catch (e) {
      logger.error(e.stack);
      await closeBrowser(newBrowser);
      process.exit(1);
    }
  });
};
process.on('exit', async function (e) {
  logger.error('exit', e);
  await closeBrowser(newBrowser);
});
process.on('uncaughtException', async function (e) {
  logger.error(e);
  await closeBrowser(newBrowser);
  process.exit(1);
});

module.exports = register;
module.exports.read = read;
