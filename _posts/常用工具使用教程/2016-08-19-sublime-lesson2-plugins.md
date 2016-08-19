---
layout: post
title: 介绍Sublime3必备的两款Markdown插件
category: 常用工具使用教程
tags: Markdown "Sublime Text"
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Sublime
description: 
importance: 2
---

> 原文  http://www.jianshu.com/p/335b7d1be39e

最近升级到了 Sublime 3 ，于是又涉及到重新安装我喜欢的插件。作为Markdown 的重度使用者自然关于Markdown的插件是必不可少的 (选择在简书中写文章其中一个很重要的原因是因为简书的MarkDown写作环境很舒服)。 在这里记录分享一下我常用的两款Markdown插件。

**MarkdownEditing**

MarkdownEditing是Markdown写作者必备的插件，它可以不仅可以高亮显示Markdown语法还支持很多编程语言的语法高亮显示。

**OmniMarkupPreviewer**

OmniMarkupPreviewer用来预览markdown 编辑的效果，同样支持渲染代码高亮的样式。

# 步骤1：安装package control #

安装插件之前，我们需要首先安装一个Sublime 中最不可缺少的插件 Package Control , 以后我们安装和管理插件都需要这个插件的帮助。

使用快捷键 " ctrl + ` " 打开Sublime的控制台 ,或者选择 View > Show Console 。

在控制台的命令行输入框，把下面一段代码粘贴进去，回车.就可以完成Pacakge Control 的安装了。

```
import urllib.request,os,hashlib; h = 'eb2297e1a458f27d836c04bb0cbaf282' + 'd0e7a3098092775ccb37ca9d6b2e4b7d'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

# 步骤2：安装插件MarkdownEditing #

Package Control 安装成功后我们就可以使用它方便的管理插件了，首先使用快捷键 'command + shift + p ' 进入到Sublime 命令面板，输入 "package install" 从列表中选择 "install Package" 然后回车。这时候Sublime开始请求远程插件仓库的索引，所以第一次使用可能会有一些小的延时。

看到列表的更新之后输入 "markdown ed" 关键字，选择“MarkdownEditing" 回车。 插件安装完毕后需要重新启动Sublime插件才能生效。下面是我使用sublime编辑代码片断的显示效果。

# 步骤3：使用插件MarkdownEditing #

1. 新建文档，进入命令板，输入ssm，选择“Set Syntax : Markdown ”，即可为当前文档使用Markdown渲染效果。

2. 快捷键：

  - command + option + k 插入链接
  - command + shift + k 插入图片

3. code snippet

  - 输入 "mdi + tab" 会自动插入图片标记
  - 输入 "mdl + tab" 会自动生成链接标记
  - 输入 "mdc + tab" 会自动生成代码块标记
  - 输入 "mdh1+ tab" 会自动生成一级标题标记

# 安装OmniMarkupPreviewer #

同样需要借助Pacakge Control来安装这个插件。键入 "command + shift + p" 进入sublime的命令界面，输入 "package ins" 然后回车 ，键入 "ominmarkup" 选择OmniMarkupPreviewer , 回车。

插件安装成功后我们就可以使用快捷键对编辑的markdown源文件进行预览了。下面是几个常用快捷键.

- Command +Option +O: 在浏览器中预览
- Command+Option+X: 导出HTML
- Ctrl+Alt+C: HTML标记拷贝至剪贴板



