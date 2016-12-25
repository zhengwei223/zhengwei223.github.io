---
layout: post  
title: 使用可编辑数据表格实现CRUD（Editable DataGrid）    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 使用可编辑数据表格实现CRUD（Editable DataGrid）   


# Editable DataGrid

## Editable DataGrid简介

可以在```<table>```内直接编辑的控件，扩展自```<datagrid>```。  

访问[EasyUI官网](http://www.jeasyui.com/extension/downloads/jquery-easyui-edatagrid.zip)下载。效果如下图：

![](/public/img/easyui-zq/31.1.png)

*图31-01*

## Editable DataGrid常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>destroyMsg</td>
	  <td>object</td>
	  <td>销毁行的时候显示的确认对话框消息。</td>
	  <td>destroyMsg:{ <br/>
	norecord:{ <br/>
		title:'Warning', <br/>
		msg:'No record is selected.' <br/>
	}, <br/>
	confirm:{ <br/>	title:'Confirm', <br/>
		msg:'Are you sure you want to delete?' <br/>
	} <br/>
} <br/>
</td>
   </tr>
   <tr>
      <td>autoSave</td>
	  <td>boolean</td>
	  <td>设置为true时，在点击表格外部的时候自动保存编辑的行。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>url</td>
	  <td>string</td>
	  <td>通过URL向服务器检索数据。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>saveUrl</td>
	  <td>string</td>
	  <td>通过URL保存数据到服务器并返回添加的行。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>updateUrl</td>
	  <td>string</td>
	  <td>通过URL更新数据到服务器并返回更新的行。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>destroyUrl</td>
	  <td>string</td>
	  <td>通过URL将'id'参数发送到服务器以销毁行。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>tree</td>
	  <td>selector</td>
	  <td>树选择器指示相对应的树控件。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>treeUrl</td>
	  <td>string</td>
	  <td>通过URL检索树控件数据。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>treeDndUrl</td>
	  <td>string</td>
	  <td>通过URL处理拖拽操作。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>treeTextField</td>
	  <td>string</td>
	  <td>定义树的文本字段名称。</td>
	  <td>name</td>
   </tr>
   <tr>
      <td>treeParentField</td>
	  <td>string</td>
	  <td>定义树的父节点字段名。</td>
	  <td>parentId</td>
   </tr>
</table>  


## Editable DataGrid常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">名称</th> 
      <th width="300px">参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回属性对象。</td>
   </tr>
   <tr>
      <td>enableEditing</td> 
      <td>none</td> 
      <td>启用数据表格编辑。</td>
   </tr>
   <tr>
      <td>disableEditing</td> 
      <td>none</td> 
      <td>禁用数据表格编辑。</td>
   </tr>
   <tr>
      <td>editRow</td> 
      <td>index</td> 
      <td>编辑指定行。</td>
   </tr>
   <tr>
      <td>addRow</td> 
      <td>none</td> 
      <td>添加一个新的空行。</td>
   </tr>
   <tr>
      <td>saveRow</td> 
      <td>none</td> 
      <td>保存编辑行并发送到服务器。</td>
   </tr>
   <tr>
      <td>cancelRow</td> 
      <td>none</td> 
      <td>取消编辑行。</td>
   </tr>
   <tr>
      <td>destroyRow</td> 
      <td>none</td> 
      <td>销毁当前选择的行。</td>
   </tr>
</table>  

## Editable DataGrid常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onAdd</td><td>index,row</td><td>在添加新行的时候触发。</td>
   </tr>
   <tr>
      <td>onEdit</td><td>index,row</td><td>在编辑一行数据的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeSave</td><td>index</td><td>在保存一行记录之前触发，返回false可以取消保存操作。</td>
   </tr>
   <tr>
      <td>onSave</td><td>index, row</td><td>在保存一行记录时触发。</td>
   </tr>
   <tr>
      <td>onDestroy</td><td>index, row</td><td>在销毁一样记录时触发。</td>
   </tr>
   <tr>
      <td>onError</td><td>index,row</td><td>在在服务器返回错误的时候触发。</td>
   </tr>
</table> 


## 使用可编辑数据表格实现CRUD

### HTML代码：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<h1>DataGrid</h1>
	<table id="tt" style="width:1200px;height:450px">
		<thead>
			<tr>
				<th field="ck" checkbox="true"></th>
				<th data-options="field:'itemId',sortable:true" width="80" editor="{type:'validatebox',options:{required:true}}">Item ID</th>
				<th data-options="field:'productId'" width="60" editor="{type:'validatebox',options:{required:true}}">Product ID</th>
				<th data-options="field:'listPrice'" width="60" align="right" editor="{type:'numberbox',options:{min:0,precision:1}}">List Price</th>
				<th data-options="field:'unitCost'" width="60" align="right" editor="{type:'numberbox',options:{min:0,precision:0}}">Unit Cost</th>
				<th data-options="field:'attr1'" width="150" editor="{type:'validatebox',options:{required:true}}">Attribute</th>
				<th data-options="field:'status'" width="60" align="center">Stauts</th>
				<th data-options="field:'productName'" width="60" align="center" editor="{type:'validatebox',options:{required:true}}">Product Name</th>
				<th data-options="field:'productStartDate',formatter:formatDate" width="80" align="center" editor="{type:'datebox',options:{required:true}}">Product Start Date</th>
			</tr>
		</thead>
	</table>
	<div id="tb">
		<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="javascript:$('#tt').edatagrid('addRow');">AddRow</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editing();">Edit</a> 
		<a href="#" class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="javascript:$('#tt').edatagrid('saveRow');">SaveRow</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-undo" plain="true" onclick="javascript:$('#tt').edatagrid('cancelRow');">CancelRow</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="javascript:$('#tt').edatagrid('destroyRow');">destroyRow</a>
	</div>
</div>
```  


### JS代码：

```
$(function(){
	$("#tt").edatagrid({
		url:'../dist/data/datagrid_data.json',
		title:'Load Data',//标题
		idField:'id',
		iconCls:'icon-save',//标题左边的图标
		fitColumns:true,//固定列
		rownumbers:true,//显示行号
		showFooter:true,//显示行脚
		pagination:true,
		toolbar:'#tb',//定义工具栏
		singleSelect:true,
		onHeaderContextMenu: function(e, field){ //设置语境菜单   可以动态控制显示那些列不显示那些列
			e.preventDefault();
			if (!cmenu){
				createColumnMenu();
			}
			cmenu.menu('show', {
				left:e.pageX,
				top:e.pageY
			});
		}
	});
});
/**
	语境菜单开始
*/
var cmenu;
function createColumnMenu(){
	cmenu = $('<div/>').appendTo('body');
	cmenu.menu({
		onClick: function(item){
			if (item.iconCls == 'icon-ok'){
				$('#tt').datagrid('hideColumn', item.name);
				cmenu.menu('setIcon', {
					target: item.target,
					iconCls: 'icon-empty'
				});
			} else {
				$('#tt').datagrid('showColumn', item.name);
				cmenu.menu('setIcon', {
					target: item.target,
					iconCls: 'icon-ok'
				});
			}
		}
	});
	var fields = $('#tt').datagrid('getColumnFields');
	for(var i=0; i<fields.length; i++){
		var field = fields[i];
		var col = $('#tt').datagrid('getColumnOption', field);
		cmenu.menu('appendItem', {
			text: col.title,
			name: field,
			iconCls: 'icon-ok'
		});
	}
}
/**
	语境菜单结束
*/

function editing(){
	var row = $('#tt').datagrid('getSelected');
	if (row){
		/*
			默认情况下row.productStartDate是毫秒值，而修改的时候需要2011/11/11这样的字符串，所以在此转换
		*/
		var date = new Date(row.productStartDate);
		row.productStartDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
		var index = $("#tt").edatagrid("getRowIndex",row);
		$('#tt').edatagrid('editRow',index);
	}
}

function formatDate(val,row){
	if(val){
		var date = new Date(val);
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'年'+(m<10?('0'+m):m)+'月'+(d<10?('0'+d):d)+"日";
	}
	return "";
}
```

效果如下：

![](/public/img/easyui-zq/31.2.png)

*图31-02*

![](/public/img/easyui-zq/31.3.png)

*图31-03*

![](/public/img/easyui-zq/31.4.png)

*图31-04*

Tip:**语境菜单**如上图所示。右键单击某一列的标题，会出现如下菜单，可以动态控制显示哪些列。

**参考代码:[31/datagrid05.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/31/datagrid05.html)**

综上所述，便是使用可编辑数据表格实现CRUD。