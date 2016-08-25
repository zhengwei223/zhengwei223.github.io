---
layout: post  
title: 创建简单树     
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Tree的使用方法


# Tree

### Tree简介

  
树控件在web页面中一个将分层数据以树形结构进行显示。它提供用户展开、折叠、拖拽、编辑和异步加载等功能。这种控件在web应用中会经常使用到，如菜单，部门的组织结构等。效果如图：

![image](http://i.imgur.com/MVPBRgK.png)

### 开发Tree程序

一个树形菜单（Tree）可以从标记创建。easyui 树形菜单（Tree）也可以定义在 \<ul\> 元素中。无序列表的 \<ul\> 元素提供一个基础的树（Tree）结构。每一个 \<li\> 元素将产生一个树节点，子 \<ul\> 元素将产生一个子树节点。

```
<ul id="tt" class="easyui-tree">
	<li><span>Folder</span>
		<ul>
			<li>
				<span>Sub Folder 1</span>
				<ul>
					<li>
						<span><a href="#">File 11</a></span>
					</li>
					<li><span>File 12</span></li>
					<li><span>File 13</span></li>
				</ul>
			</li>
			<li><span>File 2</span></li>
			<li><span>File 3</span></li>
		</ul></li>
	<li><span>File21</span></li>
</ul>
```  

效果如下图：  

![image](http://i.imgur.com/rxscZhv.png)


**树控件也可以定义在一个空\<ul\>元素中并使用Javascript加载数据。**

``` 
<ul id="tt"></ul>
<script>
	$(function() {
		$("#tt").tree({
			url:'../data/tree_data.json' 
		});
	});
</script>
``` 

json文件内容：

``` 
[{
	"id":0,
	"text":"Foods",
	"children":[{
		"id":1,
		"text":"Fruits",
		"children":[{
			"id":11,
			"checked":"true",
			"text":"apple"
		},{
			"id":12,
			"text":"orange"
		}]
	},{
		"id":2,
		"text":"Vegetables",
		"state":"closed",
		"children":[{
			"id":21,
			"text":"tomato"
		},{
			"id":22,
			"text":"carrot"
		},{
			"id":23,
			"text":"cabbage"
		},{
			"id":24,
			"text":"potato"
		},{
			"id":25,
			"text":"lettuce"
		}]
	}]
}]
``` 

效果如下图：  

![image](http://i.imgur.com/9eGwQTn.png)


###  树控件数据格式化

每个节点都具备以下属性：  

-  id：节点ID，对加载远程数据很重要。
-  text：显示节点文本。
-  state：节点状态，'open' 或 'closed'，默认：'open'。如果为'closed'的时候，将不自动展开该节点。
-  checked：表示该节点是否被选中。
-  attributes: 被添加到节点的自定义属性。
-  children: 一个节点数组声明了若干节点。
-  iconCls:节点前显示的图标。


###  创建异步树形菜单

树控件内建异步加载模式的支持，用户先创建一个空的树，然后指定一个服务器端，执行检索后动态返回JSON数据来填充树并完成异步请求。  

树控件读取URL。子节点的加载依赖于父节点的状态。当展开一个封闭的节点，如果节点没有加载子节点，它将会把节点id的值作为http请求参数并命名为'id'，通过URL发送到服务器上面检索子节点。  

**为了创建异步的树形菜单，每一个树节点必须要有一个'id'属性，这个将提交回服务器去检索子节点数据。**

HTML代码：

```
<ul id="tt"></ul>

<script>
	$(function() {
		$("#tt").tree({
			url:'/easyUI/getRootCategory' 
		});
	});
</script>
```

服务器端代码：  

**采用的是Spring+SpringMVC+Mybatis技术，Oracle数据库**

```
/**
 * 因为tree要求的字符串比json多一个[],所以不能使用@ResponseBody将root对象直接返回去。
 */
@RequestMapping(value = "/getRootCategory")
public String getRootCategory(HttpServletResponse response) throws IOException{
	Category root = categoryService.getRootCategory();
	
	//将root对象拼接成需要的字符串格式，然后通过response的流返回去
	String message = "[" + JSONObject.fromObject(root).toString() +"]";
	PrintWriter writer = response.getWriter();
	writer.print(message);
	writer.flush();
	
	return null;
}
```


下面是从服务器端返回的数据。

```
[{
	"books":[],
	"children":[{
		"books":[],
		"children":[{
			"books":[],
			"children":[],
			"iconCls":"icon-rss",
			"id":6,
			"parent":null,
			"text":"BBC News"
		},
		...
		],
	  "iconCls":"icon-feed",
	  "id":2,
	  "parent":null,
	  "text":"Business"
	 },
	 ...
	 ],
	 "iconCls":"icon-channels",
	 "id":1,
	 "parent":null,
	 "text":"Channels"
}]
```

效果如下图：
  
![image](http://i.imgur.com/d7sgw4A.png)

**tree需要的json格式的字符串必须使用双引号。如果换成单引号是不能正常显示的。**


### Tree常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>url</td>
	  <td>string</td>
	  <td>检索远程数据的URL地址。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>method</td>
	  <td>string</td>
	  <td>检索数据的HTTP方法。（POST / GET）</td>
	  <td>post</td>
   </tr>
   <tr>
      <td>animate</td>
	  <td>boolean</td>
	  <td>定义节点在展开或折叠的时候是否显示动画效果。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>checkbox</td>
	  <td>boolean</td>
	  <td>定义是否在每一个借点之前都显示复选框。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>cascadeCheck</td>
	  <td>boolean</td>
	  <td>定义是否层叠选中状态。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>onlyLeafCheck</td>
	  <td>boolean</td>
	  <td>定义是否只在末级节点之前显示复选框。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>lines</td>
	  <td>boolean</td>
	  <td>定义是否显示树控件上的虚线。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>dnd</td>
	  <td>boolean</td>
	  <td>定义是否启用拖拽功能。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>formatter</td>
	  <td>function(node)</td>
	  <td>定义如何渲染节点的文本。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>loader</td>
	  <td>function(param,success,error)</td>
	  <td>定义如何从远程服务器加载数据。</td>
	  <td>json loader</td>
   </tr>
   <tr>
      <td>loadFilter</td>
	  <td>function(data,parent)</td>
	  <td>返回过滤过的数据进行展示。</td>
	  <td></td>
   </tr>
</table>


### Tree常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回树控件属性。</td>
   </tr>
   <tr>
      <td>loadData</td> 
      <td>data</td> 
      <td>读取树控件数据。</td>
   </tr>
   <tr>
      <td>getNode</td> 
      <td>target</td> 
      <td>获取指定节点对象。</td>
   </tr>
   <tr>
      <td>getData</td> 
      <td>target</td> 
      <td>获取指定节点数据，包含它的子节点。</td>
   </tr>
   <tr>
      <td>reload</td> 
      <td>target</td> 
      <td>重新载入树控件数据。</td>
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
      <td>target</td> 
      <td>获取父节点，'target'参数代表节点的DOM对象。</td>
   </tr> 
   <tr>
      <td>getChildren</td> 
      <td>target</td> 
      <td>获取所有子节点，'target'参数代表节点的DOM对象。</td>
   </tr> 
   <tr>
      <td>getChecked</td> 
      <td>state</td> 
      <td>获取所有选中的节点。</td>
   </tr> 
   <tr>
      <td>getSelected</td> 
      <td>none</td> 
      <td>获取选择节点并返回它，如果未选择则返回null。</td>
   </tr> 
   <tr>
      <td>isLeaf</td> 
      <td>target</td> 
      <td>判断指定的节点是否是叶子节点，target参数是一个节点DOM对象。</td>
   </tr> 
   <tr>
      <td>find</td> 
      <td>id</td> 
      <td>查找指定节点并返回节点对象。</td>
   </tr> 
   <tr>
      <td>select</td> 
      <td>target</td> 
      <td>选择一个节点，'target'参数表示节点的DOM对象。</td>
   </tr> 
   <tr>
      <td>check</td> 
      <td>target</td> 
      <td>选中指定节点。</td>
   </tr> 
   <tr>
      <td>uncheck</td> 
      <td>target</td> 
      <td>取消选中指定节点。</td>
   </tr> 
   <tr>
      <td>collapse</td> 
      <td>target</td> 
      <td>折叠一个节点，'target'参数表示节点的DOM对象。</td>
   </tr> 
   <tr>
      <td>expand</td> 
      <td>target</td> 
      <td>展开一个节点，'target'参数表示节点的DOM对象。</td>
   </tr>
   <tr>
      <td>collapseAll</td> 
      <td>target</td> 
      <td>折叠所有节点。</td>
   </tr>
   <tr>
      <td>expandAll</td> 
      <td>target</td> 
      <td>展开所有节点。</td>
   </tr>
   <tr>
      <td>expandTo</td> 
      <td>target</td> 
      <td>打开从根节点到指定节点之间的所有节点。</td>
   </tr>
   <tr>
      <td>scrollTo</td> 
      <td>target</td> 
      <td>滚动到指定节点。</td>
   </tr>
   <tr>
      <td>append</td> 
      <td>param</td> 
      <td>追加若干子节点到一个父节点。</td>
   </tr>
   <tr>
      <td>toggle</td> 
      <td>target</td> 
      <td>打开或关闭节点的触发器，target参数是一个节点DOM对象。</td>
   </tr>
   <tr>
      <td>insert</td> 
      <td>param</td> 
      <td>在一个指定节点之前或之后插入节点。</td>
   </tr> 
   <tr>
      <td>remove</td> 
      <td>target</td> 
      <td>移除一个节点和它的子节点，'target'参数是该节点的DOM对象。</td>
   </tr>
   <tr>
      <td>pop</td> 
      <td>target</td> 
      <td>移除一个节点和它的子节点，该方法跟remove方法一样，不同的是它将返回被移除的节点数据。</td>
   </tr>
   <tr>
      <td>update</td> 
      <td>param</td> 
      <td>更新指定节点。</td>
   </tr>
   <tr>
      <td>enableDnd</td> 
      <td>none</td> 
      <td>启用拖拽功能。</td>
   </tr>
   <tr>
      <td>disableDnd</td> 
      <td>none</td> 
      <td>禁用拖拽功能。</td>
   </tr>
   <tr>
      <td>beginEdit</td> 
      <td>target</td> 
      <td>开始编辑一个节点。</td>
   </tr>
   <tr>
      <td>endEdit</td> 
      <td>target</td> 
      <td>结束编辑一个节点。</td>
   </tr>
   <tr>
      <td>cancelEdit</td> 
      <td>target</td> 
      <td>取消编辑一个节点。</td>
   </tr> 
</table>  


### Tree常用事件  

很多事件的回调函数都包含'node'参数，其具备如下属性：

- id：绑定节点的标识值。
- text：显示的节点文本。
- iconCls：显示的节点图标CSS类ID。
- checked：该节点是否被选中。
- state：节点状态，'open' 或 'closed'。
- attributes：绑定该节点的自定义属性。
- target：目标DOM对象。

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onClick</td> 
      <td>node</td> 
      <td>在用户点击一个节点的时候触发。</td>
   </tr>
   <tr>
      <td>onDblClick</td> 
      <td>node</td> 
      <td>在用户双击一个节点的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeLoad</td> 
      <td>node，param</td> 
      <td>在请求加载远程数据之前触发，返回false可以取消加载操作。</td>
   </tr>
   <tr>
      <td>onLoadSuccess</td> 
      <td>node,data</td> 
      <td>在数据加载成功以后触发。</td>
   </tr>
   <tr>
      <td>onLoadError</td> 
      <td>arguments</td> 
      <td>在数据加载失败的时候触发，arguments参数和jQuery的$.ajax()函数里面的'error'回调函数的参数相同。</td>
   </tr>
   <tr>
      <td>onBeforeExpand</td> 
      <td>node</td> 
      <td>在节点展开之前触发，返回false可以取消展开操作。</td>
   </tr>
   <tr>
      <td>onExpand</td> 
      <td>node</td> 
      <td>在节点展开的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeCollapse</td> 
      <td>node</td> 
      <td>在节点折叠之前触发，返回false可以取消折叠操作。</td>
   </tr>
   <tr>
      <td>onBeforeCheck</td> 
      <td>node,checked</td> 
      <td>在用户点击勾选复选框之前触发，返回false可以取消选择动作。</td>
   </tr>
   <tr>
      <td>onCheck</td> 
      <td>node,checked</td> 
      <td>在用户点击勾选复选框的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeSelect</td> 
      <td>node</td> 
      <td>在用户选择一个节点之前触发，返回false可以取消选择动作。</td>
   </tr>
   <tr>
      <td>onSelect</td> 
      <td>node</td> 
      <td>在用户选择节点的时候触发。</td>
   </tr>
   <tr>
      <td>onContextMenu</td> 
      <td>e,node</td> 
      <td>在右键点击节点的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeDrag</td> 
      <td>node</td> 
      <td>在开始拖动节点之前触发，返回false可以拒绝拖动。</td>
   </tr>
   <tr>
      <td>onStartDrag</td> 
      <td>node</td> 
      <td>在开始拖动节点的时候触发。</td>
   </tr>
   <tr>
      <td>onStopDrag</td> 
      <td>node</td> 
      <td>在停止拖动节点的时候触发。</td>
   </tr>
   <tr>
      <td>onDragEnter</td> 
      <td>target, source</td> 
      <td>在拖动一个节点进入到某个目标节点并释放的时候触发，返回false可以拒绝拖动。</td>
   </tr>
   <tr>
      <td>onDragOver</td> 
      <td>target, source</td> 
      <td>在拖动一个节点经过某个目标节点并释放的时候触发。</td>
   </tr>
   <tr>
      <td>onDragLeave</td> 
      <td>target, source</td> 
      <td>在拖动一个节点离开某个目标节点并释放的时候触发。</td>
   </tr>
   <tr>
      <td>onBeforeDrop</td> 
      <td>target, source, point</td> 
      <td>在拖动一个节点之前触发，返回false可以拒绝拖动。</td>
   </tr>
   <tr>
      <td>onDrop</td> 
      <td>target, source, point</td> 
      <td>当节点位置被拖动时触发。</td>
   </tr>
   <tr>
      <td>onBeforeEdit</td> 
      <td>node</td> 
      <td>在编辑节点之前触发。</td>
   </tr>
   <tr>
      <td>onAfterEdit</td> 
      <td>node</td> 
      <td>在编辑节点之后触发。</td>
   </tr>   
   <tr>
      <td>onCancelEdit</td> 
      <td>node</td> 
      <td>在取消编辑操作的时候触发。</td>
   </tr>
</table>  

代码如下：

HTML代码：

```
<ul id="tt"></ul>
<!--  右键菜单定义如下： -->
<div id="mm" class="easyui-menu" style="width:120px;">
	<div onclick="append()" data-options="iconCls:'icon-add'">追加</div>
	<div onclick="remove()" data-options="iconCls:'icon-remove'">移除</div>
</div>

<input type="button" onclick="getRoot();" value="得到根节点"/><br/>
<input type="button" onclick="getCheck();" value="得到选中节点"/><br/>
<input type="button" onclick="getSelect();" value="获取选择节点并返回它"/><br/>
<input type="button" onclick="removeNode();" value="删除orange节点"/><br/>
<input type="button" onclick="appendNode();" value="添加orange节点"/><br/>
```

JS代码：

```
<script>
	$(function() {
		$("#tt").tree({
			animate:true,
			checkbox:true,
			cascadeCheck:false,
			onlyLeafCheck:true,
			lines:true,
			onContextMenu: function(e, node){
				e.preventDefault();
				// 查找节点
				$('#tt').tree('select', node.target);
				// 显示快捷菜单
				$('#mm').menu('show', {
					left: e.pageX,
					top: e.pageY
				});
			},			
			url:'../data/tree_data.json' 
		});
	});
	
	function getRoot(){
		var root = $('#tt').tree('getRoot');
		alert(root.text);
	}
	
	function getSelect(){
		var node = $('#tt').tree('getSelected');
		if(node == null){
			alert(node);
			return;
		}
		alert(node.text);
	}
	
	function getCheck(){
		var nodes = $('#tt').tree('getChecked');
		if(nodes == null){
			return;
		}
		for(var index = 0; index < nodes.length;index++){
			alert(nodes[index].text);
		}
	}
	
	function removeNode(){
		var node = $('#tt').tree('find', 12);
		$('#tt').tree('remove',node.target);
	}
	
	function appendNode(){
	    var parent = $('#tt').tree('find', 1);
		$('#tt').tree('append', {
			parent: parent.target,
			data: [{
				id: 12,
				text: 'orange'
			},{
				text: 'like',
				state: 'closed',
				children: [{
					text: 'banana'
				},{
					text: 'grape'
				}]
			}]
		});
	}
</script>
```
效果如下图：

![image](http://i.imgur.com/A1krHJD.png)


### 树形菜单拖放控制

当在一个应用中使用树（Tree）插件，拖拽（drag）和放置（drop）功能要求允许用户改变节点位置。启用拖拽（drag）和放置（drop）操作，所有您需要做的就是把树（Tree）插件的 'dnd' 属性设置为 true。

```
$("#tt").tree({
	dnd: true,
	url:'/easyUI/getRootCategory'
});
```

当在一个树节点上发生放置操作，'onDrop' 事件将被触发，您应该做一些或更多的操作，例如保存节点状态到远程服务器端，等等。

```
onDrop: function(targetNode, source, point){
	var parentId = $("#tt").tree('getNode', targetNode).id;
	$.ajax({
    	url: '/easyUI/updateCategory',
    	type: 'post',
    	dataType: 'json',
    	data: {
    	    id: source.id,
    	    parentId: parentId
    	}
	});
 } 
```

以上便是Tree的基本用法。





