/**
 * @param {*} page puppeteer page对象
 * @param {*} lastScroll 初试滚动Y轴的位置
 */
module.exports = async function autoScroll(page) {
  await page.evaluate(async () => {
    var MAX_COUNT = 50
    var duration = 200
    await new Promise((resolve, reject) => {
      try {
        let lastScroll = 0;
        let retry = 0;
        const MAX_SCROLL = Number.MAX_SAFE_INTEGER;
        const interval = setInterval(() => {
          window.scrollBy(0, 500);
          const scrollTop = document.documentElement.scrollTop;
          /**
           * 1. 达到javascript最大值
           * 2. 尝试MAX_COUNT次数滚动条还不动，有两种情况：没有数据了 或 接口返回太慢了 在 MAX_COUNT * 100 ms内还没反应过来
           * 正在loading中，0 --> 101  100 * 100ms
           */
          if (scrollTop === MAX_SCROLL || (retry > MAX_COUNT && lastScroll === scrollTop)) {
            clearInterval(interval);
            resolve();
          } else {
            retry++;
            lastScroll = scrollTop;
          }
        }, duration);
      } catch (err) {
        reject(err.toString());
      }
    });
  });
};
