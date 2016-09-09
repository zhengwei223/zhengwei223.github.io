---
layout: post  
title: 创建连接按钮、菜单按钮、分割按钮、开关按钮  
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

  
按钮组件使用超链接按钮创建。它使用一个普通的```<a>```标签进行展示。它可以同时显示一个图标和文本,或只有图标或文字。按钮的宽度可以动态和折叠/展开以适应它的文本标签。效果如图：

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

**参考代码:[16/linkbutton01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/linkbutton01.html)**

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

**参考代码:[16/linkbutton01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/linkbutton01.html)**

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

**参考代码:[16/menubutton01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/menubutton01.html)**

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
<div style="border:1px solid #ccc;background:#fafafa;padding:5px;width:80px;">
	<a href="#" class="easyui-splitbutton" menu="#mm" iconCls="icon-edit">Edit</a>
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

**参考代码:[16/splitbutton01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/splitbutton01.html)**

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

**MenuButton与SplitButton的区别：**只有当鼠标移动到splitbutton控件的下三角时才会显示子菜单，而menubutton控件则是只要鼠标移动上去就显示子菜单。  

参考代码：

```
<div style="border:1px solid #ccc;background:#fafafa;padding:5px;width:150px;">
	<a href="#" class="easyui-splitbutton" data-options="menu:'#mm2',iconCls:'icon-ok'">Ok</a>  
	<a href="#" class="easyui-menubutton" data-options="menu:'#mm3',iconCls:'icon-help'">Help</a> 
</div>
<div id="mm2" style="width:150px;">
	<div iconCls="icon-undo">Undo</div>
	
</div>  
<div id="mm3" style="width:150px;">
	<div iconCls="icon-redo">Redo</div>
</div> 
```  

**参考代码:[16/splitbutton02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/splitbutton02.html)**


**MenuButton和SplitButton控件即使没有子菜单也会显示下三角，想要不显示，则用linkbutton替换。**

参考代码：

```
<div style="border:1px solid #ccc;background:#fafafa;padding:5px;width:150px;">
	<a href="#" class="easyui-splitbutton" iconCls="icon-edit">Edit</a>
	<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-help">Help</a>
</div>
```

**参考代码:[16/splitbutton03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/splitbutton03.html)**

效果如下图：

![image](http://i.imgur.com/bRyvtZ3.png)


# SwitchButton

## SwitchButton简介

  
用在"form"表单中的开关按钮。按钮有2个状态：“开”和“关”，用户可以点击或轻敲来切换，标签状态是可定制的。效果如图：

![image](http://i.imgur.com/xsvhn61.png)

## SwitchButton程序


```
<input class="easyui-switchbutton" checked> <br/><br/>
<input class="easyui-switchbutton">
```	

**参考代码:[16/switchbutton01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/switchbutton01.html)**

效果如上图。


## SwitchButton常用属性

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
	  <td>开关按钮宽度。</td>
	  <td>60</td>
   </tr>
   <tr>
      <td>height</td> 
	  <td>number</td> 
	  <td>开关按钮高度。</td>
	  <td>26</td>
   </tr>
   <tr>
      <td>handleWidth</td> 
      <td>number</td> 
      <td>开关把手宽度。</td> 
      <td>auto</td>
   </tr>
   <tr>
      <td>checked</td> 
      <td>boolean</td> 
      <td>定义按钮是否开启。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>disabled</td> 
      <td>boolean</td> 
      <td>定义按钮是否禁用。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>readonly</td> 
      <td>boolean</td> 
      <td>定义按钮是否只读。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>reversed</td> 
      <td>boolean</td> 
      <td>设置为true时，反转开关文本。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>onText</td> 
      <td>string</td> 
      <td>左边文本值（反转后是右边）。</td> 
      <td>ON</td>
   </tr>
   <tr>
      <td>offText</td> 
      <td>string</td> 
      <td>右边文本值（反转后是左边）。</td> 
      <td>OFF</td>
   </tr>
   <tr>
      <td>handleText</td> 
      <td>string</td> 
      <td>开关把手文本值。</td> 
      <td>''</td>
   </tr>
   <tr>
      <td>value</td> 
      <td>string</td> 
      <td>给按钮绑定默认值。</td> 
      <td>on</td>
   </tr>
</table>


## SwitchButton常用方法  

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
      <td>param</td> 
      <td>调整开关按钮大小。</td>
   </tr>
   <tr>
      <td>disable</td> 
      <td>none</td> 
      <td>禁用开关按钮。</td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用开关按钮。</td>
   </tr>
   <tr>
      <td>readonly</td> 
      <td>mode</td> 
      <td>启用/禁用只读模式。</td>
   </tr>
   <tr>
      <td>check</td> 
      <td>none</td> 
      <td>启用开关按钮。</td>
   </tr>
   <tr>
      <td>uncheck</td> 
      <td>none</td> 
      <td>禁用开关按钮。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除开关按钮的值。</td>
   </tr>
   <tr>
      <td>reset</td> 
      <td>none</td> 
      <td>重置开关按钮的值。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置开关按钮的值。</td>
   </tr>
</table>  


## SwitchButton常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onChange</td>
	  <td>checked</td>
	  <td>在更改控件值的时候触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

案例一：

代码如下：

```
$("#input1").switchbutton({
	reversed:true,
	onText:'Yes',
	offText:'No',
	handleText:'handle',
	width:160,
	handleWidth:80
});
```

**参考代码:[16/switchbutton01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/16/switchbutton01.html)**


以上便是各种按钮的基本用法。





