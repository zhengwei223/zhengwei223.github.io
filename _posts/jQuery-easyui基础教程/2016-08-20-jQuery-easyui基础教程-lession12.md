---
layout: post  
title: 创建选项卡    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握选项卡的使用方法 


# Tabs

### Tabs简介

  
选项卡显示一批面板。但在同一个时间只会显示一个面板。每个选项卡面板都有头标题和一些小的按钮工具菜单，包括关闭按钮和其他自定义按钮。效果如图：

![image](http://i.imgur.com/0jaIL77.png)

### 开发Tabs程序

```
<div id="tt" class="easyui-tabs"  style="width:500px;height:250px;">
	<div title="首页" style="padding:20px;display:none;">首页中的内容</div>
	<div title="收件箱" style="overflow:auto;padding:20px;display:none;">
		收件箱中的内容</div>
	<div title="公司公共通讯录" data-options="closable:true"
		style="overflow:auto;padding:20px;display:none;">公司公共通讯录邮件中的内容</div>
	<div title="欢迎使用邮件签名" data-options="closable:true"
		style="overflow:auto;padding:20px;display:none;">欢迎使用邮件签名邮件中的内容</div>
</div>
```  

效果如下图所示：

![image](http://i.imgur.com/L7A7WvS.png)


### Tabs常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="650px">描述</th>
      <th>默认值</th>
   </tr>
   <tr>
      <td>width</td>
	  <td>number</td>
	  <td>选项卡容器宽度。</td>
	  <td>auto</td>
   </tr>
   <tr>
      <td>height</td> 
	  <td>number</td> 
	  <td>选项卡容器高度。</td>
      <td>auto</td>
   </tr>
   <tr>
      <td>plain</td> 
      <td>boolean</td> 
      <td>设置为true时，将不显示控制面板背景。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>fit</td> 
      <td>boolean</td> 
      <td>设置为true时，选项卡的大小将铺满它所在的容器。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>border</td> 
      <td>boolean</td> 
      <td>设置为true时，显示选项卡容器边框。</td> 
      <td>true</td>
   </tr>
   <tr>
      <td>scrollIncrement</td> 
      <td>number</td> 
      <td>选项卡滚动条每次滚动的像素值。</td> 
      <td>100</td>
   </tr> 
   <tr>
      <td>scrollDuration</td> 
	  <td>number</td> 
	  <td>每次滚动动画持续的时间，单位：毫秒。</td>
      <td>400</td>
   </tr>
   <tr>
      <td>tools</td> 
      <td>array,selector</td> 
      <td>工具栏添加在选项卡面板头的左侧或右侧。</td> 
      <td>null</td>
   </tr>
   <tr>
      <td>toolPosition</td> 
      <td>string</td> 
      <td>工具栏位置。可用值：'left','right'。</td> 
      <td>right</td>
   </tr>
   <tr>
      <td>tabPosition</td> 
      <td>string</td> 
      <td>选项卡位置。可用值：'top','bottom','left','right'。</td> 
      <td>top</td>
   </tr>
   <tr>
      <td>headerWidth</td> 
      <td>number</td> 
      <td>选项卡标题宽度，在tabPosition属性设置为'left'或'right'的时候才有效。</td> 
      <td>150</td>
   </tr>   
   <tr>
      <td>tabWidth</td> 
      <td>number</td> 
      <td>标签条的宽度。</td> 
      <td>auto</td>
   </tr>
   <tr>
      <td>tabHeight</td> 
      <td>number</td> 
      <td>标签条的高度。</td> 
      <td>27</td>
   </tr>
   <tr>
      <td>selected</td> 
      <td>number</td> 
      <td>初始化选中一个tab页。</td> 
      <td>0</td>
   </tr>
   <tr>
      <td>showHeader</td> 
      <td>boolean</td> 
      <td>设置为true时，显示tab页标题。</td> 
      <td>true</td>
   </tr>
</table>


### Tabs常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>tabs</td> 
      <td>none</td> 
      <td>返回所有选项卡面板。</td>
   </tr>
   <tr>
      <td>resize</td> 
      <td>none</td> 
      <td>调整选项卡容器大小和布局。</td>
   </tr>
   <tr>
      <td>add</td> 
      <td>options</td> 
      <td>添加一个新选项卡面板。</td>
   </tr>
   <tr>
      <td>close</td> 
      <td>which</td> 
      <td>关闭一个选项卡面板，'which'参数可以是选项卡面板的标题或者索引，以指定要关闭的面板。</td>
   </tr>
   <tr>
      <td>getTab</td> 
      <td>which</td> 
      <td>获取指定选项卡面板，'which'参数可以是选项卡面板的标题或者索引。</td>
   </tr>
   <tr>
      <td>getTabIndex</td> 
      <td>tab</td> 
      <td>获取指定选项卡面板的索引。</td>
   </tr>   
   <tr>
      <td>getSelected</td> 
      <td>none</td> 
      <td>获取选择的选项卡面板。</td>
   </tr>   
   <tr>
      <td>select</td> 
      <td>which</td> 
      <td>选择一个选项卡面板，'which'参数可以是选项卡面板的标题或者索引。</td>
   </tr>
   <tr>
      <td>unselect</td> 
      <td>which</td> 
      <td>取消选择一个选项卡面板，'which'参数可以是选项卡面板的标题或者索引。</td>
   </tr>
   <tr>
      <td>showHeader</td> 
      <td>none</td> 
      <td>显示选项卡的标签头。</td>
   </tr>
   <tr>
      <td>hideHeader</td> 
      <td>none</td> 
      <td>隐藏选项卡的标签头。</td>
   </tr>
   <tr>
      <td>exists</td> 
      <td>which</td> 
      <td>表明指定的面板是否存在，'which'参数可以是选项卡面板的标题或索引。</td>
   </tr>
   <tr>
      <td>update</td> 
      <td>param</td> 
      <td>更新指定的选项卡面板。</td>
   </tr>
</table>  


### Tabs常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onLoad</td>
	  <td>panel</td>
	  <td>在ajax选项卡面板加载完远程数据的时候触发。</td>
   </tr>
   <tr>
      <td>onSelect</td>
	  <td>title,index</td>
	  <td>用户在选择一个选项卡面板的时候触发。</td>
   </tr>
   <tr>
      <td>onUnselect</td>
	  <td>title,index</td>
	  <td>用户在取消选择一个选项卡面板的时候触发。</td>
   </tr>
   <tr>
      <td>onClose</td>
	  <td>title,index</td>
	  <td>在用户关闭一个选项卡面板的时候触发。</td>
   </tr>
   <tr>
      <td>onAdd</td>
	  <td>title,index</td>
	  <td>在添加一个新选项卡面板的时候触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

#####  案例一：

```
$('#tt').tabs({    
    onSelect:function(title){    
        alert(title+' is selected');  
        var pp = $('#tt').tabs('getSelected');    
		var tabTitle = pp.panel('options').title;    //得到选项卡的标题
		alert(tabTitle);   
    }    
});  

```

当选中某一个选项卡时，会弹出对应的标题。效果如图：

![image](http://i.imgur.com/f0Zjg61.png)


##### 案例二：

模拟蓝桥邮箱系统,当点击‘已发送’时，如果选项卡中已经存在‘已发送’，则显示该选项卡中的内容，否则新建‘已发送’选项卡，并显示对应的内容。实现如下效果：

![image](http://i.imgur.com/FyWyA7i.png)

HTML代码：

```
<body class="easyui-layout">
	<div data-options="region:'west',width:'200px'">
		<ul>
			<li><div>收件箱</div></li>
			<li><div>红旗邮件</div></li>
			<li><div>待办邮件</div></li>
			<li><div>星标联系人邮件</div></li>
			<li><div>草稿箱</div></li>
			<li><div>已发送</div></li>
			<li><div>邮件标签</div></li>
			<li><div>邮箱中心</div></li>
			<li><div>文件中心</div></li>
		</ul>
	</div>
	<div data-options="region:'center'">
		<div id="tt" class="easyui-tabs"  style="height:100%;">
			<div title="首页">
				<div style="padding:20px;">
					首页中的内容
				</div>
			</div>
			<div title="通讯录">
				<div style="overflow:auto;padding:20px;">
					通讯录中的内容
				</div>
			</div>
			<div title="企业服务">
				<div style="overflow:auto;padding:20px;">
					企业服务中的内容
				</div>
			</div>
			<div title="收件箱">
				<div style="overflow:auto;padding:20px;">
					企业服务中的内容
				</div>
			</div>
			<div title="草稿箱" data-options="closable:true">
				<div style="overflow:auto;padding:20px;">
					企业服务中的内容
				</div>
			</div>
			<div title="文件中心" data-options="closable:true">
				<div style="overflow:auto;padding:20px;">
					欢迎使用文件中心中的内容
				</div>
			</div>
		</div>
	</div>
</body>
```

JS代码：

```
$(function(){
	//点击每个div在选项卡中添加对应内容
	$("ul li div").click(function(){
		//得到点击的内容
		var title = $(this).html();
		//判断该选项是否存在
		var exists = $("#tt").tabs("exists",title);
		if(exists){
			//如果存在，则显示选中的面板
			$("#tt").tabs("select",title);
		}else{
			add(title);
		}
	});
});
function add(title){
	$('#tt').tabs('add',{    
	    title:title,    
	    content:'<div style="overflow:auto;padding:20px;">' + title + ' Body </div>',    
	    closable:true,    
	    tools:[{    
	        iconCls:'icon-mini-refresh',    
	        handler:function(){    
	            alert('refresh');    
	        }    
	    }]    
	});  
}
```

以上便是Tabs的基本用法。





