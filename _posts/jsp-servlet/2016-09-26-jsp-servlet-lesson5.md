---

layout: post


title: 三层架构


category: JSP-Servlet教程


tags: JSP Servlet


description: 本章将系统介绍三层架构。在实际开发中，“三层架构”可以提高代码的可重用性。

author: 颜群


keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---

# 5.1 什么是三层 #

在实际的开发中，为了更好的解耦合、使开发人员之间的分工明确、提高代码的可重用性等，通常会采用“三层架构”的模式来组织代码。

**所谓“三层”，是指表示层(USL，User Show Layer)、业务逻辑层(BLL，Business Logic Layer)、数据访问层(DAL，Data Access Layer)**，各层的位置如下图，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.1.png)

*图5-01*

三层中使用的数据，是通过实体类（即封装数据的JavaBean）来传递的。实体类一般放在`entity`包下。

**各层的简介如下：**

* **数据访问层(`DAL`)**：

也称为持久层，位于三层中的最下层，用于对数据进行处理。该层中的方法一般都是“原子性”的，即每一个方法都不可再分。比如，可以在DAL层中实现数据的增删改查操作，而增、删、改、查四个操作是非常基本的功能，都是不能再拆分的。

在程序中，`DAL`一般写在`dao`包中，包里面的类名也是以`”Dao”`结尾，如`StudentDao.java`、`DepartmentDao.java`、`NewsDao.java`等；换句话说，在程序中，DAL是由`dao`包中的多个“类名`Dao.java`”组成。每一个“类名`Dao.java`”类，就包含着对该“类名”的所有对象的数据操作，如`StudentDao.java`中包含对`Student`对象的增、删、改、查等数据操作，`DepartmentDao.java`中包含对`Department`对象的增、删、改、查等数据操作。

* **业务逻辑层(`BLL`)**：

位于三层中的中间层（`DAL`与`USL`中间），起到了数据交换中承上启下的作用，用于对业务逻辑的封装。`BLL`的设计对于一个支持可扩展的架构尤为关键，因为它扮演了两个不同的角色。对于`DAL`而言，它是调用者；对于`USL`而言，它却是被调用者。依赖与被依赖的关系都纠结在`BLL`上。

使用上，就是对`DAL`中的方法进行“组装”。比如，该层也可以实现对`Student`的增删改查，但与`DAL`不同的是，`BLL`中的增、删、改、查不再是 “原子性”的功能，而是包含了一定的业务逻辑。比如该层中的“删”不再像`DAL`中那样仅仅实现“删”，而是在“删”之前要进行业务逻辑的判断：先查找该学生是否存在（即先执行DAL层的“查”），如果存在才会真正的“删”（再执行DAL层的“删”），如果不存在则应该提示错误信息。即BLL中的“删”，应该是“带逻辑的删”（即先“查”后“删”），也就是对DAL中的“查”和“删”两个方法进行了“组装”。

在程序中，`BLL`一般写在`service`包（或`biz`包）中，包里面的类名也是以”Service（或Biz）”结尾，如`StudentService.java`、`DepartmentService.java`、`NewsService`等。换句话说，在程序中，BLL是由`service`包中的多个“类名`Service.java`”组成。每一个“类名`Service.java`”类，就包含着对该“类名”的对象的业务操作，如StudenService.java中包含对`Student`对象的“带逻辑的删”、“带逻辑的增”等业务逻辑操作，DepartmentService.java中包含对所有`Department`对象的“带逻辑的删”、“带逻辑的增”等业务逻辑操作。

* **表示层(`USL`)**：

 位于三层中的最上层，用于显示数据和接收用户输入的数据，为用户提供一种交互式操作的界面。USL又分为“USL前台代码”和“USL后台代码”，其中“USL前台代码”是指用户能直接访问到的界面，一般是程序的外观（如html文件、JSP文件等），类似于MVC模式中的“视图”；“USL后台代码”是指用来调用业务逻辑层的JAVA代码（如Servlet），类似于MVC模式中的“控制器”。表示层前台代码一般放在WebContent目录下，而表示层后台代码目前放在servlet包下。

**以下，是一个最基本三层架构的示例图**：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.2.png)

*图5-02*

不难发现，**MVC模式与三层架构的关系如下图**，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.3.png)

*图5-03*

**MVC和三层架构，是分别从两个不同的角度去设计的，但目的都是为了“解耦，分层，代码复用等”。**

# 5 .2 三层间的关系 #

三层之中，上层依赖于下层：表示层依赖于业务逻辑层，业务逻辑层依赖于数据访问层。

上层通过方法调用，把请求通知给下层；而下层处理完请求后，把最终的响应传递给上层。

