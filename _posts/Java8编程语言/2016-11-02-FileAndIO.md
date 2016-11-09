---
layout: post
title: 文件与I/O
category: 初学者的第一套Java教程
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 文件 I/O
description: 文件是我们计算机操作系统中最基本的要素，JDK中提供了丰富的文件操作工具包，本章我们来学习一下Java文件与I/O操作
author: 付天有
importance: 2
order: 11
---

内容摘要

- File类的使用
- I/O流的实现类
- 通过输入输出流获取文件内容

# 实验一 文件的基本操作

## 1 File类概述

![](/public/img/Java8/file.png)

文件是我们计算机操作系统中最基本的要素，JDK中提供了File类对操作系统文件进行了封装。一个File类实例代表一个文件对象，我们可以根据这个对象获取文件信息，也可以新建一个文件或文件夹。

`File`提供了4个重载构造方法，我们可以根据需求来创建一个文件对对象实例。

`File(File parent, String child)`:用一个目录类型的`File`实例作为父级目录，创建一个`File`实例。

`File(String pathname)`: 通过指定的路径创建一个新 `File` 实例。**此方法比较常用**。

`File(String parent, String child)`:根据 `parent` 路径名字符串和 `child` 路径名字符串创建一个新 `File` 实例。 

`File(URI uri)`:通过将给定的 ` URI` 转换为一个抽象路径名来创建一个新的 `File` 实例。关于`URI`大家了解他是一种路径的描述即可，经常应用于在网络上标定一个文件路径。

**无论是哪一种构造方法，核心就是需要定位一个文件的位置。**


## 2 创建文件目录(文件夹)

	public class FileDemo {
		
		public static void main(String[] args) {
		
			File catalog = new File("d:/myFolder");
			
			boolean success = catalog.mkdir();
			
		}
	}
	
通过构造方法创建一个`File`实例后，就等于和指定路径上的位置建立起联系，此时所指路径上可以有文件(或文件夹)，也可以没有。

当对象调用`mkdir()`时，如果路径上已有文件夹(标准文件)，则方法返回false且不影响已有文件，如果没有则在指定路径上创建指定名称的**文件夹**(非标准文件)。

**注意**:当文件路径中带有不存在的父级文件夹，如`File catalog = new File("d:/aaa/myFolder")`中`aaa`文件夹并不存在，此时mkdir()方法并不能够成功创建文件，返回值为false。我们可以利用`mkdirs()`创建包括所有必需但不存在的父目录。

	File catalog = new File("d:/aaa/myFolder");
	catalog.mkdirs();//如果aaa目录不存在，则创建此父级目录
	
## 3 创建标准文件

`mkdir()`方法创建的是一个文件夹，如果要创建标准文件的话(如HelloWorld.java,java.exe)，需要用到`createNewFile()`方法。

	File file = new File("d:/myFile");//利用String类型描述路径，创建文件对象
	try {
		boolean exists = file.createNewFile();//创建一个新文件，返回true代表创建成功，返回false代表文件已存在
	} catch (IOException e) {
		e.printStackTrace();
	}

`createNewFile()`用法和`mkdir()`类似，都是根据一个File的实例对象调用，不同的是，在创建标准文件时，需要处理一个异常。且不能连同父级目录一并创建。

## 屏蔽操作系统分隔符差异

