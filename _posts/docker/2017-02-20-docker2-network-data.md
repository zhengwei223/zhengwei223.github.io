---
layout: post
title: docker容器的网络及数据卷
category: docker虚拟化技术
tags: docker 虚拟机 运维
keywords: 蓝桥 lanqiao 教程 docker 虚拟机 运维 
description: 本介绍Docker网络原理和设置以及访问主机文件。
author: 郑未
---

# 网络基础知识

## 网络命名空间：

Linux Namespaces机制提供一种资源隔离方案。PID,IPC,Network等系统资源不再是全局性的，而是属于特定的Namespace。每个Namespace里面的资源对其他Namespace都不可见。

一个Network Namespace提供了一份独立的网络环境，包括网卡、路由、Iptable规则等都与其他的Network Namespace隔离。一个Docker容器“通常”会分配一个独立的NetworkNamespace。“通常”的意思是如果docker以host模式启动则与主机在同一个命名空间。

这样每个docker容器就好像拥有了一套独立的网络环境，甚至以为自己霸占了全部的主机，也许这也是使人们经常认为容器就是虚机的原因之一吧

## Veth设备对

Veth设备对可以**在不同的网络命名空间之间通信**，用他们可以连接两个网络命名空间。一对veth设备就像网线的两头一样。

## 网桥

在docker启动时，会在主机上创建一个docker0网桥。通过docker0在同一个主机上的容器之间都可以通信，外部的消息也可以经过docker0进入容器。

# Docker网络模式

Docker有以下4种网络模式：

- host模式，使用--net=host指定。
- Container模式，使用--net=container:NAME_or_ID指定。
- none模式，使用--net=none指定。
- bridge模式，使用--net=bridge指定，**默认设置**。

## Bridge模式

Bridge是默认模式，正常docker启动时都已这个模式启动。在这个模式下当Docker server启动时，会在主机上创建一个名为docker0的虚拟网桥，此主机上启动的Docker容器会连接到这个虚拟网桥上。Docker0拥有一个自己的ip地址，`172.17.0.1`。是个172段的内部地址，机器外是访问不了的。

Docker容器处在自己的网络命名空间中，容器之间怎么互通呢，就是连这个docker0网桥。这里就用到前面另一个概念veth对。可以把veth对看成网线的两头，他一头在容器里另一头在主机上。

通过上一章制作的镜像，我们可以在宿主机上启动若干个环境一致的容器，例如：

	docker run -it --name master zhengwei/ubuntu-ssh-java7
	docker run -it --name slave1 zhengwei/ubuntu-ssh-java7-hadoop2.6
	docker run -it --name slave2 zhengwei/ubuntu-ssh-java7-hadoop2.6

这三个容器现在的唯一差别是它们分别有不同的网络参数

	docker attach master

然后按Ctrl+C，进入交互界面，输入`ifconfig`得到如下主要信息：

	eth0 Link encap:Ethernet  HWaddr 02:42:ac:11:00:02  
    inet addr:172.17.0.2  Bcast:0.0.0.0  Mask:255.255.0.0

master的ip地址为`172.17.0.2`，类似操作可以得到slave1和slave2的ip分别是`172.17.0.3`和`172.17.0.4`

结论,在bridge模式下：

- 主机上面会有一个docker0的网桥
- 每个容器都与docker0连通，所以同主机上的容器之间也连通
- 每个主机上容器的地址都是从172.17.0.2开始往后分

![](/public/img/docker/bridge.png)

### 通信

Docker会修改系统的路由规则来控制消息收发,在docker启动之后通过`iptables-save`(宿主上执行)查看，可以看到关于docker0的几个规则，他们使得docker0网桥可以收发消息。同一主机中的容器之间就可以通信。

### 问题

Bridge模式可以解决同主机内容器的通信，同时可以看到几个问题：

- docker容器之间想要连通需要在同一台主机上，跨主机无法通信
- 容器的ip地址都docker分配的，一般都从172.17.0.2开始，不同主机上的容器地址有可能是相同的。Docker集群要解决这个问题，不能让他们相同。

## Host模式

如果启动容器的时候使用host模式，那么这个容器将不会获得一个独立的Network Namespace，而是和宿主机共用一个Network Namespace。

容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。


当我们在容器中执行任何类似ifconfig命令查看网络环境时，看到的都是宿主机上的信息。而外界访问容器中的应用，则直接使用物理机器地址即可，就如直接跑在宿主机中一样。但是，容器的其他方面，如文件系统、进程列表等还是和宿主机隔离的。


## Container模式

这个模式指定新创建的容器和已经存在的一个容器共享一个Network Namespace，而不是和宿主机共享。新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围等。同样，两个容器除了网络方面，其他的如文件系统、进程列表等还是隔离的。

## None模式

在这种模式下，Docker容器拥有自己的Network Namespace，但是，并不为Docker容器进行任何网络配置。也就是说，这个Docker容器没有网卡、IP、路由等信息。需要我们自己为Docker容器添加网卡、配置IP等。


# 文件共享

## Docker容器和主机如何互相拷贝传输文件

1.docker cp命令
	
	docker cp --help

2.docker run 创建容器的时候，就需要指定挂载的目录

	docker run --help

这样你在系统中就可以看到然后外挂在里的目录了，直接copy就可以了。 

3.找到容器文件在主机上的路径

A. 获取容器名称或者id :

	$ docker ps

B. 获取整个容器的id，其实键盘tag就可以补全的。 

	$ docker inspect -f  ’两个左大括号.Id两个右大括号’  <步骤A获取的名称或者id>

得到一个更长的id

C. **不推荐** 在主机上拷贝文件到docker里面:

	$ sudo cp path-file-host /var/lib/docker/devicemapper/mnt/<<容器的id>>/rootfs/root