下面通过一个简单的“学生管理系统”案例，详细讲解一下三层。本案例主要通过三层架构，实现一个能对学生进行“增删改查”的项目，采用Servlet2.5方式。

**实体类：org.lanqiao.entity.Student.java**

```
package org.lanqiao.entity;

public class Student
{
	private int studentNo;// 学号
	private String studentName;//姓名
	private int studentAge;//年龄
	private String gradeName;//年级
	
	public Student()
	{
	}
	
	public Student(int studentNo, String studentName, 
int studentAge, String gradeName)
	{
		this.studentNo = studentNo;
		this.studentName = studentName;
		this.studentAge = studentAge;
		this.gradeName = gradeName;
	}
	//省略setter、getter
}
```

#### 数据访问层 ####

对学生信息，最基本的“增删改查”操作

**org.lanqiao.dao.StudentDao.java**

```
package org.lanqiao.dao;
…
public class StudentDao
{
	private static final String DRIVER_NAME 
= "oracle.jdbc.OracleDriver";
	private static final String URL 
= "jdbc:oracle:thin:@127.0.0.1:1521:XE";
	private static final String USERNAME = "system";
	private static final String PWD = "sa";

	// 增加学生
	public boolean addStudent(Student stu)
	{
		Connection conn = null;
		PreparedStatement pstmt = null;
		// flag用来标记是否增加成功，若增加成功则返回true，若增加失败则返回false
		boolean flag = true;
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
			String sql = "insert into student
(stuNo,stuName,stuAge,graName) values(?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, stu.getStudentNo());
			pstmt.setString(2, stu.getStudentName());
			pstmt.setInt(3, stu.getStudentAge());
			pstmt.setString(4, stu.getGradeName());
			
			pstmt.executeUpdate(sql);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			flag = false;
		}
		finally
		{
			try
			{
				if(pstmt != null) pstmt.close();
				if(conn != null)conn.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
				flag = false;
			}
		}
		return flag;
	}

	// 根据学号删除学生
	public boolean deleteStudentByNo(int stuNo)
	{
		Connection conn = null;
		PreparedStatement pstmt = null;
		// flag用来标记是否删除成功，若删除成功则返回true，若删除失败则返回false
		boolean flag = true;
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
			String sql = "delete from student where stuNo = ? " ;
			pstmt =  conn.prepareStatement(sql);
			pstmt.setInt(1, stuNo);
			pstmt.executeUpdate(sql);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			flag = false;
		}
		finally
		{
			try
			{
				if(pstmt != null)pstmt.close();
				if(conn != null)conn.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
				flag = false;
			}
		}
		return flag;
	}

	// 修改学生信息:将原来学号为stuNo的学生信息，修改为实体类stu中的包含信息
	public boolean updateStudent(Student stu, int stuNo)
	{
		Connection conn = null;
	PreparedStatement pstmt = null;
		// flag用来标记是否修改成功，若修改成功则返回true，若修改失败则返回false
		boolean flag = true;
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
			String sql = "update student set stuNo = ?,
stuName = ?,stuAge = ? ,graName=? where stuNo = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, stu.getStudentNo());
			pstmt.setString(2, stu.getStudentName());
			pstmt.setInt(3, stu.getStudentAge());
			pstmt.setString(4, stu.getGradeName());
			pstmt.setInt(5, stu.getStudentNo());
			
			pstmt.executeUpdate(sql);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			flag = false;
		}
		finally
		{
			try
			{
				if(pstmt != null)pstmt.close();
				if(conn != null)conn.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
				flag = false;
			}
		}
		return flag;
	}

	// 根据学号，查询某一个学生
	public Student queryStudentByNo(int stuNo)
	{
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Student stu = null;
		
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
			String sql = "select stuNo,stuName,stuAge,graName 
from student where stuNo = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, stuNo);
			rs = pstmt.executeQuery();
			if (rs.next())
			{
				int sNo = rs.getInt("stuNo");
				String sName = rs.getString("stuName");
				int sAge = rs.getInt("stuAge");
				String gName = rs.getString("graName");
				// 将查到的学生信息，封装到stu对象中
				stu = new Student(sNo, sName, sAge, gName);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if(rs!=null) rs.close();
				if(pstmt!=null) pstmt.close();
				if(conn!=null) conn.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
			}
		}
		return stu;
	}

	// 查询全部学生
	public List<Student> queryAllStudents()
	{
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		List<Student> students = new ArrayList<Student>();
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
			String sql = "select stuNo,stuName,stuAge,graName 
from student ";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
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
			try
			{
				if(rs!=null) rs.close();
				if(pstmt!=null) pstmt.close();
				if(conn!=null) conn.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
			}
		}
		return students;
	}

	// 根据学号，判断某一个学生是否已经存在
	public boolean isExistByNo(int stuNo)
	{
		boolean isExist = false;
		Student stu = this.queryStudentByNo(stuNo);
		//如果stu为null，说明查无此人，即此人不存在；否则说明已经存在此人
		isExist = (stu == null) ? false : true;
		return isExist;
	}
}
```

