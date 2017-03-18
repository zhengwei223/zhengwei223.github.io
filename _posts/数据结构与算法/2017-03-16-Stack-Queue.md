---
layout: post
title: 数据结构：顺序表、栈、队列的数组实现
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 栈 队列
description: 本文介顺序表、栈、队列的数组实现，并且会展示Java中抽象、继承、接口的思考方式与具体运用。
author: 郑未
---

# 基本概念

## 集合

数据结构中的集合概念和数学中的集合概念类似，表示若干元素的整体。A = {a0,a1,a2...an}。
这样看来数组其实就是一个集合，对吧！

## 动态集合

数组中的元素一旦确定一般不会改变，而且一般计算机语言不允许数组动态变长或者变短。
那么数组就解决不了存储不可预估数量的元素的问题，因此我们需要别的结构，这类结构叫做动态集合。

## 顺序表（线性表）

顺序表是一种特殊的动态集合，每个元素有唯一的前驱（第一个元素前驱表示为NIL），有唯一的后继（最后一个元素的后继为NIL）。数组就是有边界的顺序表：

![](/public/img/algorithm/table.png)

顺序表的元素因为有这样的特性，往往可以给每个元素一个标定位置的数字，我们称为下标，从0开始

## 顺序表之栈与队列

栈和队列又是特殊的顺序表，它们有独特的操作要求，栈要求先进后出，队列要求先进先出，双向队列可以两端出入，它们一般不允许在随意位置插入元素。

## 树

树是一种特殊的动态集合。其元素我们称之为节点，一棵树如果没有节点则表示为NIL，任何一个节点可以有若干子节点，但是只能有至多一个父节点。

![](/public/img/algorithm/tree.png)

## 图Graph

图也是一种特殊的动态集合。每个元素可以有若干前驱，可以有若干后继。

![](/public/img/algorithm/graph.jpg)

# 抽象、接口与继承体系

从上面描述，你可以发现，动态集合是特殊的集合，表、树、图是特殊的动态集合，顺序表是特殊的表，栈和队列时特殊的顺序表……其实二叉树是特殊的树，二叉搜索或完全二叉树是特殊的二叉树，有向图和无向图是特殊的图……

无论在计算机术语还是在显示生活中我们总能够找到这种一般到特殊的关系，它不同于简单的数量对应关系，在面向对象编程语言中，这样的关系往往表示为继承关系（实现接口是一种特殊的继承）。

在代码实践中，可以自顶向下开始从抽象到具体，其实也可以自下而上地先具体再规约，因为人们往往很难一下就想清楚整个的继承体系，往往遇到多个具体结构之后才发现它们有相似之处然后再规约出一个比较高级的抽象类来统摄这些具体子类。


# 从动态集合到栈、队列 #

## 简介 ##

栈和队列都是动态集合，元素的出入是规定好的。栈规定元素是先进后出（FILO），队列规定元素是先进先出（FIFO）。栈和队列的实现可以采用数组和链表进行实现。



> 栈、队列、向量都是**逻辑结构**中的顺序表，逻辑结构总共三类——表、树、图，而数组和链表是数据的**物理结构**，即数据是如何在内存中组织的。

## 集合的基本操作抽象 ##

栈和队列是集合的一种具体类型，所以这里可以利用面向对象里面的抽象和继承，事先定义好接口，然后再去具体实现，如果多种实现有相同的代码，就可以把相同的部分抽取为公共父类，以达到代码重用的目的。

    /**
     * 定义动态集合上的基本操作
     * @author zhengwei lastmodified 2017年3月16日
     *
     */
    public interface ICollection {
    	/**
    	 * 根据关键字搜索出对应对象
    	 * 
    	 * @param key
    	 * @return
    	 */
    	Object search(Object key);
    
    	/**
    	 * 元素个数
    	 * 
    	 * @return
    	 */
    	int size();
    
    	/**
    	 * 集合是否为空
    	 * 
    	 * @return
    	 */
    	boolean isEmpty();
    
    	/**
    	 * 集合是否包含某个关键字元素
    	 * 
    	 * @param o
    	 * @return
    	 */
    	boolean contains(Object key);
    
    	/**
    	 * 在集合中新增一个元素
    	 * 
    	 * @param e
    	 * @return
    	 */
    	boolean add(Object e);
    
    	/**
    	 * 按关键字移除元素
    	 * 
    	 * @param o
    	 * @return
    	 */
    	boolean remove(Object key);
    }

栈的基本操作包括入栈push和出栈pop，栈有一个栈顶指针top，指向最新如栈的元素，入栈和出栈操作操作都是从栈顶端进行的。

    /**
     * 描述栈的基本操作
     * @author zhengwei lastmodified 2017年3月16日
     *
     */
    public interface IStack extends ICollection {
    	void push(Object e);
    	Object pop();
    }

队列的基本操作包括入队enqueue和出队dequeue，队列有队头head和队尾tail指针。元素总是从队头出，从队尾入。

    /**
     * 描述队列的基本操作
     * @author zhengwei lastmodified 2017年3月16日
     *
     */
    public interface IQueue extends ICollection {
    	void enqueue(Object e);
    	Object dequeue();
    }

## 栈的简单实现

    public class StackImpl implements IStack {
        private Object[]    data    = new Object[20];
        private int         top     = 0;
        //……

        @Override
        public void push(Object e) {
            data[top++] = e;
        }

        @Override
        public Object pop() {
            return data[--top];
        }

    }

## 队列的简单实现

    public class QueueImpl implements IQueue {
        private Object[]    data    = new Object[20];
        private int             head    = 0;
        private int             tail    = 0;


        @Override
        public void enqueue(Object e) {
            data[tail++] = e;
        }

        @Override
        public Object dequeue() {

            return data[head++];
        }

    }

但是这份代码是有bug的，正如栈的实现一样，我们没考虑空间的扩展。
而且对于栈来说，出栈后腾出来的空间压栈的元素可以再次利用，
但是队列的这个实现，出队列之后tail指针后移，进队列时head指针也在后移，那数组前面一截的空间就浪费了。这个问题该怎么解决呢？
(/public/img/algorithm): 
[]: 
