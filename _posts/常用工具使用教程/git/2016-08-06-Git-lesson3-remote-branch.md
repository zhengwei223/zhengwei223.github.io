---
layout: post
title: 远程分支
category: git
tags: Git 工具
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 git
description: 
p_cate: 常用工具使用教程
---

# 0.了解远程分支

**远程分支也是一个指针，它也在本地，但只读，你不能移动,当你做任何网络通信操作时，它们会自动移动。它们以 (remote)/(branch) 形式命名**

```shell
git branch -a
---
* dev
  master
  remotes/origin/master
```

上述结果表明我们在dev分支上，本地还存在master分支和一个远程分支`origin/master`，origin是远程仓库名，master是分支名。

只查看远程分支用`git branch -r`

# 1.试验1.推送master分支以更新远程仓库

本地分支和远程分支有一种关系叫做跟踪，建立了跟踪关系的本地分支可以叫做*跟踪分支*。

当克隆一个仓库时，它通常会自动地创建一个跟踪 `origin/master` 的 `master` 分支。一开始是这样的：

 ![2.11](/public/img/git/2.11.png)

在master上我们做了很多工作：

```shell
git branch -vv
---
* dev    4e644ee ...
  master 6fa8f5f [origin/master: ahead 6] ...
```

通过`-vv`选项我们看到dev并未跟踪一个远程分支，而`master`跟踪了`origin/master`而且比远程分支多6次提交（相对于上次提交）。情况就变成了这样：

![2.12](/public/img/git/2.12.png)

现在`master`分支前进了6个版本，而`origin/master`还留在原地。现在我们需要进行一次推送，和远程仓库通信并让`origin/master`分支前进到`master`分支所在位置：

```shell
git checkout master
git push
```

# 2.推送新分支

有一种场景：我们在本地建立了一个新分支如dev，现在我们想分享到远程仓库，以便协作者也能获取到这个分支，怎么做？先尝试：

```shell
git checkout dev
git push
---
fatal: The current branch dev has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin dev
```

根据提示，我们应该执行这样的命令：

```shell
git push --set-upstream origin dev
---
Total 0 (delta 0), reused 0 (delta 0)
To https://git.coding.net/lanqiao/gitdemo.git
 * [new branch]      dev -> dev
Branch dev set up to track remote branch dev from origin.
```

这行命令不仅进行了推送，还自动将本地`dev`分支跟踪远程`dev`分支。

```shell
git b -vv
---
* dev    4e644ee [origin/dev] dev change test1
  master 6fa8f5f [origin/master] 合并dev
```

可以看到`dev`和`origin/dev`同步了。

# 3.clone会获得远程仓库中的所有分支

需要指出的是，`clone`命令将会获得远程仓库的所有分支的所有提交历史，在此基础上，你可以查看分支并随意进行切换，而且所有本地分支都自动是跟踪分支。

```shell
gitdemo git:(dev) cd ../
mkdir gitdemo2
cd gitdemo2
git clone https://git.coding.net/lanqiao/gitdemo.git
cd gitdemo 
git branch -a
---
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/dev
  remotes/origin/master
```

我们回到上层目录并新建子目录`gitdemo2`，在`gitdemo2`下克隆`gitdemo`，你会发现我们默认在`master`分支上，可以列出所有本地和远程的分支，然后进行切换。

```shell
git checkout dev
---
Branch dev set up to track remote branch dev from origin.
Switched to a new branch 'dev'

git branch -vv
* dev    4e644ee [origin/dev] dev change test1
  master 6fa8f5f [origin/master] 合并dev
```

# 4.获取远程库中新增的分支

现在我们在`gitdemo2/gitdemo`下新增并推送一个分支：

```shell
git checkout -b test #新建分支
git push --set-upstream origin test  #推送并建立跟踪
```

这样远程仓库中就有了三个分支，但是我们之前的工作区`gitdemo`本地还没有新增的`test`分支，这时我们不可能再次`clone`，我们可以这样做：

