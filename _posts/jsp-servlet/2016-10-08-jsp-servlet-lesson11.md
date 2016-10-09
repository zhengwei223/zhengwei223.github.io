---

layout: post

title: 调试

category: JSP-Servlet教程

tags: JSP Servlet

description: 使用Eclipse的调试功能，可以帮助开发人员更好的了解程序的运行情况、快速的发现bug、及时的处理错误。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

# 11.1 使用Eclipse调试 #

使用Eclipse的调试功能，可以帮助开发人员更好的了解程序的运行情况、快速的发现bug、及时的处理错误。

## 11.1.1 使用Eclipse调试JAVA程序 ##

调试JAVA程序的步骤如下：

**① 打断点**

用鼠标双击需要观察的代码左侧（双击后，会出现一个小圆点），如图：

![](http://i.imgur.com/F67Rft4.png)

*图11-01*

例如，需要观察第21行中num1的值，所以就在第21行左边打了一个断点。

**② 进入调试状态**

打了断点以后，就可以启动调试，进入调试状态：鼠标右击代码编辑界面→Debug As→Java Application，如图

![](http://i.imgur.com/fdZs3I7.png)

*图11-02*

之后，就会弹出调试界面，如图：

![](http://i.imgur.com/Zzlazd9.png)

*图11-03*

调试界面的右上角有`Variables`和`BreakPoints`两个功能标签，其中在`BreakPoints`标签中会显示之前所打断点的位置，如图，

![](http://i.imgur.com/CKc7aIW.png)

*图11-04*

而`Variables`标签中则存放了当前代码的变量值，如图，

![](http://i.imgur.com/oHzlBhI.png)

*图11-05*

此外，我们还可以新增加一个`Expressions`功能标签：以此点击Window→Show View→Expressions，如图，

![](http://i.imgur.com/ITrCIpV.png)

*图11-06*

再观察调试界面，会发现多了一个`Expressions`功能标签，如图，

![](http://i.imgur.com/kiI4fFN.png)

*图11-07*

我们可以将变量或自定义表达式（如num1*num2）输入到`Expressions`标签中观察，如图，

![](http://i.imgur.com/7Mjb92h.png)

*图11-08*

**③ 执行调试**

**a.单行调试（单步调试）**

之后就可以开始调试：单击F6可以单行调试，即可以让程序一行一行的执行。例如，目前程序停留在第21行，单击F6后就会执行到第22行，如图，

![](http://i.imgur.com/7MAxsQH.png)

*图11-09*

并且可以随时在`Expressions`标签中观察自定义表达式或变量在此时的值。

值得注意的是：在单击F6执行单行调试时，绿色背景条所在那一行表示的是“即将”执行的那一行，而不是已经执行过的那一行。

**b.进入方法**

如果即将执行那一行是一个方法，可以单击F6直接跳到下一行（即执行完毕该方法，跳到第23行），也可以单击F5进入到该方法的内部，如图是在第22行单击F5之后，

![](http://i.imgur.com/7wMHWUI.png)

*图11-10*

进入方法后，可以单击F6执行单行调试，也可以单击F7跳出该方法，恢复到该方法调用处的下一行（即第23行），如图（在第7行单击F7之后）：

![](http://i.imgur.com/hNYdpCN.png)

*图11-11*

**c.释放断点和停止调试**

如果通过调试，成功的解决了bug或已将问题分析完毕，就可以点击ctrl+F2终止调试；如果程序中打了多个断点，也可以单击F8将程序释放到下一个断点所在处。

除了使用F5、F6、F7、F8、ctrl+F2等快捷键外，还可以使用Eclipse提供的调试按钮，如图：

![](http://i.imgur.com/4wiLedH.png)

*图11-12*

如果在调试模式下，想暂时忽略所有断点、像正常执行程序一样，可以单击Skip All BreakPoints按钮，如图：

![](http://i.imgur.com/0ROrrJ6.png)

*图11-13*

若想恢复所有断点，则需要再次单击Skip All BreakPoints按钮。

**d.恢复编辑视图**

调试完毕后，点击右上角的“Java EE”就可以恢复到普通的JAVA编辑视图，如图：

![](http://i.imgur.com/vkdD9Hg.png)

*图11-14*

## 11.1.2 使用Eclipse调试本地JAVA Web程序 ##

调试Java Web程序与调试JAVA程序的方法基本相同，唯一区别就在于如何进入调试模式。

在打了断点以后，JAVA程序是通过单击Debug As→Java Application进入调试模式；而Web程序进入调试模式的步骤是：

**① 先以Debug模式启动Web服务**

如图：

![](http://i.imgur.com/ozel75G.png)

*图11-15*

**② 在运行Web应用时，如果执行的代码中存在断点，则Eclipse会自动进入调试模式，并将程序停留在该断点处**

例如，有一个前端页面，如下

index.jsp

```
…
<a href="DebugServlet">测试Java Web调试</a>
…
```

该页面中超链接所访问的Servlet中存在断点，如图：

![](http://i.imgur.com/Y1DSrD9.png)

*图11-16*

如果执行index.jsp中的超链接，则程序会自动停留在Servlet中的断点处，如图：

![](http://i.imgur.com/W9wFgwI.png)

*图11-17*

其他调试Java Web程序的步骤，与调试Java程序的步骤完全一致。

## 11.1.3 使用Eclipse远程调试JAVA Web程序 ##

在实际的项目开发中，开发人员需要先在本机完成项目开发，然后将最终的项目放到测试人员的服务器上以供测试。在此过程中，经常会遇到这样一个问题：项目代码在开发人员的电脑上能够成功运行，但在测试人员的服务器上运行时却有异常出现。此时，开发人员就需要在自己的电脑上，远程调试测试服务器上的Java Web程序。

远程调试的具体步骤如下：

**(1) 调试准备**

① 远程的Tomcat服务器上部署了Java Web程序，并且本机的Eclipse中有该Java Web的源代码。

② 在本机的环境变量中，配置CATALINA_HOME和JRE_HOME

其中CATALINA_HOME是Tomcat的根目录；JRE_HOME是JRE的根目录。

**(2)在远程服务器配置Tomcat**

**a. 如果远程服务器是Windows环境**

在`%CATALINE_HOME%/bin`下建立debug.bat文件，并编写以下内容：

debug.bat

```
set JPDA_ADDRESS=9090 
set JPDA_TRANSPORT=dt_socket 
set CATALINA_OPTS=-server -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=9090 
startup
```

其中的9090表示将要开启的远程端口号（任何未被使用的端口都可以）。

JPDA_TRANSPORT表示连接方式，可以设置为`dt_shmem`或`dt_socket`，分别表示本机调试和远程调试。

**b. 如果远程服务器是Linux/Unix环境**

打开`%CATALINE_HOME%/bin/startup.sh`，找到其中最后一行，将
`exec "$PRGDIR"/"$EXECUTABLE" start "$@" `
改为
`exec "$PRGDIR"/"$EXECUTABLE" jpda start "$@"`

默认的远程调试端口是8000，如果8000被占用，可以打开`%CATALINE_HOME%/bin/catalina.sh`文件，将
`JPDA_ADDRESS="8000"`
改为
`JPDA_ADDRESS="9090"`

配置完成后，在Windows下运行`debug.bat`, 在Linux下运行 `startup.sh`启动Tomcat。如果在启动日志中出现Listening for transport dt_socket at address: 9090，则说明远程调试端口监听成功。

**(3)在本地Eclipse中关联源代码**

在远程调试模式中，关联项目源代码，方法如下：

① 在Eclipse的Package Explorer视图中，右键点击项目，选中Debug As…中的Debug Configurations…，如下：

![](http://i.imgur.com/a9l2Z0S.png)

*图11-18*

② 在弹出的对话框中，右键点击Remote Java Application左键单击New，如图

![](http://i.imgur.com/cUjUSme.png)

*图11-19*

在右侧`Connection`标签中，输入项目名、远程调试的端口号等，如图，

![](http://i.imgur.com/v2RakUd.png)

*图11-20*

在右侧`Source`标签中，Add项目代码，便于Eclipse在远程调试阶段查找代码，如图，

![](http://i.imgur.com/kKaiyaC.png)

*图11-21*

增加之后的界面，如图，

![](http://i.imgur.com/fFN8l1H.png)

*图11-22*

最后点击Debug按钮，即开启远程调试，如图

![](http://i.imgur.com/zZTyj09.png)

*图11-23*

**(4) 执行远程调试**

在本地的项目中打上断点，再通过浏览器远程访问服务器部署的项目，如[http://192.168.1.123:9090/DebugDemo](http://192.168.1.123:9090/DebugDemo)。此时，就会在本地的Eclipse中进入调试模式，而调试的就是远程服务器中的项目代码。调试的方法和本地调试完全相同。

# 11.2 使用firebug调试 #

Firebug是Firefox浏览器下的一款扩展插件，可以用来调试HTML、CSS、JavaScript和Ajax等脚本或语言。Firebug可以从各个不同的角度剖析Web页面内部的细节，是Web开发人员的必备利器。

## 11.2.1 安装Firebug ##

① 打开firefox浏览器，并打开工具中的附加组件，如图：

![](http://i.imgur.com/k66rCyk.png)

*图11-24*

② 在弹出的页面中，搜索firebug，再点击安装，如图

![](http://i.imgur.com/WfQGluF.png)

*图11-25*

③ 重新打开浏览器，点击功能键F12，就可以在浏览器下方看到firebug，如图

![](http://i.imgur.com/jj0Nz2A.png)

*图11-26*

## 11.2.2 使用Firebug调试web前端 ##

可以使用firebug调试前端中的HTML、CSS、JavaScript、网络、Cookies等。现在以调试CSS和JavaScript为例，进行讲解。

**(1) 调试CSS**

ul.css

```
ul li:first-child
{
	background-color:yellow;
	font-size:20px;
}
```

firebugCss.jsp

```
<html>
<head>
	<link rel="stylesheet" type="text/css" href="ul.css" /> 
    …
</head>
<body>
	<ul> 
		<li>橘子...</li>
		<li>苹果...</li>
		<li>香蕉...</li>
	</ul>
</body>
</html>
```

通过firebug就可以直接在浏览器中查看JSP页面的各种CSS样式，步骤如下：

**① 单击firebug中的选择按钮，如图**

![](http://i.imgur.com/gfkS3wc.png)

*图11-27*

**② 单击需要观察的网页元素**

![](http://i.imgur.com/GMGzJjx.png)

*图11-28*

单击以后，“橘子”的相关样式就会显示在firebug右下角的“样式”标签中：“橘子”的样式在`ul.css`的第1行，并且具体样式是`ul li:first-child{ background-color:yellow;…}` 。

**③ 调试CSS样式**

还可以直接在firebug中对网页的样式进行修改、新增、删除等调试操作。

**a.在firebug中修改样式**

直接单击CSS样式的属性值，修改即可，如图

![](http://i.imgur.com/e2OAgkk.png)

*图11-29*

**b.在firebug中新增样式**

选中样式的最后一个属性值（即选中`font-size`的属性值20px），然后按下回车键，之后依次输入属性名和属性值，如图

![](http://i.imgur.com/SBDtPSu.png)

*图11-30*

**c.在firebug中删除样式**

如果要删除某个样式，只需要点击样式前面的禁止符号，如图

![](http://i.imgur.com/82BfbK1.png)

*图11-31*

值得注意的是：在firebug中修改的样式，会立刻反映到当前的网页中，但这些修改只是“临时”的，一旦刷新页面就会恢复原来的样式。因此，如果在firebug中修改完了样式，一定要将修改后的代码复制到真实的源代码文件中。

**(2) 调试JavaScript**

使用firebug调试JavaScript的步骤如下：

**① 点击“脚本”标签，并选择JavaScript所在文件**

![](http://i.imgur.com/bGEZQnC.png)

*图11-32*

**② 在JavaScript代码中打断点**

找到需要观察的JavaScript代码，并打断点，如图

![](http://i.imgur.com/nPMjRLa.png)

*图11-33*

**③ 监控变量或表达式**

点击右侧的“新建监控表达式”，并输入需要观察的变量或表达式，如图

![](http://i.imgur.com/INsH2WB.png)

*图11-34*

**④ 调试**

之后的调试方法，就和“使用Eclipse调试JAVA Web程序”基本相同，调试的相关按键如下：

![](http://i.imgur.com/VmALlD0.png)

*图11-35*

**(3) JavaScript错误提示**

如果JavaScript代码有误，Firebug也会给出错误提示。例如，以下代码存在三处错误：未引入jQuery库（或jQuery库地址错误）、缺少右括号“)”、单击button按钮时触发了一个不存在的函数`showInfo()`。

firebugJsp.jsp

```
<html>
<head>
	<!-- 未引入jQuery库 -->
	<script type="text/javascript">
		$(document).ready(function(){
			var num1 = 10,num2 = 20;
			var temp = num1 ;
			num1 = num2 ; 
			num2 = temp ;
          }	<!-- 缺少右括号) -->
	</script>
…
</head>
<body>
	<!—并不存在showInfo()函数 -->
	<button onclick="showInfo();">测试</button>
</body>
</html>
```

运行firebugJsp.jsp后，因为错误的提示存在优先级，所以会先提示找不到右括号“)”：如图

![](http://i.imgur.com/7Bko7m3.png)

*图11-36*

此外，当发现错误时，firebug还会在图标旁显示此时刻发生的错误数量，以及错误的具体行号，如图：

![](http://i.imgur.com/xb6ZFt3.png)

*图11-37*

修复此错误，即在源码第13行中加入“)”后，再次运行firebugJsp.jsp时，又会提示“$未定义”，如图，

![](http://i.imgur.com/RptieXH.png)

*图11-38*

分析可知，$是jQuery的标识，提示“$未定义”可能的原因就是jQuery库引入有误，因此检查后可以发现是没有引入jQuery库。

将jQuery库引入后，再次运行firebugJsp.jsp并单击button，又能发现firebug提示“`showInfo()`为定义”，如图，

![](http://i.imgur.com/1nLGbD9.png)

*图11-39*

根据提示可以发现：在JSP页面中没有编写`showInfo()`方法，或者方法名字有误。


