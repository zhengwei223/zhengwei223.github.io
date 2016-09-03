---
layout: post
title: CSS基础及常用样式
category: Web前端入门教程
tags: Web前端
author: 曹小虎
keywords: lanqiao 蓝桥 全栈 教程 Web前端
description: 
---

> 本章目标

- CSS简介
- CSS语法
- CSS样式


# 1. CSS简介

## 1.1 什么是CSS

&emsp;&emsp;HTML4标准中，HTML本身还可以同时定义文档结构和它的外观样式；随着Web的演变，人们趋向于把网页的结构和样式分开，后来的XHTML就淘汰了许多样式相关的标记和属性，将HTML的重点转移到定义网页结构上。显示样式由级联样式表CSS（**Cascading Style Sheets**，CSS）来完成，我们可以把CSS简称作样式表。

 ![html-xhtml-relation](/public/img/html/html-css.png)  

&emsp;&emsp;CSS被用来定义网页的外观样式。上面的图片就很形象地说明了结构（内容）和外观（样式）关系。前者的重点在于元素和元素之间的空间关系，后者就是在已有元素上，应用比如颜色、字体、边框、长度、对齐和阴影等等外观效果。 


## 1.2 CSS历程

### CSS 1
&emsp;&emsp;W3C组织在1996年发布了最早的一个CSS规范（CSS specification）**CSS1**。当年微软公司作为最早的浏览器厂商之一发布了IE3浏览器，对CSS1规范作出了比较简单的支持。随后几年，各个浏览器厂商都在自己生产的浏览中逐步引入对CSS1规范的支持。直到2000年3月份，微软推出了Internet Explorer 5.0 for the Macintosh，这个世界上才是真正有了第一个完全支持（超过99%）CSS1规范的浏览器。

  ![html-xhtml-relation](/public/img/html/css-history.png)  

---

### CSS 2

&emsp;&emsp;大家请注意，早在第一个完全支持CSS1的浏览器两年之前，W3C组织就已经发布了**CSS2**规范。无奈，规范是一回事，对规范的支持又是另一回事；我们可以把W3C组织比作我国春秋战国时期的周天子，把各大浏览器厂商比作实力派地方诸侯。虽说周天子作为天下共主具有礼仪和制度上的无上权威，并且把**周礼**发布为规范，但是最终是否执行规范、如何执行规范这样的问题还是取决于地方诸侯的实际需要。同样，CSS规范的执行也总是受制于浏览器市场的发展情况和各大浏览器厂商的商业计划。常言道，“**发展才是硬道理**”，慢慢的，他们真真切切看到了CSS2规范在互联网大潮中的诱人前景，也心知肚明唯有主动发展才可以避免被历史淘汰，认真考虑并且逐步实现对CSS2规范的支持就成了各大实力派厂商的不二选择。

&emsp;&emsp;CSS2.1是现在最新的CSS规范，也是现今互联网(Internet)上受到最广泛支持的规范。它修复了CSS2规范中的一些Bug，删除和添加了一些特性。根据W3C的工作流程，这个版本经过了长时间的反复修订，甚至直到2010年12月份还被退回到**最后的工作草稿**状态接受审议。2011年7月份才被最后一次正式发布给浏览器厂商。至此，CSS2.1规范尘埃落定。

 ![html-xhtml-relation](/public/img/html/css2.1-way.png)  

---

### CSS 3

 ![html-xhtml-relation](/public/img/html/css3-logo.jpg)  

&emsp;&emsp;CSS3，准确的全名是**Cascading Style Sheets,Level 3**，完全兼容老版本CSS规范的写法。W3C关于CSS3的工作早在1990年代末就已经开始，最早的CSS3草稿于1999年6月发布。

&emsp;&emsp;鉴于W3C在审议规范时冗长的工作流程，CSS3规范整体上已经不再成为一个单体草稿，而是引入了模块化的概念。CSS3众多模块中的每一个模块都有自己的稳定程度和发布状态，截止2012年7月，W3C的CSS工作组（CSS Working Group）已经发布超过50个CSS模块的草稿，其中四个模块到达最终定稿状态（Formal recommendation），供浏览器厂商参考实现。随着互联网相关行业在全球的进一步升温、浏览器市场竞争日趋激烈，各家厂商也加速了支持CSS3的进度和节奏，以便抢占更大市场份额。

 ![html-xhtml-relation](/public/img/html/browser-vendor-fightings.jpg)  

