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


**②DBCP数据源**

DBCP(DataBase connection pool,数据库连接池)，是Apache组织提供的一个开源连接池。以下是使用DBCP的具体方法：

使用DBCP前，需要先在项目中导入以下JAR包：

<table>
   <tr>
      <td>commons-dbcp.jar</td>
      <td>commons-pool.jar</td>
      <td>ojdbc6.jar（oracle驱动包）</td>
   </tr>
</table>

其中，**commons-dbcp.jar**中包含了DBCP的2个核心类：`BasicDataSource`和`BasicDataSourceFactory`。我们可以根据这两个类，设计出两种不同的DBCP实现方式：基于`BasicDataSource`的手动编码方式，以及基于`BasicDataSourceFactory`的配置文件方式。

**a. 基于`BasicDataSource`的手动编码方式**

`BasicDataSource`是`DataSource`（数据源）接口的实现类，包含了设置数据源对象的具体方法，如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>… void setDriverClassName(String driverClassName)</td>
      <td>设置连接数据库的驱动名</td>
   </tr>
   <tr>
      <td>… void void setUrl(String url)</td>
      <td>设置连接数据库的URL</td>
   </tr>
   <tr>
      <td>… void setUsername(String username)</td>
      <td>设置数据库的用户名</td>
   </tr>
   <tr>
      <td>… void setPassword(String password)</td>
      <td>设置数据库的密码</td>
   </tr>
   <tr>
      <td>… void setInitialSize(int initialSize)</td>
      <td>设置初始化时，连接池中的连接数量</td>
   </tr>
   <tr>
      <td>… void setMaxActive(int maxActive)</td>
      <td>设置连接池中，处于活动状态的数据库连接的最大数量</td>
   </tr>
   <tr>
      <td>… void setMinIdle(int minIdle)</td>
      <td>设置连接池中，处于空闲状态的数据库连接的最小数量</td>
   </tr>
   <tr>
      <td>… Collection getConnection ()throws SQLException</td>
      <td>从连接池中获取一个数据库连接</td>
   </tr>
</table>

可以先通过`BasicDataSource`构造方法产生一个数据源对象，再手动给数据源对象设置属性值，最后返回该数据源对象，如下：


**org.lanqiao.dbutil.DBCPDemo.java**

```
// package、import
public class DBCPDemo {
    //获取DBCP数据源对象
public static DataSource getDataSourceWithDBCP(){
		BasicDataSource basicDataSource = new BasicDataSource() ;
		//配置数据源中的数据库信息
		    basicDataSource
.setDriverClassName("oracle.jdbc.OracleDriver");
		basicDataSource.setUrl("jdbc:oracle:thin:@localhost:1521:XE");
		basicDataSource.setUsername("system");
		basicDataSource.setPassword("sa");
		//设置数据源中的连接池参数
		basicDataSource.setInitialSize(10);
		basicDataSource.setMaxActive(8);
		basicDataSource.setMinIdle(2);
		return basicDataSource ;
	 }
    //测试DBCP数据源
public static void main(String[] args) throws SQLException {
    //通过getDataSourceWithDBCP()方法，获取DBCP数据源对象
		DataSource ds = getDataSourceWithDBCP () ;
         //通过DBCP数据源对象，获取Connection对象
		Connection connection = ds.getConnection();
	     …
	}
…
```

以上，就是使用DBCP数据源获取连接对象（`connection`）的方法。有了连接对象`connection`以后，就可以通过`createStatement()`方法产生`Statement`对象（或者通过`prepareStatement()`方法产生`PreparedStatement`等），进而执行数据库访问。

**b. 基于`BasicDataSourceFactory`的配置文件方式**

`BasicDataSourceFactory`可以通过`createDataSource()`方法，从属性文件（Properties）中读取数据库配置信息，并获取数据库连接对象。`createDataSource()`方法的完整定义如下： 

```
public static DataSource createDataSource(Properties properties) 
throws Exception 
{
   …
}
```

**以下，是通过`BasicDataSourceFactory`方式获取DBCP数据源对象的具体代码：**

**<1>创建并编写配置文件**

**创建配置文件：**


在`src`上点击鼠标右键→ New→ File→ 输入dbcpconfig.properties→ Finish，如图：

