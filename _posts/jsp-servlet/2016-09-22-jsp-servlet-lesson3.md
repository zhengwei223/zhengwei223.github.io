---

layout: post

title: 数据库访问与JavaBean

category: JSP-Servlet教程

tags: JSP Servlet

description: 本章主要学习JDBC访问数据库的相关知识。

author: 颜群
 
keywords: lanqiao 蓝桥 培训 教程 javaEE JSP Servlet

---

# 3.1JDBC #

## 3.1.1JDBC简介 ##

JDBC（Java DataBase Connectivity），由一组使用Java语言编写的类和接口组成，可以为多种关系数据库提供统一的访问方式，从而实现用JAVA代码来操作数据库。

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.1.png)

*图3-01*

JDBC的原理如上图所示，最顶层是我们自己编写的Java应用程序，Java应用程序可以通过使用集成在JDK中的java.sql及javax.sql包中的JDBC API来连接和操作数据库。下面我们来依次讲解图中出现的JDBC组成元素。

**(1)JDBC API**

JDBC API由SUN公司提供，其中包含了Java应用程序与各种不同数据库交互的标准接口，如`Connection`连接接口、`Statement`操作接口、`ResultSet`结果集接口、`PreparedStatement`预处理操作接口等。我们可以使用这些JDBC接口来操作各种数据库。

**(2)JDBC Driver Manager**

JDBC Driver Manager也是由SUN公司提供，负责管理各种不同数据库的JDBC驱动。

**(3)JDBC驱动**

JDBC驱动由各个数据库厂商或第三方厂商提供，负责连接各种不同的数据库。比如上图中，应用程序访问MySql和Oracle时，就需要不同的JDBC驱动。这些JDBC驱动都各自实现了JDBC API中定义的各种接口。在使用JDBC连接数据库时，我们只需要正确加载JDBC驱动，然后就可以通过调用JDBC API来操作数据库。

## 3.1.2JDBC API ##

JDBC API主要可以完成三件事：**①与数据库建立连接**、**②发送SQL语句**、**③返回处理结果**，如图：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.2.png)

*图3-02*

**JDBC API中常用接口、类的介绍如下：**

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
      <td>由DriverManager产生，用于连接数据库并传递数据。</td>
   </tr>
   <tr>
      <td>Statement接口</td>
      <td>由Connection产生，用于执行增删改查等SQL语句。</td>
   </tr>
   <tr>
      <td>PreparedStatement接口</td>
      <td>Statement的子接口（public interface PreparedStatement extends Statement{…}），同样是由Connection产生，同样用于执行增删改查等SQL语句。与Statement接口相比，具有高安全性（可以防止SQL注入等安全隐患）、高性能、高可读性和高可维护性的优点</td>
   </tr>
   <tr>
      <td>CallableStatement接口</td>
      <td>PreparedStatement的子接口（public interface CallableStatement extends PreparedStatement {…}），同样是由Connection产生，用于调用并执行SQL存储过程或存储函数。</td>
   </tr>
   <tr>
      <td>ResultSet接口</td>
      <td>接收Statement或PreparedStatement执行查询操作后的结果集。</td>
   </tr>
</table>

## 3.1.3JDBC访问数据库的步骤 ##

开发一个JDBC程序，有以下四个基本步骤：

#### (1)导入JDBC驱动包，并加载驱动类 ####

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

#### (2)与数据库建立连接 ####

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
      <td>创建Statement对象。</td>
   </tr>
   <tr>
      <td>PreparedStatement prepareStatement(String sql)</td>
      <td>创建PreparedStatement对象。</td>
   </tr>
</table>

#### (3)发送SQL语句，并获取执行结果 #### 

获得了`Connection`连接后，就可以通过`Connection`对象来获得`Statement`或`PreparedStatement`对象，并通过该对象向数据库发送SQL语句。如果SQL语句是增、删、改操作，则返回一个`int`型结果，表示多少行受到了影响，即增、删、改了几条数据；如果SQL语句是查询操作，则返回一个`ResultSet`结果集，该结果集包含了SQL查询的所有结果。如下，

