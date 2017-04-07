---
layout: post
title: 高级设计与分析：动态规划法
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 动态规划法
description: 本文将从实例入手带领大家理解动态规划法。
author: 郑未
---



# 经典的01背包问题 #
       
  有一个包和n个物品，包的承重为v，每个物品都有各自的重量和价值，问当从这n个物品中选择多个物品放在包里而物品总重量不超过包的承重v时，能够得到的最大价值是多少？[对于每个物品不可以取多次，最多只能取一次，之所以叫做01背包，0表示不取，1表示取]

  输入：物品的重量序列w，价值序列p，包的承重v



# 递归 #

这个问题首先可以用递归来解决：

对于最后一个物品，我们有选或者不选两种决策，1）选：价值为p[n]+m(n-1,v=v-w[n])，即当前物品的价值加上扣除当前物品重量后前n-1个物品的最优解 2)不选：我们将v全部分配给前n-1个物品，求最优解，m(n-1,v).

所以递归式为：

m(n,v) = max(m(n-1,v-w[n])+p[n] , m(n-1,v))

边界为：

  n=0时，如果v能装下w[0]则返回p[0]否则返回0

  n<0或者v<0，返回0

  如果v连当前元素都装不下，直接将v分配给前n-1个物品
  

根据上面这个递归式，我们就可以写出完整的递归代码：

``` java
	/**
	 * 
	 * @param w
	 *          重量表
	 * @param p
	 *          价值表
	 * @param volumn
	 *          背包的最大承重
	 * @return 不超过最大承重的情况下所能装载物品的最大价值总和
	 */
	public static int recursion(int[] w, int[] p, int volumn) {

		return recursion(w, p, w.length - 1, volumn);
	}

	private static int recursion(int[] w, int[] p, int index, int volumn) {
		if (index < 0 || volumn <= 0) {
			return 0;
		}
		if (index == 0 && volumn >= w[0]) {
			return p[0];
		}
		if (index == 0 && volumn < w[0]) {
			return 0;
		}
		if (volumn < w[index]) {
			return recursion(w, p, index - 1, volumn);
		} else {
			return Math.max(recursion(w, p, index - 1, volumn), // 不选
			    recursion(w, p, index - 1, volumn - w[index]) + p[index]); // 选
		}
	}
}
```

但是这份代码在我的电脑上执行，100个元素执行时间为`recursion持续时间：46844毫秒`

    int[] w = Util.getRandomArr(100, 1, 50);
		int[] p = Util.getRandomArr(100, 1, 30);
		int total = 100;
		Instant now = Instant.now();
		System.out.println(recursion(w, p, total));
		System.out.println("recursion持续时间：" + (Instant.now().toEpochMilli() - now.toEpochMilli()) + "毫秒");
		

效率很低，因为我们重复计算了。

![](/public/algorithm/bag.png)

我们定义前x项分配y重量的xy为一个状态，这个状态对应着一个子问题，这个子问题在递归过程中将会被多次求解。

我们一共有2^n个子问题（可能重复），就要求解2^n次。

接下来，我们就要考虑如何进行改进，我们自然而然就可以想到如果每算出一个状态的解就保存起来，下次用到其值的时候直接取用，则可免去重复计算。

这里可以想到有x*y即n*v个状态，那么可以用n²的时间复杂度和一个辅助的二维数组来完成，比指数函数的效率要高很多。

# 记忆递归型 #

根据这个思路，我们就可以将上面的代码进行改进，使之成为**记忆递归型**的动态规划程序： 

