---
layout: post  
title: 可调整大小的控件    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Resizable

# Resizable

## Resizable简介

  
EasyUI的Draggable控件可以帮助我们快速的开发可以调整大小的控件，程序员开发起来会更加方便快捷。

## 开发Resizable程序


```
<div id="rr" class="easyui-resizable" data-options="maxWidth:800,maxHeight:600" style="width:100px;height:100px;border:1px solid #ccc;"></div> 
```  

运行程序会发现，定义的div可以通过鼠标调整大小。


## Resizable常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th><th width="180px">属性值类型</th><th width="500px">描述</th><th width="200px">默认值</th>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>如果为true，则禁用大小调整。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>handles</td> <td>string</td> <td>声明调整方位,'n'=北,'e'=东,'s'=南等。</td><td>n, e, s, w, ne, se, sw, nw, all</td>
   </tr>
   <tr>
      <td>minWidth</td> <td>number</td> <td>当调整大小时候的最小宽度。</td> <td>10</td>
   </tr>
   <tr>
      <td>minHeight</td> <td>number</td> <td>当调整大小时候的最小高度。</td> <td>10</td>
   </tr>
   <tr>
      <td>maxWidth</td> <td>number</td> <td>当调整大小时候的最大宽度。</td> <td>10000</td>
   </tr>
   <tr>
      <td>maxHeight</td> <td>number</td> <td>当调整大小时候的最大高度。</td> <td>10000</td>
   </tr>
</table>


## Resizable常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> <th width="300px">方法参数</th> <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> <td>none</td> <td>返回属性对象。</td>
   </tr>
   <tr>
      <td>enable</td> <td>none</td> <td>启用调整大小功能。</td>
   </tr>
   <tr>
      <td>disable</td> <td>none</td> <td>禁用调整大小功能。</td>
   </tr>
</table>  


## Resizable常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onStartResize</td><td>e</td><td>在开始改变大小的时候触发。</td>
   </tr>
   <tr>
      <td>onResize</td><td>e</td><td>在调整大小期间触发。当返回false的时候，不会实际改变DOM元素大小。</td>
   </tr>
   <tr>
      <td>onStopResize</td><td>e</td><td>在停止改变大小的时候触发。</td>
   </tr>
</table> 


以上便是Resizable的基本用法。





