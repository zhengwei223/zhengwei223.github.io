---
layout: post
title: git分支操作
category: git
tags: Git 工具
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 git
description: 
p_cate: 常用工具使用教程
---


# 0.分支简介

当使用 `git commit` 进行提交操作时，Git 会先计算每一个子目录的校验和，然后在 Git 仓库中这些校验和保存为**树对象**。 随后，Git 便会创建一个提交对象，它除了包含上面提到的那些信息外，还包含指向这个树对象的指针。如此一来，Git 就可以在需要的时候重现此次保存的快照。

![3.1](/public/img/git/3.1.png)

*提交对象及其父对象*

**Git 的分支，其实本质上仅仅是指向提交对象的可变指针。** Git 的默认分支名字是 master。 在多次提交操作之后，你其实已经有一个指向最后那个提交对象的 master 分支。 它会在每次的提交操作中自动向前移动。

<p class="bg-warning">
Git 的“master”分支并不是一个特殊分支。 它就跟其它分支完全没有区别。 之所以几乎每一个仓库都有 `master `分支，是因为 `git init `命令默认创建它，并且大多数人都懒得去改动它。
</p>

# 1.分支创建

Git 是怎么创建新分支的呢？ 很简单，它只是为你创建了一个可以移动的新的指针。 比如，创建一个 testing 分支， 你需要使用 `git branch` 命令：

```
$ git branch [-b] testing
```

这会在当前所在的提交对象上创建一个指针（有个名字叫testing）。

![3.2](/public/img/git/3.2.png)

*两个指向相同提交历史的分支*

那么，Git 又是怎么知道当前在哪一个分支上呢？ 也很简单，它有一个名为 HEAD 的特殊指针。在 Git 中，它是一个指针，指向当前所在的本地分支（译注：将 HEAD 想象为当前分支的别名）。

在本例中，你仍然在 `master` 分支上。 因为 `git branch` 命令仅仅 创建 一个新分支，并不会自动切换到新分支中去，带上`-b`参数会自动切换。

![3.3](/public/img/git/3.3.png)

*HEAD 指向当前所在的分支*

# 2.分支切换

要切换到一个已存在的分支，你需要使用 git checkout 命令。 我们现在切换到新创建的 testing 分支去：

```
$ git checkout testing
```

这样 HEAD 就指向 testing 分支了。

![3.4](/public/img/git/3.4.png)

*HEAD 指向当前所在的分支*

那么，这样的实现方式会给我们带来什么好处呢？ 现在不妨再提交一次：

```
$ vim test.rb
$ git commit -a -m 'made a change'
```

![3.5](/public/img/git/3.5.png)

*HEAD和分支随着提交操作自动向前移动*

如图所示，你的 testing 分支向前移动了，但是 master 分支却没有，它仍然指向运行 git checkout 时所指的对象。 这就有意思了，现在我们切换回 master 分支看看：

```
$ git checkout master
```
![3.6](/public/img/git/3.6.png)

*检出时 HEAD 随之移动*

这条命令做了两件事。 一是使 HEAD 指回 `master` 分支，二是将工作目录恢复成 `master` 分支所指向的快照内容。 也就是说，你现在做修改的话，项目将始于一个较旧的版本。 本质上来讲，这就是忽略 `testing` 分支所做的修改，以便于向另一个方向进行开发。

<p class="text-warning">分支切换会改变你工作目录中的文件</p>
<p class="bg-warning">
在切换分支时，一定要注意你工作目录里的文件会被改变。 如果是切换到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。 如果 Git 不能干净利落地完成这个任务（当前分支上的工作未提交），它将禁止切换分支。


</p>

<p class="bg-warning">
    在你切换分支之前，保持好一个干净的状态。保存进度（stashing，查阅<a class="pjaxlink" href="/git/Git-lesson6-stash">Git-lesson6-stash</a>） 和 修补提交（commit amending，查阅<a class="pjaxlink" href="/git/Git-lesson3-cancel#section0">修复性提交</a>），或者直接提交都是可以的。
