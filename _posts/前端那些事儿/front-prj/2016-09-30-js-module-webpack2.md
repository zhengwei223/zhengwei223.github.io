---
layout: post
title: webpack-Loader
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack Loader
p_cate: 前端那些事儿
description: Webpack本身只能处理原生的JavaScript模块，你可以随意地require js模块，webpack能将其加载。如果要require其他类型的文件（如css、js），就需要使用loader（加载器）进行转换。loader转换器可以将各种类型的资源转换成模块，这样，任何资源都可以成为Webpack可以处理的模块，从而可以被require。
---
<p class="text-danger">
本教程配套源码在这里→<a href="https://coding.net/u/lanqiao/p/frontAdvance/git/tree/master/webpackDemo">webpack示例项目</a>。
</p>

>Loader 可以理解为是模块和资源的转换器——将非js资源转换为可依赖的模块，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。

# 1.loader简介

Loader 本身也是运行在 node.js 环境中的 JavaScript 模块，它通常会返回一个函数。现有loader需要通过 npm 来安装，你也可以自己写 loader。

按照惯例，而非必须，loader 一般以 `xxx-loader` 的方式命名，`xxx` 代表了这个 loader 要做的转换功能，比如 `json-loader` 就是加载json文件将其转换为模块。

在引用 loader 的时候可以使用全名 `json-loader`，或者使用短名 `json`。

Loader 可以在 `require()` 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定。

# 2.require时直接使用loader转换目标资源为模块

## 将css加载为模块

接上一节的例子，我们要为页面添加文件 `todo.css`中的样式，我们要使用到`css-loader`和`style-loader`。拷贝todo.js为todo2.js：

    // todo2.js
    var $ = require('jquery');
    require('!style!css!../../css/todo.css');
    ...

注意理解第三行代码，从后往前读，首先我们需要`../../css/todo.css`文件路径作为`css-loader`的参数，`css-loader`加载文件后又传输给`style-loader`，最后作为模块由`require`引入。`!`连接多个loader并从后往前依次处理。

## 安装loader

    cnpm install css-loader style-loader --save-dev

## 打包

重新编译打包，刷新页面，就可以看到列表前无圆点样式了，这说明css被引入到了页面。但这里有个疑问，我们没有在html中显示使用style标签，那样式是如何插入的呢？这就需要理解css-loader和style-loader的作用了：

- css-loader加载css文件，不仅如此还会分析css文件中的@import，做深层次的依赖链路解析，返回css代码字符串
- style-loader则会将上个loader返回的内容包裹在style标签中，插入dom之中。
- 所以此处`require`无需返回变量，它会直接触发style-loader这个js模块的立即执行函数。可以这么理解：你执行了一段js代码把css文件中的样式直接插入dom中了。

# 3.自动绑定loader

如果每次 `require` CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据资源类型（扩展名）来自动绑定需要的 loader。

## 1.不显式引用loader

在todo2.js，将`require("!style!css!../../css/todo.css")` 修改为 `require("../../css/todo.css")`。webpack在解析到此处时发现require的是一个非js资源，它会自动查找配置文件中对应的loader，找到后自动使用loader先行转换。

## 2.修改配置文件

为示区别，新建配置文件webpack.config2.js：

    module.exports = {
      entry: {
          todo : './js/app/todo2.js'
      },
      output: {
          path: __dirname+'/dist',
          filename: '/js/app/[name].js'
      },
      module: {
        loaders: [
          {
            test: /\.css$/,  //正则表达式匹配文件
            loader: 'style!css'  //匹配文件，自动绑定此loader
          },
        ],
      }
    };

## 3.重新编译

    webpack --config webpack.config2.js

我们通过`--config`选项指定了新的配置文件，这次编译的效果和直接在`require`时使用loader的效果是一样的。

# 4.常用loader

## babel-loader

`babel-loader`使用babel加载es6语法的js文件，将其转换为对应的es5语法。

### 1.安装

    npm install babel-loader babel-core babel-preset-es2015 --save-dev

### 2.修改webpack配置文件，添加loader

    //webpack.config2.js代码片段
      module: {
        loaders: [
          {
            test: /\.css$/,  //正则表达式
            loader: 'style!css'  //匹配文件，自动绑定此loader
          },
          {
            test:/\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader:'babel',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }

### 3.新建`.babelrc`文件

注意这是一个以`.`开头的隐藏文件，输入以下内容：

    { "presets": [ "es2015" ] }

### 3.使用es6语法

    // todo.js代码片段
    // var $ = require('jquery');
    import $ from 'jquery';   // 使用babel-loader后，es6写法，可以被解析

### 4.重新编译

    webpack --config webpack.config2.js 

## json-loader

### 1.安装

    npm install --save-dev json-loader

### 2.修改webpack配置文件，添加loader

    {
      test:/\.json$/,   // json文件会被解析为js对象并导出
      loader:'json'
    }

### 3.导入json文件为js对象

    /*todo2.js代码片段*/
    var todos = require('./todos.json');// 使用json-loader后，可以将json文件导出为对象
    $(function() {
        // es6语法 ： 遍历todos数组并将每个元素作为一个todo插入dom之中
        for(let todo of todos){
            $('.todolist > ul').append(`<li>${todo}</li>`);
        }
        ......
    });

todos.json内容：

    ["吃","喝","玩儿","乐"]

## 更多loader

比较常用的还有less，jsx，coffee，img，html等，请查看[官方文档](http://webpack.github.io/docs/list-of-loaders.html)

# 总结

- loader的作用是将目标资源文件加载并转换为可用的commonJS模块
- 既然产出是commonJS模块，在js入口模块中就可以愉快地require了