#### 业务逻辑层 ####

实现带逻辑的“增删改查”操作，本质是对数据访问层的多个方法进行了“组装”。

**org.lanqiao.service.StudentService.java**

```
package org.lanqiao.service;
import java.util.List;
import org.lanqiao.entity.Student;
public class StudentService
{
	//业务逻辑层依赖于数据访问层
	StudentDao stuDao = new StudentDao();
	
	// 增加学生
	public boolean addStudent(Student stu)
	{
		//增加之前先进行逻辑判断，如果此人已经存在，则不能再次增加
		if(stuDao.isExistByNo(stu.getStudentNo()))
		{
			System.out.println("此人已经存在，不能重复增加！");
			return false ; 
		}
		//调用数据访问层的方法，实现增加操作
		return stuDao.addStudent(stu);
	}

	// 根据学号删除学生
	public boolean deleteStudentByNo(int stuNo)
	{
		//删除之前先进行逻辑判断，如果此人不存在，则给出错误提示
		if(!stuDao.isExistByNo(stuNo)){
			System.out.println("查无此人，无法删除！");
			return false ; 
		}
		//调用数据访问层的方法，实现删除操作
		return stuDao.deleteStudentByNo(stuNo);
	}

	// 修改学生信息:将原来学号为stuNo的学生信息，修改为实体类stu中的包含信息
	public boolean updateStudent(Student stu, int stuNo)
	{
		//修改之前先进行逻辑判断，如果需要修改的人不存在，则给出错误提示
		if(!stuDao.isExistByNo(stuNo)){
			System.out.println("查无此人，无法修改！");
			return false ; 
		}
		//调用数据访问层的方法，实现删除操作
		return stuDao.updateStudent(stu, stuNo);
	}

	// 根据学号，查询某一个学生
	public Student queryStudentByNo(int stuNo)
	{
		//查询操作一般不用判断，直接调用数据访问层的方法即可
		return stuDao.queryStudentByNo(stuNo);
	}

	// 查询全部学生
	public List<Student> queryAllStudents()
	{
		//查询操作一般不用判断，直接调用数据访问层的方法即可
		return stuDao.queryAllStudents();
	}
	
	// 根据学号，判断某一个学生是否已经存在
	public boolean isExistByNo(int stuNo)
	{
		//直接调用数据访问层的方法进行判断
		return stuDao.isExistByNo(stuNo);
	}
}
```

通过代码可以发现，业务逻辑层依赖于数据访问层（使用到了数据访问层的对象`stuDao`）；并且业务逻辑层的本质，就是编写一些逻辑判断代码，然后调用相应的数据访问层的方法。

#### 表示层后台代码 ####

对业务逻辑层的调用，使用Servlet实现。

通常情况，一个Servlet只用来实现一个功能。所以增、删、改、查询一个学生、查询全部学生等5个功能，需要编写5个对应的Servlet来实现。

**(1)**增加学生

**org.lanqiao.servlet.AddStudentServlet.java**

```
package org.lanqiao.servlet;
// 省略import
public class AddStudentServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		// 若是get方式的请求，也仍然使用post方式进行处理
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		// 接收表单提交的数据
		int studentNo = Integer.parseInt(request.getParameter("sno"));
		String studentName = request.getParameter("sname");
		int studentAge = 
Integer.parseInt(request.getParameter("sage"));
		String gradeName = request.getParameter("gname");
		// 将数据封装到实体类中
		Student stu =
 new Student(studentNo, studentName, studentAge, gradeName);
		// 调用业务逻辑层代码
		StudentService stuService = new StudentService();
		boolean result = stuService.addStudent(stu);

		if (!result)
		{
			// 如果增加失败,在request中放入一个标识符，标识一下错误
			request.setAttribute("addError", "error");
			// 返回增加页面。因为需要传递request作用域中的数据，所以使用请求转发
			request.getRequestDispatcher("addStudent.jsp")
.forward(request, response);
		}
		else
		{
			response.sendRedirect("QueryAllStudentsServlet");
		}
	}
}
```

**(2)**根据学号，删除某一个学生信息


