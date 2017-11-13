const puppeteer = require('puppeteer')
const moment = require('moment')
const { extname } = require('path')
const { promisify } = require('util')
const mkdirp = promisify(require('mkdirp'))
const { autoScroll } = require('./core')
const config = require('./config')
const download = require('./helpers/download')
const { isDownloadImageByResponse } = require('./helpers/is')

export async function autoPageCrawler({ url,word,close = true }) {
  const fs = require('fs')
  let count = 0
  const nowDay = moment().format('YYYY-MM-DD')
  const fullDir = `${config.dir}/nowDay/${word}`
  await mkdirp(fullDir)

  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  page.on('response',async (data) => {
    if (isDownloadImageByResponse(data)) {
      count++
      const extname = data.headers['content-type'].split('/').pop()
      const fullpath = `${fullDir}/${count}.${extname}`
      const result = await download(data.url,fullpath,{ count: count })
    }
  })
  await page.goto(url)
  await autoScroll(page)
  count = 0
  if (close) {
    await browser.close()
  }
}

