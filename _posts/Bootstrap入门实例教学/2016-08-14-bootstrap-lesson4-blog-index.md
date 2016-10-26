---
layout: post
title: 4.博客站点首页
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap 博客站点首页
description: 纸上得来终觉浅。本章将带领大家完成一个酷炫的博客站点首页设计。在实践过程中你将学到关于基础样式、组件和自定义boots的综合知识和实践能力。进而可以设计自己的个性化博客首页。
---
>纸上得来终觉浅。本章将带领大家完成一个酷炫的博客站点首页设计。在实践过程中你将学到关于基础样式、组件和自定义boots的综合知识和实践能力。进而可以设计自己的个性化博客首页。

# 一 设计目标与网格 #

这一章的设计目标是一个博客站点的首页，效果和讲解顺序如图：

![总体效果](/public/img/boots/4.12.png)

对应的主体页面标记如下：

    <body>
      <!-- 导航条  -->
      <nav class="navbar navbar-default navbar-fixed-top">
      </nav><!-- /导航条 -->

      <header class="home-header">
      </header><!-- /home-header -->

      <main>
        <div class="container">
          <div class="row">
            <!-- Post Container -->
            <div class="col-lg-8 col-lg-offset-1 col-md-8 col-md-offset-1 post-container">
            </div><!-- /post-container -->

            <!-- Sidebar Container -->
            <div class="
            col-lg-3 
            col-md-3 
            sidebar-container">
              <!-- Featured Tags -->
              <section class="tags-container">
              </section><!-- /tags-container -->

              <!-- Short About -->
              <section class="hidden-sm hidden-xs short-about-container">
              </section><!-- /short-about-container -->

              <!-- Friends Blog -->
              <section class="friends-container">
              </section><!-- friends-container -->
            </div><!-- /sidebar-container -->
          </div><!--/row-->
        </div>
      </main><!-- main -->
      <footer class="home-footer">
        <div class="container-fluid">

        </div>
      </footer><!-- footer -->

    </body>

代码中都有每个组件含义的注释，就不赘述了。下面我们就一步一步来完成这个实验。

# 二 头部导航 #

## 标签结构

