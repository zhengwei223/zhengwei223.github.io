---

layout: post

title: 映射

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍映射。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---


# 25.1 `@RequestMapping` #

## 25.1.1 `@RequestMapping`使用 ##

之前，我们是把`@RequestMapping`注解放在方法之上，用来给方法绑定一个请求映射。除此以外，`@RequestMapping`注解还可以放在类的上面。例如，我们给之前的请求处理类（`FirstSpringDemo.java`）的类名上也加一个`@RequestMapping`注解，如下，

**FirstSpringDemo.java**


```
…
@Controller
@RequestMapping("/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/firstSpringMVC")
	public String welcomeToSpringMVC()
	{
		System.out.println("welcome to springMVC");
		return "success";
	}
}
```

类前面加了`@RequestMapping`注解以后，前端发来的请求就不能再直接去匹配方法上面的`@RequestMapping`了。而是应该先匹配类前的`@RequestMapping`值，再匹配方法前的`@RequestMapping`。


因此，方法前面`@RequestMapping`的值，是相对于类前的`@RequestMapping`值。如果类的前面不存在`@RequestMapping`，则方法前的`@RequestMapping`值就是相对于项目根目录。
例如，在类前加了`@ RequestMapping("/FirstSpringDemo")`以后，前台就必须通过以下路径来访问：

**index.jsp**

```
…
<body>
	<a href="FirstSpringDemo/firstSpringMVC">
My First SpringMVC Demo
</a>
</body>
…
```

即先通过“`FirstSpringDemo`”匹配类前的`@RequestMapping("/FirstSpringDemo")`
，再通过“ `firstSpringMVC`”匹配方法前的`@RequestMapping("/firstSpringMVC")`。


## 25.1.2 `@RequestMapping`属性 ##


`@RequestMapping`注解的常用属性如下，

<table>
   <tr>
      <td>属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>value</td>
      <td>指定请求的实际URL地址，属性名value可省。例如@RequestMapping("/firstSpringMVC")等价于@RequestMapping(value="/firstSpringMVC")</td>
   </tr>
   <tr>
      <td>method</td>
      <td>指定请求的method类型，包含 GET（默认）、POST、PUT、DELETE等。请求方式可以通过枚举类RequestMethod获取，如RequestMethod.POST。</td>
   </tr>
   <tr>
      <td>params</td>
      <td>规定请求中的些参数值，必须满足一定的条件。params本身是一个字符串数组。</td>
   </tr>
   <tr>
      <td>headers</td>
      <td>规定请求中的请求头（header），必须满足一定的条件</td>
   </tr>
</table>

**(1)`method`属性**

例如，因为超链接本身是采用`GET`方式提交请求。因此，若前台仍然是通过`<a href="FirstSpringDemo/firstSpringMVC">...</a>`发送请求，则处理类必须使用`GET`方式才能接受到此请求。如果使用“`POST`”等其他方式，是无法获取到该请求的，如下，


**FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value="/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping(value="/firstSpringMVC"
,method=RequestMethod.POST)
	public String welcomeToSpringMVC()
	{
		return "success";
	}
}
…
```

如果再点击上面超链接，运行结果如下，

![](http://i.imgur.com/sR9MPgK.png)


*图25-01*


提示我们“请求方法不支持`GET`方式”。


如果把超链接，替换成以下`POST`方式的表单提交，


**index.jsp**

```
…
<body>
	<form action="FirstSpringDemo/firstSpringMVC" method="POST">
		<input type="submit" value="POST方式提交"/>
	</form>
</body>
…
```

点击“`POST`方式提交”后，就又会正常运行。

**(2)`params`属性**

例如，我们通过超链接加入两个请求参数，如下，

**index.jsp**

```
…
<body>
<a href=
"FirstSpringDemo/requestWithParams?name=zhangsan&age=20">
requestWithParams...
</a>
</body>
…
```

再通过`params`来检查请求中的参数是否符合要求，如下，

**FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value="/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping(value="/requestWithParams"
,params={"name","age!=23"})
	public String requestWithParams()
	{
		return "success";
	}
}
…
```

