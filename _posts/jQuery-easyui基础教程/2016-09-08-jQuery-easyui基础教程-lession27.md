---
layout: post  
title: 数字和时间微调    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 了解NumberSpinner和TimeSpinner的基本属性、方法和事件


# Spinner

## Spinner简介

  
微调控件结合了一个可编辑文本框和2个小按钮让用户选择一个值的范围。和下拉列表框类似，微调控件允许用户输入值，但是没有下拉列表。微调控件是创建其他高级微调控件的基础控件，比如：numberspinner, timespinner等。**Spinner并不是学习的重点，只是为后续的NumberSpinner、TimeSpinner及DateTimeSpinner打基础。大家简单了解即可。**效果如下图：

![image](http://i.imgur.com/unQX9RK.png)


## 开发Spinner程序

```
<input class="easyui-spinner" value="1"> 
```

**参考代码:[27/spinner01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/27/spinner01.html)**
 
效果如上图。 


## Spinner常用属性  

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
	  <td>组件的宽度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>height</td>
	  <td>number</td>
	  <td>组件的高度。</td>
	  <td>22</td>
   </tr>
   <tr>
      <td>value</td>
	  <td>string</td>
	  <td>默认值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>min</td>
	  <td>number</td>
	  <td>允许的最小值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>max</td>
	  <td>number</td>
	  <td>允许的最大值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>increment</td>
	  <td>number</td>
	  <td>在点击微调按钮的时候的增量值。</td>
	  <td>1</td>
   </tr>
   <tr>
      <td>editable</td>
	  <td>boolean</td>
	  <td>定义用户是否可以直接输入值到字段。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>定义是否禁用字段。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>readonly</td>
	  <td>boolean</td>
	  <td>定义控件是否为只读。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>spinAlign</td>
	  <td>string</td>
	  <td>定义控件的对齐方式。可用值：'left','right','horizontal','vertical'</td>
	  <td>right</td>
   </tr>
   <tr>
      <td>spin</td>
	  <td>function(down)</td>
	  <td>在用户点击微调按钮的时候调用的函数。'down'参数对应用户点击的向下按钮。</td>
	  <td></td>
   </tr>
</table>  


## Spinner常用方法  

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
      <td>销毁微调组件。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>width</td> 
      <td>返回组件宽度。通过'width'参数重写原始宽度。 </td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用组件。</td>
   </tr>
   <tr>
      <td>disable</td> 
      <td>none</td> 
      <td>禁用组件。</td>
   </tr>
   <tr>
      <td>getValue</td> 
      <td>none</td> 
      <td>获取组件值。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置组件值。</td>
   </tr>
   <tr>
      <td>readonly</td> 
      <td>mode</td> 
      <td>启用/禁用只读模式。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清空组件值。</td>
   </tr>
   <tr>
      <td>reset</td> 
      <td>none</td> 
      <td>重置组件值。</td>
   </tr>
</table>  


## Spinner常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onSpinUp</td><td>none</td><td>在用户点击向上微调按钮的时候触发。</td>
   </tr>
   <tr>
      <td>onSpinDown</td><td>none</td><td>在用户点击向下微调按钮的时候触发。</td>
   </tr>
</table> 


# NumberSpinner

## NumberSpinner简介

  
数字微调控件的创建是基于微调控件和数值输入框控件的，允许用户使用上/下微调按钮调整到用户的期望值。效果如下图：

![image](http://i.imgur.com/JCPKJtq.png)


## 开发NumberSpinner程序

```
<input id="ss" class="easyui-numberspinner" style="width:80px;" required="required" data-options="min:10,max:100,editable:false">   
```

**参考代码:[27/numberspinner01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/27/numberspinner01.html)**
 
该数值输入框不允许输入，只能通过上/下微调按钮调整数值。效果如下图：

![image](http://i.imgur.com/kxLsBaI.png)


## NumberSpinner常用属性  

本组件的属性完整继承自spinner(微调)和numberbox(数值输入框)。


## NumberSpinner常用方法  

本组件的方法完整扩展自spinner(微调)。

## NumberSpinner常用事件

本组件的事件完整继承自spinner(微调)。


案例一：

```
价格： <input id="input1"></input>  

$("#input1").numberspinner({
	min:0,
	max:100000000,
	precision:1,
	value:0,
	groupSeparator:',',
	prefix:'$',
	prompt: '请输入数值',
	//带有清除图标
	icons:[{
		iconCls:'icon-clear',
		handler: function(e){
			$(e.data.target).numberspinner('clear');
		}
	}]
});

<a href="javascript:void(0);" onclick="$('#input1').numberspinner('disable');" class="easyui-linkbutton">禁用字段</a>
<a href="javascript:void(0);" onclick="$('#input1').numberspinner('enable');" class="easyui-linkbutton">启用字段</a>
<a href="javascript:void(0);" onclick="set();" class="easyui-linkbutton">设置值 </a>
<a href="javascript:void(0);" onclick="alert($('#input1').numberspinner('getValue'));" class="easyui-linkbutton">获取值 </a>
<a href="javascript:void(0);" onclick="$('#input1').numberspinner('clear');" class="easyui-linkbutton">清除值 </a>
<a href="javascript:void(0);" onclick="$('#input1').numberspinner('reset');" class="easyui-linkbutton">重置值 </a>
<script type="text/javascript">
	function set(){
		$.messager.prompt('提示信息', '请输入要设置的数值：', function(value){
			if (value){
				$('#input1').numberspinner('setValue',value);
			}
		});
	}
</script>
```
**参考代码:[27/numberspinner01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/27/numberspinner01.html)**


# TimeSpinner  


## TimeSpinner简介  

时间微调组件的创建基于微调组件。它和数字微调类似，但是显示的时间值。时间微调组件允许用户点击组件右侧的小按钮来增加或减少时间。效果如下图：

![image](http://i.imgur.com/n46TMyQ.png)


## 开发TimeSpinner程序  

```
<input class="easyui-timespinner" style="width:80px;" required="required" />  
```

**参考代码:[27/timespinner01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/27/timespinner01.html)**
  
效果如上图。


## TimeSpinner常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>separator</td>
	  <td>string</td>
	  <td>定义在小时、分钟和秒之间的分隔符。</td>
	  <td>:</td>
   </tr>
   <tr>
      <td>showSeconds</td>
	  <td>boolean</td>
	  <td>定义是否显示秒钟信息。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>highlight</td>
	  <td>number</td>
	  <td>初始选中的字段 0=小时,1=分钟...</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>formatter</td>
	  <td>function(date)</td>
	  <td>格式化日期函数，该函数接受date对象型参数并返回一个字符串值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>parser</td>
	  <td>function(s)</td>
	  <td>解析日期/时间字符串的函数，该函数接受date字符串类型的参数并返回一个date对象值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>selections</td>
	  <td>array</td>
	  <td>高亮选择部分的值，突出显示每一部分。例如：将字符从0点到2则高亮小时部分。</td>
	  <td>[[0,2],[3,5],[6,8]] </td>
   </tr>
</table>


## TimeSpinner常用方法  

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
      <td>setValue</td> 
      <td>value</td> 
      <td>设置时间微调组件的值。 </td>
   </tr>
   <tr>
      <td>getHours</td> 
      <td>none</td> 
      <td>获取当前的小时数。</td>
   </tr>
   <tr>
      <td>getMinutes</td> 
      <td>none</td> 
      <td>获取当前的分钟数。</td>
   </tr>
   <tr>
      <td>getSeconds</td> 
      <td>none</td> 
      <td>获取当前的秒数。</td>
   </tr>
</table>  

## TimeSpinner常用事件  

该组件事件完全继承自spinner(微调)。


案例一：

```
$("#input1").timespinner({
	editable:false,
	showSeconds: true,
	prompt: 'Input time here!',
	icons:[{
		iconCls:'icon-clear',
		handler: function(e){
			$(e.data.target).timespinner('clear');
		}
	}]
});
```

**参考代码:[27/timespinner01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/27/timespinner01.html)**


# DateTimeSpinner  


## DateTimeSpinner简介  

时间微调组件的创建基于微调组件。它和数字微调类似，但是显示的时间值。时间微调组件允许用户点击组件右侧的小按钮来增加或减少时间。效果如下图：

![image](http://i.imgur.com/yYdSTvY.png)


## 开发DateTimeSpinner程序  

```
<input class="easyui-datetimespinner" style="width:300px"> 
```

**参考代码:[27/datetimespinner01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/27/datetimespinner01.html)**
  
效果如上图。


## DateTimeSpinner常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>selections</td>
	  <td>array</td>
	  <td>选择高亮部分的值</td>
	  <td>[[0,2],[3,5],[6,10],[11,13],[14,16],[17,19]]</td>
   </tr>
</table>


## DateTimeSpinner常用方法  

方法扩展自 timespinner。

## DateTimeSpinner常用事件  

事件扩展自 timespinner。

案例一：

```
$("#input1").datetimespinner({
	editable:false,
	showSeconds: true,
	prompt: 'Input time here!',
	icons:[{
		iconCls:'icon-clear',
		handler: function(e){
			$(e.data.target).datetimespinner('clear');
		}
	}]
});
```

**参考代码:[27/datetimespinner01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/27/datetimespinner01.html)**


以上便是数字微调和时间微调的基本操作。

