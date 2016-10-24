---
layout: post
title: 3.重要知识准备：基础样式及自定义简介
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap base css
description: Bootstrap提供了关于排版、代码、表格、表单、按钮等页面要素的基础样式。本章将提供一个概要的说明，指引大家如何学习并掌握Bootstrap的基础样式，这对于后端工程师来说已经足够。对于样式的审美不同人有不同的看法，特别是专业的前端工程师对页面效果会有更高的追求，覆盖或改写Bootstrap样式是这类人群的必备技能。
---
>Bootstrap提供了关于排版、代码、表格、表单、按钮等页面要素的基础样式。本章将提供一个概要的说明，指引大家如何学习并掌握Bootstrap的基础样式，这对于后端工程师来说已经足够。对于样式的审美不同人有不同的看法，特别是专业的前端工程师对页面效果会有更高的追求，覆盖或改写Bootstrap样式是这类人群的必备技能。

- 何处学习Bootstrap基础样式
- 通过覆盖样式进行自定义
- 通过修改源码进行自定义

# 一 何处学习Bootstrap基础样式

1.你应该移步到[Bootstrap中文网](http://v3.bootcss.com/css/)去阅读这部分内容，建议自上而下通读一遍，把里面的代码亲自测一遍。

**这个步骤是必不可少的。**

2.由于栅格（网格）布局系统我们已经讲过了，所以你可以选择性地跳过该部分内容。

3.boots预定义了`html,body,input,button,select,textarea,a,img,hr`等标签的基础样式，你只需引入css文件就能获得，而另外的样式是以css类的形式提供的，使用时需显式给便签赋予某种样式。

# 二 通过覆盖样式进行自定义

如果你已经熟悉boots的基础样式类，那就可以进行覆盖了——针对Bootstrap中使用的class编写你自己的样式。

我们先看一个使用[button的例子](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/04/buttons.html)，它来自boots中文网，效果如下：

![Alt text](/public/img/boots/4.2.png)

现在我们自定义一份样式表，来让按钮更加圆滑：

    .btn{  
      -webkit-border-radius :20px;  
      -moz-border-radius    :20px;  
      border-radius         :20px;  
    }

在buttons.html中引入后，效果如下：

![Alt text](/public/img/boots/4.3.png)

可以看到，按钮更加圆润了。

这种方法的优点在于它几乎不会改变你的工作流程。即便使用了Bootstrap，你还是需要自己的样式表来使框架适合你的内容。你可能没有意识到，Bootstrap自己的网站还依赖了除Bootstrap框架外的上千行样式。

但是对于更彻底的修改(比如重新设计导航栏)或是非局部的修改(比如修改适用于整个网站的高亮颜色)来说，这样东一块，西一块的覆盖样式更像是一种打补丁式的解决方案。而且你的新样式要添加到Bootstrap的默认样式表里，让本已经100 KB的文件越发臃肿。如果你不仅仅想要做一些覆盖，那就要考虑一种更具扩展性的方法了。

# 三 何处学习Less的基础知识

你应该移步到[LESS快速入门](/heter/css-whatislesscss)去阅读这部分内容，掌握关于less的基础知识。

本例使用less这个node命令行工具来进行less文件的编译

- 安装node
- 执行命令：`npm install less -g  `
- 编译命令：`lessc example/example.less example/example.css`

# 四 尝试编译boots的less文件

Bootstrap的样式是用LESS而不是CSS写的。LESS 是一种动态样式表语言，相比于CSS，它支持多种优秀特性，包括选择器嵌套，创建变量。一旦写完，你可以选择将LESS代码预先或在运行时编译成 CSS。如果你喜欢 Sass，可以使用这个[适用于Sass的Bootstrap](https://github.com/thomas-mcdonald/bootstrap-sass)。

我们下载的bootstrap源码包内有一个less文件夹，现在我们将它整体拷贝到bootstrapDemo的assets目录下，清除css目录下的所有文件（可通过less编译生成）。

```shell
.
├── 01
├── 02
├── 03
├── 04
├── assets
│   ├── css
│   ├── fonts
│   ├── js
│   └── less
```

less目录下有如此多的less文件，它们是按照组件的思维来划分的，每个文件名都能很好地说明自身的作用：

```
alerts.less         modals.less
badges.less         navbar.less
bootstrap.less      navs.less
breadcrumbs.less    normalize.less
button-groups.less  pager.less
buttons.less        pagination.less
carousel.less       panels.less
close.less          popovers.less
code.less           print.less
progress-bars.less  component-animations.less
dropdowns.less      responsive-embed.less
forms.less          responsive-utilities.less
glyphicons.less     scaffolding.less
grid.less           tables.less
input-groups.less   theme.less
jumbotron.less      thumbnails.less
labels.less         tooltip.less
list-group.less     type.less
media.less          utilities.less
mixins              variables.less
mixins.less         wells.less
```

我们先找到入口文件：bootstrap.less，然后执行命令：

    lessc bootstrap.less ../css/bootstrap.min.css -x

`-x`选项指示命令对css文件进行压缩，我们将编译产出输出至css目录下，命名为bootstrap.min.css（因为页面中是以这个路径引入的）。

# 五 bootstrap.less文件

打开这个文件，里面全是`@import`，因为这个文件是一个汇总性的文件，它负责把各模块化的less文件按顺序导入，先导入的文件里面有后续文件要用到的变量或混入。源码中已经有注释，不过我们还是要说明下每个文件的作用：

    /*Core variables and mixins*/
    /*核心变量和混入*/
    /*定义各种变量*/
    @import "variables.less";  
    /*定义各种混入*/
    @import "mixins.less";

    /*Reset and dependencies*/
    /*基本重置与字体依赖*/
    @import "normalize.less";
    @import "print.less";
    @import "glyphicons.less";

    // Core CSS
    /*基本样式*/
    /*脚手架，body及字体的重置*/
    @import "scaffolding.less";
    /*与排版有关的样式*/
    @import "type.less";
    /*与代码有关的样式*/
    @import "code.less";
    /*网格布局的样式定义*/
    @import "grid.less";
    /*与表格相关的样式*/
    @import "tables.less";
    /*与表单相关的样式*/
    @import "forms.less";
    /*与按钮相关的样式*/
    @import "buttons.less";

    // Components，组件样式
    ...
    // Components w/ JavaScript，插件样式
    ...
    // Utility classes，工具类


# 六 如何进行自定义

## 1.攻略

- 由于boots采用了良好的变量定义以及基于变量的运算，所以通常情况下修改变量就能达到修改整体的目的；所以我们修改最多的是variables.less文件；
- 也有可能boots并未实现你想要的效果，这时你需要新增一些样式属性，那就需要修改具体的LESS文件来进行自定义了。

## 2.模块化你的修改

为了对比原有代码，不让修改的内容与原始文件纠缠在一起，如果我们要修改某个less文件，最好拷贝一份并重命名为“__原文件名”，然后到`bootstrap.less`中修改`@import`指令，例如我们要修改variables.less中的内容，我们应先拷贝为“__variables.less”然后再修改，这样我们很容易知道哪个是自定义的，然后到`bootstrap.less`中改为`@import "__variables.less"; `

## 3.技巧与技术

阅读官方文档，熟悉所有组件，深入学习源码。如果你经常需要自定义Bootstrap，在这些内容上的投入所带来的回报将会物超所值。

- **先从变量开始**
当你使用生成器或者直接编辑源码时，先从它们支持的变量开始修改。你会发现它们就已经能够满足你的需求了。改变导航栏与基本颜色就是一个重大起步。
- **选择配色方案**
考虑网站的配色方案，特别是主要与次要颜色。网上还有很多类似定制bootstrap的网站，比如[Bootswatchr网站](http://bootswatchr.com/)使用变量来组织（个人感觉不好用）。[BootTheme](http://www.boottheme.com/)添加了扔骰子特性来随机设置值（国内可能无法访问）。如果幸运女神不站在你这边，[Lavish](http://www.lavishbootstrap.com/)能够根据你提供的任何图片来生成一个主题，[PaintStrap](http://paintstrap.com/)则是根据已有的配色方案来生成。

**不过对于我们这些码农，UI设计配色完全一窍不通，有没有直接可以拿来即用的方案呢？这里要推荐的就是[http://bootswatch.com/](http://bootswatch.com/) 这个网站了！**

[Bootswatch](http://bootswatch.com/)这个网站提供了十几种配置好的配色方案，完全免费提供大家使用。

- **增加一些资源**
[纹理背景](http://subtlepatterns.com/)与自定义字体能让世界变得大不相同。对于Web字体，你可以在代码中的任何位置加入`@import`语句，LESS会自动将生成的CSS代码提升到顶部。我比较喜欢将这些内容放到"__custom.less"文件的顶部。
- **使用alpha透明**
当增加`box-shadow`和`text-shadow`这样的效果时，颜色使用[RGBa](https://css-tricks.com/rgba-browser-support/)来定义，为旧的浏览器做好降级处理，始终使用这样的值。这会为你的组件增加内聚性。
- **匹配选择器**
当要覆盖一个类时，试着采用Bootstrap中使用的选择器。这会保证你的类与原始类保持同步，还避免了不断升级的特异性战争。记住一点，特异性相同的情况下，后写的选择器生效。经过上面的模块化处理，你的自定义内容将始终覆盖掉原始内容。
- **封装你的代码**
记住LESS允许嵌套选择器。利用这个特性来封装每个组件。我发现这对于保持代码的整洁与可读性有很大帮助。两段效果相同的代码里，但不要这么使用...

```css
.navbar .brand {
  color: @white;
}

.navbar .nav > li > a {
  color: @grayLighter;
} 
```

　　试试这个：

    .navbar {
      .brand {
        color: @white;
      }

      .nav > li > a {
        color: @grayLighter;
      }
    }   

* **善用混合(mixin)**
LESS提供了便利的混合，比如说`lighten()`与`darken()`。Bootstrap在mixins.less中定义的内容也归你支配。并且不要忘记，你可以随时创建自己的混合。
* **配合实例学习**
看看其他人是如何自定义Bootstrap的。例如，从GitHub可以获取到不少[主题代码](https://github.com/thomaspark/bootswatch/tree/gh-pages)。

## 4.小小的实验

>使用bootswatch的某个主题为网站整体换肤

* 在某个目录下，执行克隆：`git clone https://github.com/thomaspark/bootswatch.git`
* 至bootswatch/simplex目录下找到variables.less文件，将其拷贝重命名为“__variable.less”，然后剪切到我们的less目录
* 修改bootstrap.less文件

```css
@import "__variables.less";
```

* 编译bootstrap.less至04/bootstrap.min.css，拷贝上一章的页面（博客的文章页）至04目录并修改link:

```html
<!-- 引用当前目录下新生成的样式 -->
<link href="./bootstrap.min.css" rel="stylesheet">
```

* 刷新页面查看效果

![Alt text](/public/img/boots/4.1.png)

*字体变了，链接红了*

　　你应该敏锐地感觉到，字体变了、字号也变了，特别是链接的颜色变了。

* 因为这个页面的要素还很少，所以对比不是那么强烈，可以尝试让我们之前的buttons.html引用当前目录下新生成的样式，就可以对比出各种按钮的颜色了：

```html
<!-- <link href="../assets/css/bootstrap.min.css" rel="stylesheet"> -->
<link href="./bootstrap.min.css" rel="stylesheet">
<!-- 覆写的样式，主要覆盖了.btn类 -->
<link rel="stylesheet" href="style.css">
```

　　效果：

![Alt text](/public/img/boots/4.4.png)

*default和primary都有变化*

## 小结

这里我们给了些自定义的建议，并整个利用别人做好的主题来替换variable.less文件，个中细节没有详细解释，如果想了解boots变量的含义，请移步→[boots变量详解](/boots-reference/boots-ref-variable)。

# 七 总结

当你了解了boots的基础样式后，你可以直接使用这些丰富的样式类；如果有自定义需求，有两种选择①通过覆盖的方式②修改boots的源码并自行构建，前提是你了解less。