以上请求通过`params`规定请求参数必须包含“`name`”参数，并且“`age!=23`”，我们之前发来的请求“`…?name=zhangsan&age=20`”符合要求，因此可以被该方法接收并处理。如果发送的请求参数是“`…?name=zhangsan&age=23`”或“`…? age=23`”等不符合`params`规定，就会引发我们所熟悉 “404”异常

`params`支持以下表达式：

<table>
   <tr>
      <td>表达式</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>paramName</td>
      <td>表示必须包含参数名为“paramName”的参数</td>
   </tr>
   <tr>
      <td>!paramName</td>
      <td>表示不能包含参数名为“paramName”的参数</td>
   </tr>
   <tr>
      <td>paramName！=paramValue</td>
      <td>表示必须包含参数名为“paramName”的参数，但参数值不能是“paramValue”</td>
   </tr>
</table>


**(3)`headers`属性**

SpringMVC中用`headers`来约束“参数”，用`headers`来约束“请求头”。例如，我们可以在火狐浏览器里打开“firebug”查看每一次请求的“请求头”，如下，

![](http://i.imgur.com/wFr29ka.png)

*图25-02*

“请求头”指明了请求所携带的`MIME`类型、字符集等信息。


例如，可以通过“`headers`”指定请求头中的“Accept-Language”必须是“`zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3`”，以及“`Accept-Encoding`”必须是“`gzip, deflate`”，如下


**FirstSpringDemo.java**

```
…
	@RequestMapping(value="/requestWithHeaders",
headers={"Accept-Language=zh-CN,zh;
q=0.8,en-US;q=0.5,en;q=0.3",
"Accept-Encoding=gzip, deflate"})
	public String requestWithHeaders()
	{
		return "success";
	}
…
```

关于“请求头”的知识，读者可以查阅相关资料，本书不作为重点讲解。


# 25.2 基于`@RequestMapping`的配置 #

## 25.2.1 Ant风格的请求路径 ##

SpringMVC除了支持传统方式的请求路径外，还支持Ant风格的资源地址。




**Ant风格的资源地址支持以下3种通配符：**

<table>
   <tr>
      <td>通配符</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>?</td>
      <td>匹配任何单字符</td>
   </tr>
   <tr>
      <td>*</td>
      <td>匹配0或者任意数量的字符</td>
   </tr>
   <tr>
      <td>**</td>
      <td>匹配0或者更多的目录</td>
   </tr>
</table>

例如，在处理方法前配置`@RequestMapping(value="/requestWithAntPath/*/test")`,表示请求路径的“`requestWithAntPath`”和“`test`”之间可以填任意字符，如下，


**FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value="/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping(value="/requestWithAntPath/*/test")
	public String requestWithAntPath()
	{
		return "success";
	}
…
}
```

如果前段发送以下请求，是可以匹配到`requestWithAntPath()`方法的。


**index.jsp**

```
…
<body>
	<a href="FirstSpringDemo/requestWithAntPath/lanqiao/test">
requestWithAntPath...
</a>
…
</body>
…
```

**其他Ant风格的示例如下表，**

<table>
   <tr>
      <td>请求路径</td>
      <td>匹配的示例</td>
   </tr>
   <tr>
      <td>/requestWithAntPath/**/test</td>
      <td>/requestWithAntPath/a/b/test、/requestWithAntPath/test等</td>
   </tr>
   <tr>
      <td>/requestWithAntPath/test??</td>
      <td>/requestWithAntPath/testxy、/requestWithAntPath/testqq等</td>
   </tr>
</table>

## 25.2.2 使用`@PathVariable`获取动态参数 ##

在SpringMVC中，可以使用`@PathVariable`来获得请求路径中的动态参数。


如下，通过前段传入一个参数“9527”，

**index.jsp**

```
…
<body>
	<a href="FirstSpringDemo/requestWithPathVariable/9527">
requestWithPathVariable...
</a>
</body>
…
```

处理方法就可以通过`@PathVariable`来获取此参数值，如下


**FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value="/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping(value="/requestWithPathVariable/{id}")
	public String 
requestWithPathVariable(@PathVariable("id") Integer id)
	{
		System.out.println("id:"+id);
		return "success";
	}}
