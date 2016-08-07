---
layout: post
title: 工程实践-lesson1
category: JavaEE全栈式项目化工程实践概述
tags: Java 全栈式 项目 工程
keywords: 蓝桥 lanqiao 教程 javaee 全栈
description: 
author: 邹炳泉
importance: 4
order: 1
---

# 认识Java
本文将介绍 Java 体系和 Java 的核心概念：JVM、JDK、JRE。同时我们会学到如何在 windows 系统中搭建 Java 开发环境，以及如何利用第三方工具进行 Java 程序的开发。并且在这一章里我们会先接触 Java 的第一个程序 Hello World！让我们一起进入 Java 语言的神奇世界吧！

## Java 简介 [了解]
Java 是一种面向对象的语言。于1995年，由 Sun 公司出品。虽然 Java 仅仅只产生了短短20年，但是它的发展是非常迅速的。在2009年4月20号，ORACLE 收购了 Sun 公司，也就是说 Java 这门语言现在归属于 ORACLE 这家公司门下。

在 Java 这门语言体系当中，最基础的部分就是 Java SE 部分，Java 的标准版本。它包括Java最基础的一些结构，包括面向对象的一些特性等等，同时它也是 Java 技术基础和核心。在 Java SE 的基础之上，又分为了 Java EE（Java 的企业版），应用于大型企业级应用的开发。Java ME 主要用于嵌入式开发。

Java的三个体系：

- JavaSE（J2SE）（Java2 Platform Standard Edition，java平台标准版）

- JavaEE(J2EE)(Java 2 Platform,Enterprise Edition，java平台企业版)

- JavaME(J2ME)(Java 2 Platform Micro Edition，java平台微型版)

![](/public/img/Java8/1.1.jpeg)

## Java语言的特点[了解]
- 简洁有效
- 可移植性
- 面向对象
- 解释型
- 适合分布式计算
- 拥有较好的性能
- 健壮、防患于未然
- 具有多线程处理能力
- 具有较高的安全性
- 是一种动态语言
- 是一种中性结构

不详细解释，这些特性最好是学完java之后再回过头来深入探索和总结。

## 基本工作原理【掌握】
在Java编程语言中，所有源码最初都用普通文本书写，并保存在后缀为.java的文本文件中。

进一步，源码文件被编译为.class文件——使用“编译器（Java Compiler）”。

.class文件并不能被处理器（CPU）直接处理——它是java虚拟机（JVM）的机器语言。

Java需要启动一个JVM实例来装载和运行.class文件中的字节码。

![](/public/img/Java8/1.2.gif)

因为虚拟机在不同操作系统上有不同的版本，所以.class文件可以在不同操作系统平台上被解释执行，换句话说，通过虚拟机同一个应用程序可以在不同的操作系统平台上运行，如下图所示：

![](/public/img/Java8/1.3.gif)

## Java平台（Java Platform）
Java平台是只有软件的平台，它运行在硬件平台之上。包含两部分内容：

- Java虚拟机
- Java API（application Programming Interface）

虚拟机的作用，前面有简单介绍；
API是一组庞大的构建好的组件的集合，它提供基础的、非常有用的功能，可以被应用程序直接使用。在Java中，这些组件是一个个的类（.class），他们按相关性被划分到不同的包（package）中。

![](/public/img/Java8/1.4.gif)

## JDK、JRE与JVM
**JDK** 叫 Java 开发工具包，基本功能是编译Java源码，对应命令为javac
**JRE** 叫 Java 运行环境，基本功能是启动虚拟机，对应命令为java
**JVM** 叫 Java 虚拟机，是运行java程序的程序

以上三部分都可以通过安装JDK一次性获得。

