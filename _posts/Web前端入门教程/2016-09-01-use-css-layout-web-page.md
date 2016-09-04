---
layout: post
title: BOX模型及CSS布局
category: Web前端入门教程
tags: Web前端
author: 曹小虎
keywords: lanqiao 蓝桥 全栈 教程 Web前端
description: 
---

> 本章目标

- BOX模型概念
- DIV+CSS页面布局
- HTML5页面布局

# 1.BOX模型概念

&emsp;&emsp;根据盒子模型的概念，网页上的所有元素都是一个长方形（rectangle）盒子，会有宽（width）,高（height）, 内边距（padding）, 边框（borders） 和 外边距（margins）这些属性。

 ![html-xhtml-relation](/public/img/html/w3c_css_box_model.gif)

# 1.1 DIV元素盒子

&emsp;&emsp;下面以一个DIV元素为例子，形象直观地标示出了盒子的这些属性：

![html-xhtml-relation](/public/img/html/css-box-model-demo.PNG)

&emsp;&emsp;你可以在代码上，修改它们的像素数值，看看div元素的长方形盒子显示的样式有什么变化：

    <!DOCTYPE html>
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

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

&emsp;&emsp;浏览器在显示div元素的时候，根据下面的方法计算出它的实际宽度是：

> 长方形盒子的宽度（450px）= div宽度(300px) + 左内边距(25px) + 右内边距(25px) + 左边框(25px) + 右边框(25px) + 左外边距(25px) + 右外边距(25px)

# 1.2 P元素盒子

&emsp;&emsp;每一个HTML元素都是长方形盒子，我们来看\<p\>标签。

### 1.2.1 增加蓝色边框

&emsp;&emsp;在代码中为p标签设置的样式中增加表框属性：

    border : 5px solid blue;

&emsp;&emsp;最后发现效果是这样的：

![html-xhtml-relation](/public/img/html/p_blue_border.PNG)

---

### 1.2.2 增加内边距

&emsp;&emsp;在代码中为p标签设置的样式中增加内边距属性：

       padding: 25px;

&emsp;&emsp;可以看到，p标签的蓝色边框和段落文本的距离拉宽了：

![html-xhtml-relation](/public/img/html/p_padding-demo.PNG)

&emsp;&emsp;还有一个明显的变化是：p标签的显示尺寸变大了，原因就是内边距变大了。

### 1.2.2 增加外边距

&emsp;&emsp;在代码中为p标签设置的样式中增加外边距属性：

     margin: 25px;

&emsp;&emsp;可以看到，银灰色区域所对应的外边距区域增大了：

![html-xhtml-relation](/public/img/html/p_margin_demo.PNG)

### 1.2.2 修改段落的尺寸

&emsp;&emsp;在代码中为p标签设置的样式中增加如下代码：

       width :150px;
       height :200px;

&emsp;&emsp;作为一个习题，大家可以自己去看看实际效果是什么样的？

# 1.3 其他元素的盒子模型

&emsp;&emsp;我们用Chrome浏览器随意打开一个网站，比如说163首页，F12打开“developer tools”。

## 1.3.1 body元素盒子

&emsp;&emsp;可以看到，右下方的工具栏里面默认现实了body元素的盒子模型，外边距、内边距都是0(margin:0;padding:0;)。

 ![html-xhtml-relation](/public/img/html/every-html-el-is-a-box.PNG)


## 1.3.2 IMG元素盒子
&emsp;&emsp;用开发者工具选中页面上的一个图片元素，可以看到它的盒子模型。

&emsp;&emsp;默认状况下内边距、外边距、边框都是0（px）：

 ![html-xhtml-relation](/public/img/html/img-box-model.PNG)

&emsp;&emsp;我们对图片的盒子属性进行简单修改，就会看到这样的效果：

 ![html-xhtml-relation](/public/img/html/img_el_box_test.png)

## 1.3.3 其他元素

&emsp;&emsp;重要的事情说三遍，**页面中一切HTML元素都是长方形盒子**。

&emsp;&emsp;我们可以通过Chrome开发者工具选中任意元素,并且修改它们的盒子属性以改变其外观。

# 2.相对定位和绝对定位

## 2.1 相对定位

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

## 2.2 绝对定位

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

# 3.CSS元素浮动和清除浮动

## 3.1 元素浮动

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

## 3.2 擦除浮动

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


# 4.用table布局页面

## 4.1 table布局方法


&emsp;&emsp;很多早期的网站设计者较多采用table标签布局网站。

&emsp;&emsp;这是一种简单到只需要开发者把相应内容放到表格单元格里的布局方法。

&emsp;&emsp;因为主流浏览器都对表格元素（table）有统一支持，所以这种布局方法不会遇到任何浏览器兼容性问题。

