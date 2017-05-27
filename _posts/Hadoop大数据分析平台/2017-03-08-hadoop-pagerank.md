---
layout: post
title: 谷歌PageRank算法简介及Java实现
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: PageRank对网页排名的算法，曾是Google发家致富的法宝。以前虽然有实验过，但理解还是不透彻，这几天又看了一下，这里总结一下PageRank算法的基本原理。
author: 郑未
---

参考原文： [fengfenggirl 的博客](http://www.cnblogs.com/fengfenggirl/p/pagerank-introduction.html)   

PageRank对网页排名的算法，曾是Google发家致富的法宝。以前虽然有实验过，但理解还是不透彻，这几天又看了一下，这里总结一下PageRank算法的基本原理。

#一、什么是pagerank

  PageRank的Page可是认为是网页，表示网页排名，也可以认为是Larry Page(google 产品经理)，因为他是这个算法的发明者之一，还是google CEO（^_^）。PageRank算法计算每一个网页的PageRank值，然后根据这个值的大小对网页的重要性进行排序。它的思想是模拟一个悠闲的上网者，上网者首先随机选择一个网页打开，然后在这个网页上呆了几分钟后，跳转到该网页所指向的链接，这样无所事事、漫无目的地在网页上跳来跳去，PageRank就是估计这个悠闲的上网者到达各个网页上的概率。

  >PageRank让链接来"投票"。通常，能够从更多地方到达的网页更为重要，因此具有更高的PageRank。每个到其他网页的链接，都增加了该网页的PageRank。具有较高PageRank的网页一般都是通过更多其他网页的链接而提高的。

# 二、最简单pagerank模型

## 说明

  互联网中的网页可以看出是一个有向图，其中网页是结点，如果网页A有链接到网页B，则存在一条有向边A->B，下面是一个简单的示例：

![](/public/img/hadoop/201959072629566.jpg) 

  这个例子中只有四个网页，如果当前在A网页，那么悠闲的上网者将会各以1/3的概率跳转到B、C、D，这里的3表示A有3条出链，如果一个网页有k条出链，那么跳转任意一个出链上的概率是1/k，同理D到B、C的概率各为1/2，而B到C的概率为0。一般用转移矩阵表示上网者的跳转概率，如果用n表示网页的数目，则转移矩阵M是一个n*n的方阵；如果网页i有k个出链，那么对每一个出链指向的网页j，有M[j][i]=1/k，而其他网页的M[j][i]=0；上面示例图对应的转移矩阵如下：


![](/public/img/hadoop/202015378717604.jpg) 

**我们可以这么想,M的第一列是A链接到别的网页的概率分布，而M的第一行可以看作是所有网页对为A贡献的分值，每个网页有1分，那么B网页把它的0.5分给了A，另外0.5分给了D，C有1分全部给了A……**

初试时，假设上网者出现在每一个网页（A、B、C、D）的概率都是相等的，即1/n，于是初试的概率分布就是一个所有值都为1/n的n维列向量V0，用V0去右乘转移矩阵M，就得到了每个网页的分值向量M*V0,依然是一个nX1的矩阵。下面是V1的计算过程：

![](/public/img/hadoop/202114099185287.jpg)

M的第一行乘以V0，表示累加*从所有网页到网页A的概率×该网页给A的分值*，也就是说从C过来C给了A一份，但从C过来的可能性是四分之一。得到了V1后，再用V1去右乘M得到V2，一直下去，最终V会收敛（前后的V差别不大），即`Vn=M × V(n-1)`，上面的图示例，不断的迭代，最终V=[3/9,2/9,2/9,2/9]'：

![](/public/img/hadoop/261719185728644.jpg)

看来，A的分值比较高。

## 代码

## 运行一次，评分

    /**
     * 网页个数
     */
    private static final int N = 4;

    public static void main(String[] args) {
      //原始矩阵
      double[][] sMatrix=new double[][]{
          { 0, 0.5, 1, 0 },
          { 1.0/3, 0, 0, 0.5},
          { 1.0/3, 0, 0, 0.5},
          { 1.0/3, 0.5, 0, 0}
      };

      // 初始特征向量
      double[] v0 = getV0();

      double[] v = getV(sMatrix,v0);
      printMatrix(v);
    }
    
    /**
     * 原始矩阵乘以特征向量，得到n*1矩阵
     * @param sMatrix
     * @param v
     * @return
     */
    private static double[] getV(double[][] sMatrix, double[] v) {
      double[] v2 = new double[N];
      for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
          v2[i] += sMatrix[i][j]*v[j];
        }
      }
      return v2;
    }

    /**
     * 初始概率向量,每个元素的值为1.0/N
     * @return
     */
    private static double[] getV0() {
      double[] v0 = new double[N];
      for (int i = 0; i < N; i++) {
        v0[i] = 1.0/N;
      }
      return v0;
    }

    private static void printMatrix(double[] q) {
      for (double d : q) {
        System.out.println(d);
      }
    }

输出结果为

    0.375
    0.20833333333333331
    0.20833333333333331
    0.20833333333333331

和推衍一致


## 让分值向量收敛到某个范围

