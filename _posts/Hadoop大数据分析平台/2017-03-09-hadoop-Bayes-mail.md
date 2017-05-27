---
layout: post
title: 利用朴素贝叶斯模型识别垃圾邮件
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 让我们看看朴素贝叶斯模型如何识别垃圾邮件这个问题
author: 郑未
---

![](/public/img/hadoop/bayes)

参考出处：

http://blog.csdn.net/gane_cheng/article/details/53219332

http://www.ganecheng.tech/blog/53219332.html （浏览效果更好）

>本文有所修改.
>在学习，工作，生活中，我们经常会遇到各种分类问题。
>让你猜测一个身高2.16的人的职业，你一般会猜测他是篮球运动员。
>收到一条含有“中奖”词语的短信，会怀疑是一条垃圾短信。
>新闻编辑，收到一封含有“马云”词语的稿子，会倾向于将这个新闻放在科技板块，而不是财经，娱乐，体育板块。
>去找一家餐馆吃饭，我们倾向于找人多的一家。
>贝叶斯将生活中的概率问题，用数学方式表示了出来。下面，让我们看看朴素贝叶斯模型如何识别垃圾邮件这个问题。

# 1. 概念简介


贝叶斯(约1701-1761) Thomas Bayes，英国数学家。约1701年出生于伦敦，做过神甫。1742年成为英国皇家学会会员。1761年4月7日逝世。贝叶斯在数学方面主要研究概率论。他首先将归纳推理法用于概率论基础理论，并创立了贝叶斯统计理论，对于统计决策函数、统计推断、统计的估算等做出了贡献。

贝叶斯定理也称贝叶斯推理，早在18世纪，英国学者贝叶斯(1702～1763)曾提出计算条件概率的公式用来解决如下一类问题：假设H[1],H[2]…,H[n]互斥且构成一个完全事件，已知它们的概率P(H[i]),i=1,2,…,n,现观察到某事件A与H[,1],H[,2]…,H[,n]相伴随机出现，且已知条件概率P(A/H[,i])，求P(H[,i]/A)。
贝叶斯公式（发表于1763年）为：

$$P(H[i]|A)=P(H[i])P(A│H[i])/(P(H[1])P(A│H[1]) +P(H[2])P(A│H[2])+…+P(H[n])P(A│H[n]))$$

对其进行重新表示:

$$P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_{i=1}^{n}P(B|A_i)P(A_i)} \tag{公式1}$$

其中 $A_i,…,A_n$为完备事件组，即$\bigcup_{i=1}^{n}A_i=\Omega  , A_i\bigcap A_j=\phi,P(A_i)>0$

推导过程：

对于两个关联事件A和B，同时发生的概率为：$P(AB)=P(A\|B)P(B)=P(B\|A)P(A)$。因此可以得到：

$$P(A|B)=\frac{P(B|A)P(A)}{P(B)}$$

其中，$P(B)=P(B\|A)P(A)+P(B\|\overline{A})P(\overline{A})$。因此可以得到:


$$P(A|B)=\frac{P(B|A)P(A)}{P(B|A)P(A)+P(B|\overline{A})P(\overline{A})}\tag{公式2}$$


公式1如果A只有两种情况，则为公式2。

朴素贝叶斯：假设给定目标值时属性之间相互条件独立。根据公式1，在给定事件B的值的情况下，$A_i,…,A_n$是相互独立的。

朴素贝叶斯模型：根据贝叶斯定理和朴素贝叶斯假设条件，从训练集中训练出来的模型。

# 2. 原理分析

现在的情况是这样的。有一个邮箱服务，里面有成千上万的人发送和接收邮件。可以使用黑名单来屏蔽垃圾邮件，但是对于一封新邮箱地址发送的邮件，却不能识别。现在需要对邮件进行分析，判断其是垃圾邮件的概率，来帮助管理员分担一部分工作。

转换成数学问题，就是。现在有一个邮件的数据集，数据集可以从这个网址下载。

http://archive.ics.uci.edu/ml/datasets/SMS+Spam+Collection

数据集中每一行代表一封邮件。以spam开头代表是垃圾邮件，以ham开头代表是正常邮件。现在使用这个数据集训练出一个朴素贝叶斯模型。

再来任意一封邮件，由模型判断出这封邮件是垃圾邮件的概率。

如果这封邮件为垃圾邮件，则识别成功，如果为正常邮件，则识别错误。

有两个标准来评价模型的价值。召回率(Recall Rate)和准确率(Precision Rate)

