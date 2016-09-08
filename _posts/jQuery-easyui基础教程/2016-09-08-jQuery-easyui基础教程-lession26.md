---
layout: post  
title: 日期    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 了解DateBox、DateTimeBox和Calendar的基本属性、方法和事件
- 灵活掌握日期的相关操作


# DateBox

## DateBox简介

  
日期输入框结合了一个可编辑的文本框控件和允许用户选择日期的下拉日历面板控件。选择的日期会自动转变为一个有效的日期然后填充到文本框中。选定的日期也可以被格式化为预定格式。效果如下图：

![image](http://i.imgur.com/yzya3CE.png)


## 开发DateBox程序

```
<input id="dd" type="text" class="easyui-datebox" required="required"></input>  
```

**参考代码:[26/datebox01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/datebox01.html)**
 
效果如上图。


## DateBox常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>panelWidth</td>
	  <td>number</td>
	  <td>下拉日历面板宽度。</td>
	  <td>180</td>
   </tr>
   <tr>
      <td>panelHeight</td>
	  <td>number</td>
	  <td>下拉日历面板高度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>currentText</td>
	  <td>string</td>
	  <td>显示当天按钮。</td>
	  <td>Today</td>
   </tr>
   <tr>
      <td>closeText</td>
	  <td>string</td>
	  <td>显示关闭按钮。</td>
	  <td>Close</td>
   </tr>
   <tr>
      <td>okText</td>
	  <td>string</td>
	  <td>显示OK按钮。</td>
	  <td>OK</td>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>该属性值为true时禁用该字段。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>buttons</td>
	  <td>array</td>
	  <td>在日历下面的按钮。</td>
	  <td></td>
   </tr>
   <tr>
      <td>sharedCalendar</td>
	  <td>string,selector</td>
	  <td>将一个日历控件共享给多个datebox控件使用。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>formatter</td>
	  <td>function</td>
	  <td>该函数用于格式化日期。</td>
	  <td></td>
   </tr>
   <tr>
      <td>parser</td>
	  <td>function</td>
	  <td>该函数用于解析一个日期字符串。</td>
	  <td></td>
   </tr>
</table>  


## DateBox常用方法  

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
      <td>calendar</td> 
      <td>none</td> 
      <td>获取日历对象。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置日期输入框的值。</td>
   </tr>
</table>  


## DateBox常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onSelect</td><td>date</td><td>在用户选择了一个日期的时候触发。 </td>
   </tr>
</table> 

## 案例一：设置指定的日期

```
<a href="javascript:void(0);" onclick="set();" class="easyui-linkbutton">设置值 </a>
<a href="javascript:void(0);" onclick="alert($('#input1').datebox('getValue'));" class="easyui-linkbutton">获取值 </a>
<script type="text/javascript">
	function set(){
		$.messager.prompt('提示信息', '请输入要设置的数值：', function(value){
			if (value){
				$('#input1').datebox('setValue', value);	
			}
		});	
	}
</script>
```

**参考代码:[26/datebox01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/datebox01.html)**

效果如下图：

![image](http://i.imgur.com/aBa9n3J.png)


## 案例二：设置日期范围

```
<input id="dd"></input>
<script>
	$(function(){
		$('#dd').datebox().datebox('calendar').calendar({
			validator: function(date){
				var now = new Date();
				//当前日期
				var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				//下月1号
				var d2 = new Date(now.getFullYear(), now.getMonth()+1, 1);
				//只能选择今天到本月最后一天
				return d1<=date && date<d2;
			}
		});
	});
</script>
```

**参考代码:[26/datebox02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/datebox02.html)**

效果如下图：

![image](http://i.imgur.com/6YIjF7l.png)

## 案例三： 修改日期样式

```
<h2>Date Format</h2>
<p>formatter方法用于将Date类型转换成String,parser方法用于将String转换成Date</p>
<div style="margin:20px 0;"></div>
<input class="easyui-datebox"></input><br/><br/>
<input id="input1" class="easyui-datebox" data-options="formatter:myformatter,parser:myparser"></input>
<br/><br/><br/>
<a href="javascript:void(0);" onclick="set();" class="easyui-linkbutton">设置值 </a>
<a href="javascript:void(0);" onclick="alert($('#input1').datebox('getValue'));" class="easyui-linkbutton">获取值 </a>
<script type="text/javascript">
	function myformatter(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'年'+(m<10?('0'+m):m)+'月'+(d<10?('0'+d):d)+"日";
	}
	function myparser(s){
		if (!s) return new Date();
		if(s.indexOf('-') > 0){
			var ss = s.split('-');
			
		}else if(s.indexOf('/') > 0){
			ss = s.split('/');
		}else{
			return;
		}
		var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				return new Date(y,m-1,d);
			} else {
				return new Date();
			}	
	}
	function set(){
		$.messager.prompt('提示信息', '请输入要设置的数值：', function(value){
			if (value){
				$('#input1').datebox('setValue', value);	
			}
		});	
	}
</script>
```

**参考代码:[26/datebox03.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/datebox03.html)**


# DateTimeBox  


## DateTimeBox简介  

下拉列表框显示一个可编辑文本框和下拉式列表，用户可以选择一个值或多个值。用户可以直接输入文本到列表顶部或选择一个或多个当前列表中的值。效果如下图：

![image](http://i.imgur.com/fhRhbjK.png)


## 开发DateTimeBox程序  

```
<input id="dd" type="text" class="easyui-datetimebox" required="required"></input>  
```

**参考代码:[26/datetimebox01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/datetimebox01.html)**
  
效果如上图。


## DateTimeBox常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>spinnerWidth</td>
	  <td>number</td>
	  <td>定义datetimebox组件嵌入的时间微调器的宽度。</td>
	  <td>100%</td>
   </tr>
   <tr>
      <td>showSeconds</td>
	  <td>boolean</td>
	  <td>定义是否显示秒钟信息。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>timeSeparator</td>
	  <td>string</td>
	  <td>定义在小时、分钟和秒之间的时间分割字符。</td>
	  <td>:</td>
   </tr>
</table>


## DateTimeBox常用方法  

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
      <td>spinner</td> 
      <td>none</td> 
      <td>返回时间微调器对象。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置日期时间输入框值。 </td>
   </tr>
</table>  

## 案例一： 修改日期样式

```
<input id="input1" class="easyui-datetimebox" data-options="formatter:myformatter,parser:myparser"></input>
<a href="javascript:void(0);" onclick="set();" class="easyui-linkbutton">设置值 </a>
<a href="javascript:void(0);" onclick="alert($('#input1').datetimebox('getValue'));" class="easyui-linkbutton">获取值 </a>
<script type="text/javascript">
	function myparser(s){
		if (!s) return new Date();
		var ss;
		if(s.indexOf('-') > 0){
			ss = s.split('-');
			
		}else if(s.indexOf('/') > 0){
			ss = s.split('/');
		}else if(s.indexOf('年') > 0){
			ss = s.split('年');
			var y = parseInt(ss[0],10);
			ss = ss[1].split('月');
			var m = parseInt(ss[0],10);
			ss = ss[1].split('日');
			var d = parseInt(ss[0],10);
			ss = ss[1].split(' ');
			ss = ss[1].split(':');
			var h1 = parseInt(ss[0]);
			var m1 = parseInt(ss[1]);
			var s1 = parseInt(ss[2]);;
			if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h1) && !isNaN(m1) && !isNaN(s1)){
				return new Date(y,m-1,d,h1,m1,s1);
			} else {
				return new Date();
			}	
		}
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		ss = ss[2].split(' ');
		var d = parseInt(ss[0],10);
		ss = ss[1].split(':');
		var h1 = parseInt(ss[0]);
		var m1 = parseInt(ss[1]);
		var s1 = parseInt(ss[2]);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h1) && !isNaN(m1) && !isNaN(s1)){
			return new Date(y,m-1,d,h1,m1,s1);
		} else {
			return new Date();
		}	
	}
	
	function myformatter(date){
		if(date){
			var y1 = date.getFullYear();
			var m1 = date.getMonth()+1;
			var d1 = date.getDate();
			var h2 = date.getHours();
			var m2 = date.getMinutes();
			var s2 = date.getSeconds();
			var message = y1+'年'+(m1<10?('0'+m1):m1)+'月'+(d1<10?('0'+d1):d1)+"日 "+h2+":"+m2+":"+s2;
			return message;
		}
	}
	
	function set(){
		$.messager.prompt('提示信息', '请输入要设置的数值：', function(value){
			if (value){
				$('#input1').datetimebox('setValue', value);	
			}
		});	
	}
</script>
```

**参考代码:[26/datetimebox02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/datetimebox02.html)**


# Calendar

## Calendar简介

  
日历控件显示一个月的日历，允许用户选择日期和移动到下一个或上一个月。默认情况下，一周的第一天是周日。它可以通过设置'firstDay'属性的值来更改设置。效果如下图：

![image](http://i.imgur.com/q01fJVh.png)


## 开发Calendar程序

```
<div id="cc" class="easyui-calendar" style="width:180px;height:180px;"></div>    
```

**参考代码:[26/calendar01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/calendar01.html)**
 
效果如上图。


## Calendar常用属性  

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
	  <td>日历控件宽度。</td>
	  <td>180</td>
   </tr>
   <tr>
      <td>height</td>
	  <td>number</td>
	  <td>日历控件高度。</td>
	  <td>180</td>
   </tr>
   <tr>
      <td>fit</td>
	  <td>boolean</td>
	  <td>当设置为true的，将设置日历控件大小自适应父容器。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>border</td>
	  <td>boolean</td>
	  <td>定义是否显示边框。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>showWeek</td>
	  <td>boolean</td>
	  <td>当设置为true时，将显示周数。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>weekNumberHeader</td>
	  <td>string</td>
	  <td>周数的标签显示在头部。</td>
	  <td></td>
   </tr>
   <tr>
      <td>getWeekNumber</td>
	  <td>function(date)</td>
	  <td>该函数用于返回周数值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>firstDay</td>
	  <td>number</td>
	  <td>定义一周的第一天是星期几。0=星期日、1=星期一 等。</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>weeks</td>
	  <td>array</td>
	  <td>显示的周列表内容。</td>
	  <td>['S','M','T','W','T','F','S']</td>
   </tr>
   <tr>
      <td>months</td>
	  <td>array</td>
	  <td>显示的月列表内容。</td>
	  <td>['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']</td>
   </tr>
   <tr>
      <td>year</td>
	  <td>number</td>
	  <td>年日历。</td>
	  <td>当前年份（4位数）</td>
   </tr>
   <tr>
      <td>months</td>
	  <td>number</td>
	  <td>月日历。</td>
	  <td>当前月份（从1开始）</td>
   </tr>
   <tr>
      <td>current</td>
	  <td>Date</td>
	  <td>当前日期。</td>
	  <td>当前日期</td>
   </tr>
   <tr>
      <td>formatter</td>
	  <td>function(date)</td>
	  <td>日期格式化函数，返回日期值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>styler</td>
	  <td>function(date)</td>
	  <td>日历天的样式函数，返回行内样式或CSS样式表的Class名称。</td>
	  <td></td>
   </tr>
   <tr>
      <td>validator</td>
	  <td>function(date)</td>
	  <td>验证器函数用于确定是否可以选择日历上的某一天，返回false将阻止选择当前天。</td>
	  <td></td>
   </tr>
</table>  


## Calendar常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回参数对象。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>none</td> 
      <td>调整日历大小。</td>
   </tr>
   <tr>
      <td>moveTo</td> 
      <td>date</td> 
      <td>移动日历到指定日期。</td>
   </tr>
</table>  

## Calendar常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onSelect</td><td>date</td><td>在用户选择一天的时候触发。 </td>
   </tr>
   <tr>
      <td>onChange</td><td>new Date, oldDate</td><td>在用户更改日期的时候触发。 </td>
   </tr>
</table> 

案例一：  

代码如下：  

```
$("#cc").calendar({
	firstDay:1
});
```

**参考代码:[26/calendar01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/26/calendar01.html)**

效果如下图：

![image](http://i.imgur.com/xnOv6Da.png)


## 最佳实践

Calendar、DateTimeBox及DateBox均设置editable属性为false

以上便是日期相关的基本操作。
