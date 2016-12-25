---
layout: post  
title: EasyUI 创建自定义视图  
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- EasyUI 创建自定义视图  


# Card View

在不同的情况下，您可能需要为数据网格（datagrid）运用更灵活的布局。对于用户来说，卡片视图（Card View）是个不错的选择。这个工具可以在数据网格（datagrid）中迅速获取和显示数据。在数据网格（datagrid）的头部，您可以仅仅通过点击列的头部来排序数据。本教程将向您展示如何创建自定义卡片视图（Card View）。

Tip:创建卡片视图从数据网格（datagrid）的默认视图继承，是个创建自定义视图的不错方法。我们将要创建一个卡片视图（Card View）来为每行显示一些信息。

## HTML代码：

```
<h2>DataGrid Card View Demo</h2>
<div class="demo-info" style="margin-bottom:10px">
	<div class="demo-tip icon-tip">&nbsp;</div>
	<div>The datagrid row can be showed as card.</div>
</div>

<table id="tt" style="width:700px;height:350px"
	title="DataGrid - CardView" singleSelect="true" fitColumns="true"
	remoteSort="false" url="../dist/data/datagrid_data.json" pagination="true"
	sortOrder="desc" sortName="itemId">
	<thead>
		<tr>
			<th field="itemId" width="80" sortable="true">Item ID</th>
			<th field="listPrice" width="120" sortable="true">List Price</th>
			<th field="unitCost" width="80" sortable="true">Unit Cost</th>
			<th field="attr1" width="250" sortable="true">Attribute</th>
			<th field="status" width="60" sortable="true">Status</th>
		</tr>
	</thead>
</table>
```  


## JS代码：

```
var cardview = $.extend({},$.fn.datagrid.defaults.view,{
	renderRow : function(target, fields, frozen,
			rowIndex, rowData) {
		var cc = [];
		cc.push('<td colspan=' + fields.length + ' style="padding:10px 5px;border:0;">');
		if (!frozen && rowData['itemId']) {
			var aa = rowData['itemId'].split('-');
			var img = 'shirt' + aa[1] + '.gif';
			cc.push('<img src="../dist/image/' + img + '" style="width:150px;float:left">');
			cc.push('<div style="float:left;margin-left:20px;">');
			for ( var i = 0; i < fields.length; i++) {
				var copts = $(target).datagrid(
						'getColumnOption', fields[i]);
				cc.push('<p><span class="c-label">'
						+ copts.title + ':</span> '
						+ rowData[fields[i]] + '</p>');
			}
			cc.push('</div>');
		}
		cc.push('</td>');
		return cc.join('');
	}
});
$(function() {
	$('#tt').datagrid({
		view : cardview
	});
});
```

效果如下：

![](/public/img/easyui-zq/34.1.png)

*图34-01*

**参考代码:[34/datagrid13.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/34/datagrid13.html)**

综上所述，便是创建自定义视图的基本用法。