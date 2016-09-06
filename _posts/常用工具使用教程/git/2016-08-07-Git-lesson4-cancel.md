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

# 0.实验目标

主要掌握`reset`和`checkout`命令的用法。

# 1.实验1.补充暂存并重新提交（修复性提交）

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有` --amend `选项的提交命令尝试重新提交：

`$ git commit --amend `

这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。

如果你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```
$ echo toForget>forgotten_file
$ git commit -m 'initial commit'  #匆忙提交
$ git add forgotten_file          #将未提交的文件暂存
$ git commit --amend              #重新提交，合并至上一次提交
```

最终你只会有一个提交，第二次提交将代替第一次提交的结果。

# 2.实验2.重置某文件在暂存区的快照

## 实验步骤

```
mkdir lesson4
cd lesson4
echo 111>1.txt
git status   # 显示新文件为未跟踪
git add .
git status   # 显示已跟踪但未提交
git reset -- 1.txt
git status   # 显示新文件为未跟踪
cat 1.txt #内容还是111，没变化
```

## 解读

使用 `git reset -- files`等效于`git reset HEAD -- files`取消自上次提交以来的对该文件的所有add，也可以理解为用最后一次提交来重置暂存区。

![2.3](/public/img/git/2.3.svg)

HEAD也可以被替换为历史上的任意`commit_id`，如 `git reset HEAD^1 -- files`用倒数第二次提交历史重置暂存区。**通常我们使用HEAD而不是某个特定的提交。**

## 小结

`reset`带上文件路径并不会对工作区的文件造成任何影响，影响的只是暂存区。

# 3.实验3.重置某文件在工作区的修改

## 实验步骤

```
git add 1.txt       #暂存快照
git checkout -- 1.txt     #checkout
cat 1.txt           #并未变化
  111
vi 1.txt            #新增一行，但不add
  111
  222
git checkout -- 1.txt     #checkout
cat 1.txt           #文件回到上次add的状态了
  111
```

还有一种用法是，带上commit_id作为参数：

```
git commit -a -m "1次提交1.txt"
vi 1.txt 
  111
  222
git add 1.txt   #暂存快照
git checkout HEAD -- 1.txt #用最后一次提交恢复1.txt
cat 1.txt       #第二行不见了    
   111

```

## 解读&小结

`git checkout -- files` 用**暂存区**重置**工作区**，用来丢弃本地修改，即上次add以来对文件的任何修改都会丢失。

![4.3](/public/img/git/4.3.png)

带上HEAD或者历史commit_id，用**提交历史来重置工作区**，即便add了，只要没提交，都会丢失。

![4.4](/public/img/git/4.4.png)

<p class="bg-warning">
你需要知道 `git checkout [commit_id] [--] file` 是一个危险的命令， 你对那个文件做的任何修改都会消失 - 你只是拷贝了另一个文件来覆盖它。 
</p>

# 4.实验3.用reset回到历史


## 实验步骤

```
vi 1.txt 
  111
  222
git commit -a -m "2次提交1.txt，增加第二行"
vi 1.txt 
  111
  222
  333
git commit -a -m "3次提交1.txt，增加第三行"
git log --pretty=format:'%Cred%h%Creset - %s %C(bold blue)<%an>%Creset' -n 20 --abbrev-commit
  03c8f41 - 3次提交1.txt，增加第三行 <ZhengWei>
  5b7b8ba - 2次提交1.txt，增加第二行 <ZhengWei>
  111dee4 - 1次提交1.txt <ZhengWei> 
  ...
```

现在对于1.txt我们提交了三次，每次增加一行，我们想回退到第一次提交，执行以下命令：

```
git reset 111dee4  
cat 1.txt
  111
  222
  333
```

奇怪的是文件内容并未变化。但执行`git log`会发现只有`111dee4 - 1次提交1.txt`。如果想回退一个版本并让工作区一同变化，做下列尝试：

```
git commit -a -m "提交：恢复为三行"
git log --pretty=format:'%Cred%h%Creset - %s %C(bold blue)<%an>%Creset' -n 20 --abbrev-commit
  e15d73e - 提交：恢复为三行 <ZhengWei>
  111dee4 - 1次提交1.txt <ZhengWei>

# 对于1.txt有两次提交

git reset HEAD^1 --hard #HEAD^1是倒数第二次提交
  HEAD is now at 111dee4 1次提交1.txt
cat 1.txt
  111  
```

工作区也回到了上上次提交的状态。

## 解读

