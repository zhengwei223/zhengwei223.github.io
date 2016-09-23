---
layout: post  
title: 利用DataGrid和Dialog实现CRUD    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 利用DataGrid和Dialog实现CRUD  


# 代码实现

## HTML代码：

```
<div style="position:relative;margin-top:60px;margin-left:100px;">
	<h1>DataGrid</h1>
	<table id="tt" style="width:1000px;height:450px">
		<thead>
			<tr>
				<th field="ck" checkbox="true"></th>
				<th data-options="field:'itemId',sortable:true" width="80">Item ID</th>
				<th data-options="field:'productId'" width="80">Product ID</th>
				<th data-options="field:'listPrice'" width="80" align="right">List Price</th>
				<th data-options="field:'unitCost'" width="80" align="right">Unit Cost</th>
				<th data-options="field:'attr1'" width="150">Attribute</th>
				<th data-options="field:'status'" width="60" align="center">Stauts</th>
				<th data-options="field:'productStartDate',formatter:formatDate" width="80" align="center">Product Start Date</th>
			</tr>
		</thead>
	</table>
	<div id="tb">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="newProduct()">New Product</a> 
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true" onclick="editProduct()">Edit Product</a> 
		<a href="#"	class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="destroyProduct()">Remove Product</a>
	</div>
	<div id="dlg-buttons">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'"	onclick="saveOrUpdateProduct()">Save</a> 
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="javascript:$('#dlg').dialog('close')">Cancel</a>
	</div>

	<div id="dlg" class="easyui-dialog"	style="width:400px;height:280px;padding:10px 20px" data-options="closed:true,buttons:'#dlg-buttons'">
		<div class="ftitle">Product Information</div>
		<form id="fm" method="post">
			<div>
				<label>Item ID:</label> 
				<input name="itemId" class="easyui-validatebox" data-options="required:true"/>
			</div>
			<div>
				<label>Product ID:</label> 
				<input name="productId" class="easyui-validatebox" data-options="required:true"/>
			</div>
			<div>
				<label>List Price:</label> 
				<input name="listPrice" class="easyui-numberbox"  data-options="min:0,precision:1"/>  
			</div>
			<div>
				<label>Unit Cost:</label> 
				<input name="unitCost" class="easyui-numberbox"  data-options="min:0,precision:0"/>  
			</div>
			<div>
				<label>Attr1:</label> 
				<input name="attr1" class="easyui-validatebox" data-options="required:true"/>
			</div>
			<div>
				<label>Status:</label>
				<input name="Status" id="input" class="easyui-switchbutton" data-options="onText:'P',offText:'F'">
			</div>
			<div>
				<label>Product Name:</label> 
				<input name="productName" class="easyui-validatebox" data-options="required:true"/>
			</div>
			<div>
				<label>Product Start Date:</label> 
				<input name="productStartDate" class= "easyui-datebox" data-options="required:true,editable:false"/>   
			</div>
		</form>
	</div>
</div>
```  


## JS代码：

```
//定义当前是添加还是修改模式
editable = false;
$(function(){
	$("#tt").datagrid({
		url:'../dist/data/datagrid_data.json',
		title:'Load Data',//标题
		iconCls:'icon-save',//标题左边的图标
		fitColumns:true,//固定列
		rownumbers:true,//显示行号
		showFooter:true,//显示行脚
		pagination:true,//没有真正实现分页  需要结合后台代码实现
		toolbar:'#tb',//定义工具栏   没有真正实现过滤   需要结合后台代码实现
		singleSelect:true
	});
});
function newProduct() {
	$('#dlg').dialog('open').dialog('setTitle', 'New Product');
	$('#fm').form('clear');
}
function saveOrUpdateProduct(){
	if(editable){
		//修改
		var index = $("#tt").datagrid("getRowIndex",$('#tt').datagrid('getSelected'));
		$('#tt').datagrid('updateRow',{
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
		editable = false;
	}else{
		//添加
	    $('#tt').datagrid('appendRow',{
			itemId:$("input[name='itemId']").val(),
			productId:$("input[name='productId']").val(),
			listPrice:$("input[name='listPrice']").val(),
			unitCost:$("input[name='unitCost']").val(),
			attr1:$("input[name='attr1']").val(),
			status:$("#input").switchbutton("options").checked?'P':'F',
			productStartDate:$("input[name='productStartDate']").val()
		});
	}
	$('#dlg').dialog('close');	
}

function editProduct(){
	editable = true;
	var row = $('#tt').datagrid('getSelected');
	if (row){
		$('#dlg').dialog('open').dialog('setTitle','Edit Product');
		
		/**
			switchbutton需要特殊处理
		*/
		if(row.status == "P"){
			$("#input").switchbutton("check");
		}else{
			$("#input").switchbutton("uncheck");
		}
		
		var date = new Date(row.productStartDate);
		row.productStartDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
		$('#fm').form('load',row);
	}
}
function destroyProduct(){
	var row = $('#tt').datagrid('getSelected');
	if (row){
		$.messager.confirm('提醒','确定要删除这个商品?',function(r){
			if (r){
				var index = $("#tt").datagrid("getRowIndex",row);
				$("#tt").datagrid("deleteRow",index);
			}
		});
	}else{
		$.messager.alert('提醒','请选择要删除的商品！');
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

![image](http://i.imgur.com/OCb7W6T.png)

![image](http://i.imgur.com/wJKNRzw.png)

**参考代码:[30/datagrid04.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/30/datagrid04.html)**

综上所述，便是利用DataGrid和Dialog实现CRUD。