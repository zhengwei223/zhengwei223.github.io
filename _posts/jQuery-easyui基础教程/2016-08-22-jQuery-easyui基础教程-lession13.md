---
layout: post  
title: Panel    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Panel的使用方法 


# Panel

## Panel简介


面板作为承载其它内容的容器。这是构建其他组件的基础（比如：layout,tabs,accordion等）。它还提供了折叠、关闭、最大化、最小化和自定义行为。面板可以很容易地嵌入到web页面的任何位置。效果如图：

![image](http://i.imgur.com/RAlN8eS.png)


## 开发Panel程序

```
<div id="p" class="easyui-panel" title="My Panel"     
        style="width:500px;height:150px;padding:10px;background:#fafafa;"   
        data-options="iconCls:'icon-save',closable:true,    
                collapsible:true,minimizable:true,maximizable:true">   
    <p>panel content.</p>   
</div>  
```  

**参考代码:[13/panel01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/13/panel01.html)**

## Panel常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="650px">描述</th>
      <th>默认值</th>
   </tr>
   <tr>
      <td>id</td>
	  <td>string</td>
	  <td>面板的ID属性。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>title</td>
	  <td>string</td>
	  <td>在面板头部显示的标题文本。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>iconCls</td>
	  <td>string</td>
	  <td>设置一个16x16图标的CSS类ID显示在面板左上角。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>width</td>
	  <td>number</td>
	  <td>设置面板宽度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>height</td> 
	  <td>number</td> 
	  <td>设置面板高度。</td>
      <td>auto</td>
   </tr>
   <tr>
      <td>left</td> 
      <td>number</td> 
      <td>设置面板距离左边的位置（即X轴位置）。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>top</td> 
      <td>number</td> 
      <td>设置面板距离顶部的位置（即Y轴位置）。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>style</td> 
      <td>object</td> 
      <td>添加一个当前指定样式到面板。 </td> 
      <td>{}</td>
   </tr>
   <tr>
      <td>fit</td> 
      <td>boolean</td> 
      <td>当设置为true的时候面板大小将自适应父容器。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>border</td> 
      <td>boolean</td> 
      <td>定义是否显示面板边框。</td> 
      <td>true</td>
   </tr>
   <tr>
      <td>doSize</td> 
      <td>boolean</td> 
      <td>如果设置为true，在面板被创建的时候将重置大小和重新布局。</td> 
      <td>true</td>
   </tr> 
   <tr>
      <td>noheader</td> 
	  <td>boolean</td> 
	  <td>如果设置为true，那么将不会创建面板标题。</td>
      <td>false</td>
   </tr>
   <tr>
      <td>content</td> 
      <td>string</td> 
      <td>面板主体内容。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>collapsible</td> 
      <td>boolean</td> 
      <td>定义是否显示可折叠按钮。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>minimizable</td> 
      <td>boolean</td> 
      <td>定义是否显示最小化按钮。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>maximizable</td> 
      <td>boolean</td> 
      <td>定义是否显示最大化按钮。</td> 
      <td>false</td>
   </tr>   
   <tr>
      <td>closable</td> 
      <td>boolean</td> 
      <td>定义是否显示关闭按钮。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>tools</td> 
      <td>array,selector</td> 
      <td>自定义工具菜单。</td> 
      <td>[]</td>
   </tr>
   <tr>
      <td>collapsed</td> 
      <td>boolean</td> 
      <td>定义是否在初始化的时候折叠面板。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>minimized</td> 
      <td>boolean</td> 
      <td>定义是否在初始化的时候最小化面板。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>maximized</td> 
      <td>boolean</td> 
      <td>定义是否在初始化的时候最大化面板。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>closed</td> 
      <td>boolean</td> 
      <td>定义是否在初始化的时候关闭面板。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>href</td> 
      <td>string</td> 
      <td>从URL读取远程数据并且显示到面板。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>loadingMessage</td> 
      <td>string</td> 
      <td>在加载远程数据的时候在面板内显示一条消息。</td> 
      <td>Loading</td>
   </tr>
   <tr>
      <td>method</td> 
      <td>string</td> 
      <td>使用HTTP的哪一种方法读取内容页。可用值：'get','post'。</td> 
      <td>get</td>
   </tr>
   <tr>
      <td>queryParams</td> 
      <td>object</td> 
      <td>在加载内容页的时候添加的请求参数。</td> 
      <td>{}</td>
   </tr>
   <tr>
      <td>footer</td> 
      <td>string</td> 
      <td>面板底部内容</td> 
      <td>null</td>
   </tr>
</table>

案例一：  

代码如下：

```
<div id="p" class="easyui-panel" title="My Panel"     
        style="width:500px;height:150px;padding:10px;"   
        data-options="iconCls:'icon-save',footer:'#ft'">   
    <p>panel content.</p>   
</div>
<div id="ft" style="padding:5px;">
    Footer Content.
</div>
```

**参考代码:[13/panel04.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/13/panel04.html)**

效果如图：

![image](http://i.imgur.com/jUfKO37.png)


## Panel常用方法  

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
      <td>返回面板对象。</td>
   </tr>
   <tr>
      <td>header</td> 
      <td>none</td> 
      <td>返回面板头对象。</td>
   </tr>
   <tr>
      <td>body</td> 
      <td>none</td> 
      <td>返回面板主体对象。</td>
   </tr>
   <tr>
      <td>setTitle</td> 
      <td>title</td> 
      <td>设置面板头的标题文本。</td>
   </tr>
   <tr>
      <td>open</td> 
      <td>forceOpen</td> 
      <td>在'forceOpen'参数设置为true的时候，打开面板时将跳过'onBeforeOpen'回调函数。</td>
   </tr>
   <tr>
      <td>close</td> 
      <td>forceClose</td> 
      <td>在'forceClose'参数设置为true的时候，关闭面板时将跳过'onBeforeClose'回调函数。</td>
   </tr>   
   <tr>
      <td>destroy</td> 
      <td>forceDestroy</td> 
      <td>在'forceDestroy'参数设置为true的时候，销毁面板时将跳过'onBeforeDestory'回调函数。</td>
   </tr>   
   <tr>
      <td>refresh</td> 
      <td>href</td> 
      <td>刷新面板来装载远程数据。如果'href'属性有了新配置，它将重写旧的'href'属性。 </td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>options</td> 
      <td>设置面板大小和布局。</td>
   </tr>
   <tr>
      <td>move</td> 
      <td>options</td> 
      <td>移动面板到一个新位置。</td>
   </tr>
   <tr>
      <td>maximize</td> 
      <td>none</td> 
      <td>最大化面板到容器大小。</td>
   </tr>
   <tr>
      <td>minimize</td> 
      <td>none</td> 
      <td>最小化面板。</td>
   </tr>
   <tr>
      <td>restore</td> 
      <td>none</td> 
      <td>恢复最大化面板回到原来的大小和位置。</td>
   </tr>
   <tr>
      <td>collapse</td> 
      <td>animate</td> 
      <td>折叠面板主体。</td>
   </tr>
   <tr>
      <td>expand</td> 
      <td>animate</td> 
      <td>展开面板主体。</td>
   </tr>
   <tr>
      <td>clear</td> 
      <td>none</td> 
      <td>清除面板内容</td>
   </tr>
   <tr>
      <td>doLayout</td> 
      <td>none</td> 
      <td>设置面板内子组件的大小。</td>
   </tr>
</table>  


## Panel常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onBeforeLoad</td>
	  <td>none</td>
	  <td>在加载内容页之前触发，返回false将忽略该动作。</td>
   </tr>
   <tr>
      <td>onLoad</td>
	  <td>none</td>
	  <td>在加载远程数据时触发。</td>
   </tr>
   <tr>
      <td>onLoadError</td>
	  <td>none</td>
	  <td>在加载内容页发生错误时触发。</td>
   </tr>
   <tr>
      <td>onBeforeOpen</td>
	  <td>none</td>
	  <td>在打开面板之前触发，返回false可以取消打开操作。</td>
   </tr>
   <tr>
      <td>onOpen</td>
	  <td>none</td>
	  <td>在打开面板之后触发。</td>
   </tr>
   <tr>
      <td>onBeforeClose</td>
	  <td>none</td>
	  <td>在关闭面板之前触发，返回false可以取消关闭操作。</td>
   </tr>
   <tr>
      <td>onClose</td>
	  <td>none</td>
	  <td>在面板关闭之后触发。</td>
   </tr>
   <tr>
      <td>onBeforeDestroy</td>
	  <td>none</td>
	  <td>在面板销毁之前触发，返回false可以取消销毁操作。</td>
   </tr>
   <tr>
      <td>onDestroy</td>
	  <td>none</td>
	  <td>在面板销毁之后触发。</td>
   </tr>
   <tr>
      <td>onBeforeCollapse</td>
	  <td>none</td>
	  <td>在面板折叠之前触发，返回false可以终止折叠操作。</td>
   </tr>
   <tr>
      <td>onCollapse</td>
	  <td>none</td>
	  <td>在面板折叠之后触发。</td>
   </tr>
   <tr>
      <td>onBeforeExpand</td>
	  <td>none</td>
	  <td>在面板展开之前触发，返回false可以终止展开操作。</td>
   </tr>
   <tr>
      <td>onExpand</td>
	  <td>none</td>
	  <td>在面板展开之后触发。</td>
   </tr>
   <tr>
      <td>onResize</td>
	  <td>width, height</td>
	  <td>在面板改变大小之后触发。</td>
   </tr>
   <tr>
      <td>onMove</td>
	  <td>left,top</td>
	  <td>在面板移动之后触发。</td>
   </tr>
   <tr>
      <td>onMaximize</td>
	  <td>none</td>
	  <td>在窗口最大化之后触发。</td>
   </tr>
   <tr>
      <td>onRestore</td>
	  <td>none</td>
	  <td>在窗口恢复到原始大小以后触发。</td>
   </tr>
   <tr>
      <td>onMinimize</td>
	  <td>none</td>
	  <td>在窗口最小化之后触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

代码如下：

```
$('#p').panel({    
  width:500,    
  height:150,   
  closable:true,  
  title: 'My Panel',    
  tools: [{    
    iconCls:'icon-add',    
    handler:function(){alert('new');}    
  },{    
    iconCls:'icon-save',    
    handler:function(){alert('save');}    
  }],
  onBeforeClose:function(){
  	if(!confirm('确实要删除该内容吗?')){
	 	 return false;
  	}
  	alert('准备关闭panel!');
  	return true;
  }   
});   

```

**参考代码:[13/panel02.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/13/panel02.html)**

效果如图：

![image](http://i.imgur.com/4vtqina.png)


以上便是Panel的基本用法。





