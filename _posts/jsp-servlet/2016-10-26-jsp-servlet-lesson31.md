---

layout: post

title: 异常处理

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍异常处理。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

> **本章简介**

SpringMVC提供了`HandlerExceptionResolver`接口来处理异常，并且会被`DispatcherServlet`默认加载，该接口的实现类如下图：

![](http://i.imgur.com/SdbCRMI.png)

*图31-01*

每一个实现类都提供了一种不同的异常处理方式，本书重点讲解`ExceptionHandlerExceptionResolver`、`ResponseStatusExceptionResolver`、`DefaultHandlerExceptionResolver`、`SimpleMappingExceptionResolver`等四种实现类处理异常的方式。

# 31.1 `ExceptionHandlerExceptionResolver` #

`ExceptionHandlerExceptionResolver`是`HandlerExceptionResolver`接口的一个实现类，该类提供了`@ExceptionHandler`注解用来捕获指定类型的异常。我们下面通过一个示例来了解一下`ExceptionHandlerExceptionResolver`处理异常的基本流程：


**请求处理类（产生一个异常）：SecondSpringDemo.java**

```
//import…
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
	…
	@RequestMapping("/testExceptionHandlerExceptionResolver")
	public String testExceptionHandlerExceptionResolver(){
		//产生一个ArithmeticException异常
		int num = 1/0 ;
		return "success";
	}
	
	//捕获本类中所有方法抛出的ArithmeticException异常
	@ExceptionHandler({ArithmeticException.class})
	public String handleArithmeticException(Exception ex){
		System.out.println("发生了数学异常: " + ex);
		//发生异常后，跳转到error.jsp页面
		return "error";
	}
```

**index.jsp**

```
<a href=
"SecondSpringDemo/testExceptionHandlerExceptionResolver">
testExceptionHandlerExceptionResolver
</a>
```

执行**index.jsp**中的超链接，可以发现控制台输出了`handleArithmeticException()`方法中的异常提示，并且页面跳转到了**error.jsp**，如图。


![](http://i.imgur.com/xW8xXPG.png)

*图31-02*

![](http://i.imgur.com/ixWQZwR.png)

*图31-03*

可以发现，`@ExceptionHandler({ArithmeticException.class})`修饰的方法会捕获当前类中抛出的`ArithmeticException`类型的异常。也就是说，在某一个类中产生的异常，可以在该类中定义一个`@ExceptionHandler`({异常类型.class})修饰的方法来捕获此异常。此外，异常对象会被保存在`Exception`类型的参数中。

我们知道`ArithmeticException`是`RuntimeException`的子类，如果在一个类中抛出一个`ArithmeticException`异常，而该类中既存在`@ExceptionHandler({ArithmeticException.class})`修饰的方法，又存在`@ExceptionHandler({RuntimeException.class})`修饰的方法，那么异常只会被`@ExceptionHandler({ArithmeticException.class})`修饰的方法所捕获。只有当本类中不存在`@ExceptionHandler({ArithmeticException.class})`修饰的方法时，此异常才会被`@ExceptionHandler({RuntimeException.class})`修饰的方法所捕获。也就是说，如果有多个`@ExceptionHandler`修饰的方法可以捕获同一个异常时，异常只会被最精确的处理方法所捕获。

还需要注意的是，使用`@ExceptionHandler`修饰的方法的参数，只能是`Throwable或`其子类类型，并且不能再有其他参数存在，

**例如可以写成以下几种形式：**

```
@ExceptionHandler({ArithmeticException.class})
public String handleArithmeticException(Throwable ex)
{…}

@ExceptionHandler({ArithmeticException.class})
public String handleException(Exception ex)
{…}

@ExceptionHandler({ArithmeticException.class})
public String handleArithmeticException(ArithmeticException aEx)
{…}
```

**但不能写成以下形式：**

```
@ExceptionHandler({ArithmeticException.class})
public String handleArithmeticException(Exception ex,
Map<String,Object> map)
{…}

@ExceptionHandler({ArithmeticException.class})
public String handleArithmeticException(String message)
{…}
```

因此，如果要在**error.jsp**中显示异常信息，就必须将视图和异常信息封装到`ModelAndView`对象之中并返回。

	
已经知道，使用`@ExceptionHandler`修饰的方法可以捕获同一个类中的异常。但如果`@ExceptionHandler`修饰的方法与产生异常的方法不在同一个类之中，那么异常就无法被捕获。为此，我们可以新建一个类，并且使用`@ControllerAdvice`注解修饰此类，如下：

**MyExceptionHandler.java**

```
//import…
@ControllerAdvice
public class MyExceptionHandler
{
	@ExceptionHandler({ArithmeticException.class})
	public ModelAndView MyException(Exception e){
		System.out.println("(异常处理类)异常信息："+e);
		ModelAndView mv = new ModelAndView("exception");
		mv.addObject("ex", e);
		return mv;
	}
}
```

`@ControllerAdvice`修饰的类可以理解为“异常处理类”，此异常处理类就可以捕获项目中所有类中方法产生的`ArithmeticException`异常。如果同一个异常既可以被同一个类中`@ExceptionHandler`修饰的方法所捕获，又可以被异常处理类中`@ExceptionHandler`修饰的方法所捕获，那么根据“就近原则”只会被同一个类中`@ExceptionHandler`修饰的方法所捕获。


# 31.2 `ResponseStatusExceptionResolver` #

在开发过程中，我们经常能看到类似以下的异常页面：

![](http://i.imgur.com/QojIdBW.png)

*图31-04*

页面中的异常信息都是服务器预先设置好的，除此之外，我们还可以自己定制这些页面中的异常信息，这就可以通过`ResponseStatusExceptionResolver`类提供的`@ResponseStatus`注解来实现，可以通过`@ResponseStatus`注解的`value`属性指定异常的状态码（如404等）、`reason`属性指定具体的异常信息，如下新建一个异常的实现类并用`@ResponseStatus`自定义异常信息：


**MyArrayOutOfBounderException.java**

```
@ResponseStatus(value=HttpStatus.FORBIDDEN, reason="数组越界")
public class MyArrayOutOfBounderException   extends RuntimeException
{
}
```

其中HttpStatus.FORBIDDEN的值是403。

再通过请求处理方法和**index.jsp**进行测试：


**SecondSpringDemo.java**

```
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
	…
	@RequestMapping("/testResponseStatus")
	public String testResponseStatus(@RequestParam Integer i)
	{
		if (i == 10)
		{
			// 抛出一个异常
			throw new MyArrayOutOfBounderException();
		}
		return "sucess";
	}
}
```

**index.jsp**

```
<a href="SecondSpringDemo/testResponseStatusi=10">
testResponseStatus
</a>
```

执行**index.jsp**中的超链接，运行结果：

![](http://i.imgur.com/Kh7P9da.png)

*图31-05*

即可以通过`@ResponseStatus`注解修饰异常类，从而自定义异常提示页面。
	
`@ResponseStatus`注解除了能标识在异常类上以外，还可以标识在方法上，使得访问此方法的请求直接显示`@ResponseStatus`定制的异常信息，如下：


**SecondSpringDemo.java**

```
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
    …
	@ResponseStatus(value=HttpStatus.FORBIDDEN, reason="数组越界")
	@RequestMapping("/testResponseStatusWithMethod")
	public String testResponseStatusWithMethod()
	{
		return "sucess";
	}
}
```

**index.jsp**

```
<a href="SecondSpringDemo/testResponseStatusWithMethod">
testResponseStatusWithMethod
</a>
```

执行**index.jsp**中的超链接，去访问被`@ResponseStatus`注解标识的方法，就能直接得到异常页面：

![](http://i.imgur.com/swZeRjc.png)

*图31-06*

# 31.3 `DefaultHandlerExceptionResolver` #

Springmvc默认装配了`DefaultHandlerExceptionResolver`异常解析器 ,会对一些特殊的异常，如`NoSuchRequestHandlingMethodException`、`HttpRequestMethodNotSupportedException`、`HttpMediaTypeNotSupportedException`、`HttpMediaTypeNotAcceptableException`等进行处理。以下，我们以`NoSuchRequestHandlingMethodException`为例进行测试：
	

如果某一个请求的请求方式，与请求处理方法所指定的请求方式不一致，就会抛出`NoSuchRequestHandlingMethodException`异常。例如，请求的是`GET`方式，而请求处理方法指定的是`POST`方式，如下：

**SecondSpringDemo.java**

```
//import…
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
    …
	@RequestMapping(value="/testNoSuchRequestHandlingMethodException",method=RequestMethod.POST)
	public String testNoSuchRequestHandlingMethodException(){
		return "success";
	}
}
```

**index.jsp**

```
<a href
="SecondSpringDemo/testNoSuchRequestHandlingMethodException">
testNoSuchRequestHandlingMethodException
</a>
```

执行**index.jsp**中的超链接，所产生的`NoSuchRequestHandlingMethodException`异常就会被`DefaultHandlerExceptionResolver`所捕获并处理，处理后就会显示如下界面：

![](http://i.imgur.com/anR9YuA.png)

*图31-07*


# 31.4 `SimpleMappingExceptionResolver` #


SpringMVC还提供了`SimpleMappingExceptionResolver`，来让我们通过配置的方式处理异常。例如，先通过以下代码产生一个`NumberFormatException`异常：

**SecondSpringDemo.java**

```
//import…
@Controller
@RequestMapping(value = "/SecondSpringDemo")
public class SecondSpringDemo
{
    …
	@RequestMapping("/testSimpleMappingExceptionResolver")
	public String testSimpleMappingExceptionResolver()  
{
		//java.lang.NumberFormatException
		int  num = Integer.parseInt("abc");
		return "success" ;
	}
}
```

并通过**index.jsp**来访问触发此异常：


**index.jsp**

```
<a href="SecondSpringDemo/testSimpleMappingExceptionResolver">
testSimpleMappingExceptionResolver
</a>
```

之后就可以通过在**springmvc.xml**配置`SimpleMappingExceptionResolver`，来使得程序在发生`NumberFormatException`异常后，能跳转到一个指定的错误页面，如下：

**springmvc.xml**

```
<beans …>
	<bean class="org.springframework.web.servlet.handler
.SimpleMappingExceptionResolver">
<property name="exceptionAttribute" value="ex"></property>
	   <property name="exceptionMappings">
		  <props>
<prop key="java.lang.NumberFormatException">
error
</prop>
		  </props>
	   </property>
	</bean>
</beans>
```

以上，通过`exceptionMappings`属性指定捕获的异常类型是`NumberFormatException`，并且指定发生此类型的异常后，页面立即跳转到**/views/error.jsp**页面。并通过`exceptionAttribute`属性指定将异常对象保存在`request`作用域中的`ex`变量之中。

**说明：**

`exceptionAttribute`属性的默认值是`exception`。即如果不设置`exceptionAttribute`的值，SpringMVC就会自动的将异常对象保存在`request`作用域中的`exception`变量之中。

**error.jsp**

```
…
<body>
error.jsp页面<br/>
	${requestScope.ex }
</body>
…
```

执行上述**index.jsp**中的超链接，页面就会跳转到**error.jsp**页面，并打印出异常信息，如下，


![](http://i.imgur.com/Nz72N4J.png)

*图31-08*


# 31.5 练习题 #

1.`DispatcherServlet`默认会加载哪个接口，用来处理异常？

2.SpringMVC提供了哪些常见的异常处理方式？

3.简述使用`ExceptionHandlerExceptionResolver`、`DefaultHandlerExceptionResolver`处理异常的基本步骤。

