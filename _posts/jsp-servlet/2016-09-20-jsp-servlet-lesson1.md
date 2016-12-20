---
layout: post

title: 动态网页基础JSP

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将从动态页面和静态页面的区别说起，介绍Web应用系统的工作原理。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---





>**本章简介**

　　通过前面课程的学习，读者已经掌握了JavaSE、Web前端以及数据库方面的技术。从本书开始，将结合之前所学内容，逐步接触应用的Web系统开发。本章将从动态页面和静态页面的区别说起，介绍Web应用系统的工作原理。读者可以系统地了解并学会使用Tomcat这个非常流行的Web应用程序服务器，以及使用Eclipse快速的开发Web程序。

# 1.1动态网页

　　“动态”是相对于“静态”而言。

　　静态网页：页面的内容一旦生成，就不会再发生变化，因此无法和用户进行交互。

　　动态网页：页面的内容生成以后，可以随着时间、客户操作的不同而发生改变。比如我们经常使用的百度、淘宝、京东等网站，都是使用的动态网页。以百度为例，当我们搜索“JSP”时，页面会显示与“JSP”相关的内容，如图1-01；而当我们搜索“蓝桥软件学院”时，页面则会显示与“蓝桥软件学院”相关的内容，如图1-02。



![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.1.png)

*图1-01*



![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.2.png)

*图1-02*

值得注意的是，不要将“动态网页”和“页面内容是否有动感”混为一谈。动态网页需要使用服务器端脚本语言，如JSP等。

# 1.2 C/S与B/S #

　　C/S 架构：Client/Server，客户端/服务端模式。将软件系统分为客服端和服务端两层，用户在本机安装客户端，通过网络连接服务端。比如微信、QQ、魔兽世界等。

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.3.png)


*图1-03*

**现以QQ为例（如图1-03），分析C/S架构的不足：**

**1.**如果腾讯将QQ进行了升级，那么全球所有安装了QQ的客户端都要进行升级。也就是说，凡是采用了C/S架构的软件，每一次对软件进行改动后，都必须对所有的客户端进行升级；

**2.**任何一台客户端出了问题，都必须进行维护；

**3.**所有客户端都必须安装QQ软件。


　　能不能别这么麻烦？有没有一种架构，既可以降低我们的维护量，又能更广泛的使用我们的系统呢？答案就是B/S架构。

　　**B/S结构：Browser/Server，浏览器/服务器模式。**这种模式统一了客户端，将系统功能实现的核心部分集中到服务器上，简化了系统的开发、维护和使用。客户机上只要安装一个浏览器就可访问服务端。

　　比如使用B/S架构实现的网页版百度（如图1-04），用户并不需要安装百度客户端，就能通过浏览器访问百度，类似的还有网页版的淘宝、京东等。即使开发人员对百度进行修改，也不会影响到任何一个用户。也就是说，采用B/S架构的软件系统，用户只要能联网，就可以通过浏览器来访问，也无需对系统的升级进行维护。而开发维护人员，只需要对服务端的代码进行修改即可。

　　需要注意，B/S架构是C/S架构的升级和改善，而不是C/S架构的替代品。C/S架构也有很多自己独有的优势，比如采用C/S架构的软件系统有着本地响应快、界面更美观友好、能减轻服务器负荷等优势。

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.4.png)

*图1-04*

# 1.3 开发第一个Web项目 #

　　在进行Java Web开发时，需要有服务器端的支持，本章将讲解最常用的Web服务器——Tomcat服务器的安装、配置及其工作原理。

　　Tomcat是Apache 软件基金会的Jakarta 项目中的一个核心项目，由Apache、Sun 和其他一些公司及个人共同开发而成。Tomcat 服务器是一个免费的开放源代码的Web 应用服务器，属于轻量级应用服务器，是开发和调试JSP 程序的首选。

### (1) Tomcat安装 ###

　　访问Apache官网[http://www.apache.org/](http://www.apache.org/)，点击Tomcat，如图1-05

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.5.png)

*图1-05*

　　在Download下选择Tomcat8，如图1-06

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.6.png)

*图1-06*

　　最后选择下载zip版，如图1-07

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.7.png)

*图1-07*

　　下载完后，将其解压，得到的各目录及功能如下表：

