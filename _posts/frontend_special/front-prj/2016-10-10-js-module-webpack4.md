---
layout: post
title: webpack-多页面/入口支持
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack 多页面 多入口
description: 本篇主要介绍：如何自动构建入口文件，并生成对应的output。
---

# 0.前情回顾

之前的示例只有一个入口文件，但不是所有项目都是SPA（single page app），因此我们要考虑多页面应用。

# 1.多入口基本示例

webpack默认支持多入口，官方也有多入口的示例。配件文件webpack.config.js如下:

    //已简化
    module.exports = {
        entry: {
            pageA: "./js/app/pageA.js",
            pageB: "./js/app/pageB.js"
        },
        output: {
            path: __dirname+'/dist',
            filename: "/js/app/[name].js",
            chunkFilename: "[id].chunk.js"
        }
    }

这样配置，每新增一个页面就需要在webpack.config.js的`entry`中增加一个项，页面一多，就比较繁琐。那么如何支持不修改配置呢？


# 2.自动扫描入口文件

entry实际上是一个map对象，结构如下`{filename:filepath}`，那么我们可以根据文件名匹配，创建自动扫描器：
npm中有一个用于文件名匹配的glob模块，通过glob很容易遍历出某个目录下的所有js文件：

安装glob模块

    $ npm install glob --save-dev

修改webpack.config.js配置，新增`entries`函数并使用：

    //引入glob
    var glob = require('glob')
    //entries函数
    var entries= function () {
        var entryFiles = glob.sync('./js/app/*.{js,jsx}');
        var map = {};
        entryFiles.forEach(function(filePath){
            var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));//文件名
            map[filename] = filePath;
        });
        return map;
    }

    module.exports = {
        entry: entries(),
        output: {
            path: __dirname+'/dist',
            filename: '/js/app/[name].js'
        },
        ......

# 3.实验：自动扫描入口文件

### 1.新增js文件

在./js/app目录下新增index.js:

    import $ from 'jquery'

    var $a = $('<a>',{href:'todo.html'});
    $a.text('todo');
    $a.appendTo('body');

### 2.修改配置文件

新增[webpack.config-mpa.js](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/webpackDemo/webpack.config-mpa.js)，内容如下：

    var webpack = require('webpack');  
    var HtmlWebpackPlugin = require('html-webpack-plugin');//第三方插件，需安装并require
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var glob = require('glob');

    //entries函数
    var entries= function () {
        var entryFiles = glob.sync('./js/app/*.{js,jsx}');
        var map = {};
        entryFiles.forEach(function(filePath){
            var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));//文件名
            map[filename] = filePath;
        });
        return map;
    }

    //导出所有配置项
    module.exports = {
      //入口文件名称-路径配置
      entry: entries(),
      //入口文件的输出
      output: {
          path: __dirname+'/dist',
          filename: '/js/app/[name].js'
      },
      module: {
        loaders: [
          ...
        ]
      },
      plugins:[
        ...
      ]
    };

主要变化是，新增了扫描入口js文件的函数。

### 3.编译

执行`webpack --config webpack.config-mpa.js --progress --colors `可以看到dist目录下出现了新编译生成的index.js，同样jquery的代码被合并到了index.js中。

# 4.实验：多页面自动插入js和css

现实开发中，多个页面会分别依赖不同的js和css，也会共同依赖公共的js和css，那么怎么做到给每个页面准确插入它依赖的js和css呢？下面我们就来模拟一下：

## 实验步骤

1.css新建目录下新建main.css

    body{
        background-color: #fff;
    }

2.在todo2.js基础上新建todo-mpa.js，依赖main.css，这样todo-mpa引入了两部分css

    ...
    require('../../css/todo.css');
    require('../../css/main.css');
    ...

3.在index.js上新建index-mpa.js，依赖main.css

    import $ from 'jquery'
    require('../../css/main.css');
    var $a = $('<a>',{href:'todo-mpa.html'});  // 此处有变化
    $a.text('todo');
    $a.appendTo('body');

4.根目录新建index.html:

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>index</title>
        </head>
        <body>

        </body>
    </html>

5.调整HtmlWebpackPlugin插件，为多个页面准确插入js和css：

为了实现这个目标，整个配置文件的写法，我们要调整一下：

    var webpack = require('webpack');  
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var glob = require('glob');

    //entries函数
    var entries= function () {
        ...
    }
    var entriesMap = entries();
    var webpackConfig= {
      //入口文件名称-路径配置
      entry: entriesMap,
      //入口文件的输出
      output: {
          path: __dirname+'/dist',
          filename: '/js/app/[name].js'
      },
      module: {
        loaders: [
          ...
        ]
      },
      plugins:[
        new webpack.BannerPlugin('@author zhengwei'),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("css/[name].css")
      ]
    };
    //遍历入口文件，为每个入口文件新建一个HtmlWebpackPlugin实例
    Object.keys(entriesMap).forEach(name=>{
      //每个页面生成一个html
      let htmlPlugin = new HtmlWebpackPlugin({
        filename:name+'.html',
        template:name+'.html',
        inject:'body',
        //每个html引入自己的js和css  
        chunks:[name]
      });
      webpackConfig.plugins.push(htmlPlugin);
    });

    //导出所有配置项
    module.exports  = webpackConfig;

接上一版本的配置文件，这一版本的配置文件有以下变化：

- 先调用`entries()`函数得到入口文件名和路径的映射Map实例
- 先声明一个`webpackConfig`实例，做好基本配置，并不急于导出该对象
- 第13行使用了`entriesMap`对象
- 31行到41行，我们遍历了`entriesMap`对象，为每个入口新增一个`HtmlWebpackPlugin`实例并将这个实例添加到`webpackConfig.plugins`这个数组中——40行
- 最后再导出`webpackConfig`对象
- 需要注意的是，`HtmlWebpackPlugin`虽然使用了`entriesMap`，但是给html插入脚本这件事本身和入口文件是没有关系的，我们只是假定每个入口文件都有一个同名的html模板同时也需要生成一个同名的html，并且新生成的html插入与入口文件同名的chunk。
- 注意第38行，每个html应该插入不同的js和css，如果不加这行，产出的所有js和css chunk都会插入每个html中

如果你看懂了上面的逻辑，我要说的是，就这样编译是要报错的，因为我们扫描app目录下所有js为入口，这没有问题，但我们为每个入口定制了一个HtmlWebpackPlugin（以入口名为模板html的名字和产出html的名字），为了展示递进关系我们有好几个`todo*.js`，这些入口没有对应的同名的html模板，因此仅针对当前状况我们要改写下代码：

    // template:name+'.html',  //正常环境使用
    template:(()=>{
      if(name.startsWith('todo'))
        return 'todo.html'     //todo打头的，以todo.html为模板
      if(name.startsWith('index'))
        return 'index.html'    //index打头的，以index.html为模板
    })(),

*重要概念：Webpack中将打包后的文件都称之为“Chunk”。*


## 编译

请修改package.json中build和dev命令的`--config webpack.config-mpa.js`选项并编译——`npm run build`。
产出物如下：

![4.3](http://lemon.lanqiao.org:8082/teaching/img/front-advance/4.3.png)

## 问题

现在页面可以正确地运行（启动server后访问：`http://localhost:<port>/webpack-dev-server/index-mpa.html`）。但问题是，jquery代码在index*.js和todo*.js中重复了，main.css在index*.css和todo*.css中重复了。随着页面增多、依赖的公共库增多，每个css和js文件都会变得比较庞大，该怎么做呢？
请看下一章→[公共组件单独打包](/front-prj/js-module-webpack5)。
