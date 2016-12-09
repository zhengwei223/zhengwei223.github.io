---

layout: post

title: 视图和视图解析器

category: SpringMVC框架

tags: SpringMVC

description: 本章将系统介绍视图和视图解析器。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaEE SpringMVC

---

> **本章简介**

视图（View）和视图解析器（ViewResolver）的工作流程：


当请求处理方法处理完请求之后，会返回String、ModelAndView或View对象，如return “success”；但返回值最终都会被SpringMVC统一转为ModelAndView对象并返回；随后Spring就会用ViewResolver，把返回的ModelAndView对象中的View渲染给用户看（即返回给浏览器），如图,

![](http://i.imgur.com/DTELRwZ.png)

*图28-01*


# 28.1 视图View #

视图View的作用是渲染数据，将数据以JSP、PDF、EXCEL等形式呈现给用户。SpringMVC通过View接口来支持视图，该接口提供了各种各样的视图，并且可以让用户自定义视图。


在客户端的每一次请求时，视图解析器ViewResolver都会产生一个新的视图View对象。


**视图View接口的实现类及部分简介如下**

![](http://i.imgur.com/T613ROJ.png)

*图28-02*

<table>
   <tr>
      <td colspan="2">视图类型</td>
      <td>简介</td>
   </tr>
   <tr>
      <td rowspan="2">URL视图资源图</td>
      <td>InternalResourceView</td>
      <td>将JSP或其他资源封装成一个视图。被视图解析器InternalResourceViewResolver默认使用。</td>
   </tr>
   <tr>
      <td>JstlView</td>
      <td>InternalResourceView的子类。如果JSP中使用了JSTL的国际化标签，就需要使用该视图类。</td>
   </tr>
   <tr>
      <td rowspan="2">文档视图</td>
      <td>AbstractExcelView</td>
      <td>Excel文档视图的抽象类。</td>
   </tr>
   <tr>
      <td>AbstractPdfView</td>
      <td>PDF文档视图的抽象类</td>
   </tr>
   <tr>
      <td rowspan="4">报表视图</td>
      <td>ConfigurableJasperReportsView</td>
      <td rowspan="4">常用的JasperReports报表视图</td>
   </tr>
   <tr>
      <td>JasperReportsHtmlView</td>
   </tr>
   <tr>
      <td>JasperReportsPdfView</td>
   </tr>
   <tr>
      <td>JasperReportsXlsView</td>
   </tr>
   <tr>
      <td>JSON视图</td>
      <td>MappingJackson2JsonView</td>
      <td>将数据通过Jackson框架的ObjectMapper对象，以JSON方式输出</td>
   </tr>
</table>


# 28.2 视图解析器ViewResolver #

SpringMVC提供了一个视图解析器的上级接口ViewResolver，所有具体的视图解析器必须实现该接口。

**常用的视图解析器实现类及简介如下**


![](http://i.imgur.com/lir2s2Z.png)

*图26-03*

<table>
   <tr>
      <td colspan="2">视图解析器类型</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>解析为bean</td>
      <td>BeanNameViewResolver</td>
      <td>将视图解析后，映射成一个bean，视图的名字就是bean的id。</td>
   </tr>
   <tr>
      <td rowspan="2">解析为映射文件</td>
      <td>InternalResourceViewResolver</td>
      <td>将视图解析后，映射成一个资源文件。例如将一个视图名为字符串“success.jsp”的视图解析后，映射成一个名为success的JSP文件。</td>
   </tr>
   <tr>
      <td>JasperReportsViewResolver</td>
      <td>将视图解析后，映射成一个报表文件。</td>
   </tr>
   <tr>
      <td rowspan="3">解析为模板文件</td>
      <td>FreeMarkerViewResolver</td>
      <td>将视图解析后，映射成一个FreeMarker模板文件。</td>
   </tr>
   <tr>
      <td>VelocityViewResolver</td>
      <td rowspan="2">将视图解析后，映射成一个Velocity模板文件。</td>
   </tr>
   <tr>
      <td>VelocityLayoutViewResolver</td>
   </tr>
</table>

InternalResourceViewResolver是JSP最常用的视图解析器，可以通过`prefix`给响应字符串加上前缀，通过`suffix`加上后缀。例如我们之前曾在springMVC的配置文件中配置了一个视图解析器InternalResourceViewResolver，如下：

**springmvc.xml**

```
<beans …>
	…
	<!-- 配置视图解析器：把handler处理类的返回值，加工成最终的视图路径-->
	<bean class="org.springframework.web.servlet.view
.InternalResourceViewResolver">
		<property name="prefix" value="/views/"></property>
		<property name="suffix" value=".jsp"></property>
	</bean>
</beans>
```

此外，视图解析器还可以通过解析JstlView进而实现国际化、通过解析`<mvc:view-controller>`进而指定请求的跳转路径、通过“redirect:”和“forward:”指定跳转方式等等。

**(1)通过解析`JstlView`实现国际化**

`JstlView`是`InternalResourceView`的子类。如果在JSP中使用了JSTL，那么InternalResourceViewResolver就会自动将默认使用的`InternalResourceView`视图类型转变为`JstlView`类型。

以下，在SpringMVC中使用JSTL的fmt标签来实现国际化：


所谓“国际化”，就是指同一个程序，对于不同地区/国家的访问，提供相应的、符合来访者阅读习惯的页面或数据。例如，同一个用JSP开发的欢迎页面，中国地区访问时显示“欢迎您”，而美国地区访问时则显示“Welcome”。以下是实现国际化的具体步骤：


**①对于不同地区/国家，创建不同的资源文件**

将程序中的提示信息、错误信息等放在资源文件中，为不同地区/国家编写对应资源文件。这些资源文件使用共同的基名，通过在基名后面添加语言代码、国家及地区代码来区分不同地域的访问者。如下是一些常见的资源文件命名方式及简介：


<table>
   <tr>
      <td>资源文件名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>基名_en.properties</td>
      <td>所有英文语言的资源</td>
   </tr>
   <tr>
      <td>基名_en_US.properties</td>
      <td>针对美国地区、英文语言的资源</td>
   </tr>
   <tr>
      <td>基名_zh.properties</td>
      <td>所有的中文语言的资源</td>
   </tr>
   <tr>
      <td>基名_zh_CN.properties</td>
      <td>针对中国大陆的、中文语言的资源</td>
   </tr>
   <tr>
      <td>基名_zh_HK.properties</td>
      <td>针对中国香港的、中文语言的资源</td>
   </tr>
   <tr>
      <td>基名.properties</td>
      <td>默认资源文件。如果请求相应语言的资源文件不存在，将使用此资源文件。例如，若是中国大陆地区用户，应该访问“基名_zh_CN.properties”，而如果不存在此文件，就会去访问默认的“基名.properties”。</td>
   </tr>
</table>


例如，如果访问此项目的用户来自美国和中国两个国家，就需要创建美国和中国两个地区的资源文件：在项目的src目录中，新建美国地区的资源文件i18n_en_US.properties，和中国内地的资源文件i18n_ zh_CN.properties，如下：

**美国地区的资源文件：i18n_en_US.properties**

```
resource.welcome=WELCOME
resource.exist=EXIST
```

**中国内地的资源文件：i18n_ zh_CN.properties**

```
resource.welcome=\u6B22\u8FCE\u60A8
resource.exist=\u9000\u51FA
```

**说明：**

在中文使用的**i18n_ zh_CN.properties**中，用户输入的原文是：


**resource.welcome=欢迎您**

**resource.exist=退出**


但Eclipse会自动将“欢迎您”等汉字自动转为相应的ASCII，供属性文件使用。
如果读者使用的Eclipse版本不能自动的将汉字转为ASCII，也可以使用JDK安装目录中bin中的native2ascii.exe工具进行转换。


不同资源文件的基名必须保持一致（如i18n），并且资源文件的内容是由很多`key-value`对组成，`key`必须一致（如resource.welcome），`value`随语言/国家地区不同而不同（如美国是“WELCOME”，中国是“欢迎您”）。


本例使用的基名i18n是internationalization（国际化）的缩写。internationalization的首尾字母i和n中间有18个字母，所以简称i18n。


**②在SpringMVC的配置文件中，加载国际化资源文件**

**springmvc.xml**


```
<beans …>
	…
	<bean id="messageSource" class="org.springframework
.context.support.ResourceBundleMessageSource">
		<property name="basename" value="i18n" />
	</bean>
</beans>
```

Spring容器在初始化时，会自动加载`id`为`“messageSource”`，且类型为`org.springframework.context.MessageSource`的`Bean`，并加载该`Bean`中通过`basename`属性指定基名的国际化资源文件。


**③使用JSTL标签实现国际化显示**

先导入JSTL依赖的2个JAR：`jstl.jar`和`standard.jar`，再在显示页**success.jsp**中导入JSTL用于支持国际化的库，并使用`<fmt:message …>`实现国际化显示，如下：


**显示页success.jsp**


```
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
…
<body>
	…
	<fmt:message key="resource.welcome"></fmt:message>
	<br><br>
	
	<fmt:message key="resource.exist"></fmt:message>
	<br><br>
</body>
…
```


`fmt`标签的`key`值会根据浏览器的语言环境去匹配资源文件中的`key`，若匹配则会显示相应资源文件中`key`对应的`value`值。例如，中国内陆地区下载的火狐浏览器默认的语言是中文，所以会在i18n_zh_CN.properties中寻找`key`为“resource.welcome”、“resource.exist”的`value`值，并显示到页面上，如下：


**发送请求页index.jsp**

`<a href="FirstSpringDemo/testI18n">testI18n</a><br/>`

**请求处理类：FirstSpringDemo.java**

```
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/testI18n")
	public String testI18n(){
		return "success";
	}
	…
}
```

**显示页面:success.jsp**

```
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
…
<body>
    …
	<fmt:message key="resource.welcome"></fmt:message>
	<br>
	<fmt:message key="resource.exist"></fmt:message>
</body>
…
```

执行**index.jsp**中的超链接，运行结果：

![](http://i.imgur.com/To3G7Kz.png)


*图28-04*


如果将火狐浏览器的语言切换为英文，如下：

![](http://i.imgur.com/6iUTEFG.png)

*图28-05*


再次执行**index.jsp**中的超链接，运行结果：

![](http://i.imgur.com/sQzjVX9.png)


*图28-06*

以上就实现了国际化的显示操作，JSP页面会根据浏览器的语言环境自动寻找相应的资源文件，并依据`key`值进行显示。


注意：就本例来说，国际化显示标签<fmt >必须在success.jsp中才会起作用，而如果将<fmt>放在index.jsp中则无法实现国际化。这是因为在springmvc.xml中配置的MessageSource（具体是ResourceBundleMessageSource实现类）是用来处理响应的，也就是说只有在请求处理方法返回String、View或ModelAndView对象以后执行响应时，才会通过MessageSource来执行国际化操作。而如果直接在index.jsp中执行<fmt:message ..>，因为此时还没有“处理响应”这一过程，所以就不会涉及到MessageSource，也就不会根据basename属性来指定的资源文件基名，因此本例的index.jsp中不能直接实现国际化显示。




**(2)&lt;mvc:view-controller&gt;**

**我们之前使用SpringMVC的流程大致都是**：

**①**请求页**index.jsp**—>**②**使用`@RequestMapping`标识的请求处理类`FirstSpringDemo.java`中的方法-->**③**结果显示页**success.jsp**。


除此以外，我们还可以省略②，让流程简化为①—>③，即省略请求处理方法。简化的方法是在springmvc.xml中配置`<mvc:view-controller…/>`，如下：

**springmvc.xml**

```
<beans …>
	<mvc:view-controller path="/testViewController" 
view-name="success"/>
</beans>
```


其中path用来匹配请求路径（类似于`@RequestMapping`的`value`值），`view-name`用来指定响应跳转的页面（类似于请求处理方法中的return "success"）。以上配置，就表示凡是请求路径为“testViewController”的，就会被直接跳转到“success”页面（“success”会加上InternalResourceViewResolver中设置的前缀和后缀）。如下：

index.jsp（请求路径是：`<mvc:view-controller…/>`中`path`指定的testViewController）

`<a href="testViewController">testViewController</a><br/>`

点击此超链接后，就会直接跳转到view-name指定的success页面（/view/success.jsp），即略过了`@RequestMapping`标识的请求处理方法。


但是，此时如果我们再点击**index.jsp**中之前编写的其他超链接，就都会报“HTTP Status 404”异常。解决办法就是再在**springmvc.xml**中加入`<mvc:annotation-driven></mvc:annotation-driven>`，如下：


**springmvc.xml**


```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	<mvc:view-controller path="/testViewController" 
view-name="success"/>
    <mvc:annotation-driven></mvc:annotation-driven>
</beans>
```

一般情况，在使用`<mvc:view-controller…/>`的同时，也需要加入`<mvc:annotation-driven…/>`标签。


**(3)页面跳转方式**

当请求处理方法的返回值是字符串时，视图解析器InternalResourceViewResolver会给返回值加上前缀、后缀，然后默认以请求转发的方式进行页面跳转。此外，我们还可以通过给返回值加上`“forward:”`或`“redirect:”`来指定跳转方式为请求转发或重定向。


**①通过`“forward:”`指定跳转方式为请求转发**

```
	@RequestMapping("/testForward")
	public String testForward(){
		return "forward:/views/success.jsp";
	}
```

**②通过`“redirect:”`指定跳转方式为重定向**

```
	@RequestMapping("/testRedirect")
	public String testRedirect(){
		return "redirect:/views/success.jsp";
	}
```


需要注意，加上`“forward:”`或`“redirect:”`后，视图解析器将不会再给返回值加上前缀、后缀，需要我们自己写上完整的响应地址。


# 28.3 处理静态资源 #

如果我们在项目的WebContent目录下新建`imgs`目录，并存放一张图片logo.png，如图，

![](http://i.imgur.com/AS0RCvj.png)

*图28-07*


然后启动tomcat服务来访问此图片http://localhost:8888/SpringMVCDemo/imgs/logo.png，就会看到浏览器显示“HTTP Status 404”异常。这是因为我们之前在`web.xml`中配置了`DispatcherServlet`，如下：


**web.xml**

```
…
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
…
```

DispatcherServlet的url-pattern是“/”，表示会拦截所有请求。因此，当访问图片、js文件、视频等静态资源时，也会被DispatcherServlet所拦截并去尝试匹配相应的`@RequestMapping`方法，但静态资源一般不会有相应的`@RequestMapping`，因此会报404异常。为了解决此异常，以便能够访问静态资源，可以在springmvc.xml中加上`<mvc:default-servlet-handler/>`和`<mvc:annotation-driven></mvc:annotation-driven>`，如下：


**springmvc.xml**

```
<beans …>
    …
	<mvc:default-servlet-handler/>
	<mvc:annotation-driven></mvc:annotation-driven>
</beans>
```


之后，就可以成功访问到项目中的静态资源。

`<mvc:default-servlet-handler/>`标签的作用是：此标签会在SpringMVC上下文中定义一个`DefaultServletHttpRequestHandler`，它会对所有DispatcherServlet处理的请求进行筛查，如果发现某个请求没有相应的`@RequestMapping`进行处理（如请求的是图片等静态资源），就会将该请求交给WEB服务器（如Tomcat）默认的Servlet处理，而默认Servlet就会直接去访问该静态资源。

**说明：**


Tomcat默认的Servlet是在“tomcat安装目录**\conf\web.xml**”中定义的，如下

```
  <servlet>
        <servlet-name>default</servlet-name>
        <servlet-class>
org.apache.catalina.servlets.DefaultServlet
</servlet-class>
        …
    </servlet>
```

配置了`<mvc:default-servlet-handler/>`之后，就可以解决访问静态资源时产生的异常。而加入`<mvc:annotation-driven></mvc:annotation-driven>`的目的是为了在访问静态资源的同时，也能正常的访问其他非静态资源。如果只加`<mvc:default-servlet-handler/>`而不加`<mvc:annotation-driven></mvc:annotation-driven>`，就会造成只能访问静态资源，而无法访问非静态资源。

# 28.4 练习题 #

1.视图和视图解析器的大致工作流程是什么？

2.使用SpringMVC时如何访问静态资源？

3.SpringMVC提供了哪些常见的视图及视图解析器？