…
```

具体是通过`@RequestMapping(value="/requestWithPathVariable/{id}")`中的占位符“`{id}`”接收到参数值“9527”，再把参数值传给`@PathVariable("id")`中的“`id`”，最后再把值赋值给方法的参数`id`。最后`requestWithPathVariable（）`方法的打印结果为：“id:9527”。


## 25.2.3 REST风格 ##

REST(Representational State Transfer)是一种编程风格，可以显著降低开发的复杂性，是一种目前流行的互联网软件架构。


在应用REST之前，我们首先要了解到，在HTTP协议里面有很多请求方式，其中`GET`、`POST`、`PUT`、`DELETE`等四个方式，可以分别用来对应四种操作。即`POST`对应“增”，`DELETE`对应“删”、`PUT`对应“改”，`GET`对应“查”。

而普通浏览器中的`form`表单，支持`GET`和`POST`两种请求方式。为了支持`PUT`和`DELETE`方式，必须使用Spring提供的“`HiddenHttpMethodFilter`”过滤器，此过滤器可以通过一定的规则，来实现`PUT`及`DELETE`请求。`HiddenHttpMethodFilter`的实现原理，读者可以查看`spring-web-x.x.xRELEASE.jar`包中`HiddenHttpMethodFilter`类里的`doFilterInternal()`方法。

实现`PUT`或`DELETE`请求步骤如下：

**1.**在**web.xml**中配置`HiddenHttpMethodFilter`过滤器，如下，


**web.xml**

```
…
<web-app …>
	<filter>
		<filter-name>HiddenHttpMethodFilter</filter-name>
		<filter-class>
org.springframework.web.filter.HiddenHttpMethodFilter
</filter-class>
	</filter>

	<filter-mapping>
		<filter-name>HiddenHttpMethodFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
</web-app>
```

**2.**在`form`表中单使用“`POST`”请求方式，并在表单中增加一个`hidden`隐藏域，并设置该隐藏域的`name`为“`_method`”、`value`值为“`PUT`”或“`DELETE`”。

**3.**在处理方法的`@RequestMapping`注解中，用`method`属性指定请求类型（如`RequestMethod.DELETE`、`RequestMethod.PUT`等）。

例如，在**web.xml**中配置了`HiddenHttpMethodFilter`以后，就可以使用下面的方式发送并处理增、删、改、查的请求：


**①发送请求**

**index.jsp**

```
…
<body>
    …
	<form action="FirstSpringDemo/requestWithREST/9527" 
method="post">
		<input type="hidden" name="_method" value="DELETE" />
		<input type="submit" value="删除" />
	</form>
	
	<form action="FirstSpringDemo/requestWithREST/9527" 
method="post">
		<input type="hidden" name="_method" value="PUT" />
		<input type="submit" value="修改" />
	</form>
	
	<form action="FirstSpringDemo/requestWithREST/9527" 
method="post">
		<input type="submit" value="增加" />
	</form>
	
	<a href="FirstSpringDemo/requestWithREST/9527">查看</a>
</body>
…
```

**②处理请求**

**FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value="/FirstSpringDemo")
public class FirstSpringDemo
{
	…
	//使用REST风格，处理“删除”的请求
	@RequestMapping(value="/requestWithREST/{id}",
method=RequestMethod.DELETE)
	public String requestWithRestDelete(@PathVariable("id")
 Integer id)
	{
		System.out.println("删除时需要的id:"+id);
		return "success";
	}
	//使用REST风格，处理“修改”的请求
	@RequestMapping(value="/requestWithREST/{id}",
method=RequestMethod.PUT)
	public String requestWithRestPut(@PathVariable("id") 
Integer id)
	{
		System.out.println("修改时需要的id:"+id);
		return "success";
	}
	//使用REST风格，处理“增加”的请求
	@RequestMapping(value="/requestWithREST/{id}",
method=RequestMethod.POST)
	public String requestWithRestAdd(@PathVariable("id") 
Integer id)
	{
		System.out.println("增加时需要的id:"+id);
		return "success";
	}
	//使用REST风格，处理“查看”的请求
	@RequestMapping(value="/requestWithREST/{id}",
method=RequestMethod.GET)
	public String requestWithRestGet(@PathVariable("id") Integer id)
	{
		System.out.println("查询时需要的id:"+id);
		return "success";
	}
}
…
```

运行**index.jsp**页面，如图，

