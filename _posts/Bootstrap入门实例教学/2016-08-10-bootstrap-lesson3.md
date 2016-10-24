---
layout: post
title: 博客-文章页的布局设计
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap
description: 为了巩固对Boots的网格布局系统的理解，本章用一个实例来进行示范。
---
>我们需要做出一个有标题、正文、文章目录的博客文章页面：

![文章页](/public/img/boots/3.1.png "文章页")

# 一 文档结构

## 1.拷贝模板

修改`title`标签的内容。

## 2.整体结构

我们先从整体上开始设计，再进行局部细节。下列所示网页结构，我们将网页分为典型的上中下，中间主体部分又被分为左右3：1比例的两列，第一列用于放文章正文，第二列用于放目录。

```html
<header>
  <h1>文章标题</h1>
  <span>2016年09月01日&nbsp;&nbsp;&nbsp;&nbsp;zhengwei</span><!-- /时间与作者信息 -->
</header><!-- /头部 -->

<main>
  <div class="container">
    <div class="row">
      <div class="col-md-9"></div><!-- /col-md-9 文章正文 -->
      <div class="col-md-3"></div><!-- /col-md-3 侧边栏 -->
    </div>
  </div>
  
</main><!-- /主体 -->

<footer>
  <span>
    Copyright &copy; 2016 蓝桥软件学院
  </span>
</footer><!-- /尾部 -->
```

需要注意的是，`header`,`main`,`footer`都是h5标准中定义的语义化标签，如果你还不了解，可以参考[网络上的教程](http://www.runoob.com/html/html5-new-element.html)。

# 二 填充内容

内容的填充并不是本章的重点，因此请移步→[article.html](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/03/article.html)去看看就好了。

可以看到正文部分由段落、标题、列表等内容组成，而侧边栏由链接的列表组成

# 三 简单优化

其实关于布局的部分，我们已经完成，不过为了更好的显示效果，我们来做点简单的优化：

## 1.标题、作者信息和版权信息居中

很简单，boots已经预定义了这样的样式类`.text-center`，我们只需给`header`和`footer`标签加上这个样式类即可。

    <header class="text-center">...
    <footer class="text-center">...

## 2.右侧链接去掉圆点符号

同样，boots考虑到了这种情况，已经预定义了样式类`.list-unstyled`，我们只需要给`ul`附加这个样式类即可：

    <ul class="list-unstyled">

其他的局部美化，不在本文范围之内。

# 四 考虑小设备

`col-md-9`和`col-md-3`仅在视口为middle及以上时才分别占9列和3列，在小视口上，这两个div将独占一行呈一列纵队，考虑到在小设备上把文章目录放在文章的下方没有意义，我们干脆在此处设定：小视口隐藏侧边栏。

给侧边栏加`hidden-sm hidden-xs`这两个样式类，就可以得到这样的效果。他们的含义分别是在小和超小设备上隐藏这个元素。

# 五 总结

* 你会发现用boots来做行列布局实在是太轻松了，只需掌握`container`,`row`和各种列(`col-*-*`)的使用
* boots定义了很多方便实用的样式类，本章我们用到了`text-center`和`list-unstyled`
* 为了做到响应式布局，不仅可以使用`col-*-*`，还可以使用boots定义好的系列[响应式工具类](http://v3.bootcss.com/css/#responsive-utilities)，本章用到了`hidden-sm hidden-xs`。