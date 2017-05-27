---
layout: post
title: Hadoop集群多次格式化后datanode启动不了的问题解决
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 多次格式化文件系统后，会出现datanode无法启动，活跃datanode为0的情况，我们来看看怎么解决。
author: 郑未
---

# 问题产生原因

当我们执行文件系统格式化时，会在namenode数据文件夹（即配置文件中dfs.name.dir在本地系统的路径）中保存一个current/VERSION文件，记录namespaceID，标识了所格式化的 namenode的版本。

如果我们频繁的格式化namenode，那么datanode中保存（即配置文件中dfs.data.dir在本地系统的路径）的current/VERSION文件只是你第一次格式化时保存的namenode的ID，
因此就会造成datanode与namenode之间的id不一致。

# 解决办法

把配置文件中dfs.data.dir在本地系统的路径下的`current/VERSION`中的namespaceID改为与namenode一样。

第一种方法是删除DataNode的所有资料（及将集群中每个datanode的/hdfs/data/current中的VERSION删掉，**然后执行**`hadoop namenode -format`重启集群，错误消失。<推荐>）；

第二种方法是修改每个DataNode的namespaceID（位于/hdfs/data/current/VERSION文件中）<优先>
或修改NameNode的namespaceID（位于/hdfs/name/current/VERSION文件中），使其一致。
