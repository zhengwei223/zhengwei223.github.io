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

![image](http://i.imgur.com/Oyt0JGJ.png)


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

![img](http://i.imgur.com/txguDEY.png)

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
      <td>deltaX</td> <td>number</td> <td>被拖动的元素对应于当前光标位置x。</td> <td>null</td>
   </tr>
   <tr>
      <td>deltaY</td> <td>number</td> <td>被拖动的元素对应于当前光标位置y。</td> <td>null </td>
   </tr>
   <tr>
      <td>handle</td> <td>selector</td> <td>开始拖动的句柄。</td> <td>null</td>
   </tr>
   <tr>
      <td>disabled</td> <td>boolean</td> <td>如果设置为true，则停止拖动。</td> <td>false</td>
   </tr>
   <tr>
      <td>edge</td> <td>number</td> <td>可以在其中拖动的容器的宽度。</td> <td>0</td>
   </tr>
   <tr>
      <td>axis</td> <td>string</td> <td>定义元素移动的轴向，可用值有：'v'或'h'，当没有设置或设置为null时可同时在水平和垂直方向上拖动。</td> <td>null </td>
   </tr>
</table>


参考jQuery EasyUI的API。

### Draggable常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> <th width="300px">方法参数</th> <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> <td>none</td> <td>返回属性对象</td>
   </tr>
   <tr>
      <td>proxy</td> <td>none</td> <td>如果代理属性被设置则返回该拖动代理元素。</td>
   </tr>
   <tr>
      <td>enable</td> <td>none</td> <td>允许拖动</td>
   </tr>
   <tr>
      <td>disable</td> <td>none</td> <td>禁止拖动</td>
   </tr>
</table>  

### Dialog常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onBeforeDrag</td><td>e</td><td>在拖动之前触发，返回false将取消拖动。</td>
   </tr>
   <tr>
      <td>onStartDrag</td><td>e</td><td>在目标对象开始被拖动时触发。 </td>
   </tr>
   <tr>
      <td>onDrag</td><td>e</td><td>在拖动过程中触发，当不能再拖动时返回false。</td>
   </tr>
   <tr>
      <td>onStopDrag</td><td>e</td><td>在拖动停止时触发。</td>
   </tr>
</table> 


# Droppable



