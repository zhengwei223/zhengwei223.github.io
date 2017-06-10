---
layout: post
title: MapReduce初级案例-通过WordCount了解MapReduce
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: MapReduce作为Hadoop的编程框架,是工程师最常接触的部分,也是除去了网络环境和集群配 置之外对整个Job执行效率影响很大的部分,所以很有必要深入了解整个过程。本文写作的目的在于使得读者对整个MapReduce过程有比较细致的了解,当自己需要定制MapReduce行为时,知道该重写 哪些类和方法。
author: 郑未
---

MapReduce作为Hadoop的编程框架,是工程师最常接触的部分,也是除去了网络环境和集群配 置之外对整个Job执行效率影响很大的部分,所以很有必要深入了解整个过程。本文写作的目的在于使得读者对整个MapReduce过程有比较细致的了解,当自己需要定制MapReduce行为时,知道该重写 哪些类和方法。

# 总体概览

![Alt text](/public/img/hadoop/8.jpeg)

比较High Level的来看,整个MapReduce过程分为三步:· Map:读取输入,做初步的处理,输出形式的中间结果· Shuffle:按照key对中间结果进行排序聚合,输出给reduce线程·Reduce:对**相同key的输入**进行最终的处理,并将结果写入到文件中。

用经典的WordCount例子来简单说明一下上面的过程。假设我们现在要做的是统计一个文本中单词的个数,我们将文件切分成几个部分,然后创建多个Map线程,处理这些输入,输出的中间结果是`[<k,v>]`的形式,shuffle过程将同样Key的元组,也就是word相同的元组`<k,[v1,v2,...]`,分配到同样的reduce线程中,reduce线程汇总同一个word的元组个数,最终输出。

我这么一说,你是不是感觉已经理解MapReduce了?差不多吧,但是理解与深入理解是1与10000 的差距,下面让我提几个细节方面的问题:

1. 原始数据是怎么切分的,又是以什么形式传递给Map线程的?

2. 有多少个map线程,怎样控制他们?map方法会被调用多少次？

3. 输出写到磁盘的过程是怎样的?

4. 如果要保证同一个中间结果key交给同一个reducer,要不要排序?什么时候排序?

5. 满足什么条件的中间结果会调用一次reduce方法,满足什么条件的中间结果会交给一个reduce线程?

6. 有多少reduce线程,怎样控制他们? 

7. 有多少输出文件? ...

是不是有很多问题都看不懂啦?没关系,下面我就详细讲解这个过程。 

# Yarn的资源分配与任务调度

之所以要讲解这一部分,是因为MapReduce过程牵扯到了框架本身的东西,我们得知道计算线程 是怎么来的,怎么没的。

hadoop由1.0进化成2.0,变更还是很大的,1.0里整个job的资源分配,任务调度和监控管理都是 由一个JobTracker来做的,扩展性很差,2.0对整个过程重新设计了一下,我们重点来看2.0的内容。

一个Job要在集群中运行起来,需要几个条件,首先,运算资源,可能包括内存,cpu等,其次,得 有一个任务的调度算法,安排运行的先后顺序,最后,得知道工作进行的顺不顺利,并把情况及时的反馈给上级,以便及时的做出响应。下面分别说明。

下面我们首先看看1.0时代hadoop集群是怎么管理资源和调度任务的。

## hadoop1.0的资源管理

![Alt text](/public/img/hadoop/9.jpeg)

对于一个集群来说,资源有很多维度,比如内存,CPU等,1.0时代将节点上的资源切成等份,使用 slot的概念来抽象,根据对资源占用情况的不同,又可细分为Map slot和reduceslot。slot代表一种运 行的能力,像许可证一样,MapTask只有获得了Map slot后才可以执行,ReduceTask同理。对于一个 节点,有多少slot是事先配置好的。

JobTracker和TaskTracker共同管理这些slot,其中JobTracker运行在NameNode上,负责资源 的分配和任务的调度,TaskTracker运行在Data Node上,负责所在节点上资源的监控和task的管理。 具体一点,当用户的任务提交给jobtracker之后,jobtracker根据任务的情况决定要启动多少MapTask 和ReduceTask,然后根据TaskTracker反馈的slot使用情况(以及其他的因素,比如根据数据的存储情 况),决定给哪几个TaskTracker分配多少个MapTask和多少个ReduceTask。接收到任务后,TaskTracker 负责启动JVM来运行这些Task,并把运行情况实时反馈给JobTracker。