## 1.3  学习重点

&emsp;&emsp;虽然各个浏览器厂商已经加速支持CSS3规范，但是目前还没有一家厂商的浏览器能够支持CSS3规范中的全部模块，其中的一部分原因在于CSS3规范中的许多模块还在成熟完善的过程当中。目前最稳定时间最长的是CSS2.1规范，市面上主流浏览器已经对规范的大多数特性进行了良好的支持。

&emsp;&emsp;请注意，说了半天CSS标准，但我们学习的对象**不是**W3C发布的任何一个版本的CSS规范。显而易见，CSS规范都要由W3C制定发布，并且最终由浏览器厂商落地实现。虽然CSS规范版本有变化内容有增减，但是CSS在各个浏览器的**基本语法**始终不变。
    
&emsp;&emsp;我们学习的内容是：**CSS基本基本语法**和**已经被市面上的主流浏览器支持的CSS特性**。

&emsp;&emsp;我们学习的目的是：掌握使用样式表开发网站的基本技能。




# 2. CSS基本语法

## 2.1 语法规则

### 2.1.1 基本语法

 ![html-xhtml-relation](/public/img/html/css_grammer_demo.png) 

&emsp;&emsp;参数说明：

&emsp;&emsp;一个属性和属性值合在一起组成一个**属性定义**，**属性**和**属性值**之间的分隔符是**半角标点**(:)。

&emsp;&emsp;定义多个属性的时候，前后两个定义之间必须使用**半角标点**（;）隔开。处在末尾的一个属性定义，我们强力建议使用**半角标点**（;）收尾。

&emsp;&emsp;语法解释：

&emsp;&emsp;选择符，又称选择器，指明网页中要应用样式规则的元素，例如：h1{color:red}是网页中所有的段（h1）的文字将变成红色，而其他的元素（如p）不会受到影响。

---

### 2.1.2 格式

&emsp;&emsp;实际开发过程中，我们在选定的一组HTML元素上往往会声明不止一个属性和属性值。如果CSS的属性太多那么写在一行里不利于阅读：

    h1{color:red; font-size:16px; width:150px; height:50px; border-bottom: 1px solid #333;}

&emsp;&emsp;建议将每条代码写在一个新行内，如下所示：

    h1{
           color:red;
           font-size:16px;
           width:150px;
           height:50px;
           border-bottom: 1px solid #333;
    }

---

### 2.1.3 注释

&emsp;&emsp;就像在Html的注释一样，在CSS中也有注释语句：用/*注释语句*/来标明（Html中使用<!--注释语句-->读者要区分开)。示例代码：

    /*多行注释：
    把h1标签的字体颜色设置为红色
    字体大小为25px*/
    h1{
           color:red;
        font-size:25px;  /*单行注释，字体为25像素*/
  
    }

---

### 2.1.4 表示颜色

