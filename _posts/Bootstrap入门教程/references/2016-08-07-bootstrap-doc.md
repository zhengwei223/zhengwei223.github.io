---
layout: post
title: 下载Bootstrap后如何查看其文档
category: boots-references
tags: Bootstrap
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Bootstrap
description:
importance: 2
---

下载bootstrap后并不能在doc目录下直接查看其文档，而是要用jekyll加载整个项目，运行为web项目。

- 安装ruby
- 安装gem
- 安装jekyll

  gem install jekyll
  
- 安装bundler
  
  gem install bundler
  
- 切换到bootstrap目录

  ```
  bundle install
  bundle exec jekyll serve
  ```
  
  访问http://localhost:9001便可查看文档，就像查看网络上的一样