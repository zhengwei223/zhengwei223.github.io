---

layout: post

title: 数据库访问

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章主要学习JDBC访问数据库的相关知识

author: 颜群
 
keywords: lanqiao 蓝桥 培训 教程 javaweb JSP Servlet

---

# 3.1JDBC

## 3.1.1JDBC简介

JDBC（Java DataBase Connectivity）是由一组使用Java语言编写的类和接口组成，可以为多种关系数据库提供统一的访问方式，从而实现用JAVA代码来操作数据库。

![](http://i.imgur.com/OFXzU95.jpg)

*图3-01*

JDBC的原理如上图所示，最顶层是我们自己编写的Java应用程序，Java应用程序可以使用集成在JDK中的java.sql和javax.sql包中的JDBC API来连接和操作数据库。下面我们来依次讲解图中出现的JDBC组成元素。

**(1)JDBC API**

JDBC API由SUN公司提供，其中包含了Java应用程序与各种不同数据库交互的标准接口，如`Connection`连接接口、`Statement`操作接口、`ResultSet`结果集接口、`PreparedStatement`预处理操作接口等。我们可以使用这些JDBC接口来操作各种数据库。

**(2)JDBC Driver Manager**

JDBC Driver Manager也是由SUN公司提供，负责管理各种不同数据库的JDBC驱动。

**(3)JDBC驱动**

JDBC驱动由各个数据库厂商或第三方厂商提供，负责连接各种不同的数据库。比如上图中，应用程序访问MySql和Oracle时，就需要不同的JDBC驱动。这些JDBC驱动都各自实现了JDBC API中定义的各种接口。在使用JDBC连接数据库时，我们只需要正确加载JDBC驱动，然后就可以通过调用JDBC API来操作数据库。

## 3.1.2JDBC API

JDBC API主要可以完成三件事：**①与数据库建立连接**、**②发送SQL语句**、**③返回处理结果**，如图：

![](http://i.imgur.com/XCLAIhe.png)

*图3-02*

JDBC API中常用接口、类的介绍如下：

<table>
   <tr>
      <td>接口/类</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>DriverManager类</td>
      <td>根据不同的数据库，管理相应的JDBC驱动。可以通过DriverManager类的getConnection()方法获取数据库连接。</td>
   </tr>
   <tr>
      <td>Connection接口</td>
      <td>由DriverManager产生，负责连接数据库并传递数据。</td>
   </tr>
   <tr>
      <td>Statement接口</td>
      <td>由Connection产生，负责执行增删改查等SQL语句。</td>
   </tr>
   <tr>
      <td>PreparedStatement接口</td>
      <td>Statement的子接口（public interface PreparedStatement extends Statement{…}），同样是由Connection产生，同样负责执行增删改查等SQL语句。与Statement接口相比，具有高安全性（可以防止SQL注入等安全隐患）、高性能、高可读性和高可维护性的优点</td>
   </tr>
   <tr>
      <td>ResultSet接口</td>
      <td>接收Statement或PreparedStatement执行查询操作后的结果集。</td>
   </tr>
</table>

## 3.1.3JDBC访问数据库的步骤

开发一个JDBC程序，有以下四个基本步骤：

**(1)导入JDBC驱动包，并加载驱动类**

使用JDBC访问数据库前，需要先导入相应的驱动包（如oracle数据库的驱动包是ojdbc版本号.jar），之后再使用`Class.forName()`方法将具体的JDBC驱动类加载到Java虚拟机中，代码如下

```
Class.forName("JDBC驱动类名");
```

如果指定的驱动类名不存在，则会引发ClassNotFoundException异常。

常见的JDBC驱动包、驱动类及访问连接如下表：

<table>
   <tr>
      <td>数据库</td>
      <td>JDBC驱动包</td>
      <td>JDBC驱动类</td>
      <td>连接字符串</td>
   </tr>
   <tr>
      <td>Oracle</td>
      <td>ojdbc版本号.jar</td>
      <td>oracle.jdbc.OracleDriver</td>
      <td>jdbc:oracle:thin:@localhost:1521:数据库实例名</td>
   </tr>
   <tr>
      <td>MySQL</td>
      <td>mysql-connector-java-版本号-bin.jar</td>
      <td>com.mysql.jdbc.Driver</td>
      <td>jdbc:mysql://localhost:3306/数据库实例名</td>
   </tr>
   <tr>
      <td>SqlServer</td>
      <td>sqljdbc版本号.jar</td>
      <td>com.microsoft.sqlserver.jdbc.SQLServerDriver</td>
      <td>jdbc:microsoft:sqlserver://localhost:1433;databasename=数据库实例名</td>
   </tr>
</table>

其中“连接字符串”中的1521、3306和1433分别是各个数据库的默认端口号。

**(2)与数据库建立连接**

JDBC使用DriverManager类来管理驱动程序，并通过`getConnection()`方法在数据库和相应的驱动程序之间建立起连接，如下，

```
Connection connection = DriverManager
.getConnection("连接字符串","数据库用户名","数据库密码");
```

`Connection`接口的常用方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>Statement createStatement() throws SQLException</td>
      <td>获取Statement对象。</td>
   </tr>
   <tr>
      <td>PreparedStatement prepareStatement(String sql)</td>
      <td>获取PreparedStatement对象。</td>
   </tr>
</table>

**(3)发送SQL语句，并获取执行结果**

获得了`Connection`连接后，就可以通过`Connection`对象来获得`Statement`或`PreparedStatement`对象，并通过该对象向数据库发送SQL语句。如果SQL语句是增、删、改操作，则返回一个`int`型结果，表示多少行受到了影响，即增、删、改了几条数据；如果SQL语句是查询操作，则返回一个`ResultSet`结果集，该结果集包含了SQL查询的所有结果。如下，

**①Statement对象：**

`Statement stmt = connection.createStatement();`

增、删、改：

`int count = stmt.executeUpdate("增、删、改的SQL语句")`

查：

`ResultSet rs = stmt.executeQuery("查询的SQL语句");`

**`Statement`的常用方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>executeUpdate()</td>
      <td>用于执行INSERT、UPDATE 或 DELETE 语句，以及DDL（数据定义语言）语句，例如 CREATE TABLE 和 DROP TABLE。返回值是一个整数，表示受影响的行数（即涉及增删改的行数）。对于CREATE TABLE 或 DROP TABLE 等不操作行的语句，executeUpdate 的返回值总为零。</td>
   </tr>
   <tr>
      <td>executeQuery()</td>
      <td>用于执行SELECT查询语句，返回值是一个ResultSet类型的结果集。</td>
   </tr>
   <tr>
      <td>close()</td>
      <td>关闭Statement对象。</td>
   </tr>
</table>

**②PreparedStatement对象：**

```
PreparedStatement pstmt = connection
.prepareStatement("增、删、改、查的SQL语句");
```

增、删、改：

`int count = pstmt.executeUpdate()`

查：

`ResultSet rs = pstmt.executeQuery();`

**`PreparedStatement`的常用方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>executeUpdate()</td>
      <td>用法上，类似与Statement接口中的executeUpdate()</td>
   </tr>
   <tr>
      <td>executeQuery()</td>
      <td>用法上，类似与Statement接口中的executeQuery ()</td>
   </tr>
   <tr>
      <td>setXxx()</td>
      <td>有setInt()、setString()、setDouble()等多个方法，用于给SQL中的占位符“？”赋值。setXxx()方法有两个参数，第一个参数表示占位符的位置（从1开始），第二个参数表示占位符所代表的具体值。例如可以将SQL写成“select * from student where name=? and age = ? ”，其中两个问号代表两个占位符，可以使用setString(1,”张三’’)和setInt(2,23)来分别为两个占位符赋值。</td>
   </tr>
   <tr>
      <td>close()</td>
      <td>关闭PreparedStatement对象。</td>
   </tr>
</table>

**(4)处理返回结果集**

如果是查询操作，可以通过循环来取出结果集中的所有数据，如下：

```
while(rs.next)
{
	int  stuNo = rs.getInt("stuNo");
	String stuName = rs.getString("stuName");
	…
}
```

**`ResultSet`的常用方法：**

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>boolean next()</td>
      <td>将光标从当前位置向下移动一行。通常用来判断查询到的结果集中是否还有数据。如果有，则返回true，否则返回false。</td>
   </tr>
   <tr>
      <td>boolean previous()</td>
      <td>将光标从当前位置向上移动一行。</td>
   </tr>
   <tr>
      <td>int getInt(int columnIndex)</td>
      <td>获取当前结果集中指定列号的字段值，该指定列必须是整数类型的字段。例如，学生表中number类型的学号stuNo字段如果在第一列，就可以使用getInt(1)来获取值。除此之外，还有getFloat()、getString()、getDate()等多个类似方法，用于获取不同类型的字段。</td>
   </tr>
   <tr>
      <td>int getInt(String columnLabel)</td>
      <td>获取当前结果集中指定列名的字段值，该指定列必须是整数类型的字段。例如，学生表中number类型的学号stuNo字段，就可以使用getInt(“stuNo”)来获取值。除此之外，还有getFloat()、getString()、getDate()等多个类似方法，用于获取不同类型的字段。</td>
   </tr>
   <tr>
      <td>void close()</td>
      <td>关闭ResultSet对象。</td>
   </tr>
</table>

## 3.1.4JDBC访问数据库示例 ##

现在使用JDBC来访问Oracle数据库，在导入了“ojdbc版本号.jar之后”，就可以通过程序访问数据库。

假设数据库中存在一张学生表`student`，各字段名称及类型如下：

<table>
   <tr>
      <td>字段名</td>
      <td>类型</td>
      <td>含义</td>
   </tr>
   <tr>
      <td>stuNo</td>
      <td>number(3)</td>
      <td>学号</td>
   </tr>
   <tr>
      <td>stuName</td>
      <td>varchar2(20)</td>
      <td>学生姓名</td>
   </tr>
   <tr>
      <td>stuAge</td>
      <td>number(3)</td>
      <td>学生年龄</td>
   </tr>
</table>

**(1)使用Statement访问数据库**

**①实现“增删改”操作。**

使用`Statement`的`executeUpdate()`方法，执行删除操作：

**JDBCUpdateByStatement.java**

```
import java.sql.*;
public class JDBCUpdateByStatement
{
	final static String DRIVER = "oracle.jdbc.OracleDriver";
	final static String URL 
= "jdbc:oracle:thin:@localhost:1521:XE";
	final static String USERNAME = "system";
	final static String PASSWORD = "sa";
	static Connection connection = null;
	static Statement stmt = null;
	static ResultSet rs = null;
	public static boolean executeUpdate(){
		boolean flag = false ;	    
try
		{
			//1加载数据库驱动
			Class.forName(DRIVER);
			//2获取数据库连接
			 connection = DriverManager
.getConnection(URL, USERNAME, PASSWORD);
			//3通过连接，获取一个Statement的对象，用来操作数据库
			 stmt = connection.createStatement();
			
			//4通过executeUpdate()实现对数据库的删除操作
            String deleteSql  = "delete from 
student where stuno =5" ;
int count =	stmt.executeUpdate(deleteSql );
			System.out.println("受影响的行数是："+count);
           flag = true ;//如果一切正常，没有发生异常，则将flag设置为true
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
		finally
		{
			try
			{
				if(stmt != null)stmt.close();
				if(connection != null)connection.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
			}
            catch (Exception e)
		    {
		    	e.printStackTrace();
		    }
		}
        return flag ;
	}
}
```

执行`executeUpdate()`方法，即可把`student`表中`stuno`为5的那条数据删除。

如果要执行增加操作，只需要修改上述代码中`executeUpdate()`方法的SQL参数，如下：

```
//通过executeUpdate()实现对数据库的增加操作
String addSql = "insert into student(stuNo,stuName,stuAge) 
values(5,'王五',25)" ;
int count=stmt.executeUpdate(addSql);
```

如果要执行修改操作，也只需要修改`executeUpdate()`方法中的SQL参数，如下，

```
//通过executeUpdate()实现对数据库的修改操作
String updateSql = "update student 
set stuName = '李四' where stuName='王五'" ;
int count=stmt.executeUpdate(updateSql);
```

即“增删改”操作，唯一不同的就是`executeUpdate()`方法中的SQL参数。

**②实现“查询”操作。**

此时，数据库中`student`表的中数据如下：

![](http://i.imgur.com/4AKbgxH.png)

现在通过JDBC来执行查询表的操作：

**JDBCQueryByStatement.java**

```
…
public class JDBCQueryByStatement
{
   …
	public static void executeQuery()
	{
		try
		{
			//1加载数据库驱动
			Class.forName(DRIVER);
			//2获取数据库连接
			 connection = DriverManager
.getConnection(URL, USERNAME, PASSWORD);
			//3通过连接，获取一个 操作数据库Statement的对象
			 stmt = connection.createStatement();
			//4通过executeQuery()实现对数据库的查询，
并返回一个结果集（结果集中包含了所有查询到的数据）
String querySql = "select stuNo,stuName,stuAge from student";
			  rs = stmt.executeQuery(querySql);
			//5通过循环读取结果集中的数据
			while(rs.next()){
//等价于rs.getInt(1);
				int stuNo = rs.getInt("stuNo");
               //	rs.getString(2);
				String stuName = rs.getString("stuName");		
             //	rs.getString(3);
		        int stuAge = rs.getInt("stuAge");
				 System.out.println(stuNo+"\t"+stuName
+"\t"+stuAge);
			}
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
		finally
		{
			try
			{
                //注意rs、stmt、connection三个对象的关闭顺序
				if(rs != null)rs.close();
				if(stmt != null)stmt.close();
				if(connection != null)connection.close();
			}
			catch (SQLException e)
			{
				e.printStackTrace();
			}
           catch (Exception e)
		   {
			    e.printStackTrace();
		   }

		}
	}
}
```

执行`executeQuery()`方法，即可查询出`student`表中所有的`stuNo`、`stuName`和`stuAge`字段值，如图

![](http://i.imgur.com/nMyhvUB.jpg)

*图3-03*

如果是根据`String`类型的`name`变量进行模糊查询，则查询的SQL语句可写为：

```
"select stuNo,stuName,stuAge from student where stuName like '%"+name + "%'"
```

**(2)使用`PreparedStatement`访问数据库**

**①实现“增删改”操作。**

**JDBUpdateByPreparedStatement.java**

```
…
public class JDBUpdateByPreparedStatement
{
	…
	static PreparedStatement pstmt = null;
	public static boolean executeUpdate()
	{
        boolean flag = false;
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager
.getConnection(URL, USERNAME, PASSWORD);
			//用占位符来代替参数值
           String deleteSql = "delete from student where stuName = ? and stuAge = ?" ;
			pstmt = connection.prepareStatement(deleteSql);
			//将第一个占位符？的值替换为“张三”（占位符的位置是从1开始）
			pstmt.setString(1, "张三");
			//将第二个占位符？的值替换为23
			pstmt.setInt(2, 23);
			int count = pstmt.executeUpdate();
			System.out.println("受影响的行数是：" + count);
           flag = true;
		}
		//省略catch、finally部分代码
       return flag;
	}
}
```

使用`PreparedStatement`执行“增删改”操作，唯一不同的就是`prepareStatement()`方法中的SQL参数。

**②实现“查询”操作。**

**JDBCQueryByPreparedStatement.java**

```
…

public class JDBCQueryByPreparedStatement
{
	…
	public static void executeQuery()
	{
		Scanner input = new Scanner(System.in);
		try
		{
…
			System.out.println("请输入用户名:");
			String name = input.nextLine();
			System.out.println("请输入密码:");
			String pwd = input.nextLine();
            //如果用户输入的username和password在表中有对应的数据（即count(1)>0），则说明存在此用户
            String querySql = "select count(1) from login where 
username = ? and password = ?" ;
			pstmt = connection.prepareStatement(querySql);
			pstmt.setString(1, name);
			pstmt.setString(2, pwd);
			rs = pstmt.executeQuery();
			if (rs.next())
			{
                //获取SQL语句中count(1)的值
				int count = rs.getInt(1);
				if (count > 0)
					System.out.println("登录成功");
				else
				{
					System.out.println("登录失败");
				}
			}
		}
		//省略catch、finally 
	}
}
```

使用`PreparedStatement`进行模糊查询时，可以在`setXxx()`方法中加入通配符，如下是根据`String`类型的`name`变量的模糊查询：

```
PreparedStatement pstmt = ... ;
ResultSet rs = ... ;
...
String querySql = "select *　from book  where name like ?" ;
pstmt.setString(1, "%" +name +"%");
rs = pstmt.executeQuery();
```

**(3)JDBC中的异常处理及资源关闭**

在JDBC中，会抛出异常的常见方法如下：

<table border="1">
   <tr>
      <td>方法</td>
      <td>抛出的异常</td>
   </tr>
   <tr>
      <td>Class.forName()方法</td>
      <td>ClassNotFoundException</td>
   </tr>
   <tr>
      <td>DriverManager.getConnection()方法</td>
	  <td rowspan="12">SQLException</td>
   </tr>
   <tr>
      <td>Connection接口的createStatement()方法</td>
   </tr>
   <tr>
      <td>Statement接口的executeQuery()方法</td>
   </tr>
   <tr>
      <td>Statement接口的executeUpdate()方法</td>
   </tr>
   <tr>
      <td>Connection接口的prepareStatement()方法</td>
   </tr>
   <tr>
      <td>PreparedStatement接口的setXxx()方法</td>
      
   </tr>
   <tr>
      <td>PreparedStatement接口的executeUpdate()方法</td>
   </tr>
   <tr>
      <td>PreparedStatement接口的executeQuery()方法</td>
   </tr>
   <tr>
      <td>ResultSet接口的next()方法</td>
   </tr>
   <tr>
      <td>ResultSet接口的close()方法</td>
   </tr>
   <tr>
      <td>Statement接口的close()方法</td>
   </tr>
   <tr>
      <td>Connection接口的close()方法</td>
   </tr>
</table>

并且，为了及时的释放使用完毕的资源，就需要在数据库访问结束时，调用各个对象的`close()`方法。

<table>
   <tr>
      <td>方法</td>
      <td>立即释放的资源</td>
   </tr>
   <tr>
      <td>ResultSet接口的close()方法</td>
      <td>此 ResultSet对象的数据库 JDBC资源</td>
   </tr>
   <tr>
      <td>Statement接口的close()方法</td>
      <td>此 Statement 对象的数据库 JDBC资源（包含ResultSet对象）</td>
   </tr>
   <tr>
      <td>Connection接口的close()方法</td>
      <td>此Connection对象的数据库 JDBC 资源（包含ResultSet、 Statement对象）</td>
   </tr>
</table>

因此在编码时，释放资源的顺序应该写为：`ResultSet`的`close()`(查询操作)→`Statement`的`close()`→`Connection`的`close()`。也就是说，在JDBC代码中，先释放范围小的资源，再释放范围大的资源。

值得注意的是，因为`PreparedStatement`继承自`Statement`，所以`Statement`接口的`close()`方法代表了`PreparedStatement`对象`.close()`和`Statement`对象`.close()`两个方法。

此外，如果不及时的通过`close()`方法释放资源，已创建的`Connection`对象、`Statement`对象、`ResultSet`对象也会在JVM执行垃圾回收时自动释放。但此种方式会造成资源的释放不及时，故不推荐。

综上，JDBC的代码结构如下：

```
		try
		{
			①Class.forName("驱动字符串");
			②获取Connection对象;
			③Statement对象(或PreparedStatement对象)相关代码;
			④（如果是查询操作）ResultSet对象相关代码;
		}catch (ClassNotFoundException e)
		{...}
		catch (SQLException e)
		{...}
        catch (Exception e)
		{ ...}
		finally
		{
			try
			{
				（如果是查询操作）关闭ResultSet对象
				关闭Statement对象
				关闭Connection对象
			}
			catch (SQLException e)
			{ ...}
catch (Exception e)
	     	{ ...}
		}
```

**(4)使用`PreparedStatement`的优势**

现在我们知道，`Statement`和`PreparedStatement`都可以实现数据库的增删改查等操作。二者相比，`PreparedStatement`有如下优势：

**1.提高了代码的可读性和可维护性**

`PreparedStatement`可以避免了繁琐的SQL语句拼接操作。

例如，SQL语句`“insert into student(stuNo,stuName,stuAge,course) values(5,'王五',25)”`，如果将其中的字段值用变量来表示`（int stuNo=5;String stuName="王五";int stuAge=23;）`，用Statement方式执行时，需要写成：

`stmt.executeUpdate("insert into student(stuNo,stuName,stuAge ) values("+stuNo+",'"+stuName+"',"+stuAge+")");`

而如果用`PreparedStatement`方式执行时，就可以先用?充当参数值的占位符，然后再用`setXxx()`方法设置?的具体值，避免了SQL语句的拼接操作。

**2.提高了SQL语句的性能**

创建`Statement`对象时不使用SQL语句做参数（如`Statement stmt = connection.createStatement();`），不会解析和编译SQL语句，而是每次调用`executeUpdate()`或`executeQuery()`方法时才进行SQL语句的解析和编译操作（如`stmt.executeUpdate("delete from student where stuno =5");`）。

而创建`PreparedStatement`对象时，是使用带占位符？的SQL语句作为参数（如`PreparedStatement pstmt = connection.prepareStatement("delete from student where stuName = ? and stuAge = ?");`），会预先解析和编译该SQL语句，之后通过setXxx()方法给占位符赋值，最后执行SQL语句时，就无需再解析和编译SQL语句，直接执行即可（如`pstmt.executeUpdate()`）。这就使得，如果多次操作相同，就可以大大提高性能。即PreparedStatement是预编译的SQL语句对象。

**3.提高了安全性，能有效防止SQL注入**

使用`PreparedStatement`，传入的任何数据都不会和已经编译的SQL语句进行拼接，从而避免了SQL注入攻击。例如，在使用`Statement`时，可能会用以下代码来进行登陆验证：

```
stmt = connection.createStatement();
String querySql = "select count(*) from login 
where username = '"+uname+"' and password = '"+upwd+"'" ;
rs = stmt.executeQuery (querySql);
…
if(rs.next())
{
   int result = rs.getInt("count(*)")
   if(result>0)  { //登陆成功}
   else{//登陆失败}
}
```

这样的代码看起来没有问题，但试想如果用户输入`uname`的值是“任意值' or 1=1--”、`upwd`的值是“任意值”，则SQL语句拼接后的结果如下：

```
select count(*) from login  where username = '任意值' or 1=1--' and password = '任意值'
```

SQL语句中，用`“or 1=1”` 使`where`条件永远成立，并且用“--”将后面的SQL语句注释掉，这样就造成了安全隐患（SQL注入），使得并不存在的用户名和密码也能登录成功。而`PreparedStatement`中使用了占位符？以及`setXxx()`方法有效避免了这种漏洞。

综上，我们在实际开发中推荐使用`PreparedStatement`来操作数据库。

# 3.2JSP访问数据库

我们之前讲过，可以在JSP中通过`<% %>`来编写JAVA代码。也就是说，JAVA代码能实现的功能，也就可以借助`<% %>`在JSP中实现。我们接下来，就在JSP中实现一个“用户注册”的功能。该功能写在`WebContent`下的jspJDBC目录中。

**注册页jspJDBC/register.jsp**

实现用户名`(uname)`和密码`(upwd)`的表单录入，代码及运行图省略。

将注册信息写入数据库的功能页**jspJDBC/registerJDBC.jsp**，代码如下，

```
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
…
<html>
…
<body>
	<%
		//接收用户输入的注册信息
		request.setCharacterEncoding("UTF-8");
		String username = request.getParameter("uname");
		String password = request.getParameter("upwd");
		
		//将用户信息写入数据库
		Connection con = null;
		PreparedStatement pstmt = null;

		try
		{
			Class.forName("oracle.jdbc.OracleDriver"); //加载数据库驱动
			//创建连接
			con = DriverManager
.getConnection("jdbc:oracle:thin:@127.0.0.1:1521:XE", "system", "sa");
			//创建Statement对象
			String loginSql = "insert into login(username,password) values(?,?)";
			//预编译SQL语句
			pstmt = con.prepareStatement(loginSql);
			//设置占位符?的值
			pstmt.setString(1,username)	;
			pstmt.setString(2, password)	;
			//执行SQL语句
			pstmt.executeUpdate();
			out.println("<h1>注册成功！</h>");
		}
		//省略catch、finally部分代码
	%> 
</body>
</html>
```

运行以上代码，就能实现用户注册功能，并将注册信息写入数据库。

需要注意，必须在`page`指令里导入`Connection`、`PreparedStatement`等的包名，如[%@page import="java.sql.Connection"%](%@page import="java.sql.Connection"%)；并将数据库的驱动包加入Web工程，导入方法如下：将数据库驱动包（ojdbc5.jar）直接复制在WEB-INF下的lib文件夹中即可，如图：

![](http://i.imgur.com/eWSMNvL.png)

不难发现，上面registerJDBC.jsp中的代码既包含了业务逻辑、数据库操作，还负责了显示功能，导致JSP文件非常混乱、复杂，给后期的维护和修改上，带来了非常大的困难。因此，我们需要将JSP中的JAVA代码按功能进行划分，将每个功能分别封装成一个类；最后直接将需要的JAVA类导入到JSP中，组装成最终的JAVA代码即可。这里所提到的“类”，就是指我们下一章将要学习的JavaBean。

# 3.3练习题

**一、选择题**

1  在Eclipse的项目中，存放Web文件的默认目录名是（    ）。（选择一项）

A．WebContent
		
B．WebRoot	
		
C．src		

D．webapps

2  在JDBC工作原理图中，下列（    ）层是数据库厂商提供的资源。（选择一项）

A．Java应用程序		
					
B．JDBC API

C．JDBC Driver Manager	
				
D．JDBC驱动

3  下列（    ）方法是`Statement`对象获取查询结果集的方法。（选择一项）

A．`execute(String sql)`		
				
B．`executeUpdate(String sql)`

C．`executeQuery(String sql)	`
				
D．`executeResultSet(String sql)`

**二、简答题**

1.简述JDBC的基本步骤。（难度★）

2.简述`Statement`和`PreparedStatement`两种方式的区别。（难度★★）

3.描述什么是SQL注入，请用一个例子加以说明。（难度★）

4.请描述如何在Eclipse中更改新建的JSP页面默认的字符集编码。（难度★）

5.请描述JDBC连接数据库的步骤，并写出JDBC连接Oracle的示例代码。（难度★★★）

6.使用`PreparedStatement`的方式，实现一个“部门管理系统”：包括增加部门、修改部门、删除部门、根据部门编号查询一个部门、根据部门名称模糊查询相关部门、查询全部部门等功能。（难度★★★★）











