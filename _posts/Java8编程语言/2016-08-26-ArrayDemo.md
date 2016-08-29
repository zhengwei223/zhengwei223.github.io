---
layout: post
title: 运算符
category: Java8编程语言
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 运算符
description: 
author: 付天有
importance: 4
order: 7
---

# Java数组(基础篇)
数组无论在哪种编程语言中都算是最重要的数据结构之一，同时不同语言的实现及处理也不尽相同。但凡写过一些程序的人都知道数组的价值及理解数组的重要性，与链表一道，数组成为了基本的数据结构。

## 什么是数组

> 数组是一种特殊的数据类型，它描述了一组拥有相同数据类型的数据集合。

比如我们现实生活种的书柜、鞋柜。都是用来装放特定事物的容器。如果把一本书比作一个"图书"类型的变量，那么书架就可以理解为一个图书类型的数组。

![数组示意图](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/array.png)

## 为什么要使用数组

说到为什么要设计数组这种数据类型，思考一下为什么我们要使用书架？

当然，你会想到很多好处，如：便于管理图书、能够快速的定位到我想要找的图书、看起来更加简洁。

那么这些也正是数组存在的原因。

## 什么场景下需要使用数组

通常我们选择数据这种数据结构是要满足：

1. 一组变量拥有相同数据类型
2. 这些变量要拥有相同的表达意图
3. 这些变量的数量是已知或可预测

还是拿书架来做比较

1. 要明确需要一个容器来装书（而不会向书架中放一只鞋）
2. 书架中放的都是关于软件技术的书（如果搀杂了一本医学书一定会对你造成困扰，虽然你能这么做）
3. 你要知道你有基本书或者最多有多少书

下面我们来设计一个程序，计算班级内10个学生的英语成绩平均分。

用我们之前学习的变量和数据类型的知识，我们需要定义30个变量来存储每个人的英语成绩，然后再做运算计算出结果。但是有了数组，你一定会感觉非常的优雅和简洁。

**【程序清单 1.1】**

	public class Avg {
		public static void main(String[] args) {
			int[] scores = new int[]{88,76,90,89,70,95,99,85,66,89};
			int scoresCount = 0;
			for(int i=0;i < scores.length;i++){
				scoresCount += scores[i];
			}
			int avgResult = scoresCount/scores.length;
			System.out.println("班内平均成绩是："+avgResult);
		}
	}

**【运行结果 1.1】**

	班内平均成绩是：84

## 如何使用数组

通过上面的例子，我们对数组有了初步的认识，下面我们来介绍数组的具体使用方法。

### 数组基本要素

- 标识符：数组的名称，用于区分不同的数组
- 数组元素：向数组中存放的数据
- 元素下标：对数组元素进行编号，从0开始，数组中的每个元素都可以通过下标来访问
- 元素类型：数组元素的数据类型  

![数组基本要素](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/arrayElement.png)

### 数组的分类
通过数据组织方式的不同，可以把数组分为一维数组、二维数组...N维数组。

一维数组可以想象成一条线、二维数组可以想象成一个平面(矩阵)，三维数组可以想象成一个立方体。当然，在我们实际应用过程中，一维数组最为常见，高维数组通常会被一些数学天才应用。

![N维数组](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/mutiArray.png)

### 使用数组四部曲

#### 1. 声明数组

一维数组的声明方式：

	type var[]; 或 type[] var;
其中`type`为数据类型，var可以是任意合法的标识符

**注意**：声明数组时不能指定其长度（数组中元素的个数），`int scores[10];`是错误的声明

二维数组的声明:
	
	type var[][]; 或 type[][] var;

多维数组的声明相信大家可以举一反三了吧。
	
#### 2. 分配空间

这个过程是告诉计算机分配几个连续的空间
	
	int[] score;
	score = new int[10]; 分配一个10个int的一维连续空间
	int[][] arr2;
	arr2 = new int[5][5]; 分配一个5行5列的二维连续空间

#### 3. 赋值和引用

