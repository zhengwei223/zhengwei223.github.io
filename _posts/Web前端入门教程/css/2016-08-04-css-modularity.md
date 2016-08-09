---
layout: post
title: 较完善的CSS样式表管理模式
category: css
tags: css
author: 郑未
keywords: lanqiao 蓝桥 全栈  教程 css
description: 
importance: 2
---

个人或者团队需要将主要页面的布局用DIV图的模式按层次画出来，这个DIV图就是在设计原型的基础上，将页面中的主要模块使用的ID名、class名标注出来，方便建立维护文档以便将来进行修改与升级。

划分CSS结构，建立全局css及各模块css。在html页面中引用全局css、各模块css。

建立global.css（public.css）为全局css，在全局css中定义`* { … } body { … }`之类的全局样式。

关于模块CSS的划分，我们比较喜欢类似wordpress中的css划分方式， 

一般情况下通过类似下列结构划分：

- layout.css /* 整站布局 */
- public.css /* 公用组合样式 */
- header.css /* 页面头部区域样式 */
- sidebar.css /* 侧边栏区域样式 */
- main.css /* 主体区域样式 */
- footer.css /* 底部区域样式 */
- index.css /* 首页区域特有样式 */
- form.css /* 表单类样式 */


解释一下:

layout.css负责整个网站的**布局**，比如#header, #footer等布局的基本位置及样式设计；

public.css负责一些**公用**样式定义，因为一个class中可以使用`class='navbar font12px'`这种利用中间空格分隔的方法来应用多个class样式，所以可以定义一些比较常用的或者在特殊情况下需要修改的公用class，方便局部微调；

header.css、sidebar.css、footer.css等模块是对应头部、侧边栏、底部模块的css样式表，可以根据网站的具体需求来增减模块；

index.css是首页特有元素的css，因为首页的特殊性，我们在设计css的时候通常对首页进行特殊处理，一般情况下，首页是css最复杂的一个页面，有必要对首页的独有css元素进行归类放置

form.css是表单元素的样式表，表单虽然不难，但控制起来还是比较麻烦的，单独放到一个css文件里方便控制，当然，类似的其他ui元素你也可以这么处理。

最后,在各个样式表文件中写入样式。