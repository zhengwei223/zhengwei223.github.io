---

layout: post

title: Servlet与MVC设计模式

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍Servlet与MVC设计模式

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---

在学习Servlet之前，我们有必要先了解一下“MVC设计模式”。

# 4.1MVC设计模式简介 #

MVC模式（Model-View-Controller）是软件工程中常见的一种软件架构模式，该模式把软件系统（项目）分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。

使用MVC模式有很多优势，比如：

**①简化后期对项目的修改、扩展等维护操作；**

**②使项目的某一部分变得可以重复利用；**

**③使项目的结构更加直观。**

具体的讲，MVC模式可以将项目划分为模型（M）、视图（V）和控制器（C）三个部分，并赋予各个部分不同的功能，方便开发人员进行分组：

**a.视图（View）**：负责界面的显示，以及与用户的交互功能。例如表单、网页等。

 **b.控制器（Controller）**：可以理解为一个分发器，用来决定对于视图发来的请求，需要用哪一个模型来处理，以及处理完后需要跳回到哪一个视图。即用来连接视图和模型。

实际开发中，通常用控制器对客户端的请求数据进行封装（如将form表单发来的若干个表单字段值，封装到一个实体对象中），然后调用某一个模型来处理此请求，最后再转发请求（或重定向）到视图（或另一个控制器）。

**c.模型（Model）**：模型持有所有的数据、状态和程序逻辑。模型接受视图数据的请求，并返回最终的处理结果。

实际开发中，通常用封装数据的JavaBean和封装业务的JavaBean来实现模型层。

**MVC模式的流程如下：**

浏览器通过视图向控制器发出请求，控制器接收到请求之后通过选择模型进行处理，处理完请求以后再转发到视图，进行视图界面的渲染并做出最终响应，如图，

![](/public/img/jsp-servlet-zq/4.1.png)

*图4-01*

在MVC模式中，视图View可以用JSP/HTML/CSS实现，模型model可以用Java Bean实现，而控制器Control就可以用Servlet来实现。

# 4.2 Servlet #

Servlet是基于Java技术的Web组件，运行在服务器端，由Servlet容器所管理，用于生成动态网页的内容。Servlet是一个符合特定规范的Java程序，编写一个Servlet，实际上就是按照Servlet的规范编写一个Java类，Servlet主要用于处理客户端请求并做出响应。

在绝大多数的网络应用中，客户端都是通过HTTP协议来访问服务器端资源。这就要求我们编写的Servlet要适用于HTTP协议的请求和响应。我们本章讲解的Servlet，实际就是在讲解HttpServlet的相关类。

## 4.2.1开发第一个Servlet程序 ##

如果要开发一个能够处理HTTP协议的控制器Servlet，就必须要继承`javax.servlet.http.HttpServlet`，并重写`HttpServlet`类里的`doGet()`方法或`doPost()`方法，用来处理客户端发来的`get`请求或`post`请求，方法简介如下，

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>protected void doGet(HttpServletRequest req,  HttpServletResponse resp)  throws ServletException, IOException</td>
      <td>处理get方式的请求（如表单中,method=”get”；或超链接的请求方式）</td>
   </tr>
   <tr>
      <td>protected void doPost(HttpServletRequest req,  HttpServletResponse resp)  throws ServletException, IOException</td>
      <td>处理post方式的请求（如表单中,method=”post”）</td>
   </tr>
</table>

`doGet()`和`doPost()`方法中的参数`HttpServletRequest` 对象`req`和`HttpServletResponse` 对象`resp`，就等价于JSP中的内置对象`request`和`response`。换句话说，JSP中的内置对象`request`，实际就是HttpServletRequest类型的对象；JSP内置对象`response`，实际就是HttpServletResponse类型的对象。因此，在`doGet()`和`doPost()`方法中，分别用`req`和`resp`处理请求和响应。

接下来新建一个Web项目，用来开发第一个Servlet程序。先建一个名为ServletProject25的Web Project，并将Dynamic web module version选择为2.5，如图，

![](/public/img/jsp-servlet-zq/4.2.png)

*图4-02*

之后再将该项目部署到eclipse中的tomcat里，并在WebContent下建**index.jsp**，代码如下：

**index.jsp**

```
	<form action="WelcomeServlet" method="post" >
			<input type="submit" value="提交" />	
	</form>
```

需要注意`form`表单的提交地址是WelcomeServlet，以及提交方式为`post`。

