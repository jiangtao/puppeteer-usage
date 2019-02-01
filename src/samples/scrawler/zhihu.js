
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const stream = require('stream')
const { writeFile, createReadStream, createWriteStream, existsSync } = require('fs');
const { autoScroll, browser } = require('../../core');
const { dir, logger } = require('../../config');
const { time } = require('../../utils');
const { basename } = require('path')
const redis = require('../../utils/redis')

async function read(qid) {
  try {
    const fulldir = `${dir.download}/zhihu/${qid}`
    const month = 30 * 24 * 60 * 60
    if (!existsSync(fulldir)) {
      await mkdirp(fulldir)
    }

    const newBrowser = await browser({
      headless: true,
      timeout: 1200000
    });
    const page = await newBrowser.newPage();
    await page.goto(`https://www.zhihu.com/question/${qid}`);
    page.on('response', async function (response) {
      const url = response.url()
      const request = response.request()
      if (request.resourceType() === 'image') {
        if (!url.includes('_hd')) return
        if (caches.has(url)) return
        const cacheUrl = await redis.get(url)
        if (!cacheUrl) {
          const name = basename(url)
          let buffer = await response.buffer()
          var bufferStream = new stream.PassThrough();
          bufferStream.end(buffer)
          bufferStream.pipe(createWriteStream(`${fulldir}/${name}`))
          redis.set(url, 1, month)
          console.log(url, `${fulldir}/${name}`)
        }
      }

    })
    await autoScroll(page);
    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
}

let caches
// 读取知乎id
const lr = require('readline').createInterface({
  input: createReadStream(`${__dirname}/todo/zhihu.txt`)
})
lr.on('line', async function (l) {
  if (!caches) {
    console.time('redis_all')
    caches = new Set(await redis.keys('*'))
    console.timeEnd('redis_all')
  }
  await read(l)
})

