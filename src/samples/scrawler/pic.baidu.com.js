
const { extname } = require('path')
const { promisify } = require('util')
const mkdirp = promisify(require('mkdirp'))

const { autoScroll,browser } = require('../../core')
const config = require('../../config')
const download = require('../../helpers/download')
const { isDownloadImageByResponse, isImageByRequest } = require('../../helpers/is')
const { time } = require('../../utils')
const word = process.argv.slice(2).pop() || '卡通'

  ;
(async () => {
  try {
    const fs = require('fs')
    let count = 0
    const fullDir = `${config.dir}/${time.date}/${word}`
    await mkdirp(fullDir)

    const newBrowser = await browser()
    const page = await newBrowser.newPage()

    page.on('requestfinished',async (data) => {
      if (isImageByRequest(data)) {
        console.log(data)
        count++
        const extname = data.response().headers['content-type'].split('/').pop()
        var fullpath = `${fullDir}/${count}.${extname}`
        var result = await download(data.url,fullpath,{ count: count })
        console.log(`${result.count} : ${result.src}`)
      }
    })
    await page.goto(`https://pic.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=${word}&oq=javascript&rsp=-1`)
    await autoScroll(page)
    count = 0
    await newBrowser.close()
  }catch(e) {
    console.log(e)
  }
})()


