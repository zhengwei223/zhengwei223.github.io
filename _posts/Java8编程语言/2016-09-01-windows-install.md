---
layout: post
title: 从〇开始——Java初体验
category: 初学者的第一套Java教程
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 开发环境
description: 本章将介绍①Java开发环境的搭建②编写并运行第一个Java小程序
author: 付天有
order: 1
---
>内容提要

- Java开发环境的搭建
- 编写并运行第一个Java小程序

# 实验一 windows上搭建Java开发环境

目标：在windows操作系统上搭建Java开发环境。

## 1 下载

搭建Java开发环境，第一步我们就需要安装JDK。大家可以在ORACLE官方网站上下载，下载路径：[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

![](/public/img/Java8/1.5.jpg)

这里要提醒大家，不同平台和系统的安装文件是不一样的，根据自己电脑的情况选着合适的版本进行安装，32位选x86，64位选择x64。

![](/public/img/Java8/1.6.jpg)

## 2 安装

下载后根据提示进行安装，安装JDK的同时也会安装JRE，一并安装就可以了。
安装JDK，安装过程中可以自定义安装目录等信息，例如我们选择安装目录为 C:\Program Files (x86)\Java\jdk1.8.0_91。

## 3 配置环境变量

当我们安装好JDK后，就要配置环境变量了。一般来说，我们会配置这三个环境变量：

- JAVA_HOME ：配置 JDK 安装路径

- PATH ：配置 JDK 命令文件的位置

- CLASSPATH ：配置类库文件的位置

### 详细步骤：

右击"我的电脑"，点击"属性"，选择"高级系统设置"；

![](/public/img/Java8/1.7.png)

选择"高级"选项卡，点击"环境变量"；

![](/public/img/Java8/1.8.png)

然后就会出现如下图所示的画面：

![](/public/img/Java8/1.9.png)

在"系统变量"中设置3项变量，`JAVA_HOME`,`PATH`,`CLASSPATH`(大小写无所谓)，若已存在则点击"编辑"，不存在则点击"新建"。

变量设置参数如下：

变量名：JAVA_HOME

变量值：C:\Program Files (x86)\Java\jdk1.8.0_91        // 要根据自己的实际


变量名：CLASSPATH

变量值：`.;%JAVA_HOME%\lib`

变量名：Path  **一般已经存在，点击编辑**

变量值：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

JAVA_HOME 设置

![](/public/img/Java8/1.10.png)

![](/public/img/Java8/1.11.png)

PATH设置

![](/public/img/Java8/1.12.png)

![](/public/img/Java8/1.13.png)

CLASSPATH 设置

![](/public/img/Java8/1.14.png)


`注意：如果使用1.5以上版本的JDK，不用设置CLASSPATH环境变量，也可以正常编译和运行Java程序。`

## 4 测试JDK是否安装成功

1、"开始"->"运行"，键入"cmd"或者"powershell"；`win+R`可以快速进入“运行”。

2、键入命令: `java -version`、`java`、`javac`几个命令，出现正常提示信息，说明环境变量配置成功；

![](/public/img/Java8/2016-08-05_javac.png)

## 5 注意事项

在设置环境变量过程中一定要注意，`;`和`,`均为半角英文状态下输入。

# 实验一的解读

## 1 JDK&JRE

- JDK：java develop kit (Java 开发包)，也是我们步骤1和2的核心角色，以前JDK 叫做java software develop kit， 后来出了1.2版本后， 就改名叫JDK了。所以如果有人和你说JavaSDK请不要感觉陌生。JDK为我们提供了开发应用程序所需要的一系列工具。
- JRE：java runtime environment（Java 运行环境）对于大多数Java用户，可能只需要运行Java程序，而不需要去开发程序，此时仅安装JRE即可，**JDK的安装是包含JRE的**。 

## 2 环境变量

1. JAVA_HOME：顾名思义，Java的家，设定这个变量是为了让操作系统(windows)找到你JDK安装位置。其他的环境变量都可以利用`%JAVA_HOME%`来引用这个路径。

2. Path：我们知道windows的可执行文件都是以`.exe`为后缀的文件。假设你的系统中有一个`D:\develop\Java\java8\bin\java.exe`文件，在同文件夹下还有一个`D:\develop\Java\java8\bin\javac.exe`，且这两个文件我们会经常用到，我们就可以把`D:\develop\Java\java8\bin`路径配置到环境变量`path`中，这样我们可以直接程序名称（文件名）来运行文件，而不需要每次都带上全路径。我们在CMD下运行的`java`和`javac`正是你的`%JAVA_HOME%\bin`路径下的文件，都是JDK提供给开发者的工具包。
3. CLASSPATH：java命令运行的都是`.class`文件，这个路径配置告诉java命令可以在哪个目录下找到`.class`文件来运行。


# 实验二 开发第一个Java程序

目标：完成第一个实验后，我们就要享受一下我们的工作成果，利用JDK开发第一个Java应用程序。

## 1 编写源代码文件

打开记事本，添加如下的代码：

    public class MyFirstJavaProgram {
    
    	/* This is my first java program.  
    	 * This will print 'Hello World' as the output
    	 */
    	public static void main(String []args) {
    		System.out.println("Hello World"); // prints Hello World
    	}
    } 

将文件保存为：MyFirstJavaProgram.java。

## 2 编译源代码

打开命令提示符窗口(win键+R输入cmd/powershell回车)，然后进入源码所在目录(MyFirstJavaProgram.java文件所在目录)。假设它是D:\source。输入下列命令：

```shell
D:
cd source
javac MyFirstJavaProgram.java
```

如果代码中没有错误，提示符进入下一行。学习编程，应该以命令行工具的使用为基础，如果你还不熟悉windows上的命令行程序，可以看这篇教程→[命令行速成(windows-powershell)](/cmd/cmd-quickstarted)。

此时D:\source(MyFirstJavaProgram.java文件所在目录)路径下多出了一个MyFirstJavaProgram.class文件，**注意，这是自动产生的**。编译成功。

## 3 运行.class

首先确保自己在D:\source目录下，然后命令行输入`java MyFirstJavaProgram`来运行程序。

可以看到`Hello World`出现在命令行上。

    D:\source> javac MyFirstJavaProgram.java
    D:\source> java MyFirstJavaProgram 
    Hello World

## 4 注意事项

- 确保`java`和`javac`能够正确运行(参考JDK安装和环境变量配置)；
- 注意`java`和`javac`命令的运行目录，确保命令执行在`.java`和`.class`文件的所在目录；
- 注意源代码文件的扩展名，新建文本文档默认扩展名为`.txt`，修改源代码文件名时需要注意当前系统设置是否显示文件扩展名，以保证代码文件的扩展名是`.java`；
- 源码文件名与代码中`public class `后面的单词——**MyFirstJavaProgram**要一致，且大小写敏感；
- java命令后的文件名要带后缀，javac命令后的文件名不要带后缀。

# 实验二的解读

## 1 源代码文件

保存着Java程序的源代码，源代码是以人类可读的形式存在的。

## 2 class文件

对源代码执行`javac`命令生成的文件，`javac`是编译命令，从`.java`文件到`.class`文件的生成过程叫做编译。`.class`文件也叫做字节码文件，是二进制形式，非人类阅读模式，属于java虚拟机可以阅读的内容。`java`命令正是启动了java虚拟机装载并阅读这个文件，然后按文件中的指令进行运算和输入输出的。更深入的内容，请接着阅读。

## 3 运行机制

![Java运行机制](/public/img/Java8/jvm.png)

- 通过JDK的`javac`命令编译之后， 我们得到了`.class`文件
- 然后我们让虚拟机器来加载并执行这个文件
- 具体JVM内部的流程，大家只做简单了解即可

## 4 JVM

JVM是Java Virtual Machine（Java虚拟机）的缩写，JVM是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。Java虚拟机包括一套字节码指令集、一组寄存器、一个栈、一个垃圾回收堆和一个存储方法域。 JVM屏蔽了与具体操作系统平台相关的信息，使Java程序只需生成在Java虚拟机上运行的目标代码（字节码）,就可以在多种平台上不加修改地运行。JVM在执行字节码时，实际上最终还是把字节码解释成具体平台上的机器指令执行。

Java语言的一个非常重要的特点就是与平台的无关性。而使用Java虚拟机是实现这一特点的关键。一般的高级语言如果要在不同的平台上运行，至少需要编译成不同的目标代码。而引入Java语言虚拟机后，Java语言在不同平台上运行时不需要重新编译。Java语言使用Java虚拟机屏蔽了与具体平台相关的信息，使得Java语言编译程序只需生成在Java虚拟机上运行的目标代码（字节码），就可以在多种平台上不加修改地运行。Java虚拟机在执行字节码时，把字节码解释成具体平台上的机器指令执行。这就是Java的能够“一次编译，到处运行”的原因。

**JVM就像一个翻译，他会把写的Java程序（准确地说，是字节码）翻译给操作系统，使得我们不需要关心操作系统的差异。**

![](/public/img/Java8/1.15.png)

*java跨平台原理*

# 常见面试题

1. 什么是JDK、JRE、JVM？
2. Java跨平台的机理

# 实战练习

编写程序输出自我介绍到控制台。

输处10次Hello World。

输出10000次Hello World