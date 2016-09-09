---
layout: post
title: 命令行速成(windows-powershell)
category: cmd
tags: cmd 工具
author: 王晨宇【译】
keywords: lanqiao 蓝桥 培训 教程 cmd
description: 
importance: 2
---

该附件是指导如何使用命令行的超级快速课程，该课程计划在1-2天内快速完成，但不会对内核高级编程使用进行指导。

# 1.简介

该附件是教会你如何使用命令行让你的电脑完成任务的速成课。作为一种速成课，它的详细程度和涉及范围不及我的其它著作。它只是用来使你像一个真正的程序员一样操作电脑。当你完成该附件内容，你将学会大多数用户每天都会使用的核心命令。你会了解目录的基本知识和一些其他概念。

我要给你的唯一的建议是：少说话，多敲代码。

为我的失礼表示歉意，但你不得不这样做，如果你对于命令行有一种莫名的恐惧，唯一消除这种恐惧的方式就是少讲多练。

如果你想学习代码，那么你必须学会这个，编程语言是用一种先进的方式来控制你的计算机的。命令行则是编程语言的小弟，学习命令行就是教你用语言来控制计算机，一旦你学会了，那么你就可以继续写代码了，这感觉像是你自己拥有了一块金子。

# 2.如何使用本教程

最好的方式是这样做：

- 准备好一个小小的笔记本和一支笔。
- 开始学习本教程并认真做每一个练习。
- 当你有不理解的内容时，记在你的笔记本上，留下一点写答案的空间。
- 在你做完一个练习后，通过你的笔记本，复习你所学到的知识。
- 尝试通过网络搜索，并询问可能知道答案的朋友来回答你的问题。
- 如果发电邮给我help@learncodethehardway.org，我也可以帮助你。

只要你坚持做完这些练习，写下你的问题，然后回头再去解答你没有理解的问题，当你完成的时候，你所掌握的命令行会有很大的提高。

# 3.你会记住的东西

我提前警告你，我要让你记住的东西，马上把它记住，这是让你最快学会的方法，但是对某些人来说，记忆是痛苦的。无论如何，记忆是学习知识的重要技能，所以请克服你的恐惧吧。

下面是你如何记住这些知识：

- 反复的告诉自己这样做，不要试图找到窍门或简单的方法，只是坐下来，这样做。
- 写你想要记住的一些索引卡，把你需要学习的一半放在一边，然后另一半放在另一边。
- 每天大约15-30分钟，训练自己在索引卡上回忆每一个知识点。
- 在你睡觉前，拿出你的卡，大约5分钟后，再去睡觉。

还有其他技术，你可以在一张纸上写你需要学习的内容，然后贴在你的淋浴墙上。当你洗澡的时候，就可以看看它们，刷新你的记忆。

如果你每天都这样做，你应该能够记住大部分的事情，我告诉你，记忆在一个星期到一个月。一旦你这样做了，所有的一切都变得更加容易，这是记忆的目的。这不是教你抽象的概念，而是为了巩固基础知识，它们是非常容易的，一旦你记住了这些基础知识，将更有利于你学习先进的抽象概念。


# 4.练习一：安装

在本教程中，你将被指导做三件事：

- 在你的内核中做一些事情
- 实践中学，多练习
- 做更多额外的练习

对于这个第一次练习，先打开你的终端并确认它开始工作

- 启动你的内核，快速进入并知道它已经开始工作
- 在Windows系统中使用PowerShell，人们使用一个叫做cmd.exe的程序，但它不是PowerShell，如果你使用的是win7及更高版本，这样做：
  - 单击开始
  - 在“搜索程序和文件”中输入：powershell
  - 敲回车

如果你没有使用Win7，你真的应该考虑升级，如果你仍然坚持不升级，那么你可以尝试从微软下载中心下载并安装。或者上网搜索“PowerShell downloads”，寻找合适你的Windows版本，因为我没有Windows XP，但希望PowerShell的体验是一样的。

# 5.练习二：路径，文件夹，目录

在这个练习中你将学会如何打印你的工作目录使用`pwd`命令

这样做

```
PS C:\Users\zed> pwd
Path
----
C:\Users\zed
PS C:\Users\zed>
```

你掌握了这些内容：

你学会了`pwd`命令，这意味着“打印工作目录”，目录是什么？这是一个文件夹，文件和目录是同一样东西，他们可以互换使用，当你以图形化界面查找文件，你使用的就是文件夹，这些文件夹完全和目录一样。

