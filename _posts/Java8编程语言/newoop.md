---
layout: post
title: 批量生产——从类到对象
category: 初学者的第一套Java教程
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 OOP 类 对象 
description: 高级面向对象
author: 付天有
importance: 2
order: 8
---

# 实验一 管理多个牌局的问题

> 之前我们完成了一副扑克牌的洗牌和发牌。如果程序升级为网络游戏，支持很多玩家同时玩扑克，每三个人凑成一局并发牌。

## 1 类外部调用static方法

	package chapter06.main;//声明当前类的包路径
	
	import chapter06.Poker4;//导入所要使用的外部类
	
	public class GameCenter {
		
		public static void main(String[] args) {
			
			int[] player1;//玩家1加入游戏
			int[] player2;//玩家2加入游戏
			int[] player3;//玩家3加入游戏
			//初始化牌堆,准备为玩家1，2，3发牌
			Poker4.init();//类名.方法名来在类外部调用方法
			player1 = Poker4.deal(3);//玩家1发3张牌
			player2 = Poker4.deal(3);//玩家2发3张牌
			player3 = Poker4.deal(3);//玩家3发3张牌
			
			int[] player4;//玩家4加入游戏
			int[] player5;//玩家5加入游戏
			int[] player6;//玩家6加入游戏
			
			//初始化牌堆,准备为玩家4，5，6发牌
			Poker4.init();
			
			player4 = Poker4.deal(3);//玩家4发3张牌
			player5 = Poker4.deal(3);//玩家5发3张牌
			player6 = Poker4.deal(3);//玩家6发3张牌
			
			//此时，player1叫牌，需要从牌堆派1张牌
			int [] player1NewCard = Poker4.deal(1);
		}
	}

## 使用包管理代码

上述代码中，在第一行我们声明了`package chapter06.main;`,表示类是在`classpath`目录下的`chapter06.main`包中。在操作系统中，相当于当前`chapter06/main`的目录结构。并支持更多层级的包结构。例如：`com.lanqiao.chapter06.main`。

Java中包的概念就和操作系统中文件夹的概念一样，我们会把硬盘上的文件，放在不同的文件夹中，通过文件路径，可以精确的获取到唯一一个文件。同样我们可以用包名+类名来确定唯一的类。

**包的导入**

使用包可以将功能相似的若干类保存在一个文件目录之中，但是这样一来就有可能出现包之间的互相访问的问题，当一个程序需要其他包中类的时候可以通过`import`关键字完成导入操作，我们之前经常使用的`Scanner`类就是通过`import java.util.Scanner`来导入使用的。**相同包内的类无需相互导入**

当我们需要导入一个包的的多个类是，可以通过`包路径.*`的方式导入当前包的所有类。

`java.lang`是Java默认运行时载入的包，不需要import就可以使用其中的类，例如我们常用的`System`类。

## 牌堆的问题

不知道大家有没有发现这段程序的问题。

![](/public/img/Java8/poker_problem.png)

问题就在于，成立多个牌局时，我们操作的都是同一个数据成员。如果沿用当下的方法，我们就不得不做多个和`Poker4`同样的类。显然这样会很笨拙。

也就是说，我们希望每一个牌局都可以拥有自己的一副牌，然后根据这副牌进行发牌动作。

## 类和对象

