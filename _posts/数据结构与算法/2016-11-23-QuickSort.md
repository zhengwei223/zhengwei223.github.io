---
layout: post
title: 排序专题——快速排序
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法 快速排序
description: 这一章我们要掌握著名的快速排序算法，以及了解为什么它比较快（比堆排序还要快）
author: 郑未
---

# 算法描述

分治法：

1、分解：数组A[p..r]被划分为两个子数组A[p..q-1]和A[q+1,r]，使得A[q]为大小居中的数，左侧A[p..q-1]中的每个元素都小于等于它，而右侧A[q+1,r]中的每个元素都大于等于它。其中计算下标q也是划分过程的一部分。

2、解决：通过递归调用快速排序，对子数组A[p..q-1]和A[q+1,r]进行排序

3、合并：因为子数组都是原址排序的，所以不需要合并，数组A[p..r]已经有序

    QuickSort(A,p,r)
      if p<r
        q=Partition(A,p,r)
        QuickSort(A,p,q-1)
        QuickSort(A,q+1,r)

# Partition算法

这个算法，是快排的核心，也叫分区算法。

定义一个主元（pivot），它的任务是把主元放在数组中的某个位置，使得以主元为分界，小于等于它的数都在左边，大于它的数都在右边，最后返回主元的索引；

因为数组一开始是无序的，这意味着我们要不断调整元素的位置，才能完成上述的任务。

## 一遍单向扫描法

![Alt text](/public/img/algorithm/partition1.jpg)