**org.lanqiao.servlet.DeleteStudentServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class DeleteStudentServlet extends HttpServlet
{

	protected void doGet(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		//若是get方式的请求，也仍然使用post方式进行处理
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
//接收通过地址重写，传递来的参数
		int studentNo = 
Integer.parseInt(request.getParameter("stuNo"));	
// 调用业务逻辑层代码
		StudentService stuService = new StudentService();
		boolean result = stuService.deleteStudentByNo(studentNo);
		if (!result)
		{
			// 如果删除失败,在request中放入一个标识符，标识一下错误
			request.setAttribute("delError", "error");
		}
		if(request.getAttribute("addError") != null )
		{
				out.print("<strong>增加失败！</strong>");		
		}
        else
        {
		// 返回增加页面。因为需要传递request作用域中的数据(错误标识符)，
所以使用请求转发
		request.getRequestDispatcher("QueryAllStudentsServlet")
.forward(request, response);
	}
}
```

**(3)**根据学号，查询某一个学生信息

**org.lanqiao.servlet.QueryStudentByNoServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class QueryStudentByNoServlet extends HttpServlet
{

	protected void doGet(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		//若是get方式的请求，也仍然使用post方式进行处理
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		//接收需要显示学生的学号
		int studentNo = 
Integer.parseInt(request.getParameter("stuNo"));
		//调用业务逻辑层代码
		StudentService stuService = new StudentService();
		Student stu = stuService.queryStudentByNo(studentNo);
		//将查到的学生信息放入request作用域中
		request.setAttribute("stu",stu);
		request.getRequestDispatcher("showStudentInfo.jsp")
.forward(request, response);
	}
}
```

**(4)**查询全部学生信息

**org.lanqiao.servlet.QueryAllStudentsServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class QueryAllStudentsServlet extends HttpServlet
{

	protected void doGet(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		//若是get方式的请求，也仍然使用post方式进行处理
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request
, HttpServletResponse response)
 throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		// 调用业务逻辑层代码
		StudentService stuService = new StudentService();
		List<Student> students = stuService.queryAllStudents();
		//将查到的学生集合放入request作用域中
		request.setAttribute("students", students);
		//跳转到首页（学生列表页）
		request.getRequestDispatcher("index.jsp")
.forward(request, response);
	}
}
```

**(5)**根据学号，修改某一个学生信息

**org.lanqiao.servlet.UpdateStudentServlet.java**

```
package org.lanqiao.servlet;
//省略import
public class UpdateStudentServlet extends HttpServlet
{
	protected void doGet(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		// 若是get方式的请求，也仍然使用post方式进行处理
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request
, HttpServletResponse response) 
throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		// 接收需要修改学生的学号
		int studentNo = Integer.parseInt(request.getParameter("sno"));
		// 接收修改后的学生信息(学号不能修改)
		String studentName = request.getParameter("sname");
		int studentAge = 
Integer.parseInt(request.getParameter("sage"));
		String gradeName = request.getParameter("gname");
		// 将学生信息，封装到实体类中
		Student student =
 new Student(studentNo,studentName,studentAge,gradeName);
		
		// 调用业务逻辑层代码，实现修改
		StudentService stuService = new StudentService();
		boolean result = stuService.updateStudent(student, studentNo);
		
		if (!result)
		{
			// 如果修改失败,在request中放入一个标识符，标识一下错误
			request.setAttribute("updateError", "error");
		}else
		{
			request.setAttribute("updateSuccess", "success");
		}
		//将修改后的学生信息放入request作用域中
		request.setAttribute("stu", student);
		
		// 返回修改页面(学生详情页)。因为需要传递request作用域中的数
据(错误标识符)，所以使用请求转发
	     request.getRequestDispatcher("showStudentInfo.jsp")
.forward(request, response);
	}
}
```

#### 表示层前台代码 ####

**(1)**增加学生

**addStudent.jsp**

```
<body>
		<%-- 如果增加失败，返回本页时需有错误提示，具体可查看
AddStudentServlet.java中的代码 --%>
		<%
			//如果存放了错误标识
			if(request.getAttribute("addError") != null )
			{
					out.print("<strong>增加失败！</strong>");		
			}
		%>
		<form action="AddStudentServlet" method="post">
			学号：<input type="text" name="sno" /><br/>
			姓名：<input type="text" name="sname" /><br/>
			年龄：<input type="text" name="sage" /><br/>
			年级：<input type="text" name="gname" /><br/>
			<input type="submit" value="增加" /><br/>
		</form>
	</body>	
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.4.png)

*图5-04*

**(2)**根据学号，删除某一个学生

删除学生的表示层前端代码，是通过**index.jsp**中的超链接实现的，如下，

`<a href="DeleteStudentServlet?stuNo=<%=stu.getStudentNo() %>">删除</a>`

，具体可查看**index.jsp**。

