---
layout: post
title: Bootstrap起步及h5bp模板整合
category: Bootstrap入门教程
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap
description:

---

# 预计花费时间：1小时 #

本文的操作主要是下载、复制、粘贴，所以花不了多少时间，如果你的操作很娴熟的话，所花费的时间会更少。

# 本文主要任务

集成h5bp和bootstrap，搭建通用项目结构模板——目录和文件安置，并创建一个通用的页面模板——html标记结构。

# 开始之前

- 你应该对什么是bootstrap以及什么是h5bp有基本的了解

# 步骤1：下载Bootstrap

访问这个网址下载最新的 bootstrap 源文件
[http://getbootstrap.com/](http://getbootstrap.com/)

**选择下载源码**，以后要用到less。

![image](/public/img/h5/boot-download.png)

*图1.1*

解压后能看到这些文件夹和文件：

![image](/public/img/h5/boot-files.png)

- dist是编译整合后的js、css和字体
- docs是文档，但不做任何事是看不了的，看离线文档需要安装jekyll。
你也可以在网上找找bootstrap的离线文档，英文不好的可以访问[Bootstrap中文网](http://v3.bootcss.com/)。
- fonts是字体文件，dist里面也有一份
- js目录下是现在bootstrap支持的12个插件，可以分别引入，也可以直接引入dist目录下js目录下的整合好的js文件
- less目录下是编译前的样式定义，编译后的css在dist目录下的css目录中——bootstrap.min.css

# 步骤2：下载 HTML5 Boilerplate

使用下面的git命令来获得h5bp：

```
git clone https://github.com/h5bp/html5-boilerplate.git
```

不会使git的看[这里](/常用工具使用教程/Git)

如果不想用git，可以直接访问网址下载zip文件，解压后和clone得到的内容一样。

clone好之后，能看到这样的目录结构：

![image](/public/img/h5/h5bp-files.png)

dist下就是本文所需要的东西。


# 步骤3：搭建项目的目录结构

## 3.1新建目录并拷贝h5bp>dist下的内容 ##

新建文件夹bb_template（这个项目模板将作为我们通用的项目模板，因此单独命名），将h5bp>dist目录下的内容全部拷入；

## 3.2删除不需要的内容

- css 文件夹内的css文件但保留此目录（因为我们会使用 bootstrap 的样式）
- CHANGELOG.md
- CONTRIBUTING.md
- doc 文件夹以及其中的内容

## 3.3修改部分文件

- humans.txt，里面可以写上整个网站工作团队，对帮助过网站建设的人们致以谢意，以及使用到的开发工具等等。
- LICENSE.md，添加上 Bootstrap 和其它框架的许可信息。
- README.md，提供一个基本的项目说明。
- 更新 favicon 和 touch icons，用自己的图标替换掉 H5BP 默认的图标，文件名是`apple-touch-icon-precomposed.png、favicon.ico`

## 3.4整合 Bootstrap

- 打开 bootstrap 文件夹找到字体 fonts 文件夹，复制到 bb_template 文件夹里面，该 fonts 文件夹里面是 Bootstrap 自带的 Glyphicon 图标字体文件，这样字体文件就算搞定了。
- 然后是 javaScript 文件，Bootstrap 的插件是依赖于 jQuery 的，可以看到 Boilerplate 已经为我们准备好了（vendor 文件夹中），另外一个 Modernizr 脚本，其中包含了 HTML5 shiv，可以让 IE8 兼容，不过它更大的作用是对浏览器进行了特性检测。
- plugin.js 文件用于放置插件。编辑器打开 bootstrap/dist/js/bootstrap.min.js ，全选所有代码复制粘贴到 plugins.js 末尾。
- 复制bootstrap/dist/css/bootstrap.min.css到css文件夹下，并更名为main.css
- less文件，复制整个 bootstrap/less 文件夹到bb_template中

## 3.5盘点

至此，整合告一段落，目录清单如图

![image](/public/img/h5/bb-files.png)

让我们来看看，我们得到了什么：
- fonts来自bootstrap，是字体
- img下是空的，未来用于放置图片
- js目录下的plugin.js的主体部分是bootstrap.min.js（12个插件的整合压缩）
- less目录全部来自bootstrap，用于编译产生css，暂时用不上
- css目录下的main.css，其实就是bootstrap.min.css，也是less下所有文件编译后的产出

# 步骤4：构造HTML模板

在bb_template目录下编辑index.html（用编辑器打开），它就是我们作为模板的页面。

## 4.1理解现有内容：

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

  - 用于指定站点图标和触摸屏图标，站点图标默认使用站点根目录下的favicon.ico文件
  
  - 接下来是两个样式表的链接，分别指向nomalize.css和main.css:
  
  ```
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">
  ```
  - 再下面是加载Modernizr脚本的script标签：
  
  `<script src="js/vendor/modernizr-2.8.3.min.js"></script>`

- 进入body
  - 首先是IE条件注释，如果浏览器版本小于IE8，页面上将呈现段落中的提示信息，提示用户对浏览器进行升级。
  
  ```
  <!--[if lt IE 8]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a 
      href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->
  ```
  - 紧接着是一段p文本，根据注释应该能发现，这部分是以后要替换的网页主体部分，比如`<div class="container"></div>`
  
  - 再下来，是引入jQuery脚本、plugins.js(已经包含bootstrap.min.js)、main.js;其中main.js是以后我们自定义的脚本
  
  ```
  <script src="https://code.jquery.com/jquery-1.12.2.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.12.2.min.js"><\/script>')</script>
  <script src="js/plugins.js"></script>
  <script src="js/main.js"></script>
  ```
  - 最后一段脚本是谷歌的网站分析脚本
  
## 4.2改造index

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

# 总结

通过h5bp我们获得一个基本的项目结构，并获得了不少有用的资源，如jQuery和modernizr;

还获得了一个h5页面的标记结构。

通过Bootstrap我们就获得了更多的内容，它的css、js、less，还有字体。

整合起来之后，我们删除了重复的css——normalize.css；新增了respond.min.js；然后根据中国人的习惯修改了浏览器版本过低提示信息并删掉了谷歌的网站分析代码。


本章产出物作为通用的项目模板，单独归档存放在了远程仓库，大家可以clone这个仓库

`git clone https://git.coding.net/lanqiao/bb_template.git`