</p>

我们不妨再稍微做些修改并提交：

```
$ vim test.rb
$ git commit -a -m 'made other changes'
```

现在，这个项目的提交历史已经产生了分叉。因为刚才你创建了一个新分支，并切换过去进行了一些工作，随后又切换回 master 分支进行了另外一些工作。 上述两次改动针对的是不同分支：你可以在不同分支间不断地来回切换和工作，并在时机成熟时将它们合并起来。 而所有这些工作，你需要的命令只有 `branch`、`checkout` 和 `commit`。

![3.7](/public/img/git/3.7.png)

*项目分叉历史*

 运行 `git log --oneline --decorate --graph --all` ，它会输出你的提交历史、各个分支的指向以及项目的分支分叉情况。

# 3.分支合并

下面用一个典型场景来描述分支的大多数操作：

## 3.1 初始：在master分支工作

首先，我们假设你正在你的项目上工作，并且已经有一些提交。

![3.8](/public/img/git/3.8.png)

## 3.2 分支issue53

master较为稳定，现在，你决定要解决你的公司使用的问题追踪系统中的 #53 问题。 想要新建一个分支并同时切换到那个分支上，你可以运行一个带有 -b 参数的 git checkout 命令：

```
$ git checkout -b iss53
Switched to a new branch "iss53"
```

![3.9](/public/img/git/3.9.png)

你继续在 #53 问题上工作，并且做了一些提交。 在此过程中，iss53 分支在不断的向前推进，因为你已经检出到该分支（也就是说，你的 HEAD 指针指向了 iss53 分支）

```
$ vim index.html
$ git commit -a -m 'added a new footer [issue 53]'
```

![3.10](/public/img/git/3.10.png)

## 3.3 主分支的紧急bug需要立即修复

现在你接到那个电话，有个紧急问题等待你来解决。你需要停下当前对issue53的修复，因为这个问题的解决还需要很长时间，但另一个问题非常紧急。这时我们应该让issue53分支保持干净（保存进度、修复性提交或者提交），然后切换回master分支：

```
git checkout master
```

这个时候，你的工作目录和你在开始 #53 问题之前一模一样，现在你可以专心修复紧急问题了。

## 3.4 合并紧急bug的解决方案至主分支

要修复这个紧急问题。 让我们建立一个针对该紧急问题的分支（hotfix branch），在该分支上工作直到问题解决：

```
$ git checkout -b hotfix  #新建并立即切换
$ vim index.html  #修复问题
$ git commit -a -m 'fixed the broken email address' #提交
 ```

 ![3.11](/public/img/git/3.11.png)

 你可以运行你的测试，确保你的修改是正确的，然后将其合并回你的 master 分支来部署到线上。 你可以使用 git merge 命令来达到上述目的：

```
$ git checkout master  #切换回master分支
$ git merge hotfix      #将hotfix的修改合并到当前master分支
```

在合并的时候，你应该注意到了"快进（`fast-forward`）"这个词。 由于当前 `master `分支所指向的提交是你当前提交（有关 `hotfix` 的提交）的直接上游，所以 Git 只是简单的将指针向前移动。 换句话说，当你试图合并两个分支时，如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候，只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（`fast-forward`）”。

现在，最新的修改已经在 master 分支所指向的提交快照中，我们准备回到`issue53`的修复工作。
然而，你应该先删除 `hotfix` 分支，因为你已经不再需要它了 —— `master` 分支已经指向了同一个位置。 你可以使用带 `-d` 选项的 `git branch` 命令来删除分支：

```
$ git branch -d hotfix
```
## 3.5 继续解决53号

现在我们切换到`issue53`分支继续解决53号问题。

```
$ git checkout iss53  #切换分支
$ vim index.html        #解决问题
$ git commit -a -m 'finished the new footer [issue 53]'  #提交
```

 ![3.12](/public/img/git/3.12.png)

## 3.6 完成issue53+三方合并