接下来，再在`src`下建立一个继承自`javax.servlet.http.HttpServlet`的java类（称之为控制器Servlet），并重写HttpServlet的`doGet()`及`doPost()`方法，如下代码，

**WelcomeServlet.java**

```
package org.lanqiao.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WelcomeServlet extends HttpServlet
{
//处理get方式的请求
	@Override
	protected void doGet(HttpServletRequest req, 
HttpServletResponse resp) throws ServletException, IOException
	{
		// 通过resp获取输出对象out(等价于JSP中的内置对象out)
		PrintWriter out = resp.getWriter();
		out.print("doGet  --  Hello Servlet");
		// 关闭输出
		out.close();
	}
     
//处理post方式的请求
	@Override
	protected void doPost(HttpServletRequest req,
 HttpServletResponse resp) throws ServletException, IOException
	{
		// 通过resp获取输出对象out(等价于JSP中的内置对象out)
		PrintWriter out = resp.getWriter();
		out.print("doPost  --  Hello Servlet");
		// 关闭输出
		out.close();
	}
}
```

如果现在就执行**index.jsp**中的submit按钮，是无法通过action跳转到WelcomeServlet的。因为，在Dynamic web module version选择为2.5的情况下，要想成功的实现从JSP（或其他Servlet）跳转到某一个特定的Servlet，必须要在**web.xm**l中的`<web-app>`标签里，加入一些servlet配置，具体如下：

**web.xml**

```
<web-app>
…
<!-- 定义Servlet -->
<servlet>	

    <!-- 与“servlet-mapping”中的servlet-name相对应 -->
	<servlet-name>welcome</servlet-name>		

<!-- 实际处理的Servlet的全类名 -->	<servlet-class>org.lanqiao.servlet.WelcomeServlet</servlet-class> 

</servlet>

<!-- 映射路径 -->
<servlet-mapping>	
         <!-- 与“servlet”中的servlet-name相对应  -->
		<servlet-name>welcome</servlet-name>		

<!-- 请求的映射路径，如action地址。其中“/”表示项目的根路径 -->
	     <url-pattern>/WelcomeServlet</url-pattern>	

</servlet-mapping>
</web-app>
```

需要注意，每次修改**web.xml**后，都必须重新启动tomcat服务。

具体的流程是：当用户点击**index.jsp**中的提交按钮后，程序发现action请求地址是“WelcomeServlet”，然后就会在**web.xml**中`<servlet-mapping>`内的`<url-pattern>`里匹配“WelcomeServlet”（即，检查action的值是否与`<url-pattern>`中的值一致）。如果匹配成功，就会根据`<servlet-mapping>`中的`<servlet-name>`值“welcome”，再去匹配`<servlet>`中的`<servlet-name>`值（即，检查`<servlet-mapping>`中的`<servlet-name>`值，是否与`<servlet>`中的`<servlet-name>`值一致）。如果仍然匹配成功，就会去执行`<servlet>`中的`<servlet-class>`里面的Servlet实现类（如**org.lanqiao.servlet.WelcomeServlet**）。最后再根据请求方式，来决定执行Servlet实现类中的`doGet()`或`doPost()`方法。

**运行index.jsp，并点击“提交”按钮，得到结果：**

![](/public/img/jsp-servlet-zq/4.3.png)

*图4-03*

以上就是用纯手写的方式开发的第一个Servlet程序，对于初学者来说可能稍微复杂一些，但上述的原理是必须要搞清楚的。此外，我们还可以借助于Eclipse来帮助我们快速的开发Servlet程序。

## 4.2.2使用Eclipse快速开发Servlet程序 ##

用Eclipse开发Servlet，会比手工方式方便很多。我们接下来就用Eclipse来开发一个Servlet（需要确保项目的Dynamic web module version为2.5），步骤如下：

**①新建一个index1.jsp**

**Index1.jsp**

```
	<form action="WelcomeServletWithEclipse" method="post" >
		<input type="submit" value="提交" />	
	</form>
```

**②再在`src`下，直接创建一个servlet（不再是创建class）：**鼠标右键src→new→Servlet→
填入任意的Class name和固定的Super Class，如图，

![](/public/img/jsp-servlet-zq/4.4.png)

*图4-04*

点击Finish之后，我们就会得到一个已经继承了HttpServlet，并重写了`doGet()`和`doPost()`方法的类（即Servlet）。我们将注释等无关代码删除之后，得到如以下代码，

