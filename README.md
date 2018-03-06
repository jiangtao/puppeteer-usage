# puppeteer-usage

基于puppeteer的一些实例应用，本教程仅用来做技术交流使用，请勿用于商业行为。

### 爬虫

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

## 自动化测试

以之前接手的公司的一个项目[贷款超市](http://i.houmifin.com/loan/index)为例，模拟用户行为。

### 测试思考

原则：首先保证页面正常显示 > 干掉所有的运行时的异常 > 干掉前端层面过慢的因素

1. 测试所有的页面，是否能正常显示，以下指标

- 界面是否出现
- 白屏时间
- ui显示是否正常，评判标准是什么？
- 兼容性测试如何测 ?

2. 功能测试

- 哪些功能是需要通过编写测试用例测试的
- 接口

### 问题

1. 如何防止测试数据污染业务统计数据

- 可以通过注入参数的形式，在业务统计模块加一层判定即可解决
- 也可以在页面中[注入全局变量](https://github.com/GoogleChrome/puppeteer/blob/master/examples/detect-sniff.js)解决

2. 如何和ui稿对比，确保一致性

目前想到的方法：通过截屏，人肉对比

### 测试实现

1. 以不同机型，先访问页面，并且截屏，确保可用性

截屏为了存储大小，截屏为jpg，质量为0.6，全页面截屏。我们这里通过人肉去对比，有更好的方法在更新。

2. 模拟交互行为，确定核心功能可用性

- 首页入口是否可点击，与 1中的功能其实是相似的
- 确定搜索功能，申请功能可用

### 集成成系统

- [ ] 集成服务
