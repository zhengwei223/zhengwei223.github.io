---


layout: post


title: SpringMVC入门


category: SpringMVC框架


tags: SpringMVC


description: 本章将系统介绍SpringMVC入门。SpringMVC可以很好地将数据、业务与展现进行分离。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE SpringMVC


---

> **本章简介**


本书中的SpringMVC是基于Spring4.x版本、基于注解的形式。


SpringMVC通过实现MVC模式，很好地将数据、业务与展现进行了分离。从MVC的角度来说，SpringMVC和Struts2非常类似，但SpringMVC采用了可插拔的组件结构，更加具有可扩展性和灵活性。自Spring3.0版本以后，SpringMVC已经全面超越了Struts2，成为目前最流行的MVC框架。


使用SpringMVC有“基于XML配置文件”和“基于注解”两种形式，本书采用了目前使用较为广泛的“基于注解”形式。


# 26.1 SpringMVC的获取 #

Spring MVC属于Spring FrameWork的后续产品。我们可以找到开发Spring所使用的**spring-framework-4.2.5.RELEASE-dist.zip**，将其解压，其中的`libs`目录也包含了开发SpringMVC框架所依赖的`jar`包，具体如下：

<table>
   <tr>
      <td>序号</td>
      <td>文件名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>1-4</td>
      <td>spring-aop-4.xx.RELEASE.jar    spring-beans-4.xx.RELEASE.jar   spring-context-4.xx.RELEASE.jar   spring-core-4.xx.RELEASE.jar</td>
      <td>这四个jar包已经在Spring中讲解过，在此不再赘述。</td>
   </tr>
   <tr>
      <td>5</td>
      <td>spring-expression-4.xx.RELEASE.jar</td>
      <td>Spring表达式语言需要的类库</td>
   </tr>
   <tr>
      <td>6</td>
      <td>spring-web-4.xx.RELEASE.jar</td>
      <td>在Web应用开发过程中，用到Spring框架时所需的核心类库</td>
   </tr>
   <tr>
      <td>7</td>
      <td>spring-webmvc-4.xx.RELEASE.jar</td>
      <td>Spring MVC框架相关的所有类。如国际化、标签、Theme、FreeMarker等相关类</td>
   </tr>
</table>


和开发Spring一样，为了支持SpringMVC处理日志，我们还需要**commons-logging-1.1.3.jar**。


以上8个`jar`包，就是我们使用SpringMVC时需要导入的包。


**说明：**

以上8个`jar`包是开发SpringMVC的基础，但随着学习的深入，以后可能会逐步导入更多的`jar`包。若项目因为缺少`jar`包而运行失败，Eclipse等开发工具都会给出错误提示，读者可以根据提示内容，查找并加入所需的`jar`包。


# 26.2 开发第一个SpringMVC程序 #

我们先通过一个简单的示例，演示一下使用SpringMVC的基本流程。

**(1)**创建一个Web项目（项目名SpingMVCDemo），并导入上述8个`jar`包；

**(2)**在`src`目录下创建SpringMVC的配置文件：**springmvc.xml**。（在使用安装了Spring Tool Suite的Eclipse中，具体的创建步骤：鼠标右键`src` →`new` →Spring Bean Configuration File →输入配置文件名“**springmvc.xml**” →finish，然后再在`Namespaces`中选择“beans”、“context”及“mvc”，如图）

