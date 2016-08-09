---
layout: post
title: Bootstrap起步及h5bp模板整合
category: bootstrap
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap
description:

---

# 课程目标
集成h5bp和bootstrap，搭建通用的h5和bootstrap项目模板。

# 什么是 Bootstrap？

Bootstrap 是一个用于快速开发 Web 应用程序和网站的前端框架。Bootstrap 是基于 HTML、CSS、JAVASCRIPT 的。
### 历史
Bootstrap 是由 Twitter 的 Mark Otto 和 Jacob Thornton 开发的。Bootstrap 是 2011 年八月在 GitHub 上发布的开源产品。

### 为什么使用 Bootstrap？

- 移动设备优先：自 Bootstrap 3 起，框架包含了贯穿于整个库的移动设备优先的样式。
- 浏览器支持：所有的主流浏览器都支持 Bootstrap。

- 容易上手：只要您具备 HTML 和 CSS 的基础知识，您就可以开始学习 Bootstrap。
- 响应式设计：Bootstrap 的响应式 CSS 能够自适应于台式机、平板电脑和手机。
- 它为开发人员创建接口提供了一个简洁统一的解决方案。
- 它包含了功能强大的内置组件，易于定制。
- 它还提供了基于 Web 的定制。
- 它是开源的。

### Bootstrap 包的内容

- 基本结构：Bootstrap 提供了一个带有网格系统、链接样式、背景的基本结构。这将在 Bootstrap 基本结构 部分详细讲解。
- CSS：Bootstrap 自带以下特性：全局的 CSS 设置、定义基本的 HTML 元素样式、可扩展的 class，以及一个先进的网格系统。这将在 Bootstrap CSS 部分详细讲解。
- 组件：Bootstrap 包含了十几个可重用的组件，用于创建图像、下拉菜单、导航、警告框、弹出框等等。这将在 布局组件 部分详细讲解。
- JavaScript 插件：Bootstrap 包含了十几个自定义的 jQuery 插件。您可以直接包含所有的插件，也可以逐个包含这些插件。这将在 Bootstrap 插件 部分详细讲解。
- 定制：您可以定制 Bootstrap 的组件、LESS 变量和 jQuery 插件来得到您自己的版本。

