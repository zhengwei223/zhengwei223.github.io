---
layout: post  
title: 创建简单窗口    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Window的使用方法


# Window

## Window简介

  
窗口控件是一个浮动和可拖拽的面板可以用作应用程序窗口。默认情况下,窗口可以移动,调整大小和关闭。它的内容也可以被定义为静态html或要么通过ajax动态加载。效果如图：

![image](http://i.imgur.com/UI6EBW9.png)

## 开发Window程序

```
<div id="win" class="easyui-window" title="My Window" style="width:300px;height:100px;padding:5px;">
	Some Content.
</div>
```  

效果如下图：  

![image](http://i.imgur.com/vpZHh5o.png)


## Window常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>title</td>
	  <td>string</td>
	  <td>窗口的标题文本。</td>
	  <td>New Window</td>
   </tr>
   <tr>
      <td>collapsible</td>
	  <td>boolean</td>
	  <td>定义是否显示可折叠按钮。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>minimizable</td>
	  <td>boolean</td>
	  <td>定义是否显示最小化按钮。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>maximizable</td>
	  <td>boolean</td>
	  <td>定义是否显示最大化按钮。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>closable</td>
	  <td>boolean</td>
	  <td>定义是否显示关闭按钮。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>closed</td>
	  <td>boolean</td>
	  <td>定义是否可以关闭窗口。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>zIndex</td>
	  <td>number</td>
	  <td>窗口Z轴坐标。</td>
	  <td>9000</td>
   </tr>
   <tr>
      <td>draggable</td>
	  <td>boolean</td>
	  <td>定义是否能够拖拽窗口。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>resizable</td>
	  <td>boolean</td>
	  <td>定义是否能够改变窗口大小。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>shadow</td>
	  <td>boolean</td>
	  <td>如果设置为true，在窗体显示的时候显示阴影。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>inline</td>
	  <td>boolean</td>
	  <td>定义如何布局窗口，如果设置为true，窗口将显示在它的父容器中，否则将显示在所有元素的上面。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>modal</td>
	  <td>boolean</td>
	  <td>定义是否将窗体显示为模式化窗口。</td>
	  <td>true</td>
   </tr>
</table>


## Window常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>window</td> 
      <td>none</td> 
      <td>返回外部窗口对象。</td>
   </tr>
   <tr>
      <td>hcenter</td> 
      <td>none</td> 
      <td>仅水平居中窗口。</td>
   </tr>
   <tr>
      <td>vcenter</td> 
      <td>none</td> 
      <td>仅垂直居中窗口。</td>
   </tr>
   <tr>
      <td>center</td> 
      <td>none</td> 
      <td>将窗口绝对居中。</td>
   </tr>
</table>  


创建一个登录窗口和注册窗口，并可以互相切换。代码如下：

```
<div id="loginWindow" class="easyui-window" title="Login" style="width:300px;height:200px;">
	<form style="padding:10px 20px 10px 40px;">
		<table>
			<tr>
				<td>用户名:</td>
				<td><input type="text"></td>
			</tr>
			<tr>
				<td>密码:</td>
				<td><input type="password"></td>
			</tr>
			<tr>
				<td colspan="2" style="padding-left:20px;height: 70px;">
					<a href="#" class="easyui-linkbutton" style="padding-left:10px;padding-right:10px;margin-right:10px;" icon="icon-ok">登录</a>
					<a href="#" onclick="showRegistWindow();" class="easyui-linkbutton" style="padding-left:10px;padding-right:10px;" icon="icon-redo">注册</a>
				</td>
			</tr>
		</table>
	</form>
</div>
	<div id="registWindow" data-options="closed:true" class="easyui-window" title="Regist" style="width:300px;height:220px;">
	<form style="padding:10px 20px 10px 40px;">
		<table>
			<tr>
				<td>用户名:</td>
				<td><input type="text"></td>
			</tr>
			<tr>
				<td>密码:</td>
				<td><input type="password"></td>
			</tr>
			<tr>
				<td>确认密码:</td>
				<td><input type="password"></td>
			</tr>
			<tr>
				<td colspan="2" style="padding-left:20px;height: 70px;">
					<a href="#" class="easyui-linkbutton" style="padding-left:10px;padding-right:10px;margin-right:10px;" icon="icon-ok">注册</a>
					<a href="#" onclick="showLoginWindow();" class="easyui-linkbutton" style="padding-left:10px;padding-right:10px;" icon="icon-redo">登录</a>
				</td>
			</tr>
		</table>
	</form>
</div> 

<script type="text/javascript">
	function showRegistWindow(){
		$("#loginWindow").window("close");
		$("#registWindow").window("open");
	}
	
	function showLoginWindow(){
		$("#registWindow").window("close");
		$("#loginWindow").window("open");
	}
</script>
```

效果如下图：

![image](http://i.imgur.com/pRwqTro.png)

以上便是Layout的基本用法。





