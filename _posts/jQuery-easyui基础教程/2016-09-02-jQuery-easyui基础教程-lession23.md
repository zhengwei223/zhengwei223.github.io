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
   <tr>
      <td>panelMaxWidth</td>
	  <td>number</td>
	  <td>下拉面板最大宽度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelMinHeight</td>
	  <td>number</td>
	  <td>下拉面板最小高度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelMaxHeight</td>
	  <td>number</td>
	  <td>下拉面板最大高度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelAlign</td>
	  <td>string</td>
	  <td>面板对齐方式。可用值有：'left','right'。</td>
	  <td>200</td>
   <tr>
      <td>multiple</td>
	  <td>boolean</td>
	  <td>定义是否支持多选。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>selectOnNavigation</td>
	  <td>boolean</td>
	  <td>定义是否允许使用键盘导航来选择项目。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>separator</td>
	  <td>string</td>
	  <td>在多选的时候使用何种分隔符进行分割。</td>
	  <td>,</td>
   </tr>
   <tr>
      <td>editable</td>
	  <td>boolean</td>
	  <td>定义用户是否可以直接输入文本到字段中。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>设置启用/禁用字段。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>readonly</td>
	  <td>boolean</td>
	  <td>设置该字段为读写/只读模式。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>hasDownArrow</td>
	  <td>boolean</td>
	  <td>定义是否显示向下箭头按钮。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>value</td>
	  <td>string</td>
	  <td>字段的默认值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>delay</td>
	  <td>number</td>
	  <td>最后一次输入事件与执行搜索之间的延迟间隔（执行自动完成功能的延迟间隔）</td>
	  <td>200</td>
   </tr>
   <tr>
      <td>keyHandler</td>
	  <td>object</td>
	  <td>在用户按下键的时候调用一个函数。</td>
	  <td></td>
   </tr>
</table>  

以上便是下拉框的基本操作。





