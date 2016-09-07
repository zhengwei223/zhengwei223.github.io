---
layout: post  
title: 表单验证(ValidateBox)    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握常用的表单验证


# ValidateBox

## ValidateBox简介

  
validatebox(验证框)的设计目的是为了验证输入的表单字段是否有效。如果用户输入了无效的值，它将会更改输入框的背景颜色，并且显示警告图标和提示信息。该验证框可以结合form(表单)插件实现防止表单重复提交。

## 开发ValidateBox程序

```
Email:<input id="vv" class="easyui-validatebox" data-options="required:true,validType:'email'" />  
  
```

**参考代码:[21/validatebox01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/21/validatebox01.html)**
  
效果如下图：

![image](http://i.imgur.com/S8cOYnR.png)

**系统默认的日期和文本输入框提示均为英文，locale目录下存放的是各种语言包。想要换成中文只需要引入locale目录下的easyui-lang-zh_CN.js文件。**


**重要提示：必须先导入easyUI的jquery.easyui.min.js包，后导入easyui-lang-zh_CN.js包。**

## ValidateBox常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>required</td>
	  <td>boolean</td>
	  <td>定义为必填字段。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>validType</td>
	  <td>string,array</td>
	  <td>定义字段验证类型，比如：email, url等等。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>delay</td>
	  <td>number</td>
	  <td>延迟到最后验证输入值。</td>
	  <td>200</td>
   </tr>
   <tr>
      <td>missingMessage</td>
	  <td>string</td>
	  <td>当文本框未填写时出现的提示信息。</td>
	  <td>This field is required.</td>
   </tr>   
   <tr>
      <td>invalidMessage</td>
	  <td>string</td>
	  <td>当文本框的内容被验证为无效时出现的提示。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>tipPosition</td>
	  <td>string</td>
	  <td>定义当文本框内容无效的时候提示消息显示的位置，有效的值有：'left','right'。</td>
	  <td>right</td>
   </tr>
   <tr>
      <td>deltaX</td>
	  <td>number</td>
	  <td>提示框在水平方向上位移。</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>novalidate</td>
	  <td>boolean</td>
	  <td>为true时关闭验证功能。</td>
	  <td>false</td>
   </tr>
</table>


## ValidateBox常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>移除并销毁组件。</td>
   </tr>
   <tr>
      <td>validate</td> 
      <td>none</td> 
      <td>验证文本框的内容是否有效。</td>
   </tr>
   <tr>
      <td>isValid</td> 
      <td>none</td> 
      <td>调用validate方法并且返回验证结果，true或者false。</td>
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
      <td>onBeforeValidate</td><td>none</td><td>在验证一个字段之前触发。</td>
   </tr>
   <tr>
      <td>onValidate</td><td>data</td><td>在验证一个字段的时候触发。</td>
   </tr>
</table> 

##  验证规则  

验证规则是根据使用需求和验证类型属性来定义的，这些规则已经实现：  

- email：匹配E-Mail的正则表达式规则。  
- url：匹配URL的正则表达式规则。  
- length[0,100]：允许在x到x之间个字符。  
- remote['http://.../action.do','paramName']：发送ajax请求需要验证的值，当成功时返回true。
  
## 自定义验证规则  

需要重写$.fn.validatebox.defaults.rules中定义的验证器函数和无效消息。

### 案例一：定义一个最小长度(minLength)的自定义验证：

```
$.extend($.fn.validatebox.defaults.rules, {      
    minLength: {      
        validator: function(value, param){      
            return value.length >= param[0];      
        },    
		// {0}表示调用该函数时传递的第一个参数
        message: '请输入至少 {0} 个字符.'   
    }    
});  
```

现在你可以在输入框中限制最小长度为5的自定义最小长度验证了：

```
用户名：<input style="margin-left:400px;" class="easyui-validatebox" data-options="deltaX:-20,tipPosition:'left',required:true,validType:'minLength[5]'">  
```

**参考代码:[21/validatebox02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/21/validatebox02.html)**

效果如下图：  

![image](http://i.imgur.com/nbbYi7N.png)

**当刷新页面时，不再校验minLength规则（自定义的规则）。**

**解决方法： 加入以下代码**

```
$(function(){
	//当input内的内容改变时进行格式验证
	$("input").change(function(){
		$(this).validatebox('validate');
	});
	//页面加载完毕之后进行格式校验
	$("input").change();
});
```

### 案例二：检查密码和确认密码是否相同：

```
// the 'equals' rule    
$.extend($.fn.validatebox.defaults.rules, {    
    equals: {    
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message: '输入内容不匹配.'   
    }    
});  
```

现在可以校验密码和确认密码是否相同了：

```
密码：<input id="pwd" name="pwd" type="password" class="easyui-validatebox" data-options="required:true" />   
确认密码：<input id="rpwd" name="rpwd" type="password" class="easyui-validatebox"     
    required="required" validType="equals['#pwd']" />  
```

**参考代码:[21/validatebox03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/21/validatebox03.html)**

效果如下图：  

![image](http://i.imgur.com/G3pAZ5f.png)

**当刷新页面时text不会清空内容，password会清空内容，所以案例二不需要在页面加载完毕之后触发change事件。**


##  EasyUI取消表单实时验证，提交时统一验证

```
<form id="ff" class="easyui-form" method="post" data-options="novalidate:true">
</form>

$('#ff').form('submit',{
		url:'/easyUI/login',  
        onSubmit:function(){
            return $(this).form('enableValidation').form('validate');
        },
        success:function(data){    
        alert(data);    
    }
});
```

**参考代码:[21/validatebox04.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/21/validatebox04.html)**

以上便是ValidateBox的基本用法。