<table>
   <tr>
      <td>目录</td>
      <td>说明</td>
   </tr>
   <tr>
      <td>bin</td>
      <td>存放tomcat服务器的所有可执行命令。例如：启动服务器命令startup.bat，关闭服务器命令shutdown.bat等。</td>
   </tr>
   <tr>
      <td>conf</td>
      <td>存放tomcat服务器的所有配置文件，其中最重要的是server.xml</td>
   </tr>
   <tr>
      <td>lib</td>
      <td> tomcat服务器的核心类库（jar文件），也可以将第三方类库复制到该路径下</td>
   </tr>
   <tr>
      <td>logs</td> 
      <td>存放tomcat服务器每次运行时，产生的日志文件</td>
   </tr>
   <tr>
      <td>temp</td>
      <td>存放tomcat服务器运行时的临时文件</td>
   </tr>
   <tr>
      <td>webapps</td>
      <td> Web应用程序存放的目录,Web项目保存在此目录中即可运行</td>
   </tr>
   <tr>
      <td>work</td> 
      <td>Tomcat服务器把由JSP生成的Servlet文件(*.java)，以及编译产生的字节码文件(*.class)存放在此目录。该目录可以删除，但在每次启动Tomcat服务器时，Tomcat会重新建立该目录。</td>
   </tr>
</table>

**说明：**

**问：**tomcat版本的选择有什么要求？

**答：**Tomcat版本需要与其他相关软件的版本相对应，比如与Tomcat8.0对应的java开发环境是jdk7或以上版本，如图1-08：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.8.png)

*图1-08*

本书使用tomcat-8.0.32。

### (2) Tomcat基本配置及使用 ###

**①Tomcat环境变量的配置**

　　Tomcat服务器下载解压后，需要配置JAVA_HOME和CATALINA_HOME，具体如下：

**a.** Tomcat使用前必须配置JAVA_HOME，详见JAVA书籍。

**b.** Tomcat可以选择性的配置CATALINA_HOME。配置方法：在环境变量里，新建系统变量，变量名设置为CATALINA_HOME，变量值设置为tomcat的安装目录D:\apache-tomcat-8.0.32，如图1-09

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.9.png)

*图1-09*

　　如果没配置CATALINA_HOME，在启动tomcat时（启动方法见后文），tomcat也会自动的将tomcat的安装目录设为CATALINA_HOME的值。

**②Tomcat端口号的配置**

　　不同的服务器都有自己默认的端口号，一旦某个服务器的端口被占用，则就无法再访问此服务器。Tomcat服务器的默认端口号是8080。

　　启动Tomcat服务器：双击打开Tomcat安装目录里，bin目录中的启动命令startup.bat，如图1-10，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.10.png)

*图1-10*

　　然后打开浏览器输入[http://localhost:8080/](http://localhost:8080/)，即可访问Tomcat服务器的主页面，如图1-11，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.11.png)

*图1-11*

**访问格式：**

　　访问地址:端口号

　　其中网址http://localhost（或http://127.0.0.1）代表本机地址。若要关闭Tomcat服务器，可双击运行`bin`目录中的shutdown.bat关闭命令。

　　但是，如果Tomcat服务器的默认端口8080被其他服务器的端口占用（例如Oracle也会使用到8080端口），那么就需要我们地手动修改Tomcat的端口号。修改方法如下：

**a.**打开Tomcat安装目录，然后找到`conf`目录，打开里面的**server.xml**文件

**b.**找到如下代码

```
<Connector port="8080" protocol="HTTP/1.1"
       connectionTimeout="20000"   redirectPort="8443" />
```

**c.**将其中的默认端口8080，改为其他未被占用的端口，如8888。

**③访问示例项目**

　　前面讲过，在tomcat的webapps目录中，保存着可以运行的Web项目。在Tomcat下载后，webapps里就自带了几个可以直接运行的示例项目，如图1-12 

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.12.png)

*图1-12*

　　我们先执行tomcat的启动命令startup.bat，然后在浏览器输入[http://localhost:8888/examples/](http://localhost:8888/examples/)，即可访问webapps中的examples项目，如图1-13

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.13.png)

*图1-13*

**④状态码**

　　访问[http://localhost:8888/examples/](http://localhost:8888/examples/)时，实际访问的是examples文件夹中的**index.html**文件。如果将**index.html**文件删除，再次访问[http://localhost:8888/examples](http://localhost:8888/examples/)，页面就会提示错误信息，如图1-14

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.14.png)