**(3)**根据学号，查询某一个学生信息

**showStudentInfo.jsp**

```
<body>
	<h3>学生信息详情页</h3>
	<%
	    //如果修改失败，返回本页时需有错误提示。具体可查看
UpdateStudentServlet.java中的代码 
		//如果存放了错误标识
		if(request.getAttribute("updateError") != null )
		{
				out.print("<strong>修改失败！</strong>");		
		}
	
		//接收查询到的学生信息
		Student stu = (Student)request.getAttribute("stu");
		if(stu !=null)
		{
	%>				<form action="UpdateStudentServlet"  method="post" >
					<%--假设学号不能修改 --%>
				学号：<input type="text" name="sno" readonly="readonly"
value="<%=stu.getStudentNo() %>" /><br/>
				姓名：<input type="text" name="sname" 
value="<%=stu.getStudentName() %> " /><br/>
				年龄 ：<input type="text" name="sage" 
value="<%=stu.getStudentAge() %>" /><br/>
				年级 ：<input type="text" name="gname" 
value="<%=stu.getGradeName() %>" /><br/>
					<input type="submit" value="修改" />
			</form>	
<%		
		}
	%>
		<a href="QueryAllStudentsServlet">返回</a>
</body>
```

在学生列表页**index.jsp**中点击“学号”链接后，通过`QueryStudentByNoServlet`执行请求转发到学生信息详情页**showStudentInfo.jsp** 。


**(4)**查询全部学生信息

**index.jsp**

```
<body>
	  <%-- 如果删除失败，返回本页时需有错误提示。具体可
查看DeleteStudentServlet.java中的代码 --%>
		<%
			//如果存放了错误标识
			if(request.getAttribute("delError") != null )
			{
					out.print("<strong>删除失败！</strong>");		
			}
            if(request.getAttribute("addError") != null )
		    {
				out.print("<strong>增加失败！</strong>");		
		    }

		%>
		<table border="1" >
			<tr>
				<th>学号</th>
				<th>姓名</th>
				<th>年龄</th>
				<th>操作</th>
				<%-- 年级信息不在列表页显示，只能在具体学生的
详情页showStudentInfo.jsp显示 --%>
			</tr>
			
			<%
				List<Student> students = 
(List<Student>)request.getAttribute("students");
				if(students != null)
				{
					for(Student stu : students)
					{
			%>	
					  <tr>
					  	<%-- 单击学号，可以进入修改页面 --%>
					  	<td>
					  	<%--调用查询某一个学生的Servlet；
并通过地址重写的方式，将需要修改学生的学号传递过去 --%>
					  		<a href="QueryStudentByNoServlet
?stuNo=<%=stu.getStudentNo() %>">
<%=stu.getStudentNo() %>
</a>
					  	</td>
					  	
					  	<td><%=stu.getStudentName() %></td>
					  	<td><%=stu.getStudentAge() %></td>
					  	
					  	<%--调用删除的Servlet，并通过地址重写的方式
将学号传递过去 --%>
					  	<td><a href="DeleteStudentServlet
?stuNo=<%=stu.getStudentNo() %>">
删除
</a>
</td>
					  </tr>
			<%	
					}
				}
			%>
		</table>
		<a href="addStudent.jsp">增加</a>
	</body>
```

需要注意的是，项目运行后的第一个执行程序是`QueryAllStudentsServlet`，而不是**index.jsp**。因为项目的首页**index.jsp**要展示的学生列表信息，必须先通过`QueryAllStudentsServlet`查询后才能得到。这个顺序可以通过**web.xml**来配置，如下，


**web.xml**

```
… 
 <welcome-file-list>
    <welcome-file>QueryAllStudentsServlet</welcome-file>
  </welcome-file-list>
… 	
```

通过`QueryAllStudentsServlet`执行请求转发到**index.jsp**的运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.5.png)

*图5-05*

**(5)**根据学号，修改某一个学生信息

修改学生的前端代码中，进入修改界面是通过学生列表页**index.jsp**中的超链接实现的，如下，

```
<td>
	<%--调用查询某一个学生的Servlet；并通过地址重写的方式，
将需要修改学生的学号传递过去 --%>
	<a href="QueryStudentByNoServlet?stuNo
=<%=stu.getStudentNo() %>"><%=stu.getStudentNo() %>
</a>
</td>
```

而修改页面，是通过学生详情页**showStudentInfo.jsp**实现的。

通过本案例可以发现，使用三层搭建的项目，是通过表示层前台代码和用户交互，然后通过表示层后台代码调用业务逻辑层，再通过业务逻辑层调用数据访问层，最后通过数据访问层和数据库交互；并且当数据访问层获取到数据以后，再将数据传递给业务逻辑层，而业务逻辑层则将最终的数据传递给表示层，如下图。

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.6.png)

