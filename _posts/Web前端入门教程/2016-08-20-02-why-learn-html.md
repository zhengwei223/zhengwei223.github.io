---
layout: post
title: 开门见山说前端
category: Web前端入门教程
tags: Web前端
author: 曹小虎
keywords: lanqiao 蓝桥 全栈 教程 Web前端
description: 
---

# 引言  
 
 ![为什么学习HTML](/public/img/html/start-to-learn-web.jpg) 
 
> 内容提要

- 了解Web前端主流技术
- 了解学好前端技术的益处
- 初步了解谷歌浏览器开发者工具用法

&emsp;&emsp;如今，因特网(Internet)早已经风靡世界，你可以在网上看新闻、购物、办公、娱乐、找女朋友......越来越多的企业把主营业务搬到互联网上，现在除了工农建中四大国有银行为代表的网上银行，还有几个企业没有自己的官方网站？在个人生活领域，你知道每天有多少人在新浪网写博客展示生活吗？你知道在你看这篇文章的时候全世界有多少人同时用搜索引擎查阅资料吗？你知道在你中午一顿饭的时间里，又有多少人在著名的在线问答网站参与问答、学习知识交流经验吗？不知道，你肯定回答不出一个准确的数字！但是我想提醒你，这肯定是个你无论如何也想不到的天文数字！我们相遇在一个全新的时代，这便是互联网连接一切的时代，它极其深刻地影响到了包括所有中国人在内的的全部人类的生活习惯、并且改变了他们的思维方式！

&emsp;&emsp;互联网上所有网站都可以用同样的客户端--Web浏览器来访问，不管是谷歌公司的Chrome，还是开源社区的Firefox，或者是微软公司的IE浏览器，只要输入一样的网站地址，你都会看到内容和外观完全一样的网页内容。这是因为，虽然出自不同厂家之手，不同名目的浏览器们都能够遵照同样的标准、按照同样的办法来解析你的电脑从互联网上下载的一份内容。这些标准的由W3C（the World Wide Web Consortium）组织统一修订和发布，其中最重要的三个Web前端技术标准就是**HTML标准**、**CSS标准**和**JavaScript**标准。

# 1.Web前端技术概览

&emsp;&emsp;HTML、CSS和JavaScript，这三种Web前端技术标准也就是我们“Web前端技术入门”课程要学习的主要内容。

 ![web-frontend-content](/public/img/html/html_css_js.jpg) 

&emsp;&emsp;想要学好Web前端技术，最便捷的办法是，先浏览器打开一个网站，借助浏览器提供的开发者工具,查看和分析别人的网站是怎么做的。

&emsp;&emsp;我假设你面前有一台能联网的电脑（笔记本，台式机都可以），电脑上已经安装好了最新版本的Chrome浏览器。什么！你都没有？别逗了，伙计，你是怎么看到我写的这些东西的？你肯定知道怎么连接网络，也知道怎么在电脑上安装Chrome浏览器！

&emsp;&emsp;我们以蓝桥官网为例，用Chrome浏览器的开发者工具（Developer Tool）分别看一看HTML、CSS和JavaScript的是什么样子，同时开始对这三种Web前端技术进行感性认知。

## 1.1 网站第一印象HTML

### 打开[蓝桥官网](http://www.lanqiao.org/)

&emsp;&emsp;待网页加载完毕，按下键盘上的**F12**按钮，可以在浏览器窗口外边看到弹出一个开发者工具窗口：

 ![web-frontend-content](/public/img/html/chrome-dev-tools-01.PNG) 
 

---

### 打开网络工具

&emsp;&emsp;上面的例子里，浏览器会按照网页地址访问到蓝桥官网的首页，接着它会从服务器上加载网站内容到你的电脑上，我们一起来看看浏览器都下载了那些内容。请按照指示打开开发者工具中的NetWork面板，这里实时显示了浏览器加载网站内容的动态过程。

 ![web-frontend-content](/public/img/html/dev-tool-network-tab.png) 

---



### 查看第一条下载记录

&emsp;&emsp;浏览器第一时间把网站首页最重要的内容下载到本地，浏览器告诉我们它的类型是document：

 ![web-frontend-content](/public/img/html/network-panel-01.png) 


---

### HTML代码初体验

&emsp;&emsp;选中这一条下载记录，查看它的完整内容：

 ![web-frontend-content](/public/img/html/document-content.png) 

&emsp;&emsp;可以发现，浏览器称为document类型的网站内容里面，有许多"\<"开头、"\>"结尾、成对出现的各种名字的标签。

&emsp;&emsp;其中名字为html的标签，以\<html\>开始，以\</html\>结尾，把其它所有的标签都包括进去了。因此，这样的文档我们又称之为**html文档**，它的层次结构非常清晰明确：

    <html>
    <head><!--此处省略一万个标签--></head>
    <body><!--此处省略两万个标签--></body>
    </html>

