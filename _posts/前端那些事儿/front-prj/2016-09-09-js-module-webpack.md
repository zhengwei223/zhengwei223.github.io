---
layout: post
title: webpack入门
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化
p_cate: 前端那些事儿
description: Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。本章将带领大家完成webpack的基本使用。
---

<p class="text-danger">

本教程配套源码在这里→<a href="https://coding.net/u/lanqiao/p/frontAdvance/git/tree/master/webpackDemo">webpack示例项目</a>。
</p>

# 0.前情回顾

上一章我们主要介绍了`amd`模块化规范和`requirejs`的用法。需要指出的是虽然`requirejs`非常好地实现了`amd`规范，但它只是一个模块加载器，而现在的前端开发除了模块加载以外，还需要一套工程化构建流程及支持工具。

所谓工程化构建，包括：代码的编译、调试、代理、打包部署等。

因此本章介绍：webpack——一款模块加载器兼**打包工具**，它同时支持amd、cmd写法，还有丰富的插件可以对代码进行混淆压缩等优化。

# 1.安装node（npm）和webpack

[node-windows安装](http://jingyan.baidu.com/article/b0b63dbfca599a4a483070a5.html)，其他系统安装请自行解决，本文重点是webpack。

## webpack安装

我们直接使用 npm 的形式来安装：

```
npm install webpack -g
```

如果访问国外网站很慢，可以先执行这个命令：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

以后就可以用`cnpm install pck-name`来安装npm生态圈的各种包了。安装`webpack`，后面我们就可以使用`webpack`命令来构建项目。

# 2.规划项目的目录结构

```
www/
  -js/
    -app/
      +todo.js   
  +todo.html
```

实际项目中，我们还会有img,font,css等目录，我们尽可能只演示js的模块化和打包，因此上面的目录结构非常简单。

# 3.todo添加功能的实现

**学语言写helloworld，学前端写todo.**我们只想做最简单的功能（输入姓名和内容提交，上方会新增一个条目），因为功能不是重点，重点是模块化开发和webpack的使用：

![2.1](/public/img/front-advance/2.1.png)

## todo.html

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>todo列表</title>
    </head>
    <body>
        <div class="root">
            <!-- 显示tidolist -->
            <div class="todolist">
                <ul></ul>
            </div>  
            
            <div class="todo-form">
                <input type="text" placeholder="your name..." id="username"/> <br>
                <textarea placeholder="Say something..." id="content"></textarea><br>
        <input type="button" value="Post" id="btn-submit"/><br>
            </div>
        </div>
        <script type="text/javascript" src="js/app/todo.js"></script></body>
    </body>
</html>
```

## todo.js

先用npm方式安装jquery到本地，执行命令：
`cnpm install jquery --save-dev`

```
var $ = require('jquery');//用包名即可  

$(function() {
    $('#btn-submit').click( function() {
        var username = $('#username').val();
        var content = $('#content').val();
        var $todo = $('<li>').html(username + ' : ' + content);
        $('.todolist > ul').append($todo);
    });
});
```

第一行代码是commonJS的写法，**依赖的包需要提前使用npm安装到当前工程目录下的node_modules目录下**，剩余代码就是常规的`jquery`使用方法：获取值，操作`dom`。`require`函数没有浏览器支持，我们也没使用resuirejs，现在运行这个网页肯定会得到**函数未定义**的错误，这就轮到webpack上场了，我们曾号称它是模块加载器和打包工具。

# 4.webpack基本配置

我们在node环境下工作，还需执行下述命令（只需执行一次）来添加本次构建任务的依赖：

```
npm init  #生成package.json
cnpm install webpack -save-dev  #本地安装webpack包，保证require('webpack');可以成功
```

第一条命令会交互式地让你输入若干关于项目的基础信息，一路输入回车即可。

*对于第二条命令，你可能不是很理解，之前我们不是安装过webpack吗？上一次安装是我们需要使用webpack命令，而这次安装是因为我们在代码中要依赖这个模块。你可以理解为上次安装了一个工具（命令行），这次是下载了一个模块(node_modules目录下)。以后我们还会安装更多工具和模块。*

项目工程路径下新建js文件：`webpack.config.js`：

```
var webpack = require('webpack');  //依赖npm安装的webpack，只需引用名字

//导出所有配置项
module.exports = {
    //入口文件名称-路径配置
  entry: {
      todo : './js/app/todo.js'
  },
  //入口文件的输出
  output: {
      path: 'dist/js/app/',
      filename: '[name].js'
  }
};
```

我们导出的是一个配置对象，这个对象的格式为`{entry:...,output:...}`,entry是入口，output是出口。

这份配置文件告诉webpack入口文件在哪里，出口文件去哪里。

# 5.构建并查看效果

## 构建

```
webpack --display-error-details #根据配置进行构建
```

后面的参数`--display-error-details`是推荐加上的，方便出错时能查阅更详尽的信息（比如 `webpack` 寻找模块的过程），从而更好定位到问题。
其他主要的参数有：

```
$ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
$ webpack --watch   //监听变动并自动打包
$ webpack -p    //压缩混淆脚本，这个非常非常重要！
$ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
```

其中的 -p 是很重要的参数，曾经一个未压缩的 700kb 的文件，压缩后直接降到 180kb（主要是样式这块一句就独占一行脚本，导致未压缩脚本变得很大）。

## 盘点产出物

### js脚本

查看`dist/js/app/`目录，发现生成了一个`todo.js`文件，这个文件和我们自己编写的`todo.js`完全不一样，这里面不仅包含了我们写的代码，还直接合并了`jquery`的代码（第78行）。如果我们的`webpack`命令带上了`-p`命令，那这里面的代码就更面目全非了，因为`-p`会压缩代码。

直接`require`是`commonJS`就近加载的写法，默认情况下会导致`webpack`**将依赖的文件合并至入口文件**。这样做的好处在于，可以减少浏览器的http请求次数（一个页面只有一个入口js文件），但会增大入口文件的size。


## 运行todo.html

拷贝todo.html至dist目录，用浏览器打开，就能看到我们预期的功能都实现了。

![2.3](/public/img/front-advance/2.3.png)

# 6.总结

## 关于webpack

![2.2](/public/img/front-advance/2.2.jpg)

可以看到Webpack的目标就是对项目中的静态资源进行统一管理，为产品的最终发布提供最优的打包部署方案。

本章我们重点强调webpack的**依赖加载器**和**打包工具**的角色，我们todo.js中以commonJS的模式依赖了jquery，webpack可以很好地处理，它以物理方式将jquery源码引入到最终生成的js中，而不像requirejs那样动态加载。

## node、npm和commonJS

- npm是node的包管理器，通过它能获得可直接运行的命令行工具如`webpack`，也需要用它来下载各种模块如`jquery`（内容是代码）
- commonJS是node管理包的规范，我们需要安装依赖的包到node_modules，然后用`require('pkg-name')`来依赖，也可以依赖任意路径下的`js`模块，但需要写全路径。

## 配置

- webpack的配置文件是一个`js`文件，是以js语法来书写的，首先导入webpack对象，然后导出一个配置对象，本文给配置对象设置了2个属性
  - entry，对象，代表源码入口文件
  - output，对象，代表编译后的出口文件
- webpack把入口文件视为一个模块，默认情况下会把它依赖的模块的代码合并到入口文件中，这样做有利有弊