*图5-06*

#### 三层之间的数据传递 ####

总的来说，三层间的数据是通过方法的参数或返回值传递的。

上层到下层的数据传递：通过方法的参数（如实体类`Student`类型、`int`类型的参数）；

下层到上层的数据传递：方法的返回值。

其中，特殊的是`USL`层，`USL`前台代码通过http请求（如`get`/`post`方式的表单提交），将数据传递给`USL`后台代码（如Servlet）；`USL`后台代码通过转发或重定向，跳转回USL前台代码（如JSP）。

结合本案例来讲：

**①从上层到下层：**

表示层前台代码通过超链接、表单提交等http请求方式，将数据传递给表示层后台代码（如`<form action="AddStudentServlet" >`）；

表示层后台代码将接收到的数据封装到实体类里，然后通过方法传参的形式，将数据传递给业务逻辑层（如`stuService.addStudent(stu)`）；同样的，业务逻辑层也通过方法传参的形式，将数据传递给数据访问层（如`stuDao.addStudent(stu)`）。

**②从下层到上层：**

数据访问层通过方法的返回值，将处理结果返回给业务逻辑层（如return flag）；同样的，业务逻辑层也通过方法的返回值，将处理结果返回给表示层的后台代码（如`return stuDao.addStudent(stu)`）；最后，表示层的后台代码，再通过请求转发或重定向的方法，将数据传递给表示层前台代码（如`response.sendRedirect("QueryAllStudentsServlet")`）。

本案例的结构图，如下，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.7.png)

*图5-07*

# 5.3 优化三层架构 #

为了使设计与实现相分离，以及更好的解耦合，我们给上面的项目加入接口，并且重构部分代码。

给业务逻辑层和数据访问层加上接口。接口所在的包名，与之前该层的包名相同，如业务逻辑层中接口所在的包名，仍然是`org.lanqiao.service`；接口的文件名，一般在前面加上字母I（Interface的简称），如`IStudentService.java`。而实现类所在的包名，需在后面加上impl（implements的缩写），如`org.lanqiao.service.impl`；实现类的文件名，一般在后面加上Impl，如`StudentServiceImpl.java`。如图，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.8.png)

*图5-08*

分析之前的代码，可以发现数据访问层中，存在着大量的重复代码。我们可以把重复的代码提取出来，封装到一个公共的类中（帮助类），从而实现代码的重构。为此，我们再创建一个数据访问层的帮助类`DBUtil.java`，并放入`util`包中。

**org.lanqiao.DBUtil.java**

```
package org.lanqiao.util;
// 省略import
public class DBUtil
{
	// 通用的增加、删除、修改方法。执行传入sql语句，参数os存放sql语句中占位符?的真实值
	public static boolean executeAddOrUpdateOrDelete(String sql, 
Object[] os)
	{
		// flag用来标记是否增加成功，若增加成功则返回true，若增加失败则返回false
		boolean flag = true;
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
			pstmt = conn.prepareStatement(sql);
			if (os != null)
			{
                 //假设参数sql="insert into student(stuNo,stuName,…)
 values(?,?,..)";其中stuNo代表学号，是整数类型；而stuName代表姓名，是字符串类型。因此可以使用os={1, "张三"};这种Object类型的数组来代表sql语句中的多个？占位符
				for (int i = 0; i < os.length; i++)
				{
					pstmt.setObject(i + 1, os[i]);
				}
			}
			pstmt.executeUpdate();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			flag = false;
		}
		finally
		{
			try
			{
				pstmt.close();
				conn.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
			}
		}
		return flag;
	}

	// 通用的查询方法，返回查询的结果集ResultSet对象
	public static ResultSet queryStudentsBySql(String sql, Object[] os)
	{
		ResultSet rs = null;
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
			pstmt = conn.prepareStatement(sql);
			if (os != null)
			{
//假设参数sql="select * from student where stuAge = ? or stuName = ?";其中stuAge代表年龄，是整数类型；而stuName代表姓名，是字符串类型。因此可以使用os={23, "张三"};这种Object类型的数组来代表sql语句中的多个？占位符
				for (int i = 0; i < os.length; i++)
				{
					pstmt.setObject(i + 1, os[i]);
				}
			}
			rs = pstmt.executeQuery();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return rs;
	}
}
```

可以发现，虽然将访问数据库的方法都封装到了一个`DBUtil`类中，但该类中的代码仍有较多的重复。例如，每个方法都需要加载数据库驱动类，并获取数据库连接对象、创建`PreparedStatement`对象等。为此，我们可以重构这些重复的代码，并将释放操作单独写在一个`closeAll()`方法中，做进一步简化，如下，

