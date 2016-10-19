---
layout: post
title: 在分支上工作
category: git
tags: Git 工具
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 git
description: 
p_cate: 常用工具使用教程
---

# 0.我们已经分支上工作

之前的练习中我们并没有提到分支，但事实上我们一定在某个分支上工作——`master`分支，这是git特性决定的。关于这一点，我们可以在gitdemo目录下执行`git branch`命令来查看，会得到这样的结果:

```
* master
```

这个命令列出现存本地分支，并以星号（`*`）高亮当前所在的分支。

- `git branch -r`列出远程分支
- `git branch -a`列出远程分支和本地分支

Git 的`master`分支并不是一个特殊分支。 它就跟其它分支完全没有区别。之所以几乎每一个仓库都有 master 分支，是因为`git init`命令默认创建它，并且大多数人都懒得去改动它。

# 1.我们需要在分支上工作

>几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。 

通常，master分支作为稳定分支，和线上发布版同步，不适合频繁更改。我们会建立多个开发分支，在开发分支上开发、测试，直到认为新功能或旧功能改造完全完成，再往主分支上合并。整个过程就像一条河流，有多个支流，每个支流都各自向前推进，某些地方他么又并入主干，然后在下面的某个地方有分叉开来，但最终汇入大海。

# 2.创建一个开发分支

现在我们决定暂时不在主分支上工作，我们可以在本地新建一个测试者分支：

```shell
git branch testing   # 新建分支
```

现在，你仍然在 `master` 分支上。 因为 `git branch` 命令仅仅创建 一个新分支，并不会自动切换到新分支中去。

*此处你学会了：新建分支*

# 3.分支切换

要切换到一个已存在的分支，你需要使用`git checkout`命令。还记得上一章的`git checkout .`命令吗？它用最后一次提交重置工作区，使工作区的文件和最后一次提交时保持一致。当checkout命令带上一个分支名字时，它的含义是**切换分支**。我们现在切换到新创建的`testing`分支去：

```shell
$ git checkout testing  # 切换分支
$ git branch            # 查看分支
  * testing
  master
$ ll  #查看目录结构
```

查看目录结构我们发现和切换前一模一样，这是因为**新建分支并不是建立一个完全无关的空目录，事实上只是在此处开叉了**，也不是大家想象的新分支是旧分支的一份拷贝，究竟机制如何，在介绍完下个命令后，我们再解释。

快速切换回上个分支：`git checkout -`，练习执行两次又会回到当前分支。

`git checkout -b testing`可新建并立即切换分支。

*现在你学会了如何在分支之间切换*

# 4.插播：分支的机制

**Git 的分支，其实本质上仅仅是指向提交对象的可变指针。**

**创建分支**，git只是为你创建了一个可以移动的新的指针，指针的名字就是分支的名字，你可以这样认为**分支就是指针**。

创建一个`testing`分支,这会在当前所在的提交对象上创建一个指针（名字叫`testing`）。

![3.2](/public/img/git/3.2.png)

*两个指向相同提交历史的分支*

**切换分支**又做了什么呢？首先，什么叫当前分支？很简单，它有一个名为`HEAD`的特殊指针。在 Git 中，它是一个指针，指向当前所在的本地分支。

切换分支之前，示意图是这样的：

![3.3](/public/img/git/3.3.png)

*HEAD指向当前所在的分支*

切换分支后，**`HEAD`就指向`testing`了，`testing`指向最后一次提交。**

*现在你知道了HEAD和分支都是指针了。*

# 5.在新分支上工作并提交

我们已经成功切换到testing分支，现在我们可以在testing分支上做一些自己的开发任务，而不用担心影响主分支。

```shell
$ mkdir lesson2  # 新建目录
$ cd lesson2     # 切换目录 
$ echo testsomething>test.rb  # 新建文件并导入简单内容
$ cd ..
$ git add .      # 跟踪
$ git commit -m 'dev上第一次提交test.rb'  # 提交
```

我们说过，每个分支都可以独立地向前推进，现在的示意图是这个样子：

![3.5](/public/img/git/3.5.png)

