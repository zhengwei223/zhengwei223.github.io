---
layout: post
title: 自定义利器——变量详解
category: boots-reference
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap 变量
description: Bootstrap的样式是用less来编写的，提供了很多基础的less变量和混入，下面就来具体看下bootstrap为我们提供了哪些常用的变量吧。
---

>Bootstrap的样式是用less来编写的，提供了很多基础的less变量和混入，下面就来具体看下bootstrap为我们提供了哪些常用的变量吧。 

# 基础颜色

不同程度的黑：

    @gray-base:              #000;
    @gray-darker:            lighten(@gray-base, 13.5%); // #222
    @gray-dark:              lighten(@gray-base, 20%);   // #333
    @gray:                   lighten(@gray-base, 33.5%); // #555
    @gray-light:             lighten(@gray-base, 46.7%); // #777
    @gray-lighter:           lighten(@gray-base, 93.5%); // #eee

`lighten`是一个函数，减轻的意思。

主品牌颜色及各种强调色：

    @brand-primary:         darken(#428bca, 6.5%); // #337ab7
    @brand-success:         #5cb85c;
    @brand-info:            #5bc0de;
    @brand-warning:         #f0ad4e;
    @brand-danger:          #d9534f;

# 脚手架（常用全局样式）

    //** `<body>`背景色
    @body-bg:               #fff;
    //** `<body>`文本颜色.
    @text-color:            @gray-dark;

    //** 超链接颜色.
    @link-color:            @brand-primary;
    //** 超链接悬停颜色，比超链接颜色深15%.
    @link-hover-color:      darken(@link-color, 15%);
    //** 鼠标悬停超链接装饰：下划线.
    @link-hover-decoration: underline;

# 排版

*字体、行高、标题等*

    // 不同字体定义
    @font-family-sans-serif:  "Helvetica Neue", Helvetica, Arial, sans-serif;
    @font-family-serif:       Georgia, "Times New Roman", Times, serif;
    //** Default monospace fonts for `<code>`, `<kbd>`, and `<pre>`.
    @font-family-monospace:   Menlo, Monaco, Consolas, "Courier New", monospace;

    // 选一种字体作为基础字体
    @font-family-base:        @font-family-sans-serif;
    // 文字大小
    @font-size-base:          14px;
    // 大字体
    @font-size-large:         ceil((@font-size-base * 1.25)); // ~18px
    // 小字体
    @font-size-small:         ceil((@font-size-base * 0.85)); // ~12px

    //**  各级标题的字号是计算出来的
    @font-size-h1:            floor((@font-size-base * 2.6)); // ~36px
    @font-size-h2:            floor((@font-size-base * 2.15)); // ~30px
    @font-size-h3:            ceil((@font-size-base * 1.7)); // ~24px
    @font-size-h4:            ceil((@font-size-base * 1.25)); // ~18px
    @font-size-h5:            @font-size-base;
    @font-size-h6:            ceil((@font-size-base * 0.85)); // ~12px

    //** 基础行高.
    @line-height-base:        1.428571429; // 20/14
    //** 通过计算得到行高
    @line-height-computed:    floor((@font-size-base * @line-height-base)); // ~20px

    //** 标题字体、行高、颜色略微不同.
    @headings-font-family:    inherit;
    @headings-font-weight:    500;
    @headings-line-height:    1.1;
    @headings-color:          inherit;

# 字体图标

    //** 字体所在路径
    @icon-font-path:          "../fonts/";
    //** 文件名
    @icon-font-name:          "glyphicons-halflings-regular";
    //** SVG文件中的元素ID.
    @icon-font-svg-id:        "glyphicons_halflingsregular";

# 随后至第281行都是关于组件的

# 媒体查询断点（通常不变）

    // 小设备、手机
    @screen-xs:                  480px;
    @screen-xs-min:              @screen-xs;
    @screen-phone:               @screen-xs-min;

    // 小设备、pad
    @screen-sm:                  768px;
    @screen-sm-min:              @screen-sm;
    @screen-tablet:              @screen-sm-min;

    // 中等屏幕、桌面电脑
    @screen-md:                  992px;
    @screen-md-min:              @screen-md;
    @screen-desktop:             @screen-md-min;

    // 大屏幕
    @screen-lg:                  1200px;
    @screen-lg-min:              @screen-lg;
    @screen-lg-desktop:          @screen-lg-min;

    // 各设备宽度上限
    @screen-xs-max:              (@screen-sm-min - 1);
    @screen-sm-max:              (@screen-md-min - 1);
    @screen-md-max:              (@screen-lg-min - 1);

# 网格布局系统

*定义你自己的响应式网格*

    //** 列数
    @grid-columns:              12;
    //** 槽，列与列之间的边距.
    @grid-gutter-width:         30px;
    //** 导航条折叠断点
    @grid-float-breakpoint:     @screen-sm-min;
    //** 768以下折叠导航条
    @grid-float-breakpoint-max: (@grid-float-breakpoint - 1);

# 布局容器的尺寸

    //## 定义在不同尺寸屏幕上的容器最大宽度

    // 小设备
    @container-tablet:             (720px + @grid-gutter-width);
    @container-sm:                 @container-tablet;

    // 桌面电脑
    @container-desktop:            (940px + @grid-gutter-width);
    @container-md:                 @container-desktop;

    // 大显示器
    @container-large-desktop:      (1140px + @grid-gutter-width);
    @container-lg:                 @container-large-desktop;

# 随后又是关于组件的

限于篇幅，本章把使用频率最高的变量以注释方式加以说明，剩下的变量大多是关于组件的，我们用到了再说。