**①`Statement`对象：**

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

**②`PreparedStatement`对象：**

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

#### (4)处理返回结果集 ####

如果是查询操作，可以通过循环取出结果集中的所有数据：先通过`rs.next()`获取每一行的数据，再通过`rs.getXxx()`获取行内的每一列数据，如下：

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
      <td>将光标从当前位置向下移动一行，指向结果集中的下一行的数据。通常用来判断查询到的结果集中是否还有数据。如果有，则返回true，否则返回false。</td>
   </tr>
   <tr>
      <td>boolean previous()</td>
      <td>将光标从当前位置向上移动一行。</td>
   </tr>
   <tr>
      <td>int getInt(int columnIndex)</td>
      <td>获取当前结果集中指定列号的字段值，该指定列必须是整数类型的字段。例如，学生表中number类型的学号stuNo字段如果在第一列，就可以使用getInt(1)来获取值。除此之外，还有getFloat()、getString()、getDate()、getBinaryStream()等多个类似方法，用于获取不同类型的字段。</td>
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

#### (1)使用`Statement`访问数据库 ####

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

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.3.png)

*图3-03*

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

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.4.png)

*图3-04*

如果是根据`String`类型的`name`变量进行模糊查询，则查询的SQL语句可写为：

```
"select stuNo,stuName,stuAge from student where stuName like '%"+name + "%'"
```

**注意name两边的单引号。**

#### (2)使用`PreparedStatement`访问数据库 ####

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

	与Statement相比，使用PreparedStatement执行“增删改”操作，唯一不同的就是prepareStatement()方法中的SQL参数。

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

	使用PreparedStatement进行模糊查询时，可以在setXxx()方法中加入通配符。例如，以下是根据String类型的name变量的模糊查询：

```
PreparedStatement pstmt = ... ;
ResultSet rs = ... ;
...
String querySql = "select *　from book  where name like ?" ;
pstmt.setString(1, "%" +name +"%");
rs = pstmt.executeQuery();
```

