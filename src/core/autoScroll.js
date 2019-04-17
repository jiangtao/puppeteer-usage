/**
 * @param {*} page puppeteer Page对象
 * @param {*} delay 滚动到底部后 持续时间 delay ms 结束
 * @param {*} percent 每次滚动的位置，puppeteer浏览器的 document.documentElement.scrollHeight 的比例
 * @param {*} duration 每次滚动的间隔
 */
module.exports = function autoScroll(
  page,
  delay = 500,
  percent = 0.3,
  duration = 16
) {
  return page.evaluate(new Function(`
  var lastDate;
  var duration = ${duration};
  return new Promise((resolve, reject) => {
    try {
      let lastScroll = 0;
      let retry = 0;
      const MAX_SCROLL = Number.MAX_SAFE_INTEGER;
      const instance = document.documentElement.scrollHeight;
      const interval = setInterval(() => {
        window.scrollBy(0, instance * ${percent});
        const scrollTop = document.documentElement.scrollTop;
        if (
          scrollTop === MAX_SCROLL ||
          (Date.now() > lastDate + ${delay} && lastScroll === scrollTop)
        ) {
          clearInterval(interval);
          resolve();
        } else {
          lastScroll = scrollTop;
          lastDate = Date.now();
        }
      }, duration);
    } catch (err) {
      reject(err.toString());
    }
  });
  `));
};
