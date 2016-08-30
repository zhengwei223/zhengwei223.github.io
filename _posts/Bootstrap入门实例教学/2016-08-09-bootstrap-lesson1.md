---
layout: post
title: Bootstrap起步
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap
description:
---

>Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。

注意其官方描述，实际上boots（Bootstrap简写）是一套html标记、预定义css样式和js插件（增强互动）组成的。直接使用它可以在页面布局、基础ui和样式方面很省心，适合那些不怎么精通前端的程序猿使用。

更高阶一点的用法，是自定义boots，即修改它的样式，或者创造自己的组件、插件。（组件和插件是两个不同的概念，前者是标记+css，后者是js实现各种独特效果）。

专业的前端攻城狮会参考boots的做法自行设计一套标记、ui、样式，并整合他们喜欢的js库以及插件。

作为不怎么精通前端的程序猿，我们先看看怎么直接利用boots来掩饰我们不懂前端的缺点。

# 0.安装（获得boots）

访问这个网址下载最新的boots：

[boots中文网](http://v3.bootcss.com/getting-started/#download)

**选择下载用于生产环境的或者源码都可以**，稍微想自定义一下的，最好下载源码。

![image](/public/img/h5/boot-download.png)

*图1.1*

解压后能看到这些文件夹和文件：

![image](/public/img/h5/boot-files.png)

- dist是编译整合后的js、css和字体
- 其他目录暂时不要管

# 1.下载HBuilder并创建新Web项目

HBuilder下载安装比较简单，此处不表。

安装好之后，新建一个Web项目，我的项目名为“bootstrapDemo”，托管在[bootstrapDemo](https://git.coding.net/lanqiao/bootstrapDemo.git)，你可以去下载示例源码。

# 2.初始化项目

把dist整个目录拷贝到工程根路径下，新建目录01，在01下新建index.html并拷贝下列内容覆盖index.html中的内容：

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
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

我们要稍微做些修改，11行的css链接和26行的js链接的路径需要修改：

```
……
    <link href="../dist/css/bootstrap.min.css" rel="stylesheet">
……
    <script src="../dist/js/bootstrap.min.js"></script>    
```
其余那些关联到cdn的静态资源，就这样保留吧。

然后你就可以直接在hb（HBuilder简写）里面运行这个页面了，效果如下：

![Alt text](/public/img/boots/1.1.png)

因为index.html的`body`中只有一个一级标题，所以我们只能看到这样的效果。

# 3.导航条和正文内容

请按以下几个步骤操作：
- 从boots-home（下载的boots源码根目录）/docs/example/starter-template/index.html中拷贝`body`标签下的内容（**不要script**）
- 覆盖index.html中的`h1`标签
- 运行并查看效果

![Alt text](/public/img/boots/1.2.png)

我们会发现导航条挡住了下面的正文内容，这是因为`nav`标记的样式类`navbar-fixed-top`设定其为固定位置，实际相当于设定`position: fixed;`，整个`nav`脱离了文档流，因此展示文本内容的`div`顶格显示了。

我们回头去看boots原有的示例的第21行：

```
<!-- Custom styles for this template -->
<link href="starter-template.css" rel="stylesheet">
```

引入了自定义样式，在这个样式文件中设定了`body`上方内补以迫使`nav`下的`div`下移，并设定了`.starter-template `的文本居中，我们也需要把这个样式文件拷贝到01目录下并引入。这样效果就出来了。

![Alt text](/public/img/boots/1.3.png)

# 4.代码解析

- nav是h5的语义标签，我们关联了`navbar navbar-inverse navbar-fixed-top`三个样式类
  - `navbar`是boots预定义的基本导航条样式
  - `navbar-inverse`将基本导航条样式的颜色进行反转，【试试】不要这个样式？
  - `navbar-fixed-top`固定导航条在最上端
- 随后是一个仅用于做容器（`.container`用于包裹多行多列）的div，boots的行列布局必须放在`.container`中。这个容器里面是两个列：
- 第一列是`.navbar-header`，它被设定为向左浮动，里面放了一个按钮和一个超链接
  - 按钮默认是隐藏的，随后解释
  - 超链接样式为`.navbar-brand`顾名思义用来放品牌logo的，示例中简单将内容设定为`Project name`，可以根据自己需求来改变，加图片也是可以的
- 第二列是真正的导航，外层的div及其样式先忽略，真正起作用的是下面的`ul`，这个列表的`nav navbar-nav`做了很多样式设定：`nav`是导航样式- 整体左浮动，列表项无样式（圆点之类的），`navbar-nav`说明这是导航条里面的导航，设定列表项左浮动得以横向平铺，所有超链接的样式，被选中的列表项`.active`的样式都被设定好了 
  - 我们只需像示例代码那样在`ul`下面放置列表项`li`和超链接就可以了
- 导航条代码下面的`div .container`是下一个容器，里面的内容比较简单不详细解释了，如前文所述`.starter-template`设定了盒子内补和文本居中。
  - 这里要说的是，boots的全局样式里面为所有标题如`h1`，段落，文本（字体、字号14px）都设定了基本样式，但是这里的文本样式被段落p的`.lead`复写了，字体变成了21px， `font-weight: 300; line-height: 1.4;`也做了重新设定

**总体而言，我们会感受到boots预定义的样式，给我们带来了便捷，只需熟悉样式类与标记的配合，我们很快就可以做出效果还不错的导航条。**

# 5.未发觉的响应式效果

我们将运行的页面所在浏览器窗体变窄，或者在开发模式下，选择移动设备调试，会看到这样的效果：

![Alt text](/public/img/boots/1.4.png)

在chrome中F12调出开发者工具并点击手机图标，就会得到这样的效果。

我们继续关注页面的呈现效果，发现导航条不见了，`brand`还在，多了一个内容为3短杠的按钮，点击这个按钮会滑出纵向排列的导航条：

![Alt text](/public/img/boots/1.5.png)

接下来我们来解释下什么是响应式布局，以及哪些设定可以得到上面的效果：

- 响应式布局：根据不同设备宽度，自动变换页面组件的显示属性和位置属性，我们可以反复控制浏览器窗体的宽度来观察在哪个临界点，页面效果开始变化的。答案是768px，这是boots设定的小设备和中等设备的宽度断点。
- 在这个断点下，导航条被隐藏了，只能通过按钮来触发；而大于这个断点时，按钮被隐藏了，导航条显示出来了

要达到这样的效果，只需了解：

- 按钮：`<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">`  
  - `navbar-toggle`设定按钮右浮动，768px宽度及以上不显示，还有其他内外边距背景色等细节。
  - `data-toggle`是h5允许的扩展指令，设置控件被触发时的动作类型，这里的动作类型是*展开*
  - 至于展开什么，由`data-target`设定，这里的写法是id选择器，意味着按钮被点击时将展开id为`navbar`的控件。
  - `aria-*` 是HTML5 新加的属性。主要用于支持读屏设备，给无法直接阅读屏幕的人群（如盲人）使用，此处不表。
  
- 导航所在`div`：`<div id="navbar" class="collapse navbar-collapse">`，它的id用来和button的`data-target`关联，上面说过了。`.collapse`默认设定`display: none;`，但按钮触发后这个样式将被删除因此得以显示，`.navbar-collapse`最大宽度340px，其下的`li`也取消了浮动变为了纵向排列。

总结起来，逻辑是这样的：
- 宽屏上的呈现效果定义一套
- 控制按钮只在小屏幕上出现，控制导航在小屏幕上隐藏
- 设定导航在小屏幕上的宽度及列表的摆放（水平还是垂直）
- 将按钮的动作设定为展开导航

**boots是移动优先的设计理念，因此它的很多组件都考虑了在移动设备上的呈现效果。**

（完）

# 接下来

我们会探索一些更为复杂，也更有意思的案例



