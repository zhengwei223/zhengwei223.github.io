---
layout: post
title: 用CSS做好页面布局
category: Web前端入门教程
tags: Web前端
author: 曹小虎
keywords: lanqiao 蓝桥 全栈 教程 Web前端
description: 
---

> 本章目标

- 给页面分块

- CSS布局属性

- 用CSS控制DIV及页面元素完成布局

&emsp;&emsp;学完这一章的内容，你将掌握用CSS（级联样式表）配合页面元素做好网页布局的基本技能，并且后完成一个主要内容分为**头部**、**左边导航栏**、**正文内容**、**右边导航栏**和**底部版权信息栏**组成的练习页面，效果如图：

 ![html-xhtml-relation](/public/img/html/css-layout-final-image.PNG)

# 1.小试牛刀，制作页面头部

&emsp;&emsp;首先，我们需要把完整的页面文档内容分别放到五个不同的区域里面来显示。

## 1.1 头部元素

&emsp;&emsp;头部区域里面包含一个图片和一个标题：

       <img src="/public/img/html/i_love_html.jpg" alt="i_love_html" />
       <h1>Website Name</h1>

 [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html) 

## 1.2 设置头部背景色

&emsp;&emsp;用一个\<DIV\>把\<IMG\>和\<h1\>装到一起,设置容器背景色：

    <div class="header">
         <img src="/public/img/html/i_love_html.jpg" alt="i_love_html" />
         <h1>Website Name</h1>
    <div>

&emsp;&emsp;在文章头部加入如下样式代码：

     .header {background-color:#441111;}

## 1.3 设置标题颜色

&emsp;&emsp;在文章头部加入如下样式代码：

     .header  h1 {color : white;}

## 1.5 调整图片和标题位置

&emsp;&emsp;在文章头部加入如下样式代码：

     .header img {float:left;}

## 1.6 设置标题高度

&emsp;&emsp;在文章头部更新如下样式代码：

     .header h1 {color:white;line-height:80px;}

## 1.7 设置图片宽高

&emsp;&emsp;在文章头部更新如下样式代码：

     .header img {float:left; width:100px; height:70px;}

## 1.8 设置图片盒子

&emsp;&emsp;先在文章头部更新如下样式代码：

     .header img {float:left; width:100px; height:70px;padding:5px; }

---

&emsp;&emsp;然后在文章头部更新如下样式代码：

     .header img {float:left; width:100px; height:70px;padding:5px; margin-right:20px;}


# 2 关于头部制作，你需要了解什么



# 3.再下一城，完成页面主体

## 3.1 快速起步

&emsp;&emsp;页面左边导航栏主要包含以下内容：

       <p><strong>Navigation</strong></p>
       <ul>
         <li><a href="one.html">One</a></li>
         <li><a href="two.html">Two</a></li>
         <li><a href="three.html">Three</a></li>
       </ul>

&emsp;&emsp;页面中间内容区包含以下元素：

       <p><strong>Main Content</strong></p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>

&emsp;&emsp;页面右边栏包含以下元素：

        <p><strong>Right Side</strong></p>
        <p><strong>Right Side</strong></p>
        <p><strong>Right Side</strong></p>

## 3.2 设置背景色

&emsp;&emsp;我们还是先要把它们放到各自容器里面，然后分别设置三块内容的背景色：

      <div class="nav">
       <p><strong>Navigation</strong></p>
        <ul>
         <li><a href="one.html">One</a></li>
         <li><a href="two.html">Two</a></li>
         <li><a href="three.html">Three</a></li>
        </ul>
      </div>

      <div class="content">
       <p><strong>Main Content</strong></p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
       <p>line of text</p>
      </div>

      <div class="right">
        <p><strong>Right Side</strong></p>
        <p><strong>Right Side</strong></p>
        <p><strong>Right Side</strong></p>
      </div>

&emsp;&emsp;在文章头部加入如下样式代码：

    .nav {background-color:#ffdd99;}
    .right {background-color:#bb9955;}

## 3.3 把三块区域放在同一行

&emsp;&emsp;在文章头部加入如下样式代码：

    .nav {float:left;}
    .content {float:left;}
    .right {float:left;}

## 3.4 去掉导航栏超级链接的下划线

&emsp;&emsp;在文章头部加入如下样式代码：

    a {text-decoration:none;}

## 3.5 去掉无序列表元素前的实心圆点

&emsp;&emsp;在文章头部加入如下样式代码：

    .nav ul {list-style-type:none;}

## 3.6 分别调整三个区域容器的宽高

&emsp;&emsp;在文章头部更新如下样式代码：

     .content {width:60%;height:350px;}
     .nav {width:20%;height:350px;height:auto;}
     .right {width:20%;height:350px;height:auto;}

# 4. 关于页面主体，你需要了解什么

# 5. 底部区域

## 5.1 快速起步

&emsp;&emsp;页面底部一般用于显示版权信息，我们的这个例子中，这一块内容一个文字段落：

       <p>Footer</p>

&emsp;&emsp;我们仍然需要一个DIV来划分出页面上的一个区块：

    <div class="footer">
       <p>Footer</p>
    </div>

## 5.2 设置底部背景色

&emsp;&emsp;在文章头部加入如下样式代码：

      .footer { background-color:#bb9955;}

## 5.3 清除浮动效果

&emsp;&emsp;为了清除底部区域左边的浮动效果，让它单独显示最底一行，我们在文章头部更新如下样式代码：

     .footer { clear:left;}


# 6. 你还需要了解什么

# 7.更多思考

# 8.面试题



&emsp;&emsp;
