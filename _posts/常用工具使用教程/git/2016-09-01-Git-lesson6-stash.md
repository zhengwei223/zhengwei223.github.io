---
layout: post
title: git stash命令
category: git
tags: Git 工具
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 git
description: 
importance: 2
---

命令：`git stash` 

# 1.描述
1.使用`git stash` 保存当前的工作现场（上次`commit`之后的变化）， 保存之后就可以切换到其他分支进行工作（如果不保存，这些东西在当前分支没有提交，会丢失，因为`checkout <branch>`会同时刷新工作区、索引区和本地仓库），或者在当前分支上完成其他紧急的工作，比如修订一个bug并提交（由于之前的工作已经保存起来，相当于暂时剥离出去了，所以提交别的代码是没有问题的）。 

2.可以使用`git stash list`查看stash队列。 

3.如果在一个分支上想要恢复某一个工作现场怎么办：先用`git stash list`查看stash队列。确定要 恢复哪个工作现场,用`git stash pop stash@{num}`,num 就是你要恢复的工作现场的编号。 

4.如果想要清空stash队列则使用`git stash clear`。 

5.使用`git stash pop`命令是恢复stash队列中的stash@{0}即最上层的那个工作现场。而且使用pop命令恢复的工作现场，其对应的stash 在队列中删除。 
使用`git stash apply stash@{num}`方法 除了不在stash队列删除外和git stash pop 完全一样。 

典型场景：当有紧急工作时，又不想commit现在做一半的工作，就用`git stash`，然后就可以切换到其他分支进行紧急工作。

# 2.实验

```
gitDemo > git init
vi stash.txt    #编辑一行1111
git add stash.txt 
git commit -m "初次提交"
vi stash.txt    #编辑第二行2222
git stash       #剥离上次变化，并保存
cat stash.txt   #查看文件，只有第一行
vi stash.txt    #编辑第三行3333，第二行现在是空的
git add .
git commit -m "编辑第三行"   #stash的东西还在呢！
git stash pop   #恢复stash，但是有个冲突，因为恢复的时候发现这个文件被改动而且提交了
vi stash.txt    #手动修改到你想要的样子
git add stash.txt   #添加到缓存区
git commit -m "具有前三行"   #再提交

vi stash.txt    #编辑第四行4444
git stash       #保存当前状态
vi stash.txt    #编辑第五行555
git stash       #保存当前状态
git stash list  #查看stash列表
  stash@{0}: WIP on master: 1c001b6 具有前三行
  stash@{1}: WIP on master: 1c001b6 具有前三行
  stash@{2}: WIP on master: 8b76378 初次提交
cat stash.txt   #第四行第五行并没有   
git stash apply stash@{0}  #发现第五行回来了
git stash list  #并未删除编号0的stash
git stash apply stash@{1}  #第四行回来了，但是有冲突，需手动解决
git stach clear #清除所有stash
```

多次stash也是可以的，但稍显麻烦，因为pop只会恢复上次commit或者stash后的变化部分，每个stash是独立的，并不是递进的关系。多次stash一个文件，势必要手工合并。

参考原文地址：[http://blog.sina.com.cn/s/blog_682d2aaf01016d9d.html](http://blog.sina.com.cn/s/blog_682d2aaf01016d9d.html)