| - | 实际为垃圾邮件 | 实际为正常邮件
| 识别为垃圾邮件 | A | B
| 识别为正常邮件 | C | D

A，B，C，D为对应的数量。

则召回率为：

$$R=\frac{A}{A+C}\tag{召回率}$$

准确率为：

$$P=\frac{A}{A+B}\tag{准确率}$$

注意：准确率和召回率是互相影响的，理想情况下肯定是做到两者都高，但是一般情况下准确率高、召回率就低，召回率低、准确率高，当然如果两者都低，那是什么地方出问题了。

如果是做搜索，那就是保证召回的情况下提升准确率；如果做疾病监测、反垃圾，则是保准确率的条件下，提升召回。

所以，在两者都要求高的情况下，可以用F1来衡量。

$$F1=\frac{2PR}{P+R}\tag{F1}$$

# 3. 识别的过程

![](/public/img/hadoop/bayes2)

1.输入所有邮件，然后得到邮件中每个单词出现在垃圾邮件中的次数，出现在正常邮件中的次数，垃圾邮件有多少封，正常邮件有多少封。模型就训练出来了。

2.然后输入一封待处理邮件，找到里面所有出现的关键词。求出$P(A\|T_1,…T_n)$，A为一封邮件是垃圾邮件的事件，T为关键词出现在一封邮件中的事件。$T_1,...T_n$是多个关键词。A和T是关联的事件。$T_1,...T_n$每个关键词根据朴素贝叶斯的假设，是相互独立的。$P(A\|T_1,…T_n)$为$T_1,...T_n$这些关键词同时出现的情况下A是垃圾邮件的概率。

$$P(A|T_1,…T_n)=\frac{P(T_1,…T_n|A)P(A)}{P(T_1,…T_n)}=\frac{P(T_1|A)P(T_2|A)…P(T_{n-1}|A)P(T_n|A)P(A)}{P(T_1)P(T_2)…P(T_{n-1})P(T_n)}\tag{公式3}$$

几点说明:

a. $P(T_i)$是什么?$单词相对邮件的出现频率=包含该单词的邮件数/邮件总数$

b. $P(A)$是什么?$垃圾邮件的概率=\frac{训练集中垃圾邮件总数目}{训练集中邮件总数}$

c. $P(T_i\|A)$是什么?$单词相对垃圾邮件的出现频率=包含该单词的垃圾邮件数目/垃圾邮件总数$



3.一封邮件可以确定之后，我们可以从数据集中随机选取一部分邮件作为测试集，测试这些邮件的效果，得到测试的召回率和准确率，然后评价算法的效果。

# 4. JAVA实现

## 思路整理:

1. 访问训练集,文件的一行是一封邮件,每行的格式是

    ham   What you doing?how are you?
    ham   Ok lar... Joking wif u oni...
    spam   Sunshine Quiz! Win a super Sony DVD

  ham标注后面的内容是垃圾邮件,spam标注为非垃圾邮件

2. 对每封邮件进行分词,处理每行第一个单词能统计出邮件总数,垃圾邮件数,正常邮件数

3. 我们要把所有数据加载到内存中来,用什么数据结构呢?主要使用Map.

  用<word,count>映射保存单词和邮件数,定义两个这样的Map就可以了,一个保存单词-包含该单词的垃圾邮件数,一个保存单词-包含该单词的正常邮件数

