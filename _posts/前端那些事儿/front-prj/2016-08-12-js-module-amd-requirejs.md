---
layout: post
title: requirejs体验
category: front-prj
tags: 前端 模块化 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 前端 模块化
p_cate: 前端那些事儿
description: 模块化开发js已经成为必须。本文介绍require及模块化相关概念，随着es6的来临这种方案已经慢慢变得过时，不过作为了解还是必要的。
---
<p class="text-danger">

本教程配套源码在这里→<a href="https://coding.net/u/lanqiao/p/frontAdvance/git/tree/master/requirejsDemo">requirejs示例代码</a>。
</p>

# 0.Foreword

> Here comes Module!

随着网站逐渐变成「互联网应用程序」，嵌入网页的 `JavaScript` 代码越来越庞大，越来越复杂。网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试……我们不得不使用软件工程的方法，来管理网页的业务逻辑。

于是，`JavaScript` 的模块化成为迫切需求。在 ES6 Module 来临之前，`JavaScript` 社区提供了强大支持，尝试在现有的运行环境下，实现模块的效果。

# 1.好的习惯——封装思维，不污染全局变量

以前，我们在页面上引入一个自定义的js文件，这个文件里面全是各式各样的**全局**函数和变量，这是很要命的。我们首先要学会封装的思维，比如，`index.html`的全部js代码应该放入`index.js`中，而`index.js`中应该这样写代码：

```
var Index = function(){
    var v1;
    var v2;

    function f1(){}
    function f2(){}

    return {f1:f1}
}();
```

这里有几点需要解释：

- `Index`变量是其后匿名函数立即执行的结果，而不是函数本身，也就是说，`Index`实际上是`{f1:f1}`
- 这是一种闭包形式，我们把f1函数返回，f1可能持有了v1,v2等变量，但是这些变量对于外界不可直接操作，v1,v2如果是全局（global）变量，就叫做污染全局变量，同时看到我们只返回了f1，那么可认为f2是一个私有函数，它辅助其他函数，但外界并不可直接调用，如果f2是一个全局函数（global），就叫做污染全局函数。
- 使用方式：

```
<script src="assets/scripts/index.js" type="text/javascript"></script>
...
jQuery(document).ready(function() {    
   Index.f1();
});
```

这样做，函数的归属很清晰，f1是Index专属的。如果你能改变以前的习惯，用这种方式封装自己的代码，已经是很大的进步了。

# 2.所谓模块，还有依赖

所谓模块，就是一个独立的闭包，它可能依赖别的模块，通常它会导出一些变量或者函数给别的模块使用，这样它也就被别的模块依赖了。

在实验1中，我们解决了封装和导出的问题，我们只导出我们想导出的部分，但还没有解决依赖的问题。假如index模块依赖jQuery，我们只能在html中提前引入jquery.js，就像这样：

```
<script src="assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="assets/plugins/jquery.ui-**.min.js" type="text/javascript"></script> 
<script src="assets/plugins/jquery.ui-**.min.js" type="text/javascript"></script>
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="assets/scripts/app.js" type="text/javascript"></script>
<script src="assets/scripts/index.js" type="text/javascript"></script>
<script src="assets/scripts/tasks.js" type="text/javascript"></script>   
```

`index`模块依赖`jquery`，其它模块可能依赖别的`jquery`插件，但现在这种依赖关系并不明显，即便进入`index`的源码看到`$`符号，你就能确认依赖`jquery`吗？`$`符号万一是之前引入的别的库的函数别名呢？

传统写法，jQuery和$都会暴露为全局函数。

我们能否明确当前模块所依赖的模块，就像JAVA里面的import那样？这是个问题。

# 3.CommonJS,服务端的模块化标准

> Javascript: not just for browsers any more! —— CommonJS Slogen

