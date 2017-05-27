---
layout: post
title: Linux基础
category: Hadoop大数据分析平台
tags: Hadoop 大数据 数据挖掘 机器学习
keywords: 蓝桥 lanqiao 教程 Hadoop 大数据 数据挖掘 机器学习
description: 无论学习大数据还是普通应用的部署,都绕不开linux系统.
author: 郑未
---

无论学习大数据还是普通应用的部署,都绕不开linux系统.

# 主流两大系列

红帽系列：centos 其软件(包)管理工具 rpm yum

    rpm -qa
    yum install vim

[yum和rpm详解](http://blog.csdn.net/zhaoyue007101/article/details/8485186)

debian系列：ubuntu 其软件(包)管理工具 dpkg apt-get

    apt-cache search vim
    apt-get install vim


[apt和dpkg 详解](http://blog.csdn.net/baixiaoshi/article/details/43528803)

# shell命令

Linux shell 外壳命令：

    pwd
    cd
    ls
    mkdir
    touch

Linux文件系统

    /
    etc
    usr
    home

# windows上练习linux命令

纯练习linux命令为目的：

    mingw—— minimal gnu for windows
    cygwin——windos上的仿真shell环境

# 务必掌握vi编辑器

vi这个编辑器的使用

  先活下来，活得好

  更好——更熟

  更快
  
  更强

  [简明Vim练级攻略](http://kimi.it/487.html)

# 参考资料

对于Linux的学习也是一个过程，因为可能你连最简单的开机和关机命令都不会，更不要谈配置网络。这里面给大家提供刚开始学习所查阅的资料和经验总结。

首先我们需要使用一些命令，进行网络配置，但是在网络配置中，这里面又必须懂得虚拟机的一些知识，所以前面的虚拟机知识需要掌握扎实一些。

对于网络配置：

[集群搭建：主机宽带拨号上网，虚拟机使用桥接模式，该如何ping通外网](http://www.aboutyun.com/blog-61-15.html)


[集群搭建必备：虚拟机之一实现Host-only方式上网](http://www.aboutyun.com/thread-6743-1-1.html)

[集群搭建必备：nat模式设置静态ip，达到上网与主机相互通信](http://www.aboutyun.com/thread-6716-1-1.html)


其实还是上面三个，但是我们会遇到各种不会的命令，即使能查到命令，我们也不能使用。为什么会这样，因为各种有的命令，是需要使用安装包的。我们在配置网络过程中，同样会遇到各种各样的奇怪的配置。在我们的Linux的系统，不能找到文件。这里只举ubuntu。网络配置文件/etc/network/interfaces。我们配置完毕之后，有各种网络重启方式：

    /etc/init.d/networking  restart


这是一种网络重启方式，但是有时候并不管用。

那么这时候我们遇到困难了，刚接触命令不起作用，该怎么办？

    ifconfig eth0 down

    ifconfig eth0 up

(这里同样需要明白，我这里使用的是eth0上网的，如果你使用的是eth1，就需要替换成eth1)

上面的两个命令能达到同样的效果。

再举一例：
我们需要配置网络文件，在很多网络配置是使用下面的命令的

    vim /etc/network/interfaces


但是我们看到下面错误

    The program vim can be found in the following package:
    vim
    vim -gnome
    vim-tiny
    vim-gtk
    vim-nox
    Try:sudo apt-get install <select package>

这和我们看到的配置完全不一样。这是因为我们安装Linux之后，并没有安装vim包。所以我们又遇到了困难。如果你熟悉Linux的话，这个根本不是问题。

    vi /etc/network/interfaces

上面命令迎刃而解。一个vim，一个vi。在我们刚接触这些肯定云里雾里，所以你需要首先有成就感，然后在慢慢接触。下面都是经过实践的内容，也算是经验，大家可以参考。

[云技术基础：学习hadoop使用零基础linux(Ubuntu)笔记](http://www.aboutyun.com/thread-6683-1-1.html)

[搭建集群必知：Linux常用命令及修改文件总结（不断更新）](http://www.aboutyun.com/thread-6735-1-1.html)    

[Linux网络接口ifconfig命令及认识网络接口lo](http://www.aboutyun.com/thread-6434-1-1.html)

[linux入门详细介绍](http://www.aboutyun.com/thread-6276-1-2.html)


[虚拟机安装linux网络配置资料大全](http://www.aboutyun.com/thread-6435-1-1.html)


[解决遇到Linux网络配置，从熟悉网络配置文件入手（大体了解即可）](http://www.aboutyun.com/thread-6399-1-2.html)


[linux入门大全：包括零基础入门，Linux详细介绍](http://www.aboutyun.com/thread-6274-1-1.html)


[Linux重启方式init 0 init1 init 3 init 5 init 6 这几个启动级别都代表什么意思？](http://www.aboutyun.com/thread-6336-1-2.html)

[Ubuntu常用命令总结及修改DNS的多种方法总结](http://www.aboutyun.com/thread-6576-1-1.html)

[Linux关机各种关机命令总结](http://www.aboutyun.com/thread-6577-1-1.html)


[Linux基础必懂：eth0,eth1,eth2,lo是什么意思？](http://www.aboutyun.com/thread-6372-1-2.html)

此篇文章帮助认识网卡，判断网卡是否启动，对于网络的也算是常识。

------------------------------------------------------------------


[linux中pwd命令详解](http://www.aboutyun.com/thread-6361-1-2.html),
这是了解你所处路径的,起到辅助的作用。


[linux之vi编辑器](http://www.aboutyun.com/thread-6450-1-1.html),此篇文章较为关键，因为经常用到，而且需要熟悉编辑模式,命令模式,如何保存，如何退出等各种操作.


[linux yum命令详解](http://www.aboutyun.com/thread-6574-1-1.html)


[Linux下chkconfig命令详解](http://www.aboutyun.com/thread-6575-1-1.html),熟悉他的作用就是能够查看软件安装是否成功
