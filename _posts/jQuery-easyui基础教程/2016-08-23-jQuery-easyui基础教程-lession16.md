---
layout: post  
title: 创建连接按钮、菜单按钮、分割按钮  
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握各种按钮的使用方法


# LinkButton

## LinkButton简介

  
按钮组件使用超链接按钮创建。它使用一个普通的\<a\>标签进行展示。它可以同时显示一个图标和文本,或只有图标或文字。按钮的宽度可以动态和折叠/展开以适应它的文本标签。效果如图：

![image](http://i.imgur.com/Sdd0Tr4.png)

## LinkButton程序


```
$(function(){
	$("a").click(function(event){
		alert($(event.target).text());
	});
});
<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',iconAlign:'top'">查找</a> 
<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'">添加</a>  
<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',iconAlign:'bottom'">删除</a>  
```	
效果如下图：

![image](http://i.imgur.com/lHJQCaW.png)


## LinkButton常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>id</td>
	  <td>string</td>
	  <td>组件的ID属性。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>disabled</td> 
	  <td>boolean</td> 
	  <td>为true时禁用按钮。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>toggle</td> 
      <td>boolean</td> 
      <td>为true时允许用户切换其状态是被选中还是未选择，可实现checkbox复选效果。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>selected</td> 
      <td>boolean</td> 
      <td>定义按钮初始的选择状态，true为被选中，false为未选中。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>group</td> 
      <td>string</td> 
      <td>指定相同组名称的按钮同属于一个组，可实现radio单选效果。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>plain</td> 
      <td>boolean</td> 
      <td>为true时显示简洁效果。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>text</td> 
      <td>string</td> 
      <td>按钮文字。</td> 
      <td>''</td>
   </tr>
   <tr>
      <td>iconCls</td> 
      <td>string</td> 
      <td>显示在按钮文字左侧的图标(16x16)的CSS类ID。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>iconAlign</td> 
      <td>string</td> 
      <td>按钮图标位置。</td> 
      <td>left</td>
   </tr>
   <tr>
      <td>size</td> 
      <td>string</td> 
      <td>按钮大小。可用值有：'small','large'。</td> 
      <td>small</td>
   </tr>
   <tr>
      <td>selected</td> 
      <td>boolean</td> 
      <td>定义按钮初始的选择状态，true为被选中，false为未选中。</td> 
      <td>false</td>
   </tr>
</table>


## LinkButton常用方法  

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
      <td>disable</td> 
      <td>none</td> 
      <td>禁用按钮。</td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用按钮。</td>
   </tr>
   <tr>
      <td>select</td> 
      <td>none</td> 
      <td>选择按钮。</td>
   </tr>
   <tr>
      <td>unselect</td> 
      <td>none</td> 
      <td>取消选择按钮。</td>
   </tr>
</table>  


## LinkButton常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onClick</td>
	  <td>none</td>
	  <td>在点击按钮的时候触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

代码如下：

HTML代码：

```
<input type="button" value="禁用按钮" onclick="myBtn();"/><br/>
```

JS代码：

```
function myBtn(){
	if($("input").attr("value") === '禁用按钮'){
		$("a").linkbutton("disable");
		$("input").attr("value","启用按钮");
	}else{
		$("a").linkbutton("enable");
		$("input").attr("value","禁用按钮");
	}
}
```

# MenuButton

## MenuButton简介

  
菜单按钮是下拉菜单的一部分。它伴随着linkbutton和menu组件。在用户点击linkbutton之前菜单是隐藏的，当用户用鼠标点击或移动到linkbutton上面的时候菜单才会显示。 效果如图：

![image](http://i.imgur.com/QJbJvWO.png)

## MenuButton程序


```
<div style="background:#fafafa;padding:5px;width:200px;border:1px solid #ccc">
	<a href="#" class="easyui-menubutton" menu="#mm1" iconCls="icon-edit">Edit</a>
	<a href="#" class="easyui-menubutton" menu="#mm2" iconCls="icon-help">Help</a>
</div>
<div id="mm1" style="width:150px;">
	<div iconCls="icon-undo">Undo</div>
	<div iconCls="icon-redo">Redo</div>
	<div class="menu-sep"></div>
	<div>Cut</div>
	<div>Copy</div>
	<div>Paste</div>
	<div class="menu-sep"></div>
	<div iconCls="icon-remove">Delete</div>
	<div>Select All</div>
</div>
<div id="mm2" style="width:100px;">
	<div>Help</div>
	<div>Update</div>
	<div>About</div>
</div>
```	
效果如上图。


## MenuButton常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>plain</td>
	  <td>boolean</td>
	  <td>为true时显示简易效果。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>menu</td> 
	  <td>string</td> 
	  <td>用来创建一个对应菜单的选择器。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>menuAlign</td> 
      <td>string</td> 
      <td>允许用户设置顶级菜单对齐方式。可用值有：'left','right'。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>duration</td> 
      <td>number</td> 
      <td>定义鼠标划过按钮时显示菜单所持续的时间，单位为毫秒。</td> 
      <td>100</td>
   </tr>
</table>


## MenuButton常用方法  

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
      <td>disable</td> 
      <td>none</td> 
      <td>禁用按钮。</td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用按钮。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁菜单按钮。</td>
   </tr>
</table>  

参考jQuery EasyUI的API。


# SplitButton

## SplitButton简介

  
类似菜单按钮，分割按钮也与linkbutton和菜单有关系。menubutton和splitbutton之间的区别是,splitbutton分为两部分。它只会在鼠标移动到splitbutton按钮右边的时候才会显示出“分割线”。效果如图：

![image](http://i.imgur.com/Y91qCju.png)

## SplitButton程序


```
<div style="border:1px solid #ccc;background:#fafafa;padding:5px;width:120px;">
	<a href="#" class="easyui-splitbutton" menu="#mm" iconCls="icon-edit">Edit</a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help"></a>
</div>
<div id="mm" style="width:150px;">
	<div iconCls="icon-undo">Undo</div>
	<div iconCls="icon-redo">Redo</div>
	<div class="menu-sep"></div>
	<div>Cut</div>
	<div>Copy</div>
	<div>Paste</div>
	<div class="menu-sep"></div>
	<div>
		<span>Open</span>
		<div style="width:150px;">
			<div>Firefox</div>
			<div>Internet Explorer</div>
			<div class="menu-sep"></div>
			<div>Select Program...</div>
		</div>
	</div>
	<div iconCls="icon-remove">Delete</div>
	<div>Select All</div>
</div>  
```	
效果如上图


## SplitButton常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>plain</td>
	  <td>boolean</td>
	  <td>设置为true将显示简洁效果。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>menu</td> 
	  <td>string</td> 
	  <td>用来创建一个对应菜单的选择器。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>duration</td> 
      <td>number</td> 
      <td>定义鼠标划过按钮时显示菜单所持续的时间，单位为毫秒。</td> 
      <td>100</td>
   </tr>
</table>


## SplitButton常用方法  

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
      <td>disable</td> 
      <td>none</td> 
      <td>禁用分割按钮。</td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用分割按钮。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁分割按钮。</td>
   </tr>
</table>  

参考jQuery EasyUI的API。

**MenuButton与SplitButton的区别：**当没有子菜单项的时候，MenuButton不再显示下三角形，SplitButton依然显示下三角形。  

参考代码：

```
<div style="border:1px solid #ccc;background:#fafafa;padding:5px;width:120px;">
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help"></a>
	<a href="#" class="easyui-splitbutton" plain="true" iconCls="icon-help"></a>
</div>
```  

效果如下图：

![image](http://i.imgur.com/llYO9TA.png)


以上便是各种按钮的基本用法。