*图1-14*

　其中，HTTP Status 404代表要访问的资源不存在。在开发时，为了方便JSP页面的调试，即使要访问的文件夹中的资源不存在，我们也希望能显示出该文件夹中的目录结构。可以打开Tomcat安装目录里`conf`目录下的**web.xml**文件，找到如下代码，

```
…
<servlet>
…
        <init-param>
            <param-name>listings</param-name>
            <param-value>false</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
</servlet>
…
```

　　将其中的false改为true即可。改完之后，重新启动tomcat服务器（先执行shutdown.bat关闭，再执行startup.bat启动），再次访问[http://localhost:8888/examples/](http://localhost:8888/examples/)，则就可以得到examples中的文件目录结构，如图1-15

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.15.png)

*图1-15*

**说明：**

　　**以下是几种常见的HTTP状态码：**

<table>
   <tr>
      <td>状态码</td>
      <td>表示的含义</td>
   </tr>
   <tr>
      <td>200</td>
     <td>请求成功，一切正常</td>
   </tr>
   <tr>
      <td>3xx</td>   
      <td> 以3开头的状态码，如300、301等均表示重定向</td>
   </tr>
   <tr>
      <td rowspan="2"> 4xx </td>    
      <td>403   禁止：资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。</td>
   </tr>
   <tr>
      <td>404   无法找到指定位置的资源（常见的错误应答）</td>
   </tr>
   <tr>
      <td>5xx</td>   
      <td>服务器内部错误，例如服务器端的代码出错。</td>
   </tr>
</table>

　　在出错以后，可以根据这些状态码迅速地发现出错的原因，其他状态码需要我们在平时开发中多积累。

### (3) Web应用的目录结构 ###

　　前面我们所使用的examples项目是tomcat自带的Web示例项目，那么我们如何新建自己的Web项目呢？其实很简单，只需要按照一定的规则，建立项目的目录结构即可，具体目录结构如下：

　　先在tomcat安装路径的`webapps`目录中，新建一个项目文件夹（如JspProject），再在JspProject中新建WEB-INF文件夹，再在WEB-INF中新建classes、lib两个文件夹和**web.xml**文件，如图1-16

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.16.png)

*图1-16*

　　**最后再在web.xml中输入以下内容**

**web.xml**

```
  <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                     http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
    version="3.1"
    metadata-complete="true">
    <welcome-file-list>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>
</web-app>
```

　　其中`<welcome-file-list>`标签用来指定项目的默认首页。

　　**说明：**上面**web.xml**文件中的基本内容，开发人员不必亲自编写。可以直接从`webapps`里任意一个项目里找到**web.xml**文件，然后复制即可。

　　至此，就完成了Web项目结构的搭建。

　　**目录结构说明：**

<table>
   <tr>
      <td>目录</td>
      <td>说明</td>
   </tr>
   <tr>
      <td>WEB-INF</td> 
      <td>可以存放Web项目的各种资源,但需注意该目录中的所有资源，是无法通过客户端直接访问的</td>
   </tr>
   <tr>
      <td>WEB-INF/classes</td>
      <td>存放Web项目的所有字节码文件(*.class)</td>
   </tr>
   <tr>
      <td>WEB-INF/lib</td>
      <td>存放扩展Web项目时使用的jar文件</td>
   </tr>
</table>


　　前面我们已经创建好了一个名为JspProject的项目结构，并且指定了该项目的默认首页是index.jsp。接下来，我们在JspProject根目录里创建一个**index.jsp**文件，内容如下， 

**\apache-tomcat-7.0.37\webapps\JspProject\index.jsp**

```
<html>
	<head>
		<title>First Web Project</title>
	</head>
	<body>
		<%
			out.print("Hello World");
		%>
	</body>
</html>
```

　　然后运行startup.bat启动tomcat服务器，并在浏览器输入[http://localhost:8888/JspProject/](http://localhost:8888/JspProject/)，就可以成功运行此项目，如图1-17

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.17.png)

*图1-17*

**说明：**

