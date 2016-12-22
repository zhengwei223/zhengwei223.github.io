---
layout: post  
title: 数值输入框    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 了解NumberBox的基本属性、方法和事件
- 灵活掌握NumberBox的基本操作


# NumberBox

## NumberBox简介

  
数值输入框是用来限制用户只能输入数值型数据的。可以转换一个输入的元素到其他类型，比如：数字、百分比、货币等。效果如下图：

![](/public/img/easyui-zq/25.1.png)

*图25-01*

## 开发NumberBox程序

```
<input type="text" class="easyui-numberbox" value="100" data-options="min:0,precision:2"></input>  
```

**参考代码:[25/numberbox01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/25/numberbox01.html)**
 
该数值输入框只允许输入数字，并且数字必须大于0，且保留两位小数。效果如下图：

![](/public/img/easyui-zq/25.2.png)

*图25-02*

## NumberBox常用属性  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>是否禁用该字段。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>value</td>
	  <td>number</td>
	  <td>默认值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>min</td>
	  <td>number</td>
	  <td>min</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>max</td>
	  <td>number</td>
	  <td>允许的最大值。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>precision</td>
	  <td>number</td>
	  <td>小数点后的显示精度</td>
	  <td>0</td>
   </tr>
   <tr>
      <td>decimalSeparator</td>
	  <td>string</td>
	  <td>使用哪一种十进制字符分隔数字的整数和小数部分。</td>
	  <td>.</td>
   </tr>
   <tr>
      <td>groupSeparator</td>
	  <td>string</td>
	  <td>使用哪一种字符分割整数组，以显示成千上万的数据。</td>
	  <td></td>
   </tr>
   <tr>
      <td>prefix</td>
	  <td>string</td>
	  <td>前缀字符。</td>
	  <td></td>
   </tr>
   <tr>
      <td>suffix</td>
	  <td>string</td>
	  <td>后缀字符。</td>
	  <td></td>
   </tr>
   <tr>
      <td>filter</td>
	  <td>function(e)</td>
	  <td>定义是否支持多选。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>selectOnNavigation</td>
	  <td>boolean</td>
	  <td>定义如何过滤按键，当返回true时则允许输入，反之禁止。</td>
	  <td></td>
   </tr>
   <tr>
      <td>formatter</td>
	  <td>function(value)</td>
	  <td>用于格式化数值的函数。返回字符串值以显示到输入框中。</td>
	  <td></td>
   </tr>
   <tr>
      <td>parser</td>
	  <td>function(s)</td>
	  <td>用于解析字符串的函数。返回数值。</td>
	  <td></td>
   </tr>
</table>  


## NumberBox常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回数值输入框属性。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁数值输入框对象。</td>
   </tr>
   <tr>
      <td>disable</td> 
      <td>none</td> 
      <td>禁用字段。</td>
   </tr>
   <tr>
      <td>enable</td> 
      <td>none</td> 
      <td>启用字段。</td>
   </tr>
   <tr>
      <td>fix</td> 
      <td>none</td> 
      <td>将输入框中的值修正为有效的值。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置数值输入框的值。 </td>
   </tr>
   <tr>
      <td>getValue</td> 
      <td>none</td> 
      <td>获取数值输入框的值。 </td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除数值输入框的值。</td>
   </tr>
   <tr>
      <td>reset</td> 
      <td>none</td> 
      <td>重置数值输入框的值。</td>
   </tr>
</table>  

## NumberBox常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onChange</td><td>newValue,oldValue</td><td>当字段值更改的时候触发。</td>
   </tr>
</table> 


案例一：  

代码如下：

```
价格： <input id="input1"></input>  
<br/>
<br/>
<a href="javascript:void(0);" onclick="$('#input1').numberbox('disable');" class="easyui-linkbutton">禁用字段</a>
<a href="javascript:void(0);" onclick="$('#input1').numberbox('enable');" class="easyui-linkbutton">启用字段</a>
<a href="javascript:void(0);" onclick="set();" class="easyui-linkbutton">设置值 </a>
<a href="javascript:void(0);" onclick="alert($('#input1').numberbox('getValue'));" class="easyui-linkbutton">获取值 </a>
<a href="javascript:void(0);" onclick="$('#input1').numberbox('clear');" class="easyui-linkbutton">清除值 </a>
<a href="javascript:void(0);" onclick="$('#input1').numberbox('reset');" class="easyui-linkbutton">重置值 </a>
<script type="text/javascript">
	function set(){
		$.messager.prompt('提示信息', '请输入要设置的数值：', function(value){
			if (value){
				$('#input1').numberbox('setValue',value);
			}
		});
	}
</script>
```

**参考代码:[25/numberbox01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/25/numberbox01.html)**

效果如下图：

![](/public/img/easyui-zq/25.3.png)

*图25-03*

以上便是数值输入框的基本操作。
