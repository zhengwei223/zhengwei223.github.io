---


layout: post


title: 新增内容1：虚拟主机


category: JSP-Servlet教程


tags: JSP Servlet


description: 


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet


---


**(4)配置Web应用的虚拟路径**

Tomcat默认会将Web项目放在webapps目录下，但是，如果将所有的Web项目都放在webapps里也是不合理的。要想把Web项目放置到webapps以外的目录并能被Tomcat识别，就必须配置虚拟路径。例如，如果将之前的JspProject项目放在**D:\MyWebApps**中，就必须配置虚拟路径才能访问。


**配置虚拟路径有以下两种方式：**


**①通过server.xml配置虚拟路径**

打开**D:\apache-tomcat-8.0.32\conf\server.xml**文件，在`<Host>`元素中，增加并配置`<Context>`元素，如下：

```
<Host appBase="webapps" autoDeploy="true" name="localhost" … >
	<Context docBase="D:\MyWebApps\JspProject" path="/JspProject" />
</Host>
```

`<Context>`可以将一个普通目录映射成一个可供Tomcat访问的虚拟目录。其中，docsBase指定本地磁盘上的普通目录；path指定Tomcat访问时的虚拟目录，可以使用绝对路径或相对路径（相对于D:\apache-tomcat-8.0.32\webapps\）。换句话说，当用户访问path指定的虚拟目录(/JspProject)时，就会自动访问docBase指定的本地目录（D:\MyWebApps\JspProject）。


重启Tomcat服务器，再次访问[http://localhost:8888/JspProject/](http://localhost:8888/JspProject/)，运行结果：

![](http://i.imgur.com/etAppG0.png)

*图33-01*

可见，配置了虚拟路径后，就可以访问到webapps目录以外的项目。


**②通过自定义xml文件配置虚拟路径**

在**server.xml**中配置虚拟路径的弊端是：每次修改完**server.xml**，都必须重启Tomcat服务器。


为了避免这个问题，就可以使用另一种方式：**通过自定义xml文件来配置虚拟路径。**


打开**D:\apache-tomcat-8.0.32\conf\Catalina\localhost**目录，创建 “项目名.xml”（如**JspProject.xml**），配置`<Context>`元素（同**server.xml**方式），如下：

**D:\apache-tomcat-8.0.32\conf\Catalina\localhost\JspProject.xml**

`<Context docBase="D:\MyWebApps\JspProject" path="/JspProject" />`


直接访问[http://localhost:8888/JspProject/](http://localhost:8888/JspProject/)，运行结果：

![](http://i.imgur.com/1OSRfSR.png)

*图33-02*

此外，还能用此方法配置默认的Web项目：将**JspProject.xml**重命名为**ROOT.xml**即可。之后，直接访问[http://localhost:8888/index.jsp](http://localhost:8888/index.jsp)，运行结果：

![](http://i.imgur.com/QU0B84C.png)

*图33-03*



**(5)配置虚拟主机**

目前，访问本地Web项目的路径格式是：

**http://localhost:端口号/项目名/文件名**


能否使用“www.项目名.com”的形式访问呢?可以，但需要配置虚拟主机。配置的具体步骤如下：

**①配置server.xml**

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

![](http://i.imgur.com/Odax7dE.png)

*图33-04*

至此，虚拟主机的配置方法已经全部讲完。但为了与后续章节保持一致，请读者在学习完本节后，将本节涉及的所有配置进行还原，即：删除hosts文件中的配置、将端口号恢复至本书使用的8888、将**servers.xml**中Engine的`defaultHost`值改回至`localhost`。



