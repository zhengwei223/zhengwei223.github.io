---
layout: post
title: jekyll在windows下的安装和使用
category: 常用工具使用教程
tags: jekyll windows
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 jekyll
description: jekyll在其官方网站上说并不建议在windows操作系统安装，可是我们已经在windows环境下操作比较习惯了，而安装linux或mac的成本又比较高。因此，虽然在windows安装jekyll的流程比较麻烦一些，但是也是能够安装成功的。下面就来讲解如何在windows下安装jekyll，进行一些本地预览等功能。
p_cate: 常用工具使用教程
---

jekyll在其官方网站上说并不建议在windows操作系统安装，可是我们已经在windows环境下操作比较习惯了，而安装linux或mac的成本又比较高。因此，虽然在windows安装jekyll的流程比较麻烦一些，但是也是能够安装成功的。下面就来讲解如何在windows下安装jekyll，进行一些本地预览等功能。

# 安装ruby #

`jekyll`是基于`ruby`的，因此在安装`jekyll`之前得首先要安装`ruby`。

[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)

根据自己的操作系统选择合适的`ruby`版本进行下载安装。开始下载后先不要关闭下载页面，因为一会儿还得下载一个文件。

下载后双击进行安装。安装目录当然是可选的啦，我选择安装在了`D:\Ruby23-x64`的目录下。在安装的过程中，会出现下面的一个界面：

![](http://i.imgur.com/Jda4xXA.png)

记得选择上第二个选项。这个选项的作用是把`ruby`命令添加到`PATH`变量下，使`ruby`命令能够在任何目录下进行使用。

安装完成后，打开cmd窗口或者其他shell窗口，用`ruby -v`测试一下，看看能不能输出ruby的版本号。如果能正确输出版本号，说明安装成功，直接进入到下一个步骤；如果没有输出的话，那么尝试下如下的擦做：把ruby的路径从用户变量添加到系统变量,然后再用ruby -v测试一下。

# 安装Ruby DevKit #

DevKit是windows平台下编译和使用本地C/C++扩展包的工具。它就是用来模拟Linux平台下的`make, gcc, sh`来进行编译。切换到刚才的下载页面，拉到下面，找到“DEVELOPMENT KIT”，然后选择合适的版本进行下载：

![](http://i.imgur.com/UM4cwRC.png)

我选择的是x64版本。把下载的DevKit解压到某个目录，比如 `d:\devkit` , 在该目录中运行如下命令：

	ruby dk.rb init

来生成一个config.xml配置文件，我们需要手工修改这个文件来包含Rubies的路径，如下

	# This
	...
	#
	---
	- D:/Ruby23-x64

然后执行如下命令：

	ruby dk.rb install

# 安装jekyll

终于可以安装jekyll了，是不是很兴奋啊。是不是迫不及待的想要用`gem install jekyll`进行安装了呢。

你高兴的太早了，使用这个命令进行安装时，你会发现，命令行卡住了，一直在等待！

因为某些特殊的原因，我们直接使用rubygems的官方链接会特别特别的慢。不过庆幸的是，国内有rubygem的镜像，先执行这些命令：

	gem sources --add http://gems.ruby-china.org/ --remove https://rubygems.org/  // 删除官方链接,添加国内镜像链接
	gem sources -l                              // 查询是否替换成功
	https://gems.ruby-china.org
	# 确保只有 gems.ruby-china.org

如果已经替换成功，就可以安装jekyll`gem install jekyll`了。在一串的提示命令之完成之后，就可以用`jekyll -v`测试jekyll是否安装成功了，如果能够输出版本号，就说明安装成功了。

# Start Jekyll

Following the commands on official Jekyll Quick-start guide, a new Jekyll blog should be able to be created and browsed at localhost:4000.

	jekyll new myblog
	cd myblog
	jekyll serve

Now browse to [http://localhost:4000](http://localhost:4000)

# 插件

如果使用了插件，记得要用`gem`进行安装。

# 关于中文路径

中文文本内容，jekyll可以很好处理，但是如果文件名带有中文，在编译后的_site目录下的文件名是乱码，解决这个问题需要修改jekyll和webrick的源码：

1. 修改`D:\Ruby23-x64\lib\ruby\gems\2.3.0\gems\jekyll-3.2.1\lib\jekyll\url.rb`（`D:\Ruby23-x64`应改为你的Ruby安装路径），找到

```
def self.escape_path(path)
      URI.escape(path, %r{[^a-zA-Z\d\-._~!$&'()*+,;=:@\/]}).encode("utf-8")
    end

def self.unescape_path(path)
  URI.unescape(path.encode("utf-8"))
end
```

把里面的`utf-8`改为`gb2312`。

2. 修改`D:\Ruby23-x64\lib\ruby\2.3.0\webrick\httpservlet\filehandler.rb`（`D:\Ruby23-x64`应改为你的Ruby安装路径），找到

```
def prevent_directory_traversal(req, res)
    ...
    path = req.path_info.dup.force_encoding(Encoding.find("filesystem"))
	...
```

把`Encoding.find("filesystem")`替换为`"gb2312"`
