---
layout: post
title: HDFS常用命令
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 本章介绍hdfs常用的命令
author: 郑未
---

# HDFS文件的权限以及读写操作

HDFS文件的权限：
- 与Linux文件权限类似
- r: read; w:write; x:execute，权限x对于文件忽略，对于文件夹表示是否允许访问其内容
- 如果Linux系统用户zhangsan使用hadoop命令创建一个文件，那么这个文件在HDFS中owner就是zhangsan
- HDFS的权限目的：阻止好人做错事，而不是阻止坏人做坏事。HDFS相信，你告诉我你是谁，我就认为你是谁

# HDFS下的文件操作

## 1、列出HDFS文件

通过“-ls”命令列出HDFS下的文件

    hdfs dfs -ls

注意：在HDFS中，没有当前工作目录这样的概念，也没有cd这个命令

## 2、列出HDFS目录下某个文档中的文件

此处展示的是“`-ls  文件名`”命令浏览HDFS下名为in的文档中的文件

    hdfs dfs -ls in

## 3、上传文件到HDFS

此处展示的是“`-put  文件1  文件2`”命令将当前目录下的test1文件上传到HDFS上并重命名为test

    hdfs dfs -put test1 test

注意：在执行“-put”时只有两种可能，即是执行成功和执行失败。在上传文件时，文件首先复制到DataNode上，只有所有的DataNode都成功接收完数据，文件上传才是成功的。

## 4、将HDFS中的文件复制到本地系统中

此处展示的是“`-get  文件1  文件2`”命令将HDFS中的in文件复制到本地系统并命名为getin：

    hdfs dfs -get in getin

跨主机访问

不同主机的操作系统最好一致，都有hadoop环境，互相能ping通（通过主机名），防火墙全部关闭：
主机1持有hdfs的namenode，其core-site.xml应该以主机名或者ip地址指定fs.defaultFS而不是localhost

主机2：

    hdfs dfs -put ~/.vim/.netrwhist hdfs://主机1:9000/user/hadoop/inputs


## 5、删除HDFS下的文档

此处展示的是“`-rmr  文件`”命令删除HDFS下名为out的文档：

    hdfs dfs -rmr out

## 6、查看HDFS下的某个文件

此处展示的是“-cat  文件”命令查看HDFS下in文件中的内容：

    hdfs dfs -cat in/*

# 管理与更新

## 1、报告HDFS的基本统计信息

通过“`-report`”命令查看HDFS的基本统计信息：

    hdfs dfsadmin -report

## 2、退出安全模式

NameNode在启动时会自动进入安全模式。安全模式是NameNode的一种状态，在这个阶段，文件系统不允许有任何的修改。安全模式的目的是在系统启动时检查各个DataNode
上数据块的有效性，同时根据策略对数据块进行必要的复制和删除，当数据块的最小百分比数满足配置的最小副本数条件时，会自动退出安全模式。

    hdfs dfsadmin -safemode leave

## 3、进入安全模式

    hdfs dfsadmin -safemode enter

## 4、添加节点

可扩展性是HDFS的一个重要的特性，向HDFS集群中添加节点是很容易实现的。添加一个新的DataNode节点，首先在新加的节点上安装好hadoop，要和NameNode使用相同的配置，修改`master`文件，加入NameNode主机名。然后在NameNode节点上修改`slaves`文件，加入新节点主机名。再建立到新节点无密码SSH连接（`hosts`文件也要修改），运行启动命令：

    $ bin/start-all.sh

通过http://(主机名):50070可查看到新的DataNode节点添加成功

## 5、负载均衡

用户可以使用下面的命令来重新平衡DataNode上的数据块的分布：

    $ bin/start-balancer.sh