声明并赋值：

	int[] scores = new int[]{88,76,90,89,70,95,99,85,66,89};
	double m[][] = {
			{ 0 * 0, 1 * 0, 2 * 0, 3 * 0 },
	
			{ 0 * 1, 1 * 1, 2 * 1, 3 * 1 },
	
			{ 0 * 2, 1 * 2, 2 * 2, 3 * 2 },
	
			{ 0 * 3, 1 * 3, 2 * 3, 3 * 3 } };

需要注意的是"{}"这种赋值方式必须在声明时立刻赋值，且不能声明数组的长度，以下声明方式都是错误的：

	int[] scores;
	scores = {1,2,3,4,5};//错误！｛｝赋值只能跟在数组声明的时候。
	int[] arr = new int[3]{1,2,3};//错误！｛｝赋值不能指定数组长度

引用赋值：

我们可以通过数组的下标获取任意数组元素，并为其赋值

	int[] score = new int[30];
	Scanner input = new Scanner(System.in);
	for(int i = 0; i < 30; i ++){
	     score[i] = input.nextInt();
	}

注意：对于数组元素的引用和赋值要格外注意数组的下标，当所引用的下标超出了数组声明的长度，将会报出`java.lang.ArrayIndexOutOfBoundsException`异常

	int[] score = {10,11,52}; //score[0]=10;score[1]=11;score[2]=52;
	System.out.println(score[3]);//已经超出score数组的最大下标引用

#### 4. 数据处理

##### 数组的遍历：

遍历是数组的最基本操作：

	int[] scores = new int[]{88,76,90,89,70,95,99,85,66,89};
	for(int i=0;i < scores.length;i++){
		System.out.println("数组的第" + i + "位是" + scores[i]);
	}

以上代码就完成了遍历输出每一位数组元素。
这里用到了`数组对象.length`的方法来获取数组的长度

JDK1.5提供了一个增强的for循环来简化数组的遍历。

	for (int score : scores) {
		System.out.println(score);
	}

但是这中方式也有它的缺点，就是无法在循环体中获取数组的下标


##### 数组元素换位

	int[] scores = new int[]{88,76,90,89,70,95,99,85,66,89};
	//交换0号下标元素与9号下标元素
	int temp = scores[0];
	scores[0] = scores[9];
	scores[9] = temp;

数组元素的换位需要借助中间变量


# Java数组(进阶篇)

## 数组的排序

有时我们希望我们的数组按照一定顺序排列，这是就需要用到一些排序算法。排序的算法有很多，各种算法对空间的要求及时间效率也各有差别。其中插入排序和冒泡排序又被称作简单排序，它们对空间的要求不高，但时间效率不稳定。而其他一些排序相对于简单排序来说对空间的要求稍高一点，但时间效率却能稳定在很高的水平。关于空间要求和时间效率的问题，有兴趣的可以找其他参考资料研究一下。

### 冒泡排序

冒泡排序就是依次比较相邻的两个数，将小数放在前面，大数放在后面。
第一轮：首先比较第1个和第2个数，将小数放前，大数放后；然后比较第2个数和第3个数，将小数放前，大数放后，如此继续，直至比较最后两个数，将小数放前，大数放后；至此第一轮结束，将最大的数放到了最后。
第二轮：仍从第一对数开始比较，将小数放前，大数放后，一直比较到倒数第二个数（倒数第一的位置上已经是最大的数），第二轮结束，在倒数第二的位置上得到一个新的最大数（其实在整个数列中是第二大的数）。
按此规律操作，直至最终完成排序。由于在排序过程中总是小数往前放，大数往后放，类似于小的气泡往上升，所以称作冒泡排序。
通过上面的分析可以看出，假设需要排序的序列的个数是n，则需要经过n-1轮，最终完成排序。在第一轮中，比较的次数是n-1次，之后每轮减少1次。

![排序算法原理](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/bubble-sort.gif)

下面给出冒泡排序算法的实现：