![](http://i.imgur.com/A8Xx7Gk.png)

*图26-01*

**(3)**在**web.xml**中配置前置控制器`DispatcherServlet`，用于拦截与`<url-pattern>`相匹配的请求，如下，


**web.xml**


```
<servlet>
		<servlet-name>springDispatcherServlet</servlet-name>
		<servlet-class>
org.springframework.web.servlet.DispatcherServlet
</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:springmvc.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
		<servlet-name>springDispatcherServlet</servlet-name>
		<url-pattern>/</url-pattern>
</servlet-mapping>
```

其中，

**①**通过`<url-pattern>`指定了`DispatcherServlet`拦截的请求是：所有请求（“/”）。拦截后即交给SpringMVC处理。

**SpringMVC中常见的`<url-pattern>`值如下表，**


<table>
   <tr>
      <td>&lt;url-pattern&gt;值</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>/</td>
      <td>所有请求，注意不能是/* ；“/”：所有请求；“/user”：以“user”开头的所有请求；“/user/pay.action”：“/user/pay.action”这个唯一的请求。此方式会导致静态资源(css,js,图片等)无法正常显示，后续会讲解处理办法。</td>
   </tr>
   <tr>
      <td>*.do或*.action等</td>
      <td>固定后缀的请求路径。如*.action表示/save.action、/user/save.action等所有以“.action”结尾的请求。</td>
   </tr>
</table>


**②**通过`<load-on-startup>`设置让`DispatcherServlet`随着服务(如Tomcat)的启动而同时启动。

**③**通过`contextConfigLocation`的`<param-value>`值，指定了SpringMVC配置文件的路径是：资源路径(如`src`目录)中的**springmvc.xml**文件。若不设置此`<init-param>`，则会根据SpringMVC的“默认约定”，自动加载认加WEB-INF目录中的**&lt;servlet-name&gt;-servlet.xml**。

 
例如，本**web.xml**中配置`DispatcherServlet`的`<servlet-name>`是“springDispatcherServlet”，则默认路径就是**WEB-INF/springDispatcherServlet-servlet.xml**。


配置完`contextConfigLocation`后，SpringMVC就会随着服务（如Tomcat）的启动而自动初始化。


**(4)**开发前端请求页面


**index.jsp**


```
…
<body>
	<a href="firstSpringMVC">My First SpringMVC Demo</a>
</body>
…
```

如上，我们使用超链接向**web.xml**中的`<url-pattern>`发送一个可以被拦截的请求，然后交由SpringMVC处理。


**(5)**开发请求处理类


**FirstSpringDemo.java**

```
package org.lanqiao.handler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FirstSpringDemo
{
	@RequestMapping("/firstSpringMVC")
	public String welcomeToSpringMVC()
	{
		return "success";
	}
}
```

如上，使用`@Controller`注解来标识本类是一个`SpringMVC Controller` 对象；
使用`@RequestMapping`注解来映射请求的URL。


例如，在**index.jsp**发出的请求“/firstSPringMVC”，将会被映射到`@RequestMapping("/firstSPringMVC")`所标识的方法来处理。

**(6)**编写SpringMVC配置文件

我们在“步骤(2)”时，已经将SpringMVC的路径设置到了`src`下，并且命名为**springmvc.xml**。


**springmvc.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:mvc="http://www.springframework.org/schema/mvc"
	xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-4.2.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.2.xsd">

	<!-- 配置需要扫描的包 -->
	<context:component-scan base-package="org.lanqiao.handler">
</context:component-scan>

	<!-- 配置试图解析器：把请求处理类的返回值，加工成最终的视图路径-->
	<bean class="org.springframework.web.servlet.
view.InternalResourceViewResolver">
		<property name="prefix" value="/views/"></property>
		<property name="suffix" value=".jsp"></property>
	</bean>
</beans>
```

其中，

**①**通过`<context:component-scan>`，将“请求处理类(**FirstSpringDemo.java**)”所在的包交给SpringMVC扫描。SpringMVC在接受到请求后，就会去在该包内寻找标记有`@Controller`的处理类，再在找到的处理类中寻找标记有`@RequestMapping`的处理方法。若找到请求路径和处理方法相匹配，就会用该处理方法来处理此请求。


例如，前台`<a href="firstSPringMVC">…</a>`发送一个路径为“firstSPringMVC”的请求；而在`<context:component-scan>`所在包中，恰好有一个请求处理类(**FirstSpringDemo.java**)的`welcomeToSpringMVC()`方法被标识为了`@RequestMapping("/firstSPringMVC")`，其中参数“/firstSPringMVC”正好与发送的请求“firstSPringMVC”代表同一个路径，SpringMVC就会用此`welcomeToSpringMVC()`方法来处理该请求。


**②**通过`<bean>`指定视图解析器为“`InternalResourceViewResolver`”类型。
此解析器会把“请求处理类中处理方法的返回值”按照“前缀+方法返回值+后缀”的形式进行加工，并把加工后的返回值作为目的路径进行跳转。

**此解析器的常见`<property>`属性值如下表，**


<table>
   <tr>
      <td>属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>prefix</td>
      <td>给“请求处理类中处理方法的返回值”加上前缀，前缀就是该&lt;property&gt;的value值</td>
   </tr>
   <tr>
      <td>suffix</td>
      <td>给“请求处理类中处理方法的返回值”加上后缀，后缀就是该&lt;property&gt;的value值</td>
   </tr>
</table>

例如，请求处理类`FirstSpringDemo.java` 的处理方法`welcomeToSpringMVC()`的返回值是“`success`”，就会给“`success`”加上前缀“`/views/`”和后缀“.jsp”，即加工后的返回值是“**/views/success.jsp**”。最后就会跳转到“**/views/success.jsp**”页面。

**(7)**开发前端结果显示页面


**success.jsp**

```
…
<body>
	Welcome to SpringMVC
</body>
…
```

部署项目并执行**index.jsp**，结果如下，

![](http://i.imgur.com/jBcoZ9H.png)

*图26-02*

点击超链接<a href="firstSpringMVC">My First SpringMVC Demo</a>，结果如下，

![](http://i.imgur.com/pcdgo3I.png)

*图26-03*

可以发现，该请求跳转到了超链接所指向的“firstSpingMVC”路径，
再通过“请求转发”跳转到了结果页**/views/success.jsp**。

# 26.3 练习题 #

1.使用SpringMVC有什么优势？

2.如何搭建SpringMVC的开发环境？

3.简述开发SpringMVC程序的基本步骤。