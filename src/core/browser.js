const puppeteer = require("puppeteer");

module.exports = function browser(config = {}) {
  let opt = {
    headless: !process.env.PUPPETEER_LINUX || false,
    timeout: 30000,
    args: process.env.PUPPETEER_LINUX
      ? [
          // Required for Docker version of Puppeteer
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          "--disable-dev-shm-usage"
        ]
      : []
  };
  if (!process.env.PUPPETEER_LINUX) {
    opt.executablePath =
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
  return puppeteer.launch(Object.assign(opt, config));
};
