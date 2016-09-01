---
layout: post  
title: Form表单    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Form的使用方法


# Form

## Form简介

  
HTML中非常重要的一个标签是Form标签，登录、注册、查找等很多功能都是依靠Form表单来完成操作的。EasyUI中的Form控件提供了各种方法来操作执行表单字段，比如：ajax提交, load, clear等等。当提交表单的时候可以调用validate方法检查表单是否有效。


## 开发Form程序

```
<form id="ff" method="post">   
    <div>   
        <label for="name">Name:</label>   
        <input class="easyui-validatebox" type="text" name="name" data-options="required:true" />   
    </div>   
    <div>   
        <label for="email">Email:</label>   
        <input class="easyui-validatebox" type="text" name="email" data-options="validType:'email'" />   
    </div>   
</form>  
```
  
效果如下图：

![image](http://i.imgur.com/CEM6GHA.png)

**系统默认的日期和文本输入框提示均为英文，locale目录下存放的是各种语言包。想要换成中文只需要引入locale目录下的easyui-lang-zh_CN.js文件。**

效果如下图：

![image](http://i.imgur.com/66dA5KT.png)

**重要提示：必须先导入easyUI的jquery.easyui.min.js包，后导入easyui-lang-zh_CN.js包。**

## Form常用属性

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
	  <td>提交表单动作的URL地址。</td>
	  <td>null</td>
   </tr>
</table>


## Form常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>submit</td> 
      <td>options</td> 
      <td>执行提交操作，该选项的参数是一个对象，它包含以下属性：<br/>
		url：请求的URL地址。<br/>
		onSubmit: 提交之前的回调函数。<br/>
		success: 提交成功后的回调函数。<br/>
	   </td>
   </tr>
   <tr>
      <td>load</td> 
      <td>data</td> 
      <td>读取记录填充到表单中。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除表单数据。</td>
   </tr>
   <tr>
      <td>reset</td> 
      <td>none</td> 
      <td>重置表单数据。</td>
   </tr>
   <tr>
      <td>validate</td> 
      <td>none</td> 
      <td>做表单字段验证，当所有字段都有效的时候返回true。该方法使用validatebox(验证框)插件。</td>
   </tr>
   <tr>
      <td>enableValidation</td> 
      <td>none</td> 
      <td>启用验证。</td>
   </tr> 
   <tr>
      <td>disableValidation</td> 
      <td>none</td> 
      <td>禁用验证。</td>
   </tr>  
</table>  

## Form常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onSubmit</td><td>param</td><td>在提交之前触发，返回false可以终止提交。</td>
   </tr>
   <tr>
      <td>success</td><td>data</td><td>在表单提交成功以后触发。</td>
   </tr>
   <tr>
      <td>onBeforeLoad</td><td>param</td><td>在请求加载数据之前触发。返回false可以停止该动作。</td>
   </tr>
	<tr>
      <td>onLoadSuccess</td><td>data</td><td>在表单数据加载完成后触发。</td>
   </tr>
	<tr>
      <td>onLoadError</td><td>none</td><td>在表单数据加载出现错误的时候触发。</td>
   </tr>
</table> 

代码如下：

JS代码：

```
function showRegistWindow(){
	$("#loginWindow").window("close");
	$("#registWindow").window("open");
}

function showLoginWindow(){
	$("#registWindow").window("close");
	$("#loginWindow").window("open");
}

$(function(){
	$('#loginForm').form({    
	    url:'/easyUI/login',    
	    onSubmit: function(){    
	        return true; 
	    },    
	    success:function(data){    
	        alert(data);    
	    }    
	}); 
	$('#registForm').form({    
	    url:'/easyUI/regist',    
	    onSubmit: function(){    
	        return true; 
	    },    
	    success:function(data){    
	        alert(data);    
	    }    
	});    
});

function login(){
	$('#loginForm').submit(); 
}

function regist(){
	$('#registForm').submit(); 
} 
```

结合数据库和服务器端代码，实现注册和登录功能。效果如下图：

![image](http://i.imgur.com/DO4nQ0b.png)

以上便是Form的基本用法。





