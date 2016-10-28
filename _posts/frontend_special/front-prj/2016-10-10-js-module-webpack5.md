---
layout: post
title: webpack-公共组件单独打包
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack 公共组件
p_cate: 前端那些事儿
description: 本篇主要介绍：公共js库、css如何单独打包。
---

# 0.前情回顾

上一章我们解决了多入口文件自动扫描和多页面插入js、css的问题，但遗留了公共组件独立打包的问题，本章将解决这个问题。

回顾下现在的目录结构：

    .
    ├── package.json                # 项目配置
    ├── webpack.config-*.js         # webpack配置
    ├── index.html                  # 首页
    ├── todo.html                   
    ├── js/                         # js&jsx资源
    │   ├── app/   
    │   │   ├── index.js            # index入口
    │   │   ├── todo.js             # todo入口
    │   │   ├── *.js                # 其他入口
    ├── css/                    
    │   ├── main.css                # 全局样式表
    │   ├── todo.css                # todo页面专用样式表
    ├── node_modules/                  
    │   ├── jquery                  # jquery node版本
    │   ├── ...

现在的情况是，index-mpa.js和todo-mpa.js等js模块都引入了jquery和main.css，那么jquery和main.css就可以算作公共组件了，我们需要把他们单独打包而不是联合打包。

# 实验：hack CommonsChunkPlugin插件

## 1.拷贝webpack.config-mpa.js为[webpack.config-comm.js](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/webpackDemo/webpack.config-comm.js)

## 2.使用CommonsChunkPlugin插件

    plugins:[
        new webpack.BannerPlugin('@author zhengwei'),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
          name:'common',
          minChunks: 2
        })
      ]

CommonsChunkPlugin是webpack的内置插件，因此无需安装。
如此配置之后，这个插件会自动分析所有入口文件的依赖，凡是被依赖超过两次的公共组件将被合并到新的chunk——common中，js到common.js中，css到common.css中。

## 3.重新编译

请修改package.json中的`--config webpack.config-comm.js`选项并编译——`npm run build`，产出物如下:

![4.4](/public/img/front-advance/4.4.png)

对比上次编译，多出了common.js(主要内容为jquery)和common.css(主要包含main.css)，而且现在todo-mpa.js大小仅为661 bytes，之前为88.6kb，这是因为todo-mpa.js不再包含公共代码。由于common.js会被多页面复用，浏览器可以将其缓存起来，这样可以大大减少网络传输数据量。

## 4.自动给html插入公共代码

在上一步骤中，我们发现生成的html并未自动插入common.js和common.css，这是因为下面的代码

    let htmlPlugin = new HtmlWebpackPlugin({
        ...
        //每个html引入自己的js和css  
        chunks:[name]
      });

这段代码决定了将和入口文件同名的chunk（**Webpack中将打包后的文件都称之为“Chunk”**）插入到和入口文件同名的html中，现在只需微调，就可以将common.{js,css}插入HTML：

    let htmlPlugin = new HtmlWebpackPlugin({
        filename:name+'.html',
        template:...,
        inject:'body',
        //每个html引入自己的js和css ，还有名为common的chunk 
        chunks:[name,'common']
    });

本章完。