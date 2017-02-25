---
layout: post
title: docker machine
category: docker虚拟化技术
tags: docker 虚拟机 运维 docker machine
keywords: 蓝桥 lanqiao 教程 docker 虚拟机 运维 docker machine
description: 本章主要介绍docker machine的基本概念和使用。
author: 郑未
---

# docker machine和docker引擎有什么区别

> When people say “Docker” they typically mean Docker Engine, the client-server application made up of the Docker daemon, a REST API that specifies interfaces for interacting with the daemon, and a command line interface (CLI) client that talks to the daemon (through the REST API wrapper). Docker Engine accepts docker commands from the CLI, such as docker run <image>, docker ps to list running containers, docker images to list images, and so on.

当人们说“Docker”的时候一般指Docker引擎，一个基于Docker守护进程的cs应用程序，提供和Docker守护进程交互的的API以及界面。Docker引擎接收来自命令行界面的命令，如`docker run<image>`命令，`docker ps`命令等等。

![](https://docs.docker.com/machine/img/engine.png)

> Docker Machine is a tool for provisioning and managing your Dockerized hosts (hosts with Docker Engine on them). Typically, you install Docker Machine on your local system. Docker Machine has its own command line client docker-machine and the Docker Engine client, docker. You can use Machine to install Docker Engine on one or more virtual systems. These virtual systems can be local (as when you use Machine to install and run Docker Engine in VirtualBox on Mac or Windows) or remote (as when you use Machine to provision Dockerized hosts on cloud providers). The Dockerized hosts themselves can be thought of, and are sometimes referred to as, managed “machines”.

Docker Machine是一个供应和管理Docker化主机的工具。（换句话说：通过它可以得到一个安装了docker引擎的虚拟主机，通过它可以管理这个虚拟主机）。通常，我们在本地系统安装Docker Machine，它有自己的命令行客户端`docker-machine`同时拥有Docker Engine客户端`docker`。这个虚拟系统可以使本地的，也可以是远程的（当你在云上使用Machine来提供docker化主机时）。这些docker化主机通常被表述为机器（说docker机器加以区别）。

![](https://docs.docker.com/machine/img/machine.png)

**我们可以这样理解，docker machine是大于docker引擎的，它自己包含docker引擎的所有功能，还可以创建一个拥有docker引擎的虚拟机**

# 创建docker机器

首先下载并安装适合你操作系统的docker引擎，新版的引擎已经自带`docker-machine`命令，这样你既可以直接使用docker引擎，也可以创建一个docker机器。

其次，你还可以直接下载并安装docker machine。

这里采用第一种方案.

## windows

### 确保Hyper-V生效

据说安装docker for windows的时候已经安装了Hyper-V，保险起见根据[这个文档](https://docs.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)再做一遍:

以管理员身份打开 PowerShell 控制台。

运行以下命令：

    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

如果无法找到此命令，请确保你以管理员身份运行 PowerShell。

安装完成后，需要重新启动计算机。

### 配置一个新的虚拟交换机

到windows管理工具下找到hyper-v管理器

选中虚拟交换机管理器，新建虚拟网络交换机，填入名称并配置为外部网络：

![](https://docs.docker.com/machine/img/hyperv-network-switch.png)

然后重启

### 创建虚拟机

管理员身份运行cmd或者powershell，输入以下命令：

    #范式：docker-machine create -d hyperv --hyperv-virtual-switch "<NameOfVirtualSwitch>" <nameOfNode>
    docker-machine create -d hyperv --hyperv-virtual-switch "pvs" vm
    $ docker-machine ls   # 列出已创建的所有虚拟机

**然后**

    docker-machine env vm | Invoke-Expression   # 在vm执行环境变量配置
    docker-machine ssh vm                       # 登录到虚拟机的shell

下面你就可以像使用linux那样开始了，因为这个虚拟机上已经有docker 引擎，所以一般来说我们先pull一个镜像下来玩玩。

### 虚拟机的启动和停止

    docker-machine stop vm
    docker-machine start vm
    docker-machine ssh vm

更多命令选项可以通过`docker-machine --help`来查看，比较常用的是往虚拟机里面拷贝文件`docker-machine scp...`

### 多虚拟机

为了完全模拟集群，在资源允许的情况下，你可以创建多几个虚拟机，取不同的名字，它们自动在同一个网络里面。

### 创建命令的选项


    --hyperv-boot2docker-url: The URL of the boot2docker ISO.
    --hyperv-virtual-switch: Name of the virtual switch to use.
    --hyperv-disk-size: Size of disk for the host in MB.
    --hyperv-memory: Size of memory for the host in MB.
    --hyperv-cpu-count: Number of CPUs for the host.
    --hyperv-static-macaddress: Hyper-V network adapter’s static MAC address.
    --hyperv-vlan-id: Hyper-V network adapter’s VLAN ID if any.

-- | -- | --
--hyperv-boot2docker-url  |  HYPERV_BOOT2DOCKER_URL | Latest boot2docker url
--hyperv-virtual-switch | HYPERV_VIRTUAL_SWITCH |  first found
--hyperv-disk-size | HYPERV_DISK_SIZE |   20000
--hyperv-memory | HYPERV_MEMORY |  1024
--hyperv-cpu-count | HYPERV_CPU_COUNT  |  1
--hyperv-static-macaddress | HYPERV_STATIC_MACADDRESS  |  undefined
--hyperv-vlan-id  |  HYPERV_VLAN_ID | undefined