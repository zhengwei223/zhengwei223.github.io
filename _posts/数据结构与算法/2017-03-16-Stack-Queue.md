---
layout: post
title: 数据结构：栈和队列
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 栈 队列
description: 本文介绍两个基本的顺序结构：栈和队列。
author: 郑未
---

# 栈和队列 #

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