*HEAD和分支随着提交操作自动向前移动*

如图所示，你的 `testing` 分支向前移动了，但是 `master` 分支却没有，它仍然指向运行 `git checkout` 时所指的对象。 这就有意思了，现在我们切换回 `master` 分支看看：

```
$ git checkout master  # 切换分支
```
![3.6](/public/img/git/3.6.png)

*检出时 HEAD 随之移动*

这条命令做了两件事。 一是使 HEAD 指回 `master` 分支，二是将工作目录恢复成 `master` 分支所指向的快照内容。 

# 6.让分支各自发展

## 实验步骤

我们已经回到`master`分支，通过查看目录，`lesson2`下并没有`test.rb`这个文件，我们停留在一个相对较旧的版本上。

作为试验，我们在master上也做一些改动：

```shell
$ mkdir lesson2  # 建立文件夹
$ cd lesson2 
$ echo testsomething>test1.rb  #不同的文件名
$ cd ..
$ git add .      # 追踪
$ git commit -m 'master上新建test1.rb'  # 提交
```

现在，这个项目的提交历史已经产生了分叉。因为刚才你创建了一个新分支，并切换过去进行了一些工作，随后又切换回 master 分支进行了另外一些工作。 上述两次改动针对的是不同分支：你可以在不同分支间不断地来回切换和工作，并在时机成熟时将它们合并起来。 

![3.7](/public/img/git/3.7.png)

*项目分叉历史*

 运行 `git log --oneline --decorate --graph --all` ，它会输出你的提交历史、各个分支的指向以及项目的分支分叉情况。

### 小贴士

这个命令太长，我们可以在git配置中设置别名：

```shell
git config --global alias.ll 'log --oneline --decorate --graph --all --abbrev-commit -n 20'
```

以后你执行`git ll`就可以得到一样的效果了。

 ![2.9](/public/img/git/2.9.png)

 可以清晰地看到，我们在`0f52632 (origin/master) 首次提交3.txt`处分叉，testing提交了一次`61a659c (testing) dev上第一次提交test.rb`，master上也提交了一次`ca74ba1 (HEAD -> master) master上新建test1.rb`。

## 注意事项

<p class="text-warning">分支切换会改变你工作目录中的文件</p>
<p class="bg-warning">
在切换分支时，一定要注意你工作目录里的文件会被改变。 如果是切换到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。 如果 Git 不能干净利落地完成这个任务（当前分支上的工作未提交），它将禁止切换分支。
</p>

<p class="bg-warning">
    在你切换分支之前，保持好一个干净的状态。保存进度（stashing，查阅<a class="pjaxlink" href="/git/Git-lesson6-stash">Git-lesson6-stash</a>） 和 修补提交（commit amending，查阅<a class="pjaxlink" href="/git/Git-lesson4-cancel#section0">修复性提交</a>），或者直接提交都是可以的。
</p>

*现在你已经学会如何在不同分支上独立工作了*

# 7.分支合并

## 实验步骤

现在我们在主分支，我们认为`testing`上的改变很重要，现在希望`master`上拥有这些变化，这么做

```shell
$ git branch             # 确认当前分支
$ git merge testing      # 将testing的修改合并到当前master分支
---
Merge made by the 'recursive' strategy.
 lesson2/test.rb | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 lesson2/test.rb
```

合并会产生新的提交，因此，git弹出文本编辑器要求你记录下这次合并的日志。

## 合并类型

我们看到了`recursive`合并策略，还有一种是"快进（`fast-forward`）"。 如果当前 `master `分支所指向的提交是目标合并分支的的直接上游，Git只需简单的将指针（HEAD和分支）向前移动。 换句话说，当你试图合并两个分支时，如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候，只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（`fast-forward`）”。

*现在你已经学会如何合并分支了*

# 8.删除分支

现在，最新的修改已经在 master 分支，我们可以删除 `testing` 分支，因为你已经不再需要它了 —— `master` 分支已经指向了同一个位置。 你可以使用带 `-d` 选项的 `git branch` 命令来删除分支：