一遍扫描法的思路是，用两个指针将数组划分为三个区间，扫描指针（scan_pos）左边是确认小于主元的，扫描指针到某个指针(next_bigger_pos)中间为未知的，因此我们将第二个指针(next_bigger_pos)称为未知区间末指针，末指针的右边区间为确认大于主元的元素，伪代码如下

    partition(A,p,r)
      pivot = A[p]
      scan_pos = p+1
      next_bigger_pos = r

      while(scan_pos <= next_bigger_pos){
        if(A[scan_pos]<=pivot)
          scan_pos++
        else
          swap(A,scan_pos,next_bigger_pos);
          next_bigger_pos--

      swap(A,next_bigger_pos,p)  //主元定位
      return next_bigger_pos

java实现代码：

    // 分区算法
  	static int partition1(int[] arr, int p, int r) {
  		int pivot = arr[p];
  		int scan_pos = p+1;
  		int next_bigger_pos = r;
  		while (scan_pos<=next_bigger_pos) {
  			if (arr[scan_pos]<=pivot) {
  				scan_pos++;
  			}else{
  				Util.swap(arr, scan_pos, next_bigger_pos);
  				next_bigger_pos--;
  			}
  		}
  		Util.swap(arr, p, next_bigger_pos);
  		System.out.println("..." + next_bigger_pos + "..." + Arrays.toString(arr));
  		return next_bigger_pos;
  	}      

## 双向扫描法

双向扫描的思路是，头尾指针往中间扫描，从左找到大于主元的元素，从右找到小于主元的元素二者交换，继续扫描，直到左侧无大元素，右侧无小元素。

下面是伪代码：

    Partition(A,p,r)
      pivot = A[p] //设中心点为第一个元素

      while(p<r)
        while(p<r && arr[r]>=pivot) r--; // 从右侧寻找更小的
        arr[p] = arr[r]  // r是大元素，往左侧交换
        while(p<r && arr[p]<=pivot) p++; // 从左侧寻找更大的
        arr[r] = arr[p]  // p是小元素，往右侧交换
      arr[p] = pivot  // p恰好是主元应该呆的地方
      return p

这里没有用到swap函数，但也有swap过程。
该算法比较简洁精妙，需要好好品味一下。Partition算法的时间复杂度为Θ(n)，因为它对每个元素只扫描一次。

	// 分区算法2
	static int partition2(int[] arr, int p, int r) {
		int pivot = arr[p];

		while (p < r) {
			while (p < r && arr[r] >= pivot)
				r--; // 从右侧寻找更小的
			arr[p] = arr[r]; // 小的往左侧调
			while (p < r && arr[p] <= pivot)
				p++; // 从左侧寻找更大的
			arr[r] = arr[p]; // 大的往右侧调
		}
		arr[p] = pivot;
		System.out.println("..." + p + "..." + Arrays.toString(arr));
		return p;
	}

# 性能分析

## 最坏的划分

如果每次划分都是n-1个元素和0个元素进行递归，即每次partition得到的中心点都是第一个元素，那时间度是线性级数，为Θ(n²)。

## 最好的划分

每次子问题的规模都是n/2，那么其时间复杂度为Θ(nlgn)

## 平衡划分

快排的平均运行时间更接近于其最好情况。


# 随机化版本

每次随机抽取一个元素作为主元（中心点），只需对partition函数做小小的改动即可：

    i = RANDOM(p,r)
    exchange A[p] with A[i]  // 将随机抽取的主元放到首位




# 对于规模的优化

当输入数据几乎有序时，插入排序速度很快。可以这样利用这一特点，当对于一个长度小于k的子数组调用快速排序时，直接返回。当上层的快速排序调用返回后，对整个数组运行插入排序来完成排序过程。这一排序算法的期望时间复杂度为O(nk+nlg(n/k))。

大家可以自己试试代码编写。

# 有相同元素值的快速排序——三分法

![Alt text](/public/img/algorithm/partition3.jpg)

为了应对相同元素的重复比较，在一遍单向扫描的基础上稍加改进，就变成了三路划分法：

添加一个指针，记录“等于”区间的开头。

    partition(A,p,r)
      pivot = A[p]
      scan_pos = p+1
      next_less_pos = p
      next_bigger_pos = r

      while(scan_pos <= next_bigger_pos){
        if(A[scan_pos] < pivot)
          swap(A,next_less_pos,scan_pos)
          scan_pos++
          next_less_pos++
        else if(A[scan_pos] > pivot)
          swap(A,scan_pos,next_bigger_pos);
          next_bigger_pos--
        else
          scan_pos++

      return {next_less_pos,next_bigger_pos}

实现代码：

	//	三区间划分法
	static int[] partition3(int[] arr, int p, int r) {
		int pivot = arr[p]; // 主元
		int next_less_pos = p;//指向等于主元的第一个元素，“等于”区间的头指针，其实也是“小于”区间的末指针的下一个指针
		int next_bigger_pos = r;//指向未知的最后一个元素，其后是确认大于主元的区间，“未知”区间的末指针
		int next_scan_pos = p+1; // 从主元的后一个元素开始扫描
		while (next_scan_pos <= next_bigger_pos) {
			if (arr[next_scan_pos]<pivot) {  // 扫描到的元素小于主元，将当前元素挪到“等于”区间的前面
				Util.swap(arr, next_scan_pos, next_less_pos);
				next_less_pos++;  // “等于”区间的头指针向后移
				next_scan_pos++;  // 扫描指针后移
			}else if(arr[next_scan_pos]>pivot){  // 扫描到的元素大于主元，交换当前元素和“未知”区间的末指针
				Util.swap(arr, next_scan_pos, next_bigger_pos);
				next_bigger_pos--;  // 未知区间末指针前移，这是扫描指针不能后移
			}else {
				next_scan_pos++;  //相等，“等于”区间加长了，但是“等于”区间的头指针和“未知”区间的末指针都不必移动
			}
		}
		System.out.println("..." + p + "..." + Arrays.toString(arr));
		return new int[]{next_less_pos,next_bigger_pos};
	}


# partition的别用——寻找集合中从小到大第K个数（第k小的数）

此问题的学名叫做：求第k个顺序统计量——集合中第k小的数。

这是一个专题，请参考[这篇教程](/数据结构与算法/OrderStatistic)。