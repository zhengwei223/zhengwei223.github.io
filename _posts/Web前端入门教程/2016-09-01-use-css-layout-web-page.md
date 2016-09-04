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

# 1.3 所有HTML元素都是盒子

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

# 2.用table标签布局页面

&emsp;&emsp;虽然W3C认为table最早是被设计出来用于展示数据而强烈推荐不要使用这种方法进行网页布局，但是仍然有很多早起的网站设计者采用这种方法布局网站。

&emsp;&emsp;table布局的一个好处就是浏览器兼容性好，因为现在的主流浏览器都对table标签进行了一样的的支持。下面是一个使用table进行网页布局的简单例子：

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

&emsp;&emsp;Table的格式其实是一定的——首先要有一个表格，其次表格里要有行，每一行又分为许多列(单元格)。如果在同一行的某个单元格中，要布局放入更多内容，而左右两边的单元格不变的话，要怎么实现？

&emsp;&emsp;只能在单元格里再嵌套一个表格。如果嵌套层数少那还好，一旦层数多起来，绝逼要疯。这还是不涉及修改的情况。如果某天你老板拍脑袋说，把左边导航栏给我从左边移到右边，你就等着加班吧。

&emsp;&emsp;table的加载呈现方式是整体性的，就是说浏览器要在解析了table中的元素后才把整个table的方式一起显示出来。显而易见，如果两个页面都是5秒的加载时间你的这个页面会有5秒时间都是白屏，5秒之后全部内容一下子显示出来。这样的布局方式给用户带来的体验可想而知。

&emsp;&emsp;从上面的代码我们也可以看出，每一个\<td\>元素都代表了页面布局上的不同区域。每一块区域的\<td\>元素都需要写上不同的样式定义。我们很难通过CSS的标签选择器统一地控制外观样式。最后我们还发现：table布局使得网页的结构（内容）与外观样式耦合在一起，修改难、维护起来也比较棘手。


# 3.DIV+CSS页面布局

&emsp;&emsp;DIV（division）标签的定义了HTML文档中的块或者部分。DIV标签配合CSS样式控制经常被用来做网页的布局。

&emsp;&emsp;相比table做布局，由于HTML中div元素是逐个加载显示的，所以再页面结构复杂的时候不会出现加载页面的白屏问题。用Div布局就远为灵活，div里面嵌套div，语法更加清晰简单。

