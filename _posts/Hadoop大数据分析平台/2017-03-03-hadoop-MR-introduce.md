---
layout: post
title: MapReduce原理与设计思想
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 本文将带领大家了解MapReduce原理和设计思想，原理的学习非一蹴而就，所以这篇文档至少要看三遍：粗看一遍，实践后再看一遍，遇到思维瓶颈时再看一遍。
author: 郑未
---

# MapReduce是什么？

MapReduce是一种编程范式，可以利用集群环境的成千上万台服务器实现强大的可伸缩性。

MapReduce一次最早源于函数式编程，由Google在一篇名为“MapReduce：Simplified Data Processing on Large Clusters”的文章中率先提出。

使用MapReduce范式时，重点是编写两个函数：

map()
	
  过滤和聚集数据。

reduce()

  根据map()生成的键完成归约、分组和总结。

![MapReduce执行过程的简单视图](/public/img/hadoop/Snip20170530_1.png)

这两个函数定义如下

    map: (k1; v1) →[(k2; v2)]

输入：键值对(k1; v1)表示的数据

处理：文档数据记录(如文本文件中的行，或数据表格中的行)将以“键值对”形式传入map函数；map函数将处理这些键值对，并以另一种键值对形式输出一组键值对作为中间结果：`[(k2; v2)]`

输出：键值对`[(k2; v2)]`表示的一组中间数据

主节点根据唯一的键将中间结果进行洗牌和聚集，然后再一次重新分布到工作节点。

    reduce: (k2; [v2])→[(k3; v3)]

输入： 洗牌后的一个键和值列表`(k2; [v2])`

处理：对传入的中间结果列表数据进行某种整理或进一步的处理,并产生最终的某种形式的结果输出`[(k3; v3)]`

输出：最终输出结果`[(k3; v3)]`

![MapReduce](/public/img/hadoop/MapReduce.jpeg)

各个map函数对所划分的数据并行处理，从不同的输入数据产生不同的中间结果输出

各个reduce也各自并行计算，各自负责处理不同的中间结果数据集合。进行reduce处理之前,必须等到所有的map函数做完，因此,在进入reduce前需要有一个同步障(barrier);这个阶段也负责对map的中间结果数据进行收集整理(aggregation & shuffle)处理,以便reduce更有效地计算最终结果—最终汇总所有reduce的输出结果即可获得最终结果.

# MapReduce的简单解释

# 什么时候用MapReduce

# MapReduce不是什么