# 下载  Bootstrap
访问下面网站下载最新的 bootstrap 源文件
[http://getbootstrap.com/](http://getbootstrap.com/)

**下载源码**，以后要用到less。

![image](/public/img/h5/boot-download.png)

解压后能看到这些文件夹和文件：

![image](/public/img/h5/boot-files.png)

- dist是编译整合后的js、css和字体
- docs是文档，但就这样的话是看不了的，看离线文档需要安装jekyll，因为
> Bootstrap's documentation, included in this repo in the root directory, is built with Jekyll and publicly hosted on GitHub Pages at http://getbootstrap.com. The docs may also be run locally.
> Running documentation locally
> If necessary, install Jekyll ………………

请参考[如何离线运行Bootstrap的文档](/references/bootstrap-doc)。

你也可以在网上找找bootstrap的离线文档，英文不好的可以访问[Bootstrap中文网](http://v3.bootcss.com/)。

- fonts是字体文件，dist里面也有一份
- grunt用于构建前端项目，可以压缩、合并等
- js目录下是现在bootstrap支持的12个插件，可以分别引入，也可以直接引入dist目录下js目录下的整合好的js文件
- less目录下是编译前的样式定义，编译后的css在dist目录下的css目录中——bootstrap.min.css

想了解less？看[这里](/css/css-whatislesscss)。

# 下载 HTML5 Boilerplate

```
git clone https://github.com/h5bp/html5-boilerplate.git
```

不会使git的看[这里](/常用工具使用教程/Git-lesson1-introduction)

clone好之后，能看到这样的目录结构：

![image](/public/img/h5/h5bp-files.png)

dist下就是我们所需要的东西。

- 理解.htaccess文件：

  这个文件的作用是保证站点性能最优。
- vendor下的modernizr

  可以让IE8支持HTML5的分区元素，还可以让我们方便滴检测特定浏览器的能力。

# 新建项目模板
第一步：
新建文件夹bb_template（这个项目模板将作为我们通用的项目模板，因此单独命名），将h5bp>dist目录下的内容全部拷入；

第二步：
删除不需要的内容

- css 文件夹内的css文件（因为我们会使用 bootstrap 的样式）
- CHANGELOG.md
- CONTRIBUTING.md
- doc 文件夹以及其中的内容



第三步：
修改部分文件

- humans.txt，里面可以写上整个网站工作团队，对帮助过网站建设的人们致以谢意，以及使用到的开发工具等等。
- LICENSE.md，添加上 Bootstrap 和其它框架的许可信息。
- README.md，提供一个基本的项目说明。
- 更新 favicon 和 touch icons，用自己的图标替换掉 H5BP 默认的图标，
apple-touch-icon-precomposed.png、
favicon.ico


第四步：
整合 Bootstrap

- 打开 bootstrap 文件夹找到字体 fonts 文件夹，复制到 bb_template 文件夹里面，该 fonts 文件夹里面是 Bootstrap 自带的 Glyphicon 图标字体文件，这样字体文件就算搞定了。
- 然后是 javaScript 文件，Bootstrap 的插件是依赖于 jQuery 的，可以看到 Boilerplate 已经为我们准备好了（vendor 文件夹中），另外一个 Modernizr 脚本，其中包含了 HTML5 shiv，可以让 IE8 兼容，不过它更大的作用是对浏览器进行了特性检测。
- plugin.js 文件用于放置插件。打开 bootstrap/dist/js/bootstrap.min.js ，全选所有代码复制粘贴到 plugins.js 末尾。
- 复制bootstrap/dist/css/bootstrap.min.css到css文件夹下，并更名为main.css
- less文件，复制整个 bootstrap/less 文件夹到bb_template中

  至此，整合告一段落，目录清单如图

![image](/public/img/h5/bb-files.png)

**小结**

  fonts来自bootstrap

  img下是空的

  js下的plugin.js的主体部分是bootstrap.min.js

  less全部来自bootstrap，用于编译产生css，暂时用不上

  css目录下的main.css，其实就是bootstrap.min.css

# 构造HTML模板

在bb_template目录下编辑index.html（用编辑器打开）。

## 了解index内容：

- h5文档类型声明
  
  `<!doctype html>`
  
- html标签包含一个no-js类，如果浏览器的JavaScript可用，Modernizr脚本会把这个类删- 除，并将其换成js类。如果这个类没有被删除，则表明JavaScript不可用。

- 接下来是几个meta标签。

  - 用于指定字符集的
  `<meta charset="utf-8">`
  
  - 告诉IE使用最新版的渲染引擎`<meta http-equiv="x-ua-compatible" content="ie=edge">`

  - 预留的页面标题和站点描述
  
  ```
  <title></title>
  <meta name="description" content="">
  ```
  - 针对移动浏览器的视口标签：
  
  ```
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```
  - 接下来是一行注释，用于指定站点图标和触摸屏图标，注释掉意味着我们默认使用站点根目录下的favicon.ico文件
  
  - 接下来是两个样式表的链接，分别指向nomalize.css和main.css:
  
  ```
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">
  ```
  - 再下面是加载Modernizr脚本的script标签：
  
  `<script src="js/vendor/modernizr-2.8.3.min.js"></script>`

- 进入body
  - 首先是IE条件注释，包含推荐用户把旧版IE升级到新版本的消息：
  
  ```
  <!--[if lt IE 8]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a 
      href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->
  ```
  - 紧接着是一段p文本，这部分是以后要替换的网页主体部分
  
  - 再下来，是引入jQuery脚本、plugins.js(已经包含bootstrap.min.js)、main.js;其中main.js是以后我们自定义的脚本
  
  ```
  <script src="https://code.jquery.com/jquery-1.12.2.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.12.2.min.js"><\/script>')</script>
  <script src="js/plugins.js"></script>
  <script src="js/main.js"></script>
  ```
  - 最后一段脚本是谷歌的网站分析脚本
  
## 初步改造index

- 设定站点标题

  `<title>蓝桥 H5 Bootstrap 模板</title>` 
  
- 删除normalize.css的链接

  因为bootstrap.min.css中已经包含了这部分的内容。
   
- 链接respond.js
  
  要支持IE8，还需要一段js代码让浏览器能够响应媒体查询，步骤如下。

  1）打开[https://github.com/scottjehl/Respond](https://github.com/scottjehl/Respond)

  2）下载ZIP

  3）解压缩，找到名为response.min.js文件，拷贝到“项目路径”/js/vendor目录下
  
  4）在index.html中链接该js文件，就在链接modernizr的后面：
  
  ```
  <script src="js/vendor/modernizr-2.8.3.min.js"></script>
  <!--[if (lt IE 9) & (!IEMobile)]>
   <script src="js/vendor/respond.min.js"></script>
  <![endif]-->
  ```

- 调整提示用户升级浏览器的信息
  
  将代码修改为：
  
  ```
  <p class="browserupgrade">您正在使用<strong>过时的</strong> 浏览器。 
  请 <a href="http://browsehappy.com/">升级</a> 以提升你的体验。</p>
  ```
- 删除“谷歌的网站分析代码”

至此，整合bootstrap和h5bp的工作基本完成。


本章产出物作为通用的项目模板，单独归档存放在了远程仓库，大家可以clone这个仓库

`git clone https://git.coding.net/lanqiao/bb_template.git`


