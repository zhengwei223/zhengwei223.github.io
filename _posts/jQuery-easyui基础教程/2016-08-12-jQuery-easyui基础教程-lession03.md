---
layout: post  
title: Draggable和Droppable    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Draggable的三种不同方式
- 掌握Droppable的开发
- 学会开发可拖拽页面


# Draggable

## Draggable简介

  
EasyUI的Draggable控件可以帮助我们快速的开发可以拖拽的页面，用户使用起来会更加的方便快捷。效果如图：

![image](http://i.imgur.com/6pW99ob.png)  

## 开发Draggable程序

##### 方式一：

```
<img id="image1" alt="这是一幅图片" class="easyui-draggable" src="../dist/image/shirt1.gif"/>
```  

只需要简单的给HTML标签添加一个指定的class样式即可创建一个可拖拽的控件。效果如下图：

![image](http://i.imgur.com/z9rBhuz.png)

**这是一种最简单的实现方式，拖动图片时原位置则不再有图片 。**   

Tip：参照"初识jQuery-EasyUI"文章中的几种不同表示方法，大家会发现还有以下实现方式：

HTML代码：  

```
<img id="image1" alt="这是一幅图片" src="../dist/image/shirt1.gif"/>
```  

JS代码：  

```
$('#image1').draggable();  
```  

**参考代码:  ```[03/draggabale01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/draggabale01.html)```** 


##### 方式二：拖动图片时原位置仍然保持图片。

HTML代码保持不变，只需要在JS代码中加入一句话就可以了：

```
$('#image2').draggable({
	proxy:'clone'
});  
```

**参考代码:```[03/draggabale01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/draggabale01.html)```**

效果如下：

![image](http://i.imgur.com/E9E82EE.png)

##### 方式三：拖动图片时显示自定义内容。

HTML代码保持不变，只需要在JS代码中加入自定义的内容就可以了：

```
$('#image3').draggable({
	proxy:function(source){
		var p = $('<div class="cloneDiv"></div>');
		p.html($(source).attr("alt")).appendTo('body');
		return p;
	}
});  
```

**参考代码:```[03/draggabale01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/draggabale01.html)```**

效果如下：

![image](http://i.imgur.com/o7eBN5r.png)

## Drappable常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th><th width="180px">属性值类型</th><th width="650px">描述</th><th>默认值</th>
   </tr>
   <tr>
      <td>handle</td>
	  <td>selector</td>
	  <td>开始拖动的句柄。</td>
	  <td>null</td>
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
      <td>delay</td> <td>number</td> <td>定义必须拖拽并等待指定ms后拖拽才开始</td> <td>0</td>
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

**参考代码:```[03/draggabale02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/draggabale02.html)```**


```  
<script>
	$(function() {
		$("#draggable").draggable({
			axis : "v",
		});
		$("#draggable2").draggable({
			axis : "h"
		});

		$("#draggable3").draggable({
			delay : 1000
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
<h3 style="clear:both;">沿着轴约束运动：</h3>
<div id="draggable3" class="draggable ui-widget-content">
	<p>不管 distance 是多少，您都必须拖拽并等待 1000ms 后拖拽才开始</p>
</div>
<div class="easyui-draggable" data-options="handle:'#title'" style="clear:both;width:200px;height:150px;background:#fafafa;border:1px solid #ccc;margin-top:10px">
	<div id="title" style="padding:5px;background:#ccc;color:#fff">Title</div>
</div>
```

**参考代码:```[03/draggabale03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/draggabale03.html)```**

效果如下：

![image](http://i.imgur.com/ZjfZekc.png)

## Draggable常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> <th width="300px">方法参数</th> <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> <td>none</td> <td>返回属性对象。</td>
   </tr>
   <tr>
      <td>proxy</td> <td>none</td> <td>如果代理属性被设置则返回该拖动代理元素。</td>
   </tr>
   <tr>
      <td>enable</td> <td>none</td> <td>允许拖动。</td>
   </tr>
   <tr>
      <td>disable</td> <td>none</td> <td>禁止拖动。</td>
   </tr>
</table>  


## Draggable常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onBeforeDrag</td><td>e</td><td>在拖动之前触发，返回false将取消拖动。</td>
   </tr>
   <tr>
      <td>onStartDrag</td><td>e</td><td>在目标对象开始被拖动时触发。</td>
   </tr>
   <tr>
      <td>onDrag</td><td>e</td><td>在拖动过程中触发，当不能再拖动时返回false。</td>
   </tr>
	<tr>
      <td>onStopDrag</td><td>e</td><td>在拖动停止时触发。</td>
   </tr>
</table> 


# Droppable

## Droppable简介

EasyUI的Droppable控件用于定义可以接受哪些拖动的控件。


## 开发Dropable程序

```
<script>
	$(function() {
	    $( "#dd" ).droppable({
		       onDrop: function(event, ui) {
		        $(this).css("color","red");
		      }
	    });
	});
</script>

<div id="d1" class="easyui-draggable"  style="width:100px;height:100px;background:#ccc;">    
	d1
</div>
<div id="d2" class="easyui-draggable"  style="width:100px;height:100px;background:green;">    
	d2
</div>
<div id="dd" data-options="accept:'#d1,#d3'"  style="width:300px;height:300px;border:1px solid blue;">dd</div> 
``` 

**参考代码:```[03/droppable01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/droppable01.html)```**

效果如下：

![image](http://i.imgur.com/nzwysgt.png)

![image](http://i.imgur.com/wyg0V6l.png)
 
Tip：只有当d1,d3拖动到dd中时才会触发onDrop事件，即dd中文字的颜色才会变成红色。


## Droppable常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th><th width="180px">属性值类型</th><th width="650px">描述</th><th>默认值</th>
   </tr>
   <tr>
      <td>accept</td>
	  <td>selector</td>
	  <td>确定哪些可拖拽元素将被接受。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>disabled</td> <td>boolean</td> <td>如果为true，则禁止放置。</td><td>false</td>
   </tr>
</table>


## Droppable常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> <th width="300px">方法参数</th> <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onDragEnter</td> <td>e,source</td> <td>在被拖拽元素到放置区内的时候触发，source参数表示被拖拽的DOM元素。</td>
   </tr>
   <tr>
      <td>onDragOver</td> <td>e,source</td> <td>在被拖拽元素经过放置区的时候触发，source参数表示被拖拽的DOM元素。</td>
   </tr>
   <tr>
      <td>onDragLeave</td> <td>e,source</td> <td>在被拖拽元素离开放置区的时候触发，source参数表示被拖拽的DOM元素。</td>
   </tr>
   <tr>
      <td>onDrop</td> <td>e,source</td> <td>在被拖拽元素放入到放置区的时候触发，source参数表示被拖拽的DOM元素。</td>
   </tr>
</table>  


## Droppable常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td><td>none</td><td>返回属性对象。</td>
   </tr>
   <tr>
      <td>enable</td><td>none</td><td>启用放置功能。</td>
   </tr>
   <tr>
      <td>disable</td><td>none</td><td>禁用放置功能。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

案例一：  

代码如下：

```
$( "#dd" ).droppable({
       onDrop: function(event, ui) {
        $(this).css("color","red");
      },
      onDragEnter:function(){
     	 $(this).css("background-color","yellow");
      },
      onDragLeave:function(){
     	 $(this).css("background-color","pink");
      } 
});
```

**参考代码:```[03/droppable02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/droppable02.html)```**

效果如下：

![image](http://i.imgur.com/RnaKXnM.png)

![image](http://i.imgur.com/r3RGJAo.png)

案例二：  

代码如下：

```
<script>
	$(function(){
		var indicator = $('<div class="indicator">>></div>').appendTo('body');
		$('.drag-item').draggable({
			revert:true,
			deltaX:0,
			deltaY:0
		}).droppable({
			onDragOver:function(e,source){
				indicator.css({
					display:'block',
					left:$(this).offset().left-10,
					top:$(this).offset().top+$(this).outerHeight()-5
				});
			},
			onDragLeave:function(e,source){
				indicator.hide();
			},
			onDrop:function(e,source){
				$(source).insertAfter(this);
				indicator.hide();
			}
		});
	});
</script>

<h2>Change Items Order</h2>
<p>Drag the list items to change their order.</p>
<div style="margin:20px 0;"></div>
<ul style="margin:0;padding:0;margin-left:10px;">
	<li class="drag-item">Drag 1</li>
	<li class="drag-item">Drag 2</li>
	<li class="drag-item">Drag 3</li>
	<li class="drag-item">Drag 4</li>
	<li class="drag-item">Drag 5</li>
	<li class="drag-item">Drag 6</li>
</ul>
```

**参考代码:```[03/droppable03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/03/droppable03.html)```**

效果如下：

![image](http://i.imgur.com/c2i4hWD.png)

以上便是Draggable和Droppable的基本用法。





