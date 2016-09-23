---

layout: post

title: JSP基础语法

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍Java Bean组件。使用Java Bean组件进行开发，可以避免从零开始编写所有代码，提高开发效率。

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

> 本章简介

Java Bean是一种JAVA语言写成的可重用组件，从而使开发者在IDE工具中可以很方便的使用该组件。在开发过程中，如果能发现一些已存在的Java Bean组件，我们就可以直接使用该Java Bean组件进行开发，从而避免从零开始编写所有代码，提高开发效率。对于Java开发人员来说，不仅要会使用Java API，还要掌握Java Bean这种组件的使用。

Java Bean组件实际上就是一个遵循以下规范的Java类：

1. 必须是`public`修饰的公有类，并提供`public`修饰的无参构造方法；

2. Java Bean中的属性，必须都是`private`类型的私有属性，并且有相应`public`修饰的`gettter`、`setter`方法。特殊情况：如果属性是`boolean`类型，那么取值的方法既可以是`getter`、也可以是`isXxx()`。例如，以下两个方法都可以作为属性`private boolean sex;`的取值方法：

```
//isXxx()方式取值
public boolean isSex()
{
	return sex;
}
//getter方式取值
public boolean getSex()
{
	return sex;
}
```

凡是满足以上两点的JAVA类，我们都可以称之为Java Bean组件。

在程序中，开发人员需要处理的无非是数据和业务逻辑，而这两种操作都可以封装成Java Bean组件。因此，Java Bean从功能上可以划分为以下两类：

①封装数据②封装业务逻辑。

# 4.1使用Java Bean封装数据

通常情况，一个封装数据的JavaBean（也可以称为“实体类”），对应着数据库内的一张表（或视图），并且与该表（或视图）中的字段一一对应。

例如，在registerJDBC.jsp中，涉及一张登录表(login)，该表中有两个字段：用户名(name)和密码(password)。下面，创建一个与该登录表相对应的封装数据的JavaBean（用于封装用户名、密码）：

在项目的src目录下新建一个`LoginInfo`类，如图，

![](http://i.imgur.com/7O3Y3jm.png)

*图4-01*

代码如下：

```
package org.lanqiao.entity;

public class LoginInfo
{
	//对应于Login数据表中的name字段
	private String name;
	//对应于Login数据表中的password字段
	private String password ;
    //无参构造
	public LoginInfo (){	}
    //getter方法
	public String getName()
	{
		return name;
	}
    //setter方法
	public void setName(String name)
	{
		this.name = name;
	}
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
}
```

封装数据的Java Bean创建好了以后，就可以在其他Java类或JSP页面中直接使用。如下是在JSP页面中使用封装数据的Java Bean：

```
<!-- 引入Java Bean -->
%@page import="org.lanqiao.entity.LoginInfo"%
<!—使用Java Bean -->
<%
	LoginInfo login = new LoginInfo();
	login.setName("张三");
	login.setPassword("abc");
	...
	String name = login.getName();
	..
%>
```

可以发现，封装数据的Java Bean可以将许多零散的数据封装到一个对象之中。例如，可以将`name`、`Password`等属性数据封装到一个`login`对象之中。这样做非常利于数据在项目中的传递。

# 4.2使用Java Bean封装业务

一个封装数据的JavaBean，对应着数据库内的一张表（或视图）；而一个封装业务的JavaBean，通常用来对封装数据的JavaBean进行控制操作，或相关的业务逻辑操作。例如，下面就来创建一个封装业务的JavaBean（LoginControl.java），用来对之前封装数据的JavaBean（LoginInfo.java）进行控制操作：

LoginControl.java

```
package org.lanqiao.control;
…
public class LoginControl
{
	// 将用户信息（用户名，密码）写入数据库
	public void addLoginInfo(LoginInfo loginInfo)
	{
		Connection con = null;
		Statement stmt = null;

		try
		{
			Class.forName("oracle.jdbc.OracleDriver"); // 加载数据库驱动
			// 创建连接
			con = DriverManager.
getConnection("jdbc:oracle:thin:@127.0.0.1:1521:XE"
, "system", "sa");
			// 创建Statement对象
			stmt = con.createStatement();
			String loginSql = "insert into login(name,password)
                               values('" + loginInfo.getName() + "','" 
+ loginInfo.getPassword() + "')";
			stmt.executeUpdate(loginSql);
			// 暂时使用控制台进行输出
			System.out.println("<h1>注册成功！</h1>");
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

接下来，我们再编写注册功能时，就可以通过JavaBean来简化JSP页面：
注册页jspJDBC/registerWithJavaBean.jsp

实现用户名(uname)和密码(upwd)的表单录入，代码及运行图省略（页面中`<form action="registerJDBCWithJavaBean.jsp" …>`）。

将注册信息写入数据库的功能页jspJDBC/registerJDBCWithJavaBean.jsp

```
<body>
	<%
		//接收用户输入的注册信息
		request.setCharacterEncoding("UTF-8");
		String name = request.getParameter("uname");
		String password = request.getParameter("upwd");
		
		//LoginInfo是之前编写的一个封装数据的JavaBean，用于将用户名和密码封装起来		LoginInfo loginInfo = new LoginInfo();
		loginInfo.setName(name);
		loginInfo.setPassword(password);
		
		//调用封装业务的JavaBean，将注册信息写入数据库
		LoginControl loginControl = new LoginControl();
        //使用封装业务的JavaBean（LoginControl.java）操作封装数据的JavaBean(LoginInfo.java)
		loginControl.addLoginInfo(loginInfo);
	%> 
</body>
```

上面registerJDBCWithJavaBean.jsp中的代码，可以实现与registerJDBC.jsp相同的功能。不难发现，使用了JavaBean之后，可以大大简化JSP页面的代码量，并且能将某个特定的模型（数据模型或业务模型）封装到一个JAVA类中，从而提高代码的重用性。

# 4.3练习题

1.JavaBean有几种类型，各有什么作用？（难度★★）

2.将第三章练习题的第3小题“部门管理系统”用JavaBean进行优化。（难度★★★）

