const Router = require("koa-router");
const router = new Router();
const { autoScroll, browser } = require("../core/index");
const { dir } = require("../config/index");
const redis = require("../utils/redis");
const Pics = require('../model/pics')

router.get("/img", async ctx => {
  const redis = require("../utils/redis");
  const url = ctx.query.url;
  console.log(`starting read ${url} images`);
  let caches = await redis.get(url);
  if (caches) {
    ctx.body = JSON.parse(caches);
    return;
  }

  let newBrowser = await browser({
    headless: process.env.NODE_ENV === "production",
    timeout: 1200000
  });

  const expireTime = 3 * 24 * 60 * 60;
  const page = await newBrowser.newPage();
  const imgs = new Set();
  const { delay = 500, percent = 0.3, duration = 16, force = true } = ctx.query;
  const max = Math.min(ctx.query.max || 50, 50);
  let stop = false;
  await page.goto(url);
  page.on("request", async function(request) {
    const path = request.url();
    if (request.resourceType() === "image") {
      if (!path.includes("_hd")) return;
      if (imgs.size < max) {
        console.log(imgs.size, path);
        imgs.add(path);
      } else if (imgs.size == max && !stop) {
        ctx.body = [...imgs];
        await newBrowser.close();
        redis.set(url, JSON.stringify([...imgs]), expireTime);
        stop = true;
      }
    }
  });
  await autoScroll(page, delay, percent, duration);
  await newBrowser.close();
  ctx.body = [...imgs];
  redis.set(url, JSON.stringify([...imgs]), expireTime);
});
router.get('/pics', async ctx => {
  let {number, url, pid } = ctx.query;
  number = number || 0
  number = Math.max(number, 1000)
  let results = []
  if(pid) {
    results = await Pics.find({_id: pid}).limit(number).lean()
  } else if(url) {
    results = await Pics.find({_id: pid}).limit(number).lean()
  }
  ctx.body = results
  
})
module.exports = router;
