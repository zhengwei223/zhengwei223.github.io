---
layout: post
title: 可变长数组与泛型
category: 初学者的第一套Java教程
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 集合框架
description: Java集合框架
author: 付天有
importance: 2
order: 9
---

内容摘要

- 自定义增强型数组类（可以动态添加数组内容）
- 了解泛型
- ArrayList和LinkedList优缺点

# 实验一 完成增强的数组

## 1 前言

数组是一个我们经常使用的存储结构，可以方便的把一类事物看作一个整体统一管理。但是使用数组时，有几个比较显著的问题。

1. 我们使用数组时，必须要声明其长度。（很多情况下，我们存储对象可能并不知道要存多少个）
2. 当我们需要为数组添加或删除一个元素时，都需要重新copy出一个新数组。
3. 数组虽属于引用数据类型，但是却没有提供任何方法。

> 目的：封装一个增强的数组类型，改善上述几个问题。

## 2 抽象

目标：一个可以随意增加和删除元素的数组。

属性：存放数据的场所

行为：添加，删除，修改，获取某一元素，获取容器大小。

产出结果

	package chapter09;
	
	public interface ArrayPro {
		
		public void add(Object element);
		
		public void remove(int index);
		
		public void remove(Object o);
		
		public void set(int index,Object element);
		
		public Object get(int index);
		
		public int size();
		
	}

**抽象的结果往往可以是一个接口。接口的定义就是不需要关心内部实现，只关心宏观的定义即可。**

## 3 实现思路

增删改查这几个方法，操作的目标都是存储数据内容的容器，增强性的数组，本质上存储数据的场所还是数组，只不过在每个方法中对这个数组的处理方式是不同的。

**关键点**

1. 一个数组成员变量(Object[])，作为数据存储的场所，此时数组的每一个元素都为null。
2. 一个记录容器内有效数据的变量(int),这个数值仅能被add,remove事件所修改。
3. add动作有可能会超出初始化的数组容量，此时需要一个扩容机制。


## 4 构造方法和成员变量

	package chapter09;

	/**
	 * 可变长增强数组实现类
	 */
	public class ArrayProImpl implements ArrayPro{
		
		//存储数据的数组，抽象为Object类型，
		private Object[] elementData;
		
		//数组中已有数据的数量
		private int size;
		
		/**
		 * 无参构造方法，默认初始化10个数组空间，size初始化为0
		 */
		public ArrayProImpl() {
			this.elementData = new Object[10];
			this.size = 0;
		}
		
		/**
		 * 带有初始化容量设定的构造方法。根据传入容量初始化数组长度。
		 */
		public ArrayProImpl(int initialCapacity){
			this.elementData = new Object[initialCapacity];
			this.size = 0;
		}
		
		//暂时省略其他方法
	}

## 5 重写toString()及测试

	@Override
	public String toString() {
		String result = "容器内有" + size+"条数据，内置数组空间为"+this.elementData.length+"，元素分别是：";
		for (int i = 0; i < size; i++) {
			//拼接每一位元素
			result += this.elementData[i];
			if(i!=(size-1)){
				//非末尾追加,
				result+=",";
			}
		}
		return result;
	}

**关于toString**

toString()继承自`Object`类，以下是API中对Object中toString方法的实现描述。

> 返回该对象的字符串表示。通常，toString 方法会返回一个“以文本方式表示”此对象的字符串。结果应是一个简明但易于读懂的信息表达式。建议所有子类都重写此方法。 
Object 类的 toString 方法返回一个字符串，该字符串由类名（对象是该类的一个实例）、at 标记符“@”和此对象哈希码的无符号十六进制表示组成。换句话说，该方法返回一个字符串，它的值等于： 

		getClass().getName() + '@' + Integer.toHexString(hashCode())

请记住这个格式，日后我们编程如果看到了这类格式的文本，那么此处就是一个引用对象类型的toString()方法所返回的值。如`chapter09.ArrayProImpl@64883c`

