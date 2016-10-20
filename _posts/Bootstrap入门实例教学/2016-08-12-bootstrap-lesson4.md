---
layout: post
title: Bootstrap基础样式及自定义
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap base css
description: Bootstrap提供了关于排版、代码、表格、表单、按钮等页面要素的基础样式。本章将提供一个概要的说明，指引大家如何学习并掌握Bootstrap的基础样式，这对于后端工程师来说已经足够。对于样式的审美不同人有不同的看法，特别是专业的前端工程师对页面效果会有更高的追求，改写Bootstrap样式是这类人群的必备技能。
---
>Bootstrap提供了关于排版、代码、表格、表单、按钮等页面要素的基础样式。本章将提供一个概要的说明，指引大家如何学习并掌握Bootstrap的基础样式，这对于后端工程师来说已经足够。对于样式的审美不同人有不同的看法，特别是专业的前端工程师对页面效果会有更高的追求，改写Bootstrap样式是这类人群的必备技能。

- 何处学习Bootstrap基础样式
- 何处学习Less的基础知识
- 如何自定义Bootstrap样式

# 一 何处学习Bootstrap基础样式

1.你应该移步到[Bootstrap中文网](http://v3.bootcss.com/css/)去阅读这部分内容，建议自上而下通读一遍，把里面的代码亲自测一遍。

**这个步骤是必不可少的。**

2.由于栅格（网格）布局系统我们已经讲过了，所以你可以选择性地跳过该部分内容。

3.boots预定义了`html,body,input,button,select,textarea,a,img,hr`等标签的基础样式，你只需引入css文件就能获得，而另外的样式是以css类的形式提供的，使用时需显式给便签赋予某种样式。

# 二 何处学习Less的基础知识

你应该移步到[LESS快速入门](/heter/css-whatislesscss)去阅读这部分内容，掌握关于less的基础知识。

本例使用less这个node命令行工具来进行less文件的编译

- 安装node
- 执行命令：`npm install less -g  `
- 编译命令：`lessc example/example.less example/example.css`

# 三 尝试编译boots的less文件

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

less目录下有如此多的less文件：

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

验证：我们运行之前的那些页面，效果上不变，这就说明编译后的文件和路径都没问题。其实css下我们一开始从boots的dist目录下拷贝而来的那些样式文件，本身就是less编译产生的。

# 四 bootstrap.less文件

打开这个文件，里面全是`@import`，因为这个文件是一个汇总性的文件，它负责把各模块化的less文件按顺序导入，后面要依赖的先导入。源码中已经有注释，不过我们还是要说明下每个文件的作用：

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


# 五 如何进行自定义

## 1.攻略

- 由于boots采用了良好的变量定义以及基于变量的运算，所以通常情况下修改变量就能达到修改整体的目的；所以我们修改最多的是variables.less文件；
- 也有可能boots并未实现你想要的效果，这时你需要新增一些样式属性，那就需要找到具体的选择器来进行修改了

## 2.注意

为了对比原有代码，如果我们要修改某个less文件，最好拷贝一份并重命名为“__原文件名”，然后到`bootstrap.less`中修改`@import`指令，例如我们要修改variables.less中的内容，我们应先拷贝为“__variables.less”然后再修改，这样我们很容易知道哪个是自定义的，然后到`bootstrap.less`中改为`@import "__variables.less"; `

## 3.小小的实验

>改变字体大小、颜色、超链接颜色

* 请按上面第二点操作一下
* 找到variables.less的第31行，这里定义了文本颜色，我们将其改为
`@text-color:            @gray-darker;`

　　向上搜索`@gray-dark`和`@gray-darker`，他们都是基于`@gray-base`计算出来的，我们这里直接修改了`@text-color`，你也可以通过修改`@gray-dark`或者`@gray-base`，但越往上影响范围越大。

* 找到第52行，这里定义了字体大小，如果你认为14px不合适，就可以修改：
`@font-size-base:          16px;`
* 找到第34行，这里定义了超链接颜色，发现由`@brand-primary`统一定义，我们可以直接修改第17行将主品牌颜色修改：`@brand-primary:         red; `
　　故意修改为红色，是为了突出效果。

* 重新编译后，刷新上一章的页面，可以看到我们修改后的成果：

![Alt text](/public/img/boots/4.1.png)

*字体大了、黑了，链接红了*

# 六 总结

当你了解了boots的基础样式后，你可以直接使用这些丰富的样式类；如果有自定义需求，首先应该了解less文件的组织、编译以及variables.less中变量的意义，了解了这些之后你就能轻松地基于boots提供的基础架构来设计一套基础样式了。

下一章，我们将介绍variables.less中的那些核心变量。