需要注意的是，Windows操作系统和Linux操作系统的文件路径分隔符是不同的，目前在高版本的Windows系统上，文件路径用`/`和`\`均可以，但是在linux则需要用`/`来。我们知道Java语言是跨平台的，为了保证我们所写文件路径能够被不同操作系统所兼容，我们可以调用JDK提供的API来引用当前系统路径分隔符。

	String filePath = "d:" + File.separator +"newFile"；
	File file = new File(filePath)

`File.separator`代表与系统有关的默认名称分隔符，不需要我们关心是什么操作系统。


## 输出文件内所有文件信息

	package chapter11;
	
	import java.io.File;
	import java.util.Arrays;
	
	public class FileList {
		public static void main(String[] args) {
			File catalog = new File("c:");
			File[] files = catalog.listFiles();
			for (File file2 : files) {
				if(file2.isDirectory()){
					//文件夹
					System.out.println("目录类型："+file2.getName() +"\t 内附文件：" + Arrays.toString(file2.list()));
				}else if(file2.isFile()){
					//文件
					System.out.println("标准文件："+file2.getName() +"\t 文件大小：" + file2.length());
				}
			}
			
		}
	}

不得不说，`JDK`在`File`的抽象描述上还是有些晦涩，因为**目录**和**标准文件**还有不同的，`list()`方法表示获取当前文件夹内的名称，显然对于一个标准文件来说这个方法是没有意义的，而对于`length()`方法表示返回当前文件大小，但是对于目录来讲，获取一个目录的大小并不是一个简单的过程，所以`length()`方法只针对与标准文件有效。

当然`File`类还提供更多的方法，详细请参考API文档。

![](/public/img/Java8/file-summary.png)

# 实验二 文件的复制

> 复制一个指定文件到指定位置。要求如果已存在同名文件，则覆盖原文件。

## 1 输入流与输出流

简单的说，你听别人唠叨就是输入，你向别人发牢骚就是输出。在计算机的世界，输入Input和输出Output都是针对于计算机的**内存**而言。比如读取一个硬盘上的文件，对于内存就是输入，向控制台打印输出一句话，就是输出。

Java中对于这类的输入输出的操作统称为I/O，即Input/Output。

流是对I/O操作的形象描述，**水**从一个地方转移到另一个地方就形成了**水流**，而**信息**从一处转移到另一处就叫做**I/O流**。

输入流的抽象表示形式是接口`InputStream`

输出流的抽象表示形式是接口`OutputStream`

JDK中`InputStream`和`OutputStream`的实现就抽象了各种方式**向内存读取信息**和**向外部输出信息**的过程。

我们之前常用的`System.out.println();`就是一个典型的输出流，目的是向控制台输出信息。而`new Scanner(System.in);`就是一个典型的输入流，读取控制台输入的信息。`System.in`和`System.out`这两个变量就是`InputStream`和`OutputStream`的实例对象。

对于我们人来讲，语言只是信息表达的方式之一，我们的大脑(内存)，可以接受很多类型的信息，如文字，图像，声音等等。文件也属于一种信息类型，JDK中提供了丰富的信息类型读取类，`FileInputStream`和`FileOutputStream`就是来处理**关于文件**的I/O操作。下面是文件流的声明。

	//声明待复制文件
	File file = new File("d:/workspace/info.txt");
	
	//根据待复制文件创建文件输入流
	FileInputStream fileInputStream = new FileInputStream(file);
	
	//声明复制目标文件
	File copyFile = new File("d:/info_copy.txt");
	
	//声明复制目标文件输出流
	FileOutputStream fileOutputStream = new FileOutputStream(copyFile);

## 2 方法封装及异常处理

为了更好的重用文件拷贝代码，我们把这个过程包装成方法。

	/**
	 * 文件复制
	 * @param originalPath 原始文件路径
	 * @param copyPath     目标文件路径
	 */
	public void copy(String originalPath,String copyPath){
		
		//声明待复制文件
		File file = new File(originalPath);
		
		//声明复制目标文件
		File copyFile = new File(copyPath);
		
		//try catch 结构外部声明引用，为的是可以在finally中利用此引用关闭流
		FileInputStream fileInputStream = null;
		
		FileOutputStream fileOutputStream = null;
		
		try {
			
			//根据待复制文件创建文件输入流
			fileInputStream = new FileInputStream(file);

			//声明复制目标文件输出流
			fileOutputStream = new FileOutputStream(copyFile);
			
			//文件复制过程代码
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}finally {
			//使用后一定要注意关闭流！！！
			try {
				//利用close()方法关闭流，close时还有一个checked异常要处理
				if(fileInputStream != null){
					fileInputStream.close();
				}
				if(fileOutputStream!=null){
					fileOutputStream.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

I/O流部分的API应用的大量的异常处理，因为在读和写的过程中，读写双方都有可能出现中断，我们需要对这些例外进行捕获和处理。

使用电器完毕，我们需要关闭电源；通完电话我们要记得挂断，流使用完毕切记要**关闭流**，`InputStream`和`OutputStream`都提供了`close()`方法来关闭流，通常关闭过程都会写在`finally`关键字中，确保流在出现例外时也能够被关闭。

## 3 读写文件内容

	//文件复制过程代码
	//获取待复制文件大小
	long fileSize = file.length();
	
	//存放文件内容的byte数组
	byte[] content = new byte[(int) fileSize];
	
	//读取文件内容到字节数组
	fileInputStream.read(content);//read方法有IOException需要处理
	
	//写入字节数组到目标文件
	fileOutputStream.write(content);//write方法有IOException需要处理

InputStream和OutputStream也被称为**字节输入流**和**字节输出流**。因为它们在读取和输出信息的过程中，面向的都是**字节(byte)**,就好像我们抄写一篇文章，我们可以一个字一个字抄，也可以一句一句的抄，还可以一行一行的抄。字，句，行都是抄写的单位。`byte`就是字节流(InputStream和OutputStream的实现)读写数据的单位。

`InputStream`的`read(byte[] b)`方法从目标以字节(byte)的形式读取到`b`。

这里我们直接用文件的字节数(`file.length()`)来声明`byte`数组`content`，所以`read(content)`后`content`就是源文件的全部内容的`byte[]`表示形式。

同理`OutputStream`的`write(byte b)`就是把b写入到目标。

![](/public/img/Java8/readAndWirte.png)

## 分多次读写文件

上面我们利用read和write方法实现了文件的读写和复制。我们是根据源文件大小来声明读取长度，如果这个文件超级大，大小已经要用long型来表示了，一个byte数组已经不能一次读取完整文件，这时我们需要分多次来读取和写入文件。

![](/public/img/Java8/moveMountain.png)

### 关键技术

`read(byte[] b)`的返回值：

返回读取输入流中的总字节数，如果输入流中的数据已经小于`b`的声明长度，则返回实际读取内容的字节数(非`byte[]`数组的生命长度)。

如果输入流已经读取完毕，则返回-1。

`write(byte[] b, int off, int len) `方法

之前我们用过`write(byte[] b)`方法，直接写入`b`到目标。而这个3个参数的重载方法更加灵活，可以从b的指定偏移位置(off)读取len个字节到目标。可以理解为可以写入byte[]的某一个片段到目标。

![](/public/img/Java8/mutiWrite.png)

### 关键代码

	//分段多次复制法
	byte[] buffer = new byte[1024];//声明一个1024长度的数组，每次读写都在这个数组上操作
	int readLength = 0;			 //用于记录每次读取到buffer中实际内容的长度
	while(( readLength = fileInputStream.read(buffer)) != -1){
		//如果read方法返回-1,，则代表流已经读取完毕。
		
		//由于最后一次read的buffer不一定把buffer读满，所以使用能够选取写入的write方法
		fileOutputStream.write(buffer, 0, readLength);
	}

需要注意的是，流的`read`是不回头的，一但调用了`read`方法，此次`read`的部分就不会被重复`read`。这一点和迭代器类似。

**常见错误写法**

	//此段代码目的为当流没有读到结束标识，则输出此次读取的总字节数
	byte[] buffer = new byte[1024];
	while(fileInputStream.read(buffer)!=-1){//此时buffer已经被复制第一次read所得到的值
		
		System.out.println(fileInputStream.read(buffer))；这时输出的第二次read的字节数
	}

更正

	byte[] buffer = new byte[1024];
	int readLength = 0;
	//由于不能再次用read获取读取字节数，所以在read时即完成赋值和判断动作。注意括号
	while((readLength = fileInputStream.read(buffer))!=-1){
		
		System.out.println(readLength)；输出read的字节数
	}


完整代码参考[https://coding.net/u/lanqiao/p/Java8/git/blob/master/src/chapter11/FileCopy.java](https://coding.net/u/lanqiao/p/Java8/git/blob/master/src/chapter11/FileCopy.java)


# 实验三 解析交易信息

> 第三方支付系统发起交易后会等待银行的响应，约定银行处理交易完毕会返回给支付平台TXT文本，然后每笔交易呈现一行数据，格式如：（流水号|支付金额|支付时间|支付方|收款方）。读取并打印这些信息。

通过上面实验，我们已经掌握了读取文件内容的方法，但是我们读取回来的内容都是一个个的byte组成的byte[]，而对我们而言，这些byte[]的解析是很困难的，尤其对于中文而言。因为Java中文是2个字节即2个byte。

## 字节流与字符流

`InputStream`和`OutputStream`都是面向字节工作，统称为字节流。`FileInputStream`和`FileOutputStream`是以文件作为信息载体进行数据传递的实现。常用的字节流还有`ByteArrayInputStream`和`ByteArrayOutStream`。`InputStream`和`OutputStream`都是成对出现的，一个`xxxInputStream`一定对应一个`xxxOutputStream`。`xxx`就代表输入输入两端的传递载体。

Java中还提供了以字符(char)为单位的输出输出流，称为字符流。并提供了很多高级的I/O操作实现。比如`BufferedReader`提供了**一次读取一行信息并提取为字符串格式的`readLine()`**方法，就是非常实用的字节流。

![](/public/img/Java8/io-all.png)


## 利用FileReader输出文件内容

文件中收款方和支付方均有可能出现中文，按照我们字节流逐个字节输出，解析此文档就比较复杂。需要把`byte[]`重新包装成`char`或者`String`。而字符流是以`char`为单位的，可以轻松处理此问题。

	/**
	 * 为了代码清晰，直接把异常throws，常规需要捕获处理异常并在finally中关闭流
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		//声明文件对象
		File file = new File("d:/info_copy.txt");
		
		//利用文件对象创建文件字符输入流
		FileReader fileReader = new FileReader(file);
		
		//循环输入
		while (fileReader.ready()) {//判断字符流是否可读

			//读取回字符直接打印即可，保持文档原貌，不使用println()
			System.out.print((char)fileReader.read());//Reader子类的read()方法返回的是char的int形式，需要转型
		}
		fileReader.close();
	}

`Reader`子类的`read()`方法返回的是`char`的`int`表示形式，虽然我们可以很容易的输出文档，但是如果要对文档内容进行详细解析，一个个的`char`还是不清晰，可以把文档内容当成一个`String`,利用`String`提供的方法来解析内容。


## BufferedReader的使用


	public void readFile(String filePath) throws IOException{
		File file = new File(filePath);
		
		FileReader fileReader = new FileReader(file);
		
		//利用FileReader创建BufferedReader实例，
		BufferedReader bufferedReader = new BufferedReader(fileReader);
		
		while(bufferedReader.ready()){
			String line = bufferedReader.readLine();
			System.out.println(line);
			//解析内容
		}
		
		bufferedReader.close();
	}

## 字节流转换为字符流

字符流为我们提供了很多高级的方法，如逐行读取，过滤某些信息等等，如果我们从他人的方法中只得到了字节流(`InputStream`)，但是我们又想应用`Reader`子类中的高级方法。没关系，我们可以使用`InputStreamReader`来把一个`InputStream`包装成`Reader`。过程如下。

	File file = new File("d:/info.txt");
	FileInputStream fis = new FileInputStream(file);
	//把FileInputStream包装成Reader的子类，InputStreamReader
	InputStreamReader isr = new InputStreamReader(fis);
	//此时通过InputStreamReader的实例可以构造任何Reader实例。
	BufferedReader br = new BufferedReader(isr);

关键点就在于`InputStreamReader`的构造方法，可以接受一个`InputStream`的子类，得到了`InputStreamReader`的实例，而`InputStreamReader`本身就是`Reader`的子类，从而实现了从`InputStream`到`Reader`的过渡，`OutputStream`到`Writer`同理


	package chapter11;
	
	import java.io.BufferedReader;
	import java.io.IOException;
	import java.io.InputStream;
	import java.io.InputStreamReader;
	import java.net.URL;
	import java.net.URLConnection;
	
	
	public class SimpleSpider {
		public static void main(String[] args) throws IOException {
			//声明要读取的网络资源地址
			URL url = new URL("http://www.baidu.com");
			//打开网络连接
			URLConnection connection = url.openConnection();
			//获取输入流，这里只能获取到字节流
			InputStream inputStream = connection.getInputStream();
			
			
			//字节流转为字符流，并设置编码为UTF8
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream,"UTF-8");
			//包装为更高级的字符流，用于可以整行读取
			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
			while(bufferedReader.ready()){
				System.out.println(bufferedReader.readLine());
			}
			
		}
	}


# 实战练习
