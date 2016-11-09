---
layout: post
title: HTML表格和表单
category: Web前端入门教程
tags: Web前端
author: 曹小虎
description: 这一小节的主要内容是用表格在网页里显示数据，用表单在网页里录入数据
keywords: lanqiao 蓝桥 全栈 教程 Web前端
---

> 本章目标

- 用表格显示数据
- 用表单录入数据

# 实验一：用表格绘制唐诗排行榜

目标：

这个实验将教会大家如何用多行多列数据表格在网页里显示一个唐诗排行榜。  

真实的数据内容节选自《中华书局》在2011年9月出版的一本书:[《唐诗排行榜》](http://baike.baidu.com/link?url=A_zpk-nTSWPDatg1FUSru3J7GRz7rRCIA78dM-PQR_BbMtUSo9_EY3TRblWMw7Ii5mpn7WvpStD5npLvUaJLGK)。

实验结束的时候，你将得到一个内容如下，而显示外观略有不同的数据表格:

 ![tangshi_top10_table](/public/img/html/tangshi_top10_table.png){:width="500px" height="400px"}

## 1.1 搭建表格结构

### 打开html文档

&emsp;&emsp;新建一个名字是“tangshi0top10.html”的网页，用鼠标右键选择“*Edit with Notepad++*”打开文件。

&emsp;&emsp;在文件里输入一个完整的html文档结构：

    <!DOCTYPE html>
    <html>
     <head>
      <!--告诉浏览器，用utf-8的编码格式显示网页内容-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <!--网页标题-->
    <title>唐诗排行榜-前十名</title>
    </head>
    <body>
     <!-- 页面内容区 -->
    </body>
    </html>

### 插入表头

&emsp;&emsp;表格的html标签的名字是“table”。

&emsp;&emsp;把下面的代码内容放到“页面内容区”，表格第一行里面的内容决定了表头怎么显示：

    <!--数据表格开始-->
    <table>
    <!-- 表格第一行开始 -->
    <tr>
     <!-- 总计12个表头元素开始 -->
     <!-- 每个表头元素都显示成当前行里面的一列 -->
     <th>排名</th>
     <th>诗名</th>
     <th>作者</th>
     <th>诗体</th>
     <th>时代</th>
     <th>古代选本</th>
     <th>现代选本</th>
     <th>历代评点</th>
     <th>论文篇数</th>
     <th>全录</th>
     <th>摘录</th>
     <th>文学史总</th>
     <th>网络连接总数</th>
     <th>综合指标</th>
     <!-- 总计12个表头元素结束 -->
    </tr>
    <!-- 表格第一行结束 -->
    </table>
    <!--数据表格结束-->

&emsp;&emsp;用Chrome浏览器打开页面，你会看到：

 ![tangshi_top10_th_effect](/public/img/html/tangshi_top10_th_effect.png){:width="500px" height="400px"}

### 插入第一行数据

&emsp;&emsp;从表格的第二行开始，每一行都代表了一条真实数据。

&emsp;&emsp;我们来向表格写入第一条数据。接着第一行结束的位置，插入第二行代码：

    <!-- 第一行数据内容开始 -->
    <tr>
     <!-- 总计12个数据元素开始-->
     <!-- 每个数据元素都显示成当前行里面的一列 -->
     <td>1</td>
     <td>黄鹤楼</td>
     <td>崔颢</td>
     <td>七律</td>
     <td>盛唐</td>
     <td>17</td>
     <td>24</td>
     <td>38</td>
     <td>1</td>
     <td>5</td>
     <td>4</td>
     <td>9</td>
     <td>135600</td>
     <td>0.8153</td>
     <!-- 总计12个数据元素开始 -->
    <tr>
    <!-- 第一行数据内容结束 -->

&emsp;&emsp;刷新页面，可以看到第一条数据的显示效果：

 ![tangshi_top10_1strow_data](/public/img/html/tangshi_top10_1strow_data.png){:width="500px" height="400px"}

### 录入其余数据

&emsp;&emsp;接下来的工作就是重复第一行做法，录入第2~10行的数据。

&emsp;&emsp;具体代码同学们可以依照图片内容自己动手填充，最终刷新页面你会看到样子如下的一个表格：

 ![tangshi_top10_full](/public/img/html/tangshi_top10_full.png){:width="500px" height="400px"}

## 1.2 修改表格属性

&emsp;&emsp;这一步，我们将通过修改[表格的属性](http://www.w3school.com.cn/tags/tag_table.asp)改变它的显示效果。

### border

&emsp;&emsp;在table的开始标签里面加入“border”的属性定义,比如，定义边框宽度5个像素。

&emsp;&emsp;修改之后table的开始标签代码如下：

    <table border="5">

&emsp;&emsp;刷新页面，可以看到：

 ![tangshi_taop10_border](/public/img/html/tangshi_taop10_border.png){:width="500px" height="400px"}

### cellspacing

&emsp;&emsp;这个属性的作用是定义td单元格之间的空白宽度。我们把这个属性定义成0个像素，也就是没有空白。

&emsp;&emsp;修改之后table的开始标签代码如下：

    <table border="5" cellspacing="0">   

&emsp;&emsp;刷新页面，可以看到：

 ![tangshi_top10_cellspacing_0](/public/img/html/tangshi_top10_cellspacing_0.png){:width="500px" height="400px"}

### cellpadding

&emsp;&emsp;这个属性定义了td、th单元格的边框与文字内容之间的空白宽度。我们把当前表格的这个属性定义为5个像素。

&emsp;&emsp;修改之后table的开始标签代码如下：

    <table border="5" cellspacing="0" cellpadding="5">

&emsp;&emsp;刷新页面，可以看到：

 ![tangshi_top10_cell_padding_5](/public/img/html/tangshi_top10_cell_padding_5.png){:width="500px" height="400px"}

## 1.3 给table元素内容分组

&emsp;&emsp;我们可以用thead、tbody和tfoot三个标签给table元素内容分组，它们分别定义了表格头（thead）、表格主体（table body）和表格页脚（table foot）。

&emsp;&emsp;按照HTML标准，当作为table元素的内容同时出现的时候，它们无需按照从上到下的顺序，依次出现，随意颠倒这个顺序不会影响表格的显示效果。

### 用thead标签定义表头

&emsp;&emsp;用thead标签来标记表格的第一行（表头内容），就是把原表格的第一行（tr元素）放到thead开始标签“\<thead\>”和结束标签“\</thead\>”之间。

&emsp;&emsp;代码如下：

     <!-- 表格头部开始 -->
     <thead>
          <!-- 表格第一行开始 -->
      <tr>
       <!-- 总计12个表头元素开始 -->
       <!-- 每个表头元素都显示成当前行里面的一列 -->
       <th>排名</th>
       <th>诗名</th>
       <th>作者</th>
       <th>诗体</th>
       <th>时代</th>
       <th>古代选本</th>
       <th>现代选本</th>
       <th>历代评点</th>
       <th>论文篇数</th>
       <th>全录</th>
       <th>摘录</th>
       <th>文学史总</th>
       <th>网络连接总数</th>
       <th>综合指标</th>
       <!-- 总计12个表头元素结束 -->
      </tr>
    <!-- 表格第一行结束 -->
     </thead>
     <!-- 表格头部结束 -->

### 用tbody标签定义表格体

&emsp;&emsp;用tbody标签标记表格的10条数据（表格主题内容），代码如下：

     <!-- 表格主体开始 -->
    <tbody>
         <!-- 第一行数据内容开始 -->
    <tr>
     <!-- 总计12个数据元素开始-->
     <!-- 每个数据元素都显示成当前行里面的一列 -->
     <td>1</td>
     <td>黄鹤楼</td>
     <td>崔颢</td>
     <td>七律</td>
     <td>盛唐</td>
     <td>17</td>
     <td>24</td>
     <td>38</td>
     <td>1</td>
     <td>5</td>
     <td>4</td>
     <td>9</td>
     <td>135600</td>
     <td>0.8153</td>
     <!-- 总计12个数据元素开始 -->
    <tr>
    <!-- 第一行数据内容结束 -->
    <!-- ...... 以下省略9行数据 ...... -->
    </tbody>
     <!-- 表格主体结束 -->

### 用tfoot标签定义表格页脚

&emsp;&emsp;用tfoot标签给表格增加一个页脚。内容如下：

     <!-- 表格页脚开始 -->
    <tfoot>
     <tr>
      <!-- 一个单元格横跨14列 -->
      <td colspan="14">这部分内容是页脚</td>
     </tr>
    </tfoot>
     <!-- 表格页脚结束 -->

&emsp;&emsp;给table元素内容分区本身不会改变表格头部和表格主体的显示外观。

&emsp;&emsp;因此此次刷新页面，我们会看到在表格地步新增了一个页脚的显示内容：

 ![tangshi_top10_tb_foot](/public/img/html/tangshi_top10_tb_foot.png){:width="500px" height="400px"}

## 1.4 增加表格标题

&emsp;&emsp;在HTML语言中，“caption”标签专门用于定义表格的标题。

&emsp;&emsp;一般而言，定义表格标题的“caption”元素都会出现在“thead”元素之前。

    <!-- 表格标题定义开始 -->
    <caption>唐诗排行榜统计前十名</cpation>
    <!-- 表格标题定义结束 -->
    <!-- 表格头部开始 -->
     

&emsp;&emsp;刷新页面，可以看到表格标题出现在表格的顶部正中央：

 ![tangshi_top10_tb_head](/public/img/html/tangshi_top10_tb_head.png){:width="500px" height="400px"}

---

# 实验一的解读

&emsp;&emsp;我们在实验一我们制作了一个展示唐诗排行榜的数据表格：  

1. 用到了table、tr、td、thead、tbody、tfoot和caption标签
2. 通过表格的属性修改表格的显示样式

## 对新标签的简要介绍

### table、tr、th、td

&emsp;&emsp;这几个标签都需要成对出现，包括开始标签和结束标签。

&emsp;&emsp;tr（table row）标签用来定义表格里的一行内容。

&emsp;&emsp;th（table head）标签用来定义表格第一行的一个表头内容，一个th元素占用表格里面的一列。

&emsp;&emsp;td（table data）标签用来定义表格数据行里的一个数据单元，一个td元素也占用表格里面的一列。

## 什么情况下使用表格

&emsp;&emsp;HTML table主要用于展现多行多列的数据表格。

&emsp;&emsp;表格中的每一行都描述了一件事情、或者对象；多行表格里面，每行数据都表示对同类型（有相同属性特征）的一个具体对象的完整描述。

&emsp;&emsp;比如说，实验二里的唐诗排行榜，一行数据描述了有关一首唐诗排行的细节信息，行内每一个数据单元的内容都是当前唐诗排行信息的单个属性、特征。每一列表头都定义了这个单个属性、特征的名称。

## 为什么给表格分区

&emsp;&emsp;用新标签把表格划分为头部、主体和页脚，本身不会改变表格的结构和外观。

### 更清晰的语法含义

&emsp;&emsp;这样做的一个好处是让HTML页面的表格表现出更加清晰的语法含义。

&emsp;&emsp;定义在thead元素里面的tr（table row）内容都是**表头**。tfoot里面的tr（table row）内容都是位于表格底部、对整个表格具有总结归纳性质的数据。这两者的内容都是关于**整个**表格**所有列**的公共信息。

&emsp;&emsp;tbody里面的tr（table row）内容都是表格的正式数据。

&emsp;&emsp;程序员可以借助这些标签快速定位、控制表格不同区域的内容，比如说用CSS修改表格数据行的外观样式。

### tbody单独滚动

&emsp;&emsp;当页面上一个表格非常庞大的时候，可以借助这种分区来优化表格的显示。比如说，让表格数据行垂直滚动。

&emsp;&emsp;实现这个效果需要借助一点CSS语法。

&emsp;&emsp;首先，修改thead元素的开始标签：

    <thead style="display:block;">

&emsp;&emsp;然后，修改tbody开始元素的开始标签：

    <tbody style="display:block;height:150px;overflow-y:auto;">

&emsp;&emsp;刷新页面之后，你会在tbody区域看到一个垂直滚动条，用鼠标选中垂直滚动条，上下拖动。

 ![tangshi_top10_tbody_scroll](/public/img/html/tangshi_top10_tbody_scroll.png){:width="500px" height="400px"}

&emsp;&emsp;这里我们提前用到了一些样式（style）代码，只是为了演示tbody单独滚动的情况，以后的CSS章节会深入讲解怎么把表格数据行里的单元格宽度控制好。


# 实验二：用表单提交数据

&emsp;&emsp;

# 实验二的解读

# 实验三：根据HTML标准验证网页语法

目标：  
&emsp;&emsp;时至今日，W3C组织已经发布了多个版本的HTML标准。在网页开发的过程中遵循最新的HTML标准可以让人们更容易通过搜索引擎找你的网站，也会帮助这些用户获得更好的上网体验。

&emsp;&emsp;本实验将和大家一起来验证自己的HTML代码是否遵循HTML标准。

# 实验三的解读



 