假设你已经修正了 #53 问题，并且打算将你的工作合并入 `master` 分支。 为此，你需要合并 `iss53` 分支到 `master` 分支，这和之前你合并 `hotfix` 分支所做的工作差不多。 你只需要检出到你想合并入的分支，然后运行 `git merge` 命令：

```
$ git checkout master
$ git merge iss53
```

这和你之前合并 `hotfix` 分支的时候看起来有一点不一样。 在这种情况下，你的开发历史从一个更早的地方开始分叉开来（`diverged`）。 因为，`master `分支所在提交并不是 `iss53` 分支所在提交的直接祖先，Git 不得不做一些额外的工作。 出现这种情况的时候，Git 会使用两个分支的末端所指的快照（C4 和 C5）以及这两个分支的工作祖先（C2），做一个简单的三方合并。

 ![3.13](/public/img/git/3.13.png)

 *一次典型合并中所用到的三个快照*

 和之间将分支指针向前推进所不同的是，Git 将此次三方合并的结果做了一个新的快照并且自动创建一个新的提交指向它。 这个被称作一次合并提交，它的特别之处在于他有不止一个父提交。

  ![3.14](/public/img/git/3.14.png)

  需要指出的是，Git 会自行决定选取哪一个提交作为最优的共同祖先，并以此作为合并的基础

  既然你的修改已经合并进来了，你已经不再需要 iss53 分支了。 现在你可以在任务追踪系统中关闭此项任务，并删除这个分支——`$ git branch -d iss53`

# 4.遇到冲突时的分支合并

有时候合并操作不会如此顺利。 如果你在两个不同的分支中，对同一个文件的同一个部分进行了不同的修改，Git 就没法干净的合并它们。 如果你对 #53 问题的修改和有关 hotfix 的修改都涉及到同一个文件的同一处，在合并它们的时候就会产生合并冲突：

```
$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

此时 Git 做了合并，但是没有自动地创建一个新的合并提交。 Git 会暂停下来，等待你去解决合并产生的冲突。 你可以在合并冲突后的任意时刻使用 `git status `命令来查看那些因包含合并冲突而处于未合并（unmerged）状态的文件。

```
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")

Unmerged paths:
  (use "git add <file>..." to mark resolution)

    both modified:      index.html

```

可以清晰地看到提示：修复冲突并提交；合并涉及的两个分支都修改了的文件。

 Git 会在有冲突的文件中加入标准的冲突解决标记，这样你可以打开这些包含冲突的文件然后手动解决冲突。 出现冲突的文件会包含一些特殊区段，看起来像下面这个样子：

```
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
 please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
```

这表示 HEAD 所指示的版本（也就是你的 `master` 分支所在的位置，因为你在运行 `merge` 命令的时候已经检出到了这个分支）在这个区段的上半部分（`=======` 的上半部分），而 `iss53 `分支所指示的版本在 `======= `的下半部分。 为了解决冲突，你必须选择使用由 `======= `分割的两部分中的一个，或者你也可以自行合并这些内容。 例如，你可以通过把这段内容换成下面的样子来解决冲突：

```
<div id="footer">
please contact us at email.support@github.com
</div>
```

上述的冲突解决方案仅保留了其中一个分支的修改，并且 `<<<<<<<` ,` =======` , 和 `>>>>>>> `这些行被完全删除了。 在你解决了所有文件里的冲突之后，对每个文件使用 git add 命令来将其标记为冲突已解决。 一旦暂存这些原本有冲突的文件，Git 就会将它们标记为冲突已解决。

# 5.分支管理

git branch #得到当前所有分支的一个列表,* 字符：它代表现在检出的那一个分支
git branch -v #查看每一个分支的最后一次提交
git branch --merged #查看哪些分支已经合并到当前分支
git branch --no-merged #查看所有包含未合并工作的分支


课后阅读[代码合并：Merge、Rebase的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase%E7%9A%84%E9%80%89%E6%8B%A9)
