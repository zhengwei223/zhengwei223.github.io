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
	sudo useradd -m hadoop -s /bin/bash
	sudo passwd hadoop
	sudo adduser hadoop sudo
	su - hadoop							# 用 hadoop 用户登录
	sudo apt-get update
	sudo apt-get install vim

## 安装SSH、配置SSH无密码登陆

	sudo apt-get install openssh-server
	ssh localhost
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
    $JAVA_HOME/bin/java -version  # 与直接执行 java -version 一样

# 安装 Hadoop  #

到官网下载稳定版的已编译的二进制包，并解压缩：

    wget http://mirrors.hust.edu.cn/apache/hadoop/common/hadoop-2.6.5/hadoop-2.6.5.tar.gz
    tar -xzvf hadoop-2.6.5.tar.gz
    mv hadoop-2.6.5 /usr/local/hadoop

记住，hadoop安装在`/usr/local/hadoop`路径了。
接着配置HADOOP_HOME 环境变量，为方便，我们在 ~/.bashrc 中进行设置：

	vim ~/.bashrc

在文件最前面添加如下单独一行（注意 = 号前后不能有空格），将“HADOOP安装路径”改为上述路径，并保存：

    export JAVA_HOME=HADOOP安装路径

使变量设置生效
	
	source ~/.bashrc  

设置好后我们来检验一下是否设置正确：

    echo $HADOOP_HOME 	# 检验变量值
    hadoop version
    
# Hadoop单机配置(非分布式) #

上面两个大步骤我们就配置好了ubuntu+java+hadoop的单机基本环境，如果需要多机集群环境，我们可以克隆虚拟机或者重做一遍或者采用批量安装的方式为多台主机设计一样的换行。

Hadoop 默认模式为非分布式模式，无需进行其他配置即可运行。非分布式即单 Java 进程，方便进行调试。

现在我们可以执行例子来感受下 Hadoop 的运行。Hadoop 附带了丰富的例子（运行 ./bin/hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples-2.6.0.jar 可以看到所有例子），包括 wordcount、terasort、join、grep 等。