`System.out.println(obj)`打印输出的就是obj.toString()所返回的字符串。

我们这里重写`toString()`的目的是为了方便查看容器内部的数据。

	public static void main(String[] args) {
		ArrayProImpl arrayProImpl = new ArrayProImpl();
	
		System.out.println(arrayProImpl);
	}

运行结果

	容器内有0条数据，内置数组空间为10，元素分别是：



## 6 增加元素

在为数组添加元素过程中，就有可能出现初始空间不够用的情况，所以在添加之前，需要判断数组空间是否够用，如果不够，就按照一定算法扩容。

	public void add(Object element){
		//调用类内方法，探寻扩容
		ensureCapacity(size+1);	
		//讲数据放置到数组末尾，并执行size+1
		this.elementData[size++] = element;
	}

	/**
	 * 扩容当前存储空间，在add时需要调用此方法判断是否需要扩容，扩容算法为到达上限即扩大2倍
	 */
	private void ensureCapacity(int nextCapacity){
		//如果容量已达到上限
		if(nextCapacity > this.elementData.length){
			//把原数组拷贝到空间为原来二倍的新数组中。
			Object[] newArr = new Object[size*2];
			for (int i = 0; i < this.elementData.length; i++) {
				newArr[i] = this.elementData[i];
			}
			this.elementData = newArr;
			this.elementData = newArr;//重新赋值当前存储数组
		}
	}

首先`ensureCapacity`这个方法为什么要设定为`private`，因为我们不希望类外部去调用这个方法，因为这个事件仅可能发生在add()方法内。方法需要一个参数，这个参数是在调用时，试探一下当前空间是否够用，如果已经到达极限，则执行扩容。

	public static void main(String[] args) {
		ArrayProImpl arrayProImpl = new ArrayProImpl(2);
		arrayProImpl.add("123");
		arrayProImpl.add("aaa");
		arrayProImpl.add("333");
		System.out.println(arrayProImpl);
	}

运行结果

	容器内有3条数据，内置数组空间为4，元素分别是：123,aaa,333

## 7 删除元素

删除元素时，需要把所删位置之后的元素全部前移一位，把删除留下的空位补齐。

	/**
	 * 删除指定下标元素
	 */
	@Override
	public void remove(int index) {
		//新的存储空间，容量少1
		Object[] newArr = new Object[this.size-1];
		//复制原数组到新数组
		for (int i = 0; i < newArr.length; i++) {
			if (i<index) {
				//当小于所删元素索引，直接复制
				newArr[i] = this.elementData[i];
			}else{
				//当大于或等于所删元素时，向后移位复制
				newArr[i] = this.elementData[i+1];
			}
		}
		//设定新数组为当前成员
		this.elementData = newArr;
		//维护长度
		size--;
	}

	/**
	 * 移除此列表中首次出现的指定元素（如果存在）。
	 */
	@Override
	public void remove(Object o) {
		// TODO Auto-generated method stub
		for (int i = 0; i < elementData.length; i++) {
			//用equals判断两个元素是否相等
			if(o.equals(elementData[i])){
				//如果equals成立，则删除当前元素，调用根据下标删除
				this.remove(i);
			}
		}
	}

此为两个重载方法，分别是根据下标或元素本身进行删除。其中根据元素删除调用了根据下标删除，省去了重复的代码，也更利于维护。

	public static void main(String[] args) {
		ArrayProImpl arrayProImpl = new ArrayProImpl(2);
		arrayProImpl.add("123");
		arrayProImpl.add("aaa");
		arrayProImpl.add("333");
		System.out.println(arrayProImpl);
		arrayProImpl.remove("aaa");
		System.out.println(arrayProImpl);
	}

运行结果

	容器内有3条数据，内置数组空间为4，元素分别是：123,aaa,333
	容器内有2条数据，内置数组空间为2，元素分别是：123,333

## 8 修改元素

