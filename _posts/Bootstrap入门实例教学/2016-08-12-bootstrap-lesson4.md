---
layout: post
title: 其他全局css
category: cache
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap 栅格布局系统
description:

---
# 学习建议

学习本章，应把全部案例拷贝试用一遍，以获得直观感受，但没必要记住全部细节，能达到**需要时知道在哪里拷贝代码**的水平即可，另外需要知道如何**根据自己的需要来进行修改**。

# 排版

## 标题

HTML 中的所有标题标签，`<h1>` 到 `<h6>` 均可使用。另外，还提供了 `.h1` 到 `.h6` 类，为的是给内联（inline）属性的文本赋予标题的样式。

效果：

 ![lesson4-1](/public/img/boots/lesson4-1.png)


```html
<h1>h1. Bootstrap heading</h1>
<h2>h2. Bootstrap heading</h2>
<h3>h3. Bootstrap heading</h3>
<h4>h4. Bootstrap heading</h4>
<h5>h5. Bootstrap heading</h5>
<h6>h6. Bootstrap heading</h6>
```

在标题内还可以包含` <small>` 标签或赋予 `.small` 类的元素，可以用来标记副标题。

效果：

 ![lesson4-2](/public/img/boots/lesson4-2.png)

```html
<h1>h1. Bootstrap heading <small>Secondary text</small></h1>
<h2>h2. Bootstrap heading <small>Secondary text</small></h2>
<h3>h3. Bootstrap heading <small>Secondary text</small></h3>
<h4>h4. Bootstrap heading <small>Secondary text</small></h4>
<h5>h5. Bootstrap heading <small>Secondary text</small></h5>
<h6>h6. Bootstrap heading <small>Secondary text</small></h6>
```

## 页面主体

Bootstrap 将全局 `font-size` 设置为 14px，`line-height` 设置为 1.428。这些属性直接赋予 `<body>` 元素和所有段落元素。另外，`<p>` （段落）元素还被设置了等于 1/2 行高（即 10px）的底部外边距（`margin`）。

## 内联文本元素

### mark

`<mark>`标记可以高亮一段文字

效果：

<p class="border">You can use the mark tag to <mark>高亮的哦^_^</mark> text.</p>

`You can use the mark tag to <mark>highlight</mark> text.`

### 被删除的文本
对于被删除的文本使用 `<del> `标签。

<p class="border"><del>我是被删除的文本.</del></p>

`<del>This line of text is meant to be treated as deleted text.</del>`

### 无用文本
对于没用的文本使用 `<s>` 标签。

<p class="border"><s>我是没用的文本.</s></p>

`<s>This line of text is meant to be treated as no longer accurate.</s>`

### 插入文本
额外插入的文本使用 `<ins>` 标签。

<p class="border"><ins>我是多余的文本.</ins></p>

`<ins>This line of text is meant to be treated as an addition to the document.</ins>`

### 带下划线的文本
为文本添加下划线，使用 `<u>` 标签。

<p class="border"><u>我带下划线吗？</u></p>

`<u>This line of text will render as underlined</u>`

### 小号文本
对于不需要强调的inline或block类型的文本，使用 `<small>` 标签包裹，其内的文本将被设置为父容器字体大小的 85%。标题元素中嵌套的 `<small>` 元素被设置不同的 `font-size` 。

你还可以为行内元素赋予 `.small `类以代替任何 `<small>` 元素。

<p class="border"><small>小号文本.</small>正常文本</p>

`<small>This line of text is meant to be treated as fine print.</small>`

### 着重
通过增加 font-weight 值强调一段文本。

<p class="border"><strong>想要强调的内容，</strong>正常内容。</p>

`<strong>rendered as bold text</strong>`

### 斜体
用斜体强调一段文本。

<p class="border"><em>斜了，，，斜了</em></p>

`<em>rendered as italicized text</em>`

## 对齐

通过文本对齐类，可以简单方便的将文字重新对齐。

<div class="border">

<p class="text-left">左对齐.</p>
<p class="text-center">居中</p>
<p class="text-right">右对齐.</p>
<p class="text-justify">Justified text.</p>
<p class="text-nowrap">No wrap text.</p>

</div>

```
<p class="text-left">Left aligned text.</p>
<p class="text-center">Center aligned text.</p>
<p class="text-right">Right aligned text.</p>
<p class="text-justify">Justified text.</p>
<p class="text-nowrap">No wrap text.</p>
```

## 改变大小写

通过这几个类可以改变文本的大小写。

<div class="border">

<p class="text-lowercase">小写了 text.</p>
<p class="text-uppercase">大写了 text.</p>
<p class="text-capitalize">Capitalized text.首字母</p>

</div>

```
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
```

## 缩略语

当鼠标悬停在缩写和缩写词上时就会显示完整内容，Bootstrap 实现了对 HTML 的 `<abbr>` 元素的增强样式。缩略语元素带有 `title` 属性，外观表现为带有较浅的虚线框，鼠标移至上面时会变成带有“问号”的指针。如想看完整的内容可把鼠标悬停在缩略语上（对使用辅助技术的用户也可见）, 但需要包含 `title` 属性。

### 基本缩略语

<p class="border">什么是缩略语？<abbr title="attribute">attr</abbr>看他</p>

`<abbr title="attribute">attr</abbr>`

### 首字母缩略语
为缩略语添加 `.initialism` 类，可以让 `font-size` 变得稍微小些。

`<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>`

## 地址
让联系信息以最接近日常使用的格式呈现。在每行结尾添加` <br> `可以保留需要的样式。

<div class="border">

<address>
  <strong>Twitter, Inc.</strong><br>
  795 Folsom Ave, Suite 600<br>
  San Francisco, CA 94107<br>
  <abbr title="Phone">P:</abbr> (123) 456-7890
</address>

<address>
  <strong>Full Name</strong><br>
  <a href="mailto:#">first.last@example.com</a>
</address>

</div>



```
<address>
  <strong>Twitter, Inc.</strong><br>
  795 Folsom Ave, Suite 600<br>
  San Francisco, CA 94107<br>
  <abbr title="Phone">P:</abbr> (123) 456-7890
</address>

<address>
  <strong>Full Name</strong><br>
  <a href="mailto:#">first.last@example.com</a>
</address>
```

## 引用
在你的文档中引用其他来源的内容。

### 默认样式的引用
将任何 HTML 元素包裹在 `<blockquote>` 中即可表现为引用样式。对于直接引用，我们建议用 `<p>` 标签。

<div  class="border">

<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>

</div>

```
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>
```

### 多种引用样式

对于标准样式的 `<blockquote>`，可以通过几个简单的变体就能改变风格和内容。

#### 命名来源

添加 `<footer>` 用于标明引用来源。来源的名称可以包裹进 `<cite>`标签中。

```
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```

### 另一种展示风格

通过赋予 `.blockquote-reverse` 类可以让引用呈现内容右对齐的效果。

```
<blockquote class="blockquote-reverse">
  ...
</blockquote>
```

