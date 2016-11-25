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



# 实验一：用CSS控制DIV浮动布局网页

目的：用DIV元素给页面划分区域、用CSS定义不同区域的位置关系，完成网页布局。

&emsp;&emsp;在实验结束的时候，同学们会看到一个内容分为**头部**、**左边导航栏**、**正文内容**、**右边导航栏**和**底部版权信息栏**组成的网页布局，效果如图：

 ![html-xhtml-relation](/public/img/html/css-layout-final-image.PNG)

## 2.1 在页面上划分出不同区域

### 使用DIV标签

&emsp;&emsp;为达到把页面划分为5个内容区域的目的，在空白body内容去加入以下代码：

    <!-- 页面内容区域开始 -->
    <div class="main">
      
     <!-- 最上方头部区域 -->
     <div class="head"></div>
     <!-- 中间区域第一列 -->  
     <div class="nav"></div>
     <!-- 中间区域第二列 -->  
     <div class="content"></div>
     <!-- 中间区域第三列 --> 
     <div class="rigth"></div>  
     <!-- 底部页脚区域 --> 
     <div class="foot"></div>   
    </div>
    <!-- 页面内容区域结束 -->

### 定义区域背景颜色

&emsp;&emsp;在页面头部加入CSS代码，为五个区域设置不同的背景颜色：

    <style>

      div div {
        //为所有内层div设置默认宽度
        height:200px; 
      }

      .head {
         background-color:#441111;
      }

      .nav {
         background-color:#ffdd99;
      }

      .right {
         background-color:#bb9955; 
      }

      .foot  {
         background-color:#bb9955;
      }
    </style>

&emsp;&emsp;刷新页面之后可以看到下面的页面效果：

 ![css_div_float_layout_step_01](/public/img/css/css_div_float_layout_step_01.gif)

&emsp;&emsp;可以看到，默认情况下这5个div的宽度会占满浏览器窗口，从上到下依次排列。


## 2.2 用CSS定义各区域的位置关系

&emsp;&emsp;完成页面布局的关键是：如何把中间三个div按照从左到右的顺序在浏览器窗口中横向排开。

### 用CSS控制中间三个div左浮动

&emsp;&emsp;想要实现三个div在浏览器窗口里面从左到右排成三列的效果，需要对中间三个div应用新的CSS属性。

&emsp;&emsp;具体代码如下：


    .nav {
       background-color:#ffdd99;
       float:left; //左浮动
       width:20%;// 宽度占浏览器窗口20%
    }

    .content {
       float:left; //左浮动
       width:60%;  //宽度占浏览器窗口60%
    }

    .right {
       background-color:#ffdd99; 
       float:left; //左浮动
       width:20%;  //宽度占浏览器窗口20%
    }


&emsp;&emsp;刷新页面之后可以看到下面的页面效果:

 ![css_div_float_layout_step_02](/public/img/css/css_div_float_layout_step_02.gif)


### 用CSS控制(.foot)div的位置

&emsp;&emsp;通过在Chrome DevTools查看元素，反复对比，我们可以做出一个判断：class属性是“.foot”的div元素被应用了“float”属性的三个div遮盖了：

 ![css_div_float_layout_step_03](/public/img/css/css_div_float_layout_step_03.gif)

&emsp;&emsp;我们可以通过在底部div上应用CSS属性，清除它上方的浮动元素。代码如下：

      .foot  {
         background-color:#bb9955;
         clear:both; //清除浮在它上方（浏览器窗口左右两边的）的其他元素
      }

&emsp;&emsp;重新刷新页面，可以看到： 

 ![css_div_float_layout_step_04](/public/img/css/css_div_float_layout_step_04.gif)

## 2.3 使用页面元素的盒子属性

### 重置body元素外边距

&emsp;&emsp;细心的同学肯定注意到：外层容器div（class=".main"）的上边和左右两边都有一条细长的白色边线。

&emsp;&emsp;在Chrome Devtools界面查看body元素的“Styles”详情，大家可以看到应用在它上面的全部CSS规则，其中有一个“margin:8px”的**浏览器默认设置**（*user agent stylesheet*）。

 ![css_div_float_layout_step_05_1](/public/img/css/css_div_float_layout_step_05_1.gif)


&emsp;&emsp;我们来自定义一条CSS规则，覆盖浏览器默认的CSS属性。

