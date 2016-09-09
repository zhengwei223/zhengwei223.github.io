---
layout: post
title: JavaScript模块化开发实验（2）webpack
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化
p_cate: 前端那些事儿
---

# 前情回顾

上一章我们主要介绍了`amd`模块化规范和`requirejs`的用法。需要指出的是虽然`requirejs`非常好地实现了`amd`规范，但它只是一个模块加载器，而现在的前端开发除了模块加载以外，还需要一套工程化构建流程及支持工具。

所谓工程化构建，包括：代码的编译、调试、代理、打包部署等。

因此本章介绍：webpack——一款模块加载器兼打包工具，它同时支持amd、cmd写法，还有丰富的插件可以对代码进行混淆压缩等优化。

# 实验1.安装node（npm）和webpack

[node-windows安装](http://jingyan.baidu.com/article/b0b63dbfca599a4a483070a5.html)，其他系统安装请自行解决，本文重点是webpack。

## webpack安装

我们常规直接使用 npm 的形式来安装：

```
npm install webpack -g
```

如果访问国外网站很慢，可以先执行这个命令：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

以后就可以用`cnpm install pck-name`来安装npm生态圈的各种包了。安装`webpack`，后面我们就可以使用`webpack`命令来构建项目。

# 规划项目的目录结构

```
www/
  -js/
    -lib/
      +jquery.min.js
    -app/
      +todo.js   
  -css
    -lib/
      +layout.css
    -app/
      +todo.css
  -img/
  -font/
  +todo.html
```

当然，为了让项目最简化，我们实际中没有img,font,css。我们尽可能只演示js的模块化和打包。

# 实验2.todo添加功能的实现

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

        <script src="dist/js/app/todo.js"></script>
    </body>
</html>
```

注意`script`标签，我们只依赖了一个文件，但现在我们还没有`dist`这个目录，未来会有。

## todo.js

```
require('../lib/jquery.min');  

$(function() {
    $('#btn-submit').click( function() {
        var username = $('#username').val();
        var content = $('#content').val();
        var $todo = $('<li>').html(username + ' : ' + content);
        $('.todolist > ul').append($todo);
    });
});
```

注意：todo.js应该保存在`js/app/`目录下，而不是`dist/js/app`目录下。

除了第一行代码，剩余代码就是常规的`jquery`使用方法：获取值，操作`dom`。但是，现在的`todo.html`是不会有任何互动效果的，因为我们的`todo.js`不在`dist`目录下。现在轮到webpack上场了，我们曾号称它是模块加载器和打包工具。

# 实验3.配置webpack

我们在node环境下工作，还需执行下述命令（只需执行一次）来添加本次构建任务的依赖：

```
npm init  #生成package.json
cnpm install webpack -save-dev  #本地安装webpack包，保证require('webpack');可以成功
```
*对于第二条命令，你可能不是很理解，之前我们不是安装过webpack吗？上一次安装是我们需要使用webpack命令，而这次安装是因为我们在代码中要依赖这个模块。你可以理解为上次安装了一个工具（命令行），这次是下载了一个模块。以后我们还会安装更多工具和模块。*

项目工程路径下新建`webpack.config.js`：

```
var webpack = require('webpack');  //依赖npm安装的webpack，只需引用名字

///导出所有配置项
module.exports = {
    //入口文件名称-路径配置
    entry: {
        todo : './js/app/todo.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/app/',
        filename: '[name].js'
    }
};
```

这份配置文件告诉webpack入口文件在哪里，出口文件去哪里。



# 实验4.构建并查看效果

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

查看`dist/js/app/`目录，发现生成了一个`todo.js`文件，这个文件和我们自己编写的`todo.js`完全不一样，这里面不仅包含了我们写的代码，还直接合并了`jquery`的代码（第62行）。如果我们带上了`-p`命令，那这里面的代码就更面目全非了。

直接`require`是`commonJS`就近加载的写法，默认情况下会导致`webpack`**将依赖的文件合并至入口文件**。这样做的好处在于，可以减少浏览器的http请求次数（一个页面只有一个入口js文件），但会增大入口文件的size。

## 运行todo.html

如果前面都做对的话，这个页面我们预期的功能应该都实现了。

# 总结

这样，你就学会了webpack的基本使用，并大致了解其工作思路，还顺便学会了node所遵循的commonJS对依赖模块的处理。有些细节，大家需要注意：

- npm是node的包管理器，通过它能获得可直接运行的命令行工具如webpack，也需要用它来下载各种模块如webpack（内容是代码）
- 使用webpack,编写源码时要注意，页面中引入的js或者css路径应该是构建后的文件路径，src和build是分开的，如果你学过java应该很容易理解
- webpack把入口文件视为一个模块，默认情况下会把它依赖的模块的代码合并到入口文件中，这样做有利有弊
- webpack不仅支持commonJS这种写法，也支持AMD的写法，参考上一章，你可以自己试试
- 但是，既然在node环境下编码，正是看中了这种编码方式爽的地方——可以随处`require`，而不是AMD那种依赖前置（把依赖全部写在开头）