## 列表

### 无序列表
排列顺序无关紧要的一列元素。

```
<ul>
  <li>...</li>
</ul>
```

### 有序列表

顺序至关重要的一组元素。

```
<ol>
  <li>...</li>
</ol>
```

### 无样式列表

移除了默认的 list-style 样式和左侧外边距的一组元素（只针对直接子元素）。这是针对直接子元素的，也就是说，你需要对所有嵌套的列表都添加这个类才能具有同样的样式。

```
<ul class="list-unstyled">
  <li>...</li>
</ul>
```

### 内联列表

通过设置 `display: inline-block;` 并添加少量的内补（padding），将所有元素放置于同一行。

<ul class="list-inline border">
<li>内联列表1</li>
<li>内联列表2</li>
<li>内联列表3</li>
<li>内联列表4</li>
</ul>



```
<ul class="list-inline">
  <li>...</li>
</ul>
```

### 描述
带有描述的短语列表。

```
<dl>
  <dt>...</dt>
  <dd>...</dd>
</dl>
```

### 水平排列的描述

`.dl-horizontal` 可以让 `<dl>` 内的短语及其描述排在一行。开始是像 `<dl>` 的默认样式堆叠在一起，随着导航条逐渐展开而排列在一行。

```
<dl class="dl-horizontal">
  <dt>...</dt>
  <dd>...</dd>
</dl>
```

#### 自动截断
通过 `text-overflow` 属性，水平排列的描述列表将会截断左侧太长的短语。在较窄的视口（viewport）内，列表将变为默认堆叠排列的布局方式。


# 代码

## 内联代码

通过 `<code>` 标签包裹内联样式的代码片段。

For example, `<section>` should be wrapped as inline.

`For example, <code>&lt;被包裹的是代码&gt;</code> should be wrapped as inline.`

## 用户输入

通过 `<kbd>` 标签标记用户通过键盘输入的内容。

```
To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>
```

### 代码块

多行代码可以使用 `<pre>` 标签。为了正确的展示代码，注意将尖括号做转义处理。

`<pre>&lt;p&gt;Sample text here...&lt;/p&gt;</pre>`

还可以使用 `.pre-scrollable` 类，其作用是设置 max-height 为 350px ，并在垂直方向展示滚动条。

### 变量
通过 <var> 标签标记变量。


`<var>y</var> = <var>m</var><var>x</var> + <var>b</var>`

### 程序输出

通过 `<samp>` 标签来标记程序输出的内容。


`<samp>This text is meant to be treated as sample output from a computer program.</samp>`

# 表格

## 基本实例
为任意 `<table>` 标签添加 `.table` 类可以为其赋予基本的样式 — 少量的内补（`padding`）和水平方向的分隔线。这种方式看起来很多余！？但是我们觉得，表格元素使用的很广泛，如果我们为其赋予默认样式可能会影响例如日历和日期选择之类的插件，所以我们选择将此样式独立出来。

| 列1   | 列2   | 列3   |
| ---- | ---- | ---- |
| cell | cell | cell |
| cell | cell | cell |




```
<table class="table">
  ...
</table>
```

## 条纹状表格
通过` .table-striped` 类可以给 `<tbody>` 之内的每一行增加斑马条纹样式。

### 跨浏览器兼容性
条纹状表格是依赖 `:nth-child` CSS 选择器实现的，而这一功能不被 Internet Explorer 8 支持。



```
<table class="table table-striped">
  ...
</table>
```

## 带边框的表格
添加 `.table-bordered` 类为表格和其中的每个单元格增加边框。



```
<table class="table table-bordered">
  ...
</table>
```

## 鼠标悬停
通过添加 `.table-hover` 类可以让 `<tbody>` 中的每一行对鼠标悬停状态作出响应。



```
<table class="table table-hover">
  ...
</table>
```

## 紧缩表格
通过添加 `.table-condensed` 类可以让表格更加紧凑，单元格中的内补（`padding`）均会减半。



```
<table class="table table-condensed">
  ...
</table>
```

## 状态类
通过这些状态类可以为行或单元格设置颜色。

| Class    | 描述                 |
| -------- | ------------------ |
| .active  | 鼠标悬停在行或单元格上时所设置的颜色 |
| .success | 标识成功或积极的动作         |
| .info    | 标识普通的提示信息或动作       |
| .warning | 标识警告或需要用户注意        |
| .danger  | 标识危险或潜在的带来负面影响的动作  |

```
<!-- On rows -->
<tr class="active">...</tr>
<tr class="success">...</tr>
<tr class="warning">...</tr>
<tr class="danger">...</tr>
<tr class="info">...</tr>
```

<table class="table">
<thead>
<tr>
<th>#</th>
<th>Column heading</th>
<th>Column heading</th>
<th>Column heading</th>
</tr>
</thead>
<tbody>
<tr class="active">
<th scope="row">1</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr>
<th scope="row">2</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr class="success">
<th scope="row">3</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr>
<th scope="row">4</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr class="info">
<th scope="row">5</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr>
<th scope="row">6</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr class="warning">
<th scope="row">7</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr>
<th scope="row">8</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
<tr class="danger">
<th scope="row">9</th>
<td>Column content</td>
<td>Column content</td>
<td>Column content</td>
</tr>
</tbody>
</table>

```
<!-- On cells (`td` or `th`) -->
<tr>
  <td class="active">...</td>
  <td class="success">...</td>
  <td class="warning">...</td>
  <td class="danger">...</td>
  <td class="info">...</td>
</tr>
```

##### 向使用辅助技术的用户传达用意
通过为表格中的一行或一个单元格添加颜色而赋予不同的意义只是提供了一种视觉上的表现，并不能为使用辅助技术 -- 例如屏幕阅读器 -- 浏览网页的用户提供更多信息。因此，请确保通过颜色而赋予的不同意义可以通过内容本身来表达（即在相应行或单元格中的可见的文本内容）；或者通过包含额外的方式 -- 例如应用了 `.sr-only` 类而隐藏的文本 -- 来表达出来。


## 响应式表格
将任何 `.table` 元素包裹在 `.table-responsive` 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。

##### 垂直方向的内容截断
响应式表格使用了 `overflow-y: hidden` 属性，这样就能将超出表格底部和顶部的内容截断。特别是，也可以截断下拉菜单和其他第三方组件。

##### Firefox 和 fieldset 元素
Firefox 浏览器对 fieldset 元素设置了一些影响 width 属性的样式，导致响应式表格出现问题。除非使用我们下面提供的针对 Firefox 的 hack 代码，否则无解：

```
@-moz-document url-prefix() {
  fieldset { display: table-cell; }
}
```

```
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```

# 表单

## 基本实例
单独的表单控件会被自动赋予一些全局样式。所有设置了 `.form-control` 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 `width: 100%;`。 将 `label` 元素和前面提到的控件包裹在 `.form-group` 中可以获得最好的排列。


<form class="border">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>



代码：



```
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
```

