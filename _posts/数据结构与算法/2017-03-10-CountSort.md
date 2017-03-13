---
layout: post
title: 计数排序、基数排序、桶排序
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法 计数排序
description: 本文介绍时间复杂度为O(n)的非比较算法。
author: 郑未
---

# 任何基于比较的排序算法以nlg(n)为下届

简单来说，我们最多只能将长度n的数组分解为lgn层，每一层大致需要n次比较，因此最好也只能做到nlg(n)。

快排和堆排序是比较排序算法中较优的，即便怎么优化，改变的是常数因子，最终还是O(nlgn)。

详细证明参考其他资料，我认为记住这个结论即可。



# 以空间换时间的计数排序

## 算法基本思想：

假设元素均大于等于0

  1. 依次扫描原数组，将元素值k记录在中间数组的k位上：

![](/public/img/algorithm/countsort1.png)

  2. 将中间数组变换后，输出到结果数组：依次扫描中间数组，如果为1，将其插入输出数组的空白处

![](/public/img/algorithm/countsort2.png)

伪代码：

    CountSort(A)
      max = maxOf(A)                  //  线性
      let B[max+1] be a new array of 0
      let C[A.length] be a new array
      for i = 0 to A.length           //  线性
        B[A[i]] = 1
      
      j = 0
      for i = 0 to max                //  线性
        if B[i] == 1       
          C[j++] = i
      C is the output aray

## 问题

1. 如果有重复元素，上述算法出现bug：无论出现多少次该位置都计数为1，这样在恢复成有序数组时，就会少元素

改进：
  
  中间数组记录个数（每出现一次某数字，就在对应下标的元素上加1）而不是记录是否存在（1）；

  但这在恢复时出现一些问题，我们是否要在内部执行循环以保证若干个值相同的元素恢复到指定位置？

![](/public/img/algorithm/countsort3.png)

  b0==2，说明0这个数字在结果数组中应该出现两次，同理b3==3，说明3这个数字应该在结果数组中出现3次，我们在恢复0这个数字时，是否要循环2次插入0 ？如果这样做，时间复杂度不稳定。

  其实不难发现，B数组的元素和恰好为A数组的长度，b0+b2+b3+b5恰好等于8，这是因为B元素值就是A元素出现的次数。现在我们可以将B数组做些转化，（注意这个有点突兀，我也不知道怎么来的），以使得在恢复时我们明确知道A的元素即B中值大于0的那些元素的下标，应该出现在结果元素的哪个位上。看到结果，你就知道了！

  这个转换将B数组的元素替换为“自己+上一个元素”和，这样B[i]就记录下了小于i的元素的个数-1：

![](/public/img/algorithm/countsort4.png)

  我们从后往前看，b5=8,这说明小于5的元素有7个，5这个数字应该出现在第8位（下标7），b4=7，说明4在第7位？不是的，其实4这个数字并不会出现，因为3才该在第七位，我们只需扫描A数组，只有出现的元素才会到B'里面找位置：

![](/public/img/algorithm/countsort5.png) 

    CountSort(A)
      max = maxOf(A)                  //  线性
      let B[max+1] be a new array of 0
      let C[A.length] be a new array
      for i = 0 to A.length           //  线性
        B[A[i]] += 1
      for i = 1 to B.length           //  转化
        B[i] = B[i]+B[i-1]
      
      j = 0
      for i = A.length-1 downto 0    //  线性
        C[B[A[i]]-1] = A[i]
        B[A[i]] --                   //  自减
      
      C is the output aray

元素变下标，下标变元素，就是这么奇妙！

2. 问题2：这样真的高效吗？空间换时间值得吗？

空间的耗费取决于A数组中最大的那个整数，假设极端情况A就一个值为10000的元素，那我们岂不是要开辟一个长度位10000的中间数组，且只有B[10000]记录为1，这是多大的浪费啊？

所以，这种算法只供观赏，只有在A的元素紧密排列的情况下，才比较可用，因为这样才不会造成太大的空间浪费。

# 经典的基数排序 #

## 算法思想

基数排序过程无须比较关键字，而是通过“分配”和“收集”过程来实现排序，它的时间复杂度可达到线性阶：O(n)。对于十进制数来说，每一位的数在[0,9]之中，d位的数，则有d列。基数排序首先按低位有效数字进行排，然后逐次向上一位进行排序，直到最高位排序结束。

约定:待排数字中没有0，没有负数（有负数，做一次转换全部变为正数即可）

算法过程：

(1)假设有欲排数据序列如下所示：

73  22  93  43  55  14  28  65  39  81

首先根据个位数的数值，在遍历数据时将它们各自分配到编号0至9的桶（个位数值与桶号一一对应）中。

分配结果（逻辑想象）如下图所示：

