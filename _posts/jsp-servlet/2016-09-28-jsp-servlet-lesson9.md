---

layout: post

title: EL和JSTL

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍EL和JSTL。EL表达式和JSTL标签库不仅能替换到JSP中的JAVA代码，而且还能使代码更加简洁。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

> **本章简介**

通过之前学习的三层架构，我们已经可以将表示层、业务逻辑层和数据访问层相互分离，从而实现程序的解耦合，以及提高系统的可维护性和可扩展性等。但在之前的代码中，表示层JSP的代码里仍然嵌套了很多JAVA代码，从而造成了表示层一定程度的混乱。

能否彻底的从表示层中消除JAVA代码呢？可以使用 EL表达式和JSTL标签库。EL表达式和JSTL标签库不仅能替换JSP中的JAVA代码，而且还能使代码更加简洁。

本章演示的项目名为ELAndJSTLDemo，因为本章只是在讲三层中的表示层，因此为了使读者清晰的掌握EL及JSTL，本章项目并没有采用标准的三层架构，而是以一个个简单的JSP示例来诠释。

# 9.1 EL表达式 #

EL的全称是Expression Language，可以用来替代JSP页面中的JAVA代码，从而能让即使不懂JAVA的开发人员也能写出JSP代码。EL还可以实现自动转换类型，使用起来非常简单。

## 9.1.1 EL表达式语法 ##

**语法：**

**${EL表达式}**

**EL表达式通常由两部分组成：对象和属性。可以使用“点操作符”或“中括号[]操作符”来操作对象的属性。**

讲解之前，我们先通过一个简单例子来回忆一下之前不用EL的使用情景。先创建两个封装数据的JavaBean，如下，

**地址信息类 Address.java**

```
package org.lanqiao.entity;
public class Address
{
	//家庭地址
	private String homeAddress ; 
	//学校地址
	private String schoolAddress ;
	//省略setter、getter
}
```

**学生信息类 Student.java**

```
package org.lanqiao.entity;
public class Student
{
	private int studentNo ;
	private String studentName;
    //地址属性
	private Address address ;
	//省略setter、getter
}
```

再创建一个Servlet用于初始化一些数据，并将此Servlet设置为项目的默认访问程序：

**InitServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class InitServlet extends HttpServlet
{
protected void doGet(…)…
	{
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
 HttpServletResponse response) 
throws ServletException, IOException
	{
			Address address = new Address();
			address.setHomeAddress("北京朝阳区");
			address.setSchoolAddress("北京大兴区大族企业广域网#6F2");
			
			Student student = new Student();
			student.setStudentNo(27);
			student.setStudentName("颜群");
			student.setAddress(address);
			
			request.setAttribute("student", student);
			request.getRequestDispatcher("index.jsp")
.forward(request, response);
	}
}
```

**web.xml**

```
…
 <welcome-file-list>
    <welcome-file>InitServlet</welcome-file>
  </welcome-file-list>
…
```

如上，程序会在InitServlet中给`student`对象的各个属性赋值，然后请求转发到index.jsp中。我们先用传统的Scriptlet接收对象，并将对象的属性显示到前台，如下，

**index.jsp**

```
…
<body>
	<%
		Student student = (Student)request.getAttribute("student");
		int studentNo = student.getStudentNo();
		String studentName = student.getStudentName();
		Address address = student.getAddress();
		String homeAddress = address.getHomeAddress();
		String schoolAddress = address.getSchoolAddress();
		
		out.print("学号："+studentNo +"<br/>");
		out.print("姓名："+studentName +"<br/>");
		out.print("家庭地址："+homeAddress +"<br/>");
		out.print("学校地址："+schoolAddress +"<br/>");
	%>
