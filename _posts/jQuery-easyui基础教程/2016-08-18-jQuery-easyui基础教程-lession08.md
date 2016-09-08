---
layout: post  
title: Tooltip提示框    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  

---
# 课程目标

- 掌握Tooltip的使用方法


# Tooltip

## Tooltip简介

  
当用户将鼠标移动到元素上的时候，将会显示一个消息提示框。提示框的内容可以是页面中任何一个HTML元素或者通过Ajax发送后台请求以获取提示框内容。效果如图：

![image](http://i.imgur.com/XaCmQCt.png) 

## 开发Tooltip程序

```
<a href="#" title="This is the tooltip message." data-options="position: 'right'" class="easyui-tooltip">Hover me</a>
```  

**参考代码:[08/tooltip01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/08/tooltip01.html)**

只需要简单的给```<a>```标签添加一个指定的class样式即有提示框的效果。效果如下图：

![image](http://i.imgur.com/R9lOTPe.png)

## Tooltip常用属性

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="200px">属性名</th>
      <th width="180px">属性值类型</th>
      <th width="600px">描述</th>
      <th width="100px">默认值</th>
   </tr>
   <tr>
      <td>position</td>
	  <td>string</td>
	  <td>消息框位置。可用值有："left","right","top","bottom"</td>
	  <td>bottom</td>
   </tr>
   <tr>
      <td>content</td> 
	  <td>string</td> 
	  <td>消息框内容。</td>
	  <td>null</td>
   </tr>
   <tr>
      <td>trackMouse</td> 
      <td>boolean</td> 
      <td>为true时，允许提示框跟着鼠标移动。</td> 
      <td>false</td>
   </tr>
   <tr>
      <td>deltaX</td> 
      <td>number</td> 
      <td>水平方向提示框的位置。</td> 
      <td>0</td>
   </tr>
   <tr>
      <td>deltaY</td> 
      <td>number</td> 
      <td>垂直方向提示框的位置。</td> 
      <td>0</td>
   </tr>
   <tr>
      <td>showEvent</td> 
      <td>string</td> 
      <td>当激发什么事件的时候显示提示框。</td> 
      <td>mouseenter</td>
   </tr>
   <tr>
      <td>hideEvent</td> 
      <td>string</td> 
      <td>当激发什么事件的时候隐藏提示框。</td> 
      <td>mouseleave</td>
   </tr>
   <tr>
      <td>showDelay</td> 
      <td>number</td> 
      <td>延时多少秒显示提示框。</td> 
      <td>200</td>
   </tr>
   <tr>
      <td>hideDelay</td> 
      <td>number</td> 
      <td>延时多少秒隐藏提示框。</td> 
      <td>100</td>
   </tr>
</table>


## Tooltip常用方法  

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">方法名</th> 
      <th width="300px">方法参数</th> 
      <th width="600px">描述</th>
   </tr>
   <tr>
      <td>options</td> 
      <td>none</td> 
      <td>返回控件属性对象。</td>
   </tr>
   <tr>
      <td>tip</td> 
      <td>none</td> 
      <td>返回tip元素对象。</td>
   </tr>
   <tr>
      <td>arrow</td> 
      <td>none</td> 
      <td>返回箭头元素对象。</td>
   </tr>
   <tr>
      <td>show</td> 
      <td>e</td> 
      <td>显示提示框。</td>
   </tr>
   <tr>
      <td>hide</td> 
      <td>e</td> 
      <td>隐藏提示框。</td>
   </tr>
   <tr>
      <td>update</td> 
      <td>content</td> 
      <td>更新提示框内容。</td>
   </tr>   
   <tr>
      <td>reposition</td> 
      <td>none</td> 
      <td>重置提示框位置。</td>
   </tr>   
   <tr>
      <td>destroy</td> 
      <td>none</td> 
      <td>销毁提示框。</td>
   </tr>
</table>  


## Tooltip常用事件

<table class="table table-bordered table-striped table-condensed">
   <tr>
      <th width="300px">事件名</th>
	  <th width="300px">事件参数</th>
	  <th width="600px">描述</th>
   </tr>
   <tr>
      <td>onShow</td>
	  <td>e</td>
	  <td>在显示提示框的时候触发。</td>
   </tr>
   <tr>
      <td>onHide</td>
	  <td>e</td>
	  <td>在隐藏提示框的时候触发。</td>
   </tr>
   <tr>
      <td>onUpdate</td>
	  <td>content</td>
	  <td>在提示框内容更新的时候触发。</td>
   </tr>
   <tr>
      <td>onPosition</td>
	  <td>left,top</td>
	  <td>在提示框位置改变的时候触发。</td>
   </tr>
   <tr>
      <td>onDestroy</td>
	  <td>none</td>
	  <td>在提示框被销毁的时候触发。</td>
   </tr>
</table> 

参考jQuery EasyUI的API。

代码如下：

```
$('#dd').tooltip({    
	position: 'bottom',    
	trackMouse:true,
	content: '<span style="color:#000">This is the tooltip message.</span>',    
	onShow: function(){        
		$(this).tooltip('tip').css({     
			backgroundColor: 'yellow',            
			borderColor: '#666'        
		});    
	},
	onPosition: function(){
			$(this).tooltip('tip').css('left', $(this).offset().left);
			$(this).tooltip('arrow').css('left', 20);
		}
});

```

```
<div id="dd"></div>
```

**参考代码:[08/tooltip01.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/08/tooltip01.html)**

效果如下图：

![image](http://i.imgur.com/SVhKKlP.png)


以上便是Tooltip的基本用法。