```shell
cd ../../gitdemo  #回到原来工作区
git branch -a     #还没有test分支
git fetch origin  #下载所有分支并更新远程分支 
---
From https://git.coding.net/lanqiao/gitdemo
 * [new branch]      test       -> origin/test

git branch -r  #发现三个远程分支
---
  origin/dev
  origin/master
  origin/test

git checkout test  #切换并自动建立追踪
---
Branch test set up to track remote branch test from origin.
Switched to a new branch 'test'  
```

要注意的一点是当抓取到新的远程跟踪分支时(`git fetch origin`)，本地不会自动生成一份可编辑的副本（拷贝）。 换一句话说，这种情况下，不会有一个新的 `test` 分支 - 只有一个不可以修改的 `origin/test` 指针，随后的`checkout`才会建立本地可编辑分支并自动跟踪。

# 5.删除远程分支

假设你已经通过远程分支做完所有的工作了 - 也就是说你和你的协作者已经完成了一个特性并且将其合并到了远程仓库的 `master `分支（或任何其他稳定代码分支）。 可以运行带有 `--delete` 选项的 `git push `命令来删除一个远程分支。 如果想要从服务器上删除 `test` 分支，运行下面的命令：

```shell
git branch -vv
---
dev    4e644ee [origin/dev] dev change test1
  master 6fa8f5f [origin/master] 合并dev
* test   4e644ee [origin/test] dev change test1


git push origin --delete test
---
git push origin --delete test
To https://git.coding.net/lanqiao/gitdemo.git
 - [deleted]         test

git branch -a  #远程分支没有了，但本地分支还在
---                     
  dev
  master
* test
  remotes/origin/dev
  remotes/origin/master

```

需要注意的是，删除远程分支并不会删除本地分支，删除本地分支应该用`git branch -d branch-name`

# 6.获取远程仓库的变化

我们已经知道push可以把本地的变化推送到远程仓库，如果远程仓库先于我们本地发生了更新，我们怎么及时获取这些更新呢？

## pull与fetch、merge

`git fetch origin`可拉取所有远程内容，但只更新仓库区，我们会获得一些只读的远程分支，还需合并（`git merge`）才能将远程分支合并到本地分支（可以将远程分支想象为一个特殊的本地分支，这样可以利用上一章的概念来思考）。一个典型的工作流程是：

```shell
git fetch [origin]   #如果只拉取当前分支，可省略远程仓库名
git checkout dev
git merge
```

我们还可以使用`git pull` ，它的含义是一个 `git fetch` 紧接着一个 `git merge` 命令。如果有一个像之前章节中演示的设置好的跟踪分支，不管它是显式地设置还是通过 `clone` 或 `checkout` 命令为你创建的，`git pull `都会查找当前分支所跟踪的服务器与分支，从服务器上抓取数据然后尝试合并入那个远程分支。

由于 `git pull` 的魔法经常令人困惑所以通常单独显式地使用 `fetch` 与 `merge` 命令会更好一些。

## 拉取-合并中的冲突

由于我们把远程分支想象成一个特殊的本地分支，所以合并远程分支与合并另一个分支没什么区别，在`merge`和`pull`的过程中，如果远程分支与本地分支分别修改了相同的文件，就会出现冲突，而解决办法和上一章讲的方案是一样的。

# 7.总结（面试题）

Q：远程分支和本地分支有什么关系？

A：略。

---

Q：如何建立跟踪关系？

A：通常我们使用自动跟踪，本地分支推送到远程仓库后，本地分支和远程分支自动跟踪；拉取远程仓库所有分支后，再`checkout`到某个分支可以自动建立跟踪。当然也有手工对应的，但通常没这个必要

---

Q：如何推送新分支？

A：`git push --set-upstream origin dev`

---

Q：如何推送已跟踪的分支？

A：`git push `

---

Q：如何获取远程仓库所有分支

A：`git fetch origin`

---

Q：已跟踪的分支如何获取远程仓库最新变化？

A：`git fetch`，`git merge`或者直接用`git pull`

---