#### 不要将表单组合输入框组混合使用
不要将表单组直接和输入框组混合使用。建议将输入框组嵌套到表单组中使用。


## 内联表单
为 `<form>` 元素添加` .form-inline `类可使其内容左对齐并且表现为 `inline-block` 级别的控件。只适用于视口（`viewport`）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。



<form class="form-inline border">
  <div class="form-group">
    <label for="exampleInputName2">Name</label>
    <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail2">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  </div>
  <button type="submit" class="btn btn-default">Send invitation</button>
</form>

代码：

```
<form class="form-inline">
  <div class="form-group">
    <label for="exampleInputName2">Name</label>
    <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail2">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  </div>
  <button type="submit" class="btn btn-default">Send invitation</button>
</form>
```



#### 可能需要手动设置宽度

在 Bootstrap 中，输入框和单选/多选框控件默认被设置为` width: 100%;` 宽度。在内联表单，我们将这些元素的宽度设置为 `width: auto;`，因此，多个控件可以排列在同一行。根据你的布局需求，可能需要一些额外的定制化组件。

#### 一定要添加 label 标签

如果你没有为每个输入控件设置 `label` 标签，屏幕阅读器将无法正确识别。对于这些内联表单，你可以通过为 `label` 设置 `.sr-only` 类将其隐藏。还有一些辅助技术提供`label`标签的替代方案，比如 `aria-label、aria-labelledby `或 `title` 属性。如果这些都不存在，屏幕阅读器可能会采取使用 `placeholder` 属性，如果存在的话，使用占位符来替代其他的标记，但要注意，这种方法是不妥当的。

<form class="form-inline border">
  <div class="form-group">

    <label class="sr-only" for="exampleInputEmail3">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail3" placeholder="Email">
  </div>
  <div class="form-group">
    <label class="sr-only" for="exampleInputPassword3">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-default">Sign in</button>
</form>

代码：

```
<form class="form-inline">
  <div class="form-group">
    <label class="sr-only" for="exampleInputEmail3">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail3" placeholder="Email">
  </div>
  <div class="form-group">
    <label class="sr-only" for="exampleInputPassword3">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password">
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-default">Sign in</button>
</form>
```

<form class="form-inline">
  <div class="form-group">
    <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
    <div class="input-group">
      <div class="input-group-addon">$</div>
      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
      <div class="input-group-addon">.00</div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Transfer cash</button>
</form>

```
<form class="form-inline">
  <div class="form-group">
    <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
    <div class="input-group">
      <div class="input-group-addon">$</div>
      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
      <div class="input-group-addon">.00</div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Transfer cash</button>
</form>
```

## 水平排列的表单

通过为表单添加 `.form-horizontal` 类，并联合使用 Bootstrap 预置的栅格类，可以将 `label` 标签和控件组水平并排布局。这样做将改变 `.form-group` 的行为，使其表现为栅格系统中的行（`row`），因此就无需再额外添加` .row `了。


<form class="form-horizontal border">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</form>



代码：



```

<form class="form-horizontal">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</form>
```

## 被支持的控件
表单布局实例中展示了其所支持的标准表单控件。

### 输入框
包括大部分表单控件、文本输入域控件，还支持所有 HTML5 类型的输入控件： `text`、`password`、`datetime`、`datetime-local`、`date`、`month`、`time`、`week`、`number`、`email`、`url`、`search`、`tel` 和 `color`。

#### 必须添加类型声明
只有正确设置了 `type `属性的输入控件才能被赋予正确的样式。


<input type="text" class="form-control" placeholder="我是文本框">

```
<input type="text" class="form-control" placeholder="Text input">
```
#### 输入控件组

如需在文本输入域 `<input>` 前面或后面添加文本内容或按钮控件，请参考输入控件组。

### 文本域

支持多行文本的表单控件。可根据需要改变 `rows` 属性。


<textarea class="form-control" rows="3">文本域</textarea>

`<textarea class="form-control" rows="3"></textarea>`

### 多选和单选框
多选框（`checkbox`）用于选择列表中的一个或多个选项，而单选框（`radio`）用于从多个选项中只选择一个。

设置了 `disabled` 属性的单选或多选框都能被赋予合适的样式。对于和多选或单选框联合使用的 `<label>` 标签，如果也希望将悬停于上方的鼠标设置为“禁止点击”的样式，请将 `.disabled` 类赋予 `.radio`、`.radio-inline`、`.checkbox`、`.checkbox-inline` 或 `<fieldset>`。

### 默认外观（堆叠在一起）

<div class="border">

<div class="checkbox">
  <label>

<input type="checkbox" value="">选项一

</label>

</div>
<div class="checkbox disabled">
  <label>

<input type="checkbox" value="">选项二

</label>

</div>

<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
    选项一
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
    选项二
  </label>
</div>
<div class="radio disabled">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
    选项三
  </label>
</div>

</div>

代码

```
<div class="checkbox">
  <label>
    <input type="checkbox" value="">
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="checkbox disabled">
  <label>
    <input type="checkbox" value="" disabled>
    Option two is disabled
  </label>
</div>

<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
    Option two can be something else and selecting it will deselect option one
  </label>
</div>
<div class="radio disabled">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
    Option three is disabled
  </label>
</div>
```

### 内联单选和多选框

通过将 `.checkbox-inline` 或 `.radio-inline` 类应用到一系列的多选框（`checkbox`）或单选框（`radio`）控件上，可以使这些控件排列在一行。

<div class="border">


<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
</label>
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
</label>
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
</label>

<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
</label>

</div>

代码：


```
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
</label>
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
</label>
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
</label>

<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
</label>
```


### 不带label文本的Checkbox 和 radio

如果需要 `<label>` 内没有文字，输入框（`input`）正是你所期望的。 目前只适用于非内联的 `checkbox` 和 `radio`。 请记住，仍然需要为使用辅助技术的用户提供某种形式的 `label`（例如，使用` aria-label`）。


<div class="checkbox">
  <label>
    <input type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="...">
  </label>
</div>

```

<div class="checkbox">
  <label>
    <input type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="...">
  </label>
</div>

```

### 下拉列表（select）

注意，很多原生选择菜单 - 即在 Safari 和 Chrome 中 - 的圆角是无法通过修改 `border-radius` 属性来改变的。



<select class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>



```

<select class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>

```

对于标记了 `multiple` 属性的 `<select>` 控件来说，默认显示多选项。


<select multiple class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>

```
<select multiple class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>

```

## 静态控件

如果需要在表单中将一行纯文本和 `label` 元素放置于同一行，为 `<p>` 元素添加 `.form-control-static` 类即可。

<form class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>

```
<form class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>

```

<form class="form-inline">
  <div class="form-group">
    <label class="sr-only">Email</label>
    <p class="form-control-static">email@example.com</p>
  </div>
  <div class="form-group">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-default">Confirm identity</button>
</form>

