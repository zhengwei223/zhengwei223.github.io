---
layout: post
title: 面试题精华之Servlet&JSP
category: JavaEE面试
tags: 面试 Servlet JSP
keywords: 蓝桥 lanqiao 教程 面试 Servlet JSP 
description: 
author: 郑未
importance: 4
order: 1
---

编号 |	问题 | 扩展 
---- | ---- | --- | ---	
1 | 	请描述Servlet容器的作用？ | 	其基本的工作流程是什么？
2 | 	请解释Jsp和Servlet的联系与区别 | 	Servlet的执行过程\Jsp的执行过程
3 | 	请解释转发与重定向的区别	
4 | 	请解释get请求和post请求的区别	
5 | 	有时候需要把请求参数转换为非String类型，如int类型，你是怎么做的？ | 这中间容易出现什么异常？
6 | 	你是怎么解决乱码问题的？	
7 | 	你是怎么实现文件上传的？	
8 | 	你在什么情况下使用过Session？完成了什么功能？	
9 | 	什么是MVC？	
10 | 	如何对代码进行分层？ | 有哪些层？每个层是什么含义？如何解除各层级之间的耦合？
11 | 	请解释Cookie与Session的联系与区别。 | 如何实现记住用户名或者记住密码这个功能？
12 | 	如何用C-Foreach标签配合el表达式生成一个页面上的表格？	
13 | 	你用Filter完成过什么功能？	
14 | 	你用Listener完成过什么功能？	
15 | 	jsp有哪些常用内置对象？	挑选其中一些内置对象问其含义！
16 | 	include指令和jsp:include有什么区别？	
17 | 	哪些数据可以共享在session当中（session资源是比较宝贵的）？	
18 | 	哪些数据可以共享在application中？	
19 | 	Servlet是不是线程安全的？ | 针对线程安全问题，使用Servlet需要注意些什么？
21 | 	你希望表单提交的时候某个值被提交，但是不希望它显示在页面上，你会怎么做？ | （隐藏域）
22 | 	用什么方式让Servlet返回json字符串，而不是跳转页面？ | 考察输出流
23 | 	404错误是什么含义？	 | 如何配置界面友好的404页面？
24 | 	500错误是什么含义？	 | 如何配置界面友好的500页面？
25 | 	tomcat的端口可以在哪个文件中修改？	
26 | 	Servlet3.0用哪个注解标注Servlet	 | 如何用注解给Servlet指定初始化参数？
27 | 	请描述利用mvc思维完成一个单表增删改差的思路！	
28 | 	jdbc连接数据库的基本步骤是什么？请说出伪代码！	
29 | 	PreparedStatement和Statement有什么区别？	
30 | 	请总结web.xml可以配置哪些东西	 | 首页、监听、Servlet、Filter、统一的错误展示页面
31 | 	HTTP响应状态码常见的有哪些？是什么含义？ | 200、404、500、401、403……