**WelcomeServletWithEclipse.java**

```
package org.lanqiao.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WelcomeServletWithEclipse extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public WelcomeServletWithEclipse() {
    }

	protected void doGet(HttpServletRequest request,
                                            HttpServletResponse response) 
throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException {
	}
}
```

上面代码中的serialVersionUID，读者暂时不用理会，可以直接先将其删除。

再观察一下**web.xml**，会发现Eclipse也已经为我们自动生成了`<servlet>`和`<servlet-mapping>`的相关配置。

也就是说，如果用Eclipse创建一个servlet，就会得到一个已经继承了HttpServlet，并重写了`doGet()`和`doPost()`方法的类，并且自动完成了**web.xml**的配置。因此，使用Eclipose开发Servlet，可以提高我们的开发效率。

以上就是项目的Dynamic web module version为2.5时，开发servlet程序的方法及步骤。

## 4.2.3 Servlet3.0简介 ##

接下来再重新创建一个Web项目，此次将Dynamic web module version选为3.0，如图，

![](/public/img/jsp-servlet-zq/4.5.png)

*图4-05*

再创建一个**index.jsp**，

**index.jsp**

```
		<form action="WelcomeServlet30WithEclipse" method="post" >
			<input type="submit" value="提交" />	
		</form>	
```

这次再尝试通过Eclipse来创建一个名为WelcomeServlet30WithEclipse的servlet，会得到如下代码，

**WelcomeServlet30WithEclipse.java**

```
package org.lanqiao.servlet;
//省略import 
@WebServlet("/WelcomeServlet30WithEclipse")
public class WelcomeServlet30WithEclipse extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	
public WelcomeServlet30WithEclipse() 
{
    }
    
	protected void doGet(HttpServletRequest request, 
HttpServletResponse response)
                      throws ServletException, IOException 
{
	}
	
	protected void doPost(HttpServletRequest request, 
HttpServletResponse response)
 throws ServletException, IOException 
{
	}
}
```

仔细观察上面代码，会发现本次用Dynamic web module version3.0开发的servlet，比之前用Dynamic web module version为2.5开发的servlet多了一句@WebServlet("/WelcomeServlet30WithEclipse")；再观察**web.xml**，会发现**web.xml**中,并没有像之前那样自动生成`<servlet>`和`<servlet-mapping>`的配置。但如果我们给`doGet()`方法加入输出语句，如下，

```
protected void doGet(HttpServletRequest request,
                              HttpServletResponse response) 
throws ServletException, IOException
	{
		PrintWriter out = response.getWriter();
		out.print("doPost  --  Hello Servlet3.0");
		out.close();
	}
```

然后启动服务，直接运行**index.jsp**，点击提交后，也能得到正确的结果，如图：

![](/public/img/jsp-servlet-zq/4.6.png)

*图4-06*

也就是说，Dynamic web module version3.0与Dynamic web module version2.5的区别是（本质是Servlet3.0和Servlet2.5的区别）：不用在web.xml中配置servlet，而是直接使用@WebServlet在创建的Servlet类名前加上映射路径（相当于之前web.xml中的`<url-pattern>`），如@WebServlet("/WelcomeServlet30WithEclipse")。

## 4.2.4 Servlet生命周期 ##

Servlet是运行在服务器端的一段程序，所以Servlet的生命周期会受Servlet容器的控制。Servlet生命周期包括加载、初始化、服务、销毁、卸载等5个部分，如图，

![](/public/img/jsp-servlet-zq/4.7.png)

*图4-07*

通常情况，加载和卸载阶段可以由Servlet容器来处理，我们只需要关注初始化、服务、销毁三个阶段。与Servlet生命周期相关的方法，如下表，

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void init() throws ServletException</td>
      <td>Servlet初始化时调用</td>
   </tr>
   <tr>
      <td>public void init(ServletConfig config)  throws ServletException</td>
      <td>init() 的重载方法，Servlet初始化时调用，并可以通过config来读取配置信息</td>
   </tr>
   <tr>
      <td>public abstract void service(ServletRequest req, ServletResponse res)   throws ServletException, IOException;</td>
      <td>提供Servlet服务的方法。此方法是抽象方法，故实际使用的是此抽象方法的实现方法doGet()或doPost()来处理get或post请求</td>
   </tr>
   <tr>
      <td>public void destroy()</td>
      <td>Servlet销毁时调用</td>
   </tr>
