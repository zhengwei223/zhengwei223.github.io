---
layout: post
title: 中位数和顺序统计学
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法  中位数和顺序统计学
description: 
author: 郑未
---

本章所讨论的问题是在一个由n个不同数值构成的集合中选择第i个顺序统计量问题。主要讲的内容是如何在线性时间内O(n)时间内在集合S中选择第i小的元素，最基本的是选择集合的最大值和最小值。一般情况下选择的元素是随机的，最大值和最小值是特殊情况，书中重点介绍了如何采用分治算法来实现选择第i小的元素，并**借助中位数进行优化处理，保证最坏保证运行时间是线性的O(n)**。

# 基本概念

　顺序统计量：在一个由n个元素组成的集合中，第i个顺序统计量是值该集合中第i小的元素。例如最小值是第1个顺序统计量，最大值是第n个顺序统计量。

  中位数：一般来说，中位数是指它所在集合的“中间元素”，当n为奇数时，中位数是唯一的，出现位置为n/2；当n为偶数时候，存在两个中位数，位置分别为n/2（上中位数）和n/2+1（下中位数）。

# 选择问题描述

  输入：一个包含n个（不同的）数的集合A和一个数i，1≤i≤n。

  输出：元素x∈A，它恰大于A中其他的i-1个元素。

  最直接的办法就是采用一种排序算法先对集合A进行排序，然后输出第i个元素即可。可以采用前面讲到的归并排序、堆排序和快速排序，运行时间为**O(nlgn)**。接下来书中由浅入深的讲如何在线性时间内解决这个问题。

# 最大值和最小值

  要在集合中选择最大值和最小值，可以通过两两元素比较，并记录最大值和最小值，n元素的集合需要比较n-1次，这样运行时间为O(n)。

  **类似选择排序法。**

    MINMUN(A)
      min = A[1]
      for i=1 to length(A)
        do if min > A[i]
          then  min >= A[i]
      return min

## 同时找出集合的最大值和最小值 ##

  方法1：按照上面讲到的方法，分别独立的找出集合的最大值和最小值，各用n-1次比较，共有2n-2次比较。

  方法2：可否将最大值和最小值结合在一起寻找呢？答案是可以的，在两两比较过程中同时记录最大值和最小值，这样最大需要3n/2次比较。现在的做法不是将每一个输入元素与当前的最大值和最小值进行比较，而是成对的处理元素，先将一对输入元素进行比较，然后把较大者与当前最大值比较，较小者与当前最小者比较，因此每两个元素需要3次比较。初始设置最大值和最小值方法：如何n为奇数，就将最大值和最小值都设置为第一个元素的值，然后成对的处理后续的元素。如果n为偶数，那么先比较前面两个元素的值，较大的设置为最大值，较小的设置为最小值，然后成对处理后续的元素。这样做的目的保证能够成对的处理后续的元素。

![](/public/img/algorithm/max-and-min-1.png)

# 以期望线性时间做选择 #

书中介绍了采用分治算法解决一般的选择问题，其过程与快速排序过程中划分类似。每次划分集合可以确定一个元素的最终位置，根据这个位置可以判断是否是我们要求的第i小的元素。如果不是，那么我们只关心划分产出两个子部分中的其中一个，根据i的值来判断是前一个还是后一个，然后接着对子数组进行划分，重复此过程，直到找到第i个小的元素。划分可以采用随机划分，这样能够保证期望时间是θ(n)（假设所有元素是不同的）。

给个例子说明此过程，假设现有集合A={32,23,12,67,45,78,10,39,9,58}，要求其第5小的元素，假设在划分过程中以总是以最后一个元素为主元素进行划分。执行过程如下图所示：

![](/public/img/algorithm/the-iTh-num.png)

    package org.lanqiao.algo.search;
    
    public class OrderStatistic {
    	/**
    	 * 
    	 * @param arr
    	 *          数组
    	 * @param p
    	 *          开始下标
    	 * @param r
    	 *          结束小标
    	 * @param i
    	 *          求第i小元素
    	 * @return
    	 */
    	public static int randomSelect(int[] arr, int p, int r, int i) {
    		int q = partition(arr, p, r);
    		int k = q - p + 1; // q是下标，k才是其顺序统计位置
    		if (k == i) {
    			return arr[q];
    		} else if (k > i) {
    			return randomSelect(arr, p, q - 1, i);
    		} else {
    			return randomSelect(arr, q + 1, r, i - k); // 注意最后一个参数为顺序统计位置
    		}
    	}
    
    	/*
    	 * 要非常熟练地写出分区函数
    	 */
    	public static int partition(int[] arr, int p, int r) {
    		int pivot = arr[r];
    		while (p < r) {
    			while (p < r && arr[p] <= pivot)
    				p++;
    			arr[r] = arr[p];
    
    			while (p < r && arr[r] >= pivot)
    				r--;
    			arr[p] = arr[r];
    		}
    		arr[r] = pivot;
    		return r;
    	}
    }