**1.**我们输入的地址[http://localhost:8888/JspProject/](http://localhost:8888/JspProject/)中，并没有指定要访问的是index.jsp页面，但仍然能成功访问**index.jsp**文件，原因就是之前在web.xml中的`<welcome-file-list>`标签中，设置了默认首页是**index.jsp**。

如果要访问的页面，没有在`<welcome-file-list>`中配置，则必须输入完整的访问地址。假设**index.jsp**没有在`<welcome-file-list>`中配置，则应该访问[http://localhost:8080/JspProject/index.jsp](http://localhost:8080/JspProject/index.jsp)

**2.**代码`<% out.print("Hello World"); %>`就是JSP的输出语句。如果JSP代码出错，例如忘了写最后的分号“；”，则会出现HTTP状态码为500的错误提示，如图1-18

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.18.png)

*图1-18*

若想停止服务器，可以执行bin文件夹中的shutdown.bat命令。


### (4)配置Web应用的虚拟路径 ###

Tomcat默认会将Web项目放在webapps目录下，但是，如果将所有的Web项目都放在webapps里也是不合理的。要想把Web项目放置到webapps以外的目录并能被Tomcat识别，就必须配置虚拟路径。例如，如果将之前的JspProject项目放在**D:\MyWebApps**中，就必须配置虚拟路径才能访问。


**配置虚拟路径有以下两种方式：**


**①**通过**server.xml**配置虚拟路径

打开**D:\apache-tomcat-8.0.32\conf\server.xml**文件，在`<Host>`元素中，增加并配置`<Context>`元素，如下：

```
<Host appBase="webapps" autoDeploy="true" name="localhost" … >
	<Context docBase="D:\MyWebApps\JspProject" path="/JspProject" />
</Host>
```

`<Context>`可以将一个普通目录映射成一个可供Tomcat访问的虚拟目录。其中，docsBase指定本地磁盘上的普通目录；path指定Tomcat访问时的虚拟目录，可以使用绝对路径或相对路径（相对于D:\apache-tomcat-8.0.32\webapps\）。换句话说，当用户访问path指定的虚拟目录(/JspProject)时，就会自动访问docBase指定的本地目录（D:\MyWebApps\JspProject）。


重启Tomcat服务器，再次访问[http://localhost:8888/JspProject/](http://localhost:8888/JspProject/)，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.19.png)

*图1-19*

可见，配置了虚拟路径后，就可以访问到webapps目录以外的项目。


**②**通过自定义xml文件配置虚拟路径

在server.xml中配置虚拟路径的弊端是：每次修改完server.xml，都必须重启Tomcat服务器。为了避免这个问题，就可以使用另一种方式：通过自定义xml文件来配置虚拟路径。


打开**D:\apache-tomcat-8.0.32\conf\Catalina\localhost**目录，创建 “项目名.xml”（如**JspProject.xml**），配置`<Context>`元素（同**server.xml**方式），如下：

**D:\apache-tomcat-8.0.32\conf\Catalina\localhost\JspProject.xml**

`<Context docBase="D:\MyWebApps\JspProject" path="/JspProject" />`


直接访问[http://localhost:8888/JspProject/](http://localhost:8888/JspProject/)，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.20.png)

*图1-20*

此外，还能用此方法配置默认的Web项目：将**JspProject.xml**重命名为**ROOT.xml**即可。之后，直接访问[http://localhost:8888/index.jsp](http://localhost:8888/index.jsp)，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.21.png)

*图1-21*



### (5)配置虚拟主机 ###

目前，访问本地Web项目的路径格式是：

**http://localhost:端口号/项目名/文件名**


能否使用“www.项目名.com”的形式访问呢?可以，但需要配置虚拟主机。配置的具体步骤如下：

**①配置**server.xml****

打开**D:\apache-tomcat-8.0.32\conf\server.xml**，观察以下代码：

```
…
<Engine defaultHost="localhost" name="Catalina">
  …
    <Host appBase="webapps" autoDeploy="true" name="localhost" 
unpackWARs="true">
    </Host>
</Engine>…
```

**其中各元素的简介，如下表：**

<table>
   <tr>
      <td>元素</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>&lt;Host&gt; </td>
      <td>每一个&lt;Host&gt;代表一个虚拟主机。
      name: 虚拟主机的名称；默认是localhost。
      appBase：虚拟主机的路径；默认webapps。采用相对路径（相对于Tomcat安装目录D:\apache-tomcat-8.0.32\），即本次是D:\apache-tomcat-8.0.32\webapps</td>
   </tr>
   <tr>
      <td>&lt;Engine&gt;</td>
      <td>处理客户端请求的引擎。
      defaultHost:指定默认的虚拟主机名称。例如defaultHost=”localhost”，表示指定&lt;Host …name="localhost" &gt;&lt;/Host&gt;做为默认使用的虚拟主机。</td>
   </tr>
</table>

现在，我们模仿以上配置，增加一个`name=” www.test.com”`的虚拟主机，并通过`defaultHost`设置为默认；之后，再配置虚拟路径。具体如下：

**D:\apache-tomcat-8.0.32\conf\server.xml**


```
…
<Engine defaultHost="www.test.com" name="Catalina">
  …
    <Host appBase="webapps" name="localhost" …>…</Host>
    <!-- 自定义虚拟主机 ;并设置虚拟路径为根目录“/”-->
<Host appBase="D:\MyWebApps\JspProject"  name="www.test.com" >
 <Context docBase="D:\MyWebApps\JspProject" path="/" />
</Host>
</Engine>
…
```

**②配置hosts文件**

配置好的虚拟主机要想被外界访问，还必须在Windows系统或DNS服务器中注册，用于指定虚拟主机和IP地址之间的映射关系。

**在Windows中注册虚拟主机的方法如下：**

打开**C:\Windows\System32\drivers\etc\hosts**文件，增加以下一行代码：

`127.0.0.1   www.test.com`

这行代码的作用就是：建立虚拟主机（**www.test.com**）和IP地址（127.0.0.1）之间的映射关系。换句话说，浏览器可以通过访问**www.test.com**来访问本机地址127.0.0.1。


**③配置Tomcat端口号**

Web站点默认使用的端口号是80。也就是说，如果我们将Tomcat的端口号改为80，那么就可以直接访问**www.test.com**，而不需要手工加上端口号。为此，在**server.xml**中将端口号改为80（详见“使用Tomcat开发Web项目”一节）。之后，重启Tomat，访问**www.test.com**，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.22.png)

*图1-22*

至此，虚拟主机的配置方法已经全部讲完。但为了与后续章节保持一致，请读者在学习完本节后，将本节涉及的所有配置进行还原，即：删除hosts文件中的配置、将端口号恢复至本书使用的8888、将**servers.xml**中Engine的`defaultHost`值改回至`localhost`。




## 1.3.2.JSP执行流程 ##

**①**客户端向tomcat服务器发送一个**请求**。例如在浏览器输入[http://localhost:8888/JspProject/](http://localhost:8888/JspProject/)，实际上是请求了默认的index.jsp页面。

**②**tomcat服务器接收并处理请求后，返回给客户端一个**响应**。其中tomcat服务器在处理请求期间，具体执行了如下流程：

**a.第一次执行jsp页面时的流程：**

 **(1)将接收到的index.jsp**翻译**成与之对应的java文件。**

**(2)再将翻译后的java文件，**编译**成与之对应的class文件。**

　　例如tomcat服务器会将请求的**index.jsp**文件，翻译并编译成对应的java和class文件，如图1-23

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.23.png)

*图1-23*

　　**index_jsp.java的部分代码如下：**

```
package org.apache.jsp;
…
public final class index_jsp 
extends org.apache.jasper.runtime.HttpJspBase
        implements org.apache.jasper.runtime.JspSourceDependent {
…
   javax.servlet.jsp.JspWriter out = null;
   public void _jspService(…)…{
     …
      response.setContentType("text/html");
      …
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<html>\r\n");
      out.write("  <head>\r\n");
      out.write("    <title>First Web Project</title>\r\n");
      out.write("  </head>\r\n");
      out.write("  <body>\r\n");
      out.write("\t\t");
      out.print("Hello World"); 
      out.write("\r\n");
      out.write("  </body>\r\n");
      out.write("</html>\r\n");
      out.write("\r\n");
  }
}
```

　　可以发现，JSP中的HTML代码，本质是通过JAVA类中的输出流动态生成的。实际上，此种JAVA类称为`Servlet`（后续会讲），而JSP本质是`Servlet`的一种简化形式。

**(3)执行class文件**

 以上流程，如图1-24：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.24.png)

*图1-24*

　　细心的读者可能会发现，“在第一次运行jsp项目时，速度会慢一些，而之后再次运行则会变得很快”。这是因为JSP在第一次执行时，会经历上述的“翻译”及“编译”过程。 

　　而之后再次执行时，因为已经存在翻译后的java文件以及编译后的class文件，就不用再次“翻译”及“编译”，而是直接执行class文件即可。但需要注意，如果修改了jsp文件，则又会再次重新执行“翻译”及“编译”的整个过程，相当于一个新jsp的执行流程。

**b.**第二次请求jsp的流程，如图1-25

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.25.png)

*图1-25*

## 1.3.3 使用Eclipse开发Web项目 ##

　　我们还可以借助Eclipse等开发工具来快速、高效地开发Web项目。Eclipse是一个免费的IDE（集成开发环境）工具，是目前最受欢迎的Java EE开发工具。

　　可以登录Eclipse官网[http://www.eclipse.org/](http://www.eclipse.org/)，并单击Download按钮，如图1-26

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.26.png)

*图1-26*

　　然后根据自己的操作系统位数，选择32位或64位的版本进行下载(本书采用64位)，如图1-27

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.27.png)

