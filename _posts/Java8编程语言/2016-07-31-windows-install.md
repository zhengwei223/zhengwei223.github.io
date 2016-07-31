---
layout: post
title: windows上搭建Java开发环境
category: Java8编程语言
tags: Java 入门
keywords: 蓝桥 lanqiao 教程 java Java8 开发环境
description: 
author: 付天有
importance: 4
---

# windows上搭建Java开发环境

## 1.下载

搭建Java开发环境，第一步我们就需要安装JDK。大家可以在ORACLE官方网站上下载，下载路径：[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

![](/public/img/Java8/1.5.jpg)

这里要提醒各位同学，不同平台和系统的安装文件是不一样的，根据自己电脑的情况选着合适的版本进行安装,32位选x86，64位选择x64。

![](/public/img/Java8/1.6.jpg)

## 2.安装

下载后JDK的安装根据提示进行，还有安装JDK的时候也会安装JRE，一并安装就可以了。
安装JDK，安装过程中可以自定义安装目录等信息，例如我们选择安装目录为 C:\Program Files (x86)\Java\jdk1.8.0_91。

## 3.配置环境变量
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

在"系统变量"中设置3项属性，JAVA_HOME,PATH,CLASSPATH(大小写无所谓),若已存在则点击"编辑"，不存在则点击"新建"。

变量设置参数如下：

变量名：JAVA_HOME

变量值：C:\Program Files (x86)\Java\jdk1.8.0_91        // 要根据自己的实际


变量名：CLASSPATH

变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;         //记得前面有个"."

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

## 4.测试JDK是否安装成功

1、"开始"->"运行"，键入"cmd"；

2、键入命令: java -version、java、javac 几个命令，出现正常提示信息，说明环境变量配置成功；

