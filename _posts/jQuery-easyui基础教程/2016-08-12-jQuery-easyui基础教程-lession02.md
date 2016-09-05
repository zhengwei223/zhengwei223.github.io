---
layout: post  
title: Dialog   
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Dialog的使用
- 学会easyUI的几种实现方式


# Dialog

## Dialog简介

对话框是一种特殊类型的窗口，在现在的系统中使用越来越多。如，添加，修改，删除的提示等功能，使用对话框更加贴近用户的要求，开发人员开发程序也更加简单。它在顶部有一个工具栏，在底部有一个按钮栏。对话框窗口右上角只有一个关闭按钮，用户可以配置对话框的行为来显示其他工具，如collapsible,minimizable,maximizable工具等。默认情况下，对话框（Dialog）不能改变大小，但是用户可以设置resizable属性为true，使其可以改变大小。 效果如下图：

![image](http://i.imgur.com/XmddMrE.png)

## 开发Dialog程序


##### 方式一：使用纯HTML代码

```
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/icon.css">
<script type="text/javascript" src="../dist/js/jquery-1.11.2.js"></script>
<script type="text/javascript" src="../dist/js/easyui/easyloader.js"></script>  

<div id="dd" class="easyui-dialog" title="My Dialog" style="width:400px;height:200px;" data-options="iconCls:'icon-save',resizable:true,modal:true">   
	Dialog Content.   
</div>  
```

**参考代码:```[02/dialog01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/02/dialog01.html)```**  

Tip: Dialog所需的属性可以类似于以上代码放到data-options属性中，此外也可以像HTML属性一样直接跟在开始标签内。 **强烈建议放到data-options属性中。**


##### 方式二：使用JS代码设置

```
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/icon.css">
<script type="text/javascript" src="../dist/js/jquery-1.11.2.js"></script>
<script type="text/javascript" src="../dist/js/easyui/easyloader.js"></script>
<script type="text/javascript">  
	$(function(){ 
		easyloader.load("dialog",function(){ 
			$("#dd").dialog({  
				title: 'My Dialog',     
				width: 400,   
				height: 200,    
				closed: false,    
				modal: true 
			});  
		});  
	});  
</script> 

<div id="dd">  
	Dialog Content.  
</div>  
```

**参考代码:```[02/dialog02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/02/dialog02.html)```**    

此外，也可以不引入easyloader.js文件，引入jquery.easyui.min.js文件。代码如下：

```
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/icon.css">
<script type="text/javascript" src="../dist/js/jquery-1.11.2.js"></script>
<script type="text/javascript" src="../dist/js/easyui/jquery.easyui.min.js"></script> 
<script type="text/javascript"> 
	$(function(){  
		$("#dd").dialog({ 
			title: 'My Dialog',   
			iconCls:'icon-save',  
			width: 400,   
			height: 200,   
			closed: false,
			modal: true 
		}); 
	});  
</script>  

<div id="dd"> 
	Dialog Content. 
</div>  
```

**参考代码:```[02/dialog03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/02/dialog03.html)```**  


## Dialog常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th><th width="180px">属性值类型</th><th width="650px">描述</th><th>默认值</th>
   </tr>
   <tr>
      <td>title</td><td>string</td><td>对话框窗口标题文本</td><td>New Dialog</td>
   </tr>
   <tr>
      <td>closable</td> <td>boolean</td> <td>定义是否显示关闭按钮</td><td>true </td>
   </tr>
   <tr>
      <td>draggable</td> <td>boolean</td> <td>定义是否能够拖拽窗口</td> <td>true </td>
   </tr>
   <tr>
      <td>shadow</td> <td>boolean</td> <td>true表示在窗体显示的时候显示阴影</td> <td>true </td>
   </tr>
   <tr>
      <td>iconCls</td> <td>string</td> <td>设置图标显示在面板左上角</td> <td>null </td>
   </tr>
   <tr>
      <td>width</td> <td>number</td> <td>设置面板宽度</td> <td>auto </td>
   </tr>
   <tr>
      <td>height</td> <td>number</td> <td>设置面板高度</td> <td>auto </td>
   </tr>
   <tr>
      <td>left</td> <td>number</td> <td>设置面板距离左边的位置</td> <td>null </td>
   </tr>
   <tr>
      <td>top</td> <td>number</td> <td>设置面板距离顶部的位置</td> <td>null </td>
   </tr>
   <tr>
      <td>fit</td> <td>boolean</td> <td>面板大小是否自适应父容器</td> <td>false </td>
   </tr>
   <tr>
      <td>border</td> <td>boolean</td> <td>定义是否显示面板边框 </td><td>true </td>
   </tr>
   <tr>
      <td>href</td> <td>string</td> <td>从URL读取远程数据并且显示到面板</td> <td>null </td>
   </tr>
   <tr>
      <td>cache</td> <td>boolean</td> <td>如果为true，在超链接载入时缓存面板内容</td> <td>true </td>
   </tr>
   <tr>
      <td>loadingMessage</td> <td>string</td> <td>在加载远程数据的时候在面板内显示一条消息 </td><td>Loading… </td>
   </tr>
   <tr>
      <td>method</td> <td>string</td> <td>使用HTTP的哪一种方法读取内容页。可用值：'get','post'</td> <td>get </td>
   </tr>
   <tr>
      <td>queryParams</td> <td>object</td> <td>在加载内容页的时候添加的请求参数</td> <td>{} </td>
   </tr>
   <tr>
      <td>loader</td> <td>function</td> <td>定义了如何从远程服务器加载内容页</td> <td>null</td>
   </tr>
   <tr>
      <td>collapsible</td> <td>boolean</td> <td>定义是否显示可折叠按钮</td> <td>false </td>
   </tr>
   <tr>
      <td>minimizable</td> <td>boolean</td> <td>定义是否显示最小化按钮</td> <td>false </td>
   </tr>
   <tr>
      <td>maximizable</td> <td>boolean</td> <td>定义是否显示最大化按钮</td> <td>false </td>
   </tr>
   <tr>
      <td>resizable</td> <td>boolean</td> <td>定义是否可以改变对话框窗口大小</td> <td>false </td>
   </tr>
   <tr>
      <td>toolbar</td> <td>array,selector</td> <td>定义工具栏</td> <td>null</td>
   </tr>
   <tr>
      <td>buttons</td> <td>array,selector</td> <td>定义对话框窗口底部按钮</td> <td>null</td>
   </tr>
</table>

参考jQuery EasyUI的API。

##### 使用案例1：

```
<script type="text/javascript">  
	$(function() {  
		$("#dd").dialog({  
			title : 'First Dialog', //设置标题  
			iconCls : 'icon-ok',//面板左上角显示的图片，定义在themes/icon.css文件中  
			closable : false,//定义是否显示关闭按钮  
			draggable : false,//定义是否能够拖拽窗口  
			width : 400, //定义宽     
			height : 200, //定义高  
			shadow : false, //true表示在窗体显示的时候显示阴影  
			modal : true,//定义是否将窗体显示为模式化窗口  
			left : "150px",//设置面板距离左边的位置  
			top : "50px",//设置面板距离顶部的位置  
			border : true,//定时是否显示面板边框  
			loadingMessage : "正在加载，请稍后...",//在加载远程数据的时候在面板内显示一条消息  
			//href:"https://www.baidu.com",//从URL读取远程数据并且显示到面板  
			method : 'post',//使用HTTP的哪一种方法读取内容页。可用值：'get','post'|get  
			collapsible : true,//定义是否显示可折叠按钮  
			minimizable : true,//定义是否显示最小化按钮  
			maximizable : true,//定义是否显示最大化按钮  
			resizable : true,//定义是否可以改变对话框窗口大小  
			toolbar : [ {  
					text : '编辑',  
					iconCls : 'icon-edit',  
					handler : function() {  
						alert('edit');  
					}  
				}, {  
					text : '帮助',  
					iconCls : 'icon-help',  
					handler : function() {  
						alert('help');  
					}  
				} ],//定义工具栏 
			//toolbar : '#toolbar', //定义工具栏的另外一种方式，将id为toolbar的元素当作工具栏  
			buttons : '#bb'//定义对话框窗口底部按钮  
		});  
	});  
</script>  
<body>  
	<div id="dd">Dialog Content.</div>  
	<!-- <div id="toolbar"> 
	<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true">New User</a>   
	<a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true">Edit User</a>  
	<a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true">Remove User</a>  
	</div>  
	-->  
	<div id="bb">  
	<a href="#" class="easyui-linkbutton">保存</a> 
	<a href="#" class="easyui-linkbutton">关闭</a> 
	</div>  
</body>   
```

**参考代码:```[02/dialog04.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/02/dialog04.html)```**  

效果如下：  

![image](http://i.imgur.com/XB52TZF.png)  


## Dialog常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> <th width="300px">方法参数</th> <th width="600px">描述</th>
   </tr>
   <tr>
      <td>setTitle</td> <td>title</td> <td>设置面板头的标题文本</td>
   </tr>
   <tr>
      <td>open</td> <td>forceOpen</td> <td>在'forceOpen'参数设置为true的时候，打开面板时将跳过'onBeforeOpen'回调函数</td>
   </tr>
   <tr>
      <td>close</td> <td>forceClose</td> <td>在'forceClose'参数设置为true的时候，关闭面板时将跳过'onBeforeClose'回调函数</td>
   </tr>
   <tr>
      <td>refresh</td> <td>href</td> <td>刷新面板来装载远程数据。如果'href'属性有了新配置，它将重写旧的'href'属性。 </td>
   </tr>
</table>  

## Dialog常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onBeforeLoad</td><td>none</td><td>在加载内容页之前触发，返回false将忽略该动作。</td>
   </tr>
   <tr>
      <td>onLoad</td><td>none</td><td>在加载远程数据时触发。 </td>
   </tr>
   <tr>
      <td>onLoadError</td><td>none</td><td>在加载内容页发生错误时触发。 </td>
   </tr>
   <tr>
      <td>onBeforeOpen</td><td>none</td><td>在打开面板之前触发，返回false可以取消打开操作。 </td>
   </tr>
   <tr>
      <td>onOpen</td><td>none</td><td>在打开面板之后触发。 </td>
   </tr>
   <tr>
      <td>onBeforeClose</td><td>none</td><td>在关闭面板之前触发，返回false可以取消关闭操作。下列的面板将不能关闭。</td>
   </tr>
   <tr>
      <td>onClose</td><td>none</td><td>在面板关闭之后触发。</td>
   </tr>
</table> 


##### 使用案例1：

JS代码  

```
<script type="text/javascript">
	$(function() {
		$("#dd").dialog({
			title : 'First Dialog',
			width : 400,    
		 	height : 200,  
			iconCls : 'icon-ok',
			loadingMessage : "正在加载，请稍后...",
			toolbar : '#toolbar',
			buttons : '#bb',
			onBeforeClose:function(){//在关闭面板之前触发，返回false可以取消关闭操作。下列的面板将不能关闭。
				if (!confirm("关闭窗口?"))  {  
					return false;
				} 
			}
		});
	});
	function closeDialog(){
		$('#dd').dialog('close');
	}
	function skip() {
		$('#dd').panel('refresh', '../index.jsp');
	}
</script>
```

HTML代码

```
<div id="dd">Dialog Content.</div>
<div id="toolbar">
	<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true">New User</a> 
	<a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true">Edit User</a> 
	<a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true">Remove User</a>
</div>
<div id="bb">
	<a href="#" class="easyui-linkbutton" onclick="skip();">跳转</a> 
	<a href="#" class="easyui-linkbutton" onclick="closeDialog();">关闭</a>
</div>  
```

**参考代码:```[02/dialog05.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/WebRoot/02/dialog05.html)```**  

Tip: 当点击关闭按钮时会弹出确认框。当点击跳转按钮时对话框中将显示index.jsp页面中的内容。 

 
以上内容便是Dialog的普通用法。