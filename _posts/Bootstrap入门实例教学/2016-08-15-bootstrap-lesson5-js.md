---
layout: post
title: 4.交互效果：插件与js
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap 交互效果
description: 简单的交互效果可以用CSS实现，比如CSS3的动画和过渡特性，但是复杂的交互必须借住js的力量。boots集成了12个常用js插件，我们可以引入bootstrap.min.js来批量获得12个插件，也可以单独引入这些插件。本章将带领大家使用boots内置的部分插件，同时也会示范如何自定义插件。
---
>简单的交互效果可以用CSS实现，比如CSS3的动画和过渡特性，但是复杂的交互必须借住js的力量。boots集成了12个常用js插件，我们可以引入bootstrap.min.js来批量获得12个插件，也可以单独引入这些插件。本章将带领大家使用boots内置的部分插件，同时也会示范如何自定义插件。

# 一 collapse.js折叠插件

我们的响应式导航条依赖折叠（collapse）插件，插件是html、css、js配合作用的一个综合体，下面我们来解析折叠插件是如何发生作用的。

首先，导航条我们使用了 `navbar-collapse collapse`的组合样式，这个样式决定在折叠断点(`@grid-float-breakpoint`)之下导航条默认是隐藏的，如果显示导航列表是纵向显示的，大家可以到`navbar.less`中去看源码。

其次，折叠控制按钮在`navbar-header`中，它使用了`navbar-toggle collapsed`组合样式，这个样式决定在折叠断点之上按钮是不显示的。

    @media (min-width: 768px)
    .navbar-toggle {
        display: none;
    }

基础样式设定好之后，考虑折叠断点之下的交互效果：

button上面有这样两个属性：`data-toggle="collapse" data-target="#navbar"`，`data-toggle`指定交互类型，`data-target`指定交互目标——`#navbar`对应导航条的id属性。

当然交互效果不会因为我们这样设定就自然获得，这有赖于`collapse.js`(boots源码的js目录下)，在源码的最后，js监听了所有`data-toggle="collapse"`元素，对目标元素进行折叠或展示的toggle：

    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
      var $this   = $(this)

      if (!$this.attr('data-target')) e.preventDefault()

      var $target = getTargetFromTrigger($this)
      var data    = $target.data('bs.collapse')
      var option  = data ? 'toggle' : $this.data()

      Plugin.call($target, option)
    })

有兴趣的话，大家可自行研究源码。假设我们想独立使用这个插件不受`data-toggle`，`data-target`限定，应该怎么做呢？

单纯的button`<button type="button" class="navbar-toggle collapsed">`

js直接调用collapse插件：

    $('.navbar-toggle').on('click',function(e){
      $('#navbar').collapse('toggle');
    });