</table>

### 1.初始化

当一个Servlet被加载完毕并实例化以后，Servlet容器将调用`init()`方法初始化这个对象，执行一些初始化的工作，如读取资源配置信息等。如果初始化阶段发生错误，此Servlet实例将被容器直接卸载。

### 2.服务

初始化完成以后，Servlet就会去调用`service()`的具体实现方法`doGet()`或`doPost()`，来处理请求；并通过`ServletRequest`类型的参数接收客户端的请求，以及通过`ServletResponse`类型的参数处理响应信息。

### 3.销毁

Servlet实例服务完毕以后，就可以通过`destroy()`方法来指明哪些资源可以被系统回收（注意`destroy()`方法只是“指明”需要被回收的方法，并不会直接进行回收）。


下面我们通过一个例子，来看一下Servlet生命周期的执行流程：

```
package org.lanqiao.servlet;

// 省略import…
@WebServlet("/LifeCycleServlet")
public class LifeCycleServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException
	{
		System.out.println("初始化init()...");
	}

	protected void doGet(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		System.out.println("servlet服务doGet()...");
	}

	protected void doPost(HttpServletRequest request,
                                HttpServletResponse response) 
throws ServletException, IOException
	{
		System.out.println("servlet服务doPost()...");
	}

	@Override
	public void destroy()
	{
		System.out.println("销毁destroy()...");
	}
}
```