修改仅需根据指定的下标替换元素即可。

	/**
	 * 用指定的元素替代此列表中指定位置上的元素。
	 * index:要替代元素索引
	 * element:替代的元素
	 */
	@Override
	public void set(int index, Object element) {
		// TODO Auto-generated method stub
		this.elementData[index] = element;
	}

	@Override
	public Object get(int index) {
		// TODO Auto-generated method stub
		return elementData[index];
	}

**基于数组本质的特性，获取和修改指定索引值都比较容易。**

## 9 返回长度

size方法比较容易，因为咱们内部就维护了一个记录长度的成员变量，并在删除和添加这种会对内部元素数量造成影响的方法中对它加以维护。所以这时我们直接取值就可以。

	@Override
	public int size() {
		// TODO Auto-generated method stub
		return size;
	}
	
	@Override
	public String toString() {
		String result = "";
		for (int i = 0; i < size; i++) {
			//拼接每一位元素
			result += this.elementData[i];
			if(i!=(size-1)){
				//非末尾追加,
				result+=",";
			}
		}
		return result;

## 10 JDK的实现-ArrayList

在JDK中已经提供了一个可变长数组的实现，位于`java.util.ArrayList`,对于各个方法的实现也大同小异。ArrayList是我们最常使用的容器之一。

## 11 关于泛型

在API文档中，`ArrayList`类的描述有些许的不同，就是文档中类的声明为`ArrayList<E>`，那么`<E>`又代表着什么呢？

反观我们自己实现的`ArrayPro`，我们内部存储的是一个`Object[]`,这个定义非常抽象，一切对象`add`到容器都被视为一个Object,从而丢失了自己的特性。思考如下程序。
	
	package chapter09;
	
	public class Student {
		
		//姓名属性
		private String name;
		
		//带有String类型参数构造方法，赋值给姓名属性
		public Student(String name) {
			this.name = name;
		}
		
		public void speak(){
			System.out.println("hello 我叫"+ name);
		}
		
		public static void main(String[] args) {
			//创建可变长数组对象
			ArrayPro arrayPro = new ArrayProImpl();
			//创建一个学生对象，名叫张三
			Student student1 = new Student("张三");
			//创建一个学生对象，名叫李四
			Student student2 = new Student("李四");
			//创建一个学生对象，名叫王五
			Student student3 = new Student("王五");
			arrayPro.add(student1);
			arrayPro.add(student2);
			arrayPro.add(student3);//添加对象到容器
			//获取下标第0个元素，由于我们arrayPro中add/get时都认为对象为Object,这里需要强制向下转型。如不转型，则arrayPro.get(0)返回的对象是一个Object,无法调用speak()方法。但是向下转型是存在隐患的，如果我们第一个add的不是一个Student，那么这里就会转型出错。
			Student student = (Student) arrayPro.get(0);
			student.speak();
		}
	}

由于我们抽象的认为容器中的元素为Object,因为**多态性**，任何Object的子类都可以被`add`到容器，从而丢失自己的本性，即便使用**向下转型**，也会存在**类型转换失败**的风险。

泛型就是JDK1.5开始提供的一种**参数化的类型声明**方式。看如下示例。

	public class ArrayProImpl<E>{

		private E elementData;
		
		public void add(E element){
			//..add逻辑
		}

		public E get(int index){
			//..get逻辑
		}

		public static void main(String[] args) {
			//声明带有泛型的类可以在构造声明期传入泛型的预置类型
			ArrayProImpl<Student> arr = new ArrayProImpl<Student>();//指定泛型类型为Student
			arr.add("123");//由于指定了泛型Student，此时add方法传入String会报编译错误。
		}
	}

在这里`E`可以理解为一个参数，这个参数在构造时可以指定其具体类型`ArrayProImpl<Student> arr = new ArrayProImpl<Student>()`。并且一旦泛型被指定，所有受泛型影响的方法均必须遵循泛型使用。

