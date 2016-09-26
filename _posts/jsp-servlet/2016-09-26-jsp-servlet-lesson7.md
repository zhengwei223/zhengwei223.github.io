---

layout: post


title: JSP/Servlet相关技术


category: JSP-Servlet教程


tags: JSP Servlet


description: 本章将系统介绍JSP/Servlet相关技术。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

# 7.1分页显示 #

我们给之前的项目（StudentManagerBy3TierAndInterface）存入10条数据并显示，如图，

![](http://i.imgur.com/1KTETX5.png)

*图7-01*

试想，如果存入100条数据，则页面一定会被拉的很长，用户必须拉滚动条才能访问全部数据。

如果数据量更大，一千条、一万条、甚至几十万、几百万条数据呢？显然，将如此多的数据放在同一个页面中显示是不可取的。因此，我们就需要通过分页技术来减轻页面的负荷。

所谓分页，就是将原来在一个页面显示的数据，分到多个页面中显示，并且可以通过页码在多个页面之间切换。

分页的实现有多种方式，我们在此介绍最常用的一种：每次翻页的时候，只从数据库里查询出当前页所需要的数据。此种分页方式，需要依赖SQL语句，但不同数据库的SQL语句之间存在着差异。因此在编写分页时，我们需要对不同的数据库，写不同的SQL语句，本书采用的是Oracle数据库。下面就通过代码，来实际讲解一下分页。

本章的演示项目名为StudentManagerWithPage，是建立在之前的StudentManagerBy3TierAndInterface项目的基础上。

实现分页，需要提供5个属性（变量）：

**1.数据总数：**一共有多少条数据需要显示；可以通过”select count(1) from …”从数据库表中获取。

**2.页面大小：**每页显示几条数据；可以由用户自己设置。

**3.总页数：**总页数可以由“数据总数”和“页面大小”计算得出。例如，

①如果一共有80条数据（即“数据总数”为80），而每页只显示10条（即“页面大小”为10），则可以得到总页数=80/10=8（正好除尽，没有余数），共8页；

②如果一共有82条数据，每页仍然显示10条，则总页数=82/10（有余数）+1=9，共9页数据。因此，我们在求总页数之前，需要先判断是否有余数。综上，求总页数的公式：

总页数 = （数据总数 % 页面大小==0 ） ? （数据总数 / 页面大小） : （数据总数 / 页面大小 +1）

需要注意，因为“总页数”是由“数据总数”和“页面大小”计算而来的，所以不应该手动的为“总页数”赋值，即不存在“总页数”的`setter`方法。

**4.当前页的页码：**指定需要显示第几页的数据；可以由用户自己指定。

**5.实体类集合：**如`List<Student> students`，用来保存当前页面中全部学生的信息。

为了便于维护，我们把这5个属性封装到一个`Page`类中，并提供相应的`getter`/`setter`方法，如下，

org.lanqiao.util.Page

```
package org.lanqiao.util;
// 省略import
public class Page
{
	// 总页数
	private int totalPage;
	// 数据总数;即一共有都少条数据，需要显示）
	private int totalCount;
	// 页面大小;即每页显示几条数据
	private int pageSize;
	// 当前页的页码
	private int currentPage;
	// 实体类集合;如List<Student> students，用来保存当前页面中全部学生的信息
	private List<Student> students;

	// 不存在“总页数”的setter方法，因为总页数是由“数据总数”和“页面大小”计算而来的
	// 当“页面大小”和“数据总数”被赋值之后，可以自动计算出“总页数”
	public void setTotalCount(int totalCount)
	{
		this.totalCount = totalCount;
		totalPage = this.totalCount % pageSize == 0 ? 
(this.totalCount / pageSize) : this.totalCount / pageSize + 1;
	}
	//省略其他常规的setter/getter方法
}
```

再在数据访问层，增加分页操作需要的两个方法：

①获取数据总数的方法;

②获取当前页面中全部学生的信息的集合的方法（例如获取`List<Student> students`集合的值）。

而这两个方法都需要使用特定的SQL语句：

①获取数据总数方法：使用“select count(*) from student”语句即可。

②获取当前页面中全部学生的信息的集合：

我们需要知道当前页的第一条及最后一条数据的行号，然后使用“select * from student where 编号>=第一条数据行号 and 编号<=最后一条数据行号”即可查出当前页的全部学生信息。为了分析“第一条及最后一条数据的行号”，我们列了以下表格（假设每页显示10条数据，即页面大小为10）：

<table>
   <tr>
      <td>当前页</td>
      <td>数据起止</td>
      <td>推导公式（“数据起止”的等价写法）</td>
   </tr>
   <tr>
      <td>第1页</td>
      <td>第1 ~ 10条</td>
      <td>第(1-1)*10+1 ~ 1*10条</td>
   </tr>
   <tr>
      <td>第2页</td>
      <td>第11 ~ 20条</td>
      <td>第(2-1)*10+1 ~ 2*10条</td>
   </tr>
   <tr>
      <td>第3页</td>
      <td>第21 ~ 30条</td>
      <td>第(3-1)*10+1 ~ 3*10条</td>
   </tr>
   <tr>
      <td>第n页</td>
      <td></td>
      <td>第(n-1)*10+1 ~ n*10条</td>
   </tr>
</table>

可以发现，第n页需要显示的数据，就是第 (n-1)*10+1条至第 n*10条之间的数据，而其中的“10”就是“页面大小”。因此，第n页需要显示的数据范围如下：

第“ (n-1)*页面大小+1”条   至    第 “n*页面大小”条

所以，查询当前页的全部学生信息的SQL为：

```
select * from 
(
    select rownum r,t.* from 
    (select s.* from student s order by sno asc ) t
 )
where r<= 当前页的页码*页面大小 and r>=((当前页的页码-1)*页面大小+1)
```

将上述SQL进行优化，可以写成如下形式，

```
select * from 
(
    select rownum r,t.* from 
    (select s.* from student s order by sno asc ) t
    where rownum<= 当前页的页码*页面大小 
 )
where r>=((当前页的页码-1)*页面大小+1)
```

以上，就是使用oracle时的分页SQL语句，可以发现此SQL语句需要“当前页的页码（currentPage）”和“页面大小（pageSize）”两个参数，而这两个参数需要通过三层逐步传递：用户通过JSP输入或指定currentPage 和pageSize→在JSP中，将二者附加在超链接或表单中，传入表示层后端代码Servlet中→在Servlet中，将二者传入`SERVICE`层方法的入参中→再在`SERVICE`层中，将二者传入`DAO`层方法的入参中→最后在`DAO`层中，将二者放入分页的SQL语句之中，并通过`DBUtil`执行最终的SQL语句，从而实现分页。具体如下（演示代码的顺序：数据库帮助类`DBUtil`→`DAO`层→`SERVICE`层→`UI`层）：

为了实现分页，DBUtil需要从数据库查询①数据总数（`Page`类中的属性`totalCount`），以及②当前页面中全部学生信息的集合（`Page`类中的属性`students`）。因此需要在`DBUtil`中加入“查询数据总数”方法`getTotalCount()`；查询学生信息集合（结果集）的方法`executeQuery()`，在之前的DBUtil中已经讲解过，因此不再赘述。

DBUtil.java

```
package org.lanqiao.util;
 // 省略import
public class DBUtil
{
    // 省略用于查询结果集的executeQuery(String sql, Object[] os)等方法的实现代码，具体参见项目StudentManagerBy3TierAndInterface中的DBUtil.java
	…
	// 查询数据总数
	public static int getTotalCount(String sql)
	{
		int count = -1;
		ResultSet rs = null;
		try
		{
			pstmt = createPreparedStatement(sql,null);
			rs = pstmt.executeQuery();
			if (rs.next())
			{
				count = rs.getInt(1);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			closeAll(rs, pstmt, conn);
		}
		return count;
	}
}
```

再在`DAO`层，加入“①获取数据总数”方法，和“②获取当前页面中全部学生信息的集合”方法：

IStudentDao.java接口

```
package org.lanqiao.dao;
// 省略import
public interface IStudentDao
{
	// 获取“数据总数”
	public int getTotalCount();

	// 获取“当前页面中全部学生信息的集合”，用来给Page中的集合属性students赋值;currentPage表示当前页的页码，pageSize表示页面大小
	public List<Student> getStudentsListForCurrentPage(int currentPage
, int pageSize);
…
}
```

StudentDaoImpl.java实现类

```
package org.lanqiao.dao.impl;
//省略import
public class StudentDaoImpl implements IStudentDao
{
    …
	public int getTotalCount()
	{
		String sql = "select count(*) from student ";
		return DBUtil.getTotalCount(sql);
	}

	
	// 获取第currentPage页的全部学生信息（每页显示pageSize条数据）
	//通过执行分页SQL语句实现
	public List<Student> getStudentsListForCurrentPage(int currentPage, int pageSize)
	{
		String sql = "select * from " + "(" + "select rownum r,t.* "
+ "from (select s.* from student s order by stuno asc ) t " 
+ "where rownum<= ? )" + "where r>= ?";
		Object[] os =
	 	{ currentPage * pageSize, (currentPage - 1) * pageSize + 1 };
	
	// 获取当前页的学生集合
		ResultSet rs = DBUtil.executeQuery(sql, os);
		List<Student> students = new ArrayList<Student>();
		try
		{
			while (rs.next())
			{
				int sNo = rs.getInt("stuNo");
				String sName = rs.getString("stuName");
				int sAge = rs.getInt("stuAge");
				String gName = rs.getString("graName");
				// 将查到的学生信息，封装到stu对象中
				Student stu = new Student(sNo, sName, sAge, gName);
				// 将封装好的stu对象，存放到List集合中
				students.add(stu);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			DBUtil.closeAll(rs, DBUtil.getPstmt(), DBUtil.getConn());
		}
		return students;
	}
 }
```

然后在`SERVICE`层，加入“①获取数据总数”方法，和“②获取当前页面中全部学生信息的集合”方法

IStudentService.java接口

```
package org.lanqiao.service;
//省略import
public interface IStudentService
{
	// 获取“数据总数”
	public int getTotalCount();
    //“获取当前页面中全部学生信息的集合”
	public List<Student> getStudentsListForCurrentPage(int currentPage
, int pageSize);
…
}
```

StudentServiceImpl.java实现类

```
package org.lanqiao.service.impl;
//省略import
public class StudentServiceImpl implements IStudentService
{
	// 获取“数据总数”
	public int getTotalCount()
	{
		return stuDao.getTotalCount();
	}
	public List<Student> getStudentsListForCurrentPage(int currentPage
, int pageSize)
	{
		return stuDao.getStudentsListForCurrentPage(currentPage, pageSize);
	}
	…
}
```

不难发现，`SERVICE`层和`DAO`层，都需要currentPage(当前页)和pageSize（页面大小）两个参数。现在，我们就通过表示层来获取这两个参数：

先在表示层的后台代码（查询Servlet）中加入控制页码的程序，然后给`Page`类的各个属性赋值，最后再跳转到表示层的前台JSP中：

QueryAllStudentsServlet.java

```
package org.lanqiao.servlet;
//省略import
public class QueryAllStudentsServlet extends HttpServlet
{
…
	protected void doPost(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		// 获取前台传来的当前页码，即currentPage值
		String curPage = request.getParameter("currentPage");
		// 如果curPage值为null，说明是第一次进入此Servlet，
则将curPage设为第1页
		if (curPage == null)
		{
			curPage = "1";
		}
		int currentPageNo = Integer.parseInt(curPage);
		// 调用业务逻辑层代码
		IStudentService stuService = new StudentServiceImpl();
		// 获得总记录数
		int totalCount = stuService.getTotalCount();
		// 获取分页帮助类
		Page pages = new Page();
		// 设置页面大小，即每页显示的条数（本次，假设每页显示3条数据）
		pages.setPageSize(3);
		// 设置总记录数
		pages.setTotalCount(totalCount);
		// 获取总页数
		int totalpages = pages.getTotalPage();
		// 对首页与末页进行控制：页数不能小于1，也不能大于最后一页的页数
		if (currentPageNo < 1)
		{
			currentPageNo = 1;
		}
		else if (currentPageNo > pages.getTotalPage())
		{
			currentPageNo = totalpages;
		}
		// 设置当前页的页码
		pages.setCurrentPage(currentPageNo);
		//调用业务逻辑层的方法，来获取当前页面中全部学生信息的集合
		List<Student> students = 
stuService.getStudentsListForCurrentPage(pages.getCurrentPage()
, pages.getPageSize());
		// 设置每页显示的集合
		pages.setStudents(students);
		// 将存放当前页全部数据的对象pages，放入request作用域中。
即采用分页后，数据是通过分页帮助类Page的对象来传递的。
		request.setAttribute("pages", pages);
		// 跳转到首页（学生列表页）
		request.getRequestDispatcher("index.jsp")
.forward(request, response);	
}
}
```

阅读以上代码可知， currentPage(当前页)的值，是通过前台JSP传来的 currentPage设置的；而pageSize（页面大小）的值，是通过硬编码的方式直接写成了3（读者也可以尝试将pageSize的值通过前台传来）。

因为程序是先执行QueryAllStudentsServlet，然后再跳转到index.jsp中，因此需要将QueryAllStudentsServlet设置为项目的默认启动程序，如下：

web.xml

```
<?xml …>
  <welcome-file-list>
    <welcome-file>QueryAllStudentsServlet</welcome-file>
  </welcome-file-list>
  …
  <servlet>
    <servlet-name>QueryAllStudentsServlet</servlet-name>
    <servlet-class>
org.lanqiao.servlet.QueryAllStudentsServlet
</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>QueryAllStudentsServlet</servlet-name>
    <url-pattern>/QueryAllStudentsServlet</url-pattern>
  </servlet-mapping>
  
</web-app>
```

最后，再在表示层的前台代码中，获取Servlet传来的`Page`类对象`pages`，通过`pages`获取到当前页的学生数据集合等信息，最后再通过用户的点击，来设置currentPage的值：

```
<body>
	…
		<table border="1" >
			<tr>
				<th>学号</th>
				<th>姓名</th>
				<th>年龄</th>
				<th>操作</th>
			</tr>
			
			<%
				//获取带数据的分页帮助类对象
				Page pages=(Page)request.getAttribute("pages");
				//总页数
	    		    int totalpages=pages.getTotalPage();  
	    		    //当前页的页码
	    		    int pageIndex=pages.getCurrentPage(); 
	    		
	    		   //获取当前页中的学生数据集合
				List<Student> students =pages.getStudents();
				if(students != null)
				{
					
					for(Student stu : students)
					{
			%>	
					  <tr>
							<td>
					  			<a href="QueryStudentByNoServlet?stuNo
=<%=stu.getStudentNo() %>">
<%=stu.getStudentNo() %>
</a>
					      	</td>
					  	    <td><%=stu.getStudentName() %></td>
					  	    <td><%=stu.getStudentAge() %></td>
					  	
					  		<td><a href="DeleteStudentServlet?stuNo
=<%=stu.getStudentNo() %>">删除
</a>
</td>
					  </tr>
			<%	
					}
				}
			%>
		</table>
			 当前页数：[<%=pageIndex%>/<%=totalpages%>]
			 <%
			 	//只要不是首页，则都可以点击“首页”和“上一页”
	   			 if(pageIndex > 1)
	   			 {		
			 %>   
			     <%-- 通过用户点击超链接，将页码传递给Servlet --%>
	   			 <a href="QueryAllStudentsServlet?currentPage=1">首页
</a>&nbsp;
	    		 <a href="QueryAllStudentsServlet?currentPage
=<%= pageIndex -1%>">上一页
</a>
			<%   }
				//只要不是末页，则都可以点击“下一步”和“末页”
	    	   if(pageIndex < totalpages)
	    	   {	
			%>
			    <%-- 通过用户点击超链接，将页码传递给Servlet --%>
	    		<a href="QueryAllStudentsServlet?currentPage
=<%= pageIndex +1%>">下一页
</a>
	    		<a href="QueryAllStudentsServlet?currentPage
=<%=totalpages%>">末页
</a> 
			<% 
			   }
	    	%>   
		<a href="addStudent.jsp">增加</a>
</body>
```

至此，就可以将分页SQL需要的两个参数“当前页的页码”及“页面大小”全部得到，也就完整的实现类分页功能。分页示例的完整代码在StudentManagerWithPage项目中，运行结果：

![](http://i.imgur.com/UGrTXtl.png)

*图7-02*

说明：

基于不同数据库的分页操作，唯一不同的就是SQL语句。常用的数据库（如MySql、SqlServer）用来实现分页SQL语句如下：

**MySql:**select * from 表名  limit (当前页的页码-1)*页面大小,页面大小;

**SqlServer:**select top 页面大小 * from 表名 where id not in(select top (当前页的页码-1)*页面大小  id from 表名)

其中id表示“数据表的唯一标示符”

# 7.2数据库连接池 #

## 7.2.1JNDI ##

之前，我们在学JSP中时曾提到“JSP四种范围对象的大小依次是`pageContext`<`request`<`session`<`application`”，可见范围最大的是`application`。`application`范围中的数据也只能在当前Web项目中有效；而如果想让数据在tomcat下的所有Web项目中都有效，就需要使用JNDI来实现。

JNDI的全称是Java Naming and Directory Interface（JAVA命名与目录接口），是一种将对象和名字绑定的技术。使用JNDI，应用程序可以通过资源名字来获得相应的对象、服务或目录。我们以使用JNDI访问Tomcat为例，来详细介绍一下JNDI的使用。

Servers项目中有一个context.xml文件（即Tomcat目录中的context.xml文件），此文件中的信息就可以被所有Web项目共享。

我们在context.xml中，加入以下代码：

```
<Context>
<Environment name="jndiName" value="jndiValue" 
type="java.lang.String" />
</Context>
```

其中Context是context.xml文件的根标签。`Environment`就是可以用来使用JNDI的元素：`name`表示当前Environment元素的名字，相当于唯一标示符；`value`表示`name`对应的内容值，即`name`与`value`构成了一组键值对；`type`表示`value`中的内容类型。此`Environment`的作用就类似于`String jndiName = “jndiValue”`。之后，在该tomcat中的任意一个Web项目里，均可以获取到此`Environment`的`value`值了。

JNDI的演示项目名是StudentManagerWithJNDIPool，该项目是建立在StudentManagerWithPage项目基础之上：

在index.jsp中加入以下代码，用于获取context.xml中的`Environment`值：

index.jsp

```
<body>
	 …
		<a href="addStudent.jsp">增加</a><br/>
         <%--测试JNDI的使用 --%>
		<%
		    //javax.naming.Context提供了查找JNDI Resource的接口
		    Context ctx = new InitialContext();	
		    //java:comp/env/为前缀
		    String testjndi = (String)ctx.lookup("java:comp/env/ jndiName ");
		    out.println("JNDI: "+testjndi);
		%>
	</body>
</html>
```

`Context`和`InitialContext`都属于`javax.naming`包。`Context`对象的`lookup()`方法可以根据名字查询到context.xml中`Environment`的`value`值，并且`lookup()`中需要使用`"java:comp/env/"`作为固定前缀。`lookup()`的返回值为Object，需要强转为需要的类型。

运行结果：

![](http://i.imgur.com/L0MXu4X.png)

*图7-03*

可以发现，使用JNDI定义的变量（通过context.xml中的`Environment`元素定义），可以在任意一个Web项目中使用（同一个Tomcat中）。

## 7.2.2连接池 ##

我们之前一直采用传统的JDBC方式访问数据库。而每次使用JDBC访问数据库时，都需要建立连接和关闭连接，但连接的建立和关闭又是非常耗费系统资源的。为了解决这个问题，我们可以使用数据库连接池技术。

**(1)连接池原理**

数据库连接池可以分配、管理及释放数据库连接，它可以使得应用程序重复的使用一个已有的数据库连接，而不再是重新建立一个。而且，如果某一个数据库连接超过了最大空闲时间，数据库连接池也会自动将该连接释放掉，从而明显提高数据库的性能及安全。

数据库连接池的工作原理是，在初始化时连接池会创建一定数量的数据库连接，并将这些连接放在数据库连接池之中。连接的数量不会小于用户设置的最小值 ；而如果应用程序的连接请求数量大于用户设置的最大值，那么大于最大值的那些请求会被加入在等待队列之中，只有当某些应用程序把正在使用的连接使用完毕并归还给连接池时，在等待队列的请求才会获取到连接。

**(2)数据源和JNDI**

数据源(`javax.sql.DataSource`，简称`DataSource`)可以负责与数据库的连接，因此应用程序可以从数据源中获得数据库连接。

`DataSource`对象由Tomcat提供，我们可以使用JNDI来从Tomcat中获取到该对象。
我们现在就来讲解如何在项目中使用数据源：

和JNDI一样，首先需要在Servers项目的context.xml中增加元素。不同的是，配置数据源需要使用`Resource`元素，而不是`Environment`，如下，

context.xml

```
<Resource name="jdbc/student" auth="Container" 
type="javax.sql.DataSource" maxActive="400" 
maxIdle="20"  maxWait="5000"  username="system" password="sa" 
driverClassName="oracle.jdbc.driver.OracleDriver"  url="jdbc:oracle:thin:@127.0.0.1:1521:XE"	/>
```

`Resource`元素的属性介绍见下表：

<table>
   <tr>
      <td>属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>name</td>
      <td>指定Resource的JNDI名字</td>
   </tr>
   <tr>
      <td>auth</td>
      <td>指定Resource的管理者，共有两个可选值：Container和Application。 Container：由容器来创建Resource。   Application：由Web应用来创建和管理Resource</td>
   </tr>
   <tr>
      <td>Type</td>
      <td>指定Resource的类型</td>
   </tr>
   <tr>
      <td>maxActive</td>
      <td>指定连接池中，处于活动状态的数据库连接的最大数量；如果值为0，表示不受限制</td>
   </tr>
   <tr>
      <td>maxIdle</td>
      <td>指定连接池中，处于空闲状态的数据库连接的最大数量；如果值为0，表示不受限制</td>
   </tr>
   <tr>
      <td>maxWait</td>
      <td>指定连接池中，连接处于空闲状态的最长时间(单位是毫秒)，如果超出此最长时间将会抛出异常。如果值为-1，表示允许无限制等待。</td>
   </tr>
   <tr>
      <td>username</td>
      <td>指定访问数据库的用户名</td>
   </tr>
   <tr>
      <td>password</td>
      <td>指定访问数据库的密码</td>
   </tr>
   <tr>
      <td>driverClassName</td>
      <td>指定连接数据库的驱动程序名字</td>
   </tr>
   <tr>
      <td>url</td>
      <td>指定连接数据库的URL</td>
   </tr>
</table>

与JNDI不同的是，配置数据库连接池，除了在context.xml中配置以外，还需要在Web应用的web.xml中配置`<resource-ref>`元素：

web.xml

```
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  …
  <resource-ref>
       <description>DataSource</description>
  	   <res-ref-name> student</res-ref-name>
  	   <res-type>javax.sql.DataSource</res-type>
  	   <res-auth>Container</res-auth>
  </resource-ref>
</web-app>	
```

`<resource-ref>`元素中的`<description>`可以用来对配置的资源进行描述说明，其他的子元素值只需要和context.xml中`<Resource>`的相关值保持一致即可，具体如下：

`<res-ref-name>`值对应于`<Resource>`中的`name`值；

`<res-type>`值对应于`<Resource>`中的`type`值；

`<res-auth>`值对应于`<Resource>`中的`auth`值。

此外，还需要注意采用数据源方式访问数据库，数据源是由Tomcat创建并维护的，因此还需要把JDBC的驱动包（ojdbc5.jar）复制到Tomcat的`lib`目录下。

最后，我们修改StudentManagerWithJNDIPool项目的DBUtil.java文件，将传统的JDBC方式替换为数据源方式来访问数据库，如下，

DBUtil.java

```
package org.lanqiao.util;
//省略import
public class DBUtil
{
	private static Connection con = null;
	private static Statement stmt = null;

	// 通用的获取Statement对象的方法
	public static Statement createStatement() throws Exception
	{
		Context ctx = new InitialContext();
		DataSource ds=(DataSource)ctx.lookup("java:comp/env/student");
		con=ds.getConnection();		
		stmt = con.createStatement();
		return stmt;
	}
	//其他代码不变 
    …
}
```

运行此项目，运行结果与之前的完全相同。不同的是，使用连接池的方式来访问数据库，可以提高项目的性能。

我们总结一下，使用连接池实现数据库连接的步骤：

1.配置context.xml文件：在Tomcat的context.xml中加入`<Resource>`元素及相关属性；

2.配置web.xml文件：在项目的web.xml中`< resource-ref>`元素及相关属性；

3.给Tomcat的`lib`目录加入相应的数据库驱动；

4.编码查找数据源(使用`lookup()`方法)，实现连接数据库。

# 7.3文件上传 #