注意,TaskTracker只有监控权,没有调度权,也就是它只能把运行情况反馈给JobTracker,在他这里有多少个Task,当task失败时,重启task之类的管理权限,都在JobTracker那里。JobTracker的 任务管理是**Task级别**的,也即JobTracker负责了集群资源的管理,job的调度,以及一个Job的每个Task 的调度与运行。

打个比方,JobTracker是一个极度专权的君王,TaskTracer是大臣,君王握有所有的权利,大臣们 被架空,君王说事情怎么做,底下的就得怎么做,大臣只管执行,并把进行情况告诉君王,如果事情搞砸了,大臣也不得擅作主张的重新做一遍,得上去请示君王,君王要么再给他一次机会,要么直接拖出 去砍了,换个人完成。

极度专权早晚累死,而且一个人的力量终归是有限的,这也是1.0时代很大的问题。所以新时代采取了全新的设计。 

## Yarn的资源控制与任务调度

![Alt text](/public/img/hadoop/10.gif)

Yarn用Container的概念来抽象资源,Container描述了自己的位置,自己拥有的CPU,内存等资 源的数量。Container跟任务完全独立了,是一个完全硬件的抽象。比1.0里使用计算时槽更加细粒度, 也更易于理解。

资源控制由ResourceManage(RM)和Node Manager(NM)两个角色参与,其中Node Manager 管理所在node上的container,并把资源的使用情况汇报给ResourceManager,Resource Manager 通过Node Manager返回的信息,掌握着整个集群的资源情况。为了便于管理,Hadoop集群的管理 员可以建立多个队列,每个队列配置一定量的资源,用户可以向一个或多个队列提交Job。作为集群的 用户,可以到50030端口查看集群的队列的分配和负载情况。 

当一个用户提交了一个job给ResourceManager, Resource Manager 并不是直接衡量它所需的资源并调度,而是下放给一个Application Master(AM)的角色,这个AM全权负责用户提交的这个Job,它会根据Job的情况向RM申请资源,RM告诉AM它可以使用的Container的信息,AM再将自己Job的task放到这些Container中运行并监控。如果有失败的task,AM可以根据情况选择重启task。

有几个关键的点我列出来,以确保理解正确:

1. 集群的资源监控由RM与NM合作完成,任务调度与监控由RM与AM完成,结构更加清晰。

2. RM对任务的管理是Job级别的,即它只负责为整个Job分配资源,并交给AM去管理。RM得到了大大的解放。

3. 与TaskTracker相比,AM拥有更多的权利,它可以申请资源并全权负责task级别的运行情况。

4. 与TaskTracker相比,AM可以使用其他机器上的计算资源(即Container)。这些资源也不再有Map和Reduce的区别。

继续上面的例子。我用壮丁来比喻Container,壮丁有很多属性,比如家乡(location),力气( 内存),财产(CPU),君王(RM)通过锦衣卫(NM)来掌握各个地方(Node)壮丁的使用情况。 当有百姓提出一个要求(提交一个Job),比如兴修水利,君王不再事无巨细的过问这件事情,而是叫 一个合适的大臣(AM)过来,比如此例中的水利大臣,问他需要多少人,多少钱,然后衡量一下国力, 播一些壮丁给他用。水利大臣可以使用全国范围内的壮丁,对他们有绝对的领导权,让他们干嘛就得干 嘛。事情要么圆满完成,水利大臣给君王报喜,要么发现难度太大啊,尝试了好多办法都失败了(job尝 试次数到达一定数量),只好回去请罪。

君王遵循政务公开的原则,所有job的运行情况都可以通过50030端口查看.

好了,讲了这么一大通,我想关于Job怎么跑起来,task怎么来怎么没,应该有个概念了。用户将自 己的代码上传到集群的一个client Node上,运行代码,代码里会对自己的job进行配置,比如输入在 哪,有哪些依赖的jar包,输出写到哪,以什么格式写,然后提交给ResourceManager,ResourceManager 会在一个Node上启动ApplicationMaster负责用户的这个Job,AM申请资源,得到RM的批准和分配 后,在得到的Container里启动MapTask和ReduceTask,这两种task会调用我们编写的Mapper和Reducer等代码,完成任务。任务的运行情况可以通过web端口查看。