```
<form class="form-inline">
  <div class="form-group">
    <label class="sr-only">Email</label>
    <p class="form-control-static">email@example.com</p>
  </div>
  <div class="form-group">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-default">Confirm identity</button>
</form>
```



## 禁用状态
为输入框设置 `disabled` 属性可以禁止其与用户有任何交互（焦点、输入等）。被禁用的输入框颜色更浅，并且还添加了 `not-allowed` 鼠标状态。


<input class="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled>

```
<input class="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled>
```


### 被禁用的 fieldset
为`<fieldset>` 设置 `disabled` 属性,可以禁用 `<fieldset>` 中包含的所有控件。

#### `<a>` 标签的链接功能不受影响
默认情况下，浏览器会将` <fieldset disabled> `内所有的原生的表单控件（`<input>`、`<select>` 和` <button>` 元素）设置为禁用状态，防止键盘和鼠标与他们交互。然而，如果如果表单中还包含` <a ... class="btn btn-*">` 元素，这些元素将只被赋予 `pointer-events: none `属性。

#### 跨浏览器兼容性
虽然 Bootstrap 会将这些样式应用到所有浏览器上，Internet Explorer 11 及以下浏览器中的` <fieldset>` 元素并不完全支持 `disabled` 属性。因此建议在这些浏览器上通过 JavaScript 代码来禁用 `<fieldset>`。

实例

<form class="border">
  <fieldset disabled>
    <div class="form-group">
      <label for="disabledTextInput">Disabled input</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
    </div>
    <div class="form-group">
      <label for="disabledSelect">Disabled select menu</label>
      <select id="disabledSelect" class="form-control">
        <option>Disabled select</option>
      </select>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox"> Can't check this
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>



代码：

```
<form>
  <fieldset disabled>
    <div class="form-group">
      <label for="disabledTextInput">Disabled input</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
    </div>
    <div class="form-group">
      <label for="disabledSelect">Disabled select menu</label>
      <select id="disabledSelect" class="form-control">
        <option>Disabled select</option>
      </select>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox"> Can't check this
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>

```

## 只读状态
为输入框设置 `readonly` 属性可以禁止用户修改输入框中的内容。处于只读状态的输入框颜色更浅（就像被禁用的输入框一样），但是仍然保留标准的鼠标状态。


<input class="form-control" type="text" placeholder="Readonly input here…" readonly>

```
<input class="form-control" type="text" placeholder="Readonly input here…" readonly>
```

## 校验状态

Bootstrap 对表单控件的校验状态，如 `error`、`warning` 和 `success` 状态，都定义了样式。使用时，添加 `.has-warning`、`.has-error` 或 `.has-success` 类到这些控件的父元素即可。任何包含在此元素之内的 `.control-label`、`.form-control `和 `.help-block `元素都将接受这些校验状态的样式。

#### 将验证状态传达给辅助设备和盲人用户
使用这些校验样式只是为表单控件提供一个可视的、基于色彩的提示，但是并不能将这种提示信息传达给使用辅助设备的用户 - 例如屏幕阅读器 - 或者色盲用户。

为了确保所有用户都能获取正确信息，Bootstrap 还提供了另一种提示方式。例如，你可以在表单控件的 `<label> `标签上以文本的形式显示提示信息（就像下面代码中所展示的）；包含一个 Glyphicon 字体图标 （还有赋予 `.sr-only `类的文本信息 - 参考Glyphicon 字体图标实例）；或者提供一个额外的 辅助信息 块。另外，对于使用辅助设备的用户，无效的表单控件还可以赋予一个 `aria-invalid="true"` 属性。

<div class="form-group has-success">
  <label class="control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess1">
</div>
<div class="form-group has-warning">
  <label class="control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control" id="inputWarning1">
</div>
<div class="form-group has-error">
  <label class="control-label" for="inputError1">Input with error</label>
  <input type="text" class="form-control" id="inputError1">
</div>
<div class="has-success">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxSuccess" value="option1">
      Checkbox with success
    </label>
  </div>
</div>
<div class="has-warning">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxWarning" value="option1">
      Checkbox with warning
    </label>
  </div>
</div>
<div class="has-error">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxError" value="option1">
      Checkbox with error
    </label>
  </div>
</div>

```
<div class="form-group has-success">
  <label class="control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess1">
</div>
<div class="form-group has-warning">
  <label class="control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control" id="inputWarning1">
</div>
<div class="form-group has-error">
  <label class="control-label" for="inputError1">Input with error</label>
  <input type="text" class="form-control" id="inputError1">
</div>
<div class="has-success">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxSuccess" value="option1">
      Checkbox with success
    </label>
  </div>
</div>
<div class="has-warning">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxWarning" value="option1">
      Checkbox with warning
    </label>
  </div>
</div>
<div class="has-error">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxError" value="option1">
      Checkbox with error
    </label>
  </div>
</div>

```

### 添加额外的图标
你还可以针对校验状态为输入框添加额外的图标。只需设置相应的 `.has-feedback `类并添加正确的图标即可。

**反馈图标（feedback icon）只能使用在文本输入框 `<input class="form-control">` 元素上。**


#### 图标、label 和输入控件组

对于不带有 `label` 标签的输入框以及右侧带有附加组件的输入框组，需要手动为其图标定位。为了让所有用户都能访问你的网站，我们强烈建议为所有输入框添加 `label` 标签。如果你不希望将 `label` 标签展示出来，可以通过添加 `.sr-only` 类来实现。如果的确不能添加 `label` 标签，请调整图标的 `top` 值。对于输入框组，请根据你的实际情况调整 `right` 值。

#### 向辅助技术设备传递图标的含义

为了确保辅助技术- 如屏幕阅读器 - 正确传达一个图标的含义，额外的隐藏的文本应包含在 `.sr-only` 类中，并明确关联使用了 `aria-describedby` 的表单控件。或者，以某些其他形式（例如，文本输入字段有一个特定的警告信息）传达含义，例如改变与表单控件实际相关联的 `<label> `的文本。

虽然下面的例子已经提到各自表单控件本身的 `<label>` 文本的验证状态，上述技术（使用 `.sr-only` 文本 和 `aria-describedby`) ）已经包括了需要说明的目的。

<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputSuccess2">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status">
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputSuccess2Status" class="sr-only">(success)</span>
</div>
<div class="form-group has-warning has-feedback">
  <label class="control-label" for="inputWarning2">Input with warning</label>
  <input type="text" class="form-control" id="inputWarning2" aria-describedby="inputWarning2Status">
  <span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
  <span id="inputWarning2Status" class="sr-only">(warning)</span>
</div>
<div class="form-group has-error has-feedback">
  <label class="control-label" for="inputError2">Input with error</label>
  <input type="text" class="form-control" id="inputError2" aria-describedby="inputError2Status">
  <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
  <span id="inputError2Status" class="sr-only">(error)</span>
</div>
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputGroupSuccess1">Input group with success</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
  </div>
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
</div>


