function app(name, port) {
  const Koa = require("koa");
  const app = new Koa();
  var router = require("./Router/img");
  app.use(async function(ctx, next) {
    try {
      await next();
    } catch (e) {
      if (e.message.includes("puppeteer")) {
        console.log("puppeteer normal");
      }
    }
  });
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(port, () =>
    console.log(`${name} is running on http://localhost:${port} `)
  );
}
app(process.env.SERVER_NAME || "daemon", process.env.PORT || 9999);

module.exports = app;
