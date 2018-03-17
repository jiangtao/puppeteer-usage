### puppeteer是干什么的？

 它是个浏览器，浏览能干的它都支持， 对应的API有木有？


### QA

1. 整理下实现这么一个功能 大概的一个思路是什么呢。从何处入手还有关键点

- 图片爬虫

    1. 爬的目标网站是什么类型的？

      - 自动滚动类型的
      - 获取weibo资讯类(头条)的信息

         对网站进行分析
          1. 是否要登录
          2. 访问的信息页面是什么样子的  （前端界面，API获取）
          3. 采用什么技术 （puppeteer， request）

      case1:

      https://weibo.com/?category=1760

      1. title page.$('.list_des .list_title_b .S_txt1')


- 验证线上运行是否正常


2. 按关注的特定用户来爬 比如说花瓣 我只想扒我关注的那些用户的收藏的图 怎么弄

  1. 首先让 puppeteer 自动登录
  2. 登录成功后，http://huaban.com/alf5iaibzg/following/
  3. 每一个 page.$('.person-item')  links
  4. 找到每个户口采集的主页 http://huaban.com/v9ux3qzokz8/pins/
  5. 之后就是滚动爬图的逻辑


3. 自动化功能测试的一种方案 e2e testing
