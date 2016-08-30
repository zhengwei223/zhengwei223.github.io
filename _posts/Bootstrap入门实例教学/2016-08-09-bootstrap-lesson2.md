---
layout: post
title: boots常用组件
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap CSS概览
description:
---

这一章我们继续来玩儿官网提供的示例，并加以解读。

>官网有案例，我们最好遵循官网的案例先轮一遍。只是初学者千头万绪不知学习的顺序，才有了本教程的解读。

# 0.查看案例效果并获得源码

访问[boots中文网](http://v3.bootcss.com/examples/theme/)可以看到boots的一个兵器展览，这里面应有尽有。

源码在你下载的boots-home/docs/examples/theme下：

- `index.html`是页面标记
  - 可以看到这里面代码很多，我们的学习方式是**分而治之，各个击破**！
- `theme.css`是这个示例依赖的自定义的少量样式

本来这个示例是说“**Bootstrap主题——加载可选的 Bootstrap 主题，获得增强的视觉体验。**”但我认为，用它来学习boots提供的常用组建也是不错的选择。

# 1.Buttons

## 1.1获得按钮示例及效果
按钮是非常常用和常见的页面元素。

但`index.html`的内容太多，我们不要一次性读完，先聚焦到按钮组件的各种效果上来。继续使用第一章里面的[基础模板](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/01/index0.html)来创建我们的[02/index1html](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/02/index1.html)

在`body`中先定义一个基本容器：

```
<main>
    <div class="container">
      
    </div>
</main>
```

`main`是新的语义标签，没有实质用处，`.container`设定了一个基本容器，随后我们的内容放在这个容器里面。

然后，把官方示例boots-home/docs/examples/theme/index.html的80-118行拷贝到`div .container`里面，也可以从下面直接拷贝，不过最好学会拆解官方的代码：

```
<div class="page-header">
  <h1>Buttons</h1>
</div>
<p>
  <button type="button" class="btn btn-lg btn-default">Default</button>
  <button type="button" class="btn btn-lg btn-primary">Primary</button>
  <button type="button" class="btn btn-lg btn-success">Success</button>
  <button type="button" class="btn btn-lg btn-info">Info</button>
  <button type="button" class="btn btn-lg btn-warning">Warning</button>
  <button type="button" class="btn btn-lg btn-danger">Danger</button>
  <button type="button" class="btn btn-lg btn-link">Link</button>
</p>
<p>
  <button type="button" class="btn btn-default">Default</button>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-link">Link</button>
</p>
<p>
  <button type="button" class="btn btn-sm btn-default">Default</button>
  <button type="button" class="btn btn-sm btn-primary">Primary</button>
  <button type="button" class="btn btn-sm btn-success">Success</button>
  <button type="button" class="btn btn-sm btn-info">Info</button>
  <button type="button" class="btn btn-sm btn-warning">Warning</button>
  <button type="button" class="btn btn-sm btn-danger">Danger</button>
  <button type="button" class="btn btn-sm btn-link">Link</button>
</p>
<p>
  <button type="button" class="btn btn-xs btn-default">Default</button>
  <button type="button" class="btn btn-xs btn-primary">Primary</button>
  <button type="button" class="btn btn-xs btn-success">Success</button>
  <button type="button" class="btn btn-xs btn-info">Info</button>
  <button type="button" class="btn btn-xs btn-warning">Warning</button>
  <button type="button" class="btn btn-xs btn-danger">Danger</button>
  <button type="button" class="btn btn-xs btn-link">Link</button>
</p>
```

在hb里面运行页面，会得到这个纯粹展示按钮的页面效果：

![2.1](/public/img/boots/2.1.png)

## 1.2代码解读

按钮很炫吧，回到源码，进行解读

- `div > h1`这一段，就是标题
- 第一个段落里面的按钮都是“巨大”的，但拥有不同样式，它们的`type`属性都是`button`，样式类具有共性`btn btn-lg btn-*`，这里面`btn`是基础样式，`btn-lg`将按钮调整到最大，后面的类
  - `btn-default`默认的按钮，背景色透明
  - `btn-primary`和主题颜色一致的按钮
  - `btn-success`成功状态的按钮
  - `btn-info`普通信息状态的按钮
  - `btn-warning`警告状态的按钮
  - `btn-danger`危险状态的按钮
  - `btn-link`看起来像一个链接的按钮
- 第二排按钮就很好理解了，和上一组类似，只是没了`btn-lg`，按钮大小恢复到了正常水平
- 第三排按钮添加了`btn-sm`样式类，因此这组按钮比正常按钮都要小些
- 第四排按钮添加了`btn-xs`样式类，因此这组按钮比small还要小些，是最小的

## 1.3小结

按钮就是这么简单，定义`type="button"` ，样式类必须有`btn`，然后根据设计调整大小（`btn-lg`,`btn-sm`,`btn-xs`或者没有）和状态（7种状态随你选择）。


# 2.表格

## 2.1获得表格示例及效果

重复1.1的动作，不过这次我们把121-259行的代码拷贝到新的一个模板文件中，得到[02/index2.html](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/02/index2.html)，运行效果如图：

![2.2](/public/img/boots/2.2.png)

一大堆代码，最终得到的是四个样子稍微有点差别的表格。

## 2.2代码解读

为了搞清楚代码结构，我们先在hb中把所有`table`标记收起来，效果就像这样。

![2.3](/public/img/boots/2.3.png)

为了便于说明，我们将4个`table`的4个父容器`div`及更上层`div`编号。我们不得不提前讨论boots的栅格系统了：

- 1号和2号`div`都使用了`.row`，顾名思义它们分别代表一行，里面可以分为多个列，boots的一个行最多有12个等宽的列，通过设置下级元素所占据的列数来设置宽度
- 1.1和1.2都使用了`col-md-6`，这说明它们各占6列，也就是分别占据一行的一半宽度，`col-*-6`是很好理解的，那`md`是什么意思呢？——它是middle的简写，意味着屏幕宽度大于中等断点（920px）的时候这个样式有效，也意味着屏幕宽度小于这个数值的时候，`div`会恢复为独占一行，你可以【试试】。
- 2.1和2.2同上，不赘述
- 四个`table`的内容都差不多，且子标签上没有附加任何样式类，区别仅在于他们分别使用了`class="table"`,`class="table table-striped"`,`class="table table-bordered"`,`class="table table-condensed"`
  - `.table`是表格基本样式，所以每个上都有
  - `table-striped`设定表格主体的行呈条纹状，即单双行背景色不一样
  - `table-bordered`设定表格有边框
  - `table-condensed`设定紧缩表格，可以让表格更加紧凑，单元格中的内补（padding）均会减半
  - 可以将它们组合起来使用
  - 还可通过添加 `.table-hover` 类让 `<tbody>` 中的每一行对鼠标悬停状态作出响应
- 还有一个细节，就是2.1和2.2的表格中有单元格合并现象,`<td colspan="2">Larry the Bird</td>`,这和html标准用法是一致的

关于表格的更多细节,可以阅读[boots中文网](http://v3.bootcss.com/css/#tables)

## 2.3小结

表格也是这么地简单，甚至比按钮还简单，只需为`table`标记设置样式类就可以了，它们都需要`.table`类，而其他的条纹、边框、紧缩、悬停可根据自己的设计来灵活选择。