*图1-27*

　　最后再按照提示下载(例如，可选择MD5(DOWNLOAD)，如图1-28

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.28.png)

*图1-28*

　　下载完后，解压，然后直接运行里面的eclipse.exe即可

（①运行eclipse.exe之前，必须确保JDK配置正确；

②运行eclipse.exe时，会提示让选择项目的存放路径）。

　　第一次进入eclipse，会显示欢迎页面，直接关闭即可，如图1-29

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.29.png)

*图1-29*

　　为了能用Eclipse开发Web项目，我们还需要给Eclipse配置Web项目运行时环境（关联tomcat），具体如下：

**1.**依次点击Windows→Preferences→Server→Runtime Environment→Add…→Apache Tomcat v8.0→next，如图1-30，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.30.png)

*图1-30*

**2.**选择Tomcat的安装目录：依次点击Browse…→ 选择tomcat8的安装目录→ 确定，如图1-31，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.31.png)

*图1-31*

**3.**选择tomcat所依赖的JRE，如图1-32，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.32.png)

*图1-32*

　　JRE可以从下拉列表选择JDK，或者点击Installed JREs..进行配置。

**4.**集成Tomcat运行时环境：

鼠标右键单击项目名(JspProject)→ Properties，然后依次选择：
	
**①**Java Build Path→ Libraries→ Add Libraries→ Server Runtime→ Next→ 选中刚才配置的Apache Tomcat v8.0→ Finish→ Apply，如图1-33和图1-34	


