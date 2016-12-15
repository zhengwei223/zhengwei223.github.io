---

layout: post


title: 分页与上传下载


category: JSP-Servlet教程


tags: JSP Servlet


description: 本章将系统介绍分页与上传下载。


author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---

# 6.1 分页显示 #

我们给之前的项目（StudentManagerBy3TierAndInterface）存入10条数据并显示，如图，

![](/public/img/jsp-servlet-zq/6.1.png)

*图6-01*

试想，如果存入100条数据，则页面一定会被拉的很长，用户必须拉滚动条才能访问全部数据。
如果数据量更大，一千条、一万条、甚至几十万、几百万条数据呢？显然，将如此多的数据放在同一个页面中显示是不可取的。因此，我们就需要通过分页技术来减轻页面的负荷。

所谓分页，就是将原来在一个页面显示的数据，分到多个页面中显示，并且可以通过页码在多个页面之间切换。

分页的实现有多种方式，我们在此介绍最常用的一种：每次翻页的时候，只从数据库里查询出当前页所需要的数据。此种分页方式，需要依赖SQL语句，但不同数据库的SQL语句之间存在着差异。因此在编写分页时，我们需要对不同的数据库，写不同的SQL语句，本书采用的是Oracle数据库。下面就通过代码，来实际讲解一下分页。

本章的演示项目名为StudentManagerWithPage，是建立在之前的StudentManagerBy3TierAndInterface项目的基础上。

#### 实现分页，需要提供5个属性（变量）####

**1.数据总数：**

一共有多少条数据需要显示；可以通过”select count(1) from …”从数据库表中获取。

**2.页面大小：**

每页显示几条数据；可以由用户自己设置。

**3.总页数：**

总页数可以由“数据总数”和“页面大小”计算得出。例如，①如果一共有80条数据（即“数据总数”为80），而每页只显示10条（即“页面大小”为10），则可以得到总页数=80/10=8（正好除尽，没有余数），共8页；②如果一共有82条数据，每页仍然显示10条，则总页数=82/10（有余数）+1=9，共9页数据。因此，我们在求总页数之前，需要先判断是否有余数。综上，求总页数的公式：

总页数 = （数据总数 % 页面大小==0 ） ? （数据总数 / 页面大小） : （数据总数 / 页面大小 +1）	

需要注意，因为“总页数”是由“数据总数”和“页面大小”计算而来的，所以不应该手动的为“总页数”赋值，即不存在“总页数”的`setter`方法。

**4.当前页的页码：**

指定需要显示第几页的数据；可以由用户自己指定。

**5.实体类集合：**

如`List<Student> students`，用来保存当前页面中全部学生的信息。

为了便于维护，我们把这5个属性封装到一个`Page`类中，并提供相应的`getter`/`setter`方法，如下，

**org.lanqiao.util.Page**

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
         //自动计算出“总页数”
		totalPage = this.totalCount % pageSize == 0 ? 
(this.totalCount / pageSize) : this.totalCount / pageSize + 1;
	}
	//省略其他常规的setter/getter方法
}
```

再在数据访问层，增加分页操作需要的两个方法：①获取数据总数的方法，②获取当前页面中全部学生的信息的集合的方法（例如获取`List<Student> students`集合的值）。而这两个方法都需要使用特定的SQL语句：

**①**获取数据总数方法：使用“`select count(*) from student`”语句即可。

**②**获取当前页面中全部学生的信息的集合：

我们需要知道当前页的第一条及最后一条数据的行号，然后使用“`select * from student where 编号>=第一条数据行号 and 编号<=最后一条数据行号`”即可查出当前页的全部学生信息。为了分析“第一条及最后一条数据的行号”，我们列了以下表格（假设每页显示10条数据，即页面大小为10）：

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

**第“ (n-1)*页面大小+1”条   至    第 “n*页面大小”条**

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

为了实现分页，DBUtil需要从数据库查询①数据总数（`Page`类中的属性`totalCount`），以及②当前页面中全部学生信息的集合（`Page`类中的属性`students`）。因此需要在`DBUtil`中加入“查询数据总数”方法`getTotalCount()`和查询学生信息集合（结果集）的方法`executeQuery()`；其中executeQuery()在之前的DBUtil中已经讲解过，这里不再赘述。

**DBUtil.java**

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

**IStudentDao.java** 接口

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

**StudentDaoImpl.java**实现类

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
			DBUtil.closeAll(rs, DBUtil.getPstmt(), DBUtil. getConnection ());
		}
		return students;
	}
 }
```