前面讲过，通过浏览器的地址栏访问服务器，属于`GET`方式的请求。现在直接访问[http://localhost:8888/ServletProject30/LifeCycleServlet](http://localhost:8888/ServletProject30/LifeCycleServlet)，第一次访问时，运行结果：

![](/public/img/jsp-servlet-zq/4.8.png)

*图4-08*

重复执行多次后，运行结果：

![](/public/img/jsp-servlet-zq/4.9.png)

*图4-09*

关闭服务器（注意是在Servers面板中点击红色的关闭按钮，而不是在Console控制台中），可以发现Servlet容器确实执行了`destroy()`方法，运行结果：

![](/public/img/jsp-servlet-zq/4.10.png)

*图4-10*

不难发现，在Servlet生命周期中，初始化`init()` 方法只在第一次访问时执行一次；而`doGet()`或`doPost()`方法会在服务器每次接收请求时，都执行一次；销毁`destroy()`方法只会在关闭服务时执行一次。

需要说明，初始化方法`init()`默认会在客户端第一次调用servlet服务（即调用`doGet()`或`doPost()`）时执行，但也可以通过配置（servlet2.5通过 web.xml配置；servlet3.0通过注解配置），让初始化`init()`方法在Tomcat容器启动时自动执行。具体的配置方法如下：

**①	如果使用servlet2.5：**

在**web.xml**中的`<servlet>`标签中加入`<load-on-start-up>`，如下：

```
<servlet>
   	 	 <servlet-name>servlet名字...</servlet-name>
   		 <servlet-class>具体的servlet处理类...</servlet-class>
    	     <load-on-startup>1</load-on-startup>
</servlet>	
```

**②	如果使用servlet3.0：**

在`@WebServlet`中加入`loadOnStart`属性，如下：

```
@WebServlet(value="/LifeCycleServlet",loadOnStartup=1)
public class LifeCycleServlet extends HttpServlet
{
	@Override
	public void init() throws ServletException
	{
		System.out.println("初始化init()...");
	}
    //doGet()..doPost()…
```

配置完毕后，再次启动Tomcat服务，可以看到`init()`方法会在tomcat启动时自动执行，如图，

![](/public/img/jsp-servlet-zq/4.11.png)

*图4-11*

其中`loadOnStartup=1`，表示如果有多个servlet同时配置了loadOnStartp，则此处servlet的`init()`方法会第1个执行；`<load-on-startup>`同理。

## 4.2.5 Servlet API ##

Servlet API由两个软件包组成：一个是对应HTTP的软件包，另一个是不对应HTTP的通用的软件包。这两个软件包的同时存在使得Servlet API能够适应任何请求-响应协议。

我们本书使用的`javax.servlet.http`包中的类和接口，都是基于HTTP协议的。

![](/public/img/jsp-servlet-zq/4.12.png)

*图4-12*

上面是Servlet的继承实现图，由图可知，我们自己定义的Servlet，会依次继承`HttpServlet`、`GenericServlet`，而GenericServlet会实现`ServletConfig`、`Servlet`和`Serializable`接口。

### (1)	`ServletConfig`接口

`ServletConfig`对象可以在Servlet初始化时，向该Servlet传递信息。`ServletConfig`接口中的常用方法如下表，

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public ServletContext getServletContext()</td>
      <td>获取Servlet上下文对象</td>
   </tr>
   <tr>
      <td>public String getInitParameter(String name)</td>
      <td>在当前Servlet范围内，获取名为name的初始化参数</td>
   </tr>
</table>

说明：

**我们以前学过“接口中的方法均为抽象方法，且`abstract`可省”，所以`ServletConfig`接口中的方法，如`getServletContext()`、`getInitParameter(String name)`等，实际都是抽象方法，即省略了关键字abstract。**

在使用`ServletConfig`接口时，通常也会用到`ServletContext`、`ServletRequest`、`HttpServletRequest`、`ServletResponse`、`HttpServletResponse`等接口。

**①`ServletContext`**

`ServletContext`表示Web应用的上下文，`ServletContext`对象可以被Servlet容器中的所有Servlet共享。JSP中的内置对象`application`就是`ServletContext`的实例。`ServletContext`提供了`getContextPath()`，`getRealPath（）`、`setAttribute()`、`getAttribute()`等方法，这些方法在之前讲解`application`时已经讲过，这里不再赘述。现在只介绍一下`ServletContext`提供的`getInitParameter()`方法，如下表，

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public String getInitParameter(String name)</td>
      <td>在整个Web容器，获取名为name的初始化参数</td>
   </tr>
</table>

需要注意，在`ServletConfig`中的`getInitParameter()`方法中，初始化参数的取值范围是“当前Servlet范围内”；而`ServletContext`中的`getInitParameter()`方法中，初始化参数的取值范围是在整个Web容器。

先来看一下`getInitParameter()`在Servlet2.5中的应用：

在之前ServletProject25项目的**web.xml**中，给Web容器设置一个共享的初始化参数`<context-param>`，再给WelcomeServletWithEclipse这个具体的Servlet也设置一个初始化参数`<init-param>`，如下，

**web.xml**

```
<web-app … version="2.5">
  ……
  <!-- 给Web容器设置共享的初始化参数 -->
  <context-param>
         <!--参数名 -->
  		<param-name>globalContenxtParam</param-name>
         <!--参数值 -->
  		<param-value>global context value...</param-value>
  </context-param>
  
  <servlet>
   	 	<servlet-name>WelcomeServletWithEclipse</servlet-name>
   	 	<servlet-class>
org.lanqiao.servlet.WelcomeServletWithEclipse
</servlet-class>
   	 	<!-- 给当前具体的Servlet设置初始化参数 -->
   	 	<init-param>
              <!--参数名 -->
  			<param-name>servletContenxtParam</param-name>
               <!--参数值 -->
  			<param-value>servlet context value...</param-value>
  		</init-param>
  </servlet>
  <servlet-mapping>
    <servlet-name>WelcomeServletWithEclipse</servlet-name>
    <url-pattern>/WelcomeServletWithEclipse</url-pattern>
  </servlet-mapping>
</web-app>
```


以上，给Web容器设置了名为globalContenxtParam的初始化参数，给WelcomeServletWithEclipse这个具体的Servlet设置了名为servletContenxtParam的初始化参数。之后，再在具体的Servlet中，将这两个初始化参数的值都取出来，如下，
**WelcomeServletWithEclipse.java**

```
package org.lanqiao.servlet;

//省略import
public class WelcomeServletWithEclipse extends HttpServlet
{
	private static final long serialVersionUID = 1L;

    @Override
	public void init() throws ServletException
	{
		//获取当前Servlet的初始化参数
		String servletContenxtParam 
=getInitParameter("servletContenxtParam");
		System.out.println("当前Servlet的初始化参数："
 + servletContenxtParam);

		//获取Web容器共享的初始化参数
		String globalContenxtParam
                                = getServletContext()
.getInitParameter("globalContenxtParam");
		System.out.println("Web容器的初始化参数：" + globalContenxtParam);
	}
//doGet(),doPost()…	
}
```

运行结果：

![](/public/img/jsp-servlet-zq/4.13.png)

*图4-13*

在Servlet3.0中：可以用`@WebServlet`注解来在当前Servlet范围内设置初始值，例如，
之前Servlet2.5的**web.xml**中的以下代码，

```
<servlet>
…
   	 	<!-- 给具体的Servlet设置初始化参数 -->
   	 	<init-param>
  			<param-name>servletContenxtParam</param-name>
  			<param-value>servlet context value...</param-value>
  		</init-param>
  </servlet>
```

在Servlet3.0中，等价于：
**WelcomeServlet30WithEclipse.java**

```
…
@WebServlet(value="/WelcomeServlet30WithEclipse",
initParams={@WebInitParam(name = "servletContenxtParam", 
value = "servlet context value...")} )
public class WelcomeServlet30WithEclipse extends HttpServlet
{
	…
}
```

也就是说，用`@WebServlet`注解里`initParams`属性中的`@WebInitParam`来指定“当前Servlet范围内的初始值”，等价于 **web.xml** 中 `<servlet>`中的 `<init-param>` 子标签。

**②`ServletRequest`**

当客户端请求服务端的Servlet时，Servlet容器会创建一个`ServletRequest`对象，用于封装客户端的请求信息。并且这个`ServletRequest`对象会被容器作为`service(HttpServletRequest req, HttpServletResponse resp)`方法的第一个参数传递给Servlet。Servlet能利用这个`ServletRequest`对象获取客户端的请求数据。

`ServletRequest`接口提供了我们经常用到的`setAttribute()`、`getAttribute()`、`removeAttribute()`方法。

**③`HttpServletRequest`**

`javax.servlet.http. HttpServletRequest`接口继承自`ServletRequest`接口。`HttpServletRequest`接口除了继承的方法外，额外增加了以下常用方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>String getContextPath</td>
      <td>获取请求URI中表示请求上下文的路径。假设请求地址是http://localhost:8888/Test/MyServlet，则getContextPath()获取到的就是/Test。</td>
   </tr>
   <tr>
      <td>Cookie[] getCookies()</td>
      <td>获取客户端在此次请求中发送的所有Cookie对象</td>
   </tr>
   <tr>
      <td>HttpSession getSession()</td>
      <td>获取和此次请求相关的Session。如果没有给客户端分配Session，则创建一个新的Session。</td>
   </tr>
   <tr>
      <td>String getMethod()</td>
      <td>获取此次HTTP请求的的方法名。默认是GET，也可以指定为PUT或POST等</td>
   </tr>
</table>


**④`ServletResponse`**

	Servlet容器接收到客户请求后，还会创建一个ServletResponse对象，用来封装响应数据，并且也会将这个ServletResponse对象作为service(HttpServletRequest req, HttpServletResponse resp)方法的第二个参数传递给Servlet。

Servlet可以利用`ServletRequest`对象获取客户端的请求数据，并把处理后的响应数据通过`ServletResponse`对象返回给客户端。

`ServletResponse`接口的常用方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>PrintWriter getWriter()</td>
      <td>获取PrintWriter对象，等价于JSP中的内置对象out</td>
   </tr>
   <tr>
      <td>String getCharacterEncoding()</td>
      <td>获取在响应过程中，发送的文本所使用的编码类型</td>
   </tr>
   <tr>
      <td>void setCharacterEncoding()</td>
      <td>设置响应文本的编码类型</td>
   </tr>
   <tr>
      <td>void setContentType(String type)</td>
      <td>设置响应正文的MIME类型</td>
   </tr>
</table>

**⑤`HttpServletResponse`**

`HttpServletResponse`接口继承自`ServletResponse`接口，用于对客户端的请求进行响应。它除了继承的方法外，还额外增加了以下常用方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>void addCookie(Cookie cookie)</td>
      <td>在响应中增加Cookie对象</td>
   </tr>
   <tr>
      <td>void sendRedirect(String location) throws IOException</td>
      <td>发送一个重定向跳转</td>
   </tr>
   <tr>
      <td>void addHeader(String name,String value)</td>
      <td>将一个名为name，值为value的响应报头添加到响应中</td>
   </tr>
</table>

### (2)	Servlet接口

在servlet接口中，定义了之前提到过的带参数的`init()`、`service()`、`destroy()`等方法，此外，还提供了`getServletConfig()`方法用于获取`ServletConfig`对象、 `getServletInfo()`方法用于获取 Servlet信息等。

### (3)	`GenericServlet`抽象类

`GenericServlet`是一个抽象类，实现了`ServletConfig`接口、`Servlet`接口和`Serializable`接口。`GenericServlet`的部分源代码如下：

```
	public abstract class GenericServlet implements Servlet,
 ServletConfig,java.io.Serializable {
    private static final long serialVersionUID = 1L;
    private transient ServletConfig config;
    @Override
    public void destroy() {
    }
    @Override
    public String getServletInfo() {
        return "";
    }
    public void log(String msg) {
        getServletContext().log(getServletName() + ": " + msg);
    }
    @Override
    public abstract void service(ServletRequest req, ServletResponse res)
            throws ServletException, IOException;
    //其他空实现、或简单实现的方法...
}
```

从源码中可以发现，`GenericServlet`是对`Servlet`、`ServletConfig`和`Serializable`接口中的方法进行了空实现或简单的实现，但唯独对`service()`方法没有任何实现。

### (4)	`HttpServlet`抽象类

`HttpServlet`继承了`GenericServlet`，对`GenericServlet`中的方法进行了实现。我们目前需要掌握的，就是其中的`service()`方法。`HttpServlet`源码的部分代码结构，如下，

```
public abstract class HttpServlet extends GenericServlet{
	private static final String METHOD_GET = "GET";
	private static final String METHOD_POST = "POST";

	protected void doGet(HttpServletRequest req,
                             HttpServletResponse resp) 
throws ServletException, IOException{
		// 具体实现代码
	}
	protected void doPost(HttpServletRequest req,
 HttpServletResponse resp) 
throws ServletException, IOException{
		// 具体实现代码
	}
	@Override
	public void service(ServletRequest req, ServletResponse resp) 
throws ServletException, IOException{
		HttpServletRequest request;
		HttpServletResponse response;
		// 将ServletRequest对象，强制转换为HttpServletRequest对象
		request = (HttpServletRequest) req;
		// 将ServletResponse对象，强制转换为HttpServletResponse对象
		response = (HttpServletResponse) resp;
		service(request, response);
		//省略其他代码
	}
	protected void service(HttpServletRequest req,
 HttpServletResponse resp) 
throws ServletException, IOException{
		String method = req.getMethod();
		// 如果是以GET方式请求
		if (method.equals(METHOD_GET)){
			// 具体实现代码
		}
		// 如果是以POST方式请求
	}else if(method.equals(METHOD_POST)){
		doPost(req, resp);
	}
	// 如果是以其他方式请求
	else if(method.equals(...)){
            	//具体实现代码
     }
	...
	else{
		// 具体实现代码
	}
}
```


仔细阅读上面源代码结构，可以发现HttpServlet提供了两个重载的`service()`方法，其中`service(ServletRequest req, ServletResponse res)`方法，将ServletRequest对象，强制转换为`HttpServletRequest`对象；将`ServletResponse`对象，强制转换为`HttpServletResponse`对象；并根据请求方式的不同(`get`、`post`等方式)，调用了不同的处理方法。因此，我们以后在编写具体的Servlet时，只需要先继承HttpServlet，然后重写`doGet()`或 `doPost()`方法即可。
# 4.3MVC设计模式案例

现在，我们通过一个完整的例子，演示一个使用MVC的程序。

本程序仍然实现一个注册功能，采用Servlet2.5实现，读者可自行使用Servlet3.0尝试。

在本程序中，视图采用JSP实现，模型采用Java Bean实现，控制器采用Servlet来实现。

视图1：注册界面 -- **register.jsp**

```
	<body>
		<form action="LoginServlet" method="post" >
			用户名:<input type="text" name="uname" /><br/>
			密码:<input type="password" name="upwd" /><br/>
			年龄:<input type="text" name="uage" /><br/>
			地址:<input type="text" name="uaddress" /><br/>
			<input type="submit" value="注册" />	
		</form>
	</body>
```

模型1：封装数据的JavaBean -- **User.java**

```
package org.lanqiao.entity;
public class User
{
	private String username;
	private String userPassword;
	private int userAge;
	private String userAddress ;
	
	public User()
	{
	}
	public User(String username, String userPassword
, int userAge, String userAddress)
	{
		this.username = username;
		this.userPassword = userPassword;
		this.userAge = userAge;
		this.userAddress = userAddress;
	}
	//省略setter、getter
}
```

模型2：封装业务的JavaBean -- **UserDao.java**

```
package org.lanqiao.dao;
…
public class UserDao
{
	// 将用户信息（用户名，密码，年龄，地址）写入数据库
	public void addRegisterInfo(User user)
	{
		Connection con = null;
		Statement stmt = null;

		try
		{
			Class.forName("oracle.jdbc.OracleDriver"); // 加载数据库驱动
			// 创建连接
			con = DriverManager
.getConnection("jdbc:oracle:thin:@127.0.0.1:1521:XE"
, "system", "sa");
			// 创建Statement对象
			stmt = con.createStatement();
			String sql = "insert into userInfo(uname,upwd,uage
,uaddress) values('" + user.getUsername() 
+ "','" + user.getUserPassword()+ "','"
+user.getUserAge()+"','"
+user.getUserAddress() +"')";
			stmt. executeUpdate (sql);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				stmt.close();
				con.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
			}
		}
	}
}
```

控制器：**loginServlet.java**

```
package org.lanqiao.servlet;
…
public class LoginServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		//若是get方式的请求，则也转到post方式处理
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
                             HttpServletResponse response) 
throws ServletException, IOException
	{
		//将请求的编码与页面保持一致，设置为UTF-8
		request.setCharacterEncoding("UTF-8");
		//接收视图传来的数据
		String name = request.getParameter("uname");
		String pwd = request.getParameter("upwd");
		String address = request.getParameter("uaddress");
		String uage = request.getParameter("uage");
		int age = Integer.parseInt(uage) ;
		//将数据封装到JavaBean中
		User user = new User(name,pwd,age,address);
		//调用封装业务的JavaBean，进行数据库的操作
		UserDao userDao = new UserDao();
		userDao.addRegisterInfo(user);
		//将用户信息放入session中
		request.getSession().setAttribute("userInfo", user);
		
		//注册完毕，跳转到显示页面
		request.getRequestDispatcher("welcome.jsp")
.forward(request, response);
	}
}
```

**web.xml**

```
…
<servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>org.lanqiao.servlet.LoginServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/LoginServlet</url-pattern>
</servlet-mapping>
…
```

视图2：欢迎页 – **welcome.jsp**

```
<body>
		欢迎您<%=((User)session.getAttribute("userInfo")).getUsername() %>
</body>
```

最后再将`oracle`所需要的驱动包导入`lib`目录。

访问[http://localhost:8888/MVCProject/register.jsp](http://localhost:8888/MVCProject/register.jsp)，如图，

![](/public/img/jsp-servlet-zq/4.14.png)

*图4-14*

点击注册后，运行结果：

![](/public/img/jsp-servlet-zq/4.15.png)

*图44-15*

查看数据表：

![](/public/img/jsp-servlet-zq/4.16.png)

*图4-16*

执行的流程，大致如下图，

![](/public/img/jsp-servlet-zq/4.17.png)

*图4-17*

程序中使用到的数据（用户信息），也是通过模型中的JavaBean（User.java）来传递的。

# 4.4练习题 #

**一、选择题**

1  下列关于Servlet生命周期的描述，正确的是（    ）。（选择一项）

A．Servlet生命周期依次包括：初始化、加载和实例化、处理请求和销毁

B．默认情况下，在Servlet容器中配置好的Servlet会在Servlet容器启动的时候加载
并实例化
并实例化

C．用户访问完一个Servlet，为了节省内存空间，该Servlet实例会立即销毁

D．在Servlet初始化阶段，会调用`init()`方法进行初始化相关工作

2  `GenericServlet`抽象类实现了（    ）。（选择两项）

A．Servlet接口

B．ServletConfig接口

C．ServletContext接口

D．ServletRequest接口

3  在JSP内置对象中，（    ）对象是实现了`ServletContext`接口的实例。（选择一项）

A．`page`

B．`request`

C．`session`

D．`application`

**二、简答题**

1.简述Servlet2.5和Servlet3.0在实际使用中的不同之处。（难度★★）

2.简述Servlet的生命周期。（难度★★）

3.如何使Servlet的`init()`方法在Web容器启动时自动执行？（难度★）

4.如何给Web容器和具体的Servlet设置初始化参数并获取？（难度★★）

5.简述MVC设计模式以及优势。（难度★★★）

6.请描述JSP和Servlet的关系。（难度★★）

7.Servlet的生命周期分哪几个部分？每一部分分别要执行什么方法？一个Servlet在什么情况下被创建和销毁？（难度★★）

8.使用Servlet及MVC设计模式优化第四章第2小题“部门管理系统”。（难度★★★★）
















