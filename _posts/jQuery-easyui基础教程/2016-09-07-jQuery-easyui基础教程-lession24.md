---
layout: post  
title: 树型下拉框    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 了解ComboTree的基本属性、方法和事件
- 灵活掌握Combobox的基本操作


# ComboTree

## ComboTree简介

  
树形下拉框结合选择控件和下拉树控件。它与combobox(下拉列表框)类似，但是将下拉列表框的列表替换成了树形控件。该控件支持树状态复选框，方便多选操作。 效果如下图：

![image](http://i.imgur.com/bllNspa.png)


## 开发ComboTree程序

```
<select id="cc" class="easyui-combotree" style="width:200px;" data-options="url:'../data/tree_data.json',required:true"></select>  
```

**参考代码:[24/combotree01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/24/combotree01.html)**
 
效果如上图。


## ComboTree常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>editable</td>
	  <td>boolean</td>
	  <td>定义用户是否可以直接输入文本到字段中。</td>
	  <td>false</td>
   </tr>
</table>  


## ComboTree常用方法  

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
      <td>tree</td> 
      <td>none</td> 
      <td>返回树形对象。 </td>
   </tr>
   <tr>
      <td>loadData</td> 
      <td>data</td> 
      <td>读取本地树形数据。 </td>
   </tr>
   <tr>
      <td>reload</td> 
      <td>url</td> 
      <td>再次请求远程树数据。通过'url'参数重写原始URL值。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清空控件的值。</td>
   </tr>
   <tr>
      <td>setValues</td> 
      <td>values</td> 
      <td>设置组件值数组。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置组件值。值可以是节点的“id”值或“id”和“text” 键值对。</td>
   </tr>
</table>  

## 带有复选框的combotree

代码如下：

```
$("#cc").combotree({
	url:'../data/combotree_data.json',
	multiple:true,
	required:true
});
var $tree = $('#cc').combotree('tree');
$tree.tree({
	checkbox:true,
	onlyLeafCheck:true//只能选择子节点
});
```

**参考代码:[24/combotree02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/24/combotree02.html)**

效果如下图：

![image](http://i.imgur.com/3OwIh87.png)	


以上便是combotree的基本操作。
