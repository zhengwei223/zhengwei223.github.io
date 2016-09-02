---
layout: post
title: git撤销操作
category: git
tags: Git 工具
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 git
description: 
p_cate: 常用工具使用教程
---

>在任何一个阶段，你都有可能想要撤消某些操作。


# 1.补充暂存并重新提交（修复性提交）

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有` --amend `选项的提交命令尝试重新提交：

`$ git commit --amend `

这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。

例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```
$ git commit -m 'initial commit'  #匆忙提交
$ git add forgotten_file          #将未提交的文件暂存
$ git commit --amend              #重新提交，合并至上一次提交
```

最终你只会有一个提交，第二次提交将代替第一次提交的结果。

# 2.文件层面的操作

`reset`和`checkout`的意义多变，取决于使用什么参数和选项。

文件层面的操作——`reset`和`checkout`命令都带有文件路径作为参数。

## 2.1 取消暂存

使用 `git reset -- files`等效于`git reset HEAD -- files`取消自上次提交以来的对该文件的所有add，也可以理解为用最后一次提交来重置暂存区。

![2.3](/public/img/git/2.3.svg)

HEAD也可以被替换为历史上的任意`commit_id`，如 `git reset HEAD^1 -- files`用倒数第二次提交历史重置暂存区。**通常我们使用HEAD而不是某个特定的提交。**

## 2.2 取消修改（工作区）

`git checkout -- files` 用**暂存区**重置**工作区**，用来丢弃本地修改，即上次add以来对文件的任何修改都会丢失。

```
vi ck.txt #111
git add ck.txt #暂存
vi ck.txt #111 222
git checkout -- ck.txt  #取消上次add后对文档的修改
cat ck.txt  #111
```

通常我们会带上HEAD或者历史commit_id，用提交历史来重置工作区，即便add了，只要没提交，都会丢失——
`git checkout HEAD filepath`

![2.4](/public/img/git/2.4.svg)

```
git commit     
vi ck.txt   #111  222
git add .  
vi ck.txt   #111  222 333
git add .
git checkout HEAD ck.txt  #上次commit文档内容为111
cat ck.txt
```


<p class="bg-warning">
你需要知道 `git checkout [commit_id] [--] file` 是一个危险的命令， 你对那个文件做的任何修改都会消失 - 你只是拷贝了另一个文件来覆盖它。 
</p>

# 3.提交层面的操作

## 3.1 Reset


在提交层面上，`reset`当前分支指针连同HEAD指针指向历史上的一个提交(分支和HEAD同时移动）。这可以用来移除当前分支的一些提交。比如，下面这两条命令让hotfix分支向后回退了两个提交。

```
git checkout hotfix
git reset HEAD~2
```

hotfix分支末端的两个提交现在变成了悬挂提交。也就是说，下次Git执行垃圾回收(`git gc --auto`)的时候，这两个提交会被删除。换句话说，如果你想**扔掉这两个提交**，你可以这么做。`reset`操作如下图所示：

![2.5](/public/img/git/2.5.svg)

如果你的提交还没有共享给别人，`git reset`是撤销这些提交的简单方法。当你开发一个功能的时候发现『糟糕，我做了什么？我应该重新来过！』时，`reset`就像是`go-to`命令一样。

你还可以通过传入这些标记来修改你的缓存区或工作目录：

- `--soft` – 丢弃提交，但缓存区和工作目录都不会被改变，你可以再次提交就能恢复。
- `--mixed` – 默认选项。丢弃提交，但工作目录不受影响，你可以再次add并提交。
- `--hard` – 丢弃提交，缓存区和工作目录都同步到你指定的提交。

把这些标记想成定义git reset操作的作用域就容易理解多了。

![2.6](/public/img/git/2.6.svg)

这些标记**往往以HEAD作为参数**一起使用。这样比较安全，因为最后一次提交过的内容不会丢失，不带`--hard`选项就更安全了，工作区的内容也不会丢失，你可以发起`add`和`commit`来提交。

如果不是用HEAD而是其他commit_id，要格外小心，因为reset操作会重写当前分支的历史，在公共分支上这样做可能会引起严重的后果。

## 3.2 revert

git revert 也是撤销命令，区别在于reset是指向原地或者向前移动指针，git revert是创建一个commit来覆盖当前的commit，指针向后移动。

## 3.3 checkout

`checkout`用于提交层面，它会将HEAD指针移动到某个历史提交节点上（分支指针并不会改变，HEAD和分支分离了）。比如，下面这个命令会`checkout`到当前提交的祖父提交。

```
git checkout HEAD~2
```

![2.7](/public/img/git/2.7.svg)

*checkout将HEAD移动到任意提交*

这对于快速查看项目旧版本来说非常有用。

但这会造成**HEAD分离**。你会得到如下提示：

```
git checkout 1c001b6313a83b48e8debbb30ff6f1ba3ca63394
Note: checking out '1c001b6313a83b48e8debbb30ff6f1ba3ca63394'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at 1c001b6...
```

`checkout`到某个历史提交，就处于“分离HEAD”状态。可以看看现在的文件内容，做一些尝试性的改变并且提交，然后通过再一次的`checkout`来丢弃在这个状态下的所有提交，这并不会影响任何的分支（包括当前分支）。

如果想保留这些提交，应该带上`-b`参数创建一个新的分支——`git checkout -b <new-branch-name>。

我们可以做一些试验，在这种状态下新增文件并提交，你会发现你并不在任何分支下

![2.8](/public/img/git/2.8.png)

我们好像在一个临时的分支上，如果这时我们通过`checkout master`或别的分支名就可以将HEAD指针指向目标分支，这时你还有机会保存刚才那个临时分支

```
git checkout master
Warning: you are leaving 1 commit behind, not connected to
any of your branches:

  34ec202 commit after checkout cid

If you want to keep it by creating a new branch, this may be a good time
to do so with:

 git branch <new-branch-name> 34ec202

Switched to branch 'master'
➜  gitDemo git:(master) 
```

# 4.小结

- `commit --amend` 用于合并两次提交
- `reset`带文件路径，是丢弃缓存，这是安全的，你可以随时add重新跟踪文件
- `checkout`带文件路径，是放弃修改，可以将文件恢复到上次add的状态或者某次提交的状态
- `reset`带`commit_id`，是丢弃提交（`commit_id`为最新时不丢弃提交），是否影响到暂存区和工作区取决于选项
- `revert`用一个新提交来撤销某次提交所带来的变化