MapReduce计算框架最重要的两个类是Mapper和Reducer,用户可以继承这两个类完成自己的 业务逻辑,下面以这两个类的输入输出为主线详细讲解整个过程。例子总是最容易被人理解的,所以讲解过程有看不懂的,可以回来查看这个简单的job。用户想使用MapReduce的过程统计一组文件中每 个单词出现的次数,与经典的WordCount不同的是,要求大写字母开头的单词写到一个文件里面,小写的写到另一个文件中。

# Mapper的输入

![Alt text](/public/img/hadoop/11.jpeg)

---

一个Job的各种配置会被封装成JobContext,其中非常重要的是InputFormat即输入格式，它决定了一个文件怎么被切片，以及每个切片怎么换算成记录，总结来说，它先把文件分成大块，然后把大块分成记录。

InputSplit类封装了切片信息，RecordReader类封装了记录信息

一个split和一个reader组合成一个Context对象，而Mapper的输入来自于Context对象

---

经过这些切割，封装，Mapper登场处理Context对象

需要知道有多少个InputSplit，就对应了多少个处理他们的Map Task（负责调用Mapper的map方法）。从接口上来看,InputSplit中并没有存放文件的内容,而是指定了文件的文件的位置以及长度。

既然InputSplit与MapTask之间是一一对应的,那么我们就可以通过控制InputSplit的个数来调整 MapTask的并行性。当文件量一定时,InputSplit越小,并行性越强。inputsplit的大小并不是任意的, 虽然最大值和最小值都可以通过配置文件来指定,但是最大值是不能超过一个block大小的。

Block是什么?用户通过HDFS的接口,看到的是一个完整文件层面,在HDFS底层,文件会被切成固 定大小的Block,并冗余以达到可靠存储的目的。一般默认大小是64MB,可以调节配置指定。

InputSplit是从字节的角度来描述输入的,Mapper用到的 Key,Value是从哪来的?有请RecordReader。

---

recordReader从InputSplit描述的输入里 取出一个KeyValue,作为mapper.map()方法的输入,跑一遍Map方法。打个比方,InputSplit像一 桌大餐,吃还是得一口一口吃,怎样算一口,就看RecordReader怎么实现了。

好了,如果我想自己实现InputSplit和RecordReader,应该写在哪呢?应该回到InputFormat。
因为InputSplit是在InputFormat的getSplit函数里面算出来的,RecordReader也是在这里Create出来的

---

如果你想以自己的方式读取输入,就可以自己写一个InputFormat的实现类,重写里面的方法。

当然,如果你说我很懒,不想自己写怎么办?好办,之所以要用框架,很重要的一点就是人家提供 了默认实现啦。WordCount里面一般用的是TextInputFormat。


它实现了自己的getRecordReader方法,里面从配置中取了Delimiter, 这个东西的默认值是"\n"!然后返回了以Delimiter划分的一个LineRecordReader,知道为什么你制定了InputFormat之后,Mapper里面读到的就是一行一行的输入了吧。

# Mapper的输出

自定义WordCount代码中，我们将Key和Value直接写入到context当中，我们已经知道了context是从MapContextImpl来的,那这个Write方法是怎么回事?

write方法会调用一个类为RecordWriter的对象负责写，跟我们在上文分析过的RecordReader一看就是兄弟嘛,作用你 也肯定猜到了,就是将一个Key value对写入到输出文件中。

RecordWriter也是一种抽象，在Map输出阶段，它会被实例化为**Collector。

这个**Collector会持有一个Partitioner和一个MapOutputCollector

---

Partitioner

但凡了解一点MapReduce的人应该都知道这个类,它的作用是根据Key将Map的输出分区,然后 发送给Reduce线程。有多少个Partition,就对应有多少个Reduce线程。Reduce线程的个数是可以 在配置文件中设定的。上面代码的逻辑就是先读一下这个配置,看一下需要分到少个分区,如果分区数 少于1,就实例化出一个Partitioner的默认实现,否则的话,用反射读取用户设置的实现类。