&emsp;&emsp;代码如下：

      * { //选中全部元素
       margin : 0;  //外边距为0
      }

&emsp;&emsp;刷新页面，可以看到下面的效果：

 ![css_div_float_layout_step_05](/public/img/css/css_div_float_layout_step_05.gif)

&emsp;&emsp;围绕在最外层容器div的三条空白细线消失了。

### 头部img元素的盒子属性

&emsp;&emsp;头部内容区（class=".head"）有一个img元素和一个大标题元素。

&emsp;&emsp;请大家根据已经掌握的HTML知识完成以下步骤：

 1. 引用放在与“html”文件夹同一个级别的“imges”目录下的图片
 2. 用CSS控制img元素向左浮动，宽90px，高90px，
 3. 用CSS控制大标题元素左浮动，字体颜色为白色，行高（line-height）为80px

&emsp;&emsp;完成上述三步操作以后，你会看到类似这样的页面效果：

 ![css_div_layout_01_head](/public/img/css/css_div_layout_01_head.png){:width="400px" height="400px"}

&emsp;&emsp;在头部div内，图片左边紧贴div的左边界。

&emsp;&emsp;我们可以通过修改img元素的盒子属性，微调它的位置。代码如下：

    .head img {
         /*
	     此处是省略对元素宽、高、和左浮动的CSS声明......
         */
	     padding:5px; //设置内边距5个像素
         margin-right:20px; //设置右外边距20px
    }

&emsp;&emsp;刷新页面以后可以看到：

 ![css_div_float_layout_step_06](/public/img/css/css_div_float_layout_step_06.gif)


## 2.4 练习：根据图片效果编写HTML代码

&emsp;&emsp;接下来的工作就是往左边栏、中间内容区、右边栏和底部区域填充内容。这些工作完全可以用已经掌握的的HTML和CSS相关知识来完成。

 ![ccs_div_layout_final_preview](/public/img/css/ccs_div_layout_final_preview.png)

&emsp;&emsp;大家只要做出最后这样的效果就可以了。这是一个很简单的练习，请你务必自己动手完成。

&emsp;&emsp;

&emsp;&emsp;

# 实验一的解读

&emsp;&emsp;实验一我们主要做了下面几件事：

1. 用div划分页面分区
2. 用CSS的浮动和清除浮动属性控制div的排列方式
3. 用CSS修改元素的盒子属性，调整div容器内的页面元素显示效果

## 用div给页面内容分块

&emsp;&emsp;div，英文全名是division：

> The division of a large unit into two or more distinct parts is the act of separating it into these parts.

&emsp;&emsp;我们可以用div把一个完整的页面划分成几个不同的区块，然后把每个区块对应的div当成可以容纳其他页面内容的容器（container），最后用CSS来控制这些区块的排列方式和视觉效果。这是一种被广泛应用的网页布局方法。

 ![div_plus_css](/public/img/css/div_plus_css.jpg)

&emsp;&emsp;在实验一里面我们就是这么干的。

&emsp;&emsp;

## CSS浮动和清除浮动

&emsp;&emsp;清澈的水面上，正浮动着一只小木船。你与没有过坐在船上向水面下面看的经历呢？正如小船一样，在我们布局网站页面的过程中网页元素也可以浮动起来。究竟是怎么回事，我们一起来看！

 ![floating-boat](/public/img/html/floating-boat.jpg)

&emsp;&emsp;为了改变中间三个div默认的排列方式，我们用CSS设置三个div的**浮动**属性为左浮动。

&emsp;&emsp;我们一起来看这三个div是如何一步一步离开默认文档流。

### 在Chrome DevTools里查看div浮动

&emsp;&emsp;首先，“.nav”、“.content”、“.right”和“.foot”这几个div的“float”和“clear”属性禁用掉，大家可以看到，在这个情况下这些div的排列方式是什么样的。

 ![css_div_float_layout_step_07](/public/img/css/css_div_float_layout_step_07.gif)

&emsp;&emsp;接下来我们来重现实验三里用CSS控制div排列的过程：

 ![css_div_float_layout_step_08](/public/img/css/css_div_float_layout_step_08.gif)

&emsp;&emsp;这是一个div元素通过浮动离开各自默认位置的过程。借助于Chrome DevTools的元素选择器，我们可以很容易检查到这里面的种种细节。

&emsp;&emsp;

&emsp;&emsp;

## CSS盒子模型

