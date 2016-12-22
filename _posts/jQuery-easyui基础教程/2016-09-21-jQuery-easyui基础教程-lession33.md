---
layout: post  
title: 创建 RSS Feed 阅读器  
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 创建 RSS Feed 阅读器  


# 代码实现

## HTML代码：

```
<body class="easyui-layout">
	<div region="north" border="false" class="rtitle">jQuery EasyUI
		RSS Reader Demo</div>
	<div region="west" title="Channels Tree" split="true" border="false"
		style="width:200px;background:#EAFDFF;">
		<ul id="t-channels" url="../dist/data/category_tree.json"></ul>
	</div>
	<div region="center" border="false">
		<div class="easyui-layout" fit="true">
			<div region="north" split="true" border="false" style="height:200px">
				<table id="dg" border="false" rownumbers="true"
					fit="true" class="easyui-datagrid" fitColumns="true" singleSelect="true">
					<thead>
						<tr>
							<th field="id" width="100">Id</th>
							<th field="title" width="100">Title</th>
							<th field="description" width="200">Description</th>
							<th field="publishDate" width="80">Publish Date</th>
						</tr>
					</thead>
				</table>
			</div>
			<div region="center" border="false" style="overflow:hidden">
				<iframe id="cc" scrolling="auto" frameborder="0"
					style="width:100%;height:100%"></iframe>
			</div>
		</div>
	</div>
</body>
```  


## JS代码：

```
$(function() {
	$('#dg').datagrid({
		onSelect: function(index,row){
			$('#cc').attr('src', "../dist/image/shirt"+(row.id % 11)+".gif");
		},
		onLoadSuccess:function(){
			var rows = $(this).datagrid('getRows');
			if (rows.length){
				$(this).datagrid('selectRow',0);
			}else{
				$('#cc').removeAttr('src');
			}
		}
	});

	$('#t-channels').tree({
		onSelect: function(node){
			var id = node.id;
			$('#dg').datagrid({
				url: "../dist/data/book_category"+(id<10?("0"+id):id)+".json"
			});
		},
		onLoadSuccess:function(node,data){
			if (data.length){
				var id = data[0].children[0].children[0].id;
				var n = $(this).tree('find', id);
				$(this).tree('select', n.target);
			}
		}
	});
});
```

效果如下：

![](/public/img/easyui-zq/33.1.png)

*图33-01*

**参考代码:[33/datagrid12.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/33/datagrid12.html)**

综上所述，便是创建 RSS Feed 阅读器。