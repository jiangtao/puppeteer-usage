// 测试 tracing api

const devices = require('puppeteer/DeviceDescriptors');
const { time, sleep } = require('../utils');
const { browser } = require('../core');
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const { logger, dir } = require('../config');
const fs = require('fs');
const path = require('path');
const GIFEncoder = require('gif-encoder');
const jimp = require('jimp');

;(async () => {
  try {
    const fullDir = `${dir.trace}/${time.date}`;
    await mkdirp(fullDir);
    const newBrowser = await browser();
    const page = await newBrowser.newPage();
    const device = devices['iPhone 6'];
    await page.setViewport(device.viewport);
    const traceFile = `${fullDir}/baidu.json`;
    const giffile = `${fullDir}/baidu.gif`
    await page.tracing.start({path: traceFile, screenshots: true})
    await page.goto('https://m.baidu.com/', { waitUntil: 'networkidle2' });
    await page.tracing.stop();
    await newBrowser.close();
    const tracing = JSON.parse(fs.readFileSync(traceFile, 'utf8'));
    const traceScreenshots = tracing.traceEvents.filter(
      (x, index) =>
        x.cat === 'disabled-by-default-devtools.screenshot' &&
        x.name === 'Screenshot' &&
        typeof x.args !== 'undefined' &&
        typeof x.args.snapshot !== 'undefined' &&
        index % 10 == 1
    );

    const viewport = page.viewport();
    let file = fs.createWriteStream(giffile);
    const encoder = new GIFEncoder(viewport.width / 2, viewport.height / 2);
    encoder.setFrameRate(100);
    encoder.pipe(file);
    encoder.setQuality(1);
    encoder.writeHeader();
    encoder.setRepeat(0);
    
    for (let index = 0; index < traceScreenshots.length; index++) {
      let snap = traceScreenshots[index];
      let base64string = snap.args.snapshot;
      let buffer = Buffer.from(base64string, 'base64');
      let image = await jimp.read(buffer);
      await image
      .cover(
        viewport.width,
        viewport.height,
        jimp.HORIZONTAL_ALIGN_LEFT | jimp.VERTICAL_ALIGN_TOP
      )
       .resize(viewport.width / 2, viewport.height / 2);
      encoder.addFrame(image.bitmap.data);
      encoder.read();
    }
    encoder.finish()
  } catch (e) {
    console.error(e)
    logger.error(e);
    await newBrowser.close();
  }
})();