![](http://i.imgur.com/J4lBIBg.png)



![](http://i.imgur.com/5cE9LSq.png)



**编写配置文件：dbcpconfig.properties**

```
driverClassName=oracle.jdbc.OracleDriver
url=jdbc:oracle:thin:@localhost:1521:XE
username=system
password=sa
initSize=10
maxActive=8
maxIdle=2
```

**<2>获取数据源对象**

```
// package、import
public class DBCPDemo {
	//获取DBCP数据源对象
	public  static DataSource getDataSourceWithDBCPByProperties () {
		DataSource basicDataSource = null ; 
		//创建一个配置文件对象props
		Properties props = new Properties();
		try{
		//将配置文件中的信息读取到输入流中
		InputStream input =new DBCPDemo().getClass().getClassLoader()
.getResourceAsStream("dbcpconfig.properties") ;
		//将配置文件中的信息，从输入流加载到props中
		props.load(input);
		//根据props中的配置信息，创建数据源对象
		 basicDataSource = BasicDataSourceFactory
.createDataSource(props) ;
		}catch(Exception e){
			e.printStackTrace();
		}
		return basicDataSource;
	}
	
	public static void main(String[] args) throws SQLException {
		DataSource ds1 = getDataSourceWithDBCPByProperties () ;
		Connection connection1 = ds1.getConnection();
		…
	}
}
```

**③C3P0数据源**

C3P0性能优越并易于扩展，是目前最流行、使用最广的数据源之一。著名的Hibernate、Spring等开源框架，使用的都是该数据源。C3P0实现了`DataSource`数据源接口，并提供了一个重要的实现类：`ComboPooledDataSource`，该类的常见方法如下表：

<table>
   <tr>
      <td>方法</td>
      <td>简称</td>
   </tr>
   <tr>
      <td>public ComboPooledDataSource()    public ComboPooledDataSource(String configName)</td>
      <td>构造方法，用于创建ComboPooledDataSource对象。</td>
   </tr>
   <tr>
      <td>public void setDriverClass(String driverClass )     throws PropertyVetoException
     throws PropertyVetoException</td>
      <td>设置连接数据库的驱动名</td>
   </tr>
   <tr>
      <td>public void setJdbcUrl( String jdbcUrl )</td>
      <td>设置连接数据库的URL</td>
   </tr>
   <tr>
      <td>public void setUser( String user )</td>
      <td>设置数据库的用户名</td>
   </tr>
   <tr>
      <td>public void setPassword( String password )</td>
      <td>设置数据库的密码</td>
   </tr>
   <tr>
      <td>public void setMaxPoolSize( int maxPoolSize )</td>
      <td>设置连接池的最大连接数目</td>
   </tr>
   <tr>
      <td>public void setMinPoolSize( int minPoolSize )</td>
      <td>设置连接池的最小连接数目</td>
   </tr>
   <tr>
      <td>public void setInitialPoolSize( int initialPoolSize )</td>
      <td>设置初始化时，连接池中的连接数量</td>
   </tr>
   <tr>
      <td>public Connection getConnection()    throws SQLException</td>
      <td>从连接池中获取一个数据库连接。该方法是由ComboPooledDataSource的父类AbstractPoolBackedDataSource提供。</td>
   </tr>
</table>

**可以发现，DBCP和C3P0的实现类都提供了3类方法：**

**(1)**设置数据库信息的方法；

**(2)**初始化连接池的方法()；

**(3)**获取连接对象的`getConnection()`方法。


与DBCP类似，在使用C3P0前，需要先导入以下JAR包：

<table>
   <tr>
      <td>c3p0-版本号.jar</td>
      <td>ojdbc版本号.jar</td>
   </tr>
   <tr>
      <td colspan="2">c3p0-oracle-thin-extras-版本号.jar  (如果不是oracle驱动，则无需此JAR)</td>
   </tr>
</table>

此外，C3P0也提供了手动编码及配置文件两种方式来获取数据源对象，具体如下:

**a.基于无参构造方法`ComboPooledDataSource()`的手动编码方式**

通过手动编码方式获取c3p0对象，依赖于无参构造方法`ComboPooledDataSource()`，如下：

**org.lanqiao.dbutil.C3P0Demo.java**

```
//package、import
public class C3P0Demo {
    //获取C3P0数据源对象
	public static DataSource getDataSourceWithC3p0 (){
		ComboPooledDataSource cpds = new ComboPooledDataSource();
		try{
			//设置数据库信息
			cpds.setDriverClass("oracle.jdbc.OracleDriver");
			cpds.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:XE");
			cpds.setUser("system");
			cpds.setPassword("sa");
			//设置连接池信息
			cpds.setInitialPoolSize(10);
			cpds.setMaxPoolSize(20);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return cpds;
	}
	
	public static void main(String[] args) throws SQLException {
		Connection connection = getDataSourceWithC3p0 ()
.getConnection();
		…
	}
}
```

**b.基于有参构造方法ComboPooledDataSource(String configName)的配置文件方式**

通过配置文件方式获取c3p0对象，依赖于有参构造方法`ComboPooledDataSource(String configName)`，如下：

**<1>创建并编写配置文件**

与DBCP不同，c3p0使用的是XML格式的配置文件，并且配置文件必须满足：

**①**存放于`src`根目录下；

**②**文件名是**c3p0-config.xml**。

在`src`下创建并编写一个**c3p0-config.xml**文件，如下：

**c3p0-config.xml**

```
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
      <!-- 默认配置 -->
	 <default-config>
	 	<property name="user">system</property>
		<property name="password">sa</property>
		<property name="driverClass">
oracle.jdbc.OracleDriver
</property>
		<property name="jdbcUrl">
jdbc:oracle:thin:@localhost:1521:XE
</property>
	 	<property name="checkoutTimeout">20000</property>
	 	<property name="initialPoolSize">10</property>
	 	<property name="maxIdleTime">15</property>
	 	<property name="maxPoolSize">20</property>
	 	<property name="minPoolSize">5</property>
	 </default-config>
 
     <!-- name为”lanqiao”的配置 -->
	 <named-config name="lanqiao">
	 	<property name="initialPoolSize">10</property>
	 	<property name="maxPoolSize">15</property>
	 	<property name="driverClass">
oracle.jdbc.OracleDriver</property>
	 	<property name="jdbcUrl">
jdbc:oracle:thin:@localhost:1521:XE
</property>
<!--此named-config中，没有配置user、password等信息，C3P0会自动寻找 default-config中的相应信息-->
	 </named-config>
 </c3p0-config>
```

可以发现，`<c3p0-config>`中包含了两套配置数据源信息： `<default-config>`和 `<named-config name="…">`。其中,`<default-config>`配置的是默认信息，而`<named-config name="…">`是自定义配置。一个`<c3p0-config>`中可以包含任意数量的`<named-config name="…">`，当包含一个或多个时，用户可以通过有参构造方法ComboPooledDataSource(String configName)中的参数configName来指定实际使用哪一个。此外，如果某些信息在`<named-config name="…">`中没有配置，那么c3p0就会自动使用`<default-config>`中的相应信息，例如user、password等。

**<2>获取数据源对象**

有参构造方法ComboPooledDataSource(String configName)会在**c3p0-config.xml**文件中的所有`<named-config name="…">`里，寻找name= configName的配置信息。

以下，通过ComboPooledDataSource("lanqiao")，指定**c3p0-config.xml**中`<named-config name="lanqiao">`的配置信息，并获取数据源对象。

**org.lanqiao.dbutil.C3P0Demo.java**

```
//package、import
public class C3P0Demo {
	//获取C3P0数据源对象
	public static DataSource getDataSourceWithC3p0ByXML (){
		ComboPooledDataSource cpds = 
new ComboPooledDataSource("lanqiao");
		return cpds ; 
	}
		
	public static void main(String[] args) throws SQLException {
		Connection connection = getDataSourceWithC3p0ByXML ()
.getConnection();
		…
	}
}
```

在实际开发中，经常会遇到DBCP或C3P0，因此可以将二者封装到一个工具类中，如下：


**org.lanqiao.dbutil. DataSourceUtil.java**

```
package org.lanqiao.dbutil;
import javax.sql.DataSource;
public class DataSourceUtil {
	//通过DBC手动编码方式，获取数据源对象
	public static DataSource getDataSourceWithDBCP() 
{   …   }
	//通过DBCP配置文件方式，获取数据源对象
	public static DataSource getDataSourceWithDBCPByProperties()
{   …   }
	//通过C3P0手动编码方式，获取数据源对象
	public static DataSource getDataSourceWithC3p0()
{   …   }
	//通过C3P0配置文件方式，获取数据源对象
	public static DataSource getDataSourceWithC3p0ByXML() 
{   …   }
}
```



# 7.2 commons-dbutils工具类库 #

在“三层架构”一章中，我们曾自己封装了`executeAddOrUpdateOrDelete()`和`executeQuery ()`等方法，并讨论过：对于“增删改”的通用方法`executeAddOrUpdateOrDelete(String sql ,Object[] os)`来说，只要传入sql参数和置换参数os，就能实现相应的增删改功能；但对于查询方法`executeQuery(String sql, Object[] os)`，为了能够“通用”，我们只能封装到结果集`ResultSet`，而不能继续封装成对象或集合等类型。在本小节，我们换一种方式，通过使用commons-dbutils类库可以发现：无论是“增删改”还是“查”都可以得到彻底的封装。


commons-dbutils 是 Apache 组织提供的一个JDBC工具类库，极大的简化了JDBC的代码量，并且不会影响程序的性能。

读者可以通过Apache官网下载commons-dbutils：

[http://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi](http://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi)

与下载其他类库一样，Binaries提供了可供使用类库及说明文件，Source提供了类库的源代码；并且Binaries和Source都提供了**.tar.gz**（Linux系统）和**.zip**（Windows系统）两种格式的压缩包供读者下载。

![](http://i.imgur.com/H5WvZ0c.png)

本节使用的是最新版commons-dbutils-1.6进行讲解。

**commons-dbutils**类库主要包含了两个类和一个接口，如下：

<table>
   <tr>
      <td>全名</td>
      <td>类或接口</td>
   </tr>
   <tr>
      <td>org.apache.commons.dbutils.DbUtils</td>
      <td>类</td>
   </tr>
   <tr>
      <td>org.apache.commons.dbutils.QueryRunner</td>
      <td>类</td>
   </tr>
   <tr>
      <td>org.apache.commons.dbutils.ResultSetHandler</td>
      <td>接口</td>
   </tr>
</table>

以下，是详细的说明。


## 7.2.1 `DbUtils`类 ##

DbUtils是一个工具类，提供了关闭连接、事务提交/回滚、注册JDBC驱动程序等常用方法。DbUtils类中的方法都是public static修饰的（除了构造方法），常用方法如下表：

<table>
   <tr>
      <td>方法(省略了public static)</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>①…void close(Connection conn)throws SQLException    ②…void close(ResultSet rs)throws SQLException    ③…void close(Statement stmt)throws SQLException</td>
      <td>关闭入参类型的连接（Connection、ResultSet或Statement），并在关闭时做相应的非空判断（如rs != null等）；此外，还会抛出方法执行期间所发生的异常。</td>
   </tr>
   <tr>
      <td>①…void closeQuietly(Connection  conn)    ②…void closeQuietly(Connection conn,Statement stmt,ResultSet rs)    ③…void closeQuietly(ResultSet rs)   ④…void closeQuietly(Statement stmt)</td>
      <td>关闭入参类型的连接，并在关闭时做相应的非空判断；此外，还会将异常信息隐藏起来，如左③的源码：

    … void closeQuietly(ResultSet rs)

    {

     try

    {

    // 调用上面的close()方法

    close(rs);   

    } catch (SQLException e)

    { 

    // 隐藏异常信息，不做任何处理

    }

     }</td>
   </tr>
   <tr>
      <td>①…void commitAndClose(Connection conn) throws SQLException    ②…void commitAndCloseQuietly(Connection conn)</td>
      <td>提交并关闭连接，并在关闭时做相应的非空判断；左①：会抛出方法执行期间所发生的异常。左②：会将异常信息隐藏起来。</td>
   </tr>
   <tr>
      <td>…boolean loadDriver(String driverClassName)</td>
      <td>根据传入的驱动名，加载并注册JDBC驱动程序。</td>
   </tr>
</table>

## 7.2.2 `QueryRunner`类 ##

`QueryRunner`类主要用于执行增删改差等SQL语句。特别的，如果执行的是查询SQL，还需要结合`ResultSetHandler`接口来处理结果集。`QueryRunner`类的常用方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>①public QueryRunner()  ②public QueryRunner(javax.sql.DataSource ds)</td>
      <td>构造方法，用于生成QueryRunner的实例对象。是否需要参数，取决于事务的管理方式：①当需要手动管理事务时，使用无参的构造方法；②当需要自动管理事务（每执行完一条SQL语句，都会自动执行一次commit()方法）时，使用DataSource作为参数的构造方法。</td>
   </tr>
   <tr>
      <td>public int update(参数列表)throws SQLException</td>
      <td>update()方法根据参数列表的不通，形成了很多重载的方法，常见有以下两种：①Connection conn, String sql, Object… params   ②Connection conn, String sql    各种重载的update()方法都是用于执行增加、修改或删除操作。其中，①中的可变参数params用来作为SQL语句的置换参数（替换SQL中的占位符？）；参数列表②中没有可变参数params，因此适用于没有占位符的SQL语句；</td>
   </tr>
   <tr>
      <td>public  &lt;T&gt; T query(参数列表)throws SQLException</td>
      <td>query()方法的参数列表有四种常见形式：
     ①Connection conn, String sql, ResultSetHandler&lt;T&gt; rsh, Object… params    ②Connection conn, String sql, ResultSetHandler&lt;T&gt; rsh
       ③String sql, ResultSetHandler&lt;T&gt; rsh,Object… params    ④String sql, ResultSetHandler&lt;T&gt; rsh    各种重载的query()方法都是用于执行查询操作。其中，③和④中没有Connection连接对象，此种情况下，可以从QueryRunner构造方法的DataSource参数中获得连接。query()方法需要结合ResultSetHandler接口来使用。</td>
   </tr>
</table>

## 7.2.3 `ResultSetHandler`接口及其实现类 ##

`ResultSetHandler`接口用于处理`ResultSet`结果集，它可以将结果集中的数据封装成单个对象、数组、List、Map等不同形式。 

**`ResultSetHandler`接口有很多不同的实现类，如下：**

![](http://i.imgur.com/r2lD68B.png)


本小节会对其中常用的10个实现类做详细讲解。

讲解时，需要先导入DbUtils包（**commons-dbutils-1.6.jar**），并使用我们之前编写过的两个类和一张表，如下：

**①数据源工具类DataSourceUtil**

**org.lanqiao.dbutil. DataSourceUtil.java**

```
package org.lanqiao.dbutil;
import javax.sql.DataSource;public class DataSourceUtil {
	//通过C3P0配置文件方式，获取数据源对象
	public static DataSource getDataSourceWithC3p0ByXML() 
{   …   }
…
}
```

**②实体类Student(JavaBean)**

**org.lanqiao.entity.Student.java**

```
package org.lanqiao.entity;
public class Student {
	private int stuNo;
	private String stuName;
	private int stuAge
    	//省略setter、getter
public Student() {
	}
    //构造方法
	public Student(int stuNo, String stuName, int stuAge) {
		this.stuNo = stuNo;
		this.stuName = stuName;
		this.stuAge = stuAge;
	}
	//重写toString()
	@Override
	public String toString() {
		return "学号:"+stuNo+",姓名:"+stuName+",年龄:"+stuAge;
	}
}
```

**③数据库中的student表**

表中的数据如下：

![](http://i.imgur.com/c05i0s8.png)

**接下来，结合`QueryRunner`类的`query()`方法，进行具体演示。**

**(1) `ArrayHandler`和`ArrayListHandler`**

**①**`ArrayHandler`类可以把结果集中的第一行数据封装成`Object[]`。例如，可以将student表中的第一行数据，封装成一个`Object[]`类型的`stu`对象，类似于`Object[] stu = new Object[]{15,”王五”,23}`，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
	public static void arrayHandlerTest(){
		//创建QueryRunner对象
QueryRunner runner = 	new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
             //使用query(String sql,ResultSetHandler<T> rsh)方法执行查询操作，并且传入ArrayHandler对象作为第二个参数
			Object[] studentObj = runner.query("select * from student",
 new ArrayHandler()) ;
			//将数组转为字符串，并输出
			System.out.println(Arrays.toString(studentObj));
		} catch (SQLException e) {
			e.printStackTrace();
		}
         catch (Exception e) {
			e.printStackTrace();
		}
	}
	//测试
	public static void main(String[] args) {
		arrayHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/6HuJZZc.png)

可以发现，`ArrayHandler`只能封装结果集中的第一行数据，如果想封装结果集中的全部数据，就需要使用`ArrayListHandler`。

**②**`ArrayHandler`类可以把结果集中每一行数据都封装成一个`Object[]`对象，然后再将所有的`Object[]`组装成一个`List`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
	public static void arrayListHandlerTest(){
		//创建QueryRunner对象
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//使用query(String sql,ResultSetHandler<T> rsh)方法执行查询
操作，并且传入ArrayHandler对象作为第二个参数
			List<Object[]> studentObjList = runner.query("select * 
from student", new ArrayListHandler()) ;
			//将数组转为字符串，并输出
			for(Object[] studentObj:studentObjList){
				System.out.println(Arrays.toString(studentObj));
			}
		} catch (…) {…}
	}
	//测试
	public static void main(String[] args) {
		arrayListHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/ItzjKRo.png)

**(2) BeanHandler&lt;T&gt; 、BeanListHandler&lt;T&gt;和BeanMapHandler&lt;K,V&gt;**


`ArrayHandler`和`ArrayListHandler`是将结果集中的数据封装成`Object[]`对象，而`BeanHandler<T>`、`BeanListHandler<T>`和`BeanMapHandler<K,V>`可以将结果集中的数据封装成JavaBean对象，并且通过泛型指定具体的JavaBean类型。

**①BeanHandler&lt;T&gt;**

`BeanHandler<T>`类可以把结果集中的第一行数据封装成JavaBean。例如，可以将student表中的第一行数据，封装成一个Student类型的`stu`对象，类似于`Student stu = new Student(15,”王五”,23)`，如下：


**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
	public static void beanHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//使用query(String sql,ResultSetHandler<T> rsh)方法执行查询
操作，传入BeanHandler对象作为第二个参数，并通过泛型指定封装
的JavaBean类型是Student
			Student stu = runner.query("select * from student", 
new BeanHandler<Student>(Student.class)) ;
			//默认调用Student的toString()方法进行输出
			System.out.println(stu);
		} catch (…) {…}
	}
	//测试
	public static void main(String[] args) {
         …
		beanHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/YhEgBIm.png)

可以发现，`BeanHandler<T>`只能封装结果集中的第一行数据，如果想封装结果集中的全部数据，就需要使用`BeanListHandler<T>`。


**②BeanListHandler&lt;T&gt;**

`BeanListHandler<T>`类可以把结果集中每一行数据都封装成一个JavaBean对象，然后再将所有的JavaBean对象组装成一个`List`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void beanListHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			List<Student> stus = runner.query("select * from student", 
new BeanListHandler<Student>(Student.class)) ;
			System.out.println(stus);
		} catch (…) {…}
	}
	//测试
	public static void main(String[] args) {
         …
		beanListHandlerTest();
	}
}
```

运行结果（只显示了部分结果）：

![](http://i.imgur.com/86lvOSZ.png)


**③BeanMapHandler&lt;T&gt;**

与`BeanListHandler<T>`类似，`BeanMapHandler<T>`也会把结果集中每一行数据都封装成一个JavaBean对象，但不同的是：`BeanMapHandler<T>`会将所有的JavaBean对象组装成一个`Map`对象，如下：


**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void beanMapHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
             //通过泛型指定Map的key类型是：BigDecimal;valuel类型是：Student。
再通过构造方法的第二个参数，指定用表中的“stuNo”列作为Map的key。
			Map<BigDecimal,Student> stusMap 
= runner.query("select * from student", 
new BeanMapHandler<BigDecimal,Student>
(Student.class,"stuNo")) ;
             //获取map中key值为15的学生
			Student stu = stusMap.get(new BigDecimal(15));
			System.out.println(stu);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
         …
		beanMapHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/hUGyx5C.png)

**说明：**

**问**：此程序中，`Map`的`key`值为什么是`BigDecimal`类型，而不是`Integer`?

**答**：本程序采用的是Oracle数据库，stuNo列在表中的类型是：NUMBER(3)。Oracle在处理NUMBER类型时比较特殊：如果发现存储的是整数（如果数字15），则会默认映射为`BigDecimal`类型，而不是Integer。


**(3) MapHandler、 MapListHandler和KeyedHandler**

**①MapHandler**

MapHandler可以将结果集中的第一条数据封装到`Map`对象中，并且`key`是字段名，`value`是字段值，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void mapHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中的第一条数据封装到Map对象中
			Map<String,Object> stuMap = runner.query(
"select * from student", new MapHandler()) ;
			System.out.println(stuMap);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
…
		mapHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/xgSjr2W.png)

**②MapListHandler**

MapListHandler可以将结果集中的每一条数据都封装到`Map`对象中，并且`key`是字段名，`value`是字段值；然后再将所有的`Map`对象组装成一个`List`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    public static void mapListHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中的每一条数据都封装到Map对象中
			List<Map<String,Object>> stusMap = runner.query(
"select * from student", new MapListHandler()) ;
			System.out.println(stusMap);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
…
		mapListHandlerTest();
	}
}
```