**org.lanqiao.DBUtil.java**

```
package org.lanqiao.util;
// 省略import
public class DBUtil
{
	// 省略属性定义及初始化赋值
    
    // 通用的，获取数据库连接对象的方法
	public static Connection getConnection()
	{
		try
		{
			Class.forName(DRIVER_NAME);
			conn = DriverManager.getConnection(URL, USERNAME, PWD);
		}
		catch (ClassNotFoundException e)
		{
			e.printStackTrace();
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return conn;
	}

	// 通用的，获取PreparedStatement对象的方法
	public static PreparedStatement
 createPreparedStatement(String sql,Object[] os) 
	{
		try
		{
			pstmt = getConnection().prepareStatement(sql);
			if (os != null)
			{
				for (int i = 0; i < os.length; i++)
				{
					pstmt.setObject(i + 1, os[i]);
				}
			}
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return pstmt;	}

	// 通用的，关闭访问数据库相关对象的方法(注意PreparedStatement继承自Statement)
	public static void closeAll(ResultSet rs, Statement stmt, 
Connection conn)
	{
		try
		{
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			if (conn != null)
				conn.close();
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
	}

	// 通用的增加、删除、修改方法
	public static boolean executeAddOrUpdateOrDelete(String sql ,
Object[] os)
	{
		// flag用来标记是否增加成功，若增加成功则返回true，若增加失败则返回false
		boolean flag = true;

		try
		{
			// 获取Statement对象
			pstmt = createPreparedStatement(sql,os);
			pstmt.executeUpdate();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			flag = false;
		}
		finally
		{
			closeAll(null, pstmt, conn);
		}
		return flag;
	}

	// 通用的查询方法，返回查询的结果集ResultSet对象
	public static ResultSet executeQuery(String sql, Object[] os) 
{
		ResultSet rs = null; 
		try 
{
			pstmt = createPreparedStatement(sql,os);
			rs = pstmt.executeQuery();
		} catch (SQLException e) 
{
			System.out.println("SQLException：" + e);
		}catch (Exception e) 
{
			System.out.println("查询发生异常：" + e);
		}
		return rs;
```

#### 说明 ####

* **1.问**：数据访问层DAL中的某一个`DAO`实现类（如`StudentDaoImpl.java`），是用于访问数据库；而数据库帮助类**DBUtil.java**也是用于访问数据库。二者有什么区别？

**答**：`StudentDaoImpl.java`这种`DAO`实现类的操作对象是`Student`，即对`Student`进行增删改查等数据访问；而`DBUtil.java`中的增删改查方法都是通用的，不针对于任何一个实体。一般来讲，`DAO`实现类可以通过调用**DBUtil.java**中的方法，来实现对某一个特定实体（如`Student`）的增删改查等操作，详见后文中**StudentDaoImpl.java**中的代码。



* **2.问**：查询方法`executeQuery()`的返回值类型为什么是`ResultSet`，而不是`List<Student>`。例如，查询方法能否写成以下形式：

```
//将查询到的学生集合放入List中，并返回
public static List<Student> queryStudentsBySql(String sql, Object[] os)
{
	List<Student> students = new ArrayList<Student>();
	ResultSet rs = null;
	try
	{
		pstmt = createPreparedStatement(sql,os);
		rs = pstmt.executeQuery();
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
		closeAll(rs, pstmt, conn);
	}
	return students;
}
```

**答**：对于查询方法， `List<Student>`类型的返回值看起来确实比ResultSet更加直观，甚至在使用上更加方便。但是考虑到工具类中方法的“通用性”，就只能使用ResultSet作为返回值类型。例如，对于增删改的通用方法`executeAddOrUpdateOrDelete(String sql ,Object[] os)`来说，只要传入①用于增删改的SQL语句（sql参数）②用于替换SQL语句中所有？占位符的数组（os参数），就能够实现相应SQL语句所代表的增删改功能。也就是说，`executeAddOrUpdateOrDelete()`不依赖任何“实体”，无论是增删改“学生”，还是增删改“班级”、“图书”、“新闻”等，都可以通过调用该方法实现。

但是，如果查询方法的返回值是`List<Student>`，并且方法中存在`rs.getInt("stuNo")`等代码，那么该查询方法就强烈依赖于`Student`类，而不能像增删改方法那样实现“通用性”。因此，为了查询方法的“通用性”，我们只能退一步，让查询方法仅返回结果集ResultSet就可以了，至于实体类数据的封装，以及List集合的填充等操作就只能转交到DAO实现类去完成。