&emsp;&emsp;html是Hyper Text Markup Language的缩写，就是超文本标记语言的意思。


## 1.2 查看网页里的CSS

&emsp;&emsp;在浏览器Network面板上，第二条下载记录的名称是**style.css**,类型是**stylesheet**（中文名：样式表）。

 ![web-frontend-content](/public/img/html/style-css-download.png) 

&emsp;&emsp;鼠标选中第二条下载记录，面板右半边会显示出style.css文件的完整内容（你可能需要拉动窗口上的滚动条才可以看到）：

 ![web-frontend-content](/public/img/html/style-css-demo.png) 

&emsp;&emsp;选取css文件里的部分内容，我们可以看到css文件的一个小片段。请注意，到目前为止，你仍然不需要考虑这段代码的任何实际含义，这些内容会在以后的课程里面讲：

    body{
    	line-height: 1;
    	background: #fff;
    	overflow-x: hidden;
    }



## 1.3 没有CSS的网页

&emsp;&emsp;想要知道没有CSS会怎样，我们可以先尝试删除现有网页内容中的CSS。

### 删除样式表

&emsp;&emsp;为了更直接的说明问题，我们一起看一看没有CSS之后的网页是什么样子的。

 ![web-frontend-content](/public/img/html/select-css-el.png) 

&emsp;&emsp;定位到鼠标两个css元素后，你可以在鼠标右键菜单中删除文件名是style.css和index.css的stylesheet：

 ![web-frontend-content](/public/img/html/delete-css-el.png) 


### 效果

 ![web-frontend-content](/public/img/html/all-css-deleted.png)

&emsp;&emsp;网页上的背景颜色没有了，字体变丑了，还有就是布局也弄乱了......

&emsp;&emsp;重新刷新网页，浏览器会重新加载刚才被删除掉的样式表，于是：背景颜色正常了，字体恢复了，布局也齐整了......这就是CSS的作用，它就像网页的美容师，它定义了网页的外观样式，比如颜色、字体、布局......有了它网页更漂亮，没了他，虽然内容还在，可是很丑......



## 1.4 Javascript，让网站交互起来

&emsp;&emsp;JavaScript是一种可以添加到网页里面增强网页交互性的的编程语言。

&emsp;&emsp;蓝桥官网首页的全屏滚动的动态交互特效（当你向下滚动鼠标滚轮的时候，网站页面会出现全屏向下翻页的效果），就是通过JavaScript编程语言实现的。

&emsp;&emsp;我们在浏览器Network面板上，打开Elements面板，向下拖动滚动条，可以看到，增加交互特效的一段代码：

 ![web-frontend-content](/public/img/html/js-code-in-page.png)

&emsp;&emsp;这段Javascript代码在官网首页html文档加载完成后开始执行，为网站首页加入了全屏滚动的动态特效。这个动态效果**只能**通过JavaScript编程语言实现。

# 2. 学好Web前端的好处

&emsp;&emsp;即便你不打算从事网页设计的职业，我这里仍然有好多不错的理由来打动你跟我一起学习Web前端开发技术。更重要的是，本教程也会给每一位有志于从事网页设计的同学们提供一个最短时间内掌握职业技能的便捷途径。

&emsp;&emsp;下面是几个足够打动人心的理由：
  
## 2.1 你可以更好利用浏览器

&emsp;&emsp;今天越来越多的个人生意主和企业白领在网上完成他们的工作,他们在互联网上通过浏览器收发邮件、管理日程。也有很多大型跨国企业的雇员在企业内网上借助浏览器监控和管理项目进展、为分布全球的项目团队成员提供有效的沟通交流手段。

## 2.2 你可以自己动手做网站

&emsp;&emsp;如果你需要经常对自己的个人或者企业网站进行微小改动，那么你真的应该立即开始学习HTML。因为你只需要学习一些简单的HTML网页技术支持，就可以省去雇佣一个专职网页设计师的昂贵费用。无论你是正在经营一个个人小微企业，还是作为基层雇员身在大型跨国公司，类似修改一个Word文档网页这样的小事，都只需要一点基本的的HTML知识就可以轻松搞定！

## 2.3 你可以摆脱开发工具的束缚

&emsp;&emsp;市面上有很多可视化的网页设计工具，比如Dreamweaver，它们都提供了强大的功能封装和适合初学者学习网页设计的傻瓜教程。这些工具都会按照各自开发团队设计的规则模板生成最终HTML源代码。很难一概而论的讲，这些工具内置的代码生成规则究竟是使问题更简单，还是让问题更复杂，过度依赖工具将会导致你忘记你正在进行的工作的本质内容；选择绕过工具直接编写HTML代码，你才会真正直奔主题地掌控你的网页内容，而且你还会发现这个过程比你想象的更愉悦、更轻松。

