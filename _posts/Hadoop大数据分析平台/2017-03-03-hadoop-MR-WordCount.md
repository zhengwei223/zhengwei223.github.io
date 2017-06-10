---
layout: post
title: MapReduce初级案例-WordCount及其编程分析
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: WordCount是Hadoop自带的一个MapReduce案例,因为较为简单,被我们选作案例。
author: 郑未
---

> 问题导读
> 1.map中key与value值分别是指什么？
> 2.reduce所接受的多个values是指什么？


首先MapReduce它是两个英文单词组成的，Map表示映射，Reduce表示化简，它是一种编程模型，用于大规模数据集（大于1TB）的并行运算，主要思想来自函数式编程。

# Mapper

假设我们交给Hadoop去分析的一个文本内容为：

    lixy csy lixy zmde nitamade hehe

    realy amoeba woyou weibo hehe

好了，提供的内容很简单，就是3行文本，第1行文本包含n个单词，第2行是空的，第3行也包含n个单词，单词与单词之间用空格隔开，下面我们来看看MapperClass 是如何实现的，又是如何运行的呢？看看 TokenizerMapper 的代码：

    private static final Logger LOGGER = LoggerFactory.getLogger(WordCount.class);
    public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable>{
      @Override
      protected void map(Object key, Text value, Mapper<Object, Text, Text, IntWritable>.Context context)
          throws IOException, InterruptedException {
        LOGGER.debug("map key:"+key);
        LOGGER.debug("map value:"+value);
        StringTokenizer itr = new StringTokenizer(value.toString());
        while (itr.hasMoreTokens()) {
          Text word = new Text();
          word.set(itr.nextToken());
          context.write(word, new IntWritable(1));
          LOGGER.debug("word:"+word+",one:1");
        }
      }
    }

“IntWritable one = new IntWritable(1);”的用意，因为我们不管一个单词会出现几次，只要出现，我们就计算1次，所以“context.write(word, one)”这行代码将一个单词写入的时候，值永远是1；



在运行的时候，根据你文件中内容的情况，上面的 map(Object key, Text value, Context context) 方法可能会被调用多次，将本例子提供的文件内容执行后，控制台输出内容如下（为了方便阅读，我添加了一些换行）：

     DEBUG - map key:0
     DEBUG - map value:lixy csy lixy zmde nitamade hehe
     DEBUG - word:lixy,one:1
     DEBUG - word:csy,one:1
     DEBUG - word:lixy,one:1
     DEBUG - word:zmde,one:1
     DEBUG - word:nitamade,one:1
     DEBUG - word:hehe,one:1

     DEBUG - map key:34
     DEBUG - map value:

     DEBUG - map key:36
     DEBUG - map value:realy amoeba woyou weibo hehe
     DEBUG - word:realy,one:1
     DEBUG - word:amoeba,one:1
     DEBUG - word:woyou,one:1
     DEBUG - word:weibo,one:1
     DEBUG - word:hehe,one:1

从TokenizerMapper的 map(Object key, Text value, Context context) 调用的信息输出情况可以分析出，文件内容中有3行，所以该方法一共调用了3次（因为TextInputFormat类型的，都是按行处理）。

**每一行的内容会在value参数中传进来**，也就是说每一行的内容都对应了一个key，这个key为此行的开头位置在本文件中的所在位置（所以第1行的key是0，第2行的key是34，第3行的key是36），一般为数字的。

在这个map方法中，我们可以加入一些自己的处理逻辑，比如根据空格来取得每个单词，然后我们需要将处理后的结果，写入到 context 参数中，便于hadoop处理完后续的处理逻辑。（这里我们需要注意的是“IntWritable one”变量都是数值1）

每次map的输出就是<单词,1>,这些结果都会被写到本地缓存中.

# Reducer

上面看了map的过程，接下来我们再看reduce的过程，先看看 IntSumReducer 的代码：

    public static class IntNumReducer extends Reducer<Text, IntWritable, Text, IntWritable>{
      @Override
      protected void reduce(Text word, Iterable<IntWritable> nums,
          Reducer<Text, IntWritable, Text, IntWritable>.Context context) throws IOException, InterruptedException {
        LOGGER.debug("reduce key:"+word);
        LOGGER.debug("reduce values:");
        
        int sum = 0;
        for (IntWritable num : nums) {
          LOGGER.debug(""+num.get());
          sum += num.get();
        }
        context.write(word, new IntWritable(sum));
        LOGGER.debug("reduce 输出:<"+word+","+sum+">");
      }
    }