运行结果（只显示了部分结果）：

![](http://i.imgur.com/0iFMvDH.png)


**③KeyedHandler**

KeyedHandler可以将结果集中的每一条数据都封装到`Map`对象中，并且`key`是字段名，`value`是字段值；然后再将所有的`Map`对象组装成一个范围更大的`Map`对象，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
    …
    	public static void keyedHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中的每一条数据都封装到Map对象中
			Map<String,Map<String,Object>> stusMap = runner.query(
"select * from student", 
new KeyedHandler<String>("stuName")) ;
			System.out.println(stusMap);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
…
		keyedHandlerTest();
	}
}
```

运行结果（只显示了部分结果）：

![](http://i.imgur.com/sOzOr4C.png)


**(4)ColumnListHandler&lt;T&gt;**

`ColumnListHandler <T>`可以把结果集中某一列的值封装到`List`集合中，如下：


**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
…
public static void columnListHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//将结果集中“stuName”一列的值封装到了List集合对象中：
			List<String> names = runner.query("select * from student", 
new ColumnListHandler<String>("stuName")) ;
			//默认调用Student的toString()方法进行输出
			System.out.println(names);
		} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
        …
	   columnListHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/q8BSDtD.png)

**(5) ScalarHandler&lt;T&gt;**

如果执行的是单值查询，如`select count(*) from student`或`select name from student where id = 15`等结果为单值得查询，就需要使用`ScalarHandler<T>`类，如下：

**org.lanqiao.dbutil.ResultSetHandlerDemo.java**

```
//package、import
public class ResultSetHandlerDemo {
…
    public static void scalarHandlerTest(){
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		try {
			//单值查询：查询学生总人数
			BigDecimal count = runner.query("select count(*) 
from student", new ScalarHandler<BigDecimal>()) ;
			System.out.println(count);
			//单值查询：查询学号为15的学生姓名
			String stuName = runner.query("select stuName from student
 where stuNo = 15", new ScalarHandler<String>()) ;
			System.out.println(stuName);		
} catch (…) {…}
	}
	
	//测试
	public static void main(String[] args) {
  …
		scalarHandlerTest();
	}
}
```

运行结果：

![](http://i.imgur.com/S0E5WTp.png)

**以上就是ResultSetHandler接口的10个实现类的具体用法。为了方便读者对比记忆，现做以下总结：**


<table>
   <tr>
      <td>ResultSetHandler接口的实现类</td>
      <td>简介</td>
      <td>共同点</td>
   </tr>
   <tr>
      <td>ArrayHandler</td>
      <td>将第一行数据封装成Object[]</td>
      <td rowspan="3">封装结果集中的第一行数据，适用于只有一条查询结果的SQL，如：select * from student where id = 15</td>
   </tr>
   <tr>
      <td>BeanHandler&lt;T&gt;</td>
      <td>将第一行数据封装成JavaBean</td>
   </tr>
   <tr>
      <td>BeanMapHandler</td>
      <td>将第一条数据封装成Map&lt;列名类型,列值类型&gt;</td>
   </tr>
   <tr>
      <td>ArrayListHandler</td>
      <td>将所有数据封装成List&lt;Object[]&gt;</td>
      <td rowspan="6">封装结果集中的全部数据，适用于有多条查询结果的SQL，如：select * from student</td>
   </tr>
   <tr>
      <td>ColumnListHandler&lt;T&gt;</td>
      <td>将某一列的所有数据，封装成List&lt;某一列的类型&gt;</td>
   </tr>
   <tr>
      <td>MapListHandler</td>
      <td>将所有数据封装成List&lt;Map&lt;列名类型,列值类型&gt;&gt;</td>
   </tr>
   <tr>
      <td>KeyedHandler&lt;K&gt;</td>
      <td>将所有数据封装成Map&lt;某一列的Java类型,Map&lt;列名类型,列值类型&gt;&gt;</td>
   </tr>
   <tr>
      <td>BeanListHandler&lt;T&gt;</td>
      <td>将所有数据封装成List&lt;JavaBean&gt;</td>
   </tr>
   <tr>
      <td>BeanMapHandler&lt;K, V&gt;</td>
      <td>将所有数据封装成Map&lt;某一列的Java类型,JavaBean&gt;</td>
   </tr>
   <tr>
      <td>ScalarHandler&lt;T&gt;</td>
      <td>获取单值</td>
      <td>单值查询</td>
   </tr>
</table>

## 7.2.4 增删改操作 ##


现在，我们再对`QueryRunner`类中，用于增删改的`update()`方法做以演示，如下：

**org.lanqiao.dbutil.UpdateDemo.java**

```
package org.lanqiao.dbutil;
import java.sql.SQLException;
import org.apache.commons.dbutils.QueryRunner;
public class UpdateDemo {
	//增加
	public static void insertTest() {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
        //增加的SQL语句
		String insertSql = "insert into student(stuNo,stuName,stuAge)
 values(?,?,?)";
         //SQL语句中的置换参数
		Object[] params = {35,"赵六",66};
		try {
             //增删改的通用方法update()
			int count = runner.update(insertSql,params) ;
			System.out.println("成功增加"+count+"条数据");
		} catch (…) {…}
	}
	
	//删除
	public static void deleteTest() {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		String deleteSql = "delete from student where stuNo = 35";
		try {
			int count = runner.update(deleteSql) ;
			System.out.println("成功删除"+count+"条数据");
		} catch (…) {…}
	}
	
	//修改
	public static void updateTest() {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		String updateSql = "update student set stuName = ?  ,stuAge = ?
 where stuNo = ?";
		Object[] params = {"孙琪",27,35};
		try {
			int count = runner.update(updateSql,params) ;
			System.out.println("成功修改"+count+"条数据");
		} catch (…) {…}
	}

	// 测试   
	public static void main(String[] args) {
		insertTest();
		updateTest();
		deleteTest();
	}
}
```

运行结果：

![](http://i.imgur.com/16U5Tcz.png)

## 7.2.5 手动处理事务 ##

**(1) ThreadLocal&lt;T&gt;**

在学习事务处理之前，我们有必要先了解一下`ThreadLocal<T>`类。
	
ThreadLocal可以为变量在每个线程中都创建了一个副本，每个线程可以访问自己内部的副本变量。因此，ThreadLocal被称为线程本地变量（或线程本地存储）。
	
先看下面一个例子：

```
public class ConnectionManager {
	  private static Connection conn = null;
	     public static Connection getConnection() throws …{
	        if(conn == null){
	            conn = DriverManager.getConnection(...);
	        }
	        return conn;
	    }
	     
	    public static void closeConnection() throws …{
	        if(conn!=null)
	            conn.close();
	    }
}
```

这段代码在单线程中使用没有任何问题；但如果是在多线程中使用，就存在线程安全问题，例如：

**①**因为conn是静态全局变量（用于共享），那么就有可能在一个线程使用conn操作数据库时，另外一个线程也同时在调用`closeConnection()`关闭链接；

**②**如果多个线程同时进入if语句，那么在`getConnection()`方法中就会多次创建`conn`对象。对于这样的线程问题，读者可能会想到用“线程同步”来解决：将conn变量、`getConnection()`和`closeConnection()`进行同步处理。对于本例，“线程同步”虽然可以解决问题，但却会造成极大的性能影响：当一个线程在使用conn访问数据库时，其他线程只能等待。

我们仔细来分析这个问题：本例的线程安全问题，实质是因为conn变量、`getConnection()`和`closeConnection()`都是共享的static变量（或方法）而造成的，那么此三者如果不是共享的static呢？实际上，一个线程只需要维护自己的conn变量，而不需要关心其他线程是否对各自的conn进行了修改。因此，不是staitc也可以，如下：

```
public class ConnectionManager {
	// 没有static修饰
	private Connection conn = null;
	// 没有static修饰
	public Connection getConnection() throws SQLException {
		if (conn == null) {
			conn = DriverManager.getConnection("...");
		}
		return conn;
	}
	// 没有static修饰
	public void closeConnection() throws SQLException {
		if (conn != null)
			conn.close();
	}
}
class Dao{
    public void insert() throws SQLException {
      	//将connectionManager和conn定义为局部变量
        ConnectionManager connectionManager = new ConnectionManager();
        Connection conn = connectionManager.getConnection();
        //使用conn访问数据库...
        connectionManager.closeConnection();
    }
}
```

以上，将conn及相关方法的static修饰符去掉，然后在每个使用conn的方法中（如`insert()`）都创建局部变量。这样一来，因为每次都是在方法内部创建的连接，那么线程之间自然不存在线程安全问题。但是，由于在方法中需要频繁地开启和关闭数据库连接，就会导致服务器压力非常大，并且严重影响程序执行性能。

如何既不影响性能，也能避免线程安全问题？使用`ThreadLocal<T>`！`ThreadLocal<T>`在每个线程中对该变量会创建一个副本；即每个线程内部都会有一个该变量的副本，该副本在线程内部任何地方都可以共享使用，但不同线程的副本之间互不影响。

**`ThreadLocal<T>`类中有以下几个方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public T get()</td>
      <td>获取ThreadLocal在当前线程中保存的变量副本</td>
   </tr>
   <tr>
      <td>public void set(T value)</td>
      <td>设置当前线程中变量的副本</td>
   </tr>
   <tr>
      <td>public void remove()</td>
      <td>移除当前线程中变量的副本</td>
   </tr>
   <tr>
      <td>protected T initialValue()</td>
      <td>延迟加载的方法，一般在使用时重写该方法。</td>
   </tr>
</table>


`ThreadLocal<T>`类的具体使用，我们会在“手动处理事务”中进行演示。

**(2)手动处理事务**

前面讲过，**如果使用`QueryRunner`类的无参构造，我们就需要手动管理事务；如果使用有参构造`QueryRunner(DataSource ds)`，DbUtils就会替我们自动管理事务。**之前演示的增删改查，使用的都是有参构造，即自动管理事务；以下，就来讲解如何使用无参构造来实现手动的事务管理。

通过模拟一个“银行转账”的事务，演示具体的步骤：

**①创建银行账户表**

创建银行账户表account，并增加两条数据，如下：

![](http://i.imgur.com/vuItZpg.png)


**②创建实体类**

创建与account表对应的实体类**Account.java**，如下：


**org.lanqiao.entity.Account.java**

```
package org.lanqiao.entity;
public class Account {
	private int id ;
	private String name; 
	private double balance ;
//setter、getter
}
```

**③创建JDBC工具类**

创建JDBCUtil类，用于提供创建连接、开启事务、提交事务、关闭连接等方法。我们知道，一个事务对应一个Connection，但一个事务可能涉及多个DAO操作。如果DAO操作中的Connection是从连接池获取，那么多个DAO操作就会用到多个Connection，这样是无法完成一个事务的（一个事务用到了多个Connection）。因此，需要使用`ThreadLocal<T>`类。

我们可以生成一个`Connection`对象，然后放在ThreadLocal中，那么这个线程中的任何对象都可以共享这个`Connection`对象，最后在线程结束后删除这个连接。这样就保证了一个事务一个连接。如下：

**org.lanqiao.dbutil.JDBCUtil.java**

```
//package、import
public class JDBCUtil {
	// 定义ThreadLocal对象，用于存放Connection对象
	private static ThreadLocal<Connection> threadLocal 
= new ThreadLocal<Connection>();
	// 定义数据源对象
	private static DataSource ds = new ComboPooledDataSource();

	// 获取c3p0数据源对象(从c3p0-config.xml中读取默认的数据库配置)
	public static DataSource getDataSource() {
		return ds;
	}

	// 从c3p0连接池中，获取Connection连接对象
	public static Connection getConnection() {
		Connection conn = threadLocal.get();
		try {
			if (conn == null) {
				conn = ds.getConnection();
			}
			threadLocal.set(conn);
		} catch (…) {…}
		return conn;
	}

	// 开启事务
	public static void beginTransaction() {
		Connection conn = getConnection();
		try {
			// 手动开始事务
			conn.setAutoCommit(false);
		} catch (…) {…}
	}

	// 提交事务
	public static void commitTransaction() {
		Connection conn = threadLocal.get();
		try {
			if (conn != null) {
				// 提交事务
				conn.commit();
			}
		} catch (…) {…}
	}

	// 回滚事务
	public static void rollbackTransaction() {
		Connection conn = threadLocal.get();
		try {
			if (conn != null) {
				// 回滚事务
				conn.rollback();
			}
		} catch (…) {…}
	}
     // 关闭连接
	public static void close() {
		Connection conn = threadLocal.get();
		try {
			if (conn != null) {
				conn.close();
			}

		} catch (…) {…}
finally {
			// 从集合中移除当前绑定的连接
			threadLocal.remove();
			conn = null;
		}
	}
}
```

**④创建DAO层**

创建用于模拟用户查询、转入、转出等数据库操作的DAO层，如下：

**接口：**

**org.lanqiao.dao.IAccountDao.java**

```
import org.lanqiao.entity.Account;
public interface IAccountDao {
    //根据姓名，查询账户
	public abstract Account queryAccountByName(String name)
 throws SQLException;
    //修改账户（增加余额、减少余额）
public abstract void updateAccount(Account account) 
throws SQLException;
}
```

**实现类：**

**org.lanqiao.dao.impl.AccountDaoImpl.java**

```
//package、import
public class AccountDaoImpl implements IAccountDao{
	@Override
	public Account queryAccountByName(String name)throws SQLException {
		QueryRunner runner = new QueryRunner();
		Connection conn = JDBCUtil.getConnection();
		String querySql = "select * from account where name = ?" ;
		Object[] params = {name} ;
		Account account = null ; 
		account = runner.query(conn, querySql,
new BeanHandler<Account>(Account.class),params);
		return account;
	}

	@Override
	public void updateAccount(Account account) throws SQLException {
		QueryRunner runner = new QueryRunner(
DataSourceUtil.getDataSourceWithC3p0ByXML());
		Connection conn = JDBCUtil.getConnection() ;
		String updateSql = "update account set balance = ? where name = ?" ;
		Object[] params = { account.getBalance(), account.getName() };
		runner.update(conn, updateSql, params);
	}
}
```

**⑤创建Service层**

模拟转账业务操作，如下：

**接口：org.lanqiao.service.IAccountService.java**

```
public interface IAccountService {
	public abstract void transfer(String fromAccountName,
String toAccountName,double transferMoney);
}
```

**实现类：org.lanqiao.service.impl.AccountServiceImpl.java**

```
//package、import
public class AccountServiceImpl implements IAccountService {
	public void transfer(String fromAccountName, String toAccountName,
 double transferMoney) {
		try {
			// 开启事务
			JDBCUtil.beginTransaction();
			IAccountDao accountDao = new AccountDaoImpl();
			// 付款方
			Account fromAccount = accountDao
.queryAccountByName(fromAccountName);
			// 收款方
			Account toAccount = accountDao
.queryAccountByName(toAccountName);
			// 转账
			if (transferMoney < fromAccount.getBalance()) {
				// 付款方的余额减少
				double fromBalance = fromAccount.getBalance() 
- transferMoney;
				fromAccount.setBalance(fromBalance);
				// 收款方的余额增加
				double toBalance = toAccount.getBalance() + transferMoney;
				toAccount.setBalance(toBalance);
				// 更新账户
				accountDao.updateAccount(fromAccount);
				accountDao.updateAccount(toAccount);
				System.out.println("转账成功");
				// 提交事务
				JDBCUtil.commitTransaction();
				System.out.println("提交成功");
			} else {
				System.out.println("余额不足，转账失败！");
			}
		} catch (SQLException e) {
			System.out.println("提交失败！回滚...");
			// 回滚事务
			JDBCUtil.rollbackTransaction();
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 关闭事务
			JDBCUtil.close();
		}
	}
}
```

**⑥测试**

编写`main()`方法，测试转账业务，如下

**org.lanqiao.test.TestAccountTransfer.java**

```
//package、import
public class TestAccountTransfer {
	public static void main(String[] args) {
		IAccountService accountService = new AccountServiceImpl();
         //张三给李四转账1000.0元
		accountService.transfer("张三", "李四", 1000.0);
	}
}
```

测试之前，accout表的数据如下：

![](http://i.imgur.com/gmjTGxO.png)

执行`main()`方法进行测试，运行结果：

![](http://i.imgur.com/ORkwuHA.png)

此时，account表的数据如下：

![](http://i.imgur.com/NpnfhOV.png)

可以看出，转账功能已经成功实现了。



# 7.3文件上传 #

在Java Web中，有很多文件上传的工具，我们以常用的Commons-FileUpload组件为例，进行详细的讲解。

## 7.3.1使用 Commons-FileUpload实现文件上传 ##

Commons是Apache组织的一个项目，除了文件上传以外，Commons还提供了命令行处理、数据库连接池等功能。

Commons-FileUpload不但能方便的实现文件上传功能，还可以获取上传文件的各种信息（如文件的名称、类型、大小等），并能对上传的文件进行一些控制（如限制上传的类型、大小等）。

在实际使用之前，我们需要先下载Commons-FileUpload的JAR文件（下载地址[http://commons.apache.org/proper/commons-fileupload/)](http://commons.apache.org/proper/commons-fileupload/)）。此外，因为文件上传必然会涉及到文件的读写操作，所以还需要下载Commons-IO的JAR文件（下载地址[http://commons.apache.org/proper/commons-io/)](http://commons.apache.org/proper/commons-io/)）。将这两个文件下载后解压，分别找到commons-fileupload-1.3.1.jar和commons-io-2.4.jar，并将这两个`jar`加入到Web项目的`lib`目录内即可。

下面，通过示例详细讲解Commons-FileUpload的使用。本示例的项目名为StudentManagerWithFileUpload，该项目基于之前的StudentManagerWithJNDIPool项目。

**(1)文件上传前台**

文件上传的前台是通过表单实现的，但上传文件与一般文本类型的编码类型不同。需要在表单中增加`enctype=”multipart/form-data”`属性和值，用于将表单设置为文件上传所需要的编码类型。此外，还必须将method设置为`post`方式，并且通过`input`标签的`type=”file”`来加入上传控件，如下，

在增加学生页面addStudent.jsp中，加入文件上传的前台代码：

```
    …
<%-- 在form中设置文件上传的enctype属性 --%>
		<form action="AddStudentServlet" 
enctype="multipart/form-data" method="post">
			学号：<input type="text" name="sno" /><br/>
			姓名：<input type="text" name="sname" /><br/>
			年龄：<input type="text" name="sage" /><br/>
			年级：<input type="text" name="gname" /><br/>
			<%--上传文件 --%>
			上传照片：<input type="file" name="sPictrue" />
			<input type="submit" value="增加" /><br/>
		</form>
```

运行结果：

![](http://i.imgur.com/oJ2fEZe.jpg)

*图7-04*

**(2)文件上传后台**

①ServletFileUpload类的常用方法：

<table>
   <tr>
      <td></td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void setSizeMax(long sizeMax)</td>
      <td>设置上传数据的最大允许的字节数</td>
   </tr>
   <tr>
      <td>public List&lt;FileItem&gt; parseRequest(HttpServletRequest request)</td>
      <td>解析form表单中的每个字段的数据，并将所有字段数据分别包装成独立的FileItem对象，再将这些FileItem对象封装到一个List集合并返回</td>
   </tr>
   <tr>
      <td>public static final boolean isMultipartContent</td>
      <td>判断请求消息中的内容是否是“multipart/form-data”类型</td>
   </tr>
</table>

②FileItem接口的常用方法：

FileItem对象用于封装单个表单字段元素的数据，一个表单字段元素对应一个FileItem对象。FileItem是一个接口，通常使用它的实现类DiskFileItem类。

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>boolean isFormField()</td>
      <td>判断FileItem对象里面封装的数据是一个普通文本表单字段（返回true），还是一个文件表单字段（返回false）。</td>
   </tr>
   <tr>
      <td>String getName()</td>
      <td>获得文件上传字段中的文件名;普通表单字段返回null。</td>
   </tr>
   <tr>
      <td>String getFieldName()</td>
      <td>获取表单字段元素的name属性值。</td>
   </tr>
   <tr>
      <td>void write(File file)  throws Exception</td>
      <td>将FileItem对象中的内容保存到某个指定的文件中。</td>
   </tr>
   <tr>
      <td>String getString()</td>
      <td>将FileItem对象中保存的数据流内容以一个字符串返回。它有两个重载形式，public String getString()和public String getString(String encodeing)。前者使用缺省的字符集编码将主体内容转换成字符串，后者使用参数指定的字符集编码。如果在读取普通表单字段元素的内容时，出现了乱码现象，可以调用第二个方法。</td>
   </tr>
   <tr>
      <td>long getSize()</td>
      <td>返回单个上传文件的字节数。</td>
   </tr>
</table>


③FileItemFactory接口的常用方法：

`ServletFileUpload`对象的创建，需要依赖于FileItemFactory接口，并且可以从接口名得知FileItemFactory是一个工厂。我们通常使用的是`FileItemFactory`的实现类`DiskFileItemFactory`类。

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void   setSizeThreshold(int sizeThreshold)</td>
      <td>文件上传组件在解析上传数据中的每个字段内容时，需要临时保存解析出的数据，以便在后面进行数据的进一步处理。如果上传的文件很大，例如1000M的文件，在内存中将无法临时保存该文件内容，文件上传组件转而采用临时文件来保存这些数据；但如果上传的文件很小，例如100个字节的文件，显然将其直接保存在内存中性能会更加好些。  setSizeThreshold()方法用于设置将上传文件以临时文件的形式保存在磁盘的临界值（以字节为单位）；如果没有设置此临界值，将会采用系统默认值10KB。</td>
   </tr>
   <tr>
      <td>public void  setRepository(File repository)</td>
      <td>设置当上传文件尺寸大于setSizeThreshold()方法设置的临界值时，将文件以临时文件形式保存在磁盘上的存放目录。</td>
   </tr>
</table>

现在，就来编写实现上传的后台代码。

AddStudentServlet.java

```
package org.lanqiao.servlet;
// 省略import
public class AddStudentServlet extends HttpServlet
{
	…
	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		request.setCharacterEncoding("utf-8");
		// 使用out.println()之前，需要使用setContentType()方法设置编码
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		// 上传的文件名
		String uploadFileName = "";
		// 表单字段元素的name属性值
		String fieldName = "";
		// 请求信息request中的内容是否是multipart类型
		boolean isMultipart 
= ServletFileUpload.isMultipartContent(request);
		// 上传文件的存储路径（Web应用在tomcat部署路径中的upload目录，）
		String uploadFilePath 
= request.getSession().getServletContext()
.getRealPath("upload/");
		if (isMultipart)
		{
			FileItemFactory factory = new DiskFileItemFactory();
			// 通过FileItemFactory对象，产生ServletFileUpload对象
			ServletFileUpload upload = new ServletFileUpload(factory);
			try
			{
				// 保存学生信息的属性值
				int studentNo = -1;
				String studentName = null;
				int studentAge = -1;
				String gradeName = null;
				// 解析form表单中所有字段元素
				List<FileItem> items = upload.parseRequest(request);
				// 遍历form表单的每一个字段元素
				Iterator<FileItem> iter = items.iterator();
				while (iter.hasNext())
				{
					FileItem item = (FileItem) iter.next();
					// 如果是普通表单字段
					if (item.isFormField())
					{
						// 获取表单字段的name属性值
						fieldName = item.getFieldName();
						// 依次处理每一个字段
						if (fieldName.equals("sno"))
						{
							String studentNoStr = item.getString("UTF-8");
							studentNo = Integer.parseInt(studentNoStr);
						}
						else if (fieldName.equals("sname"))
						{
							studentName = item.getString("UTF-8");
						}
						else if (fieldName.equals("sage"))
						{
							String studentAgeStr 
= item.getString("UTF-8");
							studentAge = Integer.parseInt(studentAgeStr);
						}
						else if (fieldName.equals("gname"))
						{
							gradeName = item.getString("UTF-8");
						}

					}
					else
					// 文件表单字段
					{
						// 获取正在上传的文件名
						String fileName = item.getName();
						if (fileName != null && !fileName.equals(""))
						{
							File saveFile
 = new File(uploadFilePath, fileName);

							item.write(saveFile);
				     		out.println("增加学生信息及图片上传成功！");
                             return ;
						}
					}
				}
				// 将数据封装到实体类中
				Student stu = new Student(studentNo, 
studentName, studentAge, gradeName);
				// 调用业务逻辑层代码
				IStudentService stuService = new StudentServiceImpl();
				boolean result = stuService.addStudent(stu);
…
	}
}
```

通过代码可以发现，如果请求的表单中如果增加了`enctype="multipart/form-data"`来设置类型，就不能再用`request.getParameter()`来接收表单参数，而应该使用FileItem的`getString()`方法结合`if`判断来接收。

在运行项目前，我们先在tomcat服务器的项目部署目录中新建一个upload文件夹，用于接收上传的文件，如图，

![](http://i.imgur.com/zRpTAoq.png)

*图7-05*

然后执行addStudent.jsp，输入学生信息并上传一个名为abc.png的图片，运行结果：

![](http://i.imgur.com/n2A9GYl.png)

*图7-06*

查看upload目录，可以看到文件已经正确上传。

说明：

读者可以尝试，如果修改服务器AddStudentServlet.java中的代码，再重启tomcat，那么tomcat中的upload目录就会消失。这是因为我们之前将Tomcat的Server Locations设置为了第二项“Use Tomcat installation”，这样会使得每次tomcat重启时都会检查项目是否有改动，如果有，就会重新编译并部署项目，所以会导致用户自己建立的upload目录消失。解决办法可以简单的将Server Locations改为其他选项，或使用虚拟路径来解决，或直接将upload目录放置到tomcat目录外的任一路径，读者可以自行尝试。

而如果服务器AddStudentServlet.java中的代码没有修改，再次重启tomcat，因为代码没修改，因此就不会重新编译部署，所以upload就不会被删除。

## 7.3.2使用 Commons-FileUpload控制文件上传 ##

为了提高系统的安全和性能，我们经常需要对上传的文件进行一些控制，如控制上传文件的类型、大小等。

**(1)控制上传文件的类型**

我们已经知道，可以通过FileItem的`getName()`方法获取上传文件的文件名（如abc.png，日记.txt，阿甘正传.rmvb），而文件的类型就是通过”.”后面的字符控制的（如png、jpg、bmp等是图片格式，txt是一种文本文档格式，rmvb是一种电影格式等）。因此，我们只需要将文件名”.”后面的内容进行截取，然后判断截取后的内容是否符合要求即可，具体如下，

AddStudentServlet.java

```
	protected void doPost(HttpServletRequest request, 
HttpServletResponse response)
 throws ServletException, IOException
	{
        …
        PrintWriter out = response.getWriter();
		// 获取正在上传的文件名
		String fileName = item.getName();
		if (fileName != null && !fileName.equals(""))
		{
		   //获取文件类型（即文件的扩展名）
		   String ext = ileName.substring(fileName.lastIndexOf(".")+1);
			//控制文件的格式只能是 gif、bmp或jpg类型的
			if(!("png".equals(ext) || "bmp".equals(ext)
 || "jpg".equals(ext)))
			{	
			     out.println("增加学生信息或图片上传失败！
<br/>文件类型必须是png、bmp或jpg!<br/>");
				 return ;
			}
									
			File saveFile = new File(uploadFilePath, item.getName());
			item.write(saveFile);
										
			out.println("增加学生信息及图片上传成功！");
			return ;
	}
```

如果上传一张图片abc.png，则提示上传成功；但如果上传一个文本文档如oracle.txt，则提示“…失败！文件类型必须是png、bmp或jpg! 

**(2)控制上传文件的大小**

前面讲过，我们可以通过DiskFileItemFactory的`setSizeThreshold()`方法来设置缓冲区大小，并且当上传的文件超过缓冲区大小时，可以临时存储在由`setRepository()`方法设置的临时文件目录中。此外，可以通过ServletFileUpload的`setSizeMax()`来限制单个上传文件的最大字节数。设置完成以后，执行`ServletFileUpload.parseRequest()`方法时，如果发现正在上传的文件超过了`setSizeMax()`设置的最大值，则就会抛出一个FileUploadBase.SizeLimitExceededException类型的异常。因此上传时如果抛出了此异常，就说明上传的文件超出了最大值。控制上传文件大小的具体代码，如下，

AddStudentServle

```
package org.lanqiao.servlet;
// 省略import
public class AddStudentServlet extends HttpServlet
{
	protected void doPost(HttpServletRequest request,
                               HttpServletResponse response) 
throws ServletException, IOException
	{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		…
		if (isMultipart)
		{
			// 限制上传文件的大小
			DiskFileItemFactory diskFileItemFactory 
= new DiskFileItemFactory();
			// 创建临时文件目录路径
			File tempPath = new File("d:\\temp");
			// 设置缓冲区大小为10KB
			diskFileItemFactory.setSizeThreshold(10240);
			// 设置上传文件用到临时文件存放路径
			diskFileItemFactory.setRepository(tempPath);

			ServletFileUpload upload 
= new ServletFileUpload(diskFileItemFactory);
			// 设置上传单个文件的最大值是20KB
			upload.setSizeMax(20480);
			try
			{
				...
				// 解析form表单中所有字段元素
				List<FileItem> items = upload.parseRequest(request);
				…
				item.write(saveFile);
				out.println("增加学生信息及图片上传成功！");
				return;
			}
			catch (FileUploadBase.SizeLimitExceededException e)
			{
				out.println("超过单个上传文件的最大值！上传失败！");
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			finally
			{
			out.close();
			}
		}
	}
}
```

需要注意，因为我们设置了临时目录为d:\\temp，所以在运行前必须在d盘创建此temp目录。上面代码中，我们将单个上传文件的最大值设置为了20KB，如果尝试上传一个大于20KB的文件，则会提示“超过单个上传文件的最大值！上传失败！”。
---

layout: post


title: 新增内容2：下载


category: JSP-Servlet教程


tags: JSP Servlet


description: 


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---


**6.3 文件下载**

要实现文件的下载，不仅需要指定文件的路径，还需要在HTTP中设置两个响应消息头信息，如下：

//设置发送到浏览器的MIME类型。通知浏览器，以下载的方式打开文件

`Content-Type:  application/octet-stream`

//设置服务端的处理方式

`Content-Disposition:   attachment;filename=文件名（含后缀）`


其中，常见的`MIME`类型如下表：

<table>
   <tr>
      <td>文件类型</td>
      <td>Content-Type</td>
   </tr>
   <tr>
      <td>二进制文件（任何类型的文件）</td>
      <td>application/octet-stream</td>
   </tr>
   <tr>
      <td>Word</td>
      <td>application/msword </td>
   </tr>
   <tr>
      <td>Execl</td>
      <td>application/vnd.ms-excel</td>
   </tr>
   <tr>
      <td>PPT</td>
      <td>application/vnd.ms-powerpoint</td>
   </tr>
   <tr>
      <td>图片</td>
      <td>image/gif ， image/bmp，image/jpeg </td>
   </tr>
   <tr>
      <td>文本文件</td>
      <td>text/plain</td>
   </tr>
   <tr>
      <td>html网页</td>
      <td>text/html</td>
   </tr>
</table>


实现文件下载的思路：前端通过“下载”超链接，将请求提交到对应的Servlet；再由Servlet获取所下载文件的地址，并根据该地址创建文件的字节输入流，再通过该流读取下载文件的内容，最后将读取的内容通过输出流写到目标文件中。整个过程，都不需要依赖第三方组件。

**以下，通过一个案例来讲解文件下载的具体步骤：**

**①**通过前端发出“下载文件”的请求

**index.jsp**


```
…
<body>
	<a href="DownloadServlet?fileName=花朵.png">文件下载</a>
</body>
…
```

**②**后端接受请求、设置消息头字段，实现下载功能

假定需要下载的文件是**downloadResources**目录中的“花朵.png”文件，如下：

![](http://i.imgur.com/XWJqe1J.png)

*图34-01*

**org.lanqiao.servlet.DownloadServlet.java**

```
//package、import
public class DownloadServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request, 
HttpServletResponse response)
 throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException {
        //获取要下载的文件名
		String fileName = request.getParameter("fileName") ;
        //设置消息头（下载功能需要设置Content-Type和Content-Disposition）
		response.addHeader("Content-Type", 
"application/octet-stream");
		response.addHeader("Content-Disposition",
 "attachment;filename="+fileName);
         //获取服务器上，被下载文件（“花朵.png”）的输入流
		InputStream input = getServletContext()
.getResourceAsStream("/downloadResources/"+fileName);
		OutputStream out = response.getOutputStream() ;
		byte[] buffer = new byte[1024];
		int len = -1 ; 
        //通过IO流，实现下载文件（ “花朵.png” ）的功能
		while((len=input.read(buffer))!=-1){
			out.write(buffer,0,len);
		}
		out.close();
	}
}
```

部署项目、启动服务，执行[http://localhost:8888/DownloadProject/](http://localhost:8888/DownloadProject/)，单击“文件下载”，运行结果：
（IE、FireFox等浏览器，效果类似）

![](http://i.imgur.com/bbcyRdD.png)

*图34-02*

可以发现，虽然实现了下载功能，但是下载的文件名却出现了乱码（_.png）。为了解决乱码，首先要区分不同的浏览器：

**①**如果是IE浏览器，就需要使用URL编码：使用ServletAPI提供的`URLEncoder`类中的`encode()`方法。该方法可以将URL中的字符串，以指定的编码形式输出，如下：


**org.lanqiao.servlet.DownloadServlet.java**

```
…
String fileName = request.getParameter("fileName") ;
response.addHeader("Content-Type", "application/octet-stream");
//IE
response.addHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode(fileName,"utf-8") );
…
```

重新下载，运行结果：

![](http://i.imgur.com/AmIzxyQ.png)

*图34-03*

**②**如果是FireFox浏览器，就需要给文件名加上前缀“=?UTF-8?B?”、后缀“?=”，然后通过String构造方法以及**org.apache.tomcat.util.codec.binary.Base64.encodeBase64()**进行转码，如下：


**org.lanqiao.servlet.DownloadServlet.java**

```
…
String fileName = request.getParameter("fileName") ;
response.addHeader("Content-Type", "application/octet-stream");
//FireFox    
response.addHeader("Content-Disposition", "attachment;filename="
+"=?UTF-8?B?" 
+ (new String(Base64
.encodeBase64(fileName.getBytes("UTF-8")))) 
+ "?="   );
	…
```

重新下载，运行结果：

![](http://i.imgur.com/CFGTyu6.png)

*图34-04*

并且，我们可以通过请求头信息中的“USR-AGENT”来辨别下载时刻所使用的浏览器。完整的文件下载Servlet代码如下：

**org.lanqiao.servlet.DownloadServlet.java**

```
//package、部分import… 
import org.apache.tomcat.util.codec.binary.Base64;
public class DownloadServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, 
HttpServletResponse response) 
throws ServletException, IOException
	{
		String fileName = request.getParameter("fileName");
		response.addHeader("Content-Type",
 "application/octet-stream");
         //通过请求头信息中的USER-AGENT属性，辨别下载时所采用的浏览器
		String agent = request.getHeader("USER-AGENT");
		if (agent != null && agent.toLowerCase().indexOf("firefox") > 0)
		{
			// 使用FireFox浏览器下载
			response.addHeader("Content-Disposition", 
"attachment;filename="
 + "=?UTF-8?B?"
					     + (new String(Base64
.encodeBase64(fileName.getBytes("UTF-8")))) 
 + "?=");
		}
		else
		{
			// 使用IE等其他浏览器下载
			response.addHeader("Content-Disposition", 
"attachment;filename="
                                 + URLEncoder.encode(fileName, "utf-8"));
		}

		InputStream input = getServletContext()
.getResourceAsStream("/downloadResources/" + fileName);
		OutputStream out = response.getOutputStream();
		byte[] buffer = new byte[1024];
		int len = -1;
		while ((len = input.read(buffer)) != -1)
		{
			out.write(buffer, 0, len);
		}
		out.close();
	}
}
```

**说明：**

**问**：下载功能，都是服务端的响应行为。能否通过**response.setContentType("text/html; charset=UTF-8")**来设置响应时的下载文件名编码？


**答**：不能。因为文件名是通过“头信息”发给浏览器的，而`response.setContentType()`是处理“消息体”编码的。





# 7.4过滤器 #

## 7.4.1 过滤器原理 ##

过滤器（Filter），基本的功能是对Servlet的调用过程进行拦截，从而在Servlet的响应前后执行一些特定的功能。常见用Filter实现的功能有：URL级别的权限访问控制、过滤敏感词汇、压缩响应信息、设置POST方式的统一编码等。

程序中的过滤器就好比生活中的自来水过滤器，可以将水中的杂质、有害物质等进行过滤，从而使水变得更加有利于我们使用。

![](http://i.imgur.com/wTRPGUq.gif)

*图7-07*

如上图，当客户端向服务器中的资源发出请求时，会先被过滤器Filter进行拦截处理，之后再将处理后的请求转发给真正的服务器资源。此外，当服务器接收到请求并对其做出响应后，响应结果也会先被过滤器拦截处理，之后再将处理后的响应转发给客户端。即在请求、响应的过程前，都会先被过滤器进行拦截处理。

程序中的过滤器，实际就是一个实现了`javax.servlet.Filter`接口的类，`javax.servlet.Filter`接口中定义了以下3个方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>void init(FilterConfig conf)</td>
      <td>用来完成过滤器初始化过程，在应用程序启动前，由Web容器调用。类似于Servlet中的init()。</td>
   </tr>
   <tr>
      <td>void doFilter(ServletRequest request,  ServletResponse response,  FilterChain chain)</td>
      <td>当请求和响应被过滤器拦截后，就通过doFilter()方法来处理：request参数就是拦截的请求，response参数就是拦截的响应，可以使用FilterChain参数的doFilter()方法来将拦截的请求和释放开。类似于Servlet中的doGet()、doPost()。</td>
   </tr>
   <tr>
      <td>void destroy()</td>
      <td>用于释放被Filter对象打开的资源，例如关闭数据库、关闭IO流等。在应用程序关闭时，由容器调用。类似于Servlet中的destroy()。</td>
   </tr>
</table>

与Servlet类似，Filter的`init()`和`destroy()`方法各自只会被调用一次，而`doFilter()`方法会在每次客户端发出请求时被调用。

其中`init()`方法里的FilterConfig参数，主要为过滤器提供初始化参数。FilterConfig是一个接口，常用的方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>String getFilterName()</td>
      <td>获取web.xml中的过滤器的名称</td>
   </tr>
   <tr>
      <td>String getInitParameter(String param)</td>
      <td>获取web.xml中参数名对应的参数值</td>
   </tr>
   <tr>
      <td>ServletContext getServletContext()</td>
      <td>获取web应用程序的ServletContext</td>
   </tr>
</table>

## 7.4.2开发第一个Filter程序 ##

本示例采用Servlet2.5版本。

步骤：

(1)新建Web项目（FilterProject）；再在WebContext下新建`jsp`，在`src`下新建Servlet。如下：

发送请求的客户端JSP：index.jsp

```…
<a href="MyServlet">访问MyServlet...</a>
…
```

处理请求的控制器Servlet：MyServlet.java

```
…
public class MyServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request,
 HttpServletResponse response) 