### HTML元素的形状

&emsp;&emsp;不仅div元素是长方形盒子，一切HTML元素都是长方形盒子！每一个盒子都会有宽（width）,高（height）, 内边距（padding）, 边框（border） 和 外边距（margin）这些盒子属性。

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

### 通过实例演示盒子属性

&emsp;&emsp;在继续上面的代码，**首先**为p标签设置的样式中增加内边距属性：

       padding: 25px;

&emsp;&emsp;可以看到，这个时候p标签的蓝色边框和段落文本的距离拉宽了：

![html-xhtml-relation](/public/img/html/p_padding-demo.PNG)

&emsp;&emsp;还有一个明显的变化是：p标签的显示尺寸变大了，原因就是内边距变大了。


&emsp;&emsp;**第二步**，为p标签设置的样式中增加外边距属性：

     margin: 25px;

&emsp;&emsp;可以看到，银灰色区域所对应的外边距区域增大了：

![html-xhtml-relation](/public/img/html/p_margin_demo.PNG)

&emsp;&emsp;你还可以把外边距的像素值设置成更大的数值，看一看页面又会发生什么变化。


&emsp;&emsp;**第三步**，为p标签设置的样式中增加如下代码：

       width :150px;
       height :200px;

&emsp;&emsp;作为一个习题，大家可以自己去看看实际效果是什么样的？

### 描述盒子模型

&emsp;&emsp;有一只猫正躺在盒子里睡觉，盒子外面又套一个大盒子。

&emsp;&emsp;以猫睡觉的盒子作比喻形象地说，猫是盒子里面的内容（content），盒子四面和猫之间的距离是内边距（padding），四面的纸板是盒子边框，小盒子与大盒子之间的距离是外边距（margin）。

 ![html-xhtml-relation](/public/img/html/css-model-cat-in-box.jpg)

&emsp;&emsp;基于感性的直观认识之上，下面是盒子模型的概念图：

 ![html-xhtml-relation](/public/img/html/w3c_css_box_model.gif)

## CSS属性简写

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


&emsp;&emsp;

&emsp;&emsp;

# 实验二：制作基于CSS的下拉菜单

目的：把div和ul标签结合起来，借助CSS特效，实现一个简单的两级下拉菜单。

&emsp;&emsp;在实验结束以后，你可以看到下面的一个两级菜单：

 ![css_div_ul_dropdown_menu_01](/public/img/css/css_div_ul_dropdown_menu_01.gif)

## 2.1  组合菜单内容

### 用div充当菜单容器

&emsp;&emsp;在页面上创建一个div，我们会把菜单的所有内容都放进这个容器。

    <!-- 页面内容区域开始 -->
    <div id="multi_drop_menus">
      <!-- 这里是菜单的内容区域 -->
    </div>
    <!-- 页面内容区域结束 -->

&emsp;&emsp;在页面头部加入下面的内部样式：

      <style>
        /* 
         选中容器内部的全部元素
         设置他们的盒子属性
        */
        #multi_drop_menus *{
	      margin: 0;
	      padding :0;
	    }

        /* 
         设置容器div边框宽度、类型和颜色
        */
       #multi_drop_menus{
	     border: 3px solid green;
	   }
      </style>

&emsp;&emsp;这时候div里面还没有内容，刷新页面以后，你应该只看到一条这样的线条：

 ![css_div_ul_dropdown_menu_02](/public/img/css/css_div_ul_dropdown_menu_02.png)


### 引入无序列表

&emsp;&emsp;在菜单容器里面加入ul无序列表。代码如下：

    <ul>
      <li>
	    <a href="#">菜单一</a>
	  </li>
	  <li>
	    <a href="#">菜单二</a>
	  </li>
    </ul>

&emsp;&emsp;在头部追加下面的CSS代码：

      #multi_drop_menus ul{
	    border: 2px solid red;
	  }

      #multi_drop_menus ul li{
	    border: 2px solid blue;
	    list-style-type:none;
	  }

&emsp;&emsp;刷新页面以后可以看到下面的页面效果：

 ![css_div_ul_dropdown_menu_03](/public/img/css/css_div_ul_dropdown_menu_03.png)

&emsp;&emsp;通过DevTools查看页面元素，我们可以看到以下几个细节：