# 6.练习三：找不到路径

当你经过这些指示，你可能会找不到路径。你可能不知道你在哪里，或者一个文件是什么，不知道如何继续。为了解决这个问题，我要教你一些命令。

当你找不到路径的时候。你应该使用`pwd`命令打印你的当前目录。

下一件事是你需要有一种方法可以回到安全的地方，你的家。需要使用`cd ~`命令

这意味着如果你在任何时候找不到路径了，都可以使用`pwd`和`cd ~`命令，第一个命令`pwd`告诉你在哪，第二个命令`cd ~`让你回家，你可以试试。

现在明白你在哪，并且使用`pwd`和`cd ~`命令回家，这将使你一直在正确的地方。

你掌握了这些内容：

当你找不到路径的时候，如何回家

# 7.练习四：创建目录

在本练习中你将学习如何使用`mkdir`命令创建一个新的文件夹（目录）

这样做

记住！首先你需要回家！在开始本节练习前，依次使用`pwd`和`cd~`命令。在本课程中，所有的练习前都应该先回家。

```
> pwd
> cd ~
> mkdir temp
    Directory: C:\Users\zed
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:02 AM            temp
> mkdir temp/stuff
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:02 AM            stuff
> mkdir temp/stuff/things
    Directory: C:\Users\zed\temp\stuff
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            things
> mkdir temp/stuff/things/orange/apple/pear/grape
    Directory: C:\Users\zed\temp\stuff\things\orange\apple\pear
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            grape
>
```

这是唯一一次我列出了`pwd`和`cd ~`命令，每一次他们都在练习，一直在做。

你掌握了这些内容：

现在我们已经掌握不止一个命令了，有很多不同的方式来运行`mkdir`，什么是`mkdir`？它可以创建新的文件夹，为什么你要问这个？你应该把命令记在你的卡片上并且记住它们，如果你还是不知道`mkdir`是创建文件夹，继续努力。

做一个目录是什么意思？你可以叫它文件夹，它们是一回事，上面所做的事情就是在文件夹中创建文件夹，这就是“路径”，它是一种方式，它是一组方向的计算机上的地方，你想把它放在树上的文件夹。

# 8.练习五：切换目录

在本练习中你将学习如何使用cd命令切换目录

这样做

```
> cd temp
> pwd
Path
----
C:\Users\zed\temp
> cd stuff
> pwd
Path
----
C:\Users\zed\temp\stuff
> cd things
> pwd
Path
----
C:\Users\zed\temp\stuff\things
> cd orange
> pwd
Path
----
C:\Users\zed\temp\stuff\things\orange
> cd apple
> pwd
Path
----
C:\Users\zed\temp\stuff\things\orange\apple
> cd pear
> pwd
Path
----
C:\Users\zed\temp\stuff\things\orange\apple\pear
> cd grape
> pwd
Path
----
C:\Users\zed\temp\stuff\things\orange\apple\pear\grape
> cd ..
> cd ..
> cd ..
> pwd
Path
----
C:\Users\zed\temp\stuff\things\orange
> cd ../..
> pwd
Path
----
C:\Users\zed\temp\stuff
> cd ..
> cd ..
> cd temp/stuff/things/orange/apple/pear/grape
> cd ../../../../../../../
> pwd
Path
----
C:\Users\zed
```

你掌握了这些内容：

你在上个练习中创建了这些文件夹，现在你只是使用`cd`命令在它们中相互切换，在上面的这部分代码中，我也使用了`pwd`命令来确认我当前所在的位置。

# 9.练习六：目录列表

在本练习中，你将学习如何使用`ls`命令列出文件夹。

这样做

在开始之前确认你使用`cd`命令退回到上面的临时文件夹，如果你不知道你在哪，可以使用`pwd`命令在标记并且移动过去。

```
> cd temp
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            stuff
> cd stuff
> ls
    Directory: C:\Users\zed\temp\stuff
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            things
> cd things
> ls
    Directory: C:\Users\zed\temp\stuff\things
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            orange
> cd orange
> ls
    Directory: C:\Users\zed\temp\stuff\things\orange
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            apple
> cd apple
> ls
    Directory: C:\Users\zed\temp\stuff\things\orange\apple
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            pear
> cd pear
> ls
    Directory: C:\Users\zed\temp\stuff\things\orange\apple\pear
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            grape
> cd grape
> ls
> cd ..
> ls
    Directory: C:\Users\zed\temp\stuff\things\orange\apple\pear
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            grape
> cd ..
> ls
    Directory: C:\Users\zed\temp\stuff\things\orange\apple
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            pear
> cd ../../..
> ls
    Directory: C:\Users\zed\temp\stuff
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            things
> cd ..
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            stuff
>
```

