---
layout: post  
title: 创建简单菜单    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Menu的使用方法


# Menu

## Menu简介

  
菜单组件通常用于快捷菜单,可以大大简化人们的操作，是我们日常使用中比较多的控件之一。此外，它也是构建其他菜单组件的必备基础组件。比如：menubutton和splitbutton。它还可以用于导航和执行命令。效果如图：

![image](http://i.imgur.com/nROZGRV.png)

## Menu程序

实现如下效果：

![image](http://i.imgur.com/ftEM7Sb.png)

当点击body标签的时候显示上图所示的右键菜单。实现该效果需要具备一下知识：

* 如何触发鼠标右键事件：  

```
//为body标签添加自定义的右键菜单
$("body").mouseup(function(event){
	//判断点击的是否是右键
	if(event.button == 2){
		//鼠标点击的是右键
	}  
});
```	

* 当触发鼠标右键的时候，或默认弹出浏览器的右键菜单。如何禁用浏览器本身的右键菜单呢？

```
//禁用body标签内浏览器本身自带的右键菜单
$("body").contextmenu(function (){
    return false;
});
```	
 
* 显示自定义的右键菜单：  

```
//显示自定义的右键菜单
$('#mm').menu('show', {    
  left: event.pageX,    
  top: event.pageY    
});
```	

综上所述，HTML代码为： 
 
```
<body style="height: 610px;">
	<div id="mm" class="easyui-menu" style="width:120px;">   
	    <div>New</div>   
	    <div>   
	        <span>Open</span>   
	        <div style="width:150px;">   
	            <div><b>Word</b></div>   
	            <div>Excel</div>   
	            <div>PowerPoint</div>   
	        </div>   
	    </div>   
	    <div data-options="iconCls:'icon-save'">Save</div>   
	    <div class="menu-sep"></div>   
	    <div>Exit</div>   
	</div>  
</body>
```  

JS代码为： 
 
```
$(function(){
	//禁用body标签内浏览器本身自带的右键菜单
	$("body").contextmenu(function (){
	    return false;
	});
	//为body标签添加自定义的右键菜单
	$("body").mouseup(function(event){
		//判断点击的是否是右键
		if(event.button == 2){
			$('#mm').menu('show', {    
			  left: event.pageX,    
			  top: event.pageY    
			});
		}  
	});
});
```  


## Menu常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>left</td>
	  <td>string</td>
	  <td>菜单的左边距位置。</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>top</td> 
	  <td>number</td> 
	  <td>菜单的上边距位置。</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>minWidth</td> 
      <td>number</td> 
      <td>菜单的最小宽度。</td> 
      <td>120</td>
   </tr>
   <tr>
      <td>hideOnUnhover</td> 
      <td>boolean</td> 
      <td>当设置为true时，在鼠标离开菜单的时候将自动隐藏菜单。</td> 
      <td>true</td>
   </tr>
</table>


## MenuItem（菜单项）常用属性

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
	  <td>菜单项ID属性。</td>
	  <td></td>
   </tr>
   <tr>
      <td>text</td> 
	  <td>string</td> 
	  <td>菜单项文本。</td>
	  <td></td>
   </tr>
   <tr>
      <td>iconCls</td> 
      <td>string</td> 
      <td>显示在菜单项左侧的16x16像素图标的CSS类ID。</td> 
      <td></td>
   </tr>
   <tr>
      <td>href</td> 
      <td>string</td> 
      <td>设置点击菜单项时候的页面位置。</td> 
      <td></td>
   </tr>
   <tr>
      <td>disabled</td> 
      <td>boolean</td> 
      <td>定义是否显示菜单项。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>onclick</td> 
      <td>function</td> 
      <td>在点击菜单项的时候调用的函数。</td> 
      <td></td>
   </tr>
</table>

## Menu常用方法  

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
      <td>show</td> 
      <td>pos</td> 
      <td>显示菜单到指定的位置。'pos'参数有2个属性：<br/>
		left：新的左边距位置。<br/>
		top：新的上边距位置。<br/>
	  </td>
   </tr>
   <tr>
      <td>hide</td> 
      <td>none</td> 
      <td>隐藏菜单。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁菜单。</td>
   </tr>
   <tr>
      <td>getItem</td> 
      <td>itemEl</td> 
      <td>获取指定的菜单项。</td>
   </tr>
   <tr>
      <td>setText</td> 
      <td>param</td> 
      <td>设置指定菜单项的文本。</td>
   </tr>
   <tr>
      <td>setIcon</td> 
      <td>param</td> 
      <td>设置指定菜单项图标。</td>
   </tr>   
   <tr>
      <td>findItem</td> 
      <td>text</td> 
      <td>查找的指定菜单项，返回的对象和getItem方法是一样的。</td>
   </tr>   
   <tr>
      <td>appendItem</td> 
      <td>options</td> 
      <td>追加新的菜单项，'options'参数代表新菜单项属性。</td>
   </tr>
   <tr>
      <td>removeItem</td> 
      <td>itemEl</td> 
      <td>移除指定的菜单项。</td>
   </tr>
   <tr>
      <td>enableItem</td> 
      <td>itemEl</td> 
      <td>启用菜单项。</td>
   </tr>
   <tr>
      <td>disableItem</td> 
      <td>itemEl</td> 
      <td>禁用菜单项。</td>
   </tr>
</table>  


## Menu常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onShow</td>
	  <td>none</td>
	  <td>在菜单显示之后触发。</td>
   </tr>
   <tr>
      <td>onHide</td>
	  <td>none</td>
	  <td>在菜单隐藏之后触发。</td>
   </tr>
   <tr>
      <td>onClick</td>
	  <td>item</td>
	  <td>在菜单项被点击的时候触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

代码如下：

HTML代码：

```
<body style="height: 610px;">
	<div id="mm" class="easyui-menu" style="width:120px;">   
	    <div data-options="id:1,name:'new',iconCls:'icon-add'">新建</div>
		<div data-options="id:2,name:'save',iconCls:'icon-save'">保存</div>
		<div data-options="id:3,name:'print',iconCls:'icon-print'">打印</div>
		<div class="menu-sep"></div>
		<div data-options="id:4,name:'exit',iconCls:'icon-cancel'">退出</div>
	</div>  
	<input type="button" value="新建-->修改" onclick="myUpdate();"/><br/>
	<input type="button" value="添加重置菜单项" onclick="myAdd();"/><br/>
	<input type="button" value="移除打印菜单项" onclick="myRemove();"/><br/>
	<input type="button" value="禁用保存菜单项" onclick="myDisable();"/><br/>
	<input type="button" value="启用保存菜单项" onclick="myEnable();"/><br/>
</body>
```

JS代码：

```
//新建-->修改
function myUpdate(){
	// 查找“打开”项并禁用它
	var item = $('#mm').menu('findItem', '新建');
	//$('#mm').menu('disableItem', item.target);
	$('#mm').menu('setText', {
		target: item.target,
		text: '修改'
	});
	$('#mm').menu('setIcon', {
		target: item.target,
		iconCls: 'icon-edit'
	});
}
//添加重置菜单项
function myAdd(){
	// 追加一个顶部菜单
	$('#mm').menu('appendItem', {
		text: '重置',
		id:10,
		name:'reset',
		iconCls: 'icon-undo',
	});
	
	// 追加一个子菜单项到保存菜单
	var item = $('#mm').menu('findItem', '保存');  // 查找“保存”项
	$('#mm').menu('appendItem', {
		parent: item.target,  // 设置父菜单元素
		text: '保存到Excel文档',
		id:11,
		name:'excel'
	});
}
//移除打印菜单项
function myRemove(){
	// 查找“打印”项并移除它
	var item = $('#mm').menu('findItem', '打印');
	$('#mm').menu('removeItem', item.target);
}
//禁用保存菜单项
function myDisable(){
	// 查找“保存”项并禁用它
	var item = $('#mm').menu('findItem', '保存');
	$('#mm').menu('disableItem', item.target);
}
//启用保存菜单项
function myEnable(){
	// 查找“保存”项并启用它
	var item = $('#mm').menu('findItem', '保存');
	$('#mm').menu('enableItem', item.target);
}
```


以上便是Menu的基本用法。