在此我们选择运行 grep 例子，我们将 input 文件夹中的所有文件作为输入，筛选当中符合正则表达式 dfs[a-z.]+ 的单词并统计出现的次数，最后输出结果到 output 文件夹中。

	cd /usr/local/hadoop
	mkdir ./input
	cp ./etc/hadoop/*.xml ./input   # 将配置文件作为输入文件
	./bin/hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar grep input output 'dfs[a-z.]+'
	cat output/*        			# 查看运行结果

执行成功后，输出了作业的相关信息，输出的结果是符合正则的单词 dfsadmin 出现了1次。
**注意，Hadoop 默认不会覆盖结果文件，因此再次运行上面实例会提示出错，需要先将 ./output 删除。**

	rm -r ./output

# Hadoop伪分布式配置

Hadoop 可以在单节点上以伪分布式的方式运行，Hadoop 进程以分离的 Java 进程来运行，节点既作为 NameNode 也作为 DataNode，同时，读取的是 HDFS 中的文件。

Hadoop 的配置文件位于 `/usr/local/hadoop/etc/hadoop/` 中，伪分布式需要修改2个配置文件 `core-site.xml` 和 `hdfs-site.xml` 。Hadoop的配置文件是 xml 格式，每个配置以声明 property 的 name 和 value 的方式来实现。

修改配置文件 `core-site.xml` (通过 gedit 编辑会比较方便: `gedit ./etc/hadoop/core-site.xml`)，将当中的

	<configuration>
	</configuration>

修改为下面配置：

	<configuration>
        <property>
             <name>hadoop.tmp.dir</name>
             <value>file:/usr/local/hadoop/tmp</value>
             <description>Abase for other temporary directories.</description>
        </property>
        <property>
             <name>fs.defaultFS</name>
             <value>hdfs://localhost:9000</value>
        </property>
	</configuration>

同样的，修改配置文件 hdfs-site.xml：


	<configuration>
	    <property>
	        <name>dfs.namenode.name.dir</name>
	        <value>file:///root/hdfs/namenode</value><!-- namenode文件存放位置 -->
	        <description>NameNode directory for namespace and transaction logs storage.</description>
	    </property>
	    <property>
	        <name>dfs.datanode.data.dir</name>
	        <value>file:///root/hdfs/datanode</value><!-- datanode文件存放位置 -->
	        <description>DataNode directory</description>
	    </property>
	    <property>
	        <name>dfs.replication</name>
	        <value>2</value>  <!-- 文件副本数量 -->
	    </property>
	</configuration>

分别配置了namenode和datanode放置数据的位置，这些路径需要创建并根据实际情况修改，还配置了文件副本的个数。

> Hadoop配置文件说明
> Hadoop 的运行方式是由配置文件决定的（运行 Hadoop 时会读取配置文件），因此如果需要从伪分布式模式切换回非分布式模式，需要删除 core-site.xml 中的配置项。
> 
> 此外，伪分布式虽然只需要配置 fs.defaultFS 和 dfs.replication 就可以运行（官方教程如此），不过若没有配置 hadoop.tmp.dir 参数，则默认使用的临时目录为 /tmp/hadoo-hadoop，而这个目录在重启时有可能被系统清理掉，导致必须重新执行 format 才行。所以我们进行了设置，同时也指定 dfs.namenode.name.dir 和 dfs.datanode.data.dir，否则在接下来的步骤中可能会出错。

配置完成后，执行 NameNode 的格式化:

	hdfs namenode -format

成功的话，会看到 “successfully formatted” 和 “Exitting with status 0” 的提示，若为 “Exitting with status 1” 则是出错。

如果在这一步时提示 *Error: JAVA_HOME is not set and could not be found*. 的错误，则说明之前设置 JAVA_HOME 环境变量那边就没设置好，请按教程先设置好 `JAVA_HOME `变量，否则后面的过程都是进行不下去的。

接着开启 NameNode 和 DataNode 守护进程。

    ./sbin/start-dfs.sh

若出现如下SSH提示，输入yes即可。


启动时可能会出现如下 WARN 提示：WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform… using builtin-java classes where applicable。该 WARN 提示可以忽略，并不会影响正常使用（该 WARN 可以通过编译 Hadoop 源码解决）。

启动完成后，可以通过命令 `jps` 来判断是否成功启动，若成功启动则会列出如下进程: “NameNode”、”DataNode” 和 “SecondaryNameNode”（如果 SecondaryNameNode 没有启动，请运行 `sbin/stop-dfs.sh `关闭进程，然后再次尝试启动尝试）。如果没有 NameNode 或 DataNode ，那就是配置不成功，请仔细检查之前步骤，或通过查看启动日志排查原因。

## 运行Hadoop伪分布式实例

上面的单机模式，grep 例子读取的是本地数据，伪分布式读取的则是 HDFS 上的数据。要使用 HDFS，首先需要在 HDFS 中创建用户目录：

	hdfs  dfs -mkdir -p input

接着将 `./etc/hadoop` 中的 xml 文件作为输入文件复制到分布式文件系统中，即将 `/usr/local/hadoop/etc/hadoop` 复制到分布式文件系统中的 `/input` (用户目录下的相对路径，如`/root/input`)中。

    hdfs dfs -put ./etc/hadoop/*.xml input

复制完成后，可以通过如下命令查看文件列表：

	hdfs dfs -ls input

伪分布式运行 MapReduce 作业的方式跟单机模式相同，区别在于伪分布式读取的是HDFS中的文件（可以将单机步骤中创建的本地 input 文件夹，输出结果 output 文件夹都删掉来验证这一点）。

	hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar grep input output 'dfs[a-z.]+'
	hdfs dfs -cat output/*

我们也可以将运行结果取回到本地：`hdfs dfs -get output ./output     # 将 HDFS 上的 output 文件夹拷贝到本机`

Hadoop 运行程序时，输出目录不能存在，否则会提示错误 “org.apache.hadoop.mapred.FileAlreadyExistsException: Output directory hdfs://localhost:9000/user/hadoop/output already exists” ，因此若要再次执行，需要执行如下命令删除 output 文件夹:

	hdfs dfs -rm -r output    # 删除 output 文件夹

若要关闭 Hadoop，则运行

	./sbin/stop-dfs.sh

注意下次启动 `hadoop` 时，无需进行 NameNode 的初始化，只需要运行 `./sbin/start-dfs.sh` 就可以！

# 启动YARN

（伪分布式不启动 YARN 也可以，一般不会影响程序执行）

有的读者可能会疑惑，怎么启动 Hadoop 后，见不到书上所说的 JobTracker 和 TaskTracker，这是因为新版的 Hadoop 使用了新的 MapReduce 框架（MapReduce V2，也称为 YARN，Yet Another Resource Negotiator）。

YARN 是从 MapReduce 中分离出来的，负责资源管理与任务调度。YARN 运行于 MapReduce 之上，提供了高可用性、高扩展性，YARN 的更多介绍在此不展开，有兴趣的可查阅相关资料。

上述通过 `./sbin/start-dfs.sh` 启动 Hadoop，仅仅是启动了 MapReduce 环境，我们可以启动 YARN ，让 YARN 来负责资源管理与任务调度。

首先修改配置文件 `mapred-site.xml`，这边需要先进行重命名：
    
	mv ./etc/hadoop/mapred-site.xml.template ./etc/hadoop/mapred-site.xml

然后再进行编辑，同样使用 gedit 编辑会比较方便些 `gedit ./etc/hadoop/mapred-site.xml` ：

	<configuration>
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

然后就可以启动 YARN 了（需要先执行过 ./sbin/start-dfs.sh）：

	./sbin/start-yarn.sh      # 启动YARN
	./sbin/mr-jobhistory-daemon.sh start historyserver  # 开启历史服务器，才能在Web中查看任务运

开启后通过 jps 查看，可以看到多了 NodeManager 和 ResourceManager 两个后台进程

启动 YARN 之后，运行实例的方法还是一样的，仅仅是资源管理方式、任务调度不同。观察日志信息可以发现，不启用 YARN 时，是 “mapred.LocalJobRunner” 在跑任务，启用 YARN 之后，是 “mapred.YARNRunner” 在跑任务。启动 YARN 有个好处是可以通过 Web 界面查看任务的运行情况：http://localhost:8088/cluster

但 YARN 主要是为集群提供更好的资源管理与任务调度，然而这在单机上体现不出价值，反而会使程序跑得稍慢些。因此在单机上是否开启 YARN 就看实际情况了。

不启动 YARN 需重命名` mapred-site.xml`。
如果不想启动 YARN，务必把配置文件 mapred-site.xml 重命名，改成 mapred-site.xml.template，需要用时改回来就行。否则在该配置文件存在，而未开启 YARN 的情况下，运行程序会提示 “Retrying connect to server: 0.0.0.0/0.0.0.0:8032” 的错误，这也是为何该配置文件初始文件名为 mapred-site.xml.template。

同样的，关闭 YARN 的脚本如下：

	./sbin/stop-yarn.sh
	./sbin/mr-jobhistory-daemon.sh stop historyserver