```
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputSuccess2">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status">
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputSuccess2Status" class="sr-only">(success)</span>
</div>
<div class="form-group has-warning has-feedback">
  <label class="control-label" for="inputWarning2">Input with warning</label>
  <input type="text" class="form-control" id="inputWarning2" aria-describedby="inputWarning2Status">
  <span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
  <span id="inputWarning2Status" class="sr-only">(warning)</span>
</div>
<div class="form-group has-error has-feedback">
  <label class="control-label" for="inputError2">Input with error</label>
  <input type="text" class="form-control" id="inputError2" aria-describedby="inputError2Status">
  <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
  <span id="inputError2Status" class="sr-only">(error)</span>
</div>
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputGroupSuccess1">Input group with success</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
  </div>
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
</div>

```


#### 为水平排列的表单和内联表单设置可选的图标


<form class="form-horizontal">
  <div class="form-group has-success has-feedback">
    <label class="control-label col-sm-3" for="inputSuccess3">Input with success</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="inputSuccess3" aria-describedby="inputSuccess3Status">
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputSuccess3Status" class="sr-only">(success)</span>
    </div>
  </div>
  <div class="form-group has-success has-feedback">
    <label class="control-label col-sm-3" for="inputGroupSuccess2">Input group with success</label>
    <div class="col-sm-9">
      <div class="input-group">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" id="inputGroupSuccess2" aria-describedby="inputGroupSuccess2Status">
      </div>
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputGroupSuccess2Status" class="sr-only">(success)</span>
    </div>
  </div>
</form>

```
<form class="form-horizontal">
  <div class="form-group has-success has-feedback">
    <label class="control-label col-sm-3" for="inputSuccess3">Input with success</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="inputSuccess3" aria-describedby="inputSuccess3Status">
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputSuccess3Status" class="sr-only">(success)</span>
    </div>
  </div>
  <div class="form-group has-success has-feedback">
    <label class="control-label col-sm-3" for="inputGroupSuccess2">Input group with success</label>
    <div class="col-sm-9">
      <div class="input-group">
        <span class="input-group-addon">@</span>
        <input type="text" class="form-control" id="inputGroupSuccess2" aria-describedby="inputGroupSuccess2Status">
      </div>
      <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      <span id="inputGroupSuccess2Status" class="sr-only">(success)</span>
    </div>
  </div>
</form>
```

<form class="form-inline">
  <div class="form-group has-success has-feedback">
    <label class="control-label" for="inputSuccess4">Input with success</label>
    <input type="text" class="form-control" id="inputSuccess4" aria-describedby="inputSuccess4Status">
    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
    <span id="inputSuccess4Status" class="sr-only">(success)</span>
  </div>
</form>
<form class="form-inline">
  <div class="form-group has-success has-feedback">
    <label class="control-label" for="inputGroupSuccess3">Input group with success</label>
    <div class="input-group">
      <span class="input-group-addon">@</span>
      <input type="text" class="form-control" id="inputGroupSuccess3" aria-describedby="inputGroupSuccess3Status">
    </div>
    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
    <span id="inputGroupSuccess3Status" class="sr-only">(success)</span>
  </div>
</form>

```
<form class="form-inline">
  <div class="form-group has-success has-feedback">
    <label class="control-label" for="inputSuccess4">Input with success</label>
    <input type="text" class="form-control" id="inputSuccess4" aria-describedby="inputSuccess4Status">
    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
    <span id="inputSuccess4Status" class="sr-only">(success)</span>
  </div>
</form>
<form class="form-inline">
  <div class="form-group has-success has-feedback">
    <label class="control-label" for="inputGroupSuccess3">Input group with success</label>
    <div class="input-group">
      <span class="input-group-addon">@</span>
      <input type="text" class="form-control" id="inputGroupSuccess3" aria-describedby="inputGroupSuccess3Status">
    </div>
    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
    <span id="inputGroupSuccess3Status" class="sr-only">(success)</span>
  </div>
</form>

```


#### 可选的图标与设置 .sr-only 类的 label

如果你使用 `.sr-only` 类来隐藏表单控件的 `<label>` （而不是使用其它标签选项，如 `aria-label `属性）， 一旦它被添加，Bootstrap 会自动调整图标的位置。

<div class="form-group has-success has-feedback">
  <label class="control-label sr-only" for="inputSuccess5">Hidden label</label>
  <input type="text" class="form-control" id="inputSuccess5" aria-describedby="inputSuccess5Status">
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputSuccess5Status" class="sr-only">(success)</span>
</div>
<div class="form-group has-success has-feedback">
  <label class="control-label sr-only" for="inputGroupSuccess4">Input group with success</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="text" class="form-control" id="inputGroupSuccess4" aria-describedby="inputGroupSuccess4Status">
  </div>
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputGroupSuccess4Status" class="sr-only">(success)</span>
</div>

```
<div class="form-group has-success has-feedback">
  <label class="control-label sr-only" for="inputSuccess5">Hidden label</label>
  <input type="text" class="form-control" id="inputSuccess5" aria-describedby="inputSuccess5Status">
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputSuccess5Status" class="sr-only">(success)</span>
</div>
<div class="form-group has-success has-feedback">
  <label class="control-label sr-only" for="inputGroupSuccess4">Input group with success</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="text" class="form-control" id="inputGroupSuccess4" aria-describedby="inputGroupSuccess4Status">
  </div>
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputGroupSuccess4Status" class="sr-only">(success)</span>
</div>

```

## 控件尺寸
通过 `.input-lg` 类似的类可以为控件设置高度，通过 `.col-lg-*` 类似的类可以为控件设置宽度。

## 高度尺寸
创建大一些或小一些的表单控件以匹配按钮尺寸。

例如：

<input class="form-control input-lg" type="text" placeholder=".input-lg">
<input class="form-control" type="text" placeholder="Default input">
<input class="form-control input-sm" type="text" placeholder=".input-sm">

<select class="form-control input-lg">...</select>
<select class="form-control">...</select>
<select class="form-control input-sm">...</select>

```
<input class="form-control input-lg" type="text" placeholder=".input-lg">
<input class="form-control" type="text" placeholder="Default input">
<input class="form-control input-sm" type="text" placeholder=".input-sm">

<select class="form-control input-lg">...</select>
<select class="form-control">...</select>
<select class="form-control input-sm">...</select>
```


### 水平排列的表单组的尺寸
通过添加 `.form-group-lg` 或 `.form-group-sm` 类，为 `.form-horizontal` 包裹的 `label` 元素和表单控件快速设置尺寸。

例如：

<form class="form-horizontal">
  <div class="form-group form-group-lg">
    <label class="col-sm-2 control-label" for="formGroupInputLarge">Large label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputLarge" placeholder="Large input">
    </div>
  </div>
  <div class="form-group form-group-sm">
    <label class="col-sm-2 control-label" for="formGroupInputSmall">Small label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputSmall" placeholder="Small input">
    </div>
  </div>
</form>

