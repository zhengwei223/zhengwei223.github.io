---
layout: post
title: 自定义利器——变量详解
category: Bootstrap入门实例教学
tags: Web前端 Bootstrap 
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 Web前端 Bootstrap 变量
description: Bootstrap的样式是用less来编写的，提供了很多基础的less变量和混入，下面就来具体看下bootstrap为我们提供了哪些常用的变量吧。
---

>Bootstrap的样式是用less来编写的，提供了很多基础的less变量和混入，下面就来具体看下bootstrap为我们提供了哪些常用的变量吧。 

# 基本变量

## 基础设置
变量名 | 变量值  | 说明  |
--- | --- | ---
@bodyBackground	| @white	| 页面背景色
@textColor	| @grayDark	| 默认的文字颜色
@linkColor	| #08c	 | 默认的链接颜色	 
@linkColorHover	| darken(@linkColor, 15%) | 默认链接hover样式

## 页面栅格

变量名 | 变量值  | 说明  |
--- | --- | ---
@gridColumns| 	12
@gridColumnWidth| 	60px
@gridGutterWidth| 	20px
@fluidGridColumnWidth| 	6.382978723%
@fluidGridGutterWidth| 	2.127659574%

## 字体

变量名 | 变量值  | 说明  |
--- | --- | ---
@sansFontFamily	 | “Helvetica Neue”, Helvetica, Arial, sans-serif
@serifFontFamily | 	Georgia, "Times New Roman", Times, serif
@monoFontFamily | 	Menlo, Monaco, “Courier New”, monospace
@baseFontSize | 	13px | 	以像素为单位
@baseFontFamily | 	@sansFontFamily
@baseLineHeight	 | 18px | 	以像素为单位
@altFontFamily	 | @serifFontFamily
@headingsFontFamily	 | inherit
@headingsFontWeight	 | bold
@headingsColor	 | inherit


## 表格tables
变量名 | 变量值  | 说明  |
--- | --- | ---
@tableBackground	 | transparent
@tableBackgroundAccent	 | #f9f9f9
@tableBackgroundHover	 | #f5f5f5
@tableBorder	 | ddd

## 冷色调
变量名 | 变量值  | 说明  |
--- | --- | ---

@black	#000	 
@grayDarker	#222	 
@grayDark	#333	 
@gray	#555	 
@grayLight	#999	 
@grayLighter	#eee	 
@white	#fff	 

## 暖色调
变量名 | 变量值  | 说明  |
--- | --- | ---

@blue | 	#049cdb	 
@green | 	#46a546	 
@red | 	#9d261d	 
@yellow | 	#ffc40d	 
@orange | 	#f89406	 
@pink | 	#c3325f	 
@purple | 	#7a43b6	 

# 组件变量

## 按钮buttons
变量名 | 变量值  | 说明  |
--- | --- | ---
@btnBackground | 	@white	 
@btnBackgroundHighlight | 	darken(@white, 10%) 
@btnBorder | 	darken(@white, 20%)	 
@btnPrimaryBackground | 	@linkColor	 
@btnPrimaryBackgroundHighlight | 	spin(@btnPrimaryBackground, 15%) 
@btnInfoBackground | 	#5bc0de	 
@btnInfoBackgroundHighlight | 	#2f96b4 
@btnSuccessBackground | 	#62c462	 
@btnSuccessBackgroundHighlight | 	51a351	 
@btnWarningBackground | 	lighten(@orange, 15%) 
@btnWarningBackgroundHighlight | 	@orange
@btnDangerBackground | 	#ee5f5b	 
@btnDangerBackgroundHighlight | 	#bd362f
@btnInverseBackground | 	@gray	 
@btnInverseBackgroundHighlight | 	@grayDarker	 
## 表单Forms
变量名 | 变量值  | 说明  |
--- | --- | ---
@placeholderText | 	@grayLight
@inputBackground | 	@white
@inputBorder | 	#ccc
@inputBorderRadius | 	3px
@inputDisabledBackground | 	@grayLighter
@formActionsBackground | 	#f5f5f5

## 表单Form提示背景及文字颜色
变量名 | 变量值  | 说明  |
--- | --- | ---
@warningText | 	#c09853	 
@warningBackground | 	#f3edd2	 
@errorText | 	#b94a48	 
@errorBackground | 	#f2dede	 
@successText | 	#468847	 
@successBackground | 	#dff0d8	 
@infoText | 	#3a87ad	 
@infoBackground | 	#d9edf7	 

## 导航栏
变量名 | 变量值  | 说明  |
--- | --- | ---
@navbarHeight	 | 40px	 
@navbarBackground | 	@grayDarker	 
@navbarBackgroundHighlight	 | @grayDark	 
@navbarText | 	@grayLight	 
@navbarLinkColor | 	@grayLight	 
@navbarLinkColorHover | 	@white	 
@navbarLinkColorActive | 	@navbarLinkColorHover
@navbarLinkBackgroundHover | 	transparent
@navbarLinkBackgroundActive | 	@navbarBackground
@navbarSearchBackground	 | lighten(@navbarBackground, 25%)
@navbarSearchBackgroundFocus | 	@white	 
@navbarSearchBorder | 	darken(@navbarSearchBackground, 30%) 
@navbarSearchPlaceholderColor | 	#ccc	 
@navbarBrandColor | 	@navbarLinkColor	 

## 下拉Dropdowns
变量名 | 变量值  | 说明  |
--- | --- | ---
@dropdownBackground | 	@white
@dropdownBorder | 	rgba(0,0,0,.2)
@dropdownLinkColor | 	@grayDark
@dropdownLinkColorHover | 	@white
@dropdownLinkBackgroundHover | 	@linkColor

## Hero unit
变量名 | 变量值  | 说明  |
--- | --- | ---
@heroUnitBackground	 | @grayLighter	 
@heroUnitHeadingColor | 	inherit	 
@heroUnitLeadColor | 	inhereit	 