```
	public static int recursion_m(int[] w, int[] p, int volumn) {

		int[][] state = new int[w.length][volumn + 1];
		return recursion_m(w, p, w.length - 1, volumn, state);
	}

	private static int recursion_m(int[] w, int[] p, int index, int volumn, int[][] state) {
		if (index < 0 || volumn <= 0) {
			return 0;
		}
		if (index == 0 && volumn >= w[0]) {
			return p[0];
		}
		if (index == 0 && volumn < w[0]) {
			return 0;
		}
		if (volumn < w[index]) {
			// 此状态无值
			if (state[index - 1][volumn] == 0) {
				state[index - 1][volumn] = recursion_m(w, p, index - 1, volumn, state);
			}
			return state[index - 1][volumn];
		} else {
			// 此状态无值
			if (state[index - 1][volumn] == 0) {
				state[index - 1][volumn] = recursion_m(w, p, index - 1, volumn, state);
			}
			// 此状态无值
			if (state[index - 1][volumn - w[index]] == 0) {
				state[index - 1][volumn - w[index]] = recursion_m(w, p, index - 1, volumn - w[index], state);
			}
			return Math.max(state[index - 1][volumn], // 不选
			    state[index - 1][volumn - w[index]] + p[index]); // 选
		}
	}

```

这样写一下就提升了很多性能,50个随机物品+100的承重测试效果：

    263
    recursion持续时间：239毫秒
    263
    recursion_m持续时间：1毫秒


# 递推 #

还有一种递推的写法，供参考：

      /**
  	 * 递推
  	 */
  	private static int dp(int[] w, int[] p, int volumn) {
  		int length = w.length;
  		int[][] state = new int[length][volumn + 1]; // state[i][j] = max(i,j)
  		                                         // 给定容量j，选择范围为第i个到最后一个时的最大价值
  		for (int i = 1; i <= volumn; i++) {
  			state[length - 1][i] = i >= w[length - 1] ? p[length - 1] : 0;
  		}
  		for (int i = length - 2; i > -1; i--) {
  			for (int j = 1; j <= volumn; j++) {
  				if (j < w[i]) {
  					state[i][j] = state[i + 1][j];
  				} else {
  					state[i][j] = Math.max(p[i] + state[i + 1][j - w[i]], state[i + 1][j]);
  				}
  			}
  		}
  
  		for (int i = 0; i < state.length; i++) {
  			for (int j = 1; j < state[i].length; j++) {
  				System.out.print(state[i][j] + "\t|");
  			}
  			System.out.println();
  		}
  		return state[0][volumn];
  	}

递推是递归的逆过程，不使用递归，使用迭代。

看不明白的话请参考[http://http://blog.csdn.net/mu399/article/details/7722810](http://http://blog.csdn.net/mu399/article/details/7722810 "动态规划之01背包问题（最易理解的讲解）")

# 总结：

## 递归到动规的一般转化方法 ##

递归函数有x个参数（x个状态要素），就定义一个n维的数组，**数组的下标是递归函数参数(状态的)的取值范围**，**数组元素的值是递归函数的返回值**，这样就可以从边界值开始， 逐步填充数组，这样小规模问题的解就被存储起来了，大规模问题遇到相同状态的子问题时，只需从状态的解空间中查询即可，不用继续递归。

## 动规解题的一般思路 ##

  1. 将原问题分解为子问题

  把原问题分解为若干个子问题，子问题和原问题形式相同或类似，只不过规模变小了。子问题都解决，原问题即解决。
  子问题的解一旦求出就会被保存，所以每个子问题只需求 解一次。
    
  2.确定状态

  在用动态规划解题时，我们往往将和子问题相关的各个变量的一组取值，称之为一个“状态”，这些变量可以称为状态要素，如背包问题的前x项分配容量y则x,y共同构成一个状态。一个“状态”对应于一个或多个子问题， 所谓某个“状态”下的“值”，就是这个“状态”所对应的子问题的最优解。

  所有“状态”的集合，构成问题的“状态空间”。“状态空间”的大小，与用动态规划解决问题的时间复杂度直接相关。 在背包01问题里面，一共有N个物品，v个容量，所以这个问题的状态空间里一共就有N*v个状态。

  整个问题的时间复杂度是状态数目乘以计算每个状态所需时间。

  3.确定一些初始状态（边界状态）的值

  当物品确定为第一个时，m(0,v)的值很明确，v能承载则返回p[0]，不能承载则返回0；

  4. 确定状态转移方程

  定义出什么是“状态”，以及在该“状态”下的“值”后，就要找出不同的状态之间如何迁移――即如何从一个或多个“值”已知的 “状态”，求出另一个“状态”的“值”。状态的迁移可以用递推公式表示，此递推公式也可被称作“状态转移方程”。

```
if (volumn < w[index]) {
	state[index][volumn]= state[index - 1][volumn];
} else {
	state[index][volumn]= Math.max(state[index - 1][volumn], // 不选
	    state[index - 1][volumn - w[index]] + p[index]); // 选
}    
```

## 能用动规解决的问题的特点 ##

  1) 问题具有最优子结构性质。如果问题的最优解所包含的子问题的解也是最优的，我们就称该问题具有最优子结构性质。

  2）重叠子问题：适合用动态规划方法求解的最优化问题应该具备的第二个性质是子问题空间必须足够“小”，即问题的递归算法会反复地求解相同的子问题，而不是一直生成新的子问题。一般来讲，不同子问题的总数总是输入规模的多项式为好。如果递归算法反复求解相同的子问题，我们就称最优化问题具有重叠子问题性质。与之相对的，适合用分治方法求解的问题通常在递归的每一步都生成全新的子问题。

  动态规划算法通常利用重叠子问题性质，对每个子问题求解一次，将解存入一个表中，当再次需要这个子问题时直接查表，每次查找为常量时间。

  3) 无后效性。当前的若干个状态值一旦确定，则此后过程的演变就只和这若干个状态的值有关，和之前是采取哪种手段或经过哪条路径演变到当前的这若干个状态，没有关系。

