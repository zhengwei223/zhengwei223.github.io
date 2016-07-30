---
layout: post
title: Shiro及安全基本概念
category: shiro
tags: shiro
author: 郑未
keywords: lanqiao 蓝桥 全栈 shiro 教程
description: 
importance: 1
---

shiro是一个强大灵活的开源安全框架，可以干净利落的处理认证、授权、企业会话管理和加密。

shiro的首要目标是简单和易于理解。安全有时候是非常复杂令人头疼的问题，shiro隐藏了复杂
的细节，暴露了简介直观的API来简化开发者使他们的应用程序更安全的努力。

 

shiro可以做一下事情：

- 进行用户认证

- 执行访问控制

- 单点登录

- Remember Me服务

 

安全的一些概念：身份认证、授权、会话管理、加密被认为是构成应用安全的基础要素。

- 身份认证，就是验证用户身份，典型的“登录”过程就是身份认证的过程。

- 授权：也就是访问控制（ac），也即某用户可以可以使用应用的哪些功能？

- 会话管理：管理用户特定的会话，即使在非Web或EJB应用。

- 加密：保持数据的安全使用的加密算法，同时仍然易于使用。

对于Session，在WEB应用中它基于HttpSession，而一般应用中默认使用企业会话管理。shiro的Session用起来和HttpSession差不多，并且使用它不需要Http环境。

在最高的层次上讲，shiro主要有三个主要的概念，它们分别是Subject、SecurityManager和Realms。

shiro使用Subject这一概念来描述当前用户，‘User’这个词通常隐含的指一个人，但是Subject可以是一个人也可以代表第三方服务，守护账户，定时作业，或者其他类似的与软件交互的事物。

所有Subject实例都与一个SecurityManager绑定，当你和一个Subject交互时，所有交互都会通过SecurityManager转换为特定Subject的交互。

SecurityManager是shiro架构的核心，它扮演‘保护伞’对象的角色，与其他内部安全组件一起构成对象图的核心。

SecurityManager及其内贸部对象图一旦被应用配置，它基本上就被放在一边不再被程序员使用了，开发人员基本上总是在与Subject的相关API打交道。它在幕后支持Subject的安全操作。

Realms在shiro与你的应用程序的安全数据之间充当着桥梁或者说是连接器的作用。从这种意义上讲，Reaml就是一个特定的安全DAO，它为shiro提供所需的数据。在配置shiro时，你必须为认证、授权指定至少一个可用的Realm。

shiro提供了现成的Realm连接到LDAP、关系数据库（JDBC）、ini和properties文件等。用户可以使用自己的Realm。