需要注意，如果使用的是Statement，当需要给SQL语句拼接String类型变量时，必须加上单引号，例如"`select … from … where stuName like '%"+name + "%'"`；但如果使用的是PreparedStatement，则不需要加，例如：`pstmt.setString(1, "%" +name +"%")`。


#### (3)JDBC中的异常处理及资源关闭 ####

在JDBC中，会抛出异常的常用方法如下：

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

并且，为了及时的释放使用完毕的资源，需要在数据库访问结束时，调用各个对象的`close()`方法。

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

可以发现，三个资源之间存在包含关系，所以在编码时，释放资源的顺序应该写为：ResultSet对象的close()(查询操作)Statement的对象close()Connection对象的close()。也就是说，在JDBC代码中，先释放范围小的资源，再释放范围大的资源。

值得注意的是，因为`PreparedStatement`继承自`Statement`，所以`Statement`接口的`close()`方法代表了`PreparedStatement`对象`.close()`和`Statement`对象`.close()`两个方法。

此外，如果不及时的通过close()方法释放资源，已创建的Connection对象、Statement对象、ResultSet对象也会在GC执行垃圾回收时自动释放。但自动释放的方式会造成资源的释放不及时（必须等待GC回收），故不推荐。

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

**说明：使用PreparedStatement的优势**

现在我们知道，`Statement`和`PreparedStatement`都可以实现数据库的增删改查等操作。二者相比，`PreparedStatement`有如下优势：

**1.提高了代码的可读性和可维护性**

`PreparedStatement`可以避免了繁琐的SQL语句拼接操作。

例如，SQL语句`“insert into student(stuNo,stuName,stuAge,course) values(5,'王五',25)”`，如果将其中的字段值用变量来表示`（int stuNo=5;String stuName="王五";int stuAge=23;）`，用Statement方式执行时，需要写成：

`stmt.executeUpdate("insert into student(stuNo,stuName,stuAge ) values("+stuNo+",'"+stuName+"',"+stuAge+")");`

而如果用`PreparedStatement`方式执行时，就可以先用?充当参数值的占位符，然后再用`setXxx()`方法设置?的具体值，避免了SQL语句的拼接操作。

**2.提高了SQL语句的性能**

创建`Statement`对象时不使用SQL语句做参数（如`Statement stmt = connection.createStatement();`），不会解析和编译SQL语句，而是每次调用`executeUpdate()`或`executeQuery()`方法时才进行SQL语句的解析和编译操作（如`stmt.executeUpdate("delete from student where stuno =5");`）。

而创建`PreparedStatement`对象时，是使用带占位符？的SQL语句作为参数（如`PreparedStatement pstmt = connection.prepareStatement("delete from student where stuName = ? and stuAge = ?");`），会预先解析和编译该SQL语句，之后通过`setXxx()`方法给占位符赋值，最后执行SQL语句时，就无需再解析和编译SQL语句，直接执行即可（如`pstmt.executeUpdate()`）。这就使得，如果多次操作相同，就可以大大提高性能。即PreparedStatement是预编译的SQL语句对象。

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



#### (4)使用`CallableStatement`调用存储过程或存储函数 ####

除了使用SQL语句外，我们还可以通过存储过程或存储函数来访问数据库。在Java程序中，就可以通过`CallableStatement`对象来调用数据库中的存储过程或存储函数。

`CallableStatement`对象可以通过`Connection`对象创建，如下： 

`CallableStatement cstmt= connection.prepareCall("调用存储过程/存储函数");`

调用存储过程（无返回值）的格式如下：

**{ call 存储过程名(参数列表) }**

调用存储函数（有返回值）的格式如下：

**{ ? = call存储过程名(参数列表) }**

**其中，对于参数列表，需要注意两点：**

**①**参数的索引，是从1开始编号。

**②**具体的参数，既可以是输入参数（IN类型），也可以是输出参数（OUT类型）。输入参数使用`setXxx()`方法进行赋值；输出参数（或返回值参数）必须先使用`registerOutParameter()`方法设置参数类型，然后调用`execute()`执行存储过程或存储函数，最后再通过`getXxx()`获取结果值。

下面，通过“两个数相加”的示例，分别演示调用存储过程和存储函数的具体步骤：

**①调用存储过程（无返回值）**

**<1>创建存储过程**

先在Oracle中，创建存储过程`addTwoNum()`，如下，

```
create or replace procedure addTwoNum
(num1 in number,   --输入参数
num2 in number,   --输入参数
total out number  --输出参数
)
as
  begin 
      total := num1+num2;
  end ;
```

**<2>调用存储过程**

**jdbc.demo.JDBCOperateByCallableStatement.java**

```
//package、import
public class JDBCOperateByCallableStatement
{
	…
	static CallableStatement cstmt = null;
	public static void executeByCallableStatement()
	{
		try	
		{
			…
             //创建CallableStatement对象，并调用数据库中的存储过程addTwoNum()
			cstmt = connection.prepareCall("{call addTwoNum(?,?,?)}");
			//将第一个参数值设为10
			cstmt.setInt(1, 10);
			//将第二个参数值设为20
			cstmt.setInt(2, 20);
			//将第三个参数（输出参数）类型设置为int
			cstmt.registerOutParameter(3, Types.INTEGER);
			//执行存储过程
			cstmt.execute() ;
			//执行完毕后，获取第三个参数（输出参数）的值
			int result = cstmt.getInt(3); 
			System.out.println("相加结果是："+result);		
		}
		//省略catch、finally 
	}
}
```

**<3>测试**

**jdbc.test.TestJDBCOperateByCallableStatement.java**

```
//package、import
public class TestJDBCOperateByCallableStatement
{
	public static void main(String[] args)
	{
		JDBCOperateByCallableStatement.executeByCallableStatement();
	}
}
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.5.png)

*图3-05*

**②调用存储函数（有返回值）**

**<1>创建存储函数**

先在Oracle中，创建存储函数`addTwoNumAndReturn()`，如下，