有了`DBUtil.java`之后，数据库访问层中实现类的代码就简单许多了（其它各层的代码不变），如下，

**org.lanqiao.dao.impl.StudentDaoImpl.java**

```
package org.lanqiao.dao.impl;
// 省略import
public class StudentDaoImpl implements IStudentDao
{
	// 增加学生
	public boolean addStudent(Student stu)
	{
		String sql = "insert into student(stuNo,stuName,stuAge,graName) values(?,?,?,?)";
		Object[] os =
		{ stu.getStudentNo(), stu.getStudentName(),
 stu.getStudentAge(), stu.getGradeName() };
		return DBUtil.executeAddOrUpdateOrDelete(sql, os);
	}

	// 根据学号删除学生
	public boolean deleteStudentByNo(int stuNo)
	{
		String sql = "delete from student where stuNo = ?";
		Object[] os =	{ stuNo };
		return DBUtil.executeAddOrUpdateOrDelete(sql, os);
	}

	// 修改学生信息:将原来学号为stuNo的学生信息，修改为实体类stu中的包含信息
	public boolean updateStudent(Student stu, int stuNo)
	{
		String sql = "update student set stuNo = ?,stuName = ?,
stuAge = ?,graName=?  where stuNo = ? ";
		Object[] os =
		{ stu.getStudentNo(), stu.getStudentName(), 
stu.getStudentAge(), stu.getGradeName(), 
stu.getStudentNo() };
		return DBUtil.executeAddOrUpdateOrDelete(sql, os);
	}

	// 根据学号，查询某一个学生
	public Student queryStudentByNo(int stuNo)
	{
		String sql = "select stuNo,stuName,stuAge,graName from student where stuNo = ? ";
		Object[] os =	{ stuNo };
		Student stu = null;
		try
		{
			ResultSet rs = DBUtil.executeQuery(sql, os);

			if (rs.next())
			{
				int sNo = rs.getInt("stuNo");
				String sName = rs.getString("stuName");
				int sAge = rs.getInt("stuAge");
				String gName = rs.getString("graName");
				// 将查到的学生信息，封装到stu对象中
				stu = new Student(sNo, sName, sAge, gName);
			}
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		// 判断students集合是否为空
		return stu;
	}

	// 查询全部学生
	public List<Student> queryAllStudents()
	{
		String sql = "select stuNo,stuName,stuAge,graName from student ";
		Object[] os = null;
		List<Student> students = new ArrayList<Student>();
		try
		{
			ResultSet rs = DBUtil.executeQuery(sql, os);
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
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		// 判断students集合是否为空
		return students;
	}

	// 根据学号，判断某一个学生是否已经存在
	public boolean isExistByNo(int stuNo)
	{
		boolean isExist = false;
		Student stu = queryStudentByNo(stuNo);
		// 如果stu为null，说明查无此人，即此人不存在；否则说明已经存在此人
		isExist = (stu == null) ? false : true;
		return isExist;
	}
}
```

优化后的三层架构的结构图，如下，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/5.9.png)

*图5-09*

从图中可以发现，优化后的三层架构的基本结构是：

表示层（`USL`前台Jsp或`Html`，及`USL`后台Servlet）+业务逻辑层（接口，及实现类）+数据访问层（接口，及实现类）+工具类包+实体类包

其中表示层前台，也可以加入CSS、JavaScript等进行美化和验证。

完整代码，可参见源码中的StudentManagerBy3TierAndInterface项目。

# 5.4 练习题 #

**一、选择题**

1.下列关于JavaBean的描述，正确的是（    ）。（选择两项）（难度★）

A．类可以是公有的，也可以是私有的

B．具有公有的有参构造方法

C．具有公有的访问属性的`getter`和`setter`方法

D．属性名的前两个字母要么全部大写，要么全部小写

2.三层架构是分层模式中最常见的类型，下面（    ）不是三层架构中的层次。（选择一项）（难度★）

A．数据访问层		
				
B．业务逻辑层

C．表示层	
						
D．会话层

3.使用分层模式开发的好处，下列（    ）说法是错误的。（选择一项）（难度★★）

A．结构清晰，职责明确		
		
B．提高了代码的重用性

C．每一层的组件保持高内聚、低耦合		

D．程序执行效率高

**二、简答题**

1.三层架构包括哪三层？每一层的作用是什么？三层中的每一层，可以用哪些技术来实现？（难度★★）

2.简述MVC模式和三层架构的区别与联系。（难度★★★）

3.简述三层中各层之间的关系。（难度★★★）

4.使用三层继续优化第五章练习题中的“部门管理系统”。（难度★★★★）

5.请描述使用分层模式的优缺点。（难度★★★）








