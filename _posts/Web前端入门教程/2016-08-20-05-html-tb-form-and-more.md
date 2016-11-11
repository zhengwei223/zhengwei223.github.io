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
- 用表单收集用户数据

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

&emsp;&emsp;实现这个效果需要在HTML元素的**style**属性里面写入一点**样式代码**。

&emsp;&emsp;首先，修改thead元素的开始标签：

    <thead style="display:block;">

&emsp;&emsp;然后，修改tbody开始元素的开始标签：

    <tbody style="display:block;height:150px;overflow-y:auto;">

&emsp;&emsp;刷新页面之后，你会在tbody区域看到一个垂直滚动条，用鼠标选中垂直滚动条，上下拖动。

 ![tangshi_top10_tbody_scroll](/public/img/html/tangshi_top10_tbody_scroll.png){:width="500px" height="400px"}

&emsp;&emsp;这里我们提前用到了一些样式（style）代码，只是为了演示tbody单独滚动的情况，以后的CSS章节会深入讲解怎么把表格数据行里的单元格宽度控制好。


# 实验二：用表单收集用户数据

目标：

在网页上HTML表单被用于收集用户输入的内容，然后把这些数据上传到万维网上的网站服务器。

这个实验将制作一个网站新用户的注册表单。 

 ![user_register_form](/public/img/html/user_register_form.png){:width="300px" height="300px"} 

## 2.1 插入表单元素

&emsp;&emsp;表单的HTML标签是“from”。

### 使用form标签

&emsp;&emsp;首先，在Notepad++里打开一个空白文档，输入下面的html文档结构：

    <!DOCTYPE html>
    <html>
     <head>
      <!--告诉浏览器，用utf-8的编码格式显示网页内容-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <!--网页标题-->
    <title>注册表单</title>
    </head>
    <body>
     <!-- 页面内容区 -->
    </body>
    </html>

&emsp;&emsp;保存这个新文件，名称是“userRegister.html”。

&emsp;&emsp;然后在“页面内容区”写入一个表单元素：

    <!-- 表单元素开始 -->
    <!-- 表单的名称是“userRegister”-->
    <form name="userRegister">
     <!-- 表单内容区 -->
       <h1>用户注册</h1>
    </form>
    <!-- 表单元素结束 -->

&emsp;&emsp;刷新页面，可以看到下面的页面效果：

 ![userRegister_form_step_01](/public/img/html/userRegister_form_step_01.png){:width="300px" height="300px"} 

## 2.2 定义“联系方式”输入区

### 使用文本输入框

&emsp;&emsp;我们需要两个文本框，让用户填写他们的手机号码和邮箱地址。

&emsp;&emsp;在表单元素内容区插入下面的代码：

      <!-- 
           标签文字和input元素一起放入label元素的内容区，
           这样做可以把标签（label）和输入元素（input）绑定起来 
      -->
      <label>
      <!-- label元素内容区开始 -->
      手机：
      <!-- 类型为“文本”的输入元素，name属性可以自定义，比如“username” -->
      <input type="text" name="username" />
      <!-- label元素内容区结束 -->
	  </label>
	  
      <label>
      <!-- label元素内容区开始 -->
	  邮箱：
      <!-- 类型为“文本”的输入元素，name属性可以自定义，比如“email” -->
      <input type="text" name="email" />
      <!-- label元素内容区结束 -->
      </label>

&emsp;&emsp;刷新页面，可以看到页面上出现了两个文本框：

 ![userRegister_form_step_02](/public/img/html/userRegister_form_step_02.png){:width="300px" height="300px"} 

### 使用内容分区和无序列表

&emsp;&emsp;我们需要一个fieldset元素，把“手机”和“邮箱”两个文本输入元素放到同一个页面分区里。

&emsp;&emsp;同时，为了让两个文本框从上到下排列，我们也要用到无序列表。

&emsp;&emsp;具体做法如下：

    <fieldset>
    <!-- fieldset内容区开始 -->
     <!-- fieldset标题 -->
     <legend>联系方式</legend>

     <ul style="list-style-type: none;">
     <!-- 无序列表内容区开始 -->
       <li>
          <!-- 区域一 -->
       </li>
       <li>
          <!-- 区域二 -->
       </li>
     <!-- 无序列表内容区结束 -->
     </ul>
    <!-- fieldset内容区结束 -->
    </fieldset>

