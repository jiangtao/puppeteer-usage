function app(name, port) {
  const Koa = require("koa");
  const app = new Koa();

  app.use(async ctx => {
    ctx.body = `Hello ${name}`;
  });
  app.listen(port, () => console.log(`http://localhost:${port} is running`));
}
module.exports = app;
app(process.env.SERVER_NAME || "daemon", process.env.PORT || 8888);
