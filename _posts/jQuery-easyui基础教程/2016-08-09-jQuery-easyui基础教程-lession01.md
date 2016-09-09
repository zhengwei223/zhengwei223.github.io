---
layout: post  
title: 初识jQuery-EasyUI   
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 了解EasyUI
- 下载EasyUI，并创建简单的应用


# jQuery EasyUI简介

jQuery EasyUI 是一个基于 jQuery 的框架，集成了各种用户界面插件。  

![image](http://i.imgur.com/w4DOMiL.png) 

![image](http://i.imgur.com/4tmvcjN.png)

easyUI是一种基于jQuery的用户界面插件集合。

easyUI为创建现代化，互动的JS应用程序，提供必要的功能。

使用easyUI不需要写很多代码，只需要通过编写一些简单的HTML标记，就可以定义用户界面。

easyUI是个完美支持HTML5网页的完整框架。

easyUI能够节省您网页开发的时间和规模。

easyUI很简单但功能很强大。

easyUI框架提供了创建网页所需的一切，帮助您轻松建立站点。本教程将告诉您如何使用easyUI框架创建应用。


# 下载jQuery EasyUI  

访问[EasyUI官网](http://www.jeasyui.com/)下载最新的easyUI源文件   
 
![image](http://i.imgur.com/oFHGavp.png) 

也可以参考[EasyUI中文网](http://www.jeasyui.net/)  

![image](http://i.imgur.com/WMB3LAN.png)

解压后能看到这些目录和文件：  

![image](http://i.imgur.com/OKUnaaP.png)

- demo:easyui演示页面代码库（可以从中参考很多组件的用法，是个非常好用的demo库。）
- demo-mobile:该目录下存放的是EasyUI移动版各插件的示例示例
- locale:easyui国际化资源文件库（需要用到国际化的时候就需要在页面中引用该包路径下的文件。）
- plugins:easyui核心功能组件分解后的独立插件库（需要配合easyloader.js一起使用。）
- src：easyui部分非核心组件的源代码库（核心大组件的源代码并未公布，比如datagrid、combo和tree等。）
- themes：easyui的皮肤库（皮肤库中会收录所有网上能找得到的皮肤，所以大家不用再去自己乱搜了。）
- easyloader.js：easyui组件加载器（easyui提供了2种组件加载方式，这就是其中一种，当使用该方式的时候可以不必引入jquery.easyui.min.js文件，具体用法请参看api文档。）
- jquery.easyui.min.js：easyui的完整组件包文件（当使用了该文件的时候就可以不必引入easyloader.js文件，具体用法请参考官方demo或api文档。）
- jquery.min.js：jQuery框架库文件，该版本的jQuery库提供的是最新的1.11.1版，能够支持IE6、7、8。


# jQuery EasyUI入门案例

jQuery EasyUI提供易于使用的组件它使Web开发人员快速地在流行的jQuery核心和HTML5上建立程序页面。这些功能使您的应用适合今天的网络。有两个方法声明来创建UI组件:

##### 第一步： 新建一个web应用，并引入easyUI的所有包，目录结构如图所示： 

![image](http://i.imgur.com/ypgJVTg.png)

##### 第二步： 新建一个01目录，并在该目录下新建一个construction01.html页面，并引入需要的css样式和js包:

- themes/icon.css 定义了各个图片的样式
- themes/default/easyui.css 如果需要更换主题，则引入其他主题下的easyui.css文件即可
- jQuery基础包
- jquery.easyui.min.js 该包是easyUI的基础包 

以上包是easyUI必须引入的包。

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
**参考代码:[01/construction01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/01/construction01.html)**

效果如图：  

![image](http://i.imgur.com/3IBcY9c.png)



###### 另一种形式：   

```
<!--head中代码-->  
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/icon.css">
<script type="text/javascript" src="../dist/js/jquery-1.11.2.js"></script>
<script type="text/javascript"	src="../dist/js/easyui/jquery.easyui.min.js"></script>
<script  type="text/javascript">    
	$(function(){  
		$("#test").dialog(); 
	});  
</script>  
  
<!--body中代码-->
<div id="test" style="width:400px;height:200px">    
    This is my first dialog!  
</div>  	
```

**参考代码:[01/construction02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/01/construction02.html)**

###### 如果使用easyloader则应该这样写：

```
<!--head中代码--> 
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../dist/js/easyui/themes/icon.css">
<script type="text/javascript" src="../dist/js/jquery-1.11.2.js"></script>
<script type="text/javascript" src="../dist/js/easyui/easyloader.js"></script> 
<script  type="text/javascript">  
	$(function(){  
		easyloader.load('dialog',function(){  
			$("#test").dialog();  
		});  
	});  
</script>  
	    
<!--body中代码-->
<div id="test" style="width:400px;height:200px">  
    This is my first dialog!  
</div>  
```

**参考代码:[01/construction03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/01/construction03.html)**

以上便是jQuery EasyUI使用的三种不同方式。

