---
layout: post  
title: Progressbar进度条    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Progressbar的使用方法


# Progressbar

## Progressbar简介

  
进度条用来反馈一个长时间运行的操作进展。可以更新的进展条，让用户知道当前正在执行操作。效果如图：

![image](http://i.imgur.com/8y3nRho.png) 

## 开发Progressbar程序

```
<div id="p" class="easyui-progressbar" data-options="value:60" style="width:400px;"></div> 
```  
**参考代码:[07/progressbar01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/07/progressbar01.html)**

只需要简单的给```<div>```标签添加一个指定的class样式即可创建一个进度条。效果如下图：

![image](http://i.imgur.com/Vd8fctY.png)

## Progressbar常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>width</td>
	  <td>string</td>
	  <td>设置进度条宽度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>height</td> 
	  <td>number</td> 
	  <td>设置进度条高度。</td>
      <td>22</td>
   </tr>
   <tr>
      <td>value</td> 
      <td>number</td> 
      <td>百分比值。</td> 
      <td>0</td>
   </tr>
   <tr>
      <td>text</td> 
      <td>string</td> 
      <td>显示在组件上的文本模板。</td> 
      <td>{value}%</td>
   </tr>
</table>


## Progressbar常用方法  

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
      <td>resize</td> 
      <td>width</td> 
      <td>组件大小。代码示例：<br/>
		$('#p').progressbar('resize');           // 更改进度条到原始宽度<br/>
		$('#p').progressbar('resize', 350);   // 更改进度条到新的宽度
	  </td>
   </tr>
   <tr>
      <td>getValue</td> 
      <td>none</td> 
      <td>返回当前进度值。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置一个新的进度值。</td>
   </tr>
</table>  


## Progressbar常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onChange</td>
	  <td>newValue,oldValue</td>
	  <td>在值更改的时候触发。代码示例：<br/>
		$('#p').progressbar({<br/>
			onChange: function(value){<br/>
				alert(value)<br/>
			}<br/>
		});
	  </td>
   </tr>
   <tr>
      <td>onStartDrag</td>
	  <td>e</td>
	  <td>在目标对象开始被拖动时触发。</td>
   </tr>
   <tr>
      <td>onDrag</td>
	  <td>e</td>
	  <td>在拖动过程中触发，当不能再拖动时返回false。</td>
   </tr>
	<tr>
      <td>onStopDrag</td>
	  <td>e</td>
	  <td>在拖动停止时触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

代码如下：

```
$(function(){
	intervalId = setInterval('changeValue()',1000);
});
function changeValue(){
		var value = $('#p').progressbar('getValue'); 
		if (value < 100){ 
			value += Math.floor(Math.random() * 10); 
			$('#p').progressbar('setValue', value); 
		}else{
			clearInterval(intervalId);
			alert('加载完毕！');
		} 
}
```

```
<div id="p" class="easyui-progressbar" data-options="value:0,text:'正在加载数据...'" style="width:400px;"></div> 
```

**参考代码:[07/progressbar02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/07/progressbar02.html)**

以上便是Progressbar的基本用法。





