---
layout: post
title: 开发环境及webpack-dev-server的使用
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack 多页面 多入口
description: 本篇主要介绍：如何自动构建入口文件，并生成对应的output；公共js库如何单独打包。多入口文件，自动扫描入口。同时支持SPA和多页面型的项目公共js库如何单独打包。
---

# 1.开发环境

当项目逐渐变大，webpack 的编译时间会变长，可以通过参数让编译的输出内容带有进度和颜色。

    $ webpack --progress --colors

如果不想每次修改模块后都重新编译，那么可以启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快的。

    $ webpack --progress --colors --watch

# 2.webpack-dev-server

使用 `webpack-dev-server` 开发服务是一个更好的选择。它将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开 http://localhost:8080/ 或 http://localhost:8080/webpack-dev-server/ 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。

    # 安装
    $ npm install webpack-dev-server -g

    # 运行
    $ webpack-dev-server --progress --colors --config <配置文件>

# 3.npm简化命令

webpack和webpack-dev-server命令都可能带一堆参数，我们可以修改package.json文件来定制命令：

    {
      "name": "font-advance",
      "version": "1.0.0",
      "description": "前端那些事儿的配套源码",
      "main": "webpack.config.js",
      "scripts": {
        "dev"   : "webpack-dev-server --config webpack.config-plugins.js --devtool eval --progress --colors --content-base dist/ --host 127.0.0.1 --port 8008",
        "build" : "webpack --config webpack.config-plugins.js --progress --colors"
      },
      ....省略

这样配置以后，我们执行：

    npm run dev #等效于webpack-dev-server --config webpack.config-plugins.js --devtool eval --progress --colors --content-base dist/ --host 127.0.0.1 --port 8008
    npm run build #等效于webpack --config webpack.config-plugins.js --progress --colors

按照上述步骤配置以后，执行`npm run dev`然后用浏览器访问`http://localhost:8008/webpack-dev-server`然后点击todo.html超链接，就能看到正常的运行效果了。