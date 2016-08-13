---
layout: post  
title: Draggable    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Draggable的三种不同方式
- 开发可拖拽页面


# Draggable

### Draggable简介

  
EasyUI的Draggable控件可以帮助我们快速的开发可以拖拽的页面，用户使用起来会更加的方便快捷。效果如图：

![image](http://i.imgur.com/6pW99ob.png)  

### 开发Draggable程序

##### 方式一：


```
<img id="image1" alt="这是一幅图片" class="easyui-draggable" src="/ui/images/shirt1.gif"/
```  

只需要简单的给HTML标签添加一个指定的class样式即可创建一个可拖拽的控件。效果如下图：

![image](http://i.imgur.com/V4643Fe.png)

** 这是一种最简单的实现方式，拖动图片时原位置则不再有图片。 ** 

Tip：参照"初识jQuery-EasyUI"文章中的几种不同表示方法，大家会发现还有以下实现方式：

HTML代码：  

```
<img id="image1" alt="这是一幅图片" src="/ui/images/shirt1.gif"/>
```  

JS代码：  

```
$('#image1').draggable();  
```  


##### 方式二：拖动图片时原位置仍然保持图片。


HTML代码保持不变，只需要在JS代码中加入一句话就可以了：

```
$('#image2').draggable({
	proxy:'clone'
});  
```

效果如下：

![image](http://i.imgur.com/kzk0xVR.png)


##### 方式三：拖动图片时显示自定义内容。


HTML代码保持不变，只需要在JS代码中加入一句话就可以了：

```
$('#image3').draggable({
	proxy:function(source){
		var p = $('<div class="cloneDiv"></div>');
		p.html($(source).attr("alt")).appendTo('body');
		return p;
	}
});  
```

效果如下：

![image](http://i.imgur.com/XaWH1y9.png)

### Drappable常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th><th width="180px">属性值类型</th><th width="650px">描述</th><th>默认值</th>
   </tr>
   <tr>
      <td>proxy</td>
	  <td>string,function</td>
	  <td>在拖动的时候使用的代理元素，当使用'clone'的时候，将使用该元素的一个复制元素来作为替代元素。如果指定了一个函数, 它将返回一个jquery对象。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>revert</td> <td>boolean</td> <td>如果设置为true，在拖动停止时元素将返回起始位置。</td><td>false</td>
   </tr>
   <tr>
      <td>cursor</td> <td>string</td> <td>拖动时的CSS指针样式。</td> <td>move</td>
   </tr>
   <tr>
      <td>disabled</td> <td>boolean</td> <td>如果设置为true，则停止拖动。</td> <td>false</td>
   </tr>
   <tr>
      <td>axis</td> <td>string</td> <td>定义元素移动的轴向，可用值有：'v'或'h'，当没有设置或设置为null时可同时在水平和垂直方向上拖动。</td> <td>null </td>
   </tr>
   <tr>
      <td>containment</td> <td>string</td> <td>定义元素可以在哪个空间内移动，可以是id值，可以是'parent',代表父元素。</td> <td>null </td>
   </tr>
	<tr>
      <td>distance</td> <td>number</td> <td>定义我拖拽了多少像素后，拖拽才开始</td> <td>0</td>
   </tr>
   <tr>
      <td>delay</td> <td>number</td> <td>定义必须拖拽并等待指定ms后拖拽才开始</td> <td>0</td>
   </tr>
   <tr>
      <td>grid</td> <td>array</td> <td>对齐到80 x 80的网格</td> <td>null </td>
   </tr>
</table>

参考jQuery EasyUI的API。

代码如下：

```
$('#image3').draggable({
	revert : true,
	cursor: 'help',
	disabled : false,
	proxy:function(source){
		var p = $('<div class="cloneDiv"></div>');
		p.html($(source).attr("alt")).appendTo('body');
		return p;
	}
});
```

```  
<script>
	$(function() {
		$("#draggable").draggable({
			axis : "y",
			cursorAt : {
				top : -5,
				left : -5
			}
		});
		$("#draggable2").draggable({
			axis : "x"
		});

		$("#draggable3").draggable({
			containment : "#containment-wrapper",
			scroll : false
		});
		$("#draggable5").draggable({
			containment : "parent"
		});
		$("#draggable6").draggable({
			cursor : "crosshair",
			cursorAt : {
				top : -5,
				left : -5
			}
		});
		$("#draggable7").draggable({
			cursorAt : {
				bottom : 0
			}
		});
		$("#draggable8").draggable({
			distance : 20
		});
		$("#draggable9").draggable({
			delay : 1000
		});
		$("#draggable10").draggable({
			grid: [ 80, 80 ]
		});
	});
</script>
<h3>沿着轴约束运动：</h3>
<div id="draggable" class="draggable ui-widget-content">
	<p>只能垂直拖拽</p>
</div>
<div id="draggable2" class="draggable ui-widget-content">
	<p>只能水平拖拽</p>
</div>
<h3>或者在另一个 DOM 元素中约束运动：</h3>
<div id="containment-wrapper">
	<div id="draggable3" class="draggable ui-widget-content">
		<p>我被约束在盒子里</p>
	</div>
	<div class="draggable ui-widget-content">
		<p id="draggable5" class="ui-widget-header">我被约束在父元素内</p>
	</div>
</div>
<div id="draggable6" class="ui-widget-content">
	<p>我的光标是在 left -5 和 top -5</p>
</div>
<div id="draggable7" class="ui-widget-content">
	<p>我的光标位置只控制了 'bottom' 值</p>
</div>
<div id="draggable8" class="ui-widget-content">
	<p>只有把我拖拽了 20 像素后，拖拽才开始</p>
</div>
<div id="draggable9" class="ui-widget-content">
	<p>不管 distance 是多少，您都必须拖拽并等待 1000ms 后拖拽才开始</p>
</div>
<div id="draggable10" class="draggable ui-widget-content">
	<p>我对齐到一个 80 x 80 网格</p>
</div>
```
效果如下：

![image](http://i.imgur.com/RNVtU51.png)




