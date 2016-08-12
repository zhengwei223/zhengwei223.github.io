---
layout: post
title: 栅格布局系统
category: Bootstrap入门教程
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap 栅格布局系统
description:

---

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

# 课程目标
掌握bootstrap的栅格布局系统。

# 简介

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。下面就介绍一下 Bootstrap 栅格系统的规则：

- “行（row）”必须包含在 .container 容器中 或者 .container-fluid容器中。

```
	<div class="container">
		<div class="row"></div>
	</div>
```

- 通过“行（.row）”在水平方向创建一组“列（column）”。
- 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为行（.row）”的直接子元素。
- 用“.col-尺寸代号-4”这种预定义的类，可以用来快速创建列并指定列宽尺寸代号为xs（超小）、sm（小）、md（中等）、lg（大）。
- 栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个 .col-xs-4 来创建。
- 如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。

```
	<div class="container">
		<div class="row">
			<div class="col-md-4">col-md-4  第1页</div>
			<div class="col-md-4">col-md-4  第2页</div>
			<div class="col-md-4">col-md-4  第3页</div>
		</div>
	</div>
```

效果如下：

![image](/public/img/h5/grid-md-4.png)

可以看到三个div各占屏幕宽度的三分之一。

- 在元素上应用 .col-md-* 栅格类，此clsss适用于“宽度大于等于md（middle）”的设备 ， 在小于md（middle）宽度的设备上无效。我们将上述案例所在的浏览器变窄，会看到不一样的效果：

![image](/public/img/h5/grid-md-4-sm.png)

因为col-md-*的设置只有在md及以上的设备上有效，所以屏幕变窄时，这三个div会回到原始的块级元素（独占一行），形成纵向堆叠。

# 断点
断点——界定设备尺寸的临界点

- 超小屏幕 手机 (<768px)
  - 默认为堆叠，一般我们不关注
  - .container最大宽度：自动
  - 类前缀：.col-xs-
- 小屏幕 平板 (≥768px)
  - 默认为堆叠，设备宽度大于此断点时，列水平排列
  - .container最大宽度：750px
  - 类前缀：.col-sm-
- 中等屏幕 桌面显示器 (≥992px)	
  - 默认为堆叠，设备宽度大于此断点时，列水平排列
  - .container最大宽度：970px
  - 类前缀：.col-md-
- 大屏幕 大桌面显示器 (≥1200px)
  - 默认为堆叠，设备宽度大于此断点时，列水平排列
  - .container最大宽度：1170px
  - 类前缀：.col-lg-

### 综合案例
因为在xs上默认堆叠，往往我们只需关注sm和md上的表现形式就可以了，试试下面的代码，并拉动浏览器的侧边控制其宽度，试验div的排列表现。

```
<div class="row">
	<div class="col-sm-6 col-md-3" style="background-color: #1B6D85;">something</div>
	<div class="col-sm-6 col-md-3" style="background-color: #31B0D5;">something</div>
	<div class="col-sm-6 col-md-3" style="background-color: #761C19;">something</div>
	<div class="col-sm-6 col-md-3" style="background-color: #D43F3A;">something</div>
</div>
```

你会发现，屏幕小于768时，它们呈一纵，768-992时，它们各占屏幕一半从而形成2行2列，当大于等于992时，它们各占屏幕四分之一从而形成一行。
