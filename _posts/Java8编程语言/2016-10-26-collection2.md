---
layout: post
title: 集合框架的综合应用
category: 初学者的第一套Java教程
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 集合框架
description: Java集合框架
author: 付天有
importance: 2
order: 10
---

内容摘要

- Set与List接口相关实现
- Map接口的相关实现
- 容器遍历方法

# 实验一 利用ArrayList存储学生信息

> 目的：控制台连续获取学生信息（学号、姓名、专业），直至输入到学号为-1时，终止录入并打印所有学生信息。

## 1 抽象学生信息类

首先学号、姓名、专业构成了一个学生信息。用之前我们学习的面向对象的思想来考虑，就可以抽象一个拥有学号、姓名、专业等属性的类。
	
	package chapter10;
	
	public class StudentInfo {
		
		//学号
		private String no;
	
		//姓名
		private String name;
		
		//专业
		private String major;
		
		
		//getter and setter
		public String getNo() {
			return no;
		}
	
		public void setNo(String no) {
			this.no = no;
		}
	
		public String getName() {
			return name;
		}
	
		public void setName(String name) {
			this.name = name;
		}
	
		public String getMajor() {
			return major;
		}
	
		public void setMajor(String major) {
			this.major = major;
		}
		
	}

这里我们提供的三个属性的get和set方法，通常情况下，我们不会提供`public`的成员变量，外部不可以直接通过`对象.属性`来操作成员变量。所以提供公有的get和set方法来操作私有属性。

**注意：get和set方法有一些常规协定，请大家遵守。**

1. set方法无返回值，参数为相应成员变量类型。
2. get方法返回值为成员变量类型，无方法参数。
3. 命名为get/set+成员变量名称（首字母大写）。
4. 避免tUser这种一个小写字母接着一个大写字母的变量命名方式。


## 2 主程序思路

	//声明可变长容器
	//声明控制台信息捕获器
	//循环获取控制台数据
	{
		//获取学号
		//如果学号为-1，终止循环
		//获取姓名
		//获取专业
		//创建学生信息实例
		//设置学号信息
		//设置姓名信息
		//设置专业信息

		//学生信息添加到容器
	}
	//遍历容器内所有学生信息

## 3 主程序代码

	public static void main(String[] args) {
		//声明可变长容器
		ArrayList<StudentInfo> container = new ArrayList<StudentInfo>();
		//声明控制台信息捕获器
		Scanner scanner = new Scanner(System.in);
		
		//循环获取控制台数据
		while(true){
			//获取学号
			System.out.println("请输入学生学号...");
			String no = scanner.next();
			
			//如果学号为-1,则打印容器内所有内容，终止循环
			if(no.equals("-1")){
				break;
			}
			
			//获取姓名
			System.out.println("请输入学生姓名...");
			String name = scanner.next();
			
			//获取专业
			System.out.println("请输入学生专业...");
			String major = scanner.next();
			
			//创建学生信息实例
			StudentInfo info = new StudentInfo();
			
			info.setNo(no);//设置学号信息
			info.setName(name);//设置姓名信息
			info.setMajor(major);//设置专业信息
			
			container.add(info);//添加到容器
		}
		
		//循环遍历ArrayList
		for (int i = 0; i < container.size(); i++) {
			System.out.println(container.get(i));
		}
	}

## 4 解读

`ArrayList<StudentInfo> container = new ArrayList<StudentInfo>();`创建一个ArrayList实例，并声明泛型`StudentInfo`，作为盛放学生信息的容器。要注意不要在循环体内声明该变量，那样会重复构建新的容器。

`info.setXxx`方法来设置学生信息对象的各种属性。

`container.add(info)`正如我们`ArrayProImpl`的实现一样，可以不必关心数组的长度。

集合的遍历，由与ArrayList为每一个元素维护了一个下标，所以我们可以像数组那样用for循环遍历出每一个元素。

执行结果

	请输入学生学号...
	01
	请输入学生姓名...
	张三
	请输入学生专业...
	计算机
	请输入学生学号...
	-1 
	chapter09.StudentInfo@1f2cea2

还记得`chapter09.StudentInfo@1f2cea2`格式么。他就是`Object`的`toString()`默认实现，我们`System.out.println(container.get(i));`输出的是每一个`StudentInfo`实例，想要输出的更清晰，需要重写`StudentInfo`的toString()方法。

	@Override
	public String toString() {
		return "学生信息 [no=" + this.no + ", name=" + this.name + ", major=" + this.major + "]";
	}

