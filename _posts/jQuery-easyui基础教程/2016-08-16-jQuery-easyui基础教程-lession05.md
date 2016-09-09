---
layout: post  
title: 拖放的学校课程表    
category: jQuery-easyui基础教程  
tags: Git jQuery EasyUI 项目 实战  
author: 李彩琴  
keywords: lanqiao 蓝桥 培训 教程 jQuery EasyUI 项目 实战  
description:
  
---


##### HTML代码：

```
<div class="left">
	<table>
		<tr>
			<td><div class="item">English</div></td>
		</tr>
		<tr>
			<td><div class="item">Science</div></td>
		</tr>
		<tr>
			<td><div class="item">Java</div></td>
		</tr>
		<tr>
			<td><div class="item">Math</div></td>
		</tr>
		<tr>
			<td><div class="item">OS</div></td>
		</tr>
		<tr>
			<td><div class="item">Math</div></td>
		</tr>
		<tr>
			<td><div class="item">JavaScript</div></td>
		</tr>
		<tr>
			<td><div class="item">Oracle</div></td>
		</tr>
		<tr>
			<td><div class="item">SpringMVC</div></td>
		</tr>
		<tr>
			<td><div class="item">MyBatis</div></td>
		</tr>
	</table>
</div>
<div class="right">
	<table>
		<tr>
			<td class="blank"></td>
			<td class="title">Monday</td>
			<td class="title">Tuesday</td>
			<td class="title">Wednesday</td>
			<td class="title">Thursday</td>
			<td class="title">Friday</td>
		</tr>
		<tr>
			<td class="time">08:00-09:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">09:10-10:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">10:10-11:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">11:10-12:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">14:00-15:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">15:10-16:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">16:10-17:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">17:10-18:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">19:10-20:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
		<tr>
			<td class="time">20:10-21:00</td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
			<td class="drop"></td>
		</tr>
	</table>
</div>
```  


##### JS代码：

```
$(function() {
	/**
	  * 设置可拖动
	  */
	$('.left .item').draggable({
		revert : true,
		proxy : 'clone'
	});
	/**
	  * 设置放置区
	  */
	$('.right td.drop').droppable({
		//在被拖拽元素到放置区内的时候触发
		onDragEnter : function() {
			$(this).addClass('over');
		},
		//在被拖拽元素经过放置区的时候触发
		onDragLeave : function() {
			$(this).removeClass('over');
		},
		//在被拖拽元素放入到放置区的时候触发
		onDrop : function(e, source) {
			$(this).removeClass('over');
			if ($(source).hasClass('assigned')) {
				$(this).append(source);
			} else {
				var c = $(source).clone().addClass('assigned');
				$(this).empty().append(c);
				c.draggable({
					revert : true
				});
			}
		}
	});
});
```

效果如下：

![image](http://i.imgur.com/FbgSoi8.png)

![image](http://i.imgur.com/e3gk1e9.png)

**参考代码:[05/school_timetable.html](https://coding.net/u/lanqiao/p/easyuiDemo/git/blob/master/05/school_timetable.html)**

综上所述，便是可拖放的学校课程表。

