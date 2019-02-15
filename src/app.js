function app(name, port) {
  const Koa = require("koa");
  const app = new Koa();
  var router = require("./Router/img");
  app.use(async function(ctx, next) {
    try {
      await next();
    } catch (e) {
      if (e.message.includes("Target closed")) {
        ctx.body = [...ctx.imgs];
      }
    }
  });
  app.use(router.routes()).use(router.allowedMethods());
  // app.use(router.routes()).use(router.allowedMethods());
  app.listen(port, () => console.log(`http://localhost:${port} is running`));
}
app(process.env.SERVER_NAME || "daemon", process.env.PORT || 9999);

module.exports = app;
