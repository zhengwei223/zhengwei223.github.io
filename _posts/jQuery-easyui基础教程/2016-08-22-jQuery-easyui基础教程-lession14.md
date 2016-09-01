---
layout: post  
title: 自定义面板的外观效果    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 可以灵活修改EasyUI定义好的样式 


# 自定义面板的外观效果

## panel的组成分析

  
通常情况下，在 Windows XP 的资源管理器文件夹中，左侧的面板（panel）包含一些常见任务。 本教程向您展示如何通过 easyui 的面板（panel）插件来创建 XP 左侧面板。效果如图：

![image](http://i.imgur.com/BORx6Mq.png)

之前介绍过的panel、progressbar、dialog、tooltip等控件的效果均来自jQuery EasyUI包下的plugins子包中，如图：

![image](http://i.imgur.com/6FBzFcs.png)

本教程中我们想要修改panel的外观效果，即需要打开jquery.panel.js文件查看，通过查看该js文件，我们发现，panel的样式由.panel-header、.panel-body和.panel-footer等组成。此时显而易见，想改变panel的外观效果，修改.panel-header、.panel-body和.panel-footer等的样式即可。


**Tip:结合Firefox的查看器查看，可以更加清楚的了解每个样式。**

![image](http://i.imgur.com/wvtSscF.png)

panel的样式定义在jquery-easyui-1.5\themes\default\panel.css文件中。

**可以直接修改panel.css文件中的样式，这样所有涉及到的panel样式都会改变，不推荐使用该方式。**

在自定义的页面中重新定义.panel-header、.panel-body和.panel-footer等的样式即可。这样，其他的页面不受影响。

## 开发程序

```
<style>
.panel-body {
	background: #f0f0f0;
}

.panel-header {
	background: #fff url('../images/panel_header_bg.gif') no-repeat top right;
}

.panel-tool-collapse {
	background: url('../images/arrow_up.gif') no-repeat 0px -3px;
}

.panel-tool-expand {
	background: url('../images/arrow_down.gif') no-repeat 0px -3px;
}
</style>

<div style="width:200px;height:auto;background:#7190E0;padding:5px;">
	<div class="easyui-panel" title="Picture Tasks"	collapsible="true" style="width:200px;height:auto;padding:10px;">
		View as a slide show <br /> 
		Order prints online <br /> 
		Print pictures
	</div>
	<br />
	<div class="easyui-panel" title="File and Folder Tasks"	collapsible="true" style="width:200px;height:auto;padding:10px;">
		Make a new folder <br /> 
		Publish this folder to the Web <br /> 
		Share this folder
	</div>
	<br />
	<div class="easyui-panel" title="Other Places" collapsible="true" collapsed="true" style="width:200px;height:auto;padding:10px;">
		New York <br /> 
		My Pictures <br /> 
		My Computer <br /> 
		My Network Places
	</div>
	<br />
	<div class="easyui-panel" title="Details" collapsible="true" style="width:200px;height:auto;padding:10px;">
		My documents <br /> 
		File folder <br />
		<br /> 
		Date modified: Oct.3rd 2010
	</div>
</div> 
```  

以上便是如何修改panel的样式，通过本章节内容，大家应该会修改jQuery EasyUI提供的样式了。





