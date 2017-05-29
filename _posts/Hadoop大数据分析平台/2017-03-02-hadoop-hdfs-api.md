---
layout: post
title: HDFS编程
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 本文将带领大家熟悉HDFS的Java编程API。
author: 郑未
---

>导读

**通常我们不需要使用编程手段来维护HDFS文件系统,所以本文重点关注hadoop编程api的包结构,另外熟悉下Linux下编译和打包hadoop程序的流程.**

Hadoop不同的文件系统之间通过调用Java API进行交互，之前介绍的Shell命令，本质上就是Java API的应用。下面提供了Hadoop官方的Hadoop API文档，想要深入学习Hadoop，可以访问如下网站，查看各个API的功能。

[Hadoop API文档](http://hadoop.apache.org/docs/stable/api/)

# eclipse安装

利用Java API进行交互，需要利用软件Eclipse编写Java程序。

## 在Ubuntu中安装Eclipse:

利用Ubuntu左侧边栏自带的软件中心安装软件，在Ubuntu左侧边栏打开软件中心.在软件中心搜索栏输入“ec”，软件中心会自动搜索相关的软件.点击Eclipse，进行安装.

# 在Eclipse创建项目并导入需要的jar包

略

### 项目加载所需要用到的jar包

如何获取Java API: API所在的jar包都在已经安装好的hadoop文件夹里，路径：/usr/local/hadoop/share/hadoop(如果您安装的hadoop不在此目录，请找到jar包所在的文件夹)


加载路径common文件夹下1)lib下所有的jar包2)hadoop-common-2.7.1.jar
加载路径hdfs文件夹下1)lib所有的jar包2)hadoop-hdfs-2.7.1.jar

# 实例

利用hadoop 的java api检测伪分布式文件系统HDFS上是否存在某个文件，写入文件，读取文件。

熟悉几个类的作用:

- Configuration：配置文件系统路径等参数
- FileSystem：文件系统的抽象
- FSDataInputStream：输入流
- FSDataOutputStream：输出流
- Path：路径的抽象

## 代码

    package org.lanqiao.hadoop.hdfsDemo;

    import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;

    import org.apache.hadoop.conf.Configuration;
    import org.apache.hadoop.fs.FSDataInputStream;
    import org.apache.hadoop.fs.FSDataOutputStream;
    import org.apache.hadoop.fs.FileSystem;
    import org.apache.hadoop.fs.Path;
    /**
     *
     * @author zhengwei 2017-0529
     *
     */
    public class HdfsCrud {
        public static void readFile() {
            // 1.获得一个Configuration对象，有相关配置才能链接到一个文件系统（多种：本地的、网络的、分布式的）
            Configuration conf = new Configuration(); // 不带任何参数，默认读取classpath下的配置文件中的配置参数
            FileSystem fs = null;
            BufferedReader reader = null;
            try {
                // 2.通过配置文件得到FileSystem的实例
                fs = FileSystem.get(conf);
                // 3.使用FileSystem的实例建立一个指向文件系统中的文件的输入流
                FSDataInputStream fsin = fs.open(new Path(
                        "input/examples.destop.new"));

                // 4.使用javaio对输入流进行读处理
                reader = new BufferedReader(new InputStreamReader(fsin));
                // 下同javase中的变成方法
                String line;
                while ((line = reader.readLine()) != null)
                    System.out.println(line);

            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                // 5.关闭流和文件系统
                try {
                    reader.close();
                    fs.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        public static void writeFile() {
            // 1.获得一个Configuration对象，有相关配置才能链接到一个文件系统（多种：本地的、网络的、分布式的）
            Configuration conf = new Configuration(); // 不带任何参数，默认读取classpath下的配置文件中的配置参数
            FileSystem fs = null;
            FSDataOutputStream fsout = null;
            try {
                // 2.通过配置文件得到FileSystem的实例
                fs = FileSystem.get(conf);
                //boolean flag =  fs.exists(new Path("input/some"));
                //System.out.println("input/some文件是否存在呢？"+flag);
                // 3.使用FileSystem的实例建立一个指向文件系统中的文件的输出流
                fsout = fs.create(new Path("new.txt"));
                // 4.使用javaio写处理
                fsout.writeUTF("这是我通过java程序写入的一段话balabala");
                fsout.flush();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                // 5.关闭流和文件系统
                try {
                    fsout.close();
                    fs.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        public static void main(String[] args) {
            // readFile();
            writeFile();
        }
    }


## 编译部署

如果代码编写在Eclipse里面，那么直接点击运行，即可看到运行结果。

如果还想Hadoop自带的实例那样运行jar包，以上述写入文件的代码为例，还需要做以下操作：
点击Eclipse顶部菜单选项"File",选择"export"--选择"Runnable JAR File"，然后下一步next--假定Chapter3.jar存放在用户目录文件下--在终端输入命令：

    java -jar ~/Chapter3.jar
