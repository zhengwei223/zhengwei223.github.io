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

## 1.0 从这里开始

&emsp;&emsp;我们从一个完整的HTML页面开始：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>CSS+DIV Layout</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
    </body>
    </html>

 [打开编辑器并且复制、运行](/public/tiyEditor.html) 

## 1.1 头部元素

&emsp;&emsp;头部区域里面包含一个图片和一个标题：

       <img src="/public/img/html/i_love_html.jpg" alt="i_love_html" />
       <h1>Website Name</h1>

&emsp;&emsp;你可以把上面的代码复制到\<body\>元素里：

 ![html-xhtml-relation](/public/img/html/header_step_01.PNG)

## 1.2 设置背景颜色

&emsp;&emsp;用一个\<DIV\>把\<IMG\>和\<h1\>装到一起,设置容器背景色：

    <div class="header">
         <img src="/public/img/html/i_love_html.jpg" alt="i_love_html" />
         <h1>Website Name</h1>
    <div>

&emsp;&emsp;在文档头部加入如下样式代码：

    <style> 
       .header {background-color:#441111;}
    </style>

 ![html-xhtml-relation](/public/img/html/header_step_02.PNG)

## 1.3 设置标题颜色

&emsp;&emsp;在文档头部加入如下样式代码：

     .header  h1 {color : white;}

 ![html-xhtml-relation](/public/img/html/header_step_03.PNG)

## 1.4 设置标题高度

&emsp;&emsp;在文章头部更新如下样式代码：

     .header h1 {color:white;line-height:80px;}

 ![html-xhtml-relation](/public/img/html/header_step_05.PNG)

## 1.5 把图片和标题放在同一行

&emsp;&emsp;在文章头部加入如下样式代码：

     .header img {float:left;}

 ![html-xhtml-relation](/public/img/html/header_step_04.PNG)


## 1.6 设置图片宽高

&emsp;&emsp;在文章头部更新如下样式代码：

     .header img { width:100px; height:70px;}

 ![html-xhtml-relation](/public/img/html/header_step_06.PNG)

## 1.7 设置图片盒子

### 第一步
&emsp;&emsp;先在文章头部更新如下样式代码：

     .header img {padding:5px; }

 ![html-xhtml-relation](/public/img/html/header_step_07.PNG)

---

### 第二步

&emsp;&emsp;然后在文章头部更新如下样式代码：

     .header img {margin-right:20px;}

 ![html-xhtml-relation](/public/img/html/header_step_08.PNG)

## 代码实例

&emsp;&emsp;到目前为止，代码是这样的：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head><title>CSS+DIV Layout</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    
    <style> 
    .header {background-color:#441111;} 
    .header  h1 {
            color : white;
            line-height:80px;
            } 
    .header img {
                float:left; 
                width:100px;
                height:70px;
                padding:5px; 
                margin-right:20px;
                }

    </style>
    </head>
    <body> 
    <div>  
    <div class="header">  
     <img src="/public/img/html/i_love_html.jpg" alt="i love html" />  
     <h1>Website Name</h1> 
     </div> 
    </div>
    </body>
    </html> 

 [打开编辑器并且复制、运行](/public/tiyEditor.html) 

# 2 关于头部，你需要了解什么

## 2.1 div就是个容器（container）

&emsp;&emsp;div，英文全名是division：

> The division of a large unit into two or more distinct parts is the act of separating it into these parts.

&emsp;&emsp;使用\<div\>\</div\>标签的作用之一就是帮助我们把一个完整的页面划分成几个不同的区域。

&emsp;&emsp;我们把头部的全部内容装进\<div\>（开始标签）和\</div\>（结束标签）之间，div就类似一个页面上的容器：头部的内容就放在容器里面，以后凡是页面头部的新元素，都要放往这个容器里放。

### 为DIV内部元素统一定义样式

&emsp;&emsp;下面的例子，最外层是div，div里面有一个标题和两个段落：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>CSS+DIV Layout</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
      <div id="myDiv" name="myDiv">
        <h5>Subtitle</h5>
        <p>This paragraph would be your content paragraph...</p>
        <p>Here's another content article right here.</p>
      </div>
    </body>
    </html>

 [打开编辑器并且复制、运行](/public/tiyEditor.html) 

 ![html-xhtml-relation](/public/img/html/pre_css_on_single_div.PNG)

&emsp;&emsp;为了统一修改标题和段落的显示外观，我们只需要选中外层div，增加相关颜色、字体属性：

    <style>
       #myDiv { color: #0900C4; font: Helvetica 12pt;}
    </style>

 ![html-xhtml-relation](/public/img/html/post-css-on-single-div.PNG)

&emsp;&emsp;可以看到，位于div标签内部的段落和标题元素获得了应用在外层div标签的外观属性：蓝色的**Helvetica**字体。

---

### 进一步划分页面

&emsp;&emsp;只要把几个新div放到已有的div容器里，我们就可以根据需要把容器进一步细分成几个不同区块，这个场景可以想象成大容器里面放小容器。

&emsp;&emsp;下面是一个div嵌套例子：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>CSS+DIV Layout</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
       <div id="myDiv" name="myDiv" style="font-family: Helvetica; font-size: 12pt; border: 1px solid black;">
         <!--定义border是为了让div就显示出边框，关于这个我们稍后就有更详细的解释-->
         <div id="subDiv1"  style="color: #FF0000; border: 1px dotted black;">
           <h5>Section 1</h5>
           <p>This paragraph would be your content paragraph...</p>
           <p>Here's another content article right here.</p>
         </div>
         <br />
         <!--定义border是为了让div就显示出边框，关于这个我们稍后就有更详细的解释-->
         <div id="subDiv2" style="color: #FF00FF;border: 1px dashed black;">
           <h5>Section 2</h5>
           <p>This paragraph would be your content paragraph...</p>
           <p>Here's another content article right here.</p>
         </div>
       </div>
    </body>
    </html>

 ![html-xhtml-relation](/public/img/html/place-div-in-div.PNG)

&emsp;&emsp;我们在最外层的myDiv上应用字体属性，这就定义了这个容器里面所有文本的字体，又在subDiv1和subDiv2上应用了不同的文本颜色。

&emsp;&emsp;从效果可以看出两个内部div里它们的字体一样（font-family: Helvetica;），但是文本颜色不同。

## 2.3 一切都是盒子

&emsp;&emsp;在上个小节的代码里面，我们在三个div元素（myDiv、subDiv1和subDiv2）上分别设定了不同的border属性。因此，每个div都显示出一个样式不同的边框，每个div元素都是一个长方形盒子。

&emsp;&emsp;这件事绝非偶然：实际上不仅div元素是长方形盒子，一切HTML元素都是长方形盒子！每一个盒子都会有宽（width）,高（height）, 内边距（padding）, 边框（border） 和 外边距（margin）这些盒子属性。

&emsp;&emsp;下面以一个DIV元素为例子，形象直观地标示出了盒子的这些属性：

![html-xhtml-relation](/public/img/html/css-box-model-demo.PNG)

&emsp;&emsp;你可以在代码上，修改它们的像素数值，看看div元素的长方形盒子显示的样式有什么变化：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <html>
    <head>
    <style>
     p {
       background-color: red;
       color : white;
     }

    div {
        background-color: lightgrey;
        width: 300px;
        border: 25px solid green;
        padding: 25px;
        margin: 25px;
    }
    </style>
    </head>
    <body> 
    <h2>演示CSS盒子模型</h2>
    <div><p>这一段文字是包裹在div里面的内容。</p></div>   
    </body>
    </html>

  [打开编辑器并且复制、运行](/public/tiyEditor.html)  

&emsp;&emsp;浏览器在显示div元素的时候，根据下面的方法计算出它的实际宽度是：

> 长方形盒子的宽度（450px）= div宽度(300px) + 左内边距(25px) + 右内边距(25px) + 左边框(25px) + 右边框(25px) + 左外边距(25px) + 右外边距(25px)


## 2.4 嵌套盒子

&emsp;&emsp;继续上一小节的代码示例。既然所有HTML元素都是长方形盒子，我们再来看放在div盒子里面的段落（\<p\>）元素的盒子属性。

### 2.4.1 增加蓝色边框

&emsp;&emsp;在代码中为p标签设置的样式中增加表框属性：

    border : 5px solid blue;

&emsp;&emsp;最后发现效果是这样的：

![html-xhtml-relation](/public/img/html/p_blue_border.PNG)

---

### 2.4.2 增加内边距

&emsp;&emsp;在代码中为p标签设置的样式中增加内边距属性：

       padding: 25px;

&emsp;&emsp;可以看到，p标签的蓝色边框和段落文本的距离拉宽了：

![html-xhtml-relation](/public/img/html/p_padding-demo.PNG)

&emsp;&emsp;还有一个明显的变化是：p标签的显示尺寸变大了，原因就是内边距变大了。

### 2.4.3 增加外边距

&emsp;&emsp;在代码中为p标签设置的样式中增加外边距属性：

     margin: 25px;

&emsp;&emsp;可以看到，银灰色区域所对应的外边距区域增大了：

![html-xhtml-relation](/public/img/html/p_margin_demo.PNG)

&emsp;&emsp;你还可以把外边距的像素值设置成更大的数值，看一看页面又会发生什么变化。

### 2.4.4 修改段落的尺寸

&emsp;&emsp;在代码中为p标签设置的样式中增加如下代码：

       width :150px;
       height :200px;

&emsp;&emsp;作为一个习题，大家可以自己去看看实际效果是什么样的？

### 2.4.5 盒子模型

&emsp;&emsp;有一只猫正躺在盒子里睡觉，盒子外面又套一个大盒子。

&emsp;&emsp;以猫睡觉的盒子作比喻形象地说，猫是盒子里面的内容（content），盒子四面和猫之间的距离是内边距（padding），四面的纸板是盒子边框，小盒子与大盒子之间的距离是外边距（margin）。

 ![html-xhtml-relation](/public/img/html/css-model-cat-in-box.jpg)

&emsp;&emsp;基于感性的直观认识之上，下面是盒子模型的概念图：

 ![html-xhtml-relation](/public/img/html/w3c_css_box_model.gif)

## 2.5 CSS属性简写

&emsp;&emsp;每个长方形盒子（rectangle）都有四条边，我们把这四条边所在的方位依次命名为顶部（top）、底部（bottom）、左边（left）和右边（right）。

---

### 定义边框的四个方位

&emsp;&emsp;以盒子边框为例，除了用**border**属性一次修改四个方位上的边框宽度，我们也可以单独修改其中任意一个边框属性：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <html>
    <head>
    <style>
    div {
        background-color: lightgrey;
        width: 300px;
        border-top: 15px solid DarkMagenta; /**顶部边框：15像素宽实心紫色线条 */
        border-bottom: 25px solid yellow; /**底部边框：25像素宽实心黄色线条 */
        border-left: 35px solid green; /**左边框：35像素宽实心绿色线条 */
        border-right: 45px solid red; /**左边框 ：45像素宽实心红色线条*/
        padding: 25px;
        margin: 25px;
    }
    </style>
    </head>
    <body> 
    <h2>演示CSS盒子模型</h2>
    <div></div>   
    </body>
    </html>

  [打开编辑器并且复制、运行](/public/tiyEditor.html)  

&emsp;&emsp;结果如我所愿，四个边框依照定义分别显示出不同色彩，并且有宽度不同：

 ![html-xhtml-relation](/public/img/html/css-four-border-color.PNG)


---

### 使用CSS简写

&emsp;&emsp;上一小节我们用border-top一个属性分别定义了顶部边框的宽度、样式和颜色。

&emsp;&emsp;下面的例子里面，我们分开定义了边框宽度（border-width）、边框颜色（border-style）和边框颜色（border-color），同时采用了CSS属性简写语法进一步指定它们在顶部（top）、底部（bottom）、左边（left）和右边（right）的属性值。

&emsp;&emsp;比如说，当我们写了四行代码来定义边框宽度的时候，

        border-top: 15px; /**顶部边框：15像素宽 */
        border-bottom: 25px; /**底部边框：25像素宽 */
        border-left: 35px; /**左边框：35像素宽 */
        border-right: 45px; /**左边框 ：45像素*/

&emsp;&emsp;我们也可以用一行代码来实现同样效果。请看例子：


    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <html>
    <head>
    <style>
    div {
        background-color: lightgrey;
        width: 300px;
        /**使用CSS简写定义边框的宽度：
           有四个像素值表示宽度值会按照顺时针方向
           ( 顶部、右边、底部和右边)依次应用到四个边框上*/
        border-width :15px 25px 35px 45px;
        /**使用CSS简写定义边框的显示样式:
           只写一个值表示四个边框应用一样的样式*/
        border-style: solid; 
        /**使用CSS简写定义四个边框的颜色：
           有三个两个颜色名称，
           第一个颜色名称应在用顶部（top）边框上，
           第二个颜色值应用在水平方向（left和right）的边框上，
           第三个颜色值应用在底部（bottom）边框上
         */     
        border-color: yellow green red;  
        padding: 25px;
        margin: 25px;
    }
    </style>
    </head>
    <body> 
    <h2>演示CSS盒子模型</h2>
    <div></div>
    </body>
    </html>

  [打开编辑器并且复制、运行](/public/tiyEditor.html)

 ![html-xhtml-relation](/public/img/html/css-border-short-hand.PNG)

### 试一试

&emsp;&emsp;你可以试试看，如果在border-color里面只留下两个颜色名称，div边框的颜色会怎么显示？

&emsp;&emsp;关于CSS简写更详细的介绍可以参考以下链接：[CSS Shorthand properties](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)，这个网页会让你了解更多关于CSS属性简写的规则。

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

&emsp;&emsp;设置背景颜色颜色之后的效果是这样的

 ![html-xhtml-relation](/public/img/html/main-content-demo.PNG)

## 3.3 三个div从左到右一字排开

&emsp;&emsp;在文章头部加入如下样式代码：

    .nav {float:left;}
    .content {float:left;}
    .right {float:left;}

&emsp;&emsp;三个div在页面上就按照左中右的顺序显示出来了：

 ![html-xhtml-relation](/public/img/html/main-content-float-left.PNG)

## 3.4 去掉a元素的下划线

&emsp;&emsp;在文章头部加入如下样式代码：

    a {text-decoration:none;}

## 3.5 改变li元素显示样式

&emsp;&emsp;在文章头部加入如下样式代码：

    .nav ul {list-style-type:none;}

## 3.6 按百分比分配屏幕宽度

&emsp;&emsp;在html头部更新如下样式代码，使得三个div从左到右按照设定的百分比分配屏幕宽度：

     .content {width:60%;}
     .nav {width:20%;}
     .right {width:20%;}

 ![html-xhtml-relation](/public/img/html/div_three_col.PNG)

&emsp;&emsp;当你调整浏览器窗口宽度的时候，这三个div所占宽度会按照百分比动态调整。

# 4. 关于页面主体，你需要了解什么

## 4.1 页面元素的显示方式

&emsp;&emsp;用来控制页面布局的最重要的一个CSS属性是**display**，它定义了浏览器显示一个网页元素的方式显。

&emsp;&emsp;所有类型的元素也都有一个默认的**display**属性值。根据W3C规范，大多数元素display属性的默认值是block和inline，前者被称为块（block-level）元素，后者被称为行（inline）元素。

### 块(block-level)元素

&emsp;&emsp;常见的一个块级元素由div，p和form。下面以div为例说明块级元素的特性：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <html>
    <head>
    <style>
    div {
        /**
        注意：这里没有设置div的宽度属性        
        */
        height:35px;
        /**
        背景色：银灰色        
        */
        background-color: lightgrey;
        /**
        边框：两像素宽的红色实线        
        */
        border: 2px solid red;
        /**
        内边距：5px       
        */
        padding: 5px;
        /**
        外边距是5px 让两个div的边框显示出来       
        */
        margin:5px; 
    }
    </style>
    </head>
    <body> 
    <h2>演示块级元素</h2>
    <div></div>
    <div></div>
    </body>
    </html>

  [打开编辑器并且复制、运行](/public/tiyEditor.html)

&emsp;&emsp;我们可以看到，不只是它的宽度充满了整个页面的宽度 ，而且第二个元素位置换行显示，这也是块元素的主要特征。

 ![html-xhtml-relation](/public/img/html/div-display-as-block-el.PNG)


&emsp;&emsp;使用Chrome浏览器开发工具，查看div元素的属性：

 ![html-xhtml-relation](/public/img/html/div-display-block-demo.PNG)

---

### 行(inline)元素

&emsp;&emsp;span和a标签都是标准的行元素，来看一个综合性的例子：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <html>
    <head>
    <style>
     p {
       /**这里定义段落元素的边框和外边距
          可以帮你更方便地看出页面是怎么显示块元素的
        */
       border :3px solid black;
       margin:5px;
     }
    </style>
    </head>
    <body> 
    <h2>演示行级元素</h2>
    <p id="para1">Hello World!</p>
    <p>
                        <!--这里定义了一个行级元素，元素里的文本字体被设置为红色-->
     This paragraph is <span style="color:red;">not</span> affected by the style.
     This paragraph is <span style="color:red;">not</span> affected by the style.
     This paragraph is <span style="color:red;">not</span> affected by the style.
     This paragraph is <span style="color:red;">not</span> affected by the style.
    </p>
    <p>
      只要点击一个链接，你就可以轻松打开<a href="http://www.baidu.com" target="_blank">百度首页</a>
    </p>
    </body>
    </html>

  [打开编辑器并且复制、运行](/public/tiyEditor.html)

&emsp;&emsp;块元素像个容器，它里面的内容可以是其他块元素或者行元素。

 ![html-xhtml-relation](/public/img/html/p-span-a-css-display.PNG)

&emsp;&emsp;请注意，行元素没有让段落里原来同一行上的文字换行，这正是它们和块元素最大的不同：

&emsp;&emsp;使用Chrome浏览器开发工具，查看a元素的属性：

 ![html-xhtml-relation](/public/img/html/p-a-display-inline-demo.PNG)

&emsp;&emsp;你也可以用开发者工具，选中行元素span,查看它的display属性。


## 4.2 html默认文档流

&emsp;&emsp;所谓的html默认文档流，就是在浏览器按照默认的CSS规范（每个元素都依照display属性的默认值）显示页面的时候，各个元素所表现出来的位置和顺序。

&emsp;&emsp;我们用例子来说明什么是默认文档流：

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <html>
    <head>
    <style>
    div {
        /**
        注意：这里没有设置div的宽度属性        
        */
        height:100px;
        /**
        背景色：银灰色        
        */
        background-color: lightgrey;
        /**
        边框：两像素宽的红色实线        
        */
        border: 2px solid red;
        /**
        内边距：5px       
        */
        padding: 5px;
        /**
        外边距是5px 让两个div的边框显示出来       
        */
        margin:50px; 
    }
    a {
      margin:10px;
      padding:10px;
    }
    </style>
    </head>
    <body> 
    <h2>演示块级元素</h2>
    <div><a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a>
    <a href="http://www.baidu.com">百度搜索</a></div>
    <div></div>
    <div></div>
    </body>
    </html>

  [打开编辑器并且复制、运行](/public/tiyEditor.html)

&emsp;&emsp;图片中的箭头走向标示出了这个网页内容的默认文档流的走向：

 ![html-xhtml-relation](/public/img/html/default-doc-flow-demo.PNG)

&emsp;&emsp;图中绿色箭头标示了**a**（inline）元素的默认文档流走向：它们会在同一行里头尾相连、挨个显示；倘若一行宽度不够用，新的元素会流动到下一行继续显示。

&emsp;&emsp;图中的黑色箭头标示了div（block）元素的默认文档流走向：每个块元素占据一整行，从上单下按照它们出现的先后顺序显示。


## 4.3 浮动

&emsp;&emsp;在步骤3.3，为了改变三个div从上到下各占一行、顺序放置的html默认布局，我们用到了下面的代码：

    .nav {float:left;}
    .content {float:left;}
    .right {float:left;}

&emsp;&emsp;这里设置了三个div的**浮动**属性为左浮动。

&emsp;&emsp;我们看这三个div是怎么离开默认文档流实现左浮动的。

---

### 默认布局

&emsp;&emsp;不设定div左浮动效果是这样的：

 ![html-xhtml-relation](/public/img/html/div-in-default-layout.PNG)


---

### 导航栏左浮动

&emsp;&emsp;设定导航栏左浮动：

    .nav {float:left;}

 ![html-xhtml-relation](/public/img/html/div-nav-float-left.PNG)

&emsp;&emsp;在Chrome浏览器开发工具里面查看导航栏div

 ![html-xhtml-relation](/public/img/html/nav-float-left-inspect.png)

&emsp;&emsp;在导航栏div左浮动之后，原来在它下面的主内容div也发生了变化：

 ![html-xhtml-relation](/public/img/html/div-content-on-doc-flow.png)

---

### 主内容左浮动

&emsp;&emsp;设定主内容div左浮动：

    .content {float:left;}

 ![html-xhtml-relation](/public/img/html/div-content-float-left.png)

&emsp;&emsp;目前为止，导航栏div和主内容div脱离了默认文档流，实现左浮动。此时右边栏div仍然在默认文档流之上，遵循CSS默认的布局规则。

 ![html-xhtml-relation](/public/img/html/div-right-on-doc-flow.png)


---

### 右边栏左浮动

&emsp;&emsp;设定右边栏div左浮动：

    .right {float:left;}

&emsp;&emsp;用Chrome浏览器查看浮动效果：

 ![html-xhtml-relation](/public/img/html/div-right-float-left.png)

&emsp;&emsp;接下来要做的就是分配三列div占据屏幕宽度的百分比了，具体请参考3.6小节代码。


## 4.4 定位


# 5. 收官之作，完成底部区域

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