测试用例：

    package org.lanqiao.algo.search;
    
    import static org.assertj.core.api.Assertions.assertThat;
    
    import org.junit.Test;
    
    public class OrderStatisticTest {
    
      @Test
      public void testRandomSelect() {
      	int[] arr = new int[] { 2, 4, 5, 3, 1 };
      	//  用12345，第三个顺序统计元素应该是arr[2]即3这个数
      	assertThat(OrderStatistic.randomSelect(arr, 0, arr.length - 1, 1)).isEqualTo(1);
      	assertThat(OrderStatistic.randomSelect(arr, 0, arr.length - 1, 2)).isEqualTo(2);
      	assertThat(OrderStatistic.randomSelect(arr, 0, arr.length - 1, 3)).isEqualTo(3);
      	assertThat(OrderStatistic.randomSelect(arr, 0, arr.length - 1, 4)).isEqualTo(4);
      	assertThat(OrderStatistic.randomSelect(arr, 0, arr.length - 1, 5)).isEqualTo(5);
      }
    
    	@Test
    	public void testPartition() {
    		int indexOfPivot = OrderStatistic.partition(new int[] { 4, 2, 5, 3, 7, 6 }, 0, 5);
    		assertThat(indexOfPivot).isEqualTo(4);
    	}
    
    }


RANDOMIZED_SELECT通过对输入数组的递归划分来找出所求元素，该算法要保证对数组的划分是个好划分才更加高效。RANDOMIZED_SELECT的**最坏情况运行时间为θ(n^2)**，即使是选择最小元素也是如此。因为在每次划分过程中，导致划分后两边不对称，总是按照剩下元素中最大的划分进行。


# 改进算法，保证最坏情况下Θ(n) #

算法思想是要保证对数组的划分是个好的划分，需要对PARTITION过程进行修改。下述算法称为**SELECT算法**。

> （1）将输入数组的n个元素划分为n/5（上取整）组，每组5个元素，且至多只有一个组有剩下的n%5个元素组成。（为何是5？证明比较难）
> 
> （2）寻找每个子数组的**中位数**。首先对每组中的元素（至多为5个）进行插入排序，然后从排序后的序列中选择出中位数。
> 
> （3）对第2步中找出的n/5（上取整）个中位数，递归调用SELECT以找出其中位数x。（如果是偶数取下中位数）
> 
> （4）调用PARTITION过程，按照**中位数x**对输入数组进行划分（以中位数为主元）。确定中位数x的位置k。
> 
> （5）如果i=k，则返回x。否则，如果i<k，则在低区间递归调用SELECT以找出第i小的元素，若干i>k，则在高区间找第(i-k)个最小元素。

SELECT算法通过中位数进行划分，可以保证每次划分是对称的，这样就能保证最坏情况下运行时间为θ(n)。


    //	指定主元的情况下，原交换方式要变化一下
  	public static int partition(int[] arr, int p, int r,int pivot) {
  		Util.swap(arr, r, Util.indexOf(arr, pivot));
  		while (p < r) {
  			while (p < r && arr[p] <= pivot)
  				p++;
  			arr[r] = arr[p];
  
  			while (p < r && arr[r] >= pivot)
  				r--;
  			arr[p] = arr[r];
  		}
  		arr[r] = pivot;
  		return r;
  	}
  	/**
  	 * 最差O(n)
  	 * 
  	 * @param arr
  	 *          数组
  	 * @param p
  	 *          开始下标
  	 * @param r
  	 *          结束小标
  	 * @param i
  	 *          求第i小元素
  	 * @return
  	 */
  	public static int select(int[] arr, int p, int r, int i) {
  		int pivot = getMedian(arr, p, r);
  		int q = partition(arr, p, r,pivot);
  		int k = q - p + 1; // q是下标，k才是其顺序统计位置
  		if (k == i) {
  			return arr[q];
  		} else if (k > i) {
  			return select(arr, p, q - 1, i);
  		} else {
  			return select(arr, q + 1, r, i - k); // 注意最后一个参数为顺序统计位置
  		}
  	}
  	// 获取中位数
  	public static int getMedian(int[] arr, int p, int r){
  		int size = r-p+1;// 数组长度
  		int groupSize = (size % 5 == 0) ? (size / 5) : (size / 5 + 1);
  		int medians[] = new int[groupSize];
  		int indexOfMedians = 0;
  		for (int j = 0; j < groupSize; j++) {
  			if (j==groupSize-1) {
  				InsertionSort.sort(arr, p+j*5, r); // 排序最后一组
  				medians[indexOfMedians++] = arr[(p+j*5+r)/2]; // 最后一组的中间那个
  			}else {
  				InsertionSort.sort(arr, p+j*5, p+j*5+4);  // 排序非最后一组的某个组
  				medians[indexOfMedians++] = arr[p+j*5+2];  // 当前组（排序后）的中间那个
  			}		
  		}
  		// 对medians排序
  		InsertionSort.sort(medians, 0, medians.length-1);
  		return medians[medians.length/2];
  	}

测试用例：

    @Test
    public void testGetMedian() {
    	int[] arr = { 32, 23, 12, 67, 45, 78, 10, 39, 9, 58, 125, 84 };// 中位数为39
    	assertThat(OrderStatistic.getMedian(arr, 0, arr.length)).isEqualTo(39);
    }
    
    @Test
    public void testSelect(){
    	int[] arr = { 32, 23, 12, 67, 45, 78, 10, 39, 9, 58, 125, 84 };// 中位数为39
    	//  9 10 12 23 32 39 45 58 67 78 84 125
    	assertThat(OrderStatistic.select(arr, 0, arr.length-1, 5)).isEqualTo(32);
    	assertThat(OrderStatistic.select(arr, 0, arr.length-1, 1)).isEqualTo(9);
    	assertThat(OrderStatistic.select(arr, 0, arr.length-1, 6)).isEqualTo(39);
    	assertThat(OrderStatistic.select(arr, 0, arr.length-1, 10)).isEqualTo(78);
    }