你掌握了这些内容：

`ls`命令可以列出当前目录下所有的文件夹，你可以使用`cd`命令切换到不同的文件夹并且列出其中内容。
`ls`命令还有很多选项，稍后将学习如何使用`help`命令获取帮助

# 10.练习七：删除目录

在本练习中你将学习如果删除一个空的文件夹

这样做

```
> cd temp
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:03 AM            stuff
> cd stuff/things/orange/apple/pear/grape/
> cd ..
> rmdir grape
> cd ..
> rmdir pear
> cd ..
> rmdir apple
> cd ..
> rmdir orange
> cd ..
> ls
    Directory: C:\Users\zed\temp\stuff
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:14 AM            things
> rmdir things
> cd ..
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/17/2011   9:14 AM            stuff
> rmdir stuff
> pwd
Path
----
C:\Users\zed\temp
> cd ..
```

你掌握了这些内容：

我现在将这些命令综合在一起使用，每次你出现错误的时候可能是你马虎所致，如果你能找到很多错误，你今天可以休息一下，明天再试一试。

在这个例子中，你将学习如何删除一个文件夹，非常简单，你只需要跟着上面的案例做，替换`rmdir <dir>`中的`<dir>`为你要删除的文件夹名即可。

# 11.练习八：来回切换目录

在本练习中，你将学习如何使用`pushd`命令保存当前目录路径并切换到一个新的目录，然后使用`popd`命令返回之前保存的目录

这样做

```
> cd temp
> mkdir -p i/like/icecream
    Directory: C:\Users\zed\temp\i\like
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/20/2011  11:05 AM            icecream
> pushd i/like/icecream
> popd
> pwd
Path
----
C:\Users\zed\temp
> pushd i/like
> pwd
Path
----
C:\Users\zed\temp\i\like
> pushd icecream
> pwd
Path
----
C:\Users\zed\temp\i\like\icecream       
> popd
> pwd
Path
----
C:\Users\zed\temp\i\like
> popd
```

你掌握了这些内容：

这些命令是你进入程序员的领域，我要告诉你它们是如此方便，这些命令让你可以暂时去一个不同的目录，然后再回来，很容易在两个目录之间切换。

`pushd`命令保存了当前目录的地址，然后切换到另一个目录中去。
`popd`命令返回到上一个`pushd`命令保存目录的地址。

# 12.练习九：创建空文件

在本练习中，你将学习如何使用`new-item`命令创建一个空文件

```
> cd temp
> New-Item iamcool.txt -type file
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---        12/17/2011   9:03 AM            iamcool.txt
```

你掌握了这些内容：

你学习了如何创建一个空文件，除了创建空文件，我不用它做任何事情。

# 13.练习十：复制文件

在本练习中你将学习如何使用`cp`命令来复制一个文件

```
> cd temp
> cp iamcool.txt neat.txt
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
> cp neat.txt awesome.txt
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---        12/22/2011   4:49 PM          0 awesome.txt
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
> cp awesome.txt thefourthfile.txt
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---        12/22/2011   4:49 PM          0 awesome.txt
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
-a---        12/22/2011   4:49 PM          0 thefourthfile.txt
> mkdir something
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            something
> cp awesome.txt something/
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            something
-a---        12/22/2011   4:49 PM          0 awesome.txt
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
-a---        12/22/2011   4:49 PM          0 thefourthfile.txt
> ls something
    Directory: C:\Users\zed\temp\something
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---        12/22/2011   4:49 PM          0 awesome.txt
> cp -recurse something newplace
> ls newplace
    Directory: C:\Users\zed\temp\newplace
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---        12/22/2011   4:49 PM          0 awesome.txt
```

你掌握了这些内容：

现在你会复制文件了，复制一个新文件很简单，在上面的练习中我也创建了一个新的文件夹并复制了一个新文件到该文件夹中。

我要告诉你一个关于程序员和系统管理员的秘密。他们是懒惰的。我也懒。我的朋友也懒。这就是为什么我们使用电脑的原因。我们喜欢让电脑为我们做些无聊的事情。在练习中，到目前为止，你一直在输入重复的无聊的命令，以便你可以学习他们，但通常是不像这样。通常，如果你发现自己在做一些无聊和重复的事情，有可能是一个程序员想出了如何使它更容易。你只是不知道。

