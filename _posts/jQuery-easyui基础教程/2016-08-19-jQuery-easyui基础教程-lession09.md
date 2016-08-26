---
layout: post  
title: 创建复杂布局    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 可以灵活使用Layout完成各种布局 


# 复杂布局

## 案例一：

  
实现如下效果：

![image](http://i.imgur.com/KKMNcWN.png) 

代码如下：

```
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false,iconCls:'icon-add',href:'topLayout04.html',collapsible:false" style="height:20px;"></div>   
    <div data-options="region:'west',title:'树形菜单',border:false,split:true" style="padding-top:30px;padding-left:10px;width:200px;background-color: #EAFDFF;">
    	此处应该添加树形菜单
    </div>     
    <div data-options="region:'center',border:false">
    	<div class="easyui-layout" data-options="fit:true">
    		<div data-options="region:'north',split:true,border:false" style="height: 200px;padding-top:30px;padding-left:10px;">
    			此处应该添加表格
    		</div>
    		<div data-options="region:'center',border:false"  style="padding-top:30px;padding-left:10px;">
    			此处应该添加表格明细
    		</div>
    	</div>
    </div>   
</body>  
```  

实现效果如下：

![image](http://i.imgur.com/hIPdYD0.png) 


## 案例二：

实现如下效果：

![image](http://i.imgur.com/cGsM8ub.png) 

CSS代码如下：

```
<style>
.p-search {
	background: #fafafa;
	padding: 5px;
	border: 1px solid #ccc;
	border-bottom: 0;
	overflow: hidden;
}

.p-search input {
	width: 300px;
	border: 1px solid #ccc;
	background: #fff url('images/search.png') no-repeat right bottom;
}

.p-right {
	text-align: center;
	border: 1px solid #ccc;
	border-left: 0;
	width: 150px;
	background: #fafafa;
	padding-top: 10px;
}
</style>
```  

HTML代码如下：

```
<body style="background:#fafafa;">
	<h1>Panel</h1>
	<div class="easyui-panel" title="Complex Panel Layout"
		iconCls="icon-search" collapsible="true"
		style="padding:5px;width:500px;height:250px;">
		<div class="easyui-layout" fit="true">
			<div region="north" border="false" class="p-search">
				<label>Search:</label><input></input>
			</div>
			<div region="center" border="false">
				<div class="easyui-layout" fit="true">
					<div region="east" border="false" class="p-right">
						<img src="../images/msn.gif" />
					</div>
					<div region="center" border="false" style="border:1px solid #ccc;">
						<div class="easyui-layout" fit="true">
							<div region="south" split="true" border="false"
								style="height:60px;">
								<textarea style="border:0;width:100%;height:100%;resize:none">Hi,I am easyui.</textarea>
							</div>
							<div region="center" border="false"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
```  

相信通过以上两个综合案例，大家可以很好的掌握Layout的使用。





