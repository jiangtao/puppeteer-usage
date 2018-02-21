const puppeteer = require('puppeteer')
module.exports = async function (config) {
  return await puppeteer.launch(Object.assign({},config,{
    headless: false,
    executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
  }));
}