然后在`SERVICE`层，加入“①获取数据总数”方法，和“②获取当前页面中全部学生信息的集合”方法

**IStudentService.java**接口

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

**StudentServiceImpl.java**实现类

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

**QueryAllStudentsServlet.java**

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

因为程序是先执行QueryAllStudentsServlet，然后再跳转到显示页面**index.jsp**中，因此需要将QueryAllStudentsServlet设置为项目的默认启动程序，如下：

**web.xml**

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

![](/public/img/jsp-servlet-zq/6.2.png)

*图6-02*

**说明：**

   基于不同数据库的分页操作，唯一不同的就是SQL语句。除了oracle以外，其他常用数据库（如MySql、SqlServer）中的分页SQL语句如下：

**MySql:**select * from 表名  limit 当前页的页码*页面大小,页面大小;

**SqlServer:**select top 页面大小 * from 表名 where id not in(select top (当前页的页码-1)*页面大小  id from 表名)

其中id表示“数据表的唯一标示符”


# 6.2文件上传 #

在Java Web中，有很多文件上传的工具，本节以常用的Commons-FileUpload组件为例，进行详细的讲解。
下载功能比较简单，直接使用Servlet类和IO流就能实现。

## 6.2.1使用 Commons-FileUpload实现文件上传 ##

Commons是Apache组织的一个项目，除了文件上传以外，Commons还提供了命令行处理、数据库连接池等功能。

Commons-FileUpload不但能方便的实现文件上传功能，还可以获取上传文件的各种信息（如文件的名称、类型、大小等），并能对上传的文件进行一些控制（如限制上传的类型、大小等）。

