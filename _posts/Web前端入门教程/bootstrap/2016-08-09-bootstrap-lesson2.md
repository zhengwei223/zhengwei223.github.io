---
layout: post
title: Bootstrap CSS 概览
category: bootstrap
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap CSS概览
description:

---

# 课程目标
在这一章中，我们将讲解 Bootstrap 底层结构的关键部分，包括我们让 web 开发变得更好、更快、更强壮的最佳实践。

**阅读本章，可以对上一章的某些代码有更进一步的认识**

# HTML 5 文档类型（Doctype）
Bootstrap 使用了一些 HTML5 元素和 CSS 属性。为了让这些正常工作，您需要使用 HTML5 文档类型（Doctype）。 因此，请在使用 Bootstrap 项目的开头包含下面的代码段。

```
<!DOCTYPE html>
<html>
....
</html>
```

# 移动设备优先

移动设备优先是 Bootstrap 3 的最显著的变化。

在之前的 Bootstrap 版本中（直到 2.x），您需要手动引用另一个 CSS，才能让整个项目友好的支持移动设备。

现在不一样了，Bootstrap 3 默认的 CSS 本身就对移动设备友好支持。

Bootstrap 3 的设计目标是移动设备优先，然后才是桌面设备。这实际上是一个非常及时的转变，因为现在越来越多的用户使用移动设备。

为了让 Bootstrap 开发的网站对移动设备友好，确保适当的绘制和触屏缩放，需要在网页的 head 之中添加 viewport meta 标签，如下所示：

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

width 属性控制设备的宽度。假设您的网站将被带有不同屏幕分辨率的设备浏览，那么将它设置为 device-width 可以确保它能正确呈现在不同设备上。

initial-scale=1.0 确保网页加载时，以 1:1 的比例呈现，不会有任何的缩放。

在移动设备浏览器上，通过为 viewport meta 标签添加 user-scalable=no 可以禁用其缩放（zooming）功能。

通常情况下，maximum-scale=1.0 与 user-scalable=no 一起使用。这样禁用缩放功能后，用户只能滚动屏幕，就能让您的网站看上去更像原生应用的感觉。

注意，这种方式我们并不推荐所有网站使用，还是要看您自己的情况而定！

```
<meta name="viewport" content="width=device-width, 
                                     initial-scale=1.0, 
                                     maximum-scale=1.0, 
                                     user-scalable=no">
```

#  响应式图像

```
<img src="..." class="img-responsive" alt="响应式图像">
```

通过添加 img-responsive class 可以让 Bootstrap 3 中的图像对响应式布局的支持更友好。

接下来让我们看下这个 class 包含了哪些 css 属性。

在下面的代码中，可以看到img-responsive class 为图像赋予了 max-width: 100%; 和 height: auto; 属性，可以让图像按比例缩放，不超过其父元素的尺寸。

```
.img-responsive {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
```

这表明相关的图像呈现为 inline-block。当您把元素的 display 属性设置为 inline-block，元素相对于它周围的内容以内联形式呈现，但与内联不同的是，这种情况下我们可以设置宽度和高度。

设置 height:auto，相关元素的高度取决于浏览器。

设置 max-width 为 100% 会重写任何通过 width 属性指定的宽度。这让图片对响应式布局的支持更友好。

# 全局显示、排版和链接

## 基本的全局显示
Bootstrap 3 使用 body {margin: 0;} 来移除 body 的边距。

请看下面有关 body 的设置：

```
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333333;
  background-color: #ffffff;
}
```

- 第一条规则设置 body 的默认字体样式为 "Helvetica Neue", Helvetica, Arial, sans-serif。
- 第二条规则设置文本的默认字体大小为 14 像素。
- 第三条规则设置默认的行高度为 1.428571429。
- 第四条规则设置默认的文本颜色为 #333333。
- 最后一条规则设置默认的背景颜色为白色。

## 排版

使用 @font-family-base、 @font-size-base 和 @line-height-base 变量作为排版的基本参数

## 链接样式

为所有链接设置了基本颜色 @link-color ，并且当链接处于 :hover 状态时才添加下划线。
对于链接的默认样式，如下设置：

```
a:hover,
a:focus {
  color: #2a6496;
  text-decoration: underline;
}

a:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
```

所以，当鼠标悬停在链接上，或者点击过的链接，颜色会被设置为 #2a6496。同时，会呈现一条下划线。

除此之外，点击过的链接，会呈现一个颜色码为 #333 的细的虚线轮廓。另一条规则是设置轮廓为 5 像素宽，且对于基于 webkit 浏览器有一个 -webkit-focus-ring-color 的浏览器扩展。轮廓偏移设置为 -2 像素。

以上所有这些样式都可以在 scaffolding.less 中找到。

# 避免跨浏览器的不一致

Bootstrap 使用 Normalize 来建立跨浏览器的一致性。

Normalize.css 是一个很小的 CSS 文件，在 HTML 元素的默认样式中提供了更好的跨浏览器一致性。

# 容器（Container）

```
<div class="container">
  ...
</div>
```

Bootstrap 需要为页面内容和栅格系统包裹一个 .container 容器。

让我们一起来看看 
bootstrap.css 文件中的这个 .container class。

```
.container {
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
}
```

通过上面的代码，把 container 的左右外边距（margin-right、margin-left）交由浏览器决定。

Bootstrap 3 CSS 有一个申请响应的媒体查询，在不同的媒体查询阈值范围内都为 container 设置了max-width，用以匹配网格系统。

```
@media (min-width: 768px) {
   .container {
      width: 750px;
}
```