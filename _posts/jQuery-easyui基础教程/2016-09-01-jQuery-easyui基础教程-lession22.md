---
layout: post  
title: 文本框和文件框    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握文本框和文件框的基本操作
- 灵活运用文本框和文件框


# TextBox

## TextBox简介

  
TextBox(文本框)是一个增强的输入字段组件， 它允许用户非常简单的创建一组表单。它是一个用于构建其他组合控件的基础组件，如：combo，databox、spinner等。效果如下图：

![image](http://i.imgur.com/YhqXlGR.png)


## 开发TextBox程序

```
单行文本框：<input class="easyui-textbox" data-options="prompt:'Enter a email address...',validType:'email'" style="width:150px;height:32px">
```
  
效果如上图。


## TextBox常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>width</td>
	  <td>number</td>
	  <td>组件的宽度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>height</td>
	  <td>number</td>
	  <td>组件的高度。</td>
	  <td>22</td>
   </tr>
   <tr>
      <td>prompt</td>
	  <td>string</td>
	  <td>在输入框显示提示消息。</td>
	  <td>''</td>
   </tr>
   <tr>
      <td>value</td>
	  <td>string</td>
	  <td>默认值</td>
	  <td></td>
   </tr>
   <tr>
      <td>type</td>
	  <td>string</td>
	  <td>文本框类型。可用值有："text"和"password"。</td>
	  <td>text</td>
   </tr>
   <tr>
      <td>multiline</td>
	  <td>boolean</td>
	  <td>定义是否是多行文本框。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>editable</td>
	  <td>boolean</td>
	  <td>定义用户是否可以直接在该字段内输入文字。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>定义是否禁用该字段。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>readonly</td>
	  <td>boolean</td>
	  <td>定义是否将该控件设为只读。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>icons</td>
	  <td>array</td>
	  <td>在文本框显示的图标。</td>
	  <td>[]</td>
   </tr>
   <tr>
      <td>iconCls</td>
	  <td>string</td>
	  <td>文本框显示的背景图标。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>iconAlign</td>
	  <td>string</td>
	  <td>背景图标的位置。可用值有："left", "right"。</td>
	  <td>right</td>
   </tr>
   <tr>
      <td>iconWidth</td>
	  <td>number</td>
	  <td>图标的宽度。</td>
	  <td>18</td>
   </tr>
   <tr>
      <td>buttonText</td>
	  <td>string</td>
	  <td>文本框附加按钮显示的文本内容。</td>
	  <td></td>
   </tr>
   <tr>
      <td>buttonIcon</td>
	  <td>string</td>
	  <td>文本框附加按钮显示的图标。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>buttonAlign</td>
	  <td>string</td>
	  <td>附加按钮的位置。可用值有："left", "right"。</td>
	  <td>right</td>
   </tr>
</table>

案例一：  

代码如下：

```
多行文本框：<input class="easyui-textbox" data-options="multiline:true,prompt:'This TextBox will allow the user to enter multiple lines of text.'" style="width:300px;height:100px">
```

效果如下图：

![image](http://i.imgur.com/D6S65kO.png)	

案例二： 

```
<div style="margin:10px 0 20px 0">
    <span>Select Icon Align: </span>
    <select onchange="$('#tt').textbox({iconAlign:this.value})">
        <option value="right">Right</option>
        <option value="left">Left</option>
    </select>
</div>
<input id="tt" class="easyui-textbox" style="width:400px" data-options="
		prompt: 'Input something here!',
		iconWidth: 22,
		icons: [{
			iconCls:'icon-add',
			handler: function(e){
				$(e.data.target).textbox('setValue', 'Something added!');
			}
		},{
			iconCls:'icon-remove',
			handler: function(e){
				$(e.data.target).textbox('clear');
			}
		},{
			iconCls:'icon-search',
			handler: function(e){
				var v = $(e.data.target).textbox('getValue');
				alert('The inputed value is ' + (v ? v : 'empty'));
			}
		}]
		">
```

效果如下图：

![image](http://i.imgur.com/R1YkXK7.png)	


案例三：

```
<h2>Custom TextBox</h2>
<p>This example shows how to custom a login form.</p>
<div style="margin:20px 0;"></div>
<div class="easyui-panel" title="Login to system" style="width:400px;padding:30px 70px 20px 70px">
	<div style="margin-bottom:10px">
		<input class="easyui-textbox" style="width:100%;height:40px;padding:12px" data-options="prompt:'Username',iconCls:'icon-man',iconWidth:38">
	</div>
	<div style="margin-bottom:20px">
		<input class="easyui-textbox" type="password" style="width:100%;height:40px;padding:12px" data-options="prompt:'Password',iconCls:'icon-lock',iconWidth:38">
	</div>
	<div style="margin-bottom:20px">
		<input type="checkbox" checked="checked">
		<span>Remember me</span>
	</div>
	<div>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" style="padding:5px 0px;width:100%;">
			<span style="font-size:14px;">Login</span>
		</a>
	</div>
</div>
```

效果如下图：

![image](http://i.imgur.com/tAnFLax.png)	

## TextBox常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回属性对象。</td>
   </tr>
   <tr>
      <td>textbox</td> 
      <td>none</td> 
      <td>返回文本框对象。</td>
   </tr>
   <tr>
      <td>button</td> 
      <td>none</td> 
      <td>返回按钮对象。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁文本框组件。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>width</td> 
      <td>调整文本框组件宽度。</td>
   </tr>
   <tr>
      <td>disable</td> 
      <td>none</td> 
      <td>禁用组件。</td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用组件。</td>
   </tr>
   <tr>
      <td>readonly</td> 
      <td>mode</td> 
      <td>启用/禁用只读模式。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除组件中的值。</td>
   </tr>
   <tr>
      <td>reset</td> 
      <td>none</td> 
      <td>重置组件中的值。</td>
   </tr>
   <tr>
      <td>setText</td> 
      <td>text</td> 
      <td>设置显示的文本值。</td>
   </tr>
   <tr>
      <td>getText</td> 
      <td>none</td> 
      <td>获取显示的文本值。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置组件的值。</td>
   </tr>
   <tr>
      <td>getValue</td> 
      <td>none</td> 
      <td>获取组件的值。</td>
   </tr>
   <tr>
      <td>getIcon</td> 
      <td>index</td> 
      <td>获取指定图标对象。</td>
   </tr> 
</table>  

## TextBox常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onChange</td><td>newValue, oldValue</td><td>在字段值更改的时候触发。</td>
   </tr>
   <tr>
      <td>onResize</td><td>width, height</td><td>在文本框大小改变的时候触发。</td>
   </tr>
   <tr>
      <td>onClickButton</td><td>none</td><td>在用户点击按钮的时候触发。</td>
   </tr>
	<tr>
      <td>onClickIcon</td><td>index</td><td>在用户点击图标的时候触发。</td>
   </tr>
</table> 


代码如下：

HTML代码：

```
<div style="margin-bottom:40px">
	<input class="easyui-textbox" data-options="required:true,validType:'email' ,buttonText:'Search',iconCls:'icon-search',buttonIcon:'icon-search',iconWidth:28,prompt:'Search small...'" style="width:250px;height:22px;">
</div>
<div style="margin-bottom:40px">
	<input class="easyui-textbox" data-options="iconCls:'icon-search',iconWidth:28,prompt:'Search large...'" style="width:250px;height:26px;">
</div>
<div style="margin-bottom:40px">
	<input class="easyui-textbox" data-options="iconCls:'icon-search',iconWidth:28,prompt:'Search big...'" style="width:250px;height:32px;">
</div>
<div style="margin-bottom:40px">
	<input class="easyui-textbox" data-options="iconCls:'icon-search',iconWidth:28,prompt:'Search huge...'" style="width:250px;height:40px;">
</div>
```

JS代码：

```
$("input").textbox({
	onClickButton:function(){
		alert('click button');
	}
}); 
```

效果如下图：

![image](http://i.imgur.com/hVeA88g.png)


# FileBox

## FileBox简介

  
FileBox(文件框)组件在表单当中表示一个文件上传的字段。**它扩展自 textbox (文本框)，大部分的属性、事件和方法都继承自文本框。但是由于浏览器的安全问题，其中的某些方法（如："setValue"）则不能用于 filebox 组件。**效果如下图：

![image](http://i.imgur.com/IKFzeZl.png)


## 开发FileBox程序

```
<input class="easyui-filebox" data-options="prompt:'Choose a file...'" style="width:300px">
```
  
效果如上图。


## FileBox常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>buttonText</td>
	  <td>string</td>
	  <td>在文本框上附加的按钮显示的文本。</td>
	  <td>Choose File</td>
   </tr>
   <tr>
      <td>buttonIcon</td>
	  <td>string</td>
	  <td>在文本框上附加的按钮显示的图标。</td>
	  <td></td>
   </tr>
   <tr>
      <td>buttonAlign</td>
	  <td>string</td>
	  <td>附加按钮位置。可用值有："left", "right"。</td>
	  <td>right</td>
   </tr>
</table>

案例一：  

代码如下：

```
<input class="easyui-filebox" data-options="buttonAlign:'left',buttonIcon:'icon-add',buttonText:'上传文件',prompt:'请选择要上传的另一个文件'" style="width:300px">
```

效果如下图：

![image](http://i.imgur.com/VNzWjYp.png)	



以上便是文本框和文件框的基本用法。





