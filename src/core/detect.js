// https://github.com/GoogleChrome/puppeteer/blob/master/examples/detect-sniff.js

module.exports = function detect(k) {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  Object.defineProperty(window.navigator, 'userAgent', {
    get() {
      window.navigator[k] = true;
      return userAgent;
    }
  });

  Object.defineProperty(window.navigator, 'platform', {
    get() {
      window.navigator[k] = true;
      return platform;
    }
  });
};
