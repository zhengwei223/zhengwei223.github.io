---
layout: post
title: 随机算法
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法 概率分析 随机算法
description: 使用随机算法的目的是希望算法不受输入分布的影响，尽可能维持算法的平均复杂度。
author: 郑未
---

# 概率知识

下列为需要掌握的概率统计知识

- 名词：样本空间、基本事件
- 概率论公理
- 排列组合
- 条件概率公式
- 全概率公式
- 贝叶斯定理（公式）
- 数学期望的定义与计算方式

# 构造数组的随机排列

一个通常的方法是为数组的每个元素A[i]赋予一个随机的优先级P[i]，然后依据优先级对数组A中的元素进行排序。

    PERMUTE-BY-SORTING
      n=A.length
      let P[1..n] be a new array
      for i = 1 to n
        P[i] = RANDOM(1,n³)
      sort A,using P as sort keys

第五行选取一个在1~n³之间的随机数，是为了让P中所有优先级尽可能唯一。

---

产生随机排列的一个更好的方法是原址排列给定数组。在进行第i次迭代时，元素A[i]是从元素A[i]到A[n]中随机选取的。第i次迭代以后，A[i]不再改变。

    RANDOMIZE-IN-PLACE
      n = A.length
      for i=1 to n
       swap A[i] with A[RANDOM(i,n)]

这也能产生一个均匀随机排列。   
