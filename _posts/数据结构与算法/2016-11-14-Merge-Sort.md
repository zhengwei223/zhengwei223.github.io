---
layout: post
title: 归并排序算法
category: 数据结构与算法
tags: 进阶 数据结构与算法 排序
keywords: 蓝桥 lanqiao 教程 数据结构 算法 归并排序
description: 归并排序算法遵循分治模式，该算法在最坏情况下运行时间比插入排序要少得多。
author: 郑未

---
# 分治

![Alt text](/public/img/algorithm/merge-1.png)

# 关键算法

![Alt text](/public/img/algorithm/merge-2.png)

伪代码及算例见《算法导论》

# java代码

    import java.util.*;
    /**
    归并排序示例，用到了分治并递归，复杂度为n*lgn，层数为lgn，每层中循环次数为cn，c为常数
    */
    public class MergeSort{
      static void sort(int[] arr){
        sort(arr,0,arr.length-1);
      }
      /*
      分成两段分别排序，然后再合并
      */
      static void sort(int[] arr,int p,int r){
        if (p <r) {
          int q = (r+p)/2;
          sort(arr,p,q);
          sort(arr,q+1,r);
          merge(arr,p,q,r);
        }
      }

      /**
      假设数组的两段分别有序，pqr为下标（起始、中间和末尾），第一段p至q含q，
      第二段q至r不含q（即q+1至末尾），将两段合并为一个整体有序的数组
      **/
      static void merge(int[] arr,int p,int q,int r){
        int n1 = q-p+1;
        int n2 = r-q;
        int[] lArr = new int[n1];// 左段
        int[] rArr = new int[n2];// 右段
        // 拷贝到新数组，但准备通过比较再拷回去
        for (int i = 0;i < n1;i++ ) {
          lArr[i] = arr[p+i];
        }
        // 拷贝
        for (int j = 0;j < n2;j++ ) {
          rArr[j] = arr[q+j+1];
        }
        // 比较并按顺序抓取到arr中
        int i=0,j=0;
        for (int k = p;k < r+1;k++ ) {
          if(i==n1&&j<n2){
            arr[k] = rArr[j];
            j++;
            continue;
          }
          if(j==n2&&i<n1){
            arr[k] = lArr[i];
            i++;
            continue;
          }
          if (lArr[i]<=rArr[j]) {
            arr[k] = lArr[i];
            i++;
          }else {
            arr[k] = rArr[j];
            j++;
          }
        }
      }
      public static void main(String[] args) {
        int[] arr = {1,2,4,6,3,5,7};
        arr = new int[]{5,2,4,7,1,3,8,6};
        merge(arr,0,3,7);
        sort(arr);
        System.out.println(Arrays.toString(arr));
      }
    }