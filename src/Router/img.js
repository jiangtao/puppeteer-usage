const Router = require("koa-router");
const router = new Router();
const { autoScroll, browser } = require("../core/index");

const sleep = function(d) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(), d * 1000)
  );
};

router.get("/api/v1/img", async (ctx, next) => {
  ctx.pp = {};
  let newBrowser = await browser({
    headless: true,
    timeout: 1200000
  });

  console.log(`starting read ${ctx.params.url} images`);
  const page = await newBrowser.newPage();
  const imgs = new Set();
  const max = ctx.params.max || 50;
  await page.goto(`https://www.zhihu.com/question/27648526`);
  page.on("request", async function(request) {
    const url = request.url();
    if (request.resourceType() === "image") {
      if (!url.includes("_hd")) return;
      if (imgs.size < max) {
        imgs.add(url);
        console.log(imgs.size, url);
      } else if (imgs.size === max) {
        ctx.imgs = imgs;
        page.close();
      }
    }
  });
  await autoScroll(page);
  await newBrowser.close();
});
module.exports = router;