```

<form class="form-horizontal">
  <div class="form-group form-group-lg">
    <label class="col-sm-2 control-label" for="formGroupInputLarge">Large label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputLarge" placeholder="Large input">
    </div>
  </div>
  <div class="form-group form-group-sm">
    <label class="col-sm-2 control-label" for="formGroupInputSmall">Small label</label>
    <div class="col-sm-10">
      <input class="form-control" type="text" id="formGroupInputSmall" placeholder="Small input">
    </div>
  </div>
</form>
```


### 调整列（column）尺寸
用栅格系统中的列（column）包裹输入框或其任何父元素，都可很容易的为其设置宽度。


例如：

<div class="row">
  <div class="col-xs-2">
    <input type="text" class="form-control" placeholder=".col-xs-2">
  </div>
  <div class="col-xs-3">
    <input type="text" class="form-control" placeholder=".col-xs-3">
  </div>
  <div class="col-xs-4">
    <input type="text" class="form-control" placeholder=".col-xs-4">
  </div>
</div>

```

<div class="row">
  <div class="col-xs-2">
    <input type="text" class="form-control" placeholder=".col-xs-2">
  </div>
  <div class="col-xs-3">
    <input type="text" class="form-control" placeholder=".col-xs-3">
  </div>
  <div class="col-xs-4">
    <input type="text" class="form-control" placeholder=".col-xs-4">
  </div>
</div>

```


## 辅助文本
针对表单控件的“块（block）”级辅助文本。

### 与表单控件相关联的帮助文本
与表单控件相关联的帮助文本 `aria-describedby` 属性的表单控件关联，这将确保使用辅助技术- 如屏幕阅读器 - 的用户获取控件焦点或进入控制时显示这个帮助文本。


<label class="sr-only" for="inputHelpBlock">Input with help text</label>
<input type="text" id="inputHelpBlock" class="form-control" aria-describedby="helpBlock">
<span id="helpBlock" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>




```
<label class="sr-only" for="inputHelpBlock">Input with help text</label>
<input type="text" id="inputHelpBlock" class="form-control" aria-describedby="helpBlock">
...
<span id="helpBlock" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
```

# 按钮

## 可作为按钮使用的标签或元素
为 `<a>`、`<button>` 或 `<input>` 元素添加按钮类（`button` class）即可使用 Bootstrap 提供的样式。




<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">

```
<a class="btn btn-default" href="#" role="button">Link</a>
<button class="btn btn-default" type="submit">Button</button>
<input class="btn btn-default" type="button" value="Input">
<input class="btn btn-default" type="submit" value="Submit">
```

### 针对组件的注意事项
虽然按钮类可以应用到 `<a>` 和` <button> `元素上，但是，导航和导航条组件只支持` <button>` 元素。

### 链接被作为按钮使用时的注意事项
如果 `<a> `元素被作为按钮使用 -- 并用于在当前页面触发某些功能 -- 而不是用于链接其他页面或链接当前页面中的其他部分，那么，务必为其设置 `role="button"` 属性。

### 跨浏览器展现
我们总结的最佳实践是：强烈建议尽可能使用 `<button>` 元素来获得在各个浏览器上获得相匹配的绘制效果。

另外，我们还发现了 Firefox 小于30 版本的浏览器上出现的一个 bug，其表现是：阻止我们为基于` <input>` 元素所创建的按钮设置 `line-height` 属性，这就导致在 Firefox 浏览器上不能完全和其他按钮保持一致的高度。


## 预定义样式
使用下面列出的类可以快速创建一个带有预定义样式的按钮。


<!-- Standard button -->
<button type="button" class="btn btn-default">（默认样式）Default</button>

<!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
<button type="button" class="btn btn-primary">（主品牌色）Primary</button>

<!-- Indicates a successful or positive action -->
<button type="button" class="btn btn-success">（成功）Success</button>

<!-- Contextual button for informational alert messages -->
<button type="button" class="btn btn-info">（一般信息）Info</button>

<!-- Indicates caution should be taken with this action -->
<button type="button" class="btn btn-warning">（警告）Warning</button>

<!-- Indicates a dangerous or potentially negative action -->
<button type="button" class="btn btn-danger">（危险）Danger</button>

<!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
<button type="button" class="btn btn-link">（链接）Link</button>

```
<!-- Standard button -->
<button type="button" class="btn btn-default">（默认样式）Default</button>

<!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
<button type="button" class="btn btn-primary">（首选项）Primary</button>

<!-- Indicates a successful or positive action -->
<button type="button" class="btn btn-success">（成功）Success</button>

<!-- Contextual button for informational alert messages -->
<button type="button" class="btn btn-info">（一般信息）Info</button>

<!-- Indicates caution should be taken with this action -->
<button type="button" class="btn btn-warning">（警告）Warning</button>

<!-- Indicates a dangerous or potentially negative action -->
<button type="button" class="btn btn-danger">（危险）Danger</button>

<!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
<button type="button" class="btn btn-link">（链接）Link</button>
```

### Conveying meaning to assistive technologies

为按钮添加不同的颜色只是一种视觉上的信息表达方式，但是，对于使用辅助技术 -- 例如屏幕阅读器 -- 的用户来说，颜色是不可见的。建议，确保通过颜色表达的信息或者通过内容自身表达出来（按钮上的文字），或者通过其他方式 -- 例如通过 `.sr-only` 类隐藏的额外文本 -- 表达出来。

## 尺寸
需要让按钮具有不同尺寸吗？使用 `.btn-lg`、`.btn-sm` 或 `.btn-xs` 就可以获得不同尺寸的按钮。

<p>
  <button type="button" class="btn btn-primary btn-lg">（大按钮）Large button</button>
  <button type="button" class="btn btn-default btn-lg">（大按钮）Large button</button>
</p>
<p>
  <button type="button" class="btn btn-primary">（默认尺寸）Default button</button>
  <button type="button" class="btn btn-default">（默认尺寸）Default button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-sm">（小按钮）Small button</button>
  <button type="button" class="btn btn-default btn-sm">（小按钮）Small button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-xs">（超小尺寸）Extra small button</button>
  <button type="button" class="btn btn-default btn-xs">（超小尺寸）Extra small button</button>
</p>

```
<p>
  <button type="button" class="btn btn-primary btn-lg">（大按钮）Large button</button>
  <button type="button" class="btn btn-default btn-lg">（大按钮）Large button</button>
</p>
<p>
  <button type="button" class="btn btn-primary">（默认尺寸）Default button</button>
  <button type="button" class="btn btn-default">（默认尺寸）Default button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-sm">（小按钮）Small button</button>
  <button type="button" class="btn btn-default btn-sm">（小按钮）Small button</button>
</p>
<p>
  <button type="button" class="btn btn-primary btn-xs">（超小尺寸）Extra small button</button>
  <button type="button" class="btn btn-default btn-xs">（超小尺寸）Extra small button</button>
</p>

```

通过给按钮添加 `.btn-block` 类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素。