我们首先来搭建导航条，它在页面的最上方。以下是导航条的标签结构，这段代码的原型来自[官网](http://v3.bootcss.com/components/#navbar)，我们去掉了不必要的表单部分，做了一些调整，形成了[下列代码](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog-index/index-1.html)：

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed"
            data-toggle="collapse" data-target="#navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- 此处可以用图片取代文字 -->
          <a class="navbar-brand" href="#">Your Blog</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Tags</a>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container -->
    </nav>

## 代码解析

- nav标签包括了全部内容，nav样式`navbar navbar-default navbar-fixed-top`是boots的nav组件预定义好的，使用`navbar-fixed-top`是希望导航条处于固定位置（`position: fixed`）
- 第二行是一个布局容器，不过它的样式类为`container-fluid`，不同于`container`，`.container-fluid`类用于 100% 宽度，占据全部视口（viewport）的容器。
- 容器下是两个div，一个称之为导航头（`navbar-header`，左浮动），一个称之为导航条(`navbar-collapse`)
- 导航头第一部分是一个按钮，不过在导航折叠断点之上是不会显示的，折叠后显示为三短杠的按钮
- 导航头第二部分是放置logo的地方（`navbar-brand`），这个超链接的内部可以像示例是一段文本，也可以设置为图片
- 导航条是一个div，除了设置样式类为`navbar-collapse collapse`表明这是一个可折叠导航条且在断点下默认隐藏外，还要设置一个ID。这个ID和上面那个按钮的`data-target`属性要一致，二者才能关联上——折叠断点之下，点击按钮来显示或隐藏导航条
- div中是无序列表ul，我们将其样式类设定为`nav navbar-nav navbar-right`分别表明这是一个导航、导航条中的导航、靠右浮动的导航
- 导航控制按钮的`sr-only`是用于读屏的，是不显示的
- 其他代码就没什么好解释的了

## 编辑导航条变量

拷贝variable.less为__variable.less，修改如下内容：

    //== Navbar
    //
    //##

    // Basics of a navbar
    @navbar-height                    : 60px;
    ...
    @navbar-default-color             : #404040;
    @navbar-default-bg                : #f8f8f8;
    ...
    // Navbar links
    @navbar-default-link-color        : @navbar-default-color;
    @navbar-default-link-hover-color  : #0085a1;
    ...
    @navbar-default-link-active-color : #0085a1;
    ...
    // Navbar brand label
    @navbar-default-brand-color       : @navbar-default-link-color;
    @navbar-default-brand-hover-color : #0085a1;

这次修改，我们

- 增加了导航条高度
- 导航文字和超链接的默认颜色及悬停颜色做了变化
- 至于颜色，你喜欢什么颜色就用什么颜色

在bootstrap.less中修改variable.less为"__variable.less"并重新编译css到某个位置同时保证你的页面引用了正确的位置。例如：

    //编译
    lessc bootstrap.less ../../blog-index/bootstrap.min.css
    //引入
    <!-- blog-index.html -->
    <link href="./bootstrap.min.css" rel="stylesheet">


## 效果

刷新页面，看到效果：

![navbar](/public/img/boots/4.01.png)

*桌面电脑显示效果*

![navbar](/public/img/boots/4.02.png)

*手机电脑显示效果*

# 三 主体部分：文章预览列表 #

本节代码在[此处](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog-index/index-2.html)

## 文章列表和侧边栏使用网格布局

在页面的中间部分，有两大板块——文章列表和侧边栏，现在我们采用8：3的比例来布局，让文章列表这个部分向右偏移1列：

    <nav>...</nav>
    <main>
      <div class="container">
        <div class="row">
          <!-- Post Container -->
          <div class="col-lg-8 col-lg-offset-1 col-md-8 col-md-offset-1 post-container">
          </div>
          <!-- Sidebar Container -->
          <div class="col-lg-3 col-md-3 sidebar-container">
          </div>
        </div>
      </div>
    </main>

`post-container`和`sidebar-container`都是自定义样式类，现在我们视为div的标识，以后我们可以给这两个类定义实质的样式。

## 文章预览列表

现在我们在`post-container`中添加某文章的概要信息预览：

    <!-- Post Container -->
    <div class="col-lg-8 col-lg-offset-1 col-md-8 col-md-offset-1 post-container">
      <!-- 文章预览 -->
      <div class="post-preview">
        <a href="#">
          <!-- 标题 -->
          <h2>
            Example Post
          </h2>
          <!-- 二级标题 -->
          <h3>
            lanqiao 蓝桥 培训 教程 Web前端 Bootstrap 博客站点首页
          </h3>
          <!-- 概要 -->
          <div class="post-content-preview">
            纸上得来终觉浅。本章将带领大家完成一个酷炫的博客站点首页设计。在实践过程中你将学到关于基础样式、组件和自定义boots的综合知识和实践能力。进而可以设计自己的个性化博客首页。
          </div>
        </a>
        <!-- 作者及时间信息 -->
        <p class="post-meta">
          Posted by lanqiao on 2016-10-25
        </p>
      </div>
    </div>

`post-preview`,`post-content-preview`,`post-meta`是自定义类，此处暂时作为div的标识，给未来局部调整样式留有余地。

## 效果与问题

![预览列表](/public/img/boots/4.03.png)

*第一个文章的标题被挡住了*

固定的导航条会遮住页面上的其它内容，除非你给 <body> 元素底部设置了 padding。提示：导航条的默认高度是 50px，之前我们改成了60px。

### 解决办法：

拷贝scaffolding.less为__scaffolding.less，修改body样式：

    body {
      font-family      : @font-family-base;
      font-size        : @font-size-base;
      line-height      : @line-height-base;
      color            : @text-color;
      background-color : @body-bg;
      padding-top      : 60px;  // 新增
    }

如果我们做正确了，效果也正确了：

![预览列表](/public/img/boots/4.04.png)

## 文章预览列表的优化

因为我们按自己的想法组合了“文章预览列表”这么一个组件，所以没法像nav那样直接通过修改组件变量来改变效果，我们需要完全自定义这部分的样式。新增一个"__custom.less"文件，定义如下内容：

```css
.post-preview{
  a{
    // 链接颜色
    color: @gray-dark;
    // 二级标题
    h3{
      font-weight : 300;
      font-size   : 16px;
    }
    // 文本预览
    .post-content-preview{
      font-style : italic;
      color      : #a3a3a3;
      &:hover{
        text-decoration : none;
        color           : #0085a1;
      }
    }
    // 悬停和激活状态
    &:hover,&:active,&:focus{
      text-decoration : none;
      color           : #0085a1;
    }
  }
  // 作者和时间信息
  .post-meta{
    font-family : Lora,'Times New Roman',serif;
    color       : gray;
    font-size   : 18px;
    font-style  : italic;
    margin-top  : 10px;
  }

}
```

这里我们使用了less的嵌套语法，比扁平的css定义更容易理解：

- 修改了链接颜色及悬停颜色
- 调整了副标题和作者信息的字号、字体
- 内容预览为斜体

**在bootstrap.less的最后引入这个less文件**，编译并刷新页面，效果如下：

![预览列表](/public/img/boots/4.05.png)

# 四 侧边栏：标签列表 #

本节代码在[此处](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog-index/index-3.html)

## 添加html标记

整个标签列表可以视为一个组件，我们将它放在侧边栏这个容器之中：

    <!-- Sidebar Container -->
    <div class="col-lg-3 col-md-3 sidebar-container">
      <section class="tags-container">
        <hr>
        <h5><a href="#">FEATURED TAGS</a></h5>
        <div class="tags">
          <a href="#" title="标签1" rel="3">标签1</a>
          <a href="#" title="标签2" rel="3">标签2</a>
          <a href="#" title="标签3" rel="3">标签3</a>
        </div>    
      </section><!-- /tags-container -->
    </div><!-- /sidebar-container -->

section标记便是我们新增的内容。

## 组件样式

同样在__custom.less中我们为`tags-container`组件设定样式：

```css
// 标签
.tags-container{
  // 标题
  h5 a{
    color           : @gray;
    text-decoration : none;

    &:hover,&:focus{
      color: #0085a1;
    }
  }
  .tags{
    margin-bottom: 10px;
    // 具体标签：加边框
    a{
      color           : #bfbfbf;
      border          : 1px solid rgba(202, 99, 99, 0.8);
      border-radius   : 999em;
      padding         : 5px 10px;
      line-height     : 24px;
      font-size       : 12px;
      text-decoration : none;
      margin          : 0 5px;
      margin-bottom   : 6px;

      &:hover,&:focus{
        color        : #0085a1;
        border-color : #0085a1;
      }
    }
  }
}
```

## 查看效果

保存更改，重新编译less，刷新页面，效果如下：

![标签列表](/public/img/boots/4.06.png)

# 五 侧边栏：个人信息 #

本节代码在[此处](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog-index/index-4.html)

## 添加html标记

我们将个人信息组件放到侧边栏容器中，标签列表之后：

```html    
...</section><!-- /tags-container -->

<!-- Short About -->
<section class="hidden-sm hidden-xs short-about-container">
  <hr>
  <h5><a href="#">ABOUT ME</a></h5>
  <div class="short-about">
    <img src="../assets/img/lanqiao.png" width="100%" height="100%">
    <p>立人达人，专注教育。</p>
    <!-- 社交链接 -->
    <ul class="list-inline">
      <!-- 知乎 -->
      <li>
        <a target="_blank" href="#">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-stack-1x fa-inverse">知</i>
          </span>
        </a>
      </li>
      <!-- 微博 -->
      <li>
        <a target="_blank" href="#">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-weibo fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </li>
      <!-- facebook -->
      <li>
        <a target="_blank" href="#">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </li>
      <!-- github -->
      <li>
        <a target="_blank" href="#">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-github fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </li>

    </ul>
  </div>
</section><!-- /short-about-container -->
```

## fontawesome字体图标的使用

代码中fa打头的样式类都来自font-awesome字体图标，因此我们需要了解fontawesome字体图标的使用：

- 克隆项目

```    
git clone https://github.com/FortAwesome/Font-Awesome.git
```

- 拷贝font目录下的字体到你工程项目的字体目录下，我拷贝到了`./assets/font`目录
- 将整个less目录拷贝重命名为font-awesome再剪切到`./assets/less`目录

```
assets
├── css
├── fonts
│   ├── FontAwesome.otf
│   ├── fontawesome-webfont.eot
│   ├── fontawesome-webfont.svg
│   ├── fontawesome-webfont.ttf
│   ├── fontawesome-webfont.woff
│   ├── fontawesome-webfont.woff2
│   ├── glyphicons-halflings-regular.eot
│   └── glyphicons-...
├── img
├── js
└── less
├── font-awesome
│   ├── font-awesome.less
│   ├── ...
│   ├── variables.less 
│   └── path.less 
├── bootstrap.less
└── ...
```

- 修改bootstrap.less文件导入font-awesome:

```
// @import "glyphicons.less";  // 去掉默认字体图标
@import "./font-awesome/font-awesome.less";
```

- 修改"./font-awesome/variable.less"中字体图标的路径

```
//@fa-font-path:        "../fonts";
@fa-font-path:        "../assets/fonts";
```

- 在页面中使用font-awesome提供的css类引入字体图标，如：

```
<i class="fa fa-camera-retro"></i>
<i class="fa fa-camera-retro fa-2x"></i>
<i class="fa fa-camera-retro fa-3x"></i>
<i class="fa fa-camera-retro fa-4x"></i>
```

效果：<i class="fa fa-camera-retro"></i>
<i class="fa fa-camera-retro fa-2x"></i>
<i class="fa fa-camera-retro fa-3x"></i>
<i class="fa fa-camera-retro fa-4x"></i>

在i标签的外部，还可以加超链接标签等。

- 更多关于样式的使用，请到[font-awesome示例](http://fontawesome.io/examples/)去了解。

## 组件样式

目前的页面效果：

![个人信息](/public/img/boots/4.07.png)

在__custom.less中新增如下代码：

```css
.short-about-container{
  color: #bfbfbf;  // 灰色
  a{
    color: #bfbfbf;
    text-decoration: none;
    &:hover,&:focus{
      color: #0085a1;
      border-color: #0085a1;
    }
  }
  h5 a{
    color: @gray;
  }
  .short-about p{
    .text-center();  // 文字居中
    margin: 10px 0;
  }
}
```

保存更改，重新编译less，刷新页面后，效果如下：

![个人信息](/public/img/boots/4.08.png)

# 六 侧边栏：好友链接 #

本节代码在[此处](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog-index/index-5.html)。

## 添加标记

    <!-- Friends Blog -->
    <section class="friends-container">
      <hr>
      <h5>FRIENDS</h5>
      <ul class="list-inline friends-list">
        <li><a href="#">Lanqiao Blog</a></li>
        <li><a href="#">Foo</a></li>
        <li><a href="#">Bar</a></li>
        <li><a href="#">Example Friends</a></li>
        <li><a href="#">It helps SEO</a></li>
      </ul>
    </section><!-- friends-container -->

## 优化样式

    .short-about-container,.friends-container{
      color: #bfbfbf;  // 灰色
      a{
        color: #bfbfbf;
        text-decoration: none;
        &:hover,&:focus{
          color: #0085a1;
          border-color: #0085a1;
        }
      }
      h5 {
        color: @gray;
        a{
          color: @gray;
        }
      }
      .short-about p{
        .text-center();  // 文字居中
        margin: 10px 0;
      }
    }   

由于和个人介绍类似，所以我们可以直接共享之前的样式。

## 效果展示

![好友链接](/public/img/boots/4.09.png)

# 七 页脚版权声明与媒体链接

本节代码在[此处](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog-index/index-6.html)。

## 添加标记

    ...
    </main><!-- main -->
    <footer class="home-footer">
      <div class="container-fluid">
        <ul class="list-inline text-center">
          <li>
            <a  href="#">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa  fa-stack-1x fa-inverse">知</i>
              </span>
            </a>
          </li>
          <li>
            <a  href="#">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-weibo fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          <li>
            <a  href="#">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
          <li>
            <a  href="#">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-github fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </li>
        </ul>
        <p class="copyright text-muted text-center">
          Copyright © Lanqiao 2016
        </p>
      </div>
    </footer><!-- footer -->

## 优化样式

    .home-footer {
      padding: 50px 0 65px;
      li{
        padding-right: 5px;
        padding-left: 5px;

        a{
          font-size: 20px;
          color: @gray-darker;
          text-decoration: none;

          &:hover,&:focus{
            color: #0085a1;
          }
        }
      }
    }

## 效果展示

![页脚](/public/img/boots/4.10.png)

# 八 页头巨幕、微调、完结

最终代码在[此处](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog-index/index.html)。

## 页头巨幕

为了让博客更具有个性，我们决定在页面上方增加一个巨幕并以巨大的字体打出我们的名字：

    ...
    </nav><!-- /导航条 -->
    <header class="home-header">
      <div class="jumbotron">
        <div class="container-fluid text-center">
          <h1>Your Blog</h1>
          <h2>Sub title</h2>
        </div>
      </div>
    </header>
    <main>
    ...

`jumbotron`是boots内置的巨幕组件样式类，直接使用即可。

  样式：

    .home-header{
      color: #fff;  // 字体颜色： 白
      .jumbotron{
        background-color: #e8a7a7;  // 背景颜色： 淡红
      }
      h1{
        font-size: 80px;
      }
      h2{
        font-size: 22px;
      }
    }

效果：

![巨幕](/public/img/boots/4.11.png)

## 整页调整

- 我们把logo从文字换为了图片
- 为`.post-container`增加了右侧内边距

这些大家都可以通过查看[custom.less源代码](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/assets/less/__custom.less)了解。

# 九 小结

下面我们来请点一下本章的知识要点：

- 我们利用了Bootstrap的响应式导航条、巨幕和网格系统；
- 我们自定义了一些Bootstrap的LESS文件；
- 我们还创建了自己的LESS文件，并将它集成到了项目中；
- 我们加入了Font Awesome，获得了最流行的网络字体图标
- 我们实现了一个容易维护的个人博客网站，网站的文件组织非常稳健，注释非常完善

有了这些经验，Bootstap及基本能为你所用了：利用它可以迅速搭建网站框架，然后再对核心内容进行定制。在后面几章里，我们还将继续完善整个博客站点，从而丰富你的经验。
