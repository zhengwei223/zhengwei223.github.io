---
layout: post  
title: TreeGrid树型网络  
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 熟练掌握TreeGrid树型网络 


# TreeGrid

## TreeGrid简介

树形网格（TreeGrid）组件从数据网格（DataGrid）继承，但是允许在行之间存在父/子节点关系。许多属性继承至数据网格（DataGrid），可以用在树形网格（TreeGrid）中。为了使用树形网格（TreeGrid），用户必须定义 'treeField' 属性，指明哪个字段作为树节点。效果如下图：

![image](http://i.imgur.com/kXRPG3l.png)


## 开发TreeGrid程序

```
<h1>TreeGrid</h1>
<table id="test" title="Folder Browser" class="easyui-treegrid" style="width:400px;height:300px"
		url="../data/treegrid_data.json"
		rownumbers="true"
		idField="id" treeField="name">
	<thead>
		<tr>
			<th field="name" width="160">Name</th>
			<th field="size" width="60" align="right">Size</th>
			<th field="date" width="100">Modified Date</th>
		</tr>
	</thead>
</table>
```

**参考代码:[35/datagrid14.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/35/datagrid14.html)**
  
效果如上图。


## TreeGrid常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>idField</td>
	  <td>string</td>
	  <td>定义关键字段来标识树节点。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>treeField</td>
	  <td>string</td>
	  <td>定义树节点字段。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>animate</td>
	  <td>boolean</td>
	  <td>定义在节点展开或折叠的时候是否显示动画效果。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>checkbox</td>
	  <td>boolean,function</td>
	  <td>定义在每一个节点前显示复选框。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>cascadeCheck</td>
	  <td>boolean</td>
	  <td>定义是否级联检查。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>onlyLeafCheck</td>
	  <td>boolean</td>
	  <td>定义是否仅在叶子节点前显示复选框。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>lines</td>
	  <td>boolean</td>
	  <td>定义是否显示treegrid行。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>loader</td>
	  <td>function(param,success,error)</td>
	  <td>定义以何种方式从远程服务器读取数据。</td>
	  <td>json loader</td>
   </tr>
   <tr>
      <td>loadFilter</td>
	  <td>function(data,parentId)</td>
	  <td>返回过滤后的数据进行展示。</td>
	  <td></td>
   </tr>
</table>


## TreeGrid常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回树形表格的属性。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>options</td> 
      <td>设置树形表格大小。</td>
   </tr>
   <tr>
      <td>fixRowHeight</td> 
      <td>id</td> 
      <td>修正指定的行高。</td>
   </tr>
   <tr>
      <td>load</td> 
      <td>param</td> 
      <td>读取并显示首页内容。</td>
   </tr>
   <tr>
      <td>loadData</td> 
      <td>data</td> 
      <td>读取树形表格数据。</td>
   </tr>
   <tr>
      <td>reload</td> 
      <td>id</td> 
      <td>重新加载树形表格数据。</td>
   </tr> 
   <tr>
      <td>reloadFooter</td> 
      <td>footer</td> 
      <td>重新载入页脚数据。</td>
   </tr>
   <tr>
      <td>getData</td> 
      <td>none</td> 
      <td>获取载入数据。</td>
   </tr>
   <tr>
      <td>getFooterRows</td> 
      <td>none</td> 
      <td>获取页脚数据。</td>
   </tr>
   <tr>
      <td>getRoot</td> 
      <td>none</td> 
      <td>获取根节点，返回节点对象。</td>
   </tr>
   <tr>
      <td>getRoots</td> 
      <td>none</td> 
      <td>获取所有根节点，返回节点数组。</td>
   </tr>
   <tr>
      <td>getParent</td> 
      <td>id</td> 
      <td>获取父节点。</td>
   </tr>
   <tr>
      <td>getChildren</td> 
      <td>id</td> 
      <td>获取子节点。</td>
   </tr>
   <tr>
      <td>getSelected</td> 
      <td>none</td> 
      <td>获取选择的节点并返回它，如果没有节点被选中则返回null。</td>
   </tr>
   <tr>
      <td>getSelections</td> 
      <td>none</td> 
      <td>获取所有选择的节点。</td>
   </tr>
   <tr>
      <td>getLevel</td> 
      <td>id</td> 
      <td>获取指定节点等级。</td>
   </tr>
   <tr>
      <td>find</td> 
      <td>id</td> 
      <td>查找指定节点并返回节点数据。</td>
   </tr>
   <tr>
      <td>select</td> 
      <td>id</td> 
      <td>选择一个节点。</td>
   </tr> 
   <tr>
      <td>unselect</td> 
      <td>id</td> 
      <td>反选一个节点。</td>
   </tr>
   <tr>
      <td>selectAll</td> 
      <td>none</td> 
      <td>选择所有节点。</td>
   </tr>
   <tr>
      <td>unselectAll</td> 
      <td>none</td> 
      <td>反选所有节点。</td>
   </tr> 
   <tr>
      <td>collapse</td> 
      <td>id</td> 
      <td>折叠一个节点。</td>
   </tr>
   <tr>
      <td>expand</td> 
      <td>id</td> 
      <td>展开一个节点。</td>
   </tr>
   <tr>
      <td>collapseAll</td> 
      <td>none</td> 
      <td>折叠所有节点。</td>
   </tr> 
   <tr>
      <td>expandAll</td> 
      <td>none</td> 
      <td>展开所有节点。</td>
   </tr>
   <tr>
      <td>expandTo</td> 
      <td>id</td> 
      <td>打开从根节点到指定节点之间的所有节点。</td>
   </tr>
   <tr>
      <td>toggle</td> 
      <td>id</td> 
      <td>节点展开/折叠状态触发器。</td>
   </tr> 
   <tr>
      <td>append</td> 
      <td>param</td> 
      <td>追加节点到一个父节点。</td>
   </tr>
   <tr>
      <td>insert</td> 
      <td>param</td> 
      <td>插入一个新节点到指定节点。</td>
   </tr>
   <tr>
      <td>remove</td> 
      <td>id</td> 
      <td>移除一个节点和他的所有子节点。</td>
   </tr> 
   <tr>
      <td>pop</td> 
      <td>id</td> 
      <td>弹出并返回节点数据以及它的子节点之后删除。</td>
   </tr>
   <tr>
      <td>refresh</td> 
      <td>id</td> 
      <td>刷新指定节点。</td>
   </tr>
   <tr>
      <td>update</td> 
      <td>param</td> 
      <td>更新指定节点。</td>
   </tr>  
   <tr>
      <td>beginEdit</td> 
      <td>id</td> 
      <td>开始编辑一个节点。</td>
   </tr>
   <tr>
      <td>endEdit</td> 
      <td>id</td> 
      <td>结束编辑一个节点。</td>
   </tr>
   <tr>
      <td>cancelEdit</td> 
      <td>id</td> 
      <td>取消编辑一个节点。</td>
   </tr>
   <tr>
      <td>getEditors</td> 
      <td>id</td> 
      <td>获取指定行编辑器。</td>
   </tr>
   <tr>
      <td>getEditor</td> 
      <td>param</td> 
      <td>获取指定编辑器。</td>
   </tr>
   <tr>
      <td>showLines</td> 
      <td>none</td> 
      <td>显示treegrid行。</td>
   </tr>
</table>  

## TreeGrid常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onClickRow</td><td>row</td><td>在用户点击节点的时候触发。</td>
   </tr>
   <tr>
      <td>onDblClickRow</td><td>row</td><td>在用户双击节点的时候触发。</td>
   </tr>
   <tr>
      <td>onClickCell</td><td>field,row</td><td>在用户点击单元格的时候触发。</td>
   </tr>
	<tr>
      <td>onDblClickCell</td><td>field,row</td><td>在用户双击单元格的时候触发。</td>
   </tr>
	<tr>
      <td>onBeforeLoad</td><td>row, param</td><td>在请求数据加载之前触发，返回false可以取消加载。</td>
   </tr>
	<tr>
      <td>onLoadSuccess</td><td>row, param</td><td>数据加载完成之后触发。</td>
   </tr>
	<tr>
      <td>onLoadError</td><td>arguments</td><td>数据加载失败的时候触发。</td>
   </tr>
	<tr>
      <td>onBeforeSelect</td><td>row</td><td>在用户选择一行之前触发，返回false则取消该动作。</td>
   </tr>
	<tr>
      <td>onSelect</td><td>row</td><td>在用户选择的时候触发，返回false则取消该动作。</td>
   </tr>
	<tr>
      <td>onBeforeUnselect</td><td>row</td><td>在用户取消选择一行之前触发，返回false则取消该动作。</td>
   </tr>
	<tr>
      <td>onUnselect</td><td>row</td><td>在用户取消选择的时候触发，返回false则取消该动作。</td>
   </tr>
	<tr>
      <td>onBeforeCheckNode</td><td>row,checked</td><td>在用户选中一行节点之前触发，返回false则取消该动作。</td>
   </tr>
	<tr>
      <td>onCheckNode</td><td>row,checked</td><td>在用户选中一行节点的时候触发，返回false则取消该动作。</td>
   </tr>
	<tr>
      <td>onBeforeExpand</td><td>row</td><td>在节点展开之前触发，返回false可以取消展开节点的动作。</td>
   </tr>
	<tr>
      <td>onExpand</td><td>row</td><td>在节点被展开的时候触发。</td>
   </tr>
	<tr>
      <td>onBeforeCollapse</td><td>row</td><td>在节点折叠之前触发，返回false可以取消折叠节点的动作。</td>
   </tr>
	<tr>
      <td>onCollapse</td><td>row</td><td>在节点被折叠的时候触发。</td>
   </tr>
	<tr>
      <td>onContextMenu</td><td>e, row</td><td>在右键点击节点的时候触发。</td>
   </tr>
	<tr>
      <td>onBeforeEdit</td><td>row</td><td>在用户开始编辑节点的时候触发。</td>
   </tr>
	<tr>
      <td>onAfterEdit</td><td>row, changes</td><td>在用户完成编辑的时候触发。</td>
   </tr>
	<tr>
      <td>onCancelEdit</td><td>row</td><td>在用户取消编辑节点的时候触发。</td>
   </tr>
</table> 


## 创建复杂树形网格

代码如下：

```
<table title="Complex TreeGrid" class="easyui-treegrid"	style="width:550px;height:250px" url="../data/treegrid2_data.json" rownumbers="true" showFooter="true" idField="id" treeField="region">
	<thead frozen="true">
		<tr>
			<th field="region" width="150">Region</th>
		</tr>
	</thead>
	<thead>
		<tr>
			<th colspan="4">2009</th>
			<th colspan="4">2010</th>
		</tr>
		<tr>
			<th field="f1" width="50" align="right">1st qrt.</th>
			<th field="f2" width="50" align="right">2st qrt.</th>
			<th field="f3" width="50" align="right">3st qrt.</th>
			<th field="f4" width="50" align="right">4st qrt.</th>
			<th field="f5" width="50" align="right">1st qrt.</th>
			<th field="f6" width="50" align="right">2st qrt.</th>
			<th field="f7" width="50" align="right">3st qrt.</th>
			<th field="f8" width="50" align="right">4st qrt.</th>
		</tr>
	</thead>
</table>
```

**参考代码:[35/datagrid15.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/35/datagrid15.html)**

效果如下图：

![image](http://i.imgur.com/YLtV5cW.png)


以上便是树型网络的基本用法。