&emsp;&emsp;把之前的两个label元素分别移动到“区域一”和“区域二”内，刷新页面之后可以看到：

 ![userRegister_form_step_03](/public/img/html/userRegister_form_step_03.png){:width="300px" height="300px"} 

## 2.3 定义“个人信息”输入区

&emsp;&emsp;比照“联系方式”分区的定义，我们需要一个新的，让用户输入“个人信息”的页面分区。

&emsp;&emsp;接着上面一个fieldset定义结束的位置，我们开始定义新的“个人信息”分区，码如下：

    <fieldset>
     <legend>个人信息</legend>
     <ul style="list-style-type: none;">
       <!-- 输入元素定义区 -->
     </ul>
    </fieldset>

### 插入“称呼”输入元素

&emsp;&emsp;在无序列表里插入如下代码：

    <li>
      <label>
                  <!-- 两个radio类型的输入元素,name属性可以自定义，比如都取“gender”这个值 -->
                  <!-- 二者只能选中其一，用于让用户输入自己的性别信息-->
            称呼：<input type="radio"  name="gender" value="1">先生</input>
                 <input type="radio"  name="gender" value="0">女士</input>
      </label>
    </li>


&emsp;&emsp;刷新页面，页面上可以看到新增的“个人信息”分区，还有输入“称呼”信息的元素：

 ![userRegister_form_step_04](/public/img/html/userRegister_form_step_04.png){:width="300px" height="300px"} 

### 插入头像文件输入元素

&emsp;&emsp;我们需要让用户在表单里选择一个自己喜欢的头像图片，这就要在表单里插入一个“file”类型的input元素。

&emsp;&emsp;代码如下：

    <li>
     <label>
            <!-- input元素类型是“file”，name属性可以自定义，比如“headimg” -->
     头像：  <input type="file" name="headimg" />
     </label>
    </li>

&emsp;&emsp;刷新页面，页面上就多了一个可以选择文件的input控件。

 ![userRegister_form_step_05](/public/img/html/userRegister_form_step_05.png){:width="300px" height="300px"} 

&emsp;&emsp;你只需要点击“选择文件”的按钮，然后找到并且打开自己的头像文件就可以了。

 ![userRegister_form_step_06](/public/img/html/userRegister_form_step_06.png){:width="400px" height="400px"} 

### 插入“名称”和“密码”输入元素

&emsp;&emsp;这一步，我们一共插入三个输入（input）控件：名称、密码、确认密码。

&emsp;&emsp;用户在“名称”输入框输入自己的账户名，在密码框输入账号密码，然后在第二个密码框里确认自己是真的想要用这个登录密码。

&emsp;&emsp;具体代码如下：

    <li>
    <label>
    名称：  <input type="text" name="username" />
    </label>
    </li>
    
    <li>
    <label>
             <!--  input元素类型是“password”，name属性可以自定义，比如“password” -->
    密码：    <input type="password" name="password" />
    </label>
    </li>
    
    <li>
    <label>
             <!--  input元素类型是“password”，name属性可以自定义，比如“_password” -->
    确认：    <input type="password" name="_password" />
    </label>
    </li>

&emsp;&emsp;完成之后刷新页面，可以看到页面新增了三个输入控件：

 ![userRegister_form_step_07](/public/img/html/userRegister_form_step_07.png){:width="400px" height="400px"} 

### 使用下拉列表、多选框和多行文本控件

&emsp;&emsp;这一步，我们要在网页上展示一个下拉列表和一组多选框。

