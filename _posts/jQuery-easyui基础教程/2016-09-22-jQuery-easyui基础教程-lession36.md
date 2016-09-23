---
layout: post  
title: ComboGrid下拉数据网络  
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 熟练掌握ComboGrid下拉数据网络 


# ComboGrid

## ComboGrid简介

  
下拉数据网格（Combogrid）组件和下拉框（Combobox）组件的共同点是，除了都具有下拉面板以外，它们都是基于数据网格（Datagrid）的。 下拉数据网格（Combogrid）组件可以过滤、分页，并具有其他一些数据网格（Datagrid）的功能。 效果如下图：

![image](http://i.imgur.com/5eodkJI.png)

## 开发ComboGrid程序


```
<input id="cg" style="width:150px">
<script type="text/javascript">
	$('#cg').combogrid({
		panelWidth:500,
		url: '../dist/data/datagrid_data.json',
		idField:'itemId',
		textField:'productId',
		mode:'remote',
		fitColumns:true,
		columns:[[
			{field:'itemId',title:'Item ID',width:60},
			{field:'productId',title:'Product ID',align:'right',width:80},
			{field:'listPrice',title:'List Price',align:'right',width:60},
				{field:'unitCost',title:'Unit Cost',align:'right',width:60},
			{field:'attr1',title:'Attribute',width:150},
			{field:'status',title:'Stauts',align:'center',width:60}
		]]
	});
</script>
```

**参考代码:[36/datagrid16.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/36/datagrid16.html)**
  
效果如上图。

## ComboGrid常用属性

数据表格下拉框的属性扩展自combo(自定义下拉框)和datagrid(数据表格)。

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>loadMsg</td>
	  <td>string</td>
	  <td>在数据表格加载远程数据的时候显示消息。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>idField</td>
	  <td>string</td>
	  <td>ID字段名称。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>textField</td>
	  <td>string</td>
	  <td>要显示在文本框中的文本字段。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>mode</td>
	  <td>string</td>
	  <td>定义在文本改变的时候如何读取数据网格数据。</td>
	  <td>local</td>
   </tr>
   <tr>
      <td>filter</td>
	  <td>function(q, row)</td>
	  <td>定义在'mode'设置为'local'的时候如何选择本地数据，返回true时则选择该行。 </td>
	  <td></td>
   </tr>
</table>


## ComboGrid常用方法  

数据表格下拉框的方法扩展自combo(自定义下拉框)。

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
      <td>grid</td> 
      <td>none</td> 
      <td>返回数据表格对象。</td>
   </tr>
   <tr>
      <td>setValues</td> 
      <td>values</td> 
      <td>设置组件值数组。 </td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置组件值</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除组件的值。</td>
   </tr>
</table>  


## ComboGrid常用事件

数据表格下拉框事件完全扩展自combo(自定义下拉框)和datagrid(数据表格)。


以上便是下拉数据网络的基本用法。





