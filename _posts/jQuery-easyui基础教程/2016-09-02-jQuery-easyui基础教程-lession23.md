---
layout: post  
title: 简单下拉框    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 了解Combo的基本属性、方法和事件
- 灵活掌握Combobox的基本操作


# Combo

## Combo简介

  
自定义下拉框显示一个可编辑的文本框和下拉面板在html页面。这是构建其他复杂的组合部件（如：combobox,combotree,combogrid等）之前需要构建的最基本的组件。Combo扩展自ValidateBox。**Combo并不是学习的重点，只是为后续的ComboBox、ComboTree及ComboGrid打基础。大家简单了解即可。**效果如下图：

![image](http://i.imgur.com/tDpioWp.png)


## 开发Combo程序

```
<input id="cc" style="width:150px"></input>
<div id="sp">
	<div style="color:#99BBE8;background:#fafafa;padding:5px;">Select a language</div>
	<div style="padding:10px">
		<input type="radio" name="lang" value="01"><span>Java</span><br/>
		<input type="radio" name="lang" value="02"><span>C#</span><br/>
		<input type="radio" name="lang" value="03"><span>Ruby</span><br/>
		<input type="radio" name="lang" value="04"><span>Basic</span><br/>
		<input type="radio" name="lang" value="05"><span>Fortran</span>
	</div>
</div>
<script type="text/javascript">
	$(function(){
		/**
		  * 当点击刷新按钮刷新页面时combo控件中的值被清除，但是单选按钮依然是选中状态，所以需要清除checked属性
		  */
		$('#sp input').removeProp('checked');

		$('#cc').combo({
			required:true,
			editable:false
		});
		$('#sp').appendTo($('#cc').combo('panel'));
		$('#sp input').click(function(){
			var v = $(this).val();
			var s = $(this).next('span').text();
			$('#cc').combo('setValue', v).combo('setText', s).combo('hidePanel');
		});
	});
</script>
```
 
效果如上图。

**自定义下拉框使用Javascript创建一个\<select\>或\<input\>元素。注意：使用自定义下拉框不能通过标签的方式进行创建。** 


## Combo常用属性

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
      <td>panelWidth</td>
	  <td>number</td>
	  <td>下拉面板宽度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelHeight</td>
	  <td>number</td>
	  <td>下拉面板高度。</td>
	  <td>200</td>
   </tr>
   <tr>
      <td>panelMinWidth</td>
	  <td>number</td>
	  <td>下拉面板最小宽度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelMaxWidth</td>
	  <td>number</td>
	  <td>下拉面板最大宽度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelMinHeight</td>
	  <td>number</td>
	  <td>下拉面板最小高度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelMaxHeight</td>
	  <td>number</td>
	  <td>下拉面板最大高度。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>panelAlign</td>
	  <td>string</td>
	  <td>面板对齐方式。可用值有：'left','right'。</td>
	  <td>200</td>
   <tr>
      <td>multiple</td>
	  <td>boolean</td>
	  <td>定义是否支持多选。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>selectOnNavigation</td>
	  <td>boolean</td>
	  <td>定义是否允许使用键盘导航来选择项目。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>separator</td>
	  <td>string</td>
	  <td>在多选的时候使用何种分隔符进行分割。</td>
	  <td>,</td>
   </tr>
   <tr>
      <td>editable</td>
	  <td>boolean</td>
	  <td>定义用户是否可以直接输入文本到字段中。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>disabled</td>
	  <td>boolean</td>
	  <td>设置启用/禁用字段。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>readonly</td>
	  <td>boolean</td>
	  <td>设置该字段为读写/只读模式。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>hasDownArrow</td>
	  <td>boolean</td>
	  <td>定义是否显示向下箭头按钮。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>value</td>
	  <td>string</td>
	  <td>字段的默认值。</td>
	  <td></td>
   </tr>
   <tr>
      <td>delay</td>
	  <td>number</td>
	  <td>最后一次输入事件与执行搜索之间的延迟间隔（执行自动完成功能的延迟间隔）</td>
	  <td>200</td>
   </tr>
   <tr>
      <td>keyHandler</td>
	  <td>object</td>
	  <td>在用户按下键的时候调用一个函数。</td>
	  <td></td>
   </tr>
</table>

案例一：  

代码如下：

```
$('#cc').combo({
	panelAlign:'right',
	width:100,
	panelWidth:300,
	multiple:true,
	required:true,
	editable:false,
	hasDownArrow:false
});
```

效果如下图：

![image](http://i.imgur.com/VF3wqyD.png)


## Combo常用方法  

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
      <td>panel</td> 
      <td>none</td> 
      <td>返回下拉面板对象。</td>
   </tr>
   <tr>
      <td>textbox</td> 
      <td>none</td> 
      <td>返回文本框对象。</td>
   </tr>
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁该组件。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>width</td> 
      <td>调整组件宽度。</td>
   </tr>
   <tr>
      <td>showPanel</td> 
      <td>none</td> 
      <td>显示下拉面板。</td>
   </tr>
   <tr>
      <td>hidePanel</td> 
      <td>none</td> 
      <td>隐藏下拉面板。/td>
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
      <td>validate</td> 
      <td>none</td> 
      <td>验证输入的值。</td>
   </tr>
   <tr>
      <td>isValid</td> 
      <td>none</td> 
      <td>返回验证结果。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除控件的值。</td>
   </tr>
   <tr>
      <td>reset</td> 
      <td>none</td> 
      <td>重置控件的值。</td>
   </tr>
   <tr>
      <td>getText</td> 
      <td>none</td> 
      <td>获取输入的文本。</td>
   </tr> 
   <tr>
      <td>setText</td> 
      <td>text</td> 
      <td>设置输入的文本。</td>
   </tr>
   <tr>
      <td>getValues</td> 
      <td>none</td> 
      <td>获取组件值的数组。</td>
   </tr>
   <tr>
      <td>setValues</td> 
      <td>values</td> 
      <td>设置组件值的数组。</td>
   </tr>
   <tr>
      <td>getValue</td> 
      <td>none</td> 
      <td>获取组件的值。</td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>none</td> 
      <td>设置组件的值。</td>
   </tr>
</table>  

## Combo常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onShowPanel</td><td>none</td><td>当下拉面板显示的时候触发。</td>
   </tr>
   <tr>
      <td>onHidePanel</td><td>none</td><td>当下拉面板隐藏的时候触发。</td>
   </tr>
   <tr>
      <td>onChange</td><td>newValue, oldValue</td><td>当字段值改变的时候触发。</td>
   </tr>
</table> 



# Combobox

## Combobox简介

  
下拉列表框显示一个可编辑文本框和下拉式列表，用户可以选择一个值或多个值。用户可以直接输入文本到列表顶部或选择一个或多个当前列表中的值。效果如下图：

![image](http://i.imgur.com/6b0gEli.png)


## 开发Combobox程序

```
<select class="easyui-combobox" name="state" style="width:200px;">
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
</select>
```
  
效果如上图。


## Combobox常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>valueField</td>
	  <td>string</td>
	  <td>基础数据值名称绑定到该下拉列表框。</td>
	  <td>value</td>
   </tr>
   <tr>
      <td>textField</td>
	  <td>string</td>
	  <td>基础数据字段名称绑定到该下拉列表框。</td>
	  <td>text</td>
   </tr>
   <tr>
      <td>groupField</td>
	  <td>string</td>
	  <td>指定分组的字段名称。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>groupFormatter</td>
	  <td>function(group)</td>
	  <td>返回格式化后的分组标题文本，以显示分组项。</td>
	  <td></td>
   </tr>
   <tr>
      <td>mode</td>
	  <td>string</td>
	  <td>定义了当文本改变时如何读取列表数据。</td>
	  <td>local</td>
   </tr>
   <tr>
      <td>url</td>
	  <td>string</td>
	  <td>通过URL加载远程列表数据。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>method</td>
	  <td>string</td>
	  <td>HTTP方法检索数据(POST / GET)。</td>
	  <td>post</td>
   </tr>
   <tr>
      <td>data</td>
	  <td>array</td>
	  <td>数据列表加载。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>filter</td>
	  <td>function</td>
	  <td>定义当'mode'设置为'local'时如何过滤本地数据，函数有2个参数：<br/>
			q：用户输入的文本。<br/>
			row：列表行数据。<br/>
			返回true的时候允许行显示。 <br/>
	  </td>
	  <td></td>
   </tr>
   <tr>
      <td>formatter</td>
	  <td>function</td>
	  <td>定义如何渲染行。该函数接受1个参数：row。</td>
	  <td></td>
   </tr>
   <tr>
      <td>loader</td>
	  <td>function(param,success,error)</td>
	  <td>定义了如何从远程服务器加载数据。</td>
	  <td>json loader</td>
   </tr>
   <tr>
      <td>loadFilter</td>
	  <td>function(data)</td>
	  <td>返回过滤后的数据并显示。</td>
	  <td></td>
   </tr>
   <tr>
      <td>groupField</td>
	  <td>string</td>
	  <td>指定分组的字段名称。</td>
	  <td>right</td>
   </tr>
</table>

案例一：  

代码如下：

```
$('#cc').combobox({    
    url:'../data/combobox_data.json',    
    valueField:'id',    
    textField:'text',
    multiple:true,
    selectOnNavigation:true,//可以使用键盘上的上下键来选中项
    editable:false,//用户不可以直接输入文本到字段中。
    hasDownArrow:false//定义不显示向下箭头按钮。
}); 
```

效果如下图：

![image](http://i.imgur.com/L7Du7Ff.png)	


## Combobox常用方法  

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
      <td>getData</td> 
      <td>none</td> 
      <td>返回加载数据。</td>
   </tr>
   <tr>
      <td>loadData</td> 
      <td>data</td> 
      <td>读取本地列表数据。</td>
   </tr>
   <tr>
      <td>reload</td> 
      <td>url</td> 
      <td>请求远程列表数据。通过'url'参数重写原始URL值。 </td>
   </tr>
   <tr>
      <td>setValues</td> 
      <td>values</td> 
      <td>设置下拉列表框值数组。 </td>
   </tr>
   <tr>
      <td>setValue</td> 
      <td>value</td> 
      <td>设置下拉列表框的值。 </td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除下拉列表框的值。</td>
   </tr>
   <tr>
      <td>select</td> 
      <td>value</td> 
      <td>选择指定项。</td>
   </tr>
   <tr>
      <td>unselect</td> 
      <td>value</td> 
      <td>取消选择指定项。</td>
   </tr>
</table>  

## Combobox常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th><th width="300px">事件参数</th><th width="600px">描述</th>
   </tr>
   <tr>
      <td>onBeforeLoad</td><td>param</td><td>在请求加载数据之前触发，返回false取消该加载动作。</td>
   </tr>
   <tr>
      <td>onLoadSuccess</td><td>none</td><td>在加载远程数据成功的时候触发。</td>
   </tr>
   <tr>
      <td>onLoadError</td><td>none</td><td>在加载远程数据失败的时候触发。</td>
   </tr>
   <tr>
      <td>onSelect</td><td>record</td><td>在用户选择列表项的时候触发。</td>
   </tr>
   <tr>
      <td>onUnselect</td><td>record</td><td>在用户取消选择列表项的时候触发。</td>
   </tr>
</table> 


##### 实现级联下拉列表

HTML代码：  

```
<input id="cc1"/>   
<input id="cc2" class="easyui-combobox"/>  
```

JS代码：  

```
$('#cc1').combobox({    
    url:'/easyUI/getOneLevelCategory',    
    valueField:'id',    
    textField:'text',
    selectOnNavigation:true,
    editable:false,
    onSelect: function(rec){    
        var url = '/easyUI/getTwoLevelCategory?pid='+rec.id;    
        $('#cc2').combobox('reload', url);    
    },
    onLoadSuccess:function(){
    	//$(this).combobox('getData')得到所有下拉项
    	
    	//得到第一个下拉项
    	var rec = $(this).combobox('getData')[0];
    	
    	//设置下拉列表默认选中第一个下拉项
    	$(this).combobox('select',rec.text); 
    	
    	//加载#cc2中的内容
    	var url = '/easyUI/getTwoLevelCategory?pid='+rec.id;    
        $('#cc2').combobox('reload', url);    
    }
}); 

$('#cc2').combobox({
	onLoadSuccess:function(){
		//设置下拉列表默认选中第一个下拉项
    	$(this).combobox('select',$(this).combobox('getData')[0].text); 
    }
}); 
```

效果如下图：

![image](http://i.imgur.com/3avTQpJ.png)

以上便是下拉框的基本操作。





