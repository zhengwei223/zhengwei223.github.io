---

layout: post

title: EL和JSTL

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍EL和JSTL。EL表达式和JSTL标签库不仅能替换到JSP中的JAVA代码，而且还能使代码更加简洁。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

> 本章简介

通过之前学习的三层架构，我们已经可以将表示层、业务逻辑层和数据访问层相互分离，从而实现程序的解耦合，以及提高系统的可维护性和可扩展性等。但在之前的代码中，表示层JSP的代码里仍然嵌套了很多JAVA代码，从而造成了表示层一定程度的混乱。

能否彻底的从表示层中消除JAVA代码呢？可以使用 EL表达式和JSTL标签库。EL表达式和JSTL标签库不仅能替换到JSP中的JAVA代码，而且还能使代码更加简洁。

本章演示的项目名为ELAndJSTLDemo，因为本章只是在讲三层中的表示层，因此为了使读者清晰的掌握EL及JSTL，本章项目并没有采用标准的三层架构，而是以一个个简单的JSP示例来诠释。

# 8.1 EL表达式 #

EL的全称是Expression Language，可以用来替代JSP页面中的JAVA代码，从而能让即使不懂JAVA的开发人员也能写出JSP代码。EL还可以实现自动转换类型，使用起来非常简单。

## 8.1.1 EL表达式语法 ##

**语法：**

${EL表达式}

EL表达式通常由两部分组成：对象和属性。可以使用“点操作符”或“中括号[]操作符”来操作对象的属性。

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

InitServlet.java

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

index.jsp

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

*图8-01*

可以发现，程序的确能够正常的显示。但如果将index.jsp中的代码用EL表达式来实现，就会简单许多。如下是使用EL修改后的index.jsp，功能与之前的Scriptlet代码相同，

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

*图8-02*

综上，使用EL可以将JSP中的JAVA代码彻底消除，并且不用再做强制的类型转换，整体的JSP代码就会简单很多。

## 8.1.2 EL表达式操作符 ##

**(1)点操作符**

`${requestScope.student}`，表示在`request`作用域内查找`student`对象；`${requestScope.student.studentNo }`，表示在`request`作用域内查找`student`对象的`studentNo`属性。点操作符“.”的用法和在JAVA中的用法相同，都是直接用来调用对象的属性。此外，通过`${requestScope.student.address.homeAddress }`可以发现，EL表达式能够级联获取对象的属性，即先在`request`作用域内找到`student`对象后，可以再次使用点操作符“.”来获取`student`内部的`address`对象……

**(2)中括号[]操作符**

除了点操作符以外，还可以使用中括号操作符“[]”来访问某个对象的属性，例如`${requestScope.student.studentNo }`可以等价写成`${requestScope.student["studentNo"] }`或`${requestScope["student"]["studentNo"]` }。除此之外，中括号[]操作符还有一些其他独有功能：

<1>如果属性名称中包含一些特殊字符，如“.”、“?”、“-”等，就必须使用中括号操作符，而不能用点操作符。例如，如果在之前的InitServlet中写了`request.setAttribute("school-name", "LanQiao")`;那么在index.jsp中就不能用`${requestScope. school-name }`，而必须改为`${requestScope ["school-name "]` }。

