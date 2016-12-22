---
layout: post  
title: DataGrid View（数据表格展示）  
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 灵活运用DataGrid View


# DataGrid View

## DataGrid View简介

可以在```<table>```内直接展开行明细进行编辑的控件，扩展自```<datagrid>```。  

访问[EasyUI官网](http://www.jeasyui.com/extension/downloads/jquery-easyui-datagridview.zip)下载。效果如下图：

![](/public/img/easyui-zq/32.1.png)

*图32-01*

# DataGrid DetailView（数据表格详细展示）

## 常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>detailFormatter</td>
	  <td>function(index,row)</td>
	  <td>detailFormatter函数返回行详细内容。</td>
	  <td></td>
   </tr>
</table>  


## 常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">名称</th> 
      <th width="300px">参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>fixDetailRowHeight</td> 
      <td>index</td> 
      <td>修复明细行高度。</td>
   </tr>
   <tr>
      <td>getExpander</td> 
      <td>index</td> 
      <td>获取行展开对象。</td>
   </tr>
   <tr>
      <td>getRowDetail</td> 
      <td>index</td> 
      <td>获取明细内容。</td>
   </tr>
   <tr>
      <td>expandRow</td> 
      <td>index</td> 
      <td>展开一行。</td>
   </tr>
   <tr>
      <td>collapseRow</td> 
      <td>index</td> 
      <td>折叠一行。</td>
   </tr>
   <tr>
      <td>getParentGrid</td> 
      <td>none</td> 
      <td>获取父datagrid对象。</td>
   </tr>
   <tr>
      <td>getParentRowIndex</td> 
      <td>none</td> 
      <td>获取父行索引。</td>
   </tr>
</table>  

## 常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onExpandRow</td><td>index,row</td><td>在展开行的时候触发。</td>
   </tr>
   <tr>
      <td>onCollapseRow</td><td>index,row</td><td>在折叠行的时候触发。</td>
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


## 案例：

引入datagrid-detailview.js文件。

代码如下：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<table id="tt"></table> 
</div>

$('#tt').datagrid({ 
	title:'DataGrid - DetailView', 
	width:700, 
	height:400, 
	remoteSort:false, 
	singleSelect:true, 
	nowrap:false, 
	fitColumns:true, 
	url:'../dist/data/datagrid_data.json', 
	columns:[[ 
		{field:'itemId',title:'Item ID',width:80}, 
		{field:'productId',title:'Product ID',width:100,sortable:true}, 
		{field:'listPrice',title:'List Price',width:80,align:'right',sortable:true}, 
		{field:'unitCost',title:'Unit Cost',width:80,align:'right',sortable:true}, 
		{field:'attr1',title:'Attribute',width:150,sortable:true}, 
		{field:'status',title:'Status',width:60,align:'center'} 
	]], 
	view: detailview, 
	detailFormatter: function(rowIndex, rowData){ 
	return '<table><tr>' + 
	'<td rowspan=2 style="border:0"><img src="../dist/image/shirt' + (rowData.id%11) + '.gif" style="height:50px;"></td>' + 
	'<td style="border:0">' + 
	'<p>Attribute: ' + rowData.attr1 + '</p>' + 
	'<p>Status: ' + rowData.status + '</p>' + 
	'</td>' + 
	'</tr></table>'; 
	} 
});
```  

效果如下图：

![](/public/img/easyui-zq/32.2.png)

*图32-02*

**参考代码:[32/datagrid06.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/32/datagrid06.html)**


# DataGrid GroupView（数据表格分组展示）

## 常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>groupField</td>
	  <td>string</td>
	  <td>声明哪些字段分组。</td>
	  <td></td>
   </tr>
   <tr>
      <td>groupFormatter</td>
	  <td>function(value,rows)</td>
	  <td>groupFormatter函数返回分组内容。</td>
	  <td></td>
   </tr>
   <tr>
      <td>groupStyler</td>
	  <td>function(value,rows)</td>
	  <td>函数返回CSS样式组。</td>
	  <td></td>
   </tr>
</table>  


## 常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">名称</th> 
      <th width="300px">参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>expandGroup</td> 
      <td>groupIndex</td> 
      <td>展开一个分组。</td>
   </tr>
   <tr>
      <td>collapseGroup</td> 
      <td>groupIndex</td> 
      <td>折叠一个分组。</td>
   </tr>
   <tr>
      <td>scrollToGroup</td> 
      <td>groupIndex</td> 
      <td>滚动一个分组。</td>
   </tr>
</table>  


## 案例：

引入datagrid-groupview.js文件。

代码如下：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<table id="tt"></table> 
</div>

$('#tt').datagrid({ 
	title:'DataGrid - GroupView', 
	width:700, 
	height:250, 
	rownumbers:true, 
	remoteSort:false, 
	nowrap:false, 
	fitColumns:true, 
	url:'../dist/data/datagrid_data.json', 
	columns:[[ 
		{field:'productId',title:'Product ID',width:100,sortable:true}, 
		{field:'listPrice',title:'List Price',width:80,align:'right',sortable:true}, 
		{field:'unitCost',title:'Unit Cost',width:80,align:'right',sortable:true}, 
		{field:'attr1',title:'Attribute',width:150,sortable:true}, 
		{field:'status',title:'Status',width:60,align:'center'} 
	]], 
	groupField:'productId', 
	view: groupview, 
	groupFormatter:function(value, rows){ 
		return value + ' - ' + rows.length + ' Item(s)'; 
	} 
});
```  

效果如下图：

![](/public/img/easyui-zq/32.3.png)

*图32-03*

**参考代码:[32/datagrid07.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/32/datagrid07.html)**


# DataGrid BufferView（数据表格缓存视图）

## 案例：
引入datagrid-bufferview.js文件。

代码如下：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<table id="tt" class="easyui-datagrid" style="width:900px;height:250px" 
		title="DataGrid - BufferView" 
		data-options="url:'../dist/data/datagrid_data.json',fitColumns:true,view:bufferview,rownumbers:true,singleSelect:true,autoRowHeight:false,pageSize:10"> 
		<thead> 
			<tr> 
				<th data-options="field:'itemId',sortable:true" width="80" >Item ID</th>
				<th data-options="field:'productId'" width="60">Product ID</th>
				<th data-options="field:'listPrice'" width="60" align="right">List Price</th>
				<th data-options="field:'unitCost'" width="60" align="right">Unit Cost</th>
				<th data-options="field:'attr1'" width="150">Attribute</th>
				<th data-options="field:'status'" width="60" align="center">Stauts</th>
				<th data-options="field:'productName'" width="60" align="center">Product Name</th>
				<th data-options="field:'productStartDate'" width="80" align="center">Product Start Date</th>
			</tr>
		</thead> 
	</table>
</div>
``` 
 
**参考代码:[32/datagrid08.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/32/datagrid08.html)**


# DataGrid VirtualScrollView（显示海量数据）

## 常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">名称</th> 
      <th width="300px">参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>gotoPage</td> 
      <td>page</td> 
      <td>跳转到指定页面。</td>
   </tr>
   <tr>
      <td>scrollTo</td> 
      <td>index</td> 
      <td>滚动视图到指定的行。</td>
   </tr>
   <tr>
      <td>fixDetailRowHeight</td> 
      <td>index</td> 
      <td>固定明细行行高。</td>
   </tr>
   <tr>
      <td>getExpander</td> 
      <td>index</td> 
      <td>获取展开对象。</td>
   </tr>
   <tr>
      <td>getRowDetail</td> 
      <td>index</td> 
      <td>获取明细内容。</td>
   </tr>
   <tr>
      <td>expandRow</td> 
      <td>index</td> 
      <td>展开一行。</td>
   </tr>
   <tr>
      <td>collapseRow</td> 
      <td>index</td> 
      <td>折叠一行。</td>
   </tr>
</table>  


## 案例一：

引入datagrid-scrollview.js文件。

代码如下：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<table id="tt" class="easyui-datagrid" style="width:900px;height:250px" 
	title="DataGrid - VirtualScrollView" 
	data-options="fitColumns:true,view:scrollview,rownumbers:true,singleSelect:true,autoRowHeight:false,pageSize:50"> 
		<thead> 
			<tr> 
				<th data-options="field:'itemId',sortable:true" width="80" >Item ID</th>
				<th data-options="field:'productId'" width="60">Product ID</th>
				<th data-options="field:'listPrice'" width="60" align="right">List Price</th>
				<th data-options="field:'unitCost'" width="60" align="right">Unit Cost</th>
				<th data-options="field:'attr1'" width="90">Attribute</th>
				<th data-options="field:'status'" width="60" align="center">Stauts</th>
				<th data-options="field:'productName'" width="60" align="center">Product Name</th>
				<th data-options="field:'productStartDate'" width="80" align="center">Product Start Date</th>
			</tr>
		</thead> 
	</table>
</div>

$(function(){
	var rows = [];
	for(var i=1; i<=8000; i++){
		var unitCost = Math.floor(Math.random()*1000);
		var price = Math.floor(Math.random()*1000);
		rows.push({
			itemId:'EST-'+i,
			productId:'FI-SW-'+(i < 10?'000'+i:(i<100?'00'+i:(i<1000)?'0'+i:i)),
			listPrice:price,
			unitCost:unitCost,
			attr1:'attr'+i,
			status:'P',
			productName:'product_'+(i < 10?'000'+i:(i<100?'00'+i:(i<1000)?'0'+i:i)),
			productStartDate:'2011-11-11'
		});
	}
	$('#tt').datagrid('loadData', rows);
});
```  

**参考代码:[32/datagrid09.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/32/datagrid09.html)**

## 案例二：

引入datagrid-scrollview.js文件。

代码如下：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<table id="tt" class="easyui-datagrid" style="width:900px;height:250px" 
	title="DataGrid - VirtualScrollView with Detail Rows"
	data-options="fitColumns:true,view:scrollview,rownumbers:true,singleSelect:true,autoRowHeight:false,pageSize:50"> 
		<thead> 
			<tr> 
				<th data-options="field:'itemId',sortable:true" width="80" >Item ID</th>
				<th data-options="field:'productId'" width="60">Product ID</th>
				<th data-options="field:'listPrice'" width="60" align="right">List Price</th>
				<th data-options="field:'unitCost'" width="60" align="right">Unit Cost</th>
				<th data-options="field:'attr1'" width="90">Attribute</th>
				<th data-options="field:'status'" width="60" align="center">Stauts</th>
				<th data-options="field:'productName'" width="60" align="center">Product Name</th>
				<th data-options="field:'productStartDate'" width="80" align="center">Product Start Date</th>
			</tr>
		</thead> 
	</table>
</div>

$(function(){
	var rows = [];
	for(var i=1; i<=8000; i++){
		var unitCost = Math.floor(Math.random()*1000);
		var price = Math.floor(Math.random()*1000);
		rows.push({
			itemId:'EST-'+i,
			productId:'FI-SW-'+(i < 10?'000'+i:(i<100?'00'+i:(i<1000)?'0'+i:i)),
			listPrice:price,
			unitCost:unitCost,
			attr1:'attr'+i,
			status:'P',
			productName:'product_'+(i < 10?'000'+i:(i<100?'00'+i:(i<1000)?'0'+i:i)),
			productStartDate:'2011-11-11'
		});
	}
	$('#tt').datagrid({
		detailFormatter: function(rowIndex, rowData){
			return '<table><tr>' +
					'<td style="border:0;padding-right:10px">' +
					'<p>Item Id: ' + rowData.itemId + '</p>' +
					'<p>Product Name: ' + rowData.productName + '</p>' +
					'</td>' +
					'<td style="border:0">' +
					'<p>Product Id: ' + rowData.productId + '</p>' +
					'<p>List Price: ' + rowData.listPrice + '</p>' +
					'</td>' +
					'</tr></table>';
		}
	}).datagrid('loadData', rows);
});
```  

**参考代码:[32/datagrid10.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/32/datagrid10.html)**


#  创建展开行明细编辑表单的 CRUD 应用

### HTML代码：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<table id="dg" style="width:1200px;height:450px">
		<thead>
			<tr>
				<th data-options="field:'itemId',sortable:true" width="80">Item ID</th>
				<th data-options="field:'productId'" width="60">Product ID</th>
				<th data-options="field:'listPrice'" width="60" align="right">List Price</th>
				<th data-options="field:'unitCost'" width="60" align="right">Unit Cost</th>
				<th data-options="field:'attr1'" width="150">Attribute</th>
				<th data-options="field:'status'" width="60" align="center">Stauts</th>
				<th data-options="field:'productName'" width="60" align="center">Product Name</th>
				<th data-options="field:'productStartDate'" width="80" align="center">Product Start Date</th>
			</tr>
		</thead>
	</table>
	<div id="toolbar">
		<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newItem()">New</a> 
		<a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyItem()">Destroy</a>
	</div>
</div>
```  


### JS代码：

```
$(function() {
	$('#dg').datagrid({
		url:'../dist/data/datagrid_data.json',
		title:'Load Data',//标题
		idField:'id',
		toolbar:"#toolbar",
		singleSelect:true,
		iconCls:'icon-save',//标题左边的图标
		fitColumns:true,//固定列
		rownumbers:true,//显示行号
		showFooter:true,//显示行脚
		pagination:true,
		view: detailview,
		detailFormatter:function(index,row){
			return '<div class="ddv"></div>';
		},
		onExpandRow: function(index,row){
			var ddv = $(this).datagrid('getRowDetail',index).find('div.ddv');
			ddv.panel({
				border:false,
				cache:true,
				href:'datagrid_show_form.html?index='+index,
				onLoad:function(){
					$('#dg').datagrid('fixDetailRowHeight',index);
					$('#dg').datagrid('selectRow',index);
					$('#dg').datagrid('getRowDetail',index).find('form').form('load',row);
					/**
						switchbutton需要特殊处理
					*/
					if(row.status == "P"){
						$("#input").switchbutton("check");
					}else{
						$("#input").switchbutton("uncheck");
					}
				}
			});
			$('#dg').datagrid('fixDetailRowHeight',index);
		}
	});
	
});
function destroyItem(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		$.messager.confirm('Confirm','Are you sure you want to remove this user?',function(r){
			if (r){
				var index = $('#dg').datagrid('getRowIndex',row);
				$('#dg').datagrid('deleteRow',index);
			}
		});
	}
}
function newItem(){
	$('#dg').datagrid('appendRow',{isNewRecord:true});
	var index = $('#dg').datagrid('getRows').length - 1;
	$('#dg').datagrid('expandRow', index);
	$('#dg').datagrid('selectRow', index);
}
/**
添加/更新记录
*/
function saveItem(){
	var row = $('#dg').datagrid('getSelected');
	var index = $('#dg').datagrid('getRowIndex',row);
		$('#dg').datagrid('updateRow',{
		index:index,
		row:{
			itemId:$("input[name='itemId']").val(),
			productId:$("input[name='productId']").val(),
			listPrice:$("input[name='listPrice']").val(),
			unitCost:$("input[name='unitCost']").val(),
			attr1:$("input[name='attr1']").val(),
			status:$("#input").switchbutton("options").checked?'P':'F',
			productStartDate:$("input[name='productStartDate']").val()
		}
	});
	$("#dg").datagrid("collapseRow",index);
}
function cancelItem(){
	var row = $('#dg').datagrid('getSelected');
	var index = $("#dg").datagrid('getRowIndex',row);
	if (row.isNewRecord){
		$('#dg').datagrid('deleteRow',index);
	} else {
		$('#dg').datagrid('collapseRow',index);
	}
}
```

效果如下：

![](/public/img/easyui-zq/32.4.png)

*图32-04*

**参考代码:[32/datagrid11.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/32/datagrid11.html)**


综上所述，便是创建展开行明细编辑表单的 CRUD 应用。