&emsp;&emsp;CSS代码里面颜色的写法可以有三种：这3种方式是等价的：

    h1 {color:red;}
    h1 {color:rgb(255,0,0)}
    h1 {color:#FF0000}

&emsp;&emsp;现在的各大浏览器都对一百多种颜色名称提供支持（参考W3C组织提供的相关资料），比如示例代码里面的**red**就是红色的名称。另外，CSS还支持的颜色写法包括RGB写法和十六进制写法。

## 2.2 在HTML中插入样式表

&emsp;&emsp;知道了CSS的基本语法，接下来我们就要开始动手写代码了。下面的示例代码分别使用了外部样式、内嵌（头部）样式和内联（行内）样式，这也是实际网页开发中用的最多的3种样式。

 ![html-xhtml-relation](/public/img/html/css_in_html.png) 

&emsp;&emsp;这三种样式生效的优先级**从高到低**依次是：行内样式、内嵌样式、链接样式。

### 2.2.1 外部样式

&emsp;&emsp;外部样式也可以叫做链接式CSS样式。
&emsp;&emsp;简单地说，就是先把css代码写一个单独的以“.css”为扩展名外部文件里面，然后在HTML页面的\<head\>标记对里面，用一个<link>标签将引入第一步写好的外部文件。一个HTML页面可以同时引入多个外部样式文件。

    <link href="base.css" rel="stylesheet" type="text/css" />

&emsp;&emsp;这种写法把HTML文件和CSS文件彻底分成两个或者多个文件，这种方式实现了页面HTML代码与美工CSS代码的完全分离，是使用企业实战中使用频率最高，也是最实用的方式。

---

### 2.2.2 内嵌样式

&emsp;&emsp;我们把写在\<style type="text/css"></style\>标签之间的CSS样式代码称为内嵌样式。内嵌样式只对当前页面上的HTML标记有效。如果有别的页面需要同样的显示样式，我们就要把这里的CSS代码复制过去。

 ![html-xhtml-relation](/public/img/html/css-in-head.png)

---

### 2.2.3 内联样式

&emsp;&emsp;内联样式，也可以称作行内样式，例如：

    <p style=“color:#FF0000;font-size:36px”>行内样式</p>

&emsp;&emsp;这种写法虽然简单直接，但是有一个弊端。比如说，当我们在HTML里面写入了一百次类似语法的时候，这个HTML页面的代码就会显得混乱、难懂。它是4种样式中最直接最简单的一种，直接对HTML标签适用style=""，

## 2.3 使用CSS选择器

&emsp;&emsp;CSS里面的选择器是一组用来选择HTML元素的表达式。CSS使用选择器选中一组元素后就可以在这一组元素上应用自己定义的样式。

### 2.3.1 标记选择器

&emsp;&emsp;我们可以在CSS代码里面使用**标记名称**选中元素。下面的例子，用标记名称**h1**和**h2**分别定义了两种字号标题的字体颜色，又用标记名称**p**选中全部的段落、定义段落中的字体颜色为红色和文本居中对齐;

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <HEAD>
    <TITLE>A simple HTML Document </TITLE>
    <STYLE>
    h1 {
        color :blue;
    }

    h2 {
        color :green;
    }

    p {
        color: red;
        text-align: center;
    }
    </STYLE>
    </HEAD>
    <BODY>
    <H1>This is a heading</H1>
    <H2>This is another heading</H2>
    <P>This is a paragraph.</P>
    <P>This is another paragraph.</P>
    </BODY>
    </HTML>  

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 2.3.2 通用类选择器

&emsp;&emsp;通用类选择器借助于HTML标记的class属性值来选中元素。

&emsp;&emsp;只需要以（.）符号开头，继之以一个目标元素的class属性值，就可以选中一组HTML元素对象。下面的例子中，所有满足**class="center"**的元素都会被选中：

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
    <style>
    .center {
        text-align: center;
        color: red;
    }
    </style>
    </head>
    <body> 
    <h1 class="center">Red and center-aligned heading</h1>
    <p class="center">Red and center-aligned paragraph.</p>  
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

&emsp;&emsp;我们还可以进一步在(.)符号前面加上标记名称（比如这里我们加了个**p**）。其含义是，进一步根据新增的标记名称查找页面元素。下面的例子只会选中**class="center"**的段落标记元素:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
    <style>
    p.center {
        text-align: center;
        color: red;
    }
    </style>
    </head>
    <body>
    <h1 class="center">This heading will not be affected</h1>
    <p class="center">This paragraph will be red and center-aligned.</p>
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 2.3.3 id选择器

&emsp;&emsp;id选择器通过HTML元素的id属性值选择需要的页面元素。

&emsp;&emsp;根据HTML规范，HTML元素的id属性在一个页面要求唯一，因此这个选择其只会选出**一个**页面元素。下面是一个在CSS中使用id选择期的例子：

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
    <style>
    #para1 {
        text-align: center;
        color: red;
    }
    </style>
    </head>
    <body>
    <p id="para1">Hello World!</p>
    <p>This paragraph is not affected by the style.</p>
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 2.3.4 伪类选择器

&emsp;&emsp;CSS中的伪类选择器用来选中包含了状态信息的一组HTML元素。使用伪类选择期的正确语法是：

    selector:pseudo-class {
        property:value;
    }

&emsp;&emsp;比如说，在一个页面上，我们要根据超级链接\<a\>标签的不同状态改变它的外观。