throws ServletException, IOException {
		System.out.println("doGet...");
	}
	…
}
```

在web.xml中配置此Servlet:

```
<servlet>
    <servlet-name>MyServlet</servlet-name>
    <servlet-class>
org.lanqiao.servlet.MyServlet
</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>MyServlet</servlet-name>
    <url-pattern>/MyServlet</url-pattern>
</servlet-mapping>
```

(2)开发过滤器，拦截Servlet程序。

新建一个过滤器（即实现了`javax.servlet.Filter`接口的类）。

MyFirstFilter.java

```
package org.lanqiao.servlet;

import java.io.IOException;
import javax.servlet.*;

public class MyFirstFilter implements Filter
{
	@Override
	public void init(FilterConfig arg0) throws ServletException
	{
		System.out.println("过滤器01的初始化init()方法...");
	}
	
	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
			throws IOException, ServletException
	{
		System.out.println("过滤器01的执行方法:doFilter()方法...");
	}
	
	@Override
	public void destroy()
	{
		System.out.println("过滤器01的销毁destory()方法...");
	}
}
```

在web.xml 中配置此Filter：

```
<filter>
  	<filter-name>MyFirstFilter</filter-name>
  	<filter-class>
org.lanqiao.filter. MyFirstFilter
</filter-class>
 </filter>
 <filter-mapping>
  	<filter-name>MyFirstFilter</filter-name>
  	<url-pattern>/MyServlet</url-pattern>