![](http://i.imgur.com/lzU1XLY.png)

*图25-03*

依次点击删除、修改、增加、查看按钮，可在控制台得到以下结果：

![](http://i.imgur.com/wMzKCkq.png)

*图25-04*

## 25.2.4 使用`@RequestParam`获取请求参数 ##


Spring MVC可以通过`@RequestParam`来接收请求中的参数值，该注解有三个常用的属性：

<table>
   <tr>
      <td>属性名</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>value</td>
      <td>请求携带参数的参数名</td>
   </tr>
   <tr>
      <td>required</td>
      <td>标识请示参数中是否必须存在某个具体的参数。   true（默认）：必须存在；若不存在，将抛出异常。   false：不必须。</td>
   </tr>
   <tr>
      <td>defaultValue</td>
      <td>给参数赋一个默认值。如果请求中不存在某个参数，则该参数就取defaultValue所设置的值。</td>
   </tr>
</table>


**index.jsp**

```
…
<a href="FirstSpringDemo/requestParam?name=zhangsan&age=23">
TestRequestParam
</a>
…
```

**FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value="/FirstSpringDemo")
public class FirstSpringDemo
{
	//使用@RequestParam注解接收请求参数
	@RequestMapping("/requestParam")
	public String requestParam(@RequestParam(value="name") String name,	@RequestParam(value="age") Integer age)
{
		System.out.println("name: " + name + "   age: " + age);
		return "success";
	}
}…
```

`@RequestParam`通过`value`值与传入的参数名匹配，并将参数值赋值给`@RequestParam`后面的变量。例如，通过`@RequestParam(value="name")`接收**index.jsp**传来的`name`参数值(即zhangsan)，并将参数值（zhangsan）赋值给`@RequestParam`后面的String name，即`String name="zhangsan"`。	

若将请求中的`age`参数删除，如下


**index.jsp**

```
<a href="FirstSpringDemo/requestParam?name=zhangsan">
TestRequestParam
</a>
```

再次执行以上超链接，则会发生异常，如下：

![](http://i.imgur.com/sYNDjC0.png)


*图25-05*

解决此异常的方法，就是给`age`参数的`@RequestParam`中加入`required=false`，如下：


**FirstSpringDemo.java**

```
…
@RequestMapping("/requestParam")
public String requestParam(@RequestParam(value = "name") String name, @RequestParam(value = "age",required=false) Integer age)
{
    …
}
…
```

此外，还可以通过`@RequestParam`的`defaultValue`属性给请求参数设置默认值，如下，


**FirstSpringDemo.java**

```
…
@RequestMapping("/requestParam")
	public String requestParam(@RequestParam(value = "name")
 String name, @RequestParam(value = "age",
required=false,defaultValue="23") Integer age)
	{
		System.out.println("name: " + name + "   age: " + age);
		return "success";
	}…
```

通过`defaultValue="23"`将`age`的默认值设置为"23"，即如果前端发送的请求中没有携带age参数，则`age`的值就是23。

## 25.2.5 `@RequestHeader`注解 ##

在HTTP协议中，每一次请求都会携带相关的“头信息”，例如可以在fireBug中观察到以下头信息：

![](http://i.imgur.com/1iAtbJk.png)


*图25-06*

SpringMVC也提供了`@RequestHeader`注解来帮助我们获取请求中的“头信息”，如下：


**index.jsp**

`<a href="FirstSpringDemo/requestHeader"> requestHeader</a><br/>`

**FirstSpringDemo**

```
…
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/requestHeader")
	public String 
requestHeader(@RequestHeader(value="Accept-Language")
String al){
		System.out.println("Accept-Language:" + al);
		return "success";
	}
}
…
```

通过`@RequestHeader`获取“头信息”，并通过`value`属性指定获取头信息中的`Accept-Language`值，并把值赋值给`al`参数。

执行**index.jsp**中的`requestHeader`超链接，可在控制台得到以下结果：

![](http://i.imgur.com/VYXZOKf.png)


*图25-07*

## 25.2.6 `@CookieValue`注解 ##

`@CookieValue`可以给处理方法入参绑定某个`Cookie`值，例如服务器与客户端之间有一个名为JSESSIONID的`Cookie`，我们下面就通过`@CookieValue`来获取JSESSIONID的值：


**index.jsp**

`<a href="FirstSpringDemo/cookieValue">cookieValue</a><br/>`

**FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/cookieValue")
	public String cookieValue(@CookieValue(value="JSESSIONID")
String sessionid){
		System.out.println("sessionid:" + sessionid);
		return "success";
	}
}
…
```