关于程序员的另一件事是，他们并没有你想象的那么聪明。如果你想多是什么类型，那么你可能会得到它错了。相反，尝试想象一个命令的名称是给你并尝试它。机会是，它是一个名称或一些类似于你认为它是什么。如果你仍然无法直观地理解它，然后在网上四处询问和搜索。希望这不是真的笨的像robocopy......

# 14.练习十一：移动文件

在本练习中，你将学习如何使用`mv`命令把一个文件从一个文件夹中移动到另一个文件夹中。

这样做

```
> cd temp
> mv awesome.txt uncool.txt
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            newplace
d----        12/22/2011   4:52 PM            something
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
-a---        12/22/2011   4:49 PM          0 thefourthfile.txt
-a---        12/22/2011   4:49 PM          0 uncool.txt
> mv newplace oldplace
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            oldplace
d----        12/22/2011   4:52 PM            something
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
-a---        12/22/2011   4:49 PM          0 thefourthfile.txt
-a---        12/22/2011   4:49 PM          0 uncool.txt
> mv oldplace newplace
> ls newplace
    Directory: C:\Users\zed\temp\newplace
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---        12/22/2011   4:49 PM          0 awesome.txt
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            newplace
d----        12/22/2011   4:52 PM            something
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
-a---        12/22/2011   4:49 PM          0 thefourthfile.txt
-a---        12/22/2011   4:49 PM          0 uncool.txt
```


你掌握了这些内容：

移动文件，甚至对他们重命名，非常简单，只需写出以前的名字和新名字。

# 15.练习十二：查看文件

做这个练习之前你需要先用学过的命令做一些准备工作，你将需要一个记事本文件，你可以这样做：
打开一个新的记事本并且敲些内容

把文件保存在你的桌面上并且命名为`test.txt`，在你的`shell`中使用复制文件命令将文件复制到你曾经工作过的`temp`文件夹

先完成以上的准备工作，在完成本练习：

这样做

```
> more test.txt
[displays file here]
```

你掌握了这些内容：

这是一种非常有用的查看文件内容的方法，如果该文件有很多行，它将分页显示。

# 16.练习十三：流文件

使用同上一练习同一个记事本程序创建一个新的文件命名为`test2.txt`，但是这次将直接保存至`temp`文件夹

这样做

```
> more test2.txt
[displays file here]
> cat test2.txt
I am a fun guy.
Don't you know why?
Because I make poems,
that make babies cry.
> cat test.txt
Hi there this is cool.
```

你掌握了这些内容：

你喜欢我的诗吗？完全要赢得一个诺贝尔。无论如何，你已经知道了第一个命令，我只是让你检查你的文件是有。然后`cat`命令使文件显示到屏幕上。此命令显示出整个文件到屏幕上没有分页或停止。

# 17.练习十四：删除文件

在本练习中，你将学习如何使用rm命令删除一个文件

这样做

```
> cd temp
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            newplace
d----        12/22/2011   4:52 PM            something
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
-a---        12/22/2011   4:49 PM          0 thefourthfile.txt
-a---        12/22/2011   4:49 PM          0 uncool.txt
> rm uncool.txt
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            newplace
d----        12/22/2011   4:52 PM            something
-a---        12/22/2011   4:49 PM          0 iamcool.txt
-a---        12/22/2011   4:49 PM          0 neat.txt
-a---        12/22/2011   4:49 PM          0 thefourthfile.txt
> rm iamcool.txt
> rm neat.txt
> rm thefourthfile.txt
> ls
    Directory: C:\Users\zed\temp
Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d----        12/22/2011   4:52 PM            newplace
d----        12/22/2011   4:52 PM            something
> cp -r something newplace
> rm something/awesome.txt
> rmdir something
> rm -r newplace
> ls
```

你掌握了这些内容：

我们在最后一个练习里将文件都删除了，记得当我让你在这目录中删除吗？嗯，失败，因为你不能删除一个目录中的文件。要这样做，您必须删除该文件，或递归地删除其所有内容。这就是你在结束时所做的。

# 18.练习十五：退出

这样做

```
> exit
```

你掌握了这些内容

你最后的练习是退出PowerShell，再次声明它真的很简单，但我要你多多练习。
