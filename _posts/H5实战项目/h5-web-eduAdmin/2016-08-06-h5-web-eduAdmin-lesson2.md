---
layout: post
title: 完成首页页头区
category: h5-web-eduAdmin
tags: Git H5 项目 实战 HBuilder
author: 郑未
keywords: lanqiao 蓝桥 培训 教程 H5 项目 实战 HBuilder
description:
importance: 2
---

# 课程目标

利用上一章的项目模板新建HBuilder项目,并完成**蓝桥教学教务管理系统**的页头区。

# 下载-安装HBuilder-初始化项目
访问下面网站下载最新的 HBuilder 安装文件
[http://www.dcloud.io/](http://www.dcloud.io/)

下载相应操作系统的安装文件并安装。


### 新建项目
- 命名为eduAdmin
- 将bb_template中的内容全部拷入eduAdmin项目

# 页面基本结构
企业网站的主页一般分为三个部分：

- 页头区
  - logo
  - 带下拉菜单的主导航、二级和实用链接导航
  - 登录注册选项
- 主内容取
  - 布局复杂，可分为多拦
- 页脚区
  - 包含多拦链接和信息
  
找到首页中的这个注释和段落：

``` html
<!-- Add your site or application content here -->
<p>Hello world! This is HTML5 Boilerplate.</p>
``` 

替换为以下内容：

``` html
<header role="bannner">
	<nav role="navigation"></nav>
</header>
        
<main role="main">
  	<h1>主页头</h1>
	<p>本页的主要内容</p>
</main>

<footer role="contentinfo">
	<p><small>版权所有&copy;蓝桥软件学院</small></p>
</footer>
```

这就是我们页面的基本结构了。

# 导航条

### 拷贝代码

我们从Bootstrap基本的导航条开始，从Bootstrap文档中拷贝导航条代码，代码位置：

  bootstrap-3.3.7/docs/examples/navbar-static-top/index.html

  将以下代码

```
<!-- Static navbar -->
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="../navbar/">Default</a></li>
            <li class="active"><a href="./">Static top <span class="sr-only">(current)</span></a></li>
            <li><a href="../navbar-fixed-top/">Fixed top</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
```

拷贝至header标签下，取代原有nav标签，并在新mav标签属性中添加`role="navigation"`

在HBuilder-浏览器运行后可显示这样的页面效果

![image](/public/img/h5/boot-nav1.png)


可以看到这并不是我们心目中的导航条，这是因为我们现在还没有链接css样式表

### 编译并链接Bootstrap样式表
如果你之前没有编译过less文件，需要下载和安装它的编译器。

- windows用户，下载安装：
  
  WinLess（免费桌面应用），地址为[http://winless.org](http://winless.org)
  
- Mac用户，可以选择下载
  
  Crunch应用（免费），地址为[http://crunchapp.net](http://crunchapp.net)
  
  CodeKit(收费)，地址为[http://incident57.com/codekit/](http://incident57.com/codekit/)

本文以Crunch为例，演示如果编译less文件，输出css文件：

- 打开软件，选择“Open Folder”
- 找到less文件夹，select确认
- 可以看到less文件夹下的less文件全部被导入了，bootstrap.less文件就是我们要编译输出的文件，以为它已经引入了其余全部的less文件
- 双击该文件，找到编译输出的方式，Crunch的输出按钮在最右侧一列功能按钮的最上面一个
- 点击输出，设置输出的路径和文件名，我们需要将输出文件名改为main.css（因为index.html中我们链接了这个文件），输出路径选择为和less平级的css文件夹（如果没有，请新建一个）：

![image](/public/img/h5/crunch-outputcss.png)

- 点击save，检查下css目录下是否有main.css文件，如果有，这时可以到HBuider中重新运行index.html

经过上述步骤，应该可以看到index.html的运行效果，和之前不一样了，导航条的样式已经出来了：

![image](/public/img/h5/boot-nav2.png)

# 代码解读

在解读代码之前，我们先做个微调：在index.html中删除对normalize.css的链接，因为这个样式表已经包含在Bootstrap中了（bootstrap.less中第一个导入的）。

**代码解读**

- 导航条容器nav标签 

```
<nav class="navbar navbar-default navbar-static-top">
```

`navbar navbar-default` 指定nav标签为导航条默认样式（这些样式已经定义好了）

`navbar-static-top` 设定导航条能固定在窗口顶部，随页面滚动而滚动。

`<div class="container">`定义一个容器

- 导航条头部 `<div class="navbar-header">`

下面主要是两个部分，第一部分是一个**响应式按钮**，在宽屏情况下不显示，在窄屏情况下显示，且这个按钮上的点击事件已经被定义，即展开或收缩导航菜单。现在大家可以把浏览器横向拉窄以了解其效果：

![image](/public/img/h5/navbar-header.png)

button的效果得益于`type="button" class="navbar-toggle collapsed"`

`data-toggle="collapse"`说明该按钮的**预期行为**为展开-收缩

`data-target="#navbar"`说明**预期目标**为`#navbar`，这是一个id选择器，在下方能找到id为navbar的div。

`aria-*`的作用就是描述这个tag在可视化的情境中的具体信息，这里描述了按钮绑定到navbar并且默认为收缩状态。

button容器下的三个`<span class="icon-bar"></span>`用来创建按钮中的三道杠。

第二部分是一个超链接，brand（商标），用于显示项目名称或者logo，通过它可以链接回首页。

我们可以替换它，例如：

```
<a class="navbar-brand" href="#"><img src="img/brand.png" alt="蓝桥" height="100%"/></a>
```

- navbar主体部分  `<div id="navbar" class="navbar-collapse collapse">` 把导航项包装起来。

注意，它的id很重要，前面按钮关联的**预期目标**就是用id来关联的。

这下面是两个无序列表：

- - 第一个ul

第一个ul  `<ul class="nav navbar-nav">`  是靠左一行展开的导航菜单：

`<li class="active"><a href="#">Home</a></li>` 是第一个菜单项，链接到首页，`class="active"`说明这是默认被选中的菜单，我们可以把英文改为中文。

第二个菜单项类似，链接到“关于”页。

第三个菜单项类似，链接到“联系我们”页。

第四个菜单项稍微复杂，是一个带下拉菜单的复合式菜单，`class="dropdown"`说明它带下拉样式：

随后是控制下拉菜单的按钮`<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">`  我们可以编辑其文字为我们需要的内容，如“学生管理”。

data-toggle说明按钮的**预期行为**为下拉抽屉式菜单。

随后是下拉菜单列表的子项的定义：

这些列表项比较普通，特殊的是，我们可以分组并插入分割线：

```
<li role="separator" class="divider"></li>   <!--分割线-->
<li class="dropdown-header">Nav header</li>  <!--分组标题-->
```

我们可以根据自己的需要进行修改。

 - - 第二个ul

与第一个ul不同，这个ul多一个样式类`navbar-right`，说明它是靠右的。

其下是各个菜单项，我们可以改为自己需要的。


# 做适当修改

这些菜单项和子项，都应该修改为我们业务所需的。修改好的代码和效果如下：

```
<nav class="navbar navbar-default navbar-static-top">
  <div class="container">
  	<!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#"><img src="img/brand.png" alt="蓝桥" height="100%"/></a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#contact">联系我们</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" 
          	role="button" aria-haspopup="true" aria-expanded="false">
          		学生管理 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">信息维护</a></li>
            <li><a href="#">档案审核</a></li>
            
            <li role="separator" class="divider"></li>
            <li class="dropdown-header">班级操作</li>
            <li><a href="#">合班、并班</a></li>
            <li><a href="#">状态维护</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">登录</a></li>
        <li class="active"><a href="#">注册</a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>
```

效果如下：

![image](/public/img/h5/eduAdmin-nav.png)

# 支持IE8

要支持IE8，需要一段js代码让浏览器能够响应媒体查询，步骤如下。

1）打开[https://github.com/scottjehl/Respond](https://github.com/scottjehl/Respond)

2）下载ZIP

3）解压缩，找到名为response.min.js文件，或者直接在网页上找到该文件，拷贝其内容

4）复制到项目文件夹中的js/vendor目录下，与jQuery和Modenizr放到一块

5）在index.html中加载Modernizr的代码下面，添加这几行：

```
<!--[if (lt IE 9) & (!IEMobile)]>
 <script src="js/vendor/respond.min.js"></script>
<![endif]-->
```

6）这样IE8就可以支持媒体查询响应视口大小变化了。

# 小结

我们已经有了一个完善的HTML5标签结构，内置了很多最佳实践；

一个标准的Bootstrap样式表文件，并已链接；

能够正常工作的js插件；

一个响应式导航条；

随时可以派上用场的less编译器。