运行结果：

![](http://i.imgur.com/MA2T5NY.png)

*图25-08*

## 25.2.7 使用实体类对象接收请求参数值 ##

如果处理方法的参数是一个实体类对象，那么SpringMVC会将请求的参数名与实体类对象的属性进行匹配，为实体类对象的属性赋值，并且支持级联属性的赋值。以下是具体的示例：


**实体类：Student.java**

```
public class Student 
{
	private String stuName;
	private int stuAge;
	private Address address ;
    //setter、getter
	@Override
	public String toString()
	{
		return "姓名:"+this.stuName+"\t年龄:"+this.stuAge
+"\t家庭地址："+this.address.getHomeAddress()
+"\t学校地址："+this.address.getSchoolAddress();	
}
}
```

**实体类：Address.java**

```
public class Address
{
	private String schoolAddress;
	private String homeAddress;
	//setter、getter
}
```

在`form`表单中使用实体类的属性名作为`<input>`标签的`name`值（可使用级联属性）：

**请求页：index.jsp**

```
<form action="FirstSpringDemo/entityProperties">
	姓名:<input type="text" name="stuName"/><br>
年龄:<input type="text" name="stuAge"/><br>
<!-- 使用级联属性 -->
	家庭地址:<input type="text" name="address.homeAddress"/><br>
学校地址:<input type="text" name="address.schoolAddress"/><br>
	<input type="submit" value="提交"/>
</form>
```

**请求处理类：FirstSpringDemo.java**

```
// import…
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	//使用实体类对象接收请求参数值(form表单中提交的数据)
	@RequestMapping("/entityProperties")
	public String entityProperties(Student student){
		System.out.println(student);
		return "success";
	}
   …
}
```

执行**index.jsp**，如下

![](http://i.imgur.com/yubbPg5.png)

*图25-09*

点击提交后，控制台的输出结果：

![](http://i.imgur.com/pLT7hQR.png)

*图25-10*


## 25.2.8 使用Servlet API作为参数 ##

如果想使用原生的Servlet API进行开发，只需要将Servlet API放入方法的参数中，如下：

```
…
//使用Servlet API开发
@RequestMapping("/developWithServletAPI")
public String entityProperties(HttpServletRequest requst,
HttpServletResponse response, HttpSession session)
{
		//...
		return "success";
}
…
```


# 25.3 处理模型数据 #

假设需要从数据库查询数据：在MVC设计模式中，用户从视图页面（V）发起一个请求到控制器（C），控制器调用`DAO`等处理数据，并从数据库中返回数据（M）。控制器拿到数据后加以处理，并返回到视图页面。


SpringMVC提供了四种途径来处理带数据的视图（M和V）：`ModelAndView`、`Map`及`Model`、`@SessionAttributes`、`@ModelAttribute`。

## 25.3.1 ModelAndView ##

`ModelAndView`包含了Model（M）和View（V）两部分。用法如下：


**index.jsp**

```
…
<a href="FirstSpringDemo/testModelAndView">testModelAndView</a>
…
```

**请求处理类：FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/testModelAndView")
	public ModelAndView testModelAndView(){
	    String view = "success";
	    ModelAndView mav= new ModelAndView(view);
	    Student student = new Student("张三",23);
	    //添加student对象数据放入ModelAndView中 
	    mav.addObject("student ",student);
	    return mav;
	}
   …
}
```

通过`ModelAndView`的构造方法将视图页面的名称`”success”`放入`mav`对象，再通过`addObject()`方法将数据放入`mav`对象，最后返回`mav`。之后，程序会跳转到`mav`中包含的视图页面（即**success.jsp**），并将`mav`中的数据放入`request`作用于之中。

**返回的视图页面：success.jsp**

```
<body>
${requestScope.student.stuName }
</body>
```

执行**index.jsp**中的超链接，运行结果：

![](http://i.imgur.com/15adCzf.png)

*图25-11*

## 25.3.2 使用`Map`、`ModelMap`、`Model`作为方法的参数处理数据 ##

可以给SpringMVC的请求处理方法增加一个`Map`类型的参数。如果向此`Map`中增加数据，那么该数据也会被放入`request`作用域中。



**index.jsp**

`<a href="FirstSpringDemo/testMap">testMap</a>`


**请求处理类：FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
@RequestMapping("/testMap")
	public String testMap(Map<String, Object> map)
	{
		Student student = new Student("张三", 23);
		map.put("student", student);
		return "success";
	}   …
}
```

返回的视图页面**success.jsp**及运行结果同上例。

除了`Map`以外，还可以给请求处理的方法增加`ModelMap`或`Model`类型的参数，效果完全一样，如下：

**使用ModelMap类型的参数**

```
@RequestMapping("/testModelMap")
public String testMap(ModelMap map)
{
	Student student = new Student("张三", 23);
	map.put("student", student);
	return "success";
}
```

**使用Model类型的参数**

```
@RequestMapping("/testModel")
public String testMap(Model map)
{
	Student student = new Student("张三", 23);
	map.addAttribute("student", student);
	return "success";
}
```

## 25.3.3 使用`@SessionAttributes`处理数据 ##

我们已经知道，向`ModelAndView`以及`Map`、`ModelMap`、`Model`参数中增加数据时，数据会同时被放到`request`作用域中。如果还要把数据放到`session`作用域中，就需要使用`@SessionAttributes`注解，如下：

**index.jsp**

```
<a href="FirstSpringDemo/testSessionAttribute">
testSessionAttribute
</a>
```

**请求处理类：FirstSpringDemo.java**

```
@SessionAttributes(value="student")
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/testSessionAttribute")
	 public String testSessionAttribute(Map<String ,Object> map){
		 Student student = new Student("张三", 23);
			map.put("student", student);
			return "success";
	}
…
}
```

在类的上方加入`@SessionAttributes(value="student")`，表示将`request`作用域中的`"student"`对象同时加入到`session`作用域之中。

**返回的视图页面:success.jsp**

```
…
<body>
	request作用域中：${requestScope.student.stuName } <br/>
	session作用域中：${sessionScope.student.stuName } <br/>
</body>
…
```

**执行index.jsp中的超链接，运行结果：**

![](http://i.imgur.com/tNI0TpU.png)


*图25-12*


`@SessionAttributes`除了可以使用`value`将指定的对象名加入到`session`范围，还可以使用`types`将某一个类型的对象都加入到`session`范围，如下：


**请求处理类：FirstSpringDemo.java**

```
…
@SessionAttributes(types=Student.class)
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/testSessionAttribute")
	 public String testSessionAttribute(Map<String ,Object> map)
{
		 Student student = new Student("张三", 23);
			map.put("student", student);
			return "success";
	}
    …
}
```

通过`@SessionAttributes(types=Student.class)` 将`request`作用域中`Student`类型的对象同时加入到`session`作用域之中。



## 25.3.4 使用`@ModelAttribute`注解处理数据 ##

假设数据库中存在一条学生信息，如下：


![](http://i.imgur.com/sCEUpp1.png)

*图25-13*


现在我们需要修改学生的年龄（姓名等其他信息不变），先尝试用以下方式完成：

**index.jsp(修改学号为31号的学生年龄)**

```
…
<form action="FirstSpringDemo/testModelAttribute" method="post">
	<input type="hidden" value="31"  name="stuNo"/>
	年龄:<input type="text" name="stuAge"/><br>
	<input type="submit" value="修改"/>
</form>
…
```

**请求处理类：FirstSpringDemo.java**

```
…
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@RequestMapping("/testModelAttribute")
	public String testModelAttribute(Student student){
		System.out.println("更新后的学生信息：姓名： " 
+ student.getStuName()+",年龄："+student.getStuAge());
		return "success";
	}
}
…
```

**执行index.jsp，并将年龄修改为66岁，如图：**

![](http://i.imgur.com/BwYANTB.png)

*图25-14*

点击修改，控制台的输出结果如下：

![](http://i.imgur.com/ZtDiQy7.png)

*图25-15*

可以发现，年龄确实成功修改了，但是姓名却变成了`null`。这是因为在**index.jsp**的`form`表单中，只提交了`stuAge`字段的属性，而不存在stuName等其他字段的属性，因此`stuAge`属性会从输入框中获取，而其他属性值会使用相应类型的默认值（如`String`类型的`stuName`默认值就是`null`）。

这与我们的本意不符，我们的本意是：被修改的属性，使用修改后的值（如`stuAge`）；而没被修改的属性，要使用数据库中原有的值（如果`stuName`应该保留“张三”）。要想实现我们的“本意”，可以在请求控制类中增加一个用`@ModelAttribute`的方法，如下：

**请求处理类：FirstSpringDemo.java**


```
…
//@SessionAttributes(types=Student.class)
@Controller
@RequestMapping(value = "/FirstSpringDemo")
public class FirstSpringDemo
{
	@ModelAttribute
	public void queryStudentBeforeUpdate (int stuNo,Map<String,
 Object> map)
	{
		//使用带数据的实体类对象，模拟从数据库中获取学号为stuNo的学生对象
		Student student = new Student();
		student.setStuNo(stuNo);
		student.setStuName("张三");
		student.setStuAge(23);
		//即用以上语句模拟Student student 
= stuService.queryStudentByNo(stuNo);
			
		//将从数据库中查询的student对象放入map中
			map.put("student", student);
	}

	@RequestMapping("/testModelAttribute")
	public String testModelAttribute(Student student){
		System.out.println("更新后的学生信息：姓名： " + student.getStuName()+",年龄："+student.getStuAge());
		return "success";
	}
}
```

重新提交之前的`form`表单，控制台输出结果如下：

![](http://i.imgur.com/s3A5X88.png)

*图25-16*

可以发现，不但`stuAge`得到了修改，并且`stuName`也保留了原来的值。

**`@ModelAttribute`的应用逻辑是：**

`@ModelAttribute`修饰的方法（如`queryStudentBeforeUpdate()`）会在请求处理方法（如`testModelAttribute()`）调用之前被执行：具体是，如果请求处理方法有输入参数（如`student`），则程序会在`@ModelAttribute`修饰的方法中的`map`对象里，寻找`map`中的`key`值是否与请求处理方法的参数名①一致，如果一致（如`map`中有名为`”student”`的`key`，`testModelAttribute()`方法也有名为`”student”`的参数）就会用参数`student`中不为`null`的属性值(如`stuNo=31`，`stuAge=66`)去覆盖`map`中的`student`对象值，最后使用的是覆盖后的`student`对象。


例如，`map`中的`student`对象值是：“学号：31，姓名：张三，年龄23”，参数中`student`的对象值是：“学号31，姓名null，年龄66”，因此用参数`student`不为`null`的属性值（`stuNo=31，stuAge=66`）去覆盖`map`中`student`属性值的结果就是：“学号31，姓名：张三，年龄66”。即`form`表单传来的`stuNo`和`stuAge`属性得到了修改，而`form`表单中不存在的`stuName`属性则保持不变。如果`map`中的`key`值与请求处理方法的参数名不一致，则需要在参数前使用`@ModelAttribute`标识出`map`中对应的`key`值，如下：


**请求处理类：FirstSpringDemo.java**


```
…
	@ModelAttribute
	public void queryStudentBeforeUpdate(int stuNo,Map<String,
 Object> map)
	{
			...
			map.put("stu", student);
	}

	@RequestMapping("/testModelAttribute")
	public String testModelAttribute(
@ModelAttribute("stu")Student student){
		...
		return "success";
	}
…
```

`map`中的`key`是`”stu”`，与方法的参数名`”student”`不一致，就需要在参数名前使用`@ModelAttribute("stu")`来进行标识。

**①参数名：***实际是判断是否与“首字母小写的参数类型”一致。如参数的类型是`Student`，则会判断是否与首字母小写的参数类型（即`”student”`）一致。此段落中，用“参数名”来代替“首字母小写的参数类型”仅仅是为了便于读者阅读。*


**说明：**

标有`@ModelAttribute`注解的方法，会在请求处理类中的每一个方法执行前，都执行一次，因此需要谨慎使用。

# 25.4 练习题 #

1.`@RequestMapping`的常用属性有哪些？

2.如何通过`RequestParam`获取请求参数？

3.如何使用实体类对象接收请求参数？

4.如果在返回视图页面的同时，将一些数据放置在`request`作用域之中，该如何实现？