<button type="button" class="btn btn-primary btn-lg btn-block">（块级元素）Block level button</button>
<button type="button" class="btn btn-default btn-lg btn-block">（块级元素）Block level button</button>

```
<button type="button" class="btn btn-primary btn-lg btn-block">（块级元素）Block level button</button>
<button type="button" class="btn btn-default btn-lg btn-block">（块级元素）Block level button</button>
```

## 激活状态

当按钮处于激活状态时，其表现为被按压下去（底色更深、边框夜色更深、向内投射阴影）。对于 `<button>` 元素，是通过` :active `状态实现的。对于 `<a>` 元素，是通过` .active `类实现的。然而，你还可以将` .active` 应用到 `<button> `上（包含 `aria-pressed="true"` 属性)），并通过编程的方式使其处于激活状态。

### button 元素
由于` :active` 是伪状态，因此无需额外添加，但是在需要让其表现出同样外观的时候可以添加 `.active` 类。

<button type="button" class="btn btn-primary btn-lg active">Primary button</button>
<button type="button" class="btn btn-default btn-lg active">Button</button>

```
<button type="button" class="btn btn-primary btn-lg active">Primary button</button>
<button type="button" class="btn btn-default btn-lg active">Button</button>
```

### 链接（`<a>`）元素

可以为基于 `<a>` 元素创建的按钮添加` .active` 类。


<a href="#" class="btn btn-primary btn-lg active" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg active" role="button">Link</a>

```
<a href="#" class="btn btn-primary btn-lg active" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg active" role="button">Link</a>
```

## 禁用状态
通过为按钮的背景设置 `opacity` 属性就可以呈现出无法点击的效果。

### button 元素
为 `<button>` 元素添加 `disabled` 属性，使其表现出禁用状态。

例如：


<button type="button" class="btn btn-lg btn-primary" disabled="disabled">Primary button</button>
<button type="button" class="btn btn-default btn-lg" disabled="disabled">Button</button>

```
<button type="button" class="btn btn-lg btn-primary" disabled="disabled">Primary button</button>
<button type="button" class="btn btn-default btn-lg" disabled="disabled">Button</button>
```

#### 跨浏览器兼容性
如果为` <button>` 元素添加 `disabled` 属性，Internet Explorer 9 及更低版本的浏览器将会把按钮中的文本绘制为灰色，并带有恶心的阴影，目前我们还没有解决办法。

### 链接（`<a>`）元素

为基于` <a> `元素创建的按钮添加` .disabled `类。

<a href="#" class="btn btn-primary btn-lg disabled" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg disabled" role="button">Link</a>

```
<a href="#" class="btn btn-primary btn-lg disabled" role="button">Primary link</a>
<a href="#" class="btn btn-default btn-lg disabled" role="button">Link</a>
```

我们把` .disabled `作为工具类使用，就像` .active `类一样，因此不需要增加前缀。

#### 链接的原始功能不受影响

上面提到的类只是通过设置 `pointer-events: none `来禁止 `<a>` 元素作为链接的原始功能，但是，这一 CSS 属性并没有被标准化，并且 Opera 18 及更低版本的浏览器并没有完全支持这一属性，同样，Internet Explorer 11 也不支持。In addition, even in browsers that do support pointer-events: none, keyboard navigation remains unaffected, meaning that sighted keyboard users and users of assistive technologies will still be able to activate these links. 因此，为了安全起见，建议通过 JavaScript 代码来禁止链接的原始功能。


# 图片

## 响应式图片

在 Bootstrap 版本 3 中，通过为图片添加 `.img-responsive` 类可以让图片支持响应式布局。其实质是为图片设置了 `max-width: 100%;、 height: auto; 和 display: block;` 属性，从而让图片在其父元素中更好的缩放。

如果需要让使用了 `.img-responsive` 类的图片水平居中，请使用 `.center-block `类，不要用` .text-center`。 请参考助手类章节 了解更多关于 `.center-block` 的用法。

#### SVG 图像和 IE 8-10
在 Internet Explorer 8-10 中，设置为 `.img-responsive` 的 SVG 图像显示出的尺寸不匀称。为了解决这个问题，在出问题的地方添加 `width: 100% \9; `即可。Bootstrap 并没有自动为所有图像元素设置这一属性，因为这会导致其他图像格式出现错乱。

<img data-src="holder.js/200x100" class="img-responsive" alt="Responsive image" />

```
<img src="..." class="img-responsive" alt="Responsive image">
```

## 图片形状

通过为 `<img>` 元素添加以下相应的类，可以让图片呈现不同的形状。

#### 跨浏览器兼容性

请时刻牢记：Internet Explorer 8 不支持 CSS3 中的圆角属性。

<img data-src="holder.js/100x100" alt="..." class="img-rounded">
<img data-src="holder.js/100x100" alt="..." class="img-circle">
<img data-src="holder.js/100x100" class="img-thumbnail">


```
<img src="..." alt="..." class="img-rounded">
<img src="..." alt="..." class="img-circle">
<img src="..." alt="..." class="img-thumbnail">

```


# 辅助类

## 情境文本颜色

通过颜色来展示意图，Bootstrap 提供了一组工具类。这些类可以应用于链接，并且在鼠标经过时颜色可以还可以加深，就像默认的链接一样。

例如：

<p class="text-muted">...情境文本颜色</p>
<p class="text-primary">...情境文本颜色</p>
<p class="text-success">...情境文本颜色</p>
<p class="text-info">...情境文本颜色</p>
<p class="text-warning">...情境文本颜色</p>
<p class="text-danger">...情境文本颜色</p>

```
<p class="text-muted">...</p>
<p class="text-primary">...</p>
<p class="text-success">...</p>
<p class="text-info">...</p>
<p class="text-warning">...</p>
<p class="text-danger">...</p>

```

#### 处理差异
Sometimes emphasis classes cannot be applied due to the specificity of another selector. In most cases, a sufficient workaround is to wrap your text in a `<span>` with the class.

#### Conveying meaning to assistive technologies

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (the contextual colors are only used to reinforce meaning that is already present in the text/markup), or is included through alternative means, such as additional text hidden with the .sr-only class.

## 情境背景色

和情境文本颜色类一样，使用任意情境背景色类就可以设置元素的背景。链接组件在鼠标经过时颜色会加深，就像上面所讲的情境文本颜色类一样。

例如：
<p class="bg-primary">...</p>
<p class="bg-success">...</p>
<p class="bg-info">...</p>
<p class="bg-warning">...</p>
<p class="bg-danger">...</p>


```
<p class="bg-primary">...</p>
<p class="bg-success">...</p>
<p class="bg-info">...</p>
<p class="bg-warning">...</p>
<p class="bg-danger">...</p>

```

## 关闭按钮

通过使用一个象征关闭的图标，可以让模态框和警告框消失。

例如：



<button type="button" class="close" aria-label="Close">

<span aria-hidden="true">×</span>

</button>



`<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`

## 三角符号
通过使用三角符号可以指示某个元素具有下拉菜单的功能。注意，向上弹出式菜单中的三角符号是反方向的。


