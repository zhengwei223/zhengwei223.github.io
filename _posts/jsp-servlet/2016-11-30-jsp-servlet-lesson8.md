---

layout: post


title: 过滤器与监听器


category: JSP-Servlet教程


tags: JSP Servlet


description: 本章将系统介绍过滤器与监听器。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---

# 8.1 过滤器 #

## 8.1.1 过滤器原理 ##

过滤器（Filter）的基本功能是对Servlet的调用过程进行拦截，从而在Servlet处理请求及响应的过程中增加一些特定的功能。

常见用Filter实现的功能有：URL级别的权限访问控制、过滤敏感词汇、压缩响应信息、设置POST方式的统一编码等。

程序中的过滤器就好比生活中的自来水过滤器，可以将水中的杂质、有害物质等进行过滤，从而使水变得更加有利于我们使用。

![](http://i.imgur.com/wTRPGUq.gif)

*图8-01*

如上图，当客户端向服务器中的资源发出请求时，会先被过滤器Filter进行拦截处理，之后再将处理后的请求转发给真正的服务器资源。此外，当服务器接收到请求并对其做出响应后，响应结果也会先被过滤器拦截处理，之后再将处理后的响应转发给客户端。即在请求、响应的过程前，都会先被过滤器进行拦截处理。

程序中的过滤器，实际就是一个实现了`javax.servlet.Filter`接口的类，`javax.servlet.Filter`接口中定义了以下3个方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>void init(FilterConfig conf)</td>
      <td>用于执行过滤器的初始化工作。Web容器会在Web项目启动前，自动调用该方法。该方法类似于Servlet中的init()。</td>
   </tr>
   <tr>
      <td>void doFilter(ServletRequest request,  ServletResponse response,  FilterChain chain)</td>
      <td>当请求和响应被过滤器拦截后，就通过doFilter()方法来处理：request参数就是拦截的请求对象，response参数就是拦截的响应对象，可以使用FilterChain参数的doFilter()方法来将拦截的请求和释放。类似于Servlet中的doGet()、doPost()。</td>
   </tr>
   <tr>
      <td>void destroy()</td>
      <td>用于释放或关闭被Filter对象打开的资源，例如关闭数据库、关闭IO流等操作。在Web项目关闭时，由Web容器自动调用该方法。类似于Servlet中的destroy()。</td>
   </tr>
</table>

与Servlet类似，Filter的`init()`和`destroy()`方法各自只会被调用一次，而`doFilter()`方法会在每次客户端发出请求时被调用。

其中`init()`方法里的FilterConfig参数，主要为过滤器提供初始化参数。

**FilterConfig是一个接口，常用的方法如下：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>String getFilterName()</td>
      <td>获取web.xml中的过滤器的名称</td>
   </tr>
   <tr>
      <td>String getInitParameter(String param)</td>
      <td>获取web.xml中参数名对应的参数值</td>
   </tr>
   <tr>
      <td>ServletContext getServletContext()</td>
      <td>获取web应用程序的ServletContext</td>
   </tr>
</table>

## 8.1.2开发第一个Filter程序 ##

本示例采用Servlet2.5版本。

**步骤：**

**(1)**新建Web项目（项目名是FilterProject）；再在WebContext下新建`jsp`，在`src`下新建Servlet。如下：



发送请求的客户端JSP：**index.jsp**

```…
<a href="MyServlet">访问MyServlet...</a>
…
```

处理请求的控制器**Servlet：MyServlet.java**

```
…
public class MyServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request,
 HttpServletResponse response) 
throws ServletException, IOException {
		System.out.println("doGet…");
	}
	…
}
```

在**web.xml**中配置此Servlet:

```
<servlet>
    <servlet-name>MyServlet</servlet-name>
    <servlet-class>
org.lanqiao.servlet.MyServlet
</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>MyServlet</servlet-name>
    <url-pattern>/MyServlet</url-pattern>
</servlet-mapping>
```

**(2)**开发过滤器，拦截Servlet程序。

新建一个过滤器（即实现了`javax.servlet.Filter`接口的类）。

**MyFirstFilter.java**

```
package org.lanqiao.servlet;

import java.io.IOException;
import javax.servlet.*;

public class MyFirstFilter implements Filter
{
	@Override
	public void init(FilterConfig arg0) throws ServletException
	{
		System.out.println("过滤器01的初始化init()方法...");
	}
	
	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
			throws IOException, ServletException
	{
		System.out.println("过滤器01的执行方法:doFilter()方法...");
	}
	
	@Override
	public void destroy()
	{
		System.out.println("过滤器01的销毁destory()方法...");
	}
}
```

在**web.xml** 中配置此Filter：

```
<filter>
  	<filter-name>MyFirstFilter</filter-name>
  	<filter-class>
org.lanqiao.filter. MyFirstFilter
</filter-class>
 </filter>
 <filter-mapping>
  	<filter-name>MyFirstFilter</filter-name>
  	<url-pattern>/MyServlet</url-pattern>
</filter-mapping>
```

Filter的配置方法和Servlet的配置方法相类似：先通过`<url-pattern>`匹配需要拦截的请求，再根据`<filter-name>`找到对应的过滤器处理类`<filter-class>`,最后执行过滤器处理类中的`init()`、`doFilter()`、`destroy()`等方法。

**(4)**部署并启动项目，访问**index.jsp**中的超链接，可以在控制台看到以下输出：

![](http://i.imgur.com/6DrHIo6.png)

*图8-02*

可以发现，**index.jsp**通过超链接向Servlet发出的请求确实被Filter拦截了，甚至只执行了Filter中的`doFilter()`方法，而没有执行Servlet中的`doGet()`方法。如果想让请求被Filter拦截之后，仍然能正常访问到当初所请求的Servlet，则需要在Filter的`doFilter()`方法里加上`chain.doFilter()`方法，表示拦截完毕、释放请求及响应，如下：

**MyFirstFilter.java**

```
…
public class MyFirstFilterimplements Filter
{
    
	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
		        	throws IOException, ServletException
	{
		System.out.println("过滤器01的执行方法:doFilter()方法...");
		chain.doFilter(request, response);
	}
}
```

 修改**MyFirstFilter.java**以后，重启服务，再次运行并访问**index.jsp**中的超链接，可在控制台看到以下输出：

![](http://i.imgur.com/PKdBcOe.png)

*图8-03*

从输出结果可以得知，**index.jsp**发出的请求确实先被Filter进行了拦截处理，然后再执行了Servlet中的`doGet()`方法。

之前讲过，Filter能对请求和响应都进行拦截。实际上在Filter中，`chain.doFilter()`之前的代码就是拦截请求时所执行得代码，`chain.doFilter()`之后的代码就是拦截响应时所执行得代码，将过滤器修改如下：

**MyFirstFilter.java**

```
…
public class MyFirstFilter implements Filter
{
	…
	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
			throws IOException, ServletException
	{
		System.out.println("拦截请求01...");
		chain.doFilter(request, response);
		System.out.println("拦截响应01...");
	}
}
```

再次重启服务并执行**index.jsp**中的超链接，得到以下输出：

![](http://i.imgur.com/Nss3RWj.png)

*图8-04*

即Filter会先拦截请求（即执行`chain.doFilter()`之前的代码），然后通过`chain.doFilter()`释放请求（去执行Servlet中的`doGet()`/`doPost()`），最后再拦截响应（即执行`chain.doFilter()`之后的代码）。

## 8.1.3 Filter映射 ##

Filter通过**web.xml**中的`<url-pattern>`元素来配置需要拦截的请求。例如，之前编写的

`<url-pattern>/MyServlet</url-pattern>`

表示拦截请求路径为“`/MyServlet`”的请求。如果想拦截项目中的所有请求，可以使用通配符“*”，如下：

`<url-pattern>/*</url-pattern>`

其中“/”表示当前项目的根路径，相当于[http://localhost:8888/FilterProject/](http://localhost:8888/FilterProject/)。

还可以给通配符加上自定义后缀，如下，

`<url-pattern>/*.do</url-pattern>`

表示拦截所有以“`.do`”结尾的请求，如http://localhost:8888/ProjectName/ServletName.do。

此外，还可以通过`<filter-mapping>`的子元素`<dispatcher>`来指定拦截特定方式的请求，如下：

```
<filter-mapping>
     …
  	<dispatcher>拦截方式1</dispatcher>
<dispatcher>拦截方式2</dispatcher>
<dispatcher>…</dispatcher>
</filter-mapping>
```

**常见拦截方式的值有以下四个：**

<table>
   <tr>
      <td>拦截方式的值</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>REQUEST</td>
      <td>只会拦截通过地址栏直接访问方式发出的请求。</td>
   </tr>
   <tr>
      <td>INCLUDE</td>
      <td>只会拦截通过RequestDispatcher的include()方式发出的请求。</td>
   </tr>
   <tr>
      <td>FORWARD</td>
      <td>只会拦截通过RequestDispatcher的forward()方式发出的请求（即请求转发方式）。</td>
   </tr>
   <tr>
      <td>ERROR</td>
      <td>只会拦截通过&lt;error-page&gt;方式发出的请求，此方式使用较少。</td>
   </tr>
</table>


如下，表示此过滤器会拦截所有：

**①**通过地址栏访问方式的请求，

**②**通过请求转发方式的请求：

```
<filter-mapping>
     …
  	<dispatcher> REQUEST</dispatcher>
<dispatcher> FORWARD</dispatcher>
</filter-mapping>
```

## 8.1.4 Filter链 ##

**(1)原理**

我们还可以为Web应用程序注册多个Filter，对某一请求/响应进行多次拦截。拦截的过程如下图：

![](http://i.imgur.com/WnqQVHf.gif)

*图8-05*

如果对某一个请求配置了多个Filter，则每个Fiter都会对该请求及响应进行拦截。拦截的顺序是按照过滤器的`<filter-mapping>`在web.xml中的配置顺序。像这样，多个Filter拦截同一个请求时，这些Filter就会组成一个Filter链，并且每一个Filter都是通过FilterChain的`doFilter()`方法，将当前Filter拦截的请求放行，使请求进入下一个Filter。

上图中，客户端发出的请求会先被过滤器1所拦截，过滤器1处理完请求后可以通过调用`doFilter()`方法将请求放行；随后请求会被过滤器2拦截，过滤器2处理完请求后同样可以调用`doFilter()`方法将请求放行，最终请求到达服务器资源。同理，当服务器向客户端发出响应时，也会依次被过滤器所拦截，只是拦截响应的顺序与拦截请求的顺序完全相反。

**(2)示例**

我们在之前的FilterProject项目基础上，开发一个使用Filter链的程序。

之前的过滤器MyFirstFilter拦截的是MyServlet资源，我们再建一个过滤器MySecondFilter同样来拦截MyServlet资源，如下：

**MySecondFilter.java**

```
…
public class MySecondFilter implements Filter
{
	@Override
	public void init(FilterConfig arg0) throws ServletException
	{
		System.out.println("过滤器02的初始化init()方法...");
	}

	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
			throws IOException, ServletException
	{
		System.out.println("拦截请求02...");
 		chain.doFilter(request, response);
		System.out.println("拦截响应02...");
	}

	@Override
	public void destroy()
	{	System.out.println("过滤器02的销毁destory()方法...");
	}
}
```

对过滤器MySecondFilter进行配置，使其和MyFirstFilter一样都拦截MyServlet资源，如下：

**web.xml**

```
<filter>
  	<filter-name>MyFirstFilter</filter-name>
  	<filter-class>
org.lanqiao.filter.MyFirstFilter
</filter-class>
 </filter>
 <filter-mapping>
  	<filter-name>MyFirstFilter</filter-name>
  	<url-pattern>/MyServlet</url-pattern>
 </filter-mapping>

 <filter>
  	<filter-name>MySecondFilter</filter-name>
  	<filter-class>
org.lanqiao.filter.MySecondFilter
</filter-class>
 </filter>
 <filter-mapping>
  	<filter-name>MySecondFilter</filter-name>
  	<url-pattern>/MyServlet</url-pattern>
 </filter-mapping>
```

MyFirstFilter 的`< filter-mapping >`写在MySecondFilter的`< filter-mapping >`前面，因此拦截的顺序是:

**拦截请求：**请求先被MyFirstFilter拦截，再被MySecondFilter拦截；

**拦截响应：**与拦截请求的顺序正好相反：即响应先被MySecondFilter拦截，再被MyFirstFilter拦截。

重启服务，再次通过**index.jsp**中的超链接，向服务器的MyServlet资源发出请求，运行结果如下：

![](http://i.imgur.com/PrEF5XR.png)


*图8-06*


# 8.2 监听器 #

在Web应用程序的运行期间，Web容器会创建和销毁四个对象：`ServletContext`、`HttpSession`、`ServletRequest`、`PageContext`，这些对象被称为“域对象”（即在JSP中提到的“范围对象”）。除了`PageContext`以外，Servlet API为其他三个域对象都提供了各自的监听器，用来监听它们的行为。

## 8.2.1监听域对象的生命周期 ##

**(1)原理**

Servlet API提供了`ServletContextListener`、`HttpSessionListener`、`ServletRequestListener`三个监听器接口，用来分别监听`ServletContext`、`HttpSession`、`ServletRequest`三个域对象。当这三个域对象创建或销毁时，就会自动触发相应的监听器接口。

例如，`ServletContextListener`接口可以用来监听`ServletContext`域对象的创建、销毁过程。当在Web应用程序中注册了一个或多个实现了`ServletContextListener`接口的事件监听器时，Web容器就会在创建、销毁每个`ServletContext`对象时都产生一个相应的事件对象，然后依次调用每个`ServletContext`事件监听器中的处理方法，并将产生的事件对象传递给这些方法来完成事件的处理工作。

**`ServletContextListener`接口定义了以下两个事件处理方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void contextInitialized(ServletContextEvent sce)</td>
      <td>当ServletContext对象被创建时， Web容器会自动触发此方法。并且可以通过参数ServletContextEvent来获取创建的ServletContext对象</td>
   </tr>
   <tr>
      <td>public void contextDestroyed(ServletContextEvent sce)</td>
      <td>当ServletContext对象被销毁时， Web容器会自动触发此方法。并且会将之前的ServletContextEvent对象传递到此方法的参数中。</td>
   </tr>
</table>

类似的，`HttpSessionListener`和`ServletRequestListener`接口也都提供了各自的事件处理方法，如下：

**`HttpSessionListener`接口定义的事件处理方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void sessionCreated(HttpSessionEvent se)</td>
      <td>当HttpSession对象被创建时， Web容器会自动触发此方法。并且可以通过参数HttpSessionEvent来获取创建的HttpSession对象</td>
   </tr>
   <tr>
      <td>public void sessionDestroyed(HttpSessionEvent se)</td>
      <td>当HttpSession对象被销毁时， Web容器会自动触发此方法。并且会将之前的HttpSessionEvent对象传递到此方法的参数中。</td>
   </tr>
</table>

**`ServletRequestListener`接口定义的事件处理方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void requestInitialized(ServletRequestEvent sre)</td>
      <td>当ServletRequest对象被创建时， Web容器会自动触发此方法。并且可以通过参数ServletRequestEvent来获取创建的ServletRequest对象</td>
   </tr>
   <tr>
      <td>public void requestDestroyed(ServletRequestEvent sre)</td>
      <td>当ServletRequest对象被销毁时， Web容器会自动触发此方法。并且会将之前的ServletRequestEvent对象传递到此方法的参数中。</td>
   </tr>
</table>

**(2)案例**

我们用一个类来同时实现`ServletContextListener`、`HttpSessionListener`、`ServletRequestListener`三个接口，即同时具有三个监听器的功能。

**ContextSessionRequestListener.java**

```
package org.lanqiao.listener;
import javax.servlet.*;
import javax.servlet.http.*;

public class ContextSessionRequestListener 
implements ServletContextListener,
HttpSessionListener,ServletRequestListener
{
	@Override
	public void requestInitialized(ServletRequestEvent sre)
	{
		System.out.println("监听ServletRequest：
[ServletRequest]对象[创建]完成");
	}
	@Override
	public void requestDestroyed(ServletRequestEvent sre)
	{
		System.out.println("监听ServletRequest：
[ServletRequest]对象[销毁]完成");
	}
	@Override
	public void sessionCreated(HttpSessionEvent se)
	{
		System.out.println("监听HttpSession：
[HttpSession]对象[创建]完成");		
	}
	@Override
	public void sessionDestroyed(HttpSessionEvent se)
	{
		System.out.println("监听HttpSession：
[HttpSession]对象[销毁]完成");		
	}
	@Override
	public void contextInitialized(ServletContextEvent sce)
	{
		System.out.println("监听ServletContext：
[ServletContext]对象[创建]完成");	
	}
	@Override
	public void contextDestroyed(ServletContextEvent sce)
	{
		System.out.println("监听ServletContext：
[ServletContext]对象[销毁]建完成");	
	}
}
```

再在**web.xml**中部署ContextSessionRequestListener监听器，如下：

**web.xml**

```
…
<listener>
  	<listener-class>
  		org.lanqiao.listener.ContextSessionRequestListener
  	</listener-class>
</listener>
…
```

一个完整的监听器需要编写`Listener`类和配置`<Listener>`。如果Web应用程序有多个监听器，则会按照`<listener>`在web.xml中的配置顺序依次触发。

最后新建**index.jsp**和**sessionInvalidate.jsp**用来测试监听器：

**index.jsp**

```
…
<body>
	index.jsp页面<br/>
	<a href="sessionInvalidate.jsp">销毁session</a>
</body>
…
```

**sessionInvalidate.jsp**

```
<%@ page language="java" contentType="text/html; 
charset=UTF-8"    pageEncoding="UTF-8"%>
<%
	System.out
.println("========sessionInvalidate.jsp页面=========");
	session.invalidate();
%>
```

部署并启动项目，在启动时可以发现执行了`contextInitialized()`方法：

![](http://i.imgur.com/Lkae0p0.jpg)

*图8-07*

这是因为Web容器在启动时会自动加载部署过的项目，并为该项目创建对应的`ServletContext`对象，而web.xml中配置了用于监听`ServletContext`对象创建、销毁的监听器ContextSessionRequestListener，所以会调用监听器中的`contextInitialized()`方法，从而输出相应的语句。

再访问**index.jsp**，又会得到以下结果：

![](http://i.imgur.com/XM06gXH.jpg)

*图8-08*

这是因为访问**index.jsp**时，就会向Web容器发送一次请求（创建了一个请求），所以执行了用于监听ServletRequest 被创建的`requestInitialized()`方法，即输出“监听`ServletRequest`：`[ServletRequest]`对象[创建]完成”;

同时，第一次访问index.jsp时，Web容器还为浏览器创建了对应的`HttpSession`对象，所以还会执行用于监听`HttpSession`被创建的`sessionCreated()`方法，即输出“监听`HttpSession`：`[HttpSession]`对象[创建]完成”.

当请求发送完毕后，`ServletRequest`对象随之被销毁，所以又会执行用于监听`ServletRequest`被销毁的`requestDestroyed()`方法，即输出“监听`ServletRequest`：`[ServletRequest]`对象[销毁]完成”。

点击**index.jsp**中的超链接“销毁`session`”，如图

![](http://i.imgur.com/fOn6IG2.jpg)

*图8-09*

控制台又会再输出以下黑色方框中的内容：

![](http://i.imgur.com/aForTJK.png)

*图8-10*

这是因为点击超链接后，会跳转到一个新的页面，即发送了一个新的请求，所以会再次触发用于监听`ServletRequest` 被创建的`requestInitialized()`方法；随后，进入sessionInvalidate.jsp页面,执行该JSP里面的输出语句，并执行`session.invalidate()`销毁`session`，所以会触发用于监听`HttpSession`被销毁的`sessionDestroyed()`方法，即输出“监听`HttpSession`：`[HttpSession]`对象[销毁]完成”。之后，请求执行完毕从而被销毁，再次触发用于监听`ServletRequest`被销毁的`requestDestroyed()`方法。

最后，手动停止Web服务，又会触发用于监听`ServletContext`对象被销毁的`contextDestroyed()`方法，即输出“监听`ServletContext`：`[ServletContext]`对象[销毁]建完成”，如图：

![](http://i.imgur.com/TPulMuT.png)

*图8-11*

## 8.2.2监听域对象中属性的变更 ##

**(1)原理**

`ServletContext`、`HttpSession`、`ServletRequest`三个域对象都可以通过`setAttribute()`和`removeAtribute()`等方法进行属性的增加、替换（修改）、删除。Servlet API也提供了ServletContextAttributeListener、HttpSessionAttributeListener、ServletRequestAttributeListener三个监听器接口，用来监测这三个域对象中属性的变更。

例如，当向`ServletRequest`对象中增加、替换（修改）、删除某个属性时，Web容器就会自动调用**ServletRequestAttributeListener监听器接口中的相应方法**，如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void attributeAdded (ServletRequestAttributeEvent srae)</td>
      <td>当向ServletRequest对象中增加一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeRemoved (ServletRequestAttributeEvent srae)</td>
      <td>当ServletRequest对象中的某个属被替换（修改）时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeReplaced (ServletRequestAttributeEvent srae)</td>
      <td>当从ServletRequest对象中删除一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
</table>

其中方法的参数是一个`ServletRequestAttributeEvent`对象，监听器可以通过这个参数来获取正在增加、替换（修改）、删除属性的域对象。

类似的，**ServletContextAttributeListener接口中的方法如下：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void attributeAdded (ServletContextAttributeEvent srae)</td>
      <td>当向ServletContext对象中增加一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeRemoved (ServletContextAttributeEvent srae)</td>
      <td>当ServletContext对象中的某个属被替换（修改）时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeReplaced (ServletContextAttributeEvent srae)</td>
      <td>当从ServletContext对象中删除一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
</table>

**HttpSessionAttributeListener接口中的方法如下：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void attributeAdded (HttpSessionBindingEvent srae)</td>
      <td>当向HttpSession对象中增加一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeRemoved (HttpSessionBindingEvent srae)</td>
      <td>当HttpSession对象中的某个属被替换（修改）时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeReplaced (HttpSessionBindingEvent srae)</td>
      <td>当从HttpSession对象中删除一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
</table>

可以发现，ServletContextAttributeListener、HttpSessionAttributeListener、ServletRequestAttributeListener三个监听器接口中的方法名完全一致，只是方法的参数类型不相同。

**(2)案例**

**①**新建**attributeListener.jsp**，用于增加、替换、删除属性，从而触发域对象的属性监听器

**attributeListener.jsp**

```
…
<body>
	<%
		getServletContext().setAttribute("school","北京蓝桥");
		getServletContext().setAttribute("school","东莞蓝桥");
		getServletContext().removeAttribute("school");
		
		session.setAttribute("school","北京蓝桥");
		session.setAttribute("school","东莞蓝桥");
		session.removeAttribute("school");
		
		request.setAttribute("school","北京蓝桥");
		request.setAttribute("school","东莞蓝桥");
		request.removeAttribute("school");
	%>
</body>
…
```

**②**创建用于监听域对象属性变更的监听器，即创建一个类并实现ServletContextAttributeListener、HttpSessionAttributeListener、ServletRequestAttributeListener三个监听器接口

**AttributeListener.java**

```
package org.lanqiao.listener;

import javax.servlet.*;
import javax.servlet.http.*;
public class AttributeListener implements ServletContextAttributeListener,HttpSessionAttributeListener,ServletRequestAttributeListener
{

	@Override
	public void attributeAdded(ServletRequestAttributeEvent srae)
	{
		String attributeName  = srae.getName();
		Object attrubiteValue = srae.getServletRequest()
.getAttribute(attributeName);
		System.out.println("[ServletRequest][增加]属性,"
+attributeName+":"+attrubiteValue);
	}
	@Override
	public void attributeRemoved(ServletRequestAttributeEvent srae)
	{
		String attributeName  = srae.getName();
		System.out.println("[ServletRequest][删除]属性,"
+attributeName);				
	}

	@Override
	public void attributeReplaced(ServletRequestAttributeEvent srae)
	{
		String attributeName  = srae.getName();
		Object attrubiteValue = srae.getServletRequest()
.getAttribute(attributeName);
		System.out.println("[ServletRequest][替换]属性,"
+attributeName+":"+attrubiteValue);
	}
	@Override
	public void attributeAdded(HttpSessionBindingEvent sbe)
	{
		String attributeName  = sbe.getName();
		Object attrubiteValue =  sbe.getSession()
.getAttribute(attributeName);
		System.out.println("[HttpSession][增加]属性,"
+attributeName+":"+attrubiteValue);	
	}
	@Override
	public void attributeRemoved(HttpSessionBindingEvent sbe)
	{
		String attributeName  = sbe.getName();
		System.out.println("[HttpSession][删除]属性,"
+attributeName);	 		
	}
	@Override
	public void attributeReplaced(HttpSessionBindingEvent sbe)
	{
		String attributeName  = sbe.getName();
		Object attrubiteValue =  sbe.getSession()
.getAttribute(attributeName) ;
		System.out.println("[HttpSession][替换]属性,"
+attributeName+":"+attrubiteValue);	
	}
	@Override
	public void attributeAdded(ServletContextAttributeEvent scae)
	{
		String attributeName  = scae.getName();
		Object attrubiteValue =  scae.getServletContext()
.getAttribute(attributeName);
		System.out.println( "[ServletContext][增加]属性,"
+attributeName+":"+attrubiteValue);	
	}
	@Override
	public void attributeRemoved(ServletContextAttributeEvent scae)
	{
		String attributeName  = scae.getName();
		System.out.println("[ServletContext][删除]属性,"
+attributeName);
	}
	@Override
	public void attributeReplaced(ServletContextAttributeEvent scae)
	{
		String attributeName  = scae.getName();
		Object attrubiteValue =  scae.getServletContext()
.getAttribute(attributeName);
		System.out.println("[ServletContext][替换]属性,"
+attributeName+":"+attrubiteValue);	
	}
}
```

**③**配置监听器

**web.xml**

```
…
  <listener>
  	<listener-class>
  		org.lanqiao.listener.AttributeListener
  	</listener-class>
  </listener>
…
```

部署并启动项目，通过浏览器地址栏访问[http://localhost:8888/ListenerProject/attributeListener.jsp](http://localhost:8888/ListenerProject/attributeListener.jsp)，在控制台可以看到以下输出：

![](http://i.imgur.com/5Y7vVxY.jpg)

*图8-12*

当三个域对象进行增加、替换、删除属性时，都会触发相应的监听方法。



## 8.2.3 感知被HttpSession绑定的事件监听器 ##


**在`session`域中保存的对象，可能会经历四种状态：**

**①**将对象保存（绑定）到`session`域中；

**②**从`session`域中删除（解除绑定）该对象；

**③**对象随着`session`持久化到硬盘等存储设备中，即将对象和`session`一起从内存写入硬盘等存储设备（钝化）；

**④**对象随着`session`从存储设备中恢复到内存中（活化）。
	
Servlet API提供了`HttpSessionBindingListener和HttpSessionActivationListener这两个监听器（接口），专门用于监听`session`域中对象的这四种状态。


**(1) HttpSessionBindingListener接口**

HttpSessionBindingListener接口提供了`valueBound()`和`valueUnbound()`两个方法，分别用于监听`Java`对象绑定到`HttpSession`对象中，以及从`HttpSession`对象中解绑`Java`对象的两个事件。


**HttpSessionBindingListener接口的完整定义如下：**

```
package javax.servlet.http;
import java.util.EventListener;
public interface HttpSessionBindingListener extends EventListener 
{
public void valueBound(HttpSessionBindingEvent event);
public void valueUnbound(HttpSessionBindingEvent event);
}
```

如果一个类实现了HttpSessionBindingListener接口，那么

**①**当该类产生的对象被绑定到`HttpSession`对象中时，Web容器就会自动调用该对象的`valueBound()`方法；

**②**当该类产生的对象从`HttpSession`对象中解绑时，Web容器就会自动调用该对象的`valueUnbound()`方法。

此外，这两个方法都有一个共同的参数：`HttpSessionBindingEvent`类型的事件对象，我们可以通过这个参数来获取当前的`HttpSession`对象。


下面通过一个示例来演示**HttpSessionBindingListener**接口的使用：

**org.lanqiao.listener.BeanDemo.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;
public class BeanDemo implements HttpSessionBindingListener
{
	//BeanDemo对象被绑定到HttpSession对象中时，Web容器会自动调用此方法
	@Override
	public void valueBound(HttpSessionBindingEvent event)
	{
		System.out.println("绑定：\nBeanDemo对象被增加
到了session域中\n当前的BeanDemo对象："
+this+"\n"+event.getSession().getId());
	}
	//BeanDemo对象从HttpSession对象中解绑时，调用此方法
	@Override
	public void valueUnbound(HttpSessionBindingEvent event)
	{
		System.out.println("移除：\nBeanDemo对象从session域
中被移除\n当前的BeanDemo对象："
+this+"\n"+event.getSession().getId());
	}
}
```

**httpSessionBindingListner.jsp**

```
…
<body>
	<%
		BeanDemo beanDemo = new BeanDemo();
		session.setAttribute("beanDemo", beanDemo);
	%>
</body>
…
```

执行[http://localhost:8888/ListenerProject/httpSessionBindingListner.jsp](http://localhost:8888/ListenerProject/httpSessionBindingListner.jsp)，运行结果：

![](http://i.imgur.com/dkA71Fj.png)

*图8-13*

刷新页面，运行结果：

![](http://i.imgur.com/SevzdFS.png)

*图8-14*

从运行结果可以发现：第一次访问**httpSessionBindingListner.jsp**时，`BeanDemo`对象会被增加到`session`域中；刷新浏览器，另一个`BeanDemo`对象被增加到了`session`域中，与此同时，第一个`BeanDemo`对象从`session`域中被移除了，也就是说，第二个`BeanDemo`对象覆盖了第一个对象。此外，因为是同一次会话，因此sessionId都是相同的。


**(2) HttpSessionActivationListener接口**


如果要把`HttpSession`对象从内存转移到硬盘等存储设备（钝化），或者相反，从存储设备中恢复到内存中（活化），就需要使用HttpSessionActivationListener接口的`sessionWillPassivate()`和`sessionDidActivate()`方法。

需要注意，HttpSession对象的钝化（也称为持久化）过程是由Servlet容器完成的。在此过程中，为了确保session域内的所有共享数据不会丢失，Servlet容器不仅会持久化HttpSession对象，还会对该对象的所有可序列化的属性进行持久化。其中，可序列化的属性是指：属性所在的类实现了Serializable接口；例如String继承了Serializable接口，因此String类型的属性也会被持久化）。


至于HttpSession对象的活化过程，通常是指：在客户端向Web服务发出Http请求时，相应在硬盘中的HttpSession对象会被激活。

**HttpSessionActivationListener接口的完整定义如下：**

```
package javax.servlet.http;
import java.util.EventListener;
public interface HttpSessionActivationListener extends EventListener 
{
    //钝化之前
public void sessionWillPassivate(HttpSessionEvent se);
//活化之后
    public void sessionDidActivate(HttpSessionEvent se);
}
```

当绑定到`HttpSession`对象中的对象即将随`HttpSession`对象被钝化之前，Web容器会调用`sessionWillPassivate()`方法，并传递一个HttpSessionEvent类型的事件对象作为参数；当绑定到`HttpSession`对象中的对象刚刚随`HttpSession`对象被活化之后，Web容器会调用`sessionDidActivate ()`方法，并传递一个HttpSessionEvent类型的事件对象作为参数。
	

**下面通过一个示例来演示HttpSessionActivationListener接口的使用：**

**①配置会话管理器**

在执行session的持久化（钝化）时，需要使用到PersistentManager（会话管理器），PersistentManager的作用是当某个Web应用被终止（或整个Web服务器被终止）时，会对被终止的Web应用的HttpSession对象进行持久化。PersistentManager需要在Tomcat的context.xml文件中配置<Manager>元素，如下：


**&lt;Tomcat安装目录&gt;/conf/context.xml**

```
<Context>
	<Manager className="org.apache.catalina.session.PersistentManager"
 maxIdleSwap="1" > 
		<Store className="org.apache.catalina.session.FileStore" 
directory="lanqiao" />
	</Manager>	
     <!-- 其他配置 … -->
</Context>
```

**Manager及其子元素的简介如下：**

<table>
   <tr>
      <td>元素/属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>Manager元素</td>
      <td>用于配置会话管理器.     className属性：指定负责创建、销毁、持久化Session对象的类。     maxIdleSwap属性：指定Session对象被钝化前的最大空闲时间（单位是秒）。如果超过这个时间，管理Session对象的类就会把Session对象持久化到存储设备中（硬盘等）。</td>
   </tr>
   <tr>
      <td>Store元素</td>
      <td>用于指定负责完成具体持久化任务的类。    directory属性：指定保存持久化文件的目录，可以使用相对目录或绝对目录。如果使用相对目录（如lanqiao），它是相对于以下目录：&lt;Tomcat安装目录&gt;\work\Catalina\localhost\项目名\lanqiao</td>
   </tr>
</table>


**②编写类，并实现HttpSessionActivationListener接口**


**org.lanqiao.listener.BeanDemo2.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;
public class BeanDemo2 implements HttpSessionActivationListener
{
	private String name ;
	private int age ; 
	//setter、geter
	//钝化之前
	@Override
	public void sessionWillPassivate(HttpSessionEvent se)
	{
		System.out.println("即将钝化之前：BeanDemo2对象即将随着HttpSession对象被钝化…");
	}
	//活化之后
	@Override
	public void sessionDidActivate(HttpSessionEvent se)
	{
		System.out.println("活化之后：BeanDemo2对象刚刚随着HttpSession对象被活化了…");
	}
}
```

**③编写JSP，实现钝化与活化**

**a.实现钝化：将对象增加到`HttpSession`对象中，并随着`HttpSession`对象一起钝化**

**write.jsp**

```
…
<body>
	<%
		BeanDemo2 beanDemo = new BeanDemo2();
		beanDemo.setName("张三");
		beanDemo.setAge(23);
		session.setAttribute("beanDemo", beanDemo) ;
	%>
</body>
…
```

启动服务，执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，JSP页面的运行结果：


![](http://i.imgur.com/tYvNV5j.png)

*图8-15*

一段时间后（时间长短与会话管理器中`Manager`元素的`maxIdleSwap`属性有关），Console控制台会有如下显示：

![](http://i.imgur.com/z1tmq2L.png)

*图8-16*

因此可以得知，`BeanDemo2`对象会随着`HttpSession`对象被钝化。根据会话管理器中`Store`元素的`directory`属性，可以找到钝化后的文件，如下：

![](http://i.imgur.com/Zg1t5lp.png)

*图8-17*

**b.实现活化：钝化以后，将对象随`HttpSession`对象一起活化**

编写**read.jsp**，从`session`域中读取对象，如下：


**read.jsp**

```
…
<body>
	从session域中读取对象 <br/>
	姓名：${sessionScope.beanDemo.name } <br/>
	年龄：${sessionScope.beanDemo.age } <br/>
</body>
…
```

重启Tomcat服务，先执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，然后在Console控制台打印“即将钝化之前…”以前，迅速再执行[http://localhost:8888/ListenerProject/read.jsp](http://localhost:8888/ListenerProject/read.jsp)，可得如下结果：


![](http://i.imgur.com/jQu5H2D.png)

*图8-18*

可以发现，在钝化之前可以从`session`域中读取对象的数据（内存中的`session`域中读取）。过一会儿，当控制台打印“即将钝化之前…”以后（说明此时`HttpSession`对象已经被钝化，被保存在了硬盘中），再次执行[http://localhost:8888/ListenerProject/read.jsp](http://localhost:8888/ListenerProject/read.jsp)，运行结果：

![](http://i.imgur.com/FQIAooq.png)

*图8-19*

数据不显示的原因是：持久化（钝化）类没有实现Serializable接口。如果一个类没有实现Serializable接口，那么当Servlet容器持久化`HttpSession`对象时，是不会持久化该类的对象的。本例中，BeanDemo2类没有实现Serializable接口，因此BeanDemo2的对象不会随`HttpSession`一起被持久化，就会在`HttpSession`被持久化时丢失。

修改BeanDemo2类，让其实现Serializable接口，如下：


**org.lanqiao.listener.BeanDemo2.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;
public class BeanDemo2 implements HttpSessionActivationListener, Serializable
{
	…
}
```

重启服务，执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，等待Console控制台输出“即将钝化之前…”，如下：

![](http://i.imgur.com/LA7YzVt.png)

*图8-20*

再执行**read.jsp**，得到**read.jsp**的运行结果：

![](http://i.imgur.com/1pQSnTa.png)

*图8-21*

此时Console控制台的运行结果：

![](http://i.imgur.com/ekKPJ1O.png)

*图8-22*

可以得知，BeanDemo2对象在随HttpSession对象被钝化以后，又会在程序访问HttpSession对象时随HttpSession对象一起被活化。再次强调，Java对象所属的类必须先实现Serializable接口，之后才能被持久化到硬盘上。


稍等片刻后，控制台会再次显示“即将钝化之前…”，如下：

![](http://i.imgur.com/SAthfNA.png)

*图8-23*

读者应该知道再次显示的原因了吧？