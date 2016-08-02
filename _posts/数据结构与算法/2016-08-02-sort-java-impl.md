---
layout: post
title: 常见排序算法_java版本
category: 数据结构与算法
tags: 进阶 数据结构与算法 排序
keywords: 蓝桥 lanqiao 教程 数据结构 算法 排序
description: 
author: 郑未
importance: 4
order: 1
---

整理了一下几个算法的java实现，希望大家能够喜欢：

```
public class ArraySort
{
/**
* 自1开始，通过交换将i插入其左端的有序的数列中。
* 交换次数不确定，但比较次数较均衡。
* 比冒泡更优。
* @param x
*            数组
* @param off
*            起始下标
* @param len
*            长度
*/
private static void charu(int x[], int off, int len)
{
   for (int i = off; i < len + off; i++)
    for (int j = i; j > off && x[j - 1] > x[j]; j--)
     swap(x, j, j - 1);
}
/**
* 与冒泡相似，每一趟找到自i到末端最小的数的index，然后与i交换
* 一趟只需一次交换，所以比冒泡快
*/
private static void xuanze(int x[], int off, int len)
{
   for (int i = off; i < len + off; i++){
    int min = i;
    for (int j = min; j<len+off; j++){
     if(x[min]>x[j])
      min=j;
    }
    swap(x, i, min);
   }
}
/**
* i从左至右，i定住时将自i到末端最小的数移至i处，完成一趟，以此类推直至i到最右端
* 通过不停交换完成，时间消耗较多
*/
private static void maopao(int x[], int off, int len)
{
   for (int i = off; i < len + off-1; i++){   
    for (int j = i; j<len+off; j++){
     if(x[i]>x[j])
      swap(x, i, j);
    }
   }
}
/**
* 快速排序法：首先任意选取一个数据作为关键数据，然后将所有比它小的数都放到它前面，
* 所有比它大的数都放到它后面，这个过程称为一趟快速排序。之后递归。
* 算法：
* 1）i从左到右找比key大的，i移至此处；j从右到左找比key小的，j移至此处
* 2）若i<j则交换ij，重复1）；否则，一趟完成
* 3）一趟完成之后i如果未到最右端，递归右端；j如果未到达最左端，递归左端
* 此算法可改进，请参详jdk源码。
*/
private static void kuaisu(int x[], int off, int len)
{
   int m = off + (len >> 1); // 中位下标
   int left = off;// 起始下标
   int right = off + len - 1;// 结束下标
   m = med3(x, left, m, right);
   int key = x[m];// 取中间的那个作为关键数据
   // System.out.println("key="+key);
   int i = left;
   int j = right;
   while (true)
   {
    while ((x[i] < key) && (i < right))
     // 从左到右找>=的
     i++;
    while ((x[j] > key) && (j > left))
     // 从右到左找<=的
     j--;
    if (i >= j)
    {
     break;//一趟完成
    }
    swap(x, i, j);
    System.out.printf("swap %d %d:%s/n", i, j, Arrays.toString(x));
   }
   if (i < right)
    kuaisu(x, i + 1, right - i);
   if (j > left)
    kuaisu(x, left, j - left);
}

/**
* 求数值处于中间的下标
*/
private static int med3(int x[], int a, int b, int c)
{
   return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a)
     : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}

/** 在数组x中交换a b位置 */
private static void swap(int x[], int a, int b)
{
   int t = x[a];
   x[a] = x[b];
   x[b] = t;
}

public static void main(String[] args)
{
   int[] x =
   { 49, 38, 65 ,97 ,76 ,13 ,27 ,12,18,54,20,9,8,5,6 };
   System.out.println("begin..." + Arrays.toString(x));
/* 
maopao(x, 0, x.length);
   xuanze(x, 0, x.length);
   charu(x, 0, x.length);
*/
   kuaisu(x, 0, x.length);
   System.out.println("final..." + Arrays.toString(x));
}
}
```