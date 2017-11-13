const puppeteer = require('puppeteer')
const { extname } = require('path')
const { promisify } = require('util')
const mkdirp = promisify(require('mkdirp'))

const { autoScroll } = require('./core')
const config = require('./config')
const download = require('./helpers/download')
const { isDownloadImageByResponse } = require('./helpers/is')

  ;
(async () => {
  const fs = require('fs')
  const word = '卡通'
  let count = 0 
  const fullDir = `${config.dir}/20171103/${word}`
  await mkdirp(fullDir)
  
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  page.on('response', async(data) => {
    if (isDownloadImageByResponse(data)) {
      count++  
      const extname = data.headers['content-type'].split('/').pop()
      var fullpath = `${fullDir}/${count}.${extname}`
      var result = await download(data.url, fullpath, {count: count})
      console.log(`${result.count} : ${result.src}`)
    }
  })
  await page.goto(`https://pic.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=${word}&oq=javascript&rsp=-1`)
  await autoScroll(page)
  count = 0
  await browser.close()
})()