```
create or replace function addTwoNumAndReturn
( num1 in number,   --输入参数
num2 in number     --输入参数
)
 return number       --返回值类型
as
  total number ;
  begin 
      total := num1+num2;
      return total ;   --返回值
  end ;
```


**<2>调用存储函数**

**jdbc.demo.JDBCOperateByCallableStatement.java**

```
//package、import
public class JDBCOperateByCallableStatement
{
	…
	static CallableStatement cstmt = null;
	public static void executeByCallableStatementWithResult()
		{
			try	
			{
				…
   //创建CallableStatement对象，并调用数据库中的存储函数addTwoNumAndReturn()
				cstmt = connection.prepareCall(
"{? = call addTwoNumAndReturn(?,?)}");
				//将第一个参数(返回值)类型设置为int
				cstmt.registerOutParameter(1, Types.INTEGER);
				//将第二个参数值设为10
				cstmt.setInt(2, 10);
				//将第三个参数值设为20
				cstmt.setInt(3, 20);
				//执行存储函数
				cstmt.execute() ;
				//执行完毕后，获取第三个参数的值(返回值)
				int result = cstmt.getInt(1); 
				System.out.println("相加结果是："+result);
			}
			//省略catch、finally	}
}
```

**<3>测试**

**jdbc.test.TestJDBCOperateByCallableStatement.java**

