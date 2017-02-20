---
layout: post
title: 深入分治法——最大子数组问题的暴力解法到线性解法
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法 最大子数组 
description: 本章开始我们要深入研究分治法。案例为最大子数组问题，我们将示范它的暴力解法到线性解法的思考过程。
author: 郑未

---

> 求连续子数组的最大和

题目描述：

输入一个整形数组，数组里有正数也有负数(如果全部是正数，连续子数组最大和就是整个数组元素的和)。
数组中**连续**的一个或多个整数组成一个子数组，每个子数组都有一个和。
求所有子数组的和的最大值。

例如输入的数组为1, -2, 3, 10, -4, 7, 2, -5，和最大的子数组为3, 10, -4, 7, 2，
因此输出为该子数组的和18。

# 暴力解法

两个for循环，时间复杂度为O(n^2)，如下：

    findByForce(a[0...n-1])
      sum=0           // 记录累加
      maxSum = a[0]   // 记录最大的和，初始化为第一个元素
      for i=0 to n-1
        sum += a[i]    // 重置sum
        maxOfJ=sum;  // 记录这一趟的最大和
        for j=i+1 to n-1 
          sum += a[j]   //累加
          if sum > maxOfJ
            maxOfJ = sum
        // 将这一趟的最大和同整体最大和比较
        if maxOfJ>maxSum 
          maxSum = maxOfJ;
      return maxSum,left,right

暴力法并不难想，求原数组以每个元素为起点的子数组的最大和，这样得到n个最大和，再选最大的，伪代码中用变量进行了控制，并未体现一个选择的过程。

# 分治（递归）解法

有了归并排序（Θ(nlgn)）和二分法(Θ(lgn))等优化算法在先，我们自然想到暴力法是否可优化，而首先想到的是，我们可否先把O(n^2)降为Θ(nlgn)。照搬套路来构思：用递归来缩小层，每层维持Θ(n)，这样就可以得到一个Θ(nlgn)的算法。

## 分治的关键点

1. 原问题可以一直分解为**形式相同**子问题，当子问题规模较小时，可自然求解，如一个元素本身有序
2. 子问题的解通过**合并**可以得到原问题的解
3. 子问题的分解以及解的合并一定是比较简单的，否则分解和合并所花的时间可能超出暴力解法，得不偿失

## 最大子数组问题的分治可行性分析

我们来检查（证明）最大子数组问题是否可以用分治法：

1. 如何分解成规模更小但**形式相同**的子问题，问题规模较小时，可自然求解

试想：从数组的中点将数组分为两个子数组，分别求左右子数组的最大连需求和子数组（后简称为最大子数组），这是可以一直分下去的，而且数组元素个数为1时，它的最大子数组就是它本身。

形式上相同：左右子数组的求解形式和原数组一致

2. 左右数组的最大最数组能否推导出整个数组的最大子数组呢？

在这里，我们遇到一点麻烦，即便我们选择二者中更大的，也不能视为整个数组的最大子数组，如：

[3,-2,1,5,2,2,-1,-1],左侧为[3,-2,1,5]，右侧为[2,2..]，但整个数组的最大子数组是[3,-2,1,5,2,2...]，它的特点是跨越了中点，不属于左边也不属于右边。

**我们漏掉了跨越中点的最大子数组这种可能性，必须深入分析。**

3. 从上一步看出，简单合并无法得到正确结果，如果得到跨越中点的最大子数组，然后对三个结果进行比对，就能得出正确的结果。

4、求跨越中点的最大子数组

由于要求该子数组必须跨越中点（含中点，并连续），这样的限定使问题的求解比较简单：

    FindMaxCrossingSubArray(a[0...n-1],left,right,mid)
      sum = max = a[mid]
      for i=mid-1 down to left
        sum += a[i]
        if sum >= max
          max = sum
      for j=mid+1 down to right
        sum += a[j]
        if sum >= max
          max = sum
      return max

5. 性能方面，层数自然是lgn，每层求跨越中点的最大子数组消耗为cn(因为线性地扫描每个元素一次)，而三个数的比对是常量时间消耗，因此算法整体时间复杂度为Θ(nlgn)。

## 伪代码

    findByRecursive(a[0...n-1],left,right)
      if(left==right){
        return arr[left]
      }
      mid = (left+right)/2 
      leftSum  = findByRecursive(arr,left,mid);
      rightSum = findByRecursive(arr,mid+1,right);
      crossSum = FindMaxCrossingSubArray(arr,left,right,mid);
      if (leftSum>=rightSum&&leftSum>=crossSum) {
        return leftSum
      }else if(rightSum>=leftSum&&rightSum>=crossSum){
        return rightSum
      }else{
        return crossSum
      }  

# *线性解法——《算法导论》习题4.1-5

## 解法

<p class="text-warning">
  对于第一个元素乃至一段数组来说，我们考虑它对于后面的求和的贡献是正向还是负向的，其实也就是大于零还是小于零，如果小于零，它的贡献是负向的，我们要丢弃它，因为最大子数组一定不可能包含它（仔细想想），然后我们从下一个元素开始累加，只要累加是正数，就会对向后求和有正面的贡献，一旦加到某个元素，这一段的和变成负数，我们继续丢弃……在累加的过程中我们需要更新最大和。
</p>

想通上面这一段，代码就比较好写了：

    // 递推法 Θ(n)
    findByDp(a[0...n-1])
      sum = a[0]
      max = sum
      left = right = 0
      for i=1 to n-1
        if sum < 0
          sum  = a[i]
          left = i
        else
          sum += a[i] 

        if sum>max
          max   = sum
          right = i
      return max,left,right

## bug

如果最大和是负数，这个解法存在bug，即我们丢弃的负数和可能已经是最大的和了。


## 动态规划法

动态规划以后还会深讲，这里只贴出代码作为启发大家用：

    static int findByDp(int[] arr,int j){
      // 终止条件
      if (j == 0) {
        return arr[0];
      }
      // 分解，递归
      int dpj_1 = findByDp(arr,j-1);  
      int dpj;  
      // 合并
      // return max(sumj+arr[j+1],arr[j+1]) 
      if (dpj_1>0) {
        dpj =  dpj_1 + arr[j];
      }else{
        dpj =  arr[j];
      }
      if (dpj>dpj_1) {
        return dpj;
      }else{
        return dpj_1;
      }
    }

# 小结

本章我们再次用分治法将算法优化，目前关于分治我们已经掌握了**归并排序**和**最大连续和**这两个经典问题。

最后，作为启发，我们示范了最大连续和的线性解法（普通递推法和可以称为动态规划的递归解法）。