# 背包问题完整代码

```
package org.lanqiao.algo.dynamic_programming;

import java.time.Instant;

import org.lanqiao.algo.util.Util;

/**
 * 背包01问题
 * 
 * @author zhengwei
 */
public class Bag01 {
	/**
	 * 
	 * @param w
	 *          重量表
	 * @param p
	 *          价值表
	 * @param volumn
	 *          背包的最大承重
	 * @return 不超过最大承重的情况下所能装载物品的最大价值总和
	 */
	public static int recursion(int[] w, int[] p, int volumn) {

		return recursion(w, p, w.length - 1, volumn);
	}

	private static int recursion(int[] w, int[] p, int index, int volumn) {
		if (index < 0 || volumn <= 0) {
			return 0;
		}
		if (index == 0 && volumn >= w[0]) {
			return p[0];
		}
		if (index == 0 && volumn < w[0]) {
			return 0;
		}
		if (volumn < w[index]) {
			return recursion(w, p, index - 1, volumn);
		} else {
			return Math.max(recursion(w, p, index - 1, volumn), // 不选
			    recursion(w, p, index - 1, volumn - w[index]) + p[index]); // 选
		}
	}

	public static int recursion_m(int[] w, int[] p, int volumn) {

		int[][] state = new int[w.length][volumn + 1];
		return recursion_m(w, p, w.length - 1, volumn, state);
	}

	private static int recursion_m(int[] w, int[] p, int index, int volumn, int[][] state) {
		if (index < 0 || volumn <= 0) {
			return 0;
		}
		if (index == 0 && volumn >= w[0]) {
			return p[0];
		}
		if (index == 0 && volumn < w[0]) {
			return 0;
		}
		if (volumn < w[index]) {
			// 此状态无值
			if (state[index - 1][volumn] == 0) {
				state[index - 1][volumn] = recursion_m(w, p, index - 1, volumn, state);
			}
			return state[index - 1][volumn];
		} else {
			// 此状态无值
			if (state[index - 1][volumn] == 0) {
				state[index - 1][volumn] = recursion_m(w, p, index - 1, volumn, state);
			}
			// 此状态无值
			if (state[index - 1][volumn - w[index]] == 0) {
				state[index - 1][volumn - w[index]] = recursion_m(w, p, index - 1, volumn - w[index], state);
			}
			return Math.max(state[index - 1][volumn], // 不选
			    state[index - 1][volumn - w[index]] + p[index]); // 选
		}
	}

	/**
	 * 递推
	 */
	private static int dp(int[] w, int[] p, int volumn) {
		int length = w.length;
		int[][] state = new int[length][volumn + 1]; // state[i][j] = max(i,j)
		                                         // 给定容量j，选择范围为第i个到最后一个时的最大价值
		for (int i = 1; i <= volumn; i++) {
			state[length - 1][i] = i >= w[length - 1] ? p[length - 1] : 0;
		}
		for (int i = length - 2; i > -1; i--) {
			for (int j = 1; j <= volumn; j++) {
				if (j < w[i]) {
					state[i][j] = state[i + 1][j];
				} else {
					state[i][j] = Math.max(p[i] + state[i + 1][j - w[i]], state[i + 1][j]);
				}
			}
		}

		for (int i = 0; i < state.length; i++) {
			for (int j = 1; j < state[i].length; j++) {
				System.out.print(state[i][j] + "\t|");
			}
			System.out.println();
		}
		return state[0][volumn];
	}

	public static void main(String[] args) {
		int[] w = Util.getRandomArr(50, 1, 50);
		int[] p = Util.getRandomArr(50, 1, 30);
		int total = 100;
		Instant now = Instant.now();
		 System.out.println(recursion(w, p, total));
		 System.out.println("recursion持续时间：" + (Instant.now().toEpochMilli() -
		 now.toEpochMilli()) + "毫秒");

		now = Instant.now();
		System.out.println(recursion_m(w, p, total));
		System.out.println("recursion_m持续时间：" + (Instant.now().toEpochMilli() - now.toEpochMilli()) + "毫秒");

		now = Instant.now();
		System.out.println(dp(w, p, total));
		System.out.println("dp持续时间：" + (Instant.now().toEpochMilli() - now.toEpochMilli()) + "毫秒");
	}
}

```