```
//package、import
public class TestJDBCOperateByCallableStatement
{
	public static void main(String[] args)
	{
		JDBCOperateByCallableStatement
. executeByCallableStatementWithResult ();
	}
}
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.6.png)

*图3-06*

#### (5)处理CLOB/BLOB数据 ####

	实际开发中，经常会处理一些大文本数据（CLOB）或二进制数据（BLOB）。要想在数据库中读写CLOB或BLOB类型的数据，就必须使用PreparedStatement和IO流。


**①读写CLOB数据**

CLOB用于存放大文本数据。以下是将一篇小说（E:\\ 幻城.txt）存入CLOB类型字段的具体步骤：

**<1>创建myNovel表，并设置CLOB类型的字段novel，如下：**

```
create table myNovel
(
       id number primary key,
       novel clob
)
```

**<2>将小说写入 myNovel表的novel字段（CLOB类型）**

先将小说转为字符输入流，然后通过`PreparedStatement`的`setCharacterStream ()`方法写入数据库，如下，


**jdbc.clob.WriteAndReadNovel.java**

```
//package、import
public class WriteAndReadNovel
{
	..
	static PreparedStatement pstmt = null;
	//将小说写入数据库
	public static void writeNovelToClob()
	{
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			String sql = "insert into myNovel(id,novel) values(?,?)" ;
			//处理clob/blob，必须使用PreparedStatement对象
			pstmt = connection.prepareStatement(sql) ;
			pstmt.setInt(1, 1);//id=1
			
			//将小说转为字符输入流,并设置编码格式为中文GBK格式
			File file = new File("E:\\幻城.txt");
			Reader reader = new InputStreamReader(
new FileInputStream(file),"GBK");
			
			//将字符输入流写入myNovel表
			pstmt.setCharacterStream(2, reader,(int)file.length());
			int result = pstmt.executeUpdate();
			if(result >0){
				System.out.println("小说写入成功！");
			}else{
				System.out.println("小说写入失败！");
			}
		}
		//catch、finally
	}
	public static void main(String[] args)
	{
		 writeNovelToClob();	
	}
}
```

执行程序，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.7.png)

*图3-07*

此时的myNovel表（CLOB类型的数据，无法直接观察）：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.8.png)

*图3-08*


**<3>读取数据库中的小说**

通过`ResultSet`的`getCharacterStream ()`方法读取小说，然后通过IO流写入硬盘（src根目录），如下，

**jdbc.blob. WriteAndReadNovel.java**

```
//package、import
public class WriteAndReadNovel
{
	…
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
		//从数据库读取小说，并放入src目录
		public static void readImgToBlob()
		{
			try
			{
				Class.forName(DRIVER);
				connection = DriverManager.getConnection(
URL, USERNAME, PASSWORD);
				String sql = "select * from myNovel where id = ?" ;
				pstmt = connection.prepareStatement(sql) ;
				pstmt.setInt(1, 1);//id=1
				rs =  pstmt.executeQuery() ;
				if(rs.next()){
					//将小说从数据库中 读取出为Reader类型
					Reader reader =  rs.getCharacterStream("novel") ;
					
					//通过IO流，将小说写到项目中（硬盘)
					//将小说的输出路径设置为src（相对路径），小说名为myNovel.txt
					Writer writer = new FileWriter("src/幻城.txt");
					char[] temp = new char[200];
					int len = -1;
					while( (len=reader.read(temp) )!=-1){
						writer.write(temp,0,len);
					}
					writer.close();
					reader.close();
					System.out.println("小说读取成功！");
				}
			}
			//catch、finally
		}
	public static void main(String[] args)
	{
		readImgToBlob();
	}
}
```

执行程序，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.9.png)

*图3-09*

刷新项目，可以在`src`下看到读取出的小说，如图:

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.10.png)

*图3-10*


**说明：**

**MySQL数据库中没有CLOB类型，在MySQL用TEXT类型存储大文本数据。**


**②读写BLOB数据**

BLOB用于存放图片、电影等二进制数据。以下是将图片（**E:\\ lanqiao.png**）存入BLOB类型字段的具体步骤：

**<1>创建myPicture表，并设置BLOB类型的字段img，如下：**

```
create table myPicture
(
	id number(4) primary key,
	img blob
)
```


**<2>将图片写入 myPicture表的img字段（BLOB类型）**

先将图片转为输入流，然后通过`ResultSet`的`setBinaryStream()`方法写入数据库，如下，

**jdbc.blob.WriteAndReadImg.java**

```
//package、import
public class WriteAndReadImg
{
	…
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
	//将图片写入数据库
	public static void writeImgToBlob()
	{
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(
URL, USERNAME, PASSWORD);
			String sql = "insert into myPicture(id,img) values(?,?)" ;
             //处理clob/blob，必须使用PreparedStatement对象
			pstmt = connection.prepareStatement(sql) ;
			pstmt.setInt(1, 1);//id=1
			
			//将图片转为输入流
			File file = new File("E:\\lanqiao.png");
			InputStream in = new FileInputStream(file);
			//将输入流写入myPicture表
			pstmt.setBinaryStream(2, in,(int)file.length());
			int result = pstmt.executeUpdate();
			if(result >0){
				System.out.println("图片写入成功！");
			}else{
				System.out.println("图片写入失败！");
			}
		}
		//catch、finally
	}
	
	public static void main(String[] args)
	{
		writeImgToBlob();
	}
}
```

执行程序，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.11.png)

*图3-11*

此时的myPicture表（BLOB类型的数据，无法直接观察）：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.12.png)

*图3-12*


**<3>读取数据库中的图片**


通过`ResultSet`的`getBinaryStream()`方法读取图片，然后通过IO流写入硬盘（`src`根目录），如下，

**jdbc.blob.WriteAndReadImg.java**


```
//package、import
public class WriteAndReadImg
{
	…
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
	…
	//从数据库读取图片
	public static void readImgToBlob()
	{
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			String sql = "select * from myPicture where id = ?" ;
			pstmt = connection.prepareStatement(sql) ;
			pstmt.setInt(1, 1);//id=1
			rs =  pstmt.executeQuery() ;
			if(rs.next()){
				//将图片从数据库中 读取出为InputStream类型
				InputStream imgIn =  rs.getBinaryStream("img") ;
				//通过IO流，将图片写到项目中（硬盘)
				InputStream in = new BufferedInputStream(imgIn) ;
				//将图片的输出路径设置为src（相对路径），图片名为myPic.png
				OutputStream imgOut =new FileOutputStream("src//myPic.png"); 
				OutputStream out = new BufferedOutputStream(imgOut) ;
				int len = -1;
				while( (len=in.read() )!=-1){
					out.write(len);
				}
				imgOut.close();
				out.close();
				imgIn.close();
				in.close();
				System.out.println("图片读取成功！");
			}			
		}
		//catch、finally
	}
	
	public static void main(String[] args)
	{
		readImgToBlob();
	}
}
```

执行程序，运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.13.png)

*图3-13*

刷新项目，可以在`src`下看到读取出的图片，如图:

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.14.png)

*图3-14*

# 3.2 元数据 #

**元数据（MetaData），是指用来描述数据的数据。具体来讲，数据库、数据表、字段等的定义信息，就是元数据。**例如：数据库连接信息、字段名、字段类型、主键信息、SQL参数信息等，都是元数据。

元数据可以分为三类：数据库元数据（`DataBaseMetaData`）、参数元数据（`ParameterMetaData`）、结果集元数据（`ResultSetMetaData`）。


## 3.2.1 数据库元数据 ##

**数据库元数据（DatabaseMetaData）主要用于：获取数据库及主键的相关信息。**


数据库元数据的完整定义如下：


`public interface DatabaseMetaData extends Wrapper {…}`


`DataBaseMetaData`对象可以通过`java.sql.Connection`对象获取。`DataBaseMetaData`接口的常见方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>String getDatabaseProductName() throws SQLException</td>
      <td>获取数据库名</td>
   </tr>
   <tr>
      <td>String getDatabaseProductVersion() throws SQLException</td>
      <td>获取数据库版本信息</td>
   </tr>
   <tr>
      <td>String getDriverName() throws SQLException </td>
      <td>获取驱动名</td>
   </tr>
   <tr>
      <td>String getURL() throws SQLException</td>
      <td>获取URL</td>
   </tr>
   <tr>
      <td>String getUserName() throws SQLException</td>
      <td>获取用户名</td>
   </tr>
   <tr>
      <td>ResultSet getPrimaryKeys(String catalog, String schema, String table)     throws SQLException;</td>
      <td>获取指定表的主键信息。参数：catalog:类别信息，通常设为null；schema:①如果是oracle数据库：大写的用户名；②如果是其它数据库：数据库名。也可以设为null。  table:指定大写的表名。 
     返回值是一个ResultSet，该结果集包含以下信息：1表类别              2表模式          3表名称              4列名称             5主键中的序列号（值1表示主键中的第一列，值2表示主键中的第二列，...）           6主键的名称</td>
   </tr>
</table>


`DataBaseMetaData`部分方法演示：

**jdbc.metadata.MetaDataDemo.java**

```
//package、import
public class MetaDataDemo
{
	…
    static ResultSet rs = null;
	public static void dataBaseMetaDataDemo(){
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL 
,USERNAME, PASSWORD);
             //获取数据库元数据DataBaseMetaData对象
			DatabaseMetaData dbMetaData = connection.getMetaData() ;
			String dbName = dbMetaData.getDatabaseProductName() ;
			System.out.println("数据库名:"+dbName);
			String dbVersion = 	dbMetaData
.getDatabaseProductVersion() ;
			System.out.println("数据库版本信息："+dbVersion);
			String driverName = dbMetaData.getDriverName() ;
			System.out.println("驱动名："+driverName);
			String urlInfo = dbMetaData.getURL() ;
			System.out.println("url:"+urlInfo);
			String uname = dbMetaData.getUserName() ;
			System.out.println("用户名："+uname);
			//获取主键信息，以ResultSet形式保存。
			rs =  dbMetaData.getPrimaryKeys(null, 
dbMetaData.getUserName(), "student") ;
			while(rs.next()){
				//主键信息中，3代表：表名称
				Object tableName = rs.getObject(3) ;
				System.out.println("主键所在的表名是："+tableName);
				//主键信息中，4代表：列名称
				Object primaryKeyName = rs.getObject(4) ;
				System.out.println("主键的列名："+primaryKeyName);
			}
		}
		//省略catch()、finally
	}
	public static void main(String[] args)
	{
		dataBaseMetaDataDemo();
	}
}
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.15.png)

