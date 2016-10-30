---
layout: post
title: webpack-Plugin
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack 插件
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

安装webpack模块，运行：`npm install webpack --save-dev`，因为我们要使用webpack的导出对象，因此需要把webpack安装在node_modules中

运行`webpack --config webpack.config3.js`，可以看到新编译后的`todo.js`头部添加了如下注释：

    /*! @author zhengwei */

# 3.常用插件

## UglifyJsPlugin

**UglifyJsPlugin** `new webpack.optimize.UglifyJsPlugin([options])`
解析/压缩/美化所有的js chunk，传入 `options` 可以满足更多的定制化需求：

    plugins:[
      new webpack.BannerPlugin('@author zhengwei'),
      new webpack.optimize.UglifyJsPlugin()
    ]

如此修改webpack配置文件，下次编译的时候，js文件会被压缩。

## HtmlWebpackPlugin

HtmlWebpackPlugin这个插件可以帮助生成 HTML 文件，自动插入编译打包后的js和css等文件，因为这些文件经常变化，为了让客户端重新请求这些文件，我们往往需要为这些文件的文件名带上新的hash值（强制客户端重新请求），手动去做这些事情（文件名hash、修改html）太过繁琐，就有了这个插件。

### 安装

这是一个第三方插件（非webpack内置），因此要单独安装一下：


    npm install html-webpack-plugin@2 --save-dev

### 新建配置文件  

[webpack.config-plugins.js](https://coding.net/u/lanqiao/p/frontAdvance/git/tree/master/webpackDemo/webpack.config-plugins.js)

    var webpack = require('webpack');  
    var HtmlWebpackPlugin = require('html-webpack-plugin');//第三方插件，需安装并require
    module.exports = {
      ...,
      module: {
        ...
      },
      plugins:[
        new webpack.BannerPlugin('@author zhengwei'),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
          template:'todo.html', //模板
          filename:'todo.html', //输出文件的路径
          inject:'body',  //在body中插入script标签
          hash:true       //插入的文件有变化时自动更新hash值后缀
        })
      ]
    };

注意第二行代码，第三方的插件需要安装并如此引入。
在`plugins`属性中，我们新增了一个插件并传入了配置参数。

### 重新编译

    webpack --config webpack.config-plugins.js --progress --colors

![4.1](/public/img/front-advance/4.1.png)

可以看到dist目录重新生成了todo.html，其body的最后一部分，引入script的部分有些变化：

    <script type="text/javascript" src="js/app/todo.js"></script>
    <script type="text/javascript" src="js/app/todo.js"></script>

这里第一个`script`标签是html模板中本来就有的，第二个`script`标签是插件自动插入的。明显，重复了，现在我们需要删掉模板中的`script`标签，这样以后就不用维护html中的`script`标签了。
修改后重新编译，dist目录下的todo.html正确了。

## ExtractTextPlugin

extract-text-webpack-plugin从bundle中提取出特定的text到一个文件中，因此利用它就可以把css从js中独立抽离出来。而不是用js动态地将模块内引入的样式以`style`标签的形式插入到dom中。

### 安装插件

    cnpm install extract-text-webpack-plugin --save-dev

### 配置文件

    var webpack = require('webpack');  //依赖npm安装的webpack，只需引用名字
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    module.exports = {
      ...,
      module: {
        loaders: [
          {
            test: /\.css$/,  //正则表达式
            loader: ExtractTextPlugin.extract('style','css')  
          },
          ...
        ]
      },
      plugins:[
        ...,
        new ExtractTextPlugin("css/[name].css")
      ]
    };

同样，这个插件是第三方插件，需要安装并引入。
第10行，`ExtractTextPlugin.extract([notExtractLoader], loader, [options])`
根据已有的loader，创建一个提取器（loader的再封装）。
第17行，新增一个插件。
