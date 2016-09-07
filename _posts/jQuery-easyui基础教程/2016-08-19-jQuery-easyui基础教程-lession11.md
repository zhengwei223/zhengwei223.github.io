---
layout: post  
title: 创建折叠面板    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Accordion的使用方法


# Accordion

## Accordion简介

  
分类空间允许用户使用多面板，但在同一时间只会显示一个。每个面板都内建支持展开和折叠功能。点击一个面板的标题将会展开或折叠面板主体。面板内容可以通过指定的```href```属性使用ajax方式读取面板内容。用户可以定义一个被默认选中的面板，如果未指定，那么第一个面板就是默认的。效果如图：

![image](http://i.imgur.com/cJZEgtY.png) 

## 开发Accordion程序

```
<div id="aa" class="easyui-accordion" style="width:300px;height:200px;">
	<div title="About Accordion" data-options="iconCls:'icon-save'"
		style="overflow:auto;padding:10px;">
		<h3 style="color:#0099FF;">Accordion for jQuery</h3>
		<p>Accordion is a part of easyui framework for jQuery. It lets
			you define your accordion component on web page more easily.</p>
	</div>
	<div title="About easyui" data-options="iconCls:'icon-reload',selected:true"
		style="padding:10px;">content2</div>
	<div title="Tree Menu">content3</div>
</div>
```  

**参考代码:[11/accordion01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/11/accordion01.html)**

效果如上图所示。


## Accordion常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="650px">描述</th>
      <th>默认值</th>
   </tr>
   <tr>
      <td>width</td>
	  <td>number</td>
	  <td>设置分类容器的宽度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>height</td> 
	  <td>number</td> 
	  <td>设置分类容器的高度。</td>
      <td>auto</td>
   </tr>
   <tr>
      <td>fit</td> 
      <td>boolean</td> 
      <td>如果设置为true，分类容器大小将自适应父容器。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>border</td> 
      <td>boolean</td> 
      <td>定义是否显示边框。</td> 
      <td>true</td>
   </tr>
   <tr>
      <td>animate</td> 
      <td>boolean</td> 
      <td>定义在展开和折叠的时候是否显示动画效果。</td> 
      <td>true</td>
   </tr>
   <tr>
      <td>multiple</td> 
      <td>boolean</td> 
      <td>如果为true时，同时展开多个面板。</td> 
      <td>false</td>
   </tr>   
   <tr>
      <td>selected</td> 
      <td>number</td> 
      <td>设置初始化时默认选中的面板索引号。</td> 
      <td>0</td>
   </tr>
</table>


## 面板属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="650px">描述</th>
      <th>默认值</th>
   </tr>
   <tr>
      <td>selected</td>
	  <td>boolean</td>
	  <td>如果设置为true将展开面板。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>collapsible</td> 
	  <td>boolean</td> 
	  <td>如果设置为true将显示折叠按钮。</td>
      <td>true</td>
   </tr>
</table>


## Accordion常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回分类组件的属性。</td>
   </tr>
   <tr>
      <td>panels</td> 
      <td>none</td> 
      <td>获取所有面板。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>none</td> 
      <td>调整分类组件大小。</td>
   </tr>
   <tr>
      <td>getSelected</td> 
      <td>none</td> 
      <td>获取选中的面板。</td>
   </tr>
   <tr>
      <td>getSelections</td> 
      <td>none</td> 
      <td>获取所有选中的面板。</td>
   </tr>
   <tr>
      <td>getPanel</td> 
      <td>which</td> 
      <td>获取指定的面板，'which'参数可以是面板的标题或者索引。</td>
   </tr>   
   <tr>
      <td>getPanelIndex</td> 
      <td>panel</td> 
      <td>
	获取指定面板的索引。以下示例显示如何获取选中面板的索引。</td>
   </tr>   
   <tr>
      <td>select</td> 
      <td>which</td> 
      <td>选择指定面板。'which'参数可以是面板标题或者索引。</td>
   </tr>
   <tr>
      <td>unselect</td> 
      <td>which</td> 
      <td>取消选择指定面板。'which'参数可以是面板标题或者索引。</td>
   </tr>
   <tr>
      <td>add</td> 
      <td>options</td> 
      <td>
       添加一个新面板。在默认情况下，新增的面板会变成当前面板。如果要添加一个非选中面板，不要忘记将'selected'属性设置为false。 
	  </td>
   </tr>
   <tr>
      <td>remove</td> 
      <td>which</td> 
      <td>移除指定面板。'which'参数可以使面板的标题或者索引。</td>
   </tr>
</table>  


## Accordion常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onSelect</td>
	  <td>title,index</td>
	  <td>在面板被选中的时候触发。</td>
   </tr>
   <tr>
      <td>onUnselect</td>
	  <td>title,index</td>
	  <td>在面板被取消选中的时候触发。</td>
   </tr>
   <tr>
      <td>onAdd</td>
	  <td>title,index</td>
	  <td>在添加新面板的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeRemove</td>
	  <td>title,index</td>
	  <td>在移除面板之前触发，返回false可以取消移除操作。</td>
   </tr>
   <tr>
      <td>onRemove</td>
	  <td>title,index</td>
	  <td>在面板被移除的时候触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

代码如下：

```
function add(){
	$('#aa').accordion('add', {
		title: '新标题',
		content: '新内容',
		selected: true,
		iconCls:'icon-add',
		fit:true
	});
}
```

**参考代码:[11/accordion01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/11/accordion01.html)**

效果如下图所示:

![image](http://i.imgur.com/kQpccQh.png)

代码如下：

```
var p = $('#aa').accordion('getSelected');
if (p){
	var index = $('#aa').accordion('getPanelIndex', p);
	alert(index);
}
```

**参考代码:[11/accordion01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/11/accordion01.html)**

以上便是Accordion的基本用法。