前端模块化的事实标准之一，2009 年 8 月，[CommonJS](http://wiki.commonjs.org/wiki/CommonJS) 诞生。

CommonJS 本质上只是一套规范，而 Node.js 采用并实现了部分规范，CommonJS Module 的写法也因此广泛流行。


让我们看看 Node 中的写法：

```js
var a = require('./a')  // 加载模块（同步加载）
a.doSomething()         // 等上一句执行完才会执行

exports.b = function(){ // 暴露 b 函数接口
  // do something
}
```

`exports`是一个内置对象，就像`require`是一个内置加载函数一样。如果你希望直接赋值一个完整的对象或者构造函数，覆写`module.exports`就可以了。

CommonJS 前身叫 ServerJS ，**后来希望能更加 COMMON，成为通吃各种环境的模块规范，改名为 CommonJS** 。CommonJS 最初只专注于 **Server-side**而非浏览器环境，因此它采用了同步加载的机制，这对服务器环境（硬盘 I/O 速度）不是问题，而对浏览器环境（网速）来说并不合适。


因此，各种适用于浏览器环境的模块框架与标准逐个诞生，他们的共同点是：

* 采用异步加载（预先加载所有依赖的模块后回调执行，符合浏览器的网络环境）
* 虽然代码风格不同，但其实都可以看作 CommonJS Modules 语法的变体。
* 都在向着 **COMMON** 的方向进化：**兼容不同风格，兼容浏览器和服务器两种环境**

本文接下来要讨论的典例是：

* RequireJS & AMD（异步加载，预执行，依赖前置。默认推荐 AMD 写法）

# 4.RequireJS & AMD

>由于 Node 原生支持模块的作用域，并不需要额外的 wrapper

这句话要解释下，node模块运行在node环境中，node环境原生支持`require`和`exports`等机制，因此无需额外转换。但是运行在浏览器中的js模块可不同，浏览器不支持这些语法，也就是如果像node那样去写网页js会得到一个错误：

```
var $ = require('jquery');
---
  require is not defined
```

我们需要一个额外的叫做**module-loader**的东西来提供导入导出支持，下面介绍著名的module-loader：**RequireJS** 

> RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments

RequireJS是一个js文件和模块加载器。

# 5.初步使用requirejs完成对jquery的依赖

## 实验步骤

当然首先要到requirejs的网站去下载js -> [压缩版](http://requirejs.org/docs/release/2.1.11/minified/require.js)，把代码粘贴到require.min.js并保存在`js/lib`目录下.

假设我们有这样的目录结构

```
.
├── modularize1.html          # 示例页面
├── js/                       
│   ├── lib/                  # 依赖的js库
│   |   ├── jquery.min.js             
│   |   ├── require.min.js           
├── app/                  
│   ├── modularize1.js        # 自定义js
│   ├── ...              
```

[modularize1.html](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/requirejsDemo/modularize1.html)只用一个`script`标签：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>模块化-require.js</title>
    </head>
    <body>
        <script data-main="js/app/modularize1.js" src="js/lib/require.min.js"></script>
    </body>
</html>
```

注意`script`标签的`data-main`属性，它指向的js文件将在`require.min.js`被加载后立即加载。

[modularize1.js](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/requirejsDemo/js/app/modularize1.js) :

```js
//通过配置，简化模块路径的使用
require.config({
    baseUrl:'js/',
    paths:{
        jquery:'lib/jquery.min'
    }
});

require(
    ['jquery'],
    function ($) {
      $('body').append('<h1>hello world</h1>')
    }
);
```

`require.config`用于做一些路径的配置，`require`函数的第一个参数用数组声明当前代码的所有依赖，由于`config`的作用，这里只需使用模块id而不是全路径，第二个参数是回调函数：依赖模块加载完成后立即执行。

现在页面上成功显示了一级标题`hello,world`

## 注意事项

1. jquery的模块id必须是'jquery'

2. 有时我们依赖的模块并没有按模块化规范将自己定义为一个amd模块，比如我们经常会用到的jquery插件。这个时候我们需要使用到`requireJS`的`shim`参数，以`jquery.form`插件为例

```
require.config({
    paths:{... },
    shim: {
        "jquery.form" : {
            deps : ["jquery"]   //声明jquery.form的依赖
        }
    }
})
```

这样配置之后我们就可以使用`jquery.form`了

```
require.config(["jquery", "jquery.form"], function($){
    $(function(){
        $("#form").ajaxSubmit({...});
    })
})
```

更多关于shim的细节，请移步→[官方文档](http://requirejs.org/docs/api.html#config-shim)

# 6.定义模块供他人使用

## 实验步骤

有时，我们不仅要依赖第三方模块，我们自己也要写一些模块给别人使用，下面看看如何自定义模块：

1. js/app目录下新建[myutils.js](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/requirejsDemo/js/app/myutils.js)，内容如下：

```
//通过配置，简化模块路径的使用
require.config({
    baseUrl:'js/',
    paths:{
        jquery:'lib/jquery.min'
    }
});

define(['jquery'],function($){
    var useful=function(){
        alert('i im useful');
    }

    return {useful:useful}; //导出函数
});
```

RequireJS规定一个文件只能定义一个模块。

`define`函数的第一个参数为导入当前模块所依赖的模块，此处没有用到jquery，只是示范这种形式。第二个参数用于返回对象或函数，返回的对象或函数将成为模块的导出，接下来我们看看怎么使用这个模块。

2. [modularize2.js](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/requirejsDemo/js/app/modularize2.js)同时依赖jquery和myutils.js：

```js
//通过配置，简化模块路径的使用
require.config({
    baseUrl:'js/',
    paths:{
        jquery:'lib/jquery.min',
        myutils:'app/myutils'  //新增
    }
});

require(
    ['jquery','myutils'],
    function ($,mu) {
    $('body').append('<h1>hello world</h1>');
    mu.useful();  //新增
    }
);
```

我们新增了对myutils的依赖，并调用了它的useful函数。

## 小结

实验2和实验3，就是对简单使用RequireJS进行模块化开发的示范。

# 7.导出直接运行函数和字面值对象

见[myutils2](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/requirejsDemo/js/app/myutils2.js)、[myutils3](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/requirejsDemo/js/app/myutils3.js)和[modularize3.js](https://coding.net/u/lanqiao/p/frontAdvance/git/blob/master/requirejsDemo/js/app/modularize3.js)。


# 8.相关阅读

- [SeaJS](http://seajs.org/docs/) 
- CMD Specification
    * [English (CMDJS-repo)](https://github.com/cmdjs/specification/blob/master/draft/module.md)
    * [Chinese (SeaJS-repo)](https://github.com/seajs/seajs/issues/242)
