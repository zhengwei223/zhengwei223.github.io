---
layout: post
title: 使用bootstrap和h5bp搭建项目基本结构
category: h5-web-eduAdmin
tags: Git H5 项目 实战
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 H5 项目 实战
description:
importance: 2
---

# 课程目标

集成h5bp和bootstrap。

h5bp:The web’s most popular front-end template.

Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.

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

太麻烦，你也可以在网上找找bootstrap的离线文档。

- fonts是字体文件，dist里面也有一份
- grunt用于构建前端项目，可以压缩、合并等
- js目录下是现在bootstrap支持的12个插件，可以分别引入，也可以直接引入dist目录下js目录下的整合好的js文件
- less目录下是编译前的样式定义，编译后的css在dist目录下的css目录中，bootstrap.min.css


# 下载 HTML5 Boilerplate

```
git clone https://github.com/h5bp/html5-boilerplate.git
```

不会使git的看[这里](/常用工具使用教程/Git-lesson1-introduction)

clone好之后，能看到这样的目录结构：

![image](/public/img/h5/h5bp-files.png)

dist下就是我们所需要的东西。

# 新建项目模板
第一步：
新建文件夹bb_template，将h5bp>dist目录下的内容全部拷入；

第二步：
删除不需要的内容

- css 文件夹（因为我们会使用 bootstrap 的样式）
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
- 最后是样式文件，复制整个 bootstrap/less 文件夹到bb_template中

至此，整合告一段落，如图

![image](/public/img/h5/bb-files.png)

fonts来自bootstrap

img下是空的

js下的plugin.js的主体部分是bootstrap.min.js

less全部来自bootstrap，用于编译产生css

# 修改首页








