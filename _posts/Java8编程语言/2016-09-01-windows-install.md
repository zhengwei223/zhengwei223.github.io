---
layout: post
title: Java初体验
category: 初学者的第一套Java教程
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 开发环境
description: 
author: 付天有

---

# 实验一：windows上搭建Java开发环境

目标：在windows操作系统上搭建Java开发环境。

## 实验步骤：

### 0 下载

搭建Java开发环境，第一步我们就需要安装JDK。大家可以在ORACLE官方网站上下载，下载路径：[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.5.jpg)

这里要提醒大家，不同平台和系统的安装文件是不一样的，根据自己电脑的情况选着合适的版本进行安装,32位选x86，64位选择x64。

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/master/public/img/Java8/1.6.jpg)

### 1 安装

下载后JDK的安装根据提示进行，还有安装JDK的时候也会安装JRE，一并安装就可以了。
安装JDK，安装过程中可以自定义安装目录等信息，例如我们选择安装目录为 C:\Program Files (x86)\Java\jdk1.8.0_91。

### 2 配置环境变量
当我们安装好JDK后，就要配置环境变量了。一般来说，我们会配置这三个环境变量：

- JAVA_HOME ：配置 JDK 安装路径

- PATH ：配置 JDK 命令文件的位置

- CLASSPATH ：配置类库文件的位置

#### 详细步骤：

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

变量值：`.;%JAVA_HOME%\lib`

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

### 3 测试JDK是否安装成功

1、"开始"->"运行"，键入"cmd"；

2、键入命令: java -version、java、javac 几个命令，出现正常提示信息，说明环境变量配置成功；

![](https://coding.net/u/lanqiao/p/lanqiao/git/raw/coding-pages/public/img/Java8/2016-08-05_javac.png)

## 解读

### 我们安装了什么：

- JDK: java develop kit (Java 开发包)，也是我们步骤1和2的核心角色，以前JDK 叫做java software develop kit， 后来出了1.2版本后， 就改名叫JDK了。所以如果有人和你说JavaSDK请不要感觉陌生。JDK为我们提供了开发应用程序所需要的一系列工具。
- JRE. java runtime environment（Java 运行环境）对于大多数Java用户，可能是需要运行起来Java开发的应用程序，而不需要去开发具体程序，此时仅安装JRE即可，**JDK的安装是包含JRE的**。 

### 解释环境变量

1. JAVA_HOME：顾名思义，Java的家，设定这个变量是为了让操作系统(windows)找到你JDK安装位置。其他的环境变量都可以利用`%JAVA_HOME%`来引用这个路径。

2. Path：我们知道windows的可执行文件都是已.exe的文件。假设你的系统中有一个`D:\develop\Java\java8\bin\java.exe`文件，在同文件夹下还有一个`D:\develop\Java\java8\bin\javac.exe`，且这两个文件我们会经常用到，我们就可以把`D:\develop\Java\java8\bin`路径配置到环境变量的`path`中，这样我们可以直接直接通过path下的文件名来运行文件，而不需要每次都带上全路径。我们在CMD下运行的`java`和`javac`正是你的`JDK/bin`路径下的文件，都是JDK提供给开发者的工具包。
3. ClassPath：Java命令运行的都是.class的文件，这个路径配置的就是系统可以在哪个目录下找到.class文件来运行。后续内容会进一步了解class文件

## 注意事项

在设置环境变量过程中一定要注意，`;`和`,`均为半角英文状态下输入。

# 实验二： 开发第一个Java程序

目标：完成第一个实验后，我们就要享受一下我们的工作成果，利用JDK开发第一个Java应用程序。

## 实验步骤

### 1.编写源代码文件

打开记事本，并添加如下的代码：

    public class MyFirstJavaProgram {
    
    	/* This is my first java program.  
    	 * This will print 'Hello World' as the output
    	 */
    	public static void main(String []args) {
    		System.out.println("Hello World"); // prints Hello World
    	}
    } 

将文件另存为：MyFirstJavaProgram.java。

### 2.编译源代码
打开命令提示符窗口(win键+R输入cmd回车)，然后去进入保存类的目录(MyFirstJavaProgram.java文件所在目录)。假设它是D:\source。

输入`javac MyFirstJavaProgram.java`，然后按回车来编译代码。如果代码中没有错误，在命令提示符下将到下一行。

此时D:\source(MyFirstJavaProgram.java文件所在目录)路径下多出了一个MyFirstJavaProgram.class文件。证明编译成功。

### 3.运行.class

命令提示符窗口输入`java MyFirstJavaProgram`来运行程序。

将可以看到 ' Hello World ' 印在窗口上。

    D:\source> javac MyFirstJavaProgram.java
    D:\source> java MyFirstJavaProgram 
    Hello World

## 注意事项

- 确保`java`和`javac`能够正确运行(参考JDK安装和环境变量配置)

- 注意`java`和`javac`命令的运行目录，确保命令执行在.java和.class文件的所在目录。

- 注意源代码文件的扩展名，新建文本文档默认扩展名为.txt，修改源代码文件名时需要注意当前系统设置是否显示文件扩展名，以保证代码文件的扩展名是.java

- 文件名与代码中`public class MyFirstJavaProgram`中的**MyFirstJavaProgram**相一致，且大小写敏感。

## 解读

### 源代码文件

是我们编写程序的源文件，里面写的就是Java的程序代码。

### class文件

由源代码执行`javac`命令生成的文件，`javac`是编译命令，从.java文件到.class文件的生成过程叫做编译。我们通过`java`命令运行的文件也正是这个.class文件。

### 运行机制

![Java运行机制](https://coding.net/u/lanqiao/p/lanqiao/git/raw/coding-pages/public/img/Java8/jvm.png)

通过JDK的`javac`命令编译之后， 我们得到了HelloWorld.class

然后我们让虚拟机器来执行这个HelloWorld。

具体JVM内部的流程，大家先做了解。

总结来说，计算机运行的本质上是经过JVM处理过的字节码文件。

### JVM

JVM是Java Virtual Machine（Java虚拟机）的缩写，JVM是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。Java虚拟机包括一套字节码指令集、一组寄存器、一个栈、一个垃圾回收堆和一个存储方法域。 JVM屏蔽了与具体操作系统平台相关的信息，使Java程序只需生成在Java虚拟机上运行的目标代码（字节码）,就可以在多种平台上不加修改地运行。JVM在执行字节码时，实际上最终还是把字节码解释成具体平台上的机器指令执行。

Java语言的一个非常重要的特点就是与平台的无关性。而使用Java虚拟机是实现这一特点的关键。一般的高级语言如果要在不同的平台上运行，至少需要编译成不同的目标代码。而引入Java语言虚拟机后，Java语言在不同平台上运行时不需要重新编译。Java语言使用Java虚拟机屏蔽了与具体平台相关的信息，使得Java语言编译程序只需生成在Java虚拟机上运行的目标代码（字节码），就可以在多种平台上不加修改地运行。Java虚拟机在执行字节码时，把字节码解释成具体平台上的机器指令执行。这就是Java的能够“一次编译，到处运行”的原因。

**JVM就像一个翻译，他会把写的Java程序翻译给操作系统，使得我们不需要关心操作系统的差异。**

# 常见面试题

1、	什么是JDK、JRE、JVM？

2、	Java跨平台的机理

# 实战练习

编写程序输出自我介绍到控制台。