为了让分值向量收敛，我们需要递归getV方法：

    /**
     * 收敛值
     */
    private static final double convergenceValue=0.0001;
    ……
    
    /**
     * 原始矩阵乘以特征向量，得到n*1矩阵
     * @param sMatrix
     * @param v
     * @return
     */
    private static double[] getV(double[][] sMatrix, double[] v) {
      double[] v2 = new double[N];
      for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
          v2[i] += sMatrix[i][j]*v[j];
        }
      }
      if(distanseOf(v, v2)<convergenceValue)
        return v2;
      //递归
      return getV(sMatrix, v2);
    }


    /**
     * 求两个向量的距离  d=根号((x1-x2)^2+(y1-y2)^2+(z1-z2)^2)
     * @param q1
     * @param q2
     * @return
     */
    private static double distanseOf(double[] q1, double[] q2) {
      double d1 = 0;
      for (int i = 0; i < N; i++) {
        d1 += StrictMath.pow(q1[i]-q2[i], 2);
      }
      return Math.sqrt(d1);
    }

运算结果

    0.33331298828125
    0.22222900390625
    0.22222900390625
    0.22222900390625

# 三、终止点问题

　　上述上网者的行为是一个马尔科夫过程的实例，要满足收敛性，需要具备一个条件：
- 图是强连通的，即从任意网页可以到达其他任意网页：

　　互联网上的网页不满足强连通的特性，因为有一些网页不指向任何网页，如果按照上面的计算，上网者到达这样的网页后便走投无路、四顾茫然，导致前面累计得到的转移概率被清零，这样下去，最终的得到的概率分布向量所有元素几乎都为0。假设我们把上面图中C到A的链接丢掉，C变成了一个终止点，得到下面这个图：

![](/public/img/hadoop/202114482318158.jpg)

对应的转移矩阵为：

![](/public/img/hadoop/202116138097136.jpg)

连续迭代下去，最终所有元素都为0：　　

![](/public/img/hadoop/202119194819359.jpg)

# 四、陷阱问题

　　另外一个问题就是陷阱问题，即有些网页不存在指向其他网页的链接，但存在指向自己的链接。比如下面这个图：

![](/public/img/hadoop/202128577315418.jpg)

上网者跑到C网页后，就像跳进了陷阱，陷入了漩涡，再也不能从C中出来，将最终导致概率分布值全部转移到C上来，这使得其他网页的概率分布值为0，从而整个网页排名就失去了意义。如果按照上面图对应的转移矩阵为：　

![](/public/img/hadoop/202133299812792.jpg)

不断的迭代下去，就变成了这样：

![](/public/img/hadoop/202136578712805.jpg)

# 五、解决终止点问题和陷阱问题

## 说明

　　上面过程，我们忽略了一个问题，那就是上网者是一个悠闲的上网者，而不是一个愚蠢的上网者，我们的上网者是聪明而悠闲，他悠闲，漫无目的，总是随机的选择网页，他聪明，在走到一个终结网页或者一个陷阱网页（比如两个示例中的C），不会傻傻的干着急，他会**在浏览器的地址随机输入一个地址**，当然这个地址可能又是原来的网页，但这里给了他一个逃离的机会，让他离开这万丈深渊。模拟聪明而又悠闲的上网者，对算法进行改进，每一步，上网者可能都不想看当前网页了，不看当前网页也就不会点击上面的连接，而上悄悄地在地址栏输入另外一个地址，而在地址栏输入而跳转到各个网页的概率是1/n。假设上网者每一步**用链接查看**当前网页的概率为a，那么他**从浏览器地址栏跳转的概率**为(1-a)，于是原来的迭代公式转化为：

![](/public/img/hadoop/202158112317322.jpg)

其中`e=1/n`。

现在我们来计算带陷阱的网页图的概率分布：

![](/public/img/hadoop/202205000122441.jpg)


![](/public/img/hadoop/1.png)

重复迭代下去，得到：

![](/public/img/hadoop/202208390746633.jpg)

可以看到C不要脸地把自己的1分全部给了自己（这是目前算法的bug，无法过滤自链接），它的总分大了很多。


## 代码

    /**
     * 通过链接访问（非URL直输）网页的概率
     */
    private static final double alpha = 0.8;

    public static void main(String[] args) {
      //原始矩阵
      double[][] sMatrix=new double[][]{
          { 0, 0.5, 0, 0 },
          { 1.0/3, 0, 0, 0.5},
          { 1.0/3, 0, 1, 0.5},
          { 1.0/3, 0.5, 0, 0}
      };

      // 初始特征向量
      double[] v0 = getV0();

      double[] v = getV(sMatrix,v0);
      printMatrix(v);
    }

    /**
     * 原始矩阵乘以特征向量，得到n*1矩阵
     * @param sMatrix
     * @param v
     * @return
     */
    private static double[] getV(double[][] sMatrix, double[] v) {
      double[] v2 = new double[N];
      for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
          v2[i] += sMatrix[i][j]*v[j];
        }
        // 新增
        v2[i] = alpha*v2[i] + (1-alpha)*(1.0/N);
      }
      if(distanseOf(v, v2)<convergenceValue)
        return v2;
      return getV(sMatrix, v2);
    }

# 一些问题

本文所举模型没有考虑网站的权重，这会导致旧的页面等级会比新页面高。因为即使是非常好的新页面也不会有很多上游链接，除非它是某个站点的子站点。解决办法是区分权重，比如给政府网站更高的权重，那么即便是新页面，只要得到政府网站的“链接”投票，它的分值也会较高。

本文所举模型没有过滤自链接。解决办法当然是忽略自链接。

Google经常处罚恶意提高PageRank的行为，至于其如何区分正常的链接交换和不正常的链接堆积仍然是商业机密。