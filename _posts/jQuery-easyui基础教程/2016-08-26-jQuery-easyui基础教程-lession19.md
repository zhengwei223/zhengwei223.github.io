---
layout: post  
title: 创建消息窗口   
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Messager的使用方法


# Messager

### Messager简介

  
消息窗口提供了不同的消息框风格，包含alert(警告框), confirm(确认框), prompt(提示框), progress(进度框)等。所有的消息框都是异步的。用户可以在交互消息之后使用回调函数去处理结果或做一些自己需要处理的事情。效果如图：

![image](http://i.imgur.com/V8nVwA6.png)

### 开发Messager程序

```
$.messager.alert('警告','警告消息');    
```  

**参考代码:[19/messager01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/19/messager01.html)**

效果如图：

![image](http://i.imgur.com/85pXH3y.png)


### Messager常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>ok</td>
	  <td>string</td>
	  <td>确定按钮文本。</td>
	  <td>Ok</td>
   </tr>
   <tr>
      <td>cancel</td>
	  <td>string</td>
	  <td>取消按钮文本。</td>
	  <td>Cancel</td>
   </tr>
</table>


### Messager常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>$.messager.show</td> 
      <td>options</td> 
      <td>在屏幕右下角显示一条消息窗口。</td>
   </tr>
   <tr>
      <td>$.messager.alert</td> 
      <td>title, msg, icon, fn</td> 
      <td>显示警告窗口。</td>
   </tr>
   <tr>
      <td>$.messager.confirm</td> 
      <td>title, msg, fn</td> 
      <td>显示一个包含“确定”和“取消”按钮的确认消息窗口。</td>
   </tr>
   <tr>
      <td>$.messager.prompt</td> 
      <td>title, msg, fn</td> 
      <td>显示一个用户可以输入文本的并且带“确定”和“取消”按钮的消息窗体。</td>
   </tr>
   <tr>
      <td>$.messager.progress</td> 
      <td>options or method</td> 
      <td>显示一个进度消息窗体。</td>
   </tr>
</table>  

##### 案例一：  

代码如下：

```
$.messager.show({
	title:'我的消息',
	msg:'消息将在5秒后关闭。',
	timeout:5000,
	showType:'slide'
});
// 消息将显示在顶部中间
$.messager.show({
	title:'我的消息',
	msg:'消息将在4秒后关闭。',
	showType:'show',
	style:{
		right:'',
		top:document.body.scrollTop+document.documentElement.scrollTop,
		bottom:''
	}
});
```

**参考代码:[19/messager02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/19/messager02.html)**

效果如下图：

![image](http://i.imgur.com/Rp3UaUu.png)

Tip:在屏幕右下角显示一条消息窗口。该选项参数是一个可配置的对象：  
showType：定义将如何显示该消息。可用值有：null,slide,fade,show。默认：slide。  
showSpeed：定义窗口显示的过度时间。默认：600毫秒。  
width：定义消息窗口的宽度。默认：250px。  
height：定义消息窗口的高度。默认：100px。  
title：在头部面板显示的标题文本。  
msg：显示的消息文本。  
style：定义消息窗体的自定义样式。  
timeout：如果定义为0，消息窗体将不会自动关闭，除非用户关闭他。如果定义成非0的树，消息窗体将在超时后自动关闭。默认：4秒。  

##### 案例二：  

代码如下：

```
$.messager.alert('我的消息','这是一个提示信息！','info');
```

**参考代码:[19/messager03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/19/messager03.html)**

效果如下图：

![image](http://i.imgur.com/9PVl1ZZ.png)

Tip:显示警告窗口。参数：  
title：在头部面板显示的标题文本。  
msg：显示的消息文本。  
icon：显示的图标图像。可用值有：error,question,info,warning。  
fn: 在窗口关闭的时候触发该回调函数。    

##### 案例三：  

代码如下：

```
$.messager.confirm('确认','您确认想要删除记录吗？',function(r){    
    if (r){    
        alert('确认删除');    
    }    
});
```

**参考代码:[19/messager04.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/19/messager04.html)**

效果如下图：

![image](http://i.imgur.com/DMqox3k.png)

Tip:显示一个包含“确定”和“取消”按钮的确认消息窗口。参数：  
title：在头部面板显示的标题文本。  
msg：显示的消息文本。  
fn(b): 当用户点击“确定”按钮的时侯将传递一个true值给回调函数，否则传递一个false值。 

##### 案例四：  

代码如下：

```
$.messager.prompt('提示信息', '请输入你的姓名：', function(r){
	if (r){
		alert('你的姓名是：' + r);
	}
});
```

**参考代码:[19/messager05.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/19/messager05.html)**

效果如下图：

![image](http://i.imgur.com/UEn7Hoc.png)

Tip:显示一个用户可以输入文本的并且带“确定”和“取消”按钮的消息窗体。参数：  
title：在头部面板显示的标题文本。  
msg：显示的消息文本。  
fn(val): 在用户输入一个值参数的时候执行的回调函数。    

##### 案例五：  

代码如下：

```
$.messager.progress(); 
```

**参考代码:[19/messager06.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/19/messager06.html)**

效果如下图：

![image](http://i.imgur.com/YuyFP87.png)

Tip:显示一个进度消息窗体。  
属性定义为：   
title：在头部面板显示的标题文本。默认：空。  
msg：显示的消息文本。默认：空。   
text：在进度条上显示的文本。默认：undefined。  
interval：每次进度更新的间隔时间。默认：300毫秒。  

方法定义为：  
bar：获取进度条对象。  
close：关闭进度窗口。  

关闭进度消息窗口。

```
$.messager.progress('close');
```


以上便是Messager的基本用法。