在实际使用之前，我们需要先下载Commons-FileUpload的JAR文件（下载地址[http://commons.apache.org/proper/commons-fileupload/)](http://commons.apache.org/proper/commons-fileupload/)）。此外，因为文件上传必然会涉及到文件的读写操作，所以还需要下载Commons-IO的JAR文件（下载地址[http://commons.apache.org/proper/commons-io/)](http://commons.apache.org/proper/commons-io/)）。将这两个文件下载后解压，分别找到**commons-fileupload-1.3.1.jar**和**commons-io-2.4.jar**，并将这两个`jar`加入到Web项目的`lib`目录内即可。

下面，通过示例详细讲解Commons-FileUpload的使用。本示例的项目名为StudentManagerWithFileUpload，该项目基于之前的StudentManagerWithJNDIPool项目。

#### (1)文件上传前台 ####

文件上传的前台是通过表单实现的，但包含文件上传的表单与一般元素的表单的编码类型不同。若表单中包含了文件上传元素，就需要在表单中增加enctype=”multipart/form-data”属性，用于将表单设置为文件上传所需要的编码类型。此外，还必须将method设置为post方式，并且通过input标签的type=”file”来加入上传控件，如下，

在增加学生页面**addStudent.jsp**中，加入文件上传的前台代码：

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

![](/public/img/jsp-servlet-zq/6.3.png)

*图6-03*

#### (2)文件上传后台 ####

首先要确保Web项目的lib下存在commons-fileupload-版本号.jar和commons-io-版本号.jar，这两个组件提供了很多文件上传所依赖的接口、类和方法，如下
**①ServletFileUpload类的常用方法：**

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

**②FileItem接口的常用方法：**

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


**③FileItemFactory接口的常用方法：**

`ServletFileUpload`对象的创建，需要依赖于FileItemFactory接口。从接口名FileItemFactory可以得知FileItemFactory是一个工厂。我们通常使用的是FileItemFactory的实现类DiskFileItemFactory类。

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>public void  setSizeThreshold(int sizeThreshold)</td>
      <td>文件上传组件在解析上传数据中的每个字段内容时，需要临时保存解析出的数据，以便在后面进行数据的进一步处理。如果上传的文件很大，例如1000M的文件，在内存中将无法临时保存该文件内容，文件上传组件转而采用临时文件来保存这些数据；但如果上传的文件很小，例如100个字节的文件，显然将其直接保存在内存中性能会更加好些。 setSizeThreshold()方法用于设置将上传文件以临时文件的形式保存在磁盘的临界值（以字节为单位）；如果没有设置此临界值，将会采用系统默认值10KB。</td>
   </tr>
   <tr>
      <td>public void    setRepository(File repository)</td>
      <td>设置当上传文件的内容大于setSizeThreshold()方法设置的临界值时，将文件以临时文件形式保存在磁盘上的存放目录；若小于，就将文件保存在内存中。</td>
   </tr>
</table>

现在，就来编写实现上传的后台代码。

**AddStudentServlet.java**

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

![](/public/img/jsp-servlet-zq/6.4.png)

*图6-04*

然后执行addStudent.jsp，输入学生信息并上传一个名为abc.png的图片，如下：

![](/public/img/jsp-servlet-zq/6.5.png)

*图6-05*

单击“增加”按钮后，查看upload目录，可以看到文件已经正确上传。

**说明：**

读者可以尝试，如果修改服务器**AddStudentServlet.java**中的代码，再重启tomcat，那么tomcat中的upload目录就会消失。这是因为我们之前将Tomcat的Server Locations设置为了第二项“Use Tomcat installation”，这样会使得每次tomcat重启时都会检查项目是否有改动，如果有，就会重新编译并部署项目，所以会导致用户自己建立的upload目录消失。解决办法可以简单的将Server Locations改为其他选项，或使用虚拟路径来解决，或直接将upload目录放置到tomcat目录外的任一路径，读者可以自行尝试。

而如果服务器**AddStudentServlet.java**中的代码没有修改，再次重启tomcat，因为代码没修改，因此就不会重新编译部署，所以upload就不会被删除。

## 6.2.2使用 Commons-FileUpload控制文件上传 ##

为了提高系统的安全和性能，我们经常需要对上传的文件进行一些控制，如控制上传文件的类型、大小等。

#### (1)控制上传文件的类型 ####

我们已经知道，可以通过FileItem的getName()方法获取上传文件的文件名（如abc.png，日记.txt，阿甘正传.rmvb），而文件的类型就是通过”.”后面的字符串控制的（如png、jpg、bmp等是图片格式，txt是一种文本文档格式，rmvb是一种电影格式等）。因此，我们只需要将文件名”.”后面的内容进行截取，然后判断截取后的内容是否符合规定的文件类型即可，具体如下，

**AddStudentServlet.java**

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

如果上传一张图片abc.png，则提示上传成功；但如果上传一个文本文档（如oracle.txt），就会提示“…失败！文件类型必须是png、bmp或jpg! “

#### (2)控制上传文件的大小 ####

前面讲过，我们可以通过DiskFileItemFactory的`setSizeThreshold()`方法来设置缓冲区大小，并且当上传的文件超过缓冲区大小时，可以临时存储在由`setRepository()`方法设置的临时文件目录中。此外，可以通过ServletFileUpload的`setSizeMax()`来限制单个上传文件的最大字节数。设置完成以后，执行`ServletFileUpload.parseRequest()`方法时，如果发现正在上传的文件超过了`setSizeMax()`设置的最大值，则就会抛出一个FileUploadBase.SizeLimitExceededException类型的异常。因此上传时如果抛出了此异常，就说明上传的文件超出了最大值。控制上传文件大小的具体代码，如下，

**AddStudentServlet.java**

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
				…
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



# 6.3 文件下载 #

要实现文件的下载功能，不仅需要指定文件的路径，还需要在HTTP中设置两个响应消息头信息，如下：

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

![](/public/img/jsp-servlet-zq/6.6.png)

*图6-06*

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

![](/public/img/jsp-servlet-zq/6.7.png)

*图6-07*

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

![](/public/img/jsp-servlet-zq/6.8.png)

*图6-08*

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

![](/public/img/jsp-servlet-zq/6.9.png)

*图6-09*

此外，我们可以通过请求头信息中的“USR-AGENT”来辨别下载时刻所使用的浏览器，进而根据浏览器的类型来解决相应的乱码问题。完整的文件下载Servlet代码如下：

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




















