---
layout: post  
title: 简单下拉框    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 了解Combo的基本属性、方法和事件
- 灵活掌握Combobox的基本操作


# Combo

## Combo简介

  
自定义下拉框显示一个可编辑的文本框和下拉面板在html页面。这是构建其他复杂的组合部件（如：combobox,combotree,combogrid等）之前需要构建的最基本的组件。Combo扩展自ValidateBox。**Combo并不是学习的重点，只是为后续的ComboBox、ComboTree及ComboGrid打基础。大家简单了解即可。**效果如下图：

![image](http://i.imgur.com/tDpioWp.png)


## 开发Combo程序

```
<input id="cc" style="width:150px"></input>
<div id="sp">
	<div style="color:#99BBE8;background:#fafafa;padding:5px;">Select a language</div>
	<div style="padding:10px">
		<input type="radio" name="lang" value="01"><span>Java</span><br/>
		<input type="radio" name="lang" value="02"><span>C#</span><br/>
		<input type="radio" name="lang" value="03"><span>Ruby</span><br/>
		<input type="radio" name="lang" value="04"><span>Basic</span><br/>
		<input type="radio" name="lang" value="05"><span>Fortran</span>
	</div>
</div>
<script type="text/javascript">
	$(function(){
		/**
		  * 当点击刷新按钮刷新页面时combo控件中的值被清除，但是单选按钮依然是选中状态，所以需要清除checked属性
		  */
		$('#sp input').removeProp('checked');

		$('#cc').combo({
			required:true,
			editable:false
		});
		$('#sp').appendTo($('#cc').combo('panel'));
		$('#sp input').click(function(){
			var v = $(this).val();
			var s = $(this).next('span').text();
			$('#cc').combo('setValue', v).combo('setText', s).combo('hidePanel');
		});
	});
</script>
```
 
效果如上图。

**自定义下拉框使用Javascript创建一个\<select\>或\<input\>元素。注意：使用自定义下拉框不能通过标签的方式进行创建。** 


## Combo常用属性  

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
      <td>panelWidth</td>
	  <td>number</td>
	  <td>下拉面板宽度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelHeight</td>
	  <td>number</td>
	  <td>下拉面板高度。</td>
	  <td>200</td>
   </tr>
   <tr>
      <td>panelMinWidth</td>
	  <td>number</td>
	  <td>下拉面板最小宽度。</td>
	  <td>null</td>
   </tr>
</table>  

以上便是下拉框的基本操作。





