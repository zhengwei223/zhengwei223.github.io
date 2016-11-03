---
layout: post
title: 7.免费拥有自己的博客——通过GitHub Pages建立个人站点
category: Bootstrap入门实例教学
tags: boots Bootstrap jekyll gitpages 博客 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 boots Bootstrap jekyll gitpages 博客 
description: 技术人员应当拥有自己的博客，写一些心得，整理一些知识，也是见证自己的技术成长。使用GitHub Pages建立个人站点有几个好处：①熟悉git的使用②在优化博客显示效果时可以实践前端技术特别是本系列的bootstrap技术③有了一个技术积累的园地。本章就来教大家如何获得这些好处！
---

>技术人员应当拥有自己的博客，写一些心得，整理一些知识，也是见证自己的技术成长。使用GitHub Pages建立个人站点有几个好处：①熟悉git的使用②在优化博客显示效果时可以实践前端技术特别是本系列的bootstrap技术③有了一个技术积累的园地。本章就来教大家如何获得这些好处！

# 1 Git简介

Git是一个开源的分布式版本控制系统，用以有效、高速的处理从很小到非常大的项目版本管理。

GitHub可以托管各种git库的站点。

GitHub Pages是免费的静态站点，三个特点：免费托管、自带主题、支持自制页面和Jekyll。

# 2 为什么使用Github Pages

1. 搭建简单而且免费；

2. 支持静态脚本；

3. 可以绑定你的域名；

4. DIY自由发挥，动手实践一些有意思的东西git,markdown,bootstrap,jekyll；

5. 理想写博环境，git+github+markdown+jekyll；

# 3 创建Github Pages

## 3.1 注册账号、新建仓库