<span class="caret"></span>

```
<span class="caret"></span>
```


## 快速浮动

通过添加一个类，可以将任意元素向左或向右浮动。`!important` 被用来明确 CSS 样式的优先级。这些类还可以作为 mixin（参见 less 文档） 使用。

<div class="pull-left">

<img data-src="holder.js/100x100?text=左浮动" alt="..." >

</div>
<div class="pull-right">

<img data-src="holder.js/100x100?text=右浮动" alt="..." >

</div>

<div class="clearfix"></div>

```
<div class="pull-left">

<img data-src="holder.js/100x100" alt="..." >

</div>

<div class="pull-right">

<img data-src="holder.js/100x100" alt="..." >

</div>

```

#### 不能用于导航条组件中
排列导航条中的组件时可以使用这些工具类：.navbar-left 或 .navbar-right 。 参见导航条文档以获取更多信息。

## 让内容块居中
为任意元素设置 `display: block `属性并通过 `margin` 属性让其中的内容居中。

<div class="center-block">

<img data-src="holder.js/100x100" alt="..."  class="center-block">

</div>

<div class="clearfix"></div>

```
<div class="center-block">...</div>
```

## 清除浮动
通过为父元素添加 `.clearfix` 类可以很容易地清除浮动（`float`）。

```
<!-- Usage as a class -->
<div class="clearfix">...</div>
```


## 显示或隐藏内容
`.show` 和 `.hidden` 类可以强制任意元素显示或隐藏(对于屏幕阅读器也能起效)。这些类通过 `!important `来避免 CSS 样式优先级问题，就像 quick floats 一样的做法。

注意，这些类只对块级元素起作用，另外，还可以作为 mixin 使用。

`.hide` 类仍然可用，但是它不能对屏幕阅读器起作用，并且从 v3.0.1 版本开始就不建议使用了。请使用 `.hidden` 或 `.sr-only` 。

另外，`.invisible` 类可以被用来仅仅影响元素的可见性，也就是说，元素的 display 属性不被改变，并且这个元素仍然能够影响文档流的排布。

```
<div class="show">...</div>
<div class="hidden">...</div>
```

## 屏幕阅读器和键盘导航
`.sr-only` 类可以对屏幕阅读器以外的设备隐藏内容。`.sr-only` 和 `.sr-only-focusable` 联合使用的话可以在元素有焦点的时候再次显示出来（例如，使用键盘导航的用户）。对于遵循 可访问性的最佳实践 很有必要。这个类也可以作为 mixin 使用。

```
<a class="sr-only sr-only-focusable" href="#content">Skip to main content</a>
```



## 图片替换
使用 `.text-hide` 类或对应的 mixin 可以用来将元素的文本内容替换为一张背景图。

```
<h1 class="text-hide">Custom heading</h1>
```

# 响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。另外还包含了针对打印机显示或隐藏内容的工具类。

有针对性的使用这类工具类，从而避免为同一个网站创建完全不同的版本。相反，通过使用这些工具类可以在不同设备上提供不同的展现形式。

## 可用的类
通过单独或联合使用以下列出的类，可以针对不同屏幕尺寸隐藏或显示页面内容。

<div class="table-responsive">
    <table class="table table-bordered table-striped responsive-utilities">
      <thead>
        <tr>
          <th></th>
          <th>
            超小屏幕
            <small>手机 (&lt;768px)</small>
          </th>
          <th>
            小屏幕
            <small>平板 (≥768px)</small>
          </th>
          <th>
            中等屏幕
            <small>桌面 (≥992px)</small>
          </th>
          <th>
            大屏幕
            <small>桌面 (≥1200px)</small>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><code>.visible-xs-*</code></th>
          <td class="is-visible">可见</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-hidden">隐藏</td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-sm-*</code></th>
          <td class="is-hidden">隐藏</td>
          <td class="is-visible">可见</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-hidden">隐藏</td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-md-*</code></th>
          <td class="is-hidden">隐藏</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-visible">可见</td>
          <td class="is-hidden">隐藏</td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-lg-*</code></th>
          <td class="is-hidden">隐藏</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-visible">可见</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th scope="row"><code>.hidden-xs</code></th>
          <td class="is-hidden">隐藏</td>
          <td class="is-visible">可见</td>
          <td class="is-visible">可见</td>
          <td class="is-visible">可见</td>
        </tr>
        <tr>
          <th scope="row"><code>.hidden-sm</code></th>
          <td class="is-visible">可见</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-visible">可见</td>
          <td class="is-visible">可见</td>
        </tr>
        <tr>
          <th scope="row"><code>.hidden-md</code></th>
          <td class="is-visible">可见</td>
          <td class="is-visible">可见</td>
          <td class="is-hidden">隐藏</td>
          <td class="is-visible">可见</td>
        </tr>
        <tr>
          <th scope="row"><code>.hidden-lg</code></th>
          <td class="is-visible">可见</td>
          <td class="is-visible">可见</td>
          <td class="is-visible">可见</td>
          <td class="is-hidden">隐藏</td>
        </tr>
      </tbody>
    </table>
  </div>

从 v3.2.0 版本起，形如 `.visible-*-* `的类针对每种屏幕大小都有了三种变体，每个针对 CSS 中不同的 `display` 属性，列表如下：

<div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>类组</th>
          <th>CSS <code>display</code></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><code>.visible-*-block</code></th>
          <td><code>display: block;</code></td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-*-inline</code></th>
          <td><code>display: inline;</code></td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-*-inline-block</code></th>
          <td><code>display: inline-block;</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  


因此，以超小屏幕（xs）为例，可用的 `.visible-*-* `类是：`.visible-xs-block`、`.visible-xs-inline` 和 `.visible-xs-inline-block`。

`.visible-xs`、`.visible-sm`、`.visible-md` 和 `.visible-lg` 类也同时存在。但是从 v3.2.0 版本开始不再建议使用。除了 `<table>` 相关的元素的特殊情况外，它们与 `.visible-*-block` 大体相同。

## 打印类
和常规的响应式类一样，使用下面的类可以针对打印机隐藏或显示某些内容。

<div class="table-responsive">
    <table class="table table-bordered table-striped responsive-utilities">
      <thead>
        <tr>
          <th>class</th>
          <th>浏览器</th>
          <th>打印机</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <code>.visible-print-block</code><br>
            <code>.visible-print-inline</code><br>
            <code>.visible-print-inline-block</code>
          </th>
          <td class="is-hidden">隐藏</td>
          <td class="is-visible">可见</td>
        </tr>
        <tr>
          <th scope="row"><code>.hidden-print</code></th>
          <td class="is-visible">可见</td>
          <td class="is-hidden">隐藏</td>
        </tr>
      </tbody>
    </table>
  </div>

  

`.visible-print `类也是存在的，但是从 v3.2.0 版本开始不建议使用。它与 `.visible-print-block` 类大致相同，除了 `<table> `相关元素的特殊情况外。


