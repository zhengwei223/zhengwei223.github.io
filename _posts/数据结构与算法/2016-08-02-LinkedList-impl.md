---
layout: post
title: java实现链表简单示例
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法
description: 
author: 郑未
importance: 4
order: 1
---

**做开发，经常扮演两种角色，1 开发者  2 使用者** 

使用API，自己就是使用者，了解API中的接口及方法的说明，按照要求的功能来使用即可

设计一个功能的时候，自己就是开发者，你要站在使用者的角度去想，他们需要什么功能，我们提供什么功能？这个思考过程的产出物就是**接口**。

# 定义接口
例如我们要实现一个线性表，使用者就需要增删查改的功能，在设计功能的时候，不要一开始就去思考细节，而应该先把功能定义出来，Java定义功能的方式就是定接口，所以要先定一个ISeqList这样的接口：

``` java	
/**
* 线性表的功能接口，该线性表没有对元素的个数限制（只要内存足够）<br>
* 插入数据元素<br>
* 根据索引删除数据元素<br>
* 获取数据元素（根据索引）<br>
* 替换数据元素<br>
* 取线性表中数据元素个数<br>
* 判断线性表是否为空<br>
* @author  zhengwei223@qq.com
* @version 2015年6月26日
* @see ISeqList
* @since
*/

public interface ISeqList {
	/**Description: 将新元素添加到线性表中<br>
	* @param element 新元素
	* @see
	*/
	void add(Object element);
	
	/**
	* 
	* Description:根据指定的索引删除元素 <br>
	* <br>
	* <br>
	* 
	* @param index 索引
	* @see
	*/
	void delete(int index);
	/**
	* 
	* Description:根据指定的索引获得对应位置的元素 <br>
	* <br>
	* <br>
	* 
	* @param index 索引
	* @return 
	* @see
	*/
	Object get(int index);
	
	/**
	* 
	* Description:使用element替换指定索引处的元素 <br>
	* <br>
	* <br>
	* 
	* @param index 替换的位置
	* @param element  新元素
	* @see
	*/
	void update(int index,Object element);
	/**
	* 
	* Description: 得到当前线性表的元素个数<br>
	* <br>
	* <br>
	* 
	* @return 
	* @see
	*/
	int size();
	/**
	* 
	* Description:是否为空 <br>
	* <br>
	* <br>
	* 
	* @return 
	* @see
	*/
	boolean isEmpty();
}
```



# 实现接口

抽象出功能后，倒逼式地分析，要完成这些功能，需要哪些数据？这些数据是调用者提供（参数）还是内部维护（属性与依赖）？
	
	链表：
		-元素个数
		-是否为空
		-头指针-->指向第一个元素
		-尾指针-->指向最后一个元素

我们再来看每个元素的结构，每个元素应该由两个指针域，一个数据域

	元素：
		前驱
		后继
		元素


找到自认为全部的属性和依赖之后，可以开始尝试去实现功能，在实现功能的过程中，如果发现属性或者依赖不足，再去补充。

# 示例代码

`未实现删除和更新，重点实现了新增和插入`

``` java
    
public class LinkedList implements ISeqList {
	private Entry head;
	private Entry last;
	private int size = 0;// 元素个数

	@Override
	public void add(Object obj) {
		// 加第一个元素
		if (size == 0) {
			head = new Entry(obj, null, null);
			last = head;
		} else {
			Entry temp = new Entry(obj, last, null);
			last.next = temp;
			last = temp;
		}
		size++;
	}

	@Override
	public void insert(int i, Object obj) throws Exception {
		// 加第一个元素
		if (size == 0 && i == 0) {
			head = new Entry(obj, null, null);
			last = head;
		} else {
			Entry temp = new Entry(obj, null, null);

			Entry e = get(i);
			// 交换指针
			e.pre.next = temp;
			temp.next = e;
			temp.pre = e.pre;
			e.pre = temp;
		}
		size++;

	}

	/**
	 * 得到第i个与元素
	 * 
	 * @param i
	 * @return
	 */
	private Entry get(int i) {
		// 找到i指向的那个元素
		Entry e = head;
		int j = 0;
		while (j < i) {
			e = e.next;
			j++;
		}
		return e;
	}

	@Override
	public Object delete(int i) throws Exception {
		return null;
	}

	@Override
	public void update(int i, Object obj) throws Exception {

	}

	@Override
	public Object getData(int i) throws Exception {
		return get(i).value;
	}

	@Override
	public int size() {
		return size;
	}

	@Override
	public boolean isEmpty() {
		return size == 0;
	}
	
	class Entry {
		Object value;
		Entry pre;
		Entry next;
	
		public Entry(Object value, Entry pre, Entry next) {
			super();
			this.value = value;
			this.pre = pre;
			this.next = next;
		}
	
		@Override
		public String toString() {
			return value.toString();
		}
	}
}
```


    