## 2.4 你可以动手美化私人博客

&emsp;&emsp;所有的博客在线编辑工具最终都会把你想要的效果转换成对应的HTML代码，只需要一行代码你就可以在自己的博客中插入电影视频，只需要简单的几行代码你就可以绘制自定义的页面布局，同样制造出动画效果。当然，随着时间的迁移，还有个人技能的提升，你还可以用HTML代码干很多现成的博客编辑工具不能做到的事情。

## 2.5 你可以短时间变身前端达人

&emsp;&emsp;学习HTML还会让你的日常生活更新潮。如果你的网店能够借助精心编排的HTML网页第一时间吸引顾客眼球，你就有很大机会吸引顾客进店浏览并且选购下单，你的生意会越来越红火。你也可以用HTML代码设计出更漂亮的邮件格式，设计婚礼请帖、发布企业宣传文案、传送个人音乐相册.....
 
&emsp;&emsp;总之，学习HTML一定会让你的生活因互联网而如鱼得水。你会成为亲朋好友眼中的能手和达人，你将因此得到大家的羡慕、赞赏并且赢得更多扬名立万的机会。 

 
 ![HTML Lover](/public/img/html/i_love_html.jpg) 

# 3. 习题

## 3.1  了解W3C组织

### 你眼中的W3C

&emsp;&emsp;关于W3C组织的历史的更多资料，你可以查看维基百科的[万维网联盟](https://zh.wikipedia.org/wiki/%E4%B8%87%E7%BB%B4%E7%BD%91%E8%81%94%E7%9B%9F)词条，请你通过百科页面下放的外部连接访问到W3C组织官网。

&emsp;&emsp;请你结合网页资料，谈一谈你对这个组织的印象深刻的一两点个人理解。


---

### 微软无视W3C标准

&emsp;&emsp;W3C组织只是发布Web前端标准，但是不负责实现。在线问答网站知乎上有一个[微软无视W3C组织的HTML标准有关的讨论](https://www.zhihu.com/question/21296251)，你要自己阅读。阅读之后请你思考以下问题：

 1. 为什么微软会选择无视W3C发布的Web前端标准？
 2. 你认为出于什么原因，这家企业后来又选择向W3C标准靠拢？这样做对它有什么好处？
 3. 有没有其他企业和微软一样，对W3C标准持这种前后不一的态度？他们各自都是处于什么样的打算？


## 3.2 开发者工具

 ![attack](/public/img/html/chongfeng.JPEG ){:height="200px" width="200px"}  PK  ![HTML Lover](/public/img/html/fangyu.JPEG){:height="200px" width="200px"}.



&emsp;&emsp;还记得当年第二次鸦片战争的时候，处于冷兵器时代的大清朝，十几万精锐骑兵惨败在几千洋枪洋炮的英法远征军手下的[惨痛教训](http://mt.sohu.com/20150309/n409536650.shtml)吗？这种情况下，武器的差距，就意味着生死成败！

&emsp;&emsp;今天，在你决定开始自己的前端开发之路的第一天，我们想非常郑重地提醒你：倘若你有计划最短时间内达到专业水准，你就一定要选择好、运用好你手中的武器：前端开发者工具。一事成则事事成，前端开发者工具将是你的专业利器！

### Chrome阵营开发者工具

&emsp;&emsp;我们今天用Google Chrome浏览器打开蓝桥官网首页，同时对它的开发者工具有了简单的动手操作经验，感觉很不错吧！哈哈！我在这里重提这个开发者工具，绝对不是说要你一下子就完全掌握它的使用技巧！

&emsp;&emsp;GitHub上有一个[Chrome开发工具的翻译社群](https://github.com/CN-Chrome-DevTools/CN-Chrome-DevTools)，他们干的事儿，就是把英文版的Chrome浏览器开发者工具使用说明翻译成中文。建议你去看一看，把文件download下来，供自己随时查阅。如果你有学有余力，也可以加入他们；毕竟加入开源社区、进行跨地区团队协作，在网上跟更多的人才交流学习，这一定可以对你的职业发展产生强劲助推！赶紧去吧，它们的内容已经连续三个月没有更新了！

---

### FireFox阵营开发者工具

&emsp;&emsp;除了Chrome浏览器和它自带的开发工具，著名的互联网前端开发社区Mozilla提供了他们自己的[火狐浏览器开发者版本](https://developer.mozilla.org/zh-CN/docs/Tools)，这个网页也有很详细的firefox开发者工具教程：

 ![attack](/public/img/html/ff4developer.png)

&emsp;&emsp;请你下载安装，根据使用说明逐条列举、展示这个开发者版本浏览器有哪些酷炫的特性。

&emsp;&emsp;请你用火狐开发者浏览器打开蓝桥官网，查看网站内容。






