我们一般只重写它的一个方法:getPartition,参数是一个Key Value对以及Partition的总数,比 较常见的实现是取Key的hashcode再对总的分区数取模。

注意,为了提高整个job的运行速度,reduce task应该尽可能均匀的接收Map的输出。partition 作为Map输出分配的唯一参考标准,映射规则至关重要,partition返回值一样的Map的输出,将会交 给一个reducetask,在实际工作中,我们就遇到了partition返回值不合理,好多Mapper的输出都压 在一个reduce的task上,造成这个reducetask执行非常缓慢,整体的job一直结束不了的情况。尽可 能均匀的分配partition! 


MapOutputCollector

这个Collector我们可以自己实现,不过不是很常见。它有一个默认实现,叫MapOutputBuffer。有关MapOutputBuffer的分析,文献[4]有非常清晰的解释,值得一看。

它会根据分区算法对mapper的输出进行划分，写入内从，缓冲区满后，从内从溢写到index文件，溢写时会做**排序与合并**，合并后多个split处理的输出（每个split也有多个分区）将按分区顺序排列形成一个中间文件，这个中间文件就是Reduce的处理对象。

![Alt text](/public/img/hadoop/12.jpeg)

合并前后的示意图还是很形象的。最终在shuffle的时候,只要根据index查找对应的数据就可以了。

# Shuffle

从语义上说,Shuffle应该是Map和Reduce中间的过程,从源码的代码结构上看,shuffle过程是 在reduceTask中得。

**ReduceTask有三个Phase,即copyPhase,sortPhase和reducePhase,主流的做法应该是将前两个phase归为Shuffle阶段,reducephase作为狭义的reduce过程。**

Shuffle过程通过调用抽象类ShuffleConsumerPlugin来完成,它有个实现类,就叫做“Shuffle”。

Shuffle的时候,会先判断是不是local run的,如果不是的话,会默认启动5个Fetcher线程拉取 map的输出,Fetcher会先找到一个主机,确定这台机器上它要拉取的map task的输出,然后使用http协议获取response的stream,交给MapOutput类型的对象去完成具体的下载任务。

当文件拉取完成,就会进入**sort阶段**。注意到我们拉取到数据都是局部有序的,因此,排序的过程, 实际上也就是一个Merge的过程。

Merge就是将小文件（各台主机过来的分区数据）合并成大文件,对于初始有序 的数据,为了减少比较次数,每次应该合并数据最少的两组,也就是霍夫曼树的思想。

每个大文件就是ReduceTask的输入。

---

# 分组

ReduceTask按照key分组，一个分组会调用一次reduce方法，同一个key及其值的集合是reduce的参数

## GroupingComparator

我们知道,哪些Mapper的输出交给一个Reduce线程是由Partitioner决定的,但是这些输入并不 是一次性处理的,举个例子,我们在做大小写敏感wordcount的时候,假设使用的partition策略是根据单词首字母大小来指定reducer,有2个reducer的话,"an"和"car"都会交给同一个reduce线程, 但是统计每个单词个数的时候,他俩是不能混起来的,也就是一个reduce线程实际上将整个输入分成了好多组,在每一组上运行了一次reduce的过程。这个组怎么分,就是GroupingComparator做得事情。针对word count这个实例,我们应该将完全相等的两个单词作为一组,运行一次reduce的方法。

# Reduce的输出


在构造ReduceContext的时候,传入了两个跟输出相关的参数,一个是RecordWriter类型,一个 是OutputCommitter类型。但是,当查看这两个对象构造的过程时,会发现他们的幕后boss居然是 OutputFormat!这货看起来是不是非常眼熟?没错,我们在之前讲Map的输出时提到过一次,没有展开 讲。它跟InputFormat的功能其实很呼应。 

从源码的描述来看,OutputFormat主要做两件事情,一是验证job的输出配置是否合理(比如查看目标路径是否存在),二是提供一个RecordWriter的实现,来写入最终的输出。三个抽象方法,分别用 于返回RecordWriter,返回OutputCommitter,以及验证输出的配置。