![](/public/img/algorithm/radixSort-1.png)

分配结束后。接下来将所有桶中所盛数据按照桶号由小到大（桶中由顶至底）依次重新收集串起来，得到如下仍然无序的数据序列：

81  22  73  93  43  14  55  65  28  39

(2)接着，再进行一次分配，这次根据十位数值来分配（原理同上），分配结果（逻辑想象）如下图所示：

![](/public/img/algorithm/radixSort-2.png)

分配结束后。接下来再将所有桶中所盛的数据（原理同上）依次重新收集串接起来，得到如下的数据序列：

14  22  28  39  43  55  65  73  81  93

(3)以此类推……

如果排序的数据序列有三位数以上的数据，则重复进行以上的动作直至最高位数为止。

## 代码实现 ##

    package org.lanqiao.sort;
    
    import java.util.ArrayList;
    
    /**
     * 基数排序
     * 
     * @author zhengwei lastmodified 2017年3月14日
     *
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public class RadixSort {
    	// 10个桶，每个桶装的数个数不定，适合用数组加
    	// 10个桶，每个桶装的数个数不定，适合用数组加ArrayList
    	private static ArrayList[] bucket = new ArrayList[10];
    	// 初始化桶
    	static {
    		for (int i = 0; i < bucket.length; i++) {
    			bucket[i] = new ArrayList();
    		}
    	}
    
    	/**
    	 * 
    	 * @param arr
    	 * @param d
    	 *          位数
    	 */
    	public static void sort(int[] arr, int d) {
    		for (int i = 0; i < arr.length; i++) {
    			switch (getDigitOn(arr[i], d)) {
    			case 0:
    				bucket[0].add(arr[i]);
    				break;
    			case 1:
    				bucket[1].add(arr[i]);
    				break;
    			case 2:
    				bucket[2].add(arr[i]);
    				break;
    			case 3:
    				bucket[3].add(arr[i]);
    				break;
    			case 4:
    				bucket[4].add(arr[i]);
    				break;
    			case 5:
    				bucket[5].add(arr[i]);
    				break;
    			case 6:
    				bucket[6].add(arr[i]);
    				break;
    			case 7:
    				bucket[7].add(arr[i]);
    				break;
    			case 8:
    				bucket[8].add(arr[i]);
    				break;
    			default:
    				bucket[9].add(arr[i]);
    				break;
    			}
    		}
    
    		if (bucket[0].size() == arr.length) { // 全部入桶0，说明不用再排了
    			clearAll();
    			throw new RuntimeException("结束");
    		}
    
    		int k = 0;
    		for (int j = 0; j < bucket.length; j++) {// 每个桶
    			for (Object m : bucket[j]) { // 每个桶中的元素依次压入原数组
    				arr[k++] = (Integer) m;
    			}
    		}
    		// 记得清空
    		clearAll();
    	}
    
    	private static void clearAll() {
    		for (ArrayList b : bucket) {
    			b.clear();
    		}
    	}
    
    	/**
    	 * 获取数字src在d位上的数值
    	 * 
    	 * @param src
    	 * @param d
    	 * @return
    	 */
    	public static int getDigitOn(int src, int d) {
    		return src / (int) (Math.pow(10, d - 1)) % 10;
    	}
    
    	public static void sort(int[] arr) {
    		int d = 1;
    		while (true) {
    			try {
    				sort(arr, d++);
    			} catch (Exception e) {
    				System.out.println(e.getMessage());
    				break;
    			}
    		}
    	}
    }

测试用例：

    package org.lanqiao.sort;
    
    import static org.assertj.core.api.Assertions.*;
    
    import org.junit.Test;
    
    public class RadixSortTest {
    
    	@Test
    	public void testSortIntArray() {
    		int[] arr = new int[] { 73, 22, 93, 43, 55, 14, 28, 65, 39, 81 };
    		RadixSort.sort(arr);
    		assertThat(arr).containsExactly(14, 22, 28, 39, 43, 55, 65, 73, 81, 93);
    		
    		arr = new int[]{456,222,2,32,211,1234};
    		RadixSort.sort(arr);
    		assertThat(arr).containsExactly(2,32,211,222,456,1234);
    	}
    	@Test
    	public void testGetDigitOn(){
    		assertThat(RadixSort.getDigitOn(1234, 1)).isEqualTo(4);
    		assertThat(RadixSort.getDigitOn(1234, 2)).isEqualTo(3);
    		assertThat(RadixSort.getDigitOn(1234, 3)).isEqualTo(2);
    		assertThat(RadixSort.getDigitOn(1234, 4)).isEqualTo(1);
    		assertThat(RadixSort.getDigitOn(1234, 5)).isEqualTo(0);
    	}
    
    }