&emsp;&emsp;首先使用下面的代码，在表单里插入一个下拉列表：

    <li>
    <label>
           <!-- 下拉列表元素的标签名是“select” -->
           <!-- 下拉列表元素的name属性可以自定义，比如“agegroup” -->
    年龄段：<select name="agegroup">
             <!-- 
                 1.下拉列表选项的标签名是“option”，
                 2.每个选项都有一个“value”属性 
                 3.option元素开始标签<option>和结束标签</option>之间的内容，
                   是这个选项在页面上显示的文字
             -->
             <option value ="0">1~20</option>
             <!-- 开始标签里面的“selected”表示，这个选项是默认值 -->
             <option value ="1" selected>21~30</option>
             <option value="2">31~40</option>
             <option value="3">41~50</option>
		     <option value="4">50~120</option>
            </select>
    </label>
    </li>

&emsp;&emsp;然后使用下面的代码，在页面插入一组多选框：

    <li>
    <label for="favorite">
         <!--  多选框input元素类型是“checkbox”，name属性可以自定义，比如“favorite” -->
         <!--  位于同一组多选框的name属性必须保持一致 -->
         <!--  同组内的每一个多选框value属性的值不相同、页面上显示的文字不同 -->
    最爱：<input type="checkbox" name="favorite"  value="唐诗">唐诗</input>
         <input type="checkbox" name="favorite"  value="宋词">宋词</input>
         <input type="checkbox" name="favorite"  value="元曲">元曲</input><br/>
         <input type="checkbox" name="favorite"  value="明清散文">明清散文</input>
         <input type="checkbox" name="favorite"  value="明清小说">明清小说</input>
         <input type="checkbox" name="favorite"  value="民国科幻">民国科幻</input>
    </label>
    </li>

&emsp;&emsp;刷新页面，在页面上可以看到新增的组件。经过测试，下拉列表有默认值 多选框也能正常工作：

 ![userRegister_form_step_08](/public/img/html/userRegister_form_step_08.png){:width="400px" height="400px"} 

&emsp;&emsp;使用下面的代码在表单里插入多行文本控件：

    <li>
    <label>
         <!--  多行文本控件的标签名是“textarea”，name属性可以自定义，比如“selfIntroduction”  -->
         <!--  
           rows属性和cols属性的出现规定多行文本框以字符数计算的高度和宽度，分别是3行、50列 
         -->
    自述：<textarea name="selfIntroduction"  rows="3" cols="50"></textarea>
    </label>
    </li>

&emsp;&emsp;再次刷新页面，页面上就可以看到一个多行文本框组件了：

 ![userRegister_form_step_09](/public/img/html/userRegister_form_step_09.png){:width="400px" height="400px"} 


## 2.4 提交表单

&emsp;&emsp;仅有上面的这些给用户填充数据的界面控件，还不是一个完整的表单。

### 定义相关的表单属性

&emsp;&emsp;涉及表单提交的两个关键属性是“action”和“method”。

&emsp;&emsp;我们在form元素的开始标签里面加入下面的代码就行了：

      <!-- "action"属性指向一个可以处理用户数据的万维网地址 -->
      <!-- "method"属性定义了表单的提交方式,这里的值是“get” -->
     <form action="http://mycorporation.com.cn/vistor/rgister.do" method="get"
           name="userRegister">

### 定义动作按钮

&emsp;&emsp;我们需要在表单里面定义一个提交（submit）表单的按钮，一个重置（reset）表单的按钮。

&emsp;&emsp;具体代码如下：

    <!-- 提交按钮的input元素类型是“submit”，name属性可以自定义，比如“submit”   -->
    <!-- submit按钮被点击之后，整个表单的数据会被送到网站服务器   -->
    <input type="submit" name="submit" value="提交（submit）"/>
    <!-- 提交按钮的reset元素类型是“reset”，name属性可以自定义，比如“reset”   -->
    <!-- reset按钮可以帮助你一次性清除掉你想要丢弃的问题数据   -->
    <input type="reset" name="reset" value="清空（reset）"/>


&emsp;&emsp;最后，刷新页面，我们可以看到一个最终完成的表单：

 ![userRegister_form_step_10](/public/img/html/userRegister_form_step_10.png){:width="400px" height="400px"} 

&emsp;&emsp;你可以尝试输入自己的信息来提交表单了！


# 实验二的解读

&emsp;&emsp;在实验二里，我们制作了一个注册网站新用户的表单。

