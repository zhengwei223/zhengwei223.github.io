---
layout: post  
title: jQuery-EasyUI的基础教程   
category: jQuery-EasyUI
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  主要适用于掌握了jQuery基础语法的

---
# 课程目标

- 了解EasyUI
- 下载EasyUI，并创建简单的应用


#jQuery EasyUI简介

jQuery EasyUI 是一个基于 jQuery 的框架，集成了各种用户界面插件。  

![image](/public/img/easyUI.png) 

![image](/public/img/easyui/easyUI01.png) 

easyUI是一种基于jQuery的用户界面插件集合。

easyUI为创建现代化，互动的JS应用程序，提供必要的功能。

使用easyUI不需要写很多代码，只需要通过编写一些简单的HTML标记，就可以定义用户界面。

easyUI是个完美支持HTML5网页的完整框架。

easyUI能够节省您网页开发的时间和规模。

easyUI很简单但功能很强大。

easyUI框架提供了创建网页所需的一切，帮助您轻松建立站点。本教程将告诉您如何使用easyUI框架创建应用。


#下载jQuery EasyUI

访问easyUI官网下载最新的easyUI源文件：http://www.jeasyui.com/  
![image](/public/img/easyui/official_website.png)  

也可以参考easyUI的中文网：http://www.jeasyui.net/  
![image](/public/img/easyui/official_website_china.png) 

解压后能看到这些文件夹和文件：  
![image](/public/img/easyui/construction.png)

- demo是easyUI官方提供的案例
- local是各种支持的语言包
- plugins是涉及到的js包
- themes是easyUI提供的各种主题  


#jQuery EasyUI入门案例

jQuery EasyUI 提供易于使用的组件，它使 Web 开发人员快速地在流行的 jQuery 核心和 HTML5 上建立程序页面。这些功能使您的应用适合今天的网络。有两个方法声明来创建 UI 组件:

##### 第一步： 新建一个web应用，并引入easyUI的所有包，目录结构如图所示：  
![image](/public/img/easyui/construction01.png)

##### 第二步： page目录下新建一个first.html页面，并引入需要的css样式和js包:

- themes/icon.css 定义了各个图片的样式
- themes/default/easyui.css 如果需要更换主题，则引入其他主题下的easyui.css文件即可
- jQuery基础包
- jquery.easyui.min.js 该包是easyUI的基础包 

以上包是easyUI必须引入的包，其他包按需引入。

###### 引入所需js包的另外一种方式：

- jQuery基础包
- easyloader.js 使用easyloader智能加载，是根据使用到的UI组建按需加载。可以通过Firebug查看HTML,发现加载了很多的js文件。问题是，使用智能加载，编码的难度和成本都提高了，效率降低，并且智能加载的js文件数量比较多，并不会提高太大的速度，反而会因为js文件较多，被搜索引擎要求合并优化！ 

##### 第三步： 编写代码，弹出对话框  

```

     <body>     
		<div id="test" class="easyui-dialog" style="width:400px;height:200px">   
	        This is my first dialog!    
		</div>    
	</body>   
```


效果如图：  
![image](/public/img/easyui/dialog01.png)

另一种形式：   

```

     <!DOCTYPE html>  
	<html>  
	  <head>  
	    <title>demo01.html</title>  
	    <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/default/easyui.css">  
		<link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/icon.css">  
	   <script type="text/javascript" src="/easyUI/js/jquery-1.11.2.js"></script>  
		<script type="text/javascript" src="/easyUI/js/easyui/jquery.easyui.min.js"></script>  
		<script  type="text/javascript">    
			$(function(){  
				$("#test").dialog(); 
			});  
		</script>  
	  </head>  
	  <body>  
		<div id="test" style="width:400px;height:200px">    
	        This is my first dialog!  
		</div>  
	  </body>  
	</html> 
```

###### 如果使用easyloader则应该这样写：

```

    <!DOCTYPE html> 
	<html> 
	  <head>  
	    <title>demo01.html</title> 
	    <link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/default/easyui.css">  
		<link rel="stylesheet" type="text/css" href="/easyUI/js/easyui/themes/icon.css"> 
	    <script type="text/javascript" src="/easyUI/js/jquery-1.11.2.js"></script>  
		<script type="text/javascript" src="/easyUI/js/easyui/easyloader.js"></script>  
		<script  type="text/javascript">  
			$(function(){  
				easyloader.load('dialog',function(){  
					$("#test").dialog();  
				});  
			});  
		</script>  
	  </head>  
	  <body>  
		<div id="test" style="width:400px;height:200px">  
	        This is my first dialog!  
		</div>  
	  </body>  
	</html> 
```

