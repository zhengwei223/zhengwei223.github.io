---
layout: post
title: Bootstrap网格布局
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap
description:
---
Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

# 课程目标
掌握bootstrap的栅格布局系统。

# 简介

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。下面就介绍一下 Bootstrap 栅格系统的规则：

- “行（row）”必须包含在 `.container` 容器中 或者 `.container-fluid`容器中。

```html
  <div class="container">
    <div class="row"></div>
  </div>
```

- 通过“行（`.row`）”在水平方向创建一组“列（column）”。
- 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为行（.row）”的直接子元素。
- 用“`.col-尺寸代号-4`”这种预定义的类，可以用来快速创建列并指定列宽尺寸代号为xs（超小）、sm（小）、md（中等）、lg（大）。
- 栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个 `.col-xs-4` 来创建。
- 如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。

# 中等屏幕三列布局

代码见grid0.html,在上一章模板基础之上，新建页面，输入下列内容（重复内容省略）：

```html
<head>
...
    <link rel="stylesheet" href="grid0.css">
...
  </head>
  <body>
    <h1>网格布局</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-4"><h1>col1</h1></div>
        <div class="col-md-4"><h1>col2</h1></div>
        <div class="col-md-4"><h1>col3</h1></div>
      </div>
    </div>
    ...
  </body> 
```

其中grid0.css设定了每个单元格的高度及边框样式，如下：

```css
.row>div{
  height: 100px;
  border: 3px dotted red;
}
```


效果如下：

![image](/public/img/boots/2.01.png)

可以看到三个div各占屏幕宽度的三分之一。

- 在元素上应用 `.col-md-* `栅格类，此clsss适用于“宽度大于等于md（middle）”的设备 ， 在小于md（middle）宽度的设备上无效。我们将上述案例所在的浏览器变窄，会看到不一样的效果：

![image](/public/img/boots/2.02.png)

因为`col-md-*`的设置只有在md及以上的设备上有效，所以屏幕变窄时，这三个div会回到原始的块级元素（独占一行），形成**纵向堆叠**。

# 断点

断点用于区分大、中、小及超小设备的临界点：

- 超小屏幕 手机 (<768px)
  - 默认为堆叠，一般我们不关注
  - `.container`最大宽度：自动
  - 类前缀：`.col-xs-`
- 小屏幕 平板 (≥768px)
  - 默认为堆叠，设备宽度大于此断点时，列水平排列
  - `.container`最大宽度：750px
  - 类前缀：`.col-sm-`
- 中等屏幕 桌面显示器 (≥992px) 
  - 默认为堆叠，设备宽度大于此断点时，列水平排列
  - `.container`最大宽度：970px
  - 类前缀：`.col-md-`
- 大屏幕 大桌面显示器 (≥1200px)
  - 默认为堆叠，设备宽度大于此断点时，列水平排列
  - `.container`最大宽度：1170px
  - 类前缀：`.col-lg-`

# 自适应多种设备

代码见grid1.html,因为在xs上各列默认堆叠，往往我们只需关注sm和md上的表现形式就可以了，试试下面的代码，并拉动浏览器的侧边控制其宽度，试验div的排列表现。

```html
<div class="row">
  <div class="col-sm-6 col-md-3" ><h2>col-sm-6 col-md-3</h2></div>
  <div class="col-sm-6 col-md-3" ><h2>col-sm-6 col-md-3</h2></div>
  <div class="col-sm-6 col-md-3" ><h2>col-sm-6 col-md-3</h2></div>
  <div class="col-sm-6 col-md-3" ><h2>col-sm-6 col-md-3</h2></div>
</div>
```

你会发现，屏幕小于768时，它们呈一纵，768-992时，它们各占屏幕一半从而形成2行2列，当大于等于992时，它们各占屏幕四分之一从而形成一行。

![image](/public/img/boots/2.03.png)

*超小设备*

![image](/public/img/boots/2.04.png)

*小设备，呈现两列*

![image](/public/img/boots/2.05.png)

*中、大设备，呈现4列*

# 更巧妙的例子

[网格工作示例](https://github.com/ananth22by7/visualizing-bootstrap.git)，你可以克隆这个项目并运行index.html，随意拖动体会下响应式网格布局，进一步你可以查看源码了解这个例子是怎么设计的。

# 列的偏移

见grid2.html，为了给列增加左边距，可以使用`col-offset-X`附加样式类，X表示偏移多少列。试试下面的代码：

```html
<div class="container">
  <h1>The Offset feature in Bootstrap</h1>
  <h2>PacktPub</h2>
  <div class="row">
    <div class="col-md-4 col-md-offset-8">
    <h2>这一大段话都偏到右边去了</h2>
    ......
    </div>
  </div>
</div>
```

# 列的推拉

见grid3.html，为了改变列出现的默认顺序，可以使用`col-push-X`和`col-pull-X`附加类。`push`是向右移动X个单位，`pull`是向左移动X个单位。试试下面的代码：

    <div class="container">
      <h1>Welcome to Packt</h1>
      <p>We will look at the concept of Grid Layouts now</p>
      <div class="row">
        <div class="col-md-9 col-md-push-3">
          <h2>PacktPub</h2>
          <p>
            这是先出现的列，但被推到了右边.
          </p> 
        </div>
        <div class="col-md-3 col-md-pull-9">
          <h2>PacktLib: Online</h2>
          <p>这是后出现的列，但被拉到了左边.</p>
        </div>
      </div>
    </div>

# 列的嵌套

见grid4.html，可以把行列组合放进一个已有的列中，从而形成嵌套：

    <div class="container">
     <h1>Hello, world!</h1>
     <p>这是一个展示列嵌套的例子。</p>
     <div class="row ">
       <div class="col-lg-6" id="packtlib">
         <h2>行列可以被嵌套.</h2>
         <div class="row"  >
           <div class="col-lg-6" id="packt">
             <p>第一子列</p> 
           </div>
           <div class="col-lg-6" id="pub">
             <p>第二子列</p>
           </div>
         </div>
       </div>
     </div> <!-- the row class div -->
    </div> <!-- the container div -->

效果如下：

![image](/public/img/boots/2.06.png)

# 小结

本章主要内容：

- 利用网格预定义样式类来快速将网页划分为多列
- boots是响应式的，预定义的样式类可以用于响应式布局
- 通过列偏移可以为列增加外边距
- 通过推拉可以改变列出现的顺序
- 行列是可以嵌套的

下一章，我们将使用本章知识完成一个博客系统的“文章页”。
