---

layout: post

title: 文件上传与拦截器

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍文件上传与拦截器。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

# 30.1 文件上传 #

SpringMVC提供了一个`MultipartResolver`接口用来实现文件上传，并使用Commons FileUpload技术实现了一个该接口的实现类`CommonsMultipartResolver`。如果要在SpringMVC中实现文件上传功能，就需要在**springmvc.xml**中配置`MultipartResolver`接口的实现类。

**以下是使用SpringMVC实现文件上传的具体步骤：**

**①导入`JAR`包：**

使用SpringMVC实现文件上传，共需要导入以下2个`JAR`包：


<table>
   <tr>
      <td>commons-fileupload-1.2.1.jar</td>
      <td>commons-io-2.0.jar</td>
   </tr>
</table>

**②在SpringMVC配置文件中，配置`MultipartResolver`接口的实现类**


**springmvc.xml**

```
…
<bean id="multipartResolver"
class="org.springframework.web.multipart.
commons.CommonsMultipartResolver">
	<property name="defaultEncoding" value="UTF-8"></property>
	<property name="maxUploadSize" value="1024000"></property>
</bean>	
```

需要注意，这个`bean`的`id`值必须是`multipartResolver`。`DispatcherServlet`会自动查找`id`为`multipartResolver`的`Bean`，并对其进行解析。如果`id`值不是`multipartResolver`，那么`DispatcherServlet`就会忽略对此`Bean`的解析，也就无法加入文件上传的支持。


**`CommonsMultipartResolver`中属性的介绍如下：**

<table>
   <tr>
      <td>属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>defaultEncoding</td>
      <td>指定解析request请求的编码格式。设置上传</td>
   </tr>
   <tr>
      <td>uploadTempDir</td>
      <td>指定上传文件时的临时目录，默认是Servlet容器的临时目录。</td>
   </tr>
   <tr>
      <td>maxUploadSize</td>
      <td>设置上传文件的最大值，单位是字节。-1时表示无限制，默认是-1。</td>
   </tr>
   <tr>
      <td>maxInMemorySize</td>
      <td>设置在文件上传时，允许写到内存中的最大值，单位是字节，默认是10240字节。</td>
   </tr>
</table>

**③编写请求处理方法，实现文件上传**


**请求处理类：SecondSpringDemo.java**

```
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
	@RequestMapping("/testFileUpload")
	public String testFileUpload(@RequestParam("desc") String desc, @RequestParam("file") MultipartFile file)
			throws IOException
	{
		String fileName = file.getOriginalFilename();
		System.out.println("desc: " + desc);
		System.out.println("OriginalFilename: " + fileName);
		System.out.println("InputStream: " 
+ file.getInputStream());
		InputStream input = file.getInputStream();
		System.out.println("D:"+File.separator+fileName);
		OutputStream out 
= new FileOutputStream("D:"+File.separator+fileName);
		byte[] b = new byte[1024];
		while ((input.read(b)) != -1)
		{
			out.write(b);
		}
		input.close();
		out.close();
		return "success";
	}
}
```

通过参数`@RequestParam("file") MultipartFile file`获取到前端传来的`File`对象，并通过`file.getInputStream()`得到`File`对象的输入流，之后再通过输出流将文件写入到D盘，即实现文件上传功能。

**④测试**

**index.jsp**

```
<form action="SecondSpringDemo/testFileUpload"
 method="POST" enctype="multipart/form-data">
		文件: <input type="file" name="file"/>
		描述: <input type="text" name="desc"/>
		<input type="submit" value="Submit"/>
</form>
```

在JSP页面中使用文件上传时，除了文件的字段要使用`type="file"`外，还需要注意设置表单的提交方式以及编码类型，即`method="POST" enctype="multipart/form-data"`。


# 30.2 拦截器 #

## 30.2.1 拦截器简介 ##

拦截器的实现原理和过滤器相似，都可以对用户发出的请求或者对服务器做出的响应进行拦截。SpringMVC也提供了一个用于支持拦截器的`HandlerInterceptor`接口，此接口的实现类就是一个拦截器。