**【程序清单1.2】**

	/**
	 * 冒泡排序算法实现
	 */
	public class BubbleSort {
		public static void main(String[] args) {
			int[] a = new int[]{88,76,90,89,70,95,99,85,66,89};//待排序数组
			int temp;
			//数组的长度可以通过“数组名.length”获得
			for (int i = 0; i < a.length-1; i++) {			//需要比较n-1轮
				for (int j = 0; j < a.length-i-1 ; j++) {	//根据a.length-i-1，每轮需要比较的次数逐轮减少1次
					if (a[j] > a[j+1]) {			//相邻数进行比较，符合条件进行替换
						temp = a[j];
						a[j] = a[j+1];
						a[j+1] = temp;
					}
				}
			}
		}
		
	}

### 插入排序

插入排序包括直接插入排序、二分插入排序、链表插入排序和希尔排序。接下来介绍最简单的直接插入排序。

直接插入排序存在两个表，一个是有序表，另一个是无序表。每次从无序表中取出第一个元素，把它插入到有序表的合适位置，使有序表仍然有序。
第一轮：比较无序表中前两个数，然后按顺序插入到有序表中，剩下的数仍在无序表中。
第二轮：把无序表中剩下的第一个数与有序表的两个数进行比较，然后把这个数插入到合适位置。
按此规律操作，直至无序表中的数全部插入到有序表，完成排序

![插入排序示意图](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/insert-sort.gif)

下面是插入排序算法实现：

**【程序清单1.3】**

	/**
	 * 插入排序算法实现
	 */
	public class InsertSort {
		public static void main(String[] args) {
			int[] arr = new int[] { 1, 5, 3, 6, 9, 2, 4, 7, 5, 8 };
			// 把数组分割成有序与无序两部分
			int temp;// 待插入数字
			int j; // 有序序列 最后一个元素的下标
			// 循环获取每一个待插入的元素
			for (int i = 1; i < arr.length; i++) {
				temp = arr[i];// a[i]即为待插入的数字
				// 从无序数列的第一项开始，此次与有序数列比较，为插入数组 留出位置 ，惊醒位移
				for (j = i - 1; j >= 0; j--) {
					System.out.println("待插入元素" + temp + " ,有序序列到第" + j);
					if (temp < arr[j]) {
						// 向后移位，给temp移出空间
						arr[j + 1] = arr[j];
					} else {
						break;// 无需在比
					}
				}
				arr[j + 1] = temp;// 此时temp已经找到自己的位置
			}
		}
	}

## 数组的查找

### 顺序查找算法

顺序查找算法的思路很简单：从表的第一个元素开始一个一个向下查找，如果有和目标一致的元素，查找成功；如果到最后一个元素仍没有目标元素，则查找失败。

	public class SimpleSearch {
		public static void main(String[] args) {
			int[] array = new int[]{1,2,29,3,95,3,5,6,7,9,12};//随机数列
			int searchKey = 95;
			for(int i=0;i<array.length;i++){  
	            if(array[i]==searchKey){  
	                System.out.println(searchKey + "在数组索引的第" + i + "位");
                	return;
	            }  
	        }  
	        System.out.println("未找到" + searchKey);
		}
	}


### 二分查找算法

二分查找前提是表是按递增或递减顺序的规范表(**有序**)。此次实验中我们使用的是递增表。
二分查找从表中间开始查找目标元素。如果找到一致元素，则查找成功。如果中间元素比目标元素小，则仍用二分查找方法查找表的后半部分（表是递增排列的），反之中间元素比目标元素大，则查找表的前半部分。

![二分查找](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/VB_img_131.jpg)

**【程序清单1.4】**

	public class BinarySearch {
		public static void main(String[] args) {
			int[] srcArray = { 5, 13, 19, 21, 37, 56, 64, 75, 80, 88, 92 };// 有序数组
			int searchKey = 56;
			int low = 0;
			int high = srcArray.length - 1;
			while (low <= high) {
				int middle = (low + high) / 2;
				if (searchKey == srcArray[middle]) {
					System.out.println(searchKey + "在数组索引的第" + middle + "位");
					return;
				} else if (searchKey < srcArray[middle]) {
					high = middle - 1;
				} else {
					low = middle + 1;
				}
			}
			System.out.println("未能找到" + searchKey);
		}
	}

