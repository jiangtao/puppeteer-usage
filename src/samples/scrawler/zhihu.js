
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const stream = require('stream')
const { writeFile, createReadStream, createWriteStream, existsSync } = require('fs');
const { autoScroll, browser } = require('../../core');
const { isDownloadImageByResponse } = require('../../core/is');
const { downloadDir, logger } = require('../../config');
const { time } = require('../../utils');
const { basename } = require('path')
const set = new Set();

async function read(qid) {
    try {
        const dir = `${downloadDir}/zhihu/${qid}`
        if (!existsSync(dir)) {
            await mkdirp(dir)
        }

        const newBrowser = await browser({
            headless: true,
            timeout: 1200000
        });
        const page = await newBrowser.newPage();
        await page.goto(`https://www.zhihu.com/question/${qid}`);
        page.on('response', async function (response) {
            const url = response.url()
            const request = response.request()
            if (request.resourceType() === 'image' && !set.has(url)) {
                if (url.includes('_hd')) {
                    const name = basename(url)
                    let buffer = await response.buffer()
                    var bufferStream = new stream.PassThrough();

                    console.log(url, `${dir}/${name}`)
                    bufferStream.end(buffer)
                    bufferStream.pipe(createWriteStream(`${dir}/${name}`))
                }
            }

        })
        await autoScroll(page);
        await newBrowser.close();
    } catch (e) {
        logger.error(e);
    }
}

// 读取知乎id
const lr = require('readline').createInterface({
    input: createReadStream(`${__dirname}/todo/zhihu.txt`)
})
lr.on('line', async function (l) {
    await read(l)
})

