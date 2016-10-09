---
layout: post
title: webpack-Plugin
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack 插件
p_cate: 前端那些事儿
description: 前面我们讲了Loader，这一章讲解Plugin。插件可以完成更多loader不能完成的功能。
---

# 1.简介

插件可以完成更多 loader 不能完成的功能。
插件的使用一般是在 webpack 的配置信息 `plugins` 选项中指定。
Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。

# 2.示例

接下来，我们利用一个最简单的 `BannerPlugin `内置插件来实践插件的配置和运行，这个插件的作用是给输出的文件头部添加注释信息。

拷贝[webpack.config2.js](https://coding.net/u/lanqiao/p/frontAdvance/git/tree/master/webpackDemo/webpack.config2.js)为[webpack.config3.js](https://coding.net/u/lanqiao/p/frontAdvance/git/tree/master/webpackDemo/webpack.config3.js)，添加`plugins`：

    var webpack = require('webpack');  

    module.exports = {
      ......,
      module: {
        ......
      },
      plugins:[
        new webpack.BannerPlugin('@author zhengwei')
      ]
    };

*注意plugins和module是平级的。*

运行`webpack --config webpack.config3.js`，可以看到新编译后的`todo.js`头部添加了如下注释：

    /*! @author zhengwei */

# 常用插件

## UglifyJsPlugin

**UglifyJsPlugin** `new webpack.optimize.UglifyJsPlugin([options])`
解析/压缩/美化所有的js chunk，传入 `options` 可以满足更多的定制化需求：

    plugins:[
      new webpack.BannerPlugin('@author zhengwei'),
      new webpack.optimize.UglifyJsPlugin()
    ]

如此修改webpack配置文件，下次编译的时候，js文件会被压缩。