执行调用后，控制台输出内容如下：

     DEBUG - reduce key:amoeba
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - reduce 输出:<amoeba,1>

     DEBUG - reduce key:csy
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - reduce 输出:<csy,1>

     DEBUG - reduce key:hehe
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - 1
     DEBUG - reduce 输出:<hehe,2>

     DEBUG - reduce key:lixy
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - 1
     DEBUG - reduce 输出:<lixy,2>

     DEBUG - reduce key:nitamade
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - reduce 输出:<nitamade,1>

     DEBUG - reduce key:realy
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - reduce 输出:<realy,1>

     DEBUG - reduce key:weibo
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - reduce 输出:<weibo,1>

     DEBUG - reduce key:woyou
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - reduce 输出:<woyou,1>

     DEBUG - reduce key:zmde
     DEBUG - reduce values:
     DEBUG - 1
     DEBUG - reduce 输出:<zmde,1>

通过执行 reduce(Text key, Iterable<IntWritable> values, Context context) 方法，奇迹发生了，hadoop传到这里的参数，已经去重了。什么意思呢？就是说，参数key里面是单词名称，如果一个单词出现2次，那么参数values里面就会2个值，但是key只有1次。像“lixy”这个单词在第一行出现了2次，那么这里的key只出现1次，但是后面的values会有2个IntWritable，并且值都是1，这个为1的值其实就是你在map的时候，自己定的。

最终输出:

    amoeba  1
    csy 1
    hehe  2
    lixy  2
    nitamade  1
    realy 1
    weibo 1
    woyou 1
    zmde  1

这里就有两个现象需要注意,第一:reduce的参数是<k,[v1,v2...]>在reduce被调用前有合并相同key的值的行为.第二,我们看到输出结果的单词是有序的.

# 作业发起

    public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException{
      Configuration conf = new Configuration();
      FileSystem fs = FileSystem.get(conf);
      fs.deleteOnExit(new Path(args[1]));
      fs.close();
      
      Job job = Job.getInstance(conf, "mywordcount");
      job.setJarByClass(WordCount.class);
      job.setMapperClass(TokenizerMapper.class);
  //    job.setCombinerClass(IntNumReducer.class);
      job.setReducerClass(IntNumReducer.class);
      
      job.setOutputKeyClass(Text.class);
      job.setOutputValueClass(IntWritable.class);
      FileInputFormat.addInputPath(job, new Path(args[0]));
      FileOutputFormat.setOutputPath(job, new Path(args[1]));
      System.exit(job.waitForCompletion(true)?0:1);
      
    }

# 完整代码

    package org.lanqiao.hadoop.mr.sayHi;

    import java.io.IOException;
    import java.util.StringTokenizer;

    import org.apache.hadoop.conf.Configuration;
    import org.apache.hadoop.fs.FileSystem;
    import org.apache.hadoop.fs.Path;
    import org.apache.hadoop.io.IntWritable;
    import org.apache.hadoop.io.Text;
    import org.apache.hadoop.mapreduce.Job;
    import org.apache.hadoop.mapreduce.Mapper;
    import org.apache.hadoop.mapreduce.Reducer;
    import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
    import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;

    public class WordCount {
      private static final Logger LOGGER = LoggerFactory.getLogger(WordCount.class);
      public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable>{
        @Override
        protected void map(Object key, Text value, Mapper<Object, Text, Text, IntWritable>.Context context)
            throws IOException, InterruptedException {
          LOGGER.debug("map key:"+key);
          LOGGER.debug("map value:"+value);
          StringTokenizer itr = new StringTokenizer(value.toString());
          while (itr.hasMoreTokens()) {
            Text word = new Text();
            word.set(itr.nextToken());
            context.write(word, new IntWritable(1));
            LOGGER.debug("word:"+word+",one:1");
          }
        }
      }
      public static class IntNumReducer extends Reducer<Text, IntWritable, Text, IntWritable>{
        @Override
        protected void reduce(Text word, Iterable<IntWritable> nums,
            Reducer<Text, IntWritable, Text, IntWritable>.Context context) throws IOException, InterruptedException {
          LOGGER.debug("reduce key:"+word);
          LOGGER.debug("reduce values:");
          
          int sum = 0;
          for (IntWritable num : nums) {
            LOGGER.debug(""+num.get());
            sum += num.get();
          }
          context.write(word, new IntWritable(sum));
          LOGGER.debug("reduce 输出:<"+word+","+sum+">");
        }
      }
      
      public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException{
        Configuration conf = new Configuration();
        FileSystem fs = FileSystem.get(conf);
        fs.deleteOnExit(new Path(args[1]));
        fs.close();
        
        Job job = Job.getInstance(conf, "mywordcount");
        job.setJarByClass(WordCount.class);
        job.setMapperClass(TokenizerMapper.class);
    //    job.setCombinerClass(IntNumReducer.class);
        job.setReducerClass(IntNumReducer.class);
        
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true)?0:1);
        
      }
    }

# Mapreduce详细过程

![Alt text](/public/img/hadoop/7.jpg)