&emsp;&emsp;表单的功能就是把用户在页面上输入的各种信息发送到网站服务器。

 ![when-you-submit-form](/public/img/html/when-you-submit-form.png){:width="400px" height="400px"}

## input元素

&emsp;&emsp;我们在表单内容区用到最多的是input元素。

&emsp;&emsp;**input元素**的用途就是让人用它**输入**某种信息。

&emsp;&emsp;在英文里“input”既是动词也是名词。因此，它的字面含义，除了有“人跟界面互动的动作”意外，应该还包含动作完成以后、留在界面上的数据。

&emsp;&emsp;根据属性“type”的不同取值，input元素能给我们提供不同类型的输入界面，比如：文本输入框，密码输入框、文件选择框、单选按钮、多选按钮、提交按钮和重置按钮。

&emsp;&emsp;W3School[input元素的type属性](http://www.w3school.com.cn/tags/tag_input.asp)页面有关于这个属性的完整的介绍。

&emsp;&emsp;我们刚才制作的表单暂时没有用到两种类型的input：hidden和image。

## 下拉列表和多行文本框

### select

&emsp;&emsp;我们在表单里用select标签定义了一个单选下拉列表。

&emsp;&emsp;如果想要让列表支持同时选中多个选项，你可以在select开始标签里面重新定义它的某个属性。具体怎么做，请参考[W3School的select标签](http://www.w3school.com.cn/tags/tag_select.asp)页面。

### textarea

&emsp;&emsp;[textarea标签](http://www.w3school.com.cn/tags/tag_textarea.asp)定义的多行文本框也很有用。因为文本类型的input元素只能允许用户输入单行文字。

## 表单提交

&emsp;&emsp;我们来输入数据，模拟一次用户注册的表单提交过程。

### action属性

&emsp;&emsp;比如说，可以这样输入：

 ![userRegister_form_step_11](/public/img/html/userRegister_form_step_11.png){:width="400px" height="400px"} 

&emsp;&emsp;提交之后，页面会显示找不到相关服务器地址：

 ![userRegister_form_step_12](/public/img/html/userRegister_form_step_12.png){:width="500px" height="500px"}

&emsp;&emsp;这是因为我们在action属性里面里定义了一个不存在的网站服务器地址。

### method属性

&emsp;&emsp;**method属性**规定如何发送表单数据（表单数据发送到**action 属性**规定的WWW地址）。

&emsp;&emsp;我们在method里面定义了“get”，你可以通过查看[W3School上form表单的method属性](http://www.w3school.com.cn/tags/att_form_method.asp)页面来连接这个属性的其他定义。

&emsp;&emsp;用get方法提交表单，表单的里面的数据会不经过任何加密直接显示在浏览器窗口的地址栏里，因此这种方法不适合用来提交敏感数据，比如密码或者银行账号。

&emsp;&emsp;修改表单的method属性,再提交表单：

      <!-- "action"属性指向一个可以处理用户数据的万维网地址 -->
      <!-- "method"属性定义了表单的提交方式,这里的值是“post” -->
     <form action="http://mycorporation.com.cn/vistor/rgister.do" method="post"
           name="userRegister">

&emsp;&emsp;再提交表单，就不一样了：

 ![userRegister_form_step_13](/public/img/html/userRegister_form_step_13.png){:width="500px" height="500px"}

&emsp;&emsp;post提交表单，数据不会显示在地址栏上面，而是先经过某种形式的加密再传送给服务器。


# 习题：

 1.下面有一个来源于国家统计局网站的数据表，请你根据学到的表格知识制作一个网页表格，显示外观可以略有不同：

 ![data_table_01](/public/img/html/data_table_01.png){:width="500px" height="500px"}

 2.请你根据W3School的input标签页面的描述，给用户注册表单换一个显示成图片的提交按钮。

       <!-- 你需要定义一个自己的图片路径 -->
    <input type="image" src="your_img_path" alt="Submit"/>

 3.请你在用户表单里面使用hidden类型的input元素，然后用get方法提交表单，检查这个隐藏域数据能否出现在地址栏里：
    
    <input type="hidden" name="language" value="zh_CN"/>




 
