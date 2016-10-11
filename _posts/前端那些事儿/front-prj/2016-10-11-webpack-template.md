---
layout: post
title: webpack项目模板
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack 项目模板
p_cate: 前端那些事儿
description: 本篇为大家提供一个基于webpack进行前端开发的项目模板，它区分了开发环境和生成环境，考虑了日常前端开发所需的基本配置。
---

# 1.目录结构

    .
    ├── .babelrc                    # babel-loader配置
    ├── package.json                # npm配置文件
    ├── README.md                   # 使用说明
    ├── config                      # webpack配置文件
    │   ├── webpack.base.conf.js    # 基础配置
    │   ├── webpack.dev.conf.js     # 开发环境配置
    │   └── webpack.prod.conf.js    # 成产环境配置
    ├── dist                        # 打包产出
    └── src                         # 源码目录
        ├── css                     # 自定义样式表目录
        ├── fonts                   # 字体目录
        ├── img                     # 图片目录
        ├── js
        │   └── app                 # 自定义js入口文件
        ├── less                    # 自定义less文件
        ├── index.html              # 首页
        └── ***.html                # 其他页面
    └── node_modules                # npm install安装模块存放目录

# 2.webpack.base.conf.js主要内容

这是一个基础配置文件，其中大部分内容在之前都介绍过，增加了处理字体、图片和文件的file-loader及url-loader，增加了处理less文件的less-loader，另外变化的是对HtmlWebpackPlugin的配置：

    Object.keys(entriesMap).forEach(name=>{
      //每个页面生成一个html
      let htmlPlugin = new HtmlWebpackPlugin({
        ...,
        hash:(()=>process.env.NODE_ENV==='prod')()
      });
      webpackConfig.plugins.push(htmlPlugin);
    });

在这里，插入html的css和js文件名是否带hash后缀，取决于`process.env.NODE_ENV`是否等于`prod`，`process.env.NODE_ENV`变量将由依赖当前文件的模块给定。

# 3.webpack.dev.conf.js主要内容

    require('shelljs/global')
    env.NODE_ENV = 'dev'
    var config = require('./webpack.base.conf')
    // 增加source-map
    config.devtool = '#cheap-module-eval-source-map'
    module.exports = config

开发模式下，设定`env.NODE_ENV = 'dev'`，并增加source-map配置，便于客户端调试。

# 4.webpack.prod.conf.js主要内容

    require('shelljs/global')
    env.NODE_ENV = 'prod';
    var webpack = require('webpack')
    var baseWebpackConfig = require('./webpack.base.conf')

    //压缩混淆插件
    baseWebpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );

    module.exports = baseWebpackConfig;

生产模式下，我们需要对chunk进行压缩混淆，因此加了一个插件。
设定`env.NODE_ENV = 'prod';`让第二节提到的hash生效。

# 5.package.json中的命令

    {
      ...,
      "scripts": {
        "dev": "webpack-dev-server --config ./config/webpack.dev.conf.js --devtool eval --progress --colors --content-base dist/ --host 127.0.0.1 --port 8008",
        "build": "webpack --config ./config/webpack.prod.conf.js --progress --colors "
      },
      ...
    }

因此在当前目录下运行：

npm run dev     #使用webpack.dev.conf.js配置文件，并运行一个server
npm run build   #使用webpack.prod.conf.js配置文件，在dist目录下生成构建好的资源