1. body元素的外边距（margin）有浏览器默认的CSS定义，是8px
2. div、ul、a元素都有一个名字是“display”的属性，他们的值都是“block”
3. li元素也有一个名字是“list-item”

 ![css_div_ul_dropdown_menu_04](/public/img/css/css_div_ul_dropdown_menu_04.gif)

### 让两个菜单横向排列

&emsp;&emsp;根据已有的知识，要想达到这个目的，只需要让li元素全部左浮动。

      #multi_drop_menus ul li{
	    border: 2px solid blue;
	    list-style-type:none;
        float:left; //令li元素横向排列
	  }

&emsp;&emsp;可以看到，li浮动以后，它的上级元素div和ul的内容区变空了：

 ![css_div_ul_dropdown_menu_05](/public/img/css/css_div_ul_dropdown_menu_05.png)

&emsp;&emsp;想要让div和ul仍然包裹在li外面，就得让它们两个一起左浮动：

      #multi_drop_menus{
	    border: 2px solid red;
        float:left; //令div元素左浮动
	  }

      #multi_drop_menus ul{
	    border: 2px solid red;
        float:left; //令ul元素左浮动
	  }

&emsp;&emsp;刷新页面以后可以看到div、ul浮动以后的效果：

 ![css_div_ul_dropdown_menu_06](/public/img/css/css_div_ul_dropdown_menu_06.png)

### 修改菜单项内容样式

&emsp;&emsp;通过修改a元素内边距，可以达到这个目的。

&emsp;&emsp;使用下面的代码修改a元素的内边距，并且用为类选择器hover设置鼠标悬停效果：

	#multi_drop_menus a {
	   background:#DDD; //增加背景颜色
	   padding:1em 25px;//设置内边距
	}

	#multi_drop_menus a:hover {
	   background-color:#666; //设置鼠标悬停时的背景颜色
	   color:#CCC;//设置鼠标悬停时的字体颜色
	}

&emsp;&emsp;刷新页面以后可以看到：

 ![css_div_ul_dropdown_menu_07](/public/img/css/css_div_ul_dropdown_menu_07.png)

&emsp;&emsp;a元素的内容高出了它的上级元素，修改它的display属性可以让它把上级元素“撑高”起来：

	#multi_drop_menus a {
	   background:#DDD; //增加背景颜色
	   padding:1em 25px;//设置内边距，其中左右内边距更新为25px
       display:block; //显示方式为“块”
	}

&emsp;&emsp;刷新页面以后，可以看到菜单项文本比以前有了明显的扩张：

 ![css_div_ul_dropdown_menu_08](/public/img/css/css_div_ul_dropdown_menu_08.gif)


### 设置一二级菜单的定位方式

&emsp;&emsp;在每一个a标签后面嵌套一层无序列表作为二级菜单，菜单总体代码是这样的：

    <div id="multi_drop_menus">
      <ul>
        <li>
    	<a href="#">菜单一</a>
    	<ul>
    	 <li> <a href="#">菜单一.甲</a> </li>
    	 <li> <a href="#">菜单一.乙</a> </li>
    	</ul>
    	</li>
    	<li>
    	<a href="#">菜单二</a>
        <ul>
    	 <li> <a href="#">菜单二.甲</a> </li>
    	 <li> <a href="#">菜单二.乙</a> </li>
    	</ul>
    	</li>
      </ul>
    </div>

&emsp;&emsp;刷新页面以后可以看到：

 ![css_div_ul_dropdown_menu_09](/public/img/css/css_div_ul_dropdown_menu_09.gif)

&emsp;&emsp;用CSS设置菜单项目元素内容的定位方式：

    #multi_drop_menus ul li{
	  border: 2px solid blue;
	  list-style-type:none;
	  float:left;
	  position:relative;//定位方式为相对定位
	}	

	#multi_drop_menus ul li ul {
	   position :absolute;//定位方式为绝对定位
	   width:14em;
	}

	#multi_drop_menus ul li ul li {
	   width:100%;
	}

&emsp;&emsp;刷新页面以后可以看到：

 ![css_div_ul_dropdown_menu_10](/public/img/css/css_div_ul_dropdown_menu_10.gif)

&emsp;&emsp;特别值得注意的是：在应用了绝对定位的样式后，内层ul元素，被从它名为li的父元素内容区移出来，并且紧贴着这个父级li。

## 2.2  控制二级菜单的显示和隐藏