</filter-mapping>
```

Filter的配置方法和Servlet的配置方法相类似：先通过`<url-pattern>`匹配需要拦截的请求，再根据`<filter-name>`找到对应的过滤器处理类`<filter-class>`,最后执行过滤器处理类中的`init()`、`doFilter()`、`destroy()`等方法。

(4)部署并启动项目，访问index.jsp中的超链接，可以在控制台看到以下输出：

![](http://i.imgur.com/6DrHIo6.png)

*图7-08*

可以发现，index.jsp通过超链接向Servlet发出的请求确实被Filter拦截了，甚至只执行了Filter中的`doFilter()`方法，而没有执行Servlet中的`doGet()`方法。如果想让请求被Filter拦截之后，仍然能正常访问到当初所请求的Servlet，则需要在Filter的`doFilter()`方法里加上`chain.doFilter()`方法，表示拦截完毕、释放请求及相应，如下：

MyFirstFilter.java

```
…
public class MyFirstFilterimplements Filter
{
    
	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
		        	throws IOException, ServletException
	{
		System.out.println("过滤器01的执行方法:doFilter()方法...");
		chain.doFilter(request, response);
	}
}
```

 修改MyFirstFilter.java以后，重启服务，再次运行并访问index.jsp中的超链接，可在控制台看到以下输出：

![](http://i.imgur.com/PKdBcOe.png)

*图7-09*

从输出结果可以得知，index.jsp发出的请求确实先被Filter进行了拦截处理，然后再执行了Servlet中的`doGet()`方法。

之前讲过，Filter能对请求和响应都进行拦截。实际上在Filter中，`chain.doFilter()`之前的代码就是拦截请求时所执行得代码，`chain.doFilter()`之后的代码就是拦截响应时所执行得代码，将过滤器修改如下：

MyFirstFilter.java

```
…
public class MyFirstFilter implements Filter
{
	…
	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
			throws IOException, ServletException
	{
		System.out.println("拦截请求01...");
		chain.doFilter(request, response);
		System.out.println("拦截响应01...");
	}
}
```

再次重启服务并执行index.jsp中的超链接，得到以下输出：

![](http://i.imgur.com/Nss3RWj.png)

*图7-10*

即Filter会先拦截请求（即执行`chain.doFilter()`之前的代码），然后通过`chain.doFilter()`释放请求（去执行Servlet中的`doGet()`/`doPost()`），最后再拦截响应（即执行`chain.doFilter()`之后的代码）。

## 7.4.3 Filter映射 ##

Filter通过web.xml中的`<url-pattern>`元素来配置需要拦截的请求。例如，之前编写的

`<url-pattern>/MyServlet</url-pattern>`

表示拦截请求路径为“`/MyServlet`”的请求。如果想拦截项目中的所有请求，可以使用通配符“*”，如下：

`<url-pattern>/*</url-pattern>`

其中“/”表示当前项目的根路径，相当于[http://localhost:8888/FilterProject/](http://localhost:8888/FilterProject/)。

还可以给通配符加上自定义后缀，如下，

`<url-pattern>/*.do</url-pattern>`

表示拦截所有以“`.do`”结尾的请求，如http://localhost:8888/ProjectName/ServletName.do。

此外，还可以通过`<filter-mapping>`的子元素`<dispatcher>`来指定拦截的特定方式的请求，如下：

```
<filter-mapping>
     …
  	<dispatcher>拦截方式1</dispatcher>
<dispatcher>拦截方式2</dispatcher>
<dispatcher>…</dispatcher>
</filter-mapping>
```

常见拦截方式的值有以下四个：

<table>
   <tr>
      <td>拦截方式的值</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>REQUEST</td>
      <td>只会拦截通过地址栏直接访问方式发出的请求。</td>
   </tr>
   <tr>
      <td>INCLUDE</td>
      <td>只会拦截通过RequestDispatcher的include()方式发出的请求。</td>
   </tr>
   <tr>
      <td>FORWARD</td>
      <td>只会拦截通过RequestDispatcher的forward()方式发出的请求（即请求转发方式）。</td>
   </tr>
   <tr>
      <td>ERROR</td>
      <td>只会拦截通过&lt;error-page&gt;方式发出的请求，此方式使用较少。</td>
   </tr>
</table>


如下，表示此过滤器会拦截所有通过地址栏访问方式，以及通过请求转发方式发出的请求：

```
<filter-mapping>
     …
  	<dispatcher> REQUEST</dispatcher>
<dispatcher> FORWARD</dispatcher>
</filter-mapping>
```

## 7.4.4 Filter链 ##

**(1)原理**

我们还可以为Web应用程序注册多个Filter，对某一请求/响应进行多次拦截。拦截的过程如下图：

![](http://i.imgur.com/WnqQVHf.gif)

*图7-11*

如果对某一个请求配置了多个Filter，则每个Fiter都会对该请求及响应进行拦截。拦截的顺序是按照过滤器的`<filter-mapping>`在web.xml中的配置顺序。像这样，多个Filter拦截同一个请求时，这些Filter就会组成一个Filter链，并且每一个Filter都是通过FilterChain的`doFilter()`方法，将当前Filter拦截的请求放行，使请求进入下一个Filter。

上图中，客户端发出的请求会先被过滤器1所拦截，过滤器1处理完请求后可以通过调用`doFilter()`方法将请求放行；随后请求会被过滤器2拦截，过滤器2处理完请求后同样可以调用`doFilter()`方法将请求放行，最终请求到达服务器资源。同理，当服务器向客户端发出响应时，也会依次被过滤器所拦截，只是拦截响应的顺序与拦截请求的顺序完全相反。

**(2)示例**

我们在之前的FilterProject项目基础上，开发一个使用Filter链的程序。

之前的过滤器MyFirstFilter拦截的是MyServlet资源，我们再建一个过滤器MySecondFilter同样来拦截MyServlet资源，如下：

MySecondFilter.java

```
…
public class MySecondFilter implements Filter
{
	@Override
	public void init(FilterConfig arg0) throws ServletException
	{
		System.out.println("过滤器02的初始化init()方法...");
	}

	@Override
	public void doFilter(ServletRequest request, 
ServletResponse response, FilterChain chain)
			throws IOException, ServletException
	{
		System.out.println("拦截请求02...");
 		chain.doFilter(request, response);
		System.out.println("拦截响应02...");
	}

	@Override
	public void destroy()
	{	System.out.println("过滤器02的销毁destory()方法...");
	}
}
```

对过滤器MySecondFilter进行配置，使其和MyFirstFilter一样都拦截MyServlet资源，如下：

web.xml

```
<filter>
  	<filter-name>MyFirstFilter</filter-name>
  	<filter-class>
org.lanqiao.filter.MyFirstFilter
</filter-class>
 </filter>
 <filter-mapping>
  	<filter-name>MyFirstFilter</filter-name>
  	<url-pattern>/MyServlet</url-pattern>
 </filter-mapping>

 <filter>
  	<filter-name>MySecondFilter</filter-name>
  	<filter-class>
org.lanqiao.filter.MySecondFilter
</filter-class>
 </filter>
 <filter-mapping>
  	<filter-name>MySecondFilter</filter-name>
  	<url-pattern>/MyServlet</url-pattern>
 </filter-mapping>
```

MyFirstFilter 的`< filter-mapping >`写在MySecondFilter的`< filter-mapping >`前面，因此拦截的顺序是:请求先被MyFirstFilter拦截，再被MySecondFilter拦截；而拦截响应的顺序正好相反。

重启服务，再次通过index.jsp中的超链接，向服务器的MyServlet资源发出请求，运行结果如下：

![](http://i.imgur.com/PrEF5XR.png)


*图7-12*

# 7.5监听器 #

在Web应用程序的运行期间，Web容器会创建和销毁四个对象：`ServletContext`、`HttpSession`、`ServletRequest`、`PageContext`，这些对象被称为“域对象”（相当于JSP中的“范围对象”）。除了`PageContext`以外，Servlet API为其他三个域对象都提供了各自的监听器，用来监听它们的行为。

## 7.5.1监听域对象的生命周期 ##

**(1)原理**

Servlet API提供了`ServletContextListener`、`HttpSessionListener`、`ServletRequestListener`三个监听器接口，用来分别监听`ServletContext`、`HttpSession`、`ServletRequest`三个域对象。当这三个域对象创建或销毁时，就会自动触发相应的监听器接口。

例如，`ServletContextListener`接口可以用来监听`ServletContext`域对象的创建、销毁过程。当在Web应用程序中注册了一个或多个实现了`ServletContextListener`接口的事件监听器时，Web容器就会在创建、销毁每个`ServletContext`对象时都产生一个相应的事件对象，然后依次调用每个`ServletContext`事件监听器中的处理方法，并将产生的事件对象传递给这些方法来完成时间的处理工作。

`ServletContextListener`接口定义了以下两个事件处理方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void contextInitialized(ServletContextEvent sce)</td>
      <td>当ServletContext对象被创建时， Web容器会自动触发此方法。并且可以通过参数ServletContextEvent来获取创建的ServletContext对象</td>
   </tr>
   <tr>
      <td>public void contextDestroyed(ServletContextEvent sce)</td>
      <td>当ServletContext对象被销毁时， Web容器会自动触发此方法。并且会将之前的ServletContextEvent对象传递到此方法的参数中。</td>
   </tr>
</table>

类似的，`HttpSessionListener`和`ServletRequestListener`接口也都提供了各自的事件处理方法，如下：

`HttpSessionListener`接口定义的事件处理方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void sessionCreated(HttpSessionEvent se)</td>
      <td>当HttpSession对象被创建时， Web容器会自动触发此方法。并且可以通过参数HttpSessionEvent来获取创建的HttpSession对象</td>
   </tr>
   <tr>
      <td>public void sessionDestroyed(HttpSessionEvent se)</td>
      <td>当HttpSession对象被销毁时， Web容器会自动触发此方法。并且会将之前的HttpSessionEvent对象传递到此方法的参数中。</td>
   </tr>
</table>

`ServletRequestListener`接口定义的事件处理方法：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void requestInitialized(ServletRequestEvent sre)</td>
      <td>当ServletRequest对象被创建时， Web容器会自动触发此方法。并且可以通过参数ServletRequestEvent来获取创建的ServletRequest对象</td>
   </tr>
   <tr>
      <td>public void requestDestroyed(ServletRequestEvent sre)</td>
      <td>当ServletRequest对象被销毁时， Web容器会自动触发此方法。并且会将之前的ServletRequestEvent对象传递到此方法的参数中。</td>
   </tr>
</table>

**(2)案例**

我们用一个类来同时实现`ServletContextListener`、`HttpSessionListener`、`ServletRequestListener`三个接口，即同时具有三个监听器的功能。

ContextSessionRequestListener.java

```
package org.lanqiao.listener;
import javax.servlet.*;
import javax.servlet.http.*;

public class ContextSessionRequestListener 
implements ServletContextListener,
HttpSessionListener,ServletRequestListener
{
	@Override
	public void requestInitialized(ServletRequestEvent sre)
	{
		System.out.println("监听ServletRequest：
[ServletRequest]对象[创建]完成");
	}
	@Override
	public void requestDestroyed(ServletRequestEvent sre)
	{
		System.out.println("监听ServletRequest：
[ServletRequest]对象[销毁]完成");
	}
	@Override
	public void sessionCreated(HttpSessionEvent se)
	{
		System.out.println("监听HttpSession：
[HttpSession]对象[创建]完成");		
	}
	@Override
	public void sessionDestroyed(HttpSessionEvent se)
	{
		System.out.println("监听HttpSession：
[HttpSession]对象[销毁]完成");		
	}
	@Override
	public void contextInitialized(ServletContextEvent sce)
	{
		System.out.println("监听ServletContext：
[ServletContext]对象[创建]完成");	
	}
	@Override
	public void contextDestroyed(ServletContextEvent sce)
	{
		System.out.println("监听ServletContext：
[ServletContext]对象[销毁]建完成");	
	}
}
```

再在web.xml中部署ContextSessionRequestListener监听器，如下：

web.xml

```
…
<listener>
  	<listener-class>
  		org.lanqiao.listener.ContextSessionRequestListener
  	</listener-class>
</listener>
…
```

一个完整的监听器需要编写`Listener`类和配置`<Listener>`。如果Web应用程序有多个监听器，则会按照`<listener>`在web.xml中的配置顺序依次触发。

最后新建index.jsp和sessionInvalidate.jsp用来测试监听器：

index.jsp

```
…
<body>
	index.jsp页面<br/>
	<a href="sessionInvalidate.jsp">销毁session</a>
</body>
…
```

sessionInvalidate.jsp

```
<%@ page language="java" contentType="text/html; 
charset=UTF-8"    pageEncoding="UTF-8"%>
<%
	System.out
.println("========sessionInvalidate.jsp页面=========");
	session.invalidate();
%>
```

部署并启动项目，在启动时可以发现执行了`contextInitialized()`方法：

![](http://i.imgur.com/Lkae0p0.jpg)

*图7-13*

这是因为Web容器在启动时会自动加载部署过的项目，并为该项目创建对应的`ServletContext`对象，而web.xml中配置了用于监听`ServletContext`对象创建、销毁的监听器ContextSessionRequestListener，所以会调用监听器中的`contextInitialized()`方法，从而输出相应的语句。

再访问index.jsp，又会得到以下结果：

![](http://i.imgur.com/XM06gXH.jpg)

*图7-14*

这是因为访问index.jsp时，就会向Web容器发送一次请求（创建了一个请求），所以执行了用于监听ServletRequest 被创建的`requestInitialized()`方法，即输出“监听`ServletRequest`：`[ServletRequest]`对象[创建]完成”;

同时，第一次访问index.jsp时，Web容器还为浏览器创建了对应的`HttpSession`对象，所以还会执行用于监听`HttpSession`被创建的`sessionCreated()`方法，即输出“监听`HttpSession`：`[HttpSession]`对象[创建]完成”.

当请求发送完毕后，`ServletRequest`对象随之被销毁，所以又会执行用于监听`ServletRequest`被销毁的`requestDestroyed()`方法，即输出“监听`ServletRequest`：`[ServletRequest]`对象[销毁]完成”。

点击index.jsp中的超链接“销毁`session`”，如图

![](http://i.imgur.com/fOn6IG2.jpg)

*图7-15*

控制台又会再输出以下黑色方框中的内容：

![](http://i.imgur.com/aForTJK.png)

*图7-16*

这是因为点击超链接后，会跳转到一个新的页面，即发送了一个新的请求，所以会再次触发用于监听`ServletRequest` 被创建的`requestInitialized()`方法；随后，进入sessionInvalidate.jsp页面,执行该JSP里面的输出语句，并执行`session.invalidate()`销毁`session`，所以会触发用于监听`HttpSession`被销毁的`sessionDestroyed()`方法，即输出“监听`HttpSession`：`[HttpSession]`对象[销毁]完成”。之后，请求执行完毕从而被销毁，再次触发用于监听`ServletRequest`被销毁的`requestDestroyed()`方法。

最后，停止Web服务，又会触发用于监听`ServletContext`对象被销毁的`contextDestroyed()`方法，即输出“监听`ServletContext`：`[ServletContext]`对象[销毁]建完成”，如图：

![](http://i.imgur.com/TPulMuT.png)

*图7-17*

## 7.5.2监听域对象中属性的变更 ##

**(1)原理**

`ServletContext`、`HttpSession`、`ServletRequest`三个域对象都可以通过`setAttribute()`和`removeAtribute()`等方法进行属性的增加、替换（修改）、删除。Servlet API也提供了ServletContextAttributeListener、HttpSessionAttributeListener、ServletRequestAttributeListener三个监听器接口，用来监测这三个域对象的属性的变更。

例如，当向`ServletRequest`对象中增加、替换（修改）、删除某个属性时，Web容器就会自动调用ServletRequestAttributeListener监听器接口中的相应方法，如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void attributeAdded (ServletRequestAttributeEvent srae)</td>
      <td>当向ServletRequest对象中增加一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeRemoved (ServletRequestAttributeEvent srae)</td>
      <td>当ServletRequest对象中的某个属被替换（修改）时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeReplaced (ServletRequestAttributeEvent srae)</td>
      <td>当从ServletRequest对象中删除一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
</table>

其中方法的参数是一个`ServletRequestAttributeEvent`对象，监听器可以通过这个参数来获取正在增加、替换（修改）、删除属性的域对象。

类似的，ServletContextAttributeListener接口中的方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void attributeAdded (ServletContextAttributeEvent srae)</td>
      <td>当向ServletContext对象中增加一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeRemoved (ServletContextAttributeEvent srae)</td>
      <td>当ServletContext对象中的某个属被替换（修改）时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeReplaced (ServletContextAttributeEvent srae)</td>
      <td>当从ServletContext对象中删除一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
</table>

HttpSessionAttributeListener接口中的方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void attributeAdded (HttpSessionBindingEvent srae)</td>
      <td>当向HttpSession对象中增加一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeRemoved (HttpSessionBindingEvent srae)</td>
      <td>当HttpSession对象中的某个属被替换（修改）时，Web容器就会自动调用该方法。</td>
   </tr>
   <tr>
      <td>public void attributeReplaced (HttpSessionBindingEvent srae)</td>
      <td>当从HttpSession对象中删除一个属性时，Web容器就会自动调用该方法。</td>
   </tr>
</table>

可以发现，ServletContextAttributeListener、HttpSessionAttributeListener、ServletRequestAttributeListener三个监听器接口中的方法名完全一致，只是方法的参数类型不相同。

**(2)案例**

①新建attributeListener.jsp，用于增加、替换、删除属性，从而触发域对象的属性监听器

attributeListener.jsp

```
…
<body>
	<%
		getServletContext().setAttribute("school","北京蓝桥");
		getServletContext().setAttribute("school","东莞蓝桥");
		getServletContext().removeAttribute("school");
		
		session.setAttribute("school","北京蓝桥");
		session.setAttribute("school","东莞蓝桥");
		session.removeAttribute("school");
		
		request.setAttribute("school","北京蓝桥");
		request.setAttribute("school","东莞蓝桥");
		request.removeAttribute("school");
	%>
</body>
…
```

②创建用于监听域对象属性变更的监听器，即创建一个类并实现ServletContextAttributeListener、HttpSessionAttributeListener、ServletRequestAttributeListener三个监听器接口

AttributeListener.java

```
package org.lanqiao.listener;

import javax.servlet.*;
import javax.servlet.http.*;
public class AttributeListener implements ServletContextAttributeListener,HttpSessionAttributeListener,ServletRequestAttributeListener
{

	@Override
	public void attributeAdded(ServletRequestAttributeEvent srae)
	{
		String attributeName  = srae.getName();
		Object attrubiteValue = srae.getServletRequest()
.getAttribute(attributeName);
		System.out.println("[ServletRequest][增加]属性,"
+attributeName+":"+attrubiteValue);
	}
	@Override
	public void attributeRemoved(ServletRequestAttributeEvent srae)
	{
		String attributeName  = srae.getName();
		System.out.println("[ServletRequest][删除]属性,"
+attributeName);				
	}

	@Override
	public void attributeReplaced(ServletRequestAttributeEvent srae)
	{
		String attributeName  = srae.getName();
		Object attrubiteValue = srae.getServletRequest()
.getAttribute(attributeName);
		System.out.println("[ServletRequest][替换]属性,"
+attributeName+":"+attrubiteValue);
	}
	@Override
	public void attributeAdded(HttpSessionBindingEvent sbe)
	{
		String attributeName  = sbe.getName();
		Object attrubiteValue =  sbe.getSession()
.getAttribute(attributeName);
		System.out.println("[HttpSession][增加]属性,"
+attributeName+":"+attrubiteValue);	
	}
	@Override
	public void attributeRemoved(HttpSessionBindingEvent sbe)
	{
		String attributeName  = sbe.getName();
		System.out.println("[HttpSession][删除]属性,"
+attributeName);	 		
	}
	@Override
	public void attributeReplaced(HttpSessionBindingEvent sbe)
	{
		String attributeName  = sbe.getName();
		Object attrubiteValue =  sbe.getSession()
.getAttribute(attributeName) ;
		System.out.println("[HttpSession][替换]属性,"
+attributeName+":"+attrubiteValue);	
	}
	@Override
	public void attributeAdded(ServletContextAttributeEvent scae)
	{
		String attributeName  = scae.getName();
		Object attrubiteValue =  scae.getServletContext()
.getAttribute(attributeName);
		System.out.println( "[ServletContext][增加]属性,"
+attributeName+":"+attrubiteValue);	
	}
	@Override
	public void attributeRemoved(ServletContextAttributeEvent scae)
	{
		String attributeName  = scae.getName();
		System.out.println("[ServletContext][删除]属性,"
+attributeName);
	}
	@Override
	public void attributeReplaced(ServletContextAttributeEvent scae)
	{
		String attributeName  = scae.getName();
		Object attrubiteValue =  scae.getServletContext()
.getAttribute(attributeName);
		System.out.println("[ServletContext][替换]属性,"
+attributeName+":"+attrubiteValue);	
	}
}
```

③配置监听器

web.xml

```
…
  <listener>
  	<listener-class>
  		org.lanqiao.listener.AttributeListener
  	</listener-class>
  </listener>
…
```

部署并启动项目，通过浏览器地址栏访问[http://localhost:8888/ListenerProject/attributeListener.jsp](http://localhost:8888/ListenerProject/attributeListener.jsp)，在控制台可以看到以下输出：

![](http://i.imgur.com/5Y7vVxY.jpg)

*图7-18*

当三个域对象进行增加、替换、删除属性时，都会触发相应的监听方法。



## 8.2.3 感知被HttpSession绑定的事件监听器 ##


**在`session`域中保存的对象，可能会经历四种状态：**

**①**将对象保存（绑定）到`session`域中；

**②**从`session`域中删除（解除绑定）该对象；

**③**对象随着`session`持久化到硬盘等存储设备中，即将对象和`session`一起从内存写入硬盘等存储设备（钝化）；

**④**对象随着`session`从存储设备中恢复到内存中（活化）。
	
Servlet API提供了`HttpSessionBindingListener和HttpSessionActivationListener这两个监听器（接口），专门用于监听`session`域中对象的这四种状态。


**(1) HttpSessionBindingListener接口**

HttpSessionBindingListener接口提供了`valueBound()`和`valueUnbound()`两个方法，分别用于监听`JavaBean`对象绑定到`HttpSession`对象中，以及从`HttpSession`对象中解绑`JavaBean`对象的两个事件。


**HttpSessionBindingListener接口的完整定义如下：**

```
package javax.servlet.http;
import java.util.EventListener;
public interface HttpSessionBindingListener extends EventListener 
{
public void valueBound(HttpSessionBindingEvent event);
public void valueUnbound(HttpSessionBindingEvent event);
}
```

如果一个类实现了HttpSessionBindingListener接口，那么

**①**当该类产生的对象被绑定到`HttpSession`对象中时，Web容器就会自动调用该对象的`valueBound()`方法；

**②**当该类产生的对象从`HttpSession`对象中解绑时，Web容器就会自动调用该对象的`valueUnbound()`方法。

此外，这两个方法都有一个共同的参数：`HttpSessionBindingEvent`类型的事件对象，我们可以通过这个参数来获取当前的`HttpSession`对象。


下面通过一个示例来演示**HttpSessionBindingListener**接口的使用：

**org.lanqiao.listener.BeanDemo.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;
public class BeanDemo implements HttpSessionBindingListener
{
	//BeanDemo对象被绑定到HttpSession对象中时，调用此方法
	@Override
	public void valueBound(HttpSessionBindingEvent event)
	{
		System.out.println("绑定：\nBeanDemo对象被增加
到了session域中\n"
+this+"\n"+event.getSession().getId());
	}
	//BeanDemo对象从HttpSession对象中解绑时，调用此方法
	@Override
	public void valueUnbound(HttpSessionBindingEvent event)
	{
		System.out.println("移除：\nBeanDemo对象从session域
中被移除\n"
+this+"\n"+event.getSession().getId());
	}
}
```

**httpSessionBindingListner.jsp**

```
…
<body>
	<%
		BeanDemo beanDemo = new BeanDemo();
		session.setAttribute("beanDemo", beanDemo);
	%>
</body>
…
```

执行[http://localhost:8888/ListenerProject/httpSessionBindingListner.jsp](http://localhost:8888/ListenerProject/httpSessionBindingListner.jsp)，运行结果：

![](http://i.imgur.com/dkA71Fj.png)

刷新页面，运行结果：

![](http://i.imgur.com/SevzdFS.png)

从运行结果可以发现：第一次访问**httpSessionBindingListner.jsp**时，`BeanDemo`对象会被增加到`session`域中；刷新浏览器，另一个`BeanDemo`对象被增加到了`session`域中，与此同时，第一个`BeanDemo`对象从`session`域中被移除了，也就是说，第二个`BeanDemo`对象覆盖了第一个对象。此外，因为是同一次会话，因此sessionId都是相同的。


**(2) HttpSessionActivationListener接口**


如果要把`HttpSession`对象从内存转移到硬盘等存储设备（钝化），或者相反，从存储设备中恢复到内存中（活化），就需要使用HttpSessionActivationListener接口的`sessionWillPassivate()`和`sessionDidActivate()`方法。

需要注意，`HttpSession`对象的钝化（也称为持久化）过程是由Servlet容器完成的。在此过程中，为了确保`session`域内的所有共享数据不会丢失，Servlet容器不仅会持久化`HttpSession`对象，还会对该对象的所有可序列化的属性进行持久化。其中，可序列化的属性是指：属性所在的类实现了Serializable接口。


至于`HttpSession`对象的活化过程，通常是在客户端向Web服务发出Http请求时，相应的`HttpSession`对象会被激活。

**HttpSessionActivationListener接口的完整定义如下：**

```
package javax.servlet.http;
import java.util.EventListener;
public interface HttpSessionActivationListener extends EventListener 
{
    //钝化之前
public void sessionWillPassivate(HttpSessionEvent se);
//活化之后
    public void sessionDidActivate(HttpSessionEvent se);
}
```

当绑定到`HttpSession`对象中的对象即将随`HttpSession`对象被钝化之前，Web容器会调用`sessionWillPassivate()`方法，并传递一个HttpSessionEvent类型的事件对象作为参数；当绑定到`HttpSession`对象中的对象刚刚随`HttpSession`对象被活化之后，Web容器会调用`sessionDidActivate ()`方法，并传递一个HttpSessionEvent类型的事件对象作为参数。
	

**下面通过一个示例来演示HttpSessionActivationListener接口的使用：**

**①配置会话管理器**

在执行`session`的持久化（钝化）时，需要使用PersistentManager（会话管理器），它的作用是当某个Web应用被终止（或整个Web服务器被终止）时，会对被终止的Web应用的`HttpSession`对象进行持久化。PersistentManager需要在Tomcat的**context.xml**文件中配置`<Manager>`元素，如下：


**&lt;Tomcat安装目录&gt;/conf/context.xml**

```
<Context>
	<Manager className="org.apache.catalina.session.PersistentManager"
 maxIdleSwap="1" > 
		<Store className="org.apache.catalina.session.FileStore" 
directory="lanqiao" />
	</Manager>	
     <!-- 其他配置 … -->
</Context>
```

**Manager及其子元素的简介如下：**

<table>
   <tr>
      <td>元素/属性</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>Manager元素</td>
      <td>用于配置会话管理器.     className属性：指定负责创建、销毁、持久化Session对象的类。     maxIdleSwap属性：指定Session对象被钝化前的最大空闲时间（单位是秒）。如果超过这个时间，管理Session对象的类就会把Session对象持久化到存储设备中（硬盘等）。</td>
   </tr>
   <tr>
      <td>Store元素</td>
      <td>用于指定负责完成具体持久化任务的类。    directory属性：指定保存持久化文件的目录，可以使用相对目录或绝对目录。如果使用相对目录（如lanqiao），它是相对于以下目录：&lt;Tomcat安装目录&gt;\work\Catalina\localhost\项目名\lanqiao</td>
   </tr>
</table>


**②编写类，并实现HttpSessionActivationListener接口**


**org.lanqiao.listener.BeanDemo2.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;
public class BeanDemo2 implements HttpSessionActivationListener
{
	private String name ;
	private int age ; 
	//setter、geter
	//钝化之前
	@Override
	public void sessionWillPassivate(HttpSessionEvent se)
	{
		System.out.println("即将钝化之前：BeanDemo2对象即将随着HttpSession对象被钝化…");
	}
	//活化之后
	@Override
	public void sessionDidActivate(HttpSessionEvent se)
	{
		System.out.println("活化之后：BeanDemo2对象刚刚随着HttpSession对象被活化了…");
	}
}
```

**③编写JSP，实现钝化与活化**

**a.实现钝化：将对象增加到`HttpSession`对象中，并随着`HttpSession`对象一起钝化**

**write.jsp**

```
…
<body>
	<%
		BeanDemo2 beanDemo = new BeanDemo2();
		beanDemo.setName("张三");
		beanDemo.setAge(23);
		session.setAttribute("beanDemo", beanDemo) ;
	%>
</body>
…
```

启动服务，执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，JSP页面的运行结果：


![](http://i.imgur.com/tYvNV5j.png)


一段时间后（时间长短与会话管理器中`Manager`元素的`maxIdleSwap`属性有关），Console控制台会有如下显示：

![](http://i.imgur.com/z1tmq2L.png)

因此可以得知，`BeanDemo2`对象会随着`HttpSession`对象被钝化。根据会话管理器中`Store`元素的`directory`属性，可以找到钝化后的文件，如下：

![](http://i.imgur.com/Zg1t5lp.png)


**b.实现活化：钝化以后，将对象随`HttpSession`对象一起活化**

编写**read.jsp**，从`session`域中读取对象，如下：


**read.jsp**

```
…
<body>
	从session域中读取对象 <br/>
	姓名：${sessionScope.beanDemo.name } <br/>
	年龄：${sessionScope.beanDemo.age } <br/>
</body>
…
```

重启Tomcat服务，先执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，然后在Console控制台打印“即将钝化之前…”以前，迅速再执行[http://localhost:8888/ListenerProject/read.jsp](http://localhost:8888/ListenerProject/read.jsp)，可得如下结果：


![](http://i.imgur.com/jQu5H2D.png)

可以发现，在钝化之前可以从`session`域中读取对象的数据（内存中的`session`域中读取）。过一会儿，当控制台打印“即将钝化之前…”以后（说明此时`HttpSession`对象已经被钝化，被保存在了硬盘中），再次执行[http://localhost:8888/ListenerProject/read.jsp](http://localhost:8888/ListenerProject/read.jsp)，运行结果：

![](http://i.imgur.com/FQIAooq.png)

数据不显示的原因是：持久化（钝化）类没有实现Serializable接口。如果一个类没有实现Serializable接口，那么当Servlet容器持久化`HttpSession`对象时，是不会持久化该类的对象的。本例中，BeanDemo2类没有实现Serializable接口，因此BeanDemo2的对象不会随`HttpSession`一起被持久化，就会在`HttpSession`被持久化时丢失。

修改BeanDemo2类，让其实现Serializable接口，如下：


**org.lanqiao.listener.BeanDemo2.java**

```
package org.lanqiao.listener;
import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;
public class BeanDemo2 implements HttpSessionActivationListener, Serializable
{
	…
}
```

重启服务，执行[http://localhost:8888/ListenerProject/write.jsp](http://localhost:8888/ListenerProject/write.jsp)，等待Console控制台输出“即将钝化之前…”，如下：

![](http://i.imgur.com/LA7YzVt.png)


再执行**read.jsp**，得到**read.jsp**的运行结果：

![](http://i.imgur.com/1pQSnTa.png)


此时Console控制台的运行结果：

![](http://i.imgur.com/ekKPJ1O.png)

可以得知，BeanDemo2对象在随`HttpSession`对象被钝化以后，又会在程序访问`HttpSession`对象时随`HttpSession`对象一起被活化。此外，需要注意，JavaBean必须先实现Serializable接口，之后才能被持久化到硬盘上。


稍等片刻后，控制台会再次显示“即将钝化之前…”，如下：

![](http://i.imgur.com/SAthfNA.png)

读者应该知道再次显示的原因了吧？


# 7.6练习题 #

**一、选择题**

1  在Tomcat中配置JNDI资源时，需要在（    ）文件里配置。（选择一项）（难度★）

A．web.xml		
				
B．server.xml

C．context.xml		
				
D．tomcat-users.xml


2  当应用程序使用完数据库连接池中的连接之后，下面的说法中最准确的是（    ）。（选择一项）（难度★★）

A．立即关闭连接

B．将连接一直置于空闲状态

C．将连接置于空闲状态，直到超过最大空闲时间时关闭连接

D．将连接置于空闲状态，直到超过最大空闲时间时关闭连接（且连接数不低于最小连接数）

**二、简答题**

1.分页类包含类哪些属性？（难度★★）

2.页面大小与总页数之间，有什么关系？若已知页面大小，如何设置总页数？（难度★★）

3.写出基于oracle的分页SQL语句。（难度★★★）

4.通过JSP及Servlet实现上传照片的功能。（难度★★★）

5.在Tomcat中，如何配置和使用数据库连接池？（难度★★★）

6.请描述什么是数据库连接池和使用数据库连接池的好处。（难度★★）

7.什么是数据源？请介绍使用数据源的好处。（难度★★）

8.什么是JNDI？请简要描述JNDI的作用。（难度★★）

9.使用连接池继续优化第六章练习题中的“部门管理系统”。（难度★★★★）

10.使用分页继续优化第六章练习题中的“部门管理系统”。（难度★★★★）

11.使用过滤器，将第六章练习题中的“部门管理系统”进行POST方式的统一编码。（难度★★★）









