---
layout: post  
title: 滑动块    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 灵活掌握Slider的操作


# Slider

## Slider简介

  
滑动条允许用户从一个有限的范围内选择一个数值。当滑块控件沿着轨道移动的时候，将会显示一个提示来表示当前值。用户可以通过设置其属性自定义滑块。效果如下图：

![](/public/img/easyui-zq/28.1.png)

*图28-01*

## 开发Slider程序

```
<input class="easyui-slider" value="12"  style="width:300px"/>  
```

**参考代码:[28/slider01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/28/slider01.html)**
 
效果如下图：

![](/public/img/easyui-zq/28.2.png)

*图28-02*

## Slider常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>width</td>
	  <td>number</td>
	  <td>滑动条宽度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>height</td>
	  <td>number</td>
	  <td>滑动条高度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>mode</td>
	  <td>string</td>
	  <td>声明滚动条类型。可用值有：'h'(水平)、'v'(垂直)。</td>
	  <td>h</td>
   </tr>
   <tr>
      <td>reversed</td>
	  <td>boolean</td>
	  <td>设置为true时，最小值和最大值将对调他们的位置。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>showTip</td>
	  <td>boolean</td>
	  <td>定义是否显示值信息提示。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>定义是否禁用滑动条。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>range</td>
	  <td>boolean</td>
	  <td>定义是否显示滑块范围。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>value</td>
	  <td>number</td>
	  <td>默认值。</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>min</td>
	  <td>number</td>
	  <td>允许的最小值。</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>max</td>
	  <td>number</td>
	  <td>允许的最大值。</td>
	  <td>100</td>
   </tr>
   <tr>
      <td>step</td>
	  <td>number</td>
	  <td>值增加或减少。</td>
	  <td>1</td>
   </tr>
   <tr>
      <td>rule</td>
	  <td>array</td>
	  <td>标签显示的刻度。如 [0,'|',25,'|',50,'|',75,'|',100] </td>
	  <td>[]</td>
   </tr>
   <tr>
      <td>tipFormatter</td>
	  <td>function</td>
	  <td>该函数用于格式化滑动条。返回的字符串值将显示提示。</td>
	  <td></td>
   </tr>
   <tr>
      <td>converter</td>
	  <td>function</td>
	  <td>该转换器函数允许用户决定如何将一个值转换为进度条位置或进度条位置值。</td>
	  <td></td>
   </tr>
</table>  

案例一：  

代码如下：  

```
$("#input1").slider({
	width:300,
	showTip:true,
	value:60,
	min:0,
	max:100,
	step:5,
	rule: [0,'|',25,'|',50,'|',75,'|',100]
});
```

**参考代码:[28/slider01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/28/slider01.html)**

效果如下图：

![](/public/img/easyui-zq/28.3.png)

*图28-03*

## Slider常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回属性对象。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁滑动条对象。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>param</td> 
      <td>设置滑动条大小。</td>
   </tr>
   <tr>
      <td>getValue</td> 
      <td>none</td> 
      <td>获取滑动条的值。</td>
   </tr>
   <tr>
      <td>getValues</td> 
      <td>none</td> 
      <td>获取滑动条的值数组。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除滑动条的值。</td>
   </tr>
   <tr>
      <td>reset</td> 
      <td>none</td> 
      <td>重置滑动条的值。</td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用滑动条控件。</td>
   </tr>
   <tr>
      <td>disable</td> 
      <td>none</td> 
      <td>禁用滑动条控件。</td>
   </tr>
</table>  

## Slider常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onChange</td><td>newValue, oldValue</td><td>在字段值更改的时候触发。</td>
   </tr>
   <tr>
      <td>onSlideStart</td><td>value</td><td>在开始拖拽滑动条的时候触发。</td>
   </tr>
   <tr>
      <td>onSlideEnd</td><td>value</td><td>在结束拖拽滑动条的时候触发。</td>
   </tr>
   <tr>
      <td>onComplete</td><td>value</td><td>在滑块值被用户改变的时候触发，无论是拖动还是点击滑块。</td>
   </tr>
</table> 


以上便是滑动块的基本操作。

