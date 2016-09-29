---

layout: post

title: jQuery

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍jQuery。使用jQuery既能减少代码量，又能大幅提高开发效率。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

# 9.1 jQuery简介及环境搭建 #

## 9.1.1 jQuery简介 ##

jQuery是目前最流行的JavaScript程序库，它是对JavaScript对象及函数的封装。jQuery凭借其简洁的语法和跨平台的兼容性，极大的简化了JavaScript开发人员遍历HTML、操作DOM、控制页面样式、处理事件、执行动画、扩展新的jQuery插件和开发Ajax等操作。

jQuery的设计思想是write less do more（写的少，做的多）。一般情况下，jQuery能做的JavaScript也都能做，但使用jQuery既能减少代码量，又能大幅提高开发效率。

## 9.1.2 jQuery环境搭建 ##

**(1)获取jQuery库**

进入jQuery官网[http://jquery.com/](http://jquery.com/)，点击Download jQuery，如图，

![](http://i.imgur.com/LIQB5fJ.png)

*图9-01*

下载开发版或发布版的jQuery库，如下

![](http://i.imgur.com/bBfvRGe.png)

*图9-02*

开发版和发布版的区别如下：

<table>
   <tr>
      <td>版本型号</td>
      <td>文件名</td>
      <td>大小</td>
      <td>说明</td>
   </tr>
   <tr>
      <td>开发版</td>
      <td>jquery-版本号.js</td>
      <td>287KB</td>
      <td>完整无压缩版本，便于开发人员查看jQuery源码。主要用于调试、学习和开发。</td>
   </tr>
   <tr>
      <td>发布版</td>
      <td>jquery-版本号.min.js</td>
      <td>95KB</td>
      <td>经过工具进行了压缩，主要应用于发布的产品和项目。</td>
   </tr>
</table>

通常在开发时使用开发版；而在开发完毕后，进行项目发布时，再将开发版替换成发布版。

本书使用的jQuery库是jquery-1.12.3.js。

**(2)引入jQuery库**

引入jQuery库实际就是引入外部js文件，具体步骤如下（将jQuery库引入到index.jsp中）：

①在Web项目的WebContent目录中新建js目录，将jquery-1.12.3.js放入js目录，如图，

![](http://i.imgur.com/8W00OLf.png)

*图9-03*

②在index.jsp中引入js库，如下，

index.jsp

```
…
<html>
	<head>
        <!-- 引入jQuery库 -->
		<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		…
	</head>
	<body>
	    …
	</body>
</html>
```

## 9.1.3开发第一个jQuery程序 ##

index.jsp

```
…
<html>
	<head>
		<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		<script type="text/javascript">
		    $(document).ready(function() {
		        alert("hello jQuery");
		    });
		</script>
	</head>
	<body>
	   
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/g0ceFle.png)

*图9-04*

其中

```
$(document).ready(function() {
   …
});
```

作用类似于传统JavaScript中的window.onload事件，但仍然与window.onload有一些区别，如下

<table>
   <tr>
      <td></td>
      <td>window.onload</td>
      <td>$(document).ready()</td>
   </tr>
   <tr>
      <td>执行时机</td>
      <td>必须等待网页中所有的内容加载完毕后（图片、flash、视频等）才能执行</td>
      <td>网页中所有DOM文档结构绘制完毕后即刻执行，可能与DOM元素关联的内容（图片、flash、视频等）并没有加载完</td>
   </tr>
   <tr>
      <td>编写个数 </td>
      <td>同一页面不能同时编写多个</td>
      <td>同一页面能同时编写多个</td>
   </tr>
   <tr>
      <td>简化写法 </td>
      <td>无</td>
      <td>$(function(){}</td>
   </tr>
</table>

在编写jQuery程序时，美元符号“$”和关键字`“jQuery”`是等价的，例如以上代码也可以写成以下形式：

```
jQuery(document).ready(function() {
   …
});
```

## 9.1.4DOM对象和jQuery对象 ##

**(1)DOM模型**

在学习DOM对象之前，我们有必要先学习一下DOM模型。

DOM是Document Object Model（文档对象模型）的简称，只有(X)HTML、XML等文档结构的语言才具有DOM。

以HTML页面为例：每一个HTML页面，都具有一个DOM，每一个DOM都可以表示成一棵树。如下，是一个基本的HTML程序：

domDemo.html

```
<html>
	<head>
		<meta http-equiv="Content-Type" 
content="text/html; charset=UTF-8">
		<title></title>
	</head>
	<body>
	    <p title="选择你喜欢的颜色">你最喜欢的颜色是？</p>
	    <ul>
	        <li>紫色</li>
	        <li>绿色</li>
	        <li>蓝色</li>
	    </ul>
	    <img src="img.png" alt="颜色知识" /><br/>
	    <strong>颜色知识：<br/>
		        你知道上述颜色是暖色还是冷色吗？
		</strong>
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/NSkNuQS.png)

*图9-05*

可以把上面的HTML结构描述成一颗DOM树，如下图，

![](http://i.imgur.com/WmEdz0n.png)

*图9-06*

DOM中的节点通常分为三种类型：元素节点、属性节点和文本节点。

**①元素节点**

像domDemo.html中的`<html>`、`<body>`、`<p>`、`<li>`等标签形式的节点，就称之为元素节点。正是这些元素节点的堆积，才形成了一个HTML文档的结构。元素节点之中还可以嵌套一些子元素节点，例如本例中的`<li>`就是`<ul>`元素的子元素节点，而`<ul>`又是`<body>`元素的子元素节点，`<html>`元素是根元素节点等。

**②属性节点**

属性节点的作用是对元素节点进行更具体的描述。例如，`<img>`元素中的`src`和`alt`就是属性节点，可以用来对图片做进一步的描述。

不难发现，属性节点总是被放在元素节点的标签内，因此属性节点也算作是元素节点的子节点。但并不是所有元素节点都包含属性节点，例如，本例中`<ul>`元素就没有包含任何属性节点。

**③文本节点**

HTML文档的内容都是由文本节点提供的，文本节点就是指HTML中的文字内容。本例中的“你最喜欢的颜色是？”、“紫色”等都是文本节点。

文本节点总包含在元素节点的内部，例如`<li>`紫色`</li>`。但并不是所有元素节点都一定包含文本节点，例如`<img>`元素节点就没有包含文本节点。

**(2)DOM对象**

在JavaScript中，可以使用`getElementById()`或`getElementsByName()`等方法获取DOM元素节点。通过该方式得到的DOM元素就称之为DOM对象，DOM对象可以使用JavaScript中的方法或属性，如下：

```
var dom = document.getElementById("myId") ;//获取DOM对象
var html = dom.innerHTML ;//DOM对象使用JavaScript中的属性
```

**(3)jQuery对象**

通过`$()`将DOM对象包装后产生的对象，就是jQuery对象，例如：

```
//使用jQuery对象的html()方法，等价于document.getElementById("#myId ").innerHTML;
$("#myId").html();
```

以上代码将id=”myId”的DOM对象通过`$()`转为了jQuery对象，并且调用了jQuery对象的`html()`方法。

值得注意的是，DOM对象的方法/属性和jQuery对象的方法/属性是彼此独立的，即DOM对象只能使用DOM对象的方法/属性，而jQuery对象只能使用jQuery对象的方法/属性。例如DOM对象可以使用DOM对象拥有的`innerHTML`属性，但不能使用jQuery对象拥有的`html()`方法。

** (4)DOM和jQuery对象之间的相互转换**

刚才提到，DOM对象的方法/属性和jQuery对象的方法/属性是彼此独立的，但是在某些情况下，如果一定需要用DOM对象来调用jQuery对象的属性/方法；或者要用jQuery对象来调用DOM对象的属性/方法，就必须进行DOM对象与jQuery对象之间的类型转换。

**①将DOM对象转为jQuery对象**

将一个DOM对象用`$()`包裹起来，就可以转换成一个jQuery对象，即$(DOM对象)就是一个jQuery对象，如下：

```
var domObject = document.getElementById("myId");//获取一个DOM对象
var $jQueryObject = $(domObject); //通过$()将DOM对象转为jQuery对象
```

**②将jQuery对象转为DOM对象**

jQuery对象的本质是一个类似数组或集合的对象，而DOM对象的本质是一个普通的对象。因此jQuery对象转DOM对象的本质，就是将一个数组或集合转为一个普通对象。

**a.方式一**

将jQuery对象看作一个数组，通过使用数组下标的方式转为DOM对象，例如:

```
var $jqueryObject = $("#myId") ; //获取jQuery对象
var jsObject = jqueryObject[0] ; //通过数组下标的方式，将jQuery对象转为DOM对象
```

**b.方式二**

将jQuery对象看作一个集合，通过使用`get(index)`的方式转为DOM对象，例如:

```
var $jqueryObject = $("#myId") ; //获取jQuery对象
var jsObject = jqueryObject.get(0) ; //通过get(index)的方式，将jQuery对象转为DOM对象
```

说明：

 在JavaScript对象和jQuery对象的变量命名上，一般习惯给jQuery对象的变量名前加上$，以表示区分。例如，var $variable = jQuery对象; varvariable=DOM对象。

# 9.2 jQuery选择器 #

选择器是jQuery的根基，jQuery的大部分功能都依赖于选择器。jQuery选择器的语法规则类似于CSS选择器，可以用来选取网页中的元素，并且有着良好的浏览器兼容性。jQuery选择器的种类有很多，大体上可以分为类CSS选择器和过滤选择器。

## 9.2.1 类CSS选择器 ##

顾名思义，类CSS选择器的构成规则与CSS选择器完全相同，常用的类CSS选择器有jQuery基本选择器、层次选择器、属性选择器。

**(1) 基本选择器**

常见的基本选择器及简介如下表：

<table>
   <tr>
      <td>名称</td>
      <td>语法</td>
      <td>简介</td>
      <td>示例</td>
   </tr>
   <tr>
      <td>标签选择器</td>
      <td>$("HTML标签名")</td>
      <td>根据给定的标签名匹配元素</td>
      <td>$("h1")选取所有h1元素</td>
   </tr>
   <tr>
      <td>类选择器</td>
      <td>$(" .class名")</td>
      <td>根据给定的class匹配元素</td>
      <td>$(" .content")选取所有class= "content"的元素</td>
   </tr>
   <tr>
      <td>ID选择器</td>
      <td>$(" #id值")</td>
      <td>根据给定的id匹配元素</td>
      <td>$(" #myTitile")选取id="myTitile"的元素</td>
   </tr>
   <tr>
      <td>并集选择器</td>
      <td>$("选择器1, 选择器2" )</td>
      <td>将多个选择器用逗号隔开，取并集</td>
      <td>$("div,.title" )选取所有div和拥有class="title"的元素</td>
   </tr>
   <tr>
      <td>交集选择器</td>
      <td>$("选择器1选择器2")</td>
      <td>将多个选择器连续书写，取交集</td>
      <td>$("div.title")选取所有拥有class="title"的div元素</td>
   </tr>
   <tr>
      <td>全局选择器</td>
      <td>$("*")</td>
      <td>匹配所有元素</td>
      <td>$("*" )选取所有元素</td>
   </tr>
</table>

其中，在使用交集选择器时，除了“选择器1”以外的其他选择器不能是标签选择器（为了防止歧义），例如：无法用`$(".titlediv")`表示class="title"并且是`div`的元素，因为`.title`和`div`连在一起会造成歧义，会被程序理解成是`class= "titlediv"`的元素。

示例：
index.jsp

```
<html>
	<head>
		…
		<script type="text/javascript">
		    $(document).ready(function() {
		          //选择h3标签元素和class="content"元素的并集，将背景色设置为yellow
		        $("h3,.content").css("background","yellow");
		    });
		</script>
	</head>
	<body>
		<h2 class="content">class为content的h2...</h2>
	 	<h3 >h3...</h3>
	 	其他
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/EqVPiOX.png)

*图9-07*

**(2) 层次选择器**

层次选择器通过DOM 元素之间的层次关系来获取元素，如获取相邻关系、同辈关系、后代关系、父子关系的元素等，如下。

<table>
   <tr>
      <td>名称</td>
      <td>语法</td>
      <td>简介</td>
      <td>示例</td>
   </tr>
   <tr>
      <td>相邻元素选择器</td>
      <td>$("选择器1+选择器2" )</td>
      <td>选取紧邻选择器1所选元素之后的选择器2所选的元素（最多只选中1个元素）</td>
      <td>$(" h1+div " )选取紧邻&lt;h1&gt;元素之后的同辈元素&lt;div&gt;</td>
   </tr>
   <tr>
      <td>同辈元素选择器</td>
      <td>$("选择器1~选择器2" )</td>
      <td>选取选择器1所选元素之后的选择器2所选的所有元素（可能选中多个元素）</td>
      <td>$(" h1~div " )选取&lt;h1&gt;元素之后所有的同辈元素&lt;div&gt;</td>
   </tr>
   <tr>
      <td>后代选择器</td>
      <td>$("选择器1 选择器2" )</td>
      <td>选取选择器1所选元素内的选择器2（后代）所选的所有元素</td>
      <td>$("#titleId span" )选取# titleId下的所有&lt;span&gt;元素</td>
   </tr>
   <tr>
      <td>子选择器</td>
      <td>$("选择器1&gt;选择器2" )</td>
      <td>选取选择器1所选元素内的选择器2（子）所选的元素</td>
      <td>$(" # titleId&gt;span" )选取# titleId的子元素&lt;span&gt;</td>
   </tr>
</table>


示例：
index.jsp

```
<html>
	<head>
		…
		<script type="text/javascript">
		    $(document).ready(function() {
		         //后代选择器，获取并设置#menu内的所有<span>元素的背景颜色
		        $("#menu span").css("background-color","yellow");		    });
		</script>
	</head>
	<body>
		<div id="menu">
			<h2>水果分类</h2>
			<dl>
				<dt>新疆西瓜<span>特价</span></dt>
				<dd>西疆西瓜拥有...</dd>
			</dl>
			<dl>
				<dt>海南椰子<span>促销</span></dt>
				<dd>海南椰子拥有...</dd>
			</dl>
			<span>更多...</span>
		</div>
	 	其他	</body>
</html>
```

运行结果：

![](http://i.imgur.com/heN3NZX.png)

*图9-08*

**(3) 属性选择器**

属性选择器是通过HTML元素的属性来选择元素。

<table>
   <tr>
      <td>语法</td>
      <td>简介</td>
      <td>示例</td>
   </tr>
   <tr>
      <td>$([属性名])</td>
      <td>选取包含特定属性的元素</td>
      <td>$(" [name]" )选取含有name属性的元素</td>
   </tr>
   <tr>
      <td>$( [属性名=属性值] )</td>
      <td>选取属性值是某个特定值的元素</td>
      <td>$(" [name ='stuName']" )选取name属性值为“stuName”的元素</td>
   </tr>
   <tr>
      <td>$( [属性名!=属性值] )</td>
      <td>选取属性值不等于某个特定值的元素</td>
      <td>$(" [name!=' stuName ']" )选取name属性值不等于“stuName”的元素</td>
   </tr>
   <tr>
      <td>$( [属性名^=属性值] )</td>
      <td>选取属性值是以某个特定值开头的元素</td>
      <td>$(" [name ^='stu']" )选取name属性值以stu开头的元素</td>
   </tr>
   <tr>
      <td>$( [属性名$=属性值] )</td>
      <td>选取属性值是以某些特定值结尾的元素</td>
      <td>$(" [name $='me']" )选取name属性值以me结尾的元素</td>
   </tr>
   <tr>
      <td>$( [属性名*=属性值] )</td>
      <td>选取属性值是包含某些值的元素</td>
      <td>$(" [name * ='na']" )选取name属性值中含有na的元素</td>
   </tr>
</table>

示例：
index.jsp

```
<html>
	<head>
		…
		<script type="text/javascript">
		    $(document).ready(function() {
		       //将name属性值是以stu开头的元素的背景色设置为yellow
	          $("[name^=stu]").css("background-color","yellow");
		    });
		</script>
	</head>
	<body>
		<form action="">
			学号：<input type="text" name="stuNo" /><br/>
			姓名：<input type="text" name="stuName" /><br/>
			年级：<input type="text" name="gradName" /><br/>
		</form>
	 	其他
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/CHyUXYq.png)

*图9-09*

## 9.2.2过滤选择器 ##

过滤选择器是通过一些过滤规则来筛选元素，语法特点是使用“:”作为过滤选择器的标识符，如使用`$(“li:first”)`来过滤出第一个`li`元素。常见的过滤选择器有基本选择器、可见性选择器、表单对象选择器、内容选择器、子元素选择器等。

**(1)基本选择器**

基本过滤选择器可以选取第一个元素、最后一个元素、索引为偶数或奇数的元素、或根据索引选取元素，如下：

<table>
   <tr>
      <td>语法</td>
      <td>简介</td>
      <td>示例</td>
   </tr>
   <tr>
      <td>:first</td>
      <td>选取第一个元素</td>
      <td>$("li:first")选取所有&lt;li&gt;元素中的第一个&lt;li&gt;元素</td>
   </tr>
   <tr>
      <td>:last</td>
      <td>选取最后一个元素</td>
      <td>$("li:last")选取所有&lt;li&gt;元素中的最后一个&lt;li&gt;元素</td>
   </tr>
   <tr>
      <td>:even</td>
      <td>选取索引是偶数的所有元素（从0开始）</td>
      <td>$("li:even")选取索引是偶数的所有&lt;li&gt;元素</td>
   </tr>
   <tr>
      <td>:odd</td>
      <td>选取索引是奇数的所有元素（从0开始）</td>
      <td>$("li:odd")选取索引是奇数的所有&lt;li&gt;元素</td>
   </tr>
   <tr>
      <td>:eq(index)</td>
      <td>选取索引等于index的元素（从0开始）</td>
      <td>$("li:eq(1)")选取索引等于1的&lt;li&gt;元素</td>
   </tr>
   <tr>
      <td>:gt(index)</td>
      <td>选取索引大于index的元素（index从0开始）</td>
      <td>$("li:gt(1)")选取索引大于1的&lt;li&gt;元素（不包括1）</td>
   </tr>
   <tr>
      <td>:lt(index)</td>
      <td>选取索引小于index的元素（index从0开始）</td>
      <td>$("li:lt(1) ")选取索引小于1的&lt;li&gt;元素（不包括1）</td>
   </tr>
   <tr>
      <td>:not(选择器)</td>
      <td>选取除指定选择器选中以外的元素</td>
      <td>$("li:not(#myTile)")选取id值不是myTile的元素</td>
   </tr>
   <tr>
      <td>:header</td>
      <td>选取所有标题元素，如h1、h2、h3…</td>
      <td>$(":header" )选取网页中所有标题元素</td>
   </tr>
   <tr>
      <td>:focus</td>
      <td>选取当前获取焦点（光标）的元素</td>
      <td>$(":focus" )选取当前获取焦点的元素</td>
   </tr>
</table>

示例：
index.jsp

```
<html>
	<head>
		…
		<script type="text/javascript">
		    $(document).ready(function() {
		       …
		       //改变索引值大于1的&lt;li&gt;元素的背景颜色
		       $("li:gt(1)").css("background-color","yellow");
		    });
		</script>
	</head>
	<body>
		…
		 <ul>
	        <li>紫色</li>
	        <li>绿色</li>
	        <li>蓝色</li>
	    </ul>
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/TlG0g5m.png)

*图9-10*

**(2)可见性选择器**

可见性过滤选择器可以根据元素显示状态来选取元素，如下：

<table>
   <tr>
      <td>语法</td>
      <td>简介</td>
      <td>示例</td>
   </tr>
   <tr>
      <td>:visible</td>
      <td>选取所有可见的元素</td>
      <td>$(":visible" )选取所有可见的元素</td>
   </tr>
   <tr>
      <td>:hidden</td>
      <td>选取所有隐藏的元素</td>
      <td>$(":hidden" ) 选取所有隐藏的元素</td>
   </tr>
</table>

例如`$("p:hidden").show()`表示将所有隐藏的`<p>`元素的状态变为显示; `$("p:visible").hide()`表示将所有显示的`<p>`元素的状态变为隐藏。`show()`的功能是显示，`hide()`的功能是隐藏，会在后续章节详解。

# 9.3事件 #

事件是指可以被控件识别的操作。例如按下确定按钮，选择某个单选按钮或者复选框。每一种控件有自己可以识别的事件，如窗体能识别加载、单击、双击等事件，文本框能识别文本改变等事件……

jQuery事件是对JavaScript事件的封装，大体上可以分为基础事件和复合事件。

事件方法的语法格式如下：

事件方法名(function(){
…
});

例如：文档就绪事件

```
$(document).ready(function() {
	…
});
```

## 9.3.1基础事件 ##

基础事件可以分为window事件、鼠标事件、键盘事件、表单事件等。

**(1) window事件**

所谓window事件，就是指当用户执行某些会影响浏览器的操作时而产生的事件。例如，第一次打开网页时的加载页面、关闭窗口、移动窗口、调节窗口大小等操作引发的事件。在jQuery中，最常用的window事件是文档就绪事件，即当页面中的DOM元素全部加载完毕时所触发的事件，该事件对应的方法是`ready()`。

**(2)鼠标事件**

鼠标事件是指当用户在文档中移动或单击鼠标时而产生的事件，常用鼠标事件的方法有：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>click( )</td>
      <td>单击鼠标时，触发的事件方法</td>
   </tr>
   <tr>
      <td>mouseover( )</td>
      <td>鼠标悬浮在某个元素上时，触发的事件方法</td>
   </tr>
   <tr>
      <td>mouseout( )</td>
      <td>鼠标移出某个元素时，触发的事件方法</td>
   </tr>
</table>

示例：event.jsp

```
<html>
<head>
    …
	<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		<script type="text/javascript">
		    $(document).ready(function() {
		    	//当鼠标悬浮在div元素上时
	    	   $("div").mouseover(function() {    
	    	       alert("鼠标悬浮...");      
	    	   });
	    	  //当鼠标移出div元素时
	    	   $("div").mouseout(function() {     
	    		   alert("鼠标移除...");   
	    	   });
		    });
		</script>
</head>
<body>
	<div style="border:1px solid red;">
		some text...
	</div>
</body>
</html>
```

运行结果：
当鼠标悬浮在边框上面时：

![](http://i.imgur.com/FGwyIMf.png)

*图9-11*

当鼠标移出边框时：

![](http://i.imgur.com/4jibxV5.png)

*图9-12*

**(3)键盘事件**

键盘事件是指每次按下或者释放键盘上的按键时所产生的事件，常用键盘事件的方法有：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>keydown( )</td>
      <td>按下键盘时，触发的事件方法</td>
   </tr>
   <tr>
      <td>keyup( )</td>
      <td>释放按键时，触发的事件方法</td>
   </tr>
   <tr>
      <td>keypress( )</td>
      <td>产生可打印的字符时，触发的事件方法</td>
   </tr>
</table>

使用键盘事件时，通常会使用`event`参数的`keyCode`属性来判断具体的按键，如下：

示例：event.jsp

```
<html>
<head>
…
	<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
	<script type="text/javascript">
		$(document).keydown(function (event) {
			//按回车键时触发（keyCode为13时，表示回车键）
	   		 if (event.keyCode == "13") {
	            alert("您按下了回车键");
	        }
		});
</head>
<body>
</body>
</html>
```

通过$(document).keydown(function (event) { … });给整个文档注册了`keydown`事件，当按下键盘时，就会触发`keydown`中的`function()`。并且通过event.keyCode判断当按下回车键时，执行`alert()`方法。常见`keyCode`所对应的按键如下：

**字母和数字键的键码值`(keyCode)`**

<table>
   <tr>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
   </tr>
   <tr>
      <td>BackSpace</td>
      <td>8</td>
      <td>Esc</td>
      <td>27</td>
      <td>Right Arrow</td>
      <td>39</td>
      <td>-_</td>
      <td>189</td>
   </tr>
   <tr>
      <td>Tab</td>
      <td>9</td>
      <td>Spacebar</td>
      <td>32</td>
      <td>Dw Arrow</td>
      <td>40</td>
      <td>.&gt;</td>
      <td>190</td>
   </tr>
   <tr>
      <td>Clear</td>
      <td>12</td>
      <td>Page Up</td>
      <td>33</td>
      <td>Insert</td>
      <td>45</td>
      <td>/?</td>
      <td>191</td>
   </tr>
   <tr>
      <td>Enter</td>
      <td>13</td>
      <td>Page Down</td>
      <td>34</td>
      <td>Delete</td>
      <td>46</td>
      <td>`~</td>
      <td>192</td>
   </tr>
   <tr>
      <td>Shift</td>
      <td>16</td>
      <td>End</td>
      <td>35</td>
      <td>Num Lock</td>
      <td>144</td>
      <td>[{</td>
      <td>219</td>
   </tr>
   <tr>
      <td>Control</td>
      <td>17</td>
      <td>Home</td>
      <td>36</td>
      <td>;:</td>
      <td>186</td>
      <td>\|</td>
      <td>220</td>
   </tr>
   <tr>
      <td>Alt</td>
      <td>18</td>
      <td>Left Arrow</td>
      <td>37</td>
      <td>=+</td>
      <td>187</td>
      <td>]}</td>
      <td>221</td>
   </tr>
   <tr>
      <td>Cape Lock</td>
      <td>20</td>
      <td>Up Arrow</td>
      <td>38</td>
      <td>,&lt;</td>
      <td>188</td>
      <td>'"</td>
      <td>222</td>
   </tr>
</table>

**字母和数字键的键码值`(keyCode)`**

<table>
   <tr>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
   </tr>
   <tr>
      <td>A</td>
      <td>65</td>
      <td>J</td>
      <td>74</td>
      <td>S</td>
      <td>83</td>
      <td>主键盘区1</td>
      <td>49</td>
   </tr>
   <tr>
      <td>B</td>
      <td>66</td>
      <td>K</td>
      <td>75</td>
      <td>T</td>
      <td>84</td>
      <td>主键盘区2</td>
      <td>50</td>
   </tr>
   <tr>
      <td>C</td>
      <td>67</td>
      <td>L</td>
      <td>76</td>
      <td>U</td>
      <td>85</td>
      <td>主键盘区3</td>
      <td>51</td>
   </tr>
   <tr>
      <td>D</td>
      <td>68</td>
      <td>M</td>
      <td>77</td>
      <td>V</td>
      <td>86</td>
      <td>主键盘区4</td>
      <td>52</td>
   </tr>
   <tr>
      <td>E</td>
      <td>69</td>
      <td>N</td>
      <td>78</td>
      <td>W</td>
      <td>87</td>
      <td>主键盘区5</td>
      <td>53</td>
   </tr>
   <tr>
      <td>F</td>
      <td>70</td>
      <td>O</td>
      <td>79</td>
      <td>X</td>
      <td>88</td>
      <td>主键盘区6</td>
      <td>54</td>
   </tr>
   <tr>
      <td>G</td>
      <td>71</td>
      <td>P</td>
      <td>80</td>
      <td>Y</td>
      <td>89</td>
      <td>主键盘区7</td>
      <td>55</td>
   </tr>
   <tr>
      <td>H</td>
      <td>72</td>
      <td>Q</td>
      <td>81</td>
      <td>Z</td>
      <td>90</td>
      <td>主键盘区8</td>
      <td>56</td>
   </tr>
   <tr>
      <td>I</td>
      <td>73</td>
      <td>R</td>
      <td>82</td>
      <td>主键盘区0</td>
      <td>48</td>
      <td>主键盘区9</td>
      <td>57</td>
   </tr>
</table>


<table>
   <tr>
      <td colspan="4">数字键盘上的键的键码值(keyCode)</td>
      <td colspan="4">功能键键码值(keyCode)</td>
   </tr>
   <tr>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
   </tr>
   <tr>
      <td>数字区0</td>
      <td>96</td>
      <td>数字区8</td>
      <td>104</td>
      <td>F1</td>
      <td>112</td>
      <td>F7</td>
      <td>118</td>
   </tr>
   <tr>
      <td>数字区1</td>
      <td>97</td>
      <td>数字区9</td>
      <td>105</td>
      <td>F2</td>
      <td>113</td>
      <td>F8</td>
      <td>119</td>
   </tr>
   <tr>
      <td>数字区2</td>
      <td>98</td>
      <td>数字区*</td>
      <td>106</td>
      <td>F3</td>
      <td>114</td>
      <td>F9</td>
      <td>120</td>
   </tr>
   <tr>
      <td>数字区3</td>
      <td>99</td>
      <td>数字区+</td>
      <td>107</td>
      <td>F4</td>
      <td>115</td>
      <td>F10</td>
      <td>121</td>
   </tr>
   <tr>
      <td>数字区4</td>
      <td>100</td>
      <td>数字区Enter</td>
      <td>108</td>
      <td>F5</td>
      <td>116</td>
      <td>F11</td>
      <td>122</td>
   </tr>
   <tr>
      <td>数字区5</td>
      <td>101</td>
      <td>数字区-</td>
      <td>109</td>
      <td>F6</td>
      <td>117</td>
      <td>F12</td>
      <td>123</td>
   </tr>
   <tr>
      <td>数字区6</td>
      <td>102</td>
      <td>数字区.</td>
      <td>110</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
   <tr>
      <td>数字区7</td>
      <td>103</td>
      <td>数字区/</td>
      <td>111</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
   </tr>
</table>

**多媒体键码值(keyCode)**

<table>
   <tr>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
      <td>按键</td>
      <td>键盘</td>
   </tr>
   <tr>
      <td>搜索</td>
      <td>170</td>
      <td>浏览器</td>
      <td>172</td>
      <td>音量减</td>
      <td>174</td>
      <td>停止</td>
      <td>179</td>
   </tr>
   <tr>
      <td>收藏</td>
      <td>171</td>
      <td>静音</td>
      <td>173</td>
      <td>音量加</td>
      <td>175</td>
      <td>邮件</td>
      <td>180</td>
   </tr>
</table>

**(4)表单事件**

表单事件是指在HTML表单内的动作所触发的事件，常用表单事件的方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>focus()</td>
      <td>获取焦点时，触发的事件方法</td>
   </tr>
   <tr>
      <td>blur()</td>
      <td>失去焦点时，触发的事件方法</td>
   </tr>
</table>

示例：event.jsp

```
<html>
<head>
…
	<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
	<script type="text/javascript">
		    $(document).ready(function() {
		    	$("#username").focus(function(){
                   //改变当前元素的背景色
		        	$(this).css("background-color","yellow") ;
		        });
		        $("#username").blur(function(){
		        	$(this).css("background-color","white") ;
		        });
		    	…
		    });
		</script>
</head>
<body>
	…
	<form action="">
		  用户名：<input type="text"  id="username"/><br/>
		 密码： <input type="password"  id="password"/><br/>
		  <input type="submit" value="显示">
	</form>
</body>
</html>
```

运行结果：

当鼠标光标在用户名的输入框时，背景色是黄色，如图：

![](http://i.imgur.com/HOe6ab1.png)

*图9-13*

当鼠标光标离开用户名的输入框时，背景色恢复为白色，如图：

![](http://i.imgur.com/o7kECEl.png)

*图9-14*

## 9.3.2绑定事件与移除事件 ##

如果需要为匹配的元素绑定或移除一个或多个事件，可以使用绑定事件方法`bind()`或移除事件方法`unbind()`。

**(1)绑定事件**

**语法：**

绑定一个事件：
jQuery对象.bind(type,[data],fn);

绑定多个事件：
jQuery对象.bind({type:fn, type:fn, …,type:fn});

其中参数的含义如下：

<table>
   <tr>
      <td>参数</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>type</td>
      <td>事件类型，如`click`、`focus`、`mouseover`等，还可以是自定义事件。</td>
   </tr>
   <tr>
      <td>data</td>
      <td>可选参数。可以作为event.data的属性值，传递给事件对象额外的数据。</td>
   </tr>
   <tr>
      <td>fn</td>
      <td>处理函数，用来绑定该事件的处理函数。</td>
   </tr>
</table>

**①绑定单个事件**

以绑定`click`事件为例。当单击`div`内容时，改变`div`的背景色，如下：

**示例：event.jsp**

```
<html>
<head>
    …
	<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
	<script type="text/javascript">
            …
		    $(document).ready(function() {
		    	 $("#textId").bind("click",function() {
		    		   $(this).css("background-color","yellow");
		    	 });
                …
		</script>
</head>
<body>
	<div style="border:1px solid red;" id="textId">
		some text...
	</div>
	 …
</body>
</html>
```

单击div后的运行结果：

![](http://i.imgur.com/NINgWsd.png)

*图9-15*

**②同时绑定多个事件**

还可以使用`bind()`方法，一次性绑定多个事件，如下：

**示例：event.jsp**

```
<html>
<head>
     …
	<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
	<script type="text/javascript">
		$(document).ready(function() {
		    $("#textId").bind({
		    	mouseover:function () {
		    		$(this).css("background-color","yellow");
		        },
		    	mouseout:function () {
		    			$(this).css("background-color","white");
		    	}
		    });
		    	…
		</script>
</head>
<body>
	<div style="border:1px solid red;" id="textId">
		some text...
	</div>
	…
</body>
</html>
```

当鼠标悬浮在div上面时，div背景色变为黄色，如图：

![](http://i.imgur.com/UuTNOKQ.png)

*图9-16*

当鼠标离开div后，div背景色恢复为白色，如图：

![](http://i.imgur.com/EA1JW8c.png)

*图9-17*

**(2)移除事件**

在jQuery中，可以使用`unbind()`方法为元素移除一个或多个事件。

语法:

jQuery对象.unbind([type],[fn]);

参数的简介如下：

<table>
   <tr>
      <td>参数</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>[type]</td>
      <td>事件类型，如click、focus、mouseover等，还可以是自定义事件。</td>
   </tr>
   <tr>
      <td>[fn]</td>
      <td>处理函数，用来解除绑定的处理函数。</td>
   </tr>
</table>

当`unbind()`不带参数时，表示移除绑定的全部事件。

## 9.3.3复合事件 ##

jQuery提供了两个复合事件方法：`hover()`和`toggle()`方法。

**(1)hover()**

`hover()`方法相当于`mouseover()`和`mouseout()`方法的组合

**语法：**

`jQuery对象. hover (fn1,fn2);`

其中，fn1相当于`mouseover()`，fn2相当于`mouseout ()`。

示例：

```
$("#textId").hover(
		function(){
$(this).css("background-color","yellow");
		},
		function(){
$(this).css("background-color","white");
		}		 
);
```

当鼠标悬浮到id=” textId”的`div`时，背景色变为黄色；鼠标移出时，背景色变为白色。

**(2)toggle()**

**语法**（适用于jQuery1.9以前版本）：

`jQuery对象. toggle(fn1,fn2,…,fnN);`

在jQuery1.9版本以前，可以用`toggle()`方法模拟鼠标连续的`click`事件：第一次单击元素时，触发第一个事件方法fn1；第二次单击元素时，触发第二个事件方法fn2；…；当最后一个事件方法fnN被触发完后，若再次单击，就又会触发第一个事件方法fn1，如此轮番循环调用。

示例：event.jsp

```
$("body").toggle(
		function () {
		    $(this).css("background-color", "red");
		},
		function () {
		    $(this).css("background-color", "yellow"); 
		},
		function () {
		    $(this).css("background-color", "blue"); 
		}
);
```

当在body中连续单击鼠标时，背景色会在红、黄、蓝之间切换。但从jQuery1.9版本开始，jQuery去掉了`toggle()`方法的此功能。toggle方法还可以用来切换元素的显示与隐藏，会在后续讲解。

# 9.4 显示效果 #

还可以使用jQuery来控制网页元素的显示、隐藏、改变透明度等显示效果。

## 9.4.1 控制元素的隐藏与显示 ##

jQuery中，控制元素隐藏与显示的方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>hide([speed],[callback])</td>
      <td>隐藏元素。</td>
   </tr>
   <tr>
      <td>show([speed],[callback])</td>
      <td>显示元素。</td>
   </tr>
   <tr>
      <td>toggle(([speed],[callback]))</td>
      <td>切换元素的隐藏或显示状态。</td>
   </tr>
</table>

其中`speed`和`callback`都是可选参数。


`speed`：元素显示或隐藏的时间（单位是毫秒；默认值是0，表示会立刻显示或隐藏）。如`hide(1000)`，表示在1秒中内隐藏某元素；此外还可以使用`show`、`normal`、`fast`来控制隐藏或显示的时间，如`hide(“fast”)`。需要注意，如果`speed`使用数字来表示，是不需要双引号的；但如果使用的是`show`等关键字，则需要加上双引号。

`callback`：隐藏或显示后，会执行的方法（回调方法）。

示例：event.jsp

```
$(document).ready(function() {
		$("body").click(function(){
					$("#textId").toggle(1000);		    		 
		});
});
```

当在body中单击鼠标时，id=”textId”的`div`会在1秒中内切换显示或隐藏状态。


## 9.4.2 控制元素的透明度 ##

`fadeIn()`和`fadeOut()`可以改变元素的透明度，从而实现淡入淡出效果。

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>fadeIn([speed],[callback])</td>
      <td>控制元素淡入，用法同show()</td>
   </tr>
   <tr>
      <td>fadeOut([speed],[callback])</td>
      <td>控制元素淡出，用法同hide()</td>
   </tr>
</table>

## 9.4.3控制元素的高度 ##

可以使用`slideUp()`和`slideDown()`方法来控制元素的高度。

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>slideDown()</td>
      <td>元素从上向下拉伸，直至全部显示，用法同show()</td>
   </tr>
   <tr>
      <td>slideUp()</td>
      <td>元素从下向上缩短，直至隐藏，用法同hide()</td>
   </tr>
</table>


从效果上看，`hide()`、`fadeOut()`、`slideUp()`都可以将显示的元素隐藏；`show()`、`slideDown()`、`fadeIn()`都可以将隐藏的元素显示。

# 9.5 操作DOM #

jQuery对JavaScript操作DOM的方法进行了封装，使用起来也更加简便。

## 9.5.1 样式操作 ##

在jQuery中，对元素样式的操作可以分为直接设置样式、追加样式、移除样式、切换样式等。

**(1) 直接设置样式**

jQuery使用`css()`方法为指定的元素直接设置样式值。

**语法：**

设置单个样式属性：	    `jQuery对象.css(name,value);`

同时设置多个样式属性：	`jQuery对象.css({name:value , name:value ,…, name:value });`

其中的参数简介如下：

<table>
   <tr>
      <td>参数</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>name</td>
      <td>CSS属性的名称，如color、font-size、background等。</td>
   </tr>
   <tr>
      <td>value</td>
      <td>CSS属性的值，如red、12px、#FFFFFF等</td>
   </tr>
</table>

示例：jQueryDemo.jsp

```
<html>
<head>
	<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
	<script type="text/javascript">
		$(document).ready(function() {
			$("img").hover(
                //鼠标悬浮在图片上面时：加上边框，并改变透明度
				function(){
					$(this).css({"border":"5px solid red",
"opacity":"0.5"});
					},
                //鼠标移出图片时：去掉边框，并消除透明度
				function(){
					$(this).css({"border":"0","opacity":"1"});
				}
);
		 });
		</script>
</head>
<body>
		<img src="imgs/pic.png" width="150" height="120" />
</body>	
</html>
```

运行结果：

当鼠标悬浮在图片上面时：

![](http://i.imgur.com/EK6EQcX.png)

*图9-18*

当鼠标离开图片时：

![](http://i.imgur.com/TssTtCS.png)

*图9-19*

**(2)追加或移出类样式**

**①追加类样式**

除了使用`CSS()`直接设置样式外，还可以使用`addClass()`为元素追加类样式。

**语法：**

追加一个类样式：	`jQuery对象.addClass(class)`

同时追加多个类样式（用空格隔开）：`jQuery对象.addClass(class1 class2 …classN)`

示例：jQueryDemo.jsp

```
<html>
<head>
		<style type="text/css" >
			.myStyle1 {font-size:14px; color:red; }
			.myStyle2 {background-color:yellow;}
		</style>

		<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		<script type="text/javascript">
		
		   	 $(document).ready(function() {
		   		 $("p").click(function() {
					   $(this).addClass("myStyle1 myStyle2");
				   });
		     }); 
		</script>
</head>
<body>
		<p>追加多个类样式示例...</p>
		…
</body>	
</html>
```

运行结果：
	
当单击`<p>`元素时，会给`<p>`元素追加`.myStyle1`和`.myStyle2`两个样式，如图

![](http://i.imgur.com/9ef7UnA.png)

*图9-20*

**②移除类样式**

`addClass()`可以为元素追加类样式；与之相反，可以使用`removeClass()`为元素移除类样式。

**语法：**

移除一个类样式：	jQuery对象`.removeClass(class)`

移除多个类样式：	jQuery对象`.removeClass(class1 class2 … classN)`

移除全部类样式：	jQuery对象`.removeClass()`

**②切换类样式**

`toggle()`方法可以切换元素的显示与隐藏状态；类似的，`toggleClass()`方法可以切换（增加或删除）元素的类样式。

**语法：**	

切换（增加或删除）一个类样式：	jQuery对象`.toggleClass(class)`

切换（增加或删除）多个类样式：	jQuery对象`.toggleClass(class1 class2 … classN)`

例如，当执行`“jQuery对象.toggleClass(class) ”`时：如果元素中含有名为`class`的类样式时，就删除该样式；如果元素中不存在名为`class`的类样式时，就为元素加入该样式，即`toggleClass()`就相当于`addClass()`和`removeClass()`的轮番切换使用。

示例：jQueryDemo.jsp

```
<html>
<head>
		<style type="text/css" >
			.myStyle1 {font-size:14px; color:red; }
			.myStyle2 {background-color:yellow;}
		</style>

		<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		<script type="text/javascript">
		   	 $(document).ready(function() { 
		   		 $("p").click(function() {
					   $(this).toggleClass("myStyle1 myStyle2");
				   });
		   	 });
		</script>
</head>
<body>
		<p>追加多个类样式示例...</p>
		…
</body>	
</html>
```

当连续点击`<p>`元素的内容时，`<p>`元素就会不断的追加或移除`.myStyle1`和`.myStyle2`两个类样式。

## 9.5.2内容操作 ##

jQuery还提供了对元素内容（HTML代码、文本内容、属性值）的操作方法。

**(1)对HTML代码的操作**

jQuery可以使用`html()`方法对元素的HTML代码进行操作，该方法类似于JavaScript中的innerHTML。

**语法：** `jQuery对象.html([content])`

如果存在参数`content`，表示给选中的元素赋上新的内容`content`；如果不存在参数content，表示获取被选中的元素内容。

示例：htmlDemo.jsp

```
<html>
<head>
        …
		<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		<script type="text/javascript">
		   $(document).ready(function() {
			   //给div赋上内容
			   $("div").html("<h1 style='background: yellow'>
hello</h1>");
			 //获取div内容
			   var $html = $("div").html();
			   alert($html);
		   });
		</script>
</head>
<body>
		<div></div>
</body>
</html>
```

先通过`html([content])`给`<div>`赋值，再通过`html()`获取`<div>`的值，运行结果如图

![](http://i.imgur.com/SIAjkmE.png)

*图9-21*

**(2)对文本内容的操作**

jQuery还可以使用`text()`方法获取或设置元素的文本内容。

语法：
`jQuery对象.text([content]);`

如果存在参数`content`，表示将选中的元素赋上新的文本内容`content`；如果不存在参数`content`，表示获取被选中元素的文本内容。

示例：textDemo.jsp

```
<html>
<head>
        …
		<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		<script type="text/javascript">
		   $(document).ready(function() {
			   //给div赋上文本内容
			   $("div").text("<h1 style='background:
 yellow'>hello</h1>");
			 //获取div文本内容
			   var $text = $("span").text();
			   alert($text);
		   });
		</script>
…
</head>
<body>
		<div></div>
		<span style="background: yellow">world</span>
</body>
</html>
```

运行结果：

![](http://i.imgur.com/nCph7Tq.png)

*图9-22*

可以发现`html(content)`会将渲染后的效果赋值给元素，而`text(content)`只是简单的将内容以文本形式赋值给元素；`html()`会将渲染内容和文本内容一起返回，而`text()`只会返回文本内容。

**(3)对属性值的操作**

jQuery还可以通过`val()`方法来获取或设置元素的`value`属性值。

语法：
`jQuery对象.val([v])`

如果存在参数`value`，表示将选中元素的`value`值设置为v；如果不存在参数v，表示获取被选中元素的`value`值。

示例：valDemo.jsp

```
<html>
<head>
		<script type="text/javascript" src="js/jquery-1.12.3.js">
</script>
		<script type="text/javascript">
		   $(document).ready(function() {
			   $("#searchId").focus(function(){
                   // 获取当前文本框的值       
					var txt_value =  $(this).val();
                   // 如果当前value是默认值“搜索”，则清空文本框内容
   					if(txt_value=="搜索"){  
			             $(this).val("");              					                } 
				  });
				$("#searchId").blur(function(){	
                      // 获取当前文本框的值
				  	    var txt_value =  $(this).val();  
                      // 如果当前value值是空，则设置为默认值“搜索”
 					    if(txt_value==""){
			                 $(this).val("搜索");					   
} 
				});
			   
		   });
		</script>
</head>
<body>
	 <input  type="text"  value="搜索" id="searchId" />
</body>
</html>
```

运行结果：

当鼠标光标停留搜索框中时，`value`值为空，如图

![](http://i.imgur.com/mjViqGl.png)

*图9-23*

当鼠标光标离开搜索框中时，`value`值为“搜索”，如图

![](http://i.imgur.com/OjvPw5d.png)

*图9-24*

## 9.5.3节点与属性操作 ##

jQuery对节点的操作主要有两种：对节点本身的操作，以及对节点中属性的操作。

**(1)节点操作**

节点操作主要包括查找节点、创建节点、插入节点、删除节点、替换节点和复制节点等六种操作。

**①查找节点**

查找节点是通过jQuery选择器实现，详见“9.2jQuery选择器”。

**②创建节点**

$()称之为工厂函数，可以用于获取节点、转化节点或创建节点：

$(选择器)：通过选择器获取节点

$(DOM节点)：把DOM节点转化成jQuery节点

$(HTML字符串)：使用HTML字符串创建jQuery节点

因此，创建jQuery节点主要是通过$(HTML字符串)实现。

示例：node.jsp

`var $node = $("<li>橘子</li>");`

以上就创建了一个新的jQuery节点。

**③插入节点**

`$node`节点创建完毕后，就可以插入到DOM文档之中。jQuery提供了多种方法实现节点的插入。

假设网页中存在如下节点：

node.jsp

```
<ul>
	<li>香蕉</li>
	<li>苹果</li>
</ul>
```

运行结果：

![](http://i.imgur.com/ZYaeS5i.png)

*图9-25*

以插入`$node`节点为例，插入节点的方法如下：

<table>
   <tr>
      <td rowspan="5">内部插入</td>
  </tr>
   <tr>
      <td>方法</td>
      <td>简介</td>
      <td>运行结果</td>
  </tr>
  <tr>
      <td>$(A).append(B)</td>
      <td>将B追加到A中 如：$("ul").append($node);</td>
     <td rowspan="2"><img src=![](http://i.imgur.com/jfF4fNv.png)></td>
   </tr>
   <tr>
      <td>$(A).appendTo(B)</td>
      <td>把A追加到B中 如：$ node.appendTo("ul");</td>
   </tr>
   <tr>
      <td>$(A). prepend (B)</td>
      <td>将B前置插入到A中 如：$("ul"). prepend ($node);</td>
     <td rowspan="2"><img src=![](http://i.imgur.com/x8sBA5w.png)></td>
   </tr>
   <tr>
      <td>$(A). prependTo (B)</td>
      <td>将A前置插入到B中 如：$ node.prependTo ("ul");</td>
   </tr>
   <tr>
      <td rowspan="4">外部插入</td>
   </tr>
   <tr>
      <td>$(A).after(B)</td>
      <td>将B插入到A之后 如：$("ul").after($node);</td>
     <td rowspan="2"><img src=![](http://i.imgur.com/mj9yiL7.png)></td>
   </tr>
   <tr>
      <td>$(A).insertAfter(B)</td>
      <td>将A插入到B之后 如：$ node.insertAfter("ul");</td>
   </tr>
   <tr>
      <td>$(A).before(B)</td>
      <td>将B插入至A之前 ：$("ul").before($node);</td>
      <td rowspan="2"><img src=![](http://i.imgur.com/5UbpxZF.png)></td>
   </tr>
   <tr>
      <td>$(A).insertBefore(B)</td>
      <td>将A插入到B之前 如：$ node.insertBefore("ul");</td>
   </tr>
</table>

**④替换节点**