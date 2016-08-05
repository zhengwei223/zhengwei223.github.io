---
layout: post
title: Sublime Text 2 常用插件以及安装方法
category: 常用工具使用教程
tags: Sublime 工具
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Sublime
description: 
importance: 2
---

# 安装Sublime Text 2插件的方法：

- 直接安装

安装Sublime text 2插件很方便，可以直接下载安装包解压缩到Packages目录（菜单->preferences->packages）。

- 使用Package Control组件安装

按Ctrl+`调出console

粘贴以下代码到底部命令行并回车：

```
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
```

重启Sublime Text 2。

如果在Perferences->package settings中看到package control这一项，则安装成功。

用Package Control安装插件的方法：

- 按下Ctrl+Shift+P调出命令面板
- 输入install 调出 Install Package 选项并回车，然后在列表中选中要安装的插件。

# 插件推荐

GBK Encoding Support —— 打开gbk编码的文件不会出现乱码

Zen Coding —— Zen Coding: 一种快速编写HTML/CSS代码的方法

jQuery Package for sublime Text

Sublime Prefixr

JS Format

SublimeLinter

> 一个支持lint语法的插件，可以高亮linter认为有错误的代码行，也支持高亮一些特别的注释，比如“TODO”，这样就可以被快速定位。（IntelliJ IDEA的TODO功能很赞，这个插件虽然比不上，但是也够用了吧）

Sublime Alignment

> 用于代码格式的自动对齐。传说最新版Sublime 已经集成。

Sublime CodeIntel

> 代码自动提示

Bracket Highlighter

> 类似于代码匹配，可以匹配括号，引号等符号内的范围。

Git





