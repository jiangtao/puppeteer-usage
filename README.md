# puppeteer-usage

基于puppeteer的一些实例应用。

## 爬虫

针对[百度图片](https://pic.baidu.com/)搜索的爬虫，此类页面特点：

- 滚动加载，加载图片
- 请求接口，接口会变
- 页面结构会变

为什么使用`puppeteer`?

因为api简洁，对于其他的，前端更易上手。
使用puppeteer的好处，可以无视dom变化,无视接口变化。因为 puppeteer，可以操作浏览器滚动加载等行为，同时可以监听请求，拿到header信息等。具体[代码可以查看](https://github.com/ijs/puppeteer-usage/blob/master/src/samples/scrawler/pic.baidu.com.js#L20-L27)

可执行下列命令运行实例：

```bash
git clone https://github.com/ijs/puppeteer-usage.git
cd puppeteer-usage
yarn install
node src/samples/scrawler/pic.baidu.com.js 卡通
```

如果需要爬取其他类似页面（如google， weibo, flickr, huaban）等，请自行修改代码中的url地址即可



