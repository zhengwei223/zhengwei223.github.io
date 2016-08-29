---
layout: post
title: HTML基本结构
category: Web前端入门教程
tags: Web前端
author: 曹小虎
keywords: lanqiao 蓝桥 全栈 教程 Web前端
description: 
---

> 本章目标

- HTML和XHTML的概念和历史沿革
- HTML4.0和XHTML1.0语法规则
- W3School使用手册

# 1. HTML4.0和XHTML1.0语法规则 

## 1.1 HTML4.0基本语法

&emsp;&emsp;HTML文档的内容由一系列预先定义的HTML标签（tag）组成，通常以.html或者.htm为后缀保存，

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <HEAD>
    <TITLE>A simple HTML Document </TITLE>
    </HEAD>
    <BODY>
    <H1>This is a heading</H1>
    <P>This is a paragraph.</P>
    </BODY>
    </HTML>  

 [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

&emsp;&emsp;，除了我们的在线编辑器，你也可以在自己的电脑上创建一个**demo.html**文档，把上面的代码复制进去，右键使用浏览器打开，差看到同样的效果。

&emsp;&emsp;文档由浏览器加载完成后，会生成一个文档对象（document object）。文档对象以树形结构的形式存在，其中html标签被解释为根节点，html以下的全部标签都成为一个上级父节点的子节点。具体如图：  

![html-xhtml-relation](/public/img/html/html-dom-structure.gif)  

&emsp;&emsp;接下来我们介绍几个最常用的HTML预定义标签以及他们的是用方法：

### 标题

 &emsp;&emsp;&emsp;&emsp;\<h1\></h1\>到\<h6></h6\>标签被用于标记文章标题，前者用于标记最大字号（通常也是最重要的）标题，后者用于标记最小的字号（通常是不那么重要）的标题：

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <h1>This is heading 1</h1>
    <h2>This is heading 2</h2>
    <h3>This is heading 3</h3>
    <h4>This is heading 4</h4>
    <h5>This is heading 5</h5>
    <h6>This is heading 6</h6>
    </BODY>
    </HTML>  

  [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 段落

 &emsp;&emsp;&emsp;&emsp;\<p\>标签在标记了一个文章段落在html中开始的位置，\</p\>标签标记了段落结束的位置，这两个标签必须成对出现，两者之间的就是这个段落的内容。  

 &emsp;&emsp;&emsp;&emsp;如果一个页面上有多个段落同时出现，浏览器就会在一个段落之前、之后还有多个p标签之间插入换行和空格。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <p>
    这个段落
    在源代码中
    包含了多次换行,
    但是浏览器在展示内容的时候
    只是按照一个段落来处理
    没有进行多次换行.
    </p>
    <p>
    这个段落
    在源代码中
    包含  了多个   空格
    但        是浏览器在    展示内容的时候并没有把源代码中的多个空    格显示出来。
    多个空格都被当成一个空格来显示了！
    </p>
    <p>
    一个段落中的内容究竟显示为几行，取决于你所是用
    的浏览器窗口的尺寸
    如果你调整了窗口的大小，这个行数就会随之改变。
    </p>
    </BODY>
    </HTML>  

 [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 加粗段落中的文本  

 &emsp;&emsp;&emsp;&emsp;使用\<strong\>标签可以加粗段落中某个文本的字体。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <P><strong>《量子力学的数学基础》</strong>首次以数理分析清晰地提出了波函数的两类演化过程。</P>
    <p>请尝试加粗“波函数”这几个字。</p>
    </BODY>
    </HTML>

 [点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)

### 有序列表  
 
 &emsp;&emsp;&emsp;&emsp;下面是一个有序列表的代码片段。

 &emsp;&emsp;&emsp;&emsp;\<ol\>（ordered list）标记了列表开始的位置，\</ol\>标记了列表结束的位置。

 &emsp;&emsp;&emsp;&emsp;\<li>\(list item)标记了列表元素开始的位置，\</li\>标记列表元素结束的位置。  

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    An Ordered List
    <ol type="a">
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
      <li>Foorth item</li>
    </ol>
    <p>请尝试修改type属性，并依次使用1、a、A、i、I几个值。你也可以最后删掉这个属性。</p>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  


### 无序列表  

 &emsp;&emsp;&emsp;&emsp;无序列表标签\<ul\>标记了一个无序列表（unordered list）开始的位置，\</ul\>标记了无序列表结束的位置。

 类似于有序列表，列表里面\<li\>标记了列表元素(list item)开始的位置，\</li\>标记了列表元素结束的位置。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    An UnOrdered List
    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
      <li>Foorth item</li>
    </ul>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 表格
 &emsp;&emsp;&emsp;&emsp;一个HTML表格由\<table\>标签定义。

 &emsp;&emsp;&emsp;&emsp;表格里面的一行由\<tr\>定义，\<td\>定义了行里面的一个单元格，\<th\>标签用于定义表格的表头。

 &emsp;&emsp;&emsp;&emsp;同理，起始标签（比如\<table\>,\<tr\>,\<td\>，\<th\>）都需要和对应的结束标签(\</table\>,\</tr\>,\</td\>,\</th\>)成对出现，两个标签之间是对应表格、行、单元格、表头的内容。  

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <table style="width:100%">
      <tr>
        <th>Firstname</th>
        <th>Lastname</th> 
        <th>Age</th>
      </tr>
      <tr>
        <td>Jill</td>
        <td>Smith</td> 
        <td>50</td>
     </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td> 
        <td>94</td>
      </tr>
    </table>
     <p>&emsp;&emsp;&emsp;&emsp;请尝试修改width="100%"中的百分比。</p>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 表格单元格（cell）之间的边框  

 &emsp;&emsp;&emsp;&emsp;\<table\>里面的**border="1"**属性表示表格中的单元格（cell）之间显示边框。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <table border="1">
      <tr>
        <th>Firstname</th>
        <th>Lastname</th> 
        <th>Age</th>
      </tr>
      <tr>
        <td>Jill</td>
        <td>Smith</td> 
        <td>50</td>
     </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td> 
        <td>94</td>
      </tr>
    </table>
    <p>请尝试把<strong>border="1"</strong>修改为<strong>border="0"</strong>。</p>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 占据多列（column）的表格单元格（cell）  

 &emsp;&emsp;&emsp;&emsp;表格中的单元格（Cell）可以横跨多列（column），只需要修改colspan属性的值就可以了。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <table border="1" style="width:100%">
      <tr>
        <th>Name</th>
        <th colspan="1">Telephone</th>
      </tr>
      <tr>
        <td>Bill Gates</td>
        <td>55577854</td>
        <td>55577855</td>
       </tr>
    </table>
     <p>请尝试把<strong>colspan</strong>的数字修改为2。</p>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 占据多行（row）的表格单元格（cell）  

 &emsp;&emsp;&emsp;&emsp;表格中的单元格（Cell）可以横跨多列（column），只需要修改colspan属性的值就可以了。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <table border="1" style="width:100%">
      <tr>
        <th>Name:</th>
        <td>Bill Gates</td>
      </tr>
      <tr>
        <th rowspan="1">Telephone:</th>
        <td>55577854</td>
      </tr>
      <tr>
        <td>55577855</td>
      </tr>
        </table>
         <p>请尝试把<strong>rowspan</strong>的数字修改为2。</p>
        </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 表格的标题  

 &emsp;&emsp;&emsp;&emsp;表格的标题可以用\<caption\>标签定义。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <table border="1" style="width:100%">
    <caption>Monthly savings</caption>
      <tr>
        <th>Month</th>
        <th>Savings</th>
      </tr>
      <tr>
        <td>January</td>
        <td>$100</td>
      </tr>
      <tr>
        <td>February</td>
        <td>$50</td>
      </tr>
      </table>
      <p>请尝试把两个<strong>caption</strong>标签之间的文本修改为中文。</p>
      </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### \<img\>图片标签

 &emsp;&emsp;&emsp;&emsp;Web网页使用\<IMG\>标签显示图片。浏览器根据\<IMG\>标签的**SRC**属性值到某个地址读取并显示图片。下面的例子，\<IMG\>标签的**SRC**属性使用了**http://**开头的网络地址，网页显示了一个来自网络的图片。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <p>你可以为标签增加<strong>width="300" height="250"</strong>>属性，调整图片大小。</p>
    <IMG src="http://img.weixinyidu.com/160107/0b2bd0cc.jpg"/>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### \<a\>超级链接

 &emsp;&emsp;&emsp;&emsp;我们在网上随处可见的超级链接（hyper link）由\<a\>标签生成，该链接允许人们从当前页面跳转到目标页面。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <a href="http://www.w3schools.com/">W3C School</a>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

### 把图片做成超级链接

 &emsp;&emsp;&emsp;&emsp;我们还可以用一张图片，来实现超级链接。这次，我们为图标增加了一个标题。

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <HTML>
    <BODY>
    <p>你可以尝试把图片的标题修改成你想要内容。</p>
    <a href="http://www.w3schools.com/">
    <IMG 
    src="http://img.weixinyidu.com/160107/0b2bd0cc.jpg" 
    width="500" height="400"
    title="就差一个码农了"/>
    </a>
    </BODY>
    </HTML>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

## 1.2 XHTML1.0基本语法  

> XHTML是遵照XML规范写成的HTML。具体地说：  

 - XHTML的意思是**EXtensible HyperText Markup Language**，可扩展的超文本标记语言  

 - XHTML几乎和HTML一样  

 - XHTML的遵循更严格的语法规则  

 - XHTML是按照XML语法规范定义的HTML  

### 为什么要使用XHTML

 &emsp;&emsp;&emsp;&emsp;因为历史方面的原因，现在互联网上充斥着各种各样**坏的HTML**。这些HTML代码，甚至在不遵循HTML规范的情况下仍然能在大多数浏览器里面正常工作。  

    <html>
     <head>
      <title>This is bad HTML</title>
     <body>
      <h1>Bad HTML
      <p>This is a paragraph
    </body>

[点击复制按钮并在打开新窗口粘贴、运行以上代码](/public/tiyEditor.html)  

 &emsp;&emsp;&emsp;&emsp;当今的互联网市场上有很多不同的浏览器技术。其中的一部分浏览器在PC台式机运行，另外一些浏览器只能在手机、平板等移动设备商运行。在计算能力更弱的移动设备上，浏览器通常缺少足够的资源来解释运行那些**坏的HTML**。

 &emsp;&emsp;&emsp;&emsp;XML正好是一种语法更严格、结构更清晰、内容组织更有条理的标记语言。面对语法松散的HTML，就有人考虑，是不是可以把XML的优点融合到HTML语言里面来，于是XHTML诞生了。

 &emsp;&emsp;&emsp;&emsp;XHTML是遵循XML语法规范写成的HTML。  

### XHTML与HTML相比最大的不同  

> 文档结构

 - XHTML文档的文件名必须以***.xhtml**为结尾
 - XHTML中DOCTYPE是必须元素，而HTML中这个可以不写
 - XHTML文档中\<html\>根元素里面必须声明**xmlns="http://www.w3.org/1999/xhtml"**
 - \<html\>, \<head\>, \<title\>, 和\<body\>的文档结构缺一不可

&emsp;&emsp;&emsp;&emsp;下面的代码展示了一个最简单的XHTML:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
       <title>Title of document</title>
    </head>
    <body>
       some content 
    </body>
    </html>

---

> XHTML元素

 - XHTML元素必须遵守严格的嵌套格式
 - XHTML元素必须被关闭
 - XHTML元素标签必须被写成小写字母
 - XHTML文档必须又一个根元素


---

#### 规范嵌套

&emsp;&emsp;&emsp;&emsp;在HTML中，很多元素的嵌套格式不规范，不影响浏览器解析元素、显示内容。比如,html文档允许出现这样的写法：

    <b><i>This text is bold and italic</b></i>

&emsp;&emsp;&emsp;&emsp;在XHTML中，就必须写成下面的样子：

    <b><i>This text is bold and italic</i></b>


---

#### 起始标签必须对应一个关闭标签

&emsp;&emsp;&emsp;&emsp;下面的写法在XHTML中是错误的：

      <p>This is a paragraph
      <p>This is another paragraph

&emsp;&emsp;&emsp;&emsp;正确的写法应该是这样的：

    <p>This is a paragraph</p>
    <p>This is another paragraph</p>

---

#### 空元素必须被关闭

&emsp;&emsp;&emsp;&emsp;下面的写法在XHTML中是错误的：

    换行: <br>
    水平线: <hr>
    图片: <img src="http://img.weixinyidu.com/160107/0b2bd0cc.jpg" alt="Happy face">

&emsp;&emsp;&emsp;&emsp;在XHTML中应该是这样写的：

    换行: <br />
    水平线: <hr />
    图片: <img src="http://img.weixinyidu.com/160107/0b2bd0cc.jpg" alt="Happy face" />

---

#### XHTML元素标签必须写成小写

&emsp;&emsp;&emsp;&emsp;下面的写法在XHTML中是错误的：

    <BODY>
    <P>This is a paragraph</P>
    </BODY>

&emsp;&emsp;&emsp;&emsp;在XHTML中应该是这样写的：

    <body>
    <p>This is a paragraph</p>
    </body>


---

> XHTML属性

 - 属性名必须写成小写字母
 - 属性值必须被双引号包裹
 - 属性不能被简写

---

#### XHTML元素的属性必须写成小写

&emsp;&emsp;&emsp;&emsp;下面的写法在XHTML中是错误的：

    <table WIDTH="100%">

&emsp;&emsp;&emsp;&emsp;在XHTML中应该是这样写的：

    <table width="100%">

---

#### XHTML属性值必须使用双引号包裹

&emsp;&emsp;&emsp;&emsp;下面的写法在XHTML中是错误的：

    <table width=100%>

&emsp;&emsp;&emsp;&emsp;在XHTML中应该是这样写的：

    <table width="100%">

---


### XHTML属性不能简写

&emsp;&emsp;&emsp;&emsp;下面的写法在XHTML中是错误的：

    <input type="checkbox" name="vehicle" value="car" checked />

&emsp;&emsp;&emsp;&emsp;在XHTML中应该是这样写的：

    <input type="checkbox" name="vehicle" value="car" checked="checked" />

&emsp;&emsp;&emsp;&emsp;下面的写法在XHTML中是错误的：

    <input type="text" name="lastname" disabled />

&emsp;&emsp;&emsp;&emsp;在XHTML中应该是这样写的：

    <input type="text" name="lastname" disabled="disabled" />

---

# 2. 万维网上的标记语言

## 2.1 源起

&emsp;&emsp;HTML和XHTML都是适应万维网（World Wide Web）发展要求的标记语言，有一个共同的“祖先”--- **SGML**。  

### SGML

&emsp;&emsp;现今所有标记语言的“祖先”，标准通用标记语言(SGML，standard general Markup Language)诞生于1986年，是一种可以定义标记语言的元语言，同时也是一个ISO标准，编号**ISO 8879:1986**。

---

![html-xhtml-history](/public/img/html/html-xhtml-history.png)  

---

### [W3C](https://zh.wikipedia.org/wiki/%E4%B8%87%E7%BB%B4%E7%BD%91%E8%81%94%E7%9B%9F){:target="_blank"}

&emsp;&emsp;W3C（the international World Wide Web Consortium,全名：国际万维网联盟）诞生于1994年10月，地点是麻省理工学院计算机科学实验室，建立者是互聯網的发明者蒂姆·伯纳斯-李,该组织制订和发布了一系列促进万维网（www,The World Wide Web）发展的技术规范，其中就包括XML和CSS等的众多影响深远的标准规范。

---

### 超文本标记语言（HTML，Hyper Text Markup Language）

&emsp;&emsp;诞生于1990年，基于SGML标准，是一种用于创建网页的标准标记语言，常与CSS、JavaScript一起被众多网站用于设计令人赏心悦目的网页、网页应用程序以及移动应用程序的用户界面。网页浏览器可以读取HTML文件，并将其渲染成可视化网页。

---

### 可扩展标记语言（XML,extensiable Markup Language）

&emsp;&emsp;专家们使用SGML精简制作，并依照HTML的发展经验，产生出一套使用上规则严谨，但是简单的描述数据语言。XML设计用来传送及携带数据信息，不用来表现或展示数据，HTML语言则用来表现数据，所以XML用途的焦点是它说明数据是什么，以及携带数据信息，因而可以被广泛地应用为互联网的数据交换格式。

---

### 可扩展HTML（XHTML,extensiable Hyper Text Markup Language）

&emsp;&emsp;这种符合XML标准的HTML语法更严格，而且遵从统一规范，比起HTML可以更好地兼容不同平台和多种浏览器.

---

## 2.2 变革

![html-xhtml-relation](/public/img/html/xhtml-way.gif)  

&emsp;&emsp;W3C组织于1997年12月18日发布HTML4.0推荐标准，于1999年12月24日发布HTML 4.01推荐标准，其中后者作为HTML4规范中的最新版本沿用至今。  

&emsp;&emsp;根据W3C组织的描述，XHTML 1.0规范继承了HTML4的规范内容，同时基于XML1.0进行重新修订，新的XHTML1.0完全符合XML1.0规范，因而人们可以像使用XML一样方便地传输内容、展示网页，实现了良好的兼容性和交互性。后来经过一次内容修订，XHTML版本号最终停止在1.1，也就是大家常常用到的XHTML1.1。  


---

# 3. 下一步做什么？

&emsp;&emsp;学习HTML不需要很高的智商，你只是需要会时间记住许多语法规则，并且不断地熟练运用；你用的越多，写的代码越多，你就会掌握更多语法技巧，也会写出更好的HTML代码。

&emsp;&emsp;HTML是学习创建网页过程中你需要了解的第一们技术，接下来你还会学习到Javascript和CSS技术，在网页应用和使用者互动、让网页按照你想要的样子显示出来。这三种技术结合起来，你就可以创建一个漂亮的网站。但是请记住，这样的网站，网页内容将会保持不变，我们也称之为静态网站。

![html-xhtml-relation](/public/img/html/html-css-js.png)  

&emsp;&emsp;学习HTML编程的最好方法不是去买一本枕头书，挨个章节地学习语法、做练习。事实上，互联网上有很多现成的学习HTML编程的材料、教程，你完全可以非常轻松的边做边学，一边操作实例、查看效果，一边掌握知识，并且立即把你的刚刚了解到的知识应用到实战过程中，这样你就真正完整了**从知识到技能**的快速转换。记住，这对于每一位想要学习创建网站的新人都非常重要。

&emsp;&emsp;这些学习资源中，最权威、最完整的莫过于[W3School](http://www.w3school.com.cn/)提供的入门教程。

## 3.1 在W3School学习HTML

&emsp;&emsp;打开[W3School的HTML首页](http://www.w3school.com.cn/html/index.asp)，你会看到页面的左侧是一个HTML基础教程的列表，右侧则是一个完整的基础教程的入口：

![html-xhtml-relation](/public/img/html/w3c-html-index.PNG)  

&emsp;&emsp;点击**现在开始学习 HTML**,页面会跳转到一个新的页面，从这里你将会开始一个轻松愉快的学习旅程。W3School编排的课程内容非常是适合初学者。

![html-xhtml-relation](/public/img/html/w3school-html-intro.PNG)  

## 3.1 下载W3School离线版

&emsp;&emsp;如果你不想每次都跑到互联网上去，或者你的网速没有那么好，你也可以使用W3school的离线文件包。有很多好事的程序员已经准备好了这个令人心动的学习资料了！这里提供一个CSDN的[W3Scholl离线包](http://download.csdn.net/detail/twh_klr/9433659)的地址,同学们可以尝试下载。
 