## 代码

    public class MailJudger {
      static Map<String, Integer> wordAndCountInHam   = new HashMap<String, Integer>(); // 映射单词和包含它的垃圾邮件数目
      static Map<String, Integer> wordAndCountInSpam  = new HashMap<String, Integer>(); // 映射单词和包含它的正常邮件数目
      static int                  countOfHam;                                           // 垃圾邮件数目
      static int                  countOfSpam;                                          // 正常邮件数目
      static final String         filePath            = "SMSSpamCollection";
      static {
        // 加载即做好训练集统计
        loadFile();
      }

      static void loadFile() {
        BufferedReader reader = null;
        try {
          // 用BufferedReader一行一行读
          reader = new BufferedReader(new FileReader(new File(MailJudger.class.getResource("").getPath(), filePath)));
          // 每读取一行,调用parseLine
          String line;
          while ((line = reader.readLine()) != null) {
            parseLine(line);
          }
        } catch (Exception e) {
          e.printStackTrace();
        } finally {
          try {
            reader.close();
          } catch (Exception e) {
            //
          }
        }
      }
      //-----------解析行,区分是否垃圾邮件-------
      public static void parseLine(String line) {
        // 按制表符分词,得到数组
        StringTokenizer tokenizer = new StringTokenizer(line);
        if (tokenizer.hasMoreTokens()) {
          String flag = tokenizer.nextToken();
          if (flag.equals("ham")) {
            countOfHam++;
            parseLine(tokenizer, true);

          } else {
            countOfSpam++;
            parseLine(tokenizer, false);
          }
        }
      }
    
      private static void parseLine(StringTokenizer tokenizer, boolean flag) {
        Set<String> words = new HashSet<>(); // 避免对一封邮件重复计数
        while (tokenizer.hasMoreTokens()) {
          String word = tokenizer.nextToken();
          words.add(word);
        }
        if (flag) {
          for (String w : words) {
            record(wordAndCountInHam, w); // 在map中找到这个单词,数量加1
          }
        } else {
          for (String w : words) {
            record(wordAndCountInSpam, w); // 在map中找到这个单词,数量加1
          }
        }
      }
      //--------记录单词在邮件中出现词数,同一封邮件不重复计数-------
      private static void record(Map<String, Integer> wordAndCount, String word) {
        Integer count = wordAndCount.get(word);
        if (null != count)
          wordAndCount.put(word, count + 1);
        else
          wordAndCount.put(word, 1);
      }

      // ------检测新邮件为垃圾邮件的概率------
      static double getHamProbability(String line) {
        // 假设未标注,分词
        // 得到单词集合
        Set<String> words = new HashSet<>();
        StringTokenizer tokenizer = new StringTokenizer(line);
        if(line.startsWith("ham")||line.startsWith("spam"))
          tokenizer.nextToken();
        while (tokenizer.hasMoreTokens()) {
          String word = tokenizer.nextToken();
          words.add(word);
        }

        double pUp = 1.0 * countOfHam / (countOfHam + countOfSpam); // 垃圾概率PA=垃圾数/总数
        double pDown = 1.0;
        for (String word : words) {
          Integer c1 = wordAndCountInHam.get(word);
          pUp *= 1.0 * (c1==null?0:c1) / countOfHam; // 包含该单词的垃圾邮件数/垃圾邮件总数
          Integer c2 = wordAndCountInSpam.get(word);
          pDown = pDown* ((c1 == null ? 0 : c1) + (c2 == null ? 0 : c2)) / (countOfHam + countOfSpam); // 包含该单词的邮件总数/邮件总数
        }
        // 公式3
        return pUp / (pDown);

      }
      //--------------将训练数据集作为测试集,检测准确率和召回率---------
      static void testAll(){
        BufferedReader reader = null;
        int rightCount = 0;
        int wrongCount = 0;
        int allPossible = 0;
        try {
          // 用BufferedReader一行一行读
          reader = new BufferedReader(new FileReader(new File(MailJudger.class.getResource("").getPath(), filePath)));
          String line;
          while ((line = reader.readLine()) != null) {
            double p = getHamProbability(line);
            //0.95为阈值,超出此概率,系统认为是垃圾邮件
            if(p>0.95&&line.startsWith("ham")){ // 判断为垃圾,实际为垃圾
              rightCount++;  // 正确数+1
              allPossible++;  // 疑似数+1
            }
            if(p>0.95&&line.startsWith("spam")){  // 判断为垃圾,实际正常
              wrongCount++;  // 错误数+1
              allPossible++; // 疑似数+1
            }
          }
        } catch (Exception e) {
          e.printStackTrace();
        } finally {
          try {
            reader.close();
          } catch (Exception e) {
            //
          }
        }
        System.out.println("解析"+(countOfHam+countOfSpam)+"封邮件,疑似垃圾邮件"+allPossible+"封,疑似中确为垃圾邮件"+rightCount+"封,准确率为"+(rightCount*100/allPossible)+"%");
        System.out.println("实际总垃圾邮件数目为"+countOfHam+",正确识别出"+rightCount+"封,召回率为"+(rightCount*100/countOfHam)+"%");
      }
      public static void main(String[] args) {
    //    String mail = "As per your request 'Melle Melle (Oru Minnaminunginte Nurungu Vettam)' has been set as your callertune for all Callers. Press *9 to copy your friends Callertune";
    //    System.out.println(getHamProbability(mail));
        testAll();
      }
    }

运行结果:

    解析5574封邮件,疑似垃圾邮件3667封,疑似中确为垃圾邮件3667封,准确率为100%
    实际总垃圾邮件数目为4827,正确识别出3667封,召回率为75%

这说明系统判定为垃圾邮件的准度为100%,但是我们会漏掉25%真正为垃圾邮件的,该怎么提高呢?