```shell
$ git branch -d testing   # 删除分支
```

# 9.解决分支合并冲突

有时候合并操作不会如此顺利。 如果你在两个不同的分支中，对同一个文件的同一个部分进行了不同的修改，Git就没法干净的合并它们。 

```shell
git checkout -b dev #新建并切换分支
vi test1.rb         #编辑test1.rb，在第二行输入"dev中新增一行"
git add .  
git commit -m "dev change test1"
git checkout master
vi test1.rb         #编辑test1.rb，在第二行输入"master新增一行"
git add .  
git commit -m "master change test1"
```

现在分支都各自前进了一次提交，我们来尝试合并：

```shell
 git merge dev
 ---
Auto-merging lesson2/test1.rb
CONFLICT (content): Merge conflict in lesson2/test1.rb
Automatic merge failed; fix conflicts and then commit the result.
```

此时 Git 做了合并，但是没有自动地创建一个新的合并提交。 Git 会暂停下来，等待你去解决合并产生的冲突。明显，`lesson2/test1.rb `是有冲突的文件，自动合并失败，需要我们手工解决冲突然后再提交。

你可以在合并冲突后的任意时刻使用 `git status `命令来查看那些因包含合并冲突而处于未合并（`unmerged`）状态的文件。

```shell
git status
On branch master
...
You have unmerged paths.
  (fix conflicts and run "git commit")
...
Unmerged paths:
  (use "git add <file>..." to mark resolution)

    both modified:   test1.rb
```

Git 会在有冲突的文件中加入**标准的冲突解决标记**，这样你可以打开这些包含冲突的文件然后手动解决冲突。 出现冲突的文件会包含一些**特殊区段**，看起来像下面这个样子：

```shell
testsomething
<<<<<<< HEAD
master新增一行
=======
dev中新增一行
>>>>>>> dev
```

`=======`将内容分为两部分，`<<<<<<< HEAD`和分割线中间的部分表示`HEAD`所指的版本（也就是你的 `master` 分支所在的位置，因为你在运行 `merge` 命令的时候已经检出到了这个分支），而分割线和`>>>>>>> dev`中间的部分是dev分支的版本。

为了解决冲突，你必须选择使用由 `======= `分割的两部分中的一个，或者你也可以自行合并这些内容。 例如，你可以通过把这段内容换成下面的样子来解决冲突：

```shell
testsomething
master新增一行
dev中新增一行
```

上述的冲突解决方案保留两个分支的修改，并且 `<<<<<<<` ,` =======` , 和 `>>>>>>> `这些行被完全删除了。在你解决了所有文件里的冲突之后，对每个文件使用 git add 命令来将其标记为冲突已解决，然后提交。

```shell
git add .
git commit -m "合并dev"
```

现在我们执行`git ll`可以看到：

 ![2.10](/public/img/git/2.10.png)

# 10.总结（面试题）

Q：clone一个远程仓库之后，我们默认在哪个分支上工作？

A：master

---

Q：创建分支的两种形式

A：`git branch branch-name`或者`git checkout -b branch-name`

---

Q：如何进行分支切换？切换时需要主要什么？

A：`git checkout branch-name`可以切换分支，切换之前应注意当前分支是干净的（工作已暂存或者已提交）

---

Q：如何合并分支？如何解决冲突？

A：`git merge branch-name`可以将目标分支合并到当前分支。如果目标分支是当前分支的直接后代，将进行快进合并；否则进行三方合并，三方合并在两个分支都修改了相同文件的情况下会发生冲突，需要手工解决冲突并提交。

---

Q：如何删除分支？

A：`git branch -d/-D branch-name`可以删除分支。

---

请熟知查看分支信息的各种命令。

# 11.课后练习

- 新建分支`mytest`并在该分支上提交若干次
- 回到原有分支将`mytest`合并到当前分支
- 删除`mytest`分支
- 新建分支`mydev`并在该分支上提交若干次
- 回到原有分支，新建和`mydev`分支一样的文件并修改-提交
- 尝试合并`mydev`分支，并解决冲突
- 删除`mydev`分支



