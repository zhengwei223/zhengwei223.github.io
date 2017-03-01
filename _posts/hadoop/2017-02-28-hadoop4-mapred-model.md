---
layout: post
title: MapReduce编程模型
category: Hadoop
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 本章主要介绍MapReduce的编程模型以及基本原理。
author: 郑未
---

# 模型架构

在Hadoop中，用于执行计算任务(MapReduce任务)的机器有两个角色：一个是JobTracker，一个是TaskTracker，前者用于管理和调度工作，后者用于执行工作。

一般来说，一个Hadoop集群由一个JobTracker和N个TaskTracker构成。

# 执行流程

每次计算任务都可以分为两个阶段，Map阶段和Reduce阶段。

其中，Map阶段接收一组键值对模式<key, Value>的输入并产生同样是键值对模式<key, Value>的中间输出；

Reduce阶段负责接收Map产生的中间输出<key, Value>，然后对这个结果进行处理并输出结果。

Input--><K1,V1>--Map--><K2,V2>--Reduce--><K3,V3>-->Output

**这里面就有四个过程：**

- 过程1：接收数据源并把数据源中的数据格式化为键值对<K1,V1>
- 过程2：map过程，处理<K1,V1>，产生<K2,V2>，这是一个中间输出，hadoop会将中间输出中所有key值相同的value集合起来，形如 list<key2,value2>
- 过程3：Reduce 接收到list<key2,value2>，主要对集合进行合并，输出为<K3,V3>
- 过程4：将结果格式化输出到指定的数据目标（文件、数据库等），**这个数据结果是放在hdfs上的**


# 编程模型

## 大体结构