</body>
…
```

部署并执行此项目[http://localhost:8888/ELAndJSTLDemo/](http://localhost:8888/ELAndJSTLDemo/)，运行结果如图，

![](http://i.imgur.com/7vIAPwW.png)

*图9-01*

可以发现，程序的确能够正常的显示。但如果将**index.jsp**中的代码用EL表达式来实现，就会简单许多。如下是使用EL修改后的**index.jsp**，功能与之前的Scriptlet代码相同，

```
…
<body>
         <%-- 使用EL表达式 --%>
        学生对象：${requestScope.student}<br/>
	 	学号：${requestScope.student.studentNo } <br/>
	 	姓名：${requestScope.student.studentName } <br/>
	 	家庭地址：${requestScope.student.address.homeAddress } <br/>
	 	学校地址：${requestScope.student.address.schoolAddress } <br/>
</body>
…	
```

运行[http://localhost:8080/ELAndJSTLDemo/](http://localhost:8080/ELAndJSTLDemo/)，结果如图,

![](http://i.imgur.com/fatK7dR.png)

*图9-02*

综上，使用EL可以将JSP中的JAVA代码彻底消除，并且不用再做强制的类型转换，整体的JSP代码就会简单很多。

## 9.1.2 EL表达式操作符 ##

#### (1)点操作符 ####

`${requestScope.student}`，表示在`request`作用域内查找`student`对象；`${requestScope.student.studentNo }`，表示在`request`作用域内查找`student`对象的`studentNo`属性。点操作符“.”的用法和在JAVA中的用法相同，都是直接用来调用对象的属性。此外，通过`${requestScope.student.address.homeAddress }`可以发现，EL表达式能够级联获取对象的属性，即先在`request`作用域内找到`student`对象后，可以再次使用点操作符“.”来获取`student`内部的`address`对象……


#### (2)中括号[]操作符 ####

除了点操作符以外，还可以使用中括号操作符来访问某个对象的属性，例如`${requestScope.student.studentNo }`可以等价写成`${requestScope.student["studentNo"] }`或`${requestScope["student"]["studentNo"]` }。除此之外，中括号[]操作符还有一些其他独有功能：

**<1>**如果属性名称中包含一些特殊字符，如“.”、“?”、“-”等，就必须使用中括号操作符，而不能用点操作符。例如，如果在之前的InitServlet中写了`request.setAttribute("school-name", "LanQiao")`;那么在**index.jsp**中就不能用`${requestScope. school-name }`，而必须改为`${requestScope ["school-name "]` }。

**<2>**如果要动态取值时，也必须使用中括号操作符，而不能用点操作符。例如，`String data=”school”`（即`data`是一个变量），那么就只能用`${ requestScope [data]}`。需要注意中括号里面的值：如果加了双引号则表示一个常量，如`${requestScope ["school-name "] }`，表示获取`"school-name "`的属性值；而如果不加上双引号，则表示一个变量，如`${ requestScope [data]}`，表示获取`data`所表示的`”school”`的属性值，即等价于`${ requestScope [”school”]}`。所以在使用中括号获取属性值时，一定要注意是否加引号。此外，中括号中的值，除了双引号以外，也可以使用单引号，作用是一样的。

**<3>**访问数组。如果要访问`request`作用域内的一个对象名为`names`的数组，就可以通过中括号来表示索引，如`${ requestScope .array[0]}`、`${ requestScope .array[1]}`等。

点操作符和中括号操作符还可以用来获取`Map`中的属性值，如下，

**InitServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class InitServlet extends HttpServlet
{
…
	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		…
		Map<String,String> countries = new HashMap<String,String>();
		countries.put("cn", "中国");
		countries.put("us", "美国");
		request.setAttribute("countries", countries);
		request.getRequestDispatcher("index.jsp")
.forward(request, response);
	}
}
```

**index.jsp**

```
<body>
      …
	------------------Map------------------<br/>
	cn:${requestScope.countries.cn }<br/>
	us:${requestScope.countries["us"] }<br/>
</body>
```

打开浏览器执行[http://localhost:8080/ELAndJSTLDemo/](http://localhost:8080/ELAndJSTLDemo/)，运行结果如图，

![](http://i.imgur.com/t7CPyCa.jpg)

*图9-03*


#### (3)关系运算符 ####

EL表达式还能够进行一些简单的运算。

<table>
   <tr>
      <td> </td>
      <td>关系运算符</td>
      <td>示例</td>
      <td>结果</td>
   </tr>
   <tr>
      <td>大于</td>
      <td>>(或gt)</td>
      <td>${2>1}或${2 gt 1}</td>
      <td>true</td>
   </tr>
   <tr>
      <td>大于或等于</td>
      <td>>=(或ge)</td>
      <td>${2>=1}或${2 ge 1}</td>
      <td>true</td>
   </tr>
   <tr>
      <td>等于</td>
      <td>==(或eq)</td>
      <td>${2==1}或${2 eq 1}</td>
      <td>false</td>
   </tr>
   <tr>
      <td>小于或等于</td>
      <td><=(或le)</td>
      <td>${2<=1}或${2 le 1}</td>
      <td>false</td>
   </tr>
   <tr>
      <td>小于</td>
      <td><(或lt)</td>
      <td>${2<1}或${2 lt 1}</td>
      <td>false</td>
   </tr>
   <tr>
      <td>不等于</td>
      <td>!=(或ne)</td>
      <td>${2!=1}或${2 ne 1}</td>
      <td>true</td>
   </tr>
</table>


#### (4)逻辑运算符 ####

<table>
   <tr>
      <td> </td>
      <td>关系运算符</td>
      <td>示例</td>
      <td>结果</td>
   </tr>
   <tr>
      <td>逻辑或</td>
      <td>||(或or)</td>
      <td>true||false(或 true or false)</td>
      <td>true</td>
   </tr>
   <tr>
      <td>逻辑与</td>
      <td>&&(或and)</td>
      <td>true&&false(或 true and false)</td>
      <td>false</td>
   </tr>
   <tr>
      <td>逻辑非</td>
      <td>!(或not)</td>
      <td>!true (或 not true)</td>
      <td>false</td>
   </tr>
</table>


#### (5)Empty操作符 ####

Empty操作符用来判断一个值是否为`null`或不存在。我们在InitServlet中给`request`的作用域内增加两个变量，如下，

**InitServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class InitServlet extends HttpServlet
{
	…
	protected void doPost(HttpServletRequest request,
                               HttpServletResponse response) 
throws ServletException, IOException
	{
			…
			request.setAttribute("test","test");
			request.setAttribute("nullVar",null);
			request.getRequestDispatcher("index.jsp")
.forward(request, response);
	}
}
```

在`request`作用域内增加了`“test”`和`“nullVar”`两个变量，并且`“nullVar”`的值是`null`。然后再在**index.jsp**中获取，如下，


**index.jsp**

```
<body>
    …
	 <%-- Empty操作符 --%>
	 		之前不存在temp变量：${empty temp }<br/>
	 		变量nullVar的值为null：${empty nullVar }<br/>
	 		变量test已被赋值：${empty test }<br/>
	 		
</body>
```

运行结果：

![](http://i.imgur.com/ZVuNlTy.png)

*图9-04*

可以发现，之前不存在的变量`“temp”`和值为`null`的变量`“nullVar”`，用`empty`操作符运算出的结果为true，而之前存在值的变量`“test”`用`empty`运算的结果为false。

## 9.1.3 EL表达式隐式对象 ##

“隐式对象”又称“内置对象”。我们之前在JSP里曾提到过，像`request`、`session`、`application`等都是JSP的隐式对象，这些“隐式对象”可以不用实例化就直接使用。同样的，在EL表达式中也存在一些隐式对象。按照使用的途径不同，EL隐式对象分为了作用域访问对象、参数访问对象和JSP隐式对象，如图，

![](http://i.imgur.com/yih07uS.png)

*图9-05*


#### (1)四个作用域访问对象 ####

`${requestScope.student.studentNo }`中的`requestScope`表示`request`作用域。即在使用EL表达式来获取一个变量的同时，可以指定该变量的作用域。EL表达式为我们提供了四个可选的作用域对象，如下表，

<table>
   <tr>
      <td>对象名</td>
      <td>作用域</td>
   </tr>
   <tr>
      <td>pageScope</td>
      <td>把pageContext作用域中的数据映射为一个Map类的对象</td>
   </tr>
   <tr>
      <td>requestScope</td>
      <td>把request作用域中的数据映射为一个Map类的对象  </td>
   </tr>
   <tr>
      <td>sessionScope</td>
      <td>把session作用域中的数据映射为一个Map类的对象</td>
   </tr>
   <tr>
      <td>applicationScope</td>
      <td>把application作用域中的数据映射为一个Map类的对象</td>
   </tr>
</table>

pageScope, requestScope, sessionScope和appliationScope都可以看作是Map型变量，要获取其中的数据就可以使用点操作符或中括号操作符。如${requestScope.student}可以获取request作用域中的student属性值，${sessionScope["user"]}可以获取session作用域中的user属性值。另外，如果不指定作用域，EL表达式就会依次从pageContextrequestsessionapplication的范围内寻找。例如，EL表达式在解析${student}时，就会先在pageContext作用域中查找是否有student属性，如果有则直接获取，如果没有则再会去request作用域中查找是否有student属性……

#### (2)参数访问对象 ####

在JSP中，可以使用`request.getParameter()`和`request.getParameterValues()`来获取表单中的值（或地址栏、超链接中附带的值）。对应的，EL表达式可以通过`param`、`paramValues`来获取这些值。

<table>
   <tr>
      <td>对象名</td>
      <td>示例</td>
      <td>作用</td>
   </tr>
   <tr>
      <td>param</td>
      <td>${param.usename}</td>
      <td>等价于request.getParameter("username")</td>
   </tr>
   <tr>
      <td>paramValues</td>
      <td>${param.hobbies}</td>
      <td>等价于request. getParameterValues ("hobbies")</td>
   </tr>
</table>

#### (3)JSP隐式对象 ####

`pageContext`是JSP的一个隐式对象，同时也是EL表达式的隐式对象。因此，`pageContext`是EL表达式与JSP之间的一个桥梁。

在EL表达式中，可以通过`pageContext`来获取JSP的内置对象和`ServletContext`对象，如下表：

<table>
   <tr>
      <td>El表达式</td>
      <td>获取的对象</td>
   </tr>
   <tr>
      <td>${pageContext.page}</td>
      <td>获取page对象</td>
   </tr>
   <tr>
      <td>${pageContext.request}</td>
      <td>获取request对象</td>
   </tr>
   <tr>
      <td>${pageContext.response}</td>
      <td>获取response对象</td>
   </tr>
   <tr>
      <td>${pageContext.session}</td>
      <td>获取session对象</td>
   </tr>
   <tr>
      <td>${pageContext.out}</td>
      <td>获取out对象</td>
   </tr>
   <tr>
      <td>${pageContext.exception}</td>
      <td>获取exception对象</td>
   </tr>
   <tr>
      <td>${pageContext.servletContext}</td>
      <td>获取servletContext对象</td>
   </tr>
</table>

还可以获取这些对象的`getXxx()`方法：例如，`${pageContext.request.serverPort}`就表示访问`request`对象的`getServerPort()`方法。可以发现，在使用时EL去掉了方法中的get和“()”，并将首字母改为了小写。

**小结：**

语法： ${EL表达式}

其中${ }中的“EL表达式”可以是四个作用域访问对象、参数访问对象或JSP隐式对象`pageContext`三者之一。并且EL表达式可以像HTML一样直接写在JSP页面中，而不用被“<%... %>”括起来。



# 9.2 JSTL标签及核心标签库 #

JSTL（JSP Standard Tag Library，JSP标准标签库），是一个不断完善的开源JSP标签库，包含了开发JSP时经常用到的一组标准标签。使用JSTL，可以像EL表达式那样不用编写JAVA代码就能开发出复杂的JSP页面。JSTL一般要结合EL表达式一起使用。

## 9.2.1 JSTL使用前准备 ##

使用JSTL标签库以前，必须先在Web项目的lib目录中加入两个jar包：jstl.jar和standard.jar，然后再在需要使用JSTL的JSP页面，加入支持JSTL的taglib指令，如下，

`<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>`

其中prefix="c"表示在当前页面中，JSTL标签库是通过标签<c: >使用的。

## 9.2.2 JSTL核心标签库 ##

JSTL核心标签库主要包含三类：通用标签库、条件标签库和迭代标签库，如图，



![](http://i.imgur.com/z8n12pM.jpg)

*图9-06*


#### (1)通用标签库 ####

通用标签库包含了3个标签：赋值标签`<c:set>`、显示标签`<c:out>`、删除标签`<c:remove>`

**①赋值标签&lt;c:set&gt;**

`<c:set>`标签的作用，是给变量在某个作用域内赋值，有两个版本：`“var”`版和`“target”`版。

**<1>var版**

用于给`page`、`request`、`session`或`application`作用域内的变量赋值

**语法：**

`<c:set var="elementVar" value=" elementValue"  scope="scope" />`

`var`：需要赋值的变量名

`value`：被赋予的变量值

`scope`：此变量的作用域，有4个可填项，即`page`，`request`，`session`和`application`。

示例：

`<c:set var="addError" value="error" scope="request"/>`

表示在`request`作用域内，设置一个addError变量，并将变量值赋值为`“error”`，等价于

`request.setAttribute("addError", "error");`


**<2> target版**

用于给`JavaBean`对象的属性或`Map`对象赋值。

**a.给`JavaBean`对象的属性赋值**

**语法：**

```
<c:set target="objectName"  property="propertyName" 
value="propertyValue"  scope="scope"/>
```

**`target`**：需要操作的`JavaBean`对象，通常使用EL表达式来表示。

**`property`**：对象的属性名。

**`value`**：对象的属性值。

**`scope`**：此属性值的作用域，有4个可填项，即`page`，`request`，`session`和`application`。

示例：
先通过Servlet给`JavaBean`对象的属性赋值，

**InitJSTLDataServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class InitJSTLDataServlet extends HttpServlet
{
	…
	protected void doPost(HttpServletRequest request,
                               HttpServletResponse response) 
throws ServletException, IOException
	{
//将一个Address对象赋值后，加入request作用域，并请求转发到Jsp
		Address address = new Address();
		address.setHomeAddress("北京朝阳区");
		address.setSchoolAddress("北京大兴区大族企业广域网#6F2");
		request.setAttribute("address", address);
		request.getRequestDispatcher("JSTLDemo.jsp")
.forward(request, response);
	}
}
```

**JSTLDemo.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
…
<body>
		使用JSTL赋值之前：${requestScope.address.schoolAddress }
		<br/>
		<c:set target="${requestScope.address }" 
property="schoolAddress" value="广东东莞蓝桥基地" />
		<br/>
		使用JSTL赋值之后：${requestScope.address.schoolAddress }
</body>	
```

运行InitJSTLDataServlet，结果如图，

![](http://i.imgur.com/6snhwmv.png)

*图9-07*

**b.给`Map`对象赋值**

**语法：**

```
<c:set target="mapName"  property="mapKey" 
value="mapValue"  scope="scope"/>
```

**`target`**：需要操作的`Map`对象，通常使用EL表达式来表示。

**`property`**：表示`Map`对象的`key`。

**`value`**：表示`Map`对象的`value`。

**`scope`**：此`Map`对象的作用域，有4个可填项，即`page`，`request`，`session`和`application`。

示例：
先通过Servlet给`Map`对象的属性赋值，如下


**InitJSTLDataServlet.java**


```
package org.lanqiao.servlet;
//省略import
public class InitJSTLDataServlet extends HttpServlet
{
…
	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		…
		//将一个Map对象赋值后，加入request作用域，并请求转发到JSTLDemo.jsp
		Map<String,String> countries = new HashMap<String,String>();
		countries.put("cn", "中国");
		countries.put("us", "美国");
		request.setAttribute("countries", countries);
		request.getRequestDispatcher("JSTLDemo.jsp")
.forward(request, response);
	}
}
```

再使用`<c:set…/>`对`Map`对象的属性赋值，如下，

**JSTLDemo.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
…
<body>
		使用JSTL赋值之前：${requestScope.countries.cn }、
${requestScope.countries.us }
		<br/>
		<c:set target="${requestScope.countries }" property="cn" 
value="中国人民共和国" />
		<br/>
		使用JSTL赋值之后：${requestScope.countries.cn }、
${requestScope.countries.us }<br/>
		<br/>
</body>
```

运行InitJSTLDataServlet，结果如图，

![](http://i.imgur.com/gPA0w4L.png)

*图9-08*

需要注意的是，`<c:set>`标签不仅能对已有变量赋值；如果需要赋值的变量并不存在， `<c:set>`也会自动产生该对象，如下，

**index.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<body>
        	在request作用域内，并不存在temp变量：${requestScope.temp } <br/>
		使用c:set直接给temp赋值为LanQiao
		<c:set var="temp" value="LanQiao" scope="request"/> <br/>
		再次观察temp变量：${requestScope.temp } <br/>
</body>
```

运行结果：

![](http://i.imgur.com/2aLJabw.jpg)

*图9-09*

**②输出标签&lt;c:out&gt;**

输出标签`<c:out>`类似于JSP中的`<%= %>`，但功能更加强大。

**语法：**

`<c:out value="value" default="defaultValue" escapeXml="isEscape"/>`

**`value`**：输出显示结果，可以使用EL表达式。

**`default`**：可选项。当`value`表示的对象不存在或为空时，默认的输出值。

**`escapeXml`**：可选项，值为true或false。为true时（默认情况），将`value`中的值以字符串的形式原封不动的显示出来；为false时，会将内容以HTML渲染后的结果显示。

**示例：**


先在`InitJSTLDataServlet`中创建`address`对象，然后给`address`中的schoolAddress属性赋值，再把`address`对象放入`request`作用域，之后请求转发到index.jsp，如下，


**InitJSTLDataServlet.java**

```
…
protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		Address address = new Address();
		address.setSchoolAddress("北京大兴区大族企业广域网#6F2");
		request.setAttribute("address", address);
		request.getRequestDispatcher("JSTLDemo.jsp")
.forward(request, response);
	}
…
```

**index.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
…
<body>
    request作用域中，存放了address对象及schoolAddress属性值：
<c:out value="${requestScope.address.schoolAddress}" /> 
<br/>
	request作用域中，不存在student对象：
<c:out value="${requestScope.student}"  
default="student对象为空"/>
 <br/>
	当escapeXml="true"时：
<c:out value="<a href='https://www.baidu.com/'>百度主页</a>"  
escapeXml="true"/><br/>
	 当escapeXml="false"时：
<c:out value="<a href='https://www.baidu.com/'>百度主页</a>"  
escapeXml="false"/>
</body>
```

执行`InitJSTLDataServlet`，运行结果：

![](http://i.imgur.com/mPXuOLn.png)

*图9-10*

从结果可以发现，当`value`中输出的对象不存在或为空，会输出`default`指定的默认值；当`escapeXml`为false时，会将`value`中的内容先渲染成HTML样式再输出显示。

**③移除标签&lt;c:remove&gt;**

`<c:set>`标签的作用，是给变量在某个作用域内赋值。与之相反，`<c:remove>`标签的作用，是移除某个作用域内的变量。

**语法：**

`<c:remove var="variableName" scope="scope"/>`

**`var`**：等待被移除的变量名

**`scope`**：变量被移除的作用域，有4个可填项：`page`，`request`，`session`和`application`。

示例：

**index.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
…
<body>	
         …		
		并不存在的一个变量varDemo: 
<c:out value="${varDemo }"  default="不存在"/><br/>
		在request作用域内，给varDemo赋值 为LanQiao
<c:set var="varDemo" value="LanQiao" scope="request"/><br/>
		再次观察varDemo:
 <c:out value="${varDemo }"  default="不存在"/><br/>
		在request作用域内，将varDemo移除：
<c:remove var="varDemo" scope="request"/> <br/>
		再次观察varDemo:
 <c:out value="${varDemo }"  default="不存在"/><br/></body>
```

运行结果：

![](http://i.imgur.com/UdAkb4F.png)

*图9-11*


#### (2)条件标签库 ####

JSTL的条件标签库，包含单重选择标签`<c:if>`和多重选择标签`<c:choose>`、`<c:when>`、 `<c:otherwise>`。

**①单重选择标签&lt;c:if&gt;**

类似于Java中的`if`选择语句。


**语法：**

```
	<c:if test="condition"  var="variableName" scope="scope">
		代码块
	</c:if>
```

`test`：判断条件，值为`true`或`false`，通常用EL表达式表示。当值为`true`时才会执行代码块中的内容。

`var`：可选项。保存`test`的判断结果（true或false）。

`scope`：可选项。设置此变量的作用域，有4个可填项：`page`，`request`，`session`和`application`。

示例：

**JSTLDemo02.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
…
<body>
     …
	<c:if test="${3>2 }"  var="result" scope="request">
		 3>2结果是：${result }
	</c:if>
</body>
```

运行结果：

![](http://i.imgur.com/IuZWwWC.png)

*图9-12*

**②多重选择标签**`<c:choose>`

&lt;c:choose&gt;的功能类似于Java中的多重if。

**语法：**

```
	<c:choose>
		<c:when test="">
				代码块1
		</c:when>
		<c:when test="">
				代码块2
		</c:when>
		...
		<c:otherwise>
				代码块n
		</c:otherwise>
	</c:choose>
```

其中，`<c:when test="">`类似于Java中的判断语句：`if()`和`else if()`；`<c:otherwise>`类似于多重if中最后的else。具体的流程是：当`<c:when>`中的test为true时，执行当前`<c:when>`标签中的代码块；如果所有when中的test都为false，则才会执行`<c:otherwise>`中的代码块。

示例：


**JSTLDemo02.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
…
<body>
    …
	<c:set var="role" value="学生" />
	<c:choose>
		<c:when test="${role eq '老师' }">
				老师相关代码
		</c:when>
		
		<c:when test="${role eq '学生' }">
				学生相关代码
		</c:when>
		<c:otherwise>
				管理员相关代码
		</c:otherwise>
	</c:choose>
</body>
```

运行结果：

![](http://i.imgur.com/Ao2uIyj.png)

*图9-13*

#### (3)迭代`<c:forEach>`标签库 ####

在Java之中有两种`for`循环，一种是传统的`for`循环，形式如`for(int i=0;i<10;i++)`；另一种是增强的`for`循环，形式如`for(String name : names)` ，此处的`names`是字符串数组。类似的，在JSTL中也提供了两种`<c:forEach>`标签与之相对应，一种用于遍历集合对象的成员，另一种用于让代码重复的循环执行。

**①遍历集合对象的成员**

**语法：**

```
<c:forEach var="variableName" items="collectionName" 
varStatus="variableStatusInfo" begin="beginIndex" 
end="endIndex" step="step">
			迭代集合对象的相关代码
</c:forEach>
```

**`var`**：当前对象的引用，即表示循环正在遍历的那个对象。例如，当循环遍历到第一个成员时，`var` 就代表第一个成员；当循环遍历到第二个成员时，`var` 就代表第二个成员……

**`items`**：当前循环的集合名。

**`varStatus`**：可选项。存放`var`所引用成员的相关信息，如索引号(index)等。

**`begin`**：可选项。遍历集合的开始位置，从0开始。

**`end`**：可选项。遍历集合的结束位置。

**`step`**：可选项，默认为1。遍历集合的步长，比如当`step`为1时，会依次遍历第0个、第1个、第2个……；当`step`为2时，会依次遍历第0个、第2个、第4个……。

示例：
先通过Servlet给集合中加入数据，再用`<c:forEach>`遍历输出。

**InitJSTLForeachDataServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class InitJSTLForeachDataServlet extends HttpServlet {
	…
	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException {
		//Address类包含家庭地址和学校地址两个属性
		Address add1 =new Address("北京朝阳区","北京大兴区");
		Address add2 =new Address("陕西西安","广州东莞");
		List<Address> addresses = new ArrayList<Address>();
		addresses.add(add1);
		addresses.add(add2);
		//强addresses集合放入request作用域内
		request.setAttribute("addresses", addresses);
		request.getRequestDispatcher("JSTLDemo02.jsp")
.forward(request, response);
	}
}
```

**JSTLDemo02.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<body>
	…
		<c:forEach var="add" items="${addresses }" varStatus="status" >
				${status.index}：
家庭地址：${add.homeAddress } – 
学校地址：${add.schoolAddress }<br/>
		</c:forEach>
</body>
```

执行http://localhost:8888/ELAndJSTLDemo/InitJSTLForeachDataServlet，运行结果：

![](http://i.imgur.com/FRiASwM.png)

*图9-14*

**②迭代指定的次数**

**语法：**

```
<c:forEach var="variableName" varStatus="variableStatusInfo" 
begin="beginIndex" end="endIndex" step="step">  
		循环体  
</c:forEach>	
```

其中`var`、`varStatus`、`begin`、`end`、`step`属性的含义，与“遍历集合对象的成员”中对应的属性含义相同，并且能发现此种方式的`<c:forEach>`缺少了`“items”`属性。此种方式的`<c:forEach>`主要用来让循环体执行固定的次数。

**示例：**

**JSTLDemo02.jsp**

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<body>
	…
		<c:forEach  begin="0" end="2"  step="1">
		          LanQiao<br>
		</c:forEach>
</body>
```

以上代码中的`<c:forEach>`类似于Java中的`for(int i=0;i<2;i++)`，运行结果：

![](http://i.imgur.com/mjERMhX.png)

*图9-15*

至此我们就学完了EL表达式和JSTL标签库的相关内容，读者可以使用它们来替换以前JSP页面中的Scriptlet。

# 9.3 练习题 #

**一、选择题**

1.下面（    ）不是与范围有关的EL隐式对象。（选择一项）（难度★）

A．`cookieScope`		
		
B．`pageScope`

C．`sessionScope	`	
			
D．`applicationScope`


2.如果`session`中已经有属性名为`user`的对象，则EL表达式`${not empty sessionScope.user}`的值为（    ）。（选择一项）（难度★）

A．true							

B．false

C．null							

D．user

**二、简答题**

1.在使用EL表达式时，如果不显式指定对象的作用域范围，则系统会按照什么顺序依次查找？（难度★）

2.使用JSTL标签`<c: ... >`之前，需要进行哪些准备工作？（难度★）

3.请问`<c:set>`标签有哪几种？各如何使用？（难度★★）

4.请介绍JSTL中的for Each迭代标签有哪些属性，并简要描述各属性的含义。（难度★★★）

5.使用EL和JSTL继续优化第七章练习题中的“部门管理系统”。（难度★★★）