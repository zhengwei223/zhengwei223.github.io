---
layout: post
title: Hadoop集群安装
category: Hadoop
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 本文介绍Hadoop环境搭建和第一个MapReduce程序的运行。
author: 郑未
---

参考[http://www.powerxing.com/install-hadoop-cluster/](http://www.powerxing.com/install-hadoop-cluster/ "http://www.powerxing.com/install-hadoop-cluster/")

# 准备工作

Hadoop 集群的安装配置大致为如下流程:

- 选定一台机器作为 Master
- 在 Master 节点上配置 hadoop 用户、安装 SSH server、安装 Java 环境
- 在 Master 节点上安装 Hadoop，并完成配置
- 在其他 Slave 节点上配置 hadoop 用户、安装 SSH server、安装 Java 环境
- 将 Master 节点上的 /usr/local/hadoop 目录复制到其他 Slave 节点上
- 在 Master 节点上开启 Hadoop 

**继续下一步配置前，请先完成上述流程的前 4 个步骤。**

# 网络配置 #

假设集群所用的节点都位于同一个局域网。

如果使用的是虚拟机安装的系统，那么需要更改网络连接方式为桥接（Bridge）模式，才能实现多个节点互连。此外，如果节点的系统是在虚拟机中直接复制的，要确保各个节点的 Mac 地址不同（可以点右边的按钮随机生成 MAC 地址，否则 IP 会冲突）

Linux 中查看节点 IP 地址的命令为 ifconfig，即inet 地址（注意虚拟机安装的 CentoS 不会自动联网，需要点右上角连上网络才能看到 IP 地址）

首先在 Master 节点上完成准备工作，并关闭 Hadoop (`/usr/local/hadoop/sbin/stop-dfs.sh`)，再进行后续集群配置。

为了便于区分，可以修改各个节点的主机名（在终端标题、命令行中可以看到主机名，以便区分）。在 Ubuntu/CentOS 7 中，我们在 Master 节点上执行如下命令修改主机名（即改为 Master，注意是区分大小写的）：

	sudo vim /etc/hostname

如果是用 CentOS 6.x 系统，则是修改 `/etc/sysconfig/network` 文件，改为 `HOSTNAME=Master`。

然后执行如下命令修改自己所用节点的IP映射：

	vim /etc/hosts
	ip   名称

我们在 /etc/hosts 中将该映射关系填写上去即可。

**一般该文件中只有一个 127.0.0.1，其对应名为 localhost，如果有多余的应删除，特别是不能有 “127.0.0.1 Master” 这样的记录**

出现连接错误，请参考：[hadoop环境报failed on connection exception](http://blog.csdn.net/wqetfg/article/details/50715541)

修改完成后需要重启一下，重启后在终端中才会看到机器名的变化。接下来的教程中请注意区分 Master 节点与 Slave 节点的操作。

> 需要在所有节点上完成网络配置
> 如上面讲的是 Master 节点的配置，而在其他的 Slave 节点上，也要对 /etc/hostname（修改为 Slave1、Slave2 等） 和 /etc/hosts（跟 Master 的配置一样）这两个文件进行修改！

配置好后需要在各个节点上执行如下命令，测试是否相互 ping 得通，如果 ping 不通，后面就无法顺利配置成功：

	ping Master -c 3   # 只ping 3次，否则要按 Ctrl+c 中断
	ping Slave1 -c 3

例如我在 Master 节点上 ping Slave1，ping 通的话会显示 time

# SSH无密码登陆节点 #

这个操作是要让 Master 节点可以无密码 SSH 登陆到各个 Slave 节点上。

首先生成 Master 节点的公匙，在 Master 节点的终端中执行（因为改过主机名，所以还需要删掉原有的再重新生成一次）：

	cd ~/.ssh               # 如果没有该目录，先执行一次ssh localhost
	rm ./id_rsa*            # 删除之前生成的公匙（如果有）
	ssh-keygen -t rsa       # 一直按回车就可以

让 Master 节点需能无密码 SSH 本机，在 Master 节点上执行：

	cat ./id_rsa.pub >> ./authorized_keys

完成后可执行 `ssh Master` 验证一下（可能需要输入 yes，成功后执行 exit 返回原来的终端）。接着**在 Master 节点将上公匙传输到 Slave1 节点**：

	scp ~/.ssh/id_rsa.pub hadoop@Slave1:/home/hadoop/

scp 是 `secure copy` 的简写，用于在 Linux 下进行远程拷贝文件，类似于 cp 命令，不过 cp 只能在本机中拷贝。执行 scp 时会要求输入 Slave1 上 hadoop 用户的密码(hadoop)，输入完成后会提示传输完毕

接着在 Slave1 节点上，将 ssh 公匙加入授权：

	mkdir ~/.ssh       # 如果不存在该文件夹需先创建，若已存在则忽略
	cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
	rm ~/id_rsa.pub    # 用完就可以删掉了

如果有其他 Slave 节点，也要执行**将 Master 公匙传输到 Slave 节点、在 Slave 节点上加入授权这两步。**

这样，在 Master 节点上就可以无密码 SSH 到各个 Slave 节点了，可在 Master 节点上执行如下命令进行检验

# 配置集群/分布式环境 #

集群/分布式模式需要修改 /usr/local/hadoop/etc/hadoop 中的**5个配置文件**，更多设置项可点击查看官方说明，这里仅设置了正常启动所必须的设置项： `slaves`、`core-site.xml`、`hdfs-site.xml`、`mapred-site.xml`、`yarn-site.xml` 。

1, 文件 slaves，将作为 DataNode 的主机名写入该文件，每行一个，默认为 localhost，所以在伪分布式配置时，节点即作为 NameNode 也作为 DataNode。分布式配置可以保留 localhost，也可以删掉，让 Master 节点仅作为 NameNode 使用。

本教程让 Master 节点仅作为 NameNode 使用，因此将文件中原来的 localhost 删除，只添加一行内容：Slave1。

2, 文件 core-site.xml 改为下面的配置：

    <configuration>
        <property>
                <name>fs.defaultFS</name>
                <value>hdfs://Master:9000</value>
        </property>
        <property>
                <name>hadoop.tmp.dir</name>
                <value>file:/usr/local/hadoop/tmp</value>
                <description>Abase for other temporary directories.</description>
        </property>
	</configuration>

3, 文件 hdfs-site.xml，dfs.replication 一般设为 3，但我们只有一个 Slave 节点，所以 dfs.replication 的值还是设为 1：

	<configuration>
        <property>
                <name>dfs.namenode.secondary.http-address</name>
                <value>Master:50090</value>
        </property>
        <property>
                <name>dfs.replication</name>
                <value>1</value>
        </property>
        <property>
                <name>dfs.namenode.name.dir</name>
                <value>file:/usr/local/hadoop/tmp/dfs/name</value>
        </property>
        <property>
                <name>dfs.datanode.data.dir</name>
                <value>file:/usr/local/hadoop/tmp/dfs/data</value>
        </property>
	</configuration>

4, 文件 mapred-site.xml （可能需要先重命名，默认文件名为 mapred-site.xml.template），然后配置修改如下：

	<configuration>
        <property>
                <name>mapreduce.framework.name</name>
                <value>yarn</value>
        </property>
        <property>
                <name>mapreduce.jobhistory.address</name>
                <value>Master:10020</value>
        </property>
        <property>
                <name>mapreduce.jobhistory.webapp.address</name>
                <value>Master:19888</value>
        </property>
	</configuration>

5, 文件 yarn-site.xml：

	<configuration>
        <property>
                <name>yarn.resourcemanager.hostname</name>
                <value>Master</value>
        </property>
        <property>
                <name>yarn.nodemanager.aux-services</name>
                <value>mapreduce_shuffle</value>
        </property>
	</configuration>

配置好后，**将 Master 上的 /usr/local/Hadoop 文件夹复制到各个节点上**。因为之前有跑过伪分布式模式，建议在切换到集群模式前先删除之前的临时文件。在 Master 节点上执行：

	cd /usr/local
	sudo rm -r ./hadoop/tmp     # 删除 Hadoop 临时文件
	sudo rm -r ./hadoop/logs/*   # 删除日志文件
	tar -zcf ~/hadoop.master.tar.gz ./hadoop   # 先压缩再复制
	cd ~
	scp ./hadoop.master.tar.gz Slave1:/home/hadoop

在 Slave1 节点上执行：

	sudo rm -r /usr/local/hadoop    # 删掉旧的（如果存在）
	sudo tar -zxf ~/hadoop.master.tar.gz -C /usr/local
	sudo chown -R hadoop /usr/local/hadoop

同样，如果有其他 Slave 节点，**也要执行将 hadoop.master.tar.gz 传输到 Slave 节点、在 Slave 节点解压文件的操作**。

首次启动需要先在 Master 节点执行 NameNode 的格式化：

	hdfs namenode -format       # 首次运行需要执行初始化，之后不需要


> CentOS系统需要关闭防火墙

> CentOS系统默认开启了防火墙，在开启 Hadoop 集群之前，需要关闭集群中每个节点的防火墙。有防火墙会导致 ping 得通但 telnet 端口不通，从而导致 DataNode 启动了，但 Live datanodes 为 0 的情况。
> 
> 在 CentOS 6.x 中，可以通过如下命令关闭防火墙：
> 
> 	sudo service iptables stop   # 关闭防火墙服务
> 	sudo chkconfig iptables off  # 禁止防火墙开机自启，就不用手动关闭了
> 
> 若用是 CentOS 7，需通过如下命令关闭（防火墙服务改成了 firewall）：
> 
> 	systemctl stop firewalld.service    # 关闭firewall
> 	systemctl disable firewalld.service # 禁止firewall开机启动


接着可以启动 hadoop 了，启动需要在 Master 节点上进行：

	start-dfs.sh
	start-yarn.sh
	mr-jobhistory-daemon.sh start historyserver

通过命令 jps 可以查看各个节点所启动的进程。正确的话，在 Master 节点上可以看到 **NameNode、ResourceManager、SecondrryNameNode、JobHistoryServer** 进程;
在 Slave 节点可以看到 **DataNode** 和 **NodeManager** 进程.

缺少任一进程都表示出错。另外还可以在 Master 节点上通过命令 `hdfs dfsadmin -report` 查看 DataNode 是否正常启动，Live datanodes  的数量应该等于活跃节点的数量 ，则说明集群启动成功。

# 执行分布式实例

执行分布式实例过程与伪分布式模式一样，首先创建 HDFS 上的用户目录：

	hdfs dfs -mkdir -p input

将 /usr/local/hadoop/etc/hadoop 中的配置文件作为输入文件复制到分布式文件系统中：

	hdfs dfs -put /usr/local/hadoop/etc/hadoop/*.xml input

通过查看 DataNode 的状态（占用大小有改变），输入文件确实复制到了 DataNode 中

接着就可以运行 MapReduce 作业了：

	hadoop jar /usr/local/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar grep input output 'dfs[a-z.]+'

运行时的输出信息与伪分布式类似，会显示 Job 的进度。

可能会有点慢，但如果迟迟没有进度，比如 5 分钟都没看到进度，那不妨重启 Hadoop 再试试。若重启还不行，则很有可能是内存不足引起，建议增大虚拟机的内存，或者通过更改 YARN 的内存配置解决。

关闭 Hadoop 集群也是在 Master 节点上执行的：

	stop-yarn.sh
	stop-dfs.sh
	mr-jobhistory-daemon.sh stop historyserver

此外，同伪分布式一样，也可以不启动 YARN，但要记得改掉 mapred-site.xml 的文件名，这样就回到用默认MapReduce框架来执行计算了。

自此，你就掌握了 Hadoop 的集群搭建与基本使用了。