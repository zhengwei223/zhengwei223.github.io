---
layout: post
title: Hadoop单机与伪分布环境安装
category: Hadoop
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 本文介绍Hadoop环境搭建和第一个MapReduce程序的运行。
author: 郑未
---

# ubuntu+java环境

## 添加hadoop用户

	sudo useradd -m hadoop -s /bin/bash    # 添加系统账号
	sudo passwd hadoop                     # 设置密码
	sudo adduser hadoop sudo               # 给hadoop用户授管理权
	su - hadoop							               # 用 hadoop 用户登录
	sudo apt-get update                    # 更新apt-get
	sudo apt-get install vim               # 安装vim

## 安装SSH、配置SSH无密码登陆

	sudo apt-get install openssh-server
	ssh localhost                               # 此时需要输入密码   
	exit                           				# 退出刚才的 ssh localhost
	cd ~/.ssh/                     				# 若没有该目录，请先执行一次ssh localhost
	ssh-keygen -t rsa              				# 会有提示，都按回车就可以
	cat ./id_rsa.pub >> ./authorized_keys  		# 加入授权
	ssh localhost 								# 无需输入密码就可以直接登陆了

## 安装Java环境

    sudo apt-get install -y openjdk-7-jre openjdk-7-jdk wget

安装好 OpenJDK 后，需要找到相应的安装路径，这个路径是用于配置 JAVA_HOME 环境变量的。执行如下命令：

    dpkg -L openjdk-7-jdk | grep '/bin/javac'

该命令会输出一个路径，除去路径末尾的 “/bin/javac”，剩下的就是正确的路径了。如输出路径为 `/usr/lib/jvm/java-7-openjdk-amd64/bin/javac`，则我们需要的路径为 `/usr/lib/jvm/java-7-openjdk-amd64`。

接着配置 JAVA_HOME 环境变量，为方便，我们在 ~/.bashrc 中进行设置：

	vim ~/.bashrc

在文件最前面添加如下单独一行（注意 = 号前后不能有空格），将“JDK安装路径”改为上述命令得到的路径，并保存：

    export JAVA_HOME=JDK安装路径

使变量设置生效
	
	source ~/.bashrc  

设置好后我们来检验一下是否设置正确：

    echo $JAVA_HOME # 检验变量值
    java -version

# 安装 Hadoop  #

到官网下载稳定版的已编译的二进制包，并解压缩：

    wget http://mirrors.hust.edu.cn/apache/hadoop/common/hadoop-2.6.5/hadoop-2.6.5.tar.gz
    tar -xzvf hadoop-2.6.5.tar.gz
    mv hadoop-2.6.5 /usr/local/hadoop  # 拷贝到指定位置

记住，hadoop安装在`/usr/local/hadoop`路径了。
接着配置HADOOP_HOME 环境变量，为方便，我们在 ~/.bashrc 中进行设置：

	vim ~/.bashrc

在文件最前面添加如下单独一行（注意 = 号前后不能有空格），将“HADOOP安装路径”改为上述路径，并保存：

    export HADOOP_HOME=HADOOP安装路径
    export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

使变量设置生效
	
	source ~/.bashrc  

设置好后我们来检验一下是否设置正确：

    echo $HADOOP_HOME 	# 检验变量值
    hadoop version
    

# Hadoop单机配置(非分布式) #

上面两个大步骤我们就配置好了ubuntu+java+hadoop的单机基本环境，如果需要多机集群环境，我们可以克隆虚拟机或者重做一遍或者采用批量安装的方式为多台主机设计一样的环境。

Hadoop 默认模式为非分布式模式，无需进行其他配置即可运行。非分布式即单Java进程，方便进行调试，往往是程序员选择的模式。

现在我们可以执行例子来感受下Hadoop的运行。Hadoop附带了丰富的例子（运行 `hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.6.5.jar` 可以看到所有例子），包括 wordcount、terasort、join、grep 等，而且还有这些案例的相关解释。