`HandlerInterceptor`接口包含了以下方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)   throws Exception</td>
      <td>用于拦截客户端发出的请求。此方法会在request请求到达服务器之前被调用，如果拦截处理后，需要将请求放行，则返回true;如果拦截处理后，需要结束请求（即让请求不再向服务器传递），则返回false。</td>
   </tr>
   <tr>
      <td>void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception</td>
      <td>用于拦截服务器发出的响应。此方法会在请求处理方法执行处理完request请求之后、服务器发出的response响应到达DispatcherServlet的渲染方法之前被调用，参见下图。</td>
   </tr>
   <tr>
      <td>void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception</td>
      <td>此方法会在DispatcherServlet将response响应的视图渲染完毕之后被调用，参见下图。</td>
   </tr>
</table>

**拦截器的执行流程如下：**

![](http://i.imgur.com/XaHMmok.png)

*图30-01*

## 30.2.2 拦截器使用步骤 ##

**以下是在SpringMVC中创建并使用拦截器的具体步骤：**

**①创建自定义拦截器**

创建一个类，并实现`HandlerInterceptor`接口，如下：

**FirstInterceptor.java**

```
//import…
public class FirstInterceptor implements HandlerInterceptor
{
	// 拦截客户端发出的请求
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		System.out.println("第一个拦截器preHandle()方法...");
		return true;// 将请求放行
	}

	// 用于拦截服务器发出的响应
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception
	{
		System.out.println("第一个拦截器postHandle()方法...");
	}

	// 视图渲染完毕之后被调用
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception
	{
		System.out.println("第一个拦截器afterCompletion()方法...");
	}
}
```

**②配置拦截器**

将写好的拦截器配置到SpringMVC配置文件之中：

**springmvc.xml**

```
…
<mvc:interceptors>
	<!-- 配置自定义的拦截器  -->
	<bean class="org.lanqiao.interceptor.FirstInterceptor">
</bean>
</mvc:interceptors>
```

**③测试**
	
默认的拦截器会拦截所有向达服务器发送的请求，如下：

**请求处理类：SecondSpringDemo.java**

```
…
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
…
	@RequestMapping("/testInterceptor")
	public String testInterceptor()
	{
		System.out.println("请求处理方法...");
		return "success";
	}
}
```

**index.jsp**

`<a href="SecondSpringDemo/testInterceptor">testInterceptor</a>`


执行**index.jsp**中的超链接，控制台的运行结果：

![](http://i.imgur.com/v9NaBPF.png)

*图30-02*


## 30.2.3 拦截器的拦截配置 ##

以上方法实现的拦截器会拦截所有请求，此外我们还可以通过配置，使得拦截器只拦截或不拦截某些特定请求。为此，只需要将SpringMVC中对拦截器的配置修改如下：


**springmvc.xml**

```
…
<mvc:interceptors> 
	<mvc:interceptor>
		<!-- 拦截的请求路径 -->
		<mvc:mapping path="/**"/>
		<!-- 不拦截的请求路径 -->
		<mvc:exclude-mapping 
path="/SecondSpringDemo/testFileUpload"/>
		<bean lass=" org.lanqiao.interceptor.FirstInterceptor ">
</bean>
	</mvc:interceptor>
</mvc:interceptors>
```

**`<mvc:interceptor>`子元素的简介如下：**

<table>
   <tr>
      <td>元素</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>&lt;mvc:mapping path=""/&gt;</td>
      <td>配置会被拦截器拦截的请求路径。</td>
   </tr>
   <tr>
      <td>&lt;mvc:exclude-mapping path=""/&gt;</td>
      <td>配置不会被拦截器拦截的请求路径。</td>
   </tr>
</table>



最终拦截的请求路径是`mapping`与`exclude-mapping`的交集。例如，上述**springmvc.xml**中配置的`FirstInterceptor`拦截器：会拦截除了请求路径是/`SecondSpringDemo`/`testFileUpload`以外的所有请求。


本例中只涉及到了一个拦截器，如果配置了多个拦截器，则多个拦截器拦截请求/响应的顺序与使用多个过滤器拦截请求/响应的顺序是完全相同的，读者可以参见*“7.4过滤器”*。



# 30.3 练习题 #

1.SpringMVC提供了哪个类用来支持文件上传？

2.简述SpringMVC实现文件上传的基本步骤。

3.SpringMVC提供了哪个接口用来支持拦截器的实现？该接口中有哪些方法？

4.使用SpringMVC实现拦截器的基本步骤是什么？