打开站点：[https://github.com/](https://github.com/)，注册一个账号；

让我们的账户保持登录状态，点击右上角--用户名--"your profile"，这时出来我们托管过的项目，选中"Repositories"选项卡，下一行看到"New" ，点击新建我们的项目。
**注意，你的仓库名不能随便取，这样会导致github混乱，取名的格式应该为“用户名.github.io”**

![创建仓库](/public/img/boots/gh-pages1.png)

## 3.2 配置仓库、自动生成页面

建完仓库后，在当前页面右边选择Settings，进入设置页面：

![配置仓库](/public/img/boots/gh-pages2.png)

在设置页面往下拉，在github pages那一栏点击“launch automatic page generator”：

![launch](/public/img/boots/gh-pages3.png)

## 3.3 编辑用户界面、模板

编辑你的页面上所展示的信息，如果你就只想有这一面的话，你就可以开始编辑了。

title是页面的标题；tagline是页面宣传词（这么理解吧）；body就是正文了。

可以直接点击“continue to layouts”，选择一个模板，然后点击“Publish page”按钮，你的页面就公布出来了！

## 3.4 预览页面

等待一定时间（10多分钟吧），访问"用户名.github.io"应该能看到上一步自动生成的用户页面。

![博客页面](/public/img/boots/gh-pages4.png)

# 4 准备主题

>现在你已经拥有了自己的博客域名和一个基础页面，但怎么实现更丰富多彩的博客主题并方便地书写博客呢？毕竟每篇博客都去编辑html太麻烦了。

## 4.1 下载安装github

下载属于你的系统的github，并安装

Windows：[https://windows.github.com/](https://windows.github.com/)

Mac： [https://mac.github.com/](https://mac.github.com/)

我之后就用Windows示范了，git的使用教程在这里[git教程](/pages/courses/常用工具使用教程.html)


## 4.2 克隆仓库

使用命令：`git clone https://github.com/用户名/用户名.github.io.git`

## 4.3 选择主题框架

这时候，你就该真正考虑一下你的博客主题风格了，如果你前端开发的功底不好，就不建议频繁更换主题了，虽然要改也不是不行，只是要折腾就是了

到这个网站选择你喜欢的模板
[http://jekyllthemes.org/](http://jekyllthemes.org/)

我就以这套模板为范例来进行教程，因为这个极其精简，可塑性（后期更改性）极强，推荐一下
[http://jekyllthemes.org/themes/cool-concise-high-end/](http://jekyllthemes.org/themes/cool-concise-high-end/)

![cool-concise-high-end](/public/img/boots/gh-pages5.png)


# 5 应用主题

打开存放你克隆下来仓库的文件夹，除了隐藏文件夹“.git”不要删，其余文件全部都删了（没错），然后把下载的模板解压缩后的东西全部拖到你的原博客仓库里：

![cool-concise-high-end](/public/img/boots/gh-pages6.png)

在这个目录下：

- index.html：这是你博客的主页面，里面的内容就是你的主页了
- _config.yml：这是你博客的基本配置文件，里面有你博客的名字，以及存放博主的一些基本信息
- _layouts：这文件夹里面存放你每个页面的设计，一般有default.html（默认页面）和posts.html（博文页面）
- _includes：这个文件夹里的的内容将会通用到你博客每个页面，起到一种便利的作用
- _posts：这里面装的就是你的博文啦，记住，要用markdown语法写，要不上传会失败的。

那么以上就是一个Jekyll规范的博客的基本内容了，想想也不难吧


# 6 上传到github

现在你已经把博客基本配置完成了，那么就该把它上传到github公布吧，执行命令：

    git add .
    git commit -m "写一段注释"
    git push


稍等一会儿，打开你的网站，就会发现你的博客已经神奇的出现了，
比如我的：[https://zhengwei223.github.io/](https://zhengwei223.github.io/)

那么教程到这儿也差不多完了，之后你可以在_posts 文件夹里继续撰写博文，然后上传到github即可。


# 7 本地预览

我们可以在本地启动一个web server来预览博客效果，因为上传到github之后需要一定的时间才能看到新的文章或新的更改，具体操作请参考[jekyll在windows下的安装和使用](/常用工具使用教程/jekyll-windows-install)。

mac等系统上搭建本地jekyll预览环境，请自行解决。


# 8 将博客托管到国内服务器

类似github，国内的[https://coding.net](https://coding.net)也提供页面托管服务，操作和上述步骤类似，读者理解了本文思路之后可自行操作。相比而言，国内站点访问速度会快一些。

# 9 这和bootstrap有什么联系吗？

前8小节和bootstrap没有任何关系，之所以要介绍github托管博客，是希望大家利用boots来设计自己的博客，拥有博客站点的同时又实践了网页前端技术。在简历上写上自己的博客站点，既能展示自己爱好学习和写作的一面，同时这个博客的页面效果就是你前端实力的体现，当然博客本身有梳理知识的能力，真是一举三得啊。

查看博客模板的“\static\js”目录，你会发现这个博客模板使用了boots；进一步你会发现“_includes\head.html”中引用了boots的样式和脚本，而这个页面会被所有的博客页面包含。

找到这些关联、包含关系之后，你可以自行设计`_includes`和`_layouts`目录下的布局母版页和公共页，用上你喜欢的样式、组件、插件以及自定义插件，你可以在这里完全进入一个boots的实验环境。

使用boots的博客是响应式的，这意味着你可以很方便地在手机上欣赏自己的博文并轻松地分享给好友。

最后推荐几个博客给大家参考：

- [http://cyzus.github.io/](http://cyzus.github.io/)
- [http://huangxuan.me](http://huangxuan.me)
- [https://github.com/tsrot/tsrot.github.io](https://github.com/tsrot/tsrot.github.io)
- [https://github.com/Huxpro/huxpro.github.io](https://github.com/Huxpro/huxpro.github.io)
- [https://github.com/wsgzao/wsgzao.github.io](https://github.com/wsgzao/wsgzao.github.io)
- [https://github.com/lay1010/lay1010.github.io](https://github.com/lay1010/lay1010.github.io)
- [JacMan主题及使用说明](https://github.com/zhengwei223/jacman/blob/master/README_zh.md)