---
layout: post
title: 数据结构：顺序表、栈、队列
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 栈 队列
description: 本文介顺序表、栈、队列的数组实现和链式存储实现，并且会展示Java中抽象、继承、接口的思考方式与具体运用。
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

## 抽象

我们先来定义动态集合、顺序表、栈和队列的接口，然后再来实现它们：


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
        void add(Object e);

        /**
         * 按关键字移除元素
         * 
         * @param o
         * @return
         */
        void remove(Object key);
    }

顺序表：

    /**
     * 顺序表
     * @author zhengwei
     *
     */
    public interface IList extends ICollection {
        /**
         * 求指定元素的下标，没有这个元素就返回-1
         * @param e
         * @return
         */
        int indexOf(Object e);
        /**
         * 获取指定下标处的元素
         * @param index
         * @return
         */
        Object get(int index);
        /**
         * 在指定下标处插入元素
         * @param e
         * @param index
         */
        void add(Object e,int index);
        /**
         * 删除指定下标处的元素
         * @param index
         */
        void delete(int index);
    }

栈：

    /**
     * 描述栈的基本操作
     * @author zhengwei lastmodified 2017年3月16日
     *
     */
    public interface IStack extends IList {
        void push(Object e);
        Object pop();
    }

队列：

    /**
     * 描述队列的基本操作
     * @author zhengwei lastmodified 2017年3月16日
     *
     */
    public interface IQueue extends IList {
        void enqueue(Object e);
        Object dequeue();
    }

## 实现1：数组

[这里先提供一个没有考虑扩容的基于数组的顺序表的实现](/ref/ArrayList-impl)，这个实现是有问题的，因为没考虑到已经存满了元素再增加元素的情况且不严格维持元素的先后顺序，怎么解决？

## 实现2：数组改进版

这一次我们充分考虑元素紧密排列的需求和扩容的要求，看[代码](/ref/ArrayList-impl2)。


## 实现2：链表

链表中元素也按线性顺序排列。数组的线性顺序有下标决定，在内存中数组元素的地址本来就是连续的：

![](/public/img/algorithm/linear-list-array.jpg)

与数组不同的是，在 **链表** 中，元素顺序由各对象中的指针决定，相邻元素之间在物理内存上**不一定相邻**。链表为动态集合提供了一种简单而灵活的表示方法，并且能支撑上面接口定义的所有操作。链表有单链表和双链表及循环链表。书中着重介绍了双链表的概念及操作，双链表L的每一个元素是一个对象，每个对象包含一个关键字和两个指针：next和prev。链表的操作包括插入一个节点、删除一个节点和查找一个节点，重点来说一下双向链表的插入和删除节点操作，图例如下：

![](/public/img/algorithm/linear-list-linked.png)

链表是最基本的数据结构，凡是学计算机的必须的掌握的，在面试的时候经常被问到。可以到这里看看[我的代码](/ref/LinkedList-impl)

## 队列 ##

有了基于数组和链表的实现，再来实现队列就很简单了：

    public class QueueImpl extends LinkedList implements IQueue {
    
    	@Override
    	public void enqueue(Object e) {
    		super.add(e);
    	}
    
    	@Override
    	public Object dequeue() {
    		Object firstElement = super.get(0);
    		super.delete(0);
    		return firstElement;
    	}
    
    }

测试用例：

    import static org.assertj.core.api.Assertions.*;
    import org.junit.Test;
    public class QueueImplTest {
    	@Test
    	public void testEnqueue() {
    		IQueue queue = new QueueImpl();
    		queue.enqueue(1);
    		queue.enqueue(2);
    		queue.enqueue(3);
    		assertThat(queue.dequeue()).isEqualTo(1);
    		assertThat(queue.dequeue()).isEqualTo(2);
    		assertThat(queue.dequeue()).isEqualTo(3);
    	}
    }

## 栈 ##

同样，栈可以继承`LinkedList`:

    public class StackImpl extends LinkedList implements IStack {
    
    	@Override
    	public void push(Object e) {
    		super.add(e);
    	}
    
    	@Override
    	public Object pop() {
    		int index = super.size()-1;
    		Object lastElement = get(index);
    		super.delete(index);
    		return lastElement;
    	}
    
    }

测试用例：

    import static org.assertj.core.api.Assertions.*;
    import org.junit.Test;
    public class StackImplTest {
    
    	@Test
    	public void testPush() {
    		IStack stack = new StackImpl();
    		stack.push("e1");
    		stack.push("e2");
    		stack.push("e3");
    		assertThat(stack.pop()).isEqualTo("e3");
    		assertThat(stack.pop()).isEqualTo("e2");
    		assertThat(stack.pop()).isEqualTo("e1");
    		assertThat(stack.size()).isEqualTo(0);
    	}
    }






