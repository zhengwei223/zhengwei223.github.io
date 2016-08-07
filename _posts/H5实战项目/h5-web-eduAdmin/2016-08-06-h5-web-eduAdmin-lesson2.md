---
layout: post
title: 完成首页页头区
category: h5-web-eduAdmin
tags: Git H5 项目 实战 HBuilder
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 H5 项目 实战 HBuilder
description:
importance: 2
---

# 课程目标

利用上一章的项目模板新建HBuilder项目,并完成**蓝桥教学教务管理系统**的页头区。

# 下载-安装HBuilder-初始化项目
访问下面网站下载最新的 HBuilder 安装文件
[http://www.dcloud.io/](http://www.dcloud.io/)

下载相应操作系统的安装文件并安装。


### 新建项目
- 命名为eduAdmin
- 将bb_template中的内容全部拷入eduAdmin项目

# 页面基本结构
企业网站的主页一般分为三个部分：

- 页头区
  - logo
  - 带下拉菜单的主导航、二级和实用链接导航
  - 登录注册选项
- 主内容取
  - 布局复杂，可分为多拦
- 页脚区
  - 包含多拦链接和信息
  
找到首页中的这个注释和段落：

``` html
<!-- Add your site or application content here -->
<p>Hello world! This is HTML5 Boilerplate.</p>
``` 

替换为以下内容：

``` html
<header role="bannner">
	<nav role="navigation"></nav>
</header>
        
<main role="main">
  	<h1>主页头</h1>
	<p>本页的主要内容</p>
</main>

<footer role="contentinfo">
	<p><small>版权所有&copy;蓝桥软件学院</small></p>
</footer>
```

这就是我们页面的基本结构了。

# 导航条

### 拷贝代码

我们从Bootstrap基本的导航条开始，从Bootstrap文档中拷贝导航条代码，代码位置：

  bootstrap-3.3.7/docs/examples/navbar-static-top/index.html

  将以下代码

```
<!-- Static navbar -->
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="../navbar/">Default</a></li>
            <li class="active"><a href="./">Static top <span class="sr-only">(current)</span></a></li>
            <li><a href="../navbar-fixed-top/">Fixed top</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
```

拷贝至header标签下，取代原有nav标签，并在新mav标签属性中添加`role="navigation"`

在HBuilder-浏览器运行后可显示这样的页面效果

![image](/public/img/h5/boot-nav1.png)

可以看到这并不是我们心目中的导航条，这是因为我们现在还没有链接css样式表

### 编译并链接Bootstrap样式表