# 用斐波那契数列第N项问题巩固动规思维 #

```
package org.lanqiao.algo.recursion;

import java.time.Duration;
import java.time.Instant;

public class Fibonacci2 {

	/**
	 * 传统做法，直接递归，会重复计算很多项,n=50时运行时间为一分钟左右
	 * 
	 * @param n
	 * @return
	 */
	public static long m1(int n) {
		if (n == 0)
			return 0;
		if (n == 1)
			return 1;
		if (n == 2)
			return 2;
		return m1(n - 1) + m1(n - 2);
	}

	/**
	 * 记忆递归型
	 * @param n
	 * @return
	 */
	public static long mm1(int n) {
		long tmp[] = new long[n + 1];
		tmp[0] = 0;
		tmp[1] = 1;
		tmp[2] = 2;
		return mm1(tmp, n);
	}

	private static long mm1(long[] tmp, int n) {
		if (tmp[n] != 0 || n == 0)
			return tmp[n];

		tmp[n] = mm1(tmp, n - 2) + mm1(tmp, n - 1);
		return tmp[n];

	}

	/**
	 * 递推型
	 * 
	 * @param n
	 * @return
	 */
	public static long m2(int n) {
		if(n==1)
			return 1;
		if(n==2)
			return 2;
		long pre = 1;
		long next = 2;
		long now =-1;
		for (int i = 3; i <= n; i++) {
			now = pre+next;
			pre = next;
			next = now;
		}
		return now;
	}

	public static void main(String[] args) {
		Instant now = Instant.now();
//		System.out.println(m1(50));
		System.out.println("m1持续时间为：" + Duration.ofMillis(Instant.now().toEpochMilli() - now.toEpochMilli()).getSeconds());

		now = Instant.now();
		System.out.println(mm1(50));
		System.out.println("mm1持续时间为：" + Duration.ofMillis(Instant.now().toEpochMilli() - now.toEpochMilli()).getSeconds());

		now = Instant.now();
		System.out.println(m2(50));
		System.out.println("m2持续时间为：" + Duration.ofMillis(Instant.now().toEpochMilli() - now.toEpochMilli()).getSeconds());

	}
}

```

斐波那契数列问题首先肯定可以使用递归，同时它符合最优子结构，这里面其实没有优不优的问题，子问题的解的合并就是母问题的解；符合重叠子问题性质，因为递归过程会对每一项反复求解，所以我们使用了一个一维数组来作为状态空间，因为第N项的解只取决于N本身，所以一维数组就可以了；也完全没有什么后效性问题。
