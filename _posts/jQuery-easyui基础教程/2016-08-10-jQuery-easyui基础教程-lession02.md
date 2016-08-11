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

### Dialog简介

对话框是一种特殊类型的窗口，在现在的系统中使用越来越多。如，添加，修改，删除的提示等功能，使用对话框更加贴近用户的要求，开发人员开发程序也更加简单。它在顶部有一个工具栏，在底部有一个按钮栏。对话框窗口右上角只有一个关闭按钮，用户可以配置对话框的行为来显示其他工具，如collapsible,minimizable,maximizable工具等。  

![image](http://i.imgur.com/XmddMrE.png)

### 开发Dialog程序

##### 方式一：使用纯HTML代码

```

    <!DOCTYPE html>   
	 <html>  
		 <head>  
			 <title>dialog01.html</title>   
			 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/default/easyui.css">  
			 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/icon.css">   
			 <script type="text/javascript" src="/easyUI/js/jquery-1.11.2.js"></script>   
			 <script type="text/javascript" src="/easyUI/js/easyui/easyloader.js"></script>   
		 </head>   
		 <body>  
		 	<div id="dd" class="easyui-dialog" title="My Dialog" style="width:400px;height:200px;" data-options="iconCls:'icon-save',resizable:true,modal:true">   
		 		Dialog Content.   
		 	</div>  
		 </body>  
	 </html>  
```

Tip: Dialog所需的属性可以类似于以上代码放到data-options中，此外也可以像HTML属性一样直接跟在开始标签内。

##### 方式二：使用JS代码设置

```

    <!DOCTYPE html>
	 <html>  
	 	<head> 
			 <title>dialog02.html</title>  
			 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/default/easyui.css"> 
			 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/icon.css">  
			 <script type="text/javascript" src="/easyUI/js/jquery-1.11.2.js"></script> 
			 <script type="text/javascript" src="/easyUI/js/easyui/easyloader.js"></script> 
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
		 </head>  
		 <body>  
		 	<div id="dd">  
		 		Dialog Content.  
		 	</div>  
		 </body>  
	 </html> 
```

此外，也可以不引入easyloader.js文件，具体引入dialog.js文件。代码如下：

```

    <!DOCTYPE html>  
	 <html>  
		 <head>  
			 <title>dialog03.html</title>  
			 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/default/easyui.css">  
			 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/icon.css">  
			 <script type="text/javascript" src="/easyUI/js/jquery-1.11.2.js"></script>  
			 <script type="text/javascript" src="/easyUI/js/easyui/jquery.easyui.min.js"></script> 
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
		 </head>  
		 <body>  
		 	<div id="dd"> 
		 		Dialog Content. 
		 	</div>  
		 </body> 
	 </html> 
```

### Dialog常用属性

属性名 |属性值类型|描述|默认值  
----------|-------|-------|----------
title|string|对话框窗口标题文本|New Dialog
closable|boolean|定义是否显示关闭按钮|true 
draggable|boolean|定义是否能够拖拽窗口|true 
shadow|boolean|true表示在窗体显示的时候显示阴影|true 
iconCls|string|设置图标显示在面板左上角|null 
width|number|设置面板宽度|auto 
height|number|设置面板高度|auto 
left|number|设置面板距离左边的位置|null 
top|number|设置面板距离顶部的位置|null 
fit|boolean|面板大小是否自适应父容器|false 
border|boolean|定义是否显示面板边框|true 
href|string|从URL读取远程数据并且显示到面板|null 
cache|boolean|如果为true，在超链接载入时缓存面板内容|true 
loadingMessage|string|在加载远程数据的时候在面板内显示一条消息|Loading… 
method|string|使用HTTP的哪一种方法读取内容页。可用值：'get','post'|get 
queryParams|object|在加载内容页的时候添加的请求参数|{} 
loader|function|定义了如何从远程服务器加载内容页|null
collapsible|boolean|定义是否显示可折叠按钮|false 
minimizable|boolean|定义是否显示最小化按钮|false 
maximizable|boolean|定义是否显示最大化按钮|false 
resizable|boolean|定义是否可以改变对话框窗口大小|false 
toolbar|array,selector|定义工具栏|null
buttons|array,selector|定义对话框窗口底部按钮|null

参考jQuery EasyUI的API。

##### 使用案例1：

```

    <!DOCTYPE html>  
	 <html>  
		 <head>  
		 <title>dialog04.html</title> 
		 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/default/easyui.css">  
		 <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/icon.css"> 
		 <script type="text/javascript" src="/easyUI/js/jquery-1.11.2.js"></script>  
		 <script type="text/javascript" src="/easyUI/js/easyui/jquery.easyui.min.js"></script>  
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
		 			//toolbar : '#toolbar', //定义工具栏  
		 			buttons : '#bb'//定义对话框窗口底部按钮  
		 		});  
		 	});  
		 </script>  
	 </head>  
	 <body>  
	 	<div id="dd">Dialog Content.</div>  
	 	<!-- <div id="toolbar"> 
	 		<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true">New User</a>   
	 		<a href="#"	class="easyui-linkbutton" iconCls="icon-edit" plain="true">Edit User</a>  
	 		<a href="#"	class="easyui-linkbutton" iconCls="icon-remove" plain="true">Remove User</a>  
	 	</div>  
	  	-->  
	 	<div id="bb">  
	 		<a href="#" class="easyui-linkbutton">保存</a> <a href="#"
	 			class="easyui-linkbutton">关闭</a> 
	 	</div>  
	 </body>  
	 </html>  
```

效果如下：  

![image](http://i.imgur.com/XB52TZF.png)


以上内容便是Dialog的普通用法。