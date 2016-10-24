---

layout: post

title: 视图和视图解析器

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍视图和视图解析器。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

> **本章简介**

视图（View）和视图解析器（ViewResolver）的工作流程：


当请求处理方法处理完请求之后，会返回字符串、`ModelAndView`或`View`对象（如`return “success”`），但最终都会被SpringMVC转为`ModelAndView`对象并返回。随后Spring就会用`ViewResolver`，把`ModelAndView`中的`View`渲染给用户看（即返回给浏览器），如图,

![](http://i.imgur.com/DTELRwZ.png)

*图26-01*


# 26.1 视图View #

视图View的作用是渲染数据，将数据以JSP、PDF、EXCEL等实行呈现给用户。SpringMVC通过View接口来支持视图，该接口提供了各种各样的视图，并且可以让用户自定义视图。
、

视图View对象是通过试图解析器ViewResolver完成实例化的，并且每一次请求都会产生一个新的视图View对象。


视图View接口的实现类及部分简介如下，

![](http://i.imgur.com/T613ROJ.png)

*图26-02*

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
      <td>InternalResourceView的子类。如果JSP中使用了JSTL的国际化标签功能，则需要使用该视图类。</td>
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


# 26.2 视图解析器ViewResolver #

SpringMVC提供了一个视图解析器的上级接口ViewResolver，所有具体的视图解析器必须实现该接口。常用的视图解析器实现类及简介如下，

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
      <td>将视图解析后，映射一个bean，视图的名字就是bean的id</td>
   </tr>
   <tr>
      <td rowspan="2">解析为映射文件</td>
      <td>InternalResourceViewResolver</td>
      <td>将视图解析后，映射一个资源文件。例如将一个视图名为字符串“success.jsp”的视图解析后，映射一个名为success的JSP文件。</td>
   </tr>
   <tr>
      <td>JasperReportsViewResolver</td>
      <td>将视图解析后，映射一个报表文件。</td>
   </tr>
   <tr>
      <td rowspan="3">解析为模板文件</td>
      <td>FreeMarkerViewResolver</td>
      <td>将视图解析后，映射一个FreeMarker模板文件。</td>
   </tr>
   <tr>
      <td>VelocityViewResolver</td>
      <td rowspan="2">将视图解析后，映射一个Velocity模板文件。</td>
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
	<!-- 配置试图解析器：把handler处理类的返回值，加工成最终的视图路径-->
	<bean class="org.springframework.web.servlet.view
.InternalResourceViewResolver">
		<property name="prefix" value="/views/"></property>
		<property name="suffix" value=".jsp"></property>
	</bean>
</beans>
```

**(1)通过解析`JstlView`实现国际化**

`JstlView`是`InternalResourceView`的子类。如果在JSP中使用了JSTL，那么InternalResourceViewResolver就会自动将默认使用的`InternalResourceView`视图类型转变为`JstlView`类型。

以下使用JSTL的`fmt`标签来实现国际化：


所谓“国际化”，就是指同一个程序，对于不同地区/国家的访问，提供相应的、符合来访者阅读习惯的页面或数据。例如，同一个用JSP开发的欢迎页面，中国地区访问时显示“欢迎您”，而美国地区访问时则显示“Welcome”。以下是用SpringMVC实现国际化的具体步骤：



**①对于不同地区/国家，创建不同的资源文件**

将程序中的提示信息、错误信息等放在资源文件中，为不同地区/国家编写对应资源文件。这些资源文件使用共同的基名，通过在基名后面添加语言代码、国家和地区代码来进行区分，如下是一些常用的资源文件命名方式及简介：


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
      <td>默认资源文件。如果请求的资源文件不存在，将使用此资源文件</td>
   </tr>
</table>

例如，如果访问此项目的用户来自美国和中国两个国家，就需要创建美国和中国两个地区的资源文件：在项目的`src`目录中，新建美国地区的资源文件**i18n_en_US.properties**，和中国内地的资源文件**i18n_ zh_CN.properties**，如下：


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

中文使用的**i18n_ zh_CN.properties**中，用户输入的原文是：


**resource.welcome=欢迎您**

**resource.exist=退出**


但Eclise会自动将“欢迎您”等汉字自动转为相应的ASCII，供属性文件使用。
如果读者使用的Eclipse版本不支持自动将汉字转为ASCII，则可以使用JDK安装目录中`bin`目录中的native2ascii.exe工具进行转换。


不同资源文件的基名必须保持一致（如i18n），并且资源文件是由很多`key-value`对组成，`key`保持不变（如`resource.welcome`），`value`随国家/语言不同而不同（如美国是“WELCOME”，中国是“欢迎您”）。


本例使用的基名`i18n`是internationalization（国际化）的缩写。internationalization首尾字母i和n中间有18个单词，所以简称`i18n`。


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

先导入JSTL依赖的2个JAR：`jstl.jar`和`standard.jar`，再在显示页**success.jsp**中导入JSTL用于支持国际化的库`fmt`，并实现国际化显示，如下：


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

`fmt`标签的`key`值会匹配根据浏览器的语言环境去匹配资源文件中的`key`，若匹配则会显示资源文件中`key`对应的`value`值。

例如，中国内陆地区下载的火狐浏览器默认的语言是中文，所以会在**i18n_zh_CN.properties**中寻找`key`为`“resource.welcome”`、`“resource.exist”`的`value`值，并显示到页面上，如下：


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


*图26-04*


如果将火狐浏览器的语言切换为英文，如下：

![](http://i.imgur.com/6iUTEFG.png)

*图26-05*


再次执行**index.jsp**中的超链接，运行结果：

![](http://i.imgur.com/sQzjVX9.png)


*图26-06*

以上就实现了国际化的显示操作，JSP页面会根据浏览器的语言环境自动寻找相应的资源文件，并依据`key`值进行显示。


注意：就本例来说，国际化显示标签`<fmt >`必须在**success.jsp**中才会起作用，而如果将`<fmt>`放在**index.jsp**中则无法实现国际化。这是因为在**springmvc.xml**中配置的`MessageSource`（具体是`ResourceBundleMessageSource`实现类）是用来处理响应的，也就是说只有在请求处理方法返回`String`、`View`或`ModelAndView`对象以后执行响应时，才会通过`MessageSource`来执行国际化操作。


而如果直接在**index.jsp**中执行`<fmt>`，因为此时还没有“处理响应”这一过程，所以还不会涉及到`MessageSource`，也就不根据`basename`属性来指定的资源文件基名，因此本例的**index.jsp**中不能直接实现国际化显示。


**(2)&lt;mvc:view-controller&gt;**

**我们之前使用SpringMVC的流程大致都是**：

**①**请求页**index.jsp**—>**②**使用`@RequestMapping`标识的请求处理类`FirstSpringDemo.java`中的方法-->**③**结果显示页**success.jsp**。


除此以外，我们还可以省略②，让流程变为①—>③，即省略请求处理方法，如下：

**springmvc.xml**

```
<beans …>
	<mvc:view-controller path="/testViewController" 
view-name="success"/>
</beans>
```

在**springmvc.xml**中配置`<mvc:view-controller…/>`，其中`path`用来匹配请求路径（类似于`@RequestMapping`的`value`值），`view-name`用来指定响应跳转的页面（类似于请求处理方法的字符串类型的返回值）。

以上配置，就表示凡是请求路径为`“testViewController”`的，就会被直接跳转到`“success”`页面（`“success”`会加上`InternalResourceViewResolver`中设置的前缀和后缀）。如下：

**index.jsp（请求路径是：`path`指定的`testViewController`）**

`<a href="testViewController">testViewController</a><br/>`

点击此超链接后，就会直接跳转到`view-name`指定的`success`页面（**/view/success.jsp**），即并没有经过`@RequestMapping`标识的请求处理方法。


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

也就是说，在使用`<mvc:view-controller…/>`的同时，也需要加入`<mvc:annotation-driven…/>`标签。


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


# 26.3 处理静态资源 #

如果我们在项目的WebContent目录下新建`imgs`目录，并存放一张图片logo.png，如图，

![](http://i.imgur.com/AS0RCvj.png)

*图26-07*


然后启动tomcat服务来访问此图片http://localhost:8888/SpringMVCDemo/imgs/logo.png，就会看到浏览器显示“HTTP Status 404”异常。这是因为我们之前在`web.xml`中配置了一个`DispatcherServlet`，如下：


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

`DispatcherServlet`的`url-pattern`是“/”，会拦截所有请求。因此，当访问图片、js文件、视频等静态资源时，也会被`DispatcherServlet`所拦截并去尝试匹配相应的`@RequestMapping`，而静态资源一般不会有相应的`@RequestMapping`，因此会报404异常。为了解决此异常，以便能够访问静态资源，可以在**springmvc.xml**中加上`<mvc:default-servlet-handler/>`和`<mvc:annotation-driven></mvc:annotation-driven>`，如下：


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

配置了`<mvc:default-servlet-handler/>`之后，就可以解决访问静态资源的异常。而加入`<mvc:annotation-driven></mvc:annotation-driven>`的目的是为了在访问静态资源的同时，也能正常的访问其他非静态资源（如果只加`<mvc:default-servlet-handler/>`而不加`<mvc:annotation-driven></mvc:annotation-driven>`，就会造成只能访问静态资源，而无法访问非静态资源）。

# 26.4 练习题 #

1.视图和视图解析器的大致工作流程是什么？

2.使用SpringMVC时如何访问静态资源？

3.SpringMVC提供了哪些常见的视图及视图解析器？








