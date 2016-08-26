---
layout: post  
title: 创建对话框   
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Layout的使用方法


# Layout

### Layout简介

  
使用Layout控件可以简单、快速的为后台管理系统的页面布局。布局容器有5个区域：北、南、东、西和中间。中间区域面板是必须的，边缘的面板都是可选的。每个边缘区域面板都可以通过拖拽其边框改变大小，也可以点击折叠按钮将面板折叠起来。布局可以进行嵌套，用户可以通过组合布局构建复杂的布局结构。效果如图：

![image](http://i.imgur.com/u1z2j0y.png) 

### 开发Layout程序

```
<div id="cc" class="easyui-layout" style="width:600px;height:400px;">   
	<div data-options="region:'north',title:'North Title',split:true" style="height:100px;"></div>   
	<div data-options="region:'south',title:'South Title',split:true" style="height:100px;"></div>   
	<div data-options="region:'east',iconCls:'icon-reload',title:'East',split:true" style="width:100px;"></div>   
	<div data-options="region:'west',title:'West',split:true" style="width:100px;"></div>   
	<div data-options="region:'center',title:'center title'" style="padding:5px;background:#eee;"></div>  
</div>
```  

**对于后台管理系统，通常会将整个body标签当作layout来布局。**  
代码如下：

```
<div id="cc" class="easyui-layout" style="width:600px;height:400px;">   
	<div data-options="region:'north',title:'North Title',split:true" style="height:100px;"></div>   
	<div data-options="region:'south',title:'South Title',split:true" style="height:100px;"></div>   
	<div data-options="region:'east',iconCls:'icon-reload',title:'East',split:true" style="width:100px;"></div>   
	<div data-options="region:'west',title:'West',split:true" style="width:100px;"></div>   
	<div data-options="region:'center',title:'center title'" style="padding:5px;background:#eee;"></div>  
</div>
```  


### Layout常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>fit</td>
	  <td>boolean</td>
	  <td>如果设置为true，布局组件将自适应父容器。当使用'body'标签创建布局的时候，整个页面会自动最大。</td>
	  <td>false</td>
   </tr>
</table>


### 区域面板常用属性

<table class="table table-bordered t
able-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>title</td>
	  <td>string</td>
	  <td>布局面板标题文本。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>region</td>
	  <td>string</td>
	  <td>定义布局面板位置，可用的值有：north, south, east, west, center。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>border</td>
	  <td>boolean</td>
	  <td>为true时显示布局面板边框。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>split</td>
	  <td>boolean</td>
	  <td>为true时用户可以通过分割栏改变面板大小。</td>
	  <td>false</td>
   </tr>
   <tr>
      <td>iconCls</td>
	  <td>string</td>
	  <td>一个包含图标的CSS类ID，该图标将会显示到面板标题上。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>href</td>
	  <td>string</td>
	  <td>用于读取远程站点数据的URL链接</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>collapsible</td>
	  <td>boolean</td>
	  <td>定义是否显示折叠按钮。</td>
	  <td>true</td>
   </tr>
   <tr>
      <td>minWidth</td>
	  <td>number</td>
	  <td>最小面板宽度。</td>
	  <td>10</td>
   </tr>
   <tr>
      <td>minHeight</td>
	  <td>number</td>
	  <td>最小面板高度。</td>
	  <td>10</td>
   </tr>
   <tr>
      <td>maxWidth</td>
	  <td>number</td>
	  <td>最大面板宽度。</td>
	  <td>10000</td>
   </tr>
   <tr>
      <td>maxHeight</td>
	  <td>number</td>
	  <td>最大面板高度。</td>
	  <td>10000</td>
   </tr>
</table>

参考jQuery EasyUI的API。

代码如下：

```
<div data-options="region:'north',title:'North Title',split:false,border:false,iconCls:'icon-add',href:'top.html',collapsible:false" style="height:100px;"></div>   

```
效果如下图：

![image](http://i.imgur.com/X1k5360.png)

**JS代码这样编写：**

```
var $southPanel = $("body").layout("panel",'south');
$southPanel.panel({
	split:false,
	border:false,
	iconCls:'icon-add'
});  

```

效果如下图：

![image](http://i.imgur.com/zqqi7Bn.png)


### Layout常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>resize</td> 
      <td>none</td> 
      <td>设置布局大小。</td>
   </tr>
   <tr>
      <td>panel</td> 
      <td>region</td> 
      <td>返回指定面板，'region'参数可用值有：'north','south','east','west','center'。</td>
   </tr>
   <tr>
      <td>collapse</td> 
      <td>region</td> 
      <td>折叠指定面板。'region'参数可用值有：'north','south','east','west'。</td>
   </tr>
   <tr>
      <td>expand</td> 
      <td>region</td> 
      <td>展开指定面板。'region'参数可用值有：'north','south','east','west'。</td>
   </tr>
   <tr>
      <td>add</td> 
      <td>options</td> 
      <td>添加指定面板。属性参数是一个配置对象，更多细节请查看选项卡面板属性。</td>
   </tr>
   <tr>
      <td>remove</td> 
      <td>region</td> 
      <td>移除指定面板。'region'参数可用值有：'north','south','east','west'。</td>
   </tr>   
</table>  

代码如下：

```
$('body').layout('add',{    
    region: 'west',    
    width: 180,    
    title: 'West Title',    
    split: true,    
    tools: [{    
        iconCls:'icon-add',    
        handler:function(){alert('add')}    
    },{    
        iconCls:'icon-remove',    
        handler:function(){alert('remove')}    
    }]    
});  

```
效果如下图：

![image](http://i.imgur.com/IJVG0JD.png)

以上便是Layout的基本用法。