*图3-15*

## 3.2.2 参数元数据 ##


参数元数据（ParameterMetaData）主要用于：获取SQL语句中占位符的相关信息。

参数元数据的完整定义如下：

`public interface ParameterMetaData extends Wrapper {…}`

`ParameterMetaData`对象可以通过`java.sql.PreparedStatement`对象获取。


**ParameterMetaData接口的常见方法如下：**


<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>int getParameterCount() throws SQLException;</td>
      <td>获取SQL语句中，参数占位符的个数</td>
   </tr>
   <tr>
      <td>String getParameterTypeName(int param)  throws SQLException;</td>
      <td>获取第param个参数的类型名</td>
   </tr>
</table>

**注意：**

很多数据库对`ParameterMetaData`的支持不是很完善。例如，使用`ParameterMetaData`前:


**①**Oralce目前必须使用**ojdbc7.jar**作为驱动包；

**②**MySql必须在url中附加参数配置：
`jdbc:mysql://localhost:3306/数据库名?generateSimpleParameterMetadata=true`


**ParameterMetaData部分方法演示：**

**jdbc.metadata.MetaDataDemo.java**

```
//package、import
public class MetaDataDemo
{
	…
final static String URL = "jdbc:oracle:thin:@localhost:1521:XE";
	static PreparedStatement pstmt = null;
	static ResultSet rs = null;
	public static void parameterMetaDataDemo(){
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(
URL, USERNAME, PASSWORD);
			    String sql ="select * from student where stuName = ?   
 and stuAge = ? " ;
			pstmt = connection.prepareStatement(sql) ;
             //创建ParameterMetaData对象
			ParameterMetaData pMetaData = pstmt.getParameterMetaData() ;
			//获取SQL中，占位符?的个数
			int paramCount = pMetaData.getParameterCount();
			System.out.println("SQL中，占位符参数的个数是："+paramCount);
			//获取SQL中，各个占位符?参数的类型
			for(int i=1;i<=paramCount ;i++){
				String typeName = pMetaData.getParameterTypeName(i) ;
				System.out.println("第"+i+"个占位符参数的类型是:"+typeName);
			}
		}
		//catch、finally
	}
	public static void main(String[] args)
	{
		parameterMetaDataDemo();
	}
}
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.16.png)

*图3-16*

## 3.2.3 结果集元数据 ##

结果集元数据（ResultSetMetaData）主要用于：获取SQL语句中占位符的相关信息。

**结果集元数据的完整定义如下：**

`public interface ResultSetMetaData extends Wrapper {…}`

`ResultSetMetaData`对象可以通过`java.sql.ResultSet`对象获取。ResultSetMetaData接口的常见方法如下：

<table>
   <tr>
      <td>方法</td>
      <td>简介</td>
   </tr>
   <tr>
      <td>int getColumnCount() throws SQLException;</td>
      <td>获取结果集中，包含列的数量</td>
   </tr>
   <tr>
      <td>String getColumnName(int column) throws SQLException;</td>
      <td>获取结果集中，第column列的名称</td>
   </tr>
   <tr>
      <td>String getColumnTypeName(int column) throws SQLException;</td>
      <td>获取结果集中，第column列的类型</td>
   </tr>
</table>


**`ResultSetMetaData`部分方法演示：**


**jdbc.metadata.MetaDataDemo.java**

```
//package、import
public class MetaDataDemo
{
    …
	static ResultSet rs = null;
	public static void resultSetMetaDataDemo(){
		try
		{
			Class.forName(DRIVER);
			connection = DriverManager.getConnection(URL, 
USERNAME, PASSWORD);
			rs = connection.createStatement().executeQuery(
"select * from student") ;
			//获取结果集元数据ResultSetMetaData对象
			ResultSetMetaData rsMetaData = rs.getMetaData() ;
			//获取结果集中包含列的数量
			int count = rsMetaData.getColumnCount() ;
			//获取每列的类型、名称
			for(int i=1;i<=count;i++){
				String columnTypeName = rsMetaData.getColumnTypeName(i) ;
				String columnName = rsMetaData.getColumnName(i) ;
				System.out.println("第"+i+"列的类型是："+columnTypeName
+",名称是:"+columnName);
			}
			System.out.println();
			//显示整个student表的数据
			while(rs.next()){//获取每一行
				//获取每一列
				for(int i=1;i<=count;i++){
					System.out.print(rs.getObject(i)+"\t");
				}
				System.out.println();
			}
		}
		//catch、finally
	}
	public static void main(String[] args)
	{
         …
		resultSetMetaDataDemo();
	}
```

运行结果：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.17.png)

*图3-17*

运行时，数据库中stuent表的数据如下：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.18.png)

*图3-18*


# 3.3 JSP访问数据库 #

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

需要注意，必须在`page`指令里导入`Connection`、`PreparedStatement`等的包名，如`%@page import="java.sql.Connection"%`；并将数据库的驱动包加入Web工程，导入方法如下：将数据库驱动包（ojdbc6.jar）直接复制在WEB-INF下的lib文件夹中即可，如图：

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.19.png)

*图3-19*

不难发现，上面registerJDBC.jsp中的代码既包含了业务逻辑、数据库操作，还负责了显示功能，导致JSP文件非常混乱、复杂，给后期的维护和修改上，带来了非常大的困难。因此，我们需要将JSP中的JAVA代码按功能进行划分，将每个功能分别封装成一个类；最后直接将需要的JAVA类导入到JSP中，组装成最终的JAVA代码即可。这里所提到的“类”，就是指我们即将要学习的JavaBean。

# 3.4 Java Bean #
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

**①封装数据。**

**②封装业务逻辑。**

## 3.4.1 使用Java Bean封装数据 ##

通常情况，一个封装数据的JavaBean（也可以称为“实体类”），对应着数据库内的一张表（或视图），并且与该表（或视图）中的字段一一对应。

例如，在registerJDBC.jsp中，涉及一张登录表`(login)`，该表中有两个字段：用户名`(name)`和密码`(password)`。下面，创建一个与该登录表相对应的封装数据的JavaBean（用于封装用户名、密码）：

在项目的`src`下新建一个`LoginInfo`类，如图，

![](http://lemon.lanqiao.org:8082/teaching/img/jsp-servlet-zq/3.20.png)

*图3-20*

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

## 3.4.2 使用Java Bean封装业务 ##

一个封装数据的JavaBean，对应着数据库内的一张表（或视图）；而一个封装业务的JavaBean，通常用来对封装数据的JavaBean进行控制操作，或相关的业务逻辑操作。例如，下面就来创建一个封装业务的JavaBean（LoginControl.java），用来对之前封装数据的JavaBean（LoginInfo.java）进行控制操作：

**LoginControl.java**

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

**注册页jspJDBC/registerWithJavaBean.jsp**

实现用户名(uname)和密码(upwd)的表单录入，代码及运行图省略（页面中`<form action="registerJDBCWithJavaBean.jsp" …>`）。

将注册信息写入数据库的功能页**jspJDBC/registerJDBCWithJavaBean.jsp**

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


# 3.5 练习题 #

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

2.JavaBean有几种类型，各有什么作用？（难度★★）

3.简述Statement和PreparedStatement两种方式的区别。（难度★★）

4.描述什么是SQL注入，请用一个例子加以说明。（难度★）

5.请描述如何在Eclipse中更改新建的JSP页面默认的字符集编码。（难度★）

6.请描述JDBC连接数据库的步骤，并写出JDBC连接Oracle的示例代码。（难度★★★）

7.使用PreparedStatement的方式，实现一个“部门管理系统”：包括增加部门、修改部门、删除部门、根据部门编号查询一个部门、根据部门名称模糊查询相关部门、查询全部部门等功能。（难度★★★★）

8.将上题“部门管理系统”用JavaBean进行优化。（难度★★★）










