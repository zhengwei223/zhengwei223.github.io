---
layout: post
title: windows上搭建Java开发环境
category: Java8编程语言
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 开发环境
description: 
author: 付天有
importance: 4
order: 2
---

# 第2章 windows上搭建Java开发环境

> 本章目标

- 掌握JDK的下载与安装
- 掌握Java的开发环境搭建
- 掌握开发Java程序的步骤
- 掌握运行编译——>运行Java代码的流程
- 完成HelloWord应用程序开发

## 2.1 下载

搭建Java开发环境，第一步我们就需要安装JDK。大家可以在ORACLE官方网站上下载，下载路径：[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.5.jpg)

这里要提醒各位同学，不同平台和系统的安装文件是不一样的，根据自己电脑的情况选着合适的版本进行安装,32位选x86，64位选择x64。

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.6.jpg)

## 2.2 安装

下载后JDK的安装根据提示进行，还有安装JDK的时候也会安装JRE，一并安装就可以了。
安装JDK，安装过程中可以自定义安装目录等信息，例如我们选择安装目录为 C:\Program Files (x86)\Java\jdk1.8.0_91。

## 2.3 配置环境变量
当我们安装好JDK后，就要配置环境变量了。一般来说，我们会配置这三个环境变量：

- JAVA_HOME ：配置 JDK 安装路径

- PATH ：配置 JDK 命令文件的位置

- CLASSPATH ：配置类库文件的位置

### 详细步骤：

右击"我的电脑"，点击"属性"，选择"高级系统设置"；

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.7.png)

选择"高级"选项卡，点击"环境变量"；

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.8.png)

然后就会出现如下图所示的画面：

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.9.png)

在"系统变量"中设置3项属性，JAVA_HOME,PATH,CLASSPATH(大小写无所谓),若已存在则点击"编辑"，不存在则点击"新建"。

变量设置参数如下：

变量名：JAVA_HOME

变量值：C:\Program Files (x86)\Java\jdk1.8.0_91        // 要根据自己的实际


变量名：CLASSPATH

变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;         //记得前面有个"."

变量名：Path  **一般已经存在，点击编辑**

变量值：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

JAVA_HOME 设置

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.10.png)

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.11.png)

PATH设置

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.12.png)

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.13.png)

CLASSPATH 设置

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.14.png)


`注意：如果使用1.5以上版本的JDK，不用设置CLASSPATH环境变量，也可以正常编译和运行Java程序。`

## 2.4 测试JDK是否安装成功

1、"开始"->"运行"，键入"cmd"；

2、键入命令: java -version、java、javac 几个命令，出现正常提示信息，说明环境变量配置成功；

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/coding-pages/public/img/Java8/2016-08-05_javac.png)

## 2.5 第一个Java应用程序：HelloWorld

开发并运行一个Java程序主要有三步：

- 编写Java的源代码文件，以.java结尾，**源代码文件默认是不能被机器执行的**。

- 使用编译器（也就是javac命令），对源代码文件进行编译。把它编译成字节码文件，字节码文件是以.class结尾。它与平台无关，也就是说无论你是windows还是linux，字节码文件都是这样的一个文件，这跟系统没有关系。

- 运行应用程序（使用java命令），在控制台我们可以看到程序运行出的结果。


看看打印单词 Hello World 的简单代码。

    public class MyFirstJavaProgram {
    
    	/* This is my first java program.  
    	 * This will print 'Hello World' as the output
    	 */
    	public static void main(String []args) {
    		System.out.println("Hello World"); // prints Hello World
    	}
    } 

看下面是如何保存文件，编译并运行该程序。请按照以下步骤进行：


- 打开记事本，并添加如上面的代码。

- 将文件另存为：MyFirstJavaProgram.java。

- 打开命令提示符窗口，然后去进入保存类的目录。假设它是C：。

- 输入'javac MyFirstJavaProgram.java“，然后按回车来编译代码。如果代码中没有错误，在命令提示符下将到下一行（假设：路径变量设置）。

- 现在，输入“java MyFirstJavaProgram'来运行程序。

- 将可以看到 ' Hello World ' 印在窗口上。

	    C : > javac MyFirstJavaProgram.java
	    C : > java MyFirstJavaProgram 
	    Hello World
### 2.5.1 常见错误

1. 在windows上新建文本文件默认会得到一个.txt文件，需要将其改为.java后缀；如果文件名显示设置中隐藏了文件后缀，新建一个文本文件看不到后缀，但事实上有.txt后缀，如果此时仅把文件命名为.java实际得到的文件是.java.txt。这将导致下一个步骤的编译错误。
2. `public class MyFirstJavaProgram `中MyFirstJavaProgram必须与文件名相一致,并且区分大小写。


