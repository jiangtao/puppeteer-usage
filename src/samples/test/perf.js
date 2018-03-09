// https://github.com/GoogleChrome/puppeteer/issues/309
const { browser } = require('../../core');
const { logger, traceDir } = require('../../config');
const { existsSync } = require('fs');
const mkdirp = require('mkdirp');

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

    const newBrowser = await browser({
      headless: false
    });

    /* eslint-disable */
    for (const p of pages) {
      await perf(p,newBrowser);
    }

    await newBrowser.close();
  } catch (e) {
    logger.error(e);
  }
})();

async function perf(p,newBrowser) {
  const fullDir = `${traceDir}`;
  const traceFile = p.name.split('/').join('.') + `.trace.json`
  if(!existsSync(fullDir)) {
    await mkdirp(fullDir)
  }
  const page = await newBrowser.newPage();
  // generate timeline viewer
  // await page.tracing.start({ path: `${fullDir}/${traceFile}` });
  await page.goto(p.url);
  // await page.tracing.stop();

  const paints = await page.evaluate((_) => {
    const result = {};
    performance.getEntriesByType('paint').map((entry) => {
      result[entry.name] = entry.startTime;
    });
    return result;
  });
  logger.info('')
  logger.info(p.url)
  for (const [key,val] of Object.entries(paints)) {
    logger.info(`${key}: ${Math.round(val)}ms`);
  }
}
