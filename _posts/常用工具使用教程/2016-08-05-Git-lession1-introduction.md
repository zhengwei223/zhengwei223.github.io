---
layout: post
title: Git入门
category: 常用工具使用教程
tags: Git 工具
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 git
description: 
importance: 2
---

本文主要内容摘自liyanrui.m2@gmail.com的《Git 使用指南》和Git Community Book 中文版。

# 一、前言 #

   Git 是一个快速、可扩展的分布式版本控制系统，它具有极为丰富的命令集，对内部系统提供了高级操作和完全访问.Git与你熟悉的大部分版本控制系统的差别是很大的。也许你熟悉Subversion、CVS、Perforce、Mercurial 等等，他们使用“增量文件系统” （Delta Storage systems）, 就是说它们存储每次提交(commit)之间的差异。Git正好与之相反，它会把你的每次提交的文件的全部内容（snapshot）都会记录下来。

  理论上，Git 可以保存任何文档，但是最善于保存文本文档，因为它本来就是为解决软件源代码（也是一种文本文档）版本管理问题而开发的，提供了许多有助于文本分析的工具。对于非文本文档，Git 只是简单地为其进行备份并实施版本管理。

# 二、安装 #

各平台版本都可以从[这里](https://git-scm.com/downloads)下载，并根据提示进行安装，windows下的安装非常简单。

# 三、Git 配置(git config) #

使用Git的第一件事就是设置你的名字和email,这些就是你在提交commit时的签名。

    $ git config --global user.name "Robin Hu"

    $ git config --global user.email "hudashi@gmail.com"

执行了上面的命令后,会在你的主目录(home directory)建立一个叫~/.gitconfig 的文件. 内容一般像下面这样:

    [user]
    name = Robin Hu
    email = hudashi@gmail.com


> 译者注:这样的设置是全局设置,会影响此用户建立的每个项目.

如果你想使项目里的某个值与前面的全局设置有区别(例如把私人邮箱地址改为工作邮箱);你可以在项目中使用 `git  config `命令不带--global 选项来设置. 这会在你项目目录下的.git/config 文件增加一节[user]内容(如上所示).

git默认的编辑器是GNU nano这样的编辑器，我可以通过如下的命令把它设置为vim编辑器


    git config --global core.editor vim


# 四、初始化一个新的项目仓库（git init） #

我们可以通过git init命令初始化一个项目仓库。

例如，进入project目录，执行

	$ git init

Git会输出:
> Initialized empty Git repository in .git/

如果你仔细观查会发现project目录下会有一个名叫”.git” 的目录被创建，这意味着一个仓库被初始化了。

上述操作的结果是在project 目录下创建了一个.git 隐藏目录，它就是所谓的Git 仓库，不过现在它还是空的。

另外project 目录也不再是普通的文档目录了，今后我们将其称为工作树。每个工作树又包含着一个Git仓库。只要我们拥有git仓库，那么就可以很容易地生成工作树。

下面我们将把工作树中的一些文档存储至Git 仓库中。由于Git 在向仓库中添加文档时并非是简单地文档复制过去，势必要将所添加文档进行一番处理，生成Git 仓库所能接受的数据格式，Git 称这个过程为"take a snapshot（" 生成快照）。若将工作树下所有文档（包含子目录）生成快照，可采用以下命令：

    $ git add .

这里的.表示当前目录。
 ` git add`命令所生成的快照被存放到一个临时的存储区域，Git 称该区域为索引。使用git commit 命令可将索引提交至仓库中，这个过程称为提交，每一次提交都意味着版本在进行一次更新。git-commit 最简单的用法如下：

    $ git commit

执行上述git-commit 命令时，Git 会自动调用系统默认的文本编辑器，要求你输入版本更新说明并保存。请记住，输入简约的版本更新说明是非常有必要的，它就像剧本一样，可以帮助你快速回忆起对项目的重大改动。

对于简短的版本更新信息，可以使用`git commit `的“-m”选项，如下：


    $ git commit -m "你的版本更新信息"

上述过程即为建立Git 仓库的一般过程.

在通过git add 命令生成文档内容快照时，工作树中有一些文档是你不希望接受Git 管理的，譬如程序编译时生成的中间文件，对于这样的文件如何避免为之生成快照？为解决此类问题，Git 提供了文档忽略机制，可以将工作树中你不希望接受Git 管理的文档信息写到同一目录下的.gitignore 文件中。比如对于project目录下的out目录，可以采用如下操作可将其排除到git管理之外.

    $ cd project
    $ echo "out" > .gitignore

这样，以后使用git add 命令生成文档内容快照时，git就会忽略调out目录。

# 五、克隆一个项目仓库(git clone) #

为了得一个项目的拷贝(copy),我们需要知道这个项目仓库的地址(Git URL). Git能在许多协议下使用，所以Git URL可能以ssh://, http(s)://, git://,或是只是以一个用户名（git 会认为这是一个ssh 地址）为前辍. 

有些仓库可以通过不只一种协议来访问，例如，Git本身的源代码你既可以用 git:// 协议来访问：

    git clone git://git.kernel.org/pub/scm/git/git.git

也可以通过http 协议来访问:

    git clone http://www.kernel.org/pub/scm/git/git.git

git://协议较为快速和有效,但是有时必须使用http协议,比如你公司的防火墙阻止了你的非http访问请求.如果你执行了上面两行命令中的任意一个,你会看到一个新目录: 'git',它包含有所的Git源代码和历史记录.

在默认情况下，Git会把"Git URL"里最后一级目录名的'.git'的后辍去掉,做为新克隆(clone)项目的目录名: (例如. `git clone http://git.kernel.org/linux/kernel/git/torvalds/linux-2.6.git` 会建立一个目录叫'linux-2.6')

另外，如果访问一个Git URL需要用户名和密码，可以在Git URL前加上用户名，并在它们之间加上@符合以表示分割，然后执行git clone命令，git会提示你输入密码。

示例


    git clone robin.hu@http://www.kernel.org/pub/scm/git/git.git

这样将以作为robin.hu用户名访问http://www.kernel.org/pub/scm/git/git.git，然后按回车键执行git clone命令，git会提示你输入密码。

# 六、基本操作 #

在工作树中，我们日常所进行的工作无非是对Git 仓库所管理的文档进行修改，或者添加／删除一些文件。这些操作与采用Git 管理我们的文档之前没有任何差异，只是在你认为一个工作阶段完成之时，要记得通知Git，命令它记下你所进行更新，这一步骤是通过生成文档快照并将其加入到索引中来实现的。

### 记录更新（git add）

譬如今天，我向项目的工作树 目录（下文将用bash变量$WORK表示）添加了一份新文档ch1.tex ，我需要通知Git 记住我的这一更新：

    $ cd $WORK
    $ git add ch1.tex

这样，Git 就会将有关ch1.tex 的更新添加到索引中。然后我又对其它文档进行了一些修改，譬如修改了doc-env.tex 以及git-tutor.tex 文件，继续使用git-add 命令将它们的更新添加到索引中：

    $ git add doc-env.tex git-tutor.tex

可能时间久，你对工作树中的许多文档都进行了更新（文档添加、修改、删除），但是我忘记了它们的名字，此时若将所做的全部更新添加到索引中，比较轻省的做法就是：

    $ git add .

git add .命令除了能够判断出当前目录（包括其子目录）所有被修改或者已删除的文档，还能判断用户所添加的新文档，并将其信息追加到索引中。

我们可以通过git reset HEAD <path>...将path对应的文件从索引库中剔除，但是path对应的文件内容本身不受此影响。

比如

    $ git add 1.txt
    $ git reset HEAD 1.txt
    Unstaged changes after reset:

### 提交更新（git commit）

晚上，这一天的工作告以段落，我觉得有必要将今天.所做的提交到仓库中，于是执行git commit命令，将索引内容添加到仓库中。

    git commit  -m "提交的描述信息"

如果我们这里不用-m参数的话，git将调到一个文本编译器（通常是vim）来让你输入提交的描述信息
可能一天下来，你对工作树中的许多文档都进行了更新（文档添加、修改、删除），但是我忘记了它们的名字，此时若将所做的全部更新添加到索引中，比较轻省的做法就是：

    git commit -a -m "提交的描述信息"

git commit 命令的-a 选项可只将所有被修改或者已删除的且已经被git管理的文档提交倒仓库中。如果只是修改或者删除了已被Git 管理的文档，是没必要使用git add 命令的。

git add .命令除了能够判断出当前目录（包括其子目录）所有被修改或者已删除的文档，还能判断用户所添加的新文档，并将其信息追加到索引中。

另外，要注意的问题是，Git 不会主动记录你对文档进行的更新，除非你对它发号施令（比如通过git add命令）。

### 查看文件的状态（git status）

git status命令可以列出当前目录所有还没有被git管理的文件和被git管理且被修改但还未提交(git commit)的文件.。

### 移除文件(git rm)

在git中我们可以通过git rm命令把一个文件删除，并把它从git的仓库管理系统中移除。但是注意最后要执行git commit才真正提交到git仓库

    git rm 1.txt #删除1.txt文件，并把它从git的仓库管理系统中移除。

	git rm -r myFolder #删除文件夹myFolder，并把它从git的仓库管理系统中移除。

下列代码：在通过 git add 10.txt 命令把文件10.txt添加到索引库中后，又通过 git rm --cached 10.txt 把文件10.txt从git的索引库中移除,但是对文件10.txt本身并不进行任何操作。

    $ git add 10.txt
    $ git rm --cached 10.txt
    rm '10.txt'
    $ ls
    10.txt  2  3.txt  5.txt  readme.txt

### 推送本地更新到服务器（git push）

我们可以通过git push把本地仓库的更新推到服务器仓库。

### 拉服务器更新拉到本地（git pull）

我们可以通过git pull命令把服务器仓库的更新拉到本地仓库中。

# 七、分支
前所讲内容未有提及项目分支问题，但事实上是有一个分支存在的，那就是master 分支（主分支），该分支是由Git 自动产生的。在此之前，我们针对项目版本的各种操作都是在主分支上进行的，只是我们未察觉它的存在而已。

## 1、分支的创建 ##

Git 可以轻松地产生新的项目分支，譬如下面操作可添加一个名曰“local”的新的项目分支：

    $ git branch local

对于新产生的local 分支，初始时是完全等同于主分支的。但是，在local 分支所进行的所有版本更新工作都不影响主分支，这意味着作为项目的参与者，可以在local 中开始各种各样的更新尝试。

## 2、查看分支 ##

查看项目仓库中存在多少分支，可直接使用git-branch 命令，譬如使用该命令查看项目分支列表：

    $ git branch
    local
    * master
    
在上述操作输出结果中，若分支名之前存在* 符号，表示此分支为当前分支。其实Git 各分支不存在尊卑之别，只存在哪个分支是当前分支的区别。为了某种良好的秩序，很多人默认是将master 分支视为主分支，本文也将沿用这一潜在规则。

## 3、分支的切换 ##

由上述操作输出的分支列表可以看出，虽然使用git-branch 命令产生了local 分支，但是Git 不会自动将当前分支切换到local 下。可使用git-checkout 命令实现分支切换，下面操作将当前分支切换为前文所产生的local 分支：

## $ git checkout local ##

## 4 分支的合并 ##

我们产生了local 分支，并在该分支下进行了诸多修改与数次的版本更新提交，但是该如何将这一分支的最终状态提交到master 分支中呢？

git-merge 命令可实现两个分支的合并。譬如我们将local 分支与master 分支合并，操作如下：

	$ git checkout master # 将当前分支切换为master
	$ git merge local # 将local分支与当前分支合并

当一个分支检查无误并且与master 分支成功合并完毕后，那么这一分支基本上就没有存在的必要性了，可以删除掉：

	$ git branch -d local

注意：git-branch 的-d 选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想不问青红皂白地删除一个分支，可以使用git-branch 的-D 选项。

另外我们还可以通过git rebase来实现分支的合并。

# 八、撤销

我们可以使用git reset或git checkout或git revert来撤销我们的修改。

### 撤销未提交的修改(git reset)
如果你现在的工作目录(work tree)里搞的一团乱麻, 但是你现在还没有把它们提交; 你可以通过下面的命令, 让工作目录回到上次提交时的状态(last committed state):

    $ git reset --hard HEAD

你这条件命令会把你所以工作目录中所有未提交的内容清空(当然这不包括未置于版控制下的文件 untracked files). 从另一种角度来说, 这会让"git diff" 和"git diff --cached"命令的显示法都变为空.如果你只是要恢复一个文件,如"hello.rb", 你就要使用git checkout


    $ git checkout -- hello.rb

这条命令把hello.rb从HEAD中签出并且把它恢复成未修改时的样子.

如果你想要恢复当前目录所有修改的文件,你可以使用

    $ git checkout .

这条命令把 当前目录所有修改的文件 从HEAD中签出并且把它恢复成未修改时的样子.

### 撤销已提交的修改
如果你已经做了一个提交(commit),但是你马上后悔了, 这里有两种截然不同的方法去处理这个问题:

1. 创建一个新的提交(commit), 在新的提交里撤消老的提交所作的修改. 这种作法在你已经把代码发布(git push)到服务器的情况下十分正确.

2. 你也可以去修改你的老提交(old commit). 但是如果你已经把代码发布(git push)到了服务器,那么千万别这么做; git不会处理项目的历史会改变的情况,如果一个分支的历史被改变了那以后就不能正常的合并.

#### 创建新提交来撤销前期提交的修改
创建一个新的提交来撤消(revert)前期某个提交(commit)的修改是很容易的; 只要把你想撤销修改的某个提交(commit)的名字(reference)做为参数传给命令: git revert就可以了; 下面这条命令就演示了如何撤消最近的一个提交:
    
    $ git revert HEAD

这样就创建了一个撤消了上次提交(HEAD)修改的新提交, 你就有机会来修改新提交(new commit)里的提交注释信息.

你也可撤消更早期的修改, 下面这条命令就是撤消“上上次”(next-to-last)的提交:


    $ git revert HEAD^

撤销某个commit的提交


    $git revert 4ab494a0bf5c5b09267a01ec03b587731d3034b4

这样就创建了一个撤消提交4ab494a0bf5c5b09267a01ec03b587731d3034b4修改的新提交,
在执行git revert 时,git尝试去撤消老提交的修改,如果你最近的修改和要撤消的修改有重叠(overlap),那么就会被求手工解决冲突(conflicts),　就像解决合并(merge)时出现的冲突一样.

另外， git revert 其实不会直接创建一个提交(commit), 把撤消扣的文件内容放到索引(index)里,你需要再执行git commit命令，它们才会成为真正的提交(commit).

#### 撤销旧提交但不保留修改

如果你刚刚做了一个或多个提交(commit), 但是你又想撤销这些提交，而且不保留这些提交的修改和文件系统中的修改，可以使用`git reset --hard`来达到该目的。

git revert 是撤销某次操作，此次操作之前的commit都会被保留

git reset 是撤销某次提交，但是此次之后的修改都会被退回到暂存区

#### 撤销旧提交但保留修改

如果你刚刚做了一个或多个提交(commit), 但是你又想撤销这些提交，但是仍然在文件系统中保留这些修改，然后做修改或不做修改再次提交的话，可以使用`git reset --mixed`或`git reset --soft`来达到该目的。


#### 追加提交来修改提交
如果你刚刚做了某个提交(commit), 但是你这里又想来马上修改这个提交; git commit 现在支持一个叫`--amend`的参数，你能让修改刚才的这个提交(HEAD commit). 这项机制能让你在代码发布前,添加一些新的文件或是修改你的提交注释(commit message).

另外、如果你在老提交(older commit)里发现一个错误, 但是现在还没有发布(git push)到代码服务器上. 你可以使用git rebase命令的交互模式, "git rebase -i"会提示你在编辑中做相关的修改. 这样其实就是让你在rebase的过程来修改提交.

# 九、版本的回退

我们可以使用git checkout来实现版本的回退，即回退到某个commit或tag

示例1
回退到到branch_a的版本5731ea5cf1c544337648ffb79e6dfb5fc17fead7

    $git checkout branch_a
    $git checkout 5731ea5cf1c544337648ffb79e6dfb5fc17fead7

然后你就完成了回退，看到那你想看到的东西，编译那你想编译的版本

# 十、继续阅读

[Git常用命令速查表](./Git-cmd.html)