&emsp;&emsp;下面的代码定义了一个超级链接：

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
    <style>
    /* 选中没有被访问过的超级链接 */
    a:link {
        color: red;
    }

    /* 选中被访问过的超级链接 */
    a:visited {
        color: green;
    }
    
    /* 选中由鼠标移动到其正上方超级链接 */
    a:hover {
        color: hotpink;
    }
    
    /* 选中被点击状态的超级链接 */
    a:active {
        color: blue;
    }
    </style>
    </head>
    <body>
    
    <p><b><a href="http://www.baidu.com" target="_blank">这是一个页面的超级链接</a></b></p>
    <p><b>Note:</b> a:hover MUST come after a:link and a:visited in the CSS definition in order to be effective.</p>
    <p><b>Note:</b> a:active MUST come after a:hover in the CSS definition in order to be effective.</p>
    
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  


## 2.4 使用CSS样式属性

&emsp;&emsp;根据CSS语法规则，先要使用选择器选定HTML元素，随后的问题就是把一个或者多个外观显示属性应用到
备选定的元素上。

&emsp;&emsp;为了让读者能够从视觉上直观地看到CSS选择器的作用效果，我们已经用到了两种类型的CSS属性**color: red**和**text-align: center**；前者表示设置字体颜色为红色，后者表示文本对齐方式是居中对齐。

