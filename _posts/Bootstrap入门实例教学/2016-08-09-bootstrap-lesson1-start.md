---
layout: post
title: 1.Bootstrap安装与使用
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap
description: 本章介绍如何获取bootstrap，并提供一个基础的嵌入了bootstrap资源的html模板。
---

>Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。

注意其官方描述，实际上boots（Bootstrap简写）是一套html标记、预定义css样式和js插件（增强互动）组成的。**直接使用**它可以在页面布局、基础ui和样式方面很省心，适合那些不怎么精通前端的程序猿使用。

更高阶一点的用法，是自定义boots，即修改它的样式，或者创造自己的组件、插件。（组件和插件是两个不同的概念，前者是标记+css，后者是js实现各种独特交互效果）。

专业的前端攻城狮会参考boots的做法自行设计一套标记、ui、样式，并整合他们喜欢的js库以及插件。

作为不怎么精通前端的程序猿，我们先看看怎么直接利用boots来掩饰我们不懂前端的缺点。

# 0.安装（获得boots）

访问这个网址下载最新的boots：

[boots中文网](http://v3.bootcss.com/getting-started/#download)

**选择下载用于生产环境的成品或者源码都可以**，稍微想自定义一下的，最好下载源码。

![image](http://lemon.lanqiao.org:8082/teaching/img/h5/boot-download.png)

*图1.1*

解压后能看到这些文件夹和文件：

![image](http://lemon.lanqiao.org:8082/teaching/img/h5/boot-files.png)

- dist是编译整合后的js、css和字体
- 其他目录暂时不要管

# 1.下载HBuilder并创建新Web项目

HBuilder下载安装比较简单，此处不表。

安装好之后，新建一个Web项目，我的项目名为“bootstrapDemo”，托管在[bootstrapDemo](https://git.coding.net/lanqiao/bootstrapDemo.git)，你可以去下载示例源码。

# 2.初始化项目

把dist整个目录拷贝到工程根路径下，重命名为`assets`新建目录01，在01下新建index0.html并拷贝[下列内容](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/01/index0.html)覆盖index0.html中的内容，以后这个文件会作为我们的最基础的模板：

```
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

我们要稍微做些修改，11行的css链接和26行的js链接的路径需要修改：

```html
……
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
……
    <script src="../assets/js/bootstrap.min.js"></script>    
```

其余那些关联到cdn的静态资源，就原样保留吧。

<div class="alert alert-warning" role="alert">
注意，所有的js应该放到`body`的最后以加快文档的加载速度！
</div>

然后你就可以直接在hb（HBuilder简写）里面运行这个页面了，效果如下：

![Alt text](http://lemon.lanqiao.org:8082/teaching/img/boots/1.1.png)

因为index.html的`body`中只有一个一级标题，所以我们只能看到这样的效果。

# 3.目录结构

    .
    ├── 01                          # 第一课的页面及样式
    ├── 02                          
    ├── 03
    ├── assets                      # css，字体，js                   
    │   ├── css
    │   ├── fonts
    │   └── js
    │       ├── bootstrap.js
    │       ├── bootstrap.min.js
    │       └── vendor              # 第三方js库，如jquery