![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.33.png)

*图1-33*


![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.34.png)

*图1-34*

**②**Targeted Runtimes→ Apache Tomcat v8.0→ OK，如图1-35

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.35.png)

*图1-35*

**Web项目运行时环境配置完成后，就可以开始用Eclipse来新建一个server实例、以及创建Web项目了，具体步骤如下：**

**1.**依次点击File→ New→ Dynamic Web Project，如图1.36


![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.36.png)

*图1-36*

**2.**在Project name后面输入项目名（如JspProject），再将Target runtime选为tomcat8，如图1-37，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.37.png)

*图1-37*

再选择Next→ Next→ 在Generate web.xml deployment descriptor前打上√，最后点击Finish;


**3.**点击Servers面板，进行配置指定Tomcat(即新建一个server实例)，如图1-38

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.38.png)

*图1-38*

**4.**将之前创建的JspProject项目加入到Tomcat中：鼠标右键点击Servers中的Tomcat→ Add and Remove…→ 选择JspProject→ Add→ Finish，如图1-39

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.39.png)

*图1-39*

**5.**设置文件或文本编码

	
在Web项目中，经常需要设置两种编码：“设置JSP文件的默认编码”和“设置文件的文本内容编码（Text file encoding）”，前者用于指定.jsp文件翻译成.java文件时的编码格式（通过JSP文件中的pageEncoding指定），以及浏览器读取.jsp文件时采用的编码格式（通过JSP文件中的content指定），而后者是指定文本内容（代码、注释等）自身的编码。

**①设置JSP文件的默认编码：**在创建JSP文件之前，为了防止乱码的产生，我们可以将JSP文件的默认编码统一设置为UTF-8格式，依次点击Windows→ Preferences→ Web→ JSP Files→ 将Encoding选为UTF-8，如图1-40

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.40.png)

*图1-40*

**②设置文件的文本内容编码：**