关于collapse插件的更多知识，请查看[此处](http://v3.bootcss.com/javascript/#collapse)。

# 二 使用affix插件：博客文章页固定右侧“文章目录”

博客文章页，和我们的首页非常相似，不同的是正文是一篇文章，侧边栏换作文章的一级标题目录：

    <main>
      <div class="container">
        <div class="row">
          <!-- Post Container -->
          <div class="col-lg-8 col-lg-offset-1 col-md-8 col-md-offset-1 post-container">
            <!-- 文章正文 -->
          </div><!-- /post-container -->

          <!-- Sidebar Container -->
          <div class="
          col-lg-3 
          col-md-3 
          sidebar-container">
          <!-- table of content -->
            <!-- 文章目录 -->
          </div><!-- /sidebar-container -->
        </div><!--/row-->
      </div>
    </main><!-- main -->

具体示例代码很长，这里不贴出，可移步[post.html](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/blog/post.html)去查看。同时我们对右侧目录列表样式做了优化，可查看[custom.less](https://coding.net/u/lanqiao/p/bootstrapDemo/git/blob/master/assets/less/__custom.less)`doc-sidebar`部分。

![文章页正文和侧边栏](/public/img/boots/5.1.png)   

现在我们的需求是，将右侧导航固定下来，因为文章很长，往下滚动之后右侧导航就不见了。这时我们就要用到affix插件。我们可以用`data-*`或者手工使用js来使用affix，无论哪种方式，都要指定我们想要固定部分的css位置和宽度属性。下面用`data-*`的方式：

    <nav class="doc-sidebar hidden-print" data-spy="affix" data-offset-top="320" data-offset-bottom="200">

`data-spy`用于和插件关联，`data-offset-top`为插件做配置，设定滚动320像素时，`nav`组件添加样式`.affix`，`data-offset-bottom`为插件做配置，设定离底部200像素时，`nav`切换样式为`.affix-bottom`。现在我们需要定义`.affix`和`.affix-bottom`样式：

    // 固定在离顶端60px的地方
    .affix{
      top:60px;
      position: fixed;
    }
    // 接近底部时切换为绝对定位
    .affix-bottom{
      position: absolute;
    }

效果如下：

![](/public/img/boots/5.2.gif)   

# 三 使用ScrollSpy插件：监听页面滚动，自动高亮右侧目录

现在我们想要这样一个效果，当页面滚动到某个标题区域内时，右侧目录它对应的超链接自动高亮：

![](/public/img/boots/5.3.gif)   

很简单，步骤只有两个：

- `<body data-spy="scroll" data-target=".doc-sidebar">`，给body绑定插件，监控滚动条，需要突出状态的目标是我们的侧边栏
- 给body添加样式：  `position: relative;`

注意：要想正确地高亮活动链接，scrollspy需要配合boots的nav标签来使用。

# 四 自定义插件：实现顶部导航条随滚动淡入淡出

我们想要这样一种效果：页面往下滚动时自动隐藏顶部导航条，页面往上滚动时恢复它：

![](/public/img/boots/5.4.gif) 

现在我们模仿boots内置插件来写一个自己的插件并规定只要`.navbar`附加了`.navbar-slide`样式，我们就添加这样的效果。jQuery的插件编写有一定的套路，jQuery 插件一般可以总结为以下[模板](https://github.com/geetarista/jquery-plugin-template/blob/master/jquery.plugin-template.js)：

    (function($) {
      // Main plugin function
      $.fn.PLUGIN = function(options) {
        // snip...
      };

      // Public plugin function
      $.fn.PLUGIN.FUNCT = function() {
        // Cool JS action
      };

      // Default settings for the plugin
      $.fn.PLUGIN.defaults = { /* snip... */ };

      // Private function that is used within the plugin
      // snip...
    })(jQuery);
    
简言之就是往 $.fn 上添加新成员，有部分插件还会往 $ 上添加成员。

我们再来看通过模板演绎出来的更为复杂的编程模型：

    /* ========================================================================
     * lanqiao: plugin-navslide.js v1.0.1
     * ========================================================================
     * Copyright 2011-2016 lanqiao.
     * Licensed under MIT 
     * ======================================================================== */

    // IIFE
     +function ($) {
      'use strict';

      // 类定义：构造函数初始化属性
      // ================================

      var NavSlide = function (element, options) {
        // 选取元素
        this.$element      = $(element)
        // 合并默认选项和指定选项
        this.options       = $.extend({}, NavSlide.DEFAULTS, options)
      }

      // 静态常量定义
      // ================================
      NavSlide.VERSION  = '1.0.1'
      NavSlide.TRANSITION_DURATION = 100
      NavSlide.DEFAULTS = {
        speed       :'slow',
        previousTop : 0 
      }

      // 原型方法定义
      // ================================
      NavSlide.prototype.*** = function () {
        ...
      }



      // NavSlide PLUGIN DEFINITION
      // ==========================
      // 工厂，用于初始化插件并缓存，根据参数可能会直接调方法
      function Plugin(option) {
        return this.each(function () {
          var $this   = $(this)
          // 判断是否初始化过的依据
          var data    = $this.data('bs.navslide')
          // 传递对象作为配置对象
          var options = typeof option == 'object' && option
          // 合并data-api
          options = $.extend({}, $this.data(), options)
          // 如果没有初始化过, 就初始化它
          if (!data) 
            $this.data('bs.navslide', (data = new NavSlide(this, options)))
          
          // 参数为字符串且为toggle
          if (option == 'toggle') 
            data.toggle()
        })
      }

      // 事件代理, 智能初始化
      // =================

      $(window).on('scroll.bs.navslide.data-api',function (e) {
        Plugin.call($('.navbar.navbar-slide'),'toggle')
      });

      var old = $.fn.navslide;
      // 暴露为jquery插件, 外部可以用js来使用插件
      $.fn.navslide             = Plugin
      // 将插件类暴露给外界，这样可以修改和添加类里面的方法了
      $.fn.navslide.Constructor = NavSlide
      
      // 冲突处理
      // ==================
      $.fn.navslide.noConflict = function () {
        $.fn.navslide = old
        return this
      }

      // commonJS support
      if (typeof(module) !== 'undefined')
      {
        module.exports = Plugin;
      }
      // requirejs(AMD) support
      if (typeof define === 'function' && define.amd) {
        define([], function () {
          'use strict';
          return Plugin;
        });
      }
      // seajs(CMD) support
      if (typeof define === 'function') {
        define([], function () {
          'use strict';
          return Plugin;
        });
      }

    }(jQuery);


这个模型由插件类定义、工厂定义、冲突处理、事件绑定和模块化支持等几个部分组成，如果你看不明白，可以看看[IIFE](http://suqing.iteye.com/blog/1981591/)和[jQuery插件开发的五种形态小结](http://www.jb51.net/article/61694.htm).

接下来我们关注`NavSlide.prototype.toggle`方法的实现：

    // ================================
    NavSlide.prototype.toggle = function () {
      // 元素高度
      var eHeight = this.$element.height();
      // 当前滚动高度
      var currentTop = $(window).scrollTop();
      // 检测是否向上滚动：向上
      if (currentTop < this.previousTop) {
        this.$element.show(this.options.speed)
      } else {  // 向下滚动
        // 如果滚动距离超过nav高度：隐藏
        if (currentTop > eHeight)
          this.$element.hide(this.options.speed)
      }
      this.previousTop = currentTop;
    }

`plugin-navbar-slide.js`的完整代码请查看[plugin-navbar-slide.js](https://coding.net/u/lanqiao/p/bootstrapDemo/git/tree/master/blog/plugin-navbar-slide.js)。

现在我们看看在[post.html](https://coding.net/u/lanqiao/p/bootstrapDemo/git/tree/master/blog/post.html)如何使用这个插件：

- 导入js:`<script src="plugin-navbar-slide.js"></script>`
- 给nav标签添加样式：`<nav class="navbar navbar-default navbar-fixed-top navbar-slide " data-speed="500">`，`data-speed`为可选，代表滑入滑出持续的毫秒数

# 五 小结

下面我们来清点一下本章的知识要点：

- 响应式导航条利用了collapse插件，我们做了深入的解析，通过掌握这部分内容，在任意地方都可以单独使用这个插件
- 我们用affix和scrollspy插件完成了非常实用的功能，固定且随内容高亮的toc侧边栏
- 最后我们示范了如何自定义一个监听滚动让顶部导航条显示/隐藏的插件，这个插件有一定的复杂度，它综合使用了面向对象、jquery、dom操作等知识

通过本章，我们的知识体系更为完整。我们完全熟悉了boots的基础样式、组件和插件的概念及使用。当然，我们只能通过示范部分样式、组件和插件的使用来帮助大家掌握思路，更强大的能力需要大家通过项目来实践。
