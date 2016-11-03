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
    previousTop : 0 ,
    header      : '.doc-title,.masthead' 
  }

  // 原型方法定义
  // ================================
  NavSlide.prototype.toggle = function () {
    var eHeight = this.$element.height();
    // 当前滚动高度
    var currentTop = $(window).scrollTop();
    // 检测是否向上滚动：向上
    if (currentTop < this.previousTop) {
      // 向上但并未到顶
      if (currentTop > eHeight && this.$element.css('display')=='none') {
        this.$element.css(
          {'background-color':'rgba(255,255,255,.9)',
           'position':'fixed',
           'top':0,
           'left':0,
           'right':0,
           'margin':'auto',
           'z-index':2,
           'border-bottom':'1px solid',
           'border-radius':'4px'
           })
          .show(this.options.speed)
      }
      if(currentTop <= eHeight ){
        // 向上到顶
        this.$element
          .css(
            {'background-color':'transparent',
             'top':0,
             'position':'relative',
             'border':'1px solid rgb(142, 207, 232)',
             'border-radius':'4px'
             })
          .show()
      }
    } else {  // 向下滚动
      // 如果滚动距离超过nav高度：隐藏
      if (currentTop > eHeight && this.$element.css('display')=='block')
        this.$element.hide(this.options.speed)
    }
    this.previousTop = currentTop;
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