如果发现Eclipse中，某些代码、注释等文本内容是乱码（如“�ȫ���Ϊ˽”、“鏍煎瀛�”等），就需要将文本内容也设置为统一的编码（如UTF-8）：

**a.**设置所有文件的文本内容编码：
	
依次点击Windows→ Preferences→ General→ Workspace，将Text file encoding选为UTF-8，如图1-41

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.41.png)

*图1-41*
	
**b.**设置某一个项目中，所有文件的文本内容编码：

鼠标右键单击项目→ Properties→ Resource，将Text file encoding选为UTF-8，如图1-42

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.42.png)

*图1-42*
	
**c.**设置单个文件的文本内容编码：

鼠标右键单击某一个具体文件(如.java文件、.xml文件、.html文件或即将学习的.jsp文件等)→ Properties→ Resource，将Text file encoding选为UTF-8，如图1-43

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.43.png)

*图1-43*
		
**6.**创建Jsp文件：鼠标右键单击WebContent->New→ Jsp File→ 输入jsp名字index.jsp→ Finish

**7.**编写Jsp文件，输出Hello Wolrd，如下，

**index.jsp**

```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
           out.print("Hello World");
</body>
</html>
```

**8.**启动Tomcat服务：右键Servers中的Tomcat→ start，如图1-44

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.44.png)

*图1-44*

**9.**访问[http://localhost:8080/JspProject/](http://localhost:8080/JspProject/)，如图1-45,

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.45.png)

*图1-45*

**10.**若要关闭Tomcat服务，在Servers面板选中Server实例，点击关闭按钮即可，如图1-46,

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/1.46.png)

*图1-46*

关闭Tomcat服务后，就不能再访问JSP页面了。




# 1.4 本章总结


**1．动态网页**

　　网页内容会因为不同时间、不同地点、不同搜索文字等，显示不同的内容。

BS：浏览器/服务器，比如京东网站。京东网站进行的各种维护、升级，不会对客户端产生影响。
 
CS：客户端/浏览器，比如QQ。QQ的每一次升级，都会涉及全部QQ用户的软件更新。

　　Tomcat是Apache 软件基金会的Jakarta 项目中的一个核心项目。

**2．单独使用tomcat自身开发WEB项目**

**(1)**首先需要配置：

**①**确保JDK配置完毕

**②**配置tomcat环境变量:  变量名：CATALINA_HOME，变量值：tomcat安装目录

**(2)**配置完毕后，在`tomcat`目录中的`bin`目录里，startup.bat是启动命令，shutdown.bat是关闭命令。

**(3)**在webapps目录里新建项目目录（如MyJSP），再在项目目录里依次创建`classes`、`lib`目录以及**web.xml**文件；最后再在项目目录里手写JSP文件即可。

**3．使用Eclipse开发WEB项目**

**(1)**将Tomcat服务器集成到Eclipse中：

**a.**在Eclipse中:window-->preferences -->Server

-->Runtime Environments-->add-->Apache Tomcatv8.0

-->在“Tomcat installation diretory”选择 tomcat的解压目录

-->选择JRE（如jdk1.7.0_45）-->Finish

**b.** 鼠标右键单击项目名(JspProject)→ Properties，然后依次选择：

**①**Java Build Path-->Libraries-->Add Libraries-->Server Runtime-->Next-->选中刚才配置的Apache Tomcat v8.0-->Finish-->Apply 

**②**Targeted Runtimes->Apache Tomcat v8.0->OK

**(2)**新建Web项目：

file-->new-->other-->Dynamic Web Project-->启项目名-->finish

至此项目建立完毕。

**(3)**开发WEB项目：

右键WebContent-->new-->JSP file -->文件名-->finish

**(4)**部署项目，启动服务，运行项目

部署项目：在Servers标签中，点击“No Servers...”-->选中tomcat8-->next
-->选中需要部署的项目-->add-->finish

启动服务:右击servers里面的tomcat-->start即可

**(5)**运行项目：

打开浏览器输入

http://网络地址:端口号/项目名称/网页地址 

如http://localhost:8888/JspProject/index.jsp

# 1.5 本章练习 #

1.简述B/S架构与C/S架构的区别（难度★）。

2.使用Eclipse开发一个Web项目，通过项目中的JSP文件输出“Hello World”（难度★★）。

3.简述JSP的执行流程（难度★★）。