在此我们选择运行 grep 例子，我们将input文件夹中的所有文件作为输入，筛选当中符合正则表达式 dfs[a-z.]+ 的单词并统计出现的次数，最后输出结果到output文件夹中。

	cd /usr/local/hadoop
	mkdir ./input
	cp ./etc/hadoop/*.xml ./input   # 将配置文件作为输入文件
	hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar grep input output 'dfs[a-z.]+'
	cat output/*        			# 查看运行结果

执行成功后，输出了作业的相关信息。
**注意，Hadoop 默认不会覆盖结果文件，因此再次运行上面实例会提示出错，需要先将 ./output 删除。**

rm -r ./output

# Hadoop伪分布式配置

Hadoop可以在单节点上以伪分布式的方式运行，Hadoop进程以分离的Java进程来运行，节点既作为 NameNode也作为DataNode，同时，读取的是 `HDFS` 中的文件。

**无论伪还是不伪，分布式最大特点是：分布式存储和分布式协作，分布式存储我们一定要用到hdfs，因此必须配置相关参数，而且以后程序的数据源和目的地都是hdfs文件系统，我们要上传文件到hdfs，从hdfs下载文件**

Hadoop的配置文件位于 `/usr/local/hadoop/etc/hadoop/` 中，**伪分布式需要修改2个配置文件 `core-site.xml` 和 `hdfs-site.xml`** 。Hadoop的配置文件是 xml 格式，每个配置以声明 property的name和value的方式来实现。

修改配置文件`core-site.xml`，将当中的

	<configuration>
	</configuration>

修改为下面配置：

	<configuration>
        <!-- 临时文件位置 -->
        <property>
             <name>hadoop.tmp.dir</name>
             <value>file:/usr/local/hadoop/tmp</value>
             <description>Abase for other temporary directories.</description>
        </property>
        <!-- 文件位置，非真正位置，而是  类型://地址:端口 -->
        <property>
             <name>fs.defaultFS</name>
             <value>hdfs://localhost:9000</value>
        </property>
	</configuration>

同样的，修改配置文件 hdfs-site.xml：


	<configuration>
      <!-- namenode节点文件存放位置，类型为本地文件:///路径 -->
	    <property>
	        <name>dfs.namenode.name.dir</name>
	        <value>file:/usr/local/hadoop/tmp/hdfs/namenode</value>
	        <description>NameNode directory for namespace and transaction logs storage.</description>
	    </property>
        <!-- datanode节点文件存放位置，类型为本地文件:///路径 
        这项配置可以仅在datanode上出现-->
	    <property>
	        <name>dfs.datanode.data.dir</name>
          <!-- datanode文件存放位置 -->
          <value>file:/usr/local/hadoop/tmp/hdfs/datanode</value>
	        <description>DataNode directory</description>
	    </property>
        <!-- 文件副本数量，伪分布就1 -->
        <property>
            <name>dfs.replication</name>
            <value>1</value>  
	    </property>
	</configuration>

**分别配置了namenode和datanode放置数据的本地位置，这些路径需要创建并根据实际情况修改，还配置了文件副本的个数。**

> Hadoop配置文件说明
> Hadoop 的运行方式是由配置文件决定的（运行 Hadoop 时会读取配置文件），**因此如果需要从伪分布式模式切换回非分布式模式，需要删除 core-site.xml 中的配置项。或重命名为core-site.xml.template**
> 
> 此外，伪分布式虽然只需要配置fs.defaultFS（core） 和 dfs.replication(hdfs) 就可以运行（官方教程如此），不过若没有配置 hadoop.tmp.dir 参数，则默认使用的临时目录为 /tmp/hadoo-hadoop，而这个目录在重启时有可能被系统清理掉，导致必须重新执行 format 才行。所以我们进行了设置，同时也指定 dfs.namenode.name.dir 和 dfs.datanode.data.dir，否则在接下来的步骤中可能会出错。

配置完成后，执行 NameNode 的格式化:

	hdfs namenode -format

成功的话，会看到 “successfully formatted” 和 “Exitting with status 0” 的提示，若为 “Exitting with status 1” 则是出错。

如果在这一步时提示 *Error: JAVA_HOME is not set and could not be found*. 的错误，则说明之前设置 JAVA_HOME 环境变量没设置好，请按教程先设置好 `JAVA_HOME `变量，还要修改`hadoop-env.sh`文件中JAVA_HOME指向的位置，写成绝对路径，否则后面的过程都是进行不下去的。

接着开启 NameNode 和 DataNode 守护进程。

    ./sbin/start-dfs.sh

若出现SSH提示，输入yes即可。


启动时可能会出现如下 WARN 提示：`WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform… using builtin-java classes where applicable`该 WARN 提示可以忽略，并不会影响正常使用（该 WARN 可以通过编译 Hadoop 源码解决）。

启动完成后，可以通过命令 `jps` 来判断是否成功启动，若成功启动则会列出如下进程: “NameNode”、”DataNode” 和 “SecondaryNameNode”（如果 SecondaryNameNode 没有启动，请运行 `sbin/stop-dfs.sh `关闭进程，然后再次尝试启动尝试）。如果没有 NameNode 或 DataNode ，那就是配置不成功，请仔细检查之前步骤，或通过查看启动日志排查原因。

### 启动 Hadoop 时提示 Could not resolve hostname

如果启动 Hadoop 时遇到输出非常多“ssh: Could not resolve hostname xxx”的异常情况，如下图所示：


这个并不是 ssh 的问题，可通过设置 Hadoop 环境变量来解决。

首先按键盘的 ctrl + c 中断启动，然后在 ~/.bashrc 中，增加如下两行内容：

    export HADOOP_HOME=/usr/local/hadoop
    export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native


### web界面

成功启动后，可以访问 Web 界面 `http://master地址:50070` 查看 NameNode 和 Datanode 信息，还可以在线查看 HDFS 中的文件。

## 运行Hadoop伪分布式实例

上面的单机模式，grep 例子读取的是本地数据，**伪分布式读取的则是 HDFS 上的数据**。要使用 HDFS，首先需要在 HDFS 中创建"目录"，hdfs提供了对目录的抽象，但并不是直接在当前系统建立这样一个目录：

    # 创建hadoop用户目录
    hdfs dfs -mkdir -p /user/hadoop
	  hdfs dfs -mkdir  input    # 基于用户目录的相对路径

接着将 `./etc/hadoop` 中的 xml 文件作为输入文件复制到**分布式文件系统中**，即将 `/usr/local/hadoop/etc/hadoop`中的xml复制到分布式文件系统中的 `/input`中。

    hdfs dfs -put ./etc/hadoop/*.xml input

复制完成后，可以通过如下命令查看文件列表：

	hdfs dfs -ls input

**伪分布式运行 MapReduce 作业的方式跟单机模式相同，区别在于伪分布式读取的是HDFS中的文件**（可以将单机步骤中创建的本地 input 文件夹，输出结果 output 文件夹都删掉，然后运行下列程序，来验证这一点）。

	hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar grep input output 'dfs[a-z.]+'
	hdfs dfs -cat output/*   # dfs命令来查看文件内容

我们也可以将运行结果取回到本地：`hdfs dfs -get output ./output     # 将 HDFS 上的 output 文件夹拷贝到本机`

**Hadoop 运行程序时，输出目录不能存在**，否则会提示错误 “**org.apache.hadoop.mapred.FileAlreadyExistsException: Output directory hdfs://localhost:9000/user/hadoop/output already exists**” ，因此若要再次执行，需要执行如下命令删除 output 文件夹:

	hdfs dfs -rm -r output    # 删除 hdfs上的output 文件夹，所以要用dfs命令

若要关闭 Hadoop，则运行

	./sbin/stop-dfs.sh

注意下次启动 `hadoop` 时，无需进行 NameNode 的初始化，只需要运行 `start-dfs.sh` 就可以！

# 启动YARN

<p class='text-error'>
    注意，启动yarn为非必选项，反而在单机或开发环境下不应该启动，因为它分离了JobTracker为AppMaster和ResourceManager，分别来管理资源和程序，是专用于集群的，内存消耗更大，协作更为复杂。    
</p>

启动yarn后，见不到书上所说的 `JobTracker` 和 `TaskTracker`，这是因为yarn采用了新的运算协作架构。

YARN 是从 MapReduce 中分离出来的，负责资源管理与任务调度。YARN 运行于 MapReduce 之上，提供了高可用性、高扩展性，YARN 的更多介绍在此不展开，有兴趣的可查阅相关资料。

上述通过 `./sbin/start-dfs.sh` 启动 Hadoop，**仅仅是启动了 MapReduce 环境**，我们可以启动 YARN ，让 YARN 来负责资源管理与任务调度。

首先修改配置文件 `mapred-site.xml`，

	<configuration>
        <!-- 指定一个框架来完成MapReduce，取代最原始的MapReduce实现 -->
        <property>
             <name>mapreduce.framework.name</name>
             <value>yarn</value>
        </property>
	</configuration>

接着修改配置文件 yarn-site.xml：

	<configuration>
        <property>
             <name>yarn.nodemanager.aux-services</name>
             <value>mapreduce_shuffle</value>
            </property>
	</configuration>

然后就可以启动 YARN 了：

	./sbin/start-yarn.sh      # 启动YARN
	./sbin/mr-jobhistory-daemon.sh start historyserver  # 开启历史服务器，才能在Web中查看任务运

开启后通过 jps 查看，可以看到多了 NodeManager 和 ResourceManager 两个后台进程,*在正式环境中，namenode和ResourceManager不在一个主机上，和NodeManager也不在一个主机上*，自然每个守护进程都能获得更多资源，但是在单机环境下所有守护进程和worker进程都在一起，很有可能造成资源不足。

启动 YARN 之后，运行实例的方法还是一样的，仅仅是资源管理方式、任务调度不同。观察日志信息可以发现，不启用 YARN 时，是 “`mapred.LocalJobRunner`” 在跑任务，启用 YARN 之后，是 “`mapred.YARNRunner`” 在跑任务。

<p class="text-error">
但 YARN 主要是为集群提供更好的资源管理与任务调度，然而这在单机上体现不出价值，反而会使程序跑得稍慢些。因此在单机上是否开启 YARN 就看实际情况了。
</p>

>不启动 YARN 需重命名` mapred-site.xml`。


> 如果不想启动 YARN，务必把配置文件` mapred-site.xml `重命名，改成 `mapred-site.xml.template`，需要用时改回来就行。否则在该配置文件存在，而未开启 YARN 的情况下，运行程序会提示 “`Retrying connect to server: 0.0.0.0/0.0.0.0:8032`” 的错误，这也是为何该配置文件初始文件名为 mapred-site.xml.template。

同样的，关闭 YARN 的脚本如下：

	./sbin/stop-yarn.sh
	./sbin/mr-jobhistory-daemon.sh stop historyserver