你可能会想不通一个输出为什么要搞这么复杂,反正一个reducer产生一个文件,指定一下目录,直接往里写不就行了吗?怎么还要recordWriter,还要committer的。我们回想一下hadoop设计的初 衷,在不可靠的机器上,得到可靠的输出。也就是,hadoop的设计者认为一个task它很可能是会运行 失败的,我们常常需要尝试多次,因此,除了写入操作之外,我们应该先写在临时目录,确定成功了, 再提交到正式的输出目录里,这个工作其实就是committer做得,而recordWriter只要专注于写入操作 就可以了。

我们当然可以从头开始写一个OutputFormat,但更一般的做法是,继承自一个典型的实现 FileOutputFormat。 

FileOutputFormat

下面是它对checkOutputSpecs的实现:

		public void checkOutputSpecs(FileSystem ignored, JobConf job)  
		throws FileAlreadyExistsException,  
		InvalidJobConfException, IOException {  
		// Ensure that the output directory is set and not already there  
		Path outDir = getOutputPath(job);  
		if (outDir == null && job.getNumReduceTasks() != 0) {  
		throw new InvalidJobConfException("Output directory not set in JobConf.");  
		}  
		if (outDir != null) {  
		FileSystem fs = outDir.getFileSystem(job);  
		// normalize the output directory  
		outDir = fs.makeQualified(outDir);  
		setOutputPath(job, outDir);  
		// get delegation token for the outDir's file system  
		TokenCache.obtainTokensForNamenodes(job.getCredentials(),  
		new Path[] {outDir}, job);  
		// check its existence  
		if (fs.exists(outDir)) {  
		throw new FileAlreadyExistsException("Output directory " + outDir +  
		" already exists");  
		}  
		}  
		}  


最开始接触hadoop跑测试的时候,经常遇到FileAlreadyExistsException这个错误,原因就是 没有删掉上一次跑的结果。直到现在,才知道原来是从这里抛出的啊。hadoop之所以这样设定,是为 了防止因为粗心覆盖掉之前生成的数据,我觉得这是合理的。

FileOutputFormat还提供了一些好用的方法,比如下面这个: 

public synchronized static String getUniqueFile(TaskAttemptContext context,  
String name,  
String extension) {  
TaskID taskId = context.getTaskAttemptID().getTaskID();  
int partition = taskId.getId();  
StringBuilder result = new StringBuilder();  
result.append(name);  
result.append('-');  
result.append(  
TaskID.getRepresentingCharacter(taskId.getTaskType()));  
result.append('-');  
result.append(NUMBER_FORMAT.format(partition));  
result.append(extension);  
return result.toString();  
}  

这个方法提供了一种生成唯一输出文件名的功能，之所以需要这个，是因为多个task都输出，万一起名冲突就坏了。命名的规则是以用户提供的字符串开头，然后是task的类型（map-m， reduce-r)，最后是这个task所属的partition。这种方式保证了在当前job生成的结果中文件名是唯一的。标示出task得类型和partition有很大的好处，我们在实际工作中就有过这种体会。我们有一个每小时都会运行的job，跑完一个小时的数据需要15分钟的样子，但是每天0点都会跑的特别慢，也不报错，通过查看生成文件，我们发现标示为r的partition号为3的那个task总是最后生成文件，而且比其他partition的都要明显大，最终确定了是交给这个partition的数据太多造成的。对于一开始用户提供的前缀，当然可以是任何形式，但是我们强烈建议缀上时间戳。在我们的实践中，当前小时生成的数据有可能需要拷贝回前面的文件夹，默认提供的命名方式只能保证在当前job生成的输出文件是唯一的，没法保证与之前的不冲突，我们的做法是在前缀上加时间戳，这样可以方便的分辨哪些是后来加入的文件。


OutputCommitter
从源码的注释，我们知道OutputCommitter负责下面的工作：
• 在job启动时setup job。例如，在job的启动期间建立临时的输出目录。
• 在job结束是clean up job。比如，job结束之后删掉临时输出目录。
• 建立task的临时输出
• 检测一个task需不需要提交自己的输出
• 提交task的输出
• 丢弃task的输出
这么列出来，感觉比较空洞，我讲一下我的理解。正如前文提到的，OutputCommitter的主要职责是建立起task执行的临时目录，然后验证这个task需不需要将自己的输出的结果提交，提交到哪里。对于产生的临时目录和写入的临时文件，也要负责清理干净。