&emsp;&emsp;下面是一个使用table进行网页布局的简单例子，请注意：代码在（表示网页不同区域的）不同单元格上设置了不同的背景颜色属性（inline style）：

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
        <meta charset="UTF-8">
        <title>HTML使用table进行布局</title>
        <style type="text/css">
        html,body{
            height:100%;
            width:100%;
            margin:0px;
            padding:0px;
            overflow:hidden;
        }
        </style>
    </head>
    <body height="100%" width="100%">
      <table height="100%" cellspacing="1" width="100%" bgcolor="#808080">
            <tr height="70px">
                <td colspan="2" bgcolor="#F0F0F0">头部(这里放置标题、logo、一些主要按钮)</td>
            </tr>
            <tr>
                <td width="150px" bgcolor="#F0F0F0">功能列表区域</td>
                <td width="auto" bgcolor="#ffffff">办公区域（这里打开指定功能的操作区域）</td>
            </tr>
            <tr height="30px">
                <td colspan="2" bgcolor="#F0F0F0" align="center">版权信息</td>
            </tr>
      </table>
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

&emsp;&emsp;以下是table布局效果：

 ![html-xhtml-relation](/public/img/html/html_table_layout_demo.PNG)

&emsp;&emsp;**小练习**：你可以尝试页面布局中的“功能列表区域”移动到页面的右边。


## 4.2 弊端

&emsp;&emsp;W3C组织坚持认为table标签的主要用途应该是展示数据，而非控制页面结构。

&emsp;&emsp;此外还有以下几点原因使得这种布局方式越来越少被用到：

### 嵌套层次有限

&emsp;&emsp;Table的格式其实是一定的——首先要有一个表格，其次表格里要有行，每一行又分为许多列(单元格)。如果在同一行的某个单元格中，要布局放入更多内容，而左右两边的单元格不变的话，要怎么实现？

&emsp;&emsp;只能在单元格里再嵌套一个表格。如果嵌套层数少那还好，一旦层数多起来，绝逼要疯。这还是不涉及修改的情况。如果某天你老板拍脑袋说，把左边导航栏给我从左边移到右边，你就等着加班吧！

### 加载性能不足

&emsp;&emsp;table的加载呈现方式是整体性的，就是说浏览器要在解析了table中的元素后才把整个table的方式一起显示出来。显而易见，如果两个页面都是5秒的加载时间你的这个页面会有5秒时间都是白屏，5秒之后全部内容一下子显示出来。这样的布局方式给用户带来的体验可想而知。

### 引入过多行内样式（inline style）

&emsp;&emsp;从上面的代码我们也可以看出，每一个\<td\>元素都代表了页面布局上的不同区域。每一块区域的\<td\>元素都需要写上不同的样式定义。我们很难通过CSS的标签选择器统一地控制外观样式。最后我们还发现：table布局使得网页的结构（内容）与外观样式耦合在一起，修改难、维护起来也比较棘手。

# 5.DIV+CSS页面布局

&emsp;&emsp;现在普遍流行的方法是：DIV（division，区、块）元素配合CSS样式控制经常被用来做网页的布局。

&emsp;&emsp;DIV常常被用来标明内容块或者文档中的一组其他元素，DIV里面可以再嵌套DIV。下面是一个DIV页面布局的例子：

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
        <meta charset="UTF-8">
        <title>HTML Div Layout</title>
        <style type="text/css">
            body{
                font: 12px verdana, sans-serif; 
                margin: 0px;
            }
            .header{
                padding: 10px 0;
                background-color: #679BB7; 
            }
            .header h1{
            font-size: 18px; 
            margin: 10px;
            }
            .container{
                width: 100%;
                background-color: #f0f0f0; 
            }
            .sidebar{
                float: left; 
                width: 20%; 
                min-height: 170px;
                background-color: #bbd2df;
            }
            .sidebar .nav{
                padding: 10px;
            }
            .nav ul{
                list-style: none; 
                padding: 0px; 
                margin: 0px;
            }
            .nav ul li{
                margin-bottom: 5px; 
            }
            .nav ul li a{
                color: #3d677e;
            }
            .nav ul li a:hover{
            text-decoration: none;
            }
            .content{
                float: left;
                width: 80%;
                min-height: 170px;
            }
            .content .section{
                padding: 10px;
            }
            .content h2{
                font-size: 16px; 
                margin: 0px;
            }
            .clearfix{
                clear: both;
            }
            .footer{
                background-color: #679BB7; 
                padding: 10px 0;
            }
            .footer p{
                text-align: center; 
                margin: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Tutorial Republic</h1>
            </div>
            <div class="wrapper">
                <div class="sidebar">
                    <div class="nav">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div class="content">
                    <div class="section">
                        <h2>Welcome to our site</h2>
                        <p>Here you will learn to create websites...</p>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="footer">
                <p>copyright &copy; tutorialrepublic.com</p>
            </div>
        </div>
    </body>
    </html>

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