&emsp;&emsp;结合已经学过的CSS伪类选择器，我们只需要在鼠标悬停的时候让二级子菜单显示出来，鼠标离开的时候隐藏二级子菜单就可以了。

### 使用hover伪类选择器

&emsp;&emsp;根据CSS标准，控制HTML元素的隐藏和显示需要用到display属性。

&emsp;&emsp;继续修改CSS样式，代码如下：

	#multi_drop_menus ul li ul {
	   position :absolute;//定位方式为绝对定位
	   width:14em;
       display:none;  //默认情况下隐藏二级子菜单
	}

    /* 鼠标悬停到一级菜单的项目上的时候 */
	#multi_drop_menus ul li:hover ul {
       display:block;  //显示相应二级子菜单
	}

&emsp;&emsp;刷新页面可以看到如下效果：

 ![css_div_ul_dropdown_menu_11](/public/img/css/css_div_ul_dropdown_menu_11.gif)


&emsp;&emsp;至此，菜单的主体工作已经完成。

&emsp;&emsp;

## 2.3  修理边角效果


# 实验二的解读








---







## 2.4 嵌套盒子

&emsp;&emsp;继续上一小节的代码示例。既然所有HTML元素都是长方形盒子，我们再来看放在div盒子里面的段落（\<p\>）元素的盒子属性。

### 2.4.1 增加蓝色边框

&emsp;&emsp;在代码中为p标签设置的样式中增加表框属性：

    border : 5px solid blue;

&emsp;&emsp;最后发现效果是这样的：

![html-xhtml-relation](/public/img/html/p_blue_border.PNG)

---











# 4. 关于页面布局，你需要了解什么

&emsp;&emsp;这一次，我们把默认从上到下连续显示的三个div区域，改变为同一行里面左、中、右位置展示内容的三列区域。究竟为什么这样做可以，不这样做行不行，有没有别的方法能实现同样效果，这些是值得我们深入了解的问题。

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



## 4.4 定位

&emsp;&emsp;除了float属性，position属性也可以修改默认文档流。

###  相对（relative）定位

&emsp;&emsp;相对定位，根据事先设置好的垂直或水平位置，让这个元素“相对于”它在默认文档流里面的初始位置移动。

&emsp;&emsp;如果将 top 设置为 20px，那么框将在初始位置顶部下面 20 像素的地方。如果 left 设置为 30 像素，那么会在元素左边创建 30 像素的空间，也就是将元素向右移动。

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

### 绝对（absolute）定位

&emsp;&emsp;绝对定位就是把一个元素直接在页面上进行定位。

&emsp;&emsp;这种情况下，元素不会出现在默认的文档流里面，因此不存在可供参考的初始位置。那么，绝对定位参考的是什么呢？请看下面的小例子：

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

&emsp;&emsp;绝对定位的一个特点是：元素被直接定位到页面上的位置，比如说，相对于页面左侧100px，距离页面顶部150px。


# 5. 收官之作，完成底部区域

## 5.1 快速起步

&emsp;&emsp;页面底部一般用于显示版权信息，我们的这个例子中，这一块内容一个文字段落：

       <p>Footer</p>

&emsp;&emsp;我们仍然需要一个DIV来划分出页面上的一个区域：

    <div class="footer">
       <p>Footer</p>
    </div>

## 5.2 设置底部背景色

&emsp;&emsp;在文章头部加入如下样式代码：

      .footer { background-color:#bb9955;}

## 5.3 清除浮动效果

&emsp;&emsp;下面是底部栏设置颜色之后的样子：

 ![html-xhtml-relation](/public/img/html/div-footer-not-clear-float.png ) 

&emsp;&emsp;底部（footer）div位于默认文档流上，有三个div在默认文档流的“表面”上浮起来，跑到浏览器窗口的**左边**。为了解决三个div遮挡底部（footer）div的问题，我们可以通过设置CSS的clear属性，“**清除浮动**”:不允许其他元素浮动到底部（footer）div的左侧：

     .footer { clear:left;}

 ![html-xhtml-relation](/public/img/html/div-footer-clear-float.PNG) 

&emsp;&emsp;底部区域终于放对位置了！

&emsp;&emsp;元素样式的clear属性默认值是none，其他值还可以是right（清除右侧浮动）、both（清除两侧浮动）。大家可以根据需要在项目实战的时候灵活运用。

# 6. 你还需要了解什么

## 6.6 样式继承

# 7.更多思考

# 8.面试题