执行结果

	请输入学生学号...
	01
	请输入学生姓名...
	张三
	请输入学生专业...
	计算机
	请输入学生学号...
	02
	请输入学生姓名...
	李四
	请输入学生专业...
	软件工程
	请输入学生学号...
	-1
	学生信息 [no=01, name=张三, major=计算机]
	学生信息 [no=02, name=李四, major=软件工程]

## 5 关于LinkedList

`ArrayList`还有一个好兄弟`LinkedList`,它与`ArrayList`同属一个父接口，使用方法也完全相同，不过在实现思路上不同。

![](/public/img/arrayAndLink.png)

`ArrayList`的内部存储结构为数组，在获取指定下标元素时（查询）比较快，反思我们实现的`ArrayPro`类，实现`add`和`remove`方法时，给我们带来了不少的麻烦，我们要始终保证每个数组元素的索引连续性，从而在**删除**和**添加**时，带来了时间可空间上的开销。

而`LinkedList`是基于[链表](http://baike.baidu.com/link?url=bm-lUlkqbAt9Vu296r8jgjmyKSuHICFIBnNb6iBNZBfuUXXXDIU6DfTJovJgjE__Sax3FQURFzLqRwzkee5BwMleVwwR2L_zs8EjZGaret7)的一种实现，如果把数组比作一个储物柜，柜子中每个格子都是连续且有固定编号的，那么链表就是一种分散的存储方式，每个存储单元都仅关心与之相邻的单元。这就造就了他的存储特点是，要精准定位（查询）一个元素时，需要从第一个元素顺序查找，相对数组费时，而添加和删除元素时，只需重新建立相邻元素的指针即可。


# 实验二 拒绝重复的学生信息

> 在学生信息录入过程中，需要保证没有重复的信息录入，是否重复依据学号判断。

## 1 利用equals方法判断重复学生对象

之前我们介绍过`==`与`equals`方法比较对象的区别。`==`比较的引用的值(可以理解为对象的内存地址,严格的讲这个值并不是地址)而`equals`方法时继承自`Object`类的比较方法，每个类都可以拥有自己的`equals`定义。

	//StudentInfo重写equals方法
	@Override
	public boolean equals(Object obj) {
		//Object的equals方法定义都是抽象的Object对象，所以在子类实现中可以向下强制转型
		StudentInfo studentInfo = (StudentInfo)obj;
		//studentInfo的比较equals方法就是直接比较学生的no;
		return this.getNo().equals(studentInfo.getNo());
	}

值得注意的是，API中对`equals`方法有这样一段描述**注意：当此方法被重写时，通常有必要重写hashCode()方法，以维护hashCode方法的常规协定，该协定声明相等对象必须具有相等的哈希码。**

所以我们为了遵循这个协定，我们有必要重写`Object`中另外一个方法`hashCode()`。

	public int hashCode(){
		return this.getNo().hashCode();
	}

该协定的重点就在于互相`equals`的方法必然拥有相同的`hashCode`,所以既然我们判断`StudentInfo`实例`equals`的依据为`no`字段，那么我们就可以定义每个`StudentInfo`实例的`no`的`hashCode`就是`StudentInfo`实例的`hashCode`。

关于"常规协定"，就是一种约定，编译器和语法并没有做出强制的限制，例如"右侧通行"就是一种常规协定，如果我们不遵循这个协定，就有可能出现对向行人的碰撞。所以，请遵守这些协定。

## 2 利用List的实现

判断容器是否已有元素

	public boolean checkContain(List<StudentInfo> container,StudentInfo info){
		//循环遍历ArrayList
		for (int i = 0; i < container.size(); i++) {
			if(info.equals(container.get(i))){
				//如果所遍历元素equals检查对象，则返回true
				return true;
			}
		}
		return false;//遍历结束没有匹配对象，返回false
	}
	
add前判断
	
	//container是当前已有容器，info是所封装的学生信息
	if(checkContain(container,info)){
		container.add(info);
	}
	

## 3 利用HashSet实现

HashSet类的对象中无重复对象，当add一个已存在的对象时，则会忽略掉此次的add动作。这里需要注意，判断对象存在的依据同样是`equals`方法。利用这个特性，我们无需考虑信息的重复性，只需要定义好对象重复的规则即可。

	//定义StudentInfo的equals和hashCode
	
	public static void main(String[] args) {
		
		//声明HashSet作为容器
		HashSet<StudentInfo> container = new HashSet<StudentInfo>();

		//声明控制台信息捕获器
		Scanner scanner = new Scanner(System.in);
		
		//循环获取控制台数据
		while(true){
			//获取学号
			System.out.println("请输入学生学号...");
			String no = scanner.next();
			
			//如果学号为-1,则打印容器内所有内容，终止循环
			if(no.equals("-1")){
				break;
			}
			
			//获取姓名
			System.out.println("请输入学生姓名...");
			String name = scanner.next();
			
			//获取专业
			System.out.println("请输入学生专业...");
			String major = scanner.next();
			
			//创建学生信息实例
			StudentInfo info = new StudentInfo();
			
			info.setNo(no);//设置学号信息
			info.setName(name);//设置姓名信息
			info.setMajor(major);//设置专业信息
			
			container.add(info);//添加到容器，自动屏蔽掉重复的元素
		}
		
	}	


## 4 关于List和Set接口

`Set`与`List`同属`Collection`子接口，是不同特性容器的抽象。

`Set`中不允许有重复的元素对象存在，且每个元素没有特定顺序（每一次的遍历出的顺序可能不同）。

`List`接口允许重复的元素对象，且每个元素拥有一个特定的下标索引(所以每一次遍历都能保证元素的迭代顺序)。

基于这两种集合对象的不同特性，在容器的选择上，我们就值得考量。核心区别就是**重复性**和**有序性**。

## 5 集合的族谱

![](http://lemon.lanqiao.org:8082/teaching/img/Java8/collection.png)

`Set`和`List`接口都拥有共同的祖先接口`Collection`，在选择集合实现类时，需要考虑每个集合实现的特点，上图中列举了几个最常用的集合实现。更多集合实现请参考API。

## 6 集合的遍历

上面我们已经学习了`List`和`Set`接口的实现。每一种集合都涉及到遍历这种行为。所谓遍历(Traversal)，是指沿着某条搜索路线，依次对树中每个结点均做一次且仅做一次访问。下面我们就来学习一下几种常用的遍历方式

### 传统for循环遍历List

	List<StudentInfo> list = new ArrayList<StudentInfo>();
	for (int i = 0; i < list.size(); i++) {
		StudentInfo info = list.get(i);
		System.out.println(info);
	}
	
	
传统for循环遍历`List`集合的要点在于`List`接口的`size()`控制循环次数和`get(int index)`方法来访问每一个集合元素。

适用场景：`ArrayList`和`LinkedList`等`List`接口的实现类。

### 增强的for循环

由于`Set`接口的特性（元素无序，没有下标），并没有`get(int index)`的方法来访问指定的元素，所以`Set`的实现类无法利用传统for循环来遍历。`JDK1.5`以后提供了一个增强的for循环，业界称之为`foreach`循环。示例如下

	Set<StudentInfo> set = new HashSet<StudentInfo>();
	for (StudentInfo studentInfo : set) {
		System.out.println(studentInfo);
	}

foreach语法

	for(集合元素类型 遍历元素引用:集合对象引用){
	
	}
		

适用场景：所有集合对象(`Collection`接口的实现)，包括数组。

**注意：`foreach`循环在遍历`List`接口实现时，无法在遍历过程中获取每一个元素的`index`(下标)，如果遍历过程中比较关心每一个元素的`index`就需要考虑使用传统for循环**。

### 利用迭代器(Iterator)

`Iterator<T>`接口代表迭代器,迭代可以理解为挤牙膏的过程，把集合中元素一个一个的挤出来。`Collection`接口提供了`iterator()`方法返回当前集合的迭代器实现,这个方法继承者Collection的父接口`Iterable<T>`。

`Iterator`接口比较简单，利用下列两个方法即可完成所有`Collection`子类的迭代。

`hasNext()`判断当前迭代器是否还有元素

`next()`返回迭代器中下一个元素

实现方法

	Iterator<StudentInfo> iterator = set.iterator();//返回当前集合上的迭代器
	while(iterator.hasNext()){
		//判断迭代器上是否还有元素，有则获取下一个元素
		StudentInfo studentInfo = (StudentInfo) iterator.next();
		System.out.println(studentInfo);
	}
	
上述代码也可写为

	for (Iterator<StudentInfo> iterator = set.iterator(); iterator.hasNext();) {
		StudentInfo studentInfo = (StudentInfo) iterator.next();
		System.out.println(studentInfo);
	}

**注意：要区分开`Iterable<T>`和`Iterator<T>`,Iterable是"可被迭代"或"可提供迭代器"接口，是Collection的父接口，接口定义了iterator()方法，返回可供迭代的迭代器(Iterator)。Iterator是迭代器，接口提供next()、hasNext()方法对当前迭代器进行迭代。**


# 实验三 快速的根据学号查找学生

> 录入学生信息完毕后，提供根据输入学号，打印学生信息功能。

## 1 List与Set的查询问题

	//省略收集学生信息过程代码，container即为学生信息容器

	System.out.println("请输入需要查找学生的学号...");
	//要查找的学号
	String searchNo = scanner.next();
	//遍历集合查找学号为searchNo的学生
	for(StudentInfo info:container){
		if(info.getNo().equals(searchNo)){
			//找到指定学号学生，打印学生信息
			System.out.println("学生信息为"+info);//需要重写studentInfo的toString()方法
		}
	}

这个过程比较简单，无论`List`还是`Set`都是一次遍历，但是如果这个集合很大很大，数据量多达百万级，则为了一条数据去遍历整个百万级的集合，难免有些小题大做。

## 2 利用HashMap建立快速查询索引

	//info封装过程省略
	//创建HashMap实例对象
	HashMap<String,StudentInfo> map = new HashMap<String,StudentInfo>();
	
	map.put(info.getNo,info);//利用map对象的put方法存储info对象，格式为key(学号)-value(学生信息)

	//封装完毕，map中存放了N条学生信息，均为(学号——学生信息)的格式
	
	//根据searchNo查找学生信息
	StudentInfo searchInfo = map.get(searchNo);

`HashMap`类似一个字典，可以建立一系列目录——实体的映射，目录称为键(`key`)，实体称为值(`value`),一个`HashMap<String,StudentInfo>`就声明了一套映射集合，并指定`key`的类型是`String`,`value`的类型是`StudentInfo`类型。这样我们就可以通过`get(key)`的方法获取到`key`对应的值。

## 3 关于Map接口

`Map`接口实现的是一组`Key-Value`的键值对的组合。 `Map`中的每个成员方法由一个关键字（`key`）和一个值（`value`）构成。**`Map`接口不直接继承于Collection接口（需要注意）**，因为它包装的是一组成对的“键——值”对象的集合，**而且在`Map`接口的集合中也不能有重复的`key`出现**，因为每个键只能与一个成员元素相对应。在我们的日常的开发项目中，我们无时无刻不在使用者Map接口及其实现类。Map有两种比较常用的实现：`HashMap`和`TreeMap`等。`HashMap`用到了哈希码的算法，以便快速查找一个键，TreeMap则是对键按序存放，因此它便有一些扩展的方法，比如`firstKey()`,`lastKey()`等，你还可以从`TreeMap`中指定一个范围以取得其子`Map`。键和值的关联很简单，用`pub(Object key,Object value)`方法即可将一个键与一个值对象相关联。用`get(Object key)`可得到与此`key`对象所对应的值对象。

## 4 Map的遍历

由于`Map`中`key`是不允许重复的，所以`Map`中所有的key就是一个`Set`实现，而且`Map`中提供可`keySet()`方法返回了所有`key`的集合，有了这个集合，我们就可以依次去访问`Map`的每一对`key-value`了。

	//创建Map对象，键为Integer,值为String
	Map<Integer,String> map = new HashMap<Integer,String>();
	
	//map赋值
	map.put(1,"Jack");
	map.put(2,"Rose");
	map.put(3,"Lucy");
	map.put(4,"Coco");

	//遍历map
	Set<Integer> keys = map.keySet();//获取所有key的集合
	
	for(Integer key:keys){
		System.out.println("key为 " + key +",value为 " + map.get(key));
	}
	

运行结果

	key为 1,value为 Jack
	key为 2,value为 Rose
	key为 3,value为 Lucy
	key为 4,value为 Coco

# 总结

本章通过几个实验学习了Java的集合框架，其中关系参考下图

![](http://lemon.lanqiao.org:8082/teaching/img/Java8/collection-all.png)

每种集合实现都有各自的优缺点，需要大家掌握这些实现类的特点，我们学习了几种最常见的集合类型，JDK中还提供了很多的实现类型，大家可以参照API了解自己需要的集合对象类型。

几种集合的遍历方法

- for循环法

- foreach循环法

- iteraor迭代法

# 实战练习