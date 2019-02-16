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
  const url = ctx.query.url;
  console.log(`starting read ${url} images`);
  const page = await newBrowser.newPage();
  const imgs = new Set();
  const max = ctx.query.max || 50;
  await page.goto(url);
  page.on("request", async function(request) {
    const url = request.url();
    if (request.resourceType() === "image") {
      if (!url.includes("_hd")) return;
      if (imgs.size < max) {
        console.log(imgs.size, url);
        imgs.add(url);
      } else if (imgs.size == max) {
        ctx.body = [...imgs];
        await newBrowser.close();
      }
    }
  });
  await autoScroll(page);

  await newBrowser.close();
  ctx.body = [...imgs];
});
module.exports = router;