&emsp;&emsp;W3school提供的[CSS参考手册](http://www.w3school.com.cn/cssref/index.asp)中列举了包含CSS1、CSS2和CSS3多个规范在内的二十多个**属性组**。按照W3School的说法，这是一个已经被市面上各主流浏览器充分支持的属性清单。大家在网站开发的时候可以拿来就用。

 ![html-xhtml-relation](/public/img/html/css-property-groups.png)

---

&emsp;&emsp;以字体颜色作为例子，我们来看一下如何使用CSS参考手册。

&emsp;&emsp;首先在**CSS文本属性**表格里面第一行找到名称为**color**的属性、点击超级链接：

 ![html-xhtml-relation](/public/img/html/css-text-color-prop.png)

&emsp;&emsp;页面跳转到**CSS color 属性**页面之后，我们可以看到下面的页面：

 ![html-xhtml-relation](/public/img/html/css-color-prop-detail.png)

&emsp;&emsp;在这里我们可以做两件事情：

&emsp;&emsp;1. 点击“亲自试一试”按钮，练习怎么用这个属性；

&emsp;&emsp;2. 在“浏览器支持”区域，查看主流浏览器对属性的支持。


# 3. 使用CSS和DIV标签布局页面

## 3.1 CSS盒子模型

## 3.2 早期网页用table标签布局页面

## 3.3 更灵活的布局方式：CSS和DIV布局


### 3.3.1 相对定位和绝对定位

&emsp;&emsp;相对定位，含义就是先把元素放在页面上，根据事先设置好的垂直或水平位置，让这个元素“相对于”它的默认位置移动。

&emsp;&emsp;如果将 top 设置为 20px，那么框将在原位置顶部下面 20 像素的地方。如果 left 设置为 30 像素，那么会在元素左边创建 30 像素的空间，也就是将元素向右移动。

 ![html-xhtml-relation](/public/img/html/css-relative-position.png)

&emsp;&emsp;下面的例子中分别对\<h2\>进行了相对定位（**position:relative**）。你可以尝试修改名成为left的属性数值，查看相对定位的显示效果。

    <html>
    <head>
    <style type="text/css">
    h2.pos_left
    {
    position:relative;
    left:-10px
    }
    h2.pos_right
    {
    position:relative;
    left:20px
    }
    </style>
    </head>
    
    <body>
    <h2>这是位于正常位置的标题</h2>
    <h2 class="pos_left">这个标题相对于其正常位置向左移动</h2>
    <h2 class="pos_right">这个标题相对于其正常位置向右移动</h2>
    <p>相对定位会按照元素的原始位置对该元素进行移动。</p>
    <p>样式 "left:-20px" 从元素的原始左侧位置减去 20 像素。</p>
    <p>样式 "left:20px" 向元素的原始左侧位置增加 20 像素。</p>
    </body>
    
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

&emsp;&emsp;相对定位的一个特点是：目标元素相对于自己的默认位置移动后，原来的位置仍然会被占据。这个特点可以用下面的例子直接说明：

    <div style=" width:100px; height:100px;">div1</div>
    <div style=" width:100px; height:100px;">div2</div>
    <div style=" width:100px; height:100px;">div3</div>

&emsp;&emsp;在对DIV元素进行相对定位之前效果是这样的：

 ![html-xhtml-relation](/public/img/html/div-position-relative.jpg)

&emsp;&emsp;当第二个DIV相对于自己的默认位置移动之后，代码应该是这样的：

    <div style=" width:100px; height:100px;">div1</div>
    <div style=" width:100px; height:100px; position:relative; top:-20px; left:50px;">div2</div>
    <div style=" width:100px; height:100px;">div3</div>

&emsp;&emsp;效果是这样的：

 ![html-xhtml-relation](/public/img/html/div-postion-relative-2.jpg)

&emsp;&emsp;蓝色边框就是div2原来的位置，黑色边框就是通过position:relative相对于原来的位置左移50px; 上移20px得到的。

&emsp;&emsp;我们还看到，div2原来的位置仍然空在那里，div3也没有因为div2移动到别的地方跟着一起向上移动。

---

&emsp;&emsp;绝对定位就是把一个元素直接在页面上进行定位。

&emsp;&emsp;这种情况下，元素不会首先被放置在页面上定义好的位置，不需要参考元素刚默认的初始位置。那么，绝对定位参考的是什么呢？请看下面的小例子：

    <html>
    <head>
    <style type="text/css">
    h2.pos_abs
    {
    position:absolute;
    left:100px;
    top:150px
    }
    </style>
    </head>
    <body>
    <h2 class="pos_abs">这是带有绝对定位的标题</h2>
    <p>通过绝对定位，元素可以放置到页面上的任何位置。下面的标题距离页面左侧 100px，距离页面顶部 150px。</p>
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

&emsp;&emsp;相对定位的一个特点是：元素被直接定位到页面上的位置，比如说，相对于页面左侧100px，距离页面顶部150px。

### 3.3.2 浮动和擦除

&emsp;&emsp;CSS的浮动属性定义了一个盒子（元素）是否应该浮动，应该怎么浮动。下面是一个图片元素可以左右浮动例子：

    <!DOCTYPE html>
    <html>
    <head>
    <style>
    img {
        float: right;
    }
    </style>
    </head>
    <body>
    
    <p>在下面的段落里, 我们给IMG元素加上了 <b>float:right</b>属性。 结果是图片浮动到了段落的右边。你可以尝试修改浮动位置，让图片向段落的左侧浮动。</p>
    <p>
    <img src="http://www.w3schools.com/cssref/logocss.gif" width="95" height="84" />
    这是一段演示文本。 这是一段演示文本。这是一段演示文本。
    这是一段演示文本。 这是一段演示文本。这是一段演示文本。
    这是一段演示文本。 这是一段演示文本。这是一段演示文本。
    这是一段演示文本。 这是一段演示文本。这是一段演示文本。
    这是一段演示文本。 这是一段演示文本。这是一段演示文本。
    这是一段演示文本。 这是一段演示文本。这是一段演示文本。
    </p>
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

---

&emsp;&emsp;CSS擦除属性的作用是，决定盒子的那一边不能发生元素浮动。

&emsp;&emsp;下面的例子定义了**class="clear"**的段落左右两边都不能发生元素浮动。可以看到，图片没有浮动到第二个段落的左边。
你还可以尝试把clear属性的值修改成right和none，观察浮动效果的变化：

    <html>
    <head>
    <style>
    img {
        float: left;
    }
    
    p.clear {
        clear: both;
    }
    </style>
    </head>
    <body>
    
    <img src="http://www.w3schools.com/cssref/logocss.gif" width="95" height="84">
    <p>这是一段演示文本。 这是一段演示文本。这是一段演示文本。这是一段演示文本。这是一段演示文本。这是一段演示文本。</p>
    <p class="clear">这也是一段演示文本。 这也是一段演示文本。 这也是一段演示文本。这也是一段演示文本。 这也是一段演示文本。这也是一段演示文本。</p>

    </body>
    </html>























