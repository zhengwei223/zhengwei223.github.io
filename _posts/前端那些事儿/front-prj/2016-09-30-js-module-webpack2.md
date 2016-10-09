---
layout: post
title: webpack-Loader
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化 webpack Loader
p_cate: 前端那些事儿
description: Webpack本身只能处理原生的JavaScript模块，如果要处理其他类型的文件，就需要使用loader进行转换。loader转换器可以将各种类型的资源转换成 JavaScript模块，这样，任何资源都可以成为Webpack可以处理的模块。
---
<p class="text-danger">
本教程配套源码在这里→<a href="https://coding.net/u/lanqiao/p/frontAdvance/git/tree/master/webpackDemo">webpack示例项目</a>。
</p>

>Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。

# 1.loader简介

Loader 本身也是运行在 node.js 环境中的 JavaScript 模块，它通常会返回一个函数。大多数情况下，我们通过 npm 来管理 loader，但是你也可以在项目中自己写 loader 模块。

按照惯例，而非必须，loader 一般以 `xxx-loader` 的方式命名，`xxx` 代表了这个 loader 要做的转换功能，比如 `json-loader`。

在引用 loader 的时候可以使用全名 `json-loader`，或者使用短名 `json`。

Loader 可以在 `require()` 引用模块的时候添加，也可以在 webpack 全局配置中进行绑定，还可以通过命令行的方式使用。

# 2.require时使用loader

## 将css加载为模块

接上一节的例子，我们要在页面中引入一个 CSS 文件 `todo.css`，首页将 `todo.css` 也看成是一个模块，然后用 `css-loader` 来读取它，再用 `style-loader` 把它插入到页面中。

    //todo.js
    var $ = require('jquery');
    require('!style!css!../../css/todo.css');
    ...

注意理解第三行代码，从后往前读，首先我们需要`../../css/todo.css`文件路径作为`css-loader`的参数，`css-loader`加载文件后又传输给`style-loader`，最后作为模块由`require`引入。

    //~/css/todo.css
    .todolist ul li{
        list-style: none;
    }

## 安装loader

    cnpm install css-loader style-loader --save

重新编译打包`webpack`，刷新页面，就可以看到列表前无圆点样式了。

# 3.自动绑定loader

如果每次 require CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据模块类型（扩展名）来自动绑定需要的 loader。

## 1.不显式引用loader

将 todo.js 中的 `require("!style!css!../../css/todo.css")` 修改为 `require("../../css/todo.css")` 。

## 2.修改配置文件

然后新建配置文件webpack.config2.js：

    var webpack = require('webpack');  //依赖npm安装的webpack，只需引用名字

    //导出所有配置项
    module.exports = {
      //入口文件名称-路径配置
      entry: {
          todo : './js/app/todo.js'
      },
      //入口文件的输出
      output: {
          path: __dirname+'/dist',
          filename: '/js/app/[name].js'
      },
      module: {
        loaders: [
          {
            test: /\.css$/,  //正则表达式
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

`babel-loader`使用babel加载es6语法的js文件。

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

### 3.新建.babelrc文件

并输入以下内容：

    { "presets": [ "es2015" ] }

### 3.使用es6语法

    //todo.js代码片段
    import $ from 'jquery';   //使用babel-loader后，es6写法，可以被webpack解析

### 4.重新编译

    webpack --config webpack.config2.js 

## json-loader

### 1.安装

    npm install --save json-loader

### 2.修改webpack配置文件，添加loader

    {
      test:/\.json$/,
      loader:'json'
    }

### 3.导入json文件为js对象

    /*todo.js代码片段*/
    var todos = require('./todos');//使用json-loader后，可以将json文件导出为对象
    $(function() {
        // es6语法
        for(let todo of todos){
            $('.todolist > ul').append(`<li>${todo}</li>`);
        }
        ......
    });

todos.json内容：

    ["吃","喝","玩儿","乐"]

## 更多loader

比较常用的还有less，jsx，coffee等，请查看[官方文档](http://webpack.github.io/docs/list-of-loaders.html)