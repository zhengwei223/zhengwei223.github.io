---
layout: post
title: LESS快速入门
category: heter
tags: Web前端 less
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 less
p_cate: 前端那些事儿

---

# 什么是LESSCSS

LESSCSS是一种动态样式语言，属于CSS预处理语言的一种，它使用类似CSS的语法，为CSS的赋予了动态语言的特性，如变量、继承、运算、函数等，更方便CSS的编写和维护。

LESSCSS可以在多种语言、环境中使用，包括浏览器端、桌面客户端、服务端。

语言特性快速预览：

## 变量
变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。这样在做全局样式调整的时候我们可能只需要修改几行代码就可以了。

LESS源码：

```css
@color: #4D926F;

#header {
    color: @color;
}
h2 {
    color: @color;
}
```

编译后的CSS：

```css
#header {
    color: #4D926F;
}
h2 {
    color: #4D926F;
}
```


## 混合（Mixins）

混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。我们还可以带参数地调用Mixin，就像使用函数一样。

LESS源码：

```css
/*这是一个混合函数*/
.rounded-corners (@radius: 5px) {
    -webkit-border-radius : @radius;
    -moz-border-radius    : @radius;
    -ms-border-radius     : @radius;
    -o-border-radius      : @radius;
    border-radius         : @radius;
}

#header {
    /*不带参，用默认值*/
    .rounded-corners;
}
#footer {
    /*带参调用混合函数*/
    .rounded-corners(10px);
}
```

编译后的CSS：

```css
#header {
    -webkit-border-radius : 5px;
    -moz-border-radius    : 5px;
    -ms-border-radius     : 5px;
    -o-border-radius      : 5px;
    border-radius         : 5px;
}
#footer {
    -webkit-border-radius : 10px;
    -moz-border-radius    : 10px;
    -ms-border-radius     : 10px;
    -o-border-radius      : 10px;
    border-radius         : 10px;
}
```

## 嵌套

我们可以在一个选择器中嵌套另一个选择器来实现继承，这样很大程度减少了代码量，并且代码看起来更加的清晰。

LESS源码：

```css
#header {
    h1 {
        font-size   : 26px;
        font-weight : bold;
    }
    p {
        font-size: 12px;
        /*首先沿用上级样式*/
        a {
            /*可以覆盖、新增*/
            text-decoration: none;
            &:hover {
                border-width: 1px
            }
        }
    }
}
```

编译后的CSS：

```css
#header h1 {
    font-size   : 26px;
    font-weight : bold;
}
#header p {
    font-size: 12px;
}
#header p a {
    text-decoration: none;
}
#header p a:hover {
    border-width: 1px;
}
```

## 函数和运算

运算提供了加，减，乘，除操作；我们可以做属性值和颜色的运算，这样就可以实现属性值之间的复杂关系。LESS中的函数一一映射了JavaScript代码，如果你愿意的话可以操作属性值。

LESS源码：

```css
@the-border : 1px;
@base-color : #111;
@red        : #842210;

#header {
    color        : (@base-color * 3);
    border-left  : @the-border;
    border-right : (@the-border * 2);
}
#footer {
    color        : (@base-color + #003300);
    border-color : desaturate(@red, 10%);
}
```

编译后的CSS：

```css
#header {
    color        : #333;
    border-left  : 1px;
    border-right : 2px;
}
#footer {
    color        : #114411;
    border-color : #7d2717;
}
```

# 编译

LESSCSS的使用是很容易的，首先，使用你最常使用的代码编辑器，按LESSCSS的语法规则写好`.less`文件，接下来，使用编译工具它编译成`.css`，最后再引入页面即可。

## GUI编译工具

为方便起见，建议初学者使用GUI编译工具来编译`.less`文件，以下是一些可选GUI编译工具：

- koala(Win/Mac/Linux)

  国人开发的LESSCSS/SASS编译工具。下载地址：[http://koala-app.com/index-zh.html](http://koala-app.com/index-zh.html)
  
- Codekit(Mac)

  一款自动编译Less/Sass/Stylus/CoffeeScript/Jade/Haml的工具，含语法检查、图片优化、自动刷新等附加功能。下载地址[http://incident57.com/codekit/](http://incident57.com/codekit/)
  
- WinLess(Win)

  一款LESS编译软件。下载地址[http://winless.org/](http://winless.org/)

- SimpleLess(Win/Mac/Linux)

  一款LESS编译软件。下载地址[http://wearekiss.com/simpless](http://wearekiss.com/simpless)
  
##   Node.js库

LESSCSS官方有一款基于Node.js的库，用于编译`.less`文件。

使用时，首先全局安装less（部分系统下可能需要在前面加上sudo切换为超级管理员权限）：

`npm install -g less`

接下来就可以使用lessc来编译.less文件了：

`lessc example/example.less example/example.css`

