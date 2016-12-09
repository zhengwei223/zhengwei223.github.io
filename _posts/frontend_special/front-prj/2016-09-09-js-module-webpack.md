---
layout: post
title: webpack入门
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化
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

[node-windows安装](http://jingyan.baidu.com/article/b0b63dbfca599a4a483070a5.html)，其他操作系统上的安装请自行解决，本文重点是webpack。

## webpack安装

我们直接使用 npm 命令来安装：

```
npm install webpack -g  # 安装全局命令行工具
```

如果访问国外网站很慢，可以先执行这个命令：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

以后就可以用`cnpm install pck-name`来安装npm生态圈的各种包了。安装`webpack`，后面我们就可以使用`webpack`命令来构建项目。

# 2.规划项目的目录结构

```
.
├── js/                       
│   ├── app/                  
│   │   ├── todo.js   # js文件        
├── todo.html         # 页面入口
```

我们先用最少的代码来体会webpack的基本作用。实际项目中，我们还会有img,font,css等目录，我们尽可能只演示js的模块加载和打包，因此上面的目录结构非常简单。

# 3.todo添加功能的实现

**学语言写helloworld，学前端写todo.**我们只做最简单的功能（输入姓名和内容提交，上方会新增一个条目，不做任务完成和移除等功能），因为功能不是重点，重点是模块化开发和webpack的使用：

![2.1](http://lemon.lanqiao.org:8082/teaching/img/front-advance/2.1.png)

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

```
var $ = require('jquery');//npm安装的模块，用包名即可  

$(function() {
    $('#btn-submit').click( function() {
        var username = $('#username').val();
        var content = $('#content').val();
        var $todo = $('<li>').html(username + ' : ' + content);
        $('.todolist > ul').append($todo);
    });
});
```

第一行代码是commonJS的写法，**依赖的包需要使用npm安装到当前工程目录下的node_modules目录下**，剩余代码就是常规的`jquery`使用方法：获取值，操作`dom`。`require`函数没有浏览器支持，我们也没使用resuirejs，现在运行这个网页肯定会得到**函数未定义**的错误，这就轮到webpack上场了，现在我们需要它加载这段js并自动分析出其中的依赖关系，为我们加载依赖的模块。

# 4.node环境及安装jquery模块

## 初始化node环境

    npm init  # 生成package.json并交互式地填入内容

这条命令会交互式地让你输入若干关于项目的基础信息，一路输入回车即可，最终生成package.json文件。有了package.json文件，我们以后安装模块时可以带上`--save`或`--save-dev`选择，这样安装模块的同时会将对模块的依赖写入package.json文件。在我们上传项目或者拷贝给别人时，有package.json文件，其他人只需执行npm install就可以批量安装记录在内的模块，而不必将node_modules文件夹拷贝给别人。

## 安装jquery

    cnpm install jquery --save  # 安装jquery模块，并保存配置到package.json

运行时需要的模块，我们用`--save`选项，只是编译需要的，用`--save-dev`选项。

# 5.webpack最基础的配置

项目工程路径下新建js文件：`webpack.config.js`：

    //导出所有配置项
    module.exports = {
      //入口文件名称-路径配置
      entry: {
          todo : './js/app/todo.js'
      },
      //打包文件的输出
      output: {
          path     : __dirname+'/dist',     //所有需要打包的文件放置在此路径下
          filename : '/js/app/[name].js'    //入口文件打包输出到此处
      }
    };

我们导出的是一个配置对象，这个对象的格式为`{entry:...,output:...}`,entry是入口，output是出口。

这份配置文件告诉webpack入口文件在哪里，打包文件去哪里。

现在的目录结构：

```
.
├── js/                       
│   ├── app/                  
│   │   ├── todo.js   # js文件——入口文件     
├── node_modules/     # npm安装的模块所在文件夹   
├── todo.html         # 页面
├── package.json      # node配置文件
├── webpack.config.js # webpack配置文件
```

# 6.构建并查看效果

## 构建

```
webpack --display-error-details #根据配置进行构建
```

后面的参数`--display-error-details`是推荐加上的，方便出错时能查阅更详尽的信息（比如 `webpack` 寻找模块的过程），从而更好定位到问题。
其他主要的参数有：

```
$ webpack --config XXX.js   # 使用另一份配置文件（比如webpack.config2.js）来打包
$ webpack --watch           # 监听变动并自动打包
$ webpack -p                # 压缩混淆脚本
$ webpack -d                # 生成map映射文件，告知哪些模块被最终打包到哪里了
```

其中的 -p 是很重要的参数，曾经一个未压缩的 700kb 的文件，压缩后直接降到 180kb（主要是样式这块一句就独占一行脚本，导致未压缩脚本变得很大）。

## 盘点产出物

根目录下会生成一个dist目录。

### js脚本

查看`dist/js/app/`目录，发现生成了一个`todo.js`文件，这个文件和我们自己编写的`todo.js`完全不一样，这里面不仅包含了我们写的代码，还直接合并了`jquery`的代码（第78行）——**这是webpack打包的特点，将依赖合并至当前模块**。如果我们的`webpack`命令带上了`-p`命令，那这里面的代码就更面目全非了，因为`-p`会压缩代码。

合并依赖的好处在于，可以减少浏览器的http请求次数（一个页面只加载一个入口js文件），但会增大入口文件的size，而且如果多个入口js文件依赖相同的模块，被依赖的模块代码将会重复出现，这个问题将在后续章节解决。


## 运行todo.html

拷贝todo.html至dist目录，用浏览器打开，就能看到我们预期的功能都实现了。

![2.3](http://lemon.lanqiao.org:8082/teaching/img/front-advance/2.3.png)

# 7.你必须知道的概念

## 关于webpack

![2.2](http://lemon.lanqiao.org:8082/teaching/img/front-advance/2.2.jpg)

可以看到Webpack的目标就是对项目中的静态资源进行统一管理，为产品的最终发布提供最优的打包部署方案。

本章我们重点强调webpack的**依赖加载器**和**打包工具**的角色，请牢记**加载**和**打包**两个词语。我们todo.js中以commonJS的模式依赖了jquery，webpack在打包前就需要加载它，打包时以物理方式将jquery源码合并到最终生成的js中（我们称之为chunk），而不像requirejs那样动态加载。

## node、npm和commonJS

- npm是node的包管理器，通过它能获得可直接运行的命令行工具如`webpack`，也需要用它来下载各种模块如`jquery`
- commonJS是node管理包的规范，我们需要安装依赖的包到node_modules，然后用`require('pkg-name')`来依赖，也可以依赖任意路径下的`js`模块，但需要写全路径。

## 配置

- webpack的配置文件是一个`js`文件，是以js语法来书写的，导出一个配置对象，本文给配置对象设置了2个属性
  - entry，对象，配置js入口文件
  - output，对象，配置chunk文件的路径和命名
- webpack把入口文件视为一个模块，默认情况下会把它依赖的模块的代码合并到入口文件中，这样做有利有弊
