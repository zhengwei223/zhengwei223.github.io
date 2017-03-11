---
layout: post
title: java实现链表简单示例
category: ref
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法
description: 
author: 郑未
importance: 4
order: 1
---


题目：一个数组中有三个数字a、b、c只出现一次，其他数字都出现了两次。请找出三个只出现一次的数字。

分析：我们讨论了如何在一个数组中找出两个只出现一次的数字。在这道题中，如果我们能够找出一个只出现一次的数字，剩下两个只出现一次的数字就很容易找出来了。

如果我们把数组中所有数字都异或起来，那最终的结果（记为x）就是a、b、c三个数字的异或结果（x=a^b^c）。其他出现了两次的数字在异或运算中相互抵消了。

我们可以证明异或的结果x不可能是a、b、c三个互不相同的数字中的任何一个。


> 我们用反证法证明。假设x等于a、b、c中的某一个。比如x等于a，也就是a=a^b^c。因此b^c等于0，即b等于c。这与a、b、c是三个互不相同的三个数相矛盾。

由于x与a、b、c都各不相同，因此x^a、x^b、x^c都不等于0。

我们定义一个函数f(n)，它的结果是保留数字n的二进制表示中的最后一位1，而把其他所有位都变成0。比如十进制6表示成二进制是0110，因此f(6)的结果为2（二进制为0010）。f(x^a)、f(x^b)、f(x^c)的结果均不等于0。

接着我们考虑f(x^a)^f(x^b)^f(x^c)的结果。

由于对于非0的n，f(n)的结果的二进制表示中只有一个数位是1，因此f(x^a)^f(x^b)^f(x^c)的结果肯定不为0。这是因为对于任意三个非零的数i、j、k，f(i)^f(j)的结果要么为0，要么结果的二进制结果中有两个1。不管是那种情况，f(i)^f(j)都不可能等于f(k)，因为f(k)不等于0，并且结果的二进制中只有一位是1。
于是f(x^a)^f(x^b)^f(x^c)的结果的二进制中至少有一位是1。假设最后一位是1的位是第m位。那么x^a、x^b、x^c的结果中，**有一个**或者三个**数字的第m位是1**。


> 接下来我们证明x^a、x^b、x^c的三个结果第m位不可能都是1。还是用反证法证明。如果x^a、x^b、x^c的第m位都是1，那么a、b、c三个数字的第m位和x的第m位都相反，因此a、b、c三个数字的第m位相同。如果a、b、c三个数字的第m位都是0，x=a^b^c结果的第m位是0。由于x和a两个数字的第m位都是0，x^a结果的第m位应该是0。同理可以证明x^b、x^c第m位都是0。这与我们的假设矛盾。如果a、b、c三个数字的第m位都是1，x=a^b^c结果的第m位是1。由于x和a两个数字的第m位都是1，x^a结果的第m位应该是0。同理可以证明x^b、x^c第m位都是0。这还是与我们的假设矛盾。

**因此x^a、x^b、x^c三个数字中，只有一个数字的第m位是1。**于是我们找到了能够区分a、b、c三个数字的标准。这三个数字中，只有一个数字满足这个标准，而另外两个数字不满足。一旦这个满足标准数字找出来之后，另外两个数字也就可以找出来了。

实现代码：

    package org.lanqiao.xor;
    
    /**
     * 找出数组中不重复的三个数，其余数皆为成对出现 输入 123 44 55 66 输出123
     * 
     * @author zhengwei lastmodified 2017年3月11日
     *
     */
    public class TheThreeSingleNum {
    
    	/**
    	 * 找到bit上为1的最后一位的下标
    	 * 
    	 * @param n
    	 * @return
    	 */
    	public static int getLastBitIndexOf1(int n) {
    		for (int i = 0; i < 32; i++) {
    			if ((n & (1 << i)) != 0) {
    				return i;
    			}
    		}
    		return -1;
    	}
    
    	/**
    	 * 将bit位最后一个1保留，其余变为 1 
    	 * 1001 
    	 * ^ 
    	 * 0001 
    	 * ---- 
    	 * 1000 
    	 * & 
    	 * 1001 
    	 * ------ 
    	 * 0001
    	 * 
    	 * @param n
    	 * @return
    	 */
    	public static int saveLast1(int n) {
    		int index = getLastBitIndexOf1(n);
    		return 1 << index;
    	}
    
    	public static int[] findTheThreeSingleNum(int[] arr) {
    		int x = 0;
    		int y = 0;
    		// 连续异或得到x=a^b^c
    		for (int i = 0; i < arr.length; i++) {
    			x ^= arr[i];
    		}
    		// 得到 f(x^a)^f(x^b)^f(x^c)
    		for (int i = 0; i < arr.length; i++) {
    			y ^= saveLast1(x ^ arr[i]);
    		}
    		// 得到位置M
    		int M = getLastBitIndexOf1(y);
    		int a=0,b=0,c = 0;
    		int xorOfAB = 0;
    		for (int i = 0; i < arr.length; i++) {
    			// 满足与x异或后M位为1的所有元素一起异或就能得出其中一个特殊值
    			if (((x ^ arr[i]) & (1 << M)) == 0) {
    				c ^= arr[i];
    			}else{ // 剩余的元素按找出数组中不重复的2个元素来处理，先计算出a^b
    				xorOfAB ^= arr[i];
    			}
    		}
    		// 求a^b倒数第一个为1的位
    		int N = getLastBitIndexOf1(xorOfAB);
    		// 再来一次区分
    		for (int i = 0; i < arr.length; i++) {
    			// 满足与x异或后M位为1的所有元素一起异或就能得出其中一个特殊值
    			if (((x ^ arr[i]) & (1 << M)) == 0) {
    
    			} else { // 剩余的元素按找出数组中不重复的2个元素来处理，先计算出a^b
    				if ((arr[i] & (1 << N)) == 0) {
    					a ^= arr[i];
    				} else {
    					b ^= arr[i];
    				}
    			}
    		}
    		int result[] = new int[3];
    		result[0] = a;
    		result[1] = b;
    		result[2] = c;
    		return result;
    	}
    }
    
单元测试：

    package org.lanqiao.xor;
    
    import org.junit.Test;
    import static org.assertj.core.api.Assertions.*;
    public class TheThreeSingleNumTest {
    
    	@Test
    	public void testGetLastBitIndexOf1() {
    		assertThat(TheThreeSingleNum.getLastBitIndexOf1(0b1101_1000)).isEqualTo(3);
    	}
    	
    	@Test
    	public void testSaveLast1() {
    		assertThat(TheThreeSingleNum.saveLast1(0b1101_1000)).isEqualTo(0b00001000);
    	}
    @Test
    public void testFindTheThreeSingleNum(){
    	assertThat(TheThreeSingleNum.findTheThreeSingleNum(new int[]{1,2,3,4,4,5,5,6,6})).containsOnly(1,2,3);
    	assertThat(TheThreeSingleNum.findTheThreeSingleNum(new int[]{1,2,2,4,5,5,6,6,9})).containsOnly(1,4,9);
    }
    }
    