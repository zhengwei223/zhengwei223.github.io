---

layout: post

title: JSP基础语法

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章将系统介绍JSP页面元素以及内置对象

author: 颜群

keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---



>本章简介

本章将系统介绍JSP页面元素以及内置对象，其中重点介绍了`out`、request、
response、session等常用内置对象以及Cookie等使用，并且从使用原理上讲
解了pageContext、request、session、application等四种范围对象的作用域。

回顾第一个jsp程序，如下，

index.jsp

```
<html>
	<head>
		<title>First Web Project</title>
	</head>
	<body>
		<%
			out.print("Hello World");
		%>
	</body>
</html>
```

其中 <%  out.print("Hello World”);  %>称为脚本。可以发现，在JSP文件中，既有HTML标签，又有JAVA代码，因此我们可以把JSP称为“嵌入在HTML中的JAVA代码”。

但是在Eclipse中生成的Jsp内容，如下

```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>
```

Eclipse生成的JSP文件中，除了典型的html元素外，还有很多其他内容。这是因为JSP页面本身就可以包含多种页面元素，如脚本、HTML、指令、注释等。

# 2.1 JSP页面元素

## 2.1.1　脚本Scriptlet

所有嵌入在HTML中的JAVA代码都必须使用scriptlet包裹起来。在JSP中共有3种Scriptlet：<% 代码 %>，<% ! 代码%>和<% =代码%>。

Scriptlet一般写在<body>标签中。

①第一种Scriptlet<%代码%>

<% %>主要用来定义局部变量、编写java语句，如下代码所示：

jspDemo1.jsp

```
<%
			String bookName ="蓝桥软件学院 JAVA EE核心技术实践";
			String author = "颜群" ;
			out.print("书名:"+bookName+"<br/>作者:"+author);
	   %>
```

运行结果：

![](http://i.imgur.com/V7cwAgR.jpg)

*图2.1*

其中，out.print();是JSP页面的输出语句。

②第二种Scriptlet<%!代码%>

<% !  %>主要用来定义全局变量、方法如下代码所示：

jspDemo2.jsp

```
<%!
     	public String bookName ;
         public String author ;
         public void initInfo()
         {
          	bookName ="蓝桥软件学院 JAVA EE核心技术实践";
			author = "颜群" ;
         }
     %>
	  <%
	  		initInfo();
			out.print("书名:"+bookName+"<br/>作者:"+author);
	  %>
```

运行结果：
与jspDemo1.jsp相同。


③第三种Scriptlet<%=代码%>

<%= %> 用来输出=后面的表达式的值，功能类似out.print()，如下代码所示：

jspDemo3.jsp

```
<%
		String bookName ="蓝桥软件学院 JAVA EE核心技术实践";
		String author = "颜群" ;
	  %>
	  
   <%="书名:"+bookName+"<br/>作者:"+author%>
   <!--等价于out.print("书名:"+bookName+"<br/>作者:"+author); -->
```

运行结果：
与jspDemo1.jsp相同。

从上面代码，可以发现，out.print()和<%= >不仅能输出变量，还可解析”<　br　/>”等html代码。需要注意，<%= >中没有“;”。

## 2.1.2　指令

JSP指令写在<%@  %>中，如下代码所示：

```
<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
```

以上代码称之为page指令，page指令可以用来设置当前JSP文件的一些属性，常见属性如下表：

<table>
   <tr>
      <td>属性</td>
      <td>说明</td>
   </tr>
   <tr>
      <td>language</td>
      <td>指定JSP页面使用的脚本语言，默认是java，一般不用修改。</td>
   </tr>
   <tr>
      <td>import</td>
      <td>与java中import的用法一致，可以执行导包操作</td>
   </tr>
   <tr>
      <td>pageEncoding</td>
      <td>指定JSP文件本身的编码方式</td>
   </tr>
   <tr>
      <td>contentType</td>
      <td>指定服务器发送给客户端时的内容编码，通常与pageEncoding保持一致</td>
   </tr>
</table>

jspDemo4.jsp

```
<%@ page language="java" import="java.util.Date" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<html>
	    <head>
		   <title>Insert title here</title>
	</head>
  <body>
	  <%
			Date date = new Date();
	  		out.print(date);
	  %>
  </body>
</html>
```

以上代码，通过import导入了java.util.Date，并指定了编码方式为UTF-8。

运行结果：

![](http://i.imgur.com/59YEcef.jpg)

*图2.2*

除了page指令以外，还有一些其他的JSP指令，读者可以查阅[http://www.runoob.com/jsp/jsp-directives.html](http://www.runoob.com/jsp/jsp-directives.html)进行学习。

## 2.1.3　注释

前面讲过，基本的JSP包含了HTML和JAVA两种代码。因此，JSP的注释既包括HTML的注释，又包含了JAVA的注释，并且拥有JSP自己独有的注释，即JSP共包含了三种注释，如下表所示：

<table>
   <tr>
      <td>注释方式</td>
      <td>说明</td>
   </tr>
   <tr>
      <td><!--   --></td>
      <td>HTML注释。可以用来注释HTML代码，但要注意此种注释能通过客户端（浏览器）查看到，因为是不安全的。</td>
   </tr>
   <tr>
      <td><%--   --%></td>
      <td>JSP注释。如果想让HTML的注释不被浏览器所查看到，就可以使用JSP注释。</td>
   </tr>
   <tr>
      <td><%   //单行注释  %><%   /*多行注释 */   %>  </td>
      <td>JAVA注释。<%  %>中放置的是JAVA代码，所以可以在<%  %>使用//和/*..*/来对其中的JAVA代码进行注释。</td>
   </tr>
</table>

jspDemo5.jsp

```
…
<html>
	<head>
		    <title>Insert title here</title>
	     </head>
  <body>
  	<!-- html注释 -->
  	<%-- jsp注释 --%>
	    <%
			//java单行注释
			/*
			   java多行注释
			*/
	     %>
  </body>
</html>
```

运行结果：

![](http://i.imgur.com/tfqL1GM.jpg)

*图2.3*

鼠标右键网页空白处，查看源代码，如图2.4

![](http://i.imgur.com/DA04a7r.png)

*图2.4*

显示内容如图2.5

![](http://i.imgur.com/jjS2Hdl.jpg)

*图2.5*

可以发现HTML的注释能被浏览器所查看到，而JSP注释和JAVA注释不能被查看。

# 2.2内置对象

```
<%
out.print("Hello World");
%>
```

在上面的代码中，像out这样，没有定义和实例化（new）就可以直接使用的对象，就称为内置对象。除了out以外，JSP还提供了其他的一些内置对象，共有9个，如下表

<table>
   <tr>
      <td>内置对象</td>
      <td>类型</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>1.pageContext</td>
      <td>javax.servlet.jsp.PageContext</td>
      <td>JSP页面容器</td>
   </tr>
   <tr>
      <td>2.request</td>
      <td>javax.servlet.http.HttpServletRequest</td>
      <td>用户的请求信息</td>
   </tr>
   <tr>
      <td>3.response</td>
      <td>javax.servlet.http.HttpServletResponse</td>
      <td>服务器端向客户端的响应信息</td>
   </tr>
   <tr>
      <td>4.session</td>
      <td>javax.servlet.http.HttpSession</td>
      <td>客户端与服务器端的一次会话</td>
   </tr>
   <tr>
      <td>5.application</td>
      <td>javax.servlet.ServletContext</td>
      <td>可存放全局变量，实现用户间数据的共享</td>
   </tr>
   <tr>
      <td>6.config</td>
      <td>javax.servlet.ServletConfig</td>
      <td>服务器配置信息，可以取得初始化参数</td>
   </tr>
   <tr>
      <td>7.out</td>
      <td>javax.servlet.jsp.JspWriter</td>
      <td>向客户端输出内容</td>
   </tr>
   <tr>
      <td>8.page</td>
      <td>java.lang.Object</td>
      <td>当前JSP页面本身，有点像类中的this</td>
   </tr>
   <tr>
      <td>9.exception</td>
      <td>java.lang.Throwable</td>
      <td>当一个页面在运行过程中发生了异常，就产生这个对象</td>
   </tr>
</table>

我们本章会先讲解out、request、response、session、application等五个常用的内置对象及cookie的使用方法，然后再讲pageContext、request、session、application等四种对象的作用域。

## 2.2.1常用内置对象及cookie

### 1.JSP内置对象out

out用于向客户端输出数据，最常用的是out.print();需要注意的是，out.println()或者out.print(“\n”)均不能实现在客户端的换行功能，如以下代码

jspDemo6.jsp

```
  <%
	  	         out.println("hello");
	          	 out.print("world\n");
	         	 out.print("hello world");
%>
```

运行结果：

![](http://i.imgur.com/pck2qBm.jpg)

*图2.6*

若要实现换行，必须借助于HTML的 <br/ >标签，

jspDemo7.jsp

```
 <%
	      	out.print("hello<br/>");
	      	out.print("world");
  %>
```

运行结果：

![](http://i.imgur.com/Rr8nnkJ.jpg)

*图2.7*

### 2.JSP内置对象request

(1) request简介

request对象主要用来接收客户端发来的请求信息，如图2.8，

![](http://i.imgur.com/79kI5w2.png)

*图2.8*

因此我们可以通过request对象来获取用户发送的相关数据，request对象的常用方法如下表：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public String getParameter(String name)</td>
      <td>获得客户端传送给服务器端的由name指定的参数值</td>
   </tr>
   <tr>
      <td>public String[] getParameterValues(String name)</td>
      <td>获得有name指定的参数的所有值</td>
   </tr>
 
   <tr>
      <td>public void setCharacterEncoding(String env) throws java.io.UnsupportedEncodingException</td>
      <td>指定请求的编码，用于解决乱码问题</td>
   </tr>
   <tr>
      <td>public RequestDispatcher getRequestDispatcher(String path)</td>
      <td>返回RequestDispatcher对象，该对象的forward方法用于转发请求</td>
   </tr>
   <tr>
      <td>public HttpSession getSession()</td>
      <td>返回和请求相关Session</td>
   </tr>
   <tr>
      <td>public ServletContext getServletContext()  </td>
      <td>得到web应用的servletContext</td>
   </tr>
</table>

下面通过一个简单的注册及显示功能，来讲解上述方法：

注册：
register.jsp

```
…
<html>
…
	<body>
		<form action="show.jsp" method="post" >
			用户名:<input type="text" name="uname" /><br/>
			密码:<input type="password" name="upwd" /><br/>
			兴趣:<br/>
			 足球<input type="checkbox" name="hobby" value="足球"/>	
			 篮球<input type="checkbox" name="hobby" value="篮球"/>	
			 羽毛球<input type="checkbox" name="hobby"  value="羽毛球"/>	         <br/>
			<input type="submit" value="注册" />	
		</form>
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/iLhjb7k.png)

*图2.9*

显示：
show.jsp

```
…
<html>
…
	<body>
		<%
			//将请求的编码与页面保持一致，设置为UTF-8
			request.setCharacterEncoding("UTF-8");
			//获取表单中name值为"uname"元素的value值
			String name = request.getParameter("uname");
			//获取表单中name值为"upwd"元素的value值
			String pwd = request.getParameter("upwd");
			//获取表单中，已选name值为"hobby"元素的value数组值
			String[] hobbies = request.getParameterValues("hobby");
		%>
		您注册的信息如下：<br/>
		用户名：<%=name %> <br/>
		密码：<%=pwd %> <br/>
		爱好：
		  <%
		     if(hobbies != null) 
		     {
		  	    for(int i=0 ; i<hobbies.length ;i++)
		      	{
		 	     	out.print(hobbies[i]+"&nbsp");
		  	    }
		     }		 
 %>
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/E4YPSmz.png)

*图2.10*

上述代码中，通过request.setCharacterEncoding("UTF-8")将请求编码设置为了UTF-8，并通过request.getParameter()和request.getParameterValues()方法获取到了从表单传来的数据。

需要注意的是，客户端的数据不一定必须从表单传递过来，也可以通过URL地址进行传递，格式如下：

页面地址?参数名1=参数内容1&参数名2=参数内容2&…

即通过“?”将页面地址和参数分离，然后按照“参数名=参数内容”的格式来传递数据，并且多个参数之间用“&”分隔。例如，上例中，我们可以不运行注册页register.jsp，而直接在浏览器中输入http://localhost:8080/JspProject/show.jsp?uname=李四&upwd=123&hobby=足球&hobby=篮球

也能正常运行程序，并得到结果，如图2.11，

![](http://i.imgur.com/CqbtmQZ.jpg)

*图2.11*

(2) Get与Post请求

我们仔细观察一下表单提交和URL地址传递两种方式的地址栏，

表单提交方式的地址栏：
http://localhost:8080/JspProject/show.jsp

URL地址传递方式的地址栏：
http://localhost:8080/JspProject/show.jsp?uname=李四&upwd=123&hobby=足球&hobby=篮球

这两种地址不同的本质原因，在于表单的的提交方式，在register.jsp中有一行代码
<form action="show.jsp" method="post" >

其中method就可以用来指定表单的提交方式，常用属性值有get和post两种。
当method=”post”时，表示以post方式请求表单，请求后的地址为http://localhost:8080/JspProject/show.jsp

如果改为method=”get”，再次提交表单，则地址栏就会显示
http://localhost:8080/JspProject/show.jsp?uname=张三&upwd=123&hobby=足球&hobby=篮球

如图2.12

![](http://i.imgur.com/4yykw9z.jpg)

*图2.12*

因此，可以发现get方式提交表单，实际就是通过URL地址传递的方式，来向服务器端传递数据。

说明：

如果 “URL地址传递”中的值是中文，而JSP页面编码是UTF-8时，则会显示乱码。原因是“URL地址传递”使用的是GET方式传递数据，而GET方式的默认编码是ISO-8859-1，与JSP页面编码UTF-8不统一导致。解决方法就是将GET方式提交的数据，进行统一字符编码，详见后文。

除了地址栏的不同以外，get和post方式在提交的数据大小上也有区别。因为get请求方式需要在地址栏上显示数据信息，所以信息的长度是有所限制的，一般大小是4-5KB；而post因为不会在地址栏显示数据信息，所以能提交更多的数据内容。如果表单中有一些大文本，或者图文、文件、视频等数据，则必须使用post的方式提交。
request的其余方法，我们会在后面详细讲述。

(3)统一字符集编码

了解完get方式和post方式的区别后，我们再来看看两种方式如何解决字符乱码问题。

解决Web项目乱码问题的基本步骤如下（以将编码统一为UTF-8为例）：

1.将所有JSP文件的编码设置为UTF-8，如下，

```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;
 charset=UTF-8">
…
```

此步骤，也可通过Eclipse来设置，详细步骤参见本书“1.3.5.使用Eclipse开发Web项目”。

(4)对于GET或POST方式，实施不同的统一编码操作。

我们首先要知道tomcat服务器，默认使用的编码方式是ISO-8859-1。

①如果是以get方式提交表单（或URL地址传递的方式），则有两种方式处理编码：

a.分别把每一个变量，都从ISO-8859-1转为UTF-8

如以下代码：

```
 //将name的编码方式，从UTF-8转为ISO-8859-1
 String name = request.getParameter("uname");
			name = new String(name.getBytes("ISO-8859-1"), "UTF-8");
            //将pwd的编码方式，从UTF-8转为ISO-8859-1
			String pwd = request.getParameter("upwd");
			pwd = new String(pwd.getBytes("ISO-8859-1"), "UTF-8");
```

b.修改tomcat配置，一次性的，将所有通过get方式传递的变量编码都设置为UTF-8（推荐）。具体修改如下：打开tomcat的conf目录，在server.xml的64行附近的<Connector>元素中，加入URIEncoding=”UTF-8”，如下，

server.xml

```
<Connector connectionTimeout="20000" port="8888" protocol="HTTP/1.1" redirectPort="8443"  URIEncoding="UTF-8" />
```

说明：

要使修改的server.xml生效，必须把Eclipse的tomat服务器设置成本地Tomcat托管模式，设置方法如下：

我们使用Eclipse配置完Tomcat后，会在左侧项目导航栏多出一个Servers项目，该项目中就有Tomcat的一些配置文件，如context.xml，server.xml等。为了使Servers项目中的配置文件，与我们本地安装的Tomcat目录中的配置文件保持一致，我们可以双击控制台Servers下的Tomcat V7.0…，如图2.13

![](http://i.imgur.com/bNe8SGM.png)

*图2.13*

在双击后打开的页面里，将Server Locations指定为第二项，如图2.14，

![](http://i.imgur.com/muClRG1.png)

*图2.14*

之后，我们只需要在Servers项目中修改配置文件，修改结果就会同步到我们本地安装的Tomcat配置文件中。因此，以后如果要对Tomcat进行操作，就只需要对Servers项目进行操作。

注意，如果发现Server Locations中的选项是灰色不可选，则需要将现有的Tomcat从Servers中删除，然后重新创建Tomcat服务后再次选择。

②如果是以post方式提交表单，则可以通过在服务器端加入request.setCharacterEncoding("UTF-8")，详见前面的show.jsp。

### 3.JSP内置对象response

(1) response简介

我们已经知道通过request，可以从客户端向服务器发送请求数据，那反过来呢? 当服务器端接收到请求的数据后，如何向客户端响应呢？答案就是response，服务器可以通过response向客户端做出响应，如图2.15，

![](http://i.imgur.com/6IqHKCA.png)

*图2.15*

response也提供了一些方法用来处理响应，如下表所示，

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void addCookie(Cookie cookie)</td>
      <td>向客户端增加Cookie</td>
   </tr>
   <tr>
      <td>public void sendRedirect(String location) throws IOException</td>
      <td>将客户端发来的请求，重新定位(跳转)到另一个URL上(习惯上称为“重定向”，会被经常用到)</td>
   </tr>
   <tr>
      <td>public void setContentType(String type)</td>
      <td>设置服务器端响应的contentType类型</td>
   </tr>
</table>

我们先来看一下重定向sendRedirect(String location)方法的使用，
这次我们实现一个登陆功能：用户输入用户名和密码，如果验证正确，则跳转到欢迎页。

登陆页：
login.jsp

```
…
<html>
…
	<body>
		<form action="check.jsp" method="post" >
			用户名:<input type="text" name="uname" /><br/>
			密码:<input type="password" name="upwd" /><br/>
			<input type="submit" value="登陆" />	
		</form>
	</body>
</html>
```

运行结果(输入用户名“张三”，密码“abc”)：

![](http://i.imgur.com/UnGVk6H.png)

*图2.16*

验证页：
check.jsp

```
…
<html>
     …
	<body>
		<%
			request.setCharacterEncoding("UTF-8");
			String name = request.getParameter("uname");
			String pwd = request.getParameter("upwd");
			//假设用户为名“张三”且密码为“abc”时，登陆验证成功
			if(name.equals("张三") && pwd.equals("abc"))
			{
             //若验证成功，则重定向到success.jsp页面
				response.sendRedirect("success.jsp");
			}
		%>
	</body>
</html>
```

若登陆成功，则跳转到成功提示页：
success.jsp

```
…
<html>
    …
	<body>
		登陆成功！<br/>
		欢迎您:<br/>
		<%
			String name = request.getParameter("uname");
			out.print(name);
		%>
	</body>
</html>
```

运行结果：

![](http://i.imgur.com/aA1Nl9y.png)

*图2.17*

从“运行结果”可以发现两点：

1.如果用户名和密码验证成功，确实跳转到了欢迎页success.jsp，但数据却丢失了，用户名name的值为null。

2.重定向到success.jsp后，地址栏也变成了success.jsp页面的地址

(2) 请求转发与重定向 

为了解决重定向以后数据丢失的问题，我们先来回忆一下request对象中的一个方法：
public RequestDispatcher getRequestDispatcher(String path)

之前说过，此方法的返回值RequestDispatcher对象，有一个forward方法可以用于转发请求，也就是说，request的getRequestDispatcher()方法和response的sendRedirect()方法有相同之处：都可以实现页面之间的跳转。

我们将check.jsp中的response.sendRedirect("success.jsp")改为request.getRequestDispatcher("success.jsp").forward(request, response),其他代码均不变，再次运行程序，可以看到success.jsp的结果如图2.18：

![](http://i.imgur.com/4CWmhhb.png)

*图2.18*

可以发现，
采用了request.getRequestDispatcher("success.jsp").forward(request, response)来跳转页面后：

1.就可以获取到客户端发送的表单数据；

2.页面内容确实跳转到了success.jsp中编写的内容，但地址栏却仍然停留在check.jsp，即采用请求转发方式，地址栏不会发生改变。

关于请求转发(request.getRequestDispatcher("xx").forward(request, response))和重定向response.sendRedirect("xx")的区别，经常会在面试中被提到，我们在此做一个总结，如下表：

<table>
   <tr>
      <td></td>
      <td>请求转发(forward)</td>
      <td>重定向(redirect)</td>
   </tr>
   <tr>
      <td>请求服务器次数</td>
      <td>1次</td>
      <td>2次</td>
   </tr>
   <tr>
      <td>是否保留第一次请求时request范围中的属性</td>
      <td>保留</td>
      <td>不保留</td>
   </tr>
   <tr>
      <td>地址栏里的请求URL，是否改变</td>
      <td>不变</td>
      <td>改变为重定向之后的新目标URL。相当于在地址栏里重新输入URL后，再按回车键</td>
   </tr>
</table>

关于“请求服务器次数”的问题，再做以下详尽分析：

请求转发：客户端（浏览器）向服务器的资源A发起一次请求①，服务器的资源A接收到该请求后，将该请求转发到内部的其他资源B②，资源B处理完请求后，最终给客户端做出响应③。如图2.19，

![](http://i.imgur.com/xgc14kv.jpg)

*图2.19*

重定向：客户端（浏览器）向服务器的资源A发起一次请求①，服务器的资源A接收到该请求后，给客户端做出响应，告诉客户端去重新访问资源B的地址 ②，客户端收到资源B的地址后再次向服务器的资源B发出第二次请求③，服务器资源B处理完该请求并做出响应④。如图2.20，

![](http://i.imgur.com/X0aYERh.png)

*图2.20*

我们可以将“请求转发”和“重定向”想象成以下情景：

请求转发：张三去银行的A窗口办理业务，A窗口的业务员发现该业务自己办不了，就将张三的业务请求转发给其他同事办理，最后将办理完的业务返回给张三。也就是说，张三只是给银行的A窗口发送了一次请求，而该业务办理人员之间的换人工作，是银行内部处理的。即张三只发出了一次请求，更换窗口业务员是银行的行为。

重定向：张三去银行的A窗口办理业务，A窗口的业务员发现该业务自己办不了，然后告诉张三应该重新去窗口B办理，张三收到该消息后，又重新向银行的窗口B再次请求办理业务，最终银行的窗口B处理完张三的请求，并将办理完的业务返回给张三。也就是说，张三分别向银行的窗口A、窗口B各发送了一次请求（共2次请求），更换窗口业务员是张三的行为。

### 4.cookie和JSP内置对象session

在学习session之前，我们有必要先来了解一下cookie。

(1)cookie 

cookie是由服务器端产生，再发送给客户端（浏览器）的，并且浏览器会将该cookie保存在某个目录下的文件里。该技术能将服务器端的一些数据，保存在用户使用的客户端计算机中，这样一来，用户下次就可以直接通过自己的计算机访问到该数据，而不必再访问服务器。因而cookie技术可以提高网页处理的效率，也能减少服务器端的负载。但是由于cookie是服务器端保存在客户端的信息，所以其安全性相对较差。

①cookie的使用

一个Cookie对象包含一个键值对，即key=value。cookie不是JSP的内置对象，需要通过JSP提供的javax.servlet.http.Cookie类来创建，并且该类的常用方法如下表：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public Cookie(String name, String value)</td>
      <td>构造方法，用来实例化Cookie对象，同时设置名称和内容</td>
   </tr>
   <tr>
      <td>public String getName()</td>
      <td>获取Cookie对象的名称</td>
   </tr>
   <tr>
      <td>public String getValue()</td>
      <td>获取Cookie对象的内容</td>
   </tr>
   <tr>
      <td>public void setMaxAge(int expiry)</td>
      <td>设置Cookie的保存时间，以秒为单位</td>
   </tr>
</table>

服务器端可以通过response对象的public void addCookie(Cookie cookie)方法，将Cookie对象设置到客户端；而客户端也可以通过request对象的public Cookie[] getCookies()方法来获取全部的Cookie对象，如下：

服务器端response_addCookie.jsp

```
	<body>	
		<%
			//创建2个Cookie对象
			Cookie c1 = new Cookie("bookName","Blue Bridge");
			Cookie c2 = new Cookie("author","YanQun");
			//通过addCookie()方法，将Cookie对象设置到客户端
			response.addCookie(c1);
			response.addCookie(c2);
			
			response.sendRedirect("temp.jsp");	
		%>
	</body>
```

客户端temp.jsp

```
	<body>
		<a href="request_getCookies.jsp">客户端再次跳转</a>	</body>
```

客户端response_addCookie.jsp

```
	<body>
		 <%
		 	//通过request对象获取全部的Cookie对象
		 	Cookie[] cookies = request.getCookies();
		 	for(int i=0 ; i<cookies.length ; i++)
		 	{
		 		//输出Cookie对象名和对象值
	out.print(cookies[i].getName()+"--"
+cookies[i].getValue()+"<br/>");
		 	}
		 %>
	</body>
```

先执行response_addCookie.jsp，并在跳转后的页面temp.jsp里点击超链接，运行结果：

![](http://i.imgur.com/LbbUpea.jpg)

*图2.21*

可以发现，temp.jsp中的超链接并没有携带任何参数，但跳转后的客户端response_addCookie.jsp页面却依然能获取到Cookie对象。这是因为，在客户端发送的请求中（超链接请求、表单请求等）包含着非常丰富的内容，除了可以携带URL参数、表单数据意外，还会传递丰富的请求头信息，如图2.22：

![](http://i.imgur.com/QCVZV8p.jpg)

*图2.22*

可以发现，请求头信息中包含着多个Cookie对象，每个Cookie对象都是以“键=值”的形式存在的，并且键为JSESSIONID的Cookie对象是由服务器自动产生的。

实际上，在客户端每一次访问服务器时，服务器为了区分各个不同的客户端，就会自动在每个客户端的Cookie里设置一个JSESSIONID，表示该客户端的唯一标示符。

前面说过，cookie是由服务器端产生，并最终保存在客户端中。以客户端Firefox浏览器为例，Cookie对象就保存在Firefox安装目录中的cookies.sqlite文件里，如图2.23，

![](http://i.imgur.com/gTtAWZp.png)

*图2.23*

Cookie的值也可以在Firefox中查看到，如图2.24，

![](http://i.imgur.com/XD8t7NX.jpg)

*图2.24*

说明：

1.图中查看“请求头”的方法，是通过firebug插件实现的。firebug的安装及使用，读者可以查阅第11章。

2.Cookie中尽量不要写入中文，否则必须进行	一些编码处理。有兴趣的读者，可以查阅一下相关资料。

下面通过Cookie来实现一个简单的“记住用户名”功能：

登录页login_cookie.jsp

```
<body>
		<%!
			String username ;
		%>
		<%
			Cookie[] cookies = request.getCookies() ;
            //判断是否存在键为"username"的Cookie,若存在则获取该Cookie的值
			for(Cookie cookie:cookies){
				if(cookie.getName().equals("username")){
					username = cookie.getValue();
				}
			}
		%>
		<form action="check_cookie.jsp" method="post" >
			用户名:<input type="text" name="uname"  
value="<%=username==null ? "":username%>"/>
<br/>
			密码:<input type="password" name="upwd" /><br/>
				<input type="submit" value="登陆" />	
		</form>
</body>
```

登录验证页check_cookie.jsp

```
<body>
	<%
		request.setCharacterEncoding("UTF-8");
		String name = request.getParameter("uname");
        //将用户名保存在键为”username”的Cookie对象中
		Cookie cookie = new Cookie("username",name);
		response.addCookie(cookie);
		//登录验证...
	%>
</body>
```

运行结果：

第一次访问登录页login_cookie.jsp：

![](http://i.imgur.com/ZOpiHMb.jpg)

*图2.25*

	
输入用户名“zhangsan”并点击登录，之后如果再次访问登录页login_cookie.jsp，就会看到页面已经保存了用户名，如图2.26：

![](http://i.imgur.com/8AzyPzT.png)

*图2.26*

②cookie的有效期

需要注意的是，Cookie在客户端保存的时间不是永久性的，它也是有生命周期的，我们可以通过setMaxAge(int expiry)方法设置cookie的有效期。例如以下代码，我们先通过cookieExpiry.jsp页面设置一个Cookie对象，然后再尝试通过cookieExpiryResult.jsp页面来获取该Cookie对象，

cookieExpiry.jsp

```
	<body>
		<%
			Cookie cookie = new Cookie("username","zhangSan");
			//设置cookie对象的有效期为60秒
			cookie.setMaxAge(60);
			response.addCookie(cookie);
		%>
	</body>	
```

cookieExpiryResult.jsp

```
<body>
		<%
			Cookie[] cookies = request.getCookies();
			boolean flag = false;//用来标识名为"username"的cookie是否存在
			if(cookies != null){
				for(int i=0 ; i<cookies.length; i++)
				{
					if(cookies[i].getName().equals("username"))
					{
						out.print("username:"+cookies[i].getValue());
						flag = true ;
					}
				}
			}
			//如果名为"username"的cookie不存在
			if(!flag)
			{
				out.print("Cookie已消失！");
			}
		%>
	</body>	
```

先执行cookieExpiry.jsp来设置Cookie对象。之后，如果在60秒以内运行cookieExpiryResult.jsp，则运行结果：

![](http://i.imgur.com/NqUBhdI.jpg)

*图2.27*

如果超过60秒以后，再内运行cookieExpiryResult.jsp，运行结果如图2.28：

![](http://i.imgur.com/jMGuUTD.jpg)

*图2.28*

即，我们可以通过setMaxAge(秒数)来设置Cookie对象的有效期。

(2) JSP内置对象session

session通常被翻译成“会话”。一个会话，就是用户通过浏览器，与服务器之间进行的一系列的交互过程，期间可以包含浏览器与服务器之间的多次请求、响应的过程。以下是3个常见的session使用情景：

①用户在浏览某个网站时，从进入网站到关闭这个网站所经过的这段时间，也就是用户浏览这个网站的整个过程，就是一个session。


②在电子邮件应用中，从一个客户登录到电子邮件系统开始，经过收信、写信和发信等一系列操作，直至最后退出邮件系统，整个过程为一个session。

③在购物网站应用中，从一个客户开始购物，到浏览商品、结算等，直至最后的结账，整个过程为一个session。

**session运行机制：**
当用户（浏览器）向Web应用第一次发送请求时，服务器会创建一个session对象并分配给该用户；该session对象中包含着一个唯一标识符sessionId，并且服务器会在第一次响应用户时，将此sessionId作为jsessionid保存在浏览器的Cookie对象中；这个session将一直延续到用户访问结束（浏览器关闭或用户长时间不访问Web应用）。

当Web应用接收到用户的请求时，首先会检查服务器是否已经为这个用户（浏览器）创建过了session对象，具体是判断用户的请求中是否包含了一个sessionId，如果包含sessionId，则服务器就会通过这个sessionId找到对应的session，以确定是这个用户在访问服务器。而如果用户的请求中没有sessionId，服务器会为该用户创建一个新的session，并生成一个与此session对应的sessionId，然后将sessionId随着本次响应返回给用户（浏览器的Cookie对象中）。如图2.29，

![](http://i.imgur.com/8aJQj1a.jpg)

*图2.29*

说明：如果客户端禁用了Cookie，则服务器会自动使用URL-rewriting（URL重写，URL中包含session ID的信息）的技术来保存sessionId。

下面再通过一个例子，来讲解上述的逻辑：

假设服务器是一个商场的存包处，客户端是一个顾客。当来了一个顾客时，商场首先判断该顾客是否已经存过包。判断是通过顾客手里的钥匙来实现的，如果顾客手里有钥匙，就说明顾客此前已经存过包，商场就能根据这把钥匙，找到相应的包。否则如果顾客手里没钥匙，商场就给顾客一把新钥匙，并记住该钥匙对应的柜子编号，并把钥匙保存在顾客手里。商场记着的柜子编号就相当于服务器的sessionid,而顾客手里拿的钥匙就相当于客户端的jsessionid。即服务器中的sessionid，是与客户端中的jsessionid一一对应的。

cookie相当于客户的口袋，session相当于商场的柜子。二者的内容都是商场来设定，第一次商场会给一把钥匙（sessionId，当然商场也可以给其他东西，但只有id是用来找柜子的）并且告诉客户：你把钥匙放在你的口袋里面，下次来一定要带上这把钥匙。商场会把客户想存在柜子里面的东西存起来（注意，这些内容是存在商场的柜子里面的），并贴上sessionId。后续请求，客户每次都把钥匙（sessionId）带上，商场也能准确找到客户的柜子。

但是有一种情况，客户可能禁用Cookie，因为他觉着自己这个口袋可能被别人翻看，不安全。那么通过cookie来存储id就不适合了，这个时候商场必须为客户考虑，就会采用url重写的形式。这对用户来说是透明的，他不用再担心cookie，商场会自动把客户即将发起的任何请求都重写：URL后附加sessionId。

综上，可以发现：

①session是存储在服务端的（在用户第一次请求时，由服务器会创建并用来保存该用户的sessionId等信息）

②Session是在多次请求间共享的，但多次请求必须是同一个客户端发起的（例如，同一个用户进行的购物操作）

③Session的实现机制需要先发标识给客户端，再通过客户端发来的标识（jsessionid）找到对应的session

session内置对象是javax.servlet.ServletContext.HttpSession接口的实例化对象，常用方法如下表：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public String getId()</td>
      <td>获取sessionId</td>
   </tr>
   <tr>
      <td>public boolean isNew()</td>
      <td>判断是否是新的session（新用户）</td>
   </tr>
   <tr>
      <td>public void invalidate()</td>
      <td>使session失效</td>
   </tr>
   <tr>
      <td>public void setAttribute(String name, Object value)</td>
      <td>设置session对象名和对象值</td>
   </tr>
   <tr>
      <td>public Object getAttribute(String name)</td>
      <td>根据session对象名，获取session对象值</td>
   </tr>
   <tr>
      <td>public void setMaxInactiveInterval(int interval)</td>
      <td>设置session的有效非活动时间, 单位是秒</td>
   </tr>
   <tr>
      <td>public int getMaxInactiveInterval()</td>
      <td>获取session的有效非活动时间，单位是秒</td>
   </tr>
</table>

我们通过几个例子来讲述上面方法，现在服务器通过createSession.jsp页面设置一个session值，然后响应给客户端页面createSessionResult.jsp：

createSession.jsp

```
	<body>
		<%
             //session是内置对象，因此可以直接使用，而不用自己去创建
			session.setAttribute("school","Blue Bridge");
			response.sendRedirect("createSessionResult.jsp");
		%>
	</body>
```

createSessionResult.jsp

```
<%
			//获取session的值
			out.print("sessionId:"+session.getId()+"<br/>");
			Cookie[] cookies = request.getCookies();
			//前面学Cookie时已经知道，Cookie中会默认保存一个jsessionid的名和值
			//获取cook中jsessionid的名和值
out.print(cookies[0].getName()+
"---"+cookies[0].getValue());
		%>
```

执行createSession.jsp，运行结果：

![](http://i.imgur.com/6cXz2gD.jpg)

*图2.30*

可以发现，服务器中session对象产生的sessionId值，与客户端中cookie对象产生的jsessionid值的内容是一样的。

我们接下来，再用sessoin来实现一个登陆及注销的例子。

实现思路：用户首先进行登录操作，如果登录成功，则将用户的登录信息保存在一个session范围的属性里。当用户再访问其他页面时，先在session范围内寻找是否存在用户的登录信息；若存在，则表示是已经合法登录过的用户；若不存在，则表示该用户尚未登录，直接跳转到登录页面，要求用户重新登录。若用户登录成功，还可以进行注销操作。流程图如图2.31：

![](http://i.imgur.com/RXap2Dj.jpg)

*图2.31*

我们先在WebContent中创建一个文件夹loginDemo，将本例的jsp文件都放入该文件夹中：鼠标右键点击WebContent→new→Folder→输入名字loginDemo→Finish

访问该文件夹(Folder)中的jsp时，需要在jsp的地址前加上文件夹名，如http://localhost:8080/JspProject/loginDemo/login.jsp

登录页: loginDemo /login.jsp

使用form表单录入用户(uname)名和密码(upwd)，代码略。

登录判断页: loginDemo /check.jsp

```
	<%
             //将POST请求方式的编码设置为UTF-8
			request.setCharacterEncoding("UTF-8");
			String name = request.getParameter("uname");
			String pwd = request.getParameter("upwd");
			//假设用户名是zhangsan，密码是abc
			if (name.equals("zhangsan") && pwd.equals("abc"))
			{
				//登陆成功后,将用户信息保存在session的作用域内
				session.setAttribute("loginName", name);
				//设置session的非活动时间为10分钟
				session.setMaxInactiveInterval(60 * 10);
				//将请求信息，重定向到welcome.jsp页
request.getRequestDispatcher("welcome.jsp")
.forward(request, response);
			}
			else
			{
				//若登录失败，返回登录页login.jsp
				response.sendRedirect("login.jsp");
			}
	%>
```

登陆成功后的欢迎页: loginDemo /welcome.jsp

```
	<%
	//进入welcome.jsp页面前，先通过session的作用域内判断用户是否已经登录，如果还没登录，则跳到登录页
		String loginName = (String) session.getAttribute("loginName");
		if (loginName == null)
		{	
			//用户还没登录
			response.sendRedirect("login.jsp");
		}
		else
		{
			out.print("登陆成功！欢迎您<strong>" + loginName 
+ "</strong><br/>");
			out.print("<a href='logout.jsp'>注销</a>");
		}
	%>
```

注销页logout.jsp

```
	<%
	//进入logou.jsp页面前，先通过session的作用域内判断用户是否已经登录，如果还没登录，则跳到登录页
			String loginName = (String) session.
getAttribute("loginName");
			if (loginName == null)
			{
	             //用户还没登录
				response.sendRedirect("login.jsp");
			}
			else
			{
				//使session范围中的属性全部销毁，
即清除之前session中的"loginName"属性
				session.invalidate();
				response.sendRedirect("login.jsp");
			}
		%>
```

可以发现，如果输入正确的用户名和密码，则直接跳转到欢迎页，如图2.32，

![](http://i.imgur.com/6veA4Fk.jpg)

*图2.32*

如果用户名或密码输入有误，则返回登录页。而且，如果用户没有登录，直接访问welcome.jsp或logout.jsp，也会因为session作用域中的“loginName”为null而直接跳转返回登录页，从而实现访问权限的控制。

最后，再说明一下cookie和session的几点区别：

<table>
   <tr>
      <td></td>
      <td>cookie</td>
      <td>session</td>
   </tr>
   <tr>
      <td>保存信息的位置</td>
      <td>客户端</td>
      <td>服务器端</td>
   </tr>
   <tr>
      <td>保存的内容</td>
      <td>字符串</td>
      <td>对象</td>
   </tr>
   <tr>
      <td>安全性</td>
      <td>不安全</td>
      <td>安全</td>
   </tr>
</table>

### 5.JSP内置对象application

application对象是javax.servlet.ServletContext接口的实例化对象，代表了整个web服务器，所以application对象的数据可以在整个web服务器中共享，用法上类似于“全局变量”的概念。application对象的常用方法如下表（其他方法会在 “四种内置对象的作用域”中讲解）：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public String getContextPath()</td>
      <td>获取虚拟路径（默认是项目名称）</td>
   </tr>
   <tr>
      <td>public String getRealPath(String path)</td>
      <td>获取虚拟路径对应的绝对路径</td>
   </tr>
</table>

我们先直接通过一段代码，看一下运行结果，

applicationDemo.jsp

```
	<%
			String realPath = application.getRealPath("/");
			String contextPath = application.getContextPath();
			out.print("realPath:"+realPath+"<br/>");
			out.print("contextPath:"+contextPath);
		%>
```

运行结果：

![](http://i.imgur.com/c1eOMOf.jpg)

*图2.33*

可以发现，虚拟路径是项目名；而虚拟路径对应的绝对路径，是在工作目录中的某一个文件夹。虚拟路径和绝对路径都是可以修改的，有兴趣的读者可以查阅一下相关资料。

## 2.2.2四种内置对象的作用域

在JSP的内置对象中，包含着四种范围对象，简介如下

<table>
   <tr>
      <td>对象</td>
      <td>作用域</td>
   </tr>
   <tr>
      <td>pageContext</td>
      <td>数据只在当前自身的页面有效</td>
   </tr>
   <tr>
      <td>request</td>
      <td>数据在一次请求中有效</td>
   </tr>
   <tr>
      <td>session</td>
      <td>数据在一次会话中有效；但若是新开浏览器，则无效</td>
   </tr>
   <tr>
      <td>application</td>
      <td>数据在当前Web项目有效，可供所有用户共享</td>
   </tr>
</table>

说明：

其他教材中，经常称pageContext作用域为page作用域。但为了和page对象做以区分，本书就仍然称为pageContext作用域。

以上的四个内置对象，都存在以下表格中的方法：

<table>
   <tr>
      <td>方法</td>
      <td>说明</td>
   </tr>
   <tr>
      <td>public void setAttribute(String name, Object o)</td>
      <td>设置属性名和属性值</td>
   </tr>
   <tr>
      <td>public Object getAttribute(String name)</td>
      <td>根据属性名，获取对应的属性值</td>
   </tr>
   <tr>
      <td>public void removeAttribute(String name)</td>
      <td>根据属性名，删除对应的属性值</td>
   </tr>
</table>

### 1.pageContext作用域

我们创建一个页面 pageDemo.jsp，然后通过pageContext.setAttribute()添加两个属性（每个属性都由键值对组成），再通过pageContext.getAttribute()将属性的值取出，代码如下：

pageDemo.jsp

```
<body>
		<%
			/*将"蓝桥软件学院 JAVA EE核心技术"添加到"bookName"属性中，
			     类似于String bookName="蓝桥软件学院 JAVA EE核心技术实践"; */
			pageContext.setAttribute("bookName","蓝桥软件学院 JAVA EE核心技术实践");
			pageContext.setAttribute("author","颜群");
		%>
			<%--获取并显示bookName属性的值 --%>
			书名:<%=pageContext.getAttribute("bookName") %> <br/>
			作者:<%=pageContext.getAttribute("author") %>
	</body>
```

运行结果：

![](http://i.imgur.com/XUY3y7L.jpg)

*图2.34*

因为pageContext对象的作用域是“在当前自身的页面有效”，而以上属性均在同一个页面中增加和输出，所以能够正常显示。

但如果将上述页面进行修改，将增加属性放在page_scope_one.jsp中执行，再通过请求转发跳转到page_scope_two.jsp页面，并在page_scope_two.jsp中显示属性的值，如下代码：

page_scope_one.jsp

```
	<body>
		<%
			//增加属性
			pageContext.setAttribute("bookName","蓝桥软件学院 JAVA EE核心技术");
			pageContext.setAttribute("author","颜群");
            //属性增加完后，跳转到page_scope_two.jsp
             request.getRequestDispatcher("page_scope_two.jsp")
.forward(request, response);
		%>
	</body>
```

page_scope_two.jsp

```
	<body>
			<%--属性的显示 --%>
			书名:<%=pageContext.getAttribute("bookName") %> <br/>
			作者:<%=pageContext.getAttribute("author") %>
	</body>
```

再次执行page_scope_one.jsp，运行结果：

![](http://i.imgur.com/iERTeqf.jpg)

*图2.35*

因为页面从page_scope_one.jsp，通过请求转发跳转到page_scope_two.jsp后，就已经不再是同一个页面了，所以无法再通过pageContext对象获取到数据。

### 2.request作用域

要想在请求转发后的page_scope_two.jsp页面获取到属性值，则可以使用request的作用域。

request的作用域是“在客户端向服务器端，发送的一次请求中有效”。我们将上面的例子修改如下：

request_scope_one.jsp

```
	<body>
		<%
			//将内置对象的作用域，从pageContext改为request
			request.setAttribute("bookName","蓝桥软件学院 JAVA EE核心技术");
			request.setAttribute("author","颜群");
	 request.getRequestDispatcher("request_scope_two.jsp")
.forward(request, response);
		%>
	</body>
```

request_scope_two.jsp

```
	<body>
			<%--通过request范围来获取属性值 --%>
			书名:<%=request.getAttribute("bookName") %> <br/>
			作者:<%=request.getAttribute("author") %>
	</body>
```

执行request_scope_one.jsp，运行结果：

![](http://i.imgur.com/De4HCE9.jpg)

*图2.36*

因为从request_scope_one.jsp到request_scope_two.jsp的跳转是“请求转发”，即仍然是同一次请求，而request的作用范围就是“在一次请求中有效”。

但要注意，如果将上例的“请求转发”，改为“重定向”或超链接形式的跳转，则不会再获取到数据，如下代码：

request_scope_redirect_one.jsp

```
<body>
		<%
			//将内置对象的作用域，从pageContext改为request
			request.setAttribute("bookName","蓝桥软件学院 JAVA EE核心技术");
			request.setAttribute("author","颜群");
			
			response.sendRedirect("request_scope_two.jsp");
		%>
			<!-- 或将重定向改为超链接，跳转后的效果是一样的
				<a href="request_scope_redirect_two.jsp">超链接跳转</a>
			 -->
	</body>
```

request_scope_redirect_two.jsp

```
	<body>
			<%--通过request范围来获取属性值 --%>
			书名:<%=request.getAttribute("bookName") %> <br/>
			作者:<%=request.getAttribute("author") %>
	</body>
```

执行request_scope_redirect_one.jsp，运行结果：

![](http://i.imgur.com/nKCHBBf.jpg)

*图2.37*

因为request的作用范围是“在一次请求中有效”，而“重定向”或超链接形式的跳转，都是在跳转时重新发送了一次新的请求（重新去请求request_scope_redirect_two.jsp），因此是获取不到数据的。

### 3.session作用域

如果希望在增加属性以后，能够在跳转后的任何页面（无论是请求转发、重定向或超链接跳转），甚至是项目中任何一个页面都能获取到该属性值，就可以使用session的作用域来实现。

现在将上例的作用域从request改为session，如以下代码：

session_scope_redirect_one.jsp

```
	<body>
		<%
			//将内置对象的作用域，从request改为session
			session.setAttribute("bookName","蓝桥软件学院 JAVA EE核心技术");
			session.setAttribute("author","颜群");
			
			response.sendRedirect("session_scope_redirect_two.jsp");
		%>
			<!-- 或将重定向改为超链接，效果是一样的
				<a href="session_scope_redirect_two.jsp">超链接跳转</a>
			 -->
	</body>
```

session_scope_redirect_two.jsp

```
	<body>
			<%--通过session范围来获取属性值 --%>
			书名:<%=session.getAttribute("bookName") %> <br/>
			作者:<%=session.getAttribute("author") %>
	</body>
```

执行session_scope_redirect_one.jsp，运行结果：

![](http://i.imgur.com/l6ij0X2.jpg)

*图2.38*

从结果中可以看到，虽然“重定向”或超链接形式的跳转，会重新向服务器发送一次请求（重新去请求request_scope_redirect_two.jsp），但仍然可以从session的作用域中获取到属性值。当然，如果是通过请求转发实现的跳转，也是能通过session中获取到属性值的。

此外，如果我们重新打开一个浏览器标签（相同浏览器），如图2.39

![](http://i.imgur.com/hitwYlK.jpg)

*图2.39*

然后再新标签里直接输入request_scope_redirect_two.jsp，也能获取到数据。

但是，如果我们换一个其他浏览器（比如从火狐换成IE），再次直接输入request_scope_redirect_two.jsp，就无法再获取到数据了，如图是IE浏览器直接运行[http://localhost:8888/JspProject/session_scope_redirect_two.jsp](http://localhost:8888/JspProject/session_scope_redirect_two.jsp)的结果：

![](http://i.imgur.com/EU7YddI.jpg)

*图2.40*

也就是说，只要在session_scope_redirect_one.jsp中，将属性(如bookName和author)增加到了session中以后，凡是同一个浏览器，就都可以获取到session中的该属性值；但如果换成其他浏览器，则就不能再在session中获取到该属性值了。我们可以联想一下平日的网购经验，如果通过火狐浏览器登录淘宝，那么只要登录一次以后，在短时间内即使我们重新开启一个火狐标签，也会以“已登录”的身份访问淘宝；但如果换成IE浏览器，则又需要我们重新登录了。所以网站中的登录功能，就可以通过session来实现。

### 4.application作用域

继续上面的讨论，如果想实现这样一个功能“只要在一个页面中增加了属性，那么即使重新换一个新浏览器，也要能访问到该属性值”，该如何实现呢？答案就是applicaton的作用域。

我们再将上例中的作用域，从session改为application，如以下代码：

application_scope_redirect_one.jsp

```
	<body>
		<%
			//将内置对象的作用域，从session改为application
			application.setAttribute("bookName","蓝桥软件学院 JAVA EE核心技术");
			application.setAttribute("author","颜群");
			
			response.sendRedirect("application_scope_redirect_two.jsp");
		%>
		<!-- 或将重定向改为超链接，效果是一样的
			<a href="application_scope_redirect_two.jsp">超链接跳转</a>
		-->
	</body>
```

application_scope_redirect_two.jsp

```
		<body>
			<%--通过application范围来获取属性值 --%>
			书名:<%=application.getAttribute("bookName") %> <br/>
			作者:<%=application.getAttribute("author") %>
	</body>
```

执行application_scope_redirect_one.jsp，运行结果：

![](http://i.imgur.com/CA5pf0b.jpg)

*图2.41*

此外，读者可以发现，只要运行过一次application_scope_redirect_one.jsp以后，无论是新开一个浏览器标签，或者是更换新的浏览器，直接再运行application_scope_redirect_two.jsp，也都能获取到数据。如图是火狐上执行了application_scope_redirect_one.jsp以后，在IE浏览器直接运行application_scope_redirect_two.jsp的运行结果：

![](http://i.imgur.com/TFCPNsi.png)

*图2.42*

即只要是通过application.setAttribute()增加的属性，那么任何浏览器的任何页面都可以获取到该属性值。但是如果将tomcat服务器关闭，application中的属性值就全部消失了。

我们可以利用applicatoin作用域的这一特性，来实现一个网页计数器功能：

webCounterDemo.jsp

```
	<body>
		<%
		  //第一次访问网页时，"count"没有值，所以是null
		  Integer count = (Integer)application.getAttribute("count");
			//如果count是null，表明是第一次访问网页；否则说明不是第一次访问	
		  if(count ==  null){
			  //如果是第一次访问，将count赋值为1
			  count = 1;
		  }else{
			  //如果不是第一次访问，则累加一次访问次数
			  count = 1 + count;	
		  }
		   //将访问次数的变量count保存在application的属性count中，供下次访问时获取并累加
		  application.setAttribute("count",count);
		  out.println("您是第 " + application.getAttribute("count") +" 位访问本网站的用户" );
		%>
	</body>	
```

运行结果：

![](http://i.imgur.com/AATGin0.jpg)

*图2.43*

之后，无论是刷新当前页，还是新开一个浏览器标签，或者打开一个其他浏览器再次访问，每访问一次，访问次数就会累加一次。

需要说明的是，虽然四种作用域的大小依次是pageContext<request<session<application，但我们不能因为方便就随时使用大范围的范围对象，范围越大造成的性能损耗就越大。因此，如果多个作用域都能完成相同的功能，我们一般会使用范围小的那个对象。

# 2.3本章练习

**一、选择题**

1  下列选项中，（    ）不是HTTP协议的特点。（选择一项）

A．简单快速

B．支持C/S模式

C．持久连接

D．无状态

2  一个HTTP请求的请求行包括（    ）。（选择三项）

A．方法字段

B．URL字段

C．HTTP版本字段

D．参数名和参数值

3  下列关于HTTP响应中状态码的描述，错误的是（    ）。（选择一项）

A．3**表示重定向，表示需要客户端采取进一步的操作才能完成请求

B．2**表示成功，表示请求已被成功接收、理解、接受

C．4**表示客户端错误，请求有语法错误或请求无法实现

D．5**表示数据库端错误，服务器未能实现合法的请求


4  下列（    ）方法可以获取请求的字符编码方式。（选择一项）

A．request.getCharacterEncoding()

B．request.getProtocol()

C．request.getRequestURI()

D．request.getQueryString()

5  请求转发的forward(request,response)方法是（    ）的方法。（选择一项）

A．request对象

B．response对象

C．RequestDispatcher对象

D．session对象

6  下列（    ）不是JSP九大内置对象之一。（选择一项）

A．out对象

B．exception对象

C．cookie对象

D．session对象

**二、简答题**

1.JSP中有几种Scriptlet，各自的作用是什么？（难度★）

2.JSP中有几种注释，各有什么特点？（难度★）

3.对于GET请求和POST请求，各如何设置编码？（难度★★）

4.简述pageContext、request、session、application等四个内置对象的作用域范围（难度★★）。

5.在index.jsp中编写两个输入框，用于接收用户输入的两个数，然后通过表单提交跳转到result.jsp。再在result.jsp中比较判断出较大的数字，并显示（难度★★）。

6.简述请求转发与重定向的区别（难度★★★）。

7.在一个JSP中提供一组复选框，可以让用户选择自己喜爱的水果，提交后，在另一个JSP页面输出用户的所有选择项（难度★★★）。

8.请描述如何更改Tomcat端口号（难度★）。

9.请描述Session和Cookie的区别（难度★★★）。















