`reset`不带文件路径而是带上提交历史id，意味着**当前分支指针连同HEAD指针**指向历史上的一个提交(分支和HEAD同时移动）。这可以用来移除当前分支的一些提交。

第一次，我们回退了两个历史版本，dev分支末端的两个提交变成了悬挂提交。也就是说，下次Git执行垃圾回收(`git gc --auto`)的时候，这两个提交会被删除。

![4.1](/public/img/git/4.1.png)

**但这一切都限于仓库区和暂存区**，工作区内容不会有任何变化，通过`add`和`commit`我们可以立即取消这次`reset`带来的影响。

如果我们需要工作区也一同变化，需要带上`--hard`选项：

- `--soft` – 丢弃提交，但缓存区和工作目录都不会被改变，你可以再次提交就能恢复。
- `--mixed` – 默认选项。丢弃提交，但工作目录不受影响，你可以再次add并提交。
- `--hard` – 丢弃提交，缓存区和工作目录都同步到你指定的提交。

把这些标记想成定义`git reset`操作的作用域就容易理解多了。

![2.6](/public/img/git/2.6.svg)

## 小结

`reset`**往往以HEAD作为参数**一起使用。这样比较安全，因为最后一次提交过的内容不会丢失，不带`--hard`选项就更安全了，工作区的内容也不会丢失，你可以发起`add`和`commit`来提交。

如果你的提交还没有共享给别人，`git reset`是撤销这些提交的简单方法。当你开发一个功能的时候发现『糟糕，我做了什么？我应该重新来过！』时，`reset`就像是`go-to`命令一样。
如果不是用HEAD而是其他commit_id，要格外小心，因为reset操作会重写当前分支的历史，在公共分支上这样做可能会引起严重的后果。

# 5.实验4.用checkout回看历史

## 实验步骤

`checkout`用于提交层面，它会将HEAD指针移动到某个历史提交节点上（分支指针并不会改变，HEAD和分支分离了）。比如，下面这个命令会`checkout`到当前提交的祖父提交。

```
git checkout HEAD~2
  You are in 'detached HEAD' state...  
```

![4.2](/public/img/git/4.2.png)

*checkout将HEAD移动到任意提交*

这对于快速查看项目旧版本来说非常有用。

但这会造成**HEAD分离**。`checkout`到某个历史提交，就处于“分离HEAD”状态。可以看看现在的文件内容（lesson4都不见了）。

## 解读checkout

为了搞清楚`checkout commit_id`我们执行下面的命令：

```
git branch -a
* (HEAD detached at 40bb69d)
  dev
  master
  remotes/origin/dev
  remotes/origin/master
```

可以看到HEAD停留在一个名为`40bb69d`的临时分支上（我们并未创建这样一个分支）。这是因为`checkout commit_id`的含义是“检出”某个历史版本，用于查看历史版本或者以此历史版本为父对象新建分支，它并不像**reset那样用于丢弃提交历史**。

有兴趣的话，可以根据提示在此处建立一个真正的分支：`git checkout -b devfromhis`，这样我们会得到一个基于历史版本的分支，虽然这通常没有什么用。

### 再次回到dev分支

```
git checkout dev
```

我们曾经回到历史，但现在又回来了。

## 小结

`reset`用于回到历史，`checkout`用于回看历史（还可以回到现在）。

# 6.revert

`git revert` 也是撤销命令，区别在于`reset`HEAD和分支指针原地不动或者历史方向移动，`git revert`是创建一个commit来覆盖当前的commit，指针向后移动。


# 7.总结

- `commit --amend` 用于合并两次提交
- 文件层面的撤销操作——`reset`和`checkout`命令都带有文件路径作为参数
- `reset`带文件路径，是丢弃缓存，这是安全的，你可以随时add重新跟踪文件
- `checkout`带文件路径，是放弃修改，可以将文件恢复到上次add的状态或者某次提交的状态（带上提交id）
- `reset`带`commit_id`而非文件路径，是丢弃提交，回到历史，是否影响到暂存区和工作区取决于选项
- `checkout`带`commit_id`而非文件路径也是回到历史，但回看的意味更浓，在历史节点上可以建立新分支
- `revert`用一个新提交来撤销某次提交所带来的变化，分支会向前推进，不会回到历史
- `checkout`用法小结：

```
git checkout . #用本地仓库恢复我们的工作区为最后一次提交的状态
git checkout branch-name #切换分支
git checkout -b branch-name #新建并立即切换到新分支
git checkout -- file  #用暂存区重置工作区
git checkout commit_id -- file  #用仓库区重置工作区
git checkout commit_id   #回到某个历史版本
```
- reset和checkout在文件层面的区别 
  - reset重置暂存区
  - checkout重置工作区
- reset和checkout在提交层面的区别 
  - reset可以丢弃提交，穿越到历史并改变历史
  - checkout只是暂时穿越到历史，并不可以改变历史
