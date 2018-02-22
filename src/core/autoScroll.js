/**
 * @param {*} page puppeteer page对象
 * @param {*} lastScroll 初试滚动Y轴的位置
 */
module.exports = async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      try {
        let lastScroll = 0;
        let retry = 0;
        const maxScroll = Number.MAX_SAFE_INTEGER;
        const interval = setInterval(() => {
          window.scrollBy(0, 100);
          const scrollTop = document.documentElement.scrollTop;
          console.log(retry, lastScroll === scrollTop);
          if (scrollTop === maxScroll || (retry > 10 && lastScroll === scrollTop)) {
            clearInterval(interval);
            resolve();
          } else {
            retry++;
            lastScroll = scrollTop;
          }
        }, 100);
      } catch (err) {
        reject(err.toString());
      }
    });
  });
};
